---
aliases:
- /es/logs/log_collection/nxlog
categories:
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/sinatra.md
description: Recopila logs de aplicación de Sinatra.
has_logo: true
integration_id: sinatra
integration_title: Sinatra
is_public: true
name: Sinatra
public_title: Integración de Datadog y Sinatra
short_description: Recopila logs de aplicación de Sinatra.
supported_os:
- linux
- mac_os
- windows
title: Sinatra
---

## Información general

Esta integración te permite obtener el registro de acceso web de tus aplicaciones de [Sinatra][1] para monitorizar:

- Logs de errores (códigos 4xx, códigos 5xx)
- Tiempo de respuesta de las páginas web
- Número de solicitudes
- Número de bytes intercambiados

## Configuración

### Instalación

[Instala el Agent][2] en la instancia que ejecuta tu aplicación de Sinatra.

### Configuración

Los logs de función de [registro de Sinatra][3] por defecto a stdout. Datadog recomienda que utilices [Rack][4] [Common Logger][5] para loguear en un archivo y en la consola.

Aquí hay un ejemplo de configuración que genera logs en un archivo y en la consola. Esto se puede establecer en el archivo de configuración de Rack (`config.ru`) o en el bloque de configuración para tu aplicación de Sinatra.

```ruby
require 'sinatra'

configure do
  # el registro está activado por defecto en las aplicaciones de estilo clásico,
  # por lo tanto `enable :logging` no es necesario
  file = File.new("/var/log/sinatra/access.log", 'a+')
  file.sync = true
  use Rack::CommonLogger, file
end

get '/' do
  'Hello World'
end
```

Este registrador utiliza el formato de acceso común de Apache y genera logs en el siguiente formato:

```text
127.0.0.1 - - [15/Jul/2018:17:41:40 +0000] "GET /uptime_status HTTP/1.1" 200 34 0.0004
127.0.0.1 - - [15/Jul/2018 23:40:31] "GET /uptime_status HTTP/1.1" 200 6997 1.8096
```

#### Recopilación de logs

_Disponible para versiones >6.0 del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en tu archivo `datadog.yaml` con:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `sinatra.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent][6] para empezar a recopilar tus logs de aplicación de Sinatra:

    ```yaml
    logs:
      - type: file
        path: /var/log/sinatra/access.log
        source: sinatra
        service: webapp
    ```

      Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][7]

[1]: http://sinatrarb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: http://sinatrarb.com/intro.html#Logging
[4]: http://rack.github.io
[5]: https://www.rubydoc.info/github/rack/rack/Rack/CommonLogger
[6]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: /es/agent/guide/agent-commands/#restart-the-agent