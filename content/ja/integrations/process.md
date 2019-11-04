---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/process/README.md'
display_name: プロセス
git_integration_title: process
guid: 1675eced-b435-464a-8f84-f65e438f838e
integration_id: system
integration_title: 処理
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.processes.cpu.pct
name: process
public_title: Datadog-Processes インテグレーション
short_description: 実行中のプロセスのメトリクスをキャプチャし、ステータスを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Process チェックを使用して、以下のことができます。

* CPU、メモリ、I/O、スレッド数など、任意のホスト上で実行されている特定プロセスのリソース使用状況メトリクスを収集できます。
* [プロセスモニター][1]を使用できます。実行されなければならない特定プロセスのインスタンス数にしきい値を設定し、そのしきい値が満たされない場合にアラートを発行します (下の**サービスのチェック**を参照)。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][12]のガイドを参照してこの手順を行ってください。

### インストール

Process チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

他の多くのチェックとは異なり、デフォルトの Process チェックは、特に役立つ監視を行いません。どのプロセスをどのように監視するかを指示する必要があります。

標準的なデフォルトのチェック構成はありませんが、以下に ssh/sshd プロセスを監視する `process.d/conf.yaml` の例を示します。使用可能なすべての構成オプションの詳細については、[サンプル process.d/conf.yaml][2] を参照してください。

```
init_config:

instances:
  - name: ssh
    search_string: ['ssh', 'sshd']

# 正確なコマンドラインを使用して sshd プロセスを検索するには
# - name: ssh
#   search_string: ['/usr/sbin/sshd -D']
#   exact_match: True
```

この Process チェックは、psutil python パッケージを使用して[マシン上のプロセスをチェック][3]します。デフォルトでは、この Process チェックは完全一致を行い、プロセス名のみを探します。yaml ファイルで `exact_match` に **False** を設定することで、Agent は、プロセスの起動に使用されたコマンドを探し、指定されたキーワードを含むすべてのプロセスを認識します。

正確な PID (`pid`) または pidfile (`pid_file`) に基づいてプロセスを検索するようにチェックを構成することもできます。2 つ以上の `search_string`、`pid`、および `pid_file` を指定すると、その順序で見つかった最初のオプションが使用されます (たとえば、`pid_file` と `search_string` の両方を指定すると、`search_string` が使用されます)。

**注** Windows 上の Agent v6.11 以上の場合、Agent は権限のない `ddagentuser` として実行され、別のユーザーの下で実行されているプロセスのコマンドライン全体にはアクセスできません。したがって、`exact_match: false` オプションは使用できません。特定のユーザーに所属するプロセスのみを選択するための `user` オプションについても同様です。

このチェックで `/proc` 以外のパスでプロセスを検索するには、`process.yaml` ではなく `datadog.conf` に `procfs_path: <your_proc_path>` を設定します (そこでの使用は非推奨になりました)。Docker コンテナから Agent ([docker-dd-agent][4]) を実行しており、コンテナをホストするサーバー上で実行されているプロセスを監視する場合は、これを `/host/proc` に設定します。**コンテナ内**で実行されているプロセスを監視するために設定する必要はありません。それらの監視は [Docker チェック][5]が行います。

プロセスメトリクスによっては、Datadog コレクターを監視対象プロセスと同じユーザーとして実行するか、特権的なアクセスを取得する必要があります。
前者のオプションが望ましくなく、Datadog コレクターを `root`として実行することを避けるには、`try_sudo` オプションを使用して、Process チェックが `sudo` を使用してこのメトリクスを収集するようにします。
現時点では、Unix プラットフォームの `open_file_descriptors` メトリクスだけがこの設定を利用しています。
注: これが動作するには、適切な sudoers ルールを構成する必要があります。
```
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

構成オプションの詳細については、[構成例][2]を参照してください。

[Agent を再起動][6]すると、Datadog へのプロセスメトリクスおよびサービスチェックの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `process` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "process" >}}


すべてのメトリクスは process.yaml で構成された `instance` ごとに収集され、`process_name:<instance_name>` のタグが付きます。

### イベント
Process チェックには、イベントは含まれません。

### サービスのチェック
**process.up**:

Agent は、`process.yaml` 内の各インスタンスに対してこのサービスチェックを送信し、それぞれに `process:<name>` のタグを付けます。

`thresholds` が指定されていないインスタンスの場合、サービスチェックは、CRITICAL (実行中のプロセスがない) または OK (少なくとも 1 つのプロセスが実行中) のいずれかのステータスを持ちます。

`thresholds` が指定されたインスタンスの場合を、次の例で説明します。

```
instances:
  - name: my_worker_process
    search_string: ['/usr/local/bin/worker']
    thresholds:
      critical: [1, 7]
      warning: [3, 5]
```

Agent は、`process.up` のタグを付けた `process:my_worker_process` を以下のステータスで送信します。

- ワーカープロセスの数が 1 個未満または 7 個より多い場合は CRITICAL
- ワーカープロセスの数が 1、2、6、または 7 個の場合は WARNING
- ワーカープロセスの数が 3、4、または 5 個の場合は OK

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料
プロセスのリソース消費を監視する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][11]を参照してください。


[1]: https://docs.datadoghq.com/ja/monitoring/#process
[2]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/process.py#L117
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/integrations-core/tree/master/docker_daemon
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
[9]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.datadoghq.com/blog/process-check-monitoring
[12]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}