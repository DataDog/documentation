---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱(Synthetic) API 테스트
  tags:
  - dns
  - DNS 테스트
  - DNS 테스트
aliases:
- /ko/synthetics/dns_test
- /ko/synthetics/dns_check
description: DNS 레코드의 조회 확인 및 조회 시간 모니터링하기
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: 블로그
  text: Datadog으로 DNS 모니터링
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트의 DNS 확인 테스트
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: 신서틱(Synthetic) 테스트 모니터링에 대해 알아보기
title: DNS 테스트
---

## 개요

DNS 테스트로 어떤 네임서버를 사용하든 DNS 레코드의 조회와 조회 시간을 사전에 모니터링할 수 있습니다. 조회 확인이 예상보다 느리거나 DNS 서버가 A, AAAA, CNAME, TXT 또는 MX 형식으로 응답하는 경우, Datadog이 해당 오류에 관한 세부 정보가 포함된 알림을 전송하여 오류의 근본 원인을 신속하게 파악하고 해결할 수 있도록 도와드립니다.

DNS 테스트는 네트워크 외부에서 또는 내부에서 실행할지 선호도에 따라 [관리 위치](#select-locations)와 [비공개 위치][1]에서 모두 실행할 수 있습니다. DNS 테스트는 일정에 맞추어서, 온디맨드 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 설정

`DNS` 테스트 생성을 선택한 다음 테스트 요청을 정의합니다.

### 요청 정의하기

1. 테스트할 **도메인**을 쿼리로 지정합니다. 예: `www.example.com`.
2. 사용할 **DNS 서버**를 지정합니다(옵션). 이는 도메인 이름이나 IP 주소일 수 있습니다. 지정하지 않으면 DNS 테스트는 `1.1.1.1` 및 내부 AWS DNS 서버의 대체 패턴(폴백)으로 `8.8.8.8`를 통해 사용하여 조회 작업을 수행합니다.
3. DNS 서버 **포트**를 지정합니다(옵션). 지정하지 않으면 DNS 서버 포트는 기본값으로 53으로 설정됩니다.
4. 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다(옵션).
5. DNS 테스트의 **이름**을 지정합니다.
6. DNS 테스트에 `env` **태그** 및 기타 태그를 추가합니다. 이러한 태그를 사용하여 [신서틱 모니터링 & 지속적인 테스트 페이지][3]에서 신서틱 테스트를 필터링할 수 있습니다.

{{< img src="synthetics/api_tests/dns_test_config_new.png" alt="DNS 쿼리 정의" style="width:90%;" >}}

**URL 테스트**를 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.

### 어서션(표명) 정의하기

어서션은 예상되는 테스트 결과를 정의합니다. ** URL 테스트**를 클릭하면 `response time`의 기본 어서션과 사용 가능한 레코드가 추가됩니다. 테스트를 모니터링하려면 최소 한 개 이상의 어서션을 정의해야합니다.

| 유형                | 레코드 유형                                                     | 연산자                                           | 가치 유형                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| 응답 시간       |                                                                 | `is less than`                                     | _Integer (ms)_             |
| 사용 가능한 레코드        | A, AAAA, CNAME, MX, NS 및 TXT 형식 | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_ |
| 레코드 최소 하나 이상 | A, AAAA, CNAME, MX, NS 및 TXT 형식 | `is`, `contains`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_ |

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_dns.png" alt="성공 또는 실패로 DNS 테스트 어서션 정의" style="width:90%;" >}}

어서션에서 `OR` 로직을 수행하려면 `matches regex` 비교기(comparator)를 사용하여 `(0|100)`과 같은 동일한 어서션 유형에 대해 다중 예상치가 존재하는 정규식을 정의합니다. 사용 가능한 모든 레코드나 최소 하나 이상의 레코드 어서션 값이 0 또는 100이면 테스트가 성공한 것입니다.

테스트에 응답 본문에 대한 어션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어서션이 포함되어 있고 제한 시간 제한에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

DNS API 테스트의 **위치**를 선택합니다. DNS 테스트는 공개 또는 비공개 도메인 모니터링 선호도에 따라 관리되는 위치 및 [프라이빗 위치][1]에서 모두 실행할 수 있습니다.

{{% managed-locations %}} 

### 테스트 빈도 지정

다음과 같이 DNS 테스트를 수행합니다.

* **일정에 따라** 사용자가 가장 중요한 서비스에 항상 액세스할 수 있도록 보장합니다. Datadog이 DNS 테스트를 실행할 빈도를 선택하세요.
* [** CI/CD 파이프라인 내**][2].
* **온디맨드**로 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}} 

### 변수 사용

[**설정** 페이지에 정의된 전역 변수][9]를 DNS 테스트의 URL, 고급 옵션 및 어서션에 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

## 테스트 실패

하나 이상의 어서션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라서는 엔드포인트 어서션 테스트 없이 해당 테스트가 실패할 수 있습니다.

이러한 이유는 다음과 같습니다.

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

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][10]로 설정된 사용자만 신서틱(Synthetic) DNS 테스트를 생성, 편집, 삭제할 수 있습니다. 신서틱(Synthetic) DNS 테스트 생성, 편집, 삭제, 접근 권한을 얻으려면 사용자를 이 두 가지 [기본 역할][13] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][11]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한을 포함하는 모든 커스텀 역할에 사용자를 추가합니다.

### 액세스 제한 

[커스텀 역할][12]로 설정된 계정 고객의 경우 액세스 제한이 가능합니다.

조직 내 역할에 따라 DNS 테스트 액세스를 제한할 수 있습니다. DNS 테스트 생성 시 사용자 외에도 어떤 역할이 해당 테스트를 읽고 쓸 수 있는지 선택하세요.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ko/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ko/synthetics/guide/synthetic-test-monitors
[9]: /ko/synthetics/settings/#global-variables
[10]: /ko/account_management/rbac/
[11]: /ko/account_management/rbac#custom-roles
[12]: /ko/account_management/rbac/#create-a-custom-role