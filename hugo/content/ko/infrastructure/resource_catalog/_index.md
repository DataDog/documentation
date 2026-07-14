---
aliases:
- /ko/security_platform/cspm/resource_catalog
- /ko/security/cspm/resource_catalog
- /ko/security/misconfigurations/resource_catalog
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: 설명서
  text: Cloud Security Misconfigurations
- link: /security/threats/
  tag: 설명서
  text: Workload Protection
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: 블로그
  text: Datadog Resource Catalog를 사용하여 인프라 리소스 거버넌스 수행
- link: https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/
  tag: 블로그
  text: Recent Changes를 사용하여 인프라 문제를 더 빠르게 해결
- link: https://www.datadoghq.com/blog/resource-catalog-natural-language-querying
  tag: 블로그
  text: Resource Catalog에서 자연어를 사용하여 다중 클라우드 인프라 쿼리
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: 블로그
  text: Cambia Health Solutions가 Cloud Cost Management 및 Datadog Resource Catalog를
    통해 월 30,000달러를 절감한 방법
is_beta: true
title: Datadog Resource Catalog
---
## 개요 {#overview}

Datadog Resource Catalog는 모든 인프라 리소스의 중앙 허브입니다. 이를 통해 리소스 규정 준수를 관리하고, 인시던트의 근본 원인을 조사하며, 인프라의 관측성 공백을 해소할 수 있습니다. Resource Catalog를 사용하면 리소스에 대한 메타데이터, 소유권, 구성, 자산 간 관계, 활성 보안 위험과 같은 주요 정보를 파악할 수 있습니다.

Resource Catalog는 Datadog 클라우드 통합 및 Datadog Agent를 활용하여 호스트, 데이터베이스, 스토리지 서비스 등의 클라우드 리소스로부터 데이터를 수집합니다.

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="리소스 유형별로 그룹화된 Catalog 탭을 보여주는 Resource Catalog 페이지" width="100%">}}

### 사용 사례 {#use-cases}

#### 리소스 정책 및 보고 {#resource-policies-and-reporting}
- 소유권, 버전 관리, 마이그레이션 등의 측면에서 인프라의 규정 준수 상태를 파악합니다.
- 텔레메트리 전반에 걸친 인사이트를 최적화하기 위해 우수한 태그 관리 방식을 정착시킵니다.
- 서비스 종속성의 보안 취약점을 식별하고 수정하여 애플리케이션 위험을 줄입니다.
- 엔지니어링 리더십에 팀 및 클라우드 계정 전반의 보안 관행에 대한 상위 수준의 가시성을 제공합니다.
- 기록 보관 또는 감사 목적으로 리소스를 내보냅니다.

#### 인시던트 및 성능 문제 해결 {#troubleshoot-incidents-and-performance-issues}
- 리소스의 상태 및 성능을 파악할 수 있도록 풍부한 인사이트를 제공하는 텔레메트리, 대시보드 및 기타 Datadog 보기를 사용합니다.
- 관련 리소스의 팀 및 서비스 소유자를 찾아 인시던트 복구 시간을 단축합니다.
- 리소스 구성 변경 사항을 확인하여 가능한 근본 원인을 식별합니다.

#### 관측성 최적화 {#optimize-observability}
- Datadog으로 더 효과적으로 모니터링할 수 있는 리소스를 찾아 관측성 공백을 해소합니다.
- 구성 오류 발생 가능성이 높거나 Cloud Security Misconfigurations를 적극적으로 보고하지 않는 리소스를 식별하여 적절한 보안 적용 범위를 확보합니다.

## 설정 {#setup}

기본적으로 Resource Catalog로 이동하면 Datadog Agent가 모니터링하는 호스트와 CNM(Cloud Network Monitoring), DBM(Database Monitoring)과 같은 다른 Datadog 제품을 위해 수집된 클라우드 리소스를 확인할 수 있습니다. Resource Catalog에서 추가 클라우드 리소스를 보려면 [Resource Catalog][5] 설정 페이지에서 **Extend Resource Collection**을 활성화합니다. 

{{< img src="/infrastructure/resource_catalog/resource_catalog_settings.png" alt="리소스 수집 확장을 위한 Resource Catalog 구성 페이지" width="100%">}}

<div class="alert alert-warning">리소스 수집을 활성화하면 AWS CloudWatch 비용이 증가할 수 있습니다. 이 비용을 방지하려면 <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>의 <strong>Metric Collection</strong> 탭에서 <strong>Usage</strong> 메트릭을 비활성화하세요.
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="계정 설정의 AWS Usage 토글" style="width:100%;" >}}

## Resource Catalog 탐색 {#browse-the-resource-catalog}

[Resource Catalog 페이지][2]에서 Datadog 조직의 클라우드 리소스를 탐색하세요. 카탈로그는 Agent가 설치된 리소스나 클라우드 통합이 구성된 리소스를 자동으로 감지합니다. 

### Catalog 탭 {#catalog-tab}

Catalog 탭은 팀 소유권 및 관련 서비스를 포함한 리소스 컨텍스트를 보여줍니다. 이를 통해 인시던트 발생 전에 누락된 소유권 정보를 사전에 식별하고 보완할 수 있습니다. Resource Catalog는 리소스 유형별로 사용자 지정된 리소스 속성도 보여줍니다. 호스트의 인스턴스 유형이나 데이터베이스 버전과 같은 특정 속성을 기준으로 리소스를 검색할 수 있습니다.

**참고**: [Datadog Teams][4]를 사용하는 경우 왼쪽 패널에서 **Teams** 토글을 선택한 후 자신에게 할당된 팀의 토글을 선택하면 해당 팀에 할당된 리소스만 볼 수 있습니다. 또한 목록 오른쪽 상단에서 Resource Catalog 목록을 CSV 파일로 내보낼 수 있습니다.

목록에 있는 리소스의 해당 클라우드 콘솔에 액세스하려면 리소스를 클릭하여 사이드 패널을 엽니다. 그런 다음 오른쪽 상단의 **Open Resource** 드롭다운을 클릭합니다.

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Open Resource 드롭다운을 강조 표시한 Resource Catalog 사이드 패널" >}}

### 호스트 또는 리소스 조사 {#investigate-a-host-or-resource}

<div class="alert alert-info">이 패널에는 시크릿이 표시되지 않습니다. 표시되는 “시크릿”은 모두 무작위로 생성된 문자열이며 보안 위험을 초래하지 않습니다.</div>

호스트를 클릭하면 다음과 같은 세부 정보가 포함된 사이드 패널이 열립니다.

- **호스트 정보**: 호스트 이름, 계정, 운영 체제, 인스턴스 유형, 태그 및 관련 메타데이터 등의 정보
- **호스트 요약**: 활성 모니터링 경보 및 활성화된 제품 표시
- **텔레메트리**: 메트릭, 로그, 트레이스 및 프로세스 포함
- **컨테이너**: 호스트에 연결된 컨테이너의 메트릭 표시
- **인프라 맵**: [Cloudcraft 다이어그램][17] 표시
- **관계**: 다른 리소스와의 연결 관계를 보여주는 대화형 맵 표시
- **프로필**: 호스트와 연관된 프로파일 표시([Profiler][20] 필요)
- **네트워크** 정보: 태그를 기준으로 필터링할 수 있으며 사용자 지정 가능한 그래프로 표시됩니다.
- **변경 사항**: 호스트에 대한 사용자 지정 가능한 변경 이력을 표시합니다.
- **보안y**: 일반 구성 오류, [IaC Scanning 구성 오류][21], 신호, 취약점, ID 위험 및 액세스 인사이트를 표시합니다.
- **비용**: 호스트 비용 절감을 위한 권장 사항을 제공합니다.
- **Agent**: Agent 구성을 JSON 형식으로 표시합니다.
- **OTel Collector** OpenTelemetry Collector 구성을 표시합니다(미리보기).

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel-2.png" alt="호스트 사이드 패널이 열린 Resource Catalog" width="100%">}}

리소스를 클릭하면 다음과 같은 세부 정보가 포함된 사이드 패널이 열립니다.

- **리소스 정보**: 리소스별 태그 및 JSON 형식의 리소스 정의를 포함
- **텔레메트리**: 메트릭 및 로그를 포함
- **관계**: 다른 리소스와의 연결 관계를 보여주는 대화형 맵 표시
- **변경 사항**: 리소스 변경 이력을 표시
- **보안**: 구성 오류, 신호, 취약성 및 ID 위험을 표시

## 리소스 변경 사항(미리보기) {#resource-changes-in-preview}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
리소스 변경 사항은 미리보기 상태입니다. <strong>Request Access</strong>를 클릭한 후 양식을 작성하여 액세스를 요청하세요.
{{< /callout >}} 

Resource Changes는 클라우드 인프라 구성 변경 사항에 대한 가시성과 제어 기능을 제공합니다. 이를 통해 리소스 변경을 모니터링하여 인시던트 문제 해결을 지원하고 환경이 어떻게 변화했는지 파악할 수 있습니다.

자세한 내용은 [Resource Changes][16]를 참조하세요.

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Datadog Resource Changes 인터페이스는 인프라 구성 변경 사항 목록을 보여줍니다. 화면에는 “vm-new-jmcintyre-kafka”라는 VM 인스턴스가 표시되며, StorageProfile 업데이트와 함께 JSON 형식의 변경 내용을 나란히 비교하는 diff 보기가 제공됩니다. 표에는 타임스탬프, 변경 유형(대부분 “UPDATE”), 수정 세부 정보와 함께 여러 리소스가 표시됩니다. 상단에는 클라우드, 리전, 환경 및 기타 속성 기준으로 필터링할 수 있는 필터가 제공됩니다." width="100%">}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /ko/integrations/#cat-notification
[4]: /ko/account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /ko/integrations/amazon_config/#resource-changes-collection
[7]: https://app.datadoghq.com/integrations
[8]: /ko/integrations/google_cloud_platform/#resource-changes-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/ko/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/ko/security/threats/
[12]: https://docs.datadoghq.com/ko/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/ko/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
[15]: https://docs.datadoghq.com/ko/infrastructure/resource_catalog/schema/
[16]: /ko/infrastructure/resource_catalog/resource_changes/
[17]: /ko/datadog_cloudcraft/
[18]: /ko/integrations/ntp/
[19]: /ko/infrastructure/process/?tab=linuxwindows#installation
[20]: /ko/profiler/enabling/
[21]: /ko/security/code_security/iac_security/