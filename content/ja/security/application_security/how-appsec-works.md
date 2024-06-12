---
aliases:
- /ja/security_platform/guide/how-appsec-works/
- /ja/security_platform/application_security/how-appsec-works/
- /ja/security/guide/how-appsec-works/
further_reading:
- link: /security/application_security/enabling/compatibility
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

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Application Security Management はサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog Application Security Management (ASM) は、アプリケーションのコードレベルの脆弱性を悪用することや、アプリケーションのビジネスロジックを不正に利用することを目的としたアプリケーションレベルの攻撃、ならびにシステムを狙う悪意ある行為者に対する観測可能性を提供します。

さらに、ASM は、アプリケーションが実行時に使用する脆弱なライブラリや依存関係などを通じて、アプリケーションに組み込まれたリスクを検出します。

Datadog APM は、トレースと呼ばれる各アプリケーションリクエストに関する情報を記録します。Datadog ASM は、APM と同じトレーシングライブラリを使用してトラフィックを監視します。ASM は、既知の攻撃パターンに一致するセキュリティトレースに基づいて攻撃の試みにフラグを立てるか、または[ビジネスロジック情報をタグ付け][25]します。Datadog がサービスに影響を与えるアプリケーション攻撃やビジネスロジックの不正使用を検出すると、セキュリティシグナルが自動的に作成されます。このシグナルは、個々の攻撃の試みを評価する代わりに、レビューのために重要な脅威を特定します。セキュリティシグナルの設定に応じて、Slack、メール、または PagerDuty から通知を受け取ることができます。

従来の Web アプリケーションファイアウォール (WAF) は、通常、境界にデプロイされ、アプリケーションの動作に関するコンテキストを持ちません。ASM はアプリケーションに組み込まれているため、トレースデータにアクセスすることができ、脅威をピンポイントで分類するのに有効です。Datadog ASM は、Web アプリケーションファイアウォール (WAF) と同様に既知の攻撃パターンを活用しますが、アプリケーションのコンテキストを追加することで信号対雑音比を高め、誤検出を低減します。

### アプリケーション攻撃にさらされるサービスを特定する

Datadog ASM [Threat Management][1] は、APM が既に収集している情報を使用し、攻撃の試みを含むトレースにフラグを立てます。アプリケーションの攻撃にさらされたサービスは、APM に組み込まれたセキュリティビュー ([サービスカタログ][2]、[サービス詳細画面][3]、[トレース][4]) で直接ハイライト表示されます。

APM はアプリケーションのトラフィックのサンプルを収集するため、サービスを効果的に監視し保護するためには、トレーシングライブラリで ASM を有効にすることが必要です。

Datadog Threat Monitoring and Detection は、すべてのリクエストでクライアントの IP アドレスと手動で追加したユーザータグを収集することで、悪質な行為者を特定します。

<div class="alert alert-info"><strong>1 クリック有効化</strong><br>サービスが<a href="/agent/remote_config/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から <a href="/security/application_security/enabling/">ASM を有効にする</a>ことができます。</div>

### 脆弱なサービスの特定

Datadog [Software Composition Analysis][5] は、オープンソースのソフトウェアライブラリに関連する様々な既知の脆弱性データソースと、Datadog のセキュリティリサーチチームから提供される情報を利用して、アプリケーションがランタイムに依存するライブラリとその潜在的脆弱性を照合し、改善策を提言します。

## 互換性

Datadog ASM を Datadog の構成と互換性を持たせるためには、APM を有効にし、[Datadog にトレースを送信する][6]必要があります。ASM は APM が使用する同じライブラリを使用するため、別のライブラリをデプロイして維持する必要はありません。Datadog ASM を有効にするための手順は、ランタイム言語によって異なります。[ASM の前提条件][7]で、お使いの言語がサポートされているかどうかを確認してください。

### サーバーレスモニタリング

Datadog の AWS Lambda 向け ASM は、関数を標的としている攻撃者を詳細に視覚化します。攻撃に関する豊富な情報を提供する分散型トレーシングにより、影響を評価し、脅威に効果的に対処できます。

セットアップに関する情報については、[サーバーレスのための ASM の有効化][8]をお読みください。

## パフォーマンス

Datadog ASM は、Agent と APM にすでに含まれているプロセスを使用するため、使用する際のパフォーマンスへの影響はほとんどありません。APM が有効な場合、Datadog ライブラリは分散型トレースを生成します。Datadog ASM は、既知の攻撃パターンを使用して、トレース内のセキュリティアクティビティにフラグを立てます。攻撃パターンと分散型トレースで提供される実行コンテキストを相関させることで、検出ルールに基づいてセキュリティシグナルをトリガーします。

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Datadog トレーサーライブラリは、アプリケーションサービスレベルで動作し、Datadog バックエンドにトレースを送信することを図解しています。Datadog バックエンドは、対処可能なセキュリティシグナルにフラグを立て、PagerDuty、Jira、Slack などの関連アプリケーションに通知を送信します。" >}}

## データのサンプリングと保持

トレーシングライブラリでは、Datadog ASM は、セキュリティデータを含むすべてのトレースを収集します。デフォルトの[保持フィルター][9]は、Datadog プラットフォームで全てのセキュリティ関連トレースが保持されることを保証します。

セキュリティトレースのデータは、90 日間保存されます。基礎となるトレースデータは 15 日間保存されます。

## データプライバシー

デフォルトでは、ASM はセキュリティトレースから情報を収集して、なぜそのリクエストが疑わしいとマークされたのかを理解するのに役立ちます。データを送信する前に、ASM はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられます。これは、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集できなかったことを示します。

ここでは、デフォルトで機密としてフラグが立てられるデータの例をいくつか紹介します。
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

ASM で編集される情報を構成するには、[データセキュリティ構成][17]を参照してください。

## 脅威の検出方法

Datadog は、[OWASP ModSecurity Core Rule Set][12] を含む複数のパターン提供ソースを使用して、HTTP リクエストにおける既知の脅威と脆弱性を検出します。HTTP リクエストが[すぐに使える検出ルール][13]のいずれかにマッチすると、Datadog 内にセキュリティシグナルが生成されます。

**脅威パターンの自動更新:** サービスが[リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン][26]で実行されている場合、サービスの監視に使用される脅威パターンは、Datadog がアップデートを公開するたびに自動で更新されます。

セキュリティシグナルは、Datadog が本番サービスを標的とした重要な攻撃を検出すると、自動的に作成されます。これにより、攻撃者や標的とされたサービスに対する可視性を提供します。しきい値を用いたカスタム検出ルールを設定して、どの攻撃について通知を受けたいかを決定することができます。

## 内蔵保護機能

{{% asm-protect %}}


## 攻撃試行の分類

分散トレーシング情報を活用して、攻撃試行は安全、不明、または有害として分類されます。
* 例えば、Java で書かれたサービスを対象とした PHP インジェクション攻撃のように、安全と分類される攻撃試行はアプリケーションに侵入することはできません。
* 未知の評価は、攻撃が成功する確率について確定的な判断を下すのに十分な情報がない場合に与えられます。
* コードレベルの脆弱性が攻撃者によって発見された証拠がある場合、有害の評価がハイライトされます。



## 脅威の監視範囲


Datadog ASM には、以下のカテゴリーを含むがこれに限らず、[多くの異なる種類の攻撃][14]から保護するのに役立つ 100 以上の攻撃シグネチャーが含まれています。

* SQL インジェクション
* コードインジェクション
* シェルインジェクション
* NoSQL インジェクション
* クロスサイトスクリプティング (XSS)
* サーバーサイドリクエストフォージェリー (SSRF)

## 内蔵の脆弱性検出

Datadog ASM には、オープンソース依存部分で検出された脆弱性について警告する検出機能が組み込まれています。その情報の詳細は、[Vulnerability Explorer][15] に表示され、重大度、影響を受けるサービス、潜在的に脆弱なインフラストラクチャー、および表面化したリスクを解決するための改善手順が特定されます。

詳しくは、[Software Composition Analysis][5] をお読みください。

## API セキュリティ

<div class="alert alert-info">API セキュリティは非公開ベータ版です。</div>

Datadog Application Security Management (ASM) は、API を標的とした脅威を視覚化します。[API カタログ][27]を使用して API の健全性とパフォーマンスのメトリクスを監視します。ここでは、API を標的とした攻撃を表示することができます。このビューには、攻撃者の IP と認証情報のほか、攻撃がどのように形成されたかの詳細を示すリクエストヘッダーが含まれます。ASM と API 管理の両方を使用することで、API 攻撃対象の包括的なビューを維持し、そして脅威を緩和する対応を行うことができます。

## Datadog ASM による Log4Shell の保護方法

Datadog ASM は、Log4j Log4Shell 攻撃ペイロードを識別し、悪意のあるコードをリモートでロードしようとする脆弱なアプリを視覚化します。[Datadog の Cloud SIEM][16] の他の機能と組み合わせて使用すると、一般的なエクスプロイト後のアクティビティを特定して調査し、攻撃ベクトルとして働く潜在的に脆弱な Java Web サービスにプロアクティブに対処することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/threats/
[2]: /ja/tracing/service_catalog/#security-view
[3]: /ja/tracing/services/service_page/#security
[4]: /ja/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /ja/security/application_security/software_composition_analysis/
[6]: /ja/tracing/trace_collection/
[7]: /ja/security/application_security/enabling/#prerequisites
[8]: /ja/security/application_security/enabling/serverless/
[9]: /ja/tracing/trace_pipeline/trace_retention/
[10]: /ja/tracing/configure_data_security/?tab=http
[11]: /ja/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /ja/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /ja/security/cloud_siem/
[17]: /ja/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /ja/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /ja/agent/remote_config/#enabling-remote-configuration
[27]: /ja/tracing/api_catalog/