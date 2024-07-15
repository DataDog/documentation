---
description: Recopila datos de logs de tus proyectos de Flutter.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente dd-sdk-flutter
- link: logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
kind: documentación
title: Recopilación de logs de Flutter
---
Envía logs a Datadog desde tus aplicaciones de Flutter con [el complemento de flutter de Datadog][1] y aprovecha las siguientes funciones:

* Loguear en Datadog en formato JSON de forma nativa.
* Utiliza los atributos predeterminados y añade atributos personalizados a cada log enviado.
* Registra las direcciones IP reales de los clientes y los Agents de usuario.
* Aprovecha el uso optimizado de red con publicaciones masivas automáticas.

## Configuración

Para inicializar el SDK de Datadog Flutter para logs, consulta [Configuración][2].

Una vez inicializado el SDK de Datadog Flutter con un parámetro `LoggingConfiguration`, puedes crear un `DatadogLogger` y enviar logs a Datadog.

```dart
final logConfiguration = DatadogLoggerConfiguration(
  remoteLogThreshold: LogLevel.debug,
  networkInfoEnabled: true,
);
final logger = DatadogSdk.instance.logs?.createLogger(logConfiguration);

logger?.debug("A debug message.");
logger?.info("Some relevant information?");
logger?.warn("An important warning...");
logger?.error("An error was met!");
```

También puedes crear registradores adicionales con diferentes servicios y nombres utilizando el método `createLogger`:

```dart
final myLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    service: 'com.example.custom_service',
    name: 'Additional logger'
  )
);

myLogger?.info('Info from my additional logger.');
```

Para obtener más información sobre las opciones de registro disponibles, consulta la [Documentación de clase DatadogLoggerConfiguration][3].

## Gestionar etiquetas (tags)

Las etiquetas establecidas en los registradores son locales para cada registrador.

### Añadir etiquetas

Utiliza el método `DatadogLogger.addTag` para añadir etiquetas a todos los logs enviados por un registrador específico:

```dart
// This adds a "build_configuration:debug" tag
logger.addTag("build_configuration", "debug")
```

### Eliminar etiquetas

Utiliza el método `DatadogLogger.removeTag` para eliminar etiquetas de todos los logs enviados por un registrador específico:

```dart
// This removes any tag that starts with "build_configuration"
logger.removeTag("build_configuration")
```

Para más información, consulta [Empezando con etiquetas][4].

## Gestionar atributos

Los atributos establecidos en los registradores son locales para cada registrador.

### Atributos predeterminados

Por defecto, los siguientes atributos se añaden a todos los logs enviados por un registrador:

* `http.useragent` y sus propiedades extraídas `device` y `OS` 
* `network.client.ip` y sus propiedades geográficas extraídas (`country`, `city`)
* `logger.version`, versión del SDK de Datadog
* `logger.thread_name`, (`main`, `background`)
* `version`, la versión de la aplicación del cliente extraída de `Info.plist` o de `application.manifest`
* `environment`, el nombre de entorno utilizado para inicializar el SDK

### Añadir atributos

Utiliza el método `DatadogLogger.addAttribute` para añadir un atributo personalizado a todos los logs enviados por un registrador específico:

```dart
logger.addAttribute("user-status", "unregistered")
```

El `value` puede ser de la mayoría de los tipos admitidos por la [clase `StandardMessageCodec`][5].

### Eliminar atributos

Utiliza el método `DatadogLogger.removeAttribute` para eliminar un atributo personalizado de todos los logs enviados por un registrador específico:

```dart
// This removes the attribute "user-status" from all logs sent moving forward.
logger.removeAttribute("user-status")
```

## Personalización de la salida de log

Por defecto, para las compilaciones de depuración, `DatadogLogger` imprime todos logs en la consola de Flutter en el formato:
```
[{level}] message
```

Esto se puede personalizar estableciendo una `DatadogLoggerConfiguration.customConsoleLogFunction`. Para filtrar logs por debajo de un determinado nivel, establece este valor en `simpleConsolePrintForLevel`:

```dart
final config = DatadogLoggerConfiguration(
  // Other configuration options...
  customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
);
```

También puedes reenviar logs de Datadog a otros paquetes de log, como [registrador][6], suministrando una función personalizada:

```dart
var Logger logger;
void customDatadogLog(LogLevel level,
  String message,
  String? errorMessage,
  String? errorKind,
  StackTrace? stackTrace,
  Map<String, Object?> attributes,) {
    // Assuming you have a Logger and custom level mapping function:
    logger.log(mapLogLevels(level), message, error: errorKind, stackTrace: stackTrace);
}

final datadogLogger = DatadogSdk.instance.logs?.createLogger(
  DatadogLoggerConfiguration(
    // Other configuration options...
    customConsoleLogFunction: simpleConsolePrintForLevel(LogLevel.warn),
  );
);
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogLoggerConfiguration-class.html
[4]: /es/getting_started/tagging/
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger