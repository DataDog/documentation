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
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: オートディスカバリーのインテグレーションテンプレートの作成とロード
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Agent オートディスカバリーに含めるコンテナの管理
title: Autodiscovery Auto-Configuration
---

コンテナとして実行されている Agent は、デフォルトで、`auto_conf.yaml` というデフォルトのオートディスカバリー構成ファイルに基づいて他のコンテナの自動検出を試みます。この構成ファイルは、以下に示すインテグレーションの該当する `conf.d/<INTEGRATION>.d/` フォルダーにあります。

## 自動構成ファイル

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

## 構成のカスタマイズ
自動構成ロジックは、上記のどのインテグレーションに対しても、デフォルトの構成しかサポートしません。Datadog インテグレーションの構成をカスタマイズしたい場合は、インテグレーションテンプレートのドキュメントを参照して、Agent オートディスカバリーの構成方法を学んでください。Kubernetes アノテーションや Docker ラベルを通じて発見された、任意のコンテナに対する構成は、`auto_conf.yaml` ファイルより優先されます。

* [Key-Value ストアの使用][44]
* [Kubernetes アノテーションの使用][45]
* [Docker ラベルの使用][46]

## 自動構成を無効にする

Agent が `auto_conf.yaml` 構成を使用しないようにするには、無効にしたいインテグレーションに対して `DD_IGNORE_AUTOCONF` 環境変数を追加することができます。次の例は、Agent が [`redisdb.d/auto_conf.yaml`][38] と [`istio.d/auto_conf.yaml`][22] ファイルを無視して、これらのインテグレーションを自動的にセットアップしないようにします。

{{< tabs >}}
{{% tab "Helm" %}}

Helm との自動構成インテグレーションを無効にするには、`values.yaml` に `datadog.ignoreAutoconfig` を追加します。

```yaml
datadog:
 #auto_conf.yaml を無視するインテグレーションの一覧。
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
DaemonSet との自動構成インテグレーションを無効にするには、Agent マニフェストに `DD_IGNORE_AUTOCONF` 変数を追加します。

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