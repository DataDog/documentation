---
aliases:
- /ko/tracing/api_catalog/explore_and_catalog_apis/
- /ko/api_catalog/explore_and_catalog_apis/
- /ko/tracing/api_catalog/explore_apis/
- /ko/api_catalog/explore_apis/
- /ko/service_catalog/endpoints/explore_endpoints/
further_reading:
- link: /tracing/software_catalog/
  tag: 설명서
  text: Datadog Software Catalog
title: Endpoints에 대해 알아보기
---

{{< img src="tracing/software_catalog/endpoints-list.png" alt="각 엔드포인트의 성능 관련 정보를 보여주는 Software Catalog 엔드포인트 목록." style="width:100%;" >}}

## 개요

[Endpoints 목록][1]은 Datadog 조직 환경 전반의 모든 HTTP 엔드포인트에 대한 가시성을 제공합니다. 각 엔드포인트에는 HTTP 메서드(예: `GET`), URL 경로(예: `/payment/{shop_id}/purchase`) 및 관련 서비스 이름(예: `Payments`)이 표시됩니다.

<div class="alert alert-info"><strong>Endpoints</strong> 목록은 HTTP 엔드포인트만 지원합니다.</div>

## 엔드포인트 성능 살펴보기

엔드포인트 목록에는 선택한 환경 및 기간에 따른 성능 데이터가 표시됩니다.

- **열 정렬**: 열 머리글을 클릭하면 지표별로 정렬됩니다. 예를 들어, **P95**를 클릭하면 지연 시간이 상위 95번째 백분위수인 엔드포인트를 볼 수 있습니다.
- **소유권 추적**: **TEAM** 열에서 팀 소유권을 확인할 수 있습니다. 이 정보는 [Software Catalog][2]에 있는 관련 API 정의에서 가져온 것입니다. API 소유자는 API에 연결된 모든 엔드포인트를 소유합니다.
- **필터링 및 검색**: 서비스, 경로 또는 기본 태그로 검색하거나 **Service** 및 **Team**과 같은 패싯을 사용하여 필터링할 수 있습니다.
- **범위 지정**: 환경, 추가 기본 태그(예: `cluster_name`), 시간 범위를 지정합니다.

{{< img src="tracing/software_catalog/scope-data.png" alt="범위 설정을 변경하면 Endpoints 목록에 표시되는 데이터가 변경됩니다." >}}

## 엔드포인트 세부 정보 보기

엔드포인트 세부 정보 페이지를 사용하여 성능이 저하된 API를 감지하고 적시에 최적화하세요.

엔드포인트 세부 정보 페이지에 액세스하는 방법

1. Endpoints 목록에서 필터링, 정렬, 검색 옵션을 사용하여 관심 있는 엔드포인트를 쉽게 찾으세요.
1. 엔드포인트를 클릭하면 세부 정보 페이지를 볼 수 있습니다.

엔드포인트 세부 정보 페이지에는 Datadog의 다른 영역에서 나온 메타데이터, 성능 지표, 오류, 종속성 및 상관 관계가 있는 원격 측정 정보가 표시됩니다.

{{< img src="tracing/software_catalog/endpoint-details.png" alt="엔드포인트를 클릭하면 엔드포인트 세부 정보 페이지가 열리고 오류 및 종속성과 같은 정보를 볼 수 있습니다." >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /ko/software_catalog/service_definitions/v3-0/#system-and-api-pages-in-software-catalog