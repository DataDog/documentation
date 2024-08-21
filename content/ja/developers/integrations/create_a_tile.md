---
aliases:
- /ja/developers/marketplace/offering
description: インテグレーションタイルの開発・公開方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: ブログ
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Datadog Marketplace で製品を作成する
title: タイルの作成
type: documentation
---
## 概要

このページでは、**Integrations** または **Marketplace** ページに表示される製品を代表するタイルの作成について、テクノロジーパートナーに説明します。

## インテグレーションタイル

The tile serves as a point of entry where customers can learn about your offering, see setup instructions, and install or purchase your offering to unlock out-of-the-box dashboards and additional assets.

{{< img src="developers/integrations/marketplace_or_integrations_tile.png" alt="Integrations や Marketplace ページで、サンプル製品の拡張タイルモーダル" style="width:100%" >}}

* For any offerings that **do not use** the Datadog Agent—including API-based integrations, professional services listings, and software licenses—you only need to create a tile and submit the tile-related files in order to publish your offering. This is called a _tile-only-listing_. Tile-ony listings apply in situations where Datadog does not host any of the code associated with the API-based integrations, and the other supported offering types do not require any code.

* **Agent ベースのインテグレーション**の場合、タイルを作成し、さらに、インテグレーションに関連するすべてのコード (およびタイル関連ファイル) を 1 つのプルリクエストで送信する必要があります。詳しくは、[Agent ベースのインテグレーションを作成する][27]をご覧ください。

<div class="alert alert-info">Integrations または Marketplace ページでタイルを作成する手順については、タブを選択します。</div>

{{< tabs >}}

{{% tab "Integrations ページでタイルを構築する" %}}

{{< img src="developers/integrations/integration_tile.png" alt="Integrations ページに表示される製品の例を表すタイル" style="width:25%" >}}

[**Integrations** ページ][103]にタイルを構築するには

<div class="alert alert-warning">If you have already gone through the steps to create an Agent integration and have built out the scaffolding, you can skip directly to <a href="#complete-the-necessary-integration-asset-files">completing the necessary integration asset files</a>.
</div>

1. `dd` ディレクトリを作成します。

   ```shell
   mkdir $HOME/dd
   ```

   Datadog Development Toolkit は、`$HOME/dd/` ディレクトリで作業していることを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

2. [`integrations-extras` リポジトリ][102]をフォークします。
3. `integrations-extras` リポジトリを複製します。

   ```shell
   git clone git@github.com:DataDog/integrations-extras.git
   ```

## Datadog Development Toolkit をインストールして構成する

Agent Integration Developer Tool を使用すると、インテグレーションを開発する際に、インテグレーションタイルのアセットとメタデータのスケルトンを生成して、スキャフォールディングを作成することができます。ツールのインストール方法については、[Datadog Agent Integration Developer Tool をインストールする][101]を参照してください。

Agent Integration Developer Tool をインストールしたら、`integrations-extras` リポジトリ用に構成します。

デフォルトの作業用リポジトリとして `integrations-extras` を設定します。

```shell
ddev config set extras $HOME/dd/integrations-extras
ddev config set repo extras
```

`integrations-extras` ディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

```shell
ddev config set extras <PATH/TO/INTEGRATIONS_EXTRAS>
ddev config set repo extras
```

## インテグレーションタイルスキャフォールディングにデータを入力する

[Integrations ページ][102]ですぐに使えるようになる Datadog API インテグレーションについては、Datadog Development Toolkit を使用して、タイルのみの出品でスキャフォールディングを作成します。

1. `integrations-extras` ディレクトリの中にいることを確認します。

   ```shell
   cd $HOME/dd/integrations-extras
   ```

1. `-t tile` オプションを付けて `ddev` コマンドを実行します。

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://docs.datadoghq.com/ja/developers/integrations/python
[102]: https://github.com/Datadog/integrations-extras
[103]: https://app.datadoghq.com/integrations

{{% /tab %}}

{{% tab "Marketplace でタイルを構築する" %}}

{{< img src="developers/integrations/marketplace_tile.png" alt="Marketplace ページに表示される製品の例を表すタイル" style="width:25%" >}}

To build a tile on the [**Marketplace** page][104]:

<div class="alert alert-warning">If you have already gone through the steps to create an Agent integration and have built out the scaffolding, you can skip directly to <a href="#complete-the-necessary-integration-asset-files">completing the necessary integration asset files</a>.
</div>

1. [Marketplace リポジトリ][101]へのアクセスリクエストは、[Marketplace 製品の構築][102]を参照してください。

1. `dd` ディレクトリを作成します。

   ```shell
   mkdir $HOME/dd
   ```

   Datadog Development Toolkit コマンドは、`$HOME/dd/` ディレクトリで作業していることを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。

1. マーケットプレイスのリポジトリへのアクセスが許可されたら、`dd` ディレクトリを作成し、`marketplace` リポジトリを複製します。

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

1. 作業するフィーチャーブランチを作成します。

    ```shell
    git switch -c <YOUR INTEGRATION NAME> origin/master
    ```

## Datadog Development Toolkit をインストールして構成する

Agent Integration Developer Tool を使用すると、インテグレーションを開発する際に、インテグレーションタイルのアセットとメタデータのスケルトンを生成して、スキャフォールディングを作成することができます。ツールのインストール方法については、[Datadog Agent Integration Developer Tool をインストールする][103]を参照してください。

Agent Integration Developer Tool をインストールしたら、`marketplace` リポジトリ用に構成します。

デフォルトの作業用リポジトリとして `marketplace` を設定します。

```shell
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

`marketplace` ディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

```shell
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## インテグレーションタイルスキャフォールディングにデータを入力する

Datadog Development Toolkit を使用して、タイルのみの出品でスキャフォールディングを作成します。

タイルのみの出品のスキャフォールディングを作成するには

1. `marketplace` ディレクトリの中にいることを確認します。

   ```shell
   cd $HOME/dd/marketplace
   ```

2. `-t tile` オプションを付けて `ddev` コマンドを実行します。

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/ja/developers/integrations/python
[104]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

## 必要なインテグレーションアセットファイルを完成させる

インテグレーションに必要な以下のアセットが揃っていることを確認してください。

{{% integration-assets %}}

### README

`README.md` ファイルを作成したら、以下のセクションを H2s (`##`) として追加し、内容を適宜記入します。

| ヘッダー名 | ヘッダー |
|-------------|--------|
| 概要 | ユーザーに提供する価値やメリット (例えば、すぐに使えるダッシュボード、ユーザーセッションのリプレイ、ログ、アラートなど) を `## Overview` ヘッダーの下に説明文を記述してください。<br><br>この情報は、タイルの **Overview** タブに表示されます。 |
| セットアップ | H3 の見出し (`###`) に分けられた情報を含む、製品を設定するために必要なすべてのステップを含みます。<br>標準的なトピックは以下の通りです。<br><br>- アプリ内インテグレーションタイルを使用してインテグレーションをインストールする。 <br>- Datadog の組織で適切なロールと権限でインテグレーションを構成する。<br>- インテグレーションを購入しインストールしたユーザーがアクセスできる、すぐに使える Datadog の機能 (メトリクス、イベント、モニター、ログ、ダッシュボードなど) にアクセスする。|
| アンインストール | 製品をアンインストールするためのすべてのステップを含めます。この情報は、タイルの **Configure** タブに表示されます。|
| 収集データ  | メトリクス、イベント、サービスチェック、ログなど、インテグレーションによって収集されるデータのデータタイプを指定します (該当する場合)。`metadata.csv` ファイルに追加されたメトリクスは、自動的にこのタブに表示されます。 <br><br> 製品がこのようなデータを提供しない場合は、Data Collected セクションを追加する必要はありません。 |
| サポート | サポートチームへのメール、自社のドキュメントやブログ記事へのリンク、その他のヘルプ情報などを含む連絡先情報を箇条書きで掲載します。 |

When adding links to the `README.md` file, format them using [reference-style links][30]. For example, instead of embedding the URL directly in the text, write `see the [official Datadog documentation][1]` and define the link reference at the bottom of the file like `[1]: https://docs.datadoghq.com/`.

For additional grammar and style advice, see also the [Datadog documentation contributors guidelines][31].
### メディアカルーセル

各タイルには、イメージとビデオのメディアカルーセルが表示され、ユーザーは視覚的な説明によって、製品の機能や価値をよりよく理解することができます。タイルにビデオを追加するには、ビデオのコピーまたはダウンロードリンクを <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a> に送信してください。Marketplace チームがビデオをアップロードし、`manifest.json` ファイルに追加すべき `vimeo_link` を提供します。

#### ビデオ

ビデオは以下の要件を満たしている必要があります。

| ビデオ要件 | 説明                                                                           |
|--------------------|---------------------------------------------------------------------------------------|
| タイプ               | MP4 H.264                                                                             |
| サイズ               | ビデオサイズは最大 1GB です。                                                        |
| ディメンション         | アスペクト比は正確に 16:9、解像度は 1920x1080 以上でなければなりません。 |
| 名前               | ビデオファイル名は、`partnerName-appName.mp4` でなければなりません。                                |
| ビデオの長さ       | ビデオの長さは最大 60 秒です。                                               |
| 説明        | 最大許容文字数は 300 文字です。                                      |

#### 画像

テクノロジーパートナーは、タイルのメディアカルーセルに最大 8 枚 (ビデオを含む場合は 7 枚) の画像を追加することができます。

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

このテンプレートに従って、イメージ、ビデオサムネイル、ビデオを含む `manifest.json` ファイルの `media` オブジェクトを定義してください。

{{< code-block lang="json" filename="manifest.json" collapsible="true" >}}
"media": [
      {
        "media_type": "image",
        "caption": "A Datadog Marketplace Integration OOTB Dashboard",
        "image_url": "images/integration_name_image_name.png"
      },
      {
        "media_type": "video",
        "caption": "A Datadog Marketplace Integration Overview Video",
        "image_url": "images/integration_name_video_thumbnail.png",
        "vimeo_id": 123456789
      },
    ],
{{< /code-block >}}

詳しくは、[インテグレーションアセットリファレンス][22]をご覧ください。

## プルリクエストを開く

プルリクエストを出す前に、以下のコマンドを実行して、インテグレーションに問題がないことを確認します。

```
ddev validate all <INTEGRATION_NAME>
```

以下のステップを完了します。

1. すべての変更をフィーチャーブランチにコミットします。
2. Push your changes to the remote repository.
3. Open a pull request that contains your integration tile's asset files (including images) in the [`marketplace`][18] or [`integrations-extras`][26] repository.

プルリクエストを作成すると、自動チェックが実行され、プルリクエストが正常な状態であること、更新に必要なコンテンツがすべて含まれていることが確認されます。

## レビュープロセス

プルリクエストが全てのチェックを通過すると、`Datadog/agent-integrations`、`Datadog/ecosystems-review`、`Datadog/documentation` チームのレビュアーが、ベストプラクティスに関する提案やフィードバックを提供します。

フィードバックに対応し、レビューを再要求すると、これらのレビュアーがあなたのプルリクエストを承認します。サンドボックスアカウントでタイルをプレビューしたい場合は、マーケットプレイスチームに連絡してください。これにより、タイルがすべての顧客に公開される前に、タイルの検証やプレビューを行うことができます。

## エラーの解決

Out-of-the-box integrations in the `integrations-extras` repository can run into validation errors when the forked repository is out of date with the origin.

To resolve validation errors, update the forked repository on the GitHub web app:

1. [GitHub][29] で、フォークした `integrations-extras` リポジトリに移動します。
1. **Sync fork** をクリックし、**Update branch** をクリックします。

リベースして変更をプッシュするには

1. ローカルの `master` ブランチを更新します。
   ```shell
   git checkout master
   git pull origin master
   ```
1. `master` をフィーチャーブランチにマージします。
   ```shell
   git checkout <your working branch>
   git merge master
   ```
1. もし、マージの競合があれば、それを解決します。その後`git push origin <your working branch>` を実行します。

## 市場開拓 (GTM) の機会

Datadog では、Marketplace の出品にのみ GTM サポートを提供しています。Datadog Marketplace の詳細については、[Marketplace 製品の作成][28]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[2]: https://docs.datadoghq.com/ja/developers/custom_checks/prometheus/
[3]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration/#write-the-check
[4]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[5]: https://docs.datadoghq.com/ja/api/latest/metrics/
[6]: https://docs.datadoghq.com/ja/logs/faq/partner_log_integration/
[7]: https://docs.datadoghq.com/ja/api/latest/events/
[8]: https://docs.datadoghq.com/ja/api/latest/service-checks/
[9]: https://docs.datadoghq.com/ja/tracing/guide/send_traces_to_agent_by_api/
[10]: https://docs.datadoghq.com/ja/api/latest/incidents/
[11]: https://docs.datadoghq.com/ja/api/latest/security-monitoring/
[12]: https://docs.datadoghq.com/ja/developers/integrations/
[13]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[14]: https://docs.datadoghq.com/ja/api/latest/
[15]: https://docs.datadoghq.com/ja/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ja/developers/datadog_apps/
[17]: https://app.datadoghq.com/apps/
[18]: https://github.com/Datadog/marketplace
[19]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering/#request-access-to-marketplace
[20]: https://www.python.org/downloads/
[21]: https://pypi.org/project/datadog-checks-dev/
[22]: https://docs.datadoghq.com/ja/developers/integrations/check_references/#manifest-file
[23]: https://datadoghq.com/blog/
[24]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[25]: https://docs.datadoghq.com/ja/developers/integrations/python
[26]: https://github.com/Datadog/integrations-extras
[27]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration/
[28]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering/
[29]: https://github.com/
[30]: https://www.markdownguide.org/basic-syntax/#reference-style-links
[31]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md