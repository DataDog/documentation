---
disable_toc: false
further_reading:
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: アプリケーションセキュリティの仕組み
- link: /security/application_security/threats/
  tag: Documentation
  text: Threat Monitoring and Protection
- link: /security/application_security/risk_management/
  tag: Documentation
  text: リスク管理
kind: documentation
title: ASM の用語と概念
---

Datadog Application Security Management (ASM) は、脅威を監視し、コードレベルの脆弱性を悪用することを目的としたアプリケーションレベルの攻撃に対する防御を提供します。実行時のコード実行コンテキスト、トレースおよびエラーデータ、ユーザーの属性を活用します。

## 一般的なアプリケーションセキュリティ用語

攻撃の試み
: トレースにより、どのセキュリティルールがトリガーされたか。

Datadog ライブラリ
: _また_、トレーサー、トレーシングライブラリ
: Web アプリケーションに埋め込まれたプログラミング言語固有のライブラリ。ASM は、監視と保護のためにこのライブラリを使用します。APM は同じライブラリを使用して、テレメトリーをトレースするためのコードをインスツルメンテーションします。

検出ルール
: 取り込まれたデータやクラウド構成に適用される条件付きロジックの定義。ルールで定義されたケースが一定期間内に少なくとも 1 つマッチすると、Datadog は_セキュリティシグナル_を生成します。
: [検出ルール][10]を参照してください。

除外フィルター
: ASM ライブラリやイベントルールによってフラグが立てられた不審なリクエストを破棄するための仕組み。除外フィルターは、リクエストが Datadog に取り込まれる際に適用されます (インテーク)。除外フィルターは、誤検出やインテークのコストを管理するのに役立ちます。
: アプリの[除外フィルター][11]を参照してください。

イベントルール
: Datadog ライブラリで実行される、セキュリティアクティビティを捕捉するためのルールセット。これには、既知の脆弱性を悪用しようとする試みを監視する Web Application Firewall (WAF) のパターンが含まれます。
: [イベントルール][12]を参照してください。

インタラクティブアプリケーションセキュリティテスト (IAST)
: 自動テスト、人間のテスト担当者、またはアプリケーションの機能と相互作用するあらゆるアクティビティによってアプリが実行されている間に、脆弱性を積極的に検出するアプリケーションセキュリティテスト手法。

リモート構成
: Agent の構成をリモートで更新できる Datadog プラットフォームの仕組み。イベントルールの更新、製品の有効化、攻撃者のブロックのために ASM で使用されます。
: [リモート構成の仕組み][8]を参照してください。

サービス
: 単一の Web アプリケーション、マイクロサービス、API、または関数。通常、ビジネス機能を提供します。

シグナル
: お客様のサービスに影響を与えるアプリケーション攻撃の検出。シグナルは、お客様が確認すべき有意義な脅威を特定するものであり、高い優先度でトリアージする必要があります。
: アプリの[シグナルエクスプローラー][13]を参照してください。

ソフトウェア構成分析 (SCA)
: お客様のサービスが読み込むオープンソースライブラリを、既知の脆弱性のデータベースと比較します。SCA は、Web サービスが読み込むオープンソースライブラリの脆弱な依存関係、古いライブラリ、ライセンスの問題などを特定するのに役立ちます。

重大度
: 攻撃の試みをどの程度迅速にトリアージし、対処すべきかを示す指標。攻撃の潜在的な影響やリスクなど、さまざまな要因に基づきます。値は、Critical、High、Medium、Low、Info です。

不審なリクエスト
: イベントルールによってセキュリティアクティビティがフラグ付けされた分散型トレース。基礎となるトレースは APM と共有され、より深く、より速い調査が可能になります。

ユーザー属性
: 不審なリクエストを、システム内の既知のユーザーに対応付ける仕組み。
: [ユーザーアクティビティの追跡][14]を参照してください。

脆弱性
: アプリケーション内の受動的なリスク。[OWASP][1] より: "脆弱性とは、攻撃者がアプリケーションの利害関係者に危害を加えることを可能にする、設計上の欠陥あるいは実装上のバグであ る、アプリケーションの穴あるいは弱点のことを指します。利害関係者には、アプリケーションの所有者、アプリケーションのユーザー、および、アプリケーションに依存する他のエンティティが含まれます。"

## 攻撃と既知の脆弱性の用語

オープン Web アプリケーションセキュリティプロジェクト (OWASP)
: Web アプリケーションのセキュリティを強化するために、いくつかのプロジェクトを行っている非営利財団。OWASP は、Web アプリケーションの最も重要なセキュリティリスクについて広く合意した [OWASP Top 10][2] で最もよく知られています。

クロスサイトスクリプティング (XSS)
: インジェクション攻撃の一種で、善良で信頼できる Web サイトに悪意のあるスクリプトを注入する攻撃。
: [OWASP の XSS][3] を参照してください。

構造化クエリ言語インジェクション (SQLi、SQL インジェクション)
: インジェクション攻撃の一種で、クライアントからアプリケーションへの入力データを介して、SQL クエリを実行するもの。SQL コマンドは、事前に定義された SQL コマンドの実行に影響を与えるために、データプレーンの入力に挿入されます。SQL インジェクションが成功すると、データベースから機密データを読み取り、データベースデータを変更し (Insert/Update/Delete)、データベースに対する管理操作を実行し (DBMS を停止)、DBMS ファイルシステム上の特定のファイルの内容を復元し、場合によっては OS にコマンドを発行することができます。
: **関連**: Cassandra Query Language Injection (CQLi)、NoSQL Injection (NoSQLi) - SQLi と似ていますが、Cassandra Query Language と NoSQL のためのものです。
: [OWASP の SQL インジェクション][4]を参照してください。

サーバーサイドリクエストフォージェリ (SSRF)
: Web アプリケーションが、ユーザーが提供した URL を検証することなく、リモートリソースを取得する脆弱性。ファイアウォールや VPN、その他のネットワークアクセス制御リスト (ACL) で保護されている場合でも、攻撃者はアプリケーションに細工したリクエストを強制的に送信し、予期しない宛先に送信することができます。
: [OWASP のサーバーサイドリクエストフォージェリ][5]を参照してください。

ローカルファイルインクルージョン (LFI)
: リクエストの処理中に、攻撃者がサーバー上にローカルに存在するファイルを含めることができる脆弱性。ほとんどの場合、攻撃者はサーバー上のファイルに保存されている機密情報を読み取ることができます。より重大なケースでは、クロスサイトスクリプティングやリモートでのコード実行につながる可能性があります。
: [OWASP における LFI のテスト][6]を参照してください。

リモートファイルインクルージョン (RFI)
: ローカルファイルインクルージョンに似た脆弱性ですが、攻撃者がリクエストの処理中にリモートファイルを取り込むことが可能です。リモートファイルインクルージョン攻撃で使用されるファイルは、最も一般的には、PHP、JSP、または同様の技術のための悪意のあるコードを含んでいます。

リモートコード実行 (RCE)
: 攻撃者がリモートでマシンのコードを実行することができる脆弱性。

オブジェクトグラフナビゲーション言語インジェクション (OGNLi)
: Java アプリケーションにおいて、攻撃者が自身の OGNL 式を実行することが可能な脆弱性で、最も一般的にはリモートコードの実行につながります。
: [OWASP Top 10 の OGNLi][7] を参照してください。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /ja/agent/guide/how_remote_config_works/
[10]: /ja/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /ja/security/application_security/event_rules/#overview
[13]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&product=appsec&view=signal
[14]: /ja/security/application_security/threats/add-user-info/