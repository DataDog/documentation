---
title: Amazon EKS クラスターを Cloudcraft に接続する
---

Amazon EKS クラスターをスキャンすることで、Cloudcraft はシステムアーキテクチャ図を生成し、デプロイされたワークロードとポッドの視覚化をサポートします。

Cloudcraft は、 [アクセス エントリ][1] を使用して、 [Cloudcraft の既存の読み取り専用 IAM エンティティ ロール][2] に Kubernetes API へのアクセスを付与します。Cloudcraft では、クラスターに特別なソフトウェアやエージェントをインストールする必要はありません。

<div class="alert alert-info">Amazon EKS クラスターおよび AWS アカウントをスキャンする機能は、Cloudcraft Pro の契約者のみが利用できます。詳細については、<a href="https://www.cloudcraft.co/pricing">料金ページを</a>ご覧ください。</div>

## 前提条件

Amazon EKS クラスターを Cloudcraft に接続する前に、まず AWS アカウントを接続し、クラスターを含めた構成図を作成する必要があります。

AWS アカウントを接続し、Cloudcraft についてより詳しく知るには、以下の記事をご覧ください。
- [Cloudcraft と AWS アカウントを接続][3]
- [より良いダイアグラムの作成: Cloudcraft のライブ ダイアグラム作成とフィルタリング][4]

[`kubectl` のインストールと設定][6]: コマンド ラインから Kubernetes クラスターを操作できるツールです。問題を避けるため、Cloudcraft は最新バージョンの使用を推奨します。

これに加えて、コマンド ラインから AWS サービスを管理するために、 [AWS CLI のインストールと設定][8] も行ってください。`kubectl` と同様に、Cloudcraft は最新バージョンの使用を推奨します。

最後に、クラスターを正常にスキャンするために、Cloudcraft ではクラスターでパブリック アクセスが有効になっており、IP フィルタリングが適用されていないことが必要です。ネットワーク構成の **Public Access Source Allow List** オプションは、デフォルト値 0.0.0.0/0 のままにしておく必要があります。

## アクセス エントリを作成

既存の Amazon EKS クラスターを含む Blueprint を開くか、Amazon EKS クラスターを持つアカウントをスキャンするための新しい Blueprint を作成することから始めます。

AWS 環境をブループリントにマッピングした状態で、スキャンしたい Amazon EKS クラスターを選択し、コンポーネントツールバーに表示される **Enable cluster scanning** ボタンをクリックします。

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="AWS EKS クラスターとハイライト表示された enable cluster scanning ボタンを示すインタラクティブな Cloudcraft の構成図。" responsive="true" style="width:100%;">}}

次の画面には、お好みのターミナル アプリケーションで実行するための手順付きコマンドが表示されます。

Amazon EKS クラスターの作成者、または管理者アクセス権を持つユーザーとして、Cloudcraft IAM ロールを Kubernetes グループ `cloudcraft-view-only` にマッピングするには、次のコマンドを実行します:

```
aws eks create-access-entry \
  --cluster-name ${EKS_CLUSTER_NAME} \
  --principal-arn ${CLOUDCRAFT_IAM_ROLE_ARN} \
  --kubernetes-groups 'cloudcraft-view-only'
```

## Cloudcraft IAM ロールに読み取り専用アクセスを付与する

次に、 [ClusterRoleBinding][5] を使用して、IAM ロールを Kubernetes ロールにバインドします。

ClusterRoleBinding は、ロールで定義されたアクセス許可を、クラスターのすべてのネームスペースの 1 人または複数のユーザーに付与します。Kubernetes では、ユーザー向けのデフォルトのロールをいくつか定義しています。Cloudcraft の場合は、事前定義された「view」ロールを使用します。これにより、ネームスペース内のほとんどのオブジェクトに対する読み取り専用アクセスが許可されます。

以下の複数行コマンドを入力して、ClusterRoleBinding を作成し、**cloudcraft-view-only** グループのユーザーに読み取り専用のアクセス許可を付与します。

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cloudcraft-view-only
subjects:
  - kind: Group
    name: cloudcraft-view-only
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
EOF
```

## クラスターへのアクセスをテストする

Cloudcraft がクラスターにアクセスできることをテストするには、**Enable Kubernetes Cluster Scanning** 画面の一番下にある **Test cluster access** をクリックします。

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Kubernetes クラスターロールの構成と矢印でハイライト表示された 'Test Cluster Access' ボタンを示すCloudcraft インターフェース。" responsive="true" style="width:100%;">}}

他のクラスターをスキャンする場合は、上記のプロセスを必要な回数繰り返します。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html
[2]: /ja/cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: /ja/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[4]: /ja/cloudcraft/getting-started/crafting-better-diagrams/
[5]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[6]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[7]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
[8]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html