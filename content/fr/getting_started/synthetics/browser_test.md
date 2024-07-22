---
further_reading:
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests Browser
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /synthetics/cicd_integrations
  tag: Documentation
  text: Découvrir comment déclencher des tests Synthetic depuis un pipeline CI/CD
- link: /synthetics/identify_synthetics_bots
  tag: Documentation
  text: Apprendre à identifier les bots Synthetic pour les tests API
title: Débuter avec les tests Browser
---

## Présentation

Les [tests Browser][1] sont des scénarios que Datadog exécute sur vos applications Web. Vous pouvez faire en sorte que vos tests soient exécutés à des intervalles périodiques depuis plusieurs emplacements, appareils et navigateurs, mais aussi les exécuter depuis vos pipelines de CI/CD.

{{< img src="getting_started/synthetics/browser-test-overview.png" alt="Présentation d'un test Browser Synthetic" style="width:100%;" >}}

Ces tests permettent de vérifier que vos utilisateurs peuvent effectuer les **transactions commerciales essentielles** sur vos applications et qu'ils ne subissent pas d'impact négatif suite à un déploiement de code récent.

## Créer un test Browser

L'exemple ci-dessous montre comment créer un test Browser qui reflète les étapes d'un parcours utilisateur allant de l'ajout d'un article au panier jusqu'à la validation du paiement. 

{{< img src="getting_started/synthetics/browser-test-1.png" alt="Test Browser représentant chaque étape d'un parcours utilisateur" style="width:100%;" >}}
### Configurer les détails de votre test

1. Sur le site Datadog, passez le curseur sur **UX Monitoring** dans le menu de gauche, puis sélectionnez **[Synthetic Tests][2]**.
2. En haut à droite, cliquez sur **New Test** > **[Browser Test][3]**.
3. Définissez votre test Browser :

    - Ajoutez l'URL du site Web que vous souhaitez surveiller. Si vous ne savez pas quelle URL utiliser, faites un test avec l'application Web e-commerce `https://www.shopist.io`.
    - Sélectionnez **Advanced Options** pour définir des options de requête personnalisées, des certificats, des identifiants d'authentification, etc.
      Pour cet exemple, aucune option avancée n'est requise.
    - Donnez un nom à votre test et ajoutez-y des tags, comme `env:prod` et `app:shopist`. Les tags vous permettent d'organiser votre collection de tests et d'accéder rapidement à ceux qui vous intéressent sur la page d'accueil.
    - Choisissez les navigateurs et appareils sur lesquels vous souhaitez exécuter votre test. 

#### Sélectionner des emplacements

Sélectionnez un ou plusieurs **emplacements gérés** ou **emplacements privés** à partir desquels vous souhaitez exécuter votre test.

Les emplacements gérés vous permettent de tester des sites Web et endpoints publics. Pour tester des applications internes ou simuler des comportements utilisateur dans des régions géographiques précises, utilisez plutôt des [emplacements privés][4].

L'application Shopist est accessible à tous depuis l'URL `https://www.shopist.io/`. Vous pouvez donc choisir n'importe quel emplacement géré pour exécuter votre test.

#### Indiquer la fréquence du test

Sélectionnez la fréquence à laquelle vous souhaitez exécuter votre test. Vous pouvez conserver la fréquence par défaut d'une heure.

**Remarque** : vous pouvez non seulement planifier l'exécution de votre test Synthetic, mais également le déclencher manuellement, ou directement depuis vos [pipelines CI/CD][5].


#### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alerte afin de faire en sorte que votre test n'échoue pas en cas de panne réseau de courte durée. Ainsi, vous recevrez uniquement des alertes lorsque votre application rencontre un réel problème.

Vous pouvez spécifier le nombre d'échecs consécutifs avant qu'un emplacement ne soit considéré comme défaillant :

```text
Retry test 2 times after 300 ms in case of failure
```

Vous pouvez également configurer votre test de façon à ce qu'il envoie uniquement une notification lorsque l'application n'est plus disponible pendant une certaine durée, et pour un certain nombre d'emplacements. La règle d'alerte ci-dessous stipule qu'une notification est envoyée lorsque le test échoue pendant trois minutes, sur deux emplacements différents :

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

#### Informer votre équipe

Indiquez un message dans votre alerte et ajoutez les adresses e-mail auxquelles vous souhaitez envoyer des alertes.

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="Exemple de configuration de test Browser" video="true"  >}}

Vous pouvez également utiliser des [intégrations de notification][6], comme Slack, PagerDuty, Microsoft Teams ou encore des webhooks. Pour déclencher une alerte Synthetic avec ces outils, vous devez auparavant configurer l'[intégration correspondante][7].

Lorsque vous êtes prêt à enregistrer votre test, cliquez sur **Save Details & Record Test**.

### Créer un enregistrement

Une fois la configuration de votre test enregistrée, Datadog vous invite à télécharger et à installer l'extension Chrome [Datadog test recorder][8]. 

Une fois que vous avez installé l'extension, cliquez sur **Start Recording** pour commencer à enregistrer les étapes de votre test.

Parcourez la page affichée dans l'iframe visible à droite de la page de l'outil d'enregistrement. Lorsque vous sélectionnez une div, une image ou toute autre zone de la page, Datadog enregistre et crée l'étape associée dans le test Browser. 

Pour terminer l'enregistrement des étapes de votre test, cliquez sur **Stop Recording**.

L'exemple ci-dessous montre comment enregistrer les étapes d'un parcours utilisateur entre l'ajout d'un article au panier jusqu'à la validation du paiement dans `https://www.shopist.io` :

1. Accédez à l'une des sections du site donné en exemple, telles que **Chairs**, puis sélectionnez **Add to cart**.
2. Cliquez sur **Cart**, puis sur **Checkout**.
3. Sous **Add New**, sélectionnez **Assertion**, puis cliquez sur **Test that some text is present on the active page**.
4. Pour vérifier que le message « Thank you! » s'affiche après le paiement, saisissez `Thank you!` dans le champ **Value**. 
5. Appuyez sur **Save & Quit**.

Il est important de terminer votre test Browser par une **assertion** pour confirmer la bonne exécution du parcours utilisateur défini dans votre application.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Enregistrer les étapes du test" video="true"  >}}

**Remarque** : le site donné en exemple renvoie régulièrement une erreur afin de faire échouer le test. Si vous ajoutez votre adresse e-mail dans le champ **Notify your team**, vous recevez une notification par e-mail lors de l'échec et du rétablissement du test.

## Visualiser les résultats du test

La page de détails d'un **test Browser** affiche un aperçu de la configuration de votre test, l'uptime global et par emplacement, des graphiques illustrant le délai avant interactivité et la durée du test, des exemples de résultats d'échec ou de réussite, et la liste de tous les résultats de test. En fonction de la durée de votre test, vous devrez peut-être attendre quelques minutes pour que les premiers résultats de test soient disponibles.

Pour identifier la cause de l'[échec d'un test][9], sélectionnez un résultat d'échec et examinez les captures d'écran jusqu'à l'étape ayant provoqué l'échec. Vous pouvez également examiner les **[erreurs et avertissements][10]** potentiels, les **[ressources][11]** et les **[signaux Web essentiels][12]** pour diagnostiquer le problème. 

Dans l'exemple ci-dessous, le test a échoué car le serveur a mis trop de temps à répondre.

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="Échec du test Browser" video="true"  >}}

Utilisez l'[intégration de l'APM Datadog à la surveillance Synthetic][13] pour afficher les traces générées à partir de votre backend par les exécutions de test dans l'onglet **Traces**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /fr/getting_started/synthetics/private_location
[5]: /fr/synthetics/cicd_integrations
[6]: /fr/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[9]: /fr/synthetics/browser_tests/test_results#test-failure
[10]: /fr/synthetics/browser_tests/test_results#errors
[11]: /fr/synthetics/browser_tests/test_results#resources
[12]: /fr/synthetics/browser_tests/test_results#page-performance
[13]: /fr/synthetics/apm/