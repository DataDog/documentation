---
aliases:
- /es/feature_flags/setup/ios/
description: Configure Datadog Feature Flags para aplicaciones iOS y tvOS.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /real_user_monitoring/ios/
  tag: Documentación
  text: Monitoreo de iOS y tvOS
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guía
  text: Proxy para el tráfico del SDK de Feature Flag
title: Feature Flags para iOS y tvOS
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación iOS o tvOS con el SDK de Feature Flags de Datadog. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

Esta guía explica cómo instalar y habilitar el SDK, crear y usar un `FlagsClient`, y configurar opciones avanzadas.

## Instalación {#installation}

Declare `DatadogFlags` como una dependencia en su proyecto. El método de instalación recomendado es Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}
Para instalar el SDK de Feature Flags de Datadog usando Swift Package Manager de Apple, agregue lo siguiente como una dependencia a su archivo `Package.swift`:

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

En su proyecto, vincule las siguientes bibliotecas:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
Para instalar el SDK de Feature Flags de Datadog usando [CocoaPods][1], declare los siguientes pods en su `Podfile`:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
Para instalar el SDK de Feature Flags de Datadog usando [Carthage][1], agregue `dd-sdk-ios` a su `Cartfile`:

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**Nota**: Datadog no proporciona binarios de Carthage precompilados. Esto significa que Carthage compila el SDK desde el código fuente. Para compilar e integrar el SDK, ejecute:

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

Después de compilar, agregue los siguientes XCFrameworks a su proyecto de Xcode (en la sección {{< ui >}}Frameworks, Libraries, and Embedded Content{{< /ui >}}):

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## Inicializar el SDK {#initialize-the-sdk}

Inicialice Datadog lo antes posible en el ciclo de vida de su aplicación, normalmente en `application(_:didFinishLaunchingWithOptions:)` (o con `@UIApplicationDelegateAdaptor` para aplicaciones SwiftUI). Esto garantiza que todas las evaluaciones de Feature Flag y la telemetría se capturen correctamente. Para crear un token de cliente, consulte [Client tokens][2].

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

## Habilitar marcadores {#enable-flags}

Después de inicializar Datadog, habilite `Flags` para adjuntarlo a la instancia actual del SDK de Datadog para iOS y prepararse para la creación del cliente y la evaluación de marcadores:

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

También puede pasar un objeto de configuración; consulte [Configuración avanzada](#advanced-configuration).

## Crear y recuperar un cliente {#create-and-retrieve-a-client}

Cree un cliente una vez, normalmente durante el inicio de la aplicación:

{{< code-block lang="swift" >}}
FlagsClient.create() // Creates the default client
{{< /code-block >}}

Recupere el mismo cliente en cualquier parte de su aplicación:

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Retrieves the "default" client
{{< /code-block >}}

También puede crear y recuperar múltiples clientes proporcionando el parámetro `name`:

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">Si ya existe un cliente con el nombre proporcionado, se reutiliza la instancia existente.</div>

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación del marcador mediante un `FlagsEvaluationContext`. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones de los marcadores deben devolverse. Llame a este método antes de evaluar los marcadores para garantizar una segmentación adecuada.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="swift" >}}
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "email": .string("user@example.com"),
            "tier":  .string("premium")
        ]
    )
)
{{< /code-block >}}

Este método obtiene las asignaciones de los marcadores del servidor de forma asíncrona. Al proporcionar una devolución de llamada de finalización opcional o utilizar la variante async/await, puede manejar el resultado de la evaluación del contexto:

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Context set successfully
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## Evalúe marcadores {#evaluate-flags}

Después de crear el `FlagsClient` y establecer su contexto de evaluación, puede comenzar a leer los valores de los marcadores en toda su app. La evaluación de marcadores es _local e instantánea_: el SDK utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar marcadores. Esto hace que las evaluaciones sean seguras para realizarse en el hilo principal.

Cada marcador se identifica mediante una _clave_ (una cadena única) y se puede evaluar con un _getter tipado_ que devuelve un valor del tipo esperado. Si el marcador no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

### Marcadores booleanos {#boolean-flags}

Utilice `getBooleanValue(key:defaultValue:)` para marcadores que representen condiciones de encendido/apagado o verdadero/falso. Por ejemplo:

{{< code-block lang="swift" >}}
let isNewCheckoutEnabled = flagsClient.getBooleanValue(
    key: "checkout.new",
    defaultValue: false
)

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Marcadores de cadena {#string-flags}

Utilice `getStringValue(key:defaultValue:)` para marcadores que seleccionen entre múltiples variantes o cadenas de configuración. Por ejemplo:

{{< code-block lang="swift" >}}
let theme = flagsClient.getStringValue(
    key: "ui.theme",
    defaultValue: "light"
)

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Marcadores de tipo entero y doble{#integer-and-double-flags}

Para marcadores numéricos, utilice `getIntegerValue(key:defaultValue:)` o `getDoubleValue(key:defaultValue:)`. Estos son apropiados cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="swift" >}}
let maxItems = flagsClient.getIntegerValue(
    key: "cart.items.max",
    defaultValue: 20
)

let priceMultiplier = flagsClient.getDoubleValue(
    key: "pricing.multiplier",
    defaultValue: 1.0
)
{{< /code-block >}}

### Marcadores de objeto {#object-flags}

Para datos estructurados o similares a JSON, utilice `getObjectValue(key:defaultValue:)`. Este método devuelve un `AnyValue`, que puede representar primitivos, arreglos o diccionarios. Los marcadores de objeto son útiles para escenarios de configuración remota donde se deben proporcionar múltiples propiedades juntas. Por ejemplo:

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite algo más que el valor del marcador, utilice las API `get<Type>Details`. Estos métodos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

Por ejemplo:

{{< code-block lang="swift" >}}
let details = flagsClient.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Evaluated value (for example: "A", "B", or "control")
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.error)    // The error that occurred during evaluation, if any
{{< /code-block >}}

Los detalles del marcador pueden ayudarle a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Observe los cambios de estado {#observe-state-changes}

<div class="alert alert-info">La observación de estado con <code>FlagsClient.state</code> está disponible en <code>dd-sdk-ios</code> 3.11.0 y versiones posteriores.</div>

Utilice `flagsClient.state` para verificar si un `FlagsClient` está listo para evaluar marcadores y para reaccionar cuando su estado cambie. Los cambios de estado ocurren cuando usted llama a `setEvaluationContext` y el SDK obtiene las asignaciones para ese contexto.

{{< code-block lang="swift" >}}
final class FeatureFlagStateObserver: FlagsStateListener {
    func flagsStateDidChange(_ newState: FlagsClientState) {
        switch newState {
        case .notReady:
            // The client has not loaded assignments yet.
            break
        case .reconciling:
            // The client is fetching assignments for a context change.
            break
        case .ready:
            // Assignments are loaded and available for evaluation.
            break
        case .stale:
            // Cached assignments are available, but the latest fetch failed.
            break
        case .error:
            // No assignments are available for evaluation.
            break
        }
    }
}

let observer = FeatureFlagStateObserver()
flagsClient.state.addListener(observer)

let currentState = flagsClient.state.currentState
{{< /code-block >}}

Mantenga una referencia fuerte al oyente durante todo el tiempo que desee recibir actualizaciones. El oyente recibe el estado actual cuando se registra, y luego recibe los cambios de estado futuros.

## Usar con OpenFeature {#use-with-openfeature}

Los ejemplos anteriores utilizan la API `FlagsClient` de Datadog directamente. Si prefiere la API estándar de [OpenFeature](https://openfeature.dev/), Datadog ofrece un proveedor de OpenFeature para iOS que envuelve `FlagsClient` y lo expone a través de `OpenFeatureAPI.shared`. Los mismos datos de los marcadores se sirven a través de cualquiera de las dos interfaces; elija la API que mejor se adapte a su aplicación.

<div class="alert alert-info">El puente de OpenFeature para iOS (<a href="https://github.com/DataDog/dd-openfeature-provider-swift"><code>dd-openfeature-provider-swift</code></a>) está disponible para su uso como un paquete anterior a la versión 1.0. Hasta que alcance la versión 1.0, las actualizaciones de versión pueden incluir cambios importantes. Utilice esta sección para integrar a través de OpenFeature; utilice <code>FlagsClient</code> directamente para obtener la interfaz de API de iOS más estable.</div>

### Instale el proveedor de OpenFeature {#install-the-openfeature-provider}

Agregue `dd-openfeature-provider-swift` a su `Package.swift`:

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/DataDog/dd-openfeature-provider-swift.git", .upToNextMajor(from: "0.2.0"))
{{< /code-block >}}

Vincule el producto `DatadogOpenFeatureProvider` a su objetivo de aplicación. El puente depende del SDK de OpenFeature para Swift 0.3.0.

### Inicialice OpenFeature {#initialize-openfeature}

Inicialice Datadog y habilite los marcadores como se muestra en [Inicialice el SDK](#initialize-the-sdk). Luego, cree un `DatadogProvider` y regístrelo con `OpenFeatureAPI.shared`:

{{< code-block lang="swift" >}}
import DatadogCore
import DatadogFlags
import DatadogOpenFeatureProvider
import OpenFeature

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)

Flags.enable()

let context = MutableContext(targetingKey: "user-123")
let provider = DatadogProvider()
await OpenFeatureAPI.shared.setProviderAndWait(provider: provider, initialContext: context)
{{< /code-block >}}

`setProviderAndWait` es `async` y no genera excepciones. Después de que regrese, el proveedor estará listo y las evaluaciones de marcadores utilizarán valores almacenados en caché.

### Establezca el contexto de evaluación {#set-the-evaluation-context-1}

El contexto de evaluación identifica a quién o a qué se aplica la evaluación del marcador. Páselo durante el registro del proveedor, como se muestra arriba, o actualícelo más tarde:

{{< code-block lang="swift" >}}
let updatedContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "email": Value.string("user@example.com"),
        "tier":  Value.string("premium")
    ])
)

await OpenFeatureAPI.shared.setEvaluationContextAndWait(evaluationContext: updatedContext)
{{< /code-block >}}

La `targetingKey` es el sujeto de aleatorización para los despliegues porcentuales: la misma clave siempre recibe la misma variante para un marcador determinado.

### Evaluar marcadores {#evaluate-flags-1}

Recupere el cliente global de OpenFeature y llame a los getters tipados:

{{< code-block lang="swift" >}}
let client = OpenFeatureAPI.shared.getClient()

let isNewCheckoutEnabled = client.getBooleanValue(key: "checkout.new", defaultValue: false)

let theme = client.getStringValue(key: "ui.theme", defaultValue: "light")

let maxItems = client.getIntegerValue(key: "cart.items.max", defaultValue: 20)

let priceMultiplier = client.getDoubleValue(key: "pricing.multiplier", defaultValue: 1.0)

let config = client.getObjectValue(
    key: "ui.config",
    defaultValue: Value.structure([
        "color": Value.string("#00A3FF"),
        "fontSize": Value.integer(14)
    ])
)
{{< /code-block >}}

Las evaluaciones son sincrónicas y seguras de realizar en el hilo principal; leen desde la caché local del SDK y no realizan solicitudes de red. Tenga en cuenta que `getIntegerValue` devuelve `Int64`; conviértalo a `Int` en el sitio de la llamada si es necesario.

### Detalles de evaluación de marcadores {#flag-evaluation-details-1}

Utilice los métodos `get<Type>Details` cuando necesite el motivo, la variante o cualquier error de evaluación además del valor:

{{< code-block lang="swift" >}}
let details = client.getStringDetails(key: "paywall.layout", defaultValue: "control")

print(details.value)    // Evaluated value
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Reason (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode) // Error code, if evaluation failed
{{< /code-block >}}

### Observe eventos del proveedor {#observe-provider-events}

<div class="alert alert-info">La observación de eventos del proveedor para el proveedor OpenFeature de Datadog está disponible en <code>dd-openfeature-provider-swift</code> 0.2.0 o posterior. La versión 0.2.0 depende de <code>dd-sdk-ios</code> 3.13.0 o posterior.</div>

Use `OpenFeatureAPI.shared.observe()` para reaccionar a los eventos del proveedor OpenFeature. El proveedor OpenFeature de Datadog emite `.ready`, `.stale` y `.error` según el estado del `FlagsClient` subyacente. El SDK de OpenFeature también puede emitir eventos de ciclo de vida como `.reconciling` y `.contextChanged` cuando cambia el contexto de evaluación.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature

final class FeatureFlagEventObserver {
    private var cancellable: AnyCancellable?

    func startObserving() {
        cancellable = OpenFeatureAPI.shared.observe().sink { event in
            guard let event else {
                return
            }

            switch event {
            case .ready:
                // The provider is ready to evaluate flags.
                break
            case .stale:
                // Cached assignments are available, but they may be out of date.
                break
            case .error(_, _):
                // The provider cannot evaluate flags.
                break
            case .reconciling:
                // The provider is reconciling after a context change.
                break
            case .contextChanged:
                // The context change completed.
                break
            case .configurationChanged:
                // The provider configuration changed.
                break
            }
        }
    }
}
{{< /code-block >}}

## Configuración avanzada {#advanced-configuration}

La API `Flags.enable()` acepta una configuración opcional con las opciones enumeradas a continuación.

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
: Cuando `true` (predeterminado), el SDK registra automáticamente un _evento de exposición_ cuando se evalúa un marcador. Estos eventos contienen metadatos sobre qué marcador se accedió, qué variante se entregó y bajo qué contexto. Se envían a Datadog para que el usuario pueda analizar posteriormente la adopción de funciones. Si solo necesita una evaluación local sin telemetría, puede desactivar esta opción.

`rumIntegrationEnabled`
: Cuando `true` (predeterminado), las evaluaciones de marcadores se rastrean en RUM, lo que permite correlacionarlos con las sesiones de usuario. Esto permite análisis como _“¿Los usuarios en la variante B experimentan más errores?”_. Si su aplicación no utiliza RUM, este marcador no tiene efecto y puede dejarse de forma segura en su valor predeterminado.

`gracefulModeEnabled`
: Controla cómo el SDK maneja el uso incorrecto de la API `FlagsClient`: por ejemplo, crear un cliente antes de llamar a `Flags.enable()`, crear un cliente duplicado con el mismo nombre o recuperar un cliente que aún no se ha creado.

  El comportamiento exacto del Graceful Mode depende de su configuración de compilación:

  * **Compilaciones de lanzamiento**: El SDK siempre aplica Graceful Mode: cualquier uso indebido solo se registra internamente si `Datadog.verbosityLevel` está configurado.
  * **Compilaciones de depuración** con `gracefulModeEnabled = true` (predeterminado): El SDK siempre registra advertencias en la consola.
  * **Compilaciones de depuración** con `gracefulModeEnabled = false`: El SDK genera `fatalError` por el uso incorrecto de la API, lo que aplica un enfoque de falla rápida que ayuda a detectar errores de configuración a tiempo.

  Puede ajustar `gracefulModeEnabled` según su fase de desarrollo o control de calidad.

`customFlagsEndpoint`
: Configura una URL de servidor personalizada para recuperar las asignaciones de marcadores.

`customExposureEndpoint`
: Configura una URL de servidor personalizada para enviar datos de exposición de marcadores.

`customEvaluationEndpoint`
: Configura una URL de servidor personalizada para enviar telemetría de evaluación de marcadores.

`customFlagsHeaders`
: Establece encabezados HTTP adicionales para adjuntar a las solicitudes realizadas a `customFlagsEndpoint`. Puede ser útil para la autenticación o el enrutamiento al utilizar su propio servicio de marcadores.

## Pruebas {#testing}

Los ejemplos anteriores utilizan la API de `FlagsClient` de Datadog directamente. Si utiliza el puente [OpenFeature](https://openfeature.dev/) o escribe pruebas en torno a la API de OpenFeature, sustituya un proveedor en memoria para obtener valores de marcadores controlados por código.

Puede probar en un entorno de prueba dedicado de Datadog con el `DatadogProvider` real, o cambiarlo por un `FeatureProvider` en memoria para controlar directamente los valores de los marcadores en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. El SDK de Swift de OpenFeature no incluye un `InMemoryProvider`, por lo que las pruebas utilizan un pequeño `FeatureProvider` personalizado en su lugar.

{{< code-block lang="swift" >}}
import Combine
import OpenFeature
import XCTest
@testable import MyApp

// Minimal in-memory provider for tests. Copy into your test target.
final class InMemoryTestProvider: FeatureProvider {
    var hooks: [any Hook] = []
    var metadata: ProviderMetadata = Metadata(name: "in-memory-test")
    private let subject = CurrentValueSubject<ProviderEvent?, Never>(.ready)
    private let bools: [String: Bool]
    private let strings: [String: String]

    init(bools: [String: Bool] = [:], strings: [String: String] = [:]) {
        self.bools = bools
        self.strings = strings
    }

    func observe() -> AnyPublisher<ProviderEvent?, Never> { subject.eraseToAnyPublisher() }

    func initialize(initialContext: EvaluationContext?) async throws {}

    func onContextSet(oldContext: EvaluationContext?, newContext: EvaluationContext) async throws {}

    func getBooleanEvaluation(key: String, defaultValue: Bool, context: EvaluationContext?) throws -> ProviderEvaluation<Bool> {
        ProviderEvaluation(value: bools[key] ?? defaultValue, variant: bools[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) throws -> ProviderEvaluation<String> {
        ProviderEvaluation(value: strings[key] ?? defaultValue, variant: strings[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getIntegerEvaluation(key: String, defaultValue: Int64, context: EvaluationContext?) throws -> ProviderEvaluation<Int64> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) throws -> ProviderEvaluation<Double> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) throws -> ProviderEvaluation<Value> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    private struct Metadata: ProviderMetadata { var name: String? }
}

final class CheckoutFlagTests: XCTestCase {
    override func tearDown() {
        OpenFeatureAPI.shared.clearProvider()
    }

    func testNewCheckoutEnabled() async throws {
        let provider = InMemoryTestProvider(bools: ["new-checkout-flow": true])
        await OpenFeatureAPI.shared.setProviderAndWait(provider: provider)

        let client = OpenFeatureAPI.shared.getClient()
        XCTAssertTrue(client.getBooleanValue(key: "new-checkout-flow", defaultValue: false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI.shared` es un singleton global, así que llame a `clearProvider()` en `tearDown` para evitar que los marcadores de una prueba se filtren en otra. `setProviderAndWait(provider:)` es `async` y no lanza excepciones, por lo que no se requiere `try`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/account_management/api-app-keys/#client-tokens