---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱 API 테스트
  tags:
  - icmp
  - icmp test
  - icmp tests
aliases:
- /ko/synthetics/icmp_test
- /ko/synthetics/icmp_check
description: 호스트 가용성을 모니터링하고 네트워크 문제 진단하기.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱 모니터링 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에 ICMP Ping 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: 신서틱 테스트 모니터에 관해 알아보기
title: ICMP 테스트
---

## 개요

IMCP 테스트를 사용하면 호스트 사용량을 모니터링하고 네트워크 통신 문제를 진단할 수 있습니다. ICMP Ping 하나나 두 개에서 받은 값을 엔드포인트에 어설션하면 Datadog에서 연결 문제, 지정 시간보다 긴 왕복 대기 시간, 보안 방화벽 구성 내 예상치 못한 변경 사항 등을 감지할 수 있습니다. 또 호스트에 연결하는 데 필요한 네트워크 홉(TTL) 수를 추적할 수 있고, 추적 경로를 확인하여 각 네트워크 홉과 경로의 상세 정보를 찾을 수 있습니다.

ICMP Ping을 외부에서 트리거하느냐 혹은 네트워크 내부에서 트리거하느냐에 따라 ICMP 테스트를 [관리형]](#select-locations)과 [프라이빗 위치][1]에서 실행할 수 있습니다. 정의한 일정에 따라 ICMP 테스트를 실행하거나 온디맨드로 실행할 수 있고, 또는 [CI/CD 파이프라인][2] 내에서 실행할 수도 있습니다.

## 구성

`ICMP` 테스트를 생성한 후 테스트 요청을 정의하세요.

### 요청 정의하기

1. 테스트를 실행할 환경의 **Domain Name**이나 **IP 주소**를 지정하세요.
2. **Track number of network hops (TTL)** 사용 여부를 선택하세요. 이 기능을 사용하면 "추적 경로" 프로브가 활성화되어 호스트 대상으로 가는 게이트웨이와 경로를 모두 찾을 수 있습니다.
3. **Number of Pings**를 테스트 세션별로 트리거되도록 선택하세요. Ping 개수의 기본 값은 네 개입니다. 이 수치를 줄이거나 최대 10개까지로 올릴 수 있습니다.
4. 내 ICMP 테스트의 **이름을 지정**하세요.
5. 내 ICMP 테스트에 `env` 및 기타 **태그**를 추가하세요. 그런 다음 이 태그를 사용해 [Synthetic Monitoring & Continuous Testing page][3] 신서틱 테스트를 필터링할 수 있습니다.

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="ICMP 요청 정의" style="width:90%;" >}}

**URL 테스트**를 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.

### 어설션 정의

어설션은 예상되는 테스트 결과를 정의합니다. **Test URL**을 클릭하면 `latency`, `packet loss`, `packet received`의 기본 어설션과 사용 가능한 레코드가 추가됩니다. 테스트에서 모니터링을 시작하려면 어설션을 최소 한 개 정의해야 합니다.

| 유형          | 집계    |연산자                                                                               | 값 유형       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| 대기 시간         | `avg`, `max`, `min`, 또는 `stddev` (`jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | _정수(ms)_    |
| 패킷 손실     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _비율(%)_ |
| 수신한 패킷 | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _정수_        |
| 네트워크 홉    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _정수_        |

**New Assertion**을 선택하거나 응답 미리 보기를 바로 선택해 API 테스트별로 어설션을 최대 20개까지 만들 수 있습니다.

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="ICMP 테스트가 성공 또는 실패하는 어설션 정의" style="width:90%;" >}}

테스트에 응답 본문 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있고 제한 시간에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

ICMP 테스트를 실행할 **Locations**를 선택합니다. ICMP 테스트는 사용자가 트리거를 네트워크 외부 또는 내부에서 일으키고자 하느냐에 관리형 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다.

{{% managed-locations %}} 

### 테스트 빈도 지정

ICMP 테스트를 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 실행하면 사용자가 가장 중요한 서비스에 항상 액세스할 수 있도록 보장합니다. Datadog에서 ICMP 테스트를 실행할 빈도를 선택하세요.
* [**CI/CD 파이프라인 내에서 실행할 수 있습니다**][2].
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 변수 사용

내 ICMP 테스트의 URL과 어설션에 [**Settings** 페이지에서 정의한 전역 변수][8]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

## 테스트 실패

하나 이상의 어설션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트 결과가 `FAILED`가 됩니다. 경우에 따라서는 엔드포인트 어설션 테스트 없이 해당 테스트가 실패할 수 있습니다.

다음과 같은 이유로 실패할 수 있습니다.

`DNS`
: 테스트 URL의 DNS 항목을 찾을 수 없는 경우입니다. 가능한 원인으로는 테스트 URL이 잘못 설정되었거나 DNS 엔티티 설정이 잘못되었기 때문일 수 있습니다.

## 권한 허용

기본적으로 [Datadog Admin 및 Datadog Standard 역할][13]이 있는 사용자만 Synthetic ICMP 테스트를 생성, 편집, 삭제할 수 있습니다. Synthetic ICMP 테스트의 생성, 편집, 삭제 액세스 권한을 얻으려면 사용자를 두 가지 [기본 역할][13] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][10]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 

계정에서 [사용자 정의 역할][11]을 사용하는 고객에게는 액세스 제한이 제공됩니다.

조직 역할에 따라 ICMP 테스트의 액세스를 제한할 수 있습니다. ICMP 테스트를 생성할 때 사용자 외에 테스트를 읽고 쓸 수 있는 역할을 선택합니다.

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