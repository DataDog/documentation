---
app_id: rundeck
app_uuid: beb808d2-cc12-4bc5-8ff7-b63552b35e0a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rundeck.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10099
    source_type_name: Rundeck
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rundeck
  sales_email: forrest@rundeck.com
  support_email: forrest@rundeck.com
categories:
- automation
- incidents
- notifications
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rundeck/README.md
display_on_public_website: true
draft: false
git_integration_title: rundeck
integration_id: rundeck
integration_title: Rundeck
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rundeck
public_title: Rundeck
short_description: Automate Remediation Actions using Rundeck Webhooks
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Automate Remediation Actions using Rundeck Webhooks
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rundeck
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Rundeck further enhances Datadog notifications with automated workflow capabilities to help diagnose issues-and, optionally, to remediate them. 

Learn more about automating your runbooks to reduce incident time on the [Rundeck website][1].

Some example use cases are:

- If a Windows/Linux service is down, attempt to restart it
- If NTP sync is off, restart the NTP service on that machine
- Clean up logs and other file waste when disk space becomes full
- Restart services in response to hung work queues
- Provision capacity in response to high utilization

Use the instructions below to configure your Datadog/Rundeck integration.

## セットアップ

### インストール
Prepare at least one Rundeck job that you would like to trigger using a Datadog alert.

### 構成

#### Rundeck

1. In your Rundeck Project, click the **Webhooks** navigation option.
2. Click **Add**.
3. Give the webhook a name, for example: `Datadog-Restart Service`.
4. Click the **Choose Webhook Plugin** button and select **Run Job***.
5. Select the job you'd like to run when this webhook is triggered.
6. [optional] In the **Options** line, enter the following text:
`-raw ${raw} -event_type ${data.event_type}`
(This makes the full Datadog payload available as part of the job input options.)
7. Click **Create Webhook**. The URL field is automatically populated after the webhook is created.

![rundeck-setup][2]

#### Datadog setup
1. Open Datadog and go to **Integrations** > **Integrations**.
2. Search for "webhooks".

    ![search-dd-2024][3]

3. Click on the webhooks entry shown above. It opens the configuration window.

    ![webhooks-config][4]

4. Click the **New** button and fill out the form:
  - Give the webhook a name. (a)
  - Paste the URL from your Rundeck webhook in the URL line. This corresponds to Step 7 in the section above. (b)
  - Click **Save**. (c)

    ![webhook-fill][5]

Add this integration to any alert notification in Datadog by adding the recipient of `@webhook-Rundeck_Restart_Service`. The name varies based on what you name the webhook in step 4a. When the monitor triggers an alert, the webhook runs the associated job.

Other plugins, such as Advanced Run Job, can also be used, depending on your use case.

## 収集データ

### メトリクス

The Rundeck integration does not provide any metrics.

### サービスチェック

The Rundeck integration does not include any service checks.

### イベント

The Rundeck integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://www.rundeck.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/rundeck-setup.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/dd-search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhooks-config.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhook-fill.png
[6]: https://docs.datadoghq.com/ja/help/