---
title: Connect an Azure AKS Cluster with Cloudcraft
---

Azure AKS クラスターをスキャンすることで、Cloudcraft はシステムアーキテクチャ図を生成し、デプロイされたワークロードとポッドの視覚化をサポートします。

Cloudcraft は Azure の Kubernetes Service クラスターユーザーロールを使用しており、クラスターの内部を見るための特別なソフトウェアやエージェントは必要ありません。

<div class="alert alert-info">Azure AKS クラスター および Azure アカウントをスキャンする機能は、Cloudcraft Pro の契約者のみが利用できます。詳細については、<a href="https://www.cloudcraft.co/pricing">Cloudcraft の料金ページを</a>参照してください。</div>

## 前提条件

Azure AKS クラスターを Cloudcraft に接続する前に、まず Azure アカウントを接続し、クラスターを含めた構成図を生成する必要があります。詳細については、[Azure アカウントを Cloudcraft に接続する][1]を参照してください。

## Cloudcraft IAM ユーザーを読み取り専用に認可する

まず、既存の Azure AKS クラスターでブループリントを開くか、**自動レイアウト**機能を使用して、新しいブループリントを生成します。

Azure 環境をブループリントにマッピングした状態で、スキャンしたい Azure AKS クラスターを選択し、コンポーネントツールバーに表示される **Enable cluster scanning** ボタンをクリックします。

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an Azure AKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

次の画面では、Azure で実行する手順が順を追って表示されます。

1. 最初のリンクをクリックして Azure Subscriptions ページを開き、左サイドバーの **Access control (IAM)** をクリックします。
2. **Add** をクリックし、**Add role assignment** を選択します。
3.  **Azure Kubernetes Service Cluster User Role** を検索して選択し、**Next** をクリックします。
4. **Select members** をクリックします。
5. Azure AKS クラスターへのアクセスを許可したい IAM ユーザー (通常は cloudcraft という名前) を検索し、**Select** をクリックします。
6. **Review + assign** を 2 回クリックしてプロセスを完了させます。

## クラスターへのアクセスをテストする

Cloudcraft がクラスターにアクセスできることをテストするには、**Enable Kubernetes Cluster Scanning** 画面の一番下にある **Test cluster access** をクリックします。

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="手順と Test Cluster Access ボタンが表示された Cloudcraft の Enable Kubernetes Cluster Scanning インターフェースのスクリーンショット。" responsive="true" style="width:100%;">}}

[1]: /ja/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/