---
aliases:
- /es/real_user_monitoring/reactnative/expo/
- /es/real_user_monitoring/reactnative-expo/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/expo
code_lang: expo
code_lang_weight: 2
description: Monitoriza tus proyectos de React Native utilizando Expo y Expo Go con
  Datadog.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration
  tag: Documentación
  text: Configuración avanzada de RUM React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitorizar aplicaciones React Native
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
title: Expo Setup
type: lenguaje de código múltiple
---

## Información general

En esta page (página), se describe cómo instrumentar tus aplicaciones para [Real User Monitoring (RUM)][1] y para [Error Tracking][2] con el kit de desarrollo de software (SDK) de React Native. Puedes seguir los siguientes steps (UI) / pasos (generic) para instrumentar tus aplicaciones para RUM (incluye Error Tracking) o Error Tracking si lo has adquirido como producto independiente.

El SDK de React Native de RUM es compatible con Expo y Expo Go. Para utilizarlo, instala `expo-datadog` y `@datadog/mobile-react-native`.

`expo-datadog` es compatible con Expo a partir del SDK 45 y las versiones del complemento siguen las versiones de Expo. Por ejemplo, si utilizas Expo SDK 45, utiliza `expo-datadog` versión `45.x.x`. Datadog recomienda utilizar **Expo SDK 45** como versión mínima; las versiones anteriores pueden requerir pasos manuales.

Si tienes algún problema al configurar el kit de desarrollo de software (SDK) de Datadog con una aplicación Expo, puedes consultar nuestra [aplicación de ejemplo][3] como referencia.

## Configuración

Para instalar con NPM, ejecuta:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

Para instalar con Yarn, ejecuta:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

### Rastrear la navegación de la vista

Para ver las sesiones de RUM o Error Tracking poblar en Datadog, necesitas implementar el rastreo de vistas, que puede inicializarse manual o automáticamente.

#### Rastreo manual

Puedes iniciar y detener manualmente una vista utilizando los siguientes métodos `startView()` y `stopView()`.

```js
import {
    DdRum
} from 'expo-datadog';

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

### Rastreo automático

El rastreo automático de vistas es compatible con los siguientes módulos:

- React Navigation: [@Datadog/mobile-react-navigation][10]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][11]

En este proyecto de ejemplo de Datadog, el rastreo de la vista se consigue a través de `@datadog/mobile-react-navigation` y se configura utilizando el `NavigationContainer`:

```tsx
<NavigationContainer
          ref={navigationRef}
          onReady={() => {
            DdRumReactNavigationTracking.startTrackingViews(
              navigationRef.current,
            );
          }}>
```

## Utilización

### Inicializar la biblioteca con el contexto de la aplicación

Añade el siguiente fragmento de código a tu archivo de inicialización:

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions such as tapping on a button. You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported.
    true, // track XHR resources.
    true // track errors.
);
// Optional: Select your Datadog website ("US1", "US3", "US5", "EU1", or "US1_FED"). Default is "US1".
config.site = 'US1';
// Optional: Enable or disable native crash reports.
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend, for example: 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%.
// You need to specify the hosts of your backends to enable tracing with these backends.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // Matches 'example.com' and subdomains like 'api.example.com'.
// Optional: Let the Datadog SDK print internal logs above or equal to the provided level. Default is undefined, which means no logs.
config.verbosity = SdkVerbosity.WARN;

await DdSdkReactNative.initialize(config);

// Once the Datadog SDK is initialized, you need to setup view tracking in order to see data in the RUM dashboard.
```

#### Tarifas de las sesiones de ejemplo

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una tasa de muestreo para las sesiones de RUM mientras [inicializas el kit de desarrollo de software (SDK) de Expo][4]. Para configurar esta tasa, utiliza el parámetro `config.sessionSamplingRate` y especifica un porcentaje entre 0 y 100.

### Cargar mapas fuente en las compilaciones de EAS

<div class="alert alert-info"><p>Si no has activado el informe de bloqueos, puedes omitir este paso.<p></div>

Añade `expo-datadog` a tus complementos en el archivo `app.json`:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

Este complemento se encarga de cargar los dSYM, los mapas fuente y los archivos de asignación de Proguard en cada compilación de EAS.

Añade `@datadog/datadog-ci` como dependencia de desarrollo. Este paquete contiene scripts para cargar los mapas fuente. Puedes instalarlo con NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

o con Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Ejecuta `eas secret:create` para configurar `DATADOG_API_KEY` en tu clave de la API de Datadog y `DATADOG_SITE` en el host de tu sitio Datadog (por ejemplo, `datadoghq.com`).

Para obtener información sobre el rastreo de los bloqueos de Expo, consulta [Informe de bloqueos de Expo y Rastreo de errores][5].

## Rastrear pantallas de Expo Router

Si utilizas [Expo Router][6], rastrea tus pantallas en tu archivo `app/_layout.js`:

```javascript
import { useEffect } from 'react';
import { usePathname, useSearchParams, useSegments, Slot } from 'expo-router';

export default function Layout() {
    const pathname = usePathname();
    const segments = useSegments();
    const viewKey = segments.join('/');

    useEffect(() => {
        DdRum.startView(viewKey, pathname);
    }, [viewKey, pathname]);

    // Export all the children routes in the most basic way.
    return <Slot />;
}
```

## Expo Go

Si estás utilizando Expo Go, cambia a las compilaciones de desarrollo (recomendado) o sigue utilizando Expo Go sin Datadog, mientras lo ejecutas en tu aplicación independiente (no recomendado).

### Cambia de Expo Go a las compilaciones de desarrollo

Las [compilaciones de desarrollo][7] de tu aplicación son compilaciones de depuración que contienen el paquete `expo-dev-client`.

1. Activa el [código nativo personalizado para ejecutar][8] con `expo run:android` y `expo run:ios`.
2. Para empezar a utilizar tu aplicación de desarrollo, ejecuta `expo install expo-dev-client` y `expo start --dev-client`. Se instala y se inicia el [paquete `expo-dev-client`][9] para ejecutar el código nativo añadido en el modo de desarrollador.

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
    DdSdkReactNative.setUser = emptyAsyncFunction;
    DdSdkReactNative.setAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
}
```

A continuación, impórtalo antes de inicializar el SDK de React Native de Datadog:

```typescript
import './mockDatadog';
import { DdSdkReactNative } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En caso de zonas con baja red, o cuando la batería del dispositivo está demasiado baja, todos los eventos se almacenan primero en el dispositivo local por lotes. 

Cada lote sigue la especificación de entrada. Se envían tan pronto como la red está disponible y la batería está lo suficientemente cargada como para garantizar que el SDK de Datadog no afecte la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano o si falla una carga de datos, el lote se conserva hasta que se lo pueda enviar con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato. Para garantizar que el SDK no utilice demasiado espacio de disco, los datos del disco se descartan automáticamente si son demasiado antiguos.

## Solucionar problemas

### La aplicación produce muchos recursos de /logs

Cuando el rastreo de recursos está activado y la verbosidad del kit de desarrollo de software (SDK) está configurada en `DEBUG`, cada recurso activa una llamada de `/logs` al servidor de desarrollo de Expo para imprimir el log, que a su vez crea un nuevo recurso de RUM y crea así un bucle infinito.
Los patrones más comunes de la URL del host del servidor de desarrollo de Expo se filtran con el SDK, por lo tanto, es posible que no te encuentres con este error en la mayoría de las situaciones.
Si se produce este error, añade el siguiente asignador de recursos para filtrar las llamadas:

```js
import { DdSdkReactNativeConfiguration } from 'expo-datadog';
import Constants from 'expo-constants';

const config = new DdSdkReactNativeConfiguration(/* your config */);
config.resourceEventMapper = event => {
  if (
    event.resourceContext?.responseURL ===
    `http://${Constants.expoConfig.hostUri}/logs`
  ) {
    return null;
  }
  return event;
};
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/error_tracking/
[3]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/expo#initialize-the-library-with-application-context
[5]: /es/real_user_monitoring/error_tracking/mobile/expo/
[6]: https://expo.github.io/router/docs/
[7]: https://docs.expo.dev/development/introduction/
[8]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[9]: https://docs.expo.dev/development/getting-started/
[10]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[11]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation