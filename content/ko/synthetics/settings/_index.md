---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: 테라폼
  text: 테라폼으로 신서틱(Synthetic)글로벌 변수 생성 및 관리
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
- link: /synthetics/multistep/
  tag: 설명서
  text: 다단계 API 테스트 설정
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /mobile_app_testing/mobile_app_tests
  tag: 설명서
  text: 모바일 테스트 설정
- link: /synthetics/private_locations/
  tag: 설명서
  text: 비공개 위치 생성
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: 설명서
  text: 신서틱에서 RUM & 세션 리플레이 살펴보기
- link: /synthetics/guide/browser-tests-totp
  tag: 설명서
  text: 브라우저 테스트 시 다단계 인증(MFA) TOTP 사용하기
kind: 설명서
title: 신서틱(Synthetic) 모니터링 설정
---

## 개요

[신서틱(Synthetic) 모니터링 및 연속적 테스트 설정 페이지][1]에서 다음 항목에 접근 및 제어할 수 있습니다:

* [비공개 위치](#private-locations)
* [전역 변수](#global-variables)
* [기본 설정](#default-settings)
* [통합 설정](#integration-settings)
* [지속적 테스트 설정][2]
* [모바일 애플리케이션 설정][18]

## 비공개 위치

자세한 내용을 확인하려면 [비공개 위치에서 신서틱(Synthetic) 테스트 실행][3]을 참조하세요.

## 전역 변수

전역 변수는 모든 신서틱(Synthetic) 테스트에서 접근 가능한 변수입니다. 테스트 스위트(suite)의 모든 [단일][4], [다단계 API 테스트][5], [브라우저 테스트][6], [모바일 앱 테스트][17]에서 사용할 수 있습니다.

전역 변수를 생성하려면 [**신서틱(Synthetic) 모니터링 및 지속적 테스트** > **설정** 페이지][7]의 **글로벌 변수** 탭에서 **+ 새 전역 변수**를 누릅니다.

생성할 변수 유형을 선택합니다:

{{< tabs >}}
{{% tab "값 지정" %}}

1. **변수 이름**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다. 이는 모든 전역 변수 중 해당 변수만의 고유한 값이어야 합니다.
2. 선택 사항으로 **설명**을 입력하고 **태그**를 선택하여 변수에 할당합니다.
3. 변수에 할당할 **값**을 입력하세요.
4. 변수 난독화를 활성화하여 테스트 결과에서 해당 값을 숨길 수 있습니다(선택 사항).

{{< img src="synthetics/settings/variable_value_2.png" alt="전역 변수 값 지정" style="width:100%;">}}

{{% /tab %}}

{{% tab "테스트에서 생성" %}}

기존 [HTTP 테스트][1]에서 응답 헤더와 바디를 파싱하여 변수를 생성하거나, 추출한 변수를 사용하여 기존 [다단계 API 테스트][2]에서 변수를 생성할 수 있습니다.

{{< img src="synthetics/settings/global_variable.png" alt="다단계 API 테스트에서 추출할 수 있는 사용 가능한 변수" style="width:100%;" >}}

1. **변수 이름**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
2. 선택 사항으로 **설명**을 입력하고 **태그**를 선택하여 변수에 할당합니다.
3. 변수 난독화를 활성화하여 테스트 결과에서 해당 값을 숨길 수 있습니다(선택 사항).
4. 변수를 추출할 **테스트**를 선택하세요.
5. 다단계 API 테스트를 사용한다면 테스트에서 로컬 변수를 추출합니다. HTTP 테스트를 사용하는 경우 응답 헤더 또는 응답 바디에서 변수 추출을 선택합니다.

    * **응답 헤더**에서 값 추출: 전체 응답 헤더를 변수로 사용하거나 [`regex`][3]로 파싱합니다.
    * **응답 바디**에서 값 추출: [`regex`][3], [`jsonpath`][4], [`xpath`][5] 또는 전체 응답 바디를 사용하여 요청의 응답 바디를 파싱합니다.
    * **응답 상태 코드**로부터 값을 추출합니다. 

정규식으로 값을 추출하는 것 외에도 [정규식][3]을 사용하여 다음을 파싱할 수도 있습니다:

  - 패턴의 첫 번째 인스턴스뿐 아니라 제공된 패턴의 모든 인스턴스를 매칭
  - 일치하는 패턴을 무시
  - 여러 줄의 문자열을 매칭
  - 전달한 정규식 패턴을 유니코드로 처리
  - 마침표로 새 줄을 식별할 수 있게 허용
  - 정규식 패턴 내의 특정 인덱스에서 매칭
  - 일치하는 패턴을 제공한 값으로 대체

{{< img src="synthetics/settings/parsing_regex_field.png" alt="정규식으로HTTP 테스트 응답의 바디 파싱" style="width:80%;">}}

변수 값은 동작 시 추출된 테스트가 실행될 때마다 업데이트됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA 토큰" %}}  

테스트에서 TOTP를 생성하고 이를 사용하려면, 전역 변수를 생성해 보안 키를 입력하거나 인증 제공자로 QR 코드를 업로드합니다.

1. **변수 유형 선택**에서 **MFA 토큰**을 선택합니다.
2. **변수 정의**에서 **변수 이름**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 선택 사항으로 **설명**을 입력하고 **태그**를 선택하여 변수에 할당합니다.
4. 변수에 **보안 키**를 입력하거나 QR코드 이미지를 업로드합니다.
5. **+생성**을 눌러 OTP를 생성합니다. **복사** 아이콘을 사용해 생성한 OTP를 복사할 수 있습니다.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA 토큰 생성" style="width:100%;" >}}

브라우저 테스트의 TOTP 기반 MFA에 대한 자세한 내용을 확인하려면 [브라우저 테스트의 멀티 팩터 인증(MFA)용 TOTP][1]를 참조하세요.

[1]: /ko/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "가상 인증자" %}}

신서틱 테스트에서 패스키로 사용자 경로를 완료하려면 가상 인증자 전역 변수를 생성합니다. 해당 전역 변수는 모든 신서틱 브라우저 테스트용 패스키를 생성 및 저장하는 데 사용합니다. 자세한 내용을 확인하려면 [브라우저 테스트에서 패스키 사용하기][1]를 참조하세요.

1. **전역 변수** 탭으로 가서 [**신서틱(Synthetic) 모니터링 및 지속적 테스트** > **설정** 페이지][1]의 **신규 글로벌 변수**를 누릅니다.

1. **변수 유형 선택** 섹션에서 **가상 인증자**를 선택합니다.
2. **변수 세부 사항 정의** 섹션에서 **변수 이름**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 선택 사항으로 **설명**을 입력하고 **태그**를 선택하여 변수에 할당합니다. 그러면 Datadog이 패스키를 생성 및 보관하는 가상 인증자를 생성합니다.
4. **권한 설정** 섹션에서 조직의 역할에 따라 변수 접근 권한을 제한합니다. 해당 역할에 대한 자세한 내용을 확인하려면 [RBAC 문서][2]를 참조하세요.

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="가상 인증자 생성" style="width:80%;" >}}

[1]: /ko/synthetics/guide/browser-tests-passkeys
[2]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

한 번 전역 변수를 생성하면 모든 신서틱(Synthetic) 테스트에서 사용 가능합니다. 전역 변수를 테스트로 가져오려면 **+ 변수**를 누르고 변수를 추가할 필드에 `{{`을 입력한 후 해당 전역 변수를 선택합니다.


변수에 대한 자세한 내용을 확인하려면 [HTTP 테스트][8], [다단계 API 테스트][9], [브라우저 테스트][10], [모바일 앱 테스트][19], [브라우저 테스트 단계 문서][16]를 참조하세요.

### 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][11] 권한을 보유한 사용자만 신서틱(Synthetic) 모니터링 **전역 변수** 페이지에 접근할 수 있습니다. 사용자 권한을 본 두 가지 [기본 역할][11] 중 하나로 업그레이드하면 **전역 변수** 페이지에 접근 가능합니다. 

### 액세스 제한 

계정에서 [커스텀 역할][11]을 사용하여 고객의 접근을 제한할 수 있습니다. [커스텀 역할 기능][12]을 사용하는 경우 `synthetics_global_variable_read` 및 `synthetics_global_variable_write` 권한이 포함된 커스텀 역할에 해당 사용자를 추가합니다.

조직 내 역할에 따라 전역 변수 접근을 제한할 수 있습니다. 전역 변수를 생성할 때 사용자 외에 어떤 역할이 전역 변수를 읽고 쓸 수 있는지 **권한 설정**에서 선택하세요.

{{< img src="synthetics/settings/restrict_access_1.png" alt="전역 변수 접근 제한" style="width:100%;" >}}

## 기본 설정

### 기본 위치

[API 테스트][4], [다단계 API 테스트][5] 또는 [브라우저 테스트][6] 세부 정보에 관한 기본 위치를 선택합니다. 

Datadog이 제공하는 사용 가능한 모든 관리 위치와 계정에서 설정한 비공개 위치를 선택할 수 있습니다.

위치를 선택한 다음, **기본 위치 저장**을 누릅니다.

### 기본 브라우저 및 장치

[브라우저 테스트][6] 세부 정보에 대한 기본 브라우저 및 장치 유형을 선택합니다.

브라우저 옵션에는 Google Chrome, Firefox, Microsoft Edge가 있습니다. 기기 옵션에는 대형 노트북, 태블릿, 소형 모바일 장치 등이 있습니다.

브라우저 및 장치를 선택한 다음, **브라우저 및 장치 저장**을 누릅니다.

### 기본 태그

[API 테스트][4], [다단계 API 테스트][5] 또는 [브라우저 테스트][6] 세부 정보에 관한 기본 태그를 선택 또는 추가합니다. 

관련 태그를 선택한 다음, **기본 태그 저장**을 누릅니다.

### 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][11] 권한을 보유한 사용자만 신서틱(Synthetic) 모니터링 **기본 설정** 페이지에 접근할 수 있습니다. **기본 설정** 페이지에 접근하려면 사용자 권한을 본 두 가지 [기본 역할][11] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][12]을 사용하는 경우 `synthetics_default_settings_read` 및 `synthetics_default_settings_write` 권한을 포함하는 커스텀 역할에 사용자를 추가합니다.

## 통합 설정

{{< img src="synthetics/settings/integration_settings.png" alt="통합 설정 페이지" style="width:100%;">}}

### 브라우저 테스트용 애플리케이션 성능 모니터링(APM) 통합

URL이 애플리케이션 성능 모니터링(APM) 통합 헤더를 해당 URL에 추가하도록 허용합니다. Datadog의 애플리케이션 성능 모니터링(APM) 통합 헤더를 사용해 브라우저 테스트를 애플리케이션 성능 모니터링(APM)과 연결합니다.

**값** 필드에 URL을 입력하여 애플리케이션 성능 모니터링(APM) 헤더를 전송하려는 엔드포인트를 정의합니다. 엔드포인트 트레이싱 중이고 권한이 있는 경우, 브라우저 테스트 결과는 해당 트레이스에 자동 연결됩니다.

`*`로 더 다양한 도메인 이름을 사용할 수 있습니다. 예를 들어 `https://*.datadoghq.com/*`을 추가하면 `https://datadoghq.com/`에서의 모든 작업을 허용합니다. URL 추가한 다음 **애플리케이션 성능 모니터링(APM) 통합 설정 저장**을 누릅니다.

자세한 내용을 확인하려면 [신서틱 및 애플리케이션 성능 모니터링(APM) 트레이스 연결][15]을 참고하세요.

### 신서틱(Synthetic) 데이터 수집 및 RUM 애플리케이션

테스트 실행 시 Datadog이 RUM 데이터를 수집하도록 허용하려면 **신서틱(Synthetic) RUM 데이터 수집 활성화**를 클릭합니다. 해당 기능을 비활성화하면 브라우저 테스트 레코더에서 RUM 설정을 편집할 수 없습니다. 데이터 수집을 활성화한 후 **RUM 데이터 수집 저장**을 누릅니다.

브라우저 테스트 데이터를 수집하는 **기본 애플리케이션** 드롭다운 메뉴에서 RUM 애플리케이션을 선택합니다. 기본 애플리케이션을 지정한 다음 **RUM 데이터 애플리케이션 저장**을 누릅니다.

자세한 내용을 확인하려면 [RUM 및 세션 리플레이 살펴보기][14]를 참조하세요.

### 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][11] 권한을 보유한 사용자만 신서틱(Synthetic) 모니터링 **통합 설정** 페이지에 접근할 수 있습니다. **통합 설정** 페이지에 접근하려면 사용자 권한을 본 두 가지 [기본 역할][11] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][21]을 사용하는 경우 `synthetics_default_settings_read` 및 `synthetics_default_settings_write` 권한을 포함하는 커스텀 역할에 사용자를 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /ko/continuous_testing/settings/
[3]: /ko/synthetics/private_locations/
[4]: /ko/synthetics/api_tests/
[5]: /ko/synthetics/multistep/
[6]: /ko/synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /ko/synthetics/multistep?tab=requestoptions#use-variables
[10]: /ko/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /ko/account_management/billing/usage_attribution
[14]: /ko/synthetics/guide/explore-rum-through-synthetics/
[15]: /ko/synthetics/apm/#prerequisites
[16]: /ko/synthetics/browser_tests/actions/#use-variables
[17]: /ko/mobile_app_testing/mobile_app_tests/
[18]: /ko/mobile_app_testing/settings/
[19]: /ko/mobile_app_testing/mobile_app_tests/#use-global-variables