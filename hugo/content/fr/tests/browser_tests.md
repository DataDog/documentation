---
aliases:
- /fr/continuous_integration/guides/rum_integration
- /fr/continuous_integration/integrate_tests/browser_tests
- /fr/continuous_integration/tests/browser_tests
description: Découvrez comment utiliser CI Visibility et RUM pour associer les résultats
  de vos tests aux sessions de navigateur et aux Session Replays.
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
- link: /real_user_monitoring/application_monitoring/browser
  tag: Documentation
  text: En savoir plus sur RUM Browser Monitoring
title: Instrumenter vos tests de navigateur avec RUM
---
## Présentation {#overview}

Test Optimization s'intègre à Datadog [Real User Monitoring][2] pour vous fournir les outils nécessaires à une analyse approfondie de vos tests de navigateur.

### Compatibilité {#compatibility}

Pour activer l'intégration RUM, assurez-vous que [Test Optimization][1] est configuré pour vos tests et que l'application testée est instrumentée à l'aide de [RUM][2].

L'intégration RUM est prise en charge pour les tests de navigateur pilotés par Cypress, Playwright, WebdriverIO et Selenium.

#### Cypress {#cypress}

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium {#selenium}

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

#### Playwright {#playwright}

* `playwright` >= 1.38.0
* `dd-trace-js` >= 5.46.0
* `browser-sdk` >= 5.15.0

#### WebdriverIO {#webdriverio}

* `webdriverio` >= 9.0.0 avec l'adaptateur de framework Mocha ou Jasmine
* `dd-trace-js` >= 5.125.0 sur la ligne de version v5, ou >= 6.14.0 sur la ligne de version v6
* `browser-sdk` >= 5.15.0

L'intégration RUM nécessite une session de navigateur WebDriver BiDi.

<div class="alert alert-info">
À partir de Browser SDK v5.0.0, activez le <code>allowUntrustedEvents</code> paramètre d'initialisation pendant les tests pour capturer correctement les clics.
</div>

## Connectez les tests de navigateur à RUM {#connect-browser-tests-and-rum}

Si vous utilisez Cypress, Playwright, WebdriverIO ou Selenium pour exécuter vos tests de navigateur et que l'application testée est instrumentée à l'aide de [Real User Monitoring][2], vos résultats de test ainsi que leurs sessions de navigateur RUM et leurs relectures de session générées sont automatiquement liés.

Si un test se termine avant que les données de sa session RUM ne soient transmises, la session et le test peuvent apparaître comme non liés. Pour laisser plus de temps à la transmission des données de la session, définissez la variable d'environnement `DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS` sur une valeur supérieure à la valeur par défaut de 500 millisecondes.

Un onglet {{< ui >}}Browser Sessions{{< /ui >}} apparaît dans le panneau latéral des détails d'un test dans Test Optimization.

{{< img src="ci/ci-browser-session-tab.png" alt="Onglet Browser Session dans les détails du test" style="width:100%;">}}

La session RUM inclut toutes les [données recueillies en temps normal par RUM][3]. Vous pouvez donc procéder au debugging des problèmes potentiels dans vos tests de navigateur, en étudiant par exemple les erreurs inattendues.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Erreurs de l'onglet Browser Session dans les détails du test" style="width:100%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/setup/
[2]: /fr/real_user_monitoring/application_monitoring/browser/
[3]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/