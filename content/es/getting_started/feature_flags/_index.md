---
description: Administra la entrega de funciones con observabilidad integrada, métricas
  en tiempo real y implementaciones graduales compatibles con OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: SDKs del lado del cliente
- link: /feature_flags/server/
  tag: Documentación
  text: SDKs del lado del servidor
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: Blog
  text: Envía funciones más rápido y de manera más segura con Feature Flags de Datadog
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: Blog
  text: Cómo equilibrar velocidad y calidad en experimentos a través de datos unificados
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: Blog
  text: Cómo Datadog Feature Flags es resiliente a fallas de proveedores de la nube
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilice métricas de guardrail y deje de microgestionar sus lanzamientos
site_support_id: getting_started_feature_flags
title: Introducción a Feature Flags
---
## Descripción general {#overview}

Las Feature Flags de Datadog ofrecen una forma poderosa e integrada de gestionar la entrega de funciones, con observabilidad incorporada e integración fluida en toda la plataforma.

- **Métricas en tiempo real:** Comprenda quién está recibiendo cada variante, así como cómo su Feature Flag impacta la salud y el rendimiento de su aplicación, todo en tiempo real.

- **Soporta cualquier tipo de dato:** Utilice booleanos, cadenas, números u objetos JSON completos, lo que su caso de uso requiera.

- **Construido para la experimentación:** Dirija audiencias específicas para pruebas A/B, despliegue funciones gradualmente con lanzamientos canarios y retroceda automáticamente cuando se detecten regresiones.

- **Compatible con OpenFeature:** Construido sobre el estándar OpenFeature, asegurando la compatibilidad con implementaciones existentes de OpenFeature y proporcionando un enfoque neutral respecto a proveedores para la gestión de Feature Flags.

## Feature Flags SDKs {#feature-flags-sdks}

Esta guía utiliza el SDK de navegador de JavaScript como ejemplo. Puede integrar Feature Flags de Datadog en cualquier aplicación utilizando uno de los siguientes SDKs:

### SDKs del lado del cliente {#client-side-sdks}

{{< partial name="feature_flags/feature_flags_client.html" >}}

### SDKs del lado del servidor {#server-side-sdks}

{{< partial name="feature_flags/feature_flags_server.html" >}}

## Configure sus entornos {#configure-your-environments}

Su organización probablemente ya tiene entornos preconfigurados para Desarrollo, Staging y Producción. Para detalles sobre consultas de entornos, marcado de producción y gestión de entornos, consulte [Entornos][4].

## Cree su primer Feature Flag {#create-your-first-feature-flag}

### Paso 1: Importe e inicialice el SDK {#step-1-import-and-initialize-the-sdk}

Primero, instale `@datadog/openfeature-browser`, `@openfeature/web-sdk` y `@openfeature/core` como dependencias en su proyecto:

```
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
```

Luego, agregue lo siguiente a su proyecto para inicializar el SDK:

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
    enableExposureLogging: true, // Can impact RUM costs if enabled
    site: 'datadoghq.com',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
```

<div class="alert alert-warning">Configuración <code>enableExposureLogging</code> a <code>true</code> puede impactar los costos de <a href="https://docs.datadoghq.com/real_user_monitoring/">RUM</a>, ya que envía eventos de exposición a Datadog a través de RUM. Puede desactivarlo si no necesita rastrear la exposición de funciones o el estado de las métricas de guardrail.</div>

Más información sobre las opciones de configuración del SDK de OpenFeature se puede encontrar en su [documentación][1]. Para más información sobre la creación de tokens de cliente e IDs de aplicación, consulte [API y Claves de Aplicación][3].

### Paso 2: Cree un Feature Flag {#step-2-create-a-feature-flag}

Vaya a [{{< ui >}}Create Feature Flag{{< /ui >}}][2] en Datadog y configure lo siguiente:

- **Name and key**: El nombre de visualización del Feature Flag y la clave referenciada en el código
- **Variant type** y **variant values**: Consulte [Variants and Flag Types][5]
- **Distribution channels**: Consulte [Distribution Channels][6]

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} y {{< ui >}}variant values{{< /ui >}} deben considerarse públicos cuando se envían a los SDK de clientes.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags.png" alt="Cree Feature Flag" style="width:100%;" >}}

### Paso 3: Evalúe el Feature Flag y escriba el código para implementar la nueva funcionalidad {#step-3-evaluate-the-flag-and-write-feature-code}

En el código de su aplicación, utilice el SDK para evaluar el Feature Flag y habilitar la nueva funcionalidad.

```js
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
```

Después de completar este paso, vuelva a implementar la aplicación para aplicar estos cambios. Ejemplos adicionales de uso se pueden encontrar en la [documentación][1] del SDK.

### Paso 4: Defina las reglas de segmentación y habilite el Feature Flag {#step-4-define-targeting-rules-and-enable-the-feature-flag}

Configure las [reglas de segmentación][7] para definir qué sujetos reciben cada variante. Después de guardar sus reglas, habilite el Feature Flag en el entorno seleccionado.

<div class="alert alert-info">
Como buena práctica general, implemente los cambios en un entorno de Staging antes de la Producción.
</div>

Consulte [Traffic Splitting and Randomization][8].

### Paso 5: Monitoree su implementación {#step-5-monitor-your-rollout}

Monitoree el despliegue de la función desde la página de detalles del Feature Flag, que proporciona seguimiento de exposición en tiempo real y métricas como {{< ui >}}error rate{{< /ui >}} y {{< ui >}}page load time{{< /ui >}}. A medida que implemente de forma incremental la función con el Feature Flag, visualice el panel {{< ui >}}Real-Time Metric Overview{{< /ui >}} en la interfaz de usuario de Datadog para ver cómo la función impacta el rendimiento de la aplicación.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Panel de métricas de Feature Flag en tiempo real" style="width:100%;" >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/#client-tokens
[4]: /es/feature_flags/concepts/environments/
[5]: /es/feature_flags/concepts/variants_and_flag_types/
[6]: /es/feature_flags/concepts/distribution_channels/
[7]: /es/feature_flags/concepts/targeting_rules/
[8]: /es/feature_flags/concepts/traffic_splitting/