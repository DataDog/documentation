---
title: Débuter avec les tests API
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: Centre d'apprentissage
    text: Présentation des tests Synthetic
  - link: /synthetics/api_tests
    tag: Documentation
    text: En savoir plus sur les tests API
  - link: /synthetics/identify_synthetics_bots
    tag: Documentation
    text: Apprendre à identifier les bots Synthetic pour les tests API
  - link: /synthetics/settings/
    tag: Documentation
    text: Configurer les paramètres de surveillance Synthetic avancés
  - link: '/api/v1/synthetics/#creer-un-test'
    tag: Documentation relative à l'API
    text: Créer un test Synthetic par programmation
---
## Créer un test API

Les [tests API][1] vous permettent de **surveiller vos endpoints d'API et de recevoir des alertes** en cas d'échec ou de lenteur excessive. Ces tests vérifient que vos applications répondent aux requêtes et respectent les conditions que vous avez définies, comme le **temps de réponse**, le **code de statut HTTP**, ainsi que les **contenus de l'en-tête et du corps de message**.

Dans cet exemple, un test API est créé pour vérifier que votre site reste toujours disponible et qu'il répond aux requêtes dans les délais impartis.

### Configurer la requête

1. Dans l'application Datadog, passez votre curseur sur l'option **[UX Monitoring][2]** du menu de gauche et sélectionnez **Synthetic Test**.
2. Cliquez sur le bouton **New Test** en haut à droite.
3. Sélectionnez **API test**.
4. Définissez la configuration de votre test API :

    - Ajoutez l'URL de l'endpoint que vous souhaitez surveiller. Si vous ne savez pas quelle URL utiliser, faites un test avec l'application Web `https://www.shopist.io/`.
    - Sélectionnez **Advanced Options** pour personnaliser les en-têtes, les identifiants d'authentification, le contenu du corps ou les cookies de la requête.
    - Ajoutez des tags à votre test si vous le souhaitez, tels que `env:prod` et `app:shopist`. Les tags vous permettent d'organiser vos tests et d'accéder rapidement à ceux qui vous intéressent sur la page d'accueil.
    - Choisissez un emplacement géré sur lequel vous souhaitez exécuter votre test parmi la liste **Managed Locations**.
    - Cliquez sur le bouton **Test URL**.

{{< img src="getting_started/synthetics/api-test-config.png" alt="Configuration d'un test API" style="width:60%;">}}

#### Définir vos conditions d'alerte

Après avoir cliqué sur Test URL, les assertions de base reposant sur la réponse de votre endpoint sont automatiquement ajoutées. Les assertions correspondent aux conditions d'alerte et peuvent être personnalisées. Dans cet exemple, trois assertions par défaut sont ajoutées lors du test de l'URL :

{{< img src="getting_started/synthetics/assertions-example.png" alt="Échec du test Browser" style="width:90%;">}}

Ces assertions correspondent à vos conditions d'alerte et peuvent être personnalisées. Pour ajouter une assertion personnalisée, cliquez sur l'aperçu de la réponse. Vous pouvez également cliquer sur le bouton New Assertion pour ajouter manuellement une assertion (exemple : le corps contient Shop.ist.)

{{< img src="getting_started/synthetics/api-test-configuration.gif" alt="Échec du test Browser" style="width:90%;">}}

Vous pouvez configurer vos conditions d'alerte de façon à n'être alerté que si votre endpoint est indisponible pendant plus de trois minutes et pour deux localisations différentes :

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

Vous pouvez également définir le nombre minimum de tentatives à effectuer avant qu'une localisation soit considérée comme non disponible. Les nouvelles tentatives seront effectuées juste après l'échec du test. Vous pouvez configurer le test à l'aide de l'option ci-dessous :

```text
Retry x time before location is marked as failed
```

**Remarque** : le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][3].

Une fois vos conditions d'alerte définies, saisissez un message d'alerte, indiquez les services et les personnes qui doivent recevoir l'e-mail de notification d'alerte, puis cliquez sur **Save Test**. Vous pouvez également recevoir les notifications sur d'autres services en configurant des [intégrations][4] telles que Slack, PagerDuty, Webhooks, etc.

### Résultats du test

La page de détails du test API affiche des informations précises sur la configuration du test, l'uptime associé au endpoint testé, des graphiques représentant l'évolution du temps de réponse et des délais réseau ainsi que la liste des résultats et des événements de chaque test.

Pour dépanner un test qui a échoué, faites défiler la page jusqu'à la section Test Results et cliquez sur les résultats du test de votre choix. Pour résoudre le problème, passez en revue les assertions qui ont échoué et les détails de la réponse, tels que le code de statut, le temps de réponse ainsi que les en-têtes et le corps associés.

{{< img src="getting_started/synthetics/api-test-failure.png" alt="Échec du test API" style="width:90%;">}}

Datadog offre également la possibilité d'[intégrer l'APM à la surveillance Synthetic][5] pour vous permettre d'identifier la cause de l'échec du test en visualisant les traces générées durant son exécution.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /fr/api/v1/synthetics/#create-or-clone-a-test
[4]: /fr/integrations/
[5]: /fr/synthetics/apm/