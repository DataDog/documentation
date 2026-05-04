---
description: システムレベルのメトリクス、イベント、およびホストからのログを収集するための Datadog Agent のインストールと構成に関するガイド。
further_reading:
- link: agent/
  tag: よくあるご質問
  text: Datadog Agent
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インフラストラクチャ監視を強化するためのインタラクティブセッションに参加してください。
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: 英語ブログ
  text: Datadog を使用して AWS Lambda マネージドインスタンスを監視します。
title: Agent の概要
---
概要

このガイドでは、Datadog Agent を紹介し、以下の内容をカバーします：

  - [Agent の紹介](#what-is-the-datadog-agent)
  インストール
  - [Agent によって収集されたデータ](#data-collected-by-the-agent)
  - [高度な構成と機能](#advanced-configurations-and-features)
  トラブルシューティング


## Datadog Agent とは？{#what-is-the-datadog-agent}

Datadog Agent はホスト上で動作するソフトウェアです。ホストからイベントとメトリクスを収集し、それらを Datadog に送信します。そこで、モニタリングとパフォーマンスデータを分析できます。

Agent は以下の環境で実行できます：
- ローカルホスト（Windows、macOS） 
- コンテナ化された環境（Docker、Kubernetes）
- オンプレミスのデータセンター 

Chef、Puppet、または Ansible などの構成管理ツールを使用して Agent をインストールおよび構成することもできます。

Agent は 15-20 秒ごとに 75-100 のシステムレベルのメトリクスを収集できます。追加の構成を行うことで、実行中のプロセスから Datadog にライブデータ、ログ、およびトレースを送信できます。Datadog Agent はオープンソースであり、そのソースコードは GitHub の [DataDog/datadog-agent][1] で入手できます。

###Agent 構成ファイル {#the-agent-configuration-file}

Agent のメイン構成ファイルは `datadog.yaml` です。必要なパラメータは次のとおりです：
- あなたの [Datadog API キー][16]。これは Agent のデータをあなたの組織と関連付けるために使用されます。
- あなたの [Datadog サイト][41] （{{< region-param key="dd_site" code="true" >}}

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][23] を参照してください。Agent の構成ファイルを調整することで、他の Datadog 機能を利用することができます。


##インストール

前提条件
[Datadog アカウント][15]を作成します。

2.[Datadog API キー][16]を手元に用意します。

###セットアップ

[Fleet Automation][39] を使用して、Datadog のアプリ内ワークフローを利用し、単一のホストまたはスケールで Datadog Agent をインストール、アップグレード、構成、トラブルシューティングします。

特定のプラットフォームに対する追加の Agent 構成については、[Agent ドキュメント][40] を参照してください。


##Agent によって収集されたデータ {#data-collected-by-the-agent}

インフラストラクチャの完全な可視性を提供するために、Datadog Agent は自身の健康状態と構成に関するメトリクス、ならびにデフォルトチェックを通じてホストやサービスから収集されたメトリクスを報告します。

###Agent: メトリクス

Agent は自身に関する以下のメトリクスを Datadog に報告します。これらのメトリクスは、どのホストまたはコンテナに実行中の Agent があるか、各 Agent がいつ開始されたか、Agent が使用している Python のバージョンに関する情報を提供します。

|メトリクスの説明
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Agent が Datadog に報告中の場合は、値 `1` が表示されます。                   |
| `datadog.agent.started`        | Agent 起動時に値 `1` で送信されるカウント (v6.12 以上で使用可能)。   |
| `datadog.agent.python.version` | メトリクスは `python_version` でタグ付けされています。    |


Agent メトリクスの全リストは、[Agent メトリクス][3]のインテグレーションをご覧ください。

###Checks

一部のプラットフォームの Agent では、メトリクスを収集するいくつかのコアチェックがデフォルトで有効になっています。

|チェック | メトリクス | プラットフォーム |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | All                |
| ディスク | [ディスク][5] | すべて |
| IO          | [System][4]  | All                |
| メモリ | [システム][4] | すべて |
| ネットワーク | [ネットワーク][6] | すべて |
| NTP         | [NTP][7]     | All                |
| アップタイム | [システム][4] | すべて |
| ファイルハンドル | [システム][4] | Mac を除くすべて |
| ロード | [システム][4] | Windows を除くすべて |
| Docker | [Docker][8] | Docker |
| Winproc     | [システム][4]  | Windows            |

他のテクノロジーからメトリクスを収集する方法については、[インテグレーション][9]のページを参照してください。



###service-checks

Agent は、以下のサービスチェックを行うように設定されています。

  Agent が Datadog に接続した場合、`OK` を返します。
  Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

これらのチェックは、Datadog でエージェントのステータスをモニターやダッシュボードで一目で視覚化するために使用できます。[サービスチェックの概要][21]を参照して、詳細を学んでください。


##高度な設定と機能 {#advanced-configurations-and-features}

{{% collapse-content title="ホスト用エージェントとコンテナ用エージェントの違い" level="h4" expanded=false id="id-for-anchoring" %}}

ホストにエージェントをインストールする場合とコンテナ化された環境でインストールする場合の主な違いは次のとおりです：

- **設定の違い**：
    - **ホスト**：エージェントは YAML ファイルを使用して構成されます。
    - **コンテナ**：構成オプションは [環境変数][10] を使用して渡されます。例えば：
    
    ```sh
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **統合の検出**：
    - **ホスト**：[統合][9] はエージェントの構成ファイルを通じて特定されます。
    - **コンテナ**：統合は Datadog の自動検出機能を使用して自動的に特定されます。[基本的なエージェントの自動検出][11]を参照して、詳細を学んでください。

さらに、コンテナ化された環境でエージェントを実行するためのチュートリアルは、[Docker エージェント][12] または [Kubernetes][13] を参照してください。
{{% /collapse-content %}} 


{{% collapse-content title="Agent のコンフィギュレーションファイルによるタグの設定" level="h4" expanded=false id="id-for-anchoring" %}}

タグは、メトリクスやイベントに追加のメタデータ層を追加します。これにより、Datadog の視覚化でデータの範囲を絞り、比較することができます。複数のホストから Datadog にデータが送信されるとき、この情報にタグを付けることで、視覚化に最も興味のあるデータに絞り込むことができます。

例えば、異なるチームから収集したデータを持っていて、チーム・アルファのメトリクスだけを見たい場合、特定のホストに `team:alpha` または `team:bravo` タグを付けると、`team:alpha` タグが付いているメトリクスにフィルターがかかるようになります。データのタグ付けについての詳細は、[タグの使用を開始する][24]を参照してください。

1.エージェントの [メイン構成ファイル][25] を見つけてください。Ubuntuの場合、ファイルの場所は`/etc/datadog-agent/datadog.yaml`です。

2.`datadog.yaml`ファイル内で、`tags`パラメータを見つけてください。ホストレベルのタグは、すべてのメトリクス、トレース、およびこのホストから転送されるログにタグを適用するために、`datadog.yaml`構成で設定できます。

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

3. タグパラメータと提供された例の`team:infra`タグのコメントを解除してください。独自のカスタムタグを追加することもできます。例えば、`test:agent_walkthrough`です。
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

4. エージェントの[再起動コマンド][26]を実行して、エージェントを再起動してください。Ubuntuの再起動コマンド：

   ```shell
   sudo service datadog-agent restart
   ```

5. 数分後、再度[メトリクスサマリーページ][22]に移動し、メトリクス`datadog.agent.started`をクリックしてください。デフォルトの`host`および`version`タグに加えて、`team`タグや追加した個人タグも表示されます。ページの上部で`Tag`フィールドによってメトリクスをフィルタリングすることもできます。

6.[Events Explorer ページ][20]で、最新の Agent イベントとともに表示されるカスタムタグを見つけます。

{{% /collapse-content %}} 

{{% collapse-content title="Datadog UIでメトリクスを見つける" level="h4" expanded=false id="id-for-anchoring" %}}

Datadog UIでデフォルトのメトリクスを確認することで、エージェントが正しく動作しているか確認できます。[メトリクスサマリーページ][22]に移動し、メトリクス`datadog.agent.started`またはメトリクス`datadog.agent.running`を検索してください。これらのメトリクスがすぐに表示されない場合、エージェントがデータをDatadogに送信するのに数分かかることがあります。

メトリクスのいずれかをクリックすると、メトリクスパネルが開きます。このパネルには、これらのメトリクスが収集される場所や関連するタグに関する追加のメタデータが表示されます。ホストにタグが設定されていない場合、Datadogがメトリクスに割り当てるデフォルトのタグのみが表示されるはずです。これには`version`および`host`が含まれます。タグをエージェントの構成ファイルを通じて設定する方法については、上記のセクションを参照してください。

`ntp.offset`や`system.cpu.idle`などの他のデフォルトメトリクスを探索してください。
{{% /collapse-content %}} 


{{% collapse-content title="Agent のオーバーヘッド" level="h4" expanded=false id="id-for-anchoring" %}}

エージェントが占有するスペースとリソースの量は、構成とエージェントが送信するデータによって異なります。最初は、平均して約0.08%のCPU使用率と、約880MBから1.3GBのディスクスペースを期待できます。

これらのベンチマークについて詳しくは、[Agent Overhead][2] を参照してください。
{{% /collapse-content %}}

{{% collapse-content title="追加のコンフィギュレーションオプション" level="h4" expanded=false id="id-for-anchoring" %}}

[ログ][27]、[トレース][28]、および[プロセス][29]データの収集は、Agentの設定ファイルを通じて有効にできます。これらの機能はデフォルトでは有効になっていません。例えば、設定ファイルでは、`logs_enabled`パラメータがfalseに設定されています。

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
[OTLP トレース取り込み][30]を有効にする
[ログ収集のカスタマイズ][31]で機密データをフィルターまたはスクラブする
[DogStatsD][32] によるカスタムデータの構成

セットアップ中、ドキュメントが`datadog.yaml`ファイルまたはAgentの設定ファイルに言及している場合、このファイルを構成する必要があります。

{{% /collapse-content %}} 


commands:

Agent を[起動][34]、[停止][35] または [再起動][26]する方法については、[Agent のコマンド][33]を参照してください。

##トラブルシューティング

Agent のトラブルシューティングに関するヘルプ

[Agent のトラブルシューティング][36]を参照してください。
[Agent のログファイル][37]を確認してください。
[Datadog サポート][7] にお問い合わせください。

参考資料

{{< partial name="whats-next/whats-next.html" >}}

<p>

次のステップ

{{< whatsnext desc="Agentがインストールされた後：">}}
{{< nextlink href="/getting_started/integrations" >}}インテグレーションについて{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Datadog UIについて学ぶ{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Agentを通じてログを収集する方法を学ぶ{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Agentを通じてトレースを収集する方法を学ぶ{{< /nextlink >}}
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