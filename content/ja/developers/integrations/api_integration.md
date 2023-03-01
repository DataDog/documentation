---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/api_integration.md
title: API インテグレーションの作成
type: documentation
---
## 概要

[Datadog API エンドポイント][1]を使用して、バックエンドからデータをリッチ化して送信したり、Datadog から直接データを取り出したりすることができます。API インテグレーションは、Datadog と他の SaaS プラットフォーム間のコネクターを構築する際に効果的です。この方法は、SaaS ベースで、作成者が認可のためにログインするための既存の Web サイトを持っている技術パートナーに最適です。

API インテグレーションは、以下の種類のデータを Datadog に送信します。

- [メトリクス][2]
- [ログとログパイプライン][3]
- [イベント][4]
- [サービスチェック][5]
- [トレース][6]
- [インシデント][7]
- [セキュリティイベント][8]

このページでは、`integrations-extras` リポジトリで API インテグレーションを作成するための手順を説明します。API ベースのインテグレーションを作成する理由については、[独自のソリューションを作成する][9]を参照してください。API インテグレーションは、Datadog Agent を使用してデータを収集しないため、開発作業が完了したら、情報用のタイルのみのリストを作成する必要があります。

## セットアップ

### 前提条件

- [API キー][10]と[アプリケーションキー][11]が必要です。
- 利用する [Datadog サイト][12]を決定します。

API キーは、Datadog の API エンドポイントにデータを送信するために必要です。アプリケーションキーは、Datadog からデータをクエリしたり、Datadog サイト内でリソースを作成するために必要です。詳しくは、[API とアプリケーションキー][13]を参照してください。

API キー、アプリケーションキー、サイト URL を使用して、自社のプラットフォームで Datadog への接続を作成します。

### OAuth クライアントを作成する
Datadog では、これらの資格情報をユーザーに直接リクエストする代わりに、[OAuth クライアント][14]を使用して、API ベースの統合のための認可とアクセスを処理することを推奨しています。詳細については、[インテグレーションのための OAuth][15] と[認可エンドポイント][16]を参照してください。

[Vantage][17] のような `integrations-extras` リポジトリで、既存の API インテグレーションの例を調べることができます。

## ディレクトリを設定し、`integrations-extras` リポジトリをフォークします。


1. `dd` ディレクトリを作成します。

   {{< code-block lang="shell" >}}mkdir $HOME/dd{{< /code-block >}}

   Datadog Development Toolkit は、`$HOME/dd/` ディレクトリで作業していることを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

2. `integrations-extras` リポジトリを複製します。

   {{< code-block lang="shell" >}}git clone git@github.com:DataDog/integrations-extras.git{{< /code-block >}}

## Datadog Development Toolkit をインストールして構成する

Datadog Development Toolkit (`ddev`) を使用すると、インテグレーションに必要なディレクトリ構造、アセット、メタデータを生成することができます。

始める前に、以下の前提条件を満たしていることを確認してください。

- [Python v3.8 以降][18]
- 環境の競合を避けるために、Python の仮想環境を使用することをお勧めします。以下の説明では、ほとんどの OS で Python v3.3 以降に同梱されている `venv` を使用します。

Development Toolkit をインストールして構成します。

1. `integrations-extras` ディレクトリの中にいることを確認します。
   {{< code-block lang="shell" >}}cd $HOME/dd/integrations-extras{{< /code-block >}}

2. Python の仮想環境を構築します。
   {{< code-block lang="shell" >}}
   python3 -m venv venv
   . venv/bin/activate{{< /code-block >}}

   仮想環境は `deactivate` を実行することでいつでも終了させることができます。

3. [Developer Toolkit][19] をインストールします。
   {{< code-block lang="shell" >}}pip3 install "datadog-checks-dev[cli]"{{< /code-block >}}

   Z Shell を使用している場合は、`pip3 install datadog-checks-dev\[cli\]` を実行して、エスケープされた文字を使用する必要があるかもしれません。

4. デフォルトの作業用リポジトリとして `integrations-extras` を設定します。
   {{< code-block lang="shell" >}}
   ddev config set integrations-extras $HOME/dd/integrations-extras
   ddev config set repo integrations-extras{{< /code-block >}}

   `integrations-extras` ディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

   {{< code-block lang="shell" >}}
   ddev config set integrations-extras <PATH/TO/INTEGRATIONS-EXTRAS>
   ddev config set repo integrations-extras{{< /code-block >}}

## インテグレーションタイルスキャフォールディングにデータを入力する

`dev` コマンドを実行して、情報タイルのみの出品のためのスキャフォールディングを作成します。

1. `integrations-extras` ディレクトリの中にいることを確認します。
   {{< code-block lang="shell" >}}cd $HOME/dd/integrations-extras{{< /code-block >}}
2. `-t tile` オプションを付けて `ddev` コマンドを実行します
   {{< code-block lang="shell" >}}ddev create -t tile "<Offering Name>"{{< /code-block >}}

`ddev` コマンドで使用するオプションは、開発しているインテグレーションの種類によって異なります。`ddev` コマンドで作成されるファイルの一覧は、[インテグレーションアセット][20]を参照してください。

## 必要なインテグレーションアセットファイルを完成させる

インテグレーションに必要な以下のアセットが揃っていることを確認してください。

### README

`README.md` ファイルを作成したら、以下のセクションを H2s (`##`) として追加し、インテグレーションのタイルに表示される内容を記入します。

| ヘッダー名 | ヘッダー |
|-------------|--------|
| 概要 | API インテグレーションを購入しインストールすることで、ユーザーに提供する価値やメリット (例えば、すぐに使えるダッシュボード、ログ、アラートなど) を `## Overview` ヘッダーの下に説明文を記述してください。<br><br>この情報は、インテグレーションタイルの **Overview** タブに表示されます。 |
| セットアップ | H3 の見出し (`###`) に分けられた情報を含む、API インテグレーションを設定するためのすべてのステップを含みます。標準的なトピックは以下の通りです。<br><br>- アプリ内インテグレーションタイルを使用してインテグレーションをインストールする。 <br>- Datadog の組織で適切なロールと権限でインテグレーションを構成する。|
| アンインストール | API インテグレーションをアンインストールするためのすべてのステップを含めます。この情報は、インテグレーションタイルの **Configure** タブに表示されます。|
| 収集データ  | すぐに使えるメトリクス、イベント、またはサービスチェックに関する情報を含む、API インテグレーションによって収集されるデータの種類を指定します。<br><br>ログ、モニター、ダッシュボードなど、その他の収集データの種類を含めることができます。API インテグレーションがこれらのいずれかを提供しない場合、Data Collected セクションを追加する必要はありません。 |
| サポート | サポートチームへのメール、自社への電話番号、自社のドキュメントやブログ記事へのリンク、その他のヘルプ情報などを含む連絡先情報を箇条書きで掲載します。 |

### メディアカルーセル

インテグレーションタイルには、画像とビデオのメディアカルーセルが含まれます。

テクノロジーパートナーは、インテグレーションタイルにビデオを追加することができます。プルリクエストでビデオをアップロードしないでください。代わりに、ビデオのコピーまたはダウンロードリンクを <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a> に送信してください。マーケットプレイスチームは `vimeo_link` を返信します。このリンクを `manifest.json` ファイルに追加すると、メディアカルーセルの中にビデオを含めることができます。

ビデオは以下の要件を満たしている必要があります。

| ビデオ要件 | 説明                                                                           |
|--------------------|---------------------------------------------------------------------------------------|
| タイプ               | MP4 H.264                                                                             |
| サイズ               | ビデオサイズは最大 1GB です。                                                        |
| ディメンション         | アスペクト比は正確に 16:9、解像度は 1920x1080 以上でなければなりません。 |
| 名前               | ビデオファイル名は、`partnerName-appName.mp4` でなければなりません。                                |
| ビデオの長さ       | ビデオの長さは最大 60 秒です。                                               |
| 説明        | 最大許容文字数は 300 文字です。                                      |

テクノロジーパートナーは、インテグレーションタイルのメディアカルーセルに最大 8 枚 (ビデオを含む場合は 7 枚) の画像を追加することができます。

イメージは以下の要件を満たしている必要があります。

| イメージ要件 | 説明                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| タイプ               | `.jpg` または `.png`。                                                                                                                                 |
| サイズ               | 平均は 500KB 程度です。最大イメージサイズは 1MB です。                                                                                       |
| ディメンション         | アスペクト比は正確に 16:9 で、以下の仕様に適合している必要があります。<br><br>- 幅: 1440px<br>- 最低高さ: 810px<br>- 最大高さ: 2560px |
| 名前               | 英字、数字、アンダースコア、ハイフンを使用してください。スペースは使用しないでください。                                                                           |
| カラーモード         | RGB                                                                                                                                               |
| カラープロファイル      | sRGB                                                                                                                                              |
| 説明        | 最大許容文字数は 300 文字です。                                                                                                  |

このテンプレートに従って、イメージ、ビデオサムネイル、ビデオを含むメディアカルーセルの `media` オブジェクトを定義してください。

{{< code-block lang="json" filename="manifest.json" collapsible="true" >}}
"media": [
      {
        "media_type": "image",
        "caption": "A Datadog API Integration OOTB Dashboard",
        "image_url": "images/integration_name_image_name.png"
      },
      {
        "media_type": "video",
        "caption": "A Datadog API Integration Overview Video",
        "image_url": "images/integration_name_video_thumbnail.png",
        "vimeo_id": 123456789
      },
    ],
{{< /code-block >}}

詳しくは、[インテグレーションアセットリファレンス][20]をご覧ください。

## プルリクエストを開く

[`integrations-extras` リポジトリ][21]で、画像 (ロゴやイメージなど) とアセットファイル (`Changelog.md`、`README.md`、`manifest.json` など) を追加し、[インテグレーションページ][22]で API インテグレーションのタイルのみの出品に追加するプルリクエストを開きます。自動テストは、プルリクエストが適切な状態にあり、更新に必要なすべてのコンテンツが含まれていることを確認するためにチェックを実行します。

## レビュープロセス

プルリクエストが全てのチェックを通過すると、`Datadog/agent-integrations`、`Datadog/marketplace`、`Datadog/documentation` チームのレビュアーが、ベストプラクティスに関する提案やフィードバックを提供します。

フィードバックに対応し、レビューを再要求すると、これらのレビュアーがプルリクエストを承認します。


## {{< partial name="whats-next/whats-next.html" >}}

お役に立つドキュメント、リンクや記事:

- [Datadog API の使用][1]
- [インテグレーションのための OAuth][14]

[1]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ja/api/latest/metrics/
[3]: https://docs.datadoghq.com/ja/logs/faq/partner_log_integration/
[4]: https://docs.datadoghq.com/ja/api/latest/events/
[5]: https://docs.datadoghq.com/ja/api/latest/service-checks/
[6]: https://docs.datadoghq.com/ja/tracing/guide/send_traces_to_agent_by_api/
[7]: https://docs.datadoghq.com/ja/api/latest/incidents/
[8]: https://docs.datadoghq.com/ja/api/latest/security-monitoring/
[9]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[12]: https://docs.datadoghq.com/ja/getting_started/site
[13]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[14]: https://docs.datadoghq.com/ja/developers/authorization/
[15]: https://docs.datadoghq.com/ja/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ja/developers/authorization/oauth2_endpoints/
[17]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[18]: https://www.python.org/downloads/
[19]: https://pypi.org/project/datadog-checks-dev/
[20]: https://docs.datadoghq.com/ja/developers/integrations/check_references/#manifest-file
[21]: https://github.com/DataDog/integrations-extras/
[22]: https://app.datadoghq.com/integrations