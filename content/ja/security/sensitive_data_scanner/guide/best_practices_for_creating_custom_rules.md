---
aliases:
- /ja/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner をセットアップする
- link: /security/sensitive_data_scanner/regular_expression_syntax
  tag: ドキュメント
  text: カスタム ルールのための正規表現の構文
title: カスタム ルール作成のベスト プラクティス
---

## 概要

Sensitive Data Scanner は、ログ、APM イベント、RUM イベント内の機微データを特定、タグ付け、必要に応じてマスクします。[すぐに使えるスキャン ルール][3] を使用するか、[正規表現][1] (regex) パターンを使ってカスタム ルールを作成できます。このガイドでは、regex パターンを使ってカスタム ルールを作成する際のベスト プラクティスを説明します。

## 精度の高い regex パターンを使用する

regex パターンは可能な限り正確に定義します。汎用的なパターンは誤検知の増加につながります。カスタム ルールを作成する際は、sample data tester にテスト データを追加して regex パターンを調整します。詳細は [カスタム スキャン ルールを追加する][2] の手順 2 を参照してください。

{{< img src="sensitive_data_scanner/guides/regex_sample_test.mp4" alt="一致するサンプルと一致しないサンプルで regex パターンをテスト" video=true >}}

## regex パターン マッチングを絞り込む

keyword dictionary にキーワードのリストを追加して、regex パターン マッチングの精度を高めます。keyword dictionary は、それらのキーワードの所定の近接範囲内に一致パターンがあるかを確認します。たとえばパスワードをスキャンする場合、`password`、`token`、`secret`、`credential` などのキーワードを追加できます。これらのキーワードが一致箇所から何文字以内にあるべきかも指定できます。既定では、キーワードは一致値の前方 30 文字以内にある必要があります。詳細は [カスタム スキャン ルールを追加する][2] の手順 2 を参照してください。

{{< img src="sensitive_data_scanner/guides/password_keyword.png" alt="password、token、secret、credential を含む keyword dictionary" style="width:90%;" >}}

一致の精度をさらに高めるには、次のいずれかを実施できます:

- イベント全体をスキャンしつつ、特定の属性をスキャン対象から除外します。たとえば、名前のような個人を特定できる情報 (PII) をスキャンする場合、`resource_name` や `namespace` といった属性は除外したい場合があります。
- スキャン対象を絞り込むために、特定の属性のみをスキャンします。たとえば、名前をスキャンする場合、`first_name` や `last_name` といった属性を選択できます。

詳細は [カスタム スキャン ルールを追加する][2] の手順 3 を参照してください。

{{< img src="sensitive_data_scanner/guides/include_exclude_attributes.mp4" alt="イベント全体をスキャンしつつ特定の属性を除外、または特定の属性のみをスキャン" video=true >}}

## すぐに使えるルールを使用する

可能な限り、Datadog のすぐに使える [ライブラリ ルール][3] を使用してください。これらは、メール アドレス、クレジット カード番号、API キー、認可トークン、ネットワークやデバイス情報などの一般的なパターンを検出するために事前定義されたルールです。各ルールには、マッチング精度を高めるための keyword dictionary 用の推奨キーワードが含まれています。[独自のキーワードを追加][5] することもできます。

他のユーザーにも有益と思われるルールで、利用したいものがある場合は、[サポートに連絡][4] してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/sensitive_data_scanner/scanning_rules/custom_rules/
[2]: /ja/security/sensitive_data_scanner/setup/telemetry_data/#add-scanning-rules
[3]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[4]: /ja/help/
[5]: /ja/security/sensitive_data_scanner/setup/telemetry_data/#add-custom-keywords