---
categories:
  - notification
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: Datadog-StatusPage.io インテグレーション。
doc_link: 'https://docs.datadoghq.com/integrations/statuspage/'
draft: false
git_integration_title: statuspage
has_logo: true
integration_id: statuspage
integration_title: StatusPage.io
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: statuspage
public_title: Datadog-StatusPage.io インテグレーション
short_description: Datadog-StatusPage.io インテグレーション。
version: '1.0'
---
## 概要

サードパーティサービスの StatusPage からインシデントをキャプチャして、インシデントを独自のメトリクスとイベントに関連付けます。このインテグレーションに独自の StatusPage.io アカウントは必要ありません。

## セットアップ

### インストール

インテグレーションタイルを有効にしたら、監視するサービスの StatusPage.io ページを入力します。たとえば、PagerDuty のステータスページは `https://status.pagerduty.com` にあります。ページに関連付けるカスタムタグを入力し、**Update Configuration** をクリックします。

## 収集データ

### メトリクス

StatusPage インテグレーションには、メトリクスは含まれません。

### イベント

StatusPage インテグレーションは、構成された StatusPage ([PagerDuty など][1]) から Datadog イベントを取得します。これらのイベントをメトリクスに関連付けたり、[イベントに基づいてアラートを送信][2]することができます。

### サービスのチェック

StatusPage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://status.pagerduty.com
[2]: https://docs.datadoghq.com/ja/monitors/monitor_types/event/
[3]: https://docs.datadoghq.com/ja/help/