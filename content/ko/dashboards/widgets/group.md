---
aliases:
- /ko/graphing/widgets/group/
description: 대시보드 위젯에서 위젯을 그룹화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 그룹 위젯
---

그룹 위젯을 사용하면 [타임보드][1]에 있는 유사한 그래프들을 함께 보관할 수 있습니다. 각 그룹에는 커스텀 헤더가 있고, 일대다 그래프를 보유할 수 있으며, 접을 수도 있습니다.

{{< img src="dashboards/widgets/group/group.mp4" alt="그룹 위젯" video="true" >}}

## 구성

그룹의 오른쪽 상단 모서리에 있는 톱니바퀴 아이콘을 사용하여 그룹 이름을 선택하세요.

## API

이 위젯은 **대시보드 API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

변경 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/#timeboards
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/