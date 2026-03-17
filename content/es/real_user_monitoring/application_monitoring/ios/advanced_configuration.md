---
aliases:
- /es/real_user_monitoring/ios/advanced_configuration
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /es/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configure la configuración avanzada del SDK de iOS RUM para enriquecer
  las sesiones de usuario, realizar un seguimiento de los eventos personalizados y
  controlar la recopilación de datos para obtener mejores conocimientos.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: Código fuente para ddsdkios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM &amp; Session Replay
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: RUM iOS y tvOS soportan versiones de monitoreo
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Integración de Datadog para Apollo iOS
title: Configuración avanzada de iOS
---
Si aún no ha configurado el SDK de RUM iOS, siga las [instrucciones de configuración de la aplicación][1] o consulte la [documentación de configuración de RUM iOS][2].

## Enriquecer sesiones de usuario

iOS RUM rastrea automáticamente atributos como la actividad del usuario, pantallas, errores y solicitudes de red. Consulte la [documentación de recopilación de datos de RUM][3] para obtener información sobre los eventos de RUM y los atributos predeterminados. Puede enriquecer aún más la información de sesión del usuario y obtener un control más preciso sobre los atributos recopilados mediante el seguimiento de eventos personalizados.

### 

Además de [rastrear vistas automáticamente](#automatically-track-views), también puede rastrear vistas distintas específicas, como `viewControllers` cuando se vuelven visibles e interactivas. Detener el seguimiento cuando la vista ya no sea visible utilizando los siguientes métodos en `RUMMonitor.shared()`:

- `.startView(viewController:)`
- `.stopView(viewController:)`

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:
let rum = RUMMonitor.shared()

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@import DatadogRUM;
// in your `UIViewController`:

DDRUMMonitor *rum = [DDRUMMonitor shared];

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

Para obtener más detalles y opciones disponibles, consulte [`RUMMonitorProtocol` en GitHub][4].

### Acciones personalizadas

Además de [rastrear acciones automáticamente](#automatically-track-user-actions), puede rastrear acciones de usuario personalizadas específicas (toques, clics y desplazamientos) con la API de `addAction(type:name:)`.

Para registrar manualmente acciones instantáneas del RUM, como `.tap` en `RUMMonitor.shared()`, utilice `.addAction(type:name:)`. Para acciones continuas de RUM como `.scroll`, use `.startAction(type:name:)` o `.stopAction(type:)`.

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Al utilizar `.startAction(type:name:)` y `.stopAction(type:)`, el `type` de acción debe ser el mismo. Esto es necesario para que el SDK de RUM iOS coincida con el inicio de la acción con su finalización.

Para obtener más detalles y opciones disponibles, consulte [`RUMMonitorProtocol` en GitHub][4].

### Recursos personalizados

Además de [rastrear recursos automáticamente](#automatically-track-network-requests), también puede rastrear recursos personalizados específicos, como solicitudes de red o API de proveedores externos. Utilice los siguientes métodos en `RUMMonitor.shared()` para recopilar manualmente recursos de RUM:

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: El `String` utilizado para `resourceKey` en ambas llamadas debe ser único para el recurso al que llama. Esto es necesario para que el SDK de iOS de RUM coincida con el inicio de un recurso con su finalización.

Para obtener más detalles y opciones disponibles, consulte [`RUMMonitorProtocol` en GitHub][4].

### Errores personalizados

Para realizar un seguimiento de errores específicos, notifique a la `RUMMonitor.shared()` cuando se produzca un error utilizando uno de los métodos siguientes:

- `.addError(message:)`
- `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Para obtener más detalles y opciones disponibles, consulte [`RUMMonitorProtocol` en GitHub][4] y [Documentación de atributos de error][5].

## Seguimiento de atributos globales personalizados

Además de los [atributos predeterminados de RUM][6] capturados por el SDK de iOS de RUM automáticamente, puede elegir agregar información contextual adicional (como atributos personalizados) a sus eventos de RUM para enriquecer su observabilidad dentro de Datadog.

Los atributos personalizados le permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel del comerciante o la campaña publicitaria) con información de nivel de código (como servicios de backend, cronología de sesión, registros de errores y estado de la red).

<div class="alert alert-info">Los atributos personalizados están destinados a piezas de información pequeñas y específicas (por ejemplo, ID, banderas o etiquetas cortas). Evite adjuntar objetos grandes como cargas útiles de respuesta HTTP completa. Esto puede aumentar significativamente el tamaño del evento y afectar el rendimiento.</div>

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, use `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Para agregar un atributo, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Para actualizar el valor, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Para quitar la clave, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Para un mejor rendimiento en operaciones masivas (modificación de varios atributos a la vez), utilice `.addAttributes(_:)` y `.removeAttributes(forKeys:)`. 

**Nota**: No puede crear facetas en atributos personalizados si utiliza espacios o caracteres especiales en sus nombres clave. Por ejemplo, utilice `forKey: "store_id"` en lugar de `forKey: "Store ID"`.

### Seguimiento de las sesiones de usuario

Agregar información de usuario a tus sesiones de RUM facilita:

* Seguir el viaje de un usuario
*  determinadoSaber qué usuarios son los más afectados por errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la IU de RUM" >}}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Identificador de usuario único.                                              |
| `usr.name`  | String | (Optional) Nombre amigable para el usuario, que se muestra de forma predeterminada en la interfaz de usuario del RUM.              |
| `usr.email` | String | (Optional) Correo electrónico del usuario, que se muestra en la interfaz de usuario del RUM si el nombre de usuario no está presente. |

Para identificar sesiones de usuario, utilice la API del `Datadog.setUserInfo(id:name:email:)`.

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Seguir eventos de fondo

<div class="alert alert-info"><p>El seguimiento de eventos en segundo plano puede generar sesiones adicionales, lo que puede afectar a la facturación. Para preguntas, <a href="https://docs.datadoghq.com/help/">contacte con soporte de Datadog.</a></p>
</div>

Puede realizar un seguimiento de eventos como bloqueos y solicitudes de red cuando su aplicación está en segundo plano (por ejemplo, no hay vista activa disponible).

Para realizar un seguimiento de los eventos en segundo plano, agregue el siguiente fragmento durante la inicialización en su configuración de Datadog:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```
Parámetros 
## de inicialización

Puede utilizar las siguientes propiedades en `Datadog.Configuration` al crear la configuración de Datadog para inicializar la biblioteca:

`backgroundTasksEnabled`
: Esta bandera determina si los métodos de `UIApplication` `beginBackgroundTask(expirationHandler:)` y `endBackgroundTask:` se utilizan para realizar cargas en segundo plano. Activar esta marca podría aumentar la cantidad de tiempo que la aplicación funciona en segundo plano en 30 segundos. Las tareas normalmente se detienen cuando no hay nada que cargar o cuando te encuentras con un bloqueador para cargar, como no tener conexión a Internet o tener poca batería. De forma predeterminada, esta bandera se establece en `false`.

`batchProcessingLevel`
: El nivel de procesamiento por lotes define el número máximo de lotes procesados secuencialmente sin demora dentro de un ciclo de lectura/carga. El valor predeterminado es `.medium`.

`batchSize`
: Establece el tamaño preferido de los datos por lotes cargados en Datadog. Este valor afecta el tamaño y el número de solicitudes realizadas por el SDK de iOS de RUM (lotes pequeños significan más solicitudes, pero cada solicitud se vuelve más pequeña en tamaño). Los valores disponibles incluyen: `.small`, `.medium` y `.large`.

`bundle`
: El objeto bundle que contiene el ejecutable actual.

`clientToken`
: El token cliente RUM (que soporta RUM, Logging y APM) o el token cliente regular (que soporta Logging y APM).

`encryption`
: Cifrado de datos para usar en la persistencia de datos en disco proporcionando un objeto que cumpla con el protocolo `DataEncryption`.

`env`
: El nombre del entorno que se envía a Datadog. Esto se puede utilizar para filtrar eventos por diferentes entornos (como `staging` o `production`).

`proxyConfiguration`
: Un atributo de configuración proxy que se puede utilizar para habilitar un proxy personalizado para cargar datos rastreados en la entrada de Datadog.

`serverDateProvider`
: Una interfaz de sincronización NTP personalizada. De forma predeterminada, el Datadog SDK se sincroniza con los grupos NTP dedicados proporcionados por [NTP Pool Project][7]. El uso de diferentes grupos o la configuración de una implementación de `ServerDateProvider` sin operación resulta en una desincronización de la instancia del SDK y los servidores Datadog. Esto puede conducir a cambios de tiempo significativos en las sesiones de RUM o trazas distribuidas.

`service`
: El nombre del servicio asociado con los datos enviados a Datadog. El valor predeterminado es el identificador del paquete de aplicaciones.

`site`
: El endpoint del servidor Datadog al que se envían los datos. El valor predeterminado es `.us1`.

`uploadFrequency`
: La frecuencia preferida de carga de datos a Datadog. Los valores disponibles incluyen: `.frequent`, `.average` y configuración `.rare`.

### RUM

Puede utilizar las siguientes propiedades en `RUM.Configuration` al habilitar RUM:

`actionEventMapper`
: Establece la devolución de llamada de depuración de datos para acciones. Esto se puede utilizar para modificar o eliminar eventos de acción antes de que se envíen a Datadog. Para obtener más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`appHangThreshold`
: Establece el umbral para informar cuando una aplicación se cuelga. El valor mínimo permitido para esta opción es de `0.1` segundos. Para desactivar la presentación de informes, establezca este valor en `nil`. Para obtener más información, consulte [Añadir informe de colgar aplicación][8].

`applicationID`
: El identificador de la aplicación RUM.

`customEndpoint`
: Una URL de servidor personalizada para enviar datos de RUM.

`errorEventMapper`
: La devolución de llamada de depuración de datos para errores. Esto se puede utilizar para modificar o eliminar eventos de error antes de que se envíen a Datadog. Para obtener más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
: La devolución de llamada de depuración de datos para tareas largas. Esto se puede utilizar para modificar o eliminar eventos de tareas largas antes de que se envíen a Datadog. Para obtener más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`longTaskThreshold`
: El umbral para el seguimiento de tareas largas de RUM (en segundos). Por defecto, esto se envía a `0.1` segundos.

`networkSettledResourcePredicate`
: El predicado utilizado para clasificar los recursos "iniciales" para el cálculo de temporización de vista TimetoNetworkSettled (TNS).

`nextViewActionPredicate`
: El predicado utilizado para clasificar la "última" acción para el cálculo de temporización InteractiontoNextView (INV).

`onSessionStart`
: (Opcional) El método que se llama cuando RUM inicia la sesión.

`resourceEventMapper`
: La devolución de llamada de depuración de datos para recursos. Esto se puede utilizar para modificar o eliminar eventos de recursos antes de que se envíen a Datadog. Para obtener más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`sessionSampleRate`
: La frecuencia de muestreo para las sesiones del RUM. El valor de `sessionSampleRate` debe estar entre `0.0` y `100.0`. Un valor de `0.0` significa que no se envían sesiones, mientras que `100.0` significa que todas las sesiones se envían a Datadog. El valor predeterminado es `100.0`.

`telemetrySampleRate`
: La frecuencia de muestreo para la telemetría interna del SDK utilizada por Datadog. Esta tasa controla el número de solicitudes comunicadas al sistema de localización. Este debe ser un valor entre `0` y `100`. De forma predeterminada, se establece en `20`.

`trackAnonymousUser`
: Cuando está habilitado, el SDK genera un ID de usuario anónimo único y no personal que persiste en todos los lanzamientos de aplicaciones. Este ID se adjuntará a cada sesión de RUM, lo que le permitirá vincular sesiones originadas en el mismo usuario/dispositivo sin recopilar datos personales. De forma predeterminada, se establece en `true`.

`trackBackgroundEvents`
: Determina si los eventos de RUM se rastrean cuando no hay vista activa. De forma predeterminada, se establece en `false`.

`trackFrustrations`
: Determina si el seguimiento automático de las frustraciones del usuario está habilitado. De forma predeterminada, se establece en `true`.

`trackMemoryWarnings`
: Determina si el seguimiento automático de advertencias de memoria está habilitado. De forma predeterminada, se establece en `true`.

`trackWatchdogTerminations`
: Determina si el SDK debe rastrear las terminaciones de aplicaciones realizadas por Watchdog. La configuración predeterminada es `false`.

`uiKitActionsPredicate`
: Permite rastrear las interacciones del usuario (taps) como acciones del RUM. Puedes usar la implementación predeterminada de `predicate` configurando el `DefaultUIKitRUMActionsPredicate` o implementando [tu propio `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personalizado para tu app.

`uiKitViewsPredicate`
: Habilita el seguimiento de `UIViewControllers` como vistas de RUM. Puede usar la implementación predeterminada de `predicate` configurando la `DefaultUIKitRUMViewsPredicate` o implementar [su propio `UIKitRUMViewsPredicate`](#automatically-track-views) personalizado para su aplicación.

`urlSessionTracking`
: Permite el seguimiento de tareas `URLSession` (peticiones de red) como recursos de RUM. El parámetro `firstPartyHostsTracing` define hosts que se categorizan como recursos `first-party` (si RUM está habilitado) y tienen información de rastreo inyectada (si la función de rastreo está habilitada). El parámetro `resourceAttributesProvider` define un cierre para proporcionar atributos personalizados para los recursos interceptados que se llama para cada recurso recopilado por el SDK de iOS de RUM. Este cierre se llama con información de tareas y puede devolver atributos de recursos personalizados o `nil` si no se deben adjuntar atributos.

`viewEventMapper`
: La devolución de llamada de depuración de datos para vistas. Esto se puede utilizar para modificar eventos de vista antes de que se envíen a Datadog. Para obtener más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: La frecuencia preferida para recoger vitales móviles. Los valores disponibles incluyen: `.frequent` (cada 100 ms), `.average` (cada 500 ms), `.rare` (cada 1 s) y `.never` (que deshabilita la monitorización de vitales).

### Seguimiento automático de vistas

Puedes rastrear automáticamente las vistas con UIKit y SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Para realizar un seguimiento automático de las vistas (`UIViewControllers`), utilice la opción `uiKitViewsPredicate` al habilitar RUM. De forma predeterminada, las vistas se nombran con el nombre de clase del controlador de vista. Para personalizarlo, proporcione su propia implementación del `predicate` que se ajusta al protocolo de `UIKitRUMViewsPredicate`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

Dentro de la implementación de `rumView(for:)`, la aplicación debe decidir si una instancia de `UIViewController` determinada debe iniciar una vista de RUM (devolver un valor) o no (devolver `nil`). El valor de `RUMView` devuelto debe especificar el `name` y puede proporcionar `attributes` adicionales para la vista RUM creada.

Por ejemplo, puedes configurar el predicado para que utilice la verificación de tipo explícita para cada controlador de vista de tu app:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Home")
        case is DetailsViewController:  return .init(name: "Details")
        default:                        return nil
        }
    }
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if ([viewController isKindOfClass:[HomeViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Home" attributes:@{}];
    }

    if ([viewController isKindOfClass:[DetailsViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Details" attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

Incluso puedes encontrar una solución más dinámica dependiendo de la arquitectura de tu app.

Por ejemplo, si los controladores de vista utilizan `accessibilityLabel` de forma coherente, puede nombrar las vistas por el valor de la etiqueta de accesibilidad:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        guard let accessibilityLabel = viewController.accessibilityLabel else {
            return nil
        }

        return RUMView(name: accessibilityLabel)
    }
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if (viewController.accessibilityLabel) {
        return [[DDRUMView alloc] initWithName:viewController.accessibilityLabel attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: El SDK de RUM iOS llama a `rumView(for:)` muchas veces mientras se ejecuta tu aplicación. Datadog recomienda mantener su implementación rápida y de un solo hilo.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Para realizar un seguimiento automático de las vistas con SwiftUI, utilice la opción `swiftUIViewsPredicate` al habilitar RUM.

El mecanismo para extraer un nombre de vista SwiftUI se basa en la reflexión. Como resultado, los nombres de las vistas pueden no ser siempre significativos. Si no se puede extraer un nombre significativo, se utiliza un nombre genérico como `AutoTracked_HostingController_Fallback` o `AutoTracked_NavigationStackController_Fallback`.

Puede usar el predicado predeterminado (`DefaultSwiftUIRUMViewsPredicate`) o proporcionar su propia implementación del protocolo `SwiftUIRUMViewsPredicate` para personalizar o filtrar los nombres de las vistas.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView?
}

// Example: Custom predicate to ignore fallback names and rename views
class CustomSwiftUIPredicate: SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView? {
        if extractedViewName == "AutoTracked_HostingController_Fallback" ||
           extractedViewName == "AutoTracked_NavigationStackController_Fallback" {
            return nil // Ignore fallback names
        }
        if extractedViewName == "MySpecialView" {
            return RUMView(name: "Special")
        }
        return RUMView(name: extractedViewName)
    }
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@protocol DDSwiftUIRUMViewsPredicate <NSObject>
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName;
@end

@interface CustomSwiftUIPredicate : NSObject <DDSwiftUIRUMViewsPredicate>
@end

@implementation CustomSwiftUIPredicate
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName {
    if ([extractedViewName isEqualToString:@"AutoTracked_HostingController_Fallback"] ||
        [extractedViewName isEqualToString:@"AutoTracked_NavigationStackController_Fallback"]) {
        return nil; // Ignore fallback names
    }
    if ([extractedViewName isEqualToString:@"MySpecialView"]) {
        return [[DDRUMView alloc] initWithName:@"Special" attributes:@{}];
    }
    return [[DDRUMView alloc] initWithName:extractedViewName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

**Nota:**
- Datadog recomienda habilitar el seguimiento de la vista de UIKit también, incluso si su aplicación está construida completamente con SwiftUI.
-  Las barras de pestañas no se rastrean automáticamente. Utilice el [seguimiento manual](#custom-views) para cada vista de pestañas para asegurarse de que se siguen.
-  Si utiliza el seguimiento automático y manual, es posible que vea eventos duplicados. Para evitar esto, confíe en un solo método de instrumentación o utilice un predicado personalizado para filtrar duplicados.
{{% /collapse-content %}}

### Seguimiento automático de acciones

####  del usuario

Para realizar un seguimiento automático de las acciones de toque del usuario con UIKit, establezca la opción `uiKitActionsPredicate` al habilitar RUM.

#### SwiftUI

Para realizar un seguimiento automático de las acciones de toque del usuario en SwiftUI, habilite la opción `swiftUIActionsPredicate` al habilitar RUM.

**Nota:**
- Datadog recomienda habilitar el seguimiento de acciones de UIKit también incluso para aplicaciones SwiftUI puras, ya que muchos componentes interactivos son UIKit debajo del capó.
-  En tvOS, solo se realiza un seguimiento de las interacciones de prensa en el control remoto. Solo se necesita un predicado UIKit para esto. Si tiene una aplicación SwiftUI pura pero desea realizar un seguimiento de las pulsaciones remotas en tvOS, también debe habilitar la instrumentación de UIKit.
- La implementación difiere entre iOS 18+ e iOS 17 y versiones inferiores:
  - **iOS 18 y versiones superiores:** La mayoría de las interacciones se realizan de forma fiable con nombres de componentes correctos (por ejemplo, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 y versiones inferiores:** El SDK no puede distinguir entre componentes interactivos y no interactivos (por ejemplo, Botón vs. Etiqueta). Por esa razón, las acciones se informan como `SwiftUI_Unidentified_Element`.
-  Si utiliza el seguimiento automático y manual, es posible que vea eventos duplicados. Esta es una limitación conocida. Para evitar esto, use solo un tipo de instrumentación ya sea automática o manual.
-  Puede usar el predicado predeterminado, `DefaultSwiftUIRUMActionsPredicate` o proporcionar el suyo propio para filtrar o renombrar acciones. También puedes desactivar la detección de legados (iOS 17 o inferior) si solo quieres un seguimiento fiable de iOS 18+:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Use the default predicate by disabling iOS 17 and below detection
let predicate = DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: false)

// Use your own predicate
class CustomSwiftUIActionsPredicate: SwiftUIRUMActionsPredicate {
    func rumAction(for componentName: String) -> RUMAction? {
        // Custom logic to filter or rename actions
        return RUMAction(name: componentName)
    }
}
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
// Use the default predicate by disabling iOS 17 and below detection
DDDefaultSwiftUIRUMActionsPredicate *swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:NO];

// Use your own predicate
@protocol DDSwiftUIRUMActionsPredicate <NSObject>
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName;
@end

@interface CustomSwiftUIActionsPredicate : NSObject <DDSwiftUIRUMActionsPredicate>
@end

@implementation CustomSwiftUIActionsPredicate
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName {
    // Custom logic to filter or rename actions
    return [[DDRUMAction alloc] initWithName:componentName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}Reporte de 

#### acciones por versión iOS

En la tabla siguiente se muestra cómo iOS 17 e iOS 18 informan de diferentes interacciones de usuario.ComponentiOS

| ****    | ** 18 informó del nombreiOS**                          | ** 17 informó del nombreButtonSwiftUI_ButtonSwiftUI_Unidentificated_ElementNavegaciónEnlaceNavegaciónEnlaceSwiftUI_Unidentificated_ElementMenuSwiftUI_Menu**             |
|------------------|---------------------------------------------------|--------------------------------------|
|            |                                     |          |
|    |                                     |          |
|              |  (y sus elementos como _UIContextMenuCell)| SwiftUI_Menu (y sus elementos como _UIContextMenuCell) |
| EnlaceSwiftUI_ButtonSwiftUI_Unidentificated_ElementSeguimiento automático             |                                     |          |

###  de las solicitudes de red

Las solicitudes de red se rastrean automáticamente después de habilitar RUM con la configuración de `urlSessionTracking`. 

####  (Opcional) Habilitar el desglose detallado de la temporización

Para obtener un desglose detallado de la temporización (resolución DNS, apretón de manos SSL, tiempo hasta el primer byte, tiempo de conexión y duración de la descarga), habilite `URLSessionInstrumentation` para su tipo de delegado:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enableDurationBreakdown(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**Nota**:
- Sin `URLSessionInstrumentation`, las solicitudes de red siguen siendo rastreadas. Habilitarlo proporciona un desglose detallado de la temporización para el análisis del rendimiento.
- Los datos de respuesta están disponibles en la devolución de llamada de `resourceAttributesProvider` (establecida en `RUM.Configuration.URLSessionTracking`) para tareas con controladores de finalización en modo automático y para todas las tareas después de habilitar la `URLSessionInstrumentation`.
- Para filtrar las solicitudes específicas del seguimiento, utilice el `resourceEventMapper` en `RUM.Configuration` (consulte [Modificar o soltar eventos RUM](#modify-or-drop-rum-events)).

<div class="alert alert-info">Tenga en cuenta la retención de delegados.
Si bien la instrumentación Datadog no crea fugas de memoria directamente, depende de los delegados de <code>URLSession</code>. Según la documentación</a> de <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> Apple:
"El objeto session mantiene una fuerte referencia al delegado hasta que tu app salga o invalide explícitamente la sesión. Si no invalidas la sesión llamando al método <code>invalidateAndCancel()</code> o <code>finishTasksAndInvalidate()</code>, tu app pierde memoria hasta que sale".
Para evitar pérdidas de memoria, asegúrese de invalidar cualquier instancia de <code>URLSession</code> que ya no necesite.
</div>


Si tienes más de un tipo de delegado en tu app que quieres instrumentar, puedes llamar a `URLSessionInstrumentation.enable(with:)` para cada tipo de delegado.

Además, puede configurar hosts de origen usando `urlSessionTracking`. Esto clasifica los recursos que coinciden con el dominio dado como "primera parte" en RUM y propaga la información de rastreo a su backend (si ha habilitado el rastreo). Las trazas de red se muestrean con una frecuencia de muestreo ajustable. Por defecto se aplica un muestreo del 20%.

Por ejemplo, puede configurar `example.com` como el anfitrión de la primera parte y habilitar las características de RUM y Trazado:

[10]: https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters
{{< tabs >}}
{{% tab "Swift" %}}
```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```

Esto rastrea todas las solicitudes enviadas con el `session` instrumentado. Las solicitudes que coinciden con el dominio `example.com` se marcan como "primera parte" y la información de rastreo se envía a su backend para [conectar el recurso RUM con su Trace][1].


[1]: https://docs.datadoghq.com/es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

Para agregar atributos personalizados a los recursos, utilice la opción `URLSessionTracking.resourceAttributesProvider` al habilitar el RUM. Al establecer el cierre del proveedor de atributos, puede devolver atributos adicionales que se adjuntarán al recurso rastreado.

Por ejemplo, es posible que desee agregar encabezados de solicitud y respuesta HTTP al recurso RUM:

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

Si no desea realizar un seguimiento de las solicitudes, puede desactivar URLSessionInstrumentation para el tipo de delegado:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

#### Instrumentación Apollo
Instrumentación Apollo en su aplicación iOS da visibilidad de RUM en errores y rendimiento de GraphQL. Debido a que todas las solicitudes de GraphQL van a un solo punto final y a menudo devuelven 200 OK incluso en caso de errores, la instrumentación HTTP predeterminada carece de contexto. Permite a RUM capturar el nombre de la operación, el tipo de operación y las variables (y opcionalmente la carga útil). Esto proporciona un contexto más detallado para cada solicitud de red.

Esta integración es compatible con Apollo iOS 1.0+ y Apollo iOS 2.0+. Sigue las instrucciones de la versión de Apollo iOS que tienes a continuación.

1. [Configurar][2] Monitoreo de RUM con Datadog iOS RUM.

2.  Añade lo siguiente al archivo de `Package.swift` de tu aplicación:

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Alternativamente, puede agregarlo usando Xcode:
   1. Ir al **Archivo** → **Agregar dependencias del paquete**.
   2. Ingrese la URL del repositorio: `https://github.com/DataDog/dd-sdk-ios-apollo-interceptor`.
   3. Seleccione la versión del paquete que coincida con su versión principal de Apollo (elija `1.x.x` para Apollo iOS 1.0+ o `2.x.x` para Apollo iOS 2.0+).

3. Configure la instrumentación de red basada en su versión de Apollo iOS:

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Configurar la instrumentación de red para la URL incorporada de ApolloSessionClient:

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Añade el interceptor Datadog a tu configuración de Apollo Client:

   ```swift
   import Apollo
   import DatadogApollo

   class CustomInterceptorProvider: DefaultInterceptorProvider {
       override func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
           var interceptors = super.interceptors(for: operation)
           interceptors.insert(DatadogApolloInterceptor(), at: 0)
           return interceptors
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Apollo iOS 2.0+" %}}

   Configure la instrumentación de red utilizando los `DatadogApolloDelegate` y `DatadogApolloURLSession` proporcionados:

   ```swift
   import Apollo
   import DatadogApollo
   import DatadogCore

   // Create the Datadog delegate
   let delegate = DatadogApolloDelegate()

   // Create the custom URLSession wrapper
   let customSession = DatadogApolloURLSession(
       configuration: .default,
       delegate: delegate
   )

   // Enable Datadog instrumentation for the delegate
   URLSessionInstrumentation.enable(
       with: .init(delegateClass: DatadogApolloDelegate.self)
   )

   // Configure Apollo Client with the custom session
   let networkTransport = RequestChainNetworkTransport(
       urlSession: customSession,
       interceptorProvider: NetworkInterceptorProvider(),
       store: store,
       endpointURL: url
   )
   ```

   Crear un proveedor de interceptores con el interceptor Datadog:

   ```swift
   import Apollo
   import DatadogApollo

   struct NetworkInterceptorProvider: InterceptorProvider {
       func graphQLInterceptors<Operation>(for operation: Operation) -> [any GraphQLInterceptor] where Operation : GraphQLOperation {
           return [DatadogApolloInterceptor()] + DefaultInterceptorProvider.shared.graphQLInterceptors(for: operation)
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

   Esto permite a Datadog RUM extraer el tipo de operación, nombre, variables y cargas útiles (opcional) automáticamente de las solicitudes para enriquecer los recursos de GraphQL Requests RUM.

   <div class="alert alert-info">
     <ul>
       <li>La integración es compatible con las versiones <code>1.0+</code> y <code>2.0+</code> de Apollo iOS.</li>
       <li>Las operaciones de tipo <code>consulta</code> y <code>mutación</code> son rastreadas, las operaciones <code>de suscripción</code> no.</li>
       <li>El envío de carga útil de GraphQL está deshabilitado de forma predeterminada. Para habilitarlo, establezca el indicador <code>sendGraphQLPayloads</code> en el constructor <code>DatadogApolloInterceptor</code> de la siguiente manera:</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>
Seguimiento 
### automático de errores

Todos los registros de "errores" y "críticos" enviados con `Logger` se informan automáticamente como errores de RUM y se vinculan a la vista de RUM actual:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

Del mismo modo, todos los lapsos terminados marcados como error se reportan como errores de RUM:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modificar o eliminar eventos RUM

Para modificar los atributos de un evento de RUM antes de que se envíe a Datadog o para eliminar un evento por completo, utilice la API de mapeadores de eventos al configurar el SDK de iOS de RUM:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Cada mapeador es un cierre Swift con una firma de `(T) -> T?`, donde `T` es un tipo de evento concreto de RUM. Esto permite cambiar partes del evento antes de que se envíe.

Por ejemplo, para redactar información confidencial en el `url` de un recurso de RUM, implementar una función de `redacted(_:) -> String` personalizada y usarla en `resourceEventMapper`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```
{{% /tab %}}
{{% tab "Objetivo C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Devolver `nil` desde el mapeador de errores, recursos o acciones elimina el evento por completo; el evento no se envía a Datadog. El valor devuelto desde el mapeador de eventos de vista no debe ser `nil` (para soltar vistas, personalizar su implementación de `UIKitRUMViewsPredicate`; lea más en [seguimiento automático](#automatically-track-views) de vistas).

Dependiendo del tipo de evento, solo se pueden modificar algunas propiedades específicas:Clave de atributo 

| Tipo de evento       |                         | Descripción                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nombre de la acción.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vista vinculada a esta acción.Mensaje            |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Error.                                   |
|                  | `RUMErrorEvent.error.stack`          | Stacktrace del error.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL del recurso al que se refiere el error.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vista vinculada a este error.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL del recurso.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vista vinculada a este recurso.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | Nombre de la vista.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vista.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL que se vinculó a la vista inicial de la página. |

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puede adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que su equipo de soporte pueda encontrar la sesión de usuario en Datadog.

Puede acceder al ID de sesión de RUM en tiempo de ejecución sin esperar al evento de `sessionStarted`:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Establecer el consentimiento de seguimiento (cumplimiento de RGPD)

Para cumplir con la normativa GDPR, el SDK de iOS de RUM requiere el valor de consentimiento de seguimiento en la inicialización.

La configuración de `trackingConsent` puede ser uno de los siguientes valores:

1. `.pending`: El SDK de RUM iOS comienza a recopilar y a lotear los datos, pero no los envía a Datadog. El SDK de RUM iOS espera el nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos por lotes.
2. `.granted`: El SDK de RUM iOS comienza a recopilar los datos y los envía a Datadog.
3. `.notGranted`: El SDK de RUM iOS no recopila ningún dato. No se envían registros, rastros ni eventos de RUM a Datadog.

Para cambiar el valor de consentimiento de seguimiento después de inicializar el SDK de iOS de RUM, utilice la llamada a la API de `Datadog.set(trackingConsent:)`. El SDK de RUM iOS cambia su comportamiento de acuerdo con el nuevo valor.

Por ejemplo, si el consentimiento de seguimiento actual es `.pending`:

- Si cambia el valor a `.granted`, el SDK de RUM iOS envía todos los datos actuales y futuros a Datadog;
- Si cambia el valor a `.notGranted`, el SDK de RUM iOS borra todos los datos actuales y no recopila datos futuros.

## Añadir propiedades de usuario

Puede usar la API de `Datadog.addUserExtraInfo(_:)` para agregar propiedades de usuario adicionales a propiedades establecidas previamente.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```
Gestión de 
## datos

El SDK de iOS primero almacena eventos localmente y solo carga eventos cuando se cumplen las condiciones [especificaciones de admisión][9].

###  Borrar todos los datos

Tiene la opción de eliminar todos los datos no enviados almacenados por el SDK con la API de `Datadog.clearAllData()`.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Detener la recopilación de datos

Puede usar la API de `Datadog.stopInstance()` para evitar que una instancia de SDK con nombre (o la instancia predeterminada si el nombre es `nil`) recopile y cargue datos aún más.

```swift
import DatadogCore

Datadog.stopInstance()
```

Llamar a este método deshabilita el SDK y todas las características activas, como RUM. Para reanudar la recopilación de datos, debe reinicializar el SDK. Puedes usar esta API si quieres cambiar las configuraciones dinámicamente

## 

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/application_monitoring/ios
[3]: /es/real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /es/real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /es/real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#default-attributes
[7]: https://www.ntppool.org/en/
[8]: /es/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[9]: /es/real_user_monitoring/application_monitoring/ios/setup