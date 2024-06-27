---
aliases:
- /ja/security_platform/application_security/setup_and_configure
- /ja/security/application_security/setup_and_configure
- /ja/security/application_security/threats/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/enabling/
  tag: Documentation
  text: サービスの ASM を有効にする
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: ASM のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Datadog における Application Security Management の仕組み
title: ライブラリ構成
---


## クライアント IP ヘッダーの構成

ASM は自動的に、`X-Forwarded-For` のようなよく知られたヘッダーから、`http.client_ip` を解決しようとします。もし、このフィールドにカスタムヘッダーを使用したり、解決アルゴリズムをバイパスしたい場合は、`DD_TRACE_CLIENT_IP_HEADER` 環境変数を設定します。この変数が設定されている場合、ライブラリはクライアント IP の指定されたヘッダーのみをチェックします。

## 認証された悪質なユーザーの追跡

多くの重大な攻撃は、最も機密性の高いエンドポイントにアクセスできる認証されたユーザーによって実行されます。疑わしいセキュリティアクティビティを生成している悪質なユーザーを特定するには、標準化されたユーザータグを使用してサービスをインスツルメンテーションすることにより、ユーザー情報をトレースに追加します。ルートスパンにカスタムタグを追加したり、インスツルメンテーション関数を使用したりすることができます。

Datadog トレーシングライブラリは、互換性のある認証フレームワークが使用されており、ASM が有効になっている場合に、ユーザーのログインとサインアップイベントの検出を試みます。

ユーザーアクティビティを手動で追跡する方法については、[ユーザーアクティビティの追跡][1]をお読みください。または、自動追跡の[オプトアウト方法を参照][7]してください。

## 特定のパラメーターを検出のトリガーから除外する

ASM のシグナル、つまりセキュリティトレースが誤検出される場合があります。例えば、ASM が同じセキュリティトレースを繰り返し検出し、シグナルが発生したが、そのシグナルは確認され、脅威ではないことがあります。

パスリストにエントリーを追加して、ルールからイベントを無視することで、ノイズの多いシグナルパターンを排除し、正当にセキュリティトレースに焦点を当てることができます。

パスリストエントリーを追加するには、次のいずれかを実行します。

- [ASM シグナル][4]のシグナルをクリックし、**Add to passlist** という提案アクションの横にある **Add Entry** というリンクをクリックします。この方法では、対象となるサービスのエントリーが自動的に追加されます。
- [パスリスト構成][5]に移動し、独自の基準に基づいて新しいパスリストエントリーを手動で構成します。

**注**: パスリストエントリーに一致するリクエスト (トレース) は請求されません。

## データセキュリティへの配慮

Datadog で収集するデータには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、データは脅威検出が不正確になったり、サービスのセキュリティが Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

デフォルトでは、ASM はセキュリティトレースから情報を収集して、なぜそのリクエストが疑わしいとマークされたのかを理解するのに役立ちます。データを送信する前に、ASM はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられます。これにより、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集されなかったことがわかります。

ユーザーのデータを保護するために、ASM では機密データスキャンがデフォルトで有効になっています。以下の環境変数を使用することで、構成をカスタマイズすることができます。スキャンは [RE2 構文][2]に基づいています。スキャンをカスタマイズするには、これらの環境変数の値を有効な RE2 パターンに設定します。

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - 値が一般的に機密データを含むキーをスキャンするためのパターン。見つかった場合、そのキーと関連する値およびすべての子ノードが編集されます。
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - 機密データを示す可能性のある値をスキャンするためのパターン。見つかった場合、その値とすべての子ノードが編集されます。

<div class="alert alert-info"><strong>Ruby のみ、ddtrace バージョン 1.1.0 から</strong>

<p>また、コードでスキャンパターンを構成することも可能です。</p>

```ruby
Datadog.configure do |c|
  # ...

  # カスタム RE2 正規表現を設定する
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


以下は、デフォルトで機密と判定されるデータの例です。

* `pwd`、`password`、`ipassword`、`pass_phrase`
* `secret`
* `key`、`api_key`、`private_key`、`public_key`
* `token`
* `consumer_id`、`consumer_key`、`consumer_secret`
* `sign`、`signed`、`signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Datadog Agent やライブラリの他のメカニズムで、機密データを削除するために使用できるものについては、[APM データセキュリティ][3]を参照してください。

## カスタムブロッキングページまたはペイロードの構成

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /ja/tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /ja/help/
[7]: /ja/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking
[8]: https://app.datadoghq.com/security/configuration/asm/services-config