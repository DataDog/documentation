---
title: コンフィグレーション
kind: documentation
disable_toc: true
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/autodiscovery/management
    tag: ドキュメント
    text: Agent オートディスカバリーに含めるコンテナの管理
---
コンテナとして実行されている Agent は、デフォルトで、`auto_conf.yaml` というデフォルトのオートディスカバリー構成ファイルに基づいて他のコンテナの自動検出を試みます。この構成ファイルは、以下に示すインテグレーションの該当する `conf.d/<INTEGRATION>.d/` フォルダーにあります。

| 統合            | オートディスカバリー構成ファイル |
| ------                 | --------                |
| [Apache][1]            | [auto_conf.yaml][2]     |
| [Consul][3]            | [auto_conf.yaml][4]     |
| [Coredns][5]           | [auto_conf.yaml][6]     |
| [Couch][7]             | [auto_conf.yaml][8]     |
| [Couchbase][9]         | [auto_conf.yaml][10]    |
| [Elastic][11]          | [auto_conf.yaml][12]    |
| [Etcd][13]             | [auto_conf.yaml][14]    |
| [Harbor][15]           | [auto_conf.yaml][16]    |
| [Kube APIserver][17]   | [auto_conf.yaml][18]    |
| [KubeDNS][17]          | [auto_conf.yaml][19]    |
| [Kubernetes State][17] | [auto_conf.yaml][20]    |
| [Kyototycoon][21]      | [auto_conf.yaml][22]    |
| [MemCached][23]        | [auto_conf.yaml][24]    |
| [Presto][25]           | [auto_conf.yaml][26]    |
| [Redis][27]            | [auto_conf.yaml][28]    |
| [Riak][29]             | [auto_conf.yaml][30]    |
| [Tomcat][31]           | [auto_conf.yaml][32]    |

`auto_conf.yaml` 構成ファイルには、特定のインテグレーションのセットアップに必要なすべてのパラメーターと、コンテナ環境を考慮して用意されているそれらに相当する[オートディスカバリーテンプレートの変数][33]が含まれます。

**注**: オートディスカバリー構成ロジックは、上記のインテグレーションのデフォルトの構成のみサポートします。Datadog インテグレーション構成をカスタマイズする場合は、Agent オートディスカバリーの構成方法についてインテグレーションテンプレートのドキュメントを参照してください。

* [Agent 内にマウントされた構成ファイルの使用][34]
* [key-value ストアの使用][35]
* [Kubernetes アノテーションの使用][36]
* [Docker ラベルの使用][37]

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/apache
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data
[3]: /ja/integrations/consul
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[5]: /ja/integrations/coredns
[6]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[7]: /ja/integrations/couch
[8]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[9]: /ja/integrations/couchbase
[10]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[11]: /ja/integrations/elastic
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: /ja/integrations/etcd
[14]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[15]: /ja/integrations/harbor
[16]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[17]: /ja/integrations/kubernetes
[18]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[21]: /ja/integrations/kyototycoon
[22]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[23]: /ja/integrations/mcache
[24]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[25]: /ja/integrations/presto
[26]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[27]: /ja/integrations/redisdb
[28]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[29]: /ja/integrations/riak
[30]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[31]: /ja/integrations/tomcat
[32]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[33]: /ja/agent/autodiscovery/template_variables
[34]: /ja/agent/autodiscovery/integrations/?tab=file#configuration
[35]: /ja/agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[36]: /ja/agent/autodiscovery/integrations/?tab=kubernetes#configuration
[37]: /ja/agent/autodiscovery/integrations/?tab=docker#configuration