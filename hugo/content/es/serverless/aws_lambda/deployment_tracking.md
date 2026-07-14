---
aliases:
- /es/serverless/deployment_tracking
further_reading:
- link: /serverless/distributed_tracing
  tag: Documentación
  text: Rastreo distribuido para aplicaciones serverless
- link: /serverless/serverless_tagging
  tag: Documentación
  text: Etiquetado serverless
title: Seguimiento del despliegue de aplicaciones serverless de AWS Lambda
---

El seguimiento del despliegue te ayuda a comprender cuándo una nueva versión de código o un cambio en la configuración provoca un pico de errores, una disminución del rendimiento o que tu entorno de nube se desvíe de su estado esperado.

## Eventos de despliegue

Datadog recopila los eventos de cambios en el código y la configuración de tus funciones AWS Lambda desde AWS CloudTrail.

Para ver los eventos de despliegue de tus aplicaciones sin servidor, selecciona una función en la [vista sin servidor][1] para abrir un panel lateral y haz clic en la pestaña **Deployments** (Despliegues).

### Instalación

1. Si aún no lo has hecho, configura la integración [Amazon Web Services][2].

2. Añade el siguiente permiso al documento de políticas para tu rol AWS/Datadog:

   ```text
   cloudtrail:LookupEvents
   ```

Si ya añadiste el permiso, pero sigues sin ver eventos para cualquiera de tus funciones AWS Lambda, habilita el seguimiento del despliegue utilizando el [cuadro de integración de AWS Lambda][3].

{{< img src="serverless/lambda_integration_settings.png" alt="Parámetros de la integración de Lambda" style="width:100%;">}}

## Resource Changes

<div class="alert alert-info">Resource Changes está en vista previa. La activación de la recopilación de recursos puede repercutir en los costes de AWS CloudWatch .</div>

Puedes utilizar [Resource Changes][4] para obtener visibilidad y control sobre los cambios de configuración de tus funciones AWS Lambda. Para activar Resource Changes, activa la recopilación de recursos en la integración Datadog-AWS:

1. Ve al [cuadro de integración de Amazon Web Services][5] en Datadog.
2. Selecciona tu cuenta AWS y ve a la pestaña **Resource Collection** (Recopilación de recursos).
3. Activa la opción **Enable Resource Collection** (Activar la recopilación de recursos).

Consulta la documentación de [Resource Changes][4] para obtener más información.

## Etiquetar la telemetría con información de despliegues

Datadog puede agrupar tus métricas por etiquetas (tags) como `git.commit.sha` para correlacionar los cambios de código con los problemas.

{{< img src="serverless/metrics_grouped_by_git_commit.png" alt="Métricas agrupadas por confirmación Git" style="width:100%;">}}

Dependiendo de tu configuración, la extensión Datadog Lambda añade las siguientes etiquetas a tus métricas, logs y trazas (traces):
- `executed_version`: Versión de la función AWS Lambda que se ejecutó. Esta etiqueta es añadida por la extensión Datadog Lambda cuando activas el [control de versiones de AWS Lambda][6] para tu función. Para utilizar esta función, debes publicar versiones de tu función Lambda y configurar alias o invocaciones directas para utilizar versiones específicas.
- `version`: Etiqueta de versión de despliegue configurada a través de la variable de entorno `DD_VERSION` Lambda. Si la tienes como variable de entorno, la extensión Datadog Lambda la añade como etiqueta.
- `git.commit.sha`: Hash del commit Git asociado al código desplegado. Debe incluirse en la variable de entorno `DD_TAGS` Lambda (por ejemplo, `DD_TAGS=git.commit.sha:abc123def456`). Si despliegas tu función Lambda utilizando constructos CI o CDK de Datadog, esta etiqueta se añade automáticamente a la variable de entorno `DD_TAGS` durante el despliegue. De lo contrario, deberás añadirla a `DD_TAGS`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/integrations/amazon_web_services/#setup
[3]: https://app.datadoghq.com/integrations/amazon-lambda
[4]: /es/infrastructure/resource_catalog/resource_changes/
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html