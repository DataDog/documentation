---
aliases:
- /es/agent/faq/how-to-get-more-logging-from-the-agent
- /es/agent/faq/agent-5-container-more-log
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar flare del Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentación
  text: Consultar el estado de un check del Agent
title: Modo de depuración
---

## Información general

El Agent, por defecto, genera logs en el nivel `INFO`. Se puede definir el nivel donde se generan como `DEBUG` para obtener más información de tus logs.

**Nota**: El modo de depuración solo es apto para realizar depuraciones. Datadog recomienda habilitar el modo `DEBUG` solo durante un periodo de tiempo acotado, ya que aumenta el número de logs indexados. Cuando hayas terminado, restablece el nivel de logs a `INFO`.

Para activar el modo de depuración completa del Agent:

1. Modifica el archivo local `datadog.yaml`. Consulta el [archivo de configuración principal del Agent][1] para obtener información concreta en función de tu sistema operativo.

2. Sustituye `# log_level: INFO` por `log_level: DEBUG` (elimina `#` para quitar el comentario de la línea).

3. Reinicia el Datadog Agent. Consulta los [comandos del Agent][2] para obtener información concreta en función de tu sistema operativo.

4. Espera unos minutos para generar algunos logs. Consulta los [archivos de logs del Agent][3] para obtener información concreta en función de tu sistema operativo.

## Agent contenedorizado

Para activar el modo de depuración en el Agent del contenedor, utiliza `DD_LOG_LEVEL=debug` al iniciar tu Agent.

En el Agent v6.19/v7.19 y posteriores, define el nivel de logs del Agent en tiempo de ejecución utilizando:

```shell
agent config set log_level debug
```

**No** se puede cambiar el nivel de logs del contenedor de Trace-Agent en tiempo de ejecución, algo que sí se puede hacer en el caso del contenedor del Agent. Después de establecer la variable `DD_LOG_LEVEL` en `debug`, sigue siendo necesario realizar una nueva implementación para el contenedor exclusivo de Trace-Agent .

Si utilizas [**Helm**][4], sustituye `logLevel: INFO` por `logLevel: DEBUG` en tu archivo `datadog-values.yaml` y vuelve a desplegar.

## Nivel de logs del Agent

Los niveles de logs del Agent siguientes están disponibles tanto para `log_level` como para `DD_LOG_LEVEL`:

| Opción     | Logs críticos | Logs de error | Logs de advertencia | Logs de información | Logs de depuración | Logs de rastreo |
|------------|---------------|------------|-----------|-----------|------------|------------|
| `'OFF'`      |               |            |           |           |            |            |
| `'CRITICAL'` | {{< X >}}     |            |           |           |            |            |
| `'ERROR'`    | {{< X >}}     | {{< X >}}  |           |           |            |            |
| `'WARN'`     | {{< X >}}     | {{< X >}}  | {{< X >}} |           |            |            |
| `'INFO'`     | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |
| `'DEBUG'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |
| `'TRACE'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |

**Nota**: Al establecer el nivel de logs como `'OFF'` en el archivo de configuración, es obligatorio el uso de comillas para evitar que el valor se analice incorrectamente. Las comillas son opcionales para otros niveles de logs.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: /es/agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/helm-charts/blob/637472f105f42e8b444981ea2a38e955161c8e3a/charts/datadog/values.yaml#L125