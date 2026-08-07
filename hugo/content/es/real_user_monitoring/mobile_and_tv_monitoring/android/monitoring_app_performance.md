---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Android Monitoring App Performance
---
## Información general

Las temporizaciones de vistas te ayudan a comprender el rendimiento de tu aplicación desde la perspectiva del usuario. RUM incluye tanto temporizaciones automáticas listas para usar (`Time-to-Network-Settled` y `Interaction-to-Next-View`), como una API precisa para notificar que la vista terminó de cargarse (ya que solo tú, como desarrollador, puedes saberlo con certeza).

### Time to network settled
**Time-to-Network-Settled (TNS)** mide el tiempo que tarda una vista en cargarse por completo con todas las llamadas de red relevantes iniciadas al principio de la vista. TNS se representa con el atributo `@view.network_settled_time` en los eventos de vista de RUM.

Por defecto, el TNS se calcula como el tiempo transcurrido entre el inicio de la vista y la finalización de todos los recursos que se iniciaron en los 100 ms siguientes al inicio de la vista. Este comportamiento está controlado por `TimeBasedInitialResourceIdentifier`, que clasifica tales recursos como "iniciales".

Para personalizar el umbral predeterminado de 100 ms para el cálculo del TNS, puedes ajustar el valor del umbral en `TimeBasedInitialResourceIdentifier` y establecerlo mediante la configuración `setInitialResourceIdentifier()`. Esto te permite incluir recursos que se inician dentro de un periodo personalizado después del inicio de la vista:

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.networksettled.TimeBasedInitialResourceIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setInitialResourceIdentifier(TimeBasedInitialResourceIdentifier(500)) // Set threshold to 0.5s
   .build()
```

Si necesitas más control sobre qué recursos se consideran "iniciales" en TNS, puedes proporcionar tu propia implementación de la interfaz `InitialResourceIdentifier`. Esto te permite definir una lógica de clasificación personalizada basada en propiedades de los recursos como el ID o la hora de inicio.

### Interacción con la vista siguiente
**Interaction-to-Next-View (INV)** mide el tiempo transcurrido entre la última interacción del usuario en la vista anterior y el inicio de la vista actual. INV se representa mediante el atributo `@view.interaction_to_next_view_time ` en los eventos de vista de RUM.

Por defecto, INV se calcula a partir de la última acción **tocar**, **hacer clic** o **deslizar** ocurrida dentro de un umbral de **3 segundos** antes del inicio de la vista. Este comportamiento está controlado por `TimeBasedInteractionIdentifier`, que clasifica tales acciones como la "última interacción".

Para personalizar el umbral predeterminado de 3 segundos para el cálculo del ITNV, puedes ajustar el valor del umbral en `TimeBasedInteractionIdentifier` y configurarlo mediante la configuración `setLastInteractionIdentifier()`. Esto te permite incluir acciones dentro de un periodo personalizado antes de que se inicie la siguiente vista.

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.interactiontonextview.TimeBasedInteractionIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setLastInteractionIdentifier(TimeBasedInteractionIdentifier(5000)) // Set threshold to 5s
   .build()
   ```

Si necesitas tener más control sobre qué interacciones se consideran "última interacción" en INV, puedes implementar tu propio predicado ajustando el protocolo `LastInteractionIdentifier`. Esto te permite definir una lógica de clasificación personalizada basada en las propiedades de la acción como el tipo o la marca temporal.

### Notificar al SDK que tu vista ha terminado de cargarse

Android RUM rastrea el tiempo que tarda tu vista en cargarse. Para notificar al SDK que tu vista ha terminado de cargarse, llama al método `addViewLoadingTime(override=)` 
a través de la instancia `GlobalRumMonitor`. Llama a este método cuando tu vista esté completamente cargada y mostrada al usuario:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       @OptIn(ExperimentalRumApi::class)
       fun onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override = false)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       @OptIn(markerClass = ExperimentalRumApi.class)
       public void onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Utiliza la opción `override` para sustituir el tiempo de carga calculado anteriormente para la vista actual.

Una vez enviado el tiempo de carga, es accesible como `@view.loading_time` y es visible en la interfaz de usuario RUM.

**Nota**: Esta API es todavía experimental y podría cambiar en el futuro.

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

Una vez enviada la temporización, ésta es accesible como `@view.custom_timings.<timing_name>`. Por ejemplo: `@view.custom_timings.hero_image`. Debes [crear una medida][1] antes de crear gráficas en los análisis o dashboards de RUM. 

## Comprender los tiempos de rendimiento
Todos los tiempos de las vistas se miden en relación con el inicio de la vista. El momento exacto en que comienza una vista depende del tipo de instrumentación utilizado para el seguimiento de las vistas. Para obtener más información, consulta [Instrumentación de las vistas en comparación con el ciclo de vida de la aplicación][2].

## Resolución de problemas
Cuando se utilizan los valores por defecto `TimeBasedInitialResourceIdentifier` y `TimeBasedInteractionIdentifier`, pueden faltar los tiempos TNS e INV en determinados casos:

- `@view.interaction_to_next_view_time` (INV) no se establece para la primera vista de una sesión si no se realizó el seguimiento de las acciones tocar, hacer clic o deslizar en la vista anterior, o si el intervalo entre la última acción de este tipo y el inicio de la vista actual supera los 3 segundos.
- `@view.network_settled_time` (TNS) no está disponible si no se realizó el seguimiento de ningún recurso durante la vista, o si no se inició ninguno en los 100 ms iniciales de la vista.

Para maximizar la precisión de TNS e INV, considera ajustar los umbrales de tiempo en los predicados por defecto para alinearlos con el comportamiento de tu aplicación, o implementa predicados personalizados según tus necesidades.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/data_collected/#views_instrumentation_versus_app_lifecycle