---
description: Agregue Feature Flags de Datadog a una aplicación que utilice OpenTelemetry
  para la traza.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /opentelemetry/instrument/dd_sdks/api_support/
  tag: Documentación
  text: Soporte de la API de OpenTelemetry
- link: /remote_configuration/
  tag: Documentación
  text: Remote Configuration
title: Feature Flags con OpenTelemetry
---
## Descripción general {#overview}

Puede agregar [Datadog Feature Flags][1] a una aplicación que utilice [OpenTelemetry (OTel)][2] para la traza. Datadog admite dos opciones de integración. En ambos casos, Feature Flags se evalúan correctamente y su código de instrumentación de la API de OpenTelemetry existente permanece igual.

Elija una opción de integración según si puede cambiar la inicialización de su proveedor de traza:

- **Opción A:** Registrar el SDK de Datadog como TracerProvider
- **Opción B:** Ejecutar el SDK de Datadog junto con OpenTelemetry

Si puede cambiar la inicialización de su proveedor de traza, se recomienda la Opción A. Si no puede cambiar su proveedor de traza, utilice la Opción B para adoptar Feature Flags sin cambiar su canalización de traza de OTel.

## Requisitos previos {#prerequisites}

Siga la guía de instalación de [Server-Side Feature Flags][1] de Datadog para su lenguaje.

## Opción A: Registrar el SDK de Datadog como TracerProvider {#option-a-register-the-datadog-sdk-as-the-tracerprovider}

En esta opción, el SDK de Datadog reemplaza al SDK de OTel como el `TracerProvider`. Su código de instrumentación de la API de OpenTelemetry existente (spans, atributos, eventos y propagación de contexto) permanece igual.

<div class="alert alert-warning">Elimine cualquier inicialización existente de TracerProvider y exportador de OpenTelemetry para evitar trazas duplicadas.</div>

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var ffProvider = new DatadogProvider();
await Api.Instance.SetProviderAsync(ffProvider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para .NET](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces).

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
import (
    "log"

    ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
    "go.opentelemetry.io/otel"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog SDK as the OpenTelemetry TracerProvider
    otelProvider := ddotel.NewTracerProvider()
    defer otelProvider.Shutdown()
    otel.SetTracerProvider(otelProvider)

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := flagProvider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry API calls continue to work unchanged
}
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para Go](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces).

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry API calls continue to work unchanged */
{{< /code-block >}}

**Nota**: Para la traza, dependa únicamente de la API de OpenTelemetry, no del SDK de OpenTelemetry. Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para Java](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces). Para emitir métricas de evaluación de Feature Flags, también necesita las dependencias del SDK de métricas de OpenTelemetry y del exportador OTLP; consulte [Configurar métricas de evaluación de Feature Flags del lado del servidor][3].

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';
import * as otel from '@opentelemetry/api';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog SDK as the OpenTelemetry TracerProvider
const provider = new tracer.TracerProvider();
provider.register();

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing @opentelemetry/api calls continue to work unchanged:
const otelTracer = otel.trace.getTracer('my-service');
otelTracer.startActiveSpan('my-operation', (span) => { ... });
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para Node.js](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces).

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para Python](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces).

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'opentelemetry/sdk'
require 'datadog/opentelemetry'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

# Enable remote configuration and OpenFeature integration
Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para Ruby](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces).

{{% /tab %}}
{{% tab "PHP" %}}

**Nota**: El adaptador de OpenFeature requiere PHP 8 o posterior.

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="php" filename="app.php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

// Register the Datadog OpenFeature provider
$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');

// Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

Para obtener más detalles, consulte [Soporte de la API de OpenTelemetry para PHP](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php&platform=traces).

{{% /tab %}}
{{< /tabs >}}

## Opción B: Ejecutar el SDK de Datadog junto con OpenTelemetry {#option-b-run-the-datadog-sdk-alongside-opentelemetry}

En esta opción, su SDK de OTel existente sigue siendo el `TracerProvider` para la traza. Agregue el SDK de Datadog solo para la entrega de Feature Flags a través de Remote Configuration. La inicialización, los exportadores y la instrumentación de su SDK de OTel permanecen sin cambios.

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := flagProvider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry SDK initialization stays unchanged
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

**Nota**: Para emitir métricas de evaluación de flags, agregue las dependencias de métricas del SDK de OpenTelemetry y del exportador OTLP; consulte [Configurar métricas de evaluación de flags del lado del servidor][3].

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry SDK initialization stays unchanged */
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init({
  plugins: false,
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

**Nota**: El adaptador de OpenFeature requiere PHP 8 o posterior.

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="php" filename="app.php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

// Register the Datadog OpenFeature provider
$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Evaluar Feature Flags {#evaluate-feature-flags}

Después de inicializar el proveedor, evalúe Feature Flags con el cliente de OpenFeature. La evaluación de Feature Flags utiliza la configuración almacenada en caché localmente, por lo que las evaluaciones no realizan solicitudes de red.

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")
    .Set("companyID", "acme-corp")
    .Build();

var isEnabled = await client.GetBooleanValueAsync("my-flag", false, evalCtx);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "companyID": "acme-corp",
    },
)

enabled, err := client.BooleanValue(context.Background(), "my-flag", false, evalCtx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("companyID", "acme-corp");

boolean isEnabled = client.getBooleanValue("my-flag", false, context);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk';

const client = OpenFeature.getClient();

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const isEnabled = await client.getBooleanValue(
  'my-flag',
  false,
  evaluationContext,
);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={"companyID": "acme-corp"},
)

is_enabled = client.get_boolean_value("my-flag", False, eval_ctx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" >}}
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  companyID: 'acme-corp',
)

is_enabled = client.fetch_boolean_value(
  flag_key: 'my-flag',
  default_value: false,
  evaluation_context: context,
)
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes(['companyID' => 'acme-corp'])
);

$isEnabled = $client->getBooleanValue('my-flag', false, $context);
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

En ambas opciones de integración, Feature Flags se evalúan de la misma manera. Las configuraciones de Feature Flags se entregan a través del mismo canal de Remote Configuration.

Para obtener instrucciones de configuración completas, getters tipados, requisitos de contexto de evaluación y patrones de prueba, consulte la [documentación del SDK del lado del servidor][1] de su lenguaje.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /es/feature_flags/guide/server_flag_evaluation_metrics/