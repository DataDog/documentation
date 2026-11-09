---
description: Définissez les métriques d'expérience en YAML, prévisualisez les modifications
  et synchronisez-les avec Datadog depuis votre CI.
further_reading:
- link: /experiments/defining_metrics/
  tag: Documentation
  text: Créez des métriques d'expérimentation
- link: /experiments/guide/connecting_a_data_warehouse/
  tag: Documentation
  text: Connectez un entrepôt de données
- link: /account_management/api-app-keys/
  tag: Documentation
  text: Clés d'API et d'application
title: Synchronisez les métriques d'expérience depuis YAML
---
## Présentation {#overview}

Les métriques d'expérience définissent les résultats que vous utilisez pour évaluer une expérience, tels que le revenu, le taux de conversion ou les pages vues. Créez ces métriques manuellement dans Datadog, ou définissez des métriques d'entrepôt en YAML. Utilisez la CLI Datadog Experiments Metric Sync pour synchroniser les définitions YAML avec Datadog.

Utilisez Metric Sync lorsque vous souhaitez :

- Examinez les modifications de métriques dans les pull requests.
- Conservez les définitions de métriques dans le contrôle de version.
- Appliquez les modifications de métriques depuis la CI une fois qu'elles ont été approuvées.
- Marquez par défaut les métriques synchronisées comme certifiées pour la prise de décision liée aux expériences.

Metric Sync prend en charge un workflow de planification et d'application. La commande `plan` valide votre YAML et prévisualise les modifications que Datadog effectuerait. La commande `execute` valide le YAML, soumet une opération d'écriture et attend la fin du processus. Les résultats incluent le nombre de modifications, les ID d'objets, les modifications de champs, les raisons de blocage, les avertissements et les détails d'erreur disponibles. Les plans montrent les modifications proposées ; une opération ayant échoué ne confirme pas que ces modifications ont été appliquées.

## Prérequis {#prerequisites}

Avant d'utiliser Metric Sync, vous avez besoin de :

- Un compte Datadog avec Product Analytics et Experiments activés.
- Un entrepôt de données connecté. Consultez [Connectez un entrepôt de données][1].
- Un type de sujet existant, tel que `User`, à associer à une colonne de la requête source.
- Les autorisations Product Analytics requises pour créer et mettre à jour les métriques d'expérience. Les métriques synchronisées sont certifiées par défaut. Les rôles personnalisés nécessitent donc également l'autorisation Product Analytics Certified Metrics Write. Voir [Autorisations Product Analytics][2].
- Une clé d'API Datadog et une clé d'application pour l'authentification CI. Voir [Clés d'API et d'application][3].

## Installez l'interface de ligne de commande {#install-the-cli}

Installez la dernière version de Metric Sync CLI :

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
```

Le script d'installation détecte macOS ou Linux, télécharge l'archive de version GitHub correspondante, vérifie la somme de contrôle SHA-256 et installe le binaire `metric-sync` dans `/usr/local/bin`. Selon vos autorisations système, l'installation dans `/usr/local/bin` peut nécessiter `sudo`. Pour installer sans privilèges élevés, définissez `INSTALL_DIR` sur un répertoire dont vous êtes propriétaire.

Pour installer une version spécifique ou installer dans un répertoire différent :

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | env VERSION=<VERSION> INSTALL_DIR="$HOME/.local/bin" sh
export PATH="$HOME/.local/bin:$PATH"
```

Définissez les identifiants Datadog avec des variables d'environnement :

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_APP_KEY=<DATADOG_APPLICATION_KEY>
```

Par défaut, la CLI envoie des requêtes à `datadoghq.com`. Définissez `DD_SITE` si votre organisation utilise un site Datadog différent :

```shell
export DD_SITE={{< region-param key="dd_site" >}}
```

## Créer une définition de métrique {#create-a-metric-definition}

Créez un ou plusieurs fichiers YAML dans un répertoire dédié de votre dépôt. La CLI accepte un fichier, plusieurs fichiers, un répertoire ou plusieurs répertoires. Lorsque vous transmettez un répertoire, la CLI recherche récursivement les fichiers `.yaml` et `.yml`, sauf dans les sous-répertoires masqués. Utilisez un document YAML par fichier. La CLI rejette les documents supplémentaires dans le même fichier, y compris un document vide après un séparateur `---`. Placez les définitions supplémentaires dans des fichiers distincts et soumettez-les ensemble en transmettant le répertoire.

L'exemple suivant définit une source de métrique d'entrepôt et une métrique avec `metric_type: simple`. La métrique inclut des événements provenant des États-Unis et du Canada. Avant d'utiliser l'exemple :

- Remplacez la requête SQL par une requête pour votre entrepôt. Renvoyez chaque colonne utilisée par un horodatage, un mappage de sujet, une mesure ou une propriété.
- Faites correspondre les noms de colonnes YAML aux noms renvoyés par la requête, en respectant la casse.
- Remplacez `User` par un nom de type de sujet Datadog existant. Metric Sync ne crée pas le type de sujet.
- Choisissez un `sync_tag` stable pour cet ensemble de définitions et remplacez `reference_url` par l'URL de votre dépôt.
- Si l'organisation dispose de plusieurs connexions d'entrepôt, définissez `warehouse_connection_id` au niveau supérieur ou sur chaque source. Une valeur au niveau de la source remplace la valeur au niveau supérieur. Si l'organisation ne dispose que d'une seule connexion, la CLI la sélectionne lorsque l'ID est omis.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue, country, platform
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    additional_timestamp_columns:
      - transaction_timestamp
    subject_types:
      - name: User
        column_name: user_id
    measures:
      - sync_id: revenue
        name: Revenue
        column_name: revenue
        column_type: FLOAT
    properties:
      - sync_id: country
        property_name: Country
        property_column: country
        property_type: STRING
      - sync_id: platform
        property_name: Platform
        property_column: platform
        property_type: STRING

metrics:
  - sync_id: checkout_revenue
    name: Checkout revenue
    metric_type: simple
    desired_change: METRIC_INCREASES
    simple_metric_aggregation:
      operation: sum
      measure:
        warehouse_metric_source_sync_id: checkout_events
        measure_sync_id: revenue
      timeframe_start_value: 0
      winsor_upper_percentile: 0.99
      winsorization_strategy: nonzero
      property_filters:
        property:
          warehouse_metric_source_sync_id: checkout_events
          property_sync_id: country
        operation: IS
        values: [US, CA]
```

## Prévisualiser et synchroniser les modifications {#preview-and-sync-changes}

Chaque soumission définit l'ensemble complet des sources et des métriques gérées par son `sync_tag`. Les objets déjà gérés par ce tag mais absents des fichiers soumis sont candidats à la suppression. Soumettez ensemble tous les fichiers associés au tag, y compris les définitions inchangées.

| Commande | Ce qu'elle vérifie ou fait | Modifie les définitions ? |
| ------- | ---------------------- | -------------------- |
| `validate` | Vérifie la syntaxe YAML et les règles locales prises en charge. N'appelle pas Datadog. | Non |
| `plan` | Exécute des checks locaux, puis demande un aperçu serveur des modifications proposées. | Non |
| `execute` | Exécute des checks locaux, puis soumet une opération pour appliquer les définitions. Attend la fin de l'exécution, sauf si vous utilisez `--no-poll`. | Oui, si l'opération réussit |

Un plan réussi ne confirme pas l'existence d'une source externe ou d'une mesure sélectionnée. Datadog résout les références externes pendant `execute`.

Pour prévisualiser les modifications avant de les appliquer, exécutez `plan` :

```shell
metric-sync plan ./metrics
```

La sortie du plan affiche l'ID de l'opération, le tag de synchronisation, le statut, les modifications de champs proposées et les raisons du blocage. Examinez ces détails avant l'exécution. Les commandes `plan`, `execute` et `result` se terminent avec un statut différent de zéro si une opération échoue ou si son résultat contient des objets bloqués ou des erreurs. Pour enregistrer la réponse de l'API à des fins de dépannage, ajoutez `--log-file ./metric-sync-plan.log`.

Après avoir examiné le plan, exécutez `execute` pour appliquer les modifications :

```shell
metric-sync execute ./metrics
```

`execute` effectue une validation locale, soumet une opération d'écriture Metric Sync à Datadog, interroge l'opération jusqu'à ce qu'elle atteigne un état terminal et affiche le résumé des résultats.

`execute` lit à nouveau le YAML et crée une nouvelle opération. Il n'applique pas de plan enregistré par ID. Utilisez les mêmes fichiers et options examinés pour les deux commandes.

Vous pouvez également exécuter :

```shell
metric-sync validate ./metrics
metric-sync status <METRIC_SYNC_ID>
metric-sync result <METRIC_SYNC_ID>
metric-sync version
```

Les commandes effectuent les opérations suivantes :

- `status` : Vérifie une opération par ID.
- `result` : Récupère le plan final ou le résultat final de l'exécution.
- `version` : Affiche les métadonnées de build.

Utilisez `--timeout 20m` pour modifier le délai d'expiration par défaut de 10 minutes pour les commandes. Si une commande expire après sa soumission, vérifiez l'ID d'opération affiché avec `status` avant de soumettre à nouveau. Pour soumettre sans attendre, utilisez `--no-poll`, puis vérifiez `status` et `result`. Une commande `--no-poll` réussie confirme uniquement la soumission.

## Exemple GitHub Actions {#github-actions-example}

Le workflow suivant exécute `plan` sur les pull requests et `execute` après la fusion des modifications dans `main` :

```yaml
name: Sync Datadog experiment metrics

on:
  pull_request:
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"
      - ".github/workflows/datadog-metric-sync.yml"
  push:
    branches:
      - main
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"

jobs:
  plan:
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Plan metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync plan ./metrics

  execute:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    concurrency:
      group: metric-sync-example-checkout
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Apply metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync execute ./metrics
```

Stockez vos clés d'API et d'application Datadog en tant que secrets GitHub Actions. Si votre organisation utilise un site Datadog autre que `datadoghq.com`, ajoutez `DD_SITE` à l'environnement du workflow.

Utilisez un groupe de concurrence pour chaque tag de synchronisation afin d'éviter que les exécutions de ce workflow ne se chevauchent. Le job de plan ne s'exécute que pour les pull requests provenant du même dépôt. Les pull requests provenant de forks ne reçoivent pas ces secrets ; exécutez `validate` sans identifiants pour ces contributions, puis exécutez `plan` dans un workflow approuvé.

## Référence de définition {#yaml-reference}

### Tags de synchronisation et identifiants {#sync-tags-and-ids}

Un `sync_tag` identifie l'ensemble des définitions de métriques qui sont gérées ensemble. Utilisez un `sync_tag` stable pour chaque dépôt, équipe ou domaine de métriques que vous souhaitez gérer indépendamment. Par exemple, une équipe chargée de la croissance et une équipe chargée du processus de commande peuvent synchroniser des métriques à partir de différents dépôts en utilisant différentes valeurs de `sync_tag`, telles que `growth-metrics` et `checkout-metrics`.

Au sein d'un `sync_tag`, chaque source de métriques de l'entrepôt de données et chaque métrique possède un `sync_id` stable. Chaque propriété et mesure déclarée nécessite également un `sync_id`, unique au sein de sa propre liste sur cette source. Choisissez des identifiants stables ; ils n'ont pas besoin d'être des UUID. Les agrégations de métriques utilisent `warehouse_metric_source_sync_id` pour sélectionner une source de métriques de l'entrepôt de données. Chaque agrégation sélectionne également une mesure déclarée, chaque ligne ou une correspondance de sujet. Consultez la section [Références aux mesures][4].

La modification d'un `sync_id` peut supprimer l'objet avec l'ancien identifiant et en créer un autre à la place. Pour renommer un objet, modifiez son `name` et conservez les mêmes `sync_tag` et `sync_id`.

Supprimez une source et les métriques qui en dépendent en deux soumissions distinctes. Supprimez d'abord les définitions de métriques, conservez la source et toutes les définitions non liées, puis exécutez `plan` et `execute`. Ensuite, supprimez la source et soumettez les définitions restantes. Un plan qui supprime à la fois la source et ses métriques en une seule opération peut être validé, mais échouer lors de l'exécution. Les références provenant d'autres tags de synchronisation doivent également être supprimées avant de supprimer la source.

Tous les fichiers d'une opération doivent utiliser les mêmes `schema_version` et `sync_tag`. Leurs `options` doivent correspondre une fois les valeurs par défaut appliquées. Par exemple, omettre `is_certified` équivaut à le définir sur `true`. Les valeurs `reference_url` et `warehouse_connection_id` de haut niveau non vides doivent également concorder entre les fichiers.

### Gestion des métriques et des sources existantes avec YAML {#manage-existing-metrics-with-yaml}

La CLI n'exporte pas les métriques existantes vers YAML. Créez le YAML à partir des définitions de source et de métrique, puis placez-le sous contrôle de version. Pour les migrations, `existing_id` fait référence à un objet déjà présent dans l'organisation Datadog cible.

Pour gérer une source manuelle ou une métrique existante avec YAML :

1. Incluez sa définition complète et attribuez-lui un `sync_id` stable.
2. Définissez `existing_id` sur l'UUID de l'objet Datadog correspondant à cette source ou à cette métrique. Ceci diffère du `sync_id` que vous choisissez pour YAML.
3. Définissez `options.upgrade_mode: by_id` dans chaque fichier soumis, puis exécutez `plan` et examinez les modifications avant `execute`.

L'adoption applique la définition YAML et attribue la propriété de synchronisation à l'objet existant. Les synchronisations ultérieures l'identifient par le même `sync_tag` et `sync_id`. Incluez les paramètres et les mappages de source que vous souhaitez conserver ; les champs omis peuvent utiliser les valeurs par défaut ou supprimer les mappages.

### Champs de niveau supérieur {#top-level-fields}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `schema_version` | Oui | Doit être `1`. |
| `sync_tag` | Oui | Clé de propriété stable pour ce groupe de définitions de métriques. Tous les fichiers d'une même opération doivent utiliser le même `sync_tag`.<br>Doit commencer par un caractère alphanumérique et peut contenir des caractères alphanumériques, des traits de soulignement, des points, des deux-points et des tirets. |
| `reference_url` | Non | URL du dépôt source, du runbook ou d'une autre référence pour les métriques synchronisées. |
| `warehouse_connection_id` | Non | UUID de la connexion par défaut à l'entrepôt de données pour les sources de cette soumission. Si une source nécessite une connexion et qu'aucun ID n'est défini, la CLI sélectionne la seule connexion de l'organisation ou signale une erreur si le choix n'est pas unique. |
| `warehouse_metric_sources` | Non | Modèles SQL de l'entrepôt de données et mesures utilisés par les métriques. Incluez chaque source gérée par ce tag que vous souhaitez conserver. |
| `metrics` | Non | Métriques d'expérience à créer ou à mettre à jour. Incluez chaque métrique gérée par ce tag que vous souhaitez conserver. |
| `options` | Non | Options de synchronisation telles que le comportement de certification et de mise à niveau. |

### Options {#options}

| Champ | Par défaut | Description |
| ----- | ------- | ----------- |
| `is_certified` | `true` | Marque les métriques synchronisées comme certifiées. Comme cette option est définie par défaut sur `true`, la synchronisation des métriques nécessite l'autorisation Product Analytics Certified Metrics Write, sauf si vous la définissez sur `false`. |
| `upgrade_mode` | `none` | Utilisez `by_id` avec le `existing_id` d'un objet pour attribuer la propriété de synchronisation à cet objet. La CLI ne prend pas en charge l'adoption par nom. |
| `force_delete` | `false` | Autorise la suppression malgré les références provenant d'expériences actives ou en cours. Les sources référencées par des métriques en dehors de ce tag de synchronisation restent bloquées. Les suppressions ordinaires d'objets non référencés ne nécessitent pas cette option. |

### Sources de métriques de l'entrepôt de données {#warehouse-metric-sources}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `sync_id` | Oui | Identifiant stable pour la source au sein de ce `sync_tag`.<br>Doit commencer par un caractère alphanumérique et peut contenir des caractères alphanumériques, des traits de soulignement, des points, des deux-points et des tirets. |
| `existing_id` | Non | UUID de la source de métriques de l'entrepôt de données Datadog à adopter avec `options.upgrade_mode: by_id`. |
| `name` | Oui | Nom d'affichage dans Datadog. |
| `description` | Non | Description de la source. |
| `sql` | Oui | Requête SQL qui renvoie l'horodatage, les colonnes de sujet et les mesures utilisées par les métriques. |
| `timestamp_column` | Oui | Colonne contenant l'horodatage de l'événement ou de la métrique. |
| `additional_timestamp_columns` | Non | Jusqu'à quatre colonnes d'horodatage supplémentaires renvoyées par `sql`. Chaque nom doit contenir au moins un caractère autre qu'un caractère d'espacement et ne pas dépasser 255 caractères. Les noms doivent être uniques après suppression des caractères d'espacement en début et en fin de nom et ne doivent pas inclure `timestamp_column`. Si cet élément est omis, la source n'a pas de colonnes d'horodatage supplémentaires. |
| `warehouse_connection_id` | Non | UUID de connexion à l'entrepôt de données pour cette source. Remplace la valeur de niveau supérieur. |
| `reference_url` | Non | URL de référence spécifique à la source. |
| `subject_types` | Oui | Au moins un mappage de sujet pour la source. |
| `measures` | Non | Colonnes que les métriques agrègent. |
| `properties` | Non | Colonnes utilisées pour filtrer les événements de métrique. Incluez ces colonnes dans la requête SQL de la source. |

### Types de sujets {#subject-types}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `name` | Oui | Nom du type de sujet Datadog, tel que `User` ou `Account`. |
| `column_name` | Oui | Colonne de résultat SQL qui contient l'identifiant du sujet. |

### Mesures {#measures}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `sync_id` | Oui | Identifiant stable au sein de la source de métriques de l'entrepôt de données. |
| `name` | Oui | Nom d'affichage dans Datadog. |
| `column_name` | Oui | Nom de la colonne de résultat SQL. |
| `column_type` | Oui | Requis pour que Datadog puisse valider la colonne et afficher les options de configuration de la métrique appropriées. Les valeurs prises en charge sont `STRING`, `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE` et `TIMESTAMP`. |
| `description` | Non | Description de la mesure. |

### Propriétés {#properties}

Utilisez `properties` sur une source de métriques de l'entrepôt de données pour déclarer les colonnes utilisées dans les filtres.

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `sync_id` | Oui | Identifiant stable dans la liste des propriétés de la source. Les filtres y font référence avec `property_sync_id`. |
| `property_name` | Oui | Nom d'affichage dans Datadog. |
| `property_column` | Oui | Nom de la colonne de résultat SQL. |
| `property_type` | Oui | Type de colonne, tel que `STRING`. |
| `description` | Non | Description de la propriété. |

Ces noms de champs de propriété correspondent à l'API. Remplacez les champs de propriété précédents `name`, `column_name` et `column_type` par `property_name`, `property_column` et `property_type`. La CLI rejette les noms de propriété précédents. Les définitions de mesure utilisent toujours `name`, `column_name` et `column_type`.

Le format YAML de Datadog diffère du format d'Eppo. Lors de la migration, remplacez `fact_sources` et `facts` par `warehouse_metric_sources` et `measures`, puis mettez à jour les définitions de propriété et les références pour utiliser les champs de ce guide.

### Métriques {#metrics}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `sync_id` | Oui | Identifiant stable pour la métrique au sein de ce `sync_tag`. |
| `existing_id` | Non | UUID de métrique Datadog à adopter avec `options.upgrade_mode: by_id`. |
| `name` | Oui | Nom d'affichage dans Datadog. |
| `description` | Non | Description de la métrique. |
| `metric_type` | Oui | Les valeurs prises en charge sont `simple`, `ratio` et `percentile`. |
| `desired_change` | Non | Direction utilisée pour l'interprétation de l'expérience. Les valeurs prises en charge sont `METRIC_INCREASES` et `METRIC_DECREASES`. |
| `format_as_percent` | Non | Affiche la métrique sous forme de pourcentage. |
| `reference_url` | Non | URL de référence spécifique à la métrique. |
| `guardrail_cutoff_threshold` | Non | Seuil de déclenchement facultatif du garde-fou. |

Ajoutez le champ d'agrégation qui correspond au type de métrique :

- Pour `metric_type: simple`, ajoutez `simple_metric_aggregation`.
- Pour `metric_type: ratio`, ajoutez `ratio_metric_aggregation`.
- Pour `metric_type: percentile`, ajoutez `percentile_metric_aggregation`.

<a id="simple-metric-aggregation"></a>

### Agrégation pour les métriques `simple` {#aggregation-for-simple-metrics}

Les percentiles de winsorisation et les métriques de percentile utilisent des fractions décimales. Par exemple, `0.95` signifie le 95e percentile dans les deux cas.

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `operation` | Oui | Opération d'agrégation, telle que `sum`, `average`, `count` ou `countDistinctValue`. |
| `measure` | Oui | Référence de mesure. |
| `property_filters` | Non | Filtres sur les événements inclus dans l'agrégation. Consultez la section [Filtres][5]. |
| `timeframe_start_value` | Non | Décalage de début pour la période de la métrique. |
| `timeframe_end_value` | Non | Décalage de fin pour la période de la métrique. |
| `timeframe_unit` | Non | Unité de période. |
| `winsor_lower_percentile` | Non | Percentile inférieur de winsorisation, de zéro à un inclus. Doit être inférieur à `winsor_upper_percentile` lorsque les deux sont définis. |
| `winsor_upper_percentile` | Non | Percentile supérieur de winsorisation, de zéro à un inclus. |
| `winsor_lower_fixed_value` | Non | Valeur de winsorisation fixe inférieure. |
| `winsor_upper_fixed_value` | Non | Valeur de winsorisation fixe supérieure. |
| `winsorization_strategy` | Non | Les valeurs prises en charge sont `all_assigned_subjects` (par défaut) et `nonzero`. Pour `operation: threshold`, omettez ce champ ou utilisez `all_assigned_subjects`. |

L'omission de `additional_timestamp_columns` ou `winsorization_strategy` applique les valeurs par défaut ci-dessus, y compris lors de la mise à jour ou de l'adoption d'un objet existant. Incluez ces champs dans le YAML pour définir leurs valeurs.

### Agrégation de métrique de ratio {#ratio-metric-aggregation}

Utilisez `ratio_metric_aggregation` pour définir une métrique comme un numérateur divisé par un dénominateur. `numerator_aggregation` et `denominator_aggregation` utilisent tous deux les mêmes champs que `simple_metric_aggregation`, mais aucun des composants ne prend en charge `operation: average`.

Définissez `winsorization_strategy` séparément sur chaque agrégation. S'il est omis, chaque agrégation utilise `all_assigned_subjects`.

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `numerator_aggregation` | Oui | Agrégation utilisée comme numérateur. |
| `denominator_aggregation` | Oui | Agrégation utilisée comme dénominateur. |

Exemple d'agrégation de métrique de ratio :

```yaml
ratio_metric_aggregation:
  numerator_aggregation:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
    winsor_upper_percentile: 0.99
    winsorization_strategy: nonzero
  denominator_aggregation:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
    winsorization_strategy: all_assigned_subjects
```

### Agrégation de métrique de percentile {#percentile-metric-aggregation}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `measure` | Oui | Référence de mesure. |
| `property_filters` | Non | Filtres sur les événements inclus dans l'agrégation. Consultez la section [Filtres][5]. |
| `percentile` | Oui | Décimal supérieur à zéro et inférieur à un. Utilisez `0.95` pour le 95e percentile. |

Les champs de période ne configurent pas les métriques de percentile.

Exemple d'agrégation de métrique de percentile :

```yaml
percentile_metric_aggregation:
  percentile: 0.95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: revenue
```

### Filtres {#filters}

Définissez `property_filters` dans `simple_metric_aggregation`, dans l'un ou l'autre des composants du ratio ou dans `percentile_metric_aggregation`. Chaque filtre doit faire référence à la même source et au même tag de synchronisation que la mesure de l'agrégation.

Pour une condition, utilisez un seul objet filtre :

```yaml
property_filters:
  property:
    warehouse_metric_source_sync_id: checkout_events
    property_sync_id: country
  operation: IS
  values: [US, CA]
```

Utilisez `IS` pour inclure toute valeur listée ou `IS_NOT` pour exclure les valeurs listées. Les deux opérations nécessitent au moins une valeur. Le `property_sync_id` doit correspondre à une propriété déclarée sur la source. Pour filtrer une source à partir d'un autre tag de synchronisation, incluez `warehouse_metric_source_sync_tag` à la fois dans la référence de propriété et dans la référence de mesure de l'agrégation.

Pour plusieurs conditions qui doivent toutes correspondre (ET), utilisez une liste plate :

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operation: IS
    values: [US]
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: platform
    operation: IS
    values: [web]
```

Cet exemple inclut les événements où le pays est US et la plateforme est web. Il utilise les propriétés `country` et `platform` déclarées dans l'exemple de source complet. Un filtre unique ou une liste plate devient un groupe de filtres dans la requête API.

Pour des alternatives (OU), utilisez des groupes imbriqués. Les conditions au sein de chaque groupe utilisent ET ; les groupes distincts utilisent OU :

```yaml
property_filters:
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [US]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [web]
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [CA]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [mobile]
```

Cet exemple inclut les événements où le pays est US et la plateforme est web, ou le pays est CA et la plateforme est mobile. Chaque groupe doit contenir au moins une condition. Ne mélangez pas les filtres individuels et les groupes dans la même liste.

Utilisez `operation` dans le nouveau YAML. Le champ `operator` précédent reste un alias, mais la CLI rejette un filtre qui définit les deux. Les requêtes utilisent toujours `operation`. Les valeurs de filtre conservent leur texte, y compris celles qui ressemblent à des nombres, telles que `001`. Mettez les valeurs entre guillemets si vous souhaitez que d'autres outils YAML les conservent sous forme de chaînes. Les ancres et alias YAML sont facultatifs et fonctionnent au sein d'un même document.

Les métriques de percentile ne prennent en charge que les filtres de propriété avec `IS` ou `IS_NOT`. Elles ne prennent pas en charge les filtres de mesure ou les checks de nullité.

### Références de mesure {#measure-references}

Chaque agrégation doit sélectionner une source avec `warehouse_metric_source_sync_id` et exactement l'un de ces sélecteurs de mesure :

| Sélecteur | Ce qu'il sélectionne |
| -------- | --------------- |
| `measure_sync_id` | Une mesure déclarée dans la liste `measures` de la source. |
| `kind: each_record` | Chaque ligne renvoyée par la source. Aucune déclaration de mesure n'est requise. |
| `subject_type_name` | La colonne mappée à un nom dans la liste `subject_types` de la source. Aucune déclaration de mesure n'est requise. |

Utilisez ce format de référence dans `simple_metric_aggregation`, les deux composants du ratio et `percentile_metric_aggregation`. L'opération d'agrégation détermine quel sélecteur utiliser :

- `count` nécessite `kind: each_record`.
- `sum` et `average` nécessitent `measure_sync_id`.
- `countDistinctValue` accepte `measure_sync_id` ou `subject_type_name`. Il ne peut pas utiliser `each_record`.
- `uniqueSubjects` nécessite `subject_type_name`. Utilisez `countDistinctValue` pour les nouvelles définitions.

Pour sélectionner une mesure déclarée, utilisez son `sync_id` :

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

Pour compter les lignes renvoyées par la source :

```yaml
simple_metric_aggregation:
  operation: count
  measure:
    warehouse_metric_source_sync_id: checkout_events
    kind: each_record
  timeframe_start_value: 0
```

Pour compter les utilisateurs distincts, associez d'abord le type de sujet `User` à une colonne de la source `checkout_events` :

```yaml
subject_types:
  - name: User
    column_name: user_id
```

Sélectionnez ensuite ce mappage de sujet dans la métrique :

```yaml
simple_metric_aggregation:
  operation: countDistinctValue
  measure:
    warehouse_metric_source_sync_id: checkout_events
    subject_type_name: User
  timeframe_start_value: 0
```

`User` doit exister en tant que type de sujet dans l'organisation. Le nom sélectionné doit correspondre à une entrée `subject_types[].name` sur la source référencée.

Pour référencer une source à partir d'un autre tag de synchronisation, incluez `warehouse_metric_source_sync_tag` avec l'un des trois sélecteurs :

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

Exécutez `validate` pour les checks locaux, puis exécutez `plan` pour prévisualiser les modifications. La validation locale vérifie les mappages de source dans les fichiers soumis. Un tag explicite égal au `sync_tag` du fichier vérifie toujours les mappages locaux lorsque cette source figure dans les fichiers soumis. Les références externes sont résolues pendant `execute` ; un plan réussi ne confirme pas qu'une source externe ou une mesure sélectionnée existe.

L'API de synchronisation ne prend pas en charge `warehouse_metric_measure_id`. Remplacez les ID de mesure bruts par une source et l'un des sélecteurs précédents.

## Limitations de la CLI {#cli-limitations}

La modification de `options.is_certified` uniquement ne met pas à jour la certification sur une source ou une métrique existante par ailleurs inchangée. Vérifiez la certification dans Datadog après avoir géré les définitions existantes avec YAML ; une synchronisation réussie ne confirme pas à elle seule un changement de certification.

La CLI n'exporte pas les définitions existantes et ne convertit pas automatiquement le YAML Eppo. Créez et examinez les définitions complètes avant de gérer les métriques existantes avec YAML.

Pour l'adoption, utilisez `existing_id` avec `options.upgrade_mode: by_id`. Le paramétrage de `upgrade_mode: by_name` seul n'adopte pas les objets ayant des noms correspondants.

## Dépannage {#troubleshooting}

| Erreur | Que vérifier |
| ----- | ------------- |
| L'API renvoie `403`. | Confirmez que la clé d'API/d'application dispose des autorisations Product Analytics requises pour écrire des métriques. Si `is_certified` est activé, confirmez que le rôle dispose également de l'autorisation Product Analytics Certified Metrics Write. |
| Une connexion à l'entrepôt de données est introuvable. | Confirmez que l'organisation Datadog cible dispose d'une connexion à l'entrepôt de données configurée. Si vous définissez `warehouse_connection_id`, confirmez que cette valeur appartient à l'organisation cible. |
| Un type de sujet est introuvable. | Confirmez que la valeur `subject_types[].name` correspond à un type de sujet Datadog existant. |
| Un résultat réussi n'indique aucun changement. | Le service n'a détecté aucun changement à appliquer. Si vous avez modifié uniquement `options.is_certified`, vérifiez la certification dans Datadog ; une synchronisation réussie ne confirme pas que ce paramètre a changé. Une opération ayant échoué n'établit pas que le YAML correspond à Datadog. |
| Une synchronisation est bloquée. | Lisez les détails de l'objet et les raisons du blocage dans la sortie de la console. Pour enregistrer la réponse de l'API, exécutez `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync.log`. Les causes possibles incluent les références d'expérience, les métriques en dehors du tag de synchronisation qui font référence à une source, et les conflits d'adoption. Un résultat bloqué entraîne un code de sortie non nul. |
| Une opération échoue. | Exécutez `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync-result.log` pour récupérer les erreurs disponibles et inspecter la réponse de l'API. Il n'est pas confirmé que les modifications affichées pour une opération ayant échoué ont été appliquées. Certaines défaillances du serveur ne renvoient aucun détail sur l'erreur ; conservez l'identifiant de l'opération pour le support. |
| La validation locale réussit, mais `plan` rejette le YAML. | Les checks locaux ne vérifient pas les requêtes de l'entrepôt de données. Lisez les détails de l'erreur dans la sortie de la console. Pour enregistrer la réponse de l'API, exécutez `metric-sync plan ./metrics --log-file ./metric-sync.log`. Utilisez ces détails pour corriger la définition. |

[1]: /fr/experiments/guide/connecting_a_data_warehouse/
[2]: /fr/account_management/rbac/permissions/#product-analytics
[3]: /fr/account_management/api-app-keys/
[4]: #measure-references
[5]: #filters