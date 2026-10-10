---
description: ブラウザからリプレイ URL にアクセスすることで、Session Replay をサードパーティのカスタマーエクスペリエンスツールやデータ分析ツールと統合します。
further_reading:
- link: /session_replay/
  tag: ドキュメント
  text: Session Replay について
title: Session Replay をサードパーティツールに接続する
---
## 概要 {#overview}

Session Replay は、ユーザー分析データを補完する視覚的なインサイトを提供します。カスタマーエクスペリエンス、Web サイト分析などのためにサードパーティツールを使用している場合は、それらを Session Replay に接続することができます。このガイドでは、インテグレーションで使用する Session Replay URL に、セッションが行われているブラウザからライブでアクセスする方法を説明します。

## ユースケース {#use-cases}

以下のようなユーザーエクスペリエンス指標をより包括的に表示するために、サードパーティツールを Session Replay と接続するとよいでしょう。

- フォームアンケート結果
- カスタマーエクスペリエンスツール
- データ分析

## Session Replay リンクを取得する {#get-the-session-replay-link}

現在のユーザーセッションのレコーディングの URL を取得するには、RUM をセットアップするために使用したインストール方法に応じて、次のスニペットを使用します。

**注**: ユーザーセッションのレコーディング URL を取得する際に `subdomain` の値を指定することはオプションですが、カスタムサブドメインを通して Datadog にアクセスし、返される URL にカスタムドメインを表示したい場合は、必ず指定する必要があります。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // optional, only needed if using a custom domain name
    subdomain: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN 非同期" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN 同期" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## サードパーティツールへのリンクを送信する {#send-link-to-a-third-party-tool}

上記のスニペットでリンクを取得した後、サードパーティツールが提供するオプションに応じて、データを渡す方法がいくつかあります。

- 隠しフォームフィールドとして。
- JSON フィールドとして。
- URL パラメーターを通して。
- JavaScript で選択したインテグレーションに直接。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}