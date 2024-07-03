---
disable_toc: false
further_reading:
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: How Application Security Works
- link: /security/application_security/threats/
  tag: Documentation
  text: Threat Management
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: Blog
  text: Accelerate security investigations with Datadog Threat Intelligence
title: ASM Terms and Concepts
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

Datadog Application Security Management (ASM) は、脅威を監視し、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する保護を提供します。実行時のコード実行コンテキスト、トレースおよびエラーデータ、ユーザーの属性を利用します。

## 一般的なアプリケーションセキュリティ用語

攻撃の試み
: トレースにより、どのセキュリティルールがトリガーされたか。

Datadog library
: _also_ tracer, tracing library
: A programming language-specific library embedded in web applications. ASM uses the library to monitor and protect. APM uses the same library to instrument code for tracing telemetry.

検出ルール
: 取り込まれたデータやクラウド構成に適用される条件付きロジックの定義。ルールで定義された条件の少なくとも 1 つが一定期間内に満たされると、Datadog は_セキュリティシグナル_を生成します。
: [検出ルール][10]を参照してください。

passlist (formerly exclusion filter)
: A mechanism for discarding security traces flagged through the ASM library and the In-App WAF rules. Passlist is applied as requests are ingested into Datadog (intake). Passlist helps manage false positives and intake costs.
: See [Exclusion filters][11] in the app.

アプリ内 WAF ルール (旧イベントルール)
: Datadog ライブラリで実行される、セキュリティアクティビティを検出するためのルールセット。これには、既知の脆弱性を悪用する試みを監視する Web Application Firewall (WAF) のパターンが含まれています。
: [アプリ内 WAF ルール][12]を参照してください。

インタラクティブアプリケーションセキュリティテスティング (IAST)
: 自動テストや人間のテスター、またはアプリケーションの機能とインタラクションを持つ任意のアクティビティによってアプリが実行されている際に、積極的に脆弱性を検出するアプリケーションセキュリティテスティングの手法。

リモート構成
: Agent の構成をリモートで更新できる Datadog プラットフォームの仕組み。アプリ内 WAF ルールの更新、製品の有効化、攻撃者のブロックのために ASM で使用されます。
: [リモート構成の仕組み][8]を参照してください。

サービス
: 単一の Web アプリケーション、マイクロサービス、API、または関数。通常、ビジネス機能を果たします。

シグナル
: サービスに影響を与えるアプリケーション攻撃の検出。シグナルは、確認する価値のある脅威を特定し、高優先度でトリアージすべきものです。
: アプリの[シグナルエクスプローラー][13]を参照してください。

ソフトウェア構成分析 (SCA)
: サービスが読み込むオープンソースライブラリと、既知の脆弱性を含むデータベースを比較します。SCA は、Web サービスが読み込むオープンソースライブラリにおける脆弱な依存関係、古いライブラリ、およびライセンス問題を特定するのに役立ちます。

重大度
: 攻撃試行をどれだけ迅速にトリアージし、対処すべきかを示す指標。攻撃の潜在的な影響やリスクを含む複数の要因に基づいています。値は、Critical、High、Medium、Low、Info です。

security trace
: A distributed trace for which security activity has been flagged by In-App WAF rules. The underlying trace is shared with APM, allowing deeper and faster investigations.

suspicious request
: A distributed trace for which security activity has been flagged by In-App WAF rules. The underlying trace is shared with APM, allowing deeper and faster investigations.

user attribution
: A mechanism that maps suspicious requests to known users in your systems.
: See [Tracking User Activity][14].

脆弱性
: アプリケーション内の潜在的なリスク。[OWASP][1]より: "脆弱性とは、攻撃者がアプリケーションの利害関係者に危害を加えることを可能にする、設計上の欠陥あるいは実装バグである、アプリケーションの穴または弱点のことを指します。利害関係者には、アプリケーションの所有者、アプリケーションのユーザー、および、アプリケーションに依存する他のエンティティが含まれます。"

trace qualification
: The process by which Datadog helps understand the impact of traces, labeling
them as `Harmful Safe or Unknown`.
: See [Trace Qualification][15].

threat intelligence
: A set of rules executed in the Datadog libraries to detect threats. These include Web Application Firewall (WAF) patterns that monitor for attempts to exploit known vulnerabilities.
: See [Threat Intelligence][16]

suspicious attackers
: A precursor to Flagged IPs. Suspicious IPs have met a minimum threshold of attack traffic to be classified as suspicious, but not the threshold for Flagged. Thresholds are not user-configurable.
: See [Attacker Explorer][17]

flagged attackers
: IPs that send large amounts of attack traffic. We recommend reviewing and blocking Flagged IPs. Thresholds are not user-configurable.
: See [Attacker Explorer][17]

## 攻撃と既知の脆弱性の用語

オープン Web アプリケーションセキュリティプロジェクト (OWASP)
: Web アプリケーションのセキュリティを強化するために、複数のプロジェクトを行っている非営利財団。OWASP は、Web アプリケーションの最も重要なセキュリティリスクについての幅広い合意である [OWASP Top 10][2] で最もよく知られています。

Cross-Site Scripting (XSS)
: A type of injection attack in which malicious scripts are injected into otherwise benign and trusted websites.
: See [XSS on OWASP][3].

Structured Query Language Injection (SQLi, SQL Injection)
: A type of injection attack in which a SQL query is executed via the input data from the client to the application. SQL commands are injected into data-plane input in order to affect the execution of predefined SQL commands. A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system, and in some cases issue commands to the operating system.
: **Related**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - Similar to SQLi but for the Cassandra Query Language and NoSQL.
: See [SQL Injection on OWASP][4].

サーバーサイドリクエストフォージェリ (SSRF)
: Web アプリケーションが、ユーザーが提供した URL を検証することなく、リモートリソースを取得する脆弱性。ファイアウォールや VPN、その他のネットワークアクセス制御リスト (ACL) で保護されている場合でも、攻撃者はアプリケーションに細工したリクエストを強制的に送信し、予期しない宛先に送信することができます。
: [OWASP のサーバーサイドリクエストフォージェリ][5]を参照してください。

Local File Inclusion (LFI)
: A vulnerability that allows an attacker to include a file locally present on the server during the processing of the request. In most cases this allows the attacker to read sensitive information stored in files on the server. In more severe cases exploitation can lead to cross-site scripting or remote code execution.
: See [Testing for LFI on OWASP][6].

リモートファイルインクルージョン (RFI)
: ローカルファイルインクルージョンに似た脆弱性ですが、攻撃者がリクエストの処理中にリモートファイルを含めることが可能です。リモートファイルインクルージョン攻撃で使用されるファイルは、主に PHP、JSP、または同様の技術のための悪意のあるコードを含んでいます。

リモートコード実行 (RCE)
: 攻撃者がリモートでマシンのコードを実行することを可能にする脆弱性。

オブジェクトグラフナビゲーション言語インジェクション (OGNLi)
: Java アプリケーションにおいて、攻撃者が自分の OGNL 式を実行することを可能にする脆弱性で、通常はリモートコード実行につながります。
: [OWASP Top 10 の OGNLi][7] を参照してください。



## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /ja/agent/remote_config/
[10]: /ja/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /ja/security/application_security/threats/inapp_waf_rules
[13]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&product=appsec&view=signal
[14]: /ja/security/application_security/threats/add-user-info/
[15]: /ja/security/application_security/threats/trace_qualification/
[16]: /ja/security/application_security/threats/threat-intelligence/
[17]: /ja/security/application_security/threats/attacker-explorer/