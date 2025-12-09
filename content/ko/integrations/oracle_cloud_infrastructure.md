---
app_id: oracle-cloud-infrastructure
app_uuid: c2b4d38f-dd23-4ca2-8bc4-b70360868e8c
assets:
  dashboards:
    Oracle-Cloud-Infrastructure-Overview-Dashboard: assets/dashboards/oracle-cloud-infrastructure-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - oci.mediastreams.egress_bytes
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 310
    source_type_name: Oracle 클라우드 인프라스트럭처
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 로그 수집
- 네트워크
- oracle
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_cloud_infrastructure
integration_id: oracle-cloud-infrastructure
integration_title: Oracle 클라우드 인프라스트럭처
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oracle_cloud_infrastructure
public_title: Oracle 클라우드 인프라스트럭처
short_description: OCI는 호스팅된 환경에서 다양한 애플리케이션을 지원하도록 설계된 클라우드 서비스 모음입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI는 호스팅된 환경에서 다양한 애플리케이션을 지원하도록 설계된 클라우드 서비스 모음입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle 클라우드 인프라스트럭처
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Oracle 클라우드 인프라스트럭처(OCI)는 엔터프라이즈 규모의 기업이 사용하는 서비스 제공 인프라(IaaS) 및 플랫폼 기반 서비스(PaaS)입니다. 호스팅, 스토리지, 네트워킹, 데이터베이스 등을 위한 풀 스위트(suite) 관리형 서비스를 제공해 드립니다.

Datadog의 OCI 통합을 사용하여 로그 및 메트릭을 Datadog로 포워딩하고 대시보드 구동, 트러블슈팅 지원, 보안 및 규정 준수 상태를 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

다음과 같이 OCI 메트릭을 Datadog으로 포워딩합니다.
   - [테넌시 정보 입력](#enter-tenancy-info)
   - 테넌시의 홈 리전에서 [OCI 정책 스택을 생성](#create-oci-policy-stack)하여 Datadog 인증 사용자, 그룹 및 정책을 만듭니다.
   - Datadog에 [DatadogAuthUser 정보를 입력](#enter-datadogauthuser-info)합니다.
   - 메트릭을 포워딩하려는 모든 테넌시 리전에 대한 [OCI 메트릭 포워딩 스택을 생성](#create-oci-metric-forwarding-stack)합니다.

본 아키텍처에 대한 시각화는 [아키텍처 섹션](#architecture)을 참조하세요.

#### 테넌시 정보 입력

{{% collapse-content title="Requirements for this section" level="h5" %}}
- 본 단계를 완료하려면 OCI 사용자 계정에 **클라우드 관리자** 역할이 있어야 합니다.
- 테넌시 OCID
- 홈 리전
{{% /collapse-content %}}

[Datadog OCI 통합 타일][1]에 모니터링하려는 테넌트의 OCID와 홈 리전을 입력합니다.
   - 본 정보는 [테넌시 세부정보 페이지][2]에서 확인할 수 있습니다.
   - OCI [리전 및 가용성 도메인 페이지][3]의 **리전 식별자** 값을 사용하여 홈 리전을 입력합니다.

#### OCI 정책 스택 생성

{{% collapse-content title="Requirements for this section" level="h5" %}}
- 사용자 계정은 기본 도메인에서 [동적 그룹 및 정책을 생성][4]할 수 있어야 합니다.
- 테넌트의 홈 리전에 있어야 합니다.
{{% /collapse-content %}}

<div class="alert alert-danger">화면 오른쪽 상단에서 테넌시의 <strong>홈 리전이</strong> 선택되어 있는지 확인합니다.</div>

본 정책 스택은 테넌시당 한 번만 배포해야 합니다.

1. Datadog OCI 통합 타일에서 ** 정책 스택 생성하기** 버튼을 클릭합니다.
2. Oracle 이용 약관에 동의합니다.
3. 옵션을 커스텀 Terraform 공급자 사용을 **선택하지 않음**으로 둡니다.
4. 스택의 기본 이름과 구획을 사용하거나 옵션으로 설명이 포함된 이름이나 구획을 직접 지정할 수 있습니다.
5. **Next**를 클릭합니다.
6. 생성할 동적 그룹, 사용자 그룹 및 정책의 이름을 지정하거나 제공된 기본 이름을 사용합니다.
7. **Next**를 클릭합니다.
8. **생성**을 클릭합니다.

#### DatadogAuthUser 정보 입력

{{% collapse-content title="Requirements for this section" level="h5" %}}
- `DatadogAuthUser`의 OCID
- OCI API 키 및 지문 값
{{% /collapse-content %}}

1. OCI 콘솔 검색창에 `DatadogAuthUser` 검색을 입력하고 표시되는 사용자 리소스를 클릭합니다.
2. 사용자의 OCID 값을 복사합니다.
3. [Datadog OCI 통합 타일][1]의 **사용자 OCID** 필드에 값을 붙여넣습니다.
4. OCI 콘솔로 돌아와서 다음 단계에 따라 API 키를 생성합니다.
   a. 화면 왼쪽 하단의 **리소스**에서 **API 키**를 클릭합니다.
   b. **API 키 추가**를 클릭합니다.
   c. **개인 키 다운로드**를 클릭합니다.
   d. **추가**를 클릭합니다.
   e. **설정 파일 미리보기** 팝업이 표시되지만 아무런 조치도 필요하지 않습니다. 팝업창을 닫습니다.

![OCI 콘솔의 API 키 추가 페이지][5]

5. 지문 값을 복사하여 [Datadog OCI 통합 타일][1]의 **지문** 필드에 붙여넣습니다.
6. 다음 단계에 따라 개인 키 값을 복사합니다.
   a. 다운로드한 개인 키 `.pem` 파일을 텍스트 편집기에서 열거나 `cat` 등의 터미널 명령을 사용하여 파일 내용을 표시합니다.
   b. `-----BEGIN PRIVATE KEY-----` 및 `-----END PRIVATE KEY-----` 을 포함한 전체 내용을 복사합니다.
7. 개인 키 값을 Datadog OCI 통합 타일의 **개인 키** 필드에 붙여넣습니다.

#### OCI 메트릭 포워딩 스택 생성

{{% collapse-content title="Requirements for this section" level="h5" %}}
- 사용자 계정은 구획에 리소스를 생성할 수 있어야 합니다.
- [Datadog API 키][6] 값
- `REPOSITORY_READ` 및 `REPOSITORY_UPDATE` 권한이 있는 사용자의 사용자 이름과 인증 토큰으로 이미지를 도커(Docker) 리포지토리로 가져오거나 내보낼 수 있습니다.
    - 인증 토큰을 생성하는 방법은 [인증 토큰 받기][7]를 참조하세요.
    - 필요한 정책에 대한 자세한 내용은 [리포지토리 액세스 제어 정책][8]을 참조하세요.

**참고**: 도커(Docker) 레지스트리 로그인이 올바른지 확인하려면 [Oracle 클라우드 인프라스트럭처 레지스트리에 로그인하기][9]를 참조하세요.
{{% /collapse-content %}}

**테넌시 및 리전의 각 조합**을 모니터링하려면 메트릭 포워딩 스택을 반드시 배포해야 합니다. 가장 간단히 이를 설정하려면 Datadog은 아래 제공된 ORM 스택으로 필요한 모든 OCI 리소스를 생성할 것을 권장합니다. 또는 기존 OCI 네트워킹 인프라스트럭처를 사용할 수도 있습니다.

Datadog의 ORM 스택에서 생성된 모든 리소스는 지정된 구획 및 화면 오른쪽 상단에서 현재 선택한 리전에 배포됩니다.

1. Datadog OCI 통합 타일에서 **메트릭 스택 생성하기** 버튼을 클릭합니다.
2. Oracle 이용 약관에 동의합니다.
3. **커스텀 제공자** 옵션을 선택하지 않은 상태로 둡니다.
4. 스택의 이름을 지정하고 스택을 배포할 구획을 선택합니다.
5. **Next**를 클릭합니다.
6. **Datadog API 키** 필드에 [Datadog API 키][6] 값을 입력합니다.

{{< tabs >}}
{{% tab "Create VCN with ORM (recommended)" %}}
8. **네트워크 옵션** 섹션에서 `Create VCN`이 체크된 상태로 둡니다.
{{% /tab %}}
{{% tab "Use existing VCN" %}}
기존 VCN을 사용하는 경우, 스택에 서브넷의 OCID를 제공해야 합니다. VCN이 다음과 같은 상태인지 확인합니다.
   - NAT 게이트웨이를 통해 HTTP 이그레스(egress) 호출을 할 수 있습니다.
   - 서비스 게이트웨이를 사용하여 OCI 컨테이너 레지스트리에서 이미지를 가져올 수 있습니다.
   - NAT 게이트웨이 및 서비스 게이트웨이를 허용하는 라우팅 테이블 규칙이 있습니다.
   - HTTP 요청을 전송하는 보안 규칙이 있습니다.

8. **네트워크 옵션** 섹션에서 `Create VCN` 옵션의 선택을 취소하고 다음 VCN 정보를 입력합니다.
    a. **vcnCompartment** 필드에서 구획을 선택합니다.
    b. **existingVcn** 섹션에서 기존 VCN을 선택합니다.
    c. **함수 서브넷 OCID** 섹션에 사용할 서브넷의 OCID를 입력합니다.
{{% /tab %}}
{{< /tabs >}}

9. **메트릭 설정** 섹션에서 컬렉션의 메트릭 네임스페이스를 제거합니다(옵션).
10. **메트릭 컴파트먼트** 섹션에서 모니터링할 컴파트먼트 OCID의 쉼표로 구분된 목록를 입력합니다. 이전 단계에서 선택한 메트릭 네임스페이스 필터가 각 컴파트먼트에 적용됩니다.
11. **함수 설정** 섹션에서 각 필드에 OCI 도커(Docker) 레지스트리 사용자 이름과 인증 토큰을 입력합니다. 자세한 내용은 [인증 토큰 받기][7]를 참조하세요.
12. **Next**를 클릭합니다.
13. **생성**을 클릭합니다.
14. [Datadog OCI 통합 타일][1]로 돌아가서 **설정 생성**을 클릭합니다.

**참고**:
- 기본값으로는 루트 컴파트먼트만 선택되며, Datadog OCI 통합이 지원하는 모든 메트릭 네임스페이스가 활성화됩니다(커넥터 허브당 최대 50개의 네임스페이스가 지원됨). 추가 컴파트먼트를 모니터링하기로 선택하면 메트릭 네임스페이스 제외 필터가 각 컴파트먼트에 적용됩니다.
- 리소스 관리자 스택의 Terraform 상태 파일에 액세스할 수 있는 사용자를 관리해야 합니다. 자세한 내용은 리소스 관리자 보안 페이지의 [Terraform 상태 파일 섹션][10]을 참조하세요.

#### 검증

[OCI 통합 개요 대시보드][11] 또는 Datadog의 [메트릭 탐색기 페이지][12]의 `oci.*` 메트릭을 확인합니다.

<div class="alert alert-danger">OCI 함수 메트릭 <code>(oci.faas</code> 네임스페이스) 및 컨테이너 인스턴스 메트릭 <code>(oci_computecontainerinstance</code> 네임스페이스)는 미리보기 상태입니다.</div>

#### 설정

##### 리전 추가

테넌시에서 추가 리전을 모니터링하려면 OCI 통합 타일에서 해당 테넌시로 이동합니다.
  1. **추가 지역 설정** 섹션에서 **메트릭 스택 생성하기**를 클릭합니다.
  2. 화면 오른쪽 상단에서 모니터링려는 리전으로 전환합니다.
  3. 새 리전에 대한 [OCI 메트릭 포워딩 스택 생성하기](#create-oci-metric-forwarding-stack)의 단계를 완료합니다.

##### 컴파트먼트 또는 메트릭 네임스페이스 추가

컴파트먼트를 추가하거나 활성화된 메트릭 네임스페이스의 목록을 편집하려면, 새로 생성한 [커넥터 허브][13]에서 **편집**을 클릭합니다.
   - **+ 다른 컴파트먼트 추가**를 클릭하여 다른 컴파트먼트를 추가합니다.
   - **소스 설정** 섹션의 **네임스페이스** 드롭다운으로 네임스페이스를 추가 또는 삭제합니다.

#### 아키텍처

##### 메트릭 포워딩 리소스

![본 페이지에 언급된 OCI 리소스의 다이어그램과 데이터 플로우를 나타내는 그림][14]

본 통합은 OCI [커넥터 허브][15], [함수 앱][16], 보안 네트워킹 인프라스트럭처를 생성하여 OCI 메트릭을 Datadog으로 포워딩합니다. 해당 리소스에 대한 ORM 스택은 테넌시의 리전에 대한 함수 컨테이너 리포지토리를 생성하고, 함수가 사용할 수 있도록 도커(Docker) 이미지를 업로드합니다.

##### IAM 리소스

![통합 인증에 사용되는 OCI 리소스 및 워크플로 다이어그램][17]

본 통합은 다음을 생성합니다.

 * 커넥터 허브에 액세스할 수 있도록 `resource.type = 'serviceconnectors'`이 포함된 동적 그룹.
 * Datadog이 테넌시 리소스를 읽는 데 사용하는 **DatadogAuthUser** 사용자.
 * 정책 액세스를 위해 생성되는 사용자가 추가되는 그룹.
 * 커넥터 허브가 메트릭을 읽고 함수를 호출할 수 있도록 하는 루트 컴파트먼트의 정책. 아울러, 생성된 사용자 그룹에 테넌시 리소스 읽기 액세스 권한을 부여합니다. 다음 문이 정책에 추가됩니다.

```text
Allow dynamic-group <GROUP_NAME> to read metrics in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-invocation in tenancy
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
```

### 메트릭 네임스페이스

| 통합                         | 메트릭 네임스페이스                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [자율형 데이터베이스][18]           | [oci_autonomous_database][19]                                                                                                            |
| 블록 스토리지                       | [oci_blockstore][20]                                                                                                                     |
| [컴퓨팅][21]                       | [oci_computeagent][22], [rdma_infrastructure_health][23], [gpu_infrastructure_health][24], [oci_compute_infrastructure_health][25]       |
| [컨테이너 인스턴스(미리보기)][26] | [oci_computecontainerinstance][27]                                                                                                       |
| [데이터베이스][28]                      | [oci_database][29], [oci_database_cluster][30]                                                                                           |
| 동적 라우팅 게이트웨이             | [oci_dynamic_routing_gateway][31]                                                                                                        |
| FastConnect                         | [oci_fastconnect][32]                                                                                                                    |
| 파일 스토리지                        | [oci_filestorage][33]                                                                                                                    |
| [함수 (미리보기)][34]           | [oci_faas][35]                                                                                                                           |
| [HeatWave MySQL][36]                | [oci_mysql_database][37]                                                                                                                 |
| 쿠버네티스(Kubernetes) 엔진                   | [oci_oke][38]                                                                                                                            |
| [로드 밸런서][39]                 | [oci_lbaas][40], [oci_nlb][41]                                                                                                           |
| [NAT 게이트웨이][42]                   | [oci_nat_gateway][43]                                                                                                                    |
| 오브젝트 스토리지                      | [oci_objectstorage][44]                                                                                                                  |
| 대기열                               | [oci_queue][45]                                                                                                                          |
| 서비스 커넥터 허브               | [oci_service_connector_hub][46]                                                                                                          |
| 서비스 게이트웨이                     | [oci_service_gateway][47]                                                                                                                |
| [VCN][48]                           | [oci_vcn][49]                                                                                                                            |
| [VPN][50]                           | [oci_vpn][51]                                                                                                                            |
| 웹 애플리케이션 방화벽            | [oci_waf][52]                                                                                                                            |

### 로그 수집

다음 프로세스 중 하나를 따라 Oracle 클라우드 인프라스트럭처에서 Datadog으로 로그를 전송합니다.

{{< tabs >}}
{{% tab "Service Connector Hub" %}}

1. OCI 로그를 설정합니다.
2. OCI 함수를 설정합니다.
3. OCI 서비스 커넥터를 설정합니다.

아래 지침은 OCI 포털을 사용하여 통합을 설정하는 방법입니다.

#### OCI 로깅

1. OCI 포털에서 *로깅 -> 로그 그룹*으로 이동합니다.
2. 컴파트먼트를 선택하고 **로그 그룹 생성하기**를 클릭합니다. 사이드 패널이 열립니다.
3. 이름에 `data_log_group`을 입력하고 옵션으로 설명과 태그를 입력합니다.
4. **생성하기**를 클릭하여 새 로그 그룹을 설정합니다.
5. **리소스**에서 **로그**를 클릭합니다.
6. **커스텀 로그 생성하기** 또는 **서비스 로그 활성화**를 클릭합니다.
7. **로그 활성화**를 클릭하여 새 OCI 로그를 생성합니다.

OCI 로그에 대한 자세한 내용은 [리소스 로깅 활성화][1]를 참조하세요.

#### OCI 함수

1. OCI 포털에서 *함수*로 이동합니다.
2. 기존 애플리케이션을 선택하거나 **애플리케이션 생성하기**를 클릭합니다.
3. 애플리케이션 내에서 새 OCI 함수를 생성합니다. 자세한 내용은 [Oracle 함수 개요][2]를 참조하세요.
4. 먼저 보일러플레이트(Boilerplate) 파이썬(Python) 함수를 생성하고 자동 생성된 파일을 Datadog의 소스 코드로 대체할 것을 권장합니다.
   - `func.py`를 [Datadog OCI 리포지토리][3]의 코드로 바꿉니다.
   - `func.yaml`을 [Datadog OCI 리포지토리][4]의 코드로 대체합니다. `DATADOG_TOKEN` 및 `DATADOG_HOST` 을 Datadog API 키 및 리전 로그 수집 링크로 대체해야 합니다.
   - `requirements.txt`를 [Datadog OCI 리포지토리][5]의 코드로 바꿉니다.

#### OCI 서비스 커넥터 허브

1. OCI 포털에서 *로깅 -> 서비스 커넥터*로 이동합니다.
2. **서비스 커넥터 생성하기**를 클릭하면 **서비스 커넥터 생성하기** 페이지로 이동합니다.
3. **소스**를 로깅으로, **대상**을 함수로 선택합니다.
4. **소스 연결 설정**에서 **컴파트먼트 이름**, **로그 그룹**, **로그**를 선택합니다(첫 번째 단계에서 생성한 **로그 그룹** 및 **로그**).
5. 아울러, **감사 로그**를 전송하려면 **+ 다른 로그 추가**를 클릭하고 '_감사'를 **로그 그룹**으로 교체 시 동일한 **컴파트먼트**를 선택합니다.
6. **대상 설정**에서 **컴파트먼트**, **함수 애플리케이션**, **함수**를 선택합니다(이전 단계에서 생성한 **함수 애플리케이션** 및 **함수**).
7. 정책을 생성하라는 메시지가 표시되면 **생성**을 클릭합니다.
8. 하단의 **생성**을 클릭하여 서비스 커넥터 생성을 완료합니다.

OCI 오브젝트 스토리지에 대한 자세한 내용은 [Oracle 서비스 커넥터 블로그 게시물][6]을 참조하세요.

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
{{% /tab %}}
{{% tab "Object store" %}}

1. OCI 로그를 설정합니다.
2. OCI 오브젝트 스토어를 생성하고 OCI 로그에 대한 읽기/쓰기 액세스를 활성화합니다.
3. OCI 함수를 설정합니다.
4. OCI 이벤트를 설정합니다.

아래 지침은 OCI 포털을 사용하여 통합을 설정하는 방법입니다.

#### OCI 로깅

1. OCI 포털에서 *솔루션 및 플랫폼 -> 로깅 -> 로그*로 이동합니다.
2. **커스텀 로그 생성하기**를 클릭하면 **커스텀 로그 생성하기** 페이지로 이동합니다.
3. 새 OCI 로그 이름을 지정합니다.
4. **컴파트먼트** 및 **로그 그룹**을 선택합니다. 본 선택 사항은 전체 설치에서 일관되게 유지됩니다.
5. **커스텀 로그 생성하기**를 클릭하면 **에이전트 설정 생성하기** 페이지로 이동합니다.
6. **새 설정 생성하기**를 클릭합니다.
7. 새 설정 이름을 지정합니다. 컴파트먼트가 사전 선택됩니다.
8. 그룹 유형을 **동적 그룹**으로 설정하고 기존 그룹 중 하나로 그룹화합니다.
9. 인풋 유형을 **로그 경로**로 설정하고 원하는 인풋 이름을 입력한 후 파일 경로에 "/"를 사용합니다.
10. **커스텀 로그 생성하기**를 클릭하면 OCI 로그가 생성되어 로그 페이지에서 사용할 수 있습니다.

OCI 로그에 대한 자세한 내용은 [리소스 로깅 활성화][1]를 참조하세요.

#### OCI 오브젝트 스토리지

1. OCI 포털에서 *코어 인프라스트럭처 -> 오브젝트 스토리지 -> 오브젝트 스토리지*로 이동합니다.
2. **버킷 생성하기**를 클릭하면 **버킷 생성하기** 양식으로 이동합니다.
3. 스토리지 티어로 **표준**을 선택하고 **오브젝트 이벤트 내보내기**를 체크합니다.
4. 원하는 대로 나머지 양식을 작성합니다.
5. **버킷 생성하기**를 클릭하면 버킷이 생성되고 버킷 목록에서 사용할 수 있습니다.
6. 활성 버킷 목록에서 새 버킷을 선택하고 리소스의 **로그**를 클릭합니다.
7. **읽기**를 활성화하면 **로그 활성화** 사이드 메뉴로 이동합니다.
8. **컴파트먼트** 및 **로그 그룹**을 선택합니다(OCI 로그와 동일한 선택 항목 사용).
9. **로그 이름**의 이름을 입력하고 원하는 로그 보존 기간을 선택합니다.

OCI 오브젝트 스토리지에 대한 자세한 내용은 [오브젝트 스토리지에 데이터 입력][2]을 참조하세요.

#### OCI 함수

1. OCI 포털에서 *솔루션 및 플랫폼 -> 개발자 서비스 -> 함수*로 이동합니다.
2. 기존 애플리케이션을 선택하거나 **애플리케이션 생성하기*를 클릭합니다.
3. 애플리케이션 내에서 새 OCI 함수를 생성합니다. 자세한 내용은 [Oracle 함수 개요][3]를 참조하세요.
4. 먼저 보일러플레이트(Boilerplate) 파이썬(Python) 함수를 생성하고 자동 생성된 파일을 Datadog의 소스 코드로 대체할 것을 권장합니다.
   - `func.py`를 [Datadog OCI 리포지토리][4]의 코드로 바꿉니다.
   - `func.yaml`을 [Datadog OCI 리포지토리][5]의 코드로 대체합니다. `DATADOG_TOKEN` 및 `DATADOG_HOST` 을 Datadog API 키 및 리전 로그 수집 링크로 대체해야 합니다.
   - `requirements.txt`를 [Datadog OCI 리포지토리][6]의 코드로 바꿉니다.

#### OCI 이벤트

1. OCI 포털에서 *솔루션 및 플랫폼 -> 애플리케이션 통합 -> 이벤트 서비스*로 이동합니다.
2. **규칙 생성하기**를 클릭하면 **규칙 생성하기** 페이지로 이동합니다.
3. 이벤트 규칙에 이름과 설명을 입력합니다.
4. 조건을 **이벤트 유형**으로, 서비스 이름을 **오브젝트 스토리지**로, 이벤트 유형을 **오브젝트 - 생성(Object - Create)**으로 설정합니다.
5. 작업 유형을 **함수**로 설정합니다.
6. 함수 컴파트먼트가 OCI 로그, OCI 버킷 및 OCI 함수에서 선택한 것과 동일한지 확인합니다.
7. 이전 설치 단계에 따라 함수 애플리케이션과 함수를 선택합니다.
8. **규칙 생성하기**를 클릭하면 규칙이 생성되고 규칙 목록에서 사용할 수 있습니다.

OCI 오브젝트 스토리지에 대한 자세한 내용은 [이벤트로 시작하기][7]를 참조하세요.

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}
{{< /tabs >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oracle-cloud-infrastructure" >}}


### 서비스 점검

OCI 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

OCI 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][53]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Oracle 클라우드 인프라스트럭처 모니터링하기][54]


[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://cloud.oracle.com/tenancy
[3]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: images/add_api_key.png
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[8]: https://docs.oracle.com/en-us/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access
[9]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
[10]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
[11]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[12]: https://app.datadoghq.com/metric/explorer
[13]: https://cloud.oracle.com/connector-hub/service-connectors
[14]: images/OCI_metrics_integration_diagram.png
[15]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[16]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[17]: images/OCI_auth_workflow_diagram.png
[18]: https://app.datadoghq.com/integrations/oci-autonomous-database
[19]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[20]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[21]: https://app.datadoghq.com/integrations/oci-compute
[22]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[23]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[24]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[25]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[26]: https://app.datadoghq.com/integrations/oci-container-instances
[27]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[28]: https://app.datadoghq.com/integrations/oci-database
[29]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[30]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[31]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[32]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[33]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[34]: https://app.datadoghq.com/integrations/oci-functions
[35]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[36]: https://app.datadoghq.com/integrations/oci-mysql-database
[37]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[38]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[39]: https://app.datadoghq.com/integrations/oci-load-balancer
[40]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[41]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[42]: https://app.datadoghq.com/integrations/oci-nat-gateway
[43]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[44]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[45]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[46]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[47]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[48]: https://app.datadoghq.com/integrations/oci-vcn
[49]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[50]: https://app.datadoghq.com/integrations/oci-vpn
[51]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[52]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[53]: https://docs.datadoghq.com/ko/help/
[54]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/