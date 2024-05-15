---
aliases:
- /ko/synthetics/browser_check
- /ko/synthetics/browser_test
description: 특정 위치에서 사용자의 경로를 시뮬레이션 및 모니터링합니다.
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: 블로그
  text: 브라우저 테스트로 사용자 경험 모니터링
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 사용
- link: /getting_started/synthetics/browser_test
  tag: 설명서
  text: 브라우저 테스트 시작하기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터에 대해 알아보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 테라폼
  text: Terraform으로 신서틱(Synthetic) 브라우저 테스트 생성 및 관리
kind: 설명서
title: 브라우저 테스트
---

## 개요

브라우저 테스트는 Datadog이 웹 애플리케이션에서 실행하는 시나리오입니다. 전 세계의 다중 위치에서 다양한 브라우저 및 기기에서 설정 가능한 주기로 실행됩니다. 해당 테스트는 애플리케이션이 실행 중이고 요청에 응답하는지, 시나리오에서 정의한 모든 조건을 충족하는지 확인합니다.

<div class="alert alert-info">MFA의 배경이 되는 애플리케이션을 테스트하고 싶다면 <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">전용 지침</a>을 확인하고 신서틱(Synthetic) 모니터링 팀에게 <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">피드백을 보내</a> 고객님의 팀에 가장 중요한 시스템을 개선하도록 도와주세요.</div>

## 테스트 설정

브라우저 테스트의 설정을 정의합니다.

1. **시작 URL** 입력: 브라우저 테스트가 시나리오를 시작하는 URL입니다.
2. **고급 옵션** 추가 (옵션): 브라우저 테스트용 특정 옵션을 설정합니다.

   {{< tabs >}}

   {{% tab "요청 옵션" %}}

   범출처 리소스 공유(CORS) 정책이 해당 테스트를 차단하지 않도록 하려면 **CORS 비활성화**를 선택합니다. 콘텐츠 보안 정책(CSP)이 테스트를 차단하지 않도록 하려면 **CSP 비활성화**를 선택합니다.

   * **요청 헤더**: **이름** 및 **값** 필드에서 헤더를 정의하여 기본 브라우저 헤더에 추가하거나 이를 덮어쓸 수 있습니다. 예를 들어, 헤더의 사용자 에이전트를 [Datadog 스크립로 구분][1]하여 설정할 수 있습니다.
   * **쿠키**: 기본 브라우저 쿠키에 추가할 쿠키를 정의합니다. [`Set-Cookie`][2] 구문을 사용하여 줄당 쿠키 하나를 입력합니다.
   * **HTTP 인증**: 사용자 이름과 비밀번호로 HTTP Basic, Digest나 NTLM을 통해 인증합니다. 해당 인증 정보는 브라우저 테스트의 모든 단계에서 활용됩니다.

   요청 옵션은 테스트 실행 시마다 설정되며, 기록 시간이 아니라 테스트 실행 시간에 해당 테스트의 모든 단계에 적용됩니다. 다음 단계를 기록할 목적으로 본 옵션을 활성화 상태로 유지해야 하는 경우, 기록 중인 페이지에서 옵션을 수동 적용한 다음 테스트에서 다음 단계를 생성합니다.


[1]: /ko/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "인증서" %}}

테스트에서 서버 인증서의 오류를 건너뛰도록 지시하려면 **Ignore server certificate error**를 선택하세요.

   * **클라이언트 인증서**: **파일 업로드**를 클릭하고 인증서 파일과 비공개 키를 업로드하여 클라이언트 인증서가 필요한 시스템 상에서 테스트를 수행합니다. PEM 인증서만 허용됩니다.
   * **클라이언트 인증서 도메인**: 인증서 파일을 업로드하면 클라이언트 인증서가 시작 URL의 도메인에 적용됩니다. 클라이언트 인증서를 다른 도메인에 적용하려면 **Value** 필드에서 해당 도메인을 지정합니다.

   본 URL에 와일드카드를 포함할 수 있습니다.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   **프록시 URL** 필드에 요청을 전송할 프록시의 URL을   `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`로 입력합니다.

   본 URL에 [전역 변수](#use-global-variables)를 포함시킬 수 있습니다.

   {{% /tab %}}

   {{% tab "프라이버시" %}}

   테스트 단계에서 스크린샷을 캡처하지 않으려면 **Do not capture any screenshots for this test**를 선택합니다. 

   본 개인정보 보호 옵션은 개별 테스트 단계 수준에서 [고급 옵션][1]으로 사용할 수 있으며, 테스트 결과에 민감한 데이터가 표시되지 않도록 합니다. 테스트 시 스크린샷을 캡처하지 않으면 실패 트러블슈팅이 더욱 어려워집니다. 자세한 내용을 확인하려면 [데이터 보안][2] 항목을 참조하세요.

[1]: /ko/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /ko/data_security/synthetics
   {{% /tab %}}

   {{% tab "시작 URL" %}}

   초기 테스트 단계를 실패로 선언하기 전 테스트의 대기 시간(초)을 입력합니다.

   {{% /tab %}}

   {{< /tabs >}}

3. **이름** 추가: 브라우저 테스트의 이름입니다.
4. **환경 및 추가 태그** 선택: 브라우저 테스트와 관련된 `env` 및 연관 태그를 설정합니다. `<KEY>:<VALUE>` 형식으로 대상 `<KEY>`의 `<VALUE>`을 필터링합니다.
5. **브라우저 및 기기** 선택: 테스트를 실행할 브라우저(예: `Chrome`, `Firefox`, `Edge`)와 기기(예: `Laptop Large`, `Tablet`, `Mobile Small`)를 선택합니다. 
   - 대형 노트북의 경우 크기는 1440 픽셀 x 1100 픽셀입니다. 
   - 태블릿 기기의 경우 크기는 768 픽셀 x 1020 픽셀입니다. 
   - 소형 모바일 기기의 경우 크기는 320 픽셀 x 550 픽셀입니다.  
6. **관리 및 프라이빗 위치** 선택: Datadog이 관리하는 전 세계의 위치를 선택하거나 [프라이빗 위치][1]를 생성하여, 사용자 설정 위치 또는 내부 프라이빗 네트워크에서 브라우저 테스트를 실행합니다.

   {{% managed-locations %}}

   또한 [Continuous Testing Tunnel][15]을 통해 로컬 개발 설정 또는 CI/CD 파이프라인에서 테스트를 트리거하여 내부 환경을 테스트할 수도 있습니다.

7. **테스트 주기** 설정: 주기는 매 5분마다부터 일주일에 한 번까지 다양하게 설정할 수 있습니다. 1분 주기로 테스트해야 하는 경우 [지원 팀에 문의][2]하세요.

{{% synthetics-variables %}}

### 전역 변수 사용

브라우저 테스트 세부정보의 **Starting URL** 및 **Advanced Options** 그리고 테스트 기록에서 [**Settings**][3]에 정의된 [전역 변수]를 사용할 수 있습니다.

사용 가능한 변수의 목록을 표시하려면 다음을 참고하세요.

- 브라우저 테스트 세부 정보에서: 원하는 필드에 `{{`을 입력합니다.

  {{< img src="synthetics/browser_tests/recording_global_variable_1.mp4" alt="전역 변수에서 지역 변수 정의" video="true" width="90%" >}}

- 브라우저 테스트의 레코더에서: 테스트에서 변수를 내보낸 다음 원하는 필드에 `{{`을 입력하거나 애플리케이션에 변수를 삽입하여 사용합니다.

  {{< img src="synthetics/browser_tests/recording_inject_variable_1.mp4" alt="브라우저 기록 도중 필드에 지역 변수 삽입하기" video="true" width="90%" >}}

브라우저 테스트 기록 시 변수 활용 방법을 알아보려면 [브라우저 테스트 단계][4]를 참조하세요. 

### 경고 조건 정의

경고 조건을 맞춤 설정하여 테스트가 알림을 전송하는 상황을 정의할 수 있습니다.

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="브라우저 테스트 경고 규칙" style="width:80%" >}}

* 어설션이 `N` 위치의 `n`에서 `X`분 동안 실패하면 경고가 발동합니다. 본 경고 규칙을 활용하면 경고가 발동하기 전 테스트의 실패 기간과 테스트 실패 위치 수를 지정할 수 있습니다.
* 해당 위치가 실패로 표시되기 전 `X`을 여러 번 재시도합니다. 해당 기능으로 연속 테스트 실패가 몇 번 발생해야 위치 테스트가 실패한 것으로 간주되는지 정의할 수 있습니다. 실패한 테스트를 재시도하기 전 300밀리초의 대기 시간이 기본값으로 설정되어 있습니다. 본 주기는 [API][5]를 사용하여 설정할 수 있습니다.

### 테스트 모니터링 설정

알림은 경고 조건에 따라 전송됩니다. 이 섹션을 사용하여 팀에 메시지를 보낼 방법과 내용을 정의합니다.

1. 브라우저 테스트용 **메시지**를 입력합니다. 이 필드는 표준 [마크다운 형식][6]을 허용하며 다음 [조건 변수][17]를 지원합니다.

    | 조건 변수       | 설명                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | 모니터가 알림을 표시합니다.                                       |
    | `{{^is_alert}}`            | 모니터가 경고하지 않는 한 표시합니다.                                     |
    | `{{#is_recovery}}`         | 모니터가 `alert`에서 복구될 때를 표시합니다..                          |
    | `{{^is_recovery}}`         | 모니터가 `alert`에서 복구되지 않는 한 표시합니다..                        |
    | `{{#is_renotify}}`         | 모니터가 다시 알릴 때 표시합니다.                                   |
    | `{{^is_renotify}}`         | 모니터가 다시 알리지 않는 한 표시합니다.                                 |
    | `{{#is_priority}}`         | 모니터가 우선순위(P1부터 P5)와 일치할 때 표시합니다.                  |
    | `{{^is_priority}}`         | 모니터가 우선순위(P1부터 P5)와 일치하지 않는 한 표시합니다.                |

   알림 메시지에는 이 섹션에 정의된 **메시지** 및 실패한 위치에 대한 정보가 포함됩니다.

2. 통지할 팀 구성원 및 서비스를 선택합니다.
3. 재알림 빈도를 지정합니다. 테스트 실패 시 재알림을 방지하려면`Never renotify if the monitor has not been resolved`와 같은 옵션을 유지합니다.
4. **세부 사항 저징 및 테스트 기록**을 클릭하여 테스트 설정을 저장하고 브라우저 단계를 기록합니다.

자세한 내용은 [신서틱(Synthetic) 테스트 모니터링 사용][7]을 참조하세요.

## 단계 기록하기

테스트는 [Google Chrome][8]으로만 기록할 수 있습니다. 테스트를 기록하려면 [Datadog Google Chrome용 테스트 기록 확장 프로그램][9]을 다운로드하세요.

브라우저 테스트 기록 시 탭을 전환해 애플리케이션에서 작업을 수행하고(예: 다른 탭을 여는 링크를 클릭) 다른 테스트 단계를 추가할 수 있습니다. 브라우저 테스트는 [어서션][10] 수행 전 반드시 먼저 페이지와 클릭을 통해 상호 작용해야 합니다. 테스트 단계를 모두 기록하면 테스트 실행 시 브라우저 테스트가 탭을 자동 전환합니다.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="브라우저 테스트 기록 테스트" width="90%" >}}

1. 옵션으로 페이지 오른쪽 상단의 **팝업에서 열기**를 선택하여 별도의 팝업 창에서 테스트 기록 작업을 열 수 있습니다. 본 옵션은 애플리케이션이 iframe에서 열기를 지원하지 않거나 기록 시 크기 조정 문제를 피하고 싶을 때 유용하게 사용할 수 있습니다. 아울러, **시크릿 모드**에서 팝업을 열어 기존 로그인 세션 및 브라우저의 쿠키 등이 없는 새 브라우저에서 테스트 기록을 시작할 수도 있습니다.
2. 필요시 브라우저 테스트에서 단계 기록을 실행할 때 Datadog이 자동으로 RUM 데이터를 수집하도록 활성화합니다. 자세한 내용은 [RUM 탐색 및 세션 재생][11]을 참조하세요.
3. 브라우저 테스트 기록을 시작하려면 **기록 시작**을 클릭합니다.
4. 모니터링하려는 사용자 경로를 실행하는 애플리케이션을 클릭하면 작업이 자동으로 기록되어 왼쪽의 브라우저 테스트 시나리오 내의 [단계][12]를 생성하는 데 활용됩니다.
5. 자동으로 기록되는 테스트 단계 외에도 왼쪽 상단의 [단계][12]기능으로 더욱 다양한 시나리오를 생성할 수 있습니다.
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="브라우저 테스트 단계" style="width:80%;">}}

   Datadog은 브라우저 테스트에서 실행된 경로가 예상한 상태에서 도출되었는지 확인하기 위해 브라우저 테스트를 **[어서션][10]**으로 종료할 것을 권장합니다.
6. 시나리오가 종료되면 **저장 후 테스트 시작**을 클릭합니다.

## 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][13]로 설정된 사용자만 신서틱(Synthetic) 브라우저 테스트를 생성, 편집, 삭제할 수 있습니다. 신서틱(Synthetic) 브라우저 테스트 생성, 편집, 삭제, 접근 권한을 얻으려면 사용자를 이 두 가지 [기본 역할][13] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][13]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한을 포함하는 모든 커스텀 역할에 사용자를 추가합니다.

### 액세스 제한 

[커스텀 역할][14]으로 설정된 계정 고객의 경우 액세스 제한이 가능합니다.

조직의 역할에 따라 브라우저 테스트에 대한 액세스를 제한할 수 있습니다. 브라우저 테스트를 생성할 때 사용자 외에 테스트를 읽고 쓸 수 있는 역할을 선택합니다.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations/
[2]: /ko/help/
[3]: /ko/synthetics/settings/#global-variables
[4]: /ko/synthetics/browser_tests/actions#variables
[5]: /ko/api/latest/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /ko/synthetics/guide/synthetic-test-monitors
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ko/synthetics/browser_tests/actions/#assertion
[11]: /ko/synthetics/guide/explore-rum-through-synthetics/
[12]: /ko/synthetics/browser_tests/actions/
[13]: /ko/account_management/rbac#custom-roles
[14]: /ko/account_management/rbac/#create-a-custom-role
[15]: /ko/continuous_testing/environments/proxy_firewall_vpn
[16]: /ko/synthetics/guide/browser-tests-passkeys
[17]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables