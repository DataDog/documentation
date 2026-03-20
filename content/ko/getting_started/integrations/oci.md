---
description: Oracle Cloud Infrastructure 환경을 Datadog와 통합하여 포괄적 모니터링
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: 블로그
  text: Datadog를 통한 Oracle Cloud Infrastructure 모니터링
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: 블로그
  text: Datadog OCI QuickStart를 통해 Oracle Cloud Infrastructure 모니터링 가속화
- link: /integrations/oracle-cloud-infrastructure
  tag: 설명서
  text: Oracle Cloud Infrastructure 통합
- link: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 가이드
  text: 클라우드 인스턴스에 Datadog 에이전트를 설치해야 하는 이유
title: Oracle Cloud Infrastructure(OCI) 시작하기
---

{{< jqmath-vanilla >}}

## 개요

이 가이드에서는 Oracle Cloud Infrastructure(OCI) 환경을 모니터링하는 방법을 설명합니다. Datadog의 QuickStart 설정을 사용하면 통합 과정이 간편해지고, 필요한 인프라스트럭처를 자동으로 프로비저닝하여 OCI 테넌시에서 메트릭, 로그, 리소스 데이터를 수집합니다.

{{% collapse-content title="필수 조건" level="h4" expanded=false id="prerequisites" %}}

### OCI 내

내 OCI 사용자 계정에 다음이 필요합니다.

- **Identity Domain Administrator** 역할
- Identity Domain에 사용자, 사용자 그룹, 역동 그룹을 생성할 수 있어야 합니다.
- 루트 컴파트먼트에서 정책을 생성할 수 있어야 합니다.

추가로 다음을 할 수 있어야 합니다.
- 통합하고 싶은 테넌시에 로그인해야 합니다.
- OCI 콘솔에서 홈 리전이 선택되어 있어야 합니다.

**참고**: OCI 통합은 테넌시별 하나로 제한됩니다. 2026년 1월 1일 기준, 존재하는 전체 OCI Commercial 리전(OCI 영역)이 지원됩니다.

### Datadog 내

[API 및 애플리케이션 키 생성 권한][30]이 있는 [Datadog 계정][1]

{{% /collapse-content %}}

## 설정

Datadog의 OCI용 QuickStart는 완전 관리형 설정으로, 테넌시에 있는 필요 인프라스트럭처를 모두 프로비저닝합니다. 이 설정을 이용하면 자동으로 Oracle Service Connector Hubs이 생성되고 Datadog으로 메트릭과 로그를 스트리밍하며, 환경이 커짐에 따라 새 리소스와 컴파트먼트를 계속해서 검색합니다.

**참고**: 시작하기 전에 Service Connector Hubs의 [서비스 한도 증가][4]하는 것을 고려해 보세요. 대략적으로 다음과 같은 수치가 필요합니다.

$$\\text"Service Connector Hubs" = \text"Number of compartments in tenancy" / \text"5"\$$

### Datadog OCI 통합 타일 구성

1. [Datadog OCI 통합 타일][3]으로 이동해 **Add New Tenancy**를 클릭합니다.

2. Datadog API 키를 선택하거나 생성하여 통합을 사용합니다.
3. Datadog 애플리케이션 키를 생성합니다.
4. 로그를 활성화 또는 비활성화로 토글할 수 있습니다.
5. **Create OCI Stack**을 클릭합니다. OCI 콘솔에서 Oracle Resource Manager를 열고 배포를 완료합니다.

   **참고**: 테넌시당 한번만 이 스택을 배포합니다.

### QuickStart ORM 스택 배포

1. OCI 콘솔에서 Oracle 이용 약관에 동의합니다.
2. 옵션을 선택 해제하여 확인 해제된 커스텀 Terraform 공급자를 사용합니다.
3. 기본 작업 디렉터리를 사용하거나 다른 디렉터리를 선택할 수 있습니다.
4. **Next**를 클릭합니다.
5. **(Optional) Choose specific subnet(s)** 섹션을 빈 상태로 둡니다. QuickStart에서 자동으로 새 Virtual Cloud Network(VCN)와 각 리전에 서브넷을 생성하여 설정이 간편합니다.

   **고급 옵션**: 기존 서브넷(OCI 리전당 최대 1개)를 사용하려면 서브넷 OCID(줄별 1개, 쉼표 없이)를 제공합니다. 형식: `ocid1.subnet.oc[0-9].*`. 예: `ocid1.subnet.oc1.iad.abcedfgh`.
   기존 서브넷을 사용하려면 각 VCN에 NAT Gateway를 통한 HTTP 송신이 가능한지, "All Services In Oracle Services Network"용 Service Gateway, 적절한 루트 테이블 규칙, HTTP 요청의 보안 규칙이 있는지 확인하세요.

6. **(Optional) Choose a User** 섹션을 빈 상태로 둡니다. QuickStart에서 현재 OCI Identity Domain에 새 Group과 User를 생성하여 IAM 설정이 간편합니다.

   **고급 옵션**: 기존 Group 과 User를 사용하려면 **Group ID**와 **User ID** OCID를 제공하세요. 사용자가 지정된 그룹의 회원이어야 합니다.

7. 대부분의 경우 **(Optional) Advanced configuration** 섹션을 빈 상태로 둡니다.

   **고급 옵션**:
   - **Compartment**: Datadog에서 생성한 리소스의 기존 컴파트먼트를 지정합니다(기본적으로 새 "Datadog" 컴파트먼트를 생성함).
   - **Domain**: User 및 Group이 생성된 위치에서 재정의할 Identity Domain OCID를 제공합니다. 해당 도메인에 **Identity Domain Administrator** 역할이 필요합니다.

8. **Next**를 클릭합니다.
9. **Create**를 클릭하고 배포가 완료될 때까지 최대 30분 정도 기다립니다.

### Datadog에서 설정 완료

[Datadog OCI 통합 타일][3]으로 돌아와 **Ready!**를 클릭합니다.

### 검증

데이터가 수집이 시작될 때까지 10분 정도 기다린 후 [OCI 통합 개요 대시보드][5] 또는 Datadog의 [Metrics Explorer 페이지][6]에서 `oci.*` 메트릭을 확인합니다.

{{< img src="getting_started/integrations/oci/oci-dashboard.png" alt="Oracle Cloud Infrastructure 서비스의 여러 메트릭 및 그래프가 표시된 Datadog의 OCI 개요 대시보드">}}

<div class="alert alert-info">OCI 기능 메트릭(<code>oci.faas</code> 네임스페이스) 및 컨테이너 인스턴스 메트릭(<code>oci_computecontainerinstance</code> namespace)은 평가판입니다.</div>

## 설정

설정을 완료한 후 테넌시의 구성 탭이 [Datadog OCI 통합 타일][3]의 왼쪽에서 사용할 수 있습니다. 아래 섹션에 안내된 대로 테넌시 데이터 수집 구성을 적용하세요.

### 리전 추가

**General** 탭에서, **Regions** 확인란 목록에서 데이터 수집을 위한 지역을 선택합니다. 지역 선택은 메트릭 및 로그 모두에 대해 전체 테넌시에 적용됩니다.

**참고**: QuickStart 설정 방법을 사용한 후 새로운 OCI 지역을 구독한 경우, ORM에서 최초 설정 스택을 다시 적용합니다. 그러면 새 지역이 Datadog OCI 타일에서 사용 가능한 상태로 전환됩니다.

### 메트릭 및 로그 수집

**Metric collection** 및 **Log collection** 탭을 사용해 Datadog으로 보낼 메트릭과 로그를 구성하세요.

**참고**: 필터는 순서대로 평가됩니다. 서비스의 데이터 수집은 가장 먼저  **Selected Services**가 적용되고, 그 다음으로 컴파트먼트 태그 필터가 적용되며, 마지막으로 리소스 태그 필터가 적용됩니다.

#### 전체 수집 활성화 또는 비활성화

메트릭과 로그 수집 탭에 전체 테넌시에서 해당 데이터 유형의 데이터 수집을 비활성화할 수 있는 메인 토글이 있습니다.

#### 특정 OCI 서비스로 수집 제한

**Selected Services** 섹션을 사용해 개별 OCI 서비스에서 데이터를 수집하는 것을 활성화 또는 비활성화할 수 있습니다. 서비스를 비활성화하면 적용된 리소스 태그 필터와 무관하게 해당 서비스에서 데이터 수집하는 것을 완전히 중단합니다. 서비스를 활성화하면 리소스 태그 필터를 사용해 해당 서비스의 데이터 수집을 특정 리소스로 범위를 좁힐 수 있습니다. 일치하는 포함 태그가 없는 리소스는 수집에서 제외됩니다.

**참고**: 서비스 토글 변경 사항은 적용되는 데 최대 5분 정도가 걸릴 수 있습니다.

{{% collapse-content title="태그 필터 구문" level="h5" id="tag-filter-syntax" %}}

**Compartment Tags** 및 **Limit Collection to Specific Resources** 섹션은 쉼표로 구분된 `key:value` OCI 태그를 허용합니다. 접두사 `!`를 붙여 상쇄할 수 있습니다. 사용된 태그 유형에 따라 쉼표 구분자가 다르게 적용됩니다.

- **긍정 태그만**: OR 로직 - OCI 객체에 목록에 있는 태그가 **하나라도** 있으면 포함됩니다.
- **부정 태그만**(`!` 접두사 추가): OR 로직 - 부정 태그가 **하나라도** 있으면 제외됩니다.
- **긍정 및 부정 태그 혼합**: AND 로직 - 목록에 있는 **모든** 조건을 충족해야 포함됩니다.

예시:
- `datadog:monitored,env:prod*`: 태그 중 **하나**가 존재하는 경우 포함합니다.
- `!env:staging,!testing:true`: 태그 중 **하나**가 존재하는 경우 제외합니다.
- `datadog:monitored,!region:us-phoenix-1`: `datadog:monitored` 태그가 존재**하고** `region:us-phoenix-1` 태그가 없는 경우에만 포함합니다.

{{% /collapse-content %}}

#### 컴파트먼트별로 수집 제한

**Compartment Tags** 섹션을 사용해 OCI 컴파트먼트 태그를 기반으로 특정 컴파트먼트를 포함하거나 제외할 수 있습니다. 구문을 참조하려면 [태그 필터 구문](#tag-filter-syntax)을 확인하세요.

**참고**: OCI 내에서 태그는 하위 컴파트먼트에 상속되지 않습니다. 각 컴파트먼트를 개별적으로 태그해야 합니다. OCI에서 태그를 수정한 후 Datadog에 변화가 나타나는데 최대 15분 정도가 걸릴 수 있습니다.

#### 특정 리소스로 수집 제한

**Limit Collection to Specific Resources** 섹션에서 어떤 리소스의 메트릭 또는 로그를 Datadog로 보낼지 정의할 수 있습니다. 드롭다운 메뉴에서 OCI 서비스를 선택한 후 타게팅할 리소스 태그를 지정합니다. 구문을 참조하려면 [태그 필터 구문](#tag-filter-syntax)을 확인하세요.

### 리소스 수집

[Datadog OCI 통합 타일][3]의 **Resource Collection** 탭에서 **Enable Resource Collection** 토글을 클릭합니다. [Datadog Resource Catalog][7]에서 리소스를 볼 수 있습니다.

## Datadog 플랫폼에서 더 많은 것을 얻으세요

### Agent를 설치해 깊은 가시화 실현

OCI 통합을 사용하면 서비스 수준의 메트릭을 Oracle Cloud Monitoring을 통해 자동으로 수집합니다. 이에 더해 컴퓨팅 인스턴스에 [Datadog Agent][8]를 설치하면 다음과 같이 더욱 깊은 인프라스트럭처와 애플리케이션 인사이트를 얻을 수 있습니다.

- CPU, 메모리, 디스크, 네트워크에 1초 미만(sub-second) 단위의 정밀도를 제공하는 **시스템 수준 메트릭**
- 애플리케이션별로 리소스 소비를 확인할 수 있는 **프로세스 수준 가시화**
- [DogStatsD][12]를 통한 애플리케이션의 **커스텀 메트릭**
- 엔드 투 엔드 요청 가시성을 제공하는 **분산 추적**
- 빠르게 트러블슈팅할 수 있도록 돕는, 메트릭과 연결된 **로그**

Oracle Linux를 포함해 대부분의 운영 체제에서 단일 명령으로 Agent를 설치할 수 있습니다. [Agent 설치 페이지][9]에서 설치 지침을 확인하거나 [클라우드 인스턴스에서 Agent를 설치해야 하는 이유][13]를 확인해 더욱 자세한 장점을 확인해 보세요.

### OCI Kubernetes Engine(OKE)와 함께 Datadog Agent 사용

OKE의 컨테이너화된 환경의 경우 [Kubernetes용 Datadog Agent][14]를 사용할 수 있습니다. Kubernetes 전용 설명서를 사용해 Agent를 OKE 클러스터에 배포하고, 컨테이너화된 애플리케이션에서 메트릭, 로그, 트레이스를 수집하세요.

## 관련 서비스 살펴보기

### GPU 모니터링

고성능 컴퓨팅 워크로드의 성능과 안전성을 최적으로 유지하려면 OCI GPU 인스턴스 모니터링이 필수입니다. [OCI GPU 통합][22]은 `gpu_infrastructure_health` 네임스페이스를 통해 종합적인 GPU 메트릭을 제공하여 [GPU 인스턴스][23]의 정상 여부, 용량, 처리량, 상태, 성능을 추적할 수 있습니다.

OCI 통합 설정 후에 GPU 관련 네임스페이스가 메트릭 수집 구성에 포함되어 있는지 확인하세요. [OCI GPU 개요 대시보드][29](OCI GPU 통합 설정 후에 자동으로 생성됨)에서 GPU 인프라스트럭처 개요를 확인할 수 있습니다.

### Cloud Cost Management

Datadog의 [Oracle Cloud Cost Management][24]는 엔지니어링 및 금융 팀에 인프라스트럭처 변경이 비용에 미치는 영향을 확인하고, 조직 전체에 소비를 균형 있게 하며, 잠재적 개선 지점을 파악할 수 있도록 도와줍니다.

OCI용 Cloud Cost Management 활성화 방법:
1. 위에 안내된 대로 OCI 통합을 구성합니다.
2. [Oracle Cloud Cost Management 설명서][24]에 안내된 설명에 따라 비용 데이터 수집을 활성화합니다.

### Cloud SIEM

Cloud SIEM은 위협을 감지하고 조사하는 기본 통합과 규칙을 사용해 운영 및 보안 로그를 실시간으로 분석합니다.

OCI 환경에서 Cloud SIEM을 사용하는 방법:
1. OCI 통합 구성에서 로그 수집이 활성화되어 있는지 확인합니다.
2. [Cloud SIEM 시작하기][25]의 안내에 따라 위협 감지를 구성합니다.
3. [Cloud SIEM OCI 구성 가이드][26]에 따라 특정 로그 소스 및 OCI 보안 규칙을 설정합니다.

Cloud SIEM은 OCI 로그를 분석하여 다음을 감지합니다.
- 권한이 없는 액세스 시도
- 의심스러운 API 호출
- 보안 위협이 될 수 있는 구성 변화
- 컴플라이언스 위반

## 트러블슈팅

OCI 통합 과정에서 문제가 발생할 경우 [OCI 통합 트러블슈팅 가이드][27]를 확인하세요.

도움이 필요하신가요? [Datadog 지원팀][28]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[4]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
[5]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[6]: https://app.datadoghq.com/metric/explorer
[7]: https://docs.datadoghq.com/ko/infrastructure/resource_catalog/
[8]: /ko/getting_started/agent/
[9]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /ko/developers/dogstatsd/?tab=hostagent
[13]: /ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[14]: /ko/agent/kubernetes/?tab=helm
[22]: /ko/integrations/oci_gpu/
[23]: https://www.oracle.com/cloud/compute/#gpu
[24]: /ko/cloud_cost_management/setup/oracle/
[25]: /ko/getting_started/cloud_siem/
[26]: /ko/security/cloud_siem/guide/oci-config-guide-for-cloud-siem/
[27]: /ko/integrations/guide/oci-integration-troubleshooting
[28]: /ko/help/
[29]: https://app.datadoghq.com/dash/integration/31744/oci-gpu-overview
[30]: /ko/account_management/rbac/permissions/#api-and-application-keys