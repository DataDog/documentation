---
private: true
title: Modo de depuración del Agent 5
---

## Información general

El Agent, por defecto, genera logs en el nivel `INFO`. Se puede definir el nivel donde se generan como `DEBUG` para obtener más información de tus logs.

**Nota**: El modo de depuración solo es apto para realizar depuraciones. Datadog recomienda habilitar el modo `DEBUG` solo durante un periodo de tiempo acotado, ya que aumenta el número de logs indexados. Cuando hayas terminado, restablece el nivel de logs a `INFO`.

Para activar el modo de depuración completa del Agent:

1. Modifica el archivo local `datadog.conf`. Consulta el [archivo de configuración principal del Agent][1] para obtener información concreta en función de tu sistema operativo.
2. Sustituye `# log_level: INFO` por `log_level: DEBUG` (elimina `#` para quitar el comentario de la línea).
3. Reinicia el Datadog Agent. Consulta los [comandos del Agent][2] para obtener información concreta en función de tu sistema operativo.
4. Espera unos minutos para generar algunos logs. Consulta los [archivos de logs del Agent][3] para obtener información concreta en función de tu sistema operativo.

## Agent contenedorizado

Cuando se ejecuta en un contenedor, el Agent no se puede reiniciar con `service datadog-agent restart` (o similar), lo que provoca que el contenedor sea eliminado por Docker. Utiliza el supervisor para reiniciar un Agent en contenedores:

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Con los siguientes comandos, habilita el registro de depuración, reinicia el Agent, espera 60 segundos y luego envía un flare, en ese orden:

```shell
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <CASE_ID>
```

Es posible deshabilitar los logs de depuración mediante el siguiente comando:

```shell
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

O se puede reiniciar el contenedor.

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

**Nota**: Al establecer el nivel de log en `'OFF'` en el archivo de configuración, las comillas son obligatorias para evitar que el valor se analice incorrectamente. Las comillas son opcionales para otros niveles de log.

[1]: /es/agent/guide/agent-5-configuration-files/
[2]: /es/agent/guide/agent-5-commands/
[3]: /es/agent/guide/agent-5-log-files/