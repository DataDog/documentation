---
aliases:
- /es/real_user_monitoring/android/advanced_configuration/
code_lang: android
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Configuración avanzada de RUM Android
type: multi-code-lang
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

### Añadir tus propios tiempos de rendimiento

Además de los atributos predeterminados de RUM, puedes medir a qué dedica tiempo tu aplicación con la API `addTiming`. La medición de tiempo guarda relación con el inicio de la vista de RUM actual. Por ejemplo, puedes medir el tiempo que tarda en aparecer tu imagen principal:
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Una vez enviado el tiempo, se puede acceder al él como `@view.custom_timings.<timing_name>`. Por ejemplo: `@view.custom_timings.hero_image`. Debes [crear una medición][10] antes de representarla gráficamente en análisis de RUM o en dashboards.

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

A la hora de [rastrear recursos automáticamente][6], proporciona una instancia `RumResourceAttributesProvider`personalizada para añadir atributos personalizados a cada solicitud de red rastreada. Por ejemplo, si quieres rastrear los encabezados de una solicitud de red, crea una implementación de la siguiente manera y pásala al constructor del `DatadogInterceptor`.

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
              // carga el recurso
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
                // carga el recurso
                GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Errores personalizados

Para rastrear errores específicos, notifica al monitor cada vez que se produzca un error con el mensaje, el origen, la excepción y los atributos adicionales. Consulta la [documentación de atributos de error][9].

   ```kotlin
      GlobalRumMonitor.get().addError(message, source, throwable, attributes)
   ```

## Rastrear atributos globales personalizados

Además de los [atributos de RUM predeterminados][3] capturados automáticamente por el SDK de RUM Android, puedes decidir añadir información contextual adicional, como atributos personalizados, a tus eventos de RUM para mejorar tu observabilidad en Datadog. Los atributos personalizados permiten segmentar y desglosar información sobre el comportamiento de usuario observado (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información relacionada con el código (como los servicios de backend, la escala de tiempo de la sesión, los logs de errores y el estado de la red).

### Rastrear sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:
* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" >}}

Los siguientes atributos son **opcionales**. Debes indicar **al menos uno**:

| Atributo  | Tipo | Descripción                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | Cadena | Identificador de usuario único.                                                                                  |
| usr.name  | Cadena | Nombre descriptivo, que se muestra de forma predeterminada en la interfaz de usuario de RUM.                                                  |
| usr.email | Cadena | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

Para identificar las sesiones de usuario, utiliza, por ejemplo, la API `setUserInfo`:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Rastrear atributos

```kotlin
    // Añade un atributo a todos los eventos de RUM futuros
    GlobalRumMonitor.get().addAttribute(key, value)

    // Elimina un atributo a todos los eventos de RUM futuros
    GlobalRumMonitor.get().removeAttribute(key)
```

## Rastrear widgets

Los widgets no se rastrean automáticamente con el SDK. Para enviar interacciones de interfaz de usuario desde tus widgets manualmente, llama a la API de Datadog. [Consulta el ejemplo][7].


## Parámetros de inicialización

Puedes usar los siguientes métodos en `Configuration.Builder` a la hora de crear la configuración de Datadog para inicializar la biblioteca:

`setFirstPartyHosts()` 
: define hosts que tienen el rastreo habilitado y tienen recursos de RUM categorizados como `first-party`. **Nota**: Si defines tipos de encabezado de rastreo personalizados en la configuración de Datadog y estás utilizando un rastreador registrado con `GlobalTracer`, asegúrate de que se establecen los mismos tipos de encabezado de rastreo para el rastreador en uso.

`useSite(DatadogSite)` 
: cambia los datos de destino a los sitios EU1, US1, US3, US5, US1_FED y AP1.

Puedes utilizar los siguientes métodos en `RumConfiguration.Builder` al crear la configuración de RUM para activar la característica de RUM:

`trackUserInteractions(Array<ViewAttributesProvider>)` 
: permite realizar un rastreo de las interacciones del usuario (como tocar, desplazarse o deslizar). El parámetro también permite añadir atributos personalizados a los eventos de acción de RUM en función del widget con el que interactuó el usuario.

`useViewTrackingStrategy(strategy)` 
: define la estrategia utilizada para rastrear vistas. Según la arquitectura de tu aplicación, puedes elegir una de varias implementaciones de [`ViewTrackingStrategy`][4] o implementar la tuya propia.

`trackLongTasks(durationThreshold)` 
: activa el rastreo de tareas que tardan más de `durationThreshold` en el subproceso principal como tareas largas en Datadog.

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: define el tamaño de lote individual para las solicitudes enviadas a Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: define la frecuencia de las solicitudes realizadas a los endpoints de Datadog (si las solicitudes están disponibles).

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])` 
: establece la frecuencia preferida para recopilar indicadores vitales de móviles.

`setSessionSampleRate(<sampleRate>)` 
: establece la frecuencia de muestreo de las sesiones de RUM. (Un valor de 0 significa que no se envía ningún evento de RUM. Un valor de 100 significa que se mantienen todas las sesiones).

`setXxxEventMapper()` 
: establece las devoluciones de llamadas de limpieza de datos para vistas, acciones, recursos y errores.


### Rastrear vistas automáticamente

Para rastrear tus vistas automáticamente (como actividades y fragmentos), indica una estrategia de rastreo en la inicialización. Según la arquitectura de tu aplicación, puedes elegir una de las siguientes estrategias:

`ActivityViewTrackingStrategy`
: cada actividad de tu aplicación se considera una vista distinta.

`FragmentViewTrackingStrategy`
: cada fragmento de tu aplicación se considera una vista distinta.

`MixedViewTrackingStrategy` 
: cada actividad o fragmento de tu aplicación se considera una vista distinta.

`NavigationViewTrackingStrategy`
: recomendado para usuarios de la biblioteca de navegación de Android Jetpack. Cada destino de navegación se considera una vista distinta.


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


**Nota**: De manera predeterminada, la biblioteca utiliza una `ActivityViewTrackingStrategy`. Si decides no proporcionar una estrategia de rastreo de vistas, debes enviar manualmente las vistas llamando a los métodos `startView` y `stopView`.


### Rastrear solicitudes de red automáticamente

Para obtener información de tiempo en recursos (como proveedores de terceros, solicitudes de red) como el tiempo hasta el primer byte o la resolución DNS, personaliza el `OkHttpClient` para añadir la fábrica [EventListener][8]:

1. Añade la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Añade la fábrica [EventListener][8]:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
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

   | Tipo de evento    | Clave de atributo      | Descripción                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`           | Nombre de la vista.                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | Nombre de destino.                                     |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`           | Nombre de la vista.                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | Mensaje de error.                                   |
   |               | `error.stack`        | Stack trace del error.                         |
   |               | `error.resource.url` | URL del recurso.                             |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`           | Nombre de la vista.                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | URL del recurso.                             |
   |               | `view.referrer`      | URL vinculada con la vista inicial de la página. |
   |               | `view.url`           | URL de la vista.                                 |
   |               | `view.name`           | Nombre de la vista.                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | URL vinculada con la vista inicial de la página. |
   |               | `view.url`            | URL de la vista.                                 |
   |               | `view.name`           | Nombre de la vista.                                |

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
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/features/events/
[9]: /es/real_user_monitoring/android/data_collected/#event-specific-attributes
[10]: /es/real_user_monitoring/explorer/search/#setup-facets-and-measures