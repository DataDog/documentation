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
  tag: Documentation
  text: Autodiscovery
title: シークレット管理
---
## 概要

Datadog Agent は、次のシークレット管理ソリューションと統合することで、シークレットを安全に管理するのに役立ちます。
 [AWS Secrets Manager](#idforsecrets)
 [AWS SSM](#idforssm)
 [Azure KeyVault](#idforazure)
 [GCP Secret Manager](#idforgcp)
 [HashiCorp Vault](#idforhashicorp)
 [Kubernetes Secrets](#idforkubernetes)
 [Docker Secrets](#idfordocker)
 [FIle Text](#idforjsonyamltext)
 [File JSON](#idforjsonyamltext)
 [File YAML](#idforjsonyamltext)

API キーやパスワードのような機密値を構成ファイル内にプレーンテキストでハードコーディングする代わりに、Agent は実行時に動的にそれらを取得できます。設定内でシークレットを参照するには、`ENC[<secret_id>]`表記を使用します。シークレットは取得され、メモリにロードされますが、ディスクに書き込まれたり、Datadog バックエンドに送信されたりすることはありません。

**注**: `ENC[]` 構文は、`secret_*` 設定 (例: `secret_backend_command`) では使用できません。

## シークレットを取得するためのオプション

### オプション1: シークレットを取得するためにネイティブ Agent サポートを使用

**注**: Agent バージョン `7.76` 以降、ネイティブなシークレット管理が FIPS 対応 Agent で利用可能です。

Agent バージョン `7.70` から、Datadog Agent では複数のシークレット管理ソリューションをネイティブにサポートしています。`datadog.yaml` に新しい 2 つの設定 `secret_backend_type` と `secret_backend_config` が導入されました。

`secret_backend_type` は、使用するシークレット管理ソリューションを指定するために使用され、`secret_backend_config` にはそのソリューションに関連する追加の設定が保持されます。

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**注**: コンテナ化された環境で Datadog を実行している場合、[Cluster Agent](/containers/cluster_agent/) は、ネイティブなシークレットの取得をサポートするために Agent 7.77 以降が必要です。以前のバージョンでは、代わりに[オプション 2](#option2usingthebuiltinscriptforkubernetesanddocker) または[オプション 3](#option3creatingacustomexecutable) を使用してください。

より具体的なセットアップ手順は、使用するバックエンドタイプによって異なります。詳細情報については、以下の該当するセクションを参照してください。


{{% collapse-content title="AWS Secrets" level="h4" expanded=false id="id-for-secrets" %}}
次の AWS サービスがサポートされています。

|secret_backend_type 値                                | AWS サービス                             |
|||
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### インスタンスプロファイルのセットアップ

AWS によりすべての環境変数とセッションプロファイルが処理されるため、Datadog では [インスタンスプロファイルメソッド][1006] を使用してシークレットを取得することを推奨しています。このための詳細な指示は、公式の [AWS Secrets Managerのドキュメント][1000] で確認できます。

##### 設定例

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

AWS Secrets を使用して、次の設定に基づいてシークレットを解決するように Datadog Agent を設定します。

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

環境変数を使用する場合、設定を次のように JSON に変換します。

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

AWS Secrets を使用するように Agent を設定した後、`ENC[secretId;secretKey]` を使用して設定内の任意のシークレットを参照できます。

ENC 表記は次のように構成されています。
* `secretId`: 秘密の「フレンドリ名」(たとえば、`/DatadogAgent/Production`) または Amazon Resource Name (たとえば、`arn:aws:secretsmanager:useast1:123456789012:secret:/DatadogAgent/ProductionFOga1K`) のいずれかです。
   **注**: AWS 資格情報または `sts:AssumeRole` 資格情報が定義されている異なるアカウントからシークレットにアクセスする場合、完全な Amazon Resource Name 形式が必要です。
* `secretKey`: 使用する AWS シークレットからの JSON キーです。


AWS Secrets Manager は、1 つのシークレット内に複数のキーと値のペアを保存できます。Secrets Manager を使用したバックエンド設定からは、シークレットに定義されたすべてのキーにアクセスできます。

たとえば、シークレット ID `MySecrets` に次の 3 つの値が含まれているとします。

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

次に示すのは、AWS Secrets を使用して `MySecrets` から API キーを取得する `datadog.yaml` 構成ファイルの完全な例です。

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

AWS Secrets を使用して、次の設定に基づいて Helm 内のシークレットを解決するように Datadog Agent を設定します。

##### インテグレーションチェック

```sh
datadog:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
```

<div class="alert alert-info"> AWS シークレットにアクセスするための Agent の権限を付与するには、<code>serviceAccountAnnotations</code> を含める必要があります。</div>

<br>


##### クラスターチェック: クラスターチェックランナーが有効でない場合

```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

##### クラスターチェック: クラスターチェックランナーが有効な場合

```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>

```

{{% /tab %}}

{{% tab "Operator" %}}

AWS Secrets を使用して、次の設定に基づいて、Datadog Operator と共にシークレットを解決するように Datadog Agent を設定します。

##### インテグレーションチェック


```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

<div class="alert alert-info"> AWS シークレットにアクセスするための Agent の権限を付与するには、<code>serviceAccountAnnotations</code> を含める必要があります。</div>

<br>


##### クラスターチェック: クラスターチェックランナーが有効でない場合

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

##### クラスターチェック: クラスターチェックランナーが有効な場合

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
spec:
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    [...]
    clusterChecksRunner:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h4" expanded=false id="id-for-ssm" %}}
次の AWS サービスがサポートされています。

|secret_backend_type 値                                | AWS サービス                             |
|||
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### インスタンスプロファイルのセットアップ

AWS によりすべての環境変数とセッションプロファイルが処理されるため、Datadog では [インスタンスプロファイルメソッド][1006] を使用してシークレットを取得することを推奨しています。このための詳細な指示は、公式の [AWS Secrets Manager のドキュメント][1001] で確認できます。

##### 設定例

AWS Systems Manager Parameter Store では、階層モデルがサポートされています。たとえば、次のような AWS Systems Manager Parameter Store のパスがあるとします。

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

パラメーターは次のように取得できます。

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

{{% /collapse-content %}}


{{% collapse-content title="Azure Keyvault バックエンド" level="h4" expanded=false id="id-for-azure" %}}


次の Azure サービスがサポートされています。

| secret_backend_type 値                            | Azure サービス          |
| ||
| `azure.keyvault` | [Azure Keyvault][2000] |

##### Azure 認証

Datadog では、Azure での認証にマネージドアイデンティティを使用することを推奨しています。これにより、クラウドリソースを AMI アカウントに関連付けることができ、`datadog.yaml` 構成ファイルにシークレットを記載する必要がなくなります。

##### マネージドアイデンティティ

Key Vault にアクセスするには、マネージドアイデンティティを作成し、仮想マシンに割り当てます。次に、そのアイデンティティがシークレットにアクセスできるように、Key Vault に適切なロールを割り当てます。

##### 設定例

Azure Key Vault シークレットのバックエンド設定は、このスキーマに従って YAML 形式で構成されています。

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

バックエンドのシークレットは、Datadog Agent の構成ファイル内で `ENC[ ]` を使用して参照されます。次に示すのは、プレーンテキストのシークレットを取得する必要がある例です。

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Agent バージョン 7.74 以上で利用可能**

次の GCP サービスがサポートされています。

| secret_backend_type 値                               | GCP サービス                    |
|  |  |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### GCP 認証とアクセスポリシー

GCP Secret Manager の実装は、Google での認証に [アプリケーションデフォルト資格情報 (ADC)][5001] を使用します。

GCP Secret Manager とやりとりするには、Datadog Agent で使用されるサービスアカウント (仮想マシンのサービスアカウント、ワークロードアイデンティティ、ローカルでアクティブ化された資格情報など) が、`secretmanager.versions.access` の権限を有している必要があります。

これは、事前定義されたロール **Secret Manager Secret Accessor** (`roles/secretmanager.secretAccessor`) または同等の [アクセス権][5002] を持つカスタムロールを使用して付与できます。

GCE または GKE ランタイムでは、ADC はインスタンスまたは Pod に添付されたサービスアカウントを通じて自動的に設定されます。添付されたサービスアカウントには、GCP Secret Manager にアクセスするための適切なロールが割り当てられている必要があります。さらに、GCE または GKE ランタイムは、`cloudplatform` [OAuth アクセススコープ][5003] を必要とします。

##### GCP の設定例

GCP Secret Manager を使用して、次の設定に基づいてシークレットを解決するように Datadog Agent を設定します。

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

GCP Secret Manager を使用するように Datadog Agent を設定した後、`ENC[secretname]` または `ENC[secretname;key;version;]` を使用して設定内でシークレットを参照します。

ENC 表記は次のように構成されています。

 `secret`: GCP Secret Manager 内のシークレット名 (例: `datadogapikey`)
`key`: (オプション) JSON 形式のシークレットから抽出するキー。プレーンテキストのシークレットを使用している場合は、省略できます (例: `ENC[secretname;;version]`)。
`version`: (オプション) シークレットのバージョン番号。指定しない場合、`latest` バージョンが使用されます。
  + バージョン構文の例:
     `secretkey`  暗黙の `latest` バージョン
     `secretkey;;latest`  明示的な `latest` バージョン
     `secretkey;;1`  特定のバージョン番号

たとえば、GCP シークレット名が `datadogapikey` で、2 つのバージョンと `datadogappkey` があるとします。

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

JSON 形式のシークレットの場合、シークレット名 `datadogkeys` に以下が含まれるとします。

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

特定のキーを次のように参照します。

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### シークレットのバージョン管理

GCP Secret Manager ではシークレットバージョンがサポートされています。Agent の実装でも、`;` 区切りを使用してシークレットのバージョン管理をサポートしています。バージョンが指定されていない場合、`latest` バージョンが使用されます。


##### JSON シークレットのサポート

Datadog Agent では、`;` 区切りを使用して、JSON 形式のシークレットから特定のキーを抽出することができます。

 `datadog;api_key`  暗黙の `latest` バージョンを使用して、`datadog` のシークレットから `api_key` フィールドを抽出します。
 `datadog;api_key;1`  バージョン `1` の `datadog` のシークレットから `api_key` フィールドを抽出します。

{{% /collapse-content %}}


{{% collapse-content title="HashiCorp Vault バックエンド" level="h4" expanded=false id="id-for-hashicorp" %}}

次の HashiCorp サービスがサポートされています。

| secret_backend_type 値                               | HashiCorp サービス                                  |
|  |  |
| `hashicorp.vault` | [HashiCorp Vault (Secrets Engine バージョン 1 および 2)][3000] |

##### HashiCorp Vault のセットアップ方法
1. HashiCorp Vault を実行します。詳細については、[公式の HashiCorp Vault ドキュメント][3001] を参照してください。
2. Vault からシークレットを取得するための権限を付与するポリシーを記述します。`*.hcl` ファイルを作成し、Secrets Engine バージョン 1 を使用している場合は、次の権限を含めます。

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Secrets Engine バージョン 2 を使用している場合は、次の権限が必要です。

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
3. `vault policy write <policy_name> &lt;path_to_*.hcl_file>` を実行します。

4. Vault の認証方法を選択します。AWS インスタンスプロファイルメソッドを使用する場合は、`vault auth enable aws` を実行します。

##### AWS インスタンスプロファイルの手順

AWS に接続されたマシンから HashiCorp Vault を実行している場合、Datadog では [インスタンスプロファイルメソッド][3003] を使用して認証することを推奨しています。

セットアップが完了したら、[認証専用の Vault ポリシー][3004] を記述します。

##### 設定例

次の例では、HashiCorp Vault のシークレットパスプレフィックスが `/Datadog/Production` であり、パラメーターキーが `apikey` であるとします。

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

次の例では、AWS を利用して認証を行い、HashiCorp Vault から API キーの値を取得します。

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1 // this field is optional, and will default to us-east-1 if not set
```

{{% /collapse-content %}}

{{% collapse-content title="Kubernetes Secrets" level="h4" expanded=false id="id-for-kubernetes" %}}

**Agent バージョン 7.75 以上で利用可能**

次の Kubernetes サービスがサポートされています。

| secret_backend_type 値 | サービス |
|||
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### 前提条件

Kubernetes Secrets バックエンドには次のものが必要です。
 **ServiceAccount の資格情報**: デフォルトでは、自動的にマウントされた ServiceAccount トークンを使用します (`automountServiceAccountToken: true`、詳細は [Kubernetes ドキュメント](https://kubernetes.io/docs/tasks/configurepodcontainer/configureserviceaccount/#optoutofapicredentialautomounting)を参照)。必要に応じてカスタムパスを設定できます。
**RBAC 権限**: Agent の ServiceAccount には、ターゲットネームスペースからシークレットを読み取るための権限が必要です。
 **ネットワークアクセス**: Agent Pod は Kubernetes API サーバーに到達できる必要があります。

##### RBAC のセットアップ

シークレットを含む各ネームスペースについて、次の例のように正しいネームスペース名を使用して `Role` と `RoleBinding` を作成します。

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

##### 設定例

{{< tabs >}}
{{% tab "Agent YAML ファイル" %}}

Kubernetes Secrets を使用して、次の設定に基づいて Datadog Agent を設定します。

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

ENC 表記形式は `namespace/secretname;key` です。
 `namespace`: シークレットを含む Kubernetes ネームスペース
 `secretname`: シークレットリソースの名前
 `key`: シークレットのデータフィールドから抽出する特定のキー

**例:** ネームスペース `secretsns` におけるシークレットの指定

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

**複数ネームスペースのサポート:**
各シークレット参照では異なるネームスペースを指定できます (RBAC はそれぞれに対して設定する必要があります)。

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm と一緒に Kubernetes Secrets を使用するように Datadog Agent を設定します。

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

**注:** シークレットバックエンドを使用して API キーを解決する際、Helm チャートの検証にはプレースホルダー `apiKey` が必要です。これは `DD_API_KEY` 環境変数によりオーバーライドされます。シークレットを含む各ネームスペースに対して手動でRBAC (ロール + RoleBinding) を作成する必要があります。詳細については、[RBAC のセットアップ](#rbacsetup)セクションを参照してください。

<div class="alert alert-info"> Helm にはネイティブな <code>secretBackend.type</code> 設定がありません。環境変数を使用します。 </div>

{{% /tab %}}

{{% tab "Operator" %}}

Datadog Operator と一緒に Kubernetes Secrets を使用するように Datadog Agent を設定します。

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

**注:** プレースホルダー API キーでは、シークレットバックエンドを使用して API キーを解決する際に Operator の検証が満たされます。これは `DD_API_KEY` 環境変数によりオーバーライドされます。シークレットを含む各ネームスペースに対して手動でRBAC (ロール + RoleBinding) を作成する必要があります。詳細については、[RBAC のセットアップ](#rbacsetup)セクションを参照してください。

<div class="alert alert-info"> Operator にはネイティブな <code>secretBackend.type</code> 設定がありません。<code>override.nodeAgent.env</code> に環境変数を使用します。 </div>

{{% /tab %}}
{{< /tabs >}}

##### カスタムパスの設定
デフォルトの ServiceAccount ベース認証の場所に従ってセットアップが行われない場合は、代わりに `token_path` と `ca_path` を指定できます。

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
{{% /tab %}}

{{% tab "Operator" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```
{{% /tab %}}
{{< /tabs >}}

##### カスタム API サーバーの設定

セットアップでデフォルトの `KUBERNETES_SERVICE_HOST` および `KUBERNETES_SERVICE_PORT` 環境変数が公開されない場合、Kubernetes REST API とのやりとりのために `api_server` の URL を指定できます。

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
{{% /tab %}}

{{% tab "Operator" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Docker Secrets" level="h4" expanded=false id="id-for-docker" %}}

**Agent バージョン 7.75 以上で利用可能**

次の Docker サービスがサポートされています。

| secret_backend_type 値 | サービス |
|||
| `docker.secrets` | [Docker Secrets][6001] |

##### 前提条件

Docker Secrets バックエンドでは、[Docker Swarm のシークレット][6002] と [Docker Compose のシークレット][6003] の両方がサポートされています。デフォルトでは、Swarm と Compose は、コンテナ内のシークレットをファイルとして `/run/secrets` (Linux) または `C:\ProgramData\Docker\secrets` (Windows) に自動的にマウントします。

**注**: Compose シークレットは、ファイルベース (ローカルファイルを指す) または外部 (既存の Swarm シークレットを参照) とすることができます。

##### 設定例

Docker Secrets を使用して、次の設定に基づいて Datadog Agent を設定します。

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

ENC 表記形式はシークレット名で、`/run/secrets/` 内のファイル名に対応します。
 `ENC[api_key]` は `/run/secrets/api_key` (Linux) または `C:\ProgramData\Docker\secrets\api_key` (Windows) から読み取ります。

**カスタムシークレットのパス:**
シークレットを異なる場所にマウントするように Docker Swarm または Compose が設定されている場合は、次のように指定できます。

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Docker Swarm の例

Docker Swarm シークレットを [作成][6002] して使用します。

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
  datadog/agent:latest
```

シークレット `dd_api_key` は自動的に `/run/secrets/dd_api_key` にマウントされ、Agent により、`docker.secrets` バックエンドを使用して読み取られます。

##### Docker Compose の例

ファイルベースのシークレットを使用して `dockercompose.yml`を [作成][6003] します。

```yaml
version: '3.8'

services:
  datadog:
    image: datadog/agent:latest
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

{{% collapse-content title="JSON、YAML、または TEXT ファイルシークレットバックエンド" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| secret_backend_type 値 | ファイルサービス |
|||
|`file.json`           |[JSON][4001]                             |
|`file.yaml` |[YAML][4002] | |
|`file.text` |[TEXT][4003] | |

##### ファイルのアクセス許可
ファイルバックエンドには、設定された JSON、YAML、または TEXT ファイルに対する**読み取り**アクセス許可のみが必要です。これらのアクセス許可を、ローカルの Datadog Agent ユーザー (Linux では `ddagent`、Windows では `ddagentuser`) に付与する必要があります。


{{< tabs >}}
{{% tab "JSON ファイルバックエンド" %}}

**注**: JSON の深度は 1 つのレベルのみサポートされています (たとえば、`{"key": "value"}`)。

##### 設定例

JSON ファイルを使用してシークレットをローカルに保存できます。

たとえば、`/path/to/secret.json` に次の内容を含む JSON ファイルがある場合:

```json
{
  "datadog_api_key": "your_api_key"
}
```

この設定を使用してシークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "YAML ファイルバックエンド" %}}

**注**: YAML の深度は 1 つのレベルのみサポートされています (たとえば、`key: value`)

##### 設定例

YAML ファイルを使用してシークレットをローカルに保存できます。

たとえば、`/path/to/secret.yaml` 内の YAML ファイルに次の内容が記述されている場合:

```yaml
datadog_api_key: your api key
```

次の設定を使用してここからシークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "TEXT ファイルバックエンド" %}}

**Agent バージョン 7.75 以上で利用可能**

**注**: 各シークレットはそれぞれ個別のテキストファイルに保存する必要があります。

##### 設定例

個別のテキストファイルを使用して、シークレットをローカルに保存できます。

たとえば、`/path/to/secrets/` にあるテキストファイルを使用する場合:

`/path/to/secrets/dd_api_key` には次の項目が含まれています。

```
your_api_key_value
```

`/path/to/secrets/dd_app_key` には次の項目が含まれています。

```
your_app_key_value
```

この設定を使用して、そこからシークレットを取得できます。

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### パスのセキュリティ:

 `ENC[]` の相対パスは、`secrets_path` に対して相対的に解決されます (例: `ENC[dd_api_key]` と `secret_path: /path/to/secrets` は `/path/to/secrets/dd_api_key` に解決されます)。
 `ENC[]` の絶対パスは `secrets_path` 内になければなりません (例: `ENC[/path/to/secrets/dd_api_key]` と `secret_path: /path/to/secrets` は有効です)。
 パストラバーサルの試み (例: `ENC[../etc/passwd]`) はブロックされ、「許可されたディレクトリ外のパス」として失敗します。

**注:** 一部のツールでは、シークレットをファイルにエクスポートする際に自動的に改行が追加されます。この方法の詳細については、[末尾の改行を削除する](#removetrailinglinebreaks)を参照してください。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### オプション 2: Kubernetes と Docker 用の組み込みスクリプトを使用

コンテナ化された環境では、Datadog Agent のコンテナイメージには、バージョン v7.32.0 以降で使用できる組み込みスクリプト `/readsecret_multiple_providers.sh` が含まれています。このスクリプトでは、次の場所からシークレットを読み取ることができます。

* ファイル: `ENC[file@/path/to/file]` を使用
* Kubernetes Secrets: `ENC[k8s_secret@namespace/secretname/key]` を使用

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator でこの実行ファイルを使用するには、次のように設定します。

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

Helm チャートでこの実行ファイルを使用するには、次のように設定します。

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

この実行ファイルを使用するには、環境変数 `DD_SECRET_BACKEND_COMMAND` を次のように設定します。

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### 例: マウントされたファイルからの読み取り

Kubernetes では、エージェントがシークレットを解決するために読み取ることができる Pod 内で [シークレットをファイルとして公開する][2] ことができます。

Kubernetes では、次のようにシークレットをボリュームとしてマウントできます。

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

そして、シークレットを次のように参照できます。

```
password: ENC[file@/etc/secret-volume/password]
```

**注**:
 シークレットは、マウント先の Pod と同じネームスペースに存在する必要があります。
スクリプトからは、機密の `/var/run/secrets/kubernetes.io/serviceaccount/token` を含むすべてのサブフォルダーにアクセスできます。そのため、Datadog では `/var/run/secrets` の代わりに専用のフォルダーを使用することが推奨されています。

[Docker Swarm シークレット][3] は `/run/secrets` フォルダーにマウントされます。たとえば、Docker シークレット `db_prod_passsword` は Agent コンテナの `/run/secrets/db_prod_password` にあります。これは、設定で `ENC[file@/run/secrets/db_prod_password]` として参照されます。

#### 例: ネームスペースをまたいで Kubernetes シークレットを読み取る

Agent が異なるネームスペースからシークレットを読み取る必要がある場合は、`k8s_secret@` プレフィックスを使用します。たとえば、以下のとおりです。

```
password: ENC[k8s_secret@database/database-secret/password]
```

Agent のサービスアカウントがシークレットを読み取れるように RBAC を設定します。次のロールは、`database` ネームスペースで `databasesecret` シークレットに対する読み取りアクセス権を付与します。
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
***注***: また、ロールリスト内の各ネームスペースが、Datadog Operator のデプロイメントで `WATCH_NAMESPACE` または `DD_AGENT_WATCH_NAMESPACE` 環境変数に設定されている必要もあります。
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


また、RBAC リソースを直接定義することもできます。

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

この `Role` は、`Namespace: database` で `Secret: databasesecret` に対するアクセス権を付与します。この `RoleBinding` は、`Namespace: default` で `ServiceAccount: datadogagent` に対するこのアクセス許可をリンクします。これは、デプロイされたリソースに関して手動でクラスターに追加する必要があります。

### オプション 3: カスタム実行ファイルの作成

シークレットを取得するために、Agent ではユーザーが提供した外部の実行ファイルを使用します。実行ファイルは、新しいシークレットが検出され、Agent のライフサイクル期間中キャッシュされたときに使用されます。シークレットを更新またはローテーションする必要がある場合は、Agent を再起動してリロードする必要があります。

これにより、任意のシークレット管理ソリューションを使用でき、Agent がシークレットにアクセスする方法を完全に制御できます。

Agent では、解決すべきシークレットハンドルのリストを含む JSON ペイロードが、標準入力経由でこの実行ファイルに送信されます。次に、実行ファイルにより各シークレットが取得され、標準出力を通じてそれらが JSON 形式で返されます。

以下の例に、Agent により STDIN で実行ファイルに送信される内容を示します。

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (文字列): フォーマットバージョンです。
* `secrets` (文字列のリスト): 各文字列はシークレットが取得するハンドルです。


実行ファイルは、以下の STDOUT 出力を通じて応答します。

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (文字列): 設定で使用されるシークレットの値。エラーの場合、これは `null` になる可能性があります。
* `error` (文字列): エラーメッセージまたは `null`。

(非ゼロの終了コードまたは非 null のエラーが返され) シークレットの解決に失敗した場合、関連する設定は Agent によって無視されます。

**機密情報は `stderr`** に出力しないでください。バイナリが `0` 以外のステータスコードで終了した場合、Agent はトラブルシューティングのために実行ファイルの標準エラー出力をログに記録します。

任意の言語を使用して、独自のシークレット取得の実行ファイルを構築することもできます。唯一の要件は、前述の入力/出力形式に従うことです。

ダミーのシークレットを返す Go の例を次に示します。

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

これにより、次の設定が

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

メモリ内で次のように変換されます。

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

バイナリを使用してシークレットを解決するように Agent を設定するには、次のように追加します。

```
secret_backend_command: /path/to/binary
```

## Agent のセキュリティ要件

Agent は提供された実行ファイルをサブプロセスとして実行します。実行パターンは Linux と Windows で異なります。

{{< tabs >}}
{{% tab "Linux" %}}

Linux では、実行ファイルは次の条件を満たす必要があります。

* Agent を実行しているのと同じユーザーに属していること (デフォルトでは `ddagent`、またはコンテナ内の `root`)。
* `group` または `other` の権限がないこと。
* 所有者に対して少なくとも**実行**権限があること。

{{% /tab %}}
{{% tab "Windows" %}}

Windows では、実行ファイルは次の条件を満たす必要があります。

* `ddagentuser` (Agent の実行に使用するユーザー) に対する**読み取り**または**実行**権限があること。
* **Administrators** グループ、ビルトイン**ローカルシステム**アカウント、または Agent ユーザーコンテキスト (デフォルトでは `ddagentuser`) 以外のユーザーまたはグループの権限がないこと。
*有効な Win32 アプリケーションであるため、Agent で実行できること (たとえば、PowerShell または Python スクリプトは機能しません)。

{{% /tab %}}
{{< /tabs >}}

**注**: 実行ファイルは、Agent と同じ環境変数を共有します。

## 実行時のシークレットのリフレッシュ

Agent v7.67 以降、再起動しなくても、解決されたシークレットがリフレッシュされるように Agent を設定できます。

リフレッシュ間隔を設定します。

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

または、リフレッシュを手動でトリガーします。

```shell
datadog-agent secret refresh
```

### API/APP キーのリフレッシュ
シークレットとして取得された API/APP キーでは、実行時リフレッシュがサポートされています。

これを有効にするには、`datadog.yaml` で `secret_refresh_interval` (秒単位) を設定します。

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

デフォルトでは、Agent は初期リフレッシュを `secret_refresh_interval` ウィンドウ内でランダム化して、
複数の Agent が同時にリフレッシュされるのを防ぎます。キーは起動時に解決され、その後、最初の間隔内で一度リフレッシュされます。
以降、間隔ごとにリフレッシュされます。

ダウンタイムを防ぐため、全 Agent で更新済みのキーの取得が完了するまで待ってから、古いキーを無効にしてください。キーの使用状況の追跡は、
[フリート管理](https://app.datadoghq.com/fleet)ページでできます。

この動作を無効にするには、次のように設定します。

```yaml
secret_refresh_scatter: false
```

### Autodiscovery チェックのシークレットのリフレッシュ
Agent v7.76 以降、スケジュールされた [Autodiscovery][1] チェックでは、テンプレートが `ENC[]` 構文を使用している場合、実行時にシークレットをリフレッシュできます。

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

その後、Agent では、`secret_refresh_interval` に設定された間隔で、または`datadogagent secret refresh` を使用して手動で、シークレットのリフレッシュをトリガーできます。

### API キーの失敗時または無効化時のシークレットの自動リフレッシュ

Agent バージョン v7.74 以降、Agent では無効な API キーを検出した際にシークレットを自動的にリフレッシュできます。これは、Agent が Datadog から「403 Forbidden」の応答を受け取った場合、または定期的なヘルスチェックで無効または期限切れの API キーが検出された場合に発生します。

この機能を有効にするには、`datadog.yaml`ファイルで `secret_refresh_on_api_key_failure_interval` を分単位の間隔に設定します。無効にするには、`0` に設定します (デフォルト)。

この間隔は、無効な API キーが検出された際に、シークレット管理ソリューションへのスパムを防ぐために 2 回のリフレッシュの間に設けられる最小時間です。

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

この設定は `secret_refresh_interval` と互換性があります。

### DDOT コレクターリフレッシュの有効化
[DDOT コレクター][6] を使用していて、API/APP リフレッシュを有効にしたい場合は、次の追加設定を `datadog.yaml` ファイルに追加する必要があります。

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

これにより、シークレットがリフレッシュされた後、DDOT コレクターと Agent の同期が維持されます。Agent で設定状態が定期的に確認されるのと同様の方法で、DDOT コレクターではこの設定を使用して Agent で更新された値を定期的にチェックします。

## トラブルシューティング

### 検出されたシークレットのリスト

Agent CLI の `secret` コマンドでは、セットアップに関連するエラーが表示されます。たとえば、実行ファイルの権限が不正確な場合です。また、検出されたすべてのハンドルとその場所がリストされます。

Linux では、コマンドにより、実行ファイルのファイルモード、所有者、およびグループが出力されます。Windows では、ACL 権限がリストされます。

{{< tabs >}}
{{% tab "Linux" %}}

Linux の例

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

Windows の例 (管理者の PowerShell から)

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

### シークレットが挿入された後の設定の表示

チェックの設定がどのように解決されるかを素早く確認するには、`configcheck` コマンドを使用します。

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

**注**: Agent は、構成ファイルの変更を取得するために [再起動][7] する必要があります。

### secret_backend_command のデバッグ

Agent の外部でテストまたはデバッグするには、Agent の実行方法を模倣します。

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

Datadog Agent をインストールすると、`ddagent` ユーザーが作成されます。

{{% /tab %}}
{{% tab "Windows" %}}

##### 権限に関連するエラー

次のエラーは、セットアップで何かが欠落していることを示しています。

1. 必要でないグループまたはユーザーが実行ファイルに対して権限を持っている場合、次のようなエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. `ddagentuser` にファイルに対する読み取りおよび実行権限がない場合、同様のエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. 実行ファイルは有効な Win32 アプリケーションである必要があります。そうでない場合、次のエラーがログに記録されます。
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog には、実行ファイルに正しい権限を設定するのに役立つ [PowerShell スクリプト][9] があります。その使用方法の例を次に示します。

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

##### 実行ファイルのテスト

実行ファイルは、シークレットの取得時に Agent によって実行されます。Datadog Agent は、`ddagentuser` を使用して実行されます。このユーザーには特定の権限はありませんが、`Performance Monitor Users` グループの一部です。このユーザーのパスワードはインストール時にランダムに生成され、どこにも保存されません。

そのため、実行ファイルはデフォルトのユーザーまたは開発ユーザーで動作する可能性がありますが、`ddagentuser` の権限は制限が強いため、Agent によって実行されるときは動作しません。

Agent と同じ条件で実行ファイルをテストするには、開発用マシンの `ddagentuser` のパスワードを更新してください。この方法で、`ddagentuser` として認証し、Agent と同じコンテキストで実行ファイルを実行できます。

これを行うには、次の手順を実行します。

1. `Local Security Policy` の `Local Policies/User Rights Assignement/Deny Log on locally` リストから `ddagentuser` を削除します。
2. `ddagentuser` に新しいパスワードを設定します (インストール時に生成されたパスワードはどこにも保存されないため)。PowerShell で、次を実行します。
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. サービスコントロールマネージャーの `DatadogAgent` サービスで使用されるパスワードを更新します。PowerShell で、次を実行します。
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

これで、`ddagentuser` としてログインして実行ファイルをテストできます。Datadog の [PowerShell スクリプト][10] は、実行ファイルを
別のユーザーとしてテストするのに役立ちます。ユーザーのコンテキストを切り替え、Agent での実行ファイルの実行方法を模倣します。

その使用方法の例を次に示します。

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

[9]: https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/SetSecretPermissions.ps1
[10]: https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### Agent による起動の拒否

Agent の起動時の最初の処理は、`datadog.yaml` をロードし、その中のシークレットを復号化することです。これは、ログのセットアップの前に行われます。そのため、Windows のようなプラットフォームでは、`datadog.yaml` のロード時に発生するエラーがログに書き込まれず、`stderr` に書き込まれます。これは、シークレットのために Agent に渡された実行ファイルがエラーを返すときに発生する可能性があります。

`datadog.yaml` にシークレットがあり、Agent により起動を拒否された場合、次のことを行ってください。

* `stderr` を表示できるように、手動での Agent の起動を試みます。
* `datadog.yaml` からシークレットを削除し、最初にチェック構成ファイルでシークレットをテストします。

### Kubernetes の権限のテスト
Kubernetes から直接シークレットを読み込む場合、`kubectl auth` コマンドで権限をダブルチェックすることができます。一般的な形は次のとおりです。

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

先ほどの [Kubernetes Secrets 例](#examplereadingakubernetessecretacrossnamespaces)で、シークレット `Secret:databasesecret` が `Namespace: database` に存在し、サービスアカウント `ServiceAccount:datadogagent` が `Namespace: default` に存在していると考えてみましょう。

この場合、次のコマンドを使用します。

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

このコマンドは、Agent がこのシークレットを閲覧するための権限が有効であるかどうかを返します。

### 行末の改行を削除する {#removetrailinglinebreaks}

一部のシークレット管理ツールでは、ファイルを通じてシークレットをエクスポートする際に自動的に改行を追加します。これらの改行は、特にコンテナ化された環境で、[datadog.yaml 構成ファイル][8] に `secret_backend_remove_trailing_line_break: true` を設定するか、環境変数 `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` を使用して削除できます。

### シークレットハンドルにおける Autodiscovery 変数

シークレットハンドルで [Autodiscovery][1] 変数を使用することもできます。Agent では、シークレットを解決する前にこれらの変数が解決されます。たとえば、以下のとおりです。

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/injectdataapplication/distributecredentialssecure/#createapodthathasaccesstothesecretdatathroughavolume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /ja/opentelemetry/setup/ddot_collector/
[7]: /ja/agent/configuration/agentcommands/#restarttheagent
[8]: /ja/agent/configuration/agentconfigurationfiles/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systemsmanager/latest/userguide/systemsmanagerparameterstore.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/enus/Azure/keyvault/secrets/quickcreateportal

<!-- HashiCorp Vault Links -->
[3000]: https://learn.hashicorp.com/tutorials/vault/staticsecrets
[3001]: https://developer.hashicorp.com/
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html
[3004]: https://developer.hashicorp.com/vault/docs/auth/aws#iamauthenticationinferences

<!-- File Backend Links (JSON/YAML) -->
[4001]: https://en.wikipedia.org/wiki/JSON
[4002]: https://en.wikipedia.org/wiki/YAML
[4003]: https://en.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000]: https://cloud.google.com/security/products/secretmanager
[5001]: https://cloud.google.com/docs/authentication/applicationdefaultcredentials
[5002]: https://docs.cloud.google.com/secretmanager/docs/accesscontrol
[5003]: https://docs.cloud.google.com/secretmanager/docs/accessingtheapi

<!-- Docker Secrets Links -->
[6001]: https://docs.docker.com/engine/swarm/secrets/
[6002]: https://docs.docker.com/engine/swarm/secrets/#howdockermanagessecrets
[6003]: https://docs.docker.com/compose/howtos/usesecrets/

<!-- Kubernetes Secrets Links -->
[7000]: https://kubernetes.io/docs/concepts/configuration/secret/