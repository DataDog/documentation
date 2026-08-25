---
aliases:
- /ja/agent/guide/operator-eks-addon
further_reading:
- link: agent/kubernetes/log
  tag: ドキュメント
  text: Datadog と Kubernetes
title: Datadog Operator アドオンによる Amazon EKS への Datadog Agent のインストール
---

<div class="alert alert-info">v0.1.9 以降、Datadog Operator アドオンは Fargate インスタンス上にスケジュールされた Pod への Agent サイドカー自動挿入をサポートしています。詳細は<a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">こちらのガイド</a>を参照してください。
</div>


Amazon EKS クラスターに Datadog Agent をインストールするには、[Datadog Operator](/containers/datadog_operator) を [Amazon EKS アドオン](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)として導入し、`DatadogAgent` マニフェストを適用します。 

Operator アドオンでインストールした Agent は、EC2 上で動作している Pod からのみデータを収集します。AWS Fargate 上で動作する Pod については [Amazon EKS on AWS Fargate のドキュメント][10]を参照してください。

通常の [Helm インストール][4]と比較して、アドオンとしてインストールする場合には次のような違いがあります。
* Operator のインストール時、イメージは EKS リポジトリからのみ取得されます。ユーザーが変更することはできません。 
* 上書き可能な Operator Helm Chart の値は、[スキーマ ファイル][3] に定義された項目に制限されます。 

これらの制限は、Operator を EKS アドオン ポリシーに準拠させ、EKS がインストールの安全性を確保し、アドオン環境で未サポートの機能を無効化するために必要です。

## 前提条件

* [Datadog Operator][1] 製品のサブスクリプション 
* kubectl がインストールされていること
* コマンドラインでアドオンを設定する場合は、[AWS CLI](https://aws.amazon.com/cli/) がインストールされていること 

## Operator のインストール

{{< tabs >}}
{{% tab "Console" %}}

* AWS コンソールで対象の EKS クラスターに移動します。 
* **Add-ons** タブで **Get more add-ons** を選択します。 
* **Datadog Operator** を検索して選択し、画面の指示に従ってインストールを完了します。 

{{% /tab %}}
{{% tab "CLI" %}}

Operator アドオンをインストールするには、次のコマンドを実行します:
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

インストールは非同期で行われます。状態を確認するには、次のコマンドを実行します:
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

インストールが成功したかどうかは、AWS Management Console、`eksctl`、または AWS CLI を使用して `datadog-operator` Pod が稼働していることを確認してください。

## Agent の設定

Operator アドオンをインストールしたら、Datadog Agent のセットアップを行います。

`DatadogAgent` カスタム リソースを使用して Agent を設定します。

1. デフォルトで `datadog-agent` となる Operator のインストール ネームスペースに切り替えます。
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. [Datadog API キーとアプリケーションキー][5]を含む Kubernetes Secret を作成します。
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][5]に置き換えます。


3. `DatadogAgent` デプロイ設定の内容で `datadog-agent.yaml` を作成します。Datadog Operator はデフォルトで公開レジストリから Agent および Cluster Agent イメージを取得します。

   プライベート EKS レジストリからイメージを取得したい場合は、`global.registry` を追加します。以下の構成では、メトリクス、ログ、および APM を有効にします。
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: <PRIVATE_EKS_REGISTRY_PATH>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     features:
       apm:
         enabled: true
       logCollection:
         enabled: true
   ```
   この例では、Datadog Operator EKS アドオンと同じ AWS Marketplace ホストの ECR リポジトリから Agent イメージを取得します。別のレジストリを使用する場合は 'global.registry' の値を変更してください。

   すべての設定オプションについては [Operator の設定仕様][6]を参照してください。

   **注**: ノードで IMDS v1 へのアクセスがブロックされている場合、Agent はクラスター名を解決できず、[Orchestrator Explorer][6] など一部機能が動作しません。そのため、`DatadogAgent` マニフェストに `spec.global.ClusterName` を追加することを推奨します。IMDS v2 を使用してメタデータを取得する設定方法は[こちらのコメント][8]を参照してください。

4. Datadog Agent をデプロイします。
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Operator のアンインストール

Agent と Operator をアンインストールするには、まず `DatadogAgent` カスタム リソースを削除します:

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

すべての Agent リソースが削除されたことを確認したうえで、アドオンのアンインストールを実行します。

{{< tabs >}}
{{% tab "Console" %}}

* AWS コンソールで対象の EKS クラスターに移動します。
* Add-ons タブで Datadog Operator アドオンを選択します。
* **Remove** をクリックし、確認ダイアログで確定します。

{{% /tab %}}
{{% tab "CLI" %}}

アドオンを削除するには、次のコマンドを実行します:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **注**: `DatadogAgent` カスタムリソースを削除する前に Operator アドオンをアンインストールした場合、Agent はクラスター上で動作し続けます。Operator が存在しないため `DatadogAgent` をファイナライズできず、ネームスペースの削除に失敗します。回避策については Github の [issue][9] を参照してください。


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /ja/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/ja/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/4896a45f586f74de1da2e985f98988f0181afc36/pkg/config/config_template.yaml#L407-L416
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /ja/integrations/eks_fargate/#setup