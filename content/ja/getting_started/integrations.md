---
title: インテグレーション入門
kind: ドキュメント
further_reading:
  - link: 'https://learn.datadoghq.com/'
    tag: ラーニングセンター
    text: Datadog 入門
  - link: /integrations/
    tag: インテグレーション
    text: Datadog の全インテグレーションリスト
---
- [インテグレーションの設定](#setting-up-an-integration)
  - [API キーとアプリケーションキー](#api-and-application-keys)
  - [インストール](#installation)
  - [Agent インテグレーションの構成](#configuring-agent-integrations)
  - [タグ付け](#tagging)
  - [検証](#validation)
- [複数インテグレーションのインストール](#installing-multiple-integrations)
- [セキュリティ対策](#security-practices)
- [次のステップ](#whats-next)
- [トラブルシューティング](#troubleshooting)
- [重要な用語](#key-terms)
- [その他の参考資料](#further-reading)

ここでは、インテグレーションの使用方法について説明します。新しいインテグレーションの構築方法については、[新しいインテグレーションの作成][1]ページをご参照ください。

インテグレーションとは、最上位レベルにおいては、通常個別に検討される要素から統合されたシステムを構築することをいいます。Datadog では、インテグレーションを利用することで、インフラストラクチャーからすべてのメトリクスとログを収集して、統合システムを全体として把握することができます。1 つひとつの要素はもちろん、個々の要素が全体にどのように影響を与えているかも確認できます。

**メモ**: プロジェクトに関するメトリクスの収集は、開発プロセスのできるだけ早い段階で開始するのが理想的ですが、どの段階からでも開始できます。

Datadog では、主に次の 3 種類のインテグレーションが提供されています。

* **エージェントベースのインテグレーション**は、Datadog Agent と共にインストールされ、`check` という Python クラスを使用して、収集するメトリクスを定義します。
* **認証 (クローラー) ベースのインテグレーション**は、[Datadog アプリケーション][2]で設定されます。その際、API を使用してメトリクスを取得するための資格情報を指定します。これには、[Slack][3]、[AWS][4]、[Azure][5]、[PagerDuty][6] などのよく使用されるインテグレーションがあります。
* **ライブラリインテグレーション**は、[Datadog API][7] を使用します。アプリケーションが記述されている言語 ([Node.js][8]、[Python][9] など) に基づいてアプリケーションを監視できるようにします。

メトリクスを定義し、独自の社内システムから Datadog にメトリクスを送信する[カスタムチェック][10]を作成することもできます。

## インテグレーションの設定

Datadog Agent パッケージには、Datadog が公式にサポートしている[インテグレーションコア][11]が含まれています。インテグレーションコア内のインテグレーションを使用するには、Datadog Agent をダウンロードします。コミュニティベースのインテグレーションは、[インテグレーションエクストラ][12]にあります。これを使用するには、[開発ツールキット][13]をダウンロードする必要があります。これらのインテグレーションのインストールおよび管理についての詳細は[インテグレーション管理ガイド][14]をご参照ください。

### API キーとアプリケーションキー

[Datadog Agent をインストール][15]するには、[API キー][16]が必要です。Agent が既にダウンロードされている場合は、`datadog.yaml` ファイルで API キーを設定してください。メトリクスとイベントの送信を除くと、Datadog の機能の大半は、使用するために[アプリケーションキー][16]が必要です。お客様のアカウントの API キーとアプリケーションキーは、UI の [API 設定ページ][17]で管理できます。

### インストール

クローラーまたはライブラリベースのインテグレーションに接続する場合は、[インテグレーションのページ][18]から該当するプロバイダーのページに移動し、具体的な接続方法を参照してください。その他のサポートされているインテグレーションの場合は、[Datadog Agent][19] をインストールします。ほとんどのインテグレーションがコンテナ化 Agent ([Docker][20] および [Kubernetes][21]) 上でサポートされています。Agent をダウンロードしたら、[インテグレーション][18]のページに移動し、個々のインテグレーションの具体的な構成方法をご確認ください。

### Agent インテグレーションの構成

構成は、[インテグレーション][18]ごとに異なります。Agent の構成ディレクトリのルートにある `conf.d/<INTEGRATION_NAME>.d` フォルダーには、公式にサポートされている Agent インテグレーションごとに `<INTEGRATION_NAME>.d` という名前のフォルダーがあり、そこには、そのインテグレーションで使用できるすべての構成オプションをリストしたサンプル `conf.yaml.example` が含まれています。

特定のインテグレーションを有効にするには

1. `conf.yaml.example` ファイル (該当する `<INTEGRATION_NAME>.d` フォルダー内にある) の名前を `conf.yaml` に変更します。
2. 新しく作成された構成ファイル内の必須パラメーターを環境に応じた値で更新します。
3. [Datadog Agent を再起動][22]します。

**メモ**: すべての構成ファイルは、[パラメーターの説明][23]に記載されている形式に従います。

以下に、[apache インテグレーション][24]からメトリクスとログを収集するために必要な最小の `conf.yaml` 構成ファイルの例を示します。

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

logs:
  - type: file
    path: /var/log/apache2/access.log
    source: apache
    sourcecategory: http_web_access
    service: apache
  - type: file
    path: /var/log/apache2/error.log
    source: apache
    sourcecategory: http_web_access
```

2 つの Apache サービスを監視するために、同じ Agent チェック内に複数のインスタンスを作成する場合は、`instances:` セクションで `-` を使用して新しいインスタンスを作成します。

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

  - apache_status_url: http://<REMOTE_APACHE_ENDPOINT>/server-status?auto
```

### タグ付け

タグ付けは、Datadog がさまざまなソースから受け取るデータを絞り込んだり集計するための重要な機能です。タグの割り当ては、構成ファイル、環境変数、UI、API、または DogStatsD で行うことができます。`datadog.yaml` ファイルでタグを定義した場合は、それらのタグがすべてのインテグレーションデータに適用されます。`datadog.yaml` で定義されたタグは、すべての新しいインテグレーションに継承されます。タグ環境変数を使用した場合は、それがすべてのインテグレーションに適用されます。それぞれのインテグレーション構成ファイルでタグを定義した場合、それらのタグはその特定のインテグレーションにのみ適用されます。コンテナでタグを使用した場合、それらのタグはそのコンテナにのみ適用されます。タグ付けの詳細については、[タグの概要][25]をご参照ください。

### 検証

Agent とインテグレーションの構成を検証するには、[Agent の `status` サブコマンドを実行][26]し、Checks セクションで新しい構成を見つけます。

## 複数インテグレーションのインストール

複数のインテグレーションをインストールする場合は、対応する `<INTEGRATIONS>.d` フォルダーで新しい `conf.yaml` ファイルに構成情報を追加する必要があります。`conf.yaml.example` ファイルで新しいインテグレーションの必須パラメーターを調べ、それを新しい `conf.yaml` ファイルに追加した後、上記の手順に従って構成を確認してください。

## セキュリティ対策

Datadog がユーザーデータを取り扱う方法など、セキュリティ上の注意事項については、[セキュリティガイド][27]を参照してください。

## 次のステップ

これで、インテグレーションの設定は完了です。Datadog からアプリケーションに送信される[すべてのメトリクスの調査][28]を開始できます。そのメトリクスを使用して、データを監視するための[グラフ][29]や[アラート][30]の設定を開始できます。

[ログ管理][31]、[APM][32]、[Synthetics][33] の各ソリューションも参照してください。

## トラブルシューティング

インテグレーションのトラブルシューティングでは、最初に、コードエディターでプラグインを使用するか、さまざまなオンラインツールのいずれかを使用して、YAML が有効であることを確認します。次に、[Agent のトラブルシューティング][34]の手順をすべて実行します。

引き続き問題が発生する場合は、[Datadog のサポートチーム][35]までお問い合わせください。

## 重要な用語

| 用語         | 説明 |
| ------------ | ----------- |
|**conf.yaml** | `conf.yaml` を作成する場所は、[Agent の構成ディレクトリ][36]のルートにある `conf.d/<INTEGRATION_NAME>.d` フォルダーです。このファイルを使用して、インテグレーションの設定を行うほか、インテグレーションからシステムへの接続を行います。|
|**カスタムチェック** | 固有のシステムを監視する必要がある場合、またはインテグレーションから既に送信されたメトリクスを拡張したい場合は、メトリクスを定義して Datadog に送信する[カスタムチェック][10]を作成できます。ただし、一般に利用可能なアプリケーション、公開サービス、オープンソースプロジェクトなどを監視したい場合でも、そのためのインテグレーションがまだ用意されていなければ、カスタムチェックではなく、[新しいインテグレーションの構築][1]をご検討ください。 |
|**datadog.yaml** | メインの構成ファイルです。このファイルで、Agent 全体が自身のインテグレーションやユーザーのシステムとやり取りする方法を定義します。このファイルを使用して、API キー、プロキシ、ホストタグなどのグローバル設定を更新します。|
|**イベント** | イベントは、システムに関する情報メッセージです。これを[イベントストリーム][37]で使用して、イベントに対するモニターを作成できます。|
|**インスタンス** | 監視対象が何であれ、そのインスタンスを `conf.yaml` ファイルで定義し、マップします。たとえば、[`http_check` インテグレーション][38]の場合は、アップタイムやダウンタイムを監視する HTTP エンドポイントのインスタンスに関連付けられた名前を定義します。同じインテグレーションで**複数のインスタンス**を監視できます。それには、`conf.yaml` ファイルでそれぞれのインスタンスを定義します。 |
|**integration_name.d**| 構成が複雑な場合は、それを複数の `YAML` ファイルに分割した後、それらのファイルをすべて `<INTEGRATION_NAME>.d` フォルダーに格納して構成を定義することができます。Agent は、`<INTEGRATION_NAME>.d` フォルダー内の有効な `YAML` ファイルをすべて読み込みます。 |
|**ログ** | 監視対象のシステムにログがある場合は、Datadog に送信するログをカスタマイズしたり、Datadog の[ログ管理ソリューション][31]を使用してログを管理および分析することができます。|
|**metadata.csv** | 各インテグレーションによって収集されたメトリクスをリスト化して格納するファイルです。|
|**メトリクス** | 各インテグレーションによってシステムから収集されるデータのリストです。各インテグレーションのメトリクスは、そのインテグレーションの `metadata.csv` ファイルにあります。メトリクスの詳細については、「開発ツール」の[メトリクス][39]のページを参照してください。[カスタムメトリクス][40]を設定することもできます。インテグレーションでそのまま使用できるメトリクスが提供されていない場合は、通常、カスタムメトリクスを追加します。|
|**パラメーター** | `conf.yaml` ファイルのパラメーターを使用することで、インテグレーションデータソースと Agent の間のアクセスを制御できます。各インテグレーションの `conf.yaml.example` ファイルには、必須パラメーターと任意パラメーターのすべてがリストされています。 |
|**サービスチェック** | サービスチェックは、サービスの稼働時間の状況を追跡するために使用される一種のモニターです。詳細については、[サービスチェックガイド][41]をご参照ください。|
|**タグ付け** | [タグ][25]を使用すると、メトリクスをカスタマイズし、ご自身に最適な形で絞り込んで表示できます。|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/integrations/new_check_howto
[2]: https://app.datadoghq.com/account/settings
[3]: /ja/integrations/slack
[4]: /ja/integrations/amazon_web_services
[5]: /ja/integrations/azure
[6]: /ja/integrations/pagerduty
[7]: /ja/api
[8]: /ja/integrations/node
[9]: /ja/integrations/python
[10]: /ja/developers/write_agent_check/?tab=agentv6
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[13]: /ja/developers/integrations/new_check_howto/#developer-toolkit
[14]: /ja/agent/guide/integration-management
[15]: https://github.com/DataDog/dd-agent
[16]: /ja/account_management/api-app-keys
[17]: https://app.datadoghq.com/account/settings#api
[18]: /ja/integrations
[19]: https://app.datadoghq.com/account/settings#agent
[20]: https://app.datadoghq.com/account/settings#agent/docker
[21]: https://app.datadoghq.com/account/settings#agent/kubernetes
[22]: /ja/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[23]: /ja/developers/integrations/new_check_howto/#param-specification
[24]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[25]: /ja/tagging
[26]: /ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[27]: /ja/security
[28]: /ja/graphing/metrics/explorer
[29]: /ja/graphing
[30]: /ja/monitors
[31]: /ja/logs
[32]: /ja/tracing
[33]: /ja/synthetics
[34]: /ja/agent/troubleshooting/?tab=agentv6
[35]: /ja/help
[36]: /ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[37]: https://app.datadoghq.com/event/stream
[38]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[39]: /ja/developers/metrics
[40]: /ja/developers/metrics/custom_metrics
[41]: /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui