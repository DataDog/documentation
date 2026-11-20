---
algolia:
  tags:
  - bots
description: Aprender a inicializar tu SDK nativo antes de iniciar React Native
further_reading:
- link: real_user_monitoring/reactnative/
  tag: Documentación
  text: Más información sobre la Monitorización de React Native
title: Inicializar tu SDK nativo antes de iniciar React Native
---

## Información general

De forma predeterminada, el SDK de React Native inicializa el SDK nativo cuando se llama a `DdSdkReactNative.initialize(config)` en la capa JS, o cuando se utiliza `DatadogProvider`. Como resultado, el SDK no captura los bloqueos nativos que se producen antes de que se llame a la inicialización en la capa JS. A partir de la versión 2.3.0, se puede inicializar el SDK nativo para que Datadog capture los bloqueos antes de que se inicie la capa de React Native.

## Configuración

Para inicializar tu SDK nativo antes de que React Native se haya iniciado:

1. Crea un archivo `datadog-configuration.json` en la raíz del proyecto `react-native` con la siguiente estructura:

   ```json
   {
     "$schema": "./node_modules/@datadog/mobile-react-native/datadog-configuration.schema.json",
     "configuration": {
     }
   }
   ```

   El atributo `"$schema"` habilita aquí la función de autocompletar y ayuda a la mayoría de los Entornos de desarrollo integrados (IDE) modernos a mostrar errores si la configuración está incompleta o no es válida.

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-1.png" alt="Puedes ver un error en tu IDE si la configuración está incompleta o no es válida" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-2.png" alt="Puedes ver un error en tu IDE si la configuración está incompleta o no es válida" style="width:100%" >}}

   {{< img src="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts/initialize-sdk-before-rn-3.png" alt="Puedes ver un error en tu IDE si la configuración está incompleta o no es válida" style="width:100%" >}}

2. Sigue los pasos que se indican a continuación para tu sistema operativo nativo.

   {{< tabs >}}
   {{% tab "Android" %}}

   1. Añade el siguiente fragmento al archivo `MainApplication.kt`:

      ```kotlin
      import com.datadog.reactnative.DdSdkNativeInitialization

      class MainApplication : Application(), ReactApplication {
        override fun onCreate() {
          super.onCreate()
          DdSdkNativeInitialization.initFromNative(this.applicationContext)
          // Rest of the method
        }
      }
      ```

   2. Añade el siguiente fragmento al archivo `android/app/build.gradle`:

      ```gradle
      apply from: "../../node_modules/@datadog/mobile-react-native/datadog-configuration.gradle"
      ```

      Este script de comandos copia el archivo de configuración en el directorio de activos de compilación.

   {{% /tab %}}
   {{% tab "iOS" %}}

   1. Añade el siguiente fragmento al archivo `AppDelegate.mm`:

      ```objc
      // Add this import
      #import "DdSdk.h"

      - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
      {
          [DdSdk initFromNative];
          // rest of the function
      }
      ```

   2. Añade el archivo `datadog-configuration.json` a los recursos de tu proyecto.

   {{% /tab %}}
   {{% tab "JS" %}}

   Cambia la inicialización de Datadog para leer del mismo archivo y garantizar la coherencia:

   ```jsx
   const configuration  = new FileBasedConfiguration(require("./datadog-configuration.json"))

   <DatadogProvider configuration={configuration}>
     // Rest of the app
   </DatadogProvider>
   ```

   {{% /tab %}}
   {{< /tabs >}}

## Configuración de la localización del archivo

Según tu sistema operativo, el archivo de configuración puede estar en una localización diferente:

- En **Android**, puedes especificar de dónde obtener el archivo a copiar añadiendo el siguiente fragmento:

  ```gradle
  project.ext.datadog = [
      configurationFilePath: "../../../datadog-configuration.json"
  ]
  ```
- En **iOS**, el archivo de configuración se añade al principio del directorio de recursos del proyecto, independientemente de dónde se encuentre.
- En **React Native**, puedes especificar cualquier ruta para el archivo con el patrón `require`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}