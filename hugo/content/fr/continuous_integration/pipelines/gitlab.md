---
aliases:
- /fr/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Développer Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration de GitLab pour CI Visibility
---

## Présentation

[GitLab][18] est une plateforme DevOps qui automatise le cycle de vie du développement logiciel avec des fonctionnalités CI/CD intégrées, permettant le déploiement continu et automatisé d'applications avec des contrôles de sécurité intégrés.

Configurez CI Visibility pour GitLab pour collecter des données sur vos exécutions de pipeline, analyser les goulots d'étranglement de performance, résoudre les problèmes opérationnels et optimiser vos workflows de déploiement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Pipelines en cours d'exécution][24] | Pipelines en cours d'exécution | Afficher les exécutions de pipeline en cours d'exécution. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| [Analyse des échecs de tâches CI][28] | Analyse des échecs de tâches CI | Utilise des modèles LLM sur les logs pertinents pour analyser la cause racine des tâches CI ayant échoué. |
| [Filtrer les tâches CI sur le chemin critique][29] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Tentatives partielles][19] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| [Étapes manuelles][20] | Étapes manuelles | Consultez les pipelines déclenchés manuellement. |
| [Durée de mise en file d'attente][21] | Temps de mise en file d'attente | Afficher le temps pendant lequel les tâches de pipeline restent dans la file d'attente avant le traitement. |
| Corrélation de logs | Corrélation de logs | Mettre en corrélation les spans de pipeline avec les logs et activer la [collecte de logs de tâches][12]. |
| Mise en corrélation des métriques d'infrastructure | Mise en corrélation des métriques d'infrastructure | Mettre en corrélation les tâches avec les [métriques d'hôte d'infrastructure][14] pour les runners GitLab auto-hébergés. |
| Tags prédéfinis personnalisés | Tags prédéfinis personnalisés | Définir des [tags personnalisés][10] sur tous les spans de pipeline, stages et tâches générés. |
| [Tags personnalisés][15] [et mesures au runtime][16] | Tags personnalisés et mesures au runtime | Configurer les [tags personnalisés et les mesures][13] au runtime. |
| Paramètres | Paramètres | Définir des paramètres personnalisés `env` ou `service` lorsqu'un pipeline est déclenché. |
| [Raisons d'échec du pipeline][11] | Raisons de la défaillance d'un pipeline | Identifiez les raisons de la défaillance dʼun pipeline en vous basant sur les [messages d'erreur][15]. |
| [Temps d'attente d'approbation][22] | Temps d'attente d'approbation  | Afficher le temps d'attente des tâches et des pipelines pour les approbations manuelles. |
| [Temps d'exécution][23] | Durée d'exécution  | Consulter la durée pendant laquelle les pipelines ont exécuté des tâches. GitLab fait référence à cette métrique sous le nom `duration`. La durée dans GitLab et la durée d'exécution peuvent afficher des valeurs différentes. GitLab ne prend pas en considération les tâches qui ont échoué en raison de certains types d'échecs (tels que les échecs du système de runner). |
| [Spans personnalisées][25] | Spans personnalisées | Configurer des spans personnalisées pour vos pipelines. |

Les versions suivantes de GitLab sont prises en charge :

- GitLab.com (SaaS)
- GitLab >= 14.1 (auto-hébergé)
- GitLab >= 13.7.0 (auto-hébergé) avec le feature flag `datadog_ci_integration` activé

### Termes

Ce tableau montre le mappage des concepts entre Datadog CI Visibility et GitLab :

| Datadog                    | GitLab   |
|----------------------------|----------|
| Pipeline                   | Pipeline |
| Stage                      | Stage    |
| Job                        | Job      |
| _Non disponible dans Datadog_ | Script   |

## Configurer l'intégration Datadog

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configurez l'intégration sur un [projet][101] ou un [groupe][102] en accédant à **Settings > Integrations > Datadog** pour chaque projet ou groupe que vous souhaitez instrumenter.


Remplissez les paramètres de configuration de l'intégration :

**Active**
: permet d'activer l'intégration.

**Datadog site**
: Permet d'indiquer le [site Datadog][103] auquel envoyer les données.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (facultatif)
: permet de remplacer l'URL d'API utilisée pour l'envoi direct des données, utilisé uniquement dans des scénarios avancés.<br/>
**Valeur par défaut** : (vide, sans remplacement)

**API key**
: Spécifie quelle [clé d'API Datadog][104] utiliser lors de l'envoi de données.

**Enable CI Visibility**
: Contrôle l'activation des fonctionnalités CI Visibility, y compris le traçage de pipeline, le calcul du chemin critique et la surveillance des performances. Assurez-vous que cette case est cochée pour activer ces fonctionnalités.

**Service** (facultatif)
: Permet d'indiquer le nom de service à associer à chaque span générée par l'intégration. Utilisez ce paramètre pour différencier les instances GitLab.<br/>
**Valeur par défaut** : `gitlab-ci`

**Env** (facultatif)
: Spécifie quel environnement (tag `env`) attacher à chaque span généré par l'intégration. Utilisez cela pour différencier les groupes d'instances GitLab (par exemple, staging ou production).<br/>
**Valeur par défaut** : `none`

**Tags** (facultatif)
: Spécifie les tags personnalisés à attacher à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Valeur par défaut** : (vide, pas de tags supplémentaires)<br/>
**Remarque** : disponible uniquement dans GitLab.com et GitLab >= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton **Test settings** (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois réussi, cliquez sur **Save changes** pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur **Save changes** et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section "Recent events" ci-dessous.

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /fr/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

Configurez l'intégration sur un [projet][101] ou un [groupe][102] en accédant à **Settings > Integrations > Datadog** pour chaque projet ou groupe que vous souhaitez instrumenter. Vous pouvez également activer l'intégration au niveau de l'[instance][103] GitLab en accédant à **Admin > Settings > Integrations > Datadog**.

Remplissez les paramètres de configuration de l'intégration :

**Active**
: permet d'activer l'intégration.

**Datadog site**
: Permet d'indiquer le [site Datadog][104] auquel envoyer les données.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (facultatif)
: permet de remplacer l'URL d'API utilisée pour l'envoi direct des données, utilisé uniquement dans des scénarios avancés.<br/>
**Valeur par défaut** : (vide, sans remplacement)

**API key**
: Spécifie quelle [clé d'API Datadog][105] utiliser lors de l'envoi de données.

**Enable CI Visibility**
: Contrôle l'activation des fonctionnalités CI Visibility, y compris le traçage de pipeline, le calcul du chemin critique et la surveillance des performances. Assurez-vous que cette case est cochée pour activer ces capacités. Elle n'est présente qu'à partir de GitLab 17.7 et n'est pas requise dans les versions antérieures.

**Service** (facultatif)
: Permet d'indiquer le nom de service à associer à chaque span générée par l'intégration. Utilisez ce paramètre pour différencier les instances GitLab.<br/>
**Valeur par défaut** : `gitlab-ci`

**Env** (facultatif)
: Spécifie quel environnement (tag `env`) attacher à chaque span généré par l'intégration. Utilisez cela pour différencier les groupes d'instances GitLab (par exemple, staging ou production).<br/>
**Valeur par défaut** : `none`

**Tags** (facultatif)
: Spécifie les tags personnalisés à attacher à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Valeur par défaut** : (vide, pas de tags supplémentaires)<br/>
**Remarque** : disponible uniquement dans GitLab.com et GitLab >= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton **Test settings** (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois réussi, cliquez sur **Save changes** pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur **Save changes** et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section "Recent events" ci-dessous.

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /fr/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

Activez le [feature flag][101] `datadog_ci_integration` pour activer l'intégration.

Exécutez l'une des commandes suivantes, qui utilisent le [Rails Runner][102] de GitLab, selon votre type d'installation :

Depuis **Omnibus Installations** :

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Depuis **Source Installations** :

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Depuis **Kubernetes Installations** :

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Ensuite, configurez l'intégration sur un [projet][103] en accédant à **Settings > Integrations > Datadog** pour chaque projet que vous souhaitez instrumenter.

<div class="alert alert-warning">En raison d'un <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">bug</a> dans les versions précédentes de GitLab, l'intégration Datadog ne peut pas être activée au niveau <strong>du groupe ou de l'instance</strong> sur <strong>GitLab versions < 14.1</strong>, même si l'option est disponible sur l'interface utilisateur de GitLab</div>


Remplissez les paramètres de configuration de l'intégration :

**Active**
: permet d'activer l'intégration.

**Datadog site**
: Permet d'indiquer le [site Datadog][104] auquel envoyer les données.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (facultatif)
: permet de remplacer l'URL d'API utilisée pour l'envoi direct des données, utilisé uniquement dans des scénarios avancés.<br/>
**Valeur par défaut** : (vide, sans remplacement)

**API key**
: Spécifie quelle [clé d'API Datadog][105] utiliser lors de l'envoi de données.

**Service** (facultatif)
: Permet d'indiquer le nom de service à associer à chaque span générée par l'intégration. Utilisez ce paramètre pour différencier les instances GitLab.<br/>
**Valeur par défaut** : `gitlab-ci`

**Env** (facultatif)
: Spécifie quel environnement (tag `env`) attacher à chaque span généré par l'intégration. Utilisez cela pour différencier les groupes d'instances GitLab (par exemple, staging ou production).<br/>
**Valeur par défaut** : `none`

**Tags** (facultatif)
: Spécifie les tags personnalisés à attacher à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Valeur par défaut** : (vide, pas de tags supplémentaires)<br/>
**Remarque** : disponible uniquement dans GitLab.com et GitLab >= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton **Test settings** (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois réussi, cliquez sur **Save changes** pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur **Save changes** et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section "Recent events" ci-dessous.

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /fr/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab &lt; 13.7" %}}

<div class="alert alert-danger">La prise en charge directe avec les webhooks n'est pas en cours de développement. Des problèmes inattendus peuvent survenir. Datadog recommande de plutôt mettre à jour GitLab.</div>

Pour les versions antérieures de GitLab, vous pouvez utiliser les [webhooks][101] pour envoyer des données de pipeline à Datadog.

Accédez à **Settings > Webhooks** dans votre référentiel (ou paramètres d'instance GitLab), puis ajoutez un nouveau webhook :

- **URL** : <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> où `<API_KEY>` est votre [clé d'API Datadog][102].
- **Secret Token** : laissez ce champ vide.
- **Trigger** : sélectionnez `Job events` et `Pipeline events`.

Pour définir des paramètres `env` ou `service` personnalisés, ajoutez plus de paramètres de requête dans l'URL des webhooks. Par exemple, `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`.

### Appliquer des tags personnalisés

Pour définir des tags personnalisés sur tous les spans de pipeline et de tâche générés par l'intégration, ajoutez un paramètre de requête encodé en URL `tags` avec des paires `key:value` séparées par des virgules à l'URL.

Si une paire clé:valeur contient des virgules, entourez-la de guillemets. Par exemple, pour ajouter `key1:value1,"key2: value with , comma",key3:value3`, la chaîne suivante devrait être ajoutée à l'**URL du webhook** : `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Configuration avancée

### Appliquer des tags personnalisés

Vous pouvez définir des tags personnalisés pour tous les spans de pipeline et de tâche de vos projets GitLab afin d'améliorer la traçabilité. Pour en savoir plus, consultez la section [Tags et mesures personnalisés][13].

#### Intégration avec Datadog Teams

Pour afficher et filtrer les équipes associées à vos pipelines, ajoutez `team:<your-team>` en tant que tag personnalisé. Le nom du tag personnalisé doit correspondre exactement au nom de votre équipe [Datadog Teams][16].

### Mettre les métriques d'infrastructure en corrélation avec les tâches

Si vous utilisez des runners GitLab auto-hébergés, vous pouvez mettre en corrélation les tâches avec l'infrastructure qui les exécute.

Plusieurs méthodes sont disponibles pour la mise en corrélation d'infrastructure Datadog :

{{< tabs >}}
{{% tab "Exécuteurs sans autoscaling" %}}
L'exécuteur GitLab doit disposer d'un tag au format `host:<hostname>`. Les tags peuvent être ajoutés lors de l'[enregistrement d'un nouvel exécuteur][1]. Par conséquent, cette méthode n'est disponible que lorsque l'exécuteur exécute directement la tâche.

Cela exclut les exécuteurs qui mettent automatiquement à l'échelle l'infrastructure afin d'exécuter la tâche (tels que les exécuteurs Kubernetes, Docker Autoscaler ou Instance), car il n'est pas possible d'ajouter des tags dynamiquement pour ces exécuteurs.

Pour les exécuteurs existants :

- GitLab >= 15.8 : ajoutez des tags via l'interface en accédant à **Settings > CI/CD > Runners** et en modifiant l'exécuteur approprié.

- GitLab < 15.8 : ajoutez des tags en mettant à jour le `config.toml` de l'exécuteur. Ou ajoutez des tags via l'interface en accédant à **Settings > CI/CD > Runners** et en modifiant l'exécuteur approprié.

Après ces étapes, CI Visibility ajoute le nom d'host à chaque tâche. Pour voir les métriques, cliquez sur un span de tâche dans la vue des traces. Dans le panneau latéral, un nouvel onglet nommé **Infrastructure** apparaît et contient les métriques d'host.

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility prend en charge les métriques d'infrastructure pour les exécuteurs « Docker Autoscaler » via une corrélation basée sur les logs. Pour activer cette fonctionnalité, assurez-vous que les logs de tâches GitLab sont indexés afin que Datadog puisse lier les tâches aux hosts, et que les logs incluent des messages sous la forme `Instance <hostname> connected`. Les logs de tâches GitLab incluent les tags `datadog.product:cipipeline` et `source:gitlab`, que vous pouvez utiliser dans les filtres d'[index de logs][2]. Les utilisateurs doivent également disposer d'un [accès en lecture aux logs][3] pour voir les données d'infrastructure dans ce scénario. Pour en savoir plus, consultez le [guide Mettre en corrélation les métriques d'infrastructure avec les tâches GitLab][1].

[1]: /fr/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /fr/logs/indexes/
[3]: /fr/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Instance" %}}
CI Visibility prend en charge les métriques d'infrastructure pour les exécuteurs « Instance » via une corrélation basée sur les logs. Pour activer cela, assurez-vous que les logs de tâches GitLab sont indexés afin que Datadog puisse lier les tâches aux hosts, et que les logs incluent des messages sous la forme `Instance <hostname> connected`. Les logs de tâches GitLab incluent les tags `datadog.product:cipipeline` et `source:gitlab`, que vous pouvez utiliser dans les filtres d'[index de logs][2]. Les utilisateurs doivent également disposer d'un [accès en lecture aux logs][3] pour voir les informations d'infrastructure dans ce scénario. Pour en savoir plus, consultez le [guide Mettre en corrélation les métriques d'infrastructure avec les tâches GitLab][1].

[1]: /fr/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /fr/logs/indexes/
[3]: /fr/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility prend en charge les métriques d'infrastructure pour l'exécuteur Kubernetes. Pour cela, il est nécessaire que l'Agent Datadog surveille l'infrastructure Kubernetes GitLab. Consultez la section [Installer l'Agent Datadog sur Kubernetes][1] pour installer l'Agent Datadog dans un cluster Kubernetes.

En raison de limitations de l'Agent Datadog, les tâches plus courtes que l'intervalle de collecte minimal de l'Agent Datadog peuvent ne pas toujours afficher les métriques de corrélation d'infrastructure. Pour ajuster cette valeur, consultez le [modèle de configuration de l'Agent Datadog][2] et ajustez la variable `min_collection_interval` pour qu'elle soit inférieure à 15 secondes.

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
{{% /tab %}}

{{% tab "Autres exécuteurs" %}}
CI Visibility ne prend pas en charge les métriques d'infrastructure pour les autres exécuteurs.
{{% /tab %}}

{{< /tabs >}}

### Consulter les messages d'erreur pour les échecs de pipeline

Pour les exécutions de pipeline GitLab ayant échoué, chaque erreur sous l'onglet `Errors` dans une exécution de pipeline spécifique affiche un message associé au type d'erreur de GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="Raison d'échec GitLab" style="width:100%;">}}

#### Analyse des échecs de tâches CI

Si la collecte de logs de tâches est activée, CI Visibility utilise des modèles LLM pour analyser les tâches CI ayant échoué en se basant sur les logs pertinents provenant de GitLab.

Vous pouvez également ajouter une analyse d'échec de tâche à un commentaire de PR. Consultez le guide sur l'[utilisation des commentaires de PR][30].

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des échecs de tâches CI][28].

#### Erreurs fournies par GitLab

Les messages d'erreur sont pris en charge pour les versions GitLab 15.2.0 et ultérieures.

Les informations d'erreur fournies par GitLab sont stockées dans les tags `error.provider_message` et `error.provider_domain`.

Le tableau suivant décrit le message et le domaine corrélés à chaque type d'erreur. Tout type d'erreur non répertorié entraîne un message d'erreur `Job failed` et un domaine d'erreur `unknown`.

| Type d'erreur                       | Domaine d'erreur | Message d'erreur                                              |
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | unknown      | Échec dû à une raison inconnue.                             |
| `config_error`                   | utilisateur         | Échec dû à une erreur dans le fichier de configuration CI/CD.           |
| `external_validation_failure`    | unknown      | Échec dû à la validation de pipeline externe.                |
| `user_not_verified`              | utilisateur         | Le pipeline a échoué car l'utilisateur n'est pas vérifié.    |
| `activity_limit_exceeded`        | provider     | La limite d'activité du pipeline a été dépassée.                  |
| `size_limit_exceeded`            | provider     | La limite de taille du pipeline a été dépassée.                      |
| `job_activity_limit_exceeded`    | provider     | La limite d'activité de tâche du pipeline a été dépassée.              |
| `deployments_limit_exceeded`     | provider     | La limite de déploiements du pipeline a été dépassée.               |
| `project_deleted`                | provider     | Le projet associé à ce pipeline a été supprimé.     |
| `api_failure`                    | provider     | Échec de l'API.                                               |
| `stuck_or_timeout_failure`       | unknown      | Le pipeline est bloqué ou a expiré.                            |
| `runner_system_failure`          | provider     | Échec dû à une défaillance système de l'exécuteur.                       |
| `missing_dependency_failure`     | unknown      | Échec dû à une dépendance manquante.                          |
| `runner_unsupported`             | provider     | Échec dû à un exécuteur non pris en charge.                          |
| `stale_schedule`                 | provider     | Échec dû à une planification obsolète.                              |
| `job_execution_timeout`          | unknown      | Échec dû au délai d'expiration de la tâche.                                |
| `archived_failure`               | provider     | Échec archivé.                                         |
| `unmet_prerequisites`            | unknown      | Échec dû à des prérequis non remplis.                          |
| `scheduler_failure`              | provider     | Échec dû à une défaillance de planification.                            |
| `data_integrity_failure`         | provider     | Échec dû à l'intégrité des données.                              |
| `forward_deployment_failure`     | unknown      | Échec de déploiement.                                        |
| `user_blocked`                   | utilisateur         | Bloqué par l'utilisateur.                                           |
| `ci_quota_exceeded`              | provider     | Quota CI dépassé.                                         |
| `pipeline_loop_detected`         | utilisateur         | Boucle de pipeline détectée.                                    |
| `builds_disabled`                | utilisateur         | Build désactivé.                                            |
| `deployment_rejected`            | utilisateur         | Déploiement rejeté.                                      |
| `protected_environment_failure`  | provider     | Échec d'environnement.                                       |
| `secrets_provider_not_found`     | utilisateur         | Fournisseur de secrets introuvable.                                 |
| `reached_max_descendant_pipelines_depth` | utilisateur   | Profondeur maximale de pipelines descendants atteinte.                        |
| `ip_restriction_failure`          | provider     | Échec de restriction IP.                                    |

### Collecter les logs de tâches

Les versions suivantes de GitLab prennent en charge la collecte de logs de tâches :

* GitLab.com (SaaS)
* GitLab >= 15.3 (auto-hébergé) uniquement si vous utilisez le [stockage d'objets pour stocker les logs de tâches][7]
* GitLab >= 14.8 (auto-hébergé) en activant l'indicateur de fonctionnalité `datadog_integration_logs_collection`

Les logs de tâches sont collectés dans [Log Management][9] et sont automatiquement corrélés au pipeline GitLab dans CI Visibility. Les fichiers de logs d'une taille supérieure à un GiB sont tronqués.

Pour activer la collecte de logs de tâches :

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Cochez la case **Enable job logs collection** dans l'intégration GitLab sous **Settings > Integrations > Datadog**.
2. Cliquez sur **Save changes**.
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog télécharge les fichiers de logs directement depuis le <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">stockage d'objets</a> de vos logs GitLab avec des URL pré-signées temporaires.
Cela signifie que pour que les serveurs Datadog puissent accéder au stockage, celui-ci ne doit pas avoir de restrictions réseau.
Le <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, s'il est défini, doit être résolu en une URL accessible publiquement.</div>

1. Cochez la case **Enable job logs collection** dans l'intégration GitLab sous **Settings > Integrations > Datadog**.
2. Cliquez sur **Save changes**.

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog télécharge les fichiers de logs directement depuis le <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">stockage d'objets</a> de vos logs GitLab avec des URL pré-signées temporaires.
Cela signifie que pour que les serveurs Datadog puissent accéder au stockage, celui-ci ne doit pas avoir de restrictions réseau.
Le <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, s'il est défini, doit être résolu en une URL accessible publiquement.</div>

1. Activez l'[indicateur de fonctionnalité][1] `datadog_integration_logs_collection` dans votre GitLab. Cela vous permet de voir la case **Enable job logs collection** dans l'intégration GitLab sous **Settings > Integrations > Datadog**.
2. Cochez la case **Enable job logs collection**.
3. Cliquez sur **Save changes**.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index de logs sont configurés dans [Log Management][6]. Les logs des tâches GitLab peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:gitlab`.

Pour en savoir plus sur le traitement des logs de tâches collectés depuis l'intégration GitLab, consultez la [documentation sur les processeurs][17].

## Afficher les pipelines partiels et en aval

Vous pouvez utiliser les filtres suivants pour personnaliser votre requête de recherche dans l'[Explorateur CI Visibility][26].

{{< img src="ci/partial_retries_search_tags.png" alt="La page d'exécutions de pipeline avec Partial Pipeline:retry saisi dans la requête de recherche" style="width:100%;">}}

| Nom de la facette | ID de facette | Valeurs possibles |
|---|---|---|
| Downstream Pipeline | `@ci.pipeline.downstream` | `true`, `false` |
| Manually Triggered | `@ci.is_manual` | `true`, `false` |
| Partial Pipeline | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

Vous pouvez également appliquer ces filtres à l'aide du panneau de facettes sur le côté gauche de la page.

{{< img src="ci/partial_retries_facet_panel.png" alt="Le panneau de facettes avec la facette Partial Pipeline développée et la valeur Retry sélectionnée, la facette Partial Retry développée et la valeur true sélectionnée" style="width:20%;">}}

## Visualiser les données de pipeline dans Datadog

Une fois l'intégration configurée avec succès, les pages [**CI Pipeline List**][4] et [**Executions**][5] se remplissent de données une fois les pipelines terminés.

La page **CI Pipeline List** affiche uniquement les données de la branche par défaut de chaque référentiel. Pour en savoir plus, consultez la section [Rechercher et gérer les pipelines CI][27].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /fr/logs/guide/best-practices-for-log-management/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /fr/logs/
[10]: /fr/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /fr/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /fr/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[14]: /fr/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /fr/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /fr/account_management/teams/
[17]: /fr/logs/log_configuration/processors/
[18]: https://about.gitlab.com/
[19]: /fr/glossary/#partial-retry
[20]: /fr/glossary/#manual-step
[21]: /fr/glossary/#queue-time
[22]: /fr/glossary/#approval-wait-time
[23]: /fr/glossary/#pipeline-execution-time
[24]: /fr/glossary/#running-pipeline
[25]: /fr/glossary/#custom-span
[26]: /fr/continuous_integration/explorer
[27]: /fr/continuous_integration/search/#search-for-pipelines
[28]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[29]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[30]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments