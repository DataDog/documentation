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
git_integration_title: Kubernetes
integration_id: kubernetes
integration_title: Kubernetes
is_public: true
kind: インテグレーション
name: Kubernetes
newhlevel: true
public_title: Datadog-Kubernetes インテグレーション
short_description: Pod スケジュールイベントをキャプチャし、Kubelets のステータスのトレースなどを実行します。
updated_for_agent: 6.0
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes ダッシュボード" >}}

## 概要

Kubernetes サービスからリアルタイムでメトリクスとログを取得するには

- Kubernetes の状態を視覚化して監視します。
- Kubernetes フェイルオーバーとイベントについて通知されます。

## セットアップ

For Kubernetes の場合は、Agent をクラスターでコンテナとして実行することをおすすめします。

**[Kubernetes クラスターで Agent をデプロイするには、別途 Kubernetes ドキュメントを参照してください][1]**。

**注**: [ホストで Datadog Agent を実行][2]して構成することで Kubernetes メトリクスを収集することも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/
[2]: /ja/integrations/faq/kubernetes-host-installation/