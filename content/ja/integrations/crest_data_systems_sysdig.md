---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-sysdig
app_uuid: b3e22bb7-8fb1-45d5-ad65-2f63d6a42a79
assets:
  dashboards:
    CDS Activity Audit Overview: assets/dashboards/cds_sysdig_activity_audit_overview.json
    CDS Audit Tap Overview: assets/dashboards/cds_sysdig_audittap_overview.json
    CDS Policy Events Overview: assets/dashboards/cds_sysdig_policy_events_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10366
    source_type_name: crest_data_systems_sysdig
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- data stores
- incident-teams
- kubernetes
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sysdig
integration_id: crest-data-systems-sysdig
integration_title: Sysdig
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sysdig
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: sysdig
  short_description: sysdig インテグレーションの月額定額料金。
  unit_price: 1995.0
public_title: Sysdig
short_description: Sysdig Syslog データの可視化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Data Stores
  - Category::Containers
  - Category::Kubernetes
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Sysdig Syslog データの可視化
  media:
  - caption: CDS Sysdig - ポリシーイベント概要
    image_url: images/cds_sysdig_policy_events_overview.png
    media_type: image
  - caption: CDS Sysdig - 監査タップ概要
    image_url: images/cds_sysdig_audittap_overview.png
    media_type: image
  - caption: CDS Sysdig - アクティビティ監査概要
    image_url: images/cds_sysdig_activity_audit_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sysdig
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## 概要

* Sysdig は、コンテナ化およびクラウドネイティブ環境における監視、保護、トラブルシューティングのための強力かつ包括的なソリューションを提供する統合データプラットフォームです。ホスト、Kubernetes クラスター、ワークロードの監視、保護、トラブルシューティングが可能です。
* Sysdig Secure は、チームがビルドを保護し、ランタイムの脅威を検出して対応し、クラウド構成、権限、コンプライアンスを継続的に管理できるようにします。

このインテグレーションは、以下の**イベント転送データソース**からログを収集します。

*  ランタイムポリシーイベント
*  アクティビティ監査
*  監査タップ

## トラブルシューティング

* Agent ログでポートバインディング中に **Permission denied** エラーが表示された場合は、以下の手順に従ってください。

   1. 1024 未満のポート番号にバインドするには、昇格権限が必要です。以下の手順に従って設定してください。

      - setcap コマンドを使用して、ポートへのアクセスを許可します。

         ```
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - セットアップが正しいか確認するために、getcap コマンドを実行します。

         ```
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```
         正しければ、次のように出力されます。

         ```
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```
         **注**: Agent をアップグレードするたびに、この setcap コマンドを再実行してください。

   2. [Agent を再起動します][3]。

* ファイアウォールが有効になっている場合、構成ポートからのトラフィックがバイパスされることを確認してください。

* **Port <PORT-NO\> Already in Use** エラーが表示された場合は、以下の手順に従ってください (以下の例は PORT-NO = 514 の場合です)。

    * Syslog があるシステムで、Agent がポート 514 で Sysdig ログをリッスンしている場合、Agent ログに以下のエラーが表示されることがあります: **Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use**

    * これは、デフォルトで Syslog がポート 514 をリッスンしているために発生します。このエラーを解決するには、Syslog を無効にするか、Agent が他のサービスに占有されていない利用可能なポートをリッスンします。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][2]
- 営業メール: [datadog-sales@crestdata.ai][7]
- Web サイト: [crestdata.ai][1]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][11]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://docs.sysdig.com/en/docs/sysdig-secure/secure-events/event-forwarding/forwarding-to-syslog/#configure-syslog-event-forwarding
[5]: https://docs.sysdig.com/en/docs/administration/administration-settings/certificates-management/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sysdig.pdf
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sysdig" target="_blank">こちらをクリック</a>してください。