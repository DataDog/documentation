---
title: Set up Tracing on a AWS CodePipeline Pipeline
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/codepipeline
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

- **Partial pipelines**: View partially retried executions

## Configure the Datadog integration

To set up the integration between [AWS CodePipeline][1] and Datadog CI Visibility, two AWS resources need to be created:
1. [API Destination][2]: an HTTP endpoint pointing to Datadog's intake.
2. [AWS EventBridge Rule][3]: a rule that forwards CodePipeline events to the API Destination.

The following guide separates the two creation steps for clarity, but note that it's not required to create the resources
separately. They can also be created at the same time during the EventBridge Rule creation process.

More information about monitoring pipeline events can be found in the [official AWS guide][4].

### Create the API Destination

1. In the AWS Console, go to **EventBridge > API destinations** and click on **Create API destination**.
2. Choose a name for the API Destination (for example, **datadog-ci-visibility-api**) and optionally add a description.
3. Under **API destination endpoint**, input <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. Under **HTTP method**, select **POST**.
5. Under Connection type, select **Create a new connection**:
   1. Choose a name for the connection (for example, **datadog-ci-visibility-connection**) and optionally add a description.
   2. Under **Destination type**, select **Other**
   3. Under **Authorization type**, select **API key**.
   Input **DD-API-KEY** as the **API key name** and input your [Datadog API Key][5] in the **Value** field.
6. Click on **Create**.

### Create the EventBridge Rule

1. In the AWS Console, go to **EventBridge > Rules** and click on **Create Rule**.
2. Choose a name for the rule (for example, **datadog-ci-visibility-integration**) and optionally add a description.
3. Leave the event bus as **default**, and, under **Rule Type**, select **Rule with an event pattern**. Click on **Next**.
4. Under **Event Source**, select **AWS events or EventBridge partner events**.
5. Under **Creation Method**, select **Custom pattern (JSON editor)**. Then, under **Event Pattern**, input the following JSON:
   ```
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```
   The JSON above sets up the integration for all of your pipelines. To restrict the set of pipelines,
   follow the [Only monitor specific pipelines][6] section below.
6. Click on **Next**.
7. Under **Target Types**, select **EventBridge API destination**. Then, choose **Use an existing API Destination**
and select the API destination that you have created in the previous step. Alternatively, you can also create the API destination
by following the steps outlined in the [Create the API Destination][7] section.
8. Under **Headers Parameters**, Click on **Add header parameter**. Input `DD-CI-PROVIDER-AWSCODEPIPELINE` as the key and `true` as the value.
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
with the related pipeline inside Datadog Pipeline Visibility. To do that:
1. In the AWS Console, go to your pipeline configuration and click on **Edit**
2. Go to the stage containing the AWS CodeBuild action, click on **Edit Stage**, and then edit the relevant action.
3. Under **Environment variables**, add a new environment variable.
Name the variable `DD_PIPELINE_EXECUTION_ID`, and the value `#{codepipeline.PipelineExecutionId}`. Leave the type as _Plaintext_.
4. Click on **Done** to save your changes.

The steps above allow you to add the pipeline execution ID to your CodeBuild action environment variables. More information
can be found in the official AWS guide on [Working with Variables][10].

## Visualize pipeline data in Datadog

View your data on the [Pipelines][11] and [Pipeline Executions][12] pages after the pipelines finish.

**Note**: The Pipelines page only shows data for the [default branch][13] of each repository.

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


