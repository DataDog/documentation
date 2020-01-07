---
title: Débuter avec les tests API
kind: documentation
further_reading:
  - link: /synthetics/api_tests
    tag: Documentation
    text: En savoir plus sur les tests API
  - link: /synthetics/identify_synthetics_bots
    tag: Documentation
    text: Apprendre à identifier les bots Synthetics pour les tests API
  - link: /synthetics/settings/
    tag: Documentation
    text: Configurer les paramètres Synthetics avancés
---
## Créer un test API

Les [tests API][1] vous permettent de surveiller vos endpoints d'API et de recevoir des alertes en cas d'échec ou de lenteur excessive. Ces checks vérifient que vos applications répondent aux requêtes et respectent les conditions que vous avez définies, comme le temps de réponse, le code de statut HTTP, ainsi que les contenus de l'en-tête et du corps de message. Utilisez l'[API Datadog][2] pour voir la liste complète.

Dans cet exemple, un test API est créé pour vérifier que votre site reste toujours disponible et qu'il répond aux requêtes dans les délais impartis.

### Configurer la requête

1. Dans l'application Datadog, passez votre curseur sur l'option **[UX Monitoring][3]** du menu de gauche et sélectionnez **Synthetics Test**.
2. Cliquez sur le bouton **New Test** en haut à droite.
3. Sélectionnez **API test**.
4. Définissez la configuration de votre test API :
    - Ajoutez l'URL du site que vous souhaitez surveiller. Si vous ne savez pas quel site utiliser, faites un test avec l'application Web `https://www.shopist.io`.
    - Sélectionnez **Advanced Options** pour personnaliser les en-têtes, les identifiants d'authentification, le contenu du corps ou les cookies de la requête.
    - Ajoutez des tags pour organiser et filtrer vos tests plus facilement.
    - Sélectionnez les localisations à tester.
    - Cliquez sur le bouton **Test URL**.

{{< img src="getting_started/synthetics/api-test-config.png" alt="Configuration d'un test API"  style="width:60%;">}}

#### Définir vos conditions d'alerte

Si vous n'avez pas encore créé d'[assertions][4], des assertions sont automatiquement ajoutées une fois le test terminé. Chaque test API doit comprendre au moins une assertion gérée par Datadog. Une assertion est définie par un paramètre, une propriété facultative, un comparateur et une valeur cible.

Dans cet exemple, trois assertions par défaut sont ajoutées une fois l'URL testée :

{{< img src="getting_started/synthetics/assertions-example.png" alt="Échec du test Browser"  style="width:90%;">}}

Ces assertions correspondent à vos conditions d'alerte et peuvent être personnalisées. Pour ajouter une assertion personnalisée, cliquez sur l'en-tête de votre choix dans l'aperçu de la réponse. Vous pouvez également cliquer sur le bouton **New Assertion** pour ajouter une assertion manuellement (exemple : `body` contient `Shop.ist`.)

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="Échec du test Browser"  style="width:90%;">}}

Vous pouvez configurer vos conditions d'alerte de façon à n'être alerté que si votre endpoint est indisponible pendant plus de trois minutes et pour deux localisations différentes :

```
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

Vous pouvez également définir le nombre minimum de tentatives à effectuer avant qu'une localisation soit considérée comme non disponible :

```
Retry x time before location is marked as failed
```

Une fois vos conditions d'alerte définies, saisissez un message d'alerte, indiquez les services et les personnes qui doivent recevoir la notification d'alerte, puis cliquez sur **Save Test**. Vous pouvez recevoir les notifications sur d'autres services en configurant des [intégrations][5] telles que Slack, PagerDuty, Webhooks, etc.

### Résultats du test

La page d'accueil d'un **test API** affiche automatiquement des données le concernant une fois le test enregistré. Cette page affiche les caractéristiques du test, l'historique des temps de réponse et de l'uptime sous forme de graphiques, des exemples de résultats, ainsi que l'ensemble des événements et des résultats du test.

Pour dépanner un test qui n'a pas réussi, faites défiler la page jusqu'à la section Test Results et cliquez sur l'onglet **Test Results**. Cliquez sur le test concerné (celui-ci affiche un statut `Alert`) pour visualiser les résultats détaillés. Passez en revue les assertions qui ont échoué et les détails de la réponse, tels que le code de statut, le temps de réponse ainsi que les en-têtes et le corps associés pour résoudre le problème.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="Échec du test API"  style="width:90%;">}}

Datadog offre également la possibilité d'[intégrer l'APM avec Synthetics][6] pour vous permettre d'identifier la cause de l'échec du test en visualisant les traces générées durant son exécution.

{{< whatsnext desc="After you set up your first API test:">}}
    {{< nextlink href="/synthetics/api_tests" tag="Documentation" >}}En savoir plus sur les tests API{{< /nextlink >}}
    {{< nextlink href="/synthetics/identify_synthetics_bots" tag="Documentation" >}}Apprendre à identifier les bots Synthetics pour les tests API{{< /nextlink >}}
    {{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configurer les paramètres Synthetics avancés{{< /nextlink >}}

{{< /whatsnext >}}

[1]: /fr/synthetics/api_tests
[2]: /fr/api/?lang=bash#create-a-test
[3]: https://app.datadoghq.com/synthetics/list
[4]: /fr/synthetics/api_tests/?tab=httptest#assertions
[5]: /fr/integrations
[6]: /fr/synthetics/apm/