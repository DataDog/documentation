---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /ja/agent/faq/kubernetes-secrets
- /ja/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: ドキュメント
  text: Autodiscovery
title: シークレット管理
---
## 概要{#overview}

Datadog Agent を次のシークレット管理ソリューションと統合することで、シークレットを安全に管理できるようになります。
- [AWS Secrets Manager](#id-for-secrets)
- [AWS SSM](#id-for-ssm)
- [Azure Key Vault](#id-for-azure)
- [GCP Secret Manager](#id-for-gcp)
- [HashiCorp Vault](#id-for-hashicorp)
- [Kubernetes Secrets](#id-for-kubernetes)
- [Docker Secrets](#id-for-docker)
- [テキストファイル](#id-for-json-yaml-text)
- [JSON ファイル](#id-for-json-yaml-text)
- [YAML ファイル](#id-for-json-yaml-text)
- [Windows レジストリキー](#id-for-windows-regkey)

設定ファイル内に API キーやパスワードなどの機密性の高い値をプレーンテキストでハードコーディングしなくても、Agent が実行時にこれらの値を動的に取得できます。設定ファイル内のシークレットを参照するには、`ENC[<secret_id>]` 表記を使用します。これにより、シークレットが取得されてメモリに読み込まれますが、ディスクに書き込まれたり、Datadog バックエンドに送信されたりすることはありません。

**注**: `secret_backend_command` などの `secret_*` の設定で、`ENC[]`構文を使用することはできません。

## シークレットを取得する際のオプション{#options-for-retrieving-secrets}

### オプション 1: ネイティブの Agent サポートを使用してシークレットを取得する {#option-1-using-native-agent-support-for-fetching-secrets}

注:
- **Agent 7.70 以降**: ネイティブのシークレット管理サポートが導入されています。
- **Agent 7.76 以降**: FIPS 対応の Agent でネイティブのシークレット管理を利用できます。
- **Agent 7.77 以降**: [Cluster Agent](/containers/cluster_agent/) では、コンテナ化された環境内で Agent 7.77 以降を使用する必要があります。それ以前のバージョンでは、代わりに[オプション 2 ](#option-2-using-the-built-in-script-for-kubernetes-and-docker) または[オプション 3 ](#option-3-creating-a-custom-executable) を使用します。
- **Agent 7.80 以降**: [複数のバックエンド](#multiple-backends)がサポートされます。

#### 単一バックエンド {#single-backend}

`datadog.yaml` で `secret_backend_type` と `secret_backend_config` を使用して、単一のシークレットバックエンドを設定します。

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

具体的なセットアップ手順は、使用するバックエンドのタイプによって異なります。詳細については、次の該当するセクションを参照してください。


{{% collapse-content title="AWS シークレット" level="h5" expanded=false id="id-for-secrets" %}}
次の AWS サービスがサポートされています。

|secret_backend_type の値                                | AWS サービス                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### インスタンスプロファイルを設定する {#set-up-an-instance-profile}

Datadog では [インスタンスプロファイル手法][1006] を使用してシークレットを取得することを推奨しています。こうすると、AWS によってすべての環境変数とセッションプロファイルが処理されます。そのための方法について詳しくは、公式の [AWS Secrets Manager ドキュメント][1000] を参照してください。

##### 設定例 {#configuration-example}

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

AWS シークレットを使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

環境変数を使用する場合は、この構成を次のように JSON に変換します。

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Agent が AWS シークレットを使用するように設定した後は、`ENC[secretId;secretKey]` を使用して設定内の任意のシークレットを参照できます。

ENC 表記は、次の要素からなります。
* `secretId`: シークレットの「フレンドリー名」(例: `/DatadogAgent/Production`) または ARN (例: `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`) のいずれか。
  - **注**: AWS 認証情報または `sts:AssumeRole` 認証情報が定義されている別のアカウントからシークレットにアクセスする場合は、完全な ARN 形式を使用する必要があります。
* `secretKey`: 使用する AWS シークレットの JSON キー。


AWS Secrets Manager では、単一のシークレット内に複数のキーと値のペアを保存できます。Secrets Manager を使用したバックエンド構成では、シークレットで定義されているすべてのキーにアクセスできます。

たとえば、シークレット ID `My-Secrets` に次の 3 つの値が含まれているとします。

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

以下に、AWS シークレットを使用して `datadog.yaml` から API キーを取得するための `My-Secrets` 設定ファイルの完全な例を示します。

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

##### すべての `aws_session` オプション {#all-aws-session-options}

次の `aws_session` フィールドで、AWS に対する Agent の認証方法を設定します。すべてのフィールドはオプションです。いずれのオプションも設定されていない場合、Agent は [デフォルトの認証情報チェーン][1007] (インスタンスプロファイル、環境変数、共有設定ファイルなど) を使用します。

| フィールド | 説明 |
|---|---|
| `aws_region` | AWS リージョン (例: `us-east-1`)。|
| `aws_access_key_id` | 静的 AWS アクセスキー ID。`aws_secret_access_key` と併せて使用します。|
| `aws_secret_access_key` | 静的 AWS シークレットアクセスキー。`aws_access_key_id` と併せて使用します。|
| `aws_profile` | 共有 AWS 設定ファイル内の名前付きプロファイル (`~/.aws/config`)。|
| `aws_role_arn` | `sts:AssumeRole` で想定する IAM ロール ARN。|
| `aws_external_id` | クロスアカウントロールを想定する場合に渡す外部 ID。|

##### `force_string` オプション {#force-string-option}

シークレット文字列を JSON としてパースせずに、そのままの状態で取得するには、`secret_backend_config` の最上位レベルで `force_string: true` を設定します。この方法は、シークレットが JSON オブジェクトではなくプレーンテキストとして保存されている場合に役立ちます。

```yaml
secret_backend_type: aws.secrets
secret_backend_config:
  force_string: true
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm で AWS シークレットを使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
```

<div class="alert alert-info">次を含める必要があります。 <code>serviceAccountAnnotations</code> Agent に AWS シークレットに対するアクセス権限を付与します。</div>

<br>


##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
clusterChecksRunner:
  enabled: true
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>

```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator で AWS シークレットを使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check-1}


```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  override:
    nodeAgent:
      # IAM role ARN is required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secretId;secretKey]"

```

<div class="alert alert-info">次を含める必要があります。 <code>serviceAccountAnnotations</code> Agent に AWS シークレットに対するアクセス権限を付与します。</div>

<br>


##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled-1}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  override:
    nodeAgent:
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"
```

<br>

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled-1}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    [...]
    clusterChecksRunner:
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"

```

**別の方法として**、Datadog Operator v1.25.0 以降および Agent v7.70 以降では、環境変数の代わりにネイティブの `secretBackend.type` および `secretBackend.config` フィールドを使用できます。例: `spec.global.secretBackend.type: "aws.secrets"` および `spec.global.secretBackend.config` (`aws_session.aws_region: "<AWS_REGION>"` を使用)。

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h5" expanded=false id="id-for-ssm" %}}
次の AWS サービスがサポートされています。

|secret_backend_type の値                                | AWS サービス                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### インスタンスプロファイルを設定する {#set-up-an-instance-profile-1}

Datadog では [インスタンスプロファイル手法][1006] を使用してシークレットを取得することを推奨しています。こうすると、AWS によってすべての環境変数とセッションプロファイルが処理されます。そのための方法について詳しくは、公式の [AWS Secrets Manager ドキュメント][1001] を参照してください。

##### 設定例 {#configuration-example-1}

AWS Systems Manager Parameter Store では、階層モデルをサポートしています。たとえば、AWS System Manager Parameter Store のパスが次のようになっているとします。

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

パラメータは次のようにして取得できます。

```yaml
# datadog.yaml
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1

api_key: "ENC[/DatadogAgent/Production/ApiKey]"
property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
```

##### すべての `aws_session` オプション {#all-aws-session-options-1}

次の `aws_session` フィールドで、AWS に対する Agent の認証方法を設定します。すべてのフィールドはオプションです。いずれのオプションも設定されていない場合、Agent は [デフォルトの認証情報チェーン][1007] (インスタンスプロファイル、環境変数、共有設定ファイルなど) を使用します。

| フィールド | 説明 |
|---|---|
| `aws_region` | AWS リージョン (例: `us-east-1`)。|
| `aws_access_key_id` | 静的 AWS アクセスキー ID。`aws_secret_access_key` と併せて使用します。|
| `aws_secret_access_key` | 静的 AWS シークレットアクセスキー。`aws_access_key_id` と併せて使用します。|
| `aws_profile` | 共有 AWS 設定ファイル内の名前付きプロファイル (`~/.aws/config`)。|
| `aws_role_arn` | `sts:AssumeRole` で想定する IAM ロール ARN。|
| `aws_external_id` | クロスアカウントロールを想定する場合に渡す外部 ID。|

{{% /collapse-content %}}


{{% collapse-content title="Azure Key Vault バックエンド" level="h5" expanded=false id="id-for-azure" %}}


次の Azure サービスがサポートされています。

| secret_backend_type の値                            | Azure サービス          |
| ----------------------------------------|------------------------|
| `azure.keyvault` | [Azure Key Vault][2000] |

##### Azure 認証 {#azure-authentication}

Datadog では、Azure での認証にマネージド ID を使用することを推奨しています。こうすると、クラウドのリソースを AMI アカウントに関連付けて、`datadog.yaml` 設定ファイルに機密情報を記述する必要をなくすことができます。

##### マネージド ID {#managed-identity}

Key Vault にアクセスするには、マネージド ID を作成して、それを仮想マシンに割り当てます。次に、その ID でシークレットにアクセスできるよう、Key Vault で適切なロールの割り当てを設定します。

##### 設定例 {#configuration-example-2}

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

Azure Key Vault シークレットのバックエンド設定は、次のスキーマに従った YAML 形式で構成されます。

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
  azure_session:
    azure_client_id: {clientID}  # User-assigned managed identity client ID; omit this field for system-assigned
```

環境変数を使用する場合は、この構成を JSON に変換します。

```sh
DD_SECRET_BACKEND_TYPE="azure.keyvault"
DD_SECRET_BACKEND_CONFIG='{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
```

バックエンドシークレットは、Datadog Agent の設定ファイル内で `ENC[ ]` を使用して参照されます。以下に、プレーンテキストのシークレットを取得する必要がある場合の例を示します。

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

##### すべての `azure_session` オプション {#all-azure-session-options}

次の `azure_session` フィールドで、Azure に対する Agent の認証方法を制御します。すべてのフィールドはオプションです。いずれのオプションも設定されていない場合、Agent は [デフォルトの Azure 認証情報][2001] (環境変数、Workload Identity、システムにより割り当てられたマネージド ID、Azure CLI など) にフォールバックします。

| フィールド | 説明 |
|---|---|
| `azure_client_id` | ユーザー割り当てマネージド ID のクライアント ID、またはサービスプリンシパルのクライアント ID。|
| `azure_tenant_id` | サービスプリンシパル認証用のテナント ID。`azure_client_id` およびクライアントシークレットまたは証明書と併せて必須です。|
| `azure_client_secret` | サービスプリンシパル認証用のクライアントシークレット。|
| `azure_client_certificate_path` | サービスプリンシパル証明書認証用の PEM または PKCS12 証明書ファイルのパス。|
| `azure_client_certificate_password` | 証明書ファイルのパスワード (パスワードで保護されている場合)。|
| `azure_client_send_certificate_chain` | 証明書認証を使用する際に完全な証明書チェーンを送信するには、`true` に設定します。|

認証は、提供されるフィールドに基づいて選択されます。
- **シークレットを使用したサービスプリンシパル**: `azure_tenant_id` + `azure_client_id` + `azure_client_secret`
- **証明書を使用したサービスプリンシパル**: `azure_tenant_id` + `azure_client_id` + `azure_client_certificate_path`
- **ユーザー割り当てマネージド ID**: `azure_client_id`のみ
- **[デフォルトの Azure 認証情報]** (推奨): すべての`azure_session` フィールドを省略

{{% /tab %}}

{{% tab "Helm" %}}

Helm で Azure Key Vault を使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
clusterChecksRunner:
  enabled: true
```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator で Azure Key Vault を使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secretKeyNameInKeyVault]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretKeyNameInKeyVault]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretKeyNameInKeyVault]"
```

**別の方法として**、Datadog Operator v1.25.0 以降および Agent v7.70 以降では、環境変数の代わりにネイティブの `secretBackend.type` および `secretBackend.config` フィールドを使用できます。例: `spec.global.secretBackend.type: "azure.keyvault"` および `spec.global.secretBackend.config` (`keyvaulturl` キーと `azure_session.azure_client_id` キーを使用)。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h5" expanded=false id="id-for-gcp" %}}

*Agent バージョン 7.74 以降で利用可能*

次の GCP サービスがサポートされています。

| secret_backend_type の値                               | GCP サービス                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### GCP 認証およびアクセスポリシー {#gcp-authentication-and-access-policy}

GCP Secret Manager の実装では、Google での認証に [アプリケーションのデフォルト認証情報 (ADC)][5001] を使用します。

GCP Secret Manager とやり取りするには、Datadog Agent が使用するサービスアカウント (仮想マシンのサービスアカウント、Workload Identity、ローカルでアクティブ化された認証情報など) に `secretmanager.versions.access` 権限が必要となります。

これは、事前定義済みのロール {{< ui >}}Secret Manager Secret Accessor{{< /ui >}} (`roles/secretmanager.secretAccessor`) または同等の [アクセス権限][5002] を持つカスタムロールによって付与できます。

GCE または GKE ランタイムでは、インスタンスまたは Pod にアタッチされたサービスアカウントによって ADC が自動的に構成されます。このアタッチされたサービスアカウントには、GCP Secret Manager にアクセスするための適切なロールが必要です。さらに、GCE または GKE ランタイムには `cloud-platform` [OAuth アクセススコープ][5003] も必要です。

##### GCP の設定例{#gcp-configuration-example}

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

GCP Secret Manager を使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

環境変数を使用する場合は、この構成を JSON に変換します。

```sh
DD_SECRET_BACKEND_TYPE="gcp.secretmanager"
DD_SECRET_BACKEND_CONFIG='{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
```

Agent が GCP Secret Manager を使用するように設定した後、設定で `ENC[secret-name]` または `ENC[secret-name;key;version;]` を使用してシークレットを参照します。

ENC 表記は、次の要素からなります。

- `secret`: GCP Secret Manager 内のシークレット名 (例: `datadog-api-key`)。
- `key`: (オプション) JSON 形式のシークレットから抽出するキー。プレーンテキストのシークレットを使用している場合は、これを省略できます (例: `ENC[secret-name;;version]`)。
- `version`: (オプション) シークレットのバージョン番号。指定しない場合は、`latest` バージョンが使用されます。
  + バージョン構文の例:
    - `secret-key` - 暗黙的な `latest` バージョン
    - `secret-key;;latest` - 明示的な `latest` バージョン
    - `secret-key;;1` - 特定のバージョン番号

たとえば、`datadog-api-key` という名前の GCP シークレットに 2 つのバージョンと `datadog-app-key` があるとします。

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

JSON 形式のシークレットとして、`datadog-keys` という名前のシークレットに次の要素が含まれているとします。

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

次のように特定のキーを参照します。

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm で GCP Secret Manager を使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secret-name]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secret-name]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secret-name]"
clusterChecksRunner:
  enabled: true
```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator で GCP Secret Manager を使用してシークレットを解決するように Datadog Agent を設定するには、次の構成を使用します。

##### 統合チェック {#integration-check-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secret-name]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっていない場合{#cluster-check-without-cluster-check-runners-enabled-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secret-name]"
```

##### クラスターチェック: クラスターチェックランナーが有効になっている場合{#cluster-check-with-cluster-check-runners-enabled-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secret-name]"
```

**別の方法として**、Datadog Operator v1.25.0 以降および Agent v7.70 以降では、環境変数の代わりにネイティブの `secretBackend.type` および `secretBackend.config` フィールドを使用できます。例: `spec.global.secretBackend.type: "gcp.secretmanager"` および `spec.global.secretBackend.config` (`gcp_session.project_id: "<PROJECT_ID>"` を使用)。

{{% /tab %}}
{{< /tabs >}}

##### シークレットのバージョン管理 {#secret-versioning}

GCP Secret Manager ではシークレットのバージョンをサポートしています。Agent の実装でも、`;` 区切り文字を使用したシークレットのバージョン管理をサポートしています。バージョンが指定されていない場合は、`latest` バージョンが使用されます。


##### JSON シークレットのサポート {#json-secret-support}

Datadog Agent では、`;` 区切り文字を使用した JSON 形式のシークレットから特定のキーを抽出できるようになっています。

- `datadog;api_key` - 暗黙的 `latest` バージョンの `datadog` シークレットから `api_key` フィールドを抽出
- `datadog;api_key;1`  - バージョン `1` の `datadog` シークレットから `api_key` フィールドを抽出

{{% /collapse-content %}}


{{% collapse-content title="HashiCorp Vault バックエンド" level="h5" expanded=false id="id-for-hashicorp" %}}

次の HashiCorp サービスがサポートされています。

| secret_backend_type の値                               | HashiCorp サービス                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` | [HashiCorp Vault (Secrets Engine バージョン 1 および 2)][3000] |

##### HashiCorp Vault の設定方法 {#how-to-set-up-hashicorp-vault}
1. HashiCorp Vault を実行します。詳細については、[HashiCorp Vault 公式ドキュメント][3001] を参照してください。
2. Vault からシークレットを取得する権限を付与するポリシーを作成します。`*.hcl` ファイルを作成します。Secrets Engine バージョン 1 を使用している場合は、以下の権限を含めます。

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Secrets Engine バージョン 2 を使用する場合は、次の権限が必要になります。

```
path "<your_mount_path>/data/<additional_subpath>" {
  capabilities = ["read"]
}

/*
Datadog needs access to mount information to check the Secrets Engine version
number. If access isn't granted, version 1 is assumed.
*/
path "sys/mounts" {
  capabilities = ["read"]
}
```
3. `vault policy write <policy_name> <path_to_*.hcl_file>` を実行します。

4. Vault に対する認証方式を選択します。AWS インスタンスプロファイル手法を使用する場合は、`vault auth enable aws` を実行します。

##### AWS インスタンスプロファイルの手順{#aws-instance-profile-instructions}

HashiCorp Vault を AWS 接続マシンから実行している場合、Datadog では [インスタンスプロファイルの手法][3003] を使用した認証を推奨しています。

認証を設定した後、[認証固有の Vault ポリシー][3004] を作成します。

##### 設定例{#configuration-example-3}

次の例では、HashiCorp Vault のシークレットパスのプレフィックスが `/Datadog/Production` で、パラメータキーが `apikey` であることを前提としています。

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

以下の例では、AWS を利用して認証を行い、HashiCorp Vault から API キーの値を取得します。

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1  # optional, defaults to us-east-1 if not set
```

##### すべての `vault_session` オプション {#all-vault-session-options}

次の `vault_session` フィールドで、Vault に対する Agent の認証方法を制御します。

| フィールド | 説明 |
|---|---|
| `vault_auth_type` | 認証方式。サポートされている値: `aws`、`kubernetes`。設定されていない場合は、提供された認証情報に基づいて AppRole、userpass、または LDAP が使用されます。|
| `vault_role_id` | AppRole ロール ID。`vault_secret_id` と併せて使用します。|
| `vault_secret_id` | AppRole シークレット ID。`vault_role_id` と併せて使用します。|
| `vault_username` | userpass 認証用のユーザー名。`vault_password` と併せて使用します。|
| `vault_password` | userpass 認証用のパスワード。`vault_username` と併せて使用します。|
| `vault_ldap_username` | LDAP 認証用のユーザー名。`vault_ldap_password` と併せて使用します。|
| `vault_ldap_password` | LDAP 認証用のパスワード。`vault_ldap_username` と併せて使用します。|
| `vault_aws_role` | AWS IAM 認証用の Vault ロール名。`vault_auth_type: aws` の場合には必須です。|
| `vault_aws_iam_server_id` | `X-Vault-AWS-IAM-Server-ID`ヘッダーの値。リプレイ攻撃を防ぐために使用されます。|
| `aws_region` | IAM 認証リクエストでの AWS リージョン。デフォルトは `us-east-1` です。|
| `vault_kubernetes_role` | Kubernetes 認証用の Vault ロール名。`vault_auth_type: kubernetes` の場合には必須です。|
| `vault_kubernetes_jwt` |  文字列としての Kubernetes サービスアカウント JWT トークン。|
| `vault_kubernetes_jwt_path` | Kubernetes JWT トークンファイルのパス。デフォルトは `/var/run/secrets/kubernetes.io/serviceaccount/token` です。|
| `vault_kubernetes_mount_path` | Kubernetes 認証方式での Vault マウントパス。|
| `implicit_auth` | 認証をスキップして、Vault クライアント環境で設定済みのトークン (例: `VAULT_TOKEN`) を使用するには、`true` に設定します。|

##### Vault のその他の `secret_backend_config` オプション{#other-secret-backend-config-options-for-vault}

次の最上位レベルの `secret_backend_config` フィールドも適用されます。

| フィールド | 説明 |
|---|---|
| `vault_address` | Vault サーバーアドレス (例: `http://myvaultaddress.net`)。`VAULT_ADDR`環境変数を使用して設定することもできます。|
| `vault_token` | 静的 Vault トークン。認証方式に依存しない場合は、これを使用します。|
| `vault_namespace` | Vault Enterprise 環境での Vault 名前空間。|

##### TLS 設定 (`vault_tls_config`) {#tls-configuration-vault-tls-config}

相互 TLS またはカスタム CA を有効にするには、`vault_tls_config` ブロックを追加します。

```yaml
secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: https://myvaultaddress.net
  vault_tls_config:
    ca_cert: /path/to/ca.pem
    client_cert: /path/to/client.pem
    client_key: /path/to/client-key.pem
    insecure: false
```

| フィールド | 説明 |
|---|---|
| `ca_cert` | PEM でエンコードされた CA 証明書ファイルのパス。|
| `ca_path` | PEM でエンコードされた CA 証明書ファイルが格納されているディレクトリのパス。|
| `client_cert` | mTLS 用に PEM でエンコードされたクライアント証明書ファイルのパス。|
| `client_key` | クライアント証明書の秘密鍵ファイルのパス。|
| `tls_server` | TLS SNI 検証で想定されるサーバー名。|
| `insecure` | TLS 証明書の検証を無効にするには、`true` に設定します。本番環境では使用しないでください。|

{{% /collapse-content %}}

{{% collapse-content title="Kubernetes Secrets" level="h5" expanded=false id="id-for-kubernetes" %}}

*Agent バージョン 7.75 以降で利用可能*

次の Kubernetes サービスがサポートされています。

| secret_backend_type の値 | サービス |
|---------------------------|---------|
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### 前提条件{#prerequisites}

Kubernetes Secrets バックエンドには次の要素が必要です。
- **サービスアカウント認証情報**: デフォルトでは、自動的にマウントされたサービスアカウントトークンが使用されます (`automountServiceAccountToken: true`。[Kubernetes ドキュメント](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting)を参照)。必要に応じてカスタムパスを設定できます。
- **RBAC 権限**: Agent のサービスアカウントには、ターゲット名前空間からシークレットを読み取る権限が付与されている必要があります。
- **ネットワークアクセス**: Agent Pod が Kubernetes API サーバーに到達可能でなければなりません。

##### RBAC のセットアップ {#rbac-setup}

次の例に従い、シークレットを含む名前空間ごとに正しい名前空間名を使用して `Role` と `RoleBinding` を作成します。

```yaml
# Role: grants permission to read secrets
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: <target namepace> # Namespace with secrets
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get"]
---
# RoleBinding: grants permission to Agent's ServiceAccount
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-secret-access
  namespace: <target namespace>  # Namespace with secrets
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: datadog-secret-reader
subjects:
- kind: ServiceAccount
  name: <serviceaccount name>  # datadog is typically the default ServiceAccount name
  namespace: datadog  # Where Agent runs
```

##### 設定例 {#configuration-example-4}

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

Kubernetes Secrets を使用するように Datadog Agent を設定するには、次の構成を使用します。

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

ENC 表記形式は `namespace/secret-name;key` です。
- `namespace`: シークレットを含む Kubernetes 名前空間
- `secret-name`: シークレットリソースの名前
- `key`: シークレットのデータフィールドから抽出する特定のキー

**例:** 名前空間 `secrets-ns` にシークレットがある場合:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dd-api-key
  namespace: secrets-ns
data:
  api_key: <base64-encoded-value>
  app_key: <base64-encoded-value>
```

個々のキーを参照できます。

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**マルチ名前空間のサポート:**
シークレットの参照ごとに異なる名前空間を指定できます (それぞれの名前空間に対して RBAC を設定する必要があります)。

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm で Kubernetes Secrets を使用するように Datadog Agent を設定します。

```yaml
# values.yaml
datadog:
  apiKey: "placeholder-will-be-overridden"

  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_API_KEY
    value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**注:** API キーを解決するためにシークレットバックエンドを使用する場合、Helm チャートの検証にはプレースホルダー `apiKey` が必要です。`DD_API_KEY` 環境変数でプレースホルダーを上書きします。シークレットを含む名前空間ごとに、RBAC (Role + RoleBinding) を手動で作成する必要があります。詳細については、[RBAC のセットアップ](#rbac-setup)セクションを参照してください。

**別の方法として**、Helm チャート v3.171.0 以降および Agent v7.70 以降を使用している場合は、環境変数の代わりにネイティブの `datadog.secretBackend.type` フィールドを使用できます。

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator で Kubernetes Secrets を使用するように Datadog Agent を設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "placeholder-will-be-overridden"

  override:
    nodeAgent:
      env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "k8s.secrets"
      - name: DD_API_KEY
        value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**注:** シークレットバックエンドを使用して API キーを解決する場合、プレースホルダーの API キーで Datadog Operator の検証に対応できます。`DD_API_KEY` 環境変数でプレースホルダーを上書きします。シークレットを含む名前空間ごとに、RBAC (Role + RoleBinding) を手動で作成する必要があります。詳細については、[RBAC のセットアップ](#rbac-setup)セクションを参照してください。

**別の方法として**、Datadog Operator v1.25.0 以降および Agent v7.70 以降を使用している場合は、環境変数の代わりにネイティブの `spec.global.secretBackend.type` フィールドを使用できます。

{{% /tab %}}
{{< /tabs >}}

##### カスタムパスの設定 {#custom-path-configuration}
サービスアカウントベースの認証のセットアップでデフォルトの場所に従わない場合は、代わりに `token_path` と `ca_path` を指定できます。

{{< tabs >}}
{{% tab "Agent YAML" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  token_path: /custom/path/to/token
  ca_path: /custom/path/to/ca.crt
```
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```

**別の方法として**、Helm チャート v3.171.0 以降を使用している場合は、`token_path` キーおよび `ca_path` キーと共に `datadog.secretBackend.type: "k8s.secrets"` と `datadog.secretBackend.config` を使用できます。

{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```

**別の方法として**、Datadog Operator v1.25.0 以降を使用している場合は、`token_path` キーおよび `ca_path` キーと共に `spec.global.secretBackend.type: "k8s.secrets"` と `spec.global.secretBackend.config` を使用できます。

{{% /tab %}}
{{< /tabs >}}

##### カスタム API サーバーの設定 {#custom-api-server-configuration}

セットアップでデフォルトの `KUBERNETES_SERVICE_HOST` および `KUBERNETES_SERVICE_PORT` 環境変数を公開しない場合、Kubernetes REST API と対話するための `api_server` URL を指定できます。

{{< tabs >}}
{{% tab "Agent YAML" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  api_server: https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}
```
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```

**別の方法として**、Helm チャート v3.171.0 以降を使用している場合は、`api_server` キーと共に `datadog.secretBackend.type: "k8s.secrets"` と `datadog.secretBackend.config` を使用できます。

{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```

**別の方法として**、Datadog Operator v1.25.0 以降を使用している場合は、`api_server` キーと共に `spec.global.secretBackend.type: "k8s.secrets"` と `spec.global.secretBackend.config` を使用できます。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Docker Secrets" level="h5" expanded=false id="id-for-docker" %}}

*Agent バージョン 7.75 以降で利用可能*

次の Docker サービスがサポートされています。

| secret_backend_type の値 | サービス |
|---------------------------|---------|
| `docker.secrets` | [Docker Secrets][6001] |

##### 前提条件{#prerequisites-1}

Docker Secrets バックエンドは、[Docker Swarm シークレット][6002] と [Docker Compose シークレット][6003] の両方をサポートしています。デフォルトでは、Swarm と Compose はどちらもシークレットをコンテナ内の `/run/secrets` (Linux) または `C:\ProgramData\Docker\secrets` (Windows) にファイルとして自動的にマウントします。

**注**: Compose シークレットは、(ローカルファイルを指す) ファイルベースにすることも、(既存の Swarm シークレットを参照する) 外部シークレットにすることもできます。

##### 設定例 {#configuration-example-5}

Docker Secrets を使用するように Datadog Agent を設定するには、次の構成を使用します。

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

ENC 表記形式はシークレット名であり、`/run/secrets/` 内のファイル名に対応します。
- `ENC[api_key]` は `/run/secrets/api_key` (Linux) または `C:\ProgramData\Docker\secrets\api_key` (Windows) から読み取ります。

**カスタムシークレットパス:**
Docker Swarm または Compose が別の場所にシークレットをマウントするように設定されている場合は、次のように指定できます。

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Docker Swarm の例 {#docker-swarm-example}

Docker Swarm シークレットを [作成][6002] して、使用します。

```bash
# Create the secret
echo "<api_key_value>" | docker secret create dd_api_key -

# Deploy Agent with secret mounted
docker service create \
  --name datadog-agent \
  --secret dd_api_key \
  --env DD_API_KEY="ENC[dd_api_key]" \
  --env DD_SECRET_BACKEND_TYPE="docker.secrets" \
  --env DD_SITE="datadoghq.com" \
  --env DD_HOSTNAME="dd-agent" \
  registry.datadoghq.com/agent:latest
```

シークレット `dd_api_key` は `/run/secrets/dd_api_key` に自動的にマウントされ、Datadog Agent は `docker.secrets` バックエンドを使用してそれを読み取ります。

##### Docker Compose の例 {#docker-compose-example}

`docker-compose.yml` を [作成][6003] して、ファイルベースのシークレットを含めます。

```yaml
version: '3.8'

services:
  datadog:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=ENC[dd_api_key]
      - DD_SECRET_BACKEND_TYPE=docker.secrets
      - DD_SITE=datadoghq.com
      - DD_HOSTNAME=dd-agent
    secrets:
      - dd_api_key

secrets:
  dd_api_key:
    file: ./secrets/api_key.txt
```

シークレットファイル `./secrets/api_key.txt` は、コンテナ内の `/run/secrets/dd_api_key` にマウントされます。


{{% /collapse-content %}}

{{% collapse-content title="JSON、YAML、または TEXT ファイルシークレットバックエンド" level="h5" expanded=false id="id-for-json-yaml-text" %}}

| secret_backend_type の値                                 | ファイルサービス                             |
|---------------------------------------------|-----------------------------------------|
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXT][4003]                        |                            |

##### ファイル権限 {#file-permissions}
ファイルバックエンドには、設定された JSON、YAML、または TEXT ファイルに対する**読み取り**権限のみが必要です。これらの権限は、ローカルの Datadog Agent ユーザー (Linux では `dd-agent`、Windows では `ddagentuser`) に付与する必要があります。


{{< tabs >}}
{{% tab "JSON ファイルバックエンド" %}}

**注**: サポートされている JSON の深さは 1 レベルのみです (例: `{"key": "value"}`)。

##### 設定例 {#configuration-example-6}

シークレットをローカルに保存するには、JSON ファイルを使用できます。

たとえば、`/path/to/secret.json` に次の内容の JSON ファイルがあるとします。

```json
{
  "datadog_api_key": "your_api_key"
}
```

この構成を使用して、シークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "YAML ファイルバックエンド" %}}

**注**: サポートされている YAML の深さは 1 レベルのみです (例: `key: value`)。

##### 設定例 {#configuration-example-7}

シークレットをローカルに保存するには、YAML ファイルを使用できます。

例として、`/path/to/secret.yaml` に次の内容の YAML ファイルがあるとします。

```yaml
datadog_api_key: your api key
```

次の構成を使用して、このファイルからシークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "TEXT ファイルバックエンド" %}}

*Agent バージョン 7.75 以降で利用可能*

**注**: 各シークレットは、個別のテキストファイルに保存する必要があります。

##### 設定例 {#configuration-example-8}

個別のテキストファイルを使用して、シークレットをローカルに保存できます。

たとえば、`/path/to/secrets/` 内のテキストファイルの場合:

`/path/to/secrets/dd_api_key` の内容:

```
your_api_key_value
```

`/path/to/secrets/dd_app_key` の内容:

```
your_app_key_value
```

この構成を使用して、これらのファイルからシークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### パスのセキュリティ: {#path-security}

- `ENC[]` 内の相対パスは、`secrets_path` を基準として解決されます (例: `secret_path: /path/to/secrets` となっている `ENC[dd_api_key]` は、`/path/to/secrets/dd_api_key` に解決されます)。
- `ENC[]` 内の絶対パスは、`secrets_path` に含まれている必要があります (例: `secret_path: /path/to/secrets` となっている `ENC[/path/to/secrets/dd_api_key]` は機能します)。
- パストラバーサルの試行 (例: `ENC[../etc/passwd]`) はブロックされ、「path outside allowed directory」というエラーで失敗します。

**注:** 一部のツールでは、シークレットをファイルにエクスポートする際に自動的に改行を追加します。これに対処する方法については、[末尾の改行を削除する](#remove-trailing-line-breaks)を参照してください。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Windows レジストリキー" level="h4" expanded=false id="id-for-windows-regkey" %}}

**Agent バージョン 7.82 以降で利用可能**

次の Windows サービスがサポートされています。

| secret_backend_type の値 | サービス |
|---------------------------|---------|
| `windows.regkey` | Windows レジストリ|

##### 前提条件{#prerequisites-2}

このバックエンドは Windows でのみサポートされています。レジストリキーは、Datadog Agent が実行されているアカウント (デフォルトでは `ddagentuser`) から読み取り可能である必要があります。`HKLM` に属するキーは、デフォルトではすべてのローカルユーザーが読み取ることができます。Datadog では、ACL を制限して、`ddagentuser` と `SYSTEM` のみがキーを読み取れるようにすることを推奨しています。

##### 設定例 {#configuration-example-9}

Windows レジストリキーバックエンドを使用するように Datadog Agent を設定するには、次の構成を使用します。

```yaml
# datadog.yaml
secret_backend_type: windows.regkey

api_key: 'ENC[SOFTWARE\Datadog\secrets:api_key]'
```

`ENC[<registry-path>:<value-name>]` 形式を使用してシークレットを参照します。ここで、`registry-path` はルートキーの下位にあるサブパス、`value-name` は読み取る対象のレジストリ値です。

デフォルトでは、ルートキーは `HKLM` です。別のハイブを使用するには、`root_key` を設定します。次の値のみが受け入れられます (他の値を指定するとエラーが返されます)。

`HKLM`、`HKCU`、`HKCR`、`HKU`、`HKCC` (`HKEY_LOCAL_MACHINE` のような長い形式もサポートされています)

```yaml
secret_backend_type: windows.regkey
secret_backend_config:
  root_key: HKCU
```

##### レジストリキー {#set-up-the-registry-key} を設定する

この PowerShell シェルスクリプトの例は、(インストール後に管理者として実行される) レジストリの設定方法を示しています)。

```powershell
# Create the key and set the secret value
New-Item -Path "HKLM:\SOFTWARE\Datadog\secrets" -Force
Set-ItemProperty -Path "HKLM:\SOFTWARE\Datadog\secrets" -Name "api_key" -Value "<YOUR_API_KEY>"

# Restrict read access to ddagentuser and SYSTEM (recommended)
$acl = Get-Acl "HKLM:\SOFTWARE\Datadog\secrets"
$acl.SetAccessRuleProtection($true, $false)
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "SYSTEM", "ReadKey", "Allow"))
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "ddagentuser", "ReadKey", "Allow"))
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "Administrators", "FullControl", "Allow"))
Set-Acl "HKLM:\SOFTWARE\Datadog\secrets" $acl
```

{{% /collapse-content %}}

#### 複数のバックエンド{#multiple-backends}

*Agent バージョン 7.80 以降で利用可能*

単一の `secret_backend_type` の代わりに、`multi_secret_backends` 内で複数の名前付きバックエンドを宣言できます。各バックエンドには独自の `type` と `config` があり、シークレットは `ENC[]` ハンドルで `backendName;` プレフィックスを使用した特定のバックエンドにルーティングされます。

次の要素が複数設定されている場合、最も優先度の高い設定が有効になり、その他は警告とともに無視されます。

1. `secret_backend_command`
2. `secret_backend_type`
3. `multi_secret_backends`

##### 構成 {#configuration}

```yaml
# datadog.yaml

multi_secret_backends:
  <backend_name>:
    type: <backend_type>
    config:
      <KEY_1>: <VALUE_1>
```

各 `<backend_name>` は、ユーザーが選択する任意の識別子です。`;` は `ENC[]` ハンドルで使用される区切り文字であるため、セミコロンを含めることはできません。`type` フィールドと `config` フィールドは、対応するバックエンドの `secret_backend_type` および `secret_backend_config` と同じスキーマに従います。

##### `ENC[]`表記 {#enc-notation}

`multi_secret_backends` がアクティブな場合、`ENC[]` ハンドルに接頭辞としてバックエンド名とセミコロンを付加します。

```
ENC[<backend_name>;<secret_key>]
```

**最初**のセミコロンのみがバックエンドの区切り文字として扱われます。セミコロン自体を含むシークレットキー (例: Kubernetes 形式の `namespace/secret-name;key`) は引き続き機能します。

##### 例{#example}

次の構成では、2 つのファイルバックエンドから同時にシークレットを読み取ります。

```yaml
# datadog.yaml
multi_secret_backends:
  yaml_secrets:
    type: file.yaml
    config:
      file_path: /etc/datadog-agent/secrets.yaml
  aws_secrets:
    type: aws.secrets
    config:
      aws_session:
        aws_region: us-east-1
```

接頭辞としてバックエンド名を付加してシークレットを参照します。

```yaml
# datadog.yaml
api_key: ENC[yaml_secrets;api_key]
app_key: ENC[aws_secrets;My-Secrets;appKey]
```

##### `secret_backend_type` からの移行{#migrating-from-secret-backend-type}

単一の `secret_backend_type` から `multi_secret_backends` に切り替えるには:

1. `secret_backend_type` と `secret_backend_config` を `multi_secret_backends` の名前付きエントリに移動します。
2. 最上位にある `secret_backend_type` と `secret_backend_config` を削除します。
3. すべての `ENC[secretKey]` ハンドルを `ENC[backendName;secretKey]` に更新します。

```yaml
# Before
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /etc/datadog-agent/secrets.yaml

api_key: ENC[api_key]

# After
multi_secret_backends:
  my_yaml:
    type: file.yaml
    config:
      file_path: /etc/datadog-agent/secrets.yaml

api_key: ENC[my_yaml;api_key]
```

### オプション 2: Kubernetes および Docker 対応の用の組み込みスクリプトを使用する {#option-2-using-the-built-in-script-for-kubernetes-and-docker}

*Agent バージョン 7.32 以降で利用可能*

コンテナ化された環境の場合、Datadog Agent のコンテナイメージには組み込みスクリプト `/readsecret_multiple_providers.sh` が含まれています。このスクリプトは、次の場所からのシークレットの読み取りをサポートしています。

* ファイル: `ENC[file@/path/to/file]` を使用
* Kubernetes Secrets: `ENC[k8s_secret@namespace/secret-name/key]` を使用

{{< tabs >}}
{{% tab "Datadog Operator" %}}

この実行可能ファイルを Datadog Operator で使用するには、次のように設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
```
{{% /tab %}}
{{% tab "Helm" %}}

この実行可能ファイルを Helm チャートで使用するには、次のように設定します。

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

この実行可能ファイルを使用するには、環境変数 `DD_SECRET_BACKEND_COMMAND` を次のように設定します。

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### 例: マウントされたファイルからの読み取り {#example-reading-from-mounted-files}

Kubernetes では、Agent がシークレットを解決するために読み取り可能な Pod 内の [ファイルとしてシークレットを公開][2] できるようになっています。

Kubernetes でシークレットをボリュームとしてマウントするには、次のようにします。

```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

これにより、次のようにしてシークレットを参照できます。

```
password: ENC[file@/etc/secret-volume/password]
```

**注**:
- シークレットは、そのマウント先の Pod と同じ名前空間に存在していなければなりません。
- このスクリプトは、機密性の高い `/var/run/secrets/kubernetes.io/serviceaccount/token` を含め、すべてのサブフォルダーにアクセスできます。そのため、Datadog では `/var/run/secrets` ではなく専用のフォルダーを使用することを推奨しています。

[Docker Swarm シークレット][3] は `/run/secrets` フォルダーにマウントされます。たとえば、Docker シークレット `db_prod_passsword` は Agent コンテナ内の `/run/secrets/db_prod_password` に配置されます。これは、設定では `ENC[file@/run/secrets/db_prod_password]` によって参照されます。

#### 例: 名前空間をまたいだ Kubernetes シークレットの読み取り {#example-reading-a-kubernetes-secret-across-namespaces}

Agent に別の名前空間からシークレットを読み取らせるには、`k8s_secret@` プレフィックスを使用します。例:

```
password: ENC[k8s_secret@database/database-secret/password]
```

Agent のサービスアカウントがシークレットを読み取れるように RBAC を設定します。次のロールは、`database` 名前空間内の`database-secret` シークレットに対する読み取りアクセス権限を付与します。
{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
      - namespace: database
        secrets:
        - "database-secret"
```
***注***: ロールリスト内の各名前空間は、Datadog Operator デプロイメントの `WATCH_NAMESPACE` または `DD_AGENT_WATCH_NAMESPACE` 環境変数にも設定されている必要があります。
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  (...)
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
    roles:
      - namespace: database
        secrets:
          - database-secret
```
{{% /tab %}}
{{< /tabs >}}


別の方法として、RBAC リソースを直接定義することもできます。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```

この `Role` は、`Secret: database-secret` 内の `Namespace: database` に対するアクセス権限を付与します。`RoleBinding` は、この権限を `ServiceAccount: datadog-agent` 内の`Namespace: default` にリンクします。デプロイされているリソースに応じて、クラスターにこの設定を手動で追加する必要があります。

### オプション 3: カスタム実行可能ファイルを作成する {#option-3-creating-a-custom-executable}

シークレットを取得するために、Agent はユーザーから提供された外部の実行可能ファイルを使用します。この実行可能ファイルは、新しいシークレットが検出されたときに使用され、Agent のライフサイクルの期間中、キャッシュされます。シークレットの更新やローテーションが必要な場合は、Agent を再起動してシークレットを再読み込みする必要があります。

これにより、あらゆるシークレット管理ソリューションを使用できるようになり、Agent によるシークレットへのアクセス方法を完全に制御できます。

Agent は標準入力を介して、解決すべきシークレットハンドルのリストを含む JSON ペイロードをこの実行可能ファイルに送信します。次に、実行可能ファイルが各シークレットを取得し、標準出力を介して JSON 形式でシークレットを返します。

次の例は、Agent が標準入力 (STDIN) で実行可能ファイルに送信する内容を示しています。

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (文字列): フォーマットバージョン。
* `secrets`(文字列のリスト): 各文字列が、取得するシークレットのハンドルです。


実行可能ファイルは、次の標準出力 (STDOUT) を介して応答します。

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (文字列): 設定で使用されるシークレット値。エラーが発生した場合、値は `null` になる可能性があります。
* `error`(文字列): エラーメッセージまたは `null`。

シークレットの解決に失敗した場合 (ゼロ以外の終了コードが返されたか、null 以外のエラーが返された場合)、Agent は関連する設定を無視します。

**`stderr`** では決して機密情報を出力しないでください。バイナリが `0` 以外のステータスコードで終了した場合、Agent はトラブルシューティングに備えて実行可能ファイルの標準エラー出力をログに記録します。

任意の言語を使用して、独自のシークレット取得用実行可能ファイルを作成することもできます。唯一の要件は、前述の入出力形式に従うことです。

以下に、ダミーのシークレットを返す Go の例を示します。

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

これにより、設定が変換されます。

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

設定は、メモリ内で次のように変換されます。

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

以下を追加することで、バイナリを使用してシークレットを解決するように Agent を設定できます。

```
secret_backend_command: /path/to/binary
```

## Agent のセキュリティ要件 {#agent-security-requirements}

Agent は、提供された実行可能ファイルをサブプロセスとして実行します。実行パターンは、Linux と Windows とでは異なります。

{{< tabs >}}
{{% tab "Linux" %}}

Linux では、実行可能ファイルは以下の条件を満たす必要があります。

* Agent を実行しているユーザー (デフォルトでは `dd-agent`、またはコンテナ内の `root`) と同じユーザーに属していること。
* `group` または `other`に対する権限がないこと。
* 少なくとも所有者としての**実行**権限があること。

{{% /tab %}}
{{% tab "Windows" %}}

Windows では、実行可能ファイルは以下の条件を満たす必要があります。

* `ddagentuser` (Agent の実行に使用されるユーザー) としての**読み取り**権限または**実行**権限があること。
* **管理者**グループ、組み込みの**ローカルシステム**アカウント、または Agent ユーザーコンテキスト (デフォルトでは `ddagentuser`) 以外のユーザーやグループに対する権限がないこと。
* Agent が実行できる、有効な Win32 アプリケーションであること (たとえば、PowerShell または Python スクリプトは機能しません)。

{{% /tab %}}
{{< /tabs >}}

**注**：実行可能ファイルは、Agent と同じ環境変数を共有します。

## 実行時のシークレットの更新 {#refreshing-secrets-at-runtime}

*Agent バージョン 7.67 以降で利用可能*

再起動を必要とせずに、解決されたシークレットを更新するように Agent を設定できます。

更新間隔を設定します。

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

または、手動で更新をトリガーします。

```shell
datadog-agent secret refresh
```

### API/APP キーの更新 {#apiapp-key-refresh}
シークレットとして取得された API/APP キーは、実行時の更新をサポートしています。

これを有効にするには、`datadog.yaml`で `secret_refresh_interval` (秒単位) を設定します。

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

デフォルトでは、Agent は`secret_refresh_interval` ウィンドウ内で最初の更新をランダム化します。
これにより、Agent のフリートが同時に更新することを防ぎます。キーは起動時に解決され、最初の更新間隔内に 1 回更新されます。
以降は更新間隔ごとに更新されます。

ダウンタイムを防ぐため、フリート全体が更新されたキーを取得した後にのみ、古いキーを無効にしてください。キーの使用状況は、
[フリート管理](https://app.datadoghq.com/fleet)ページで追跡できます。

この動作を無効にするには、次のように設定します。

```yaml
secret_refresh_scatter: false
```

### Autodiscovery チェックによるシークレットの更新 {#autodiscovery-check-secrets-refresh}
*Agent バージョン 7.76 以降で利用可能*

テンプレートで `ENC[]` 構文を使用している場合、スケジュールされた [Autodiscovery][1] チェックによって実行時にシークレットを更新できます。

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"ENC[<secret_handle>]"
          }
        ]
      }
    }
```

この場合、Agent は `secret_refresh_interval` で設定された間隔、または `datadog-agent secret refresh` による手動操作のいずれかでシークレットの更新をトリガーできます。

### API キーの失敗/無効化時のシークレットの自動更新 {#automatic-secrets-refresh-on-api-key-failure-invalidation}

*Agent バージョン 7.74 以降で利用可能*

Agent は、無効な API キーを検出した時点で、自動的にシークレットを更新できます。この自動更新は、Agent が Datadog から 403 Forbidden レスポンスを受け取った場合、または定期的なヘルスチェックで無効な API キーや期限切れの API キーが検出された場合に行われます。

この機能を有効にするには、`datadog.yaml` ファイルで `secret_refresh_on_api_key_failure_interval` (分単位) を設定します。無効にするには、この値を `0` に設定します (デフォルト)。

この間隔は、無効な API キーが検出されたときにシークレット管理ソリューションへのスパム送信を回避することを目的とした、2 回の更新の間に設ける最小待機時間です。

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

この設定は `secret_refresh_interval` との互換性があります。

### DDOT コレクターの更新を有効化する {#enabling-ddot-collector-refresh}
[DDOT コレクター][6] を使用する場合、API/APP の更新を有効化するには、`datadog.yaml` ファイルに次の設定を追加する必要があります。

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

これにより、シークレットが更新された後も DDOT コレクターが Agent と同期された状態に維持されます。Agent が定期的に設定状態を検証するのと同様に、DDOT コレクターはこの設定を使用して、Agent から更新された値を定期的にチェックします。

## トラブルシューティング {#troubleshooting}

### 検出されたシークレットの一覧表示 {#listing-detected-secrets}

Agent CLI の `secret` コマンドは、セットアップに関連するエラーを明かにします。たとえば、実行可能ファイルに誤った権限が設定されている場合、それを明かにします。また、検出されたすべてのハンドルと、それらの場所も一覧表示します。

Linux では、このコマンドにより実行可能ファイルのファイルモード、所有者、およびグループが出力されます。Windows では、ACL 権限が一覧表示されます。

{{< tabs >}}
{{% tab "Linux" %}}

Linux での例:

```sh
datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Windows での例 (管理者向け PowerShell による例):

```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}

### シークレットが注入された後の構成の確認 {#seeing-configurations-after-secrets-were-injected}

チェックの構成がどのように解決されるかを素早く確認するには、`configcheck` コマンドを使用できます。

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**注**: 設定ファイルの変更を反映させるには、Agent を [再起動][7] する必要があります。

### secret_backend_command のデバッグ {#debugging-your-secret-backend-command}

Agent の外部でテストまたはデバッグを行うために、Agent による実行する方法を模倣できます。

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

`dd-agent` ユーザーは、Datadog Agent をインストールすると作成されます。

{{% /tab %}}
{{% tab "Windows" %}}

##### 権限関連のエラー {#rights-related-errors}

次のエラーは、セットアップに何らかの不足があることを示しています。

1. 実行可能ファイルに対する権限を必要としないグループやユーザーがその権限を持っている場合、次のようなエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. ファイルに対する読み取りおよび実行権限が `ddagentuser` に付与されている場合、次のようなエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. 実行可能ファイルは、有効な Win32 アプリケーションである必要があります。そうでないと、次のエラーがログに記録されます。
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog には、実行可能ファイルに適切な権限を設定するための [Powershell スクリプト][9] が用意されています。使用例:

```powershell
.\Set-SecretPermissions.ps1 -SecretBinaryPath C:\secrets\decrypt_secrets.exe
ddagentuser SID: S-1-5-21-3139760116-144564943-2741514060-1076
=== Checking executable permissions ===
Executable path: C:\secrets\decrypt_secrets.exe
Executable permissions: OK, the executable has the correct permissions

Permissions Detail:

stdout:
Path   : Microsoft.PowerShell.Core\FileSystem::C:\secrets\decrypt_secrets.exe
Owner  : BUILTIN\Administrators
Group  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         DESKTOP-V03BB2P\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:BAD:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-3139760116-144564943-2741514
         060-1076)
stderr:


=== Secrets stats ===
Number of secrets resolved: 0
Secrets handle resolved:
```

##### 実行可能ファイルのテスト {#testing-your-executable}

Agent はシークレットを取得する際に、実行可能ファイルを実行します。Datadog Agent の実行には、`ddagentuser` が使用されます。このユーザーに固有の権限というものはありませんが、`Performance Monitor Users` グループの一部となっています。このユーザーのパスワードはインストール時にランダムに生成され、どこにも保存されません。

つまり、デフォルトのユーザーや開発ユーザーでは実行可能ファイルが機能したとしても、`ddagentuser` の権限はより限定的であるため、Agent が実行すると機能しない場合があります。

Agent と同じ条件で実行可能ファイルをテストするには、開発用マシンで `ddagentuser` のパスワードを更新します。これにより、`ddagentuser`として認証を行い、Agent と同じコンテキストで実行可能ファイルを実行できます。

それには、次の手順に従います。

1. `Local Security Policy`の `Local Policies/User Rights Assignement/Deny Log on locally` リストから `ddagentuser` を削除します。
2. `ddagentuser` の新しいパスワードを設定します (インストール時に生成されたパスワードはどこにも保存されないため)。PowerShell で以下を実行します。
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Service Control Manager で `DatadogAgent` サービスが使用するパスワードを更新します。PowerShell で以下を実行します。
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

これで、`ddagentuser` としてログインして、実行可能ファイルをテストできます。Datadog には、実行可能ファイルを別のユーザーとしてテストするのに役立つ [Powershell スクリプト][10] が
用意されています。これはユーザーコンテキストを切り替えて、Agent による実行可能ファイルの実行方法を模倣します。

使用例:

```powershell
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```

[9]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1
[10]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### Agent による起動の拒否 {#agent-refusing-to-start}

Agent は起動時にまず、`datadog.yaml`を読み込んで、このファイル内のシークレットを復号します。これはロギングの設定前に行われます。つまり、Windows のようなプラットフォームでは、`datadog.yaml` の読み込み時に発生したエラーはログに書き込まれませんが、`stderr` に書き込まれます。これは、シークレットのために Agent に渡された実行可能ファイルがエラーを返したときに発生する可能性があります。

`datadog.yaml` にシークレットがあり、Agent が起動しない場合:

* `stderr` を確認できるよう、Agent を手動で起動します。
* `datadog.yaml` からシークレットを削除し、まず、チェック設定ファイル内のシークレットでテストします。

### Kubernetes 権限のテスト {#testing-kubernetes-permissions}
Kubernetes から直接シークレットを読み取る場合、`kubectl auth`コマンドを使用して権限をダブルチェックできます。一般的な形式は次のとおりです。

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

前述の [Kubernetes Secrets の例](#example-reading-a-kubernetes-secret-across-namespaces)を検討してください。この例では、シークレット `Secret:database-secret` は `Namespace: database` に存在し、サービスアカウント `ServiceAccount:datadog-agent` は `Namespace: default`に存在しています。

この場合は、次のコマンドを使用します。

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

このコマンドは、Agent がこのシークレットを表示するための権限が有効かどうかを返します。

### 末尾の改行を削除する {#remove-trailing-line-breaks}

一部のシークレット管理ツールでは、ファイルでシークレットをエクスポートする際に、自動的に改行が追加されることがあります。[datadog.yaml 設定ファイル][8] で `secret_backend_remove_trailing_line_break: true` を設定すると、これらの改行を削除できます。特にコンテナ化された環境では、環境変数 `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` を使用して同様の処理を行います。

### シークレットハンドルでの Autodiscovery 変数 {#autodiscovery-variables-in-secret-handles}

シークレットハンドルで [Autodiscovery][1] 変数を使用することも可能です。Agent は、シークレットを解決する前にこれらの変数を解決します。例:

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /ja/opentelemetry/setup/ddot_collector/
[7]: /ja/agent/configuration/agent-commands/#restart-the-agent
[8]: /ja/agent/configuration/agent-configuration-files/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[1007]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal
[2001]: https://learn.microsoft.com/en-us/azure/developer/go/azure-sdk-authentication

<!-- HashiCorp Vault Links -->
[3000]: https://learn.hashicorp.com/tutorials/vault/static-secrets
[3001]: https://developer.hashicorp.com/
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[3004]: https://developer.hashicorp.com/vault/docs/auth/aws#iam-authentication-inferences

<!-- File Backend Links (JSON/YAML) -->
[4001]: https://en.wikipedia.org/wiki/JSON
[4002]: https://en.wikipedia.org/wiki/YAML
[4003]: https://en.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000]: https://cloud.google.com/security/products/secret-manager
[5001]: https://cloud.google.com/docs/authentication/application-default-credentials
[5002]: https://docs.cloud.google.com/secret-manager/docs/access-control
[5003]: https://docs.cloud.google.com/secret-manager/docs/accessing-the-api

<!-- Docker Secrets Links -->
[6001]: https://docs.docker.com/engine/swarm/secrets/
[6002]: https://docs.docker.com/engine/swarm/secrets/#how-docker-manages-secrets
[6003]: https://docs.docker.com/compose/how-tos/use-secrets/

<!-- Kubernetes Secrets Links -->
[7000]: https://kubernetes.io/docs/concepts/configuration/secret/