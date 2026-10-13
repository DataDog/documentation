---
aliases:
- /fr/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendez Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration de GitLab pour CI Visibility
---
## Présentation {#overview}

[GitLab][18] est une plateforme DevOps qui automatise le cycle de vie du développement logiciel avec des fonctionnalités CI/CD intégrées, permettant le déploiement automatisé et continu d'applications avec des contrôles de sécurité intégrés.

Configurez CI Visibility pour GitLab afin de collecter des données sur vos exécutions de pipeline, d'analyser les goulots d'étranglement de performance, de résoudre les problèmes opérationnels et d'optimiser vos workflows de déploiement.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Pipelines en cours d'exécution][24] | Pipelines en cours d'exécution | Affichez les exécutions de pipeline en cours d'exécution. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| [Jobs en cours d'exécution][32] | Jobs en cours d'exécution | Affichez les exécutions de jobs actuellement en cours d'exécution. |
| [Analyse des échecs des jobs CI][28] | Analyse des échecs des jobs CI | Utilise des modèles LLM sur les logs pertinents pour analyser la cause racine des jobs CI ayant échoué. |
| [Filtrer les jobs CI sur le chemin critique][29] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Réessais partiels][19] | Pipelines partiels | Affichez les exécutions de pipeline ayant fait l'objet de réessais partiels. |
| [Réessais automatiques de jobs][31] | Réessais automatiques de jobs | Datadog réessaie les jobs ayant échoué classés comme transitoires par son modèle d'erreur IA. |
| [Étapes manuelles][20] | Étapes manuelles | Affichez les pipelines déclenchés manuellement. |
| [Temps de file d'attente][21] | Temps de file d'attente | Affichez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités. |
| Corrélation des logs | Corrélation des logs | Corrélez les spans de pipeline aux logs et activez la [collecte des logs de job][12]. |
| Corrélation des métriques d'infrastructure | Corrélation des métriques d'infrastructure | Corrélez les jobs aux [métriques de host d'infrastructure][14] pour les runners GitLab auto-hébergés. |
| Tags prédéfinis personnalisés | Tags prédéfinis personnalisés | Définissez des [tags personnalisés][10] pour tous les spans générés de pipeline, de phase et de job. |
| [Tags personnalisés][15] [et mesures au moment de l'exécution][16] | Tags et mesures personnalisés au moment de l'exécution | Configurez des [tags et mesures personnalisés][13] au moment de l'exécution. |
| Paramètres | Paramètres | Définissez des paramètres `env` ou `service` personnalisés lorsqu'un pipeline est déclenché. |
| [Raisons d'échec du pipeline][11] | Raisons d'échec du pipeline | Identifiez les raisons d'échec du pipeline à partir des [messages d'erreur][15]. |
| [Temps d'attente d'approbation][22] | Temps d'attente d'approbation  | Affichez la durée pendant laquelle les jobs et les pipelines attendent des approbations manuelles. |
| [Temps d'exécution][23] | Temps d'exécution  | Affichez la durée pendant laquelle les pipelines ont exécuté des jobs. Gitlab désigne cette métrique sous le nom de `duration`. La durée dans Gitlab et le temps d'exécution peuvent afficher des valeurs différentes. Gitlab ne prend pas en considération les jobs qui ont échoué en raison de certains types de défaillances (telles que les défaillances du système de runner). |
| [Spans personnalisés][25] | Spans personnalisés | Configurez des spans personnalisés pour vos pipelines. |

Les versions de GitLab suivantes sont prises en charge :

- GitLab.com (SaaS)
- GitLab >= 14.1 (auto-hébergé)
- GitLab >= 13.7.0 (auto-hébergé) avec le feature flag `datadog_ci_integration` activé

### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et GitLab :

| Datadog                    | GitLab   |
|----------------------------|----------|
| Pipeline                   | Pipeline |
| Phase                      | Étape    |
| Job                        | Job      |
| _Non disponible dans Datadog_ | Script   |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configurez l'intégration sur un [projet][101] ou un [groupe][102] en accédant à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} pour chaque projet ou groupe que vous souhaitez instrumenter.


Remplissez les paramètres de configuration de l'intégration :

{{< ui >}}Active{{< /ui >}}
: Active l'intégration.

{{< ui >}}Datadog site{{< /ui >}}
: Spécifie le [site Datadog][103] vers lequel envoyer les données.<br/>
**Par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (facultatif)
: Permet de remplacer l'URL de l'API utilisée pour l'envoi direct de données, uniquement utilisé dans des scénarios avancés.<br/>
**Par défaut**: (vide, aucun remplacement)

{{< ui >}}API key{{< /ui >}}
: Spécifie la [clé d'API Datadog][104] à utiliser lors de l'envoi de données.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: Contrôle l'activation des fonctionnalités de CI Visibility, y compris le traçage des pipelines, le calcul du chemin critique et la surveillance des performances. Assurez-vous que cette case est cochée pour activer ces fonctionnalités.

{{< ui >}}Service{{< /ui >}} (facultatif)
: Spécifie le nom de service à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les instances GitLab.<br/>
**Par défaut**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (facultatif)
: Spécifie l'environnement (tag `env`) à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les groupes d'instances GitLab (par exemple, pré-production ou production).<br/>
**Par défaut** : `none`

{{< ui >}}Tags{{< /ui >}} (facultatif)
: Spécifie tous les tags personnalisés à associer à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Par défaut** : (vide, aucun tag supplémentaire)<br/>
**Remarque** : Disponible uniquement sur GitLab.com et GitLab &gt;= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton {{< ui >}}Test settings{{< /ui >}} (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois l'opération réussie, cliquez sur {{< ui >}}Save changes{{< /ui >}} pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur {{< ui >}}Save changes{{< /ui >}} et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section « Événements récents » ci-dessous.

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /fr/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

Configurez l'intégration sur un [projet][101] ou un [groupe][102] en accédant à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} pour chaque projet ou groupe que vous souhaitez instrumenter. Vous pouvez également activer l'intégration au niveau de l'[instance][103] GitLab en allant dans {{< ui >}}Admin{{< /ui >}} &gt; {{< ui >}}Settings{{< /ui >}} &gt; {{< ui >}}Integrations{{< /ui >}} &gt; {{< ui >}}Datadog{{< /ui >}}.

Remplissez les paramètres de configuration de l'intégration :

{{< ui >}}Active{{< /ui >}}
: Active l'intégration.

{{< ui >}}Datadog site{{< /ui >}}
: Spécifie le [site Datadog][104] vers lequel envoyer les données.<br/>
**Par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (facultatif)
: Permet de remplacer l'URL de l'API utilisée pour l'envoi direct de données, uniquement utilisé dans des scénarios avancés.<br/>
**Par défaut**: (vide, aucun remplacement)

{{< ui >}}API key{{< /ui >}}
: Spécifie quelle [clé d'API Datadog][105] utiliser lors de l'envoi de données.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: Contrôle l'activation des fonctionnalités de CI Visibility, y compris le traçage des pipelines, le calcul du chemin critique et la surveillance des performances. Assurez-vous que cette case est cochée pour activer ces fonctionnalités. Elle n'est présente qu'à partir de GitLab 17.7 et n'est pas requise dans les versions antérieures.

{{< ui >}}Service{{< /ui >}} (facultatif)
: Spécifie le nom de service à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les instances GitLab.<br/>
**Par défaut**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (facultatif)
: Spécifie l'environnement (tag `env`) à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les groupes d'instances GitLab (par exemple, pré-production ou production).<br/>
**Par défaut** : `none`

{{< ui >}}Tags{{< /ui >}} (facultatif)
: Spécifie tous les tags personnalisés à associer à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Par défaut** : (vide, aucun tag supplémentaire)<br/>
**Remarque** : Disponible uniquement sur GitLab.com et GitLab &gt;= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton {{< ui >}}Test settings{{< /ui >}} (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois l'opération réussie, cliquez sur {{< ui >}}Save changes{{< /ui >}} pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur {{< ui >}}Save changes{{< /ui >}} et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section « Événements récents » ci-dessous.

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /fr/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

Activez le `datadog_ci_integration` feature flag [101] pour activer l'intégration.

Exécutez l'une des commandes suivantes, qui utilisent le [Rails Runner][102] de GitLab, selon votre type d'installation :

Depuis **les installations Omnibus** :

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Depuis **les installations à partir des sources** :

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Depuis **Installations Kubernetes** :

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Ensuite, configurez l'intégration sur un [project][103] en allant dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} pour chaque projet que vous souhaitez instrumenter.

<div class="alert alert-warning">En raison d'un <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">bug</a> dans les premières versions de GitLab, l'intégration Datadog ne peut pas être activée au niveau <strong>groupe ou instance</strong> sur les <strong>versions de GitLab < 14.1</strong>, même si l'option est disponible dans l'interface utilisateur de GitLab.</div>


Remplissez les paramètres de configuration de l'intégration :

{{< ui >}}Active{{< /ui >}}
: Active l'intégration.

{{< ui >}}Datadog site{{< /ui >}}
: Spécifie le [site Datadog][104] vers lequel envoyer les données.<br/>
**Par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (facultatif)
: Permet de remplacer l'URL de l'API utilisée pour l'envoi direct de données, uniquement utilisé dans des scénarios avancés.<br/>
**Par défaut**: (vide, aucun remplacement)

{{< ui >}}API key{{< /ui >}}
: Spécifie quelle [clé d'API Datadog][105] utiliser lors de l'envoi de données.

{{< ui >}}Service{{< /ui >}} (facultatif)
: Spécifie le nom de service à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les instances GitLab.<br/>
**Par défaut**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (facultatif)
: Spécifie l'environnement (tag `env`) à associer à chaque span généré par l'intégration. Utilisez ceci pour différencier les groupes d'instances GitLab (par exemple, pré-production ou production).<br/>
**Par défaut** : `none`

{{< ui >}}Tags{{< /ui >}} (facultatif)
: Spécifie tous les tags personnalisés à associer à chaque span généré par l'intégration. Fournissez un tag par ligne au format : `key:value`.<br/>
**Par défaut** : (vide, aucun tag supplémentaire)<br/>
**Remarque** : Disponible uniquement sur GitLab.com et GitLab &gt;= 14.8 auto-hébergé.

Vous pouvez tester l'intégration avec le bouton {{< ui >}}Test settings{{< /ui >}} (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois l'opération réussie, cliquez sur {{< ui >}}Save changes{{< /ui >}} pour terminer la configuration de l'intégration. Si le bouton échoue, cliquez sur {{< ui >}}Save changes{{< /ui >}} et vérifiez que les premiers webhooks envoyés sont réussis en consultant l'historique dans la section « Événements récents » ci-dessous.

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /fr/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab < 13.7" %}}

<div class="alert alert-danger">Le support direct avec les webhooks n'est pas en cours de développement. Des problèmes inattendus pourraient survenir. Datadog vous recommande de mettre à jour GitLab.</div>

Pour les versions plus anciennes de GitLab, vous pouvez utiliser [webhooks][101] pour envoyer des données de pipeline à Datadog.

Allez dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} dans votre dépôt (ou les paramètres de l'instance GitLab), et ajoutez un nouveau webhook :

- {{< ui >}}URL{{< /ui >}} : <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> où `<API_KEY>` est votre [clé d'API Datadog][102].
- {{< ui >}}Secret Token{{< /ui >}} : Laissez ce champ vide.
- {{< ui >}}Trigger{{< /ui >}} : Sélectionnez `Job events` et `Pipeline events`.

Pour définir des paramètres `env` ou `service` personnalisés, ajoutez d'autres paramètres de requête dans l'URL des webhooks. Par exemple, `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`.

### Définir des tags personnalisés {#set-custom-tags}

Pour définir des tags personnalisés pour tous les spans de pipeline et de job générés par l'intégration, ajoutez un paramètre de requête encodé en URL `tags` avec des paires `key:value` séparées par des virgules à l'URL.

Si une paire clé:valeur contient des virgules, entourez-la de guillemets : Par exemple, pour ajouter `key1:value1,"key2: value with , comma",key3:value3`, la chaîne suivante devrait être ajoutée au {{< ui >}}Webhook URL{{< /ui >}} : `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Configuration avancée {#advanced-configuration}

### Définir un nom de pipeline {#set-a-pipeline-name}

Par défaut, Datadog utilise le chemin de votre projet GitLab comme nom de pipeline. Par conséquent, chaque pipeline en aval (enfant) déclenché avec le mot-clé [`trigger`][33] depuis le même projet apparaît sous le même nom dans Datadog.

Pour donner un nom plus significatif à un pipeline, utilisez le mot-clé [`workflow:name`][34] de GitLab dans votre `.gitlab-ci.yml`. Par exemple, pour nommer un pipeline en aval d'après le job qui l'a déclenché :

```yaml
trigger-job:
  trigger:
    include:
      - local: path/to/child-pipeline.yml
  variables:
    CHILD_PIPELINE_NAME: $CI_JOB_NAME
```

Dans le `.gitlab-ci.yml` du pipeline enfant (ou un fichier qu'il inclut), utilisez la variable transmise pour définir le nom du pipeline :

```yaml
workflow:
  name: '$CHILD_PIPELINE_NAME'
```

**Remarque** : L'exemple ci-dessus utilise l'expansion de variable dans le nom du pipeline, ce qui nécessite GitLab 16.3 ou une version ultérieure. `workflow:name` lui-même est disponible à partir de GitLab 15.11 pour les noms sous forme de chaîne de caractères simple. Le nom du pipeline n'est visible dans Datadog qu'à partir de GitLab 16.1, date à laquelle il a été ajouté à la charge utile du webhook de pipeline.

### Définir des tags personnalisés {#set-custom-tags-1}

Vous pouvez définir des tags personnalisés pour tous les spans de pipeline et de job à partir de vos projets GitLab afin d'améliorer la traçabilité. Pour plus d'informations, consultez [Tags et mesures personnalisés][13].

#### Intégration avec Datadog Teams {#integrate-with-datadog-teams}

Pour afficher et filtrer les équipes associées à vos pipelines, ajoutez `team:<your-team>` comme tag personnalisé. Le nom du tag personnalisé doit correspondre exactement à l'identifiant de votre équipe [Datadog Teams][16].

### Corréler les métriques d'infrastructure aux jobs {#correlate-infrastructure-metrics-to-jobs}

Si vous utilisez des runners GitLab auto-hébergés, vous pouvez corréler les jobs avec l'infrastructure qui les exécute.

La corrélation d'infrastructure Datadog est possible en utilisant différentes méthodes :

{{< tabs >}}
{{% tab "Exécuteurs sans mise à l'échelle automatique" %}}
Le runner GitLab doit avoir un tag sous la forme `host:<hostname>`. Les tags peuvent être ajoutés lors de l'[enregistrement d'un nouveau runner][1]. Par conséquent, cette méthode n'est disponible que lorsque le runner exécute directement le job.

Cela exclut les exécuteurs qui mettent à l'échelle l'infrastructure automatiquement afin d'exécuter le job (tels que les exécuteurs Kubernetes, Docker Autoscaler ou Instance), car il n'est pas possible d'ajouter des tags dynamiquement pour ces runners.

Pour les runners existants :

- GitLab >= 15.8 : Ajoutez des tags via l'interface utilisateur en allant dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}} et en modifiant le runner approprié.

- GitLab < 15.8 : Ajoutez des tags en mettant à jour le `config.toml` du runner. Ou ajoutez des tags via l'interface utilisateur en allant dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}} et en modifiant le runner approprié.

Après ces étapes, CI Visibility ajoute le nom de host à chaque job. Pour voir les métriques, cliquez sur un span de job dans la vue des traces. Dans le panneau latéral, un nouvel onglet nommé {{< ui >}}Infrastructure{{< /ui >}} apparaît, contenant les métriques du host.

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility prend en charge les métriques d'infrastructure pour les exécuteurs « Docker Autoscaler » via une corrélation basée sur les logs. Pour activer cette fonctionnalité, assurez-vous que les logs de job GitLab sont indexés afin que Datadog puisse lier les jobs aux hosts, et que les logs incluent des messages sous la forme `Instance <hostname> connected`. Les logs de job GitLab incluent les tags `datadog.product:cipipeline` et `source:gitlab`, que vous pouvez utiliser dans les filtres [Log Indexes][2]. Les utilisateurs ont également besoin d'un [accès en lecture aux logs][3] pour voir les données d'infrastructure dans ce scénario. Pour plus d'informations, consultez le [guide de corrélation des métriques d'infrastructure avec les jobs GitLab][1].

[1]: /fr/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /fr/logs/indexes/
[3]: /fr/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Instance" %}}
CI Visibility prend en charge les métriques d'infrastructure pour les exécuteurs « Instance » via une corrélation basée sur les logs. Pour activer cette fonctionnalité, assurez-vous que les logs de job GitLab sont indexés afin que Datadog puisse lier les jobs aux hosts, et que les logs incluent des messages sous la forme `Instance <hostname> connected`. Les logs de job GitLab incluent les tags `datadog.product:cipipeline` et `source:gitlab`, que vous pouvez utiliser dans les filtres [Log Indexes][2]. Les utilisateurs ont également besoin d'un [accès en lecture aux logs][3] pour voir les informations d'infrastructure dans ce scénario. Pour plus d'informations, consultez le [guide de corrélation des métriques d'infrastructure avec les jobs GitLab][1].

[1]: /fr/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /fr/logs/indexes/
[3]: /fr/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility prend en charge les métriques d'infrastructure pour l'exécuteur Kubernetes. Pour cela, il est nécessaire que le Datadog Agent surveille l'infrastructure Kubernetes GitLab. Consultez [Installer le Datadog Agent sur Kubernetes][1] pour installer le Datadog Agent dans un cluster Kubernetes.

En raison des limitations du Datadog Agent, les jobs plus courts que l'intervalle de collecte minimal du Datadog Agent pourraient ne pas toujours afficher les métriques de corrélation d'infrastructure. Pour ajuster cette valeur, réglez `min_collection_interval` sur moins de 15 secondes dans votre [fichier de configuration de l'Agent][2].

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: /fr/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "Autres exécuteurs" %}}
CI Visibility ne prend pas en charge les métriques d'infrastructure pour les autres exécuteurs.
{{% /tab %}}

{{< /tabs >}}

### Afficher les messages d'erreur pour les échecs de pipeline {#view-error-messages-for-pipeline-failures}

Pour les exécutions de pipeline GitLab ayant échoué, chaque erreur sous l'onglet {{< ui >}}Errors{{< /ui >}} au sein d'une exécution de pipeline spécifique affiche un message associé au type d'erreur provenant de GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="Raison de l'échec GitLab" style="width:100%;">}}

#### Analyse des échecs de jobs CI {#ci-jobs-failure-analysis}

Si la collecte des logs de jobs est activée, CI Visibility utilise des modèles LLM pour analyser les jobs CI ayant échoué en se basant sur les logs pertinents provenant de GitLab.

Vous pouvez également ajouter une analyse des échecs de jobs à un commentaire de PR. Consultez le guide sur [l'utilisation des commentaires de PR][30].

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des échecs de jobs CI][28].

#### Erreurs fournies par GitLab {#errors-provided-by-gitlab}

Les messages d'erreur sont pris en charge pour les versions 15.2.0 ou supérieures de GitLab.

Les informations d'erreur fournies par GitLab sont stockées dans les tags `error.provider_message` et `error.provider_domain`.

Le tableau suivant décrit le message et le domaine corrélés à chaque type d'erreur. Tout type d'erreur non répertorié entraîne un message d'erreur `Job failed` et un domaine d'erreur `unknown`.

| Type d'erreur                       | Domaine d'erreur | Message d'erreur                                              |
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | inconnu      | Échec dû à une raison inconnue.                             |
| `config_error`                   | utilisateur         | Échec dû à une erreur dans le fichier de configuration CI/CD.           |
| `external_validation_failure`    | inconnu      | Échec dû à une validation de pipeline externe.                |
| `user_not_verified`              | utilisateur         | Le pipeline a échoué car l'utilisateur n'a pas été vérifié.    |
| `activity_limit_exceeded`        | fournisseur     | La limite d'activité du pipeline a été dépassée.                  |
| `size_limit_exceeded`            | fournisseur     | La limite de taille du pipeline a été dépassée.                      |
| `job_activity_limit_exceeded`    | fournisseur     | La limite d'activité des jobs du pipeline a été dépassée.              |
| `deployments_limit_exceeded`     | fournisseur     | La limite de déploiements du pipeline a été dépassée.               |
| `project_deleted`                | fournisseur     | Le projet associé à ce pipeline a été supprimé.     |
| `api_failure`                    | fournisseur     | Échec de l'API.                                               |
| `stuck_or_timeout_failure`       | inconnu      | Le pipeline est bloqué ou a expiré.                            |
| `runner_system_failure`          | fournisseur     | Échec dû à une défaillance du système de l'exécuteur.                       |
| `missing_dependency_failure`     | inconnu      | Échec dû à une dépendance manquante.                          |
| `runner_unsupported`             | fournisseur     | Échec dû à un exécuteur non pris en charge.                          |
| `stale_schedule`                 | fournisseur     | Échec dû à un planning obsolète.                              |
| `job_execution_timeout`          | inconnu      | Échec dû à un dépassement de délai du job.                                |
| `archived_failure`               | fournisseur     | Échec d'archivage.                                         |
| `unmet_prerequisites`            | inconnu      | Échec dû à un prérequis non satisfait.                          |
| `scheduler_failure`              | fournisseur     | Échec dû à une erreur de planning.                            |
| `data_integrity_failure`         | fournisseur     | Échec dû à un problème d'intégrité des données.                              |
| `forward_deployment_failure`     | inconnu      | Échec du déploiement.                                        |
| `user_blocked`                   | utilisateur         | Bloqué par l'utilisateur.                                           |
| `ci_quota_exceeded`              | fournisseur     | Quota CI dépassé.                                         |
| `pipeline_loop_detected`         | utilisateur         | Boucle de pipeline détectée.                                    |
| `builds_disabled`                | utilisateur         | Build désactivé.                                            |
| `deployment_rejected`            | utilisateur         | Déploiement rejeté.                                      |
| `protected_environment_failure`  | fournisseur     | Échec de l'environnement.                                       |
| `secrets_provider_not_found`     | utilisateur         | Fournisseur de secret introuvable.                                 |
| `reached_max_descendant_pipelines_depth` | utilisateur   | Nombre maximal de pipelines descendants atteint.                        |
| `ip_restriction_failure`          | fournisseur     | Échec de la restriction IP.                                    |

### Collecter les logs des jobs {#collect-job-logs}

Les versions GitLab suivantes prennent en charge la collecte des logs des jobs :

* GitLab.com (SaaS)
* GitLab >= 15.3 (auto-hébergé) uniquement si vous utilisez le [stockage d'objets pour stocker les logs des jobs][7]
* GitLab >= 14.8 (auto-hébergé) en activant le feature flag `datadog_integration_logs_collection`

Les logs des jobs sont collectés dans [Log Management][9] et sont automatiquement corrélés avec le pipeline GitLab dans CI Visibility. Les fichiers logs de plus d'un Gio sont tronqués.

Pour activer la collecte des logs des jobs :

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Cochez la case {{< ui >}}Enable job logs collection{{< /ui >}} dans l'intégration GitLab {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Cliquez sur {{< ui >}}Save changes{{< /ui >}}.
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog télécharge les fichiers logs directement depuis votre <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">stockage d'objets</a> de logs GitLab avec des URL temporaires pré-signées.
Cela signifie que pour que les serveurs Datadog puissent accéder au stockage, celui-ci ne doit pas avoir de restrictions réseau
L'<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, s'il est défini, doit pointer vers une URL accessible publiquement.</div>

1. Cochez la case {{< ui >}}Enable job logs collection{{< /ui >}} dans l'intégration GitLab sous {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Cliquez sur {{< ui >}}Save changes{{< /ui >}}.

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog télécharge les fichiers logs directement depuis votre <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">stockage d'objets</a> de logs GitLab avec des URL temporaires pré-signées.
Cela signifie que pour que les serveurs Datadog puissent accéder au stockage, celui-ci ne doit pas avoir de restrictions réseau
L'<a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, s'il est défini, doit pointer vers une URL accessible publiquement.</div>

1. Activez le `datadog_integration_logs_collection` [feature flag][1] dans votre GitLab. Cela vous permet de voir la {{< ui >}}Enable job logs collection{{< /ui >}} case à cocher dans l'intégration GitLab sous {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Cliquez sur {{< ui >}}Enable job logs collection{{< /ui >}}.
3. Cliquez sur {{< ui >}}Save changes{{< /ui >}}.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index des logs sont configurés dans [Log Management][6]. Les logs des jobs GitLab peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:gitlab`.

Pour plus d'informations sur le traitement des logs de jobs collectés via l'intégration GitLab, consultez la [documentation des processeurs][17].

## Afficher les pipelines partiels et en aval {#view-partial-and-downstream-pipelines}

Vous pouvez utiliser les filtres suivants pour personnaliser votre requête de recherche dans le [CI Visibility Explorer][26].

{{< img src="ci/partial_retries_search_tags.png" alt="La page des exécutions de pipeline avec « Partial Pipeline:retry » saisi dans la requête de recherche." style="width:100%;">}}

| Nom de la facette | ID de la facette | Valeurs possibles |
|---|---|---|
| Pipeline en aval | `@ci.pipeline.downstream` | `true`, `false` |
| Déclenché manuellement | `@ci.is_manual` | `true`, `false` |
| Partial Pipeline | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

Vous pouvez également appliquer ces filtres en utilisant le panneau des facettes sur le côté gauche de la page.

{{< img src="ci/partial_retries_facet_panel.png" alt="Le panneau des facettes avec la facette « Partial Pipeline » développée et la valeur « Retry » sélectionnée, ainsi que la facette « Partial Retry » développée et la valeur « true » sélectionnée." style="width:20%;">}}

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Une fois l'intégration configurée avec succès, les pages [**CI Pipeline List**][4] et [**Executions**][5] sont alimentées en données une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Search and Manage CI Pipelines][27].

## Pour aller plus loin {#further-reading}

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
[31]: /fr/continuous_integration/pipelines/automatic_retries/
[32]: /fr/glossary/#running-job
[33]: https://docs.gitlab.com/ee/ci/yaml/#trigger
[34]: https://docs.gitlab.com/ee/ci/yaml/#workflowname