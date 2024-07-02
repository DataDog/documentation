---
"app_id": "zabbix"
"app_uuid": "9b7022c4-95c7-4872-83b6-7eaba2cc9d88"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": zabbix.system.uptime
      "metadata_path": metadata.csv
      "prefix": zabbix.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10166"
    "source_type_name": Zabbix (Community Version)
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": KosukeKamiya@users.noreply.github.com
  "support_email": KosukeKamiya@users.noreply.github.com
"categories":
- network
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "zabbix"
"integration_id": "zabbix"
"integration_title": "zabbix"
"integration_version": "1.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "zabbix"
"public_title": "zabbix"
"short_description": "Collect item history by the Zabbix API and report them to Datadog as metrics."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collect item history by the Zabbix API and report them to Datadog as metrics.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": zabbix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Connect to Zabbix to:

- Monitor [Zabbix][1] through the Datadog Agent.
- Send Zabbix alerts to Datadog to see the alerts as events in your Datadog event stream.

## セットアップ

The Zabbix check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Zabbix check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Make sure that your Zabbix server timezone is set to UTC. More information about Zabbix time zones can be found on the [Zabbix documentation][5].

2. Edit the `zabbix.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Zabbix performance data. See the [sample zabbix.d/conf.yaml][6] for all available configuration options.

3. [Restart the Agent][7].

#### Event collection

##### Create Datadog media type 

1. Navigate to *Administration > Media Types > Create Media Type*.
2. Add parameters to the webhook using Zabbix template variables. Add your Datadog api_key and the following Zabbix template variables as parameters:

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `api_key`            | `Your Datadog API key`               |
| `event_date`         | `{EVENT.DATE}`                       |
| `event_name`         | `{EVENT.NAME}`                       |
| `event_nseverity`    | `{EVENT.NSEVERITY}`                  |
| `event_tags`         | `{EVENT.TAGSJSON}`                   |
| `event_time`         | `{EVENT.TIME}`                       |
| `event_value`        | `{EVENT.VALUE}`                      |
| `item_name`          | `{ITEM.NAME}`                        |
| `alert_message`      | `{ALERT.MESSAGE}`                    |
| `alert_subject`      | `{ALERT.SUBJECT}`                    |


3. Set **Name** to `Datadog`, **Type** to `Webhook`, and input the following code as the **Script**:
``` 
    try {
        Zabbix.Log(4, '[datadog webhook] received value=' + value);

        var params = JSON.parse(value);
        var req = new CurlHttpRequest();
        req.AddHeader('Content-Type: application/json');
        var webhook_url = 'https://app.datadoghq.com/intake/webhook/zabbix?api_key=' + params.api_key;
        var webhook_data = value;
        var resp = req.Post(webhook_url, webhook_data);
        if (req.Status() != 202) {
            throw 'Response code: '+req.Status();
        }
        Zabbix.Log(4, '[datadog webhook] received response with status code ' + req.Status() + '\n' + resp);
    } catch (error) {
        Zabbix.Log(4, '[datadog webhook] event creation failed json : ' + webhook_data)
        Zabbix.Log(4, '[datadog webhook] event creation failed : ' + error);
    }
    return JSON.stringify({});

```
4. Validate the Webhook is set up correctly by using the "Test" button.

##### Assign Webhook media to an existing user

1. After configuring the Webhook media type, navigate to *Administration > Users* and create a dedicated Zabbix user to represent the Webhook. For example, use the alias `Datadog` for the Datadog Webhook. All settings, except media, can be left at their defaults as this user does not log in to Zabbix.
2. In the user profile, go to a **Media** tab and add a Webhook with the required contact information. If the Webhook does not use a send to field, enter any combination of supported characters to bypass validation requirements.
3. Grant this user at least read permissions to all hosts for which it should send the alerts.

##### Configure an alert action for the Webhook

1. Navigate to *Configuration > Actions*.
2. From the page title dropdown, select the required action type.
3. Click on **Create Action**.
4. Name the action.
5. Choose conditions upon which operations are carried out.
6. Choose the operations to carry out.

### Validation

Run the [Agent's status subcommand][8] and look for `zabbix` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "zabbix" >}}


### イベント

Zabbix alerts are collected as events in the Datadog event stream.

### サービスチェック
{{< get-service-checks-from-git "zabbix" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://www.zabbix.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://www.zabbix.com/documentation/current/en/manual/web_interface/time_zone
[6]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

