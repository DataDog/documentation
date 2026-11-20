---
app_id: calico
categories:
- recopilación de logs
- métricas
- la red
- seguridad
- kubernetes
custom_kind: integración
description: Calico es una solución de redes y seguridad en redes para contenedores.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-calico-with-datadog/
  tag: blog
  text: Monitorizar Calico con Datadog
integration_version: 5.0.0
media: []
supported_os:
- linux
- windows
- macos
title: calico
---
## Información general

Este check monitoriza [Calico](https://www.tigera.io/project-calico/) a través del Datadog Agent.

El check de Calico envía métricas sobre la red y la seguridad en un clúster de Kubernetes establecido con Calico.

## Configuración

### Instalación

El check de Calico está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

#### Instalación con un Agent basado en clústeres de Kubernetes

Uso de anotaciones:

1. Configura Calico en tu clúster.

1. Habilita métricas de Prometheus siguiendo las instrucciones en [Monitorizar métricas del componente Calico](https://docs.tigera.io/calico/3.25/operations/monitor/monitor-component-metrics).
   Una vez habilitado, deberías tener un servicio `felix-metrics-svc` funcionando en tu clúster, así como un `prometheus-pod`.

1. Para utilizar Autodiscovery, modifica `prometheus-pod`. Añade el siguiente fragmento a tu archivo de configuración YAML de Prometheus:

   ```
   metadata:
     [...]
     annotations:
      ad.datadoghq.com/prometheus-pod.check_names: |
      ["openmetrics"]
      ad.datadoghq.com/prometheus-pod.init_configs: |
      [{}]
      ad.datadoghq.com/prometheus-pod.instances: |
        [
           {
              "prometheus_url": "http://<FELIX-SERVICE-IP>:<FELIX-SERVICE-PORT>/metrics",
              "namespace": "calico",
              "metrics": ["*"]
           }
        ]
     spec:
       [....]
   ```

Puedes encontrar los valores de `<FELIX-SERVICE-IP>` y `<FELIX-SERVICE-PORT>` ejecutando `kubectl get all -all-namespaces`.

#### Instalación con un Agent basado en un sistema operativo

1. Sigue las instrucciones en [Monitorizar métricas del componente Calico](https://docs.tigera.io/calico/3.25/operations/monitor/monitor-component-metrics) hasta que tengas un servicio `felix-metrics-svc` en ejecución, utilizando `kubectl get all --all-namespaces`.

1. Si utilizas minikube, debes redirigir el puerto 9091 a `felix-metrics-svc`.
   Ejecuta `kubectl port-forward service/felix-metrics-svc 9091:9091 -n kube-system`.

   Si no estás utilizando minikube, comprueba que `felix-metrics-svc` tenga una IP externa. Si el servicio no tiene una IP externa, utiliza `kubectl edit svc` para cambiar su tipo de `ClusterIP` a `LoadBalancer`.

### Configuración

Sigue las instrucciones para configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta la sección [Contenedores](#containerized).

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `calico.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Calico.
   El único parámetro obligatorio es la URL `openmetrics_endpoint`. Consulta el [ejemplo calico.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. Si utilizas minikube, utiliza 'http://localhost:9091/métricas' como URL de `openmetrics_endpoint`.
   Si no utilizas minikube, utiliza `http://<FELIX-METRICS-SVC-EXTERNAL-IP>:<PORT>/metrics` como URL de `openmetrics_endpoint`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de métricas

1. La configuración predeterminada de tu archivo `calico.d/conf.yaml` activa la recopilación de tus [métricas de Calico](#metrics). Para ver todas las opciones de configuración disponibles, consulta el [ejemplo calico.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

Dado que la estructura de Calico se configura en un clúster de Kubernetes, se crea con despliegues, pods y servicios. La integración de Kubernetes obtiene logs de los contenedores.

Después de configurar la integración de [Kubernetes](https://docs.datadoghq.com/agent/kubernetes), los logs de Calico estarán disponibles en el Datadog Log Explorer.

La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

```yaml
logs_enabled: true
```

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `calico`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{openmetrics_endpoint: <OPENMETRICS_ENDPOINT>}`           |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

| Parámetro      | Valor                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "calico", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `calico` en la sección Checks.

### Métricas

| | |
| --- | --- |
| **calico.felix.active.local_endpoints** <br>(gauge) | Número de endpoints activos en este host|
| **calico.felix.active.local_policies** <br>(gauge) | Número de políticas en este host|
| **calico.felix.active.local_selectors** <br>(gauge) | Número de selectores activos en este host|
| **calico.felix.active.local_tags** <br>(gauge) | Número de etiquetas activas en este host \[versiones \< Calico v3.23\]|
| **calico.felix.cluster.num_host_endpoints** <br>(gauge) | Número total de endpoints de hosts en todo el clúster|
| **calico.felix.cluster.num_hosts** <br>(gauge) | Número total de hosts Calico en el clúster|
| **calico.felix.cluster.num_workload_endpoints** <br>(gauge) | Número total de endpoints de cargas de trabajo en todo el clúster|
| **calico.felix.int_dataplane_failures.count** <br>(count) | Número de fallos en el plano de datos|
| **calico.felix.ipset.calls.count** <br>(count) | Número de comandos ipset ejecutados|
| **calico.felix.ipset.errors.count** <br>(count) | Número de fallos del comando ipset|
| **calico.felix.ipsets.calico** <br>(gauge) | Número de conjuntos de IP Calico activas|
| **calico.felix.ipsets.total** <br>(gauge) | Número total de conjuntos IP activas|
| **calico.felix.iptables.chains** <br>(gauge) | Número de cadenas iptables activas|
| **calico.felix.iptables.restore_calls.count** <br>(count) | Número de llamadas a iptables-restore|
| **calico.felix.iptables.restore_errors.count** <br>(count) | Número de errores iptables-restore|
| **calico.felix.iptables.rules** <br>(gauge) | Número de reglas iptables activas|
| **calico.felix.iptables.save_calls.count** <br>(count) | Número de llamadas a iptables-save|
| **calico.felix.iptables.save_errors.count** <br>(count) | Número de errores iptables-save|

### Eventos

La integración de Calico no incluye ningún evento.

### Checks de servicio

Consulta [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/calico/assets/service_checks.json) para obtener una lista de los checks de servicio proporcionados por esta integración.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Calico con Datadog](https://www.datadoghq.com/blog/monitor-calico-with-datadog/)