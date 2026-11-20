---
aliases:
- /ko/continuous_integration/dora_metrics/setup/incidents
- /ko/dora_metrics/setup/incidents
description: DORA Metrics에 대한 인시던트 이벤트 전송 방법
further_reading:
- link: /continuous_integration/dora_metrics/setup/deployments
  tag: 설명서
  text: DORA Metrics에서 배포 데이터 설정
- link: /tracing/service_catalog
  tag: 설명서
  text: Service Catalog에 대해 알아보기
- link: https://github.com/DataDog/datadog-ci
  tag: 소스 코드
  text: datadog-ci CLI 도구에 대해 알아보기
- link: /continuous_delivery/deployments
  tag: 설명서
  text: Deployment Visibility에 대해 알아보기
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 소프트웨어 배포 릴리스를 확인하세요! (앱 로그인 필요)
is_beta: true
title: DORA Metrics에 대한 인시던트 데이터 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">현재 선택한 사이트({{< region-param key="dd_site_name" >}})에서 DORA 메트릭을 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-danger">DORA 메트릭은 공개 베타 버전입니다.</div>

## 개요

실패한 배포 이벤트는 현재 인시던트 이벤트로 간주되며, [변경 실패율](#calculating-change-failure-rate) 및 [평균 복구 시간(MTTR)](#calculating-mean-time-to-restore)을 계산하는 데 사용됩니다.

## 인시던트 데이터 소스 선택

{{< whatsnext desc="DORA Metrics는 배포 이벤트에 관해 다음 데이터 소스를 지원합니다. 배포 이벤트의 데이터 소스를 설정하려면 해당 문서를 참고하세요:" >}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## 변경 실패율 계산
변경 실패율에는 [배포 데이터][7]와 [인시던트 데이터](#configuring-failure-data-sources)가 모두 필요합니다.

변경 실패율은 총 배포 횟수 중 인시던트 이벤트의 비율로 계산됩니다. Datadog은 실패 이벤트와 배포 이벤트가 모두 연결된 경우 동일한 서비스 및/또는 팀에 `dora.incidents.count`를 `dora.deployments.count`로 나누어 계산합니다.

## 복구 시간 계산
복구 시간은 *해결된 인시던트* 이벤트의 기간 분포로 계산됩니다.

DORA Metrics는 각 인시던트 이벤트의 시작 및 종료 시간을 기록하여 `dora.time_to_restore` 메트릭을 생성합니다. 선택한 기간 동안 `dora.time_to_restore` 데이터 포인트의 평균으로 평균 복구 시간(MTTR)을 계산합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ko/tracing/service_catalog
[4]: /ko/tracing/service_catalog/setup
[5]: /ko/tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /ko/dora_metrics/deployments