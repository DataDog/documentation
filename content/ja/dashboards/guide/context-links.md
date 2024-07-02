---
title: Context Links
further_reading:
- link: /dashboards/widgets
  tag: Documentation
  text: Dashboard widget list
---

## 概要

ダッシュボードは、複数のソースからデータを収集し、そのデータを視覚化として表示します。

ダッシュボードを[モニター通知][1]に関連付けたり、キーとなる技術指標やビジネス指標を観察するためにスクリーンボードとして使用したり、[ランブック][2]で参照してコンテキストを追加したりできます。ダッシュボードを使用すると、インタラクションだけでなく、プラットフォームの現在の状態のスナップショットを見ることができるため、問題を先取りして、専門ページでより深く分析することができます。

以下のビデオは、Web アプリケーションの概要ダッシュボードを見るユーザーを想定しています。ユーザーは、技術的なメトリクスでスパイクを特定し、詳細を確認するためにズームインし、根本的な原因をチェックするために基礎となるホストダッシュボードにアクセスします。

{{< img src="dashboards/guide/context_links/overview.mp4" alt="ダッシュボードのメトリクスグラフから、コンテキストリンクを使用して問題の根本原因を見つけるトラブルシューティングワークフロー" video="true" style="width:80%;" >}}

このガイドでは、ダッシュボードにおける**コンテキストリンク**を紹介し、以下の内容について説明します。

1. [コンテキストリンクの仕組みと、それを正確なニーズに適合させる方法](#introduction-to-context-links)。
2. [コンテキストリンク構成の使用例](#example-use-cases)。

## コンテキストリンクの紹介

コンテキストリンクは、ダッシュボードウィジェットと Datadog の他のページ、およびワークフローに統合したサードパーティアプリケーションとの橋渡しをします。

ダッシュボードの[編集権限][3]を持つユーザーは、リンク一覧でアクセスできるリンクを構成することができます。

### デフォルトのコンテキストリンク

 {{< img src="dashboards/guide/context_links/default-links.png" alt="デフォルトのリンク" style="width:75%;" >}}

デフォルトでは、ウィジェットメニューには、ホスト、[トレース][4]、[ログ][5]へのリンクと、ウィジェットのデータソースに対応するリンクが表示されます。たとえば、ウィジェットが [RUM データ][7]を使用している場合、メニューには [**RUM エクスプローラー**][6]へのリンクが表示されます。ドロップダウンメニューの他のリンクを表示するには、**More Related Data Actions** をクリックします。

このウィジェットには、以下のページへのリンクが含まれています。 

| リンク           | 説明                                                                           |
|----------------|---------------------------------------------------------------------------------------|
| ホスト          | シリーズが複数のホストで構成されている場合、[ホストマップ][8]にリンクします。シリーズが 1 つのホストで構成されている場合、[ホストダッシュボード][9]にリンクします。|
| コンテナ     | [ライブコンテナ][10]ページにリンクします。                                                |
| プロセス    | [ライブプロセス][11]ページにリンクします。                                                 |
| APM トレース     | [トレースエクスプローラー][12]にリンクする基礎となるトレースを表示するサイドパネルを開きます。|
| RUM イベント     | [RUM エクスプローラー][13]にリンクします。                                                      |
| プロファイル       | APM [プロファイルエクスプローラー][14]にリンクします。                                              |
| Logs           | [ログエクスプローラー][15]にリンクする基礎となるログを表示するサイドパネルを開きます。    |

該当する場合、コンテキストリンクは以下を埋め込みます。

* ウィジェットフィルターとテンプレート変数 (もしあれば) を組み合わせた**フィルター**で、grouped-by クエリの場合、ユーザーがクリックするシリーズ。
* **時間範囲**。時系列とヒートマップウィジェットでは、時間範囲はデータポイントの時間バケットに対応します。他のウィジェットでは、時間範囲はウィジェット全体の時間範囲となります。


### コンテキストリンクのカスタマイズ

[一般的なウィジェット][16]の場合、編集モードに入り、**Context Links** セクションにアクセスします。独自のコンテキストリンクを作成したり、デフォルトのリンクをオーバーライドしたり、リンクを表示または非表示にすることができます。

{{< img src="dashboards/guide/context_links/edit-links.png" alt="リンクの編集" style="width:75%;" >}}

カスタムリンクを定義したり、デフォルトリンクをオーバーライドするには、**Label** フィールドにリンク名を、**URL** フィールドにリンクパスを指定します。Key-value ヘルパーを使用するには、**+ Add URL Parameter** をクリックします。


#### コンテキストリンク変数

{{< img src="dashboards/guide/context_links/custom-link.png" alt="URL のパラメーターに key-value のペアを設定する" style="width:75%;" >}}

コンテキストリンクで利用可能な変数タイプは以下の通りです。

* **時間範囲変数** `{{timestamp_start}}`と `{{timestamp_end}}`。これらの変数は、ウィジェットの時間範囲に対応します。
* **クエリ変数** (上記の例では `{@MerchantTier}` と `{@MerchantTier.value}}`)。これらの変数は、グループ化されたクエリを持つウィジェットのためのもので、ユーザーがクリックした特定のグループを識別します。
* **ダッシュボードテンプレート変数** (上記の例では `{$env}}` と `{$env.value}}`)。これらの変数は、ユーザーがクリックしたときに、テンプレート変数に使用される現在の値を識別します。
* **`{{tags}}`**、上記のすべての変数のデフォルトの組み合わせです。

`{{something}}` と `{{something.value}}` のどちらかを選ばなければならないとき:

* `{{something}}` は、そのキーにプレフィックスを付けた値を返します。例えば、`env:prod` です。
* `{{something.value}}` は生の値を返します。例えば、`prod` です。
* [複数の変数を構成するユースケース例](#configure-multiple-variables)を参照してください。


この例では、**View in Acme** をクリックすると、リンク先が`https://prod.acme.io/search?what=basic&when=1643021787564` になります。

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Acme へのコンテキストリンク例" style="width:60%;" >}}

コンテキストリンク:

* `{{env.value}}` を `prod` に置き換えます
* `{{@MerchantTier.value}}` を `basic` に置き換えます
* そして、`{{timestamp_end}}` を `1643021787564` に置き換えます。


#### コピーアンドペーストによるコンテキストリンクのブートストラップ

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="リンクをコピーアンドペーストして構成をブートストラップする" video="true" style="width:75%;" >}}

多種多様なパラメーターをエンコードする複雑なコンテキストリンクの場合、URL 全体を **URL** フィールドにコピーアンドペーストして構成をブートストラップし、そこから変数を作り直した方が便利な場合があります。


#### URL エンコーディング

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="URL と Key-Value パラメーターのスクリーンショット" style="width:75%;" >}}

Datadog は、コンテキストリンクの URL エンコーディングを処理します。

上記の例では、クエリパラメーターに `status:error source:nginx {{@shopist.webstore.merchant.tier}}` を指定してリンクを表示しています。ここで、`{{@shopist.webstore.merchant.tier}}` は `@shopist.webstore.merchant.tier:basic` として解釈されます。そして、完全なクエリパラメーターは `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic` に変換されます。


## 使用例

このセクションでは、コンテキストリンクを活用して、ダッシュボードをワークフローに統合する方法を示す例を紹介します。

### ダッシュボードからカスタマーサポートソリューションへのリンク

次の例では、ダッシュボード内のユーザーから、対応する Zendesk ユーザーページへのリンクを作成する方法を説明します。

#### コンテキスト

Datadog を使用して、マーチャントサイトを監視しています。カスタマーサポートチームは、[フロントエンド][17]と[セキュリティ][18]チームが設定したダッシュボードを使用して、最も関与している顧客や問題のある経験を持つ顧客を積極的に特定し、場合によっては彼らに連絡することができます。

このトラブルシューティングのワークフローを加速するために、カスタマーサポートチームは、ダッシュボードとサポートソリューション (例: Zendesk) の間の直接接続を希望しています。

#### アプローチ

Datadog でプラットフォーム全体のログに記録されたユーザーを追跡する主要な ID は、いくつかのダッシュボードウィジェットに表示されるファセットであるユーザーのメールアドレスです。

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk クエリ" style="width:90%;">}}

ユーザーを検索するための典型的な Zendesk のリンクは `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com` で、ユーザーのメールアドレスが検索パラメーターになります。

URL に変数を追加すると、テンプレートリンクが `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}` になります。

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Zendesk ユーザーページコンテキストリンク" style="width:80%;">}}

#### 結果

カスタマーサポートチームのダッシュボードウィジェットには、適切なコンテキストを持つカスタマーサポートプラットフォームに移動するためのコンテキストリンクが含まれています。

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk ユーザーページコンテキストリンク" style="width:80%;">}}

**Zendesk User Page** のリンクをクリックすると、Zendesk のこのユーザーのページが表示されます。

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk の結果" style="width:80%;">}}

### ダッシュボードから AWS コンソールへのリンク

The following example explains how to create a link from a host in a dashboard widget to its corresponding Amazon EC2 instance page in the AWS Console.

#### コンテキスト

Your platform is hosted on [Amazon EC2][19] instances, and the procedures to upscale and downscale your platform are mostly manual.

Datadog のダッシュボードには、インフラストラクチャーの主要なヘルスメトリクスが集約されています。

この運用ワークフローを加速するために、このダッシュボードと [AWS コンソール][20]を直接接続したいと考えます。例えば、`t2.micro` から `t2.large` にアップグレードするためです。

#### アプローチ

A typical Amazon EC2 instance summary link is `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, where you can read:

* `eu-west-3`: サブドメインと URL のパラメーターとして表示される、データセンターのリージョン。
* `i-04b737b9f8bf94a94`: ハッシュパラメーターとして表示されるホスト ID。

プラットフォームが 1 つのリージョンでしか動作していない場合は、コンテキストリンクのテンプレートにホスト ID を注入して、`https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}` となるようにします。

プラットフォームが複数のリージョンで動作している場合、ウィジェットの構成は以下に依存します。

* リージョンがクエリ集計の一部である場合 (例えば、以下のスクリーンショット)、テンプレートリンクは `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}` で、ここで `{{region.value}}` は **query** 変数です。

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="Amazon EC2 Query" style="width:90%;" >}}

* リージョンがクエリ集計の一部である場合 (例えば、以下のスクリーンショット)、テンプレートリンクは `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}` で、ここで `{{region.value}}` は **template** 変数です。

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="Amazon EC2 Query" style="width:90%;" >}}

#### 結果

ダッシュボードウィジェットには、AWS コンソールの適切なホストに移動するためのリンクが含まれています。

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="Amazon EC2 Query context link" style="width:90%;" >}}

Clicking the **Amazon EC2 Instance Summary** link directs you to the Amazon EC2 instance page in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="Amazon EC2 Query Result" style="width:70%;" >}}

### ダッシュボードから Datadog の保存ビューとリマップされた属性へのリンク

次の例では、ダッシュボードウィジェットの RUM イベントから対応するログへのリンクを作成する方法を説明します。

#### コンテキスト

Datadog で企業サイトを監視しています。[RUM][17] でユーザーを把握し、[Logs][21] でより技術的な観点から [API Gateways の監視][22]を行うことがあります。

フロントエンドエンジニアは通常、RUM の概要情報を表示するダッシュボードを使用します。API Gateways チームは、ログエクスプローラーの[保存ビュー][23]を維持します。これは、フロントエンドモニタリングチームが自分たちに関連する情報を監視するために信頼する、微調整された視点です。

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt="Logs の保存ビューの結果" style="width:90%;" >}}

このトラブルシューティングのワークフローを加速するために、フロントエンドのモニタリングチームは、ダッシュボードの現在のコンテキストで保存ビューにアクセスしたいと考えています。

#### 保存ビューへのアプローチ

[保存ビュー][23]は、ログエクスプローラーのデフォルトのクエリ、視覚化、および構成オプションを定義します。典型的な保存ビューのリンクは `https://app.datadoghq.com/logs?saved_view=305130` で、これは内部でログエクスプローラーの URL をエンコードしています。

保存ビューのショートリンクを追加して、結果のログエクスプローラー URL の任意のパラメーターをオーバーライドすることができます。

例えば、`https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1`  とすると、保存ビューを最初に開いたように[ログエクスプローラー][15]に移動しますが、デフォルトのクエリフィルターは `@source:nginx @network.client.ip:123.123.12.1` に置き換えられます。

#### 属性のリマップへのアプローチ

ウェブサイトでのナビゲーションが匿名の場合、ユーザーを特定するために IP アドレスをプロキシとして使用する場合があります。

RUM イベントの `@session.ip` 属性とログの `@network.client.ip` 属性を識別したいと思います。この 2 つの属性は一般的に異なる意味を持つため、異なる名前を持っていますが、この認証ログのコンテキストでは、両方を識別することができます。

そのためには、`@network.client.ip` を元にしたフィルターに `@session.ip` を注入し、適切なフィルター `@network.client.ip:{{@session.ip.value}}` を構築します。

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="保存ビューの検索クエリの例" style="width:70%;">}}

セッション IP ごと、および特定の国ごとのインサイトを表示する RUM ダッシュボードウィジェットについては、このリンクの構成に従います。

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="保存ビューの URL 構成例" style="width:70%;">}}

#### 結果

API Gateways チームは、受信ログの最新の更新を考慮して保存ビューを更新するため、コンテキストリンクは最新の状態に保たれます。

IP アドレスをリマップすることで、RUM イベントと対応するログをつなぐコンテキストリンクが作成されます。

### 複数の変数の構成

次の例では、コンテキストリンククエリで複数の変数と条件を構成する方法を説明します。

#### コンテキスト

特定のログや条件を調査するためのコンテキストリンクを追加します。
- 同じコンテキストで複数のタグ値を持っている場合 (例: `env:production OR env:prod`)。
- ログを複数の条件で絞り込みたい場合 (例: `env:prod AND service:backend`)

#### アプローチ

トラブルシューティングしたいテンプレート変数を選択すると、コンテキストリンク構成はそれらのテンプレート変数を取り込み、クエリに挿入します。**注**: 構文と括弧はクエリに影響します。

例えば、`service:backend` AND (`env:production` OR `env:prod`) でコンテキストリンクを構成したい場合は、以下の構成を使用します。

```
service:backend (env:{{$env.value}})
```

#### 結果

括弧は `(env:{{$env.value}})` を `(env:*)` に変換し、コンテキストリンククエリに複数の変数を入力できるようにします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /monitors/notify/
[2]: /notebooks/
[3]: /dashboards/configure/#permissions
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /real_user_monitoring/data_collected/
[8]: /infrastructure/hostmap/#overview
[9]: /getting_started/dashboards/#explore-out-of-the-box-dashboards
[10]: /infrastructure/livecontainers/
[11]: /infrastructure/process/?tab=linuxwindows
[12]: /tracing/trace_explorer/?tab=listview
[13]: /real_user_monitoring/explorer/
[14]: /profiler/profile_visualizations/
[15]: /logs/explorer/
[16]: /dashboards/widgets/
[17]: /real_user_monitoring/
[18]: /security/cloud_siem/
[19]: /integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /logs/
[22]: /integrations/#cat-log-collection
[23]: /logs/explorer/saved_views/