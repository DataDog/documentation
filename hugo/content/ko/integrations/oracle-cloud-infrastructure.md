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
  text: Datadog를 통한 Oracle Cloud Infrastructure 모니터링
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: 블로그
  text: Datadog OCI QuickStart를 통해 Oracle Cloud Infrastructure 모니터링 가속화
integration_version: 1.1.0
media: []
title: Oracle 클라우드 인프라스트럭처
---
{{% site-region region="gov" %}}

<div class="alert alert-warning">Oracle Cloud Infrastructure 통합은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>

{{% /site-region %}}

{{< jqmath-vanilla >}}

## 개요

Oracle Cloud Infrastructure(OCI)는 서비스형 인프라(IaaS)이자 서비스형 플랫폼(PaaS)로 엔터프라이즈 규모의 기업에서 사용됩니다. 호스팅, 스토리지, 네트워킹, 데이터베이스 등 30개 이상의 관리형 서비스 등 완전한 패키지를 포함합니다.

Datadog의 OCI 통합을 사용하여 메트릭, 로그, 데이터 리소스를 통해 OCI 환경에 관한 완벽한 가시성을 확보할 수 있습니다. 이 데이터로 대시보드를 지원하고, 문제를 해결하고 보안 및 규정 준수 태세를 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info"> 
OCI QuickStart는 평가판입니다 . 체험해 보려면 <a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">이 양식</a>을 제출하세요.
</div>

Datadog의 OCI QuickStart는 완전 관리형 단일 플로우의 설정 경험을 제공합니다. 단 몇 번의 클릭만으로 OCI 인프라스틑럭처를 모니터링할 수 있습니다. OCI QuickStart는 메트릭, 로그, 리소스 데이터를 Datadog에 전달하는 데 필요한 인프라를 생성하고 OCI 구성 요소가 데이터 수집을 할 수 있도록 자동으로 새로운 리소스를 찾습니다.

**참고**:

- 기본적으로 메트릭만 전송됩니다. 이 설정을 완료한 후 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 로그 수집 및 리소스 데이터 수집을 활성화합니다.
- 2025년 7월 15일 기준 존재하는 모든 OCI Commercial 리전이 지원됩니다. 이 날짜 이후에 추가된 OCI 리전은 현재 지원되지 않습니다.

Datadog로의 메트릭 및 로그 전달을 위한 인프라스트럭처를 설정하는 방법:

- [Datadog OCI 통합 타일 구성](#datadog-oci-integration-tile)
- [QuickStart 스택 배포](#orm-stack)
- [Datadog 설정 완료](#complete-the-setup-in-datadog)
- [메트릭 흐름 검증](#validation)
- [메트릭 수집 구성(선택 사항)](#configuration)
- [로그 수집 구성(선택 사항)](#log-collection)

통합은 Oracle Service Connector Hubs를 사용하여 데이터를 Datadog에 전달합니다. 설정을 완료하기 전 [서비스 한도 향상 요청](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti)을 하는 것을 권장합니다. 필요한 Service Connector Hubs 예상 개수는 다음과 같습니다.

$$\\text"Service Connector Hubs" = \\text"Number of compartments in tenancy" / \\text"5"$$

{{% collapse-content title="이 설정의 사전 필수 요건" level="h4" %}}

- 이 단계를 완료하는 데 OCI 사용자 계정에는 **Cloud Administrator** 역할이 필요합니다.
- 통합하려는 테넌시에서 OCI에 로그인해야 합니다.
- 화면 오른쪽 상단에서 선택한 Home Region을 사용해 OCI에 로그인합니다.
- OCI 사용자 계정은 <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">Default Identity Domain</a>에 있어야 합니다.
- OCI 사용자 계정은 Default Identity Domain에서 사용자, 사용자 그룹 및 동적 그룹을 생성할 수 있어야 합니다.
- OCI 사용자 계정은 루트 구획에서 정책을 생성해야 합니다.

{{% /collapse-content %}}

#### Datadog OCI 통합 타일

1. [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)로 이동한 다음 **Add New Tenancy**를 클릭합니다.
1. Datadog API 키를 선택하거나 생성하여 통합을 사용합니다.
1. Datadog 애플리케이션 키를 생성합니다.
1. **Create OCI Stack**을 클릭합니다. 배포를 완료하는 데 Oracle Resource Manager(ORM) 스택이 필요합니다.<br />
   **참고**: 테넌시당 한번만 이 스택을 배포합니다.

#### ORM 스택

1. Oracle 이용 약관에 동의합니다.
1. 옵션에서 나가 확인 해제된 커스텀 Terraform 공급자를 사용합니다.
1. 기본 작업 디렉터리를 사용하여 스택을 배포하거나 다른 디렉터리를 선택할 수 있습니다.
1. **Next**를 클릭한 다음 **Next**를 다시 클릭합니다.<br />
1. **Create**를 클릭한 다음 배포가 완료될 때까지 15분을 기다립니다.

#### Datadog에서 설정 완료

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)로 돌아가 **Ready!**를 클릭합니다.

#### 검증

Datadog의 [OCI 통합 개요 대시보드](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) 또는 [Metrics Explorer 페이지](https://app.datadoghq.com/metric/explorer)에서 `oci.*` 메트릭을 확인하세요.

<div class="alert alert-warning">OCI 함수 메트릭 <code>(oci.faas</code> 네임스페이스) 및 컨테이너 인스턴스 메트릭 <code>(oci_computecontainerinstance</code> 네임스페이스)는 미리보기 상태입니다.</div>

#### 설정

![Datadog의 OCI 테넌시 구성 탭](images/oci_configuration_tab.png)

설정을 완료한 다음, 테넌시 구성 탭을 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) 왼쪽에서 사용할 수 있습니다. 아래 섹션에 나와 있는 대로 테넌시 데이터 수집 구성을 적용하세요.

##### 리전 추가

**General** 탭에서, **Regions** 확인란 목록에서 데이터 수집을 위한 리전을 선택합니다. 리전 선택은 메트릭 및 로그 모두 전체 테넌시에 적용됩니다.

**참고**: QuickStart 설정 방법을 사용한 후 새로운 OCI 리전을 구독한 경우, ORM에서 최초 설정 스택을 다시 적용합니다. 그러면 새 리전이 Datadog OCI 타일에서 사용 가능한 상태로 전환됩니다.

##### 메트릭 및 로그 수집

**Metric collection** 및 **Log collection** 탭을 사용하여 Datadog에 전송할 메트릭과 로그를 구성합니다.

- 전체 테넌시의 메트릭 또는 로그 수집을 **활성화** 또는 **비활성화**합니다.
- `key:value` 형식 구획을 기준으로 특정 구획을 **포함** 또는 **제외**합니다. 예는 다음과 같습니다.
  - `datadog:monitored,env:prod*`은 이들 태그 중 **하나**가 존재하는 경우 구획을 포함합니다.
  - `!env:staging,!testing`은 **양** 태그가 존재하는 경우에만 구획을 제외합니다. 
  - `datadog:monitored,!region:us-phoenix-1`는 `datadog:monitored` 태그를 모두 포함하고 `region:us-phoenix-1`를 포함하지 않는 경우 구획을 포함합니다.
- 특정 OCI 서비스에 수집을 **활성화** 또는 **비활성화**합니다.

**참고**:

- OCI에서 태그를 수정한 후 변경이 Datadog에 표시될 때까지 최대 15분이 소요될 수 있습니다.
- OCI에서 태그는 하위 구획별로 상속되지 않습니다. 각 구획은 개별적으로 태깅되어야 합니다.

### 리소스 수집

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)의 **Resource Collection* 탭에서 **리소스 수집 활성화** 토글을 클릭합니다. 리소스가 [Datadog 리소스 카탈로그](https://docs.datadoghq.com/infrastructure/resource_catalog/)에 표시됩니다.

{{% /tab %}}

{{% tab "Manual setup" %}}

다음과 같이 OCI 메트릭을 Datadog으로 포워딩합니다.

- [테넌시 정보 입력](#enter-tenancy-info)
- Datadog 읽기 전용 사용자, 그룹 및 정책을 생성하기 위한 테넌시의 홈 리전에 있는 [Deploy OCI 정책 스택](#create-oci-policy-stack)
- Datadog에서 [DatadogROAuthUser 정보 입력](#enter-datadogroauthuser-info)
- 메트릭을 전달하려는 각 테넌시 리전에 [Deploy OCI 메트릭 전달 스택 배포](#create-oci-metric-forwarding-stack)
- [Datadog 설정 완료](#complete-the-setup-in-datadog)
- [메트릭 흐름 검증](#validation)
- [메트릭 수집 구성(옵션)](#configuration)
- [로그 수집 구성(옵션)](#log-collection)

본 아키텍처에 대한 시각화는 [아키텍처 섹션](#architecture)을 참조하세요.

#### 테넌시 정보 입력

{{% collapse-content title="Requirements for this section" level="h5" %}}

- 이 단계를 완료하는 데 OCI 사용자 계정에는 **Cloud Administrator** 역할이 필요합니다.
- 테넌시 OCID
- 홈 리전

{{% /collapse-content %}}

[Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)에서 모니터링하려는 테넌지의 OCID 및 홈 리전을 입력합니다.

- [테넌시 상세 정보 페이지](https://cloud.oracle.com/tenancy)에서 이 정보를 찾을 수 있습니다.
- OCI [리전 및 가용성 도메인 페이지](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm)에서 **Region Identifier** 값을 사용하여 홈 리전을 입력합니다.

#### OCI 정책 스택 생성

{{% collapse-content title="Requirements for this section" level="h5" %}}

- OCI 사용자 계정은 기본 도메인에서 [동적 그룹 및 정책 생성](https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html)을 할 수 있어야 합니다.
- 사용자는 테넌시의 홈 리전에 있어야 합니다.

{{% /collapse-content %}}

<div class="alert alert-warning">화면 오른쪽 상단에서 테넌시의 <strong>홈 리전이</strong> 선택되어 있는지 확인합니다.</div>

이 Oracle Resource Manager(ORM) 정책 스택은 테넌시당 한 번만 배포되어야 합니다.

1. Datadog OCI 통합 타일에서 ** 정책 스택 생성하기** 버튼을 클릭합니다.
1. Oracle 이용 약관에 동의합니다.
1. 옵션을 커스텀 Terraform 공급자 사용을 **선택하지 않음**으로 둡니다.
1. 스택의 기본 이름과 구획을 사용하거나 옵션으로 설명이 포함된 이름이나 구획을 직접 지정할 수 있습니다.
1. **Next**를 클릭합니다.
1. 테넌시 필드와 현재 사용자 필드를 그대로 둡니다.
1. **Next**를 클릭합니다.
1. **Create**를 클릭합니다.

#### DatadogROAuthUser 정보를 입력합니다.

{{% collapse-content title="Requirements for this section" level="h5" %}}

- `DatadogROAuthUser` OCID
- OCI API 키 및 지문 값

{{% /collapse-content %}}

1. OCI 콘솔 검색 바에서 `DatadogROAuthUser`를 검색한 다음 표시되는 사용자 리소스를 클릭합니다.
1. 사용자의 OCID 값을 복사합니다.
1. [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)의 **User OCID** 필드에 값을 붙여넣기합니다.
1. OCI 콘솔로 돌아가, 다음 단계에 따라 API 키를 생성합니다.<br />
   a. **Resources** 아래의 화면 왼쪽 아래에서, **API keys**를 클릭합니다.<br />
   b. **Add API key**를 클릭합니다.<br />
   c. **Download private key**를 클릭합니다.<br />
   d. **Add**를 클릭합니다.<br />
   e. **설정 파일 미리보기** 팝업이 표시되지만 아무런 조치도 필요하지 않습니다. 팝업창을 닫습니다.

![OCI 콘솔의 API 키 추가 페이지 ](images/add_api_key.png)

5. 지문 값을 복사하고 [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)의 **Fingerprint** 필드에 붙여넣기합니다.
1. 다음 단계에 따라 개인 키 값을 복사합니다.
   a. 다운로드한 개인 키 `.pem` 파일을 텍스트 편집기에서 열거나 `cat` 등의 터미널 명령을 사용하여 파일 내용을 표시합니다.
   b. `-----BEGIN PRIVATE KEY-----` 및 `-----END PRIVATE KEY-----` 을 포함한 전체 내용을 복사합니다.
1. 개인 키 값을 Datadog OCI 통합 타일의 **개인 키** 필드에 붙여넣습니다.

#### OCI 메트릭 포워딩 스택 생성

{{% collapse-content title="Requirements for this section" level="h5" %}}

- OCI 사용자 계정은 구획에서 리소스를 생성할 수 있어야 합니다.
- [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys) value
- Docker 리포지토리로 이미지를 가져오고 내보내기 위한 `REPOSITORY_READ` 및 `REPOSITORY_UPDATE` 권한이 있는 사용자의 사용자 이름 및 인증 토큰
  - [인증 토큰 가져오기](https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm)를 참조하여 인증 토큰 생성 방법을 알아봅니다.
  - 필수 정책에 관한 자세한 정보는 [리포지토리 액세스 제어를 위한 정책](https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access)을 참조하세요

**참고**: Docker 레지스트리 로그인이 올바른지 확인하려면 [Oracle Cloud Infrastructure 레지스트리 로그인](https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm)을 참조하세요.

{{% /collapse-content %}}

메트릭 전달 스택이 모니터링되려면 **각 테넌시 및 리전 조합**에 배포되어야 합니다. 가장 간단한 설정을 위해 Datadog에서는 아래 제공된 Oracle Resource Manager(ORM) 스택을 사용해 모든 필수 OCI 리소스를 생성할 것을 권장합니다. 또는, 기존 OCI 네트워킹 인프라스트럭처를 사용할 수 있습니다.

Datadog의 ORM 스택에서 생성된 모든 리소스는 지정된 구획 및 화면 오른쪽 상단에서 현재 선택한 리전에 배포됩니다.

1. Datadog OCI 통합 타일에서 **메트릭 스택 생성하기** 버튼을 클릭합니다.
1. Oracle 이용 약관에 동의합니다.
1. **커스텀 제공자** 옵션을 선택하지 않은 상태로 둡니다.
1. 스택의 이름을 지정하고 스택을 배포할 구획을 선택합니다.
1. **Next**를 클릭합니다.
1. **Datadog API Key** 필드에 [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys) 값을 입력합니다.
1. **네트워크 옵션** 섹션에서 `Create VCN`이 체크된 상태로 둡니다.

{{% collapse-content title="(선택 사항) 대신 기존 VCN 사용" level="h4" %}}

기존 Virtual Cloud Network(VCN)를 사용하는 경우 서브넷의 OCID가 스택에 반드시 제공되어야 합니다. VCN이 다음과 같이 설정되어 있는지 확인합니다.

- NAT 게이트웨이를 통해 HTTP 아웃바운드 호출이 허용됨
- 서비스 게이트웨이를 통해 OCI 컨테이너 레지스트리에서 이미지를 가져올 수 있음
- NAT 게이트웨이 및 서비스 게이트를 허용하는 라우팅 테이블 규칙이 있음
- HTTP 요청 전송을 위한 보안 규칙이 있음

7. **Network options** 섹션에서 `Create VCN` 옵션을 확인 해제한 다음 VCN 정보를 입력합니다.<br />
   a. **vcnCompartment** 필드에서 구획을 선택합니다.<br />
   b. **existingVcn** 섹션에서 기존 VCN을 선택합니다.<br />
   c. **Function Subnet OCID** 섹션에서 사용하려는 서브넷의 OCID를 입력합니다.

{{% /collapse-content %}}

8. **메트릭 설정** 섹션에서 컬렉션의 메트릭 네임스페이스를 제거합니다(옵션).
1. **메트릭 컴파트먼트** 섹션에서 모니터링할 컴파트먼트 OCID의 쉼표로 구분된 목록를 입력합니다. 이전 단계에서 선택한 메트릭 네임스페이스 필터가 각 컴파트먼트에 적용됩니다.
1. **Function settings** 섹션에서 `GENERIC_ARM`를 선택합니다. 일본 리전에서 배포하는 경우 `GENERIC_X86`을 선택합니다.
1. **Next**를 클릭합니다.
1. **Create**를 클릭합니다.
1. [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)로 돌아가 **Create Configuration**를 클릭합니다.

**참고**:

- 기본적으로 루트 구획만 선택되고 해당 구획에 있는 8단계의 모든 메트릭 네임스페이스가 활성화(컨테이너 허브당 최대 50개 네임스페이스 지원)됩니다. 추가 구획을 모니터링하도록 선택하면 해당 구획에 추가된 네임스페이스는 선택된 네임스페이스와 구획에 존재하는 네임스페이스의 교집합이 됩니다.
- 리소스 관리자 스택의 Terraform 상태 파일에 액세스할 수 있는 사람을 관리해야 합니다. 자세한 정보는 Securing Resource Manager의 [Terraform 상태 파일 섹션](https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state)을 참조하세요.

{{% /tab %}}

{{< /tabs >}}

{{% collapse-content title="메트릭 네임스페이스 전체 목록 보기" level="h4" %}}

### 메트릭 네임스페이스

| 통합                         | 메트릭 네임스페이스                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Compute](https://docs.datadoghq.com/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (평가판)](https://docs.datadoghq.com/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (미리 보기)](https://docs.datadoghq.com/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Kubernetes Engine](https://docs.datadoghq.com/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [Object Storage](https://docs.datadoghq.com/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [PostgreSQL](https://docs.datadoghq.com/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Service Connector Hub](https://docs.datadoghq.com/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [VCN](https://docs.datadoghq.com/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [VPN](https://docs.datadoghq.com/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### 로그 수집

아래 방법 중 하나를 사용해 OCI 로그를 Datadog에 전송합니다.

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. [설정 섹션](#setup) 단계에 따라 메트릭 및 로그를 Datadog에 전달하기 위해 필요한 인프라스트럭처를 생성합니다.
1. [Datadog OCI 통합 타일](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)의 **Log Collection** 탭에서 **Enable Log Collection** 토글을 클릭합니다.

{{% /tab %}}

{{% tab "Service Connector Hub" %}}

1. OCI 로그를 설정합니다.
1. OCI 함수를 설정합니다.
1. OCI 서비스 커넥터를 설정합니다.

아래 지침은 OCI 포털을 사용하여 통합을 설정하는 방법입니다.

#### OCI 로깅

1. OCI 포털에서 *로깅 -> 로그 그룹*으로 이동합니다.
1. 컴파트먼트를 선택하고 **로그 그룹 생성하기**를 클릭합니다. 사이드 패널이 열립니다.
1. 이름에 `data_log_group`을 입력하고 옵션으로 설명과 태그를 입력합니다.
1. **생성하기**를 클릭하여 새 로그 그룹을 설정합니다.
1. **리소스**에서 **로그**를 클릭합니다.
1. **커스텀 로그 생성하기** 또는 **서비스 로그 활성화**를 클릭합니다.
1. **로그 활성화**를 클릭하여 새 OCI 로그를 생성합니다.

OCI 로그에 대한 자세한 정보는 [리소스 로깅 활성화](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm)를 참조하세요.

#### OCI 함수

1. OCI 포털에서 *함수*로 이동합니다.
1. 기존 애플리케이션을 선택하거나 **애플리케이션 생성하기**를 클릭합니다.
1. 애플리케이션 내 새로운 OCI 함수를 생성하세요. 자세한 정보는 [Oracle 함수 개요](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm)를 참조하세요.
1. 먼저 기본 구조 Python 함수를 생성한 다음 Datadog 소스 코드를 사용해 자동 생성된 파일로 교체하는 것이 좋습니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py)에서 코드를`func.py`로 교체합니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml)에서 코드를 `func.yaml`로 교체합니다. `DATADOG_TOKEN` 및 `DATADOG_HOST`이 Datadog API 키와 리전 로그 수집 링크로 교체되어야 합니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt)에서 코드를 `requirements.txt`와 교체합니다.

#### OCI 서비스 커넥터 허브

1. OCI 포털에서 *로깅 -> 서비스 커넥터*로 이동합니다.
1. **서비스 커넥터 생성하기**를 클릭하면 **서비스 커넥터 생성하기** 페이지로 이동합니다.
1. **소스**를 로깅으로, **대상**을 함수로 선택합니다.
1. **소스 연결 설정**에서 **컴파트먼트 이름**, **로그 그룹**, **로그**를 선택합니다(첫 번째 단계에서 생성한 **로그 그룹** 및 **로그**).
1. **Audit Logs**를 전송하려면 **+Another Log**를 클릭한 다음 동일한 **Compartment**을 선택합니다. 또한 "\_Audit"를 **Log Group**으로 교체합니다.
1. **대상 설정**에서 **컴파트먼트**, **함수 애플리케이션**, **함수**를 선택합니다(이전 단계에서 생성한 **함수 애플리케이션** 및 **함수**).
1. 정책을 생성하라는 메시지가 표시되면 **생성**을 클릭합니다.
1. 하단의 **생성**을 클릭하여 서비스 커넥터 생성을 완료합니다.

OCI Object Storage와 관련한 자세한 정보는 [Oracle's Service Connector 블로그 게시물](https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available)을 참조하세요.

{{% /tab %}}

{{% tab "Object store" %}}

1. OCI 로그를 설정합니다.
1. OCI 오브젝트 스토어를 생성하고 OCI 로그에 대한 읽기/쓰기 액세스를 활성화합니다.
1. OCI 함수를 설정합니다.
1. OCI 이벤트를 설정합니다.

아래 지침은 OCI 포털을 사용하여 통합을 설정하는 방법입니다.

#### OCI 로깅

1. OCI 포털에서 *솔루션 및 플랫폼 -> 로깅 -> 로그*로 이동합니다.
1. **커스텀 로그 생성하기**를 클릭하면 **커스텀 로그 생성하기** 페이지로 이동합니다.
1. 새 OCI 로그 이름을 지정합니다.
1. **컴파트먼트** 및 **로그 그룹**을 선택합니다. 본 선택 사항은 전체 설치에서 일관되게 유지됩니다.
1. **커스텀 로그 생성하기**를 클릭하면 **에이전트 설정 생성하기** 페이지로 이동합니다.
1. **새 설정 생성하기**를 클릭합니다.
1. 새 설정 이름을 지정합니다. 컴파트먼트가 사전 선택됩니다.
1. 그룹 유형을 **동적 그룹**으로 설정하고 기존 그룹 중 하나로 그룹화합니다.
1. 인풋 유형을 **로그 경로**로 설정하고 원하는 인풋 이름을 입력한 후 파일 경로에 "/"를 사용합니다.
1. **커스텀 로그 생성하기**를 클릭하면 OCI 로그가 생성되어 로그 페이지에서 사용할 수 있습니다.

OCI 로그에 대한 자세한 정보는 [리소스 로깅 활성화](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm)를 참조하세요.

#### OCI 오브젝트 스토리지

1. OCI 포털에서 *코어 인프라스트럭처 -> 오브젝트 스토리지 -> 오브젝트 스토리지*로 이동합니다.
1. **버킷 생성하기**를 클릭하면 **버킷 생성하기** 양식으로 이동합니다.
1. 스토리지 티어로 **표준**을 선택하고 **오브젝트 이벤트 내보내기**를 체크합니다.
1. 원하는 대로 나머지 양식을 작성합니다.
1. **버킷 생성하기**를 클릭하면 버킷이 생성되고 버킷 목록에서 사용할 수 있습니다.
1. 활성 버킷 목록에서 새 버킷을 선택하고 리소스의 **로그**를 클릭합니다.
1. **read**를 활성화됨으로 토글하면 **Enable Log** 사이드 메뉴로 리디렉션됩니다.
1. **컴파트먼트** 및 **로그 그룹**을 선택합니다(OCI 로그와 동일한 선택 항목 사용).
1. **로그 이름**의 이름을 입력하고 원하는 로그 보존 기간을 선택합니다.

OCI Object Storage에 대한 자세한 정보는 [객체 스토리지에 데이터 가져오기](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm)를 참조하세요.

#### OCI 함수

1. OCI 포털에서 *솔루션 및 플랫폼 -> 개발자 서비스 -> 함수*로 이동합니다.
1. 기존 애플리케이션을 선택하거나 **애플리케이션 생성하기**를 클릭합니다.
1. 애플리케이션 내에서 새로운 OCI 함수를 생성하려면 [Oracle 함수 개요](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm)에서 자세한 정보를 확인하세요.
1. 먼저 기본 구조 Python 함수를 생성한 다음 Datadog 소스 코드를 사용해 자동 생성된 파일로 교체하는 것이 좋습니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py)에서 코드를 `func.py`로 교체합니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml)에서 코드를 `func.yaml`로 교체합니다. `DATADOG_TOKEN` 및 `DATADOG_HOST`는 Datadog API 키 및 리전 로그 수집 링크로 교체되어야 합니다.
   - [Datadog OCI 리포지토리](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt)에서 코드를 `requirements.txt`로 교체합니다.

#### OCI 이벤트

1. OCI 포털에서 *솔루션 및 플랫폼 -> 애플리케이션 통합 -> 이벤트 서비스*로 이동합니다.
1. **규칙 생성하기**를 클릭하면 **규칙 생성하기** 페이지로 이동합니다.
1. 이벤트 규칙에 이름과 설명을 입력합니다.
1. 조건을 **이벤트 유형**으로, 서비스 이름을 **오브젝트 스토리지**로, 이벤트 유형을 **오브젝트 - 생성(Object - Create)**으로 설정합니다.
1. 작업 유형을 **함수**로 설정합니다.
1. 함수 컴파트먼트가 OCI 로그, OCI 버킷 및 OCI 함수에서 선택한 것과 동일한지 확인합니다.
1. (이전 설지 단계에 따라) 함수 애플리케이션 및 함수를 선택합니다.
1. **규칙 생성하기**를 클릭하면 규칙이 생성되고 규칙 목록에서 사용할 수 있습니다.

OCI Object Storage에 대한 자세한 정보는 [이벤트 시작하기](https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm)를 참조하세요.

{{% /tab %}}

{{< /tabs >}}

## 아키텍처

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### 메트릭 및 로그 전달 리소스

![이 설정 옵션에 대해 언급된 OCI 메트릭 및 로그 전달 리소스와 데이터 흐름을 표시하는 다이어그램](images/oci_quickstart_infrastructure_diagram.png)

이 설정 옵션은 모니터링되는 각 리전에 해당 리전 내 메트릭 및 로그를 Datadog에 전달할 수 있도록 다음 인프라스트럭처를 생성합니다.

- Function Application (`dd-function-app`)
- 두 함수:
  - Metrics Forwarder (`dd-metrics-forwarder`)
  - Logs Forwarder (`dd-logs-forwarder`)
- 안전한 네트워크 인프라스트럭처를 포함하는 VCN(`dd-vcn`):
  - 프라이빗 서브넷(`dd-vcn-private-subnet`)
  - 인터넷을 통한 외부 액세스용 NAT 게이트웨이(`dd-vcn-natgateway`)
  - OCI 서비스로 인터넷 액세스용 서비스 게이트웨이(`dd-vcn-servicegateway`)
- Datadog API 키 저장용 Key Management Service(KMS) Vault(`datadog-vault`)
- 전용 **Datadog** 구획(`Datadog`)

모든 리소스는 `ownedby = "datadog"`로 태깅되어 있습니다.

### IAM 리소스

![이 설정에 언급된 OCI IAM 리소스 및 데이터 흐름을 표시하는 다이어그램](images/oci_quickstart_iam_diagram.png)

이 설정 옵션은 Datadog로의 데이터 전달을 활성화할 수 있도록 다음 IAM 리소스를 생성합니다.

- 서비스 사용자(`dd-svc`)
- 서비스 사용자가 속한 그룹(`dd-svc-admin`)
- API 인증을 위한 RSA 핵심 쌍
- 서비스 사용자를 위한 OCI API 키
- Datadog 구획에서 모든 서비스 연결자를 포함하는 Dynamic Group(`dd-dynamic-group-connectorhubs`)
- Datadog 구획에서 모든 함수를 포함하는 Dynamic Group(`dd-dynamic-group-function`)
- Datadog에서 생성하고 관리하는 구획에 있는 OCI Service Connector Hubs 및 OCI Functions를 관리하기 위한 액세스 권한과 서비스 사용자에게 테넌시 리소스 읽기 권한을 제공하는 정책(`dd-svc-policy`)

{{% collapse-content title="정책 보기" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment with specific permissions:
     * FN_FUNCTION_UPDATE
     * FN_FUNCTION_LIST
     * FN_APP_LIST
- Endorse dd-svc-admin to read objects in tenancy usage-report
```

{{% /collapse-content %}}

- 서비스 커넥터를 활성화해 데이터(로그 및 메트릭)를 활성화하고 함수와 상호작용하는 `dd-dynamic-group-policy` 정책입니다. 또한 이 정책은  함수가 Datadog 구획의 기밀을 읽을 수 있도록 해줍니다(KMS Vault에 저장된 Datadog API 및 애플리케이션 키).

{{% collapse-content title="정책 보기" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
```

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "수동 설정" %}}

### 메트릭 포워딩 리소스

![이 설정 옵션에 언급된 OCI 리소스 및 데이터 흐름을 표시하는 다이어그램](images/OCI_metrics_integration_diagram.png)

이 설정 옵션은 OCI [커넥터 허브](https://docs.oracle.com/iaas/Content/connector-hub/home.htm), [함수 앱](https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications)과 보안 네트워킹 인프라를 생성하여 OCI 메트릭을 Datadog에 전달합니다. 이러한 리소스 ORM 스택은 테넌시 리전의 함수 컨테이너 리포지토리를 생성합니다. Docker 이미지가 리포지토리에 푸시되어 함수에서 사용합니다.

### IAM 리소스

![통합 인증에 사용되는 OCI 리소스 및 워크플로우 다이어그램](images/OCI_auth_workflow_diagram.png)

이 설정 옵션은 다음을 생성합니다.

- `resource.type = 'serviceconnectors'` 포함 동적 그룹으로, 커넥터 허브로의 액세스를 활성화합니다.
- **DatadogROAuthUser**란 이름의 사용자로, Datadog가 테넌시 리소스를 읽는 데 사용됩니다.
- 생성된 사용자가 정책 액세스를 위해 추가된 그룹입니다.
- **DatadogAuthWriteUser**란 이름의 사용자로, 함수에 Docker 이미지를 푸시하는 데 사용됩니다.
- 정책 액세스를 통한 이미지 푸시를 위해 `DatadogAuthWriteUser`가 추가된 액세스 그룹을 씁니다.
- 루트 구획에 있는 정책으로, 커넥터 허브가 메트릭 및 호출 함수를 읽을 수 있도록 허용합니다. 또한 이 정책은 생성된 사용자 그룹에 테넌시 리소스 및 쓰기 권한 그룹 읽기 권한을 제공하여 이미지를 푸시할 수 있도록 해줍니다.

{{% collapse-content title="정책 보기" level="h6" %}}

```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

## 수집한 데이터

<!-- ### 메트릭 -->

<!-- 이 통합에서 제공하는 메트릭 목록은 [metadata.csv][12]를 참조하세요. -->

### Metrics

상세한 메트릭 목록은 [메트릭 네임스페이스 섹션](#metric-namespaces)에 있는 적절한 OCI 서비스를 선택합니다.

### 서비스 점검

OCI 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

OCI 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 사용해 Oracle Cloud Infrastructure 모니터링](https://www.datadoghq.com/blog/monitor-oci-with-datadog/)
- [Datadog OCI QuickStart를 사용해 Oracle Cloud Infrastructure 모니터링 가속화](https://www.datadoghq.com/blog/datadog-oci-quickstart/)