---
description: Aprenda a migrar Feature Flags de Statsig a Datadog Feature Flags.
further_reading:
- link: /feature_flags/
  tag: Documentación
  text: Descripción general de Feature Flags
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
title: Migre sus Feature Flags desde Statsig
---
## Descripción general {#overview}

Esta guía describe el proceso para migrar su lógica de Feature Flags de Statsig a [Feature Flags de Datadog][1]. Cubre mapeos conceptuales, instalación del SDK, inicialización y evaluación de Flags.

## Lista de verificación de resumen {#summary-checklist}

* Reemplace `@statsig/js-client` con `@datadog/openfeature-browser`.
* Intercambie `statsig.initialize` con `OpenFeature.setProviderAndWait`.
* Convierta `checkGate` a `client.getBooleanValue`.
* Convierta `getDynamicConfig` a `client.getObjectValue` o `client.getStringValue`.
* Convierta `getLayer` a `client.getObjectValue` y desreferencie los campos del objeto JSON devuelto.
* Use `targetingKey` en el contexto para identificar usuarios e impulsar la aleatorización basada en porcentajes.
* Recree sus Flags de Statsig en Datadog.
* Para aplicaciones del lado del servidor, use `@openfeature/server-sdk` y pase un contexto de evaluación por solicitud en lugar de un contexto global único.

## Recree Flags en Datadog {#recreate-flags-in-datadog}

Antes de cambiar las llamadas del SDK en su aplicación, recree sus puertas, configuraciones dinámicas y capas de Statsig como Flags en Datadog. En la interfaz de usuario de Datadog, vaya a **Software Delivery** > **Feature Flags** y cree Flags que coincidan con sus claves, tipos de variantes y reglas de segmentación de Statsig.

## Mapeo conceptual {#conceptual-mapping}

Los conceptos principales entre Statsig y Datadog son similares, pero la terminología difiere ligeramente.

| Concepto de Statsig | Concepto de Datadog | Notas |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (booleano) | Alternadores básicos de encendido/apagado. |
| **Dynamic Config** | **Feature Flag** (variantes de JSON/cadena) | Los Flags en Datadog pueden devolver cadenas, JSON o números, cubriendo los casos de uso de Dynamic Config de Statsig. |
| **Layer** | **Feature Flag** (variante JSON) | Utilice un Flag con valor JSON y lea los campos del objeto devuelto, similar a la desreferenciación de valores de una capa de Statsig. |
| **Experiment** | **Feature Flag** (con segmentación) | Un Flag de Datadog se puede configurar con despliegues basados en porcentajes y reglas de segmentación específicas para ejecutar experimentos. Conecte los Flags a [Datadog Experiments][5] para medir el impacto en los resultados del usuario. |
| **User/StatsigUser** | **Evaluation Context** | El contexto (atributos) pasado al SDK para evaluar los Flags. |

## Instalación {#installation}

Datadog diseña sus SDKs de Feature Flags para su uso con [OpenFeature][6]. Esto proporciona una API neutral respecto al proveedor mientras se utiliza Datadog como proveedor subyacente.

Elimine Statsig:

{{< code-block lang="bash" >}}
npm uninstall @statsig/js-client
# or
yarn remove @statsig/js-client
{{< /code-block >}}

Instale Datadog y OpenFeature:

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**Nota**: Para aplicaciones React, instale también `@openfeature/react-sdk`. Consulte [React Feature Flags][7]. Para implementaciones del lado del servidor, consulte la sección [Contexto del lado del servidor y dinámico](#server-side-and-dynamic-context), o [Server-Side Feature Flags][2] para otros lenguajes.

## Inicialización {#initialization}

Debe reemplazar la llamada `statsig.initialize()` con la configuración del proveedor de OpenFeature. Pase el contexto de evaluación a `setProviderAndWait` en el momento del registro para que los Flags se evalúen para el usuario correcto desde el principio.

### Statsig (antiguo) {#statsig-old}

{{< code-block lang="javascript" >}}
import { StatsigClient } from '@statsig/js-client';

const client = new StatsigClient('client-sdk-key', { userID: 'user-123' });
await client.initializeAsync();
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
{{< /code-block >}}

{{< code-block lang="javascript" >}}
// Configure the Datadog provider
const provider = new DatadogProvider({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com', // or datadoghq.eu, etc.
  env: 'production', // Environment from which to fetch flag configurations
});

// Set the evaluation context and register the provider together
const evaluationContext = {
  targetingKey: 'user-123', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">El <code>targetingKey</code> se utiliza como sujeto de aleatorización para la segmentación basada en porcentajes. Cuando un Flag segmenta un porcentaje de sujetos (por ejemplo, 50%), el <code>targetingKey</code> determina en qué bucket cae un usuario. Los usuarios con el mismo <code>targetingKey</code> siempre reciben la misma variante para un Flag determinado.</div>

Para obtener más información sobre cómo crear tokens de cliente e IDs de aplicación, consulte [API and Application Keys][4].

## Evaluar Flags (verificar puertas) {#evaluate-flags-check-gates}

Reemplace las llamadas a `checkGate` con `getBooleanValue` de OpenFeature.

### Statsig (antiguo) {#statsig-old-1}

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new-1}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// The second argument is the fallback value (default) if the flag fails to fetch
const isEnabled = client.getBooleanValue('new_homepage_design', false);

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

## Obtener configuración (Dynamic Configs) {#get-configuration-dynamic-configs}

Si estaba utilizando `getDynamicConfig` o `getExperiment` para recuperar valores que no son booleanos (cadenas, JSON, números), utilice el método ingresado adecuado en OpenFeature.

### Statsig (antiguo) {#statsig-old-2}

{{< code-block lang="javascript" >}}
const config = client.getDynamicConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new-2}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue<{ title: string }>('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## Asignar capas a Flags de objetos JSON {#map-layers-to-json-object-flags}

Las capas de Statsig agrupan parámetros relacionados bajo una misma evaluación. En Datadog, utilice un Flag con valor JSON y lea los campos que necesite del objeto devuelto.

### Statsig (antiguo) {#statsig-old-3}

{{< code-block lang="javascript" >}}
const layer = client.getLayer('user_promo_experiments');
const promoTitle = layer.get('title', 'Welcome to Statsig!');
const discount = layer.get('discount', 0.1);
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new-3}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

const promoConfig = client.getObjectValue<{ title: string; discount: number }>('user_promo_experiments', {
  title: 'Welcome!',
  discount: 0.1,
});
const promoTitle = promoConfig.title;
const discount = promoConfig.discount;
{{< /code-block >}}

## Actualizar el contexto del usuario después de iniciar sesión {#update-user-context-after-login}

Statsig actualiza el contexto del usuario mediante `updateUser`. En OpenFeature y Datadog, actualice el contexto después de la inicialización con `OpenFeature.setContext()`, por ejemplo, después de que un usuario inicie sesión.

### Statsig (antiguo) {#statsig-old-4}

{{< code-block lang="javascript" >}}
await client.updateUserAsync({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' },
});
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new-4}

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
});
{{< /code-block >}}

## Seguimiento y exposición {#tracking-and-exposure}

En Statsig, verificar una puerta registra automáticamente una exposición.

En Datadog, la telemetría de Flags se divide en dos categorías:

**El registro de exposición** registra que un sujeto recibió una variante de Flag específica. Cada evento de exposición incluye la clave del Flag, la variante servida y el contexto de evaluación. Utilice los datos de exposición para analizar los resultados de los experimentos y la adopción de características.

**El registro de evaluación** registra con qué frecuencia se devuelve cada variante. Los SDK de cliente envían recuentos de evaluación agregados de forma predeterminada. Los SDK de servidor emiten la métrica `feature_flag.evaluations` solo después de habilitar el registro de evaluaciones.

1. **SDKs de cliente**: El registro de exposiciones está habilitado de forma predeterminada. El SDK envía eventos de exposición a la ingesta de exposiciones. Puede verlos en la lista de **Feature Flags**. Establezca `enableExposureLogging: false` en la configuración `DatadogProvider` si no necesita el seguimiento de exposiciones.

<div class="alert alert-warning">Configuración <code>enableRumFeatureFlagTracking</code> a <code>true</code> puede afectar los costos de <a href="/real_user_monitoring/">RUM</a>, ya que agrega evaluaciones de Flags a los eventos de RUM. Ambos <code>enableExposureLogging</code> y <code>enableRumFeatureFlagTracking</code> están activados de forma predeterminada para los SDKs de cliente.</div>

2. **SDKs de servidor**: El registro de exposiciones está activado de forma predeterminada. El registro de evaluaciones está desactivado de forma predeterminada. Para enviar métricas de evaluación desde los SDK de servidor, habilite las métricas de OpenTelemetry (por ejemplo, `DD_METRICS_OTEL_ENABLED=true`) y siga la guía específica del lenguaje en [Server-Side Feature Flags][2].

## Contexto del lado del servidor y dinámico {#server-side-and-dynamic-context}

Las secciones anteriores cubren la migración del lado del cliente y del navegador, donde el contexto de evaluación suele ser estático durante la duración de la sesión de un usuario. Las aplicaciones del lado del servidor utilizan un SDK diferente y se autentican con una clave de Datadog API en lugar de un token de cliente. También suelen crear un nuevo contexto de evaluación para cada solicitud entrante.

Configure las variables de entorno necesarias antes de inicializar el SDK de servidor:

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
DD_ENV=<ENVIRONMENT_NAME>
{{< /code-block >}}

Consulte [Server-Side Feature Flags][2] para obtener la lista completa de opciones de configuración de la aplicación y del Agent.

Instale el SDK del lado del servidor. Este ejemplo utiliza el [Node.js Feature Flags SDK][3]:

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Registre el proveedor a través del trazador de Datadog:

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init();

await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

### Statsig (antiguo) {#statsig-old-5}

{{< code-block lang="javascript" >}}
// The Statsig server SDK takes the user in each call
const isEnabled = statsig.checkGate(user, 'new_homepage_design');
{{< /code-block >}}

### Datadog (nuevo) {#datadog-new-5}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown',
  };

  const isEnabled = await client.getBooleanValue('new_homepage_design', false, evaluationContext);
  res.send(isEnabled ? 'New design' : 'Old design');
});
{{< /code-block >}}

El SDK del navegador utiliza cualquier contexto de evaluación que esté configurado para cada evaluación de Flag. Puede actualizar ese contexto con `OpenFeature.setContext()` cuando el usuario inicie sesión o sus atributos cambien. El SDK del servidor, en cambio, pasa un nuevo contexto de evaluación en cada llamada de evaluación de Flag, ya que un proceso maneja muchos usuarios diferentes.

Para otros lenguajes de servidor, consulte [Server-Side Feature Flags][2].

[1]: /es/feature_flags/
[2]: /es/feature_flags/server/
[3]: /es/feature_flags/server/nodejs/
[4]: /es/account_management/api-app-keys/
[5]: /es/experiments/
[6]: https://openfeature.dev/
[7]: /es/feature_flags/client/react/