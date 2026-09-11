---
description: Surveillez la pertinence, le nombre de lignes, les métriques au niveau
  des colonnes et les requêtes SQL personnalisées dans vos entrepôts de données.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /data_observability/quality_monitoring/
  tag: Documentation
  text: Quality Monitoring
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
title: Monitor Data Observability
---
## Présentation {#overview}

Les monitors [Data Observability][1] utilisent la détection d'anomalies qui apprend de la saisonnalité, des tendances et des retours des utilisateurs pour détecter les données retardées, les chargements incomplets et les changements de valeur inattendus avant qu'ils n'affectent les dashboards en aval, les applications d'IA ou les décisions commerciales. Combinés à une traçabilité complète des données et du code, ces monitors aident les équipes à détecter les problèmes tôt, à évaluer l'impact en aval et à les acheminer vers le bon responsable.

Les monitors Data Observability prennent en charge les types de métriques suivants :

**Types de métriques au niveau du tableau :**
| Type de métrique | Description |
|---|---|
| Pertinence | Suit le temps écoulé depuis la dernière mise à jour d'un tableau. |
| Nombre de lignes | Suit le nombre de lignes dans un tableau ou une vue. |
| SQL personnalisé | Suit une valeur de métrique personnalisée renvoyée par une requête SQL. |

**Types de métriques au niveau des colonnes :**
| Type de métrique | Description |
|---|---|
| Pertinence | Suit la date la plus récente observée dans une colonne de type date/heure. |
| Unicité | Suit le pourcentage de valeurs uniques. |
| Nullité | Suit le pourcentage de valeurs nulles. |
| Cardinalité | Suit le nombre de valeurs distinctes. |
| Pourcentage de zéros | Suit le pourcentage de valeurs égales à zéro. |
| Pourcentage de négatifs | Suit le pourcentage de valeurs négatives. |
| Min / Max / Moyenne / Somme / Écart-type | Suit les mesures statistiques sur les valeurs des colonnes. |

Datadog collecte des métriques telles que le nombre de lignes et la pertinence à partir des métadonnées du système d'entrepôt (par exemple, `INFORMATION_SCHEMA`) lorsqu'elles sont disponibles. Cela évite d'exécuter une requête sur votre entrepôt et réduit les coûts de calcul. Tous les entrepôts n'exposent pas les métadonnées système. Pour les métriques qui ne peuvent pas être collectées à partir des métadonnées système, le monitor exécute une requête directement sur votre entrepôt pour calculer la valeur.

Les monitors Data Observability nécessitent que le [Quality Monitoring][2] soit configuré avec au moins un entrepôt de données pris en charge (par exemple, [Snowflake][3], [Databricks][4] ou [BigQuery][5]).

Data Observability propose quatre types de monitors, sélectionnés lors de la première étape du [flux de création de monitor][13] :

| Type de monitor | Ce qu'il surveille |
|---|---|
| Qualité des données | Pertinence, nombre de lignes et métriques au niveau des colonnes sur les tableaux et les colonnes. |
| [Source vers cible](#source-to-target-monitors) | La différence pour une même métrique entre une ressource source et une ressource cible. |
| [Changement de schéma](#schema-change-monitors) | Champs ajoutés, supprimés, renommés ou dont le type a été modifié dans votre entrepôt. |
| Job | Exécutions de job ayant échoué. |

Sauf indication contraire, les sections ci-dessous décrivent le type de monitor de qualité des données.

## Création de monitor {#monitor-creation}

Pour créer un monitor Data Observability dans Datadog, accédez à [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] ou [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Data Observability{{< /ui >}}][6]. Pour afficher tous les monitors Data Observability existants, consultez la [page des monitors Data Observability][7].

## Choisir les données à surveiller {#choose-data-to-monitor}

Tout d'abord, sélectionnez si vous souhaitez surveiller le niveau {{< ui >}}Table{{< /ui >}} ou {{< ui >}}Column{{< /ui >}} :

{{< img src="monitors/monitor_types/data_observability/entity_type_selection_and_aastra.png" alt="Choisir les données à surveiller : sélecteur de type d'entité, saisie de requête et filtre de relation de lignage" style="width:60%;" >}}

Ensuite, utilisez l'onglet {{< ui >}}Edit{{< /ui >}} pour rechercher des tableaux, des vues ou des colonnes en saisissant des filtres `key:value` dans le champ de recherche.

**Filtrer par nom ou emplacement :**

| Filtrer | Exemple | Description |
|---|---|---|
| Nom | `name:USERS*` | Faire correspondre par nom. Prend en charge les `*` caractères génériques. |
| Schéma | `schema:PROD` | Faire correspondre par schéma. |
| Base de données | `database:ANALYTICS_DB` | Faire correspondre par base de données. |
| Compte | `account:my_account` | Faire correspondre par compte. |

**Filtrer par tag :**

Filtrez sur n'importe quel tag appliqué à vos ressources de données en utilisant la clé de tag comme clé de filtre. Par exemple, si vos ressources sont marquées avec `owner`, `platform` ou `environment`, effectuez une recherche directement sur ces tags :

| Exemple | Description |
|---|---|
| `owner:data-platform-team` | Faire correspondre les ressources marquées avec `owner:data-platform-team`. |
| `platform:snowflake` | Faire correspondre les ressources marquées avec `platform:snowflake`. |
| `environment:production` | Faire correspondre les ressources marquées avec `environment:production`. |

Les filtres de tags prennent en charge les mêmes `*` caractères génériques et citations que les filtres de nom, par exemple `owner:data-*` ou `platform:"Snowflake Prod"`.

**Filtrer par attribut calculé :**

En plus de vos propres tags, Datadog calcule des attributs pour vos ressources de données sur lesquels vous pouvez appliquer des filtres. L'attribut calculé disponible est :

| Attribut | Valeurs | Description |
|---|---|---|
| `lineage_score` | `0.00`, `0.10`, `0.30`, `0.50`, `0.70`, `0.90` ou `1.00` | Une mesure relative de la connectivité d'une ressource dans votre graphe de lignage, basée sur le nombre de ressources en aval qui en dépendent par rapport à d'autres ressources du même type. Les valeurs plus élevées identifient les tableaux, les vues et les colonnes dont dépendent les consommateurs en aval. |

`lineage_score` est réparti dans les niveaux discrets énumérés ci-dessus plutôt que de prendre une valeur continue ; filtrez donc sur l'une de ces valeurs exactes. Faites correspondre un seul niveau, ou combinez des niveaux avec `OR`. Par exemple, `lineage_score:1.00` renvoie vos actifs les plus dépendants, et `lineage_score:(0.90 OR 1.00)` renvoie les deux niveaux supérieurs.

Combinez l'un de ces filtres avec `AND` ou `OR`, utilisez des parenthèses pour regrouper les conditions, et ajoutez le préfixe `-` pour exclure.

**Exemples :**

| Objectif | Requête |
|---|---|
| Tous les tableaux du schéma PROD, à l'exclusion des tableaux temporaires | `schema:PROD AND -name:TEMP*` |
| Toutes les colonnes d'horodatage | `name:*_AT OR name:*_TIMESTAMP` |
| Tableaux dans PROD ou STAGING pour une base de données spécifique | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` |
| Tableaux appartenant à une équipe spécifique | `owner:data-platform-team` |
| Les tableaux les plus dépendants dans une base de données | `database:ANALYTICS_DB AND lineage_score:1.00` |

**Filtrer par relation de lignage :**

Pour limiter votre sélection aux actifs connectés à un autre actif dans votre graphe de lignage, cliquez sur {{< ui >}}Add Relation Filter{{< /ui >}}. Choisissez {{< ui >}}Upstream of{{< /ui >}} ou {{< ui >}}Downstream of{{< /ui >}}, puis sélectionnez un actif spécifique ou utilisez les mêmes filtres `key:value` pour faire correspondre un ensemble d'actifs. Par exemple, surveillez chaque tableau situé en amont d'un dashboard critique, ou chaque colonne située en aval d'un tableau source spécifique.

**Filtrer par relation hiérarchique :**

Pour limiter votre sélection aux actifs qui sont parents ou enfants d'un autre actif dans votre graphe de lignage, cliquez sur {{< ui >}}Add Relation Filter{{< /ui >}}. Choisissez {{< ui >}}Parent of{{< /ui >}} ou {{< ui >}}Child of{{< /ui >}}, puis sélectionnez un actif spécifique ou utilisez les mêmes filtres `key:value` pour faire correspondre un ensemble d'actifs. Par exemple, surveillez chaque tableau qui possède une colonne `revenue`, ou chaque tableau situé dans un schéma critique.

Un seul monitor peut suivre jusqu'à 5 000 tableaux, vues ou colonnes. Cette limite ne peut pas être augmentée. Si votre requête en correspond davantage, répartissez-les sur plusieurs monitors.

## Sélectionnez votre type de métrique {#select-your-metric-type}

Choisissez un type de métrique en fonction du signal de qualité des données que vous souhaitez suivre. Chaque monitor suit un type de métrique.

{{< tabs >}}
{{% tab "Pertinence" %}}

Le type de métrique {{< ui >}}Freshness{{< /ui >}} détecte quand les données n'ont pas été mises à jour dans une fenêtre temporelle attendue. Utilisez-le pour détecter des données obsolètes avant qu'elles n'affectent les rapports ou les modèles en aval.

La - **pertinence de tableau** suit le temps écoulé depuis la dernière mise à jour du tableau. La pertinence de tableau n'est pas disponible pour les vues ou pour les entrepôts de données qui ne fournissent pas d'horodatages mis à jour pour les tableaux dans les métadonnées système. Utilisez plutôt la pertinence au niveau de la colonne.
La - **pertinence de colonne** suit la date la plus récente observée dans une colonne de type date/heure.

{{% /tab %}}
{{% tab "Nombre de lignes" %}}

Le type de métrique {{< ui >}}Row Count{{< /ui >}} suit les changements du nombre de lignes dans vos tableaux. Utilisez-le pour détecter des baisses ou des pics inattendus dans les données qui pourraient indiquer des échecs de pipeline ou des problèmes en amont.

{{% /tab %}}
{{% tab "Métrique de colonne" %}}

Les types de métrique {{< ui >}}Column{{< /ui >}} suivent des métriques au niveau de la colonne pour détecter une dérive des données ou une dégradation de la qualité. Faites votre choix parmi les éléments suivants :

| Métrique | Description |
|---|---|
| {{< ui >}}Uniqueness{{< /ui >}} | Le pourcentage de valeurs dans une colonne qui sont uniques. |
| {{< ui >}}Nullness{{< /ui >}} | Le pourcentage de valeurs nulles dans une colonne. |
| {{< ui >}}Cardinality{{< /ui >}} | Le nombre de valeurs distinctes dans une colonne. |
| {{< ui >}}Percent Zero{{< /ui >}} | Le pourcentage de valeurs égales à zéro dans une colonne. |
| {{< ui >}}Percent Negative{{< /ui >}} | Le pourcentage de valeurs négatives dans une colonne. |
| {{< ui >}}Min{{< /ui >}} | Le minimum de toutes les valeurs dans une colonne. |
| {{< ui >}}Max{{< /ui >}} | Le maximum de toutes les valeurs dans une colonne. |
| {{< ui >}}Mean{{< /ui >}} | La moyenne de toutes les valeurs dans une colonne. |
| {{< ui >}}Standard Deviation{{< /ui >}} | La mesure de la variation au sein des valeurs dans une colonne. |
| {{< ui >}}Sum{{< /ui >}} | La somme de toutes les valeurs dans une colonne. |

<div class="alert alert-info">Certaines métriques de colonne ne sont disponibles que pour des types de colonne spécifiques. Les métriques numériques (Pourcentage de zéro, Pourcentage de négatif, Min, Max, Moyenne, Écart-type, Somme) nécessitent des colonnes numériques.</div>

{{% /tab %}}
{{% tab "SQL personnalisé" %}}

Le type de métrique {{< ui >}}Custom SQL{{< /ui >}} suit une valeur de métrique personnalisée renvoyée par une requête SQL que vous définissez. Utilisez-le lorsque les types de métriques intégrés ne couvrent pas votre cas d'utilisation, comme la surveillance de règles de qualité de données spécifiques à l'entreprise.

1. Sélectionnez un type de modèle qui décrit la valeur renvoyée par votre requête :
    - {{< ui >}}Default{{< /ui >}} : La requête renvoie une valeur scalaire. Utilisez ceci dans la plupart des cas.
    - {{< ui >}}Freshness{{< /ui >}} : La requête renvoie la différence (en secondes) entre l'heure actuelle et la dernière fois qu'un événement s'est produit.
    - {{< ui >}}Percentage{{< /ui >}} : La requête renvoie une valeur en pourcentage comprise entre 0 et 100.
2. Écrivez une requête SQL qui renvoie une valeur unique avec alias `dd_value`, par exemple : `SELECT COUNT(*) as dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED'`
3. Cliquez sur {{< ui >}}Validate{{< /ui >}} pour vérifier la syntaxe de votre requête.

Si votre requête SQL comporte une clause `GROUP BY`, regroupez les colonnes regroupées sous forme de liste séparée par des virgules dans le champ {{< ui >}}Group by{{< /ui >}} (par exemple, `column_a, column_b`). Chaque groupe est évalué indépendamment.

**Remarque** : Chaque monitor SQL personnalisé compte comme un tableau surveillé individuel à des fins de facturation.

{{< img src="monitors/monitor_types/data_observability/custom_sql_example.png" alt="Champ de saisie pour la création d'un monitor SQL personnalisé." style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configurer le monitor {#configure-monitor}

### Méthode de détection {#detection-method}

Sélectionnez une méthode de détection :

- {{< ui >}}Anomalies{{< /ui >}} : Alertez lorsque la métrique s'écarte d'un modèle attendu. Aucune valeur seuil n'est requise. Le modèle d'anomalie nécessite **3 à 7 jours** pour s'entraîner (incluant un week-end), selon la fréquence de mise à jour des données sous-jacentes. Pendant la période d'entraînement, le monitor ne déclenche pas d'alertes et est affiché en bleu. Une fois l'entraînement terminé, le monitor est affiché en vert lorsqu'il est dans un état normal et en rouge lorsqu'il est dans un état singulier.
- {{< ui >}}Thresholds{{< /ui >}} : alerte lorsque la métrique dépasse une valeur prédéfinie. Définissez l'opérateur de comparaison (`above`, `above or equal to`, `below`, `below or equal to`, `equal to` ou `not equal to`) et définissez un seuil {{< ui >}}Critical{{< /ui >}} (requis) et éventuellement un seuil {{< ui >}}Warning{{< /ui >}}. Pour plus de détails, consultez [Configure Monitors][8].

### Clause WHERE {#where-clause}

Ajoutez une clause {{< ui >}}WHERE{{< /ui >}} pour filtrer les données évaluées par le monitor. Ceci est utile pour surveiller des segments de données spécifiques ou uniquement des enregistrements récents. Exemple :

- `created_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())` — surveillez uniquement les lignes de la semaine passée.
- `region = 'US'` — surveillez uniquement les données d'une région spécifique.

### Grouper par {#group-by}

Vous pouvez ajouter une clause {{< ui >}}Group by{{< /ui >}} pour diviser un seul monitor en plusieurs groupes, chacun étant évalué indépendamment. Par exemple, le regroupement d'un monitor de nombre de lignes par une colonne `REGION` produit une alerte distincte pour chaque zone géographique.

{{< img src="monitors/monitor_types/data_observability/group_by_column_selection.png" alt="Champ de saisie pour sélectionner les dimensions GROUP BY." style="width:80%;" >}}

La limite par défaut est de 500 groupes par monitor. Pour augmenter cette limite, [contactez le support][9].

### Configuration du modèle {#model-configuration}

Pour les monitors utilisant la méthode de détection {{< ui >}}Anomalies{{< /ui >}}, développez {{< ui >}}Model configuration{{< /ui >}} pour affiner le comportement du modèle :

| Setting | Description |
|---|---|
| {{< ui >}}Alert after N consecutive anomalies{{< /ui >}} | Le nombre d'évaluations ayant échoué consécutivement avant que le monitor n'envoie une alerte. Configurez ce paramètre pour supprimer les pics isolés. |
| {{< ui >}}Minimum upper bound size{{< /ui >}} | Limite la précision avec laquelle le modèle suit vos données sur la borne supérieure. |
| {{< ui >}}Minimum lower bound size{{< /ui >}} | Limite la précision avec laquelle le modèle suit vos données sur la borne inférieure. |

Dans le menu déroulant {{< ui >}}If data is missing to evaluate{{< /ui >}}, sélectionnez ce que le monitor signale lorsqu'aucune donnée n'est disponible pour une évaluation.

### Planning du monitor {#monitor-schedule}

Définissez la fréquence à laquelle le monitor évalue vos données :

- {{< ui >}}Scheduled{{< /ui >}} : Le monitor s'exécute selon une cadence fixe. Sous {{< ui >}}Run this monitor{{< /ui >}}, sélectionnez {{< ui >}}Hourly{{< /ui >}}, {{< ui >}}Every 3 hours{{< /ui >}}, {{< ui >}}Every 6 hours{{< /ui >}}, {{< ui >}}Every 12 hours{{< /ui >}}, {{< ui >}}Daily{{< /ui >}} ou {{< ui >}}Custom schedule{{< /ui >}}.
- {{< ui >}}Manual{{< /ui >}} (Aperçu) : Le monitor s'exécute uniquement lorsqu'il est déclenché par programmation. Déclenchez ces monitors à l'aide de l'[API Data Observability][10] selon un planning afin d'accumuler suffisamment de données historiques pour que la modélisation soit utile. L'interface utilisateur ne prend pas en charge les métriques par défaut telles que le nombre de lignes et la pertinence ; ce workflow s'applique donc aux métriques personnalisées ou au niveau des colonnes.

Pour définir votre propre cadence, sélectionnez {{< ui >}}Custom schedule{{< /ui >}} et fournissez une expression cron. Un planning personnalisé peut s'exécuter toutes les 15 minutes. {{< ui >}}Preview times{{< /ui >}} répertorie les prochaines exécutions dans votre fuseau horaire local, afin que vous puissiez confirmer l'expression avant de l'enregistrer.

### Définir les conditions d'alerte {#set-alert-conditions}

Choisissez un type d'agrégation :

- {{< ui >}}Simple Alert{{< /ui >}} : Envoyez une notification unique lorsqu'un tableau ou une colonne surveillé(e) remplit la condition.
- {{< ui >}}Multi Alert{{< /ui >}} : Envoyez une notification pour chaque groupe remplissant la condition. Personnalisez les dimensions de regroupement (par exemple, `table`, `schema`, `database`) pour contrôler la granularité des alertes. Par exemple, le regroupement par `schema` n'envoie qu'une seule alerte par schéma, regroupant tous les tableaux concernés pour réduire le bruit.

### Exemple de notification {#example-notification}

{{< tabs >}}
{{% tab "Seuil" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Data quality issue detected on {{database.name}}.{{schema.name}}.{{table.name}}:
current value {{value}} has breached the threshold of {{threshold}}.
{{/is_alert}}

{{#is_recovery}}
Data quality issue on {{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Current value {{value}} is within the threshold of {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Anomalies" %}}

{{< code-block lang="text" >}}
{{#is_alert}}
Anomaly detected on {{database.name}}.{{schema.name}}.{{table.name}}:
observed value {{observed}} is outside the expected range of {{lower_bound}} to {{upper_bound}}
(predicted: {{predicted}}).
{{/is_alert}}

{{#is_recovery}}
{{database.name}}.{{schema.name}}.{{table.name}} has recovered.
Observed value {{observed}} is within the expected range.
{{/is_recovery}}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## monitors de la source à la cible {#source-to-target-monitors}

<div class="alert alert-info">Les monitors de la source à la cible sont en préversion. Contactez votre représentant Datadog ou le <a href="/help/">support</a> pour demander l'accès.</div>

Un monitor de la source à la cible compare la même métrique sur deux actifs de données et envoie une alerte lorsque les deux valeurs divergent. D'autres monitors Data Observability suivent si un seul actif est récent ou complet. Un monitor de la source à la cible suit si la copie arrivée à destination correspond à ce qui a quitté la source.

Lorsqu'un pipeline déplace des données entre des systèmes, les échecs partiels ressemblent rarement à des échecs. Si 100 000 lignes quittent un tableau source et que 99 850 lignes arrivent à destination, un monitor de nombre de lignes sur la destination seule voit une valeur plausible. La comparaison des deux actifs met en évidence l'écart.

Utilisez un monitor de la source à la cible pour :

- Valider la réplication de Postgres vers Databricks.
- Réconciliez deux bases de données au sein du même compte Snowflake, par exemple une base de données de qualité par rapport à la production.
- Vérifiez une migration de Redshift vers BigQuery avant le basculement, en exécutant les deux systèmes côte à côte et en confirmant qu'ils correspondent.
- Confirmez qu'une transformation ne supprime pas de lignes entre son entrée et sa sortie.

Les monitors « source vers cible » sont disponibles dans toutes les régions, à l'exception de GovCloud.

### Créer un monitor de la source à la cible {#create-a-source-to-target-monitor}

1. Accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][6] et sélectionnez {{< ui >}}Source to Target{{< /ui >}}.
2. Sous {{< ui >}}Choose source{{< /ui >}}, sélectionnez l'entrepôt qui contient les données sources, puis sélectionnez les données à comparer.
3. Sous {{< ui >}}Choose target{{< /ui >}}, faites de même pour la destination. La source et la cible peuvent se trouver dans des entrepôts de données différents ou dans le même.
4. Sous {{< ui >}}Select your metric type{{< /ui >}}, choisissez la métrique à comparer. Les monitors « source vers cible » prennent en charge les mêmes types de métriques que les autres monitors Data Observability, notamment le nombre de lignes, la pertinence, la nullité, l'unicité, la cardinalité et {{< ui >}}Custom SQL{{< /ui >}}.
5. Définissez {{< ui >}}Format{{< /ui >}} pour contrôler la manière dont la comparaison est exprimée :
    - {{< ui >}}Difference{{< /ui >}} : la valeur cible moins la valeur source. Une valeur négative signifie que la cible a moins que la source.
    - {{< ui >}}% Difference{{< /ui >}} : la même différence en pourcentage de la valeur source.
6. Configurez la méthode de détection, le planning et les notifications comme décrit dans [Configurer le monitor](#configure-monitor).

Le panneau {{< ui >}}Preview Monitor Evaluation{{< /ui >}} affiche la source et la cible identifiées, ainsi qu'un aperçu de la métrique sélectionnée.

L'actif surveillé est la cible, le monitor apparaît donc sur la page d'état de la cible.

### Comparer une métrique personnalisée {#compare-a-custom-metric}

Lorsque le type de métrique est {{< ui >}}Custom SQL{{< /ui >}}, fournissez une requête pour la source et une requête pour la cible. Une clause {{< ui >}}WHERE{{< /ui >}} n'est pas acceptée pour ce type de métrique. Incluez tout filtrage dans chaque requête.

### Évaluation {#evaluation}

La différence entre la source et la cible est enregistrée en tant que métrique distincte ; un monitor source vers cible est donc évalué par les mêmes méthodes de détection que tout autre Data Observability monitor, y compris la détection d'anomalies. Les deux côtés sont mesurés selon un planning synchronisé, de sorte que les deux valeurs sont capturées en même temps plutôt que de suivre la cadence de collecte par défaut de chaque entrepôt.

## Monitors de changement de schéma {#schema-change-monitors}

<div class="alert alert-info">Les monitors de changement de schéma sont en préversion.</div>

Un monitor de changement de schéma vous alerte lorsque la structure de vos données change, plutôt que lorsque leur contenu change. Utilisez-le pour détecter un changement en amont avant qu'il n'interrompe un pipeline ou un dashboard en aval, par exemple lorsqu'une colonne est supprimée, renommée ou convertie vers un type de données différent.

Les monitors de changement de schéma détectent quatre types de changements dans les bases de données, les schémas, les tableaux et les colonnes :

| Type de changement | Description |
|---|---|
| Ajouté | Une base de données, un schéma, un tableau ou une colonne a été créé(e). |
| Supprimé | Une base de données, un schéma, un tableau ou une colonne a été supprimé(e). |
| Renommé | Un tableau ou une colonne a été renommé(e). |
| Type modifié | Le type de données d'une colonne a été modifié, par exemple de `INTEGER` à `STRING`. |

Les changements de schéma sont détectés pour Snowflake, BigQuery, Databricks et Redshift.

### Créer un monitor de changement de schéma {#create-a-schema-change-monitor}

1. Accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Schema Change{{< /ui >}}][11].
2. Sous {{< ui >}}Choose data to monitor{{< /ui >}}, sélectionnez l'entrepôt à surveiller.
3. Configurez les notifications comme décrit dans [Configurer le monitor](#configure-monitor).

Un monitor de changement de schéma ne prend pas de type de métrique ni de méthode de détection car il alerte sur un changement structurel plutôt que sur une valeur mesurée dépassant une limite.

### Parcourir les changements de schéma détectés {#browse-detected-schema-changes}

Pour voir les changements que Datadog a détectés sans créer de monitor, allez dans [{{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Schema Changes{{< /ui >}}][12]. Filtrez par plateforme, compte, base de données, schéma ou type de changement, et développez une entrée pour voir les colonnes affectées et leurs types de données.

Les changements sont détectés lorsque Datadog collecte ensuite les métadonnées de schéma depuis votre entrepôt et compare la structure actuelle avec celle précédemment collectée.

## Exemples de monitors {#example-monitors}

{{< tabs >}}
{{% tab "Baisse du nombre de lignes" %}}

Détectez une diminution significative du nombre de lignes qui pourrait indiquer une défaillance du pipeline ou des données manquantes.

1. Sélectionnez {{< ui >}}Table{{< /ui >}} > {{< ui >}}Row Count{{< /ui >}} et choisissez le tableau cible (par exemple, `ANALYTICS_DB.PROD.EVENTS`).
2. Sélectionnez {{< ui >}}Anomalies{{< /ui >}} comme méthode de détection. Le monitor se déclenche lorsque le nombre de lignes s'écarte de sa référence historique.

{{% /tab %}}
{{% tab "Tableau obsolète" %}}

Déclenchez une alerte lorsqu'un tableau critique n'a pas été mis à jour dans la fenêtre de temps prévue.

1. Sélectionnez {{< ui >}}Table{{< /ui >}} > {{< ui >}}Freshness{{< /ui >}} et choisissez le tableau cible (par exemple, `ANALYTICS_DB.PROD.ORDERS`).
2. Sélectionnez {{< ui >}}Thresholds{{< /ui >}} comme méthode de détection.
3. Définissez le {{< ui >}}Alert threshold{{< /ui >}} sur **6 heures** et éventuellement une {{< ui >}}Warning threshold{{< /ui >}} à **4 heures**.

{{% /tab %}}
{{% tab "Pic de pourcentage de valeurs nulles" %}}

Détectez quand le pourcentage de valeurs nulles d'une colonne dépasse les niveaux normaux, ce qui peut indiquer des problèmes d'ingestion de données.

1. Sélectionnez {{< ui >}}Column{{< /ui >}} > {{< ui >}}Nullness{{< /ui >}} et choisissez la colonne cible (par exemple, `ANALYTICS_DB.PROD.USERS.EMAIL`).
2. Sélectionnez {{< ui >}}Anomalies{{< /ui >}} comme méthode de détection.

{{% /tab %}}
{{% tab "Lignes perdues entre la source et la cible" %}}

Détectez les lignes perdues entre un tableau source et sa destination après une réplication ou une migration.

1. Sélectionnez {{< ui >}}Source to Target{{< /ui >}}, puis choisissez le tableau source (par exemple, `POSTGRES_DB.PUBLIC.ORDERS`) et le tableau cible (par exemple, `ANALYTICS_DB.PROD.ORDERS`).
2. Sélectionnez {{< ui >}}Row Count{{< /ui >}} comme type de métrique et définissez {{< ui >}}Format{{< /ui >}} sur {{< ui >}}Difference{{< /ui >}}.
3. Sélectionnez {{< ui >}}Anomalies{{< /ui >}} comme méthode de détection.

{{% /tab %}}
{{< /tabs >}}

## Annoter les limites {#annotate-bounds}

Pour les monitors utilisant la méthode de détection **Anomalie**, vous pouvez annoter des plages de limites pour fournir des commentaires et améliorer le modèle au fil du temps. Contrairement aux métriques d'infrastructure, les métriques de qualité des données sont souvent spécifiques à l'entreprise ; utilisez donc des annotations pour apprendre au modèle quel comportement est normal pour vos données.

{{< img src="/monitors/monitor_types/data_observability/annotate_bounds.png" alt="Menu survol pour annoter une limite de monitor." style="width:90%;" >}}

Sur la page d'état d'un monitor, cliquez sur {{< ui >}}Annotate Bounds{{< /ui >}}, sélectionnez une plage temporelle sur le graphique et choisissez l'une des annotations suivantes :

| Annotation | Description |
|---|---|
| {{< ui >}}Expected{{< /ui >}} | Élargir les limites pour inclure le comportement marqué de façon permanente. |
| {{< ui >}}Reset for now{{< /ui >}} | Marquer le comportement comme OK, mais alerter s'il se reproduit. |
| {{< ui >}}Missed alert{{< /ui >}} | Réduire les limites pour alerter sur ce comportement. |
| {{< ui >}}Ignore{{< /ui >}} | Exclure les données annotées lors de la modélisation des limites. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_observability/
[2]: /fr/data_observability/quality_monitoring/
[3]: /fr/data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /fr/data_observability/quality_monitoring/data_warehouses/databricks/
[5]: /fr/data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: https://app.datadoghq.com/monitors/create/data-quality
[7]: https://app.datadoghq.com/data-obs/monitors
[8]: /fr/monitors/configuration/?tab=thresholdalert#thresholds
[9]: /fr/help/
[10]: /fr/api/latest/data-observability/
[11]: https://app.datadoghq.com/monitors/create/schema-change
[12]: https://app.datadoghq.com/data-obs/schema-changes
[13]: https://app.datadoghq.com/monitors/create/data-quality