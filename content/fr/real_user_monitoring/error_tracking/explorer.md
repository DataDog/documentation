---
title: Explorateur de suivi des erreurs RUM
kind: documentation
beta: true
---
{{< img src="real_user_monitoring/error_tracking/explorer.png" alt="Explorateur de suivi des erreurs"  >}}

## Explorer vos problèmes

L'Explorateur de suivi des erreurs vous permet d'explorer vos différents problèmes dans Datadog. Un problème est un groupe d'erreurs similaires liées au même bug. Les problèmes sont automatiquement créés en calculant une empreinte pour chaque erreur à l'aide de certains de ses attributs, tels que le type d'erreur, le message d'erreur ou la stack trace. Les erreurs qui partagent la même empreinte sont regroupées dans le même problème.

Chaque élément répertorié dans l'Explorateur correspond à un problème et affiche des informations générales sur l'erreur :

-   Le type d'erreur et le message d'erreur
-   Le chemin d'accès au fichier dans lequel les erreurs sous-jacentes se sont déclenchées
-   Informations importantes sur le cycle de vie du problème :
    -   Première et dernière détection
    -   Graphique des occurrences au fil du temps
    -   Nombre d'occurrences au cours de la période sélectionnée

### Intervalle

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Intervalle de suivi des erreurs"  >}}

L'intervalle s'affiche en haut à droite de l'Explorateur sous forme de chronologie. Cette fonction vous permet d'afficher les problèmes pour lesquels des erreurs ont été détectées au cours de la période sélectionnée. Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante.

### Facettes

{{< img src="real_user_monitoring/error_tracking/facet.png" alt="Facettes de suivi des erreurs"  >}}

La fonctionnalité Suivi des erreurs indexe automatiquement une liste prédéfinie d'attributs à partir de vos problèmes puis les utilise pour générer des facettes. Les facettes permettent d'afficher tous les membres distincts d'un attribut pour la période sélectionnée, en plus de proposer des analyses de base, comme le nombre de problèmes représentés. Elles vous donnent également la possibilité de faire pivoter ou de filtrer vos problèmes en fonction d'un attribut donné.

## Inspecter un problème

Cliquez sur un problème pour l'examiner plus en détail dans un volet dédié.

{{< img src="real_user_monitoring/error_tracking/issue_panel_upper_part.png" alt="Partie supérieure du volet des détails d'un problème"  >}}

Les principales informations dont vous avez besoin pour dépanner un problème se trouvent dans la partie supérieure du volet. Elles vous permettent de comprendre son cycle de vie : première et dernière occurrence, nombre total d'occurrences et évolution du nombre d'occurrences au fil du temps.

{{< img src="real_user_monitoring/error_tracking/issue_panel_lower_part.png" alt="Partie inférieure du volet des détails d'un problème"  >}}

La partie inférieure du volet vous permet de parcourir des exemples d'erreur pour le problème concerné. Chaque exemple d'erreur vous donne des informations utiles au dépannage du problème, par exemple :

-   La stack trace, où chaque stack frame fournit un extrait de code mettant en évidence la ligne de code à l'origine de l'erreur.
-   Informations sur la session RUM au cours de laquelle l'erreur s'est produite, si elles sont effectivement recueillies par le SDK RUM.
-   Informations sur l'utilisateur, par exemple sur son navigateur ou son système d'exploitation avec les versions correspondantes qui étaient utilisées lorsque l'erreur s'est produite.

## Recevoir une alerte en cas de nouvelle erreur

En étant informé d'un nouveau problème dès qu'il se présente, vous avez la possibilité de l'identifier et de le résoudre de manière proactive avant qu'il ne devienne critique. Le suivi des erreurs génère un [événement Datadog][1] dès qu'un problème est détecté pour la première fois dans un service et un environnement donnés, vous permettant ainsi de recevoir des alertes en configurant des [monitors d'événements][2].

Chaque événement généré reçoit automatiquement les tags de version, de service et d'environnement pour vous permettre de contrôler avec précision les problèmes pour lesquels vous souhaitez recevoir une alerte. Vous pouvez exporter votre requête de recherche directement depuis l'explorateur afin de créer un monitor d'événement correspondant :

{{< img src="real_user_monitoring/error_tracking/export_search_query_to_monitor.gif" alt="Exporter vers un monitor depuis le suivi des erreurs"  >}}


[1]: /fr/events
[2]: /fr/monitors/monitor_types/event/