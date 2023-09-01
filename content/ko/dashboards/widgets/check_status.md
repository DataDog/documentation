---
aliases:
- /ko/graphing/widgets/check_status/
description: 수행된 점검의 현재 상태 또는 결과 수를 그래프화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 점검 상태 위젯
---

점검 상태는 수행된 점검의 현재 상태 또는 결과 수를 보여줍니다.

{{< img src="dashboards/widgets/check_status/check_status.png" alt="점검 상태 위젯" >}}

## 구성

{{< img src="dashboards/widgets/check_status/check_status_setup.png" alt="점검 상태 위젯 구성" style="width:80%;">}}

### 설정

1. 이전에 생성한 서비스 점검을 선택합니다.
2. 보고 시간 프레임을 선택합니다. 이 시간 프레임은 항상 현재까지를 포함하므로, `The past 10 minutes` 또는 `The past 1 day` 등 옵션을 선택할 수 있으며 현재까지의 시간 프레임을 포함하는 상태를 보고합니다. `Global Time`을 선택하면 대시보드를 사용하는 사람은 오른쪽 상단의 시간 프레임 선택기를 사용하여 범위를 선택할 수 있지만, _현재 시점을 포함하는 시간 프레임을 선택해야 합니다_. 이는 `past X` 시간 프레임에 해당합니다. 그렇지 않으면 위젯이 비어 있는 상태가 됩니다.
3. 다음에서 범위를 선택합니다.
    * **단일 점검**: 점검 상태 위젯이 특정 요소에만 해당하는 경우, 예를 들어 하나의 `host:<HOSTNAME>`, 하나의 `service:<SERVICE_NAME>`이라면 이 옵션을 선택하세요.
    * **점검 클러스터**: 점검 상태 위젯이 모든 `host` 또는 모든 `service`에서와 같이 요소 범위에 해당한다면 이 옵션을 선택하세요.

4. 범위를 선택한 후 **Reported by** 필드로 점검 상태 위젯 컨텍스트를 정의합니다.
5. 선택 사항: 커스텀 태그 키에 따라 점검 결과를 그룹화합니다.

### 옵션

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 사용자 지정 제목을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [Dashboards API documentation][1]을 참조하세요.

점검 상태 위젯의 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/