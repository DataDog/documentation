---
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: パートナーページ
  text: Datadog パートナーネットワーク
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: blog
  text: Datadog Marketplace で監視範囲を拡大する
title: マーケットプレイス
type: documentation
---

Datadog Marketplace は、Datadog テクノロジーパートナーが Datadog ユーザーにデータインテグレーション、ソフトウェア、プロフェッショナルサービスを出品できるデジタルマーケットプレイスです。

## Datadog パートナーネットワークに参加する
Datadog Marketplace に参加する前に、まず [Datadog パートナーネットワーク][1]テクノロジートラックに参加する必要があります。Datadog テクノロジーパートナーとして、データインテグレーションや Datadog アプリの開発、SaaS ライセンスやプロフェッショナルサービス製品を出品することが可能です。

Datadog のお客様は、[インテグレーションページ][2]または [Datadog Marketplace][3] のいずれかを介して、Datadog サイトからタイルにアクセスできます。インテグレーションページには、Datadog とテクノロジーパートナーによって無料で構築されたデータインテグレーションや Datadog アプリが含まれていますが、Marketplace は、Datadog のお客様とテクノロジーパートナーがデータインテグレーション、Datadog アプリ、ソフトウェア、プロフェッショナルサービスなどのさまざまな製品を売買するための商用プラットフォームです。

以下の手順に従って、インテグレーションページまたは Datadog Marketplace の製品を開発し、公開します。

## サンドボックスアカウントを申請する

すべてのテクノロジーパートナーは、開発を支援するために専用のサンドボックス Datadog アカウントをリクエストできます。サンドボックスをリクエストするには

1. [Datadog パートナーポータル][4]にログインします。
2. 個人のホームページで、"Sandbox Access" の下にある "Learn More" ボタンをクリックします。
3. "Request Sandbox Upgrade" を選択します。

開発者サンドボックスを作成するには、最大 1〜2 営業日かかる場合があります。ご不明な点がございましたら、[Datadog サポート][5]までお問い合わせください。

**注:** すでに Datadog の組織 (トライアル組織を含む) のメンバーである場合、[組織間の切り替え][6]の説明に従って、新しく作成したサンドボックスに切り替える必要があるかもしれません。

サンドボックスが作成されると、組織から[新しいメンバーを招待][7]して共同作業を行うことができるようになります。

## 提供する製品の開発

### リソース

このドキュメントに加えて、次の手順を実行することで、Datadog インテグレーションやその他の製品の開発について詳しく知ることができます。

* [Datadog ラーニングセンター][9]のオンデマンドコース ["Introduction to Datadog Integrations"][8] に参加します。
* [Marketplace リポジトリ][10]にあるプルリクエストの例を、アノテーションとベストプラクティスとともに確認します (このリンクは、Datadog パートナーポータルで Marketplace 出品契約を完了したテクノロジーパートナーのみが利用できます)。
* [Integrations Extras リポジトリ][11]で、他のテクノロジーパートナーによって構築された既存のインテグレーションを探します。
* Datadog ダッシュボードに外部データやアクションを統合するカスタムウィジェットの構築に興味がある場合は、[Datadog アプリ][12]のドキュメントをご覧ください。
* [Datadog 公開 Slack][13] から Marketplace Engineering Office Hours に参加します。

### 開発プロセス

1. [出品したい製品のタイプを選択します](#choose-an-offering-type)
2. [双方向のデータインテグレーションを構築します](#build-a-bi-directional-data-integration)
3. [Marketplace リポジトリを複製するか、Integrations Extras リポジトリをフォークします](#clone-the-marketplace-repository-or-fork-the-integrations-extras-repository)
4. [Datadog Development Toolkit をインストールします](#install-and-run-the-datadog-development-toolkit)
5. [タイルスキャフォールディングにメタデータとすぐに使用できるアセット (ダッシュボードやモニターなど) を入力します](#populate-the-tile-scaffolding)
6. [プルリクエストを送信します](#submit-a-pull-request)
7. [タイルのリリースを承認します](#approve-tile-for-release)

### 製品タイプを選択します

Datadog インテグレーションまたは Marketplace のページに掲載できる製品には、いくつかの種類があります。
1. データインテグレーション ([Datadog Agent ベースインテグレーション](#datadog-agent-based-integration)または [REST API インテグレーション](#datadog-rest-api-integration)にすることができる)
2. [Datadog アプリ](#datadog-app)
3. SaaS ライセンスまたはサブスクリプション (Marketplace のみ)
4. プロフェッショナルサービス (Marketplace のみ)

ユースケースに応じて、製品に最も適したアプローチを選択します。

Datadog アプリ、SaaS ライセンス、プロフェッショナルサービス、API ベースインテグレーションなど、Datadog Agent を使用しない製品を開発している場合、[タイルのみの出品](#tile-only-listing)を作成する必要があります。

#### Datadog Agent ベースインテグレーション

一般的な情報は、[Agent ベースインテグレーションの紹介][14]をお読みください。

##### OpenMetrics チェック

* [OpenMetrics チェック][15]は、Open Metrics 標準を使用してメトリクスを公開する既存のアプリケーションからテレメトリデータを収集するのに適しています。

##### Python チェック

* [Python チェック][16]は、標準形式でメトリクスを公開しないサービスまたは製品の監視に適しています。Python チェックは、さまざまな API またはコマンドラインツールからテレメトリデータを収集するために使用されます。

##### DogStatsD

* [DogStatsD][17] は、StatsD プロトコルを使用してテレメトリをすでに送信しているアプリケーションに適しています。Datadog は、以下を含む追加の Datadog 固有の拡張機能を StatsD プロトコルに追加します。
    * ヒストグラムメトリクスタイプ
    * サービスのチェック
    * イベント
    * タグ付け

#### Datadog REST API インテグレーション

[API インテグレーション][18]は、バックエンドからデータを強化して送信したり、Datadog から直接データをプルしたりするのに適しています。API インテグレーションは、Datadog と別の SaaS プラットフォーム間のコネクタを構築する場合にもうまく機能します。

API インテグレーションは Datadog Agent を使用してデータを収集しないため、開発作業が完了したら[タイルのみの出品](#tile-only-listing)を作成する必要があります。

**Note**: Datadog API エンドポイントにデータを送信するには Datadog API キーが必要ですが、Datadog からデータをクエリしたり、Datadog サイト内でリソースを作成したりするにはアプリケーションキーが必要です。

#### Datadog アプリ

[Datadog アプリ][12]は、[Datadog Developer Platform][19] で開発されるカスタムダッシュボードウィジェットです。Datadog アプリを公開する準備ができたら、Marketplace またはインテグレーションページのいずれかに[タイルのみの出品](#tile-only-listing)を作成する必要があります。

#### タイルのみの出品

Datadog Agent を使用してデータを収集しない製品については、タイルのみが必要です。タイルのみの出品には、SaaS ライセンスやプロフェッショナルサービス製品、Datadog アプリ、およびユーザーが Datadog の外ですべてのインテグレーション構成とインストールを行う必要がある API ベースインテグレーションが含まれます。

Datadog Development Toolkit には、タイルのみのスキャフォールディングを作成するコマンドオプション `ddev create -t tile -v2 "<Offering Name>"` が用意されています。このコマンドを使用すると、完全な Agent ベースのデータインテグレーションを構築するために使用するファイルではなく、タイルへの投入に関連するファイルのみを受け取ることができます。


### 双方向のデータインテグレーションを構築します

Datadog から情報をプルすることは役立つ場合がありますが、インテグレーションは双方向である必要があります。つまり、データを Datadog にプッシュする必要もあります。

インテグレーションにより、次のデータを Datadog に送信できます。

1. [メトリクス][20]
2. [ログ][21]
3. [イベント][22]
4. [サービスチェック][23]
5. [トレース][24]
6. [インシデント][25]
7. [セキュリティイベント][26]

**注:** スタンドアロンの SaaS ライセンスや専門的なサービスの提供など、Marketplace のタイルのみのリストには双方向のデータインテグレーションは必要ありません。

### Marketplace リポジトリを複製するか、integrations-extras リポジトリをフォークします

Datadog インテグレーションは、非公開の [Marketplace リポジトリ][10]またはオープンソースの [integrations-extras リポジトリ][11]のいずれか用に開発できます。

データインテグレーションを構築するプロセスは各リポジトリで同じですが、Marketplace 製品にはさらにいくつかのファイルとフィールド (価格設定など) が必要です。プルリクエストを送信するときは、目的のリポジトリを指すことを忘れないでください。

テクノロジーパートナーは、marketplace@datadog.com にメールを送信することにより、非公開の Marketplace リポジトリへのアクセスをリクエストできます。

### Datadog Development Toolkit をインストールして実行します

Datadog Development Toolkit コマンド (`ddev`) を使用すると、タイルのすべてのアセットとメタデータのスケルトンをスピンアップすることで、データインテグレーションを最初に開発するときにスキャフォールディングを作成できます。

[Python 3.8 以降][27]がインストールされていることを確認します。

潜在的な環境の競合を防ぐために、リポジトリを複製したディレクトリで次を実行して仮想環境を作成します。

```
python3 -m pip install virtualenv --user
```

次を実行して、[PyPI][28] から Datadog Development Toolkit の最新バージョンをインストールします。

```
python -m pip install --upgrade "datadog-checks-dev[cli]"
```

**注:** Z シェルを使用している場合は、エスケープ文字を使用する必要があります。

```
python -m pip install --upgrade datadog-checks-dev\[cli\]
``` 

次の場所を複製されたリポジトリに設定します。

#### マーケットプレイス

```
ddev config set marketplace /path/to/marketplace_directory
ddev config set repo marketplace
```

#### `integrations-extras`

```
ddev config set extras /path/to/integrations-extras_directory
ddev config set repo extras
```

#### タイルのみの出品

スタンドアロン SaaS ライセンス、Datadog アプリ、プロフェッショナルサービス、またはデータインテグレーションが Datadog API を使用し、Datadog Agent を使用しない場合、Development Toolkit はタイルのみのコマンドをサポートします。

上記で指定した `marketplace` または `integrations-extras` ディレクトリで以下を実行します。

```
ddev create -t tile -v2 "<Offering Name>"
```

#### 完全なデータインテグレーション

データインテグレーションの完全なスキャフォールディングを生成するには、上記で指定した `marketplace` または `integrations-extras` ディレクトリから以下を実行します。

```
ddev create -v2 "<Offering Name>"
```

### タイルスキャフォールディングにデータを入力します

前のセクションの ddev コマンドは、タイルアセットを構成するフォルダーとファイルのスケルトンを生成します。

#### README

* "Overview"、"Setup"、"Support" セクションを H2 見出し (マークダウンの ##) で含めます。
* “Overview" の見出しは、製品がユーザーに提供する価値と、より包括的な可観測性のために Datadog と一緒に使用する方法を明確に説明する必要があります。このセクションは、タイルの "Overview" タブに表示されます。
* "Setup" の見出しは、ユーザーが製品をインストールまたは使用するための簡単なコンフィギュレーション手順を提供する必要があります。このセクションは、タイルの "Configuration" タブに表示されます。
* "Support" の見出しは、サポートの連絡先を特定し、場合によっては製品のフィードバックを送信するオプションを特定する必要があります。このセクションは、タイルの "Support" タブに表示されます。

#### メディア

* `README.md` ファイルで使用されているすべての画像を `images` フォルダに保存します。
* マーケットプレイスリスティング、および[マニフェストバージョン 2 を使用するオファー][29]では、リスティングに動画を 1 つ追加できます。詳細については、[メディアカルーセルの要件](#media-carousel-requirements)を参照してください。
* **注:** 画像ファイル名にはスペースを含めないようにしてください。
* **注:** Marketplace に出品する場合は、`README.md` ファイルの "Overview" セクションに画像を載せないでください。代わりに、これらの画像を `manifest.json` ファイル内の `media` オブジェクトに追加することで、メディアカルーセルに配置する必要があります。

#### マニフェスト

* `display_name`、`public_title`、`author` などの要素を含む JSON オブジェクト。
* `manifest.json` フィールドの詳細については、[インテグレーションアセットリファレンス][30]を参照してください。
* 価格設定オブジェクトの詳細は、非公開の [Marketplace README][31] に記載されています。

#### メタデータ

* メトリクス名、タイプ、間隔、単位など、データインテグレーションに含まれるすぐに使用できるメトリクスのリストが含まれています。
* `metadata.csv` フィールドの詳細については、[インテグレーションアセットリファレンス][30]を参照してください。
* **注:** すべての Marketplace メトリクスは、カスタムメトリクスとしてカウントされます。

#### ダッシュボードとモニター

* データインテグレーション用のすぐに使用できるダッシュボードとモニター (アラート) が含まれています。
* サンドボックスアカウントでダッシュボードとモニターを直接作成し、JSON ファイルとしてエクスポートできます。
* 詳細については、[ダッシュボードのベストプラクティス][32]を参照してください。

#### ロゴ

* Datadog の DesignOps チームが Datadog サイト全体にライトモードとダークモードの両方で実装する SVG で構成されています。ロゴの SVG ファイルは `assets` ディレクトリに追加するか、`assets` 下の `logos` サブディレクトリに配置することができます。
* **注:** テクノロジーパートナーは、提出するロゴのライセンスに責任を負います。

#### 変更ログ

* リリースノートとバージョン情報をキャプチャし、タイルの "Release Notes" タブに表示します。リリースノートを降順で追加します (最新バージョンが上部)。

#### コードの所有者

* 共有された `.github` ディレクトリでリポジトリ内のコードに責任を持つ個人またはチームのことを指します。構文についてのヘルプは[コード所有者について][33]の Github のドキュメントを参照してください。

#### 追加の Marketplace ファイル
* すべての Marketplace 製品には、テクノロジーパートナー独自のエンドユーザー使用許諾契約 (EULA) が必要です。

#### メディアカルーセルの要件
このページのコマンドに従って `-v2` フラグを使用して出品を作成した場合、タイル上でメディアカルーセルにアクセスすることができるようになります。メディアカルーセルには、画像とビデオに関する特定の要件があります。

* タイルに 1 つのビデオを追加することができます。
  - ビデオを出品に追加するためには、以下の要件を満たす必要があります。
    - ファイルタイプ: MP4 H.264
    - ファイルサイズ: 最大 1 つのビデオ、最大 1 GB
    - ファイルの寸法: アスペクト比は正確に 16:9、解像度は 1920x1080 以上でなければならない
    - ファイル名: partnerName-appName.mp4
    - 再生時間: 60 秒以内を推奨
    - 説明文: 300 文字以内
  - プルリクエストにビデオをアップロードしないでください。代わりに、ビデオのコピー (またはダウンロードリンク) を marketplace@datadog.com に送信してください。当社のチームが `vimeo_link` を返信します。このリンクを manifest.json ファイルに追加すると、ビデオが出品に含まれるようになります。
* メディアカルーセルでは、タイル上に最大 8 枚 (ビデオを含む場合は 7 枚) の画像を表示できます。
  - メディアカルーセルに表示する画像は、以下の要件を満たす必要があります。
    - ファイルタイプ: .jpg または .png
    - ファイルサイズ: 1 画像あたり〜500 KB、最大 1 MB まで
    - ファイルの寸法: アスペクト比は最小 16:9 で、以下の制約があります。
      - 幅: 1440px
      - 最小高さ: 810px
      - 最大高さ: 2560px
    - ファイル名: 英字、数字、アンダースコア、ハイフンのみで表記
    - カラーモード: RGB
    - カラープロファイル: sRGB
    - 説明文: 300 文字以内

### プルリクエストを送信します

すべてのファイルを含むプルリクエストを [Marketplace リポジトリ][10]または [Integrations Extras リポジトリ][11]に送信します。

各リポジトリは自動テストを実行して、プルリクエストが良好な状態であることを確認します。コマンド `ddev validate all` を使用して、これらの同じテストをローカルで実行できます。PR がすべてのチェックに合格すると、Datadog Engineering チームがリリースするブロッカーの特定のためにレビューを行い、ベストプラクティスに関する提案を行います。

Marketplace リポジトリの Azure DevOps にアクセスする必要がある場合は、PR にコメントを残してアクセスをリクエストしてください。

### タイルのリリースを承認します

Datadog Engineering チームと Product チームがプルリクエストを承認すると、サンドボックスアカウントでタイルが有効になります。これにより、Datadog Marketplace でタイルを検証および表示し、公開前に変更を加えることができます。

## 市場開拓の機会を調整する

Marketplace タイルが公開されたら、テクノロジーパートナーは、Datadog のパートナーマーケティングチームと会って、次のような共同の市場開拓戦略を調整することができます。

* パートナーのプレスリリースの Datadog 見積もり
* [Datadog モニター][34]内のブログ記事
* ソーシャルメディア投稿の増幅

## お問い合わせ

ご不明な点がございましたら、techpartners@datadoghq.com までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/partner/
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/marketplace
[4]: https://partners.datadoghq.com/English/
[5]: /ja/help/
[6]: /ja/account_management/org_switching/
[7]: /ja/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/course/view.php?id=38
[9]: https://learn.datadoghq.com/
[10]: https://github.com/DataDog/marketplace
[11]: https://github.com/DataDog/integrations-extras
[12]: /ja/developers/datadog_apps
[13]: https://chat.datadoghq.com/
[14]: /ja/developers/integrations/
[15]: /ja/developers/custom_checks/prometheus/
[16]: /ja/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[17]: /ja/developers/dogstatsd/?tab=hostagent
[18]: /ja/api/latest/
[19]: https://app.datadoghq.com/apps
[20]: /ja/api/latest/metrics/
[21]: /ja/api/latest/logs/
[22]: /ja/api/latest/events/
[23]: /ja/api/latest/service-checks/
[24]: /ja/api/latest/tracing/
[25]: /ja/api/latest/incidents/
[26]: /ja/api/latest/security-monitoring/
[27]: https://www.python.org/downloads/
[28]: https://pypi.org/project/datadog-checks-dev/
[29]: /ja/developers/integrations/check_references/?tab=manifestversion2#manifest-file
[30]: /ja/developers/integrations/check_references/#manifest-file
[31]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[32]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[33]: https://help.github.com/articles/about-codeowners/
[34]: https://www.datadoghq.com/blog/