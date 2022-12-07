---
kind: documentation
title: コンテナでのホスト名検出
---

Datadog の多くの機能は、監視するホストの正確なホスト名を提供するために、Agent に依存しています。Agent がホスト上で直接実行される場合、これは簡単ですが、Agent がコンテナ化された環境で実行される場合、ホスト名解決プロセスは異なっています。

バージョン **7.40** 以降、Agent はコンテナ環境でのホスト名解決に失敗したことを適切に認識するようになりました。解決されたホスト名がない場合、Agent は起動後すぐにエラーで終了します。

そのような場合、ログに以下のような `ERROR` メッセージが出力されます。
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

このエラーが発生するのは、通常、Agent の構成の一部が正しくないことを意味します。この誤構成の様々な一般的なケースを解決するために、次の情報を使用してください。

## Kubernetes のホスト名エラー

Kubernetes では、ホスト名エラーは通常、Agent が少なくとも次のいずれかにアクセスできないことを意味します。
* Kubelet API
* クラウドプロバイダーのメタデータエンドポイント
* コンテナランタイム API

Kubernetes ディストリビューションによっては、専用の構成が必要なものもありますので、[Kubernetes の推奨構成][1]に沿った構成であることを確認してください。

### Kubelet API へのアクセス

Agent が Kubelet API にアクセスできることを確認します。アクセスできると、Agent はこのログを出力します。
```
Successful configuration found for Kubelet, using URL: ******
```

Kubernetes の RBAC 権限は、Datadog 公式の[ヘルムチャート][2]、[Datadog Operator][3]、Datadog 公式の[マニフェスト][4]で自動的に設定されます。Agent のデプロイに別のソリューションを使用する場合は、Agent サービスアカウントにバインドされる `Role` または `ClusterRole` に以下の権限が存在することを確認してください。

```yaml
rules:
  - apiGroups: # Kubelet の接続性
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/proxy
      - nodes/stats
    verbs:
      - get
```

Kubelet API への接続を妨げる最も一般的なエラーは、Kubelet の TLS 証明書の検証です。多くの Kubernetes ディストリビューションでは、Kubelet の証明書は以下のどちらかです。
* クラスター CA によって署名されていない。
* 到達可能なアドレスに対応する SAN が含まれていない。

これは、TLS 検証がデフォルトで有効になっているため、Agent が HTTPS で Kubelet API に接続できないようにするためです。

専用のパラメーターを使用するか、Agent マニフェストの**すべてのコンテナ**に対して `DD_KUBELET_TLS_VERIFY` 変数を設定することにより、TLS 検証を無効化することができます。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}
{{% tab "Operator" %}}

`DatadogAgent` Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    config:
      kubelet:
        tlsVerify: false
```

{{% /tab %}}
{{% tab "マニフェスト" %}}

`DaemonSet` マニフェスト:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_KUBELET_TLS_VERIFY
              value: "false"
```

{{% /tab %}}
{{< /tabs >}}

### クラウドプロバイダーのメタデータエンドポイントへのアクセス

AWS、GCP、または Azure で実行する場合、Agent はホスト名を取得するためにメタデータエンドポイントを使用することができます。

クラウドプロバイダーのメタデータエンドポイントにアクセスすることで、Datadog は Agent データとアプリケーション内のクラウドインテグレーションデータを適切に照合することができます。

この問題に遭遇することは、通常、メタデータエンドポイントへのアクセスが制限されていることを意味します。
例えば AWS の場合、[ホップ制限の設定][5]が原因である可能性があります。

### コンテナランタイム API へのアクセス

このソリューションは、Agent が Kubelet API に接続することを**明示的に**望まない場合、および上記のサポートされるクラウドプロバイダーで実行していない場合にのみ使用してください。

この場合、Download API を使用して `DD_HOSTNAME` を設定することができます。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Operator" %}}

`DatadogAgent` Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    env:
      - name: DD_HOSTNAME
        valueFrom:
          fieldRef:
            fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "マニフェスト" %}}

`DaemonSet` マニフェスト

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
```

{{% /tab %}}
{{< /tabs >}}

## AWS ECS と Docker VM のホスト名エラー

クラウドプロバイダー上の Docker で Agent を実行する場合、ホスト名エラーは通常、Agent が少なくとも次のいずれかにアクセスできないことを意味します。
* コンテナランタイム API
* クラウドプロバイダーのメタデータエンドポイント

### コンテナランタイム API へのアクセス

Agent が Docker ソケットに接続できるようにします。

{{< tabs >}}
{{% tab "EC2 上の AWS ECS" %}}

[タスク定義][1]で Docker ソケットがマウントされていることを確認します。


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "VM 上の Docker" %}}

`docker run` コマンドで Docker ソケットがマウントされていることを確認します。

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### クラウドプロバイダーのメタデータエンドポイントへのアクセス

AWS、GCP、または Azure で実行する場合、Agent はホスト名を取得するためにメタデータエンドポイントを使用することができます。

クラウドプロバイダーのメタデータエンドポイントにアクセスすることで、Datadog は Agent データとアプリケーション内のクラウドインテグレーションデータを適切に照合することができます。

この問題に遭遇することは、通常、メタデータエンドポイントへのアクセスが制限されていることを意味します。
例えば AWS の場合、[ホップ制限の設定][5]が原因である可能性があります。

## CI 環境とサイドカーセットアップでのホスト名エラー

Agent を **CI 環境** (つまり Agent はエフェメラル) またはホスト情報にアクセスできないサイドカーとして実行する場合、`DD_HOSTNAME` を以下の値に設定します。

```
-e DD_HOSTNAME=$(hostname)
```

または

```
-e DD_HOSTNAME=<my_hardcoded_hostname>
```

**注:** Fargate のようなサーバーレスソリューションには適用されません。

上記の解決策で Agent の設定がうまくいかない場合は、[Datadog サポートチーム][6]までご連絡ください。

[1]: /ja/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /ja/containers/troubleshooting/duplicate_hosts
[6]: /ja/help/