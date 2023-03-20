---
aliases:
- /ja/agent/cluster_agent/admission_controller
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: ドキュメント
  text: Datadog Cluster Agent のトラブルシューティング
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: ブログ
  text: Datadog APM で Kubernetes アプリケーションのトレーシングを自動インスツルメンテーションするために、ライブラリインジェクションを使用します
kind: documentation
title: Datadog Admission Controller
---

## 概要
Datadog Admission Controller は Datadog Cluster Agent のコンポーネントで、アプリケーションポッドのコンフィギュレーションを簡略化できる便利なツールです。Admission Controller には以下の 2 つの機能が備わっています。

- 環境変数 (`DD_AGENT_HOST`、`DD_TRACE_AGENT_URL`、`DD_ENTITY_ID`) をユーザーのアプリケーションコンテナに挿入し、DogStatsD および APM トレーサーライブラリを構成する。
- アプリケーションラベルから取得した Datadog の標準タグ (`env`、`service`、`version`) をコンテナ環境変数に挿入する。

Datadog Admission Controller は `MutatingAdmissionWebhook` 型に属します。Admission Controller について詳しくは、[Admission Controller に関する Kubernetes ガイド][1]を参照してください。

## 要件

- Datadog Cluster Agent v7.39+

## コンフィギュレーション
{{< tabs >}}
{{% tab "Operator" %}}

Admission Controller で Datadog Operator を有効にするには、カスタムリソースでパラメーター `clusterAgent.config.admissionController.enabled` を `true` に設定します。

{{< code-block lang="yaml" disable_copy="false" >}}
[...]
 clusterAgent:
[...]
    config:
      admissionController:
        enabled: true
        mutateUnlabelled: false
[...]
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
Helm chart v2.35.0 から、Datadog Admission Controller がデフォルトで有効化されました。Admission Controller を有効にするために、特別な構成は必要ありません。

Admission Controller で v2.34.6 以前の Helm チャートを有効にするには、パラメーター `clusterAgent.admissionController.enabled` を `true` に設定してください。

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" >}}
[...]
 clusterAgent:
[...]
  ## @param admissionController - オブジェクト - 必須
  ## admissionController での自動 APM 挿入を有効化
  ## DogStatsD config および標準タグ (env、service、version) を
  ## ポッドに挿入
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## ポッドラベルなしで config の挿入を有効化:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
[...]
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Helm または Datadog Operator を使用せずに Admission Controller を有効にするには、コンフィギュレーションに以下を追加します。

まず、[Cluster Agent RBAC アクセス許可][1]のマニフェストをダウンロードし、`rules` の下に以下を追加します。

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "deployments"]
  verbs: ["get"]
{{< /code-block >}}

`agent-services.yaml` の下に以下を追加します。

{{< code-block lang="yaml" filename="agent-services.yaml" disable_copy="true" >}}

apiVersion: v1
kind: Service
metadata:
  name: datadog-cluster-agent-admission-controller
  labels:
    app: "datadog"
    app.kubernetes.io/name: "datadog"
spec:
  selector:
    app: datadog-cluster-agent
  ports:
  - port: 443
    targetPort: 8000

{{< /code-block >}}

Cluster Agent のデプロイに環境変数を追加し、Admission Controller を有効にします。

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- name: DD_ADMISSION_CONTROLLER_ENABLED
  value: "true"
- name: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  value: "datadog-cluster-agent-admission-controller"

# このコメントを解除して自動的に APM トレーサーを構成します (以下を参照)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

最期に、次のコマンドを実行します。

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### インスツルメンテーションライブラリの挿入
Cluster Agent (バージョン 7.39 以降) を構成して、インスツルメンテーションライブラリを挿入することができます。詳しくは、[Admission Controller によるインスツルメンテーションライブラリの挿入][2]を参照してください。


### APM および DogStatsD

DogStatsD クライアントやライブラリの挿入をサポートしていない他の APM ライブラリを構成するには、以下のいずれかの方法で環境変数 `DD_AGENT_HOST` と `DD_ENTITY_ID` を挿入します。
- ラベル `admission.datadoghq.com/enabled: "true"` をポッドに追加します。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。

Helm チャートに `mutateUnlabelled: true` という Agent 構成を追加すると、Cluster Agent はラベルのないすべてのポッドをインターセプトしようとします。

ポッドで環境変数を受信しないようにするには、ラベル `admission.datadoghq.com/enabled: "false"` を追加します。これは `mutateUnlabelled: true` を設定している場合でも機能します。

`mutateUnlabelled` が `false` に設定されている場合、ポッドラベルは `admission.datadoghq.com/enabled: "true"` とします。

利用可能なオプション:

| mutateUnlabelled | ポッドラベル                               | 挿入可否 |
|------------------|-----------------------------------------|-----------|
| `true`           | ラベルなし                                | 〇       |
| `true`           | `admission.datadoghq.com/enabled=true`  | 〇       |
| `true`           | `admission.datadoghq.com/enabled=false` | ✕        |
| `false`          | ラベルなし                                | ✕        |
| `false`          | `admission.datadoghq.com/enabled=true`  | 〇       |
| `false`          | `admission.datadoghq.com/enabled=false` | ✕        |


#### 優先順位
Datadog Admission Controller は環境変数 `DD_VERSION`、`DD_ENV` または `DD_SERVICE` が既に存在する場合は挿入を行いません。

これらの環境変数が設定されていない場合、Admission Controller は以下の順序で標準タグの値を使用します (高い方から順に)。

- ポッド上のラベル
- `ownerReference` のラベル (ReplicaSets、DaemonSets、Deployments など)

#### APM と DogstatsD の通信モードの構成
Datadog Cluster Agent v1.20.0 以降、Datadog Admission Controller は、アプリケーションと Datadog Agent の間で異なる通信モードを注入するように構成することができるようになりました。

この機能は `admission_controller.inject_config.mode` を設定するか、ポッドラベル `admission.datadoghq.com/config.mode` を使用してポッド固有のモードを定義することによって構成することができます。

可能なオプション:
| モード               | 説明                                                                                                       |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| `hostip` (デフォルト) | 環境変数 `DD_AGENT_HOST` にホスト IP を注入する                                                        |
| `service`          | Datadog のローカルサービスの DNS 名を環境変数 `DD_AGENT_HOST` に注入する (Kubernetes v1.22+で使用可能)|
| `socket`           | 環境変数 `DD_TRACE_AGENT_URL` に Unix ドメインソケットのパスを注入し、対応するパスにアクセスするようにボリュームを定義する |

**注**: ポッド固有のモードは、Admission Controller レベルで定義されたグローバルモードより優先されます。

#### 注

- 新しいアプリケーションポッドを作成する前に、Admission Controller のデプロイと構成が必要です。既に存在するポッドは更新できません。
- Admission Controller の挿入機能を無効化するには、Cluster Agent のコンフィギュレーション: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false` を使用します。
- Datadog Admission Controller を使用すれば、ユーザーは Downward API ([Kubernetes トレースコレクション設定のステップ 2 ][3]) を利用してアプリケーションポッドの構成をスキップすることができます。
- Google Kubernetes Engine (GKE) Private Cluster では、[コントロールプレーン用のファイアーウォールルールを追加する][4]必要があります。着信接続を処理する Webhook は、ポート `443` でリクエストを受け取り、ポート `8000` に実装されたサービスに誘導します。デフォルトでは、クラスターのネットワークに `gke-<CLUSTER_NAME>-master` という名前のファイアーウォールルールが存在するはずです。ルールの "ソースフィルター" は、クラスターの "コントロールプレーンのアドレス範囲" と一致します。このファイアーウォールルールを編集して、TCP ポート `8000` へのイングレッションを許可するようにします。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: /ja/tracing/trace_collection/admission_controller/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules