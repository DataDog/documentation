---
title: Troubleshooting CI Visibility
kind: documentation
---

### Your Jenkins instance is instrumented, but Datadog isn't showing any data

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after the pipeline has finished.
2. Make sure the Datadog Agent host is properly configured and it's reachable by the Datadog Plugin. You can test connectivity by clicking on the **Check connectivity with the Datadog Agent** button on the Jenkins plugin configuration UI.
3. If you still don't see any results, [contact Support][3] for troubleshooting help.

### Your tests are instrumented, but Datadog isn't showing any data

1. Go to the [Setup Tracing on CI Tests][9] page for the language you're instrumenting and check the _Compatibility_ section. Make sure the testing framework you are using is supported.
2. Check if you see any test results in the [Test Runs][4] section. If you do see results there, but not in the [Tests][5] section, Git information is missing. See [Data appears in Test Runs but not Tests](#data-appears-in-test-runs-but-not-tests) to troubleshoot it.
3. For languages other than Swift, make sure the Datadog Agent is running on the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname or port, make sure you run your tests with the appropriate Agent hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_TRACE_AGENT_PORT` environment variables. You can activate [debug mode][8] in the tracer to check if it's able to connect to the Agent.
4. If you still don't see any results, [contact Support][3] for troubleshooting help.

### Data appears in Test Runs but not Tests

If you can see test results data in the **Test Runs** tab, but not the **Tests** tab, Git metadata (repository, commit and/or branch) is probably missing. To confirm this is the case, open a test execution in the [Test Runs][4] section, and check that there is no `git.repository_url`, `git.commit.sha`, or `git.branch`. If these tags are not populated, nothing will show on the [Tests][5] section.

1. Tracers will first try to fetch Git metadata using the local `.git` folder by executing `git` commands. This is the preferred approach, as it will populate all Git metadata fields, including commit message, author and committer information. Ensure the `.git` folder is present and the `git` binary is installed and in `$PATH`.
2. If the `.git` folder is not present, or the `git` binary is not installed, tracers will fallback to use the environment variables set by the CI provider to collect Git information. See the [Running tests inside a container][6] page for a list of environment variables that the tracer will attempt to read for each supported CI provider. This will populate, at least, repository, commit hash and branch information.
3. If no CI provider environment variables are found, tests results will be sent with no Git metadata.

### Need further help?

If you have another issue, or the above solutions don't work, [contact Support][3] for troubleshooting help.


[1]: https://app.datadoghq.com/ci/pipeline-executions
[2]: https://app.datadoghq.com/ci/pipelines
[3]: /help/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /continuous_integration/setup_tests/containers/
[8]: /tracing/troubleshooting/tracer_debug_logs
[9]: /continuous_integration/setup_tests/
