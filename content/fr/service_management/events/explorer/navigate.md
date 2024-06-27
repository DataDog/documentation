---
kind: Documentation
title: Parcourir l'Events Explorer
---

{{< img src="service_management/events/explorer/navigate.png" alt="Comment parcourir l'Events Explorer" style="width:100%;" >}}

## Présentation

L'Events Explorer affiche les événements les plus récents générés par votre infrastructure et vos services, y compris pour les déploiements de code, la santé des services, les changements de configuration et les alertes de surveillance. Par défaut, l'Events Explorer affiche différents types d'événements. Vous pouvez filtrer vos événements à l'aide des facettes ou d'une requête de recherche.

### Volet latéral des événements

Cliquez sur un événement de l'Events Explorer pour ouvrir le volet latéral de l'événement. Ce dernier contient les tags et messages associés à l'événement en question.

### Onglet Event Attributes

{{< img src="service_management/events/explorer/event-attribute.png" alt="Un exemple d'onglet Event Attributes" style="width:100%;" >}}

L'onglet Event Attributes du volet latéral répertorie les attributs de l'événement au format JSON. Cliquez sur un attribut pour l'ajouter à la requête existante, l'exclure ou ajouter une colonne pour cet attribut.

Les attributs d'événement peuvent être normalisés ou enrichis lors de l'admission, grâce à des pipelines de traitement.

## Intervalle

Le sélecteur d'intervalle détermine la plage des événements affichés dans l'Events Explorer ou dans les analyses. Il définit également l'intervalle de la chronologie sous la barre de recherche.

Pour modifier l'intervalle, sélectionnez un intervalle prédéfini depuis la liste déroulante ou saisissez un intervalle personnalisé.

Tous les paramètres de recherche sont inclus dans l'URL. Ainsi, pour partager votre vue, il vous suffit d'envoyer son URL.