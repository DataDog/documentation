---
aliases:
- /fr/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Surveiller des pipelines Azure avec la solution CI Visibility Datadog
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendre Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration d'Azure Pipelines pour CI Visibility
---

<div class="alert alert-danger">
Azure DevOps Server n'est pas officiellement pris en charge.
</div>

## Section Overview

[Azure Pipelines][1] est un service d'intégration et de livraison continues qui prend en charge n'importe quel langage, plateforme ou cloud.

Configurez CI Visibility pour Azure Pipelines afin d'obtenir des informations en temps réel sur vos workflows CI/CD, de suivre les performances des pipelines, d'analyser les inefficacités et de gérer vos opérations de déploiement.

### Compatibilité

| Pipeline Visibility                             | Plateforme                            | Définition                                                |
|-------------------------------------------------|-------------------------------------|-----------------------------------------------------------|
| [Tags personnalisés][10] [et mesures au moment de l'exécution][11] | Tags et mesures personnalisés au moment de l'exécution | Configurer des [tags et des mesures personnalisés][6] au moment de l'exécution.       |
| [Spans personnalisées][15]                              | Spans personnalisées                        | Configurer des spans personnalisées pour vos pipelines.                |
| [Filtrer les tâches CI sur le chemin critique][19]       | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique.                      |
| [Temps d'exécution][20]                            | Durée d'exécution                      | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |

### Termes

Ce tableau présente le mappage des concepts entre Datadog CI Visibility et Azure Pipelines :

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| Pipeline                   | Pipeline        |
| Stage                      | Stage           |
| Job                        | Job             |
| _Non disponible dans Datadog_ | Step            |

## Configurer l'intégration Datadog
{{< tabs >}} {{% tab "Datadog Integration (recommended)" %}}

### Activer CI Visibility dans Datadog

Une fois l'application Azure créée et installée, activez CI Visibility pour les organisations et les projets que vous souhaitez que Datadog surveille.

1. Vérifiez que votre organisation Azure DevOps est liée à un **locataire Microsoft Entra**. Consultez les [instructions de configuration du code source Azure][1] pour obtenir des conseils sur la connexion des projets Azure DevOps à Datadog.

2. Dans Datadog, accédez à [**Software Delivery → CI Visibility → Add a Pipeline Provider → Azure Pipelines**][2].

3. Cliquez sur **Configure** à côté de l'organisation Azure DevOps que vous souhaitez activer.

4. Pour activer CI Visibility pour l'ensemble de l'organisation, basculez **Enable CI Visibility**. Les projets futurs détectés par l'application Azure seront automatiquement activés.

5. Pour activer CI Visibility pour des projets individuels :
   - Parcourez la liste des projets.
   - Basculez **Enable CI Visibility** pour chaque projet que vous souhaitez surveiller.

Les pipelines apparaissent immédiatement dans Datadog après l'activation de CI Visibility pour une organisation ou un projet.

[1]: /fr/integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "Service Hook Subscriptions" %}}

L'intégration Datadog pour [Azure Pipelines][16] fonctionne en utilisant des [hooks de service][2] pour envoyer des données à Datadog.

1. Installez l'extension [Datadog CI Visibility][8] depuis Azure Marketplace. Il existe plusieurs extensions commençant par **Datadog**, assurez-vous d'installer l'extension [Datadog CI Visibility][8].

2. Pour chaque projet, accédez à **Project settings > Service hooks** dans Azure DevOps et sélectionnez l'icône plus verte (+) pour créer un abonnement.

3. Créez un abonnement au service `Datadog CI Visibility` pour chacun des types de webhooks suivants. Ces types d'événements sont requis et doivent être activés individuellement.

    - **État d’exécution modifié**
    - **État de l’étape d’exécution modifié**
    - **État du travail d’exécution modifié**
    - **Run stage approval completed**
    - **Run stage waiting for approval**
    - **Build completed**

4. Cliquez sur **Next** pour continuer à l'étape suivante et définissez ce qui suit :

    - **Datadog Site** : `{{< region-param key="dd_site" >}}`
    - **Datadog API Key** : votre [clé d'API Datadog][3].

5. Cliquez sur **Finish**.

### Configurer plusieurs projets en masse

Datadog propose un [script][12] pour vous aider à activer les hooks de service sur plusieurs ou tous vos projets Azure à l'aide de l'API Azure. Le script nécessite Python 3 et le package `requests`.

Pour exécuter le script, vous avez besoin :

- D'un nom d'utilisateur Azure DevOps
- D'un [token d'API][13] Azure DevOps
- D'un nom d'organisation Azure DevOps


Le script prend en charge les variables d'environnement `DD_API_KEY` et `DD_SITE`, ainsi que les paramètres de flags `--dd-api-key` et `--dd-site`.

Pour plus d'informations, vous pouvez exécuter la commande suivante :

```shell
./service_hooks.py --help
```

#### Tous les projets Azure

Exemple pour activer les hooks dans tous les projets :

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### Projets Azure spécifiques

Exemple pour activer les hooks dans des projets spécifiés :

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[16]: /fr/integrations/azure_devops/

{{% /tab %}}
{{< /tabs >}}


## Configuration avancée

### Appliquer des tags personnalisés

Vous pouvez définir des tags personnalisés pour tous les spans de pipeline et de tâches de vos projets Azure afin d'améliorer la traçabilité. Pour plus d'informations, consultez la section [Tags et mesures personnalisés][6].

### Collecter les logs de tâches

<div class="alert alert-info">La collecte de logs Azure est en version Preview. Pour demander l'accès, remplissez <a href="https://forms.gle/vXEQQcPLARdSDLd27">ce formulaire</a>.</div>

Datadog prend en charge la collecte de logs pour vos pipelines Azure DevOps.

Pour activer la collecte de logs de tâches :

1. Installez une inscription d'application Datadog sur votre console Azure. Suivez les étapes de la [vignette d'intégration Azure][14].

2. Ajoutez l'inscription d'application Datadog à votre organisation Azure DevOps :
  <br>a. Accédez à **Organization settings** dans votre console DevOps.
  <br>b. Cliquez sur **Users** dans le panneau latéral gauche, puis cliquez sur **Add Users**.<br>**Remarque** : si vous ne voyez pas le bouton **Add Users**, vous n'avez peut-être pas les autorisations nécessaires.

Pour activer la collecte de logs, ajoutez votre inscription d'application en tant qu'utilisateur avec Basic Access Level à chaque projet. Vous pouvez également cliquer sur **Add to all projects** pour configurer tous les projets en masse.

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index de logs sont configurés dans [Log Management][18]. Les logs pour les tâches Azure peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:azurepipelines`.

### Analyse des échecs de tâches CI

Si la collecte de logs de tâches est activée, CI Visibility utilise des modèles LLM pour calculer l'analyse des tâches CI ayant échoué en fonction des logs pertinents provenant d'Azure Pipelines.

Vous pouvez également ajouter l'analyse des échecs de tâches à un commentaire de PR. Consultez le guide sur [l'utilisation des commentaires de PR][22].

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des échecs de tâches CI][21].

## Visualiser les données de pipeline dans Datadog

Les pages [**CI Pipeline List**][4] et [**Executions**][5] se remplissent de données une fois les workflows terminés.

La page **CI Pipeline List** affiche des données uniquement pour la branche par défaut de chaque référentiel. Pour plus d'informations, consultez la section [Rechercher et gérer les pipelines CI][17].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /fr/glossary/#custom-tag
[11]: /fr/glossary/#custom-measure
[14]: https://app.datadoghq.com/integrations/azure
[15]: /fr/glossary/#custom-span
[17]: /fr/continuous_integration/search/#search-for-pipelines
[18]: /fr/logs/guide/best-practices-for-log-management/
[19]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /fr/glossary/#pipeline-execution-time
[21]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments