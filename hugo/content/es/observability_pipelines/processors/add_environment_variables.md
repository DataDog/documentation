---
description: Aprenda a usar el procesador Add Environment Variables para agregar un
  nombre y un valor de variable de entorno a los mensajes de registro.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Add Environment Variables
---
{{< product-availability >}}

## Descripción general {#overview}

Use este procesador para agregar un nombre de campo y un valor de variable de entorno al mensaje de registro.

## Configuración {#setup}

Para configurar este procesador:

1. Defina una {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
   - Solo se procesan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Ingrese el nombre del campo para la variable de entorno.
1. Ingrese el nombre de la variable de entorno.
1. Haga clic en {{< ui >}}Add Environment Variable{{< /ui >}} si desea agregar otra variable de entorno.

### Variables de entorno bloqueadas {#blocked-environment-variables}

Las variables de entorno que coincidan con cualquiera de los siguientes patrones no se agregarán a los mensajes de registro porque la variable de entorno podría contener datos confidenciales.

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

La variable de entorno se compara con el patrón y no con la palabra literal. Por ejemplo, `PASSWORD` impide que variables de entorno como `USER_PASSWORD` y `PASSWORD_SECRET` se agreguen a los mensajes de registro.

### Allowlist {#allowlist}

Después de haber agregado procesadores a su canalización y haber hecho clic en {{< ui >}}Next: Install{{< /ui >}}, en el campo {{< ui >}}Add environment variable processor(s) allowlist{{< /ui >}}, ingrese una lista separada por comas de las variables de entorno de las que desea extraer valores y usar con este procesador.

La allowlist se almacena en la variable de entorno `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.

## Métricas de estado {#health-metrics}

Para [métricas de componentes][2] y [métricas de búfer de procesador][3] emitidas por todos los procesadores, consulte la documentación de [Pipelines Usage Metrics][4]. Para filtrar o agrupar por métricas del procesador Add Environment Variables, utilice la etiqueta `component_type:add_env_vars`.

[1]: /es/observability_pipelines/search_syntax/logs/
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/