---
title: Angular Feature Flags
description: Set up Datadog Feature Flags for Angular applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "https://openfeature.dev/docs/reference/sdks/client/web/angular/"
  tag: "OpenFeature"
  text: "OpenFeature Angular SDK"
- link: "/real_user_monitoring/application_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
---

## Overview

This page describes how to instrument your Angular application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Feature Flags SDK for Angular is built on [OpenFeature][1], an open standard for feature flag management. This guide explains how to install the SDK, configure the Datadog provider, and evaluate flags in your Angular components using structural directives or the FeatureFlagService.

## Requirements

* ES2015-compatible web browser (Chrome, Edge, Firefox, etc)
* Angular version 16+

## Installation

Install the Datadog OpenFeature provider and the OpenFeature Angular SDK using your preferred package manager:

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

## Initialize the provider

Create a `DatadogProvider` instance with your Datadog credentials:

```typescript
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## Configure the module

Import the `OpenFeatureModule` in your Angular module and configure it using the `forRoot` method. This makes feature flags available throughout your application.

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Reference these attributes in your targeting rules to control who sees each variant.

<div class="alert alert-info">The <code>targetingKey</code> is used as the randomization subject for percentage-based targeting. When a flag targets a percentage of subjects (for example, 50%), the <code>targetingKey</code> determines which "bucket" a user falls into. Users with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

### Using a static object

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

### Using a factory function

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

### Updating the evaluation context

To update the evaluation context after initialization (for example, when a user logs in), use `OpenFeature.setContext()`:

{{< code-block lang="typescript" >}}
import { OpenFeature } from '@openfeature/angular-sdk';

await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Evaluate flags

The OpenFeature Angular SDK provides two main ways to work with feature flags:

1. **Structural Directives** - For template-based conditional rendering
2. **FeatureFlagService** - For programmatic access with Observables or Signals

### Boolean flags

Use boolean flags for on/off or true/false conditions.

{{% collapse-content title="Structural directive" level="h4" expanded=false id="boolean-structural-directive" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Observables" level="h4" expanded=false id="boolean-observables" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Angular Signals" level="h4" expanded=false id="boolean-signals" %}}
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
{{% /collapse-content %}}

### String flags

Use string flags to select between multiple variants or configuration strings.

{{% collapse-content title="Structural directive" level="h4" expanded=false id="string-structural-directive" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Observables" level="h4" expanded=false id="string-observables" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Angular Signals" level="h4" expanded=false id="string-signals" %}}
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
{{% /collapse-content %}}

### Number flags

Use number flags for numeric values such as limits, percentages, or multipliers.

{{% collapse-content title="Structural directive" level="h4" expanded=false id="number-structural-directive" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Observables" level="h4" expanded=false id="number-observables" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Angular Signals" level="h4" expanded=false id="number-signals" %}}
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
{{% /collapse-content %}}

### Object flags

Use object flags for structured configuration data.

{{% collapse-content title="Structural directive" level="h4" expanded=false id="object-structural-directive" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Observables" level="h4" expanded=false id="object-observables" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="FeatureFlagService with Angular Signals" level="h4" expanded=false id="object-signals" %}}
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
{{% /collapse-content %}}

### Additional options

#### Opting-out of automatic re-rendering

By default, directives re-render when the flag value changes or the context changes. You can disable this behavior:

{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;"
>
  This is shown when the feature flag is enabled.
</div>
{{< /code-block >}}

The service methods also accept options to control automatic updates:

{{< code-block lang="typescript" >}}
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {
  updateOnConfigurationChanged: false, // default: true
  updateOnContextChanged: false, // default: true
});
{{< /code-block >}}

#### Consuming evaluation details

You can access the evaluation details in your templates:

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

When the expected flag value is omitted, the template will always be rendered. This can be used to just render the flag value or details without conditional rendering:

{{< code-block lang="html" >}}
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">
  The theme color is {{ value }}.
</div>
{{< /code-block >}}

When using the service, the detail methods return both the evaluated value and metadata explaining the evaluation:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/sdks/client/web/angular/

