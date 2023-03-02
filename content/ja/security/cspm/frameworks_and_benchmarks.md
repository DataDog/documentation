---
aliases:
- /ja/security_platform/cspm/frameworks_and_benchmarks
further_reading:
- link: security/cspm/getting_started
  tag: ドキュメント
  text: CSPM の概要
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの Posture Management クラウド構成検出ルールを調べる
- link: security/cspm/findings
  tag: Documentation
  text: CSPM 検出結果を検索および調査
kind: documentation
title: コンプライアンスレポート
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) には、クラウドリソースの構成を評価し、潜在的な誤構成を特定する 400 以上の検出ルールがすぐに使える状態で提供されています。各[検出ルール][1]は、以下のコンプライアンス基準および業界ベンチマーク内の 1 つまたは複数のコントロールに対応します。

- [CIS AWS Foundations ベンチマーク v1.3.0*][2]
- [CIS Azure Foundations ベンチマーク v1.3.0][3]
- [CIS GCP Foundations ベンチマーク v1.3.0][22]
- [CIS Docker ベンチマーク v1.2.0][4]
- [CIS Kubernetes ベンチマーク v1.5.1**][5]
- [PCI DSS v3.2.1][6]
- [AICPA SOC 2][7]
- [ISO/IEC 27001 v2][8]
- [HIPAA][9]
- [GDPR][10]

*[CIS AWS Foundations ベンチマーク][2]のモニタリングセクションに合格するには、 [Cloud SIEM][11] を有効にし、[Cloudtrail を Datadog][12] へ転送する **必要があります**。

**一部の [CIS Kubernetes ベンチマーク][5]の検出ルールは、セルフホスト型の Kubernetes クラスターにのみ適用されます。

Datadog はまた、Datadog の社内セキュリティ専門家が開発した推奨事項である Essential Cloud Security Controls も提供しています。このルールセットは、Datadog で観測した一般的なクラウドセキュリティリスクに基づいており、クラウドセキュリティに初めて取り組むユーザーが、クラウド環境全体で影響力の大きい誤構成を容易に修正できるようにすることを目的としています。

**注**: CSPM は、リソースが特定の検出ルールに基づいて構成されているかを可視化します。これらのルールは、さまざまな規制フレームワーク、ベンチマーク、標準（"セキュリティポスチャフレームワーク"）などに対応します。CSPM はセキュリティポスチャフレームワークへの実際のコンプライアンスを評価するものでありません。また、検出ルールは特定のフレームワークに関するコンフィギュレーション設定のすべてに対応するわけではありません。CSPM を導入する際には、法律顧問やコンプライアンスの専門家と相談することが推奨されます。

## コンプライアンス状況の表示

CSPM [概要][20]のページで、各フレームワークのコンプライアンス状況の概要を確認できます。

- **Framework Overview**: フレームワークの要件やルールに対するスコアを知ることができる[詳細レポート](#explore-compliance-framework-reports)。
- **Explore Resources**: 選択したフレームワークに対する所見を含むリソースを表示する、** Findings** ページのフィルター表示。
- **Configure Rules**: 各フレームワークの検出ルールを変更することで、環境のスキャン方法や通知先をカスタマイズすることができます。

{{< img src="security/cspm/frameworks_and_benchmarks/compliance-reports-overview.png" alt="CSPM 概要ページのコンプライアンスレポートのセクションでは、コンプライアンス状況の概要が表示されます" style="width:100%;">}}

## コンプライアンスフレームワークレポートを見る

コンプライアンスフレームワークレポートでは、お客様の環境でどのルールが失敗しているのか、誤構成されたリソースの詳細とともに表示されます。

レポート上部のサマリーには、Pass/Fail の結果が出たルールの数、重大度の高いルール失敗の上位 3 つ、重大度に基づくルールの詳細な内訳が表示されます。また、時間セレクタで過去の姿勢を調べたり、レポートの PDF をダウンロードすることも可能です。

サマリーの下には、フレームワークに関連するすべてのルールの完全なリストが、要件とコントロールごとに整理されており、ルールによってチェックされたリソースの数と失敗の割合も表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/report-2.png" alt="CIS の AWS コンプライアンスフレームワークレポートは、重大なルールの失敗に関する詳細を提供します" style="width:100%;">}}

ルールを選択すると、誤構成されたリソースの詳細、ルールの説明、フレームワークまたは業界ベンチマークへのマッピング、および推奨される改善手順が表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding.png" alt="検出ルールのサイドパネルには、ルールに関する情報と、失敗した検出結果のリソースが含まれています" style="width:75%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /ja/security/cloud_siem/
[12]: /ja/integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules/
[14]: /ja/integrations/slack/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/pagerduty
[17]: /ja/integrations/servicenow/
[18]: /ja/integrations/microsoft_teams/
[19]: /ja/integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /ja/security/cspm/detection_rules
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform