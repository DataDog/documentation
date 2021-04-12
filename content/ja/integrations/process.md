---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/process/README.md'
display_name: プロセス
draft: false
git_integration_title: プロセス
guid: 1675eced-b435-464a-8f84-f65e438f838e
integration_id: システム
integration_title: プロセス
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.processes.cpu.pct
name: プロセス
public_title: Datadog-Processes インテグレーション
short_description: 実行中のプロセスのメトリクスをキャプチャし、ステータスを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

プロセスチェックを使用して、以下のことができます。

- CPU、メモリ、I/O、スレッド数など、任意のホスト上で実行されている特定プロセスのリソース使用状況メトリクスを収集できます。
- [プロセスモニター][1]を使用できます。実行されなければならない特定プロセスのインスタンス数にしきい値を設定し、そのしきい値が満たされない場合にアラートを発行します (下の**サービスのチェック**を参照)。

## セットアップ

### インストール

プロセスチェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

他のチェックとは異なり、デフォルトのプロセスチェックは、特に役立つ監視を行いません。どのプロセスをどのように監視するかを構成する必要があります。

1. 標準的なデフォルトのチェックコンフィギュレーションはありませんが、以下に SSH/SSHD 処理を監視する `process.d/conf.yaml` の例を示します。使用可能なすべての構成オプションの詳細については、[サンプル process.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Used to uniquely identify your metrics
     ## as they are tagged with this name in Datadog.
     #
     - name: ssh

       ## @param search_string - list of strings - required
       ## If one of the elements in the list matches, it return the count of
       ## all the processes that match the string exactly by default.
       ## Change this behavior with the parameter `exact_match: false`.
       #
       search_string: ["ssh", "sshd"]
   ```

   プロセスメトリクスによっては、Datadog コレクターを監視対象プロセスと同じユーザーとして実行するか、特権的なアクセスを取得する必要があります。前者のオプションが望ましくなく、Datadog Collector を `root` として実行することを避けるには、`try_sudo` オプションを使用して、プロセスチェックが `sudo` を使用してこのメトリクスを収集するようにします。現時点では、Unix プラットフォームの `open_file_descriptors` メトリクスだけがこの設定を利用しています。注: これが動作するには、適切な sudoers ルールを構成する必要があります。

   ```text
   dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
   ```

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `process` を探します。

### メトリクスに関するメモ

**注**: Linux または OSX では一部のメトリクスは使用できません。

- Agent が読み取るファイル (`/proc//io`) はプロセスのオーナーのみ読み取り可能であるため、Process I/O メトリクスは Linux または OSX では使用**できません**。詳しくは、[Agent FAQ をご参照ください][5]。
- `system.cpu.iowait` は、Windows では使用できません。

すべてのメトリクスは process.yaml で構成された `instance` ごとに収集され、`process_name:<instance_name>` のタグが付きます。

このチェックにより送信される `system.processes.cpu.pct` メトリクスは、30 秒間以上存在する処理でのみ正確です。
それ以下の短い処理の場合、その値は正確でない場合があります。

メトリクスの完全なリストについては、[メトリクスセクション](#metrics)を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "process" >}}


### イベント

プロセスチェックには、イベントは含まれません。

### サービスのチェック

**process.up**:<br>
Agent は、`process.yaml` 内の各インスタンスに対してこのサービスチェックを送信し、それぞれに `process:<name>` のタグを付けます。

`thresholds` が指定されていないインスタンスの場合、サービスチェックは、CRITICAL (実行中のプロセスがない) または OK (少なくとも 1 つのプロセスが実行中) のいずれかのステータスを持ちます。

`thresholds` が指定されたインスタンスの場合を、次の例で説明します。

```yaml
instances:
  - name: my_worker_process
    search_string: ["/usr/local/bin/worker"]
    thresholds:
      critical: [1, 7]
      warning: [3, 5]
```

Agent は、`process.up` のタグを付けた `process:my_worker_process` を以下のステータスで送信します。

- ワーカープロセスの数が 1 個未満または 7 個より多い場合は `CRITICAL`
- ワーカープロセスの数が 1、2、6、または 7 個の場合は `WARNING`
- ワーカープロセスの数が 3、4、または 5 個の場合は `OK`

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

プロセスのリソース消費を監視する方法 (または理由) について理解するには、この[ブログ記事][8]を参照してください。

[1]: https://docs.datadoghq.com/ja/monitoring/#process
[2]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[6]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/process-check-monitoring