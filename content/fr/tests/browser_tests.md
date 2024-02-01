---
aliases:
- /fr/continuous_integration/guides/rum_integration
- /fr/continuous_integration/integrate_tests/browser_tests
- /fr/continuous_integration/tests/browser_tests
description: Découvrez comment utiliser CI Visibility et RUM pour associer les résultats
  de vos tests aux sessions Browser et aux replays.
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: En savoir plus sur Test Visibility
- link: /real_user_monitoring/browser
  tag: Documentation
  text: En savoir plus sur la surveillance Browser RUM
kind: documentation
title: Instrumenter vos tests Browser avec RUM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Assurez-vous que [Test Visibility][1] est déjà configuré pour Cypress.

### Compatibilité

L'intégration CI Visibility/RUM fonctionne uniquement avec les versions suivantes de `cypress`, `dd-trace-js` et `browser-sdk` :

* `cypress` 6.7.0+
* `dd-trace-js` 1.7.0+
* `browser-sdk` 3.11.0+

À l'heure actuelle, seul `cypress` est pris en charge par cette intégration.

<blockquote class="alert alert-info">
Depuis la version 5.0.0 du SDK Browser, vous devez activer le paramètre d'initialisation `allowUntrustedEvents` pendant l'exécution de vos tests Cypress pour enregistrer correctement les clics.
</blockquote>

## Associer les tests Browser et RUM

Si vous utilisez Cypress pour exécuter vos tests Browser et que l'application testée est instrumentée avec le service [Real User Monitoring][2], les résultats de vos tests ainsi que les sessions Browser RUM et les replays générés sont automatiquement associés.

Un onglet **Browser Sessions** s'affiche dans le volet latéral des détails des tests de Test Visibility.

{{< img src="ci/ci-browser-session-tab.png" alt="Onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][3]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests Browser, en étudiant par exemple les erreurs inattendues.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Volet Errors de l'onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/setup/javascript/?tab=cypress#instrument-your-tests
[2]: /fr/real_user_monitoring/browser/
[3]: /fr/real_user_monitoring/browser/data_collected/