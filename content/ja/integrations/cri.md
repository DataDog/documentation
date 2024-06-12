---
app_id: cri
app_uuid: 81805522-0f55-45a4-95f6-23dd9ea46361
assets:
  dashboards:
    cri: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cri.cpu.usage
      metadata_path: metadata.csv
      prefix: cri.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10043
    source_type_name: CRI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cri/README.md
display_on_public_website: true
draft: false
git_integration_title: cri
integration_id: cri
integration_title: CRI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cri
public_title: CRI
short_description: CRI のすべてのメトリクスを Datadog で追跡
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  configuration: README.md#Setup
  description: CRI のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Container Runtime Interface を監視します

## 計画と使用

### インフラストラクチャーリスト

CRI は [Datadog Agent][1] の中核となるチェックで、`datadog.yaml` に `cri.d/conf.yaml` と共に構成する必要があります。

`datadog.yaml` で、Agent が現在の CRI への問い合わせに使用する `cri_socket_path` を構成します (デフォルトのタイムアウトも構成できます)。CRI (`containerd` など) がディスク使用状況メトリクスを報告する場合は、`cri.d/conf.yaml` で、`collect_disk` などのチェックインスタンス設定を構成します。

**注**: コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を設定すると、デフォルト構成の `CRI` チェックが自動的に有効になります。

#### コンテナへのインストール

コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を CRI ソケットに設定すると、デフォルト構成の `CRI` インテグレーションが自動的に有効になります。

たとえば、Kubernetes でインテグレーションをインストールするには、daemonset を編集して、CRI ソケットをホストノードから Agent コンテナにマウントし、`DD_CRI_SOCKET_PATH` 環境変数を DaemonSet の mountPath に設定します。

```yaml
apiVersion: extensions/v1beta1
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
              value: /var/run/crio/crio.sock
          volumeMounts:
            - name: crisocket
              mountPath: /var/run/crio/crio.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/crio/crio.sock
              name: crisocket
            - hostPath:
                path: /var/run
              name: var-run
```

**注:** 問題なくインテグレーションを実行するには、ホストから `/var/run` ディレクトリをマウントする必要があります。

### ブラウザトラブルシューティング

1. CRI-O のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `cri.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル cri.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `cri` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cri" >}}


### ヘルプ

CRI には、サービスのチェック機能は含まれません。

### ヘルプ

CRI には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/