---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /ko/agent/faq/kubernetes-secrets
- /ko/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentation
  text: Autodiscovery
title: 시크릿 관리
---
## 개요

Datadog Agent를 이용하면 다음과 같은 시크릿 관리 솔루션과 통합하여 시크릿을 안전하게 관리하는 데 도움이 됩니다.
 [AWS Secrets Manager](#idforsecrets)
 [AWS SSM](#idforssm)
 [Azure KeyVault](#idforazure)
 [GCP Secret Manager](#idforgcp)
 [HashiCorp Vault](#idforhashicorp)
 [Kubernetes Secrets](#idforkubernetes)
 [Docker Secrets](#idfordocker)
 [File Text](#idforjsonyamltext)
 [File JSON](#idforjsonyamltext)
 [File YAML](#idforjsonyamltext)

Agent는 API 키나 비밀번호와 같은 민감한 값을 구성 파일 내에 일반 텍스트로 하드코딩하지 않고, 런타임에 동적으로 검색할 수 있습니다. 구성의 시크릿을 참조하려면 `ENC[<secret_id>]` 표기법을 사용하세요. 시크릿은 가져와서 메모리에 로드되지만, 디스크에 쓰거나 Datadog 백엔드로 전송되지는 않습니다.

**참고**: `ENC[]` 구문을 `secret_backend_command` 같은 `secret_*` 설정에서 사용할 수 없습니다.

## 시크릿 검색 옵션

### 옵션 1: 시크릿을 가져오는 데 네이티브 Agent 지원 사용

**참고**: Agent 버전 `7.76` 이후부터는 FIPS가 활성화된 Agent에 네이티브 시크릿 관리를 사용할 수 있습니다.

Agent 버전 `7.70`부터 Datadog Agent가 기본적으로 몇 가지 시크릿 관리 솔루션을 지원합니다. `datadog.yaml`에 두 가지 새로운 설정인 `secret_backend_type` 및 `secret_backend_config`가 도입되었습니다.

`secret_backend_type`은 사용할 시크릿 관리 솔루션을 지정하는 데 사용되고, `secret_backend_config`는 해당 솔루션과 관련 있는 추가 구성을 보유합니다.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**참고**: Datadog을 컨테이너화된 환경에서 실행 중인 경우, [Cluster Agent](/containers/cluster_agent/)에 Agent 7.77 이후 버전이 있어야 네이티브 시크릿 가져오기가 지원됩니다. 이전 버전의 경우, [옵션 2](#option2usingthebuiltinscriptforkubernetesanddocker) 또는 [옵션 3](#option3creatingacustomexecutable)을 대신 사용하세요.

더 구체적인 설정 지침은 사용한 백엔드 유형에 따라 다릅니다. 자세한 정보는 아래에서 해당하는 섹션을 참조하세요.


{{% collapse-content title="AWS Secrets" level="h4" expanded=false id="id-for-secrets" %}}
지원되는 AWS 서비스는 다음과 같습니다.

|secret_backend_type 값                                | AWS 서비스                             |
|||
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### 인스턴스 프로필 설정

Datadog에서는 시크릿을 가져오는 데 [인스턴스 프로필 방법][1006]을 사용하도록 권장합니다. AWS에서 사용자 대신 모든 환경 변수와 세션 프로필을 처리하기 때문입니다. 이렇게 하는 방법에 대한 자세한 지침은 공식 [AWS Secrets Manager 설명서][1000]에서 확인할 수 있습니다.

##### 구성 예시

{{< tabs >}}
{{% tab "Agent YAML 파일" %}}

다음 구성을 사용하여 Datadog Agent가 AWS Secrets를 사용해 시크릿을 확인하도록 구성하세요.

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

환경 변수를 사용할 때, 구성을 다음과 같이 JSON으로 변환합니다.

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Agent가 AWS Secrets를 사용하도록 구성하고 나면 `ENC[secretId;secretKey]`를 사용해 구성의 모든 시크릿을 참조할 수 있습니다.

ENC 표기법은 다음과 같이 구성됩니다.
* `secretId`: 시크릿 “친화적 이름”(예: `/DatadogAgent/Production`) 또는 ARN(예: `arn:aws:secretsmanager:useast1:123456789012:secret:/DatadogAgent/ProductionFOga1K`).
   **참고**: AWS 자격 증명 또는 `sts:AssumeRole` 자격 증명이 정의된 다른 계정에서 시크릿에 액세스할 때는 전체 ARN 형식이 필요합니다.
* `secretKey`: 사용하고자 하는 AWS 시크릿의 JSON 키입니다.


AWS Secrets Manager는 시크릿 하나에 여러 개의 키-값 쌍을 저장할 수 있습니다. Secrets Manager를 사용한 백엔드 구성은 시크릿에 정의된 모든 키에 액세스할 수 있습니다.

예를 들어 시크릿 ID `MySecrets`에 다음과 같은 값 3개를 포함한다고 가정합니다.

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

다음은 `MySecrets`에서 API 키를 풀링하기 위해 AWS Secrets를 사용하는 `datadog.yaml` 구성 파일의 전체 예시입니다.

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

다음 구성을 사용하여 Datadog Agent가 AWS Secrets를 사용해 Helm의 시크릿을 확인하도록 구성하세요.

##### 통합 검사

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

<div class="alert alert-info"> AWS 시크릿에 액세스하려면 <code>serviceAccountAnnotations</code>를 포함하여 Agent 권한을 부여해야 합니다. </div>

<br>


##### 클러스터 검사: 클러스터 검사 러너가 활성화되지 않은 경우

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

##### 클러스터 검사: 클러스터 검사 러너가 활성화된 경우

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

다음 구성을 사용하여 Datadog Agent가 AWS Secrets를 사용해 Datadog Operator로 시크릿을 확인하도록 구성하세요.

##### 통합 검사


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

<div class="alert alert-info"> AWS 시크릿에 액세스하려면 <code>serviceAccountAnnotations</code>를 포함하여 Agent 권한을 부여해야 합니다. </div>

<br>


##### 클러스터 검사: 클러스터 검사 러너가 활성화되지 않은 경우

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

##### 클러스터 검사: 클러스터 검사 러너가 활성화된 경우

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
지원되는 AWS 서비스는 다음과 같습니다.

|secret_backend_type 값                                | AWS 서비스                             |
|||
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### 인스턴스 프로필 설정

Datadog에서는 시크릿을 가져오는 데 [인스턴스 프로필 방법][1006]을 사용하도록 권장합니다. AWS에서 사용자 대신 모든 환경 변수와 세션 프로필을 처리하기 때문입니다. 이렇게 하는 방법에 대한 자세한 지침은 공식 [AWS Secrets Manager 설명서][1001]에서 확인할 수 있습니다.

##### 구성 예시

AWS System Manager Parameter Store는 계층 구조 모델을 지원합니다. 예를 들어 다음과 같은 AWS System Manager Parameter Store 경로를 가정하겠습니다.

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

파라미터를 다음과 같이 가져올 수 있습니다.

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


{{% collapse-content title="Azure Keyvault Backend" level="h4" expanded=false id="id-for-azure" %}}


지원되는 Azure 서비스는 다음과 같습니다.

| secret_backend_type 값                            | Azure 서비스          |
| ||
| `azure.keyvault` | [Azure Keyvault][2000] |

##### Azure 인증

Datadog에서는 Azure로 인증하는 데 관리형 ID를 사용하도록 권장합니다. 이렇게 하면 클라우드 리소스를 AMI 계정과 연결할 수 있고 `datadog.yaml` 구성 파일에 민감한 정보를 입력해야 할 필요가 없어집니다.

##### 관리형 ID

Key Vault에 액세스하려면 관리형 ID를 만들어 이를 가상 머신에 할당합니다. 그런 다음, Key Vault에서 적절한 역할 할당을 구성해 해당 ID가 시크릿에 액세스하도록 허용합니다.

##### 구성 예시

Azure Key Vault 시크릿의 백엔드 구성은 다음 스키마를 따른 YAML로 구조화됩니다.

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

해당 백엔드 시크릿은 Datadog Agent 구성 파일에서 `ENC[ ]`로 참조됩니다. 다음은 일반 텍스트 시크릿을 검색해야 하는 경우의 예시입니다.

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Agent 버전 7.74+**에서 이용 가능

지원되는 GCP 서비스는 다음과 같습니다.

| secret_backend_type 값                               | GCP 서비스                    |
|  |  |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### GCP 인증 및 액세스 정책

GCP Secret Manager 구현은 Google로 인증에 [Application Default Credentials(ADC)][5001]를 사용합니다.

GCP Secret Manager와 상호 작용하려면 Datadog Agent가 사용하는 서비스 계정(예를 들어 VM의 서비스 계정, 워크로드 ID 또는 로컬로 활성화한 자격 증명)에 `secretmanager.versions.access` 권한이 있어야 합니다.

이것은 사전 정의한 역할 **Secret Manager Secret Accessor**(`roles/secretmanager.secretAccessor`) 또는 그와 동급의 [액세스 권한][5002]이 있는 사용자 지정 역할을 사용해 부여할 수 있습니다.

GCE 또는 GKE 런타임에 ADC가 인스턴스 또는 포드의 연결된 서비스 계정을 통해 자동으로 구성됩니다. 연결된 서비스 계정에 GCP Secret Manager에 액세스하는 데 적절한 역할이 있어야 합니다. 또한 GCE 또는 GKE 런타임에 `cloudplatform` [OAuth 액세스 범위][5003]가 필요합니다.

##### GCP 구성 예시

다음 구성을 사용하여 Datadog Agent가 GCP Secret Manager를 사용해 시크릿을 확인하도록 구성하세요.

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Agent가 GCP Secret Manager를 사용하도록 구성하고 나면, 구성에서 `ENC[secretname]` 또는 `ENC[secretname;key;version;]`로 시크릿을 참조합니다.

ENC 표기법은 다음과 같이 구성됩니다.

 `secret`: GCP Secret Manager의 시크릿 이름입니다(예: `datadogapikey`).
 `key`: (선택 사항) JSON으로 형식이 지정된 시크릿에서 추출할 키입니다. 일반 텍스트 시크릿을 사용하는 경우, 이를 생략할 수 있습니다(예: `ENC[secretname;;version]`).
 `version`: (선택 사항) 시크릿 버전 번호입니다. 지정하지 않으면 `latest` 버전을 사용합니다.
  + 버전 구문 예시
     `secretkey` 암묵적 `latest` 버전
     `secretkey;;latest` 명시적 `latest` 버전
     `secretkey;;1` 특정 버전 번호

예를 들어 이름이 `datadogapikey`(버전 2개)인 GPC 시크릿과 `datadogappkey`인 GCP 시크릿을 가정한 경우:

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

JSON으로 형식이 지정된 시크릿의 경우, 이름이 `datadogkeys`인 시크릿이 다음을 포함한다고 가정:

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

특정 키를 다음과 같이 참조합니다.

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### 시크릿 버전 관리

GCP Secret Manager는 시크릿 버전을 지원합니다. Agent 구현은 `;` 구분 기호를 사용해서도 시크릿 버전 관리를 지원합니다. 지정된 버전이 없는 경우, `latest` 버전을 사용합니다.


##### JSON 시크릿 지원

Datadog Agent 는 `;` 구분 기호를 사용해 JSON으로 형식이 지정된 시크릿에서 특정 키를 추출하는 작업을 지원합니다.

 `datadog;api_key` 암묵적 `latest` 버전을 사용해 `datadog` 시크릿에서 `api_key` 필드 추출
 `datadog;api_key;1` 버전 `1`의 `datadog` 시크릿에서 `api_key` 필드 추출

{{% /collapse-content %}}


{{% collapse-content title="HashiCorp Vault 백엔드" level="h4" expanded=false id="id-for-hashicorp" %}}

지원되는 HashiCorp 서비스는 다음과 같습니다.

| secret_backend_type 값                               | HashiCorp 서비스                                  |
|  |  |
| `hashicorp.vault` | [HashiCorp Vault(Secret Engine 버전 1 및 2)][3000] |

##### HashiCorp Vault를 설정하는 방법
1. HashiCorp Vault를 실행합니다. 자세한 정보는 [공식 HashiCorp Vault 설명서][3001]를 참조하세요.
2. 볼트에서 시크릿을 풀링할 권한을 부여하는 정책을 작성합니다. `*.hcl` 파일을 생성하고, Secrets Engine 버전 1을 사용하는 경우 다음 권한을 포함:

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Secrets Engine 버전 2를 사용하는 경우, 다음 권한이 필요합니다.

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
3. `vault policy write <policy_name> &lt;path_to_*.hcl_file>`를 실행합니다.

4. 볼트에 인증할 방법을 선택합니다. AWS 인스턴스 프로필 방법을 사용하는 경우, `vault auth enable aws`를 실행하세요.

##### AWS 인스턴스 프로필 지침

Datadog에서는 HashiCorp Vault를 AWS와 연결된 컴퓨터에서 실행하는 경우, [인스턴스 프로필 방법][3003]을 사용하여 인증하도록 권장합니다.

이것이 설정되고 나면 [인증별 볼트 정책][3004]을 작성하세요.

##### 구성 예시

다음 예시에서는 HashiCorp Vault 시크릿 경로 접두사가 `/Datadog/Production`이고 파라미터 키가 `apikey`인 것으로 가정합니다.

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

다음 예시는 HashiCorp Vault에서 API 키 값을 가져오며, 인증에 AWS를 활용합니다.

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

**Agent 버전 7.75+**에서 이용 가능

지원되는 Kubernetes 서비스는 다음과 같습니다.

| secret_backend_type 값 | 서비스 |
|||
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### 전제 조건

Kubernetes 시크릿 백엔드에 필요한 조건입니다.
 **ServiceAccount 자격 증명**: 기본적으로, 자동으로 마운팅된 ServiceAccount 토큰을 사용합니다(`automountServiceAccountToken: true`, [Kubernetes 설명서](https://kubernetes.io/docs/tasks/configurepodcontainer/configureserviceaccount/#optoutofapicredentialautomounting) 참조). 필요한 경우, 사용자 지정 경로를 구성할 수 있습니다.
 **RBAC 권한**: Agent의 ServiceAccount에 대상 네임스페이스에서 시크릿을 읽을 권한이 있어야 함
 **네트워크 액세스**: Agent 포드가 Kubernetes API 서버에 연결할 수 있어야 함

##### RBAC 설정

시크릿을 포함하는 각각의 네임스페이스에 대해, 다음 예시를 사용해 올바른 네임스페이스 이름을 사용하여 `Role` 및 `RoleBinding`을 생성합니다.

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

##### 구성 예시

{{< tabs >}}
{{% tab "Agent YAML 파일" %}}

다음 구성을 사용하여 Datadog Agent가 Kubernetes Secrets를 사용하도록 구성하세요.

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

ENC 표기법 형식은 `namespace/secretname;key`입니다.
 `namespace`: 시크릿을 포함하는 Kubernetes 네임스페이스
 `secretname`: 시크릿 리소스의 이름
 `key`: 시크릿의 데이터 필드에서 추출할 특정 키

**예:** 네임스페이스 `secretsns`에 시크릿이 제공된 경우입니다.

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

개별 키를 참조할 수 있습니다.

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**복수 네임스페이스 지원:**
각 시크릿 참조가 서로 다른 네임스페이스를 지정할 수 있습니다(각각에 RBAC를 구성해야 함).

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Datadog Agent가 Kubernetes Secrets를 Helm과 함께 사용하도록 구성합니다.

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

**참고:** API 키를 확인하는 데 시크릿 백엔드를 사용하는 경우, Helm 차트 검증에 플레이스홀더 `apiKey`가 필요합니다. `DD_API_KEY` 환경 변수가 이를 재정의합니다. 시크릿을 포함하는 각 네임스페이스에 RBAC(Role + RoleBinding)를 수동으로 생성해야 합니다. 자세한 내용은 [RBAC 설정](#rbacsetup) 섹션을 참조하세요.

<div class="alert alert-info"> Helm에는 네이티브 <code>secretBackend.type</code> 구성이 없습니다. 환경 변수를 사용하세요. </div>

{{% /tab %}}

{{% tab "Operator" %}}

Datadog Agent가 Kubernetes Secrets를 Datadog Operator와 함께 사용하도록 구성합니다.

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

**참고:** API 키를 확인하는 데 시크릿 백엔드를 사용할 때, 플레이스홀더 API 키가 Operator 검증을 충족합니다. `DD_API_KEY` 환경 변수가 이를 재정의합니다. 시크릿을 포함하는 각 네임스페이스에 RBAC(Role + RoleBinding)를 수동으로 생성해야 합니다. 자세한 내용은 [RBAC 설정](#rbacsetup) 섹션을 참조하세요.

<div class="alert alert-info"> Operator에는 네이티브 <code>secretBackend.type</code> 구성이 없습니다. <code>override.nodeAgent.env</code>의 환경 변수를 사용하세요. </div>

{{% /tab %}}
{{< /tabs >}}

##### 사용자 지정 경로 구성
설정이 ServiceAccount 기반 인증의 기본 위치를 따르지 않는 경우, 대신 `token_path` 및 `ca_path`를 지정할 수 있습니다.

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

##### 사용자 지정 API 서버 구성

설정이 기본 `KUBERNETES_SERVICE_HOST` 및 `KUBERNETES_SERVICE_PORT` 환경 변수를 노출하지 않는 경우, Kubernetes REST API와 상호 작용할 `api_server` URL을 제공할 수 있습니다.

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

**Agent 버전 7.75+**에서 이용 가능

지원되는 Docker 서비스는 다음과 같습니다.

| secret_backend_type 값 | 서비스 |
|||
| `docker.secrets` | [Docker Secrets][6001] |

##### 전제 조건

Docker 시크릿 백엔드는 [Docker Swarm 시크릿][6002] 및 [Docker Compose 시크릿][6003]을 둘 다 지원합니다. 기본적으로, Swarm 및 Compose는 모두 컨테이너 내 `/run/secrets`(Linux) 또는 `C:\ProgramData\Docker\secrets`(Windows)에 시크릿을 파일로 자동 마운팅합니다.

**참고**: Compose 시크릿은 파일 기반일 수 있고(로컬 파일을 가리킴) 외부일 수도 있습니다(기존 Swarm 시크릿을 참조).

##### 구성 예시

다음 구성을 사용하여 Datadog Agent가 Docker Secrets를 사용하도록 구성하세요.

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

ENC 표기법 형식은 시크릿 이름이며, 이는 `/run/secrets/`의 파일명과 같습니다.
 `ENC[api_key]`는 `/run/secrets/api_key`(Linux) 또는 `C:\ProgramData\Docker\secrets\api_key`(Windows)에서 읽습니다.

**사용자 지정 시크릿 경로:**
Docker Swarm 또는 Compose가 다른 위치에 시크릿을 마운팅하도록 구성된 경우, 다음과 같이 지정할 수 있습니다.

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Docker Swarm 예시

Docker Swarm 시크릿을 [생성][6002]하고 사용합니다.

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

시크릿 `dd_api_key`가 `/run/secrets/dd_api_key`에 자동으로 마운팅되고, Agent가 `docker.secrets` 백엔드를 사용해 해당 시크릿을 읽습니다.

##### Docker Compose 예시

파일 기반 시크릿을 사용해 `dockercompose.yml`을 [생성][6003]합니다.

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

시크릿 파일 `./secrets/api_key.txt`가 컨테이너의 `/run/secrets/dd_api_key`에 마운팅됩니다.


{{% /collapse-content %}}

{{% collapse-content title="JSON, YAML 또는 TEXT 파일 시크릿 백엔드" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| secret_backend_type 값                                 | 파일 서비스                             |
|||
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXT][4003]                        |                            |

##### 파일 권한
파일 백엔드에는 구성된 JSON, YAML 또는 TEXT 파일에 대한 **읽기** 권한만 있으면 됩니다. 이러한 권한은 로컬 Datadog Agent 사용자에게 부여해야 합니다(Linux에서는 `ddagent`, Windows에서는`ddagentuser`).


{{< tabs >}}
{{% tab "JSON 파일 백엔드" %}}

**참고**: JSON 깊이는 한 레벨만 지원됨(예: `{"key": "value"}`)

##### 구성 예시

JSON 파일을 사용해 시크릿을 로컬로 저장할 수 있습니다.

예를 들어 다음 내용을 포함한 `/path/to/secret.json`의 JSON 파일 사용:

```json
{
  "datadog_api_key": "your_api_key"
}
```

이 구성을 사용해 해당 파일의 시크릿을 풀링할 수 있습니다.

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "YAML 파일 백엔드" %}}

**참고**: YAML 깊이는 한 레벨만 지원됨(예: `key: value`)

##### 구성 예시

YAML 파일을 사용해 시크릿을 로컬로 저장할 수 있습니다.

예를 들어 `/path/to/secret.yaml`에 다음을 포함한 YAML 파일이 있는 경우:

```yaml
datadog_api_key: your api key
```

다음 구성을 사용해 해당 파일에서 시크릿을 풀링할 수 있습니다.

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "TEXT 파일 백엔드" %}}

**Agent 버전 7.75+**에서 이용 가능

**참고**: 각각의 시크릿은 자체적인 개별 텍스트 파일에 저장되어야 합니다.

##### 구성 예시

개별 텍스트 파일을 사용해 시크릿을 로컬로 저장할 수 있습니다.

예를 들어 `/path/to/secrets/`의 텍스트 파일을 사용합니다.

다음을 포함한 `/path/to/secrets/dd_api_key`:

```
your_api_key_value
```

다음을 포함한 `/path/to/secrets/dd_app_key`:

```
your_app_key_value
```

이 구성을 사용해 시크릿을 풀링할 수 있습니다.

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### 경로 보안:

 `ENC[]`의 상대 경로는 `secrets_path`와 관련해 확인됨(예: `secret_path: /path/to/secrets`가 있는 `ENC[dd_api_key]`는 `/path/to/secrets/dd_api_key`에 대해 확인됨)
 `ENC[]`의 절대 경로는 `secrets_path` 내에 있어야 함(예: `secret_path: /path/to/secrets`가 있는 `ENC[/path/to/secrets/dd_api_key]`가 정상 작동함)
 경로 횡단 시도(예: `ENC[../etc/passwd]`)는 차단되며 “경로가 허용된 디렉터리를 벗어남” 오류가 발생하며 실패함

**참고:** 일부 도구는 시크릿을 파일로 내보낼 때 자동으로 줄 바꿈을 추가합니다. 이 상황에 대처하는 방법은 [후행 줄 바꿈 제거](#removetrailinglinebreaks)를 참조하세요.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### 옵션 2: Kubernetes 및 Docker에 기본 제공 스크립트 사용

컨테이너화된 환경의 경우, Datadog Agent의 컨테이너 이미지에 기본 제공 스크립트 `/readsecret_multiple_providers.sh`가 포함됩니다(버전 v7.32.0부터). 이 스크립트가 다음에서 시크릿 읽기를 지원합니다.

* 파일: `ENC[file@/path/to/file]` 사용
* Kubernetes Secrets: `ENC[k8s_secret@namespace/secretname/key]` 사용

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator와 함께 이 실행 파일을 사용하려면 다음과 같이 구성하세요.

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

Helm 차트와 함께 이 실행 파일을 사용하려면 다음과 같이 설정하세요.

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

이 실행 파일을 사용하려면 환경 변수 `DD_SECRET_BACKEND_COMMAND`를 다음과 같이 설정합니다.

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### 예: 마운팅된 파일에서 읽기

Kubernetes는 Agent가 시크릿을 확인하기 위해 읽을 수 있는 포드 안에서 [시크릿을 파일로 노출][2]을 지원합니다.

Kubernetes에서는 다음과 같이 시크릿을 볼륨으로 마운팅할 수 있습니다.

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

그리고 나서 다음과 같이 시크릿을 참조할 수 있습니다.

```
password: ENC[file@/etc/secret-volume/password]
```

**참고**:
 시크릿은 시크릿이 마운팅되는 포드와 같은 네임스페이스에 존재해야 합니다.
 스크립트가 모든 하위 폴더에 액세스할 수 있습니다. 여기에는 민감한 `/var/run/secrets/kubernetes.io/serviceaccount/token`도 포함됩니다. 따라서 Datadog에서는 `/var/run/secrets` 대신 전용 폴더를 사용할 것을 권장합니다.

[Docker swarm 시크릿][3]은 `/run/secrets` 폴더에 마운팅됩니다. 예를 들어 Docker 시크릿 `db_prod_passsword`는 Agent 컨테이너의 `/run/secrets/db_prod_password`에 있습니다. 이것은 구성에서 `ENC[file@/run/secrets/db_prod_password]`로 참조됩니다.

#### 예: 네임스페이스 전체에서 Kubernetes 시크릿 읽기

Agent가 다른 네임스페이스에서 시크릿을 읽기를 바라는 경우, `k8s_secret@` 접두사를 사용합니다. 예:

```
password: ENC[k8s_secret@database/database-secret/password]
```

Agent의 서비스 계정이 시크릿을 읽게 허용하도록 RBAC를 구성합니다. 다음 역할은 `database` 네임스페이스의 `databasesecret` 시크릿에 대한 읽기 액세스 권한을 부여합니다.
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
***참고***: 역할 목록의 각 네임스페이스가 Datadog Operator 배포의 `WATCH_NAMESPACE` 또는 `DD_AGENT_WATCH_NAMESPACE` 환경 변수에도 구성되어야 합니다.
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


또는 RBAC 리소스를 직접 정의할 수 있습니다.

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

이 `Role`은 `Namespace: database`의 `Secret: databasesecret`에 대한 액세스 권한을 부여합니다. `RoleBinding`은 이 권한을 `Namespace: default`의 `ServiceAccount: datadogagent`에 링크업합니다. 이는 배포된 리소스와 관련하여 클러스터에 수동으로 추가되어야 합니다.

### 옵션 3: 사용자 정의 실행 파일 생성

Agent는 시크릿을 검색하기 위해 사용자가 제공하는 외부 실행 파일을 사용합니다. 이 실행 파일은 새 시크릿이 검색되어 Agent의 수명 주기 동안 캐싱될 때 사용됩니다. 시크릿을 업데이트하거나 회전해야 하는 경우, Agent를 재시작해 다시 로드해야 합니다.

이렇게 하면 어떤 시크릿 관리 솔루션이든 사용할 수 있고, Agent가 시크릿에 액세스하는 방법을 온전히 통제할 수 있습니다.

Agent는 표준 입력을 통해 확인할 시크릿 핸들 목록이 포함된 JSON 페이로드를 이 실행 파일에 보냅니다. 그러면 실행 파일이 각 시크릿을 가져와 표준 출력을 통해 JSON 형식으로 반환합니다.

다음 예시는 Agent가 STDIN에서 실행 파일에 무엇을 보내는지 보여줍니다.

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version`(문자열): 형식 버전입니다.
* `secrets`(문자열 목록): 각 문자열은 가져올 시크릿의 핸들입니다.


실행 파일은 다음과 같은 STDOUT 출력을 통해 응답합니다.

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value`(문자열): 구성에 사용될 시크릿 값입니다. 오류가 발생하는 경우, 이 값이 `null`일 수 있습니다.
* `error`(문자열): 오류 메시지 또는 `null`입니다.

시크릿이 확인되지 않으면(0이 아닌 종료 코드를 반환하거나 null이 아닌 오류 반환) Agent가 관련 구성을 무시합니다.

**`stderr`**에 민감한 정보를 출력하지 마세요. 바이너리가 `0`이 아닌 다른 상태 코드로 종료되면, Agent가 문제 해결을 위해 실행 파일의 표준 오류 출력을 로깅합니다.

어느 언어든 사용해서 자체적인 시크릿 검색 실행 파일을 빌드할 수도 있습니다. 여기서 유일한 요구 사항은 이전에 설명한 입력/출력 형식을 따라야 한다는 것입니다.

다음은 더미 시크릿을 반환하는 Go 예시입니다.

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

이렇게 하면 다음 구성이

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

메모리에서 다음과 같이 변환됩니다.

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Agent가 바이너리를 사용해 시크릿을 확인하도록 구성하려면 다음을 추가하면 됩니다.

```
secret_backend_command: /path/to/binary
```

## Agent 보안 요구 사항

Agent는 제공된 실행 파일을 하위 프로세스로 실행합니다. 실행 패턴은 Linux와 Windows에서 각기 다릅니다.

{{< tabs >}}
{{% tab "Linux" %}}

Linux에서는 실행 파일이 다음과 같은 요건을 충족해야 합니다.

* Agent를 실행하는 사용자와 같은 사용자에게 속합니다(기본적으로 `ddagent`, 또는 컨테이너 안의 `root`).
* `group` 또는 `other`에 대한 권한이 없습니다.
* 소유자에 대하여 최소한 **실행** 권한이 있습니다.

{{% /tab %}}
{{% tab "Windows" %}}

Windows에서는 실행 파일이 다음과 같은 요건을 충족해야 합니다.

* `ddagentuser`(Agent를 실행하는 데 사용된 사용자)에 대한 **읽기** 또는 **실행** 권한이 있습니다.
* **관리자** 그룹, 기본 제공 **로컬 시스템** 계정 또는 Agent 사용자 컨텍스트(기본값: `ddagentuser`)를 제외한 다른 모든 사용자 또는 그룹에 대한 권한이 없습니다.
* 유효한 Win32 애플리케이션이어서 Agent가 실행할 수 있어야 합니다(예: PowerShell 또는 Python 스크립트는 작동하지 않음).

{{% /tab %}}
{{< /tabs >}}

**참고**: 실행 파일은 Agent와 같은 환경 변수를 공유합니다.

## 런타임에 시크릿 새로 고침

Agent v7.67부터는 Agent를 재시작하지 않고 확인된 시크릿을 새로 고치도록 구성할 수 있습니다.

새로 고침 간격을 설정합니다.

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

또는, 수동으로 새로 고침을 트리거합니다.

```shell
datadog-agent secret refresh
```

### API/APP 키 새로 고침
시크릿으로 풀링한 API/APP 키는 런타임 새로 고침을 지원합니다.

이것을 활성화하려면 `datadog.yaml`에서 `secret_refresh_interval`(초 단위)을 설정하면 됩니다.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

기본적으로 Agent는 최초 새로 고침을 `secret_refresh_interval` 기간 이내에서 무작위로 설정해
Agent 플릿이 동시에 새로 고쳐지지 않게 합니다. 키는 시작 시에 확인되고, 첫 간격 이내에 한 번 새로 고쳐지며,
이후에는 매 간격마다 새로 고쳐집니다.

가동 중지를 방지하려면 플릿 전체가 업데이트된 키를 풀링한 다음에만 기존 키를 무효화하세요. 키 사용량은
[플릿 관리](https://app.datadoghq.com/fleet) 페이지에서 추적할 수 있습니다.

이 동작을 비활성화하려면 다음을 설정하면 됩니다.

```yaml
secret_refresh_scatter: false
```

### Autodiscovery 검사 시크릿 새로 고침
Agent v7.76부터는 템플릿이 `ENC[]` 구문을 사용하는 경우 예약된 [Autodiscovery][1] 검사가 런타임에 시크릿을 새로 고칠 수 있습니다.

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

Agent는 그런 다음 `secret_refresh_interval`에 설정된 간격에 시크릿 새로 고침을 트리거하거나, `datadogagent secret refresh`를 사용해 수동으로 트리거할 수 있습니다.

### API 키 실패/무효화 시 자동 시크릿 새로 고침

Agent 버전 v7.74부터는 Agent가 잘못된 API 키를 감지하면 시크릿을 자동으로 새로 고칠 수 있습니다. 이것은 Agent가 Datadog으로부터 403 Forbidden 응답을 수신하거나, 정기 상태 검사에서 잘못되었거나 만료된 API 키가 감지될 때 발생합니다.

이 기능을 활성화하려면 `datadog.yaml` 파일에서 `secret_refresh_on_api_key_failure_interval`을 분 단위 간격으로 설정하세요. 비활성화하려면 `0`으로 설정합니다(기본값).

이 간격은 두 번의 새로 고침 사이 최소 시간으로, 잘못된 API 키가 감지되었을 때 시크릿 관리 솔루션에 요청이 과도하게 전송되는 것을 방지합니다.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

이 설정은 `secret_refresh_interval`과 호환됩니다.

### DDOT 컬렉터 새로 고침 활성화
[DDOT 컬렉터][6]를 사용 중이고 API/APP 새로 고침을 활성화하고자 하는 경우, `datadog.yaml` 파일에 다음과 같은 추가 구성을 추가해야 합니다.

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

이렇게 하면 시크릿을 새로 고친 다음에 DDOT 컬렉터가 Agent와 동기화된 상태를 유지하도록 보장됩니다. Agent가 정기적으로 구성 상태를 확인하는 것과 마찬가지로, DDOT 컬렉터는 이 설정을 사용해 Agent에서 업데이트된 값을 정기적으로 검사합니다.

## 문제 해결

### 감지된 시크릿 나열

Agent CLI의 `secret` 명령을 사용하면 설정과 관련한 모든 오류가 표시됩니다. 예를 들어 실행 파일의 권한이 잘못된 경우가 있습니다. 또한 찾은 모든 핸들과 핸들의 위치를 나열합니다.

Linux에서는 이 명령이 실행 파일의 파일 모드, 소유자 및 그룹을 출력합니다. Windows에서는 ACL 권한을 나열합니다.

{{< tabs >}}
{{% tab "Linux" %}}

Linux에서의 예:

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

Windows에서의 예(관리자 권한의 PowerShell):

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

### 시크릿을 주입한 이후 구성 보기

검사의 구성이 어떻게 확인되는지 신속하게 확인하려면 `configcheck` 명령을 사용하면 됩니다.

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

**참고**: 구성 파일의 변경 사항을 반영하려면 Agent를 [재시작][7]해야 합니다.

### secret_backend_command 디버깅

Agent 외부에서 테스트 또는 디버그하려면 Agent가 이를 실행하는 방식을 흉내낼 수 있습니다.

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

Datadog Agent를 설치할 때 `ddagent` 사용자가 생성됩니다.

{{% /tab %}}
{{% tab "Windows" %}}

##### 권한 관련 오류

다음 오류가 발생하면 설정에 누락된 항목이 있다는 의미입니다.

1. 필요한 경우 외에 다른 그룹이나 사용자에게 실행 파일에 대한 권한이 있는 경우, 다음과 비슷한 오류가 로깅됩니다.
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. `ddagentuser`에 파일에 대한 읽기 및 실행 권한이 없는 경우, 다음과 비슷한 오류가 로깅됩니다.
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. 실행 파일이 유효한 Win32 애플리케이션이어야 합니다. 그렇지 않으면 다음과 같은 오류가 로깅됩니다.
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog에는 [Powershell 스크립트][9]가 있어 실행 파일에서 올바른 권한을 설정하는 데 도움이 됩니다. 사용 방법 예시:

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

##### 실행 파일 테스트

시크릿을 가져올 때 Agent가 실행 파일을 실행합니다. Datadog Agent는 `ddagentuser`를 사용해 실행됩니다. 이 사용자는 구체적인 권한이 없지만, `Performance Monitor Users` 그룹에 속합니다. 이 사용자의 비밀번호는 설치 시 무작위로 생성되며, 어디에도 저장되지 않습니다.

이는 실행 파일이 기본 사용자나 개발 사용자와는 작동할 수 있으나 Agent로 실행될 때는 작동하지 않을 수 있다는 의미입니다. `ddagentuser`의 권한이 더 제한되어 있기 때문입니다.

실행 파일을 Agent와 같은 조건으로 테스트하려면 dev box에서 `ddagentuser`의 비밀번호를 업데이트하세요. 이렇게 하면 `ddagentuser`로 인증한 다음 Agent와 같은 컨텍스트에서 실행 파일을 실행할 수 있습니다.

그렇게 하려면 다음과 같은 단계를 따릅니다.

1. `로컬 보안 정책`의 `로컬 정책/사용자 권한 할당/로컬 로그온 거부` 목록에서 `ddagentuser`를 제거합니다.
2. `ddagentuser`에 새 비밀번호를 설정합니다(설치 시에 생성된 비밀번호는 어디에도 저장되지 않기 때문). PowerShell에서 다음을 실행합니다.
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Service Control Manager에서 `DatadogAgent` 서비스가 사용할 비밀번호를 업데이트합니다. PowerShell에서 다음을 실행합니다.
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

이제 `ddagentuser`로 로그인해 실행 파일을 테스트할 수 있습니다. Datadog에는 [Powershell 스크립트][10]가 있어 실행 파일을
다른 사용자 자격으로 테스트하는 데 도움이 됩니다. 이는 사용자 컨텍스트를 전환하고, Agent가 실행 파일을 실행하는 방식을 흉내 냅니다.

사용 방법 예시:

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

### Agent가 시작을 거부함

시작 시 Agent가 맨 먼저 하는 일은 `datadog.yaml`을 로드하고 그에 포함된 시크릿을 해독하는 것입니다. 이것을 로깅을 설정하기 전에 수행합니다. 이는 Windows와 같은 플랫폼에서 `datadog.yaml`을 로드할 때 발생하는 오류가 로그에 기록되는 것이 아니라 `stderr`에 출력된다는 의미입니다. 이런 상황은 시크릿에 대해 Agent에 제공한 실행 파일이 오류를 반환할 때 발생할 수 있습니다.

`datadog.yaml`에 시크릿이 있고 Agent가 시작을 거부하는 경우 다음을 시도해 보세요.

* `stderr`을 확인할 수 있도록 Agent를 수동으로 시작해 보세요.
* `datadog.yaml`에서 시크릿을 제거하고, 먼저 검사 구성 파일의 시크릿으로 테스트합니다.

### Kubernetes 권한 테스트
Kubernetes에서 직접 시크릿을 읽을 때는 `kubectl auth` 명령으로 권한을 두 번 검사할 수 있습니다. 다음은 이 명령의 일반적인 형식입니다.

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

이전 [Kubernetes Secrets 예시](#examplereadingakubernetessecretacrossnamespaces)를 생각해 보세요. 여기에서는 시크릿 `Secret:databasesecret`이 `Namespace: database`에 존재하고, 서비스 계정 `ServiceAccount:datadogagent`가 `Namespace: default`에 존재합니다.

이 경우, 다음 명령을 사용합니다.

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

이 명령은 해당 권한이 Agent가 이 시크릿을 조회하는 데 유효한지를 반환합니다.

### 후행 줄 바꿈 {#removetrailinglinebreaks} 제거

일부 시크릿 관리 도구는 파일을 통해 시크릿을 내보낼 때 자동으로 줄 바꿈을 추가합니다. 이러한 줄 바꿈을 제거하려면 [datadog.ymal 구성 파일][8]에 `secret_backend_remove_trailing_line_break: true`를 설정하거나, 특히 컨테이너화된 환경에서는 환경 변수 `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK`를 사용해 같은 작업을 할 수 있습니다.

### 시크릿 핸들의 Autodiscovery 변수

시크릿 핸들에서 [Autodiscovery][1] 변수를 사용할 수도 있습니다. Agent가 시크릿을 확인하기 전에 이러한 변수를 확인합니다. 예:

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/injectdataapplication/distributecredentialssecure/#createapodthathasaccesstothesecretdatathroughavolume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /ko/opentelemetry/setup/ddot_collector/
[7]: /ko/agent/configuration/agentcommands/#restarttheagent
[8]: /ko/agent/configuration/agentconfigurationfiles/
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