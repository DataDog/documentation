---
title: Troubleshooting CI Visibility
kind: documentation
---

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

1. Tracers first try to use the environment variables set by the CI provider to collect Git information. See the [Running tests inside a container][6] page for a list of environment variables that the tracer attempts to read for each supported CI provider. At a minimum, this populates the repository, commit hash, and branch information.
2. Tracers also try to fetch Git metadata using the local `.git` folder by executing `git` commands. This populates all Git metadata fields, including commit message, author and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`. This information will be used to populate attributes not detected in the previous step.
3. Git information can also be provided manually using environment variables, which will override any information detected by any of the previous steps. The supported environment variables for providing Git information are the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.

`DD_GIT_COMMIT_SHA`
: Full commit hash.

`DD_GIT_COMMIT_MESSAGE`
: Commit message.

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.

4. If no CI provider environment variables are found, tests results are sent with no Git metadata.

### Need further help?

If you have another issue, or the above solutions don't work, [contact Support][1] for troubleshooting help.


[1]: /help/
[2]: /continuous_integration/setup_tests/
[3]: https://app.datadoghq.com/ci/test-runs
[4]: https://app.datadoghq.com/ci/test-services
[5]: /tracing/troubleshooting/tracer_debug_logs
[6]: /continuous_integration/setup_tests/containers/
