---
description: Recopila datos de logs de tus proyectos de Unity.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
title: Recopilación de logs de Unity
---
Envía logs a Datadog desde tus aplicaciones de Unity con el [paquete de Unity de Datadog][1] y aprovecha las siguientes funciones:

* Loguear en Datadog en formato JSON de forma nativa.
* Utilizar los atributos predeterminados y añadir atributos personalizados a cada log enviado.
* Registrar las direcciones IP reales de los clientes y los Agents de usuario.
* Aprovechar el uso optimizado de red con publicaciones masivas automáticas.

## Configuración

Para inicializar el SDK de Datadog Unity para logs, consulta [Configuración][2].

Una vez que hayas configurado el SDK de Unity Datadog, puedes utilizar el SDK `DefaultLogger` para enviar logs a Datadog.

```cs
var logger = DatadogSdk.Instance.DefaultLogger;

logger.Debug("A debug message.");
logger.Info("Some relevant information?");
logger.Warn("An important warning...");
logger.Error("An error was met!");
```

Si estableces la opción "Forward Unity Logs" (Reenvío de logs de Unity), los logs enviados a Unity utilizando los métodos `Debug.Log*` de Unity se envían automáticamente a `DatadogSdk.Instance.DefaultLogger`.

También puedes crear registradores adicionales con diferentes servicios y nombres utilizando el método `CreateLogger`:

```dart
var loggingOptions = new DatadogLoggingOptions()
{
    Service = "com.example.custom_service",
    Name = "Additional logger",
};
var logger = DatadogSdk.Instance.CreateLogger(loggingOptions);

logger.Info('Info from my additional logger.');
```

## Gestionar etiquetas (tags)

Las etiquetas establecidas en los registradores son locales para cada registrador.

### Añadir etiquetas

Utiliza el método `DdLogger.AddTag` para añadir etiquetas (tags) a todos los logs enviados por un registrador específico:

```cs
// This adds a "build_configuration:debug" tag
logger.AddTag("build_configuration", "debug")
```

### Eliminar etiquetas

Utiliza el método `DdLogger.RemoveTag` para eliminar etiquetas de todos los logs enviados por un registrador específico:

```cs
// This removes any tag that starts with "build_configuration"
logger.RemoveTag("build_configuration")
```

Para más información, consulta [Empezando con etiquetas][3].

## Gestionar atributos

Los atributos establecidos en los registradores son locales para cada registrador.

### Atributos predeterminados

Por defecto, los siguientes atributos se añaden a todos los logs enviados por un registrador:

* `http.useragent` y sus propiedades extraídas `device` y `OS` 
* `network.client.ip` y sus propiedades geográficas extraídas (`country`, `city`)
* `logger.version`, versión del SDK de Datadog
* `logger.thread_name`(`main`, `background`)
* `version`, la versión de la aplicación del cliente extraída de `Info.plist` o de `application.manifest`
* `environment`, el nombre de entorno utilizado para inicializar el SDK

### Añadir atributos

Utiliza el método `DatadogLogger.AddAttribute` para añadir un atributo personalizado a todos los logs enviados por un registrador específico:

```cs
logger.AddAttribute("user-status", "unregistered")
```

El `value` puede ser la mayoría de los tipos que se pueden serializar utilizando [`JsonCovert.SerializeObject`][4].

### Eliminar atributos

Utiliza el método `DdLogger.RemoveAttribute` para eliminar un atributo personalizado de todos los logs enviados por un registrador específico:

```cs
// This removes the attribute "user-status" from all logs sent moving forward.
logger.RemoveAttribute("user-status")
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://github.com/DataDog/unity-package
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/unity
[3]: /es/getting_started/tagging/
[4]: https://www.newtonsoft.com/json/help/html/m_newtonsoft_json_jsonconvert_serializeobject.htm
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger