---
aliases:
- /ja/security_platform/guide/how-appsec-works/
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: ドキュメント
  text: 言語およびフレームワークの互換性に関する詳細
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: ブログ
  text: Datadog アプリケーションセキュリティのご紹介
- link: /security_platform/application_security/getting_started/
  tag: ドキュメント
  text: アプリケーションセキュリティモニタリングを始める
kind: documentation
title: Datadog におけるアプリケーションセキュリティモニタリングの仕組み
---

## 概要

Datadog アプリケーションセキュリティモニタリング (ASM) は、コードレベルの脆弱性を悪用することを目的としたアプリケーションレベルの攻撃に対する観測可能性を提供します。

APM は、トレースと呼ばれる各 HTTP リクエストに関する情報を記録します。Datadog ASM は、APM がすでに収集している情報を使用し、既知の攻撃パターンに一致する疑わしいリクエストに基づいて、攻撃の試みにフラグを立てます。セキュリティシグナルは、疑わしいリクエストの集計です。セキュリティシグナルの設定に応じて、Slack、電子メール、または PagerDuty から通知を受け取ることができます。

従来の Web アプリケーションファイアウォール (WAF) は、通常、境界にデプロイされ、アプリケーションの動作に関するコンテキストを持ちません。ASM が効果を発揮するためには、データにアクセスするためにアプリケーションに組み込まれる必要があります。Datadog ASM は、Web アプリケーションファイアウォール (WAF) と同様に既知の攻撃パターンを活用しますが、アプリケーションのコンテキストを追加することで S/N 比を高め、誤検知を低減させます。

## 互換性

Datadog ASM を Datadog の構成と互換性を持たせるためには、APM を有効にし、[Datadog にトレースを送信する][1]必要があります。ASM は APM が使用する同じライブラリを使用するため、別のライブラリをデプロイして維持する必要はありません。Datadog ASM を有効にするための手順は、ランタイム言語によって異なります。[ASM の前提条件][2]で、お使いの言語がサポートされているかどうかを確認してください。

## パフォーマンス

Datadog ASM は、Agent と APM にすでに含まれているプロセスを使用するため、使用する際のパフォーマンスへの影響はほとんどありません。APM が有効な場合、Datadog ライブラリは分散型トレースを生成します。Datadog ASM は、既知の攻撃パターンを使用して、トレース内のセキュリティアクティビティにフラグを立てます。攻撃パターンと分散型トレースで提供される実行コンテキストを相関させることで、検出ルールに基づいてセキュリティシグナルをトリガーします。

{{< img src="security_platform/application_security/How_Application_Security_Works_d1.png" alt="Datadog トレーサーライブラリは、アプリケーションサービスレベルで動作し、Datadog バックエンドにトレースを送信することを図解しています。Datadog バックエンドは、実用的なセキュリティシグナルにフラグを立て、PagerDuty、Jira、Slack などの関連アプリケーションに通知を送信します。" >}}

## データプライバシー

機密情報がインデックス化されるのを回避するために、複数の方法が使用されています。さらに対策を講じるには、[カスタムおよび静的スクラバー][3]を設定し、[除外フィルター][4]を使用することができます。


**注:** Datadog ASM は、機密情報や PII を自動的に難読化することはありません。この機密データを Datadog に送信しないようにするには、[Datadog Agent または Tracer をデータセキュリティ用に構成します][3]。

インデックス化された可能性のある機密データを削除する場合は、サポートにお問い合わせください。

## 脅威の検出方法

Datadog は、[OWASP ModSecurity Core Rule Set][5] を含む複数のパターンソースを使用して、HTTP リクエストにおける既知の脅威と脆弱性を検出します。HTTP リクエストが [OOTB 検出ルール][6]のいずれかにマッチすると、Datadog にセキュリティシグナルが生成されます。

セキュリティシグナルは、Datadog が本番サービスを標的とした意味のある攻撃を検出すると、自動的に作成されます。これにより、攻撃者と標的となったサービスに関する可視性を得ることができます。しきい値付きのカスタム検出ルールを設定して、通知を受けたい攻撃を決定することができます。

## 対象範囲

Datadog ASM は、攻撃の試みをさまざまな脅威の種類に分類します。

* **Unqualified attacks** (無条件の攻撃) は、インバウンドの HTTP リクエストと既知の攻撃パターンを一致させます。例えば、トレースによって提供される実行コンテキストと相関させた後、サービスのビジネスロジックとの相関は見いだせません。
* **Contextualized attacks** (コンテキストに応じた攻撃) は、サービス上で実行された攻撃の試みを、一致するビジネスロジックに関連付けます。例えば、SQL ステートメントを実行するサービスに対する SQL インジェクションパターンなどです。
* 脆弱性とは、既知の攻撃パターンに合致した後、脆弱性の悪用に成功した証拠を示す攻撃試行が行われた場合、**Vulnerability is triggered** (脆弱性がトリガー) されます。

Datadog ASM には、以下の脆弱性を含む[さまざまな種類の攻撃][7]から保護するのに役立つ 100 以上の攻撃パターンが含まれています。

* SQL インジェクション
* コードインジェクション
* シェルインジェクション
* NoSQL インジェクション
* クロスサイトスクリプティング (XSS)
* サーバーサイドリクエストフォージェリー (SSRF)

## Datadog ASM による Log4Shell の保護方法

Datadog ASM は、Log4j Log4Shell 攻撃ペイロードを識別し、悪意のあるコードをリモートでロードしようとする脆弱なアプリを視覚化します。[Datadog の Cloud SIEM][8] の他の機能と組み合わせて使用すると、一般的なエクスプロイト後のアクティビティを特定して調査し、攻撃ベクトルとして機能する潜在的に脆弱な Java Web サービスをプロアクティブに修正することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: /ja/security_platform/application_security/getting_started/#prerequisites
[3]: /ja/tracing/configure_data_security/?tab=http
[4]: /ja/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /ja/security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /ja/security_platform/cloud_siem/