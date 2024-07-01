---
app_id: containerd
app_uuid: 206cf95f-1d2a-4ad5-b027-0de15431833b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: containerd.cpu.user
      metadata_path: metadata.csv
      prefix: containerd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10082
    source_type_name: Containerd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/containerd/README.md
display_on_public_website: true
draft: false
git_integration_title: containerd
integration_id: containerd
integration_title: Containerd
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: containerd
public_title: Containerd
short_description: Containerd のすべてのメトリクスを Datadog で追跡
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Containerd のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Containerd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Containerd コンテナランタイムを監視します。

## 計画と使用

### インフラストラクチャーリスト

Containerd は [Datadog Agent][1] の中核となるチェックです。Containerd は、`datadog.yaml` と `containerd.d/conf.yaml` の両方で構成する必要があります。

`datadog.yaml` では、Agent が Containerd に問い合わせるために使用する `cri_socket_path` を構成します。`containerd.d/conf.yaml` では、イベントのチェックインスタンス設定 (`filters` など) を構成します。

#### コンテナへのインストール

コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を Containerd ソケットに設定すると、デフォルト構成の Containerd インテグレーションが自動的に有効になります。

たとえば、Kubernetes でインテグレーションをインストールするには、DaemonSet を編集して、Containerd ソケットをホストノードから Agent コンテナにマウントし、`DD_CRI_SOCKET_PATH` 環境変数を DaemonSet のマウントパスに設定します。

{{< tabs >}}
{{% tab "Linux コンテナ" %}}

##### Linux コンテナ

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_ソケットパス
              value: /var/run/containerd/containerd.sock
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
            - hostPath:
                path: /var/run
              name: var-run
```

**注:** 問題なくインテグレーションを実行するには、ホストから `/var/run` ディレクトリをマウントする必要があります。

{{% /tab %}}
{{% tab "Windows コンテナ" %}}

##### Windows コンテナ

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: \\\\.\\pipe\\containerd-containerd
          volumes:
            - hostPath:
                path: \\\\.\\pipe\\containerd-containerd
              name: containerdsocket
          volumeMounts:
            - name: containerdsocket
              mountPath: \\\\.\\pipe\\containerd-containerd
```

{{% /tab %}}
{{< /tabs >}}

### ブラウザトラブルシューティング

1. Containerd のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `containerd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル containerd.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `containerd` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "containerd" >}}


このインテグレーションは Linux と Windows で動作しますが、一部のメトリクスは OS に依存します。OS に依存するメトリクスの一覧は `metadata.csv` をご覧ください。

### ヘルプ

Containerd チェックは、イベントを収集できます。`filters` を使用して関連イベントを選択します。詳細については、[サンプル containerd.d/conf.yaml][2] を参照してください。

### ヘルプ
{{< get-service-checks-from-git "containerd" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent