---
categories:
- aws
- nube
- recopilación de logs
- network
- rastreo
creates_events: false
custom_kind: integración
dependencies: []
description: AWS App Mesh es un proxy de servicio y periferia de código abierto.
display_name: AWS App Mesh
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/envoy/
  tag: Documentación
  text: Integración de Envoy
git_integration_title: amazon_app_mesh
guid: 04669673-120b-48c9-a855-06d57d92c7cf
integration_id: amazon-app-mesh
integration_title: AWS App Mesh
integration_version: ''
is_public: true
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.stats.overflow
name: amazon_app_mesh
public_title: Integración de Datadog y AWS App Mesh
short_description: AWS App Mesh es un proxy de servicio y periferia de código abierto.
support: núcleo
supported_os:
- Linux
- mac_os
- Windows
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

[AWS App Mesh][1] es una malla de servicio que proporciona una red a nivel de aplicación para tus microservicios que se ejecutan en clústeres de Amazon ECS Fargate o Amazon EKS.


## Configuración

{{< tabs >}}
{{% tab "EKS" %}}

Sigue estas instrucciones para activar la recopilación de métricas para el proxy auxiliar de AWS App Mesh, denominado Envoy. Los usuarios pueden elegir agregar auxiliares en uno de estos tres modos: mediante un despliegue, un parche en el despliegue anterior o con el controlador de inyector de AWS App Mesh. Todos los modos son compatibles con los siguientes pasos.

#### Recopilación de métricas

**Requisito previo**: despliega Datadog Agents como DaemonSet en tu clúster de Kubernetes utilizando la documentación de la [integración de EKS][1].

1. Debido a las limitaciones de App Mesh, el reenvío de métricas desde EKS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

2. Crea un ConfigMap en tu clúster para descubrir automáticamente los auxiliares Envoy de App Mesh que se añaden a cada pod:

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

3. Actualiza el objeto `volumeMounts` en el archivo YAML del DaemonSet del Datadog Agent:

    ```yaml
          volumeMounts:
           - name: datadog-config
             mountPath: /conf.d
    ```

4. Actualiza el objeto `volumes` en el archivo YAML del DaemonSet del Datadog Agent:

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

Para habilitar la recopilación de logs, actualiza el DaemonSet del Agent con las [instrucciones dedicadas de recopilación de logs de Kubernetes][1].

[1]: https://docs.datadoghq.com/es/integrations/ecs_fargate/#log-collection

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


Alternativamente, el inyector appmesh puede desplegarse siguiendo la documentación de [App Mesh con EKS][2] con la opción `enable-datadog-tracing=true` o la variable de entorno`ENABLE_Datadog_TRACING=true`.


[1]: https://docs.datadoghq.com/es/integrations/amazon_eks/
[2]: https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components
{{% /tab %}}
{{% tab "ECS Fargate" %}}

#### Recopilación de métricas

**Requisito previo**: añade Datadog Agents a cada una de tus definiciones de tareas de Fargate con App Mesh habilitado, como un auxiliar Envoy inyectado, utilizando la documentación de la [integración de ECS Fargate][1].

1. Debido a las limitaciones de App Mesh, el reenvío de métricas de una tarea de ECS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

2. Actualiza todas las definiciones de tareas que contengan el auxiliar Envoy y Datadog Agent con las siguientes etiquetas (labels) de Docker. Consulta la [configuración de la integración de ECS Fargate][2] para obtener más detalles.

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

Habilita la recopilación de logs siguiendo las instrucciones de la [documentación de la integración de ECS Fargate][1].

[1]: https://docs.datadoghq.com/es/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### Recopilación de trazas

1. Habilita la recopilación de trazas siguiendo las instrucciones de la [documentación de la integración de ECS Fargate][3].

Establece los parámetros de AWS App Mesh `ENABLE_ENVOY_Datadog_TRACING` y `Datadog_TRACER_PORT` como variables de entorno en la definición de la tarea de ECS Fargate. Más información en la documentación de [AWS App Mesh][4].


[1]: https://docs.datadoghq.com/es/integrations/ecs_fargate/
[2]: https://docs.datadoghq.com/es/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/es/integrations/ecs_fargate/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{% tab "ECS EC2" %}}

#### Recopilación de métricas

**Requisito previo**: añade Datadog Agents a cada una de tus definiciones de tareas de ECS EC2 con App Mesh habilitado, como un auxiliar Envoy inyectado, utilizando la documentación de la [integración de ECS][1].

1. Debido a las limitaciones de App Mesh, el reenvío de métricas de una tarea de ECS a Datadog requiere que el filtro de salida se establezca en `Allow External Traffic`.

2. Actualiza todas las definiciones de tareas que contengan el auxiliar Envoy y Datadog Agent con las siguientes etiquetas (labels) de Docker. Consulta la [configuración de la integración de ECS Fargate][2] para obtener más detalles.

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

Habilita la recopilación de logs siguiendo las instrucciones de la [documentación de la integración de ECS][1].

[1]: https://docs.datadoghq.com/es/integrations/amazon_ecs/#log-collection

{{< /site-region >}}

#### Recopilación de trazas

1. Habilita la recopilación de trazas siguiendo las instrucciones de la [documentación de la integración de ECS][3].

2. Establece los parámetros de AWS App Mesh `ENABLE_ENVOY_DATADOG_TRACING` y `DATADOG_TRACER_PORT` como variables de entorno en la definición de la tarea de ECS. Más información en la documentación de [AWS App Mesh][4].


[1]: https://docs.datadoghq.com/es/integrations/amazon_ecs/
[2]: https://docs.datadoghq.com/es/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/es/integrations/amazon_ecs/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

### Métricas

Consulta la [integración de Envoy][2] para obtener una lista de métricas.

### Eventos

La integración de AWS App Mesh no incluye ningún evento.

### Checks de servicios

La integración de AWS App Mesh no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/app-mesh
[2]: https://docs.datadoghq.com/es/integrations/envoy/#metrics
[3]: https://docs.datadoghq.com/es/help/