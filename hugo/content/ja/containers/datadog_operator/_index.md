---
aliases:
- /ja/agent/kubernetes/operator_configuration
- /ja/containers/kubernetes/operator_configuration
description: Datadog Operator を使用して Kubernetes に Datadog Agent をデプロイおよび管理する
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: ガイド
  text: Datadog Operator の概要
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: ソースコード
  text: 'Datadog Operator: 高度なインストール'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: ソースコード
  text: 'Datadog Operator: 構成'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Datadog Operator と Admission Controller を使用してアプリケーションをインスツルメントする
title: Datadog Operator
---
[Datadog Operator][1] は、Kubernetes 環境に Datadog Agent をデプロイし、構成することができるオープンソースの [Kubernetes Operator][2] です。

Operator を使用することで、単一の Custom Resource Definition (CRD) を使用して、ノードベースの Agent、[Cluster Agent][3]、[クラスターチェックランナー][4]をデプロイすることができます。Operator は、デプロイのステータス、健全性、およびエラーを Operator の CRD のステータスで報告します。Operator はより高度な構成オプションを使用するため、誤構成のリスクを制限できます。

Agent をデプロイすると、Datadog Operator は次のことを提供します。

- Agent 構成の検証
- すべての Agent が構成を常に把握できるようにする
- Agent リソースの作成と更新のためのオーケストレーション
- Operator の CRD ステータスに Agent の構成ステータスを報告する
- Per-node-group Agent configuration from a single resource with [DatadogAgentProfiles][10]
- クラスター [provider][11] の自動検出により、Amazon EKS や Red Hat OpenShift でのコントロールプレーン監視など、一致する構成が適用されます。
- Fleet Automation（プライベートプレビュー）によるリモート管理です。

### Helm チャートや DaemonSet ではなく、Datadog Operator を使用する理由{#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

Datadog Agent は、[`datadog` Helm チャート][9] または DaemonSet を使用してインストールすることもできます。新規デプロイメントには Datadog Operator を推奨します。

Helm と Datadog Operator では、Agent の管理方法が異なります。Helm は、インストール時およびアップグレード時に `values.yaml` ファイルから Agent の Kubernetes オブジェクトをレンダリングします。Datadog Operator はコントローラーを実行し、インストール時だけでなく継続的に、単一の `DatadogAgent` カスタムリソースを目的の状態に向けて調整します。

Datadog Operator は、Helm チャートにはない機能も提供します。例えば、[DatadogAgentProfiles][10] を使用すると、1 つのリソースから異なるノードグループに異なる構成を適用できますが、Helm ではノードグループごとに手動でアフィニティルールを作成し、個別のチャートリリースが必要です。

Datadog Operator v1.29.0 以降では、主要なクラウドプロバイダーにおいて Datadog Operator が Helm チャートと同等の機能を実現しているため、Datadog Operator を選択しても機能が損なわれることはありません。また、Helm チャートが公開されていないネイティブプラットフォームのカタログ（Red Hat OperatorHub、[Amazon EKS アドオン][12]、[Google Cloud Marketplace][13]）を通じてインストールやアップグレードを行うことも可能です。

Datadog Operator が環境に適さない場合（Talos や Flatcar など、Datadog Operator がまだサポートしていないプラットフォーム）、Google Distributed Cloud (GDC) 上の GKE を使用している場合、または Datadog Operator が提供していない Helm の機能が必要な場合は、`datadog` Helm チャートを使用してください。Datadog Operator がサポートするプラットフォームとプロバイダーについては、[プロバイダーのドキュメント][11]を参照してください。

Datadog は、DaemonSet を使用して Agent をデプロイすることを完全にサポートしていますが、手動で DaemonSet を構成するとエラーが発生する可能性が高いため、推奨されません。

## 使用方法 {#usage}

Operator を使用して Datadog Agent をデプロイする方法については、[Datadog Operator の概要][6]のガイドを参照してください。

全てのインストールと構成オプションについては、[`datadog-operator`][1] リポジトリにある詳細な[インストール][7]と[構成][8]のページを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /ja/containers/cluster_agent
[4]: /ja/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /ja/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[9]: /ja/containers/kubernetes/installation?tab=helm
[10]: /ja/containers/datadog_operator/datadog_agent_profiles
[11]: /ja/containers/datadog_operator/providers
[12]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[13]: https://console.cloud.google.com/marketplace/product/datadog-saas/datadog