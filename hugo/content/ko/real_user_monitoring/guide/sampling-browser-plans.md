---
aliases:
- /ko/real_user_monitoring/guide/sampling-browser-and-browser-premium/
description: Browser RUM과 Browser RUM 및 세션 재생 샘플링 구성을 사용자 정의하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/browser/
  tag: 설명서
  text: RUM Browser Monitoring에 대해 알아보기
title: Browser RUM , Browser RUM 및 세션 재생 샘플링에 대한 설정 구성
---

## 개요

[브라우저 RUM 애플리케이션][1]을 계측할 때 수집하려는 총 사용자 세션 양과 [Browser RUM 및 세션 재생][2] 기능을 포함하여 수집된 사용자 세션의 비율에 대한 샘플링 속도를 설정합니다.

이 가이드는 Datadog의 총 사용자 세션 수에서 수집하려는 브라우저 RUM 및 세션 재생 세션의 양을 사용자 정의하는 방법에 대한 예를 제공합니다.

## 설정

`sessionReplaySampleRate` 파라미터는 `sessionSampleRate`의 백분율입니다.

이 기능을 사용하려면 Datadog Browser SDK v3.0.0 이상이 필요합니다.

<blockquote class="alert alert-info">
Datadog Browser SDK v4.20.0에는 <code>sessionReplaySampleRate</code> 초기화 파라미터가 도입되어 <code>premiumSampleRate</code> 및 <code>replaySampleRate</code> 초기화 파라미터가 더 이상 사용되지 않습니다.
</blockquote>
<blockquote class="alert alert-info">
Datadog Browser SDK v5.0.0에는 두 가지 주요 동작 변경 사항이 도입되었습니다.

- 재생을 녹화한 세션만 ​​Browser RUM 및 세션 재생으로 간주됩니다.
- <code>sessionReplaySampleRate</code> 초기화 파라미터 기본값은 `0`입니다. 이전 버전의 SDK는 `100`을 사용합니다.
</blockquote>
세션이 생성되면 RUM은 이를 다음 중 하나로 추적합니다.

- [**Browser RUM**][2]: 세션, 보기, 액션, 리소스, 장기 작업 및 오류가 수집됩니다.
- [**Browser RUM & 세션 재생*][2]: 재생 녹화를 포함한 Browser RUM의 모든 내용이 수집됩니다.

세션 추적 방법을 제어하는 ​​데 두 가지 초기화 파라미터를 사용할 수 있습니다.

- `sessionSampleRate`는 추적되는 전체 세션의 비율을 제어합니다. 기본값은 `100%`이므로 기본적으로 모든 세션이 추적됩니다.
- `sessionReplaySampleRate`는 전체 샘플링 속도 **이후**에 적용되며  Browser RUM 및 세션 재생으로 추적되는 세션 비율을 제어합니다. Datadog Browser SDK v5.0.0부터는 기본값이 `0`이므로 기본적으로  Browser RUM 및 세션 재생으로 추적되는 세션이 없습니다.

세션을 100% Browser RUM으로 추적하려면:

<details open>
  <summary>최신 버전</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.10.2</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

</details>

Browser RUM 및 세션 재생으로 세션을 100% 추적하려면:

<details open>
  <summary>최신 버전</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 100
});
```

</details>


<details>
  <summary><code>v4.10.2</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

</details>

슬라이더를 사용하여 애플리케이션에 대해 수집된 총 사용자 세션의 백분율에서 수집된 Browser RUM 및 세션 재생 세션의 백분율을 설정합니다.

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="사용자 정의 백분율을 사용하는 브라우저 애플리케이션의 초기화 스니펫 예" video="true" width="100%" >}}

`sessionSampleRate`를 60, `sessionReplaySampleRate`를 50으로 설정하면 세션의 40%가 삭제되고, 세션의 30%가  Browser RUM으로 수집되며, 세션의 30%가  Browser RUM 및 세션 재생으로 수집됩니다.

<details open>
  <summary>최신 버전</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.30.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.20.0</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    premiumSampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.10.2</code> 이전</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    replaySampleRate: 50
});
```

</details>

v5.0.0부터 Browser RUM 및 세션 재생으로 커스텀 상태에 도달하는 세션을 100% 추적하려면 다음을 수행하세요.

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    startSessionReplayRecordingManually: true,
});

// when the custom state is reached
datadogRum.startSessionReplayRecording()
```

`startSessionReplayRecordingManually: true`를 사용하면 `startSessionReplayRecording()`를 호출하지 않는 세션은 Browser RUM으로 간주됩니다.

태그 지정 및 속성 탐색에 대한 자세한 내용은 [브라우저 모니터링][3]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /ko/real_user_monitoring/browser#tagging