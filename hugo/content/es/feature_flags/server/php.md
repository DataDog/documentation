---
description: Configure las Feature Flags de Datadog para aplicaciones PHP.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/dd_libraries/php/
  tag: Documentación
  text: PHP Tracing
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de marcadores del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de traza de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
title: PHP Feature Flags
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación PHP con el Datadog Feature Flags SDK. El SDK de PHP utiliza el Remote Configuration del Datadog SDK para recibir actualizaciones de Feature Flags en tiempo real.

El SDK de PHP proporciona dos API de aplicación:

- **Datadog PHP API**: utilícela `DDTrace\FeatureFlags\Client` con aplicaciones PHP 7 o PHP 8.
- **OpenFeature adapter**: utilícelo `DDTrace\OpenFeature\DataDogProvider` con aplicaciones PHP 8 que utilicen la API estándar [OpenFeature][1].

La evaluación de Feature Flags es local y rápida. El SDK utiliza datos de configuración almacenados en caché localmente, por lo que no se producen solicitudes de red durante la evaluación.

## Requisitos previos {#prerequisites}

Antes de configurar el PHP Feature Flags SDK, asegúrese de tener:

- **Datadog Agent** con [Remote Configuration][2] habilitado
- **[clave de API][3] de Datadog** configurada en el Agent
- **Datadog PHP SDK** `datadog/dd-trace` versión 1.21.0 o posterior
- **Entorno de ejecución de PHP compatible**: PHP 7 o posterior con Datadog PHP API, o PHP 8 o posterior con OpenFeature adapter
- **OpenFeature PHP SDK** `open-feature/sdk` versión 2.1 o posterior, si utiliza OpenFeature adapter

Establezca las siguientes variables de entorno:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the SDK
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_VERSION=<YOUR_APP_VERSION>

# Required for flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

<div class="alert alert-info">El <code>EXPERIMENTAL_</code> prefijo se conserva por compatibilidad con versiones anteriores; el proveedor en sí es estable.</div>

Para configurar `feature_flag.evaluations`, incluida la versión requerida del rastreador y la configuración de OTLP del Agent, consulte [Configurar métricas de evaluación de marcadores del lado del servidor]][6]. Para obtener más información sobre los gráficos disponibles, consulte [Feature Flag Graphs][7].

## Instalación {#installation}

Feature Flagging es proporcionado por Application Performance Monitoring (APM). Instale y configure el rastreador Datadog PHP siguiendo [Tracing PHP Applications][4].

Si utiliza OpenFeature adapter en una aplicación PHP 8, instale el OpenFeature PHP SDK:

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

Elija la API que coincida con su entorno de ejecución de PHP y la arquitectura de su aplicación.

### PHP 7 y PHP 8: Datadog API {#php-7-and-php-8-datadog-api}

Utilice `DDTrace\FeatureFlags\Client` directamente en aplicaciones PHP 7 o PHP 8:

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
{{< /code-block >}}

### PHP 8: OpenFeature adapter {#php-8-openfeature-adapter}

En aplicaciones PHP 8, puede registrar Datadog como proveedor OpenFeature:

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
{{< /code-block >}}

El proveedor OpenFeature devuelve valores predeterminados hasta que Remote Configuration entrega la configuración inicial de Feature Flags. Inicialice el proveedor al inicio de la aplicación para que la configuración de Flag tenga tiempo de cargarse antes de que la lógica de negocio evalúe las Flags.

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina un contexto de evaluación que identifique al usuario o entidad para la segmentación de marcadores. La clave de segmentación se utiliza para una distribución de tráfico consistente, como lanzamientos porcentuales. Los atributos adicionales permiten reglas de segmentación, como "habilitar para usuarios en EE. UU." o "habilitar para usuarios de nivel premium".

### Datadog API {#datadog-api}

Para la Datadog PHP API, pase el contexto como un arreglo con las claves `targetingKey` y `attributes`:

{{< code-block lang="php" >}}
$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ],
];
{{< /code-block >}}

### Adaptador de OpenFeature {#openfeature-adapter}

Para el adaptador de OpenFeature, utilice el `EvaluationContext` del SDK de PHP de OpenFeature:

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

<div class="alert alert-warning">Los atributos del contexto de evaluación deben ser valores primitivos planos: cadenas, números y booleanos. Los arreglos anidados, los objetos y los valores nulos se ignoran para la segmentación y los informes de exposición.</div>

## Evaluar Feature Flags {#evaluate-flags}

Después de configurar el cliente, puede evaluar Feature Flags en toda su aplicación. Cada Feature Flag se identifica mediante una clave de cadena única y se evalúa con un método tipeado que devuelve un valor del tipo esperado. Si el Feature Flag no existe o no puede evaluarse, el SDK devuelve el valor predeterminado proporcionado.

### Feature Flags booleanos {#boolean-flags}

Utilice `getBooleanValue` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="php" >}}
$enabled = $flags->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

Con OpenFeature:

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);
{{< /code-block >}}

### Marcadores de cadena {#string-flags}

Utilice `getStringValue` para Feature Flags que seleccionen entre variantes o cadenas de configuración:

{{< code-block lang="php" >}}
$theme = $flags->getStringValue('ui-theme', 'light', $context);

switch ($theme) {
    case 'dark':
        setDarkTheme();
        break;
    case 'light':
    default:
        setLightTheme();
        break;
}
{{< /code-block >}}

### Marcadores numéricos {#numeric-flags}

Para Feature Flags numéricas, utilice `getIntegerValue` o `getFloatValue`. Estos métodos son apropiados cuando una Feature Flag depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="php" >}}
$maxItems = $flags->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $flags->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### Marcadores de objeto {#object-flags}

Para datos estructurados, use `getObjectValue`. Esto devuelve un arreglo de PHP:

{{< code-block lang="php" >}}
$config = $flags->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite algo más que el valor de la Feature Flag, use los métodos `get<Type>Details`. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="php" >}}
$details = $flags->getBooleanDetails('new-feature', false, $context);

printf("Value: %s\n", $details->getValue() ? 'true' : 'false');
printf("Variant: %s\n", $details->getVariant() ?? 'none');
printf("Reason: %s\n", $details->getReason());

if ($details->isError()) {
    printf("Error Code: %s\n", $details->getErrorCode());
    printf("Error Message: %s\n", $details->getErrorMessage());
}
{{< /code-block >}}

Los detalles del marcador le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Ejemplos completos {#complete-examples}

Los siguientes ejemplos combinan la inicialización, el contexto de evaluación, la evaluación tipeada y los detalles de evaluación.

### PHP 7 y PHP 8: Datadog API {#php-7-and-php-8-datadog-api-1}

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
        'tier' => 'premium',
    ],
];

$details = $flags->getStringDetails('checkout-copy', 'control', $context);

if ($details->isError()) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $details->getErrorCode(),
        $details->getErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

### PHP 8: OpenFeature adapter {#php-8-openfeature-adapter-1}

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('checkout-service', '1.0.0');
$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'country' => 'US',
        'tier' => 'premium',
    ])
);

$details = $client->getStringDetails('checkout-copy', 'control', $context);
$error = $details->getError();

if ($error !== null) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $error->getResolutionErrorCode()->getValue(),
        $error->getResolutionErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

## Evaluación sin contexto {#evaluation-without-context}

Puede evaluar Feature Flags sin proporcionar un contexto de evaluación. Esto es útil para Feature Flags globales que no requieren una segmentación específica del usuario:

{{< code-block lang="php" >}}
$maintenanceMode = $flags->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    http_response_code(503);
    echo 'Service temporarily unavailable';
    return;
}
{{< /code-block >}}

## Pruebas {#testing}

Puede probar contra un entorno de prueba dedicado de Datadog con el proveedor real de Datadog, o reemplazar la evaluación de Feature Flags con un doble de prueba en las pruebas unitarias.

El OpenFeature PHP SDK 2.1 no incluye un proveedor in-memory incorporado. Para pruebas unitarias, envuelva la evaluación de Feature Flags detrás de una interfaz de aplicación e inyecte una implementación falsa:

{{< code-block lang="php" filename="FeatureFlags.php" >}}
<?php

use DDTrace\FeatureFlags\Client;

interface FeatureFlagReader
{
    public function getBooleanValue($flagKey, $defaultValue, array $context = []);
}

final class DatadogFeatureFlagReader implements FeatureFlagReader
{
    private $client;

    public function __construct(Client $client = null)
    {
        $this->client = $client ?: new Client();
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return $this->client->getBooleanValue($flagKey, $defaultValue, $context);
    }
}

final class InMemoryFeatureFlagReader implements FeatureFlagReader
{
    private $flags;

    public function __construct(array $flags)
    {
        $this->flags = $flags;
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return array_key_exists($flagKey, $this->flags)
            ? (bool) $this->flags[$flagKey]
            : $defaultValue;
    }
}
{{< /code-block >}}

Utilice la implementación falsa en la configuración de su prueba:

{{< code-block lang="php" filename="CheckoutTest.php" >}}
$flags = new InMemoryFeatureFlagReader([
    'new-checkout-flow' => true,
]);

$checkout = new CheckoutService($flags);

self::assertTrue($checkout->usesNewCheckoutFlow('user-123'));
{{< /code-block >}}

## Solución de problemas {#troubleshooting}

### Feature Flags always return default values {#feature-flags-always-return-default-values}

Si las Feature Flags devuelven valores predeterminados de forma inesperada, verifique lo siguiente:

- Verifique que `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` esté configurado en el entorno de su aplicación.
- Verifique que Remote Configuration esté habilitado en la configuración de su Datadog Agent.
- Asegúrese de que `DD_SERVICE` y `DD_ENV` estén configurados y coincidan con el servicio y el entorno configurados para su Feature Flag.
- Confirme que su versión del Datadog PHP SDK incluya soporte para Feature Flags.
- Verifique que el proceso de PHP pueda comunicarse con el Datadog Agent.

### OpenFeature provider not found {#openfeature-provider-not-found}

El OpenFeature adapter solo está disponible para aplicaciones de PHP 8. Si no se encuentra `DDTrace\OpenFeature\DataDogProvider`:

- Verifique que la aplicación se esté ejecutando en PHP 8 o una versión posterior.
- Verifique que `open-feature/sdk` esté instalado a través de Composer.
- Verifique que la versión del rastreador Datadog PHP incluya soporte para Feature Flags.

### Las reglas de segmentación no coinciden con {#targeting-rules-do-not-match}

Si las reglas de segmentación no coinciden como se esperaba:

- Establezca un `targetingKey` estable para el usuario, la organización, la sesión o la entidad que se está evaluando.
- Pase datos de segmentación personalizados bajo la clave `attributes` al usar Datadog API.
- Utilice solo atributos primitivos planos. Los arreglos anidados, los objetos y los valores nulos se ignoran.
- Verifique que el valor de `DD_ENV` aparezca en [{{< ui >}}Feature Flag Environments{{< /ui >}}][5].

### Verifique las métricas y exposiciones de Feature Flags en Datadog {#verify-flag-metrics-and-exposures-in-datadog}

#### Métricas de evaluación de Feature Flags {#flag-evaluation-metrics}

Los conteos de evaluación de Feature Flags aparecen en Datadog cuando `DD_METRICS_OTEL_ENABLED=true` está configurado para el rastreador Datadog PHP. Cada evaluación emite una métrica de contador `feature_flag.evaluations` etiquetada con la clave de la Feature Flag, la variante del resultado y la razón de la evaluación. Si esta métrica no aparece, confirme que `DD_METRICS_OTEL_ENABLED=true` esté configurado en su entorno y que su versión del rastreador Datadog PHP admita métricas de evaluación de Feature Flags. Consulte [Configurar métricas de evaluación de Feature Flags del lado del servidor][6] para la configuración y solución de problemas del receptor OTLP del Datadog Agent.

#### Exposiciones de experimentos {#experiment-exposures}

Las exposiciones aparecen en Datadog solo para las Feature Flags asociadas con un experimento. Las Feature Flags estándar sin asociación a un experimento no generan eventos de exposición. Si faltan las exposiciones:

1. Verifique que la Feature Flag esté asociada con un experimento en la interfaz de usuario de Datadog.
2. Verifique que `DD_API_KEY` del Datadog Agent sea correcta y que el Datadog Agent esté recibiendo eventos.
3. Verifique que el contexto de evaluación utilice atributos primitivos planos. Los arreglos anidados, los objetos y los valores nulos se ignoran para los informes de exposición.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /es/agent/remote_config/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/tracing/trace_collection/dd_libraries/php/
[5]: /es/feature_flags/concepts/environments/
[6]: /es/feature_flags/guide/server_flag_evaluation_metrics/