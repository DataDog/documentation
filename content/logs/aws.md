---
title: AWS Log Collection
kind: Documentation
further_reading:
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

## Overview

To start collecting logs from one of your AWS services:

1. Set up the [Datadog lambda function](#create-a-new-lambda-function)
2. Enable Logging for your AWS service
2. Configure the triggers that cause the Lambda to execute and send logs to Datadog. There are two ways to configure the triggers that will cause the Lambda to execute and send logs to Datadog: 

  * [automatically](/integrations/amazon_web_services/#automatic-log-collection): With the right set of [permissions](#permissions), Datadog manages them for you. 
  * [manually](#manually-set-up-triggers): set up each trigger yourself in the AWS console.

Here is a summary of currently supported services for log-collection

|AWS service | logging activation | Log collection |
|:------|:-----|:------|
| [Elastic Load Balancing (ELB)](/integrations/amazon_elb) | [Enable AWS ELB logs](/integrations/amazon_elb/#enable-aws-elb-logging) |[Manual](/integrations/amazon_elb/#manual-installation-steps) and [automatic](/integrations/amazon_web_services/#automatic-log-collection) log collection |
| [AWS S3](/integrations/amazon_s3) | [Enable AWS S3 logs](/integrations/amazon_s3/#enable-s3-access-logs) |[Manual](/integrations/amazon_S3/#manual-installation-steps) and [automatic](/integrations/amazon_web_services/#automatic-log-collection) log collection|


## Create a new Lambda function

1. Navigate to the [Lambda Console](https://console.aws.amazon.com/lambda/home?region=us-east-1) and create a new function:
    {{< img src="logs/aws/create_lambda_function.png" alt="Create Lambda function" responsive="true" popup="true">}}

2. Select **Author from scratch** and give the function a unique name.
3. Change the Runtime to **Python 2.7**
4. For `Role`, select **Create new role from template(s)** and give the role a unique name.
5. Under Policy templates, search for and select **s3 object read-only permissions.**
6. Select **Create Function.**
    {{< img src="logs/aws/author_from_scratch.png" alt="Author from Scratch" responsive="true" >}}

## Provide the code and configure the Lambda

1. Copy and paste the code from [this repo](https://github.com/DataDog/dd-aws-lambda-functions/blob/master/Log/lambda_function.py) into the function code area.
2. Ensure the Handler reads **lambda_function.lambda_handler**
    {{< img src="logs/aws/select_python.png" alt="Select Python" responsive="true" >}}
3. At the top of the script you'll find a section called `#Parameters`. You have two options for providing the API Key that the Lambda function requires:
    
    * Setup an environment variable (Preferred)
    * Edit the code directly with your Datadog API Key
    {{< img src="logs/aws/dd_api_key_setup.png" alt="DD API key setup" responsive="true" popup="true">}}
4. Scroll down beyond the inline code area to **Basic Settings**.
5. Set the memory to **around 1GB**.
6. Set the timeout limit. We recommend **120 seconds.**
    {{< img src="logs/aws/basic_settings.png" alt="Basic Settings" responsive="true" >}}
7. Scroll back to the top of the page and hit **Save.**

## Test your Lambda

1. Press **Test**. 
2. Search for and select **Cloudwatch Logs** as the sample event.
    {{< img src="logs/aws/test_event.png" alt="Test Event" responsive="true" >}}
2. Give the event a unique name and press **Create**.
3. Press Test and ensure the test passes with no errors.


## Manually set up triggers
In your Lambda, go in the triggers tab and select `Add Trigger`:

{{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" responsive="true" popup="true"style="width:80%;">}}

Select the log source and then follow the AWS instructions: 

{{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" responsive="true" popup="true" style="width:80%;">}}

For instance, do not forget to set the correct event type on S3 Buckets:

{{< img src="logs/aws/object_created.png" alt="Object Created" responsive="true" popup="true" style="width:80%;">}}

### CloudTrail

AWS CloudTrail is an audit service. Use AWS CloudTrail to get a history of AWS API calls and related events for your account. This includes calls made with the AWS Management Console, AWS SDKs, command line tools, and higher-level AWS services.

When you define your Trails, select a s3 bucket to write the logs in:

{{< img src="logs/aws/tail_s3_selection.png" alt="S3 Selection" responsive="true" popup="true" style="width:80%;">}}

Link the Lambda function to this s3 bucket to send your logs to Datadog.

### ECS

ECS logs are the legacy Docker container. They are not directly related to the ECS service, but they correspond to the logs written by the running application (in you Docker Containers). 

Collect ECS logs directly from the containers thanks to our [Agent 6 Docker integration](/integrations/docker_daemon). You can also [redirect those logs to Cloudwatch](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html#w2ab1c21c21c13 ) and ask the Lambda to ship them to your Datadog platform.

### CloudFront

CloudFront is a CDN service which speeds up distribution of your static and dynamic web content, for example, .html, .css, .php and image files to end users.

CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the user is routed to the edge location that provides the lowest latency (time delay), so content is delivered with the best possible performance.

When you enable logging for a distribution, specify the Amazon S3 bucket that you want CloudFront to store log files in. 
If you're using Amazon S3 as your origin, we recommend that you do not use the same bucket for your log files; using a separate bucket simplifies maintenance.

Store the log files for multiple distributions in the same bucket. When enabling logging, specify an optional prefix for the file names, [to keep track of which log files are associated with which distributions](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket ) 

You can then collect the log from the s3 bucket thanks to the Lambda function.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
