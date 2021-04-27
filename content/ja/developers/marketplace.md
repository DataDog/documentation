---
title: マーケットプレイス
type: ドキュメント
further_reading:
  - link: 'https://www.datadoghq.com/partner/'
    tag: パートナーページ
    text: Datadog パートナーネットワーク
  - link: 'https://www.datadoghq.com/blog/datadog-marketplace/'
    tag: blog
    text: Datadog Marketplace で監視範囲を拡大する
---
Datadog Marketplace は、Datadog テクノロジーパートナーが Datadog ユーザーにインテグレーション、ソフトウェア、サービスを出品できるデジタルマーケットプレイスです。

Datadog Marketplace に参加する前に、まず [Datadog パートナーネットワーク][1]テクノロジートラックに参加する必要があります。Datadog テクノロジーパートナーとして、インテグレーションを開発し、商品を含むタイルリストを作成できます。

Datadog のお客様は、[インテグレーション][2]ページまたは [Datadog Marketplace][3] のいずれかを介して、Datadog アプリからタイルにアクセスできます。インテグレーションページには、Datadog とテクノロジーパートナーによって無料で構築されたインテグレーションが含まれていますが、Marketplace は、Datadog のお客様とテクノロジーパートナーがインテグレーション、ソフトウェア、サービスなどのさまざまな製品を売買するための商用プラットフォームです。

次の手順に従って、Marketplace の製品を開発および公開します。

## サンドボックスアカウントを申請する

すべてのテクノロジーパートナーは、開発を支援するために専用のサンドボックス Datadog アカウントをリクエストできます。サンドボックスをリクエストするには

1. テクノロジーパートナーアプリケーションと同じメールアドレスを使用して、無料の Datadog [トライアルアカウント][4]を作成します
2. [Datadog パートナーポータル][5]にログインします
3. 個人のホームページで、“Sandbox Access” の下にある “Learn More” ボタンをクリックします。
4. “Request Sandbox Upgrade” を選択します

アカウントを開発者サンドボックスに変換するには、最大 1〜2 営業日かかる場合があります。ご不明な点がございましたら、[Datadog サポート][6]までお問い合わせください。

## インテグレーションを開発する

### リソース

このドキュメントに加えて、次の手順を実行することで、Datadog インテグレーションの開発について詳しく知ることができます。

* [Datadog ラーニングセンター][8]のオンデマンドコース [“Introduction to Datadog Integrations”][7] に参加します。
* [Marketplace リポジトリ][9]にあるプルリクエストの例を、アノテーションとベストプラクティスとともに確認します (このリンクは、Datadog パートナーポータルで Marketplace 出品契約を完了したテクノロジーパートナーのみが利用できます)。
* [Integrations Extras リポジトリ][10]で、他のテクノロジーパートナーによって構築された既存のインテグレーションを探します。
* [Datadog 公開 Slack][11] から Marketplace Engineering Office Hours に参加します。

### 開発プロセス

1. [出品したい Marketplace 製品のタイプを選択します](#1-choose-an-integration-type)
2. [双方向のインテグレーションを構築します](#2-build-a-bi-directional-integration)
3. [Marketplace または Integrations Extras リポジトリのいずれかを複製します](#3-clone-either-the-marketplace-or-the-integrations-extras-repository)
4. [Datadog Development Toolkit をインストールします](#4-install-and-run-the-datadog-development-toolkit)
5. [タイルスキャフォールディングにメタデータとすぐに使用できるアセット (ダッシュボードやモニターなど) を入力します](#5-populate-the-tile-scaffolding)
6. [プルリクエストを送信します](#6-submit-a-pull-request)
7. [タイルのリリースを承認します](#7-approve-tile-for-release)

### 1. インテグレーションタイプを選択します

Datadog とインテグレーションする方法はいくつかあります。ユースケースとインテグレーションのタイプに応じて、提供するサービスに最も適したアプローチを選択してください。

#### [1. Datadog Agent ベースインテグレーション][12]

##### [OpenMetrics チェック][13]

* OpenMetrics チェックは、Open Metrics 標準を使用してメトリクスを公開する既存のアプリケーションからテレメトリデータを収集するのに適しています。

##### [Python チェック][14]

* Python チェックは、標準形式でメトリクスを公開しないサービスまたは製品の監視に適しています。Python チェックは、さまざまな API またはコマンドラインツールからテレメトリデータを収集するために使用されます。

##### [DogStatsD][15]

* DogStatsD は、StatsD プロトコルを使用してテレメトリをすでに送信しているアプリケーションに適しています。Datadog は、以下を含む追加の Datadog 固有の拡張機能を StatsD プロトコルに追加します。
    * ヒストグラムメトリクスタイプ
    * サービスのチェック
    * イベント
    * タグ付け

#### [2. Datadog REST API インテグレーション][16]

API インテグレーションは、バックエンドからデータを強化して送信したり、Datadog から直接データをプルしたりするのに適しています。API インテグレーションは、Datadog と別の SaaS プラットフォーム間のコネクタを構築する場合にもうまく機能します。

**Note:** Datadog API エンドポイントにデータを送信するには Datadog API キーが必要ですが、Datadog からデータをクエリしたり、Datadog アプリ内でリソースを作成したりするにはアプリキーが必要です。

#### 3. タイルのみの出品

データ交換のないスタンドアロンの SaaS またはサービス製品を含む Marketplace 製品の場合、必要なのはタイルのみです。Development Toolkit は、タイルのみのスキャフォールディングを作成するためのコマンドオプション `ddev create -t tile "<Offering Name>"` を提供します。

### 2. 双方向のインテグレーションを構築する

Datadog から情報をプルすることも役立つ場合がありますが、Datadog Integrations ページまたは Marketplace に出品するには、インテグレーションが双方向である必要があります。つまり、データを Datadog にプッシュする必要もあります。

インテグレーションにより、次のデータを Datadog に送信できます。

1. [メトリクス][17]
2. [ログ][16]
3. [イベント][18]
4. [サービスチェック][19]
5. [トレース][20]
6. [インシデント][21]
7. [セキュリティイベント][22]

### 3. Marketplace または Integrations Extras リポジトリのいずれかを複製します

Datadog インテグレーションは、非公開の [Marketplace リポジトリ][9]またはオープンソースの [Integrations Extras リポジトリ][10]のいずれか用に開発できます。

インテグレーションを構築するプロセスは各リポジトリで同じですが、Marketplace 製品にはさらにいくつかのファイルとフィールド (価格設定など) が必要です。プルリクエストを複製して送信するときは、目的のリポジトリを指すことを忘れないでください。

テクノロジーパートナーは、marketplace@datadog.com にメールを送信することにより、非公開の Marketplace リポジトリへのアクセスをリクエストできます。

### 4. Datadog Development Toolkit をインストールして実行します

Datadog Development Toolkit コマンド (`ddev`) を使用すると、タイルのすべてのアセットとメタデータのスケルトンをスピンアップすることで、インテグレーションを最初に開発するときにスキャフォールディングを作成できます。

Python 3.8 以降がインストールされていることを確認します。

最新リリースバージョンは [PyPI][23] からインストールできます。

`python -m pip install --upgrade "datadog-checks-dev[cli]`

次の場所を複製されたリポジトリに設定します。

#### Marketplace:

`ddev config set marketplace /path/to/marketplace`

`ddev config set repo marketplace`

#### Integrations-Extras:

`ddev config set extras /path/to/integrations-extras`

`ddev config set repo extras`

#### タイルのみの出品

スタンドアロンのソフトウェアとサービスの場合、またはインテグレーションが Datadog API を使用していて、Python コードが含まれていない場合、Development Toolkit はタイルのみのコマンドをサポートします。
`ddev create -t` 

#### 完全なインテグレーション

完全なインテグレーションスキャフォールディングの場合、次を実行します。

`ddev create <Offering Name>`

### 5. タイルスキャフォールディングにデータを入力します

前のセクションの ddev コマンドは、タイルアセットを構成するフォルダーとファイルのスケルトンを生成します。

#### README.md

* “Overview”、“Setup”、“Support” セクションを H2 見出し (マークダウンの ##) で含めます。
* “Overview" の見出しは、製品がユーザーに提供する価値と、より包括的な可観測性のために Datadog と一緒に使用する方法を明確に説明する必要があります。ソフトウェアまたはダッシュボードの動作中の画像を追加することをお勧めします。このセクションは、タイルの “Overview” タブに表示されます。
* “Setup” の見出しは、ユーザーが製品をインストールまたは使用するための簡単なコンフィギュレーション手順を提供する必要があります。このセクションは、タイルの “Configuration” タブに表示されます。
* “Support” の見出しは、サポートの連絡先を特定し、場合によっては製品のフィードバックを送信するオプションを特定する必要があります。このセクションは、タイルの “Support” タブに表示されます。

#### 画像

* `README.md` ファイルで使用されているすべての画像を `images` フォルダに保存します。

#### Manifest.json

* `display_name`、`public_title`、`author` などの要素を含む JSON オブジェクト。
* `manifest.json` フィールドの詳細については、[インテグレーションアセットリファレンス][24]を参照してください。
* 価格設定オブジェクトの詳細は、非公開の [Marketplace README][25] に記載されています。

#### Metadata.csv

* メトリクス名、タイプ、間隔、単位など、インテグレーションに含まれるすぐに使用できるメトリクスのリストが含まれています。
* `metadata.csv` フィールドの詳細については、[インテグレーションアセットリファレンス][24]を参照してください。
* **注:** すべての Marketplace メトリクスは、カスタムメトリクスとしてカウントされます。

#### ダッシュボードとモニター

* インテグレーション用のすぐに使用できるダッシュボードとモニター (アラート) が含まれています。
* サンドボックスアカウントでダッシュボードとモニターを直接作成し、JSON ファイルとしてエクスポートできます。
* 詳細については、[ダッシュボードのベストプラクティス][26]ドキュメントを参照してください。

#### ロゴ

* DesignOps チームが Datadog アプリ全体にライトモードとダークモードの両方で実装する SVG で構成されています。
* **注:** テクノロジーパートナーは、提出するロゴのライセンスに責任を負います。

#### Changelog.md

* リリースノートとバージョン情報をキャプチャし、タイルの “Release Notes” タブに表示します。リリースノートを降順で追加します (最新バージョンが上部)。

#### 追加の Marketplace ファイル

* すべての Marketplace 製品には、テクノロジーパートナー独自のエンドユーザー使用許諾契約 (EULA) が必要です。

### 6. プルリクエストを送信します

インテグレーションアセットを含むプルリクエストを [Marketplace リポジトリ][9]または [Integrations Extras リポジトリ][10]に送信します。

各リポジトリは自動テストを実行して、プルリクエストが良好な状態であることを確認します。コマンド `ddev validate all` を使用して、これらの同じテストをローカルで実行できます。PR がすべてのチェックに合格すると、エンジニアリングチームがレビューを開始し、リリースするブロッカーを特定し、ベストプラクティスに関する提案を行います。

Marketplace リポジトリの Azure DevOps にアクセスする必要がある場合は、PR にコメントを残してください。エンジニアリングチームがアクセスを提供します。

### 7. タイルのリリースを承認します

プルリクエストタイルがエンジニアリングチームと製品チームによって承認されると、サンドボックスアカウントでタイルが有効になります。これにより、Datadog Marketplace でインテグレーションタイルを検証および表示し、公開前に変更を加えることができます。

## 市場開拓の機会を調整する

公式の双方向インテグレーションが開始されると、テクノロジーパートナーは、Datadog のパートナーマーケティングチームと会って、次のような共同の市場開拓戦略を調整することができます。

* パートナーのプレスリリースの Datadog 見積もり
* [Datadog モニター][27]のブログ投稿
* パートナーウェビナーの Datadog スピーカー
* ソーシャルメディア投稿の増幅

## お問い合わせ

ご不明な点がございましたら、techpartners@datadoghq.com までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/partner/
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/marketplace
[4]: https://www.datadoghq.com/free-datadog-trial/
[5]: https://partners.datadoghq.com/English/
[6]: /ja/help/
[7]: https://learn.datadoghq.com/course/view.php?id=38
[8]: https://learn.datadoghq.com/
[9]: https://github.com/DataDog/marketplace
[10]: https://github.com/DataDog/integrations-extras
[11]: https://chat.datadoghq.com/
[12]: /ja/developers/integrations/
[13]: /ja/developers/prometheus/
[14]: /ja/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[15]: /ja/developers/dogstatsd/?tab=hostagent
[16]: /ja/api/
[17]: /ja/api/latest/metrics/
[18]: /ja/api/latest/events/
[19]: /ja/api/latest/service-checks/
[20]: /ja/api/latest/tracing/
[21]: /ja/api/latest/incidents/
[22]: /ja/api/latest/security-monitoring/
[23]: https://pypi.org/project/datadog-checks-dev/
[24]: /ja/developers/integrations/check_references/#manifest-file
[25]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[26]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[27]: https://www.datadoghq.com/blog/