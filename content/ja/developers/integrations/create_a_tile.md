---
aliases:
- /developers/marketplace/offering
description: Learn how to develop and publish an integration tile.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-marketplace/"
  tag: Blog
  text: Expand your monitoring reach with the Datadog Marketplace
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Create an offering on the Datadog Marketplace
title: Create a Tile
type: documentation
---
## Overview

This page walks Technology Partners through creating the tile that represents an offering that will appear on the **Integrations** or **Marketplace** page.

## Integration tiles

The tile serves as a point of entry where customers can learn about your offering, see setup instructions, and install or purchase your offering to unlock out-of-the-box dashboards and additional assets.

{{< img src="developers/integrations/marketplace_or_integrations_tile.png" alt="An expanded tile modal of an example offering on the Integrations or Marketplace page" style="width:100%" >}}

* For any offerings that **do not use** the Datadog Agent—including API-based integrations, professional services listings, and software licenses—you only need to create a tile and submit the tile-related files in order to publish your offering. This is called a _tile-only-listing_. Tile-ony listings apply in situations where Datadog does not host any of the code associated with the API-based integrations, and the other supported offering types do not require any code.

* For **Agent-based integrations**, you must create a tile, and additionally, submit all of your integration-related code (as well as your tile-related files) in one pull request. For more information, see [Create an Agent-based integration][27].

<div class="alert alert-info">Select a tab for instructions on creating a tile on the Integrations or Marketplace page.</div>

{{< tabs >}}

{{% tab "Build a tile on the Integrations page" %}}

{{< img src="developers/integrations/integration_tile.png" alt="A tile representing an example offering on the Integrations page" style="width:25%" >}}

To build a tile on the [**Integrations** page][103]:

<div class="alert alert-warning">If you have already gone through the steps to create an Agent integration and have built out the scaffolding, you can skip directly to <a href="#complete-the-necessary-integration-asset-files">completing the necessary integration asset files</a>.
</div>

1. Create a `dd` directory:

   ```shell
   mkdir $HOME/dd
   ```

   The Datadog Development Toolkit expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

2. Fork the [`integrations-extras` repository][102].
3. Clone the `integrations-extras` repository:

   ```shell
   git clone git@github.com:DataDog/integrations-extras.git
   ```

## Install and configure the Datadog development toolkit

The Agent Integration Developer Tool allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata. For instructions on installing the tool, see [Install the Datadog Agent Integration Developer Tool][101].

Once you have installed the Agent Integration Developer Tool, configure it for the `integrations-extras` repository.

Set `integrations-extras` as the default working repository:

```shell
ddev config set extras $HOME/dd/integrations-extras
ddev config set repo extras
```

If you used a directory other than `$HOME/dd` to clone the `integrations-extras` directory, use the following command to set your working repository:

```shell
ddev config set extras <PATH/TO/INTEGRATIONS_EXTRAS>
ddev config set repo extras
```

## Populate the integration tile scaffolding

For Datadog API integrations that will be available out-of-the-box on the [Integrations page][102], use the Datadog Development Toolkit to create scaffolding for a tile-only listing.

1. Make sure you're inside the `integrations-extras` directory:

   ```shell
   cd $HOME/dd/integrations-extras
   ```

1. Run the `ddev` command with the `-t tile` option:

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://docs.datadoghq.com/developers/integrations/python
[102]: https://github.com/Datadog/integrations-extras
[103]: https://app.datadoghq.com/integrations

{{% /tab %}}

{{% tab "Build a tile on the Marketplace" %}}

{{< img src="developers/integrations/marketplace_tile.png" alt="A tile representing an example offering on the Marketplace page" style="width:25%" >}}

To build a tile on the [**Marketplace** page][104]:

<div class="alert alert-warning">If you have already gone through the steps to create an Agent integration and have built out the scaffolding, you can skip directly to <a href="#complete-the-necessary-integration-asset-files">completing the necessary integration asset files</a>.
</div>

1. See [Build a Marketplace Offering][102] to request access to the [Marketplace repository][101].

1. Create a `dd` directory:

   ```shell
   mkdir $HOME/dd
   ```

   The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

1. Once you have been granted access to the Marketplace repository, create the `dd` directory and clone the `marketplace` repository:

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

1. Create a feature branch to work in:

    ```shell
    git switch -c <YOUR INTEGRATION NAME> origin/master
    ```

## Install and configure the Datadog development toolkit

The Agent Integration Developer Tool allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata. For instructions on installing the tool, see [Install the Datadog Agent Integration Developer Tool][103].

Once you have installed the Agent Integration Developer Tool, configure it for the `marketplace` repository:

Set `marketplace` as the default working repository:

```shell
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

If you used a directory other than `$HOME/dd` to clone the `marketplace` directory, use the following command to set your working repository:

```shell
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## Populate the integration tile scaffolding

Use the Datadog Development Toolkit to create scaffolding for a tile-only listing.

To create the tile-only listing's scaffolding:

1. Make sure you're inside the `marketplace` directory:

   ```shell
   cd $HOME/dd/marketplace
   ```

2. Run the `ddev` command with the `-t tile` option:

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/developers/integrations/python
[104]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

## Complete the necessary integration asset files

Make sure that the following required assets for your integration are complete:

{{% integration-assets %}}

### README

Once you have created a `README.md` file, add the following sections as H2s (`##`) and fill out the content accordingly:

| Header Name | Header |
|-------------|--------|
| Overview | Write a description under an `## Overview` header that describes the value and benefits your offering provides to users, for example, out-of-the-box dashboards, replays of user sessions, logs, alerts, and more. <br><br>This information is displayed in the **Overview** tab on the tile. |
| Setup | Include all the steps required to set up your offering that includes information divided into H3 headings (`###`).<br>Standard topics include:<br><br>- Installing the integration using the in-app integration tile. <br>- Configuring the integration with the appropriate roles and permissions in your Datadog organization.<br>- Accessing out-of-the-box Datadog features that users who purchased and installed the integration can access (such as metrics, events, monitors, logs, dashboards, and more).|
| Uninstallation | Include all the steps for uninstalling your offering. This information is displayed in the **Configure** tab on the tile.|
| Data Collected  | Specify the types of data collected by your integration (if applicable), including metrics, events, service checks, and logs. Metrics added to the `metadata.csv` file automatically appear in this tab. <br><br> If your offering does not provide any of this data, you do not need to add a Data Collected section. |
| Support | Provide contact information that includes an email to your Support team, a link to your company's documentation or blog post, and additional help information in a bulleted list format. |

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
[2]: https://docs.datadoghq.com/developers/custom_checks/prometheus/
[3]: https://docs.datadoghq.com/developers/integrations/agent_integration/#write-the-check
[4]: https://docs.datadoghq.com/developers/dogstatsd/
[5]: https://docs.datadoghq.com/api/latest/metrics/
[6]: https://docs.datadoghq.com/logs/faq/partner_log_integration/
[7]: https://docs.datadoghq.com/api/latest/events/
[8]: https://docs.datadoghq.com/api/latest/service-checks/
[9]: https://docs.datadoghq.com/tracing/guide/send_traces_to_agent_by_api/
[10]: https://docs.datadoghq.com/api/latest/incidents/
[11]: https://docs.datadoghq.com/api/latest/security-monitoring/
[12]: https://docs.datadoghq.com/developers/integrations/
[13]: https://docs.datadoghq.com/developers/#creating-your-own-solution
[14]: https://docs.datadoghq.com/api/latest/
[15]: https://docs.datadoghq.com/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/developers/datadog_apps/
[17]: https://app.datadoghq.com/apps/
[18]: https://github.com/Datadog/marketplace
[19]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/#request-access-to-marketplace
[20]: https://www.python.org/downloads/
[21]: https://pypi.org/project/datadog-checks-dev/
[22]: https://docs.datadoghq.com/developers/integrations/check_references/#manifest-file
[23]: https://datadoghq.com/blog/
[24]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[25]: https://docs.datadoghq.com/developers/integrations/python
[26]: https://github.com/Datadog/integrations-extras
[27]: https://docs.datadoghq.com/developers/integrations/agent_integration/
[28]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/
[29]: https://github.com/
[30]: https://www.markdownguide.org/basic-syntax/#reference-style-links
[31]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
