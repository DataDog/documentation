---
aliases:
- /ko/graphing/dashboards/widgets
- /ko/graphing/faq/widgets
- /ko/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: 설명서
  text: 커스텀 링크
title: 위젯
---

## 개요

위젯은 대시보드의 구성 요소로, 인프라스트럭처 전체에서 데이터를 시각화하고 연계할 수 있도록 해줍니다.

### 그래프
{{< whatsnext desc="Datadog 제품에서 데이터 그래프화를 위한 일반 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/change" 
        img="dashboards/widgets/icons/change_light_large.png">}} 변경 {{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution"
        img="dashboards/widgets/icons/distribution_light_large.png">}} 배포{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel"
        img="dashboards/widgets/icons/funnel_light_large.png">}} 퍼널{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" 
        img="dashboards/widgets/icons/geomap_light_large.png">}} 지오맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map"
        img="dashboards/widgets/icons/heatmap_light_large.png">}} 히트맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart"
        img="dashboards/widgets/icons/pie_light_large.png">}} 원형 차트{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value"
        img="dashboards/widgets/icons/query-value_light_large.png">}} 쿼리 값{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot"
        img="dashboards/widgets/icons/scatter-plot_light_large.png">}} 산점도{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table"
        img="dashboards/widgets/icons/table_light_large.png">}} 표{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap"
        img="dashboards/widgets/icons/treemap_light_large.png">}} 트리맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries"
        img="dashboards/widgets/icons/timeseries_light_large.png">}} 시계열{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list"
        img="dashboards/widgets/icons/top-list_light_large.png">}} 상위 목록{{< /nextlink >}}
{{< /whatsnext >}}

### 그룹
{{< whatsnext desc="그룹 아래 위젯 표시: ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/group_default_light_large.svg">}} 그룹{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/powerpack"
        img="dashboards/widgets/icons/group_powerpack_light_large.svg">}} 파워팩{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/split_graph"
        img="dashboards/widgets/icons/group-split_light_small.svg">}} 분할 그래프{{< /nextlink >}}
{{< /whatsnext >}}

### 주석 및 임베드
{{< whatsnext desc="대시보드 시각적 구조화 및 주석 편집을 위한 꾸미기 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" 
        img="dashboards/widgets/icons/free-text_light_large.png">}} 자유 텍스트{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" 
        img="dashboards/widgets/icons/iframe_light_large.png">}} 아이프레임{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" 
        img="dashboards/widgets/icons/image_light_large.png">}} 이미지{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" 
        img="dashboards/widgets/icons/notes_light_large.png">}} 참고 및 링크{{< /nextlink >}}
{{< /whatsnext >}}

### 목록 및 스트림
{{< whatsnext desc="각기 다른 소스의 이벤트 및 이슈 목록 표시: ">}}
    {{< nextlink href="/dashboards/widgets/list"
        img="dashboards/widgets/icons/change_light_large.png">}} 목록{{< /nextlink >}}
{{< /whatsnext >}}

### 알림 및 대응
{{< whatsnext desc="모니터링 정보 표시를 위한 요약 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" 
        img="dashboards/widgets/icons/alert-graph_light_large.png">}}알림 그래프{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" 
        img="dashboards/widgets/icons/alert-value_light_large.png">}}알림 값{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" 
        img="dashboards/widgets/icons/check-status_light_large.png">}} 상태 확인{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" 
        img="dashboards/widgets/icons/monitor-summary_light_large.png">}} 요약 모니터링{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/run_workflow" 
        img="dashboards/widgets/icons/run-workflow_light_small.svg">}} 워크플로우 실행{{< /nextlink >}}
{{< /whatsnext >}}

### 아키텍처
{{< whatsnext desc="인프라스트럭처 및 아키텍처 데이터 시각화: ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" 
        img="dashboards/widgets/icons/host-map_light_large.png">}} 호스트맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" 
        img="dashboards/widgets/icons/service-map_light_large.png">}} 토폴로지맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" 
        img="dashboards/widgets/icons/service-summary_light_large.png">}} 서비스 요약{{< /nextlink >}}
{{< /whatsnext >}}

### 성능 및 안정성
{{< whatsnext desc="사이트 안정성 시각화: ">}} {{< nextlink href="/dashboards/widgets/profiling_flame_graph" img="dashboards/widgets/icons/profiling_flame_graph.svg">}} 불꽃 그래프 프로파일링 {{< /nextlink >}} {{< nextlink href="/dashboards/widgets/slo" img="dashboards/widgets/icons/slo-summary_light_large.png">}} 서비스 수준 목표(SLO) 요약{ {< /nextlink >}} {{< nextlink href="/dashboards/widgets/slo_list" img="dashboards/widgets/icons/slo-list_light_large.png">}} 서비스 수준 목표(SLO){{< /nextlink >}}{{< /whatsnext >}}

## 전체 화면

전체 화면 모드에서 대부분의 위젯을 보고 다음을 수행할 수 있습니다.

* 시간 프레임 변경
* 선택한 시간 프레임만큼 앞뒤로 이동
* 현재 시간에 그래프를 일시 중지하거나 실시간 그래프 보기
* 시간 프레임 재설정
* 그래프를 대시보드, 노트북으로 내보내거나 쿼리를 복사
* 그래프를 생성하는 데이터를 CSV 형식으로 다운로드

위젯 개요에 직접 액세스하려면 위젯의 오른쪽 상단 모서리에 있는 전체 화면 버튼을 클릭하세요.

[시계열 위젯][1]에 대한 추가 옵션을 사용할 수 있습니다.

## 커스텀 링크

커스텀 링크는 데이터 값을 Datadog 페이지 또는 AWS 콘솔과 같은 URL에 연결합니다.

일반 위젯 인라인 데이터와의 상호 작용을 맞춤 설정하려면 [Custom Links][2]를 참조하세요.

## 단위 재정의

위젯에 표시된 단위 값을 커스터마이즈하여 데이터에 컨텍스트를 추가하세요. 더 많은 사용 사례와 정보의 경우 [단위 재정의를 통한 시각화 커스터마이즈][3]를 참조하세요.
- **단위 재정의**: '메모리' 계열의 단위를 표시하도록 선택하고 Datadog이 데이터에 따라 적절한 단위(예: 메가바이트 또는 기가바이트)를 표시하도록 합니다.
- **단위 및 축척 재정의**: 단위를 단일 축척으로 고정합니다(값에 관계없이 데이터를 메가바이트로 표시).
- **커스텀 단위 정의**: 완전한 커스텀 단위를 정의합니다(예: 일반 개수 대신 '테스트').

데이터에 단위를 할당하는 대안이 아닙니다.
{{< whatsnext desc="조직 수준 단위 설정: ">}}
    {{< nextlink href="/metrics/units/">}} 메트릭 단위 설정{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} 이벤트 기반 쿼리 단위 설정{{< /nextlink >}}
{{< /whatsnext >}}

## 글로벌 시간 선택기

글로벌 시간 선택기를 사용하려면 하나 이상의 시간 기반 위젯이 `Global Time`을(를) 사용하도록 설정해야 합니다. **Set display preferences**에 있는 위젯 편집기에서 선택하거나, 위젯을 추가하세요(글로벌 시간이 기본 시간 설정임).

글로벌 시간 선택기는 동일한 대시보드에서 `Global Time` 옵션을 사용하여 모든 위젯에 대한 동일 시간 프레임을 설정합니다. 과거 이동 기간을 선택(예: `Past 1 Hour` 또는 `Past 1 Day`)하거나 `Select from calendar...` 옵션을 사용해 고정 기간을 선택합니다. 또는 [커스텀 시간대를 입력하세요][11]. 이동 기간을 선택한 경우 위젯이 업데이트되어 해당 기간으로 이동합니다.

글로벌 시간에 연결되지 않은 위젯은 글로벌 윈도우에 적용된 현지 시간 프레임의 데이터를 표시합니다. 예를 들어, 글로벌 시간 선택기가 2019년 1월 1일부터 2019년 1월 2일로 설정된 경우 `Past 1 Minute`에 대한 현지 시간 프레임으로 설정된 위젯은 오후 11시 59분부터 2019년 1월 2일 마지막 분까지를 표시합니다.

## 위젯 복사 및 붙여넣기

<div class="alert alert-warning">이 기능을 사용하려면 <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#dashboards"><code>대시보드 대중 공유</code> 권한</a>이 있어야 하고<a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"> 조직 설정에서 <strong>정적 공개 데이터 공유</strong></a>를 활성화해야 합니다.</div>

[대시보드][4], [노트북][5], [APM 서비스][6], [APM 리소스][7] 페이지에서 `Ctrl + C`(Mac의 경우 `Cmd + C`)를 사용하거나 공유 아이콘을 선택하여 위젯을 복사할 수 있습니다. 

복사된 위젯은 다음에서 `Ctrl + V`(Mac의 경우 `Cmd + V`)을(를) 사용하여 Datadog 내에 붙여넣을 수 있습니다.

* **Dashboards**: 마우스 커서 아래에 새 위젯을 추가합니다.
* **Notebooks**: 노트북 끝에 새 셀을 추가합니다.

링크 미리보기를 표시하는 즐겨찾는 채팅 프로그램(예: Slack 또는 Microsoft Teams)에 위젯을 붙여넣을 수도 있습니다. 이 경우 위젯에 대한 직접 링크와 함께 그래프의 스냅샷 이미지가 표시됩니다.

### 위젯 그룹

타임보드 그룹 위젯은 그룹 위젯 영역 위로 마우스를 이동하고 `Ctrl + C`(Mac의 경우 `Cmd + C`)을(를) 사용하거나 공유 아이콘을 선택하고 "Copy"를 선택하여 복사할 수 있습니다.

**참고**: 스크린보드나 노트북에 그래프를 붙여넣으면 그룹 내 개별 위젯이 붙여넣어집니다.

여러 스크린보드 위젯을 복사하려면(편집 모드만 해당) 위젯을 `shift + click`하고 `Ctrl + C`(Mac의 경우 `Cmd + C`)을(를) 사용합니다.

**참고**: 이 기능은 Datadog 내에서 공유할 때만 작동합니다. 미리보기 이미지를 생성하지 않습니다.

## 위젯 그래프

### 내보내기

| 형식 | 설명서            |
| -----  | ----------------------- |
| PNG    | 위젯을 PNG 형식으로 다운로드하려면 위젯 오른쪽 상단에 있는 내보내기 버튼을 클릭하고 **PNG로 다운로드**를 선택하세요. |
| CSV    | 시계열, 표, 상위 목록 위젯의 데이터를 CSV 형식으로 다운로드하려면 위젯 오른쪽 상단에 있는 내보내기 버튼을 클릭하고 **CSV로 다운로드**를 선택하세요.|

### 그래프 메뉴

대시보드 그래프를 클릭하여 옵션 메뉴를 엽니다.

| 옵션                 | 설명                                                        |
|------------------------|--------------------------------------------------------------------|
| 스냅샷 전송          | 그래프의 스냅샷을 생성하고 전송합니다.                          |
| 상관 관계에 있는 메트릭 찾기| APM 서비스, 통합 및 대시보드에서 상관관계를 찾습니다. |
| 전체 화면으로 보기    | [전체 화면 모드][5]로 그래프 보기                           |
| 커서 잠금            | 페이지에서 커서를 제자리에 잠금 처리합니다.                              |
| 관련 프로세스 보기 | 그래프 범위가 지정된 [Live Processes][6] 페이지로 이동합니다.         |
| 관련 호스트 보기     | 그래프 범위가 지정된 [Host Map][7] 페이지로 이동합니다.               |
| 관련 로그 보기      | 그래프 범위가 지정된 [Log Explorer][8] 페이지로 이동합니다.           |
| 관련 트레이스 보기    | 그래프 범위가 지정된 [Traces][9] 패널을 채웁니다.                 |
| 관련 프로필 보기  | 그래프 범위의 [프로파일링][10] 페이지로 건너뜁니다.             |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/timeseries/#full-screen
[2]: /ko/dashboards/guide/context-links/
[3]: /ko/dashboards/guide/unit-override
[4]: /ko/dashboards/
[5]: /ko/notebooks/
[6]: /ko/tracing/services/service_page/
[7]: /ko/tracing/services/resource_page/
[8]: /ko/logs/explorer/
[9]: /ko/tracing/trace_explorer/
[10]: /ko/profiler/profile_visualizations/
[11]: /ko/dashboards/guide/custom_time_frames/