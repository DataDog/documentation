---
kind: ガイド
title: Heroku ログの収集
---

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
heroku drains:add "https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&ddtags=env:<ENV>&service=<SERVICE>&host=<HOST>" -a <APPLICATION_NAME>
```

* `<DD_API_KEY>` は [Datadog API キー][2]に置き換えます。
* `<ENV>` をアプリケーションの[環境][3]で置き換えます。
* `<APPLICATION_NAME>` と `<SERVICE>` はアプリケーション名に置き換えます。
* `<HOST>` を希望のホスト名で置き換えます
**注**:  
   - [ホストセクション][4]により、メトリクスとトレースはデフォルトのホスト名を dyno 名に設定します。ログのホスト名として dyno 名を動的に設定することはできません。メトリクス、トレース、およびログの間の相関付けには、`dyno` および `dynotype` タグを使用します。
   - ビルドパックは自動的にタグ `dyno` (`web.1` などの dyno 名を表す) と `dynotype` (`run` や `web` などの dyno の種類を表す) を追加します。詳細については、[タグの概要][3]ガイドを参照してください。

### カスタム属性

アプリケーションからのログにカスタム属性を追加するには、ドレイン内の URL を次のように置き換えます。

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/getting_started/tagging/#introduction
[4]: /ja/agent/basic_agent_usage/heroku/#hostname