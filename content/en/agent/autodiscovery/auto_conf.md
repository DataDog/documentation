---
title: Auto-Configuration
kind: documentation
disable_toc: true
further_reading:
- link: "/agent/autodiscovery/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

The Agent, when running as a container, is trying by default to auto-discover other containers around it thanks to the `auto_conf.yaml` integrations configuration file shipped with it.

**Note**: The auto-configurations only support default configuration for the integrations below. If you want to customize your Datadog-integration configuration, refer to the Integrations Templates documentation to learn how to configure your Autodiscovery:

* [Using a configuration file mounted within the Agent][1]
* [Using Key-Value Store][2]
* [Using Kubernetes Annotations][3]
* [Using Docker Labels][4]

The following integrations are automatically discovered thanks to the `auto_conf.yaml` files shipped with the Agent:

| Integration | Auto-configuration file |
| ------ | -------- |
| [Apache][5]  | [auto_conf.yaml][6] |
| [Consul][7] | [auto_conf.yaml][8] |
| [Coredns][9] | [auto_conf.yaml][10] |
| [Couch][11] | [auto_conf.yaml][12] |
| [Couchbase][13] | [auto_conf.yaml][14] |
| [Elastic][15] | [auto_conf.yaml][16] |
| [Etcd][17] | [auto_conf.yaml][18] |
| [Harbor][19] | [auto_conf.yaml][20] |
| [Kube APIserver][21] | [auto_conf.yaml][22] |
| [KubeDNS][21] | [auto_conf.yaml][23] |
| [Kubernetes State][21] | [auto_conf.yaml][24] |
| [Kyototycoon][25] | [auto_conf.yaml][26] |
| [MemCached][27] | [auto_conf.yaml][28] |
| [Presto][29] | [auto_conf.yaml][30] |
| [Redis][31] | [auto_conf.yaml][32] |
| [Riak][33] | [auto_conf.yaml][34] |
| [Tomcat][35] | [auto_conf.yaml][36] |

For a given integration, the `auto_conf.yaml` covers all required parameters to setup an integration and the corresponding [autodiscovery templates variables][37] are already in place to take into account the containerized environment.

[1]: /agent/autodiscovery/integrations/?tab=file#configuration
[2]: /agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[3]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[4]: /agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[5]: /integrations/apache
[6]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data
[7]: /integrations/consul
[8]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[9]: /integrations/coredns
[10]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[11]: /integrations/couch
[12]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[13]: /integrations/couchbase
[14]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[15]: /integrations/elastic
[16]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[17]: /integrations/etcd
[18]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[19]: /integrations/harbor
[20]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[21]: /integrations/kubernetes
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[25]: /integrations/kyototycoon
[26]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[27]: /integrations/mcache
[28]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[29]: /integrations/presto
[30]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[31]: /integrations/redisdb
[32]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[33]: /integrations/riak
[34]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[35]: /integrations/tomcat
[36]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[37]: /agent/autodiscovery/template_variables
