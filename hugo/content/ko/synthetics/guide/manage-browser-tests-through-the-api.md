---
further_reading:
- link: /api/latest/synthetics
  tag: API
  text: 신서틱 API
- link: https://www.datadoghq.com/blog/private-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 비공개 위치를 통한 온프레미스 애플리케이션 테스트
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트에 대해 자세히 알아보기
title: 프로그래밍 방식으로 브라우저 테스트 관리
---

## 개요

모니터링 애플리케이션의 엔드투엔드 테스트는 사용자 경험을 이해하는 데 매우 중요합니다. [Datadog 테스트 레코더][1]를 사용하면 이러한 복잡한 테스트 워크플로우를 설정으로 간소화할 수 있습니다. 그러나 신세틱 리소스를 프로그래밍 방식으로 관리하고 [API] 또는 [Terraform][14]을 통해 브라우저 테스트를 정의하고 싶을 수도 있습니다.

## API를 통한 브라우저 테스트 관리

Datadog에서는 먼저 Datadog UI에서 브라우저 테스트를 생성하고 API 에서 테스트 설정을 검색할 것을 권장합니다.

1. [브라우저 테스트를 생성][2]하고 [녹화를 저장][3]합니다.
2. 모든 테스트의 [목록 엔드포인트 가져오기][4]를 사용하여 모든 신서틱 테스트의 목록을 검색합니다.
3. `type: browser`에서 필터링하고 API로 관리하려는 브라우저 테스트의 `public_ids`을 검색합니다. 
4. [브라우저 테스트 엔드포인트 가져오기][5]를 사용하여 모든 브라우저 테스트의 설정 파일을 검색합니다.

브라우저 테스트 설정 파일을 저장하여 나중에 사용하거나 프로그래밍 방식으로 브라우저 테스트를 복제, 업데이트 및 삭제하는 데 사용할 수 있습니다.

## Terraform으로 브라우저 테스트 관리

[Datadog Terraform 공급자][6]을 사용하여 Terraform 설정을 통해 프로그램밍 방식으로 연결된 신서틱 리소스 및 브라우저 테스트를 생성하고 관리합니다. 또한 기존 리소스를 [가져오기][7]을 통해 Terraform 설정으로 가져오거나 기존 리소스를 외부 [데이터 소스][9]로 참조할 수도 있습니다.

### 브라우저 테스트

`type`을 `browser`로 설정한 [신서틱(Synthetic) 테스트 리소스][8]를 사용하여 Terraform을 통해 브라우저 테스트를 생성하고 관리할 수 있습니다. 

### 프라이빗 위치

커스텀 또는 보안 위치에서 신서틱(Synthetic) 테스트를 실행해야 하는 경우 [비공개 위치 리소스][10]를 사용하여 비공개 위치를 생성하고 관리하여 테스트를 실행할 수 있습니다. 자세한 내용은 [비공개 위치][11] 페이지에서 확인하세요.

### 글로벌 및 로컬 변수

[신서틱 글로벌 변수 리소스][12]를 사용하여 테스트 간에 안전하게 공유할 수 있는 변수인 합성 글로벌 변수를 생성하고 관리할 수 있습니다. 신서틱(Synthetic) 테스트 리소스에서 [config_variable][16] 중첩 스키마를 `type = "text"`로 정의하여 테스트별로 [나열된 로컬 변수][15]를 생성할 수도 있습니다.

### 동시 실행 제한

[신서틱 동시성 제한 리소스][13]를 사용하면 병렬로 실행되는 신서틱(Synthetic) 테스트의 수를 제한할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /ko/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /ko/getting_started/synthetics/browser_test#create-recording
[4]: /ko/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /ko/api/latest/synthetics/#get-a-browser-test
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[7]: https://developer.hashicorp.com/terraform/cli/import
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[9]: https://developer.hashicorp.com/terraform/language/data-sources
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[11]: /ko/synthetics/private_locations
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[14]: https://www.terraform.io/
[15]: https://docs.datadoghq.com/ko/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable