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

Push your AWS log information to Datadog using Lambda functions that respond to S3 and CloudWatch log events. First configure your AWS services to push logs to S3/ Cloudwatch Logs, then setup the Lambda function(s), and finally create the triggers that invokes that Lambda and send logs to Datadog.

## Setup
### Create a new Lambda function

1. Navigate to the [Lambda Console](https://console.aws.amazon.com/lambda/home?region=us-east-1) and create a new function:
    {{< img src="logs/aws/create_lambda_function.png" alt="Create Lambda function" responsive="true" popup="true">}}

2. Select **Author from scratch** and give the function a unique name.
3. Change the Runtime to **Python 2.7**
4. For `Role`, select **Create new role from template(s)** and give the role a unique name.
5. Under Policy templates, search for and select **s3 object read-only permissions.**
6. Select **Create Function.**
    {{< img src="logs/aws/author_from_scratch.png" alt="Author from Scratch" responsive="true" >}}

### Provide the code and configure the Lambda

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

### Test your Lambda

1. Press **Test**. 
2. Search for and select **Cloudwatch Logs** as the sample event.
    {{< img src="logs/aws/test_event.png" alt="Test Event" responsive="true" >}}
2. Give the event a unique name and press **Create**.
3. Press Test and ensure the test passes with no errors.

## Collection

Your Lambda function is now ready to send logs to the Datadog platform. 

There are two ways to configure the triggers that will cause the Lambda to execute and send logs to Datadog. 

<!---* [automatically](#automatically-set-up-triggers): With the right set of [permissions](#permissions), Datadog manages them for you. -->
* [manually](#manually-set-up-triggers): set up each trigger yourself in the AWS console.

<!---
### Automatically set up triggers
If you are storing logs in many S3 buckets, Datadog can automatically manage triggers for you.

1. Add the required permissions to your Datadog role in the [IAM Console](https://console.aws.amazon.com/iam/home#/roles). You may already have some of these permissions from our other AWS integrations. Information on how these permissions are used can be found in the [permissions](#permissions) section below:

```
"elasticloadbalancing:DescribeLoadBalancers",
"elasticloadbalancing:DescribeLoadBalancerAttributes",
"lambda:AddPermission",
"lambda:GetPolicy",
"lambda:RemovePermission",
"s3:GetBucketLogging",
"s3:GetBucketLocation",
"s3:GetBucketNotification",
"s3:ListAllMyBuckets",
"s3:PutBucketNotification"
```

2. Navigate to the *Collect Logs* tab in the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services)
3. Select the AWS Account from where you want to collect logs, and enter the ARN of the Lambda created in the previous section.
{{< img src="logs/aws/AWSLogStep1.png" alt="Enter Lambda">}}
4. Check off the services from which you'd like to collect logs and hit save. To stop collecting logs from a particular service, simply uncheck it.
{{< img src="logs/aws/AWSLogStep2.png" alt="Select services">}}
5. If you have logs across multiple regions, you must create additional Lambda functions in those regions and enter them in this tile.
6. To stop collecting all AWS logs, press the *x* next to each Lamdba ARN. All triggers for that function will be removed. 
7. Within a few minutes of this initial setup, you will see your AWS Logs appear in our [logging platform](https://app.datadoghq.com/logs) in near real time. -->

### Manually set up triggers
In your Lambda, go in the triggers tab and select `Add Trigger`:
{{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" responsive="true" >}}

Select the log source and then follow the AWS instructions: 
{{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" responsive="true" popup="true">}}

For instance, do not forget to set the correct event type on S3 Buckets:
{{< img src="logs/aws/object_created.png" alt="Object Created" responsive="true" popup="true">}}

### ELB

Elastic Load Balancing provides access logs that capture detailed information about requests or connections sent to your load balancer. Each log contains information such as the time it was received, the client's IP address, latencies, request paths, and server responses. Use these access logs to analyze traffic patterns and troubleshoot issues.
Elastic Load Balancing publishes a log file for each load balancer node every 5 minutes. The load balancer can deliver multiple logs for the same period.
Add ELB logs to Datadog to:

* Check if your services and apps are well-balanced
* Know in real-time, what is the min, max, average and 95th percentile response time for each services and apps running
* Be notified when specific IPs have a anormal behavior (malicious attempts, too many failure, etc...)
* Determine how many connection peaks you have? and when did they occurred?
* See how bots are going through your webpages (for SEO purposes for instance)

ELB logs are written in a s3 bucket and consumed by a Lambda function.
Enable the logging on your ELB first to collect your logs:
{{< img src="logs/aws/configure_access_logs.png" alt="Configure Access Logs" responsive="true" popup="true">}}

Set interval to **5 minutes** and define your s3 buckets:
{{< img src="logs/aws/s3_location.png" alt="S3 Location" responsive="true" popup="true">}}

Then go back to the Lambda function and define a trigger on the corresponding s3 bucket.

### CloudTrail

AWS CloudTrail is an audit service. Use AWS CloudTrail to get a history of AWS API calls and related events for your account. This includes calls made with the AWS Management Console, AWS SDKs, command line tools, and higher-level AWS services.

When you define your Trails, select a s3 bucket to write the logs in:
{{< img src="logs/aws/tail_s3_selection.png" alt="S3 Selection" responsive="true" popup="true">}}

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

## Permissions

*Required only for automatic setup*:

* `elasticloadbalancing:DescribeLoadBalancers`: List all load balancers.
* `elasticloadbalancing:DescribeLoadBalancerAttributes`: Get the name of the S3 bucket containing ELB access logs.
* `lambda:AddPermission`: Add permission allowing a particular S3 bucket to trigger a Lambda function.
* `lambda:GetPolicy`: Gets the Lambda policy when triggers are to be removed.
* `lambda:RemovePermission`: Remove permissions from a Lambda policy.
* `s3:GetBucketLogging`: Get the name of the S3 bucket containing S3 access logs.
* `s3:GetBucketLocation`: Get the region of the S3 bucket containing S3 access logs.
* `s3:GetBucketNotification`: Get existing Lambda trigger configurations.
* `s3:ListAllMyBuckets`: List all S3 buckets.
* `s3:PutBucketNotification`: Add or remove a Lambda trigger based on S3 bucket events.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}