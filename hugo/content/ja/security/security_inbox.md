---
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: App and API Protection の詳細
- link: /security/cloud_security_management
  tag: ドキュメント
  text: Cloud Security の詳細
- link: /security/default_rules/#all
  tag: ドキュメント
  text: 初期設定の検知ルール
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: ブログ
  text: Datadog Security Inbox によるセキュリティリスクの優先順位付け方法
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Security Inbox
---

{{< product-availability >}}

Security Inbox は、重要度の高いセキュリティ検出結果を 1 つに集約し、すぐに対応できる形で整理して提示する機能です。Datadog のセキュリティ製品が提供する脆弱性、シグナル、誤設定、アイデンティティ リスクのインサイトを自動で補足情報付きに整理し、相互に関連付けたうえで、環境を強化するために実施すべきアクションを 1 つの優先度付きビューにまとめて表示します。

{{< img src="security/security_inbox_7.png" alt="Security Inbox が修復のために優先度付けされたセキュリティ課題を表示している" width="100%">}}

## Security Inbox に表示される検出結果の種類

Security Inbox に表示される検出結果は、App and API Protection (AAP) と Cloud Security によって生成されます。既定では、次の種類の検出結果が含まれます:

- Datadog Security Research が精選した [Cloud Security Misconfigurations][2] 向けの [誤設定][1] セット。
- Datadog Security Research が精選した [Cloud Security Identity Risks][3] 向けの [アイデンティティ リスク][1] セット。
- [Software Composition Analysis (SCA)][4] によるアプリケーション ライブラリの脆弱性。攻撃を受けている本番サービスで検出された重大度 High と Critical のアプリケーション ライブラリ脆弱性は、すべて Security Inbox に表示されます。
- [Code Security vulnerabilities][5] によるアプリケーション コードの脆弱性。重大度 High と Critical のアプリケーション コード脆弱性は、すべて Security Inbox に表示されます。
- Emerging vulnerabilities は、インフラストラクチャーの脆弱性のうち、過去 30 日以内に CVE が公開され、[Datadog の重大度スコア][10] が Critical のもの、または Datadog Security Research チームが公開したものです。Datadog が脆弱性を Critical と評価する場合、それはインターネットに公開された本番リソースに影響し、悪用可能な重大脆弱性であることを意味します。
- [Attack Paths][1] (攻撃パス)。攻撃パスは、相互に関連する誤設定、コンテナ イメージ、ホスト、アプリケーションの脆弱性が連なった経路を示します。悪意ある攻撃者がこれらを足掛かりにして不正アクセスを得たり、権限を昇格させたり、クラウド環境の機密データを侵害したりする可能性があります。既定では、すべての攻撃パスが Security Inbox に一覧表示されます。

Security Inbox は、Inbox に表示する検出結果を決定する際に、次の検出済みリスクも考慮します:

- **Public accessibility**: 公開されているリソースはリスクが高く、脆弱性や誤設定が含まれる場合は特に危険です。詳しくは、[Datadog がリソースを Publicly Accessible と判断する方法][6] を参照してください。
- **Privileged access**: 特権アクセスを持つリソースは、高い権限によって攻撃対象領域が拡大し得るため、リスクが高まります。
- **Under attack**: 不審なセキュリティ アクティビティが発生しているリソースはリスクが高まります。過去 15 日以内にそのリソースでセキュリティ シグナルが検出された場合、リソースは "Under Attack" としてフラグ付けされます。
- **Exploit available**: 公開エクスプロイトが存在する脆弱性はリスクが高まります。公開エクスプロイトの有無は、[cisa.gov][7]、[exploit-db.com][8]、[nvd.nist.gov][9] などの複数のエクスプロイト データベースで確認します。
- **In production**: 本番環境にある脆弱性はリスクが高まります。環境は `env` と `environment` タグから算出されます。

## Security Inbox の優先度付けの仕組み

Security Inbox は、まず検出結果の重大度を評価し、次に相関するリスクの数、最後に影響を受けるリソースとサービスの数を考慮して、課題をランク付けします。

- **Severity (Critical, High, Medium, and Low)**: 重大度は、クラウドの誤設定とアイデンティティ リスクでは [Datadog Security Scoring Framework][10] により、脆弱性では CVSS 3.1 により決定されます。
- **Number of detected risks**: 2 つの検出結果の重大度が同じ場合は、検出されたリスク数が多いほうが優先されます。
- **Number of impacted resources and services**: 重大度と検出されたリスク数がどちらも同じ場合は、影響を受けるリソースとサービス数が多い検出結果が優先されます。

**注**: 検出結果の種類、検出されたリスクの種類、影響を受けるリソースの種類は、優先度付けには影響しません。

## セキュリティ コンテキスト マップを使って脆弱性を特定・軽減する

[Attack Paths](#types-of-findings-in-security-inbox) 向けのセキュリティ コンテキスト マップは、侵害につながりうるポイントを特定し、対処するための全体像を提供します。攻撃者が悪用し得る、連鎖した誤設定、権限の抜け穴、脆弱性を効果的にマッピングします。

主な機能:

- **リスク評価**: マップにより、セキュリティ チームは脆弱性や誤設定がもたらす影響を俯瞰できます。アクセス経路や権限などのセキュリティ ポリシーを更新すべきかどうかの判断や、露出によるコンプライアンス上の影響 (特に、影響範囲内に機密データが含まれる場合) の把握に役立ちます。
- **即時対応のための実用的なコンテキスト**: マップにはサービス オーナー情報などの関連コンテキストが含まれており、チームは状況に基づいてリアルタイムに判断できます。統合ワークフローの実行、セキュリティ課題リンクの共有、リソースの AWS console view へのアクセスなどを、ツールを切り替えることなくマップ上から直接行えます。

{{< img src="security/security_context_map.png" alt="重要な誤設定があり、Publicly Accessible な AWS EC2 インスタンスを示すセキュリティ コンテキスト マップ" width="100%">}}

## Security Inbox をカスタマイズして重要な課題を強調する

Automation Pipelines を使用すると、Security Inbox をカスタマイズするルールを設定し、組織にとって重要な課題を目立たせることができます。こうした自動ルールを構成することで、新たに見つかった脆弱性の管理を効率化し、トリアージと修復を大規模に強化できます。Automation Pipelines と Add to Security Inbox ルールを併用することで、次のようにセキュリティ運用を最適化できます:

- **既定で拾えない課題を再表示**: 既定またはカスタムの検知ルールでは見落とされ得る課題を強調し、重要な問題を取りこぼさないようにします。
- **コンプライアンスを強化し、重要システムの懸念に対処**: 重大度に関わらず、法規制対応や重要な業務システムに影響する懸念へ対応します。
- **現在のリスクを優先**: インシデント後のアイデンティティ リスクや、業界全体で問題となっている脆弱性など、差し迫った脅威にフォーカスします。

詳細は [Automation Pipelines][11] と [Add to Security Inbox Rules][12] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/?category=all#all
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/cloud_security_management/identity_risks/
[4]: /ja/security/code_security/software_composition_analysis
[5]: /ja/security/code_security/iast
[6]: /ja/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /ja/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /ja/security/automation_pipelines/
[12]: /ja/security/automation_pipelines/security_inbox