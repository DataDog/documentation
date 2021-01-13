---
title: Heroku ログの収集
kind: ガイド
---
**このログインテグレーションは、現在、公開ベータ版です。**

Heroku は、次の 3 種類のログを提供します。

* `アプリログ`: プラットフォームにプッシュしたアプリケーションからの出力
* `システムログ`: アプリケーションのために Heroku プラットフォームインフラストラクチャーによって実行されたアクションに関するメッセージ
* `API ログ`: アプリケーションの開発者によって実装された管理上の問題情報

[Heroku の HTTP/S ドレイン][1]は、ログメッセージをバッファし、メッセージバッチを POST リクエストとして HTTPS エンドポイントに送信します。
POST 本文には、Syslog 形式のメッセージが含まれ、Syslog TCP プロトコルのオクテット数フレーム化手法を使用してフレーム化されます。
Datadog の HTTP API は、コンテンツヘッダー `application/logplex-1` によって定義される Logplex 標準を実装および認識します。

すべてのログを Datadog に送信する方法は、次のとおりです。

* Heroku プロジェクトに接続します。
* 以下のコマンドを使用して HTTPS ドレインをセットアップします。

```text
heroku drains:add 'https://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>' -a <APPLICATION_NAME>
```

* `<DD_API_KEY>` は [Datadog API キー][2]に置き換えます。
* `<APPLICATION_NAME>` と `<SERVICE>` はアプリケーション名に置き換えます。
* `<HOST>` は目的のホスト名に置き換えます。**注**: この[ホストセクション][3]に基づいて、メトリクスとトレースはデフォルトのホスト名を dyno 名に設定します。dyno 名をログのホスト名として動的に設定することは、現時点ではできません。現在、メトリクス、トレース、ログの関連付けに使用できるのは、`dyno` タグと `dynotype` タグです。

### カスタム属性

アプリケーションからのログにカスタム属性を追加するには、ドレイン内の URL を次のように置き換えます。

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/account/settings#api
[3]: /ja/agent/basic_agent_usage/heroku/#hostname