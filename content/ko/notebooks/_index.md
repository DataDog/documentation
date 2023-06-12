---
aliases:
- /ko/graphing/notebooks/
further_reading:
- link: https://www.datadoghq.com/blog/incident-management-templates-notebooks-list/
  tag: 블로그
  text: 문서 라이브러리 생성 및 탐색
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: 블로그
  text: 협업 노트북으로 데이터 기반 스토리를 전달하세요.
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 포스트모템(사후 분석) 생성 모범 사례
kind: 설명서
title: 노트북
---

## 개요

노트북은 그래프와 텍스트를 선형 셀 기반 형식으로 결합합니다. 이들은 사후 분석, 조사, 런북, 문서 등을 생성하여 데이터를 탐색하고 스토리를 공유하는 데 도움을 줍니다.

## 시작하기

1. 기본 탐색 **Notebooks > New Notebook**에서 [새 노트북][1]을 만듭니다.

2. **Save Notebook** 버튼을 클릭합니다. </br>
  **참고**: 새 노트북은 기본적으로 저장되지 않습니다.

3. [지원되는 그래프 및 텍스트 콘텐츠](#types-of-content)를 사용하여 노트북에 새 셀을 추가합니다.

4. [셀 설정](#cell-configuration).

## 협업

{{< img src="notebooks/collaboration.png" alt="노트북을 보고 실시간으로 편집하는 사용자의 표시기" style="width:100%;">}}

노트북은 실시간 협업을 지원합니다. 현재 상태 표시기는 노트북을 보고 있는 사람과 노트북 셀의 실시간 편집 상태를 보여줍니다. 노트북에 대한 변경 사항은 새로 고칠 필요 없이 자동으로 나타납니다.

팀 전원이 노트북을 열 수 있지만, 노트북은 `Notebooks Write` 권한이 있는 Datadog 역할만 수정하거나 삭제할 수 있습니다.

### 코멘트 달기

코멘트를 추가하려면 일부 텍스트를 선택하거나 그래프 위로 마우스를 가져갑니다. 셀 오른쪽에 **Add comment** 아이콘이 표시됩니다. 해당 코멘트에서 `@mention` 기능을 통해 팀원에게 알릴 수도 있습니다. 작성한 코멘트를 수정하거나 삭제하려면 코멘트 오른쪽 상단 모서리에 있는 세 개의 수직 점을 클릭합니다. 노트북 톱니바퀴 메뉴에서 사용할 수 있는 Comment History 사이드 패널에서 처리 완료된 코멘트를 보거나 다시 열 수 있습니다.

노트북 작성자들은 노트북의 새 댓글에 대한 이메일 알림을 받고 코멘트 작성자는 자신의 코멘트에 대한 답글에 대한 알림을 받습니다. 노트북 톱니바퀴 메뉴의 `Notifications`를 통해 알림 설정을 관리하세요.

### 보기 모드

{{< img src="notebooks/read_mode.png" alt="보기 모드 드롭다운 메뉴" style="width:100%;">}}

노트북 오른쪽 상단에 있는 드롭다운을 선택하여 노트북 내에서 모드 간에 전환할 수 있습니다.

- **Editing**: 노트북을 변경합니다.

- **Viewing**: 콘텐츠는 읽기 전용이므로, 사용자는 기존 설정 및 정보를 실수로 편집할 수 없습니다.

- **Presenting**: 각 셀이 슬라이드로 표시되는 표시 형식으로 노트북 콘텐츠를 공유합니다. 프레젠테이션 모드는 툴팁 및 범례와 같은 그래프 상호 작용을 지원합니다.

## 노트북 공유

공유 옵션을 보려면 노트북의 오른쪽 상단에 있는 톱니바퀴 아이콘을 클릭하세요. 노트북은 PDF, Markdown 또는 기타 문서 편집기로 내보낼 수 있습니다.

노트북을 문서 편집기로 복사하려면 **Copy formatted contents**를 클릭합니다. Google Docs 또는 Microsoft Word 와 같은 문서 편집기에 붙여넣어 그래프 등 노트북 콘텐츠를 원래 형식으로 볼 수 있습니다.

{{< img src="notebooks/export-to-gdocs.jpeg" alt="Google Docs에서 내보낸 노트북의 예시" style="width:100%;">}}

### 노트북 JSON 가져오기 또는 내보내기

노트북 정의가 포함된 JSON 파일을 다운로드하려면 **Export Notebook JSON**을 사용하세요. **Import Notebook JSON**은 업로드된 JSON 콘텐츠로 노트북의 모든 콘텐츠를 덮어씁니다.

### 개별 셀에 링크를 연결하기

셀의 **Share** 메뉴에서 **Link directly to cell**을 클릭하여 특정 셀의 URL을 복사합니다. 직접 연결은 시각화 및 Markdown 셀 모두에서 사용할 수 있습니다.

사용자가 특정 셀의 URL을 방문하면 노트북이 열리고 뷰포트 상단에 셀이 표시됩니다. 링크는 절대적입니다. 셀의 URL은 노트북 내에서 새 위치로 이동하더라도 같게 유지됩니다.

## 노트북 목록

{{< img src="notebooks/notebook_list.png" alt="선택한 노트북의 셀 유형을 미리 보는 노트북 목록" style="width:100%;">}}

[Notebook List][2]에서는 이전에 생성한 노트북을 보고 검색할 수 있습니다. 각 노트북의 이름, 생성자 및 마지막 수정 날짜가 표시됩니다. 노트북은 다음을 기준으로 그룹화됩니다.

* **Your Notebooks**: 사용자가 생성한 노트북.
* **All Notebooks**: 조직의 모든 노트북.
* **[Notebook Type](#notebook-types)**: 유형별로 노트북을 그룹화합니다.

위젯 유형 및 Markdown을 포함하여 콘텐츠의 미리보기를 보려면 노트북의 Preview 아이콘 위로 마우스를 가져갑니다. 노트북을 [View Mode](#view-mode)로 열려면 노트북 위로 마우스를 가져간 후 오른쪽의 **Open notebook in view mode**를 클릭하세요.

## 템플릿 갤러리
[Template Gallery][3]에서 인시던트 대응 사후 분석 및 새 노트북을 생성할 수 있는 인시던트 보고서를 포함하여 바로 사용 가능한 템플릿을 확인할 수 있습니다. 재사용 가능한 노트북 구조를 구축하기 위해 새 커스텀 템플릿을 생성할 수도 있습니다.

## 노트북 설정

### 시간 프레임

기본적으로 모든 그래프 셀들은 노트북 헤더에 설정된 글로벌 시간 프레임에 연결됩니다.

다른 시간 프레임을 보려면 글로벌 시간 선택기에서 옵션을 선택하거나 그래프를 직접 스크러빙하세요. 노트북 URL은 노트북에 저장하지 않고 이 새로운 시간 프레임을 반영하도록 업데이트됩니다.

**참고**: 그래프를 확대하기 위해 클릭하고 드래그해도 전역 시간에서 셀의 잠금이 해제되지 않습니다. 대신 이것은 노트북의 글로벌 시간을 변경합니다.

{{< img src="notebooks/set_default_time.png" alt="Set Default Time 버튼으로 노트북 글로벌 시간 저장" style="width:100%;">}}

이 시간을 노트북의 기본값으로 저장하려면 **Set Default Time**을 클릭하세요. 글로벌 시간을 이전에 저장된 기본 글로벌 시간으로 재설정하려면 재설정 버튼을 클릭하세요.

개별 셀들에 대해 글로벌 시간에서 연결을 해제한 후 독립적인 시간 프레임으로 설정할 수 있습니다.

{{< img src="notebooks/cell_time.png" alt="글로벌 시간에서 연결 해제된 셀이 있는 Cell Time Selector" style="width:100%;">}}

단일 셀에서 다른 시간 프레임을 보려면 셀을 편집하고 토글을 사용하여 글로벌 시간에서 연결을 해제하세요. 시간 선택기를 사용하거나 그래프를 스크러빙하여 시간 프레임을 변경하세요. 편집 모드에서 변경한 내용은 **Done**을 클릭하면 자동으로 저장됩니다. 변경 사항을 취소하려면 **Done** 대신 **Cancel**을 클릭하세요.

### 노트북 유형

{{< img src="notebooks/add_notebook_type.png" alt="노트북에서 강조 표시된 Add Type 버튼" style="width:100%;">}}

노트북을 유형별로 그룹화하면 관련 정보에 빠르게 액세스할 수 있습니다. 인시던트 관리 또는 모니터와 같은 다른 제품에서 구축된 노트북은 특정 유형을 자동으로 할당할 수 있습니다. 노트북 타이틀 위로 마우스를 가져가면 유형을 추가하거나 편집하는 옵션이 표시됩니다. **+ Add Type**을 클릭하여 추가하거나, 마우스를 가져갔을 때 옆에 나타나는 연필 아이콘을 클릭하여 유형을 수정할 수 있습니다.

### 그래프 스냅숏

만료될 수 있는 그래프의 스냅샷을 자동으로 생성하도록 노트북을 설정할 수 있습니다. 노트북의 톱니바퀴 메뉴에서 **Turn on snapshots**를 클릭하여 활성화하세요. 톱니바퀴 메뉴를 사용하여 스냅샷을 보거나 자동 스냅샷을 끌 수 있습니다. 기존 스냅샷에 대한 액세스를 제거하려면 자동 스냅샷을 끄세요.

{{< img src="notebooks/cog_snapshots.png" alt="스냅샷을 활성화하는 톱니바퀴 메뉴 옵션" style="width:100%;">}}

스냅샷이 활성화된 노트북은 고정 시간 범위(예: `Aug 18, 12:00 am - Aug 19, 11:59 pm`)가 있는 그래프의 정적 이미지를 자동으로 캡처합니다. 이러한 스냅샷은 고정 시간 범위가 있는 새 그래프가 업데이트될 때 함께 업데이트됩니다. 그래프를 글로벌 시간 범위(예: `Past 1 Hour`)로 변경하면 스냅샷이 제거됩니다.

편집 모드에 있는 동안 카메라 아이콘 위로 마우스를 가져가면 모든 고정 시간 그래프에서 기존 스냅숏을 미리 볼 수 있습니다.

노트북 버전을 스냅샷과 공유하려면 톱니바퀴 메뉴에서 **View snapshots**를 클릭합니다. URL을 복사하거나, 스냅샷이 활성화된 노트북의 URL에 `&view=snapshots`를 추가하세요.

### 템플릿 변수

노트북은 템플릿 변수를 지원합니다. 템플릿 변수 값을 추가하고 선택하여 시각화 범위를 동적으로 지정할 수 있습니다. 자세한 내용은 [템플릿 변수][4]를 참조하세요.

### 셀 설정

셀을 추가하려면 셀 왼쪽에 표시되는 **+** 버튼을 사용하거나, 노트북 하단의 **Add New Cell** 섹션에서 옵션을 선택하세요. 마우스를 가져다 댔을 때 셀 위에 표시되는 작업 트레이를 사용하여 셀을 공유, 복제 또는 삭제할 수 있습니다. 그래프 셀을 대시보드로 내보내거나 그래프 데이터를 PNG 또는 CSV 형식으로 다운로드할 수 있습니다. 편집 모드에서 변경한 내용은 **Done**을 클릭하면 자동으로 저장됩니다. 변경 사항을 취소하려면 **Done** 대신 **Cancel**을 클릭하세요.

#### 편집 옵션

위젯 옵션을 편집하려면 위젯의 인라인 편집기에서 **More options**를 클릭합니다. 이벤트 오버레이, 마커 및 y축 컨트롤과 같은 상세정보를 추가하세요.

#### 레이아웃 옵션

노트북 셀에서 **Edit**을 클릭하여 편집 모드에서 셀 구성을 봅니다. 셀 콘텐츠 유형에 따라 다르지만 다음을 포함하여 사용 가능한 레이아웃 옵션도 볼 수 있습니다.

* **그래프 크기**: `XS`, `S`, `M`(기본값), `L` 및 `XL` 중에서 선택하세요.
* **그래프 범례**: 범례를 숨기려면 확인란의 선택을 취소하세요. 범례는 `XS` 및 `S` 그래프에 대해 자동으로 비활성화됩니다.
* **그룹화**: 시각화의 작은 배수들을 보기 위해 태그 값당 하나의 그래프를 표시하세요.

{{< img src="notebooks/edit_cell_action_menu.png" alt="그래프 크기, 범례 및 그룹화 설정에 대한 레이아웃 옵션을 표시하는 편집 모드에서 확인 가능한 노트북 셀의 그래프 설정 옵션" style="width:100%;">}}

**참고**: 이러한 설정을 변경하면 대상 셀에만 영향을 미칩니다.

#### 콘텐츠 유형

노트북은 시각화 및 텍스트 셀을 지원합니다. 텍스트 셀은 제목, 부제목, 링크, 이미지, 목록 및 코드 블록을 사용할 수 있는 [Markdown][5]으로 형식이 지정됩니다. 노트북은 [MermaidJS][15] 형식의 다이어그램도 지원합니다.

노트북의 그래프는 메트릭, 로그 이벤트, 인덱스 스팬, 실시간 프로세스, 네트워크 트래픽, RUM 이벤트, 프로파일링 메트릭, 보안 신호 등 모든 Datadog 데이터 소스를 지원합니다. 그래프는 Datadog 쿼리 편집기로 생성됩니다. 노트북은 다음을 지원합니다.

* [시계열][6]
* [상위 목록][7]
* [표][8]
* [히트맵][9]
* [배포][10]
* [목록][11]
* [쿼리 값][12]
* [퍼널][13]
* [파이][14]

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook
[2]: https://app.datadoghq.com/notebook/list
[3]: https://app.datadoghq.com/notebook/template-gallery
[4]: /ko/dashboards/template_variables/
[5]: https://daringfireball.net/projects/markdown/
[6]: /ko/dashboards/widgets/timeseries/
[7]: /ko/dashboards/widgets/top_list/
[8]: /ko/dashboards/widgets/table/
[9]: /ko/dashboards/widgets/heat_map/
[10]: /ko/dashboards/widgets/distribution/
[11]: /ko/dashboards/widgets/list/
[12]: /ko/dashboards/widgets/query_value/
[13]: /ko/dashboards/widgets/funnel/
[14]: /ko/dashboards/widgets/pie_chart/
[15]: https://mermaid.js.org/