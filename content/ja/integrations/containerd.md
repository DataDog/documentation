---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/containerd/README.md'
display_name: Containerd
git_integration_title: containerd
guid: 5cdc0363-a0df-469b-8346-2da4ab84128c
integration_id: containerd
integration_title: Containerd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: containerd.
metric_to_check: containerd.cpu.user
name: containerd
public_title: Datadog-Containerd インテグレーション
short_description: Containerd のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、コンテナランタイム Containerd を監視します。

## セットアップ

### インストール

Containerd はコア Agent 6 チェックです。`datadog.yaml` と `containerd.d/conf.yaml` の両方で構成する必要があります。

`datadog.yaml` では、Agent が Containerd に問い合わせるために使用する `cri_socket_path` を構成します。`containerd.d/conf.yaml` では、イベントのチェックインスタンス設定 (`filters` など) を構成します。

#### コンテナへのインストール

コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を Containerd ソケットに設定すると、デフォルト構成の `Containerd` チェックが自動的に有効になります。

たとえば、Kubernetes でインテグレーションをインストールするには、`datadog-agent.yaml` を編集して、Containerd ソケットをホストノードから DaemonSet にマップし、`DD_CRI_SOCKET_PATH` を DaemonSet の mountPath に設定します。

```
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: "/var/run/containerd/containerd.sock"
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
```

### コンフィグレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `containerd.d/conf.yaml` ファイルを編集して、
   Containerd パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル containerd.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `containerd` を探します。

## 収集データ

### メトリクス

Containerd は、コンテナのリソース使用状況に関するメトリクスを収集します。

CPU、メモリ、ブロック I/O、ヒュージページテーブルのメトリクスは、追加設定なしで収集されます。さらに、いくつかのディスクメトリクスも収集できます。

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][4] を参照してください。

### サービスのチェック

Containerd には、Containerd Socket への接続の健全性を通知する `containerd.health` サービスチェックが含まれています。

### イベント

Containerd チェックは、イベントを収集できます。`filters` を使用して関連イベントを選択します。詳細については、[サンプル containerd.d/conf.yaml][1] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/help
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/containerd/metadata.csv


{{< get-dependencies >}}