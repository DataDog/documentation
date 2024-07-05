---
title: Set up Tracing on a AWS CodePipeline Pipeline
aliases:
  - /continuous_integration/setup_pipelines/codepipeline
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/"
      tag: "Blog"
      text: "Monitor and improve your CI/CD on AWS CodePipeline with Datadog CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[AWS CodePipeline][1] is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.

Set up tracing on AWS CodePipeline to collect data about pipeline executions, analyze performance bottlenecks or operational issues, and monitor your deployment workflows.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Partial retries][14] | Partial pipelines | View partially retried pipeline executions. |
| *[Running pipelines][15] | Running pipelines | View pipeline executions that are running. Queued or waiting pipelines will show with status "Running" on Datadog. |
| **Logs correlation | Logs correlation	| Correlate pipeline and job spans to logs and enable [job log correlation](#enable-log-correlation). |
| [Approval wait time][17] | Approval wait time  | View the amount of time jobs and pipelines wait for manual approvals. |

*AWS CodePipeline running pipelines don't have Git information until they have finished.\
**AWS CodePipeline logs correlation is only available for AWS CodeBuild actions.

## Configure the Datadog integration

To set up the integration between [AWS CodePipeline][1] and Datadog CI Visibility, create two AWS resources:

1. [API Destination][2]: an HTTP endpoint pointing to Datadog's intake.
2. [AWS EventBridge Rule][3]: a rule that forwards CodePipeline events to the API Destination.

You can create these resources separately, or at the same time, during the EventBridge Rule creation process.
For more information about monitoring pipeline events, see the [official AWS guide][4].

### Create the API Destination

1. In the AWS Console, go to **EventBridge > API destinations** and click **Create API destination**.
2. Choose a name for the API Destination (for example, **datadog-ci-visibility-api**) and optionally add a description.
3. Under **API destination endpoint**, input <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Under **HTTP method**, select **POST**.
5. Under Connection type, select **Create a new connection**:
   1. Choose a name for the connection (for example, **datadog-ci-visibility-connection**) and optionally add a description.
   2. Under **Destination type**, select **Other**.
   3. Under **Authorization type**, select **API key**.
   Input `DD-API-KEY` as the **API key name** and input your [Datadog API Key][5] in the **Value** field.
6. Click **Create**.

### Create the EventBridge Rule

1. In the AWS Console, go to **EventBridge > Rules** and click **Create Rule**.
2. Choose a name for the rule (for example, **datadog-ci-visibility-integration**) and optionally add a description.
3. Leave the event bus as **default**, and, under **Rule Type**, select **Rule with an event pattern**. Click **Next**.
4. Under **Event Source**, select **AWS events or EventBridge partner events**.
5. Under **Creation Method**, select **Custom pattern (JSON editor)**. Then, under **Event Pattern**, input the following JSON:
   ```
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```
   The JSON above sets up the integration for all of your pipelines. To restrict the set of pipelines,
   follow the [Only monitor specific pipelines][7] section below.
6. Click **Next**.
7. Under **Target Types**, select **EventBridge API destination**. Then, choose **Use an existing API Destination**
and select the API destination that you have created in the previous step. Alternatively, you can also create the API destination
by following the steps outlined in the [Create the API Destination][6] section.
8. Under **Headers Parameters**, click **Add header parameter**. Input `DD-CI-PROVIDER-AWSCODEPIPELINE` as the key and `true` as the value.
9. Choose **Create a new role for this specific resource** (or use an existing one).
10. Review that the information is correct and create the rule.

Once the rule is created, the integration is complete, and you can monitor your pipelines in Datadog.

### Only monitor specific pipelines

You can optionally restrict the pipelines that are monitored by Pipeline Visibility.
To do this, add the `detail.pipeline` filter in the rule event pattern defined when creating the EventBridge Rule. For example:

```
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

The event pattern above sets up the integration only for the `first-pipeline` and `second-pipeline` pipelines.

### Correlate pipelines with tests

If you are using [Test Visibility][8] and your pipeline contains one or more [AWS CodeBuild][9] actions to execute tests, you can correlate your tests
with the related pipeline inside Datadog Pipeline Visibility.
1. In the AWS Console, go to your pipeline configuration and click **Edit**
2. Go to the stage containing the AWS CodeBuild action, click **Edit Stage**, and then edit the relevant action.
3. Under **Environment variables**, add an environment variable.
Name the variable `DD_PIPELINE_EXECUTION_ID`, and the value `#{codepipeline.PipelineExecutionId}`. Leave the type as _Plaintext_.
4. Click **Done** to save your changes.

The steps above allow you to add the pipeline execution ID to your CodeBuild action environment variables. For more information on working with variables, see the [official AWS guide][10].

### Enable log correlation

The AWS CodePipeline integration supports correlating **CodeBuild** actions with their respective job and pipeline spans. To enable log collection for your CodeBuild actions, see the [AWS log forwarding guide][16].

<div class="alert alert-warning"><strong>Note</strong>: Log correlation for CodeBuild actions requires the CodeBuild project to have the default CloudWatch log group and log stream names.</div>

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for AWS CodeBuild can be identified by the <code>source:codebuild</code> and <code>sourcecategory:aws</code> tags.</div>

## Visualize pipeline data in Datadog

View your data on the [**CI Pipeline List**][11] and [**Executions**][12] pages after the pipelines finish.

The **CI Pipeline List** page shows data for only the [default branch][13] of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /continuous_integration/pipelines/awscodepipeline/#create-the-api-destination
[7]: /continuous_integration/pipelines/awscodepipeline/#only-monitor-specific-pipelines
[8]: https://docs.datadoghq.com/continuous_integration/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: https://docs.datadoghq.com/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[14]: /glossary/#partial-retry
[15]: /glossary/#running-pipeline
[16]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /glossary/#approval-wait-time
