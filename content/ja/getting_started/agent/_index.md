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

### データ収集

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
| CPU         | [System][4]  | All                |
| ディスク        | [Disk][5]    | All                |
| IO          | [System][4]  | All                |
| メモリ      | [System][4]  | All                |
| ネットワーク     | [Network][6] | All                |
| NTP         | [NTP][7]     | All                |
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
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
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

  - `datadog.agent.up`: Returns `OK` if the Agent connects to Datadog.
    <div class="alert alert-warning">AIX Agents do not report the <code>datadog.agent.up</code> service check. You can use the metric <code>datadog.agent.running</code> to monitor the uptime of an AIX Agent. The metric emits a value of <code>1</code> if the Agent is reporting to Datadog.</div>
  - `datadog.agent.check_status`: Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.


These checks can be used in the Datadog Platform to visualize the Agent status through monitors and dashboards at a quick glance. See [Service Check Overview][21] to learn more.

#### Metrics

In the Datadog UI, go to the [Metrics Summary page][22] and search for the metric `datadog.agent.started` or the metric `datadog.agent.running`. If these metrics are not visible right away, it may take a few minutes for the Agent to send the data to the Datadog Platform.

Click on either of the metrics and a Metric panel opens up. This panel shows additional metadata about where these metrics are collected from and any associated tags. Because so far in this walkthrough no tags are configured on this host, you should see only the default tags that Datadog assigns to the metrics including `version` and `host`. See the following section on Agent Configuration Files to learn more about how to add tags.

Explore other default metrics such as `ntp.offset` or `system.cpu.idle`.

## Agent configuration files

The Agent's main configuration file is `datadog.yaml`. The required parameters are:
- your [Datadog API key][16], which is used to associate your Agent's data with your organization, and
- the Datadog site ({{< region-param key="dd_site" code="true" >}}).

See the [sample `config_template.yaml` file][23] for all available configuration options.

You can adjust the Agent configuration files to take advantage of other Datadog features including tags.

#### Setting tags through the Agent configuration file

Tags add an additional layer of metadata to your metrics and events. They allow you to scope and compare your data in Datadog visualizations. When data is sent to Datadog from multiple hosts, tagging this information allows you to scope down to the data you are most interested in visualizing.

For example, let's say you have data that is collected from different teams and you are only interested in seeing the metrics from team alpha, tagging those specific hosts with either the `team:alpha` or `team:bravo` tag gives you the ability to filter down to the metrics that are tagged with `team:alpha`. See [Getting Started with Tags][24] to learn more about tagging your data.

1. Locate your Agent's [main configuration file][25]. For Ubuntu, the file locations is `/etc/datadog-agent/datadog.yaml`.

2. In the `datadog.yaml` file, locate the `tags` parameter. Host level tags can be set in the `datadog.yaml` configuration to apply tags on all metrics, traces and logs forwarded from this host.

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

3. Uncomment the tags parameter and the provided example `team:infra` tag. You can also add your own custom tag, for example `test:agent_walkthrough`.
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

4. Restart the Agent by running the Agent's [restart command][26]. The Ubuntu restart command:

   ```shell
   sudo service datadog-agent restart
   ```

5. After a few minutes, go to the [Metrics Summary page][22] again, and click on the metric `datadog.agent.started`. In addition to the default `host` and `version` tags, you can also see the `team` tag and any personal tags you added. You can also filter metrics by the `Tag` field at the top of the page.

6. Go to the [Events Explorer page][20] and find the custom tags displayed with the latest Agent Event.

#### Other configuration options

The collection of [logs][27], [traces][28], and [processes][29] data can be enabled through the Agent configuration file. These are not features that are enabled by default. For example, in the configuration file, the `logs_enabled` parameter is set to false.

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

Other Datadog features that can be configured through the Agent configuration file include:
- Enabling [OTLP Trace Ingestion][30]
- [Customizing log collection][31] to filter or scrub sensitive data
- Configuring custom data through [DogStatsD][32]

Throughout your setup, when the documentation refers to the `datadog.yaml` file or the Agent configuration file, this is the file you need to configure.

## Commands

See [Agent Commands][33] to [Start][34], [Stop][35] or [Restart][26] your Agent.

## Troubleshooting

For help troubleshooting the Agent:

- See [Agent Troubleshooting][36]
- View the [Agent Log Files][37]
- Contact [Datadog support][38]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Next steps

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" >}}Learn about Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Learn about the Datadog UI{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Learn how to collect Logs through the Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Learn how to collect Traces through the Agent{{< /nextlink >}}
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