---
categories:
- log collection
- Security
ddtype: crawler
dependencies: []
description: Collect your Carbon Black Defense Logs
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
has_logo: true
integration_title: Carbon Black
is_public: true
kind: integration
name: carbon_black
public_title: Datadog-Carbon Black Integration
short_description: Collect your Carbon Black Defense Logs
version: '1.0'
---
## Overview

Use the Datadog-Carbon Black integration in order to forwards your Carbon Black Defense logs within Datadog.

## Setup
### Installation

First, install and setup the [Cb Defense log shipper][1]. The shipper is available for:

* [RPM based linux distributions][2]
* [Docker][3]

### Configuration

Use the configuration file below for your Cb Defense shipper in order to foward your logs to Datadog:

{{< tabs >}}
{{% tab "Datadog US Site" %}}

```
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <CB_DEFENSE_SERVER_URL>
siem_connector_id=<CB_DEFENSE_API_ID>
siem_api_key=<CB_DEFENSE_API_SECRET_KEY>
```

{{% /tab %}}
{{% tab "Datadog EU Site" %}}

```
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.eu/v1/input/<DATADOG_API_KEY>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <CB_DEFENSE_SERVER_URL>
siem_connector_id=<CB_DEFENSE_API_ID>
siem_api_key=<CB_DEFENSE_API_SECRET_KEY>
```

{{% /tab %}}
{{< /tabs >}}

Replace `<DATADOG_API_KEY>`, `<CB_DEFENSE_API_SECRET_KEY>`, `<CB_DEFENSE_API_ID>`, and `<CB_DEFENSE_SERVER_URL>` placeholders to make it work.

First, get your `<DATADOG_API_KEY>` from the [Datadog API key][4] page.

Then to get your Carbon Black Defense API KEY, and API ID, generate them from within the your Carbon Black :

1. Go to *Settings* -> *API KEYS* -> *Add API Key*.
2. Enter a Name for your key.
3. Select the **SIEM** Access Level for the key.
4. Once the key is created, report the `<CB_DEFENSE_API_SECRET_KEY>` and `<CB_DEFENSE_API_ID>` into your Cb Defense log shipper configuration file.

Finally, to find the `<CB_DEFENSE_SERVER_URL>`, within your Cb defense dashboard, go to *Settings* -> *API KEYS* -> *Download* that displays the URL and its Access Levels Descriptions.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://github.com/carbonblack/cb-defense-syslog-tls
[2]: https://github.com/carbonblack/cb-defense-syslog-tls#installation
[3]: https://github.com/carbonblack/cb-defense-syslog-tls#installation-via-docker
[4]: https://app.datadoghq.com/account/settings#api
[5]: /help
