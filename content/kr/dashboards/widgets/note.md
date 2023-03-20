---
aliases:
- /kr/graphing/widgets/note/
description: 대시보드 위젯에 텍스트를 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드를 구축하는 방법 알아보기
kind: 설명서
title: 메모 및 링크 위젯
---

**메모 및 링크** 위젯은 [자유 텍스트 위젯][1]과 비슷하지만 더 많은 서식 및 표시 옵션이 포함되어 있습니다.

## 구성

1. 표시할 텍스트를 입력합니다. 마크다운이 지원됩니다.
2. 프리셋 템플릿을 선택하거나 표시 옵션을 맞춤 설정합니다.
3. 텍스트 크기와 위젯의 배경색을 선택합니다.
4. 텍스트 위치를 조정하려면 **Alignment** 버튼을 클릭합니다. 패딩을 포함하지 않으려면 **No Padding**을 클릭합니다.
5. 포인터를 포함하려면 **Show Pointer**를 클릭하고 드롭다운 메뉴에서 포지션을 선택합니다.

{{< img src="dashboards/widgets/note/overview.png" alt="메모 및 링크 위젯 편집기의 마크다운 필드에 텍스트 추가" style="width:90%;" >}}

위젯을 만들 준비가 되면 **Save**를 클릭합니다.

이 위젯은 템플릿 변수를 지원합니다. `{TX-PL-LABEL}lt;VARIABLE_NAME>.value` 구문을 사용하여 위젯 콘텐츠를 동적으로 업데이트합니다.

{{< img src="dashboards/widgets/note/template_variable.png" alt="메모 및 링크 위젯 편집기의 마크다운 필드에서 템플릿 변수 사용" style="width:90%;" >}}

이 예시에서 `$env.value`은(는) 선택한 환경에 대한 링크 값을 업데이트합니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

메모 위젯 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/widgets/free_text/
[2]: /kr/api/v1/dashboards/
[3]: /kr/dashboards/graphing_json/widget_json/