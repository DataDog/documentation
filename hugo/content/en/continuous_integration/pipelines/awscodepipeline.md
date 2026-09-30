---
title: AWS CodePipeline Setup for CI Visibility
aliases:
  - /continuous_integration/setup_pipelines/codepipeline
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "/continuous_integration/search/"
      tag: "Documentation"
      text: "Search and Manage CI Pipelines"
    - link: "https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/"
      tag: "Blog"
      text: "Monitor and improve your CI/CD on AWS CodePipeline with Datadog CI Visibility"
---

## Overview

[AWS CodePipeline][1] is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.

Set up CI Visibility for AWS CodePipeline to collect data about pipeline executions, analyze performance bottlenecks or operational issues, and monitor your deployment workflows.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Partial retries][14] | Partial pipelines | View partially retried pipeline executions. |
| *[Running pipelines][15] | Running pipelines | View pipeline executions that are running. Queued or waiting pipelines show with status "Running" on Datadog. |
| **Logs correlation | Logs correlation	| Correlate pipeline and job spans to logs and enable [job log correlation](#collect-job-logs). |
| [Approval wait time][17] | Approval wait time  | View the amount of time jobs and pipelines wait for manual approvals. |
| [Custom spans][18] | Custom spans | Configure custom spans for your pipelines. |
| [Filter CI Jobs on the critical path][19] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][20] | Execution time  | View the amount of time pipelines have been running jobs. |

*AWS CodePipeline running pipelines don't have Git information until they have finished.\
**AWS CodePipeline logs correlation is only available for AWS CodeBuild actions.

### Terminology

This table shows the mapping of concepts between Datadog CI Visibility and AWS CodePipeline:

| Datadog  | AWS CodePipeline |
|----------|------------------|
| Pipeline | Pipeline         |
| Stage    | Stage            |
| Job      | Action           |

## Configure the Datadog integration

To set up the integration between [AWS CodePipeline][1] and Pipeline Visibility, create two AWS resources.

[API Destination][2]
: An HTTP endpoint pointing to Datadog's intake.

[AWS EventBridge Rule][3]
: A rule that forwards CodePipeline events to the API destination.

You can create these resources separately, or at the same time, during the EventBridge Rule creation process.
For more information about monitoring pipeline events, see the [official AWS guide][4].

## Create the API destination

1. In the AWS Console, navigate to {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}API destinations{{< /ui >}} and click {{< ui >}}Create API destination{{< /ui >}}.
2. Choose a name for the API Destination (for example, `datadog-ci-visibility-api`) and optionally add a description.
3. Under {{< ui >}}API destination endpoint{{< /ui >}}, input <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Under {{< ui >}}HTTP method{{< /ui >}}, select {{< ui >}}POST{{< /ui >}}.
5. Under Connection type, select {{< ui >}}Create a new connection{{< /ui >}}:
   1. Choose a name for the connection (for example, `datadog-ci-visibility-connection`) and optionally add a description.
   2. Under {{< ui >}}Destination type{{< /ui >}}, select {{< ui >}}Other{{< /ui >}}.
   3. Under {{< ui >}}Authorization type{{< /ui >}}, select {{< ui >}}API key{{< /ui >}}. Input `DD-API-KEY` as the {{< ui >}}API key name{{< /ui >}} and add your [Datadog API key][5] in the {{< ui >}}Value{{< /ui >}} field.
6. Click {{< ui >}}Create{{< /ui >}}.

## Create the EventBridge rule

1. In the AWS Console, navigate to {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}Rules{{< /ui >}} and click {{< ui >}}Create Rule{{< /ui >}}.
2. Choose a name for the rule (for example, `datadog-ci-visibility-integration`) and optionally add a description.
3. Leave the event bus as {{< ui >}}default{{< /ui >}}, and under {{< ui >}}Rule Type{{< /ui >}}, select {{< ui >}}Rule with an event pattern{{< /ui >}}. Click {{< ui >}}Next{{< /ui >}}.
4. Under {{< ui >}}Event Source{{< /ui >}}, select {{< ui >}}AWS events or EventBridge partner events{{< /ui >}}.
5. Under {{< ui >}}Creation Method{{< /ui >}}, select {{< ui >}}Custom pattern (JSON editor){{< /ui >}}. Then, under {{< ui >}}Event Pattern{{< /ui >}}, input the following:

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   The JSON above sets up the integration for all of your pipelines. To restrict the set of pipelines,
   follow the [Only monitor specific pipelines section](#only-monitor-specific-pipelines) below.

6. Click {{< ui >}}Next{{< /ui >}}.
7. Under {{< ui >}}Target Types{{< /ui >}}, select {{< ui >}}EventBridge API destination{{< /ui >}}. Then, choose {{< ui >}}Use an existing API Destination{{< /ui >}} and select the API destination that you created in the previous step. Alternatively, you can also create the API destination by following the steps outlined in the [Create the API Destination section](#create-the-api-destination).
8. Under {{< ui >}}Headers Parameters{{< /ui >}}, click {{< ui >}}Add header parameter{{< /ui >}}. Input `DD-CI-PROVIDER-AWSCODEPIPELINE` as the key and `true` as the value.
9. Choose {{< ui >}}Create a new role for this specific resource{{< /ui >}} (or use an existing one).
10. Review that the information is correct and create the rule.

Once you've created the rule, you can monitor your pipelines in Datadog.

## Advanced configuration

### Only monitor specific pipelines

You can optionally restrict the pipelines that are monitored by Pipeline Visibility.
To do this, add the `detail.pipeline` filter in the rule event pattern defined when creating the EventBridge Rule. For example:

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

The event pattern sets up the integration only for the `first-pipeline` and `second-pipeline` pipelines.

### Correlate pipelines with tests

If you are using [Test Optimization][8] and your pipeline contains one or more [AWS CodeBuild][9] actions to execute tests, you can correlate your tests with the related pipeline inside Datadog Pipeline Visibility. For instructions, refer to [Add the pipeline execution ID](#add-the-pipeline-execution-id-as-an-environment-variable).

### Collect job logs

The AWS CodePipeline integration supports correlating **CodeBuild** actions with their respective job and pipeline spans. To enable log collection for your CodeBuild actions, see the [AWS log forwarding guide][16].

<div class="alert alert-warning">If you use custom CloudWatch log group or log stream names for your CodeBuild actions, enable <a href="/integrations/amazon_web_services/#resource-collection">Cloud Resource Collection</a> in the AWS integration so that Datadog can resolve the custom log group and stream configuration.</div>

Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for AWS CodeBuild can be identified by the `source:codebuild` and `sourcecategory:aws` tags.

### Add the pipeline execution ID as an environment variable

The pipeline execution ID is an identifier Datadog needs to uniquely identify a pipeline execution. Perform the following steps to assign a pipeline execution ID to correlate pipelines with tests and custom commands:

1. In the AWS Console, go to your pipeline configuration and click {{< ui >}}Edit{{< /ui >}}
2. Go to the stage containing the AWS CodeBuild action, click {{< ui >}}Edit Stage{{< /ui >}}, and then edit the relevant action.
3. Under {{< ui >}}Environment variables{{< /ui >}}, add an environment variable.
Name the variable `DD_PIPELINE_EXECUTION_ID`, and the value `#{codepipeline.PipelineExecutionId}`. Leave the type as _Plaintext_.
4. Click {{< ui >}}Done{{< /ui >}} to save your changes.

The steps above allow you to add the pipeline execution ID to your CodeBuild action environment variables. For more information on working with variables, see the [official AWS guide][10].

## Visualize pipeline data in Datadog

View your data on the [**CI Pipeline List**][11] and [**Executions**][12] pages after the pipelines finish.

The {{< ui >}}CI Pipeline List{{< /ui >}} page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: /continuous_integration/search/#search-for-pipelines
[14]: /glossary/#partial-retry
[15]: /glossary/#running-pipeline
[16]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /glossary/#approval-wait-time
[18]: /glossary/#custom-span
[19]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /glossary/#pipeline-execution-time
