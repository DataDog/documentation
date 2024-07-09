---
description: Recopila logs desde tus aplicaciones de React Native Mobile.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente dd-sdk-reactnative
- link: logs/explorer
  tag: Documentación
  text: Aprende a explorar tus logs
title: Recopilación de logs de React Native
---

Envía logs a Datadog desde tus aplicaciones de React Native Mobile con [la biblioteca de registro del cliente `dd-sdk-reactnative` de Datadog][1] y aprovecha las siguientes características:

* Loguear en Datadog en formato JSON de forma nativa.
* Añadir `context` y atributos personalizados adicionales a cada log enviado.
* Reenviar excepciones capturadas de JavaScript.
* Registrar las direcciones IP reales de los clientes y los Agents de usuario.
* Uso optimizado de red con envíos masivos automáticos.

## Configuración

1. Instala el paquete `@datadog/mobile-react-native`

Para instalar con NPM, ejecuta:

```sh
   npm install @datadog/mobile-react-native
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-native
```

A continuación, instala el pod añadido:

```sh
(cd ios && pod install)
```

   Las versiones `1.0.0-rc5` y posteriores requieren que tengas `compileSdkVersion = 31` en la configuración de la aplicación de Android, lo que implica que debes utilizar Build Tools versión 31, Android Gradle Plugin versión 7 y Gradle versión 7 o posterior. Para modificar las versiones, cambia los valores del bloque `buildscript.ext` del archivo de nivel superior `build.gradle` de tu aplicación. Datadog recomienda utilizar la versión 0.67 o posterior de React Native.

2. Inicializa la biblioteca con el contexto de tu aplicación, el consentimiento de rastreo, y el [token de cliente de Datadog][2] y el ID de aplicación generados al crear una aplicación RUM en la interfaz de usuario de Datadog (consulta [Empezando con la recopilación de React Native RUM][6] para obtener más información). Por razones de seguridad, debes utilizar un token de cliente; no puedes utilizar [claves de API de Datadog][3] para configurar la biblioteca `dd-sdk-reactnative`, ya que estarían expuestas en el lado del cliente en la aplicación móvil. Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre tokens de cliente][2]. 
{{< site-region region="us" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US1';
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US3';
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US5';

await DdSdkReactNative.initialize(config);
```
{{< /site-region >}}
{{< site-region region="eu" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'EU1';
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US1_FED';
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'AP1';
```
{{< /site-region >}}


3. Importar el registrador de React Native:

   ```javascript
   import { DdLogs } from '@datadog/mobile-react-native';
   ```

4. Envía una entrada personalizada de log directamente a Datadog con una de las siguientes funciones:

    ```javascript
        DdLogs.debug('A debug message.', { customAttribute: 'something' })
        DdLogs.info('Some relevant information ?', { customCount: 42 })
        DdLogs.warn('An important warning...', {})
        DdLogs.error('An error was met!', {})
    ```

    **Nota**: Todos los métodos de registro pueden tener un objeto de contexto con atributos personalizados.

## Recopilación de lotes

Todos los logs se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación de admisión. Se envían en cuanto la red está disponible, y la batería tiene suficiente carga como para garantizar que el SDK de Datadog no afecte a la experiencia del usuario final. Si la red no está disponible mientras la aplicación está en primer plano, o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que aunque los usuarios abran tu aplicación estando desconectados, no se perderá ningún dato.

Los datos en disco se descartarán automáticamente si son demasiado antiguos para garantizar que el SDK no utilice demasiado espacio en disco.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/logs/processing/attributes_naming_convention/
[5]: /es/tagging/
[6]: /es/real_user_monitoring/reactnative/?tab=us