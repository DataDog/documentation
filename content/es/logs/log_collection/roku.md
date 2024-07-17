---
description: Recopila logs desde tu canal de Roku.
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Código fuente
  text: Código fuente dd-sdk-roku
- link: logs/explorer
  tag: Documentación
  text: Aprende a explorar tus logs
title: Recopilación de logs de Roku
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La recopilación de logs de Roku no está disponible en el sitio de Datadog US1-FED.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">La recopilación de logs de Roku está en fase beta.</div>
{{< /site-region >}}

Envía logs a Datadog desde tu canal de Roku con [la biblioteca de registro `dd-sdk-roku` de Datadog][1] y aprovecha las siguientes funciones:

* Loguear en Datadog en formato JSON de forma nativa.
* Añadir `context` y atributos personalizados adicionales a cada log enviado.
* Registra las direcciones IP reales de los clientes y los Agents de usuario.
* Uso optimizado de red con envíos masivos automáticos.

## Configuración

1. Añade la dependencia a tu proyecto utilizando `ROPM`, o descarga el [último archivo zip][7] y extráelo en tu proyecto.

    ```shell
    ropm install datadog-roku
    ```

2. Inicializa la biblioteca con tu [token de cliente de Datadog][2] y el ID de aplicación generado al crear una nueva aplicación RUM en la interfaz de usuario de Datadog (consulta [Empezando con la recopilación de Roku RUM][6] para obtener más información). Por razones de seguridad, debes usar un token de cliente: no puedes usar [claves de API de Datadog][3] para configurar la biblioteca `dd-sdk-roku`, ya que estarían expuestas del lado del cliente en el paquete del canal de Roku.

   Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][2].

   {{< site-region region="us" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "eu1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us3",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "us5",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
           launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   ```brightscript
   sub RunUserInterface(args as dynamic)
       screen = CreateObject("roSGScreen")
       scene = screen.CreateScene("MyScene")
       screen.show()

       datadogroku_initialize({
           clientToken: "<CLIENT_TOKEN>",
           applicationId: "<APPLICATION_ID>"
           site: "ap1",
           env: "<ENV_NAME>",
           sessionSampleRate: 100, ' the percentage (integer) of sessions to track
          launchArgs: args
       })

       ' complete your channel setup here
   end sub
   ```
   {{< /site-region >}}


3. (Opcional) Cuando escribas tu aplicación, puedes habilitar el desarrollo de logs estableciendo el atributo `datadogVerbosity` en el nodo global. Todos los mensajes internos en la biblioteca con una prioridad igual o superior al nivel proporcionado se registran en la salida telnet de tu dispositivo de Roku:

   ```brightscript
   ' 0 = none; 1 = error; 2 = warning; 3 = info; 4 = verbose;
   m.globalNode.addFields({ datadogVerbosity: 2 }) 
   ```

4. Envía una entrada personalizada de log directamente a Datadog con una de las siguientes funciones:

    ```brightscript
    msg = "A log message"
    m.global.datadogLogsAgent.callfunc("logOk", msg, {})
    m.global.datadogLogsAgent.callfunc("logDebug", msg, {})
    m.global.datadogLogsAgent.callfunc("logInfo", msg, {})
    m.global.datadogLogsAgent.callfunc("logNotice", msg, {})
    m.global.datadogLogsAgent.callfunc("logWarn", msg, {})
    m.global.datadogLogsAgent.callfunc("logError", msg, {})
    m.global.datadogLogsAgent.callfunc("logCritical", msg, {})
    m.global.datadogLogsAgent.callfunc("logAlert", msg, {})
    m.global.datadogLogsAgent.callfunc("logEmergency", msg, {})
    ```


5. (Opcional) Proporciona una matriz asociativa (AssocArray) junto a tu mensaje de log para añadir atributos al log emitido. Cada entrada de la AssocArray se añade como un atributo.

   ```brightscript
    m.global.datadogLogsAgent.callfunc(
        "logInfo", 
        "Video started", 
        { video_id: 42, video_type: "advert"}
    )
   ```

## Recopilación de lotes

Todos los logs se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación de admisión. Se envían en cuanto la red está disponible. Si la red no está disponible mientras la aplicación está abierta, o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Para garantizar que el SDK no utilice demasiado espacio en disco, los datos del disco se descartan automáticamente si son demasiado antiguos.

**Nota**: Antes de que los datos se carguen en Datadog, son almacenados en texto claro en el [directorio de cache][8] de tu canal, lo que significa que estos datos no pueden ser leídos por otras aplicaciones. El sistema operativo puede desalojar los datos en cualquier momento, lo que podría causar pérdida de datos en algunos casos poco frecuentes.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-roku
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/logs/processing/attributes_naming_convention/
[5]: /es/tagging/
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/?tab=us
[7]: https://github.com/DataDog/dd-sdk-roku/releases
[8]: https://developer.roku.com/fr-fr/docs/developer-program/getting-started/architecture/file-system.md#cachefs