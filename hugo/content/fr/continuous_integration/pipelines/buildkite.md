---
aliases:
- /fr/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendre Pipeline Visibility en ajoutant des tags et des mesures personnalisés
title: Configuration de Buildkite pour CI Visibility
---

## Section Overview

[Buildkite][1] est une plateforme d'intégration et de déploiement continus qui vous permet d'exécuter des builds sur votre propre infrastructure, vous offrant un contrôle total sur la sécurité et la personnalisation de votre environnement de build tout en gérant l'orchestration dans le cloud.

Configurez CI Visibility pour Buildkite afin d'optimiser l'utilisation de vos ressources, de réduire les coûts généraux et d'améliorer la vitesse et la qualité du cycle de vie de développement logiciel.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][9] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| Mise en corrélation des métriques d'infrastructure | Mise en corrélation des métriques d'infrastructure | Mettre en corrélation les tâches avec les [métriques d'infrastructure des hosts][6] pour les agents Buildkite. |
| [Étapes manuelles][12] | Étapes manuelles | Consultez les pipelines déclenchés manuellement. |
| [Temps de mise en file d'attente][13] | Temps de mise en file d'attente | Afficher le temps pendant lequel les tâches de pipeline restent dans la file d'attente avant le traitement. |
| [Tags personnalisés][10] [et mesures au moment de l'exécution][11] | Tags et mesures personnalisés au moment de l'exécution | Configurer des [tags et des mesures personnalisés][6] au moment de l'exécution. |
| [Spans personnalisées][14] | Spans personnalisées | Configurer des spans personnalisées pour vos pipelines. |
| [Filtrer les tâches CI sur le chemin critique][17] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Temps d'exécution][18] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |

### Termes

Ce tableau présente le mappage des concepts entre Datadog CI Visibility et Buildkite :

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| Pipeline                   | Build (exécution d'un pipeline) |
| Job                        | Job (exécution d'un step)       |

## Configurer l'intégration Datadog

Pour configurer l'intégration Datadog pour [Buildkite][1] :

1. Accédez à **Settings > Notification Services** dans Buildkite et cliquez sur le bouton **Add** à côté de **Datadog Pipeline Visibility**.
2. Renseignez les informations suivantes dans le formulaire :
   * **Description** : une description pour aider à identifier l'intégration à l'avenir, telle que `Datadog CI Visibility integration`.
   * **API key** : votre [clé d'API Datadog][2].
   * **Datadog site** : `{{< region-param key="dd_site" code="true" >}}`
   * **Pipelines** : sélectionnez tous les pipelines ou les sous-ensembles de pipelines que vous souhaitez tracer.
   * **Branch filtering** : laissez ce champ vide pour tracer toutes les branches ou sélectionnez le sous-ensemble de branches que vous souhaitez tracer.
3. Cliquez sur **Add Datadog Pipeline Visibility Notification** pour enregistrer l'intégration.

## Configuration avancée

### Appliquer des tags personnalisés

Exécutez la commande `buildkite-agent meta-data set` pour ajouter des tags personnalisés aux traces Buildkite. Tous les tags de métadonnées avec une clé commençant par `dd_tags.` sont ajoutés aux spans de tâche et de pipeline. Ces tags peuvent vous servir à créer des facettes basées sur des chaînes afin de rechercher et d'organiser vos pipelines.

Le YAML ci-dessous implémente un pipeline simple doté de tags pour le nom d'équipe et la version de Go.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Les tags suivants s'affichent dans la span racine ainsi que dans la span de tâche pertinente dans Datadog.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (la sortie varie selon l'exécuteur)

Le pipeline résultant ressemble à ce qui suit :

{{< img src="ci/buildkite-custom-tags.png" alt="Trace de pipeline Buildkite avec des tags personnalisés" style="width:100%;">}}

Toute métadonnée avec une clé commençant par `dd-measures.` et contenant une valeur numérique sera définie comme
un tag de métrique qui peut être utilisé pour créer des mesures numériques.

Vous pouvez utiliser la commande `buildkite-agent meta-data set` pour créer ces tags.

Par exemple, vous pouvez mesurer la taille du binaire dans un pipeline avec cette commande :

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

Les tags indiqués sous la span de pipeline sont alors appliqués au pipeline obtenu :

- `binary_size: 502` (la sortie dépend de la taille du fichier)

Ici, la valeur de `binary_size` vous permet de représenter l'évolution de la taille du binaire.

### Mettre les métriques d'infrastructure en corrélation avec les tâches

Si vous utilisez des agents Buildkite, vous pouvez mettre en corrélation les tâches avec l'infrastructure qui les exécute.
Pour que cette fonctionnalité fonctionne, installez l'[Agent Datadog][7] sur les hosts exécutant les agents Buildkite.

## Afficher les pipelines partiels et en aval

Vous pouvez utiliser les filtres suivants pour personnaliser votre requête de recherche dans le [CI Visibility Explorer][15].

{{< img src="ci/partial_retries_search_tags.png" alt="La page des exécutions de pipeline avec Partial Pipeline:retry saisi dans la requête de recherche" style="width:100%;">}}

| Nom de la facette | ID de facette | Valeurs possibles |
|---|---|---|
| Downstream Pipeline | `@ci.pipeline.downstream` | `true`, `false` |
| Manually Triggered | `@ci.is_manual` | `true`, `false` |
| Partial Pipeline | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

Vous pouvez également appliquer ces filtres à l'aide du panneau de facettes sur le côté gauche de la page.

{{< img src="ci/partial_retries_facet_panel.png" alt="Le panneau de facettes avec la facette Partial Pipeline développée et la valeur Retry sélectionnée, la facette Partial Retry développée et la valeur true sélectionnée" style="width:20%;">}}

## Visualiser les données de pipeline dans Datadog

Les pages [**CI Pipeline List**][3] et [**Executions**][4] se remplissent de données une fois les pipelines terminés.

La page **CI Pipeline List** affiche des données uniquement pour la branche par défaut de chaque référentiel. Pour plus d'informations, consultez la section [Rechercher et gérer les pipelines CI][16].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /fr/continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[7]: /fr/agent/
[8]: /fr/continuous_integration/pipelines/buildkite/#correlate-infrastructure-metrics-to-jobs
[9]: /fr/glossary/#partial-retry
[10]: /fr/glossary/#custom-tag
[11]: /fr/glossary/#custom-measure
[12]: /fr/glossary/#manual-step
[13]: /fr/glossary/#queue-time
[14]: /fr/glossary/#custom-span
[15]: /fr/continuous_integration/explorer
[16]: /fr/continuous_integration/search/#search-for-pipelines
[17]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /fr/glossary/#pipeline-execution-time