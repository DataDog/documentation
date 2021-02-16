---
title: Débuter avec les tests Browser
kind: documentation
further_reading:
  - link: /synthetics/browser_tests
    tag: Documentation
    text: En savoir plus sur les tests Browser
  - link: '/synthetics/browser_tests/#subtests'
    tag: Documentation
    text: Créer un sous-test Browser
  - link: /synthetics/settings/
    tag: Documentation
    text: Configurer les paramètres de surveillance Synthetics avancés
---
## Créer un test Browser

Les [tests Browser][1] sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différentes localisations dans le monde entier et depuis plusieurs appareils. Ces checks vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

Dans cet exemple, un test Browser est créé pour simuler le parcours utilisateur entre l'ajout d'un article au panier et la validation de la commande. Si une étape du test Browser échoue, une erreur est générée et enregistrée dans Datadog en tant que **Test Result**.

{{< img src="getting_started/synthetics/browser-test.png" alt="Test Browser" style="width:90%;" >}}

## Configurer votre test

1. Dans l'application Datadog, passez votre curseur sur l'option **[UX Monitoring][2]** du menu de gauche et sélectionnez **Synthetic Test**.
2. Cliquez sur le bouton **New Test** en haut à droite.
3. Sélectionnez **Browser Test**.
4. Définissez la configuration de votre test Browser :

    - Ajoutez l'URL du site que vous souhaitez surveiller. Si vous n'avez pas encore de site à surveiller, faites un test avec l'application Web `https://www.shopist.io`.
    - Donnez un nom à votre test.
    - Ajoutez des tags à votre test si vous le souhaitez, tels que `prod` et `shopist`. Les tags vous permettent de rester organisé et d'identifier rapidement les tests qui vous intéressent sur la page d'accueil.
    - Choisissez les appareils et les localisations à tester. Pour cet exemple, les options **Large Laptops** et **English speaking countries** sont sélectionnées afin de limiter le test aux ordinateurs portables à grand écran et aux pays anglophones.
    - Indiquez la fréquence du test.
    - Définissez des conditions d'alertes afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

        - Pour éviter de recevoir une alerte en cas de panne réseau de courte durée affectant uniquement des localisations spécifiques, on utilise la configuration suivante :

        ```text
        An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations
        ```

        - Pour faire en sorte que votre test ne soit considéré comme un échec qu'après deux exécutions non réussies, spécifiez le nombre d'échecs d'exécution minimum :

        ```text
        Retry 1 time before location is marked as failed
        ```

        **Remarque** : le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][3].

    - Saisissez un message d'alerte et indiquez les adresses e-mails auxquelles cette alerte doit être envoyée en cas de déclenchement. Aucune autre configuration n'est requise pour commencer à recevoir des e-mails de Datadog. Vous pouvez recevoir les notifications sur d'autres services en configurant des [intégrations][4] telles que Slack, PagerDuty, Webhooks, etc.
    - Cliquez sur **Save & Edit Recording**.

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="Test Browser configuré" style="width:90%;">}}

## Enregistrer les étapes de votre test

Une fois la configuration de votre test enregistrée, vous serez invité à télécharger l'extension [Datadog test recorder][5]. Les tests Browser peuvent uniquement être enregistrés à partir de **[Google Chrome][6]**. Téléchargez et installez l'extension.

Une fois l'extension installée, commencez à enregistrer les étapes de votre test en cliquant sur le bouton **Start Recording**. Parcourez la page affichée dans l'iframe visible à droite des options d'enregistrement. Lorsque vous sélectionnez une div, une image ou toute autre zone, les étapes sont enregistrées et utilisées pour créer les étapes de votre test Browser. Pour en savoir plus sur chaque étape, consultez la [documentation sur les étapes de test Browser][7].

Par exemple, pour enregistrer en tant qu'étapes les actions effectuées entre l'ajout d'un article au panier et la validation de la commande :

1. Accédez à l'une des sections du site, telles que **Chairs**, puis sélectionnez **Add to cart**.
2. Cliquez sur **Cart**, puis sur **Checkout**.
3. Ajoutez l'**assertion** « Test text is present on the active page » pour vérifier que le message « Thank you » est présent sur la page.
   **Remarque** : la dernière étape de votre test Browser doit être une **assertion**. Cela permet de s'assurer que votre test est arrivé à la page souhaitée et qu'il a trouvé le bon élément.
4. Enregistrez le test.

{{< img src="getting_started/synthetics/record-test.gif" alt="Enregistrer les étapes du test" style="width:90%;">}}

**Remarque** : le site utilisé dans cet exemple renvoie régulièrement une erreur afin de faire échouer le test. Ainsi, si vous ajoutez votre adresse e-mail dans la zone du message, vous devriez recevoir un e-mail de notification lorsque le test échoue.

## Résultats du test

La page d'accueil d'un **test Browser** affiche automatiquement des données le concernant une fois le test enregistré. Cette page affiche les caractéristiques du test, l'historique des temps de réponse et de l'uptime sous forme de graphiques, des exemples de résultats, ainsi que l'ensemble des événements et des résultats du test. Les résultats du test comprennent les captures d'écran, les erreurs, les ressources et les traces associées à chaque étape.

Attendez que votre test génère plusieurs résultats de test ou cliquez sur `Run test now` pour aller plus vite. Faites ceci jusqu'à ce que le test renvoie un échec dans la section **Test Results** ou dans votre boîte de messagerie. L'étape à l'origine de l'échec est identifiée par une `x` rouge. Cliquez sur celle-ci pour commencer le dépannage.

L'onglet **Errors & Warnings** affiche la liste des erreurs réseau et Javascript, l'onglet **Resources** identifie la ressource à l'origine du statut, et l'onglet **Traces** affiche les traces générées pour l'intégralité de la requête. Ici, le test a échoué en raison d'un timeout du serveur. La ressource à l'origine du statut est `https://api.shopist.io/checkout.json`, et la source du problème est un contrôleur lié au processus de validation de la commande. Vous savez désormais ce qui a entraîné l'erreur.

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="Échec du test Browser" style="width:100%;">}}

L'onglet **Traces** est accessible une fois l'[intégration de l'APM avec la surveillance Synthetic][8] configurée. Il vous permet ensuite d'identifier la cause de l'échec d'un test en visualisant les traces générées durant son exécution. Pour lier les résultats des tests Browser à l'APM, spécifiez les URL auxquelles vous souhaitez que les en-têtes d'intégration de l'APM soient ajoutés. Vous pouvez utiliser le wildcard `*` : `https://*.datadoghq.com/*`.

{{< whatsnext desc="Après avoir configuré votre premier test Browser, vous pouvez :">}}
{{< nextlink href="/synthetics/browser_tests" tag="Documentation" >}}Consulter la documentation sur les tests Browser{{< /nextlink >}}
{{< nextlink href="/synthetics/browser_tests/#sous-tests" tag="Documentation" >}}Créer un sous-test Browser{{< /nextlink >}}
{{< nextlink href="/synthetics/settings/" tag="Documentation" >}}Configurer les paramètres de surveillance Synthetic avancés{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /fr/api/v1/synthetics/#create-or-clone-a-test
[4]: /fr/integrations/
[5]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://www.google.com/chrome/
[7]: /fr/synthetics/browser_tests/#actions
[8]: /fr/synthetics/apm/