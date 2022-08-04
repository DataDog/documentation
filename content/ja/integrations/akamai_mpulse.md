---
categories:
- cloud
dependencies: []
description: Akamai mPulse と Datadog を統合
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Akamai mPulse と Datadog を統合
team: web-integrations
version: '1.0'
---

## 概要

Datadog と Akamai mPulse を接続してリアルユーザーモニタリング (RUM) メトリクスを収集し、エンドユーザーが Web サイトのパフォーマンスをどのように見ているかを可視化します。

## セットアップ

### インストール

Datadog の [Akamai mPulse インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィギュレーション

Akamai mPulse インテグレーションを構成するには、`apiKey` と `apiToken` が必要です。

`apiKey` は、mPulse ポータルで見つかったサイトのデータ (ビーコン) を一意に識別する自動生成された値です。"Central" ページに移動し、左側のパネルの "Apps" をクリックすると、`apiKey` を見つけることができます。最後に、監視するアプリ名をダブルクリックして、`apiKey` を含むコンフィギュレーションページを表示します。

<div class="alert alert-warning">
注: "Apps" メニューオプションと `apiKey` 属性は、アプリ管理者にのみ表示されます。
</div>

#### API トークンの生成

[API トークンに関する Akamai のドキュメント][2]を参照し、次に:

1. `mpulse.soasta.com` にログインします。
2. 左端のパネルで My Settings に移動します。
3. API トークン領域で Generate をクリックします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "akamai_mpulse" >}}


### イベント

Akamai mPulse インテグレーションには、イベントは含まれません。

### サービスのチェック

Akamai mPulse インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/akamai-mpulse
[2]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/