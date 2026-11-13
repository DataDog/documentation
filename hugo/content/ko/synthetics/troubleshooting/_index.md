---
description: 일반적인 Synthetic Monitoring 문제를 해결할 수 있습니다.
further_reading:
- link: /synthetics/
  tag: 설명서
  text: Synthetic 테스트 관리
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
- link: /synthetics/private_locations/
  tag: 설명서
  text: 프라이빗 위치 생성
title: Synthetic Monitoring 문제 해결
---
## 개요 {#overview}

이 페이지를 사용하여 Datadog Synthetic Monitoring 설정 및 구성과 관련된 일반적인 문제를 해결할 수 있습니다. 추가 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.

## 일반적인 오류 메시지 {#common-error-messages}

이 표를 사용하여 일반적인 오류의 문제 해결 단계를 찾을 수 있습니다.

| 오류 메시지                                  | 참조할 섹션 |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [Private Locations → Certificates](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [API and Browser Tests → Unauthorized](#api-and-browser-tests) |
| `Element not found`                            | [Test execution → Element selection issues](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [Private Locations → Browser compatibility](?tab=common#requirements-for-browser-tests-running-on-private-location) |
| `Failed to load resource: ERR_INVALID_ARGUMENT` | [Private Locations → Chrome 149 issue](?tab=common#chrome-149-issue-on-private-locations) |


## API 테스트 {#api-tests}

### 네트워크 타이밍이 다양함 {#network-timings-are-varied}

API 테스트 [타이밍 메트릭][2]에서 갑작스러운 급증이나 전반적인 증가가 나타나면 이는 일반적으로 요청에 병목 현상이나 지연이 있음을 나타냅니다. 자세한 내용은 [API 테스트 타이밍 및 변동][3]을 참조하세요.

## 브라우저 테스트 {#browser-tests}

### 기록 {#recording}

#### 웹사이트가 iframe에서 로드되지 않음 {#the-website-is-not-loading-in-the-iframe}

[Datadog 확장 프로그램][4]을 설치한 후에도 브라우저 테스트 레코더의 iframe에 웹사이트가 나타나지 않으면 `Your website does not support being loaded through an iframe`이라는 메시지가 표시될 수 있습니다. 이는 CSP(콘텐츠 보안 정책) 또는 `X-Frame-Options`와 같은 관련 보안 헤더 등 애플리케이션의 보안 설정이 iframe 로드를 차단한다는 의미입니다.

마찬가지로, iframe 기록 중에 로그인 시도가 실패하면 애플리케이션이 CSP 규칙이나 기타 보안 구성으로 인해 특정 요청을 차단하고 있을 수 있습니다. 경우에 따라 로그인 흐름이 iframe 내에 로드된 웹 애플리케이션에서 시작될 때 CSRF 토큰 문제로 인해 로그인 실패가 발생할 수 있으며, 이로 인해 CSRF 토큰이 삭제될 수 있습니다.

**해결 방법**: {{< ui >}}Open in Popup{{< /ui >}}을 클릭하여 iframe 대신 별도의 창에서 사용자 여정을 기록하세요.  

#### 일부 애플리케이션만 iframe에서 로드됨 {#only-certain-applications-load-in-the-iframe}

애플리케이션과 환경마다 CSP 구성과 기타 보안 제한 사항이 다릅니다. 일부는 iframe 로드를 허용하지만 다른 일부는 보안상의 이유로 차단합니다.

**해결 방법**: {{< ui >}}Open in Popup{{< /ui >}}을 클릭하여 iframe 대신 별도의 창에서 사용자 여정을 기록하세요.

#### iframe에 HTTP 요청 경고 배너가 표시됨{#http-requests-warning-banner-appears-in-iframe}

이 경고는 `http` 페이지에서 기록을 시도할 때 나타납니다. 레코더 iframe은 `https` 페이지만 지원합니다.

**해결 방법**: 페이지를 팝업 창에서 열거나 `https`를 사용하도록 URL을 변경하세요. 

#### 웹사이트가 로드되지 않고 iframe이나 팝업에서 기록이 작동하지 않음{#website-fails-to-load-and-recording-doesnt-work-in-iframe-or-pop-up}

[Datadog 확장 프로그램][4]을 설치한 후에도 브라우저 테스트 레코더의 iframe에 웹사이트가 나타나지 않고 iframe 및 팝업 모드 모두에서 기록이 실패하는 경우:

   {{< img src="synthetics/recording_iframe.mp4" alt="브라우저 테스트 단계 기록 문제" video="true" width="100%" >}}

   **해결 방법**: `On specific sites` 섹션에서 웹사이트를 지정하거나 `On all sites`를 활성화하여 [Datadog 확장 프로그램][5]에 적절한 권한이 있는지 확인하세요.

   {{< img src="synthetics/extension.mp4" alt="모든 사이트에서 확장 프로그램이 데이터를 읽도록 허용" video="true" width="100%" >}}

#### 애플리케이션에서 단계 기록 실패{#recording-steps-fails-on-application}

Chrome 브라우저 정책으로 인해 확장 프로그램이 제대로 기록하지 못할 수 있습니다.

**해결 방법**: `chrome://policy`에서 레코더를 차단할 수 있는 [`ExtensionSettings`][6]와 같은 확장 프로그램 관련 설정은 확인하세요.

#### 레코더에 로그인 페이지가 표시되지 않음{#login-page-not-visible-in-recorder}

레코더 iframe/팝업은 기본적으로 현재 브라우저 세션을 사용합니다. 이미 애플리케이션에 로그인되어 있는 경우 로그인 페이지를 건너뛰고 로그인 후 화면으로 바로 이동하여 인증 단계를 기록하지 못할 수 있습니다.

**해결 방법**: 레코더의 {{< ui >}}incognito mode{{< /ui >}}를 사용하여 현재 세션에서 로그아웃하지 않고 로그인 단계를 기록하도록 하세요.

{{< img src="synthetics/incognito_mode.mp4" alt="시크릿 모드 브라우저 테스트 사용" video="true" width="100%" >}}

{{< ui >}}Incognito mode{{< /ui >}}는 브라우저 기록, 쿠키 및 로그인 데이터를 무시하는 격리된 세션을 생성합니다. 이를 통해 웹사이트를 처음 방문하는 것처럼 로그인 단계를 처음부터 기록할 수 있습니다.

### 테스트 결과{#test-results}

#### 모바일 및 태블릿 브라우저 테스트에 지속적으로 실패함{#mobile-and-tablet-browser-tests-consistently-fail}

**반응형** 웹사이트는 장치마다 DOM 구조가 크게 다를 수 있습니다. {{< ui >}}Laptop Large{{< /ui >}}에서 웹사이트의 DOM은 {{< ui >}}Tablet{{< /ui >}} 또는 {{< ui >}}Mobile Small{{< /ui >}} 뷰포트의 DOM과 크게 다를 수 있습니다.

{{< ui >}}Laptop Large{{< /ui >}}에서 기록된 단계가 더 작은 뷰포트에서는 작동하지 않아 모바일 및 태블릿 테스트가 실패할 수 있습니다.

{{< img src="synthetics/device_failures.png" alt="모바일 태블릿 장치 실패" style="width:100%;" >}}

**해결 방법**: 기록된 단계가 대상 뷰포트와 일치하는 장치별 테스트를 생성하세요.

모바일 또는 태블릿 뷰포트용으로 기록하려면 {{< ui >}}Start Recording{{< /ui >}}을 클릭하기 전에 레코더 드롭다운에서 {{< ui >}}Mobile Small{{< /ui >}} 또는 {{< ui >}}Tablet{{< /ui >}}을 선택하세요.

{{< img src="synthetics/record_device.png" alt="모바일 태블릿에서 단계 기록" style="width:100%;" >}}

**참고**: 브라우저 테스트는 **헤드리스** 모드에서 실행되며 모바일 디자인 탐지를 위한 `touch` 이벤트와 같은 특정 기능을 지원하지 않습니다.

#### 브라우저 테스트 단계의 요소 탐지 경고 {#element-detection-warning-in-browser-test-steps}

브라우저 테스트 단계에 `None or multiple elements detected` 경고가 표시될 수 있습니다.

{{< img src="synthetics/step_warning.png" alt="사용자 로케이터 단계 경고" style="width:100%;" >}}

이는 사용자 로케이터가 여러 요소를 대상으로 하거나 어떤 요소도 대상으로 하지 않아 테스트가 어떤 요소와 상호 작용해야 하는지 알 수 없음을 나타냅니다.

**해결 방법**: 레코딩을 편집하고, 문제가 있는 단계의 고급 옵션을 열고, 테스트 페이지로 이동한 다음 {{< ui >}}Test{{< /ui >}}를 클릭하세요. 이렇게 하면 위치가 지정된 요소가 강조 표시되거나 오류가 표시됩니다. 단일 고유 요소를 타겟팅하도록 사용자 로케이터를 조정하세요.

{{< img src="synthetics/fix_user_locator.mp4" alt="사용자 로케이터 오류 수정" video="true" width="100%" >}}

#### CSS 포인터 속성 제한 {#css-pointer-property-limitations}

자동화된 브라우저는 CSS `pointer` 미디어 기능을 에뮬레이트할 수 없습니다. 모든 브라우저 테스트는 장치 유형(노트북, 태블릿 또는 모바일)에 관계없이 `pointer: none`을 사용합니다.

### 리소스 지속 시간 {#resource-duration}

#### 리소스 지속 시간이 단계 지속 시간을 초과함 {#resource-duration-exceeds-step-duration}

로드 시간이 긴 리소스는 여러 테스트 단계에 걸쳐 지속될 수 있습니다. Datadog은 특정 단계 중에 시작된 모든 리소스를 반환하지만, 다음 단계로 진행하기 전에 중요한 네트워크 호출이 완료될 때까지 약 20초의 시간을 허용합니다.

Synthetics Worker는 계층적 시간 초과를 사용하여 속도와 안정성의 균형을 맞춥니다. 따라서 [단계 지속 시간][14]은 웹 애플리케이션 성능을 측정하는 데 사용해서는 안 됩니다. 이는 안정적인 테스트 실행에 필요한 시간을 반영합니다.

## API 및 브라우저 테스트 {#api-and-browser-tests}

### 인증되지 않음 오류 {#unauthorized-errors}

Synthetic Monitoring 테스트의 401 오류는 일반적으로 인증 실패를 나타냅니다. 엔드포인트에 일반적으로 사용하는 것과 동일한 인증 방법(Datadog 외부)을 사용하고 Synthetic 테스트 구성에서 이 방법을 복제합니다.

* 엔드포인트에서 **헤더 기반 인증**을 사용하나요?
  * **기본 인증**: [HTTP][7] 또는 [브라우저 테스트][8]의 {{< ui >}}Advanced options{{< /ui >}}에 관련 자격 증명을 지정합니다.
  * **토큰 기반 인증**: 첫 번째 [HTTP 테스트][7]를 사용하여 토큰을 추출하고, 해당 테스트의 응답을 구문 분석하여 [전역 변수][9]를 만든 다음, 인증 토큰이 필요한 두 번째 [HTTP][7] 또는 [브라우저 테스트][10]에 해당 변수를 다시 주입합니다.
  * **세션 기반 인증**: [HTTP][7] 또는 [브라우저 테스트][8]의 {{< ui >}}Advanced options{{< /ui >}}에 필요한 헤더나 쿠키를 추가합니다.
  
* 엔드포인트에서 **쿼리 파라미터 인증**(예: URL 파라미터에 API 키 추가)을 사용하나요?

* 엔드포인트에서 **IP 기반 인증**을 사용하나요? 그렇다면 방화벽이나 보안 설정에서 [Synthetic Monitoring IP 범위][11]를 허용합니다.

### 접근 금지 오류 {#forbidden-errors}

Synthetic Monitoring 테스트에서 발생하는 `403 Forbidden` 오류는 일반적으로 웹 서버나 방화벽이 Synthetic 트래픽을 차단하고 있음을 의미합니다. [Synthetic Monitoring IP 범위][11]를 허용하고, `user-agent` 헤더로 Synthetic 요청을 식별합니다. API 테스트의 경우 `Datadog/Synthetics`, 브라우저 테스트의 경우 `DatadogSynthetics`로 끝나는 값을 사용하세요. Synthetic 테스트는 더 이상 `Sec-Datadog` 헤더를 전송하지 않으므로 해당 헤더에 의존하는 허용 목록을 업데이트하세요. 다른 식별자의 경우 [Synthetic 봇 식별][18]을 참조하세요.

### 알림 누락 {#missing-notifications}

Synthetic 테스트는 기본적으로 [알림을 다시 보내지][12] 않습니다. (테스트가 경보 상태로 전환되거나 복구되는 등) 상태 전환이 발생한 후에 알림 핸들(이메일 주소 또는 Slack 핸들)을 추가하면 해당 전환에 대한 알림이 전송되지 않습니다. 알림이 이후에 발생하는 전환에 대해서만 전송됩니다.

## 모바일 테스트 {#mobile-tests}

### 장치 녹화를 시작할 수 없음 {#unable-to-launch-a-device-recording}

시작 시 보안 검사(USB 디버깅 확인 등)가 적용된 애플리케이션은 기록을 차단할 수 있습니다. 최적의 테스트 기록을 위해 이러한 보안 검사가 적용되지 않은 버전의 애플리케이션을 업로드하세요. 

### 기록 및 실행 중 앱 기능 문제 {#app-functionality-issues-during-recording-and-execution}

iOS 앱 기능은 앱 재서명 프로세스로 인해 녹화 또는 실행 중에 제대로 작동하지 않을 수 있습니다. 장치 신뢰에 필요한 이 프로세스는 필수 iOS 권한(연락처, 카메라, 키체인, 사진, 건강 키트, 홈 키트 등)을 제거할 수 있습니다.

**해결 방법**: iOS 앱을 배포할 때 Ad Hoc 또는 Development 프로비저닝 프로필을 사용하여 권한 관련 문제를 최소화하고 호환성을 개선하세요.

## Network Path 테스트 {#network-path-tests}

### Locations & Agents에서 Datadog Agent가 옵션으로 표시되지 않음 {#datadog-agent-not-listed-as-an-option-in-locations-agents}

테스트 생성 중에 Datadog Agent가 선택 가능한 옵션으로 표시되지 않는다면 모든 필수 구성 요소를 충족하고 설정 단계를 완료했는지 확인하세요. 자세한 정보는 [Agent 구성][16]을 참조하세요.

### Datadog Agent에서 예약된 테스트가 예정된 일정대로 실행되지 않음 {#scheduled-tests-from-the-datadog-agent-is-not-running-at-the-expected-schedule}

대규모 또는 고용량 환경에서는 Datadog Agent에 동시 실행을 처리할 충분한 Worker가 없는 경우 예약된 테스트가 예상된 간격으로 실행되지 않을 수 있습니다. 성능을 최적화하고 일관된 일정을 유지하려면 [Worker 수를 늘려][17] Agent에 할당된 총 테스트 수와 같거나 그 이상이 되도록 하세요.

### Datadog Agent에서 실행된 테스트 결과 누락 {#missing-test-results-executed-from-the-datadog-agent}

Datadog UI에 테스트 결과가 표시되지 않으면 Datadog Agent가 테스트 결과를 처리하는 Synthetics 수집기(https://http-synthetics.datadoghq.com)로 테스트 결과를 보내지 않는 것입니다. Datadog Agent에서 이 수집으로 아웃바운드 네트워크 트래픽이 허용되는지 확인하세요.

Datadog Agent가 프록시 뒤에서 실행 중인 경우, Synthetics 포워더가 프록시를 통해 트래픽을 보내도록 구성되었는지 확인하세요. 예를 들면 다음과 같습니다.

```
synthetics: 
  collector: 
    enabled: true
synthetics.forwarder.dd_url: http://my-proxy.com:<proxy-port>
```
또한 프록시 자체가 Synthetics 수집기로의 아웃바운드 네트워크 트래픽을 허용하도록 구성되었는지 확인하세요.

## 프라이빗 위치 {#private-locations}

{{< tabs >}}
{{% tab "공통" %}}

### 403 오류로 인해 프라이빗 위치가 테스트를 가져올 수 없음 {#private-location-unable-to-fetch-tests-due-to-403-error}

프라이빗 위치가 Datadog에서 테스트를 가져오려고 할 때 이 오류가 표시됩니다.

```
Queue error - onFetchMessagesLongPolling - Got 403 in request - {"errors":["Expired/not yet valid signature"]}
Error: Got 403 in request - {"errors":["Expired/not yet valid signature"]}
    at Function.QueueError.fromHTTPError (dist/build/index.js:259354:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:258914:48)
```

**원인**: 로그를 보면 프라이빗 위치가 테스트를 가져오기 위해 Synthetics 수집기에 성공적으로 도달했지만, 인증 문제로 인해 Datadog에서 403 응답과 함께 요청이 실패했음을 알 수 있습니다. 구체적으로, 요청 서명이 만료되었거나 아직 유효하지 않은 것으로 간주되었습니다. 프라이빗 위치와 Datadog 간의 통신은 Datadog Signature v1([AWS Signature v4][105]와 동일한 서명 프로세스 기반)을 사용하여 보안이 유지되며, 각 요청에 타임스탬프가 포함되어 인증과 무결성을 둘 다 보장합니다. 프라이빗 위치를 호스팅하는 서버의 시스템 시계가 동기화되지 않으면 타임스탬프가 허용된 범위를 벗어날 수 있으며 서명 검증에 실패합니다.

**해결 방법**: 프라이빗 위치를 호스팅하는 서버의 시간 동기화가 정확한지 확인하세요. NTP(Network Time Protocol) 서비스를 사용하는 경우, 해당 서비스가 올바르게 구성되어 정상적으로 작동하는지 확인하고 시스템 시계와 시간 소스 간의 동기화를 방해할 수 있는 잘못된 설정을 수정하세요.

### 브라우저 테스트에 `Page crashed` 오류가 표시됨 {#browser-tests-show-page-crashed-errors}

페이지 충돌은 일반적으로 프라이빗 위치 Worker의 리소스 고갈을 나타냅니다. 프라이빗 위치 Worker에 [충분한 메모리 리소스][101]가 있는지 확인하세요.

### 테스트 실행이 예상보다 느림 {#test-execution-is-slower-than-expected}

느린 테스트 실행은 일반적으로 프라이빗 위치 Worker의 리소스 고갈을 나타냅니다. 프라이빗 위치 Worker에 [충분한 CPU 리소스][103]가 있는지 확인하세요.

### 브라우저 테스트 실행 시간이 너무 오래 걸림 {#my-browser-tests-are-taking-too-long-to-run}

프라이빗 위치 배포에서 [메모리 부족 문제][102]가 발생하지 않는지 확인하세요. 이미 [규모 측정 가이드라인][101]에 따라 Worker 인스턴스의 규모를 조정해 본 경우 [Datadog 지원팀][104]에 문의하세요.

### 프라이빗 위치에서 실행되는 브라우저 테스트 요구 사항 {#requirements-for-browser-tests-running-on-private-location}

브라우저 테스트에는 브라우저 프로세스를 생성(테스트 실행 시작 시)하고 종료(테스트 실행 종료 시)하기 위해 높은 권한이 필요합니다. 높은 권한을 제한하는 보안 컨텍스트를 적용하여 프라이빗 위치가 구성된 경우 브라우저 테스트가 실행될 때 프라이빗 위치에서 오류 로그가 생성됩니다. 보고되는 로그는 테스트 실행을 위해 선택된 브라우저에 따라 다릅니다. Chrome/Edge에서 실행된 테스트는 다음 오류를 보고합니다.

```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

**Firefox 오류:**

```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### 프라이빗 위치에서 실행되는 ICMP 테스트 요구 사항 {#requirements-for-icmp-tests-running-on-private-location}

ICMP 테스트는 `ping` 명령을 사용하여 네트워크 경로와 호스트 연결성을 평가합니다. `ping` 명령은 ICMP 패킷을 보내기 위해 원시 소켓을 열며 `NET_RAW` 기능이 필요합니다. 컨테이너의 보안 컨텍스트가 이 기능을 제거하면 프라이빗 위치에서 ICMP 테스트가 제대로 작동하지 않습니다.

또한 원시 소켓을 생성하려면 `ping`에 높은 권한이 필요합니다. 높은 권한을 제한하는 보안 컨텍스트를 적용하여 프라이빗 위치가 구성된 경우 프라이빗 위치는 ICMP 테스트를 실행할 수 없습니다.

### `TIMEOUT` 프라이빗 위치의 API 테스트 오류 {#timeout-errors-in-api-tests-from-private-locations}

`TIMEOUT` 오류는 일반적으로 프라이빗 위치가 테스트 엔드포인트에 도달할 수 없음을 나타냅니다. 프라이빗 위치가 대상 엔드포인트와 동일한 네트워크에 설치되어 있는지 확인하세요. 다른 엔드포인트를 테스트하여 문제가 특정 엔드포인트에 국한된 것인지 아니면 네트워크 전체의 문제인지 확인하세요.

{{< img src="synthetics/timeout.png" alt="프라이빗 위치의 API 테스트 시간 초과" style="width:70%;" >}}

### 프라이빗 위치의 Chrome 149 문제 {#chrome-149-issue-on-private-locations}

Chrome 버전 149에서는 요청 헤더에 대한 검증이 더 엄격해졌으며, 이로 인해 하위 리소스 요청에 실패하고 `net::ERR_INVALID_ARGUMENT` 오류가 발생할 수 있습니다. 이전 Chrome 버전은 더 허용적이었습니다.

**해결 방법**: 이 문제를 해결하려면 프라이빗 위치를 [버전 1.69.1 이상][106]으로 업그레이드하세요.

[101]: /ko/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /ko/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /ko/help/
[105]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[106]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "Docker" %}}

### 프라이빗 위치 컨테이너의 IPv4 포워딩 문제 해결 {#resolving-ipv4-forwarding-issues-for-private-location-containers}

테스트 구성을 가져오고 테스트 결과를 푸시하려면 프라이빗 위치에서 [Datadog의 Synthetic Monitoring 수집 엔드포인트][103]에 액세스할 수 있어야 합니다. Linux 서버에서 IPv4 포워딩이 비활성화된 경우 프라이빗 위치에서 공용 인터넷에 액세스할 수 없게 되어 수집 엔드포인트에 연결하지 못할 수 있습니다. Docker는 일반적으로 컨테이너가 시작될 때 IP 포워딩을 활성화하려고 시도하지만, 비활성화된 상태로 유지되면 컨테이너가 수집 엔드포인트와 같은 외부 서비스에 도달할 수 없습니다. 

이 경우 프라이빗 위치는 다음을 보고합니다.

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
및

```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**해결 방법**: 호스트에서 `net.ipv4.ip_forward` 활성화 여부를 확인하세요. 

### 프라이빗 위치 컨테이너에 대한 읽기 전용 루트 파일 시스템 요구 사항 {#read-only-root-file-system-requirements-for-private-location-containers}

프라이빗 위치 컨테이너가 제대로 작동하려면 특정 폴더 및 파일에 대한 읽기/쓰기 권한이 필요합니다. 읽기 전용 루트 파일 시스템에서는 중요한 작업에 쓰기 권한이 필요하기 때문에 컨테이너가 시작되지 않습니다.

시작 중에 컨테이너는 보안을 위해 빌드 프로세스 중에 메타데이터가 제거된 바이너리에 Linux 기능을 설정합니다. 이는 기본적으로 `root` 사용자로 실행을 제한합니다. 프라이빗 위치는 `dog` 사용자로 실행되므로 컨테이너가 올바른 실행을 위해 권한을 다시 적용해야 합니다. 읽기 전용 파일 시스템은 이러한 권한 업데이트를 방지하여 시작 실패를 유발합니다.

### `OOM` 오류로 인해 종료된 프라이빗 위치 컨테이너 {#private-location-containers-killed-by-oom-errors}

`Out Of Memory` 오류로 인해 종료된 프라이빗 위치 컨테이너는 Worker의 리소스가 부족함을 나타냅니다. 프라이빗 위치 컨테이너에 [충분한 메모리 리소스][101]가 있는지 확인하세요.

### 프라이빗 위치 실행 시 `Invalid mount config` 오류 발생 {#invalid-mount-config-error-when-running-private-locations}

이 오류는 Windows 기반 컨테이너에서 단일 파일을 마운트하려고 할 때 발생하며, 이는 지원되지 않습니다. **해결 방법**: 바인드 마운트 소스가 로컬 디렉터리인지 확인하세요. 자세한 내용은 [Docker 볼륨 마운트][102] 설명서를 참조하세요.

[101]: /ko/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/ko/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Synthetics Private Location Worker 서비스 다시 시작 {#restarting-synthetics-private-location-worker-service}

설치 시 지정된 구성으로 프라이빗 위치가 설치되었는지 확인하세요. GUI 또는 PowerShell 방법을 사용하여 서비스를 다시 시작하세요.

#### GUI 방법 {#gui-method}

1. {{< ui >}}Start{{< /ui >}} 메뉴에서 {{< ui >}}Services{{< /ui >}}를 검색합니다.
1. {{< ui >}}Services{{< /ui >}}를 엽니다(모든 사용자 계정에서 작동함).
1. {{< ui >}}Services (Local){{< /ui >}}에서 `Datadog Synthetics Private Location`을 찾습니다.
1. 서비스를 마우스 오른쪽 버튼으로 클릭하고 {{< ui >}}Restart{{< /ui >}}를 선택합니다.

Worker는 {{< ui >}}Local Service{{< /ui >}} 계정으로 실행됩니다. `synthetics-pl-worker` 프로세스가 작업 관리자의 {{< ui >}}Details{{< /ui >}} 탭에 표시되는지 확인하세요.

#### PowerShell 방법 {#powershell-method}

1. 스크립트 실행 권한이 있는 {{< ui >}}Windows PowerShell{{< /ui >}}을 엽니다.
1. 다음을 실행합니다. `Restart-Service -Name "Datadog Synthetics Private Location"`

### Synthetics Private Location Worker 가동 시간 유지 {#maintaining-synthetics-private-location-worker-uptime}

**필수 구성 요소**: 예약 작업을 생성할 권한이 있는 계정으로 컴퓨터에 로그인합니다.

**충돌 복구**: Worker가 실행을 멈추면 Worker를 다시 시작하는 PowerShell 스크립트를 실행하도록 Windows 예약 작업을 생성하세요. 이렇게 하면 충돌 후 자동 복구가 보장됩니다.

**자동 시작**: 설치 중에 구성 파일을 제공한 경우 `Datadog Synthetics Private Location` Windows 서비스가 자동으로 시작됩니다. {{< ui >}}Services{{< /ui >}} 도구에서 서비스가 실행 중인지 확인하세요. 이 서비스는 자동 다시 시작을 처리합니다.

### 자체 서명된 인증서 오류{#self-signed-certificate-errors}

Windows 프라이빗 위치는 시작 직후 이 오류를 표시할 수 있습니다.

```
Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain
    at Function.QueueError.fromHTTPError (dist/build/index.js:272629:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:272186:48)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at Worker.fetchMessagesLongPolling (dist/build/index.js:26244:24)
    at Worker.doOneLoop (dist/build/index.js:25810:45)
```

**증상**:
- 로그에 오류 메시지가 계속 반복해서 나타납니다.
- Windows 호스트에서 브라우징할 때 인증서 체인이 수정된 것으로 나타납니다(예: Datadog 사이트에 신뢰할 수 있는 CA 대신 자체 서명된 중간 인증서가 표시됨).

**원인**: 이 오류는 네트워크 트래픽에서 **DPI(심층 패킷 검사)** 또는 TLS 검사가 수행될 때 발생합니다. DPI는 SSL/TLS 트래픽을 가로채고, 복호화하고, 다시 암호화합니다. 이 프로세스 중 프라이빗 위치는 자체 서명된 인증서가 포함된 인증서 체인을 수신합니다.  

**해결 방법**:

- 사용자 지정 자체 서명 [루트 인증서][101]를 프라이빗 위치에 업로드합니다.
- Windows 프라이빗 위치 로그에서 더 이상 오류가 보고되지 않는지 확인합니다.

```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

TLS 검사를 우회하지 않으면 Windows 프라이빗 위치는 테스트 메시지를 검색할 수 없으며 오류 상태로 유지됩니다.

[101]: /ko/synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### sudo 또는 dog 사용자의 암호 프롬프트{#password-prompts-for-sudo-or-dog-user}

프라이빗 위치 사용자(`dog`)가 올바르게 작동하려면 `sudo` 액세스 권한이 필요합니다. 이 사용자는 일반적으로 컨테이너 시작 중에 권한을 받습니다. 어떠한 정책도 `dog` 사용자의 `sudo` 액세스를 제한하지 않으며 컨테이너가 `dog` 사용자(UID 501)로 실행되는 것을 방해하지 않는지 확인하세요.

또한 프라이빗 위치 버전 `>v1.27`은 `clone3` 시스템 호출에 따라 달라집니다. 이전 컨테이너 런타임 환경(Docker 버전 <20.10.10)은 기본 `seccomp` 정책에서 `clone3`을 지원하지 않을 수 있습니다. 

**해결 방법**: 런타임 버전을 업데이트하거나, 정책에 `clone3`을 수동으로 추가하거나, `unconfined` seccomp 정책을 사용하여 런타임의 `seccomp` 정책에 `clone3`이 포함되도록 하세요. 자세한 내용은 [Docker의 `seccomp` 설명서][13]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/synthetics/metrics/#api-tests
[3]: /ko/synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /ko/synthetics/api_tests/?tab=httptest#make-a-request
[8]: /ko/synthetics/browser_tests/#test-details
[9]: /ko/synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /ko/synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /ko/synthetics/api_tests/http_tests/?tab=requestoptions#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/
[14]: /ko/synthetics/guide/step-duration
[16]: /ko/synthetics/network_path_tests/#agent-configuration
[17]: /ko/network_monitoring/network_path/setup/?tab=linux#increase-the-number-of-workers
[18]: /ko/synthetics/guide/identify_synthetics_bots/