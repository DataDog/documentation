---
kind: guide
title: Instrumenter vos tests Swift avec RUM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Compatibilité

L'intégration CI Visibility/RUM fonctionne uniquement avec les versions suivantes de `dd-sdk-swift-testing` et de `dd-sdk-ios` :

* `dd-sdk-swift-testing` 2.0.0+
* `dd-sdk-ios` 1.10.0+

### Tests Swift et RUM

Si vous liez dd-sdk-swift-testing pour vos tests UI et que l'application testée est instrumentée avec [RUM][1], les résultats de vos tests ainsi que les sessions Browser RUM et les replays générés sont automatiquement associés. Un nouvel onglet **RUM Sessions** s'affiche dans le volet latéral des détails des tests :

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Onglet RUM Sessions dans les détails d'un test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][2]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests iOS, en étudiant par exemple le nom d'utilisateur ou les erreurs inattendues :

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Volet Errors de l'onglet RUM Sessions dans les détails d'un test" style="width:100%;">}}

[1]: /fr/real_user_monitoring/ios/
[2]: /fr/real_user_monitoring/ios/data_collected/