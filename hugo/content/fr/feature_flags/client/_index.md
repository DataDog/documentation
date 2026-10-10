---
aliases:
- /fr/feature_flags/setup/
description: Configurez Datadog Feature Flags pour les applications côté client.
further_reading:
- link: /feature_flags/
  tag: Documentation
  text: En savoir plus sur Feature Flags
- link: /getting_started/feature_flags/
  tag: Documentation
  text: Prise en main de Feature Flags
- link: feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
title: Feature Flags côté client
---
## Présentation {#overview}

Configurez Datadog Feature Flags pour vos applications. Suivez les guides spécifiques à la plateforme ci-dessous pour intégrer Feature Flags à votre application et commencer à collecter des données Feature Flags :

Datadog Feature Flags est basé sur le [standard OpenFeature](https://openfeature.dev/docs/reference/intro/), une spécification open-source et indépendante du fournisseur pour les API de feature flags. Si vous découvrez les concepts OpenFeature tels que les fournisseurs, le contexte d'évaluation et les hooks, consultez la [documentation sur les concepts OpenFeature](https://openfeature.dev/docs/category/concepts).

{{< card-grid card_width="200px">}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart et Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

## Options de télémétrie par plateforme {#telemetry-options-by-platform}

Les fournisseurs web, mobile et Unity exposent des contrôles de télémétrie similaires avec des noms d'options spécifiques à la plateforme. Chaque option exposée est définie par défaut sur `true`, les comportements listés sont donc activés par défaut ; définissez l'option sur `false` pour la désactiver.

Les options web ci-dessous s'appliquent à `DatadogProvider`, le fournisseur de navigateur recommandé. L'option avancée `DatadogCoreProvider` n'active pas la télémétrie automatiquement. Les applications qui l'utilisent enregistrent explicitement des hooks de suivi et gèrent leur cycle de vie. Consultez [Browser Rules-Based Evaluation][1].

<div class="alert alert-info">Le pont OpenFeature pour iOS (<a href="https://github.com/DataDog/dd-openfeature-provider-swift">dd-openfeature-provider-swift</a>) est disponible pour une utilisation en tant que package pré-1.0. Tant qu'il n'atteint pas la version 1.0, les mises à jour peuvent inclure des ruptures de compatibilité. Pour une surface d'API iOS plus stable, utilisez l' <code>FlagsClient</code> API directement.</div>

### Envoyer des événements d'exposition {#send-exposure-events}

Par défaut : `true`. Définissez l'option sur `false` pour la désactiver.

- **Web** (`@datadog/openfeature-browser`) : `enableExposureLogging`
- **Android** (`dd-sdk-android-flags`) : `trackExposures`
- **Dart et Flutter** (`datadog_flags`, `datadog_flags_flutter`) : `trackExposures`
- **iOS** (`DatadogFlags`) : `trackExposures`
- **React Native** : `trackExposures`
- **Unity** : `trackExposures`

### Envoyer la télémétrie d'évaluation agrégée {#send-aggregated-evaluation-telemetry}

Par défaut : `true`. Définissez l'option sur `false` pour la désactiver.

- **Web** (`@datadog/openfeature-browser`) : `enableFlagEvaluationTracking`
- **Android** (`dd-sdk-android-flags`) : `trackEvaluations`
- **Dart et Flutter** (`datadog_flags`, `datadog_flags_flutter`) : `trackEvaluations`
- **iOS** (`DatadogFlags`) : `trackEvaluations`
- **React Native** : Non exposé
- **Unity** : `trackEvaluations`

### Associez les évaluations au RUM {#attach-evaluations-to-rum}

Par défaut : `true`. Définissez l'option sur `false` pour la désactiver.

- **Web** (`@datadog/openfeature-browser`) : `enableRumFeatureFlagTracking`
- **Android** (`dd-sdk-android-flags`) : `rumIntegrationEnabled`
- **Flutter** (`datadog_flags_flutter`) : `rumIntegrationEnabled`
- **iOS** (`DatadogFlags`) : `rumIntegrationEnabled`
- **React Native** : `rumIntegrationEnabled`
- **Unity** : Non exposé

## Tests avec des fournisseurs en mémoire {#testing-with-in-memory-providers}

Datadog prend en charge ces approches de test :

- **Tests d'intégration** : pointez `DatadogProvider` vers un environnement de test dédié et contrôlez les valeurs des Feature Flags depuis l'interface utilisateur de Datadog. Ceci teste le fournisseur réel de bout en bout, y compris les assignations de feature flags délivrées par le CDN.
- **Tests unitaires** : remplacez `DatadogProvider` par le `InMemoryProvider` standard d'OpenFeature (ou un stub de test équivalent, lorsqu'aucun fournisseur en mémoire n'est disponible dans le langage) et définissez les valeurs des Feature Flags directement dans le code de test. Cela permet de garder les tests hermétiques et hors ligne.

Cette section couvre l'approche en mémoire. Comme l'API OpenFeature est conçue pour rendre les fournisseurs interchangeables au moment de l'exécution, votre code d'application ne change pas — seul le fournisseur enregistré lors de la configuration du test change.

Un test typique suit ce modèle :

1. Créez une map des clés de Feature Flags vers les variantes dans votre configuration de test.
2. Enregistrez un `InMemoryProvider` avec cette map via l'API OpenFeature.
3. Appelez le client OpenFeature dans les unités testées. Le `InMemoryProvider` renvoie les attributions de Feature Flags configurées lors de la configuration du test.
4. Réinitialisez le fournisseur lors du nettoyage du test pour éviter toute fuite d'état entre les tests.

Consultez la page SDK de votre plateforme (sélectionnez-la en haut de cette page) pour un exemple de test concret.

## Exigences relatives aux attributs de contexte {#context-attribute-requirements}

<div class="alert alert-warning">
Les attributs du contexte d'évaluation doivent être des valeurs primitives plates (chaînes, nombres, booléens). Les objets et tableaux imbriqués <strong>ne sont pas pris en charge</strong> et peuvent entraîner l'abandon silencieux des événements d'exposition.
</div>

Utilisez des attributs plats dans votre contexte d'évaluation :

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  userId: 'user-123',
  tier: 'premium',
  age: 25
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

Évitez les objets et les tableaux imbriqués :

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: 'user-123',
  user: { id: 'user-123' },        // nested object - NOT SUPPORTED
  features: ['beta', 'analytics']  // array - NOT SUPPORTED
};
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

Pour les déploiements basés sur des pourcentages et le partitionnement déterministe, consultez [Répartition et randomisation du trafic](/feature_flags/concepts/traffic_splitting/).

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/implementation_patterns/browser_rules_based_evaluation/