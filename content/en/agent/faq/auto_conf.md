---
title: Autodiscovery Auto-Configuration
kind: faq
aliases:
 - /agent/autodiscovery/auto_conf
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

When the Agent runs as a container, it tries by default to Autodiscover other containers around it based on default Autodiscovery configuration files named `auto_conf.yaml`. You can find these files in the corresponding `conf.d/<INTEGRATION>.d/` folders for the following integrations:

| Integration            | Auto-configuration file |
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

The `auto_conf.yaml` configuration files cover all required parameters to set up a specific integration, with their corresponding [Autodiscovery Templates Variables][33] in place to take into account the containerized environment.

**Note**: The auto configuration logic only supports the default configuration for any integration above. If you want to customize your Datadog integration configuration, see the Integrations Templates documentation to learn how to configure your Agent Autodiscovery:

* [Using Key-Value Store][34]
* [Using Kubernetes Annotations][35]
* [Using Docker Labels][36]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data
[3]: /integrations/consul/
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[5]: /integrations/coredns/
[6]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[7]: /integrations/couch/
[8]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[9]: /integrations/couchbase/
[10]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[11]: /integrations/elastic/
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: /integrations/etcd/
[14]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[15]: /integrations/harbor/
[16]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[17]: /agent/kubernetes/
[18]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[21]: /integrations/kyototycoon/
[22]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[23]: /integrations/mcache/
[24]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[25]: /integrations/presto/
[26]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[27]: /integrations/redisdb/
[28]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[29]: /integrations/riak/
[30]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[31]: /integrations/tomcat/
[32]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[33]: /agent/faq/template_variables/
[34]: /agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[35]: /agent/kubernetes/integrations/?tab=kubernetes#configuration
[36]: /agent/docker/integrations/#configuration
