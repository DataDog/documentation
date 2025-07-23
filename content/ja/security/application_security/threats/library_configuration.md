---
aliases:
- /ja/security_platform/application_security/setup_and_configure
- /ja/security/application_security/setup_and_configure
- /ja/security/application_security/threats/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog App and API Protection で脅威から保護する
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: 標準搭載の App and API Protection ルール
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: AAPのトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Datadog App and API Protection の仕組み
title: ライブラリ構成
---


## クライアント IP ヘッダーの構成

AAP は、`X-Forwarded-For` などのよく知られた複数のヘッダーから自動的に `http.client_ip` を解決しようとします。このフィールドに独自のヘッダーを使用している場合や、解決アルゴリズムをバイパスしたい場合は、`DD_TRACE_CLIENT_IP_HEADER` 環境変数を設定してください。この変数が設定されている場合、ライブラリは指定されたヘッダーだけをクライアント IP の取得先として確認します。

## 認証された悪質なユーザーの追跡

多くの重大な攻撃は、最も機密性の高いエンドポイントにアクセスできる認証されたユーザーによって実行されます。疑わしいセキュリティアクティビティを生成している悪質なユーザーを特定するには、標準化されたユーザータグを使用してサービスをインスツルメンテーションすることにより、ユーザー情報をトレースに追加します。ルートスパンにカスタムタグを追加したり、インスツルメンテーション関数を使用したりすることができます。

Datadog のトレーシングライブラリは、対応する認証フレームワークが使用されていてAAPが有効になっている場合に、ユーザーログインおよびサインアップイベントを検出しようとします。

ユーザーアクティビティを手動で追跡する方法については、[ユーザーアクティビティの追跡][1]をお読みください。または、自動追跡の[オプトアウト方法を参照][7]してください。

## 特定のパラメーターを検出のトリガーから除外する

AAP シグナルやセキュリティトレースが誤検知となる場合があります。たとえば、AAP が同じセキュリティトレースを繰り返し検出してシグナルを生成していても、レビューの結果脅威ではないと判断されたケースです。

パスリストにエントリーを追加して、ルールからイベントを無視することで、ノイズの多いシグナルパターンを排除し、正当にセキュリティトレースに焦点を当てることができます。

パスリストエントリーを追加するには、次のいずれかを実行します。

- [AAP Signals][4] でシグナルをクリックし、提案されたアクションとして表示される **Add to passlist** の横にある **Add Entry** リンクをクリックします。この方法では、対象サービスに対して自動的にエントリが追加されます。
- [パスリスト構成][5]に移動し、独自の基準に基づいて新しいパスリストエントリーを手動で構成します。

**注**: パスリストエントリーに一致するリクエスト (トレース) は請求されません。

## データセキュリティへの配慮

Datadog で収集するデータには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、データは脅威検出が不正確になったり、サービスのセキュリティが Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

デフォルトでは、AAP はリクエストが疑わしいと判断された理由を把握できるように、セキュリティトレースから情報を収集します。データを送信する前に、AAP は機密情報を示すパターンやキーワードをスキャンします。機密情報と判断される場合、そのデータは `<redacted>` というフラグに置き換えられます。これにより、リクエストが疑わしいものであっても、データのセキュリティ上の懸念からリクエストデータは収集されなかったことが確認できます。認証されたリクエストのユーザー ID など、ユーザー関連データはマスキングの対象外です。

ユーザーデータを保護するため、**AAP では機密データのスキャニングがデフォルトで有効化**されています。以下の環境変数を使用して設定をカスタマイズできます。スキャニングは [RE2 構文][2]に基づいています。カスタマイズするには、これらの環境変数を有効な [RE2][9] パターンに設定してください。

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

[自動ユーザーアクティビティイベントトラッキングモード][10]で、自動ユーザーアクティビティトラッキングモードとその構成方法に関する情報をご覧ください。Datadog ライブラリが、モードの略称 (`ident|anon|disabled`) を使用して `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 環境変数を使用して自動インスツルメンテーションを構成できる方法についてもご覧ください。


## カスタムブロッキングページまたはペイロードの構成

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ブロックされた IP からのリクエストを AAP が遮断した場合に表示されるページ" width="75%" >}}

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
[9]: https://github.com/google/re2/wiki/Syntax
[10]: /ja/security/application_security/threats/add-user-info/?tab=set_user#automatic-user-activity-event-tracking-modes