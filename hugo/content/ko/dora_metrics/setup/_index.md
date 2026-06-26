---
aliases:
- /ko/continuous_integration/dora_metrics/setup/
further_reading:
- link: /dora_metrics/
  tag: 설명서
  text: DORA 메트릭에 대해 알아보기
title: DORA 메트릭 설정
---

<div class="alert alert-danger">DORA 메트릭은 공개 베타 버전입니다.</div>

## 개요

4개의 DORA 메트릭은 각기 다른 데이터 소스를 지원하는 두 종류의 이벤트에 기반해 계산됩니다.

[**배포 이벤트**][8].
: 특정 환경에서 서비스에 대한 새 배포가 발생했음을 나타냅니다. 배포 이벤트는 배포 빈도, 변경 리드 타임 및 변경 실패율을 계산하는 데 사용됩니다.

[**인시던트 이벤트**][9]: 
: 특정 환경에서 서비스에 대해 새로운 실패가 발생했음을 나타냅니다. 인시던트 이벤트는 변경 실패율과 복원 평균 시간을 계산하는 데 사용됩니다.

## 데이터 소스 설정

### 배포 데이터 소스 선택

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up the data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apmdeploymenttracking" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apiorcli" >}}Deployment Event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

### 인시던트 데이터 소스 선택

{{< whatsnext desc="DORA Metrics supports the following data sources for incident events. See the respective documentation to set up a data source for your incident events:" >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## 한계

- 데이터 소스 옵션(예: 애플리케이션 성능 모니터링(APM) 배포 추적 또는 PagerDuty)을 처음 선택하면 DORA 메트릭은 그 시점부터 데이터를 채우기 시작합니다. 소스 A를 소스 B로 전환했다가 다시 소스 A로 전환하는 경우, 소스 A의 기록 데이터는 처음 선택한 시점부터만 사용할 수 있습니다. 
- 동일한 배포 또는 인시던트(서비스)가 동시에 발생할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[8]: /ko/dora_metrics/setup/deployments/
[9]: /ko/dora_metrics/setup/failures/