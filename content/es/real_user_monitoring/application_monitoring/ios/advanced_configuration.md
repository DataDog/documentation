---
aliases:
- /es/real_user_monitoring/ios/advanced_configuration
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /es/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configura la configuración avanzada del SDK de RUM para iOS para enriquecer
  las sesiones de usuario, rastrear eventos personalizados y controlar la recopilación
  de datos para obtener mejores perspectivas.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: Código fuente para dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM y Repetición de Sesiones
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: Versiones soportadas de monitoreo de RUM para iOS y tvOS
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Integración de Datadog para Apollo iOS
title: Configuración Avanzada de iOS
---
Si aún no has configurado el SDK de RUM para iOS, sigue las [instrucciones de configuración en la aplicación][1] o consulta la [documentación de configuración de RUM para iOS][2].

## Enriquecer las sesiones de usuario

El RUM para iOS rastrea automáticamente atributos como la actividad del usuario, pantallas, errores y solicitudes de red. Consulta la [documentación de Recopilación de Datos de RUM][3] para aprender sobre los eventos de RUM y los atributos predeterminados. Puedes enriquecer aún más la información de la sesión de usuario y obtener un control más fino sobre los atributos recopilados al rastrear eventos personalizados.

### Vistas personalizadas

Además de [rastrear vistas automáticamente](#automatically-track-views), también puedes rastrear vistas distintas específicas como `viewControllers` cuando se vuelven visibles e interactivas. Detén el rastreo cuando la vista ya no sea visible utilizando los siguientes métodos en `RUMMonitor.shared()`:

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

Además de [ rastrear acciones automáticamente](#automatically-track-user-actions), puedes rastrear acciones específicas de usuario personalizadas (toques, clics y desplazamientos) con la `addAction(type:name:)` API.

Para registrar manualmente acciones instantáneas de RUM como `.tap` en `RUMMonitor.shared()`, usa `.addAction(type:name:)`. Para acciones continuas de RUM como `.scroll`, usa `.startAction(type:name:)` o `.stopAction(type:)`.

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

**Nota**: Al usar `.startAction(type:name:)` y `.stopAction(type:)`, la acción `type` debe ser la misma. Esto es necesario para que el SDK de RUM para iOS coincida el inicio de una acción con su finalización.

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4].

### Recursos personalizados

Además de [ rastrear recursos automáticamente](#automatically-track-network-requests), también puedes rastrear recursos personalizados específicos como solicitudes de red o APIs de proveedores de terceros. Usa los siguientes métodos en `RUMMonitor.shared()` para recopilar manualmente recursos de RUM:

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

**Nota**: El `String` utilizado para `resourceKey` en ambas llamadas debe ser único para el recurso que estás llamando. Esto es necesario para que el SDK de RUM para iOS coincida el inicio de un recurso con su finalización.

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4].

### Errores personalizados

Para rastrear errores específicos, notifica a `RUMMonitor.shared()` cuando ocurra un error utilizando uno de los siguientes métodos:

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

Para más detalles y opciones disponibles, consulta [`RUMMonitorProtocol` en GitHub][4] y la [documentación de Atributos de Error][5].

## Rastrear atributos globales personalizados

Además de los [atributos RUM predeterminados][6] capturados automáticamente por el SDK de RUM para iOS, puedes optar por agregar información contextual adicional (como atributos personalizados) a tus eventos RUM para enriquecer tu observabilidad dentro de Datadog.

Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento del usuario observado (como el valor del carrito, el nivel del comerciante o la campaña publicitaria) con información a nivel de código (como servicios de backend, cronología de sesiones, registros de errores y salud de la red).

<div class="alert alert-info">Los atributos personalizados están destinados a piezas pequeñas y específicas de información (por ejemplo, IDs, banderas o etiquetas cortas). Evita adjuntar objetos grandes como cargas útiles completas de respuestas HTTP. Esto puede aumentar significativamente el tamaño del evento e impactar el rendimiento.</div>

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, utiliza `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Para agregar un atributo, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Para actualizar el valor, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Para eliminar la clave, utiliza `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Para un mejor rendimiento en operaciones masivas (modificando múltiples atributos a la vez), utiliza `.addAttributes(_:)` y `.removeAttributes(forKeys:)`.

**Nota**: No puedes crear facetas en atributos personalizados si usas espacios o caracteres especiales en los nombres de tus claves. Por ejemplo, utiliza `forKey: "store_id"` en lugar de `forKey: "Store ID"`.

### Rastrear sesiones de usuario

Agregar información del usuario a tus sesiones de RUM facilita:

* Seguir el recorrido de un usuario determinado
* Saber qué usuarios son los más afectados por errores
* Monitorear el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de RUM" >}}

| Atributo   | Tipo   | Descripción                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Cadena | (Requerido) Identificador único del usuario.                                              |
| `usr.name`  | Cadena | (Opcional) Nombre amigable del usuario, mostrado por defecto en la interfaz de RUM.              |
| `usr.email` | Cadena | (Opcional) Correo electrónico del usuario, mostrado en la interfaz de RUM si el nombre de usuario no está presente. |

Para identificar sesiones de usuario, utiliza la API `Datadog.setUserInfo(id:name:email:)`.

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

<div class="alert alert-info"><p> Rastrear eventos en segundo plano puede llevar a sesiones adicionales, lo que puede afectar la facturación. Para preguntas, <a href="https://docs.datadoghq.com/help/">contacta al soporte de Datadog.</a></p>
</div>

Puedes rastrear eventos como fallos y solicitudes de red cuando tu aplicación está en segundo plano (por ejemplo, no hay vista activa disponible).

Para rastrear eventos en segundo plano, agrega el siguiente fragmento durante la inicialización en tu configuración de Datadog:

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

Puedes usar las siguientes propiedades en `Datadog.Configuration` al crear la configuración de Datadog para inicializar la biblioteca:

`backgroundTasksEnabled`
: Esta bandera determina si los métodos `UIApplication` `beginBackgroundTask(expirationHandler:)` y `endBackgroundTask:` se utilizan para realizar cargas en segundo plano. Habilitar esta opción podría aumentar el tiempo que la aplicación opera en segundo plano en 30 segundos. Las tareas normalmente se detienen cuando no hay nada que subir o cuando se encuentra un obstáculo para la carga, como no tener conexión a internet o tener poca batería. Por defecto, esta opción está configurada en `false`.

`batchProcessingLevel`
: El nivel de procesamiento por lotes define el número máximo de lotes procesados secuencialmente sin un retraso dentro de un ciclo de lectura/carga. El valor por defecto es `.medium`.

`batchSize`
: Establece el tamaño preferido de los datos agrupados que se suben a Datadog. Este valor impacta el tamaño y número de solicitudes realizadas por el SDK de RUM para iOS (lotes pequeños significan más solicitudes, pero cada solicitud se vuelve más pequeña en tamaño). Los valores disponibles incluyen: `.small`, `.medium` y `.large`.

`bundle`
: El objeto de paquete que contiene el ejecutable actual.

`clientToken`
: Ya sea el token del cliente de RUM (que soporta RUM, Logging y APM) o el token de cliente regular (que soporta Logging y APM).

`encryption`
: Cifrado de datos a utilizar para la persistencia de datos en disco proporcionando un objeto que cumpla con el protocolo `DataEncryption`.

`env`
: El nombre del entorno que se envía a Datadog. Esto se puede usar para filtrar eventos por diferentes entornos (como `staging` o `production`).

`proxyConfiguration`
: Un atributo de configuración de proxy que se puede usar para habilitar un proxy personalizado para subir datos rastreados a la entrada de Datadog.

`serverDateProvider`
: Una interfaz de sincronización NTP personalizada. Por defecto, el SDK de Datadog se sincroniza con grupos NTP dedicados proporcionados por el [Proyecto NTP Pool][7]. Usar diferentes grupos o establecer una implementación de no operación `ServerDateProvider` resulta en una desincronización de la instancia del SDK y los servidores de Datadog. Esto puede llevar a cambios significativos en el tiempo en sesiones de RUM o trazas distribuidas.

`service`
: El nombre del servicio asociado con los datos enviados a Datadog. El valor predeterminado es el identificador del paquete de la aplicación.

`site`
: El punto final del servidor de Datadog al que se envían los datos. El valor predeterminado es `.us1`.

`uploadFrequency`
: La frecuencia preferida para cargar datos a Datadog. Los valores disponibles incluyen: `.frequent`, `.average` y `.rare`.

### Configuración de RUM

Puedes usar las siguientes propiedades en `RUM.Configuration` al habilitar RUM:

`actionEventMapper`
: Establece la función de limpieza de datos para acciones. Esto se puede usar para modificar o eliminar eventos de acción antes de que se envíen a Datadog. Para más información, consulta [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`appHangThreshold`
: Establece el umbral para informar cuando una aplicación se cuelga. El valor mínimo permitido para esta opción es `0.1` segundos. Para deshabilitar el informe, establece este valor en `nil`. Para más información, consulta [Agregar informe de cuelgue de aplicación][8].

`applicationID`
: El identificador de la aplicación RUM.

`customEndpoint`
: Una URL de servidor personalizada para enviar datos RUM.

`errorEventMapper`
: La función de limpieza de datos para errores. Esto se puede usar para modificar o eliminar eventos de error antes de que se envíen a Datadog. Para más información, consulta [Modificar o eliminar eventos RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
: La función de limpieza de datos para tareas largas. Esto se puede usar para modificar o eliminar eventos de tareas largas antes de que se envíen a Datadog. Para más información, consulta [Modificar o eliminar eventos RUM](#modify-or-drop-rum-events).

`longTaskThreshold`
: El umbral para el seguimiento de tareas largas de RUM (en segundos). Por defecto, esto se envía a `0.1` segundos.

`networkSettledResourcePredicate`
El predicado utilizado para clasificar los recursos "iniciales" para el cálculo del tiempo de vista de Tiempo-a-Red-Establecida (TNS).

`nextViewActionPredicate`
El predicado utilizado para clasificar la "última" acción para el cálculo del tiempo de Interacción-a-Siguiente-Vista (INV).

`onSessionStart`
(Opcional) El método que se llama cuando RUM inicia la sesión.

`resourceEventMapper`
La función de limpieza de datos para los recursos. Esto se puede usar para modificar o eliminar eventos de recursos antes de que se envíen a Datadog. Para más información, consulte [Modificar o eliminar eventos de RUM](#modify-or-drop-rum-events).

`sessionSampleRate`
La tasa de muestreo para las sesiones de RUM. El valor `sessionSampleRate` debe estar entre `0.0` y `100.0`. Un valor de `0.0` significa que no se envían sesiones, mientras que `100.0` significa que se envían todas las sesiones a Datadog. El valor predeterminado es `100.0`.

`telemetrySampleRate`
La tasa de muestreo para la telemetría interna del SDK utilizada por Datadog. Esta tasa controla el número de solicitudes reportadas al sistema de trazado. Esto debe ser un valor entre `0` y `100`. Por defecto, esto se establece en `20`.

`trackAnonymousUser`
: Cuando está habilitado, el SDK genera un ID de usuario anónimo único y no personal que se conserva entre los lanzamientos de la aplicación. Este ID se adjuntará a cada sesión de RUM, lo que te permitirá vincular sesiones que provienen del mismo usuario/dispositivo sin recopilar datos personales. Por defecto, esto está configurado en `true`.

`trackBackgroundEvents`
: Determina si se rastrean eventos de RUM cuando no hay vista activa. Por defecto, esto está configurado en `false`.

`trackFrustrations`
: Determina si está habilitado el rastreo automático de frustraciones del usuario. Por defecto, esto está configurado en `true`.

`trackMemoryWarnings`
: Determina si está habilitado el rastreo automático de advertencias de memoria. Por defecto, esto está configurado en `true`.

`trackWatchdogTerminations`
: Determina si el SDK debe rastrear las terminaciones de la aplicación realizadas por Watchdog. La configuración predeterminada es `false`.

`uiKitActionsPredicate`
: Habilita el rastreo de interacciones del usuario (toques) como acciones de RUM. Puedes usar la implementación predeterminada de `predicate` configurando el `DefaultUIKitRUMActionsPredicate` o implementar [tu propio `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personalizado para tu aplicación.

`uiKitViewsPredicate`
: Habilita el rastreo de `UIViewControllers` como vistas de RUM. Puedes usar la implementación predeterminada de `predicate` configurando el `DefaultUIKitRUMViewsPredicate` o implementar [ tu propia `UIKitRUMViewsPredicate`](#automatically-track-views) personalizada para tu aplicación.

`urlSessionTracking`
: Habilita el seguimiento de `URLSession` tareas (solicitudes de red) como recursos RUM. El parámetro `firstPartyHostsTracing` define los hosts que se categorizan como recursos `first-party` (si RUM está habilitado) y tienen información de seguimiento inyectada (si la función de seguimiento está habilitada). El parámetro `resourceAttributesProvider` define un cierre para proporcionar atributos personalizados para los recursos interceptados que se llama para cada recurso recopilado por el SDK de RUM para iOS. Este cierre se llama con información de la tarea y puede devolver atributos personalizados del recurso o `nil` si no se deben adjuntar atributos.

`viewEventMapper`
: La devolución de llamada de limpieza de datos para vistas. Esto se puede usar para modificar eventos de vista antes de que se envíen a Datadog. Para más información, consulta [Modificar o eliminar eventos RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: La frecuencia preferida para recopilar datos vitales móviles. Los valores disponibles incluyen: `.frequent` (cada 100 ms), `.average` (cada 500 ms), `.rare` (cada 1 s) y `.never` (que desactiva el monitoreo de vitales).

### Seguimiento automático de vistas

Puedes rastrear automáticamente vistas con UIKit y SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Para rastrear automáticamente vistas (`UIViewControllers`), usa la opción `uiKitViewsPredicate` al habilitar RUM. Por defecto, las vistas se nombran con el nombre de la clase del controlador de vista. Para personalizarlo, proporciona tu propia implementación de `predicate` que cumpla con el protocolo `UIKitRUMViewsPredicate`:

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

Dentro de la implementación `rumView(for:)`, tu aplicación debe decidir si una instancia `UIViewController` dada debe iniciar una vista RUM (devolver un valor) o no (devolver `nil`). El valor `RUMView` devuelto debe especificar el `name` y puede proporcionar información adicional `attributes` para la vista RUM creada.

Por ejemplo, puedes configurar el predicado para usar una verificación de tipo explícita para cada controlador de vista en tu aplicación:

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

Incluso puedes idear una solución más dinámica dependiendo de la arquitectura de tu aplicación.

Por ejemplo, si tus controladores de vista utilizan `accessibilityLabel` de manera consistente, puedes nombrar las vistas por el valor de la etiqueta de accesibilidad:

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

**Nota**: El SDK de RUM para iOS llama a `rumView(for:)` muchas veces mientras tu aplicación está en ejecución. Datadog recomienda mantener su implementación rápida y de un solo hilo.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Para rastrear automáticamente vistas con SwiftUI, utiliza la opción `swiftUIViewsPredicate` al habilitar RUM.

El mecanismo para extraer un nombre de vista de SwiftUI se basa en la reflexión. Como resultado, los nombres de las vistas pueden no ser siempre significativos. Si no se puede extraer un nombre significativo, se utiliza un nombre genérico como `AutoTracked_HostingController_Fallback` o `AutoTracked_NavigationStackController_Fallback`.

Puedes usar el predicado predeterminado (`DefaultSwiftUIRUMViewsPredicate`) o proporcionar tu propia implementación del protocolo `SwiftUIRUMViewsPredicate` para personalizar o filtrar los nombres de las vistas.

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
- Datadog recomienda habilitar el rastreo de vistas de UIKit también, incluso si tu aplicación está construida completamente con SwiftUI.
- Las barras de pestañas no se rastrean automáticamente. Utiliza [rastreo manual](#custom-views) para cada vista de pestaña para asegurarte de que se rastreen.
- Si utilizas tanto el rastreo automático como el manual, puedes ver eventos duplicados. Para evitar esto, confía en un solo método de instrumentación o utiliza un predicado personalizado para filtrar duplicados.
{{% /collapse-content %}}

### Rastrear automáticamente las acciones del usuario

#### UIKit

Para rastrear automáticamente las acciones de toque del usuario con UIKit, establece la opción `uiKitActionsPredicate` al habilitar RUM.

#### SwiftUI

Para rastrear automáticamente las acciones de toque del usuario en SwiftUI, habilita la opción `swiftUIActionsPredicate` al habilitar RUM.

**Notas:**
- Datadog recomienda habilitar el rastreo de acciones de UIKit incluso para aplicaciones puras de SwiftUI, ya que muchos componentes interactivos son UIKit en el fondo.
- En tvOS, solo se rastrean las interacciones de presión en el control remoto. Solo se necesita un predicado de UIKit para esto. Si tienes una aplicación pura de SwiftUI pero deseas rastrear las presiones del control remoto en tvOS, también debes habilitar la instrumentación de UIKit.
- La implementación difiere entre iOS 18+ e iOS 17 y anteriores:
  - **iOS 18 y superiores:** La mayoría de las interacciones se rastrean de manera confiable con los nombres de componentes correctos (por ejemplo, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 y anteriores:** El SDK no puede distinguir entre componentes interactivos y no interactivos (por ejemplo, Botón vs. Etiqueta). Por esa razón, las acciones se informan como `SwiftUI_Unidentified_Element`.
- Si utilizas tanto el rastreo automático como el manual, puedes ver eventos duplicados. Esta es una limitación conocida. Para evitar esto, usa solo un tipo de instrumentación: automática o manual.
- Puedes usar el predicado predeterminado, `DefaultSwiftUIRUMActionsPredicate`, o proporcionar el tuyo propio para filtrar o renombrar acciones. También puedes deshabilitar la detección heredada (iOS 17 y anteriores) si solo deseas un rastreo confiable en iOS 18+:

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

#### Informe de acciones por versión de iOS

La tabla a continuación muestra cómo iOS 17 e iOS 18 informan diferentes interacciones del usuario.

| **Componente**    | **iOS 18 nombre reportado**                          | **iOS 17 nombre reportado**             |
|------------------|---------------------------------------------------|--------------------------------------|
| Botón           | SwiftUI_Botón                                    | SwiftUI_Elemento_No_Identificado         |
| EnlaceDeNavegación   | EnlaceDeNavegación                                    | SwiftUI_Elemento_No_Identificado         |
| Menú             | SwiftUI_Menú (y sus elementos como _UIContextMenuCell)| SwiftUI_Menú (y sus elementos como _UIContextMenuCell) |
| Enlace             | SwiftUI_Botón                                    | SwiftUI_Elemento_No_Identificado         |

### Rastrear automáticamente las solicitudes de red

Las solicitudes de red se rastrean automáticamente después de habilitar RUM con la `urlSessionTracking` configuración. 

#### (Opcional) Habilitar desglose de tiempo detallado

Para obtener un desglose de tiempo detallado (resolución DNS, apretón de manos SSL, tiempo hasta el primer byte, tiempo de conexión y duración de descarga), habilita `URLSessionInstrumentation` para tu tipo de delegado:

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

**Notas**:
- Sin `URLSessionInstrumentation`, las solicitudes de red aún se rastrean. Habilitarlo proporciona un desglose de tiempo detallado para el análisis de rendimiento.
- Los datos de respuesta están disponibles en el `resourceAttributesProvider` callback (establecido en `RUM.Configuration.URLSessionTracking`) para tareas con controladores de finalización en modo automático, y para todas las tareas después de habilitar `URLSessionInstrumentation`.
- Para filtrar solicitudes específicas de ser rastreadas, usa el `resourceEventMapper` en `RUM.Configuration` (ver [Modificar o eliminar eventos RUM](#modify-or-drop-rum-events)).

<div class="alert alert-info">Ten cuidado con la retención de delegados.
Si bien la instrumentación de Datadog no crea fugas de memoria directamente, depende de <code>URLSession</code> delegados. Según <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> la documentación de Apple</a>:
"El objeto de sesión mantiene una referencia fuerte al delegado hasta que tu aplicación sale o invalida explícitamente la sesión. Si no invalidas la sesión llamando al método <code>invalidateAndCancel()</code> o <code>finishTasksAndInvalidate()</code>, tu aplicación filtra memoria hasta que sale."
Para evitar fugas de memoria, asegúrate de invalidar cualquier instancia de <code>URLSession</code> que ya no necesites.
</div>


Si tienes más de un tipo de delegado en tu aplicación que deseas instrumentar, puedes llamar a `URLSessionInstrumentation.enable(with:)` para cada tipo de delegado.

Además, puedes configurar hosts de primera parte usando `urlSessionTracking`. Esto clasifica los recursos que coinciden con el dominio dado como "primera parte" en RUM y propaga la información de trazado a tu backend (si has habilitado el Trazado). Las trazas de red se muestrean con una tasa de muestreo ajustable. Se aplica un muestreo del 20% por defecto.

Por ejemplo, puedes configurar `example.com` como el host de primera parte y habilitar tanto RUM como las características de Trazado:

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

Esto rastrea todas las solicitudes enviadas con el `session` instrumentado. Las solicitudes que coinciden con el dominio `example.com` se marcan como "primera parte" y la información de trazado se envía a tu backend para [conectar el recurso RUM con su Trazado][1].


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

Para agregar atributos personalizados a los recursos, usa la opción `URLSessionTracking.resourceAttributesProvider` al habilitar el RUM. Al establecer el cierre del proveedor de atributos, puedes devolver atributos adicionales que se adjuntarán al recurso rastreado.

Por ejemplo, es posible que desees agregar encabezados de solicitud y respuesta HTTP al recurso RUM:

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

Si no deseas rastrear solicitudes, puedes deshabilitar URLSessionInstrumentation para el tipo de delegado:

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

#### Instrumentación de Apollo
Instrumentar Apollo en tu aplicación iOS proporciona visibilidad de RUM sobre errores y rendimiento de GraphQL. Debido a que las solicitudes de GraphQL van todas a un único punto final y a menudo devuelven 200 OK incluso en errores, la instrumentación HTTP por defecto carece de contexto. Permite que RUM capture el nombre de la operación, el tipo de operación y las variables (y opcionalmente la carga útil). Esto proporciona un contexto más detallado para cada solicitud de red.

Esta integración es compatible con Apollo iOS 1.0+ y Apollo iOS 2.0+. Sigue las instrucciones para la versión de Apollo iOS que tienes a continuación.

1. [Configura][2] la monitorización de RUM con Datadog iOS RUM.

2. Agrega lo siguiente al archivo `Package.swift` de tu aplicación:

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Alternativamente, puedes agregarlo usando Xcode:
   1. Ve a **Archivo** → **Agregar Dependencias de Paquete**.
   2. Ingresa la URL del repositorio: `https://github.com/DataDog/dd-sdk-ios-apollo-interceptor`.
   3. Selecciona la versión del paquete que coincida con tu versión principal de Apollo (elige `1.x.x` para Apollo iOS 1.0+ o `2.x.x` para Apollo iOS 2.0+).

3. Configura la instrumentación de red según tu versión de Apollo iOS:

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Configura la instrumentación de red para el URLSessionClient integrado de Apollo:

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Agrega el interceptor de Datadog a la configuración de tu cliente Apollo:

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

   Configura la instrumentación de red usando el `DatadogApolloDelegate` y `DatadogApolloURLSession` proporcionados:

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

   Crea un proveedor de interceptores con el interceptor de Datadog:

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

   Esto permite que Datadog RUM extraiga automáticamente el tipo de operación, nombre, variables y Payloads (opcional) de las solicitudes para enriquecer los Recursos RUM de Solicitudes GraphQL.

   <div class="alert alert-info">
     <ul>
       <li>La integración soporta versiones de Apollo iOS <code>1.0+</code> y <code>2.0+</code>.</li>
       <li>Las operaciones de tipo <code>consulta</code> y <code>mutación</code> son rastreadas, las operaciones de <code>suscripción</code> no lo son.</li>
       <li>El envío de payloads GraphQL está deshabilitado por defecto. Para habilitarlo, establece el flag <code>sendGraphQLPayloads</code> en el constructor de <code>DatadogApolloInterceptor</code> de la siguiente manera:</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>

### Rastrear errores automáticamente

Todos los registros de "error" y "crítico" enviados con `Logger` se informan automáticamente como errores RUM y se vinculan a la vista RUM actual:

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

De manera similar, todos los spans finalizados marcados como error se informan como errores RUM:

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

## Modificar o eliminar eventos RUM

Para modificar atributos de un evento RUM antes de que se envíe a Datadog o para eliminar un evento por completo, utiliza la API de Mapeadores de Eventos al configurar el SDK de RUM para iOS:

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

Cada mapeador es un cierre de Swift con una firma de `(T) -> T?`, donde `T` es un tipo de evento RUM concreto. Esto permite cambiar partes del evento antes de que se envíe.

Por ejemplo, para redactar información sensible en un `url` de RUM Resource, implementa una función `redacted(_:) -> String` personalizada y úsala en `resourceEventMapper`:

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

Devolver `nil` desde el mapeador de error, recurso o acción elimina el evento por completo; el evento no se envía a Datadog. El valor devuelto del mapeador de eventos de vista no debe ser `nil` (para eliminar vistas, personaliza tu implementación de `UIKitRUMViewsPredicate`; lee más en [seguimiento automático de vistas](#automatically-track-views)).

Dependiendo del tipo de evento, solo algunas propiedades específicas pueden ser modificadas:

| Tipo de Evento       | Clave de Atributo                        | Descripción                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nombre de la acción.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vista vinculada a esta acción.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Mensaje de error.                                   |
|                  | `RUMErrorEvent.error.stack`          | Stacktrace del error.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL del recurso al que se refiere el error.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vista vinculada a este error.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL del recurso.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vista vinculada a este recurso.         |
| Evento RUMView     | `RUMViewEvent.view.name`             | Nombre de la vista.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vista.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL que enlazó a la vista inicial de la página. |

## Recuperar el ID de sesión RUM

Recuperar el ID de sesión RUM puede ser útil para la solución de problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar más tarde la sesión del usuario en Datadog.

Puedes acceder al ID de sesión RUM en tiempo de ejecución sin esperar el evento `sessionStarted`:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Establecer consentimiento de seguimiento (cumplimiento de GDPR)

Para cumplir con la regulación GDPR, el SDK RUM para iOS requiere el valor de consentimiento de seguimiento en la inicialización.

La configuración `trackingConsent` puede ser uno de los siguientes valores:

1. `.pending`: El SDK RUM para iOS comienza a recopilar y agrupar los datos, pero no los envía a Datadog. El SDK RUM para iOS espera el nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos agrupados.
2. `.granted`: El SDK RUM para iOS comienza a recopilar los datos y los envía a Datadog.
3. `.notGranted`: El SDK RUM para iOS no recopila ningún dato. No se envían registros, trazas ni eventos RUM a Datadog.

Para cambiar el valor de consentimiento de seguimiento después de que el SDK RUM para iOS esté inicializado, utiliza la llamada a la API `Datadog.set(trackingConsent:)`. El SDK RUM para iOS cambia su comportamiento de acuerdo con el nuevo valor.

Por ejemplo, si el consentimiento de seguimiento actual es `.pending`:

- Si cambias el valor a `.granted`, el SDK de RUM para iOS envía todos los datos actuales y futuros a Datadog;
- Si cambias el valor a `.notGranted`, el SDK de RUM para iOS elimina todos los datos actuales y no recopila datos futuros.

## Agregar propiedades de usuario

Puedes usar la API `Datadog.addUserExtraInfo(_:)` para agregar propiedades de usuario adicionales a las propiedades ya establecidas.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## Gestión de datos

El SDK de iOS primero almacena eventos localmente y solo sube eventos cuando se cumplen las condiciones de las [especificaciones de recepción][9].

### Eliminar todos los datos

Tienes la opción de eliminar todos los datos no enviados almacenados por el SDK con la API `Datadog.clearAllData()`.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Detener la recopilación de datos

Puedes usar la API `Datadog.stopInstance()` para detener una instancia de SDK nombrada (o la instancia predeterminada si el nombre es `nil`) de recopilar y subir datos más adelante.

```swift
import DatadogCore

Datadog.stopInstance()
```

Llamar a este método desactiva el SDK y todas las funciones activas, como RUM. Para reanudar la recopilación de datos, debes reinicializar el SDK. Puedes usar esta API si deseas cambiar configuraciones dinámicamente

## Lectura adicional

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