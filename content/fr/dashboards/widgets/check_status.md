---
aliases:
- /fr/graphing/widgets/check_status/
description: Représentez graphiquement le statut actuel ou le nombre de résultats
  associés à n'importe quel check réalisé.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Statut de check
---

Le widget Statut de check affiche le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé :

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Widget Statut de check" >}}

## Configuration

{{< img src="dashboards/widgets/check_status/check_status_setup.png" alt="Configuration du widget Statut de check" style="width:80%;">}}

### Configuration

1. Sélectionnez un check de service précédemment créé.
2. Choisissez un intervalle de transmission. Cet intervalle est toujours basé sur l'heure actuelle. Vous pouvez donc choisir une option comme `The past 10 minutes` (les 10 dernières minutes) ou `The past 1 day` (le dernier jour) pour afficher un statut pour cet intervalle. Si vous choisissez l'option `Global Time`, l'utilisateur du dashboard peut sélectionner une plage à l'aide du sélecteur temporel en haut à droite, mais _celle-ci doit également être basée sur l'heure actuelle_ (par exemple, les X dernières heures ou les X derniers jours), sans quoi le widget n'affiche aucune donnée.
3. Sélectionnez votre contexte :
    * **A single check** : sélectionnez cette option si votre widget Statut de check est dédié à un élément en particulier, par exemple `host:<HOSTNAME>` ou `service:<NOM_SERVICE>`.
    * **A cluster of checks** : sélectionnez cette option si votre widget Statut de check est dédié à un ensemble d'éléments, par exemple à l'ensemble des `host` ou des `service`.

4. Terminez ensuite de définir le contexte de votre widget Statut de check en renseignant le champ **Reported by**.
5. Facultatif : regroupez vos résultats de check en fonction d'une clé de tag personnalisée.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Statut de check est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/