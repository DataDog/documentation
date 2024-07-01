---
aliases:
- /es/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: FAQ
  text: ¿Cómo enviar logs a Datadog a través de cargadores de log externos?
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ¿Cómo investigar un problema de parseo de logs?
kind: guía
title: Aumentar el número de archivos de log supervisados por el Agent
---

Por defecto, el Agent puede almacenar hasta 200 archivos de log en Windows y MacOS, y 500 archivos de log en otros sistemas operativos. Este límite se coloca para evitar problemas de rendimiento cuando se establecen comodines en directorios enormes.

Para aumentar este límite, ajusta el valor de `open_files_limit` en el archivo de configuración del Agent (`/etc/datadog-agent/datadog.yaml`) en la sección `logs_config`:

```yaml
logs_config:
  open_files_limit: 500
```

Para los entornos en contenedores, puedes establecer la variable de entorno `DD_logs_CONFIG_OPEN_FILES_LIMIT`.

**Nota**: Aumentar el límite de archivos de logs supervisados podría incrementar el consumo de recursos del Agent.