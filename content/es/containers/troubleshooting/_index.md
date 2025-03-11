---
description: Solucionar problemas relacionados con los contenedores
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: Documentación
  text: Duplicar hosts con Kubernetes en AWS (EC2 o EKS)
title: Solucionar problemas de contenedor
---

Esta página proporciona información para solucionar problemas con la monitorización de contenedores.


Existen tres métodos para desplegar el Agent:
1. Como un [**contenedor en un tiempo de ejecución**][1] 

2. En un **entorno de nube**, como [Amazon ECS][2], [Fargate en un entorno de Amazon ECS][3] o [Amazon EKS][4].

3. En un [entorno de Kubernetes][16]

Estos diferentes métodos presentan retos de despliegue únicos. Utiliza esta página como punto de partida para resolver los problemas. Si sigues teniendo complicaciones, ponte en contacto con el [soporte de Datadog][6] para obtener más ayuda.

Para obtener más información sobre las actualizaciones o cambios de la versión del Agent, consulta las [notas de la versión][7] de Datadog.

## Cuestiones generales

### Las variables de entorno no están establecidas y las etiquetas (tags) no están inyectadas

Una forma útil de inyectar [variables de entorno][8] o de configurar una biblioteca de DogStatsD es implementar la función [Controlador de admisión (Admission Controller)][9] en el Cluster Agent. **Nota**: El Cluster Agent debe ser desplegado y ejecutado _antes_ de que la aplicación sea desplegada.

### No aparecen métricas en la Plataforma web de Datadog

Comprueba que lo siguiente es cierto:

- El endpoint de métricas está expuesto y abierto para que el Agent lo alcance.

- No hay proxies ni cortafuegos que puedan impedir que el Agent acceda al endpoint.

- El Agent tiene [Autodiscovery][10] activado.


### No se recopilan logs

Hay dos [variables de entorno][8] que pueden afectar a la recopilación de logs y de qué contenedores:

- Establece `DD_logs_ENABLED` en `true` para recopilar logs.
- Además, establece `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` en `true` para recopilar todos los logs de todos los contenedores.

Para excluir logs (y otras funciones) de la recopilación, consulta la [Guía de Gestión de detección de contenedores][11].

### No se puede conectar al Kubelet

El error más común que impide la conexión a la API de Kubelet es la verificación del certificado TLS de Kubelet.

La verificación TLS está activada por defecto y puede impedir que el Agent se conecte a la API de Kubelet a través de HTTPS. Puedes desactivar la verificación TLS utilizando parámetros dedicados o configurando la variable `DD_KUBELET_TLS_VERIFY` para todos los contenedores en el manifiesto del Agent:

 - Configura `TLS_VERIFY` en `false`.

### Las métricas HPA no aparecen o no coinciden con el valor esperado

En primer lugar, asegúrate de que el Cluster Agent está desplegado y es capaz de enviar datos al Agent de nodo.

A continuación, revisa la consulta utilizada para escalar las métricas externas en el resumen de métricas. Solo las consultas válidas se autoescalan. Si hay varias consultas, **todas** las consultas se ignoran si **alguna** de las consultas no es válida.

Cuando necesites más ayuda con las métricas HPA, facilita lo siguiente al [soporte de Datadog][6]:
  - Una salida `describe` del manifiesto HPA:
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - Una salida `describe` de la definición de recursos personalizados de DatadogMetric:
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## Tiempo de ejecución

 Para logs, asegúrate de que el comando de despliegue del Agent tiene habilitados `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` y `DD_LOGS_ENABLED`.

## Nube

Asegúrate de que tu política de IAM está actualizada.

### Los logs no se recopilan en Fargate

  - [ECS][12]: asegúrate de que el enrutador de log está conectado al contenedor del que deseas recopilar logs.

  - [EKS][13]: existen dos formas comunes para que el Agent recopile logs en un entorno de EKS Fargate: reenvío de log con logs de CloudWatch logs, y reenvío de log a través de [Amazon Data Firehose][14]. El uso de Amazon Data Firehose para recopilar logs requiere el despliegue correcto del flujo de entrega de Amazon Data Firehose, así como algunas herramientas de línea de comandos.


## Kubernetes

### No se despliega el contenedor ni se recopilan métricas

En primer lugar, asegúrate de que tu clave de API es válida.

A continuación, en tu pod de nodo del Agent, ejecuta el comando `agent status` y revisa los resultados.

### No recibes métricas `kubeapi_server`, `kube_controller_manager` o `etcd`

En los servicios gestionados como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar los checks de `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd` en estos entornos.



# Solucionar problemas de los datos solicitados por el soporte de Datadog

Después de abrir un tique de soporte, es posible que se te solicite el siguiente tipo de información:

### Flare del Agent

Puedes utilizar el comando [`flare`][15] para enviar información para solucionar problemas al soporte de Datadog.

**Flare de nodo del Agent**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Flare del Cluster Agent**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```


### Describir la salida del Pod

Esto proporciona al equipo información sobre cómo se desplegó el nodo o el Cluster Agent, cuáles fueron los eventos más recientes en el pod y si se inyectaron y aplicaron algunas cualidades (como etiquetas personalizadas) en métricas de host. La sección `> <FILENAME>.yaml` del comando crea un archivo de salida que puede enviarse al soporte de Datadog como archivo adjunto:

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### Manifiesto/despliegue

Este es el archivo utilizado para desplegar el Agent en tu entorno. Informa a Datadog de las etiquetas configuradas, si los logs fueron habilitados, y si ciertos contenedores están definidos para ser ignorados.

En el caso de desplegar el Agent en un entorno de tiempo de ejecución, envía al Soporte la línea de comandos utilizada para desplegar el Agent.

Los tres métodos de despliegue más comunes son: tabla de Helm, DaemonSet y Operator.

### Salida cURL

Si notas que hay métricas ausentes o imprecisas, el soporte de Datadog puede solicitar el resultado de una salida cURL del nodo del Agent que intenta alcanzar el endpoint de métrica. Esto se hace ejecutando el comando desde dentro del contenedor del Agent, y puede informar al soporte si el Agent tiene acceso a las métricas. **Nota**: Esto no es posible en un servicio de Fargate o en servicios gestionados:

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## Leer más

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