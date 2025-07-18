---
categories:
- Collaboration
- issue tracking
- log collection
dependencies: []
description: 新しいチケットと解決済みチケットを追跡。Datadog モニターからチケットを自動生成。
doc_link: https://docs.datadoghq.com/integrations/zendesk/
draft: false
git_integration_title: zendesk
has_logo: true
integration_id: zendesk
integration_title: Zendesk
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: zendesk
public_title: Datadog-Zendesk インテグレーション
short_description: 新しいチケットと解決済みチケットを追跡。Datadog モニターからチケットを自動生成。
team: web-integrations
version: '1.0'
---

{{< img src="integrations/zendesk/zendesk_dash.png" alt="Zendesk ダッシュボード" popup="true">}}

## 概要

Zendesk は、お客様からの問い合わせを受け付け、追跡、応答するためのカスタマーサービスおよびサポートチケットプラットフォームです。このインテグレーションを有効にすると、Datadog でチケットメトリクスを確認したり、Datadog からチケットを作成および更新することができます。

Zendesk と統合して、以下のことができます。

- ステータス、ユーザー、満足度に基づいてチケットカウントメトリクスを監視し、グラフ化できます。
- 新しい Zendesk チケットが開かれるたびに、Datadog イベントを受け取ることができます。
- `@zendesk` メンションを使用して、チケットを作成および更新します。

## セットアップ

### インストール

このインテグレーションをインストールするには、Zendesk API トークンを生成します。

1. 左メニューの _Admin_ 歯車アイコンをクリックし、メニュー項目リストの _Channels_ セクションで _API_ を選択して API 設定ページに移動します。
2. トークンアクセスが有効になっていない場合は、有効にします。
3. プラス記号をクリックして新しいトークンを作成します。
4. API トークンの説明に、「Datadog-Zendesk Integration」などのわかりやすい内容を設定します。
5. API トークンをコピーします。**_重要_**: トークンは保存すると表示されなくなるため、一時的に保存しておく必要があります。
6. _Save_ をクリックします。

インテグレーションを完了するには、[Datadog][1] でユーザー情報を入力します。

1. [Zendesk インテグレーションタイル][2]に移動し、_Configuration_ タブをクリックします。
2. Zendesk ドメインを入力します。これは、`zendesk.com` の前に表示されるテキストです。たとえば、Zendesk URL が `https://my-company.zendesk.com` の場合、ドメインは `my-company` です。
3. Zendesk ユーザー名を入力します。
4. 上の手順 5 で受け取った Zendesk API トークンを入力します。
5. Install Integration ボタンをクリックします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zendesk" >}}


### イベント

このインテグレーションは、新しい Zendesk チケットが開かれるたびにイベントを生成します。

### サービスのチェック

Zendesk インテグレーションには、サービスのチェック機能は含まれません。

## その他の参考資料

### ナレッジベース

#### チケットを作成

新しい Zendesk チケットを作成してグループに割り当てることができます。まず、Datadog の [Zendesk インテグレーションタイル][2]でグループ名を追加し、次に Datadog モニターやアノテーションで `@zendesk-group-name` と入力します。たとえば、チケットを作成して _Support_ という Zendesk グループに割り当てるには、グループを追加して `@zendesk-support` と入力します。

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.com/account/settings#integrations/zendesk
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/zendesk/zendesk_metadata.csv