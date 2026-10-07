---
algolia:
  tags:
  - auto conf
  - ignore auto conf
  - autoconf
  - ignore autoconf
aliases:
- /ja/agent/autodiscovery/auto_conf
- /ja/agent/faq/auto_conf
- /ja/agent/guide/auto_conf
description: Autodiscovery 自動構成テンプレートを使用して、一般的なコンテナ化サービスの自動構成を管理します。
further_reading:
- link: /containers/kubernetes/integrations/
  tag: ドキュメント
  text: Kubernetes の Autodiscovery とのインテグレーションを構成する
- link: /containers/docker/integrations/
  tag: ドキュメント
  text: Docker の Autodiscovery とのインテグレーションを構成する
- link: /containers/guide/container-discovery-management/
  tag: ドキュメント
  text: コンテナディスカバリー管理
title: Autodiscovery 自動構成
---
Agent がコンテナとして実行されると、[Autodiscovery][44] は `auto_conf.yaml` という名前のデフォルト設定ファイルに基づいて他のコンテナの検出しようとします。これらのファイルは、次のインテグレーション用の `conf.d/<INTEGRATION>.d/` フォルダーにあります。

| インテグレーション                    | 自動構成ファイル |
| ------                         | --------                |
| [Apache][1]                    | [auto_conf.yaml][2]     |
| [Cilium][3]                    | [auto_conf.yaml][4]     |
| [Consul][5]                    | [auto_conf.yaml][6]     |
| [Coredns][7]                   | [auto_conf.yaml][8]     |
| [Couch][9]                     | [auto_conf.yaml][10]    |
| [Couchbase][11]                | [auto_conf.yaml][12]    |
| [Elastic][13]                  | [auto_conf.yaml][14]    |
| [Etcd][15]                     | [auto_conf.yaml][16]    |
| [External DNS][17]             | [auto_conf.yaml][18]    |
| [Istio][19]                    | [auto_conf.yaml][20]    |
| [Kube APIserver][21]           | [auto_conf.yaml][22]    |
| [Kube Controller Manager][23]  | [auto_conf.yaml][24]    |
| [KubeDNS][21]                  | [auto_conf.yaml][25]    |
| [Kube Scheduler][26]           | [auto_conf.yaml][27]    |
| [Kubernetes State][21]         | [auto_conf.yaml][28]    |
| [Kyototycoon][29]              | [auto_conf.yaml][30]    |
| [MemCached][31]                | [auto_conf.yaml][32]    |
| [Presto][33]                   | [auto_conf.yaml][34]    |
| [RabbitMQ][42]                 | [auto_conf.yaml][43]    |
| [Redis][35]                    | [auto_conf.yaml][36]    |
| [Riak][37]                     | [auto_conf.yaml][38]    |
| [Tomcat][39]                   | [auto_conf.yaml][40]    |

`auto_conf.yaml` 構成ファイルには、特定のインテグレーションのセットアップに必要なすべてのパラメーターと、コンテナ環境を考慮して用意されているそれらに相当する [オートディスカバリーテンプレートの変数][41] が含まれます。

## 自動構成のオーバーライド {#override-auto-configuration}
各 `auto_conf.yaml` ファイルにはデフォルト設定が用意されています。Kubernetes でこれをオーバーライドするには、[Kubernetes アノテーション][45] にカスタム設定を追加するか、[`DatadogInstrumentation` カスタムリソース][47] を使用します。Docker の場合は、[Docker ラベル][46] を使用します。

Kubernetes アノテーションは、`DatadogInstrumentation` リソースおよび `auto_conf.yaml` ファイルよりも優先されます。`DatadogInstrumentation` リソースは `auto_conf.yaml` ファイルよりも優先され、`auto_conf.yaml` ファイルは Datadog Operator および Helm チャートで設定された Autodiscovery 構成よりも優先されます。Datadog Operator または Helm を使用してこのページのテーブルにあるインテグレーションの Autodiscovery を構成するには、[自動構成を無効化する](#disable-auto-configuration)必要があります。

## 自動構成を無効化する {#disable-auto-configuration}

次の例では、Redis と Istio のインテグレーションの自動構成を無効化しています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` で、`override.nodeAgent.containers.agent.env` を使用して `agent` コンテナで `DD_IGNORE_AUTOCONF` 環境変数を設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  override:
    nodeAgent:
      containers: 
        agent:
          env:
            - name: DD_IGNORE_AUTOCONF
              value: "redisdb istio"
```

その後、新しい設定を適用します。

{{% /tab %}}
{{% tab "Helm" %}}

`datadog.ignoreAutoconfig` を `datadog-values.yaml` に追加します。

```yaml
datadog:
  #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "コンテナ化された Agent" %}}
コンテナ化された Agent (手動 DaemonSet、Docker、ECS) でインテグレーションの自動構成を無効化するには、`DD_IGNORE_AUTOCONF` 環境変数を追加します。

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## 構成の検出 {#configuration-discovery}

Agentバージョン7.82以降、いくつかの統合（例：[Pulsar][48]）は、`auto_conf.yaml`ファイルに`discovery`フィールドと空の`instances`リストを同梱しています。このような場合、Agentはサービスを調査することで、実行時にその統合のための有効な構成を作成しようとします。各統合は、独自の検出方法を定義します。例えば、統合はメトリクスエンドポイントのために公開されたコンテナポートを調査したり、コンテナ名を使用して同じイメージを共有するコンポーネントを区別したりできます。有効な構成が見つかった場合、Agentはチェックインスタンスをスケジュールします。

メトリクスの重複を避けるため、以下の場合、Agentはその統合の構成検出をスキップします。
- 同じコンテナまたはホストレベルに対して構成された、同じ統合のインスタンスが存在する場合
- 同じコンテナに対して構成された、汎用OpenMetricsまたはPrometheusチェックのインスタンスが存在する場合
- 統合と同じルート名前空間の下でメトリクスを出力する、汎用OpenMetricsまたはPrometheusチェックのホストレベルインスタンスが存在する場合

さらに、Agentバージョン7.83以降、このメカニズムによって作成されたすべてのチェックインスタンスには、そのメトリクスにタグ`dd_config_discovery:true`が含まれます。クエリでこれらのメトリクスを識別または除外するには、このタグを使用してください。

統合の構成検出を防ぐには、[自動構成を無効にしてください](#disable-auto-configuration)。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data/auto_conf.yaml
[3]: /ja/integrations/cilium
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/auto_conf.yaml
[5]: /ja/integrations/consul/
[6]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[7]: /ja/integrations/coredns/
[8]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[9]: /ja/integrations/couch/
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: /ja/integrations/couchbase/
[12]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[13]: /ja/integrations/elastic/
[14]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[15]: /ja/integrations/etcd/
[16]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[17]: /ja/integrations/external_dns
[18]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/auto_conf.yaml
[19]: /ja/integrations/istio
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[21]: /ja/agent/kubernetes/
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: /ja/integrations/kube_controller_manager
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[26]: /ja/integrations/kube_scheduler
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[28]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[29]: /ja/integrations/kyototycoon/
[30]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[31]: /ja/integrations/mcache/
[32]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[33]: /ja/integrations/presto/
[34]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[35]: /ja/integrations/redisdb/
[36]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[37]: /ja/integrations/riak/
[38]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[39]: /ja/integrations/tomcat/
[40]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[41]: /ja/agent/guide/template_variables/
[42]: /ja/integrations/rabbitmq/
[43]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[44]: /ja/getting_started/containers/autodiscovery
[45]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[46]: /ja/containers/docker/integrations/
[47]: /ja/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
[48]: https://github.com/DataDog/integrations-core/tree/master/pulsar/datadog_checks/pulsar/data/auto_conf.yaml