---
aliases:
- /fr/continuous_integration/guides/rum_swift_integration
- /fr/continuous_integration/integrate_tests/swift_tests
- /fr/database_monitoring/setup_postgres/
description: Découvrez comment utiliser CI Visibility et RUM pour associer les résultats
  de vos tests Swift aux sessions Browser et aux replays.
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: En savoir plus sur Test Visibility
- link: /real_user_monitoring/ios
  tag: Documentation
  text: En savoir plus sur la surveillance iOS et tvOS avec RUM
kind: documentation
title: Instrumenter vos tests Swift avec RUM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Assurez-vous que [Test Visibility][3] est déjà configuré pour Swift.

### Compatibilité

L'intégration CI Visibility/RUM fonctionne avec les versions suivantes de `dd-sdk-swift-testing` et de `dd-sdk-ios` :

* `dd-sdk-swift-testing` 2.0.0+
* `dd-sdk-ios` 1.10.0+

## Associer des tests Swift à RUM

Si vous liez `dd-sdk-swift-testing` pour vos tests d'interface utilisateur et que l'application testée est instrumentée avec le service [Real User Monitoring][1], les résultats de vos tests ainsi que les sessions Browser RUM et les replays générés sont automatiquement associés.

Un onglet **RUM Sessions** s'affiche dans le volet latéral des détails des tests de Test Visibility.

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Onglet RUM Sessions dans les détails d'un test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][2]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests iOS, en étudiant par exemple le nom d'utilisateur ou les erreurs inattendues.

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Volet Errors de l'onglet RUM Sessions dans les détails d'un test" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/ios/
[2]: /fr/real_user_monitoring/ios/data_collected/
[3]: /fr/continuous_integration/tests/swift/