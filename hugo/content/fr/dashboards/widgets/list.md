---
algolia:
  tags:
  - event stream
  - log stream
description: Affichez des listes filtrables d'événements et d'incidents provenant
  de logs, de RUM, d'événements et d'autres sources dans des widgets de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: Centre d'apprentissage
  text: Découverte des widgets Tableau, Liste, SLO et Architecture
title: Widget de liste
widget_type: list_stream
---
Le widget de liste affiche une liste d'événements et d'incidents, qui peuvent provenir de diverses sources telles que les Logs, RUM ou les Événements. Recherchez et interrogez les sources pour affiner les événements que vous souhaitez que le widget mette en évidence et affiche.

_Widget de liste affichant des incidents de suivi des erreurs_

{{< img src="dashboards/widgets/list/list_overview.png" alt="Widget de liste affichant une liste d’erreurs, leur nombre d’erreurs et leur volume." style="width:50%;">}}

## Configuration {#setup}

{{< img src="dashboards/widgets/list/list_setup.png" alt="Modale de configuration du widget de liste" style="width:100%;">}}

### Configuration {#configuration}

1. Choisissez le type de données à représenter graphiquement. Le widget de liste prend en charge de nombreuses sources de données, selon les produits activés pour votre organisation. Pour la liste complète, consultez [Sources de données prises en charge](#supported-data-sources).

2. Définissez les préférences d'affichage. Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.

3. Facultatif : donnez un titre à votre graphique (ou laissez vide pour un titre suggéré).

### Sources de données prises en charge {#supported-data-sources}

Les sources de données disponibles dans le menu déroulant des sources dépendent des produits activés pour votre organisation. Le tableau suivant répertorie chaque source de données, les données qu'elle affiche et les éventuelles exigences produit. Lorsque cela est possible, cliquez sur une source de données dans le tableau pour accéder à ses options de configuration.

Les sources de données marquées _(Aperçu)_ sont en version Aperçu et peuvent ne pas être disponibles dans votre organisation.

| Source de données | Description | Exigences |
|-------------|-------------|--------------|
| [Audit Trail](#options) | Événements d'audit qui suivent l'activité dans votre organisation. | Audit Trail |
| [Cas](#cases) | Cas qui suivent et trient le travail entre les équipes. | Case Management |
| [Déploiements CD](#options) _(Aperçu)_ | Exécutions de déploiement en livraison continue. | CD Visibility |
| [Pipeline CI](#ci-pipeline) | Exécutions de pipeline CI. | CI Pipeline Visibility |
| [Test CI](#options) | Exécutions de tests CI. | Test Optimization |
| [Data Observability](#data-observability-preview) _(Aperçu)_ | Actifs de données, tels que les jeux de données et le lignage, issus de Data Observability. | Data Observability |
| [Recommandations de base de données](#database-recommendations-preview) _(Aperçu)_ | Recommandations d'optimisation issues de Database Monitoring. | Database Monitoring |
| [Éditeur DDSQL](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Résultats d'une requête DDSQL. | Aucun |
| [Règles de détection](#detection-rules-preview) _(Aperçu)_ | Règles de détection de sécurité. | Cloud SIEM ou Cloud Security |
| [Portail développeur](#notebook-ddsql-editor-reference-tables-and-developer-portal) _(Aperçu)_ | Vues des entités logicielles, y compris les services, les API et les magasins de données. | Internal Developer Portal |
| [Événements](#events) | Événements provenant d'Events Explorer. | Aucun |
| [Incidents](#incidents) | Incidents provenant d'Incident Management. | Incident Management |
| [Ressources d'infrastructure](#infrastructure-resources-preview) _(Aperçu)_ | Ressources d'infrastructure, telles que les hosts et les conteneurs. | Infrastructure Monitoring |
| [Incidents](#issues) | Incidents de suivi des erreurs dans l'APM, les logs, le RUM et d'autres sources. | Error Tracking |
| [Agent Observability](#options) | Traces et spans provenant d'Agent Observability. | Agent Observability |
| [Logs](#logs) | Événements de log individuels. Vous pouvez également regrouper les logs par modèles ou par transactions. | Log Management |
| [Notebook](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Données provenant d'une cellule de notebook. | Notebooks |
| [On-Call](#on-call) | Événements et pages On-Call. | Datadog On-Call |
| [Product Analytics](#options) _(Aperçu)_ | Événements d'analytique produit. | Product Analytics |
| [Recommandations](#recommendations) | Recommandations d'optimisation des coûts cloud issues de Cloud Cost Management. | Cloud Cost Management |
| [Tables de référence](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Lignes issues d'un tableau de référence. | Tables de référence |
| [RUM](#options) | Événements de Real User Monitoring. | Real User Monitoring |
| [Security Signals ](#options) _(Aperçu)_ | Signaux de sécurité générés par les règles de détection. | Cloud SIEM |
| [Spans](#spans-and-watchdog-alerts) | APM spans. | APM |
| [Watchdog Alerts](#spans-and-watchdog-alerts) | Alertes générées par Watchdog. | Aucun |
| [Workload Protection Agent](#workload-protection-agent-preview) _(Aperçu)_ | Événements de protection des charges de travail issus du Datadog Agent. | Workload Protection |

**Remarque :** La source de données **Recommandations** affiche uniquement les recommandations de Cloud Cost Management. Les recommandations APM ne sont pas disponibles en tant que source de données pour le widget de liste. Si Cloud Cost Management n'est pas configuré pour votre organisation, le widget affiche un message `Not Accessible`. Cela indique que la source de données nécessite Cloud Cost Management, et non que vous manquez d'autorisations.

### Options {#options}

Chaque source de données possède sa propre configuration. Pour la plupart des sources de données, vous pouvez :

- Sélectionnez les **colonnes** à afficher.
- **Triez** la liste en choisissant une colonne et une direction (croissante ou décroissante). Les colonnes de tri disponibles sont les colonnes affichées dans le widget.
- Affinez les résultats avec une **requête de recherche**.

Les sources de données suivantes disposent d'options supplémentaires ou différentes.

{{% collapse-content title="Cas" level="h4" id="cases" expanded=false %}}
Trier par (croissant ou décroissant) :

- Nombre d'alertes
- Dernière création
- Clé de cas
- Dernière mise à jour
- Priorité
- Statut
- Non assigné
{{% /collapse-content %}}

{{% collapse-content title="Pipeline CI" level="h4" id="ci-pipeline" expanded=false %}}
Sélectionnez un **Level** à afficher : Pipeline, Phase, Job, Étape ou Personnalisé.
{{% /collapse-content %}}

{{% collapse-content title="Data Observability (Aperçu)" level="h4" id="data-observability-preview" expanded=false %}}
Sélectionnez un type d'entité (tableau de base de données ou colonne de base de données). Les colonnes et options de tri disponibles dépendent du type d'entité.
{{% /collapse-content %}}

{{% collapse-content title="Recommandations de base de données (Aperçu)" level="h4" id="database-recommendations-preview" expanded=false %}}
Trier par (croissant ou décroissant) :

- Gravité
- Type
- Première détection
- Dernière détection
{{% /collapse-content %}}

{{% collapse-content title="Règles de détection (Aperçu)" level="h4" id="detection-rules-preview" expanded=false %}}
Les colonnes triables incluent Nom, Date de création, Date de dernière mise à jour, Activé, Gravité et Source. Vous pouvez également sélectionner un produit de règle pour filtrer les règles affichées.
{{% /collapse-content %}}

{{% collapse-content title="Events" level="h4" id="events" expanded=false %}}
Taille du format de rapport :

- Petite (titre uniquement) (par défaut)
- Grande (événement complet)
{{% /collapse-content %}}

{{% collapse-content title="Incidents" level="h4" id="incidents" expanded=false %}}
Trier par (croissant ou décroissant) :

- Créé
- Détecté
- Modifié
- Résolu
- Gravité
- Statut
- Titre
{{% /collapse-content %}}

{{% collapse-content title="Ressources d'infrastructure (Aperçu)" level="h4" id="infrastructure-resources-preview" expanded=false %}}
Sélectionnez un **Type de ressource** à afficher, tel que Pods, Containers (conteneurs), Deployments (déploiements), Services ou Nodes (nœuds). Les colonnes et les options de tri disponibles dépendent du type de ressource.
{{% /collapse-content %}}

{{% collapse-content title="Les issues" level="h4" id="issues" expanded=false %}}
Trier par :

- Pertinence (par défaut)
- Nombre
- Plus récent
- Sessions impactées (incidents RUM uniquement)

Les colonnes disponibles dépendent de la source des incidents (Logs, APM ou RUM).

**Remarque :** La modification de la sélection de tri ne change pas les colonnes affichées. Pour trier par sessions impactées et les voir dans le widget, vous devez également ajouter la colonne « Sessions impactées » dans l'éditeur de graphique.
{{% /collapse-content %}}

{{% collapse-content title="Logs" level="h4" id="logs" expanded=false %}}
Grouper par :

- Modèles
- Transactions

Selon la configuration de vos logs, vous pouvez également sélectionner un emplacement de stockage : Standard Indexes, Standard Indexes + Flex Logs, ou Online Archives.

Pour la colonne de message, vous pouvez choisir le nombre de lignes à afficher (1, 3 ou 10).
{{% /collapse-content %}}

{{% collapse-content title="Notebook, DDSQL Editor, Reference Tables et Developer Portal" level="h4" id="notebook-ddsql-editor-reference-tables-and-developer-portal" expanded=false %}}
Ces sources de données affichent des lignes provenant d'un jeu de données ou d'un tableau sauvegardé :

- **Notebook** et **DDSQL Editor** : sélectionnez un jeu de données publié.
- **Reference Tables** : sélectionnez un tableau de référence.
- **Developer Portal** : sélectionnez un tableau d'entité logicielle, tel que des services, des API ou datastores.

Pour ces sources de données, vous pouvez :

- Définissez **Affichez les premiers** pour limiter le nombre de lignes (10, 25, 50, 100, 500 ou 1000, ou une valeur personnalisée).
- Basculez **Afficher toutes les colonnes**, ou sélectionnez jusqu'à 12 colonnes à afficher.
- Triez en cliquant sur l'icône de tri d'une colonne.
- Filtrez les lignes avec une requête de recherche.
{{% /collapse-content %}}

{{% collapse-content title="On-Call" level="h4" id="on-call" expanded=false %}}
Sélectionnez un **Team**, et ajoutez éventuellement des **Tags** pour filtrer les événements affichés.
{{% /collapse-content %}}

{{% collapse-content title="Recommandations" level="h4" id="recommendations" expanded=false %}}
Les colonnes de la source de données Recommendations sont fixes et ne peuvent pas être personnalisées.
{{% /collapse-content %}}

{{% collapse-content title="Spans et Watchdog Alerts" level="h4" id="spans-and-watchdog-alerts" expanded=false %}}
Ces sources de données prennent en charge une requête de recherche mais ne fournissent pas d'option de tri. Watchdog Alerts affiche un ensemble fixe de champs.
{{% /collapse-content %}}

{{% collapse-content title="Workload Protection Agent (Preview)" level="h4" id="workload-protection-agent-preview" expanded=false %}}
Pour la colonne Content, vous pouvez choisir le nombre de lignes à afficher (1, 3 ou 10).
{{% /collapse-content %}}

## API {#api}

Ce widget peut être utilisé avec le **[Dashboards API][1]**. Consultez le tableau suivant pour la [widget JSON schema definition][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/