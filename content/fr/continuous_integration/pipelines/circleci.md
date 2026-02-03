---
aliases:
- /fr/continuous_integration/setup_pipelines/circleci
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: Gagner en visibilité sur les pipelines en traçant des commandes individuelles
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendre Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration de CircleCI pour CI Visibility
---

## Section Overview

[CircleCI][1] est une plateforme d'intégration et de livraison continues qui permet aux équipes de créer, tester et déployer des logiciels à grande échelle.

Configurez CI Visibility pour CircleCI afin d'optimiser les performances de vos pipelines, d'améliorer la collaboration entre les équipes et de garantir des processus de build cohérents et conformes.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][12] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| Corrélation de logs | Corrélation de logs | Mettre en corrélation les spans de pipeline et de tâches avec les logs et activer la [collecte de logs de tâches][10]. |
| [Spans personnalisées][13] | Spans personnalisées | Configurez des spans personnalisées pour vos pipelines. |
| Tags prédéfinis personnalisés | Tags prédéfinis personnalisés | Définir des [tags personnalisés][6] pour tous les spans de pipeline et de tâches générés. |
| [Tags personnalisés][14] [et mesures au moment de l'exécution][15] | Tags et mesures personnalisés au moment de l'exécution | Configurer des [tags et des mesures personnalisés][7] au moment de l'exécution. |
| [Filtrer les tâches CI sur le chemin critique][18] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Temps d'exécution][19] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |

### Termes

Ce tableau présente le mappage des concepts entre Datadog CI Visibility et CircleCI :

| Datadog                    | CircleCI  |
|----------------------------|-----------|
| Pipeline                   | Workflow  |
| Job                        | Job       |
| _Non disponible dans Datadog_ | Step      |

## Configurer l'intégration Datadog

L'intégration Datadog pour [CircleCI][1] utilise des [webhooks][2] pour envoyer des données à Datadog.

1. Pour chaque projet, accédez à **Project Settings > Webhooks** dans CircleCI et ajoutez un nouveau webhook :

   * **Webhook Name** : `Datadog CI Visibility` ou tout autre nom d'identifiant que vous souhaitez fournir.
   * **Receiver URL** : <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> où `<API_KEY>` est votre [clé d'API Datadog][3].
   * **Certificate verifications** : activez ce check.
   * **Events** : sélectionnez `Workflow Completed` et `Job Completed`.

2. Cliquez sur **Add Webhook** pour enregistrer le nouveau webhook.

## Configuration avancée

### Configurer plusieurs projets en masse

Datadog propose un [script][9] pour vous aider à activer les hooks de service sur plusieurs ou tous vos projets CircleCI à l'aide de l'API CircleCI. Le script nécessite Python 3 et le package `requests`.

Pour exécuter ce script, vous avez besoin :

- Votre clé d'API Datadog
- D'un token d'API personnel CircleCI

Pour plus d'informations, vous pouvez exécuter la commande suivante :

```shell
./service_hooks.py --help
```

Pour configurer en masse les hooks pour vos projets :

1. Connectez-vous à votre compte CircleCI et suivez tous les projets pour lesquels vous souhaitez activer les hooks. Si vous le souhaitez, utilisez le bouton **Follow All** sur la page Projects.

2. Exécutez le script en utilisant les variables d'environnement `DD_API_KEY` et `DD_SITE`, ou en passant les paramètres de flags `--dd-api-key` et `--dd-site` :

   Exemple :

   ```shell
   ./service_hooks.py \
       --dd-api-key <DD_API_KEY> \
       --circle-token <CIRCLECI_TOKEN> \
       --dd-site {{< region-param key="dd_site" code="true" >}} \
       --threads 4
   ```

### Appliquer des tags personnalisés

Pour définir des tags personnalisés pour tous les spans de pipeline et de tâches générés par l'intégration, ajoutez au **Receiver URL** un paramètre de requête encodé en URL `tags` avec des paires `key:value` séparées par des virgules.

Si une paire `key:value` contient des virgules, entourez-la de guillemets. Par exemple, pour ajouter `key1:value1,"key2: value with , comma",key3:value3`, la chaîne suivante devrait être ajoutée au **Receiver URL** : `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.



#### Intégrer avec Datadog Teams

Pour afficher et filtrer les équipes associées à vos pipelines, ajoutez `team:<your-team>` en tant que tag personnalisé. Le nom du tag personnalisé doit correspondre exactement au nom de votre équipe [Datadog Teams][8].

### Collecter les logs de tâches

L'intégration Datadog CircleCI collecte les logs de vos tâches CircleCI terminées et les transmet à Datadog. Pour installer et configurer cette intégration, consultez la [documentation de l'intégration CircleCI][11].

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index de logs sont configurés dans [Log Management][16]. Les logs pour les tâches CircleCI peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:circleci`.

## Visualiser les données de pipeline dans Datadog

Les pages [**CI Pipeline List**][4] et [**Executions**][5] se remplissent de données une fois les workflows terminés.

La page **CI Pipeline List** affiche des données uniquement pour la branche par défaut de chaque référentiel. Pour plus d'informations, consultez la section [Rechercher et gérer les pipelines CI][17].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /fr/continuous_integration/pipelines/circleci/#set-custom-tags
[7]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /fr/account_management/teams/
[9]: https://raw.githubusercontent.com/DataDog/ci-visibility-circle-ci/main/service_hooks.py
[10]: /fr/continuous_integration/pipelines/circleci/#enable-log-collection
[11]: /fr/integrations/circleci/#setup
[12]: /fr/glossary/#partial-retry
[13]: /fr/glossary/#custom-span
[14]: /fr/glossary/#custom-tag
[15]: /fr/glossary/#custom-measure
[16]: /fr/logs/guide/best-practices-for-log-management/
[17]: /fr/continuous_integration/search/#search-for-pipelines
[18]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[19]: /fr/glossary/#pipeline-execution-time