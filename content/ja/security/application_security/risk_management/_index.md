---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog におけるアプリケーションセキュリティの仕組み
- link: /security/application_security/getting_started/
  tag: ドキュメント
  text: サービスでアプリケーションセキュリティを有効にすることから始めましょう
kind: documentation
title: Application Risk Management
---

<div class="alert alert-info">Application Security Risk Management はベータ版です。</a></div>

## 概要

ASM Risk Management には、サービスのオープンソース依存部分で検出された脆弱性について警告する検出機能が組み込まれています。その情報の詳細は、[Vulnerability Explorer][3] に表示され、重大度、影響を受けるサービス、潜在的に脆弱なインフラストラクチャー、および表面化したリスクを解決するための改善手順が特定されます。

## 互換性

Risk Management は、以下の APM トレーシングライブラリで利用可能です。

| 言語 | Datadog トレーシングライブラリの最小バージョン |
| -------- | --------------------------------------- |
| Java     | 1.1.4 |
| .NET | 2.16.0 |
| NodeJS   | NodeJS 12+ の場合は 2.23.0、NodeJS 14+ の場合は 3.10.0 |
| Python   | 1.5.0 |

## 詳細はこちら

**ベータ版にご参加ください。**アプリケーションセキュリティを既にご利用の方は、[アプリケーションセキュリティのホームページ][4]からご登録ください。アプリケーションセキュリティを初めてご利用になる方は、[アプリケーションセキュリティのランディングページ][5]で概要とご利用方法をご確認ください。

または、APM でサービスの詳細ページを表示すると、セキュリティタブにも **Enable ASM** リンクがあり、Risk Management のベータ版に参加することができます。

## 脆弱性対策と改善策の検討

Vulnerability Explorer は、ASM Risk Management によって検出された脆弱性の完全なリストを表示し、その重大度に基づいて脆弱性を並べ、問題を調査して優先順位をつけることができるようにフィルタリング機能を提供します。また、影響を受けるライブラリの数、影響を受けるライブラリの言語、その脆弱性が最後に検出された時期も表示されます。

{{< img src="security/application_security/appsec-vuln-explorer.png" alt="ASM Risk Management の Vulnerability Explorer ページ" style="width:100%;" >}}

特定の脆弱性を選択すると、どのサービスが侵害されているかなど、その詳細が表示されます。ここから、どのコンテナやインフラストラクチャーがその脆弱性の影響を受ける可能性があるかを調べることができるので、リスクの範囲についてより詳しく知ることができます。これは、改善タスクの優先順位を決定するための貴重な情報となります。

また、検出された脆弱性に対して改善策を提案し、各脆弱性の背景にあるコンテキストを理解するのに役立つ Web サイトや情報源へのリンクや参照先をまとめて表示します。

{{< img src="security/application_security/appsec-vuln-details.png" alt="ASM Risk Management 脆弱性の詳細ページでは、影響を受けるサービス、インフラストラクチャーへのリンク、推奨される改善策、および詳細情報へのリンクが表示されます。" style="width:100%;" >}}

## オープンソースの既知の脆弱性の検出

Risk Management は、アプリケーションで使用されているオープンソースライブラリをランタイムに検出し、それらに関連するセキュリティ脆弱性を報告します。これを行うために、Risk Management は、様々な公共のオープンソースソフトウェアの既知の脆弱性データソースと、Datadog のセキュリティ調査チームが取得したデータを組み合わせています。

## カスタムコードの脆弱性の検出

<div class="alert alert-info">カスタムコードの脆弱性 (<em>未知の脆弱性</em>) の検出は、非公開ベータ版です。<a href="/help/">サポートに連絡</a>して、この機能へのアクセスをリクエストしてください。</div>

Risk Management は、オープンソースやサードパーティのライブラリに加え、お客様のサービスのカスタムコード (アプリケーションのビジネスロジックを一から実装する独自コード) に問題を発見することができます。

発見できるカスタムコードの脆弱性は以下の通りです。

- Insecure Cipher
- Insecure Hashing
- Weak Randomness
- SQL インジェクション
- パストラバーサル
- LDAP インジェクション
- コマンドインジェクション

## APM ビューにおけるリスク情報

Risk Management は、APM がすでに収集している情報を利用し、現在の脆弱性勧告と一致するライブラリにフラグを立てます。潜在的に脆弱なサービスは、[APM サービスカタログ][2]に組み込まれたセキュリティビューで直接ハイライト表示されます。

{{< img src="security/application_security/vulns-in-service-catalog.png" alt="APM サービスカタログに表示される脆弱性情報" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing