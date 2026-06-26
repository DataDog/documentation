---
aliases:
- /es/feature_flags/setup/ios/
description: Configura indicadores de funciones para aplicaciones iOS y tvOS.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Indicadores de funciones del lado del cliente
- link: /real_user_monitoring/ios/
  tag: Documentación
  text: Monitorización de iOS y tvOS
title: Indicadores de funciones para iOS y tvOS
---

## Información general

En esta página se describe cómo instrumentar tu aplicación iOS o tvOS con el SDK de indicadores de funciones de Datadog. Los indicadores de funciones de Datadog ofrecen una forma unificada de controlar de forma remota la disponibilidad de funciones en tu aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

Esta guía explica cómo instalar y activar el SDK, crear y utilizar `FlagsClient` y configurar las opciones avanzadas.

## Instalación

Declara `DatadogFlags` como dependencia en tu proyecto. El método de instalación recomendado es Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}
Para instalar el SDK de indicadores de funciones de Datadog utilizando el Swift Package Manager de Apple, añade lo siguiente como dependencia a tu archivo `Package.swift`:

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

En tu proyecto, vincula las siguientes bibliotecas:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
Para instalar el SDK de indicadores de funciones de Datadog utilizando [CocoaPods][1], declara los siguientes pods en tu `Podfile`:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
Para instalar el SDK de indicadores de funciones de Datadog utilizando [Carthage][1], añade `dd-sdk-ios` a tu `Cartfile`:

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**Nota**: Datadog no proporciona binarios Carthage precompilados. Esto significa que Carthage compila el SDK a partir de la fuente. Para compilar e integrar el SDK, ejecuta:

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

Tras la compilación, añade los siguientes XCFrameworks a tu proyecto Xcode (en la sección "Frameworks, Libraries, and Embedded Content" [Marcos, bibliotecas y contenido incrustado]):

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## Inicializar el SDK

Inicializa Datadog lo antes posible en el ciclo de vida de tu aplicación, normalmente en `application(_:didFinishLaunchingWithOptions:)` (o con `@UIApplicationDelegateAdaptor` para aplicaciones SwiftUI). Esto garantiza que todas las evaluaciones de indicadores de funciones y la telemetría se capturen correctamente.

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

## Activar indicadores

Después de inicializar Datadog, activa `Flags` para adjuntarlo a la instancia de SDK Datadog actual y prepárate para la creación de clientes y la evaluación de indicadores:

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

También puedes pasar un objeto de configuración. Consulta [Configuración avanzada](#advanced-configuration).

## Crear y recuperar un cliente

Crea un cliente una vez, normalmente durante el inicio de la aplicación:

{{< code-block lang="swift" >}}
FlagsClient.create() // Crea el cliente por defecto
{{< /code-block >}}

Recupera el mismo cliente en cualquier parte de tu aplicación:

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Recupera el cliente por defecto
{{< /code-block >}}

También puedes crear y recuperar varios clientes proporcionando el parámetro `name`:

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">Si ya existe un cliente con el nombre dado, se reutiliza la instancia existente.</div>

## Definir el contexto de evaluación

Define a quién o a qué se aplica la evaluación de indicadores utilizando `FlagsEvaluationContext`. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones del indicador deben devolverse. Llama a este método antes de evaluar los indicadores para garantizar una orientación adecuada.

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

Este método obtiene asignaciones de indicadores del servidor de forma asíncrona. Proporcionando un callback de finalización opcional o utilizando la variante async/await puedes manejar el resultado de una evaluación del contexto:

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Contexto definido con éxito
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## Evaluar indicadores

Después de crear `FlagsClient` y definir su contexto de evaluación, puedes empezar a leer los valores de los indicadores en toda tu aplicación. La evaluación de indicadores es _local e instantánea_: el SDK utiliza datos almacenados en caché local, por lo que no se producen solicitudes de red al evaluar indicadores. Esto hace que las evaluaciones sean seguras de realizar en el proceso principal.

Cada indicador se identifica mediante una _clave_ (una cadena única) y puede evaluarse con un _getter tipado_ que devuelve un valor del tipo esperado. Si el indicador no existe o no puede evaluarse, el SDK devuelve el valor por defecto proporcionado.

### Indicadores booleanos

Utiliza `getBooleanValue(key:defaultValue:)` para los indicadores que representan condiciones de activado/desactivado o verdadero/falso. Por ejemplo:

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

### Indicadores de cadena

Utiliza `getStringValue(key:defaultValue:)` para los indicadores que seleccionan entre múltiples variantes o cadenas de configuración. Por ejemplo:

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

### Indicadores enteros y dobles

Para los indicadores numéricos, utiliza `getIntegerValue(key:defaultValue:)` o `getDoubleValue(key:defaultValue:)`. Son adecuados cuando una función depende de un parámetro numérico como un límite, un porcentaje o un multiplicador:

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

### Indicadores de objetos

Para datos estructurados o de tipo JSON, utiliza `getObjectValue(key:defaultValue:)`. Este método devuelve un `AnyValue`, que puede representar primitivos, matrices o diccionarios. Los indicadores de objeto son útiles para escenarios de configuración remota en los que es necesario proporcionar varias propiedades juntas. Por ejemplo:

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### Detalles de la evaluación de indicadores

Si necesitas algo más que el valor del indicador, utiliza las API de `get<Type>Details`. Estos métodos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

Por ejemplo:

{{< code-block lang="swift" >}}
let details = flags.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Valor evaluado (por ejemplo: "A", "B" o "control")
print(details.variant)  // Nombre de la variante, si corresponde
print(details.reason)   // Descripción del motivo de la selección de esta valor (por ejemplo: "TARGETING_MATCH" o "DEFAULT")
print(details.error)    // Error ocurrido durante la evaluación, si lo hay
{{< /code-block >}}

Los detalles del indicador pueden ayudarte a depurar el comportamiento de la evaluación y a comprender por qué un usuario ha recibido un valor determinado.

## Configuración avanzada

La API `Flags.enable()` acepta una configuración opcional con las opciones que se indican a continuación.

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
: Cuando es `true` (por defecto), el SDK registra automáticamente un _evento de exposición_ cuando se evalúa un indicador. Estos eventos contienen metadatos sobre a qué indicador se ha accedido, qué variante se ha proporcionado y en qué contexto. Se envían a Datadog para que puedas analizar posteriormente la adopción de funciones. Si solo necesitas una evaluación local sin telemetría, puedes desactivar esta opción.

`rumIntegrationEnabled`
: Cuando es `true` (por defecto), las evaluaciones de los indicadores se registran en RUM, lo que permite correlacionarlas con las sesiones de usuario. Esto permite realizar análisis como _"¿Experimentan más errores los usuarios de la variante B?_. Si tu aplicación no utiliza RUM, este indicador no tiene ningún efecto y se puede dejar con seguridad en su valor predeterminado.

`gracefulModeEnabled()`
: Controla cómo el SDK gestiona el uso incorrecto de la API `FlagsClient`, por ejemplo, la creación de un cliente antes de llamar a `Flags.enable()`, la creación de un cliente duplicado con el mismo nombre o la recuperación de un cliente que aún no se ha creado.

  El comportamiento exacto del modo Graceful depende de la configuración de compilación:

  * **Compilaciones de versiones**: El SDK siempre aplica el modo elegante: cualquier uso indebido solo se registra internamente si `Datadog.verbosityLevel` está configurado.
  * **Compilaciones de depuración** con `gracefulModeEnabled = true` (por defecto): El SDK siempre registra las advertencias en la consola.
  * **Compilaciones de depuración** con `gracefulModeEnabled = false`: El SDK muestra `fatalError` en caso de uso incorrecto de la API, aplicando una estrategia rápida que ayuda a detectar errores de configuración con antelación.

  Puedes ajustar `gracefulModeEnabled` en función de tu fase de desarrollo o de control de calidad.

`customFlagsEndpoint`
: Configura una URL de servidor personalizada para recuperar asignaciones de indicadores.

`customExposureEndpoint`
: Configura una URL de servidor personalizada para enviar datos de exposición de indicadores.

`customFlagsHeaders`
: Define cabeceras HTTP adicionales para adjuntar a las solicitudes realizadas a `customFlagsEndpoint`. Puede ser útil para la autenticación o enrutamiento cuando utilizas tu propio servicio de indicadores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}