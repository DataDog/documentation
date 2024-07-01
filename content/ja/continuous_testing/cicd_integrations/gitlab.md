---
title: GitLab
description: Configure your GitLab instance to run Continuous Testing tests in your CI/CD pipelines.
aliases:
  - /synthetics/cicd_integrations/gitlab
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: Blog
  text: Run Datadog Synthetic tests in your GitLab pipelines
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentation
  text: Set up Tracing on a GitLab Pipeline
---

## Overview

Run Continuous Testing tests in your [GitLab][1] pipelines, block deployments, and trigger rollbacks to ensure your code is added in production when your essential business workflows are functioning as expected.

To integrate Continuous Testing tests with a [GitLab pipeline][2], you can use the [datadog-ci npm package][3].

## Setup

To get started:

1. Add your Datadog API and application keys as variables in your GitLab project.
2. Ensure your GitLab runner has a version of Node.js >= 10.24.1 installed.

For more information, see [CI/CD Integrations Configuration][4].

## Simple configuration

### Run tests using test IDs

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --public-id xtf-w5p-z5n --public-id eif-van-tu7
{{< /code-block >}}

### Run tests using tags

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests'
{{< /code-block >}}

### Run tests using variable overrides

If you have different test users or data specific to your CI/CD environment, you can override these variables with the `-v` command. For more information, see the Synthetics command](https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics) in the `datadog-ci` NPM package.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests' -v PASSWORD="$PASSWORD"
{{< /code-block >}}

## Advanced configuration

### Run tests using a custom configuration file

Add a custom `config.json` file to your pipeline repository and access it in your pipeline configuration.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --config synthetics_global.json -f synthetic_test.json
{{< /code-block >}}

### Test output

This example demonstrates the pipeline has identified the configuration file and is running the test:

{{< img src="synthetics/cicd_integrations/gitlab/synthetic_test_run.png" alt="A Synthetic test running in GitLab" style="width:100%;" >}}

A successful test output returns the following in GitLab:

{{< img src="synthetics/cicd_integrations/gitlab/successful_test_run.png" alt="A successful Synthetic test run result in a GitLab pipeline" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/gitlab/
[2]: https://docs.gitlab.com/ee/ci/pipelines/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /synthetics/cicd_integrations/configuration
