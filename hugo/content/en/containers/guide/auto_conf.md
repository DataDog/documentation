---
title: Autodiscovery Auto-Configuration
description: Manage automatic configuration for popular containerized services using Autodiscovery auto-configuration templates
aliases:
 - /agent/autodiscovery/auto_conf
 - /agent/faq/auto_conf
 - /agent/guide/auto_conf
further_reading:
- link: "/containers/kubernetes/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Kubernetes"
- link: "/containers/docker/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Docker"
- link: "/containers/guide/container-discovery-management/"
  tag: "Documentation"
  text: "Container Discovery Management"
algolia:
  tags: ['auto conf','ignore auto conf', 'autoconf','ignore autoconf']
---

When the Agent runs as a container, [Autodiscovery][47] tries to discover other containers based on default configuration files named `auto_conf.yaml`. You can find these files in the corresponding `conf.d/<INTEGRATION>.d/` folders for the following integrations:

| Integration                    | Auto-configuration file |
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
| [RabbitMQ][45]                 | [auto_conf.yaml][46]    |
| [Redis][35]                    | [auto_conf.yaml][36]    |
| [Riak][37]                     | [auto_conf.yaml][38]    |
| [Tomcat][39]                   | [auto_conf.yaml][40]    |

The `auto_conf.yaml` configuration files cover all required parameters to set up a specific integration, with their corresponding [Autodiscovery Templates Variables][41] in place to take into account the containerized environment.

## Override auto-configuration
Each `auto_conf.yaml` file provides a default configuration. To override this on Kubernetes, you can add a custom configuration in [Kubernetes annotations][48] or use the [`DatadogInstrumentation` custom resource][50]. For Docker, use [Docker Labels][49].

Kubernetes annotations take precedence over `DatadogInstrumentation` resources and `auto_conf.yaml` files. `DatadogInstrumentation` resources take precedence over `auto_conf.yaml` files, and `auto_conf.yaml` files take precedence over Autodiscovery configuration set in the Datadog Operator and Helm charts. To use Datadog Operator or Helm to configure Autodiscovery for an integration in the table on this page, you must [disable auto-configuration](#disable-auto-configuration).

## Disable auto-configuration

The following examples disable auto-configuration for the Redis and Istio integrations.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In your `datadog-agent.yaml`, use `override.nodeAgent.containers.agent.env` to set the `DD_IGNORE_AUTOCONF` environment variable in the `agent` container.

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

Then, apply the new configuration.

{{% /tab %}}
{{% tab "Helm" %}}

Add `datadog.ignoreAutoconfig` to your `datadog-values.yaml`:

```yaml
datadog:
  #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "Containerized Agent" %}}
To disable auto configuration integration(s) with your containerized agent (manual DaemonSet, Docker, ECS), add the `DD_IGNORE_AUTOCONF` environment variable:

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data/auto_conf.yaml
[3]: /integrations/cilium
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/auto_conf.yaml
[5]: /integrations/consul/
[6]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[7]: /integrations/coredns/
[8]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[9]: /integrations/couch/
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: /integrations/couchbase/
[12]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[13]: /integrations/elastic/
[14]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[15]: /integrations/etcd/
[16]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[17]: /integrations/external_dns
[18]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/auto_conf.yaml
[19]: /integrations/istio
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[21]: /agent/kubernetes/
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: /integrations/kube_controller_manager
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[26]: /integrations/kube_scheduler
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[28]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[29]: /integrations/kyototycoon/
[30]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[31]: /integrations/mcache/
[32]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[33]: /integrations/presto/
[34]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[35]: /integrations/redisdb/
[36]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[37]: /integrations/riak/
[38]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[39]: /integrations/tomcat/
[40]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[41]: /agent/guide/template_variables/
[42]: /agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[43]: /agent/kubernetes/integrations/?tab=kubernetes#configuration
[44]: /agent/docker/integrations/#configuration
[45]: /integrations/rabbitmq/
[46]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[47]: /getting_started/containers/autodiscovery
[48]: /containers/kubernetes/integrations/?tab=annotations#configuration
[49]: /containers/docker/integrations/
[50]: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/
