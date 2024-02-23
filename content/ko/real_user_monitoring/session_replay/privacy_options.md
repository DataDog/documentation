---
aliases: null
description: 세션 재생에서 사용할 수 있는 개인정보 보호 컨트롤과 개인정보 보호 옵션을 설정하는 방법에 대해 설명합니다.
further_reading:
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: 블로그
  text: 세션 재생 기본 개인정보 보호 설정으로 사용자 데이터 난독화
kind: 설명서
title: 세션 재생 브라우저 개인정보 보호 옵션
---

## 개요

세션 재생은 모든 규모의 조직에서 민감한 데이터나 개인 데이터를 노출하지 않도록 개인정보 보호 제어 기능을 제공합니다. 데이터는 Datadog이 관리하는 클라우드 인스턴스에 저장되며 미사용 시 암호화됩니다.

세션 재생의 기본 개인정보 보호 옵션은 최종 사용자의 개인정보를 보호하고 민감한 조직 정보가 수집되지 않도록 합니다.

세션 재생을 활성화하면 민감한 요소가 RUM Browser SDK를 통해 기록되지 않도록 자동으로 마스킹할 수 있습니다. 데이터가 마스킹되면 해당 데이터는 Datadog의 SDK에 의해 원래 형태로 수집되지 않으므로 백엔드로 전송되지 않습니다.

## 설정

<div class="alert alert-warning">SDK v3.6.0 이상에서 <code>defaultPrivacyLevel</code> 및 <code>mask-user-input</code>을 사용할 수 있습니다.</div>

개인정보 보호 설정을 활성화하려면 JavaScript 설정에서 `defaultPrivacyLevel`을 `mask-user-input`, `mask` 또는 `allow`로 설정합니다.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    defaultPrivacyLevel: 'mask-user-input' | 'mask' | 'allow'
});

datadogRum.startSessionReplayRecording();
```

설정을 업데이트한 후, 아래의 개인정보 보호 옵션과 함께 HTML 문서의 요소를 재정의할 수 있습니다.

### 사용자 입력 모드 마스킹

입력, 텍스트 영역, 체크박스 값 등 대부분의 양식 필드를 마스킹하고 다른 모든 텍스트는 그대로 기록합니다. 입력은 별표(`***`) 3개로 대체되고 텍스트 영역은 공백을 보존하는 `x` 문자로 난독화됩니다.




{{< img src="real_user_monitoring/session_replay/mask-user-input-v2.png" alt="사용자 입력 모드 마스킹" style="width:70%;">}}

**참고:** 기본적으로 `mask-user-input`는 세션 재생을 활성화할 때의 개인정보 보호 설정이며, 이는 모든 입력 필드가 자동으로 마스킹됨을 의미합니다.

### 마스크 모드

`defaultPrivacyLevel`를 `mask` 모드로 설정하면 HTML 텍스트, 사용자 입력, 이미지, 링크 및 [`data-*` 속성][1]이 모두 마스킹됩니다. 애플리케이션의 텍스트는 `X`로 대체되어 페이지가 와이어프레임으로 렌더링됩니다.

{{< img src="real_user_monitoring/session_replay/mask-mode-fixed.png" alt="마스크 모드" style="width:70%;">}}

**참고**: 마스킹된 데이터는 Datadog 서버에 저장되지 않습니다.
### 허용 모드

마스킹되지 않은 모든 것을 기록합니다.

{{< img src="real_user_monitoring/session_replay/allow.png" alt="허용 모드" style="width:70%;">}}

## 개인정보 보호 옵션

### HTML 요소 재정의

애플리케이션 전체에 기본값을 설정하고 다음 두 가지 방법 중 하나를 사용하여 개별 HTML 요소의 개인정보 보호 수준에 태그를 지정할 수 있습니다:

1. `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"`와 같은 HTML 속성 또는
2. `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`와 같은 HTML 클래스 이름.

아래 예는 HTML의 특정 요소를 덮어쓰고 난독화를 사용자 정의하는 방법을 보여줍니다:

```
<div class="line-item" data-dd-privacy="allow">
    <div class="label">Order Value</div>
    <div class="value">
        $<span data-dd-privacy="mask">50.00</span>
    </div>
</div>
```

카트의 달러 금액은 별표로 대체됩니다.

{{< img src="real_user_monitoring/session_replay/example-mask.png" alt="마스크 모드의 금액 난독화 예시" style="width:70%;">}}

## 개인정보 보호 제한 사항

사용자의 개인정보 보호 설정에 관계없이 최종 사용자의 개인정보를 보호하기 위해 다음 HTML 요소는 **항상 마스킹 됩니다**.
- `password`, `email`, `tel` 유형의 입력 요소
- 신용카드 번호, 유효기간, 보안코드 등의 `autocomplete` 속성을 가진 요소

## 고급 개인정보 보호 옵션

### 요소를 완전히 숨김


`hidden`은 텍스트를 가리는 대신 특정 요소를 완전히 숨기는 고급 개인정보 보호 설정입니다.

민감한 필드에 표시되는 요소의 수가 염려된다면 특정 요소에 대해 `hidden`을 활성화하세요. 이러한 HTML 요소는 기록 시 회색 블록으로 대체됩니다.

이 예제 재생 세션에서는 Datadog 탐색의 사용자 이름이 난독화되어 있습니다.

{{< img src="real_user_monitoring/session_replay/hidden.png" alt="사용자 아이디를 난독화하는 숨김 모드의 예시" style="width:60%;">}}



### 액션 이름 재정의

기본 액션 이름을 가리고 개별 액션의 이름 지정 규칙을 업데이트하려면 개별 액션 이름에 대한 재정의를 설정하세요.

보다 일반적인 이름으로 특정 HTML 요소의 이름을 재정의하여 기본 액션 이름을 바꿀 수 있습니다. 기본적으로 Datadog은 커스텀 재정의 이름을 표시합니다.

예를 들어 다음 이름을 `<div data-dd-action-name="Address" > → Action: "Click on Address"`로 재정의합니다.

기본 액션 이름을 재정의하는 추가 사용 사례로는 RUM 탐색기에서 민감한 데이터를 마스킹하고 커스텀 이름 지정 규칙을 사용하여 분석 및 검색을 간소화하는 것이 있습니다.

<div class="alert alert-info">

Datadog은 RUM & Session Replay에 더 많은 개인정보 보호 기능을 추가하기 위해 노력하고 있습니다. 더 궁금하신 점이 있다면 <a href="/help">Datadog 지원팀에 문의하세요.</a>

</div>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes