---
app_id: statuspage
app_uuid: 04411bc4-4af1-482e-b05d-eeec3a40c464
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 135
    source_type_name: StatusPage
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- incidents
- issue tracking
- notifications
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: statuspage
integration_id: statuspage
integration_title: StatusPage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statuspage
public_title: StatusPage
short_description: StatusPage.io は、企業が顧客のために公開メトリクスと自動更新を備えたステータスページをセットアップするのに役立ちます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::問題の追跡
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: StatusPage.io は、企業が顧客のために公開メトリクスと自動更新を備えたステータスページをセットアップするのに役立ちます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: StatusPage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要
[Atlassian Statuspage][1] は、Datadog でサードパーティのサービスから報告されたインシデントを確認および作成できる、ステータスおよびインシデント管理ツールです。

Statuspage とインテグレーションすることで、以下のことが可能になります。
- Statuspage のインシデントを作成、更新、および Datadog のインシデントにリンクします。
- Datadog インシデントに対応する Statuspage インシデントを参照します。
- インシデントを独自のメトリクスやイベントと相関付けます。

## セットアップ

### インストール

#### Statuspage アカウントの接続
{{% site-region region="gov" %}}
<div class="alert alert-danger">
Incident Management インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

Statuspage アカウントを接続して、Incident Management から Statuspage インシデントを作成および更新します。

{{< img src="integrations/statuspage/integrations_statuspage_incident_modal.png" alt="ステータスインシデント作成モーダル" popup="true" style="width:60%;">}}

1. [アカウント][2]にログインします。
2. 画面右上のアバターをクリックして、ユーザーメニューにアクセスします。
3. API 情報をクリックします。
4. `Organization API keys` の下で API キーを作成するか、既存のものをコピーします。
5. [インテグレーションタイル][3]の `API key` フィールドに API キーを入力します。

#### インシデントと独自のメトリクスおよびイベントを相関付ける

Statuspage のイベントを独自のメトリクスやイベントと相関付けて分析し、環境に影響を与える可能性のあるものに対して通知を受けるようにモニターをセットアップすることができます。インテグレーションのこの部分では、自身の Statuspage アカウントは必要ありません。

[インテグレーションタイル][3]の **Statuspage URLs** セクションに、監視したいサービスの Statuspage URL を入力します。ページに関連付けたいカスタムタグを入力します。

## 収集データ

### メトリクス

Statuspage インテグレーションには、メトリクスは含まれていません。

### イベント

Statuspage インテグレーションは、構成されたステータスページから Datadog イベントを取り込み、これによりこうしたイベントをメトリクスと相関付けたり、[これらのイベントに基づいてアラートを送信する][4]ことができます。

### サービスチェック

Statuspage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: https://manage.statuspage.io/login
[3]: https://app.datadoghq.com/integrations/statuspage
[4]: https://docs.datadoghq.com/ja/monitors/monitor_types/event/
[5]: https://docs.datadoghq.com/ja/help/
