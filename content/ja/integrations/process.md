---
app_id: システム
app_uuid: 43bff15c-c943-4153-a0dc-25bb557ac763
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.processes.cpu.pct
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: プロセス
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/process/README.md
display_on_public_website: true
draft: false
git_integration_title: プロセス
integration_id: システム
integration_title: プロセス
integration_version: 3.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: プロセス
public_title: プロセス
short_description: 実行中のプロセスのメトリクスをキャプチャし、ステータスを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::OS & System
  configuration: README.md#Setup
  description: 実行中のプロセスのメトリクスをキャプチャし、ステータスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: プロセス
---



## 概要

プロセスチェックを使用して、以下のことができます。
- 任意のホスト上で実行されている特定プロセスのリソース使用状況メトリクスを収集できます。たとえば、CPU、メモリ、I/O、スレッド数などです。
- [プロセスモニター][1]を使用して、実行されなければならない特定プロセスのインスタンス数にしきい値を設定し、そのしきい値が満たされない場合にアラートを発行します (下の**サービスのチェック**を参照)。

## セットアップ

### インストール

プロセスチェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

他の多くのチェックとは異なり、デフォルトのプロセスチェックは、特に役立つ監視を行いません。どのプロセスを監視するかを構成する必要があります。

標準的なデフォルトのチェックコンフィギュレーションはありませんが、以下に SSH/SSHD 処理を監視する `process.d/conf.yaml` の例を示します。使用可能なすべての構成オプションの詳細については、[サンプル process.d/conf.yaml][3] を参照してください。

```yaml
init_config:
instances:
- name: ssh
  search_string:
    - ssh
    - sshd
```

**注**: 構成の変更後は、必ず [Agent を再起動][4]してください。

一部のプロセスメトリクスを取得するには、Datadog コレクターを監視対象プロセスのユーザーとして実行するか、特権的なアクセスを与えて実行する必要があります。Unix プラットフォームの  `open_file_descriptors` メトリクスについては、追加の構成オプションがあります。`conf.yaml` ファイルで `try_sudo` を `true` に設定すると、プロセスチェックは `sudo` を使用して `open_file_descriptors` メトリクスの収集を試みることができます。この構成オプションを使用するには、`/etc/sudoers` で適切な sudoers ルールを設定する必要があります。

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションで `process` を探します。

### メトリクスに関するメモ

以下のメトリクスは、Linux および macOS では使用できません。
- Agent が読み取るファイル (`/proc//io`) はプロセスのオーナーのみ読み取り可能であるため、Process I/O メトリクスは Linux または macOS では使用**できません**。詳しくは、[Agent FAQ をご参照ください][6]。

以下のメトリクスは、Windows では使用できません。
- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`

**注**: Windows でページフォールトメトリクスを収集するには、[WMI チェック][7]を使用します。

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
{{< get-service-checks-from-git "process" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

プロセスのリソース消費を監視する方法 (または理由) について理解するには、こちらの[ブログ記事][11]を参照してください。

[1]: https://docs.datadoghq.com/ja/monitors/create/types/process_check/?tab=checkalert
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[7]: https://docs.datadoghq.com/ja/integrations/wmi_check/
[8]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/process/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/process-check-monitoring