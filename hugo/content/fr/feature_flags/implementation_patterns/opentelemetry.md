---
description: Ajoutez Datadog Feature Flags à une application qui utilise OpenTelemetry
  pour le traçage.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /opentelemetry/instrument/dd_sdks/api_support/
  tag: Documentation
  text: Assistance pour lʼAPI OpenTelemetry
- link: /remote_configuration/
  tag: Documentation
  text: Remote Configuration
title: Feature Flags avec OpenTelemetry
---
## Présentation {#overview}

Vous pouvez ajouter [Datadog Feature Flags][1] à une application qui utilise [OpenTelemetry (OTel)][2] pour le traçage. Datadog prend en charge deux options d'intégration. Dans les deux cas, les Feature Flags s'évaluent correctement et votre code d'instrumentation API OpenTelemetry existant reste inchangé.

Choisissez une option d'intégration selon que vous pouvez modifier ou non l'initialisation de votre fournisseur de traçage :

- **Option A :** Enregistrez le SDK Datadog en tant que TracerProvider
- **Option B :** Exécutez le SDK Datadog parallèlement à OpenTelemetry

Si vous pouvez modifier l'initialisation de votre fournisseur de traçage, Option A est recommandée. Si vous ne pouvez pas modifier votre fournisseur de traçage, utilisez Option B pour adopter les Feature Flags sans modifier votre pipeline de traces OTel.

## Prérequis {#prerequisites}

Suivez le guide d'installation des [Server-Side Feature Flags][1] de Datadog pour votre langage.

## Option A : Enregistrez le SDK Datadog en tant que TracerProvider {#option-a-register-the-datadog-sdk-as-the-tracerprovider}

Dans cette option, le SDK Datadog remplace le SDK OTel en tant que `TracerProvider`. Votre code d'instrumentation API OpenTelemetry existant — spans, attributs, événements et propagation de contexte — reste inchangé.

<div class="alert alert-warning">Supprimez toute initialisation existante de TracerProvider et d'exportateur OpenTelemetry pour éviter les traces en double.</div>

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

Pour plus de détails, consultez [Prise en charge de l'API OpenTelemetry pour .NET](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces).

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

Pour plus de détails, consultez [Prise en charge de l'API OpenTelemetry pour Go](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces).

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

**Remarque** : Pour le traçage, dépendez uniquement de l'API OpenTelemetry, et non du SDK OpenTelemetry. Pour plus de détails, consultez [Prise en charge de l'API OpenTelemetry pour Java](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces). Pour émettre des métriques d'évaluation d'indicateurs, vous avez également besoin des dépendances du SDK de métriques OpenTelemetry et de l'exportateur OTLP ; consultez [Configurer les métriques d'évaluation d'indicateurs côté serveur][3].

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

Pour plus de détails, consultez [la prise en charge de l'API OpenTelemetry pour Node.js](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces).

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

Pour plus de détails, consultez [la prise en charge de l'API OpenTelemetry pour Python](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces).

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

Pour plus de détails, consultez [la prise en charge de l'API OpenTelemetry pour Ruby](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces).

{{% /tab %}}
{{% tab "PHP" %}}

**Remarque** : L'adaptateur OpenFeature nécessite PHP 8 ou une version ultérieure.

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

Pour plus de détails, consultez [la prise en charge de l'API OpenTelemetry pour PHP](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php&platform=traces).

{{% /tab %}}
{{< /tabs >}}

## Option B : Exécutez le SDK Datadog parallèlement à OpenTelemetry {#option-b-run-the-datadog-sdk-alongside-opentelemetry}

Dans cette option, votre SDK OTel existant reste le `TracerProvider` pour le traçage. Ajoutez le SDK Datadog uniquement pour la diffusion des Feature Flags via Remote Configuration. L'initialisation, les exportateurs et l'instrumentation de votre SDK OTel restent inchangés.

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

**Remarque** : Pour émettre des métriques d'évaluation de Feature Flags, ajoutez les dépendances du SDK de métriques OpenTelemetry et de l'exportateur OTLP ; consultez [Set Up Server-Side Flag Evaluation Metrics][3].

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

**Remarque** : L'adaptateur OpenFeature nécessite PHP 8 ou une version ultérieure.

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

## Évaluer les Feature Flags {#evaluate-feature-flags}

Une fois le fournisseur initialisé, évaluez les Feature Flags avec le client OpenFeature. L'évaluation des Feature Flags utilise une configuration mise en cache localement, de sorte que les évaluations n'effectuent pas de requêtes réseau.

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

Dans les deux options d'intégration, les Feature Flags s'évaluent de la même manière. Les configurations des Feature Flags sont transmises via le même canal Remote Configuration.

Pour obtenir des instructions de configuration complètes, des getters typés, les exigences de contexte d'évaluation et des modèles de test, consultez la [documentation du SDK côté serveur][1] de votre langage.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /fr/feature_flags/guide/server_flag_evaluation_metrics/