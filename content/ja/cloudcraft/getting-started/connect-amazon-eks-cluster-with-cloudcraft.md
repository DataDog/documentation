---
title: Amazon EKS クラスターを Cloudcraft に接続する
---

Amazon EKS クラスターをスキャンすることで、Cloudcraft はシステムアーキテクチャ図を生成し、デプロイされたワークロードとポッドの視覚化をサポートします。

Cloudcraft は [Kubernetes][1] が提供する[ロールベースのアクセス制御 (RBAC) 認可方法]を使用して、[Cloudcraft の既存の読み取り専用の IAM エンティティロール][2]を認可します。つまり、Cloudcraft は特別なソフトウェアやエージェントを必要としません。

RBAC の構成と IAM エンティティの詳細については、[クラスターのユーザーまたは IAM ロールの管理][3]を参照してください。

<div class="alert alert-info">Amazon EKS クラスターおよび AWS アカウントをスキャンする機能は、Cloudcraft Pro の契約者のみが利用できます。詳細については、<a href="https://www.cloudcraft.co/pricing">料金ページを</a>ご覧ください。</div>

## 前提条件

Amazon EKS クラスターを Cloudcraft に接続する前に、まず AWS アカウントを接続し、クラスターを含めた構成図を作成する必要があります。

AWS アカウントを接続し、Cloudcraft についてより詳しく知るには、以下の記事をご覧ください。
- [AWS アカウントを Cloudcraft に接続する][4]
- [初めての AWS リアルタイム構成図を作成する][5]

また、コマンドラインから Kubernetes クラスターを制御できるツール、[`kubectl` のインストールと構成][7]も必要です。Cloudcraft では、問題を避けるために最新バージョンの使用を推奨しています。

## Cloudcraft IAM ロールを読み取り専用に認可する

まず、既存の Amazon EKS クラスターでブループリントを開くか、**自動レイアウト**機能を使用して、新しいブループリントを生成します。

AWS 環境をブループリントにマッピングした状態で、スキャンしたい Amazon EKS クラスターを選択し、コンポーネントツールバーに表示される **Enable cluster scanning** ボタンをクリックします。

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="AWS EKS クラスターとハイライト表示された enable cluster scanning ボタンを示すインタラクティブな Cloudcraft の構成図。" responsive="true" style="width:100%;">}}

次の画面では、ターミナルで実行するコマンドが順を追って表示されます。

Amazon EKS クラスターの作成者または管理者アクセス権を持つユーザーとして、AWS-auth ConfigMap ファイルを `kubectl` で開きます。

```
kubectl edit -n kube-system configmap/aws-auth
```

テキストエディタで `aws-auth.yaml` ファイルを開き、*data* セクションのすぐ後にある *mapRoles* セクションにロールの詳細を追加します。

```
data:
  mapRoles: |
    - rolearn: <arn-for-the-readonly-cloudcraft-iam-role>
      groups:
        - cloudcraft-view-only
```

該当のセクションが存在しない場合は追加します。完了したら、ファイルを保存して終了します。

<div class="alert alert-info">`groups` は、ロールがマップされるクラスター内のグループを指します。詳細については、Kubernetes のドキュメントの[デフォルトのロールとロールバインディング][8]を参照してください。</div>

<div class="alert alert-danger">タイプミスや構文エラーは、ConfigMap ファイルで更新されたすべての IAM ユーザーとロールの権限に影響する可能性があります。これを防ぐため、Cloudcraft ではテキストエディタに YAML 解析ツール (リンター) を追加することを推奨しています。</div>

## Cloudcraft IAM ロールに読み取り専用アクセスを付与する

次に、[ClusterRoleBinding][6] を使用して、IAM ロールを Kubernetes ロールにバインドします。

ClusterRoleBinding は、ロールで定義されたアクセス許可を、クラスターのすべてのネームスペースの 1 人または複数のユーザーに付与します。Kubernetes では、ユーザー向けのデフォルトのロールをいくつか定義しています。Cloudcraft の場合は、事前定義された「view」ロールを使用します。これにより、ネームスペース内のほとんどのオブジェクトに対する読み取り専用アクセスが許可されます。

以下の複数行コマンドを入力して、ClusterRoleBinding を作成し、**cloudcraft-view-only** グループのユーザーに読み取り専用のアクセス許可を付与します。

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
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

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
[2]: /ja/cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html
[4]: /ja/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[5]: /ja/cloudcraft/getting-started/create-your-first-cloudcraft-diagram/
[6]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[7]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[8]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings