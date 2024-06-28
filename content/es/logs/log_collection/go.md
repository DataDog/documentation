---
aliases:
- /es/logs/languages/go
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: Blog
  text: Cómo recopilar, normalizar y centralizar logs de Golang
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: documentación
title: Recopilación de logs de Go
---

Para enviar tus logs de Go a Datadog, loguea un archivo y luego [supervisa][11] ese archivo con tu Datadog Agent. Puedes utilizar la siguiente configuración con [logrus][1], una biblioteca de registro de código abierto.

Datadog recomienda encarecidamente que configures tu biblioteca de registro para producir tus logs en JSON y evitar la necesidad de [reglas de parseo personalizadas][2].

## Configurar tu logger

Para una configuración de Go clásica, abre un archivo `main.go` y pega el siguiente código:

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event as usual with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

Puedes añadir metas a cualquier log si proporcionas un objeto JSON que desees ver en el evento de log.

Estas metas pueden ser `hostname`, `username`, `customers`, `metric` o cualquier información que pueda ayudarte a solucionar problemas y entender lo que ocurre en tu aplicación Go.

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // use JSONFormatter
    log.SetFormatter(&log.JSONFormatter{})

    // log an event with logrus
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")

  // for metadata, a common pattern is to reuse fields between logging statements by reusing
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Simple event with global metadata")
}
```

## Configura tu Datadog Agent

Una vez que [la recopilación de log está habilitada][3], configura la [recopilación de log personalizada][4] para supervisar tus archivos de log y enviar nuevos logs a Datadog.

1. Crea una carpeta `go.d/` en el [directorio de configuración del Agent][5] `conf.d/`.
2. Crea un archivo `conf.yaml` en `go.d/` con el siguiente contenido:

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "<path_to_your_go_log>.log"
        service: <service_name>
        source: go
        sourcecategory: sourcecode
    ```

3. [Reinicia el Agent][6].
4. Ejecuta el [subcomando de estado del Agent][7] y busca `go` en la sección `Checks` para confirmar que los logs se han enviado correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][7] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

## Conectar logs y trazas

Si APM está habilitado para esta aplicación, la correlación entre los logs de aplicación y trazas (traces) puede mejorarse siguiendo la [documentación de registro de APM Go][10] para añadir automáticamente trazas e IDs de tramos en tus logs.

## Prácticas recomendadas

* Asigna al registrador un nombre que se corresponda con la funcionalidad o servicio pertinente.
* Utiliza los niveles de log `DEBUG`, `INFO`, `WARNING` y `FATAL`. En Datadog, `FATAL` de Go se asigna a un nivel de gravedad de `Emergency`.
* Empieza registrando la información más importante. Amplía el alcance de tu registro con nuevas iteraciones.
* Utiliza metas para añadir contexto a cualquier log. Esto te permite filtrar rápidamente por usuarios, clientes, atributos empresariales, etc.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /es/logs/log_configuration/parsing
[3]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /es/logs/log_configuration/parsing/?tab=matchers
[9]: /es/logs/explorer/#overview
[10]: /es/tracing/other_telemetry/connect_logs_and_traces/go/
[11]: /es/glossary/#tail