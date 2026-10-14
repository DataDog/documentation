---
aliases:
- /ja/agent/guide/operator-eks-addon
description: Datadog Operator を EKS アドオンとして使用して、Amazon EKS に Datadog Agent をインストールして構成します。
further_reading:
- link: agent/kubernetes/log
  tag: ドキュメント
  text: Datadog と Kubernetes
title: Datadog Operator アドオンを使用して Amazon EKS へ Datadog Agent をインストールする
---
<div class="alert alert-info">v0.1.9 以降、Datadog Operator アドオンは、Fargate インスタンスでのスケジュールされた Pod への自動 Agent サイドカー インジェクションをサポートしています。詳細については、<a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">こちらのガイド</a>を参照してください。
</div>


Amazon EKS クラスターに Datadog Agent をインストールするには、[Datadog Operator](/containers/datadog_operator) を
[Amazon EKS アドオン](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) としてインストールし、`DatadogAgent` マニフェストを適用します。

Operator アドオンを使用してインストールされた Agent は、EC2 インスタンスで実行されている Pod からのみデータを収集します。AWS Fargate で実行されている Pod については、[Amazon EKS on AWS Fargate のドキュメント][10] に従ってください。

通常の [Helm インストール][4] と比較して、アドオンとしてインストールする場合には次のような違いがあります。
* Operator のインストール時、イメージは EKS リポジトリからのみ取得されます。ユーザーがこれを変更することはできません。
* 上書き可能な Operator Helm Chart の値は、[スキーマ ファイル][3] に定義された項目に制限されます。

これらの制限は、Operator を EKS アドオン ポリシーに準拠させ、EKS がインストールの安全性を確保し、アドオン環境で未サポートの機能を無効化するために必要です。

## 前提条件{#prerequisites}

* [Datadog Operator][1] 製品のサブスクリプション
* kubectl がインストールされていること
* コマンドラインインターフェイスでアドオンを設定する場合は、[AWS CLI](https://aws.amazon.com/cli/) がインストールされていること

## Operator のインストール {#installing-operator}

{{< tabs >}}
{{% tab "コンソール" %}}

* AWS コンソールで対象の EKS クラスターに移動します。
*  [Add-ons] (アドオン) タブで [*Get more add-ons*] (他のアドオンを取得) を選択します。
* *Datadog Operator* を検索して選択します。その後、画面の指示に従ってインストールを完了します。

{{% /tab %}}
{{% tab "CLI" %}}

Operator アドオンをインストールするには、次のコマンドを実行します。
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

アドオンのインストールは非同期で行われます。インストール状況をチェックするには、次のコマンドを実行します。
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

インストールが成功したかどうかを確認するには、AWS Management Console、`eksctl`、または AWS CLI を使用して `datadog-operator` Pod が稼働していることを確認します。

## Agent の構成 {#configuring-the-agent}

Operator アドオンをインストールしたら、Datadog Agent のセットアップを行います。

`DatadogAgent` カスタム リソースを使用して Datadog Agent を設定する手順に従います。

1. デフォルトで `datadog-agent` となる Operator のインストール ネームスペースに切り替えます。
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. [Datadog API キーとアプリケーションキー][5] を含む Kubernetes Secret を作成します。
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を、お使いの [Datadog API キーとアプリケーションキー][5] に置き換えます。


3. `DatadogAgent` デプロイメント構成の仕様を使用して `datadog-agent.yaml` ファイルを作成します。Datadog Operator はデフォルトの Agent および Cluster Agent イメージ設定を使用し、パブリック レジストリからそれらを取得します。

   プライベート EKS レジストリからイメージを取得する場合は、`global.registry` を追加できます。以下の構成では、メトリクス、ログ、APM が有効になります。
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
   この Agent インスタンス構成は、AWS Marketplace でホストされている ECR リポジトリから Datadog Agent イメージを取得します。このリポジトリには、Datadog Operator Amazon EKS アドオンのイメージも含まれています。代替手段が必要な場合は、上記のマニフェストの 'global.registry' エントリを編集してください。

   すべての構成オプションについては、[Operator 構成仕様][6] を参照してください。

   **注:** ノードで IMDS v1 へのアクセスがブロックされている場合、Agent はクラスター名を解決できず、特定の機能 ([Orchestrator Explorer][6] など) が動作しません。そのため、Datadog では `DatadogAgent` マニフェストに `spec.global.ClusterName` を追加することを推奨しています。IMDS v2 を使用してメタデータを要求するように Agent を構成する方法については、[Agent 構成ファイルの例][8] の `ec2_prefer_imdsv2` パラメーターを参照してください。

4. Datadog Agent をデプロイします。
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Operator のアンインストール {#uninstall-the-operator}

Agent と Operator をアンインストールするには、まず `DatadogAgent` カスタム リソースを削除します。

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

すべての Agent リソースが削除されたことを確認したうえで、アドオンのアンインストールを実行します。

{{< tabs >}}
{{% tab "コンソール" %}}

* AWS コンソールで対象の EKS クラスターに移動します。
* [Add-ons] (アドオン) タブに移動し、*Datadog Operator* アドオンを選択します。
* [**Remove**] (削除) をクリックし、確認ダイアログで確定します。

{{% /tab %}}
{{% tab "CLI" %}}

アドオンを削除するには、次のコマンドを実行します。
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **注:** `DatadogAgent` カスタムリソースを削除する前に Operator アドオンをアンインストールすると、Agent は引き続きクラスターで実行されます。`DatadogAgent` は、実行中の Operator がないと完了できないため、ネームスペースの削除は失敗します。回避策については、この Github [issue][9] を参照してください。


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /ja/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/ja/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /ja/integrations/eks_fargate/#setup