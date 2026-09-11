---
algolia:
  tags:
  - event stream
  - log stream
description: Affichez des listes filtrables d'événements et de problèmes provenant
  de logs, du RUM, d'événements et d'autres sources dans les widgets de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
title: Widget List
widget_type: list_stream
---

Le widget List affiche une liste d'événements et de problèmes pouvant provenir de diverses sources telles que les logs, le RUM ou les événements. Effectuez des recherches et des requêtes sur les sources pour filtrer les événements que vous souhaitez que le widget mette en évidence et affiche.

_Widget List affichant des problèmes Error Tracking_

{{< img src="dashboards/widgets/list/list_overview.png" alt="Widget List affichant une liste d'erreurs, leur nombre et leur volume." style="width:50%;">}}

## Configuration

{{< img src="dashboards/widgets/list/list_setup.png" alt="Fenêtre de configuration du widget List" style="width:100%;">}}

### Configuration

1. Choisissez le type de données à représenter. Vous pouvez créer un widget List à partir de problèmes (Issues), de logs, d'Audit Trail, d'alertes Watchdog ou d'événements, selon les produits disponibles pour votre organisation.

2. Définissez les préférences d'affichage. Sur les screenboards et les notebooks, choisissez si votre widget utilise un intervalle de temps personnalisé ou l'intervalle de temps global.

3. Facultatif : attribuez un titre à votre graphique (ou laissez le champ vide pour un titre suggéré).

### Options

Chaque type de widget List possède sa propre configuration.

### Issues

#### Trier par

Vous pouvez trier les problèmes par :

* Nombre d'erreurs (par défaut)
* Première occurrence
* Sessions impactées

**Remarque :** la modification de la sélection « Trier par » ne change pas les colonnes affichées. Si vous modifiez votre liste pour la trier par sessions impactées et souhaitez l'afficher dans votre widget, vous devez également sélectionner ou ajouter « Impacted Sessions » dans l'éditeur de graphique. 

### Logs

#### Grouper par

Vous pouvez grouper les logs par :

* Patterns
* Transactions

### Options de la liste des événements du RUM

#### Trier par

Pour le RUM, vous pouvez trier par : 

* Type de session
* Temps passé
* Nombre de vues
* Nombre d'erreurs
* Nombre d'actions
* Nombre de frustrations de session
* Nom de la vue initiale
* Nom de la dernière vue

Ordre croissant ou décroissant

### Événements

#### Taille du format du rapport :

Vous pouvez choisir le mode d'affichage des événements dans le widget :

* Petit (titre uniquement)
* Grand (événement complet)

### Incidents

#### Trier par

Vous pouvez trier les incidents par :

* Date de création
* Date de détection
* Date de dernière modification
* Date de résolution
* Gravité
* Statut
* Titre

Ordre croissant ou décroissant

### Déploiements CD

#### Trier par

Vous pouvez trier les déploiements CD par :

* Statut du déploiement
* Service
* Nom du déploiement
* Environnement
* Durée
* Valeur de révision
* URL du référentiel
* Timestamp

Ordre croissant ou décroissant

### Pipelines CI

#### Trier par

Vous pouvez trier les pipelines CI par :

* Statut CI
* Nom du pipeline
* Durée
* ID du pipeline
* Branche
* Timestamp

Ordre croissant ou décroissant

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/