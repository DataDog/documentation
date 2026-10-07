---
description: Configure Datadog Feature Flags para aplicaciones Angular.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: https://openfeature.dev/docs/reference/sdks/client/web/angular/
  tag: OpenFeature
  text: SDK de OpenFeature para Angular
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentación
  text: Browser Monitoring
title: Feature Flags de Angular
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación Angular con el Datadog Feature Flags SDK. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El Datadog Feature Flags SDK para Angular está construido sobre [OpenFeature][1], un estándar abierto para la gestión de Feature Flags. Esta guía explica cómo instalar el SDK, configurar el proveedor de Datadog y evaluar Feature Flags en sus componentes Angular utilizando directivas estructurales o el FeatureFlagService.

## Requisitos {#requirements}

* **Angular** versión 16 o posterior
* **Navegador web compatible con ECMAScript 2015** como Chrome, Edge o Firefox

## Instalación {#installation}

Instale el proveedor de OpenFeature de Datadog y el SDK de OpenFeature para Angular utilizando su gestor de paquetes preferido:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Inicialice el proveedor {#initialize-the-provider}

Cree una instancia de `DatadogProvider` con sus credenciales de Datadog. Para la configuración en vivo de los Browser Feature Flags, se requieren `applicationId`, `clientToken`, `site` y `env`. Para crear un token de cliente, consulte [Client tokens][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Browser Feature Flags no son compatibles con el <a href="/getting_started/site">Datadog site</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

```typescript
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  // Required
  // applicationId is a unique identifier to distinguish multiple frontend applications.
  // This should match the app ID you provide to your RUM SDK.
  applicationId: '<APPLICATION_ID>',
  // Required
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## Configure el módulo {#configure-the-module}

Importe el `OpenFeatureModule` en su módulo Angular y configúrelo utilizando el método `forRoot`. Esto hace que las Feature Flags estén disponibles en toda su aplicación.

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación de las Feature Flags mediante un contexto de evaluación. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones de las Feature Flags deben devolverse. Haga referencia a estos atributos en sus reglas de segmentación para controlar quién ve cada variante.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden provocar que se pierdan los datos de exposición.</div>

<div class="alert alert-info">El <code>targetingKey</code> se utiliza como sujeto de aleatorización para la segmentación basada en porcentajes. Cuando un Flag segmenta un porcentaje de sujetos (por ejemplo, 50%), el <code>targetingKey</code> determina en qué bucket cae un usuario. Los usuarios con el mismo <code>targetingKey</code> siempre reciben la misma variante para un Flag determinado.</div>

### Uso de un objeto estático {#using-a-static-object}

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFeatureModule } from '@openfeature/angular-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

@NgModule({
  imports: [
    CommonModule,
    OpenFeatureModule.forRoot({
      provider: provider,
      context: {
        targetingKey: 'user-123',
        user_id: '123',
        user_role: 'admin',
        email: 'user@example.com',
      },
    }),
  ],
});

export class AppModule {}
```

### Uso de una función de fábrica {#using-a-factory-function}

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFeatureModule, EvaluationContext } from '@openfeature/angular-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

@NgModule({
  imports: [
    CommonModule,
    OpenFeatureModule.forRoot({
      provider: provider,
      context: (): EvaluationContext => {
        // Load context from your service, localStorage, or other source
        // This is a placeholder - implement based on your application's needs
        return loadContextFromLocalStorage();
      },
    }),
  ],
});

export class AppModule {}
```

### Actualizar el contexto de evaluación {#update-the-evaluation-context}

Para actualizar el contexto de evaluación después de la inicialización (por ejemplo, cuando un usuario inicia sesión), use `OpenFeature.setContext()`:

{{< code-block lang="typescript" >}}
import { OpenFeature } from '@openfeature/angular-sdk';

await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Evalúe marcadores {#evaluate-flags}

El OpenFeature Angular SDK proporciona dos formas principales de trabajar con Feature Flags:

1. **Directivas estructurales**: para renderizado condicional basado en plantillas
2. **FeatureFlagService**: para acceso programático con **Observables** o **Signals**

### Marcadores booleanos {#boolean-flags}

Utilice Feature Flags booleanas para condiciones de encendido/apagado o verdadero/falso.

{{< tabs >}}
{{% tab "Directiva estructural" %}}
{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; domain: 'userDomain'; else: booleanFeatureElse; initializing: booleanFeatureInitializing; reconciling: booleanFeatureReconciling"
>
  This is shown when the feature flag is enabled.
</div>
<ng-template #booleanFeatureElse> This is shown when the feature flag is disabled. </ng-template>
<ng-template #booleanFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #booleanFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div *ngIf="(isFeatureEnabled$ | async)?.value">
      Feature is enabled! Reason: {{ (isFeatureEnabled$ | async)?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  isFeatureEnabled$ = this.flagService.getBooleanDetails('my-feature', false);
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Signals" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div *ngIf="isFeatureEnabled()?.value">
      Feature is enabled! Reason: {{ isFeatureEnabled()?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  isFeatureEnabled = toSignal(this.flagService.getBooleanDetails('my-feature', false));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Marcadores de cadena {#string-flags}

Utilice Feature Flags de cadena para seleccionar entre múltiples variantes o cadenas de configuración.

{{< tabs >}}
{{% tab "Directiva estructural" %}}
{{< code-block lang="html" >}}
<div
  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; domain: 'userDomain'; else: stringFeatureElse; initializing: stringFeatureInitializing; reconciling: stringFeatureReconciling"
>
  This is shown when the feature flag matches the specified theme color.
</div>
<ng-template #stringFeatureElse> This is shown when the feature flag does not match the specified theme color. </ng-template>
<ng-template #stringFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #stringFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Theme: {{ (currentTheme$ | async)?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  currentTheme$ = this.flagService.getStringDetails('theme', 'light');
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Signals" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Theme: {{ currentTheme()?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  currentTheme = toSignal(this.flagService.getStringDetails('theme', 'light'));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Feature Flags numéricos {#number-flags}

Utilice Feature Flags numéricas para valores numéricos como límites, porcentajes o multiplicadores.

{{< tabs >}}
{{% tab "Directiva estructural" %}}
{{< code-block lang="html" >}}
<div
  *numberFeatureFlag="'discountRate'; value: 10; default: 5; domain: 'userDomain'; else: numberFeatureElse; initializing: numberFeatureInitializing; reconciling: numberFeatureReconciling"
>
  This is shown when the feature flag matches the specified discount rate.
</div>
<ng-template #numberFeatureElse> This is shown when the feature flag does not match the specified discount rate. </ng-template>
<ng-template #numberFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #numberFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Max items: {{ (maxItems$ | async)?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  maxItems$ = this.flagService.getNumberDetails('max-items', 10);
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Signals" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Max items: {{ maxItems()?.value }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  maxItems = toSignal(this.flagService.getNumberDetails('max-items', 10));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Marcadores de objeto {#object-flags}

Utilice Feature Flags de objeto para datos de configuración estructurados.

{{< tabs >}}
{{% tab "Directiva estructural" %}}
{{< code-block lang="html" >}}
<div
  *objectFeatureFlag="'userConfig'; value: { theme: 'dark' }; default: { theme: 'light' }; domain: 'userDomain'; else: objectFeatureElse; initializing: objectFeatureInitializing; reconciling: objectFeatureReconciling"
>
  This is shown when the feature flag matches the specified user configuration.
</div>
<ng-template #objectFeatureElse>
  This is shown when the feature flag does not match the specified user configuration.
</ng-template>
<ng-template #objectFeatureInitializing> This is shown when the feature flag is initializing. </ng-template>
<ng-template #objectFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Observables" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>Timeout: {{ (config$ | async)?.value?.timeout }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  config$ = this.flagService.getObjectDetails<{ timeout: number }>('api-config', { timeout: 5000 });
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Signals" %}}
{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div>Timeout: {{ config()?.value?.timeout }}</div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  config = toSignal(this.flagService.getObjectDetails<{ timeout: number }>('api-config', { timeout: 5000 }));
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Opciones adicionales {#additional-options}

#### Deshabilitar el renderizado automático {#disable-automatic-re-rendering}

De forma predeterminada, las directivas se vuelven a renderizar cuando el valor de la Feature Flag cambia o cuando cambia el contexto. Puede deshabilitar este comportamiento:

{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;"
>
  This is shown when the feature flag is enabled.
</div>
{{< /code-block >}}

Los métodos del servicio también aceptan opciones para controlar las actualizaciones automáticas:

{{< code-block lang="typescript" >}}
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {
  updateOnConfigurationChanged: false, // default: true
  updateOnContextChanged: false, // default: true
});
{{< /code-block >}}

#### Consumir detalles de evaluación {#consume-evaluation-details}

Puede acceder a los detalles de evaluación en sus plantillas:

{{< code-block lang="html" >}}
<div
  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; else: stringFeatureElse; let value; let details = evaluationDetails"
>
  It was a match! The theme color is {{ value }} because of {{ details.reason }}
</div>
<ng-template #stringFeatureElse let-value let-details="evaluationDetails">
  It was no match! The theme color is {{ value }} because of {{ details.reason }}
</ng-template>
{{< /code-block >}}

Cuando se omite el valor esperado de la Feature Flag, la plantilla siempre se renderiza. Esto se puede utilizar para renderizar solo el valor de la Feature Flag o los detalles sin renderizado condicional.

{{< code-block lang="html" >}}
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">
  The theme color is {{ value }}.
</div>
{{< /code-block >}}

Al utilizar el servicio, los métodos de detalle devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="typescript" >}}
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '@openfeature/angular-sdk';

@Component({
  selector: 'my-component',
  standalone: true,
  template: `
    <div *ngIf="details()?.value">
      Feature is enabled! Variant: {{ details()?.variant }}, Reason: {{ details()?.reason }}
    </div>
  `,
})
export class MyComponent {
  private flagService = inject(FeatureFlagService);

  details = toSignal(this.flagService.getBooleanDetails('my-feature', false));

  // Access the details
  // details().value       // Evaluated value (true or false)
  // details().variant     // Variant name, if applicable
  // details().reason      // Why this value was chosen
  // details().errorCode   // Error code, if evaluation failed
}
{{< /code-block >}}

## Configurar las opciones del proveedor del navegador {#configure-browser-provider-options}

El proveedor de Angular utiliza el proveedor de navegador de Datadog, que también admite estos ajustes opcionales:

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `enableExposureLogging` | `true` | Enviar eventos de exposición a la ingesta de exposiciones. |
| `enableFlagEvaluationTracking` | `true` | Enviar telemetría de evaluación agregada. |
| `enableRumFeatureFlagTracking` | `true` | Agregar evaluaciones de Feature Flags a los eventos de RUM cuando Browser RUM esté disponible. Habilitar esta opción puede aumentar el conteo de eventos facturados de RUM. |
| `flagEvaluationTrackingInterval` | `10000` ms | Intervalo de vaciado para la telemetría de evaluación. |
| `initialFlagsConfiguration` | unset | Proporcione datos precalculados que coincidan con el contexto como respaldo si la obtención falla. Consulte [Initial precomputed fallback data][3]. |
| `flaggingProxy` | unset | Obtener Feature Flags a través de un proxy en lugar de `site`. |
| `customHeaders` | unset | Agregar encabezados a las solicitudes de obtención de Feature Flags. |
| `overwriteRequestHeaders` | `false` | Reemplazar los encabezados de solicitud predeterminados con `customHeaders`. |

`DatadogProvider` sigue siendo el proveedor de navegador recomendado para aplicaciones Angular. Para la entrega de configuración propiedad de la aplicación o la evaluación de reglas locales a través de cambios de contexto, consulte [Evaluación basada en reglas del navegador][4]. Esta configuración avanzada requiere una actualización de configuración explícita y la gestión del ciclo de vida del seguimiento.

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba de Datadog dedicado con el `DatadogProvider` real, o cambiarlo por el `TypedInMemoryProvider` de OpenFeature para controlar los valores de las Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `TypedInMemoryProvider` se exporta desde `@openfeature/web-sdk`, que ya está instalado para las Feature Flags de Angular.

{{< code-block lang="typescript" >}}
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { FeatureFlagService, OpenFeatureModule } from '@openfeature/angular-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      OpenFeatureModule.forRoot({
        provider: new TypedInMemoryProvider(flags),
        context: { targetingKey: 'test-user' },
      }),
    ],
  }).compileComponents();
});

afterEach(() => {
  TestBed.resetTestingModule();
});

it('uses in-memory flag values', async () => {
  const flagService = TestBed.inject(FeatureFlagService);
  const details = await firstValueFrom(flagService.getBooleanDetails('new_checkout_button', false));

  expect(details.value).toBe(true);
});
{{< /code-block >}}

La estructura de Feature Flags del Web SDK requiere `variants`, `defaultVariant` y `disabled`. Registre el proveedor en memoria antes de inyectar servicios o renderizar componentes que lean Feature Flags.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/sdks/client/web/angular/
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /es/feature_flags/implementation_patterns/browser_rules_based_evaluation/