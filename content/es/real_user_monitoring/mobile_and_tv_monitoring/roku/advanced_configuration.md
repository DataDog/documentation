---
aliases:
- /es/real_user_monitoring/roku/advanced_configuration/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Código fuente
  text: Código fuente de dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
site_support_id: rum_roku
title: Configuración avanzada de Roku
---

## Información general

Si aún no has configurado el SDK, sigue las [instrucciones de configuración de la aplicación][1] o consulta la [documentación de configuración de Roku RUM][2].

## Rastrear recursos de RUM

### `roUrlTransfer`

Las solicitudes de red realizadas directamente con un nodo `roUrlTransfer` deben ser rastreadas.

Para *solicitudes síncronas*, puedes utilizar el contenedor `datadogroku_DdUrlTransfer` de Datadog para rastrear el recurso automáticamente. Este contenedor admite la mayoría de las características del componente `roUrlTransfer`, pero no admite nada relacionado con las llamadas de red asíncronas.

Por ejemplo, así se hace una llamada a `GetToString`:

```brightscript
    ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
    ddUrlTransfer.SetUrl(url)
    ddUrlTransfer.EnablePeerVerification(false)
    ddUrlTransfer.EnableHostVerification(false)
    result = ddUrlTransfer.GetToString()
```

Para *solicitudes asíncronas*, no se admite la instrumentación automática. Es necesario rastrear el recurso manualmente. El siguiente fragmento de código muestra cómo informar de la solicitud como un recurso de RUM:

```brightscript
sub performRequest()

    m.port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    ' setup the node url, headers, ...

    timer = CreateObject("roTimespan")
    timer.Mark()
    request.AsyncGetToString()

    while (true)
        msg = wait(1000, m.port)
        if (msg <> invalid)
            msgType = type(msg)
            if (msgType = "roUrlEvent")
                if (msg.GetInt() = 1) ' transfer complete
                    durationMs& = timer.TotalMilliseconds()
                    transferTime# = datadogroku_millisToSec(durationMs&)
                    httpCode = msg.GetResponseCode()
                    status = "ok"
                    if (httpCode < 0)
                        status = msg.GetFailureReason()
                    end if
                    resource = {
                        url: requestUrl
                        method: "GET"
                        transferTime: transferTime#
                        httpCode: httpCode
                        status: status
                    }
                    m.global.datadogRumAgent.callfunc("addResource", resource)
                end if
            end if
        end if
    end while
end sub
```

### Recursos de streaming

Siempre que utilices un `Video` o un nodo `Audio` para transmitir medios, puedes reenviar todos los `roSystemLogEvent` que recibas a Datadog de la siguiente manera: 

```brightscript 
    sysLog = CreateObject("roSystemLog")
    sysLog.setMessagePort(m.port)
    sysLog.enableType("http.error")
    sysLog.enableType("http.complete")

    while(true)
        msg = wait(0, m.port)
        if (type(msg) = "roSystemLogEvent")
            m.global.datadogRumAgent.callfunc("addResource", msg.getInfo())
        end if
    end while
```

## Mejorar las sesiones de usuario

Después de que tu canal Roku esté instrumentado con RUM, puedes mejorar aún más la información de la sesión del usuario y obtener un control más detallado sobre los atributos recopilados mediante el rastreo de eventos personalizados.

Además de los atributos RUM predeterminados capturados por el SDK de RUM Roku automáticamente, puedes optar por añadir información contextual adicional, como atributos personalizados, a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog. Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la línea temporal de la sesión, los logs de error o el estado de la red).

### Identificar a tus usuarios

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:
* Seguir el recorrido de un usuario determinado.
* Saber qué usuarios son los más afectados por los errores.
* Monitorizar el rendimiento para tus usuarios más importantes.

| Atributo   | Tipo   | Descripción                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Cadena | (Obligatorio) Identificador único de usuario.                                              |
| `usr.name`  | Cadena | (Opcional) Nombre de usuario sencillo, mostrado por defecto en la interfaz de usuario RUM.              |
| `usr.email` | Cadena | (Opcional) Correo electrónico del usuario, mostrado en la interfaz de usuario RUM, si el nombre de usuario no está presente. |

Para identificar las sesiones de usuario, utiliza el campo global `datadogUserInfo`, después de inicializar el SDK, por ejemplo:

```brightscript
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```

### Rastreo de atributos globales personalizados

Además de los atributos predeterminados capturados por el SDK automáticamente, puedes optar por añadir información contextual adicional, como atributos personalizados, a tus eventos de logs y RUM para mejorar tu observabilidad dentro de Datadog. Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la línea temporal de la sesión, los logs de error o el estado de la red).

```brightscript
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/roku/setup