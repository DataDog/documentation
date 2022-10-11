---
aliases:
- /ja/agent/cluster_agent/admission_controller
further_reading:
- link: /agent/cluster_agent/clusterchecks/
  tag: ドキュメント
  text: Autodiscovery によるクラスターチェックの実行
- link: /agent/cluster_agent/troubleshooting/
  tag: ドキュメント
  text: Datadog Cluster Agent のトラブルシューティング
kind: documentation
title: Datadog Admission Controller
---

## 概要
Datadog Admission Controller は Datadog Cluster Agent のコンポーネントで、アプリケーションポッドのコンフィギュレーションを簡略化できる便利なツールです。Admission Controller には以下の 2 つの機能が備わっています。

- 環境変数 (`DD_AGENT_HOST`、`DD_TRACE_AGENT_URL`、`DD_ENTITY_ID`) をユーザーのアプリケーションコンテナに挿入し、DogStatsD および APM トレーサーライブラリを構成する。
- アプリケーションラベルから取得した Datadog の標準タグ (`env`、`service`、`version`) をコンテナ環境変数に挿入する。

Datadog Admission Controller は `MutatingAdmissionWebhook` 型に属します。Admission Controller について詳しくは、[Kubernetes ガイド][1]を参照してください。

## 要件

- Datadog Cluster Agent v7.39+

## コンフィギュレーション

### Helm チャート
Helm チャート v2.35.0 から、Datadog アドミッションコントローラーがデフォルトで有効化されるようになりました。アドミッションコントローラーを有効にするための追加構成は必要ありません。

Admission Controller で v2.34.6 以前の Helm チャートを有効にするには、パラメーター `clusterAgent.admissionController.enabled` を `true` に設定してください。

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

Helm または Datadog 演算子を使用せずに Admission Controller を有効にするには、コンフィギュレーションに以下を追加します。

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


### APM
Cluster Agent (バージョン 7.39 以降)では、APM トレーシングライブラリを自動的に挿入するように構成することができます。

Cluster Agent をインストールしたら、次のいずれかを実行します。
- ラベル `admission.datadoghq.com/enabled: "true"` をポッドに追加する。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。

ライブラリ挿入のためにコンテナをオプトインするには、アプリケーションの YAML ファイル内で Pod アノテーションを使用して、言語トレーサーとバージョンを指定します。


アノテーションは、次の形式の `key: value` のペアです。

```yaml
datadoghq.com/<language>-lib.version: <lib-version>
```

このアノテーションを追加すると、その言語とバージョンのトレーサーライブラリが、コンテナ化されたアプリケーションに挿入されます。
有効な `<language>` の値は以下の通りです。
- `java`
- `js`

例えば、最新の Java トレーサーを挿入するには

```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
```

**注**: ライブラリのメジャーリリースは、破壊的な変更をもたらす可能性があるため、`latest` を指定する際には注意が必要です。

あまりないシナリオですが、複数の `<language>-lib.version` アノテーションを追加して、1 つのコンテナに複数の言語トレーサーを挿入することができます。

例えば、最新の Java トレーサーと Node トレーサー v3.0.0 を挿入するには
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
    admission.datadoghq.com/js-lib.version: "3.0.0"
```

`mutateUnlabelled: true` アノテーションを追加すると、Cluster Agent はラベルのないポッドをすべてインターセプトしようとします。

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

### DogStatsD

DogStatsD クライアントやライブラリの挿入をサポートしていない他の APM ライブラリを構成するには、以下のいずれかの方法で環境変数 `DD_AGENT_HOST` と `DD_ENTITY_ID` を挿入します。
- ラベル `admission.datadoghq.com/enabled: "true"` をポッドに追加する。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。


#### 優先順位
Datadog Admission Controller は環境変数 `DD_VERSION`、`DD_ENV` および `DD_SERVICE` が既に存在する場合は挿入を行いません。

これらの環境変数が設定されていない場合、Admission Controller は以下の順序で標準タグの値を使用します (高い方から順に)。

- ポッド上のラベル
- `ownerReference` のラベル (ReplicaSets、DaemonSets、Deployments...)

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


## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules