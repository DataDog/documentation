---
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터링 생성 방법 알아보기
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림 설정하기
kind: 지침
title: 클러스터 경고를 생성하여 일정 비율의 그룹이 위험 상태일 시 알림을 받으세요.
---

## 개요

본 지침에서는 조건을 충족하는 각 그룹에 관한 알림을 개별 전송하지 않고 지정 비율 도달 시에만 전송하는 알림을 생성하는 방법을 알아봅니다.
예를 들어, 위험 상태의 호스트 또는 컨테이너가 지정 비율에 도달할 시에만 알림을 보내는 모니터링을 설정하고 싶은 경우에 유용합니다.

### 예시: CPU 사용량이 높은 호스트의 비율에 관한 경고

본 예제에서는 CPU 사용량이 50%를 초과하는 호스트가 40%에 도달할 시 알림을 수신하는 법을 설명합니다. 다음과 같이 `min_cutoff`, `count_nonzero` 함수를 활용하세요.

* `min_cutoff` 함수를 사용하여 CPU 사용량이 50%를 초과하는 호스트의 수를 계산합니다.
* `count_nonzero` 함수를 사용하여 호스트의 총 개수를 계산합니다.
* CPU 사용량이 50%를 초과하는 호스트의 결과 백분율을 서로 나눕니다.

{{< img src="monitors/faq/cluster-condition.png" alt="클러스터-경고-조건" >}}

* 그런 다음 해당 조건을 만족하는 호스트의 비율이 40%에 도달할 시 알림을 보내도록 조건을 설정합니다.

{{< img src="monitors/faq/cluster-trigger.png" alt="클러스터-경고-발동" >}}

모니터링은 지난 10분 동안 CPU 사용량이 50%를 초과한 호스트의 비율을 추적하고, 그 중 지정된 조건을 충족하는 호스트가 40% 이상인 경우 알림을 생성합니다.

{{< img src="monitors/faq/cluster-status.png" alt="클러스터-경고-상태" >}}

{{< partial name="whats-next/whats-next.html" >}}