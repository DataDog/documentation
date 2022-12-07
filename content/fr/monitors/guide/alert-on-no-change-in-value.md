---
aliases:
- /fr/monitors/faq/how-can-i-configure-a-metric-monitor-to-alert-on-no-change-in-value
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
kind: guide
title: Alerte en cas d'absence de changement d'une valeur
---

Pour déclencher une alerte lorsque la valeur d'une métrique ne change pas au cours d'une période donnée, commencez par utiliser une fonction `diff()` sur votre requête. Vous obtiendrez ainsi les valeurs delta des points de données consécutifs.

* `diff(avg:system.mem.free{*})`

Appliquez ensuite la fonction abs() pour obtenir la valeur absolue de ces deltas.

* `abs(diff(avg:system.mem.free{*}))`

Ces fonctions peuvent être appliquées à votre requête dans l'interface, via le bouton +.

{{< img src="monitors/faq/new_query_ui_monitors.png" alt="new_query_ui_monitors"  >}}

Vous pouvez également saisir manuellement une requête complexe depuis l'interface de modification de monitor de l'onglet Source (ou l'appliquer par programmation via l'[API][1] (voir l'image ci-dessous).

Pour configurer les [conditions d'alerte][2] du monitor de métrique suivez les étapes suivantes :

* Sélectionnez Treshold Alert.
* Définissez l'option  Trigger when the metric is sur **below** ou **equal to**.
* Définissez le champ Alert Threshold sur 0 (zéro).

Cette configuration déclenchera un événement d'alerte si la valeur n'enregistre aucun changement au cours de l'intervalle sélectionné.

D'autres [conditions et options d'alerte][2] peuvent être définies selon vos préférences. Voici un exemple de configuration du monitor depuis l'interface :

{{< img src="monitors/faq/zero_alert.png" alt="zero_alert"  >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/
[2]: /fr/monitors/create/configuration/