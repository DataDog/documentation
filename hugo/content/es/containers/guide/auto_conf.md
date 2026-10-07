---
algolia:
  tags:
  - auto conf
  - ignore auto conf
  - autoconf
  - ignore autoconf
aliases:
- /es/agent/autodiscovery/auto_conf
- /es/agent/faq/auto_conf
- /es/agent/guide/auto_conf
description: Administre la configuración automática para servicios en contenedores
  populares utilizando plantillas de autoconfiguración de Autodiscovery
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentación
  text: Configure integraciones con Autodiscovery en Kubernetes
- link: /containers/docker/integrations/
  tag: Documentación
  text: Configure integraciones con Autodiscovery en Docker
- link: /containers/guide/container-discovery-management/
  tag: Documentación
  text: Gestión de descubrimiento de contenedores
title: Auto-configuración de Autodiscovery
---
Cuando el Agent se ejecuta como un contenedor, [Autodiscovery][44] intenta descubrir otros contenedores basándose en archivos de configuración predeterminados llamados `auto_conf.yaml`. Puede encontrar estos archivos en las carpetas `conf.d/<INTEGRATION>.d/` correspondientes para las siguientes integraciones:

| Integración                    | Archivo de autoconfiguración |
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

Los archivos de configuración `auto_conf.yaml` cubren todos los parámetros necesarios para configurar una integración específica, con sus correspondientes [Autodiscovery Templates Variables][41] implementadas para tener en cuenta el entorno contenedorizado.

## Anular la configuración automática {#override-auto-configuration}
Cada `auto_conf.yaml` archivo proporciona una configuración predeterminada. Para anular esto en Kubernetes, puede agregar una configuración personalizada en [Kubernetes annotations][45] o usar el [`DatadogInstrumentation` recurso personalizado][47]. Para Docker, utilice [Docker Labels][46].

Las Kubernetes annotations tienen prioridad sobre los recursos `DatadogInstrumentation` y los archivos `auto_conf.yaml`. `DatadogInstrumentation` los recursos tienen prioridad sobre `auto_conf.yaml` archivos, y `auto_conf.yaml` archivos tienen prioridad sobre la configuración de Autodiscovery establecida en el Datadog Operator y en los Helm charts. Para usar Datadog Operator o Helm para configurar Autodiscovery para una integración en la tabla de esta página, debe [deshabilitar la configuración automática](#disable-auto-configuration).

## Deshabilitar la configuración automática {#disable-auto-configuration}

Los siguientes ejemplos deshabilitan la configuración automática para las integraciones de Redis e Istio.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En su `datadog-agent.yaml`, use `override.nodeAgent.containers.agent.env` para establecer la variable de entorno `DD_IGNORE_AUTOCONF` en el contenedor `agent`.

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

Luego aplique la nueva configuración.

{{% /tab %}}
{{% tab "Helm" %}}

Agregue `datadog.ignoreAutoconfig` a su `datadog-values.yaml`:

```yaml
datadog:
  #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "Agent en contenedor" %}}
Para deshabilitar la(s) integración(es) de configuración automática con su Agent en contenedor (DaemonSet manual, Docker, ECS), agregue la variable de entorno `DD_IGNORE_AUTOCONF`:

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data/auto_conf.yaml
[3]: /es/integrations/cilium
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/auto_conf.yaml
[5]: /es/integrations/consul/
[6]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[7]: /es/integrations/coredns/
[8]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[9]: /es/integrations/couch/
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: /es/integrations/couchbase/
[12]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[13]: /es/integrations/elastic/
[14]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[15]: /es/integrations/etcd/
[16]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[17]: /es/integrations/external_dns
[18]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/auto_conf.yaml
[19]: /es/integrations/istio
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[21]: /es/agent/kubernetes/
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: /es/integrations/kube_controller_manager
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[26]: /es/integrations/kube_scheduler
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[28]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[29]: /es/integrations/kyototycoon/
[30]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[31]: /es/integrations/mcache/
[32]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[33]: /es/integrations/presto/
[34]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[35]: /es/integrations/redisdb/
[36]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[37]: /es/integrations/riak/
[38]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[39]: /es/integrations/tomcat/
[40]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[41]: /es/agent/guide/template_variables/
[42]: /es/integrations/rabbitmq/
[43]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[44]: /es/getting_started/containers/autodiscovery
[45]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[46]: /es/containers/docker/integrations/
[47]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/