---
code_lang: expo
code_lang_weight: 30
description: Configura Error Tracking y los informes de fallos de las aplicaciones
  móviles de Expo en Datadog"
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Para depurar los fallos de Android de forma más rápida con Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Para depurar los fallos de iOS de forma más eficaz con Datadog
- link: /error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
- link: /error_tracking/explorer
  tag: Documentación
  text: Visualizar los datos de Error Tracking en el Explorer
title: Notificación de fallos y seguimiento de errores de Expo
type: lenguaje de código múltiple
---

## Información general

Activa Expo Crash Reporting y Error Tracking para obtener informes exhaustivos de fallos y tendencias de errores para tus aplicaciones móviles de Expo.

Con esta función, puedes acceder a:

-   Dashboards y atributos de fallos agregados Expo
-   Informes de fallos de iOS simbolizados y de Android desofuscados
-   Análisis de tendencias con el seguimiento de errores de Expo

Para simbolizar los stack traces y desenmascarar los bloqueos de Android, carga los archivos `.dSYM`, los archivos de asignación de Proguard y los mapas fuente en Datadog mediante el complemento de configuración `expo-datadog`.

Los símbolos de depuración se utilizan para desenmascarar stack traces, lo que ayuda a depurar errores. Con un ID de compilación único que se genera, Datadog hace coincidir automáticamente los stack traces correctos con los símbolos de depuración correspondientes. Esto garantiza que, independientemente de cuándo se hayan cargado los símbolos de depuración (ya sea durante las compilaciones de preproducción o de producción), se disponga de la información correcta para un control de calidad eficaz al revisar los fallos y errores notificados en Datadog.

**Nota:** Error Tracking puede utilizarse como producto independiente o junto con [Real User Monitoring (RUM)][12]. Si utilizas RUM, Error Tracking ya está incluido. Consulta la [Documentación de configuración de RUM Expo][3] para la configuración específica de RUM.

Tus informes de bloqueos aparecen en [**Error Tracking**][1].

## Configuración

### Paso 1: Instalar paquetes

Instala los paquetes necesarios para Expo Error Tracking:

{{< tabs >}}
{{% tab "NPM" %}}
```sh
npm install expo-datadog @datadog/mobile-react-native
npm install @datadog/datadog-ci --save-dev
```
{{% /tab %}}

{{% tab "Yarn" %}}
```sh
yarn add expo-datadog @datadog/mobile-react-native
yarn add -D @datadog/datadog-ci
```
{{% /tab %}}
{{< /tabs >}}

### Paso 2: Navegación del seguimiento de vistas

Para que las sesiones de Error Tracking aparezcan en Datadog, debes implementar el seguimiento de vistas, que puede inicializarse manual o automáticamente.

#### Rastreo manual

Puedes iniciar y detener manualmente una vista utilizando los siguientes métodos `startView()` y `stopView()`:

```js
import { DdRum } from 'expo-datadog';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

#### Rastreo automático

El rastreo automático de vistas es compatible con los siguientes módulos:

- Navegación de React: [@Datadog/mobile-react-navigation][7]
- Navegación de React Native: [@Datadog/mobile-react-native-navigation][8]

Ejemplo con React Navigation:

```tsx
<NavigationContainer
  ref={navigationRef}
  onReady={() => {
    DdRumReactNavigationTracking.startTrackingViews(
      navigationRef.current,
    );
  }}>
```

### Paso 3: Inicializar el kit de desarrollo de software (SDK)

Añade el siguiente código a tu archivo de inicialización para configurar Error Tracking:

```js
import { CoreConfiguration } from 'expo-datadog';

const config = new CoreConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
        site: 'US1', // Optional: Select your Datadog website ("US1", "US3", "US5", "EU1", or "US1_FED"). Default is "US1".
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>', // RUM Application ID
            trackInteractions: true, // Track user interactions (set to false if using Error Tracking only)
            trackResources: true, // Track XHR resources (set to false if using Error Tracking only)
            trackErrors: true, // Track errors
            sessionSampleRate: 80, // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
            nativeCrashReportEnabled: true // Optional: Enable or disable native crash reports.
        },
        logsConfiguration: {}, // Enable Logs
        traceConfiguration: {} // Enable Traces
    }
)

await DdSdkReactNative.initialize(config);
```

**Nota:** Si estás utilizando Error Tracking como producto independiente sin RUM, puedes establecer los parámetros de interacción del usuario y seguimiento de recursos XHR en `false`. Sin embargo, el paso 2 de seguimiento de vistas sigue siendo necesario para que se creen sesiones de Error Tracking.

### Paso 4: Configurar el complemento de Expo

Añade `expo-datadog` a tus complementos en el archivo `app.json`:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

Este complemento carga automáticamente dSYM, mapas fuente y archivos de mapas Proguard en cada compilación de EAS.

#### Opciones de configuración del complemento

Puedes personalizar el comportamiento del complemento con estas opciones:

| Parámetro                     | Valor predeterminado | Descripción                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Permite la carga de archivos dSYMS para la simbolización de fallos nativos de iOS.                                                  |
| `iosSourcemaps`               | `true`  | Habilita la carga de mapas de origen JavaScript en compilaciones de iOS.                                                                     |
| `androidSourcemaps`           | `true`  | Habilita la carga de mapas de origen JavaScript en compilaciones de Android.                                                                 |
| `androidProguardMappingFiles` | `true`  | Habilita la carga de archivos de asignación Proguard para desofuscar fallos nativos de Android (sólo se aplica si la ofuscación está habilitada). |
| `datadogGradlePluginVersion`  | `"1.+"` | Versión de `dd-sdk-android-gradle-plugin` utilizada para cargar los archivos de asignación Proguard.     |

Ejemplo con configuración personalizada:

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": true,
                        "iosSourcemaps": true,
                        "androidSourcemaps": true,
                        "androidProguardMappingFiles": true
                    }
                }
            ]
        ]
    }
}
```

### Paso 5: Configurar los secretos de EAS

Los secretos de Expo Application Services (EAS) son variables de entorno seguras que almacenan información confidencial como claves de API para tus compilaciones de Expo. Ejecuta `eas secret:create` para configurar tus credenciales de Datadog:

```sh
# Set your Datadog API key
eas secret:create --scope project --name DATADOG_API_KEY --value <YOUR_API_KEY>

# Set your Datadog site (optional, defaults to datadoghq.com)
eas secret:create --scope project --name DATADOG_SITE --value datadoghq.eu
```

### Paso 6: Configurar los mapas fuente para una simbología precisa

#### Opción A: Utiliza el complemento de Datadog Metro (recomendado)

Partiendo de `@datadog/mobile-react-native@2.10.0` y `@datadog/datadog-ci@v3.13.0`, añade el complemento de Datadog Metro a tu `metro.config.js`:

```js
const { getDatadogExpoConfig } = require("@datadog/mobile-react-native/metro");
const config = getDatadogExpoConfig(__dirname);
module.exports = config;
```

#### Opción B: Inyección manual de ID de depuración

Alternativamente, utiliza el comando `datadog-ci react-native inject-debug-id` para adjuntar manualmente un ID de depuración único a tu paquete de aplicaciones y mapa fuente. Consulta la [documentación del comando][5] para obtener instrucciones de uso.

### Paso 7: Añadir datos del repositorio git (solo EAS)

Si utilizas EAS para crear tu aplicación Expo, establece `cli.requireCommit` en `true` en tu archivo `eas.json` para añadir los datos del repositorio git a tus archivos de asignación:

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

## Para test tu implementación

Para verificar la configuración de Expo Error Tracking, debes emitir un error en tu aplicación y confirmar que el error aparece en Datadog.

Para test tu implementación

1. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
2. Ejecuta un código que contenga un error o bloqueo. Por ejemplo:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][1].
4. Para los fallos, después de que se produzcan, reinicia tu aplicación y espera a que el SDK de React Native cargue el informe del fallo en [**Rastreo de errores**][1].

Para asegurarse de que tus mapas fuente se envían y enlazan correctamente con tu aplicación, también puedes generar colisiones con el paquete [`react-native-performance-limiter`][6].

Instálalo con yarn o npm y luego vuelve a instalar tus pods:

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

Genera un fallo en el subproceso de JavaScript desde tu aplicación:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Vuelve a compilar tu aplicación para la versión para enviar los nuevos mapas fuente, desencadenar el fallo y esperar en la página [Error Tracking][1] que aparezca el error.

Para probar la carga de tus archivos dSYM y de asignación Proguard, genera un fallo en el subproceso principal nativo:

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## Expo Go

Si estás utilizando Expo Go, cambia a las compilaciones de desarrollo (recomendado) o sigue utilizando Expo Go sin Datadog, mientras lo ejecutas en tu aplicación independiente (no recomendado).

### Cambia de Expo Go a las compilaciones de desarrollo

Las [compilaciones de desarrollo][9] de tu aplicación son compilaciones de depuración que contienen el paquete `expo-dev-client`.

1. Habilita el [código nativo personalizado para ejecutar][10] con `expo run:android` y `expo run:ios`.
2. Para empezar a utilizar tu aplicación de desarrollo, ejecuta `expo install expo-dev-client` y `expo start --dev-client`. Se instala y se inicia el [paquete `expo-dev-client`][11] para ejecutar el código nativo añadido en el modo de desarrollador.

### Desarrollar con Expo Go

Cuando tu aplicación se ejecuta dentro de Expo Go, no puedes añadir ningún código nativo personalizado que no forme parte de la aplicación Expo Go. Dado que el kit de desarrollo de software (SDK) de React Native depende de cierto código nativo personalizado para ejecutarse, puedes desarrollar tu aplicación dentro de Expo Go sin Datadog y utilizar Datadog en tus compilaciones independientes.

Tu aplicación se bloquea en Expo Go cuando se llama a algún código nativo (que no está incluido). Para utilizar Datadog con tu aplicación independiente y seguir utilizando Expo Go en el desarrollo, añade el siguiente archivo TypeScript a tu proyecto:

```typescript
// mockDatadog.ts
// Datadog does not recommend this approach, consider moving to Expo development builds instead.
// This file is not officially maintained and might not be up-to-date with new releases.

import { DdLogs, DdTrace, DdRum, DdSdkReactNative } from 'expo-datadog';

if (__DEV__) {
    const emptyAsyncFunction = () => new Promise<void>(resolve => resolve());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        new Promise<string>(resolve => resolve('fakeSpanId'));
    DdTrace.finishSpan = emptyAsyncFunction;
    DdRum.startView = emptyAsyncFunction;
    DdRum.stopView = emptyAsyncFunction;
    DdRum.startAction = emptyAsyncFunction;
    DdRum.stopAction = emptyAsyncFunction;
    DdRum.addAction = emptyAsyncFunction;
    DdRum.startResource = emptyAsyncFunction;
    DdRum.stopResource = emptyAsyncFunction;
    DdRum.addError = emptyAsyncFunction;
    DdRum.addTiming = emptyAsyncFunction;

    DdSdkReactNative.initialize = emptyAsyncFunction;
    DdSdkReactNative.setUserInfo = emptyAsyncFunction;
    DdSdkReactNative.clearUserInfo = emptyAsyncFunction;
    DdSdkReactNative.addUserExtraInfo = emptyAsyncFunction;
    DdSdkReactNative.clearAllData = emptyAsyncFunction;
    DdSdkReactNative.addAttributes = emptyAsyncFunction;
    DdSdkReactNative.removeAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
    DdSdkReactNative.setAccountInfo = emptyAsyncFunction;
    DdSdkReactNative.addAccountExtraInfo = emptyAsyncFunction;
    DdSdkReactNative.clearAccountInfo = emptyAsyncFunction;
}
```

A continuación, impórtalo antes de inicializar el SDK de React Native de Datadog:

```typescript
import './mockDatadog';
import { CoreConfiguration, DdSdkReactNative } from 'expo-datadog';

const config = new CoreConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## Opciones de configuración adicionales

{{% collapse-content title="Desactivar las cargas de archivos" level="h4" expanded=false id="disable-file-uploads" %}}

Puedes desactivar la carga de algunos archivos estableciendo los parámetros `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles`, o `androidSourcemaps` en `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

Si quieres deshabilitar **cualquier carga de archivos**, elimina `expo-datadog` de la lista de complementos.

{{% /collapse-content %}}

{{% collapse-content title="Lista de mapas fuente cargados" level="h4" expanded=false id="list-uploaded-source-maps" %}}

Para verificar que tus mapas fuente, dSYMs y archivos de asignación Proguard se han cargado correctamente y están disponibles para la simbolización, puedes hacer una lista de todos los símbolos de depuración cargados.

Consulta la página [Símbolos de depuración de RUM][13] para ver todos los símbolos cargados.

{{% /collapse-content %}}

{{% collapse-content title="Especifica una versión de lanzamiento personalizada" level="h4" expanded=false id="specify-custom-release-version" %}}

Utiliza la variable de entorno `DATADOG_RELEASE_VERSION` para especificar una versión diferente para tus mapas fuente, a partir de `@datadog/mobile-react-native@2.3.5` y `@datadog/datadog-ci@v2.37.0`.

Cuando el SDK se inicializa con un sufijo de versión, debes anular manualmente la versión de lanzamiento para que el mapa fuente y las versiones de compilación coincidan.

{{% /collapse-content %}}

{{% collapse-content title="Usar Expo con Datadog y Sentry" level="h4" expanded=false id="use-expo-with-datadog-sentry" %}}

Los complementos de configuración de Datadog y Sentry utilizan expresiones regulares para modificar la fase de compilación de iOS "Empaquetar código e imágenes React Native" para enviar el mapa fuente. Esto puede hacer que las compilaciones de EAS fallen con un error `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context`.

Para utilizar ambos complementos, asegúrate de añadir el complemento `expo-datadog` primero en orden en tu archivo `app.json`:

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

Si estás utilizando `expo-dev-client` y ya tienes el complemento `expo-datadog`, revierte sus cambios en el archivo `project.pbxproj` antes de añadir `sentry-expo` y ejecutar `npx expo prebuild` con ambos complementos.

{{% /collapse-content %}}

{{% collapse-content title="Comprobar los límites de tamaño de los archivos del mapa fuente" level="h4" expanded=false id="check-source-map-size" %}}

El tamaño de los mapas fuente y los archivos de mapas está limitado a **500 MB** cada uno, mientras que los archivos dSYM pueden llegar a **2 GB** cada uno.

Para calcular el tamaño de los mapas de origen y del paquete, ejecuta el siguiente comando:

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

Si aún no existe un directorio `build`, créalo primero ejecutando `mkdir build` y, a continuación, ejecuta el comando anterior.

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
[4]: https://app.datadoghq.com/source-code/setup/rum
[5]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#inject-debug-id
[6]: https://www.npmjs.com/package/react-native-performance-limiter
[7]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[8]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[9]: https://docs.expo.dev/development/introduction/
[10]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[11]: https://docs.expo.dev/development/getting-started/
[12]: /es/real_user_monitoring/
[13]: https://app.datadoghq.com/source-code/setup/rum