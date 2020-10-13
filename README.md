# RapidAPI Testing GitHub Actions

This GitHub Action allows you to trigger the execution of RapidAPI Testing tests.

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
      uses: RapidAPI/gh-api-testing-trigger@master
      with:
        test: 'YOUR_TEST_ID'
        location: 'AWS-US-WEST-2'
        environment: 'ENV_ID(OPTIONAL)'
    - name: Show Results
      run: echo "The test took ${{ steps.tstExec.outputs.time }}ms to run"; echo "The test result was ${{ steps.tstExec.outputs.succesful }}"; echo "View Report - {{ steps.tstExec.outputs.reportUrl }}"
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

### `location`
The environment you want to run the test in. If you don't use environment omit this parameter

## Outputs

### `time`
The time it took the test to execute, in miliseconds (1000ms=s)

### `succesful`
True/false based on the result of the test execution

### `reportUrl`
URL of a human readable report of the test execution

## Help

For any help using this integration, reach out to `support@rapidapi.com`.