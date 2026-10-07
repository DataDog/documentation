---
disable_toc: false
further_reading:
- link: /dashboards/guide/powerpacks-best-practices/
  tag: 가이드
  text: Powerpack으로 그래프 전문성 확장
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: 블로그
  text: Powerpack을 사용하여 재사용 가능 그룹에 대시보드 위젯 저장
- link: /dashboards/widgets/group/
  tag: 설명서
  text: 그룹 위젯
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: Powerpack 위젯
---

## 개요

<div class="alert alert-info">스크린보드는 Powerpack 위젯을 지원하지 않습니다.</div>

Powerpacks는 전문 그래프를 재사용 가능한 대시보드 빌딩 블록으로 규모 조정할 수 있는 템플릿 형식의 위젯 그룹입니다. Powerpacks는 사전 설정(Datadog에서 만들고, 모든 고객이 사용 가능)하거나 커스텀(사용자가 만들고, 조직 내에서만 사용 가능)하여 사용할 수 있습니다. Powerpacks 모범 사례에 관한 자세한 내용은 [Powerpacks로 전문 그래프 규모 조정하기][1] 가이드를 참고하세요.

## 설정

### Powerpacks 생성

대시보드 기존 그룹에서 Powerpack 만들기

{{< img src="dashboards/widgets/powerpack/group_header_icons.png" alt="Save as Powerpack 옵션이 강조 표시된 대시보드 그룹 헤더" style="width:80%;" >}}

1. 대시보드 그룹 헤더에서 "Save as Powerpack" 아이콘을 클릭합니다.
1. 조직에서 Powerpack을 찾을 수 있도록 상세 내용을 입력합니다.
1. "Add Search Categories" 아래에 태그를 추가해 Powerpack을 정리합니다. 이렇게 하면 팀원이 올바른 Powerpack을 대시보드에 추가할 수 있습니다.
1. Powerpack 사용자가 구성해야 할 필터를 선택합니다.

**참고**: Powerpack을 생성한 후에는 원래 그룹이 Powerpack 인스턴스로 교체됩니다.

### Powerpack 업데이트

Powerpack이 사용된 모든 대시보드에 Powerpack 동기화로 변경

Powerpack 레이아웃과 외형을 변경하는 방법:
1. 헤더에 마우스 커서를 올리고 케밥 메뉴를 클릭합니다.
1. Powerpack 작업 메뉴에서 **Edit Powerpack Layout**을 선택합니다.
1. Powerpack 레이아웃이나 개별 위젯을 수정한 후 **Confirm Changes**를 선택합니다.
1. 여러 대시보드에 사용되는 Powerpack의 경우, 이 업데이트에 영향을 미치는 Powerpack 인스턴스를 확인하는 프롬프트가 표시됩니다.

{{< img src="dashboards/widgets/powerpack/powerpack_actions_menu.png" alt="Powerpack을 업데이트하는 작업 메뉴 옵션과 Powerpack 헤더의 케밥 메뉴로 액세스할 수 있는 Powerpack 인스턴스" style="width:80%;" >}}

Powerpack 상세 내용을 변경하는 방법:
1. 헤더에 마우스 커서를 올리고 케밥 메뉴를 클릭합니다.
1. Powerpack 작업 메뉴에서 **Edit Powerpack Details**를 선택합니다.
1. Powerpack 정보를 변경하고 카테고리를 검색하거나 구성을 필터링한 후 **Update Powerpack**을 선택합니다.
1. 여러 대시보드에 사용되는 Powerpack의 경우, 이 업데이트에 영향을 미치는 Powerpack 인스턴스를 확인하는 프롬프트가 표시됩니다.

**참고**: Powerpack을 업데이트하거나 권한을 수정하려면 [편집 권한](powerpack-permissions)이 있어야 합니다.

## Powerpacks 사용

### Powerpack 인스턴스 추가
Powerpack을 생성한 후 여러 대시보드에 Powerpack 인스턴스를 추가할 수 있습니다.

대시보드에 Powerpack 인스턴스를 추가하는 방법:
1. 위젯 트레이에서 "Powerpack"을 클릭하고 사용 가능한 Powerpacks를 찾습니다. 텍스트나 사전 정의된 태그로도 검색할 수 있습니다.
1. 대시보드에 추가하고 싶은 Powerpack을 클릭하고 해당 Powerpack 인스턴스를 구성합니다.
1. 필터 값과 필터 제어 방법을 선택합니다.
    * Powerpack 필터 - 선택한 값이 Powerpack 인스턴스 내 위젯에 적용됩니다.
    * 대시보드 필터 - 대시보드 템플릿 변수에 의해 제어됩니다.
1. **Confirm**을 클릭합니다.

### Powerpack 인스턴스 사용자 지정

Powerpack 인스턴스를 변경해도 다른 대시보드에 있는 Powerpack 인스턴스에 적용되지 **않습니다**.

대시보드에 있는 Powerpack 인스턴스를 사용자 지정하는 방법:
1. 인스턴스 헤더에 있는 케밥 메뉴를 클릭합니다.
1. 인스턴스 작업 메뉴에서 **Edit Display Options**를 클릭합니다.
1. 헤더에 새 스타일 옵션을 선택하고 그룹 타이틀을 업데이트하거나 내 Powerpack에서 사용되는 필터를 구성합니다.
1. Powerpack 인스턴스의 태그 값을 구성하세요. **Add to dashboard**를 확인하고 대시보드 템플릿 변수로 사용하세요.

{{< img src="dashboards/widgets/powerpack/instance_configuration_modal.png" alt="Powerpack 인스턴스 구성 옵션" style="width:100%;" >}}

## Powerpack 권한

Powerpack 편집 권한을 변경하는 방법:
1. 헤더에 마우스 커서를 올리고 케밥 메뉴를 클릭합니다.
1. Powerpack 작업 메뉴에서 **Modify Permissions**를 선택합니다.
1. Powerpack에 편집 권한을 부여할 사용자를 업데이트합니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/powerpacks-best-practices/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/