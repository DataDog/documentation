---
"app_id": "torq"
"app_uuid": "56e675d8-a461-46ec-93e9-9e8618d21354"
"assets":
  "dashboards":
    "Torq": assets/dashboards/torq_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": torq.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10231"
    "source_type_name": Torq
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Torq
  "sales_email": support@torq.io
  "support_email": support@torq.io
"categories":
- automation
- notifications
- orchestration
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/torq/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "torq"
"integration_id": "torq"
"integration_title": "Torq"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "torq"
"public_title": "Torq"
"short_description": "No-code automation for security and operations teams"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Notifications"
  - "Category::Orchestration"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": No-code automation for security and operations teams
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Torq
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The [Torq][1] integration enables you to trigger workflows in response to Datadog alerts, providing alert enrichment. You can then send back events directly from your Torq workflows to your Datadog event stream and dedicated Torq dashboard.

## Setup

To set up this integration, you must have an active [Torq account][2] and an Account Owner role in that account. You must also have proper admin permissions in Datadog.

### Create a Datadog trigger integration in Torq

1. Go to **Integrations** > **Triggers**, locate the **Datadog** card, and click **Add**.

2. Enter a meaningful name for the integration and click **Add**.

3. Copy the generated Webhook URL. You need this URL to configure a Webhook integration in your Datadog tenant.

### Define Datadog monitors to trigger events in Torq

1. Navigate to **Integrations** > **Integrations**, click the **Webhooks** card, and click **New**.
    ![datadog_webhook][3]

2. Enter a meaningful name for the Webhook integration and paste the generated Webhook URL from Torq. You need the integration name to associate the identifier (used for specific Datadog monitors to trigger Torq) and generated Webhook URL from Torq.
    ![datadog_webhook_2][4]

3. Torq recommends adding additional alert information to the payload. You can use portions of the following configuration:

    ```json linenums="1"
    {
        "body": "$EVENT_MSG",
        "title": "$EVENT_TITLE",
        "date": "$DATE",
        "id": "$ID",
        "metadata": {
            "AGGREG_KEY": "$AGGREG_KEY",
            "ALERT_CYCLE_KEY": "$ALERT_CYCLE_KEY",
            "ALERT_ID": "$ALERT_ID",
            "ALERT_METRIC": "$ALERT_METRIC",
            "ALERT_QUERY": "$ALERT_QUERY",
            "ALERT_SCOPE": "$ALERT_SCOPE",
            "ALERT_STATUS": "$ALERT_STATUS",
            "ALERT_TITLE": "$ALERT_TITLE",
            "ALERT_TRANSITION": "$ALERT_TRANSITION",
            "ALERT_TYPE": "$ALERT_TYPE",
            "EMAIL": "$EMAIL",
            "EVENT_MSG": "$EVENT_MSG",
            "EVENT_TITLE": "$EVENT_TITLE",
            "EVENT_TYPE": "$EVENT_TYPE",
            "HOSTNAME": "$HOSTNAME",
            "ID": "$ID",
            "LAST_UPDATED": "$LAST_UPDATED",
            "LINK": "$LINK",
            "METRIC_NAMESPACE": "$METRIC_NAMESPACE",
            "ORG_ID": "$ORG_ID",
            "ORG_NAME": "$ORG_NAME",
            "PRIORITY": "$PRIORITY",
            "SNAPSHOT": "$SNAPSHOT",
            "TAGS": "$TAGS",
            "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
            "USER": "$USER",
            "USERNAME": "$USERNAME",
            "LOGS_SAMPLE": "$LOGS_SAMPLE"
        }
    }
    ```

4. Pick monitors to trigger Torq Playbooks and add a reference to the newly created Webhook integration in the **Alert Your Team** field. For more details, see [Manage Monitors][5].

## Use Datadog steps in Torq workflows

You need to create a Datadog API key and an application key to use as input parameters for Datadog steps in Torq.

**Note:** Some Datadog steps in Torq require an API key and application key, while other steps require the Datadog integration.

### Create an API key in Datadog

After you create the API key, copy and save it because you are not able to access it later. For more information, see [API and Application Keys][6].

1. Hover over your user name and select **Organization Settings**.
2. From the left panel, click **API Keys**.
3. Click **+ New Key**.
    ![datadog_api_key][7]
4. Enter a meaningful name for the API key such as `Torq` and click **Create Key**.
5. Copy the `Key` and save it. You need this key to create a Datadog integration in Torq.

### Create an application key in Datadog

After you create the application key, copy and save it because you are not able to access it later. For more information, see [API and Application Keys]][8].

1. Hover over your user name and select **Organization Settings**.
2. From the left panel, click **Application Keys**.
3. Click **+ New Key**.
    ![datadog_app_key][9]
4. Enter a meaningful name for the application key such as `Torq` and click **Create Key**.
5. Copy the `Key` and save it. You need this key to create a Datadog integration in Torq.

### Create a Datadog integration in Torq

This integration enables you to use Datadog steps in your Torq workflows.

1. Go to **Integrations** > **Steps**, locate the **Datadog** card, and click **Add**.

2. Enter a meaningful name for the integration such as `Datadog-<monitor_type>` and click **Add**.

## Data Collected

### Metrics

The Torq integration does not provide any metrics.

### Events

The Torq integration allows you to send events to your Datadog event stream from a Torq workflow using the Datadog Post Event step. You can use the step with your playbooks to notify Datadog about successful mitigations and execution failures. You can also send enriched alert data back to Datadog.

### Service Checks

The Torq integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][10].

[1]: https://torq.io
[2]: https://torq.io/get-started/
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_config.png
[5]: https://docs.datadoghq.com/monitors/manage_monitor/
[6]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_api_key_2.png
[8]: https://docs.datadoghq.com/account_management/api-app-keys/#add-application-keys
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_app_key_2.png
[10]: https://docs.datadoghq.com/help/

