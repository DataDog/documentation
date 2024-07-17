---
app_id: sentinelone
app_uuid: 4b8cdc1f-0f97-4e19-b127-99427b56df88
assets:
  dashboards:
    SentinelOne-Overview: assets/dashboards/SentinelOne-Overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 611
    source_type_name: SentinelOne
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentinelone
integration_id: sentinelone
integration_title: SentinelOne
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentinelone
public_title: SentinelOne
short_description: Collect alerts, threats, and telemetry from SentinelOne Singularity
  Endpoint
supported_os:
- windows
- macos
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Supported OS::Linux
  - Category::Log Collection
  - Category::Security
  configuration: README.md#Setup
  description: Collect alerts, threats, and telemetry from SentinelOne Singularity
    Endpoint
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SentinelOne
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

SentinelOne is an Endpoint Detection and Response (EDR) solution to discover, protect, and respond to endpoint threats. SentinelOne Singularity Endpoint uses static and behavioral detections to identify and contain both known and unknown threats across the enterprise. It is compatible with Windows, MacOS, and Linux operating systems.

Use this integration to collect activity logs, alerts, and threats directly from the SentinelOne Management API. Combining SentinelOne and [Datadog Cloud SIEM][1] gives you full visibility across your cloud infrastructure and your endpoints. The out-of-the-box detection rule shows your SentinelOne built-in alerts and any custom threats alongside the rest of your Cloud SIEM signals for a single pane of glass view across all your systems.

You may also configure [SentinelOne Cloud Funnel][2] to forward SentinelOne raw telemetry from an AWS S3 bucket to Datadog. Customers with Cloud SIEM may use this EDR telemetry data for long term storage, custom detections, investigations, and reporting.

All log data collected will be parsed and normalized for easy searching and dashboarding.

## Setup

SentinelOne customers can collect alerts, threats, and activity logs as well as Cloud Funnel telemetry. Follow the instructions below to set up your data collection:

### Collect alerts, threats and activity logs

1. Log in to your SentinelOne Cloud console, then click **Settings**
2. Select the **Users** tab.
3. Select **Service Users**.
4. Click **Actions**, then select **Create New Service User**.
5. In the **Create New Service User** pop-up window that opens, enter a **Name** and **Description**, then select a custom **Expiration Date** in 10 years.
6. Click **Next**.
7. Select **Site**, then select Viewer for your site.
8. Click **Create User**.
9. In the pop-up window that opens, click **Copy API Token** to copy the new token.

### Collect SentinelOne Cloud Funnel telemetry

**Note**: Log in to your SentinelOne Customer Portal account to access SentinelOne's documentation.

1. Create and configure an Amazon S3 bucket. For instructions, follow [How to Configure Your Amazon S3 Bucket][3] in SentinelOne's documentation.
2. Set up Cloud Funnel streaming in your SentinelOne Management Console. For instructions, follow [How to Enable Cloud Funnel Streaming][4] in SentinelOne's documentation.

   On the Cloud Funnel configuration page, use the following values:

   - **Cloud Provider**: AWS (Amazon Web Services)
   - **S3 Bucket Name**: the name of the S3 bucket you created in the first step

3. In S3, verify that your Cloud Funnel logs are going to your S3 bucket.
4. Deploy the Datadog Forwarder CloudFormation stack by clicking **Launch Stack** on the [Datadog Forwarder > CloudFormation][5] page.

   Set the following parameters:

   - `DdApiKey`: your Datadog API key
   - `DdSite`: your [Datadog site][6]
   - `DdTags`: `source:sentinelone,service:sentinelone,endpoint:EDR_Telemetry`

5. In the AWS console, open your Datadog Forwarder Lambda function. Go to the **Triggers** tab and select **Add trigger**.

   - Select **S3** as your trigger type.
   - Under **Bucket**, enter your S3 bucket.
   - Under **Event types**, select **All object create events**.

#### Verification

In the AWS console, check your Lambda function's **Monitor** tab for errors.

In Datadog's Log Explorer, look for your SentinelOne S3 logs.

## Data Collected

### Metrics

SentinelOne does not include any metrics.

### Logs

Logs originate from the following sources:

- **Activity Logs** record data for management activities in the SentinelOne Console. For example, when a user is added, deleted, or authentication rules (2FA) change, an event records the activity. Likewise, when a threat is mitigated or stays unmitigated, an event is generated. These events can be used for investigations and threat hunting.
- **Threats** involve detecting certain malicious activities, risky practices, and attacks such as brute-force and password spray attempts. Logs include creations and updates of threats.
- **Alerts** let you generate and distribute alert events when their conditions are met. The condition typically involves a metric that moves above or below a threshold value, the occurrence of an event, or the occurrence of multiple events in a period of time.

### Events

The SentinelOne integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "sentinelone" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://app.datadoghq.com/security/home
[2]: https://www.sentinelone.com/platform/singularity-cloud-funnel/
[3]: https://community.sentinelone.com/s/article/000006282
[4]: https://community.sentinelone.com/s/article/000006285
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/?tab=cloudformation#cloudformation
[6]: https://docs.datadoghq.com/ja/getting_started/site/
[7]: https://github.com/DataDog/integrations-internal-core/blob/master/sentinelone/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/