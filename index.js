const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

// CONSTS
const WAIT_TIME = 1000;
const MAX_TRIES = 300;
const FIRST_WAIT = 2000;

// INPUTS
const TEST_ID = core.getInput('test');
console.log(`Executing Test ID: ${TEST_ID}`);

const LOCATION = core.getInput('location');
console.log(`Executing In Location: ${LOCATION}`);

const ENVIRONMENT = core.getInput('environment') || null;
console.log(`Executing In Env: ${ENVIRONMENT}`);

const API_URL = `https://${core.getInput('tenant')}/testing/api/trigger`;
console.log(`Executing Test Against: ${API_URL}`);

function sleep(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, time);
    });    
}

core.group('Execute Test', async () => {
    // 1. Trigger Test
    const envString = ENVIRONMENT ? `&enviroment=${ENVIRONMENT}` : '';
    const testTrigger = (await axios.get(`${API_URL}/test/${TEST_ID}/execute?source=gh_action&location=${LOCATION}${envString}`)).data;
    const reportUrl = testTrigger.reportUrl;
    console.log(testTrigger.message);
    core.setOutput("reportUrl", reportUrl);
    const executionId = testTrigger.executionId;

    // 2. Perform initial wait -- this is to avoid multiple checks while test is ramping up
    await sleep(FIRST_WAIT-WAIT_TIME);

    let testResult = null;
    let tries = 0;
    while (
        (!testResult || testResult.status == 'pending' || testResult.status == 'started') &&
        tries < MAX_TRIES // safety
    ) {
        await sleep(WAIT_TIME);
        testResult = (await axios.get(`${API_URL}/execution/${executionId}/status`)).data;
    }
    delete testResult.report;
    console.log(testResult);

    // 3. Set Response Data
    core.setOutput("time", testResult.executionTime);
    core.setOutput("succesful", testResult.succesful);
    core.setOutput("successful", testResult.successful);
    core.setOutput("computedStatus", testResult.computedStatus);

    // 4. Fail action if test failed
    if (!testResult.successful) {
        core.setFailed(`Test execution failed. View report here: ${testTrigger.reportUrl}`);
    }
});
