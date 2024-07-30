---
aliases:
- /ja/agent/kubernetes/metrics
- /ja/agent/kubernetes/data_collected
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
  text: コンテナから送信された全データにタグを割り当て
title: 収集された Kubernetes データ
---

このページでは、Kubernetes クラスターにデプロイした際に Datadog Agent が収集したデータを一覧表示します。

収集されるメトリクスのセットは、使用している Kubernetes のバージョンによって異なる場合があります。

## メトリクス

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

詳しくは、[Kubelet][1] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state metrics core

詳細については、[Kubernetes state metrics core][6] インテグレーションのドキュメントを参照してください。このチェックには、Datadog Cluster Agent v1.12 またはそれ以降が必要です。

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes State

**注**: `kubernetes_state.*` メトリクスは `kube-state-metrics` API から収集されます。`kubernetes_state` チェックはレガシーチェックです。代替案としては、[Kubernetes state metrics core][6] を参照してください。Datadog では、両方のチェックを同時に有効にしないことを推奨しています。

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes プロキシ

{{< get-metrics-from-git "kube_proxy" >}}

### Kubernetes API server

詳しくは、[Kubernetes API server][3] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube_apiserver_metrics" >}}

### Kubernetes controller manager

詳しくは、[Kubernetes controller manager][2] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube_controller_manager" >}}

### Kubernetes metrics server

詳しくは、[Kubernetes metrics server][4] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube_metrics_server" >}}

### Kubernetes scheduler

詳しくは、[Kubernetes scheduler][5] インテグレーションのドキュメントをご覧ください。

{{< get-metrics-from-git "kube_scheduler" >}}


## イベント

- Backoff
- Conflict
- 削除
- DeletingAllPods
- Didn't have enough resource
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

## サービスチェック

### Kubelet

詳しくは、[Kubelet][1] インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes controller manager

詳しくは、[Kubernetes controller manager][2] インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube_controller_manager" >}}

### Kubernetes metrics server

詳しくは、[Kubernetes metrics server][4] インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube_metrics_server" >}}

### Kubernetes scheduler

詳しくは、[Kubernetes scheduler][5] インテグレーションのドキュメントをご覧ください。

{{< get-service-checks-from-git "kube_scheduler" >}}

### Kubernetes state metrics core

詳しくは、[Kubernetes state metrics core][6] インテグレーションのドキュメントをご覧ください。

`kubernetes_state.cronjob.complete`
: cronjob の最後のジョブが失敗したかどうか。タグ:`kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.cronjob.on_schedule_check`
: cronjob の次のスケジュールが過去である場合に警告します。タグ: `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.job.complete`
: ジョブが失敗したかどうか。タグ: `kube_job` または `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.node.ready`
: ノードの準備ができているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.out_of_disk`
: ノードの準備ができているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.disk_pressure`
: ノードにディスクプレッシャーがかかっているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.network_unavailable`
: ノードネットワークが利用できないかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.memory_pressure`
: ノードネットワークにメモリプレッシャーがかかっているかどうか。タグ: `node` `condition` `status`。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/kubelet/
[2]: /ja/integrations/kube_controller_manager/
[3]: /ja/integrations/kube_apiserver_metrics/
[4]: /ja/integrations/kube_metrics_server
[5]: /ja/integrations/kube_scheduler
[6]: /ja/integrations/kubernetes_state_core/