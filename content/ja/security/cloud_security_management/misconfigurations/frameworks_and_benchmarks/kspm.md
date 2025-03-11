---
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの CSM Misconfigurations クラウド構成検知ルールを確認する
- link: /security/misconfigurations/custom_rules
  tag: ドキュメント
  text: カスタムルールを作成する
title: Kubernetes Security Posture Management
---

Kubernetes Security Posture Management (KSPM) は、[CIS][1] で定義されている業界ベストプラクティスや、独自のカスタム検知ポリシー などに基づいて、Kubernetes デプロイのセキュリティポスチャーを積極的に強化するのに役立ちます。これは、Cloud Security Management (CSM) の一機能として提供されています。

## KSPM のセットアップ

KSPM を最大限に活用するには、Datadog Agent とクラウドインテグレーションの両方をインストールする必要があります。詳細な手順については、以下の記事を参照してください。

- CSM Enterprise ([Agent][14] および[クラウドインテグレーション][15])
- CSM Pro ([Agent][12] および[クラウドインテグレーション][13])

これにより、Datadog は以下のリソースタイプごとに Kubernetes デプロイのリスクを検出できるようになります。

| リソースタイプ            | インストール方法    | フレームワーク        |
|--------------------------|-------------------|------------------|
| `aws_eks_cluster`        | クラウドインテグレーション | `cis-eks`        |
| `aws_eks_worker_node`    | Agent             | `cis-eks`        |
| `azure_aks_cluster`      | クラウドインテグレーション | `cis-aks`        |
| `azure_aks_worker_node`  | Agent             | `cis-aks`        |
| `kubernetes_master_node` | Agent             | `cis-kubernetes` |
| `kubernetes_worker_node` | Agent             | `cis-kubernetes` |

## Kubernetes デプロイ全体のリスクをモニタリングする

KSPM を使用すると、Datadog は 50 件以上のすぐに使える Kubernetes 検知ルールによって定義されたリスクに対して、環境をスキャンします。あるルールで定義されているケースが一定期間に少なくとも 1 つ一致すると、[通知アラートが送信][6]され、[Misconfigurations Explorer][11] に検出結果が生成されます。

各検出結果には、問題の影響を特定するために必要なコンテキスト情報 (リソースの完全な設定、リソースレベルのタグ、インフラストラクチャー内の他のコンポーネントとの関係マップなど) が含まれています。問題とその影響範囲を把握したら、CSM 内から [Jira チケットを作成][7]したり、[あらかじめ定義されたワークフローを実行][8]したりして、問題の修正を開始できます。

**注**: [API を使ってプログラム的に検出結果を操作する][10]ことも可能です。

{{< img src="security/csm/kspm_finding.png" alt="EKS Cluster がパブリックアクセスを制限すべきというルールにおける高リスクの検出結果詳細パネル" width="80%">}}

## 業界標準フレームワークに対する Kubernetes セキュリティポスチャーの評価

CSM は、[セキュリティポスチャースコア][2]を提供します。このスコアにより、クラウドおよびインフラストラクチャーのすべてのすぐに使える検知ルールが有効になっているかどうかを示す一つの指標として、セキュリティおよびコンプライアンスのステータスを把握できます。このスコアは、組織全体、あるいは特定のチーム・アカウント・環境 (Kubernetes デプロイを含む) ごとに取得可能です。

セキュリティポスチャースコアの仕組みについて詳しくは、[セキュリティポスチャースコア][3]を参照してください。

### Kubernetes デプロイのセキュリティポスチャースコアを表示する

Kubernetes デプロイのセキュリティポスチャースコアを表示するには、[**Security** > **Compliance**][9] ページに移動し、CIS Kubernetes フレームワークのレポートを探します。

### Kubernetes フレームワークの詳細レポートを表示する

フレームワークの要件およびルールに対するスコアを詳しく確認できる詳細レポートを表示するには、**Framework Overview** をクリックします。フレームワークページでは、レポートを PDF 形式でダウンロードしたり、CSV としてエクスポートしたりできます。

{{< img src="security/csm/kubernetes_posture_score.png" alt="CIS Kubernetes コンプライアンスレポートページにおける 64% のポスチャースコア" width="100%">}}

## 独自の Kubernetes 検知ルールを作成する

すぐに使える検知ルールに加えて、既存のルールをクローンしたり、新規に作成したりして、独自の Kubernetes 検知ルールを作成することも可能です。ルールは [Rego ポリシー言語][4]で記述されます。Rego は柔軟性の高い Python 風の言語で、検知ルールの業界標準として広く使用されています。詳しくは、[Rego によるカスタムルールの作成][5]を参照してください。

検知ルールの作成後は、重大度 (`Critical`、`High`、`Medium`、`Low`、または `Info`) をカスタマイズし、新しい検出結果が検出された際に通知する[リアルタイム通知アラートを設定][6]することができます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisecurity.org/cis-benchmarks
[2]: /ja/security/cloud_security_management#track-your-organizations-health
[3]: /ja/glossary/#security-posture-score
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/
[5]: /ja/security/cloud_security_management/guide/writing_rego_rules/
[6]: /ja/security/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[7]: /ja/security/cloud_security_management/review_remediate/jira
[8]: /ja/security/cloud_security_management/review_remediate/workflows
[9]: https://app.datadoghq.com/security/compliance/home
[10]: /ja/api/latest/security-monitoring/#list-findings
[11]: https://app.datadoghq.com/security/compliance
[12]: /ja/security/cloud_security_management/setup/csm_pro/agent/kubernetes
[13]: /ja/security/cloud_security_management/setup/csm_pro/cloud_accounts
[14]: /ja/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes
[15]: /ja/security/cloud_security_management/setup/csm_enterprise/cloud_accounts