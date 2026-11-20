---
description: Aprenda cómo CD Visibility detecta reversiones de despliegue.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda cómo consultar y visualizar despliegues.
title: Detección de reversiones
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="¡Únase a la vista previa!" >}}
CD Visibility está en versión preliminar. Si le interesa esta función, complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Saber cuándo despliegues específicos están realizando una reversión es útil para:
- Comprender la estabilidad del despliegue y la frecuencia de las reversiones en sus servicios.
- Identificar patrones en problemas de despliegue que conducen a reversiones.

Para detectar reversiones, Datadog compara la versión de despliegue actual con las versiones anteriores desplegadas para el mismo servicio y entorno. Una reversión se identifica cuando se cumplen ambos de los siguientes criterios:
- La versión actual es diferente a la versión anterior. Esto asegura que volver a desplegar la misma versión no constituya una reversión.
- La versión actual coincide con una versión que se desplegó anteriormente.

Puede buscar despliegues de reversión en [Deployment Executions][1], usando la etiqueta `@deployment.is_rollback`:

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Indicador de reversión en la página de Deployment Executions" style="width:100%;">}}

También puede ver información más detallada en el detalle del evento:

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Detalle de reversión" style="width:100%;">}}

## Requisitos {#requirements}

La detección de reversiones funciona para despliegues que tienen todo lo siguiente:
- Un servicio (`@deployment.service`)
- Un entorno (`@deployment.env`)
- Un identificador de versión (`@deployment.version`)

### Versión para proveedores basados en CI {#version-for-ci-based-providers}
Para proveedores basados en CI, Datadog utiliza el parámetro `--revision` que usted pasa al comando `datadog ci`. Este parámetro debe contener el identificador de versión para su despliegue (como un SHA de confirmación, una etiqueta de imagen o un número de versión).

### Versión para Argo CD {#version-for-argo-cd}
Para despliegues de Argo CD, Datadog utiliza la versión de las imágenes correlacionadas para detectar reversiones. Datadog identifica la imagen "principal" de su despliegue y extrae la etiqueta de versión de ella.

Para habilitar la detección de reversiones para despliegues de Argo CD, necesita correlacionar sus imágenes con confirmaciones utilizando el comando [`datadog-ci deployment correlate-image`][2] como se explica en la [documentación de monitoreo de Argo CD][3]. La correlación de imágenes requiere Argo CD v3.1.0 o posterior.

Cuando las imágenes están correctamente correlacionadas, Datadog asigna una etiqueta de versión a partir de los metadatos de la imagen, que luego se utiliza para la detección de reversiones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /es/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines