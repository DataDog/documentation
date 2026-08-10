---
algolia:
  tags:
  - unit override
  - custom units
description: Remplacez les unités d'événements et de métriques par défaut afin de
  personnaliser l'affichage et la mise en forme de vos données dans des dashboards.
disable_toc: false
further_reading:
- link: metrics/units/
  tag: Documentation
  text: Unités des métriques
- link: logs/explorer/facets/#unites
  tag: Documentation
  text: Unités des événements
- link: dashboards/widgets/
  tag: Documentation
  text: Liste des widgets
title: Personnaliser vos visualisations avec des remplacements d'unités
---

## Présentation

La fonctionnalité de remplacement d'unité dans les visualisations permet de personnaliser la façon dont vos données sont affichées. Ce guide présente les options de configuration disponibles pour les remplacements d'unités et décrit comment celles-ci peuvent vous aider à analyser vos graphiques.

**Remarque** : un grand nombre d'exemples de ce guide reposent sur le [widget Tableau][1], mais les remplacements d'unités ne sont pas exclusifs à ce type de widget.

{{< whatsnext desc="Pour définir une unité au niveau de l'organisation, consultez la documentation suivante :">}}
    {{< nextlink href="/metrics/units">}}Définir des unités pour les métriques{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#unités">}}Définir des unités pour des requêtes basées sur des événements{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

Dans les widgets de vos dashboards et vos notebooks, accédez à l'éditeur graphique de la cellule ou du widget. Pour les notebooks, cliquez sur **More options**. Pour les dashboards, accédez à la section **Graph your data**.

{{< img src="dashboards/guide/unit_override/unit_override_config.png" alt="Option de remplacement d'unité dans la section Graph your data d'un widget Changement" style="width:100%;" >}}

## Fonctionnement de l'attribution des unités et des échelles

Lorsqu'une unité est détectée, Datadog choisit automatiquement l'échelle d'unités la plus lisible en fonction de l'ordre de grandeur de vos données. Par exemple, si les données source sont en nanosecondes, le widget peut afficher des valeurs lisibles en minutes et en secondes, plutôt qu'en millions de nanosecondes.

{{< img src="dashboards/guide/unit_override/unit_override_with_autoscale.png" alt="Widget Tableau avec des valeurs affichées en minutes et en secondes, ainsi qu'une configuration de remplacement d'unité avec l'option Autoscale Unit activée." style="width:100%;" >}}

La fonctionnalité de remplacement d'unité vous permet de choisir une échelle fixe unique pour comparer des valeurs. Dans l'exemple ci-dessous, toutes les valeurs sont configurées de façon à être exprimées en `minutes`, ce qui permet de comparer directement les valeurs à la même échelle. 

{{< img src="dashboards/guide/unit_override/unit_override_without_autoscale.png" alt="Le widget Tableau, avec des valeurs toutes exprimées en minutes, ainsi qu'une configuration de remplacement d'unité avec l'option Autoscale Unit désactivée" style="width:100%;" >}}

## Attribuer des unités personnalisées

Attribuez des unités personnalisées à un widget pour ajouter du contexte à des mesures sans unité (comme des nombres). 

{{< img src="dashboards/guide/unit_override/custom_unit_tests.png" alt="Configuration de remplacement d'unité avec le menu Unit permettant d'attribuer des unités personnalisées" style="width:100%;" >}}

Définissez des unités entièrement personnalisées qui ne sont pas incluses dans la liste d'unités fournie. Au lieu d'indiquer un nombre générique d'événements, vous pouvez par exemple spécifier que 10 000 tests ou 100 sessions sont affichés. Cela permet d'obtenir instantanément du contexte à propos des données analysées.

**Remarque** : la mise à l'échelle automatique n'est pas disponible pour les unités personnalisées, car la famille d'unités n'est pas reconnue.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/dashboards/widgets/table/