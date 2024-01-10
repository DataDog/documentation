---
description: 이러한 메트릭은 Synthetic Monitoring 테스트에 의해 생성됩니다.
further_reading:
- link: /synthetics/guide/api_test_timing_variations/
  tag: 설명서
  text: API 테스트 타이밍 및 변형에 대해 알아보기
- link: /synthetics/guide/using-synthetic-metrics/
  tag: 설명서
  text: 모니터에서 Synthetic 메트릭 사용에 대해 알아보기
- link: /continuous_testing/settings
  tag: 설명서
  text: 연속 테스트를 위한 병렬화에 대해 알아보기
kind: 설명서
title: Synthetic Monitoring & Continuous Testing Metrics
---

## 개요

다음 메트릭은 Synthetic Monitoring 테스트 및 Continuous Testing 설정에 의해 생성됩니다.

메트릭이

* `synthetics.test_runs`로 시작하면 모든 Synthetic 테스트에서 제공됩니다.
* `datadog.estimated_usage.synthetics.*`로 시작하면 Synthetic 테스트에서 관련 사용량 데이터를 반환합니다.
* `synthetics.on_demand`로 시작하면 [Continuous Testing](#continuous-testing)에 대한 관련 사용량 데이터를 반환합니다.

메트릭이

* `synthetics.api.*`로 시작하면 [API 테스트][1]에서 제공됩니다.
    * `synthetics.http.*`로 시작하면 API [HTTP 테스트][2]에서 제공됩니다.
    * `synthetics.ssl.*`로 시작하면 API [SSL 테스트][3]에서 제공됩니다.
    * `synthetics.dns.*`로 시작하면 API [DNS 테스트][4]에서 제공됩니다.
    * `synthetics.websocket.*`로 시작하면 API [WebSocket 테스트][5]에서 제공됩니다.
    * `synthetics.tcp.*`로 시작하면 API [TCP 테스트][6]에서 제공됩니다.
    * `synthetics.udp.*`로 시작하면 API [UDP 테스트][7]에서 제공됩니다.
    * `synthetics.icmp.*`로 시작하면 API [ICMP 테스트][8]에서 제공됩니다.
* `synthetics.multi.*`로 시작하면 [다단계 API 테스트][9]에서 제공됩니다.
* `synthetics.browser.*`로 시작하면 [브라우저 테스트][10]에서 제공됩니다.
* `synthetics.pl.*`로 시작하면 [프라이빗 위치][11]에서 제공됩니다.

### 일반 메트릭

{{< get-metrics-from-git "synthetics" "synthetics.test_runs synthetics.test_run_steps datadog.estimated_usage.synthetics" >}}

### API 테스트

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### HTTP 테스트

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### SSL 테스트

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

#### DNS 테스트

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### WebSocket 테스트

{{< get-metrics-from-git "synthetics" "synthetics.websocket" >}}

#### TCP 테스트

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### UDP 테스트

{{< get-metrics-from-git "synthetics" "synthetics.udp" >}}

#### ICMP 테스트

{{< get-metrics-from-git "synthetics" "synthetics.icmp" >}}

API 테스트 타이밍에 대한 자세한 내용은 [API 테스트 타이밍 및 변형][12] 가이드를 참조하세요.

### 다단계 API 테스트

{{< get-metrics-from-git "synthetics" "synthetics.multi" >}}

### 브라우저 테스트

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### 프라이빗 위치

{{< get-metrics-from-git "synthetics" "synthetics.pl.worker" >}}

### Continuous Testing

{{< get-metrics-from-git "synthetics" "synthetics.on_demand.concurrency" >}}

병렬화에 대한 자세한 내용은 [연속 테스트 설정][13]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/
[2]: /ko/synthetics/api_tests/http_tests
[3]: /ko/synthetics/api_tests/ssl_tests
[4]: /ko/synthetics/api_tests/dns_tests
[5]: /ko/synthetics/api_tests/websocket_tests
[6]: /ko/synthetics/api_tests/tcp_tests
[7]: /ko/synthetics/api_tests/udp_tests
[8]: /ko/synthetics/api_tests/icmp_tests
[9]: /ko/synthetics/multistep/
[10]: /ko/synthetics/browser_tests/
[11]: /ko/synthetics/private_locations/
[12]: /ko/synthetics/guide/api_test_timing_variations/
[13]: /ko/continuous_testing/settings/#parallelization