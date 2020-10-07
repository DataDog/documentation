---
title: 収集された Kubernetes データ
kind: documentation
aliases:
  - /ja/agent/kubernetes/metrics
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
---
## メトリクス

Kubernetes クラスターにデプロイされた Agent が収集するメトリクス:

**注**: Datadog Kubernetes インテグレーションで収集されるメトリクスは、使用中の Kubernetes のバージョンにより異なる場合があります。

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### kube-state-metrics

`kubernetes_state.*` メトリクスは `kube-state-metrics` API から収集されます。

{{< get-metrics-from-git "kubernetes_state" >}}

### kube-dns

{{< get-metrics-from-git "kube_dns" >}}

### Kubernetes プロキシ

{{< get-metrics-from-git "kube_proxy" >}}

## イベント

Datadog Agent の 5.17.0 リリース版では、Kubernetes イベントコレクター用に組み込みの[leader election オプション][9]をサポートしています。これを有効にした後は、クラスターに追加のイベントコレクションコンテナをデプロイする必要はありません。代わりに、Agent が一度に 1 つの Agent インスタンスのみがイベントを収集するように調整します。使用できるイベントは以下のとおりです。

- Backoff
- Conflict
- 削除
- DeletingAllPods
- Didn't have enough resource
- エラー
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

## サービスのチェック

Kubernetes チェックは、次のサービスチェックを含みます。

- `kubernetes.kubelet.check`: <br>
    `CRITICAL` の場合、`kubernetes.kubelet.check.ping` または `kubernetes.kubelet.check.syncloop` は、`CRITICAL` または `NO DATA` の状態になります。

- `kubernetes.kubelet.check.ping`:<br>
    `CRITICAL` または `NO DATA` の場合、Kubelet の API は使用できません

- `kubernetes.kubelet.check.syncloop`:<br>
    `CRITICAL` または `NO DATA` の場合、コンテナを更新する Kubelet の同期ループは機能しません。

- `kubernetes_state.node.ready`:<br>
    クラスターノードの準備ができていない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

- `kubernetes_state.node.out_of_disk`:<br>
    クラスターノードにディスク容量がない場合は `CRITICAL` を返します。。それ以外の場合は`OK` を返します。

- `kubernetes_state.node.disk_pressure`:<br>
    クラスターノードがディスク圧縮状態の場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

- `kubernetes_state.node.memory_pressure`:<br>
    クラスターノードがメモリ圧縮状態の場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

- `kubernetes_state.node.network_unavailable`:<br>
    クラスターノードがネットワーク使用不可能状態の場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

- `kubernetes_state.cronjob.on_schedule_check`:<br>
    cron ジョブの予約時間が過ぎている場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}