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
- link: /security/application_security/getting_started/
  tag: ドキュメント
  text: Application Security Management を始める
kind: documentation
title: Datadog における Application Security Management の仕組み
---

## 概要

Datadog Application Security Management (ASM) は、コードレベルの脆弱性を悪用することを目的としたアプリケーションレベルの攻撃や、システムを狙う悪質な行為に対する観測可能性を提供します。

さらに、ASM は、アプリケーションが実行時に使用する脆弱なライブラリや依存関係などを通じて、アプリケーションに組み込まれたリスクを検出します。

Datadog APM は、トレースと呼ばれる各アプリケーションリクエストに関する情報を記録します。Datadog ASM は、APM と同じトレーシングライブラリを使用してトラフィックを監視し、既知の攻撃パターンに一致する疑わしいリクエストに基づいて攻撃の試みにフラグを立てます。Datadog がサービスに影響を与えるアプリケーション攻撃を検出すると、セキュリティシグナルが自動的に作成されます。このシグナルは、個々の攻撃の試みを評価する代わりに、レビューのために重要な脅威を特定します。セキュリティシグナルの設定に応じて、Slack、メール、または PagerDuty から通知を受け取ることができます。

従来の Web アプリケーションファイアウォール (WAF) は、通常、境界にデプロイされ、アプリケーションの動作に関するコンテキストを持ちません。ASM はアプリケーションに組み込まれているため、トレースデータにアクセスすることができ、脅威をピンポイントで分類するのに有効です。Datadog ASM は、Web アプリケーションファイアウォール (WAF) と同様に既知の攻撃パターンを活用しますが、アプリケーションのコンテキストを追加することで S/N 比を高め、誤検知を低減させます。

### アプリケーション攻撃にさらされるサービスを特定する

Datadog ASM [Threat Monitoring and Protection][22] は、APM が既に収集している情報を使用し、攻撃の試みを含むトレースにフラグを付けます。アプリケーションの攻撃にさらされたサービスは、APM に組み込まれたセキュリティビュー ([サービスカタログ][1]、[サービス詳細画面][2]、[トレース][3]) で直接ハイライト表示されます。

APM はアプリケーションのトラフィックのサンプルを収集するため、サービスを効果的に監視し保護するためには、トレーシングライブラリで ASM を有効にすることが必要です。

Datadog Threat Monitoring and Detection は、すべてのリクエストでクライアントの IP アドレスと手動で追加したユーザータグを収集することで、悪質な行為者を特定します。

<div class="alert alert-info"><strong>ベータ版: 1 クリック有効化</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から <a href="/security/application_security/getting_started/">ASM を有効にする</a>ことができます。</div>

### 脆弱なサービスの特定

<div class="alert alert-info">Risk Management の脆弱性検出はベータ版です。</a></div>

Datadog ASM [Risk Management][21] は、オープンソースのソフトウェアライブラリに関連する様々な既知の脆弱性データソースと、Datadog のセキュリティリサーチチームから提供される情報を利用して、アプリケーションがランタイムに依存するライブラリとその潜在的脆弱性を照合し、改善策を提言します。

## 互換性

Datadog ASM を Datadog の構成と互換性を持たせるためには、APM を有効にし、[Datadog にトレースを送信する][4]必要があります。ASM は APM が使用する同じライブラリを使用するため、別のライブラリをデプロイして維持する必要はありません。Datadog ASM を有効にするための手順は、ランタイム言語によって異なります。[ASM の前提条件][5]で、お使いの言語がサポートされているかどうかを確認してください。

### サーバーレスモニタリング

<div class="alert alert-info">サーバーレス脅威モニタリングは非公開ベータ版です。早期プレビューへの参加は<a href="https://docs.google.com/forms/d/e/1FAIpQLScB3uSccf9lSAh7GcA8NZ8SsmUGQ5mi09DnDgZmqXcbiYfMzA/viewform">こちらのフォーム</a>からリクエストしてください。</div>

Datadog ASM は、AWS Lambda 上にデプロイされた関数をサポートしています。検出は [Lambda 拡張機能][6]を利用することで行います。

Lambda 関数に対して、完全な脅威モニタリング機能が利用可能です。関数を狙う攻撃者を検出し、コードレベルの深い洞察で攻撃経路を追跡し、脅威を修正することができます。


## パフォーマンス

Datadog ASM は、Agent と APM にすでに含まれているプロセスを使用するため、使用する際のパフォーマンスへの影響はほとんどありません。APM が有効な場合、Datadog ライブラリは分散型トレースを生成します。Datadog ASM は、既知の攻撃パターンを使用して、トレース内のセキュリティアクティビティにフラグを立てます。攻撃パターンと分散型トレースで提供される実行コンテキストを相関させることで、検出ルールに基づいてセキュリティシグナルをトリガーします。

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="Datadog トレーサーライブラリは、アプリケーションサービスレベルで動作し、Datadog バックエンドにトレースを送信することを図解しています。Datadog バックエンドは、実用的なセキュリティシグナルにフラグを立て、PagerDuty、Jira、Slack などの関連アプリケーションに通知を送信します。" >}}

## データのサンプリングと保持

トレーシングライブラリでは、Datadog ASM は、セキュリティデータを含むすべてのトレースを収集します。デフォルトの[保持フィルター][7]は、Datadog プラットフォームにおける全てのセキュリティ関連トレースの保持を保証するものです。

疑わしいリクエストのデータは、90 日間保存されます。基礎となるトレースデータは 15 日間保存されます。

## データプライバシー

機密情報がインデックス化されるのを回避するために、複数の方法が使用されています。さらに対策を講じるには、[カスタムおよび静的スクラバー][8]を設定し、[除外フィルター][9]を使用することができます。


**注:** Datadog ASM は、機密情報や PII を自動的に難読化することはありません。この機密データを Datadog に送信しないようにするには、[Datadog Agent または Tracer をデータセキュリティ用に構成します][8]。

インデックス化された可能性のある機密データを削除する場合は、サポートにお問い合わせください。

## 脅威の検出方法

Datadog は、[OWASP ModSecurity Core Rule Set][10] を含む複数のパターンソースを使用して、HTTP リクエストにおける既知の脅威と脆弱性を検出します。HTTP リクエストが [OOTB 検出ルール][11]のいずれかにマッチすると、Datadog にセキュリティシグナルが生成されます。

<div class="alert alert-info"><strong>ベータ版: 脅威パターンの自動更新</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、サービスを監視するために使用されている脅威パターンは、Datadog がアップデートを公開するたびに自動的に更新されます。</div>

セキュリティシグナルは、Datadog が本番サービスを標的とした意味のある攻撃を検出すると、自動的に作成されます。これにより、攻撃者と標的となったサービスに関する可視性を得ることができます。しきい値付きのカスタム検出ルールを設定して、通知を受けたい攻撃を決定することができます。

## 内蔵保護機能

<div class="alert alert-info"><strong>ベータ版: IP およびユーザーのブロッキング</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から攻撃をブロックすることができます。</div>

Datadog ASM は、攻撃や攻撃者を減速させるための保護機能を内蔵しています。

IP とユーザーのブロッキングアクションは、[トレーシングライブラリ][9]を介して実装され、スタックに新たな依存性を導入することはありません。
ブロックは Datadog プラットフォームに保存され、[Datadog Agent][13] によって自動的かつ安全にフェッチされ、インフラストラクチャーにデプロイされ、アプリケーションに適用されます。詳しくは、[リモート構成の仕組み][23]をご覧ください。

ASM セキュリティシグナルでフラグが立てられた攻撃者を一時的または恒久的にブロックすることができます。シグナルエクスプローラでシグナルをクリックすると、そのシグナルを生成しているユーザーと IP アドレスが表示され、オプションでそれらをブロックすることができます。

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="Datadog ASM のセキュリティシグナルパネルで、攻撃者の IP をブロックすることができます" width="75%">}}


そこから、ASM によって保護されているすべてのサービスは、指定された期間、ブロックされた IP またはユーザーによって実行される着信リクエストをブロックします。ブロックされたすべてのトレースには `security_response.block_ip` というタグが付けられ、[トレースエクスプローラー][14]に表示されます。ASM が無効になっているサービスは保護されません。

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}

詳しくは、[脅威の監視と保護][22]をご覧ください。


## 脅威の監視範囲

Datadog ASM は、攻撃の試みをさまざまな脅威の種類に分類します。

* **Unqualified attacks** (無条件の攻撃) は、インバウンドの HTTP リクエストと既知の攻撃パターンを一致させます。例えば、トレースによって提供される実行コンテキストと相関させた後、サービスのビジネスロジックとの相関は見いだせません。
* **Contextualized attacks** (コンテキストに応じた攻撃) は、サービス上で実行された攻撃の試みを、一致するビジネスロジックに関連付けます。例えば、SQL ステートメントを実行するサービスに対する SQL インジェクションパターンなどです。
* 脆弱性とは、既知の攻撃パターンに合致した後、脆弱性の悪用に成功した証拠を示す攻撃試行が行われた場合、**Vulnerability is triggered** (脆弱性がトリガー) されます。

Datadog ASM には、以下の脆弱性を含む[さまざまな種類の攻撃][15]から保護するのに役立つ 100 以上の攻撃パターンが含まれています。

* SQL インジェクション
* コードインジェクション
* シェルインジェクション
* NoSQL インジェクション
* クロスサイトスクリプティング (XSS)
* サーバーサイドリクエストフォージェリー (SSRF)

## 内蔵の脆弱性検出

<div class="alert alert-info">脆弱性検出による Risk Management はベータ版です。</a></div>

Datadog ASM には、オープンソース依存部分で検出された脆弱性について警告する検出機能が組み込まれています。その情報の詳細は、[Vulnerability Explorer][20] に表示され、重大度、影響を受けるサービス、潜在的に脆弱なインフラストラクチャー、および表面化したリスクを解決するための改善手順が特定されます。

詳しくは、[Risk Management][21] をご覧ください。

## Datadog ASM による Log4Shell の保護方法

Datadog ASM は、Log4j Log4Shell 攻撃ペイロードを識別し、悪意のあるコードをリモートでロードしようとする脆弱なアプリを視覚化します。[Datadog の Cloud SIEM][16] の他の機能と組み合わせて使用すると、一般的なエクスプロイト後のアクティビティを特定して調査し、攻撃ベクトルとして機能する潜在的に脆弱な Java Web サービスをプロアクティブに修正することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/service_catalog/#security-view
[2]: /ja/tracing/services/service_page/#security
[3]: /ja/tracing/trace_explorer/trace_view/?tab=security#more-information
[4]: /ja/tracing/trace_collection/
[5]: /ja/security/application_security/getting_started/#prerequisites
[6]: /ja/serverless/installation/java/?tab=serverlessframework
[7]: /ja/tracing/trace_pipeline/trace_retention/
[8]: /ja/tracing/configure_data_security/?tab=http
[9]: /ja/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[10]: https://owasp.org/www-project-modsecurity-core-rule-set/
[11]: /ja/security/default_rules/#cat-application-security
[12]: /ja/tracing/
[13]: /ja/agent/guide/how_remote_config_works/
[14]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[15]: https://app.datadoghq.com/security/appsec/event-rules
[16]: /ja/security/cloud_siem/
[17]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[18]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[19]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
[20]: https://app.datadoghq.com/security/appsec/vm
[21]: /ja/security/application_security/risk_management/
[22]: /ja/security/application_security/threats/
[23]: /ja/agent/guide/how_remote_config_works/