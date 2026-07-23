---
description: Datadog Agent をインストールおよび構成して、ホストからシステムレベルのメトリクス、イベント、およびログを収集するためのガイドです。
further_reading:
- link: agent/
  tag: ドキュメント
  text: Datadog Agent
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インフラストラクチャー監視を強化するためのインタラクティブセッションに参加してください。
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: ブログ
  text: Datadog を使用して AWS Lambda マネージドインスタンスを監視します。
title: Agent の概要
---
## 概要 {#overview}

このガイドでは、Datadog Agent を紹介し、以下の内容をカバーします:

  - [ Agent の紹介 ](#what-is-the-datadog-agent)
  - [ インストール ](#installation)
  - [ Agent によって収集されたデータ ](#data-collected-by-the-agent)
  - [ 高度な構成と機能 ](#advanced-configurations-and-features)
  - [ トラブルシューティング ](#troubleshooting)


## Datadog Agent とは？{#what-is-the-datadog-agent}

Datadog Agent はホスト上で動作するソフトウェアです。ホストからイベントとメトリクスを収集し、それらを Datadog に送信します。そこで、モニタリングとパフォーマンスデータを分析できます。

Agent は以下の環境で実行できます:
- ローカルホスト (Windows、Linux、macOS) 
- コンテナ化された環境 (Docker、Kubernetes)
- オンプレミスのデータセンター 

Chef、Puppet、または Ansible などの構成管理ツールを使用して、Agent をインストールおよび構成することもできます。

Agent は、15～20 秒ごとに 75～100 のシステムレベルのメトリクスを収集できます。追加の構成を行うことで、実行中のプロセスから Datadog にライブデータ、ログ、およびトレースを送信できます。Datadog Agent はオープンソースであり、そのソースコードは GitHub の [DataDog/datadog-agent][1] で入手できます。

### Agent 構成ファイル {#the-agent-configuration-file}

Agent のメイン設定ファイルは `datadog.yaml` です。必要なパラメータは次のとおりです。
- [Datadog API キー][16]。Agent のデータを組織と関連付けるために使用されます。
- [Datadog site][41] ({{< region-param key="dd_site" code="true" >}})。

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][23] を参照してください。Agent の設定ファイルを調整することで、他の Datadog 機能を活用できます。


## インストール {#installation}

### 前提条件 {#prerequisites}
1. [Datadog アカウント][15] を作成します。

2. [Datadog API キー][16] を手元に用意します。

### セットアップ {#setup}

[Fleet Automation][39] を使用して、Datadog のアプリ内ワークフローを利用し、単一のホストまたは大規模環境で Datadog Agent をインストール、アップグレード、構成、トラブルシューティングします。

特定のプラットフォームに対する追加のAgent構成については、[Agent ドキュメント][40] を参照してください。


## Agent によって収集されたデータ {#data-collected-by-the-agent}

インフラストラクチャーの完全な可視性を提供するために、Datadog Agent は自身の健康状態と構成に関するメトリクス、ならびにデフォルトのチェックを通じてホストやサービスから収集されたメトリクスを報告します。

### Agent メトリクス {#agent-metrics}

Agent は自身に関する以下のメトリクスを Datadog に報告します。これらのメトリクスは、どのホストまたはコンテナに Agent が稼働しているか、各 Agent がいつ開始されたか、Agent が使用している Python のバージョンに関する情報を提供します。

| メトリクス                           | 説明                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Agent が実行中であり Datadog に報告している場合、値 `1`。Agent のバージョンのタグ付き。 |
| `datadog.agent.started`        |  Agent の起動ごとに `1` をカウント。   |
| `datadog.agent.python.version` | 値 `1`、Python のバージョンのタグ付き。    |


Agent メトリクスの全リストは、[Agent メトリクス][3]のインテグレーションをご覧ください。

### チェック {#checks}

一部のプラットフォームの Agent では、メトリクスを収集するいくつかのコアチェックがデフォルトで有効になっています。

| チェック       | メトリクス       | プラットフォーム          |
| ----------- | ------------- | ------------------ |
| CPU         | [システム][4]  | すべて                |
| ディスク        | [ディスク][5]    | すべて                |
| IO          | [システム][4]  | すべて                |
| メモリ      | [システム][4]  | すべて                |
| ネットワーク     | [ネットワーク][6] | すべて                |
| NTP         | [NTP][7]     | すべて                |
| アップタイム      | [システム][4]  | すべて                |
| ファイルハンドル | [システム][4]  | Mac を除くすべて     |
| ロード        | [システム][4]  | Windows を除くすべて |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

他のテクノロジーからメトリクスを収集する方法については、[Integrations][9]のページを参照してください。



### サービスチェック {#service-checks}

Agent は、以下のサービスチェックを行うように設定されています。

  - `datadog.agent.up`: Agent が Datadog に接続すると **OK** を返します。
  - `datadog.agent.check_status`: Agent チェックが Datadog にメトリクスを送信できない場合は **CRITICAL** を返し、それ以外は **OK** を返します。

これらのチェックは、Datadog でモニターやダッシュボードを通じて Agent の状態を一目で視覚化するために使用できます。詳細については、[サービスチェックの概要][21] を参照してください。


## 高度な構成と機能 {#advanced-configurations-and-features}

{{% collapse-content title="ホスト用 Agent とコンテナ用 Agent の相違点" level="h4" expanded=false id="id-for-anchoring" %}}

ホストに Agent をインストールすることと、コンテナ環境にインストールすることには重要な違いがあります:

- **設定の違い**:
    - **ホスト**: gent は YAML ファイルを使用して設定されます。
    - **コンテナ**: 設定オプションは [環境変数][10] を使用して渡されます。たとえば:
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **統合の検出**:
    - **ホスト**: [統合][9] は Agent の設定ファイルを通じて特定されます。
    - **コンテナ**: Integrations は Datadog の Autodiscovery 機能を使用して自動的に特定されます。[基本的な Agent Autodiscovery][11] を参照して、詳細を学んでください。

さらに、コンテナ環境で Agent を実行するためのチュートリアルについては、[Docker Agent][12] または [Kubernetes][13] を参照してください。
{{% /collapse-content %}} 


{{% collapse-content title="Agent のコンフィギュレーションファイルによるタグの設定" level="h4" expanded=false id="id-for-anchoring" %}}

タグは、メトリクスやイベントに追加のメタデータ層を追加します。これにより、Datadog のビジュアライゼーションでデータのスコープを設定し、比較することができます。複数のホストから Datadog にデータが送信されるとき、この情報にタグを付けることで、視覚化に最も興味のあるデータに絞り込むことができます。

たとえば、異なるチームから収集したデータを持っていて、チーム・アルファのメトリクスだけを見たい場合、特定のホストに `team:alpha` または `team:bravo` タグを付けると、`team:alpha` タグが付いているメトリクスにフィルターがかかるようになります。タグ付けの詳細については、[タグの使用を開始する][24]を参照してください。

1. Agent の [メイン設定ファイル][25] を見つけてください。Ubuntu の場合、ファイルの場所は `/etc/datadog-agent/datadog.yaml` です。

2. `datadog.yaml` ファイルの中で、`tags` パラメータを見つけてください。ホストレベルのタグは、`datadog.yaml` の設定で行うことにより、このホストから転送されるすべてのメトリクス、トレース、およびログに適用できます。

   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   # tags:
   #   - team:infra
   #   - <TAG_KEY>:<TAG_VALUE>
   ```

3. タグパラメータと提供された例の `team:infra` タグのコメントアウトの解除を行います。独自のカスタムタグを追加することもできます。たとえば、`test:agent_walkthrough`のように。
   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   tags:
      - team:infra
      - test:agent_walkthrough
   ```

4. エージェントの [再起動コマンド][26] を実行して、エージェントを再起動します。Ubuntuの再起動コマンド:

   ```shell
   sudo service datadog-agent restart
   ```

5. 数分後、再度[Metrics Summaryページ][22]に移動し、メトリック `datadog.agent.started` をクリックします。デフォルトの`host`および`version`タグに加えて、`team`タグや追加した個人タグも表示されます。ページの上部にある`Tag`フィールドでメトリクスをフィルタリングすることもできます。

6. [Events Explorer ページ][20]で、最新の Agent イベントとともに表示されるカスタムタグを見つけます。

{{% /collapse-content %}} 

{{% collapse-content title="Datadog UIでメトリクスを見つける" level="h4" expanded=false id="id-for-anchoring" %}}

Datadog UIでデフォルトのメトリクスを確認することで、エージェントが正しく動作しているかを確認できます。[Metrics Summaryページ][22]に移動し、メトリック`datadog.agent.started`またはメトリック`datadog.agent.running`を検索します。これらのメトリクスがすぐに表示されない場合、エージェントがデータをDatadogに送信するのに数分かかることがあります。

いずれかのメトリクスをクリックすると、メトリクスパネルが開きます。このパネルには、これらのメトリクスが収集される場所に関する追加のメタデータや関連するタグが表示されます。ホストにタグが設定されていない場合、Datadogがメトリクスに割り当てるデフォルトのタグのみが表示されるはずです。これには`version`および`host`が含まれます。タグを追加する方法については、エージェントの設定ファイルを通じてタグを設定するセクションを参照してください。

`ntp.offset` や `system.cpu.idle` など、他のデフォルトメトリクスを探索してください。
{{% /collapse-content %}} 


{{% collapse-content title="Agent のオーバーヘッド" level="h4" expanded=false id="id-for-anchoring" %}}

エージェントが占有するスペースとリソースの量は、設定やエージェントが送信するデータによって異なります。最初は、平均して約0.08%のCPUが使用され、ディスクスペースは約880MBから1.3GBになります。

これらのベンチマークについて詳しくは、[Agent Overhead][2] を参照してください。
{{% /collapse-content %}}

{{% collapse-content title="追加のコンフィギュレーションオプション" level="h4" expanded=false id="id-for-anchoring" %}}

[ログ][27]、[トレース][28]、および[プロセス][29]データの収集は、エージェントの設定ファイルを通じて有効にできます。これらの機能はデフォルトでは有効になっていません。たとえば、設定ファイルでは、`logs_enabled`パラメータがfalseに設定されています。

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
#
# logs_enabled: false
```

Agent コンフィギュレーションファイルを通じて構成可能なその他の Datadog 機能は以下の通りです。
- [OTLP トレース取り込み][30] を有効にする
- [ログ収集のカスタマイズ][31] で機密データをフィルターまたはスクラブする
- [DogStatsD][32] によるカスタムデータの構成

セットアップ中、ドキュメントが `datadog.yaml` ファイルまたはエージェントの設定ファイルに言及している場合、このファイルを構成する必要があります。

{{% /collapse-content %}} 


## コマンド {#commands}

Agent を[起動][34]、[停止][35] または [再起動][26]する方法については、[Agent のコマンド][33]を参照してください。

## トラブルシューティング {#troubleshooting}

Agent のトラブルシューティングに関するヘルプ

- [Agent のトラブルシューティング][36] を参照してください。
- [Agent のログファイル][37] を確認してください。
- [Datadog サポート][38] にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## 次のステップ {#next-steps}

{{< whatsnext desc="エージェントがインストールされた後:">}}
{{< nextlink href="/getting_started/integrations" >}}Integrations について学ぶ{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Datadog UI について学ぶ{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}エージェントを通じてログを収集する方法を学ぶ{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}エージェントを通じてトレースを収集する方法を学ぶ{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /ja/agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[3]: /ja/integrations/agent_metrics/
[4]: /ja/integrations/system/#metrics
[5]: /ja/integrations/disk/#metrics
[6]: /ja/integrations/network/#metrics
[7]: /ja/integrations/ntp/#metrics
[8]: /ja/agent/docker/data_collected/#metrics
[9]: /ja/getting_started/integrations/
[10]: /ja/agent/guide/environment-variables/#overview
[11]: /ja/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[12]: /ja/agent/docker/?tab=standard
[13]: /ja/agent/kubernetes/installation?tab=operator
[14]: /ja/getting_started/agent/#checks
[15]: https://www.datadoghq.com
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: /ja/agent/supported_platforms
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /ja/extend/service_checks/#visualize-your-service-check-in-datadog
[22]: https://app.datadoghq.com/metric/summary
[23]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[24]: /ja/getting_started/tagging/
[25]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[26]: /ja/agent/configuration/agent-commands/#restart-the-agent
[27]: /ja/logs/
[28]: /ja/tracing/
[29]: /ja/infrastructure/process/?tab=linuxwindows#introduction
[30]: /ja/opentelemetry/otlp_ingest_in_the_agent/?tab=host
[31]: /ja/agent/logs/advanced_log_collection/
[32]: /ja/extend/dogstatsd/?tab=hostagent
[33]: /ja/agent/configuration/agent-commands/
[34]: /ja/agent/configuration/agent-commands/#start-the-agent
[35]: /ja/agent/configuration/agent-commands/#stop-the-agent
[36]: /ja/agent/troubleshooting/
[37]: /ja/agent/configuration/agent-log-files/
[38]: /ja/help/
[39]: /ja/agent/fleet_automation/
[40]: /ja/agent/?tab=Host-based
[41]: /ja/getting_started/site/