---
aliases:
- /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/kspm/
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: 標準の Cloud Security Misconfigurations クラウド構成検知ルールを確認する
- link: /security/misconfigurations/custom_rules
  tag: ドキュメント
  text: カスタム ルールを作成する
title: Kubernetes セキュリティ ポスチャー管理
---

Cloud Security の Kubernetes Security Posture Management (KSPM) は、[CIS][1] で定義されるような確立された業界のベスト プラクティス、または独自の [カスタム検知ポリシー](#create-your-own-kubernetes-detection-rules) を基準に環境をベンチマークし、Kubernetes デプロイメントのセキュリティ態勢を先回りして強化するのに役立ちます。

## KSPM のセットアップ

KSPM を最大限に活用するには、Datadog Agent と Cloud Integrations の両方をインストールする必要があります。手順の詳細は、次の記事を参照してください。

- [Agent 上で Cloud Security をデプロイする][12]
- [Cloud Integrations 経由で Cloud Security をデプロイする][13]

これにより Datadog は、次のリソース タイプごとに Kubernetes デプロイメントのリスクを検出できるようになります。

| リソース タイプ                     | インストール方法    | フレームワーク        |
|-----------------------------------|-------------------|------------------|
| `aws_eks_cluster`                 | Cloud integration | `cis-eks`        |
| `aws_eks_worker_node`             | Agent             | `cis-eks`        |
| `azure_aks_cluster`               | Cloud integration | `cis-aks`        |
| `azure_aks_worker_node`           | Agent             | `cis-aks`        |
| `gcp_kubernetes_engine_cluster`   | Cloud integration | `cis-gke`        |
| `gcp_kubernetes_engine_node_pool` | Cloud integration | `cis-gke`        |
| `gcp_gke_worker_node`             | Agent             | `cis-gke`        |
| `kubernetes_master_node`          | Agent             | `cis-kubernetes` |
| `kubernetes_worker_node`          | Agent             | `cis-kubernetes` |

## Kubernetes デプロイメント全体のリスクを監視する

KSPM を使うと、Datadog は 50 件以上の標準 Kubernetes 検知ルールで定義されたリスクを対象に、環境をスキャンします。一定期間のうちにルールで定義されたケースのいずれかに一致すると、[通知アラートが送信され][6]、[Misconfigurations explorer][11] に検出結果 (finding) が生成されます。

各検出結果には、影響を見極めるために必要なコンテキストが含まれます。たとえば、リソースの完全な構成、リソース レベルのタグ、そしてインフラ内の他コンポーネントとの関係を示すマップなどです。問題とその影響を把握したら、Cloud Security 内から [Jira チケットを作成][7] する、または [事前定義済みワークフローを実行][8] して、是正対応を進められます。

**注**: [API から検出結果をプログラムで操作する][10] こともできます。

{{< img src="security/csm/kspm_finding_1.png" alt="「EKS Cluster should have public access limited」ルールで Medium の重大度として検出された検出結果の詳細パネル" width="80%">}}

## 業界標準フレームワークに照らして Kubernetes のセキュリティ態勢を評価する

Cloud Security では、単一の指標でセキュリティとコンプライアンスの状況を把握できる [セキュリティ ポスチャー スコア][2] を提供しています。スコアは、有効になっている標準のクラウド / インフラ検知ルールをすべて満たしている環境の割合を表します。組織全体はもちろん、チーム / アカウント / 環境単位でも取得でき、Kubernetes デプロイメントも対象に含まれます。

セキュリティ ポスチャー スコアの仕組みについて詳しくは、[セキュリティ ポスチャー スコア][3] を参照してください。

### Kubernetes デプロイメントのセキュリティ ポスチャー スコアを表示する

Kubernetes デプロイメントのセキュリティ ポスチャー スコアを確認するには、[**Security** > **Compliance**][9] ページに移動し、CIS Kubernetes フレームワーク レポートを探してください。

### Kubernetes フレームワークの詳細レポートを表示する

フレームワークをクリックすると、要件やルールに対してどの程度準拠しているかを示す詳細レポートを確認できます。フレームワーク ページでは、レポートを PDF としてダウンロードするか、CSV としてエクスポートできます。

{{< img src="security/csm/kubernetes_posture_score_3.png" alt="全体のポスチャー スコアが 64% の CIS Kubernetes コンプライアンス レポート ページ" width="100%">}}

## 独自の Kubernetes 検知ルールを作成する

標準の検知ルールに加えて、既存ルールをクローンするか、新規ルールを一から作成することで、独自の Kubernetes 検知ルールを用意できます。ルールは、検知ルール向けの業界標準として使われている柔軟な Python 風言語、[Rego ポリシー言語][4] で記述します。詳しくは、[Rego でカスタム ルールを書く][5] を参照してください。

検知ルールを作成したら、重大度 (`Critical`、`High`、`Medium`、`Low`、`Info`) を調整し、[リアルタイム通知のアラートを設定する][6] ことで、新しい検出結果が検知されたタイミングで通知できます。

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
[12]: /ja/security/cloud_security_management/setup/agent/
[13]: /ja/security/cloud_security_management/setup/cloud_integrations/