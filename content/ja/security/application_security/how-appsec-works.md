---
aliases:
- /ja/security_platform/guide/how-appsec-works/
- /ja/security_platform/application_security/how-appsec-works/
further_reading:
- link: /security/application_security/setup_and_configure/#compatibility
  tag: ドキュメント
  text: 言語およびフレームワークの互換性に関する詳細
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: GitHub
  text: Datadog アプリケーションセキュリティのご紹介
- link: /security/application_security/enabling/
  tag: ドキュメント
  text: Application Security Management を有効にする
kind: documentation
title: Datadog における Application Security Management の仕組み
---

## 概要

Datadog Application Security Management (ASM) は、コードレベルの脆弱性を悪用することを目的としたアプリケーションレベルの攻撃や、システムを狙う悪質な行為に対する観測可能性を提供します。

さらに、ASM は、アプリケーションが実行時に使用する脆弱なライブラリや依存関係などを通じて、アプリケーションに組み込まれたリスクを検出します。

Datadog APM は、トレースと呼ばれる各アプリケーションリクエストに関する情報を記録します。Datadog ASM は、APM と同じトレーシングライブラリを使用してトラフィックを監視し、既知の攻撃パターンに一致する疑わしいリクエストに基づいて攻撃の試みにフラグを立てます。Datadog がサービスに影響を与えるアプリケーション攻撃を検出すると、セキュリティシグナルが自動的に作成されます。このシグナルは、個々の攻撃の試みを評価する代わりに、レビューのために重要な脅威を特定します。セキュリティシグナルの設定に応じて、Slack、メール、または PagerDuty から通知を受け取ることができます。

従来の Web アプリケーションファイアウォール (WAF) は、通常、境界にデプロイされ、アプリケーションの動作に関するコンテキストを持ちません。ASM はアプリケーションに組み込まれているため、トレースデータにアクセスすることができ、脅威をピンポイントで分類するのに有効です。Datadog ASM は、Web アプリケーションファイアウォール (WAF) と同様に既知の攻撃パターンを活用しますが、アプリケーションのコンテキストを追加することで S/N 比を高め、誤検知を低減させます。

### アプリケーション攻撃にさらされるサービスを特定する

Datadog ASM [Threat Monitoring and Protection][1] は、APM が既に収集している情報を使用し、攻撃の試みを含むトレースにフラグを付けます。アプリケーションの攻撃にさらされたサービスは、APM に組み込まれたセキュリティビュー ([サービスカタログ][2]、[サービス詳細画面][3]、[トレース][4]) で直接ハイライト表示されます。

APM はアプリケーションのトラフィックのサンプルを収集するため、サービスを効果的に監視し保護するためには、トレーシングライブラリで ASM を有効にすることが必要です。

Datadog Threat Monitoring and Detection は、すべてのリクエストでクライアントの IP アドレスと手動で追加したユーザータグを収集することで、悪質な行為者を特定します。

<div class="alert alert-info"><strong>ベータ版: 1 クリック有効化</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から <a href="/security/application_security/enabling/">ASM を有効にする</a>ことができます。</div>

### 脆弱なサービスの特定

<div class="alert alert-info">Risk Management の脆弱性検出はベータ版です。</a></div>

Datadog ASM [Risk Management][5] は、オープンソースのソフトウェアライブラリに関連する様々な既知の脆弱性データソースと、Datadog のセキュリティリサーチチームから提供される情報を利用して、アプリケーションがランタイムに依存するライブラリとその潜在的脆弱性を照合し、改善策を提言します。

## 互換性

Datadog ASM を Datadog の構成と互換性を持たせるためには、APM を有効にし、[Datadog にトレースを送信する][6]必要があります。ASM は APM が使用する同じライブラリを使用するため、別のライブラリをデプロイして維持する必要はありません。Datadog ASM を有効にするための手順は、ランタイム言語によって異なります。[ASM の前提条件][7]で、お使いの言語がサポートされているかどうかを確認してください。

### サーバーレスモニタリング

<div class="alert alert-info">AWS Lambda の ASM サポートはベータ版です。脅威の検出は Datadog の Lambda 拡張機能を利用して行われます。</div>

Datadog の AWS Lambda 向け ASM は、関数を標的としている攻撃者を詳細に可視化します。攻撃に関する豊富な情報を提供する分散型トレーシングにより、影響を評価し、脅威を効果的に修正できます。

セットアップに関する情報については、[サーバーレスのための ASM の有効化][8]をお読みください。

## パフォーマンス

Datadog ASM は、Agent と APM にすでに含まれているプロセスを使用するため、使用する際のパフォーマンスへの影響はほとんどありません。APM が有効な場合、Datadog ライブラリは分散型トレースを生成します。Datadog ASM は、既知の攻撃パターンを使用して、トレース内のセキュリティアクティビティにフラグを立てます。攻撃パターンと分散型トレースで提供される実行コンテキストを相関させることで、検出ルールに基づいてセキュリティシグナルをトリガーします。

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="Datadog トレーサーライブラリは、アプリケーションサービスレベルで動作し、Datadog バックエンドにトレースを送信することを図解しています。Datadog バックエンドは、実用的なセキュリティシグナルにフラグを立て、PagerDuty、Jira、Slack などの関連アプリケーションに通知を送信します。" >}}

## データのサンプリングと保持

トレーシングライブラリでは、Datadog ASM は、セキュリティデータを含むすべてのトレースを収集します。デフォルトの[保持フィルター][9]は、Datadog プラットフォームにおける全てのセキュリティ関連トレースの保持を保証するものです。

疑わしいリクエストのデータは、90 日間保存されます。基礎となるトレースデータは 15 日間保存されます。

## データプライバシー

デフォルトでは、ASM は疑わしいリクエストから情報を収集し、そのリクエストが疑わしいと判定された理由を理解するのに役立ちます。データを送信する前に、ASM はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられます。これは、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集できなかったことを示します。

ここでは、デフォルトで機密とフラグが立っているデータの例を紹介します。
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

ASM で再集された情報の構成は、[データセキュリティ構成][17]を参照してください。

## 脅威の検出方法

Datadog は、[OWASP ModSecurity Core Rule Set][12] を含む複数のパターンソースを使用して、HTTP リクエストにおける既知の脅威と脆弱性を検出します。HTTP リクエストが [OOTB 検出ルール][13]のいずれかにマッチすると、Datadog にセキュリティシグナルが生成されます。

<div class="alert alert-info"><strong>ベータ版: 脅威パターンの自動更新</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、サービスを監視するために使用されている脅威パターンは、Datadog がアップデートを公開するたびに自動的に更新されます。</div>

セキュリティシグナルは、Datadog が本番サービスを標的とした意味のある攻撃を検出すると、自動的に作成されます。これにより、攻撃者と標的となったサービスに関する可視性を得ることができます。しきい値付きのカスタム検出ルールを設定して、通知を受けたい攻撃を決定することができます。

## 内蔵保護機能

{{% asm-protect %}}


## 攻撃試行の分類

分散型トレーシング情報を活用し、攻撃試行を安全、不明、有害のいずれかに分類します。
* 例えば、Java で書かれたサービスを狙った PHP インジェクション攻撃では、安全と分類された攻撃はアプリケーションに侵入できません。
* 未知の分類とは、攻撃の成功確率について確定的な判断を下すのに十分な情報がない場合に決定されます。
* コードレベルの脆弱性が攻撃者によって発見された証拠がある場合、有害の分類が強調されます。



## 脅威の監視範囲


Datadog ASM には、以下のカテゴリーを含むがこれに限定されない、[多くの異なる種類の攻撃][14]から保護するのに役立つ 100 以上の攻撃シグネチャーが含まれています。

* SQL インジェクション
* コードインジェクション
* シェルインジェクション
* NoSQL インジェクション
* クロスサイトスクリプティング (XSS)
* サーバーサイドリクエストフォージェリー (SSRF)

## 内蔵の脆弱性検出

<div class="alert alert-info">脆弱性検出による Risk Management はベータ版です。</a></div>

Datadog ASM には、オープンソース依存部分で検出された脆弱性について警告する検出機能が組み込まれています。その情報の詳細は、[Vulnerability Explorer][15] に表示され、重大度、影響を受けるサービス、潜在的に脆弱なインフラストラクチャー、および表面化したリスクを解決するための改善手順が特定されます。

詳しくは、[Risk Management][5] をご覧ください。

## Datadog ASM による Log4Shell の保護方法

Datadog ASM は、Log4j Log4Shell 攻撃ペイロードを識別し、悪意のあるコードをリモートでロードしようとする脆弱なアプリを視覚化します。[Datadog の Cloud SIEM][16] の他の機能と組み合わせて使用すると、一般的なエクスプロイト後のアクティビティを特定して調査し、攻撃ベクトルとして機能する潜在的に脆弱な Java Web サービスをプロアクティブに修正することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/threats/
[2]: /ja/tracing/service_catalog/#security-view
[3]: /ja/tracing/services/service_page/#security
[4]: /ja/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /ja/security/application_security/risk_management/
[6]: /ja/tracing/trace_collection/
[7]: /ja/security/application_security/enabling/#prerequisites
[8]: /ja/security/application_security/enabling/serverless/
[9]: /ja/tracing/trace_pipeline/trace_retention/
[10]: /ja/tracing/configure_data_security/?tab=http
[11]: /ja/security/application_security/threats/setup_and_configure/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /ja/security/default_rules/#cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /ja/security/cloud_siem/
[17]: /ja/security/application_security/threats/setup_and_configure/#data-security-considerations