---
description: Configurez Datadog Feature Flags pour les applications Dart et Flutter.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /real_user_monitoring/application_monitoring/flutter/
  tag: Documentation
  text: Surveillance Flutter
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags
  tag: Code source
  text: Code source de datadog_flags
- link: https://github.com/DataDog/dd-sdk-flutter/tree/develop/packages/datadog_flags_flutter
  tag: Code source
  text: Code source de datadog_flags_flutter
title: Feature Flags Dart et Flutter
---
## Présentation {#overview}

Cette page décrit comment instrumenter des applications Dart et Flutter avec le SDK Datadog Feature Flags. Les indicateurs de fonctionnalité Datadog offrent un moyen unifié de contrôler à distance la disponibilité des fonctionnalités dans votre application et d'expérimenter en toute sécurité.

Le SDK Datadog Feature Flags pour Dart est un package Dart natif. Il récupère les attributions précalculées depuis Datadog, évalue localement les valeurs d'indicateurs typées et renvoie la télémétrie d'exposition et d'évaluation des indicateurs à Datadog. Les applications Flutter peuvent utiliser directement le package Dart autonome ou installer `datadog_flags_flutter` pour dériver la configuration de `datadog_flutter_plugin` et ajouter les évaluations réussies à RUM.

<div class="alert alert-info">Ce package fournit une API compatible OpenFeature pour Dart et Flutter, mais il n'est pas basé sur le SDK OpenFeature Dart. Utilisez directement les API de cette page. Datadog développe une intégration basée sur un fournisseur OpenFeature pour Dart et Flutter.</div>

## Installation {#installation}

Pour une application Flutter qui utilise déjà le SDK Flutter Datadog, installez `datadog_flags_flutter` :

{{< code-block lang="bash" >}}
flutter pub add datadog_flags_flutter
{{< /code-block >}}

`datadog_flags_flutter` dépend de `datadog_flutter_plugin` 3.4.0 ou version ultérieure.

Pour une utilisation autonome avec Dart, installez `datadog_flags` :

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="bash" >}}
dart pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}

{{% tab "Flutter" %}}
{{< code-block lang="bash" >}}
flutter pub add datadog_flags
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Importez ensuite l'API publique :

{{< tabs >}}
{{% tab "Dart" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';
{{< /code-block >}}
{{% /tab %}}

{{% tab "Intégration Flutter" %}}
{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Configuration intégrée à Flutter {#flutter-integrated-setup}

Utilisez cette configuration lorsque votre application Flutter initialise déjà `datadog_flutter_plugin`. Ajoutez `DatadogFlagsPluginConfiguration` à votre `DatadogConfiguration` existant avant d'initialiser le SDK Datadog. Le plugin dérive le jeton client, l'environnement, le site, le service, la version et l'ID d'application RUM de la configuration du SDK Flutter. Pour créer un jeton client, consultez [Jetons client][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Les Feature Flags Flutter ne sont pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
  service: '<SERVICE_NAME>',
  version: '<APP_VERSION>',
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  ),
)..addPlugin(
    const DatadogFlagsPluginConfiguration(
      flagsConfiguration: DatadogFlagsConfiguration(
        initializationTimeout: Duration(seconds: 2),
      ),
    ),
  );

await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
{{< /code-block >}}

Après l'initialisation, récupérez un client de flags depuis le plugin et initialisez-le avec le contexte d'évaluation pour le sujet actuel :

{{< code-block lang="dart" >}}
final flags = DatadogSdk.instance.flags;
if (flags == null) {
  return;
}

final flagsClient = flags.sharedClient();
try {
  await flagsClient.initialize(
    const FlagsEvaluationContext(
      targetingKey: 'user-123',
      attributes: {
        'companyId': 'company-456',
        'plan': 'enterprise',
      },
    ),
  );
} on FlagsInitializationTimeoutException {
  // Continue startup with stored assignments or evaluation defaults.
}
{{< /code-block >}}

Les évaluations réussies sont envoyées via le pipeline de télémétrie des Feature Flags Datadog. Avec la configuration intégrée à Flutter, les évaluations réussies qui renvoient une variante sont également ajoutées à la vue RUM active en tant qu'évaluations des indicateurs de fonctionnalité.

## Configuration Dart autonome {#standalone-dart-setup}

Utilisez cette configuration lorsque vous n'utilisez pas `datadog_flutter_plugin`, ou lorsque vous souhaitez gérer les Feature Flags indépendamment de l'initialisation du SDK Flutter.

Activez Datadog Feature Flags dès le démarrage de votre application. Pour la configuration des Feature Flags en direct, `clientToken`, `env` et `site` sont requis. Pour créer un jeton client, consultez [Jetons client][1].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Les Feature Flags Dart et Flutter ne sont pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="dart" >}}
final datadogFlags = DatadogFlags.instance;

await datadogFlags.enable(
  configuration: DatadogFlagsConfiguration(
    initializationTimeout: const Duration(seconds: 2),
    datadogConfig: const DatadogFlagsConfig(
      clientToken: '<CLIENT_TOKEN>',
      env: '<ENV_NAME>',
      site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
      applicationId: '<RUM_APPLICATION_ID>',
      service: '<SERVICE_NAME>',
      version: '<APP_VERSION>',
    ),
  ),
);
{{< /code-block >}}

`applicationId`, `service` et `version` sont facultatifs. Lorsqu'ils sont présents, le SDK les inclut dans le contexte de télémétrie des Feature Flags.

Utilisez la valeur `DatadogFlagsSite` qui correspond à votre organisation Datadog.

## Créer et récupérer un client {#create-and-retrieve-a-client}

Créez ou récupérez un client partagé une fois lors du démarrage de l'application :

{{< code-block lang="dart" >}}
final flagsClient = DatadogFlags.instance.sharedClient();
{{< /code-block >}}

Vous pouvez également créer plusieurs clients nommés pour des contextes d'évaluation indépendants :

{{< code-block lang="dart" >}}
final orgFlags = DatadogFlags.instance.sharedClient(name: 'org');
final userFlags = DatadogFlags.instance.sharedClient(name: 'user');
{{< /code-block >}}

Les clients sont locaux à l'isolat Dart où ils sont créés. Les isolats d'arrière-plan ne partagent pas les caches d'état ou d'affectation `DatadogFlags` avec l'isolat principal. Si un isolat d'arrière-plan doit évaluer des indicateurs, appelez `DatadogFlags.instance.enable()`, créez les clients dont il a besoin et initialisez-les indépendamment.

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi s'applique l'évaluation de l'indicateur en utilisant `FlagsEvaluationContext`. Le contexte d'évaluation inclut des informations sur l'utilisateur, l'organisation, la session ou l'appareil utilisées pour déterminer quelles variantes d'indicateur doivent être renvoyées. Appelez `initialize()` avant d'évaluer les indicateurs afin que le client puisse récupérer les affectations pour le contexte.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="dart" >}}
await flagsClient.initialize(
  const FlagsEvaluationContext(
    targetingKey: 'user-123',
    attributes: {
      'companyId': 'company-456',
      'plan': 'enterprise',
      'loggedIn': true,
    },
  ),
);
{{< /code-block >}}

Le `targetingKey` est le sujet de randomisation pour les déploiements en pourcentage. Les utilisateurs ayant la même clé de ciblage reçoivent toujours la même variante pour un indicateur donné.

`targetingKey` est facultatif. Si vous initialisez un contexte avant qu'un identifiant d'utilisateur ou d'organisation ne soit connu, le SDK envoie une chaîne vide pour la demande d'affectation précalculée.

Utilisez des clients nommés distincts pour des sujets d'évaluation distincts, tels que les utilisateurs déconnectés et connectés ou le ciblage au niveau de l'organisation et de l'utilisateur :

{{< code-block lang="dart" >}}
await orgFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'org-123'),
);

await userFlags.initialize(
  const FlagsEvaluationContext(targetingKey: 'user-456'),
);
{{< /code-block >}}

## Évaluer les Feature Flags {#evaluate-flags}

Une fois qu'un client est initialisé, vous pouvez lire les valeurs des indicateurs dans toute votre application. L'évaluation des indicateurs est _locale et instantanée_ car le SDK utilise des données d'affectation mises en cache localement. Aucune requête réseau n'est effectuée lors d'une évaluation typée.

Chaque méthode d'évaluation nécessite une valeur par défaut fournie par l'appelant. Les méthodes d'évaluation ne génèrent pas d'erreur en cas de disponibilité du fournisseur, d'indicateurs manquants ou d'incompatibilités de type. Elles renvoient une valeur `FlagDetails<T>` contenant la valeur évaluée, les métadonnées d'affectation et une erreur programmatique lorsque le SDK renvoie la valeur par défaut.

### Feature Flags booléens {#boolean-flags}

Utilisez `getBooleanDetails()` pour les indicateurs qui représentent des conditions activé/désactivé ou vrai/faux :

{{< code-block lang="dart" >}}
final details = flagsClient.getBooleanDetails(
  key: 'checkout.enabled',
  defaultValue: false,
);

if (details.error == null && details.value) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `getStringDetails()` pour les indicateurs qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'ui.theme',
  defaultValue: 'light',
);

if (details.value == 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}
{{< /code-block >}}

### Feature Flags entiers et doubles {#integer-and-double-flags}

Utilisez `getIntegerDetails()` ou `getDoubleDetails()` pour les indicateurs numériques, tels que les limites, les pourcentages ou les multiplicateurs :

{{< code-block lang="dart" >}}
final maxItems = flagsClient.getIntegerDetails(
  key: 'cart.items.max',
  defaultValue: 20,
);

final priceMultiplier = flagsClient.getDoubleDetails(
  key: 'pricing.multiplier',
  defaultValue: 1.0,
);
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Utilisez `getObjectDetails()` pour une configuration structurée compatible JSON :

{{< code-block lang="dart" >}}
final config = flagsClient.getObjectDetails(
  key: 'ui.config',
  defaultValue: const {
    'color': '#00A3FF',
    'fontSize': 14,
  },
);
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Utilisez les API de détails lorsque vous avez besoin de la valeur évaluée, de la variante, de la raison ou de l'erreur d'évaluation :

{{< code-block lang="dart" >}}
final details = flagsClient.getStringDetails(
  key: 'checkout.copy',
  defaultValue: 'Continue',
);

print(details.value);
print(details.variant);
print(details.reason);
print(details.error?.code);
{{< /code-block >}}

`FlagDetails.error` est défini lorsque le SDK renvoie la valeur par défaut car le fournisseur n'est pas prêt, l'indicateur est introuvable ou la valeur d'affectation ne correspond pas à la méthode d'évaluation avec typage. Les détails réussis incluent la valeur évaluée ainsi que les métadonnées d'affectation, telles que `variant` et `reason`, lorsque Datadog les a renvoyées.

## Configuration avancée {#advanced-configuration}

`DatadogFlagsConfiguration` contrôle le comportement du SDK :

{{< code-block lang="dart" >}}
DatadogFlagsConfiguration(
  datadogConfig: datadogConfig,
  initializationTimeout: const Duration(seconds: 2),
  trackExposures: true,
  trackEvaluations: true,
  evaluationFlushInterval: const Duration(seconds: 10),
  store: myStore,
);
{{< /code-block >}}

`trackExposures`
: Lorsque `true` (par défaut), le SDK enregistre les événements d'exposition pour les évaluations réussies dont les attributions sont marquées pour la journalisation. Définissez sur `false` pour désactiver le suivi de l'exposition.

`trackEvaluations`
: Lorsque `true` (par défaut), le SDK enregistre la télémétrie d'évaluation des indicateurs agrégés. Définissez sur `false` pour désactiver le suivi de l'évaluation.

`initializationTimeout`
: Temps maximum à attendre pour que le premier contexte d'évaluation soit prêt. Le délai d'attente utilise un budget de temps réel pour l'opération d'initialisation complète. Il couvre le chargement des attributions stockées, l'encodage de la requête, la récupération des attributions, la lecture du corps de la réponse, le décodage JSON, la publication des attributions et le stockage des attributions. Il ne modifie pas le délai d'attente du client HTTP.

  <br>Le délai d'attente s'applique uniquement au premier appel `initialize()` pour chaque client. Le premier appel consomme le délai d'attente même si l'opération échoue ou est remplacée. Les appels ultérieurs n'ont pas de minuteur d'initialisation. La valeur par défaut est de 5 secondes. Définissez la valeur sur `null`, zéro ou une durée négative pour désactiver le délai d'attente.

  Lorsque le délai d'attente expire, `initialize()` génère `FlagsInitializationTimeoutException`. L'opération d'attribution se poursuit et peut publier un résultat réussi tardif. Les attributions stockées correspondantes restent disponibles. Les évaluations sans affectation renvoient la valeur par défaut fournie par l'appelant avec `FlagEvaluationError.providerNotReady`.

  Dart exécute le minuteur de délai d'attente sur le même isolat que le travail d'initialisation synchrone. Par conséquent, le travail synchrone peut rendre l'attente observée plus longue que le délai d'attente configuré.

  <div class="alert alert-info"><code>initializationTimeout</code> est disponible dans <code>datadog_flags</code> et <code>datadog_flags_flutter</code> 1.1.0 et versions ultérieures.</div>

`evaluationFlushInterval`
: L'intervalle auquel la télémétrie d'évaluation des indicateurs agrégés est envoyée à Datadog. Les valeurs acceptées sont comprises entre 1 et 60 secondes. La valeur par défaut est de 10 secondes.

`store`
: Stockage facultatif des dernières affectations connues. Le SDK peut utiliser les affectations stockées correspondantes pendant qu'une nouvelle requête réseau est en cours ou indisponible.

`httpClient`, `customFlagsEndpoint`, `customExposureEndpoint` et `customEvaluationEndpoint`
: Remplacements avancés pour les tests, les proxys ou le routage personnalisé.

  <br>Si `enable()` est appelé sans `datadogConfig`, le SDK ne crée pas de fournisseur actif. Les évaluations renvoient la valeur par défaut fournie par l'appelant avec `FlagEvaluationError.providerNotReady`.

  Pour une configuration intégrée à Flutter, transmettez ces options via `DatadogFlagsPluginConfiguration` :

  {{< code-block lang="dart" >}}
  final configuration = DatadogConfiguration(
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENV_NAME>',
    site: DatadogSite.{{< region-param key="dd_site_name" code="true" >}},
    rumConfiguration: DatadogRumConfiguration(
      applicationId: '<RUM_APPLICATION_ID>',
    ),
  )..addPlugin(
      const DatadogFlagsPluginConfiguration(
        flagsConfiguration: DatadogFlagsConfiguration(
          initializationTimeout: Duration(seconds: 2),
          trackExposures: true,
          trackEvaluations: true,
        ),
        rumIntegrationEnabled: true,
      ),
    );
  {{< /code-block >}}

`rumIntegrationEnabled`
: Lorsque `true` (par défaut), les évaluations réussies qui renvoient une variante sont ajoutées à la vue RUM active en tant qu'évaluations d'indicateurs de fonctionnalité. Si votre application n'utilise pas RUM, cette option n'a aucun effet.

## Stockage des dernières affectations connues {#last-known-assignment-storage}

Le SDK conserve les affectations en mémoire après la réussite de `initialize()`. Pour restaurer les dernières affectations connues entre les instances du SDK, fournissez un `DatadogFlagsStore` :

{{< code-block lang="dart" >}}
class MyFlagsStore implements DatadogFlagsStore {
  @override
  Future<FlagsData?> read(String clientName) async {
    // Read and decode persisted FlagsData for this client name.
    return null;
  }

  @override
  Future<void> write(String clientName, FlagsData data) async {
    // Encode and persist successful assignments for this client name.
  }

  @override
  Future<void> delete(String clientName) async {
    // Delete persisted assignments for this client name.
  }
}
{{< /code-block >}}

Les affectations stockées ne sont utilisées que lorsque leur contexte d'évaluation correspond au contexte actif. Une récupération réussie en direct déplace toujours le client vers le nouvel état d'affectation et réécrit cet état dans le magasin.

Le paquet Dart ne choisit pas d'emplacement sur le disque et ne fournit pas de magasin sur disque spécifique à Flutter. Les applications Flutter peuvent implémenter `DatadogFlagsStore` avec leur mécanisme de stockage d'application préféré.

## Arrêt {#shutdown}

Appelez `shutdown()` lorsqu'un client n'est plus nécessaire. Cela vide les téléversements en attente d'exposition et d'évaluation des flags avant d'effacer les affectations en mémoire du client.

{{< code-block lang="dart" >}}
await flagsClient.shutdown();
{{< /code-block >}}

Appelez `DatadogFlags.instance.disable()` lorsque l'application arrête le SDK des flags :

{{< code-block lang="dart" >}}
await DatadogFlags.instance.disable();
{{< /code-block >}}

## Exemple complet {#complete-example}

L'exemple suivant active le SDK, initialise un client avec un contexte d'évaluation et évalue un flag booléen :

{{< code-block lang="dart" >}}
import 'package:datadog_flags/datadog_flags.dart';

Future<void> initializeFlags() async {
  final datadogFlags = DatadogFlags.instance;

  await datadogFlags.enable(
    configuration: DatadogFlagsConfiguration(
      initializationTimeout: const Duration(seconds: 2),
      datadogConfig: const DatadogFlagsConfig(
        clientToken: '<CLIENT_TOKEN>',
        env: '<ENV_NAME>',
        site: DatadogFlagsSite.{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        applicationId: '<RUM_APPLICATION_ID>',
        service: '<SERVICE_NAME>',
        version: '<APP_VERSION>',
      ),
    ),
  );

  final flagsClient = datadogFlags.sharedClient();
  try {
    await flagsClient.initialize(
      const FlagsEvaluationContext(
        targetingKey: 'user-123',
        attributes: {
          'companyId': 'company-456',
          'plan': 'enterprise',
        },
      ),
    );
  } on FlagsInitializationTimeoutException {
    // Continue startup with stored assignments or evaluation defaults.
  }

  final details = flagsClient.getBooleanDetails(
    key: 'checkout.enabled',
    defaultValue: false,
  );

  if (details.error == null && details.value) {
    showNewCheckoutFlow();
  }
}
{{< /code-block >}}

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le `DatadogFlagsClient` réel, ou isoler le code de l'application derrière une petite interface et substituer une implémentation fictive dans les tests unitaires. Cette section présente l'approche fictive, qui permet de garder les tests autonomes et hors ligne.

{{< code-block lang="dart" >}}
abstract interface class CheckoutFlags {
  bool newCheckoutEnabled();
}

final class DatadogCheckoutFlags implements CheckoutFlags {
  final DatadogFlagsClient client;

  DatadogCheckoutFlags(this.client);

  @override
  bool newCheckoutEnabled() {
    return client
        .getBooleanDetails(
          key: 'checkout.enabled',
          defaultValue: false,
        )
        .value;
  }
}

final class TestCheckoutFlags implements CheckoutFlags {
  @override
  bool newCheckoutEnabled() => true;
}
{{< /code-block >}}

Ensuite, injectez `TestCheckoutFlags` dans les tests unitaires et `DatadogCheckoutFlags` en production.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/#client-tokens