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
title: Instrumenter vos tests Browser avec RUM
---

## Présentation

Test Visibility peut être intégré à la fonctionnalité [Real User Monitoring][2] de Datadog afin de vous offrir les outils dont vous avez besoin pour analyser en profondeur vos tests Browser.

### Compatibilité

Pour activer l'intégration RUM, assurez-vous que la fonctionnalité [Test Visibility][1] est configurée pour vos tests et que l'application testée a été instrumentée avec [RUM][2].

L'intégration RUM est compatible avec les tests Browser Cypress et Selenium.

#### Cypress

* `cypress` 6.7.0+
* `dd-trace-js` 1.7.0+
* `browser-sdk` 3.11.0+

#### Selenium

* `selenium-js` 4.11.0+, `dd-trace-js` 5.11.0+ / 4.35.0+
* `selenium-java` 3.141.59+, `dd-trace-java` 1.34.0+
* `selenium-dotnet` 3.0.0+, `dd-trace-dotnet` 2.51.0+
* `selenium-ruby` 4.0.0+, `datadog-ci` 1.0.0.beta6+
* `browser-sdk` 5.15.0+

<blockquote class="alert alert-info">
Depuis la version 5.0.0 du SDK Browser, vous devez activer le paramètre d'initialisation `allowUntrustedEvents` pendant l'exécution de vos tests pour enregistrer correctement les clics.
</blockquote>

## Associer les tests Browser et RUM

Si vous utilisez Cypress ou Selenium pour exécuter vos tests Browser et que l'application testée est instrumentée avec le service [Real User Monitoring][2], les résultats de vos tests ainsi que les sessions Browser RUM et les replays générés sont automatiquement associés.

Un onglet **Browser Sessions** s'affiche dans le volet latéral des détails des tests de Test Visibility.

{{< img src="ci/ci-browser-session-tab.png" alt="Onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][3]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests Browser, en étudiant par exemple les erreurs inattendues.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Volet Errors de l'onglet Browser Sessions dans les détails d'un test" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/setup/
[2]: /fr/real_user_monitoring/browser/
[3]: /fr/real_user_monitoring/browser/data_collected/