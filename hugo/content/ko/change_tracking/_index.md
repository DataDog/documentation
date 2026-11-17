---
description: 배포, Feature Flags, 구성 변경 사항 및 서비스의 기타 변경 사항을 모니터링하여 Change Tracking으로
  문제 해결을 간소화하세요.
further_reading:
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: 블로그
  text: 서비스 및 종속성의 변경 사항을 통합적으로 파악하기
- link: https://www.datadoghq.com/blog/ai/investigate-production-alerts/
  tag: 블로그
  text: 9B 모델에게 프로덕션 경보를 조사하도록 교육하기
- link: /monitors/status/
  tag: 문서
  text: Monitor Status Page
- link: /dashboards/
  tag: 문서
  text: Dashboards
- link: /tracing/services/service_page/
  tag: 문서
  text: 서비스 페이지
title: 변경 추적
---
## 개요 {#overview}

Change Tracking은 서비스와 종속성의 관련 변경 사항을 보여 줌으로써 문제 발생 시 더 빠르게 탐지하고 수정할 수 있도록 하여 문제 해결과 인시던트 대응을 간소화합니다.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="서비스 요약의 Recent Changes 타임라인에 있는 변경 사항의 세부 정보" style="width:100%;" >}}

Change Tracking은 다음을 포함하여 서비스 및 해당 종속성에 대한 다양한 수정 사항 모니터링을 지원합니다.
- 배포
- Feature Flags
- 트래픽 급증
- 구성 변경 사항
- 데이터베이스 수정 사항
- 스키마 변경 사항
- 규모 조정
- Kubernetes 조정
- Kubernetes 포드 충돌
- Watchdog Alerts

지원되는 특정 변경 유형 및 설정 요구 사항에 대한 자세한 내용은 [추적된 변경 유형][16]을 참조하세요.

## Change Tracking 사용 {#using-change-tracking}

Change Tracking은 Datadog의 여러 페이지에서 사용할 수 있습니다.

### Monitor Status Page {#monitor-status-page}

[Monitor Status Page][1]에서 변경 사항을 조회하고 분석하세요.

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Monitor Status Page에 표시되는 Change Tracking" style="width:100%;" >}}

#### 전제 조건 {#prerequisites}

Monitor Status Page에서 Change Tracking을 사용하려면 해당 서비스가 다음 조건을 충족하는지 확인하세요.
- 모니터 쿼리에 지정됨
- 그룹의 일부로 선택됨
- 모니터에 `service` 태그로 추가됨

#### Monitor Status Page에서 변경 사항을 분석하려면 다음 단계를 따르세요. {#to-analyze-changes-from-the-monitor-status-page}

1. 분석 중인 모니터의 Monitor Status Page로 이동합니다.
1. 페이지 상단에서 Change Tracking 타임라인을 찾습니다.
   - 여러 그래프가 있는 모니터의 경우(모니터 쿼리의 group by에 따라 결정됨) 개별 그룹으로 필터링합니다.
1. 타임라인을 이벤트 그래프와 함께 사용하여 변경 이벤트와 경보를 연관시킵니다.
1. 타임라인의 변경 표시기를 클릭하여 사이드 패널에서 변경 사항에 대한 자세한 내용을 조회합니다.
1. 사이드 패널에서 변경 사항에 대한 자세한 내용을 조사하고 다음 작업을 수행할 수 있습니다.
   - CI/CD 시스템에서 배포를 조회합니다.
   - 리포지토리에서 최신 커밋을 조회합니다.
   - 배포 간의 변경 사항을 비교하여 잠재적인 문제를 식별합니다.
   - 배포 사이드 패널에서 추가 사용자 지정 링크를 구성하여 관련 리소스에 빠르게 액세스합니다.

### 서비스 {#services}

[서비스 페이지][2]에서 변경 사항을 조회하고 분석하세요.

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="서비스 요약 섹션 내의 Recent Changes 구성 요소(종속성 변경 사항 표시됨)" style="width:100%;" >}}

#### 서비스 페이지에서 변경 사항을 분석하려면 다음 단계를 따르세요. {#to-analyze-changes-from-the-service-page}

1. 조사하려는 서비스 페이지로 이동합니다.
1. {{< ui >}}Service Summary{{< /ui >}} 섹션에서 변경 타임라인을 찾습니다.
1. 서비스 및 종속성 탭을 사용하여 다음 중 하나를 조회합니다.
   - 특정 서비스로 제한된 변경 사항({{< ui >}}Changes by Service{{< /ui >}})
   - 이 서비스에 영향을 줄 수 있는 특정 서비스 및 종속 서비스에 대한 변경 사항({{< ui >}}Changes by Service + Dependencies{{< /ui >}})
1. 변경 표시기를 클릭하여 자세한 정보를 조회하고 수정 조치를 취합니다.

### Dashboards {#dashboards}

모든 [Dashboard][3]에서 변경 사항을 조회하고 분석하세요.

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Dashboard에 표시된 Change Tracking" style="width:100%;" >}}

#### 전제 조건 {#prerequisites-1}
타임라인 내의 관련 변경 사항과 Dashboard의 오버레이를 확인하려면 최소 하나의 시계열 위젯을 설정했는지 확인하세요.

#### Dashboard에서 변경 사항을 분석하려면 다음 단계를 따르세요. {#to-analyze-changes-from-dashboards}

1. Dashboard로 이동합니다.
2. 페이지 상단에서 {{< ui >}}Show Overlays{{< /ui >}}를 클릭하여 지원되는 위젯에서 변경 타임라인 및 변경 오버레이를 활성화합니다.
3. 변경 표시기나 오버레이 위로 마우스를 가져가 변경 사항 요약을 조회합니다.
4. 변경 표시기나 오버레이를 클릭하여 자세한 정보를 조회하고 수정 조치를 취합니다.

### 위젯 {#widgets}

기본 제공 통합 외에도 Change Tracking은 Dashboard 및 Notebooks를 포함한 Datadog 전반의 위젯에서 데이터 소스로 사용할 수 있습니다.

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Change Tracking 데이터 소스 예시" style="width:100%;" >}}

Change Tracking 데이터를 사용하여 위젯을 구성하려면 다음 단계를 따르세요.

1.	Dashboard나 노트북에서 지원되는 위젯 유형(Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change 또는 Bar Chart)을 추가하거나 편집합니다.
3.	{{< ui >}}data source{{< /ui >}} 드롭다운에서 {{< ui >}}Change Tracking{{< /ui >}}을 선택합니다.
4.	필터를 구성합니다({{< ui >}}Service{{< /ui >}}는 필수).
5.	(선택 사항) 그룹화를 지원하는 위젯의 경우 {{< ui >}}Group by{{< /ui >}}를 사용하여 결과를 분할합니다.

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Change Tracking 데이터 소스 위젯" style="width:100%;" >}}

Timeseries 위젯의 경우 Change Tracking을 {{< ui >}}Event Overlay{{< /ui >}}로 활성화할 수도 있으며, 이는 시계열 위에 변경 사항을 표시하여 메트릭 동작과 연관시키는 데 도움을 줍니다.

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="Event Overlay로 표시되는 Change Tracking 데이터 소스" style="width:100%;" >}}


#### 변경 세부 정보 조회 {#view-change-details}

변경 사항 또는 변경 사항 세트에 대한 정보를 보려면 위젯의 데이터 포인트를 클릭하고 {{< ui >}}View Changes{{< /ui >}}를 선택하세요. 이 작업은 추가 세부 정보가 포함된 Change Tracking 사이드 패널을 엽니다.

## 추적 가능한 변경 유형 {#change-types-you-can-track}

Change Tracking은 배포, Feature Flags, 데이터베이스 변경, 스트리밍 및 애플리케이션 동작, 인프라 변경, 그리고 사용자가 직접 전송하는 모든 사용자 지정 변경 사항을 다룹니다.

변경 유형의 전체 목록과 각 유형의 출처인 Datadog 기능, 각 유형을 활성화하는 데 필요한 사항은 [Tracked Change Types][16]을 참조하세요.
  

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/status/
[2]: /ko/tracing/services/service_page/
[3]: /ko/dashboards/
[4]: /ko/tracing/services/deployment_tracking/
[5]: /ko/integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /ko/api/latest/events/
[7]: /ko/watchdog/
[8]: /ko/database_monitoring/
[9]: /ko/data_streams/
[10]: /ko/database_monitoring/connect_dbm_and_apm/
[11]: /ko/actions/connections/#work-with-connections
[12]: /ko/database_monitoring/schema_explorer
[13]: /ko/infrastructure/resource_catalog/resource_changes/
[15]: /ko/tracing
[16]: /ko/change_tracking/change_types/