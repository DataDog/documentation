---
"categories":
- "languages"
- "log collection"
- "tracing"
"custom_kind": "integración"
"dependencies": []
"description": "Recopila métricas, trazas, logs y datos de perfil de tus aplicaciones PHP".
"doc_link": "https://docs.datadoghq.com/integrations/php/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-php-performance/"
  "tag": "Blog"
  "text": "Monitorización de PHP con Datadog APM y rastreo distribuido".
- "link": "https://www.datadoghq.com/blog/php-logging-guide/"
  "tag": "Blog"
  "text": "Cómo recopilar, personalizar y analizar logs de PHP".
"git_integration_title": "PHP"
"has_logo": true
"integration_id": "php"
"integration_title": "PHP"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "php"
"public_title": "Integración de Datadog y PHP"
"short_description": "Recopila métricas, trazas, logs y datos de perfil de tus aplicaciones PHP".
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración de Datadog y PHP te permite recopilar y monitorizar logs, trazas (traces) y métricas personalizadas de tu aplicación de PHP.

## Configuración

### Recopilación de métricas

Consulta la documentación dedicada a [recopilar métricas personalizadas de PHP con DogStatsD][1].

### Recopilación de trazas

Consulta la documentación dedicada a [instrumentar tu aplicación PHP][2] para enviar sus trazas (traces) a Datadog.

### APM

*Disponible para Agent v6.0+*

Consulta la documentación específica sobre cómo [configurar la recopilación de logs de PHP][3] para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación específica para [activar el perfilador PHP][4].

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/tracing/setup/php/
[3]: https://docs.datadoghq.com/logs/log_collection/php/
[4]: https://docs.datadoghq.com/profiler/enabling/php/
[5]: https://docs.datadoghq.com/help/

