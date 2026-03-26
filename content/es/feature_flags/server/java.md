---
description: Configura Datadog Feature Flags para aplicaciones de Java.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Indicadores de características del servidor
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: Documentación
  text: APM de Java y rastreo distribuido
title: Java Feature Flags
---

<div class="alert alert-warning">La compatibilidad de Datadog Feature Flags es experimental y requiere habilitar una indicador experimental en el rastreador. Consulta la <a href="#configuration">sección Configuración</a> para obtener más información.</div>

## Información general

En esta página se describe cómo instrumentar tu aplicación de Java con el SDK de  Datadog Feature Flags. Los indicadores de características de Datadog ofrecen una forma unificada de controlar de forma remota la disponibilidad de características en tu aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El kit de desarrollo de software (SDK) de Java integra indicadores de características directamente en el rastreador de Datadog APM e implementa el estándar de [OpenFeature](https://openfeature.dev/) para ofrecer la máxima flexibilidad y compatibilidad.

<div class="alert alert-info">Si utilizas Datadog APM y tu aplicación ya tiene activados el rastreador de Datadog Java y Remote Configuration, ve directamente a <a href="#initialize-the-openfeature-provider">Inicializar el proveedor OpenFeature</a>. Solo tienes que añadir las dependencias de OpenFeature e inicializar el proveedor.</div>

## Requisitos de compatibilidad

El SDK de Datadog Feature Flags para Java requiere:
- **Java 11 o posterior**
- **Rastreador de APM de Datadog Java**: versión 2.4.0 o posterior
- **SDK de OpenFeature**: versión **1.18.2** o posterior
- **Datadog Agent**: versión **7.x o posterior** con [Remote Configuration][1] activada
- **Clave de API de Datadog**: necesaria para Remote Configuration

Para obtener una lista completa de la versión de Java de Datadog y la compatibilidad con el framework, lee [Requisitos de compatibilidad](/tracing/trace_collection/compatibility/java/).

## Empezando

Antes de empezar, asegúrate de que ya has [instalado y configurado el Agent](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#install-and-configure-the-agent).

## Instalación

El marcado de características está integrado en el rastreador de APM de Datadog Java. Necesitas el JAR del rastreador y las dependencias del SDK de OpenFeature.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
Añade las siguientes dependencias a tu `build.gradle`:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.18.2'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.57.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
Añade las siguientes dependencias a tu `build.gradle.kts`:

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.18.2")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.57.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
Añade las siguientes dependencias a tu `pom.xml`:

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.18.2</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.57.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Configuración

Si tu Datadog Agent ya tiene activado Remote Configuration para otras funciones (como Dynamic Instrumentation o Application Security), puedes omitir la configuración del Agent e ir directamente a [Configuración de aplicaciones](#application-configuration).

### Configuración del Agent

Configura tu Datadog Agent para activar Remote Configuration:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
# Activar la configuración remota
remote_configuration:
  enabled: true

# Set your API key
api_key: <YOUR_API_KEY>
{{< /code-block >}}

### Configuración de la aplicación

Si tu aplicación ya se ejecuta con `-javaagent:dd-java-agent.jar` y tiene habilitada Remote Configuration (`DD_REMOTE_CONFIG_ENABLED=true`), solo necesitas añadir el indicador de característica experimental (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`). Omite los pasos de descarga del rastreador y configuración de la JVM.

Configura tu aplicación Java con las variables de entorno o propiedades del sistema necesarias:

{{< tabs >}}
{{% tab "Environment Variables" %}}
{{< code-block lang="bash" >}}
# Required: Enable Remote Configuration in the tracer
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Enable experimental feature flagging support
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Your Datadog API key
export DD_API_KEY=<YOUR_API_KEY>

# Required: Service name
export DD_SERVICE=<YOUR_SERVICE_NAME>

# Required: Environment (e.g., prod, staging, dev)
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Version
export DD_VERSION=<YOUR_APP_VERSION>

# Start your application with the tracer
java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}
{{% /tab %}}

{{% tab "System Properties" %}}
{{< code-block lang="bash" >}}
java -javaagent:path/to/dd-java-agent.jar \
  -Ddd.remote.config.enabled=true \
  -Ddd.experimental.flagging.provider.enabled=true \
  -Ddd.api.key=<YOUR_API_KEY> \
  -Ddd.service=<YOUR_SERVICE_NAME> \
  -Ddd.env=<YOUR_ENVIRONMENT> \
  -Ddd.version=<YOUR_APP_VERSION> \
  -jar your-application.jar
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

El sistema de marcado de características de Datadog se inicia automáticamente cuando se inicializa el rastreador con Remote Configuration y el proveedor de marcado experimental activados. No se requiere ningún código de inicialización adicional en tu aplicación.

<div class="alert alert-danger">El marcado de características requiere <code>DD_REMOTE_CONFIG_ENABLED=true</code> y <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code>. Sin el indicador experimental, el sistema de marcado de características no se inicia y el <code>proveedor</code> devuelve el valor programático predeterminado.</div>

### Añadir el rastreador de Java a la JVM

Para obtener instrucciones sobre cómo añadir el argumento `-javaagent` a tu servidor de aplicaciones o framework, consulta [Add the Java Tracer to the JVM](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-tracer-to-the-jvm).

Asegúrate de incluir los indicadores de configuración del marcado de características:
- `-Ddd.remote.config.enabled=true`
- `-Ddd.experimental.flagging.provider.enabled=true`

## Inicializar el proveedor OpenFeature

Inicializa el proveedor Datadog OpenFeature en el código de inicio de tu aplicación. El proveedor se conecta al sistema de marcado de características que se ejecuta en el rastreador de Datadog.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;
import dev.openfeature.sdk.exceptions.ProviderNotReadyError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
    private static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Client client;

    public static void main(String[] args) throws Exception {
        // Initialize the Datadog provider
        logger.info("Initializing Datadog OpenFeature Provider...");
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();

        try {
            // Set provider and wait for initial configuration (recommended)
            api.setProviderAndWait(new Provider());
            client = api.getClient("my-app");
            logger.info("OpenFeature provider initialized successfully");
        } catch (ProviderNotReadyError e) {
            // Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (no tracer/config available), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        } catch (Exception e) {
            logger.error("Failed to initialize OpenFeature provider", e);
            throw e;
        }

        // Your application code here
    }
}
{{< /code-block >}}

Utiliza `setProviderAndWait()` para bloquear la evaluación hasta que se reciba la configuración inicial del indicador desde Remote Configuration. Esto asegura que los indicadores estén listos antes de que la aplicación comience a atender tráfico. El tiempo de espera por defecto es de 30 segundos.

`ProviderNotReadyError` es una excepción del SDK de OpenFeature que se lanza cuando se agota el tiempo de espera del proveedor durante la inicialización. Su captura permite que la aplicación se inicie con los valores por defecto del indicador si Remote Configuration no está disponible. Si no se captura, la excepción se propaga y puede impedir el inicio de la aplicación. Gestiona esto basándote en tus requisitos de disponibilidad.

### Inicialización asíncrona

Para una inicialización no bloqueante, utiliza `setProvider()` y escuche los eventos del proveedor:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
Client client = api.getClient();

// Listen for provider state changes
client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flags ready!");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Provider configuration is stale");
});

// Set provider asynchronously
api.setProvider(new Provider());
{{< /code-block >}}

## Definir el contexto de evaluación

El contexto de evaluación define el sujeto (usuario, dispositivo, sesión) para la evaluación del indicador. Determina qué variaciones del indicador se devuelven en función de las reglas de orientación.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

El `targetingKey` (por ejemplo, `user-123`) es el identificador principal utilizado para las evaluaciones de indicadores coherentes y las implantaciones basadas en porcentajes. Suele ser un identificador de usuario, de sesión o de dispositivo.

## Evaluar indicadores

Evalúa los indicadores de características con el cliente OpenFeature. Se admiten todos los tipos de indicadores: booleano, cadena, entero, doble y objeto.

{{< tabs >}}
{{% tab "Boolean" %}}
{{< code-block lang="java" >}}
// Simple Boolean evaluation
boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}

// Get detailed evaluation result
import dev.openfeature.sdk.FlagEvaluationDetails;

FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

logger.info("Value: {}", details.getValue());
logger.info("Variant: {}", details.getVariant());
logger.info("Reason: {}", details.getReason());
{{< /code-block >}}
{{% /tab %}}

{{% tab "String" %}}
{{< code-block lang="java" >}}
// Evaluate string flags (e.g., UI themes, API endpoints)
String theme = client.getStringValue("ui.theme", "light", context);

String apiEndpoint = client.getStringValue(
    "payment.api.endpoint",
    "https://api.example.com/v1",
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Number" %}}
{{< code-block lang="java" >}}
// Integer flags (e.g., limits, quotas)
int maxRetries = client.getIntegerValue("retries.max", 3, context);

// Double flags (e.g., thresholds, rates)
double discountRate = client.getDoubleValue("pricing.discount.rate", 0.0, context);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Object" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Value;

// Evaluate object/JSON flags for complex configuration
Value config = client.getObjectValue("ui.config", new Value(), context);

// Access structured data
if (config.isStructure()) {
    Value timeout = config.asStructure().getValue("timeout");
    Value endpoint = config.asStructure().getValue("endpoint");
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Tratamiento de errores

El SDK de OpenFeature utiliza un patrón de valores por defecto. Si la evaluación falla por cualquier motivo, se devuelve el valor predeterminado que proporciones.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ErrorCode;

// Check evaluation details for errors
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

if (details.getErrorCode() != null) {
    switch (details.getErrorCode()) {
        case FLAG_NOT_FOUND:
            logger.warn("Flag does not exist: {}", "checkout.new");
            break;
        case PROVIDER_NOT_READY:
            logger.warn("Provider not initialized yet");
            break;
        case TARGETING_KEY_MISSING:
            logger.warn("Evaluation context missing targeting key");
            break;
        case TYPE_MISMATCH:
            logger.error("Flag value type doesn't match requested type");
            break;
        default:
            logger.error("Evaluation error for flag: {}", "checkout.new", details.getErrorCode());
    }
}
{{< /code-block >}}

### Códigos de error habituales

| Código de error | Descripción | Resolución |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | Configuración inicial no recibida | Espere a la inicialización del proveedor o utilice `setProviderAndWait()` |
| `FLAG_NOT_FOUND` | El indicador no existe en la configuración | Comprueba la clave del indicador o crea un indicador en la interfaz de usuario de Datadog |
| `TARGETING_KEY_MISSING` | Ninguna clave de orientación en el contexto de la evaluación | Proporcionar una clave de orientación al crear el contexto |
| `TYPE_MISMATCH` | El valor del indicador no se puede convertir al tipo solicitado | Utilizar el método de evaluación correcto para el tipo de indicador |
| `INVALID_CONTEXT` | El contexto de evaluación es nulo | Proporcionar un contexto de evaluación válido |

## Configuración avanzada

### Tiempo de espera de inicialización personalizado

Configura cuánto tiempo espera el proveedor para la configuración inicial:

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### Eventos de cambio de configuración

Escucha actualizaciones de configuración desde Remote Configuration:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED` es un evento opcional de OpenFeature. Consulta la documentación del proveedor de Datadog para comprobar si tu versión admite este evento.

### Múltiples clientes

Utiliza clientes con nombre para organizar el contexto y los indicadores por dominio o equipo:

{{< code-block lang="java" >}}
// Named clients share the same provider instance but can have different contexts
Client checkoutClient = api.getClient("checkout");
Client analyticsClient = api.getClient("analytics");

// Each client can have its own evaluation context
EvaluationContext checkoutContext = new MutableContext("session-abc");
EvaluationContext analyticsContext = new MutableContext("user-123");

boolean newCheckout = checkoutClient.getBooleanValue(
    "checkout.ui.new", false, checkoutContext
);

boolean enhancedAnalytics = analyticsClient.getBooleanValue(
    "analytics.enhanced", false, analyticsContext
);
{{< /code-block >}}

La instancia `Provider` se comparte globalmente. Los nombres de los clientes solo tienen fines organizativos y no crean instancias de proveedores independientes. Todos los clientes utilizan el mismo proveedor subyacente de Datadog y las mismas configuraciones de indicadores.

## Prácticas recomendadas

### Inicialización temprana
Inicializa el proveedor OpenFeature lo antes posible en el ciclo de vida de tu aplicación (por ejemplo, en `main()` o al iniciar la aplicación). Esto garantiza que los indicadores estén listos antes de que se ejecute la lógica empresarial.

### Utilizar valores por defecto significativos
Proporciona siempre valores por defecto razonables que mantengan un comportamiento seguro si falla la evaluación del indicador:

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### Crear contexto una vez
Crea el contexto de evaluación una vez por solicitud/usuario/sesión y reutilízalo para todas las evaluaciones de indicadores:

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

Reconstruir el contexto de evaluación para cada evaluación de indicador añade una sobrecarga innecesaria. Crea el contexto una vez al inicio del ciclo de vida de la solicitud y, a continuación, pásalo a todas las evaluaciones de indicadores posteriores.

### Gestión de fallos de inicialización (opcional)
Considera gestionar los fallos de inicialización si tu aplicación puede funcionar con valores de indicador predeterminados:

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

Si los indicadores de características son críticos para que tu aplicación funcione, deja que la excepción se propague para evitar el inicio.

### Utilizar claves de orientación coherentes
Utilizar identificadores coherentes y estables como claves de orientación:
- **Bueno**: ID de usuario, ID de sesión, ID de dispositivo
- **Evitar**: marcas de tiempo, valores aleatorios, IDs que cambian frecuentemente

### Monitorizar la evaluación del indicador
Utiliza los resultados detallados de la evaluación para el registro y la depuración:

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("feature.critical", false, context);

logger.info("Flag: {} | Value: {} | Variant: {} | Reason: {}",
    "feature.critical",
    details.getValue(),
    details.getVariant(),
    details.getReason()
);
{{< /code-block >}}

## Solucionar problemas

### Proveedor no preparado

**Problema**: errores `PROVIDER_NOT_READY`  al evaluar los indicadores

**Causas comunes**:
1. **Indicador experimental no activado**: el marcado de características está desactivado por defecto
2. **Agent no está listo**: la aplicación se inició antes de que el Agent estuviera completamente inicializado
3. **No hay indicadores configurados**: no hay indicadores publicados en tu combinación de servicio/entorno.
4. **Remote Configuration desactivada en el Agent**: el Agent no está configurado para Remote Configuration

**Soluciones**:
1. **Activar característica experimental**:
   ```bash
   export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
   ```
2. **Verificar el sistema de marcado de características iniciado** en los logs de la aplicación:
   ```
   [dd.trace] Feature Flagging system starting
   [dd.trace] Feature Flagging system started
   ```
3. **Asegúrate de que el Agent está listo** antes de que se inicie la aplicación (utiliza checks de estado en Docker/Kubernetes)
4. **Comprobar EVP Proxy detectado** en los logs:
   ```
   discovered ... evpProxyEndpoint=evp_proxy/v4/ configEndpoint=v0.7/config
   ```
5. **Espera a la sincronización de Remote Configuration* (puede tardar entre 30 y 60 segundos después de publicar los indicadores)
6. **Verificar que los indicadores se publican** en la interfaz de usuario de Datadog al servicio y entorno correctos.

### El sistema de marcado de indicadores no se inicia

**Problema**: no hay mensajes "Feature Flagging system starting" en los logs.

**Causa**: indicador experimental no habilitado en el rastreador

**Solución**:
añadir `-Ddd.experimental.flagging.provider.enabled=true` a tu comando Java o configurar `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`

### Error de proxy EVP no disponible

**Problema**: los logs muestran "EVP Proxy no disponible" o "el agent no admite EVP proxy"

**Causa**: la aplicación se inició antes de que el Agent estuviera completamente inicializado

**Soluciones**:
1. **Añadir check de estado del Agent** en orquestación (Docker Compose, Kubernetes)
2. **Añadir retardo de inicio** a la aplicación
3. **Lógica de reintento**: implementar reintento en caso de fallo de inicialización del proveedor
4. **Actualización del Agent**: asegúrate de utilizar el Agent 7.x o posterior compatible con EVP Proxy

### Los indicadores no se actualizan

**Problema**: los cambios de configuración del indicador no se reflejan en la aplicación

**Soluciones**:
1. Comprueba que Remote Configuration está activada tanto en el Agent como en la aplicación
2. Verifica que el Agent puede conectarse al backend de Datadog
3. Comprueba si en los logs de la aplicación aparece "Sin cambios de configuración" o "Configuración recibida".
4. Asegúrate de que los indicadores se publican (no se guardan como borradores) en la interfaz de usuario de Datadog 
5. Verifica que las etiquetas de servicio y entorno coincidan entre la aplicación y la orientación del indicador

### Errores de coincidencia de tipo

**Problema**: errores `TYPE_MISMATCH` al evaluar los indicadores

**Soluciones**:
1. Verifica que el tipo de indicador en la interfaz de usuario de Datadog coincide con el método de evaluación
2. Utiliza el método correcto: `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()`
3. Comprueba que la configuración de los indicadores es correcta

### Ninguna exposición en Datadog

**Problema**: las evaluaciones de los indicadores no aparecen en la interfaz de usuario de Datadog

**Soluciones**:
1. Verifica que la asignación del indicador tiene `doLog=true` configurado
2. Comprueba que el Datadog Agent recibe eventos de exposición
3. Comprueba que `DD_API_KEY` es correcta
4. Comprueba los errores de carga de la exposición en los logs del Agent 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration/