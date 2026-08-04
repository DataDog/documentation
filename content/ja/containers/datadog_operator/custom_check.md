---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/custom_check.md
title: カスタムチェック
---
[カスタム チェック][1]を実行するには、`DatadogAgent` リソースを構成して、初期化時にカスタム チェック (`checks.d`) とそれに対応する構成ファイル (`conf.d`) を提供します。各チェック スクリプト ファイルとその構成ファイルごとに ConfigMap リソースを構成する必要があります。

このページでは、`hello.world` メトリクスを Datadog に送信するカスタム チェック `hello` の設定方法を説明します。

Datadog エコシステムにおけるチェックの詳細については、[インテグレーション入門][2]を参照してください。[Datadog インテグレーション][3]を設定するには、[Kubernetes とインテグレーション][4]を参照してください。

## チェック ファイルの作成

各チェックには、構成ファイル (`hello.yaml`) とスクリプト ファイル (`hello.py`) が必要です。

1. 以下の内容で `hello.yaml` を作成します。

   ```yaml
   init_config:

   instances: [{}]
   ```

2. 以下の内容で `hello.py` を作成します。

   ```python
   from datadog_checks.base import AgentCheck

   __version__ = "1.0.0"
   class HelloCheck(AgentCheck):
       def check(self, instance):
           self.gauge('hello.world', 1, tags=['env:dev'])
   ```

## チェックの ConfigMap の作成

`hello` チェック ファイルを作成したら、関連する ConfigMap を作成します。

1. カスタム チェックの YAML 構成ファイル `hello.yaml` 用の ConfigMap を作成します。

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE confd-config --from-file=hello.yaml
   configmap/confd-config created
   ```

2. ConfigMap が正しく作成されたことを確認します。

   ```bash
   $ kubectl get configmap -n $DD_NAMESPACE confd-config -o yaml
   apiVersion: v1
   data:
     hello.yaml: |
       init_config:

       instances: [{}]
   kind: ConfigMap
   metadata:
     name: confd-config
     namespace: datadog
   ```

3. カスタム チェックの Python ファイル `hello.py` 用の ConfigMap を作成します。

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE checksd-config --from-file=hello.py
   configmap/checksd-config created
   ```

4. ConfigMap が正しく作成されたことを確認します。

   ```bash
   $ kubectl get configmap -n $DD_NAMESPACE checksd-config -o yaml
   apiVersion: v1
   data:
     hello.py: |
      from datadog_checks.base import AgentCheck

      __version__ = "1.0.0"
      class HelloCheck(AgentCheck):
        def check(self, instance):
          self.gauge('hello.world', 1, tags=['env:dev'])
    kind: ConfigMap
    metadata:
      name: checksd-config
      namespace: datadog
   ```

## Datadog Agent の構成

ConfigMap を作成したら、それらを使用するための `DatadogAgent` リソースを作成します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "<DATADOG_API_KEY>"
      appKey: "<DATADOG_APP_KEY>"
  override:
    nodeAgent:
      extraConfd:
        configMap:
          name: confd-config
      extraChecksd:
        configMap:
          name: checksd-config
```

**注**: 作成する ConfigMap は、`DatadogAgent` リソースと同じ `DD_NAMESPACE` にある必要があります。

これにより Datadog Agent がカスタム チェック付きでデプロイされます。

### 複数のチェック用 ConfigMap

ConfigMap には、複数のチェックやそれぞれの構成ファイルの内容を登録することができます。

#### すべてのチェック スクリプト ファイルを登録する

```bash
$ kubectl create cm -n $DD_NAMESPACE checksd-config $(find ./checks.d -name "*.py" | xargs -I'{}' echo -n '--from-file={} ')
configmap/checksd-config created
```

#### すべてのチェックの構成ファイルを登録する

```bash
$ kubectl create cm -n $DD_NAMESPACE confd-config $(find ./conf.d -name "*.yaml" | xargs -I'{}' echo -n '--from-file={} ')
configmap/confd-config created
```

## 追加ボリュームの提供

`volumes` および `volumeMounts` プロパティを設定することで、ノードまたは Cluster Agent コンテナのいずれかに、ユーザー設定ボリュームを追加でマウントできます。 

**例**: ボリュームを使用してシークレットをマウント

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "<DATADOG_API_KEY>"
      appKey: "<DATADOG_APP_KEY>"
  override:
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:latest"
      volumes:
        - name: secrets
          secret:
            secretName: secrets
      containers:
        agent:
          volumeMounts:
            - name: secrets
              mountPath: /etc/secrets
              readOnly: true
```
[1]: https://docs.datadoghq.com/ja/developers/custom_checks/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/
[3]: https://docs.datadoghq.com/ja/integrations/
[4]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=annotations