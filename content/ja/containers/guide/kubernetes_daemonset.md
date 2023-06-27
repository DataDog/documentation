---
further_reading:
- link: /containers/kubernetes/installation
  tag: Documentation
  text: Kubernetes に Datadog Agent をインストールする
kind: documentation
title: Kubernetes 上の Datadog Agent を DaemonSet で手動でインストール、構成する
---

## APM に Datadog Agent を構成する
DaemonSet を利用して、すべてのノード (または [nodeSelectors を使用して][1]特定のノード) に Datadog Agent をデプロイすることができます。

Datadog Agent を Kubernetes クラスターにインストールするには:

1. **Agent のアクセス許可を構成**: Kubernetes で RBAC (ロールベースのアクセス制御) が有効になっている場合は、Datadog Agent サービスアカウントに対する RBAC アクセス許可を構成します。Kubernetes 1.6 以降では、RBAC はデフォルトで有効になっています。適切な ClusterRole、ServiceAccount、および ClusterRoleBinding を、以下のコマンドで作成します。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **注**: RBAC 構成は、`default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `namespace` パラメーターを更新します。


2. **Datadog Agent マニフェストを作成**。以下のテンプレートを使用して、`datadog-agent.yaml` マニフェストを作成します。

    | メトリクス                   | ログ                      | APM                       | Process                   | NPM                       | セキュリティ                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [マニフェストテンプレート][2]  | [マニフェストテンプレート][3] (セキュリティなし)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [マニフェストテンプレート][4]  | [マニフェストテンプレート][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [マニフェストテンプレート][6]  | [マニフェストテンプレート][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [マニフェストテンプレート][8]  | [マニフェストテンプレート][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> |                           | [マニフェストテンプレート][10] | テンプレートなし             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [マニフェストテンプレート][11] | [マニフェストテンプレート][12] |

   トレース収集を完全に有効にするには、[アプリケーションのポッドコンフィギュレーションで追加の手順が必要となります][13]。それぞれの機能を個別に有効にする方法については、[ログ][14]、[APM][15]、[プロセス][16]、[ネットワークパフォーマンスモニタリング][17]、[セキュリティ][18]に関するドキュメントページを参照してください。

    **注**: これらのマニフェストは、`default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `metadata.namespace` パラメーターを更新します。

3. `secret-api-key.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` を base64 でエンコードされた [Datadog API キー][19]に置き換えます。API キーの base64 バージョンを取得するには、次のコマンドを実行します。

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `secret-cluster-agent-token.yaml` マニフェストの `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` を base64 でエンコードしたランダムな文字列に置き換えてください。base64 版を取得するには、次のように実行します。

    ```shell
    echo -n 'Random string' | base64
    ```

   **注**: Cluster Agent 間の通信を保護するため、ランダムな文字列には少なくとも 32 文字の英数字が含まれている必要があります。

5. `datadog-agent.yaml` マニフェストで、`DD_SITE` 環境変数を使用して **Datadog サイト**を {{< region-param key="dd_site" code="true" >}} に設定します。

    **注**: `DD_SITE` 環境変数が明示的に設定されていない場合、値はデフォルトで `US` サイトの `datadoghq.com` に設定されます。その他のサイト (`EU`、`US3`、または `US1-FED`) のいずれかを使用している場合は、API キーのメッセージが無効になります。[ドキュメントのサイト選択ドロップダウン][20]を使用して、使用中のサイトに適したドキュメントを確認してください。

6. 次のコマンドで **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **検証**: 現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

    ```shell
    kubectl get daemonset
    ```

   Agent がデプロイされた場合は、以下のようなテキスト出力が表示されます。`DESIRED` と `CURRENT` はクラスター内で実行中のノードの数と等しくなります。

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. 任意 - **Kubernetes State メトリクスの設定**: [Kube-State マニフェストフォルダー][21]をダウンロードし、それを Kubernetes クラスターに適用して [kube-state メトリクス][22]を自動収集します:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### 非特権

(オプション) 非特権インストールを実行するには、[ポッドテンプレート][19]に以下を追加します。

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  override:
    nodeAgent:
      securityContext:
        runAsUser: 1 # <USER_ID>
        supplementalGroups:
          - 123 # "<DOCKER_GROUP_ID>"
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

## コンフィギュレーション

### ログの収集

**注**: このオプションは Windows ではサポートされません。代わりに [Helm][24] オプションを使用してください。

DaemonSet によるログの収集を有効にするには

1. `datadog.yaml` Agent マニフェストの *env* セクションで、`DD_LOGS_ENABLED` 変数と `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 変数を true に設定します。

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

    **注**: `DD_CONTAINER_EXCLUDE_LOGS` を設定すると、Datadog Agent で自身のログ収集および送信が実行されなくなります。Datadog Agent ログを収集する場合は、このパラメーターを削除します。詳細については、[コンテナを無視するための環境変数][23]を参照してください。OpenShift 環境内で ImageStreams を使用する場合は、`DD_CONTAINER_INCLUDE_LOGS` にコンテナの `name` を設定してログを収集します。これらパラメーター値（除外/含む）は正規表現をサポートします。

2. 再起動やネットワーク障害の際にコンテナログを失わないように、`pointerdir` ボリュームをマウントします。`/var/log/pods` がこのディレクトリへのシンボリックリンクであるため、Kubernetes ログファイルからログを収集するよう `/var/lib/docker/containers` もマウントします。

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

   `pointerdir` は、Agent がログを収集するすべてのコンテナへのポインターを含むファイルを格納するために使用されます。これは、Agent が再起動したり、ネットワークに問題があった場合でも、何も失われないようにするためです。

### 非特権

(オプション) 非特権インストールを実行するには、[ポッドテンプレート][2]に以下を追加します。

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

Agent が非ルートユーザーで実行しているときは、`/var/lib/docker/containers` に含まれるログファイルを直接読み取れません。この場合、Docker Daemon からコンテナログをフェッチできるよう、Agent コンテナの Docker ソケットをマウントする必要があります。



### Cluster Agent のイベント収集

Kubernetes イベントを Datadog Cluster Agent で収集したい場合は、次の手順を使用します。

1. `leader_election` 変数または `DD_LEADER_ELECTION` 環境変数を `false` に設定して、Node Agent のリーダー選出を無効にします。

2. Cluster Agent デプロイファイルで、`DD_COLLECT_KUBERNETES_EVENTS` および `DD_LEADER_ELECTION` 環境変数を `true` に設定します。

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

上記の手順でリーダー選出を構成することで、イベントを収集する Cluster Agent が 1 つだけになるようにします。

また、Node Agent から Kubernetes イベントを収集するには、Agent マニフェストで環境変数 `DD_COLLECT_KUBERNETES_EVENTS` と `DD_LEADER_ELECTION` を `true` に設定してください。

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /ja/agent/kubernetes/apm/#setup
[14]: /ja/agent/kubernetes/log/
[15]: /ja/agent/kubernetes/apm/
[16]: /ja/infrastructure/process/?tab=kubernetes#installation
[17]: /ja/network_monitoring/performance/setup/
[18]: /ja/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /ja/getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
[23]: /ja/agent/docker/?tab=standard#ignore-containers
[24]: /ja/containers/kubernetes/log