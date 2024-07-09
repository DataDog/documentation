---
aliases:
- /es/tracing/setup_overview/setup/ios/
- /es/tracing/setup/ios/
- /es/tracing/trace_collection/dd_libraries/ios
code_lang: ios
code_lang_weight: 90
description: Recopila trazas de tus aplicaciones de iOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente dd-sdk-ios
- link: tracing/visualization/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
kind: documentación
title: Rastreo de aplicaciones de iOS
type: lenguaje de código múltiple
---
Envía [trazas][1] a Datadog desde tus aplicaciones de iOS con [la biblioteca de rastreo del cliente `dd-sdk-ios` de Datadog][1] y aprovecha las siguientes características:

* Crea [tramos (spans)][3] personalizados para las operaciones de tu aplicación.
* Envía logs para cada tramo individualmente.
* Utiliza los atributos predeterminados y añade atributos personalizados a cada tramo.
* Aprovechar el uso optimizado de red con publicaciones masivas automáticas.

<div class="alert alert-info"><strong>Nota</strong>: Datadog factura por la <strong>ingesta e indexación</strong> de tramos enviados desde tus aplicaciones de iOS, pero no factura  por los dispositivos subyacentes. Para obtener más información, consulta la <a href="/account_management/billing/apm_tracing_profiler/">documentación de facturación de APM</a>.</div>

## Configuración

1. Declara la biblioteca como una dependencia en función de tu gestor de paquetes:

{{< tabs >}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][4] para instalar `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogTrace'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Para integrar utilizando Swift Package Manager de Apple, añade lo siguiente como dependencia a tu `Package.swift`:
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

Puedes utilizar [Carthage][5] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos de trabajo:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogTrace.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. Inicializa la biblioteca con el contexto de tu aplicación y tu [token de cliente de Datadog][2]. Por razones de seguridad, debes utilizar un token de cliente: no puedes utilizar [claves de API de Datadog][3] para configurar la biblioteca `dd-sdk-ios`, ya que estarían expuestas del lado del cliente en el código de bytes IPA de la aplicación iOS.

Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][2].

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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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

Antes de que los datos se carguen en Datadog, se almacenan en texto claro en el directorio de caché (`Library/Caches`) de tu [entorno de prueba de aplicaciones][6]. El directorio de caché no puede ser leído por ninguna otra aplicación instalada en el dispositivo.

Al redactar tu aplicación, habilita los logs de desarrollo para registrar en consola todos los mensajes internos del SDK con una prioridad igual o superior al nivel proporcionado.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. El rastreador de Datadog implementa los estándares [OpenTracing][8] y [OpenTelemetry][12]. Configura y habilita el compartido OpenTracing como `Tracer.shared()`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(
        networkInfoEnabled: true
    )
)

let tracer = Tracer.shared()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDTraceConfiguration *configuration = [[DDTraceConfiguration alloc] init];
configuration.networkInfoEnabled = YES;

[DDTrace enableWithConfiguration:configuration];

DDTracer *tracer = [Tracer shared];
```
{{% /tab %}}
{{< /tabs >}}

4. Instrumenta tu código utilizando los siguientes métodos:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = tracer.startSpan(operationName: "<span_name>")
// do something you want to measure ...
// ... then, when the operation is finished:
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [tracer startSpan:@"<span_name>"];
// do something you want to measure ...
// ... then, when the operation is finished:
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

5. (Opcional) - Define la relación elemento principal-secundario entre tus tramos:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = tracer.startSpan(
    operationName: "response decoding",
    childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
)
// ... decode HTTP response data ...
responseDecodingSpan.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> responseDecodingSpan = [tracer startSpan:@"response decoding"
                                                            childOf:networkRequestSpan.context];
// ... decode HTTP response data ...
[responseDecodingSpan finish];
```
{{% /tab %}}
{{< /tabs >}}

6. (Opcional) Proporciona etiquetas (tags) adicionales junto a tu tramo:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setTag(key: "http.url", value: url)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span setTag:@"http.url" value:url];
```
{{% /tab %}}
{{< /tabs >}}

7. (Opcional) Adjunta un error a un tramo. Para hacerlo, registra la información del error utilizando los [campos estándar de logs Open Tracing][9]:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.log(
    fields: [
        OTLogFields.event: "error",
        OTLogFields.errorKind: "I/O Exception",
        OTLogFields.message: "File not found",
        OTLogFields.stack: "FileReader.swift:42",
    ]
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span log:@{
    @"event": @"error",
    @"error.kind": @"I/O Exception",
    @"message": @"File not found",
    @"stack": @"FileReader.swift:42",
}];
```
{{% /tab %}}
{{< /tabs >}}

8. (Opcional) Para distribuir trazas entre tus entornos, por ejemplo frontend a backend, puedes hacerlo manualmente o aprovechar nuestra instrumentación automática. En ambos casos, las trazas de red se muestrean con una frecuencia de muestreo ajustable. Por defecto se aplica un muestreo del 20%.

* Para propagar manualmente la traza, inyecta el contexto del tramo en los encabezados `URLRequest`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
var request: URLRequest = ... // the request to your API

let span = tracer.startSpan(operationName: "network request")

let headersWriter = HTTPHeadersWriter(samplingRate: 20)
tracer.inject(spanContext: span.context, writer: headersWriter)

for (headerField, value) in headersWriter.tracePropagationHTTPHeaders {
    request.addValue(value, forHTTPHeaderField: headerField)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [tracer startSpan:@"network request"];
DDHTTPHeadersWriter *headersWriter = [[DDHTTPHeadersWriter alloc] initWithSamplingRate:20];

NSError *error = nil;
[tracer inject:span.context
        format:OT.formatTextMap
    carrier:headersWriter
        error:&error];

for (NSString *key in headersWriter.tracePropagationHTTPHeaders) {
    NSString *value = headersWriter.tracePropagationHTTPHeaders[key];
    [request addValue:value forHTTPHeaderField:key];
}
```
{{% /tab %}}
{{< /tabs >}}

Esto define encabezados de rastreo adicionales en tu solicitud para que tu backend pueda extraer la solicitud y continuar el rastreo distribuido. Una vez finalizada la solicitud, llama a `span.finish()` dentro de un controlador de finalización. Si tu backend también está instrumentado con [Datadog APM y el rastreo distribuido][10], la totalidad de la traza frontend-backend aparece en el dashboard de Datadog.

* Para que el SDK rastree automáticamente todas las solicitudes de red realizadas a la hosts dados, especifica la matriz `firstPartyhosts` durante la inicialización de Datadog, habilita `URLSessionInstrumentation` para tu tipo de delegado y transfiere la instancia de delegado a la URLSession:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(
        urlSessionTracking: Trace.Configuration.URLSessionTracking(
            firstPartyHostsTracing: .trace(hosts: ["example.com", "api.yourdomain.com"])
        )
    )
)

URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self,
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDTraceFirstPartyHostsTracing *firstPartyHosts = [DDTraceFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com", @"api.yourdomain.com"]
                                                                                            sampleRate: 20];

DDTraceURLSessionTracking *urlSessionTracking = [DDTraceURLSessionTracking alloc] initWithFirstPartyHostsTracing:firstPartyHosts];
DDTraceConfiguration *configuration = [[DDTraceConfiguration] alloc] init];
[configuration setURLSessionTracking:urlSessionTracking];

[DDTrace enableWithConfiguration:configuration];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                        delegate:[[DDNSURLSessionDelegate alloc] init]
                                                    delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

Esto rastrea todas las solicitudes realizadas con esta `session` hasta los hosts `example.com` y `api.yourdomain.com` (por ejemplo, `https://api.yourdomain.com/v2/users` o `https://subdomain.example.com/image.png`).

**Nota**: La instrumentación automática del rastreo utiliza el swizzling de `URLSession` y es opcional. Si no se especifica `firstPartyhosts`, no se aplica el swizzling.

## Recopilación de lotes

Todos los tramos se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación de admisión. Se envían en cuanto la red se encuentra disponible y la batería es lo suficientemente alta como para garantizar que el SDK de Datadog no afecte a la experiencia del usuario final. Si la red no se encuentra disponible mientras la aplicación está en primer plano, o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que aunque los usuarios abran tu aplicación estando desconectados, no se perderá ningún dato.

Los datos en disco se descartarán automáticamente si son demasiado antiguos, para garantizar que el SDK no utiliza demasiado espacio en disco.

## Inicialización

Los siguientes atributos de `Trace.Configuration` pueden utilizarse al crear el rastreador:

| Método | Descripción |
|---|---|
| `service` | Configura el valor del `service`. |
| `networkInfoEnabled` | Selecciona `true` para enriquecer las trazas con información sobre la conexión de red (estado de accesibilidad, tipo de conexión, nombre del operador móvil, etc.).|
| `tags` | Configura un par de etiquetas `<KEY>:<VALUE>` que se añadirán a tramos creados por el rastreador. |
| `bundleWithRumEnabled` | Configura como `true` para permitir que los tramos se enriquezcan con la información de la vista RUM actual. Esto te permite ver todos los tramos generados durante la vida útil de una vista específica en el Explorador RUM. |
| `sampleRate` | Configura un valor `0-100` para definir el porcentaje de trazas a recopilar. |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/es/tracing/visualization/#spans
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/#client-tokens
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[8]: https://opentracing.io
[9]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[10]: https://docs.datadoghq.com/es/tracing/
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: /es/tracing/trace_collection/custom_instrumentation/ios/otel