---
further_reading:
- link: /containers/datadog_operator
  tag: documentation
  text: Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: ソースコード
  text: 'Datadog Operator: 高度なインストール'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: ソースコード
  text: 'Datadog Operator: 構成'
title: Datadog Operator の概要
---

[Datadog Operator][1] は、Kubernetes 環境に Datadog Agent をデプロイし、構成することができるオープンソースの [Kubernetes Operator][2] です。このガイドでは、Datadog Agent をデプロイするために Operator を使用する方法について説明します。

## 前提条件

- Kubernetes v1.20.X+
- Datadog Operator をデプロイするための [Helm][3]
- Datadog Agent をインストールするための Kubernetes コマンドラインツール、[kubectl][4]

## インストールとデプロイメント

1. Helm で Datadog Operator をインストールします。
   ```bash
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. API キーで Kubernetes Secret を作成する
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   `<DATADOG_API_KEY>` をお使いの [Datadog API キー][5] に置き換えます。

   **注**: 外部メトリクス サーバーを使用してオートスケーリングを行う場合は、`--from-literal app-key=<DATADOG_APP_KEY>` を追加してアプリケーション キーを設定してください。

3. `DatadogAgent` のデプロイメント構成の仕様を記述した `datadog-agent.yaml` ファイルを作成します。以下のサンプル構成では、メトリクス、ログ、APM を有効にしています。
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       site: datadoghq.com
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         enabled: true
       logCollection:
         enabled: true
   ```
   **注**: `site` には、使用している Datadog サイト (例: `datadoghq.eu`) を必ず設定してください。

   For all configuration options, see the [Operator configuration spec][6].

4. Datadog Agent をデプロイします。
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

### 単一コンテナでの Agent 実行

<div class="alert alert-danger">Operator v1.4.0 以降で利用可能</div>

デフォルトでは、Datadog Operator は複数の Agent コンテナを実行するポッドを持つ Agent DaemonSet を作成します。Datadog Operator v1.4.0 では、Agent を単一コンテナで実行できる設定が導入されました。単一コンテナ内のすべての Agent に特権を付与しないようにするため、この機能は `system-probe` または `security-agent` が不要な場合にのみ適用されます。詳細は Agent Data Security ページの [非特権ユーザーとしての実行][7] を参照してください。

この機能を有効にするには、`DatadogAgent` マニフェストに `global.containerStrategy: single` を追加します:

{{< highlight yaml "hl_lines=7" >}}
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      containerStrategy: single
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
{{< /highlight >}}
上記の設定では、Agent Pod は 3 つの Agent プロセスを含む単一コンテナとして実行されます。`global.containerStrategy` のデフォルトは `optimized` で、各 Agent プロセスを個別のコンテナで実行します。

**注**: Kubernetes などのオーケストレーション環境では、単一コンテナで複数の Agent プロセスを実行することは推奨されません。複数プロセスを実行する Pod では、プロセス マネージャーによるライフサイクル管理が必要ですが、これは Kubernetes から直接制御できないため、コンテナのライフサイクル管理に不整合や競合が発生する可能性があります。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/ja/data_security/agent/#running-as-an-unprivileged-user