---
description: Configure las Feature Flags de Datadog para aplicaciones Python.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/dd_libraries/python/
  tag: Documentación
  text: Traza de Python
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de Feature Flags del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de traza de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK del servidor
title: Feature Flags de Python
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación Python con el SDK de Feature Flags de Datadog. El SDK de Python se integra con [OpenFeature][1], un estándar abierto para la gestión de feature flags. A partir de la versión `ddtrace` 4.14.0, carga la configuración de Feature Flags directamente desde la CDN gestionada por Datadog de forma predeterminada.

Esta guía explica cómo instalar y habilitar el SDK, crear un cliente de OpenFeature y evaluar Feature Flags en su aplicación.

<div class="alert alert-warning">La entrega sin agente de Python solo cambia la fuente de configuración. Sin un Datadog Agent compatible o una ruta de telemetría sin servidor, el SDK no exporta métricas de evaluación ni eventos de exposición.</div>

## Requisitos previos {#prerequisites}

Antes de configurar el SDK de Feature Flags de Python, asegúrese de tener:

- **Datadog Python SDK** `ddtrace` versión 4.14.0 o posterior
- **OpenFeature Python SDK** `openfeature-sdk`: versión 0.5.0 o posterior (se requiere la versión 0.7.0 o posterior si utiliza controladores de eventos del proveedor para esperar la inicialización)
- Una [clave de API][3] de Datadog
- Su sitio de Datadog

Establezca las siguientes variables de entorno:

{{< code-block lang="bash" >}}
# Required: Agentless configuration delivery
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" code="true" >}}
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true

# Recommended: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
{{< /code-block >}}

No se requiere la habilitación de Feature Flags ni la configuración de la fuente. Registre el proveedor como se muestra en [Inicializar el SDK](#initialize-the-sdk) para comenzar el sondeo. Instalar o inicializar `ddtrace` por sí solo no crea tráfico de CDN de Feature Flags.

Para configurar `feature_flag.evaluations`, incluida la versión requerida de la traza y la configuración de OTLP del Agent, consulte [Set Up Server-Side Flag Evaluation Metrics][4]. Para obtener más información sobre los gráficos disponibles, consulte [Feature Flag Graphs][5].

## Instalación {#installation}

Instale el SDK de Datadog para Python y el SDK de OpenFeature:

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

O agréguelos a su `requirements.txt`:

{{< code-block lang="text" filename="requirements.txt" >}}
ddtrace>=4.14.0
openfeature-sdk>=0.5.0
{{< /code-block >}}

Si habilita las métricas de evaluación de Feature Flags, también debe instalar el SDK de OpenTelemetry y el exportador OTLP:

{{< code-block lang="bash" >}}
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-grpc
{{< /code-block >}}

O agréguelos a su `requirements.txt`:

{{< code-block lang="text" filename="requirements.txt" >}}
opentelemetry-sdk>=1.41.0
opentelemetry-exporter-otlp-proto-grpc>=1.41.0
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

Registre el proveedor de Datadog OpenFeature con la API de OpenFeature. El proveedor inicia la fuente de configuración seleccionada y espera hasta 10 segundos para su primera configuración.

{{< code-block lang="python" >}}
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()

# Your application code here
{{< /code-block >}}

## Establecer el contexto de evaluación {#set-the-evaluation-context}

Defina un contexto de evaluación que identifique al usuario o entidad para la segmentación de Feature Flags. El contexto de evaluación incluye atributos utilizados para determinar qué variaciones de Feature Flags deben devolverse:

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se pierdan.</div>

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",  # Targeting key (typically user ID)
    attributes={
        "email": "user@example.com",
        "country": "US",
        "tier": "premium",
        "age": 25
    }
)
{{< /code-block >}}

La clave de segmentación se utiliza para una distribución de tráfico consistente (lanzamientos porcentuales). Los atributos adicionales permiten reglas de segmentación, como "habilitar para usuarios en EE. UU." o "habilitar para usuarios de nivel premium" en el ejemplo anterior.

## Evaluar Feature Flags {#evaluate-flags}

Después de configurar el proveedor y crear un cliente, puede evaluar Feature Flags en toda su aplicación. La evaluación de Feature Flags es local y rápida: el SDK utiliza datos de configuración almacenados en caché localmente, por lo que no se producen solicitudes de red durante la evaluación.

Cada Feature Flag se identifica mediante una clave (una cadena única) y se puede evaluar con un método tipado que devuelve un valor del tipo esperado. Si la Feature Flag no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

### Feature Flags booleanos {#boolean-flags}

Use `get_boolean_value` para Feature Flags que representan condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="python" >}}
enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

### Feature Flags de cadena {#string-flags}

Use `get_string_value` para Feature Flags que seleccionan entre múltiples variantes o cadenas de configuración:

{{< code-block lang="python" >}}
theme = client.get_string_value("ui-theme", "light", eval_ctx)

if theme == "dark":
    set_dark_theme()
elif theme == "light":
    set_light_theme()
else:
    set_light_theme()
{{< /code-block >}}

### Feature Flags numéricos {#numeric-flags}

Para Feature Flags numéricos, use `get_integer_value` o `get_float_value`. Estos son apropiados cuando una función depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="python" >}}
max_items = client.get_integer_value("cart-max-items", 20, eval_ctx)

discount_rate = client.get_float_value("discount-rate", 0.0, eval_ctx)
{{< /code-block >}}

### Feature Flags de objeto {#object-flags}

Para datos estructurados, use `get_object_value`. Esto devuelve un diccionario con configuración compleja:

{{< code-block lang="python" >}}
config = client.get_object_value("feature-config", {
    "maxRetries": 3,
    "timeout": 30
}, eval_ctx)

max_retries = config.get("maxRetries", 3)
timeout = config.get("timeout", 30)
{{< /code-block >}}

### Detalles de evaluación de Feature Flags {#flag-evaluation-details}

Cuando necesite más que solo el valor de una Feature Flag, utilice los métodos `*_details`. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="python" >}}
details = client.get_boolean_details("new-feature", False, eval_ctx)

print(f"Value: {details.value}")
print(f"Variant: {details.variant}")
print(f"Reason: {details.reason}")
print(f"Error Code: {details.error_code}")
print(f"Error Message: {details.error_message}")
{{< /code-block >}}

Los detalles de la bandera le ayudan a depurar el comportamiento de la evaluación y a entender por qué un usuario recibió un valor determinado.

### Evaluación sin contexto {#evaluation-without-context}

Puede evaluar Feature Flags sin proporcionar un contexto de evaluación. Esto es útil para Feature Flags globales que no requieren una segmentación específica del usuario:

{{< code-block lang="python" >}}
# Global feature flag - no context needed
maintenance_mode = client.get_boolean_value("maintenance-mode", False)

if maintenance_mode:
    return "Service temporarily unavailable"
{{< /code-block >}}

## Esperando la inicialización del proveedor {#waiting-for-provider-initialization}

El registro del proveedor espera hasta 10 segundos a que la fuente seleccionada entregue su primera configuración. Si llega la configuración, el proveedor emite `PROVIDER_READY`. Si se agota el tiempo de espera, el registro se completa con el proveedor en un estado de error, y las evaluaciones devuelven los valores predeterminados proporcionados por el llamador hasta que llegue la configuración. Utilice un controlador de eventos para esperar un evento de listo posterior:

{{< code-block lang="python" >}}
import threading
from openfeature import api
from openfeature.event import ProviderEvent
from ddtrace.openfeature import DataDogProvider

# Create an event to wait for readiness
ready_event = threading.Event()

def on_ready(event_details):
    ready_event.set()

# Register event handler
api.add_handler(ProviderEvent.PROVIDER_READY, on_ready)

# Set provider
provider = DataDogProvider()
api.set_provider(provider)

# Wait for the provider to be ready if registration timed out
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

<div class="alert alert-info">Los controladores de eventos del proveedor requieren OpenFeature SDK 0.7.0 o posterior. La mayoría de las aplicaciones pueden utilizar el tiempo de espera de inicialización predeterminado de 10 segundos y manejar los valores predeterminados proporcionados por el llamador si la configuración no está disponible.</div>

Establezca `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` en un número positivo de milisegundos para cambiar el tiempo de espera de inicialización.

## Configuración avanzada {#advanced-configuration}

Utilice [Server SDK Configuration Sources][6] como referencia canónica para la selección de fuentes y los ajustes operativos:

- [Configure la entrega sin agente][10], incluyendo el sondeo, el tiempo de espera de la solicitud y los ajustes del punto de conexión
- [Utilice un punto de conexión sin agente personalizado][7] para pruebas avanzadas, desarrollo local o un proxy gestionado por el operador
- [Utilice Remote Configuration del Agent][9] para conservar la entrega gestionada por el Agent
- [Migre una configuración de Remote Configuration existente][8] y elimine el ajuste `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` obsoleto

El modo sin agente solo cambia la configuración de los flags. No configura ni habilita `feature_flag.evaluations`, el registro de exposición ni los casos de uso de experimentación. Estas funciones requieren un Datadog Agent compatible o una ruta de telemetría sin servidor.

## Limpieza {#cleanup}

Cuando su aplicación finalice, apague la API de OpenFeature para limpiar los recursos:

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba de Datadog dedicado con el proveedor real de Datadog, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de las Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se incluye con `openfeature-sdk`, por lo que no se requiere ninguna dependencia adicional.

La API de OpenFeature es un singleton global (`openfeature.api.set_provider` muta el estado a nivel de módulo). Use un fixture de pytest con alcance de `function` y llame a `api.shutdown()` en el teardown para que el estado de las Feature Flags no se filtre entre las pruebas.

{{< code-block lang="python" filename="test_flags.py" >}}
import pytest
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
from openfeature.provider.in_memory_provider import InMemoryProvider, InMemoryFlag


@pytest.fixture
def client():
    flags = {
        "new-checkout-flow": InMemoryFlag(
            default_variant="off",
            variants={"on": True, "off": False},
        ),
        "ui-theme": InMemoryFlag(
            default_variant="light",
            variants={"light": "light", "dark": "dark"},
        ),
    }
    api.set_provider(InMemoryProvider(flags))
    yield api.get_client()
    api.shutdown()


def test_boolean_flag_returns_default_variant(client):
    assert client.get_boolean_value("new-checkout-flow", True) is False


def test_string_flag_with_context(client):
    ctx = EvaluationContext(targeting_key="user-123")
    assert client.get_string_value("ui-theme", "dark", ctx) == "light"


def test_missing_flag_returns_default(client):
    assert client.get_boolean_value("does-not-exist", True) is True
{{< /code-block >}}

`InMemoryFlag` toma `default_variant` (un nombre de variante de cadena) y `variants` (un diccionario que asigna nombres de variantes a valores tipados). Pasar un valor como `default_variant` en lugar de un nombre de variante es un error común. Para la lógica de segmentación, pase una devolución de llamada `context_evaluator` que reciba la Feature Flag y un `EvaluationContext` y devuelva un objeto `FlagResolutionDetails` que contenga la variante elegida.

## Solución de problemas {#troubleshooting}

### La configuración sin agente no funciona {#agentless-configuration-not-working}

Verifique lo siguiente:

- `ddtrace` es la versión 4.14.0 o posterior.
- `DD_FEATURE_FLAGS_ENABLED` no está configurado o está establecido en `true`.
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` no está configurado o está establecido en `agentless`.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` no está configurado. Establecerlo en `true` selecciona la Configuración Remota del Agente durante la ventana de migración cuando no se establece ninguna fuente explícita.
- El código de la aplicación registra `DataDogProvider` con la API de OpenFeature.
- `DD_API_KEY`, `DD_SITE` y `DD_ENV` están configurados en el proceso de la aplicación.
- La aplicación puede realizar solicitudes HTTPS salientes a Datadog.

Establezca `DD_TRACE_DEBUG=true` y verifique si hay mensajes de autenticación, tiempo de espera o carga útil mal formada desde el punto de conexión sin agente de Feature Flags.

### La Configuración Remota del Agente no funciona {#agent-remote-configuration-not-working}

Verifique lo siguiente:

- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` está configurado. Durante la ventana de migración, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` también selecciona Remote Configuration cuando no se establece ninguna fuente explícita.
- Datadog Agent es la versión 7.55 o posterior.
- [Remote Configuration][2] está habilitado en el Agent.
- El Agent tiene una clave de API válida para la organización de destino.
- `DD_SERVICE` y `DD_ENV` están configurados en el proceso de la aplicación.
- El SDK puede comunicarse con el Agent.

[1]: https://openfeature.dev/
[2]: /es/agent/remote_config/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /es/feature_flags/concepts/flag_graphs/
[6]: /es/feature_flags/concepts/configuration_sources/
[7]: /es/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /es/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[10]: /es/feature_flags/concepts/configuration_sources/#configure-agentless-delivery

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}