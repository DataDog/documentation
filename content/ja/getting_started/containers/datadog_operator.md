---
further_reading:
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: オートディスカバリーのインテグレーションテンプレートの作成とロード
- link: /agent/guide/ad_identifiers/
  tag: ドキュメント
  text: コンテナと該当するインテグレーションテンプレートとの対応
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent オートディスカバリーに含めるコンテナの管理
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: アプリケーションのタグの動的割り当てと収集
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: ECS Fargate のインテグレーションセットアップ
- link: /agent/guide/secrets-management/
  tag: ドキュメント
  text: 機密情報管理
kind: documentation
title: Datadog Operator の概要
---

このガイドでは、Datadog Operator の説明、インストール方法、Datadog Agent を Kubernetes にインストールするための使用方法について説明します。

## Datadog Operator とは？

Datadog Operator は、Kubernetes 環境に Datadog Agent をデプロイし、構成することができるオープンソースの [Kubernetes Operator][1] です。Operator を使用することで、単一の Custom Resource Definition (CRD) を使用して、ノードベースの Agent、Cluster Agent、Cluster Checks Runner をデプロイすることができます。Operator は、デプロイのステータス、健全性、およびエラーを Operator の CRD のステータスで報告します。Operator はより高度な構成オプションを使用するため、誤構成のリスクを制限できます。

Agent をデプロイすると、Datadog Operator は次のようなメリットをもたらします。

- Agent 構成の検証
- すべての Agent が構成を常に把握できるようにする
- Agent リソースの作成と更新のためのオーケストレーション
- Operator の CRD ステータスに Agent の構成ステータスを報告する
- オプションとして、Datadog の [ExtendedDaemonSet][2] を使用した高度な DaemonSet のデプロイメントを使用することができます。

<div class="alert alert-warning">Datadog Operator はベータ版です。</div>

## Helm チャートや DaemonSet ではなく、Datadog Operator を使用する理由は何ですか？

Kubernetes に Datadog Agent をインストールするために、Helm チャートまたは DaemonSet を使用することも可能です。しかし、Datadog Operator を使用することで、以下のような利点があります。

- Operator には、Datadog のベストプラクティスに基づくデフォルトが組み込まれています。
- Operator の構成は、将来の機能拡張に対応できるよう、より柔軟になっています。
- [Kubernetes Operator][1] として、Datadog Operator は Kubernetes API でファーストクラスのリソースとして扱われます。
- Helm チャートとは異なり、Operator は Kubernetes の Reconciliation Loop に含まれます。

Datadog は、DaemonSet を使用して Agent をデプロイすることを完全にサポートしていますが、手動で DaemonSet を構成すると、エラーが発生する可能性が高くなります。そのため、DaemonSet の使用はあまり推奨されません。

## 前提条件

- Kubernetes v1.14.X+
- Datadog Operator をデプロイするための [Helm][3]
- Datadog Agent をインストールするための Kubernetes コマンドラインツール、[kubectl][4]

## デプロイ

1. Helm で Datadog Operator をインストールします。
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. お使いの API とアプリキーで Kubernetes シークレットを作成します。
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][5]に置き換えます。

3. `DatadogAgent` のデプロイメント構成の仕様を記述した `datadog-agent.yaml` ファイルを作成します。以下のサンプル構成では、メトリクス、ログ、APM を有効にしています。
  ```yaml
  apiVersion: datadoghq.com/v1alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    agent:
      apm:
        enabled: true
      log:
        enabled: true
  ```

4. Datadog Agent をデプロイします。
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

## 検証

`kubectl get daemonset` と `kubectl get pod -owide` を使用して、インストールを検証します。

2 つのワーカーノードを持つクラスターでは、それぞれのノードに Agent ポッドが作成されているのが確認できるはずです。

```bash
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

## クリーンアップ

以下のコマンドは、本ガイドで作成したすべての Kubernetes リソースを削除します。

```bash
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[2]: https://github.com/DataDog/extendeddaemonset
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/account/settings#api