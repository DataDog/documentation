---
aliases:
- /ja/agent/kubernetes/metrics
- /ja/agent/kubernetes/data_collected
description: Kubernetes クラスターから Datadog Agent によって収集されたメトリクスとイベントのリファレンスガイド
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当てる
title: 収集された Kubernetes データ
---
このページでは、Kubernetes クラスターにデプロイした際に Datadog Agent が収集したデータを一覧表示します。収集されるメトリクスのセットは、使用している Kubernetes のバージョンによって異なる場合があります。

**注**: Windows コンテナについては、[Windows デプロイの制限されたメトリクス][7]を参照してください。

## メトリクス {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**注**: `kubernetes.cpu.*` メトリクスに関する詳細については、[`kubernetes.cpu.*` および `container.cpu.*` メトリクスの不一致][8]を参照してください。

### Kubelet {#kubelet}

詳しくは、[Kubelet][1] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes ステートメトリクスコア {#kubernetes-state-metrics-core}

詳しくは、[Kubernetes ステートメトリクスコア][6]インテグレーションのドキュメントをご覧ください。このチェックには、Datadog Cluster Agent v1.12 またはそれ以降が必要です。

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes ステート {#kubernetes-state}

**注**: `kubernetes_state.*` メトリクスは `kube-state-metrics` API から収集されます。`kubernetes_state` チェックは従来のチェックです。代替については、[Kubernetes ステートメトリクスコア][6]を参照してください。Datadog は両方のチェックを同時に有効にしないことを推奨します。

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS {#kubernetes-dns}

{{< get-metrics-from-git "kube-dns" >}}

### Kubernetes プロキシ {#kubernetes-proxy}

{{< get-metrics-from-git "kube-proxy" >}}

### Kubernetes API サーバー {#kubernetes-api-server}

詳しくは、[Kubernetes API サーバー][3]インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Kubernetes コントローラーマネージャー {#kubernetes-controller-manager}

詳しくは、[Kubernetes コントローラーマネージャー][2]インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube-controller-manager" >}}

### Kubernetes メトリクスサーバー {#kubernetes-metrics-server}

詳しくは、[Kubernetes メトリクスサーバー][4]インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube-metrics-server" >}}

### Kubernetes スケジューラー {#kubernetes-scheduler}

詳しくは、[Kubernetes スケジューラー][5]インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube-scheduler" >}}


## イベント {#events}

- Backoff
- Conflict
- Delete
- DeletingAllPods
- リソースが不足しています
- Error
- Failed
- FailedCreate
- FailedDelete
- FailedMount
- FailedSync
- Failedvalidation
- FreeDiskSpaceFailed
- HostPortConflict
- InsufficientFreeCPU
- InsufficientFreeMemory
- InvalidDiskCapacity
- Killing
- KubeletsetupFailed
- NodeNotReady
- NodeoutofDisk
- OutofDisk
- Rebooted
- TerminatedAllPods
- Unable
- Unhealthy

## サービスチェック {#service-checks}

### Kubelet {#kubelet-1}

詳しくは、[Kubelet][1] インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes コントローラーマネージャー {#kubernetes-controller-manager-1}

詳しくは、[Kubernetes コントローラーマネージャー][2]インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Kubernetes メトリクスサーバー {#kubernetes-metrics-server-1}

詳しくは、[Kubernetes メトリクスサーバー][4]インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Kubernetes スケジューラー {#kubernetes-scheduler-1}

詳しくは、[Kubernetes スケジューラー][5]インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube-scheduler" >}}

### Kubernetes ステートメトリクスコア {#kubernetes-state-metrics-core-1}

詳しくは、[Kubernetes ステートメトリクスコア][6]インテグレーションのドキュメントをご覧ください。

`kubernetes_state.cronjob.complete`
: cronjob の最後のジョブが失敗したかどうか。タグ: `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.cronjob.on_schedule_check`
: cronjob の次のスケジュールが過去である場合に警告します。タグ: `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.job.complete`
: ジョブが失敗したかどうか。タグ:`kube_job` または `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.node.ready`
: ノードの準備ができているかどうか。タグ:`node` `condition` `status`。

`kubernetes_state.node.out_of_disk`
: ノードにディスク容量があるかどうか。タグ:`node` `condition` `status`。

`kubernetes_state.node.disk_pressure`
: ノードにディスクプレッシャーがかかっているかどうか。タグ:`node` `condition` `status`。

`kubernetes_state.node.network_unavailable`
: ノードネットワークが利用できないかどうか。タグ:`node` `condition` `status`。

`kubernetes_state.node.memory_pressure`
: ノードネットワークにメモリプレッシャーがかかっているかどうか。タグ:`node` `condition` `status`。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/kubelet/
[2]: /ja/integrations/kube_controller_manager/
[3]: /ja/integrations/kube_apiserver_metrics/
[4]: /ja/integrations/kube_metrics_server
[5]: /ja/integrations/kube_scheduler
[6]: /ja/integrations/kubernetes_state_core/
[7]: /ja/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /ja/containers/faq/cpu-usage-metrics