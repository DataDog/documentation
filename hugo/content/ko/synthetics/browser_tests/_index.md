---
aliases:
- /ko/synthetics/browser_check
- /ko/synthetics/browser_test
description: 특정 위치에서 사용자의 경로를 시뮬레이션 및 모니터링합니다.
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: 설명서
  text: 브라우저 테스트 시작하기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터링에 대해 알아보기
- link: /synthetics/guide/version_history/
  tag: 가이드
  text: Synthetic Monitoring의 버전 기록
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: 학습 센터
  text: 'Datadog 학습 센터: Synthetic 브라우저 테스트 시작하기'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드투엔드 테스트 생성 모범 사례
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: 블로그
  text: Datadog Synthetic Monitoring을 사용하여 사용자 여정 전반의 문제 해결 간소화하기
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: 블로그
  text: Datadog을 통해 고객의 브라우저 테스트 확장을 지원한 사례
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 외부 사이트
  text: Terraform을 사용하여 Synthetic 브라우저 테스트 생성 및 관리하기
title: 브라우저 테스트
---
## 개요 {#overview}

브라우저 테스트는 Datadog이 웹 애플리케이션에서 실행하는 시나리오입니다. 설정된 주기에 따라 전 세계의 여러 위치에서 다양한 브라우저 및 기기를 통해 실행됩니다. 이 테스트는 애플리케이션이 실행 중이며 요청에 응답하고 있는지, 시나리오에 정의된 조건이 충족되는지를 검증합니다.

<div class="alert alert-info">MFA의 배경이 되는 애플리케이션을 테스트하는 데 관심이 있다면 <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">전용 가이드</a>를 읽고 Synthetic Monitoring 팀에 <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">피드백을 보내</a>주세요. 고객님의 팀에 가장 중요한 시스템을 개선하는 데 활용하겠습니다.</div>

## 테스트 구성 {#test-configuration}

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

### 템플릿에서 테스트 생성하기 {#create-a-test-from-a-template}

  1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 **템플릿 보기**를 클릭합니다. 테스트 세부 정보, 경보 조건, 단계, 변수(선택 사항)를 포함한 사전에 채워진 구성 정보가 표시된 사이드 패널이 열립니다.
  2. +Create Test**를 클릭하면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있는 구성 페이지가 열립니다.** 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
  3. 오른쪽 상단의 **Save & Quit**를 클릭하여 브라우저 테스트를 제출합니다.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="템플릿이 표시된 Synthetics 브라우저 테스트 랜딩 페이지의 동영상" video="true" >}}

### 테스트 처음부터 빌드하기 {#build-a-test-from-scratch}

  1. 새 브라우저 테스트를 처음부터 시작하려면 **+** 템플릿을 클릭합니다.
  1. 시작 URL**입력: 브라우저 테스트가 시나리오를 시작하는 URL입니다.**
  1. 이름**추가: 브라우저 테스트의 이름입니다.**
  1. 환경 및 추가 태그**선택: 브라우저 테스트에 첨부된** 및 관련 태그를 설정합니다.`env` `<KEY>:<VALUE>` 형식을 사용해 `<KEY>`의 `<VALUE>`를 필터링합니다.

  <div class="alert alert-info">자세한 옵션은 <a href=#advanced-options>고급 옵션</a>을 참조하세요.</div>

  5. **브라우저 및 기기** 선택: 테스트를 실행할 브라우저(예: `Chrome`, `Firefox`, `Edge`)와 기기(예: `Laptop Large`, `Tablet`, `Mobile Small`)를 선택합니다.

      - 대형 노트북의 경우 크기는 1440 픽셀 x 1100 픽셀입니다.
      - 태블릿 기기의 경우 크기는 768 픽셀 x 1020 픽셀입니다.
      - 소형 모바일 기기의 경우 크기는 320 픽셀 x 550 픽셀입니다.

  6. 관리 및 프라이빗 위치**** 선택: Datadog이 관리하는 전 세계의 [위치](#locations) 목록에서 선택하거나 [프라이빗 위치][1]를 생성하여 사용자 지정 위치 또는 내부 프라이빗 네트워크에서 브라우저 테스트를 실행합니다.

     **참고**: 또한 [Continuous Testing Tunnel][2]을 사용하여 로컬 개발 환경이나 CI/CD 파이프라인에서 테스트를 트리거해 내부 환경을 테스트할 수도 있습니다.

  7. 테스트 주기**설정: 간격은 5분마다부터 주 1회까지 다양하게 설정할 수 있습니다.** 1분 주기로 테스트하려면 [지원팀에 문의][3]하세요.
  8. 브라우저 테스트를 제출하려면 **Save & Edit Recording**을 클릭합니다.

### 위치 {#locations}

{{% managed-locations %}}

### 스니펫 {#snippets}

Synthetic Monitoring 브라우저 테스트를 설정할 때 수동으로 옵션을 선택하지 말고 코드 조각을 사용해 기기와 리전 정보를 자동으로 입력하세요. 다음 코드 조각을 사용할 수 있습니다.

* **화면 크기**: 브라우저 전반에서 특정 화면 크기로 브라우저 테스트를 자동으로 수행합니다.
   * **대형**
   * **태블릿**
   * **모바일**

* **다중 지역 검사**: 세 개의 주요 지역(AMER, APAC, EMEA)에서 웹사이트를 자동으로 테스트합니다.
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="코드 조각 예시가 표시된 브라우저 테스트 생성의 왼쪽 화면 스크린샷" width="70%" >}}

### 고급 옵션 {#advanced-options}

{{< tabs >}}

   {{% tab "요청 옵션" %}}

   **Disable CORS**를 선택하여 교차 출처 리소스 공유(CORS) 정책이 테스트를 차단하지 않도록 합니다. 테스트가 차단되지 않도록 **Disable CSP**를 선택하세요.

   * **요청 헤더**: 기본 브라우저 헤더에 추가하거나 재정의할 헤더를 **Name** 및 **Value** 필드에 정의합니다. 예를 들어 헤더에서 사용자 에이전트를 [Datadog 스크립트를 식별][1]로 설정할 수 있습니다.
   * **쿠키**: 기본 브라우저 쿠키에 추가할 쿠키를 정의합니다. [`Set-Cookie`][2] 구문을 사용하여 한 줄에 하나의 쿠키를 입력합니다.
   * **HTTP 인증**: 사용자 이름과 비밀번호로 HTTP Basic, Digest 또는 NTLM을 통해 인증합니다. 해당 자격 증명 정보는 브라우저 테스트의 모든 단계에서 사용됩니다. **참고**: 브라우저 시스템 프롬프트를 통해 사용자 자격 증명을 요청하는 웹사이트의 경우, HTTP Basic을 사용해 인증할 수 있습니다.

   요청 옵션은 테스트 실행마다 설정되며, 기록 시간이 아닌 실행 시간에 브라우저 테스트의 모든 단계에 적용됩니다. 다음 단계를 기록할 목적으로 본 옵션을 활성화 상태로 유지해야 하는 경우, 기록 중인 페이지에서 수동으로 옵션을 적용하고 테스트에서 다음 단계를 만드세요.


[1]: /ko/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "인증서" %}}

   테스트에서 서버 인증서의 오류를 건너뛰도록 지시하려면 **Ignore server certificate error**를 선택하세요.

   * **클라이언트 인증서**: **파일 업로드**를 클릭하고 인증서 파일과 프라이빗 키를 업로드하여 클라이언트 인증서가 필요한 시스템에서 테스트를 수행합니다. PEM 인증서만 허용됩니다.
   * **클라이언트 인증서 도메인**: 인증서 파일이 업로드되면 클라이언트 인증서는 시작 URL의 도메인에 적용됩니다. 다른 도메인에 클라이언트 인증서를 적용하려면 **Value** 필드에 해당 도메인을 지정합니다.

   본 URL에 와일드카드를 포함할 수 있습니다.

   {{% /tab %}}

   {{% tab "프록시" %}}

   요청을 전송할 프록시의 URL을 **Proxy URL** 필드에 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`로 입력합니다.

   URL에 [전역 변수](#use-global-variables)를 포함할 수 있습니다.

   {{% /tab %}}

   {{% tab "개인정보 보호" %}}

   테스트 단계에서 스크린샷을 캡처하지 않으려면 **Do not capture any screenshots for this test**을 선택하세요.

   이 개인정보 보호 옵션은 개별 테스트 단계 수준에서 [고급 옵션][1]으로 제공되며, 테스트 결과에 민감한 데이터가 표시되지 않도록 합니다. 테스트에서 스크린샷을 캡처하지 않도록 설정할 경우, 실패 시 문제 해결이 더 어려워질 수 있습니다. 자세한 내용은 [데이터 보안][2]을 참조하세요.

[1]: /ko/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /ko/data_security/synthetics
   {{% /tab %}}

   {{% tab "시작 URL" %}}

   초기 테스트 단계를 실패로 선언하기 전 테스트의 대기 시간(초)을 입력합니다.

   {{% /tab %}}

   {{% tab "시간 및 언어" %}}

  기본적으로 시간대는 UTC로 설정되며, 언어는 영어(en)로 설정되어 있습니다. 언어를 정의하려면 해당하는 2~3자리 [ISO 코드][1]를 사용하세요.

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "차단된 요청" %}}

   테스트가 실행되는 동안 로드되지 않게 하려는 요청 패턴을 1개 이상 입력하세요. [일치 패턴 형식][1]을 사용하여 한 줄에 하나의 요청 패턴을 입력하세요. 와일드카드(예: `*://*.example.com/*`)가 지원됩니다.

   차단된 요청은 테스트 실행 중에 건너뛰기 되지만 [기록 단계](/synthetics/browser_tests/test_steps)에서는 페이지 렌더링에 영향을 주지 않습니다. 테스트 실행의 [리소스 탭](/synthetics/browser_tests/test_results#resources)에서 차단된 요청을 확인하세요. 차단된 요청의 상태는 `blocked`입니다.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### 전역 변수 사용 {#use-global-variables}

브라우저 테스트 세부정보의 **시작 URL** 및 **고급 옵션**과 테스트 기록에서 [**설정**][4]에 정의된 전역 변수를 사용할 수 있습니다.

사용 가능한 변수의 목록을 표시하는 방법은 다음과 같습니다.

- 브라우저 테스트의 세부 정보에서: 원하는 필드에 `{{`을 입력합니다.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="전역 변수에서 로컬 변수 정의하기" video="true" width="90%" >}}

- 브라우저 테스트의 레코더에서: 테스트에 변수를 가져온 후 원하는 필드에 `{{`을 입력하거나 애플리케이션에 변수를 주입하여 사용합니다.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="브라우저 기록 시 필드에 로컬 변수 주입하기" video="true" width="90%" >}}

브라우저 테스트 기록 시 변수 활용 방법을 알아보려면 [브라우저 테스트 단계][5]를 참고하세요.

### 경보 조건 정의 {#define-alert-conditions}

경보 조건을 맞춤 설정하여 테스트가 알림을 전송하는 상황을 정의할 수 있습니다.

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="브라우저 테스트 경보 규칙" style="width:80%" >}}

#### 경보 규칙 {#alerting-rule}

`n`/`N`개의 위치에서 `X`분 동안 어설션이 실패하면 경보가 트리거됩니다. 본 경보 규칙을 활용하면 경보가 트리거되기 전에 테스트의 실패 기간과 테스트 실패 위치 수를 지정할 수 있습니다.

경보는 다음 두 조건이 모두 충족될 때만 트리거됩니다.

- 지난 X분 동안 최소 하나의 위치가 실패 상태여야 합니다(최소 하나의 어설션이 실패함).
- 지난 X분 중 어느 한 시점에 최소 `N`개의 위치가 실패 상태여야 합니다.

실패할 경우, 해당 위치가 실패로 표시되기 전에 재시도를 `X`회 실시합니다. 이 설정을 통해 위치가 실패로 간주되기 위해 필요한 연속 테스트 실패 횟수를 정의할 수 있습니다. 실패한 테스트를 재시도하기 전에 `300ms`의 대기 시간 기본값으로 설정되어 있습니다. 이 주기는 [API][6]로 구성할 수 있습니다.

#### 빠른 재시도 {#fast-retry}

테스트가 실패할 경우 빠른 재시도를 사용하면 실패로 표시되기 전에 Yms 후에 테스트를 X회 재시도할 수 있습니다. 재시도 주기를 사용자 정의하면 오탐을 줄이고 경보의 정확성을 향상시킬 수 있습니다.

위치 가동 시간은 재시도가 완료된 후 최종 테스트 결과를 기반으로 계산되므로, 빠른 재시도 간격은 총 가동 시간 그래프에 직접적인 영향을 미칩니다. 총 가동 시간은 구성된 경보 조건을 기반으로 계산되며, 총 가동 시간에 따라 알림이 전송됩니다.

<div class="alert alert-info">
Synthetic Monitoring 알림이 테스트 결과를 평가하고 경보를 트리거하는 방법에 대한 자세한 내용은 <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Synthetic Monitoring 경보 이해하기</a>를 참조하세요.
</div>

{{% synthetics-downtimes %}}

### 테스트 모니터 구성 {#configure-the-test-monitor}

알림 조건 집합에 따라 알림이 전송됩니다. 이 섹션을 사용하여 팀에 메시지를 전송하는 방법과 내용을 정의할 수 있습니다.

1. 브라우저 테스트용 **메시지**를 입력하거나 사전에 채워진 모니터링 메시지를 사용할 수 있습니다. 이 필드는 표준 [마크다운 형식][7]을 허용하며 다음 [조건 변수][8]를 지원합니다.

    | 조건 변수       | 설명                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | 모니터링이 우선순위(P1~P5)와 일치하지 않는 경우 표시됩니다.                |

    Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring 모니터링 섹션, 사전에 채워진 모니터링 메시지가 강조 표시됨" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{! 모든 성공적인 단계에서 추출된 변수 나열 }}
   # 추출된 변수
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **이름**: `{{extractedValue.name}}`
   **값:** {{#if extractedValue.secure}}*마스킹됨(값이 숨겨짐)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.
4. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be only recorded from [Google Chrome][10] and [Microsoft Edge][18]. To record your test, download the [Datadog Record Test extension][11].

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="브라우저 테스트 기록 테스트" width="90%" >}}

1. 필요시 페이지 오른쪽 상단의 **팝업에서 열기**를 선택하여 테스트 기록을 별도의 팝업 창으로 열 수 있습니다. 이 옵션은 애플리케이션이 iframe에서 열리는 것을 지원하지 않거나 기록 중 크기 문제를 피하고 싶을 때 유용합니다. 테스트를 새 브라우저에서 시작하려면 **시크릿 모드**에서 팝업 창을 여세요. 이 모드는 이미 로그인된 세션, 기존 브라우저의 쿠키 등이 없는 상태입니다.
2. 필요시 브라우저 테스트에서 단계 기록을 실행할 때 Datadog이 RUM 데이터를 자동으로 수집하도록 활성화합니다. 자세한 내용은 [RUM 및 세션 리플레이 살펴보기][13]를 참조하세요.
3. 브라우저 테스트 기록을 시작하려면 **기록 시작**을 클릭합니다.
4. 모니터링하려는 사용자 경로를 실행하는 애플리케이션을 클릭하면 작업이 자동으로 기록되어 왼쪽의 브라우저 테스트 시나리오 내의 [단계][14]를 생성하는 데 활용됩니다.
5. 자동으로 기록되는 테스트 단계 외에도 왼쪽 상단의 [단계][14]기능으로 더욱 다양한 시나리오를 생성할 수 있습니다.
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="브라우저 테스트 단계" style="width:80%;">}}

   Datadog은 브라우저 테스트에서 실행된 경로가 예상한 상태에서 도출되었는지 확인하기 위해 브라우저 테스트를 **[어설션][12]**으로 종료할 것을 권장합니다.
6. 시나리오가 종료되면 **Save and Launch Test**를 클릭합니다.

## 단계 리플레이{#replay-your-steps}

브라우저 테스트 중 1개 이상의 단계를 브라우저에서 바로 다시 실행하려면 [Datadog 기록 테스트 확장 프로그램][11]을 다운로드하세요.

단계 리플레이 기능은 개별 단계를 디버그하고, 브라우저 테스트를 편집할 때 올바른 애플리케이션 상태에 도달하며, 테스트를 저장하기 전에 전체 흐름을 확인하는 데 도움이 됩니다.

**참고**: 단계 리플레이는 서로 다른 조건(브라우저 버전, 네트워크, 사용자 에이전트, 로그인 상태)이나 제한으로 인해 전체 Synthetic Monitoring 테스트 실행과 다르게 작동할 수 있습니다.

### 단계 리플레이 사용 방법 {#how-to-use-step-replay}

단계는 세 가지 방법으로 리플레이할 수 있습니다.

<strong>1. 단일 단계 리플레이:</strong> 단일 단계를 다시 실행합니다.
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="단일 단계 리플레이" video="true" height="400px" >}}
<p style="text-align: center;"><em>단계 위에 마우스를 올리고 리플레이 버튼을 클릭하여 이 단계만 리플레이합니다.</em></p>

<strong>2. 모든 단계 리플레이:</strong> 기록기에 정의된 전체 단계 시퀀스를 실행합니다.
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="모든 단계 리플레이" video="true" height="400px" >}}
<p style="text-align: center;"><em>단계 목록 상단의 모두 리플레이 버튼(⏩︎)을 클릭하여 모든 단계를 리플레이합니다.</em></p>

<strong>3. 선택한 단계 리플레이:</strong> 단계 목록에서 선택한 단계의 하위 집합을 실행합니다.
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="선택한 단계 리플레이" video="true">}}
<p style="text-align: center;"><em>리플레이할 단계를 선택한 후, 단계 목록 상단에서 선택한 단계 리플레이 버튼(⏩︎)을 클릭합니다.</em></p>

### 단계 리플레이 기능 지원 {#step-replay-feature-support}

아래 요약 표를 통해 단계 리플레이에서 지원되는 브라우저 테스트 단계 유형을 확인하세요.

| 단계 유형                | 단계 리플레이 지원 여부 | 참고 |
|--------------------------|:------------------------:|-------|
| 변수 추출         | {{< X >}}                       |       |
| URL로 이동                | {{< X >}}                       |       |
| 새로 고침                  | {{< X >}}                       |       |
| 스크롤                   | {{< X >}}                       |       |
| 옵션 선택            | {{< X >}}                       |       |
| 대기                     | {{< X >}}                       |       |
| API 테스트 실행             | {{< X >}}                       |       |
| 확인란 상태 검증    | {{< X >}}                       |       |
| 현재 URL 검증       | {{< X >}}                       |       |
| 요소 속성 검증 | {{< X >}}                       |       |
| 요소 콘텐츠 검증   | {{< X >}}                       |       |
| 요소 존재 여부 검증   | {{< X >}}                       |       |
| 파일 다운로드 검증     | {{< X >}}                       |       |
| 페이지 포함 사항 검증     | {{< X >}}                       |       |
| 페이지 미포함 사항 검증        | {{< X >}}                       |       |
| JavaScript 기반 검증   | {{< X >}}                       |       |
| JavaScript에서 추출 | {{< X >}}                       |       |
| 키 입력                | {{< X >}}                       |       |
| 텍스트 입력                | {{< X >}}                       |       |
| 클릭                    | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| 마우스 오버                    | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### 단계 리플레이에서 지원되지 않는 단계 유형 {#step-types-not-supported-by-step-replay}

| 단계 유형                | 단계 리플레이 지원 여부 |
|--------------------------|:------------------------:|
| 이메일 검증             | 아직 지원되지 않음        |
| 요청 검증          | 아직 지원되지 않음        |
| 이메일 본문에서 추출  | 아직 지원되지 않음        |
| 이메일 링크로 이동         | 아직 지원되지 않음        |
| 파일 업로드             | 아직 지원되지 않음        |

### 디버거 권한 {#debugger-permission}

전체 Synthetic Monitoring 테스트 실행 환경과 최대한 유사하게 재현하기 위해, JavaScript 기반 단계나 키 입력 시뮬레이션과 같은 일부 단계는 리플레이 시 디버거 권한이 필요합니다.

확장 프로그램이 디버거 권한이 필요한 버전으로 처음 업데이트되면 권한 요청이 표시되며 권한이 승인될 때까지 확장 프로그램이 비활성화됩니다.
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="디버거 권한 수락하기" video="true" height="400px" >}}
<p style="text-align: center;"><em>세 개의 점 메뉴를 클릭하여 {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} 권한을 수락합니다.</em></p>

## 권한 {#permissions}

기본적으로, [Datadog Admin 및 Datadog Standard 역할][15]을 가진 사용자만 Synthetic 브라우저 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic 브라우저 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자를 두 가지 [기본 역할][15] 중 하나로 업그레이드하세요.

[사용자 정의 역할 기능][15]을 사용하는 경우, `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

[액세스 컨트롤 세분화][17]를 사용해 테스트 기반 역할, 팀, 개인 사용자 액세스 제한하는 방법은 다음과 같습니다.

1. 양식의 권한 섹션을 엽니다.
2. **Edit Access**를 클릭합니다.
  {{< img src="synthetics/settings/grace_2.png" alt="프라이빗 위치 구성 양식에서 테스트에 대한 권한을 설정합니다." style="width:100%;" >}}
3. **Restrict Access**를 클릭합니다.
4. 팀, 역할 또는 사용자를 선택합니다.
5. **Add**를 클릭합니다.
6. 각 역할에 연결하려는 액세스 수준을 선택합니다.
7. **Done**을 클릭합니다.

<div class="alert alert-info">열람자 액세스 권한이 없어도 해당하는 프라이빗 위치의 결과를 볼 수 있습니다.</div>

| 액세스 수준 | 테스트 구성 보기 | 테스트 구성 편집 | 테스트 결과 보기 | 테스트 실행 | 녹화 보기 | 녹화 편집 |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| 액세스 없음    |                         |                         |                   |           |                |                |
| 열람자| {{< X >}}               |                         | {{< X >}}         |           |                |                |
| 편집자 | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations/
[2]: /ko/continuous_testing/environments/proxy_firewall_vpn
[3]: /ko/help/
[4]: /ko/synthetics/settings/#global-variables
[5]: /ko/synthetics/browser_tests/test_steps#variables
[6]: /ko/api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /ko/synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /ko/synthetics/browser_tests/test_steps/#assertion
[13]: /ko/synthetics/guide/explore-rum-through-synthetics/
[14]: /ko/synthetics/browser_tests/test_steps/
[15]: /ko/account_management/rbac#custom-roles
[16]: /ko/account_management/rbac/#create-a-custom-role
[17]: /ko/account_management/rbac/granular_access
[18]: https://www.microsoft.com/edge
[19]: /ko/synthetics/guide/how-synthetics-monitors-trigger-alerts/