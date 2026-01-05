---
app_id: amazon_app_mesh
categories:
- aws
- nube
- recopilación de logs
- network
- rastreo
custom_kind: integración
description: AWS App Mesh es un proxy de servicio y periferia de código abierto.
further_reading:
- link: https://docs.datadoghq.com/integrations/envoy/
  tag: Documentación
  text: Integración Envoy
supported_os:
- Linux
- mac_os
- Windows
title: AWS App Mesh
---
## Información general

[AWS App Mesh](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection) es una malla de servicios que proporciona redes a nivel de aplicación para tus microservicios ejecutados en clústeres de Amazon ECS Fargate o Amazon EKS.

## Configuración

{{< tabs >}}

{{% tab "EKS" %}}

Sigue estas instrucciones para activar la recopilación de métricas para el proxy auxiliar de AWS App Mesh, denominado Envoy. Los usuarios pueden elegir agregar auxiliares en uno de estos tres modos: mediante un despliegue, un parche en el despliegue anterior o con el controlador de inyector de AWS App Mesh. Todos los modos son compatibles con los siguientes pasos.

#### Recopilación de métricas

**Requisito previo**: Despliega Datadog Agents como DaemonSet en tu clúster Kubernetes utilizando la documentación de la [integración EKS](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection).

1. Debido a las limitaciones de App Mesh, el reenvío de métricas desde EKS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

1. Crea un ConfigMap en tu clúster para descubrir automáticamente los auxiliares Envoy de App Mesh que se añaden a cada pod:

   ```yaml
     apiVersion: v1
     kind: ConfigMap
     metadata:
     name: datadog-config
     data:
     envoy: |-
       ad_identifiers:
       - aws-appmesh-envoy
       init_config:
       instances:
       - stats_url: http://%%host%%:9901/stats
         tags:
           - <TAG_KEY>:<TAG_VALUE>  # Example - cluster:eks-appmesh
   ```

1. Actualiza el objeto `volumeMounts` en el archivo YAML del DaemonSet del Datadog Agent:

   ```yaml
         volumeMounts:
          - name: datadog-config
            mountPath: /conf.d
   ```

1. Actualiza el objeto `volumes` en el archivo YAML del DaemonSet del Datadog Agent:

   ```yaml
        volumes:
         - name: datadog-config
           configMap:
             name: datadog-config
             items:
             - key: envoy
               path: envoy.yaml
   ```

#### Recopilación de logs

{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Para habilitar la recopilación de logs, actualiza el DaemonSet del Agent con las [instrucciones para la recopilación de logs de Kubernetes](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection) exclusivas.

{{< /site-region >}}

#### Recopilación de trazas

Selecciona el espacio de nombres para desplegar el `datadog-agent` y servicio, por ejemplo: `monitoring`. Utiliza esto en la opción para desplegar el appmesh-inyector con:

```shell
  helm upgrade -i appmesh-controller eks/appmesh-controller \
  --namespace appmesh-system \
  --set sidecar.logLevel=debug \
  --set tracing.enabled=true \
  --set tracing.provider=datadog \
  --set tracing.address=ref:status.hostIP \
  --set tracing.port=8126
```

Alternativamente, es posible desplegar el inyector appmesh siguiendo la documentación [App Mesh con EKS](https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components), utilizando la opción `enable-datadog-tracing=true` o la variable de entorno `ENABLE_DATADOG_TRACING=true`.

{{% /tab %}}

{{% tab "ECS Fargate" %}}

#### Recopilación de métricas

**Requisito previo**: Añade Datadog Agents a cada una de tus definiciones de tareas de Fargate con App Mesh activado, como un sidecar Envoy inyectado, utilizando la documentación de la [integración ECS Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection).

1. Debido a las limitaciones de App Mesh, el reenvío de métricas de una tarea de ECS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

1. Actualiza todas las definiciones de tareas que contengan el sidecar Envoy y el Datadog Agent con las siguientes etiquetas (labels) de Docker. Consulta [Configuración de integraciones para ECS Fargate](https://app.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection) para obtener más información.

   ```text
       "dockerLabels": {
             com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
             com.datadoghq.ad.check_names : ["envoy"]
             com.datadoghq.ad.init_configs : [{}]
           },
   ```

#### Recopilación de logs

{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Habilita la recopilación de logs con las instrucciones de la [documentación de la integración ECS Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection).

{{< /site-region >}}

#### Recopilación de trazas

1. Habilita la recopilación de trazas (traces) con las instrucciones de la [documentación de la integración ECS Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection).

Configura los parámetros `ENABLE_ENVOY_DATADOG_TRACING` y `DATADOG_TRACER_PORT` de AWS App Mesh como variables de entorno en la definición de la tarea de ECS Fargate. Para obtener más información, consulta la documentación de [AWS App Mesh](https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html).

{{% /tab %}}

{{% tab "ECS EC2" %}}

#### Recopilación de métricas

**Requisito previo**: Añade Datadog Agents a cada una de tus definiciones de tareas de ECS EC2 con App Mesh activado, como un sidecar Envoy inyectado, utilizando la documentación de la [integración ECS](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection).

1. Debido a las limitaciones de App Mesh, el reenvío de métricas de una tarea de ECS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

1. Actualiza todas las definiciones de tareas que contengan el sidecar Envoy y el Datadog Agent con las siguientes etiquetas (labels) de Docker. Consulta [Configuración de integraciones para ECS Fargate](https://app.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection) para obtener más información.

   ```text
       "dockerLabels": {
             com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
             com.datadoghq.ad.check_names : ["envoy"]
             com.datadoghq.ad.init_configs : [{}]
           },
   ```

#### Recopilación de logs

{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Habilita la recopilación de logs con las instrucciones de la [documentación de la integración ECS](https://docs.datadoghq.com/integrations/ecs_fargate/#log-collection).

{{< /site-region >}}

#### Recopilación de trazas

1. Habilita la recopilación de trazas (traces) con las instrucciones de la [documentación de la integración ECS](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection).

1. Configura los parámetros `ENABLE_ENVOY_DATADOG_TRACING` y `DATADOG_TRACER_PORT` de AWS App Mesh como variables de entorno en la definición de la tarea de ECS. Para obtener más información, consulta la documentación de [AWS App Mesh](https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html).

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

### Métricas

Consulta la [integración Envoy](https://app.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection) para obtener una lista de métricas.

### Eventos

La integración AWS App Mesh no incluye eventos.

### Checks de servicio

La integración AWS App Mesh no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}