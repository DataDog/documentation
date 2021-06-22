---
categories:
- log collection
- Security
ddtype: crawler
description: Collect your Carbon Black Defense Logs
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md"]
has_logo: true
integration_title: Carbon Black
is_public: true
kind: integration
name: carbon_black
public_title: Datadog-Carbon Black Integration
short_description: Collect your Carbon Black Defense Logs
version: '1.0'
integration_id: "carbonblack"
---

## Overview

Use the Datadog-Carbon Black integration in order to forward your Carbon Black Defense logs to Datadog.

## Setup

### Installation

First, install and setup the [Carbon Black Defense log shipper][1].

### Configuration

The configuration file below enables your Carbon Black Defense shipper to forward your logs to Datadog:

```conf
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out={{< region-param key="http_endpoint" code="true" >}}<DATADOG_API_KEY>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <CB_DEFENSE_SERVER_URL>
siem_connector_id=<CB_DEFENSE_API_ID>
siem_api_key=<CB_DEFENSE_API_SECRET_KEY>
```

Replace the `<DATADOG_API_KEY>`, `<CB_DEFENSE_API_SECRET_KEY>`, `<CB_DEFENSE_API_ID>`, and `<CB_DEFENSE_SERVER_URL>` placeholders to complete your configuration.

First, replace `<DATADOG_API_KEY>` with your Datadog API key, found on the [Datadog API key][2] page.

Next, to obtain your Carbon Black Defense API key and API ID, generate them from within Carbon Black:

1. Go to _Settings_ -> _API KEYS_ -> _Add API Key_.
2. Enter a name for your key.
3. Select the **SIEM** access level for the key.
4. Once the key is created, use your new API key and API ID to replace the `<CB_DEFENSE_API_SECRET_KEY>` and `<CB_DEFENSE_API_ID>` placeholder in your Carbon Black Defense log shipper configuration file.

You can find your Carbon Black Defense server URL within your Carbon Black dashboard. Go to _Settings_ -> _API KEYS_ -> _Download_ to find this URL and its access level descriptions. Use this value to replace the `<CB_DEFENSE_SERVER_URL>` placeholder.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://github.com/carbonblack/cb-defense-syslog-tls
[2]: https://app.datadoghq.com/account/settings#api
[3]: /help/
