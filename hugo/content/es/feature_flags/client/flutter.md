---
description: Configure Datadog Feature Flags para aplicaciones Dart y Flutter.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /real_user_monitoring/application_monitoring/flutter/
  tag: Documentación
  text: Monitoreo de Flutter
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags
  tag: Código fuente
  text: código fuente de datadog_flags
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags_flutter
  tag: Código fuente
  text: código fuente de datadog_flags_flutter
title: Feature Flags para Dart y Flutter
---
## Descripción general {#overview}

Esta página describe cómo instrumentar aplicaciones Dart y Flutter con el SDK de Feature Flags de Datadog. Los Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación y experimentar de forma segura.

El SDK de Feature Flags de Datadog para Dart es un paquete nativo de Dart. Obtiene asignaciones precalculadas de Datadog, evalúa localmente los valores tipados de los Feature Flags, e informa la telemetría de evaluación de los Feature Flags a Datadog. Las aplicaciones Flutter pueden usar el paquete Dart independiente directamente o instalar `datadog_flags_flutter` para derivar la configuración de `datadog_flutter_plugin` y agregar evaluaciones exitosas a RUM.

<div class="alert alert-info">Este paquete proporciona una API compatible con OpenFeature para Dart y Flutter, pero no está construido sobre el SDK de OpenFeature para Dart. Utilice las API de esta página directamente. Datadog está desarrollando una integración basada en proveedores de OpenFeature para Dart y Flutter.</div>

## Instalación {#installation}

Para una aplicación Flutter que ya utiliza el SDK de Flutter de Datadog, instale `datadog_flags_flutter`:

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter
{{< /code-block >}}

`datadog_flags_flutter` depende de `datadog_flutter_plugin` 3.4.0 o posterior.

Para uso independiente en Dart, instale `datadog_flags`:

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="bash" >}}
dart pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter" %}}
{{< code-block lang="bash" >}}
flutter pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Luego importe la API pública:

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
{{< /code-block >}}
{{% /tab %}}

{{% tab "Integración con Flutter" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Configuración integrada con Flutter {#flutter-integrated-setup}

Utilice esta configuración cuando su aplicación Flutter ya inicialice `datadog_flutter_plugin`. Agregue `DatadogFlagsPluginConfiguration` a su `DatadogConfiguration` existente antes de inicializar el SDK de Datadog. El plugin deriva el token de cliente, el entorno, el sitio, el servicio, la versión y el ID de la aplicación RUM de la configuración del SDK de Flutter. Para crear un token de cliente, consulte [Client tokens][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Flutter Feature Flags no son compatibles con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
  service: '<SERVICE_NAME>',
  version: '<APP_VERSION>',
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  ),
)..addPlugin(
    const DatadogFlagsPluginConfiguration(
      flagsConfiguration: DatadogFlagsConfiguration(
        initializationTimeout: Duration(seconds: 2),
      ),
    ),
  );

await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
{{< /code-block >}}

Después de la inicialización, recupere un cliente de Feature Flags del plugin e inicialícelo con el contexto de evaluación para el sujeto actual:

{{< code-block lang="dart" >}}
final flags = DatadogSdk.instance.flags;
if (flags == null) {
  return;
}

final flagsClient = flags.sharedClient();
try {
  await flagsClient.initialize(
    const FlagsEvaluationContext(
      targetingKey: 'user-123',
      attributes: {
        'companyId': 'company-456',
        'plan': 'enterprise',
      },
    ),
  );
} on FlagsInitializationTimeoutException {
  // Continue startup with stored assignments or evaluation defaults.
}
{{< /code-block >}}

Las evaluaciones exitosas se envían a través de la canalización de telemetría de Datadog Feature Flags. Con la configuración integrada de Flutter, las evaluaciones exitosas que devuelven una variante también se agregan al visualizar RUM activo como evaluaciones de Feature Flags.

## Configuración independiente de Dart {#standalone-dart-setup}

Utilice esta configuración cuando no esté utilizando `datadog_flutter_plugin`, o cuando desee gestionar los Feature Flags independientemente de la inicialización del SDK de Flutter.

Habilite Datadog Feature Flags temprano en el inicio de su aplicación. Para la configuración en vivo de los Feature Flags, se requieren `clientToken`, `env` y `site`. Para crear un token de cliente, consulte [Client tokens][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Dart and Flutter Feature Flags no son compatibles con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
final datadogFlags = DatadogFlags.instance;

await datadogFlags.enable(
  configuration: DatadogFlagsConfiguration(
    initializationTimeout: const Duration(seconds: 2),
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
      applicationId: '<RUM_APPLICATION_ID>',
      service: '<SERVICE_NAME>',
      version: '<APP_VERSION>',
    ),
  ),
);
{{< /code-block >}}

`applicationId`, `service` y `version` son opcionales. Cuando están presentes, el SDK los incluye en el contexto de telemetría de los Feature Flags.

Utilice el valor `DatadogFlagsSite` que coincida con su organización de Datadog.

## Crear y recuperar un cliente {#create-and-retrieve-a-client}

Cree o recupere un cliente compartido una vez durante el inicio de la aplicación:

{{< code-block lang="dart" >}}
final flagsClient = DatadogFlags.instance.sharedClient();
{{< /code-block >}}

También puede crear múltiples clientes con nombre para contextos de evaluación independientes:

{{< code-block lang="dart" >}}
final orgFlags = DatadogFlags.instance.sharedClient(name: 'org');
final userFlags = DatadogFlags.instance.sharedClient(name: 'user');
{{< /code-block >}}

Los clientes son locales al aislamiento de Dart donde se crean. Los aislamientos en segundo plano no comparten el estado de `DatadogFlags` ni las cachés de asignación con el aislamiento principal. Si un aislamiento en segundo plano necesita evaluar Feature Flags, llame a `DatadogFlags.instance.enable()`, cree los clientes que necesite e inicialícelos de forma independiente.

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación del Feature Flag mediante `FlagsEvaluationContext`. El contexto de evaluación incluye información del usuario, la organización, la sesión o el dispositivo utilizada para determinar qué variaciones de los Feature Flags deben devolverse. Llame a `initialize()` antes de evaluar los Feature Flags para que el cliente pueda obtener las asignaciones para el contexto.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="dart" >}}
await flagsClient.initialize(
  const FlagsEvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
      'loggedIn': true,
    },
  ),
);
{{< /code-block >}}

El `targetingKey` es el sujeto de aleatorización para los despliegues porcentuales. Los usuarios con la misma clave de segmentación siempre reciben la misma variante para un Feature Flag dado.

`targetingKey` es opcional. Si inicializa un contexto antes de que se conozca un ID de usuario u organización, el SDK envía una cadena vacía para la solicitud de asignación de precomputación.

Utilice clientes con nombre independientes para sujetos de evaluación separados, como usuarios que han cerrado sesión y usuarios que han iniciado sesión, o segmentación a nivel de organización y a nivel de usuario:

{{< code-block lang="dart" >}}
await orgFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'org-123'),
);

await userFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'user-456'),
);
{{< /code-block >}}

## Evalúe marcadores {#evaluate-flags}

Después de inicializar un cliente, puede leer los valores de los Feature Flags en toda su aplicación. La evaluación de Feature Flags es _local e instantánea_ porque el SDK utiliza datos de asignación almacenados en caché localmente. No se produce ninguna solicitud de red durante una evaluación tipada.

Cada método de evaluación requiere un valor predeterminado proporcionado por el llamador. Los métodos de evaluación no generan errores por la preparación del proveedor, por la ausencia de Feature Flags o discrepancias de tipo. Devuelven un valor `FlagDetails<T>` con el valor evaluado, los metadatos de asignación y un error programático cuando el SDK devuelve el valor predeterminado.

### Marcadores booleanos {#boolean-flags}

Utilice `getBooleanDetails()` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="dart" >}}
final details = flagsClient.getBooleanDetails(
  key: 'checkout.enabled',
  defaultValue: false,
);

if (details.error == null && details.value) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### Marcadores de cadena {#string-flags}

Utilice `getStringDetails()` para Feature Flags que seleccionen entre múltiples variantes o cadenas de configuración:

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'ui.theme',
  defaultValue: 'light',
);

if (details.value == 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}
{{< /code-block >}}

### Marcadores de tipo entero y doble{#integer-and-double-flags}

Utilice `getIntegerDetails()` o `getDoubleDetails()` para Feature Flags numéricos, como límites, porcentajes o multiplicadores:

{{< code-block lang="dart" >}}
final maxItems = flagsClient.getIntegerDetails(
  key: 'cart.items.max',
  defaultValue: 20,
);

final priceMultiplier = flagsClient.getDoubleDetails(
  key: 'pricing.multiplier',
  defaultValue: 1.0,
);
{{< /code-block >}}

### Marcadores de objeto {#object-flags}

Utilice `getObjectDetails()` para una configuración estructurada compatible con JSON:

{{< code-block lang="dart" >}}
final config = flagsClient.getObjectDetails(
  key: 'ui.config',
  defaultValue: const {
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Utilice las API de detalles cuando necesite el valor evaluado, la variante, el motivo o el error de evaluación:

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'checkout.copy',
  defaultValue: 'Continue',
);

print(details.value);
print(details.variant);
print(details.reason);
print(details.error?.code);
{{< /code-block >}}

`FlagDetails.error` se establece cuando el SDK devuelve el valor predeterminado porque el proveedor no está listo, el Feature Flag no se encuentra o el valor de asignación no coincide con el método de evaluación tipado. Los detalles exitosos incluyen el valor evaluado más los metadatos de asignación, como `variant` y `reason`, cuando Datadog los devolvió.

## Configuración avanzada {#advanced-configuration}

`DatadogFlagsConfiguration` controla el comportamiento del SDK:

{{< code-block lang="dart" >}}
DatadogFlagsConfiguration(
  datadogConfig: datadogConfig,
  initializationTimeout: const Duration(seconds: 2),
  trackExposures: true,
  trackEvaluations: true,
  evaluationFlushInterval: const Duration(seconds: 10),
  store: myStore,
);
{{< /code-block >}}

`trackExposures`
: Cuando `true` (predeterminado), el SDK registra eventos de exposición para evaluaciones exitosas cuyas asignaciones están marcadas para registro. Establezca en `false` para deshabilitar el seguimiento de exposición.

`trackEvaluations`
: Cuando `true` (predeterminado), el SDK registra la telemetría de evaluación de Feature Flags agregada. Establezca en `false` para deshabilitar el seguimiento de evaluación.

`initializationTimeout`
: Tiempo máximo de espera para que el primer contexto de evaluación esté listo. El tiempo de espera utiliza un presupuesto de reloj de pared para la operación de inicialización completa. Cubre la carga de asignaciones almacenadas, la codificación de la solicitud, la obtención de asignaciones, la lectura del cuerpo de la respuesta, la decodificación de JSON, la publicación de asignaciones y el almacenamiento de asignaciones. No cambia el tiempo de espera del cliente HTTP.

  <br>El tiempo de espera se aplica solo a la primera llamada `initialize()` para cada cliente. La primera llamada consume el tiempo de espera incluso si la operación falla o es reemplazada. Las llamadas posteriores no tienen temporizador de inicialización. El valor predeterminado es 5 segundos. Establezca el valor en `null`, cero o una duración negativa para desactivar el tiempo de espera.

  Cuando el tiempo de espera expira, `initialize()` lanza `FlagsInitializationTimeoutException`. La operación de asignación continúa y puede publicar un resultado exitoso tardío. Las asignaciones almacenadas coincidentes permanecen disponibles. Las evaluaciones sin asignaciones devuelven el valor predeterminado proporcionado por el llamador con `FlagEvaluationError.providerNotReady`.

  Dart ejecuta el temporizador de tiempo de espera en el mismo aislado que el trabajo de inicialización sincrónica. Por lo tanto, el trabajo sincrónico puede hacer que la espera observada sea más larga que el tiempo de espera configurado.

  <div class="alert alert-info"><code>initializationTimeout</code> está disponible en <code>datadog_flags</code> y <code>datadog_flags_flutter</code> 1.1.0 y versiones posteriores.</div>

`evaluationFlushInterval`
: El intervalo en el que se envía la telemetría de evaluación de Feature Flags agregada a Datadog. Los valores aceptados están entre 1 y 60 segundos. El valor predeterminado es 10 segundos.

`store`
: Almacenamiento opcional de la última asignación conocida. El SDK puede usar asignaciones almacenadas coincidentes mientras una solicitud de red nueva está en curso o no está disponible.

`httpClient`, `customFlagsEndpoint`, `customExposureEndpoint`, y `customEvaluationEndpoint`
: Anulaciones avanzadas para pruebas, proxies o enrutamiento personalizado.

  <br>Si se llama a `enable()` sin un `datadogConfig`, el SDK no crea un proveedor activo. Las evaluaciones devuelven el valor predeterminado proporcionado por el llamador con `FlagEvaluationError.providerNotReady`.

  Para una configuración integrada con Flutter, pase estas opciones a través de `DatadogFlagsPluginConfiguration`:

  {{< code-block lang="dart" >}}
  final configuration = DatadogConfiguration(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
    rumConfiguration: DatadogRumConfiguration(
      applicationId: '<RUM_APPLICATION_ID>',
    ),
  )..addPlugin(
      const DatadogFlagsPluginConfiguration(
        flagsConfiguration: DatadogFlagsConfiguration(
          initializationTimeout: Duration(seconds: 2),
          trackExposures: true,
          trackEvaluations: true,
        ),
        rumIntegrationEnabled: true,
      ),
    );
  {{< /code-block >}}

`rumIntegrationEnabled`
: Cuando `true` (predeterminado), las evaluaciones exitosas que devuelven una variante se agregan al visualizar RUM activo como evaluaciones de Feature Flags. Si su aplicación no utiliza RUM, esta opción no tiene efecto.

## Almacenamiento de la última asignación conocida {#last-known-assignment-storage}

El SDK mantiene las asignaciones en memoria después de que `initialize()` tenga éxito. Para restaurar las últimas asignaciones conocidas entre instancias del SDK, proporcione un `DatadogFlagsStore`:

{{< code-block lang="dart" >}}
class MyFlagsStore implements DatadogFlagsStore {
  @override
  Future<FlagsData?> read(String clientName) async {
    // Read and decode persisted FlagsData for this client name.
    return null;
  }

  @override
  Future<void> write(String clientName, FlagsData data) async {
    // Encode and persist successful assignments for this client name.
  }

  @override
  Future<void> delete(String clientName) async {
    // Delete persisted assignments for this client name.
  }
}
{{< /code-block >}}

Las asignaciones almacenadas se utilizan solo cuando su contexto de evaluación coincide con el contexto activo. Una obtención exitosa en vivo siempre mueve al cliente al estado de asignación más reciente y escribe ese estado de nuevo en el almacenamiento.

El paquete Dart no elige una ubicación en disco ni incluye un almacenamiento en disco específico para Flutter. Las aplicaciones de Flutter pueden implementar `DatadogFlagsStore` con su mecanismo de almacenamiento de aplicaciones preferido.

## Apagado {#shutdown}

Llame a `shutdown()` cuando ya no necesite un cliente. Esto vacía las cargas pendientes de exposición y evaluación de flags antes de borrar las asignaciones en memoria del cliente.

{{< code-block lang="dart" >}}
await flagsClient.shutdown();
{{< /code-block >}}

Llame a `DatadogFlags.instance.disable()` cuando la aplicación esté cerrando el SDK de flags:

{{< code-block lang="dart" >}}
await DatadogFlags.instance.disable();
{{< /code-block >}}

## Ejemplo completo {#complete-example}

El siguiente ejemplo habilita el SDK, inicializa un cliente con un contexto de evaluación y evalúa un flag booleano:

{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';

Future<void> initializeFlags() async {
  final datadogFlags = DatadogFlags.instance;

  await datadogFlags.enable(
    configuration: DatadogFlagsConfiguration(
      initializationTimeout: const Duration(seconds: 2),
      datadogConfig: const DatadogFlagsConfig(
        clientToken: '<CLIENT_TOKEN>',
        env: '<ENV_NAME>',
        site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        applicationId: '<RUM_APPLICATION_ID>',
        service: '<SERVICE_NAME>',
        version: '<APP_VERSION>',
      ),
    ),
  );

  final flagsClient = datadogFlags.sharedClient();
  try {
    await flagsClient.initialize(
      const FlagsEvaluationContext(
        targetingKey: 'user-123',
        attributes: {
          'companyId': 'company-456',
          'plan': 'enterprise',
        },
      ),
    );
  } on FlagsInitializationTimeoutException {
    // Continue startup with stored assignments or evaluation defaults.
  }

  final details = flagsClient.getBooleanDetails(
    key: 'checkout.enabled',
    defaultValue: false,
  );

  if (details.error == null && details.value) {
    showNewCheckoutFlow();
  }
}
{{< /code-block >}}

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba dedicado de Datadog con el `DatadogFlagsClient` real, o aislar el código de la aplicación detrás de una interfaz pequeña y sustituir una implementación falsa en las pruebas unitarias. Esta sección muestra el enfoque simulado, que mantiene las pruebas autocontenidas y sin conexión.

{{< code-block lang="dart" >}}
abstract interface class CheckoutFlags {
  bool newCheckoutEnabled();
}

final class DatadogCheckoutFlags implements CheckoutFlags {
  final DatadogFlagsClient client;

  DatadogCheckoutFlags(this.client);

  @override
  bool newCheckoutEnabled() {
    return client
        .getBooleanDetails(
          key: 'checkout.enabled',
          defaultValue: false,
        )
        .value;
  }
}

final class TestCheckoutFlags implements CheckoutFlags {
  @override
  bool newCheckoutEnabled() => true;
}
{{< /code-block >}}

Luego, inyecte `TestCheckoutFlags` en las pruebas unitarias y `DatadogCheckoutFlags` en producción.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/#client-tokens