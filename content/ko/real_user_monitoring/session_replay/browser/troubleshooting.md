---
aliases:
- /ko/real_user_monitoring/session_replay/troubleshooting
description: 세션 재생과 관련된 문제를 해결하는 방법에 대해 알아보세요.
further_reading:
- link: https://github.com/DataDog/browser-sdk
  tag: 소스 코드
  text: browser-sdk 소스 코드
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생에 대해 알아보기
- link: /integrations/content_security_policy_logs
  tag: 설명서
  text: Datadog으로 CSP 위반 감지 및 집계
title: 세션 재생 브라우저 문제 해결
---

## 개요

Datadog 세션 재생에서 예기치 않은 동작이 발생하는 경우, 이 페이지를 사용하여 문제를 해결하세요. 계속 문제가 발생하면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으시기 바랍니다. 각 릴리스에는 개선 사항과 수정 사항이 포함되어 있으므로 정기적으로 최신 버전의 [RUM Browser SDK][2]로 업데이트하세요.

## 세션 재생 레코더

### 일부 HTML 요소가 재생 시 보이지 않음

Session Replay는 다음을 지원하지 않습니다.

- 다음 HTML 요소: `iframe`, `video`, `audio`, `canvas`
  - Session Replay에서 iframe을 렌더링하려면 iframe 코드를 별도로 계측할 수 있습니다. 여러 하위 도메인에 걸쳐 있는 iframe이라면 `trackSessionAcrossSubdomains: true`를 사용하세요. 계측이 올바르게 완료되면 iframe과 상위 창은 동일한 세션 내에서 별도의 페이지로 표시됩니다. iframe 리플레이를 상위 창에 직접 임베드하는 것은 지원되지 않습니다.
- [Web Animations API][7]

세션 재생을 사용하려면 HTTPS 연결을 사용해야 합니다. 보안 연결을 사용하지 않으면 리소스 시간이 초과되어 이미지와 일부 페이지 요소가 표시되지 않습니다.

### 글꼴 또는 이미지가 제대로 렌더링되지 않음

세션 재생은 비디오가 아니라 DOM의 스냅샷을 기반으로 재구성된 실제 iframe입니다. 따라서 재생은 글꼴과 이미지 등 페이지의 다양한 자산에 따라 달라집니다.

다음과 같은 이유로 재생 시 자산을 사용하지 못할 수 있습니다:

- 리소스가 더 이상 존재하지 않습니다. 예를 들어 이전 배포의 일부였던 리소스입니다.
- 리소스에 액세스할 수 없습니다. 예를 들어 인증이 필요하거나 내부 네트워크에서만 리소스에 액세스할 수 있습니다.
- CORS(일반적으로 웹 글꼴)로 인해 브라우저에서 리소스가 차단됩니다.
   - `session-replay-datadoghq.com` 샌드박스 도메인에서 렌더링된 재생과 자산 요청은 브라우저에 의해 크로스 오리진 보안 검사를 받게 됩니다. 주어진 자산이 도메인에 대해 권한이 없는 경우 브라우저는 요청을 차단합니다.
   - 웹사이트에 의존하는 모든 글꼴 또는 이미지 자산에 대해 [`Access-Control-Allow-Origin`][3] 헤더를 통해 `session-replay-datadoghq.com`을 허용하여 재생에서 이러한 리소스에 액세스할 수 있도록 합니다. 자세한 내용은  [크로스 오리진 리소스 공유][4]를 참조하세요.

### CSS 규칙이 제대로 적용되지 않음/마우스 오버가 재생되지 않음

글꼴 및 이미지와 달리 레코더는 [CSSStyleSheet][5] 인터페이스를 활용하여 레코딩 데이터의 일부로 적용된 다양한 CSS 규칙을 번들로 묶으려고 시도합니다. 이것이 가능하지 않은 경우, 레코더는 CSS 파일에 대한 링크를 기록하는 것으로 되돌아갑니다.

적절한 마우스 오버 지원을 위해서는 CSSStyleSheet 인터페이스를 통해 CSS 규칙에 액세스할 수 있어야 합니다.

스타일시트가 웹 페이지와 다른 도메인에서 호스팅되는 경우 CSS 규칙에 대한 액세스는 브라우저에서 크로스 오리진 보안 검사의 대상이 되며, 브라우저는 [crossorigin][6] 속성을 사용하고, CORS를 이용하여 스타일시트를 로드하도록 지시받아야 합니다.

예를 들어 애플리케이션이 `example.com` 도메인에 있고 링크 요소를 통해 `assets.example.com`의 CSS 파일에 의존하는 경우 자격 증명이 필요한 경우를 제외하고 `crossorigin` 속성을 `anonymous`로 설정해야 합니다. .

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css">
```

또한, `assets.example.com`에서 `example.com` 도메인을 승인하세요. 그러면 [`Access-Control-Allow-Origin`][3] 헤더를 설정하여 자산 파일이 리소스를 로드할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API