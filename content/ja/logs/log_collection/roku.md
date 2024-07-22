---
description: Roku チャンネルからログを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: GitHub
  text: dd-sdk-roku ソースコード
- link: logs/explorer
  tag: Documentation
  text: ログの調査方法
title: Roku ログ収集
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku ログ収集は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku ログ収集はベータ版です。</div>
{{< /site-region >}}

[Datadog の `dd-sdk-roku` ロギングライブラリ][1]を使って、Roku チャンネルから Datadog にログを送信し、以下の機能を活用します。

* Datadog に JSON 形式でネイティブに記録する。
* 送信される各ログに `context` およびカスタム属性を追加する。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. `ROPM` を使用して依存関係をプロジェクトに追加するか、[最新の zip アーカイブ][7]をダウンロードし、プロジェクトに解凍します。

    ```shell
    ropm install datadog-roku
    ```

2. Datadog UI で新しい RUM アプリケーションを作成したときに生成された [Datadog クライアントトークン][2]とアプリケーション ID でライブラリを初期化します (詳細は [Roku RUM 収集の概要][6]参照)。セキュリティ上の理由から、クライアントトークンを使用する必要があります。[Datadog API キー][3]は、Roku チャンネルのパッケージでクライアント側に公開されるため、`dd-sdk-roku` ライブラリの構成に使用できません。

   クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][2]を参照してください。

   {{< site-region region="us" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "eu1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us3",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us5",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "ap1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
          launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}


3. (オプション) アプリケーションを書くときに、グローバルノードで `datadogVerbosity` 属性を設定することで、開発ログを有効にすることができます。ライブラリの内部メッセージで、指定されたレベルと同等以上の優先度を持つメッセージはすべて、Roku デバイスの telnet 出力にログされます。

   ```brightscript
   ' 0 = none; 1 = error; 2 = warning; 3 = info; 4 = verbose;
   m.globalNode.addFields({ datadogVerbosity: 2 }) 
   ```

4. 次のいずれかの関数で、カスタムログエントリを Datadog に直接送信します。

    ```brightscript
    msg = "A log message"
    m.global.datadogLogsAgent.callfunc("logOk", msg, {})
    m.global.datadogLogsAgent.callfunc("logDebug", msg, {})
    m.global.datadogLogsAgent.callfunc("logInfo", msg, {})
    m.global.datadogLogsAgent.callfunc("logNotice", msg, {})
    m.global.datadogLogsAgent.callfunc("logWarn", msg, {})
    m.global.datadogLogsAgent.callfunc("logError", msg, {})
    m.global.datadogLogsAgent.callfunc("logCritical", msg, {})
    m.global.datadogLogsAgent.callfunc("logAlert", msg, {})
    m.global.datadogLogsAgent.callfunc("logEmergency", msg, {})
    ```


5. (オプション) 発信されたログに属性を追加するために、ログメッセージと一緒に連想配列を提供します。AssocArray の各エントリーは、属性として追加されます。

   ```brightscript
    m.global.datadogLogsAgent.callfunc(
        "logInfo", 
        "Video started", 
        { video_id: 42, video_type: "advert"}
    )
   ```

## バッチコレクション

すべてのログは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能であれば、バッチはすぐに送信されます。チャンネル開設中ににネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

SDK がディスク容量を使いすぎないように、ディスク上のデータは古くなりすぎると自動的に破棄されます。

**注**: データが Datadog にアップロードされる前に、チャンネルの[キャッシュディレクトリ][8]に平文で保存され、このデータは他のアプリケーションでは読めないことを意味します。なお、OS はいつでもデータを退避させることができるため、稀にデータ損失が発生する可能性があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-roku
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/logs/processing/attributes_naming_convention/
[5]: /ja/tagging/
[6]: /ja/real_user_monitoring/roku/?tab=us
[7]: https://github.com/DataDog/dd-sdk-roku/releases
[8]: https://developer.roku.com/fr-fr/docs/developer-program/getting-started/architecture/file-system.md#cachefs