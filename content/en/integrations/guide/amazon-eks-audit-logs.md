---
title: Log Collection for Amazon EKS Audit Logs
kind: guide
---

## Overview

Amazon EKS audit logs give cluster administrators insight into actions within an EKS cluster. Once you enable log collection for your Amazon EKS audit logs, you can setup and use [Datadog Cloud SIEM][1] to monitor unwarranted actions or immediate threats as they occur within your EKS cluster.

## Setup

### Amazon EKS audit logs

#### New cluster

1. If you do not have an Amazon EKS cluster, create one by following the [Creating an Amazon EKS Cluster][2] documentation.
1. During setup, on the Configure logging page, enable **Audit logs**.

#### Existing cluster

1. If you already have an Amazon EKS cluster configured, navigate to your cluster in the [Amazon EKS console][2].
1. Click on your EKS cluster.
1. Click on the **Configuration** tab, and then the **Logging** tab.
1. Click the **Manage logging** button.
1. Toggle the **Audit** option to **Enabled** and click the **Save changes** button.

### Datadog AWS integration

Next, set up the AWS integration. Follow the [AWS integration setup][3] documentation.

### Datadog Forwarder

Once your AWS integration set up is complete, install and configure the Datadog Forwarder. Follow the [Datadog Forwarder installation][4] documentation.

**Note**: The Lambda ARN is required for the [Setup triggers][5] step. Your Lambda ARN is available by navigating to [Lambda > Functions > `Your_Function_Name`][6] in the AWS console. The Function ARN is listed in the Function overview.

## Log Explorer

Once setup of Amazon EKS audit logs, the Datadog AWS integration, and Datadog Forwarder are complete, your EKS audit logs are available in the [Datadog Log Explorer][7].

**Note**: Logs may take a few seconds to begin streaming into Log Explorer.

To view only EKS audit logs in the Log Explorer, query `source:kubernetes.aduit` in Log Explorer search or, under **Source** in the facets panel, select the `kubernetes.audit` facet to filter by EKS audit logs.

## Cloud SIEM

You can use Datadog Cloud SIEM to detect potential misconfigurations or targeted attacks to your EKS clusters.

To start monitoring your Amazon EKS audit logs with Cloud SIEM, setup Cloud SIEM and create a custom [log detection rule][8] that generates a [Security Signal][9] in the [Security Signals Explorer][10] whenever a misconfiguration or threat is detected.

### Setup

Setup and configure Cloud SIEM. See the in-app [Cloud SIEM setup and configuration instructions][1].

Once Cloud SIEM is set up and configured, you can either create a new Cloud SIEM rule from scratch or export a query in Log Explorer to a new rule.

### Create a new Cloud SIEM rule

Navigate to the in-app [Rule Setup and Configuration][11] page to create a new rule. Follow the [Log Detection Rules][12] documentation to complete setup.

### Export a query to a rule in Log Explorer

1. In Log Explorer, create a query in the search bar. For example, filter by `source:kubernetes.audit @aws.awslogs.owner:601427279990`.
1. Click the **Export** button and select **Export to detection rule**.
1. This feature exports your query and defines it in the second step of Log Detection rule setup. Select a detection method. In this instance, select **New Term** to detect when the `@aws.awslogs.owner` attribute changes to a new value, and follow the [Log Detection Rules][12] documentation to learn how to complete the rest of the configuration of your new rule.



[1]: /security_platform/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /serverless/libraries_integrations/forwarder/
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /security_platform/cloud_siem/log_detection_rules/
[9]: /security_platform/cloud_siem/getting_started#review-detection-rules
[10]: https://app.datadoghq.com/security
[11]: https://app.datadoghq.com/security/configuration/rules/new
[12]: /security_platform/cloud_siem/log_detection_rules/?tab=threshold#choose-a-detection-method
