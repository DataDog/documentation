---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /fr/agent/guide/how_rc_works
- /fr/agent/guide/how_remote_config_works
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentation
  text: Fonctionnement d'Application Security Monitoring
- link: /dynamic_instrumentation/?tab=configurationyaml#activer-la-configuration-a-distance
  tag: Documentation
  text: Instrumentation dynamique
- link: /security/threats/setup
  tag: Documentation
  text: Configurer CSM Threats
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Utiliser le journal d'audit Datadog
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Appliquer aux composants Datadog des mises à jour en temps réel grâce à la
    configuration à distance
title: Configuration à distance
---

{{% site-region region="gov" %}}

<div class="alert alert-warning">La fonctionnalité de configuration à distance n'est pas disponible pour le site Datadog US1-FED.</div>

{{< /site-region >}}

## Présentation
La configuration à distance est une fonctionnalité qui vous permet de définir et de modifier à distance le comportement de certains composants Datadog déployés dans votre infrastructure (tels que les Agents, les bibliothèques de tracing ou le worker des pipelines d'observabilité). Vous pouvez vous en servir pour appliquer des configurations à ces composants quand bon vous semble et ainsi réduire vos coûts de gestion, limiter les désaccords entre les équipes et accélérer la résolution des problèmes.

Si vous utilisez les solutions de sécurité Application Security Management et Cloud Security Management Threats (CSM Threats) de Datadog, l'activation de la configuration à distance sur vos Agents et sur les bibliothèques de tracing compatibles vous permet de déployer des mises à jour et d'intervenir sans attendre. Vous améliorez ainsi la sécurité de vos applications et de votre infrastructure cloud.

## Fonctionnement
Une fois la fonctionnalité de configuration à distance activée sur l'Agent Datadog, celle-ci interroge régulièrement le [site Datadog][1] configuré afin de déterminer si de nouvelles configurations ont été appliquées à vos Agents et bibliothèques de tracing.

Lorsque vous modifiez la configuration d'une solution Datadog depuis son interface, ces modifications sont stockées dans Datadog.

Le schéma suivant illustre le fonctionnement de la configuration à distance :

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Les utilisateurs configurent les fonctionnalités depuis l'interface, la configuration est stockée dans Datadog, et l'Agent recherche les nouvelles configurations qui ont été appliquées." width="90%" style="center">}}

1. Vous configurez les fonctionnalités de votre choix dans l'interface Datadog.
2. Ces configurations sont stockées de façon sécurisée dans Datadog.
3. Les Agents dans vos environnements recherchent, récupèrent et appliquent automatiquement les nouvelles configurations depuis Datadog, le tout de façon sécurisée. Les bibliothèques de tracing déployées dans vos environnements communiquent avec les Agents afin de rechercher et de récupérer les nouvelles configurations depuis Datadog.

**Remarque** : les modifications appliquées via une configuration à distance ne sont pas visibles dans le fichier de configuration de votre Agent.

## Solutions et fonctionnalités prises en charge
Les solutions et fonctionnalités suivantes peuvent être configurées à distance :

### Application Security Management (ASM)

- **Activation d'ASM en un clic** : activez ASM en un seul clic depuis l'interface Datadog.
- **Mises à jour des schémas d'attaque** : récupérez automatiquement les derniers schémas d'attaque pour vos pare-feu applicatifs (WAF) dès leur publication par Datadog lorsqu'une nouvelle vulnérabilité ou un nouveau vecteur d'attaque est découvert.
- **Protection** : utilisez l'interface Datadog pour bloquer temporairement ou définitivement les IP des personnes malveillantes, les utilisateurs authentifiés et les requêtes suspectes identifiés par les traces et les signaux de sécurité ASM.

### Application Performance Monitoring (APM)

- **Configuration des paramètres de bibliothèque de tracing dans l'interface** (bêta) : modifiez le taux d'échantillonnage des traces d'un service, les paramètres d'activation de l'injection des logs, ainsi que les tags des en-têtes HTTP depuis l'interface du [catalogue de services][19], sans avoir à redémarrer le service pertinent.
- **Instrumentation à distance de vos services Kubernetes avec APM** (bêta privée) : instrumentez à distance vos services dans Kubernetes avec la solution APM de Datadog via l'injection de bibliothèques et gérez vos déploiements, le tout depuis l'interface Datadog. Disponible pour les applications Java, Node et Python. Consultez la documentation relative à la [configuration de l'instrumentation à distance][2] pour en savoir plus.
- **Modification à distance du taux d'échantillonnage de l'Agent** (bêta publique) : configurez l'Agent Datadog à distance en modifiant ses taux d'échantillonnage des traces et en définissant des règles pour ajuster l'ingestion des traces en fonction des besoins de votre organisation, sans avoir à redémarrer votre Agent Datadog.


### Instrumentation dynamique
<div class="alert alert-info">Cette fonctionnalité est disponible en version bêta.</div>

- Envoyez les métriques, les traces et les logs clés de vos applications actives sans aucune modification du code.

### CSM Threats

<div class="alert alert-info">La fonctionnalité de configuration à distance des règles par défaut de l'Agent est actuellement en bêta.</div>

<div class="alert alert-info">La fonctionnalité de configuration à distance des règles personnalisées est actuellement en bêta privée. Remplissez <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">ce formulaire</a> pour demander à y accéder.</div>

- **Mise à jour automatique des règles par défaut de l'Agent** : récupérez et appliquez automatiquement les mises à jour des règles par défaut de l'Agent lorsque des améliorations sont identifiées et publiées par Datadog. Consultez la section [Configurer CSM Threats][3] pour en savoir plus.
- **Déploiement automatique de règles personnalisées de l'Agent** : déployez automatiquement vos règles personnalisées sur les hosts de votre choix (tous vos hosts ou un sous-ensemble précis).

### Pipelines d'observabilité
<div class="alert alert-info">Cette fonctionnalité est en version bêta privée.</div>

- **Déployez et mettez à jour à distance vos [workers de pipelines d'observabilité][4] (OPW)** : créez et modifiez des pipelines dans l'interface Datadog, puis appliquez vos changements de configuration aux instances du worker exécutées dans votre environnement.

## Considérations relatives à la sécurité

Datadog a mis en place les mécanismes suivants pour protéger la confidentialité, l'intégrité et la disponibilité des configurations récupérées et appliquées par vos composants Datadog :

* Les Agents déployés dans votre infrastructure demandent à récupérer les configurations auprès de Datadog.
* Datadog n'envoie aucune configuration si les Agents n'en ont pas fait la demande, et chaque Agent reçoit uniquement les configurations qui le concernent.
* Les requêtes des Agents sont transmises à Datadog via HTTPS (port 443), ce qui signifie que vous n'avez pas besoin d'ouvrir de ports supplémentaires dans votre pare-feu réseau.
* En plus d'être chiffrées en HTTPS, les communications entre vos Agents et Datadog sont authentifiées et autorisées avec votre clé d'API Datadog.
* Seuls les utilisateurs disposant de l'autorisation [`api_keys_write`][5] peuvent activer ou désactiver la configuration à distance sur la clé d'API et utiliser les fonctionnalités prises en charge.
* Les nouvelles configurations appliquées via l'interface Datadog sont signées et validées au niveau de l'Agent et des composants Datadog concernés, ce qui permet de vérifier l'intégrité de la configuration.

## Activer la configuration à distance

### Prérequis

- L'Agent Datadog version `7.41.1` (`7.42.0` pour le taux d'échantillonnage APM, `7.43.0` pour l'instrumentation à distance APM) ou une version ultérieure doit être installé sur vos hosts ou conteneurs. 
- Pour les solutions Datadog reposant sur des bibliothèques de tracing, vous devez également mettre à niveau ces bibliothèques afin d'utiliser une version compatible avec la configuration à distance. Pour les fonctionnalités de protection et d'activation en un seul clic d'ASM, consultez les [exigences de compatibilité d'ASM][6]. Pour l'instrumentation dynamique, consultez les [prérequis de l'instrumentation Dynamique][20].

### Configuration

Pour activer la configuration à distance :

1. Assurez-vous que vos autorisations RBAC comprennent [`org_management`][7] afin de pouvoir activer la configuration à distance pour votre organisation.

2. Assurez-vous que vos autorisations RBAC comprennent [`api_keys_write`][5] afin de pouvoir créer une clé d'API avec la fonctionnalité de configuration à distance, ou d'ajouter la fonctionnalité à une clé d'API existante. Demandez à l'administrateur Datadog de votre organisation de vous accorder cette autorisation si vous ne l'avez pas déjà. Vous aurez besoin d'une telle clé d'API pour authentifier votre Agent et l'autoriser à utiliser la fonctionnalité de configuration à distance.

3. Sur la page [Remote Configuration][8], activez la fonctionnalité de configuration à distance. Les composants Datadog utilisés par votre organisation pourront ainsi récupérer des configurations auprès de Datadog.

4. Sélectionnez une clé d'API existante ou créez-en une, puis activez la configuration à distance sur la clé :

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="Propriétés d'une clé d'API avec le bouton d'activation de la fonctionnalité de configuration à distance." width="90%" style="center">}}

5. Mettez à jour le fichier de configuration de votre Agent :
**Remarque** : cette étape est uniquement requise pour les versions 7.46.0 et antérieures de l'Agent. Depuis la version 7.47.0 de l'Agent, le paramètre `remote_configuration.enabled` est par défaut défini sur `true`. 

{{< tabs >}}
{{% tab "Fichier de configuration YAML" %}}
Ajoutez les lignes suivantes à votre fichier de configuration YAML, en spécifiant la clé d'API sur laquelle la fonctionnalité de fonctionnalité à distance est activée :
```yaml
api_key: xxx
remote_configuration:
  enabled: true
``` 

{{% /tab %}}
{{% tab "Variable d'environnement" %}}
Ajoutez les lignes suivantes au manifeste de votre Agent Datadog, en spécifiant la clé d'API sur laquelle la fonctionnalité de configuration à distance est activée :
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
Ajoutez les lignes suivantes à votre chart Helm, en spécifiant la clé d'API sur laquelle la fonctionnalité de configuration à distance est activée :
```yaml
datadog:
  apiKey: xxx
  remoteConfiguration:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}


6. Redémarrez votre Agent pour que les modifications soient appliquées. 

Une fois ces étapes effectuées, votre Agent demande à récupérer ses configurations auprès de Datadog et les fonctionnalités qui utilisent la configuration à distance sont activées :
- Les [règles CSM Threats par défaut de l'Agent][9] se mettent automatiquement à jour dès leur publication.
- L'[instrumentation Datadog à distance][2] est activée.
- Les [taux d'échantillonnage APM au niveau de l'Agent][10] sont appliqués.  
- L'[instrumentation dynamique][11] est activée.
- [L'activation en un clic d'ASM, le blocage des IP et les mises à jour des schémas d'attaque][12] sont activés.

## Meilleures pratiques

### Journal d'audit Datadog

Utilisez le [journal d'audit Datadog][13] pour surveiller les accès à votre organisation et les événements associés à la configuration à distance. Le journal d'audit permet à vos administrateurs et à vos équipes de sécurité de surveiller les créations, les suppressions et les modifications de clés d'application et de clés d'API Datadog. Une fois le journal d'audit configuré, vous pourrez visualiser les événements liés aux fonctionnalités configurables à distance et savoir qui est à l'origine de chaque changement. Le journal d'audit vous permet de reconstituer des séquences d'événements et de surveiller de près l'utilisation de la fonctionnalité de configuration à distance. 

### Monitors

Configurez des [monitors][14] pour recevoir des notifications lorsqu'un événement intéressant se produit.

## Dépannage

Suivez les consignes de dépannage suivantes en cas de problème avec la configuration à distance. Si vous avez besoin d'aide supplémentaire, contactez [l'assistance Datadog][15].

### Redémarrer l'Agent

Une fois la configuration de l'Agent mise à jour dans le fichier [`datadog.yaml`][16], redémarrez l'Agent pour appliquer cette modification. 

### Assurez-vous que les endpoints utilisés par la fonctionnalité de configuration à distance sont accessibles depuis votre environnement.   

Pour utiliser la configuration à distance, l'Agent et le worker des pipelines d'observabilité déployés dans votre environnement doivent communiquer avec les [endpoints][17] Datadog dédiés à la fonctionnalité. Assurez-vous que les requêtes HTTPS sortantes ont accès à ces endpoints depuis votre environnement. Si vous avez configuré un proxy entre Datadog et votre environnement, mettez à jour vos [paramètres de proxy][18] afin d'intégrer les endpoints de la configuration à distance.

### Activer la configuration à distance au niveau de l'organisation

Pour activer la configuration à distance au niveau de l'[organisation][8] depuis l'interface Datadog, accédez à **Organization Settings > Security > Remote Configuration**. Vos composants Datadog authentifiés et autorisés pourront ainsi récupérer à distance les configurations et les règles de détection des fonctionnalités prises en charge auprès de Datadog. Seuls les utilisateurs disposant de l'autorisation RBAC [`org_management`][7] peuvent activer la configuration à distance au niveau de l'organisation.

### Activer la configuration à distance sur la clé d'API

Pour authentifier l'Agent et l'autoriser à récupérer les configurations et les règles de détection, ainsi que pour autoriser le worker des pipelines d'observabilité à récupérer les configurations, activez la configuration à distance sur la clé d'API adéquate. Seuls les utilisateurs disposant de l'autorisation RBAC [`api_keys_write`][5] peuvent activer la configuration à distance sur la clé d'API.

**Remarque** : si vous disposez de l'autorisation RBAC [`api_keys_write`][5], mais pas de l'autorisation permettant d'activer la configuration à distance au niveau de l'[organisation][8], vous ne pourrez pas activer la fonctionnalité sur une clé d'API (qu'elle soit nouvelle ou existante). Vous pourrez uniquement désactiver la configuration à distance sur une clé d'API existante.

### Examiner les événements de statut de la configuration à distance

Consultez l'[interface de configuration à distance][8] pour mieux comprendre le statut de la configuration à distance de votre Agent. Le tableau suivant décrit la signification de chaque statut :

  | Statut           | Rôle                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | L'Agent déployé dans votre environnement parvient à atteindre Datadog, ainsi qu'à s'authentifier et à obtenir les autorisations auprès de Datadog. Il s'agit du statut idéal pour vos Agents utilisant la configuration à distance.                                               |    
  | ERROR          | L'Agent déployé dans votre environnement parvient à atteindre Datadog, mais n'arrive pas à s'authentifier ni à obtenir les autorisations auprès de Datadog pour les opérations de configuration à distance. Ce problème est probablement causé par le fait que l'Agent utilise une clé d'API sur laquelle la configuration à distance n'a pas été activée. Pour le corriger, activez la fonctionnalité de configuration à distance sur la clé d'API utilisée par l'Agent.                                                 | 
  | CONNECTION ERROR        |   Le paramètre `remote_config.enabled` est défini sur true dans le fichier de configuration `datadog.yaml` de l'Agent déployé dans votre environnement. Toutefois, l'Agent ne parvient pas à trouver le service de configuration à distance. Ce problème est probablement causé par le fait que l'Agent ne parvient pas à atteindre les [endpoints][17] de configuration à distance. Pour le corriger, autorisez l'accès HTTPS sortant aux endpoints de configuration à distance depuis votre environnement. Ce statut s'affiche uniquement lorsque vous utilisez une version `7.45.0` ou ultérieure de l'Agent.
  | DISABLED       |   Le paramètre `remote_config.enabled` est défini sur false dans le fichier de configuration `datadog.yaml` de l'Agent déployé dans votre environnement. Définissez `remote_config.enabled` sur true pour activer la configuration à distance sur l'Agent. Ce statut s'affiche uniquement lorsque vous utilisez une version `7.45.0` ou ultérieure de l'Agent. | 
  | NOT CONNECTED       | L'Agent est introuvable dans le service de configuration à distance. Le paramètre `remote_config.enabled` peut être défini sur true ou false dans son fichier de configuration `datadog.yaml`. Consultez la configuration de votre Agent local ou vos paramètres de proxy. Ce statut s'affiche uniquement lorsque vous utilisez une version de l'Agent ultérieure à la `7.41.1` mais inférieure à la `7.45.0`.            | 
  | UNSUPPORTED AGENT   | Vous utilisez une version de l'Agent qui n'est pas compatible avec la configuration à distance. Pour corriger ce problème, installez la dernière version disponible de l'Agent. |

## Désactiver la configuration à distance au niveau de l'Agent

Depuis la version 7.47.0 de l'Agent, le paramètre `remote_configuration.enabled` est défini par défaut sur `true` dans l'Agent. Ainsi, l'Agent recherche les nouvelles configurations depuis le site Datadog.

Pour récupérer des configurations depuis Datadog, vous devez également suivre les étapes ci-dessous :
- Activez la configuration à distance au niveau de l'organisation.
- Activez la fonctionnalité de configuration à distance sur votre clé d'API depuis l'interface Datadog.
- Autorisez l'accès HTTP sortant vers les [endpoints][17] de configuration à distance depuis votre environnement.

Si vous ne souhaitez pas que votre Agent envoie des demandes de configuration à Datadog, vous pouvez définir le paramètre `remote_configuration.enabled` sur `false` dans l'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration YAML" %}}
Définissez le paramètre `remote_configuration.enabled` sur `false` au lieu de `true` dans votre [fichier de configuration YAML][21] :
```yaml
remote_configuration:
  enabled: false
``` 

{{% /tab %}}
{{% tab "Variable d'environnement" %}}
Ajoutez ce qui suit au manifeste de votre Agent Datadog :
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Ajoutez ce qui suit à votre chart Helm :
```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site/
[2]: /fr/tracing/trace_collection/library_injection_remote/
[3]: /fr/security/threats/setup
[4]: /fr/observability_pipelines/#observability-pipelines-worker
[5]: /fr/account_management/rbac/permissions#api-and-application-keys
[6]: /fr/security/application_security/enabling/compatibility/
[7]: /fr/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /fr/security/default_rules/#cat-workload-security
[10]: /fr/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /fr/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /fr/security/application_security/how-appsec-works/#built-in-protection
[13]: /fr/account_management/audit_trail
[14]: /fr/monitors/
[15]: /fr/help/
[16]: /fr/agent/remote_config/?tab=configurationyamlfile#setup
[17]: /fr/agent/guide/network
[18]: /fr/agent/proxy/
[19]: /fr/tracing/service_catalog/
[20]: /fr/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file