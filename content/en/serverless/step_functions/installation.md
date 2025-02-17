---
title: Install Serverless Monitoring for AWS Step Functions
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

### Requirements
* The full Step Function execution length must be less than 6 hours for full traces.

### How it works
AWS Step Functions is a fully managed service, and the Datadog Agent cannot be directly installed on Step Functions. However, Datadog can monitor Step Functions through Cloudwatch metrics and logs.

Datadog collects Step Functions metrics from Cloudwatch through the [AWS Step Functions integration][9]. Datadog collects Step Functions logs from Cloudwatch through one of the following:

- [Datadog Forwarder][6]. For instructions, see the [Setup](#setup) section on this page.
- Amazon Data Firehose. For instructions, see [Send AWS service logs to the Datadog Amazon Data Firehose destination][7].

Datadog uses these ingested logs to generate [enhanced metrics][8] and traces for your Step Function executions.

{{< img src="serverless/step_functions/telemetry_ingestion.png" alt="A diagram explaining how Step Functions telemetry is ingested and used in Datadog" style="width:100%;" >}}

## Setup

Ensure that the [AWS Step Functions integration][9] is installed.

Then, to send your Step Functions logs to Datadog:

1. Enable all logging for your Step Function. In your AWS console, open your state machine. Click *Edit* and find the Logging section. There, set *Log level* to `ALL` and enable the *Include execution data* checkbox.
   {{< img src="serverless/step_functions/aws_log.png" alt="AWS UI, Logging section, showing log level set to ALL." style="width:100%;" >}}

2. Ensure you have deployed the [Datadog Lambda Forwarder][6], and that you are using v3.130.0+. You might need to [update your Forwarder][6]. As an alternative, you may also use [Amazon Data Firehose][16], which can subscribe to Amazon CloudWatch log groups across multiple AWS regions. However, it requires that the Step Functions log group name begins with "/aws/vendedlogs/states/".

3. Subscribe CloudWatch logs to the Datadog Lambda Forwarder. If the log group name for your Step Functions begins with "/aws/vendedlogs/states/", you can also use the [Serverless Framework or the Datadog CLI to configure the subscription][11].
   {{< tabs >}}
   {{% tab "Automatic" %}}
   1. Ensure that you have set up the [Datadog-AWS integration][1].
   2. In Datadog, open the [AWS integration tile][2], and view the *Configuration* tab.
   3. On the left, select the AWS account where your Step Function is running. Open the *Log Collection* tab.
   4. In the *Log Autosubscription* section, under *Autosubscribe Forwarder Lambda Functions*, enter the ARN of your Datadog Lambda Forwarder, as noted previously. Click *Add*.
   5. Toggle on *Step Functions CloudWatch Logs*. Changes take 15 minutes to take effect.

   **Note**: Log Autosubscription requires your Lambda Forwarder and Step Function to be in the same region.

   [1]: /getting_started/integrations/aws/
   [2]: https://app.datadoghq.com/integrations/aws
   {{% /tab %}}
   {{% tab "Manual" %}}
   1. Open your AWS console and go to your Datadog Lambda Forwarder. In the *Function overview* section, click on *Add trigger*.
   2. Under *Add trigger*, in the *Trigger configuration* section, use the *Select a source* dropdown to select `CloudWatch Logs`.
   3. Under *Log group*, select the log group for your state machine. For example, `/aws/vendedlogs/states/my-state-machine`.
   4. Enter a filter name. You can choose to name it "empty filter" and leave the *Filter pattern* box blank.
   {{% /tab %}}
   {{< /tabs >}}


4. Set up tags. Open your AWS console and go to your Step Functions state machine. Open the *Tags* section and add `env:<ENV_NAME>`, `service:<SERVICE_NAME>`, and `version:<VERSION>` tags. The `env` tag is required to see traces in Datadog, and it defaults to `dev`. The `service` tag defaults to the state machine's name. The `version` tag defaults to `1.0`.

5. To enable tracing, you have two options:
   - **Per Step Function**: Add the `DD_TRACE_ENABLED` tag to each Step Function and set the value to `true`.
   - **At the Forwarder level**: To enable tracing for all Step Functions connected to the Forwarder, you have two options:
     - When creating the CloudFormation stack for the forwarder, set the `DdStepFunctionsTraceEnabled` parameter to `true`.
     - After the forwarder is created, set the environment variable `DD_STEP_FUNCTIONS_TRACE_ENABLED` to `true`.

   <div class="alert alert-info">If you enable tracing (which automatically includes enhanced metrics), you are billed for both Serverless Workload Monitoring and Serverless APM. See <a href="https://www.datadoghq.com/pricing/?product=serverless-monitoring#products">Pricing</a>.</div>

## Additional options for instrumentation


### Merge Step Functions with AWS Lambda traces

See [Merge Step Functions traces with Lambda traces][11]. Ensure that you have also [set up Serverless Monitoring for AWS Lambda][10].

### Sample traces

To manage the APM traced invocation sampling rate for serverless functions, set the `DD_TRACE_SAMPLE_RATE` environment variable on the function to a value between 0.00 (no tracing of Step Function invocations) and 1.00 (trace all Step Function invocations). 

The dropped traces are not ingested into Datadog. 

### Enable enhanced metrics (without tracing)

Datadog generates [enhanced metrics][8] from collected Cloudwatch logs. Enhanced metrics are automatically enabled if you enable traces.

To enable enhanced metrics without enabling tracing, add a `DD_ENHANCED_METRICS` tag to each of your Step Functions and set the value to `true`.

<div class="alert alert-info">If you enable enhanced metrics without enabling traces, you are only billed for Serverless Workload Monitoring. If you enable tracing (which automatically includes enhanced metrics), you are billed for both Serverless Workload Monitoring and Serverless APM. See <a href="https://www.datadoghq.com/pricing/?product=serverless-monitoring#products">Pricing</a>.</div>

## See your Step Function metrics, logs, and traces in Datadog

After you have invoked your state machine, go to the [**Serverless app**][2] in Datadog. Search for `service:<YOUR_STATE_MACHINE_NAME>` to see the relevant metrics, logs, and traces associated with that state machine. If you set the `service` tag on your state machine to a custom value, search for `service:<CUSTOM_VALUE>`.

{{< img src="serverless/step_functions/overview1.png" alt="An AWS Step Function side panel view." style="width:100%;" >}}

If you cannot see your traces, see [Troubleshooting][5].

[2]: https://app.datadoghq.com/functions?search=&cloud=aws&entity_view=step_functions
[3]: /serverless/installation/#installation-instructions
[5]: /serverless/step_functions/troubleshooting
[6]: /logs/guide/forwarder
[7]: /logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[8]: /serverless/step_functions/enhanced-metrics
[9]: /integrations/amazon_step_functions
[10]: /serverless/aws_lambda/installation
[11]: /serverless/step_functions/merge-step-functions-lambda
[13]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[14]: /getting_started/integrations/aws/
[15]: https://app.datadoghq.com/integrations/aws
[16]: /logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
