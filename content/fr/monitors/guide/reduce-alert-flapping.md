---
aliases:
- /fr/monitors/faq/how-do-i-reduce-alert-flapping-noise
further_reading:
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor

title: Limiter le bagottement des alertes
---

L'envoi d'un trop grand nombre d'alertes peut nuire à votre productivité, notamment en cas de bagotement (changement rapide d'un statut normal à un statut d'alerte et inversement).

Pour les alertes Datadog individuelles générées par les groupes, le [cumul des notifications][1] est activé par défaut. Néanmoins, il existe d'autres fonctionnalités Datadog vous permettant de réduire les alertes superflues et d'améliorer leur pertinence.

* Réévaluer la valeur du seuil d'alerte
    * Lorsqu'un statut alterne régulièrement entre une alerte et un état normal, la solution la plus simple pour réduire le bagotement consiste à revoir à la hausse ou à la baisse la condition du seuil.
* Utiliser le seuil `min`
    * Cette condition déclenche l'alerte uniquement lorsque tous les points de données d'une métrique dépassent le seuil sur l'intervalle observé.

* Affiner la requête à l'aide de fonctions, comme des taux, des moyennes mobiles ou des différentiels temporels
    * Vous pouvez ainsi comparer l'écart encore les valeurs du flux d'une métrique et les valeurs observées une semaine plus tôt, et vous baser sur cet écart pour définir les conditions d'alerte
    * Un différentiel temporel vous permet de combiner plusieurs fonctions et de générer une vue historique. Exemple :
 abs(system.cpu.system{*} - week_before(system.cpu.system{*}))
    * Si votre métrique enregistre des pics fréquents qui ne dénotent pas forcément un problème précis, appliquez un taux ou une moyenne pour améliorer la pertinence de votre seuil.

* Tenir compte des états d'autres monitors grâce aux alertes composites
    * Les alertes composites, qui ont récemment été ajoutées aux fonctionnalités d'alerte, vous permettent de combiner plusieurs alertes existantes.
    Par exemple, vous pouvez déclencher une alerte lorsque la charge CPU ET la charge disque sont élevées sur un host.

* Utiliser les modules intégrés d'analyse des anomalies ou des singularités
    * La fonctionnalité de [détection des anomalies][2] repose sur des analyses saisonnières afin de générer une alerte lorsqu'un flux de données n'est pas cohérent avec les comportements historiques.
    * La fonctionnalité de [détection des singularités][3] analyse d'autres flux de données avec le même contexte afin de générer une alerte lorsque le comportement d'un flux est sensiblement différent par rapport à celui de flux semblables.
    * Vous pouvez utiliser ces deux fonctionnalités conjointement aux alertes composites.

Si vous rencontrez un problème d'acheminement des alertes, songez à utiliser des [template variables][4] et à séparer les états d'**avertissement** et d'**alerte** avec des [variables conditionnelles][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/alert-rollup
[2]: /fr/monitors/types/anomaly/
[3]: /fr/monitors/types/outlier/
[4]: /fr/monitors/notify/variables/?tab=is_alert#template-variables
[5]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables