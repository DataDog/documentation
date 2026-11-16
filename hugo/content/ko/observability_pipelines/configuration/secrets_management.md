---
description: Worker가 시크릿 관리자에서 시크릿을 검색하도록 설정하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/"
  tag: 문서
  text: Pipelines 설정하기
- link: /observability_pipelines/configuration/install_the_worker"
  tag: 문서
  text: Worker 설치하기
title: 시크릿 관리
---
## 개요 {#overview}

Observability Pipelines Worker는 다음 시크릿 관리 솔루션과 통합되어 시크릿을 안전하게 관리할 수 있도록 지원합니다.

- AWS Secrets Manager
- AWS Systems Manager
- Azure Key Vault
- HashiCorp Vault
- JSON 파일
- YAML 파일

**참고**:
- Kubernetes Secrets를 사용하려면 [Secret의 모든 키-값 쌍을 컨테이너 환경 변수로 구성][6]에 나온 지침에 따라 시크릿을 Observability Pipelines Worker의 환경 변수로 설정합니다.
- 파이프라인을 설정하고 Worker를 설치할 때 시크릿 식별자를 입력한 후 환경 변수 사용을 선택하면 입력한 식별자 앞에 `DD_OP`가 추가된 값이 환경 변수 이름으로 사용됩니다. 예를 들어 암호 식별자로 `PASSWORD_1`를 입력한 경우 해당 암호의 환경 변수는 `DD_OP_PASSWORD_1`입니다.

## 시크릿을 검색하도록 Worker 구성 {#configure-the-worker-to-retrieve-secrets}

{{% collapse-content title="AWS Secrets Manager" level="h3" expanded=false id="aws-secrets-manager" %}}

#### AWS 인스턴스 프로필 설정 {#set-up-an-aws-instance-profile}

Datadog에서는 시크릿을 검색하는 데 [인스턴스 프로필 방법][1]을 사용하도록 권장합니다. AWS가 모든 환경 변수와 세션 프로필을 자동으로 처리하기 때문입니다. 설정 방법은 공식 [AWS Secrets Manager 설명서][2]를 참조하세요.

#### Worker가 AWS Secrets Manager를 사용하도록 구성 {#configure-the-worker-to-use-aws-secrets-manager}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 AWS Secrets Manager를 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```yaml
backend_type: aws
backend_config:
  aws_session:
    aws_region: <region_name>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Worker를 설치][1]하기 전에 Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.config`][2] 섹션에 부트스트랩 구성을 추가합니다.

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

다음 `aws_session` 설정을 사용할 수 있습니다.

| 설정 | 설명 |
| ----- | ----- |
| aws_region | AWS 리전 |
| aws_profile | AWS 세션 프로필 |
| aws_role_arn | AWS sts:AssumeRole ARN |
| aws_external_id | AWS sts:AssumeRole ExternalId |
| aws_access_key_id | AWS IAM 사용자 액세스 키 ID |
| aws_secret_access_key | AWS IAM 사용자 액세스 키 시크릿 |

대부분의 경우 Secrets Manager 시크릿이 호스팅되는 리전에 맞게 `aws_region`을 지정해야 합니다.

단일 문자열을 처리할 때 `force_string: true` 백엔드 구성 설정은 시크릿을 문자열 값으로 강제 변환합니다.

{{% /collapse-content %}}
{{% collapse-content title="AWS Systems Manager" level="h3" expanded=false id="aws-systems-manager" %}}

#### AWS 인스턴스 프로필 설정 {#set-up-an-aws-instance-profile-1}

Datadog에서는 시크릿을 검색하는 데 [인스턴스 프로필 방법][1]을 사용하도록 권장합니다. AWS가 모든 환경 변수와 세션 프로필을 자동으로 처리하기 때문입니다. 설정 방법은 공식 [AWS Systems Manager Parameter Store][4] 설명서를 참조하세요.

#### Worker가 AWS Systems Manager를 사용하도록 구성 {#configure-the-worker-to-use-aws-systems-manager}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 AWS Systems Manager를 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```yaml
secret:
  backend_type: aws_parameter_store
  backend_config:
    aws_session:
      aws_region: <region_name>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Worker를 설치][1]하기 전에 Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.config`][2] 섹션에 부트스트랩 구성을 추가합니다.

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws_parameter_store
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Key Vault" level="h3" expanded=false id="azure-key-vault" %}}

#### Azure 인증 설정 {#set-up-azure-authentication}

Datadog에서는 Azure로 인증하는 데 관리형 ID를 사용하도록 권장합니다. 이렇게 하면 클라우드 리소스를 AMI 계정과 연결할 수 있고 Worker 구성 파일에 민감한 정보를 입력할 필요가 없어집니다.

#### 관리형 ID 생성 {#create-a-managed-identity}

Key Vault에 액세스하려면 관리형 ID를 생성하고 VM에 할당합니다. 그런 다음 Key Vault에 적절한 역할을 할당하여 관리형 ID가 시크릿에 액세스할 수 있도록 합니다.

#### Worker가 Azure Key Vault를 사용하도록 구성 {#configure-the-worker-to-use-azure-key-vault}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 Azure Key Vault를 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```yaml
backend_type: azure
backend_config:
  keyvaulturl: <key_vault_url>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Worker를 설치][1]하기 전에 Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.config`][2] 섹션에 부트스트랩 구성을 추가합니다.

```yaml
bootstrap:
  config:
    secret:
      backend_type: azure
      backend_config:
        keyvaulturl: <key_vault_url>
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="HashiCorp Vault" level="h3" expanded=false id="hashicorp-vault" %}}

#### HashiCorp Vault 설정 {#set-up-hashicorp-vault}

1. HashiCorp Vault를 실행합니다. 자세한 내용은 공식 [HashiCorp Vault 설명서][5]를 참조하세요.
2. 볼트에서 시크릿을 가져올 수 있도록 권한을 부여하는 정책을 작성합니다. `*.hcl` 파일을 생성하고 Secrets Engine 버전 1을 사용하는 경우 다음 권한을 포함합니다.

    ```
    path "<your mount path>/<additional subpath>" {
      capabilities = ["read"]
    }
    ```

   Secrets Engine 버전 2를 사용하는 경우 다음 권한이 필요합니다.

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

3. `vault policy write <policy_name> <path_to_*.hcl_file>`을 실행합니다.
4. 볼트 인증 방식을 선택합니다. AWS 인스턴스 프로필 방식을 사용하는 경우 `vault auth enable aws`를 실행하세요.

#### AWS 연결 머신의 AWS 인스턴스 프로필 설정 {#set-up-an-aws-instance-profile-for-an-aws-connected-machine}

Datadog은 AWS에 연결된 머신에서 HashiCorp Vault를 실행하는 경우 [인스턴스 프로필 방법][1]으로 인증할 것을 권장합니다.

#### Worker가 HashiCorp Vault를 사용하도록 구성 {#configure-the-worker-to-use-hashicorp-vault}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 HashiCorp Vault를 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```yaml
secret:
  backend_type: vault
  backend_config:
    vault_address: http://myvaultaddress.net
    vault_tls_config:
      # ... TLS settings if applicable
    vault_session:
      vault_auth_type: aws
      # ... additional session settings
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
[Worker를 설치][1]하기 전에 Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.config`][2] 섹션에 부트스트랩 구성을 추가합니다.

```yaml
bootstrap:
  config:
    secret:
      backend_type: vault
      backend_config:
        vault_address: http://myvaultaddress.net
        vault_tls_config:
          # ... TLS settings if applicable
        vault_session:
          vault_auth_type: aws
          # ... additional session settings
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="JSON 파일" level="h3" expanded=false id="json-file" %}}

#### 필수 파일 권한 {#file-permissions-required}

파일 백엔드는 구성된 JSON 파일에 대한 **읽기** 권한만 필요합니다. 로컬 Worker 사용자에게 이러한 권한을 부여해야 합니다.

#### JSON 파일 시크릿 백엔드를 사용하도록 Worker 구성 {#configure-the-worker-to-use-a-json-file-secret-backend}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 JSON 파일을 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```yaml
secret:
  backend_type: json
  backend_config:
    file_path: /path/to/json/file.json
```

#### JSON 시크릿 파일 생성 {#create-a-json-secrets-file}

식별자와 해당 시크릿 값을 저장할 `/path/to/json/file.json` 파일을 생성합니다.

```json
{
  "us1_api": "<api_key>",
  "secret_identifier1": "<secret1>"
}
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/


{{% /tab %}}
{{% tab "Kubernetes" %}}
`secretFileContents`를 구성할 때 파일을 전달할 수는 없지만, Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.secretFileContents`][1] 섹션에 시크릿과 식별자 매핑을 추가할 수 있습니다.

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="YAML 파일" level="h3" expanded=false id="yaml-file" %}}

#### 필수 파일 권한 {#file-permissions-required-1}

파일 백엔드는 구성된 YAML 파일에 대한 **읽기** 권한만 필요합니다. 로컬 Worker 사용자에게 이러한 권한을 부여해야 합니다.

#### YAML 파일 시크릿 백엔드를 사용하도록 Worker 구성 {#configure-the-worker-to-use-a-yaml-file-secret-backend}

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
[Worker를 설치][1]한 후 YAML 파일을 사용하여 시크릿을 확인하도록 Worker의 [부트스트랩 파일][2]을 다음과 같이 구성합니다.

```
secret:
  backend_type: yaml
  backend_config:
    file_path: /path/to/yaml/file.yaml
```

#### YAML 시크릿 파일 생성 {#create-a-yaml-secrets-file}

식별자와 해당 시크릿 값을 저장할 `/path/to/yaml/file.yaml` 파일을 생성합니다.

```
# /path/to/yaml/file.yaml

us1_api: "<api_key>"
secret_identifier1: "<secret1>"
```

[1]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}

`secretFileContents`를 구성할 때 파일을 전달할 수는 없지만, Helm 차트 `values.yaml` 파일의 [`datadog.bootstrap.secretFileContents`][1] 섹션에 시크릿과 식별자 매핑을 추가할 수 있습니다.

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 런타임에 시크릿 새로 고침 {#refresh-secrets-at-runtime}

Observability Pipelines Worker는 시작 시와 구성이 다시 로드될 때 시크릿을 확인합니다. Worker를 재시작하지 않고 교체된 시크릿 값을 반영하려면 `SIGHUP` 신호를 보냅니다.

**참고**: 교체된 시크릿의 값이 유효하지 않으면 다시 로드하는 데 실패합니다. Datadog은 Worker 또는 노드를 한 번에 하나씩 순차적으로 다시 로드하고, 다음 단계로 진행하기 전에 Worker 상태를 검증할 것을 권장합니다.

{{< tabs >}}
{{% tab "Docker 또는 Linux" %}}
Worker 프로세스에 `SIGHUP`을 보냅니다.

```shell
kill -HUP <worker_pid>
```

{{% /tab %}}
{{% tab "Kubernetes" %}}
각 포드 내부의 Worker 프로세스에 `SIGHUP`을 보냅니다.

```shell
kubectl exec <pod_name> -- kill -HUP 1
```

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[2]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[3]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[4]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[5]: https://developer.hashicorp.com/
[6]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#configure-all-key-value-pairs-in-a-secret-as-container-environment-variables