---
aliases:
- /ko/tracing/servicemap
- /ko/tracing/visualization/services_map/
description: 서비스 맵은 Datadog 애플리케이션 성능 모니터링(APM)에서 수집하는 데이터를 시각화합니다.
further_reading:
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 애플리케이션 성능 모니터링(APM) 추적 설정 방법 알아보기
- link: https://www.datadoghq.com/blog/service-map/
  tag: 블로그
  text: Datadog 서비스 맵을 소개합니다.
- link: https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/
  tag: 블로그
  text: 서비스 맵(Datadog + Airbnb)을 통해 컨텍스트 생성하기
kind: 설명서
title: 서비스 맵
---

서비스 맵은 애플리케이션을 모든 구성 요소[서비스][1]로 분해하고 이들 서비스 간에 관찰된 종속성을 실시간으로 도출하여 병목 현상을 식별하고 아키텍처를 통해 데이터가 어떻게 흐르는지 이해할 수 있도록 해줍니다.

{{< img src="tracing/visualization/services_map/service_map_overview_3.png" alt="서비스 맵 개요" >}}

## 설정

서비스 맵은 Datadog 애플리케이션 성능 모니터링(APM) 및 RUM에서 수집한 데이터를 시각화합니다. [서비스][1]을 보기 위해 설정이 필요하지 않습니다.

## 사용 방법

서비스 맵은 서비스 및 상태에 대한 개요를 제공합니다. 이를 통해 노이즈를 차단하고 문제 영역을 분리할 수 있습니다. 또한 이 보기에서 Datadog에서 수집한 다른 원격 분석에 직접 액세스할 수 있습니다.

## 서비스의 종속성 식별

서비스 맵은 다른 환경에 있는 종속성을 포함하여 서비스 종속성에 대한 전체 그림을 제공합니다. 예를 들어 서비스 이 환경 `prod`에만 배포되어 있더라도 맵에는 `staging` (및 기타 환경)의 서비스에 대한 연결이 표시됩니다. 

## 팀 또는 애플리케이션별로 그룹화

서비스 맵을 팀 또는 애플리케이션별로 그룹화하여 서비스 소유권 및 애플리케이션 종속성에 대한 명확한 그림을 만들 수 있습니다. 이는 복잡한 마이크로서비스 아키텍처를 보다 세분화된 수준에서 시각화하여 조직이 필요한 정보에 빠르게 도달할 수 있도록 해주기 때문에 특히 유용합니다. 

## 필터링 대 변경 범위

서비스 맵은 패싯 또는 서비스 이름에 대한 퍼지 문자열 일치를 사용하여 필터링할 수 있습니다. 패싯은 Datadog가 서비스 데이터에 자동으로 적용하는 태그로, 서비스 유형(예: 웹 서버, 데이터베이스, 캐시), 마지막 배포 시간 또는 모니터링 상태를 포함합니다. 필터링은 특히 수백 또는 수천 개의 노드가 있는 마이크로 서비스( 환경 )에서 유용합니다. 서비스 인시던트 상태별로 필터링하여 진행 중이거나 해결된 인시던트에 관련된 사람들을 식별하고 관련 서비스(현황) 페이지에서 인시던트 데이터, 리소스 및 Datadog 팀 정보를 포함한 주요 정보를 추출할 수도 있습니다. 범위 또한 서비스 맵을 특정 시간 범위로 설정하여 진화하는 아키텍처를 추적할 수 있습니다.

서비스는 또한 `env` 및 선택적으로 [두 번째 기본 태그][3]로 범위가 지정됩니다. 드롭다운을 사용하여 다른 범위을 선택하면 해당 범위 내에 서비스로 구성된 완전히 다른 맵이 그려집니다. 이러한 서비스는 다른 환경에서 서비스를 호출하거나 서비스로 호출될 수 없습니다.

## 조사

서비스 위로 마우스를 가져가면 강조 표시되고 해당 요청 트래픽이 움직이는 선으로 표시되어 방향성을 더 잘 강조합니다.

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="서비스 맵" video="true" width="90%" >}}

서비스를 클릭하면 해당 서비스을 검사할 수 있는 옵션이 제공됩니다. 그러면 서비스가 분리되어 다른 서비스로부터 요청 소스가 표시되고 서비스 이 다른 서비스로 보낸 데이터 요청이 표시됩니다. 일반적으로 왼쪽에 있는 서비스가 고객과 더 가깝고 오른쪽에 있는 것이 근본 원인일 가능성이 높습니다.

검사 페이지에서 각 노드를 검사하여 서비스 맵 종속성을 한 번에 하나씩 피벗할 수 있습니다.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="서비스 맵" style="width:90%;">}}

필터( 검색 바 또는 패싯을 통해 적용)에 필터에 없는 서비스 하나 이상으로 연결된 서비스 두 개가 있는 경우 노드가 축소됩니다.

{{< img src="tracing/visualization/services_map/service_map_collapsed.png" alt="서비스 맵 축소 노드" style="width:50%;">}}

## "서비스" 태그

서비스를 클릭하면 추가 필터링 옵션이 표시됩니다:

{{< img src="tracing/visualization/services_map/service_map_inspect_menu_2.png" alt="서비스 맵 태그" style="width:40%;">}}

서비스 태그는 Datadog에서 특별한 의미를 가지며, 애플리케이션 성능 모니터링(APM) 서비스를 식별하고 제품의 다른 부분으로 연결하는 데 사용됩니다.

다음 스크린샷은 `service:fse-auto-process` 에 대한 대시보드 쿼리를 보여줍니다. 이는 애플리케이션 성능 모니터링(APM)으로 태그가 자동 지정됩니다.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="서비스 맵 대시보드" style="width:90%;">}}

호스트 맵 또는 로그에서 동일한 키로 이 태그를 사용하면 비즈니스에 애플리케이션을 연결할 수 있습니다. 위에 표시된 시각화 메뉴에서 각 옵션은 `service`로 범위가 지정된 수집 데이터에 대한 적절한 보기로 피봇됩니다.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="서비스 맵 태그" style="width:80%;">}}

또한 모니터는 **상황 설명하기** 섹션에서 서비스로 태그를 지정할 수 있습니다. 이렇게 하면 커스텀 비즈니스 메트릭을 포함한 모든 메트릭에 대한 모니터를 서비스에 연결할 수 있습니다. 모니터의 상태는 모니터의 서비스 맵에서 직접 노출됩니다.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="서비스 맵 모니터" style="width:90%;">}}

## 데이터의 최신성 및 의미

### 노드 및 에지

노드는 애플리케이션 성능 모니터링(APM)에서 계측된 서비스를 정확히 나타내며, [서비스 카탈로그][4]의 항목과 일치합니다. 에지는 한 서비스에서 다른 서비스로의 총 호출을 나타냅니다. 이러한 상호 작용은 각 개별 [트레이스][5]에 대한 불꽃 그래프에 표시됩니다.

새로운 서비스 또는 연결은 계측된 직후에 나타나며, 30일 동안 해당 트레이스가 나타나지 않으면 사라집니다. 여기에는 드물게 작동하지만 시스템 작동의 중요한 부분인 서비스도 포함됩니다.

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="서비스 맵 노드" video="true" width="90%">}}

### 색상

모니터각 서비스에 대해 활성화된 경우 해당 모니터링 상태에 따라 테두리에 녹색, 노란색, 빨간색 또는 회색으로 가중치가 부여된 테두리가 표시됩니다. 모니터가 여러 개 정의된 경우 가장 심각한 상태의 모니터링 상태가 사용됩니다.

모니터는 애플리케이션 성능 모니터링(APM) 모니터로 제한되지 않습니다. 위에서 설명한 서비스 태그를 사용하여 모니터링 유형을 서비스에 연결할 수 있습니다.

### 이용 가능 여부

서비스 맵 은 루트 스팬(span)을 포함한 완전한 트레이스를 기반으로 렌더링됩니다. 지정한 쿼리 기간 동안 일부 스팬(span)이 누락된 경우 해당 기간 동안 맵 보기를 사용할 수 없을 수 있습니다. 이는 [애플리케이션 성능 모니터링(APM) 연결 오류][6]가 발생하여 스팬(span)이 삭제된 경우에 발생할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#services
[3]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://app.datadoghq.com/services
[5]: /ko/tracing/glossary/#trace
[6]: /ko/tracing/troubleshooting/connection_errors