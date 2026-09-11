---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: /logs/faq/log-parsing-best-practice
  tag: 설명서
  text: 로그 파싱 - 모범 사례
title: 파싱 되지 않은 로그 모니터링 및 쿼리하기
---

## 개요
로그 파싱은 Datadog 로그 관리에서 쿼리, 모니터, 집계 기능, 또는 민감한 데이터 스캐너와 같은 자동 보강 기능을 최대한으로 이용하기 위해 매우 중요한 요소입니다.
로그 볼륨의 크기를 조정하려고 할 때 파이프라인에서 파싱되지 않은 로그 패턴을 파악하고 수정하기 어렵기 때문입니다.

조직에서 파싱되지 않은 로그 볼륨을 파악하고 조절하는 방법:

1. [파싱되지 않은 로그 감지](#detect-unparsed-logs)
2. [파싱되지 않은 로그 쿼리](#query-for-unparsed-logs)
3. [파싱되지 않은 로그를 추적하는 메트릭 생성](#create-a-metric-to-track-for-unparsed-logs)
4. [파싱되지 않은 로그 볼륨 모니터링](#monitor-the-volume-of-unparsed-logs)


## 파싱되지 않은 로그 감지하기
특정 로그가 파이프라인에서 파싱되었는지 결정하려면 로그를 열고 Event Attribution 패널을 확인하세요. 로그가 파싱되지 않은 경우, 패널에 로그에서 추출된 속성이 나타나지 않고 추출된 속성이 없다는 메시지가 나타납니다.

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="파싱되지 않은 로그 상세 내용" style="width:90%;">}}


[커스텀 파이프라인][1]을 생성하거나 [로그 통합][2]을 로그 소스로 사용한 자동 파이프라인 설정을 이용해 파싱되지 않은 로그를 파싱할 수 있습니다.

## 파싱되지 않은 로그 쿼리하기
로그가 많아 개별로 확인할 수 없는 경우에는 [Log Explorer][3]에서 `datadog.pipelines:false` 필터를 사용해 파싱되지 않은 로그를 필터링할 수 있습니다.

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="파싱되지 않은 로그 쿼리" style="width:90%;">}}

이 필터를 사용하면 파이프라인 처리 후에 커스텀 속성이 없고 인덱싱이 완료된 로그를 모두 반환합니다.
[패턴 집계][4]에는 파싱되지 않은 로그의 일반적인 패턴을 보여주는 집계 보기가 표시되고, 여기에서 커스텀 파이프라인 생성을 시작할 수 있습니다.

## 파싱되지 않은 로그를 추적하는 메트릭 생성하기
파싱되지 않은 로그를 쿼리하면 파싱되지 않고 _인덱싱된_ 로그를 선택할 수 있습니다. [아카이브][5]에 있는 내용물을 잘 정리할 수 있도록 인덱싱하지 않은 로그도 파싱하는 것이 좋습니다.

파싱되지 않은 로그용 메트릭을 생성하려면 `datadog.pipelines:false` 쿼리를 사용해 [커스터 메트릭][6]을 생성하세요.

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="logs.unparsed 메트릭 생성" style="width:90%;">}}

로그 기반 메트릭의 경우 `group by` 필드에 차원을 추가할 수 있습니다. 위 예시에서 `service`와 `team`으로 그룹화한 것을 볼 수 있습니다. 로그 소유권을 정의하려면 사용 중인 차원에 따라 그룹화하는 것이 좋습니다.
## 파싱되지 않은 로그 볼륨 모니터링하기
조직 내 로그 파싱 볼륨을 조절하려면 파싱되지 않은 로그 볼륨에 할당량을 적용하세요. 이는 인덱싱에 적용하는 [일일 할당량][7]과 비슷한 접근 방식입니다.

파싱되지 않은 로그의 볼륨을 모니터링하는 방법:
1. [메트릭 모니터링][8]을 생성합니다.
2. 이전에 생성해 둔 `logs.unparsed` 메트릭을 사용하세요.
3. `team`별 할당량을 정의하세요.
4. 알림을 받고 싶은 조건에 맞게 [알림 조건][9]을 설정하세요.

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="파싱되지 않은 로그 쿼리" style="width:90%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/logs/log_configuration/pipelines
[2]: /ko/integrations/#cat-log-collection
[3]: /ko/logs/explorer/
[4]: /ko/logs/explorer/#patterns
[5]: /ko/logs/archives/?tab=awss3
[6]: /ko/logs/logs_to_metrics/
[7]: /ko/logs/indexes#set-daily-quota
[8]: /ko/monitors/types/metric/?tab=threshold#overview
[9]: /ko/monitors/types/metric/?tab=threshold#set-alert-conditions