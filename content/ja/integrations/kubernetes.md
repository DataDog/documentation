---
aliases:
- /ja/integrations/kubernetes_state
- /ja/integrations/kube_proxy
- /ja/integrations/Kubernetes
categories:
- cloud
- configuration & deployment
- containers
- orchestration
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md
description: Kubernetes クラスターとそこで実行されているアプリケーションの状態を監視します。Pod スケジュールイベントをキャプチャし、Kubelets
  のステータスのトレースなどを実行します。
doc_link: /integrations/kubernetes/
further_reading:
- link: https://www.datadoghq.com/blog/debug-kubernetes-pending-pods/
  tag: ブログ
  text: Kubernetes の保留中のポッドとスケジュールの失敗をデバッグする方法
- link: https://www.datadoghq.com/blog/monitoring-kubernetes-era
  tag: ブログ
  text: Kubernetes 時代のモニタリング
- link: https://www.datadoghq.com/blog/monitor-kubernetes-events/
  tag: ブログ
  text: Kubernetes イベントのトラブルシューティング
git_integration_title: Kubernetes
integration_id: kubernetes
integration_title: Kubernetes
is_public: true
custom_kind: integration
name: Kubernetes
newhlevel: true
public_title: Datadog-Kubernetes インテグレーション
short_description: Pod スケジュールイベントをキャプチャし、Kubelets のステータスのトレースなどを実行します。
updated_for_agent: 6.0
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes ダッシュボード" >}}

## 概要

Kubernetes からメトリクスとログをリアルタイムで取得し、次のことが可能になります。

- Kubernetes の状態を視覚化および監視できます。
- Kubernetes のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Kubernetes の場合、Datadog は Agent をクラスター内のコンテナとして実行することを推奨します。

**[Kubernetes クラスターで Agent をデプロイするには、別途 Kubernetes ドキュメントを参照してください][1]**。

**注**: [ホストで Datadog Agent を実行][2]して構成することで Kubernetes メトリクスを収集することも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/
[2]: /ja/integrations/faq/kubernetes-host-installation/