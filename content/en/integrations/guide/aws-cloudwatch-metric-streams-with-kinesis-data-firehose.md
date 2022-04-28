---
title: AWS CloudWatch Metric Streams with Kinesis Data Firehose
kind: guide
further_reading:
- link: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html"
  tag: "Documentation"
  text: "Metric streams - Amazon CloudWatch"
- link: "https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/"
  tag: "Blog"
  text: "Collect Amazon CloudWatch metrics using Metric Streams"
---
{{< site-region region="us3,us5,gov" >}}

**The AWS CloudWatch Metric Streams with Kinesis Data Firehose is not supported on this Datadog site.**
{{< /site-region >}}
 
Using Amazon CloudWatch Metric Streams and Amazon Kinesis Data Firehose, you can get CloudWatch metrics into Datadog faster with a 2-3 minute latency. This is significantly faster than Datadog’s API polling approach, which provides updated metrics every 10 minutes.

## Overview

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagram of the metrics flow" responsive="true">}}
 
1. Create these AWS resources in each AWS account and region for which you want to stream metrics:
   - Create a Kinesis Data Firehose delivery stream that delivers metrics to Datadog, along with an S3 Backup for any failed metrics delivery.
   - Create a CloudWatch Metric Stream linked to your delivery stream.
   - Optionally specify a limited set of namespaces to stream metrics.
2. Once you create these resources, Datadog immediately starts receiving the streamed metrics and displays them on the Datadog site with no additional configuration needed.
   
   
### Metric Streaming versus API polling {#streaming-vs-polling}

The following are key differences between using CloudWatch Metric Streams and API polling.

- **Namespace filtering on AWS**: Per-namespace defaults and account-level settings in the AWS Integration tile only apply to the API polling approach. Manage all rules for including and excluding namespaces in the streams using the CloudWatch Metric Streams configuration in your AWS accounts.

- **Metrics that report with more than a two hour delay**: API polling continues to collect metrics like `aws.s3.bucket_size_bytes` and `aws.billing.estimated_charges` after metric streaming is enabled, since these cannot be sent through CloudWatch Metric Stream.

#### Switching from API polling to metric streams
If you already receive metrics for a given CloudWatch namespace through the API polling method, Datadog automatically detects this and stops polling metrics for that namespace once you start streaming them. Leave your configuration settings in the AWS integration tile unchanged; as Datadog continues to use API polling to collect custom tags and other metadata for your streamed metrics.

#### Switching back from metric streams to API polling

If you later decide you don't want to stream metrics for a given AWS account and region, or even just for a specific namespace, Datadog automatically starts collecting those metrics using API polling again based on the configuration settings in the AWS integration tile. In the case you want to stop streaming all metrics for an AWS account and region, follow the instructions in the [Disable Metric Streaming section](#disable-metric-streaming) of this document.

### Billing
 
There is no additional charge from Datadog to stream metrics.
 
AWS charges based on the number of metric updates on the CloudWatch Metric Stream and the data volume sent to the Kinesis Data Firehose. There is the potential to see an increased CloudWatch cost for the subset of metrics you are streaming, so Datadog recommends prioritizing using metric streams for the AWS services, regions, and accounts where you most need the lower latency. For more information, see [Amazon CloudWatch pricing][3].
 
EC2 or Lambda metrics in the stream could increase the number of billable hosts and Lambda invocations (if those hosts and functions aren't already monitored with the AWS Integration or Datadog Agent in the case of EC2).
 
## Setup
 
### Before you begin

1. Read the [Metric Streaming versus API polling](#streaming-vs-polling) section carefully to understand the differences before enabling Metric Streaming. 

2. If you haven't already, connect your AWS account to Datadog. For more information, see [the CloudFormation setup instructions][4].
 
### Installation
 
{{< tabs >}}
{{% tab "CloudFormation" %}}
 
Datadog recommends using CloudFormation because it's automatic and easier if you are using multiple AWS regions.
 
1. On your Datadog site, go to the **Configuration** tab of the [AWS Integration tile][1].
2. Click on the AWS account to set up metric streaming.
3. Under **Metric Collection**, click on the **CloudWatch Metric Streams** tab.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-streams.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
4. Click on **Automatically Using CloudFormation** to launch creating a stack in the AWS console.
5. Fill in the required parameters:
   - **ApiKey**: Add your [Datadog API key][2].
   - **DdSite**: Select your [Datadog site][3]. Your site is: {{< region-param key="dd_site" code="true" >}}
   - **Regions**: A comma separated list of the regions you wish to set up for metrics streaming. For a full list of supported regions, see the AWS documentation on [Using metric streams][4].
6. Fill in the optional parameters:
   - **FilterMethod**: Include or Exclude list of namespaces to include for metrics streaming.
   - **First/Second/Third Namespace**: Specify the namespaces you wish to include or exclude. Note: The namespace values have to precisely match the values in the namespace column in AWS’s documentation. For example, AWS/EC2.
7. Check the acknowledgment box that states, "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
8. Click **Create Stack**.
 
### Results
 
Once the stack has been successfully created, wait five minutes for Datadog to recognize this. Then go to Datadog’s [AWS Integration tile][1] to verify this is working by viewing the "CloudWatch Metric Streams" tab for the specified AWS account and noting the activated regions.
 
{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Active regions" responsive="true" style="width:60%;">}}
 
 
[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS Console" %}}
 
If you want to set up metric streams using the AWS Console, follow these steps for each AWS region.
 
1. Create a new Kinesis Data Firehose delivery stream with the following specifications:
 - For source, select “Direct PUT or other sources”
- For destination:
  - Select Third-party service provider: `Datadog`.
  - Select the metrics endpoint URL corresponding to your Datadog site: `Datadog metrics - US` or `Datadog metrics - EU`
  - For access key, enter your [Datadog API key][1].
   - For retry duration, enter `60 seconds`.
   - For S3 backup, select `Failed data only` and choose the desired S3 bucket for backup.
 - For HTTP endpoint buffer conditions:
   - Enter `4MB` for buffer size, and `60 seconds` for buffer interval.
 - For S3 buffer conditions:
   - Enter `4MB` for buffer size, and `60 seconds` for buffer interval.
 - For S3 compression, choose `GZIP`.
 - Enable error logging.
2. Create your [CloudWatch Metric Stream][2] with the following steps:
 1. Choose whether you want to stream all CloudWatch metrics, or choose specific namespaces with “Include” or “Exclude” lists.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/cloudwatch-metric-stream.png" alt="Cloudwatch metric stream" responsive="true" style="width:60%;">}}
 2. Select the Firehose you created in Step 1 to use for sending the metrics to Datadog.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/firehose.png" alt="Firehose" responsive="true" style="width:60%;">}}
 3. Create a new service role to put records in Kinesis Data Firehose.
 4. **Change the output format to be OpenTelemetry 0.7**.
 5. Add additional statistics to include the AWS percentile metrics you would like to send to Datadog. See our [CloudFormation template][4] for a list of the percentile metrics Datadog supports via polling.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Percentiles" responsive="true" style="width:60%;">}}
 6. Name your metric stream.
 7. Click **Create metric stream**.
 
### Results
 
Once you see the Metric Stream resource has been successfully created, wait five minutes for Datadog to recognize this. Then go to the [Datadog AWS Integration tile][3] to see this is working by viewing the "CloudWatch Metric Streams" tab for the specified AWS account.
 
{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Active regions" responsive="true" style="width:60%;">}}
**Note**: If you've already enabled polling CloudWatch APIs, the transition to streaming could cause a brief (up to five minutes) period where the specific metrics you are streaming are double-counted in Datadog. This is because of the difference in timing between when Datadog’s crawlers are running and submitting your CloudWatch metrics, and when Datadog recognizes that you have started streaming those metrics and turn off the crawlers.
 
 
[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
{{% /tab %}}
{{< /tabs >}}

### Disable metric streaming

To disable metric streaming completely for a given AWS account and region, you must delete the AWS Metric Steam and its related resources. To prevent loss of metrics in Datadog, it's important to follow these deletion steps carefully:

If you set streaming up with [CloudFormation](?tab=cloudformation#installation):
1. Delete the stack that was created during the setup.

If you set streaming up through the [AWS Console](?tab=awsconsole#installation):
1. Delete the CloudWatch Metric Stream linked to your delivery stream.
2. Delete the Kinesis Data Firehose delivery stream that delivered metrics to Datadog.
3. Delete the backup S3 bucket for failed messages linked to the Firehose.
4. Delete the IAM roles associated with the stream and all other resources that were created while setting up the stream.

Once the resources are deleted, wait for five minutes and verify if the region and namespace are disabled under the “CloudWatch Metric Streams” tab for the specified AWS account in Datadog.

## Troubleshooting
To resolve any issues encountered while setting up Metric Streams or the associated resources, see [AWS Troubleshooting][5].

## Further Reading
 {{< partial name="whats-next/whats-next.html" >}}
 
[1]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
[2]: /metrics/distributions/#overview
[3]: https://aws.amazon.com/cloudwatch/pricing/
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#setup
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
