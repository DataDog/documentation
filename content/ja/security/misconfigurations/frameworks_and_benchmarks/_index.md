---
aliases:
- /ja/security_platform/cspm/frameworks_and_benchmarks
- /ja/security/cspm/frameworks_and_benchmarks
further_reading:
- link: security/cspm/setup
  tag: ドキュメント
  text: CSM Misconfigurations の概要
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの CSM Misconfigurations クラウド構成コンプライアンスルールを調べる
- link: security/cspm/findings
  tag: ドキュメント
  text: 誤構成の検索と調査
kind: ドキュメント
title: CI/CD インテグレーション
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Security Management Misconfigurations はサポートされていません。</div>
{{< /site-region >}}

CSM Misconfigurations には、クラウドリソースの構成を評価し、潜在的な誤構成を特定する 1,000 以上のコンプライアンスルールがすぐに使える状態で提供されています。各[コンプライアンスルール][1]は、コンプライアンス基準または業界ベンチマーク内の 1 つまたは複数のコントロールに対応します。詳細については、[サポートされているフレームワーク][2]を参照してください。

## コンプライアンス状況の表示

CSM Misconfigurations [Compliance][20] のページで、各フレームワークのコンプライアンス状況の概要を確認できます。

- **Framework Overview**: フレームワークの要件やルールに対するスコアを知ることができる[詳細レポート](#explore-compliance-framework-reports)。
- **Explore Resources**: 選択したフレームワークに対する誤構成を含むリソースを表示する、**Misconfigurations** ページのフィルター表示。
- **Configure Rules**: 各フレームワークのコンプライアンスルールを変更することで、環境のスキャン方法や通知先をカスタマイズすることができます。

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="CSM Misconfigurations Compliance ページのコンプライアンスレポートのセクションでは、コンプライアンス状況の概要が表示されます" style="width:100%;">}}

## コンプライアンスフレームワークレポートを見る

コンプライアンスフレームワークレポートでは、お客様の環境でどのルールが失敗しているのか、誤構成されたリソースの詳細とともに表示されます。

レポート上部のサマリーには、合/否の誤構成を持つルールの数、重大度の高いルール違反の上位 3 つ、重大度に基づくルールの詳細な内訳が表示されます。また、時間セレクタで過去のポスチャを調べたり、レポートの PDF をダウンロードしたり、アカウント、チーム、サービス、環境のタグでページをフィルタリングすることもできます。

サマリーの下には、フレームワークに関連するすべてのルールの完全なリストが、要件とコントロールごとに整理されており、ルールによってチェックされたリソースの数と失敗の割合も表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/cis_aws_compliance_report_2.png" alt="CIS の AWS コンプライアンスフレームワークレポートは、重大なルールの失敗に関する詳細を提供します" style="width:100%;">}}

ルールを選択すると、誤構成されたリソースの詳細、ルールの説明、フレームワークまたは業界ベンチマークへのマッピング、および推奨される改善手順が表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/failed-finding2.png" alt="コンプライアンスルールのサイドパネルには、ルールに関する情報と、不合格になった誤構成のリソースが含まれています" style="width:75%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/default_rules/
[2]: /ja/security/misconfigurations/supported_frameworks
[11]: /ja/security/cloud_siem/
[12]: /ja/integrations/amazon_cloudtrail/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /ja/integrations/slack/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/pagerduty
[17]: /ja/integrations/servicenow/
[18]: /ja/integrations/microsoft_teams/
[19]: /ja/integrations/webhooks/
[20]: https://app.datadoghq.com/security/compliance/homepage
[21]: /ja/security/misconfigurations/detection_rules
[26]: /ja/security/misconfigurations/custom_rules/#tagging-findings
[27]: https://app.datadoghq.com/security/compliance
[28]: /ja/dashboards/template_variables/
[29]: /ja/api/latest/security-monitoring/#update-an-existing-rule