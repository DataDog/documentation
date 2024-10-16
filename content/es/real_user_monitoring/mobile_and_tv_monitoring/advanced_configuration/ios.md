---
aliases:
- /es/real_user_monitoring/ios/advanced_configuration
code_lang: ios
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: RUM y Session Replay
- link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
  tag: Documentación
  text: Versiones compatibles con la monitorización de RUM iOS y tvOS
title: Configuración avanzada de RUM iOS
type: multi-code-lang
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

// en tu `UIViewController`:
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
@import DatadogObjc;
// en tu `UIViewController`:

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

Para más detalles y opciones disponibles, filtra el [archivo pertinente en GitHub][9] para la clase `DDRUMMonitor`.

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

Para crear visualizaciones en tus dashboards, [crea una medida][4] primero.

### Acciones personalizadas

Además de [rastrear acciones automáticamente](#automatically-track-user-actions), puedes rastrear acciones específicas del usuario (toques, clics y desplazamientos) con la API `addAction(type:name:)`.

Para registrar manualmente acciones de RUM instantáneas como `.tap` en `RUMMonitor.shared()`, utiliza `.addAction(type:name:)`. Para acciones de RUM continuas como `.scroll`, utiliza `.startAction(type:name:)` o `.stopAction(type:name:)`.

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// en tu `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? "",
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

**Nota**: Cuando se utiliza `.startAction(type:name:)` y `.stopAction(type:name:)`, la acción `type` debe ser la misma. Esto es necesario para que el SDK de RUM iOS haga coincidir el inicio de una acción con su finalización.

Encontrarás más detalles y opciones disponibles en la [clase `DDRUMMonitor`][9].

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

// en tu cliente de red:

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
// en tu cliente de red:

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

Encontrarás más detalles y opciones disponibles en la [clase `DDRUMMonitor`][9].

### Errores personalizados

Para realizar un rastreo de errores específicos, notifica a `RUMMonitor` cuando se produzca un error con el mensaje, el origen, la excepción y atributos adicionales. Consulta la [documentación sobre atributos de error][5].

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

Para más detalles y opciones disponibles, consulta los comentarios de la documentación del código en la [clase `DDRUMMonitor`][9].

## Rastrear atributos globales personalizados

Además de los [atributos RUM predeterminados][7] capturados por el SDK de RUM iOS automáticamente, puedes optar por añadir información contextual adicional (como atributos personalizados) a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog.

Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la cronología de la sesión, los logs de error y el estado de la red).

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, utiliza `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Para añadir un atributo, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Para actualizar el valor, utiliza `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Para extraer la clave, utiliza `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

**Nota**: No se pueden crear facetas sobre atributos personalizados si se utilizan espacios o caracteres especiales en los nombres de las claves. Por ejemplo, utiliza `forKey: "store_id"` en lugar de `forKey: "Store ID"`.

### Rastreo de las sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:

* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" >}}

Los siguientes atributos son **opcionales**. Debes indicar **al menos uno**:

| Atributo   | Tipo   | Descripción                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Identificador de usuario único.                                                                                  |
| `usr.name`  | Cadena | Nombre descriptivo, que se muestra de forma predeterminada en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

Para identificar las sesiones de usuario, utiliza la API `setUserInfo(id:name:email:)`.

Por ejemplo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Parámetros de inicialización

Puedes utilizar las siguientes propiedades en `Datadog.Configuration` al crear la configuración de Datadog para inicializar el biblioteca:

`site`
: establece el endpoint del servidor de Datadog al que se envían los datos.

`batchSize`
: establece el tamaño preferido de los datos por lotes cargados en Datadog. Este valor influye en el tamaño y el número de solicitudes realizadas por el SDK de RUM iOS (lotes pequeños significan más solicitudes, pero cada solicitud se hace más pequeña en tamaño). Los valores disponibles son: `.small`, `.medium` y `.large`.

`uploadFrequency`
: establece la frecuencia preferida de carga de datos a Datadog. Los valores disponibles son: `.frequent`, `.average` y `.rare`.

### Configuración de RUM

Puedes utilizar las siguientes propiedades en `RUM.Configuration` al activar RUM:

`sessionSampleRate`
: establece la frecuencia de muestreo para las sesiones de RUM. El valor `sessionSampleRate` debe estar entre `0.0` y `100.0`. Un valor de `0.0` significa que no se envía ninguna sesión, `100.0` significa que todas las sesiones se envían a Datadog. Si no se configura, se utiliza el valor por defecto de `100.0`.

`uiKitViewsPredicate`
: activa el rastreo de `UIViewControllers` como vistas de RUM. Puedes utilizar la implementación predeterminada de `predicate` configurando `DefaultUIKitRUMViewsPredicate` o puedes implementar [tu propio `UIKitRUMViewsPredicate`](#automatically-track-views) personalizado para tu aplicación.

`uiKitActionsPredicate`
: permite realizar un rastreo de las interacciones del usuario (toques) como acciones de RUM. Puedes usar la implementación por defecto de `predicate` configurando `DefaultUIKitRUMActionsPredicate` o puedes implementar [tu propio `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personalizado para tu aplicación.

`urlSessionTracking`
: habilita el rastreo de tareas `URLSession` (solicitudes de red) como recursos de RUM. El parámetro `firstPartyHostsTracing` define hosts que se categorizan como recursos `first-party` (si RUM está habilitado) y tienen información de rastreo inyectada (si la función de rastreo está habilitada). El parámetro `resourceAttributesProvider` define un cierre para proporcionar atributos personalizados para los recursos interceptados que se llama para cada recurso recopilado por el SDK de RUM iOS. Este cierre se llama con información de la tarea y puede devolver atributos de recursos personalizados o `nil` si no se deben adjuntar atributos.

`viewEventMapper`
: establece la devolución de llamadas de depuración de datos para las vistas. Puede utilizarse para modificar las vistas de eventos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`resourceEventMapper`
: establece la devolución de llamadas de limpieza de recursos. Puede utilizarse para modificar o soltar los eventos de recursos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`actionEventMapper`
: establece la devolución de llamadas de limpieza de acciones. Puede utilizarse para modificar o soltar los eventos antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`errorEventMapper`
: establece la devolución de llamadas de limpieza de errores. Puede utilizarse para modificar o soltar los eventos de error antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
: establece la devolución de llamadas de limpieza de tareas largas. Puede utilizarse para modificar o soltar tareas largas antes de que se envíen a Datadog. Para más información, consulta [Modificar o soltar eventos de RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: establece la frecuencia preferida de recopilación de signos vitales móviles. Los valores disponibles son: `.frequent` (cada 100ms), `.average` (cada 500ms), `.rare` (cada 1s) y `.never` (desactivar monitorización de signos vitales).

`appHangThreshold`
: establece el umbral para informar de las caídas de la aplicación. El valor mínimo permitido para esta opción es `0.1` segundos. Para desactivar la notificación de caídas de aplicaciones, establece esta opción en `nil`. Para obtener más información, consulta [Añadir informes de caídas de aplicaciones][10].

### Rastrear vistas automáticamente

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

Dentro de la implementación de `rumView(for:)`, tu aplicación debe decidir si una instancia dada de `UIViewController` debe iniciar la vista de RUM (valor de retorno) o no (retorno `nil`). El valor `RUMView` devuelto debe especificar el `name` y puede proporcionar `attributes` adicionales para la vista de RUM creada.

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

**Nota**: El SDK de RUM iOS llama a `rumView(for:)` muchas veces mientras tu aplicación se está ejecutando. Es recomendado para mantener tu implementación rápida y de un solo subproceso.

### Rastreo automático de las acciones de los usuarios

Para realizar un rastreo automático de las acciones de toque del usuario, configura la opción `uiKitActionsPredicate` al activar RUM.

### Rastrear solicitudes de red automáticamente

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

Además, puedes configurar hosts primarios con `urlSessionTracking`. Esto clasifica los recursos que coinciden con el dominio dado como "primario" (first party) en RUM y propaga la información de rastreo a tu backend (si has activado el rastreo). Las trazas (traces) de red se muestrean con una frecuencia de muestreo ajustable. Por defecto, se aplica un muestreo del 20%.

Por ejemplo, puedes configurar `example.com` como host primario y activar las funciones RUM y el rastreo:

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

[1]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

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
@import DatadogObjc;

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
// ... captura el `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... captura el `error`
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

| Tipo de evento       | Clave de atributo                     | Descripción                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvento     | `RUMViewEvent.view.name`             | Nombre de la vista.                        |
|                  | `RUMViewEvent.view.url`              | URL de la vista.                         |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nombre de la acción.                      |
|                  | `RUMActionEvent.view.url`            | URL de la vista vinculada a esta acción.   |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Mensaje de error.                           |
|                  | `RUMErrorEvent.error.stack`          | Stack trace del error.                 |
|                  | `RUMErrorEvent.error.resource?.url`  | URL del recurso al que se refiere el error. |
|                  | `RUMErrorEvent.view.url`             | URL de la vista vinculada a este error.    |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL del recurso.                     |
|                  | `RUMResourceEvent.view.url`          | URL de la vista vinculada a este recurso. |

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/ios
[3]: /es/real_user_monitoring/ios/data_collected
[4]: /es/real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /es/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /es/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[7]: /es/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[9]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogObjc/Sources/RUM/RUM%2Bobjc.swift
[10]: /es/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting