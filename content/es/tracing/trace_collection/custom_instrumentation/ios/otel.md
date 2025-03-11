---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/ios/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ios
description: Instrumenta tu aplicación iOS y tvOS con la API de OpenTelemetry para
  enviar trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación personalizada de iOS y tvOS con la API de OpenTelemetry
---

{{% otel-custom-instrumentation-lang %}}

## Requisitos y limitaciones

- DatadogTrace para iOS y tvOS versión 2.12.0+.


## Rastreo de aplicaciones iOS con OpenTelemetry

1. Declara la biblioteca como una dependencia en función de tu gestor de paquetes:

{{< tabs >}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods](https://cocoapods.org/) para instalar `dd-sdk-ios`:

```
pod 'DatadogCore'
pod 'DatadogTrace'
```

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Para integrar con Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCore
DatadogTrace
```

{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Cartago](https://github.com/Carthage/Carthage) para instalar `dd-sdk-ios`:

```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
OpenTelemetryApi.xcframework
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogTrace.xcframework
```

{{% /tab %}}
{{< /tabs >}}

2. Inicializa la biblioteca con el contexto de tu aplicación y tu [token de cliente de Datadog][9]. Por razones de seguridad, debes utilizar un token de cliente: no puedes utilizar [claves de API de Datadog][10] para configurar la biblioteca `dd-sdk-ios`, ya que estarían expuestas del lado del cliente en el código de bytes IPA de la aplicación iOS.

Para más información sobre cómo configurar un token de cliente, consulta la [documentación sobre tokens de cliente][11].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Para cumplir con la normativa GDPR, el SDK requiere el valor `trackingConsent` en la inicialización.
El valor `trackingConsent` puede ser uno de los siguientes:

- `.pending`: el SDK comienza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. El SDK espera al nuevo valor de consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `.granted`: el SDK comienza a recopilar los datos y los envía a Datadog.
- `.notGranted`: el SDK no recopila ningún dato: los logs, trazas (traces) y eventos RUM no se envían a Datadog.

Para cambiar el valor del consentimiento de rastreo una vez inicializado el SDK, utiliza la llamada a la API `Datadog.set(trackingConsent:)`.

El SDK cambia su comportamiento según el nuevo valor. Por ejemplo, si el consentimiento de rastreo actual es `.pending`:

- Si se cambia a `.granted`, el SDK envía todos los datos actuales y futuros a Datadog;
- Si se cambia a `.notGranted`, el SDK borra todos los datos actuales y deja de recopilar datos futuros.

Antes de que los datos se carguen en Datadog, se almacenan en texto simple en el directorio de caché (`Library/Caches`) de tu [entorno de pruebas de aplicaciones][12]. El directorio de caché no puede ser leído por ninguna otra aplicación instalada en el dispositivo.

Al redactar tu aplicación, habilita los logs de desarrollo para registrar en consola todos los mensajes internos del SDK con una prioridad igual o superior al nivel proporcionado.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{< /tabs >}}

3. El rastreador de Datadog implementa el [estándar de OpenTelemetry][13]. Habilita el rastreador de Datadog, registra el proveedor del rastreador y obtén la instancia del rastreador:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace
import OpenTelemetryApi

Trace.enable(
    with: Trace.Configuration(
        networkInfoEnabled: true
    )
)

OpenTelemetry.registerTracerProvider(
    tracerProvider: OTelTracerProvider()
)

let tracer = OpenTelemetry
    .instance
    .tracerProvider
    .get(instrumentationName: "", instrumentationVersion: nil)
```
{{% /tab %}}
{{< /tabs >}}

4. Instrumenta tu código con la API de OpenTelemetry:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = tracer.spanBuilder(spanName: "<span_name>").startSpan()
// haz algo que deseas medir...
// ... luego, cuando termina la operación:
span.end()
```
{{% /tab %}}
{{< /tabs >}}

5. (opcional) Establece la relación principal-secundario entre tus tramos:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = tracer.spanBuilder(spanName: "response decoding")
    .setParent(networkRequestSpan) // haz que sea tramo secundario de `networkRequestSpan`
    .startSpan()

// ... decodifica los datos de respuesta HTTP ...
responseDecodingSpan.end()
```
{{% /tab %}}
{{< /tabs >}}

6. (Opcional) Proporciona atributos adicionales junto a tu tramo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setAttribute(key: "http.url", value: url)
```
{{% /tab %}}
{{< /tabs >}}

7. (Opcional) Adjunta un error a un tramo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.status = .error(description: "Failed to decode response")
```
{{% /tab %}}
{{< /tabs >}}

8. (Opcional) Añade enlaces de tramo a tu tramo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let linkedSpan = tracer.spanBuilder(spanName: "linked span").startSpan()
linkedSpan.end()

let spanWithLinks = tracer.spanBuilder(spanName: "span with links")
    .addLink(spanContext: linkedSpan.context)
    .startSpan()
spanWithLinks.end()
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[2]: https://opentelemetry.io/docs/concepts/signals/traces/#attributes
[3]: https://opentelemetry.io/docs/concepts/signals/traces/#span-events
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[5]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[6]: /es/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[9]: /es/account_management/api-app-keys/#client-tokens
[10]: /es/account_management/api-app-keys/#api-keys
[11]: /es/account_management/api-app-keys/#client-tokens
[12]: https://support.apple.com/en-gb/guide/security/sec15bfe098e/web
[13]: https://opentelemetry.io/docs/concepts/signals/traces/