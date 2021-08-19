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

1. Tracers first try to fetch Git metadata using the local `.git` folder by executing `git` commands. This is the preferred approach, as it populates all Git metadata fields, including commit message, author and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`.
2. If the `.git` folder is not present, or the `git` binary is not installed, tracers fallback to use the environment variables set by the CI provider to collect Git information. See the [Running tests inside a container][6] page for a list of environment variables that the tracer attempts to read for each supported CI provider. At a minimum, this populates the repository, commit hash, and branch information.
1. Tracers first try to use the environment variables set by the CI provider to collect Git information. See the [Running tests inside a container][6] page for a list of environment variables that the tracer attempts to read for each supported CI provider. At a minimum, this populates the repository, commit hash, and branch information.
2. Tracers also try to fetch Git metadata using the local `.git` folder by executing `git` commands. This populates all Git metadata fields, including commit message, author and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`. This information will only be fetched if no git information was readed from previous method or if the comit sha coincides.
3. The user can also provide Git information by using custom environment variables. Custom environment variables are also useful for overwriting existing Git information. If these environment variables are set, they take precedence over those coming from the CI or from the .git folder. The list of supported environment variables for Git information includes the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored.

`DD_GIT_BRANCH`
: Branch where this commit belongs.

`DD_GIT_TAG`
: Tag of the commit, if it has one.

`DD_GIT_COMMIT_SHA`
: Commit SHA.

`DD_GIT_COMMIT_MESSAGE`
: Commit message.

`DD_GIT_COMMIT_AUTHOR_NAME`
: Author name.

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Author email.

`DD_GIT_COMMIT_AUTHOR_DATE`
: Author date. ISO 8601 format.

`DD_GIT_COMMIT_COMMITTER_NAME`
: Committer name.

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Committer email.

`DD_GIT_COMMIT_COMMITTER_DATE`
: Committer date. ISO 8601 format.

4. If no CI provider environment variables are found, tests results are sent with no Git metadata.

### Need further help?

If you have another issue, or the above solutions don't work, [contact Support][1] for troubleshooting help.


[1]: /help/
[2]: /continuous_integration/setup_tests/
[3]: https://app.datadoghq.com/ci/test-runs
[4]: https://app.datadoghq.com/ci/test-services
[5]: /tracing/troubleshooting/tracer_debug_logs
[6]: /continuous_integration/setup_tests/containers/
