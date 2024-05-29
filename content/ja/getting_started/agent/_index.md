---
further_reading:
- link: /agent/basic_agent_usage/
  tag: ドキュメント
  text: 基本的な Agent の利用方法
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インフラストラクチャーモニタリングをパワーアップさせるインタラクティブなセッションに参加できます
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
kind: documentation
title: Agent の概要
---

このガイドでは、Agent の紹介と、Agent を使用して Datadog プラットフォームにシステムレベルのメトリクスを送信する方法について説明します。また、Ubuntu 上での Agent のインストール例についても説明します。以下の内容をカバーしています。

  - Agent のインストール
  - Agent が起動していることを確認する
  - Agent の機能を構成する
  - トラブルシューティングリソース

## 概要

### Agent について

Datadog Agent は、ホスト上で実行されるソフトウェアです。ホストからイベントやメトリクスを収集し、Datadog に送信し、モニタリングやパフォーマンスデータを分析することができます。ローカルホスト (Windows、MacOS)、コンテナ環境 (Docker、Kubernetes)、オンプレミスデータセンターで実行することが可能です。構成管理ツール (Chef、Puppet、Ansible) を使って、インストールと構成が可能です。

Agent は、15～20 秒ごとに 75～100 のシステムレベルメトリクスを収集することができます。また、追加の構成により、Agent は実行中のプロセスからライブプロセスデータ、ログ、トレースを Datadog プラットフォームに送信することができます。Datadog Agent はオープンソースで、ソースコードは GitHub の [DataDog/datadog-agent][1] で公開されています。

### Agent のオーバーヘッド

Agent が占有するスペースとリソースの量は、構成と Agent が送信するように構成されているデータによって異なります。初期状態では、平均して約 0.08% の CPU 使用率と、約 880MB から 1.3GB のディスクスペースが見込まれます。

これらのベンチマークについて詳しくは、[Agent Overhead][2] を参照してください。

### 収集データ

#### Agent メトリクス

以下の Agent メトリクスは、Agent が Datadog に送信する自分自身に関する情報であり、どのホストやコンテナで Agent が動作しているか、Agent がいつ起動するか、どのバージョンの Python が動作しているかなどを判断することができます。

| メトリクス                           | 説明                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | Agent が Datadog に報告中の場合は、値 `1` が表示されます。メトリクスには `python_version` がタグ付けされています。 |
| `datadog.agent.running`        | Agent が Datadog に報告中の場合は、値 `1` が表示されます。                                                 |
| `datadog.agent.started`        | Agent 起動時に値 `1` で送信されるカウント (v6.12 以上で使用可能)。                                        |

Agent メトリクスの全リストは、[Agent メトリクス][3]のインテグレーションをご覧ください。

#### チェック

一部のプラットフォームの Agent では、メトリクスを収集するいくつかのコアチェックがデフォルトで有効になっています。

| チェック       | メトリクス       | プラットフォーム          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | すべて                |
| ディスク        | [Disk][5]    | すべて                |
| IO          | [System][4]  | すべて                |
| メモリ      | [System][4]  | すべて                |
| ネットワーク     | [Network][6] | すべて                |
| NTP         | [NTP][7]     | すべて                |
| アップタイム      | [System][4]  | All                |
| ファイル処理 | [System][4]  | Mac 以外のすべて     |
| ロード        | [System][4]  | Windows 以外のすべて |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

他のテクノロジーからメトリクスを収集する方法については、[インテグレーション][9]のページを参照してください。

## ホスト用 Agent とコンテナ用 Agent の相違点

このガイドでは、ホストへの Agent のインストールと構成を説明します。最終的にコンテナ環境に Agent をインストールする予定がある場合、いくつか知っておくべき相違点があります。

1. ホストでは、Agent は YAML ファイルを使用して構成されます (このガイドの後半で説明します)。一方、コンテナの Agent の構成オプションは、[環境変数][10]で渡されます。たとえば、以下のようになります。
    - `DD_API_KEY` は Datadog API キー用
    - `DD_SITE` は Datadog サイト用

2. 同様に、ホスト上では、[インテグレーション][9]は Agent 構成ファイルを通して特定されますが、コンテナ環境では、Datadog のオートディスカバリー機能によりインテグレーションが自動的に特定されます。詳しくは、[基本的な Agent のオートディスカバリー][11]を参照してください。

コンテナ環境で Agent を実行するためのチュートリアルは、[Docker Agent][12] または [Kubernetes][13] を参照してください。

## なぜ Agent をインストールする必要があるのですか？

Agent ベースのインテグレーションからデータを送信するには、Agent をインストールする必要があります。Agent は必ずしも Datadog プラットフォームにデータを転送することを求められておらず、例えば、ログやメトリクスの送信は Datadog API を通じて行うことができます。しかし、Agent は Datadog プラットフォームにデータを転送する方法として推奨されています。

Agent は 15 秒ごとにホストデータを収集し、環境全体で何が起こっているかを正確に把握することができます。[チェック][14]のセクションで述べたように、Agent は 50 以上のデフォルトメトリクスを収集するいくつかのチェックを有効にし、システムレベルのデータについてより深い洞察を提供します。

## セットアップ

### 前提条件

1. [Datadog アカウント][15]を作成します。

2. [Datadog API キー][16]を手元に用意します。

3. Datadog の UI を開いておきます。

**注**: このチュートリアルでは、Ubuntu オペレーティングシステムを使用しています。サポートされているプラットフォームの全リストは、[基本的な Agent の利用方法][17]ページを参照してください。

### インストール

Datadog UI で [Agent Installation ページ][18]に移動し、**Ubuntu** をクリックします。ホストに Datadog Agent をインストールするには、そのページから 1 行のインストールコマンド (下図の例) を使用し、[Datadog API キー][16]で更新します。

Ubuntu の 1 行インストールコマンドの例:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[Agent Installation ページ][18]を使用して、お使いのオペレーティングシステムの最新のインストール手順を参照してください。

### 検証

#### ターミナルコマンド

インストールを検証するには、Agent の[ステータスコマンド][19]を実行します。

```shell
sudo datadog-agent status
```
インストールに成功すると、次のような Agent 情報で始まる Agent Status レポートが返されます。

```text
===============
Agent (v7.36.1)
===============

  Status date: 2022-06-15 15:54:48.364 EDT / 2022-06-15 19:54:48.364 UTC (1655322888364)
  Agent start: 2022-06-15 15:54:29.85 EDT / 2022-06-15 19:54:29.85 UTC (1655322869850)
  Pid: 9801
  Go Version: go1.17.6
  Python Version: 3.8.11
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 6
  Log Level: info
```

#### イベント

Datadog UI で [Events Explorer ページ][20]に移動します。Agent が起動または再起動されると、Agent は Datadog にイベントを送信します。Agent が正常にインストールされると、以下のメッセージが表示されます。

```text
Datadog agent (v. 7.XX.X) started on <Hostname>
```

#### サービスチェック

Agent は、以下のサービスチェックを行うように設定されています。

  - `datadog.agent.up`:
    Agent が Datadog に接続した場合、`OK` を返します。

  - `datadog.agent.check_status`:
    Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

これらのチェックは、Datadog プラットフォームで使用することで、モニターやダッシュボードを通じて Agent のステータスを一目で視覚化することができます。詳しくは、[サービスチェックの概要][21]を参照してください。

#### メトリクス

Datadog UI で、[Metrics Summary ページ][22]に移動し、メトリクス `datadog.agent.started` または メトリクス `datadog.agent.running` を検索してください。これらのメトリクスがすぐに表示されない場合、Agent が Datadog プラットフォームにデータを送信するのに数分かかることがあります。

いずれかのメトリクスをクリックすると、Metric パネルが開きます。このパネルには、これらのメトリクスがどこから収集されたか、および関連するタグに関する追加のメタデータが表示されます。このチュートリアルでは今のところ、このホストにはタグが構成されていないため、`version` や `host` など、Datadog がメトリクスに割り当てるデフォルトのタグだけが表示されるはずです。タグを追加する方法については、次の Agent コンフィギュレーションファイルのセクションを参照してください。

`ntp.offset` や `system.cpu.idle` など、他のデフォルトメトリクスも調べてみてください。

## Agent 構成ファイル

Agent の主なコンフィギュレーションファイルは `datadog.yaml` です。必要なパラメーターは以下の通りです。
- [Datadog API キー][16]。Agent のデータを組織と関連付けるために使用されます。
- Datadog サイト ({{< region-param key="dd_site" code="true" >}})

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][23]を参照してください。

Agent のコンフィギュレーションファイルを調整することで、タグを含む他の Datadog の機能を利用することができます。

#### Agent のコンフィギュレーションファイルによるタグの設定

タグは、メトリクスとイベントにメタデータの追加レイヤーを追加します。これにより、Datadog の視覚化において、データのスコープと比較ができるようになります。複数のホストから Datadog にデータが送信された場合、この情報をタグ付けすることで、最も視覚化したいデータにスコープを絞ることができます。

例えば、異なるチームから収集したデータを持っていて、チーム・アルファのメトリクスだけを見たい場合、特定のホストに `team:alpha` または `team:bravo` タグを付けると、`team:alpha` タグが付いているメトリクスにフィルターがかかるようになります。タグ付けの詳細については、[タグの使用を開始する][24]を参照してください。

1. Agent の[メインコンフィギュレーションファイル][25]を探します。Ubuntu の場合、ファイルの場所は `/etc/datadog-agent/datadog.yaml` です。

2. `datadog.yaml` ファイルで、`tags` パラメーターを探します。ホストレベルのタグを `datadog.yaml` 構成で設定すると、このホストから転送される全てのメトリクス、トレース、ログにタグを適用することができます。

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

3. tags パラメーターと、例として提供されている `team:infra` タグのコメントを解除します。また、例えば `test:agent_walkthrough` のように、独自のタグを追加することもできます。
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

4. Agent の [restart コマンド][26]を実行して、Agent を再起動します。Ubuntu の restart コマンド:

   ```shell
   sudo service datadog-agent restart
   ```

5. 数分後、再び [Metrics Summary ページ][22]に移動し、メトリクス `datadog.agent.started` をクリックします。デフォルトの `host` と `version` タグに加えて、`team` タグや追加した個人用タグも表示されます。また、ページ上部にある `Tag` フィールドでメトリクスをフィルターすることもできます。

6. [Events Explorer ページ][20]で、最新の Agent イベントとともに表示されるカスタムタグを見つけます。

#### その他の構成オプション

[ログ][27]、[トレース][28]、[プロセス][29]のデータ収集は、Agent コンフィギュレーションファイルから有効にすることができます。これらは、デフォルトで有効になっている機能ではありません。例えば、コンフィギュレーションファイルで、`logs_enabled` パラメーターは false に設定されています。

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - ブール値 - オプション - デフォルト: false
## @env DD_LOGS_ENABLED - ブール値 - オプション - デフォルト: false
## logs_enabled を true に設定し、Datadog Agent のログ収集を有効にします。
#
# logs_enabled: false
```

Agent コンフィギュレーションファイルを通じて構成可能なその他の Datadog 機能は以下の通りです。
- [OTLP トレース取り込み][30]を有効にする
- [ログ収集のカスタマイズ][31]で機密データをフィルターまたはスクラブする
- [DogStatsD][32] によるカスタムデータの構成

セットアップ中、ドキュメントが `datadog.yaml` ファイルまたは Agent コンフィギュレーションファイルに言及している場合、このファイルを構成する必要があります。

## コマンド

Agent を[起動][34]、[停止][35] または [再起動][26]する方法については、[Agent のコマンド][33]を参照してください。

## トラブルシューティング

Agent のトラブルシューティングに関するヘルプ

- [Agent のトラブルシューティング][36]を参照してください。
- [Agent のログファイル][37]を確認してください。
- [Datadog のサポートチーム][38]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<p>

## 次のステップ

{{< whatsnext desc="Agent のインストール後:">}}
{{< nextlink href="/getting_started/integrations" >}}インテグレーションについて{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Datadog の UI について{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Agent によるログの収集方法について{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Agent によるトレースの収集方法について{{< /nextlink >}}
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
[17]: /ja/agent/basic_agent_usage/?tab=agentv6v7
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /ja/developers/service_checks/#visualize-your-service-check-in-datadog
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
[32]: /ja/developers/dogstatsd/?tab=hostagent
[33]: /ja/agent/configuration/agent-commands/
[34]: /ja/agent/configuration/agent-commands/#start-the-agent
[35]: /ja/agent/configuration/agent-commands/#stop-the-agent
[36]: /ja/agent/troubleshooting/
[37]: /ja/agent/configuration/agent-log-files/
[38]: /ja/help/