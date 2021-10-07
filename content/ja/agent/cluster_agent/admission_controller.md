---
title: Datadog Admission Controller
kind: ドキュメント
further_reading:
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Autodiscovery によるクラスターチェックの実行
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Datadog Cluster Agent のトラブルシューティング
---
## 概要
Datadog Admission Controller は Datadog Cluster Agent のコンポーネントで、ユーザーが利用するアプリケーションポッドのコンフィギュレーションを簡略化できる便利なツールです。Admission Controller には以下の 2 つの機能が備わっています。

- 環境変数 (`DD_AGENT_HOST` and `DD_ENTITY_ID`) をユーザーのアプリケーションコンテナに挿入し、DogStatsD および APM トレーサーライブラリを構成する。
- アプリケーションラベルから取得した Datadog の標準タグ (`env`、`service`、`version`) をコンテナ環境変数に挿入する。

Datadog Admission Controller は `MutatingAdmissionWebhook` 型に属します。Admission Controller について詳しくは、[Kubernetes ガイド][1]を参照してください。

## 要件

- Datadog Cluster Agent v1.7.0+

## コンフィギュレーション

### Helm チャート

Admission Controller で Helm チャートを有効にするには、パラメーター `clusterAgent.admissionController.enabled` を `true` に設定してください。

{{< code-block lang="yaml" filename="values.yaml" disable_copy="true" >}}
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

### Datadog 演算子

Admission Controller で Datadog 演算子を有効にするには、カスタムリソースでパラメーター `clusterAgent.config.admissionController.enabled` を `true` に設定します。

```yaml
[...]
 clusterAgent:
[...]
    config:
      admissionController:
        enabled: true
        mutateUnlabelled: false
[...]
```

### 手動セットアップ

Helm または Datadog 演算子を使用せずに Admission Controller を有効にするには、コンフィギュレーションに以下を追加する必要があります。

まず、[Cluster Agent RBAC アクセス許可][2]のマニフェストをダウンロードし、`rules` の下に以下を追加します。

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

### APM および DogStatsD

DogStatsD クライアントと APM トレーサーを自動で構成するには、以下のいずれかの方法で環境変数 `DD_AGENT_HOST` および `DD_ENTITY_ID` を挿入します。

- ラベル `admission.datadoghq.com/enabled: "true"` をポッドに追加する。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。

ポッドで環境変数を受信しないようにするには、ラベル `admission.datadoghq.com/enabled: "false"` を追加します。これは `mutateUnlabelled: true` を設定している場合でも機能します。

利用可能なオプション:

| mutateUnlabelled | ポッドラベル                               | 挿入可否 |
|------------------|-----------------------------------------|-----------|
| `true`           | ラベルなし                                | 〇       |
| `true`           | `admission.datadoghq.com/enabled=true`  | 〇       |
| `true`           | `admission.datadoghq.com/enabled=false` | ✕        |
| `false`          | ラベルなし                                | ✕        |
| `false`          | `admission.datadoghq.com/enabled=true`  | 〇       |
| `false`          | `admission.datadoghq.com/enabled=false` | ✕        |

#### 注

- 新しいアプリケーションポッドを作成する前に、Admission Controller のデプロイと構成が必要です。既に存在するポッドは更新できません。
- Admission Controller は環境変数 `DD_VERSION, DD_ENV` および `DD_SERVICE` が既に存在する場合は挿入を行いません。
- Admission Controller の挿入機能を無効化するには、Cluster Agent のコンフィギュレーション: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false` を使用します。
- Datadog Admission Controller を使用すれば、ユーザーは Downward API ([Kubernetes トレースコレクション設定のステップ 2 ][3]) を利用してアプリケーションポッドの構成をスキップすることができます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=helm#setup