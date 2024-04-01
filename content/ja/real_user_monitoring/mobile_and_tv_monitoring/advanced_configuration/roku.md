---
aliases:
- /ja/real_user_monitoring/roku/advanced_configuration/
code_lang: roku
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: GitHub
  text: dd-sdk-roku ソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
kind: ドキュメント
title: RUM Roku の高度な構成
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

## 概要

まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[Roku RUM セットアップドキュメント][2]を参照してください。

## RUM リソースの追跡

### `roUrlTransfer`

`roUrlTransfer` ノードで直接行われたネットワークリクエストは追跡する必要があります。

*同期リクエスト*の場合は、Datadog の `datadogroku_DdUrlTransfer` ラッパーを使用して、リソースを自動的に追跡することができます。このラッパーは `roUrlTransfer` コンポーネントのほとんどの機能をサポートしていますが、非同期ネットワーク呼び出しに関連するものはサポートしていません。

例えば、`GetToString` の呼び出しを行う方法を紹介します。

```brightscript
    ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
    ddUrlTransfer.SetUrl(url)
    ddUrlTransfer.EnablePeerVerification(false)
    ddUrlTransfer.EnableHostVerification(false)
    result = ddUrlTransfer.GetToString()
```

*非同期リクエスト*の場合、自動インスツルメンテーションはサポートされていません。リソースを手動で追跡する必要があります。次のコードスニペットは、リクエストを RUM リソースとして報告する方法を示しています。

```brightscript
sub performRequest()

    m.port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    ' setup the node url, headers, ...

    timer = CreateObject("roTimespan")
    timer.Mark()
    request.AsyncGetToString()

    while (true)
        msg = wait(1000, m.port)
        if (msg <> invalid)
            msgType = type(msg)
            if (msgType = "roUrlEvent")
                if (msg.GetInt() = 1) ' transfer complete
                    durationMs& = timer.TotalMilliseconds()
                    transferTime# = datadogroku_millisToSec(durationMs&)
                    httpCode = msg.GetResponseCode()
                    status = "ok"
                    if (httpCode < 0)
                        status = msg.GetFailureReason()
                    end if
                    resource = {
                        url: requestUrl
                        method: "GET"
                        transferTime: transferTime#
                        httpCode: httpCode
                        status: status
                    }
                    m.global.datadogRumAgent.callfunc("addResource", resource)
                end if
            end if
        end if
    end while
end sub
```

### リソースのストリーミング

`Video` や `Audio` ノードを使用してメディアをストリーミングする場合、以下のように受信したすべての `roSystemLogEvent` を Datadog に転送することができます。

```brightscript 
    sysLog = CreateObject("roSystemLog")
    sysLog.setMessagePort(m.port)
    sysLog.enableType("http.error")
    sysLog.enableType("http.complete")

    while(true)
        msg = wait(0, m.port)
        if (type(msg) = "roSystemLogEvent")
            m.global.datadogRumAgent.callfunc("addResource", msg.getInfo())
        end if
    end while
```

## ユーザーセッションの充実

RUM でインスツルメンテーションされたチャンネルは、カスタムイベントを追跡することによって、ユーザーのセッション情報をさらにリッチ化し、収集される属性をより細かく制御することができます。

RUM Roku SDK により自動的に取得されるデフォルトの RUM 属性に加えて、カスタム属性などのコンテキスト情報を RUM イベントに追加し、Datadog 内の可観測性を強化することも可能です。カスタム属性により、コードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークの状態など) を利用して、観察されたユーザー行動 (カート内の金額、マーチャントティア、広告キャンペーンなど) をフィルターしてグループ化することができます。

### ユーザーを特定する

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。
* 特定のユーザーのジャーニーをたどります。
* エラーの影響を最も受けているユーザーを把握します。
* 最も重要なユーザーのパフォーマンスを監視します。

以下の属性は**任意**ですが、**少なくとも 1 つ**提供する必要があります。

| 属性 | タイプ   | 説明                                                                                              |
| --------- | ------ | -------------------------------------------------------------------------------------------------------- |
| id        | 文字列 | 一意のユーザー識別子。                                                                                  |
| name      | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| email     | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

ユーザーセッションを特定するには、SDK を初期化した後などに、`datadogUserInfo` グローバルフィールドを使用します。

```brightscript
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```

### カスタムグローバル属性の追跡

SDK により自動的に取得されるデフォルトの属性に加えて、カスタム属性などのコンテキスト情報をログと RUM イベントに追加し、Datadog 内の可観測性を強化することも可能です。カスタム属性により、コードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークの状態など) を利用して、観察されたユーザー行動 (カート内の金額、マーチャントティア、広告キャンペーンなど) をフィルターしてグループ化することができます。

```brightscript
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}