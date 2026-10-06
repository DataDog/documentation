---
description: Configure las Feature Flags de Datadog para aplicaciones de Ruby.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/
  tag: Documentación
  text: Trazado de Ruby
- link: /tracing/
  tag: Documentación
  text: Obtenga información sobre Application Performance Monitoring (APM)
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de marcadores del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
title: Feature Flags de Ruby
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación Ruby con el SDK de Feature Flags de Datadog. El SDK de Ruby se integra con [OpenFeature][3], un estándar abierto para la gestión de Feature Flags, y recibe actualizaciones de Feature Flags a través de Remote Configuration en el tracer de Ruby de Datadog (`datadog` gem).

## Requisitos previos {#prerequisites}

Antes de configurar el SDK de Feature Flags de Ruby, asegúrese de tener:

- **Datadog Agent** versión 7.55 o posterior con [Remote Configuration][1] habilitada
- **[clave de API][4] de Datadog** configurada en el Agent
- **SDK de Ruby de Datadog** `datadog` versión 2.24.0 o posterior
- **Entorno de ejecución de Ruby** versión 3.1 o posterior para utilizar la integración completa de Datadog Feature Flags con OpenFeature
- **SDK de OpenFeature para Ruby** `openfeature-sdk` versión 0.5.1 o posterior para soporte de hooks de proveedor, registro de exposición y métricas de evaluación de Feature Flags
- **Gemas de métricas de OpenTelemetry** para [métricas de evaluación de Feature Flags][5]: `opentelemetry-metrics-sdk` versión 0.8.0 o posterior, y `opentelemetry-exporter-otlp-metrics` versión 0.4.0 o posterior
- **Servicio y entorno configurados** - Las Feature Flags se aplican por servicio y entorno
- **Sistema operativo compatible** - El soporte para producción está limitado a [sistemas operativos Linux][2]. macOS y Windows no son objetivos de producción compatibles de forma nativa, pero los entornos de Linux en contenedores Docker que se ejecutan en esos sistemas operativos sí lo son. Para el desarrollo local en macOS, puede utilizar un artefacto nativo precompilado compatible cuando esté disponible.

<div class="alert alert-info">El tracer de Ruby de Datadog admite runtimes de Ruby más antiguos para APM. Las aplicaciones en versiones de Ruby más antiguas, incluida Ruby 2.5, pueden seguir utilizando Datadog APM, pero no pueden utilizar las Feature Flags de Datadog a través de OpenFeature hasta que se actualicen a Ruby 3.1 o posterior. Las versiones del SDK de OpenFeature para Ruby que exponen la superficie de hooks de proveedor necesaria para la telemetría completa de Feature Flags requieren Ruby 3.1 o posterior.</div>

## Instalación e inicialización {#installing-and-initializing}

El Feature Flagging es proporcionado por Application Performance Monitoring (APM). Para integrar APM en su aplicación con soporte para Feature Flags, instale las gemas requeridas y configure Remote Configuration con soporte para OpenFeature.

```shell
gem install datadog openfeature-sdk
```

Para emitir métricas de evaluación de Feature Flags, agregue las gemas de métricas de OpenTelemetry al paquete de su aplicación:

```ruby
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
```

Puede habilitar los Feature Flags con variables de entorno:

```shell
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
```

<div class="alert alert-info">El <code>EXPERIMENTAL_</code> prefijo se conserva por compatibilidad con versiones anteriores; el proveedor en sí es estable.</div>

Consulte <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configurar métricas de evaluación de Feature Flags del lado del servidor</a> para habilitar la experimental <code>feature_flag.evaluations</code> métrica. Consulte <a href="/feature_flags/concepts/flag_graphs/">Gráficos de Feature Flags</a> para obtener más información sobre los gráficos disponibles.

O habilite el proveedor en el código:

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

INITIALIZATION_TIMEOUT = 30

# Configure Datadog with feature flagging enabled
Datadog.configure do |config|
  config.remote.enabled = true
  config.remote.boot_timeout_seconds = INITIALIZATION_TIMEOUT
  config.open_feature.enabled = true
end

# Configure OpenFeature SDK with Datadog provider and wait for initialization
OpenFeature::SDK.configure do |config|
  config.set_provider_and_wait(
    Datadog::OpenFeature::Provider.new,
    timeout: INITIALIZATION_TIMEOUT
  )
end

# Create OpenFeature client
client = OpenFeature::SDK.build_client
```

El uso de `set_provider_and_wait` bloquea su aplicación para que no continúe hasta que el proveedor esté completamente inicializado o se alcance el tiempo de espera. Esto asegura que los marcadores estén listos antes de que su aplicación comience a manejar solicitudes. Si prefiere una inicialización no bloqueante, utilice `set_provider` en su lugar. Si lo hace, el cliente devuelve valores predeterminados hasta que Remote Configuration se carga en segundo plano.

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina un contexto de evaluación que identifique al usuario o entidad para la segmentación de marcadores. El contexto de evaluación incluye atributos utilizados para determinar qué variaciones de marcador deben devolverse:

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

```ruby
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',  # Targeting key (typically user ID)
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
  age: 25
)
```

La clave de segmentación se utiliza para una distribución de tráfico consistente (lanzamientos porcentuales). Los atributos adicionales permiten reglas de segmentación, como "habilitar para usuarios en EE. UU." o "habilitar para usuarios de nivel premium" en el ejemplo anterior.

## Evalúe marcadores {#evaluate-flags}

Después de crear el cliente `OpenFeature`, puede comenzar a leer los valores de los Feature Flags en toda su aplicación. La evaluación de Feature Flags utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar Feature Flags.

Cada Feature Flag se identifica mediante una _clave_ de cadena única. Los Feature Flags se evalúan utilizando métodos tipados que devuelven valores que coinciden con el tipo esperado. El SDK devuelve el valor predeterminado si una Feature Flag no existe o no se puede evaluar.

### Marcadores booleanos {#boolean-flags}

Utilice `fetch_boolean_value()` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso:

```ruby
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout-flow',
  default_value: false,
  evaluation_context: context
)

if enabled
  show_new_checkout
else
  show_legacy_checkout
end
```

### Marcadores de cadena {#string-flags}

Utilice `fetch_string_value()` para Feature Flags que seleccionen entre múltiples variantes o cadenas de configuración:

```ruby
theme = client.fetch_string_value(
  flag_key: 'ui-theme',
  default_value: 'light',
  evaluation_context: context
)

case theme
when 'dark'
  set_dark_theme
when 'light'
  set_light_theme
else
  set_light_theme
end
```

### Feature Flags numéricos {#number-flags}

Para Feature Flags numéricos, utilice `fetch_integer_value()` o `fetch_float_value()`. Ruby también proporciona `fetch_number_value()`, que devuelve el tipo apropiado según el valor predeterminado. Estos métodos son apropiados cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

```ruby
max_items = client.fetch_integer_value(
  flag_key: 'cart-max-items',
  default_value: 20,
  evaluation_context: context
)

discount_rate = client.fetch_float_value(
  flag_key: 'discount-rate',
  default_value: 0.0,
  evaluation_context: context
)

# Generic number method (type based on default)
batch_size = client.fetch_number_value(
  flag_key: 'batch-size',
  default_value: 100,  # Returns integer
  evaluation_context: context
)
```

### Marcadores de objeto {#object-flags}

Para datos estructurados, use `fetch_object_value()`. Este método devuelve un hash. Los Feature Flags de objeto son útiles para escenarios de Remote Configuration donde se deben proporcionar varias propiedades juntas.

```ruby
config = client.fetch_object_value(
  flag_key: 'feature-config',
  default_value: {
    'maxRetries' => 3,
    'timeout' => 30
  },
  evaluation_context: context
)

max_retries = config['maxRetries'] || 3
timeout = config['timeout'] || 30
```

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite más que solo el valor del Feature Flag, use los métodos `fetch_<type>_details`. Estos métodos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

```ruby
details = client.fetch_boolean_details(
  flag_key: 'new-feature',
  default_value: false,
  evaluation_context: context
)

puts "Value: #{details.value}"
puts "Variant: #{details.variant}"
puts "Reason: #{details.reason}"
puts "Error Code: #{details.error_code}"
puts "Error Message: #{details.error_message}"
```

Los detalles del marcador le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Evaluación sin contexto {#evaluation-without-context}

Puede evaluar Feature Flags sin proporcionar un contexto de evaluación. Esto es útil para Feature Flags globales que no requieren una segmentación específica del usuario:

```ruby
# Global feature flag - no context needed
maintenance_mode = client.fetch_boolean_value(
  flag_key: 'maintenance-mode',
  default_value: false
)

if maintenance_mode
  halt 503, { error: 'Service temporarily unavailable' }.to_json
end
```

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba de Datadog dedicado con el `Datadog::OpenFeature::Provider` real, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de los Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se incluye con `openfeature-sdk`, por lo que no se requiere ninguna gema adicional.

El `InMemoryProvider` del SDK de Ruby toma un hash simple de claves de Feature Flags a valores; las variantes y las reglas de segmentación no son compatibles. El proveedor de OpenFeature se establece en un singleton global del proceso, por lo que las pruebas que intercambian el proveedor deben restaurarlo en el desmontaje (teardown) para evitar la fuga del estado de las Feature Flags entre ejemplos. Un hook `around` maneja la configuración, la restauración y las excepciones de forma limpia en un solo bloque.

```ruby
# spec/support/feature_flags.rb
require 'open_feature/sdk'
require 'open_feature/sdk/provider/in_memory_provider'

RSpec.configure do |config|
  config.around(:each, :feature_flags) do |example|
    original = OpenFeature::SDK::API.instance.provider
    OpenFeature::SDK.configure do |c|
      c.set_provider(OpenFeature::SDK::Provider::InMemoryProvider.new(
        'new-checkout-flow' => true,
        'ui-theme' => 'dark',
        'discount-rate' => 0.15
      ))
    end
    example.run
  ensure
    OpenFeature::SDK.configure { |c| c.set_provider(original) } if original
  end
end

# spec/checkout_spec.rb
require 'spec_helper'

RSpec.describe Checkout, :feature_flags do
  let(:client) { OpenFeature::SDK.build_client }

  it 'returns the in-memory flag value' do
    expect(client.fetch_boolean_value(flag_key: 'new-checkout-flow', default_value: false)).to be true
  end

  it 'falls back to the default for unknown flags' do
    expect(client.fetch_boolean_value(flag_key: 'does-not-exist', default_value: false)).to be false
  end
end
```

Para modificar el estado de las Feature Flags durante una prueba, llame a `add_flag(flag_key:, value:)` en la instancia del proveedor. El mismo patrón se aplica a Minitest: reemplace el hook `around` con los métodos `setup`/`teardown`.

## Solución de problemas {#troubleshooting}

### Las Feature Flags siempre devuelven valores predeterminados {#feature-flags-always-return-default-values}

Si las Feature Flags devuelven inesperadamente siempre valores predeterminados, verifique lo siguiente:

- Verifique que la Configuración remota esté habilitada en la configuración de su Datadog Agent
- Asegúrese de que el servicio y el entorno estén configurados (ya sea a través de las variables de entorno `DD_SERVICE` y `DD_ENV` o `config.service` y `config.env` en Ruby)
- Verifique que `config.remote.enabled = true` y `config.open_feature.enabled = true` estén configurados en la configuración de Datadog de su aplicación Ruby
- Verifique que la versión de la gema `datadog` incluya soporte para OpenFeature (2.24.0 o posterior)

### Problemas de conexión de Configuración remota {#remote-configuration-connection-issues}

Revise los registros del tracer de Datadog Ruby para conocer el estado de la Configuración remota:

```ruby
# Enable startup and debug logging
Datadog.configure do |config|
  config.diagnostics.startup_logs.enabled = true
  config.diagnostics.debug = true
  config.remote.enabled = true
  config.open_feature.enabled = true
end
```

Busque mensajes sobre:
- Iniciando el trabajador de configuración remota
- Recibiendo la configuración de las Feature Flags
- Inicialización del componente OpenFeature

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config/
[2]: /es/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/feature_flags/guide/server_flag_evaluation_metrics/