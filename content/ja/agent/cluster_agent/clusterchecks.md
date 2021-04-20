---
title: Autodiscovery によるクラスターチェックの実行
kind: ドキュメント
aliases:
  - /ja/agent/autodiscovery/clusterchecks
further_reading:
  - link: agent/kubernetes/host_setup
    tag: ドキュメント
    text: Cluster Agent のドキュメント
---
## 概要

Datadog Agent は、[オートディスカバリーメカニズム][1]によってコンテナを自動検出し、チェック構成を作成できます。

クラスターチェックは機能を拡張し、次のようなコンテナ化されていないワークロードを監視します。

- クラスター外のデータストアとエンドポイント (例: RDS、CloudSQL)
- 負荷分散型クラスターサービス (例: Kubernetes サービス)

各チェックのインスタンスが 1 つだけ実行されるように、[Cluster Agent][2] は構成を保持し、それをノードベースの Agent に動的にディスパッチします。Agent は 10 秒ごとに Cluster Agent に接続し、実行する構成を取得します。1 つの Agent が報告を停止した場合、Cluster Agent はその Agent をアクティブなプールから削除し、他の Agent に構成をディスパッチします。これにより、クラスターにノードが追加または削除されても、常にインスタンスが 1 つだけ実行されることになります。

クラスターチェックによって収集されたメトリクス、イベント、およびサービスチェックは、ホスト名は関連がないため、それ無しで送信されます。データの絞り込みやスライスを実行できるように、`cluster_name` タグが追加されます。

この機能は、Kubernetes 上で Agent のバージョン 6.9.0+ および Cluster Agent のバージョン 1.2.0+ でサポートされています。

## クラスターチェックのセットアッップ

### Cluster Agent

この機能では、[Cluster Agent][3] を実行しておく必要があります。

そして、クラスターチェック機能を有効にします。

バージョン1.2.0より、Datadog Cluster Agentはコンテナ化されていないクラスターリソースに対し、オートディスカバリー機構を拡張しています。有効にするには、Cluster Agentの展開に以下の変更を加える必要があります。

1. `DD_CLUSTER_CHECKS_ENABLED` を `true` に設定します。
2. クラスター名を `DD_CLUSTER_NAME` とします。メトリクスにスコープを当てるため、Datadog は全ての構成に `cluster_name` インスタンスタグとしてクラスター名を挿入します。
3. 推奨されるリーダー選択リース時間は15秒です。環境変数 `DD_LEADER_LEASE_DURATION` で設定できます。
4. サービス名が初期設定の `datadog-cluster-agent` と異なる場合は、サービス名が `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` の環境変数に反映されるようにします。

現在、以下の二つの構成ソースがサポートされています。[オートディスカバリーに関するドキュメントに記載されています][1]。

- `/conf.d` フォルダの ConfigMap から YAML ファイルをマウントできます。画像のエントリーポイントで自動的にインポートされます。
- Kubernetes Service のアノテーションにより、`DD_EXTRA_CONFIG_PROVIDERS` および `DD_EXTRA_LISTENERS` 環境変数をどちらも `kube_services` に設定する必要があります。

ホスト名は、ホストタグと `DD_TAGS` の環境変数の使用を制限するクラスターチェックメトリクスにリンクしていません。クラスターチェックメトリクスにタグを追加するには、`DD_CLUSTER_CHECKS_EXTRA_TAGS` の環境変数を使用します。

### エージェント

Datadog **Node** Agent で `clusterchecks` 構成プロバイダーを有効にします。それには 2 つの方法があります。

- `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を設定します。複数の値がある場合には、スペースで区切られたストリングになります。

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- または、`datadog.yaml` 構成ファイルに追加します。

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[Agent を再起動][1]して、コンフィギュレーションの変更を適用します。

**注**: [Datadog Helm Chart][4] により、クラスターチェックのみを実行するように構成された一連の Datadog Agent を `clusterChecksRunner` フィールドを介してデプロイできます。

### カスタムチェック

全てのノードベースの Agent による実行が可能であれば、クラスターチェックとしての [Agent のカスタムチェック][5]の実行がサポートされています。これにより、チェックのコードは以下のようになります。

- `clusterchecks` の構成プロバイダが有効になっている全てのノードベースの Agent にインストールされていること。
- 全ての Agent にアクセス可能ではない、ローカルのリソースに依存**しない**こと。

### 高度なディスパッチ

Cluster Agent はクラスターチェックに対する高度なディスパッチロジックを使用するように構成できます。これには、チェックインスタンスからの実行時間およびメトリクスサンプルが考慮されます。このロジックにより Cluster Agent はクラスターチェックランナー間のディスパッチと分散を最適化できます。

#### Cluster Agent のドキュメント

[Cluster Agent のセットアップ][3] ドキュメントにある手順に加え、`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` を `true` とします。

#### クラスターチェックランナーの設定

以下の環境変数は、クラスターチェックランナー（またはノード Agent）を構成する際、チェック統計を公開するために必要となります。統計は Cluster Agent によりコンシュームされ、クラスターチェックのディスパッチロジックを最適化するのに使用されます。

```
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

## チェック構成の設定

### ファイル内の静的構成

リソースの IP が変わらない場合 (例: 外部サービスエンドポイント、パブリック URL など)、静的構成を YAML ファイルとして Cluster Agent に渡すことができます。ファイル命名規則と構文はノードベースの Agent に対する静的構成と同じですが、`cluster_check: true` 行が追加されています。

#### CloudSQL データベース上の MySQL チェック

CloudSQL インスタンスと [Datadog ユーザー][6]を設定後、`/conf.d/mysql.yaml` ファイルを以下の内容と共に Cluster Agent にマウントします。

```yaml
cluster_check: true
init_config:
instances:
    - server: '<PRIVATE_IP_ADDRESS>'
      port: 3306
      user: datadog
      pass: '<YOUR_CHOSEN_PASSWORD>'
```

`cluster_check` のフィールドにより、Cluster Agent にこのチェックを一つのノードベースの Agent に委任するよう知らせます。

### テンプレートソース: Kubernetes サービスアノテーション

[Kubernetes ポッドのアノテーション][1]の構文と同様に、以下の構文でサービスをアノテーションできます。

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

`%%ホスト%%` [テンプレート変数][7]がサポートされ、これがサービスの IP に置き換えられます。`kube_namespace` タグと `kube_service` タグは、自動的にインスタンスに追加されます。

### テンプレートソース: 標準ラベル

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

`tags.datadoghq.com` ラベルは、チェックによって生成されたデータのタグとして、`env`、`service`、さらには `version` を設定します。
これらの標準ラベルは、[統合サービスタグ付け][8]の一部です。

#### 例: NGINX によってホストされるサービスの HTTP チェック

以下のサービス定義では、`my-nginx` デプロイからポッドを外部に出し、[HTTP チェック][9]を実行させて負荷分散サービスの待ち時間を測定します。

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

さらに、各ポッドを [NGINX チェック][10]で監視する必要があります。NGINX チェックは、サービス全体だけでなく各ワーカーの監視も可能です。

## トラブルシューティング

分散型という性質上、クラスターチェックのトラブルシューティングは多少複雑です。以下のセクションでは、ディスパッチプロセスと関連するトラブルシューティングコマンドについて説明します。

### Kubernetes: リーダー Cluster Agent の検索

リーダー選択が可能な場合、リーダーだけがクラスターチェック構成をノードベースの Agent に送ります。リーダー名は `datadog-leader-election` の ConfigMap で見られます。

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

<mrk mid="95" mtype="seg">この例では、リーダーポッドは `cluster-agent-rhttz` です。</mrk><mrk mid="96" mtype="seg">これが削除されている、あるいは応答がない場合は、別のポッドが自動的に引き継ぎます。</mrk>

### Cluster Agent 内のオートディスカバリー

Cluster Agent に構成 (静的またはオートディスカバリー) が分かるよう、Cluster Agent のリーダーの `configcheck` コマンドを使用します。

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Cluster Agent のディスパッチロジック

`clusterchecks` コマンドにより、以下を含むディスパッチロジックの状態をチェックできます。

- どのノードベースの Agent が Cluster Agent にアクティブに報告しているか
- 各ノードにどのチェックがディスパッチされているか

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**注**: `configcheck` コマンドとはインスタンス ID が異なりますが、インスタンスが変更されてタグとオプションが追加されるためです。

<mrk mid="117" mtype="seg">この例では、構成が `default-pool-bce5cd34-ttw6` ノードにディスパッチされます。</mrk><mrk mid="118" mtype="seg">そこからトラブルシューティングを継続します。</mrk>

### ノードベースの Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`cluster-checks` ソース付きのインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

インスタンス ID は初期のものと一致します。

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: /ja/agent/cluster_agent/
[3]: /ja/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[5]: /ja/developers/write_agent_check/
[6]: /ja/integrations/mysql/
[7]: /ja/agent/faq/template_variables/
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/integrations/http_check/
[10]: /ja/integrations/nginx/