---
description: Configure los Feature Flags de Datadog para aplicaciones de Ruby.
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

El SDK de Ruby de Datadog recibe la configuración de flags directamente de Datadog de forma predeterminada y evalúa los flags localmente. Se integra con [OpenFeature][3], un estándar abierto para la gestión de flags.

## Primeros pasos {#getting-started}

Utilice Ruby 3.1 o posterior con `datadog` 2.49.0 o posterior y `openfeature-sdk` 0.5.1 o posterior. La gema `datadog` incluye la extensión nativa necesaria para la evaluación de flags. El soporte para producción está limitado a [sistemas operativos Linux compatibles][2]. Para JRuby, utilice el [SDK de Java](#use-the-java-sdk-on-jruby).

1. Agregue estas dependencias a su `Gemfile`, luego ejecute `bundle install`:

   ```ruby
   gem 'datadog', '~> 2.49'
   gem 'openfeature-sdk', '>= 0.5.1'
   ```

2. Configure su [clave de API][4] de Datadog y el entorno de flags en el proceso de la aplicación:

   ```bash
   export DD_API_KEY='<DATADOG_API_KEY>'
   export DD_ENV='<YOUR_ENVIRONMENT>'
   ```

   Si su organización utiliza un sitio distinto a `datadoghq.com`, configure `DD_SITE`:

   ```bash
   export DD_SITE={{< region-param key="dd_site" code="true" >}}
   ```

3. Enable a Boolean flag named `my-flag` for your environment with the **Server** distribution channel. Register the provider and evaluate the flag:

   ```ruby
   require 'datadog'
   require 'open_feature/sdk'
   require 'datadog/open_feature/provider'

   OpenFeature::SDK.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
   client = OpenFeature::SDK.build_client
   enabled = client.fetch_boolean_value(flag_key: 'my-flag', default_value: false)
   ```

No se requiere el Datadog Agent, instrumentación de APM, configuración de habilitación ni configuración de fuente. El registro del proveedor inicia la entrega de la configuración. La instalación de la gema o la construcción del proveedor por sí solas no inician el sondeo.

Para instalaciones existentes que utilizan la entrega mediante el Agent, siga [Migrar una configuración existente](#migrate-an-existing-setup) antes de utilizar estas instrucciones.

## Inicialice el proveedor {#initialize-the-provider}

`set_provider_and_wait` espera la primera configuración válida. El tiempo de espera de inicialización predeterminado es de 30 segundos. Si la inicialización falla, el método genera `OpenFeature::SDK::ProviderInitializationError`.

Maneje esa excepción si la aplicación debe iniciarse con los valores predeterminados proporcionados por el llamador. El sondeo continúa después de un fallo temporal de entrega, y el proveedor puede recuperarse cuando llega una configuración válida. Para la inicialización no bloqueante, use `OpenFeature::SDK.set_provider`. Las evaluaciones devuelven valores predeterminados hasta que la configuración esté disponible.

Para cambiar el tiempo de espera de inicialización, use `config.feature_flags.initialization_timeout_ms` o `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`. El método OpenFeature no acepta un argumento `timeout:`.

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

## Controlar la telemetría de evaluación de flags y la participación en experimentos {#control-flag-evaluation-telemetry-and-experiment-participation}

La exclusión voluntaria de la telemetría requiere `datadog` en la versión `2.47.0` o posterior. La exclusión voluntaria de Experimentation requiere `datadog` en la versión `2.49.0` o posterior. El ejemplo combinado requiere `2.49.0` o posterior. Ambos controles son independientes y están deshabilitados de forma predeterminada. Consulte [Flag Evaluation and Experimentation Opt-Out][15] para conocer el comportamiento compartido.

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

Las opciones de proveedor equivalentes son `enable_evaluation_telemetry_opt_out_parameter: true` y `experimentation_opt_out_mode: :immediate`. Las opciones de proveedor explícitas anulan la configuración de implementación. Use `:disabled` para anular una política de implementación habilitada, o bien omita la opción para usar la configuración de implementación.

Use `future_experiments_only` o `experimentation_opt_out_mode: :future_experiments_only` para retener las asignaciones activadas estrictamente antes de la marca de tiempo. Ambos modos habilitados rechazan las marcas de tiempo de sujeto mal formadas con `INVALID_CONTEXT` y devuelven el valor predeterminado de la aplicación. El modo de solo experimentos futuros verifica la activación de la asignación, no la inscripción previa.

La exclusión voluntaria de telemetría suprime cada uno de estos elementos que la aplicación habilita: nuevos eventos de evaluación, métricas de evaluación y anotaciones automáticas de tramos de flags. Las exposiciones permanecen habilitadas para las asignaciones elegibles. Proporcione un contexto separado para cada solicitud. Para reanudar la telemetría, proporcione el valor booleano `false` o elimine el atributo. Para permitir la experimentación nuevamente, elimine la marca de tiempo. Consulte [Configure server SDKs][16] para saber cómo se aplican los valores de contexto heredados.

## Evalúe marcadores {#evaluate-flags}

Después de crear el cliente `OpenFeature`, puede comenzar a leer los valores de los Feature Flags en toda su aplicación. La evaluación de Feature Flags utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar Feature Flags.

Cada Feature Flag se identifica mediante una _clave_ de cadena única. Los Feature Flags se evalúan utilizando métodos tipados que devuelven valores que coinciden con el tipo esperado. El SDK devuelve el valor predeterminado si un Feature Flag no existe o no se puede evaluar.

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

Use `Datadog::OpenFeature::ExposureHook` para registrar las exposiciones en sus propios registros, almacén de datos o canalización de análisis. Llama a su código después de cada evaluación de flag con la misma decisión de exposición que el proveedor utiliza para Datadog. Para dejar de enviar exposiciones a Datadog, establezca `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. Consulte [Record Feature Flag Exposures in Your Own Data Store][13] para conocer los requisitos mínimos del SDK y otros detalles.

## Configuración avanzada {#advanced-configuration}

`DD_SERVICE` y `DD_VERSION` agregan información sobre la versión del servicio y de la aplicación. Son opcionales para recibir la configuración de flags. El entorno selecciona la configuración de flags.

El SDK realiza sondeos cada 30 segundos y utiliza un tiempo de espera de solicitud de 5 segundos de forma predeterminada. Después de recibir una configuración válida, retiene dicha configuración durante errores temporales de entrega. Consulte [Configuration Sources][6] para conocer la configuración de sondeo y del punto de conexión personalizado.

### Enviar exposiciones y eventos de evaluación {#send-exposures-and-evaluation-events}

Con la entrega sin agente, Ruby prefiere un relé de Event Platform Proxy (EVP) local compatible para las exposiciones de experimentos y los eventos de evaluación de flags agregados. Si no hay un relé compatible disponible, envía ambos tipos de eventos directamente a Datadog. La entrega directa utiliza la configuración de `DD_API_KEY` y `DD_SITE` de la aplicación.

Para ver las opciones de telemetría sin servidor, consulte [Enviar telemetría de Feature Flags][12]. Las métricas de evaluación de flags utilizan una ruta de exportación de OpenTelemetry independiente.

### Entrega mediante Agent {#agent-delivery}

Para recibir la configuración de flags a través de un Agent, seleccione Remote Configuration explícitamente:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
export DD_REMOTE_CONFIGURATION_ENABLED=true
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Utilice Datadog Agent versión 7.55 o posterior con [Remote Configuration][1] habilitada. Configure la clave de API en el Agent. Registre el proveedor con el mismo código de aplicación de [Primeros pasos](#getting-started).

Seleccionar `remote_config` habilita la suscripción a Feature Flags cuando se inicia el SDK de Datadog, incluso antes del registro del proveedor. Esta fuente utiliza el Agent para la configuración y la entrega de eventos.

### Migrar una configuración existente {#migrate-an-existing-setup}

El valor heredado `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` o `config.open_feature.enabled = true` conserva Remote Configuration cuando no se selecciona explícitamente ninguna fuente. Un valor heredado de `false` deshabilita Feature Flags.

Para migrar a la entrega sin agente:

1. Actualice a `datadog` 2.49.0 o posterior.
2. Establezca `DD_API_KEY` en el proceso de la aplicación y conserve el entorno de flags en `DD_ENV`.
3. Si su organización utiliza un sitio distinto a `datadoghq.com`, establezca `DD_SITE`.
4. Establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`.
5. Elimine `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` y cualquier asignación de `config.open_feature.enabled`.
6. Reinicie la aplicación y verifique una flag conocida después de la inicialización del proveedor.

Para mantener la entrega mediante Agent, establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` antes de eliminar la configuración heredada. Para deshabilitar Feature Flags, utilice `DD_FEATURE_FLAGS_ENABLED=false`.

Consulte [Migrar una configuración existente de Remote Configuration][7] para conocer los pasos de verificación y reversión.

### Métricas de evaluación de flags {#flag-evaluation-metrics}

Las métricas de evaluación de flags utilizan una canalización de OpenTelemetry independiente. Agregue las gemas de métricas al paquete de la aplicación:

```ruby
gem 'opentelemetry-metrics-sdk', '>= 0.8.0'
gem 'opentelemetry-exporter-otlp-metrics', '>= 0.4.0'
```

Establezca `DD_METRICS_OTEL_ENABLED=true` y configure el exportador como se describe en [Configurar métricas de evaluación de flags del lado del servidor][5]. Habilitar la entrega sin agente no configura la exportación de métricas.

## Eventos de evaluación y privacidad {#evaluation-events-and-privacy}

Utilice `datadog` 2.46.0 o posterior para el hashing de la clave de segmentación y la recopilación de contexto controlada por el entorno en los eventos de evaluación de flags de EVP. Estos eventos están habilitados de forma predeterminada. Establezca `DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` para deshabilitar solo esta ruta de eventos. Consulte [Server-Side Evaluation Events and Privacy][14] para conocer los datos recopilados, el contexto de la exclusión y los requisitos de entrega.

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba dedicado de Datadog con el `Datadog::OpenFeature::Provider` real, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de los marcadores directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se incluye con `openfeature-sdk`, por lo que no se requiere ninguna gema adicional.

El `InMemoryProvider` del SDK de Ruby toma un hash simple de claves de Feature Flags a valores; las variantes y las reglas de segmentación no son compatibles. El proveedor de OpenFeature se establece en un singleton global del proceso, por lo que las pruebas que intercambian el proveedor deben restaurarlo en el desmontaje (teardown) para evitar la fuga del estado de los Feature Flags entre ejemplos. Un hook `around` maneja la configuración, la restauración y las excepciones de forma limpia en un solo bloque.

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

Para modificar el estado de los Feature Flags durante una prueba, llame a `add_flag(flag_key:, value:)` en la instancia del proveedor. El mismo patrón se aplica a Minitest: reemplace el hook `around` con los métodos `setup`/`teardown`.

## Utilice el SDK de Java en JRuby {#use-the-java-sdk-on-jruby}

El SDK de Ruby no admite Feature Flags en JRuby. En JRuby, el SDK de Ruby escribe una advertencia en el registro y no habilita los Feature Flags. Utilice el [SDK de Java][8] en su lugar. JRuby llama al SDK de Java a través de su integración con Java.

Utilice `dd-openfeature` 1.69.0 o posterior y las dependencias enumeradas en [Requisitos de compatibilidad del SDK de Java][9]. La entrega Agentless independiente no requiere `dd-java-agent`.

1. Obtenga el archivo JAR `dd-openfeature` y sus dependencias. Por ejemplo, utilice Maven para copiarlos a un directorio.
2. Establezca la clave de API y el entorno de los flags antes de iniciar JRuby. Si su organización utiliza un sitio distinto a `datadoghq.com`, establezca `DD_SITE`.
3. Cargue los archivos JAR en su aplicación con `require` y registre el proveedor.

```shell
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'

jruby app.rb
```

```ruby
require 'java'

# Load the Datadog provider, the OpenFeature SDK, and their dependencies
Dir['/path/to/jars/*.jar'].each { |jar| require jar }

java_import 'dev.openfeature.sdk.OpenFeatureAPI'
java_import 'dev.openfeature.sdk.MutableContext'
java_import 'com.datadog.openfeature.Provider'

# Set the provider. Wait for the first flag configuration.
api = OpenFeatureAPI.getInstance
api.setProviderAndWait(Provider.new)
client = api.getClient('my-app')

context = MutableContext.new('user-123')
context.add('tier', 'premium')

enabled = client.getBooleanValue('checkout.new', false, context)
```

Para la entrega mediante el Agent, establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` y cargue un `dd-java-agent` compatible con la opción de JVM `-javaagent`. Por ejemplo, ejecute `jruby -J-javaagent:/path/to/dd-java-agent.jar app.rb`. Consulte la página de [configuración del SDK de Java][8] para conocer los requisitos del Agent.

Para eventos del proveedor, manejo de errores y los métodos de evaluación, consulte la página del [SDK de Java][8]. JRuby utiliza las mismas clases y métodos.

## Solución de problemas {#troubleshooting}

Si la aplicación se ejecuta en JRuby, utilice el SDK de Java. Consulte [Utilice el SDK de Java en JRuby][10].

### La entrega Agentless no funciona {#agentless-delivery-not-working}

- Verifique que `datadog` 2.49.0 o posterior esté instalado y que la aplicación registre el proveedor OpenFeature de Datadog.
- Verifique `DD_API_KEY` y `DD_ENV` en el proceso de la aplicación. Si su organización utiliza un sitio distinto a `datadoghq.com`, verifique `DD_SITE`.
- Confirme que `DD_FEATURE_FLAGS_ENABLED` no sea `false`.
- Deje `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` sin configurar para una nueva configuración, o establézcalo en `agentless`. Elimine la configuración de habilitación heredada al realizar la migración.
- Permita el tráfico HTTPS saliente hacia `ufc-server.ff-cdn.<DD_SITE>`.
- Habilite `DD_TRACE_DEBUG=true` y revise los registros del tracer en busca de errores de autenticación, tiempo de espera o configuración.

Antes de la primera configuración válida, las evaluaciones devuelven los valores predeterminados proporcionados por el llamador. Después de una inicialización correcta, los errores temporales de entrega conservan la última configuración válida.

### Problemas de conexión de Remote Configuration {#remote-configuration-connection-issues}

- Confirme que `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` esté establecido en `remote_config`.
- Verifique que Remote Configuration esté habilitada en el Agent y en el tracer de Ruby.
- Verifique que el Datadog Agent estuviera disponible cuando se inició la aplicación. Si los problemas continúan después de que el Agent esté disponible, reinicie la aplicación. Consulte [Disponibilidad del Agent][11].
- Verifique la clave de API en el Agent y `DD_ENV` en la aplicación.
- Confirme que la aplicación pueda comunicarse con el Agent. Habilite `DD_TRACE_DEBUG=true` y revise los registros del tracer para ver si hay errores de Remote Configuration.

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
[9]: /es/feature_flags/server/java/#getting-started
[10]: #use-the-java-sdk-on-jruby
[11]: /es/feature_flags/concepts/configuration_sources/#agent-availability
[12]: /es/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
[13]: /es/feature_flags/guide/record_exposures_in_your_own_data_store/
[14]: /es/feature_flags/guide/server_evaluation_events/
[15]: /es/feature_flags/concepts/opt_out/
[16]: /es/feature_flags/concepts/opt_out/#configure-server-sdks