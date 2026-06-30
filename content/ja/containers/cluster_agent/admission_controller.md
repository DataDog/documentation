---
aliases:
- /ja/agent/cluster_agent/admission_controller
description: Datadog Admission Controller を使用して、環境変数と標準タグを Kubernetes Pod に自動的に挿入する
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: よくあるご質問
  text: Datadog Cluster Agent のトラブルシューティング
- link: /containers/troubleshooting/admission-controller
  tag: よくあるご質問
  text: Admission Controller のトラブルシューティング
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: ブログ
  text: Datadog APM で Kubernetes アプリケーションのトレーシングを自動インスツルメンテーションするために、ライブラリ挿入を使用する
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI ドライバーにより、高パフォーマンスの監視可能性を提供して Kubernetes 環境のセキュリティを確保する
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Datadog Operator と Admission Controller を使用してアプリケーションをインスツルメントする
- link: /containers/guide/cluster_agent_disable_admission_controller
  tag: よくあるご質問
  text: Cluster Agent で Datadog Admission Controller を無効にする
title: Datadog Admission Controller
---
## 概要 {#overview}
Datadog Admission Controller は Datadog Cluster Agent のコンポーネントです。アプリケーション Pod のコンフィギュレーションを簡略化できる便利なツールです。Admission Controller には以下の 2 つの機能が備わっています。

- 環境変数 (`DD_AGENT_HOST`、`DD_TRACE_AGENT_URL`、`DD_ENTITY_ID`、および `DD_EXTERNAL_ENV`) をユーザーのアプリケーションコンテナに挿入して、DogStatsD と Datadog SDK を構成します。
- アプリケーションラベルから取得した Datadog の標準タグ (`env`、`service`、`version`) をコンテナ環境変数に挿入します。

Datadog の Admission Controller は `MutatingAdmissionWebhook` 型に属します。Admission Controller について詳しくは、[Admission Controller に関する Kubernetes ガイド][1] を参照してください。

## 要件 {#requirements}

- Datadog Cluster Agent v7.40+

## 構成 {#configuration}
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator では Datadog Admission Controller がデフォルトで有効になります。Admission Controller を有効にするために追加構成は必要ありません。


Admission Controller を無効にした場合は、`DatadogAgent` 構成でパラメーター `features.admissionController.enabled` を `true` に設定することにより、再度有効にできます。

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    admissionController:
      enabled: true
      mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
Helm チャート v2.35.0 から、Datadog Admission Controller がデフォルトで有効化されるようになりました。Admission Controller を有効にするために追加構成は必要ありません。

Admission Controller で v2.34.6 以前の Helm チャートを有効にするには、パラメーター `clusterAgent.admissionController.enabled` を `true` に設定してください。

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - object - required
  ## Enable the admissionController to automatically inject APM and
  ## DogStatsD config and standard tags (env, service, version) into
  ## your pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Helm または Datadog Operator を使用せずに Admission Controller を有効にするには、コンフィギュレーションに以下を追加します。

まず、[Cluster Agent RBAC アクセス許可][1] のマニフェストをダウンロードし、`rules` の下に以下を追加します。

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

# Uncomment this to configure Datadog SDKs automatically (see below)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

最後に、次のコマンドを実行します。

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### APM インスツルメンテーションライブラリの挿入{#apm-instrumentation-library-injection}
Cluster Agent (バージョン 7.39 以降) を構成し、Single Step Instrumentation を使用してインスツルメンテーションライブラリを挿入することができます。詳しくは、[シングルステップ APM インスツルメンテーション][2] を参照してください。

Single Step Instrumentation を使用したくない場合は、Datadog Admission Controller を使用して Datadog SDK を手動かつ Pod レベルで直接挿入することができます。詳しくは、[ローカル SDK 挿入][7] を参照してください。

### APM および DogStatsD 環境変数の挿入 {#apm-and-dogstatsd-environment-variable-injection}

DogStatsD クライアントやライブラリの挿入をサポートしていない他の APM ライブラリを構成するには、以下のいずれかの方法で環境変数 `DD_AGENT_HOST` と`DD_ENTITY_ID` を挿入します。
- 自分の Pod にラベル `admission.datadoghq.com/enabled: "true"` を追加します。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。

Helm チャートに `mutateUnlabelled: true` という Agent 構成を追加すると、Cluster Agent はラベルのないすべての Pod をインターセプトしようとします。

Pod で環境変数を受信しないようにするには、ラベル `admission.datadoghq.com/enabled: "false"` を追加します。これは、`mutateUnlabelled: true` を設定している場合でも機能します。

`mutateUnlabelled` が `false` に設定されている場合、Pod ラベルは `admission.datadoghq.com/enabled: "true"` に設定する必要があります。

利用可能なオプション:

| mutateUnlabelled | Pod ラベル                               | 挿入 |
| ---------------- | --------------------------------------- | --------- |
| `true`           | ラベルなし                                | はい       |
| `true`           | `admission.datadoghq.com/enabled=true`  | はい       |
| `true`           | `admission.datadoghq.com/enabled=false` | いいえ        |
| `false`          | ラベルなし                                | いいえ        |
| `false`          | `admission.datadoghq.com/enabled=true`  | はい       |
| `false`          | `admission.datadoghq.com/enabled=false` | いいえ        |


#### 優先順位 {#order-of-priority}
Datadog Admission Controller は環境変数 `DD_VERSION`、`DD_ENV` または `DD_SERVICE` がすでに存在する場合は挿入を行いません。

これらの環境変数が設定されていない場合、Admission Controller は以下の順序で標準タグの値を使用します (高い方から順に)。

- Pod 上のラベル
- `ownerReference` のラベル (ReplicaSets、DaemonSets、Deployments など)

#### APM と DogstatsD の通信モードの構成 {#configure-apm-and-dogstatsd-communication-mode}
Datadog Cluster Agent v1.20.0 以降、Datadog Admission Controller は、アプリケーションと Datadog Agent の間で異なる通信モードを注入するように構成することができるようになりました。

この機能は `admission_controller.inject_config.mode` を設定するか、Pod ラベル `admission.datadoghq.com/config.mode` を使用して Pod 固有のモードを定義することによって構成することができます。

Helm chart v3.22.0 および Datadog Operator v1.1.0 以降、APM ソケットまたは DSD ソケットが有効になっている場合、通信モードは自動的に `socket` に設定されます。

利用可能なオプション:
| モード               | 説明                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostip` (デフォルト) | ホスト IP を `DD_AGENT_HOST` 環境変数に挿入                                                                                                                                                                          |
| `service`          | Datadog のローカルサービス DNS 名を `DD_AGENT_HOST` 環境変数に挿入 (Kubernetes v1.22+ で利用可能)                                                                                                                  |
| `socket`           | Unix Domain Socket のパスを `DD_TRACE_AGENT_URL` 環境変数に挿入し、対応するパスにアクセスするためのボリューム定義を行います。DogStatsD メトリクスの Datadog Agent に接続するために使用する URL を `DD_DOGSTATSD_URL` に挿入します。|
| `csi`              | Unix Domain Socket のパスを `DD_TRACE_AGENT_URL` および `DD_DOGSTATSD_URL` 環境変数に挿入し、対応するパスにアクセスするための Datadog CSI ボリューム定義を行います。このモードは Datadog Cluster Agent v7.67+ で利用可能です。                                                   |

**注**: Pod 固有のモードは、Admission Controller レベルで定義されたグローバルモードより優先されます。

## トラブルシューティング {#troubleshooting}

[Admission Controller のトラブルシューティング][6] を参照してください。

##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /ja/containers/troubleshooting/admission-controller
[7]: https://docs.datadoghq.com/ja/tracing/guide/local_sdk_injection/