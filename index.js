const core = require('@actions/core');
const github = require('@actions/github');

// CONSTS
const WAIT_TIME = 1000;
const MAX_TRIES = 300;
const FIRST_WAIT = 2000;
const API_URL = "https://rapidapi.com/testing/api/trigger";

// INPUTS
const TEST_ID = core.getInput('test');
console.log(`Executing Test ID: ${TEST_ID}`);

const LOCATION = core.getInput('location');
console.log(`Executing In Location: ${LOCATION}`);

const ENVIRONMENT = core.getInput('environment') || null;
console.log(`Executing In Env: ${ENVIRONMENT}`);

core.setOutput("time", 123);