---
aliases:
- /ko/integrations/oracle_cloud_infrastructure
app_id: oracle-cloud-infrastructure
categories:
- cloud
- log collection
- network
- oracle
custom_kind: integration
description: OCI는 호스팅된 환경에서 다양한 애플리케이션을 지원하도록 설계된 클라우드 서비스 모음입니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: 블로그
  text: Datadog으로 Oracle 클라우드 인프라 모니터링하기
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: 블로그
  text: Datadog OCI 빠른 시작을 사용하여 Oracle 클라우드 인프라 모니터링 속도를 높이세요
integration_version: 1.1.1
media: []
title: Oracle 클라우드 인프라
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

Oracle 클라우드 인프라(OCI)는 엔터프라이즈 규모의 기업이 사용하는 서비스 제공 인프라(IaaS) 및 플랫폼 기반 서비스(PaaS)입니다. 여기에는 호스팅, 스토리지, 네트워킹, 데이터베이스 등을 위한 30가지 이상의 관리형 서비스가 포함되어 있습니다.

Datadog의 OCI 통합을 사용하여 메트릭, 로그 및 리소스 데이터를 통해 OCI 환경에 대한 완전한 가시성을 확보하세요. 이 데이터를 통해 대시보드를 구동하고 문제 해결과 관련한 도움을 받을 수 있으며 데이터를 모니터링하여 보안 및 규정 준수 상태를 관리할 수 있습니다.

## 설정 {#setup}

Datadog은 빠른 시작 설정 방법을 사용할 것을 권장합니다. 필요한 경우 [Terraform](#oci-terraform-setup)을 사용하여 통합을 설정할 수도 있습니다.

### 데이터 수집 {#data-collection}

#### 고려 사항 {#considerations}

- 로그, 메트릭, 리소스 데이터 및 이벤트 수집은 기본적으로 활성화되어 있습니다. 설정 중 로그 또는 이벤트 수집을 중지할 수 있습니다. 설정을 완료한 후 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 리소스 데이터 수집, 이벤트 수집 및 개별 로그 또는 메트릭 서비스를 수정할 수 있습니다.
- 2026년 1월 1일을 기준으로 존재하는 모든 OCI 상업용 리전(OC1 영역)이 지원됩니다. 이 날짜 이후에 추가된 OCI 리전은 지원되지 않습니다.
- Datadog OCI 통합은 테넌시당 하나의 통합으로 제한됩니다. 2025년 6월 이전에 통합을 설정했다면 수동 설정을 따른 것입니다. 그 결과로 생성된 모든 Datadog OCI 통합 배포 스택은 OCI 빠른 시작 설정 방법을 사용하기 전에 삭제해야 합니다. 로그 포워딩을 수동으로 구성했고 OCI 빠른 시작 타일에서 로그 수집을 활성화하기로 선택한 경우 로그가 두 번 전송되지 않도록 기존 로그 포워딩 리소스도 삭제해야 합니다. 자세한 내용은 이 페이지의 [빠른 시작 마이그레이션 매뉴얼 섹션](#oci-integration-manual-to-quickstart-migration)을 참조하세요.

{{% collapse-content title="빠른 시작(권장)" level="h4" %}}

Datadog의 OCI 빠른 시작은 몇 번의 클릭만으로 OCI 인프라 및 애플리케이션을 모니터링할 수 있도록 지원하는 완전 관리형 단일 흐름 설정 경험입니다. OCI 빠른 시작은 메트릭, 로그 및 리소스 데이터를 Datadog으로 포워딩하는 데 필요한 인프라를 생성하며, 데이터 수집을 위해 새로운 리소스나 OCI 컴파트먼트를 자동으로 검색합니다.

#### 다음과 같은 경우 빠른 시작 설정을 선택하세요. {#choose-quickstart-setup-if}

- OCI 통합을 처음 설정하는 경우
- UI 기반 워크플로를 선호하며, 필요한 리소스를 생성하고 구성하는 데 걸리는 시간을 최소화하려는 경우
- 스크립트나 CI/CD 파이프라인에서 설정 단계를 자동화하려는 경우

#### 빠른 시작 설정 전제 조건 {#quickstart-setup-prerequisites}

- 다음 단계를 완료하려면 OCI 사용자 계정에 **Identity Domain Administrator** 역할이 필요합니다.
- 통합하려는 테넌시의 OCI에 로그인되어 있어야 합니다.
- 화면 오른쪽 상단에서 '홈 리전'이 선택된 상태로 OCI에 로그인되어 있어야 합니다.
- 로그인된 ID 도메인 또는 대상 도메인(지정된 경우)에서 OCI 사용자 계정이 사용자, 사용자 그룹 및 동적 그룹을 생성할 수 있어야 합니다. 대상 도메인 OCID를 제공하는 경우, OCI 사용자 계정에 해당 도메인에 대한 관리자 권한이 있어야 합니다.
- OCI 사용자 계정이 루트 컴파트먼트에서 정책을 생성할 수 있어야 합니다.

#### 빠른 시작 설정 지침 {#quickstart-setup-instructions}

Datadog에 대한 메트릭 및 로그 포워딩용 인프라를 설정하려면 다음 단계를 따르세요.

- [Datadog OCI 통합 타일 구성](#configure-the-datadog-oci-integration-tile)
- [빠른 시작 ORM 스택 배포](#deploy-the-quickstart-orm-stack)
- [Datadog에서 설정 완료](#complete-the-setup-in-datadog)
- [메트릭 흐름 확인](#validation)
- [메트릭 또는 로그 수집 구성(선택 사항)](#configuration)
- [리소스 수집 구성(선택 사항)](#resource-collection)

이 통합에서는 Oracle Service Connector Hubs를 사용하여 Datadog으로 데이터를 포워딩해야 합니다. 설정을 완료하기 전에 [서비스 제한 상향 조정을 요청](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti)하는 것이 좋습니다. 필요한 Service Connector Hubs의 대략적인 수는 다음과 같습니다.

$$\\text"Service Connector Hubs" = \\text"테넌시의 컴파트먼트 수" / \\text"5"$$

##### Datadog OCI 통합 타일 구성 {#configure-the-datadog-oci-integration-tile}

1. [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)로 이동하고 **Add New Tenancy**를 클릭합니다.

1. 통합에 사용할 Datadog API 키를 선택하거나 생성합니다.

1. Datadog 애플리케이션 키를 생성합니다.

1. 토글을 사용하여 로그를 활성화하거나 비활성화합니다.

1. 토글을 사용하여 이벤트 수집을 활성화하거나 비활성화합니다.

1. **Create OCI Stack**을 클릭합니다. 이렇게 하면 배포를 완료할 수 있도록 ORM(Oracle Resource Manager) 스택으로 이동합니다.<br />
   **참고**: 이 스택은 테넌시당 한 번만 배포하세요.

##### 빠른 시작 ORM 스택 배포 {#deploy-the-quickstart-orm-stack}

1. Oracle 이용 약관에 동의합니다.

1. 사용자 지정 Terraform 공급자 사용 옵션을 선택되지 않은 상태로 둡니다.

1. 기본 작업 디렉터리를 사용하여 스택을 배포하거나 선택적으로 다른 디렉터리를 선택합니다.

1. **Next**를 클릭합니다.

1. Datadog은 이 테넌시의 각 리전에 새로운 가상 클라우드 네트워크(VCN) 및 서브넷을 생성하기 위해 `(Optional) Choose specific subnet(s)` 섹션을 비워둘 것을 권장합니다.

   **선택적으로** Datadog 빠른 시작 스택에 대해 기존 서브넷(OCI 리전당 최대 하나)을 선택할 수 있으며, 이 경우 스택에 서브넷 OCID를 제공해야 합니다. 쉼표 없이 한 줄에 하나의 OCID를 입력하세요. 그러면 Datadog 빠른 시작 스택이 각 서브넷에 해당하는 리전에 배포됩니다. 각 서브넷 OCID는 `ocid1.subnet.oc[0-9].*` 형식이어야 합니다. 예: `ocid1.subnet.oc1.iad.abcedfgh`.<br />
   **참고**: 기존 VCN 및 서브넷을 사용하는 경우 각 리전의 VCN이 다음과 같은지 확인하세요.

   - NAT 게이트웨이를 통해 HTTP 송신 호출을 실행할 수 있습니다.
   - 'Oracle Services Network의 모든 서비스'를 지원하는 서비스 게이트웨이가 있습니다.
   - NAT 게이트웨이 및 서비스 게이트웨이를 허용하는 라우팅 테이블 규칙이 있습니다.
   - HTTP 요청을 전송하는 보안 규칙이 있습니다.

1. Datadog은 새로운 사용자 및 그룹을 생성하기 위해 `(Optional) Choose a User` 섹션을 비워둘 것을 권장합니다. 그룹 및 사용자는 현재 로그인되어 있는 OCI ID 도메인(기본 도메인일 필요 없음)에 생성됩니다.<br />
   **선택적으로** Datadog 빠른 시작 스택에 대해 기존 사용자 및 그룹을 선택할 수 있습니다. 이 경우 Datadog은 사용자 및 그룹의 도메인을 자동으로 유추하고 이를 동적 그룹 생성에 사용합니다.<br />
   a. **Group ID**: Datadog 인증을 위한 기존 OCI 그룹의 OCID를 제공합니다. 제공할 경우 **User ID**를 비워둘 수 없습니다.<br />
   b. **User ID**: Datadog 인증을 위한 기존 OCI 사용자의 OCID를 제공합니다. 사용자는 지정된 그룹의 구성원이어야 합니다. 제공할 경우 **Group ID**를 비워둘 수 없습니다.

1. Datadog은 이러한 사용 사례가 흔하지 않으므로 `(Optional) Advanced configuration` 섹션을 비워둘 것을 권장합니다.<br />
   **선택적으로** Datadog 빠른 시작 스택에 대해 기존 컴파트먼트 및 도메인을 선택할 수 있습니다.<br />
   a. **Compartment**: Datadog에 의해 생성된 모든 리소스를 배치할 기존 컴파트먼트를 선택합니다.<br />
   b. **Domain**: 사용자 및 그룹이 생성되는 위치를 재정의하기 위한 기존 ID 도메인의 OCID를 제공합니다. 이 필드는 6단계에서 기존 사용자 및 그룹을 지정하지 않은 경우에만 표시됩니다. 제공할 경우 **User Email**을 비워둘 수 없습니다. **참고**: 대상 도메인에서 OCI 사용자 계정에 **Identity Domain Administrator** 역할이 있어야 합니다.<br />
   c. **Resource tags**: Datadog 빠른 시작 스택에 의해 배포되는 모든 OCI 리소스에 추가할 정의된 태그의 목록을 제공합니다. 한 줄에 하나의 태그를 입력하세요. 쉼표를 추가해서는 안 됩니다. 각 정의된 태그는 `namespace.key:value` 형식이어야 합니다. 예: `CostCenter.Environment:prod`. 비워두면 Datadog 빠른 시작 스택에 의해 배포되는 OCI 리소스에 정의된 태그가 추가되지 않습니다.<br />

1. **Next**를 클릭합니다.

1. **Create**를 클릭하고 배포가 완료될 때까지 최대 30분을 기다립니다.

##### Datadog에서 설정 완료 {#complete-the-setup-in-datadog}

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)로 돌아가 **Ready!**를 클릭합니다.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="oci-terraform-setup" %}}

#### 다음과 같은 경우 Terraform 설정을 선택하세요. {#choose-terraform-setup-if}

- 코드형 인프라를 관리하고 Datadog OCI 통합에 대한 버전 관리를 유지하려는 경우
- 재사용 가능한 공급자 블록으로 여러 폴더 또는 프로젝트를 일관되게 구성해야 하는 경우
- Terraform 관리 환경에 적합한 반복 가능하고 감사 가능한 배포 프로세스를 원하는 경우

Terraform을 사용하여 Datadog OCI 통합을 프로비저닝할 수 있습니다. 이 가이드에는 전제 조건, 필수 변수, 정확한 초기화, 계획, 적용 단계가 나와 있습니다.

#### Terraform 설정 전제 조건 {#terraform-setup-prerequisites}

시작하기 전에 다음을 준비하세요.

- Terraform 1.x를 설치합니다.
- 유효한 [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys)를 받습니다.
- 대상 도메인에서 OCI에 Identity Domain Administrator 역할을 할당합니다.

#### Terraform 설정 지침 {#terraform-setup-instructions}

Datadog에 대한 메트릭 및 로그 포워딩용 인프라를 설정하려면 다음 단계를 따르세요.

- [OCI 구성 파일 생성](#create-an-oci-configuration-file)
- [Terraform 모듈 구성](#configure-the-terraform-module)
- [Terraform으로 배포](#deploy-with-terraform)
- [메트릭 흐름 확인](#validation)
- [메트릭 또는 로그 수집 구성(선택 사항)](#configuration)
- [리소스 수집 구성(선택 사항)](#resource-collection)

##### OCI 구성 파일 생성{#create-an-oci-configuration-file}

`~/.oci/config` 파일은 OCI에서 리소스를 생성할 수 있는 권한을 Terraform에 부여합니다. [API 키를 생성](https://cloud.oracle.com/identity/domains/my-profile/auth-tokens)하여 구성에 추가하거나 [Oracle 문서](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm)를 따르세요. 파일은 다음과 같아야 합니다.

```ini
[DEFAULT]
user=<USER_OCID>
fingerprint=<USER_FINGERPRINT>
tenancy=<TENANCY_OCID>
region=<HOME_REGION>
key_file=<PATH_TO_PRIVATE_KEY_FILE>
```

##### Terraform 모듈 구성{#configure-the-terraform-module}

다음 입력은 Datadog OCI 통합 모듈을 구성합니다. 필수 필드는 표시되어 있습니다. 사용 가능한 전체 구성 옵션 목록은 [테넌시 추가 페이지](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure/add)를 참조하세요.

###### 1. Datadog API 키를 추가합니다. {#1-add-a-datadog-api-key}

**Select API Key**를 클릭하고 사용할 API 키를 선택합니다.

###### 2. Datadog 애플리케이션 키를 생성합니다. {#2-create-a-datadog-application-key}

**Create**를 클릭하면 애플리케이션 키가 생성되어 필드에 추가됩니다. 이 값을 복사하여 안전한 위치에 저장하세요. 이 화면을 나간 후 값에 다시 액세스할 수 없습니다.

###### 3. OCI 테넌시 OCID를 추가합니다. {#3-add-your-oci-tenancy-ocid}

1. Datadog을 통해 모니터링할 테넌시의 OCID를 입력합니다. [cloud.oracle.com/tenancy](https://cloud.oracle.com/tenancy)에서 찾을 수 있습니다.
1. 선택적으로 특정 OCI 컴파트먼트 및 서브넷을 선택합니다. Datadog은 테넌시의 각 리전에 새로운 OCI 컴파트먼트 및 OCI 가상 클라우드 네트워크(VCN)를 생성하기 위해 이 섹션을 비워둘 것을 권장합니다.

###### 4. OCI 사용자 OCID를 추가합니다. {#4-add-your-oci-user-ocid}

사용자 OCID를 입력합니다. 이 사용자에게는 Identity Domain Administrator 역할이 있어야 합니다. [cloud.oracle.com/identity/domains/my-profile](https://cloud.oracle.com/identity/domains/my-profile)에서 찾을 수 있습니다.

###### 5. 로그 수집을 구성합니다(선택 사항). {#5-configure-log-collection-optional}

테넌시에서 모든 로그 수집을 비활성화하려면 토글을 클릭합니다. 특정 OCI 서비스에 대한 로그 수집을 비활성화하려면 설정 후 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 구성을 편집하세요.

###### 6. 이벤트 수집을 구성합니다(선택 사항). {#6-configure-event-collection-optional}

테넌시에서 모든 이벤트 수집을 비활성화하려면 토글을 클릭합니다. 설정 후 이벤트 수집을 비활성화하려면 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 구성을 편집하세요.

###### 7. 생성된 Terraform 모듈의 구성 세부 정보를 확인합니다. {#7-confirm-the-configuration-details-of-the-generated-terraform-module}

생성된 Terraform 모듈은 아래에 표시된 형식을 따라야 합니다.

```hcl
module "datadog_oci" {
  source = "github.com/DataDog/oracle-cloud-integration//datadog-terraform-onboarding"

  datadog_api_key = <API_KEY>
  datadog_app_key = <APP_KEY>
  datadog_site    = <DATADOG_SITE>

  tenancy_ocid      = "<TENANCY_OCID>"
  current_user_ocid = "<CURRENT_USER_OCID>"

  logs_enabled              = true
  events_collection_enabled = true
}
```

#### Terraform으로 배포 {#deploy-with-terraform}

1. 생성된 Terraform 모듈을 복사하여 `.tf` 파일에 붙여넣습니다.
1. `terraform init && terraform apply`를 실행하여 Terraform을 초기화하고 통합을 생성합니다. 변경 사항을 미리 보려면 `apply`를 `plan`으로 대체하세요.

#### 문제 해결 {#troubleshooting}

##### 시간 초과 {#timeouts}

구성을 변경하지 않고 Terraform 명령을 다시 실행하세요.

##### 공급자 충돌 {#provider-conflicts}

`terraform init` 명령에서 공급자 충돌이 발생하면 모듈의 필수 버전과 일치하도록 로컬 공급자 구성을 업데이트하세요.

##### 설정 직후 Datadog의 경고 {#warnings-in-datadog-immediately-after-setup}

경고가 사라질 때까지 최대 15분을 기다리세요.

{{% /collapse-content %}}

#### 유효성 검사 {#validation}

Datadog의 [OCI 통합 개요 대시보드](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) 또는 [Metrics Explorer 페이지](https://app.datadoghq.com/metric/explorer)에서 `oci.*` 메트릭을 조회하세요.

<div class="alert alert-warning">OCI 함수 메트릭(<code>oci.faas</code> 네임스페이스) 및 컨테이너 인스턴스 메트릭(<code>oci_computecontainerinstance</code> 네임스페이스)은 미리 보기 버전입니다.</div>

### 구성 {#configuration}

![Datadog 내 OCI 테넌시의 구성 탭](images/oci_configuration_tab_2026-02-25.png)

설정을 완료하면 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) 왼쪽에 테넌시용 구성 탭이 표시됩니다. 아래 섹션에 설명된 대로 테넌시 전체 데이터 수집 구성을 적용하세요.

#### 리전 추가 {#add-regions}

**General** 탭에서 **Regions** 확인란 목록을 통해 데이터 수집을 위한 리전을 선택하세요. 선택한 리전은 메트릭과 로그 모두에 대해 전체 테넌시에 적용됩니다.

**참고**: 빠른 시작 설정 방법을 사용한 후 새로운 OCI 리전을 구독한 경우, ORM에서 초기 설정 스택을 다시 적용하세요. 그러면 새로운 리전을 Datadog OCI 타일에서 사용할 수 있게 됩니다.

#### 메트릭 및 로그 수집 {#metric-and-log-collection}

**Metric Collection** 및 **Log Collection** 탭을 사용하여 Datadog으로 전송할 메트릭과 로그를 구성하세요.

##### 테넌시에서 모든 메트릭 또는 로그 수집 활성화 또는 비활성화 {#enable-or-disable-all-metric-or-log-collection-from-a-tenancy}

Metric Collection 및 Log Collection 탭 모두에 전체 테넌시에 대해 해당 데이터 유형의 수집을 비활성화하는 데 사용할 수 있는 기본 토글이 있습니다. 테넌시에 대해 특정 데이터 유형을 수집하는 경우, 아래 섹션을 사용하여 [서비스](#limit-metric-or-log-collection-to-specific-oci-services), [컴파트먼트](#limit-metric-or-log-collection-by-compartment) 및 [특정 리소스](#limit-metric-or-log-collection-to-specific-resources)별로 세분화된 필터링을 구현할 수 있습니다.

**참고**: 필터는 순서대로 평가됩니다. 즉, **Selected Services**가 서비스에서의 데이터 수집을 위한 기본 토글 역할을 하며, 그 다음으로 컴파트먼트 태그 필터가 적용되고, 마지막으로 리소스 태그 필터가 적용됩니다.

##### 특정 OCI 서비스로 메트릭 또는 로그 수집 제한 {#limit-metric-or-log-collection-to-specific-oci-services}

**Selected Services** 섹션을 사용하여 개별 OCI 서비스에서의 수집을 활성화하거나 비활성화하세요. 서비스를 비활성화하면 해당 서비스에 대해 구성된 리소스 태그 필터와 관계없이 서비스에서의 모든 수집이 중단됩니다. 서비스가 활성화되면 리소스 태그 필터를 통해 해당 서비스 내의 특정 리소스로 수집 범위를 더 좁힐 수 있습니다. 일치하는 포함 태그가 없는 리소스는 제외됩니다.

**참고**: OCI에서 태그를 수정한 후 변경 사항이 Datadog에 나타나기까지 최대 15분이 소요될 수 있습니다. 서비스 토글 변경 사항이 적용되기까지는 최대 5분이 소요될 수 있습니다.

{{% collapse-content title="태그 필터 구문" level="h6" id="tag-filter-syntax" %}}

**Compartment Tags** 및 **Limit Collection to Specific Resources** 섹션 모두 쉼표로 구분된 `key:value` OCI 태그를 허용합니다. 태그 앞에 `!`를 추가하면 태그가 무효화됩니다. 쉼표 구분 기호는 사용되는 태그 유형에 따라 다르게 동작합니다.

- **긍정 태그만**: OR 로직 - OCI 객체(컴파트먼트 또는 특정 리소스)에 나열된 태그 중 **하나라도** 있으면 포함됩니다.
- **부정 태그만**(앞에 `!`가 추가됨): OR 로직 - 무효화된 태그 중 **하나라도** 있으면 제외됩니다.
- **긍정 및 부정 태그 혼합**: AND 로직 - 포함되려면 나열된 **모든** 조건을 충족해야 합니다.

예를 들면 다음과 같습니다.

- `datadog:monitored,env:prod*`: 태그 중 **하나라도** 있으면 포함합니다.
- `!env:staging,!testing:true`: 태그 중 **하나라도** 있으면 제외합니다.
- `datadog:monitored,!region:us-phoenix-1`: `datadog:monitored` 태그가 있는 **동시에** `region:us-phoenix-1` 태그가 없는 경우에만 포함합니다.

**태그 키 형식**: Datadog은 일치 여부를 확인하기 전에 OCI 태그 키를 소문자 `snake_case`로 정규화합니다. camelCase 또는 PascalCase를 사용하여 OCI에 설정된 키(예: `deploymentType` 또는 `DeploymentType`)는 소문자 snake_case 형식(`deployment_type`)으로 저장되고 일치 여부가 확인됩니다. 통합 타일에서 태그 필터를 지정할 때는 소문자 `snake_case`를 사용하세요.

{{% /collapse-content %}}

##### 컴파트먼트별로 메트릭 또는 로그 수집 제한 {#limit-metric-or-log-collection-by-compartment}

**Compartment Tags** 섹션을 사용하여 OCI 컴파트먼트 태그를 바탕으로 특정 컴파트먼트를 포함하거나 제외할 수 있습니다. 구문 참조는 [태그 필터 구문](#tag-filter-syntax)을 참조하세요.

**참고**: OCI에서 태그는 하위 컴파트먼트로 상속되지 않으므로 각 컴파트먼트에 개별적으로 태그를 지정해야 합니다.

##### 특정 리소스로 메트릭 또는 로그 수집 제한 {#limit-metric-or-log-collection-to-specific-resources}

**Limit Collection to Specific Resources** 섹션을 사용하여 메트릭 또는 로그를 Datadog으로 전송해야 하는 리소스를 정의할 수 있습니다. 드롭다운에서 OCI 서비스를 선택한 다음 데이터 수집 대상으로 정할 리소스 태그를 지정하면 됩니다. 구문 참조는 [태그 필터 구문](#tag-filter-syntax)을 참조하세요.

{{% collapse-content title="메트릭 네임스페이스 전체 목록 보기" level="h4" id="oci-metric-namespaces" %}}

| 통합                         | 메트릭 네임스페이스                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/ko/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/ko/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/ko/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Cloud Events](https://docs.datadoghq.com/ko/integrations/oci_cloudevents/)                       | [oci_cloudevents](https://docs.oracle.com/en-us/iaas/Content/Events/Reference/eventsmetrics.htm)                                                                                                                   |
| [Compute](https://docs.datadoghq.com/ko/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances(미리 보기)](https://docs.datadoghq.com/ko/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/ko/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/ko/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite(EBS)](https://docs.datadoghq.com/ko/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/ko/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/ko/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions(미리 보기)](https://docs.datadoghq.com/ko/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/ko/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/ko/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/ko/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Instance Pools](https://docs.datadoghq.com/ko/integrations/oci-instancepools/)                | [oci_instancepools](https://docs.oracle.com/en-us/iaas/Content/Compute/References/instancepoolmetrics.htm)                                                                                                                 |
| [Internet Gateway](https://docs.datadoghq.com/ko/integrations/oci-internet-gateway/)                | [oci_internet_gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Reference/IGWmetrics.htm)                                                                                                                 |
| [Kafka](https://docs.datadoghq.com/ko/integrations/oci-kafka/)                          | [oci_kafka](https://docs.oracle.com/en-us/iaas/Content/kafka/metrics.htm)                                                                                                                          |
| [Kubernetes Engine](https://docs.datadoghq.com/ko/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/ko/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/ko/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/ko/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/ko/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [NoSQL Table](https://docs.datadoghq.com/ko/integrations/oci-nosqltable/)                        | [oci_nosql](https://docs.oracle.com/en/cloud/paas/nosql-cloud/mgygg)                                                                                                                         |
| [Object Storage](https://docs.datadoghq.com/ko/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [Oracle Fusion](https://docs.datadoghq.com/ko/integrations/oracle-fusion/)                      | [oci_fusion](https://docs.oracle.com/en-us/iaas/Content/fusion-applications/metrics.htm)                                                                                                                        |
| [Oracle Integration(OIC)](https://docs.datadoghq.com/ko/integrations/oci-integration/)                | [oci_integration](https://docs.oracle.com/en-us/iaas/application-integration/doc/modify-charts-and-create-custom-charts.html)                                                                                                                 |
| [PostgreSQL](https://docs.datadoghq.com/ko/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/ko/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Recovery Service](https://docs.datadoghq.com/ko/integrations/oci-recovery-service/)                   | [oci_recovery_service](https://docs.oracle.com/iaas/recovery-service/doc/available-recovery-service-metrics.html)                                                                                                              |
| [Secrets](https://docs.datadoghq.com/ko/integrations/oci-secrets/)                            | [oci_secrets](https://docs.oracle.com/iaas/Content/KeyManagement/Reference/keymgmtmetrics.htm)                                                                                                                       |
| [Service Connector Hub](https://docs.datadoghq.com/ko/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/ko/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [Stack Monitoring](https://docs.datadoghq.com/ko/integrations/oci-stack-monitoring/)                  | [oci_stack_monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                                 |
| [VCN](https://docs.datadoghq.com/ko/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [Visual Builder](https://docs.datadoghq.com/ko/integrations/oci_visual_builder/)               | [oci_visual_builder](https://docs.oracle.com/en-us/iaas/visual-builder/doc/view-instance-metrics.html)                                                                                                                |
| [VPN](https://docs.datadoghq.com/ko/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/ko/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### 리소스 수집 {#resource-collection}

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)의 **Resource Collection** 탭에서 **Enable Resource Collection** 토글을 클릭합니다. 리소스는 [Datadog Resource Catalog](https://docs.datadoghq.com/ko/infrastructure/resource_catalog/)에서 확인할 수 있습니다.

통합을 설정하면 이벤트 수집이 기본적으로 활성화됩니다. Datadog 이벤트 수집을 사용할 수 있게 되기 전에 OCI 통합을 설정한 경우, **Resource Collection** 탭에서 **Enable Resource Changes Collection** 토글을 클릭합니다. 이 토글은 리소스 변경 이벤트뿐만 아니라 모든 OCI 이벤트의 수집을 제어합니다. OCI 이벤트는 [Events Explorer](/event/explorer?query=source%3Aoci_events_service)에 표시되며 `source:oci_events_service`로 필터링할 수 있습니다.

## 통합 업데이트 {#update-the-integration}

Datadog이 새로운 OCI 리소스나 IAM 정책이 필요한 버그 수정, 보안 패치 또는 새로운 기능을 출시할 때 통합 배포를 다시 적용하여 업데이트된 인프라를 프로비저닝하세요.

**참고**: ORM 스택 또는 Terraform 구성의 `logs_enabled` 및 `events_collection_enabled` 변수는 초기 설정 중에만 사용됩니다. 후속 적용 시에는 이러한 값이 무시됩니다. Datadog 통합 타일은 데이터 수집 구성을 위한 정보 소스입니다. 스택을 다시 적용해도 Datadog에서 구성한 로그, 메트릭 또는 이벤트 수집 설정이 재정의되지 않습니다.

{{% collapse-content title="빠른 시작(ORM 스택)" level="h3" %}}

**전제 조건**: 업데이트를 적용하기 전에 OCI 스택에 구성된 [Datadog 애플리케이션 키](https://app.datadoghq.com/organization-settings/application-keys)가 여전히 유효한지 확인하세요. 키가 만료되었거나 취소된 경우, 제거 작업이 실패합니다. 키를 업데이트하려면 OCI 콘솔에서 스택 변수 `datadog_app_key`를 편집하고 계속 진행하기 전에 유효한 애플리케이션 키를 제공하세요.

[OCI Cloud Shell](https://cloud.oracle.com/resourcemanager/stacks?cloudshell=true)에서 다음 명령을 실행하여 스택을 최신 버전으로 업데이트하고 변경 사항을 적용합니다.

```shell
curl -fL -o datadog-integration.zip \
  "https://github.com/DataDog/oracle-cloud-integration/releases/latest/download/datadog-integration.zip"

export STACK_ID="<YOUR_STACK_OCID>"
export OCI_CLI_REGION="<YOUR_HOME_OR_STACK_REGION>"

oci resource-manager stack update \
  --stack-id "$STACK_ID" \
  --config-source datadog-integration.zip \
  --region "$OCI_CLI_REGION" \
  --force

oci resource-manager job create-apply-job \
  --stack-id "$STACK_ID" \
  --execution-plan-strategy AUTO_APPROVED \
  --region "$OCI_CLI_REGION" \
  --wait-for-state SUCCEEDED
```

자리 표시자 값을 다음과 같이 바꾸세요.

- `<YOUR_STACK_OCID>`: Datadog ORM 스택의 OCID. [cloud.oracle.com/resourcemanager/stacks](https://cloud.oracle.com/resourcemanager/stacks)에서 찾을 수 있습니다.
- `<YOUR_HOME_OR_STACK_REGION>`: 테넌시의 홈 리전(예: us-ashburn-1)

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**전제 조건**: Terraform을 다시 적용하기 전에 Terraform 구성의 `datadog_app_key` 변수에 유효한 [Datadog 애플리케이션 키](https://app.datadoghq.com/organization-settings/application-keys)가 포함되어 있는지 확인하세요. 키가 만료되었거나 취소된 경우, 제거 명령이 실패합니다. 계속 진행하기 전에 `.tf` 파일에서 또는 `terraform.tfvars` 파일을 통해 값을 업데이트하세요.

Terraform을 다시 실행하여 업데이트된 모듈을 초기화하고 최신 변경 사항을 적용합니다.

```shell
terraform init -upgrade && terraform apply
```

선택적으로, `apply` 전에 `terraform plan`을 실행하여 변경 사항을 미리 봅니다.

{{% /collapse-content %}}

## 통합 제거 {#uninstalling-the-integration}

Datadog OCI 통합을 제거하려면 Datadog과 OCI 모두에서 통합 리소스를 삭제하세요.

### Datadog {#in-datadog}

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 **Delete Configuration**을 클릭합니다. 이 시점부터 메트릭과 로그는 더 이상 수집되지 않습니다.

![Datadog에서 OCI 통합 구성 삭제](images/oci_delete_configuration_2025-11-17.png)

### OCI {#in-oci}

**전제 조건**: OCI 리소스를 정리하기 전에 위의 [Datadog](#in-datadog) 단계를 완료하세요. Datadog 구성을 먼저 삭제하면 Datadog 백엔드 관리형 리소스가 먼저 제거됩니다.

{{% collapse-content title="빠른 시작(ORM 스택)" level="h3" %}}

**전제 조건**: 제거 작업을 실행하기 전에 OCI 스택에 구성된 Datadog 애플리케이션 키가 여전히 유효한지 확인하세요. 키가 만료되었거나 취소된 경우, 제거 작업이 실패합니다. 키를 업데이트하려면 OCI 콘솔에서 스택 변수를 편집하고 계속 진행하기 전에 유효한 애플리케이션 키를 제공하세요.

1. OCI 콘솔에서 ORM(Oracle Resource Manager)으로 이동합니다.

1. 설치 중 생성된 Datadog 빠른 시작 스택을 찾습니다. 기본적으로 이 스택에는 `datadog-integration.zip-<NUMBER>` 레이블이 지정되지만 배포 중 사용자 지정 이름으로 구성되었을 수 있습니다.

1. 스택에서 `Destroy` 작업을 실행하여 모든 리전에서 통합에 의해 생성된 모든 리소스를 제거합니다.

   ![OCI에서 Datadog 통합 스택 제거](images/oci_destroy_stack.png)

1. **선택적으로**, 제거가 완료된 후 Datadog OCI 스택을 삭제합니다.

**참고**: 빠른 시작 스택에서 제거 작업을 한 번 실행하면 통합이 배포된 모든 리전의 모든 리소스가 자동으로 정리됩니다.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**전제 조건**: 제거 명령을 실행하기 전에 Terraform 구성의 `datadog_app_key` 변수에 유효한 [Datadog 애플리케이션 키](https://app.datadoghq.com/organization-settings/application-keys)가 포함되어 있는지 확인하세요. 키가 만료되었거나 취소된 경우, 제거 명령이 실패합니다. 계속 진행하기 전에 `.tf` 파일에서 또는 `terraform.tfvars` 파일을 통해 값을 업데이트하세요.

`~/.oci/config`의 `DEFAULT` 프로필에 해당 테넌시의 리소스를 관리하기 위한 사용자 자격 증명이 있는지 확인하고 다음을 실행하세요.

```shell
terraform destroy
```

{{% /collapse-content %}}

## 빠른 시작 마이그레이션을 위한 OCI 통합 매뉴얼 {#oci-integration-manual-to-quickstart-migration}

### 마이그레이션해야 하는 이유는 무엇인가요? {#why-do-i-need-to-migrate}

Datadog OCI 통합은 테넌시당 하나의 통합으로 제한됩니다. 2025년 6월 이전에 통합을 설정했다면 수동 설정을 따른 것입니다. 모든 이전 Datadog OCI 통합 배포 스택은 OCI 빠른 시작 설정 방법을 사용하기 전에 삭제해야 합니다. 로그 포워딩을 수동으로 구성했고 OCI 빠른 시작 타일에서 로그 수집을 활성화하기로 선택한 경우 로그가 두 번 전송되지 않도록 로그 포워딩 리소스도 삭제해야 합니다.

**참고**: 수동 통합이 삭제된 시점부터 빠른 시작 배포가 완료될 때까지 메트릭 및 로그 수집에 공백이 생깁니다.

### 마이그레이션 방법 {#how-to-migrate}

Datadog과 OCI 모두에서 이전 통합 리소스를 삭제하세요.

#### Datadog {#in-datadog-1}

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 **Delete Configuration**을 클릭합니다. 이 시점부터 메트릭과 로그는 더 이상 수집되지 않습니다.

![Datadog에서 OCI 통합 구성 삭제](images/oci_delete_configuration_2025-11-17.png)

#### OCI {#in-oci-1}

**전제 조건**: 제거 작업을 실행하기 전에 OCI 스택에 구성된 Datadog 애플리케이션 키가 여전히 유효한지 확인하세요. 키가 만료되었거나 취소된 경우, 제거 작업이 실패합니다. 키를 업데이트하려면 OCI 콘솔에서 스택 변수를 편집하고 계속 진행하기 전에 유효한 애플리케이션 키를 제공하세요.

수동 통합이 이전에 배포된 **각 리전**에 대해 다음 단계를 완료하세요.

1. Datadog OCI 메트릭 포워딩 스택에서 `Destroy` 작업을 실행하여 스택에 의해 생성된 모든 리소스를 제거합니다. 기본적으로 이 스택에는 `datadog-oci-orm-metrics-setup.zip-<NUMBER>` 레이블이 지정되지만 배포 중 사용자 지정 값으로 구성되었을 수 있습니다.

1. Datadog OCI 정책 스택에서 `Destroy` 작업을 실행합니다. 기본적으로 이 스택에는 `datadog-oci-orm-policy-setup.zip-<NUMBER>` 레이블이 지정되지만 배포 중 사용자 지정 값으로 구성되었을 수 있습니다.

   ![OCI에서 Datadog 통합 스택 제거](images/oci_destroy_stack.png)

1. **선택적으로**, 제거가 완료된 후 Datadog OCI 스택을 삭제합니다.

1. 로그 수집을 구성한 경우, Datadog OCI 애플리케이션, 함수 및 서비스 커넥터 허브를 삭제합니다.

   ![OCI에서 logconnector 삭제](images/oci_delete_logconnector.png)

이제 [빠른 시작 설정 지침](#quickstart-setup-instructions)에 따라 OCI 빠른 시작을 배포하고 데이터 수집을 재개할 준비가 되었습니다. OCI 빠른 시작 배포가 완료되는 데 최대 30분이 소요될 수 있습니다.

## 아키텍처 {#architecture}

### 메트릭 및 로그 포워딩 리소스 {#metric-and-log-forwarding-resources}

![이 설정 옵션에 대해 언급된 OCI 메트릭 및 로그 포워딩 리소스와 데이터 흐름을 보여주는 다이어그램](images/oci_quickstart_infrastructure_diagram.png)

모니터링되는 각 리전에 대해 이 설정 옵션은 해당 리전 내에 메트릭과 로그를 Datadog으로 포워딩하기 위한 다음 인프라를 생성합니다.

- 함수 애플리케이션(`dd-function-app`)
- 두 가지 함수:
  - 메트릭 포워더(`dd-metrics-forwarder`)
  - 로그 포워더(`dd-logs-forwarder`)
- 보안 네트워킹 인프라를 갖춘 VCN(`dd-vcn`):
  - 프라이빗 서브넷(`dd-vcn-private-subnet`)
  - 인터넷 외부 액세스를 위한 NAT 게이트웨이(`dd-vcn-natgateway`)
  - OCI 서비스 내부 액세스를 위한 서비스 게이트웨이(`dd-vcn-servicegateway`)
- Datadog API 키를 저장하기 위한 키 관리 서비스(KMS) 볼트(`datadog-vault`)
- 전용 **Datadog** 컴파트먼트(`Datadog`)

모든 리소스에는 `ownedby = "datadog"` 태그가 지정됩니다.

### IAM 리소스 {#iam-resources}

![이 설정 옵션에 대해 언급된 OCI IAM 리소스와 데이터 흐름을 보여주는 다이어그램](images/oci_quickstart_iam_diagram.png)

이 설정 옵션은 Datadog으로의 데이터 포워딩을 활성화하기 위한 다음 IAM 리소스를 생성합니다.

- 서비스 사용자(`dd-svc`)
- 서비스 사용자가 속한 그룹(`dd-svc-admin`)
- API 인증을 위한 RSA 키 쌍
- 서비스 사용자를 위한 OCI API 키
- Datadog 컴파트먼트의 모든 서비스 커넥터를 포함하는 동적 그룹(`dd-dynamic-group-connectorhubs`)
- Datadog 컴파트먼트의 모든 함수를 포함하는 동적 그룹(`dd-dynamic-group-function`)
- Datadog 컴파트먼트에서 데이터 수집 및 포워딩에 필요한 테넌시 리소스에 대한 읽기 권한과 OCI 인프라에 대한 관리 권한을 서비스 사용자에게 부여하는 정책(`dd-svc-policy`)

{{% collapse-content title="정책을 참조하세요" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to use tag-namespaces in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment
- Allow dd-svc-admin to use fn-invocation in Datadog compartment
- Allow dd-svc-admin to manage buckets in Datadog compartment where target.bucket.name=/dd-*/
- Allow dd-svc-admin to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
- Endorse dd-svc-admin to read objects in tenancy usage-report
- Allow dd-svc-admin to manage cloudevents-rules in tenancy where any {request.permission = 'EVENTRULE_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow dd-svc-admin to manage streams in Datadog compartment where any {request.permission = 'STREAM_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow service objectstorage-<REGION> to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
```

**참고**: 구독된 리전마다 `Allow service objectstorage-<REGION>` 문을 한 번씩 추가해야 합니다(예: `objectstorage-us-ashburn-1`, `objectstorage-ap-batam-1`). 이렇게 하면 Datadog이 객체 수명 주기 정책을 통해 Datadog이 관리하는 버킷의 오래된 데이터를 자동으로 정리할 수 있게 됩니다.

{{% /collapse-content %}}

- `dd-dynamic-group-policy` 정책을 적용하면 서비스 커넥터와 함수가 Datadog 컴파트먼트 내의 시크릿, 버킷 및 스트림에 대한 액세스 권한으로 데이터를 읽고 포워딩할 수 있게 됩니다.

{{% collapse-content title="정책을 참조하세요" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
   - Allow dd-dynamic-group-functions to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
   - Allow dd-dynamic-group-connectorhubs to use stream-pull in Datadog compartment where target.resource.tag.DatadogManaged.marker = 'true'
   - Allow any-user to use stream-push in Datadog compartment where all {request.principal.type = 'eventrule', target.resource.tag.DatadogManaged.marker = 'true'}
```

{{% /collapse-content %}}

<div class="alert alert-warning"><strong>통합 리소스의 이름을 변경하지 마세요.</strong> Datadog은 함수 이미지 업데이트와 같은 중요한 유지 관리 작업을 위해 생성하는 리소스를 식별할 때 OCID가 아닌 리소스 이름을 사용합니다. 위에 나열된 리소스의 이름을 변경하면(예: <code>dd-function-app</code>이름 변경) 통합이 중단될 수 있습니다. 조직에 사용자 지정 명명 규칙이 필요한 경우, <a href="https://www.datadoghq.com/support/">Datadog 지원팀</a>에 문의하세요.</div>

## 수집되는 데이터 {#data-collected}

<!-- ### Metrics -->

<!-- See [metadata.csv][12] for a list of metrics provided by this integration. -->

### 메트릭 {#metrics}

상세 메트릭 목록을 보려면 [메트릭 네임스페이스 섹션](#oci-metric-namespaces)에서 해당하는 OCI 서비스를 선택하세요.

### 서비스 점검 {#service-checks}

OCI 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트 {#events}

OCI 이벤트 서비스의 모든 이벤트는 Datadog Events Explorer로 포워딩됩니다. 이벤트를 확인하려면 `source:oci_events_service`로 필터링하세요.

## 문제 해결 {#troubleshooting-1}

OCI 통합과 관련된 문제를 해결하려면 [OCI 통합 문제 해결 가이드](https://docs.datadoghq.com/ko/integrations/guide/oci-integration-troubleshooting)를 참조하세요.