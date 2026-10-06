---
description: Configurez Datadog Feature Flags pour les applications React.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentation
  text: Surveillance Browser
title: React Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application React avec le Datadog Feature Flags SDK. Datadog Feature Flags offre un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application, d'expérimenter en toute sécurité et de proposer de nouvelles expériences en toute confiance.

Le Datadog Feature Flags SDK pour React est basé sur [OpenFeature][1], un standard ouvert pour la gestion des feature flags. Ce guide explique comment installer le SDK, configurer le fournisseur Datadog et évaluer les feature flags dans vos composants React.

## Installation {#installation}

Installez le Datadog OpenFeature provider et l'OpenFeature React SDK en utilisant votre gestionnaire de paquets préféré :

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Initialiser le fournisseur {#initialize-the-provider}

Créez une instance `DatadogProvider` et enregistrez-la auprès d'OpenFeature. Faites cela le plus tôt possible dans votre application, avant le rendu de vos composants React. Pour la configuration en direct de Browser Feature Flags, `applicationId`, `clientToken`, `site` et `env` sont requis. Pour créer un jeton client, consultez [Jetons client][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

```javascript
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

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi l'évaluation de l'indicateur s'applique en utilisant un contexte d'évaluation. Le contexte d'évaluation inclut des informations sur l'utilisateur ou la session utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Référencez ces attributs dans vos règles de ciblage pour contrôler qui voit chaque variante.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

Définissez le fournisseur avec le contexte d'évaluation :

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">Le <code>targetingKey</code> est utilisé comme sujet de randomisation pour le ciblage basé sur le pourcentage. Lorsqu'un indicateur cible un pourcentage de sujets (par exemple, 50 %), le <code>targetingKey</code> détermine dans quel « compartiment » un utilisateur se trouve. Les utilisateurs ayant le même <code>targetingKey</code> reçoivent toujours la même variante pour un indicateur donné.</div>

## Enveloppez votre application {#wrap-your-application}

Enveloppez votre application avec le composant `OpenFeatureProvider`. Cela rend les Feature Flags disponibles pour tous les composants enfants via le contexte React.

{{< code-block lang="jsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
    <OpenFeatureProvider>
      <YourApp />
    </OpenFeatureProvider>
  );
}
{{< /code-block >}}

## Évaluer les Feature Flags {#evaluate-flags}

Le SDK OpenFeature React fournit des hooks pour évaluer les Feature Flags au sein de vos composants. Chaque hook renvoie la valeur du Feature Flag en fonction du contexte d'évaluation que vous avez configuré.

### Feature Flags booléens {#boolean-flags}

Utilisez `useBooleanFlagValue(key, defaultValue)` pour les Feature Flags qui représentent des conditions activées/désactivées ou vrai/faux :

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `useStringFlagValue(key, defaultValue)` pour les Feature Flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### Indicateurs numériques {#number-flags}

Utilisez `useNumberFlagValue(key, defaultValue)` pour les Feature Flags numériques tels que les limites, les pourcentages ou les multiplicateurs :

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Utilisez `useObjectFlagValue(key, defaultValue)` pour les données de configuration structurées :

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Prise en charge de Suspense {#suspense-support}

La prise en charge intégrée de [suspense](https://react.dev/reference/react/Suspense) vous permet d'éviter d'afficher les composants avec des indicateurs de fonctionnalité jusqu'à ce que l'initialisation du fournisseur soit terminée, ou lorsque le contexte change. Passez `{ suspend: true }` dans les options du hook pour utiliser cette fonctionnalité.

Par exemple :

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du Feature Flag, utilisez les hooks de détail. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

Par exemple :

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Exemple complet {#complete-example}

Voici un exemple complet montrant comment configurer et utiliser Datadog Feature Flags dans une application React :

```jsx
import { Suspense } from 'react';
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeatureProvider, OpenFeature, useBooleanFlagValue } from '@openfeature/react-sdk';

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

OpenFeature.setProvider(provider, evaluationContext);

// Wrap your app with the OpenFeatureProvider and Suspense for loading state
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <OpenFeatureProvider suspendUntilReady>
        <Page />
      </OpenFeatureProvider>
    </Suspense>
  );
}

// Use feature flags in your components
function Page() {
  const showNewFeature = useBooleanFlagValue('new_feature', false);

  return (
    <div>
      {showNewFeature ? <NewFeature /> : <ExistingFeature />}
    </div>
  );
}
```

## Mettre à jour le contexte d'évaluation {#update-the-evaluation-context}

Pour mettre e0 jour le contexte d'e9valuation apre8s l'initialisation (par exemple, lorsqu'un utilisateur se connecte), utilisez `OpenFeature.setContext()` :

{{< code-block lang="javascript" >}}
// When a user logs in
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Configurer les options du fournisseur de navigateur {#configure-browser-provider-options}

Le fournisseur React utilise le fournisseur de navigateur Datadog, qui prend également en charge ces paramètres optionnels :

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

`DatadogProvider` reste le fournisseur de navigateur recommandé pour les applications React. Pour la distribution de configuration appartenant à l'application ou l'évaluation de règles locales lors de changements de contexte, consultez [Browser Rules-Based Evaluation][4]. Cette configuration avancée nécessite un rafraîchissement explicite de la configuration et une gestion du cycle de vie du suivi.

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogProvider` réel, ou le remplacer par le `TypedInMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des feature flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `TypedInMemoryProvider` est exporté depuis `@openfeature/web-sdk` ; installez-le en tant que dépendance de développement et enregistrez-le avant de rendre les composants à tester :

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

await OpenFeature.setProviderAndWait(new TypedInMemoryProvider({
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
}));
{{< /code-block >}}

La structure des indicateurs du SDK Web nécessite `variants`, `defaultVariant` et `disabled`. Utilisez `setProviderAndWait` (et non `setProvider`) pour éviter les courses de suspense lorsque le test rend immédiatement des composants protégés par des feature flags. Pour les tests de composants qui montent un arbre React, `@openfeature/react-sdk` exporte également un composant `OpenFeatureTestProvider` qui enveloppe les enfants avec un fournisseur en mémoire — consultez la [documentation de l'OpenFeature React SDK](https://openfeature.dev/docs/reference/technologies/client/web/react) pour plus de détails.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: /fr/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /fr/feature_flags/implementation_patterns/browser_rules_based_evaluation/