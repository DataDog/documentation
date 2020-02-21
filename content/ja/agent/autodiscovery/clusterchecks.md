---
title: Autodiscovery によるクラスターチェックの実行
kind: documentation
further_reading:
  - link: /agent/autodiscovery
    tag: Documentation
    text: オートディスカバリーの主要ドキュメント
  - link: /agent/autodiscovery/endpointschecks/
    tag: Documentation
    text: エンドポイントチェックドキュメント
  - link: agent/kubernetes/host_setup
    tag: ドキュメント
    text: Cluster Agent のドキュメント
---
## オートディスカバリーの動作

<mrk mid="13" mtype="seg">Datadog Agent は、[オートディスカバリーメカニズム][1]によってコンテナを自動検出し、チェック構成を作成できます。</mrk><mrk mid="14" mtype="seg">クラスターチェック機能は、このメカニズムを拡張して、次のような非コンテナ化ワークロードを監視します。</mrk>

- クラスター外のデータストアとエンドポイント (例: RDS、CloudSQL)
- 負荷分散型クラスターサービス (例: Kubernetes サービス)

<mrk mid="17" mtype="seg">各チェックのインスタンスが 1 つだけ実行されるように、[Cluster Agent][2] は構成を保持し、それをノードベースの Agent に動的にディスパッチします。</mrk><mrk mid="18" mtype="seg">Agent は 10 秒ごとに Cluster Agent に接続し、実行する構成を取得します。</mrk><mrk mid="19" mtype="seg">1 つの Agent が報告を停止した場合、Cluster Agent はその Agent をアクティブなプールから削除し、他の Agent に構成をディスパッチします。</mrk><mrk mid="20" mtype="seg">これにより、クラスターにノードが追加または削除されても、常にインスタンスが 1 つだけ実行されることになります。</mrk>

<mrk mid="21" mtype="seg">クラスターチェックによって収集されたメトリクス、イベント、およびサービスチェックは、ホスト名なしで送信されます。ホスト名は関連がないためです。</mrk><mrk mid="22" mtype="seg">データの絞り込みやスライスを実行できるように、`cluster_name` タグが追加されます。</mrk>

現在、この機能は、Kubernetes 上で Agent のバージョン 6.9.0+ および Cluster Agent のバージョン 1.2.0+ でサポートされています。

## 設定方法

### Cluster Agent のドキュメント

この機能では、[Cluster Agent][3]を実行させておく必要があります。

そして、クラスターチェック機能を有効にします。

バージョン1.2.0より、Datadog Cluster Agentはコンテナ化されていないクラスターリソースに対し、オートディスカバリー機構を拡張しています。有効にするには、Cluster Agentの展開に以下の変更を加える必要があります。

1. `DD_CLUSTER_CHECKS_ENABLED` を `true` に設定します。
2. クラスター名を`DD_CLUSTER_NAME`とします。メトリクスにスコープを当てるため、Datadogは全ての構成に`cluster_name`インスタンスタグとしてクラスター名を挿入します。
3. 推奨されるリーダー選択リース時間は15秒です。環境変数`DD_LEADER_LEASE_DURATION`で設定できます。
4. サービス名が初期設定の`datadog-cluster-agent`と異なる場合には、サービス名が`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` の環境変数に反映されるようにします。

現在、以下の二つの構成ソースがサポートされています。[オートディスカバリーの文書に記載されています。][4]

* `/conf.d`フォルダのConfigMapからYAMLファイルをマウントできます。画像のエントリーポイントで自動的にインポートされます。
* Kubernetesサービスのアノテーションでは、`DD_EXTRA_CONFIG_PROVIDERS`と`DD_EXTRA_LISTENERS`の両方の環境変数を`kube_services`に設定する必要があります。

ホスト名は、ホストタグと`DD_TAGS`の環境変数の使用を制限するクラスターチェックメトリクスにリンクしていません。クラスターチェックメトリクスにタグを追加するには、`DD_CLUSTER_CHECKS_EXTRA_TAGS` の環境変数を使用します。

この機能の構成とトラブルシューティングの詳細は、[クラスターチェックオートディスカバリー専用ガイド][5]を参照して下さい。

### Cluster Agent のドキュメント

<mrk mid="28" mtype="seg">Datadog **Host** Agent で `clusterchecks` 構成プロバイダーを有効にします。</mrk><mrk mid="29" mtype="seg">それには 2 つの方法があります。</mrk>

- `DD_EXTRA_CONFIG_PROVIDERS`の環境変数を設定します。複数の値がある場合には、スペースで区切られたストリングになります。

```text
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
```

- または、`datadog.yaml` 構成ファイルに追加します。

<mrk mid="33" mtype="seg">```yaml
config_providers:</mrk>
  <mrk mid="34" mtype="seg">- name: clusterchecks
    polling: true
```</mrk>

[Agentを再起動][6]して構成変更を適用します。

### カスタムチェック

全てのノードベースのAgentによる実行が可能であれば、クラスターチェックとしての[Agentのカスタムチェック][7]の実行がサポートされています。これにより、チェックのコードは以下のようになります。

- `clusterchecks`の構成プロバイダが有効になっている全てのノードベースのAgentにインストールされていること。
- 全てのAgentにアクセス可能ではない、ローカルのリソースに依存**しない**こと。

## チェック構成設定

### ファイル内の静的構成

<mrk mid="43" mtype="seg">リソースの IP が変わらない場合 (例: 外部サービスエンドポイント、パブリック URL)、静的構成を yaml ファイルとして Cluster Agent に渡すことができます。</mrk><mrk mid="44" mtype="seg">ファイル命名規則と構文はノードベースの Agent に対する静的構成と同じですが、`cluster_check: true` 行が追加されています。</mrk>

#### 例: CloudSQLデータベース上のMySQLチェック

CloudSQLインスタンスと[Datadogユーザー][8]を設定後、`/conf.d/mysql.yaml`ファイルを以下の内容と共にCluster Agentにマウントします。

<mrk mid="48" mtype="seg">```yaml
cluster_check: true
init_config:
instances:</mrk>
  <mrk mid="49" mtype="seg">- server:</mrk> <mrk mid="50" mtype="seg">'&lt;PRIVATE_IP_ADDRESS&gt;'
    port:</mrk> <mrk mid="51" mtype="seg">3306
    user: datadog
    pass:</mrk> <mrk mid="52" mtype="seg">'&lt;YOUR_CHOSEN_PASSWORD&gt;'
```</mrk>

`cluster_check`のフィールドにより、Cluster Agentにこのチェックを一つのノードベースのAgentに委任するよう知らせます。

### <mrk mid="54" mtype="seg">テンプレートソース: </mrk> <mrk mid="55" mtype="seg">Kubernetes サービスアノテーション</mrk>

[アノテートKubernetes ポッド][9]の構文と同様に、以下の構文でサービスをアノテートできます。

```yaml
  ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
  ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

サービスIPにより、`%%host%%` [テンプレート変数][10]がサポートされ、変換されます。`kube_namespace`と `kube_service`のタグは自動的にインスタンスに付与されます。

#### <mrk mid="63" mtype="seg">例:</mrk> <mrk mid="64" mtype="seg">nginx によってホストされるサービスの HTTP チェック</mrk>

以下のサービス定義では、`my-nginx` デプロイからポッドを外部に出し、[HTTPチェック][11]を実行させて負荷分散サービスの待ち時間を測定します。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
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

さらに、集約されたサービスだけではなく各ワーカーのモニターも可能なため、各ポッドは[NGINXチェック][12]によりモニターされます。

## トラブルシューティング

クラスターチェックの分布性により、トラブルシューティングは少々手間取ります。以下のセクションでは、ディスパッチプロセスと関連するトラブルシューティングコマンドについて説明します。

### Kubernetes: リーダー Cluster Agent の検索

リーダー選択が可能な場合、リーダーだけがクラスターチェック構成をノードベースのAgentに送ります。リーダー名は`datadog-leader-election`のConfigMapで見られます。

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

Cluster Agentに構成(静的またはオートディスカバリー)が分かるよう、Cluster Agentのリーダーの`configcheck`コマンドを使用します。

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

`clusterchecks`コマンドにより、以下を含む、ディスパッチロジックの状態をチェックできます。

* どのノードベースの Agent が Cluster Agent にアクティブに報告しているか
* 各ノードにどのチェックがディスパッチされているか

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

インスタンスIDは初期のものと一致します。

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

[1]: /ja/agent/autodiscovery
[2]: /ja/agent/cluster_agent
[3]: /ja/agent/cluster_agent/setup
[4]: /ja/agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[5]: /ja/agent/autodiscovery/clusterchecks
[6]: /ja/agent/guide/agent-commands
[7]: /ja/developers/write_agent_check
[8]: /ja/integrations/mysql
[9]: /ja/agent/autodiscovery/integrations/?tab=kubernetes#configuration
[10]: /ja/agent/autodiscovery/template_variables
[11]: /ja/integrations/http_check
[12]: /ja/integrations/nginx