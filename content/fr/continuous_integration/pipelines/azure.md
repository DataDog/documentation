---
aliases:
- /fr/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Surveiller des pipelines Azure avec la solution CI Visibility Datadog
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: Documentation
  text: Gagner en visibilité sur les pipelines en ajoutant des tags et des métriques
    personnalisés
title: Configurer le tracing sur un pipeline Azure
---

<div class="alert alert-warning">
Azure DevOps Server n'est pas officiellement pris en charge.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

- **Tags personnalisés et métriques à l'exécution** : configurez des [tags personnalisés][6] et des métriques à l'exécution.

## Configurer l'intégration Datadog

L'intégration Datadog pour les [pipelines Azure][1] repose sur l'utilisation de [hooks de service][2] pour envoyer des données à Datadog.

1. Installez l'extension [CI Visibility Datadog][8] à partir du Marketplace Azure.

2. Pour chaque projet, accédez à **Project settings > Service hooks** dans Azure DevOps, puis sélectionnez l'icône plus (+) verte pour créer un abonnement.

3. Créez un abonnement au service `Datadog CI Visibility` pour chacun des types de webhooks suivants :
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**

4. Cliquez sur **Next** pour passer à l'étape suivante et définir ce qui suit :
    - **Datadog Site** : {{< region-param key="dd_site" >}}
    - **Datadog API Key** : votre [clé d'API Datadog][3]

5. Cliquez sur **Finish**.

<div class="alert alert-info">
Les trois types d'événements pris en charge sont requis. Ils doivent être activés un par un.
Si vous n'activez pas un ou plusieurs événements, l'installation ne peut pas se terminer, ce qui donne lieu à des comportements inattendus dans Datadog.
</div>

### Configurer plusieurs projets à la fois


Si vous souhaitez activer les hooks d'un grand nombre de projets Azure, ou de tous vos projets Azure, Datadog propose un [script](https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py) vous permettant d'accomplir ces opérations via l'API Azure.

Pour exécuter le script, vous devez fournir les éléments suivants :

- Un nom d'utilisateur Azure DevOps
- Un [token d'API](https://learn.microsoft.com/fr-fr/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat) Azure DevOps
- Un nom d'organisation Azure DevOps

Le script nécessite uniquement Python 3 et le package des requêtes. Pour obtenir plus d'informations, exécutez ce qui suit :
```shell
./service_hooks.py --help
```

Le script prend en charge les variables d'environnement `DD_API_KEY` et `DD_SITE`, ainsi que les paramètres de flag `--dd-api-key` et `--dd-site`.

Exemple d'activation de hooks dans l'ensemble des projets
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

Exemple d'activation de hooks dans certains projets
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```

## Visualiser des données de pipeline dans Datadog

Les pages [Pipelines][4] et [Pipeline Executions][5] affichent des données après l'exécution des workflows.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /fr/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility