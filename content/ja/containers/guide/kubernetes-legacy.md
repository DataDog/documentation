---
title: Legacy Kubernetes versions
aliases:
    - /agent/kubernetes/legacy
    - /agent/faq/kubernetes-legacy
    - /agent/guide/kubernetes-legacy
further_reading:
- link: /agent/kubernetes/daemonset_setup/
  tag: documentation
  text: Kubernetes DaemonSet Setup
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Kubernetes Host Setup
- link: /agent/kubernetes/metrics/
  tag: documentation
  text: Kubernetes Metrics
---

デフォルトの構成は Kubernetes 1.7.6 以降を対象にしています。これは、Agent がこのバージョンから導入された機能とエンドポイントに依存しているためです。古いバージョンの方がインストール手順が多くなっています。

- [RBAC オブジェクト][1] (`ClusterRoles` と `ClusterRoleBindings`) は Kubernetes 1.6 および OpenShift 3.3 から利用可能ですが、複数の `apiVersion` プレフィックスがあります。

  * Kubernetes 1.8+ (および OpenShift 3.9+) の場合は `rbac.authorization.k8s.io/v1`。これはデフォルトの apiVersion です。
  * Kubernetes 1.5 ～ 1.7 (および OpenShift 3.7) の場合は `rbac.authorization.k8s.io/v1beta1`
  * Openshift 3.3 ～ 3.6 の場合は `v1`

    次の `sed` 呼び出しを使用して、Datadog Agent yaml マニフェストを適用します。

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    Openshift 3.3 ～ 3.6 の場合は次のようにします。

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- `kubelet` チェックは、Kubernetes 1.7.6+ (OpenShift 3.7.0+) Prometheus エンドポイントからメトリクスを取得します。古いバージョンでは、[cAdvisor ポートモードを有効にします][2]。

- デフォルトの DaemonSet は、[Downward API][3] を利用して kubelet の IP をエージェントに渡します。これはバージョン 1.7 以降で機能します。古いバージョンで kubelet 接続を有効にするには、別の方法があります。

  * バージョン 1.6 では、`fieldPath: spec.nodeName` を使用し、ノード名が解決可能かつポッドから到達可能であることを検証します。
  * `DD_KUBERNETES_KUBELET_HOST` が設定されていない場合、Agent は、docker からノードのホスト名を取得し、そこへの接続を試みます。`docker info | grep "Name:"` を参照し、名前が解決可能かつ到達可能であることを検証します。
  * クラスター全体で docker のデフォルトゲートウェイの IP が同じ場合は、その IP を `DD_KUBERNETES_KUBELET_HOST` 環境変数で渡します。IP は `ip addr show | grep docker0` コマンドで取得できます。

- デフォルトの構成は、API サーバーと kubelet への[ベアラートークン認証][4]に依存します。1.3 では、kubelet がベアラートークン認証をサポートしません。`datadog-agent` サービスアカウントのクライアント証明書をセットアップし、それをエージェントに渡します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/admin/authorization/rbac
[2]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[3]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[4]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens
