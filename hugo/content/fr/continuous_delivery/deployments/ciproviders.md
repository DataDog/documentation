---
description: Apprenez à surveiller les déploiements effectués par des fournisseurs
  CI dans Datadog CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrez comment interroger et visualiser les déploiements
is_beta: true
title: Surveillez les déploiements effectués par les fournisseurs CI
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

Les [déploiements][10] peuvent être effectués dans vos pipelines d'intégration continue (CI). En général, ces pipelines comportent une étape de déploiement qui est exécutée après le test du code source et la construction de l'image.

Si vous exécutez des déploiements à l'aide d'un fournisseur CI, vous pouvez surveiller vos déploiements avec Deployment Visibility. Assurez-vous que les exigences suivantes sont remplies :

1. Vous utilisez [Pipeline Visibility][1] pour surveiller vos pipelines CI.
2. Votre fournisseur CI prend en charge la fonctionnalité **Custom tags and measures at runtime**, qui vous permet d'ajouter des [tags textuels et numériques définis par l'utilisateur][2] aux pipelines et aux jobs dans Pipeline Visibility.
3. Vous exécutez des déploiements dans un job CI (ou un [niveau associé][9] dans votre fournisseur CI). Le concept de job CI peut varier selon votre fournisseur. Pour plus d'informations sur la façon dont Datadog définit un job CI, consultez la [section Terminologie][9].

## Configuration {#setup}

<div class="alert alert-info">
La configuration nécessite le <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>datadog-ci</code> CLI </a> version `2.26.0` ou ultérieure.
</div>

Pour configurer CD Visibility, utilisez la commande `datadog-ci deployment mark` dans le job CI qui effectue le déploiement.

Deux variables d'environnement sont requises :

1. `DD_API_KEY` : faites pointer cette variable vers votre [clé d'API Datadog][4].
2. `DD_BETA_COMMANDS_ENABLED` : définissez sa valeur sur 1.

En option, vous pouvez définir la variable d'environnement `DD_SITE` sur un [site Datadog][3] spécifique. Votre site est {{< region-param key="dd_site" code="true" >}}.

Vous pouvez enrichir l'événement de déploiement généré par la commande `datadog-ci deployment mark` en utilisant les paramètres suivants :

| Paramètre       | Description                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | L'environnement dans lequel ce déploiement est effectué. Par exemple, `prod`.                                                             |
| `--service`     | Le nom du service en cours de déploiement. Par exemple, `transaction-service`. Cette option nécessite la version `2.31.1` ou ultérieure de `datadog-ci` |
| `--revision`    | La révision ou la version en cours de déploiement. Par exemple, `1.0.0` ou `v123-456`.                                                     |
| `--is-rollback` | Indique que le déploiement est un rollback.                                                                                            |
| `--tags`        | Un tableau de paires clé-valeur au format `key:value`. Ces tags sont ajoutés à l'événement de déploiement affiché dans Datadog.                   |

Utilisez `--no-fail` (par défaut : `false`) pour éviter que la commande de déploiement n'échoue en cas de problème lors de la soumission des données.

Si vous utilisez GitHub Actions comme fournisseur d'intégration continue (CI), consultez la [section ci-dessous][11] pour en savoir plus.

Une fois la commande ajoutée à un job CI, la [page **Deployments**][5] et la [page Deployment Executions][6] sont alimentées en données après l'exécution des pipelines.
Pour plus d'informations, consultez [Explorer les déploiements dans CD Visibility][8].

### Exemples {#examples}

Cet ensemble de commandes spécifie que le job CI exécute un déploiement vers l'environnement `prod` avec la version `1.0.0` :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

Cet ensemble de commandes spécifie que le job CI effectue un déploiement de rollback vers l'environnement `prod` :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

Cet ensemble de commandes spécifie que le job CI exécute un déploiement vers l'environnement `prod` et ajoute les tags `team:backend` et `reason:scheduled` à l'événement de déploiement :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## Marquer les jobs GitHub Actions comme des déploiements {#mark-github-actions-jobs-as-deployments}


À partir de la version `4.1.1` de `datadog-ci`, aucune action supplémentaire n'est requise, même lors de l'utilisation de noms personnalisés ou de stratégies de matrice.

{{% collapse-content title="Pour les versions de datadog-ci antérieures à 4.1.1" level="h3" expanded=false %}}

Si vous utilisez `datadog-ci` dans une version comprise entre `2.29.0` et `4.1.0` et que le nom du job ne correspond pas à l'entrée définie dans le fichier de configuration du workflow (l'[ID du job][12] GitHub), la variable d'environnement `DD_GITHUB_JOB_NAME` doit être exposée et pointer vers le nom du job. Par exemple :

1. Si le nom du job est modifié à l'aide de la [propriété name][13] :
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. Si la [stratégie de matrice][14] est utilisée, plusieurs noms de job sont générés par GitHub en ajoutant les valeurs de la matrice à la fin du nom du job,
   entre parenthèses. La variable d'environnement `DD_GITHUB_JOB_NAME` doit alors être conditionnelle aux valeurs de la matrice :

    ```yaml
    jobs:
      deployment:
        strategy:
          matrix:
            env: [dev, staging]
        env:
          DD_GITHUB_JOB_NAME: deployment (${{ matrix.env }})
        steps:
        - run: datadog-ci deployment mark ...
    ```

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/continuous_integration/pipelines/
[2]: /fr/continuous_integration/pipelines/custom_tags_and_measures/
[3]: /fr/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/ci/deployments
[6]: https://app.datadoghq.com/ci/deployments/executions
[7]: /fr/continuous_delivery/search
[8]: /fr/continuous_delivery/explorer
[9]: /fr/continuous_integration/pipelines/#terminology
[10]: /fr/continuous_delivery/deployments
[11]: /fr/continuous_delivery/deployments/ciproviders#mark-github-actions-jobs-as-deployments
[12]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[13]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[14]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy