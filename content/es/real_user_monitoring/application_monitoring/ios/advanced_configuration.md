---
aliases:
- /es/real_user_monitoring/ios/advanced_configuration
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /es/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configura los ajustes avanzados del kit de desarrollo de software (SDK)
  de iOS RUM para enriquecer las sesiones de usuario, realizar un seguimiento de los
  eventos personalizados y controlar la recopilación de datos para obtener mejor información.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: RUM y Session Replay
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentación
  text: Versiones compatibles de la monitorización de RUM iOS y tvOS
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Código fuente
  text: Integración de Datadog para Apollo iOS
title: Configuración avanzada de iOS
---

Si aún no has configurado el SDK de RUM iOS, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de RUM iOS][2].

## Mejorar las sesiones de usuario

iOS RUM rastrea automáticamente atributos como la actividad de usuario, las pantallas, los errores y las solicitudes de red. Consulta la [documentación de recopilación de datos de RUM][3] para obtener información sobre los eventos de RUM y los atributos predeterminados. Para mejorar aún más la información de sesión de usuario y obtener un control más preciso sobre los atributos recopilados, puedes rastrear eventos personalizados.

### Vistas personalizadas

Además de [rastrear vistas automáticamente](#automatically-track-views), también puedes rastrear vistas específicas como `viewControllers` cuando se vuelven visibles e interactivas. Detén el rastreo cuando la vista deje de ser visible con los siguientes métodos en `RUMMonitor.shared()`:

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
{{% tab "Objective-C" %}}
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

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4].

### Acciones personalizadas

Además de [rastrear acciones automáticamente](#automatically-track-user-actions), puedes rastrear acciones específicas del usuario (toques, clics y desplazamientos) con la API `addAction(type:name:)`.

Para registrar manualmente acciones de RUM instantáneas como `.tap` en `RUMMonitor.shared()`, utiliza `.addAction(type:name:)`. Para acciones de RUM continuas como `.scroll`, utiliza `.startAction(type:name:)` o `.stopAction(type:)`.

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
{{% tab "Objective-C" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Cuando se utiliza `.startAction(type:name:)` y `.stopAction(type:)`, la acción `type` debe ser la misma. Esto es necesario para que el SDK de RUM iOS haga coincidir el inicio de una acción con su finalización.

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4].

### Recursos personalizados

Además de [rastrear recursos automáticamente](#automatically-track-red-requests), también puedes rastrear recursos personalizados específicos, como solicitudes de red o API de proveedores de terceros. Utiliza los siguientes métodos en `RUMMonitor.shared()` para recopilar manualmente recursos de RUM:

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
{{% tab "Objective-C" %}}
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

**Nota**: La `String` utilizada para `resourceKey` en ambas llamadas debe ser única para el recurso que estás llamando. Esto es necesario para que el SDK de RUM iOS haga coincidir el inicio de un recurso con su finalización.

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4].

### Errores personalizados

Para realizar un rastreo de errores específicos, notifica `RUMMonitor.shared()` cuando se produzca un error utilizando uno de los siguientes métodos:

- `.addError(message:)`
- `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4] y la [documentación de Atributos de error][5].

## Rastreo de atributos globales personalizados

Además de los [atributos RUM predeterminados][6] capturados por el SDK de RUM iOS automáticamente, puedes optar por añadir información contextual adicional (como atributos personalizados) a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog.

Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la cronología de la sesión, los logs de error y el estado de la red).

<div class="alert alert-info">Los atributos personalizados están pensados para pequeños fragmentos de información específicos (por ejemplo, ID, marcadores o etiquetas (labels) cortas). Evita adjuntar objetos grandes, como cargas útiles de respuesta HTTP completas. Esto puede aumentar significativamente el tamaño de los eventos y afectar al rendimiento.</div>

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, utiliza `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Para añadir un atributo, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Para actualizar el valor, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Para extraer la clave, utiliza `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Para un mejor rendimiento en operaciones en bloque (modificar varios atributos a la vez), utiliza `.addAttributes(_:)` y `.removeAttributes(forKeys:)`.

**Nota**: No se pueden crear facetas sobre atributos personalizados si se utilizan espacios o caracteres especiales en los nombres de las claves. Por ejemplo, utiliza `forKey: "store_id"` en lugar de `forKey: "Store ID"`.

### Rastreo de las sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:

* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" >}}

| Atributo   | Tipo   | Descripción                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Cadena | (Obligatorio) Identificador único de usuario.                                              |
| `usr.name`  | Cadena | (Opcional) Nombre fácil de usar, mostrado por defecto en la interfaz de usuario de RUM.              |
| `usr.email` | Cadena | (Opcional) Correo electrónico del usuario, mostrado en la interfaz de usuario de RUM si el nombre de usuario no está presente. |

Para identificar las sesiones de usuario, utiliza la API `Datadog.setUserInfo(id:name:email:)`.

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Rastrear eventos en segundo plano

<div class="alert alert-info"><p>El rastreo de eventos en segundo plano puede dar lugar a sesiones adicionales, lo que puede afectar a la facturación. Si tienes dudas, <a href="https://docs.datadoghq.com/help/">contacta con el equipo de soporte de Datadog.</a></p>
</div>

Puedes realizar un rastreo de eventos, como fallos y solicitudes de red, cuando tu aplicación está en segundo plano (por ejemplo, no hay ninguna vista activa).

Para realizar un rastreo de eventos en segundo plano, añade el siguiente fragmento durante la inicialización en tu configuración de Datadog:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Parámetros de inicialización

Puedes utilizar las siguientes propiedades en `Datadog.Configuration` al crear la configuración de Datadog para inicializar el biblioteca:

`backgroundTasksEnabled`
: este indicador determina si los métodos de `UIApplication` `beginBackgroundTask(expirationHandler:)` y `endBackgroundTask:` se utilizan para realizar cargas en segundo plano. Activar esta opción puede aumentar en 30 segundos el tiempo que la aplicación funciona en segundo plano. Normalmente, las tareas se detienen cuando no hay nada que subir o cuando se encuentra un bloqueo a la subida, como no tener conexión a Internet o tener poca batería. Por defecto, este indicador está configurado en `false`.

`batchProcessingLevel`
: el nivel de procesamiento de lotes define el número máximo de lotes procesados secuencialmente sin retraso dentro de un ciclo de lectura/carga. El valor por defecto es `.medium`.

`batchSize`
: establece el tamaño preferido de los datos por lotes cargados en Datadog. Este valor influye en el tamaño y el número de solicitudes realizadas por el SDK de RUM iOS (lotes pequeños significan más solicitudes, pero cada solicitud se hace más pequeña en tamaño). Los valores disponibles son: `.small`, `.medium` y `.large`.

`bundle`
: el objeto bundle que contiene el ejecutable actual.

`clientToken`
: el token de cliente de RUM (que admite RUM, rastreo y APM) o el token de cliente normal (que admite registro y APM).

`encryption`
: cifrado de datos a utilizar para la persistencia de datos en disco proporcionando un objeto que cumpla con el protocolo `DataEncryption`.

`env`
: el nombre de entorno que se envía a Datadog. Esto puede utilizarse para filtrar eventos por diferentes entornos (como `staging` o `production`).

`proxyConfiguration`
: un atributo de configuración de proxy que puede utilizarse para habilitar un proxy personalizado para cargar los datos rastreados en la admisión de Datadog.

`serverDateProvider`
: una interfaz de sincronización NTP personalizada. Por defecto, el SDK de Datadog sincroniza con grupos de NTP dedicados proporcionados por el [Proyecto de grupos de NTP][7]. El uso de diferentes grupos o la configuración de una implementación de no operación `ServerDateProvider` resulta en una desincronización de la instancia del SDK y los servidores de Datadog. Esto puede llevar a cambios de tiempo significativos en las sesiones de RUM o trazas distribuidas.

`service`
: el nombre de servicio asociado a los datos enviados a Datadog. El valor por defecto es el identificador del paquete de aplicaciones.

`site`
: el endpoint del servidor de Datadog al que se envían los datos. El valor por defecto es `.us1`.

`uploadFrequency`
: la frecuencia preferida de carga de datos en Datadog. Los valores disponibles son: `.frequent`, `.average` y `.rare`.

### Configuración de RUM

Puedes utilizar las siguientes propiedades en `RUM.Configuration` al activar RUM:

`actionEventMapper`
: establece la devolución de llamadas de limpieza de acciones. Puede utilizarse para modificar o soltar los eventos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`appHangThreshold`
: establece el umbral para informar cuando una aplicación se cuelga. El valor mínimo permitido para esta opción es `0.1` segundos. Para desactivar los informes, establece este valor en `nil`. Para obtener más información, consulta [Añadir informes de aplicaciones colgadas][8].

`applicationID`
: el identificador de la aplicación RUM.

`customEndpoint`
: una URL de servidor personalizada para enviar datos de RUM.

`errorEventMapper`
: la devolución de llamadas de limpieza de errores. Puede utilizarse para modificar o soltar los eventos de error antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
: la devolución de llamadas de limpieza de tareas largas. Puede utilizarse para modificar o soltar tareas largas antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`longTaskThreshold`
: el umbral para el rastreo de tareas largas en RUM (en segundos). Por defecto, se envía a `0.1` segundos.

`networkSettledResourcePredicate`
: la predicción utilizada para clasificar los recursos "iniciales" para el cálculo de tiempo de la vista Time-to-Network-Settled (TNS).

`nextViewActionPredicate`
: la predicción utilizada para clasificar la "última" acción para el cálculo del tiempo de  Interaction-to-Next-View (INV).

`onSessionStart`
: (opcional) el método que se llama cuando RUM inicia la sesión.

`resourceEventMapper`
: la devolución de llamadas de limpieza de recursos. Puede utilizarse para modificar o soltar los eventos de recursos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`sessionSampleRate`
: la frecuencia de muestreo para las sesiones de RUM. El valor `sessionSampleRate` debe estar entre `0.0` y `100.0`. Un valor de `0.0` significa que no se envía ninguna sesión, mientras que `100.0` significa que todas las sesiones se envían a Datadog. El valor por defecto es `100.0`.

`telemetrySampleRate`
: la frecuencia de muestreo para la telemetría interna del SDK utilizada por Datadog. Esta frecuencia controla el número de solicitudes reportadas al sistema de rastreo. Debe ser un valor comprendido entre `0` y `100`. Por defecto, se establece en `20`.

`trackAnonymousUser`
: Cuando se habilita, el SDK genera un ID de usuario anónimo, único y no personal que se conserva durante el lanzamiento de la aplicación. Este ID se adjuntará a cada sesión RUM, lo que te permitirá vincular sesiones originadas por el mismo usuario/dispositivo sin recopilar datos personales. Por defecto, se configura como `true`.

`trackBackgroundEvents`
: determina si se realiza un rastreo de eventos de RUM cuando no hay ninguna vista activa. Por defecto, se establece en `false`.

`trackFrustrations`
: determina si se activa el rastreo automático de las frustraciones de los usuarios. Por defecto, se establece en `true`.

`trackMemoryWarnings`
: determina si está activado el seguimiento automático de los avisos de memoria. Por defecto, se establece en `true`.

`trackWatchdogTerminations`
: determina si el SDK debe realizar un rastreo de las terminaciones de aplicaciones realizadas por Watchdog. La configuración predeterminada es `false`.

`uiKitActionsPredicate`
: permite realizar un rastreo de las interacciones del usuario (toques) como acciones de RUM. Puedes usar la implementación por defecto de `predicate` configurando `DefaultUIKitRUMActionsPredicate` o puedes implementar [tu propio `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personalizado para tu aplicación.

`uiKitViewsPredicate`
: activa el rastreo de `UIViewControllers` como vistas de RUM. Puedes utilizar la implementación predeterminada de `predicate` configurando `DefaultUIKitRUMViewsPredicate` o puedes implementar [tu propio `UIKitRUMViewsPredicate`](#automatically-track-views) personalizado para tu aplicación.

`urlSessionTracking`
: habilita el rastreo de tareas `URLSession` (solicitudes de red) como recursos de RUM. El parámetro `firstPartyHostsTracing` define hosts que se categorizan como recursos `first-party` (si RUM está habilitado) y tienen información de rastreo inyectada (si la función de rastreo está habilitada). El parámetro `resourceAttributesProvider` define un cierre para proporcionar atributos personalizados para los recursos interceptados que se llama para cada recurso recopilado por el SDK de RUM iOS. Este cierre se llama con información de la tarea y puede devolver atributos de recursos personalizados o `nil` si no se deben adjuntar atributos.

`viewEventMapper`
: la devolución de llamadas de depuración de datos para las vistas. Puede utilizarse para modificar las vistas de eventos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: establece la frecuencia preferida de recopilación de signos vitales móviles. Los valores disponibles son: `.frequent` (cada 100ms), `.average` (cada 500ms), `.rare` (cada 1s) y `.never` (que desactiva la monitorización de signos vitales).

### Rastrear vistas automáticamente

Puedes realizar un seguimiento automático de las vistas con UIKit y SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Para realizar un rastreo automático de las vistas (`UIViewControllers`), utiliza la opción `uiKitViewsPredicate` al activar RUM. Por defecto, las vistas se nombran con el nombre de la clase del controlador de vistas. Para personalizarlo, proporciona tu propia implementación de `predicate` que se ajuste al protocolo `UIKitRUMViewsPredicate`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

Dentro de la implementación de `rumView(for:)`, tu aplicación debe decidir si una instancia dada de `UIViewController` debe iniciar una vista RUM (devolver un valor) o no (devolver `nil`). El valor `RUMView` devuelto debe especificar el `name` y puede proporcionar `attributes` adicionales para la vista RUM creada.

Por ejemplo, puedes configurar el predicado para utilizar un check de tipo explícito para cada controlador de vista en tu aplicación:

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
{{% tab "Objective-C" %}}
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

Incluso puedes idear una solución más dinámica en función de la arquitectura de tu aplicación.

Por ejemplo, si tus controladores de vista utilizan `accessibilityLabel` de forma coherente, puedes nombrar las vistas por el valor de la etiqueta de accesibilidad:

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
{{% tab "Objective-C" %}}
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

**Nota**: El kit de desarrollo de software (SDK) de RUM iOS llama a `rumView(for:)` muchas veces mientras tu aplicación se está ejecutando. Datadog recomienda mantener su implementación rápida y de un solo subproceso.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Para realizar un seguimiento automático de las vistas con SwiftUI, utiliza la opción `swiftUIViewsPredicate` cuando habilites RUM.

El mecanismo para extraer un nombre de vista SwiftUI se basa en la reflexión. Como resultado, los nombres de las vistas no siempre tienen sentido. Si no se puede extraer un nombre significativo, se utiliza un nombre genérico como `AutoTracked_HostingController_Fallback` o `AutoTracked_NavigationStackController_Fallback`.

Puedes utilizar el predicado predeterminado (`DefaultSwiftUIRUMViewsPredicate`) o proporcionar tu propia implementación del protocolo `SwiftUIRUMViewsPredicate` para personalizar o filtrar los nombres de las vistas.

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
{{% tab "Objective-C" %}}
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

**Notas:**
- Datadog recomienda habilitar también el seguimiento de vistas de UIKit, incluso si tu aplicación está creada enteramente con SwiftUI.
- Las barras de pestaña no se rastrean automáticamente. Utiliza el [seguimiento manual](#custom-views) para cada vista de pestaña para asegurarte de que se rastrean.
- Si utilizas tanto el seguimiento automático como el manual, es posible que veas eventos duplicados. Para evitarlo, confía en un único método de instrumentación o utiliza un predicado personalizado para filtrar los duplicados.
{{% /collapse-content %}}

### Rastreo automático de las acciones de los usuarios

#### UIKit

Para realizar un seguimiento automático de las acciones de toque del usuario con UIKit, establece la opción `uiKitActionsPredicate` al activar RUM.

#### SwiftUI

Para realizar un seguimiento automático de las acciones de toque del usuario en SwiftUI, activa la opción `swiftUIActionsPredicate` al activar RUM.

**Notas:**
- Datadog recomienda habilitar el seguimiento de acciones de UIKit incluso para aplicaciones SwiftUI puras, ya que muchos componentes interactivos son UIKit en segundo plano.
- En tvOS, solo se rastrean las interacciones de toque en el mando a distancia. Para ello, solo se necesita un predicado de UIKit. Si tienes una aplicación SwiftUI pura, pero deseas realizar un seguimiento de los toques remotos en tvOS, también debes habilitar la instrumentación UIKit.
- La implementación difiere entre iOS 18+ y iOS 17 e inferiores:
  - **iOS 18 y posteriores:** la mayoría de las interacciones se rastrean de forma fiable con nombres de componentes correctos (por ejemplo, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 e inferiores:** el kit de desarrollo de software (SDK) no puede distinguir entre componentes interactivos y no interactivos (por ejemplo, botón frente a etiqueta). Por ese motivo, las acciones se notifican como `SwiftUI_Unidentified_Element`.
- Si utilizas tanto el seguimiento automático como el manual, es posible que veas eventos duplicados. Se trata de una limitación conocida. Para evitarlo, utiliza solo un tipo de instrumentación: automática o manual.
- Puedes utilizar el predicado predeterminado, `DefaultSwiftUIRUMActionsPredicate`, o proporcionar el tuyo propio para filtrar o renombrar acciones. También puedes desactivar la detección heredada (iOS 17 e inferior) si solo quieres un seguimiento fiable de iOS 18+:

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
{{% tab "Objective-C" %}}
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
{{< /tabs >}}

#### Informes de acción por versión de iOS

La siguiente tabla muestra cómo iOS 17 e iOS 18 informan de diferentes interacciones de usuario.

| **Componente**    | **Nombre informado de iOS 18**                          | **Nombre informado de iOS 17**             |
|------------------|---------------------------------------------------|--------------------------------------|
| Botón           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| Menu             | SwiftUI_Menu (y sus elementos como _UIContextMenuCell)| SwiftUI_Menu (y sus elementos como _UIContextMenuCell) |
| Enlace             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

### Rastrear solicitudes de red automáticamente

#### Instrumentación básica de la red

Para realizar un rastreo automático de los recursos (solicitudes de red) y obtener información sobre su temporización, como el tiempo transcurrido hasta el primer byte o la resolución DNS, utiliza la opción `urlSessionTracking` al activar RUM y activa `URLSessionInstrumentation`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
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
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Ten cuidado con la retención de delegados.
Aunque la instrumentación de Datadog no crea fugas de memoria directamente, depende de los delegados de <code>URLSession</code>. Según <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> la documentación de Apple</a>
"El objeto de sesión mantiene una referencia fuerte con el delegado hasta que tu aplicación salga o invalide explícitamente la sesión. Si no invalidas la sesión llamando al método <code>invalidateAndCancel()</code> o <code>finishTasksAndInvalidate()</code>, tu aplicación tendrá fugas de memoria hasta que salga".
Para evitar fugas de memoria, asegúrate de invalidar cualquier instancia de <code>URLSession</code> que ya no necesites.
</div>


Si tienes más de un tipo de delegado en tu aplicación que deseas instrumentar, puedes llamar a `URLSessionInstrumentation.enable(with:)` para cada tipo de delegado.

Además, puedes configurar hosts primarios con `urlSessionTracking`. Esto clasifica los recursos que coinciden con el dominio dado como "primario" (first party) en RUM y propaga la información de rastreo a tu backend (si has activado el rastreo). Las trazas (traces) de red se muestrean con una frecuencia de muestreo ajustable. Por defecto, se aplica un muestreo del 20%.

Por ejemplo, puedes configurar `example.com` como host primario y activar las funciones RUM y el rastreo:

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

Esto rastrea todas las solicitudes enviadas con la `session` instrumentada. Las solicitudes que coinciden con el dominio `example.com` se marcan como "primarias" (first party) y la información de rastreo se envía a tu backend para [conectar el recurso de RUM con su traza][1].


[1]: https://docs.datadoghq.com/es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "Objective-C" %}}
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

Para añadir atributos personalizados a los recursos, utiliza la opción `URLSessionTracking.resourceAttributesProvider` al activar el RUM. Al establecer el cierre del proveedor de atributos, puedes devolver atributos adicionales que se adjuntarán al recurso rastreado.

Por ejemplo, puede que desees añadir encabezados de solicitud y respuesta HTTP al recurso de RUM:

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

Si no deseas realizar un rastreo de las solicitudes, puedes desactivar URLSessionInstrumentation para el tipo de delegado:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

### Rastreo automático de errores

Todos los "errores" y logs "críticos" enviados con `Logger` se notifican automáticamente como errores de RUM y se vinculan a la vista de RUM actual:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

Del mismo modo, todos los tramos terminados marcados como error se notifican como errores de RUM:

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
{{% tab "Objective-C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modificar o descartar eventos de RUM

Para modificar los atributos de un evento de RUM antes de que se envíe a Datadog o para eliminar por completo un evento, utiliza la API de asignadores de eventos al configurar el SDK de RUM iOS:

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
{{% tab "Objective-C" %}}
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

Cada asignador es un cierre Swift con una firma de `(T) -> T?`, donde `T` es un tipo concreto de evento de RUM. Esto permite cambiar partes de evento antes de que se envíe.

Por ejemplo, para redactar información confidencial en una `url` de recurso de RUM, implementa una función `redacted(_:) -> String` personalizada y utilízala en `resourceEventMapper`:

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
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Si se devuelve `nil` desde el asignador de errores, recursos o acciones, se elimina el evento por completo; el evento no se envía a Datadog. El valor devuelto desde el asignador de eventos de vistas no debe ser `nil` (para eliminar vistas, personaliza tu implementación de `UIKitRUMViewsPredicate`; lee más en [rastreo automático de vistas](#automatically-track-views)).

En función del tipo de evento, solo pueden modificarse algunas propiedades específicas:

| Tipo de evento       | Clave de atributo                        | Descripción                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nombre de la acción.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vista vinculada a esta acción.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Mensaje de error.                                   |
|                  | `RUMErrorEvent.error.stack`          | Stack trace del error.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL del recurso al que se refiere el error.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vista vinculada a este error.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL del recurso.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vista vinculada a este recurso.         |
| RUMViewEvento     | `RUMViewEvent.view.name`             | Nombre de la vista.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vista.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL vinculada con la vista inicial de la página. |

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar posteriormente la sesión de usuario en Datadog.

Puedes acceder al identificador de sesión RUM en tiempo de ejecución sin esperar al evento `sessionStarted`:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Configurar el consentimiento de rastreo (cumplimiento de GDPR)

Para cumplir con la normativa GDPR, el SDK requiere el valor de consentimiento de rastreo durante la inicialización.

El ajuste `trackingConsent` puede ser uno de los siguientes valores:

1. `.pending`: el SDK de RUM iOS comienza a recopilar y procesar los datos, pero no los envía a Datadog. El SDK de RUM iOS espera el nuevo valor de consentimiento del rastreo para decidir qué hacer con los datos procesados.
2. `.granted`: el SDK de RUM iOS comienza a recopilar los datos y los envía a Datadog.
3. `.notGranted`: el SDK de RUM iOS no recopila ningún dato. Ni logs, ni trazas, ni eventos de RUM se envían a Datadog.

Para cambiar el valor de consentimiento de rastreo después de inicializar el SDK de RUM iOS, utiliza la llamada a la API `Datadog.set(trackingConsent:)`. El SDK de RUM iOS cambia su comportamiento de acuerdo con el nuevo valor.

Por ejemplo, si el consentimiento de rastreo actual es `.pending`:

- Si cambia el valor a `.granted`, el SDK de RUM iOS envía todos los datos actuales y futuros a Datadog;
- Si cambias el valor a `.notGranted`, el SDK de RUM iOS borra todos los datos actuales y no recopila datos futuros.

## Añadir propiedades de usuario

Puedes utilizar la API `Datadog.addUserExtraInfo(_:)` para añadir propiedades de usuario adicionales a las establecidas previamente.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## Gestión de datos

El SDK de iOS almacena primero eventos localmente y sólo carga eventos cuando se cumplen las condiciones [especificaciones de admisión][9].

### Borrar todos los datos

Tienes la opción de borrar todos los datos no enviados almacenados por el SDK con la API `Datadog.clearAllData()`.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Detener la recopilación de datos

Puedes utilizar la API `Datadog.stopInstance()` para impedir que una instancia del SDK con nombre (o la instancia predeterminada si el nombre es `nil`) siga recopilando y cargando datos.

```swift
import DatadogCore

Datadog.stopInstance()
```

Al llamar a este método se desactiva el SDK y todas las características activas, como RUM. Para reanudar la recopilación de datos, debes reinicializar el SDK. Puedes utilizar esta API si deseas cambiar dinámicamente las configuraciones

## Referencias adicionales

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