---
description: Más información sobre cómo CD Visibility detecta las reversiones de despliegues.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar las despliegues
title: Detección de reversiones
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview" >}}
CD Visibility está en Vista previa. Si te interesa esta función, completa el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Saber cuándo determinados despliegues realizan una reversión es útil para:
- Comprender la estabilidad del despliegue y la frecuencia de las reversiones en todos tus servicios.
- Identificar patrones en los problemas de despliegue que conducen a reversiones.

Para detectar reversiones, Datadog compara la versión de despliegue actual con las versiones anteriores desplegadas para el mismo servicio y entorno. Se identifica una reversión cuando se dan las dos circunstancias siguientes:
- La versión actual es diferente de la versión anterior. Esto garantiza que volver a desplegar la misma versión no constituya una reversión.
- La versión actual coincide con una versión que se desplegó anteriormente.

Puedes buscar despliegues de reversiones en [Ejecuciones de despliegues][1], utilizando la etiqueta (tag) `@deployment.is_rollback`:

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Indicador de reversión en la page (página) Ejecuciones de Despliegues" style="width:100%;">}}

También puedes ver información más detallada en el detalle del evento:

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Detalle de reversión" style="width:100%;">}}

## Requisitos

La detección de reversiones funciona para los despliegues que tienen todo lo siguiente:
- Un servicio (`@deployment.service`)
- Un entorno (`@deployment.env`)
- Un identificador de la versión (`@deployment.version`)

### Versión para proveedores basados en CI
Para los proveedores basados en CI, Datadog utiliza el parámetro `--revision` que se pasa al comando `datadog ci`. Este parámetro debe contener el identificador de la versión de tu despliegue (como un SHA de confirmación, una etiqueta (tag) de imagen o un número de versión).

### Versión para Argo CD
Para los despliegues de Argo CD, Datadog utiliza la versión de imágenes correlacionadas para detectar reversiones. Datadog identifica la imagen "principal" de tu despliegue y extrae de ella la etiqueta (tag) de versión.

Para habilitar la detección de reversiones para despliegues de Argo CD, necesitas correlacionar tus imágenes con confrmaciones usando el [comando`datadog-ci deployment correlate-image` ][2] como se explica en la [documentación de monitorización de Argo CD][3].

Cuando las imágenes se correlacionan correctamente, Datadog completa una etiqueta (tag) de versión a partir de los metadatos de la imagen, que se utiliza para la detección de reversiones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/deployment#correlate
[3]: /es/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines