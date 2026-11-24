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
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK del servidor
title: Feature Flags de Ruby
---
## Descripción general {#overview}

Esta página describe cómo instrumentar una aplicación Ruby con el SDK de Feature Flags de Datadog. El SDK de Ruby se integra con [OpenFeature][3], un estándar abierto para la gestión de flags de funcionalidades. En `datadog` 2.46.0 y versiones posteriores, carga la configuración de flags directamente desde la CDN gestionada por Datadog de forma predeterminada.

No se requiere un Datadog Agent para la entrega de configuración o la evaluación de flags local. Para mantener la entrega gestionada por el Agent, seleccione [Agent Remote Configuration](#agent-configuration-delivery).

<div class="alert alert-warning">Los eventos de exposición a experimentos y los eventos de evaluación de flags agregados del Event Platform Proxy (EVP) requieren un Datadog Agent compatible o un relé de telemetría local. Ruby no admite la entrega directa de eventos cuando un relé no está disponible. El <code>feature_flag.evaluations</code> la métrica requiere una ruta de exportación de OpenTelemetry configurada por separado. Consulte <a href="/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry">Enviar telemetría de flags de funcionalidades</a>.</div>

## Requisitos previos {#prerequisites}

Para la configuración sin agente predeterminada, necesita:

- **SDK de Ruby de Datadog** `datadog` versión **2.46.0 o posterior**
- **Entorno de ejecución de Ruby** versión 3.1 o posterior para utilizar la integración completa de Datadog Feature Flags con OpenFeature
- **SDK de OpenFeature para Ruby** `openfeature-sdk` versión 0.5.1 o posterior para soporte de hooks de proveedor, registro de exposición y métricas de evaluación de Feature Flags
- **[Clave de API][4] y sitio de Datadog**: la clave de API y el sitio de Datadog que aloja su organización
- **Servicio y entorno configurados** - Las Feature Flags se aplican por servicio y entorno
- **Sistema operativo compatible** - El soporte para producción está limitado a [sistemas operativos Linux][2]. macOS y Windows no son objetivos de producción compatibles de forma nativa, pero los entornos de Linux en contenedores Docker que se ejecutan en esos sistemas operativos sí lo son. Para el desarrollo local en macOS, puede utilizar un artefacto nativo precompilado compatible cuando esté disponible.

<div class="alert alert-info">El tracer de Ruby de Datadog admite runtimes de Ruby más antiguos para APM. Las aplicaciones en versiones de Ruby más antiguas, incluida Ruby 2.5, pueden seguir utilizando Datadog APM, pero no pueden utilizar las Feature Flags de Datadog a través de OpenFeature hasta que se actualicen a Ruby 3.1 o posterior. Las versiones del SDK de OpenFeature para Ruby que exponen la superficie de hooks de proveedor necesaria para la telemetría completa de Feature Flags requieren Ruby 3.1 o posterior.</div>

## Instalación e inicialización {#installing-and-initializing}

Agregue el tracer de Datadog y el SDK de OpenFeature al `Gemfile` de la aplicación, luego ejecute `bundle install`:

```ruby
gem 'datadog', '~> 2.46'
gem 'openfeature-sdk', '>= 0.5.1'
```

### Configuración Agentless {#agentless-configuration}

Establezca estas variables de entorno en el proceso de la aplicación antes del inicio:

```bash
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

No se requiere la habilitación de Feature Flags ni la configuración de la fuente para una nueva instalación. Registre el proveedor de Datadog con OpenFeature para comenzar el sondeo. Instalar el tracer o construir `Datadog::OpenFeature::Provider.new` por sí solo no inicia las solicitudes de configuración Agentless.

### Inicialice el proveedor {#initialize-the-provider}

Inicialice el proveedor durante el inicio de la aplicación:

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |config|
  # Optional: set the first-configuration wait in milliseconds (default: 30000).
  config.feature_flags.initialization_timeout_ms = 30_000
end

begin
  OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
rescue OpenFeature::SDK::ProviderInitializationError => e
  warn "Feature Flags initialization failed: #{e.message}"
end

client = OpenFeature::SDK.build_client
```

`set_provider_and_wait` se bloquea hasta que el proveedor recibe su primera configuración válida o la inicialización falla. El tiempo de espera de inicialización predeterminado es de 30 segundos. Configúrelo con `config.feature_flags.initialization_timeout_ms` o `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`. El método de OpenFeature no acepta un argumento `timeout:`.

El ejemplo captura `ProviderInitializationError` para que la aplicación pueda continuar con los valores predeterminados proporcionados por el llamador. Si un error temporal de entrega provoca que la inicialización exceda el tiempo de espera, el sondeo continúa y el proveedor puede recuperarse cuando llegue una configuración válida. Para una inicialización no bloqueante, utilice `OpenFeature::SDK.set_provider` en su lugar. Las evaluaciones devuelven valores predeterminados hasta que la configuración esté disponible.

El SDK realiza sondeos cada 30 segundos y utiliza un tiempo de espera de solicitud de 5 segundos de forma predeterminada. Después de recibir una configuración válida, retiene dicha configuración durante errores temporales de entrega. Consulte [Configuration Sources][6] para conocer la configuración de sondeo y de punto de conexión personalizado. Ruby acepta intervalos de sondeo enteros positivos sin un límite superior; los tiempos de espera de solicitud deben estar entre 1 y 300 segundos.

### Entrega de configuración del Agent {#agent-configuration-delivery}

Para la entrega de flags gestionada por el Agent, utilice Datadog Agent 7.55 o posterior con [Remote Configuration][1] habilitado y una clave de API configurada en el Agent. Con `datadog` 2.46.0 o posterior, seleccione la fuente explícitamente:

```bash
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

Utilice el código de inicialización del proveedor de la sección [Inicializar el proveedor](#initialize-the-provider). Seleccionar `remote_config` habilita la suscripción a Feature Flags cuando el tracer se inicia, incluso antes de que la aplicación registre un proveedor. La clave de API para la entrega de configuración pertenece al Agent.

Las versiones anteriores de `datadog`, a partir de la 2.24.0, utilizan `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` o `config.open_feature.enabled = true` para Agent Remote Configuration.

### Migrar una configuración existente {#migrate-an-existing-setup}

En la versión 2.46.0 y posteriores, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` y `config.open_feature.enabled` están obsoletos. Si no se selecciona ninguna fuente explícita, un valor heredado de `true` preserva la Remote Configuration, y `false` deshabilita Feature Flags.

Para migrar a la entrega sin Agent, establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`, configure las credenciales de la aplicación anteriormente mencionadas y elimine la configuración heredada tanto del entorno como de la configuración de Ruby. Para mantener la entrega mediante Agent, establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` antes de eliminar la configuración heredada. Consulte [Migre una configuración de Remote Configuration existente][7].

`DD_FEATURE_FLAGS_ENABLED=false` desactiva los Feature Flags y ambas rutas de entrega de configuración, independientemente de la fuente seleccionada. Úselo en lugar de la configuración heredada para desactivar los Feature Flags.

### Métricas de evaluación de Feature Flags {#flag-evaluation-metrics}

Las métricas de evaluación de flags utilizan una canalización de OpenTelemetry independiente. Agregue las gemas de métricas al paquete de la aplicación:

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

Establezca `DD_METRICS_OTEL_ENABLED=true` y configure el exportador como se describe en [Configurar métricas de evaluación de flags del lado del servidor][5]. Habilitar la configuración Agentless no configura la exportación de métricas.

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

## Controle la telemetría de evaluación de flags y la participación en experimentos {#control-flag-evaluation-telemetry-and-experiment-participation}

La exclusión de telemetría requiere `datadog` versión `2.47.0` o posterior. La exclusión de Experimentation requiere `datadog` versión `2.49.0` o posterior. El ejemplo combinado requiere `2.49.0` o posterior. Ambos controles son independientes y están desactivados de forma predeterminada. Consulte [Exclusión de la evaluación de flags y de Experimentation][14] para conocer el comportamiento compartido.

Establezca estas variables antes de construir el proveedor:

```bash
export DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
export DD_FEATURE_FLAGS_EXPERIMENTATION_OPT_OUT_MODE=immediate
```

Inicialice el proveedor durante el inicio. Pase las preferencias del sujeto con cada evaluación:

```ruby
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
client = OpenFeature::SDK.build_client

context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  dd_evaluation_telemetry_opt_out: true,
  dd_experimentation_opt_out_at: '2026-10-30T12:00:00Z'
)
enabled = client.fetch_boolean_value(
  flag_key: 'new-checkout',
  default_value: false,
  evaluation_context: context
)
```

Reemplace la marca de tiempo del ejemplo con la preferencia almacenada del sujeto.

Las opciones de proveedor equivalentes son `enable_evaluation_telemetry_opt_out_parameter: true` y `experimentation_opt_out_mode: :immediate`. Las opciones explícitas del proveedor anulan la configuración de implementación. Use `:disabled` para anular una política de implementación habilitada o bien omita la opción para usar la configuración de implementación.

Use `future_experiments_only` o `experimentation_opt_out_mode: :future_experiments_only` para retener las asignaciones activadas estrictamente antes de la marca de tiempo. Ambos modos habilitados rechazan las marcas de tiempo del sujeto con formato incorrecto con `INVALID_CONTEXT` y devuelven el valor predeterminado de la aplicación. El modo de solo experimentos futuros verifica la activación de la asignación, no la inscripción previa.

La exclusión voluntaria de telemetría suprime cada uno de estos elementos que la aplicación habilita: nuevos eventos de evaluación, métricas de evaluación y anotaciones automáticas de tramos de flags. Las exposiciones permanecen habilitadas para las asignaciones elegibles. Proporcione un contexto separado para cada solicitud. Para reanudar la telemetría, proporcione el valor booleano `false` o elimine el atributo. Para permitir la experimentación de nuevo, elimine la marca de tiempo. Consulte [Configurar los SDK de servidor][15] para saber cómo se aplican los valores de contexto heredados.

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

Para datos estructurados, use `fetch_object_value()`. Este método devuelve un hash. Use flags de objeto cuando varias propiedades de configuración pertenezcan juntas.

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

## Registre las exposiciones en su propio almacén de datos {#record-exposures-in-your-own-data-store}

Use `Datadog::OpenFeature::ExposureHook` para registrar las exposiciones en sus propios registros, almacén de datos o canalización de análisis. Llama a su código después de cada evaluación de flag con la misma decisión de exposición que el proveedor utiliza para Datadog. Para dejar de enviar exposiciones a Datadog, establezca `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. Consulte [Registrar exposiciones de Feature Flag en su propio almacén de datos][12] para conocer los requisitos mínimos del SDK y otros detalles.

## Eventos de evaluación y privacidad {#evaluation-events-and-privacy}

Use `datadog` 2.46.0 o posterior para el hashing de la clave de segmentación y la recopilación de contexto controlada por el entorno en los eventos de evaluación de flags EVP. Estos eventos están habilitados de forma predeterminada. Establezca `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` para deshabilitar solo esta ruta de evento. Consulte [Eventos de evaluación del lado del servidor y privacidad][13] para conocer los datos recopilados, el contexto de exclusión y los requisitos de entrega.

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

## Utilice el SDK de Java en JRuby {#use-the-java-sdk-on-jruby}

El SDK de Ruby no admite Feature Flags en JRuby. En JRuby, el SDK de Ruby escribe una advertencia en el registro y no habilita las Feature Flags. Utilice el [SDK de Java][8] en su lugar. JRuby llama al SDK de Java a través de su integración con Java.

Utilice las versiones en los [requisitos de compatibilidad del SDK de Java][9].

1. Obtenga el archivo `dd-openfeature` JAR, el archivo JAR del SDK de Java de OpenFeature y sus dependencias. Por ejemplo, utilice Maven para copiarlos a un directorio.
2. Cargue los archivos JAR en su aplicación con `require`.
3. Establezca las variables de entorno para su fuente de configuración. Consulte [Fuentes de configuración del SDK de servidor][6].
4. Inicie JRuby con `dd-java-agent`. Utilice la opción `-J` para enviar la opción `-javaagent` a la JVM.

```shell
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
# Use Agent Remote Configuration. Agentless delivery is the default.
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config

jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'datadog.trace.api.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

Los archivos JAR por sí solos no habilitan la entrega de flags. El proveedor de Datadog utiliza clases de `dd-java-agent`. Si la JVM no carga `dd-java-agent`, el proveedor no se inicializa. Las evaluaciones de flags devuelven entonces los valores predeterminados.

Para eventos del proveedor, manejo de errores y los métodos de evaluación, consulte la página del [SDK de Java][8]. JRuby utiliza las mismas clases y métodos.

## Solución de problemas {#troubleshooting}

Si la aplicación se ejecuta en JRuby, utilice el SDK de Java. Consulte [Use el SDK de Java en JRuby][10].

### La configuración agentless no funciona {#agentless-configuration-not-working}

- Verifique que `datadog` 2.46.0 o posterior esté instalado y que la aplicación registre el proveedor OpenFeature de Datadog.
- Verifique `DD_API_KEY`, `DD_SITE`, `DD_SERVICE` y `DD_ENV` en el proceso de la aplicación.
- Confirme que `DD_FEATURE_FLAGS_ENABLED` no sea `false`.
- Deje `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` sin configurar para una nueva instalación, o establézcalo en `agentless`. Elimine la configuración de habilitación heredada al migrar.
- Permita el tráfico HTTPS saliente hacia `ufc-server.ff-cdn.<DD_SITE>`.
- Habilite `DD_TRACE_DEBUG=true` y revise los registros del tracer en busca de errores de autenticación, tiempo de espera o configuración.

Antes de la primera configuración válida, las evaluaciones devuelven los valores predeterminados proporcionados por el llamador. Después de una inicialización exitosa, los fallos de entrega temporales conservan la última configuración válida.

### Problemas de conexión de Remote Configuration {#remote-configuration-connection-issues}

- En `datadog` 2.46.0 o posterior, confirme que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` esté establecido en `remote_config`.
- Verifique que Remote Configuration esté habilitado en el Agent y en el tracer de Ruby.
- Verifique que el Datadog Agent estuviera disponible cuando se inició la aplicación. Si los problemas continúan después de que el Agent esté disponible, reinicie la aplicación. Consulte [Disponibilidad del Agent][11].
- Verifique la clave de API en el Agent y `DD_SERVICE` y `DD_ENV` en la aplicación.
- Confirme que la aplicación pueda comunicarse con el Agent. Habilite `DD_TRACE_DEBUG=true` y revise los registros del tracer en busca de errores de Remote Configuration.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config/
[2]: /es/tracing/trace_collection/compatibility/ruby/#supported-operating-systems
[3]: https://openfeature.dev/
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[6]: /es/feature_flags/concepts/configuration_sources/
[7]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /es/feature_flags/server/java/
[9]: /es/feature_flags/server/java/#compatibility-requirements
[10]: #use-the-java-sdk-on-jruby
[11]: /es/feature_flags/concepts/configuration_sources/#agent-availability
[12]: /es/feature_flags/guide/record_exposures_in_your_own_data_store/
[13]: /es/feature_flags/guide/server_evaluation_events/
[14]: /es/feature_flags/concepts/opt_out/
[15]: /es/feature_flags/concepts/opt_out/#configure-server-sdks