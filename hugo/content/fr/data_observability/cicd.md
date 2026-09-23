---
description: Vérifiez automatiquement les pull requests qui modifient des modèles
  dbt pour évaluer l'impact en aval et la dérive des données avant leur fusion.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /data_observability/data_catalog/
  tag: Documentation
  text: Catalogue de données
- link: /data_observability/lineage/
  tag: Documentation
  text: Lignage
- link: /data_observability/quality_monitoring/
  tag: Documentation
  text: Quality Monitoring
- link: /data_observability/jobs_monitoring/
  tag: Documentation
  text: Jobs Monitoring
title: CI/CD
---
## Présentation {#overview}

{{< img src="data_observability/cicd/cicd-overview.png" alt="La page de rapport de la fonctionnalité CI/CD" style="width:100%;" >}}

Les checks CI/CD de Data Observability s'exécutent automatiquement lorsque vous ouvrez une pull request (PR) qui modifie des modèles dbt. Les checks vous donnent les informations nécessaires pour décider si une modification peut être fusionnée en toute sécurité.

Datadog publie les résultats sous forme de commentaire sur votre PR, et le commentaire est mis à jour à chaque fois que vous envoyez de nouvelles modifications. Un rapport complet est également disponible dans Datadog, et vous obtenez un lien vers celui-ci dans le commentaire de la PR.

## Types de checks {#check-types}

### Lignage d'impact {#impact-lineage}

Le lignage d'impact construit un graphe de tout ce qui se trouve en aval de vos modèles dbt modifiés. Utilisez-le pour évaluer le rayon d'action d'une modification avant la fusion. Identifiez quels tableaux, dashboards et autres consommateurs dépendent des modèles que vous avez modifiés, puis assignez l'examen aux propriétaires appropriés.

Consultez [Lignage][1] pour plus de détails sur la façon dont Datadog construit et navigue dans les graphes de lignage.

### Détection de dérive {#drift-detection}

La détection de dérive compare les données produites par vos modèles avant et après vos modifications à l'aide d'une série de checks statistiques. Utilisez-la pour confirmer qu'une modification de modèle produit le résultat attendu, ou pour détecter des effets secondaires involontaires tels que des changements significatifs du nombre de lignes, des variations du taux de valeurs nulles ou des changements de cardinalité dans les valeurs d'une colonne.

## Configuration {#setup}

### 1. Connectez votre fournisseur de contrôle de version et votre projet dbt {#1-connect-your-source-control-provider-and-dbt-project}

1. Connectez votre [fournisseur de contrôle de version][2]. Les checks CI/CD prennent en charge GitHub et GitLab.
2. Connectez le [compte de source de données pris en charge][3] où vos modèles dbt s'exécutent.
3. Connectez votre projet [dbt Cloud][4] ou [dbt Core][5] à Datadog. Vous pouvez également connecter votre projet dbt lors de la configuration des checks CI/CD.

### 2. Sélectionnez votre projet dbt et votre dépôt {#2-select-your-dbt-project-and-repository}

1. Depuis les paramètres CI/CD, cliquez sur {{< ui >}}Add CI/CD Checks{{< /ui >}}.
2. Sélectionnez le projet dbt pour lequel vous souhaitez ajouter des checks.
3. Sélectionnez le job principal pour le projet. Il s'agit du job qui possède la meilleure connaissance de votre schéma dbt.
4. Si Datadog ne déduit pas automatiquement le dépôt de votre fournisseur de contrôle de version, sélectionnez-le manuellement.

{{< img src="data_observability/cicd/cicd-connection.png" alt="La page de création de la fonctionnalité CI/CD" style="width:100%;" >}}

#### Paramètres avancés {#advanced-settings}

Si votre projet dbt ne se trouve pas à la racine de votre dépôt, vous pouvez spécifier le chemin d'accès à votre projet dbt dans les paramètres avancés.

### 3. Configurer les checks {#3-configure-checks}

Vous pouvez activer chaque check indépendamment. L'activation de tous les checks permet d'obtenir les rapports les plus complets.

#### Lignage d'impact {#impact-lineage-1}

Le lignage d'impact génère un graphe des ressources en aval qui peuvent être affectées par les modifications de vos modèles.

##### Paramètres généraux {#general-settings}

| Paramètre                            | Description                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Activez cette option pour exécuter le check sur les pull requests ou merge requests en brouillon. |

#### Détection de dérive {#drift-detection-1}

La détection de dérive compare l'état actuel de vos données sur la branche à une référence et signale toute déviation. Datadog utilise les exécutions dbt de votre pipeline CI comme déclencheurs pour les checks de détection de dérive. Pour **dbt Core**, vous devez envoyer des événements OpenLineage depuis votre job CI afin que Datadog reçoive ces exécutions. Consultez la [documentation de configuration d'OpenLineage][6]. Pour **dbt Cloud**, configurez le job CI qui s'exécute sur les pull requests dans le paramètre `CI Job URL` de la section [dbt Cloud](#dbt-cloud).

Datadog doit également être en mesure de lire les tables que votre job CI construit pour les comparer. Le rôle que vous avez créé lors de la configuration de Snowflake (`DATADOG_ROLE` par défaut) nécessite `USAGE` et `SELECT` sur la base de données dans laquelle votre job CI matérialise les modèles. La configuration de l'intégration Snowflake de Datadog inclut une procédure `grant_database_access` qui accorde cela sur toutes les tables et vues actuelles et futures dans chaque schéma d'une base de données. Exécutez-la pour la base de données dans laquelle votre job CI écrit :

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

Si votre CI crée une base de données éphémère par pull request, appelez la procédure dans le cadre de cette étape de provisionnement afin que chaque nouvelle base de données soit lisible. Consultez [Configuration de Snowflake][8] pour la définition de la procédure. Sans cet accès, Datadog reçoit l'exécution CI mais ne peut pas interroger les tables CI, et la détection de dérive échoue.

Pour **dbt Core**, la détection de dérive nécessite également que le numéro de pull request soit joint à vos événements OpenLineage via la facette `sourceCodeLocation`. Cela nécessite la version `openlineage-dbt` 1.46.0 ou ultérieure et la variable d'environnement `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false`. Consultez [Définir les variables d'environnement][7]. Si votre job CI dbt Core s'exécute dans un conteneur, il nécessite une configuration supplémentaire. Consultez la section [Exécution de votre job CI dbt Core dans un conteneur](#running-your-dbt-core-ci-job-in-a-container).

##### Paramètres généraux {#general-settings-1}

| Paramètre                            | Description                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Activez cette option pour exécuter le check sur les pull requests ou merge requests en brouillon.                                                                                          |
| `Threshold`                        | Le seuil pour la détection de dérive (par exemple, `0.1` pour 10 % de dérive). Si une métrique dépasse ce seuil, elle apparaît sous forme d'avertissement dans les résultats du check.      |
| `Downstream Checks`                | Lorsqu'un modèle dbt change, des checks de détection de dérive sont générés pour celui-ci et pour tous les modèles dbt en aval. Ce paramètre contrôle jusqu'où en aval les checks s'exécutent. |

##### dbt Cloud {#dbt-cloud}

| Paramètre      | Description                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | Le localisateur du job CI dbt Cloud qui est déclenché par les pull requests et matérialise les modèles dbt pour l'intégration continue. Datadog reçoit les événements d'exécution de ce job via l'intégration dbt Cloud. Ceux-ci ressemblent généralement à `https://cloud.getdbt.com/...`. |

##### dbt Core {#dbt-core}

| Paramètre            | Description                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | Le nom du job qui est déclenché par les pull requests, matérialise les modèles dbt pour la CI et envoie des événements OpenLineage à Datadog.                                                                                                                   |
| `CI Job Namespace` | La variable OPENLINEAGE_NAMESPACE spécifiée lors de l'envoi d'événements OpenLineage depuis le job spécifié ci-dessus. Consultez [Définir les variables d'environnement][7]. Si vous ne définissez pas cette variable lors de l'envoi d'événements OpenLineage, vous n'avez pas besoin de la spécifier ici. |

#### Exécution de votre job CI dbt Core dans un conteneur {#running-your-dbt-core-ci-job-in-a-container}

Si votre job CI dbt Core s'exécute à l'intérieur d'un conteneur lancé par le runner CI (par exemple, un workflow GitHub Actions qui exécute le job avec `docker run`), le conteneur n'hérite pas du contexte git du runner CI. Par conséquent, l'URL du dépôt, le SHA du commit et le numéro de la pull request ne sont pas détectés automatiquement, et la facette `sourceCodeLocation` est envoyée sans eux. Datadog utilise ces valeurs pour faire correspondre l'exécution à la pull request que vous avez ouverte ou mise à jour ; sans elles, aucun résultat de dérive n'apparaît sur la pull request.

L'exemple suivant utilise GitHub Actions ; sur d'autres fournisseurs CI, les noms des variables d'environnement diffèrent, mais l'approche est la même. Sur le runner CI, lisez les valeurs et transmettez-les explicitement dans le conteneur :

```shell
# On the CI runner, before launching the container:
PR_NUMBER=$(jq -r '.pull_request.number'  "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r '.pull_request.head.sha' "$GITHUB_EVENT_PATH")   # the pull request's head commit, not the merge commit
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"

docker run \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__REPO_URL="$REPO_URL" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER="$PR_NUMBER" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION="$HEAD_SHA" \
  <YOUR_IMAGE> <YOUR_DBT_OL_COMMAND>
```

Le workflow doit s'exécuter lorsqu'une demande de tirage est ouverte ou mise à jour :

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_observability/lineage/
[2]: /fr/integrations/#cat-source-control
[3]: /fr/data_observability/quality_monitoring/#supported-data-sources
[4]: /fr/data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /fr/data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /fr/data_observability/jobs_monitoring/openlineage/
[7]: /fr/data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /fr/data_observability/quality_monitoring/data_warehouses/snowflake/