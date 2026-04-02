---
description: Gestiona la entrega de funciones con capacidad de observación integrada,
  métricas en tiempo real y lanzamientos graduales compatibles con OpenFeature.
further_reading:
- link: https://openfeature.dev/docs/reference/technologies/client/web/
  tag: Sitio externo
  text: Documentación del kit de desarrollo de software (SDK)  de OpenFeature Web
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: Blog
  text: Envía funciones de forma más rápida y segura con Datadog Feature Flags
site_support_id: getting_started_feature_flags
title: Empezando con los Feature Flags
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags está en vista previa. Completa el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Los marcadores de funciones de Datadog ofrecen una forma potente e integrada de gestionar la entrega de funciones, con capacidad de observación incorporada y una integración perfecta en toda la plataforma.

* **Métricas en tiempo real:** Conoce quién recibe cada variante y la manera en que tu marcador afecta al estado y al rendimiento de tu aplicación, todo en tiempo real.

* **Admite cualquier tipo de datos:** Utiliza booleanos, cadenas, números u objetos completos de JSON, el que necesite tu uso en case (incidencia).

* **Creado para la experimentación:** Dirígete a audiencias específicas para tests A/B, lanza funciones gradualmente con versiones canarias y retrocede automáticamente cuando se detecten regresiones.

* **Compatible con OpenFeature:** Se basa en la norma de OpenFeature, lo que garantiza la compatibilidad con las implementaciones existentes de OpenFeature y proporciona un enfoque independiente del proveedor para la gestión de marcadores de funciones.

## Configura tus entornos

Es probable que tu organización ya disponga de entornos preconfigurados para Desarrollo, Escenificación y Producción. Si necesitas configurar estos u otros entornos, ve a la page (página) [**Entornos**][3] para crear consultas de etiquetas para cada entorno. También puedes identificar qué entorno debe considerarse como entorno de Producción.

{{< img src="getting_started/feature_flags/environments-list.png" alt="Lista de entornos" style="width:100%;" >}}

## Crea tu primer marcador de funciones

### Step (UI) / paso (generic) 1: Importar e inicializar el kit de desarrollo de software (SDK)

En primer lugar, instala `@datadog/openfeature-browser`, `@openfeature/web-sdk`, y `@openfeature/core` como dependencias en tu project (proyecto):


```
yarn add @datadog/openfeature-browser@preview @openfeature/web-sdk @openfeature/core
```

A continuación, añade lo siguiente a tu project (proyecto) para inicializar el kit de desarrollo de software (SDK):

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
   clientToken: '<CLIENT_TOKEN>',
   applicationId: '<APPLICATION_ID>',
   enableExposureLogging: true,
   site: 'datadoghq.com',
   env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
   service: '<SERVICE_NAME>',
   version: '1.0.0',
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
```

Puedes encontrar más información sobre las opciones de configuración del kit de desarrollo de software (SDK) de OpenFeature en tu [documentación][1]. Para obtener más información sobre la creación de tokens del cliente e identificadores de la aplicación, consulta [Claves de API y de aplicaciones][4].

### Ptep (UI) / paso (generic) 2: Crear un marcador de función

Utiliza la [interfaz de usuario de creación de marcadores de funciones][2] para arrancar tu primer marcador de función. En forma predeterminada, el marcador está desactivado en todos los entornos.

### Step (UI) / paso (generic) 3: Evaluar el marcador y escribir el código de la función

En el código de tu aplicación, utiliza el kit de desarrollo de software (SDK) para evaluar el marcador y la puerta de la nueva función.

```js
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
   org_id: 2,
   user_id: 'user-123',
   email: 'user@example.com',
   targetingKey: 'user-123',
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
   // Feature code here
}
```

Una vez que hayas finalizado este step (UI) / paso (generic), vuelve a desplegar la aplicación para recoger estos cambios. Puedes encontrar más ejemplos de uso en la [documentación][1] del kit de desarrollo de software (SDK).

### Step (UI) / paso (generic) 4: Definir las reglas de selección y activar el marcador de función

Ahora que la aplicación está lista para check el valor de su marcador, puedes empezar a añadir reglas de orientación. Las reglas de orientación te permiten definir dónde o a quién servir diferentes variantes de tu función.

Ve a **Feature Flags**, selecciona tu marcador y busca la sección **Targeting Rules & Rollouts** (Reglas de oriengación y lanzamientos. Selecciona el entorno cuyas reglas deseas modificar y haz clic en **Edit Targeting Rules** (Editar reglas de orientación).

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Reglas de orientación y lanzamientos" style="width:100%;" >}}

### Ptep (UI) / paso (generic) 5: Publicar las normas en tus entornos

Tras guardar los cambios en las reglas de orientación, publícalas activando tu marcador en el entorno que desees.

<div class="alert alert-info">
Como práctica general, los cambios deben implementarse en un entorno de pruebas antes de implementarlos en producción.
</div>

En la sección **Reglas de orientación y lanzamientos**, cambia el entorno seleccionado a **Activado**.

{{< img src="getting_started/feature_flags/publish-targeting-rules.png" alt="Publicar reglas de orientación" style="width:100%;" >}}

El marcador sirve tus reglas de orientación en este entorno. Puedes seguir editando estas reglas de orientación para controlar dónde se sirven las variantes.

### Step (UI) / paso (generic) 6: Monitorizar tu despliegue

Monitoriza el despliegue de la función desde la page (página) de detalles del marcador de función, en que se proporciona un rastreo de la exposición en tiempo real y métricas como **la tasa de errores** y **el tiempo de carga de la page (página) **. A medida que vayas lanzando la función con el marcador, consulta el panel **Real-Time Metric Overview** (Información general de métricas en tiempo real) de la interfaz de usuario de Datadog para ver cómo afecta la función al rendimiento de la aplicación.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Panel de métricas de marcadores en tiempo real" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://app.datadoghq.com/feature-flags/environments
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#client-tokens