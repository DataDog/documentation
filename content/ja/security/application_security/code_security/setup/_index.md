---
aliases:
- /ja/security/application_security/enabling/single_step/code_security/
- /ja/security/application_security/enabling/tracing_libraries/code_security/
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
- link: /security/application_security/code_security
  tag: ドキュメント
  text: コードセキュリティ
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: ブログ
  text: Datadog Code Security で本番環境のアプリケーションセキュリティを強化
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: ブログ
  text: Datadog Code Security は IAST アプローチを採用し、OWASP Benchmark で 100% の精度を達成
title: コードセキュリティのセットアップ
---

## 前提条件
コードセキュリティをセットアップする前に、以下の前提条件が満たされていることを確認してください。

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
3. **サポートされるトレースライブラリ:** アプリケーションまたはサービスで使用されている Datadog トレースライブラリが、該当アプリケーションまたはサービスの言語に対するコードセキュリティ機能に対応している必要があります。詳細については、[Library Compatibility][1] のページを参照してください。

## Datadog トレーシングライブラリの使用

ご使用の言語およびインフラストラクチャータイプでコードセキュリティを有効にする方法の詳細を確認するには、アプリケーションの言語を選択してください。

{{< partial name="security-platform/appsec-languages-code-security.html" >}}</br>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ja/security/application_security/code_security/setup/compatibility/