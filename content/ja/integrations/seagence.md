---
app_id: seagence
app_uuid: 94f4e504-c98c-466f-b934-5e5ee0331944
assets:
  dashboards:
    seagence_overview: assets/dashboards/seagence_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10360
    source_type_name: Seagence
  monitors:
    Seagence Defect Detection: assets/monitors/defect_detection_monitor.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.seagence.com/
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
categories:
- alerting
- automation
- event management
- developer tools
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/seagence/README.md
display_on_public_website: true
draft: false
git_integration_title: seagence
integration_id: seagence
integration_title: Seagence
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: seagence
public_title: Seagence
short_description: Realtime Defect Detection & Resolution tool that eliminates debugging.
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Submitted Data Type::Events
  - Category::Alerting
  - Category::Automation
  - Category::Event Management
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Realtime Defect Detection & Resolution tool that eliminates debugging.
  media:
  - caption: Seagence Defects Overview dashboard
    image_url: images/datadog-dashboard.png
    media_type: image
  - caption: Seagence Defect Detection monitor
    image_url: images/seagence-datadog-monitor.png
    media_type: image
  - caption: Success and Defect Execution Paths
    image_url: images/defect-and-successexecution-paths-1440x810.png
    media_type: image
  - caption: Defect and Success Clusters
    image_url: images/defect-and-success-clusters.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/seagence-datadog-marketplace/
  support: README.md#Support
  title: Seagence
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Seagence][1] is a production-grade Realtime Defect Detection and Resolution tool for Java applications. Using ExecutionPath technology, Seagence detects known and unknown defects caused by various issues like multithreading issues, swallowed, handled, and unhandled exceptions, and others, including defects that are disguised in a 200 success HTTP response code.

With this integration, Seagence backend continuously analyzes the data stream from the Seagence agent to detect defects when they occur, including the root cause of the defect. When a defect is detected, the integration will send an event to Datadog to alert your team. Using the out-of-the-box dashboard, you have visibility into the detected defects and root causes to eliminate debugging and troubleshooting. More details about the defect can be found on [SeagenceWeb][2].

## セットアップ

### インストール

Visit [Seagence][1] to sign up for free. Once registered, navigate to the Seagence tile on the [Datadog Integrations page][3] and click **Install Integration**. Click **Connect Accounts** on the tile, which guides you through the Datadog OAuth2 flow to grant Seagence access to post Events to your Datadog account.

After connecting your accounts, go to the "Assets" tab on the tile. Click **Recommended Monitors** > **Seagence Defect Detection Monitor**. This will redirect you to create the out-of-the-box monitor. Click **Create** at the bottom of the page to install the Seagence monitor.

### 構成

Using the `-javaagent` option, attach Seagence's Java agent to your application. Download the Java agent from your Seagence account. For more information, visit [getting started][4] on [Seagence][1].

## アンインストール

To remove the Datadog integration from Seagence:
1. Uninstall the integration from Datadog by clicking **Uninstall Integration**. Once you uninstall the integration, any previous authorizations are revoked.
2. Ensure that all API keys associated with the integration have been disabled by searching for the integration name on the [API Keys Management page][5].
3. Delete the associated monitor by going to **Monitors** > **Manage Monitors**. Hover over **Seagence Defect Detection Monitor** and click **Delete**.
4. Remove the `-javaagent` option from your application's Java runtime parameters.


## 収集データ

### メトリクス

Seagence does not include any metrics.

### サービスチェック

Seagence does not include any service checks.

### イベント

Seagence posts an event to Datadog upon detecting a defect.

## サポート

Need help? Contact [Seagence support][6].

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Detect Java code-level issues with Seagence and Datadog][7]

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://app.datadoghq.com/integrations/seagence
[4]: https://seagence.com/product/getting-started/
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Seagence
[6]: mailto:support@seagence.com
[7]: https://www.datadoghq.com/blog/seagence-datadog-marketplace/