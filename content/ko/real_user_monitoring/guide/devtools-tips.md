---
further_reading:
- link: /real_user_monitoring/browser
  tag: 설명서
  text: RUM 브라우저 모니터링
- link: /logs/log_collection/javascript
  tag: 설명서
  text: 브라우저 로그 수집
title: 브라우저 개발자 도구 사용 시 팁
---

## 개요

이 가이드에서는 Datadog 브라우저 SDK로 계측된 애플리케이션 디버깅을 목적으로 최신 브라우저에 포함된 브라우저 개발자 도구(DevTools) 사용 시 유용한 팁을 제공합니다.

## DevTools 콘솔에서 파일 및 행 번호가 일치하는지 확인하세요.

브라우저 SDK는 콘솔 함수(`console.error`뿐만 아니라`.log`, `.info`, `.warn`)을 계측하여 애플리케이션 동작에 대한 데이터를 수집합니다.
이로 인해 DevTool 콘솔에 아래와 같이 잘못된 행 번호와 파일이 표시될 수 있습니다.
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.png" alt="console.error 문의 잘못된 파일 및 행 번호에 대한 문제를 표시하는 DevTools 콘솔.">}}

위 그림에서는 `console.error` 함수가 계측되었습니다. 이 명령문이 호출된 실제 파일과 행 번호인 `VM505:1`를 표시하는 대신 콘솔에 `datadog-rum.js:1`이 표시됩니다.

### 올바른 파일과 행 번호를 표시하기 위해 브라우저 무시 목록에 스크립트를 추가합니다.

대부분의 브라우저에서는 개발자가 스크립트를 선택하고 무시 목록에 추가할 수 있습니다. 올바른 파일과 행 번호를 표시하려면 브라우저의 무시 목록에 다음 스크립트를 추가할 수 있습니다: `datadog-rum*.js` 및 `datadog-logs*.js`.

다음은 Google Chrome에서 이 기능을 찾을 수 있는 위치의 예입니다.
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.png" alt="Google Chrome의 무시 목록에 스크립트를 추가하는 방법.">}}

콘솔 탭에서 콘솔 문의 출력을 확장합니다. 무시하려는 각 스크립트를 마우스 오른쪽 버튼으로 클릭하고 **add script to ignore list** 옵션을 선택합니다.
**참고**: 무시 목록은 **Developer Tools > Settings > Ignore List**에서 관리할 수 있습니다.

이 방법은 [CDN(동기/비동기) 설치 방법][3]을 사용할 때 잘 작동합니다. NPM 패키지 방법을 사용하는 경우 `sourcemaps`가 활성화되었는지 확인하세요. 그렇지 않으면 SDK 코드가 애플리케이션 코드와 함께 번들로 제공되어 DevTools가 SDK를 무시하지 못하게 될 수 있습니다.

무시 목록 사용의 또 다른 이점은 네트워크 패널에서 확인할 수 있습니다.
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.png" alt="무시 목록에 스크립트를 추가한 후 네트워크 개시자가 올바르게 표시됩니다.">}}

브라우저 SDK를 요청 개시자로 표시하는 대신 애플리케이션에 대한 올바른 파일과 행 번호가 표시됩니다.

## 네트워크 탭에서 노이즈 제거

브라우저 SDK는 애플리케이션의 동작을 기록하기 위해 여러 네트워크 요청을 보냅니다. 이로 인해 네트워크 탭에 상당한 수의 행이 생성될 수 있으며 애플리케이션에서 시작된 요청을 식별하기가 어려워집니다. 대부분의 브라우저에서는 브라우저 SDK에서 들어오는 요청을 필터링할 수 있습니다.

아래는 Google Chrome의 이 기능에 대한 예입니다.
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.png" alt="브라우저 SDK 요청을 필터링하는 네트워크 패널">}}

네트워크 탭에서 `-url:intake-datadoghq.com` 형식의 필터를 추가합니다([데이터 센터의 인테이크][1] 또는 [프록시][2]의 URL과 일치하도록 패턴을 업데이트합니다) ).

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site
[2]: /ko/real_user_monitoring/guide/proxy-rum-data
[3]: /ko/real_user_monitoring/browser/setup/#choose-the-right-installation-method