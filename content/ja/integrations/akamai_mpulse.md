---
categories:
- cloud
dependencies: []
description: Akamai mPulse と Datadog を統合
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: ブログ
  text: Akamai mPulse リアルユーザーモニタリングと Datadog のインテグレーション
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Akamai mPulse と Datadog を統合
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Datadog と Akamai mPulse を連携させてリアルユーザー モニタリング (RUM) メトリクスを収集し、エンドユーザーが Web サイトのパフォーマンスをどのように認識しているかを視覚化します。RUM メトリクスを CDN やバックエンドのインフラストラクチャーからのパフォーマンスデータと共に分析および相関させることで、Web スタック全体の総合的な可視性を得ることができます。

Datadog のすぐに使えるダッシュボードとモニターを使用することで、次のことが可能になります。
- 直帰率、ユーザーセッション、ページロード時間などのキーメトリクスの概要を取得する
- フロントエンド、バックエンドを問わず、ユーザーがスローダウンに直面している原因を調査する
- ページのロード時間とページグループを監視する

[Akamai DataStream 2][1]、[NGINX][2]、[MYSQL][3]、その他 600 を超えるテクノロジーからのリアルタイムデータとメトリクスを相関付け、Web スタックをフロントエンドからバックエンドまで表示します。

## 計画と使用

### インフラストラクチャーリスト

Datadog の [Akamai mPulse インテグレーションタイル][4]を使用して、インテグレーションをインストールします。

### ブラウザトラブルシューティング

Akamai mPulse インテグレーションを構成するには、`apiKey` と `apiToken` が必要です。

#### API キーの生成

`apiKey` は、mPulse ポータルにあるユーザーサイトのデータ (ビーコン) を一意に識別するために自動生成される値です。

<div class="alert alert-warning">
"Apps" メニューオプションと `apiKey` 属性は、アプリ管理者にのみ表示されます。
</div>

1. "Central" ページに移動して、`apiKey` を見つけます。
2. 左のパネルの **Apps** をクリックします。
3. 監視したいアプリ名を選択すると、`apiKey` を含む構成ページが開きます。

#### API トークンの生成

[API トークンに関する Akamai のドキュメント][5]を参照し、次に:

1. `mpulse.soasta.com` にログインします。
2. 左端のパネルで My Settings に移動します。
3. API トークン領域で Generate をクリックします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "akamai_mpulse" >}}


### ヘルプ

Akamai mPulse インテグレーションには、イベントは含まれません。

### ヘルプ

Akamai mPulse インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/akamai_datastream_2/
[2]: https://docs.datadoghq.com/ja/integrations/nginx/
[3]: https://docs.datadoghq.com/ja/integrations/mysql/
[4]: https://app.datadoghq.com/integrations/akamai-mpulse
[5]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/