---
aliases:
- /ko/graphing/notebooks/
- /ko/notebooks_new/
- /ko/notebooks_legacy/
description: 조사, 사후 분석, 런북 및 데이터 기반 스토리텔링을 위해 실시간 Datadog 그래프가 포함된 협업용 리치 텍스트 문서를
  생성합니다.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: 블로그
  text: Datadog Cloud Cost Management를 사용하여 OCI 비용 관리 및 최적화하기
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: 블로그
  text: 협업 노트북으로 데이터 기반 스토리를 전달하세요.
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 포스트모템(사후 분석) 생성 모범 사례
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 로그를 변환하고 강화하세요.
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: 블로그
  text: Datadog에서 고급 분석을 위해 Sheets, DDSQL Editor 및 Notebook을 사용하여 데이터를 탐색하기
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: 블로그
  text: Datadog에서 성공적인 FinOps 사례를 구축한 방법
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: 학습 센터
  text: Notebooks 시작하기
- link: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
  tag: 학습 센터
  text: 중앙 집중식 보고를 위한 Datadog Notebook 활용
title: Notebooks
---
## 개요 {#overview}

Notebooks는 Datadog 그래프의 모든 기능을 제공하는 협업형 리치 텍스트 문서입니다. 여러 사용자가 함께 작업하여 인시던트의 실시간 데이터를 포함한 조사 또는 [사후 분석][8]을 작성할 수 있습니다. 또한 Notebooks는 시스템에 대한 실제 인사이트를 콘텐츠와 함께 제공하는 런북 및 설명서에도 적합합니다.

## 노트북 생성 {#creating-a-notebook}

노트북은 다음 두 위치에서 생성할 수 있습니다.

- 왼쪽 탐색 메뉴에서 **Dashboards > New Notebook**을 클릭합니다.
- [Notebooks 목록 페이지][1]의 오른쪽 상단에서 **New Notebook**을 클릭합니다.

### 노트북 템플릿 {#notebook-templates}

[템플릿 갤러리][2]에서 새 노트북을 생성할 수 있는 준비된 템플릿을 확인하세요. 템플릿에는 Incident Response[사후 분석][8], 인시던트 보고서 및 SLO 사양이 포함됩니다. 재사용 가능한 노트북 구조를 만들기 위해 사용자 지정 템플릿을 생성할 수도 있습니다.

## 노트북 편집하기 {#editing-a-notebook}

Notebooks는 콘텐츠 작성 및 협업을 위한 리치 텍스트 편집 환경을 제공합니다. 익숙한 도구 모음 옵션과 키보드 단축키를 사용하여 텍스트를 자유롭게 입력하고 서식을 지정할 수 있습니다. 예를 들어, 굵게, 기울임꼴, 헤더, 목록 등을 직접 편집기에서 사용할 수 있습니다.

단축키를 선호하는 사용자들을 위해, Notebooks는 Markdown 구문도 지원합니다. 예를 들어, `#`를 입력하고 스페이스를 누르면 헤더가 생성되며, 세 개의 백틱(<code>```</code>)을 사용하면 코드 블록이 시작됩니다.

텍스트 내용은 입력과 동시에 자동 저장됩니다. 삽입된 그래프의 경우 노트북에 변경 사항을 반영하려면 그래프 편집기에서 저장해야 합니다.

### 콘텐츠 유형 {#content-types}

Notebooks는 다음과 같은 다양한 리치 텍스트 및 임베디드 콘텐츠를 지원합니다.

- [그래프](#graphs-in-notebooks)
- 이미지
- 헤더(H1~H3)
- 목록(글머리 기호 목록, 번호 매기기 목록, 체크리스트)
- 코드 블록
- 인용문
- Markdown 셀

전체 목록을 보려면 노트북에 <kbd>/</kbd>를 입력하세요.

### 노트북의 그래프 {#graphs-in-notebooks}

Notebooks는 모든 위젯 유형을 지원합니다. 전체 목록은 [위젯][3]을 참조하세요.

위젯 위에 마우스를 올리면 그래프 편집 및 구성 옵션이 표시됩니다.

쿼리를 편집하거나 그래프의 표시를 구성하려면 **Quick Edit** 기능을 사용하여 대부분의 변경 사항을 인라인으로 수행합니다. 고급 구성을 보려면 연필 아이콘을 클릭하거나 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> 키를 누른 채 그래프를 클릭하여 전체 그래프 편집기를 엽니다. 시계 아이콘을 클릭하여 로컬 시간 프레임을 조정하거나 그래프를 글로벌 노트북 시간에 연결할 수 있습니다.

추가 그래프 구성 옵션은 그래프 유형에 따라 세 점의 생략 기호 메뉴에서 접근할 수 있습니다.
- **그래프 크기**: XS, S, M(기본값), L 또는 XL을 선택하여 그래프 높이를 조정합니다.
- **그래프 범례**: 범례를 숨기려면 체크박스를 선택 해제합니다. XS 및 S 그래프에서는 범례가 자동으로 비활성화됩니다.

### 리치 텍스트 기능 {#rich-text-features}

Notebooks는 굵게, 기울임꼴, 인라인 코드 및 헤더와 같은 일반적으로 사용되는 리치 텍스트 기능을 지원합니다. Notebooks는 글머리 기호, 번호 매기기 또는 체크리스트와 같은 다양한 목록 유형도 지원합니다.

| 기능       | 설명                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **굵게**      | 텍스트를 굵게 하려면 텍스트를 선택한 후 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>를 누릅니다.                                           |
| *기울임꼴*     | 텍스트를 기울임꼴로 하려면 텍스트를 선택한 후 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>를 누릅니다.                                      |
| `Inline code` | 인라인 코드를 위해, 텍스트 앞뒤에 <code>`</code> 을 입력합니다.                                          |
| 코드 블록    | 코드 블록을 삽입하려면 <code>```</code> 을 입력한 후 <kbd>Enter</kbd>를 누르거나 슬래시 명령 메뉴를 사용합니다.           |
| 인용        | 인용 블록을 삽입하려면 `>`를 입력하거나 슬래시 명령 메뉴를 사용합니다.                                                    |
| 텍스트 표   | 테이블을 삽입하려면 `/table`을 입력하거나 **Add Cell** 메뉴를 사용합니다.                                                          |
| Callout      | callout을 삽입하려면 `/table`을 입력하거나 `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT` 또는 `!CAUTION`을 입력한 후 <kbd>Space</kbd>를 누릅니다.   |

### 스마트 칩 {#smart-chips}

| 기능    | 설명                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | 다른 사용자를 언급하려면 `@` 뒤에 이름이나 이메일 주소를 입력합니다. |
| `$TemplateVariable` | 기존 템플릿 변수의 이름 뒤에 `$`를 입력합니다. |
| `/date` | `/date`를 입력하여 날짜 칩을 추가합니다. 날짜 칩을 클릭하면 팝업에서 날짜와 시간을 수정할 수 있습니다. 또한 `/today`와 `/now`도 사용해 보세요! |

### Slash 명령 {#slash-commands}

Slash 명령은 그래프를 생성하거나 다른 콘텐츠를 삽입하기 위한 인터페이스입니다. 새 줄에서 `/`를 입력하면 Slash 명령 메뉴가 열립니다. 원하는 콘텐츠 유형의 이름을 계속 입력한 후 적절한 옵션을 선택합니다.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="노트북에 /를 입력할 때 나타나는 Slash 명령 메뉴" style="width:70%;" >}}

그래프 유형을 선택하면 [그래프 편집기][3]가 열립니다. **Save**을 클릭하면 그래프가 노트북에 나타납니다.

### 키보드 단축키 {#keyboard-shortcuts}

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Datadog 노트북을 위한 키보드 단축키 메뉴" style="width:70%;" >}}

노트북의 왼쪽 하단 모서리에서 키보드 아이콘을 클릭하여 편집용 키보드 단축키 목록을 확인하세요.

또한 다음 단축키를 사용하여 위젯을 잘라내고 붙여넣을 수 있습니다(<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### 목차 {#table-of-contents}

Notebooks는 문서에 삽입한 모든 헤더나 그래프를 기반으로 자동으로 목차를 생성합니다. Markdown 단축키 `#`를 사용하거나 텍스트를 선택한 후 도구 모음에서 **Header**를 클릭하여 헤더를 만들 수 있습니다.

### 노트북 태그 {#notebook-tags}

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="노트북에 즐겨찾기, 팀 추가 또는 유형 추가 작업을 적용할 수 있는 노트북 태그 옵션" style="width:80%;" >}}

| 태그 작업                | 설명                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **노트북 즐겨찾기 지정**   | 노트북을 즐겨찾기로 설정하여 노트북 목록 페이지에서 결과 상단에 고정할 수 있습니다. 노트북을 즐겨찾기로 전환하려면 노트북 헤더의 별 아이콘을 클릭하세요.                                                                     |
| **팀별 태그 지정**           | 노트북에 팀으로 태그를 지정하면 노트북을 검색할 때 필터로 사용할 수 있습니다. 하나의 노트북에 최대 5개의 팀을 태그로 지정할 수 있습니다. 노트북에 태그를 지정하려면 노트북 헤더의 **Team** 옵션을 클릭하고 원하는 팀을 선택합니다. |
| **유형별 태그 지정**           | 노트북에 사후 북선, 런북, 조사, 설명서, 보고서와 같은 유형 태그를 지정하여 더 쉽게 검색할 수 있습니다. 노트북에 태그를 지정하려면 **Type**을 클릭하고 유형을 선택합니다.                                                     |

### 노트북에 이미지 추가 {#add-images-to-notebooks}

<div class="alert alert-info">PNG, JPG, JPEG 및 GIF 파일 형식만 지원됩니다. 업로드 가능한 최대 파일 크기는 4MB입니다.</a></div>

`/image` 또는 **Add Cell** 메뉴를 사용하여 노트북에 이미지를 추가할 수 있습니다. 이 기능은 이미지의 크기 조정, 정렬 및 캡션 추가 옵션을 제공합니다. 업로드된 이미지는 Datadog에서 호스팅됩니다.

<!-- TODO Add updated image from new notebooks -->

다음 옵션 중 하나를 사용해 이미지를 업로드하면 Datadog에서 이미지를 호스팅합니다.
- 업로드 영역에 이미지 파일 드롭
- **Choose File**을 클릭하고 파일 디렉터리에서 이미지 선택
- 공개적으로 접근 가능한 이미지 URL 붙여넣기

이미지 작업 트레이에 있는 아이콘을 클릭해 이미지의 크기를 조정하고, 이미지를 정렬하고, 캡션을 추가하거나, 이미지를 전체 화면 모드에서 볼 수 있습니다.


## 노트북에 댓글 추가하기 {#adding-comments-to-a-notebook}

노트북 본문 내용에 댓글을 추가할 수 있습니다. 텍스트에 댓글을 작성하려면 텍스트를 선택한 후 도구 모음의 댓글 아이콘을 클릭하세요.

<!-- TODO Add updated image from new notebooks -->

그래프나 이미지에 댓글을 작성하려면 그래프 오른쪽에 있는 댓글 아이콘을 클릭하세요.

| 기능                  | 설명                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **댓글 이동하기** | 저장된 댓글은 노트북의 오른쪽 여백에 나타납니다. 텍스트에서 댓글 강조 표시를 클릭하면 여백에 해당 댓글이 열리며, 여백의 댓글을 클릭하면 해당 위치로 이동합니다. |
| **댓글에 응답하기** | 오른쪽 여백에서 댓글을 클릭하여 댓글 상자를 열 수 있습니다. 텍스트를 작성하거나, `@mention`Datadog 사용자에게 댓글을 달거나, **Resolve**를 클릭하여 댓글을 해결할 수 있습니다. |
| **댓글에 링크 달기**    | 댓글의 오른쪽 상단에 있는 링크 아이콘을 클릭하여 해당 댓글의 링크를 복사할 수 있습니다.      |
| **댓글 편집 또는 삭제하기** | 댓글의 오른쪽 상단에 있는 세 점 메뉴를 클릭하여 댓글을 편집하거나 삭제할 수 있습니다.                 |
| **댓글 알림** | 기본적으로, 다른 사용자가 새 댓글을 작성하면 노트북 작성자에게 이메일 알림이 전송됩니다 댓글 스레드의 사용자들은 각 답글에 대한 알림을 받습니다. 알림을 조정하려면, 톱니바퀴 메뉴에서 **Notifications**을 선택하세요. |

## Notebooks의 다중 사용자 경험 {#multiplayer-experience-in-notebooks}

Notebooks는 완전한 협업을 지원하여 여러 사용자가 동시에 편집할 수 있습니다. 협업자가 노트북을 열면 해당 사용자의 커서가 실시간으로 표시됩니다. 커서 위에 마우스를 올리면 협업자의 이름이 표시됩니다.

<!-- TODO Add updated image from new notebooks -->

### 위젯 {#widgets}

다른 사용자가 위젯을 편집 중이면 위젯 주위에 테두리가 표시됩니다. 위젯은 마지막 저장 내용이 우선 적용되므로 다른 사용자가 편집 중인 위젯은 수정하지 마세요.

<!-- TODO Add updated image from new notebooks -->

#### 접속 현황 {#presence}

노트북 상단에서 현재 노트북을 보고 있는 모든 사용자의 아바타 이미지를 볼 수 있습니다. 아바타 위에 마우스를 올리면 관련된 협업자의 이름을 볼 수 있습니다.

<!-- TODO Add updated image from new notebooks -->

## 노트북 구성하기 {#configuring-a-notebook}

### 템플릿 변수 {#template-variables}

Notebooks는 템플릿 변수를 지원합니다. 템플릿 변수 값을 추가하고 선택하여 시각화를 동적으로 범위 지정합니다. 자세한 내용은 [템플릿 변수][5]를 참조하세요.

<div class="alert alert-danger">일부 Analysis 기능은 템플릿 변수 지원이 제한되거나 지원되지 않을 수 있습니다. 자세한 내용은 <a href="/notebooks/guide/template_variables_analysis_notebooks">Analysis Notebooks의 템플릿 변수 지원</a>을 참조하세요.</div>

### 시간 제어 {#time-controls}

기본적으로 모든 그래프는 노트북 헤더에 설정된 전역 시간 프레임에 연결됩니다.

다른 시간 프레임을 보려면 전역 시간 선택기에서 옵션을 선택하거나 그래프에서 직접 드래그하여 범위를 선택합니다. 노트북 URL은 이 새로운 시간 프레임을 반영하도록 업데이트지만 노트북에는 저장되지 않습니다.

**참고**: 그래프에서 클릭 후 드래그하여 확대해도 그래프가 전역 시간에서 분리되지 않습니다. 대신 노트북의 전역 시간이 변경됩니다.

<!-- TODO Add updated image from new notebooks -->

현재 시간을 노트북의 기본값으로 저장하려면 **Set Default Time**을 클릭하세요. 이전 저장된 기본 전역 시간으로 전역 시간을 재설정하려면 재설정 버튼을 클릭하세요.

개별 그래프에 대해 전역 시간에서 연결을 해제한 후 독립적인 시간 프레임으로 설정할 수 있습니다.

<!-- TODO Add updated image from new notebooks -->

단일 그래프에서 다른 시간 프레임을 보려면 그래프를 편집하고 토글을 사용하여 전역 시간에서 연결을 해제하세요. 시간 선택기를 사용하거나 그래프에서 드래그하여 시간 범위를 변경하세요. 편집 모드에서 변경한 내용은 **Done**을 클릭하면 자동으로 저장됩니다. 변경 사항을 취소하려면 **Done** 대신 **Cancel**을 클릭하세요.

### 모드 {#modes}

노트북 오른쪽 상단에 있는 드롭다운을 선택하여 노트북 내에서 모드를 전환할 수 있습니다.

- **Editing**: 노트북을 변경할 수 있는 모드입니다.
- **Viewing**: 읽기 전용 모드로, 기존 설정 및 정보가 의도치 않게 수정되는 것을 방지합니다.

### 버전 기록 {#version-history}

노트북에서 톱니바퀴 아이콘을 클릭하고 **Version history**을 선택하면 버전 기록 사이드 패널이 열립니다. 이전 버전의 노트북을 미리 보거나 복원하거나 복제할 수 있습니다. 자세한 내용은 [버전 기록 가이드][6]를 참조하세요.

### 그래프 스냅샷 {#graph-snapshots}

Notebooks는 데이터 보존 기간이 만료되기 전에 그래프의 상태를 유지할 수 있도록 고정 시간 범위를 사용하는 그래프의 스냅샷을 자동으로 생성합니다. 별도의 설정은 필요하지 않습니다. 그래프 옆의 케밥 메뉴를 사용하여 스냅샷을 확인하거나 다운로드하세요.

{{< img src="notebooks/kebab_snapshots.png" alt="스냅샷을 보거나 다운로드하기 위한 케밥 메뉴 옵션" style="width:100%;">}}

스냅샷은 고정된 시간 범위(예: `Aug 18, 12:00 am - Aug 19, 11:59 pm`)를 사용하는 그래프의 정적 이미지입니다. 그래프가 고정된 시간 범위를 계속 사용하는 한, 그래프가 업데이트될 때 스냅샷도 함께 업데이트됩니다. 그래프를 전역 시간 범위(예: `Past 1 hour`)로 전환하면 해당 스냅샷은 제거됩니다.

노트북 제목 아래의 그래프 스냅샷 표시기에 마우스를 올리면 노트북의 스냅샷 상태를 미리 볼 수 있습니다. 미리 보기에는 가장 최근 스냅샷의 생성 시각과 생성된 스냅샷의 수가 표시됩니다.

{{< img src="notebooks/hover_graph_snapshots.png" alt="생성된 스냅샷의 수를 보여주는 스냅샷 표시기" style="width:100%;">}}

노트북에 데이터 보존 기간이 지난 데이터를 포함하는 그래프가 있는 경우 노트북에는 해당 그래프의 인라인 스냅샷이 표시됩니다. 이 스냅샷은 정적 이미지이지만 원본 그래프를 수정하면 새 스냅샷으로 대체됩니다.

### 권한 {#permissions}

기본적으로 모든 사용자는 노트북에 대한 전체 액세스 권한을 갖고 있습니다.

액세스 제어 기능을 사용하여 본인만 노트북을 보거나 편집하도록 제한하세요.
1. 노트북 보기 화면에서 오른쪽 상단의 **Share** 버튼을 클릭합니다.
1. **Private to me**를 선택합니다.
1. **Save**를 클릭합니다.

세분화된 액세스 제어를 사용하여 특정 노트북을 편집할 수 있는 [역할][7]을 제한하세요.
1. 노트북 보기 화면에서 오른쪽 상단의 **Share** 버튼을 클릭합니다.
1. **사용자 지정**을 선택합니다.
1. 조직 액세스 권한을 **Viewer**로 변경하여 조직 전체의 편집 권한을 제거합니다.
1. 드롭다운을 사용하여 노트북을 편집할 수 있는 역할, 팀 또는 사용자를 하나 이상 선택합니다.
1. **Add**를 클릭합니다.
1. 대화 상자가 업데이트되며 선택한 역할에 **Editor** 권한이 부여된 것으로 표시됩니다.
1. **Save**를 클릭합니다.

**참고:** 노트북에 대한 편집 권한을 유지하려면 저장하기 전에 사용자가 구성원인 역할을 하나 이상 포함해야 합니다.

제한된 노트북에 대한 일반 액세스를 복원하려면 편집 액세스 권한이 있어야 합니다. 다음 단계를 완료하세요.
1. 노트북 보기 화면에서 오른쪽 상단의 **Share** 버튼을 클릭합니다.
1. **My Org**를 선택합니다.
1. **Save**를 클릭합니다.

## 노트북 찾기 {#finding-notebooks}

[Notebooks 목록][1] 페이지는 모든 노트북을 찾을 수 있는 곳입니다.

<!-- TODO Add updated image from new notebooks -->

### 검색 {#search}

검색 필드는 전체 텍스트 검색을 지원합니다. 쿼리를 입력하면 관련 노트북이 결과로 표시됩니다.

### 필터링 {#filtering}

다음 방법으로 노트북을 필터링할 수 있습니다.
| 필터 유형      | 설명                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **작성자**       | 작성자로 필터링하려면 작성자 드롭다운을 선택한 후 필터링할 작성자 이름을 입력합니다. |
| **팀**         | 팀으로 필터링하려면 팀 드롭다운을 선택한 후 필터링할 팀 이름을 입력합니다. |
| **노트북 유형**| 조사, 사후 분석, 런북, 보고서 또는 설명서 기준으로 필터링합니다.     |
| **수정 날짜**| 수정 날짜 드롭다운을 사용하여 노트북을 최근 수정한 시점을 기준으로 필터링합니다. |

내 노트북과 내가 속한 팀으로 태그가 지정된 노트북에 접근할 수 있는 빠른 필터도 있습니다.

### 최근 작업으로 돌아가기 {#jump-back-in}

필터가 사용되지 않으면 최근에 열어보거나 편집한 노트북을 보여주는 Jump Back In 섹션이 나타납니다.

<!-- TODO Add updated image from new notebooks -->

### 노트북 정렬 {#sorting-notebooks}

노트북은 ⭐, 세부 정보 또는 수정 날짜를 선택하여 해당 값으로 정렬할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/list?location=templates
[3]: /ko/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /ko/dashboards/template_variables/
[6]: /ko/notebooks/guide/version_history
[7]: /ko/account_management/rbac/
[8]: /ko/incident_response/incident_management/post_incident/postmortems