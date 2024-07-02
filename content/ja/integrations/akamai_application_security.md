---
"app_id": "akamai"
"app_uuid": "5ee63b45-092e-4d63-b980-1675f328bf6b"
"assets":
  "dashboards":
    "akamai-application-security-overview": assets/dashboards/akamai_application_security_overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10392"
    "source_type_name": Akamai
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "akamai_application_security"
"integration_id": "akamai"
"integration_title": "Akamai Application Security"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "akamai_application_security"
"public_title": "Akamai Application Security"
"short_description": "Integrate with Akamai to get event logs for Akamai products."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Submitted Data Type::Logs"
  - "Category::Log Collection"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Integrate with Akamai to get event logs for Akamai products.
  "media":
  - "caption": Akamai Application Security Dashboard Overview
    "image_url": images/akamai-application-security-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Akamai Application Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

### Akamai Application Security

With the Akamai Application Security integration, Datadog can capture security event logs generated from your Akamai security configurations.
This integration provide real time visibility and insights into web traffic patterns, enabling quick detection of
malicious activity. It also helps identify security threats, such as DDoS attacks, botnet intrusions, and
application layer vulnerabilities.

After collecting events, Datadog populates the [out-of-the-box Akamai Application Security overview dashboard][1] with insights
into attack data security events, threat intel, IP log activity, and rare IP activity.

## Setup

### Installation

No installation required.

### Configuration

#### Log collection

To capture security event logs generated from your Akamai security configuration, create an API client in your Akamai account, and then enter the generated credentials in the [Akamai integration tile][2] in Datadog.

#### Creating an API client on Akamai
1. Sign in to your [Akamai account][3].
2. Search for **Identity and Access Management**.
3. Click **Create API Client**.
4. Under **Select APIs**, search for **SIEM** and provide **READ-ONLY** access.
5. Under **Select groups**, assign **Manage SIEM** to the group associated with your security policy. 
6. After creating the API client, click **Create credential** to generate your set of credentials.
<!--4. Follow the instructions below to assign the respective permissions for your Akamai product. -->
<!-- TODO: When another Akamai product is added, remove #4-6 from above, uncomment #4 above, uncomment this section, and include
other Akamai product instructions in the same format.

#### Akamai Security Events
1. Under **Select APIs**, search for **SIEM** and provide **READ-ONLY** access.
2. Under **SElect groups**, assign **Manage SIEM** to the group associated with your security policy.
3. After creating the API client, click **Create credential** to generate your set of credentials.
-->

#### Getting the config IDs for your account

1. Once logged in, navigate to **Security Configurations**.
2. From the list of security configurations, select the configuration you want to get logs from.
3. The config ID for the selected configuration is found in the URL. The URL is in the format: `http\://control.akamai.com/apps/security-config/#/next/configs/**CONFIG_ID**`.
4. Under your account, click **Add New** and enter the config ID that was found in the previous step.

## 収集データ

### メトリクス

The Akamai integration does not include any metrics.

### Logs

The Akamai integration collects logs from your Akamai account's security events. Due to limitations on Akamai's APIs, 
Datadog can only collect up to the past 12 hours of historical events. 

### イベント

The Akamai integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "akamai_application_security" >}}


## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://app.datadoghq.com/dash/integration/Akamai-Application-Security-Overview
[2]: https://app.datadoghq.com/integrations/akamai
[3]: https://control.akamai.com/apps/auth/#/login
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/akamai/assets/service_checks.json
[5]: https://docs.datadoghq.com/help/

