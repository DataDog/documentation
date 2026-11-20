---
aliases:
- /ko/synthetics/settings
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: 외부 사이트
  text: Terraform으로 Synthetic 전역 변수 생성 및 관리하기
- link: /synthetics/api_tests/
  tag: 문서
  text: API 테스트 설정하기
- link: /synthetics/multistep/
  tag: 문서
  text: 다단계 API 테스트 설정하기
- link: /synthetics/browser_tests/
  tag: 문서
  text: 브라우저 테스트 설정하기
- link: /mobile_app_testing/
  tag: 문서
  text: 모바일 테스트 설정하기
- link: /synthetics/private_locations/
  tag: 문서
  text: 프라이빗 위치 생성하기
- link: /synthetics/platform/rum/
  tag: 문서
  text: RUM을 Synthetic Monitoring에 연결하기
title: Synthetic Testing 및 Monitoring 설정
---
## 개요 {#overview}

[Synthetic Monitoring & Continuous Testing Settings 페이지][1]에서 다음 항목에 접근 및 제어할 수 있습니다:

* [기본 설정](#default-settings)
* [가동 중지][25]
* [프라이빗 위치](#private-locations)
* [전역 변수](#global-variables)
* [통합 설정](#integration-settings)
* [Continuous Testing 설정][2]
* [모바일 애플리케이션 설정][18]

## 기본 설정 {#default-settings}

### 실행된 태그 설정 {#enforced-tags-settings}

#### 모든 테스트에 **사용량 속성**을 위한 태그 강제 적용 {#enforce-tags-for-usage-attribution-on-all-tests}

Usage Attribution 페이지에서 비용 및 사용량 속성을 분류할 최대 3개의 태그를 구성할 수 있습니다. {{< ui >}}Enforce tags for usage attribution on all tests{{< /ui >}}를 선택하여 사용자가 Synthetic 테스트를 생성하거나 편집할 때 구성된 모든 Usage Attribution 태그를 입력하도록 요구합니다. 이 설정이 활성화되면 사용자는 모든 필수 태그를 입력하지 않고는 테스트를 저장할 수 없습니다.

#### 모든 테스트에 필수 **모니터 태그 정책** 강제 적용 {#enforce-required-monitor-tag-policies-on-all-tests}

[Synthetic Monitoring and Testing settings][20] 페이지에서 {{< ui >}}Enforce required monitor tag policies on all tests{{< /ui >}}를 선택하여 사용자 지정 모니터 태그 정책이 Synthetic 테스트에 강제 적용되도록 요구합니다. 이 설정이 활성화되면 사용자는 모든 필수 태그를 입력하지 않고는 테스트를 저장할 수 없습니다.

  <br>

  1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} 페이지][21]에서 모니터 태그를 구성하려면 다음 단계를 따르세요.

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="구성된 모니터 정책 태그를 보여주는 모니터 설정 페이지" style="width:80%;">}}

  2. Synthetic 브라우저 테스트를 생성하고 필수 정책 태그를 추가합니다.

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="정책 태그 기능을 강조하는 새로운 Synthetic 테스트 페이지" style="width:80%;">}}

### 기본 위치{#default-locations}

[API 테스트][4], [다단계 API 테스트][5] 또는 [브라우저 테스트][6] 세부 정보에 관한 기본 위치를 선택합니다.

Datadog이 제공하는 사용 가능한 모든 관리 위치와 계정에서 설정한 프라이빗 위치를 선택할 수 있습니다.

위치 선택을 마치면 {{< ui >}}Save Default Locations{{< /ui >}}를 클릭합니다.

### 기본 브라우저 및 장치{#default-browsers-and-devices}

[브라우저 테스트][6] 세부 정보에 대한 기본 브라우저 및 장치 유형을 선택합니다.

브라우저 옵션에는 Google Chrome, Mozilla Firefox 및 Microsoft Edge가 포함됩니다. 장치 옵션에는 대형 노트북, 태블릿 및 소형 모바일 장치가 포함됩니다.

브라우저 및 장치 선택을 마치면 {{< ui >}}Save Default Browsers & Devices{{< /ui >}}를 클릭합니다.

### 기본 태그 {#default-tags}

[API 테스트][4], [다단계 API 테스트][5] 또는 [브라우저 테스트][6] 세부 정보에 관한 기본 태그를 선택 또는 추가합니다.

관련 태그를 선택한 다음, {{< ui >}}Save Default Tags{{< /ui >}}를 클릭합니다.

### 기본 시간 제한{#default-timeout}

[API 테스트][4] 세부 정보에 대한 기본 시간 제한을 추가합니다.

새 시간 제한 입력을 마치면 {{< ui >}}Save Default Timeouts{{< /ui >}}를 클릭합니다.

### 기본 주기{#default-frequency}

[API 테스트][4], [브라우저 테스트][6] 또는 [모바일 테스트][17] 세부 정보에 대한 기본 빈도를 선택하거나 추가합니다.

관련 태그를 선택한 다음, {{< ui >}}Save Default Frequencies{{< /ui >}}를 클릭합니다.

### 기본 재시도{#default-retries}

[API 테스트][4], [브라우저 테스트][6] 또는 [모바일 테스트][17] 세부 정보에서 실패 시 테스트를 재시도할 기본 횟수를 선택하거나 추가합니다.

기본 재시도 값 입력을 마치면 {{< ui >}}Save Default Retries{{< /ui >}}를 클릭합니다.

### 기본 모바일 장치{#default-mobile-devices}

[모바일 테스트][17] 세부 정보에서 사용할 기본 모바일 장치를 선택하거나 추가합니다.

기본 모바일 장치 입력을 마치면 {{< ui >}}Save Default Devices{{< /ui >}}를 클릭합니다.

### 권한 {#permissions}

기본적으로 [Datadog Admin 및 Datadog Standard 역할][11]을 가진 사용자만 Synthetic Monitoring {{< ui >}}Default Settings{{< /ui >}} 페이지에 액세스할 수 있습니다. {{< ui >}}Default Settings{{< /ui >}} 페이지에 액세스하려면 사용자를 해당 두 [기본 역할][11] 중 하나로 업그레이드하세요.

[사용자 지정 역할 기능][12]을 사용하는 경우, `synthetics_default_settings_read` 및 `synthetics_default_settings_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

## 가동 중지 {#downtimes}

자세한 내용은 [예약된 가동 중지][25]을 참조하세요.

## 프라이빗 위치 {#private-locations}

자세한 내용을 확인하려면 [프라이빗 위치에서 Synthetic 테스트 실행][3]을 참조하세요.

## 글로벌 변수 {#global-variables}

글로벌 변수는 모든 Synthetic 테스트에서 액세스할 수 있는 변수입니다. 이 변수는 테스트 모음의 모든 [단일][4], [다단계 API 테스트][5], [브라우저 테스트][6] 및 [모바일 앱 테스트][17]에서 사용할 수 있습니다.

글로벌 변수를 생성하려면 [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} 페이지][7]의 {{< ui >}}Global Variables{{< /ui >}} 탭으로 이동하여 {{< ui >}}\+ New Global Variable{{< /ui >}}을 클릭합니다.

생성할 변수 유형을 선택합니다:

{{< tabs >}}
{{% tab "값 지정" %}}

1. {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다. 이 이름은 글로벌 변수 전체에서 고유해야 합니다.
2. 필요시 {{< ui >}}Description{{< /ui >}}을 입력하고 변수와 연결할 {{< ui >}}Tags{{< /ui >}}를 선택합니다.
3. 변수에 할당할 {{< ui >}}Value{{< /ui >}}를 입력합니다.
4. 필요시 내장 기능을 사용하여 변수에 값을 할당합니다. 예를 들어, `{{ alphabetic(n) }}` 내장 기능을 클릭하여 {{< ui >}}Value{{< /ui >}} 필드에 알파벳 값의 예시를 입력합니다.
5. 필요시 변수 난독화를 활성화하여 테스트 결과에서 해당 값을 숨깁니다.

{{< img src="synthetics/settings/variable_value_3.png" alt="Global Variable Specify Value" style="width:100%;">}}

다음 내장 기능을 사용할 수 있습니다.

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: `n`자리 숫자로 된 문자열을 생성합니다.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: `n`개의 문자로 구성된 알파벳 문자열을 생성합니다.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: `n`개의 문자로 구성된 영숫자 문자열을 생성합니다.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: 테스트가 시작된 UTC 날짜에 `n` 단위를 더하거나 뺀 값으로 Datadog에서 허용되는 형식 중 하나로 날짜를 생성합니다.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: 테스트가 시작된 UTC 타임스탬프에 `n` 단위를 더하거나 뺀 값으로 Datadog에서 허용되는 단위 중 하나로 타임스탬프를 생성합니다.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: 버전 4 범용 고유 식별자(UUID)를 생성합니다.

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: 테스트의 공개 ID를 삽입합니다.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: 테스트 실행의 결과 ID를 삽입합니다.

{{% /tab %}}

{{% tab "테스트에서 생성" %}}

기존 [HTTP 테스트][1]에서 응답 헤더와 바디를 구문 분석하여 변수를 생성하거나, 추출한 변수를 사용하여 기존 [다단계 API 테스트][2]에서 변수를 생성할 수 있습니다.

{{< img src="synthetics/settings/global_variable.png" alt="다단계 API 테스트에서 추출할 수 있는 변수" style="width:100%;" >}}

1. {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
2. 필요시 {{< ui >}}Description{{< /ui >}}을 입력하고 변수와 연결할 {{< ui >}}Tags{{< /ui >}}를 선택합니다.
3. 변수 난독화를 활성화하여 테스트 결과에서 해당 값을 숨깁니다(필요시).
4. 변수를 추출할 **테스트**를 선택합니다.
5. 다단계 API 테스트를 사용하는 경우 테스트에서 로컬 변수를 추출합니다. HTTP 테스트를 사용하는 경우 응답 헤더 또는 응답 본문에서 변수를 추출하도록 선택합니다.

    * {{< ui >}}Response Header{{< /ui >}}에서 값 추출: 전체 응답 헤더를 변수로 사용하거나 [`regex`][3]로 파싱합니다.
    * {{< ui >}}Response Body{{< /ui >}}에서 값 추출: 요청의 응답 본문을 [`regex`][3], [`jsonpath`][4] 또는 [`xpath`][5]로 파싱하거나 전체 응답 본문을 사용합니다.
    * {{< ui >}}Response Status Code{{< /ui >}}에서 값을 추출합니다.

정규식으로 값을 추출하는 것 외에도 [정규식][3]을 사용하여 다음을 파싱할 수도 있습니다.

  - 패턴의 첫 번째 인스턴스뿐 아니라 제공된 패턴의 모든 인스턴스를 매칭합니다.
  - 일치하는 패턴의 대소문자를 무시합니다.
  - 여러 줄의 문자열을 매칭합니다.
  - 전달한 정규식 패턴을 유니코드로 처리합니다.
  - 마침표로 새 줄을 식별할 수 있게 허용합니다.
  - 정규식 패턴 내의 특정 인덱스에서 매칭합니다.
  - 일치하는 패턴을 제공한 값으로 대체합니다.

{{< img src="synthetics/settings/parsing_regex_field.png" alt="정규식을 사용하여 HTTP 테스트에서 응답 본문을 파싱하세요." style="width:80%;">}}

변수 값은 변수를 추출한 테스트가 실행될 때마다 업데이트됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA 토큰" %}}

테스트에서 TOTP를 생성하고 이를 사용하려면, 전역 변수를 생성해 보안 키를 입력하거나 인증 제공자로 QR 코드를 업로드합니다. **참고:** 현재 TOTP에는 SHA1 해싱 알고리즘만 지원됩니다.

1. {{< ui >}}Choose variable type{{< /ui >}}에서 {{< ui >}}MFA Token{{< /ui >}}을 선택합니다.
2. {{< ui >}}Define Variable{{< /ui >}}에서 {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 필요시 {{< ui >}}Description{{< /ui >}}을 입력하고 변수와 연결할 {{< ui >}}Tags{{< /ui >}}를 선택합니다.
4. 변수에 {{< ui >}}Secret Key{{< /ui >}}를 입력하거나 QR 코드 이미지를 업로드합니다.
5. {{< ui >}}\+ Generate{{< /ui >}}를 클릭하여 OTP를 생성합니다. {{< ui >}}Copy{{< /ui >}} 아이콘을 사용하여 생성된 OTP를 복사할 수 있습니다.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA 토큰 생성" style="width:100%;" >}}

**참고**: TOTP 토큰이 Google Authenticator에서 작동한다면 Datadog과 호환될 가능성이 높습니다.
일부 QR 코드는 특정 인증 방법으로 제한되어 있어 플랫폼 간에 작동하지 않을 수 있습니다. 호환성을 보장하려면 표준 TOTP 프로토콜을 따르는 QR 코드나 보안 키를 사용하세요.

브라우저 테스트의 TOTP 기반 MFA에 대한 자세한 내용을 확인하려면 [브라우저 테스트의 멀티 팩터 인증(MFA)용 TOTP][1]를 참조하세요.

[1]: /ko/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "가상 인증자" %}}

Synthetic 테스트에서 패스키를 사용하여 사용자 여정을 완료하려면 Virtual Authenticator 전역 변수를 생성하세요. 이 전역 변수는 모든 Synthetics 브라우저 테스트에 대한 패스키를 생성하고 저장하는 데 사용됩니다. 자세한 내용은 [브라우저 테스트에서 패스키 사용][1]을 참조하세요.

1. [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1]의 {{< ui >}}Global Variables{{< /ui >}} 탭으로 이동하여 {{< ui >}}\+ New Global Variable{{< /ui >}}을 클릭합니다.

1. {{< ui >}}Choose variable type{{< /ui >}} 섹션에서 {{< ui >}}Virtual Authenticator{{< /ui >}}를 선택합니다.
2. {{< ui >}}Specify variable details{{< /ui >}} 섹션에 {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 필요시 {{< ui >}}Description{{< /ui >}}을 입력하고 변수와 연결할 {{< ui >}}Tags{{< /ui >}}를 선택합니다. 그러면 Datadog이 패스키를 생성하고 저장하는 데 사용되는 Virtual Authenticator를 생성합니다.
4. {{< ui >}}Permissions settings{{< /ui >}} 섹션에서 조직의 역할에 따라 변수에 대한 액세스를 제한합니다. 역할에 대한 자세한 정보는 [RBAC 문서][2]를 참조하세요.

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Virtual Authenticator 생성" style="width:80%;" >}}

[1]: /ko/synthetics/guide/browser-tests-passkeys
[2]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

생성된 전역 변수는 모든 Synthetic 테스트에서 사용할 수 있습니다. 테스트로 전역 변수를 가져오려면 {{< ui >}}\+ Variables{{< /ui >}}를 클릭하고,변수를 추가하려는 필드에 `{{`를 입력한 다음 전역 변수를 선택하세요.


변수에 대한 자세한 내용을 확인하려면 [HTTP 테스트][8], [다단계 API 테스트][9], [브라우저 테스트][10], [모바일 앱 테스트][19], [브라우저 테스트 단계 문서][16]를 참조하세요.

### 권한 {#permissions-1}

기본적으로 [Datadog Admin 및 Datadog Standard 역할][11]을 가진 사용자만 Synthetic Monitoring {{< ui >}}Global Variables{{< /ui >}} 페이지에 액세스할 수 있습니다. 해당 두 [기본 역할][11] 중 하나로 사용자를 업그레이드하여 {{< ui >}}Global Variables{{< /ui >}} 페이지에 대한 액세스 권한을 얻을 수 있습니다.

[사용자 지정 역할 기능][12]을 사용하는 경우, `synthetics_default_settings_read` 및 `synthetics_default_settings_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

[세분화된 액세스 제어][22]를 사용하여 역할, 팀 또는 개별 사용자를 기반으로 테스트에 액세스할 수 있는 사용자를 제한하려면 다음 단계를 따르세요.

1. 양식의 권한 섹션을 엽니다.
2. {{< ui >}}Edit Access{{< /ui >}}를 클릭합니다.
  {{< img src="synthetics/settings/grace_2.png" alt="프라이빗 위치 구성 양식에서 테스트에 대한 권한 설정" style="width:100%;" >}}
3. {{< ui >}}Restrict Access{{< /ui >}}를 클릭합니다.
4. 팀, 역할 또는 사용자를 선택합니다.
5. {{< ui >}}Add{{< /ui >}}를 클릭합니다.
6. 각 항목에 연결하려는 액세스 수준을 선택합니다.
7. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

<div class="alert alert-info">Viewer 액세스 권한이 없어도 해당하는 프라이빗 위치의 결과를 조회할 수 있습니다.</div>

| 액세스 수준 | GV 값 보기 | GV 메타데이터 보기 | 테스트에서 GV 사용 | GV 값/메타데이터 편집  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| 액세스 권한 없음    |               |                  |                |                         |
| Viewer       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

**참고**: 변수를 제한하면 다른 사용자가 이를 테스트에 추가하거나 사용할 수 없게 되지만, 이미 기존 테스트에서 사용 중인 경우 변수 이름이 숨겨지지 않습니다.

## 통합 설정 {#integration-settings}

{{< img src="synthetics/settings/integration_settings.png" alt="통합 설정 페이지" style="width:100%;">}}

### 브라우저 테스트용 APM 통합 {#apm-integration-for-browser-tests}

URL이 해당 URL에 APM 통합 헤더를 추가하도록 허용합니다. Datadog 애플리케이션 성능 모니터링(APM) 통합 헤더를 사용하면 Datadog 브라우저 테스트를 애플리케이션 성능 모니터링(APM) 와 연결할 수 있습니다.

{{< ui >}}Value{{< /ui >}} 필드에 URL을 입력하여 APM 헤더를 보낼 엔드포인트를 정의하세요. 엔드포인트가 추적 중이고 허용된 경우, 브라우저 테스트 결과가 해당 트레이스에 자동으로 연결됩니다.

`*`를 사용하여 더 넓은 도메인 이름을 허용하세요. 예를 들어, `https://*.datadoghq.com/*`를 추가하면 `https://datadoghq.com/`의 모든 항목이 허용됩니다. URL 추가를 완료했으면 {{< ui >}}Save APM Integration Settings{{< /ui >}}를 클릭하세요.

자세한 내용을 확인하려면 [Synthetic 및 애플리케이션 성능 모니터링(APM) 트레이스 연결][15]을 참고하세요.

### Synthetic 브라우저 테스트 데이터 수집 및 RUM 애플리케이션 {#synthetic-browser-test-data-collection-and-rum-applications}

Datadog이 브라우저 테스트 실행에서 RUM 데이터를 수집하도록 허용하려면 {{< ui >}}Enable Synthetic RUM data collection{{< /ui >}}을 클릭하세요. 비활성화된 경우 브라우저 테스트 레코더에서 RUM 설정을 편집할 수 없습니다. 데이터 수집 활성화를 완료하면 {{< ui >}}Save RUM Data Collection{{< /ui >}}을 클릭하세요.

브라우저 테스트 데이터를 수집하는 {{< ui >}}Default Application{{< /ui >}} 드롭다운 메뉴에서 RUM 애플리케이션을 선택하세요. 기본 애플리케이션 지정을 완료하면 {{< ui >}}Save RUM Data Applications{{< /ui >}}를 클릭하세요.

자세한 내용은 [RUM을 Synthetic Monitoring에 연결][14]을 참조하세요.

### Synthetic 모바일 애플리케이션 테스트 데이터 수집 {#synthetic-mobile-application-test-data-collection}

Datadog이 모바일 애플리케이션 테스트 실행에서 RUM 데이터를 수집하도록 허용하려면 `.ipa` 또는 `.apk` 파일과 함께 RUM [iOS SDK][23] 또는 [Android SDK][24]를 구성하고 패키징하세요. 이렇게 하면 RUM 데이터가 자동으로 연결되어 테스트 실행에 대한 엔드투엔드 관측 가능성을 확보할 수 있습니다.

## 추가 자료 {#further-reading}

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
[14]: /ko/synthetics/platform/rum/
[15]: /ko/synthetics/apm/#prerequisites
[16]: /ko/synthetics/browser_tests/test_steps/#use-variables
[17]: /ko/synthetics/mobile_app_testing/
[18]: /ko/synthetics/mobile_app_testing/settings/
[19]: /ko/synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /ko/account_management/rbac/granular_access
[23]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/ios/setup?tab=swiftpackagemanagerspm
[24]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/android/setup?tab=rum
[25]: /ko/synthetics/platform/downtime/