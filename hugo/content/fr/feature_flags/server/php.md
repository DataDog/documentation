---
description: Configurez Datadog Feature Flags pour les applications PHP.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/dd_libraries/php/
  tag: Documentation
  text: Traçage PHP
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
title: PHP Feature Flags
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application PHP avec le SDK Datadog Feature Flags. Le SDK PHP utilise la Remote Configuration du SDK Datadog pour recevoir les mises à jour des feature flags en temps réel.

Le SDK PHP fournit deux API d'application :

- **API PHP Datadog** : Utilisez `DDTrace\FeatureFlags\Client` avec des applications PHP 7 ou PHP 8.
- **Adaptateur OpenFeature** : Utilisez `DDTrace\OpenFeature\DataDogProvider` avec des applications PHP 8 qui utilisent l'API standard [OpenFeature][1].

L'évaluation des feature flags est locale et rapide. Le SDK utilise des données de configuration mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée lors de l'évaluation.

## Prérequis {#prerequisites}

Avant de configurer le SDK PHP Feature Flags, assurez-vous de disposer des éléments suivants :

- **Datadog Agent** avec [Remote Configuration][2] activée
- **Datadog [clé d'API][3]** configurée sur l'Agent
- **Datadog PHP SDK** `datadog/dd-trace` version 1.21.0 ou ultérieure
- **Environnement d'exécution PHP pris en charge** : PHP 7 ou ultérieur avec l'API PHP Datadog, ou PHP 8 ou ultérieur avec l'adaptateur OpenFeature
- **OpenFeature PHP SDK** `open-feature/sdk` version 2.1 ou ultérieure, si vous utilisez l'adaptateur OpenFeature

Définissez les variables d'environnement suivantes :

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the SDK
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_VERSION=<YOUR_APP_VERSION>

# Required for flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

<div class="alert alert-info">Le <code>EXPERIMENTAL_</code> Le préfixe est conservé pour la rétrocompatibilité ; le provider lui-même est stable.</div>

Pour configurer `feature_flag.evaluations`, y compris la version requise du traceur et la configuration OTLP de l'Agent, consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][6]. Pour plus d'informations sur les graphiques disponibles, consultez [Feature Flag Graphs][7].

## Installation {#installation}

Le feature flagging est fourni par Application Performance Monitoring (APM). Installez et configurez le traceur PHP Datadog en suivant [Tracing PHP Applications][4].

Si vous utilisez l'adaptateur OpenFeature dans une application PHP 8, installez le SDK PHP OpenFeature :

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Choisissez l'API qui correspond à votre environnement d'exécution PHP et à l'architecture de votre application.

### PHP 7 et PHP 8 : Datadog API {#php-7-and-php-8-datadog-api}

Utilisez `DDTrace\FeatureFlags\Client` directement dans les applications PHP 7 ou PHP 8 :

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
{{< /code-block >}}

### PHP 8 : Adaptateur OpenFeature {#php-8-openfeature-adapter}

Dans les applications PHP 8, vous pouvez enregistrer Datadog en tant que fournisseur OpenFeature :

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
{{< /code-block >}}

Le fournisseur OpenFeature renvoie des valeurs par défaut jusqu'à ce que Remote Configuration fournisse la configuration initiale des feature flags. Initialisez le fournisseur dès le démarrage de l'application afin que la configuration des feature flags ait le temps de se charger avant que la logique métier ne les évalue.

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez un contexte d'évaluation qui identifie l'utilisateur ou l'entité pour le ciblage des Feature Flags. La clé de ciblage est utilisée pour une distribution cohérente du trafic, comme les déploiements progressifs. Des attributs supplémentaires permettent des règles de ciblage, telles que « activer pour les utilisateurs aux États-Unis » ou « activer pour les utilisateurs de niveau premium ».

### Datadog API {#datadog-api}

Pour l'API PHP Datadog, transmettez le contexte sous forme de tableau avec les clés `targetingKey` et `attributes` :

{{< code-block lang="php" >}}
$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ],
];
{{< /code-block >}}

### Adaptateur OpenFeature {#openfeature-adapter}

Pour l'adaptateur OpenFeature, utilisez le `EvaluationContext` du SDK PHP OpenFeature :

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

<div class="alert alert-warning">Les attributs du contexte d'évaluation doivent être des valeurs primitives plates : chaînes de caractères, nombres et booléens. Les tableaux imbriqués, les objets et les valeurs nulles sont ignorés pour le ciblage et le rapport d'exposition ;</div>

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir configuré le client, vous pouvez évaluer les feature flags dans toute votre application. Chaque feature flag est identifié par une clé de chaîne unique et évalué avec une méthode typée qui renvoie une valeur du type attendu. Si le feature flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `getBooleanValue` pour les feature flags qui représentent des conditions activées/désactivées ou vrai/faux :

{{< code-block lang="php" >}}
$enabled = $flags->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

Avec OpenFeature :

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `getStringValue` pour les feature flags qui sélectionnent entre des variantes ou des chaînes de configuration :

{{< code-block lang="php" >}}
$theme = $flags->getStringValue('ui-theme', 'light', $context);

switch ($theme) {
    case 'dark':
        setDarkTheme();
        break;
    case 'light':
    default:
        setLightTheme();
        break;
}
{{< /code-block >}}

### Feature Flags numériques {#numeric-flags}

Pour les feature flags numériques, utilisez `getIntegerValue` ou `getFloatValue`. Ces méthodes sont appropriées lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="php" >}}
$maxItems = $flags->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $flags->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Pour les données structurées, utilisez `getObjectValue`. Ceci renvoie un tableau PHP :

{{< code-block lang="php" >}}
$config = $flags->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur du feature flag, utilisez les méthodes `get<Type>Details`. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

{{< code-block lang="php" >}}
$details = $flags->getBooleanDetails('new-feature', false, $context);

printf("Value: %s\n", $details->getValue() ? 'true' : 'false');
printf("Variant: %s\n", $details->getVariant() ?? 'none');
printf("Reason: %s\n", $details->getReason());

if ($details->isError()) {
    printf("Error Code: %s\n", $details->getErrorCode());
    printf("Error Message: %s\n", $details->getErrorMessage());
}
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

## Exemples complets{#complete-examples}

Les exemples suivants combinent l'initialisation, le contexte d'évaluation, l'évaluation typée et les détails de l'évaluation.

### PHP 7 et PHP 8 : Datadog API {#php-7-and-php-8-datadog-api-1}

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
        'tier' => 'premium',
    ],
];

$details = $flags->getStringDetails('checkout-copy', 'control', $context);

if ($details->isError()) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $details->getErrorCode(),
        $details->getErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

### PHP 8 : Adaptateur OpenFeature {#php-8-openfeature-adapter-1}

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('checkout-service', '1.0.0');
$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'country' => 'US',
        'tier' => 'premium',
    ])
);

$details = $client->getStringDetails('checkout-copy', 'control', $context);
$error = $details->getError();

if ($error !== null) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $error->getResolutionErrorCode()->getValue(),
        $error->getResolutionErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

## Évaluation sans contexte{#evaluation-without-context}

Vous pouvez évaluer des Feature Flags sans fournir de contexte d'évaluation. Ceci est utile pour les feature flags globaux qui ne nécessitent pas de ciblage spécifique à l'utilisateur :

{{< code-block lang="php" >}}
$maintenanceMode = $flags->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    http_response_code(503);
    echo 'Service temporarily unavailable';
    return;
}
{{< /code-block >}}

## Tests {#testing}

Vous pouvez tester contre un environnement de test Datadog dédié avec le véritable fournisseur Datadog, ou remplacer l'évaluation des feature flags par un double de test dans les tests unitaires.

Le SDK PHP OpenFeature 2.1 n'inclut pas de fournisseur en mémoire intégré. Pour les tests unitaires, encapsulez l'évaluation des feature flags derrière une interface d'application et injectez une fausse implémentation :

{{< code-block lang="php" filename="FeatureFlags.php" >}}
<?php

use DDTrace\FeatureFlags\Client;

interface FeatureFlagReader
{
    public function getBooleanValue($flagKey, $defaultValue, array $context = []);
}

final class DatadogFeatureFlagReader implements FeatureFlagReader
{
    private $client;

    public function __construct(Client $client = null)
    {
        $this->client = $client ?: new Client();
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return $this->client->getBooleanValue($flagKey, $defaultValue, $context);
    }
}

final class InMemoryFeatureFlagReader implements FeatureFlagReader
{
    private $flags;

    public function __construct(array $flags)
    {
        $this->flags = $flags;
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return array_key_exists($flagKey, $this->flags)
            ? (bool) $this->flags[$flagKey]
            : $defaultValue;
    }
}
{{< /code-block >}}

Utilisez le faux dans votre configuration de test :

{{< code-block lang="php" filename="CheckoutTest.php" >}}
$flags = new InMemoryFeatureFlagReader([
    'new-checkout-flow' => true,
]);

$checkout = new CheckoutService($flags);

self::assertTrue($checkout->usesNewCheckoutFlow('user-123'));
{{< /code-block >}}

## Dépannage {#troubleshooting}

### Les feature flags renvoient toujours des valeurs par défaut {#feature-flags-always-return-default-values}

Si les feature flags renvoient systématiquement des valeurs par défaut de manière inattendue, vérifiez les points suivants :

- Vérifiez que `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` est défini dans votre environnement d'application.
- Vérifiez que Remote Configuration est activé dans la configuration de votre Datadog Agent.
- Assurez-vous que `DD_SERVICE` et `DD_ENV` sont définis et correspondent au service et à l'environnement configurés pour votre feature flag.
- Confirmez que votre version du SDK PHP Datadog inclut la prise en charge des feature flags.
- Vérifiez que le processus PHP peut communiquer avec le Datadog Agent.

### Fournisseur OpenFeature introuvable{#openfeature-provider-not-found}

L'adaptateur OpenFeature est disponible uniquement pour les applications PHP 8. Si `DDTrace\OpenFeature\DataDogProvider` n'est pas trouvé :

- Vérifiez que l'application s'exécute sur PHP 8 ou une version ultérieure.
- Vérifiez que `open-feature/sdk` est installé via Composer.
- Vérifiez que la version du traceur PHP Datadog inclut la prise en charge des feature flags.

### Les règles de ciblage ne correspondent pas à {#targeting-rules-do-not-match}

Si les règles de ciblage ne correspondent pas comme prévu :

- Définissez un `targetingKey` stable pour l'utilisateur, l'organisation, la session ou l'entité en cours d'évaluation.
- Transmettez des données de ciblage personnalisées sous la clé `attributes` lors de l'utilisation de la Datadog API.
- Utilisez uniquement des attributs primitifs plats. Les tableaux imbriqués, les objets et les valeurs nulles sont ignorés.
- Vérifiez que la valeur `DD_ENV` apparaît dans [{{< ui >}}Feature Flag Environments{{< /ui >}}][5].

### Vérifiez les métriques d'évaluation des feature flags et les expositions dans Datadog {#verify-flag-metrics-and-exposures-in-datadog}

#### Métriques d'évaluation des feature flags {#flag-evaluation-metrics}

Les comptes d'évaluation des feature flags apparaissent dans Datadog lorsque `DD_METRICS_OTEL_ENABLED=true` est défini pour le traceur PHP. Chaque évaluation émet une métrique compteur `feature_flag.evaluations` étiquetée avec la clé du feature flag, la variante de résultat et la raison de l'évaluation. Si cette métrique n'apparaît pas, confirmez que `DD_METRICS_OTEL_ENABLED=true` est défini dans votre environnement et que votre version du traceur PHP prend en charge les métriques d'évaluation des feature flags. Consultez [Configurer les métriques d'évaluation des feature flags côté serveur][6] pour la configuration et le dépannage du récepteur OTLP de l'Agent.

#### Expositions d'expériences{#experiment-exposures}

Les expositions apparaissent dans Datadog uniquement pour les feature flags associés à une expérience. Les feature flags standards sans association à une expérience ne génèrent pas d'événements d'exposition. Si les expositions sont manquantes :

1. Vérifiez que le feature flag est associé à une expérience dans l'interface utilisateur Datadog.
2. Vérifiez que la `DD_API_KEY` de l'Agent est correcte et que l'Agent reçoit des événements.
3. Vérifiez que le contexte d'évaluation utilise des attributs primitifs plats. Les tableaux imbriqués, les objets et les valeurs nulles sont ignorés pour le rapport d'exposition.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /fr/agent/remote_config/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/tracing/trace_collection/dd_libraries/php/
[5]: /fr/feature_flags/concepts/environments/
[6]: /fr/feature_flags/guide/server_flag_evaluation_metrics/