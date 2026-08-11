---
aliases:
- /ko/synthetics/private_locations/dimensioning
description: 컨테이너화된 프라이빗 위치에 대한 규모 권장 사항
further_reading:
- link: /synthetics/private_locations/monitoring
  tag: 설명서
  text: 개인 로케이션 모니터링하기
title: 프라이빗 위치 규모 측정
---

<div class="alert alert-info">규모 권장 사항은 컨테이너화된 프라이빗 위치에 해당합니다.</div>

## 개요

프라이빗 위치에서는 [API][1], [다단계 API][2] 및 [브라우저 테스트][3]를 실행할 수 있습니다. 브라우저 테스트는 API 및 다단계 API 테스트보다 리소스 집약적입니다. 하나의 프라이빗 위치에서 여러 유형의 테스트를 실행할 수도 있습니다.

테스트 유형, 최대 테스트 실행 수 및 총 하드웨어 요구 사항을 정의함으로써 프라이빗 위치의 규모를 계산하고 여러 작업자에게 리소스를 배포하여 테스트 실행의 효율성을 향상시킬 수 있습니다.

규모 측정을 개선하려면 테스트 유형에 따라 테스트 할당을 분할하세요. 예를 들어 일부 프라이빗 위치에서는 API 및 다단계 API 테스트만 실행하고 다른 프라이빗 위치에서는 브라우저 테스트만 실행하도록 할 수 있습니다.

### 필수 요건

프라이빗 위치의 규모 측정을 시작하려면 다음이 필요합니다.

1. 컨테이너 오케스트레이션과 프라이빗 위치를 실행하는 데 사용하는 특정 옵션에 대한 기본적인 이해.
2. 프라이빗 위치 구성 파일은 선택한 오케스트레이터에 마운트되며 기본 프라이빗 위치 컨테이너에서 액세스할 수 있습니다.
3. [IP 차단을 사용한 브라우저 테스트][4]를 사용하는 경우 `sudo` 액세스가 필요할 수 있습니다.

### 최대 테스트 실행 횟수 정의

리소스 요구 사항은 프라이빗 위치에서 병렬로 실행할 수 있는 최대 테스트 실행 횟수와 테스트하려는 애플리케이션에 따라 달라집니다. 주문형 테스트(예: [CI/CD 파이프라인][5]의 일부로 테스트를 실행할 때)에서 발생할 수 있는 스파이크와 로드해야 하는 자산의 크기 및 수를 고려하세요.

최대 테스트 실행 횟수로 프라이빗 위치의 `concurrency` 파라미터를 정의하세요. 기본적으로 병렬로 실행되는 최대 테스트 수는 10입니다.

자세한 정보는 [고급 설정][4]을 참고하세요.

### 총 하드웨어 요구 사항 정의

실행하려는 테스트 유형과 병렬로 실행하려는 최대 테스트 실행 수를 파악한 후 프라이빗 위치에 대한 총 하드웨어 요구 사항을 정의합니다.

CPU의 기본 요구 사항은 150mCores이고 메모리의 기본 요구 사항은 150MiB입니다.

추가 요구 사항은 프라이빗 위치의 테스트 유형에 따라 다릅니다.

| 테스트 유형                                      | CPU/메모리/디스크 권장 사항    |
| --------------------------------------------- | --------------------------------- |
| [API 테스트][1] 및 [다단계 API 테스트][2] | 테스트 실행 당 100mCores/200MiB/100MiB    |
| [브라우저 테스트][3]                           | 테스트 실행 당 800mCores/1GiB/500MiB  |

예를 들어, Datadog은 최대 동시 테스트 실행 횟수가 `10`인 브라우저 테스트만 실행하는 프라이빗 위치에 대해 최대 8코어 CPU `(150mCores + (800mCores*10 test runs))`, 최대 10GiB 메모리 `(150MiB + (1GiB*10 test runs))`, 최대 5GiB 디스크 `(500MiB*10 test runs)`를 권장합니다.

**참고:** 프라이빗 위치에서 API 또는 다단계 API 테스트와 브라우저 테스트를 실행하려는 경우 Datadog에서는 브라우저 테스트 요구 사항을 통해 전체 하드웨어 요구 사항을 계산할 것을 권장합니다.

### 프라이빗 위치에 리소스 할당

[프라이빗 위치에 대한 총 요구 사항](#define-your-total-hardware-requirements)을 결정한 후 이러한 리소스를 배포할 방법을 결정합니다. 즉, 모든 리소스를 단일 작업자에게 할당하거나 모든 리소스를 여러 작업자에 배포합니다. 
단일 작업자에게 모든 리소스를 할당하려면 구성 파일을 사용하여 프라이빗 위치에 대해 하나의 컨테이너를 실행하세요.
1. [`concurrency` 파라미터][4]를 `maximum number of test runs that can be executed in parallel on your private location`으로 설정합니다.
2. [총 프라이빗 위치 리소스 요구 사항](#define-your-total-hardware-requirements)을 고유한 컨테이너에 할당하세요.

여러 작업자에게 리소스를 배포하려면 구성 파일을 사용하여 프라이빗 위치에 대해 여러 컨테이너를 실행하세요.

 1. [`concurrency`][4] 파라미터를 `maximum number of test runs that can be executed on your private location / number of workers associated with your private location`으로 설정합니다.
 2. `total private location resource requirements / number of workers` 리소스를 모든 프라이빗 위치 컨테이너에 할당합니다.


예를 들어 Datadog은 최대 동시 테스트 실행 횟수가 `10`인 브라우저 테스트만 실행하는 프라이빗 위치에 대해 최대 8코어 CPU, 최대 10GiB 메모리 및 최대 5GiB 디스크를 권장합니다. 이러한 리소스를 두 작업자에 분산하려면 [`concurrency` 파라미터][4]를 5로 설정하고 각 작업자에 최대 4코어 CPU, 최대 5GiB 메모리 및 최대 2.5GiB 디스크를 할당합니다.

#### 대기열 매커니즘

여러 작업자가 프라이빗 위치와 연결된 경우 각 작업자는 [`concurrency` 파라미터][4] 및 할당할 수 있는 추가 테스트 실행 수에 따라 몇 가지 테스트 실행을 요청합니다.

예를 들어, 2개의 작업자가 실행 중인 프라이빗 위치에서 10개의 테스트가 동시에 실행되도록 예약되어 있습니다. 작업자 1이 두 개의 테스트를 실행하는 경우 작업자 1은 세 개의 추가 테스트 실행을 요청할 수 있습니다. 작업자 2가 테스트를 실행하지 않는 경우 작업자 2는 다음 5개의 테스트를 요청할 수 있습니다.

나머지 두 테스트는 테스트 실행을 먼저 마친 작업자(사용 가능한 슬롯이 있는 작업자)가 요청할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/
[2]: /ko/synthetics/multistep?tab=requestoptions
[3]: /ko/synthetics/browser_tests/?tab=requestoptions
[4]: /ko/synthetics/private_locations/configuration#advanced-configuration
[5]: /ko/synthetics/cicd_integrations