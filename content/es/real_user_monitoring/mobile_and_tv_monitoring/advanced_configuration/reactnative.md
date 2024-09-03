---
aliases:
- /es/real_user_monitoring/react-native/advanced_configuration/
- /es/real_user_monitoring/reactnative/advanced_configuration/
code_lang: reactnative
code_lang_weight: 40
description: Conoce las opciones de configuración avanzada para tu configuración de
  React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentación
  text: Más información sobre la monitorización de React Native
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentación
  text: Monitorizar aplicaciones híbridas de React Native
title: Configuración avanzada de RUM React Native
type: multi-code-lang
---

## Información general

Si aún no has configurado el SDK, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de React Native RUM][2].

## Hacer tests con Jest

Probar aplicaciones con `'@datadog/mobile-react-native'` puede requerir completar pasos adicionales, ya que los módulos nativos no existen en los entornos de test.

Datadog proporciona simulaciones para el paquete `'@datadog/mobile-react-native'`. Para utilizarlas con [Jest][4], añade lo siguiente en tu archivo de configuración de Jest:

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

El rastreo automatizado de interacciones, errores y recursos se desactiva en tus tests si inicializas el SDK con el componente `DatadogProvider`.

Todos los métodos del SDK son simulados por `jest.fn()`, por lo que puedes afirmar que se ha llamado a un método del SDK de Datadog:

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

Si utilizas un ejecutor de tests distinto de Jest, deberás crear las simulaciones para tu ejecutor de tests.

## Parámetros de inicialización

Puedes especificar los siguientes parámetros en tu configuración al inicializar el SDK:

`clientToken`
: obligatorio<br/>
**Tipo**: cadena<br/>
Un [token de cliente de Datadog][8].

`env`
: obligatorio<br/>
**Tipo**: cadena<br/>
El entorno de la aplicación, por ejemplo: prod, pre-prod y staging. Sigue los [requisitos de sintaxis de etiquetas][15].

`applicationId`
: Obligatorio<br/>
**Tipo**: Cadena<br/>
El ID de la aplicación de RUM.

`trackInteractions`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false` <br/>
Habilita la recopilación automática de acciones del usuario.

`trackResources`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false` <br/>
Habilita la recopilación de eventos de recursos.

`trackErrors`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false` <br/>
Habilita la recopilación de fallos de React Native.

`site`
: opcional<br/>
**Tipo**: cadena<br/>
**Predeterminado**: `US1`<br/>
[El parámetro del sitio de Datadog de tu organización][9].

`serviceName`
: opcional<br/>
**Tipo**: cadena<br/>
El nombre de servicio para tu aplicación. Sigue los [requisitos de sintaxis de etiquetas][15].

`version`
: opcional<br/>
**Tipo**: cadena<br/>
La versión de la aplicación. Por ejemplo: 1.2.3, 6c44da20 y 2020.02.13. Sigue los [requisitos de sintaxis de etiquetas][15].

`versionSuffix`
: opcional<br/>
**Tipo**: cadena<br/>
Añade un sufijo a la versión informada de la aplicación. Los caracteres aceptados son alfanuméricos y `_`, `-`, `:`, `.`, `/`. Otros caracteres especiales se convierten en guiones bajos. Un guion (`-`) se añade automáticamente entre la versión y el sufijo. Sigue los [requisitos de sintaxis de etiquetas][15].

`trackFrustrations`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `true` <br/>
Habilita [la recopilación automática de frustraciones del usuario][11]. Solo se admiten clic de error. Implica `trackInteractions: true`.

`nativeCrashReportEnabled`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false` <br/>
Activa el informe de fallos para plataformas nativas (iOS, Android).

`sampleRate`
: Opcional - **Obsoleto**<br/>
**Tipo**: número<br/>
**Predeterminado**: `100`<br/>
Consulta `sessionSampleRate`.

`sessionSampleRate`
: opcional<br/>
**Tipo**: número<br/>
**Predeterminado**: `100`<br/>
El porcentaje de sesiones a rastrear: `100` para todas, `0` para ninguna. Solo las sesiones rastreadas envían eventos de RUM.

`resourceTracingSamplingRate`
: opcional<br/>
**Tipo**: número<br/>
**Predeterminado**: `20`<br/>
El porcentaje de solicitudes a rastrear: `100` para todas, `0` para ninguna. Para más información, consulta [Conectar RUM y trazas][12].

`verbosity`
: opcional<br/>
**Tipo**: SdkVerbosity<br/>
**Predeterminado**: `undefined`<br/>
Definición ampulosa para el registro interno del SDK. Establecécelo en `SdkVerbosity.DEBUG` para depurar tu implementación del SDK.

`nativeViewTracking`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false`<br/>
Activa el rastreo de vistas nativas. Establécelo en `true` si utilizas un sistema de navegación personalizado basado en vistas nativas.

`nativeInteractionTracking`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false`<br/>
Habilita el rastreo de interacciones nativas. Establécelo en `true` si deseas realizar un rastreo de las interacciones en las pantallas nativas.

`firstPartyHosts`
: opcional<br/>
**Tipo**: lista<br/>
**Predeterminado**: `[]`<br/>
Lista de tus hosts de backends para habilitar el rastreo. Para obtener más información, consulta [Conectar RUM y trazas][12].

`telemetrySampleRate`
: Opcional<br/>
**Tipo**: número<br/>
**Predeterminado**: `20`<br/>
Se envían datos de telemetría (como errores y logs de depuración) sobre la ejecución de SDK a Datadog para detectar y solucionar posibles problemas. Establece esta opción en `0` si no quieres activar la recopilación de telemetría.

`longTaskThresholdMs`
: opcional<br/>
**Tipo**: número | false<br/>
**Predeterminado**: `0`<br/>
El umbral para el informe de tareas largas de JavaScript en milisegundos. Si se establece en `0` o `false`, se desactiva el informe de tareas largas de JavaScript. Los valores por debajo de `100` se elevan a `100`. Los valores por encima de `5000` se reducen a `5000`.

`nativeLongTaskThresholdMs`
: opcional<br/>
**Tipo**: número | false<br/>
**Predeterminado**: `200`<br/>
El umbral para el informe de tareas largas nativas en milisegundos. Si se establece en `0` o `false`, se desactiva el informe de tareas largas de JavaScript. Los valores por debajo de `100` se elevan a `100`. Los valores por encima de `5000` se reducen a `5000`.

`vitalsUpdateFrequency`
: opcional<br/>
**Tipo**: VitalsUpdateFrequency<br/>
**Predeterminado**: `VitalsUpdateFrequency.AVERAGE`<br/>
Establece la frecuencia preferida para recopilar los signos vitales móviles.

`uploadFrequency`
: opcional<br/>
**Tipo**: UploadFrequency<br/>
**Predeterminado**: `UploadFrequency.AVERAGE`<br/>
Establece la frecuencia preferida para subir lotes de datos.

`batchSize`
: opcional<br/>
**Tipo**: BatchSize<br/>
**Predeterminado**: `BatchSize.MEDIUM`<br/>
Define la política del SDK de Datadog cuando se agrupan los datos por lotes antes de cargarlos en los servidores de Datadog. Los lotes más pequeños implican solicitudes de red más pequeñas pero más numerosas, mientras que los lotes más grandes implican solicitudes de red más grandes pero menos numerosas.

`trackBackgroundEvents`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false`<br/>
Habilita el rastreo de eventos RUM cuando no hay ninguna vista de RUM activa. Por defecto, no se realiza el rastreo de eventos en segundo plano. Activar esta característica puede aumentar el número de sesiones rastreadas y afectar a tu facturación.

`proxyConfig`
: opcional<br/>
**Tipo**: ProxyConfiguration<br/>
[Configuración de proxy][13] opcional.

`useAccessibilityLabel`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `true`<br/>
Determina si las etiquetas (labels) de accesibilidad se utilizan para nombrar las acciones de RUM (por defecto es true).

## Instrumentación manual

Si la instrumentación automática no se adapta a tus necesidades, puedes crear eventos y logs de RUM manualmente:

### Enviar logs
Cuando instrumentas tu código para enviar logs, puedes incluir detalles de depuración, información, advertencia o error:

```javascript
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});
```

### Rastreo manual de vistas de RUM
Para realizar un rastreo manual de las vistas de RUM, proporciona `view key`, `view name` y `action name` en la inicialización. Según tus necesidades, puedes elegir una de las siguientes estrategias:

```javascript
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//...
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());
```

### Rastreo manual de las acciones de RUM
Puedes realizar un rastreo manual de las acciones de RUM:

```javascript
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
```

Para rastrear una acción continua:

```javascript
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
//...
DdRum.stopAction({}, Date.now());
```

### Rastreo manual de errores de RUM
Puede realizar un rastreo manual de los errores de RUM:

```javascript
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());
```

### Rastreo manual de los recursos de RUM
Puedes realizar un rastreo manual de los recursos de RUM:

```javascript
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());
```

### Añadir tiempos personalizados
Puedes añadir tiempos personalizados:

```javascript
DdRum.addTiming('<timing-name>');
```

### Enviar manualmente tramos
Puedes enviar tramos (spans) manualmente:

```javascript
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## Rastrear atributos globales personalizados

Puedes adjuntar información de usuario a todos los eventos de RUM para obtener información más detallada de tus sesiones de RUM.

### Información para el usuario

Para obtener información específica del usuario, utiliza el siguiente código en el lugar que desees de tu aplicación (una vez inicializado el SDK). Los atributos `id`, `name` y `email` están integrados en Datadog, y puedes añadir otros atributos que tengan sentido para tu aplicación.

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

Si deseas borrar la información del usuario (por ejemplo, cuando el usuario cierra la sesión), puedes hacerlo pasando un objeto vacío, como se indica a continuación:

```js
DdSdkReactNative.setUser({});
```

### Atributos globales

También puedes mantener atributos globales para rastrear información sobre una sesión específica, como la configuración de tests A/B, el origen de la campaña publicitaria o el estado del carrito.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## Modificar o descartar eventos de RUM

Para modificar los atributos de un evento de RUM antes de que se envíe a Datadog, o para eliminar un evento por completo, utiliza la API de asignadores de evento al configurar el SDK de RUM React Native:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrear interacciones de usuario (como clics en botones)
    true, // rastrear recursos XHR
    true // rastrear errores
);
config.logEventMapper = (event) => event;
config.errorEventMapper = (event) => event;
config.resourceEventMapper = (event) => event;
config.actionEventMapper = (event) => event;
```

Cada asignador es una función con una firma de `(T) -> T?`, donde `T` es un tipo concreto de evento de RUM. Esto permite cambiar partes de evento antes de que se envíe, o eliminar evento por completo.

Por ejemplo, para redactar información confidencial de un error de RUM `message`, implementa una función `redacted` personalizada y utilízala en `errorEventMapper`:

```javascript
config.errorEventMapper = (event) => {
    event.message = redacted(event.message);
    return event;
};
```

Si se devuelve `null` desde el asignador de errores, recursos o acciones, se elimina por completo el evento; el evento no se envía a Datadog.

En función del tipo de evento, solo pueden modificarse algunas propiedades específicas:

| Tipo de evento    | Clave de atributo            | Descripción                        |
| ------------- | ------------------------ | ---------------------------------- |
| LogEvent      | `logEvent.message`       | Mensaje del log.                |
|               | `logEvent.context`       | Atributos personalizados del log.      |
| ActionEvent   | `actionEvent.context`    | Atributos personalizados de la acción.   |
| ErrorEvent    | `errorEvent.message`     | Mensaje de error.                     |
|               | `errorEvent.source`      | Fuente del error.               |
|               | `errorEvent.stacktrace`  | Stack trace del error.           |
|               | `errorEvent.context`     | Atributos personalizados del error.    |
|               | `errorEvent.timestampMs` | Marca temporal del error.            |
| ResourceEvent | `resourceEvent.context`  | Atributos personalizados del recurso. |

Los eventos incluyen contexto adicional:

| Tipo de evento    | Clave de atributo de contexto                            | Descripción                                                             |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| LogEvent      | `logEvent.additionalInformation.userInfo`        | Contiene la información global del usuario establecida por `DdSdkReactNative.setUser`.        |
|               | `logEvent.additionalInformation.attributes`      | Contiene los atributos globales establecidos por `DdSdkReactNative.setAttributes`. |
| ActionEvent   | `actionEvent.actionContext`                      | [GestureResponderEvent][5] correspondiente a la acción o `undefined`.  |
|               | `actionEvent.additionalInformation.userInfo`     | Contiene la información global del usuario establecida por `DdSdkReactNative.setUser`.        |
|               | `actionEvent.additionalInformation.attributes`   | Contiene los atributos globales establecidos por `DdSdkReactNative.setAttributes`. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | Contiene la información global del usuario establecida por `DdSdkReactNative.setUser`.        |
|               | `errorEvent.additionalInformation.attributes`    | Contiene los atributos globales establecidos por `DdSdkReactNative.setAttributes`. |
| ResourceEvent | `resourceEvent.resourceContext`                  | [XMLHttpRequest][6] correspondiente al recurso o `undefined`.       |
|               | `resourceEvent.additionalInformation.userInfo`   | Contiene la información global del usuario establecida por `DdSdkReactNative.setUser`.        |
|               | `resourceEvent.additionalInformation.attributes` | Contiene los atributos globales establecidos por `DdSdkReactNative.setAttributes`. |

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar posteriormente la sesión de usuario en Datadog.

Puedes acceder al identificador de sesión RUM en tiempo de ejecución sin esperar al evento `sessionStarted`:

```kotlin
   fun getCurrentSessionId(promise: Promise) {
       datadog.getRumMonitor().getCurrentSessionId {
           promise.resolve(it)
        }
    }
```

## Tiempos de los recursos

El rastreo de los recursos proporciona los siguientes tiempos:

-   `First Byte`: el tiempo transcurrido entre la solicitud programada y el primer byte de la respuesta. Incluye el tiempo de preparación de la solicitud a nivel nativo, la latencia de red y el tiempo que tardó el servidor en preparar la respuesta.
-   `Download`: el tiempo que se tardó en recibir una respuesta.

## Inicialización asíncrona

Si tu aplicación incluye muchas animaciones al iniciarse, ejecutar código durante estas animaciones podría retrasarlas en algunos dispositivos. Para retrasar la ejecución del SDK de Datadog React Native para RUM después de que se inicien todas las animaciones actuales, establece `initializationMode` en `InitializationMode.ASYNC` en tu configuración:

```js
import { DatadogProvider, DatadogProviderConfiguration, InitializationMode } from '@datadog/mobile-react-native';

const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);
datadogConfiguration.initializationMode = InitializationMode.ASYNC;

export default function App() {
    return (
        <DatadogProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogProvider>
    );
}
```

Esto utiliza [InteractionManager.runAfterInteractions][3] de React Native para retrasar las animaciones.

Todas las interacciones con el SDK de RUM (rastreo de vistas, acciones, rastreo de recursos, etc.) se siguen registrando y se mantienen en una cola con un límite de 100 eventos.

Los logs no se registran y llamar a un método `DdLogs` antes de la inicialización real podría romper el registro.

Si tienes algún problema para configurar la inicialización asíncrona de Datadog, puedes consultar nuestra [aplicación de ejemplo][7].

## Retrasar la inicialización

Puede haber situaciones en las que desees esperar antes de inicializar el SDK. Por ejemplo, si deseas utilizar una configuración diferente según la función del usuario o si deseas obtener la configuración de uno de tus servidores.

En ese caso, puedes instrumentar automáticamente tu aplicación desde el principio (recopilar automáticamente interacciones de usuario, recursos XHR y errores) y registrar hasta 100 eventos de RUM y tramos antes de inicializar el SDK.

```js
import { DatadogProvider, DatadogProviderConfiguration } from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // Toma la configuración de uno de tus servidores
    await DatadogProvider.initialize(configuration);
};

export default function App() {
    useEffect(() => initializeApp(), []);

    return (
        <DatadogProvider configuration={datadogAutoInstrumentation}>
            <Navigation />
        </DatadogProvider>
    );
}
```

Donde tu configuración tiene las siguientes claves:

```js
import { ProxyConfig, SdkVerbosity, TrackingConsent } from '@datadog/mobile-react-native';

const configuration = {
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENVIRONMENT_NAME>',
    applicationId: '<RUM_APPLICATION_ID>',
    sessionSamplingRate: 80, // Opcional: sesiones de RUM de ejemplo (aquí, el 80% de la sesión se enviará a Datadog). Predeterminado = 100%
    site: 'US1', // Optional: specify Datadog site. Default = 'US1'
    verbosity: SdkVerbosity.WARN, // Opcional: deja que el SDK imprima logs internos (en un nivel superior o igual al proporcionado). Predeterminado = undefined (no logs)
    serviceName: 'com.myapp', // Opcional: establece el nombre de servicio informado. Predeterminado = package name / bundleIdentifier of your Android / iOS app respectively
    nativeCrashReportEnabled: true, // Opcional: activa informes de fallos nativos. Predefinido = false
    version: '1.0.0', // Opcional: consulta cómo sobreescribir la versión informada en la documentación. Predeterminado = VersionName / Version of your Android / iOS app respectively
    versionSuffix: 'codepush.v3', // Opcional: consulta cómo sobreescribir la versión informada en la documentación. Predeterminado = undefined
    trackingConsent: TrackingConsent.GRANTED, // Opcional: desactiva la recopilación si el usuario no ha aceptado el rastreo. Predeterminado = TrackingConsent.GRANTED
    nativeViewTracking: true, // Opcional: activa el rastreo de vistas nativas. Predeterminado = false
    proxyConfig: new ProxyConfig() // Opcional: envía solicitudes mediante un proxy. Predeterminado = undefined
};
```

## Monitorizar aplicaciones híbridas de React Native

Consulta [Monitorizar aplicaciones híbridas de React Native][16].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[8]: /es/account_management/api-app-keys/#client-tokens
[9]: /es/getting_started/site/
[11]: /es/real_user_monitoring/browser/frustration_signals/
[12]: /es/real_user_monitoring/platform/connect_rum_and_traces?tab=reactnativerum
[13]: /es/real_user_monitoring/guide/proxy-mobile-rum-data/
[15]: /es/getting_started/tagging/#define-tags
[16]: /es/real_user_monitoring/guide/monitor-hybrid-react-native-applications