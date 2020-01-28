---
categories:
  - クラウド
ddtype: クローラー
dependencies: []
description: Akamai mPulse と Datadog を統合
doc_link: 'https://docs.datadoghq.com/integrations/akamai_mpulse/'
git_integration_title: akamai_mpulse
has_logo: true
integration_title: Akamai mPulse
is_public: true
kind: インテグレーション
manifest_version: 1
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Akamai mPulse と Datadog を統合
version: 1
---
## 概要

Datadog と Akamai mPulse を接続してリアルユーザーモニタリング (RUM) メトリクスを収集し、エンドユーザーが Web サイトのパフォーマンスをどのように見ているかを可視化します。

## セットアップ
### インストール

Datadog の [Akamai mPulse インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィグレーション

Akamai mPulse インテグレーションを構成するには、`apiKey` と `apiToken` が必要です。

`apiKey` は、mPulse ポータルにあるユーザーサイトのデータ (ビーコン) を一意に識別するために自動生成される値です。

#### [apiToken][2] の生成
1. `mpulse.soasta.com` にログインします。
2. 左端のパネルで My Settings に移動します。
3. API Token 領域で Generate をクリックします。

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
[4]: https://docs.datadoghq.com/ja/help

{{< get-dependencies >}}