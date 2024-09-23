---
aliases:
- /es/real_user_monitoring/react-native/
- /es/real_user_monitoring/reactnative/
code_lang: reactnative
code_lang_weight: 40
description: Recopila datos de RUM de tus proyectos de React Native.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentación
  text: Configuración avanzada de RUM React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitorizar aplicaciones React Native
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentación
  text: Monitorizar aplicaciones híbridas de React Native
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
title: Configuración de monitorización de RUM React Native
type: multi-code-lang
---
## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de cada usuario de tu aplicación.

La versión mínima compatible con el SDK de RUM React Native es React Native v0.63.4+. La compatibilidad con versiones anteriores no está garantizada.

El SDK de RUM React Native es compatible con [Expo][12]. Para obtener más información, consulta la [documentación de Expo][13].

## Configuración

Para instalar con NPM, ejecuta:

```sh
npm install @datadog/mobile-react-native
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-native
```

### iOS

Instala el pod añadido:

```sh
(cd ios && pod install)
```

### Android

Si utilizas una versión de React Native estrictamente superior a 0.67, asegúrate de utilizar Java versión 17. Si utilizas una versión de React Native igual o inferior a 0.67, asegúrate de utilizar Java versión 11.

En tu archivo `android/build.gradle`, especifica la `kotlinVersion` para evitar conflictos entre las dependencias de kotlin:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

El SDK de React Native Datadog requiere que tengas `compileSdkVersion = 31` o posterior en la configuración de la aplicación de Android, lo que implica que debes usar Build Tools versión 31 o posterior, Android Gradle Plugin versión 7 y Gradle versión 7 o posterior. Para modificar las versiones, cambia los valores en el bloque `buildscript.ext` del archivo de nivel superior `build.gradle` de tu aplicación. Datadog recomienda utilizar una versión de React Native compatible activamente.

### Especificar los detalles de la aplicación en la interfaz de usuario

1. En Datadog, navega a [**Digital Experience** > **Add an Application**][1] (Experiencia digital > Añadir una aplicación).
2. Elige `react-native` como tipo de aplicación.
3. Proporciona un nombre de aplicación para generar un ID de aplicación de Datadog y un token de cliente únicos.
4. Para desactivar la recopilación automática de datos de usuario para la IP del cliente o los datos de geolocalización, desmarca las casillas de esos ajustes.

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Crear una aplicación RUM para React Native en Datadog" style="width:90%;">}}

Para asegurar la seguridad de tus datos, debes utilizar un token de cliente. Si solo utilizaras [claves de API de Datadog][3] para configurar las bibliotecas `@datadog/mobile-react-native`, estarían expuestos del lado del cliente en el código de la aplicación de React Native.

Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][4].

### Inicializar la biblioteca con el contexto de la aplicación

{{< site-region region="us" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US1';
// Opcional: activar o desactivar informes de fallos nativos
config.nativeCrashReportEnabled = true;
// Opcional: muestrar sesiones de RUM (en este ejemplo, el 80% de la sesión se envía a Datadog. Por defecto, es 100%).
config.sessionSamplingRate = 80;
// Opcional: muestrear integraciones de rastreo para llamadas de red entre tu aplicación y tu backend (en este ejemplo, el 80% de las llamadas a tu backend instrumentado están vinculadas desde la vista de RUM a la vista de APM. Por defecto, es 20%)
// Debes especificar los hosts de tus backends para activar el rastreo en ellos
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // hace coincidir 'example.com' y subdominios como 'api.example.com'
// Opcional: establecer el nombre de servicio informado (por defecto, utiliza el nombre de paquete o el bundleIdentifier de tu aplicación de Android o iOS respectivamente)
config.serviceName = 'com.example.reactnative';
// Opcional: deja los logs internos de impresión del SDK en el mismo nivel o uno superior al indicado. Por defecto no está definido, lo que significa que no hay logs
config.verbosity = SdkVerbosity.WARN;

//Encierra el contenido de tu componente de aplicación en un componente DatadogProvider, pasándolo a tu configuración:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Una vez inicializado el SDK de Datadog React Native para RUM, debes configurar el rastreo de la vista para poder ver los datos en el dashboard de RUM
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrear interacciones de usuario (como toques en botones).
    true, // rastrear recursos XHR
    true // rastrear errores
);
config.site = 'US3';
// Opcional: activar o desactivar informes de fallos nativos
config.nativeCrashReportEnabled = true;
// Opcional: muestrear sesiones de RUM (aquí, el 80% de la sesión se enviará a Datadog. Por defecto = 100%)
config.sessionSamplingRate = 80;
// Opcional: muestrear integraciones de rastreo para llamadas de red entre tu aplicación y tu backend (aquí, el 80% de las llamadas a tu backend instrumentado se vincularán desde la vista de RUM a la vista de APM. Por defecto = 20%)
// Debes especificar los hosts de tus backends para activar el rastreo de ellos
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // hace coincidir 'example.com' y los subdominios como 'api.example.com'

//Encierra el contenido de tu componente de aplicación en un componente DatadogProvider, pasándolo a tu configuración:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Una vez inicializado el SDK de Datadog React Native para RUM, debes configurar el rastreo de la vista para ver los datos en el dashboard de RUM
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrear interacciones de usuario (como toques en botones).
    true, // rastrear recursos XHR
    true // rastrear errores
);
config.site = 'US3';
// Opcional: activar o desactivar informes de fallos nativos
config.nativeCrashReportEnabled = true;
// Opcional: muestrear sesiones de RUM (aquí, el 80% de la sesión se enviará a Datadog. Por defecto = 100%)
config.sessionSamplingRate = 80;
// Opcional: muestrear integraciones de rastreo para llamadas de red entre tu aplicación y tu backend (aquí, el 80% de las llamadas a tu backend instrumentado se vincularán desde la vista de RUM a la vista de APM. Por defecto = 20%)
// Debes especificar los hosts de tus backends para activar el rastreo de ellos
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // hace coincidir 'example.com' y los subdominios como 'api.example.com'

//Encierra el contenido de tu componente de aplicación en un componente DatadogProvider, pasándolo a tu configuración:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Una vez inicializado el SDK de Datadog React Native para RUM, debes configurar el rastreo de la vista para ver los datos en el dashboard de RUM
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrear interacciones de usuario (como toques en botones).
    true, // rastrear recursos XHR
    true // rastrear errores
);
config.site = 'EU1';
// Opcional: activar o desactivar informes de fallos nativos
config.nativeCrashReportEnabled = true;
// Opcional: muestrear sesiones de RUM (aquí, el 80% de la sesión se enviará a Datadog. Por defecto = 100%)
config.sessionSamplingRate = 80;
// Opcional: muestrear integraciones de rastreo para llamadas de red entre tu aplicación y tu backend (aquí, el 80% de las llamadas a tu backend instrumentado se vincularán desde la vista de RUM a la vista de APM. Por defecto = 20%)
// Debes especificar los hosts de tus backends para activar el rastreo de ellos
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // hace coincidir 'example.com' y los subdominios como 'api.example.com'

//Encierra el contenido de tu componente de aplicación en un componente DatadogProvider, pasándolo a tu configuración:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Una vez inicializado el SDK de Datadog React Native para RUM, debes configurar el rastreo de la vista para ver los datos en el dashboard de RUM
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // rastrear interacciones de usuario (como toques en botones).
    true, // rastrear recursos XHR
    true // rastrear errores
);
config.site = 'US1_FED';
// Opcional: activar o desactivar informes de fallos nativos
config.nativeCrashReportEnabled = true;
// Opcional: muestrear sesiones de RUM (aquí, el 80% de la sesión se enviará a Datadog. Por defecto = 100%)
config.sessionSamplingRate = 80;
// Opcional: muestrear integraciones de rastreo para llamadas de red entre tu aplicación y tu backend (aquí, el 80% de las llamadas a tu backend instrumentado se vincularán desde la vista de RUM a la vista de APM. Por defecto = 20%)
// Debes especificar los hosts de tus backends para activar el rastreo de ellos
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // hace coincidir 'example.com' y los subdominios como 'api.example.com'

//Encierra el contenido de tu componente de aplicación en un componente DatadogProvider, pasándolo a tu configuración:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Una vez inicializado el SDK de Datadog React Native para RUM, debes configurar el rastreo de la vista para ver los datos en el dashboard de RUM
```

{{< /site-region >}}

### Muestrear sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una tasa de muestreo para las sesiones de RUM mientras [inicializas el SDK de RUM React Native][18] como un porcentaje entre 0 y 100. Puedes especificar la tasa con el parámetro `config.sessionSamplingRate`.

### Anular la versión informada

Por defecto, el SDK de Datadog React Native informa la `version` como la versión comercial de tu aplicación (por ejemplo, "1.2.44").

Si utilizas un proveedor de actualizaciones Over The Air (OTA) como CodePush de Microsoft, puedes anular esta versión para indicar qué versión de tu código de JavaScript se está ejecutando.

Datadog recomienda utilizar un `versionSuffix` en el objeto `DatadogProviderConfiguration`:

```js
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

config.versionSuffix = 'codepush.3';
```

Si la versión comercial de tu aplicación es "1.2.44", se indica como "1.2.44-codepush.3" en Datadog. Se añade automáticamente un guión (`-`) entre la versión y el sufijo.

También puedes anular completamente la versión especificando el campo `version`. Sin embargo, asegúrate de configurarlo correctamente, ya que debe coincidir con el especificado durante la carga de tus mapas de fuente y otros archivos de asignación.

Para más información sobre las limitaciones del campo Versión, consulta la [documentación de Etiquetas][15].

### Rastreo de las interacciones de los usuarios

Si el rastreo de las interacciones del usuario está activado como en el ejemplo de código anterior, el SDK de React Native Datadog recorre la jerarquía de componentes empezando por el componente que ha recibido un toque, buscando la propiedad `dd-action-name`. Una vez encontrada, se utiliza como nombre para la acción informada.

Alternativamente, puedes utilizar la propiedad de elemento `accessibilityLabel` para dar un nombre a la acción de toque; de lo contrario, se informa del tipo de elemento. Puedes consultar la aplicación de ejemplo para ver ejemplos de uso.

### Rastrear la navegación de la vista

Debido a que React Native ofrece una amplia gama de bibliotecas para crear la navegación en pantalla, solo el rastreo de vistas manual es compatible por defecto. Para ver cómo se completan las sesiones de RUM en Datadog, es necesario implementar el rastreo de vistas.

Puedes iniciar y detener manualmente una vista utilizando los siguientes métodos `startView()` y `stopView`.

```js
import {
DdRum
} from '@datadog/mobile-react-native';

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

Utiliza una de las integraciones de Datadog para realizar un rastreo automático de las visitas para las siguientes bibliotecas:

-   Si utilizas la biblioteca [`react-native-navigation`][5], añade el paquete `@datadog/mobile-react-native-navigation` y sigue las [instrucciones de configuración][6].
-   Si utilizas la biblioteca [`react-navigation`][7], añade el paquete `@datadog/mobile-react-navigation` y sigue las [instrucciones de configuración][8].

Si tienes algún problema para configurar el rastreo de vistas con `@datadog/mobile-react-navigation`, puedes consultar este [ejemplo de aplicación][16] de Datadog como referencia.

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En casos de zonas con baja conexión de red o cuando la carga de la batería del dispositivo es demasiado baja, todos los eventos de RUM se almacenan primero en el dispositivo local en lotes. Se envían tan pronto como la red esté disponible y la carga de la batería sea lo suficientemente alta como para asegurar que el SDK de React Native de RUM no afecte a la experiencia del usuario final. Si la red no está disponible cuando tu aplicación está ejecutándose en primer plano o si falla una carga de datos, el lote se conserva hasta que pueda enviarse correctamente.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Los datos del disco se eliminan automáticamente si se vuelven demasiado antiguos para garantizar que el SDK de React Native de RUM no utilice demasiado espacio del disco.


## Rastrear eventos en segundo plano

<div class="alert alert-info"><p>El rastreo de eventos en segundo plano puede dar lugar a sesiones adicionales, lo que puede afectar a la facturación. Si tienes dudas, <a href="https://docs.datadoghq.com/help/">contacta con el equipo de soporte de Datadog.</a></p>
</div>

Puedes realizar un rastreo de eventos, como fallos y solicitudes de red, cuando tu aplicación está en segundo plano (por ejemplo, cuando no hay ninguna vista activa).

Añade el siguiente fragmento durante la inicialización en tu configuración de Datadog:

```javascript
configuration.trackBackgroundEvents = true;
```

## Almacenamiento de datos

### Android

Antes de que el dato se suba a Datadog, se almacena en formato de texto en el directorio de la caché de tu aplicación. Esta carpeta de la caché está protegida por [Android's Application Sandbox][10], lo que significa que en la mayoría de los dispositivos estos datos no pueden ser leídos por otras aplicaciones. Sin embargo, si el dispositivo móvil está rooteado o alguien manipula el núcleo de Linux, los datos almacenados pueden llegar a ser legibles.

### iOS

Antes de que los datos se suban a Datadog, se almacenan en texto claro en el directorio de caché (`Library/Caches`) de tu [entorno de pruebas de la aplicación][11], que no puede ser leído por ninguna otra aplicación instalada en el dispositivo.

## Modo de desarrollo

Mientras está en modo de desarrollo, tu aplicación puede enviar eventos adicionales relacionados con las herramientas de React Native, como errores de transformación de código y solicitudes a un servidor de desarrollo local.

Para evitar que estos eventos se muestren en el dashboard, puedes desactivar el rastreo de errores y recursos en modo dev con el indicador `__DEV__`:

```js
const config = new DatadogProviderConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources será false en el modo DEV, sino será true */,
    !__DEV__  /* trackErrors será false en el modo DEV, sino será true */,
    trackingConsent
)
```

## Compatibilidad con nuevas arquitecturas

La [nueva arquitectura de React Native][17] es compatible con el SDK de RUM React Native en la versión `>=1.8.0`.

La versión mínima compatible de React Native para la nueva arquitectura es `0.71`.

## Solucionar problemas

### Utilización con `use_frameworks!`

Si tienes `use_frameworks!` habilitado en tu `Podfile`, ejecutar `pod install` después de añadir el SDK es probable que desencadene un error como éste:

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

Para evitar ese error, edita tu `Podfile` para instalar el pod del SDK de React Native como una biblioteca estática:

```ruby
static_libraries = ['DatadogSDKReactNative']

# Cambia los pods con dependencias estáticas a bibliotecas estáticas al sobreescribir la función static_framework? para que vuelva a true
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

**Nota**: Esta solución proviene de esta publicación de [StackOverflow][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: /es/real_user_monitoring/reactnative/integrated_libraries/
[7]: https://github.com/react-navigation/react-navigation
[8]: /es/real_user_monitoring/reactnative/integrated_libraries/
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: /es/real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[15]: /es/getting_started/tagging/#define-tags
[16]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[17]: https://reactnative.dev/docs/the-new-architecture/landing-page
[18]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/#initialize-the-library-with-application-context