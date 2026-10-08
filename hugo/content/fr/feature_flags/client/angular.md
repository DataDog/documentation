---
description: Configurez Datadog Feature Flags pour les applications Angular.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: https://openfeature.dev/docs/reference/sdks/client/web/angular/
  tag: OpenFeature
  text: OpenFeature SDK pour Angular
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentation
  text: Surveillance Browser
title: Angular Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application Angular avec le SDK Datadog Feature Flags. Datadog Feature Flags offre un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Le SDK Datadog Feature Flags pour Angular est basé sur [OpenFeature][1], une norme ouverte pour la gestion des flags de fonctionnalité. Ce guide explique comment installer le SDK, configurer le fournisseur Datadog et évaluer les flags dans vos composants Angular à l'aide de directives structurelles ou du FeatureFlagService.

## Prérequis {#requirements}

* **Angular** version 16 ou ultérieure
* **Navigateur web compatible ECMAScript 2015** tel que Chrome, Edge ou Firefox

## Installation {#installation}

Installez le fournisseur Datadog OpenFeature et le SDK Angular OpenFeature à l'aide de votre gestionnaire de paquets préféré :

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

## Initialiser le fournisseur {#initialize-the-provider}

Créez une instance `DatadogProvider` avec vos identifiants Datadog. Pour la configuration en direct de Browser Feature Flags, `applicationId`, `clientToken`, `site` et `env` sont requis. Pour créer un jeton client, consultez [Jetons client][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

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

## Configurer le module {#configure-the-module}

Importez le `OpenFeatureModule` dans votre module Angular et configurez-le à l'aide de la méthode `forRoot`. Cela rend les features flags disponibles dans toute votre application.

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi l'évaluation de l'indicateur s'applique en utilisant un contexte d'évaluation. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Référencez ces attributs dans vos règles de ciblage pour contrôler qui voit chaque variante.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

<div class="alert alert-info">Le <code>targetingKey</code> est utilisé comme sujet de randomisation pour le ciblage basé sur le pourcentage. Lorsqu'un indicateur cible un pourcentage de sujets (par exemple, 50 %), le <code>targetingKey</code> détermine dans quel « compartiment » un utilisateur se trouve. Les utilisateurs ayant le même <code>targetingKey</code> reçoivent toujours la même variante pour un indicateur donné.</div>

### Utilisation d'un objet statique {#using-a-static-object}

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

### Utilisation d'une fonction de fabrique {#using-a-factory-function}

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

### Mettre à jour le contexte d'évaluation {#update-the-evaluation-context}

Pour mettre e0 jour le contexte d'e9valuation apre8s l'initialisation (par exemple, lorsqu'un utilisateur se connecte), utilisez `OpenFeature.setContext()` :

{{< code-block lang="typescript" >}}
import { OpenFeature } from '@openfeature/angular-sdk';

await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Évaluer les Feature Flags {#evaluate-flags}

Le SDK Angular OpenFeature propose deux principales façons de travailler avec les feature flags :

1. **Directives structurelles** - Pour le rendu conditionnel basé sur les modèles
2. **FeatureFlagService** - Pour un accès programmatique avec des **Observables** ou des **Signaux**

### Feature Flags booléens {#boolean-flags}

Utilisez des flags booléens pour les conditions on/off ou vrai/faux.

{{< tabs >}}
{{% tab "Directive structurelle" %}}
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

{{% tab "Signaux" %}}
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

### Feature Flags de chaîne {#string-flags}

Utilisez des flags de chaîne pour choisir entre plusieurs variantes ou chaînes de configuration.

{{< tabs >}}
{{% tab "Directive structurelle" %}}
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

{{% tab "Signaux" %}}
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

### Indicateurs numériques {#number-flags}

Utilisez des flags numériques pour les valeurs numériques telles que les limites, les pourcentages ou les multiplicateurs.

{{< tabs >}}
{{% tab "Directive structurelle" %}}
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

{{% tab "Signaux" %}}
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

### Indicateurs d'objet {#object-flags}

Utilisez des flags d'objet pour les données de configuration structurées.

{{< tabs >}}
{{% tab "Directive structurelle" %}}
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

{{% tab "Signaux" %}}
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

### Options supplémentaires {#additional-options}

#### Désactiver le rendu automatique {#disable-automatic-re-rendering}

Par défaut, les directives se réaffichent lorsque la valeur du flag change ou que le contexte change. Vous pouvez désactiver ce comportement :

{{< code-block lang="html" >}}
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;"
>
  This is shown when the feature flag is enabled.
</div>
{{< /code-block >}}

Les méthodes de service acceptent également des options pour contrôler les mises à jour automatiques :

{{< code-block lang="typescript" >}}
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {
  updateOnConfigurationChanged: false, // default: true
  updateOnContextChanged: false, // default: true
});
{{< /code-block >}}

#### Utiliser les détails d'évaluation {#consume-evaluation-details}

Vous pouvez accéder aux détails de l'évaluation dans vos modèles :

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

Lorsque la valeur de flag attendue est omise, le modèle est toujours rendu. Cela peut être utilisé pour rendre uniquement la valeur du flag ou les détails sans rendu conditionnel :

{{< code-block lang="html" >}}
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">
  The theme color is {{ value }}.
</div>
{{< /code-block >}}

Lors de l'utilisation du service, les méthodes de détail renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

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

## Configurer les options du fournisseur de navigateur {#configure-browser-provider-options}

Le fournisseur Angular utilise le fournisseur de navigateur Datadog, qui prend également en charge ces paramètres optionnels :

| Option | Par défaut | Utilisation |
| --- | --- | --- |
| `enableExposureLogging` | `true` | Envoyer les événements d'exposition vers l'ingestion d'expositions. |
| `enableFlagEvaluationTracking` | `true` | Envoyer la télémétrie d'évaluation agrégée. |
| `enableRumFeatureFlagTracking` | `true` | Ajouter les évaluations d'indicateurs aux événements RUM lorsque le RUM Browser est disponible. L'activation de cette option peut augmenter le nombre d'événements facturés par RUM. |
| `flagEvaluationTrackingInterval` | `10000` ms | Intervalle de vidage pour la télémétrie d'évaluation. |
| `initialFlagsConfiguration` | non défini | Fournissez des données précalculées correspondant au contexte comme solution de secours en cas d'échec de récupération. Consultez [Données de secours précalculées initiales][3]. |
| `flaggingProxy` | non défini | Récupérer les indicateurs via un proxy au lieu de `site`. |
| `customHeaders` | non défini | Ajouter des en-têtes aux requêtes de récupération d'indicateurs. |
| `overwriteRequestHeaders` | `false` | Remplacer les en-têtes de requête par défaut par `customHeaders`. |

`DatadogProvider` reste le fournisseur de navigateur recommandé pour les applications Angular. Pour la distribution de configuration appartenant à l'application ou l'évaluation de règles locales lors de changements de contexte, consultez [Browser Rules-Based Evaluation][4]. Cette configuration avancée nécessite un rafraîchissement explicite de la configuration et une gestion du cycle de vie du suivi.

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le `TypedInMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des feature flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `TypedInMemoryProvider` est exporté depuis `@openfeature/web-sdk`, qui est déjà installé pour Angular Feature Flags.

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

La structure des indicateurs du SDK Web nécessite `variants`, `defaultVariant` et `disabled`. Enregistrez le fournisseur en mémoire avant d'injecter des services ou de rendre des composants qui lisent les flags.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/sdks/client/web/angular/
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: /fr/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /fr/feature_flags/implementation_patterns/browser_rules_based_evaluation/