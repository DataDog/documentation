---
description: Datadog 대시보드에서 위젯을 구성하는 방법(전체 화면, 사용자 지정 링크, 메트릭 정보, 단위 재정의 옵션 포함)을 알아보세요.
further_reading:
- link: /dashboards/widgets/
  tag: 설명서
  text: 위젯 개요
- link: /dashboards/widgets/types
  tag: 설명서
  text: 위젯 유형
title: 위젯 구성
---
## 개요 {#overview}

위젯 구성은 인프라 및 애플리케이션에 대한 의미 있는 통찰력을 제공하는 효과적인 대시보드를 만드는 데 필수적입니다. 이 가이드에서는 위젯을 설정할 때 이해해야 할 주요 구성 옵션과 고려 사항을 다룹니다.


## 전체 화면 {#full-screen}

전체 화면 모드는 위젯에 대한 향상된 보기 및 분석 기능을 제공합니다. 전체 화면 모드에서 대부분의 위젯을 보고 다음을 수행할 수 있습니다.

* 시간 프레임 변경
* 선택한 시간 프레임만큼 앞뒤로 이동
* 현재 시간에 그래프를 일시 중지하거나 실시간 그래프 보기
* 시간 프레임 재설정
* 그래프를 대시보드, 노트북으로 내보내거나 쿼리를 복사
* 그래프를 생성하는 데이터를 CSV 형식으로 다운로드

위젯 개요에 직접 액세스하려면 위젯의 오른쪽 상단에 있는 전체 화면 버튼을 클릭하세요.

[시계열 위젯][1]에 대한 추가 옵션을 사용할 수 있습니다.

## 데이터 미리 보기 {#data-preview}

그래프 편집기에서 여러 데이터 소스를 조인하여 추가 컨텍스트 및 메타데이터로 시각화를 보강할 수 있습니다. 데이터 미리 보기를 통해 조인하려는 데이터가 무엇인지, 쿼리가 예상대로 작동하는지 확인할 수 있습니다. 이 기능을 통해 다음을 수행할 수 있습니다.

- 데이터 구조 및 열 이름 확인
- 일치하는 키 식별
- 전체 쿼리를 실행하기 전에 결과 유효성 검사

{{% collapse-content title="예시" level="h3" expanded=false %}}
결제 로그를 제품 세부 정보가 포함된 참조 표(조회 표)와 조인하여 트랜잭션 데이터와 함께 판매 가격이나 출시 날짜를 표시할 수 있습니다. 또는 Salesforce나 Snowflake와 같은 외부 소스에서 고객 정보를 가져와 RUM 세션 데이터와 조인하여 고객 등급별로 사용자를 세분화할 수 있습니다.

조인에 지원되는 데이터 소스는 다음과 같습니다(단, 이에 국한되지 않음).

- 로그
- 메트릭
- RUM
- Cloud Cost 권장 사항
- Netflow
- APM 스팬
- APM 트레이스
- 프로필
- Synthetics CI 배치
- Synthetics Run
- Static Analysis
- CI 테스트
- Compliance Findings
- Product Analytics
- 참조 표

조인 및 데이터 미리 보기를 사용하면 올바른 필드를 더 쉽게 선택하고 관련 세부 정보로 그래프를 보강하여 대시보드의 품질과 유용성을 향상할 수 있습니다.


{{% /collapse-content %}}

## 사용자 지정 링크 {#custom-links}

사용자 지정 링크는 위젯 데이터 값을 Datadog 페이지나 AWS 콘솔과 같은 관련 URL에 연결하여 데이터 상호 작용을 향상합니다.

일반 위젯 인라인 데이터와의 상호 작용을 맞춤 설정하려면 [컨텍스트 링크][2]를 참조하세요.

## 위젯 설명 {#widget-descriptions}

위젯 설명을 사용하면 모든 대시보드 위젯에 텍스트 설명을 추가할 수 있습니다. 설명을 사용하여 메트릭이 나타내는 의미, 해석 방법 또는 취해야 할 조치와 같은 컨텍스트를 제공하세요.

설명을 추가하려면 다음 단계를 따르세요.
1. 위젯의 그래프 편집기를 엽니다.
2. 편집기 하단에 **Description**을 입력합니다.
3. **Save**를 클릭합니다.

저장한 후 위젯 왼쪽 상단의 설명 아이콘 위로 마우스를 가져가 설명을 조회할 수 있습니다.

{{< img src="dashboards/widgets/configuration/widget-description-hover.png" alt="'Avg CPU User % by Service (Top 10)'라는 제목의 막대 차트 위젯으로, 왼쪽 상단의 설명 아이콘 위로 커서가 올라가 있어 위젯 위에 설명 툴팁이 표시되었습니다." >}}

## 메트릭 정보 {#metrics-info}

메트릭 그래프에서 컨텍스트 메뉴(세로 점 3개)를 클릭하여 {{< ui >}}Metrics Info{{< /ui >}} 옵션을 찾으세요. 그러면 메트릭에 대한 설명이 포함된 패널이 열립니다. 이 패널에서 메트릭 이름을 클릭하면 메트릭 요약 페이지가 열리며, 여기서 메트릭을 추가로 분석하거나 편집할 수 있습니다.

## 단위 재정의 {#unit-override}

단위 재정의는 위젯에 데이터 값이 표시되는 방식을 맞춤 설정하여 데이터에 의미 있는 컨텍스트를 추가할 수 있게 해주는 주요 표시 옵션입니다. 더 많은 사용 사례와 정보는 [단위 재정의를 통한 시각화 사용자 지정][3]을 참조하세요.
- {{< ui >}}Unit override{{< /ui >}}: 'memory' 계열의 단위를 선택하면 Datadog이 데이터에 따라 적절한 단위 크기(예: 메가바이트 또는 기가바이트)로 표시합니다.
- {{< ui >}}Unit and scale override{{< /ui >}}: 단위를 하나의 크기로 고정합니다(값에 관계없이 데이터를 메가바이트로 표시).
- {{< ui >}}Define custom units{{< /ui >}}: 완전한 사용자 지정 단위를 정의합니다(예: 일반적인 개수 단위 대신 'tests').

이는 데이터에 단위를 할당하는 방법을 대신하지 않습니다.
{{< whatsnext desc="조직 수준에서 단위를 설정하세요. ">}}
    {{< nextlink href="/metrics/units/">}} 메트릭 단위 설정{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} 이벤트 기반 쿼리에 대한 단위 설정{{< /nextlink >}}
{{< /whatsnext >}}

## 글로벌 시간 선택기 {#global-time-selector}

글로벌 시간 선택기는 대시보드의 모든 위젯이 동일한 시간 프레임을 사용하도록 동기화하는 기본적인 시간 구성 옵션입니다. 글로벌 시간 선택기를 사용하려면 시간 기반 위젯 중 하나 이상이 `Global Time`을 사용하도록 설정되어 있어야 합니다. 위젯 편집기의 {{< ui >}}Set display preferences{{< /ui >}}에서 이를 선택하거나 위젯을 추가하세요(글로벌 시간은 기본 시간 설정입니다).

글로벌 시간 선택기는 동일한 대시보드에서 `Global Time` 옵션을 사용하는 모든 위젯에 대해 동일한 시간 프레임을 설정합니다. 과거의 이동 기간(예: `Past 1 Hour` 또는 `Past 1 Day`)이나 `Select from calendar…` 옵션을 사용한 고정 기간을 선택하거나 [사용자 지정 시간 프레임을 입력][8]하세요. 이동 기간을 선택하면 위젯이 시간 기간과 함께 이동하도록 업데이트됩니다.

글로벌 시간에 연결되지 않은 위젯은 글로벌 시간 기간에 적용된 로컬 시간 프레임에 대한 데이터를 표시합니다. 예를 들어, 글로벌 시간 선택기가 2019년 1월 1일~2019년 1월 2일로 설정된 경우 `Past 1 Minute`에 대한 로컬 시간 프레임이 설정된 위젯은 2019년 1월 2일 오후 11시 59분부터 마지막 1분을 표시합니다.

## 위젯 복사 및 붙여넣기 {#copy-and-paste-widgets}

복사 및 붙여넣기 기능은 다양한 Datadog 컨텍스트와 외부 도구에서 위젯을 재사용할 수 있게 해주는 핵심 공유 및 협업 기능입니다.

<div class="alert alert-info">링크 미리보기를 사용하여 Datadog 외부에서 위젯을 공유하려면 관리자가 Organization Settings에서 <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Widget Share URLs</strong></a>를 Public 또는 Private으로 설정해야 합니다. 관리자는 이 설정을 비활성화하여 사용자가 위젯 공유 링크 및 미리보기를 생성하지 못하도록 할 수 있습니다.</div>

[Dashboards][4], [Notebooks][5], [APM Service][6], [APM resource][7] 페이지에서 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>C</kbd>를 사용하거나 공유 아이콘을 선택한 후 'Copy'를 선택하여 위젯을 복사할 수 있습니다.

복사된 위젯은 다음에서 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>V</kbd>를 사용하여 Datadog 내에 붙여넣을 수 있습니다.

* **Dashboards**: 마우스 커서 아래에 새 위젯을 추가합니다.
* **Notebooks**: 노트북 끝에 새 셀을 추가합니다.

링크 미리보기를 표시하는 즐겨 사용하는 채팅 프로그램(Slack 또는 Microsoft Teams 등)에 위젯을 붙여넣을 수도 있습니다. 조직의 Widget Share URLs 모드에 따라 그래프의 공개 미리보기 이미지 또는 Slack의 비공개 미리보기 이미지가 위젯으로 연결되는 직접 링크와 함께 표시됩니다. 자세한 내용은 [Widget Share URLs][11]를 참조하세요.

## 위젯 그룹 {#groups-of-widgets}

그룹 위젯 영역 위로 마우스를 가져가고 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>C</kbd>를 사용하거나 공유 아이콘을 선택한 후 'Copy'를 선택하여 Timeboard 그룹 위젯을 복사할 수 있습니다.

**참고**: 그래프를 스크린보드나 노트북에 붙여넣으면 Datadog은 그룹의 각 위젯을 개별적으로 붙여넣습니다.

여러 스크린보드 위젯을 복사하려면(편집 모드에서만 가능) <kbd>Shift</kbd>를 누른 채 위젯을 클릭하고 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>C</kbd>를 사용합니다.

**참고**: 이는 Datadog 내에서 공유할 때만 작동합니다. 미리 보기 이미지를 생성하지 않습니다.

## 위젯 그래프 메뉴 {#widget-graph-menus}

위젯 그래프 메뉴는 필수 데이터 상호 작용 옵션을 제공합니다. 그래프 위로 커서를 가져가면 다음 메뉴 옵션에 액세스할 수 있습니다.

### 전체 화면으로 보기 {#view-in-full-screen}

[전체 화면 모드](#full-screen)에서 그래프를 봅니다.

### 내보내기 {#export}

대시보드 그래프의 내보내기 아이콘을 클릭하여 옵션 메뉴를 엽니다.

| 옵션         | 설명                               |
|----------------|-------------------------------------------|
| Copy           | 대시보드 그래프의 복사본을 생성합니다.     |
| Share snapshot | 그래프의 스냅샷을 생성하여 전송합니다. |

#### Datadog 내에서 사용 {#use-within-datadog}

| 옵션           | 설명                                        |
|------------------|----------------------------------------------------|
| Declare incident | 그래프에서 인시던트를 선언합니다.                |
| Add to incident  | 기존 인시던트에 그래프를 추가합니다.             |
| Create case      | 그래프에서 케이스를 생성합니다.                      |
| Save to notebook | 그래프를 노트북에 저장합니다.                      |
| Link to widget   | 위젯 링크를 클립보드에 복사합니다. |

#### 외부 공유 {#share-externally}

| 형식          | 설명                        |
|-----------------|------------------------------------|
| Download as PNG | 위젯을 PNG 형식으로 다운로드합니다. |
| Download as SVG | 위젯을 SVG 형식으로 다운로드합니다. |
| Download as CSV | 위젯을 CSV 형식으로 다운로드합니다. [위젯 데이터를 CSV로 내보내기](#export-widget-data-to-csv) 섹션을 참조하세요. |

### 편집 {#edit}

대시보드 그래프의 연필 아이콘을 클릭하여 그래프를 편집하세요.

### 추가 옵션 {#additional-options}

대시보드 그래프의 컨텍스트 메뉴(세로 점 3개)를 클릭하여 옵션 메뉴를 엽니다.

| 옵션                            | 설명                                                                                                                |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Edit                              | 그래프를 편집합니다.                                                                                                            |
| Clone                             | 그래프 옆에 복사본을 생성합니다.                                                                                      |
| Split graph                       | [분할 그래프][10]를 생성합니다.                                                                                                |
| Create custom links               | [사용자 지정 링크](#custom-links)를 생성합니다.                                                                                      |
| Create monitor                    | 그래프의 쿼리로 미리 구성된 모니터를 생성합니다.                                                                     |
| Metrics info(메트릭 그래프만 해당) | 이 그래프의 메트릭에 대한 설명을 확인합니다. 메트릭 이름을 클릭하면 Metric Summary 페이지에서 해당 메트릭을 열 수 있습니다. |
| Delete                            | 그래프를 삭제합니다.                                                                                                          |

## 위젯 데이터를 CSV로 내보내기 {#export-widget-data-to-csv}

단일 위젯의 기반 데이터를 CSV 파일로 다운로드하려면 위젯의 내보내기 아이콘을 클릭하고 {{< ui >}}Download as CSV{{< /ui >}}를 선택하세요. [전체 화면 모드](#full-screen)에서 위젯을 볼 때 CSV 데이터를 다운로드할 수도 있습니다.

CSV 내보내기는 다음 위젯 유형에서 사용할 수 있습니다.

* 막대 차트
* 목록
* 파이 차트
* 산점도
* 표
* 시계열
* 상위 목록
* Treemap

**참고**: CSV 내보내기는 한 번에 하나의 위젯에 대해서만 가능합니다. 대시보드에 있는 모든 위젯의 데이터를 단일 파일로 내보낼 수 없습니다.

CSV 내보내기는 기본적으로 활성화되어 있습니다. 지원되는 위젯에 {{< ui >}}Download as CSV{{< /ui >}}가 나타나지 않으면 Datadog 지원팀이 해당 조직에 대해 CSV 내보내기를 비활성화했을 수 있습니다. 이 제한은 조직의 모든 사용자에게 적용되며, 대시보드 위젯뿐만 아니라 다른 Datadog 제품의 CSV 내보내기에도 적용됩니다. Datadog UI에서 이 설정을 변경할 수 없습니다. CSV 내보내기를 비활성화하거나 다시 활성화하려면 [Datadog 지원팀][12]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/timeseries/#full-screen
[2]: /ko/dashboards/guide/context-links/
[3]: /ko/dashboards/guide/unit-override
[4]: /ko/dashboards/
[5]: /ko/notebooks/
[6]: /ko/tracing/services/service_page/
[7]: /ko/tracing/services/resource_page/
[8]: /ko/dashboards/guide/custom_time_frames/
[10]: /ko/dashboards/widgets/split_graph/
[11]: /ko/dashboards/sharing/widget_public_urls/
[12]: /ko/help/