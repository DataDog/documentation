---
aliases:
- /ja/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing/
- /ja/dynamic_instrumentation/sensitive-data-scrubbing/
- /ja/tracing/dynamic_instrumentation/sensitive-data-scrubbing
description: Live Debugger によってキャプチャされた機密性の高いアプリケーションデータを保護します。
further_reading:
- link: /tracing/live_debugger/#setup
  tag: ドキュメント
  text: Live Debugger のセットアップ
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
title: Live Debugger の機密データスクラビング
---
## 概要{#overview}

[Live Debugger][5] は、特に [{{< ui >}}Capture Variables{{< /ui >}}] (変数をキャプチャ) オプションを使用する場合に、機密性の高いアプリケーションデータを含む可能性のあるログや変数スナップショットをキャプチャします。

以下のリダクションメカニズムは、キャプチャされたデータの保護に役立ちます。

- **識別子および型のルール**により、アップロード前にインフラストラクチャー内で一致する値がリダクションされます。
- **Live Debugger のリダクションモード**は、キャプチャされた値のうちどれを表示するかを制御します。[モードベースのリダクション](#mode-based-redaction)を参照してください。
- **Sensitive Data Scanner ルール** は、データが Datadog に到達した後に一致するデータをリダクションします。[Sensitive Data Scanner](#redact-based-on-variable-values-with-sensitive-data-scanner) を参照してください。これらのルールは、機密性の高い値がインフラストラクチャーから外部へ流出することを防ぐルールの代わりにはなりません。

## モードベースのリダクション {#mode-based-redaction}

Live Debugger には 2 つのリダクションモードがあります。

- {{< ui >}}Strict Mode{{< /ui >}}: 数値とブール値を除くすべての値をリダクションします。[Bits ライブデバッガー][8]は、{{< ui >}}Strict Mode{{< /ui >}} に設定されたサービスと環境の組み合わせでは使用できません。
- {{< ui >}}Targeted Mode{{< /ui >}} (ターゲットモード) : クレジットカード番号、API キー、IP アドレス、その他の個人情報 (PII) など、既知の機密パターンをリダクションします。また、高エントロピーのシークレットスキャナーを実行してシークレットの可能性が高いものを自動的にリダクションします。キャプチャされたデータではこれは `[REDACTED:HIGH_ENTROPY]` と表示されます。

これらのリダクションモードは無効にすることはできません。切り替えのみ可能です。Targeted Mode は、`staging` や `preprod` などの一般的な本番前環境で自動的に適用されます。リダクションモードを変更するには、**Live Debugger Redaction Write** 権限が必要です。

## 識別子に基づくリダクション {#redact-based-on-identifiers}

### デフォルトの動作 {#default-behavior}

Live Debugger は、キャプチャされたデータがホストから送信される前に、`password` や `accessToken` などの機密識別子にリンクされた値を自動的にリダクションします。言語固有の追加のリダクションルールが各 SDK に組み込まれています。[リダクションされた識別子][1]を参照してください。

### カスタム識別子のリダクション {#custom-identifier-redaction}

追加の識別子を指定することで、リダクションをさらに調整できます。アプリケーションの環境 (`datadog-agent` ではない) で、`DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` 環境変数に識別子のカンマ区切りリスト (例: `firstName,lastName,phoneNumber`) を設定します。

デフォルトのリダクションリストから特定の識別子を除外するには、`DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` 環境変数にリダクション対象外の識別子のカンマ区切りリスト (例: `cookie,sessionid`) を設定します。

リダクションは、識別子がコード内でどのように使用されているか (メソッド引数、ローカル変数、クラス属性、辞書キーなど) に関係なく、普遍的に適用されます。関連付けられた値はインフラストラクチャー内でリダクションされ、Datadog にはアップロードされません。

## 特定のクラスまたは型に基づくリダクション {#redact-based-on-specific-classes-or-types}

特定のクラスには、本質的に機密情報が含まれている場合があります (例: `UserCredentials` クラス)。ここでも、アプリケーションの環境 (`datadog-agent` ではない) で `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` 環境変数に機密性の高い型のカンマ区切りリスト (例: `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`) を設定します。

クラスベースのリダクション:

- リストされている型の変数をリダクションします。それらの変数の内容は Datadog にアップロードされません。
- リダクション対象クラス内のコード位置にプローブが設定されないようにします。

## Sensitive Data Scanner を使用した変数値に基づくリダクション {#redact-based-on-variable-values-with-sensitive-data-scanner}

[Sensitive Data Scanner][3] は、特定の正規表現に基づいて機密情報を識別し、削除します。

### Sensitive Data Scanner ルールを構成する {#configure-sensitive-data-scanner-rules}

[Sensitive Data Scanner ページ][4] でルールを作成、カスタマイズ、または無効化します。ルールの作成時には、ルールが Live Debugger ログに適用されるようにするため、そのフィルターを `source:dd_debugger` に設定してください。構成手順については、[Sensitive Data Scanner のドキュメント][3] を参照してください。

**注**: Datadog Sensitive Data Scanner は、情報が Datadog にアップロードされた_後_にリダクションを実行します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[3]: /ja/security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /ja/tracing/live_debugger/
[8]: /ja/tracing/live_debugger/bits-live-debugger/