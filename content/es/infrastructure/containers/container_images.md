---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejorar el flujo de trabajo de solución de problemas con imágenes de contenedor
    en Datadog Container Monitoring
- link: /security/cloud_security_management/vulnerabilities
  tag: Documentación
  text: Cloud Security Management Vulnerabilities
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: Documentación
  text: Configuración de las vulnerabilidades de imágenes de contenedor
- link: /security/cloud_security_management/troubleshooting/vulnerabilities/
  tag: Documentación
  text: Solución de problemas de Cloud Security Management Vulnerabilities
kind: documentación
title: Vista de imágenes de contenedor
---

## Información general

La [vista de imágenes de contenedor][1] en Datadog proporciona información clave sobre cada imagen que se utiliza en tu entorno para ayudarte a evaluar su huella de despliegue. También detecta y soluciona problemas de seguridad y rendimiento que pueden afectar a varios contenedores. Puedes ver los detalles de la imagen de contenedor junto con el resto de los datos del contenedor para solucionar problemas de imágenes que afecten el estado de la infraestructura. Además, puedes ver las vulnerabilidades que se encuentren en las imágenes de contenedor desde [Cloud Security Management][2] (CSM) para ayudarte a optimizar tus esfuerzos de seguridad.

{{< img src="security/vulnerabilities/container_images.png" alt="La vista de imágenes de contenedor destaca las vulnerabilidades y la función de clasificación de columnas del contenedor" width="100%">}}

La [vista de tendencias de imágenes de contenedor][9] proporciona información de alto nivel sobre todas las imágenes en tu infraestructura contenedorizada. Las métricas de tendencias de imágenes de contenedor pueden ayudarte a responder preguntas clave sobre tu posición de seguridad y huella de despliegue a lo largo de semanas y meses.

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="La vista de tendencias de imágenes de contenedor destaca el tamaño de la imagen, la antigüedad de la imagen, las vulnerabilidades y las métricas de recuento de contenedores en ejecución" width="100%">}}

## Configurar la vista de imágenes de contenedor

Las imágenes de la vista de imágenes de contenedor se recopilan de varias fuentes diferentes (la recopilación de imágenes, Live Containers y Amazon ECR). Las siguientes instrucciones describen cómo habilitar imágenes de cada una de estas fuentes.

### Live Containers

Para habilitar la recopilación de contenedores en directo, consulta la documentación de [contenedores][3]. Proporciona información sobre cómo habilitar el Process Agent y cómo excluir e incluir contenedores.

### Recopilación de imágenes

Datadog recopila metadatos de imágenes de contenedor a fin de proporcionar un contexto de depuración mejorado para contenedores relacionados y vulnerabilidades de [Cloud Security Management][8] (CSM).

#### Habilitar la recopilación de imágenes de contenedor

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

En la versión 1.3.0, o una posterior, del Datadog Operador la recopilación de imágenes se encuentra habilitada de manera predeterminada. Si utilizas una versión anterior del Datadog Operador, Datadog recomienda que la actualices a la versión 1.3.0, o una posterior.


{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

En la versión 3.46.0, o una posterior, del Datadog Helm chart la recopilación de imágenes se encuentra [habilitada de manera predeterminada][1]. Para verificar esto, o si estás utilizando una versión anterior del Helm chart, asegúrate de que `datadog.containerImageCollection.enabled` se haya establecido en `true` en `datadog-values.yaml`.

```yaml
datadog:
  containerImageCollection:
    enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

Para habilitar la recopilación de imágenes de contenedor en tus [instancias de ECS EC2][1], añade las siguientes variables de entorno a tu definición de contenedor `datadog-agent`:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

[1]: https://docs.datadoghq.com/es/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Añade lo siguiente a tu archivo de configuración `datadog.yaml`:

```yaml
container_image:
  enabled: true
```

[1]: /es/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

#### Habilitar la recopilación de SBOM

Las siguientes instrucciones activan la recopilación de la [lista de materiales de software][5] (SBOM) para CSM Vulnerabilities. La recopilación de SBOM permite la detección automática de vulnerabilidades de imágenes de contenedor. Las vulnerabilidades se evalúan y analizan en tus contenedores cada hora. La gestión de vulnerabilidades para imágenes de contenedor se incluye en los [planes Pro y Enterprise de CSM][10].

**Nota**: La función CSM Vulnerabilities no se encuentra disponible para entornos de AWS Fargate o Windows.

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

Añade lo siguiente a la sección de especificaciones de tu archivo `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
      containerImage:
        enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Añade lo siguiente a tu archivo de configuración de Helm `datadog-values.yaml`:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

Para habilitar el escaneo de vulnerabilidades de imágenes de contenedor en tus [instancias de ECS EC2][1], añade las siguientes variables de entorno a tu definición de contenedor `datadog-agent`:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

Si el Agent no puede extraer la SBOM de las imágenes de contenedor, aumenta la memoria del Agent en la definición del contenedor:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```
[1]: https://docs.datadoghq.com/es/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Añade lo siguiente a tu archivo de configuración `datadog.yaml`:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
```

[1]: /es/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

### Registros de contenedor

#### Amazon Elastic Container Registry (Amazon ECR)

Configura la [integración de AWS][4] para comenzar a rastrear metadatos de imágenes de contenedor desde Amazon ECR.

## Configurar tendencias de imágenes de contenedor

Utiliza el modal de configuración de tendencias de imágenes de contenedor y usa la opción **Enable Container Image Metric Collection** (Habilitar recopilación de métricas de imágenes de contenedor) para activar la generación de métricas de imágenes.

Las métricas de imágenes se recopilan de las fuentes [Live Containers](#live-containers) y [Check de imágenes](#image-collection). Sigue las mismas instrucciones anteriores para asegurarte de que estas recopilaciones se encuentren habilitadas en toda tu infraestructura y que aproveches al máximo la vista de tendencias.

{{< img src="infraestructura/containerimages/container_image_trends_configuration_modal.png" alt="El modal de configuración de tendencias de imágenes de contenedor" width="100%">}}

## Etiquetado de imágenes de contenedor

Etiqueta y enriquece las imágenes de contenedor con etiquetas arbitrarias mediante la configuración de [extracción de etiquetas (labels) como etiquetas (tags)][6] en el Agent. Luego, estas etiquetas (tags) se seleccionan mediante el check de imágenes de contenedor.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/container-images
[2]: /es/security/cloud_security_management
[3]: /es/infrastructure/containers/?tab=docker#setup
[4]: /es/integrations/amazon_web_services/
[5]: https://www.cisa.gov/sbom
[6]: /es/containers/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[8]: /es/security/cloud_security_management/vulnerabilities
[9]: https://app.datadoghq.com/container-images/image-trends
[10]: https://www.datadoghq.com/pricing/?product=cloud-security-management#products