---
title: Troubleshooting CI Visibility
kind: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

### Your Jenkins instance is instrumented, but Datadog isn't showing any data

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after the pipeline has finished.
2. Make sure the Datadog Agent host is properly configured and it's reachable by the Datadog Plugin. You can test connectivity by clicking on the **Check connectivity with the Datadog Agent** button on the Jenkins plugin configuration UI.
3. If you still don't see any results, [contact Support][1] for troubleshooting help.

### Your tests are instrumented, but Datadog isn't showing any data

1. Go to the [Setup Tracing on CI Tests][2] page for the language you're instrumenting and check the _Compatibility_ section. Make sure the testing framework you are using is supported.
2. Check if you see any test results in the [Test Runs][3] section. If you do see results there, but not in the [Tests][4] section, Git information is missing. See [Data appears in Test Runs but not Tests](#data-appears-in-test-runs-but-not-tests) to troubleshoot it.
3. For languages other than Swift, make sure the Datadog Agent is running on the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname or port, make sure you run your tests with the appropriate Agent hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_TRACE_AGENT_PORT` environment variables. You can activate [debug mode][5] in the tracer to check if it's able to connect to the Agent.
4. If you still don't see any results, [contact Support][1] for troubleshooting help.

### Data appears in test runs but not tests

If you can see test results data in the **Test Runs** tab, but not the **Tests** tab, Git metadata (repository, commit and/or branch) is probably missing. To confirm this is the case, open a test execution in the [Test Runs][3] section, and check that there is no `git.repository_url`, `git.commit.sha`, or `git.branch`. If these tags are not populated, nothing shows in the [Tests][4] section.

1. Tracers first use the environment variables, if any, set by the CI provider to collect Git information. See [Running tests inside a container][6] for a list of environment variables that the tracer attempts to read for each supported CI provider. At a minimum, this populates the repository, commit hash, and branch information.
2. Next, tracers fetch Git metadata using the local `.git` folder, if present, by executing `git` commands. This populates all Git metadata fields, including commit message, author, and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`. This information is used to populate attributes not detected in the previous step.
3. You can also provide Git information manually using environment variables, which override information detected by any of the previous steps. The supported environment variables for providing Git information are the following:

   `DD_GIT_REPOSITORY_URL`
   : URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
   **Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_BRANCH`
   : Git branch being tested. Leave empty if providing tag information instead.<br/>
   **Example**: `develop`

   `DD_GIT_TAG`
   : Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
   **Example**: `1.0.1`

   `DD_GIT_COMMIT_SHA`
   : Full commit hash.<br/>
   **Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

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

If you cannot see the tests wall time it is likely that the CI provider metadata is missing. To confirm this is the case, open a test execution in the [Test Runs][3] section, and check if the `ci.pipeline.id`, `ci.pipeline.name`, `ci.pipeline.number`, or `ci.job.url` tags are missing. If these tags are not populated, then nothing shows in the wall time column.

1. Tracers use the environment variables set by the CI provider to collect this information. See [Running tests inside a container][6] for a list of environment variables that the tracer attempts to read for each supported CI provider. Make sure that the environment variables have the expected values set.
2. Check that you are running your tests in a supported CI provider. For a list of supported CI providers, see [Running tests inside a container][6]. Only these CI providers can extract the information to enrich the test metadata with CI information.
3. If you still don't see the wall time, contact [Datadog support][1] for help.

### The tests wall time is not what is expected

#### How wall time is calculated
The wall time is defined as the time difference between the start time of the first test and the end time of the last test for the given pipeline.

This is done using the following algorithm:

1. Compute a hash based on CI information to group the tests.
  a. If the tests include `ci.job.url`, use this tag to calculate the hash.
  b. If the tests don’t include `ci.job.url`, use `ci.pipeline.id` + `ci.pipeline.name` + `ci.pipeline.number` to calculate the hash.
2. The calculated wall time is associated to a given hash. **Note**: If there are multiple jobs that execute tests, the wall time is the time difference between the start of the first test in the earliest job and the end of the last test in the latest job.

#### Possible issues with wall time calculation
If you're using a library for testing time-dependent code, like [timecop][7] for Ruby or [FreezeGun][8] for Python, it is possible that test timestamps are wrong, and therefore calculated wall times. If this is the case, make sure that modifications to time are rolled back before finishing your tests.

### Need further help?

Still need help? Contact [Datadog support][1].


[1]: /help/
[2]: /continuous_integration/setup_tests/
[3]: https://app.datadoghq.com/ci/test-runs
[4]: https://app.datadoghq.com/ci/test-services
[5]: /tracing/troubleshooting/tracer_debug_logs
[6]: /continuous_integration/setup_tests/containers/
[7]: https://github.com/travisjeffery/timecop
[8]: https://github.com/spulec/freezegun
