---
aliases:
- /ko/mobile_testing
- /ko/mobile_app_testing
- /ko/mobile_app_testing/mobile_app_tests/
cascade:
  algolia:
    tags:
    - mobile_testing
description: 지능형 자동 유지 관리 모바일 테스트를 생성하여 모바일 애플리케이션의 가장 중요한 부분이 실제 장치에서 정상적으로 실행되는지
  확인하세요.
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: 설명서
  text: Synthetic 모바일 앱 테스트 생성 방법 알아보기
- link: /synthetics/mobile_app_testing/settings
  tag: 설명서
  text: iOS 또는 Android 모바일 애플리케이션 업로드 방법 알아보기
- link: /continuous_testing/
  tag: 설명서
  text: Continuous Testing & CI/CD에 대해 알아보기
- link: /synthetics/guide/version_history/
  tag: 가이드
  text: Synthetic Monitoring 버전 기록
- link: /synthetics/guide/mobile-test-auth-tokens/
  tag: 가이드
  text: 모바일 애플리케이션 테스트에서 인증 토큰 주입 및 자동 갱신
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: 블로그
  text: Datadog Synthetic Monitoring을 통한 사용자 여정 전반의 문제 해결 간소화하기
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드투엔드 테스트 생성 모범 사례
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: 블로그
  text: 모바일 앱을 위한 신뢰할 수 있고 정확한 Synthetic 테스트 구축하기
- link: /api/latest/synthetics/#create-or-clone-a-test
  tag: API
  text: Synthetics API
title: 모바일 애플리케이션 테스트 및 모니터링
---
## 개요 {#overview}

모바일 애플리케이션 테스트를 사용하면 실제 장치를 통해 Android 및 iOS 애플리케이션의 주요 비즈니스 흐름을 테스트하고 모니터링할 수 있습니다.
Datadog은 실제 장치에서 이러한 테스트를 실행하여 주요 애플리케이션 워크플로의 실제와 유사한 단계별 표현, 각 단계의 스크린샷, 상세한 성공 또는 실패 결과를 제공하므로 팀에서 무엇이 잘못되었는지 빠르게 시각화할 수 있습니다.
모바일 앱 테스트는 일정에 따라, 요청 시 또는 [CI/CD 파이프라인][1] 내에서 직접 실행할 수 있습니다.

테스트 중인 애플리케이션에서 [RUM SDK][15]를 사용하는 경우, 필요시 Synthetic 모바일 테스트 데이터를 RUM 모바일 데이터와 연결할 수 있습니다. 

Datadog에서 모바일 앱 테스트를 생성하려면 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}New Test{{< /ui >}}][12]로 이동한 후 {{< ui >}}Mobile Application Test{{< /ui >}}를 선택하세요.

{{< img src="mobile_app_testing/new_test_2.png" alt="Synthetic 모바일 테스트 생성" style="width:50%;">}}

## 구성 {#configuration}

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다

### 템플릿으로 테스트 생성 {#create-a-test-from-a-template}

  1. 미리 입력된 템플릿 중 하나 위로 마우스를 가져가고 {{< ui >}}View Template{{< /ui >}}를 클릭합니다. 그러면 Test Details, Request Details, Alert Conditions, Steps 등 미리 입력된 구성 정보가 표시되는 사이드 패널이 열립니다.
  2. {{< ui >}}\+ Create Test{{< /ui >}}를 클릭하여 구성 페이지를 엽니다. 이 페이지에서 미리 입력된 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
  3. 오른쪽 상단의 {{< ui >}}Save & Quit{{< /ui >}}을 클릭하여 모바일 애플리케이션 테스트를 제출합니다.<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="템플릿이 포함된 모바일 애플리케이션 테스트 랜딩 페이지 동영상" video="true" >}}

### 처음부터 테스트 생성 {#build-a-test-from-scratch}

  1. {{< ui >}}\+{{< /ui >}} 템플릿을 클릭한 다음 드롭다운 메뉴에서 모바일 애플리케이션을 선택합니다. 아직 모바일 애플리케이션을 생성하지 않았다면 [{{< ui >}}Synthetic Monitoring & Continuous Testing Settings{{< /ui >}} 페이지][3]의 [{{< ui >}}Applications List{{< /ui >}} 섹션][2]에서 모바일 애플리케이션을 생성하세요. 
  1. {{< ui >}}version{{< /ui >}}을 선택하거나 {{< ui >}}Always run the latest version{{< /ui >}}을 클릭하여 테스트가 실행될 때마다 모바일 애플리케이션의 최신 버전을 사용하도록 설정합니다.
  1. 테스트에 {{< ui >}}name{{< /ui >}}을 추가합니다.
  1. 테스트와 관련된 {{< ui >}}environment and additional tags{{< /ui >}}를 선택합니다. `<KEY>:<VALUE>` 형식을 사용하여 지정된 `<KEY>`의 `<VALUE>`를 필터링합니다.
  1. 테스트를 실행할 [{{< ui >}}devices{{< /ui >}}](#devices)를 선택합니다.
  1. 테스트의 [재시도 조건](#test-retries)을 설정합니다.
  1. 기본 시간 간격을 클릭하거나 테스트 모니터링의 테스트 주기 및 {{< ui >}}alert conditions{{< /ui >}}를 사용자 지정하여 [{{< ui >}}test frequency{{< /ui >}}](#scheduling-and-alerts)를 설정합니다. 
  1. 테스트 모니터링의 이름을 입력하고 알림을 제공할 서비스 또는 팀원을 선택한 후 메시지 알림을 추가합니다.
  1.  {{< ui >}}Save & Edit Recording{{< /ui >}}을 클릭하여 모바일 애플리케이션 테스트를 제출합니다.

### 코드 조각 {#snippets}

새 모바일 애플리케이션 테스트를 구성할 때 이러한 옵션을 수동으로 선택하는 대신 코드 조각을 사용하여 OS 버전, 장치 크기, 제조업체 및 가동 시간을 자동으로 채우세요. 다음 코드 조각을 사용할 수 있습니다.

* {{< ui >}}Device Size{{< /ui >}}: 다양한 장치에서 특정 화면 크기로 모바일 애플리케이션 테스트를 자동으로 실행합니다.

  - {{< ui >}}Multi-screen size{{< /ui >}}
  - {{< ui >}}Tablet{{< /ui >}}
  - {{< ui >}}Large Screen (iOS only){{< /ui >}}
  - {{< ui >}}Standard Screen (iOS only){{< /ui >}}
  - {{< ui >}}Small Screen (iOS only){{< /ui >}}

*  {{< ui >}}OS Version{{< /ui >}}: 여러 장치 제조업체의 Android 앱을 자동으로 테스트합니다. 이 섹션은 선택한 모바일 애플리케이션에 따라 iOS 또는 Android로 전환됩니다.

*  {{< ui >}}Device Manufacturer (Android only){{< /ui >}}: 여러 OS 버전에서 iOS 또는 Android 앱을 자동으로 테스트합니다.

* {{< ui >}}Uptime{{< /ui >}}: 사용 가능한 가장 짧은 테스트 주기(15분마다)로 테스트를 자동으로 구성합니다.

<br/>
  {{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="코드 조각 예시가 표시된 모바일 앱 테스트 생성 화면의 왼쪽 스크린샷" width="70%" >}}

### 고급 옵션 {#advanced-options}

모바일 테스트를 생성할 때 고급 옵션을 구성하여 코드를 수정하지 않고도 앱 동작을 동적으로 조정할 수 있습니다. 예를 들어, 경보를 자동으로 수락하고 애플리케이션 충돌을 허용하며 네트워크 리소스를 캡처할 수 있습니다. 모바일 텍스트의 {{< ui >}}Advanced Options{{< /ui >}} 섹션에서 이러한 구성에 액세스할 수 있습니다.

#### 테스트 동작 옵션: {#test-behavior-options}

{{< ui >}}Auto-accept alerts{{< /ui >}}
: 활성화하면 테스트 실행 중 모든 OS 시스템 경보를 자동으로 수락합니다.

{{< ui >}}Allow application crash{{< /ui >}}
: 활성화하면 애플리케이션 충돌이 탐지되어도 테스트가 실패하지 않도록 방지합니다. 테스트를 계속하려면 예상된 충돌 후 애플리케이션을 다시 시작하는 단계를 포함해야 합니다.

{{< ui >}}Capture network resources{{< /ui >}}
활성화하면 각 테스트 단계의 네트워크 요청 및 응답을 수집하여 결과에 표시합니다. </br>
**참고**: 이 설정은 애플리케이션 성능에 영향을 줄 수 있으며 앱이 시작되지 않게 할 수도 있습니다.

#### 애플리케이션 인수: {#application-arguments}

테스트가 시작될 때 애플리케이션에 `key:value` 쌍을 전달하여 프로그래밍 방식으로 앱 동작을 수정할 수 있습니다. 애플리케이션 코드는 이러한 키-값 쌍을 명시적으로 읽고 처리하도록 구성되어야 합니다. 

예를 들어, [자동 새로 고침 인증 토큰 주입][17]을 통해 앱의 로그인 흐름을 건너뛸 수 있습니다.

**예시:**

{{< tabs >}}
{{% tab "Android(초기 인텐트 추가 항목)" %}}

Android 테스트의 경우, 테스트의 Advanced Options 섹션에 적절한 `key:value` 쌍을 추가하세요.

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Android 장치의 고급 옵션 예시를 보여주는 모바일 앱 테스트 생성 페이지" style="width:100%;" >}}
{{% /tab %}}

{{% tab "iOS(프로세스 인수)" %}}

iOS 테스트의 경우, Advanced Options 섹션에 적절한 `key:value` 쌍을 추가하세요.

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}",
  "enable_feature_x": "true"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="iiOS 장치의 고급 옵션 예시를 보여주는 모바일 앱 테스트 생성 페이지" style="width:100%;" >}}
    
{{% /tab %}}
{{< /tabs >}}

## 장치 {#devices}

장치 선택 화면에서 유럽(EU) 또는 미국(US)에 위치한 모바일 장치를 테스트하도록 선택할 수 있습니다. 
EU 또는 US에서 호스팅되는 장치를 사용하도록 모바일 테스트를 구성하려면 다음 단계를 따르세요.

1. 기존 모바일 테스트의 테스트 편집 페이지를 열거나 새 테스트를 생성합니다.
2. {{< ui >}}Devices{{< /ui >}} 섹션을 확장하고 테스트에 사용할 장치 위치를 선택합니다.
   - {{< ui >}}All locations{{< /ui >}}: EU와 US 모두에서 테스트를 실행합니다.
   - {{< ui >}}EU{{< /ui >}}: US에서만 테스트를 실행합니다.
   - {{< ui >}}US{{< /ui >}}: 미국에서만 테스트를 실행합니다.
3. 드롭다운{{< ui >}}Select Device(s){{< /ui >}}을 사용하여 테스트할 장치를 선택합니다.
4. 테스트 구성을 저장하려면 {{< ui >}}Save & Edit Recording{{< /ui >}}을 클릭합니다.

**참고**: 
- 미국에서 호스팅되는 장치에서 실행되는 테스트는 AWS 미국 서부(오리건) 리전에서 실행됩니다. 마찬가지로 EU에서 호스팅되는 장치의 테스트는 AWS 독일(프랑크푸르트) 리전에서 실행됩니다.
- 모든 장치를 EU와 US 양쪽에서 사용할 수 있는 것은 아닙니다. 자세한 내용은 [지원되는 장치][16] 목록을 참조하세요.

{{< img src="mobile_app_testing/mobile_app_devices_EU.mp4" alt="US 및 EU 지역에서 하나 이상의 모바일 장치 선택하기" video=true >}}

### 모바일 장치 제품군 {#mobile-device-families}

모바일 장치 제품군은 모델 라인이나 OS 버전과 같은 공통 특성을 공유하는 장치 집합을 나타냅니다. 단일 특정 장치를 선택하는 대신 제품군을 선택할 수 있습니다. 테스트가 실행되면 Datadog은 해당 시점에 제품군 내에서 사용 가능한 장치 중 하나에서 테스트를 실행합니다. 제품군을 선택하면 테스트가 단일 특정 장치에 의존하지 않고 제품군 내의 사용 가능한 모든 장치에서 실행될 수 있으므로 테스트 결과의 가용성이 향상됩니다.

Datadog은 **Select Device(s)** 드롭다운에서 개별 장치와 함께 표시되는 내장 제품군을 제공합니다. 예시는 다음과 같습니다.

- **최신 iOS 버전의 최신 iPhone 제품군**(iOS)
- **모든 iPhone Pro**(iOS)
- **최신 Android 버전의 최신 Pixel 제품군**(Android)
- **모든 삼성 장치**(Android)

개별 장치를 선택하는 것과 동일한 방식으로 제품군을 선택하세요. 단일 테스트는 개별 장치, 제품군 또는 둘 다를 대상으로 할 수 있습니다

## 테스트 재시도 {#test-retries}

알림 경보가 트리거되기 전에 테스트가 실패 상태를 유지해야 하는 시간을 지정할 수 있습니다.

* 실패 시 `Y`밀리초 후 `X`회 재시도합니다.

{{< img src="mobile_app_testing/retry_condition.png" alt="실패 시 300ms 후 테스트를 0회 재시도하도록 설정된 재시도 조건 단계" width="90%" >}}

## 스케줄링 및 경보 {#scheduling-and-alerts}

기본적으로 모바일 앱 테스트는 온디맨드 테스트로 설정되므로 이러한 테스트는 [CI 파이프라인에서 직접](#run-tests-in-ci) 실행할 수 있습니다.

{{< img src="mobile_app_testing/alerting_rules.png" alt="모바일 테스트를 위한 스케줄링 및 경보 조건" style="width:90%" >}}

경보 조건을 사용자 지정하여 경보 전송 빈도와 테스트에서 알림 경보를 전송할 조건을 정의할 수 있습니다.

* 어설션 중 하나라도 `X`분 동안 실패하면 경보가 트리거됩니다.

<div class="alert alert-info">
Synthetic Monitoring 알림이 테스트 결과를 평가하고 경보를 트리거하는 방법에 대한 자세한 내용은 <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Synthetic Monitoring 경보 이해하기</a>를 참조하세요.
</div>

{{% synthetics-downtimes %}}

### 테스트 모니터링 구성 {#configure-the-test-monitor}

설정된 경보 조건에 따라 알림이 전송됩니다. 이 섹션을 사용하여 팀에 메시지를 전송하는 방법과 내용을 정의하세요.

1. {{< ui >}}message{{< /ui >}}를 입력하거나 미리 입력된 모니터링 메시지를 모바일 앱 테스트에 사용합니다. 이 필드는 표준 [마크다운 형식][5]을 허용하며 다음 [조건 변수][6]를 지원합니다.

    | 조건 변수       | 설명                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | 모니터링에 경보가 발생하면 표시됩니다.                                       |
    | `{{^is_alert}}`            | 모니터링에 경보가 발생하지 않으면 표시됩니다.                                     |
    | `{{#is_recovery}}`         | 모니터링이 'alert'로부터 복구되면 표시됩니다.                          |
    | `{{^is_recovery}}`         | 모니터링이 'alert'로부터 복구되지 않으면 표시됩니다.                        |
    | `{{#is_renotify}}`         | 모니터링이 재알림을 전송하면 표시됩니다.                                   |
    | `{{^is_renotify}}`         | 모니터링이 재알림을 전송하지 않으면 표시됩니다.                                 |
    | `{{#is_priority}}`         | 모니터링이 우선 순위(P1~P5)와 일치하면 표시됩니다.                  |
    | `{{^is_priority}}`         | 모니터링이 우선 순위(P1~P5)와 일치하지 않으면 표시됩니다.                |

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

    {{< img src="/mobile_app_testing/mobile_app_synthetic_monitor.png" alt="미리 입력된 모니터링 메시지가 강조 표시된 모바일 앱 테스트 모니터링 섹션" style="width:100%;" >}}

    For example, to create a monitor that iterates over steps extracting variables for mobile tests, add the following to the monitor message:

      ```text
      {{! 성공한 모든 단계에서 추출된 변수 나열
      # 추출된 변수
      {{#each synthetics.attributes.result.steps}}
      {{#if extractedValue}}
      * **이름**: `{{extractedValue.name}}`
      **값:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
      {{/if}}
      {{/each}}
      ```

2. 알림을 보낼 팀원과 서비스를 선택합니다.
3. 재알림 빈도를 지정합니다. 테스트 실패 시 재알림을 방지하려면 {{< ui >}}Stop re-notifying on X occurrences{{< /ui >}} 옵션을 검사하세요.
4. {{< ui >}}Save & Edit Recording{{< /ui >}}을 클릭하여 테스트 구성을 저장하고 모바일 앱 테스트 단계를 기록합니다.

자세한 내용은 [Synthetic Monitoring 경보][7]를 참조하세요.

## 불안정성 {#flakiness}

불안정성은 엔드투엔드 테스트의 문제점입니다. 테스트 실패는 실제 애플리케이션 문제가 아니라 식별자에 영향을 미치는 유효한 프런트엔드 코드 변경으로 인해 발생하는 경우가 있습니다.

불안정한 테스트를 방지하기 위해 Datadog은 로케이터 세트를 활용하여 모바일 앱 테스트의 요소를 대상으로 지정하는 알고리즘을 사용합니다. UI의 작은 변경으로 요소가 수정될 수 있습니다(예: 다른 위치로 이동). 모바일 앱 테스트는 변경의 영향을 받지 않는 참조 지점을 기반으로 요소를 자동으로 다시 찾습니다. 

테스트가 성공적으로 실행되면 모바일 앱 테스트는 업데이트된 값을 사용하여 손상된 로케이터를 다시 계산 또는 '자체 복구'합니다. 이를 통해 간단한 UI 업데이트로 인한 테스트 중단을 방지하고, 테스트가 모바일 애플리케이션의 UI에 자동으로 적응하도록 보장합니다. 

## CI에서 테스트를 실행 {#run-tests-in-ci}

필요에 따라 [테스트 `synthetics.json` 파일][13]과 [전역 구성 `synthetics-ci.config` 파일][14]에서 `mobileApplicationVersionFilePath` 옵션을 정의하여 CI 파이프라인에서 모바일 앱 테스트를 실행할 수 있습니다. 전역 구성 파일 옵션이 테스트 구성 파일 옵션보다 우선합니다.

이 예시에서 테스트 `aaa-aaa-aaa`는 `application/path`에서 찾은 재정의 애플리케이션 버전으로 실행됩니다.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

그런 다음 `$ datadog-ci synthetics run-tests --config synthetics-ci.config`를 실행하세요.

자세한 내용은 [Continuous Testing 및 CI/CD][1]를 참조하세요.

## 권한 {#permissions}

기본적으로 Datadog Admin 및 Datadog Standard 역할을 가진 사용자만 Synthetic 모바일 앱 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic 모바일 앱 테스트의 생성, 편집 및 삭제 권한을 얻으려면 사용자 역할을 두 가지 [기본 역할][8] 중 하나로 업그레이드하세요.

[사용자 지정 역할 기능][9]을 사용하는 경우, `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /ko/mobile_app_testing/settings/
[4]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /ko/synthetics/notifications/
[8]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[11]: /ko/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /ko/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[15]: /ko/real_user_monitoring/application_monitoring/
[16]: /ko/synthetics/mobile_app_testing/devices
[17]: /ko/synthetics/guide/mobile-test-auth-tokens/