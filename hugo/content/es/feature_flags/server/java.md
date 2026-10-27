---
description: Configure las Feature Flags de Datadog para aplicaciones Java.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: Documentación
  text: APM y Distributed Tracing de Java
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de marcadores del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK del servidor
title: Feature Flags de Java
---
## Descripción general {#overview}

Esta página describe cómo añadir Feature Flags de Datadog a una aplicación Java. En la versión 1.66.0 y posteriores, `dd-openfeature` carga la configuración de flags directamente desde la CDN gestionada por Datadog de forma predeterminada. Esta fuente Agentless admite servidores de larga ejecución y entornos de ejecución serverless que no pueden conectarse a un Datadog Agent.

El proveedor de Datadog implementa el estándar [OpenFeature](https://openfeature.dev/). Utiliza `dd-java-agent` para la entrega de configuración. La entrega Agentless elimina el requisito del Datadog Agent externo, pero `dd-java-agent` debe cargarse de todos modos en la JVM.

Agentless Java evalúa las flags localmente y envía eventos de exposición a experimentos y eventos de evaluación de flags agregados del Event Platform Proxy (EVP). Prefiere un relay de telemetría local compatible. Envía ambos tipos de eventos directamente cuando no hay un relay compatible disponible.

## Requisitos de compatibilidad {#compatibility-requirements}

Para la configuración sin agente predeterminada, necesita:

- **Java 11 o superior**
- **Datadog Java agent** (`dd-java-agent`, cargado con `-javaagent`): Versión **1.66.0** o posterior
- **Datadog OpenFeature provider** (`com.datadoghq:dd-openfeature`, añadido como dependencia de compilación): Versión **1.66.0** o posterior
- **OpenFeature SDK**: Versión **1.20.1** o posterior
- Una [**clave de API**] de Datadog[7]
- Su Datadog [**sitio**][14]

Utilice la misma versión de `dd-java-agent` y `dd-openfeature`. La entrega Agentless no requiere un servicio de Datadog Agent independiente.

<div class="alert alert-info">Para Java sin servidor, el entorno de ejecución debe admitir la <code>-javaagent</code> opción de JVM. Puede pasar la opción en el comando de Java o a través de <code>JAVA_TOOL_OPTIONS</code>. Consulte la configuración de Java para <a href="/serverless/google_cloud_run/functions/java/?tab=maven">Cloud Run Functions</a> o <a href="/serverless/google_cloud_run/containers/in_container/java/">Cloud Run containers</a> para ver ejemplos.</div>

Para obtener la lista de versiones de Java y compatibilidad con frameworks de Datadog, lea [Requisitos de compatibilidad](/tracing/trace_collection/compatibility/java/).

## Primeros pasos {#getting-started}

Instale las dependencias de OpenFeature y agregue el agente de Java a la JVM.

## Instalación {#installation}

Necesita el proveedor de OpenFeature de Datadog y las dependencias del SDK de OpenFeature.

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
Agregue las siguientes dependencias a su `build.gradle`:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.66.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
Agregue las siguientes dependencias a su `build.gradle.kts`:

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.20.1")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.66.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
Agregue las siguientes dependencias a su `pom.xml`:

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.20.1</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.66.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Los ejemplos de instalación de Gradle y Maven fijan versiones específicas de `dd-openfeature` y del SDK de OpenFeature. Consulte [Requisitos de compatibilidad](#compatibility-requirements) para conocer las versiones mínimas admitidas.

Las métricas de evaluación de flags utilizan una ruta de telemetría independiente de la configuración de flags. Consulte [Configurar las métricas de evaluación de flags del lado del servidor][8].

### Agregue el agente de Java a la JVM {#add-the-java-agent-to-the-jvm}

Cargue `dd-java-agent` con la opción de JVM `-javaagent`. Para obtener instrucciones de instalación, consulte [Agregue el SDK de Java a la JVM](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm).

Si el entorno de ejecución controla el comando de Java, establezca la opción a través de `JAVA_TOOL_OPTIONS`. Consulte la configuración de Java para [Cloud Run Functions][15] o [Cloud Run containers][16] para ver ejemplos.

## Configuración {#configuration}

### Configure la entrega Agentless {#configure-agentless-delivery}

Configure la clave de API, el sitio de Datadog y el entorno en el proceso de la aplicación:

{{< code-block lang="bash" >}}
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_VERSION=<YOUR_APP_VERSION>

java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

No se requiere la habilitación de Feature Flags ni la configuración de la fuente. Inicialice el proveedor de OpenFeature de Datadog para comenzar el sondeo.

## Inicialice el proveedor de OpenFeature {#initialize-the-openfeature-provider}

Inicialice el proveedor de OpenFeature de Datadog en el código de inicio de su aplicación. El proveedor inicia la fuente de configuración seleccionada.

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
            logger.warn("Provider not ready (configuration unavailable), continuing with defaults", e);
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

Use `setProviderAndWait()` para bloquear la evaluación hasta que la fuente seleccionada proporcione la configuración inicial de flags. Esto carga los flags antes de que la aplicación comience a recibir tráfico. El tiempo de espera de inicialización predeterminado es de 30 segundos.

`ProviderNotReadyError` es una excepción del SDK de OpenFeature que se lanza cuando el proveedor agota el tiempo de espera durante la inicialización. Capturarla permite que la aplicación se inicie con valores de flag predeterminados si la entrega de configuración no está disponible. Si no se captura, la excepción se propaga y puede impedir el inicio de la aplicación. Maneje esto según sus requisitos de disponibilidad.

### Inicialización asíncrona{#asynchronous-initialization}

Para una inicialización no bloqueante, use `setProvider()` y escuche los eventos del proveedor:

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

## Establezca el contexto de evaluación {#set-the-evaluation-context}

El contexto de evaluación define al sujeto (usuario, dispositivo, sesión) para la evaluación de flags. Determina qué variaciones de flag se devuelven según las reglas de segmentación.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

El `targetingKey` (por ejemplo, `user-123`) es el identificador principal utilizado para evaluaciones consistentes de flags y despliegues basados en porcentajes. Por lo general, es un ID de usuario, ID de sesión o ID de dispositivo.

## Evalúe marcadores {#evaluate-flags}

Evalúe los Feature Flags usando el cliente de OpenFeature. Se admiten todos los tipos de flag: Booleano, cadena, entero, doble y objeto.

{{< tabs >}}
{{% tab "Booleano" %}}
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

{{% tab "Cadena" %}}
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

## Manejo de errores {#error-handling}

El SDK de OpenFeature utiliza un patrón de valor predeterminado. Si la evaluación falla por cualquier motivo, se devuelve el valor predeterminado que usted proporcione.

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

### Códigos de error comunes {#common-error-codes}

| Código de error | Descripción | Resolución |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | Configuración inicial no recibida | Espere a la inicialización del proveedor o utilice `setProviderAndWait()` |
| `FLAG_NOT_FOUND` | El flag no existe en la configuración | Verifique la clave del flag o cree el flag en la interfaz de usuario de Datadog |
| `TARGETING_KEY_MISSING` | No hay clave de segmentación en el contexto de evaluación | Proporcione una clave de segmentación al crear el contexto |
| `TYPE_MISMATCH` | El valor del flag no se puede convertir al tipo solicitado | Utilice el método de evaluación correcto para el tipo de flag |
| `INVALID_CONTEXT` | El contexto de evaluación es nulo | Proporcione un contexto de evaluación válido |

## Configuración avanzada {#advanced-configuration}

Utilice [Server SDK Configuration Sources][9] como referencia canónica para la selección de fuente y los ajustes operativos:

- [Configure la entrega Agentless][12], incluyendo el sondeo, el tiempo de espera de la solicitud y los ajustes del punto de conexión
- [Utilice un punto de conexión Agentless personalizado][10] para pruebas avanzadas, desarrollo local o un proxy gestionado por el operador
- [Utilice Remote Configuration del Agent][13] para conservar la entrega gestionada por el Agent
- [Migre una configuración de Remote Configuration existente][11] y elimine el ajuste `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` obsoleto

En el modo Agentless, Java prefiere un relay de telemetría local compatible para la exposición a experimentos y eventos de evaluación de flags agregados. Envía ambos tipos de eventos directamente cuando no hay un relay compatible disponible. La ruta directa utiliza los ajustes `DD_API_KEY` y `DD_SITE` de la aplicación. Para entornos serverless sin Agent, puede utilizar [`serverless-init`][17] como relay de telemetría local.

La métrica `feature_flag.evaluations` utiliza la configuración de OTLP independiente en la guía [Server-Side Flag Evaluation Metrics][8].

Para obtener más información sobre los gráficos disponibles, consulte [Feature Flag Graphs](/feature_flags/concepts/flag_graphs/).

### Tiempo de espera de inicialización personalizado {#custom-initialization-timeout}

Configure cuánto tiempo espera el proveedor para la configuración inicial:

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### Eventos de cambio de configuración {#configuration-change-events}

Escuche las actualizaciones de la fuente de configuración seleccionada:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED` es un evento opcional de OpenFeature. Consulte la documentación del proveedor de Datadog para verificar si este evento es compatible con su versión.

### Múltiples clientes {#multiple-clients}

Use clientes con nombre para organizar el contexto y las flags por dominio o equipo:

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

La instancia `Provider` se comparte globalmente. Los nombres de los clientes son solo para fines organizativos y no crean instancias de proveedor separadas. Todos los clientes usan el mismo proveedor de Datadog subyacente y las mismas configuraciones de flags.

## Mejores prácticas {#best-practices}

### Inicialice temprano {#initialize-early}
Inicialice el proveedor de OpenFeature lo antes posible en el ciclo de vida de su aplicación (por ejemplo, en `main()` o al iniciar la aplicación). Esto ayuda a asegurar que las flags estén listas antes de que se ejecute la lógica de negocio.

### Use valores predeterminados significativos {#use-meaningful-default-values}
Proporcione siempre valores predeterminados sensatos que mantengan un comportamiento seguro si la evaluación de la flag falla:

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### Cree el contexto una vez {#create-context-once}
Cree el contexto de evaluación una vez por solicitud/usuario/sesión y reutilícelo para todas las evaluaciones de flags:

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

Reconstruir el contexto de evaluación para cada evaluación de flag añade una sobrecarga innecesaria. Cree el contexto una vez al inicio del ciclo de vida de la solicitud, luego páselo a todas las evaluaciones de flags posteriores.

### Maneje los fallos de inicialización (opcional) {#handle-initialization-failures-optional}
Considere manejar los fallos de inicialización si su aplicación puede funcionar con valores de flag predeterminados:

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

Si los Feature Flags son críticos para que su aplicación funcione, permita que la excepción se propague para evitar el inicio.

### Utilice claves de segmentación coherentes {#use-consistent-targeting-keys}
Utilice identificadores coherentes y estables como claves de segmentación:
- **Bueno**: ID de usuario, ID de sesión, ID de dispositivo
- **Evite**: Marcas de tiempo, valores aleatorios, ID que cambian con frecuencia

### Haga un seguimiento de la evaluación de flags {#monitor-flag-evaluation}
Utilice los resultados detallados de la evaluación para el registro y la depuración:

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

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba dedicado de Datadog con el `DatadogProvider` real, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de los marcadores directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se envía en `dev.openfeature:sdk` (ya es una dependencia de contexto de prueba), por lo que no se requiere ninguna biblioteca adicional. Agregue `dev.openfeature:sdk` a su configuración de prueba si aún no está presente.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.providers.memory.Flag;
import dev.openfeature.sdk.providers.memory.InMemoryProvider;
import java.util.Map;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckoutFlagTest {
    private Client client;

    @BeforeEach
    void setUp() {
        Map<String, Flag<?>> flags = Map.of(
            "new-checkout-flow", Flag.<Boolean>builder()
                .variant("on", true)
                .variant("off", false)
                .defaultVariant("on")
                .build(),
            "ui-theme", Flag.<String>builder()
                .variant("dark", "dark")
                .variant("light", "light")
                .defaultVariant("light")
                .build()
        );

        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new InMemoryProvider(flags));
        client = api.getClient();
    }

    @AfterEach
    void tearDown() {
        OpenFeatureAPI.getInstance().shutdown();
    }

    @Test
    void newCheckoutEnabledByDefault() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false));
    }

    @Test
    void missingFlagReturnsDefault() {
        assertFalse(client.getBooleanValue("does-not-exist", false));
    }
}
{{< /code-block >}}

`OpenFeatureAPI.getInstance()` es un singleton. Llame siempre a `shutdown()` en `@AfterEach` (o equivalente); de lo contrario, el estado del proveedor se filtra entre las clases de prueba y provoca conjuntos de pruebas inestables.

En las pruebas de Spring Boot, registre el `InMemoryProvider` a través de un bean `@TestConfiguration` o en un gancho `@BeforeAll` en una clase `@SpringBootTest`: el singleton de la API de OpenFeature persiste durante toda la vida útil del contexto de Spring, por lo que la inicialización solo necesita ejecutarse una vez.

## Solución de problemas {#troubleshooting}

Siga la ruta de datos del indicador desde la **Plataforma de indicadores** a través de la fuente de configuración seleccionada hasta el **SDK de Java**. Agentless y Remote Configuration tienen requisitos diferentes. Verifique la fuente activa antes de solucionar problemas de conectividad.

### 1. Plataforma de indicadores: Verifique la configuración del indicador {#1-flagging-platform-verify-flag-configuration}

Antes de verificar la infraestructura, confirme que el indicador en sí esté configurado correctamente:

1. El Feature Flag está **habilitado** para el entorno de destino, no deshabilitado. Los Feature Flags están deshabilitados de forma predeterminada en cada entorno.
2. El Feature Flag apunta al **entorno correcto** (`DD_ENV`). Los Feature Flags no se dirigen a servicios específicos; se aplican a todos los servicios dentro del entorno habilitado.
3. Su valor `DD_ENV` aparece en [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]. Si está ausente, el entorno aún no ha recibido tráfico de Feature Flags.

### 2. Verifique la fuente de configuración {#2-verify-the-configuration-source}

#### Agentless {#agentless}

1. Confirme que `dd-openfeature` y `dd-java-agent` sean de la versión 1.66.0 o posterior. Utilice la misma versión para ambos componentes.
2. Confirme que la JVM cargue `dd-java-agent` con `-javaagent`, ya sea en el comando de Java o a través de `JAVA_TOOL_OPTIONS`.
3. Confirme que `DD_FEATURE_FLAGS_ENABLED` no esté configurado o esté configurado en `true`.
4. Confirme que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` esté configurado, o que la fuente y la configuración del proveedor heredado no estén configuradas.
5. Confirme que el código de la aplicación inicialice el proveedor OpenFeature de Datadog.
6. Confirme que `DD_API_KEY`, `DD_SITE` y `DD_ENV` están configurados en el proceso de la aplicación.
7. Confirme que la aplicación puede realizar solicitudes HTTPS salientes a Datadog.
8. Habilite `DD_TRACE_DEBUG=true` y verifique si hay mensajes de autenticación, tiempo de espera o carga útil mal formada desde el punto de conexión de Feature Flags Agentless.

#### Agent Remote Configuration {#agent-remote-configuration}

1. Confirme que `dd-openfeature` y `dd-java-agent` sean de la versión 1.66.0 o posterior. Utilice la misma versión para ambos componentes.
2. Confirme que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` esté configurado. Durante la ventana de migración, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` también selecciona Remote Configuration cuando no se establece ninguna fuente.
3. Confirme que `DD_FEATURE_FLAGS_ENABLED` no esté configurado o esté configurado en `true`.
4. Confirme que el Agent 7.55 o posterior se esté ejecutando y sea accesible. Consulte [APM Connection Errors][2].
5. Confirme que Remote Configuration está habilitado en el Agent. Si está deshabilitado, establezca `remote_configuration.enabled: true` en `datadog.yaml` o `DD_REMOTE_CONFIGURATION_ENABLED=true`. Consulte [Remote Configuration][1].
6. Confirme que `DD_API_KEY` es válido en el Agent y pertenece a la organización de destino.
7. Confirme que `DD_SITE` está configurado correctamente en el Agent. Consulte [Agent Site Issues][3].
8. Ejecute `datadog-agent status` y revise la sección de Remote Configuration. Consulte [Agent Commands][6].

### 3. SDK: Verifique el estado del SDK de Java {#3-sdk-verify-java-sdk-state}

#### Habilite el registro de depuración {#enable-debug-logging}

Establezca `DD_TRACE_DEBUG=true` para habilitar los mensajes de inicio de Feature Flags. Para la fuente Agentless predeterminada, confirme que el sondeo de CDN comience después de la inicialización del proveedor.

Con `remote_config`, el proveedor utiliza el puente en el Agent de Java. Un Agent más antiguo produce un error de inicialización del proveedor que indica la versión del Agent requerida. No recurre a la entrega por CDN.

#### Hacer un seguimiento de los cambios de estado del proveedor {#monitor-provider-state-changes}

Agregue detectores de eventos al inicio de la aplicación para observar las transiciones del ciclo de vida del proveedor. Los detectores de eventos detectan cambios de conectividad después de la inicialización:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flag provider is ready");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Feature flag provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Feature flag provider configuration is stale");
});

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Feature flag configuration updated");
});
{{< /code-block >}}

Un evento `PROVIDER_ERROR` o `PROVIDER_STALE` después de la operación normal indica una interrupción en la fuente de configuración seleccionada.

#### Proveedor no listo {#provider-not-ready}

`PROVIDER_NOT_READY` se devuelve cuando se intenta evaluar un Feature Flag antes de que el proveedor reciba su primera configuración de la fuente seleccionada.

Causas comunes:

- **Inicialización asíncrona**: se utilizó `setProvider()` en lugar de `setProviderAndWait()`. Las evaluaciones antes de que llegue la primera configuración devuelven `PROVIDER_NOT_READY`.
- **Tiempo de espera de inicialización**: `setProviderAndWait()` excedió el tiempo de espera (predeterminado 30 segundos) y lanzó `ProviderNotReadyError`, el cual fue capturado. La aplicación continúa evaluando Feature Flags mientras espera la primera configuración.

Si `PROVIDER_NOT_READY` persiste más allá de los intervalos de sondeo e inicialización, verifique la fuente seleccionada nuevamente.

#### Evaluaciones de Feature Flags de depuración {#debug-flag-evaluations}

Si los Feature Flags devuelven valores inesperados, utilice `getBooleanDetails()` en lugar de `getBooleanValue()`. La variante `Details` devuelve un objeto `FlagEvaluationDetails` que expone el estado interno del proveedor:

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("your.flag.key", false, context);

logger.info("Flag evaluation details: value={}, variant={}, reason={}, errorCode={}",
    details.getValue(),
    details.getVariant(),
    details.getReason(),
    details.getErrorCode());
{{< /code-block >}}

Revise `reason` y `errorCode` para entender por qué el proveedor devolvió un resultado determinado.

#### Errores de discrepancia de tipo {#type-mismatch-errors}

`TYPE_MISMATCH` se devuelve cuando el método de evaluación no coincide con el tipo configurado del Feature Flag. Utilice el método correcto para cada tipo de Feature Flag: `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()`.

### 4. Plataforma de Feature Flags: Verifique que los datos aparezcan en Datadog {#4-flagging-platform-verify-data-appears-in-datadog}

<div class="alert alert-warning">Cuando no hay una ruta de telemetría compatible configurada, Java no exporta eventos de exposición o el <code>feature_flag.evaluations</code> métrica. Su ausencia no indica que la carga de la configuración o la evaluación local hayan fallado.</div>

#### Métricas de evaluación de Feature Flags {#flag-evaluation-metrics}

Los conteos de evaluación de flags aparecen en Datadog como una métrica de contador `feature_flag.evaluations` etiquetada con la clave de la flag, la variante del resultado y la razón de la evaluación. Consulte <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configuración de métricas de evaluación de flags del lado del servidor</a> para obtener la guía de configuración completa y los pasos de solución de problemas.

#### Exposiciones de experimentos {#experiment-exposures}

Cuando la ruta de configuración seleccionada admite exposiciones, las exposiciones aparecen solo para las flags asociadas con un experimento. Los feature flags estándar no generan eventos de exposición. Si faltan las exposiciones:

1. Verifique que la Feature Flag esté asociada con un experimento en la interfaz de usuario de Datadog.
2. Verifique la clave de API de Agent y la conectividad.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration/
[2]: /es/tracing/troubleshooting/connection_errors/
[3]: /es/agent/troubleshooting/site/
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /es/agent/configuration/agent-commands/
[7]: /es/account_management/api-app-keys/#api-keys
[8]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[9]: /es/feature_flags/concepts/configuration_sources/
[10]: /es/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[11]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[12]: /es/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[13]: /es/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[14]: /es/getting_started/site/
[15]: /es/serverless/google_cloud_run/functions/java/?tab=maven
[16]: /es/serverless/google_cloud_run/containers/in_container/java/
[17]: /es/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry