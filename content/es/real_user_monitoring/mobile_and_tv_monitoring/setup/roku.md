---
aliases:
- /es/real_user_monitoring/roku/
code_lang: roku
code_lang_weight: 60
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku
  tag: Documentación
  text: Configuración avanzada de RUM Roku
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Código fuente
  text: Código fuente de dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
- link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  tag: Blog
  text: Monitorizar tus canales de Roku con Datadog RUM
title: Configuración de monitorización de canal de RUM Roku
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM para Roku no está disponible en el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de los usuarios individuales de tu canal.

El SDK de Datadog Roku admite canales de BrightScript para Roku OS 10 y posterior.

## Configuración

1. Declarar el SDK como dependencia.
2. Especificar los detalles de la aplicación en Datadog.
3. Inicializar la biblioteca.
4. Instrumentar el canal.

### Declarar el SDK como dependencia

#### Utilización de ROPM (recomendado)

`ROPM` es un gestor de paquetes para la plataforma Roku (basado en NPM). Si aún no estás usando `ROPM` en tu proyecto de Roku, lee tu [Guía Empezando][1]. Una vez que tu proyecto esté configurado para usar `ROPM`, puedes usar el siguiente comando para instalar la dependencia de Datadog:

```shell
ropm install datadog-roku
```

### Configuración manual

Si tu proyecto no utiliza `ROPM`, instala la biblioteca manualmente al descargar el archivo zip del [SDK de Roku][2] 
y descomprimirlo en la carpeta raíz de tu proyecto.

Asegúrate de que tienes una subcarpeta `roku_modules/datadogroku` en las carpetas `components` y `source` de tu proyecto.

### Especificar los detalles de la aplicación en Datadog

1. Ve a [**Digital Experience** > **Add an Application**][3] (Experiencia digital > Añadir una aplicación).
2. Selecciona **Roku** como tipo de aplicación e introduce un nombre de aplicación para generar un ID de aplicación de Datadog y un token de cliente únicos.
3. Para deshabilitar la recopilación automática de datos del usuario, ya sea para la IP del cliente o los datos de geolocalización, desmarca las casillas para esas configuraciones. Para obtener más información, consulta [Datos recopilados de RUM Roku][4].

   {{< img src="real_user_monitoring/roku/roku-new-application-2.png" alt="Crear una aplicación RUM para Roku en Datadog" style="width:90%;">}}

Para asegurar la seguridad de tus datos, debes utilizar un token de cliente. Si solo utilizaras [claves de API de Datadog][5] para configurar la biblioteca `dd-sdk-roku`, estarían expuestos del lado del cliente en el código BrightScript del canal de Roku. 

Para obtener más información sobre cómo configurar un token de cliente, consulta la [Documentación sobre el token de cliente][6].

### Inicializar la biblioteca

En el fragmento de inicialización, establece un nombre de entorno. Para obtener más información, consulta [Uso de etiquetas][7].

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

### Muestrear sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una tasa de muestreo para las sesiones de RUM mientras [inicializas el SDK de RUM Roku][9] como un porcentaje entre 0 y 100. Puedes especificar la tasa con el parámetro `sessionSampleRate`.

### Instrumentar el canal

Consulta [**Rastreo de recursos de RUM**][8] para activar el rastreo automático de todos tus recursos, y [**Mejorar sesiones de usuario**][9] para añadir información personalizada global o del usuario a tus eventos.

#### Rastrear vistas de RUM

Para dividir [sesiones de usuario][4] en pasos lógicos, inicia manualmente una Vista con el siguiente código. Cada navegación a una nueva pantalla dentro de tu canal debe corresponder a una nueva Vista de RUM.

```brightscript
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

#### Rastreo de las acciones de RUM

Las acciones de RUM representan las interacciones que tus usuarios tienen con tu canal. Puedes enviar acciones a Datadog de la siguiente manera:

```brightscript
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom" 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

#### Rastreo de errores de RUM

Siempre que realices una operación que pueda lanzar una excepción, puedes reenviar el error a Datadog de la siguiente manera:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```




## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/rokucommunity/ropm
[2]: https://github.com/DataDog/dd-sdk-roku
[3]: https://app.datadoghq.com/rum/application/create
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku
[5]: /es/account_management/api-app-keys/#api-keys
[6]: /es/account_management/api-app-keys/#client-tokens
[7]: /es/getting_started/tagging/using_tags/#rum--session-replay
[8]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#track-rum-resources
[9]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#enrich-user-sessions
[10]: