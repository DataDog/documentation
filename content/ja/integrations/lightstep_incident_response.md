---
app_id: lightstep-incident-response
app_uuid: b61db30e-3cbc-4dbe-b055-824f9e46e006
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lightstep-incident-response
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Lightstep Incident Response
author:
  homepage: https://lightstep.com/incident-response
  name: Datadog
  sales_email: success@lightstep.com
  support_email: help@datadoghq.com
categories:
- アラート設定
- コラボレーション
- 問題追跡
- notification
- インシデント
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lightstep_incident_response/README.md
display_on_public_website: true
draft: false
git_integration_title: lightstep_incident_response
integration_id: lightstep-incident-response
integration_title: Lightstep  Incident Response
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: lightstep_incident_response
public_title: Lightstep  Incident Response
short_description: Datadog のアラートと Lightstep Incident Response のアラートを同期させる
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Alerting
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Notification
  - Category::Incidents
  configuration: README.md#Setup
  description: Datadog のアラートと Lightstep Incident Response のアラートを同期させる
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lightstep  Incident Response
---



## 概要

[Lightstep Incident Response][1] は、Slack、Zoom、デスクトップ、モバイルでアラートのトリアージとオンコールスケジューリングをオーケストレーションします。また、オンコール、アラート、インシデント管理のワークフローに加え、統合されたコラボレーションによる統一されたレスポンスコンテキストを提供します。

Lightstep Incident Response は、標準的な API で Datadog からデータを収集し、ビジネスに影響が出る前に異常イベントを見つけます。

## セットアップ

### インストール

インテグレーションの構成と Lightstep Incident Response へのデータ送信については、[Lightstep Incident Response-Datadog インテグレーションのドキュメント][2]を参照してください。

Lightstep Incident Response アカウントをお持ちでない場合、[サインアップ][3]すると無料で利用開始できます。

## サポート

[Datadog サポート][4]にお問い合わせいただくか、[Lightstep Incident Response][1] にサインアップ後、ライブエージェントにチャットでお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog と Incident Response のインテグレーション][2]

[1]: https://lightstep.com/incident-response
[2]: https://lightstep.com/incident-response/docs/integrations-datadog
[3]: https://lightstep.com/incident-response/signup
[4]: https://docs.datadoghq.com/ja/help/