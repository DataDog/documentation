---
aliases:
- /ja/agent/kubernetes/operator_configuration
- /ja/containers/kubernetes/operator_configuration
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: ガイド
  text: Datadog Operator の概要
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Datadog Operator: 高度なインストール'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Datadog Operator: 構成'
kind: documentation
title: Datadog Operator
---

[Datadog Operator][1] は、Kubernetes 環境に Datadog Agent をデプロイし、構成することができるオープンソースの [Kubernetes Operator][2] です。

Operator を使用することで、単一の Custom Resource Definition (CRD) を使用して、ノードベースの Agent、[Cluster Agent][3]、[クラスターチェックランナー][4]をデプロイすることができます。Operator は、デプロイのステータス、健全性、およびエラーを Operator の CRD のステータスで報告します。Operator はより高度な構成オプションを使用するため、誤構成のリスクを制限できます。

Agent をデプロイすると、Datadog Operator は次のことを提供します。

- Agent 構成の検証
- すべての Agent が構成を常に把握できるようにする
- Agent リソースの作成と更新のためのオーケストレーション
- Operator の CRD ステータスに Agent の構成ステータスを報告する
- オプションとして、Datadog の [ExtendedDaemonSet][5] を使用した高度な DaemonSet のデプロイメントを使用することができます

### Helm チャートや DaemonSet ではなく、Datadog Operator を使用する理由は何ですか？

Kubernetes に Datadog Agent をインストールするために、Helm チャートまたは DaemonSet を使用することも可能です。しかし、Datadog Operator を使用することで、以下のような利点があります。

- Operator には、Datadog のベストプラクティスに基づくデフォルトが組み込まれています。
- Operator の構成は、将来の機能拡張に対応できるよう、より柔軟になっています。
- [Kubernetes Operator][2] として、Datadog Operator は Kubernetes API でファーストクラスのリソースとして扱われます。
- Helm チャートとは異なり、Operator は Kubernetes の Reconciliation Loop に含まれます。

Datadog は、DaemonSet を使用して Agent をデプロイすることを完全にサポートしていますが、手動で DaemonSet を構成すると、エラーが発生する可能性が高くなります。そのため、DaemonSet の使用はあまり推奨されません。

## 使用方法

Operator を使用して Datadog Agent をデプロイする方法については、[Datadog Operator の概要][6]のガイドを参照してください。

全てのインストールと構成オプションについては、[`datadog-operator`][1] リポジトリにある詳細な[インストール][7]と[構成][8]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /ja/containers/cluster_agent
[4]: /ja/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /ja/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md