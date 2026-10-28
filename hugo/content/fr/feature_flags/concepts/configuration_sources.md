---
description: Comprenez comment les SDK côté serveur de Feature Flags de Datadog reçoivent
  la configuration des flags.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Configurer les Feature Flags côté serveur
- link: /feature_flags/implementation_patterns/serverless/
  tag: Documentation
  text: Utiliser les Feature Flags dans des environnements serverless
- link: /remote_configuration/
  tag: Documentation
  text: En savoir plus sur Remote Configuration
title: Sources de configuration des SDK côté serveur
---
Les [SDK côté serveur][3] de Feature Flags de Datadog évaluent les flags localement à partir de la configuration des flags. La _source de configuration_ détermine comment le SDK reçoit cette configuration ; elle ne modifie pas la sémantique d'évaluation d'OpenFeature.

## Choisir une source de configuration {#choose-a-configuration-source}

Ces options de source de configuration sont disponibles pour les SDK serveur pris en charge :

`agentless`
: Le SDK récupère périodiquement la configuration des flags depuis le CDN géré par Datadog via HTTPS.
  - Le polling commence lorsque le code de l'application initialise ou accède au fournisseur OpenFeature de Datadog.
  - Aucun Datadog Agent n'est requis pour la configuration des flags.

`remote_config`
: Le Datadog Agent reçoit la configuration des flags via Remote Configuration et la transmet au SDK.
  - La sélection de `remote_config` active l'abonnement à Feature Flags Remote Configuration.
  - Nécessite un Datadog Agent avec Remote Configuration activé.

La livraison Agentless est la valeur par défaut dans les [versions de SDK prises en charge](#use-agentless-delivery). D'autres SDK côté serveur utilisent [Agent Remote Configuration](#use-agent-remote-configuration) pour la livraison des flags.

Définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` uniquement lorsque vous souhaitez sélectionner une source explicitement :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

Le SDK résout la source une fois lors de l'initialisation. Redémarrez l'application pour changer de source.

## Utiliser la livraison sans agent {#use-agentless-delivery}

Pour commencer avec la livraison sans agent, utilisez l'une de ces versions minimales :

| SDK | version minimale |
|---|---|
| Java `dd-openfeature` et `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

La distribution par CDN pour Java nécessite `dd-openfeature` et `dd-java-agent`. Elle ne nécessite pas de Datadog Agent pour la configuration des Feature Flags.

Configurez la clé d'API, le site Datadog et l'environnement dans le processus d'application :

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Ensuite, initialisez ou accédez au fournisseur OpenFeature de Datadog dans le code de l'application. Consultez les instructions de configuration pour [Java][4], [Node.js][2] ou [Python][5].

Aucun paramètre de source de configuration ou d'activation de fournisseur n'est requis. L'interrogation ne commence que lorsque le code de l'application initialise ou accède au fournisseur ; l'installation ou l'initialisation du traceur seul ne crée pas de trafic CDN pour les Feature Flags.

<div class="alert alert-warning">Les versions initiales agentless pour Node.js prennent uniquement en charge la distribution de la configuration et l'évaluation locale des Feature Flags. Ils n'exportent pas de métriques d'évaluation ni d'événements d'exposition. La livraison agentless pour Java et Python modifie uniquement la source de configuration. Java et Python n'exportent pas ces signaux sans un Datadog Agent pris en charge ou un chemin de télémétrie serverless.</div>

### Configurer la livraison sans agent {#configure-agentless-delivery}

Définissez `DD_SITE` sur le site Datadog de votre organisation. Pour le site sélectionné sur cette page de documentation, utilisez {{< region-param key="dd_site" code="true" >}}. La source sans agent prend également en charge ces paramètres opérationnels :

| Variable d'environnement | Par défaut | Description |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Endpoint géré par Datadog | Remplace l'endpoint de configuration des indicateurs sans agent ou l'URL de base. Consultez [Utiliser un endpoint sans agent personnalisé](#use-a-custom-agentless-endpoint). |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Entier positif qui définit le temps entre les tentatives d'interrogation terminées. Java ne limite pas les tentatives, tandis que Node.js et Python plafonnent les valeurs à 3600 secondes. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | Entier positif qui définit le délai d'attente pour une demande de configuration individuelle. |

Le SDK récupère la configuration en arrière-plan et évalue les flags localement. Les évaluations de flags individuels n'effectuent pas de requêtes réseau. La source sans agent effectue les opérations suivantes :

- Interroge toutes les 30 secondes par défaut
- Utilise un délai d'expiration de requête de 5 secondes par défaut
- Utilise des ETags pour éviter de télécharger une configuration inchangée
- Préserve la dernière configuration acceptée lors d'erreurs temporaires de réseau ou de charge utile
- Empêche les interrogations qui se chevauchent

Le CDN géré par Datadog utilise des points de présence distribués mondialement, le peering réseau et un routage redondant. Les emplacements de service sont donc susceptibles d'être géographiquement proches de la plupart des charges de travail des applications.

Conservez `DD_API_KEY` dans un gestionnaire de secrets et ne l'exposez qu'au processus d'application qui charge la configuration des flags. La livraison de configuration Agentless envoie la clé d'API directement depuis l'application vers Datadog via HTTPS.

### Utilisez un endpoint sans agent personnalisé {#use-a-custom-agentless-endpoint}

L'endpoint géré par Datadog est recommandé pour les déploiements standard. Pour les tests avancés, le développement local ou un proxy géré par l'opérateur, remplacez-le par `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL=http://localhost:8080
{{< /code-block >}}

L'URL personnalisée doit utiliser HTTP ou HTTPS. S'il ne contient qu'une origine ou un chemin racine, le SDK ajoute le chemin de configuration des indicateurs standard. S'il contient un chemin non racine, le SDK utilise ce chemin comme endpoint complet.

Le SDK envoie `DD_API_KEY` uniquement via HTTPS vers l'endpoint par défaut géré par Datadog. Il ne transmet jamais la clé d'API Datadog à un endpoint personnalisé. Les endpoints personnalisés peuvent utiliser HTTP pour un développement local contrôlé ; utilisez HTTPS pour tout endpoint en dehors de l'environnement de développement local.

Si le paramètre d'endpoint personnalisé est invalide, le SDK maintient le fournisseur désactivé, enregistre l'erreur de configuration et les évaluations renvoient les valeurs par défaut fournies par l'appelant.

La livraison sans agent gérée par Datadog n'est pas disponible pour Datadog for Government dans les versions de SDK prises en charge. Les applications sur ce site continuent d'utiliser les valeurs par défaut fournies par l'appelant à moins qu'elles n'utilisent Agent Remote Configuration.

### Migrer une configuration Remote Configuration existante{#migrate-an-existing-remote-configuration-setup}

Les clients existants qui définissent `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` restent sur Remote Configuration pendant une fenêtre de migration. Ce paramètre obsolète est une passerelle de compatibilité, non la configuration à long terme.

Lorsque vous êtes prêt à utiliser la livraison sans agent :

1. Définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`.
2. Pour l'endpoint géré par Datadog, configurez `DD_API_KEY`, `DD_SITE` et `DD_ENV` dans l'application.
3. Initialisez le fournisseur et vérifiez qu'il reçoit les mises à jour des flags.
4. Supprimez `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. Ne laissez pas le paramètre obsolète activé une fois la migration terminée.

Pour rester temporairement sur Agent Remote Configuration, définissez `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`, puis supprimez `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. Votre clé d'API reste sur l'Agent.

Si vous définissez `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`, remplacez-le par `DD_FEATURE_FLAGS_ENABLED=false`.

Les valeurs `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` explicites prévalent sur le paramètre hérité. Une fois le paramètre hérité supprimé, les applications sans source explicite utilisent la distribution sans agent. Définissez `remote_config` explicitement avant que le paramètre hérité obsolète ne soit supprimé si vous souhaitez rester sur la livraison par l'Agent.

## Utilisez Agent Remote Configuration {#use-agent-remote-configuration}

Définissez la source sur `remote_config` pour utiliser la livraison gérée par l'Agent :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Pour Java, Remote Configuration nécessite des versions compatibles de `dd-openfeature` et `dd-java-agent`. Utilisez la version 1.65.0 ou ultérieure pour les deux composants.

Configurez la clé d'API sur l'Agent, et non dans le processus de l'application. Si Remote Configuration a été désactivé sur l'Agent, réactivez-le. Consultez [Remote Configuration][1] pour la configuration de l'Agent et les exigences réseau.

## Configuration avancée {#advanced-configuration}

### Activez ou désactivez les Feature Flags {#enable-or-disable-feature-flags}

`DD_FEATURE_FLAGS_ENABLED` est défini par défaut sur `true`, donc les nouvelles installations n'ont pas besoin de le définir. Définissez-le sur `false` pour désactiver le fournisseur et les deux chemins de livraison de configuration :

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_ENABLED=false
{{< /code-block >}}

### Activation et facturation {#activation-and-billing}

La facturation des Feature Flags côté serveur est basée sur les demandes de configuration effectuées via Remote Configuration ou le CDN. L'installation du traceur n'active aucun des deux chemins de livraison par lui-même.

- Avec la source sans agent par défaut, l'interrogation CDN ne commence que lorsque le code de l'application initialise ou accède au fournisseur Datadog OpenFeature.
- La sélection explicite de `remote_config` démarre l'abonnement aux Feature Flags de l'Agent. Cela ne nécessite pas que le code de l'application initialise le fournisseur.

### Priorité de configuration {#configuration-precedence}

| Configuration | Résultat |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | Désactive le fournisseur et les deux chemins de livraison, indépendamment des autres paramètres. |
| Explicite `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | Sélectionne la livraison CDN. L'interrogation commence lorsque le code de l'application initialise ou accède au fournisseur. |
| Explicite `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Sélectionne la livraison par l'Agent et active l'abonnement à Feature Flags Remote Configuration. |
| Vide ou espaces uniquement `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` | Traite la source comme non définie, de sorte que le paramètre de migration hérité ou la valeur par défaut sans agent s'applique. |
| Explicite `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=offline` ou une autre valeur non vide non prise en charge | Échoue de manière sécurisée lorsque le code de l'application accède au fournisseur. Le SDK ne sélectionne pas la livraison CDN ou Remote Configuration. |
| Aucune source et `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | Préserve Remote Configuration pendant la fenêtre de migration. |
| Aucune source et `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | Maintient le fournisseur et les deux chemins de livraison désactivés. |
| Ni `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` ni `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` n'est défini | Sélectionne la livraison sans agent. L'interrogation commence lorsque le code de l'application initialise ou accède au fournisseur. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration/
[2]: /fr/feature_flags/server/nodejs/
[3]: /fr/feature_flags/server/
[4]: /fr/feature_flags/server/java/
[5]: /fr/feature_flags/server/python/