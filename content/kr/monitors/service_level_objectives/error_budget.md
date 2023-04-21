---
description: 모니터를 사용하여 SLO의 오류 예산 소모에 대한 경보를 받습니다.
further_reading:
- link: /monitors/service_level_objectives/
  tag: 설명서
  text: 서비스 수준 목표(Service Level Objectives) 개요
kind: 설명서
title: 오류 예산 경보
---

## 개요

SLO 오류 예산 경보는 임곗값을 기반으로 하며 SLO 오류 예산이 특정 비율만큼 소모될 시 알림을 표시합니다. 예를 들어, 7일 목표에 대한 오류 예산의 75%가 사용되는 경우 알림을 표시하고, 50%가 사용될 시 경보가 나타나도록 할 수 있습니다(선택 사항).

**참고:** 오류 예산 경보는 메트릭 모니터 유형 (메트릭, 통합, APM 메트릭, 이상, 예측 또는 아웃라이어 모니터)으로만 구성된 [메트릭 기반 SLO][1] 또는 [모니터 기반 SLO][2]에서만 사용할 수 있습니다.

*오류 예산*을 포함한 SLO 관련 주요 용어에 대한 설명은 [서비스 수준 목표(Service Level Objectives)][3]를 참고하시기 바랍니다.

{{< img src="monitors/service_level_objectives/error_budget_alert_config.png" alt="Error budget alert configuration">}}

## 모니터 생성

1. [SLO 상태 페이지][4]로 이동하세요.
2. 새 SLO를 만들거나 기존 SLO를 편집한 다음 **경보 저장 및 설정* 버튼을 클릭합니다. 기존 SLO의 경우 SLO 세부 정보 사이드 패널에서 **경보 설정** 버튼을 클릭하여 바로 이동할 수도 있습니다.
3. **1단계: 경보 조건 설정**에서 **오류 예산** 탭을 선택합니다.
4. 사용된 오류 예산의 백분율이 `threshold`를 초과할 때 경보가 표시되도록 설정합니다.
지난 `target` 일 
4. **진행 상황** 및 **팀에 알리기** 섹션에 [알림 정보][5]를 추가합니다.
5. SLO 설정 페이지에서 '경보 저장 및 설정' 버튼을 클릭합니다.

{{< img src="monitors/service_level_objectives/save_set_alert.png" alt="Save SLO and set up an error budget alert">}}

### API 와 Terraform

[create-monitor API endpoint][6]를 사용하여 SLO 오류 예산 경보를 생성할 수 있습니다. 아래 예제는 SLO 오류 예산의 75% 이상이 사용될 때 경보가 나타나도록 하는 쿼리입니다. *slo_id*를 자금 소진율 경보를 설정하고자 하는 SLO의 영숫자 ID로 바꾸고 *time_window*는 설정 목표에 따라 7일, 30일 또는 90일 중 하나로 변경합니다:

```
error_budget("slo_id").over("time_window") > 75
```

또한 [Terraform의 datadog_monitor resource][7]를 사용하여 SLO 오류 예산 경보를 생성할 수 있습니다. 다음은 위와 같은 쿼리를 사용하여 메트릭 기반 SLO에 대한 오류 예산 경보를 설정하는 예 `.tf`입니다.

**프로바이더 v2.7.0 또는 이전 버전, v2.13.0 또는 이상 버전인 경우**

**참고:** SLO 오류 예산 경보는 Terraform 프로바이더 v2.7.0 또는 이전 버전, v2.13.0 또는 이상 버전에서만 지원됩니다. v2.7.0과 v2.13.0 사이의 버전은 지원되지 않습니다.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /kr/monitors/service_level_objectives/metric/
[2]: /kr/monitors/service_level_objectives/monitor/
[3]: /kr/monitors/service_level_objectives/#key-terminology
[4]: https://app.datadoghq.com/slo
[5]: /kr/monitors/notify/
[6]: /kr/api/v1/monitors/#create-a-monitor
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor