---
aliases:
- /ko/continuous_integration/dora_metrics
- /ko/dora_metrics/
description: DORA Metrics를 사용하여 조직의 Software Delivery 프로세스를 측정하고 개선하는 방법을 알아보세요.
further_reading:
- link: /delivery_performance/dora_metrics/calculation/
  tag: 설명서
  text: Datadog이 DORA Metrics를 계산하는 방법 알아보기
- link: /continuous_delivery/deployments
  tag: 설명서
  text: Deployment Visibility에 대해 알아보기
- link: /events
  tag: 설명서
  text: Event Management에 대해 알아보기
- link: /monitors/types/metric
  tag: 설명서
  text: Metric Monitors에 대해 알아보기
- link: /catalog
  tag: 설명서
  text: Catalog에 대해 알아보기
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: 블로그
  text: 플랫폼 엔지니어링 팀을 위한 성공 메트릭
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: 블로그
  text: DORA Metrics를 사용하여 소프트웨어 제공을 개선하기 위한 모범 사례
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: 블로그
  text: Datadog DORA Metrics로 소프트웨어 제공 성공을 이끄는 3가지 방법
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: 블로그
  text: 2026 State of DevSecOps 연구에서 얻은 주요 인사이트
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인하세요! (앱 로그인 필요)
is_beta: true
title: DORA Metrics
---
## 개요 {#overview}

DevOps Research and Assessment(DORA) Metrics는 소프트웨어 개발의 속도와 안정성을 나타내는 [4가지 핵심 메트릭][1]입니다.

배포 빈도
: 조직이 프로덕션 환경에 성공적으로 릴리스하는 빈도입니다.

변경 리드 타임
: 커밋이 프로덕션 환경에 반영되기까지 걸리는 시간입니다.

변경 실패율
: 실패하여 즉각적인 개입이 필요한 배포의 비율입니다.

배포 실패 복구 시간
: 실패하여 즉각적인 개입이 필요한 배포로부터 복구하는 데 걸리는 시간입니다.

DORA Metrics를 정의하고 추적하면 팀이나 조직의 소프트웨어 제공 속도 및 품질을 개선할 영역을 파악하는 데 도움이 됩니다.

## DORA Metrics 설정 {#set-up-dora-metrics}

Datadog으로 배포 이벤트를 전송하기 위한 데이터 소스 구성을 시작하려면 [설정 문서][2]를 참조하세요.

## DORA Metrics 분석 {#analyze-dora-metrics}

배포 이벤트에 대한 데이터 소스를 설정한 후 [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}}][4]로 이동하여 각 메트릭의 개선 사항이나 회귀를 확인하세요. 또한 팀, 서비스, 리포지토리, 환경, 기간 및 [사용자 지정 태그][8]별로 메트릭을 집계하여 시간 경과에 따른 추세를 비교할 수 있습니다.

{{< img src="delivery_performance/dora_metrics/dora_ui_3.png" alt="Language 사용자 지정 태그로 필터링된 DORA Metrics 계산 개요" style="width:100%;" >}}

{{< ui >}}View Deployments{{< /ui >}}를 클릭하여 배포 이벤트 목록이 포함된 새 탭을 여세요.

{{< img src="delivery_performance/dora_metrics/deployments_list.png" alt="메트릭 분석과 관련 이벤트 목록을 보여주는 배포 분석" style="width:100%;" >}}

{{< ui >}}View Change Failures{{< /ui >}}를 클릭하여 변경 실패로 표시된 배포 이벤트 목록이 포함된 측면 패널을 여세요.

{{< img src="delivery_performance/dora_metrics/change_failures_list.png" alt="메트릭 분석과 관련 이벤트 목록을 보여주는 변경 실패 분석" style="width:100%;" >}}

## DORA Metrics 데이터 사용 {#use-dora-metrics-data}

### DORA Metrics 위젯 내보내기 {#export-dora-metrics-widgets}
시각화 위젯을 대시보드나 노트북으로 내보내세요.

시각화에서 {{< ui >}}Export{{< /ui >}} 아이콘을 클릭하여 대시보드나 노트북에 추가하세요. DORA Metrics에서 계산하는 메트릭에 대한 자세한 내용은 [수집된 데이터 문서][3]를 참조하세요.

### 사용자 지정 대시보드 생성{#create-custom-dashboards}

DORA Metrics를 사용하여 사용자 지정 대시보드를 구축하고 커밋 및 풀 리퀘스트부터 프로덕션 배포까지의 전체 워크플로를 분석하세요. 예를 들어, 팀 간의 코드 검토 성과를 비교하여 승인 지연으로 인해 차질이 발생한 팀을 파악하고 워크플로 개선에 투자할 우선순위를 정하세요.

{{< img src="delivery_performance/dora_metrics/dashboard.png" alt="사용자 지정 DORA Metrics Dashboard 예시" style="width:100%;" >}}

대시보드와 그래프 내에서 사용자 지정 태그는 [속성][7]으로 처리됩니다. 사용자 지정 태그로 필터링하거나 그룹화하려면 태그 앞에 `@` 기호를 붙여야 합니다.

{{< img src="delivery_performance/dora_metrics/graph_with_custom_tag.png" alt="태그별로 그룹화된 사용자 지정 DORA Metrics 그래프의 예시" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /ko/delivery_performance/dora_metrics/setup/
[3]: /ko/delivery_performance/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /ko/monitors/types/metric/?tab=threshold
[6]: /ko/monitors/
[7]: /ko/dashboards/guide/quick-graphs/#graphing-events
[8]: /ko/delivery_performance/dora_metrics/data_collected/#custom-tags