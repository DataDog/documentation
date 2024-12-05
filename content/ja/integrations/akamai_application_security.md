---
app_id: akamai
app_uuid: 5ee63b45-092e-4d63-b980-1675f328bf6b
assets:
  dashboards:
    akamai-application-security-overview: assets/dashboards/akamai_application_security_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10392
    source_type_name: Akamai
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_application_security
integration_id: akamai
integration_title: Akamai Application Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_application_security
public_title: Akamai Application Security
short_description: Akamai とインテグレーションし、Akamai 製品のイベントログを取得します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Submitted Data Type::Logs
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Akamai とインテグレーションし、Akamai 製品のイベントログを取得します。
  media:
  - caption: Akamai Application Security ダッシュボードの概要
    image_url: images/akamai-application-security-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Application Security
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

#### アカウントの構成 ID の取得

1. ログインしたら、**Security Configurations** に移動します。
2. セキュリティ構成のリストから、ログを取得したい構成を選択します。
3. 選択された構成の構成 ID は URL にあります。URL の形式は、`http\://control.akamai.com/apps/security-config/#/next/configs/**CONFIG_ID**` です。
4. アカウントで **Add New** をクリックし、前のステップで見つかった構成 ID を入力します。

## 収集データ

### メトリクス

Akamai インテグレーションには、メトリクスは含まれません。

### Logs

Akamai のインテグレーションは、Akamai アカウントのセキュリティイベントからログを収集します。Akamai の API の制限により、Datadog が収集できるのは過去 12 時間分の履歴イベントのみです。

### イベント

Akamai インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "akamai_application_security" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/dash/integration/Akamai-Application-Security-Overview
[2]: https://app.datadoghq.com/integrations/akamai
[3]: https://control.akamai.com/apps/auth/#/login
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/akamai/assets/service_checks.json
[5]: https://docs.datadoghq.com/ja/help/
