---
aliases:
- /fr/continuous_integration/dora_metrics/setup/
- /fr/continuous_integration/dora_metrics/setup/deployments
- /fr/dora_metrics/setup/deployments
- /fr/dora_metrics/deployments/apm
- /fr/dora_metrics/deployments/deployment_api
- /fr/dora_metrics/deployments
- /fr/dora_metrics/setup/
description: Configurez les sources de données d'événements de déploiement pour DORA
  Metrics, notamment le suivi des déploiements APM, l'API et la CLI.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: En savoir plus sur DORA Metrics
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentation
  text: Découvrez comment les métriques DORA sont calculées
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: Documentation
  text: En savoir plus sur la détection des échecs de changement
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: En savoir plus sur le Catalog
- link: https://github.com/DataDog/datadog-ci
  tag: Code source
  text: En savoir plus sur l'outil CLI datadog-ci
title: Configurer DORA Metrics
---
## Présentation {#overview}

DORA Metrics suit et mesure les performances de votre livraison de logiciels à l'aide d'événements de déploiement. Ces événements alimentent les quatre métriques DORA clés : la fréquence de déploiement, le délai de livraison des changements, le taux d'échec des changements et le temps de restauration.

Pour commencer à utiliser DORA Metrics, suivez ces étapes :

1. **[Configurez une source de données de déploiement](#configure-a-deployment-data-source)** : Choisissez comment vous souhaitez envoyer les événements de déploiement à Datadog : via le suivi des déploiements APM ou l'API/CLI DORA Metrics.

2. **[Enrichissez les déploiements avec des informations de commit](#enrich-deployments-with-commit-information)** : ajoutez des métadonnées Git (URL du dépôt et commit SHA) à vos événements de déploiement et synchronisez votre dépôt avec Datadog pour activer les calculs du délai de changement.

3. **[Personnalisez la détection des échecs de changement](#customize-change-failure-detection)** : DORA Metrics détecte automatiquement les déploiements ayant échoué par retour en arrière (redéploiement d'une version précédente) et inclut des règles par défaut pour les modèles courants de rollforward, tels que les PR de réversion et les étiquettes de hotfix. Vous pouvez personnaliser ces règles pour qu'elles correspondent aux workflows et aux modèles de remédiation spécifiques de votre équipe.

Une fois configurés, les événements de déploiement alimentent automatiquement votre [dashboard DORA Metrics][1] avec des données de performance filtrées par équipe, service, environnement et [tags personnalisés](#custom-tags).

### Limitations {#limitations}

- Lorsque vous sélectionnez une option de source de données pour la première fois (telle que le suivi des déploiements APM), DORA Metrics commence à collecter des données à partir de ce moment-là. Si vous passez de la source A à la source B, puis revenez à la source A, les données historiques de la source A ne sont disponibles qu'à partir du moment où elles ont été sélectionnées pour la première fois.
- Les déploiements d'un même service ne peuvent pas se produire à la même seconde.

## Configurez une source de données de déploiement {#configure-a-deployment-data-source}

DORA Metrics prend en charge les sources de données suivantes pour les événements de déploiement :

{{< tabs >}}
{{% tab "Suivi de déploiements APM" %}}

Le [suivi des déploiements APM][1] peut être configuré comme source de données pour les déploiements dans DORA Metrics.

### Prérequis {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} est activé en tant que source de données d'événement {{< ui >}}Deployments{{< /ui >}} dans les [paramètres DORA][2].
- Votre service possède des [métadonnées][3] définies dans le Catalogue.
- Votre service a le [unified service tagging][4] activé. Les déploiements sont identifiés à l'aide du tag `version`.

Pour plus d'informations sur la façon de garantir que les déploiements de service suivis par APM contribuent au délai de changement, consultez [Enrichir les déploiements avec des informations de commit](#enrich-deployments-with-commit-information).

[1]: /fr/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /fr/internal_developer_portal/catalog/entity_model/
[4]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API ou CLI" %}}

Pour envoyer vos propres événements de déploiement, utilisez l'[API DORA Metrics][1] ou la commande [`datadog-ci dora deployment`][2].

### Prérequis {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} est activé en tant que source de données d'événement {{< ui >}}Deployments{{< /ui >}} dans les [paramètres DORA][3].
- Les attributs suivants sont requis :
  - `started_at` : L'heure à laquelle le déploiement a commencé.
  - `finished_at` : L'heure à laquelle le déploiement s'est terminé.
  - `service` : Le service qui a été déployé. Si le service fourni est enregistré dans le [Catalogue][4] avec des métadonnées configurées (voir [Ajout de métadonnées][5]), le `team` du service est automatiquement récupéré et associé à toutes les métriques.

Vous pouvez éventuellement ajouter les attributs suivants aux événements de déploiement :

- `repository_url` : Le dépôt de code source du service. Requis pour calculer le délai de changement.
- `commit_sha` : Le SHA du commit HEAD associé au déploiement. Requis pour calculer le délai de changement.
- `team` : Associez un déploiement à un `team` différent de celui trouvé automatiquement pour le service.
- `env` : Filtrez vos métriques DORA par environnement sur la page [DORA Metrics][6].
- `id` : Identifiez un déploiement. Cet attribut est généré par l'utilisateur ; lorsqu'il n'est pas fourni, l'endpoint renvoie un UUID généré par Datadog.
- `version` : La version du déploiement.
- `custom_tags` : Tags sous la forme `key:value` pouvant être utilisées pour filtrer les événements sur la page [DORA Metrics][6].


### Exemple d'API (cURL) {#api-curl-example}

Consultez la [documentation de référence dédiée à l'API DORA Metrics][1] pour consulter les spécifications complètes ainsi que d'autres exemples de code.

Pour l'exemple suivant, remplacez `<DD_SITE>` dans l'URL par {{< region-param key="dd_site" code="true" >}} et `${DD_API_KEY}` par votre [clé d'API Datadog][7] :

```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### Exemple de CLI {#cli-example}

L'outil CLI [`datadog-ci`][2] fournit un raccourci pour envoyer des événements de déploiement au sein de votre environnement d'intégration continue.

Pour l'exemple suivant, définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} et définissez la variable d'environnement `DD_API_KEY` sur votre [clé d'API Datadog][7] :

```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

L'heure de fin de déploiement est automatiquement définie sur maintenant si `--finished-at` n'est pas fourni.

Si le job CI de déploiement s'exécute sur la révision Git exacte qui est en cours de déploiement, `git-repository-url` et `git-commit-sha` peuvent être omis et sont automatiquement déduits du contexte CI.

L'option `--skip-git` peut être fournie pour désactiver l'envoi de l'URL du dépôt et du SHA du commit. Lorsque cette option est ajoutée, la métrique délai de changement devient indisponible.

[1]: /fr/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /fr/internal_developer_portal/catalog/
[5]: /fr/internal_developer_portal/catalog/entity_model/
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### Tags personnalisés {#custom-tags}

Si le service associé au déploiement est enregistré dans le [Catalog][2] avec des métadonnées configurées (voir [Adding Metadata][3]), le `languages` du service et tout `tags` sont automatiquement récupérés et associés à l'événement.

## Enrichissez les déploiements avec des informations de commit {#enrich-deployments-with-commit-information}

Pour activer le calcul du délai de changement, configurez les informations Git pour vos déploiements et synchronisez les métadonnées de votre dépôt avec Datadog. Cela permet à DORA Metrics de suivre le temps que prennent les commits de leur création jusqu'au déploiement.

### Ajoutez des informations Git aux déploiements {#attach-git-information-to-deployments}

Datadog a besoin d'accéder aux informations Git (URL du dépôt et SHA du commit) du SHA du commit de tête de votre déploiement. Les exigences diffèrent selon votre source de données de déploiement :

{{< tabs >}}
{{% tab "Suivi de déploiements APM" %}}

Pour les déploiements identifiés via le suivi des déploiements APM, assurez-vous que la télémétrie de votre application, sous forme de traces, est marquée avec des informations Git :

- Activez le marquage Git [dans APM][1] ou consultez la [documentation sur l'intégration du code source][2]

**Remarque** : Pour les déploiements suivis par APM, le délai de changement est calculé de la création du commit jusqu'à ce que le commit soit observé pour la première fois dans une nouvelle version. La métrique `Deploy Time` n'est pas disponible.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /fr/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API ou CLI" %}}

Pour les déploiements suivis par l'API DORA Metrics ou la commande `datadog-ci dora deployment`, assurez-vous que :

- Les attributs `repository_url` et `commit_sha` sont inclus dans la charge utile des événements de déploiement

{{% /tab %}}
{{< /tabs >}}

### Synchronisez les métadonnées du dépôt avec Datadog {#synchronize-repository-metadata-to-datadog}

Datadog a besoin d'accéder aux métadonnées de votre dépôt (commits, chemins de fichiers) pour récupérer tous les commits déployés entre un déploiement et le précédent. Choisissez la méthode de synchronisation en fonction de votre fournisseur Git :

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Les workflows GitHub s'exécutant sur <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> Le trigger </a> n'est actuellement pas pris en charge par l'intégration GitHub.
Si vous utilisez le <code>pull_request</code> déclencheur, utilisez la méthode alternative.
</div>

Si l'[intégration GitHub][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration GitHub][2].

Lors de la configuration de l'application GitHub :
1. Sélectionnez au moins {{< ui >}}Read{{< /ui >}} autorisations de dépôt pour {{< ui >}}Contents{{< /ui >}} et {{< ui >}}Pull Requests{{< /ui >}}.
2. Abonnez-vous au moins aux événements {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} et {{< ui >}}PullRequestReview{{< /ui >}}.

Pour confirmer que la configuration est valide, sélectionnez votre application GitHub dans la [tuile d'intégration GitHub][2] et vérifiez que le tableau {{< ui >}}Datadog Features{{< /ui >}} indique que {{< ui >}}Pull Request Information{{< /ui >}} répond à toutes les exigences.

[1]: /fr/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
Si l'[intégration GitLab Source Code][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration GitLab Source Code][2].

**Remarque** : Le périmètre du jeton d'accès personnel du compte de service doit être au moins `read_api`.

### Gestion des groupes et sous-groupes GitLab {#handling-gitlab-groups-and-subgroups}

Si vos dépôts sont organisés sous [**groupes ou sous-groupes GitLab**][3] (par exemple,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
La détection automatique du chemin de service peut ne pas être résolue correctement en raison de la structure imbriquée des groupes de GitLab.

Pour garantir que DORA Metrics traite correctement les chemins de code source de votre service,
vous pouvez utiliser la configuration suivante dans votre définition de service :

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```

[1]: /fr/integrations/gitlab-source-code/
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
[3]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
Si l'intégration a été installée avant le 2026-03-10, exécutez à nouveau le <a href="https://github.com/DataDog/azdevops-sci-hooks">script d'installation du webhook</a> pour vous assurer que toutes les métriques DORA sont calculées correctement. Si vous rencontrez des erreurs, relancez le script avant de contacter le support.
</div>

Si [Azure DevOps Source Code integration][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration Azure DevOps Source Code][2].

Pour configurer l'intégration :

1. Ouvrez la [tuile d'intégration Azure DevOps Source Code][2] dans Datadog.

2. Sélectionnez l'onglet {{< ui >}}Configuration{{< /ui >}} et cliquez sur {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.

3. Suivez les instructions de configuration.

4. Cliquez sur {{< ui >}}Add Organizations{{< /ui >}}.

5. Suivez les étapes d'installation du dépôt et [**exécutez le script d'installation**][3]. Si le script n'est pas exécuté, les commits effectués avant la création d'une demande de tirage ne seront pas associés à cette demande de tirage.

6. Une fois le script terminé, vérifiez le statut de l'intégration sur la tuile. Les dépôts et projets connectés apparaissent dans la liste.

[1]: https://docs.datadoghq.com/fr/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "Bitbucket" %}}

<div class="alert alert-warning">
Seul Bitbucket Cloud Premium est pris en charge. Bitbucket Data Center et Bitbucket Server ne sont <strong>pas</strong> pris en charge.
</div>

Si l'[intégration Bitbucket Cloud Source Code][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration Bitbucket Cloud Source Code][2].

Lorsque vous créez le workspace access token lors de la [configuration][3], accordez au moins les périmètres suivants :

- {{< ui >}}Repositories{{< /ui >}} : {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Pull requests{{< /ui >}} : {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Webhooks{{< /ui >}} : {{< ui >}}Read and write{{< /ui >}}

[1]: /fr/integrations/bitbucket-source-code/
[2]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[3]: /fr/integrations/bitbucket-source-code/#setup

{{% /tab %}}

{{% tab "Autres fournisseurs Git" %}}

Vous pouvez télécharger les métadonnées de votre dépôt Git avec la commande [`datadog-ci git-metadata upload`][1].
Lorsque cette commande est exécutée, Datadog reçoit l'URL du dépôt, le SHA du commit de la branche actuelle et une liste des chemins de fichiers suivis.

Exécutez cette commande en CI pour chaque nouveau commit. Si un déploiement est exécuté pour un SHA de commit spécifique, assurez-vous que la commande `datadog-ci git-metadata upload` est exécutée pour ce commit **avant** que l'événement de déploiement ne soit envoyé.

<div class="alert alert-danger">
Ne fournissez pas l'option <code>--no-gitsync</code> au <code>datadog-ci git-metadata upload</code> .
Lorsque cette option est incluse, les informations de commit ne sont pas envoyées à Datadog et la métrique du délai de changement n'est pas calculée.
</div>

Vous pouvez valider la configuration correcte de la commande en vérifiant la sortie de la commande. Un exemple de sortie correcte est :

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Gestion de plusieurs services dans le même dépôt {#handling-multiple-services-in-the-same-repository}

Si le code source de plusieurs services est présent dans le même dépôt, des actions supplémentaires sont nécessaires pour garantir que le délai de changement est calculé en ne prenant en compte que les commits affectant le service spécifique en cours de déploiement.

Pour filtrer les commits mesurés afin de ne conserver que ceux qui affectent le service, spécifiez les modèles de chemin de fichier glob du code source dans la [définition de service][4].

Si la définition de service contient une URL **complète** GitHub ou GitLab vers le dossier de l'application, un modèle de chemin unique est automatiquement utilisé. Le type de lien doit être **repo** et le nom du lien doit être soit « Source », soit le nom du service (`shopist` dans les exemples ci-dessous).

**Exemple (version de schéma v2.2) :**
{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{% tab "Azure DevOps" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: azure
    url: https://dev.azure.com/organization/project/_git/example-repository?path=/src/apps/shopist
```
{{% /tab %}}
{{< /tabs >}}

DORA Metrics pour le service `shopist` ne prend en compte que les commits Git qui incluent des modifications dans `src/apps/shopist/**`. Vous pouvez configurer un contrôle plus granulaire du filtrage avec `extensions[datadoghq.com/dora-metrics]`.**Exemple (version de schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

DORA Metrics pour le service `shopist` ne prend en compte que les commits Git qui incluent des modifications dans `src/apps/shopist/**` ou `src/libs/utils/**`.

Si les deux entrées de métadonnées sont définies pour un service, seul `extensions[datadoghq.com/dora-metrics]` est pris en compte pour filtrer les commits.

## Personnaliser la détection des échecs de changement{#customize-change-failure-detection}

DORA Metrics identifie automatiquement les déploiements ayant échoué pour calculer le taux d'échec des changements et le temps de récupération des déploiements ayant échoué.

### Fonctionnement {#how-it-works}

[Change Failure Detection][5] fonctionne immédiatement en identifiant les déploiements de remédiation et en les reliant au déploiement spécifique qu'ils corrigent.

**Détection automatique (aucune configuration nécessaire)** :
- **Rollbacks** : détectés automatiquement lorsqu'une version précédemment déployée est redéployée.

**Règles personnalisées (personnalisables)** :
- **Rollforwards** : détectés grâce à des règles par défaut qui correspondent à des modèles courants tels que les PR de rétablissement et les étiquettes de correctif urgent. Vous pouvez personnaliser ces règles dans les [DORA settings][6] pour les adapter aux workflows et aux modèles de remédiation spécifiques de votre équipe.

Pour des informations détaillées sur le fonctionnement de la détection et sur la manière de personnaliser les règles, consultez la [Change Failure Detection documentation][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /fr/internal_developer_portal/catalog/
[3]: /fr/internal_developer_portal/catalog/entity_model/
[4]: /fr/internal_developer_portal/catalog/entity_model/
[5]: /fr/delivery_performance/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora