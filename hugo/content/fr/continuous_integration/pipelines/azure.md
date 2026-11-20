---
aliases:
- /fr/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Surveillez Azure Pipelines avec Datadog CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendez Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration d'Azure Pipelines pour CI Visibility
---
<div class="alert alert-danger">
Azure DevOps Server n'est pas officiellement pris en charge.
</div>

## Présentation {#overview}

[Azure Pipelines][1] est un service d'intégration continue et de livraison continue qui prend en charge n'importe quel langage, plateforme ou cloud.

Configurez CI Visibility pour Azure Pipelines afin d'obtenir des informations en temps réel sur vos workflows CI/CD, de suivre les performances des pipelines, d'analyser les inefficacités et de gérer vos opérations de déploiement.

### Compatibilité {#compatibility}

| Pipeline Visibility                             | Plateforme                            | Définition                                                |
|-------------------------------------------------|-------------------------------------|-----------------------------------------------------------|
| [Analyse des logs][21] | Analyse des logs | Utilisez des modèles LLM sur les logs pertinents pour analyser la cause racine des jobs CI ayant échoué. |
| Corrélation des logs                                | Corrélation des logs                    | Corrélez les spans de pipeline et de job aux logs. Nécessite [Logs Storage](#logs-storage). |
| [Tags personnalisés][10] [et mesures au moment de l'exécution][11] | Tags personnalisés et mesures au moment de l'exécution | Configurez des [tags et mesures personnalisés][6] au moment de l'exécution.       |
| [Spans personnalisés][15]                              | Spans personnalisés                        | Configurez des spans personnalisés pour vos pipelines.                |
| [Filtrer les jobs CI sur le chemin critique][19]       | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique.                      |
| [Temps d'exécution][20]                            | Temps d'exécution                      | Affichez la durée pendant laquelle les pipelines ont exécuté des jobs. |

### Terminologie {#terminology}

Ce tableau montre la correspondance des concepts entre Datadog CI Visibility et Azure Pipelines :

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| Pipeline                   | Pipeline        |
| Phase                      | Étape           |
| Job                        | Job             |
| _Non disponible dans Datadog_ | Étape            |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}
{{< tabs >}} {{% tab "Intégration Datadog (recommandée)" %}}

### Activez CI Visibility dans Datadog {#enable-ci-visibility-in-datadog}

Une fois l'application Azure créée et installée, activez CI Visibility pour les organisations et les projets que vous souhaitez que Datadog surveille.

1. Vérifiez que votre organisation Azure DevOps est liée à un **locataire Microsoft Entra**. Consultez les [instructions de configuration du code source Azure][1] pour obtenir des conseils sur la connexion des projets Azure DevOps à Datadog.

2. Dans Datadog, accédez à [**Software Delivery → CI Visibility → Add a Pipeline Provider → Azure Pipelines**][2].

3. Cliquez sur {{< ui >}}Configure{{< /ui >}} à côté de l'organisation Azure DevOps que vous souhaitez activer.

4. Pour activer CI Visibility pour l'ensemble de l'organisation, activez {{< ui >}}Enable CI Visibility{{< /ui >}}. Les futurs projets détectés par l'application Azure seront automatiquement activés.

5. Pour activer CI Visibility pour des projets individuels:
   - Faites défiler la liste des projets.
   - Activez {{< ui >}}Enable CI Visibility{{< /ui >}} pour chaque projet que vous souhaitez surveiller.

Les pipelines apparaissent dans Datadog immédiatement après l'activation de CI Visibility pour une organisation ou un projet.

<div class="alert alert-danger">Si vous avez précédemment configuré Azure Pipelines à l'aide d'abonnements aux hooks de service, désactivez cette intégration avant d'activer CI Visibility pour les mêmes projets. L'exécution simultanée des deux intégrations n'entraîne pas de coûts supplémentaires, mais crée des données en double.</div>

[1]: /fr/integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "Abonnements aux hooks de service" %}}

L'intégration Datadog pour [Azure Pipelines][16] fonctionne en utilisant des [hooks de service][2] pour envoyer des données à Datadog.

1. Installez l'extension [Datadog CI Visibility][8] depuis Azure Marketplace. Il existe plusieurs extensions commençant par **Datadog**, assurez-vous d'installer l'extension [Datadog CI Visibility][8].

2. Pour chaque projet, accédez à {{< ui >}}Project settings{{< /ui >}} > {{< ui >}}Service hooks{{< /ui >}} dans Azure DevOps et sélectionnez l'icône plus verte (+) pour créer un abonnement.

3. Créez un abonnement au service `Datadog CI Visibility` pour chacun des types de webhook suivants. Ces types d'événements sont requis et doivent être activés individuellement.

    - {{< ui >}}Run state changed{{< /ui >}}
    - {{< ui >}}Run stage state changed{{< /ui >}}
    - {{< ui >}}Run job state changed{{< /ui >}}
    - {{< ui >}}Run stage approval completed{{< /ui >}}
    - {{< ui >}}Run stage waiting for approval{{< /ui >}}
    - {{< ui >}}Build completed{{< /ui >}}

4. Cliquez sur {{< ui >}}Next{{< /ui >}} pour passer à l'étape suivante et définir les éléments suivants :

    - {{< ui >}}Datadog Site{{< /ui >}} : `{{< region-param key="dd_site" >}}`
    - {{< ui >}}Datadog API Key{{< /ui >}} : Votre [clé d'API Datadog][3].

5. Cliquez sur {{< ui >}}Finish{{< /ui >}}.

### Configuration de plusieurs projets en masse {#configuring-multiple-projects-in-bulk}

Datadog propose un [script][12] pour vous aider à activer les hooks de service sur plusieurs ou la totalité de vos projets Azure en utilisant l'API Azure. Le script nécessite Python 3 et le package `requests`.

Pour exécuter le script, vous avez besoin de :

- Un nom d'utilisateur Azure DevOps
- Un [jeton d'API][13] Azure DevOps
- Un nom d'organisation Azure DevOps


Le script prend en charge les variables d'environnement `DD_API_KEY` et `DD_SITE`, ainsi que les paramètres de flag `--dd-api-key` et `--dd-site`.

Pour plus d'informations, vous pouvez exécuter la commande suivante :

```shell
./service_hooks.py --help
```

#### Tous les projets Azure {#all-azure-projects}

Exemple pour activer les hooks dans tous les projets :

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### Projets Azure spécifiques {#specific-azure-projects}

Exemple pour activer les hooks dans des projets spécifiés :

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


## Configuration avancée {#advanced-configuration}

### Définir des tags personnalisés {#set-custom-tags}

Vous pouvez définir des tags personnalisés pour tous les spans de pipeline et de job de vos projets Azure afin d'améliorer la traçabilité. Pour plus d'informations, consultez [Tags et mesures personnalisés][6].

### Gérer les logs de jobs {#manage-job-logs}

#### Analyse des logs {#logs-analysis}

L'analyse des logs utilise des modèles LLM pour classer les échecs de job par cause racine en fonction des logs pertinents provenant d'Azure Pipelines.

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des logs][21].

L'analyse des logs est activée par défaut dans Datadog. Pour recevoir les logs de job Azure Pipelines à des fins d'analyse, configurez l'intégration Datadog Azure DevOps en suivant les étapes indiquées dans la [tuile d'intégration Azure][14]. Pour gérer les paramètres d'analyse des logs, accédez aux [paramètres du dépôt CI/CD][23] et configurez l'analyse des logs au niveau de l'organisation Datadog ou pour les dépôts souhaités.

Vous pouvez également ajouter l'Analyse des logs à un commentaire de PR. Consultez le guide sur [l'utilisation des commentaires de PR][22].

#### Stockage des logs {#logs-storage}

Pour activer le stockage des logs, accédez aux [paramètres du dépôt CI/CD][23] et activez le stockage des logs au niveau de l'organisation Datadog ou pour les dépôts souhaités.

Logs Storage est facturé séparément de CI Visibility. La rétention, l'exclusion et les index des logs sont configurés dans [Log Management][18]. Les logs des jobs Azure peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:azurepipelines`.

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Les pages [**CI Pipeline List**][4] et [**Executions**][5] sont alimentées en données une fois les workflows terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Rechercher et gérer les pipelines CI][17].

## Pour aller plus loin {#further-reading}

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
[23]: https://app.datadoghq.com/ci/settings/ci-cd/repositories