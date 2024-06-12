---
app_id: oom-kill
app_uuid: 7546b270-2efe-4a59-8f94-3447df2db801
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: oom_kill.oom_process.count
      metadata_path: metadata.csv
      prefix: oom_kill.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: OOM Killer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md
display_on_public_website: true
draft: false
git_integration_title: oom_kill
integration_id: oom-kill
integration_title: OOM Killer
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: oom_kill
public_title: OOM Killer
short_description: システムまたはcgroupによる OOM killer プロセスの追跡。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  configuration: README.md#Setup
  description: システムまたはcgroupによる OOM killer プロセスの追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OOM Killer
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
yum install -y kernel-devel-$(uname -r)
```

**注**: OOM Kill チェックが動作するためには カーネルバージョン 4.11 以降が必要です。
また、Windows およびバージョン 8 よりも前の CentOS/RHEL はサポートされません。

### コンフィギュレーション

1. Agent のコンフィギュレーションディレクトリのルートにある `system-probe.yaml` フォルダーで、以下のコンフィギュレーションを追加します。

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. OOM Kill メトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `oom_kill.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[oom_kill.d/conf.yaml の例][2]を参照してください。

3. [Agent を再起動します][3]。

### Docker でのコンフィギュレーション

上記に従い `system-probe.yaml` および `oom_kill.d/conf.yaml` をマウントすることに加え、以下の構成を行います。

1. 以下のボリュームを Agent コンテナにマウントします。

    ```
    -v /sys/kernel/debug:/sys/kernel/debug 
    -v /lib/modules:/lib/modules 
    -v /usr/src:/usr/src
    ```

2. BPF の動作を有効にするために、以下の権限を追加します。

    ```
    --privileged
    ```

   カーネルバージョン 5.8 からは、`--privileged` パラメーターを `--cap-add CAP_BPF` に置き換えることができます。 

*注**: Docker Swarm では `--privileged` モードはサポートされていません。


### Helm のインテグレーション

[Datadog Helm チャート][4]を使用し、`values.yaml` ファイルで `datadog.systemProbe` と `datadog.systemProbe.enableOOMKill` のパラメータが有効であることを確認します。

### Operator (v1.0.0+) による構成

DatadogAgent マニフェストで `features.oomKill.enabled` パラメーターを設定します。
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
```

**注**: COS (Container Optimized OS) を使用する場合は、ノード Agent で `src` ボリュームをオーバーライドしてください。
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `oom_kill` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oom_kill" >}}


### サービスのチェック

OOM Killer チェックには、サービスのチェック機能は含まれません。

### イベント

OOM Killer チェックでは、強制終了されたプロセス ID とプロセス名、そしてトリガーしたプロセス ID とプロセス名を含む、各 OOM Killer のイベントが送信されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/helm/charts/tree/master/stable/datadog
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/