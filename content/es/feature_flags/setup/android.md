---
description: Configura indicadores de funciones Datadog para aplicaciones Android
  y Android TV.
further_reading:
- link: /feature_flags/setup/
  tag: Documentación
  text: Configuración de indicadores de funciones
- link: /real_user_monitoring/android/
  tag: Documentación
  text: Monitorización de Android y Android TV
title: Indicadores de funciones Android y Android TV
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Los indicadores de funciones están en vista previa. Completa el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Esta página describe cómo instrumentar tu aplicación Android o Android TV con el SDK de indicadores de funciones Datadog. Los indicadores de funciones Datadog ofrecen una forma unificada de controlar de forma remota la disponibilidad de funciones en tu aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

Esta guía explica cómo instalar y activar el SDK, crear y utilizar `FlagsClient` y configurar las opciones avanzadas.

## Instalación

Declara `dd-sdk-android-flags` como una dependencia en tu proyecto. Añade la biblioteca como dependencia Gradle en el archivo `build.gradle` de tu módulo de aplicación:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## Inicializar el SDK

Inicializa Datadog lo antes posible en el ciclo de vida de tu aplicación, normalmente en el método `onCreate()` de tu clase de `Application`. Esto garantiza que todas las evaluaciones de indicadores de funciones y la telemetría se capturen correctamente.

{{< code-block lang="kotlin" >}}
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
).build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
{{< /code-block >}}

## Activar indicadores

Después de inicializar Datadog, activa `Flags` para adjuntarlo a la instancia de SDK Datadog actual y prepárate para la creación de clientes y la evaluación de indicadores:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

También puedes pasar un objeto de configuración. Consulta [Configuración avanzada](#advanced-configuration).

## Crear y recuperar un cliente

Crea un cliente una vez, normalmente durante el inicio de la aplicación:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

Recupera el mismo cliente en cualquier parte de tu aplicación:

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

También puedes crear y recuperar varios clientes proporcionando el parámetro `name`:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">Si ya existe un cliente con el nombre dado, se reutiliza la instancia existente.</div>  

## Definir el contexto de evaluación

Define a quién o a qué se aplica la evaluación de indicadores utilizando `FlagsEvaluationContext`. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones del indicador deben devolverse. Llama a este método antes de evaluar los indicadores para garantizar una orientación adecuada.

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

Este método obtiene las asignaciones de indicadores del servidor de forma asíncrona en segundo plano. La operación no se bloquea y es segura para subprocesos. Las actualizaciones de los indicadores están disponibles para las evaluaciones posteriores una vez que finaliza la operación en segundo plano.

## Evaluar indicadores

Después de crear `FlagsClient` y definir su contexto de evaluación, puedes empezar a leer los valores de los indicadores en toda tu aplicación. La evaluación de indicadores es _local e instantánea_: el SDK utiliza datos almacenados en caché local, por lo que no se producen solicitudes de red al evaluar indicadores. Esto hace que las evaluaciones sean seguras de realizar en el proceso principal.

Cada indicador se identifica mediante una _clave_ (una cadena única) y puede evaluarse con un _método tipado_ que devuelve un valor del tipo esperado. Si el indicador no existe o no puede evaluarse, el SDK devuelve el valor predeterminado proporcionado.

### Indicadores booleanos

Utiliza `resolveBooleanValue(key, defaultValue)` para los indicadores que representan condiciones de activado/desactivado o verdadero/falso. Por ejemplo:

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Indicadores de cadena

Utiliza `resolveStringValue(key, defaultValue)` para los indicadores que seleccionan entre múltiples variantes o cadenas de configuración. Por ejemplo:

{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### Indicadores enteros y dobles

Para los indicadores numéricos, utiliza `resolveIntValue(key, defaultValue)` o `resolveDoubleValue(key, defaultValue)`. Estos son adecuados cuando una función depende de un parámetro numérico como un límite, un porcentaje o un multiplicador:

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

### Indicadores de objetos

Para datos estructurados o de tipo JSON, utiliza `resolveStructureValue(key, defaultValue)`. Este método devuelve un `JSONObject`, que puede representar datos anidados complejos. Los indicadores de objetos son útiles para escenarios de configuración remota en los que es necesario proporcionar varias propiedades juntas. Por ejemplo:

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

### Detalles de la evaluación de indicadores

Cuando necesites algo más que el valor del indicador, utiliza el método `resolve(key, defaultValue): ResolutionDetails<T>`. Estos métodos devuelven tanto el valor evaluado como los metadatos que explican la evaluación. Por ejemplo:

{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}

Los detalles del indicador pueden ayudarte a depurar el comportamiento de la evaluación y a comprender por qué un usuario ha recibido un valor determinado.

## Configuración avanzada

La API `Flags.enable()` acepta una configuración opcional con las opciones que se indican a continuación.

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`trackExposures()`
: Cuando `true` (por defecto), el SDK registra automáticamente un _evento de exposición_ cuando se evalúa un indicador. Estos eventos contienen metadatos sobre a qué indicador se ha accedido, qué variante se ha proporcionado y en qué contexto. Se envían a Datadog para que puedas analizar posteriormente la adopción de funciones. Si solo necesitas una evaluación local sin telemetría, puedes desactivarlo con: `trackExposures(false)`.

`rumIntegrationEnabled()`
: Cuando `true` (por defecto), las evaluaciones de indicadores se rastrean en RUM, lo que permite correlacionarlas con las sesiones de usuario. Esto permite realizar análisis como _"¿Experimentan más errores los usuarios de la variante B?"_. Si tu aplicación no utiliza RUM, este indicador no tiene ningún efecto y se puede dejar con seguridad en su valor predeterminado. Utiliza `rumIntegrationEnabled(false)` para desactivar la integración RUM.

`gracefulModeEnabled()`
: Controla cómo el SDK gestiona el uso incorrecto de la API `FlagsClient`, por ejemplo, la creación de un cliente antes de llamar a `Flags.enable()`, la creación de un cliente duplicado con el mismo nombre o la recuperación de un cliente que aún no se ha creado.

  El comportamiento exacto del modo Graceful depende de la configuración de compilación:

  * **Compilaciones de lanzamiento**: El SDK siempre aplica el modo Graceful: cualquier uso indebido solo se registra internamente si `Datadog.setVerbosity()` está configurado.  
  * **Compilaciones de depuración** con `gracefulModeEnabled = true` (por defecto): El SDK siempre registra las advertencias en la consola.
  * **Compilaciones de depuración** con `gracefulModeEnabled = false`: El SDK muestra `IllegalStateException` en caso de uso incorrecto de la API, aplicando una estrategia rápida que ayuda a detectar errores de configuración con antelación.

  Puedes ajustar `gracefulModeEnabled()` en función de tu fase de desarrollo o de control de calidad.

`useCustomFlagEndpoint()`
: Configura una URL de servidor personalizada para recuperar asignaciones de funciones.

`useCustomExposureEndpoint()`
: Configura una URL de servidor personalizada para enviar datos de exposición de indicadores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}