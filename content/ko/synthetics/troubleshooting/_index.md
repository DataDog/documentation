---
description: 일반적인 신서틱 모니터링 문제 트러블슈팅
further_reading:
- link: /synthetics/
  tag: 설명서
  text: 신서틱 테스트 관리
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
- link: /synthetics/private_locations/
  tag: 설명서
  text: 프라이빗 위치 생성
title: 신서틱(Synthetic) 모니터링 트러블슈팅
---

## 개요

Datadog 신서틱 모니터링을 설정하거나 구성하는 데 문제가 있는 경우 이 페이지를 사용해 트러블슈팅을 시작하세요. 문제가 지속되면 [Datadog 지원에 문의하세요][1].

## API 테스트

### 네트워크 타이밍이 다양함

API 테스트 [타이밍 메트릭][2]에서 급작스러운 증가나 전반적인 증가가 관찰되면 보통 요청에서의 병목 현상이나 지연을 의미합니다. 자세한 정보는 [API 테스트 타이밍 및 변수]에서 이 가이드를 참조하세요.

## 브라우저 테스트

### 레코딩

#### 웹사이트가 아이프레임에서 로딩되지 않음

[Datadog 확장][4]을 다운로드한 후 브라우저 테스트 레코더의 오른편에 있는 아이프레임에서 웹사이트를 확인할 수 없거나 아이프레임에  `Your website does not support being loaded through an iframe.`이 표시됩니다. 이는 애플리케이션에 아이프레임에서 열리는 것을 저지하는 설정이 있음을 의미할 수 있습니다.

또는 아이프레임 레코더에서 레코딩 시 로그인할 수 없는 경우 애플리케이션에 차단된 요청이 있음을 의미할 수 있습니다.

**팝업에서 열기**를 클릭하여 팝업 창에서 웹사이트를 열고 사용자 여정을 레코딩해 보세요.

#### 일부 애플리케이션이 아이프레임에서 로딩되거나 로딩되지 않을 수 있습니다.

애플리케이션과 환경에 각기 다른 제한이 있어 일부가 아이프레임에서 시각화되거나 시각화되지 않을 수 있음을 의미합니다.

#### "아이프레임 내에서 지원되지 않는 HTTP 요청을 감지하였습니다. 팝업에서 레코딩해야 할 수 있습니다" 배너가 아이프레임 상단에 표시됩니다.

보통 `http` 페이지에서 단계를 레코딩하려는 것일 수 있습니다. `https`만 레코더 아이프레임에서 지원됩니다. 페이지를 팝업으로 열거나 URL을 `https`로 변경하여 페이지에서 레코딩을 시작해야 합니다.

{{< img src="synthetics/http_iframe.png" alt="HTTP in iframe" style="width:100%;" >}}

#### 내 웹 사이트가 아이프레임에서 로딩되지 않으면 웹사이트를 팝업으로 열었을 때에도 단계를 레코딩할 수 없음

[Datadog 확장][4]을 다운로드한 후 브라우저 테스트 레코더의 오른 편에서 아이프레임 웹사이트를 확인할 수 없습니다. 또한, 아이프레임 또는 팝업에서 웹사이트를 여는지 여부에 관계없이 어떤 단계로 레코딩할 수 없습니다.

{{< img src="synthetics/recording_iframe.mp4" alt="브라우저 테스트 단계 레코딩 문제" video="true" width="100%" >}}

이 경우 `On specific sites` 섹션에서 웹사이트를 지정하거나 `On all sites`를 토글링하여  [Datadog 확장][5]에 의도된 웹사이트의 데이터를 읽고 변경할 수 있는 권한이 있는지 확인합니다. 

{{< img src="synthetics/extension.mp4" alt="확장이 모든 사이트에서 데이터를 읽을 수 있도록 허용" video="true" width="100%" >}}

#### 내 애플리케이션에서 단계를 레코딩할 수 없음

Chrome 브라우저의 일부 정책 때문에 확장이 예상대로 레코딩을 수행하지 못할 수 있습니다.

자세히 알아보려면 `chrome://policy`로 이동하여 [`ExtensionSettings`][6] 등 확장 관련 설정을 찾아보세요. 

#### 레코더에서 로그인 페이지를 확인할 수 없음

기본적으로 아이프레임/레코더 팝업은 자체적인 브라우저를 사용합니다. 즉, 애플리케이션에 로그인한 경우 아이프레임/팝업이 바로 로그인 이후 페이지를 표시하여 먼저 로그아웃하지 않지 않으면 로그인 단계를 레코딩하지 못하도록 합니다.

애플리케이션에서 로그아웃하지 않고 단계를 레코딩하려면, 레코더의 **시크릿 모드**만 활용하면 됩니다.

{{< img src="synthetics/incognito_mode.mp4" alt="시크릿 모드 브라우저 테스트 사용" video="true" width="100%" >}}

**시크릿 모드에서 팝업 창 열기**를 통해 테스트 설정의 시작 URL 설정에서 테스트 레코딩을 시작할 수 있습니다. 자체적인 브라우저의 기본 세션과 사용자 데이터에서 세션은 완전히 분리됩니다.

시크릿 팝업 창은 쿠키와 로컬 데이터를 포함해 이전 브라우저 기록을 무시합니다. 사용자는 계정에서 자동으로 로그아웃되어 처음으로 웹사이트에 방문하는 것처럼 로그인 단계 레코딩을 시작할 수 있습니다.

### 테스트 결과

#### 내 소형 모바일 또는 태블릿 브라우저 테스트가 계속 실패함

웹사이트가 **반응형** 기법을 사용하는 경우 DOM이 테스트가 실행되는 장치에 따라 크게 달라질 수 있습니다. `Laptop Large`에서 실행하고 `Tablet` 또는 `Mobile Small`에서 실행 시 각기 다른 아키텍처가 있는 경우 특정 DOM을 사용할 수 있습니다. 

즉, `Laptop Large` 뷰포트에서 레코딩한 단계가 `Mobile Small`에서 액세스한 동일한 웹사이트에 해당되지 않을 경우 `Mobile Small` 테스트 결과가 실패할 수 있습니다.

{{< img src="synthetics/device_failures.png" alt="모바일 태블릿 장치 실패" style="width:100%;" >}}

이러한 유형의 사례의 경우 Datadog는 **별도의 `Mobile Small` 또는 `Tablet` 테스트**를 생성할 것을 권장합니다. 이때 레코딩된 단계는 테스트가 런타임에서 설정되는 뷰포트와 일치해야 합니다.

`Mobile Small` 또는 `Tablet` 뷰포트에서 단계를 레코딩하려면 **레코딩 시작** 버튼을 누르기 전 레코더 드롭다운에서 `Mobile Small` 또는 `Tablet`을 선택합니다.

{{< img src="synthetics/record_device.png" alt="모바일 태블릿 단계 레코딩" style="width:100%;" >}}

또한, Datadog 테스트 브라우저는 **헤드리스**에서 실행됩니다. 즉, 브라우저 테스트는 일부 기능을 지원하지 않습니다. 예를 들어 브라우저 테스트는 `touch`를 지원하지 않으므로 `touch`를 사용해 웹사이트가 모바일 디자인에 맞게 표시되는지 감지할 수 없습니다.

#### `None or multiple elements detected`단계 경고가 브라우저 테스트가 표시됩니다.

브라우저 테스트 단계 중 하나가 `None or multiple elements detected` 단계 경고를 표시합니다.

{{< img src="synthetics/step_warning.png" alt="사용자 위치 표시기 단계 경고" style="width:100%;" >}}

해당 단계에 대한 사용자 위치 표시기가 여러 요소를 타겟팅하거나 아무 것도 타겟팅하지 않아 브라우저 테스트가 상호작용해야 할 요소를 파악하지 못하도록 할 수 있음을 의미합니다.

이를 수정하려면 레코딩을 편집해야 합니다. 문제가 있는 단계의 고급 설정을 열고 단계가 테스팅되는 페이지로 이동한 다음 `Test`를 클릭합니다. 그러면 발견된 요소가 강조 표시되거나 오류 메시지를 표시합니다. 그러면 해당 요소로 이동하여 사용자 위치 표시기를 수정하여 페이지의 단일 요소와 일치하도록 할 수 있습니다.

{{< img src="synthetics/fix_user_locator.mp4" alt="사용자 위치 표시기 오류 수정" video="true" width="100%" >}}

#### CSS 포인터 속성에 문제가 있음

자동화된 브라우저는 CSS `pointer` 미디어 기능 에뮬레이션을 지원하지 않습니다. 브라우저 테스트는 모든 테스트와 장치(노트북, 태블릿 또는 모바일)에 대해 `pointer: none`을 포함합니다.

### 리소스 기간

#### 리소스의 지속 시간이 실제 단계 지속 시간보다 깁니다.

로드 시간이 긴 리소스는 여러 단계에 걸쳐 있을 수 있습니다. 테스트 결과 단계 내에서 Datadog은 해당 특정 단계에서 시작된 모든 리소스를 반환합니다. 그러나 Datadog에서는 중요한 네트워크 호출이 완료되는 데 약 20초가 소요됩니다. 이 기간이 지나면 합성 작업자는 다음 단계로 진행됩니다. 작업자는 시간 초과 계층 구조를 사용하여 속도와 안정성의 균형을 유지합니다. 이 때문에 Datadog은 웹 애플리케이션의 속도나 느림을 측정하기 위해 단계 지속 시간을 사용하는 것을 권장하지 않습니다. 단계 기간은 작업자가 신뢰할 수 있는 결과를 제공하는 데 필요한 균형 잡힌 시간을 반영합니다.

## API 및 브라우저 테스트

### 무단 오류

신서틱 테스트 중 하나가 401 오류를 표시하면, 엔드포인트에서 인증할 수 없음을 의미할 가능성이 높습니다. 해당 엔드포인트(Datadog 외)에서 사용한 방법을 사용하고 신서틱 테스트 설정 시 복제합니다.

* 엔드포인트에서 **헤더 기반 인증**을 사용하나요?
  * **기본 인증**: [HTTP][7] 또는 [브라우저 테스트][8]의 **고급 옵션**에서 관련 자격 증명을 지정하세요.
  * **토큰 기반 인증**: 최초 [HTTP 테스트][7]를 사용해 토큰을 추출하고 최초 테스트의 응답을 파싱하여 [글로벌 변수][9]를 생성하세요. 그런 다음 인증 토큰을 필요로 하는 두 번째 [HTTP][7] 또는 [브라우저 테스트][10]에서 해당 변수를 다시 수집합니다.
  * **세션 기반 인증**: [HTTP][7] 또는 [브라우저 테스트][8] **고급 옵션**에서 필수 헤더 또는 쿠키를 추가합니다.

* 이 엔드포인트가 **인증을 위한 쿼리 파라미터**를 사용하나요?(예를 들어 URL 파라미터에 특정 API 키를 추가해야 하나요?)

* 이 엔드포인트가 **IP 기반 인증**을 사용하나요? 그런 경우 [신서틱 테스트가 실행되는 IP]의 전체 또는 일부를 허용해야 합니다.

### 금지된 오류

신서틱 테스트에서 반환한 `403 Forbidden` 오류를 발견한 경우, 웹 서버 차단 또는 `Sec-Datadog` 헤더를 포함하는 요청 필터링의 결과일 수 있습니다. 이 헤더는 Datadog가 시작하는 각 신서틱 요청에 추가되어 트래픽 소스를 파악하고 특정 테스트 실행을 식별할 수 있도록 Datadog 지원을 보조합니다.

또한, 방화벽에서 [Datadog 신서틱 모니터링 IP 범위][11]를 트래픽 소스로 허용해야 할 수 있습니다.

### 알림 누락

기본적으로 신서틱 테스트는 [다시 알림][12]을 제공하지 않습니다. 즉, 트랜지션이 생성된 후(예: 테스트가 알림으로 이동 또는 이전 알림에서 회수) 이메일 주소나 Slack 핸들 등 알림 핸들을 추가한 경우 해당 트랜지션에 대해 알림이 전송되지 않음을 의미합니다. 알림은 다음 트랜지션에 대해 전송됩니다.

## 프라이빗 위치

{{< tabs >}}
{{% tab "공통" %}}

### 내 브라우저 테스트 결과가 때로 `Page crashed` 오류를 표시함

이를 통해 프라이빗 위치 작업자의 리소스 고갈 문제를 발견할 수 있습니다. 프라이빗 위치 작업자가 [충분한 메모리 리소스][101]로 프로비저닝되었는지 확인하세요.

### 때로 테스트 실행 속도가 저하됨

이를 통해 프라이빗 위치 작업자의 리소스 고갈 문제를 발견할 수 있습니다. 프라이빗 위치 작업자가 [충분한 CPU 리소스][101]로 프로비저닝되었는지 확인하세요.

### 브라우저 테스트 실행에 너무 오랜 시간이 걸림

프라이빗 위치 배포 시 [메모리 부족 문제][102]가 표시되지 않는지 확인하세요. 이미 [디멘져닝 지침][103]에 따라 작업자 인스턴스 확장을 시도한 경우 [Datadog 지원팀][104]에 문의하세요.

### 내 프라이빗 위치에서 실행한 API 테스트에서 `TIMEOUT` 오류가 나타남

프라이빗 위치에서 API 테스트가 실행되도록 설정된 엔드포인트에 도달할 수 없는 것일 수 있습니다. 프라이빗 위치가 테스트하려는 엔드포인트와 동일한 네트워크에 설치되었는지 확인하세요. 또한, 동일한 `TIMEOUT` 오류가 발생하는지 확인하기 위해 각기 다른 엔드포인트에서 테스트를 실행해 볼 수도 있습니다.

{{< img src="synthetics/timeout.png" alt="프라이빗 위치 API 테스트 시간 초과" style="width:70%;" >}}

[101]: /ko/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /ko/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /ko/help/

{{% /tab %}}
{{% tab "도커" %}}

### 내 프라이빗 위치 컨테이너가 때때로 `OOM`로 작동하지 않음 

프라이빗 위치 컨테이너가 종료되면 `Out Of Memory` 일반적으로 개인 위치 작업자의 리소스 고갈 문제가 드러납니다. 프라이빗 위치 컨테이너가 [충분한 메모리 리소스][101]로 프로비저닝되었는지 확인하세요.

### 프라이빗 위치에서 실행 시도 시 `invalid mount config for type "bind": source path must be a directory` 오류가 나타남

이는 지원되지 않는 Windows 기반 컨테이너에 단일 파일을 마운트하려고 할 때 발생합니다. 자세한 내용은 [Docker 마운트 볼륨 설명서][102]를 참조하세요. 바인드 마운트의 소스가 로컬 디렉터리인지 확인하세요.

[101]: /ko/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only

{{% /tab %}}
{{% tab "Windows" %}}

### 재부팅하지 않고 Synthetics Private Location Worker 서비스를 다시 시작합니다.

먼저, 설치 시 지정된 설정으로 프라이빗 위치를 설치했는지 확인하세요. GUI를 사용하거나 Windows PowerShell을 사용하여 서비스를 다시 시작할 수 있습니다.

#### GUI

1. MSI 설치 프로그램을 열고 **Start** 메뉴에서 **Services**를 검색합니다.
1. 사용자 계정에서 **Services**를 시작합니다.
1. *Services (Local)**을 클릭하고 `Datadog Synthetics Private Location`이라는 서비스를 찾습니다.
1. 2단계에서 찾은 서비스를 마우스 오른쪽 버튼으로 클릭하고 **Restart**를 선택합니다.

이제 Synthetics Private Location Worker가 **Local Service** 계정으로 실행됩니다. 이를 확인하려면 Task Manager를 실행하고 **Details** 탭에서 `synthetics-pl-worker` 프로세스를 찾으세요.

#### PowerShell

1. PowerShell 스크립트를 실행할 수 있는 권한이 있는 Windows 계정에서 **Windows PowerShell**을 시작합니다.
1. 다음 명령을 실행합니다: `Restart-Service -Name “Datadog Synthetics Private Location”`.

### Synthetics Private Location Worker를 계속 실행합니다.

먼저, Synthetics Private Location Windows 서비스가 설치된 머신에 로그인했는지, 그리고 머신에서 예약된 작업을 생성할 수 있는 권한이 있는지 확인하세요.

Synthetics Private Location Worker가 충돌하는 경우 Windows에서 PowerShell 스크립트를 실행하는 예약된 작업을 추가하여 실행이 중지되면 애플리케이션을 다시 시작하세요. 이렇게 하면 충돌 후 프라이빗 위치가 다시 시작됩니다.

애플리케이션을 설치할 때 설정 파일을 제공한 경우 `Datadog Synthetics Private Location`이라는 Windows 서비스가 설치 후 자동으로 시작됩니다. 이를 확인하려면 **Services** 도구에서 실행 중인 서비스를 볼 수 있는지 확인하세요. 이 Windows 서비스는 프라이빗 위치를 자동으로 다시 시작합니다.

{{% /tab %}}
{{< /tabs >}}

### Sudo 비밀번호를 요구하거나 Dog 사용자 비밀번호를 요구함

프라이빗 위치 사용자(`dog`)는 다양한 이유로 `sudo`를 요구합니다. 일반적으로 이 사용자는 컨테이너의 프라이빗 위치를 시작하는 과정에서 `sudo` 액세스를 할 수 있는 특정 권한을 보유하고 있습니다. `dog` 사용자의 `sudo` 사용 가능성을 제한하는 정책이 있거나 컨테이너가 `dog` 사용자로 시작하지 못하도록 하는 정책(UID 501)이 있는지 확인하세요.

또한 Private Location 버전 `>v1.27`에서는 Datadog이 `clone3` 시스템 호출 사용에 따라 달라집니다. 일부 이전 버전의 컨테이너 런타임 환경(예: Docker 버전 <20.10.10)에서는 기본 `seccomp` 정책에서 `clone3`이 지원되지 않습니다. 컨테이너 런타임 환경의 `seccomp` 정책에 `clone3`이 포함되어 있는지 확인하세요. 사용 중인 런타임 버전을 업데이트하거나, `seccomp` 정책에 `clone3`을 수동으로 추가하거나, `unconfined` seccomp 정책을 사용하여 이를 수행할 수 있습니다. 자세한 내용은 [Docker `seccomp` 설명서][13]를 참조하세요.

## 참고 자료

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
[12]: /ko/synthetics/api_tests/?tab=httptest#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/