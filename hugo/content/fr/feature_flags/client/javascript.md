---
description: Configurez les Datadog Feature Flags pour les applications JavaScript
  pour navigateur.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: https://openfeature.dev/docs/reference/sdks/client/web/
  tag: OpenFeature
  text: SDK Web OpenFeature
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentation
  text: Surveillance Browser
- link: /feature_flags/browser_developer_extension/
  tag: Documentation
  text: Extension de développement pour navigateur
title: Feature Flags JavaScript
---
## Vue d'ensemble {#overview}

Cette page décrit comment instrumenter votre application JavaScript de navigateur avec le SDK Datadog Feature Flags. Les Datadog Feature Flags offrent un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Le SDK Datadog Feature Flags pour JavaScript est basé sur [OpenFeature][1], un standard ouvert pour la gestion des Feature Flags. Ce guide explique comment installer le SDK, configurer le fournisseur Datadog et évaluer les indicateurs dans votre application.

## Installation {#installation}

Installez le fournisseur OpenFeature de Datadog et le SDK Web OpenFeature à l'aide de votre gestionnaire de paquets préféré :

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Initialiser le fournisseur {#initialize-the-provider}

Créez une instance `DatadogProvider` avec vos identifiants Datadog. Pour la configuration en direct des Feature Flags de navigateur, `applicationId`, `clientToken`, `site` et `env` sont requis. Pour créer un jeton client, consultez [Jetons client][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Les Browser Feature Flags ne sont pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

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

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi l'évaluation de l'indicateur s'applique en utilisant un contexte d'évaluation. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Référencez ces attributs dans vos règles de ciblage pour contrôler qui voit chaque variante.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">Le <code>targetingKey</code> est utilisé comme sujet de randomisation pour le ciblage basé sur le pourcentage. Lorsqu'un indicateur cible un pourcentage de sujets (par exemple, 50 %), le <code>targetingKey</code> détermine dans quel « compartiment » un utilisateur se trouve. Les utilisateurs ayant le même <code>targetingKey</code> reçoivent toujours la même variante pour un indicateur donné.</div>

La plupart des applications exécutent plusieurs tâches asynchrones au démarrage, comme la récupération de données depuis un autre service ou le chargement de la configuration. Cet exemple montre uniquement l'initialisation des Feature Flags. En guise de bonne pratique, lancez toutes vos promesses de démarrage ensemble et attendez-les en groupe (par exemple, avec `Promise.all`) juste avant que les résultats ne soient nécessaires, plutôt que d'attendre chacune d'elles séquentiellement. Cela permet de maintenir le temps de démarrage total proche de celui de la tâche la plus lente au lieu de la somme de toutes les tâches.

## Évaluer les Feature Flags {#evaluate-flags}

Une fois le fournisseur initialisé, vous pouvez évaluer les flags n'importe où dans votre application. L'évaluation des flags est _locale et instantanée_ : le SDK utilise des données mises en cache localement, donc aucune requête réseau n'est effectuée lors de l'évaluation des flags.

### Obtenez un client {#get-a-client}

Récupérez le client OpenFeature pour évaluer les indicateurs :

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### Feature Flags booléens {#boolean-flags}

Utilisez `getBooleanValue(key, defaultValue)` pour les indicateurs qui repre9sentent des conditions active9/de9sactive9 ou vrai/faux :

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `getStringValue(key, defaultValue)` pour les indicateurs qui permettent de choisir entre plusieurs variantes ou chaeenes de configuration :

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui_theme', 'light');

switch (theme) {
  case 'dark':
    setDarkTheme();
    break;
  case 'light':
  default:
    setLightTheme();
}
{{< /code-block >}}

### Indicateurs numériques {#number-flags}

Utilisez `getNumberValue(key, defaultValue)` pour les indicateurs nume9riques tels que les limites, les pourcentages ou les multiplicateurs :

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Utilisez `getObjectValue(key, defaultValue)` pour les donne9es de configuration structure9es :

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur de l'indicateur, utilisez les méthodes de détail. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Evaluated value (true or false)
console.log(details.variant);     // Variant name, if applicable
console.log(details.reason);      // Why this value was chosen
console.log(details.errorCode);   // Error code, if evaluation failed
{{< /code-block >}}

## Exemple complet {#complete-example}

Voici un exemple complet montrant comment configurer et utiliser les Datadog Feature Flags dans une application JavaScript :

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);

// Get the client and evaluate flags
const client = OpenFeature.getClient();
const showNewFeature = client.getBooleanValue('new_feature', false);

if (showNewFeature) {
  console.log('New feature is enabled!');
}
```

## Mettre à jour le contexte d'évaluation {#update-the-evaluation-context}

Pour mettre e0 jour le contexte d'e9valuation apre8s l'initialisation (par exemple, lorsqu'un utilisateur se connecte), utilisez `OpenFeature.setContext()` :

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Configurer les options du fournisseur de navigateur {#configure-browser-provider-options}

Le fournisseur web prend e9galement en charge ces parame8tres optionnels :

| Option | Par défaut | Utilisation |
| --- | --- | --- |
| `enableExposureLogging` | `true` | Envoyer les événements d'exposition vers l'ingestion d'expositions. |
| `enableFlagEvaluationTracking` | `true` | Envoyer la télémétrie d'évaluation agrégée. |
| `enableRumFeatureFlagTracking` | `true` | Ajouter les évaluations d'indicateurs aux événements RUM lorsque le RUM Browser est disponible. L'activation de cette option peut augmenter le nombre d'événements facturés par RUM. |
| `flagEvaluationTrackingInterval` | `10000` ms | Intervalle de vidage pour la télémétrie d'évaluation. |
| `initialFlagsConfiguration` | `{}` | Initialiser avec des indicateurs précalculés. |
| `flaggingProxy` | non défini | Récupérer les indicateurs via un proxy au lieu de `site`. |
| `customHeaders` | non défini | Ajouter des en-têtes aux requêtes de récupération d'indicateurs. |
| `overwriteRequestHeaders` | `false` | Remplacer les en-têtes de requête par défaut par `customHeaders`. |

## Remplacer les indicateurs dans votre navigateur {#override-flags-in-your-browser}

Pour parcourir les indicateurs de votre organisation et les remplacer localement pendant votre développement, intégrez le wrapper `DatadogDevtools` dans votre pile de fournisseurs et utilisez l'onglet **Feature Flags** dans l'[extension développeur du SDK Browser Datadog][3].

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le `InMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des indicateurs dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `InMemoryProvider` est exporté directement depuis `@openfeature/web-sdk`, aucune dépendance supplémentaire n'est donc requise.

Contrairement au SDK côté serveur, le SDK Web évalue les indicateurs de manière synchrone après l'initialisation. Toujours `await` `setProviderAndWait` une fois dans `beforeEach` pour vous assurer que le fournisseur est prêt.

{{< code-block lang="javascript" >}}
import { beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
  ui_theme: {
    variants: { dark: 'dark', light: 'light' },
    defaultVariant: 'light',
    disabled: false,
  },
};

beforeEach(async () => {
  await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
  await OpenFeature.close();
});

test('new checkout button is enabled by default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('new_checkout_button', false)).toBe(true);
});

test('missing flag returns default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('does-not-exist', false)).toBe(false);
});
{{< /code-block >}}

La structure des indicateurs du SDK Web nécessite `variants`, `defaultVariant` et `disabled`. L'omission de l'un de ces éléments entraîne l'échec de la compilation TypeScript ; au moment de l'exécution, l'évaluation d'une clé de drapeau inconnue renvoie la valeur par défaut fournie. Privilégiez `TypedInMemoryProvider` à `InMemoryProvider` , obsolète, pour des configurations d'indicateurs vérifiées par type. Le même modèle de test fonctionne avec Jest + jsdom ; remplacez les importations `vitest` par `@jest/globals` et ajoutez `jest-environment-jsdom` à votre projet.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: /fr/feature_flags/browser_developer_extension/