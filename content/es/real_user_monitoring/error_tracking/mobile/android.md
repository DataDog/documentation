---
aliases:
- /es/real_user_monitoring/error_tracking/android
code_lang: android
code_lang_weight: 10
description: Configura el seguimiento de errores en tus aplicaciones Android.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Para empezar con el seguimiento de errores
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualizar datos sobre el seguimiento de errores en el Explorador
title: Notificación de fallos y seguimiento de errores Android
type: lenguaje de código múltiple
---

## Información general

Errores en los procesos de seguimiento de errores recopilados del SDK de Android.

Habilita la notificación de fallos y el seguimiento de errores Android para obtener informes completos de fallos y tendencias de errores. Con esta función, puedes acceder a:

- Dashboards y atributos de fallos agregados Android
- Informes de fallos de Android desofuscados
- Análisis de tendencias con el seguimiento de errores Android

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no has configurado el SDK para Android en Datadog, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de Android][3].

1. Añade la última versión del [SDK de Android][4] a tus dependencias de Gradle.
2. Configura `env` y `variant` de su aplicación al [inicializar el SDK][5].
3. Ejecuta las tareas Gradle para cargar tu archivo de asignación Proguard/R8 y los archivos de símbolos NDK a Datadog para acceder a trazas (traces) de stack tecnológico desofuscadas.

Para cualquier error, puedes acceder a la ruta del archivo, al número de línea y a un fragmento de código para cada marco de la traza de stack tecnológico.

### Añadir la notificación de fallos NDK

Tu aplicación Android puede estar ejecutando código nativo (C/C++) por razones de rendimiento o reutilización de código. Para habilitar la notificación de errores NDK, utiliza el complemento NDK Datadog.

1. Añade la dependencia de Gradle declarando la librería como dependencia en tu archivo `build.gradle`:

   ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-ndk:x.x.x"
        //(...)
    }
   ```
2. Luego de inicializar el SDK, habilita la recopilación de fallos NDK.

    ``` kotlin
    NdkCrashReports.enable()
    ```

### Añadir informes ANR

Una "Aplicación que no responde" ([ANR][6]) es un tipo de error específico de Android que se activa cuando la aplicación no responde durante demasiado tiempo.

Los casos de ANR sólo se notifican a través del SDK (no a través de los logs).

#### Notificación de ANR fatales
Los casos de ANR fatales provocan fallos. La aplicación informa de ellos cuando no responde, lo que lleva a que el sistema operativo Android muestre un cuadro de diálogo emergente al usuario, que decide forzar el cierre de la aplicación a través de la ventana emergente.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Informe de fallo fatal en Seguimiento de errores." >}}

- En la página **Seguimiento de errores**, los casos de ANR fatales se agrupan en función de su similitud, lo que puede dar lugar a la generación de varios **problemas individuales**.
- Por defecto, Datadog captura los casos de ANR fatales a través de la [API ApplicationExitInfo][7] (disponible a partir de *[Android 30 o posteriores][8]*), que pueden ser leídos en el siguiente lanzamiento de la aplicación.
- En *[Android v29][9] y anteriores*, no es posible informar sobre casos de ANR fatales.

#### Notificación de ANR no fatales
Los casos de ANR no fatales pueden o no haber provocado el cierre de la aplicación (fallo).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Informe de fallo no fatal en Seguimiento de errores." >}}

- En la página **Seguimiento de errores**, los casos de ANR no fatales se agrupan en un **problema único** debido a su nivel de ruido
- Por defecto, la notificación de casos de ANR no fatales en *Android v30 o posteriores* está **deshabilitada**, ya que crearía demasiado ruido sobre los casos de ANR fatales. Sin embargo, en *Android v29* y anteriores, la notificación de casos de ANR no fatales está **habilitada** por defecto, ya que en esas versiones no se pueden notificar casos de ANR fatales.

Para cualquier versión de Android, puedes anular la configuración predeterminada para la notificación de casos de ANR no fatales definiendo `trackNonFatalAnrs` como `true` o `false` al inicializar el SDK.

## Obtener trazas de stack tecnológico desofuscadas

Los archivos de asignación se utilizan para desofuscar trazas de stack tecnológico, lo que ayuda a depurar errores. Mediante el ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la compilación de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

Dependiendo de la versión del [complemento Gradle de Android][1], la coincidencia de trazas de stack tecnológico y archivos de asignación se basa en diferentes campos:

- La versión 1.13.0 utiliza el campo `build_id`
- Las versiones más antiguas utilizan una combinación de los campos `service`, `version` y `variant`

### Carga de tu archivo de asignación

**Nota**: Volver a cargar un mapa de origen no anula el existente si la versión no ha cambiado.

{{< tabs >}}
{{% tab "US" %}}

1. Añade el [complemento Gradle de Android][1] a tu proyecto Gradle utilizando el siguiente fragmento de código.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API Datadog exclusiva][2] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. También puedes pasarla como una propiedad de tarea o, si tienes el archivo `datadog-ci.json` en la raíz de tu proyecto, puedes tomarla de una propiedad `apiKey` allí.
3. También puedes configurar el complemento para cargar archivos a la región UE configurando el complemento en tu script `build.gradle`:

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de tus compilaciones APK ofuscadas:

   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza opciones adicionales, el complemento proporciona una tarea de carga para cada variante con la ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "UE" %}}
1. Añade el [complemento Gradle de Android][1] a tu proyecto Gradle utilizando el siguiente fragmento de código.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API Datadog exclusiva][2] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. También puedes pasarla como una propiedad de tarea o, si tienes el archivo `datadog-ci.json` en la raíz de tu proyecto, puedes tomarla de una propiedad `apiKey` allí.
3. Configura el complemento para utilizar la región UE, añadiendo el siguiente fragmento en el archivo de script `build.gradle` de tu aplicación:

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de tus compilaciones APK ofuscadas:

   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza opciones adicionales, el complemento proporciona una tarea de carga para cada variante con la ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Opciones de configuración del complemento

Existen varias propiedades del complemento que se pueden configurar a través de la extensión del complemento. En caso de que estés utilizando múltiples variantes, puedes definir un valor de propiedad para una opción específica de la variante.

Por ejemplo, para una variante de `fooBarRelease`, puedes utilizar la siguiente configuración:

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

La configuración de la tarea para esta variante se combina a partir de las tres configuraciones de opciones proporcionadas en el siguiente orden:

1. `bar`
2. `foo`
3. `fooBar`

Esto resuelve el valor final de la propiedad `versionName` como `fooBar`.

| Nombre de la propiedad              | Descripción                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | El nombre de la versión de la aplicación (por defecto, la versión declarada en el bloque `android` de tu script `build.gradle` ).                                                                                                               |
| `serviceName`              | El nombre de servicio de la aplicación (por defecto, el nombre de paquete de tu aplicación tal y como se declara en el bloque `android` de tu script `build.gradle` ).                                                                                                                          |
| `site`                     | El sitio Datadog al que cargar los datos (US1, US3, US5, EU1, US1_FED o AP1).                                                                                                                                       |
| `remoteRepositoryUrl`      | La URL del repositorio remoto donde se ha desplegado el código fuente. Si no se proporciona, este valor se resuelve desde tu configuración de Git durante el tiempo de ejecución de la tarea.                     |
| `checkProjectDependencies` | Esta propiedad controla si el complemento debe verificar si el SDK Android en Datadog está incluido en las dependencias. Si no es así, "none" se ignora, "warn" genera una advertencia y "fail" desaprueba la compilación con un error (por defecto). |

### Integración con un pipeline CI/CD

Por defecto, la tarea de asignación de cargas es independiente de otras tareas del gráfico de compilación. Cuando necesites asignar cargas, ejecuta la tarea manualmente.

Si quieres ejecutar esta tarea en un pipeline CI/CD y la tarea es necesaria como parte del gráfico de compilación, puedes configurar la tarea de carga para que se ejecute después de que se genere el archivo de asignación.

Por ejemplo:

```groovy
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```

## Limitaciones

### Tamaño de los archivos
{{< site-region region="us,us3,us5,eu,gov" >}}
Los archivos de asignación están limitados a **500** MB. Si tu proyecto tiene un archivo de asignación mayor, utiliza una de las siguientes opciones para reducir el tamaño del archivo:
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los archivos de asignación están limitados a **500** MB. Si tu proyecto tiene un archivo de asignación mayor, utiliza una de las siguientes opciones para reducir el tamaño del archivo:
{{< /site-region >}}

- Define la opción `mappingFileTrimIndents` como `true`. En promedio, esto reduce el tamaño del archivo en un 5%.
- Configura un mapa de `mappingFilePackagesAliases`: Esto sustituye los nombres de paquetes por alias más cortos. **Nota**: Las trazas de stack tecnológico de Datadog utilizan el mismo alias, en lugar del nombre original del paquete, por lo que es mejor utilizar esta opción para dependencias de terceros.

```groovy
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

### Recopilación
El SDK gestiona los informes de fallos con los siguientes comportamientos:

- El fallo sólo puede detectarse una vez inicializado el SDK. Teniendo esto en cuenta, la recomendación es inicializar el SDK lo antes posible en el método `onCreate` de tu aplicación.
- Los fallos RUM deben estar asociados a una vista RUM. Si un fallo se produce antes de que una vista sea visible (por lo general, una actividad o fragmento en un estado `onResume` ) o después de que el usuario final envíe la aplicación a un segundo plano saliendo de ella, el fallo se silencia y no se informa para su recopilación. Para mitigar esto, utiliza el [método][10] `trackBackgroundEvents()` en tu constructor `RumConfiguration`.
- Sólo se conservan los fallos que se producen en sesiones muestreadas, lo que significa que si la [frecuencia de muestreo de sesiones es del 100%][11], algunos fallos no se notificarán.

## Para probar tu implementación

Para verificar la configuración de la notificación de fallos y el seguimiento de errores Android, necesitas generar un error en tu aplicación y confirmar que el error aparece en Datadog.

Para probar tu implementación

1. Ejecuta tu aplicación en un emulador de Android o en un dispositivo real.
2. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Después de que se produzca el fallo, reinicia tu aplicación y espera a que el SDK de Android cargue el informe del fallo en [**Rastreo de errores**][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/android#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[8]: https://developer.android.com/tools/releases/platforms#11
[9]: https://developer.android.com/tools/releases/platforms#10
