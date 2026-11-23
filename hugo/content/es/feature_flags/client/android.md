---
aliases:
- /es/feature_flags/setup/android/
description: Configure Datadog Feature Flags para aplicaciones Android y Android TV
  utilizando la API estándar de OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: https://openfeature.dev/docs/reference/technologies/client/kotlin/
  tag: Externo
  text: SDK de OpenFeature para Kotlin
- link: /real_user_monitoring/android/
  tag: Documentación
  text: Monitoreo de Android y Android TV
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guía
  text: Proxy para el tráfico del SDK de Feature Flag
title: Feature Flags para Android y Android TV
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación Android o Android TV con el SDK de Datadog Feature Flags. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El SDK de Datadog Feature Flags para Android está construido sobre [OpenFeature][1], un estándar abierto para la gestión de Feature Flags. Esta guía explica cómo instalar el SDK, configurar el proveedor de Datadog y evaluar Feature Flags en su aplicación.

<div class="alert alert-info">Para la mayoría de las aplicaciones, la API de OpenFeature es el enfoque recomendado. Si necesita múltiples contextos de evaluación independientes en la misma aplicación, consulte <a href="#direct-flagsclient-integration-advanced">Integración directa de FlagsClient</a>.</div>

## Primeros pasos {#getting-started}

Aquí tiene un ejemplo mínimo para que las Feature Flags funcionen en su aplicación Android:

```kotlin
// 1. Add dependencies (see Installation section)

// 2. Initialize the Datadog Android SDK (in Application.onCreate)
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()
Datadog.initialize(this, configuration, TrackingConsent.GRANTED)

// 3. Enable Feature Flags with a bounded initialization timeout
Flags.enable(
    FlagsConfiguration.Builder()
        .initializationTimeout(2_000L)
        .build()
)

// 4. Create and set up the OpenFeature provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()
OpenFeatureAPI.setProviderAndWait(provider)

// 5. Set evaluation context (who is the user)
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf("tier" to Value.String("premium"))
    )
)

// 6. Evaluate flags anywhere in your app
val client = OpenFeatureAPI.getClient()
val isEnabled = client.getBooleanValue("my-feature", false)
```

El resto de esta guía explica cada paso en detalle.

## Instalación {#installation}

Agregue el SDK de Datadog Feature Flags y el proveedor de OpenFeature como dependencias de Gradle en el archivo `build.gradle` de su módulo de aplicación:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

Inicialice Datadog lo antes posible en el ciclo de vida de su aplicación, normalmente en el método `onCreate()` de su clase `Application`. Esto ayuda a garantizar que todas las evaluaciones de flags y la telemetría se capturen correctamente. Para crear un token de cliente, consulte [Client tokens][2].

```kotlin
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
```

## Habilitar marcadores {#enable-flags}

Después de inicializar Datadog, habilite `Flags` para adjuntarlo a la instancia actual del SDK de Datadog para Android y prepararse para la creación del proveedor y la evaluación de Feature Flags:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags
Flags.enable()
{{< /code-block >}}

También puede pasar un objeto de configuración; consulte [Configuración avanzada](#advanced-configuration).

## Cree y configure el proveedor {#create-and-configure-the-provider}

Cree un `FlagsClient` y conviértalo en un proveedor de OpenFeature utilizando la extensión `asOpenFeatureProvider()`. Haga esto una vez durante el inicio de la aplicación:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

// Create and configure the provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()

// Set it as the OpenFeature provider
OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

<div class="alert alert-info">El proveedor de OpenFeature envuelve un Datadog <code>FlagsClient</code> internamente. Este es un detalle de implementación; una vez configurado, usted interactúa exclusivamente a través de la API estándar de OpenFeature.</div>

<div class="alert alert-warning">El SDK de OpenFeature para Kotlin utiliza un único proveedor global y un contexto de evaluación. Si necesita múltiples contextos de evaluación independientes en la misma aplicación (por ejemplo, para diferentes usuarios en una aplicación multiusuario), consulte <a href="#direct-flagsclient-integration-advanced">Integración directa de FlagsClient</a>.</div>

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación del flag mediante un `ImmutableContext`. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones de los marcadores deben devolverse. Establezca esto antes de evaluar los flags para ayudar a garantizar una segmentación adecuada.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.Value

OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to Value.String("user@example.com"),
            "tier" to Value.String("premium")
        )
    )
)
{{< /code-block >}}

<div class="alert alert-info">Los atributos de OpenFeature deben usar valores <code>Value</code> primitivos planos como <code>Value.String()</code>, <code>Value.Integer()</code>, <code>Value.Double()</code>, o <code>Value.Boolean()</code>. La clave de segmentación debe ser la misma para un mismo usuario a fin de garantizar una evaluación coherente de los flags entre sesiones. Para usuarios anónimos, utilice un UUID persistente almacenado, por ejemplo, en <code>SharedPreferences</code>.</div>

## Evalúe marcadores {#evaluate-flags}

Después de configurar su proveedor y contexto de evaluación, puede leer los valores de los flags en toda su aplicación. La evaluación de marcadores es _local e instantánea_: el SDK utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar marcadores. Esto hace que las evaluaciones sean seguras para realizarse en el hilo principal.

Cada flag se identifica mediante una _clave_ (una cadena única) y se puede evaluar con un método tipado que devuelve un valor del tipo esperado. Si el marcador no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

Primero, obtenga un cliente de OpenFeature:

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

val client = OpenFeatureAPI.getClient()
{{< /code-block >}}

### Marcadores booleanos {#boolean-flags}

Los flags booleanos representan condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = client.getBooleanValue(
    key = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Marcadores de cadena {#string-flags}

Los flags de cadena seleccionan entre múltiples variantes o cadenas de configuración:

{{< code-block lang="kotlin" >}}
val theme = client.getStringValue(
    key = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### Marcadores de tipo entero y doble{#integer-and-double-flags}

Los flags numéricos son apropiados cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="kotlin" >}}
val maxItems = client.getIntegerValue(
    key = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = client.getDoubleValue(
    key = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

### Flags estructurados {#structured-flags}

Los flags estructurados son útiles para escenarios de configuración remota donde se deben proporcionar múltiples propiedades juntas como datos tipo JSON:

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.Value

val config = client.getObjectValue(
    key = "ui.config",
    defaultValue = Value.Structure(mapOf(
        "color" to Value.String("#00A3FF"),
        "fontSize" to Value.Integer(14)
    ))
)

// Access nested values
val color = config.asStructure()?.get("color")?.asString()
val fontSize = config.asStructure()?.get("fontSize")?.asInteger()
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite más que el valor del flag, puede obtener metadatos de evaluación detallados, incluyendo el valor evaluado, el nombre de la variante, el motivo y cualquier código de error:

{{< code-block lang="kotlin" >}}
val details = client.getStringDetails(
    key = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Reason for this value (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // Error code, if any
{{< /code-block >}}

Existen métodos de detalle similares para otros tipos: `getBooleanDetails()`, `getIntegerDetails()`, `getDoubleDetails()` y `getObjectDetails()`.

Los detalles del marcador le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Observe eventos del proveedor {#observe-provider-events}

<div class="alert alert-info">La observación de eventos del proveedor está disponible en <code>dd-sdk-android-flags-openfeature</code> 3.6.0 o posterior. Utilice la misma versión para <code>dd-sdk-android-flags</code>.</div>

Utilice `OpenFeatureAPI.observe()` para reaccionar a los cambios de estado del proveedor. El proveedor OpenFeature de Datadog emite `ProviderReady`, `ProviderStale` y `ProviderError` según el estado del `FlagsClient` subyacente.

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

val stateJob = lifecycleScope.launch {
    OpenFeatureAPI.observe<OpenFeatureProviderEvents>()
        .catch {
            // Handle Flow collection errors.
        }
        .collect { event ->
            when (event) {
                is OpenFeatureProviderEvents.ProviderReady -> {
                    // The provider is ready to evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderStale -> {
                    // Cached assignments are available, but they may be out of date.
                }
                is OpenFeatureProviderEvents.ProviderError -> {
                    // The provider cannot evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderConfigurationChanged -> {
                    // The provider configuration changed.
                }
                else -> {
                    // Handle other OpenFeature provider events as needed.
                }
            }
        }
}
{{< /code-block >}}

Cancele el trabajo de recopilación cuando el componente de observación se detenga. Por ejemplo, recopile desde `lifecycleScope` en un `Activity` o `Fragment` de Android, o desde `viewModelScope` en un `ViewModel`.

## Controle la telemetría de evaluación de flags y la participación en experimentos {#control-flag-evaluation-telemetry-and-experiment-participation}

La exclusión de la telemetría de evaluación de flags requiere la versión `3.16.0` o posterior. La exclusión de Experimentation requiere la versión `3.17.0` o posterior. Utilice la misma versión de `dd-sdk-android-flags` y `dd-sdk-android-flags-openfeature`. Ambos controles son independientes y están desactivados de forma predeterminada. Consulte [Flag Evaluation and Experimentation Opt-Out][4] para conocer los conceptos compartidos.

### Controle la telemetría de evaluación de flags {#control-flag-evaluation-telemetry}

En la versión `3.16.0` o posterior, habilite la exclusión de telemetría en el cliente subyacente. Proporcione la preferencia del usuario como un valor de tipo Boolean en el contexto de OpenFeature:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.Value

val provider = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .build()
    .asOpenFeatureProvider()
val initialContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mapOf("dd_evaluation_telemetry_opt_out" to Value.Boolean(true))
)
OpenFeatureAPI.setProviderAndWait(provider, initialContext = initialContext)
{{< /code-block >}}

Ejecute `setProviderAndWait` desde una corrutina. Actualice la preferencia con `OpenFeatureAPI.setEvaluationContext`, mientras conserva la clave de segmentación y otros atributos. La preferencia más reciente suprime la telemetría de inmediato, incluso durante una actualización de asignación pendiente o fallida.

Para el cliente nativo de Flags, utilice el setter tipado en lugar de un atributo de contexto de cadena:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.setEvaluationTelemetryOptOut

val flagsClient = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .build()
flagsClient.setEvaluationTelemetryOptOut(true)
{{< /code-block >}}

Llame a `setEvaluationTelemetryOptOut(false)` para reanudar la telemetría. Actualice esta decisión cuando el usuario o la preferencia cambien. El contexto de segmentación nativo contiene cadenas; una cadena `"true"` no activa la supresión.

### Configure el proveedor {#configure-the-provider}

Después de inicializar Datadog y habilitar Flags, configure ambos controles antes de crear el cliente. El siguiente ejemplo requiere la versión `3.17.0` o posterior. Suprime la telemetría de evaluación de flags e inmediatamente excluye al usuario de las asignaciones de experimentos:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.ExperimentationOptOutMode
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.Value

val provider = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .experimentationOptOutMode(ExperimentationOptOutMode.IMMEDIATE)
    .build()
    .asOpenFeatureProvider()

val preferenceTimestamp = "2026-10-30T12:00:00Z" // Use the user's stored preference.
val attributes = mapOf(
    "tier" to Value.String("premium"),
    "dd_evaluation_telemetry_opt_out" to Value.Boolean(true),
    "dd_experimentation_opt_out_at" to Value.String(preferenceTimestamp)
)
OpenFeatureAPI.setProviderAndWait(
    provider,
    initialContext = ImmutableContext(targetingKey = "user-123", attributes = attributes)
)
{{< /code-block >}}

Ejecute `setProviderAndWait` desde una corrutina. Configure el cliente en su sitio de creación original; no cree otro cliente con el mismo nombre para cambiar estas opciones.

Cuando está habilitado, la exclusión de la evaluación de flags suprime los nuevos eventos de evaluación, los conteos agregados y las anotaciones automáticas de flags de RUM. Use `Value.Boolean(true)`, no la cadena `"true"`. No cambia los valores de los flags ni suprime las exposiciones a experimentos, y no elimina la telemetría registrada anteriormente.

### Elija una política de experimentación {#choose-an-experimentation-policy}

| Modo | Comportamiento con una marca de tiempo de exclusión válida |
| --- | --- |
| `ExperimentationOptOutMode.DISABLED` | Ignore la marca de tiempo. Esta es la opción predeterminada. |
| `ExperimentationOptOutMode.IMMEDIATE` | Excluya todas las asignaciones de experimentos. Las asignaciones de funcionalidades ordinarias permanecen disponibles. |
| `ExperimentationOptOutMode.FUTURE_EXPERIMENTS_ONLY` | Excluya las asignaciones activadas en la marca de tiempo o después de ella, o sin metadatos de activación. Las asignaciones anteriores siguen siendo elegibles. |

El modo de solo experimentos futuros verifica el tiempo de activación de la asignación, no la inscripción previa. Una asignación más antigua puede asignar a un usuario por primera vez. Ambos modos, cuando están habilitados, entran en vigor de inmediato; una marca de tiempo futura no programa un cambio de preferencia.

Almacene la marca de tiempo cuando el usuario decida optar por no participar. Reutilícela en reinicios de la aplicación y clientes que compartan la preferencia. Utilice una marca de tiempo válida con una zona horaria, como `2026-10-30T12:00:00Z`. Las marcas de tiempo no válidas en un modo habilitado impiden las solicitudes de asignación y hacen que las evaluaciones devuelvan el valor predeterminado de la aplicación con un error de contexto no válido.

Los modos de experimentación habilitados requieren soporte de backend para la política seleccionada. Durante los cambios de contexto, las evaluaciones devuelven los valores predeterminados de la aplicación hasta que las asignaciones coincidentes estén disponibles. Esto también se aplica cuando el contexto no tiene una marca de tiempo de exclusión.

La versión `3.17.0` añade `ErrorCode.INVALID_CONTEXT`. Actualice las expresiones exhaustivas de Kotlin `when` al realizar una actualización.

### Actualice la preferencia {#update-the-preference}

Actualice el contexto en el cliente existente en lugar de crear otro cliente. Conserve la clave de segmentación y otros atributos de la aplicación. Para reanudar la telemetría de evaluación de flags, establezca `dd_evaluation_telemetry_opt_out` en el booleano `false`. Para permitir la experimentación de nuevo, elimine `dd_experimentation_opt_out_at`.

{{< code-block lang="kotlin" >}}
val updatedAttributes = attributes.toMutableMap()
updatedAttributes["dd_evaluation_telemetry_opt_out"] = Value.Boolean(false)
updatedAttributes.remove("dd_experimentation_opt_out_at")
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(targetingKey = "user-123", attributes = updatedAttributes)
)
{{< /code-block >}}

Estos controles no reemplazan un sistema de consentimiento de la aplicación. Las solicitudes de asignación y las exposiciones a experimentos permitidas aún pueden contener datos de usuario.

## Configuración avanzada {#advanced-configuration}

### Configuración global {#global-configuration}

La API `Flags.enable()` acepta una configuración opcional con las opciones enumeradas a continuación. Estos ajustes se aplican globalmente a todos los proveedores:

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    .initializationTimeout(2_000L)
    // configure additional options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`initializationTimeout(timeoutMs)`
: Tiempo máximo, en milisegundos, para esperar a que el primer contexto de evaluación esté listo. El tiempo de espera cubre la carga de datos en caché, la obtención de asignaciones, la lectura y decodificación de la respuesta, el almacenamiento de asignaciones y la publicación del estado de disponibilidad. No cambia el tiempo de espera del cliente HTTP. La operación de asignación continúa después del tiempo de espera y puede hacer que el cliente pase a `Ready` cuando se completa.

El tiempo de espera se aplica solo a la primera llamada `setEvaluationContext`. Esa llamada consume el tiempo de espera incluso si la operación falla o nunca comienza. Las llamadas posteriores no tienen un temporizador de inicialización. El valor predeterminado es `5_000` milisegundos. Establézcalo en cero o en un valor negativo para desactivar el tiempo de espera. Cuando se agota el tiempo de espera, el cliente pasa a `Stale` si hay asignaciones coincidentes disponibles en caché. De lo contrario, pasa a `Error`.

<div class="alert alert-info"><code>initializationTimeout</code> está disponible en <code>dd-sdk-android-flags</code> 3.14.0 y versiones posteriores.</div>

`trackExposures()`
: Cuando `true` (predeterminado), el SDK registra automáticamente un _evento de exposición_ cuando se evalúa un marcador. Estos eventos contienen metadatos sobre qué marcador se accedió, qué variante se entregó y bajo qué contexto. Se envían a Datadog para que el usuario pueda analizar posteriormente la adopción de funciones. Si solo necesita una evaluación local sin telemetría, puede desactivarla con: `trackExposures(false)`.

`rumIntegrationEnabled()`
: Cuando `true` (predeterminado), las evaluaciones de marcadores se rastrean en RUM, lo que permite correlacionarlos con las sesiones de usuario. Esto permite análisis como _“¿Los usuarios en la variante B experimentan más errores?”_. Si su aplicación no utiliza RUM, este marcador no tiene efecto y puede dejarse de forma segura en su valor predeterminado. Use `rumIntegrationEnabled(false)` para desactivar la integración de RUM.

`gracefulModeEnabled()`
: Controla cómo el SDK maneja el uso incorrecto de la API: por ejemplo, crear un cliente antes de llamar a `Flags.enable()`, crear un cliente duplicado con el mismo nombre o recuperar un cliente que aún no se ha creado.

  El comportamiento exacto del Graceful Mode depende de su configuración de compilación:

  * **Compilaciones de lanzamiento**: El SDK siempre aplica Graceful Mode: cualquier uso indebido solo se registra internamente si `Datadog.setVerbosity()` está configurado.
  * **Compilaciones de depuración** con `gracefulModeEnabled = true` (predeterminado): El SDK siempre registra advertencias en la consola.
  * **Compilaciones de depuración** con `gracefulModeEnabled = false`: El SDK genera `IllegalStateException` por el uso incorrecto de la API, lo que aplica un enfoque de falla rápida que ayuda a detectar errores de configuración a tiempo.

  Puede ajustar `gracefulModeEnabled()` según su fase de desarrollo o control de calidad.

### Configuración por proveedor {#per-provider-configuration}

Puede configurar proveedores individuales con endpoints personalizados antes de crearlos:

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .useCustomEvaluationEndpoint("https://your-proxy.example.com/evaluations")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

## Integración directa de FlagsClient (avanzada) {#direct-flagsclient-integration-advanced}

Para la mayoría de las aplicaciones, la API de OpenFeature descrita anteriormente es el enfoque recomendado. Sin embargo, puede usar el `FlagsClient` de Datadog directamente si tiene requisitos específicos que la abstracción de OpenFeature no admite.

**Use FlagsClient directamente solo si:**

- Requiere **múltiples contextos de evaluación independientes** en la misma aplicación (por ejemplo, diferentes contextos para diferentes usuarios en una aplicación multiusuario)
- Desea trabajar con **tipos nativos de Kotlin** directamente (`JSONObject` en lugar de `Value.Structure`)
- Necesita **control detallado** sobre el ciclo de vida del cliente y la configuración por instancia

### Instalación (FlagsClient) {#installation-flagsclient}

Si solo necesita la API directa, puede omitir la dependencia de OpenFeature:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### Crear y recuperar un cliente (FlagsClient) {#create-and-retrieve-a-client-flagsclient}

Cree un cliente una vez, normalmente durante el inicio de la aplicación:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

Recupere el mismo cliente en cualquier parte de su aplicación:

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

También puede crear y recuperar varios clientes proporcionando el parámetro `name`:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">Si ya existe un cliente con el nombre dado, se reutiliza la instancia existente.</div>

### Establecer el contexto de evaluación (FlagsClient) {#set-the-evaluation-context-flagsclient}

{{< code-block lang="kotlin" >}}
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to "user@example.com",
            "tier" to "premium"
        )
    )
)
{{< /code-block >}}

Este método obtiene las asignaciones de las banderas del servidor de forma asíncrona en segundo plano. La operación no es bloqueante y es segura para subprocesos. Las actualizaciones de las banderas están disponibles para evaluaciones posteriores una vez que se completa la operación en segundo plano.

### Observar los cambios en el estado del cliente directo {#observe-direct-client-state-changes}

<div class="alert alert-info">Observación directa del estado del cliente con <code>flagsClient.state</code> está disponible en <code>dd-sdk-android-flags</code> 3.4.0 y versiones posteriores.</div>

Use `flagsClient.state` para verificar el estado actual del cliente directo o registrar un listener para los cambios de estado:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsStateListener
import com.datadog.android.flags.model.FlagsClientState

val listener = object : FlagsStateListener {
    override fun onStateChanged(newState: FlagsClientState) {
        when (newState) {
            FlagsClientState.NotReady -> {
                // The client has not loaded assignments yet.
            }
            FlagsClientState.Reconciling -> {
                // The client is fetching assignments for a context change.
            }
            FlagsClientState.Ready -> {
                // Assignments are loaded and available for evaluation.
            }
            FlagsClientState.Stale -> {
                // Cached assignments are available, but the latest fetch failed.
            }
            is FlagsClientState.Error -> {
                // No assignments are available for evaluation.
            }
        }
    }
}

flagsClient.state.addListener(listener)

val currentState = flagsClient.state.getCurrentState()
{{< /code-block >}}

El oyente recibe el estado actual cuando se registra, y luego recibe los cambios de estado futuros. Mantenga breve la ejecución del callback y envíe el trabajo de larga duración a otro subproceso. Llame a `flagsClient.state.removeListener(listener)` cuando se detenga el componente que observa el estado.

### Evaluar banderas (FlagsClient) {#evaluate-flags-flagsclient}

{{% collapse-content title="Banderas booleanas" level="h4" %}}
{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Banderas de cadena" level="h4" %}}
{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Banderas de tipo entero y doble" level="h4" %}}
{{< code-block lang="kotlin" >}}
val maxItems = flagsClient.resolveIntValue(
    flagKey = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = flagsClient.resolveDoubleValue(
    flagKey = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Banderas estructuradas" level="h4" %}}
{{< code-block lang="kotlin" >}}
import org.json.JSONObject

val config = flagsClient.resolveStructureValue(
    flagKey = "ui.config",
    defaultValue = JSONObject().apply {
        put("color", "#00A3FF")
        put("fontSize", 14)
    }
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Detalles de evaluación de banderas" level="h4" %}}
{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}
{{% /collapse-content %}}

### Comparación de API {#api-comparison}

Esta tabla destaca las diferencias clave entre las API de OpenFeature y `FlagsClient` para ayudarle a elegir la integración que se ajuste a sus requisitos.

| Característica | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **Estándar de API** | OpenFeature (neutral respecto al proveedor) | Específico de Datadog |
| **Contexto de evaluación** | Global/estático | Por instancia de cliente |
| **Banderas estructuradas** | `Value.Structure` | `JSONObject` |
| **Seguridad de tipos** | Tipos `Value` de OpenFeature | Tipos nativos de Kotlin |
| **Dependencia de un proveedor** | Baja (neutral respecto al proveedor) | Más alta (específica de Datadog) |
| **Gestión de estado** | Observación basada en flujo | Registro manual de listeners |

## Pruebas {#testing}

Puede hacer pruebas en un entorno de pruebas dedicado de Datadog con el proveedor real de Datadog, o sustituirlo por un `FeatureProvider` en memoria para controlar los valores de las banderas directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. El SDK original de OpenFeature para Kotlin no incluye un [`InMemoryProvider`][3], por lo que las pruebas utilizan un pequeño `FeatureProvider` personalizado. El siguiente ejemplo reemplaza el proveedor de `OpenFeatureAPI`; si su código de producción utiliza directamente el contenedor `FlagsClient` de Datadog, su prueba debe hacer las verificaciones mediante el mismo cliente `OpenFeatureAPI` que utiliza el contenedor, no mediante `FlagsClient`.

Agregue `kotlinx-coroutines-test` a su configuración de prueba (el `initialize` del SDK es una función `suspend`):

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1'
}
{{< /code-block >}}

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.*
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import kotlin.test.assertTrue

class FakeProvider(private val flags: Map<String, Any>) : FeatureProvider {
    override val hooks = emptyList<Hook<*>>()
    override val metadata = object : ProviderMetadata { override val name = "fake" }
    private val events = MutableSharedFlow<OpenFeatureProviderEvents>(replay = 1)

    override suspend fun initialize(initialContext: EvaluationContext?) {
        // No-op. The SDK emits ProviderReady after initialize returns.
    }
    override fun shutdown() {}
    override suspend fun onContextSet(old: EvaluationContext?, new: EvaluationContext) {}

    override fun getBooleanEvaluation(key: String, defaultValue: Boolean, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Boolean) ?: defaultValue)
    override fun getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? String) ?: defaultValue)
    override fun getIntegerEvaluation(key: String, defaultValue: Int, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Int) ?: defaultValue)
    override fun getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Double) ?: defaultValue)
    override fun getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Value) ?: defaultValue)

    override fun observe(): Flow<OpenFeatureProviderEvents> = events
}

class CheckoutFlagsTest {
    private lateinit var client: Client

    @Before
    fun setUp() = runTest {
        OpenFeatureAPI.setProviderAndWait(
            FakeProvider(mapOf("new-checkout-flow" to true))
        )
        client = OpenFeatureAPI.getClient()
    }

    @Test
    fun newCheckoutEnabled() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI` es un singleton de todo el proceso, así que reinícielo entre clases de prueba si las pruebas comparten una JVM. Envuelva `setProviderAndWait` en `runTest { ... }`; no se puede llamar desde un método `@Before` simple porque es `suspend`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: https://github.com/open-feature/kotlin-sdk/pull/226

[4]: /es/feature_flags/concepts/opt_out/