---
aliases:
- /fr/service_management/case_management/projects/
- /fr/incident_response/case_management/projects/
disable_toc: false
further_reading:
- link: incident_response/work_management/create_work_item
  tag: Documentation
  text: Créer un élément de travail
title: Projets
---
## Vue d'ensemble {#overview}

Un projet est un objet conteneur qui contient un ensemble d'éléments de travail. Organisez votre travail autour des groupes qui ont du sens pour votre organisation, qu'il s'agisse d'équipes, de services ou d'initiatives. Les éléments de travail de chaque projet sont isolés les uns des autres, ce qui vous aide à vous concentrer sur ce qui est pertinent.

## Créer un projet {#create-a-project}

Pour créer un projet :
1. Sélectionnez **New Project** dans la vue Projects ou cliquez sur l'icône **+** à côté de *Your Projects* dans la barre de navigation de gauche.
1. Saisissez un nom de projet et une clé. Les clés de projet doivent comporter entre un et 10 caractères. Les numéros d'identification des éléments de travail sont précédés d'une combinaison de lettres, par exemple, `NOC-123`. Les clés de projet sont immuables.
1. Cliquez sur **Create Project**.

## Supprimer un projet {#delete-a-project}

<div class="alert alert-danger">Les éléments de travail supprimés ne peuvent pas être récupérés.</div>

Vous pouvez supprimer un projet depuis la page Settings d'un projet.

La suppression d'un projet supprime également tous les éléments de travail qu'il contient. Si vous souhaitez conserver des éléments de travail, Datadog recommande de les déplacer vers un autre projet avant la suppression.

La suppression d'un projet désactive automatiquement tous les modèles de corrélation d'événements liés au projet. D'autres automatisations, telles que la création d'éléments de travail via les Workflows Datadog ou les mentions de monitor `@case`, sont également interrompues lorsque vous supprimez le projet lié.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}