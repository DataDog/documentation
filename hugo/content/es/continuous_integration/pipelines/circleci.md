---
aliases:
- /es/continuous_integration/setup_pipelines/circleci
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentación
  text: Ampliar la visibilidad de los pipelines mediante el rastreo de comandos individuales
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Ampliar la visibilidad de los pipelines mediante la adición de etiquetas y
    medidas personalizadas
title: Configurar el rastreo en un flujo de trabajo de CircleCI
---

## Información general

[CircleCI][1] es una plataforma de integración y entrega continuas que permite a los equipos crear, testear y desplegar software a escala.

Configura el rastreo en CircleCI para optimizar el rendimiento de tus pipelines, mejorar la colaboración entre equipos y asegurar procesos de compilación coherentes y conformes.

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][12] | Pipelines parciales | Ver las ejecuciones de pipelines parcialmente recuperados. |
| Correlación de logs | Correlación de logs | Correlaciona el pipeline y los tramos (spans) de trabajo con logs y habilita la [recopilación de logs de trabajos][10]. |
| [Tramos personalizados][13] | Tramos personalizados | Configura tramos personalizados para tus pipelines. |
| Etiquetas predefinidas personalizadas | Etiquetas predefinidas personalizadas | Establece [etiquetas personalizadas][6] para todos los pipelines y tramos de trabajos generados. |
| [Etiquetas personalizadas][14] [y medidas en tiempo de ejecución][15] | Etiquetas personalizadas y medidas en tiempo de ejecución | Configura [etiquetas y medidas personalizadas][7] en tiempo de ejecución. |

## Configurar la integración de Datadog

La integración de Datadog para [CircleCI][1] funciona utilizando [webhooks][2] para enviar datos a Datadog.

1. Para cada proyecto, ve a *Project Settings > Webhooks** (Configuración del proyecto > Webhooks) en CircleCI y añade un nuevo webhook:

   * **Webhook Name** (Nombre del webhook): `Datadog CI Visibility` o cualquier otro nombre identificador que quieras proporcionar.
   * **Receiver URL** (URL del receptor): <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> donde `<API_KEY>` es tu [clave de API de Datadog][3].
   * **Certificate verifications (Verificación de certificados): habilita este check.
   * **Events** (Eventos): selecciona `Workflow Completed` y `Job Completed`.

2. Haz clic en **Add Webhook** (Añadir webhooks) para guardar el nuevo webhook.

## Configuración avanzada

### Configurar varios proyectos en bloque

Datadog ofrece un [script][9] para ayudarte a habilitar los hooks de servicio en varios o todos tus proyectos de CircleCI mediante la API de CircleCI. El script requiere Python 3 y el paquete de `requests`.

Para ejecutar este script, necesitas:

- Tu clave de API Datadog 
- Un token e dAPI personal de CircleCI

Para más información, puedes ejecutar el siguiente comando:

```shell
./service_hooks.py --help
```

Para configurar hooks en bloque para tus proyectos:

1. Inicia sesión en tu cuenta de CircleCI y sigue todos los proyectos en los que quieras activar los hooks. Opcionalmente, utiliza el botón **Follow All** (Seguir todos) de la página Projects (Proyectos).

2. Ejecuta el script utilizando las variables de entorno `DD_API_KEY` y `DD_SITE`, o pasando los parámetros indicadores `--dd-api-key` y `--dd-site`:

   Por ejemplo:

   ```shell
   ./service_hooks.py \
       --dd-api-key <DD_API_KEY> \
       --circle-token <CIRCLECI_TOKEN> \
       --dd-site {{< region-param key="dd_site" code="true" >}} \
       --threads 4
   ```

### Establecer etiquetas personalizadas

Para establecer etiquetas personalizadas en todos los pipelines y tramos de trabajo generados por la integración, añade a la **Receiver URL** (URL del receptor) un parámetro de consulta codificado en URL `tags` con pares `key:value` separados por comas.

Si un par `key:value` contiene alguna coma, enciérralo entre comillas. Por ejemplo, para añadir `key1:value1,"key2: value with , comma",key3:value3`, habría que añadir la siguiente cadena a **Receiver URL** (URL del receptor): `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.



#### Integración con los equipos de Datadg 

Para mostrar y filtrar los equipos asociados a tus pipelines, añade `team:<your-team>` como una etiqueta personalizada. El nombre de etiqueta personalizada debe coincidir exactamente con el nombre de tu equipo en [Equipos de Datadog][8].

### Recopilar logs de trabajo

La integración de Datadog CircleCI recopila logs de tus trabajos de CircleCI finalizados y los reenvía a Datadog. Para instalar y configurar esta integración, consulta la [documentación de la integración de CircleCI][11].

Los logs se facturan por separado de CI Visibility. La retención, la exclusión y los índices de logs se configuran en [Log Management][16]. Los logs para los trabajos de CircleCI se pueden identificar por las etiquetas `datadog.product:cipipeline` y `source:circleci`.

## Visualizar los datos de pipeline en Datadog

Las páginas [**CI Pipeline List**][4] (Lista de pipelines de CI) y [**Executions**][5] (Ejecuciones) se rellenan con datos una vez finalizados los flujos de trabajo.

La página **CI Pipeline List** (Lista de pipelines de CI) muestra datos sólo para la rama por defecto de cada repositorio. Para obtener más información, consulta [Buscar y gestionar pipelines de CI][17].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /es/continuous_integration/pipelines/circleci/#set-custom-tags
[7]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /es/account_management/teams/
[9]: https://raw.githubusercontent.com/DataDog/ci-visibility-circle-ci/main/service_hooks.py
[10]: /es/continuous_integration/pipelines/circleci/#enable-log-collection
[11]: /es/integrations/circleci/#setup
[12]: /es/glossary/#partial-retry
[13]: /es/glossary/#custom-span
[14]: /es/glossary/#custom-tag
[15]: /es/glossary/#custom-measure
[16]: /es/logs/guide/best-practices-for-log-management/
[17]: /es/continuous_integration/search/#search-for-pipelines