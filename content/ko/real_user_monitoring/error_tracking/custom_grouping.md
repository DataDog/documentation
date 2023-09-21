---
description: 브라우저 RUM 오류를 이슈로 그룹화하는 방법을 커스터마이즈하세요.
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
  tag: GitHub
  text: datadog-ci Source code
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: 설명서
  text: 자바스크립트(Javascript) 소스 맵 업로드
- link: /real_user_monitoring/error_tracking/
  tag: 설명서
  text: 웹 및 모바일 애플리케이션을 위한 오류 추적 알아보기
kind: 설명서
title: 커스텀 그룹화
---

## 개요

[오류 추적][4]은 기본 전략을 사용해 지능적으로 유사한 오류를 이슈로 그룹화합니다. _커스텀 지문_을 사용해 결정 그룹화를 완벽히 통제하고 실제 사용자 모니터링(RUM) 오류 행동 그룹화를 커스터마이즈할 수 있습니다.

오류 추적이 RUM 오류를 이슈로 그룹화하는 데 사용할 수 있는 `error.fingerprint` 속성을 제공합니다. `error.fingerprint` 속성 값에는 특정한 형식이나 요건이 없습니다. 내용은 반드시 문자열이어야 합니다.

`error.fingerprint`이 제공된 경우 그룹화 행동은 이러한 규칙을 따릅니다.

* 커스텀 그룹화는 기본 전략보다 우선됩니다.
* 커스텀 그룹화는 RUM 오류 하위 집합에만 적용될 수 있으며 기본 전략과 공동으로 존재할 수 있습니다.
* `error.fingerprint` 내용은 수정 없이 그대로 사용됩니다.
* 동일한 서비스의 RUM 오류가 동일한 `error.fingerprint` 속성을 가지고 있는 경우 동일한 이슈로 그룹화됩니다.
* 각기 다른 `service` 속성의 RUM 오류는 서로 다른 이슈로 그룹화됩니다.

## 브라우저 오류 설정

커스텀 그룹화를 사용하려면 Datadog Browser SDK [v4.42.0 이상][3] 버전, [브라우저 RUM 오류][2] 및 추가 문자열 속성이 필요합니다.

Datadog를 사용해 브라우저 RUM 이벤트를 수집하고 있지 않다면 [브라우저 모니터링 설정 설명서][1]를 참조하세요.

### 예시

이미 [브라우저 오류를 수집하고 있다면][2] 다음 중 하나를 사용해 속성을 추가할 수 있습니다.

* 오류 개체에 `dd_fingerprint` 속성 추가:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* 또는 `error.fingerprint` 속성으로 `beforeSend` 콜백을 사용합니다.

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

모든 경우 `my-custom-grouping-material`은 오류 추적에서 브라우저 RUM 오류를 단일 이슈로 그룹화하는 데 사용됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/real_user_monitoring/browser/collecting_browser_errors/
[3]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
[4]: /ko/real_user_monitoring/error_tracking