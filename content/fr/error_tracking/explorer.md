---
description: En savoir plus sur l'Error Tracking Explorer
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: En savoir plus sur les monitors de suivi des erreurs
kind: documentation
title: Error Tracking Explorer
---

## Présentation

{{< img src="error_tracking/error-tracking-overview.png" alt="Les détails dʼun problème dans lʼError Tracking Explorer" style="width:100%;" >}}

L'Explorateur de suivi des erreurs vous permet d'afficher, de filtrer et d'analyser des problèmes dans Datadog. Un problème est un groupe d'erreurs similaires liées au même bug. Les problèmes sont automatiquement créés en calculant une empreinte pour chaque erreur à l'aide de certains de ses attributs, tels que le type d'erreur, le message d'erreur ou la stack trace. Les erreurs qui partagent la même empreinte sont regroupées dans le même problème.

## Explorer vos problèmes

Chaque élément répertorié dans l'Error Tracking Explorer correspond à un problème et affiche des informations générales sur l'erreur, comme par exemple :

-   Le type d'erreur et le message d'erreur
-   Le chemin d'accès au fichier dans lequel les erreurs sous-jacentes se sont déclenchées
-   Les informations importantes sur le cycle de vie de l'erreur :
    -   Première et dernière détection
    -   Graphique des occurrences au fil du temps
    -   Nombre d'occurrences au cours de la période sélectionnée

### Intervalle

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Intervalle de suivi des erreurs" style="width:80%;" >}}

L'intervalle s'affiche en haut à droite de l'Explorateur sous forme de chronologie. Cette fonction vous permet d'afficher les problèmes pour lesquels des erreurs ont été détectées au cours de la période sélectionnée. Sélectionnez une durée prédéfinie dans la liste déroulante pour modifier l'intervalle.

### Facettes

{{< img src="real_user_monitoring/error_tracking/facets_panel.png" alt="Facettes du suivi des erreurs" style="width:100%;" >}}

La fonctionnalité Suivi des erreurs indexe automatiquement une liste prédéfinie d'attributs à partir de vos problèmes puis les utilise pour générer des facettes. Les facettes permettent d'afficher tous les membres distincts d'un attribut pour la période sélectionnée, en plus de proposer des analyses de base, comme le nombre de problèmes représentés. Elles vous donnent également la possibilité de faire pivoter ou de filtrer vos problèmes en fonction d'un attribut donné.

## Enquêter sur un problème

Cliquez sur un problème pour l'examiner plus en détail dans un volet dédié.

{{< img src="real_user_monitoring/error_tracking/issue_summary.png" alt="Le haut du volet relatif aux problèmes du suivi des erreurs proposant une vue résumée du problème" style="width:80%;" >}}

Les principales informations dont vous avez besoin pour dépanner un problème se trouvent dans la partie supérieure du volet. Elles vous permettent de comprendre son cycle de vie : première et dernière occurrence, nombre total d'occurrences et évolution du nombre d'occurrences au fil du temps.

{{< img src="real_user_monitoring/error_tracking/error_sample.png" alt="Le bas du volet relatif aux problèmes du suivi des erreurs proposant des exemples d'erreurs" style="width:80%;" >}}

Les informations affichées dans le volet relatif aux problèmes varient en fonction de la source de l'erreur. Par exemple, un problème créé à partir d'erreurs de l'APM affiche les tags de span de l'erreur, comme le nom de la ressource ou de l'opération, avec un accès direct à la trace ou aux logs associés.

La partie inférieure du volet vous permet de parcourir des exemples d'erreur pour le problème concerné. Chaque exemple d'erreur vous donne des informations de dépannage , comme la stack trace de l'erreur et les caractéristiques des utilisateurs affectés.

## Recevoir une alerte en cas de nouvelle erreur

En étant informé d'un nouveau problème dès qu'il se présente, vous avez la possibilité de l'identifier et de le résoudre de manière proactive avant qu'il ne devienne critique. Le suivi des erreurs génère un [événement Datadog][1] dès qu'un problème est détecté pour la première fois dans un service et un environnement donnés, vous permettant ainsi de recevoir des alertes en configurant des [monitors d'événements][2].

Chaque événement généré reçoit automatiquement les tags de version, de service et d'environnement pour vous permettre de contrôler avec précision les problèmes pour lesquels vous souhaitez recevoir une alerte. Vous pouvez exporter votre requête de recherche directement depuis l'explorateur afin de créer un monitor d'événement correspondant :

{{< img src="real_user_monitoring/error_tracking/export_to_monitor.mp4" alt="Exporter votre requête de recherche vers un monitor du suivi des erreurs" video=true >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events
[2]: /fr/monitors/types/event/