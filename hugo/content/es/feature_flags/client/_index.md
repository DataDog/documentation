---
aliases:
- /es/feature_flags/setup/
description: Configure los Feature Flags de Datadog para aplicaciones del lado del
  cliente.
further_reading:
- link: /feature_flags/
  tag: Documentación
  text: Obtenga más información sobre los Feature Flags
- link: /getting_started/feature_flags/
  tag: Documentación
  text: Primeros pasos con Feature Flags
- link: feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
title: Feature Flags del lado del cliente
---
## Descripción general {#overview}

Configure los Feature Flags de Datadog para sus aplicaciones. Siga las guías específicas de la plataforma a continuación para integrar los Feature Flags en su aplicación y comenzar a recopilar datos de Feature Flags:

Los Feature Flags de Datadog están basados en el estándar [OpenFeature](https://openfeature.dev/docs/reference/intro/), una especificación de código abierto y neutral respecto al proveedor para las API de Feature Flags. Si es nuevo en los conceptos de OpenFeature como proveedores, contexto de evaluación y hooks, consulte la [documentación de conceptos de OpenFeature](https://openfeature.dev/docs/category/concepts).

{{< card-grid card_width="200px">}}
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

## Opciones de telemetría por plataforma {#telemetry-options-by-platform}

Los proveedores web, móviles y de Unity exponen controles de telemetría similares con nombres de opciones específicos de la plataforma. Cada opción expuesta tiene como valor predeterminado `true`, por lo que los comportamientos enumerados están activados de forma predeterminada; establezca la opción en `false` para optar por no participar.

Las opciones web a continuación se aplican a `DatadogProvider`, el proveedor de navegador recomendado. El `DatadogCoreProvider` avanzado no habilita la telemetría automáticamente. Las aplicaciones que lo utilizan registran explícitamente los hooks de seguimiento y gestionan su ciclo de vida. Consulte [Evaluación basada en reglas del navegador][1].

<div class="alert alert-info">El puente de OpenFeature para iOS (<a href="https://github.com/DataDog/dd-openfeature-provider-swift">dd-openfeature-provider-swift</a>) está disponible para su uso como paquete anterior a la versión 1.0. Hasta que alcance la versión 1.0, las actualizaciones de versión pueden incluir cambios importantes. Para obtener la interfaz de API de iOS más estable, utilice la <code>FlagsClient</code> API directamente.</div>

### Enviar eventos de exposición {#send-exposure-events}

Predeterminado: `true`. Establezca en `false` para deshabilitar.

- **Web** (`@datadog/openfeature-browser`): `enableExposureLogging`
- **Android** (`dd-sdk-android-flags`): `trackExposures`
- **Dart y Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackExposures`
- **iOS** (`DatadogFlags`): `trackExposures`
- **React Native**: `trackExposures`
- **Unity**: `trackExposures`

### Enviar telemetría de evaluación agregada {#send-aggregated-evaluation-telemetry}

Predeterminado: `true`. Establezca en `false` para deshabilitar.

- **Web** (`@datadog/openfeature-browser`): `enableFlagEvaluationTracking`
- **Android** (`dd-sdk-android-flags`): `trackEvaluations`
- **Dart y Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackEvaluations`
- **iOS** (`DatadogFlags`): `trackEvaluations`
- **React Native**: No expuesto
- **Unity**: `trackEvaluations`

### Adjunte las evaluaciones a RUM {#attach-evaluations-to-rum}

Predeterminado: `true`. Establezca en `false` para deshabilitar.

- **Web** (`@datadog/openfeature-browser`): `enableRumFeatureFlagTracking`
- **Android** (`dd-sdk-android-flags`): `rumIntegrationEnabled`
- **Flutter** (`datadog_flags_flutter`): `rumIntegrationEnabled`
- **iOS** (`DatadogFlags`): `rumIntegrationEnabled`
- **React Native**: `rumIntegrationEnabled`
- **Unity**: No expuesto

## Pruebas con proveedores en memoria {#testing-with-in-memory-providers}

Datadog admite estos enfoques de prueba:

- **Pruebas de integración**: Apunte `DatadogProvider` a un entorno de prueba dedicado y controle los valores de los flags desde la interfaz de usuario de Datadog. Esto pone a prueba al proveedor real de extremo a extremo, incluyendo las asignaciones de flags entregadas por CDN.
- **Pruebas unitarias**: Intercambie `DatadogProvider` por el `InMemoryProvider` estándar de OpenFeature (o un stub de prueba equivalente, donde no haya un proveedor en memoria disponible en el lenguaje) y establezca los valores de los flags directamente en el código de prueba. Esto mantiene las pruebas herméticas y sin conexión.

Esta sección cubre el enfoque en memoria. Debido a que la API de OpenFeature está diseñada para que los proveedores sean intercambiables en tiempo de ejecución, el código de su aplicación no cambia; solo el proveedor registrado durante la configuración de la prueba.

Una prueba típica sigue este patrón:

1. Cree un mapa de claves de indicadores a variantes en la configuración de su prueba.
2. Registre un `InMemoryProvider` con ese mapa a través de la API de OpenFeature.
3. Llame al cliente de OpenFeature en las unidades que se están probando. El `InMemoryProvider` devuelve las asignaciones de indicadores configuradas en la configuración de la prueba.
4. Restablezca el proveedor en la finalización de la prueba para evitar la fuga de estado entre pruebas.

Consulte la página del SDK de su plataforma (seleccione en la parte superior de esta página) para ver un ejemplo concreto de prueba.

## Requisitos de atributos de contexto {#context-attribute-requirements}

<div class="alert alert-warning">
Los atributos del contexto de evaluación deben ser valores primitivos planos (cadenas, números, booleanos). Los objetos y arreglos anidados <strong>no son compatibles</strong> y pueden provocar que los eventos de exposición se descarten silenciosamente.
</div>

Utilice atributos planos en su contexto de evaluación:

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  userId: 'user-123',
  tier: 'premium',
  age: 25
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

Evite objetos y arreglos anidados:

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: 'user-123',
  user: { id: 'user-123' },        // nested object - NOT SUPPORTED
  features: ['beta', 'analytics']  // array - NOT SUPPORTED
};
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

Para despliegues basados en porcentajes y segmentación determinista, consulte [División de tráfico y aleatorización](/feature_flags/concepts/traffic_splitting/).

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/implementation_patterns/browser_rules_based_evaluation/