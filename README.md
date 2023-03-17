# RapidAPI Testing GitHub Actions

This GitHub Action allows you to trigger the execution of [RapidAPI Testing](https://rapidapi.com/testing) tests.

## Complete example

```yaml
on: [push]

jobs:
  run_api_test:
    runs-on: ubuntu-latest
    name: Execute RapidAPI API Tests
    steps:
    - name: Execute Tests
      id: tstExec
      uses: RapidAPI/gh-api-testing-trigger@v0.0.3
      with:
        test: 'YOUR_TEST_ID'
        location: 'AWS-US-WEST-2'
        environment: 'ENV_ID(OPTIONAL)'
    - name: Show Results
      run: echo "The test took ${{ steps.tstExec.outputs.time }}ms to run"; echo "The test result was ${{ steps.tstExec.outputs.computedStatus }}"; echo "View Report - ${{ steps.tstExec.outputs.reportUrl }}"
```

## Inputs

### `test`
**Required** The ID of the test you wish to execute.

### `location`
**Required** The location the test will be executed in. Options:

- `AWS-US-EAST-1` : N. Virginia
- `AWS-US-WEST-2` : Oregon
- `AWS-AP-EAST-1` : Hong Kong
- `AWS-AP-SOUTH-1` : Mumbai
- `AWS-AP-SOUTHEAST-1` : Singapore
- `AWS-AP-NORTHEAST-1` : Tokyo
- `AWS-EU-CENTRAL-1` : Frankfurt
- `AWS-EU-WEST-3` : Paris
- `AWS-SA-EAST-1` : São Paulo

### `environment`
The environment you want to run the test in. If you don't use environment omit this parameter

## Outputs

### `time`
The time it took the test to execute, in milliseconds (1000ms=s)

### `successful`
True/false based on the result of the test execution

### `reportUrl`
URL of a human-readable report of the test execution

### `computedStatus`
A human-readable test status that matches the status values on the test dashboard in the UI

## Building

`vercel/ncc` is used to build action to avoid checking in the `node_modules` directory.
Use `npm build` to compile the action into the `dist/` directory.

## Help
For any help using this integration, reach out to `support@rapidapi.com`. You can also see RapidAPI Testing Guide in our [Help Center](https://docs.rapidapi.com/docs/creating-test-flows). 
