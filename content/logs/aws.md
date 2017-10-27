---
title: AWS Log Collection
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
beta: true
---

## Overview

This documentation explains how to create a Lambda function in AWS to forward S3 logs to Datadog.

S3 logging is used by well known services such as: ELB, S3, CloudTrail, VPC, CloudFront and CloudWatch. There are then all eligible to this method.
Using a Lambda function is elegant as it avoids the hassle of creating processes that would pull periodically the incoming S3 logs. The Lambda function is called whenever a new S3 log file is made available.
Features:

* Use AWS Lambda to re-route triggered S3 events to Datadog
* ELB, S3, CloudTrail, VPC and CloudFont logs can be forwarded
* SSL Security
* JSON events providing details about S3 documents forwarded
* Structured meta-information can be attached to the event

## Setup
### Installation
#### Create a new lambda function

1. Navigate to the [Lambda Console](https://console.aws.amazon.com/lambda/home?region=us-east-1) and create a new function:
    {{< img src="logs/aws/create_lambda_function.png" alt="Create Lambda function" >}}

2. Select **Author from scratch** and give the function a unique name.
    {{< img src="logs/aws/author_from_scratch.png" alt="Author from Scratch" >}}
3. For `Role`, select **Create new role from template(s)** and give the role a unique name
4. Under Policy templates, search for and select **s3 object read-only permissions**
    {{< img src="logs/aws/basic_information.png" alt="Basic Information" >}}
5. Select **Create Function**

#### Provide the code and configure the lambda

6. Copy and paste the code from [This repo](https://github.com/DataDog/dd-aws-lambda-functions/blob/master/Log/lambda_function.py) into the function code area. (Can you do this for python still??)
7. Change the Runtime to **Python 2.7**
    {{< img src="logs/aws/select_python.png" alt="Select Python" >}}
8. At the top of the script you'll find a section called `#Parameters`, that's where you want to edit your code.
    {{< img src="logs/aws/dd_api_key_setup.png" alt="DD API key setup" >}}
Two options for this, either:

    * Directly in the code 
    * Use an environment variable called `DD_API_KEY`.

9. Set the memory to the highest possible value.
10. Set the timeout limit. We recommends **120 seconds**
    {{< img src="logs/aws/basic_settings.png" alt="Basic Settings" >}}
11. Scroll back to the top of the page and hit **Save and test**

#### Test your Lambda

12. Configure the test event. Select **Cloudwatch Logs** as the sample event.
    {{< img src="logs/aws/test_event.png" alt="Test Event" >}}
13. Save and test.

## Collection

Your lambda function is now ready to send logs to your Datadog platform. All you need is to setup the relevant triggers for each AWS service you want to monitor.

#### S3, Cloudwatch, API Gateway, Kinesis and SNS
In your lambda, go in the triggers tab and select `Add Trigger`:
{{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" >}}

Select the log source and then follow the AWS instructions: 
{{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" >}}

For instance for S3 Buckets, do not forget to set the correct event type:
{{< img src="logs/aws/object_created.png" alt="Object Created" >}}

#### ELB

Elastic Load Balancing provides access logs that capture detailed information about requests or connections sent to your load balancer. Each log contains information such as the time it was received, the client's IP address, latencies, request paths, and server responses. Use these access logs to analyze traffic patterns and troubleshoot issues.
Elastic Load Balancing publishes a log file for each load balancer node every 5 minutes. The load balancer can deliver multiple logs for the same period.
Add ELB logs to Datadog to:

* Check if your services and apps are well-balanced
* Know in real-time, what is the min, max, average and 95th percentile response time for each services and apps running
* Be notified when specific IPs have a anormal behavior (malicious attempts, too many failure, etc...)
* Determine how many connection peaks you have? and when did they occurred?
* See how bots are going through your webpages (for SEO purposes for instance)


ELB logs are written in a s3 bucket and consumed by a lambda function.
Enable the logging on your ELB first to collect your logs:
{{< img src="logs/aws/configure_access_logs.png" alt="Configure Access Logs" >}}

Set interval to **5 minutes** and define your s3 buckets:
{{< img src="logs/aws/s3_location.png" alt="S3 Location" >}}

Then go back to the Lambda function and define a trigger on the corresponding s3 bucket.

#### CloudTrail

AWS CloudTrail is an audit service. Use AWS CloudTrail to get a history of AWS API calls and related events for your account. This includes calls made by using the AWS Management Console, AWS SDKs, command line tools, and higher-level AWS services.

You can identify which users and accounts called AWS for services that support CloudTrail, the source IP address from the calls, and when the calls occurred.
You can integrate CloudTrail into applications using the API, automate trail creation for your Organization, check the status of your trails, and control how administrators turn CloudTrail logging on and off.

When you define your Trails, you can select a s3 bucket to write the log in:
{{< img src="logs/aws/tail_s3_selection.png" alt="S3 Selection" >}}

You can send link the lambda function to this s3 bucket to send your logs.


#### ECS

ECS logs are the legacy Docker container. They are not directly related to the ECS service, but they correspond to the logs written by the running app (in the Docker Container). 

Collect ECS logs directly from the containers thanks to our [Docker integration](/integrations/docker_daemon) (recommended).
You can also [redirect those logs to Cloudwatch](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html#w2ab1c21c21c13 ) and ask the lambda to ship them to your Datadog platform.

#### CloudFront

CloudFront is a CDN service which speeds up distribution of your static and dynamic web content, for example, .html, .css, .php and image files to end users.

CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the user is routed to the edge location that provides the lowest latency (time delay), so content is delivered with the best possible performance.


When you enable logging for a distribution, specify the Amazon S3 bucket that you want CloudFront to store log files in. 
If you're using Amazon S3 as your origin, we recommend that you do not use the same bucket for your log files; using a separate bucket simplifies maintenance.

Store the log files for multiple distributions in the same bucket. When enabling logging, specify an optional prefix for the file names, to keep track of which log files are associated with which distributions, more information [here](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket ) 

You can then collect the log from the s3 bucket thanks to the lambda function.




