---
aliases:
- /ko/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /universal_service_monitoring/setup/
  tag: 설명서
  text: 유니버설 서비스 모니터링 설정
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: 블로그
  text: 유니버설 서비스 모니터링으로 초 단위로 핵심 신호 읽기
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: 통합 서비스 태깅
- link: /tracing/service_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스 검색 및 카탈로그 작성
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 대해 자세히 알아보기
- link: /tracing/services/services_map/
  tag: 설명서
  text: 서비스 맵에 대해 더 알아보기
title: 유니버설 서비스 모니터링
---

## 개요

USM(유니버설 서비스 모니터링)를 사용하면 _코드를 계측하지 않고도_ 스택 전체에 광범위하게 서비스 상태를 가시화할 수 있습니다. Datadog 에이전트와 [통합 서비스 태깅][1]가 구성되어 있기만 하면 계측되지 않은 서비스(예: 서비스 카탈로그 및 서비스 맵)의 성능 데이터를 가시화할 수 있습니다. 또 [배포 추적][2], 모니터, 대시보드. SLO에도 USM을 사용할 수 있습니다.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="유니버설 서비스 모니터링을 설명하는 비디오. 서비스 맵에서 서비스를 클릭하고 View Service Overview를 선택해 서비스 개요를 볼 수 있음." video="true" >}}

## 설정

지원되는 플랫폼과 프로토콜, 시작하는 방법에 관한 자세한 내용은 [유니버설 서비스 모니터링 설정][7]을 참고하세요.

<div class="alert alert-info"><strong>베타 서비스: 추가 프로토콜 및 암호화 방법</strong><p>USM에는 클라우드 서비스를 확인하고 프로토콜 및 트래픽 암호화를 디코딩하는 방법을 추가 지원하는 서비스가 베타 서비스 중입니다. 이 베타 서비스에 액세스를 요청하려면 <a href="/universal_service_monitoring/additional_protocols/">클라우드 서비스 확인 및 추가 프로토콜</a>을 참고하세요. </p></div>

## 자동 서비스 태깅

유니버설 서비스 모니터링에서는 인프라스트럭처에서 실행 중인 서비스를 자동으로 탐지합니다. [통합 서비스 태그][1]를 찾지 못할 경우에는 `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service` 태그 중 하나를 기반으로 이름을 지정합니다.

서비스 이름을 업데이트하려면 [통합 서비스 태깅][1]을 설정하세요.

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog에서 자동으로 서비스를 탐지하면 해당 서비스에 사용된 태그가 서비스 페이지 상단에 표시됨" style="width:80%;" >}}

## 서비스 탐색

에이전트를 구성한 후 서비스 카탈로그에 서비스가 나타날 때까지 5분 정도 기다리세요. 그 후 서비스를 클릭하면 서비스 상세 페이지가 나타납니다. 좌측 상단에 있는 `universal.http.server` 또는 `universal.http.client`는 작업 이름이며 서비스 텔레메트리가 유니버설 서비스 모니터링에서 온 것임을 알 수 있습니다.

`universal.http.server` 작업 이름은 서비스에서 수신하는 트래픽의 메트릭 상태를 캡처합니다. 이에 대응하는 `universal.http.client` 작업 이름은 다른 대상으로 발신하는 트래픽 메트릭 상태를 나타냅니다.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="사용 가능한 작업 이름을 보여주는 서비스 탭의 작업 드롭다운 메뉴" style="width:100%;" >}}

유니버설 서비스 모니터링을 활성화한 후 다음을 할 수 있습니다.


- **APM** > **Service Catalog** 또는 **APM** > **Service Map**으로 이동해 [서비스와 종속성을 가시화][3]할 수 있습니다.

- 서비스 페이지 하나를 클릭해 핵심 신호 메트릭(요청, 오류, 지속 시간)을 확인하고 [배포 추적][2]을 사용해 이 메트릭과 최근 코드 변경 사항과의 상관 관계를 수립할 수 있습니다.

- `universal.http.*` 메트릭을 사용해 [모니터][4], [대시보드][5], [SLO][6]를 생성할 수 있습니다.



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: /ko/tracing/services/deployment_tracking/
[3]: /ko/tracing/service_catalog/
[4]: /ko/monitors/types/apm/?tab=apmmetrics
[5]: /ko/dashboards/
[6]: /ko/service_management/service_level_objectives/metric/
[7]: /ko/universal_service_monitoring/setup/