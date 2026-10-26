---
description: 여러 App Builder 애플리케이션에서 구성 요소 및 쿼리 그룹을 모듈식 템플릿으로 저장하고 재사용하세요.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드하기
- link: /actions/app_builder/queries/
  tag: 설명서
  text: 쿼리
title: 재사용 가능 모듈
---
_재사용 가능 모듈_ 기능을 사용하여 구성 요소 및 쿼리 그룹을 템플릿으로 저장하고 App Builder 애플리케이션에서 재사용하세요. 모듈은 구성 요소가 올바르게 작동하도록 모든 종속성을 자동으로 포함합니다.

<div class="alert alert-info">기본 모듈은 읽기 전용입니다. 기본 모듈을 수정하려면 먼저 복제해야 합니다.</div>

## 재사용 가능 모듈 생성 {#create-a-reusable-module}

재사용 가능 모듈을 만드는 방법에는 세 가지가 있습니다.

### 구성 요소 패널에서 {#from-the-components-panel}
1. 앱을 편집할 때 확장 아이콘(<i class="icon-expand-to-left-wui" style="position:relative; top:4px;"></i>)을 클릭하여 구성 요소 패널을 엽니다.
2. 구성 요소를 클릭하여 선택합니다.
3. 구성 요소 패널에서 메뉴 아이콘(<i class="icon-config-1" style="position:relative; top:4px;"></i>)을 클릭합니다.
4. {{< ui >}}Create Module{{< /ui >}}({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}})을 클릭합니다.
5. [모듈을 구성][3]합니다.

### 구성 요소의 인스턴스 이름 탭에서 {#from-a-components-instance-name-tab}
1. 앱을 편집할 때 앱 캔버스에서 구성 요소를 선택합니다.
2.  구성 요소 인스턴스 이름 탭에서 {{< ui >}}Create Module{{< /ui >}}({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}) 아이콘을 클릭합니다.
3. [모듈을 구성][3]합니다.

### 선택한 구성 요소에서 {#from-selected-components}
1. 앱을 편집할 때 Shift 키를 누른 상태에서 여러 구성 요소를 클릭하여 선택합니다.
2. 오른쪽에 나타나는 사이드 패널에서 {{< ui >}}Create Module{{< /ui >}}({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}})을 클릭합니다.

## 모듈 구성 {#configure-a-module}

모듈을 생성할 때 모듈 편집기를 사용하면 저장하기 전에 구성 요소와 쿼리를 미리 보고, 이름 및 설명을 추가하고, 종속성을 검토할 수 있습니다.

{{< img src="actions/app_builder/app-builder-reusable-module-preview.png" alt="이름 및 설명 필드가 포함된 구성 요소 및 쿼리 미리보기를 보여주는 모듈 편집기" style="width:100%;">}}

1. 이름 및 설명을 입력합니다.
2. 자동으로 포함된 구성 요소 및 쿼리를 검토합니다. 시스템은 모든 중첩된 쿼리 종속성을 포함합니다.
3. {{< ui >}}Save Module{{< /ui >}}을 클릭합니다.

## 앱에 재사용 가능 모듈 추가 {#add-a-reusable-module-to-an-app}
1. 앱을 편집할 때 구성 요소 추가 아이콘(<i class="icon-component-wui" style="position:relative; top:4px;"></i>)을 클릭합니다.
2. {{< ui >}}Modules{{< /ui >}} 섹션에서 모듈을 클릭하거나 앱 캔버스로 드래그합니다.


## 모듈 삭제 {#delete-a-module}
1. 앱을 편집할 때 구성 요소 추가 아이콘(<i class="icon-component-wui" style="position:relative; top:4px;"></i>)을 클릭합니다.
2. {{< ui >}}Modules{{< /ui >}} 섹션에서 삭제하려는 모듈의 편집 아이콘({{< img src="icons/pencil.png" inline="true" style="width:14px;">}})을 클릭합니다.
3. 모듈 편집기에서 {{< ui >}}Delete Module{{< /ui >}}을 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][2]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://chat.datadoghq.com/
[3]: /ko/actions/app_builder/components/reusable_modules/#configure-a-module