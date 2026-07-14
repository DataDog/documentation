---
description: Découvrez comment surveiller des déploiements de fournisseurs CI dans
  la solution CD Visibility de Datadog.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
is_beta: true
title: Surveiller des déploiements de fournisseurs CI
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility pour les déploiements de fournisseur CI est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

Vous pouvez effectuer des [déploiements][10] dans vos pipelines d'intégration continue (CI). Généralement, pour ces pipelines, l'étape de déploiement est exécutée après le test du code source et la génération de l'image.

Si vous exécutez des déploiements à l'aide d'un fournisseur CI, vous pouvez surveiller vos déploiements avec Deployment Visibility. Pour ce faire, vérifiez que vous respectez les exigences suivantes :

1. Vous utilisez [Pipeline Visibility][1] pour surveiller vos pipelines de CI.
2. Votre fournisseur CI prend en charge la fonctionnalité **Custom tags and measures at runtime**, qui vous permet d'ajouter des [tags textuels et numériques définis par l'utilisateur][2] à des pipelines et des jobs dans Pipeline Visibility.
3. Vous exécutez des déploiements dans un job CI (ou à un [niveau lié][9] dans votre fournisseur CI). Le concept de job CI peut varier selon votre fournisseur. Pour en savoir plus sur la définition d'un job CI par Datadog, consultez la [rubrique Terminologie][9].

## Configuration

<div class="alert alert-info">
La configuration nécessite la version `2.26.0` ou une version ultérieure de la CLI <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>datadog-ci</code></a>.
</div>

Pour configurer CD Visibility, utilisez la commande `datadog-ci deployment mark` au sein du job CI exécutant le déploiement.

Deux variables d'environnement sont requises :

1. `DD_API_KEY` : pointez vers votre [clé d'API Datadog][4].
2. `DD_BETA_COMMANDS_ENABLED` : définissez cette variable sur 1.

Si vous le souhaitez, vous pouvez définir la variable d'environnement `DD_SITE` sur un [site Datadog][3] spécifique. Votre site est {{< region-param key="dd_site" code="true" >}}.

Vous pouvez enrichir l'événement de déploiement généré par la commande `datadog-ci deployment mark` à l'aide des paramètres suivants :

| Paramètre       | Description                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | L'environnement vers lequel ce déploiement est effectué. Exemple : `prod`.                                                             |
| `--service`     | Le nom du service déployé. Exemple : `transaction-service`. Cette option nécessite la version `2.31.1` ou une version ultérieure de `datadog-ci`. |
| `--revision`    | La révision ou la version déployée. Exemples : `1.0.0` ou `v123-456`.                                                     |
| `--is-rollback` | Spécifie que le déploiement est un rollback.                                                                                            |
| `--tags`        | Un tableau de paires clé-valeur au format `key:value`. Ces tags sont ajoutés à l'événement de déploiement indiqué dans Datadog.                   |

Utilisez `--no-fail` (valeur par défaut : `false`) pour éviter que la commande de déploiement n'échoue en cas de problèmes de soumission des données.

Si vous utilisez le fournisseur CI GitHub Actions, consultez la [rubrique ci-dessous][11] pour examiner d'autres considérations à prendre en compte.

Une fois la commande ajoutée à un job CI, la [page **Deployments**][5] et la [page Deployment Executions][6] affichent des données après l'exécution des pipelines. Pour en savoir plus, consultez la section [Explorer les déploiements CD Visibility][8].

### Exemples

Cet ensemble de commandes spécifie que le job CI exécute un déploiement dans l'environnement `prod` avec la version `1.0.0` :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

Cet ensemble de commandes spécifie que le job CI exécute un déploiement de rollback dans l'environnement `prod` :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

Cet ensemble de commandes spécifie que le job CI exécute un déploiement dans l'environnement `prod` et ajoute les tags `team:backend` et `reason:scheduled` à l'événement de déploiement :

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## Indiquer que des jobs GitHub Actions sont des déploiements


Depuis la version `4.1.1` de `datadog-ci`, aucune autre action n'est nécessaire, même en cas d'utilisation de noms personnalisés ou de stratégies matricielles.

<details>
<summary><strong>Pour les versions de datadog-ci antérieures à la 4.1.1</strong></summary>

Si vous utilisez une version de `datadog-ci` comprise entre la `2.29.0` et la `4.1.0`, et que le nom du job ne correspond pas à l'entrée définie dans le fichier de configuration du workflow (l'[ID de job][12] GitHub), la variable d'environnement `DD_GITHUB_JOB_NAME` doit être exposée et pointer vers le nom du job. Exemple :

1. Si le nom du job est modifié à l'aide de la [propriété name][13] :
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. Si une [stratégie matricielle][14] est utilisée, plusieurs noms de job sont générés par GitHub en ajoutant les valeurs matricielles à la fin du nom du job,
   entre parenthèses. La variable d'environnement `DD_GITHUB_JOB_NAME` doit alors être conditionnelle aux valeurs matricielles :

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
</details>

## Pour aller plus loin

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