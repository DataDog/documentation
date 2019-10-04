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

この機能には、[クラスターチェック機能を有効にして][3] Cluster Agent が実行されている必要があります。

### Cluster Agent のドキュメント

<mrk mid="28" mtype="seg">Datadog **Host** Agent で `clusterchecks` 構成プロバイダーを有効にします。</mrk><mrk mid="29" mtype="seg">それには 2 つの方法があります。</mrk>

- `DD_EXTRA_CONFIG_PROVIDERS` 環境変数を設定します。

≪```
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
```≫

- または、`datadog.yaml` 構成ファイルに追加します。

<mrk mid="33" mtype="seg">```yaml
config_providers:</mrk>
  <mrk mid="34" mtype="seg">- name: clusterchecks
    polling: true
```</mrk>

[Agent を再起動][4]して、構成の変更を適用します。

### カスタムチェック

<mrk mid="37" mtype="seg">[カスタム Agent チェック][5]をクラスターチェックとして実行できますが、すべてのノードベースの Agent がそれを実行できることが条件です。</mrk><mrk mid="38" mtype="seg">つまり、次の条件を満たしている必要があります。</mrk>

- チェックのコードが、`clusterchecks` 構成プロバイダーが有効になっているすべてのノードベースの Agent にインストールされている。
- チェックのコードが、一部のエージェントにアクセスできないローカルリソースに依存していない。

## チェック構成のセットアップ

### ファイル内の静的構成

<mrk mid="43" mtype="seg">リソースの IP が変わらない場合 (例: 外部サービスエンドポイント、パブリック URL)、静的構成を yaml ファイルとして Cluster Agent に渡すことができます。</mrk><mrk mid="44" mtype="seg">ファイル命名規則と構文はノードベースの Agent に対する静的構成と同じですが、`cluster_check: true` 行が追加されています。</mrk>

#### <mrk mid="45" mtype="seg">例: </mrk> <mrk mid="46" mtype="seg">CloudSQL データベースの MySQL チェック</mrk>

CloudSQL インスタンスと [Datadog ユーザー][6]をセットアップしたら、以下の内容の `/conf.d/mysql.yaml` ファイルを Cluster Agent コンテナにマウントします。

<mrk mid="48" mtype="seg">```yaml
cluster_check: true
init_config:
instances:</mrk>
  <mrk mid="49" mtype="seg">- server:</mrk> <mrk mid="50" mtype="seg">'&lt;PRIVATE_IP_ADDRESS&gt;'
    port:</mrk> <mrk mid="51" mtype="seg">3306
    user: datadog
    pass:</mrk> <mrk mid="52" mtype="seg">'&lt;YOUR_CHOSEN_PASSWORD&gt;'
```</mrk>

`cluster_check` フィールドは、このチェックを 1 つのノードベースの Agent に委譲するように Cluster Agent に通知します。

### <mrk mid="54" mtype="seg">テンプレートソース: </mrk> <mrk mid="55" mtype="seg">Kubernetes サービスアノテーション</mrk>

[Kubernetes ポッドへのアノテーション][7]と同様に、次の構文でサービスにアノテーションを追加できます。

<mrk mid="57" mtype="seg">```yaml
  ad.datadoghq.com/service.check_names:</mrk> <mrk mid="58" mtype="seg">'[&lt;CHECK_NAME&gt;]'
  ad.datadoghq.com/service.init_configs:</mrk> <mrk mid="59" mtype="seg">'[&lt;INIT_CONFIG&gt;]'
  ad.datadoghq.com/service.instances:</mrk> <mrk mid="60" mtype="seg">'[&lt;INSTANCE_CONFIG&gt;]'
```</mrk>

<mrk mid="61" mtype="seg">`%%host%%` [テンプレート変数][8]がサポートされ、これがサービスの IP に置き換えられます。</mrk><mrk mid="62" mtype="seg">`kube_namespace` タグと `kube_service` タグは、自動的にインスタンスに追加されます。</mrk>

#### <mrk mid="63" mtype="seg">例:</mrk> <mrk mid="64" mtype="seg">nginx によってホストされるサービスの HTTP チェック</mrk>

次のサービス定義は、`my-nginx` デプロイからポッドを公開し、負荷分散型サービスのレイテンシーを測定する [HTTP チェック][9]を実行します。

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

さらに、各ポッドを [NGINX チェック][10]で監視する必要があります。NGINX チェックは、サービス全体だけでなく各ワーカーの監視も可能です。

## トラブルシューティング

<mrk mid="84" mtype="seg">分散型という性質上、クラスターチェックのトラブルシューティングは多少複雑です。</mrk><mrk mid="85" mtype="seg">以下のセクションでは、ディスパッチ処理と関連するトラブルシューティングコマンドについて説明します。</mrk>

### Kubernetes: リーダー Cluster Agent の検索

<mrk mid="87" mtype="seg">リーダー選出が有効になっている場合は、リーダーだけがクラスターチェック構成をノードベースの Agent に提供します。</mrk><mrk mid="88" mtype="seg">リーダーの名前は `datadog-leader-election` ConfigMap 内にあります。</mrk>

```
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

<mrk mid="95" mtype="seg">この例では、リーダーポッドは `cluster-agent-rhttz` です。</mrk><mrk mid="96" mtype="seg">これが削除されている、あるいは応答がない場合は、別のポッドが自動的に引き継ぎます。</mrk>

### Cluster Agent 内のオートディスカバリー

Cluster Agent によって構成 (静的または自動検出) が選択されたことを確認するには、リーダー Cluster Agent 内で `configcheck` コマンドを使用します。

```
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

`clusterchecks` コマンドを使用して、ディスパッチロジックの状態を調査できます。次の情報が含まれます。

- どのノードベースの Agent が Cluster Agent にアクティブに報告しているか
- 各ノードにどのチェックがディスパッチされているか

```
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

```
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

Instance ID は以前のものと一致します。

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```
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
[2]: /ja/agent/kubernetes/cluster
[3]: /ja/agent/kubernetes/cluster/#cluster-checks-autodiscovery
[4]: /ja/agent/guide/agent-commands
[5]: /ja/developers/write_agent_check
[6]: /ja/integrations/mysql
[7]: /ja/agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[8]: /ja/agent/autodiscovery/?tab=kubernetes#supported-template-variables
[9]: /ja/integrations/http_check
[10]: /ja/integrations/nginx