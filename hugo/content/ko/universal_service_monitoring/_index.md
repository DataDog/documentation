---
aliases:
- /ko/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
description: Universal Service Monitoring과 Datadog Agent를 사용하여 코드를 계측하지 않고 스택 전체의
  서비스 상태 메트릭을 모니터링하세요.
further_reading:
- link: /universal_service_monitoring/setup/
  tag: 설명서
  text: Universal Service Monitoring 설정
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: 블로그
  text: Universal Service Monitoring을 사용한 초 단위 핵심 신호
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: Unified Service Tagging
- link: /tracing/software_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 검색 및 카탈로그화
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: /tracing/services/services_map/
  tag: 설명서
  text: Service Map에 관해 읽어보기
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: 블로그
  text: 모니터링 및 연결 이탈 해결을 위한 모범 사례
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: 블로그
  text: Software Catalog로 개발자 경험 및 협업 개선
- link: https://learn.datadoghq.com/courses/getting-started-usm
  tag: 학습 센터
  text: Universal Service Monitoring(USM) 시작하기
title: Universal Service Monitoring
---
## 개요 {#overview}

Universal Service Monitoring(USM)은 _코드를 계측할 필요 없이_ 스택 전체의 서비스 상태 메트릭에 대한 가시성을 제공합니다. 이 기능은 오직 구성된 Datadog Agent 및 [Unified Service Tagging][1]만 사용하고, Software Catalog 및 Service Map과 같은 계측되지 않은 서비스에 관한 성능 데이터를 조회하게 해줍니다. USM은 [Deployment Tracking][2], 모니터, 대시보드, SLO와도 함께 작동합니다.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Universal Service Monitoring 데모 비디오. Service Map에서 서비스를 클릭하고 서비스 개요 보기를 선택하면 서비스 개요에 액세스할 수 있습니다." video="true" >}}

## 설정 {#setup}

지원되는 플랫폼 및 프로토콜 관련 정보와 시작 지침을 보려면 [Universal Service Monitoring 설정][7]을 참조하세요.

<div class="alert alert-info"><strong>미리 보기: 추가 프로토콜 및 암호화 방식</strong><p>USM의 클라우드 서비스 검색 기능과 추가 프로토콜 및 트래픽 암호화 방식의 디코딩 기능은 미리 보기 상태입니다. 자세한 정보를 알아보고 액세스를 요청하려면 <a href="/universal_service_monitoring/additional_protocols/">클라우드 서비스 검색 및 추가 프로토콜</a>을 참조하세요.</p></div>

## 자동 서비스 태깅 {#automatic-service-tagging}

Universal Service Monitoring은 인프라에서 실행 중인 서비스를 자동으로 감지합니다. [통합 서비스 태그][1]를 찾지 못하면 다음 중 한 가지 태그에 따라 이름을 할당합니다. `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

서비스의 이름을 업데이트하려면 [Unified Service Tagging][1]을 설정하세요.

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog이 서비스를 자동으로 감지하면, 여기에 사용된 태그가 서비스 페이지 맨 위에 표시됨" style="width:80%;" >}}

## 서비스 둘러보기 {#exploring-your-services}

Agent를 구성하고 나서 서비스가 Software Catalog에 표시될 때까지 약 5분 기다려 주세요. 서비스를 클릭하면 서비스 세부 정보 페이지가 표시됩니다. 왼쪽 상단에 있는 `universal.http.server` 또는 `universal.http.client` 작업 이름을 보면 서비스 텔레메트리가 Universal Service Monitoring에서 온 것임을 알 수 있습니다.

`universal.http.server` 작업 이름에는 서비스에 대한 인바운드 트래픽의 상태 메트릭이 포함됩니다. 해당하는 `universal.http.client` 작업 이름은 다른 대상으로의 아웃바운드 트래픽을 나타냅니다.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="서비스 탭의 작업 드롭다운 메뉴에 사용 가능한 작업 이름이 표시됨" style="width:100%;" >}}

Universal Service Monitoring을 활성화하고 나면 다음과 같은 일을 할 수 있습니다.


- **APM** > **Software Catalog** 또는 **APM** > **Service Map**으로 이동하여 [서비스 및 종속성을 시각화][3]합니다.

- 특정 서비스 페이지를 클릭하면 핵심 신호 메트릭(요청, 오류, 지속 시간)이 표시되고 [배포 추적][2]을 사용하여 이를 최근 코드 변경 사항과 상호 연계할 수 있습니다.

- `universal.http.*` 메트릭을 사용하여 [모니터][4], [대시보드][5], [SLO][6]를 생성합니다.



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: /ko/tracing/services/deployment_tracking/
[3]: /ko/tracing/software_catalog/
[4]: /ko/monitors/types/apm/?tab=apmmetrics
[5]: /ko/dashboards/
[6]: /ko/service_level_objectives/metric/
[7]: /ko/universal_service_monitoring/setup/