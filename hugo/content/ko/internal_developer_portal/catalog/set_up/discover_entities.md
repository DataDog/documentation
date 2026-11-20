---
aliases:
- /ko/software_catalog/set_up/existing_datadog_user
- /ko/software_catalog/import_entries_dd/
- /ko/software_catalog/enrich_default_catalog/import_entries_dd
- /ko/service_catalog/import_entries_dd/
- /ko/service_catalog/enrich_default_catalog/import_entries_dd
- /ko/service_catalog/customize/import_entries_dd
- /ko/software_catalog/customize/import_entries_dd
- /ko/internal_developer_portal/software_catalog/set_up/discover_entities
description: Catalog가 APM, USM, RUM에서 엔터티를 자동으로 검색하는 방법과 인프라 메트릭 및 로그에서 추가 엔터티를 가져오는
  방법을 알아봅니다.
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: 설명서
  text: 로그 처리 파이프라인
title: 엔터티 검색
---
## 개요 {#overview}

Catalog는 Datadog Application Performance Monitoring(APM), Universal Service Monitoring(USM), Real User Monitoring(RUM)에서 엔터티를 자동으로 검색합니다. 인프라 메트릭 및 로그에서 엔터티를 가져오도록 구성할 수도 있습니다.

## APM, USM 및 RUM을 사용한 자동 검색 {#automatic-discovery-with-apm-usm-and-rum}

Datadog Catalog에는 [APM][1], [Universal Service Monitoring][2]의 eBPF 기반 자동 검색 및 RUM 애플리케이션을 통해 탐지된 항목이 미리 채워집니다.

자동으로 탐지된 모든 엔터티는 Catalog의 Component Selector에 표시됩니다.

APM 및 USM은 `service`, `datastore`, `queue`, `external providers`, `inferred services` 및 `endpoints` 엔터티 유형을 자동으로 탐지합니다. Datadog SDK는 계측된 서비스의 종속성이 직접 계측되지 않았더라도 이를 식별하고 데이터베이스, 대기열 또는 타사 API로 분류합니다. 사용자 지정 계측은 엔터티 검색 방식과 `service tag` 할당 방식에 영향을 줄 수 있습니다. 자세한 내용은 [APM 추론된 서비스][3]를 참조하세요.

RUM은 `frontend apps` 엔터티를 검색합니다.

엔드포인트 검색에 대한 자세한 내용은 [APM에서 엔드포인트 검색][5]을 참조하세요.

**참고**: 엔터티의 [성능 메트릭][6]은 해당 엔터티의 [기본 작업][7]과 연결되어 있습니다. 서비스가 USM에서만 탐지되면 성능 보기에 [USM 메트릭][9]이 표시되고, 엔터티가 APM에서만 탐지되거나 APM과 USM 모두에서 탐지되면 성능 보기에 APM [트레이스 메트릭][8]이 표시됩니다.

### 자동 명명된 서비스 관리 {#managing-automatically-named-services}

Catalog에 추론된 엔터티가 표시되는 방식을 조정하려면 다음 방법을 사용할 수 있습니다.

- [이름 변경 규칙을 생성][18]하여 사용자 지정 이름으로 엔터티를 식별합니다.
- 유형(데이터베이스, 대기열, 타사)에 따라 [엔터티를 필터링하여 제외][3]합니다.
- Catalog 또는 맵에서 `service:my-service-http-client`와 같은 [서비스 재정의를 제거][4]합니다.

### APM 상관관계 요건 {#correlation-requirements-for-apm}

APM과 Catalog 간의 올바른 자동 상관관계를 설정하려면 다음 모범 사례를 따르세요.

- Datadog SDK 및 Datadog Agent 버전이 [추론된 엔터티][15]를 지원하는지 확인합니다.
- 임의의 [서비스 재정의][16]를 사용하지 말고 [추론된 엔터티][15]를 대신 사용합니다. 
  - 임의의 서비스 재정의는 상관관계의 신뢰성을 떨어뜨리고 Catalog를 복잡하게 만들 수 있습니다. 또한 재정의 이름에 익숙하지 않은 사용자가 Catalog를 사용하기 어려워질 수 있습니다.
- 데이터 저장소 및 대기열과 같은 [추론된 엔터티의 이름을 변경][14]하여 팀의 명명 규칙에 맞춥니다.
- [Unified Service Tagging][17]을 사용하여 APM, 인프라 및 Catalog 정의 전반에서 서비스 이름, 환경 및 버전이 일치하도록 합니다.
  - Datadog APM에서 서비스는 트레이스를 그룹화하고 메트릭을 집계하는 데 사용하는 식별자이며, 반드시 논리적인 서비스를 의미하지는 않습니다. 조직에서 '서비스'로 간주할 대상(예: Kubernetes 네임스페이스, 배포 또는 개별 포드)을 정의하고 이를 모든 텔레메트리 소스에 일관되게 적용합니다. 


## 인프라 및 로그에서 엔터티 가져오기 {#import-entities-from-infrastructure-and-logs}

Catalog에 항목을 추가하려면 `DD_SERVICE` [태그][10]가 포함된 다른 Datadog 텔레메트리에서 서비스를 가져올 수 있습니다. Datadog 인프라 메트릭 또는 로그를 통해 `kind:service` 엔터티를 검색하려면 Catalog의 [**Import Entries** 탭][11]으로 이동합니다. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Catalog 설정 및 구성 섹션의 Import Entries 탭" style="width:90%;" >}}

가져온 항목은 **Explore** 탭에 표시됩니다. [API 사용][12], [GitHub 통합][13] 또는 [GitLab 통합][14]을 통해 소유자나 연락처와 같은 메타데이터를 추가하지 않으면 항목이 만료될 수 있습니다.

기본 **Explore** 보기에서 가져온 서비스를 제거하려면 [**Import Entries** 탭][11]에서 **Clear Previously Imported Services**를 클릭합니다. 메타데이터가 없거나 APM, Universal Service Monitoring(USM) 또는 Real User Monitoring(RUM) 텔레메트리가 없는 모든 서비스가 제거됩니다.

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Catalog 설정 및 구성 섹션에서 이전에 가져온 서비스 삭제 확인" style="width:90%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/universal_service_monitoring/
[3]: /ko/tracing/services/inferred_services/
[4]: /ko/tracing/guide/service_overrides/
[5]: /ko/internal_developer_portal/catalog/endpoints/
[6]: https://app.datadoghq.com/software?lens=performance
[7]: /ko/tracing/guide/configuring-primary-operation/
[8]: /ko/tracing/metrics/metrics_namespace/
[9]: /ko/universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[10]: /ko/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/software/settings/get-started
[12]: /ko/internal_developer_portal/catalog/entity_model/
[13]: /ko/integrations/github/
[14]: /ko/integrations/gitlab-source-code/
[14]: /ko/tracing/services/renaming_rules/#step-3-name-your-rule-and-review
[15]: /ko/tracing/services/inferred_services/?tab=agentv7600#set-up-inferred-services
[16]: /ko/tracing/guide/service_overrides/#how-service-overrides-are-set
[17]: /ko/getting_started/tagging/unified_service_tagging/
[18]: /ko/tracing/services/renaming_rules/