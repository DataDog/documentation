---
title: CI Visibility Troubleshooting
kind: documentation
further_reading:
  - link: "/continuous_integration/tests"
    tag: "Documentation"
    text: "Learn how to monitor your CI tests"
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Learn how to monitor your CI pipelines"
  - link: "/continuous_integration/intelligent_test_runner"
    tag: "Documentation"
    text: "Learn about the Intelligent Test Runner"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This page provides information to help you troubleshot issues with CI Visibility. If you need additional help, contact [Datadog Support][2].

## CI tests

### Your tests are instrumented, but Datadog isn't showing any data

1. Go to the [**Tests**][3] page for the language you're instrumenting and check that the testing framework you are using is supported in the **Compatibility** section. 
2. Check if you see any test results in the [**Test Runs**][4] section. If you do see results there, but not in the [**Tests**][5] section, Git information is missing. See [Data appears in Test Runs but not Tests](#data-appears-in-test-runs-but-not-tests) to troubleshoot it.
3. If you are reporting the data through the Datadog Agent, make sure it is running on the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname or port, make sure you run your tests with the appropriate Agent hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_TRACE_AGENT_PORT` environment variables. You can activate [debug mode][6] in the tracer to check if it's able to connect to the Agent.
4. If you still don't see any results, [contact Support][2] for troubleshooting help.

### You are uploading JUnit test reports with `datadog-ci` but some or all tests are missing
If you are uploading JUnit test report files with `datadog-ci` CLI and you do not see the tests, it is likely the tests are being discarded because the report is considered incorrect.

The following aspects make a JUnit test report incorrect:
* A timestamp of the reported tests that is older than **71 hours** before the moment the report is uploaded.
* A testsuite without a name.
  
### Data appears in test runs but not tests

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

### The tests wall time is empty

If you cannot see the tests wall time it is likely that the CI provider metadata is missing. To confirm this is the case, open a test execution in the [**Test Runs**][4] section, and check if the `ci.pipeline.id`, `ci.pipeline.name`, `ci.pipeline.number`, or `ci.job.url` tags are missing. If these tags are not populated, then nothing shows in the wall time column.

1. Tracers use the environment variables set by the CI provider to collect this information. See [Running tests inside a container][7] for a list of environment variables that the tracer attempts to read for each supported CI provider. Make sure that the environment variables have the expected values set.
2. Check that you are running your tests in a supported CI provider. For a list of supported CI providers, see [Running tests inside a container][7]. Only these CI providers can extract the information to enrich the test metadata with CI information.
3. If you still don't see the wall time, contact [Datadog support][2] for help.

### The tests wall time is not what is expected

#### How wall time is calculated
The wall time is defined as the time difference between the start time of the first test and the end time of the last test for the given pipeline.

This is done using the following algorithm:

1. Compute a hash based on CI information to group the tests.
    1. If the tests include `ci.job.url`, use this tag to calculate the hash.
    2. If the tests don't include `ci.job.url`, use `ci.pipeline.id` + `ci.pipeline.name` + `ci.pipeline.number` to calculate the hash.
2. The calculated wall time is associated to a given hash. **Note**: If there are multiple jobs that execute tests, the wall time is calculated for each job, and the maximum from all calculated wall times is shown.

#### Possible issues with wall time calculation
If you're using a library for testing time-dependent code, like [timecop][8] for Ruby or [FreezeGun][9] for Python, it is possible that test timestamps are wrong, and therefore calculated wall times. If this is the case, make sure that modifications to time are rolled back before finishing your tests.

### The test status numbers are not what is expected

The test status numbers are calculated based on the unique tests that were collected. The uniqueness of a test is defined not only by its suite and name, but by its test parameters and test configurations as well.

#### The numbers are lower than expected

If the numbers are lower than expected, it is likely that either the library or the tool you are using to collect test data cannot collect test parameters and/or some test configurations.

1. If you are uploading JUnit test report files:
    1. If you are running the same tests in different environment configurations, [make sure you are setting those configuration tags during the upload][10].
    2. If you are running parameterized tests, it's very likely that the JUnit report does not have that information. [Try using a native library to report test data][3].
2. If you still don't see the expected results, [contact Datadog support][2] for troubleshooting help.

#### The passed/failed/skipped numbers are different than expected

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

### The default branch is not correct

#### How it impacts the product

The default branch is used to power some features of the products, namely:

- Default branches list on the Tests page: This list only displays default branches. Setting the wrong default branch can result in missing or incorrect data in the default branches list.

- Wall time comparison for non-default branches: On the Tests page, in the Branches view, the **VS Default** column is calculated by comparing wall time for the current branch against wall time for the default branch.

- New flaky tests: Tests that are not currently classified as flaky in the default branch. If the default branch is not properly set, this could lead to a wrong number of detected new flaky tests.

- Pipelines list: The pipelines list only displays default branches. Setting the wrong default branch can result in missing or incorrect data in the pipelines list.

#### How to fix the default branch

If you have admin access, you can update it from the [Repository Settings Page][11].

## CI pipelines

### Your Jenkins instance is instrumented, but Datadog isn't showing any data

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after the pipeline has finished.
2. Make sure the Datadog Agent host is properly configured and is reachable by the Datadog Plugin. You can test connectivity by clicking on the **Check connectivity with the Datadog Agent** button on the Jenkins plugin configuration UI.
3. Check for any errors in the Jenkins logs. You can enable debug-level logs for the Datadog plugin by [creating a `logging.properties` file][1] and adding the line: `org.datadog.level = ALL`.

### Pipeline not found

A "Pipeline not found" message is shown when you click on incomplete data coming from an in-progress pipeline. Data is received progressively for stages, jobs, or custom commands. Wait until the pipeline has finished and try again.

## Intelligent Test Runner

### Intelligent Test Runner is not working

[Intelligent Test Runner][12] works by analyzing your commit history along with code coverage information about past test runs to determine which tests need to be run and which ones can be safely skipped. A minimum amount of information needs to exist in order for the Intelligent Test Runner to work correctly:

- Your repository needs to have a commit history of at least two commits in the past month.
- You need to have collected test code coverage in past commits, which happens on test runs where Intelligent Test Runner was enabled.
- Your git clone must contain commit and tree history. Intelligent Test Runner tries to unshallow git clones that do not contain history (`git clone --depth=1`), but that might not work on older versions of git. Automatic unshallowing might require additional set up in some CI providers (Harness CI, for example, requires [extra configuration][13] to make sure your pipeline can execute git commands). If your CI job is using shallow git clones, you can change it to use partial git clones by using the following command: `git clone --filter=blob:none`.

Due to these restrictions, the first time you enable Intelligent Test Runner, you cannot see any tests skipped and the test execution time may be slower than usual because the code coverage is collected automatically.

Intelligent Test Runner only takes into account the commit history and test code coverage information for the past month. Additionally, it does not take into account code coverage information that is generated more than one week after a commit was made.

There is a limitation when [synchronizing a fork through GitHub's UI][14] which causes all tests to be run for the generated synchronization commit.

### Intelligent Test Runner incorrectly skipped a test

Intelligent Test Runner performs test impact analysis based on code coverage to determine which tests are impacted by a given commit or set of commits. While this strategy works for the majority of tests, there are known scenarios where Intelligent Test Runner could skip a test that should have been run:

- Changes in library dependencies.
- Changes in compiler options.
- Changes in external services.
- Changes to data files in data-driven tests.

If you are authoring a commit that includes any of those cases, you can force-disable test skipping in Intelligent Test Runner by adding `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.

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
[13]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[14]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
