---
aliases:
- /kr/graphing/dashboards/widgets
- /kr/graphing/faq/widgets
- /kr/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: 설명서
  text: 커스텀 링크
kind: 설명서
title: 위젯
---

## 개요

위젯은 대시보드의 빌딩 블록입니다. 이들은 세 가지 유형으로 분류됩니다.

{{< whatsnext desc="Datadog 제품의 데이터를 그래프화하는 일반 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/change" >}}변경{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}디스트리뷰션{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}이벤트 스트림{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}이벤트 타임라인{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel" >}}퍼널{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}지오맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}히트 맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}호스트맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/list" >}}목록{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}로그 스트림{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart" >}}파이 차트{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}쿼리 값{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}산점도 플롯{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}표{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap" >}}트리맵{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}시계열{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}상위 목록{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" >}}토폴로지 맵{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="신서틱 모니터링 정보를 표시하는 요약 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}경고 그래포{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}경고 값{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}점검 상태{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}모니터 요약{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}서비스 수준 목표(SLO) 요약{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" >}}서비스 수준 목표(SLO) 목록{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}서비스 요약{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="대시보드를 시각적으로 구성하고 주석을 추가하는 데코레이션 위젯: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}자유 텍스트{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}그룹{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}이미지{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}프레임{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}메모 및 링크{{< /nextlink >}}
{{< /whatsnext >}}

## 전체 화면

전체 화면 모드에서 대부분의 위젯을 보고 다음을 수행할 수 있습니다.

* 타임프레임 변경
* 선택한 타임프레임만큼 앞뒤로 이동
* 현재 시간에 그래프를 일시 중지하거나 실시간 그래프 보기
* 타임프레임 재설정
* 그래프를 대시보드, 노트북으로 내보내거나 쿼리를 복사
* 그래프를 생성하는 데이터를 CSV 형식으로 다운로드

위젯 개요에 직접 액세스하려면 위젯의 오른쪽 상단 모서리에 있는 전체 화면 버튼을 클릭하세요.

[시계열 위젯][1]에 대한 추가 옵션을 사용할 수 있습니다.

## 커스텀 링크

커스텀 링크는 데이터 값을 Datadog 페이지 또는 AWS 콘솔과 같은 URL에 연결합니다.

일반 위젯 인라인 데이터와의 상호 작용을 맞춤 설정하려면 [Custom Links][2]를 참조하세요.

## 위젯 복사 및 붙여넣기

[Dashboards][3], [Notebooks][4], [APM Service][5], [APM resource][6] 페이지에서 `Ctrl + C`(Mac의 경우 `Cmd + C`)을(를) 사용하거나 공유 아이콘을 선택하고 "Copy"를 선택하여 위젯을 복사할 수 있습니다.

복사된 위젯은 다음에서 `Ctrl + V`(Mac의 경우 `Cmd + V`)을(를) 사용하여 Datadog 내에 붙여넣을 수 있습니다.

* **Dashboards**: 마우스 커서 아래에 새 위젯을 추가합니다.
* **Notebooks**: 노트북 끝에 새 셀을 추가합니다.

링크 미리보기를 표시하는 즐겨찾는 채팅 프로그램(예: Slack 또는 Microsoft Teams)에 위젯을 붙여넣을 수도 있습니다. 이 경우 위젯에 대한 직접 링크와 함께 그래프의 스냅샷 이미지가 표시됩니다.

### 위젯 그룹

타임보드 그룹 위젯은 그룹 위젯 영역 위로 마우스를 이동하고 `Ctrl + C`(Mac의 경우 `Cmd + C`)을(를) 사용하거나 공유 아이콘을 선택하고 "Copy"를 선택하여 복사할 수 있습니다.

**참고**: 스크린보드나 노트북에 그래프를 붙여넣으면 그룹 내 개별 위젯이 붙여넣어집니다.

여러 스크린보드 위젯을 복사하려면(편집 모드만 해당) 위젯을 `shift + click`하고 `Ctrl + C`(Mac의 경우 `Cmd + C`)을(를) 사용합니다.

**참고**: 이 기능은 Datadog 내에서 공유할 때만 작동합니다. 미리보기 이미지를 생성하지 않습니다.

## 그래프 내보내기

### PNG

위젯을 PNG 형식으로 다운로드하려면 위젯의 오른쪽 상단에 있는 내보내기 버튼을 클릭하고 “Download as PNG”를 선택하세요.

### CSV

시계열, 표 또는 상위 목록 위젯에서 데이터를 CSV 형식으로 다운로드하려면 위젯의 오른쪽 상단에 있는 내보내기 버튼을 클릭하고 “Download as CSV”를 선택하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/widgets/timeseries/#full-screen
[2]: /kr/dashboards/guide/context-links/
[3]: /kr/dashboards/
[4]: /kr/notebooks/
[5]: /kr/tracing/services/service_page/
[6]: /kr/tracing/services/resource_page/