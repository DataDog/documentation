---
aliases:
- /ko/graphing/widgets/check_status/
description: 수행된 점검의 현재 상태 또는 결과 수를 그래프화합니다.
further_reading:
- link: /developers/service_checks
  tag: 설명서
  text: 서비스 점검에 대해 자세히 알아보기
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 점검 상태 위젯
widget_type: check_status
---

서비스 점검은 특정 서비스의 증가 또는 감소 상태를 모니터링합니다. 모니터링 에이전트가 연속 점검에서 특정 횟수에 걸쳐 서비스에 연결하는 데 실패하는 경우 알림이 트리거됩니다. 점검 상태 위젯은 시각적으로 대시보드에 서비스 감소, 서비스 실패, 클러스터 전반의 이슈, 처리량 감소, 지연 증가를 표시합니다. 자세한 정보는 [서비스 점검][1] 설명서를 참조하세요.

점검 상태는 수행된 점검의 현재 상태 또는 결과 수를 보여줍니다.

{{< img src="dashboards/widgets/check_status/check_status.png" alt="점검 상태 위젯" >}}

## 설정

### 구성

1. 이전에 생성된 [서비스 점검][1]을 선택합니다.
2. 보고 시간 프레임을 선택합니다. 이 시간 프레임은 항상 현재까지를 포함하므로, `The past 10 minutes` 또는 `The past 1 day` 등 옵션을 선택할 수 있으며 현재까지의 시간 프레임을 포함하는 상태를 보고합니다. `Global Time`을 선택하면 대시보드를 사용하는 사람은 오른쪽 상단의 시간 프레임 선택기를 사용하여 범위를 선택할 수 있지만, _현재 시점을 포함하는 시간 프레임을 선택해야 합니다_. 이는 `past X` 시간 프레임에 해당합니다. 그렇지 않으면 위젯이 비어 있는 상태가 됩니다.
3. 다음에서 범위를 선택합니다.
    * **단일 점검**: 점검 상태 위젯이 특정 요소에만 해당하는 경우, 예를 들어 하나의 `host:<HOSTNAME>`, 하나의 `service:<SERVICE_NAME>`이라면 이 옵션을 선택하세요.
    * **점검 클러스터**: 점검 상태 위젯이 모든 `host` 또는 모든 `service`에서와 같이 요소 범위에 해당한다면 이 옵션을 선택하세요.

4. 범위를 선택한 후 **Reported by** 필드로 점검 상태 위젯 컨텍스트를 정의합니다.
5. **점검 클러스터**의 범위에 대해 **그룹화 기준** 필드 내에서 하위 설정을 선택할 수 있는 옵션이 있습니다. **참고**: 점검 상태는 그룹별 점검 횟수를 보여주지 않습니다. 점검이 실행된 그룹의 개수를 표시합니다. 예를 들어 `env`별로 그룹화된 에이전트 증가를 모니터링하는 경우 점검 상태는 환경에 있는 에이전트 개수가 아니라 범위 설정과 일치하고 에이전트가 실행되는 `env`의 개수를 표시합니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/service_checks
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/