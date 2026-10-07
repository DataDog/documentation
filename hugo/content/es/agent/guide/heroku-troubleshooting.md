---
aliases:
- /es/agent/faq/heroku-troubleshooting/
title: Solucionar problemas del paquete de compilación Datadog-Heroku
---

Para empezar a depurar Heroku, usa el comando `agent-wrapper` con los comandos de información/depuración indicados en la [documentación del Agent][1].

Por ejemplo, para mostrar el estado de tu Datadog Agent y de las integraciones habilitadas, ejecuta lo siguiente:

```shell
agent-wrapper status
```

A continuación, envía una métrica personalizada para verificar que el Datadog Agent está escuchando. Desde el directorio de tu proyecto, ejecuta:

```shell
heroku run bash

# Once your Dyno has started and you are at the command line
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

Transcurridos unos instantes, utiliza el explorador de métricas para verificar que se ha recibido la métrica.

También puede ser útil obtener los logs del Agent y del Trace Agent de tu dyno en ejecución.

Descarga los logs del Datadog Agent:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Descarga los logs del Datadog Trace Agent:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## Envía un flare

Genera un flare mediante la ejecución del [comando `agent-wrapper`][1]: 

```shell
agent-wrapper flare
```

[1]: /es/agent/guide/agent-commands/#agent-status-and-information