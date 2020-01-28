---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - オーケストレーション
  - コンテナ
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md'
display_name: Kube_scheduler
git_integration_title: kube_scheduler
guid: ec7c029f-86c2-4202-9368-1904998a646c
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_scheduler.
metric_to_check: kube_scheduler.threads
name: kube_scheduler
public_title: Datadog-Kubernetes Scheduler インテグレーション
short_description: Kubernetes Scheduler の監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Scheduler][1] を監視します。

## セットアップ

### インストール

Kubernetes Scheduler チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

#### メトリクスの収集

1. kube_scheduler のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kube_scheduler.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kube_scheduler.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset 構成][4]でこれを有効にします。

    ```
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
            value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
            value: "true"
    (...)
    ```

2. [こちらのマニフェスト][5]のように、Docker ソケットを Datadog Agent にマウントします。

3. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `kube_scheduler` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_scheduler" >}}


### サービスのチェック

**kube_scheduler.prometheus.health**:<br>
Agent がメトリクスのエンドポイントに到達できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Kube Scheduler には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[8]: https://docs.datadoghq.com/ja/help