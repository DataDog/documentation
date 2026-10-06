---
aliases:
- /ko/actions/datastore/create
description: 기본 키가 있는 Datastore를 생성하고, 초기 데이터를 시드하며, 수동 편집 또는 파일 업로드를 통해 Datastore
  콘텐츠를 관리합니다.
disable_toc: false
further_reading:
- link: actions/app_builder/build
  tag: 설명서
  text: 앱 빌드
- link: actions/workflows/build
  tag: 설명서
  text: 워크플로 빌드
- link: https://www.datadoghq.com/blog/datadog-datastore/
  tag: 블로그
  text: Datastore로 자동화된 워크플로 및 앱 강화하기
title: Datastore 생성 및 관리
---
[Datastore 페이지][1]에서 Datastore를 생성하고 관리할 수 있습니다.

## Datastore 생성 {#create-a-datastore}

Datastore를 생성하려면 다음 단계를 따르세요.

1. [Datastore 페이지][1]로 이동합니다.
1. {{< ui >}}\+ New Datastore{{< /ui >}}를 클릭합니다.
1. Datastore에 대한 {{< ui >}}Name{{< /ui >}}을 입력합니다.
1. {{< ui >}}Primary Key{{< /ui >}}를 입력하거나 기본 키가 사례에 필수적이지 않은 경우 {{< ui >}}Autogenerate a Primary Key{{< /ui >}} 옵션을 토글합니다.
   - 기본 키를 입력하기로 선택한 경우, 해당 키는 데이터에서 각 키가 고유한 값을 가지는 열 이름이어야 합니다.
   - 키 자동 생성을 선택하면 Datastore의 새 항목에 대해 사용자 지정 키를 제공할 수 없게 되지만, 기존 항목은 키를 지정하여 계속 업데이트할 수 있습니다.
1. 선택적으로 Datastore에 대한 {{< ui >}}Description{{< /ui >}}을 입력합니다.
1. _선택적으로_, JSON 또는 CSV 파일의 초기 데이터로 Datastore를 시드할 수 있습니다. 다음 방법 중 하나를 사용하여 파일 콘텐츠를 업로드합니다.
   * 파일을 UI로 드래그 앤 드롭합니다.
   * {{< ui >}}browse files{{< /ui >}}를 클릭하여 컴퓨터에서 파일을 찾아 선택합니다.
   * 컴퓨터에서 CSV 파일을 복사하고 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>V</kbd> 키를 사용하여 붙여넣습니다.

   CSV 또는 JSON 파일에는 기본 키와 일치하는 열이 있는 헤더 행이 포함되어 있어야 합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다. Datastore에서 [워크플로 또는 앱을 생성][2]하거나 Datastore를 조회할 수 있는 옵션이 포함된 확인 팝업 창이 나타납니다.

### 앱 또는 워크플로에서 생성 {#create-from-an-app-or-workflow}

Datastore 작업에서 {{< ui >}}Datastore ID{{< /ui >}} 버튼을 클릭하고 {{< ui >}}New Datastore{{< /ui >}}를 선택하여 앱이나 워크플로에서 Datastore를 만들 수 있습니다.

{{< img src="actions/datastore/datastore-create.png" alt="새 Datastore를 클릭하여 워크플로에서 워크플로를 생성합니다." style="width:100%;" >}}

## Datastore 편집{#edit-a-datastore}

### 데이터 수동 편집{#manually-edit-your-data}

Datastore의 행을 수동으로 편집하려면 다음 단계를 따르세요.
1. [Datastore 페이지][1]에서 Datastore를 찾아 클릭하여 엽니다.
1. 변경하려는 행 위로 마우스를 가져간 다음 {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
1. {{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw text{{< /ui >}} 탭을 사용하여 행의 키를 편집합니다.

**참고:** 행의 기본 키는 수동으로 편집할 수 없습니다. 기본 키를 편집해야 하는 경우 행을 삭제하고 다시 추가하거나 파일에서 데이터를 다시 업로드하세요.

### 파일을 사용하여 업데이트{#update-using-a-file}

파일을 사용하여 Datastore를 업데이트하려면 다음 단계를 따르세요.
1. [Datastore 페이지][1]에서 Datastore를 찾아 클릭하여 엽니다.
1. {{< ui >}}Add Data{{< /ui >}}를 클릭합니다.
1. 데이터 처리 방법 옵션을 선택합니다.
   - {{< ui >}}Overwrite{{< /ui >}}는 표의 기존 행을 파일의 데이터로 바꿉니다.
   - {{< ui >}}Append{{< /ui >}}는 파일의 행을 기존 데이터 세트에 추가합니다. Append 옵션은 데이터 세트에 중복 항목을 추가하는 것을 허용하지 않습니다.
1. {{< ui >}}Add{{< /ui >}}를 클릭합니다.

## Datastore 조회{#view-a-datastore}

Datastore를 조회하려면 [Datastore 페이지][1]에서 해당 Datastore를 찾아 클릭하여 엽니다.

Datastore를 연 후에는 다음을 수행할 수 있습니다.
- 데이터셋을 JSON 또는 CSV 파일로 내보냅니다.
- {{< ui >}}Columns{{< /ui >}}를 클릭하여 표 열을 표시하거나 숨깁니다.
- {{< ui >}}Create{{< /ui >}}를 클릭하여 Datastore에서 [워크플로 또는 앱을 생성][2]합니다.
- {{< ui >}}Add data{{< /ui >}}를 클릭하여 CSV 또는 JSON 파일에서 [데이터를 추가](#edit-a-datastore)합니다.

{{< ui >}}Table Options{{< /ui >}} 버튼을 사용하면 다음을 수행할 수 있습니다.
- [Datastore 권한][3]을 편집합니다.
- Datastore UUID를 복사합니다. 이는 [여러 Datastore 참조가 있는 앱][4]에 유용합니다.
- Datastore를 복제합니다.
- Datastore를 삭제합니다.

## 제한 사항 {#limitations}

Datastore에는 다음과 같은 제한 사항이 있습니다.

- Datastore는 최대 100,000개의 행을 포함할 수 있습니다.
- `string` 유형의 기본 키 열이 필요하며 각 행을 고유하게 식별해야 합니다.
- 각 행의 크기는 최대 100 KB까지 가능합니다.
- 기본 키 값은 변경할 수 없으며, 행이 생성된 후에는 수정할 수 없습니다.

이 제한 사항을 초과하는 사용 사례가 있는 경우 [지원][5]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /ko/actions/datastore/use#create-workflow-app
[3]: /ko/actions/datastore/auth/
[4]: /ko/actions/datastore/use#multiple-datastores
[5]: /ko/help/