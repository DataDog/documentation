---
aliases:
- /ko/monitors/faq/what-are-recovery-thresholds
further_reading:
- link: /monitors/types/metric/
  tag: 설명서
  text: 메트릭 모니터
title: 복구 기준치
---

## 정의

복구 기준치는 경고 또는 주의 상태에서 모니터 복구에 대한 추가 조건을 나타내기 위해 모니터에 추가되는 부수적인 기준치입니다.

## 동작

복구 기준치는 복구 기준치를 **통과**한 경우에만 복구 상태로 들어가도록 모니터 복구 시 조건을 추가합니다. 복구 기준치를 설정하지 않으면 경고 조건이 더 이상 충족되지 않을 때마다 모니터가 복구됩니다.

복구 조건이 충족되면 복구 기준치가 충족됩니다. 복구 조건은 경고 조건에 따라 다릅니다.

| 경고 조건    | 복구 조건          |
|--------------------|-----------------------------|
| > 경고 기준치  | <= 경고 복구 기준치 |
| >= 경고 기준치 | < 경고 복구 기준치  |
| < 경고 기준치  | >= 경고 복구 기준치 |
| <= 경고 기준치 | > 경고 복구 기준치  |

## 사용 사례

복구 기준치는 플래핑 모니터의 노이즈를 줄입니다. 이렇게 하면 복구 시 경고 메트릭이 복구되고 문제가 해결된다는 확신을 높일 수 있습니다.

## 복구 기준치를 설정하는 방법은 무엇인가요?

### 웹사이트 UI

**Set alert conditions** > **Advanced Options**에서 모니터를 생성할 때 경고 또는 주의 복구 기준치를 설정합니다.

### API

[API를 통해 모니터를 생성/편집][1]할 때 JSON 모니터의 `options.thresholds` 속성에서 `critical_recovery` 및 `warning_recovery` 속성을 사용하세요.

```text
"thresholds": {
                "critical": 80,
                "warning": 60,
                "critical_recovery": 70,
                "warning_recovery": 50
              }
```



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/monitors/