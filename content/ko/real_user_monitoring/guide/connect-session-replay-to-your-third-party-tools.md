---
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: 설명서
  text: 세션 재생에 대해 알아보기
title: 타사 도구에 Session Replay 연결
---

## 개요

Session Replay는 사용자 분석 데이터를 보완하는 시각적 인사이트를 제공합니다. 고객 경험, 웹사이트 분석 등을 위해 타사 도구를 사용하는 경우 Session Replay에 연결할 수 있습니다. 이 가이드에서는 세션이 진행 중인 브라우저에서 실시간으로 통합에 사용할 Session Replay URL에 액세스하는 방법을 안내합니다. 

## 사용 사례

다음과 같은 사용자 경험 지표를 보다 종합적으로 확인하려면 타사 도구에 Session Replay를 연결할 수 있습니다.

- 설문조사 결과 양식
- 고객 경험 도구
- 데이터 분석

## Session Replay 링크 받기

현재 사용자 세션의 녹화 URL을 가져오려면 RUM을 설정하는 데 사용한 설치 방법에 따라 다음 코드 조각을 사용하세요.

**참고**: 사용자 세션의 녹화 URL을 가져올 때 `subdomain` 값을 제공하는 것은 선택 사항이지만 커스텀 하위 도메인을 통해 Datadog에 액세스하고 반환되는 URL에서 커스텀 도메인을 확인하려는 경우에는 반드시 제공해야 합니다.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // 선택 사항, 커스텀 도메인 이름을 사용하는 경우에만 필요
    subdomain: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // 선택 사항, 커스텀 도메인 이름을 사용하는 경우에만 필요
        subdomain: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // 선택 사항, 커스텀 도메인 이름을 사용하는 경우에만 필요
        subdomain: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## 타사 도구로 링크 보내기

위의 스니펫을 통해 링크를 검색한 후에는 타사 도구가 제공하는 옵션에 따라 데이터를 전달하는 몇 가지 방법이 있습니다.

- 숨겨진 양식 필드로 전달
- JSON 필드로 전달
- URL 파라미터를 통해.
- 자바스크립트에서 선택한 통합에서 바로 사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}