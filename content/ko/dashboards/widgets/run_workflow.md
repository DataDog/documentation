---
disable_toc: false
further_reading:
- link: /service_management/workflows/
  tag: 설명서
  text: 워크플로우 자동화
kind: 설명서
title: 워크플로우 위젯 실행
widget_type: run_workflow
---

## 개요

워크플로우 위젯 실행을 사용하여 대시보드에서 중요 작업을 자동화할 수 있습니다. 시스템 상태에 영향을 미치는 문제를 인지한 시점에 대시보드에서 워크플로우를 트리거합니다. 이렇게 하면 문제 해결 시간을 단축하고 오류 발생 가능성을 줄여 시스템을 계속 구동할 수 있습니다.

## 설정

1. **워크플로우 선택하기**의 드롭다운 메뉴에서 원하는 워크플로우를 찾습니다.
1. 대시보드 템플릿 변수를 워크플로우 입력 파라미터 에 매핑합니다. 이렇게 하면 워크플로우를 실행할 때 대시보드 템플릿 변수의 값을 파라미터 입력값에 직접 매핑할 수 있습니다.
1. 위젯의 이름을 입력하고 **저장**을 클릭합니다.

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="워크플로우 실행을 클릭하여 대시보드 위젯에서 워크플로우를 트리거합니다." >}}

워크플로우를 실행하려면 다음에 따릅니다.
1. 대시보드 위젯에서 **워크플로우 실행**을 클릭합니다.
1. **실행 파라미터**의 워크플로우 입력값에 매핑한 템플릿 변수가 자동으로 채워집니다. 매핑되지 않은 실행 파라미터에 값을 입력하거나 필요한 경우 기존 값을 편집합니다.
1. **실행**을 클릭하여 워크플로우를 실행합니다.

## API

이 위젯을 **[대시보드 API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]와 관해서는 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/