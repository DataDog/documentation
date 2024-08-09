---
further_reading:
- link: /containers/kubernetes/installation
  tag: Documentation
  text: Kubernetes に Datadog Agent をインストールする
title: Kubernetes 上の Datadog Agent を DaemonSet で手動でインストール、構成する
---

## インストール
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

    | メトリクス                         | ログ                            | APM                             | プロセス                         | NPM                             | セキュリティ                        | Linux                   | Windows                              |
    |---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|-------------------------|--------------------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [マニフェストテンプレート][2]  | [マニフェストテンプレート][3] (セキュリティなし) |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [マニフェストテンプレート][4]  | [マニフェストテンプレート][5]               |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 | [マニフェストテンプレート][6]  | [マニフェストテンプレート][7]               |
    | <i class="icon-check-bold"></i> |                                 | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [マニフェストテンプレート][8]  | [マニフェストテンプレート][9]               |
    |                                 |                                 |                                 |                                 | <i class="icon-check-bold"></i> |                                 | [マニフェストテンプレート][10] | テンプレートなし                          |
    | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 |                                 | [マニフェストテンプレート][11] | [マニフェストテンプレート][12]              |

   トレース収集を完全に有効にするには、[アプリケーションのポッドコンフィギュレーションで追加の手順が必要となります][13]。それぞれの機能を個別に有効にする方法については、[ログ][14]、[APM][15]、[プロセス][16]、[ネットワークパフォーマンスモニタリング][17]、[セキュリティ][18]に関するドキュメントページを参照してください。

    **注**: これらのマニフェストは、`default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `metadata.namespace` パラメーターを更新します。

3. `secret-api-key.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` を base64 でエンコードされた [Datadog API キー][19]に置き換えます。API キーの base64 バージョンを取得するには、次のコマンドを実行します。

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `datadog-agent-all-features.yaml` マニフェストテンプレートを使用している場合: `secret-cluster-agent-token.yaml` マニフェストの `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` を base64 でエンコードしたランダムな文字列に置き換えてください。base64 版を取得するには、次のように実行します。

    ```shell
    echo -n 'Random string' | base64
    ```

   **注**: Cluster Agent 間の通信を保護するため、ランダムな文字列には少なくとも 32 文字の英数字が含まれている必要があります。

5. `datadog-agent.yaml` マニフェストで、`DD_SITE` 環境変数を使用して **Datadog サイト**を {{< region-param key="dd_site" code="true" >}} に設定します。

    **注**: `DD_SITE` 環境変数が明示的に設定されていない場合、値はデフォルトで `US` サイトの `datadoghq.com` に設定されます。その他のサイトのいずれかを使用している場合は、API キーのメッセージが無効になります。[ドキュメントのサイト選択ドロップダウン][20]を使用して、使用中のサイトに適したドキュメントを確認してください。

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
    NAME      DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog   2         2         2         2            2           <none>          10s
    ```

## コンフィギュレーション

### ログの収集

**注**: このオプションは Windows ではサポートされません。代わりに [Helm][22] オプションを使用してください。

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

    **注**: `DD_CONTAINER_EXCLUDE_LOGS` を設定すると、Datadog Agent で自身のログ収集および送信が実行されなくなります。Datadog Agent ログを収集する場合は、このパラメーターを削除します。詳細については、[コンテナを無視するための環境変数][21]を参照してください。OpenShift 環境内で ImageStreams を使用する場合は、`DD_CONTAINER_INCLUDE_LOGS` にコンテナの `name` を設定してログを収集します。これらのパラメーター値 (除外/含む) は正規表現をサポートします。

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

## 環境変数

以下は、DaemonSet を使用する Datadog Agent で使用可能な環境変数のリストです。

### グローバルオプション

| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 出力されるすべてのデータにグローバル `env` タグを設定します。                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | メトリクスに使用するホスト名 (自動検出が失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | スペース区切りのホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | メトリクス、トレース、ログの送信先サイト。`DD_SITE` は {{< region-param key="dd_site" code="true">}} で、デフォルトは `datadoghq.com` です。                                                                                                                                                                                               |
| `DD_DD_URL`          | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL` のエイリアス。すでに `DD_DD_URL` が設定されている場合は無視されます。                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定してください。ただし、多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。 |
| `DD_LEADER_ELECTION` | クラスターで複数の Agent インスタンスが実行されている場合は、この変数を `true` に設定して、イベント収集の重複を回避します。                                                                                                                                                                                                                         |

### プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数             | 説明                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` リクエスト用のプロキシとして使用する HTTP URL です。                     |
| `DD_PROXY_HTTPS`         | `https` リクエスト用のプロキシとして使用する HTTPS URL です。                   |
| `DD_PROXY_NO_PROXY`      | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。      |
| `DD_SKIP_SSL_VALIDATION` | Agent と Datadog との接続で問題が発生した場合にテストを実施するオプションです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][23]を参照してください。



### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][24]で送信します。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは `"max median avg count"` です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする Unix ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `"env:golden group:retrievers"` のように追加します。 |

詳しくは、[Unix ドメインソケット上の DogStatsD][25] を参照してください。

### タグ付け

Datadog は Kubernetes から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数                            | 説明             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | ポッドラベルを抽出します      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | ポッドアノテーションを抽出します |

詳細については、[Kubernetes タグの抽出][26]ドキュメントを参照してください。

### コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストはオートディスカバリーにのみ適用されます。トレースと DogStatsD は影響を受けません。これらの環境変数は、その値において正規表現をサポートしています。

| 環境変数                   | 説明                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"`、`image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスを含めたいコンテナの許可リスト。                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスを除外したいコンテナのブロックリスト。                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | ログを含めたいコンテナの許可リスト。                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | ログを除外したいコンテナのブロックリスト。                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **非推奨**: 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **非推奨**: 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*` |

その他の例は[コンテナのディスカバリー管理][27]ページでご確認いただけます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。

### その他

| 環境変数                        | 説明                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します。例: `"docker"`、`"ecs_fargate"`、`"kubelet"`。Agent v7.35.0 以降、不要になりました。                                                                                                     |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | カスタム Kubernetes クラスター識別子を設定して、ホストエイリアスの衝突を回避します。クラスター名は最大 40 文字で、小文字、数字、およびハイフンのみという制限があります。また、文字で始める必要があり、 数字または文字で終わる必要があります。 |

リスナーおよび構成プロバイダーを追加するには、`DD_EXTRA_LISTENERS` と `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を使用します。これらは `datadog.yaml` 構成ファイルの `listeners` セクションと `config_providers` セクションに定義する変数に追加されます。


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
[21]: /ja/agent/docker/?tab=standard#ignore-containers
[22]: /ja/containers/kubernetes/log
[23]: /ja/agent/proxy/#agent-v6
[24]: /ja/developers/dogstatsd/
[25]: /ja/developers/dogstatsd/unix_socket/
[26]: /ja/containers/kubernetes/tag/
[27]: /ja/agent/guide/autodiscovery-management/