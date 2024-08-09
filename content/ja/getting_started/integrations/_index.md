---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: ラーニングセンター
  text: インテグレーション入門
- link: /integrations/
  tag: ドキュメント
  text: Datadog インテグレーションの一覧を見る
title: インテグレーション入門
---

## 概要

ここでは、インテグレーションの使用方法について説明します。新しいインテグレーションの構築方法については、[新しいインテグレーションの作成][1]ページをご参照ください。

インテグレーションとは、最上位レベルにおいては、通常個別に検討される要素から統合されたシステムを構築することをいいます。Datadog では、インテグレーションを利用することで、インフラストラクチャーからすべてのメトリクスとログを収集して、統合システムを全体として把握することができます。1 つひとつの要素はもちろん、個々の要素が全体にどのように影響を与えているかも確認できます。

**メモ**: プロジェクトに関するメトリクスの収集は、開発プロセスのできるだけ早い段階で開始するのが理想的ですが、どの段階からでも開始できます。

Datadog では、主に次の 3 種類のインテグレーションが提供されています。

- **エージェントベース**のインテグレーションは、Datadog Agent と共にインストールされ、`check` という Python クラスメソッドを使用して、収集するメトリクスを定義します。
- **認証 (クローラー) ベース**のインテグレーションは、[Datadog][2] で設定されます。その際、API を使用してメトリクスを取得するための資格情報を指定します。これには、[Slack][3]、[AWS][4]、[Azure][5]、[PagerDuty][6] などのよく使用されるインテグレーションがあります。
- **ライブラリ**インテグレーションでは、[Datadog API][7] を使用して、記述言語 ([Node.js][8]、[Python][9] など) に基づいてアプリケーションを監視できます。

メトリクスを定義し、独自の社内システムから Datadog にメトリクスを送信する[カスタムチェック][10]を作成することもできます。

## インテグレーションの設定

Datadog Agent パッケージには、Datadog が公式にサポートしている[インテグレーションコア][11]が含まれています。これらのインテグレーションを使用するには、Datadog Agent をダウンロードします。コミュニティベースのインテグレーションは、[インテグレーションエクストラ][12]にあります。これらのインテグレーションのインストールおよび管理についての詳細は、[インテグレーション管理ガイド][14]をご参照ください。

### ヘルプ

Integration タイルを操作するには `manage_integrations` 権限が必要です。詳細については [RBAC ロール][45]を参照してください。

### API キーとアプリケーションキー

[Datadog Agent をインストール][15]するには、[API キー][16]が必要です。Agent が既にダウンロードされている場合は、`datadog.yaml` ファイルで API キーを設定してください。メトリクスとイベントの送信を除くと、Datadog の機能の大半は、使用するために[アプリケーションキー][16]が必要です。お客様のアカウントの API キーとアプリケーションキーは、[API 設定ページ][17]で管理できます。

### 構成

クローラーまたはライブラリベースのインテグレーションに接続する場合は、[インテグレーションのページ][18]から該当するプロバイダーのページに移動し、具体的な接続方法を参照してください。その他のサポートされているインテグレーションの場合は、[Datadog Agent][15] をインストールします。ほとんどのインテグレーションがコンテナ化 Agent ([Docker][19] および [Kubernetes][20]) でサポートされています。Agent をダウンロードしたら、[インテグレーション][18]のページに移動し、個々のインテグレーションの具体的な構成方法をご確認ください。

### Agent インテグレーションの構成

ほとんどの構成パラメーターは、[インテグレーション][18]ごとに異なります。Agent の構成ディレクトリのルートにある `conf.d` フォルダーに移動し、Agent インテグレーションを構成します。インテグレーションごとに `<INTEGRATION_NAME>.d` という名前のフォルダーがあり、そこには、`conf.yaml.example` ファイルが含まれています。このサンプルファイルには、特定のインテグレーションで使用できるすべての構成オプションが一覧表示されています。

特定のインテグレーションを有効にするには

1. `conf.yaml.example` ファイル (該当する `<INTEGRATION_NAME>.d` フォルダー内にある) の名前を `conf.yaml` に変更します。
2. 新しく作成された構成ファイル内の必須パラメーターを環境に応じた値で更新します。
3. [Datadog Agent を再起動][21]します。

**注**: すべての構成ファイルは、[@param 仕様][22]に記載されている形式に従います。

以下に、[apache インテグレーション][23]からメトリクスとログを収集するために必要な最小の `conf.yaml` 構成ファイルの例を示します。

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

同じ Agent チェックで複数の Apache インスタンスを監視するには、`instances` セクションに追加のインスタンスを追加します。

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### 収集間隔

Datadog の標準インテグレーションのデフォルトの収集間隔は 15 秒です。収集間隔を変更するには、パラメーター `min_collection_interval` を使用します。詳細は、[収集間隔の更新][24]を参照してください。

### タグ付け

タグ付けは、多くのソースで Datadog に入ってくるデータをフィルタリングおよび集計する上で重要な部分となります。タグ付けの詳細については、[タグの概要][25]を参照してください。

`datadog.yaml` ファイルでタグを定義すると、タグはすべてのインテグレーションデータに適用されます。`datadog.yaml` でタグを定義すると、すべての新しいインテグレーションがそれを継承します。

たとえば、コンフィギュレーションファイルで `service` を設定することは、個別の独立したシステムを監視するために推奨される [Agent 設定][26]となります。

環境をよりよく統合するために、Agent で `env` タグを構成することもお勧めします。詳細については、[統合サービスタグ付け][27]を参照してください。

デフォルトでは、インテグレーションによってレポートされるメトリクスには、環境から自動検出されたタグが含まれます。例えば、コンテナ内で実行される Redis チェックによってレポートされるメトリクスは、`image_name` のような、コンテナを参照するタグを含みます。この動作を無効にするには、`ignore_autodiscovery_tags` パラメーターを `true` に設定します。
```yaml
init_config:

ignore_autodiscovery_tags: true

# 残りの構成はここ
```

### 検証

Agent とインテグレーションのコンフィギュレーションを検証するには、[Agent の `status` サブコマンドを実行][28]し、Checks セクションで新しいコンフィギュレーションを見つけます。

## 複数インテグレーションのインストール

複数のインテグレーションをインストールする場合は、対応する `<INTEGRATIONS>.d` フォルダーで新しい `conf.yaml` ファイルに構成情報を追加する必要があります。`conf.yaml.example` ファイルで新しいインテグレーションの必須パラメーターを調べ、それを新しい `conf.yaml` ファイルに追加した後、上記の手順に従って構成を確認してください。

## 自動検出インテグレーション

[プロセス収集][29]を設定すると、Datadog はホストで実行されているテクノロジーを自動検出します。これにより、こうしたテクノロジーの監視に役立つ Datadog インテグレーションが識別されます。この自動検出されたインテグレーションは、[インテグレーション検索][2]に表示されます。

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="自動検出されたインテグレーション" >}}

各インテグレーションには、次の 3 つのステータスタイプのいずれかがあります。

- **Detected**: ホスト上でテクノロジーが実行されていますが、インテグレーションのインストールまたは構成が行われておらず、部分的なメトリクスのみが収集されています。完全にカバーできるようインテグレーションを構成してください。自動検出されたテクノロジーが実行されているホストの一覧を確認するには、インテグレーションタイルを開き、**Hosts** タブを選択します。
- **Detected**: このインテグレーションはホスト上にインストールされ、構成が完了しています。
- **Available**: *Installed** と **Detected** のカテゴリーに該当しないすべてのインテグレーション。

## セキュリティ対策

Datadog がユーザーデータを取り扱う方法など、セキュリティ上の注意事項については、[セキュリティガイド][30]を参照してください。

## 次のステップ

最初のインテグレーションの設定が完了したら、アプリケーションによって Datadog に送信される[すべてのメトリクスを調査][31]します。また、そのメトリクスを使用して[ダッシュボード][32]や[アラート][33]をセットアップし、データを監視できます。

Datadog [ログ管理][34]、[APM][35]、[Synthetic の監視][36] の各ソリューションも参照してください。

## ヘルプ

インテグレーションのトラブルシューティングでは、最初に、コードエディターでプラグインを使用するか、さまざまなオンラインツールのいずれかを使用して、YAML が有効であることを確認します。次に、[Agent のトラブルシューティング][37]の手順をすべて実行します。

引き続き問題が発生する場合は、[Datadog サポート][38]までお問い合わせください。

## 重要な用語

`conf.yaml`
: `conf.yaml` を作成する場所は、[Agent のコンフィギュレーションディレクトリ][39]のルートにある `conf.d/<INTEGRATION_NAME>.d` フォルダーです。このファイルを使用して、インテグレーションの設定を行うほか、インテグレーションからシステムへの接続を行います。

custom check
: 固有のシステムを監視する必要がある場合、またはインテグレーションから既に送信されたメトリクスを拡張したい場合は、メトリクスを定義して Datadog に送信する[カスタムチェック][10]を作成できます。ただし、一般に利用可能なアプリケーション、公開サービス、オープンソースプロジェクトなどを監視したい場合でも、そのインテグレーションが用意されていなければ、カスタムチェックではなく、[新しいインテグレーションの構築][1]をご検討ください。

`datadog.yaml`
: メインのコンフィギュレーションファイルです。このファイルで、Agent 全体が自身のインテグレーションやユーザーのシステムとやり取りする方法を定義します。このファイルを使用して、API キー、プロキシ、ホストタグなどのグローバル設定を更新します。

event
: イベントは、システムに関する情報メッセージです。これを[イベントエクスプローラー][40]で使用して、イベントに対するモニターを作成できます。

instance
: 監視対象が何であれ、そのインスタンスを `conf.yaml` ファイルで定義し、マップします。たとえば、[`http_check` インテグレーション][41]の場合は、アップタイムやダウンタイムを監視する HTTP エンドポイントのインスタンスに関連付けられた名前を定義します。同じインテグレーションで**複数のインスタンス**を監視できます。それには、`conf.yaml` ファイルでそれぞれのインスタンスを定義します。

`<INTEGRATION_NAME>.d`
: 構成が複雑な場合は、それを複数の `YAML` ファイルに分割した後、それらのファイルをすべて `<INTEGRATION_NAME>.d` フォルダーに格納して構成を定義することができます。Agent は、`<INTEGRATION_NAME>.d` フォルダー内の有効な `YAML` ファイルをすべて読み込みます。

logging
: 監視対象のシステムにログがある場合は、[ログ管理ソリューション][34]を使用して Datadog に送信するログをカスタマイズします。

`metadata.csv`
: 各インテグレーションによって収集されたメトリクスをリスト化して格納するファイルです。

metrics
: 各インテグレーションによってシステムから収集されるデータのリストです。各インテグレーションのメトリクスは、そのインテグレーションの `metadata.csv` ファイルにあります。メトリクスの詳細については、「開発ツール」の[メトリクス][42]のページを参照してください。[カスタムメトリクス][43]を設定することもできます。インテグレーションでそのまま使用できるメトリクスが提供されていない場合は、通常、カスタムメトリクスを追加します。

parameters
: `conf.yaml` ファイルのパラメーターを使用することで、インテグレーションデータソースと Agent の間のアクセスを制御できます。各インテグレーションの `conf.yaml.example` ファイルには、必須パラメーターと任意パラメーターのすべてがリストされています。

service check
: サービスチェックは、サービスの稼働時間の状況を追跡するために使用される一種のモニターです。詳細については、[サービスチェックガイド][44]をご参照ください。

tagging
: [タグ][25]を使用すると、メトリクスをカスタマイズし、ご自身に最適な形で絞り込んで表示できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /ja/integrations/slack/
[4]: /ja/integrations/amazon_web_services/
[5]: /ja/integrations/azure/
[6]: /ja/integrations/pagerduty/
[7]: /ja/api/
[8]: /ja/integrations/node/
[9]: /ja/integrations/python/
[10]: /ja/developers/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /ja/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /ja/account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /ja/integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /ja/agent/guide/agent-commands/#restart-the-agent
[22]: /ja/developers/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /ja/developers/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /ja/getting_started/tagging/
[26]: /ja/getting_started/agent/#setup
[27]: /ja/getting_started/tagging/unified_service_tagging/
[28]: /ja/agent/guide/agent-commands/#agent-status-and-information
[29]: /ja/infrastructure/process/
[30]: /ja/data_security/
[31]: /ja/metrics/explorer/
[32]: /ja/dashboards/
[33]: /ja/monitors/
[34]: /ja/logs/
[35]: /ja/tracing/
[36]: /ja/synthetics/
[37]: /ja/agent/troubleshooting/
[38]: /ja/help/
[39]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /ja/metrics/
[43]: /ja/metrics/custom_metrics/
[44]: /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /ja/account_management/rbac/permissions/#integrations