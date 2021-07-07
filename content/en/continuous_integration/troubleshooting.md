---
title: Troubleshooting CI Visibility
kind: documentation
---

### I instrumented my Jenkins instance but I don't see any data in Datadog

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after the pipeline has finished.
2. Make sure the Datadog Agent host is properly configured and it's reachable by the Datadog Plugin. You can test connectivity by clicking on the **Check connectivity with the Datadog Agent** button on the plugin configuration UI.
3. If you still don't see any results, [contact Support][3] and we'll help you troubleshoot.

### I instrumented my tests but I don't see any data in Datadog

1. Check the _Compatibility_ section of the page of the language you are instrumenting, and make sure the testing framework you are using is supported.
2. Check if you see any test results in the [Test Runs][4] section. If you do see results there, but not in the [Tests][5] section, Git information  might be missing. If this is this case, read the next section to troubleshoot it.
3. For all languages (except [Swift][7]), make sure the Datadog Agent is running in the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname and/or port, make sure you run your tests with the appropriate agent hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_TRACE_AGENT_PORT` environment variables. You can activate [debug mode][8] in the tracer to check if it's being able to connect to the agent.
4. If you still don't see any results, [contact Support][3] and we'll help you troubleshoot.

### I see my tests in the "Test Runs" tab, but not in the "Tests" tab

This is most probably due to missing Git metadata (repository, commit and/or branch). To confirm this is the case, open a test execution on the [Test Runs][4] section, and check that there is no `git.repository_url`, `git.commit.sha` or `git.branch`. If these tags are not populated, nothing will show on the [Tests][5] section.

1. Tracers will first try to fetch Git metadata using the local `.git` folder by executing `git` commands. This is the preferred approach, as it will populate all Git metadata fields, including commit message, author and committer information.
2. If the `.git` folder is not present, or the `git` binary is not installed, tracers will fallback to use the environment variables set by the CI provider (as listed in the [Running tests inside a container][6] section) to collect Git information. This will populate, at least, repository, commit hash and branch information.
3. If no CI provider environment variables are found, tests results will be sent with no Git metadata.

### I have another issue not described here

If that's the case, please [contact Support][3] and we'll help you troubleshoot your issue.


[1]: https://app.datadoghq.com/ci/pipeline-executions
[2]: https://app.datadoghq.com/ci/pipelines
[3]: /help/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /continuous_integration/setup_tests/containers/
[7]: /continuous_integration/setup_tests/swift/
[8]: /tracing/troubleshooting/tracer_debug_logs
