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
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Docker
- link: /containers/guide/container-discovery-management/
  tag: ドキュメント
  text: コンテナディスカバリー管理
title: Autodiscovery Auto-Configuration
---

Agent がコンテナとして実行されると、[Autodiscovery][49] は `auto_conf.yaml` という名前のデフォルト設定ファイルに基づいて他のコンテナを検出しようとします。これらのファイルは、次のインテグレーション用の `conf.d/<INTEGRATION>.d/` フォルダーにあります。

| インテグレーション                    | オートディスカバリー構成ファイル |
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
| [Harbor][19]                   | [auto_conf.yaml][20]    |
| [Istio][21]                    | [auto_conf.yaml][22]    |
| [Kube APIserver][23]           | [auto_conf.yaml][24]    |
| [Kube Controller Manager][25]  | [auto_conf.yaml][26]    |
| [KubeDNS][23]                  | [auto_conf.yaml][27]    |
| [Kube Scheduler][28]           | [auto_conf.yaml][29]    |
| [Kubernetes State][23]         | [auto_conf.yaml][30]    |
| [Kyototycoon][31]              | [auto_conf.yaml][32]    |
| [MemCached][33]                | [auto_conf.yaml][34]    |
| [Presto][35]                   | [auto_conf.yaml][36]    |
| [RabbitMQ][47]                 | [auto_conf.yaml][48]    |
| [Redis][37]                    | [auto_conf.yaml][38]    |
| [Riak][39]                     | [auto_conf.yaml][40]    |
| [Tomcat][41]                   | [auto_conf.yaml][42]    |

`auto_conf.yaml` 構成ファイルには、特定のインテグレーションのセットアップに必要なすべてのパラメーターと、コンテナ環境を考慮して用意されているそれらに相当する[オートディスカバリーテンプレートの変数][43]が含まれます。

## 自動構成のオーバーライド
各 `auto_conf.yaml` ファイルにはデフォルト設定が用意されています。これをオーバーライドするには、[Kubernetes アノテーション][50] または [Docker ラベル][51] にカスタム設定を追加できます。

[Kubernetes アノテーション] と [Docker ラベル] は `auto_conf.yaml` ファイルよりも優先されますが、`auto_conf.yaml` ファイルは Datadog Operator や Helm チャートで設定された Autodiscovery 設定よりも優先されます。このページの表にあるインテグレーションを Datadog Operator または Helm で Autodiscovery 設定する場合は、必ず [自動構成を無効化](#disable-auto-configuration) してください。

## 自動構成の無効化

次の例では、Redis と Istio のインテグレーションの自動構成を無効化しています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` 内で、`override.nodeAgent.containers.agent.env` を使用して `agent` コンテナに `DD_IGNORE_AUTOCONF` 環境変数を設定します。

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

`datadog-values.yaml` に `datadog.ignoreAutoconfig` を追加します:

```yaml
datadog:
  #auto_conf.yaml を無視するインテグレーションの一覧。
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "Containerized Agent" %}}
手動 DaemonSet、Docker、ECS などのコンテナ化 Agent でインテグレーションの自動構成を無効化するには、`DD_IGNORE_AUTOCONF` 環境変数を追加します:

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

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
[19]: /ja/integrations/harbor/
[20]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[21]: /ja/integrations/istio
[22]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[23]: /ja/agent/kubernetes/
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[25]: /ja/integrations/kube_controller_manager
[26]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[28]: /ja/integrations/kube_scheduler
[29]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[31]: /ja/integrations/kyototycoon/
[32]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[33]: /ja/integrations/mcache/
[34]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[35]: /ja/integrations/presto/
[36]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[37]: /ja/integrations/redisdb/
[38]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[39]: /ja/integrations/riak/
[40]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[41]: /ja/integrations/tomcat/
[42]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[43]: /ja/agent/guide/template_variables/
[44]: /ja/agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[45]: /ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[46]: /ja/agent/docker/integrations/#configuration
[47]: /ja/integrations/rabbitmq/
[48]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[49]: /ja/getting_started/containers/autodiscovery
[50]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[51]: /ja/containers/docker/integrations/