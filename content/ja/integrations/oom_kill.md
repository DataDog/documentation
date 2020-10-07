---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - OS & システム
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md'
display_name: OOM Killer
git_integration_title: oom_kill
guid: 4b8e9c18-1a13-43b0-a03c-186eb3221147
integration_id: oom-kill
integration_title: OOM Killer
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oom_kill.
metric_to_check: oom_kill.oom_process.count
name: oom_kill
public_title: Datadog-OOM Killer インテグレーション
short_description: システムまたはcgroupによる OOM killer プロセスの追跡。
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent およびシステムプローブを通じて、OOM（メモリ不足）の強制終了プロセスというカーネルを監視します。

## セットアップ

### インストール

OOM Killer チェックは [Datadog Agent][1] パッケージに含まれています。システムプローブに実装された eBPF プログラムに依存します。

システムプローブにより使用される eBPF プログラムはランタイムでコンパイルされ、適切なカーネルヘッダーへのアクセスを必要とします。

Debian 系のディストリビューションでは、以下のようにカーネルヘッダーをインストールします。
```sh
apt install -y linux-headers-$(uname -r)
```

RHEL 系のディストリビューションでは、以下のようにカーネルヘッダーをインストールします。
```sh
yum install -y kernel-headers-$(uname -r)
```

### コンフィギュレーション

1. Agent のコンフィギュレーションディレクトリのルートにある `system-probe.yaml` フォルダーで、以下のコンフィギュレーションを追加します。

    ```yaml
    system_probe_config:
        enabled: true
        enable_oom_kill: true
    ```

2. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーに `oom_kill.d/conf.yaml` ファイルが存在することを確認し、OOM Killer メトリクスの収集を開始します。

3. [Agent を再起動します][2]。

### Helm のインテグレーション

[Datadog Helm チャート][3]を使用し、`values.yaml` ファイルで `datadog.systemProbe` と `datadog.systemProbe.enableOOMKill` のパラメータが有効であることを確認します。

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `oom_kill` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oom_kill" >}}


### サービスのチェック

OOM Killer チェックには、サービスのチェック機能は含まれません。

### イベント

OOM Killer チェックでは、強制終了されたプロセス ID とプロセス名、そしてトリガーしたプロセス ID とプロセス名を含む、各 OOM Killer のイベントが送信されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/helm/charts/tree/master/stable/datadog
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/