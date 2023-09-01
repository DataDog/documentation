---
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Github
  text: dd-sdk-roku ソースコード
- link: /real_user_monitoring
  tag: Documentation
  text: Datadog RUM を探索する
- link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  tag: ブログ
  text: Datadog RUM で Roku チャンネルを監視する
is_beta: true
kind: documentation
title: RUM Roku チャンネルモニタリング
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">RUM for Roku はベータ版です。</div>
{{< /site-region >}}

## 概要

Datadog Real User Monitoring (RUM) を使用すると、チャンネルの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

Datadog Roku SDK は、Roku OS 10 以降の BrightScript チャンネルをサポートしています。

## セットアップ

1. SDK を依存関係として宣言します。
2. Datadog でアプリケーションの詳細を指定します。
3. ライブラリを初期化します。
4. チャンネルをインスツルメンテーションします。

### SDK を依存関係として宣言

#### ROPM の使用 (推奨)

`ROPM` は Roku プラットフォームのパッケージマネージャーです (NPM をベースにしています)。Roku プロジェクトでまだ `ROPM` を使用していない場合は、[スタートアップガイド][1]をお読みください。プロジェクトが `ROPM` を使用するようにセットアップされたら、以下のコマンドを使用して Datadog の依存関係をインストールすることができます。

```shell
ropm install datadog-roku
```

### 手動で設定する

プロジェクトが `ROPM` を使用していない場合は、[Roku SDK][2] の zip アーカイブをダウンロードし、プロジェクトのルートフォルダで解凍して、ライブラリを手動でインストールします。

プロジェクトの `components` と `source` フォルダの両方に `roku_modules/datadogroku` サブフォルダがあることを確認します。

### Datadog でアプリケーションの詳細を指定する

1. [**UX Monitoring** > **RUM Applications** > **New Application**][3] へ移動します。
2. アプリケーションタイプとして **Roku** を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。詳しくは、[RUM Roku データ収集][4]をご覧ください。

   {{< img src="real_user_monitoring/roku/roku-new-application.png" alt="Datadog で Roku 用 RUM アプリケーションを作成する" style="width:90%;">}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。`dd-sdk-roku` ライブラリの構成に [Datadog API キー][5]のみを使用した場合、クライアント側で Roku チャンネルの BrightScript コード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][6]を参照してください。

### ライブラリの初期化

初期化スニペットで、環境名を設定します。詳しくは、[タグの使用方法][7]を参照してください。

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

### チャンネルをインスツルメンテーションする

すべてのリソースの自動追跡を有効にするには [**RUM リソースの追跡**][8]、イベントにカスタムグローバル情報やユーザー情報を追加するには[**ユーザーセッションのリッチ化**][9]を参照してください。

#### RUM View の追跡

[ユーザーセッション][4]を論理的なステップに分割するには、次のコードを使用して手動で View を開始します。チャンネル内で新しい画面に移動するたびに、新しい RUM View に対応する必要があります。

```brightscript
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

#### RUM Actions の追跡

RUM Actions は、ユーザーがチャンネルと行うインタラクションを表します。アクションは以下のように Datadog に転送することができます。

```brightscript
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom" 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

#### RUM エラーの追跡

例外を投げる可能性のある操作を行った場合、以下のように Datadog にエラーを転送することができます。

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```




## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/rokucommunity/ropm
[2]: https://github.com/DataDog/dd-sdk-roku
[3]: https://app.datadoghq.com/rum/application/create
[4]: /ja/real_user_monitoring/roku/data_collected/
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/account_management/api-app-keys/#client-tokens
[7]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[8]: /ja/real_user_monitoring/roku/advanced_configuration/#track-rum-resources
[9]: /ja/real_user_monitoring/roku/advanced_configuration/#enrich-user-sessions