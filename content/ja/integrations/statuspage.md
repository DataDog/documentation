---
categories:
- notification
- Collaboration
- issue tracking
dependencies: []
description: Datadog-Statuspage インテグレーション
doc_link: https://docs.datadoghq.com/integrations/statuspage/
draft: false
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/integrate-monitors-with-statuspage/
  tag: Documentation
  text: モニターと Statuspage のインテグレーション
git_integration_title: statuspage
has_logo: true
integration_id: statuspage
integration_title: Statuspage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: statuspage
public_title: Datadog-Statuspage インテグレーション
short_description: Datadog-Statuspage インテグレーション
team: web-integrations
version: '1.0'
---

## 概要

[Atlassian Statuspage][1] は、ステータスおよびインシデント管理ツールで、サードパーティーのサービスのステータスページからインシデントをキャプチャし、インシデントと自社のメトリクスおよびイベントを関連付けることができます。このインテグレーションでは、独自の Statuspage アカウントを持つ必要はありません。

## セットアップ

### インストール

インテグレーションタイルを有効にしたら、監視するサービスの Statuspage の URL を入力します。たとえば、PagerDuty Statuspage ページは `https://status.pagerduty.com` にあります。ページに関連付けるカスタムタグを入力し、**Update Configuration** をクリックします。

## 収集データ

### メトリクス

Statuspage インテグレーションには、メトリクスは含まれません。

### イベント

Statuspage インテグレーションは、構成された Statuspage ([PagerDuty など][2]) から Datadog イベントを取得します。これらのイベントをメトリクスに関連付けたり、[イベントに基づいてアラートを送信][3]することができます。

### サービスのチェック

Statuspage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: https://status.pagerduty.com
[3]: https://docs.datadoghq.com/ja/monitors/monitor_types/event/
[4]: https://docs.datadoghq.com/ja/help/