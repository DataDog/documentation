---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/secret_management.md
title: Secret の管理
---
セキュリティを強化するため、Datadog Operator は [Secrets][4] を使用して Datadog の認証情報 (API キーとアプリケーション キー) を取得できます。

## Secret の設定

Secret を設定するには、次のいずれかの方法を選択します:

### DatadogAgent リソースに平文の認証情報を設定する

**この方法はテスト用途にのみ推奨されます。**

`DatadogAgent` の spec に API キーとアプリケーション キーを追加します:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  # ...
```

ここで指定した認証情報は、Operator によって作成される Secret に保存されます。`DatadogAgent` CRD に対する RBAC を適切に設定することで、これらの認証情報を閲覧できるユーザーを制限できます。

### Secret 参照を使用する

1. Secret を作成します:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: datadog-api-secret
   data:
     api_key: <DATADOG_API_KEY>

   ---
   apiVersion: v1
   kind: Secret
   metadata:
     name: datadog-app-secret
   data:
     app_key: <DATADOG_APP_KEY>
   ```

2. `DatadogAgent` リソースで、これらの Secret の名前を指定します:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiSecret:
           secretName: datadog-api-secret
           keyName: api-key
         appSecret:
           secretName: datadog-app-secret
           keyName: app-key
     # ...
   ```



**注**: 同じ Secret を使用して両方の認証情報を保存することもできます:

```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
data:
  api_key: <DATADOG_API_KEY>
  app_key: <DATADOG_APP_KEY>
```

次に、`DatadogAgent` リソースで:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
  # ...
```
## secret backend を使用する

Datadog Operator は [secret backend][1] と互換性があります。

### secret backend を使用して Datadog Operator をデプロイする

1. secret backend のコマンドを含む Datadog Operator のコンテナ イメージを作成します。

   独自に作成する場合は、次の Dockerfile の例では、`latest` イメージをベース イメージとして使用し、`my-secret-backend.sh` スクリプト ファイルをコピーします:

   ```Dockerfile
   FROM gcr.io/datadoghq/operator:latest
   COPY ./my-secret-backend.sh /my-secret-backend.sh
   RUN chmod 755 /my-secret-backend.sh
   ```

   次に、以下を実行します。

   ```shell
   docker build -t datadog-operator-with-secret-backend:latest .
   ```

2. `.Values.secretBackend.command` パラメーターにコンテナ内の secret backend コマンドのパスを設定した状態で、Datadog Operator のデプロイメントをインストールまたは更新します。カスタム イメージを使用している場合は、そのイメージを更新します。

   ```shell
   $ helm [install|upgrade] dd-operator --set "secretBackend.command=/my-secret-backend.sh" --set "image.repository=datadog-operator-with-secret-backend" ./chart/datadog-operator
   ```

### Secret ヘルパーの使用

**注**: Datadog Operator v0.5.0+ が必要です。

Kubernetes は、Secrets を pod 内のファイルとして公開することをサポートしています。Datadog は、Datadog Operator イメージ内に、ファイルから Secrets を読み取るためのヘルパー スクリプトを提供しています。

1. Operator コンテナに Secret をマウントします。例えば、`/etc/secret-volume` にマウントできます。

2. `.Values.secretBackend.command` パラメーターを `/readsecret.sh` に、`.Values.secretBackend.arguments` パラメーターを `/etc/secret-volume` に設定して、Datadog Operator デプロイメントをインストールまたは更新します:

   ```shell
   helm [install|upgrade] dd-operator --set "secretBackend.command=/readsecret.sh" --set "secretBackend.arguments=/etc/secret-volume" ./chart/datadog-operator
   ```

### DatadogAgent で secret backend 機能を使用して Agent コンポーネントをデプロイする

**注**: Datadog Operator v1.11+ が必要です。

#### カスタム スクリプトを使用する場合

カスタム スクリプトを使用している場合は、Datadog Agent (または Cluster Agent) のイメージを作成し、`ENC[<placeholder>]` を用いて認証情報を指定し、`spec.global.secretBackend.command` に secret backend コマンドを指定します:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiKey: ENC[<api-key-secret-id>]
         appKey: ENC[<app-key-secret-id>]
       secretBackend:
         command: "/my-secret-backend.sh"
     # ...
   ```

この構成で設定される環境変数 `DD_SECRET_BACKEND_COMMAND` は、デプロイされるすべてのコンポーネントに自動的に適用されます: node Agent、Cluster Agent、Cluster Checks Runners。すべてのコンポーネントで使用するイメージに、指定したコマンドが含まれていることを確認してください。

#### ヘルパー関数を使用する場合

利便性のため、Datadog Agent および Cluster Agent のイメージには、ファイルおよび Kubernetes Secrets の両方から読み取るために使用できる `readsecret_multiple_providers.sh` [ヘルパー関数][2] が含まれています。Secret を作成したら、`spec.global.secretBackend.command` を `"/readsecret_multiple_providers.sh"` に設定します。

例えば、Agent と Cluster Agent で secret backend を使用するには、"test-secret" という名前の Secret を作成します:

`kubectl create secret generic test-secret --from-literal=api_key='<api-key>' --from-literal=app_key='<app-key>'`

その後、DatadogAgent の spec を設定します:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
    credentials:
      apiKey: ENC[k8s_secret@default/test-secret/api_key]
      appKey: ENC[k8s_secret@default/test-secret/app_key]
```

## 補足

### ServiceAccount の権限

`"/readsecret_multiple_providers.sh"` ヘルパーにより、Agent は自身の Namespace と他の Namespace の両方にわたる Kubernetes Secrets を直接読み取ることができます。関連する ServiceAccount に適切な Roles と RoleBindings を割り当て、必要な権限が付与されていることを確認してください。これらは手動で設定するか、次のオプションを使用できます:

- `global.secretBackend.enableGlobalPermissions`: Agents が Kubernetes Secrets を **すべて** 読み取れるようにする ClusterRole を作成するかどうかを決定します。

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       secretBackend:
         command: "/readsecret_multiple_providers.sh"
         enableGlobalPermissions: true
   # ...
   ```

- `global.secretBackend.roles`: `enableGlobalPermissions` を置き換え、Agents がアクセスできる namespace/secret の一覧を詳細に指定します。

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       secretBackend:
         command: "/readsecret_multiple_providers.sh"
         roles:
         - namespace: rabbitmq-system
           secrets:
           - "rabbitmqcluster-sample-default-user"
   # ...
   ```

   この例では、`rabbitmq-system` Namespace の Secret `rabbitmqcluster-sample-default-user` への読み取りアクセスを付与する Role が作成されます。

   **注**: `roles` リスト内の各 Namespace は、Datadog Operator デプロイメントの環境変数 `WATCH_NAMESPACE` または `DD_AGENT_WATCH_NAMESPACE` にも設定する必要があります。

### secret backend の構成オプション

Agent と Cluster Agent に対しては、secret backend コマンドに関するその他の構成オプションがあります:
  * `global.secretBackend.args`: Agent が secret backend コマンドを実行する際にコマンドへ渡される引数です。
  * `global.secretBackend.timeout`: secret backend の実行タイムアウトを秒数で指定します。デフォルト値は 30 秒です。

Operator 1.11 より前のバージョンでは、`spec.global.secretBackend` は使用できません。代わりに [これらの手順][3] に従ってください。

[1]: https://docs.datadoghq.com/ja/agent/guide/secrets-management
[2]: https://docs.datadoghq.com/ja/agent/guide/secrets-management/?tab=linux#script-for-reading-from-multiple-secret-providers
[3]: https://github.com/DataDog/datadog-operator/blob/2bbda7adace27de3d397b3d76d87fbd49fa304e3/docs/secret_management.md#how-to-deploy-the-agent-components-using-the-secret-backend-feature-with-datadogagent
[4]: https://kubernetes.io/docs/concepts/configuration/secret/