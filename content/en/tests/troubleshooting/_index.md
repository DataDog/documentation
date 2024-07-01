---
title: Test Visibility Troubleshooting
kind: documentation
further_reading:
  - link: "/continuous_integration/tests"
    tag: "Documentation"
    text: "Learn how to monitor your CI tests"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This page provides information to help you troubleshot issues with Test Visibility. If you need additional help, contact [Datadog Support][2].

## Your tests are instrumented, but Datadog isn't showing any data

1. Go to the [**Tests**][3] page for the language you're instrumenting and check that the testing framework you are using is supported in the **Compatibility** section.
2. Check if you see any test results in the [**Test Runs**][4] section. If you do see results there, but not in the [**Tests**][5] section, Git information is missing. See [Data appears in Test Runs but not Tests](#data-appears-in-test-runs-but-not-tests) to troubleshoot it.
3. If you are reporting the data through the Datadog Agent, make sure it is running on the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname or port, make sure you run your tests with the appropriate Agent hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_TRACE_AGENT_PORT` environment variables. You can activate [debug mode][6] in the tracer to check if it's able to connect to the Agent.
4. If you still don't see any results, [contact Support][2] for troubleshooting help.

## You are uploading JUnit test reports with `datadog-ci` but some or all tests are missing
If you are uploading JUnit test report files with `datadog-ci` CLI and you do not see the tests, it is likely the tests are being discarded because the report is considered incorrect.

The following aspects make a JUnit test report incorrect:
* A timestamp of the reported tests that is older than **71 hours** before the moment the report is uploaded.
* A testsuite without a name.

## Data appears in test runs but not tests

If you can see test results data in the **Test Runs** tab, but not the **Tests** tab, Git metadata (repository, commit, or branch) is probably missing. To confirm this is the case, open a test execution in the [**Test Runs**][4] section, and check that there is no `git.repository_url`, `git.commit.sha`, or `git.branch`. If these tags are not populated, nothing shows in the [**Tests**][5] section.

1. Tracers first use the environment variables, if any, set by the CI provider to collect Git information. See [Running tests inside a container][7] for a list of environment variables that the tracer attempts to read for each supported CI provider. At a minimum, this populates the repository, commit hash, and branch information.
2. Next, tracers fetch Git metadata using the local `.git` folder, if present, by executing `git` commands. This populates all Git metadata fields, including commit message, author, and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`. This information is used to populate attributes not detected in the previous step.
3. You can also provide Git information manually using environment variables, which override information detected by any of the previous steps.

   The supported environment variables for providing Git information are:

   `DD_GIT_REPOSITORY_URL` **(required)**
   : URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
   **Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_COMMIT_SHA` **(required)**
   : Full (40-character long SHA1) commit hash.<br/>
   **Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

   `DD_GIT_BRANCH`
   : Git branch being tested. Leave empty if providing tag information instead.<br/>
   **Example**: `develop`

   `DD_GIT_TAG`
   : Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
   **Example**: `1.0.1`

   `DD_GIT_COMMIT_MESSAGE`
   : Commit message.<br/>
   **Example**: `Set release number`

   `DD_GIT_COMMIT_AUTHOR_NAME`
   : Commit author name.<br/>
   **Example**: `John Smith`

   `DD_GIT_COMMIT_AUTHOR_EMAIL`
   : Commit author email.<br/>
   **Example**: `john@example.com`

   `DD_GIT_COMMIT_AUTHOR_DATE`
   : Commit author date in ISO 8601 format.<br/>
   **Example**: `2021-03-12T16:00:28Z`

   `DD_GIT_COMMIT_COMMITTER_NAME`
   : Commit committer name.<br/>
   **Example**: `Jane Smith`

   `DD_GIT_COMMIT_COMMITTER_EMAIL`
   : Commit committer email.<br/>
   **Example**: `jane@example.com`

   `DD_GIT_COMMIT_COMMITTER_DATE`
   : Commit committer date in ISO 8601 format.<br/>
   **Example**: `2021-03-12T16:00:28Z`

4. If no CI provider environment variables are found, tests results are sent with no Git metadata.

### The total test time is empty
If you cannot see the total test time, it is likely that test suite level visibility is not enabled. To confirm, check if your language supports test suite level visibility in [Supported features][14]. If test suite level visibility is supported, update your tracer to the latest version.

If you still don't see the total time after updating the tracer version, contact [Datadog support][2] for help.

### The total test time is different than expected

#### How total time is calculated
The total time is defined as the sum of the maximum test session durations.

1. The maximum duration of a test session grouped by the test session fingerprint is calculated.
2. The maximum test session durations are summed.

## The test status numbers are not what is expected

The test status numbers are calculated based on the unique tests that were collected. The uniqueness of a test is defined not only by its suite and name, but by its test parameters and test configurations as well.

### The numbers are lower than expected

If the numbers are lower than expected, it is likely that either the library or the tool you are using to collect test data cannot collect test parameters and/or some test configurations.

1. If you are uploading JUnit test report files:
    1. If you are running the same tests in different environment configurations, [make sure you are setting those configuration tags during the upload][10].
    2. If you are running parameterized tests, it's very likely that the JUnit report does not have that information. [Try using a native library to report test data][3].
2. If you still don't see the expected results, [contact Datadog support][2] for troubleshooting help.

### The passed/failed/skipped numbers are different than expected

If the same test is collected several times for the same commit but with different status, the aggregated result follows the algorithm in the table below:

| **Test Status - First Try** | **Test Status - Retry #1** | **Result** |
|-----------------------------|----------------------------|------------|
| `Passed`                    | `Passed`                   | `Passed`   |
| `Passed`                    | `Failed`                   | `Passed`   |
| `Passed`                    | `Skipped`                  | `Passed`   |
| `Failed`                    | `Passed`                   | `Passed`   |
| `Failed`                    | `Failed`                   | `Failed`   |
| `Failed`                    | `Skipped`                  | `Failed`   |
| `Skipped`                   | `Passed`                   | `Passed`   |
| `Skipped`                   | `Failed`                   | `Failed`   |
| `Skipped`                   | `Skipped`                  | `Skipped`  |

## The default branch is not correct

### How it impacts the product

The default branch is used to power some features of the products, namely:

- Default branches list on the Tests page: This list only displays default branches. Setting the wrong default branch can result in missing or incorrect data in the default branches list.

- New flaky tests: Tests that are not currently classified as flaky in the default branch. If the default branch is not properly set, this could lead to a wrong number of detected new flaky tests.

- Pipelines list: The pipelines list only displays default branches. Setting the wrong default branch can result in missing or incorrect data in the pipelines list.

### How to fix the default branch

If you have admin access, you can update it from the [Repository Settings Page][11].

## Execution history is not available for a specific test case

Other symptoms of the same issue include:
- A test case is not classified as flaky even if it exhibits flakiness.
- A test case cannot be skipped by [Intelligent Test Runner][12].

It is likely that the [test case configuration][13] is unstable because one or more of the test parameters are non-deterministic (for instance, they include current date or a random number).

The best way to fix this is to make sure that the test parameters are the same between test runs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /help/
[3]: /continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /tracing/troubleshooting/tracer_debug_logs
[7]: /continuous_integration/tests/containers/
[8]: https://github.com/travisjeffery/timecop
[9]: https://github.com/spulec/freezegun
[10]: /continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[11]: https://app.datadoghq.com/ci/settings/repository
[12]: /continuous_integration/intelligent_test_runner/
[13]: /tests/#parameterized-test-configurations
[14]: /tests/#supported-features
