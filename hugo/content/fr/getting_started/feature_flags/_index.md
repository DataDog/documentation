---
description: Gérez la livraison de fonctionnalités avec une observabilité intégrée,
  des métriques en temps réel et des déploiements progressifs compatibles avec OpenFeature.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: SDK côté client
- link: /feature_flags/server/
  tag: Documentation
  text: SDK côté serveur
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: Blog
  text: Livrez des fonctionnalités plus rapidement et en toute sécurité avec Datadog
    Feature Flags.
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: Blog
  text: Comment concilier vitesse et qualité dans les expérimentations grâce à des
    données unifiées
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: Blog
  text: Comment Datadog Feature Flags résiste aux pannes des fournisseurs cloud.
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilisez des métriques de garde-fou et cessez de microgérer vos déploiements.
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: Blog
  text: Chaque équipe devrait effectuer des tests A/B
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: L'écart de latence du signal produit qui ralentit votre croissance
site_support_id: getting_started_feature_flags
title: Prise en main des Feature Flags
---
## Vue d'ensemble {#overview}

Datadog Feature Flags offrent un moyen puissant et intégré de gérer la livraison de fonctionnalités, avec une observabilité intégrée et une intégration transparente sur toute la plateforme.

- **Métriques en temps réel :** Comprenez qui reçoit chaque variante, ainsi que l'impact de votre Feature Flag sur la santé et les performances de votre application, le tout en temps réel.

- **Prend en charge les types de flag courants :** Utilisez des variantes Boolean, string, integer, numeric (float/double) ou JSON. Les SDK JavaScript utilisent `getNumberValue()` pour les variantes entières et numériques, tandis que Java, Swift, Kotlin et Python exposent des méthodes d'évaluation distinctes pour les entiers et les nombres à virgule flottante.

- **Conçu pour l'expérimentation:** Ciblez des audiences spécifiques pour les tests A/B, déployez les fonctionnalités progressivement avec des canary releases, et effectuez automatiquement un retour en arrière lorsque des régressions sont détectées.

- **Compatible avec OpenFeature:** Construit selon la norme OpenFeature, garantissant la compatibilité avec les implémentations OpenFeature existantes et offrant une approche neutre vis-à-vis du fournisseur pour la gestion des feature flags.

## Feature Flags SDKs {#feature-flags-sdks}

Ce guide utilise le SDK navigateur JavaScript comme exemple. Vous pouvez intégrer Datadog Feature Flags dans n'importe quelle application en utilisant l'un des SDK suivants :

### SDK côté client {#client-side-sdks}

{{< card-grid card_width="200px" >}}
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

### SDK côté serveur {#server-side-sdks}

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

Votre organisation dispose probablement déjà d'environnements préconfigurés pour le développement, la préproduction et la production. Pour plus de détails sur les requêtes d'environnement, le marquage de production et la gestion des environnements, consultez [Environnements][4].

## Créez votre premier Feature Flag {#create-your-first-feature-flag}

<div class="alert alert-info">
Vous pouvez configurer les Feature Flags automatiquement avec le <a href="/feature_flags/feature_flag_mcp_server/">Feature Flags MCP Server</a>. Après la connexion, demandez à votre agent IA : « Aide-moi à configurer Datadog Feature Flags dans mon application. » Le serveur MCP examine votre base de code et installe le SDK et les extraits de code requis pour votre langage et votre framework.
</div>

### Étape 1 : Importer et initialiser le SDK {#step-1-import-and-initialize-the-sdk}

Choisissez le SDK correspondant à l'endroit où le flag est évalué et initialisez le fournisseur Datadog Feature Flags.

{{< tabs >}}
{{% tab "Navigateur JavaScript" %}}

Installez `@datadog/openfeature-browser`, `@openfeature/web-sdk` et `@openfeature/core` en tant que dépendances dans votre projet :

{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

Ensuite, ajoutez ce qui suit à votre projet pour initialiser le SDK :

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Les Browser Feature Flags ne sont pas pris en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    // Required client-side Datadog credentials
    applicationId: '<APPLICATION_ID>',
    clientToken: '<CLIENT_TOKEN>',
    site: '{{< region-param key="dd_site" code="true" >}}',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
{{< /code-block >}}

<div class="alert alert-info">Le SDK navigateur émet trois flux de télémétrie indépendants, tous activés par défaut. <code>enableExposureLogging</code> envoie des événements d'exposition par évaluation à l'ingestion des expositions. <code>enableFlagEvaluationTracking</code> envoie une télémétrie d'évaluation agrégée à l'ingestion de flag d'évaluation. <code>enableRumFeatureFlagTracking</code> attache les évaluations de flag aux événements RUM et constitue le paramètre susceptible d'affecter l'utilisation de RUM. Désactivez uniquement le flux dont vous n'avez pas besoin.</div>

{{% /tab %}}
{{% tab "Serveur Node.js" %}}

Installez `dd-trace` et le SDK serveur OpenFeature :

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Activez le fournisseur avec des variables d'environnement :

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Ou activez le fournisseur dans le code :

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

// Wait for the provider to initialize before evaluating flags.
await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Ajoutez les dépendances du SDK OpenFeature et du Datadog OpenFeature provider :

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.63.0'
}
{{< /code-block >}}

Activez le fournisseur et démarrez votre application avec le traceur Java :

{{< code-block lang="bash" >}}
# Required: Enable the feature flagging provider
# The EXPERIMENTAL_ prefix is historical; the provider is no longer experimental.
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

Pour émettre des métriques d'évaluation de flag, ajoutez les dépendances du SDK OpenTelemetry et configurez le endpoint OTLP. Consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][9].

Enregistrez le fournisseur OpenFeature Datadog :

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

Activez le fournisseur avec des variables d'environnement :

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Installez le SDK Datadog Python et le SDK OpenFeature :

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Enregistrez le fournisseur OpenFeature Datadog :

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Initialize the tracer (required for Remote Configuration)
tracer.configure()

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Aperçu des identifiants {#credentials-at-a-glance}

| Identifiant | Utilisé par | Destination | Sensible ? |
| --- | --- | --- | --- |
| Jeton client | SDK navigateur, mobile et jeu | Configuration de l'application client | Non — sûr à intégrer dans le code client public |
| ID d'application | SDK client basés sur le navigateur et RUM | Configuration de l'application client | Non — identifiant public |
| Clé d'API | Datadog Agent pour la Remote Configuration côté serveur | Configuration de l'agent uniquement | Oui — conserver uniquement côté serveur |

Ne placez pas de clés d'API dans les applications de navigateur, mobiles ou de jeu.

Plus d'informations sur les options de configuration du SDK OpenFeature sont disponibles dans sa [documentation][1]. Pour plus d'informations sur la création de jetons client et d'identifiants d'application, consultez [Clés d'API et d'application][3].

### Étape 2 : Créer un Feature Flag {#step-2-create-a-feature-flag}

Accédez à [{{< ui >}}Create Feature Flag{{< /ui >}}][2] dans Datadog et configurez les éléments suivants :

- **Nom et clé** : Le nom d'affichage du flag et la clé référencée dans le code
- **Canaux de distribution du SDK** : Contrôlez quels SDK reçoivent la configuration de votre flag ; consultez [Canaux de distribution][6]
- **Type de variante** et **valeurs de variante** : Consultez [Variantes et types de flag][5]

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} et {{< ui >}}variant values{{< /ui >}} doivent être considérés comme publics lorsqu'ils sont envoyés aux SDK client.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags-2.png" alt="Créer un Feature Flag" style="width:100%;" >}}

### Étape 3 : Évaluer le Feature Flag et écrire le code de la fonctionnalité {#step-3-evaluate-the-flag-and-write-feature-code}

Dans le code de votre application, utilisez le SDK pour évaluer le Feature Flag et restreindre l'accès à la nouvelle fonctionnalité.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< tabs >}}
{{% tab "Navigateur JavaScript" %}}

{{< code-block lang="javascript" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Serveur Node.js" %}}

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "email": "user@example.com",
        "tier": "premium"
    }
)

enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Une fois cette étape terminée, redéployez l'application pour prendre en compte ces modifications. Des exemples d'utilisation supplémentaires sont disponibles sur les pages des SDK spécifiques à la plateforme liées ci-dessus.

### Étape 4 : Définir les règles de ciblage et activer le Feature Flag {#step-4-define-targeting-rules-and-enable-the-feature-flag}

Configurez les [règles de ciblage][7] pour définir quels sujets reçoivent chaque variante. Après avoir enregistré vos règles, activez le Feature Flag dans l'environnement de votre choix.

<div class="alert alert-info">
En règle générale, déployez les modifications dans un environnement de préproduction avant la production.
</div>

Pour les déploiements par pourcentage, consultez [Traffic Splitting and Randomization][8].

### Étape 5 : Surveillez votre déploiement {#step-5-monitor-your-rollout}

Surveillez le déploiement de la fonctionnalité depuis la page des détails du Feature Flag, qui fournit un suivi de l'exposition en temps réel et des métriques telles que {{< ui >}}error rate{{< /ui >}} et {{< ui >}}page load time{{< /ui >}}. À mesure que vous publiez progressivement la fonctionnalité avec le Feature Flag, consultez le panneau {{< ui >}}Real-time metric overview{{< /ui >}} dans l'interface utilisateur Datadog pour voir comment la fonctionnalité affecte les performances de l'application.

{{< img src="getting_started/feature_flags/real-time-flag-metrics-2.png" alt="Panneau des métriques du Feature Flag en temps réel" style="width:100%;" >}}

Pour les applications côté serveur, vous pouvez également activer les métriques d'évaluation du Feature Flag pour suivre la fréquence à laquelle chaque variante est renvoyée et représenter les données graphiquement sur des tableaux de bord. Consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][9]. Pour associer des données du Feature Flag aux traces APM et filtrer les traces par variante, consultez [Set Up APM Trace Enrichment for Feature Flags][10].

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
[9]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[10]: /fr/feature_flags/guide/apm_trace_enrichment/