---
aliases:
- /es/real_user_monitoring/android/advanced_configuration/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Configuración avanzada de Android
---
## Información general

Si aún no has configurado el SDK, sigue las [instrucciones de configuración disponibles en la aplicación][1] o consulta la [documentación de configuración de Android RUM][2].

## Mejorar las sesiones de usuario

Android RUM rastrea automáticamente atributos como la actividad de usuario, las pantallas, los errores y las solicitudes de red. Consulta la [documentación de recopilación de datos de RUM][3] para obtener información sobre los eventos de RUM y los atributos predeterminados. Para mejorar aún más la información de sesión de usuario y obtener un control más preciso sobre los atributos recopilados, puedes rastrear eventos personalizados.

### Vistas personalizadas

Además de [rastrear vistas automáticamente][4], también puedes rastrear vistas distintas específicas (como actividades y fragmentos) cuando se resulten visibles e interactivas en el ciclo de vida `onResume()`. Termina el rastreo cuando la vista deje de estar visible. La mayoría de las veces es necesario llamar este método en la `Activity` o el `Fragment` en primer plano:


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onResume() {
         GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
       }

       fun onPause() {
         GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onResume() {
            GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
       }

       public void onPause() {
            GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Acciones personalizadas

Además de [rastrear acciones automáticamente][5], también puedes rastrear acciones específicas del usuario (como toques, clics y desplazamientos) con `RumMonitor#addAction`. Para el rastreo continuo de acciones (por ejemplo, el rastreo de un usuario que se desplaza por una lista), utiliza `RumMonitor#startAction` y `RumMonitor#stopAction`.

Ten en cuenta que el tipo de acción debe ser uno de los siguientes: "personalizada", "hacer clic", "tocar", "desplazarse", "deslizar", "atrás".

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onUserInteraction() {
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onUserInteraction() {
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Mejorar recursos

A la hora de [rastrear recursos automáticamente][6], proporciona una instancia `RumResourceAttributesProvider`personalizada para añadir atributos personalizados a cada solicitud de red rastreada. Por ejemplo, si quieres rastrear los encabezados de una solicitud de red, crea una implementación de la siguiente manera y pásala al compilador del `DatadogInterceptor`.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        val headers = request.headers
        return headers.names().associate {
            "headers.${it.lowercase(Locale.US)}" to headers.values(it).first()
        }
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        Headers headers = request.headers();

        for (String key : headers.names()) {
            String attrName = "headers." + key.toLowerCase(Locale.US);
            result.put(attrName, headers.values(key).get(0));
        }

        return result;
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### Recursos personalizados

Además de [rastrear recursos automáticamente][6], también puedes rastrear recursos personalizados específicos (como solicitudes de red y APIs de proveedores de terceros) con métodos (como `GET` y `POST`) mientras cargas el recurso con `RumMonitor#startResource`. Deja de rastrear con `RumMonitor#stopResource` cuando esté completamente cargado, o `RumMonitor#stopResourceWithError` si se produce un error al cargarlo.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
            try {
              // do load the resource
              GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
            } catch (e: Exception) {
              GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
            }
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
            try {
                // do load the resource
                GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Errores personalizados

Para realizar un rastreo de errores específicos, notifica al monitor cuando se produzca un error con el mensaje, el origen, la excepción y atributos adicionales. Consulta la [documentación sobre atributos de error][7].

```kotlin
   GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

### Añadir propiedades de usuario

Puedes utilizar la API `addUserProperties` para añadir propiedades de usuario adicionales a las establecidas previamente.

```kotlin
fun addUserProperties(extraInfo: Map<String, Any?>, sdkCore: SdkCore = getInstance()) {
    sdkCore.addUserProperties(extraInfo)
}
```

## Gestión de eventos y datos

El SDK de Android almacena primero eventos y sólo carga eventos cuando se cumplen las condiciones de [especificaciones de admisión][8].

### Borrar todos los datos

Tienes la opción de borrar todos los datos no enviados almacenados por el SDK con la API `clearAllData`.

```kotlin
fun clearAllData(sdkCore: SdkCore = getInstance()) {
    sdkCore.clearAllData()
}
```

### Detener la recopilación de datos

Puedes utilizar la API `StopInstance` para impedir que la instancia del SDK asignada al nombre dado (o la instancia predeterminada si el nombre es nulo) siga recopilando y cargando datos.

```kotlin
   fun stopInstance(instanceName: String? = null) {
       synchronized(registry) {
           val instance = registry.unregister(instanceName)
           (instance as? DatadogCore)?.stop()
       }
   }
```

### Controlar la acumulación de eventos

Muchas operaciones, como el procesamiento de datos y la entrada/salida de eventos, se ponen en cola en subprocesos en segundo plano para gestionar los casos de periferia en los que la cola ha crecido tanto que podría haber retrasos en el procesamiento, un uso elevado de memoria o errores Aplicación no responde (ANR).

Puedes controlar la acumulación de eventos en el SDK con la API `setBackpressureStrategy`. Esta API ignora las nuevas tareas si una cola alcanza los 1024 elementos.

```kotlin
   fun setBackpressureStrategy(backpressureStrategy: BackPressureStrategy): Builder {
       coreConfig = coreConfig.copy(backpressureStrategy = backpressureStrategy)
       return this
   }
```

Ve un [ejemplo de uso de esta API][9].

### Establecer un umbral remoto de  logs

Puedes definir el nivel (prioridad) mínimo de logs para enviar eventos a Datadog en una instancia de registro. Si la prioridad de log es inferior a la establecida en este umbral, no se envía. El valor por defecto es -1 (permitir todo).

```kotlin
   fun setRemoteLogThreshold(minLogThreshold: Int): Builder {
       minDatadogLogsPriority = minLogThreshold
       return this
   }
```

## Rastrear atributos globales personalizados

Además de los [atributos RUM predeterminados][3] capturados por el SDK de RUM Android automáticamente, puedes optar por añadir información contextual adicional, como atributos personalizados, a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog. Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la línea temporal de la sesión, los logs de error y el estado de la red).

### Rastrear sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:
* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" >}}

| Atributo   | Tipo   | Descripción                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Cadena | (Obligatorio) Identificador único de usuario.                                              |
| `usr.name`  | Cadena | (Opcional) Nombre de usuario sencillo, mostrado por defecto en la interfaz de usuario RUM.              |
| `usr.email` | Cadena | (Opcional) Correo electrónico del usuario, mostrado en la interfaz de usuario RUM, si el nombre de usuario no está presente. |

Para identificar las sesiones de usuario, utiliza, por ejemplo, la API `setUserInfo`:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Rastrear atributos

```kotlin
    // Adds an attribute to all future RUM events
    GlobalRumMonitor.get().addAttribute(key, value)

    // Removes an attribute to all future RUM events
    GlobalRumMonitor.get().removeAttribute(key)
```

## Rastrear widgets

Los widgets no se rastrean automáticamente con el SDK. Para enviar interacciones de interfaz de usuario desde tus widgets manualmente, llama a la API de Datadog. [Consulta el ejemplo][10].


## Parámetros de inicialización

Puedes usar los siguientes métodos en `Configuration.Builder` a la hora de crear la configuración de Datadog para inicializar la librería:

`setFirstPartyHosts()`
: define hosts que tienen el rastreo habilitado y tienen recursos de RUM categorizados como `first-party`. **Nota**: Si defines tipos de encabezado de rastreo personalizados en la configuración de Datadog y estás utilizando un rastreador registrado con `GlobalTracer`, asegúrate de que se establecen los mismos tipos de encabezado de rastreo para el rastreador en uso.

`useSite(DatadogSite)`
: cambia los datos de destino a los sitios EU1, US1, US3, US5, US1_FED y AP1.

`setFirstPartyHostsWithHeaderType`
: establece la lista de los hosts principales y especifica el tipo de encabezados HTTP utilizados para el rastreo distribuido.

`setBatchSize([SMALL|MEDIUM|LARGE])`
: define el tamaño de lote individual para las solicitudes enviadas a Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])`
: define la frecuencia de las solicitudes realizadas a los endpoints de Datadog (si las solicitudes están disponibles).

`setBatchProcessingLevel(LOW|MEDIUM|HIGH)`
: define el número de lotes enviados en cada ciclo de carga.

`setAdditionalConfiguration`
: te permite proporcionar valores de configuración adicionales que pueden ser utilizados por el SDK.

`setProxy`
: habilita un proxy personalizado para cargar datos rastreados en la admisión de Datadog.

`setEncryption(Encryption)`
: establece una función de cifrado aplicada a los datos almacenados localmente en el dispositivo.

`setPersistenceStrategyFactory`
: permite utilizar una estrategia de persistencia personalizada.

`setCrashReportsEnabled(Boolean)`
: permite controlar si las caídas de la JVM se rastrean o no. El valor por defecto es `true`.

`setBackpressureStrategy(BackPressureStrategy)`
: define la estrategia que utiliza el SDK cuando maneja grandes volúmenes de datos y las colas internas están llenas.

Puedes utilizar los siguientes métodos en `RumConfiguration.Builder` al crear la configuración de RUM para activar las características de RUM:

`trackUserInteractions(Array<ViewAttributesProvider>)`
: permite realizar un rastreo de las interacciones del usuario (como tocar, desplazarse o deslizar). El parámetro también permite añadir atributos personalizados a los eventos de acción de RUM en función del widget con el que interactuó el usuario.

`disableUserInteractionTracking`
: desactiva el rastreador automático de interacción con el usuario.

`useViewTrackingStrategy(strategy)`
: define la estrategia utilizada para realizar el rastreo de las visitas. Consulta [Rastreo automático de visitas](#automatically-track-views) para obtener más información.

`trackLongTasks(durationThreshold)`
: activa el rastreo de tareas que tardan más de `durationThreshold` en el subproceso principal como tareas largas en Datadog. Consulta [Rastreo automático de tareas largas](#automatically-track-long-tasks) para obtener más información.

`trackNonFatalAnrs(Boolean)`
: activa el rastreo de ANR no fatales. Esta opción está activada por defecto en Android API 29 y versiones inferiores, y desactivada por defecto en Android API 30 y versiones superiores.

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])`
: establece la frecuencia preferida para recopilar indicadores vitales de móviles.

`setSessionSampleRate(<sampleRate>)`
: establece la frecuencia de muestreo de las sesiones de RUM. (Un valor de 0 significa que no se envía ningún evento de RUM. Un valor de 100 significa que se mantienen todas las sesiones).

`setSessionListener(RumSessionListener)`
: establece un oyente para ser notificado cuando se inicia una nueva sesión de RUM.

`setTelemetrySampleRate`
: la frecuencia de muestreo para la telemetría interna del SDK utilizada por Datadog. Debe ser un valor comprendido entre `0` y `100`. Por defecto, se establece en `20`.

`setViewEventMapper`
: establece el ViewEventMapper para el RUM ViewEvent. Puedes utilizar esta implementación de interfaz para modificar los atributos ViewEvent antes de la serialización.

`setResourceEventMapper`
: establece el EventMapper para el RUM ResourceEvent. Puedes utilizar esta implementación de interfaz para modificar los atributos ResourceEvent antes de la serialización.

`setActionEventMapper`
: establece el EventMapper para el RUM ActionEvent. Puedes utilizar esta implementación de interfaz para modificar los atributos ActionEvent antes de la serialización.

`setErrorEventMapper`
: establece el EventMapper para el RUM ErrorEvent. Puedes utilizar esta implementación de interfaz para modificar los atributos ErrorEvent antes de la serialización.

`setInitialResourceIdentifier`
: establece un identificador personalizado para los recursos iniciales de red utilizados para el cálculo de temporización de la vista [Time-to-Network-Settled][11] (TNS).

`setLastInteractionIdentifier`
: establece un identificador personalizado para la última interacción en la vista anterior utilizada para el cálculo de temporización [Interaction-to-Next-View][13] (INV).

`setLongTaskEventMapper`
: establece el EventMapper para el RUM LongTaskEvent. Puedes utilizar esta implementación de interfaz para modificar los atributos LongTaskEvent antes de la serialización.

`trackBackgroundEvents`
: activa/desactiva el rastreo de eventos de RUM cuando no hay actividad en primer plano. Por defecto, no se realiza el rastreo de eventos en segundo plano. Activar esta función puede aumentar el número de sesiones rastreadas y, por tanto, tu facturación.

`trackFrustrations`
: activa/desactiva el rastreo de las señales de frustración.

`useCustomEndpoint`
: utiliza RUM para apuntar a un servidor personalizado.

`trackAnonymousUser`
: Cuando se habilita, el SDK genera un ID de usuario anónimo, único y no personal que se conserva durante el lanzamiento de la aplicación. Este ID se adjuntará a cada sesión RUM, lo que te permitirá vincular sesiones originadas por el mismo usuario/dispositivo sin recopilar datos personales. Por defecto, se configura como `true`.

### Rastrear vistas automáticamente

Para rastrear tus vistas automáticamente (como actividades y fragmentos), indica una estrategia de rastreo en la inicialización. Según la arquitectura de tu aplicación, puedes elegir una de las siguientes estrategias:

`ActivityViewTrackingStrategy`
: cada actividad de tu aplicación se considera una vista distinta.

`FragmentViewTrackingStrategy`
: cada fragmento de tu aplicación se considera una vista distinta.

`MixedViewTrackingStrategy`
: cada actividad o fragmento de tu aplicación se considera una vista distinta.

`NavigationViewTrackingStrategy`
: recomendado para usuarios de la librería de navegación de Android Jetpack. Cada destino de navegación se considera una vista distinta.


Por ejemplo, para configurar cada fragmento como una vista distinta, utiliza lo siguiente en tu [configuración][1]:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}


Para `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, o `MixedViewTrackingStrategy`, puedes filtrar qué `Fragment` o `Activity` se rastrea como vista de RUM proporcionando una implementación`ComponentPredicate` en el constructor:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(
        ActivityViewTrackingStrategy(
            trackExtras = true,
            componentPredicate = object : ComponentPredicate<Activity> {
                override fun accept(component: Activity): Boolean {
                    return true
                }

                override fun getViewName(component: Activity): String? = null
            })
        )
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
            .useViewTrackingStrategy(new ActivityViewTrackingStrategy(
                true,
                new ComponentPredicate<Activity>() {
                    @Override
                    public boolean accept(Activity component) {
                        return true;
                    }

                    @Override
                    public String getViewName(Activity component) {
                        return null;
                    }
                }
            ))
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}


**Nota**: De manera predeterminada, la librería utiliza una `ActivityViewTrackingStrategy`. Si decides no proporcionar una estrategia de rastreo de vistas, debes enviar manualmente las vistas llamando a los métodos `startView` y `stopView`.


### Rastrear solicitudes de red automáticamente

Para obtener información de tiempo en recursos (como proveedores de terceros, solicitudes de red) como el tiempo hasta el primer byte o la resolución DNS, personaliza el `OkHttpClient` para añadir la fábrica [EventListener][12]:

1. Añade la dependencia de Gradle a la librería `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Añade la fábrica [EventListener][12]:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val tracedHosts = listOf("example.com")
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       List<String> tracedHosts = Arrays.asList("example.com");
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Rastrear tareas largas automáticamente

Las operaciones de larga ejecución realizadas en el subproceso principal pueden afectar al rendimiento visual y a la capacidad de reacción de tu aplicación. Para rastrear estas operaciones, define el umbral de duración por encima del cual se considera que una tarea es demasiado larga.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build()
   ```

Por ejemplo, para reemplazar la duración predeterminada de `100 ms`, establece un umbral personalizado en tu configuración.

   ```kotlin
      val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build();
   ```

Por ejemplo, para reemplazar la duración predeterminada de `100 ms`, establece un umbral personalizado en tu configuración.

   ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## Modificar o descartar eventos de RUM

Para modificar algunos atributos en tus eventos de RUM, o para descartar algunos de los eventos por completo antes del procesamiento por lotes, proporciona una implementación de `EventMapper<T>` al inicializar el SDK de RUM Android:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build();

   ```
{{% /tab %}}
{{< /tabs >}}

  Al implementar la interfaz `EventMapper<T>`, solo se pueden modificar algunos atributos para cada tipo de evento:

   | Tipo de evento    | Clave de atributo        | Descripción                                      |
   | ------------- | -------------------- | ------------------------------------------------ |
   | ViewEvent     | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`          | Nombre de la vista.                                |
   | ActionEvent   |                      |                                                  |
   |               | `action.target.name` | Nombre de destino.                                     |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`          | Nombre de la vista.                                |
   | ErrorEvent    |                      |                                                  |
   |               | `error.message`      | Mensaje de error.                                   |
   |               | `error.stack`        | Stack trace del error.                         |
   |               | `error.resource.url` | URL del recurso.                             |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`          | Nombre de la vista.                                |
   | ResourceEvent |                      |                                                  |
   |               | `resource.url`       | URL del recurso.                             |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`          | Nombre de la vista.                                |
   | LongTaskEvent |                      |                                                  |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`          | Nombre de la vista.                                |

   **Nota**: Al devolver el parámetro `null` desde la implementación de `EventMapper<T>`, se descarta el evento.

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar posteriormente la sesión de usuario en Datadog.

Puedes acceder al identificador de sesión RUM en tiempo de ejecución sin esperar al evento `sessionStarted`:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/android
[3]: /es/real_user_monitoring/android/data_collected
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: /es/real_user_monitoring/android/data_collected/#event-specific-attributes
[8]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/setup/#sending-data-when-device-is-offline
[9]: https://github.com/DataDog/dd-sdk-android/blob/eaa15cd344d1723fafaf179fcebf800d6030c6bb/sample/kotlin/src/main/kotlin/com/datadog/android/sample/SampleApplication.kt#L279
[10]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[11]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance/#time-to-network-settled
[12]: https://square.github.io/okhttp/features/events/
[13]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance/#interaction-to-next-view
[13]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance/#interaction-to-next-view
[13]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance/#interaction-to-next-view
