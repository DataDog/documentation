---
aliases:
- /ja/real_user_monitoring/guide/sampling-browser-and-browser-premium/
description: Learn how to customize your Browser RUM and Browser RUM & Session Replay
  sampling configuration.
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentation
  text: Learn about RUM Browser Monitoring
title: Configure Your Setup For Browser RUM and Browser RUM & Session Replay Sampling
---

## 概要

[Browser RUM アプリケーション][1]をインスツルメントする場合、収集したいユーザーセッションの総量と、[Browser RUM & セッションリプレイ][2]機能を含むユーザーセッションの収集率に応じてサンプルレートを設定します。

このガイドでは、Datadog のユーザーセッションの総量から収集したい Browser RUM &amp; セッションリプレイセッションの量をカスタマイズする方法を例として説明します。

## セットアップ

`sessionReplaySampleRate` パラメーターには、`sessionSampleRate` に対するパーセンテージを指定します。

この機能を使用するには、Datadog ブラウザ SDK v3.0.0+ が必要です。

<blockquote class="alert alert-info">
Datadog ブラウザ SDK v4.20.0 では、<code>sessionReplaySampleRate</code> 初期化パラメーターが導入され、<code>premiumSampleRate</code> と <code>replaySampleRate</code> 初期化パラメーターは非推奨となりました。
</blockquote>
<blockquote class="alert alert-info">
The Datadog Browser SDK v5.0.0 introduces two major behavior changes:

- Only sessions that have recorded a replay are considered as Browser RUM & Session Replay
- The <code>sessionReplaySampleRate</code> initialization parameter default value is `0` . Previous versions of the SDK use `100`.
</blockquote>
セッションが作成されると、RUM はそのセッションを次のいずれかとして追跡します。

- [**Browser RUM**][2]: Sessions, views, actions, resources, long tasks, and errors are collected.
- [**Browser RUM & Session Replay**][2]: Everything from Browser RUM is collected, including replay recordings.

セッションの追跡方法を制御するために、2 つの初期化パラメーターが利用可能です。

- `sessionSampleRate` は、追跡されるセッション全体の割合を制御します。デフォルトは `100%` で、すべてのセッションが追跡されます。
- `sessionReplaySampleRate` is applied **after** the overall sample rate, and controls the percentage of sessions tracked as Browser RUM & Session Replay. From Datadog Browser SDK v5.0.0, it defaults to `0`, so no session is tracked as Browser RUM & Session Replay by default.

セッションの 100% を Browser RUM として追跡する場合

<details open>
  <summary>最新バージョン</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 0
});
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

</details>

セッションの 100% を Browser RUM & セッションリプレイとして追跡する場合

<details open>
  <summary>最新バージョン</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 100
});
```

</details>


<details>
  <summary><code>v4.10.2</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

</details>

スライダーを使用して、アプリケーションで収集された総ユーザーセッションの割合から、収集された Browser RUM & セッションリプレイセッションの割合を設定します。

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="カスタムパーセンテージを使用したブラウザアプリケーションの初期化スニペット例" video="true" width="100%" >}}

`sessionSampleRate` を 60、`sessionReplaySampleRate` を 50 に設定すると、40% のセッションがドロップされ、30% のセッションが Browser RUM として、30% のセッションが Browser RUM & セッションリプレイとして収集されるようになります。

<details open>
  <summary>最新バージョン</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.30.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.20.0</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    premiumSampleRate: 50
});
```

</details>

<details>
  <summary><code>v4.10.2</code> より前</summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    replaySampleRate: 50
});
```

</details>

From v5.0.0, to track 100% of the sessions that reach a custom state as Browser RUM & Session Replay:

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

With the use of `startSessionReplayRecordingManually: true`, sessions that do not call `startSessionReplayRecording()` are considered as Browser RUM.

タグ付けや属性の確認については、[ブラウザモニタリング][3]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /ja/real_user_monitoring/browser#tagging