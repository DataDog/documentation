---
kind: guide
title: Instrumenter vos tests Browser avec RUM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Compatibilité

L'intégration CI Visibility/RUM fonctionne uniquement avec les versions suivantes de `cypress`, `dd-trace-js` et `browser-sdk` :

* `cypress` 6.7.0+
* `dd-trace-js` 1.7.0+
* `browser-sdk` 3.11.0+

**Remarque** : à l'heure actuelle, seul `cypress` est pris en charge par cette intégration.

### Tests Browser et RUM

Si vous utilisez Cypress pour vos tests Browser et que l'application testée est instrumentée avec [RUM][1], les résultats de vos tests ainsi que les sessions Browser RUM et les replays générés sont automatiquement associés. Un nouvel onglet **Browser Sessions** s'affiche dans le volet latéral des détails des tests :

{{< img src="ci/ci-browser-session-tab.png" alt="Onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][2]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests Browser, en étudiant par exemple les erreurs inattendues :

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Volet Errors de l'onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

[1]: /fr/real_user_monitoring/browser/
[2]: /fr/real_user_monitoring/browser/data_collected/