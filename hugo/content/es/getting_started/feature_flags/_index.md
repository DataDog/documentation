---
description: Administre la entrega de funciones con observabilidad integrada, métricas
  en tiempo real y despliegues graduales compatibles con OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: SDK del lado del cliente
- link: /feature_flags/server/
  tag: Documentación
  text: SDK del lado del servidor
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: Blog
  text: Entregue funciones de forma más rápida y segura con Datadog Feature Flags
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: Blog
  text: Cómo cerrar la brecha entre velocidad y calidad en los experimentos mediante
    datos unificados
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: Blog
  text: Cómo Datadog Feature Flags es resistente a las fallas de los proveedores de
    la nube
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilice métricas de protección y deje de supervisar manualmente sus lanzamientos
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: Blog
  text: Todos los equipos deberían realizar pruebas A/B
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: La brecha de latencia de la señal del producto que ralentiza su crecimiento
site_support_id: getting_started_feature_flags
title: Primeros pasos con Feature Flags
---
## Descripción general {#overview}

Las Feature Flags de Datadog ofrecen una forma potente e integrada de gestionar la entrega de funciones, con observabilidad integrada e integración perfecta en toda la plataforma.

- **Métricas en tiempo real:** Entienda quién recibe cada variante, así como el impacto de su flag en la salud y el rendimiento de su aplicación, todo en tiempo real.

- **Admite tipos de flag comunes:** Utilice variantes booleanas, de cadena, enteras, numéricas (float/double) o JSON. Los SDK de JavaScript utilizan `getNumberValue()` tanto para variantes enteras como numéricas, mientras que Java, Swift, Kotlin y Python exponen métodos de evaluación separados para números enteros y de punto flotante.

- **Diseñado para la experimentación:** Diríjase a audiencias específicas para pruebas A/B, despliegue funciones gradualmente con lanzamientos canary y realice reversiones automáticas cuando se detecten regresiones.

- **Compatible con OpenFeature:** Construido sobre el estándar OpenFeature, lo que garantiza la compatibilidad con las implementaciones existentes de OpenFeature y proporciona un enfoque neutral respecto al proveedor para la gestión de Feature Flags.

## SDKs de Feature Flags {#feature-flags-sdks}

Esta guía utiliza el SDK de JavaScript para navegador como ejemplo. Puede integrar las Feature Flags de Datadog en cualquier aplicación utilizando uno de los siguientes SDKs:

### SDKs del lado del cliente {#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart y Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### SDKs del lado del servidor {#server-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## Configure sus entornos {#configure-your-environments}

Es probable que su organización ya tenga entornos preconfigurados para Desarrollo, Staging y Producción. Para obtener detalles sobre consultas de entornos, marcado de producción y gestión de entornos, consulte [Environments][4].

## Cree su primer Feature Flag {#create-your-first-feature-flag}

<div class="alert alert-info">
Puede configurar Feature Flags automáticamente con el <a href="/feature_flags/feature_flag_mcp_server/">Feature Flags MCP Server</a>. Después de conectarse, indique a su agente de IA: "Ayúdeme a configurar los Feature Flags de Datadog en mi aplicación". El MCP Server revisa su base de código e instala el SDK y los fragmentos de código necesarios para su lenguaje y framework.
</div>

### Paso 1: Importe e inicialice el SDK {#step-1-import-and-initialize-the-sdk}

Elija el SDK que coincida con el lugar donde se evalúa el Feature Flag e inicialice el Datadog Feature Flags provider.

{{< tabs >}}
{{% tab "Navegador JavaScript" %}}

Instale `@datadog/openfeature-browser`, `@openfeature/web-sdk` y `@openfeature/core` como dependencias en su proyecto:

{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

Luego, agregue lo siguiente a su proyecto para inicializar el SDK:

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags no son compatibles con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    // Required client-side Datadog credentials
    applicationId: '<APPLICATION_ID>',
    clientToken: '<CLIENT_TOKEN>',
    site: '{{< region-param key="dd_site" code="true" >}}',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
{{< /code-block >}}

<div class="alert alert-info">El SDK de navegador emite tres flujos de telemetría independientes, todos habilitados de forma predeterminada. <code>enableExposureLogging</code> envía eventos de exposición por evaluación a la ingesta de exposiciones. <code>enableFlagEvaluationTracking</code> envía telemetría de evaluación agregada a la ingesta de evaluación de flags. <code>enableRumFeatureFlagTracking</code> adjunta evaluaciones de flags a eventos de RUM y es la configuración que puede afectar el uso de RUM. Deshabilite solo la transmisión que no necesite.</div>

{{% /tab %}}
{{% tab "Servidor Node.js" %}}

Instale `dd-trace` y el SDK de servidor de OpenFeature:

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Habilite el proveedor con variables de entorno:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

O habilite el proveedor en el código:

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

// Wait for the provider to initialize before evaluating flags.
await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Agregue las dependencias del SDK de OpenFeature y del Datadog OpenFeature provider:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.63.0'
}
{{< /code-block >}}

Habilite el proveedor e inicie su aplicación con el rastreador de Java:

{{< code-block lang="bash" >}}
# Required: Enable the feature flagging provider
# The EXPERIMENTAL_ prefix is historical; the provider is no longer experimental.
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

Para emitir métricas de evaluación de flags, agregue las dependencias del SDK de OpenTelemetry y configure el punto de conexión OTLP. Consulte [Configurar métricas de evaluación de flags del lado del servidor][9].

Registre el Datadog OpenFeature provider:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

Habilite el proveedor con variables de entorno:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Instale el SDK de Python de Datadog y el SDK de OpenFeature:

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Registre el Datadog OpenFeature provider:

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Initialize the tracer (required for Remote Configuration)
tracer.configure()

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Credenciales de un vistazo {#credentials-at-a-glance}

| Credencial | Utilizado por | Dónde va | ¿Sensible? |
| --- | --- | --- | --- |
| Token de cliente | SDK de navegador, móvil y juegos | Configuración de la aplicación cliente | No — seguro para incluir en código de cliente público |
| ID de aplicación | SDKs de cliente respaldados por navegador y RUM | Configuración de la aplicación cliente | No — identificador público |
| Clave de API | Datadog Agent para Remote Configuration del lado del servidor | Solo configuración del agente | Sí — manténgalo solo en el lado del servidor |

No coloque claves de API en aplicaciones de navegador, móviles o de juegos.

Puede encontrar más información sobre las opciones de configuración del SDK de OpenFeature en su [documentación][1]. Para obtener más información sobre cómo crear tokens de cliente e IDs de aplicación, consulte [API and Application Keys][3].

### Paso 2: Cree un Feature Flag {#step-2-create-a-feature-flag}

Vaya a [{{< ui >}}Create Feature Flag{{< /ui >}}][2] en Datadog y configure lo siguiente:

- **Nombre y clave**: El nombre que se muestra del Feature Flag y la clave a la que se hace referencia en el código
- **Canales de distribución de SDKs**: Controle qué SDKs reciben la configuración de su flag; consulte [Distribution Channels][6]
- **Tipo de variante** y **valores de variante**: Consulte [Variants and Flag Types][5]

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} y {{< ui >}}variant values{{< /ui >}} deben considerarse públicos cuando se envían a los SDK de cliente.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags-2.png" alt="Crear Feature Flag" style="width:100%;" >}}

### Paso 3: Evalúe el Feature Flag y escriba el código de la funcionalidad {#step-3-evaluate-the-flag-and-write-feature-code}

En el código de su aplicación, utilice el SDK para evaluar el Feature Flag y restringir la nueva funcionalidad.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos de contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se pierdan.</div>

{{< tabs >}}
{{% tab "Navegador JavaScript" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
    org_id: 2,
    user_id: 'user-123',
    email: 'user@example.com',
    targetingKey: 'user-123'
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
    // Feature code here
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Servidor Node.js" %}}

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "email": "user@example.com",
        "tier": "premium"
    }
)

enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Después de completar este paso, vuelva a implementar la aplicación para aplicar estos cambios. Puede encontrar ejemplos de uso adicionales en las páginas del SDK específicas de la plataforma vinculadas anteriormente.

### Paso 4: Defina las reglas de segmentación y habilite el Feature Flag {#step-4-define-targeting-rules-and-enable-the-feature-flag}

Configure las [reglas de segmentación][7] para definir qué sujetos reciben cada variante. Después de guardar sus reglas, habilite el Feature Flag en el entorno elegido.

<div class="alert alert-info">
Como práctica recomendada general, implemente los cambios en un entorno de Staging antes que en Producción.
</div>

Para despliegues por porcentaje, consulte [División de tráfico y aleatorización][8].

### Paso 5: Haga un seguimiento de su despliegue {#step-5-monitor-your-rollout}

Haga un seguimiento del despliegue de la funcionalidad desde la página de detalles del Feature Flag, la cual proporciona seguimiento de exposición en tiempo real y métricas como {{< ui >}}error rate{{< /ui >}} y {{< ui >}}page load time{{< /ui >}}. A medida que lanza la funcionalidad de forma incremental con el Feature Flag, vea el panel {{< ui >}}Real-time metric overview{{< /ui >}} en la interfaz de usuario de Datadog para ver cómo la funcionalidad afecta el rendimiento de la aplicación.

{{< img src="getting_started/feature_flags/real-time-flag-metrics-2.png" alt="Panel de métricas de Feature Flags en tiempo real" style="width:100%;" >}}

Para aplicaciones del lado del servidor, también puede habilitar métricas de evaluación de Feature Flags para realizar un seguimiento de la frecuencia con la que se devuelve cada variante y graficar los datos en tableros. Consulte [Configurar métricas de evaluación de flags del lado del servidor][9]. Para adjuntar datos de Feature Flags a trazas de APM y filtrar trazas por variante del Feature Flag, consulte [Set Up APM Trace Enrichment for Feature Flags][10].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/#client-tokens
[4]: /es/feature_flags/concepts/environments/
[5]: /es/feature_flags/concepts/variants_and_flag_types/
[6]: /es/feature_flags/concepts/distribution_channels/
[7]: /es/feature_flags/concepts/targeting_rules/
[8]: /es/feature_flags/concepts/traffic_splitting/
[9]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[10]: /es/feature_flags/guide/apm_trace_enrichment/