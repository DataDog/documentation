---
algolia:
  tags:
  - software catalog
  - catalog
aliases:
- /ko/tracing/faq/software_catalog/
- /ko/tracing/services/services_list/
- /ko/tracing/visualization/services_list/
- /ko/tracing/software_catalog/
- /ko/tracing/faq/service_catalog/
- /ko/tracing/service_catalog/
- /ko/service_catalog/
- /ko/software_catalog/
- /ko/internal_developer_portal/software_catalog/
description: Catalog는 소프트웨어 생태계와 인프라 리소스에 대한 중앙 집중식 동적 보기를 제공하며, 관측 가능성, 보안 및 비용 관리
  도구를 통합합니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: 블로그
  text: Datadog Forms를 사용하여 엔지니어링 조직 전반에서 피드백을 행동으로 전환하기
- link: /internal_developer_portal/use_cases
  tag: 설명서
  text: Catalog 사용 사례 알아보기
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: 학습 센터
  text: Catalog로 서비스 관리하기
title: Catalog
---
##  개요 {#overview}

[Catalog][1]는 소프트웨어 생태계와 인프라 리소스에 대한 중앙 집중식 동적 보기를 제공하여 스택의 모든 계층을 이해할 수 있는 단일 진입점을 제공합니다. 실시간 텔레메트리 및 자동화된 메타데이터 수집을 기반으로 구축된 Catalog는 관측 가능성, 보안 및 비용 관리 도구와 통합됩니다. 이를 통해 엔지니어링, SRE, 보안 및 플랫폼 팀은 가시성을 유지하고 운영을 최적화하며 대규모로 서비스 안정성을 증진할 수 있습니다.

{{< img src="tracing/internal_developer_portal/catalog/tour.mp4" video=true alt="IDP Catalog 탐색하기" style="width:100%;" >}}

## Catalog에서 수행할 수 있는 작업 {#what-you-can-do-in-catalog}

Catalog는 엔티티를 탐색하고 관리하는 데 도움이 되는 다양한 보기를 제공합니다. 가장 필요한 항목을 빠르게 찾으려면 Saved Views를 사용하여 자주 액세스하는 보기를 고정하세요.

- [**소유권**][8]: 팀의 Slack, 저장소 또는 온콜 정보에 액세스합니다.
- **신뢰성**: 최근 배포, 증가하는 오류율, 열린 인시던트 또는 실패한 모니터가 있는 엔타티를 표면화하여 위험을 해결합니다.
- **성능**: 환경별로 지연 시간, 트래픽, 오류율 및 Apdex를 비교합니다.
- **보안**: 단일 목록에서 취약한 라이브러리와 실시간 공격을 찾아 보안 상태를 강화합니다.
- **비용**: 코드 및 인프라 변경 사항과 연결된 AWS 비용을 추적하여 클라우드 지출을 제어합니다.
- **Software Delivery**: CI 파이프라인 상태, 정적 분석 위반 및 DORA 메트릭을 모니터링하여 배포 주기를 단축합니다.
- **관계**: 서비스에 대한 종속성 그래프를 확인하고 서비스 카드 위에 마우스를 올려 실행 중인 인프라 리소스를 확인합니다.
- **인프라**: Catalog의 전용 섹션에서 클라우드 인프라 리소스를 탐색합니다. 인프라 리소스는 해당 리소스에서 실행되는 소프트웨어 엔티티에 연결됩니다. 종속성 그래프에서 서비스를 클릭하여 해당 서비스가 실행되는 인프라로 직접 이동할 수 있습니다.

팀이 Datadog Catalog를 사용하여 지식을 중앙 집중화하고, 프로세스를 간소화하며, 운영 효율성을 개선하는 방법 등을 알아보려면 [사용 사례 문서][4]를 참조하세요.

## Catalog에 표시되는 항목 {#what-appears-in-catalog}

Catalog는 다음과 같은 경우 엔티티를 포함합니다.
- Datadog이 [텔레메트리에서 엔티티를 감지][5]하는 경우
- 사용자가 [엔티티 정의에서 엔티티를 선언][6]하는 경우
- 사용자가 Backstage 또는 ServiceNow와 같은 [타사 소스에서 엔티티를 가져오는][7] 경우

[리소스 수집을 활성화][9]하면 인프라 리소스를 볼 수 있습니다. 리소스 수집은 모든 Infrastructure Monitoring 고객에게 무료로 제공됩니다.

엔티티 유형과 이를 필요에 맞게 구성하는 방법에 대해 [자세히 알아보세요][3].

**참고**: 
- 레거시 `type` 필터(`span.type` 속성에서 제공)보다 더 정밀한 필터링을 위해 엔티티 유형을 사용하세요. 예를 들어, `datastore type` 패싯을 사용하여 특정 데이터 저장소 기술별로 필터링할 수 있습니다.
- 스팬 요약과 서비스 및 리소스 통계는 최대 30일 동안 보관됩니다. APM 트레이스 메트릭에 대한 심층 분석이 필요할 경우 Metric Explorer를 사용하세요. [APM 데이터 보존에 대해 자세히 알아보세요][2].

{{< site-region region="gov,gov2" >}}
### 서비스 유형 {#service-types}

모니터링되는 모든 서비스는 유형과 연결되어 있습니다. Datadog은 수신되는 스팬 데이터에 첨부된 `span.type` 속성을 기반으로 유형을 자동으로 결정합니다. 유형은 Datadog Agent가 통합되는 애플리케이션 또는 프레임워크의 이름을 지정합니다.

예를 들어, 공식 Flask 통합을 사용하는 경우 `Type`이 'Web'으로 설정됩니다. 사용자 정의 애플리케이션을 모니터링하는 경우 `Type`이 'Custom'으로 표시됩니다.

서비스 유형은 다음 중 하나일 수 있습니다.

*  캐시
*  사용자 지정
*  DB
*  서버리스 함수
*  웹

일부 통합은 특정 유형에 별칭을 지정합니다. 예를 들어 Postgres, MySQL 및 Cassandra는 'DB' 유형으로 매핑됩니다. Redis 및 Memcache 통합은 '캐시' 유형으로 매핑됩니다.

{{< /site-region >}}

## Dashboards에서 카탈로그 데이터 쿼리 {#query-catalog-data-in-dashboards}

**Developer Portal** 데이터 소스를 사용하여 카탈로그 데이터를 [Dashboards][10]로 직접 가져오세요. 서비스, 대기열, 프론트엔드 앱, API 및 시스템 전반에서 엔티티를 쿼리하고 소유권, 계층, 수명 주기, 정의 버전과 같은 메타데이터별로 그룹화하거나 필터링할 수 있습니다. 


데이터 소스를 사용하려면 대시보드에 위젯을 추가하고 데이터 소스로 **Developer Portal**을 선택한 다음 쿼리할 엔티티 유형을 선택하세요. 쿼리 값, 상위 목록, 표, Treemap, 원형 및 막대 위젯 유형이 지원됩니다. 

{{< img src="tracing/internal_developer_portal/catalog/catalog_datasource.png" alt="Dashboards에서 카탈로그 데이터 쿼리하기" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/data_security/data_retention_periods/
[3]: /ko/internal_developer_portal/catalog/entity_model/native_entities/
[4]: /ko/internal_developer_portal/use_cases
[5]: /ko/internal_developer_portal/catalog/set_up/discover_entities
[6]: /ko/internal_developer_portal/catalog/set_up/create_entities
[7]: /ko/internal_developer_portal/catalog/set_up/import_entities
[8]: /ko/internal_developer_portal/catalog/set_up/ownership
[9]: /ko/infrastructure/
[10]: /ko/dashboards/