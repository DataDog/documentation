---
aliases:
- /fr/continuous_integration/dora_metrics/setup/
- /fr/continuous_integration/dora_metrics/setup/deployments
- /fr/continuous_integration/dora_metrics/setup/incidents
- /fr/dora_metrics/setup/incidents
- /fr/dora_metrics/setup/deployments
- /fr/dora_metrics/setup/failures/
- /fr/dora_metrics/deployments/apm
- /fr/dora_metrics/deployments/deployment_api
- /fr/dora_metrics/deployments
- /fr/dora_metrics/failures/incident_api
- /fr/dora_metrics/failures/pagerduty
- /fr/dora_metrics/failures/
description: Configurez les sources de données de déploiement et d'échec pour les
  métriques DORA, y compris APM Deployment Tracking, l'API, la CLI et la gestion des
  incidents.
further_reading:
- link: /dora_metrics/
  tag: Documentation
  text: Découvrez les métriques DORA
- link: /dora_metrics/calculation
  tag: Documentation
  text: Apprenez comment les métriques DORA sont calculées
- link: /dora_metrics/change-failure-detection
  tag: Documentation
  text: Découvrez la détection des échecs de changement
- link: /tracing/software_catalog
  tag: Documentation
  text: En savoir plus sur le Software Catalog
- link: https://github.com/DataDog/datadog-ci
  tag: Code source
  text: Découvrez l'outil CLI datadog-ci
title: Configurer les métriques DORA
---
## Aperçu {#overview}

Les métriques DORA suivent et mesurent la performance de votre livraison de logiciels en utilisant des événements de déploiement. Ces événements alimentent les quatre indicateurs clés de DORA : la fréquence des déploiements, le délai de changement, le taux d'échec des changements et le temps de restauration.

Pour commencer à utiliser les métriques DORA, suivez ces étapes :

1. **[Configurez une source de données de déploiement](#configure-a-deployment-data-source)** : Choisissez comment vous souhaitez envoyer des événements de déploiement à Datadog : via APM Deployment Tracking ou l'API/CLI des métriques DORA.

2. **[Enrichissez les déploiements avec des informations de commit](#enrich-deployments-with-commit-information)** : Ajoutez des métadonnées Git (URL du dépôt et SHA de commit) à vos événements de déploiement et synchronisez votre dépôt avec Datadog pour permettre le calcul du délai de changement.

3. **[Personnalisez la détection des échecs de changement](#customize-change-failure-detection)** : Les métriques DORA détectent automatiquement les déploiements échoués par le biais de rollbacks (redéploiement d'une version précédente) et incluent des règles par défaut pour des modèles de rollforward courants comme les PR de revert et les étiquettes de hotfix. Vous pouvez personnaliser ces règles pour correspondre aux flux de travail spécifiques et aux modèles de remédiation de votre équipe.

4. **[(Optionnel) Configurez le suivi des incidents](#optional-set-up-incidents-tracking)** : Intégrez les données d'incidents pour corréler les échecs de changement détectés avec les incidents de production, fournissant une vue complète de la manière dont vos déploiements affectent la santé du service.

Une fois configurés, les événements de déploiement peuplent automatiquement votre [tableau de bord des métriques DORA][1] avec des données de performance filtrées par équipe, service, environnement et [tags personnalisés](#custom-tags).

### Limitations {#limitations}

- Lorsque vous sélectionnez pour la première fois une option de source de données (comme le suivi des déploiements APM), les métriques DORA commencent à peupler les données à partir de ce moment. Si vous passez de la source A à la source B, puis de nouveau à la source A, les données historiques de la source A ne sont disponibles qu'à partir du moment où elle a été sélectionnée pour la première fois.
- Les déploiements du même service ne peuvent pas se produire à la même seconde.

## Configurez une source de données de déploiement {#configure-a-deployment-data-source}

Les métriques DORA prennent en charge les sources de données suivantes pour les événements de déploiement :

{{< tabs >}}
{{% tab "Suivi de déploiements APM" %}}

Le suivi des déploiements APM peut être configuré comme source de données pour les déploiements dans les métriques DORA.

### Exigences {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} est activé en tant que source de données d'événements {{< ui >}}Deployments{{< /ui >}} dans les [paramètres DORA][2].
- Votre service a [métadonnées][3] définies dans le catalogue logiciel.
- Votre service a [étiquetage de service unifié][4] activé. Les déploiements sont identifiés à l'aide de l'étiquette `version`.

Pour plus d'informations sur la garantie que les déploiements de service suivis par APM contribuent au délai de changement, voir [Enrichir les déploiements avec des informations de commit](#enrich-deployments-with-commit-information).

[1]: /fr/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /fr/software_catalog/adding_metadata
[4]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API ou CLI" %}}

Pour envoyer vos propres événements de déploiement, utilisez l'[API des métriques DORA][1] ou la commande [`datadog-ci dora deployment`][2].

### Exigences {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} est activé en tant que source de données d'événements {{< ui >}}Deployments{{< /ui >}} dans les [paramètres DORA][3].
-  Les attributs suivants sont requis :
  - `started_at` : Le moment où le déploiement a commencé.
  - `finished_at` : Le moment où le déploiement a fini.
  - `service` : Le service qui a été déployé. Si le service fourni est enregistré dans le [catalogue logiciel][4] avec des métadonnées configurées (voir [Ajout de métadonnées][5]), le `team` du service est automatiquement récupéré et associé à toutes les métriques.

Vous pouvez ajouter en option les attributs suivants aux événements de déploiement :

- `repository_url` : Le dépôt de code source du service. Nécessaire pour calculer le délai de changement.
- `commit_sha` : Le SHA du commit HEAD associé au déploiement. Nécessaire pour calculer le délai de changement.
- `team` : Associer un déploiement à un `team` différent de celui trouvé automatiquement pour le service.
- `env` : Filtrer vos métriques DORA par environnement sur la page [Métriques DORA][6].
- `id` : Identifier un déploiement. Cet attribut est généré par l'utilisateur ; lorsqu'il n'est pas fourni, le point de terminaison renvoie un UUID généré par Datadog.
- `version` : La version du déploiement.
- `custom_tags` : Étiquettes sous la forme `key:value` qui peuvent être utilisées pour filtrer les événements sur la page [Métriques DORA][6].


###  Exemple d'API (cURL) {#api-curl-example}

Consultez la [documentation de référence dédiée à l'API DORA Metrics][1] pour consulter les spécifications complètes ainsi que d'autres exemples de code.

Pour l'exemple suivant, remplacez `<DD_SITE>` dans l'URL par {{< region-param key="dd_site" code="true" >}} et `${DD_API_KEY}` par votre [Clé API Datadog][7] :

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

###  Exemple CLI {#cli-example}

L'outil CLI [`datadog-ci`][2] fournit un raccourci pour envoyer des événements de déploiement dans votre environnement d'intégration continue.

Pour l'exemple suivant, définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} et définissez la variable d'environnement `DD_API_KEY` sur votre [Clé API Datadog][7] :

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

L'heure de fin du déploiement est automatiquement définie sur maintenant si `--finished-at` n'est pas fourni.

Si le travail CI de déploiement s'exécute sur la même révision Git que celle qui est déployée, `git-repository-url` et `git-commit-sha` peuvent être omis et sont automatiquement déduits du contexte CI.

L'option `--skip-git` peut être fournie pour désactiver l'envoi de l'URL du dépôt et du SHA du commit. Lorsque cette option est ajoutée, la métrique du délai de changement devient indisponible.

[1]: /fr/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /fr/tracing/software_catalog
[5]: /fr/tracing/software_catalog/adding_metadata
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

###  Étiquettes personnalisées {#custom-tags}

Si le service associé au déploiement est enregistré dans le [Catalogue de logiciels][2] avec des métadonnées configurées (voir [Ajout de métadonnées][3]), le `languages` du service et toutes les `tags` sont automatiquement récupérés et associés à l'événement.

## Enrichissez les déploiements avec des informations de commit {#enrich-deployments-with-commit-information}

Pour activer le calcul du délai de changement, configurez les informations Git pour vos déploiements et synchronisez les métadonnées de votre dépôt avec Datadog. Cela permet aux métriques DORA de suivre combien de temps les commits prennent de leur création à leur déploiement.

### Attachez les informations Git aux déploiements {#attach-git-information-to-deployments}

Datadog a besoin d'accéder aux informations Git (URL du dépôt et SHA du commit) du SHA du commit principal de votre déploiement. Les exigences diffèrent en fonction de votre source de données de déploiement :

{{< tabs >}}
{{% tab "Suivi de déploiements APM" %}}

Pour les déploiements identifiés par le suivi des déploiements APM, assurez-vous que la télémétrie de votre application est étiquetée avec des informations Git :

- Activez le balisage Git [dans APM][1] ou consultez la [documentation d'intégration du code source][2]

**Remarque** : Pour les déploiements suivis par APM, le délai de changement est calculé depuis la création du commit jusqu'à ce que le commit soit d'abord observé dans une nouvelle version. La métrique `Deploy Time` n'est pas disponible.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /fr/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API ou CLI" %}}

Pour les déploiements suivis par l'API des métriques DORA ou la commande `datadog-ci dora deployment`, assurez-vous :

- Les attributs `repository_url` et `commit_sha` sont inclus dans la charge utile des événements de déploiement

{{% /tab %}}
{{< /tabs >}}

### Synchronisez les métadonnées du dépôt avec Datadog {#synchronize-repository-metadata-to-datadog}

Datadog a besoin d'accéder à vos métadonnées de dépôt (commits, chemins de fichiers) pour récupérer tous les commits déployés entre un déploiement et le précédent. Choisissez la méthode de synchronisation en fonction de votre fournisseur Git :

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Les workflows GitHub s'exécutant sur <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> le déclencheur </a> n'est actuellement pas pris en charge par l'intégration GitHub.
Si vous utilisez le <code>pull_request</code> déclencheur, utilisez la méthode alternative.
</div>

Si l'[intégration GitHub][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration GitHub][2].

Lors de la configuration de l'application GitHub :
1. Sélectionnez au moins {{< ui >}}Read{{< /ui >}} autorisations de dépôt pour {{< ui >}}Contents{{< /ui >}} et {{< ui >}}Pull Requests{{< /ui >}}.
2. Abonnez-vous à au moins {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} et {{< ui >}}PullRequestReview{{< /ui >}} événements.

Pour confirmer que la configuration est valide, sélectionnez votre application GitHub dans la [tuile d'intégration GitHub][2] et vérifiez que le tableau {{< ui >}}Datadog Features{{< /ui >}} montre que {{< ui >}}Pull Request Information{{< /ui >}} répond à toutes les exigences.

[1]: /fr/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
Si l'[intégration du code source GitLab][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration du code source GitLab][2].

**Remarque** : La portée du jeton d'accès personnel du compte de service doit être d'au moins `read_api`.

### Gestion des groupes et sous-groupes GitLab {#handling-gitlab-groups-and-subgroups}

Si vos dépôts sont organisés sous [**groupes ou sous-groupes GitLab**][3] (par exemple,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
la détection automatique du chemin de service peut ne pas se résoudre correctement en raison de la structure de groupe imbriquée de GitLab.

Pour garantir que les métriques DORA gèrent correctement les chemins de code source de votre service,
vous pouvez utiliser la configuration suivante dans la définition de votre service :

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
Si l'intégration a été installée avant le 10 mars 2026, exécutez à nouveau le <a href="https://github.com/DataDog/azdevops-sci-hooks">script d'installation du webhook</a> pour vous assurer que toutes les métriques DORA sont calculées correctement. Si vous rencontrez des erreurs, réexécutez le script avant de contacter le support.
</div>

Si l'[intégration du code source Azure DevOps][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration du code source Azure DevOps][2].

Pour configurer l'intégration :

1. Ouvrez la [tuile d'intégration du code source Azure DevOps][2] dans Datadog.

2. Sélectionnez l'onglet {{< ui >}}Configuration{{< /ui >}} et cliquez sur {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.

3. Suivez les instructions de configuration.

4. Cliquez {{< ui >}}Add Organizations{{< /ui >}}.

5. Suivez les étapes d'installation du dépôt et [**exécutez le script d'installation**][3]. Si le script n'est pas exécuté, les commits effectués avant la création d'une demande de tirage ne seront pas associés à cette demande de tirage.

6. Après l'achèvement du script, vérifiez l'état d'intégration sur la tuile. Les dépôts et projets connectés apparaissent dans la liste.

[1]: https://docs.datadoghq.com/fr/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "Autres fournisseurs Git" %}}

Vous pouvez télécharger les métadonnées de votre dépôt Git avec la commande [`datadog-ci git-metadata upload`][1].
Lorsque cette commande est exécutée, Datadog reçoit l'URL du dépôt, le SHA du commit de la branche actuelle et une liste des chemins de fichiers suivis.

Exécutez cette commande dans CI pour chaque nouveau commit. Si un déploiement est exécuté pour un SHA de commit spécifique, assurez-vous que la commande `datadog-ci git-metadata upload` est exécutée pour ce commit **avant** que l'événement de déploiement soit envoyé.

<div class="alert alert-danger">
Ne fournissez pas le <code>--no-gitsync</code> option à la <code>datadog-ci git-metadata upload</code> commande.
Lorsque cette option est incluse, les informations de commit ne sont pas envoyées à Datadog et la métrique de temps de changement n'est pas calculée.
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

Si le code source de plusieurs services est présent dans le même dépôt, des actions supplémentaires sont nécessaires pour garantir que le temps de changement est calculé en tenant compte uniquement des commits affectant le service spécifique déployé.

Pour filtrer les commits mesurés afin de ne conserver que ceux qui affectent le service, spécifiez les motifs de chemin de fichier glob du code source dans la [définition du service][4].

Si la définition du service contient une URL **complète** de GitHub ou GitLab vers le dossier de l'application, un seul motif de chemin est utilisé automatiquement. Le type de lien doit être **repo** et le nom du lien doit être soit "Source" soit le nom du service (`shopist` dans les exemples ci-dessous).

**Exemple (version du schéma v2.2) :**
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

Les métriques DORA pour le service `shopist` ne considèrent que les commits Git qui incluent des modifications dans `src/apps/shopist/**`. Vous pouvez configurer un contrôle plus granulaire du filtrage avec `extensions[datadoghq.com/dora-metrics]`.**Exemple (version du schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Les métriques DORA pour le service `shopist` ne considèrent que les commits Git qui incluent des modifications dans `src/apps/shopist/**` ou `src/libs/utils/**`.

Si les deux entrées de métadonnées sont définies pour un service, seul `extensions[datadoghq.com/dora-metrics]` est considéré pour filtrer les commits.

## Personnaliser la détection des échecs de changement {#customize-change-failure-detection}

Les métriques DORA identifient automatiquement les déploiements échoués pour calculer le taux d'échec de changement et le temps de récupération des déploiements échoués.

### Comment cela fonctionne {#how-it-works}

[Détection des échecs de changement][5] fonctionne immédiatement en identifiant les déploiements de remédiation et en les liant au déploiement spécifique qu'ils remédient.

**Détection automatique (aucune configuration nécessaire)**:
- **Rollbacks**: Détecté automatiquement lorsqu'une version précédemment déployée est redéployée.

**Règles personnalisées (personnalisables)**:
- **Rollforwards**: Détecté par des règles par défaut qui correspondent à des modèles courants comme les PR de retour en arrière et les étiquettes de correctifs urgents. Vous pouvez personnaliser ces règles dans les [paramètres DORA][6] pour correspondre aux flux de travail spécifiques de votre équipe et aux modèles de remédiation.

Pour des informations détaillées sur le fonctionnement de la détection et sur la façon de personnaliser les règles, consultez la [documentation sur la détection des échecs de changement][5].

## (Optionnel) Configurer le suivi des incidents {#optional-set-up-incidents-tracking}

L'intégration des données d'incidents fournit une vue d'ensemble de la manière dont votre activité de déploiement impacte la santé du service. En suivant les incidents parallèlement aux échecs de changement détectés automatiquement, vous pouvez corréler la performance de livraison avec l'impact opérationnel réel et comprendre l'ensemble de l'histoire de l'effet de votre livraison de logiciel sur la fiabilité du service.

Les métriques DORA prennent en charge les options suivantes pour le suivi des incidents :

{{< tabs >}}
{{% tab "Incidents Datadog" %}}
Les métriques DORA peuvent identifier et suivre automatiquement les échecs via [Incidents Datadog][1]. Après la déclaration des incidents, DORA les utilise pour mesurer le taux d'échec de changement et le temps de restauration.

**Remarque** : Le temps de restauration est mesuré comme la durée totale qu'un incident passe dans l'état `active`. Pour des cas comme `active` → `stable` → `active` → `stable`, cela inclut toutes les périodes `active`. Le temps de restauration n'est affiché que lorsqu'un incident est dans un état `stable` ou `resolved`. Si un incident `resolved` est réactivé, la métrique est masquée jusqu'à ce qu'il soit `resolved` à nouveau.


### Exigences {#requirements-2}

- {{< ui >}}Incidents{{< /ui >}} est activé en tant que source de données d'événements {{< ui >}}Failures{{< /ui >}} dans [paramètres DORA][2].

Pour éviter d'avoir des échecs non étiquetés, Datadog recommande fortement d'ajouter les attributs suivants aux incidents :
  - {{< ui >}}Teams{{< /ui >}}
  - {{< ui >}}Services{{< /ui >}}
  - {{< ui >}}Envs{{< /ui >}} : L'attribut {{< ui >}}Envs{{< /ui >}} peut être ajouté dans les [Paramètres d'incidents][3] s'il n'existe pas déjà.

Si des incidents sont fournis, le tag `Severity` est ajouté aux événements d'échec.

**Recommandé** : Dans les [Paramètres d'incidents][3], définissez le champ des attributs {{< ui >}}Prompted{{< /ui >}} sur {{< ui >}}At Resolution{{< /ui >}} pour vous assurer de ne jamais oublier d'ajouter ces attributs à vos incidents.

### Inclure les incidents historiques {#include-historical-incidents}

Vous pouvez inclure rétroactivement des incidents des deux dernières années en sélectionnant {{< ui >}}Backfill Data{{< /ui >}} dans les [paramètres DORA][2], ce qui crée des pannes à partir de ces incidents. Le remplissage des données peut prendre jusqu'à une heure pour être complété.

[1]: /fr/incident_response/incident_management/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][1] est une plateforme de gestion des incidents qui équipe les équipes informatiques d'une visibilité immédiate des incidents, permettant des réponses proactives et efficaces pour maintenir la stabilité opérationnelle et la résilience.

Pour intégrer votre compte PagerDuty avec DORA Metrics :

1. Activez {{< ui >}}PagerDuty{{< /ui >}} en tant que source de données d'événements {{< ui >}}Failures{{< /ui >}} dans [paramètres DORA][2].

1. Accédez à {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Developer Tools{{< /ui >}} dans PagerDuty et cliquez sur {{< ui >}}Generic Webhooks (v3){{< /ui >}}.

1. Cliquez sur {{< ui >}}+ New Webhook{{< /ui >}} et entrez les détails suivants :

     <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>URL du webhook</td>
          <td>Ajouter <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>Type de portée</td>
          <td>Sélectionnez la portée des incidents que vous souhaitez envoyer. Vous pouvez envoyer des incidents pour un {{< ui >}}Service{{< /ui >}} ou {{< ui >}}Team{{< /ui >}} spécifique, ou tous les services PagerDuty dans votre {{< ui >}}Account{{< /ui >}}. Selon votre environnement et votre niveau d'accès, certains types de portée peuvent ne pas être disponibles.</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>Une description aide à distinguer le webhook. Ajoutez quelque chose comme <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>Abonnement à l'événement</td>
          <td>Sélectionnez les événements suivants :<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>En-têtes personnalisés</td>
          <td>Cliquez sur {{< ui >}}Add custom header{{< /ui >}}, entrez <code>DD-API-KEY</code> comme le nom, et saisissez votre <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">clé API Datadog</a> comme valeur.<br><br>Optionnellement, vous pouvez ajouter un environnement à tous les incidents PagerDuty envoyés depuis le webhook en créant un en-tête personnalisé supplémentaire avec le nom <code>dd_env</code> et l'environnement souhaité comme valeur.</td>
        </tr>
      </tbody>
    </table>

1. Pour enregistrer le webhook, cliquez sur {{< ui >}}Add Webhook{{< /ui >}}.

La gravité de l'échec dans le produit DORA Metrics est basée sur la [priorité de l'incident][3] dans PagerDuty.

**Remarque :** Lors de la création du webhook, un nouveau secret est créé et utilisé pour signer toutes les charges utiles du webhook. Ce secret n'est pas nécessaire pour que l'intégration fonctionne, car l'authentification est effectuée à l'aide de la clé API à la place.

### Associer les services PagerDuty aux services Datadog {#mapping-pagerduty-services-to-datadog-services}

Lorsqu'un événement d'incident est reçu pour un [service PagerDuty spécifique][4], Datadog tente de récupérer le service et l'équipe Datadog associés à partir de tout [moniteur Datadog déclencheur][5] et du [Catalogue de logiciels][6].

L'algorithme de correspondance fonctionne selon les étapes suivantes :

1. Si l'événement d'incident PagerDuty a été [déclenché par un moniteur Datadog][5] :
   - Si le moniteur est en [mode Multi Alerte][7], les métriques et événements d'incident sont émis avec le `env`, `service` et `team` du groupe alerté.
   - Si le moniteur a des [tags][8] pour `env`, `service` ou `team` :
     - `env` : Si le moniteur a un seul tag `env`, les métriques et événements d'incident sont émis avec l'environnement.
     - `service` : Si le moniteur a un ou plusieurs tags `service`, les métriques et événements d'incident sont émis avec les services fournis.
     - `team` : Si le moniteur a un seul tag `team`, les métriques et événements d'incident sont émis avec l'équipe.

2. Si l'URL du service de l'incident correspond à l'URL du service PagerDuty pour l'un des services dans le Catalogue de logiciels :
   - Si un seul service Datadog correspond, les métriques et événements d'incident sont émis avec le service et l'équipe.
   - Si plusieurs services Datadog correspondent, les métriques et événements d'incident sont émis avec l'équipe.

   Pour plus d'informations sur la configuration de l'URL du service PagerDuty pour un service Datadog, voir [Utiliser les intégrations avec le Catalogue de logiciels][9].

3. Si le nom du service PagerDuty de l'incident correspond à un nom de service dans le Catalogue de logiciels, les métriques et événements d'incident sont émis avec le service et l'équipe.
4. Si le nom de l'équipe PagerDuty de l'incident correspond à un nom d'équipe dans le Catalogue de logiciels, les métriques et événements d'incident sont émis avec l'équipe.
5. Si le nom du service PagerDuty de l'incident correspond à un nom d'équipe dans le Catalogue de logiciels, les métriques et événements d'incident sont émis avec l'équipe.
6. S'il n'y a eu aucune correspondance jusqu'à présent, les métriques et événements d'incident sont émis avec le service PagerDuty et l'équipe PagerDuty fournis dans l'incident.

<div class="alert alert-danger">
Si un incident est résolu manuellement dans PagerDuty au lieu d'une notification de moniteur, l'événement de résolution de l'incident ne contient pas d'informations sur le moniteur et la première étape de l'algorithme de correspondance est ignorée.
</div>

[1]: /fr/integrations/pagerduty/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://support.pagerduty.com/main/docs/incident-priority
[4]: https://support.pagerduty.com/docs/services-and-integrations
[5]: /fr/integrations/pagerduty/#troubleshooting
[6]: /fr/software_catalog/
[7]: /fr/monitors/configuration/#multi-alert
[8]: /fr/monitors/manage/#monitor-tags
[9]: /fr/software_catalog/integrations/#pagerduty-integration


{{% /tab %}}
{{% tab "API" %}}

Pour envoyer vos propres événements d'échec, utilisez l'[API des Métriques DORA][1]. Les événements d'échec sont utilisés pour calculer le taux d'échec de changement et le temps de restauration.

Incluez l'attribut `finished_at` dans un événement d'échec pour marquer que l'échec est résolu. Vous pouvez envoyer des événements au début de l'échec et après qu'il a été résolu. Les événements d'échec sont associés par les attributs `env`, `service` et `started_at`.

### Exigences {#requirements-3}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} est activé en tant que source de données d'événement {{< ui >}}Failures{{< /ui >}} dans les [paramètres DORA][2].
- Les attributs suivants sont requis :
  - `services` ou `team` (au moins un doit être présent)
  - `started_at`

Vous pouvez ajouter en option les attributs suivants aux événements d'échec :
- `finished_at` pour * les échecs résolus *. ***Requis pour calculer le temps de restauration***
- `id` pour identifier les échecs. Cet attribut est généré par l'utilisateur ; lorsqu'il n'est pas fourni, le point de terminaison renvoie un UUID généré par Datadog.
- `name` pour décrire l'échec.
- `severity`
- `env` pour filtrer vos métriques DORA par environnement sur la [{{< ui >}}DORA Metrics{{< /ui >}} page][3].
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags` : Étiquettes sous la forme `key:value` qui peuvent être utilisées pour filtrer les événements sur la page [{{< ui >}}DORA Metrics{{< /ui >}}][3].

Consultez la [documentation de référence dédiée à l'API DORA Metrics][1] pour consulter les spécifications complètes ainsi que d'autres exemples de code.

### Exemple d'API (cURL) {#api-curl-example-1}

Pour la configuration suivante, remplacez `<DD_SITE>` par {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[1]: /fr/api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/ci/dora


{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /fr/tracing/software_catalog
[3]: /fr/tracing/software_catalog/adding_metadata
[4]: /fr/tracing/software_catalog/adding_metadata
[5]: /fr/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora