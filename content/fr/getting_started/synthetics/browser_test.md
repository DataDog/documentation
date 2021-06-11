---
title: Débuter avec les tests Browser
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: Centre d'apprentissage
    text: Présentation des tests Synthetic
  - link: /synthetics/browser_tests
    tag: Documentation
    text: En savoir plus sur les tests Browser
  - link: '/synthetics/browser_tests/#subtests'
    tag: Documentation
    text: Créer un sous-test Browser
  - link: /synthetics/settings/
    tag: Documentation
    text: Configurer les paramètres de surveillance Synthetic avancés
---
## Créer un test Browser

[Les tests Browser][1] correspondent à des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles réguliers personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs appareils. Ces tests **vérifient que vos applications fonctionnent et répondent aux requêtes**, et que les utilisateurs peuvent effectuer les principales transactions commerciales sans accrocs.

Dans cet exemple, un test Browser est créé pour simuler le parcours utilisateur entre l'ajout d'un article au panier et la validation du paiement. Chaque exécution du test est enregistrée dans Datadog en tant que **Test Result**.

{{< img src="getting_started/synthetics/browser-test.png" alt="Test Browser" style="width:90%;" >}}

## Configurer votre test

1. Dans l'application Datadog, passez votre curseur sur l'option **[UX Monitoring][2]** du menu de gauche et sélectionnez **Synthetic Test**.
2. Cliquez sur le bouton **New Test** en haut à droite.
3. Sélectionnez **Browser Test**.
4. Définissez la configuration de votre test Browser :

    - **Starting URL** : ajoutez l'URL du site que vous souhaitez surveiller. Si vous n'avez pas encore de site à surveiller, faites un test avec l'application Web `https://www.shopist.io`.
    - **Name** : attribuez un nom à votre test.
    - **Tags** : ajoutez, si vous le souhaitez, des tags à votre test, comme `env:prod` et `app:shopist`. Les tags vous permettent d'organiser vos tests et de repérer rapidement sur la page d'accueil ceux dont vous avez besoin.
    - **Browsers & Devices** : choisissez les appareils et les navigateurs à tester. Pour cet exemple, les tests se limitent au navigateur **Chrome** et aux appareils **Large Laptops**.
    - **Locations** : choisissez l'un des **emplacements gérés** à partir duquel exécuter votre test. Pour cet exemple, le test est exécuté depuis l'emplacement **Americas and Europe**.
    - **Specify test frequency** : sélectionnez la fréquence à laquelle vous souhaitez exécuter le test.
    - **Alert Conditions** : définissez des conditions d'alertes afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

        - Pour éviter de recevoir une alerte en cas de panne réseau de courte durée affectant uniquement des localisations spécifiques, on utilise la configuration suivante :

        ```text
        An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations
        ```

        - Pour faire en sorte que votre test ne soit considéré comme un échec qu'après deux exécutions non réussies, spécifiez le nombre d'échecs d'exécution minimum :

        ```text
        Retry 1 time before location is marked as failed
        ```

         **Remarque** : le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][3].

    - **Notify** : saisissez un message d'alerte et indiquez les adresses e-mail auxquelles cette alerte doit être envoyée en cas de déclenchement. Aucune autre configuration n'est requise pour commencer à recevoir des e-mails de la part de Datadog. Vous pouvez recevoir les notifications sur d'autres services en configurant des [intégrations][4] telles que Slack, PagerDuty, Webhooks, etc.
    - Cliquez sur **Save & Edit Recording**.

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="Test Browser configuré" style="width:90%;">}}

## Enregistrer les étapes de votre test

Une fois la configuration de votre test enregistrée, vous serez invité à télécharger l'extension [Datadog test recorder][5]. Les tests Browser peuvent uniquement être enregistrés à partir de **[Google Chrome][6]**. Téléchargez et installez l'extension.

Une fois l'extension installée, commencez à enregistrer les étapes de votre test en cliquant sur le bouton **Start Recording**. Parcourez la page affichée dans l'iframe visible à droite des options d'enregistrement. Lorsque vous sélectionnez une div, une image ou toute autre zone, les étapes sont enregistrées et utilisées pour créer les étapes de votre test Browser. Pour en savoir plus sur chaque étape, consultez la [documentation sur les étapes de test Browser][7].

Par exemple, pour enregistrer en tant qu'étapes les actions effectuées entre l'ajout d'un article au panier et la validation de la commande :

1. Accédez à l'une des sections du site, telles que **Chairs**, puis sélectionnez **Add to cart**.
2. Cliquez sur **Cart**, puis sur **Checkout**.
3. Ajoutez manuellement l'**assertion** « Test text is present on the active page » pour vérifier que le message « Thank you » est présent sur la page.

   **Remarque** : la dernière étape de votre test Browser doit être une **assertion**. Cela permet de s'assurer que votre test est arrivé à la page souhaitée et qu'il a trouvé le bon élément.

4. Enregistrez le test.

{{< img src="getting_started/synthetics/record-test.gif" alt="Enregistrer les étapes du test" style="width:90%;">}}

**Remarque** : le site utilisé dans cet exemple renvoie régulièrement une erreur afin de faire échouer le test. Ainsi, si vous ajoutez votre adresse e-mail dans la zone du message, vous devriez recevoir un e-mail de notification lorsque le test échoue.

## Résultats du test

La page de détails d'un test Browser comprend des informations sur la configuration de votre test, l'uptime du test, l'historique des temps de réponse et d'interaction avec la première page sous forme de graphiques, les résultats d'échantillonnage réussis et échoués, ainsi que la liste des résultats de test correspondant à l'intervalle sélectionné. Chaque résultat de test individuel comprend des captures d'écran, des signaux Web essentiels, des erreurs potentielles, des ressources et des traces pour chaque étape.

Attendez que votre test génère plusieurs résultats ou cliquez sur `Run test now` pour aller plus vite. Procédez ainsi jusqu'à ce que le test renvoie un échec dans la section **Test Results** ou dans votre boîte de messagerie. Pour commencer la résolution de l'échec, étudiez les captures d'écran afin d'essayer de comprendre les problèmes survenus durant le test. N'oubliez pas de regarder également les captures d'écran des étapes précédant l'étape qui a échoué, car c'est souvent dans celles-ci que se trouve la cause à l'origine de l'échec.

L'onglet **Errors & Warnings** affiche la liste des erreurs réseau et Javascript, l'onglet **Resources** identifie la ressource à l'origine du statut, et l'onglet **Traces** affiche les traces générées pour l'intégralité de la requête. Ici, le test a échoué en raison d'un timeout du serveur. La ressource à l'origine du statut est `https://api.shopist.io/checkout.json`, et la source du problème est un contrôleur lié au processus de validation de la commande. Vous savez désormais ce qui a entraîné l'erreur.

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="Échec du test Browser" style="width:100%;">}}

L'onglet **Traces** est accessible une fois l'[intégration de l'APM avec la surveillance Synthetic][8] configurée. Il vous permet ensuite d'identifier la cause de l'échec d'un test en visualisant les traces générées durant son exécution. Pour lier les résultats des tests Browser à l'APM, spécifiez les URL auxquelles vous souhaitez que les en-têtes d'intégration de l'APM soient ajoutés. Vous pouvez utiliser le wildcard `*` : `https://*.datadoghq.com/*`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /fr/api/v1/synthetics/#create-or-clone-a-test
[4]: /fr/integrations/
[5]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://www.google.com/chrome/
[7]: /fr/synthetics/browser_tests/#actions
[8]: /fr/synthetics/apm/