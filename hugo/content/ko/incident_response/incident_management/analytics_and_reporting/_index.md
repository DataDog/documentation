---
aliases:
- /ko/monitors/incident_management/analytics
- /ko/service_management/incident_management/analytics/
- /ko/incident_response/incident_management/analytics
description: 대시보드 및 노트북에서 집계된 사건 관리 통계를 추적하고 분석합니다.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: 설명서
  text: 인시던트 설정
- link: https://app.datadoghq.com/dash/integration/30523/incident-management-overview
  tag: 앱 내
  text: 기본 제공 Incident Management 개요 대시보드
- link: https://app.datadoghq.com/notebook/template/11/incident-management-overview
  tag: 앱 내
  text: 기본 제공 인시던트 보고서 템플릿
title: 분석 및 보고
---
## 개요 {#overview}

{{< img src="incident_response/incident_management/analytics_and_reporting/incident_analytics.mp4" alt="Incident Management 개요 대시보드를 스크롤하여 살펴보세요." video=true style="width:100%;">}}

Incident Analytics를 사용하여 과거 인시던트에서 교훈을 얻고 인시던트 대응 프로세스의 효율성과 성능을 확인하세요. Incident Analytics를 통해 시간 경과에 따라 집계된 인시던트 통계를 가져올 수 있습니다. 이러한 통계를 사용하면 다음 작업에 도움이 되는 보고서를 만들 수 있습니다.
- 시간 경과에 따라 인시던트 대응 프로세스가 개선되고 있는지 분석
- 평균 해결 시간 평가
- 투자가 필요한 개선 영역 파악

## 수집된 데이터 {#data-collected}

Incident Management Analytics는 집계된 인시던트 통계에 대한 쿼리 가능한 데이터 소스입니다. Dashboard와 Notebooks의 다양한 그래프 위젯에서 이러한 분석을 쿼리하여 시간 경과에 따른 인시던트 대응 기록을 분석할 수 있습니다. Datadog이 기본으로 제공하며 복제 및 사용자 지정이 가능한 다음 리소스는 사용자를 위한 시작점 역할을 합니다.
- [Incident Management 개요 대시보드 템플릿][3]
- [노트북 인시던트 보고서 템플릿][4]

### 인시던트 타임스탬프 {#incident-timestamps}

인시던트에는 분석에 영향을 주는 세 가지 타임스탬프 속성이 있습니다.

* 선언 시간(`declared`): 인시던트가 선언된 시간입니다.
* 감지 시간(`detected`): 인시던트가 선언된 기본 리소스가 생성된 시간입니다. 예를 들어, 모니터링 경보가 오후 2시에 발생하고 인시던트가 오후 2시 30분에 선언된 경우, 감지 시간은 오후 2시입니다. 다른 Datadog 리소스에서 인시던트가 선언되지 않았다면 `detected` 값은 `declared` 값과 동일합니다.
* 해결 시간(`resolved`): 인시던트가 가장 최근에 해결된 시간입니다.

### 측정값 {#measures}

Incident Management에서 보고되는 다음과 같은 분석 측정값은 대시보드 및 노트북 위젯에서 분석 쿼리를 실행하는 데 사용할 수 있습니다.

{{< collapse-content title="고객이 영향을 받는 지속 기간" level="h4" >}}
고객이 영향을 받은 지속 기간입니다. 인시던트에 정의된 영향을 기준으로 합니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/Customer Impact Duration.png" alt="고객이 영향을 받는 지속 기간" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="활성 상태 지속 기간" level="h4" >}}
인시던트가 ‘활성’ 상태였던 지속 기간입니다. 인시던트 타임라인을 기준으로 합니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/Status Active Duration.png" alt="활성 상태 지속 기간" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="안정 상태 지속 기간" level="h4" >}}
인시던트 타임라인을 기준으로 인시던트가 ‘안정’ 상태였던 지속 기간입니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/StatusStableDuration.png" alt="안정 상태 지속 기간" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="감지 시간" level="h4" >}}
최초 고객 영향 발생 시점부터 인시던트 감지 시점까지의 지속 기간입니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToDetect.png" alt="감지 시간 그래픽" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="복구 시간" level="h4" >}}
인시던트 감지 시점부터 마지막 고객 영향 발생 시점까지의 지속 기간입니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToRepair.png" alt="복구 시간 그래픽" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="해결 시간" level="h4" >}}
인시던트 선언 시점부터 해결 시점까지의 지속 기간입니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToResolve.png" alt="해결 시간 그래픽" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="내부 대응 시간" level="h4" >}}
인시던트 감지 시점부터 인시던트 선언 시점까지의 지속 기간입니다.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToInternalResponse.png" alt="내부 대응 시간 그래픽" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="감지부터 해결까지의 시간" level="h4" >}}
인시던트 감지 시점부터 해결 시점까지의 지속 기간입니다. 선언 시점부터 시작되는 ‘해결 시간’과 달리, 이 측정값에는 감지와 선언 사이의 시간도 포함됩니다.
{{< /collapse-content >}}

이러한 기본값 외에도, [인시던트 설정][7]에서 사용자 지정 *숫자* 속성 필드를 추가하여 새 측정값을 만들 수 있습니다.

### 타임스탬프 재정의 {#timestamp-overrides}

인시던트 대응자가 대응 프로세스를 시작하기 전에 Datadog 인시던트를 선언하는 것을 잊을 수 있습니다. 또한 인시던트 대응 프로세스가 사실상 종료된 후에도 Datadog에서 인시던트를 해결하는 것을 잊을 수 있습니다. 이러한 실수로 인해 인시던트 분석 결과가 잘못 도출될 수 있으며, 평균 해결 시간이나 기타 측정값이 영구적으로 부풀려질 수 있습니다.

이를 해결하기 위해 조직에서는 **타임스탬프 재정의** 기능을 활성화할 수 있습니다. 이 기능을 사용하면 인시던트 대응자가 인시던트에 기록된 타임스탬프를 수동으로 재정의할 수 있습니다. 재정의가 적용되면 다음 분석 측정값에 영향을 미칩니다.

- `감지 시간`
- `내부 대응 시간`
- `복구 시간`
- `해결 시간`
- `감지부터 해결까지의 시간`

재정의는 검색, 분석, 인시던트의 **Timestamps** 섹션에 표시되는 기간, 그리고 템플릿 렌더링 시의 기간 변수에 영향을 미칩니다. 인시던트 타임라인에 자동으로 기록된 기록은 변경되지 않습니다. 인시던트 타임라인의 상태 세그먼트 누적 길이를 기반으로 하는 분석 측정값 `활성 상태 지속 기간` 또는 `안정 상태 지속 기간`에는 적용되지 않습니다.

타임스탬프 재정의를 활성화하려면 [**Incidents** > **Settings** > **Information**][11]으로 이동하세요.

타임스탬프 재정의를 생성, 업데이트 또는 삭제하려면 **Incidents Write** 권한이 있어야 합니다.

## 대시보드에서 인시던트 데이터 시각화 {#visualize-incident-data-in-dashboards}

Incident Management Analytics 데이터를 사용하여 그래프를 구성하는 단계는 다음과 같습니다.

1. [시각화 선택][5]
2. 데이터 소스 드롭다운 메뉴에서 `Incidents`를 선택합니다.
3. 노란색 드롭다운 메뉴에서 측정값을 선택합니다.
     - **기본 통계:** 인시던트 수를 셉니다.
4. 측정값에 대한 집계를 선택합니다.
5. (선택 사항) 측정값에 대한 롤업을 선택합니다.
6. (선택 사항) 검색 표시줄을 사용하여 통계를 인시던트의 특정 하위 집합으로 필터링합니다.
7. (선택 사항) 분홍색 드롭다운 메뉴에서 패싯을 선택하여 그룹별로 측정값을 나누고 표시할 제한된 수의 그룹을 선택합니다.
8. [그래프 제목 지정][6]
9. 위젯을 저장합니다.

### 예시: 서비스별로 그룹화한 주간 서비스 중단이 고객에게 영향을 미치는 지속 기간 {#example-weekly-outage-customer-impact-duration-grouped-by-service}

{{< img src="/incident_response/incident_management/analytics_and_reporting/analytics_graph_configuration.png" alt="심각도로 필터링한 인시던트 데이터 소스를 표시하여 서비스별로 그룹화한 고객이 영향을 받는 지속 기간을 보여주는 시계열 그래프 구성" style="width:90%;" >}}

이 예시 구성은 SEV-1 또는 SEV-2인 인시던트의 집계를 보여줍니다. 그래프에는 서비스별로 그룹화된 해당 인시던트의 고객이 영향을 받는 지속 기간이 표시됩니다.

1. 위젯: [시계열 라인 그래프][8]
2. 데이터 소스: `인시던트`
3. 측정값: `고객이 영향을 받는 지속 기간`
4. 집계: `avg`
5. 롤업: `1w`
6. 필터: `심각도:("SEV-1" 또는 "SEV-2")`
7. 그룹: `서비스`, 상위 5개로 제한

## 인시던트 보고서 {#incident-report}

기본 제공 노트북 템플릿을 사용하여 인시던트 보고서를 만들거나 처음부터 새로 작성하여 팀 또는 서비스의 인시던트에 대한 요약 보고서를 완성할 수 있습니다.
1. [인시던트 보고서 템플릿][9]을 엽니다.
1. 편집 및 사용자 지정을 위해 **Use Template**을 클릭합니다.
1. 기존 인시던트 셀을 사용하거나 쿼리를 사용자 지정하여 각 측정값에 대한 값을 표시할 수 있습니다.
1. 요약 셀을 관련 값으로 업데이트하고 팀원들과 [보고서를 공유][10]하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/
[2]: /ko/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /ko/dashboards/querying/#select-your-visualization
[6]: /ko/dashboards/querying/#create-a-title
[7]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[8]: /ko/dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /ko/notebooks/#share-notebooks
[11]: https://app.datadoghq.com/incidents/settings#information
[12]: /ko/incident_response/incident_management/setup_and_configuration/variables/#incident-variables