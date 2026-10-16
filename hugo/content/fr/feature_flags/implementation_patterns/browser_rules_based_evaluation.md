---
description: Utilisez DatadogCoreProvider pour les configurations de navigateur avancées
  avec une configuration gérée par l'application et des hooks de suivi optionnels.
further_reading:
- link: /feature_flags/client/javascript/
  tag: Documentation
  text: Feature Flags JavaScript
- link: /feature_flags/concepts/evaluation_context/
  tag: Documentation
  text: Contexte d'évaluation
- link: /feature_flags/concepts/distribution_channels/
  tag: Documentation
  text: Canaux de distribution
title: Évaluation basée sur les règles du navigateur
---
## Présentation {#overview}

**Utilisez `DatadogProvider` pour la plupart des applications de navigateur.** Il gère la récupération de la configuration, les mises à jour de contexte et la télémétrie intégrée. Suivez [JavaScript Feature Flags][1] pour cette configuration.

`DatadogCoreProvider` est un fournisseur avancé, compatible OpenFeature, qui évalue les configurations fournies par votre application. Il ne récupère ni n'interroge la configuration, n'installe pas de hooks de suivi et n'envoie pas de télémétrie. Avec une configuration basée sur des règles, il évalue les règles de ciblage localement lorsque le contexte OpenFeature change, sans récupérer de nouvelles affectations.

## Quand utiliser cette approche {#when-to-use-this-approach}

Choisissez `DatadogCoreProvider` lorsque votre application a besoin d'une ou plusieurs de ces capacités :

- Évaluez les règles de ciblage pour des contextes changeants sans requête de configuration pour chaque changement de contexte.
- Fournissez la configuration via un chemin de livraison contrôlé par l'application, tel qu'une charge utile d'amorçage rendue côté serveur.
- Contrôlez les actualisations de configuration et composez uniquement les intégrations de suivi dont l'application a besoin.

Votre application possède la disponibilité de la configuration, sa fraîcheur et le cycle de vie du suivi.

## Prérequis {#prerequisites}

- Installez `@datadog/openfeature-browser` 2.0.0 ou une version ultérieure, `@openfeature/web-sdk`, et `@openfeature/core`, en suivant les [instructions d'installation JavaScript][2]. Les exemples utilisent des importations de paquets npm.
- Pour récupérer les règles depuis Datadog, fournissez un [jeton client][3], un nom d'environnement et un site Datadog.
- L'activation de la livraison des règles client pour votre organisation nécessite l'autorisation **Feature Flag Environment Config Write**. Cette autorisation n'est pas nécessaire pour utiliser le SDK si le paramètre est déjà activé. Voir [Permissions and Access Control][9].
- Distribuez uniquement les indicateurs appropriés au navigateur vers le canal de distribution [**Client**][4].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

<div class="alert alert-warning">La configuration transmise à un navigateur est inspectable, y compris toutes les règles de ciblage et les valeurs qu'elle contient. Conservez les décisions sensibles de configuration et d'autorisation sur le serveur. Les flags côté client ne constituent pas un mécanisme de contrôle d'accès.</div>

## Mise en route {#getting-started}

Pour les applications de navigateur qui modifient le contexte d'évaluation de manière répétée au cours d'une session, utilisez `fetchRulesConfiguration()` avec `DatadogCoreProvider`. Chargez les règles une fois, puis réutilisez le fournisseur et la configuration pour les évaluations et les changements de contexte ultérieurs.

La facturation des Feature Flags comptabilise les [Monthly Flag Configuration Requests (MFCR)][7], et non les évaluations locales. La récupération initiale des règles et les actualisations ultérieures comptent pour les MFCR ; les changements de contexte locaux ne le font pas.

### Activez la distribution des règles client {#enable-client-rules-delivery}

Avant de récupérer les règles, activez la distribution des règles client pour votre organisation. Ce paramètre est désactivé par défaut.

1. Ouvrez **Feature Flags** > **Settings** > [**Flag Delivery**][8].
2. Activez **Allow local rule evaluation in client SDKs**.
3. Cliquez sur **Save**.

Ce paramètre est distinct du canal de distribution [**Client**][4] par indicateur. La configuration `DatadogProvider` précalculée standard ne le nécessite pas.

### Récupérez les règles et initialisez {#fetch-rules-and-initialize}

Importez `DatadogCoreProvider` et `fetchRulesConfiguration` depuis `@datadog/openfeature-browser/rules-based`. Récupérez les règles et validez le résultat avant de le fournir au fournisseur :

```javascript
import {
  DatadogCoreProvider,
  fetchRulesConfiguration,
} from '@datadog/openfeature-browser/rules-based';
import { OpenFeature } from '@openfeature/web-sdk';

const configurationOptions = {
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
};

async function loadRulesConfiguration() {
  const configuration = await fetchRulesConfiguration(configurationOptions);
  if (!configuration.rules) {
    throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
  }
  return configuration;
}

const configuration = await loadRulesConfiguration();
const provider = new DatadogCoreProvider();
provider.setConfiguration(configuration);

const domain = 'browser-flags';
await OpenFeature.setProviderAndWait(domain, provider, {
  targetingKey: 'user-123',
  plan: 'free',
});

const client = OpenFeature.getClient(domain);
const enabled = client.getBooleanValue('checkout_new', false);
```

L'assistant de récupération effectue la demande de configuration. L'enregistrement du fournisseur et l'évaluation du flag ne récupèrent pas la configuration. L'assistant accepte également une implémentation `fetch` et un `signal` d'abandon pour le transport contrôlé par l'application.

Capturez les erreurs d'initialisation dans le flux de démarrage de votre application et décidez s'il faut réessayer ou continuer avec le comportement par défaut. Ne supposez pas que le fournisseur est prêt si `setProviderAndWait()` rejette.

### Modifiez le contexte d'évaluation {#change-the-evaluation-context}

Utilisez le même domaine lors de la mise à jour du contexte :

{{< code-block lang="javascript" >}}
await OpenFeature.setContext(domain, {
  targetingKey: 'user-456',
  plan: 'premium',
});

const enabledForUpdatedContext = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

La configuration des règles reste en mémoire et est évaluée par rapport au nouveau contexte. N'appelez pas `loadRulesConfiguration()` à nouveau pour chaque changement de contexte. Aucune demande de configuration n'est effectuée. Des hooks de suivi optionnels peuvent toujours envoyer des données de télémétrie pour les évaluations.

Utilisez des [attributs de contexte plats][5] et fournissez explicitement les attributs nécessaires au ciblage. `DatadogCoreProvider` ne copie pas automatiquement les attributs utilisateur depuis RUM.

## Actualisez la configuration {#refresh-configuration}

Le fournisseur n'interroge pas les changements de flags. Choisissez le moment où l'application actualise la configuration, puis remplacez-la avant les évaluations ultérieures :

{{< code-block lang="javascript" >}}
try {
  const nextConfiguration = await loadRulesConfiguration();
  provider.setConfiguration(nextConfiguration);
} catch (error) {
  console.warn('Could not refresh flag configuration; keeping the previous configuration.', error);
}
{{< /code-block >}}

En cas d'échec de la récupération ou du parsing, le fournisseur continue d'utiliser la configuration précédente. L'exemple enregistre l'erreur ; ajoutez des tentatives selon les exigences de fraîcheur de votre application. Les modifications effectuées dans Datadog n'atteignent pas ce fournisseur tant que l'application ne fournit pas une configuration mise à jour.

## Optionnel : fournissez une configuration portable {#optional-supply-portable-configuration}

Au lieu de récupérer les règles dans le navigateur, votre application peut fournir une configuration de règles sérialisée. Créez cette chaîne en appelant `configurationToString(configuration)` sur une configuration de règles que vous avez déjà récupérée. Importez cet assistant depuis `@datadog/openfeature-browser/rules-based`.

Transmettez la chaîne résultante au navigateur via votre application, par exemple, dans une charge utile d'amorçage rendue côté serveur. Remplacez `<SERIALIZED_RULES_CONFIGURATION>` ci-dessous par cette chaîne, et utilisez ce code à la place de l'appel `loadRulesConfiguration()` dans l'exemple d'initialisation :

{{< code-block lang="javascript" >}}
import { configurationFromString } from '@datadog/openfeature-browser/rules-based';

const configuration = configurationFromString('<SERIALIZED_RULES_CONFIGURATION>');
if (!configuration.rules) {
  throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
}
{{< /code-block >}}

La chaîne sérialisée n'est pas la réponse binaire brute de l'endpoint des règles. Utilisez le mécanisme de sérialisation sécurisé du framework lors de l'intégration de la configuration dans le HTML. Le parsing et la fourniture de la chaîne ne constituent pas une demande de configuration.

### Configurations précalculées {#precomputed-configurations}

La configuration précalculée contient des affectations pour un contexte spécifique, et non des règles pouvant être réévaluées pour différents contextes. Si vous la fournissez à `DatadogCoreProvider`, passez le contexte renvoyé par `getPrecomputedContext(configuration)` à `setProviderAndWait()`. Un contexte non correspondant provoque une erreur de contexte invalide ; le fournisseur ne récupère pas les affectations de remplacement.

## Ajoutez des hooks de suivi optionnels {#add-optional-tracking-hooks}

Le fournisseur effectue des évaluations sans suivi par défaut. Ajoutez uniquement les intégrations dont l'application a besoin :

| Factory | Behavior |
| --- | --- |
| `createDatadogExposureLoggingHook(trackingOptions)` | Dédoublonne et traite par lots les événements d'exposition éligibles. |
| `createDatadogEvaluationLoggingHook(trackingOptions)` | Agrège et envoie la télémétrie d'évaluation des indicateurs. |
| `createDatadogRumTrackingHook()` | Ajoute les évaluations d'indicateurs à une instance `DD_RUM` globale existante. Il n'initialise pas RUM et ne remplit pas le contexte d'évaluation. |

Utilisez `composeDatadogTrackingHooks()` pour initialiser et arrêter les intégrations sélectionnées ensemble. Enregistrez ses hooks sur le client à partir de l'exemple d'initialisation avant les évaluations qui nécessitent un suivi :

```javascript
import {
  composeDatadogTrackingHooks,
  createDatadogExposureLoggingHook,
  createDatadogEvaluationLoggingHook,
  createDatadogRumTrackingHook,
} from '@datadog/openfeature-browser/rules-based';

const trackingOptions = {
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
  service: '<SERVICE_NAME>',
};

const tracking = composeDatadogTrackingHooks(
  createDatadogExposureLoggingHook(trackingOptions),
  createDatadogEvaluationLoggingHook(trackingOptions),
  createDatadogRumTrackingHook(),
);

await tracking.initialize();
client.addHooks(...tracking.hooks);

const trackedValue = client.getBooleanValue('checkout_new', false);
```

Ces hooks ne s'exécutent que pour les évaluations effectuées via cette instance de client. Continuez à utiliser le même client pour les évaluations suivies. Omettez l'import et l'appel de factory d'une intégration pour l'exclure. Le suivi RUM nécessite que [Browser RUM][6] soit disponible en tant que `DD_RUM` et peut augmenter le nombre d'événements facturés par RUM.

Les hooks d'exposition et d'évaluation ne collectent pas d'événements tant que `initialize()` n'est pas terminé. Les événements d'exposition sont regroupés et dédoublonnés, de sorte qu'une évaluation répétée peut ne pas créer une autre demande d'exposition.

Lorsque le suivi n'est plus nécessaire, désenregistrez les hooks et arrêtez leurs ressources :

{{< code-block lang="javascript" >}}
client.clearHooks();
await tracking.shutdown();
{{< /code-block >}}

`clearHooks()` supprime **tous les hooks au niveau du client** de ce client ; cet exemple suppose que le client est dédié à cette configuration de suivi. Il ne supprime pas les hooks globaux ou de fournisseur. `shutdown()` demande un vidage final et arrête les minuteurs et les abonnements de suivi ; le retour ne garantit pas que chaque requête réseau est terminée. L'effacement des hooks ou la suppression du fournisseur principal seul n'arrête pas les ressources de suivi créées manuellement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/client/javascript/
[2]: /fr/feature_flags/client/javascript/#installation
[3]: /fr/account_management/api-app-keys/#client-tokens
[4]: /fr/feature_flags/concepts/distribution_channels/
[5]: /fr/feature_flags/concepts/evaluation_context/#context-attributes
[6]: /fr/real_user_monitoring/application_monitoring/browser/
[7]: /fr/feature_flags/concepts/monthly_flag_configuration_requests/
[8]: https://app.datadoghq.com/feature-flags/settings/flag-delivery
[9]: /fr/feature_flags/concepts/permissions/