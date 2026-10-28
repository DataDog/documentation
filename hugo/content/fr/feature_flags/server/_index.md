---
description: Configurez les Datadog Feature Flags pour les applications côté serveur.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /remote_configuration/
  tag: Documentation
  text: Remote Configuration
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
- link: /feature_flags/implementation_patterns/serverless/
  tag: Documentation
  text: Environnements serverless et Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration du SDK serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
title: Feature Flags côté serveur
---
## Vue d'ensemble {#overview}

Les Datadog Feature Flags pour les applications côté serveur vous permettent de contrôler à distance la disponibilité des fonctionnalités, d'exécuter des expériences et de déployer de nouvelles fonctionnalités en toute confiance. Les SDK côté serveur reçoivent la configuration des Feature Flags et les évaluent localement. Certains SDK utilisent un traceur Datadog pour la distribution de la configuration ou la télémétrie.

Les Datadog Feature Flags sont basés sur le [standard OpenFeature](https://openfeature.dev/docs/reference/intro/), une spécification open source et indépendante du fournisseur pour les API des Feature Flags. Si vous découvrez les concepts OpenFeature tels que les fournisseurs, le contexte d'évaluation et les hooks, consultez la [documentation sur les concepts OpenFeature](https://openfeature.dev/docs/category/concepts).

## Distribution de la configuration {#configuration-delivery}

La [distribution de la configuration][8] agentless est la valeur par défaut dans les versions du SDK serveur qui la prennent en charge. Le SDK récupère la configuration des Feature Flags directement depuis le CDN géré par Datadog via HTTPS, puis évalue les Feature Flags localement. Un Datadog Agent n'est pas requis pour la configuration des Feature Flags.

La source par défaut n'active pas le trafic des Feature Flags pour chaque installation de traceur. L'interrogation agentless ne commence que lorsque le code de l'application initialise ou accède au fournisseur OpenFeature de Datadog. La sélection explicite de `remote_config` active l'abonnement à Feature Flags Remote Configuration. Les requêtes provenant de l'une ou l'autre source contribuent à la facturation des Feature Flags du serveur.

| SDK | Version minimale agentless |
|---|---|
| Java `dd-openfeature` et `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

La distribution par CDN pour Java nécessite `dd-openfeature` et `dd-java-agent`. Elle ne nécessite pas de Datadog Agent pour la configuration des Feature Flags.

<div class="alert alert-warning">Les versions initiales agentless pour Node.js prennent uniquement en charge la distribution de la configuration et l'évaluation locale des Feature Flags. Ils n'exportent pas de métriques d'évaluation ni d'événements d'exposition. La livraison agentless pour Java et Python modifie uniquement la source de configuration. Java et Python n'exportent pas ces signaux sans un Datadog Agent pris en charge ou un chemin de télémétrie serverless.</div>

La distribution agentless est disponible pour les SDK et les versions répertoriés. Les autres SDK serveur utilisent la Agent Remote Configuration.

## Choisir une langue {#choose-a-language}

Sélectionnez votre langue ou votre framework pour afficher les instructions de configuration spécifiques au SDK :

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

Pour les environnements d'exécution serverless, consultez [Environnements serverless][5] pour la configuration agentless, les exigences de version et les limitations initiales de télémétrie.

## Prérequis {#prerequisites}

Les exigences dépendent du SDK sélectionné et de la source de configuration. Les exigences standard incluent :

- Les versions du traceur spécifique au langage ou du fournisseur OpenFeature répertoriées sur la page du SDK
- Une [clé d'API] Datadog[2]

La distribution CDN Java nécessite l'agent Java dans le processus d'application. Elle ne nécessite pas de traçage APM ni de service Datadog Agent distinct.

Les exigences spécifiques à la source sont :

| Source | Exigences |
|---|---|
| `agentless` (par défaut là où pris en charge) | Configurez `DD_API_KEY`, `DD_SITE` et `DD_ENV` dans le processus d'application. Aucun Agent n'est requis pour la configuration des Feature Flags. |
| `remote_config` | Datadog Agent 7.55 ou version ultérieure avec la Remote Configuration activée, la clé d'API configurée sur l'Agent, et la Remote Configuration activée pour votre organisation dans [{{< ui >}}Organization Settings{{< /ui >}}][3]. Java nécessite également des versions compatibles de `dd-openfeature` et `dd-java-agent`. |

## Configuration agentless {#agentless-configuration}

Sur une [version de SDK prise en charge](#configuration-delivery), configurez le processus d'application :

{{< code-block lang="bash" >}}
# Required for direct configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Aucune activation de Feature Flags ni aucun paramètre de source n'est requis. Consultez [Java Feature Flags][10], [Node.js Feature Flags][9] ou [Python Feature Flags][11] pour les versions de dépendances et l'initialisation spécifique au langage. L'initialisation ou l'accès au fournisseur démarre l'interrogation CDN ; l'installation et l'initialisation du traceur seules ne le font pas.

## Agent Remote Configuration {#agent-remote-configuration}

Pour Java, Node.js et Python, définissez explicitement la source pour conserver la distribution gérée par l'Agent :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

La Remote Configuration est activée par défaut dans l'Agent 7.47.0 et versions ultérieures. Si votre Agent a la Remote Configuration désactivée, réactivez-la en définissant `DD_REMOTE_CONFIGURATION_ENABLED=true` ou en ajoutant `remote_configuration.enabled: true` à votre `datadog.yaml`.

Consultez la [documentation sur la Remote Configuration][1] pour obtenir des instructions de configuration détaillées pour les environnements de déploiement.

Les implémentations Java, Node.js et Python existantes avec `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` restent sur la Remote Configuration pendant une fenêtre de migration. Ce paramètre est obsolète. Consultez [Migrer depuis le paramètre de fournisseur hérité][7] pour rester explicitement sur la Remote Configuration ou passer à une livraison agentless.

### Intervalle d'interrogation de la Remote Configuration {#remote-configuration-polling-interval}

L'agent interroge Datadog pour obtenir des mises à jour de configuration à un intervalle configurable :

{{< code-block lang="bash" >}}
# Optional: Configure the Agent polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## Configuration avancée de l'application {#advanced-application-configuration}

Configurez votre application avec les variables d'environnement Datadog standard : Celles-ci sont communes à tous les SDK côté serveur :

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Optional: Disable Feature Flags and both delivery paths
# DD_FEATURE_FLAGS_ENABLED=false

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-info">Dans les versions Java, Node.js et Python listées ci-dessus, <code>DD_FEATURE_FLAGS_ENABLED</code> est défini par défaut sur <code>true</code>, vous n'avez donc pas besoin de le définir. Le définir sur <code>false</code> désactive le fournisseur, l'interrogation du CDN et l'abonnement à la Feature Flags Remote Configuration. Les autres SDK serveur continuent d'utiliser les paramètres d'activation documentés sur leurs pages de langage respectives.</div>

Pour les SDK et les modes de livraison qui le prennent en charge, consultez <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configurer les métriques d'évaluation des Feature Flags</a> pour activer la <code>feature_flag.evaluations</code> métrique. Les versions initiales agentless pour Node.js n'exportent pas de métriques d'évaluation ni d'événements d'exposition. Java et Python nécessitent un Datadog Agent pris en charge ou un chemin de télémétrie serverless pour exporter ces signaux. Consultez <a href="/feature_flags/concepts/flag_graphs/">Feature Flag Graphs</a> pour plus d'informations sur les graphiques disponibles. Consultez <a href="/feature_flags/guide/apm_trace_enrichment/">Set Up APM Trace Enrichment for Feature Flags</a> pour joindre les données d'évaluation des Feature Flags aux traces APM à des fins de filtrage et d'expérimentation.

## Tests avec des fournisseurs en mémoire {#testing-with-in-memory-providers}

Datadog prend en charge ces approches de test :

- **Tests d'intégration** : pointez `DatadogProvider` vers un environnement de test dédié et contrôlez les valeurs des Feature Flags depuis l'interface utilisateur de Datadog. Cela permet d'exercer le fournisseur réel et la source de configuration sélectionnée de bout en bout.
- **Tests unitaires** : remplacez `DatadogProvider` par le `InMemoryProvider` standard d'OpenFeature (ou un stub de test équivalent, lorsqu'aucun fournisseur en mémoire n'est disponible dans le langage) et définissez les valeurs des Feature Flags directement dans le code de test. Cela permet de garder les tests hermétiques et hors ligne.

Cette section couvre l'approche en mémoire. Comme l'API OpenFeature est conçue pour rendre les fournisseurs interchangeables au moment de l'exécution, votre code d'application ne change pas — seul le fournisseur enregistré lors de la configuration du test change.

Un test typique suit ce modèle :

1. Créez une map des clés de Feature Flags vers les variantes dans votre configuration de test.
2. Enregistrez un `InMemoryProvider` avec cette map via l'API OpenFeature.
3. Appelez le client OpenFeature dans les unités testées. Le `InMemoryProvider` renvoie les attributions de Feature Flags configurées lors de la configuration du test.
4. Réinitialisez le fournisseur lors du nettoyage du test pour éviter toute fuite d'état entre les tests.

Consultez la page du SDK de votre langage (sélectionnez-la en haut de cette page) pour obtenir un exemple de test concret.

## Exigences relatives aux attributs de contexte {#context-attribute-requirements}

<div class="alert alert-warning">
Les attributs de contexte d'évaluation doivent être des valeurs primitives plates (chaînes, nombres, booléens). Les objets et tableaux imbriqués <strong>ne sont pas pris en charge</strong> et entraîneront l'abandon silencieux des événements d'exposition.
</div>

Utilisez des attributs plats dans votre contexte d'évaluation :

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

Évitez les objets et les tableaux imbriqués :

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## Lectures complémentaires {#further-reading}

Pour les déploiements basés sur des pourcentages et le partitionnement déterministe, consultez [Répartition et randomisation du trafic](/feature_flags/concepts/traffic_splitting/).

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /fr/tracing/guide/#tutorials-enabling-tracing
[5]: /fr/feature_flags/implementation_patterns/serverless/
[7]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /fr/feature_flags/concepts/configuration_sources/
[9]: /fr/feature_flags/server/nodejs/
[10]: /fr/feature_flags/server/java/
[11]: /fr/feature_flags/server/python/