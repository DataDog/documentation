---
algolia:
  tags:
  - auto conf
  - ignora auto conf
  - autoconf
  - ignora autoconf
aliases:
- /es/agent/autodiscovery/auto_conf
- /es/agent/faq/auto_conf
- /es/agent/guide/auto_conf
further_reading:
- link: /contenedores/Kubernetes/integraciones/
  tag: Documentación
  text: Kubernetes y integraciones
- link: /contenedores/Docker/integraciones/
  tag: Documentación
  text: Docker y integraciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Autodiscovery Gestión
title: Configuración automática de Autodiscovery
---

Cuando Agent se ejecuta como Contenedor, [Autodiscovery][49] intenta descubrir otros contenedores basándose en archivos predeterminados Configuración denominados `auto_conf.yaml`. Puede encontrar estos archivos en las carpetas `conf.d/<INTEGRATION>.d/` correspondientes a los siguientes integraciones:

| Integración                    | Archivo de configuración automática |
| ------                         | --------                |
| [Apache][1]                    | [auto_conf.yaml][2]     |
| [Cilium][3]                    | [auto_conf.yaml][4]     |
| [Consul][5]                    | [auto_conf.yaml][6]     |
| [CoreDNS][7]                   | [auto_conf.yaml][8]     |
| [Couch][9]                     | [auto_conf.yaml][10]    |
| [Couchbase][11]                | [auto_conf.yaml][12]    |
| [Elastic][13]                  | [auto_conf.yaml][14]    |
| [etcd][15]                     | [auto_conf.yaml][16]    |
| [External DNS][17]             | [auto_conf.yaml][18]    |
| [Harbor][19]                   | [auto_conf.yaml][20]    |
| [Istio][21]                    | [auto_conf.yaml][22]    |
| [Kube APIserver][23]           | [auto_conf.yaml][24]    |
| [Kube Controller Manager][25]  | [auto_conf.yaml][26]    |
| [KubeDNS][23]                  | [auto_conf.yaml][27]    |
| [Kube Scheduler][28]           | [auto_conf.yaml][29]    |
| [Kubernetes State][23]         | [auto_conf.yaml][30]    |
| [Kyototycoon][31]              | [auto_conf.yaml][32]    |
| [Memcached][33]                | [auto_conf.yaml][34]    |
| [Presto][35]                   | [auto_conf.yaml][36]    |
| [RabbitMQ][47]                 | [auto_conf.yaml][48]    |
| [Redis][37]                    | [auto_conf.yaml][38]    |
| [Riak][39]                     | [auto_conf.yaml][40]    |
| [Tomcat][41]                   | [auto_conf.yaml][42]    |

Los archivos de configuración `auto_conf.yaml` cubren todos los parámetros necesarios para configurar una integración concreta, con sus correspondientes [variables de plantillas de Autodiscovery][43] implementadas para adaptarse al entorno contenedorizado.

## Anular auto-Configuración
Cada archivo `auto_conf.yaml` proporciona un Configuración por defecto. Para anularlo, puede añadir un Configuración personalizado en [Kubernetes annotations][50] o [Docker Labels][51].

Kubernetes Las anotaciones y las etiquetas Docker tienen prioridad sobre los archivos `auto_conf.yaml`, pero los archivos `auto_conf.yaml` tienen prioridad sobre Autodiscovery Configuración establecidos en las tablas Datadog Operator y Helm. Para utilizar Datadog Operator o Helm para Configurar Autodiscovery para un integración en la tabla de esta página, debe [deshabilitar auto-Configuración](#disable-auto-Configuración).

## Desactivar auto-Configuración

Los siguientes ejemplos desactivan el auto-Configuración para Redis e Istio integraciones.

{{< <txprotected>pestañas</txprotected> >}}
{{% pestaña "Datadog Operador" %}}

En su `datadog-agent.yaml`, utilice `override.nodeAgent.env` para establecer la variable `DD_IGNORE_AUTOCONF` entorno .

```yaml
apiVersion: datadoghq.com/v2alpha1
tipo: DatadogAgent
metadata:
  name: Datadog
spec:
  global:
    credenciales:
      apiKey: <DATADOG_API_KEY>

  override:
    nodoAgent:
      env: 
        nombre: DD_IGNORE_AUTOCONF
        value: redisdb istio
```

A continuación, aplique el nuevo Configuración.

{{% /tab %}}
{{% tab "Helm" %}}

Añade `datadog.ignoreAutoconfig` a tu `datadog-values.yaml`:

```yaml
datadog:
 #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "Operator" %}}

Para desactivar el auto Configuración integración (s) con el Operador, añada la variable `DD_IGNORE_AUTOCONF` a su archivo `datadog-agent.yaml`:

```yaml
  anular:
    nodoAgent:
      env:
        - nombre: DD_IGNORE_AUTOCONF
          value: "redisdb istio"
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
Para desactivar la(s) integración(es) de configuración automática con tu DaemonSet, añade la variable `DD_IGNORE_AUTOCONF` al manifiesto de tu Agent:

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

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
[19]: /es/integrations/harbor/
[20]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[21]: /es/integrations/istio
[22]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[23]: /es/agent/kubernetes/
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[25]: /es/integrations/kube_controller_manager
[26]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[28]: /es/integrations/kube_scheduler
[29]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[31]: /es/integrations/kyototycoon/
[32]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[33]: /es/integrations/mcache/
[34]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[35]: /es/integrations/presto/
[36]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[37]: /es/integrations/redisdb/
[38]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[39]: /es/integrations/riak/
[40]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[41]: /es/integrations/tomcat/
[42]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[43]: /es/agent/guide/template_variables/
[44]: /es/agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[45]: /es/agent/kubernetes/integrations/?tab=kubernetes#configuration
[46]: /es/agent/docker/integrations/#configuration
[47]: /es/integrations/rabbitmq/
[48]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[49]: /es/getting_started/containers/autodiscovery
[50]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[51]: /es/containers/docker/integrations/