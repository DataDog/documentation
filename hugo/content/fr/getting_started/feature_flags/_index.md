---
description: Gérez la livraison des fonctionnalités avec une observabilité intégrée,
  des métriques en temps réel et des déploiements progressifs compatibles avec OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: SDKs côté client
- link: /feature_flags/server/
  tag: Documentation
  text: SDKs côté serveur
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: Blog
  text: Déployez des fonctionnalités plus rapidement et en toute sécurité avec Datadog
    Feature Flags
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: Blog
  text: Comment concilier rapidité et qualité dans les expériences grâce à des données
    unifiées
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: Blog
  text: Comment Datadog Feature Flags est résilient face aux pannes des fournisseurs
    de cloud
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilisez des métriques de garde-fou et cessez de microgérer vos versions
site_support_id: getting_started_feature_flags
title: Commencer avec les drapeaux de fonctionnalités
---
## Aperçu {#overview}

Datadog Feature Flags offre un moyen puissant et intégré de gérer la livraison des fonctionnalités, avec une observabilité intégrée et une intégration transparente sur la plateforme.

- **Métriques en temps réel :** Comprenez qui reçoit chaque variante, ainsi que l'impact de votre drapeau sur la santé et la performance de votre application, le tout en temps réel.

- **Prend en charge tout type de données :** Utilisez des booléens, des chaînes, des nombres ou des objets JSON complets, selon les besoins de votre cas d'utilisation.

- **Conçu pour l'expérimentation :** Ciblez des audiences spécifiques pour des tests A/B, déployez des fonctionnalités progressivement avec des canary releases, et revenez automatiquement en arrière lorsque des régressions sont détectées.

- **Compatible avec OpenFeature :** Basé sur la norme OpenFeature, garantissant la compatibilité avec les implémentations OpenFeature existantes et offrant une approche neutre vis-à-vis des fournisseurs pour la gestion des drapeaux de fonctionnalités.

## SDKs de drapeaux de fonctionnalités {#feature-flags-sdks}

Ce guide utilise le SDK JavaScript pour navigateur comme exemple. Vous pouvez intégrer Datadog Feature Flags dans n'importe quelle application en utilisant l'un des SDK suivants :

### SDKs côté client {#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### SDKs côté serveur {#server-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## Configurez vos environnements {#configure-your-environments}

Votre organisation dispose probablement déjà d'environnements préconfigurés pour Development, Staging et Production. Pour des détails sur les requêtes d'environnement, le marquage de production et la gestion des environnements, consultez [Environnements][4].

## Créez votre premier drapeau de fonctionnalité {#create-your-first-feature-flag}

### Étape 1 : Importez et initialisez le SDK {#step-1-import-and-initialize-the-sdk}

Tout d'abord, installez `@datadog/openfeature-browser`, `@openfeature/web-sdk` et `@openfeature/core` en tant que dépendances dans votre projet :

```
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
```

Ensuite, ajoutez ce qui suit à votre projet pour initialiser le SDK :

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

<div class="alert alert-warning">Paramétrage <code>enableExposureLogging</code> par <code>true</code> peut impacter les coûts de <a href="https://docs.datadoghq.com/real_user_monitoring/">RUM</a>, car il envoie des événements d'exposition à Datadog via RUM. Vous pouvez le désactiver si vous n'avez pas besoin de suivre l'exposition des fonctionnalités ou le statut des métriques de garde-fou.</div>

Plus d'informations sur les options de configuration du SDK OpenFeature peuvent être trouvées dans sa [documentation][1]. Pour plus d'informations sur la création de jetons clients et d'ID d'application, consultez [API et clés d'application][3].

### Étape 2 : Créez un drapeau de fonctionnalité {#step-2-create-a-feature-flag}

Allez à [{{< ui >}}Create Feature Flag{{< /ui >}}][2] dans Datadog et configurez ce qui suit :

- **Nom et clé** : Le nom d'affichage du drapeau et la clé référencée dans le code
- **Type de variante** et **valeurs de variante** : Voir [Variantes et types de drapeaux][5]
- **Canaux de distribution** : Voir [Canaux de distribution][6]

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} et {{< ui >}}variant values{{< /ui >}} doivent être considérés comme publics lorsqu'ils sont envoyés aux SDK clients.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags.png" alt="Créer un drapeau de fonctionnalité" style="width:100%;" >}}

### Étape 3 : Évaluez le drapeau et écrivez le code de fonctionnalité {#step-3-evaluate-the-flag-and-write-feature-code}

Dans votre code d'application, utilisez le SDK pour évaluer le drapeau et contrôler l'accès à la nouvelle fonctionnalité.

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

Après avoir terminé cette étape, redéployez l'application pour prendre en compte ces modifications. Des exemples d'utilisation supplémentaires peuvent être trouvés dans la [documentation][1] du SDK.

### Étape 4 : Définir les règles de ciblage et activer le drapeau de fonctionnalité {#step-4-define-targeting-rules-and-enable-the-feature-flag}

Configurez les [règles de ciblage][7] pour définir quels sujets reçoivent chaque variante. Après avoir enregistré vos règles, activez le drapeau dans l'environnement de votre choix.

<div class="alert alert-info">
En tant que meilleure pratique, déployez les modifications dans un environnement Staging avant Production.
</div>

Pour les déploiements par pourcentage, consultez [Traffic Splitting and Randomization][8].

### Étape 5 : Surveillez votre déploiement {#step-5-monitor-your-rollout}

Surveillez le déploiement de la fonctionnalité depuis la page de détails du drapeau de fonctionnalité, qui fournit un suivi d'exposition en temps réel et des métriques telles que {{< ui >}}error rate{{< /ui >}} et {{< ui >}}page load time{{< /ui >}}. Au fur et à mesure que vous déployez progressivement la fonctionnalité avec le drapeau, consultez le panneau {{< ui >}}Real-Time Metric Overview{{< /ui >}} dans l'interface utilisateur de Datadog pour voir comment la fonctionnalité impacte les performances de l'application.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Panneau des métriques de drapeau en temps réel" style="width:100%;" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[4]: /fr/feature_flags/concepts/environments/
[5]: /fr/feature_flags/concepts/variants_and_flag_types/
[6]: /fr/feature_flags/concepts/distribution_channels/
[7]: /fr/feature_flags/concepts/targeting_rules/
[8]: /fr/feature_flags/concepts/traffic_splitting/