---
app_id: pliant
app_uuid: 28fb0874-e3be-4171-819d-142f1c9dd3cc
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pliant.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10102
    source_type_name: Pliant
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pliant
  sales_email: hello@pliant.io
  support_email: hello@pliant.io
categories:
- automation
- compliance
- notifications
- orchestration
- provisioning
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pliant/README.md
display_on_public_website: true
draft: false
git_integration_title: pliant
integration_id: pliant
integration_title: Pliant
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pliant
public_title: Pliant
short_description: IT Process Automation with Pliant.io
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Compliance
  - Category::Notifications
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: IT Process Automation with Pliant.io
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pliant
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Pliant.io enhances Datadog notifications with low-code automated workflows, creating a true close-loop-automation solution. This can help with troubleshooting, diagnosis, and automated remediation.

For more integration information, check out the [Pliant][1] site.

Examples include:

- Service restart
- Load balancer configuration
- System provisioning
- Clear disk / reprovision storage
- Provision additional VMs or container nodes in response to load
- De-commission resources when load is low

## セットアップ
### インストール

Create one or more workflows that you would like to trigger from a Datadog notification.

### 構成
#### Pliant

1. **Create a Pliant API key** - Log in to Pliant and click on your username at the top right of the screen to reveal a menu. Click "API Keys".

![API Key Menu step1][2]

2. From the API keys screen, click "+ Create" at the top right of the screen and title your new API key. Click save and make note of the API key, which will be added to the table.

![Create API Key step2][3]

**Create a Pliant workflow to trigger from Datadog**

1. Navigate to the workflows tab in Pliant. Click "+ Create" and "Create Flow" to create a new workflow. Title the workflow in the popup and click "Create" to launch the editor into the new workflow.

![Create Flow step1-a-][4]

2. Populate the workflow with actions to take upon receiving the Datadog trigger. 

This example workflow is called "RestartHost" and restarts a host from the data Datadog triggers this workflow with.

This workflow runs with its input variables initially assigned based on the request body you trigger it with. The workflow can trigger/perform any desired infrastructure automation actions, using information from its input. In this example, restart a host with SSH under certain circumstances when Datadog triggers the automation workflow with certain parameters.

  - To add Input variables which populate with data sent from Datadog, click the "Expand" icon on at the start of the workflow to open the Variable panel. To create matching **Input** variables, set all of these input variables to equal empty quotes: `""`. By default, Datadog sends the following data:
    ```
    body
    last_updated
    event_type
    title
    date
    org
    id
    ```

There are also additional output variables (`host`, `meta`, and `ip`) that are initialized. The workflow assigns these output variables and outputs the resulting values upon completion. It may also specify variables which are neither input nor output variables to use internally within the workflow's logic.

![Expand][5]

3. To get the endpoint of the Pliant workflow, used to trigger from Datadog with an HTTP request, click the "Expand" icon at the start of the workflow.

Click "cURL" > "Temporary Bearer Token" and select the API key you just created.

![curl][6]

![select key][7]

Your endpoint is enclosed in double quotes and resembles: ***https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>***

![endpoint][8]

Copy the entire URL enclosed in the double quotes (which may include additional query parameters), starting with ***https***. Do not include the double quotes.

#### Datadog setup
1. Open Datadog and from the left sidebar, click to **Integrations** > **Integrations**.
![integrations][9]

2. Enter "webhooks" in the search bar and click on the **webhooks** entry to reveal a configuration window.
![webhookSearch][10]


3. Scroll to "webhooks". Click **New** to add a new webhook to link to the Pliant workflow. First, give the webhook a name in the "name" field. This example uses the name *RestartHost*.
![webhooksConfig2][11]

Paste the URL copied from step 4. For example:

```
https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>
```

Paste this into the ***URL*** field of the webhook form.

![webhookForm][12]

The request payload is pre-configured. Check the "ENCODE AS FORM" box and click save.

Add this integration to any alert notification in Datadog by adding the recipient of `@webhook-RestartHost`. When the monitor triggers an alert, the webhook triggers your Pliant workflow, and the input variables are sent to Pliant from Datadog.

## 収集データ

### メトリクス

The Pliant integration does not provide metrics.

### サービスチェック

The Pliant integration does not include any service checks.

### イベント

The Pliant integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][13].

[1]: https://pliant.io/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png
[13]: https://docs.datadoghq.com/ja/help/