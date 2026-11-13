---
disable_toc: false
further_reading:
- link: /security/application_security/how-it-works
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/application_security
  tag: ドキュメント
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: ブログ
  text: Datadog Threat Intelligence によるセキュリティ調査の迅速化
title: 用語と概念
---
Datadog App and API Protection は、コードレベルの脆弱性を悪用しようとするアプリケーション層への攻撃を監視し、それらから保護します。この機能は、ランタイムでのコード実行コンテキスト、トレースおよびエラーデータ、およびユーザー属性情報を活用します。

## App and API Protection の一般的な用語{#general-app-and-api-protection-terms}

攻撃の試み
: トレースによってトリガーされたセキュリティルール。

Datadog ライブラリ
: _別名_トレーサー、SDK
: Web アプリケーションに組み込まれる、プログラミング言語固有のライブラリ。Datadog App and API Protection は、このライブラリを使用して監視と保護を行います。APM は同じライブラリを使用して、テレメトリをトレースするためのコードをインスツルメント化します。

検出ルール
: 取り込まれたデータおよびクラウド構成に適用される条件付きロジック定義。一定期間内に、ルールで定義されたケースのうち少なくとも 1 つが一致すると、Datadog は _セキュリティシグナル_を生成します。
: 「[検出ルール][10]」を参照してください。

パスリスト (旧除外フィルター)
: Datadog App and API Protection ライブラリおよびアプリ内 WAF ルールを通じてフラグが立てられたセキュリティトレースを破棄するための仕組み。パスリストは、リクエストが Datadog に取り込まれる (インテーク) 際に適用されます。パスリストは、誤検知やインテークコストの管理に役立ちます。
: アプリ内の「[除外フィルター][11]」を参照してください。

アプリ内 WAF ルール (旧イベントルール)
: セキュリティ関連のアクティビティを捕捉するために Datadog ライブラリ内で実行される一連のルール。これには、既知の脆弱性を悪用しようとする試みを監視する Web Application Firewall (WAF) パターンが含まれます。
: [アプリ内 WAF ルール][12] を参照してください。

Remote Configuration
: Agent の構成をリモートで更新できるようにする Datadog プラットフォームの仕組み。Datadog App and API Protection がアプリ内 WAF ルールの更新、製品の有効化、攻撃者のブロックを行うために使用します。
: 「[Remote Configuration の仕組み][8]」を参照してください。

サービス
: 単一の Web アプリケーション、マイクロサービス、API、または関数。通常、何らかのビジネス機能を果たします。

シグナル
: サービスに影響を与えるアプリケーション攻撃の検知。シグナルは、確認すべき重要な脅威を特定するものであり、優先度を高くしてトリアージする必要があります。
: アプリ内の「[シグナルエクスプローラー][13]」を参照してください。

重大度
: 攻撃の試みをどれだけ迅速にトリアージし、対処すべきかを示す指標。攻撃の潜在的な影響やリスクなど、複数の要因を組み合わせて決定されます。値は、Critical (重大)、High (高)、Medium (中)、Low (低)、Info (情報) です。

セキュリティトレース
: アプリ内 WAF ルールによってセキュリティアクティビティがフラグ付けされた分散トレース。基盤となるトレースは APM と共有されるため、より詳細で迅速な調査が可能です。

不審なリクエスト
: アプリ内 WAF ルールによってセキュリティアクティビティがフラグ付けされた分散トレース。基盤となるトレースは APM と共有されるため、より詳細で迅速な調査が可能です。

ユーザー属性
: 不審なリクエストを、システム内の既知のユーザーに対応付ける仕組み。
: 「[ユーザーアクティビティの追跡][14]」を参照してください。

脆弱性
: アプリケーション内の潜在的なリスク。[OWASP][1]より: 「脆弱性とは、攻撃者がアプリケーションの利害関係者に危害を加えることを可能にする、設計上の欠陥あるいは実装バグである、アプリケーションの穴または弱点のことを指します。利害関係者には、アプリケーションの所有者、アプリケーションのユーザー、および、アプリケーションに依存する他のエンティティが含まれます。」

トレースの適格性確認
: Datadog がトレースの影響を理解する手助けをするプロセスで、
それらを `Harmful Safe or Unknown` としてラベル付けします。
: 「[トレースの適格性確認][15]」を参照してください。

脅威インテリジェンス
: 脅威を検出するために Datadog ライブラリで実行される一連のルール。これには、既知の脆弱性を悪用しようとする試みを監視する Web Application Firewall (WAF) パターンが含まれます。
: 「[脅威インテリジェンス][16]」を参照

不審な攻撃者
: フラグ付き IP の前段階。不審な IP は、不審と分類されるための攻撃トラフィックの最小しきい値に達していますが、フラグ付きのしきい値には達していません。しきい値はユーザーが設定することはできません。
: 「[アタッカーエクスプローラー][17]」を参照

フラグが立てられた攻撃者
: 大量の攻撃トラフィックを送信する IP アドレス。フラグが立てられた IP アドレスを確認し、ブロックすることを推奨します。しきい値はユーザーが設定することはできません。
: 「[アタッカーエクスプローラー][17]」を参照

アタッカーフィンガープリント
: 複数のリクエストにわたって攻撃者を追跡するために、リクエストの特性から計算された識別子。
: 「[アタッカーフィンガープリント][18]」を参照

アタッカークラスター
: 分散攻撃全体にわたって攻撃者を識別する一連の属性。
: 「[アタッカークラスタリング][19]」を参照

## 攻撃と既知の脆弱性に関する用語{#attacks-and-known-vulnerabilities-terms}

Open Web Application Security Project (OWASP)
: Web アプリケーションのセキュリティを強化するために、複数のプロジェクトを行っている非営利財団。OWASP は、Web アプリケーションの最も重要なセキュリティリスクについての幅広い合意である [OWASP Top 10][2] で最もよく知られています。

クロスサイトスクリプティング (XSS)
: 本来は安全で信頼できる Web サイトに悪意のあるスクリプトを注入する、インジェクション攻撃の一種。
: 「[OWASP の XSS][3]」を参照してください。

Structured Query Language Injection (SQLi、SQL インジェクション)
: クライアントからアプリケーションへの入力データを介して SQL クエリが実行される、インジェクション攻撃の一種。あらかじめ定義された SQL コマンドの実行に影響を与えるために、データプレーンの入力に SQL コマンドが注入されます。SQL インジェクション攻撃が成功すると、データベースからの機密データの読み取り、データベースデータの変更 (挿入/更新/削除)、データベースに対する管理操作 (DBMS のシャットダウンなど) の実行、DBMS のファイルシステム上にある特定のファイルの内容の取得、さらには場合によってはオペレーティングシステムへのコマンド発行が可能になることがあります。
: **関連**: Cassandra Query Language Injection (CQLi)、NoSQL Injection (NoSQLi) – SQLi と同様の攻撃ですが、Cassandra Query Language および NoSQL を対象とします。
: 「[OWASP の QL インジェクション][4]」を参照してください。

サーバーサイドリクエストフォージェリー (SSRF)
: Web アプリケーションが、ユーザーが指定した URL を検証せずにリモートリソースを取得してしまう脆弱性。これにより、ファイアウォールや VPN、その他のネットワークアクセス制御リスト (ACL) で保護されている場合でも、攻撃者はアプリケーションに細工したリクエストを強制的に送信し、予期しない宛先に送信することができます。
: 「[OWASP のサーバーサイドリクエストフォージェリー][5]」を参照してください。

ローカルファイルインクルージョン (LFI)
: リクエストの処理中に、攻撃者がサーバー上にローカルに存在するファイルを含めることを可能にする脆弱性。多くの場合、これにより攻撃者はサーバー上のファイルに保存されている機密情報を読み取ることができます。より重大なケースでは、この脆弱性の悪用がクロスサイトスクリプティングやリモートでのコード実行につながる可能性があります。
: 「[OWASP の LFI のテスト][6]」を参照してください。

リモートファイルインクルージョン (RFI)
: ローカルファイルインクルージョンに似た脆弱性ですが、攻撃者がリクエストの処理中にリモートファイルを含めることを可能にします。リモートファイルインクルージョン攻撃で使用されるファイルには、多くの場合、PHP、JSP、または類似の技術向けの悪意のあるコードが含まれています。

リモートコード実行 (RCE)
: 攻撃者がリモートでマシンのコードを実行することを可能にする脆弱性。

オブジェクトグラフナビゲーション言語インジェクション (OGNLi)
攻撃者が Java アプリケーション内で独自の OGNL 式を実行することを可能にする脆弱性。多くの場合、リモートコード実行につながります。
: 「[OWASP Top 10 の OGNLi][7]」を参照してください。



## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /ja/remote_configuration
[10]: /ja/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /ja/security/application_security/policies/inapp_waf_rules/
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /ja/security/application_security/how-it-works/add-user-info/
[15]: /ja/security/application_security/how-it-works/trace_qualification/
[16]: /ja/security/application_security/how-it-works/threat-intelligence/
[17]: /ja/security/application_security/security_signals/attacker-explorer/
[18]: /ja/security/application_security/security_signals/attacker_fingerprint/
[19]: /ja/security/application_security/security_signals/attacker_clustering/