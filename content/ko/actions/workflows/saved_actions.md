---
algolia:
  tags:
  - 워크플로우
  - 워크플로
  - 워크플로우 자동화
aliases:
- /ko/workflows/actions_catalog/action_blueprints/
- /ko/service_management/workflows/actions_catalog/saved_actions/
- /ko/service_management/workflows/actions/saved_actions/
- /ko/service_management/workflows/saved_actions
description: 작업과 파라미터를 저장 및 재사용
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: 설명서
  text: 통합에 대해 알아보기
title: 작업 저장 및 재사용
type: 설명서
---

_저장된 작업_ 기능으로 작업과 해당 파라미터를 저장 및 재사용할 수 있습니다. 저장된 액션을 워크플로우에 신규 단계로 추가하거나 기존 단계의 파라미터 을 채우는 데 사용할 수 있습니다.

## 작업 저장하기

1. 워크플로우 캔버스에서 저장하려는 작업을 클릭합니다.
1. **저장된 작업** 아이콘을 클릭하고 **작업 설정 저장**을 선택합니다.
1. 작업의 이름과 설명을 입력합니다.
1. 조직의 모든 사람이 작업에 접근할 수 있도록 하려면 **조직의 다른 사용자도 사용 가능**을 활성화합니다.
1. 작업의 설정 세부 정보를 확인하고 **작업 설정 저장**을 클릭합니다.

{{< img src="service_management/workflows/save_action.mp4" alt="저장한 작업 아이콘을 클릭하여 나중에 사용할 수 있도록 작업을 저장합니다." video="true" width=80% >}}

## 워크플로우에서 저장된 작업 사용하기

다음에 따라 저장된 작업을 워크플로우의 새 단계로 추가합니다.
1. 워크플로우 캔버스에서 더하기(`+`) 아이콘을 클릭하고 저장된 작업을 선택합니다.
1. 검색 창을 활용하거나 목록을 검색하여 원하는 저장된 작업을 찾습니다.
1. 저장된 작업을 선택하여 워크플로우 캔버스에 설정된 단계로 추가합니다.

다음과 같이 저장된 작업을 사용하여 기존 단계를 설정합니다.
1. 사전 설정 작업으로 채우려는 워크플로우 단계를 선택합니다.
1. **저장된 작업** 아이콘을 클릭하고 **저장된 작업을 사용하여 설정**을 선택합니다.
1. 스텝을 설정하는 데 사용하려는 저장된 작업을 선택하고 **저장된 작업 사용**을 클릭합니다.

## 저장된 작업 관리

[작업 카탈로그][1] 탭에서 저장된 작업을 미리보기, 편집 또는 삭제할 수 있습니다.

다음에 따라 저장된 작업을 관리합니다.
1. [워크플로우 자동화][2] 페이지에서 [**작업 카탈로그**][1]를 클릭합니다.
1. **저장된 작업**을 클릭하고 미리보기, 수정 또는 삭제하려는 저장된 작업을 목록에서 검색합니다.
1. 작업 위로 마우스를 올린 다음 **저장된 설정 미리보기/수정하기**를 클릭하면 해당 작업의 미리보기가 표시됩니다.
1. 미리보기 화면에서 수정 또는 삭제할 작업을 선택합니다.

고객님께서 작업을 생성하지 않은 경우 이를 직접 수정할 수 없습니다. 대신 **복제** 아이콘을 선택하여 해당 작업을 복제한 후에 설정을 변경할 수 있습니다. 고객님께서 생성하지 않은 작업은 삭제할 수 없습니다.

{{< img src="service_management/workflows/edit_saved_action.png" alt="작업 카탈로그에서 저장된 작업을 미리보기, 편집 또는 삭제합니다." style="width:80%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][3]의 **#workflows** 채널에 참여하세요.

[1]: https://app.datadoghq.com/workflow/action-catalog
[2]: https://app.datadoghq.com/workflow/
[3]: https://datadoghq.slack.com/