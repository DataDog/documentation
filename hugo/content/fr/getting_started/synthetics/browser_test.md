---
description: Créez des tests de navigateur Datadog pour surveiller les parcours utilisateur
  sur différents appareils et navigateurs. Enregistrez des scénarios de test, configurez
  des alertes et validez des transactions commerciales.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: Introduction aux tests de navigateur Synthetic
- link: /synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests de navigateur
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Découvrir comment déclencher des tests Synthetic depuis un pipeline CI/CD
- link: /synthetics/identify_synthetics_bots
  tag: Documentation
  text: Apprendre à identifier les bots Synthetic pour les tests API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guide
  text: Exporter les tests Synthetic vers Terraform
title: Débuter avec les tests de navigateur
---
## Présentation {#overview}

Les [tests de navigateur][1] sont des scénarios que Datadog exécute sur vos applications web. Vous pouvez configurer des intervalles périodiques pour exécuter des tests depuis plusieurs emplacements, appareils et navigateurs, ainsi que les exécuter depuis vos pipelines CI/CD. Ces tests vérifient que vos utilisateurs peuvent effectuer des **transactions commerciales clés** sur vos applications et qu'ils ne sont pas affectés négativement par des changements de code récents.

## Créez un test de navigateur {#create-a-browser-test}

L'exemple ci-dessous montre la création d'un test de navigateur qui inclut les étapes d'un parcours utilisateur allant de l'ajout d'un article au panier jusqu'à la validation du paiement. 

### Configurez les détails de votre test {#configure-your-test-details}

1. Sur le site Datadog, survolez {{< ui >}}Digital Experience{{< /ui >}} dans le menu de gauche et sélectionnez [{{< ui >}}Tests{{< /ui >}}][2] (sous {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}).
2. Dans le coin supérieur droit, cliquez sur {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Browser Test{{< /ui >}}][3].

Vous pouvez créer un test en utilisant l'une des options suivantes :

- **Créer un test à partir d'un modèle** :

    1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : Détails du test, Conditions d'alerte, Étapes et, éventuellement, Variables.
    2. Cliquez sur {{< ui >}}\+ Create Test{{< /ui >}} pour ouvrir la page de configuration, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
    3. Cliquez sur {{< ui >}}Save & Quit{{< /ui >}} dans le coin supérieur droit pour soumettre votre test de navigateur.<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Vidéo de la page d'accueil de test de navigateur Synthetics avec des modèles" video="true" >}}

- **Créer un test à partir de zéro** :

    1. Cliquez sur le modèle {{< ui >}}\+{{< /ui >}} pour démarrer un nouveau test de navigateur à partir de zéro.
    1. Ajoutez l'URL du site web que vous souhaitez surveiller. Si vous ne savez pas par où commencer, vous pouvez utiliser `https://www.shopist.io`, une application web de commerce électronique de test.
    2. Sélectionnez {{< ui >}}Advanced Options{{< /ui >}} pour définir des options de requête personnalisées, des certificats, des identifiants d'authentification, et plus encore. 
    3. Nommez votre test et ajoutez-lui des tags tels que `env:prod` et `app:shopist`. Les tags vous permettent de garder votre collection de tests organisée et de trouver rapidement les tests qui vous intéressent sur la page d'accueil.
    4. Choisissez les navigateurs et les appareils avec lesquels vous souhaitez effectuer des tests. 
    5. Cliquez sur {{< ui >}}Save & Edit Recording{{< /ui >}} pour soumettre votre test de navigateur.

### Sélectionnez des emplacements {#select-locations}

Sélectionnez un ou plusieurs {{< ui >}}Managed Locations{{< /ui >}} ou {{< ui >}}Private Locations{{< /ui >}} depuis lesquels exécuter votre test.

Les emplacements gérés vous permettent de tester des sites web et des endpoints accessibles au public. Pour tester des applications internes ou simuler le comportement d'utilisateurs dans des régions géographiques distinctes, utilisez plutôt des [emplacements privés][4].

L'application Shopist est accessible publiquement à `https://www.shopist.io/`, vous pouvez donc choisir n'importe quel emplacement géré pour exécuter votre test.

### Spécifiez la fréquence du test {#specify-test-frequency}

Sélectionnez la fréquence à laquelle vous souhaitez que votre test s'exécute. Vous pouvez conserver la fréquence par défaut de 1 heure.

Vous pouvez non seulement planifier l'exécution de votre test Synthetic, mais également le déclencher manuellement, ou directement depuis vos [pipelines CI/CD][5].

### Définir les conditions d'alerte {#define-alert-conditions}

Vous pouvez définir des conditions d'alerte afin de veiller à ce que votre test n'échoue pas en cas d'erreur réseau isolée. Ainsi, vous recevez uniquement des alertes lorsque votre application rencontre un réel problème.

Vous pouvez spécifier le nombre d'échecs consécutifs avant qu'un emplacement ne soit considéré comme défaillant :

```text
Retry test 2 times after 300 ms in case of failure
```

Vous pouvez également configurer votre test pour qu'il ne déclenche une notification que lorsque votre application est hors service pendant une certaine durée et un certain nombre d'emplacements. Dans l'exemple ci-dessous, la règle d'alerte est configurée pour envoyer une notification si le test échoue pendant trois minutes sur deux emplacements différents :

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configurer le monitor de test {#configure-the-test-monitor}

Utilisez cette section pour créer le **message** que vous souhaitez envoyer avec la notification. La notification inclut votre message personnalisé et des détails sur les emplacements en échec. Des messages de monitor pré-remplis sont inclus dans le corps du message :

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Section du monitor Synthetic Monitoring, mettant en évidence les messages de monitor pré-remplis" style="width:100%;" >}}

Par exemple, le message de monitor suivant crée un monitor qui itère sur des étapes et extrait des variables pour des tests de navigateur :

   ```text
   {{! Lister les variables extraites de toutes les étapes réussies }}
   # Variables extraites
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nom** : `{{extractedValue.name}}`
   **Valeur :** {{#if extractedValue.secure}}*Obfusqué (valeur masquée)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][8].

## Create recording 

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][9] Chrome extension. (This Chrome extension can also be installed on a Microsoft Edge browser)

Once you have installed the extension, click {{< ui >}}Start Recording{{< /ui >}} to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click {{< ui >}}Stop Recording{{< /ui >}}.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as {{< ui >}}Chairs{{< /ui >}} and select {{< ui >}}Add to cart{{< /ui >}}.
2. Click on {{< ui >}}Cart{{< /ui >}} and {{< ui >}}Checkout{{< /ui >}}.
3. Under {{< ui >}}Add New{{< /ui >}}, select {{< ui >}}Assertion{{< /ui >}} and click {{< ui >}}"Test that some text is present on the active page"{{< /ui >}}.
4. To confirm that the words "Thank you!" appear after checking out, enter `Thank you!` in the {{< ui >}}Value{{< /ui >}} field. 
5. Press {{< ui >}}Save & Quit{{< /ui >}}.

It is important to finish your browser test with an {{< ui >}}Assertion{{< /ui >}} to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Enregistrez les étapes du test" video="true" >}}

Le site web exemple génère régulièrement une erreur, ce qui le fait échouer intentionnellement. Si vous incluez votre adresse e-mail dans le champ {{< ui >}}Configure the monitor for this test{{< /ui >}}, vous recevez une notification par e-mail lorsque le test échoue et se rétablit.

## Consultez les résultats de test {#look-at-test-results}

La page de détails {{< ui >}}Browser Test{{< /ui >}} affiche une vue d'ensemble de la configuration de votre test, le temps de disponibilité global et par emplacement, des graphiques sur le temps d'interactivité et la durée de test, des exemples de résultats de test réussis et échoués, ainsi que la liste de tous les résultats de test. Selon la durée de votre test, vous devrez peut-être attendre quelques minutes pour voir arriver les premiers résultats de test.

Pour dépanner un [test ayant échoué][10], examinez les échecs dans l'onglet **Activité** ou l'onglet **Exécutions de test**. Sélectionnez une alerte dans la chronologie pour voir un **Que s'est-il passé&nbsp;?** Résumé décrivant l'étape en échec et le message d'erreur. Depuis le panneau **Étapes suivantes**, vous pouvez enquêter avec Bits Investigation, voir le rétablissement, suspendre la planification ou déclarer un incident. Vous pouvez également examiner les [{{< ui >}}Errors & Warnings{{< /ui >}}][11], [{{< ui >}}Resources{{< /ui >}}][12] et [{{< ui >}}Core Web Vitals{{< /ui >}}][13] potentiels pour diagnostiquer le problème.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="Page de détails du test de navigateur affichant l'onglet Activité avec une chronologie des alertes, un résumé des échecs et un panneau Étapes suivantes" style="width:100%;">}}

Utilisez l'[intégration APM avec Synthetic Monitoring][14] de Datadog pour afficher les traces générées depuis votre backend par les exécutions de test depuis l'onglet {{< ui >}}Traces{{< /ui >}}.

### Lancez Bits Investigation {#launch-a-bits-investigation}

Pour identifier la cause première d'un test de navigateur Synthetic en échec, lancez une [Bits Investigation][15]. Bits Investigation analyse les résultats de test, les traces, les logs et les métriques pour faire ressortir une cause première et signaler si l'échec est dû à une régression ou à une mauvaise configuration.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /fr/getting_started/synthetics/private_location
[5]: /fr/continuous_testing/cicd_integrations
[6]: /fr/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /fr/monitors/types/synthetic_monitoring/
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /fr/synthetics/browser_tests/test_results#test-failure
[11]: /fr/synthetics/browser_tests/test_results#errors
[12]: /fr/synthetics/browser_tests/test_results#resources
[13]: /fr/synthetics/browser_tests/test_results#test-performance
[14]: /fr/synthetics/apm/
[15]: /fr/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page