---
aliases:
- /es/real_user_monitoring/reactnative/codepush
- /es/real_user_monitoring/reactnative-codepush/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/codepush
- /es/real_user_monitoring/mobile_and_tv_monitoring/codepush/setup
code_lang: codepush
code_lang_weight: 3
description: Aprende a utilizar un módulo de React Native del lado del cliente para
  interactuar con Appcenter Codepush y Datadog.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentación
  text: Más información sobre la monitorización de React Native
title: Configuración de CodePush
type: multi-code-lang
---

## Información general

Habilita el informe de fallos y el rastreo de errores de React Native para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Cada vez que publiques una nueva versión de [CodePush][1] para tu aplicación React Native, deberás subir los mapas de fuente a Datadog para desminificar los errores.

Datadog recomienda utilizar `@datadog/mobile-react-native-code-push` en la aplicación y el comando [Datadog-ci][3] `react-native codepush` para cargar los mapas de fuente. Esto garantiza que `version` sea coherente tanto en los fallos informados como en los mapas de fuente cargados.

Si tienes algún problema al configurar el SDK de Datadog con codepush, puedes consultar nuestra [aplicación de ejemplo][6] como referencia.

## Configuración

Consulta los [pasos de instalación de la Monitorización de React Native][2] para instalar `@datadog/mobile-react-native`.

A continuación, instala `@datadog/mobile-react-native-code-push`.

Para instalar con NPM, ejecuta:

```sh
npm install @datadog/mobile-react-native-code-push
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-native-code-push
```

### Inicialización con DdSdkReactNative.initialize

Sustituye `DdSdkReactNative.initialize` por `DatadogCodepush.initialize` en tu código:

```js
import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons). You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported
    true, // track XHR resources
    true // track errors
);

await DatadogCodepush.initialize(config);
```

### Inicialización con DatadogProvider

Sustituye `DatadogProvider` por `DatadogCodepushProvider` en el componente de tu aplicación:

```js
import { DatadogCodepushProvider } from '@datadog/mobile-react-native-code-push';

export default function App() {
    return (
        <DatadogCodepushProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogCodepushProvider>
    );
}
```

Como obtener la versión de CodePush es un paso asíncrono que debe realizarse antes de inicializar el SDK de Datadog React Native para RUM, no hay diferencia entre `InitializationMode.SYNC` y `InitializationMode.ASYNC` cuando se utiliza `DatadogCodepushProvider`.

## Cargar mapas de fuente de CodePush

Instala [`@datadog/datadog-ci`][3] como dependencia de desarrollo en tu proyecto.

Para instalarlo con NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

Para instalarlo con Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Crea un archivo gitignored `datadog-ci.json` en la raíz de tu proyecto que contenga tu clave de API y el sitio de Datadog (si no `datadoghq.com`):

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

También puedes exportarlas como variables de entorno `DATADOG_API_KEY` y `DATADOG_SITE`.

Cuando lances un nuevo paquete de CodePush, especifica un directorio de salida para los mapas de fuente y el paquete:

```sh
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

Ejecuta el comando `datadog-ci react-native codepush` pasando los argumentos de CodePush `app` y `deployment` adecuados.

Para ejecutarlo con NPM:

```sh
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

Para ejecutarlo con Yarn:

```sh
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

## Alternativas

Estos pasos garantizan que la `version` coincide con el formato `{commercialVersion}-codepush.{codePushLabel}`, como `1.2.4-codepush.v3`.

También puedes hacerlo especificando un `versionSuffix` en la configuración del SDK:

```js
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
    true, // track XHR Resources
    true // track Errors
);

config.versionSuffix = `codepush.${codepushVersion}`; // will result in "1.0.0-codepush.v2"
```

Para evitar posibles conflictos de versiones, `versionSuffix` añade un guión (`-`) antes del sufijo.

Para obtener la `codepushVersion`, puedes codificarla o utilizar [`CodePush.getUpdateMetadata`][4].

A continuación, carga tus mapas de fuente mediante el comando [`datadog-ci react-native upload`][5] y asegúrate de que el argumento `--release-version` coincide con lo establecido en la configuración del SDK.

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En case (incidencia) de zonas con poca red, o cuando la batería del dispositivo está demasiado baja, todos los eventos de RUM se almacenan primero en el dispositivo local por lotes.

Cada lote sigue la especificación de entrada. Se envían tan pronto como la red está disponible y la batería está lo suficientemente cargada como para garantizar que el SDK de Datadog no afecte la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano o si falla una carga de datos, el lote se conserva hasta que se lo pueda enviar con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato. Para garantizar que el SDK no utilice demasiado espacio de disco, los datos del disco se descartan automáticamente si son demasiado antiguos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /es/real_user_monitoring/reactnative/
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref#codepushgetupdatemetadata
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/react-native#upload
[6]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-codepush