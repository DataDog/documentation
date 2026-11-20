---
description: Solución de problemas relacionados con contenedores
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: Documentación
  text: Servidores duplicados con Kubernetes en AWS (EC2 o EKS)
title: Solución de problemas de contenedores
---
Esta página proporciona información de solución de problemas para el monitoreo de contenedores.


Existen tres métodos para implementar el Agent:
1. Como un [**contenedor en un entorno de ejecución**][1] 

2. En un **entorno de nube**, como [Amazon ECS][2], [Fargate en un entorno de Amazon ECS][3] o [Amazon EKS][4]

3. En un [entorno de Kubernetes][16]

Estos diferentes métodos presentan desafíos de implementación únicos. Utilice esta página como punto de partida para resolver problemas. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][6] para obtener más ayuda. 

Para obtener detalles sobre las actualizaciones o cambios de versión del Agent, consulte las [notas de la versión][7] de Datadog.

## Problemas generales {#general-issues}

### Las variables de entorno no se están configurando y las etiquetas no se inyectan {#environment-variables-are-not-being-set-and-tags-are-not-injected}

Una forma útil de inyectar [variables de entorno][8] o de configurar una biblioteca de DogStatsD es implementar la función [Admission Controller][9] en el Cluster Agent. **Nota**: El Cluster Agent debe estar implementado y en ejecución _antes_ de que se implemente la aplicación.

### Las métricas no aparecen en la plataforma web de Datadog {#metrics-are-not-appearing-on-the-datadog-web-platform}

Verifique que se cumpla lo siguiente:

- El punto de conexión de métricas está expuesto y abierto para que el Agent pueda acceder a él.

- No hay proxies ni firewalls que puedan impedir que el Agent acceda al punto de conexión. 

- El Agent tiene [Autodiscovery][10] habilitado.


### Los logs no se recopilan {#logs-are-not-collected}

Hay dos [variables de entorno][8] que pueden afectar si se recopilan logs y de qué contenedores:

- Establezca `DD_LOGS_ENABLED` en `true` para recopilar logs. 
- Además, establezca `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` en `true` para recopilar todos los logs de todos los contenedores.

Para excluir logs (y otras funciones) de la recopilación, consulte la [guía de administración de descubrimiento de contenedores][11].

### No se puede conectar al Kubelet {#cannot-connect-to-the-kubelet}

El error más común que impide la conexión a la API de Kubelet es la verificación del certificado TLS de Kubelet.

La verificación TLS está habilitada de forma predeterminada y puede impedir que el Agent se conecte a la API de Kubelet a través de HTTPS. Puede deshabilitar la verificación TLS usando parámetros dedicados o estableciendo la variable `DD_KUBELET_TLS_VERIFY` para todos los contenedores en el manifiesto del Agent:

 - Establezca `TLS_VERIFY` en `false`.

### Las métricas de HPA no aparecen o no se alinean con el valor esperado {#hpa-metrics-are-not-appearing-or-are-not-aligning-with-the-expected-value}

Primero, asegúrese de que el Cluster Agent esté implementado y pueda enviar datos al Agent del nodo.

Luego, revise la consulta utilizada para escalar las métricas externas en Metrics Catalog. Solo las consultas válidas realizan el escalado automático. Si hay varias consultas, **todas** las consultas se ignoran si **alguna** de las consultas no es válida.

Cuando solicite más ayuda para las métricas de HPA, proporcione lo siguiente al [soporte de Datadog][6]:
  - La salida de `describe` del manifiesto de HPA:
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - La salida de `describe` de la definición de recurso personalizado DatadogMetric:
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## Tiempo de ejecución {#runtime}

 Para los logs, asegúrese de que el comando de despliegue del Agent tenga habilitados `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` y `DD_LOGS_ENABLED`.

## Cloud {#cloud}

Asegúrese de que su política de IAM esté actualizada.

### Los logs no se recopilan en Fargate {#logs-are-not-collected-in-fargate}

  - [ECS][12]: Asegúrese de que el router de logs esté conectado al contenedor del cual desea recopilar logs.

  - [EKS][13]: Existen dos formas comunes para que el Agent recopile logs en un entorno EKS Fargate: reenvío de logs con CloudWatch logs y reenvío de logs a través de [Amazon Data Firehose][14]. El uso de Amazon Data Firehose para recopilar logs requiere la implementación exitosa del flujo de entrega de Amazon Data Firehose, así como algunas herramientas de línea de comandos. 
 

## Kubernetes {#kubernetes}

### El contenedor no se despliega ni recopila métricas {#container-not-deploying-or-collecting-metrics}

Primero, asegúrese de que su clave de API sea válida.

Luego, en el pod del Agent del nodo, ejecute el comando `agent status` y revise los resultados.

### No se obtienen métricas de `kubeapi_server`, `kube_controller_manager` o `etcd` {#not-getting-kubeapi-server-kube-controller-manager-or-etcd-metrics}

En servicios administrados como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar las comprobaciones `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd` en estos entornos.

## ECS Fargate {#ecs-fargate}

### El Agent de Windows agota el tiempo de espera al iniciar el servicio {#windows-agent-times-out-while-starting-service}

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

Para evitar este error, asegúrese de haber establecido una reserva de **unidades de CPU** de al menos `512` para el Datadog Agent.

# Datos de diagnóstico solicitados por el soporte de Datadog {#troubleshooting-data-requested-by-datadog-support}

Después de abrir un ticket de soporte, es posible que se le solicite la siguiente información:

### Agent Flare {#agent-flare}

Puede usar el comando [`flare`][15] para enviar información de solución de problemas al soporte de Datadog.

**Node Agent flare**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Cluster Agent flare**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```
 

### Salida de Describe Pod {#describe-pod-output}

Esto proporciona al equipo información sobre cómo se implementó el Agent del nodo o el Cluster Agent, cuáles fueron los eventos más recientes del pod y si se incorporaron y aplicaron determinados atributos (como etiquetas personalizadas) a las métricas del servidor. La sección `> <FILENAME>.yaml` del comando crea una salida de archivo que puede enviarse al soporte de Datadog como archivo adjunto: 

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### Manifiesto/implementación {#manifestdeployment}

Este es el archivo utilizado para implementar el Agent en su entorno. Informa a Datadog sobre las etiquetas configuradas, si los logs estaban habilitados y si se definieron ciertos contenedores para ser ignorados. 

En el caso de implementar el Agent en un entorno de ejecución, envíe al soporte la línea de comandos utilizada para implementar el Agent.

Los tres métodos de implementación más comunes son: Helm chart, DaemonSet y Operator.

### Salida de cURL {#curl-output}

Si faltan métricas o estas son inexactas, el soporte de Datadog puede solicitar la salida de cURL del Agent del nodo al intentar acceder al punto de conexión de métricas. Esto se realiza ejecutando el comando desde dentro del contenedor del Agent, y puede informar al soporte si el Agent tiene acceso a las métricas. **Nota**: Esto no es posible en Fargate ni en servicios administrados: 

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/containers/docker/?tab=standard
[2]: https://docs.datadoghq.com/es/containers/amazon_ecs/?tab=awscli
[3]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#
[4]: https://docs.datadoghq.com/es/integrations/eks_fargate
[5]: https://docs.datadoghq.com/es/containers/kubernetes/
[6]: https://docs.datadoghq.com/es/help/
[7]: https://app.datadoghq.com/release-notes
[8]: https://docs.datadoghq.com/es/agent/guide/environment-variables/#overview
[9]: https://docs.datadoghq.com/es/containers/cluster_agent/admission_controller/?tab=operator
[10]: https://docs.datadoghq.com/es/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[11]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-management/?tab=containerizedagent
[12]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#log-collection
[13]: https://docs.datadoghq.com/es/integrations/eks_fargate/#log-collection
[14]: https://docs.datadoghq.com/es/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/#overview
[15]: https://docs.datadoghq.com/es/agent/troubleshooting/send_a_flare
[16]: https://docs.datadoghq.com/es/containers/kubernetes/installation/?tab=operator