---
aliases:
- /ja/security_platform/guide/how-appsec-works/
- /ja/security_platform/application_security/how-appsec-works/
- /ja/security/guide/how-appsec-works/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: ブログ
  text: Datadog アプリケーションセキュリティのご紹介
title: Datadog におけるアプリケーションセキュリティの仕組み
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Application Security Management はサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog Application Security は、コードレベルの脆弱性を狙った攻撃やアプリケーションのビジネスロジックを悪用する攻撃、さらにシステムを標的とする悪意ある行為に対する可観測性を提供します。

以下に簡単にまとめます。

- **攻撃の可観測性**: コードの脆弱性やビジネスロジックを標的とするアプリケーションレベルの攻撃に関する洞察を提供します。
- **リスクの検出**: 脆弱なライブラリや依存関係など、アプリケーションにおけるリスクを特定します。
- **トレースに基づくモニタリング**: Datadog APM と同じトレーシングライブラリを使用してトラフィックを監視し、セキュリティ脅威を検出します。
- **セキュリティシグナル**: 攻撃やビジネスロジックの悪用が検出された際に、個々の試行ではなく、意味のある脅威に焦点を当ててセキュリティシグナルを自動的に生成します。
- **通知オプション**: セキュリティシグナルの設定に基づいて、Slack、メール、または PagerDuty を通じて通知を行います。
- **組み込みセキュリティ**: アプリケーションに統合され、トレースデータにアクセスすることで、より優れた脅威の識別と分類を可能にします。
- **強化された WAF 機能**: 従来の Web Application Firewall (WAF) の機能に加え、アプリケーションのコンテキストを追加することで、精度が向上し、誤検知を減少させます。

### アプリケーション攻撃にさらされているサービスの特定

Datadog Application Security [Threat Management][1] は、APM がすでに収集している情報を活用して、攻撃の試みを含むトレースを識別します。APM がアプリケーショントラフィックのサンプルを収集する一方で、サービスを効果的に監視および保護するには、トレーシングライブラリで Application Security を有効にすることが重要です。

アプリケーション攻撃にさらされているサービスは、APM に組み込まれたセキュリティビュー ([サービスカタログ][2]、[サービス詳細画面][3]、[トレース][4]) で直接ハイライトされます。

Datadog Threat Monitoring and Detection は、すべてのリクエストにおけるクライアント IP アドレス、ログインアカウント情報 (ユーザーアカウント/ID など)、および手動で追加されたユーザータグを収集し、悪意のあるユーザーを特定します。

<div class="alert alert-info"><strong>1-Click 有効化</strong><br>
サービスが <a href="/agent/remote_config/#enabling-remote-configuration"> Remote Configuration が有効な Agent と、それをサポートするバージョンのトレーシングライブラリ</a>で実行されている場合、Agent または トレーシングライブラリの追加構成なしで Datadog UI から <a href="https://app.datadoghq.com/security/configuration/asm/setup">Application Security を有効にする</a>ことができます。</div>

### サービスで使用されているオープンソースライブラリの脆弱性を特定

Datadog [Software Composition Analysis][5] は、オープンソースのソフトウェアライブラリに関連する様々な既知の脆弱性データソースと、Datadog のセキュリティリサーチチームから提供される情報を利用して、アプリケーションがランタイムに依存するライブラリとその潜在的脆弱性を照合し、改善策を提言します。

### サービスにおけるコードレベルの脆弱性を特定

Datadog [Code Security][28] は、サービス内のコードレベルの脆弱性を特定し、実用的な洞察と修正の提案を提供します。アプリケーションコード内の脆弱性を検出するために、インタラクティブ・アプリケーション・セキュリティ・テスト (IAST) のアプローチを採用しています。IAST は、Application Performance Monitoring (APM) と同様にコード内に埋め込まれたインスツルメンテーションを利用して、追加の構成や定期的なスケジューリングを必要とする外部テストに依存することなく、Datadog が正規のアプリケーショントラフィックを使用して脆弱性を特定することを可能にします。Datadog Code Security は、影響を受けたファイル名から正確なメソッドや行番号に至るまで、アプリケーション内の脆弱性を特定するために必要な情報を自動的に提供します。

## 互換性

Datadog Application Security を Datadog の構成と互換性を持たせるためには、APM を有効にし、[Datadog にトレースを送信している][6]必要があります。Application Security は APM が使用するのと同じライブラリを使用するため、別のライブラリをデプロイして維持する必要はありません。 

Datadog Application Security を有効にするための手順は、ランタイム言語ごとに異なります。各製品の Application Security の前提条件で、お使いの言語がサポートされているかどうかを確認してください。

## サーバーレスモニタリング

AWS Lambda 向け Datadog Application Security は、関数を標的としている攻撃者を詳細に視覚化します。攻撃に関する豊富な情報を提供する分散型トレーシングにより、影響を評価し、脅威に効果的に対処できます。

セットアップに関する情報については、[サーバーレスのための Application Security の有効化][8]をお読みください。

## パフォーマンス

Datadog Application Security は、Agent と APM にすでに含まれているプロセスを使用するため、使用する際のパフォーマンスへの影響はほとんどありません。

APM が有効な場合、Datadog ライブラリは分散型トレースを生成します。Datadog Application Security は、既知の攻撃パターンを使用して、トレース内のセキュリティアクティビティにフラグを立てます。攻撃パターンと分散型トレースで提供される実行コンテキストを相関させることで、検出ルールに基づいてセキュリティシグナルをトリガーします。

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Datadog トレーサーライブラリは、アプリケーションサービスレベルで動作し、Datadog バックエンドにトレースを送信することを図解しています。Datadog バックエンドは、対処可能なセキュリティシグナルにフラグを立て、PagerDuty、Jira、Slack などの関連アプリケーションに通知を送信します。" >}}

## データのサンプリングと保持

トレーシングライブラリでは、Datadog Application Security は、セキュリティデータを含むすべてのトレースを収集します。デフォルトの[保持フィルター][9]は、Datadog プラットフォームですべてのセキュリティ関連トレースが保持されることを保証します。

セキュリティトレースのデータは、90 日間保存されます。基礎となるトレースデータは 15 日間保存されます。

## データプライバシー

デフォルトでは、Application Security はセキュリティトレースから情報を収集し、そのリクエストが疑わしいと判定された理由を理解するのに役立ちます。データを送信する前に、Application Security はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられます。これは、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集できなかったことを示します。

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

Application Security で編集される情報を構成するには、[データセキュリティ構成][17]を参照してください。

## 脅威の検出方法

Datadog は、[OWASP ModSecurity Core Rule Set][12] を含む複数のパターン提供ソースを使用して、HTTP リクエストにおける既知の脅威と脆弱性を検出します。HTTP リクエストが[すぐに使える検出ルール][13]のいずれかにマッチすると、Datadog 内にセキュリティシグナルが生成されます。

**脅威パターンの自動更新:** サービスが[リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン][26]で実行されている場合、サービスの監視に使用される脅威パターンは、Datadog がアップデートを公開するたびに自動で更新されます。

セキュリティシグナルは、Datadog が本番サービスを標的とした重要な攻撃を検出すると、自動的に作成されます。これにより、攻撃者や標的とされたサービスに対する可視性を提供します。しきい値を用いたカスタム検出ルールを設定して、どの攻撃について通知を受けたいかを決定することができます。

## 内蔵保護機能

{{% asm-protect %}}


## 攻撃試行の分類

分散トレーシング情報を利用して、攻撃の試みは安全、不明、または有害として評価されます。
* 例えば、PHP インジェクション攻撃が Java で書かれたサービスを標的としている場合のように、安全と分類された攻撃試行はアプリケーションを侵害することはできません。
* 未知の評価は、攻撃が成功する確率について確定的な判断を下すのに十分な情報がない場合に与えられます。
* コードレベルの脆弱性が攻撃者によって発見された証拠がある場合、有害の評価がハイライトされます。



## 脅威の監視範囲


Datadog Application Security には、以下のカテゴリーを含むがこれに限られない、[多くの異なる種類の攻撃][14]から保護するのに役立つ 100 以上の攻撃シグネチャーが含まれています。

* SQL インジェクション
* コードインジェクション
* シェルインジェクション
* NoSQL インジェクション
* クロスサイトスクリプティング (XSS)
* サーバーサイドリクエストフォージェリー (SSRF)

## 内蔵の脆弱性検出

Datadog Application Security には、アプリケーションコードおよびオープンソース依存部分で検出された脆弱性について警告する検出機能が組み込まれています。その情報の詳細は、[Vulnerability Explorer][15] に表示され、重大度、影響を受けるサービス、潜在的に脆弱なインフラストラクチャー、および表面化したリスクを解決するための改善手順が特定されます。

詳しくは、[Code Security][28] および [Software Composition Analysis][5] をお読みください。

## API セキュリティ

<div class="alert alert-info">API セキュリティはプレビュー版です。</div>

Datadog Application Security は、API を標的とした脅威を視覚化します。[API カタログ][27]を使用して API の健全性とパフォーマンスのメトリクスを監視します。ここでは、API を標的とした攻撃を表示することができます。このビューには、攻撃者の IP と認証情報のほか、攻撃がどのように形成されたかの詳細を示すリクエストヘッダーが含まれます。Application Security と API 管理の両方を使用することで、API 攻撃対象の包括的なビューを維持し、そして脅威を緩和する対応を行うことができます。

## Datadog アプリケーションセキュリティによる Log4Shell の保護方法

Datadog Application Security は、Log4j Log4Shell 攻撃ペイロードを識別し、悪意のあるコードをリモートでロードしようとする脆弱なアプリを可視化します。[Datadog の Cloud SIEM][16] の他の機能と組み合わせて使用することで、一般的なエクスプロイト後のアクティビティを特定して調査し、攻撃ベクトルとして機能する可能性のある脆弱な Java Web サービスをプロアクティブに修正することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/threats/
[2]: /ja/tracing/service_catalog/#security-view
[3]: /ja/tracing/services/service_page/#security
[4]: /ja/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /ja/security/application_security/software_composition_analysis/
[6]: /ja/tracing/trace_collection/
[8]: /ja/security/application_security/serverless/
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
[28]: /ja/security/application_security/code_security/