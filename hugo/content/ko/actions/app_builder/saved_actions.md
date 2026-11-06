---
algolia:
  tags:
  - app builder
  - actions
description: 액션과 파라미터를 저장 및 재사용
disable_sidebar: false
disable_toc: false
further_reading:
- link: /actions/workflows/actions/
  tag: 설명서
  text: 워크플로의 액션에 대해 알아보기
- link: /integrations/
  tag: 설명서
  text: 통합에 대해 알아보기
title: 액션 저장 및 재사용
type: documentation
---
_저장된 액션_ 기능을 사용하여 재사용할 액션의 사본을 저장하세요. 저장된 액션을 앱에 새 단계로 삽입하거나, 저장된 액션을 사용하여 기존 단계의 파라미터를 채울 수 있습니다.

<div class="alert alert-info"><a href="https://docs.datadoghq.com/actions/app_builder/access_and_auth/#app-permissions"><b>편집기</b> 액세스 권한이 있는 경우에만</a> 액션을 저장할 수 있습니다.</div>

## 액션 저장 {#save-an-action}

1. Datadog에서 [**Actions** > **App Builder**][1]로 이동하여 앱 위에 마우스를 올립니다. 해당 앱의 액션 아이콘이 {{< ui >}}Last Saved{{< /ui >}} 열 아래에 나타납니다. {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
1. {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} 메뉴를 클릭한 다음 {{< ui >}}Save Action{{< /ui >}}을 클릭합니다.
1. 액션의 이름과 설명을 입력합니다.
1. 조직 내 다른 사용자가 해당 액션에 액세스할 수 있도록 하려면 {{< ui >}}Usable by others in the organization{{< /ui >}} 토글을 켭니다.
1. 액션의 구성 세부 정보를 확인하고 {{< ui >}}Save Action Configuration{{< /ui >}}을 클릭합니다.

## 앱에서 저장된 액션 사용하기 {#use-a-saved-action-in-your-app}

1. Datadog에서 [**Actions** > **App Builder**][1]로 이동하여 앱 위에 마우스를 올린 다음 {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
1. {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} 메뉴를 클릭하고 {{< ui >}}Use Saved Actions{{< /ui >}}를 선택합니다.
1. 목록을 살펴보고 원하는 저장된 액션을 찾습니다.
1. 저장된 액션을 선택하여 앱의 구성된 단계로 추가합니다.

## 저장된 액션 관리 {#manage-a-saved-action}

Action Catalog에서 저장된 액션을 편집, 복제 또는 삭제할 수 있습니다.

<div class="alert alert-info">액션을 직접 생성하지 않은 경우, 해당 액션을 삭제하거나 직접 편집할 수 없습니다. 대신 <b>복제</b> {{< img src="icons/clone-alert-blue.png" inline="true" style="width:14px;">}} 아이콘을 선택하여 액션을 복사하고 구성을 변경하세요.</div>

저장된 액션을 찾으려면 다음 단계를 따르세요.
1. Datadog에서 [**Action Catalog**][2]로 이동합니다.
1. {{< ui >}}Saved Actions{{< /ui >}}를 클릭합니다.
1. 저장된 액션 목록을 둘러보거나, 검색 창을 사용하여 이름으로 액션을 검색합니다. 편집, 복제 또는 삭제하려는 저장된 액션 위에 마우스를 올리세요.
1. {{< ui >}}Manage Saved Actions{{< /ui >}}를 클릭합니다.
1. 아이콘을 선택하여 저장된 액션을 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}편집, {{< img src="icons/clone.png" inline="true" style="width:14px;">}}복제 {{< img src="icons/delete.png" inline="true" style="width:14px;">}} 또는 삭제하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][3]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://chat.datadoghq.com/