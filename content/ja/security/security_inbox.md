---
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Application Security Management について
- link: /security/cloud_security_management
  tag: ドキュメント
  text: Cloud Security Management について
- link: /security/default_rules/#all
  tag: ドキュメント
  text: すぐに使える検出ルール
- link: https://www.datadoghq.com/blog/security-inbox/
  tag: ブログ
  text: Datadog Security Inbox を使用して、トップセキュリティリスクを簡単に特定し、優先順位を付ける
kind: ドキュメント
products:
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Security Inbox
---

{{< product-availability >}}

Security Inbox は、最も重要なセキュリティ関連の発見を統合し、実行可能なリストとして提供します。Datadog セキュリティ製品からの脆弱性、シグナル、誤構成、アイデンティティリスクに関する洞察を自動的に文脈化し、相関づけて、環境を強化するための優先順位付けされた統一ビューを提供します。

{{< img src="security/security_inbox_5.png" alt="The Security Inbox shows prioritized security issues for remediation" width="100%">}}

## Security Inbox の発見の種類

Security Inbox に表示される発見は、Application Security Management (ASM) とCloud Security Management (CSM) から生成されます。これには、次のような種類の発見が含まれます。

- [CSM Misconfigurations][2] の[誤構成][1]。
- [CSM Identity Risks][3] の[アイデンティティリスク][1]。
- Application library vulnerabilities for [Software Composition Analysis(SCA)][4]. All high and critical application library vulnerabilities on production services under attack appear in the inbox.
- Application code vulnerabilities for [Code Security vulnerabilities][5]. All high and critical application code vulnerabilities appear in the inbox.
- [攻撃パス][1]。攻撃パスは、悪意のある行為者がクラウド環境内で不正アクセス、特権の昇格、機密データの侵害を行うために利用する可能性のある、一連の相互接続された誤構成、コンテナイメージ、ホスト、およびアプリケーションの脆弱性の概要を示します。デフォルトでは、すべての攻撃パスが Security Inbox にリストされます。

Security Inbox は、受信トレイに表示される発見を決定する際に、検出された以下のリスクも考慮します。

- **公開アクセス可能性**: 一般に公開されているリソースは、特に脆弱性や誤構成が含まれている場合にリスクが高くなります。詳しくは、[Datadog がリソースが公開アクセスされているかどうかを判断する方法][6]を参照してください。
- **特権アクセス**: 特権アクセスを持つリソースは、攻撃対象領域を拡大する可能性のある高い権限を付与するため、リスクが高まります。
- **攻撃を受けている**: 不審なセキュリティ活動が見られるリソースは、リスクが高くなります。過去 15 日以内にリソースでセキュリティシグナルが検出された場合、リソースは「攻撃を受けている」とフラグ付けされます。
- **エクスプロイトが利用可能**: 公開エクスプロイトが利用可能な脆弱性は、リスクが高くなります。公開エクスプロイトを利用できるかは、[cisa.gov][7]、[exploit-db.com][8]、[nvd.nist.gov][9] などのさまざまなエクスプロイトデータベースで検証されます。
- **本番環境**: 本番環境における脆弱性は、リスクが高くなります。環境は `env` タグから計算されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/?category=cat-csm-security-issues#all
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/cloud_security_management/identity_risks/
[4]: /ja/security/application_security/software_composition_analysis
[5]: /ja/security/application_security/code_security
[6]: /ja/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/