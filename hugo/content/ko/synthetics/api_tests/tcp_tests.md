---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱(Synthetic) API 테스트
  tags:
  - tcp
  - tcp test
  - tcp tests
aliases:
- /ko/synthetics/tcp_test
- /ko/synthetics/tcp_check
description: 호스트에서 TCP 연결 시뮬레이션
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 호스트에서 TCP 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터에 대해 알아보기
title: TCP 테스트
---

## 개요

TCP 테스트를 사용하면 특정 호스트의 포트에 낮은 수준의 TCP 연결이 설정될 수 있는지 여부를 모니터링하여 `SSH` (22), `SMTP` (25), `DNS` (53), `HTTPS` 기반 VPN (443), 그리고 다른 포트에 있는 모든 커스텀 서비스와 같은 여러 주요 서비스의 가용성을 보장할 수 있습니다. 내장된 응답 시간 데이터를 사용하여 네트워크 애플리케이션의 성능을 추적하고 예상치 못한 속도 저하가 발생할 경우 알림을 받습니다.

TCP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 사용자 선호도에 따라 [관리형](#select-locations) 및 [프라이빗 위치][1] 모두에서 실행할 수 있습니다. TCP 테스트는 일정에 따라, 주문형으로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 설정

`TCP` 테스트 생성을 선택한 후 테스트 요청을 정의합니다.

### 요청 정의하기

1. 테스트를 실행할 **Host** 및 **Port**를 지정합니다. 
2. **Track number of network hops (TTL)** 사용 여부를 결정합니다. 이 옵션을 사용하면 네트워크 홉의 개수를 확인하고 테스트 결과에서 TCP Traceroute에 액세스할 수 있습니다.
3. 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다(옵션).
4. TCP 테스트의 **이름**을 지정합니다.
5. TCP 테스트에 `env` **태그** 및 기타 태그를 추가합니다. 그런 다음 이러한 태그를 사용하여  [Synthetic Monitoring & Continuous Testing 페이지][3]에서 신서틱(Synthetic) 테스트를 필터링할 수 있습니다.

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="TCP 연결 정의" style="width:90%;" >}}

**URL 테스트**를 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.

### 어서션(표명) 정의하기

어설션은 예상되는 테스트 결과를 정의합니다. **Test URL**을 클릭하면 `response time`에 대한 기본 어설션이 추가됩니다. 테스트에서 모니터링할 어설션을 하나 이상 정의해야 합니다.

| 유형          | 연산자                                                                | 가치 유형     |
|---------------|-------------------------------------------------------------------------|----------------|
| 응다 | `is less than`                                                          | _Integer (ms)_ |
| 네트워크 홉    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _정수_        |
| connection | `is`                                                          | `established`, `refused`, `timeout` |

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="TCP 테스트의 성공 또는 실패에 대한 어설션 정의" style="width:90%;" >}}

테스트에 응답 본문에 대한 어션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어서션이 포함되어 있고 제한 시간 제한에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

TCP 테스트를 실행할 **Locations**를 선택합니다. TCP 테스트는 네트워크 외부 또는 내부에서 연결을 시작하려는 사용자의 선호도에 따라 관리형 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다.

{{% managed-locations %}} 

### 테스트 빈도 지정

TCP 테스트를 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 사용자가 가장 중요한 서비스에 항상 액세스할 수 있도록 합니다. Datadog이 TCP 테스트를 실행할 빈도를 선택합니다.
* [** CI/CD 파이프라인 내**][2].
* **온디맨드**로 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 변수 사용

URL, 고급 옵션 및 TCP 테스트의 어설션에서 [**Settings** 페이지에 정의된 전역 변수][8]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

## 테스트 실패

하나 이상의 어서션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라서는 엔드포인트 어서션 테스트 없이 해당 테스트가 실패할 수 있습니다.

다음과 같은 이유가 있습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹 서버가 응답 도중 오류 또는 충돌이 발생하였거나 웹 서버의 연결이 끊어졌기 때문일 수 있습니다.

`DNS`
: 테스트 URL에 대한 DNS 엔트리를 찾을 수 없습니다. 가능한 원인으로는 테스트 URL이 잘못 설정되었거나 DNS 엔티티 설정이 잘못되었기 때문일 수 있습니다.

`INVALID_REQUEST` 
: 테스트 구성이 유효하지 않습니다(예: URL에 오타가 있습니다).

`TIMEOUT`
: 요청을 적절한 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`이 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`는 요청 기간이 테스트에 정의된 시간 제한에 도달했음을 나타냅니다(기본값은 60초로 설정됨).
  각 요청에 대해 완료된 요청 단계만 네트워크 폭포에 표시됩니다. 예를 들어, `Total response time`만 표시되는 경우 DNS 확인 중에 시간 초과가 발생했습니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 요청 및 어서션 실행 시간이 최대 실행 시간(60.5초)에 도달했음을 나타냅니다.

## 권한 허용

기본적으로 [Datadog Admin 및 Datadog Standard 역할][9]이 있는 사용자만 Synthetic TCP 테스트를 생성, 편집, 삭제할 수 있습니다. Synthetic TCP 테스트의 생성, 편집, 삭제 액세스 권한을 얻으려면 사용자를 두 가지 [기본 역할][9] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][10]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 

계정에서 [사용자 정의 역할][11]을 사용하는 고객에게는 액세스 제한이 제공됩니다.

조직 내 역할에 따라 TCP 테스트의 액세스를 제한할 수 있습니다. TCP 테스트를 생성할 때 사용자 외에 어떤 역할이 테스트를 읽고 쓸 수 있는지 선택합니다.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[4]: /ko/monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /ko/synthetics/guide/synthetic-test-monitors
[8]: /ko/synthetics/settings/#global-variables
[9]: /ko/account_management/rbac/
[10]: /ko/account_management/rbac#custom-roles
[11]: /ko/account_management/rbac/#create-a-custom-role