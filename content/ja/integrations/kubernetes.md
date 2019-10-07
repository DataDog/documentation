---
integration_title: Kubernetes
name: Kubernetes
kind: インテグレーション
git_integration_title: Kubernetes
newhlevel: true
updated_for_agent: 6
description: Kubernetes クラスターとそこで実行されているアプリケーションの状態を監視します。Pod スケジュールイベントをキャプチャし、Kubelets のステータスのトレースなどを実行します。
is_public: true
aliases:
  - /ja/tracing/api/
  - /ja/integrations/kubernetes_state/
  - /ja/integrations/kube_proxy/
  - /ja/integrations/Kubernetes
public_title: Datadog-Kubernetes インテグレーション
short_description: Pod スケジュールイベントをキャプチャし、Kublets のステータスのトレースなどを実行します
categories:
  - cloud
  - configuration & deployment
  - containers
  - orchestration
  - log collection
doc_link: /integrations/kubernetes/
ddtype: check
---
{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" responsive="true" >}}

## 概要

Kubernetes サービスからリアルタイムでメトリクスとログを取得するには

* Kubernetes の状態を視覚化して監視します。
* Kubernetes フェイルオーバーとイベントについて通知されます。

Kubernetes の場合は、DaemonSet で Agent を実行することをお勧めします。Docker と Kubernetes 両方のインテグレーションを有効にして、[Docker イメージ][1]を作成しました。

ホストで Datadog Agent を実行して構成するだけで、Kubernetes メトリクスを収集できます。

## Kubernetes のセットアップ

[Kubernetes インテグレーションの詳細なセットアップ方法については、別途ドキュメントをご用意していますのでこちらをご参照ください][2]

## Kubernetes Stateのセットアップ
### インストール

kube-state メトリクスを収集するには

1. [Kube-State マニフェストフォルダー][3]をダウンロードします。

2. Kubernetes クラスターに適用します。
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

完了すると、kube-state メトリクスが自動的に収集されます。

## Kubernetes DNS のセットアップ
### コンフィグレーション

[Agent v6][4] 以降では、Kubernetes DNS インテグレーションは [Autodiscovery][5] と自動的に連動します。

注: 現時点で、これらのメトリクスは Azure Kubernetes Service (AKS) では使用できません。

## コンテナログの収集

**Agent 6.0 以上で使用可能**

次の 2 つのインストールが使用可能です。

- Agent が Docker 環境の外部にあるノード
- コンテナ化されたバージョンの Docker 環境へのデプロイ

DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][6]します。そうしない場合は、[コンテナログ収集ステップ][7]に従って、すべてのコンテナのログの収集を開始します。

## 収集データ
### メトリクス
#### Kubernetes
{{< get-metrics-from-git "kubernetes" >}}

#### Kubelet
{{< get-metrics-from-git "kubelet" >}}

#### Kubernetes State

`kubernetes_state.*` メトリクスは `kube-state-metrics` API から収集されます。

{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS
{{< get-metrics-from-git "kube_dns" >}}

#### Kubernetes プロキシ
{{< get-metrics-from-git "kube_proxy" >}}

### イベント

5.17.0 リリースでは、Datadog Agent は、Kubernetes イベントコレクター用に組み込みの[leader election オプション][8]をサポートしています。有効にすると、クラスターに追加のイベントコレクションコンテナをデプロイする必要はありません。代わりに、Agent は一度に 1 つの Agent インスタンスのみがイベントを収集するように調整します。以下のイベントを使用できます。

* Backoff
* Conflict
* Delete
* DeletingAllPods
* Didn't have enough resource
* エラー
* Failed
* FailedCreate
* FailedDelete
* FailedMount
* FailedSync
* Failedvalidation
* FreeDiskSpaceFailed
* HostPortConflict
* InsufficientFreeCPU
* InsufficientFreeMemory
* InvalidDiskCapacity
* Killing
* KubeletsetupFailed
* NodeNotReady
* NodeoutofDisk
* OutofDisk
* Rebooted
* TerminatedAllPods
* Unable
* Unhealthy

### サービスのチェック

Kubernetes チェックは、次のサービスチェックを含みます。

* `kubernetes.kubelet.check`:
  `CRITICAL` の場合、`kubernetes.kubelet.check.ping` または `kubernetes.kubelet.check.syncloop` は、`CRITICAL` または `NO DATA` の状態になります。

* `kubernetes.kubelet.check.ping`:
  `CRITICAL` または `NO DATA` の場合、Kubelet の API は使用できません

* `kubernetes.kubelet.check.syncloop`:
  `CRITICAL` または `NO DATA` の場合、コンテナを更新する Kubelet の同期ループは機能しません。

* `kubernetes_state.node.ready`:
  クラスターノードの準備ができていない場合は、`CRITICAL` を返します。それ以外の場合、`OK` を返します。

* `kubernetes_state.node.out_of_disk`:
  クラスターノードにディスク容量がない場合は `CRITICAL` を返します。それ以外の場合、`OK` を返します。

* `kubernetes_state.node.disk_pressure`:
  クラスターノードがディスク圧縮状態の場合は、`CRITICAL` を返します。それ以外の場合、`OK` を返します。

* `kubernetes_state.node.memory_pressure`:
  クラスターノードがメモリ圧縮状態の場合は、`CRITICAL` を返します。それ以外の場合、`OK` を返します。

* `kubernetes_state.node.network_unavailable`:
  クラスターノードがネットワーク使用不可能状態の場合は、`CRITICAL` を返します。それ以外の場合、`OK` を返します。

## トラブルシューティング

* [Kubernetes マスターノードに Agent をインストールできますか][9]
* [ポート 10250 への Kubernetes チェックが ConnectTimeout エラーで失敗するのはなぜですか][10]
* [dd-agent が docker コンテナで実行されている場合のホストディスクメトリクスの報告方法][11]
* [apiserver と kubelet に対するクライアント認証][12]
* [Kubernetes インテグレーションを使用した RBAC アクセス許可][13]

## その他の参考資料

Kubernetes サービスを統合する方法 (または統合すべき理由) についてさらに知りたい方は、Datadog のこちらの[ブログシリーズ][14]をご覧ください。

[1]: https://hub.docker.com/r/datadog/agent
[2]: /ja/agent/basic_agent_usage/kubernetes
[3]: https://github.com/kubernetes/kube-state-metrics/tree/master/kubernetes
[4]: /ja/agent
[5]: /ja/agent/autodiscovery
[6]: https://app.datadoghq.com/account/settings#agent/kubernetes
[7]: /ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[8]: /ja/agent/basic_agent_usage/kubernetes/#event_collection
[9]: /ja/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[10]: /ja/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[11]: /ja/agent/faq/getting-further-with-docker
[12]: /ja/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[13]: /ja/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[14]: https://www.datadoghq.com/blog/monitoring-kubernetes-era