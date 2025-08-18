---
description: Guía para la monitorización de aplicaciones React Native híbridas.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Más información sobre monitores RUM
title: Monitorizar aplicaciones React Native híbridas
---

## Información general

React Native es un marco de JavaScript para desarrollar aplicaciones móviles híbridas que pueden ejecutarse de forma nativa tanto en Android como en iOS.

Si tienes una aplicación híbrida que está creada sobre React Native, puedes usar Datadog para monitorizar la misma aplicación tanto desde el lado nativo de Android o iOS como desde el lado de React Native.

Los eventos RUM de ambas fuentes se notifican como procedentes de la misma aplicación y la misma fuente en Datadog RUM.

## Limitaciones

- Para el **rastreo de errores, recursos e interacciones**, los SDKs pueden funcionar de las siguientes maneras:
  - A través de la *Instrumentación automática*: algunas clases y métodos de React se modifican para automatizar esto. La instrumentación automática para errores, recursos e interacciones de JavaScript solo se puede iniciar desde el código de JavaScript.
  - A través de la *Instrumentación manual*: por ejemplo, si quieres informar de algo que consideras un error, pero que no va a colapsar la aplicación.
- Puedes compartir la misma instancia del SDK central entre nativo y React Native sin tener que inicializar el SDK en ambos lados por separado. Esto te permite inicializar el SDK nativo en el lado nativo o en el lado de React Native (llamando a `DdSdkReactNative.initialize`) y tenerlo inicializado para ambos lados, con eventos en la misma sesión RUM. React Native usa la instancia central por defecto. Esto significa que puedes usar la *Instrumentación manual* en ambos lados, pero la *Instrumentación automática* solo se activa para el lado en el que se inicializó el SDK.
- Puedes informar de eventos o logs de Datadog RUM sólo después de la inicialización. Si aún no inicializaste el SDK, no se envían eventos ni logs.
- No puedes cambiar el atributo de fuente de una sesión RUM; todos tus eventos RUM aparecen bajo la misma fuente.

## Monitorización de aplicaciones React Native con contenido nativo

Antes de que puedas empezar la monitorización de aplicaciones React Native con contenido nativo, necesitas inicializar el SDK de React Native.

### Inicializar el SDK de React Native

Para inicializar el SDK tanto en React Native como en el lado nativo, puedes seguir la [documentación de monitorización de React Native][1]. 

Con esta configuración, puedes llamar a los SDKs nativos y de React Native para logs, trazas (traces) y RUM.

Recomendamos esta solución si no has utilizado nuestro SDK en el lado nativo antes de inicializarlo en el lado de React Native.

{{< tabs >}}
{{% tab "Android" %}}
En Android, añade los SDKs de Datadog Android a tus dependencias en tu archivo `android/app/build.gradle`:

```java
// The version is set by @datadog/mobile-react-native
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

{{% /tab %}}
{{% tab "iOS" %}}

En iOS, añade los SDKs de iOS Datadog a tus dependencias en tu archivo ios/Podfile para utilizarlos en archivos Objective C:

```ruby
# Make sure the version matches the one from node_modules/@datadog/mobile-react-native/DatadogSDKReactNative.podspec
pod 'DatadogSDKObjc', '~> 2.5.0'
```

{{% /tab %}}
{{< /tabs >}}

### Rastreo de las visitas nativas de RUM

Si utilizas una biblioteca de navegación para tu aplicación React Native como `react-navigation`, al utilizar la opción de configuración `nativeViewTracking` se crean muchas vistas duplicadas.

Si este es el caso, rastrea tus Vistas RUM nativas manualmente. Consulta la documentación para [iOS][2] y para [Android][3].

### Rastreo de los recursos nativos de RUM

Si has habilitado el rastreo con tu backend, los hosts de origen para tus recursos RUM nativos son los mismos que para tus recursos RUM de React Native.

{{< tabs >}}
{{% tab "Android" %}}

Si utilizas OkHttp, puedes utilizar el interceptor de Datadog para [rastrear automáticamente las solicitudes de red][1]. Alternativamente, puedes [rastrear manualmente los recursos][2].

[1]: https://docs.datadoghq.com/es/real_user_monitoring/ios/advanced_configuration/?tab=objectivec#automatically-track-network-requests
[2]: https://docs.datadoghq.com/es/real_user_monitoring/android/advanced_configuration/?tab=kotlin#automatically-track-network-requests

{{% /tab %}}
{{% tab "iOS" %}}

Puedes realizar un rastreo de las solicitudes de red mediante la monitorización de tu `URLSession`. Obtén más información sobre cómo [realizar un rastreo automático de las solicitudes de red][3].

[3]: https://docs.datadoghq.com/es/real_user_monitoring/android/advanced_configuration/?tab=kotlin#custom-resources
{{% /tab %}}
{{< /tabs >}}

### Limitaciones

Si escribes algún código nativo que dependa del SDK de Datadog, asegúrate de ejecutar ese código **después** de inicializar el SDK en el lado de React Native. Cuando inicializas el SDK en el lado de React Native, también se inicializa en el lado nativo.

## Monitorización de aplicaciones nativas con pantallas de React Native

Antes de que puedas empezar la monitorización de aplicaciones React Native con contenido nativo, necesitas inicializar el SDK de React Native.

### Inicializar el SDK de React Native

Instala el SDK de React Native Datadog con las siguientes opciones de comando:

```shell
yarn add @datadog/mobile-react-native
```

o

```shell
npm install @datadog/mobile-react-native
```

{{< tabs >}}
{{% tab "Android" %}}

Añade el SDK de Android Datadog a tus dependencias en tu archivo `android/app/build.gradle`:

```gradle
// The version is set by @datadog/mobile-react-native
implementation "com.datadoghq:dd-sdk-android-rum"
implementation "com.datadoghq:dd-sdk-android-logs"
implementation "com.datadoghq:dd-sdk-android-trace"
implementation "com.datadoghq:dd-sdk-android-webview"
```

Inicializa el SDK en el lado nativo. Consulta la documentación oficial de [Android][1] para obtener instrucciones.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/setup/?tab=kotlin

{{% /tab %}}
{{% tab "iOS" %}}

Inicializa el SDK en el lado nativo. Consulta la documentación oficial de [iOS][1] para obtener instrucciones.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/setup/?tab=cocoapods

{{% /tab %}}
{{< /tabs >}}

### Instrumentación de vistas RUM de React Native

{{< tabs >}}
{{% tab "Android" %}}

Utiliza un `ComponentPredicate` para filtrar las vistas nativas creadas por tus bibliotecas de navegación:

```kotlin
// Adapt the Fragment type to your View tracking strategy
class RNComponentPredicate : ComponentPredicate<Fragment> {
    override fun accept(component: Fragment): Boolean {
        // Identify and drop react native screen views
        if (component.javaClass.name.startsWith("com.swmansion.rnscreens")) {
            return false
        }
        if (component.javaClass.name.startsWith("com.facebook.react")) {
            return false
        }
        return true
    }

    override fun getViewName(component: Fragment): String? {
        return null
    }
}

// Use it in your RUM configuration
rumConfiguration.useViewTrackingStrategy(FragmentViewTrackingStrategy(true, RNComponentPredicate()))
```
A continuación, utiliza `@datadog/mobile-react-navigation` para realizar un rastreo de tus vistas.

Si has activado el enmascaramiento de ProGuard, añade reglas para evitar el enmascaramiento de los paquetes de destino en las compilaciones de lanzamiento.

{{% /tab %}}
{{% tab "iOS" %}}

Utiliza un `UIKitRUMViewsPredicate` para filtrar las vistas nativas creadas por tus bibliotecas de navegación:

```swift
class RNHybridPredicate: UIKitRUMViewsPredicate {
    var defaultPredicate = DefaultUIKitRUMViewsPredicate()

    func rumView(for viewController: UIViewController) -> RUMView? {
        let canonicalClassName = NSStringFromClass(type(of: viewController))
        // Dropping RN Views
        if (canonicalClassName.starts(with: "RN")) {
            return nil
        }

        return defaultPredicate.rumView(for: viewController)
    }
}

// Use it in your RUM configuration
let rumConfiguration = RUM.Configuration(
    applicationID: applicationId,
    uiKitViewsPredicate: RNHybridPredicate(),
)
```

{{% /tab %}}
{{< /tabs >}}

### Instrumentación de errores, interacciones y recursos de React Native

Envuelve tu aplicación React Native con el componente `DatadogProvider` para registrar automáticamente errores, interacciones y recursos de React Native RUM:

```jsx
const configuration = {
    trackResources: true,
    trackErrors: true,
    trackInteractions: true
};

const RNApp = props => {
    useEffect(() => {
        /**
         * In here we can put fake values. The only goal of this call
         * is to empty the buffer of RUM events.
         */
        DatadogProvider.initialize({
            clientToken: 'fake_value',
            env: 'fake_value',
            applicationId: 'fake_value'
        });
    }, []);
    const navigationRef = useRef(null);

    return (
        <DatadogProvider configuration={configuration}>
            {/* Content of your app goes here */}
        </DatadogProvider>
    );
};

AppRegistry.registerComponent('RNApp', () => RNApp);
```

Para eliminar las interacciones duplicadas en **Android**, filtra las interacciones de React Native en el lado nativo con un EventMapper:

```kotlin
class RNActionEventMapper : EventMapper<ActionEvent> {
    override fun map(event: ActionEvent): ActionEvent? {
        var targetClassName = (event.context?.additionalProperties?.get("action.target.classname") as? String)
        if(targetClassName?.startsWith("com.facebook.react") == true) {
            return null
        }
        return event
    }
}

// Use it in your RUM configuration
rumConfiguration.setActionEventMapper(RNActionEventMapper())
```

Si has activado el enmascaramiento de ProGuard, añade reglas para evitar el enmascaramiento de los paquetes de destino en las compilaciones de lanzamiento.

### Limitaciones

Si has especificado un `resourceEventMapper` o `actionEventMapper` en tu configuración de React Native, los recursos y acciones no serán eliminados si devuelves `null` en el asignador.

Para mantener esta funcionalidad, añade los siguientes fragmentos en tu configuración nativa para tu plataforma:

{{< tabs >}}
{{% tab "Android" %}}

```kotlin
val config = RumConfiguration.Builder(applicationId = appId)
 .setResourceEventMapper(object : EventMapper<ResourceEvent> {
        override fun map(event: ResourceEvent): ResourceEvent? {
            if (event.context?.additionalProperties?.containsKey("_dd.resource.drop_resource") == true) {
                return null
            }
            // You can add your custom event mapper logic here
            return event
        }
    })
 .setActionEventMapper(object : EventMapper<ActionEvent> {
        override fun map(event: ActionEvent): ActionEvent? {
            if (event.context?.additionalProperties?.containsKey("_dd.action.drop_action") == true) {
                return null
            }
            // You can add your custom event mapper logic here
            return event
        }
    })
```

{{% /tab %}}
{{% tab "iOS" %}}

```swift
RUM.Configuration(
    applicationID: applicationId,
    resourceEventMapper: { resourceEvent in
        if resourceEvent.context?.contextInfo["_dd.resource.drop_resource"] != nil {
            return nil
        }
        // You can add your custom event mapper logic here
        return resourceEvent
    },
    actionEventMapper: { actionEvent in
        if actionEvent.context?.contextInfo["_dd.resource.drop_action"] != nil {
            return nil
        }
        // You can add your custom event mapper logic here
        return resourceEvent
    }
)
```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/?tab=swift#custom-views
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#custom-views