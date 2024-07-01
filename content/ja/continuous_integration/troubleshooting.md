---
title: CI Visibility Troubleshooting
further_reading:
  - link: /continuous_integration/tests
    tag: Documentation
    text: Learn how to monitor your CI tests
  - link: /continuous_integration/pipelines
    tag: Documentation
    text: Learn how to monitor your CI pipelines
  - link: /continuous_integration/intelligent_test_runner
    tag: Documentation
    text: Learn about the Intelligent Test Runner
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This page provides information to help you troubleshot issues with CI Visibility. If you need additional help, contact [Datadog Support][2].

## Your Jenkins instance is instrumented, but Datadog isn't showing any data

1. Make sure that at least one pipeline has finished executing. Pipeline execution information is only sent after the pipeline has finished.
2. Make sure the Datadog Agent host is properly configured and is reachable by the Datadog Plugin. You can test connectivity by clicking on the **Check connectivity with the Datadog Agent** button on the Jenkins plugin configuration UI.
3. Check for any errors in the Jenkins logs. You can enable debug-level logs for the Datadog plugin by [creating a `logging.properties` file][1] and adding the line: `org.datadog.level = ALL`.

## Pipeline not found

A "Pipeline not found" message is shown when you click on incomplete data coming from an in-progress pipeline for those [CI providers that do not support `running` pipelines][15]. Data is received progressively for stages, jobs, or custom commands. Wait until the pipeline has finished and try again.

## Missing pipelines on the Pipelines page

The pipeline page only displays pipelines with no Git information, or pipelines with Git information which belong to the default branch of the Git repository.

## Missing stages or jobs in summary tables

Missing stages or jobs in the _Pipeline Details_ page might be due to a wrong configuration. Make sure that the pipeline name stored in the stage or job executions matches the **same** name of their parent pipeline. If you are using custom pipelines, refer to the [public API endpoint specification][15].

### Limitations on running pipelines

#### Delivery of webhook events is not guaranteed by CI providers

Running pipelines support relies on data sent from CI providers indicating execution status. If this data is not available, executions marked as `Running` in Datadog may have already finished. 

#### Maximum duration for a pipeline execution

A pipeline execution can maintain `Running` status for a maximum of three days. If it is still running after that time, the pipeline execution does not appear in CI Visibility. If a pipeline execution finishes after three days, the finished pipeline execution appears in CI Visibility with its correspondent final status (`Success`, `Error`, `Canceled`, `Skipped`) and with the correct duration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /help/
[3]: /continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /tracing/troubleshooting/tracer_debug_logs
[7]: /continuous_integration/tests/containers/
[8]: /continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[9]: https://app.datadoghq.com/ci/settings/repository
[10]: /continuous_integration/intelligent_test_runner/
[11]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[12]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[13]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[14]: /continuous_integration/tests/#supported-features
[15]: /continuous_integration/pipelines/#supported-features