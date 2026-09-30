---
description: Utilisez les SDK côté serveur de Datadog Feature Flags dans des environnements
  serverless, avec ou sans Datadog Agent.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration du SDK serveur
- link: /remote_configuration/
  tag: Documentation
  text: Remote Configuration
- link: /serverless/
  tag: Documentation
  text: Serverless Monitoring
title: Environnements serverless
---
## Vue d'ensemble {#overview}

Les SDK Java, Node.js et Python de Feature Flags de Datadog peuvent recevoir la configuration des flags directement depuis le CDN géré par Datadog. Cette source de configuration _agentless_ simplifie l'intégration car elle ne nécessite pas de Datadog Agent pour la configuration des flags. Elle prend également en charge les applications serverless qui ne peuvent pas se connecter à un Datadog Agent.

Une fois la configuration chargée, l'évaluation des flags s'effectue localement dans l'application. Le SDK n'effectue pas de requête réseau pour chaque évaluation.

La distribution de configuration agentless est disponible dans :

| SDK | version minimale |
|---|---|
| Java `dd-openfeature` et `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

La distribution par CDN pour Java nécessite `dd-openfeature` et `dd-java-agent`. L'environnement d'exécution Java doit prendre en charge le chargement de `dd-java-agent` avec l'option JVM `-javaagent`. Vous pouvez transmettre cette option dans la commande Java ou via `JAVA_TOOL_OPTIONS`.

Les autres SDK côté serveur et les versions antérieures à celles listées nécessitent l'Agent Remote Configuration pour la distribution des flags.

<div class="alert alert-warning">Les versions initiales agentless de Node.js chargent la configuration et évaluent les flags localement. Ils n'exportent pas de métriques d'évaluation ni d'événements d'exposition. La livraison agentless pour Java et Python modifie uniquement la source de configuration. Java et Python n'exportent pas ces signaux sans un Datadog Agent pris en charge ou un chemin de télémétrie serverless.</div>

## Architecture agentless {#agentless-architecture}

Utilisez la livraison agentless lorsque le runtime serverless peut effectuer des requêtes HTTPS sortantes vers Datadog. Pour Java, le runtime doit également vous permettre de définir l'option JVM `-javaagent` :

1. Utilisez une version du SDK [prise en charge](#overview).
2. Pour Java, chargez `dd-java-agent` avec `-javaagent` ou `JAVA_TOOL_OPTIONS`. Consultez la configuration Java pour [Cloud Run Functions][7] ou [Cloud Run containers][8] pour obtenir des exemples.
3. Configurez la clé d'API, le site Datadog et l'environnement dans l'application serverless :

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. Initialisez ou accédez au fournisseur OpenFeature de Datadog comme décrit dans la configuration [Java][6], [Node.js][3] ou [Python][9]. Cela lance l'interrogation du CDN. Aucune activation de Feature Flags ni aucun paramètre de source n'est requis.
5. Stockez `DD_API_KEY` dans le gestionnaire de secrets de la plateforme serverless et exposez-le uniquement au processus de l'application.

Le SDK interroge le CDN géré par Datadog toutes les 30 secondes par défaut et utilise ETag pour la configuration inchangée. Il conserve la dernière configuration acceptée lors d'erreurs temporaires. Si aucune configuration n'a été acceptée, les évaluations OpenFeature renvoient la valeur par défaut fournie par l'appelant.

L'installation et l'initialisation du traceur seules ne lancent pas l'interrogation du CDN. Les requêtes vers le CDN ne contribuent à la facturation des Feature Flags côté serveur qu'une fois que le code de l'application active le fournisseur.

Le mode agentless supprime la dépendance au Datadog Agent pour la _configuration des indicateurs_. Il ne supprime pas les exigences de traceur spécifiques au langage. Il ne configure ni n'active non plus l'APM et la télémétrie serverless. Vous pouvez utiliser la Datadog Lambda Extension, `serverless-init`, un sidecar Agent ou un autre chemin de télémétrie pris en charge indépendamment.

## Remote Configuration prise en charge par l'Agent {#agent-backed-remote-configuration}

Définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` pour utiliser explicitement le chemin d'Agent Remote Configuration existant :

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Pour Java, utilisez des versions `dd-openfeature` et `dd-java-agent` compatibles. Utilisez la version 1.65.0 ou ultérieure pour les deux composants.

Configurez l'Agent avec la Remote Configuration et la clé d'API :

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

La charge de travail serverless doit pouvoir atteindre l'Agent sur un réseau privé, et l'Agent doit pouvoir atteindre Datadog via HTTPS. N'exposez pas publiquement l'ingestion de traces de l'Agent.

La sélection explicite de `remote_config` active l'abonnement à Feature Flags Remote Configuration, même si le code de l'application n'initialise pas le fournisseur. Ces requêtes contribuent à la facturation des Feature Flags côté serveur.

## Considérations opérationnelles {#operational-considerations}

- **Démarrages à froid** : L'initialisation bloquante du fournisseur attend la première configuration et peut ajouter une latence de démarrage à froid. Initialisez de manière asynchrone s'il est acceptable de fournir des valeurs par défaut fournies par l'appelant au démarrage.
- **Connectivité sortante** : La livraison agentless nécessite un accès HTTPS sortant vers le service de configuration des flags géré par Datadog.
- **Propriété de la clé d'API** : En mode agentless, l'application détient `DD_API_KEY`. En mode `remote_config`, l'Agent détient la clé d'API.
- **Mises à jour des flags** : La distribution est à cohérence éventuelle. Tenez compte de l'intervalle d'interrogation du SDK et du temps de démarrage de l'application lors du test des modifications.
- **Comportement connu comme étant le dernier correct** : Une fois qu'une configuration a été acceptée, les pannes réseau temporaires ou les réponses mal formées ne la remplacent pas.
- **Support d'exécution** : Java nécessite Java 11 ou version ultérieure. Pour Node.js et Python, vérifiez les exigences de compatibilité de l'environnement d'exécution du traceur.
- **Coupe-circuit** : `DD_FEATURE_FLAGS_ENABLED` est défini par défaut sur `true`. Définissez-le sur `false` pour désactiver le fournisseur et les deux chemins de distribution de configuration. Les évaluations renvoient alors les valeurs par défaut fournies par l'appelant.

La distribution agentless gérée par Datadog n'est pas disponible pour Datadog for Government dans ces versions. Utilisez Agent Remote Configuration sur ce site.

Si votre déploiement utilise `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`, consultez [Migrate from the legacy provider setting][5].

## Notes sur l'environnement {#environment-notes}

### AWS Lambda {#aws-lambda}

Les fonctions Lambda Java, Node.js et Python peuvent utiliser la distribution de configuration agentless lorsqu'elles exécutent une version minimale du SDK et peuvent atteindre Datadog via HTTPS. Les fonctions Java doivent charger `dd-java-agent` avec `-javaagent`, soit directement, soit via `JAVA_TOOL_OPTIONS`. Une couche de traçage Java peut fournir cette configuration. La Datadog Lambda Extension n'est pas requise pour la configuration des flags.

### Environnements serverless Google Cloud {#google-cloud-serverless-environments}

Les charges de travail Java peuvent utiliser la distribution de configuration agentless sur Java 11 ou version ultérieure lorsque l'environnement d'exécution peut charger `dd-java-agent`. La configuration Java pour [Cloud Run Functions][7] et [Cloud Run containers][8] utilise `JAVA_TOOL_OPTIONS` pour définir `-javaagent`. Les charges de travail Node.js et Python nécessitent un environnement d'exécution de traceur pris en charge. Tous les environnements d'exécution nécessitent un accès HTTPS sortant.

### Azure Functions {#azure-functions}

Les applications de fonction Java peuvent utiliser la distribution de configuration agentless sur Java 11 ou version ultérieure lorsque l'environnement d'exécution peut charger `dd-java-agent`. Les applications de fonction Node.js et Python nécessitent un environnement d'exécution de traceur pris en charge. Tous les environnements d'exécution nécessitent un accès HTTPS sortant. Un Datadog Agent externe n'est requis que lorsque `remote_config` est sélectionné.

### Environnements d'exécution Edge {#edge-runtimes}

Certains environnements d'exécution Edge ne prennent pas en charge les API de traceur Node.js de Datadog requises par le fournisseur de Feature Flags. Vérifiez la compatibilité du traceur pour la plateforme cible avant de vous appuyer sur la distribution de configuration agentless.

## API publique et évaluation locale {#public-api-and-local-evaluation}

L'API publique [Feature Flags API][4] est destinée à la gestion des flags et des environnements. Il ne s'agit pas d'une API d'évaluation de flags par requête pour les applications côté serveur.

N'interrogez pas les API Datadog à chaque invocation serverless pour évaluer les flags. Utilisez le SDK côté serveur, qui charge périodiquement la configuration des flags et les évalue localement.

## Validez votre configuration {#validate-your-setup}

Avant d'activer les Feature Flags en production :

1. Confirmez que l'application utilise une [version minimale du SDK prise en charge](#overview). Pour Java, confirmez que la JVM charge `dd-java-agent`.
2. Pour la distribution agentless, confirmez que l'application dispose de `DD_API_KEY`, `DD_SITE` et `DD_ENV`. Pour l'Agent Remote Configuration, confirmez que l'Agent dispose de sa clé d'API et que la Remote Configuration est activée.
3. Initialisez le fournisseur OpenFeature et vérifiez qu'il atteint un état prêt.
4. Modifiez un flag hors production dans Datadog et confirmez que la charge de travail reçoit la valeur mise à jour après l'intervalle d'interrogation.
5. Confirmez que votre application gère les valeurs par défaut fournies par l'appelant si la configuration n'est pas disponible lors d'un démarrage à froid.
6. Pour Node.js, ne planifiez pas de workflow d'expérimentation basés sur des métriques d'évaluation ou des données d'exposition. Pour Java et Python, configurez un Datadog Agent pris en charge ou un chemin de télémétrie serverless avant d'utiliser ces signaux.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration/
[2]: /fr/feature_flags/server/
[3]: /fr/feature_flags/server/nodejs/
[4]: /fr/api/latest/feature-flags/
[5]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[6]: /fr/feature_flags/server/java/
[7]: /fr/serverless/google_cloud_run/functions/java/?tab=maven
[8]: /fr/serverless/google_cloud_run/containers/in_container/java/
[9]: /fr/feature_flags/server/python/