---
aliases:
- /ko/tracing/software_catalog/scorecards/using_scorecards
- /ko/tracing/service_catalog/scorecards/using_scorecards
- /ko/service_catalog/scorecards/using_scorecards
further_reading:
- link: /tracing/software_catalog/
  tag: 설명서
  text: 소프트웨어 카탈로그
- link: /api/latest/service-scorecards/
  tag: 설명서
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: 블로그
  text: Scorecards로 서비스 옵저버빌리티 모범 사례 우선 순위를 지정하고 확산하세요
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: 블로그
  text: 맞춤형 Scorecards로 모범 사례 공식화
- link: /continuous_integration/dora_metrics/
  tag: 설명서
  text: Datadog으로 DORA 메트릭 추적
title: 스코어카드 사용
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards는 Preview 단계입니다.
{{< /callout >}}

Scorecards를 구성한 후에는 서비스 수준 점수를 확인하고, 시간 경과에 따른 점수를 추적하며, Scorecard 보고서를 생성하여 Scorecard 정보로 팀을 자동으로 업데이트할 수 있습니다.

## 서비스 수준 세부 정보 및 점수 보기

Scorecard 요약은  Software Catalog의 [**Explore** 페이지][1]에서 **Ownership** 탭의 **Scorecards** 열 아래에 있습니다. 각 스코어카드에 관한 특정 서비스 또는 서비스 하위 집합의 성과와 각 스코어카드 내 규칙을 확인할 수 있습니다.

Scorecard에서 **View Details**를 클릭하거나 서비스 세부 정보 사이드 패널을 열어 **Scorecards** 탭을 확인하세요. 이 탭에는 모든  Scorecards, 규칙, 각 규칙에 관한 해당 서비스의 합격/불합격 점수 목록을 확인할 수 있습니다.

## 시간 경과에 따른 점수 추적

Scorecards UI에서 과거 시계열을 통해 팀이 변경 사항을 적용하고 알려진 문제를 해결하면서 시간 경과에 따른 점수의 추이를 시각화할 수 있습니다. 또한 이러한 시계열을 Dashboards와 Notebooks로 내보내 `team`, `rule`, `scorecard`, `application`, `tier`, `lifecycle`과 같은 다양한 태그로 필터링할 수 있습니다.

{{< img src="/tracing/software_catalog/scorecard-historical-metrics.png" alt="Scorecard UI에서 시간 경과에 따른 점수 변화를 보여주는 시계열" style="width:90%;" >}}

## Scorecard 보고서 생성

Scorecard 보고서를 생성하면 이 보고서는 스케줄에 따라 Scorecard 정보를 팀의 Slack 채널로 전송하여 서비스와 팀이 기대되는 기준을 얼마나 충족하고 있는지 모두가 이해할 수 있도록 도와줍니다. 보고서를 생성하면 [Datadog Workflow Automation][2]을 사용하여 예약된 시간에 실행되는 Workflow가 생성됩니다.

<div class="alert alert-warning">이 Workflow를 실행하면 청구에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">가격 페이지</a>를 참고하세요.</div>

보고서 만드는 방법:

1. Scorecards 페이지에서 **Create Report**를 클릭합니다.
2. 조직 전체에서 정의된 모든 서비스를 포함할지, 아니면 특정 팀의 서비스만 포함할지 선택합니다.
3. 보고서를 받을 날짜, 시간, 빈도를 설정합니다.
4. 보고서를 보낼 Slack 워크스페이스와 채널을 설정합니다. 선택한 채널은 공개 상태여야 하며 Datadog Slack 앱이 설치되어 있어야 합니다.
5. **Enable this Workflow**를 클릭합니다.

Datadog은 이 정보를 사용하여 가장 높은 점수와 가장 낮은 점수를 받은 규칙, 서비스, 팀에 관한 보고서를 보냅니다.

{{< img src="/tracing/software_catalog/scorecard-reports.png" alt="모든 서비스에 관한 보고서 생성 방법을 보여주는 Scorecard 보고서 생성 모달" style="width:90%;" >}}


### Scorecard 보고서 관리
Workflow를 편집하거나 삭제하려면 Scorecards 페이지에서 **Manage Reports**를 클릭하고 Workflow를 선택합니다. Settings 메뉴를 사용하여 Workflow를 편집하거나 삭제하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/service_management/workflows/