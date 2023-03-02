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
kind: documentation
title: 収集された Kubernetes データ
---

## メトリクス

Kubernetes クラスターにデプロイされた Agent が収集するメトリクス:

**注**: Datadog Kubernetes インテグレーションで収集されるメトリクスは、使用中の Kubernetes のバージョンにより異なる場合があります。

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes State

`kubernetes_state.*` メトリクスは `kube-state-metrics` API から収集されます。

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes プロキシ

{{< get-metrics-from-git "kube_proxy" >}}

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

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes State

{{< get-service-checks-from-git "kubernetes_state" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}