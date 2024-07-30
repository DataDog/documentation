---
disable_toc: false
further_reading:
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: アプリケーションセキュリティの仕組み
- link: /security/application_security/threats/
  tag: Documentation
  text: Threat Management
- link: /security/application_security/risk_management/
  tag: Documentation
  text: Application Vulnerability Management
title: ASM の用語と概念
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

Datadog Application Security Management (ASM) は、脅威を監視し、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する保護を提供します。実行時のコード実行コンテキスト、トレースおよびエラーデータ、ユーザーの属性を利用します。

## 一般的なアプリケーションセキュリティ用語

攻撃の試み
: トレースにより、どのセキュリティルールがトリガーされたか。

Datadog ライブラリ
: _別名_: トレーサー、トレーシングライブラリ
: Web アプリケーションに埋め込まれたプログラミング言語に特化したライブラリ。ASM は、監視と保護のためにこのライブラリを使用します。APM は同じライブラリを使用して、テレメトリーをトレースするためのコードをインスツルメンテーションします。

検出ルール
: 取り込まれたデータやクラウド構成に適用される条件付きロジックの定義。ルールで定義された条件の少なくとも 1 つが一定期間内に満たされると、Datadog は_セキュリティシグナル_を生成します。
: [検出ルール][10]を参照してください。

パスリスト (旧除外フィルター)
: ASM ライブラリやアプリ内 WAF ルールによってフラグが立てられた不審なリクエストを除外するための仕組み。パスリストはリクエストが Datadog に取り込まれる際に適用されます (インテーク)。パスリストは誤検出の管理と取り込みコストの削減に役立ちます。
: アプリ内の[除外フィルター][11]を参照してください。

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

不審なリクエスト
: アプリ内 WAF ルールによってセキュリティアクティビティが警告された分散トレース。基礎となるトレースは APM と共有されており、これによりより深くて迅速な調査が可能になります。

ユーザー帰属
: 不審なリクエストを、システム内の既知のユーザーに対応付ける仕組み。
: [ユーザーアクティビティの追跡][14]を参照してください。

脆弱性
: アプリケーション内の潜在的なリスク。[OWASP][1]より: "脆弱性とは、攻撃者がアプリケーションの利害関係者に危害を加えることを可能にする、設計上の欠陥あるいは実装バグである、アプリケーションの穴または弱点のことを指します。利害関係者には、アプリケーションの所有者、アプリケーションのユーザー、および、アプリケーションに依存する他のエンティティが含まれます。"

## 攻撃と既知の脆弱性の用語

オープン Web アプリケーションセキュリティプロジェクト (OWASP)
: Web アプリケーションのセキュリティを強化するために、複数のプロジェクトを行っている非営利財団。OWASP は、Web アプリケーションの最も重要なセキュリティリスクについての幅広い合意である [OWASP Top 10][2] で最もよく知られています。

クロスサイトスクリプティング (XSS)
: インジェクション攻撃の一種で、悪意のあるスクリプトをそれ以外は善良で信頼できる Web サイトに注入する攻撃。
: [OWASP の XSS][3] を参照してください。

構造化クエリ言語インジェクション (SQLi、SQL インジェクション)
: インジェクション攻撃の一種で、クライアントからアプリケーションへの入力データを介して、SQL クエリを実行するもの。SQL コマンドは、事前に定義された SQL コマンドの実行に影響を与えるために、データプレーン入力に注入されます。SQL インジェクションが成功すると、データベースから機密データを読み取り、データベースデータを変更し (Insert/Update/Delete)、データベースに対する管理操作を実行し (DBMS を停止)、DBMS ファイルシステム上の特定のファイルの内容を取得し、場合によっては OS にコマンドを発行することができます。
: **関連**: Cassandra Query Language Injection (CQLi)、NoSQL Injection (NoSQLi) - SQLi と似ていますが、Cassandra Query Language と NoSQL のためのものです。
: [OWASP の SQL インジェクション][4]を参照してください。

サーバーサイドリクエストフォージェリ (SSRF)
: Web アプリケーションが、ユーザーが提供した URL を検証することなく、リモートリソースを取得する脆弱性。ファイアウォールや VPN、その他のネットワークアクセス制御リスト (ACL) で保護されている場合でも、攻撃者はアプリケーションに細工したリクエストを強制的に送信し、予期しない宛先に送信することができます。
: [OWASP のサーバーサイドリクエストフォージェリ][5]を参照してください。

ローカルファイルインクルージョン (LFI)
: リクエストの処理中に、攻撃者がサーバー上にローカルに存在するファイルを含めることを可能にする脆弱性。ほとんどの場合、攻撃者はサーバー上のファイルに保存されている機密情報を読み取ることができます。より重大なケースでは、この脆弱性の悪用がクロスサイトスクリプティングやリモートでのコード実行につながる可能性があります。
: [OWASP における LFI のテスト][6]を参照してください。

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
