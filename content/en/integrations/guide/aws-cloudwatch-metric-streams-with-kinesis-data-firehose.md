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
{{< site-region region="gov" >}}

**The AWS CloudWatch Metric Streams with Kinesis Data Firehose is not supported on the Datadog for Government site.**
{{< /site-region >}}
{{< site-region region="us3" >}}

**The AWS CloudWatch Metric Streams with Kinesis Data Firehose is not supported on the Datadog US3 site.**
{{< /site-region >}}
 
Using Amazon CloudWatch Metric Streams and Amazon Kinesis Data Firehose, you can get CloudWatch metrics into Datadog faster with a 2-3 minute latency. This is significantly faster than Datadog’s API polling approach, which provides updated metrics every 10 minutes.
## Overview
 
1. Create these AWS resources in each AWS account and region for which you want to stream metrics:
   - Create a Kinesis Data Firehose delivery stream that delivers metrics to Datadog, along with an S3 Backup for any failed metrics delivery.
   - Create a CloudWatch Metric Stream linked to your delivery stream.
   - Optionally specify a limited set of namespaces to stream metrics.
2. Once you create these resources, Datadog immediately starts receiving the streamed metrics and displays them in the Datadog application with no additional configuration needed.
   - **Note**: Per-namespace defaults and account-level settings in the AWS Integration tile only apply to the API polling approach. Manage all rules for including and excluding namespaces in the streams using the CloudWatch Metric Streams configuration in your AWS accounts.
   - If you already receive the same CloudWatch metrics through the API polling method, Datadog automatically detects this and stops polling those metrics since you are streaming them.
   - If you later decide you don't want to stream a metric and delete the stream or remove namespaces from it, Datadog automatically starts collecting those metrics using API polling again, according to your configuration settings in the AWS Integration tile.
 
### Billing
 
There is no additional charge from Datadog to stream metrics.
 
AWS charges based on the number of metric updates on the CloudWatch Metric Stream and the data volume sent to the Kinesis Data Firehose. There is the potential to see an increased CloudWatch cost for the subset of metrics you are streaming, so Datadog recommends prioritizing using metric streams for the AWS services, regions, and accounts where you most need the lower latency. For more information, see [Amazon's pricing documentation][1].
 
EC2 or Lambda metrics in the stream could increase the number of billable hosts and Lambda invocations (if those hosts and functions aren't already monitored with the AWS Integration or Datadog Agent in the case of EC2).
 
## Setup
 
### Before you begin
 
If you haven't already, connect your AWS account to Datadog. For more information, see [the CloudFormation setup instructions][2].
 
### Installation
 
{{< tabs >}}
{{% tab "CloudFormation" %}}
 
Datadog recommends using CloudFormation because it's automatic and easier if you are using multiple AWS regions.
 
1. In your Datadog application, go to the **Configuration** tab of the [AWS Integration tile][1].
2. Click on the AWS account to set up metric streaming.
3. Under **Metric Collection**, click on the **CloudWatch Metric Streams** tab.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-streams.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
4. Click on **Automatically Using CloudFormation** to launch creating a stack in the AWS console.
5. Fill in the required parameters:
   - **ApiKey**: Add your [Datadog API key][2].
   - **DdSite**: Select your [Datadog site][3]. Your site is: {{< region-param key="dd_site" code="true" >}}
   - **Regions**: A comma separated list of the regions you wish to set up for metrics streaming. For a full list of supported documentation, see the [AWS documentation][4].
6. Fill in the optional parameters:
   - **FilterMethod**: Include or Exclude list of namespaces to include for metrics streaming.
   - **First/Second/Third Namespace**: Specify the namespaces you wish to include or exclude. Note: The namespace values have to precisely match the values in the namespace column in AWS’s documentation. For example, AWS/EC2.
7. Check the acknowledgment box that states, "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
8. Click **Create Stack**.
 
### Results
 
Once the stack has been successfully created, wait five minutes for Datadog to recognize this. Then go to Datadog’s [AWS Integration tile][1] to verify this is working by viewing the "CloudWatch Metric Streaming" tab for the specified AWS account and noting the activated regions.
 
{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
 
 
[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://app.datadoghq.com/account/settings#api
[3]: /getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS Console" %}}
 
If you want to set up metric streams using the AWS Console, follow these steps for each AWS region.
 
1. Create a new Kinesis Data Firehose delivery stream with the following specifications:
 - For source, select “Direct PUT or other sources”
- For destination:
  - Select “HTTP Endpoint”
  - For URL, use:
   - `https://awsmetrics-intake.datadoghq.com/v1/input` (US Site)
   - `https://awsmetrics-intake.datadoghq.eu/v1/input` (EU Site)
  - For access key, enter your [Datadog API key][2].
   - For retry duration, enter `60 seconds`.
   - For S3 backup, select `Failed data only` and choose the desired S3 bucket for backup.
 - For HTTP endpoint buffer conditions:
   - Enter `4MB` for buffer size, and `60 seconds` for buffer interval.
 - For S3 buffer conditions:
   - Enter `4MB` for buffer size, and `60 seconds` for buffer interval.
 - For S3 compression, choose `GZIP`.
 - Enable error logging.
2. Create your [CloudWatch Metric Stream][3] with the following steps:
 1. Choose whether you want to stream all CloudWatch metrics, or choose specific namespaces with “Include” or “Exclude” lists.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/cloudwatch-metric-stream.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
 2. Select the Firehose you created in Step 1 to use for sending the metrics to Datadog.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/firehose.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
 3. Create a new service role to put records in Kinesis Data Firehose.
 4. Choose OpenTelemetry 0.7 as the output format.
 5. Name your metric stream.
 6. Click **Create metric stream**.
 
### Results
 
Once you see the Metric Stream resource has been successfully created, wait five minutes for Datadog to recognize this. Then go to the [Datadog AWS Integration tile][4] to see this is working by viewing the "CloudWatch Metric Streams" tab for the specified AWS account.
 
{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Metric streams selection tab" responsive="true" style="width:60%;">}}
**Note**: If you've already enabled polling CloudWatch APIs, the transition to streaming could cause a brief (up to five minutes) period where the specific metrics you are streaming are double-counted in Datadog. This is because of the difference in timing between when Datadog’s crawlers are running and submitting your CloudWatch metrics, and when Datadog recognizes that you have started streaming those metrics and turn off the crawlers.
 
 ## Further Reading
 
 
[1]: /getting_started/site/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[4]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

 {{< partial name="whats-next/whats-next.html" >}}
 
[1]: https://aws.amazon.com/cloudwatch/pricing/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#setup
