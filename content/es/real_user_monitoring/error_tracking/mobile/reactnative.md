---
aliases:
- /es/real_user_monitoring/error_tracking/reactnative
code_lang: reactnative
code_lang_weight: 40
description: Configura el seguimiento de errores para tus proyectos React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente dd-sdk-reactnative
- link: real_user_monitoring/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: Blog
  text: Datadog ahora ofrece la notificación de fallos y el seguimiento de errores
    React Native
title: Notificación de fallos y seguimiento de errores React Native
type: lenguaje de código múltiple
---

## Información general

Habilita la notificación de fallos y el seguimiento de errores React Native para obtener informes completos de fallos y tendencias de errores mediante Real User Monitoring. Con esta función, puede acceder a:

-   Dashboards y atributos de fallos agregados React Native
-   Informes de fallos React Native simbolizados (JavaScript y iOS o Android nativos)
-   Análisis de tendencias con el seguimiento de errores React Native

Para simbolizar tus trazas (traces) de stack tecnológico, carga manualmente tus archivos de asignación en Datadog.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no has configurado el SDK para React Native, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de React Native][3].

### Añadir la notificación de fallos

Actualiza tu fragmento de inicialización para habilitar la notificación de fallos nativo JavaScript:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<APPLICATION_ID>',
    true,
    true,
    true // enable JavaScript crash reporting
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

## Obtener trazas de stack tecnológico desofuscadas

Los archivos de asignación se utilizan para desofuscar trazas de stack tecnológico, lo que ayuda a depurar errores. Mediante el ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la compilación de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

En las aplicaciones React Native, la coincidencia de las trazas de stack tecnológico y los mapas de origen se basa en una combinación de los campos `service`, `version`, `bundle_name` y `platform`. De todos los mapas de origen que coinciden con estos campos, Datadog utiliza el que tiene el valor `build_number` más alto.

Para reducir el tamaño de tu aplicación, su código se minifica cuando se compila para su lanzamiento. Para vincular los errores a tu código real, debes cargar los siguientes archivos de simbolización:

-   Mapa de origen JavaScript para tu paquete iOS JavaScript 
-   Mapa de origen JavaScript para tu paquete Android JavaScript
-   dSYM para tu código iOS nativo
-   Archivos de asignación Proguard, si has habilitado la ofuscación de código para tu código nativo de Android.

Para configurar el proyecto para que envíe automáticamente los archivos de simbolización, ejecuta `npx datadog-react-native-wizard`.

Consulta las opciones en la [documentación oficial][13] del asistente.

### Opciones de transmisión para tus cargas

#### Uso del script `datadog-sourcemaps.gradle`

Para especificar un nombre de servicio diferente, añade el siguiente código a tu archivo `android/app/build.gradle`, antes de la línea `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"`:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

#### Mediante el comando `datadog-ci react-native xcode`

Las opciones del comando `datadog-ci react-native xcode` están disponibles en la [página de documentación del comando][12].

#### Especificación de una versión personalizada

Utiliza la variable de entorno `DATADOG_RELEASE_VERSION` para especificar una versión diferente para tus mapas de orígenes, a partir de `@datadog/mobile-react-native@2.3.5` y `@datadog/datadog-ci@v2.37.0`.

Cuando el SDK se inicializa con un sufijo de versión, debes anular manualmente la versión para que el mapa de orígenes y las versiones de compilaciones coincidan.

## Limitaciones

{{< site-region region="us,us3,us5,eu,gov" >}}
Los mapas de orígenes, los archivos de asignación y los archivos dSYM tienen un límite de **500** MB cada uno.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los mapas de orígenes, los archivos de asignación y los archivos dSYM tienen un límite de **500** MB cada uno.
{{< /site-region >}}

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

## Para probar tu aplicación

Para verificar la configuración de las notificaciones de fallos y el seguimiento de errores React Native, necesitas generar un error en tu aplicación y confirmar que el error aparece en Datadog.

Para probar tu aplicación:

1. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
2. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][1].
4. Para los fallos, después de que se produzcan, reinicia tu aplicación y espera a que el SDK de React Native cargue el informe del fallo en [**Rastreo de errores**][1].

Para asegurarte de que tus mapas de origen se envían y vinculan correctamente con tu aplicación, también puedes generar fallos con el paquete [`react-native-performance-limiter`][14].

Instálalo con yarn o npm y luego vuelve a instalar tus pods:

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

Bloquea el subproceso JavaScript desde tu aplicación:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Vuelve a crear tu aplicación para que envíe los nuevos mapas de origen, activa el fallo y espera a que aparezca el error en la página [Rastreo de errores][1].

Para probar la carga de tus archivos dSYM y de asignación Proguard, genera un fallo en el subproceso principal nativo:

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## Opciones de configuración adicionales

### Alternativas a `datadog-react-native-wizard` para la simbolización

Si el uso de `datadog-react-native-wizard` no tuvo éxito o si no quieres cargar tus archivos de simbolización automáticamente en cada versión, sigue los siguientes pasos para simbolizar los informes de fallos.

#### Carga de mapas de origen JavaScript en compilaciones iOS

En primer lugar, debes instalar `@datadog/datadog-ci` como dependencia de desarrollo en tu proyecto:

```bash
yarn add -D @datadog/datadog-ci
# or
npm install --save-dev @datadog/datadog-ci
```

{{% collapse-content title="Automáticamente en cada versión (React Native v0.69 o posterior)" level="h5" %}}

Cargar manualmente tus mapas de origen en cada compilación de versión lleva tiempo y puede generar errores. Datadog recomienda enviar automáticamente los mapas de origen cada vez que ejecutes una compilación de versión.

Crea un archivo de script llamado `datadog-sourcemaps.sh` en la raíz de tu proyecto, que contenga lo siguiente:

```shell
#!/bin/sh
set -e

DATADOG_XCODE="../node_modules/.bin/datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE"
```

Este script ejecuta un comando que se encarga de cargar los mapas de origen con todos los parámetros correctos. Para obtener más información, consulta la [documentación de datadog-ci][12].

Abre tu `.xcworkspace` con Xcode, luego selecciona tu proyecto > Fases de la compilación > Empaquetar código e imágenes nativos de React Native. Edita el script para que tenga el siguiente aspecto:

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# Añade estas dos líneas
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map

# Edita la siguiente línea
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

Para que la carga funcione, debes proporcionar tu clave de API Datadog. Si utilizas una herramienta de línea de comandos o un servicio externo, puedes especificarlos como una variable de entorno `DATADOG_API_KEY`. Si ejecutas la compilación desde Xcode, crea un archivo `datadog-ci.json` en la raíz de tu proyecto que contenga la clave de API:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

También puedes especificar el sitio Datadog (como `datadoghq.eu`) como una variable de entorno `DATADOG_SITE` o como una clave `datadogSite`, en tu archivo `datadog-ci.json`.

{{% /collapse-content %}}

{{% collapse-content title="Automáticamente en cada versión (React Native anterior a v0.69)" level="h5" %}}

Abre tu `.xcworkspace` con Xcode, luego selecciona tu proyecto > Fases de la compilación > Empaquetar código e imágenes nativos de React Native. Edita el script para que tenga el siguiente aspecto:

```shell
set -e

export NODE_BINARY=node
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map
../node_modules/.bin/datadog-ci react-native xcode
```

Este script ejecuta un comando que se encarga de cargar los mapas de origen con todos los parámetros correctos. Para obtener más información, consulta la [documentación de datadog-ci][12].

Para que la carga funcione, debes proporcionar tu clave de API Datadog. Si utilizas una herramienta de línea de comandos o un servicio externo, puedes especificarlos como una variable de entorno `DATADOG_API_KEY`. Si ejecutas la compilación desde Xcode, crea un archivo `datadog-ci.json` en la raíz de tu proyecto que contenga la clave de API:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

También puedes especificar el sitio Datadog (como `datadoghq.eu`) como una variable de entorno `DATADOG_SITE` o como una clave `datadogSite`, en tu archivo `datadog-ci.json`.

{{% /collapse-content %}}

{{% collapse-content title="Manualmente en cada compilación" level="h5" %}}

Para generar un mapa de origen, es necesario editar la fase de compilación de Xcode "Empaquetar código e imágenes de React Native".

1. Abre el archivo `ios/YourAppName.xcworkspace` en Xcode.
2. En el panel izquierdo, selecciona el icono "Archivo" y haz clic en tu proyecto.
3. En el panel central, selecciona "Fases de la compilación" en la barra superior.

Cambia el script añadiendo esto después de la línea `set -e`:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- añade esta línea para generar mapas de origen
# no realices ningún cambio al resto del script
```

En adelante, podrás encontrar los mapas de origen de tu paquete en cada compilación de iOS.

Para encontrar la ruta al archivo de tu paquete desde XCode, despliega el Navegador de informes en Xcode y filtra por `BUNDLE_FILE` para su localización.

La localización habitual es `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle`, donde `YourAppName` es el nombre de tu aplicación y `verylonghash` es un hash de 28 letras.

Para cargar los mapas de origen, ejecuta esto desde tu proyecto React Native:

```bash
export DATADOG_API_KEY= # rellena con tu clave de API
export SERVICE=com.myapp # sustituye por el nombre de tu servicio 
export VERSION=1.0.0 # sustituye por la versión de tu aplicación en XCode
export BUILD=100 # sustituye por la versión de tu compilación en XCode
export BUNDLE_PATH= # rellena con la ruta de tu paquete

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

{{% collapse-content title="Manualmente en cada compilación (con Hermes para React Native anterior a v0.71)" level="h5" %}}

Existe un error en las versiones de React Native hasta la v0.71 que genera un mapa de origen incorrecto al utilizar Hermes.

Para solucionarlo, es necesario añadir más líneas **al final** de la fase de compilación para generar un archivo de mapa de origen correcto.

Edita tu fase de compilación de la siguiente forma:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- añade esta línea para generar mapas de origen
# Para React Native v0.70, debes definir USE_HERMES como verdadero para que se generen mapas de origen
export USE_HERMES=true

# no realices ningún cambio al resto del script

# añade estas líneas para componer los mapas de origen del empaquetador y el compilador en un único archivo
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # Antes de RN v0.70, el script se llamaba find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

Para cargar el mapa de origen, ejecuta esto desde la raíz de tu proyecto React Native:

```bash
export DATADOG_API_KEY= # rellena con tu clave de API
export SERVICE=com.myapp # sustituye por el nombre de tu servicio 
export VERSION=1.0.0 # sustituye por la versión de tu aplicación en XCode
export BUILD=100 # sustituye por la versión de tu compilación en XCode
export BUNDLE_PATH= # rellena con la ruta de tu paquete

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

#### Carga de mapas de origen JavaScript en compilaciones Android

{{% collapse-content title="Automáticamente en cada versión (React Native v0.71 o posterior)" level="h5" %}}

En tu archivo `android/app/build.gradle`, añade lo siguiente después de la línea `apply plugin: "com.facebook.react"`:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

Para que la carga funcione, debes proporcionar tu clave de API Datadog. Puedes especificarla como una variable de entorno `DATADOG_API_KEY`o crear un archivo `datadog-ci.json` en la raíz de tu proyecto que contenga la clave de API:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

También puedes especificar el sitio Datadog (como `datadoghq.eu`) como una variable de entorno `DATADOG_SITE` o como una clave `datadogSite`, en tu archivo `datadog-ci.json`.

{{% /collapse-content %}}

{{% collapse-content title="Automáticamente en cada versión (React Native v0.71 o anterior)" level="h5" %}}

En tu archivo `android/app/build.gradle`, añade lo siguiente después de la línea `apply from: "../../node_modules/react-native/react.gradle"`:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

Para que la carga funcione, debes proporcionar tu clave de API Datadog. Puedes especificarla como una variable de entorno `DATADOG_API_KEY`o crear un archivo `datadog-ci.json` en la raíz de tu proyecto que contenga la clave de API:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

También puedes especificar el sitio Datadog (como `datadoghq.eu`) como una variable de entorno `DATADOG_SITE` o como una clave `datadogSite`, en tu archivo `datadog-ci.json`.

{{% /collapse-content %}}

{{% collapse-content title="Manualmente en cada compilación" level="h5" %}}

En Android, el archivo de mapas de origen se encuentra en `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map`.
La localización del archivo del paquete depende de tus versiones de React Native (RN) y Android Gradle Plugin (AGP):

-   RN v0,71 o posterior y AGP v7.4.0 o posterior: `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN v0,71 o posterior y AGP v7.4.0 o anterior: `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN v0,7 o anterior1: `android/app/build/generated/assets/react/release/index.android.bundle`

La versión de Android Gradle Plugin se especifica en el archivo `android/build.gradle` bajo `com.android.tools.build:gradle`, por ejemplo: `classpath("com.android.tools.build:gradle:7.3.1")`.

Si tu aplicación tiene variantes más completas, sustituye `release` por el nombre de tu variante en las rutas.
Si especificaste un `bundleAssetName` en tu configuración de React en `android/app/build.gradle`, sustituye `index.android.bundle` por su valor.

Después de ejecutar tu compilación, carga tu mapa de origen ejecutando esto desde la raíz de tu proyecto React Native:

```bash
export DATADOG_API_KEY= # rellena con tu clave de API
export SERVICE=com.myapp # sustituye por tu nombre de servicio 
export VERSION=1.0.0 # sustituye por el nombre de la versión de android/app/build.gradle
export BUILD=100 # sustituye por el código de la versión de android/app/build.gradle
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

#### Carga de archivos dSYM iOS

{{% collapse-content title="Manualmente en cada compilación" level="h5" %}}

Para obtener más información, consulta la [documentación sobre notificación de fallos y seguimiento de errores de iOS][4].

{{% /collapse-content %}}

#### Carga de archivos de asignación Android Proguard

En primer lugar, asegúrate de que la minificación Proguard está habilitada en tu proyecto. Por defecto, no está habilitada en los proyectos React Native.

Para obtener más información, consulta [la documentación de Proguard React Native][5].

Si aún no sabes si la configuración ha sido la correcta, puedes comprobar si la ejecución de `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` devuelve algo. Si es así, la minificación está habilitada.

{{% collapse-content title="Manualmente en cada compilación" level="h5" %}}

En tu archivo `android/app/build.gradle`, añade la [última versión del complemento][15] y configúrala **en la parte superior del archivo**:

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}

datadog {
    checkProjectDependencies = "none" // this is needed in any case for React Native projects
}
```

Para que la carga funcione, debes proporcionar tu clave de API Datadog. Puedes especificarla como una variable de entorno `DATADOG_API_KEY`o crear un archivo `datadog-ci.json` en la raíz de tu proyecto que contenga la clave de API:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

También puedes especificar el sitio Datadog (como `datadoghq.eu`) como una variable de entorno `DATADOG_SITE` o como una clave `datadogSite` en tu archivo `datadog-ci.json`.
Para obtener más información, consulta el [complemento Gradle del SDK Android en Datadog][6].

Para ejecutar el complemento después de una compilación, ejecuta `(cd android && ./gradlew app:uploadMappingRelease)`.

{{% /collapse-content %}}

{{% collapse-content title="Automatización de la carga en cada compilación" level="h5" %}}

Instala el complemento como en el paso anterior.

Encuentra el bucle en `applicationVariants` en el archivo `android/app/build.gradle`. Debería parecerse a `applicationVariants.all { variant ->`.

Dentro del bucle, añade el siguiente fragmento:

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**Nota**: Volver a cargar un mapa de origen no anula el existente si la versión no ha cambiado.

{{% /collapse-content %}}

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/reactnative/
[4]: /es/real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter
[15]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin