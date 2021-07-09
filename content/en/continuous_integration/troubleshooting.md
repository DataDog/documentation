---
title: Troubleshooting CI Visibility
kind: documentation
---

### I instrumented my CI provider but I don't see any data in Datadog

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after it has finished.
2. Check if you see any results in the [Pipeline Executions][1] section. In the [Pipelines][2] section, only pipelines that contain git information and that were executed in the default branch will be shown.
3. If instrumenting Jenkins, make sure the Datadog Agent is running in the master host and available at its default location (`localhost:8126`).
4. If you still don't see any results, [contact Support][3] and we'll help you troubleshoot.


### I instrumented my tests but I don't see any data in Datadog

1. Check if you see any results in the [Test Runs][4] section. In the [Tests][5] section, only tests that contain git information will be shown.
2. If you are executing your tests in a container, make sure you are forwarding the required CI provider environment variables to them. Check out the [Running tests inside a container][6] section for more information.
3. For all languages except Swift, make sure the Datadog Agent is running in the host where tests are run (accessible at `localhost:8126`), or if accessible on another hostname and/or port, make sure you run your tests with the appropriate hostname set in the `DD_AGENT_HOST` and the appropriate port in `DD_AGENT_PORT` environment variables.
4. If you still don't see any results, [contact Support][3] and we'll help you troubleshoot.


[1]: https://app.datadoghq.com/ci/pipeline-executions
[2]: https://app.datadoghq.com/ci/pipelines
[3]: /help/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /continuous_integration/setup_tests/containers/
