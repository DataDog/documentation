---
description: Datadog マーケットプレイスで製品開発を行い、公開する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: パートナーネットワーク
  text: Datadog パートナーネットワーク
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: GitHub
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/marketplace/
  tag: ドキュメント
  text: Datadog マーケットプレイスについて
title: マーケットプレイス製品の開発
type: documentation
---

## 概要

このページでは、Datadog マーケットプレイスで製品開発を行う方法について説明します。ご質問がある場合は、<a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a> までご連絡ください。

## 開発プロセス

マーケットプレイスタイルを開発するには、以下の手順で行います。

1. [掲載する製品の種類を選択します](#select-an-offering)。
2. [マーケットプレイスのリポジトリにアクセスし、ディレクトリを設定します](#set-up-a-directory and-clone-the-marketplace-repository)。
3. [Datadog Development Toolkit をインストールし、構成します](#install-and-configure-the-datadog-development-toolkit)。
4. [インテグレーションタイルのスキャフォールディングを入力します](#populate-the-integration-tile-scaffolding)。
5. [必要なインテグレーションアセットファイルを完成させます](#complete-the-necessary-integration-asset-files)。
6. [プルリクエストを開きます](#open-a-pull-request)。
7. [フィードバックを確認し、プルリクエストをマージしてインテグレーションタイルをリリースするための承認をリクエストします](#review-process)。
8. [パートナーマーケティングとの市場参入機会を調整します](#coordinate-gtm-opportunities)。

## 製品選択

マーケットプレイスの標準的なインテグレーションタイルが以下のフォーマットで表示されます。

{{< img src="developers/marketplace/marketplace-tile-example.png" alt="マーケットプレイスのタイルの例" style="width:30%" >}}

[Datadog マーケットプレイス][1]に掲載するインテグレーションタイルを作成するために、以下の製品タイプから選択します。

- [Datadog Agent ベースのインテグレーション](#agent-based-integrations)
- [REST API インテグレーション](#rest-api-integrations)
- [Datadog アプリ](#datadog-apps)
- [SaaS ライセンスまたはサブスクリプション](#saas-license-or-professional-service-offerings)
- [プロフェッショナルサービス](#saas-license-or-professional-service-offerings)

### Agent ベースのインテグレーション

Agent ベースのインテグレーションは、Datadog Agent を使用してデータを収集し、Agent チェックを中心に構築されます。チェックの種類は 3 つあります。

- [OpenMetrics チェック][2]は、OpenMetrics 標準を使用してメトリクスを公開する既存のアプリケーションからテレメトリデータを収集するのに適しています。
- [Python チェック][3]は、標準形式でメトリクスを公開しないサービスまたは製品の監視に適しています。Python チェックは、さまざまな API またはコマンドラインツールからテレメトリデータを収集するためにも使用できます。
- [DogStatsD][4] は、すでに StatsD プロトコルを使用してテレメトリーを発信しているアプリケーションに適しています。

Agent インテグレーションは、Datadog からデータを取得し、Datadog にデータをプッシュする双方向のものです。これは、Datadog マーケットプレイス上の情報タイルのみのリスト (スタンドアロン SaaS ライセンスやプロフェッショナルサービス製品など) とは異なるもので、双方向性ではありません。

インテグレーションは、以下の種類のデータを Datadog に送信します。

- [メトリクス][5]
- [ログとログパイプライン][6]
- [イベント][7]
- [サービスチェック][8]
- [トレース][9]
- [インシデント][10]
- [セキュリティイベント][11]

Datadog Agent ベースのインテグレーションの詳細については、以下を参照してください。

- [Agent ベースのインテグレーション入門][12]
- [独自のソリューションを作成する][13]

### REST API インテグレーション

[API インテグレーション][14]を使用して、バックエンドからデータをリッチ化して送信したり、Datadog から直接データを取り出したりすることができます。API インテグレーションは、Datadog と他の SaaS プラットフォーム間のコネクタを構築する際に有効です。

API インテグレーションは、Datadog Agent を使用してデータを収集しないため、開発作業が完了したら、[情報タイルのみのリスト](#saas-license-or-professional-service-offerings)を作成する必要があります。

REST API インテグレーションは、双方向でなければなりません。つまり、インテグレーションは、Datadog からデータを引き出し、Datadog にデータをプッシュすることができなければなりません。

REST API インテグレーションは、以下の種類のデータを Datadog に送信します。

- [メトリクス][5]
- [ログとログパイプライン][6]
- [イベント][7]
- [サービスチェック][8]
- [トレース][9]
- [インシデント][10]
- [セキュリティイベント][11]

Datadog API エンドポイントにデータを送信するにはDatadog API キーが必要で、Datadog からデータをクエリしたり、Datadog サイト上のリソースを作成するにはアプリケーションキーが必要です。オプションとして、代わりにマーケットプレイスタイルで[インテグレーションのための OAuth][15] を設定することができます。

### Datadog Apps

[Datadog アプリ][16]は、[Datadog Developer Platform][17] で開発されたカスタムダッシュボードウィジェットです。Datadog アプリを公開できるようになったら、インテグレーションまたはマーケットプレイスページに[情報タイルのみのリスト](#saas-license-or-professional-service-offerings)を作成する必要があります。

### SaaS ライセンスまたはプロフェッショナルサービス製品

SaaS ライセンスまたはプロフェッショナルサービス製品をマーケットプレイスに掲載するには、情報タイルのみの掲載を作成する必要があります。

## ディレクトリを設定し、マーケットプレイスのリポジトリを複製する

製品が決まったら、ディレクトリを設定します。

1. [マーケットプレイスのドキュメント][19]の指示に従って、[マーケットプレイスのリポジトリ][18]へのアクセスをリクエストします。
2. `dd` ディレクトリを作成します。
   {{< code-block lang="shell" >}}mkdir $HOME/dd{{< /code-block >}}

   Datadog Development Toolkit コマンドは、`$HOME/dd/` ディレクトリで作業していることを想定しています。これは必須ではありませんが、異なるディレクトリで作業する場合は、追加の構成手順が必要です。
3. マーケットプレイスのリポジトリへのアクセスが許可されたら、`dd` ディレクトリを作成し、`marketplace` リポジトリを複製します。
   {{< code-block lang="shell" >}}git clone git@github.com:DataDog/marketplace.git{{< /code-block >}}

## Datadog Development Toolkit をインストールして構成する

Datadog Development Toolkit コマンド (`ddev`) を使用すると、インテグレーションを開発する際に、インテグレーションタイルのアセットとメタデータのスケルトンを生成してスキャフォールディングを作成することができます。

始める前に、以下の前提条件を満たしていることを確認してください。

- [Python v3.8 以降][20]
- Agent ベースのインテグレーションを構築する場合は、Docker が必要です
- 環境の競合を避けるために、Python の仮想環境を使用することをお勧めします。以下の説明では、ほとんどの OS で Python v3.3 以降に同梱されている `venv` を使用します。

Development Toolkit をインストールして構成します。

1. `marketplace` ディレクトリの中にいることを確認します。
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}

2. Python の仮想環境を構築します。
   {{< code-block lang="shell" >}}
   python3 -m venv venv
   . venv/bin/activate{{< /code-block >}}

   仮想環境は `deactivate` を実行することでいつでも終了させることができます。

3. [Developer Toolkit][21] をインストールします。
   {{< code-block lang="shell" >}}pip3 install "datadog-checks-dev[cli]"{{< /code-block >}}

   Z Shell を使用している場合は、`pip3 install datadog-checks-dev\[cli\]` を実行して、エスケープされた文字を使用する必要があるかもしれません。

4. デフォルトの作業用リポジトリとして `marketplace` を設定します。
   {{< code-block lang="shell" >}}
   ddev config set marketplace $HOME/dd/marketplace
   ddev config set repo marketplace{{< /code-block >}}

   マーケットプレイスディレクトリの複製に `$HOME/dd` 以外のディレクトリを使用した場合は、以下のコマンドを使用して作業リポジトリを設定します。

   {{< code-block lang="shell" >}}
   ddev config set marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace{{< /code-block >}}

## インテグレーションタイルスキャフォールディングにデータを入力する

`ddev` コマンドを実行すると、インテグレーションに必要なフォルダとファイルのスケルトンが生成されます。このコマンドで使用するオプションは、開発しているインテグレーションの種類によって異なります。`ddev` コマンドで作成されるファイルの一覧は、[インテグレーションアセット][22]を参照してください。

### 情報タイルのみの掲載を作成する

Datadog アプリ、Datadog REST API インテグレーション、プロフェッショナルサービス、スタンドアロン SaaS ライセンスについては、Datadog Development Toolkit を使用して、情報タイルのみの掲載のスキャフォールディングを作成することができます。

情報タイルのみの掲載のスキャフォールディングを作成するには

1. `marketplace` ディレクトリの中にいることを確認します。
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}
2. `-t tile` オプションを付けて `ddev` コマンドを実行します
   {{< code-block lang="shell" >}}ddev create -t tile "<Offering Name>"{{< /code-block >}}

### Agent ベースの完全なインテグレーションを作成する

Agent ベースのインテグレーションのためのスキャフォールディングを生成するには
1. `marketplace` ディレクトリの中にいることを確認します。
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}
2. `-t tile` オプションを付けて `ddev` コマンドを実行します
   {{< code-block lang="shell" >}}ddev create "<Offering Name>"{{< /code-block >}}

## 必要なインテグレーションアセットファイルを完成させる

インテグレーションに必要な以下のアセットが揃っていることを確認してください。

{{% integration-assets %}}

### README

`README.md` ファイルを作成したら、以下のセクションを H2s (`##`) として追加し、マーケットプレイスのタイルに表示される内容を記入します。

| ヘッダー名 | ヘッダー |
|-------------|--------|
| 概要 | Datadog マーケットプレイスでインテグレーションを購入しインストールすることで、ユーザーに提供する価値やメリット (例えば、すぐに使えるダッシュボード、ユーザーセッションのリプレイ、ログ、アラートなど) を `## Overview` ヘッダーの下に説明文を記述してください。<br><br>この情報は、インテグレーションタイルの **Overview** タブに表示されます。 |
| セットアップ | H3 の見出し (`###`) に分けられた情報を含む、マーケットプレイスインテグレーションを設定するためのすべてのステップを含みます。標準的なトピックは以下の通りです。<br><br>- アプリ内インテグレーションタイルを使用してインテグレーションをインストールする。 <br>- Datadog の組織で適切なロールと権限でインテグレーションを構成する。<br>- インテグレーションを購入しインストールしたユーザーがアクセスできる、すぐに使える Datadog の機能 (メトリクス、イベント、モニター、ログ、ダッシュボードなど) にアクセスする。|
| アンインストール | マーケットプレイスインテグレーションをアンインストールするためのすべてのステップを含めます。この情報は、インテグレーションタイルの **Configure** タブに表示されます。|
| 収集データ  | すぐに使えるメトリクス、イベント、またはサービスチェックに関する情報を含む、マーケットプレイスインテグレーションによって収集されるデータの種類を指定します。<br><br>ログ、モニター、ダッシュボードなど、その他の収集データの種類を含めることができます。マーケットプレイスインテグレーションがこれらのいずれかを提供しない場合、Data Collected セクションを追加する必要はありません。 |
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

[`marketplace` リポジトリ][18]に、インテグレーションタイルのアセットファイル (イメージを含む) を含むプルリクエストを開きます。自動テストは、Azure DevOps パイプラインでチェックを実行し、プルリクエストが良い状態であり、更新に必要なすべてのコンテンツが含まれていることを確認します。

Azure DevOps パイプラインへのアクセスをリクエストするには、プルリクエストにコメントを残して、アクセスをリクエストします。

## レビュープロセス

プルリクエストが全てのチェックを通過すると、`Datadog/agent-integrations`、`Datadog/marketplace-review`、`Datadog/documentation` チームのレビュアーが、ベストプラクティスに関する提案やフィードバックを提供します。

フィードバックに対応し、レビューを再要求すると、これらのレビュアーがあなたのプルリクエストを承認します。サンドボックスアカウントでインテグレーションタイルをプレビューしたい場合は、マーケットプレイスチームに連絡してください。これにより、プルリクエストがマージされる前に、Datadog マーケットプレイスでインテグレーションタイルの追加変更を検証し、プレビューすることができます。

## 市場開拓の機会を調整する

マーケットプレイスのタイルが稼動すると、テクノロジーパートナーは Datadog のパートナーマーケティングチームとミーティングを行い、以下のような共同の市場開拓 (GTM) 戦略を調整することができます。

- パートナーのプレスリリースの Datadog 見積もり
- [Datadog モニター][23]内のブログ記事
- ソーシャルメディア投稿の増幅

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[2]: /ja/developers/custom_checks/prometheus/
[3]: /ja/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[4]: /ja/developers/dogstatsd/
[5]: /ja/api/latest/metrics/
[6]: /ja/logs/faq/partner_log_integration/
[7]: /ja/api/latest/events/
[8]: /ja/api/latest/service-checks/
[9]: /ja/tracing/guide/send_traces_to_agent_by_api/
[10]: /ja/api/latest/incidents/
[11]: /ja/api/latest/security-monitoring/
[12]: /ja/developers/integrations/
[13]: /ja/developers/#creating-your-own-solution
[14]: /ja/api/latest/
[15]: /ja/developers/integrations/oauth_for_integrations/
[16]: /ja/developers/datadog_apps/
[17]: https://app.datadoghq.com/apps/
[18]: https://github.com/Datadog/marketplace
[19]: /ja/developers/marketplace/#request-access-to-marketplace
[20]: https://www.python.org/downloads/
[21]: https://pypi.org/project/datadog-checks-dev/
[22]: /ja/developers/integrations/check_references/#manifest-file
[23]: https://datadoghq.com/blog/