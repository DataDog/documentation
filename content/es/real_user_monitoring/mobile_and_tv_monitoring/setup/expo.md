---
aliases:
- /es/real_user_monitoring/reactnative/expo/
- /es/real_user_monitoring/reactnative-expo/
code_lang: expo
code_lang_weight: 50
description: Monitoriza tus proyectos de React Native utilizando Expo y Expo Go con
  Datadog.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentación
  text: Configuración avanzada de RUM React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor de aplicaciones React Native
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprende a explorar tus datos de RUM
title: Configuración de RUM Expo
type: multi-code-lang
---

## Información general

El SDK de React Native de RUM es compatible con Expo y Expo Go. Para utilizarlo, instala `expo-datadog` y `@datadog/mobile-react-native`.

`expo-datadog` es compatible con Expo a partir del SDK 45 y las versiones del complemento siguen las versiones de Expo. Por ejemplo, si utilizas Expo SDK 45, utiliza `expo-datadog` versión `45.x.x`. Datadog recomienda utilizar **Expo SDK 45** como versión mínima; las versiones anteriores pueden requerir pasos manuales.

Si tienes algún problema al configurar el SDK de Datadog con una aplicación Expo, puedes consultar nuestra [aplicación de ejemplo][1] como referencia.

## Configurar

Para instalar con NPM, ejecuta:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

Para instalar con Yarn, ejecuta:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

### Rastrear la navegación de la vista

Para ver cómo las sesiones de RUM se rellenan en Datadog, es necesario implementar el rastreo de la vista, que se puede inicializar de forma manual o automática.

#### Rastreo manual

Puedes iniciar y detener manualmente una vista utilizando los siguientes métodos `startView()` y `stopview()`.

```js
importar {
    DdRum
} desde 'expo-Datadog';

// Iniciar una vista con un identificador único de la vista, un nombre personalizado de la vista y un objeto para adjuntar atributos adicionales a la vista
DdRum.startView(
    '<view-key>', // <view-key> tiene que ser único, por ejemplo puede ser ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Detiene una vista iniciada previamente con el mismo identificador único de la vista y un objeto para adjuntar atributos adicionales a la vista
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

#### Rastreo automático

El rastreo automático de la vista es compatible con los siguientes módulos:

- React Navigation: [@Datadog/mobile-react-navigation][2]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][3]

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

## Uso

### Inicializar la biblioteca con el contexto de la aplicación

Añade el siguiente fragmento de código a tu archivo de inicialización:

```js
importar { DdSdkReactNative, DdSdkReactNativeConfiguration } desde 'expo-Datadog';

const config = nueva DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrea las interacciones del usuario como tocar un botón. Puedes utilizar la propiedad del elemento 'accessibilityLabel' para dar un nombre a la acción de tocar, de lo contrario se informa del tipo de elemento.
    true, // rastrea recursos de XHR.
    true // rastrea errores.
);
// Opcional: Selecciona tu sitio web Datadog ("US1", "US3", "US5", EU1" o "US1_FED"). El valor predeterminado es "US1".
config.site = 'US1';
// Opcional: Activa o desactiva los informes de bloqueos nativos.
config.nativeCrashReportEnabled = true;
// Opcional: Muestrea sesiones de RUM, por ejemplo: un 80 % de las sesiones se envían a Datadog. El valor predeterminado es 100 %.
config.sessionSamplingRate = 80;
// Opcional: Muestrea las integraciones de rastreo para llamadas de red entre tu aplicación y tu backend, por ejemplo: el 80 % de las llamadas a tu backend instrumentado se vinculan desde la vista de RUM a la vista de APM. El valor predeterminado es 20 %.
// Necesitas especificar los hosts de tus backends para activar el rastreo con estos backends.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // Coincide con 'example.com' y subdominios como 'api.example.com'.
// Opcional: Deja que el SDK de Datadog imprima logs internos por encima o iguales al nivel proporcionado. El valor predeterminado es indefinido, lo que significa que no hay logs.
config.verbosity = SdkVerbosity.WARN;

esperar DdSdkReactNative.initialize(config);

// Una vez inicializado el SDK de Datadog, es necesario configurar el rastreo de la vista para ver los datos en el dashboard de RUM.
```

#### Muestrear sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una tasa de muestreo para las sesiones de RUM, mientras [inicializas el RUM Expo SDK][4] como un porcentaje entre 0 y 100. Para configurar esta tasa, utiliza el parámetro `config.sessionSamplingRate`. 

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

```JavaScript
importar { useEffect } desde 'react';
importar { usePathname, useSearchParams, useSegments, Slot } desde 'expo-router';

exportar la función predeterminada Layout() {
    const pathname = usePathname();
    const segmentos = useSegments();
    const viewKey = segments.join('/');

    useEffect(() => {
        DdRum.startView(viewKey, pathname);
    }, [viewKey, pathname]);

    // Exportar todas las rutas secundarias de la forma más básica.
    devolver <Slot />;
}
```

## Expo Go

Si estás utilizando Expo Go, cambia a las compilaciones de desarrollo (recomendado) o sigue utilizando Expo Go sin Datadog, mientras lo ejecutas en tu aplicación independiente (no recomendado).

### Cambia de Expo Go a las compilaciones de desarrollo

Las [compilaciones de desarrollo][7] de tu aplicación son compilaciones de depuración que contienen el paquete `expo-dev-client`.

1. Activa el [código nativo personalizado para ejecutar][8] con `expo run:android` y `expo run:ios`.
2. Para empezar a utilizar tu aplicación de desarrollo, ejecuta `expo install expo-dev-client` y `expo start --dev-client`. Se instala y se inicia el [paquete `expo-dev-client`][9] para ejecutar el código nativo añadido en el modo de desarrollador.

### Desarrollar con Expo Go

Cuando tu aplicación se ejecuta dentro de Expo Go, no puedes añadir ningún código nativo personalizado que no forme parte de la aplicación Expo Go. Debido a que el SDK de React Native de RUM depende de algún código nativo personalizado para ejecutarse, puedes desarrollar tu aplicación dentro de Expo Go sin Datadog y utilizar Datadog en tus compilaciones independientes.

Tu aplicación se bloquea en Expo Go cuando se llama a algún código nativo (que no está incluido). Para utilizar Datadog con tu aplicación independiente y seguir utilizando Expo Go en el desarrollo, añade el siguiente archivo TypeScript a tu proyecto:

```typescript
// mockDatadog.ts
// Datadog no recomienda este enfoque, considera pasar a las compilaciones de desarrollo de Expo en su lugar.
// Este archivo no se mantiene oficialmente y puede no estar actualizado con las nuevas versiones.

importar { DdLogs, DdTrace, DdRum, DdSdkReactNative } desde 'expo-Datadog';

si (__DEV__) {
    const emptyAsyncFunction = () => nueva Promise<void>(resolver => resolver());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        nuevo Promise<string>(resolver => resolver('fakeSpanId'));
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
importar './mockDatadog';
importar { DdSdkReactNative } desde 'expo-Datadog';

const config = nuevo DdSdkReactNativeConfiguration(/* tu configuración */);
DdSdkReactNative.initialize(config);
```

## Solucionar problemas

### La aplicación produce muchos recursos de Rum de /logs

Cuando el rastreo de recursos está activado y el nivel de detalle del SDK está configurado en `DEBUG`, cada recurso de RUM desencadena una llamada `/logs` al servidor del desarrollador de Expo para imprimir el log, que a su vez crea un nuevo recurso de RUM, lo cual crea un bucle infinito.
El SDK filtra los patrones más frecuentes de la URL del host del servidor del desarrollador de Expo, por lo tanto, es posible que no te encuentres con este error en la mayoría de las situaciones.
Si se produce este error, añade el siguiente asignador de recursos de RUM para filtrar las llamadas:

```js
importar { DdSdkReactNativeConfiguration } desde 'expo-Datadog';
importar Constants desde 'expo-constants';

const config = nuevo DdSdkReactNativeConfiguration(/* tu configuración */);
config.resourceEventMapper = evento => {
  si (
   event.resourceContext?.responseURL ===
   `http://${Constants.expoConfig.hostUri}/logs`
  ) {
    devolver nulo;
  }
  devolver evento;
};
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation
[2]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[3]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/expo#initialize-the-library-with-application-context
[5]: /es/real_user_monitoring/error_tracking/mobile/expo/
[6]: https://expo.github.io/router/docs/
[7]: https://docs.expo.dev/development/introduction/
[8]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[9]: https://docs.expo.dev/development/getting-started/