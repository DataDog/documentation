---
description: ブラウザおよび Browser Premium のサンプリング構成をカスタマイズする方法について説明します。
further_reading:
- link: /real_user_monitoring/browser/
  tag: ドキュメント
  text: RUM ブラウザモニタリングについて
kind: ガイド
title: ブラウザおよび Browser Premium のサンプリングのためのセットアップの構成
---

## 概要

[ブラウザ RUM アプリケーション][1]をインスツルメントする場合、収集したいユーザーセッションの総量と、[Browser Premium][2] 機能を含むユーザーセッションの収集率に応じてサンプルレートを設定します。

Browser Premium セッションには、リソースやロングタスク、リプレイ記録などが含まれます。このガイドでは、Datadog のユーザーセッションの総量から収集したい Browser Premium セッションの量をカスタマイズする方法を例として説明します。

## セットアップ

`premiumSampleRate` パラメーターには、`sampleRate` に対するパーセンテージを指定します。

この機能を使用するには、Datadog ブラウザ SDK v3.0.0+ が必要です。

<blockquote class="alert alert-info">
Datadog ブラウザ SDK v4.10.2 は、<code>replaySampleRate</code> 初期化パラメーターを廃止し、<code>premiumSampleRate</code> 初期化パラメーターを導入しています。
</blockquote>

セッションが作成されると、RUM はそのセッションを次のいずれかとして追跡します。

- [**ブラウザ RUM**][2]: セッション、ビュー、アクション、およびエラーのみが収集されます。`startSessionReplayRecording()` への呼び出しは無視されます。
- [**Browser Premium**][2]: リソースやロングタスク、リプレイ記録を含む、ブラウザからのすべての情報が収集されます。リプレイ記録を収集するには、`startSessionReplayRecording()` を呼び出します。

セッションの追跡方法を制御するために、2 つの初期化パラメーターが利用可能です。

- `sampleRate` は、追跡されるセッション全体の割合を制御します。デフォルトは `100%` で、すべてのセッションが追跡されます。
- `premiumSampleRate` は、全体のサンプルレートの**後に**適用され、Browser Premium として追跡されるセッションの割合を制御します。デフォルトは `100%` で、すべてのセッションがデフォルトで Browser Premium として追跡されます。

セッションの 100% をブラウザとして追跡する場合

<details open>
  <summary>最新バージョン</summary>

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

セッションの 100% を Browser Premium として追跡する場合

<details open="false">
  <summary>最新バージョン</summary>

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

スライダーを使用して、アプリケーションで収集された総ユーザーセッションの割合から、収集された Browser RUM Premium セッションの割合を設定します。

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="カスタムパーセンテージを使用したブラウザアプリケーションの初期化スニペット例" video="true" width="100%" >}}

`sampleRate` を 60、`premiumSampleRate` を 50 に設定すると、40% のセッションがドロップされ、30% のセッションがブラウザとして、30% のセッションが Browser Premium として収集されるようになります。

<details open>
  <summary>最新バージョン</summary>

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

タグ付けや属性の確認については、[ブラウザモニタリング][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /ja/real_user_monitoring/browser#tagging