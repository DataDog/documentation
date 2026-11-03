---
aliases:
- /fr/continuous_integration/setup_pipelines/buildkite
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
title: Configuration de Buildkite pour CI Visibility
---
## Présentation {#overview}

[Buildkite][1] est une plateforme d'intégration et de déploiement continus qui vous permet d'exécuter des builds sur votre propre infrastructure, vous offrant un contrôle total sur la sécurité et la personnalisation de votre environnement de build tout en gérant l'orchestration dans le cloud.

Configurez CI Visibility pour Buildkite afin d'optimiser l'utilisation de vos ressources, de réduire les frais généraux et d'améliorer la vitesse et la qualité de votre cycle de vie de développement logiciel.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Nouvelles tentatives partielles][9] | Pipelines partiellement relancés | Visualisez les exécutions de pipeline partiellement relancées. |
| Corrélation des métriques d'infrastructure | Corrélation des métriques d'infrastructure | Corrélez les jobs aux [métriques de host d'infrastructure][6] pour les agents Buildkite. |
| [Étapes manuelles][12] | Étapes manuelles | Visualisez les pipelines déclenchés manuellement. |
| [Temps d'attente en file][13] | Temps d'attente en file | Visualisez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités. |
| [Tags personnalisés][10] [et mesures au moment de l'exécution][11] | Tags personnalisés et mesures au moment de l'exécution | Configurez des [tags et mesures personnalisés][6] au moment de l'exécution. |
| [Spans personnalisés][14] | Spans personnalisés | Configurez des spans personnalisés pour vos pipelines. |
| [Filtrer les jobs CI sur le chemin critique][17] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Execution time][18] | Temps d'exécution  | Affichez la durée pendant laquelle les pipelines exécutent des jobs. |
| Corrélation des logs | Corrélation des logs | Corrélez les spans de pipeline et de job aux logs et activez la [collecte des logs de job][20]. |


### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et Buildkite :

| Datadog | Buildkite |
|----------------------------|---------------------------------|
| Pipeline | Build (exécution d'un pipeline) |
| Job | Job (exécution d'une étape) |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}

Pour configurer l'intégration Datadog pour [Buildkite][1] :

1. Allez dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notification Services{{< /ui >}} dans Buildkite et cliquez sur le bouton {{< ui >}}Add{{< /ui >}} à côté de {{< ui >}}Datadog Pipeline Visibility{{< /ui >}}.
2. Remplissez le formulaire avec les informations suivantes :
   * {{< ui >}}Description{{< /ui >}} : Une description pour aider à identifier l'intégration à l'avenir, telle que `Datadog CI Visibility integration`.
   * {{< ui >}}API key{{< /ui >}} : Votre [clé d'API Datadog][2].
   * {{< ui >}}Datadog site{{< /ui >}} : `{{< region-param key="dd_site" code="true" >}}`
   * {{< ui >}}Pipelines{{< /ui >}} : Sélectionnez tous les pipelines ou le sous-ensemble de pipelines que vous souhaitez tracer.
   * {{< ui >}}Branch filtering{{< /ui >}} : Laissez vide pour tracer toutes les branches ou sélectionnez le sous-ensemble de branches que vous souhaitez tracer.
3. Cliquez sur {{< ui >}}Add Datadog Pipeline Visibility Notification{{< /ui >}} pour enregistrer l'intégration.

### Collecter les logs des jobs {#collect-job-logs}

Exportez les logs de job de l'Agent Buildkite en tant que logs OpenTelemetry vers l'[endpoint des logs OTLP Datadog][23]. Pour activer l'exportation, suivez la [documentation d'exportation des logs de job OpenTelemetry][22] de Buildkite.

Datadog facture les logs séparément de CI Visibility. Configurez la rétention des logs, les filtres d'exclusion et les index dans [Log Management][21]. Pour limiter ces règles aux logs Buildkite, filtrez sur les tags `datadog.product:cipipeline` et `source:buildkite`.

{{% collapse-content title="Intégration Datadog Buildkite (héritée)" level="h4" expanded=false id="legacy-buildkite-integration-job-log-collection" %}}

L'intégration Datadog Buildkite est une méthode héritée pour collecter les logs de job. Si vous ne pouvez pas utiliser OpenTelemetry, contactez votre représentant Datadog.

Pour obtenir des instructions d'installation et de configuration, consultez la [documentation de l'intégration Buildkite][19].

<div class="alert alert-warning">Cette intégration récupère les logs de job via l'API Buildkite. La collecte de logs peut consommer une part importante de votre limite de débit de l'API Buildkite.</div>

{{% /collapse-content %}}

## Configuration avancée {#advanced-configuration}

### Définir des tags personnalisés {#set-custom-tags}

Des tags personnalisés peuvent être ajoutés aux traces Buildkite en utilisant la commande `buildkite-agent meta-data set`.
Tous les tags de métadonnées dont la clé commence par `dd_tags.` sont ajoutés aux spans de job et de pipeline. Ces
tags peuvent être utilisés pour créer des facettes afin de rechercher et d'organiser les pipelines.

Le YAML ci-dessous illustre un pipeline simple où les tags pour le nom de l'équipe et la version de Go ont
été définis.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Les tags suivants s'affichent dans le span racine ainsi que dans le span de job pertinent dans Datadog.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (la sortie dépend du runner)

Le pipeline résultant ressemble à ce qui suit :

{{< img src="ci/buildkite-custom-tags.png" alt="Trace de pipeline Buildkite avec des tags personnalisés" style="width:100%;">}}

Toute métadonnée dont la clé commence par `dd-measures.` et contient une valeur numérique sera définie comme
un tag de métrique pouvant être utilisé pour créer des mesures numériques.

Vous pouvez utiliser la commande `buildkite-agent meta-data set` pour créer ces tags.

Par exemple, vous pouvez mesurer la taille du binaire dans un pipeline avec cette commande :

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

Les tags indiqués sous le span de pipeline sont alors appliqués au pipeline obtenu :

- `binary_size: 502` (la sortie dépend de la taille du fichier)

Dans cet exemple, vous pouvez utiliser la valeur de `binary_size` pour tracer l'évolution de la taille du binaire au fil du temps.

### Corréler les métriques d'infrastructure aux jobs {#correlate-infrastructure-metrics-to-jobs}

Si vous utilisez des agents Buildkite, vous pouvez corréler les jobs avec l'infrastructure qui les exécute.
Pour que cette fonctionnalité fonctionne, installez le [Datadog Agent][7] sur les hosts exécutant les agents Buildkite.

## Afficher les pipelines partiels et en aval {#view-partial-and-downstream-pipelines}

Vous pouvez utiliser les filtres suivants pour personnaliser votre requête de recherche dans le [CI Visibility Explorer][15].

{{< img src="ci/partial_retries_search_tags.png" alt="La page des exécutions de pipeline avec « Partial Pipeline:retry » saisi dans la requête de recherche." style="width:100%;">}}

| Nom de la facette | ID de la facette | Valeurs possibles |
|---|---|---|
| Pipeline en aval | `@ci.pipeline.downstream` | `true`, `false` |
| Déclenché manuellement | `@ci.is_manual` | `true`, `false` |
| Partial Pipeline | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

Vous pouvez également appliquer ces filtres en utilisant le panneau des facettes sur le côté gauche de la page.

{{< img src="ci/partial_retries_facet_panel.png" alt="Le panneau des facettes avec la facette « Partial Pipeline » développée et la valeur « Retry » sélectionnée, ainsi que la facette « Partial Retry » développée et la valeur « true » sélectionnée." style="width:20%;">}}

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Les pages [**Liste des pipelines CI**][3] et [**Exécutions**][4] sont alimentées en données une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Rechercher et gérer les pipelines CI][16].

## Pour aller plus loin {#further-reading}

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
[19]: /fr/integrations/buildkite/
[20]: /fr/continuous_integration/pipelines/buildkite/#collect-job-logs
[21]: /fr/logs/
[22]: https://buildkite.com/docs/agent/self-hosted/monitoring-and-observability/tracing#exporting-job-logs-as-opentelemetry-logs
[23]: /fr/opentelemetry/setup/otlp_ingest/logs/