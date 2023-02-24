---
title: AWS Multi Account setup for AWS Organizations
kind: guide
description: "Steps for setting up the Datadog AWS Integration for an AWS Organization"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/"
  tag: "Documentation"
  text: "Datadog Forwarder Lambda function"
- link: "https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/"
  tag: "Guide"
  text: "Send AWS service logs with the Datadog Kinesis Firehose destination"
- link: "https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/"
  tag: "Guide"
  text: "Troubleshooting the AWS integration" 
- link: "https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/"
  tag: "Guide"
  text: "AWS CloudWatch metric streams with Kinesis Data Firehose"
- link: "https://www.datadoghq.com/blog/aws-monitoring/"
  tag: "Blog"
  text: "Key metrics for AWS monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/"
  tag: "Blog"
  text: "How to monitor EC2 instances with Datadog"
- link: "https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/"
  tag: "Blog"
  text: "Monitoring AWS Lambda with Datadog"
- link: "https://www.datadoghq.com/blog/cloud-security-posture-management/"
  tag: "Blog"
  text: "Introducing Datadog Cloud Security Posture Management"
- link: "https://www.datadoghq.com/blog/datadog-workload-security/"
  tag: "Blog"
  text: "Secure your infrastructure in real time with Datadog Cloud Workload Security"
- link: "https://www.datadoghq.com/blog/announcing-cloud-siem/"
  tag: "Blog"
  text: "Announcing Datadog Security Monitoring"
- link: "https://www.datadoghq.com/blog/tagging-best-practices/#aws"
  tag: "Blog"
  text: "Best practices for tagging your infrastructure and applications"

---

## Overview

This guide provides an overview of the process for integrating multiple accounts within an AWS Organization or one or more Organizational Units with Datadog.

The Cloudformation StackSet template provided by Datadog automates the creation of the required IAM role and associated policies in every AWS account under an Organization or Organizational Unit (OU), and configures the accounts within Datadog, eliminating the need for manual setup. Once set up, the integration automatically starts collecting AWS metrics & events for you to start monitoring your infrastructure.

The Datadog Cloudformation StackSet performs the following steps:

1. Deploys the Datadog AWS CloudFormation Stack in every account under an AWS Organization or Organizational Unit.
2. Automatically creates the necessary IAM role and policies in the target accounts.
3. Automatically initiates ingestion of AWS CloudWatch metrics and events from the AWS resources in the accounts.
4. Optionally disables metric collection for the AWS infrastructure (can be disabled for Cloud Cost Management (CCM) or Cloud Security Posture Management (CSPM) only use cases)
5. Optionally configures Datadog Cloud Security Posture Management to monitor resource misconfigurations in your AWS accounts.


Please note that the StackSet does not set up log forwarding in the AWS accounts. To set up logs, follow the steps in the [Log Collection][2] guide.


## Prerequisites

Before getting started, ensure you have the following prerequisites:


1. **Access to the management account**: Your AWS user needs to be able to access the AWS management account.
2. **An account administrator has enabled Trusted Access with AWS Organizations**: Refer to [AWS Documentation][3] on how to enable trusted access between StackSets and Organizations to create & deploy stacks using service-managed permissions.

## Setup

To get started, go to the [AWS Integration configuration page][1] in Datadog and click on **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **Cloudformation StackSet**.

On the Datadog console, click **Launch CloudFormation StackSet**. This opens the AWS Console and loads a new CloudFormation StackSet. Keep the default choice of “Service-managed permissions” on AWS.  
  
Follow the steps below on the AWS console to create and deploy your stackset:

1. **Choose a Template**  
Copy the Template URL from the Datadog console to use it in the `Specify Template` parameter in the StackSet.


2. **Specify StackSet details**
    - Select your Datadog API key on the Datadog console and use it in the `DatadogApiKey` parameter in the StackSet.
    - Select your Datadog APP key on the Datadog console and use it in the `DatadogAppKey` parameter in the StackSet.

    - *Optionally:*
        - Enable [Cloud Security Posture Management][5] (CSPM) to scan your cloud environment, hosts, and containers for misconfigurations and security risks.
        - Disable metric collection if you do not want to monitor your AWS infrastructure. (recommended only for [Cloud Cost Management][6] (CCM) or [Cloud Security Posture Management][5] (CSPM) only use cases)


3. **Configure StackSet options**  
Keep the "Execution configuration" option as `Inactive` so the StackSet performs one operation at a time.

4. **Set deployment options**
    - You can set your “Deployment targets” to either deploy the Datadog integration across an Organization or one or more Organizational Units.


    - Keep “Automatic deployment” enabled in order to automatically deploy the Datadog AWS Integration in new accounts that are added to the Organization or OU.

    - Under “Specify regions”, select a region in which you’d like to deploy the integration.   
      **NOTE**: The StackSet will set up global IAM resources that are not region specific. If multiple regions are selected in this step, the deploy will fail. 


    - Use the default settings under “Deployment options” to be set to Sequential so StackSets operations are deployed into one region at a time.

5. **Review**  
    Move to the Review page and Click Submit. This launches the creation process for the Datadog StackSet. This could take a while depending on how many accounts need to be integrated. Ensure that the StackSet successfully creates all resources before proceeding.

    After the stacks are created, go back to the AWS integration config page in Datadog and click **Done**. Please wait for a few minutes to see metrics & events reporting from your newly integrated AWS accounts.


## Enable integrations for individual AWS services

See the [Integrations page][4] for a full listing of the available sub-integrations that can be enabled on each monitored AWS account. Many of these integrations are installed by default when Datadog recognizes data coming in from your AWS account.

## Send logs

The StackSet does not set up log forwarding in the AWS accounts. To set up logs, follow the steps in the [Log Collection][2] guide.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /integrations/#cat-aws
[5]: /security/cspm/getting_started/
[6]: https://docs.datadoghq.com/cloud_cost_management/?tab=aws