---
aliases:
- /ja/logs/guide/docker-logs-collection-troubleshooting-guide/
description: コンテナ化環境におけるログ収集のよくある問題のトラブルシューティング
further_reading:
- link: /containers/kubernetes/log
  tag: ドキュメント
  text: Kubernetes ログ収集
- link: /containers/docker/log
  tag: ドキュメント
  text: Docker ログ収集
title: コンテナログ収集のトラブルシューティング
---
## 概要 {#overview}

コンテナ化されたアプリケーションは、標準出力と標準エラー (`stdout`/`stderr`) ストリームにログを書き込み、コンテナランタイムとオーケストレーターがさまざまな方法でそれらをキャプチャして処理します。Datadog Agent は、これらのログファイルを管理するために Docker および Kubernetes のデフォルトのファイルベース処理に依存しています。Datadog Agent は、ホスト上のコンテナをモニターし、それらのログを発見、テールし、およびタグ付けし、各コンテナのログを Datadog に報告します。

このドキュメントでは、**Docker** および **Kubernetes** のログ収集のトラブルシューティング手順を説明します。コンテナ化されたログ収集の完全なコンテキストと一般的なセットアップ手順については、[Docker][1] および [Kubernetes][2] のドキュメントを参照してください。

[**ECS Fargate**][3] および [**EKS Fargate**][4] に基づくログ収集については、専用のセットアップおよびトラブルシューティングドキュメントを参照してください。

## Docker および Kubernetes におけるログ収集の理解 {#understanding-log-collection-in-docker-and-kubernetes}

コンテナ化環境において、Datadog Agent は主に**ファイルベース**の収集と、Docker API を通じた**ソケットベース**の収集という 2 つの方法でログを収集します。

Docker および Kubernetes のドキュメントは、パフォーマンスと信頼性が向上するため、デフォルトでファイルベースの収集が行われます。ソケットベースの収集は、フォールバックオプションとして Docker 環境で使用できます。Kubernetes クラスターでは、ソケットベースの収集に Docker ランタイムが必要ですが、これはほとんどの Kubernetes ディストリビューションで推奨されていません。

コンテナ化環境において、Datadog はアプリケーションコンテナ内に隔離されたログファイルに書き込むのではなく `stdout`/`stderr` ストリームにログを記録することを推奨します。これらのストリームは、自動化を促進し、信頼性の高い収集を可能にします。

### ログファイル {#log-files}

Docker のデフォルトの `json-file` ログドライバーを使用すると、`stdout`/`stderr` ログは `/var/lib/docker/containers` に保存されます。これらのログは Agent コンテナに `/var/lib/docker/containers` (Windows 上の `c:/programdata/docker/containers`) をマウントすることで収集できます。例:

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

このマウントポイントが存在しない場合、Agent はソケットベースの収集にフォールバックします。`/var/run/docker.sock` でソケットを介して Docker API にアクセスします。

Kubernetes において、`stdout`/`stderr` ログはデフォルトで `/var/log/pods` に保存されます。フォルダー構造は一意の Pod とその Pod 内のコンテナごとに設定されます。例:

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Pod 内のコンテナが Kubernetes で再起動すると、Agent が自動的に考慮するファイル名 (`0.log` -> `1.log`) が自動的にインクリメントされます。詳細については、[Kubernetes ログ収集][2]を参照してください。

Agent はホスト上で対応するコンテナを発見すると、環境ごとに想定されるフォルダーおよびファイル構造に基づいてそのログファイルを検索します。

### Agent Autodiscovery {#agent-autodiscovery}

デフォルトでは、Agent はログ収集が有効になっている場合にのみコンテナからログを収集します。

- `logs_config.container_collect_all` は検出されたすべてのコンテナからログを収集するために有効になっています。
- コンテナは Autodiscovery ベースの統合からのログ収集のために構成されています。

Agent は、[コンテナディスカバリー管理][5]で設定したコンテナの除外/包含ルールも考慮します。

最後に、Agent は自分自身と同じホスト上のコンテナからログを収集する責任を負います。

これらのルールを考慮することは、コンテナのログ収集がどのように設定されているかを理解するために重要です。特定のコンテナのログが表示されない場合は、以下を確認してください。

- Agent がログ収集のために有効になっているか。
- コンテナが検出ルールに対してログ収集のために有効になっているか。
- Agent は目的のコンテナと同じホスト上で実行されているか。

#### コンテナがすべての設定を収集 {#container-collect-all-configuration}

ログ収集を有効にする方法に関する包括的な指示については、[Docker][1] および [Kubernetes][2] のログ収集ドキュメントを参照してください。クイックリファレンスとして、Agent を構成してログ収集を有効にし、デフォルトが false の `container_collect_all` 機能を有効にする方法のサンプルを参照できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  #(...)
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "コンテナ化された Agent" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

`container_collect_all` を使用する場合、Agent は検出されたすべてのコンテナからログを収集し、検出されたコンテナの `short_image` タグに対応する `source` および `service` タグを付与します。

`container_collect_all` が有効になっていない場合、Autodiscovery に基づく設定で、コンテナごとにログ収集を個別に有効にする必要があります。

#### Autodiscovery 構成 {#autodiscovery-configuration}

Autodiscovery を使用すると、Agent がどのコンテナからログを収集するかを構成できます。Datadog は、[Docker のコンテナラベル][6]または [Kubernetes の Pod アノテーション][7]を使用することを推奨しています。これらは該当するコンテナ/Pod でログを出力するものに配置される JSON ベースのログ構成です。以下の最小限の例をご覧ください。

{{< tabs >}}
{{% tab "Kubernetes" %}}

Kubernetes のアノテーションは Pod に設定する必要があり、それを作成する親ワークロードには設定しないでください。アノテーションはコンテナ名に合わせて調整する必要があります。

```yaml
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: |
          [{
            "source": "example-source",
            "service": "example-service"
          }]
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker ラベルは、Docker 実行コマンド、Docker Compose ファイル、またはコンテナイメージに設定することができます。

例: 実行コマンドでは以下のように設定します。

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

[Docker ログ収集 ](/containers/docker/log/?tab=dockerfile#log-integrations)の詳細な例を参照してください。

{{% /tab %}}
{{< /tabs >}}

これらの両方のセットアップでは、構成が次を満たしていることを確認してください。
- 少なくともソースとサービスが設定されている 
- 有効な JSON である
- 対応する Kubernetes Pod または Docker コンテナに設定されている
- ログ構成をトリガーするために正しいキー名を使用している。[Datadog サイト][8]に基づいてキー名を調整する必要はありません。

ログ構成の設定方法の詳細な例については、[高度なログ収集構成][9]を参照してください。

### タグ付け{#tagging}

Agent は、各環境の[タグカーディナリティ][10]の「高」レベルでログにタグを自動的に割り当てます。すぐに使える [Docker タグはこちら][11]および [Kubernetes タグはこちら][12]を表示できます。これには、[Unified Service Tagging][13] によって収集されたタグや、コンテナメタデータからの異なるタグ抽出ルールによって収集されたタグも含まれます。

これらのタグをカスタマイズするには、ログ収集ルールを変更するか、一般的にログ収集を有効にする必要があります。該当するコンテナに Autodiscovery ラベルまたはアノテーションを適用できます。

ログに付けられたタグは、[ホストタグの継承][14]からも取得できます。Datadog に入ってくるすべてのデータ (ログを含む) はこのプロセスを経由します。Datadog の取り込みでは、ログはそのホストに関連付けられたすべてのホストレベルタグを継承します。これらのタグはホストのインフラストラクチャーリストで確認できます。これらは最も一般的に次のように設定されます。

- Datadog Agent とその Autodiscovery または手動設定による `DD_TAGS` が提供される
- ホストのタグを収集および設定するクラウドプロバイダー統合

例えば、タグ `pod_name` と `short_image` は Agent がこのタグを送信時に設定することによって生成されます。`region` や `kube_cluster_name` のような他のタグは、インテーク時のホストタグの継承によって生成されます。

## Agent コマンドを使用したコンテナログ収集のトラブルシューティング{#troubleshooting-container-log-collection-with-agent-commands}

アプリケーションコンテナと同じノードで実行されている Datadog Agent がそのコンテナのログを収集する責任を負います。これらのコマンドを実行する際、特に Kubernetes 環境では、目的のアプリケーションコンテナに対して正しい Agent Pod で動作していることを確認します。

役立つトラブルシューティングコマンドのリストについては、[Agent コマンド][15]を参照してください。

### Agent のステータス {#agent-status}

Agent ステータスコマンドを実行して、ログ Agent に問題が発生しているかどうかを確認できます

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

このコマンドは、一般的なログ Agent のステータスと、Agent がモニターしている各コンテナのログコレクターのステータスを表示します。

```text
==========
Logs Agent
==========
    Reliable: Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 8.60922316e+08
    EncodedBytesSent: 3.9744538e+07
    LogsProcessed: 604328
    LogsSent: 60431
  
  ============
  Integrations
  ============
  
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    - Type: file
      Identifier: ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
      Path: /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/*.log
      Service: example-service
      Source: example-source
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log  
      Bytes Read: 5075   
      Pipeline Latency:
        Average Latency (ms): 0
        24h Average Latency (ms): 0
        Peak Latency (ms): 0
        24h Peak Latency (ms): 0
```

ログ Agent のステータスが上記とは異なる場合、以下のセクションにあるトラブルシューティングのヒントを参照してください。

各個別のログコレクターは、Agent が特定のコンテナのログをどのように収集しているかについての詳細情報を提供します。上記の Kubernetes の例を使用すると、この出力から次のことがわかります。

- **コレクター名** (`default/my-deployment-55d847444b-2fkch/my-container`) は、ネームスペース、Pod、およびコンテナを特定します。
- **識別子** (`ba778eaff...`) は、モニターされている個々のコンテナ ID です。
- **パス**と**入力**は、Agent がコンテナのログファイルを検索および特定した場所を示します。
- **サービス**と**ソース**は、使用されているタグを要約します。

Docker では出力はほぼ同じですが、個々のログコレクター名は異なります。

Agent のステータスコマンドを実行すると以下のメッセージが表示される場合:

```
==========
Logs Agent
==========

  Logs Agent is not running
```
これは、Agent でログ収集が有効になっていないことを意味します。

ログ Agent のステータスに Integrations が表示されず、`LogsProcessed: 0` および `LogsSent: 0` と表示されることがあります。

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
この場合、ログは有効になっていますが、Agent がログを収集するコンテナが指定されていません。

### Agent 構成チェック {#agent-configcheck}

`agent configcheck` コマンドを実行して、実行中の Agent でロード済みかつ解決済みの構成をすべて出力できます。

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent configcheck
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent configcheck
```

{{% /tab %}}
{{< /tabs >}}

このコマンドは、コンテナ ID を参照する `Configuration source` を使用して、ログコレクターの構成を表示します。これは `agent status` の出力と照合するために使用できます。

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

Autodiscovery から適用された `Log Config` は、`[{"service":"example-service","source":"example-source"}]` として表示される `service` および `source` タグを提供します。`configcheck` の出力は、Agent が特定のコンテナのログ収集をそのコンテナ ID に基づいてどのようにセットアップしたかを確認するのに役立ちます。

`logs_config.container_collect_all` を使用する場合、一意の構成が提供されていないと、コンテナのデフォルトが `[{}]` になります。


### Agent ストリームログ {#agent-stream-logs}

`agent stream-logs` コマンドを実行して、Agent がリアルタイムで見ているログを、関連するメタデータとログ内容とともにコンソールにストリーミングできます。

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent stream-logs

# Stream logs relative to "Namespace/Pod Name/Container Name" based name
kubectl exec -it <Agent Pod> -- agent stream-logs --name <NAME>
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent stream-logs
```

{{% /tab %}}
{{< /tabs >}}

Kubernetes の命名形式 (ネームスペース/Pod 名/コンテナ) に一致する `--name` フラグでこの出力をフィルタリングできます。代わりに、`--service` または `--source` フラグを使用して、適用済みのタグに基づいてフィルタリングすることもできます。

`<NAME>` を見つけるには、`agent status` コマンドを使用します。例: `default/my-deployment-55d847444b-2fkch/my-container`:

```
==========
Logs Agent
==========
    ...  
  ============
  Integrations
  ============
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    ...
```
このコマンドは、Agent によって報告されたログを継続的に出力します。

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

各行には、インテグレーション名、タイプ、ステータス、タイムスタンプ、ホスト名、サービス、ソース、コンテナタグ、およびメッセージが提供される必要があります。これにより、Agent が収集しているログ、それらのログに関連付けられているメタデータ、および送信されるメッセージが表示されます。

ストリームプロセスを終了するには、`Ctrl + C` を押します。

### 生ログファイルのキャプチャ {#capturing-the-raw-log-file}

Agent がログを正しくテールしているかどうか確認するには、ログファイルをコピーし、[`agent status` コマンド](#agent-status)を使用して確認できます。

`agent status` コマンドを実行し、該当するコンテナの「Logs Agent」セクションをチェックします。例えば、コンテナ `my-container` を持つ`my-deployment-98878c5d8-mc2sk` という名前の Pod の場合、次のようになります。

```text
  default/my-deployment-98878c5d8-mc2sk/my-container
  --------------------------------------------------
    - Type: file
      Identifier: fa54113fffebc83ffef4bd863c8c1012bd5cfb19311a4dcd7d8e9b5271dc29fe
      Path: /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/*.log
      Service: busybox
      Source: busybox
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log  
```

Agent が検索している場所を示す `Path` と、検出されたログファイルを `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log` として表示している `Inputs` を確認することができます。

リンクは Agent Pod で開かれるため、`kubectl cp` コマンドを使用して、このファイルを Agent Pod からローカルマシンにコピーできます。

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

例の Agent Pod が `datadog-agent-xxxxx` という名前の場合、次のようになります。

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
コピーされたファイルを確認して、Agent が見る正確なログを確認し、Kubernetes によって必要なログがキャプチャされているかどうかを特定できます。同様のことが `/var/lib/docker/containers` パスにある Docker コンテナと docker cp コマンドに対しても行えます。

## 一般的な問題 {#common-issues}

コンテナ化環境で Datadog にログを送信する際に障害となる一般的な問題があります。Datadog にログを送信する際に問題が発生した場合は、以下の一般的な問題を確認してください。問題が解決しない場合は、さらなるサポートを受けるためにサポートチームにお問い合わせください。

### ホスト名の前処理 {#hostname-preprocessing}

`host`、`hostname`、または `syslog.hostname` の JSON 属性が生ログにある場合、一般的な問題が発生します。例:

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="ホスト名の前処理の例" >}}

JSON 形式のログは、ログの公式なタイムスタンプやログレベルを設定するために、`timestamp` や `level` などの予約済み属性に関連する一連の前処理ルールを通過します。これらの予約済み属性の 1 つは[ホストの前処理][16]用であり、`host`、`hostname`、または `syslog.hostname` の JSON 属性がログの公式な `host` になります。その結果、それらのログステートメントは「間違った」ホストに帰属し、「元の」ホストの想定されるホストレベルのタグを継承しないことになります。

`@host:* OR @hostname:* OR @syslog.hostname:*` の JSON 属性に一致するログをクエリして、この前処理を積極的に使用しているログを表示できます。

この問題を解決するためのオプションがいくつかあります。
- 可能であれば、`host` または `hostname` の JSON 属性をロギングしないようにアプリケーションを更新し、それを削除するか、他のキーに変更してください。
- [グローバル前処理ルール][17]を更新して、この動作をスキップします。ただし、これに依存するログはその機能を失うことになります。
- Autodiscovery 構成を追加して、[ホストキーワードをマスクするカスタムログ設定][18]を作成します。

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: |-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
spec:
  containers:
    - name: <CONTAINER_NAME>
      image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
  labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
```

{{% /tab %}}
{{< /tabs >}}

上記のルールは文字列 `"host"` (引用符を含む) を検索し、JSON 構造を保持するために `"app_host"` に置き換えます。必要に応じて、ログのパターンを `hostname` に置き換えてください。

また、環境変数 `DD_LOGS_CONFIG_PROCESSING_RULES` を使用して、Agent が処理しているすべてのログでキーワードをマスクするための[グローバル処理ルール][19]を追加することもできます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}

{{% tab "環境変数" %}}

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### 新しいホストまたはノードでホストレベルのタグが欠落している場合 {#missing-host-level-tags-on-new-hosts-or-nodes}

新しく作成されたホストまたはノードから Datadog にログを送信する場合、ホストレベルタグが[継承][20]されるまでに数分かかることがあります。その結果、ホストレベルタグがこれらのログから欠落する可能性があります。

この問題を解決するには、環境変数 `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` を使用して継続時間 (分単位) を構成します。この期間中、Datadog Agent は、知っているホストレベルタグを、送信された各ログに手動でアタッチします。この期間を過ぎると、Agent は取り込み時のタグの継承に依拠するようになります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```

{{% /tab %}}

{{% tab "環境変数" %}}

```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### 新しいコンテナやポッドでタグが欠落している場合 {#missing-tags-on-new-containers-or-pods}

新しく作成されたコンテナまたはポッドからログを Datadog に送信する場合、Datadog Agent の内部タグ設定機能が、関連するコンテナまたはポッドのタグをまだ持っていない可能性があります。その結果、これらのログからタグが欠落することがあります。

この問題を解決するには、環境変数 `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` を使用して、Datadog Agent が新しく作成されたコンテナやポッドからログの送信を開始するまでの継続時間 (秒単位) を構成します。デフォルト値は `0` です。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```

{{% /tab %}}

{{% tab "環境変数" %}}

```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### 存続期間が短い Pod {#short-lived-pods}

デフォルトでは、Agent は 5 秒ごとに新しいコンテナを探します。Agent v6.12+ では、ファイルログ収集方法を使用している場合、存続期間の短いコンテナのログ (停止またはクラッシュ) が自動的に収集されます。これには、収集初期化コンテナログも含まれます。それらのファイルが存在する限りです。

Kubernetes では、ほとんどの Pod とそのコンテナのログが短命なプロセスであっても Datadog Agent がそれらを報告するのに十分な期間保持されます。Kubernetes CronJobs およびジョブは、デフォルトで Pod を十分な期間保持し、Datadog Agent がそのログを報告できるようにします。完了したコンテナも同様です。ただし、[ジョブクリーンアップルール][21] `ttlSecondsAfterFinished` を指定した場合、Datadog は Datadog Agent がそれらを処理できるように少なくとも 15 秒を推奨します。

### ファイルからの Docker ログ収集の問題 {#docker-log-collection-from-file-issues}

ディスクのログファイルが Agent によりアクセス可能であれば、Agent はバージョン 6.33.0/7.33.0 以降ではデフォルトでディスクのログファイルから Docker ログを収集します。この行動を無効にするには、`DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` を `false` に設定します。

Docker コンテナのログをファイルから収集する際、Docker コンテナのログが保存されているディレクトリ (Linux では `/var/lib/docker/containers`) から読み込めない場合、Agent は Docker ソケットからの収集に頼ります。この診断には、ログ Agent のステータスをチェックして、下記に類似するエラーを示すファイルタイプのエントリを探します。

```
- Type: docker
    Service: stable
    Source: stable
    Status: OK
    The log file tailer could not be made, falling back to socket
    Inputs:
    68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d  
    Bytes Read: 160973 
```

このステータスは、Agent が指定されたコンテナのログファイルを見つけられないことを意味します。この問題を解決するには、Docker コンテナログを含むフォルダが Datadog Agent コンテナに正しく公開されていることを確認します。Linux では Agent コンテナを起動するコマンドラインの `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` に該当します。Windows では `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro` です。

基底のホストに相対的なディレクトリは、Docker Daemon の特定のコンフィギュレーションのため、異なる場合があることにご留意ください。これは、正しい Docker ボリュームのマッピングが保留となる問題ではありません。たとえば、Docker のデータディレクトリの場所が基底のホストで `/data/docker` に変わった場合は、`-v /data/docker/containers:/var/lib/docker/containers:ro` を使用します。

収集されたログの単一行が分かれている場合は、Docker Daemon が [JSON ロギングドライバー](#different-docker-log-driver)を使用していることを確認します。

### ホストベースの Agent {#host-based-agent}

Docker コンテナで実行するのではなく、ホストに Agent をインストールしている場合、Docker ソケットからの読み取り許可を得るには、ユーザー `dd-agent` を Docker グループに追加する必要があります。Agent から以下のエラーログが表示される場合:

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Agent を Docker ユーザーグループに追加し、次のコマンドを実行します。

```
usermod -a -G docker dd-agent
```
**注:** ホストに Agent をインストールする際、Agent には ` /var/lib/docker/containers` へのアクセス権限がありません。これには root アクセスが必要です。そのため、Docker ソケットからログを収集します。


### 異なる Docker ログドライバー {#different-docker-log-driver}

Docker のデフォルトは [json-file ロギングドライバー][23]であり、Agent はまずこの構造から読み取ろうとします。コンテナが別のロギングドライバーを使用するように設定されている場合、ログ Agent はコンテナを見つけることはできますが、ファイルからログを収集することができません。Docker 環境において、Datadog は最適な Agent エクスペリエンスの `json-file` ログドライバーの使用を推奨します。ただし、Agent は `journald` ロギングドライバーから読み取るように構成することもできます。

1. どのロギングドライバーがコンテナに使用されているかわからない場合は、`docker inspect <CONTAINER_NAME>` を使用して、設定されているロギングドライバーを確認してください。コンテナに JSON ロギングドライバーが使用されている場合は、Docker Inspect に次のブロックが表示されます

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. コンテナに journald ロギングドライバーが使用されている場合は、Docker Inspect に次のブロックが表示されます。
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. journald ロギングドライバーからログを収集するには、[Datadog-Journald のドキュメントに従って][24] journald インテグレーションを設定してください。
4. [Docker Agent のドキュメント][25]の説明に従って、YAML ファイルをコンテナにマウントする必要があります。Docker コンテナへのログドライバーの設定について詳しくは、[こちらのドキュメント][26]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/docker/log/
[2]: /ja/containers/kubernetes/log/
[3]: /ja/integrations/aws-fargate/?tab=webui#log-collection
[4]: /ja/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator#log-collection
[5]: /ja/containers/guide/container-discovery-management
[6]: /ja/containers/docker/log/?tab=dockerfile#log-integrations
[7]: /ja/containers/kubernetes/log/?tab=datadogoperator#autodiscovery-annotations
[8]: /ja/getting_started/site/
[9]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile
[10]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[11]: /ja/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[12]: /ja/containers/kubernetes/tag/?tab=datadogoperator
[13]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[14]: /ja/getting_started/tagging/#tag-inheritance
[15]: /ja/agent/configuration/agent-commands/
[16]: /ja/logs/log_configuration/pipelines/?tab=host#preprocessing
[17]: https://app.datadoghq.com/logs/pipelines
[18]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[19]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /ja/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /ja/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /ja/integrations/journald/?tab=host#setup
[25]: /ja/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/