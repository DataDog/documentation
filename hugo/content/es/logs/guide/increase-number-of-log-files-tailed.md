---
aliases:
- /es/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: PREGUNTAS FRECUENTES
  text: ¿Cómo enviar registros a Datadog a través de transportadores de registros
    externos?
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: PREGUNTAS FRECUENTES
  text: ¿Cómo investigar un problema de parseo de registros?
title: Aumentar el número de archivos de registro que son objeto de seguimiento de
  las últimas líneas por el Agent
---
El parámetro `logs_config.open_files_limit` en el archivo de configuración del Agent (`/etc/datadog-agent/datadog.yaml`) determina la cantidad máxima de archivos de registro en seguimiento de las últimas líneas que el Agent puede manejar simultáneamente. Este límite se establece para evitar problemas de rendimiento cuando se utilizan comodines en directorios enormes. Puede aumentar el límite ajustando este parámetro.

```yaml
logs_config:
  open_files_limit: 500
```

Para entornos en contenedores, puede configurar la variable de entorno `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`.

El valor predeterminado varía según la versión del Agent y el sistema operativo. Para verificar el valor predeterminado de su versión del Agent, consulte los [archivos de configuración de ejemplo del Agent][1] en el repositorio del Datadog Agent. Abra el archivo correspondiente a su sistema operativo. Asegúrese de seleccionar la etiqueta correspondiente a su versión del Agent para ver los valores predeterminados correctos.

**Nota**: Aumentar el límite de archivos de registro en seguimiento de las últimas líneas podría incrementar el consumo de recursos del Agent.

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example