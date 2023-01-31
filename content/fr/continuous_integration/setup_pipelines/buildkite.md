---
title: Configurer le tracing sur un pipeline Buildkite
kind: documentation
further_reading:
    - link: /continuous_integration/explore_pipelines
      tag: Documentation
      text: Explorer les résultats et les performances de l'exécution du pipeline
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Dépannage CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Configurer l'intégration Datadog

Voici la marche à suivre pour activer l'intégration Datadog pour [Buildkite][1] :

1. Accédez à **Settings > Notification Services** dans Buildkite, puis cliquez sur l'option permettant d'ajouter une intégration **Datadog Pipeline Visibility**.
2. Renseignez les informations suivantes dans le formulaire :
   * **Description** : une description permettant d'identifier ultérieurement l'intégration, par exemple « Intégration CI Visibility de Datadog ».
   * **API key** : votre [clé d'API Datadog][2].
   * **Datadog site** : {{< region-param key="dd_site" code="true" >}}.
   * **Pipelines** : sélectionnez tous les pipelines ou les sous-ensembles de pipelines que vous souhaitez tracer.
   * **Branch filtering** : laissez ce champ vide pour tracer toutes les branches ou sélectionnez le sous-ensemble de branches que vous souhaitez tracer.
3. Cliquez sur **Add Datadog Pipeline Visibility Notification** pour enregistrer l'intégration.

### Définir des tags personnalisés

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

Voici à quoi ressemble le pipeline créé :

{{< img src="ci/buildkite-custom-tags.png" alt="Trace de pipeline Buildkite avec des tags personnalisés" style="width:100%;">}}

Toutes les métadonnées dont la clé commence par `dd-metrics.` et contient une valeur numérique sont définies comme des tags de métrique, et peuvent donc servir à créer des mesures numériques. La commande `buildkite-agent meta-data set` vous permet de créer ce type de tag, par exemple pour mesurer la taille du binaire dans un pipeline :

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_metrics.binary_size"
    label: Go build
```

Les tags indiqués sous la span de pipeline sont alors appliqués au pipeline obtenu :

- `binary_size: 502` (la sortie dépend de la taille du fichier)

Ici, la valeur de `binary_size` vous permet de représenter l'évolution de la taille du binaire.

## Visualiser des données de pipeline dans Datadog

Les pages [Pipelines][3] et [Pipeline Executions][4] affichent des données après l'exécution des pipelines.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
