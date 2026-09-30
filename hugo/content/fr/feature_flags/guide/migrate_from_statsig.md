---
description: Apprenez à migrer les Feature Flags de Statsig vers Datadog Feature Flags.
further_reading:
- link: /feature_flags/
  tag: Documentation
  text: Présentation des Feature Flags
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
title: Migrez vos Feature Flags de Statsig.
---
## Présentation {#overview}

Ce guide décrit le processus de migration de votre logique de migration des Feature Flags de Statsig vers [Datadog Feature Flags][1]. Il couvre les mappages conceptuels, l'installation du SDK, l'initialisation et l'évaluation des flags.

## Liste de contrôle récapitulative {#summary-checklist}

* Remplacez `@statsig/js-client` par `@datadog/openfeature-browser`.
* Échangez `statsig.initialize` avec `OpenFeature.setProviderAndWait`.
* Convertissez `checkGate` en `client.getBooleanValue`.
* Convertissez `getDynamicConfig` en `client.getObjectValue` ou `client.getStringValue`.
* Convertissez `getLayer` en `client.getObjectValue` et déréférencez les champs de l'objet JSON renvoyé.
* Utilisez `targetingKey` dans le contexte pour identifier les utilisateurs et piloter la randomisation basée sur le pourcentage.
* Recréez vos flags Statsig dans Datadog.
* Pour les applications côté serveur, utilisez `@openfeature/server-sdk` et transmettez un contexte d'évaluation par requête au lieu d'un contexte global unique.

## Recréez les flags dans Datadog {#recreate-flags-in-datadog}

Avant de modifier les appels SDK dans votre application, recréez vos gates, dynamic configs et layers Statsig en tant que flags dans Datadog. Dans l'interface utilisateur de Datadog, accédez à **Software Delivery** > **Feature Flags** et créez des flags qui correspondent à vos clés, types de variant et règles de ciblage Statsig.

## Mappage conceptuel {#conceptual-mapping}

Les concepts fondamentaux entre Statsig et Datadog sont similaires, mais la terminologie diffère légèrement.

| Concept Statsig | Concept Datadog | Notes |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (booléen) | Basculements marche/arrêt de base. |
| **Dynamic Config** | **Feature Flag** (JSON/String variants) | Les Feature Flags dans Datadog peuvent renvoyer des chaînes, du JSON ou des nombres, couvrant les cas d'utilisation de Dynamic Config de Statsig. |
| **Layer** | **Feature Flag** (JSON variant) | Utilisez un feature flag à valeur JSON et lisez les champs de l'objet renvoyé, de manière similaire au déréférencement d'une Statsig layer. |
| **Experiment** | **Feature Flag** (with targeting) | Un feature flag Datadog peut être configuré avec des déploiements basés sur des pourcentages et des règles de ciblage spécifiques pour exécuter des experiments. Connectez les Feature Flags à [Datadog Experiments][5] pour mesurer l'impact sur les résultats utilisateur. |
| **User/StatsigUser** | **Evaluation Context** |  Le contexte (attributs) transmis au SDK pour évaluer les Feature Flags. |

## Installation {#installation}

Datadog conçoit ses SDK de Feature Flags pour une utilisation avec [OpenFeature][6]. Cela fournit une API indépendante du fournisseur tout en utilisant Datadog comme fournisseur sous-jacent.

Supprimez Statsig :

{{< code-block lang="bash" >}}
npm uninstall @statsig/js-client
# or
yarn remove @statsig/js-client
{{< /code-block >}}

Installez Datadog et OpenFeature :

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**Remarque** : Pour les applications React, installez également `@openfeature/react-sdk`. Consultez [React Feature Flags][7]. Pour les implémentations côté serveur, consultez la section [Contexte côté serveur et dynamique](#server-side-and-dynamic-context), ou [Server-Side Feature Flags][2] pour d'autres langages.

## Initialisation {#initialization}

Vous devez remplacer l'appel `statsig.initialize()` par la configuration du fournisseur OpenFeature. Transmettez le contexte d'évaluation à `setProviderAndWait` au moment de l'enregistrement afin que les Feature Flags soient évalués pour le bon utilisateur dès le départ.

### Statsig (ancien) {#statsig-old}

{{< code-block lang="javascript" >}}
import { StatsigClient } from '@statsig/js-client';

const client = new StatsigClient('client-sdk-key', { userID: 'user-123' });
await client.initializeAsync();
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new}

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

<div class="alert alert-info">Le <code>targetingKey</code> est utilisé comme sujet de randomisation pour le ciblage basé sur le pourcentage. Lorsqu'un indicateur cible un pourcentage de sujets (par exemple, 50 %), le <code>targetingKey</code> détermine dans quel bucket se trouve un utilisateur. Les utilisateurs ayant le même <code>targetingKey</code> reçoivent toujours la même variante pour un indicateur donné.</div>

Pour plus d'informations sur la création de jetons client et d'identifiants d'application, consultez [Clés d'API et d'application][4].

## Évaluer les Feature Flags (vérifier les gates) {#evaluate-flags-check-gates}

Remplacez les appels `checkGate` par ceux d'`getBooleanValue` d'OpenFeature.

### Statsig (ancien) {#statsig-old-1}

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new-1}

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

## Obtenir la configuration (dynamic configs) {#get-configuration-dynamic-configs}

Si vous utilisiez `getDynamicConfig` ou `getExperiment` pour récupérer des valeurs non booléennes (chaînes, JSON, nombres), utilisez la méthode typée appropriée dans OpenFeature.

### Statsig (ancien) {#statsig-old-2}

{{< code-block lang="javascript" >}}
const config = client.getDynamicConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new-2}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue<{ title: string }>('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## Mapper les layers aux Feature Flags d'objet JSON {#map-layers-to-json-object-flags}

Les Statsig layers regroupent les paramètres associés sous une seule évaluation. Dans Datadog, utilisez un feature flag à valeur JSON et lisez les champs dont vous avez besoin à partir de l'objet renvoyé.

### Statsig (ancien) {#statsig-old-3}

{{< code-block lang="javascript" >}}
const layer = client.getLayer('user_promo_experiments');
const promoTitle = layer.get('title', 'Welcome to Statsig!');
const discount = layer.get('discount', 0.1);
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new-3}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

const promoConfig = client.getObjectValue<{ title: string; discount: number }>('user_promo_experiments', {
  title: 'Welcome!',
  discount: 0.1,
});
const promoTitle = promoConfig.title;
const discount = promoConfig.discount;
{{< /code-block >}}

## Mettre à jour le contexte utilisateur après la connexion {#update-user-context-after-login}

Statsig met à jour le contexte utilisateur en utilisant `updateUser`. Dans OpenFeature et Datadog, mettez à jour le contexte après l'initialisation avec `OpenFeature.setContext()`, par exemple après la connexion d'un utilisateur.

### Statsig (ancien) {#statsig-old-4}

{{< code-block lang="javascript" >}}
await client.updateUserAsync({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' },
});
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new-4}

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
});
{{< /code-block >}}

## Tracking and Exposure {#tracking-and-exposure}

Dans Statsig, la vérification d'un gate enregistre automatiquement une exposure.

Dans Datadog, la télémétrie des Feature Flags se divise en deux catégories :

**Exposure logging** enregistre le fait qu'un sujet a reçu une flag variant spécifique. Chaque événement d'exposure inclut la flag key, la flag variant servie et le contexte d'évaluation. Utilisez les données d'exposure pour analyser les résultats des experiments et l'adoption des fonctionnalités.

**Evaluation logging** enregistre la fréquence à laquelle chaque flag variant est renvoyée. Les SDK clients envoient des comptes d'évaluation agrégés par défaut. Les SDKs serveur n'émettent la métrique `feature_flag.evaluations` qu'après l'activation de l'evaluation logging.

1. **SDKs client** : Exposure logging est activé par défaut. Le SDK envoie des exposure events à l'exposures intake. Vous pouvez les consulter dans la liste **Feature Flags**. Définissez `enableExposureLogging: false` dans la config `DatadogProvider` si vous n'avez pas besoin d'exposure tracking.

<div class="alert alert-warning">Paramètre <code>enableRumFeatureFlagTracking</code> par <code>true</code> peut avoir un impact sur les coûts <a href="/real_user_monitoring/">RUM</a>, car il ajoute des évaluations de Feature Flags aux événements RUM. Les deux <code>enableExposureLogging</code> et <code>enableRumFeatureFlagTracking</code> sont activés par défaut pour les SDKs client.</div>

2. **SDKs serveur** : Exposure logging est activé par défaut. Evaluation logging est désactivé par défaut. Pour envoyer des métriques d'évaluation depuis les SDK serveur, activez les métriques OpenTelemetry (par exemple, `DD_METRICS_OTEL_ENABLED=true`) et suivez les conseils spécifiques au langage dans [Server-Side Feature Flags][2].

## Contexte côté serveur et dynamique {#server-side-and-dynamic-context}

Les sections précédentes couvrent la migration côté navigateur et côté client, où le contexte d'évaluation est généralement statique pendant toute la durée de la session d'un utilisateur. Les applications côté serveur utilisent un SDK différent et s'authentifient avec une clé d'API Datadog au lieu d'un jeton client. Elles construisent également généralement un nouveau contexte d'évaluation pour chaque requête entrante.

Configurez les variables d'environnement requises avant d'initialiser le SDK serveur :

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
DD_ENV=<ENVIRONMENT_NAME>
{{< /code-block >}}

Consultez [Server-Side Feature Flags][2] pour obtenir la liste complète des options de configuration de l'Agent et de l'application.

Installez le SDK côté serveur. Cet exemple utilise le [SDK Feature Flags pour Node.js][3] :

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Enregistrez le fournisseur via le traceur Datadog :

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init();

await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

### Statsig (ancien) {#statsig-old-5}

{{< code-block lang="javascript" >}}
// The Statsig server SDK takes the user in each call
const isEnabled = statsig.checkGate(user, 'new_homepage_design');
{{< /code-block >}}

### Datadog (nouveau) {#datadog-new-5}

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

Le SDK navigateur utilise le contexte d'évaluation défini pour chaque évaluation de feature flag. Vous pouvez mettre à jour ce contexte avec `OpenFeature.setContext()` lorsque l'utilisateur se connecte ou que ses attributs changent. Le SDK serveur transmet plutôt un nouveau contexte d'évaluation dans chaque appel d'évaluation de feature flag, car un processus gère de nombreux utilisateurs différents.

Pour les autres langages serveur, consultez [Server-Side Feature Flags][2].

[1]: /fr/feature_flags/
[2]: /fr/feature_flags/server/
[3]: /fr/feature_flags/server/nodejs/
[4]: /fr/account_management/api-app-keys/
[5]: /fr/experiments/
[6]: https://openfeature.dev/
[7]: /fr/feature_flags/client/react/