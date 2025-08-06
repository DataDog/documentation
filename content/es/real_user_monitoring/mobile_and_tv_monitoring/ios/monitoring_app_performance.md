---
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Monitorización del rendimiento de la aplicación de iOS
---
## Información general

Las temporizaciones de vistas te ayudan a comprender el rendimiento de tu aplicación desde la perspectiva del usuario. RUM incluye tanto temporizaciones automáticas listas para usar (`Time-to-Network-Settled` y `Interaction-to-Next-View`), como una API precisa para notificar que la vista terminó de cargarse (ya que solo tú, como desarrollador, puedes saberlo con certeza).

### Time to network settled

**Time-to-Network-Settled (TNS)** mide el tiempo que tarda una vista en cargarse por completo con todas las llamadas de red relevantes iniciadas al principio de la vista. TNS se representa con el atributo `@view.network_settled_time` en los eventos de vista de RUM.

Por defecto, TNS se calcula como el tiempo transcurrido entre el inicio de la vista y la finalización de todos los recursos que se iniciaron en los 100 ms siguientes al inicio de la vista. Este comportamiento está controlado por `TimeBasedTNSResourcePredicate`, que clasifica tales recursos como "iniciales".
Para personalizar el umbral por defecto de 100 ms para el cálculo de TNS, puedes ajustar el valor del umbral en `TimeBasedTNSResourcePredicate` y establecerlo para la opción de configuración `networkSettledResourcePredicate`. Esto te permite incluir recursos que se inician dentro de un intervalo de tiempo personalizado después del inicio de la vista:

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    networkSettledResourcePredicate: TimeBasedTNSResourcePredicate(
        threshold: 0.5 // Establece el umbral en 0.5 s
    )
  )
)

```

Si necesitas más control sobre qué recursos se consideran "iniciales" en TNS, puedes implementar tu propio predicado ajustando el protocolo `NetworkSettledResourcePredicate`. Esto te permite definir una lógica de clasificación personalizada basada en las propiedades de los recursos como la URL o la hora de inicio.

### Interaction to next view

**Interaction-to-Next-View (INV)** mide el tiempo transcurrido entre la última interacción del usuario en la vista anterior y el inicio de la vista actual. INV se representa mediante el atributo `@view.interaction_to_next_view_time` en los eventos de vista de RUM.


Por defecto, INV se calcula a partir de la última acción **tocar**, **hacer clic** o **deslizar** ocurrida dentro de un umbral de **3 segundos** antes del inicio de la vista. Este comportamiento está controlado por `TimeBasedINVActionPredicate`, que clasifica tales acciones como la "última interacción".

Para personalizar el umbral predeterminado de 3 segundos para el cálculo de ITNV, puedes ajustar el valor `maxTimeToNextView` en `TimeBasedINVActionPredicate` y configurarlo para la opción de configuración `nextViewActionPredicate`. Esto te permite incluir acciones dentro de un intervalo de tiempo personalizado antes de que se inicie la siguiente vista.

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    nextViewActionPredicate: TimeBasedINVActionPredicate(
        maxTimeToNextView: 5 // Establece el umbral en 5 s
    )
  )
)

```

Si necesitas tener más control sobre qué interacciones se consideran "última interacción" en INV, puedes implementar tu propio predicado ajustando el protocolo `NextViewActionPredicate`. Esto te permite definir una lógica de clasificación personalizada basada en las propiedades de la acción como el tipo, el nombre o el tiempo hasta la siguiente vista.


### Notificar al SDK que la vista terminó de cargarse

iOS RUM realiza un seguimiento del tiempo que tarda en cargarse la vista. Para notificar al SDK que la vista terminó de cargarse, llama al método `addViewLoadingTime(override:)`
a través de la instancia `RUMMonitor`. Llama a este método cuando la vista esté cargada por completo y se muestre al usuario:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
@_spi(Experimental)
import DatadogRUM

func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addViewLoadingTime(override: false)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
(void)onHeroImageLoad {
    [[DDRUMMonitor shared] addViewLoadingTimeWithOverride:NO | YES];
}
```
{{% /tab %}}
{{< /tabs >}}

Utiliza la opción `override` para sustituir el tiempo de carga calculado anteriormente para la vista actual.

Una vez enviado el tiempo de carga, es accesible como `@view.loading_time` y es visible en la interfaz de usuario de RUM.

**Nota**: Esta API todavía se está probando y podría cambiar en el futuro.

### Añadir tus propios tiempos de rendimiento

Además de los atributos por defecto de RUM, puedes medir dónde pasa el tiempo tu aplicación utilizando la API `addTiming(name:)`. La medida del tiempo es relativa al inicio de la vista actual de RUM.

Por ejemplo, puedes cronometrar el tiempo que tarda en aparecer tu imagen principal:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Una vez ajustado el tiempo, es accesible como `@view.custom_timings.<timing_name>`. Por ejemplo, `@view.custom_timings.hero_image`.

Para crear visualizaciones en tus dashboards, [crea una medida][1] primero.

## Interpretación de los tiempos de rendimiento
Todos los tiempos de las vistas se miden en relación con el inicio de la vista. El momento exacto en que comienza una vista depende del tipo de instrumentación utilizado para el seguimiento de las vistas. Para obtener más información, consulta [Instrumentación de las vistas en comparación con el ciclo de vida de la aplicación][2].

## Resolución de problemas
Cuando se utilizan los valores por defecto `TimeBasedInitialResourceIdentifier` y `TimeBasedInteractionIdentifier`, pueden faltar los tiempos TNS e INV en determinados casos:

- `@view.interaction_to_next_view_time` (INV) no se establece para la primera vista de una sesión si no se realizó el seguimiento de las acciones **tocar**, **hacer clic** o **deslizar** en la vista anterior, o si el intervalo entre la última acción de este tipo y el inicio de la vista actual supera los 3 segundos.
- `@view.network_settled_time` (TNS) no está disponible si no se realizó el seguimiento de ningún recurso durante la vista, o si no se inició ninguno en los 100 ms iniciales de la vista.

Para maximizar la precisión de TNS e INV, considera ajustar los umbrales de tiempo en los predicados por defecto para alinearlos con el comportamiento de tu aplicación, o implementa predicados personalizados según tus necesidades.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/#views-instrumentation-versus-app-lifecycle