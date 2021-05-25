---
title: Dépannage de la surveillance Synthetic
kind: documentation
description: Résolvez les problèmes courants rencontrés avec la surveillance Synthetic.
further_reading:
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos tests Synthetic
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
Si vous rencontrez un problème durant la configuration de la surveillance Synthetic Datadog, utilisez cette page pour effectuer un premier dépannage. Si votre problème persiste, [contactez l'équipe d'assistance Datadog][1].

## Tests Browser

### Enregistrement

#### Mon site Web ne se charge pas dans l'iframe et je ne peux enregistrer aucune étape, même lorsque j'ouvre mon site Web dans une fenêtre contextuelle.

Après avoir téléchargé l'[extension Datadog][2], vous ne pouvez pas afficher votre site Web dans l'iframe sur la droite de l'enregistreur de votre test Browser. En outre, vous ne pouvez enregistrer aucune étape, que vous ayez ouvert votre site Web dans l'iframe ou dans une fenêtre contextuelle :

{{< img src="synthetics/recording_iframe.mp4" alt="Problèmes d'enregistrement concernant les étapes du test Browser" video="true"  width="100%" >}}

Si c'est le cas, assurez-vous que l'[extension Datadog][3] dispose des autorisations de lecture et d'écriture sur les données pour les sites Web souhaités, en spécifiant votre site Web dans la section `On specific sites` ou en activant le bouton `On all sites` :

{{< img src="synthetics/extension.mp4" alt="Autoriser l'extension à lire les données sur tous les sites" video="true"  width="100%" >}}


#### Je ne vois pas la page de connexion dans l'outil d'enregistrement. Que se passe-t-il ?

Par défaut, l'iframe/la fenêtre de l'outil d'enregistrement utilise votre propre navigateur. Cela signifie que si vous êtes déjà connecté à votre application, il est possible que l'iframe/la fenêtre affiche directement la page qui suit l'écran de connexion, vous empêchant alors d'enregistrer vos étapes de connexion sans vous déconnecter au préalable.

Pour enregistrer vos étapes de connexion sans vous déconnecter de votre application, utilisez simplement le **mode navigation privée** de l'outil d'enregistrement :

{{< img src="synthetics/incognito_mode.mp4" alt="Utiliser le mode navigation privée dans des tests Browser" video="true"  width="100%" >}}

L'option **Open pop up in Incognito mode** vous permet de démarrer l'enregistrement de votre test depuis l'URL de départ configurée et dans une session entièrement distincte de la session principale de votre navigateur.

La fenêtre de navigation privée qui s'ouvre alors ignore toutes vos anciennes données de navigation (cookies, données locales, etc.). Ainsi, vous êtes automatiquement déconnecté de votre compte et pouvez enregistrer vos étapes de connexion comme si vous consultiez votre site pour la première fois.

### Résultats de test

#### Mon test Browser Mobile Small ou Tablet échoue systématiquement

Si votre site Web a recours à des techniques **réactives**, son DOM peut afficher d'importantes différences en fonction de l'appareil sur lequel le test est exécuté. Il est possible que votre site utilise un DOM spécifique lorsqu'il est exécuté à partir d'un `Laptop Large`, et que son architecture diffère grandement lorsqu'il est exécuté depuis un appareil `Tablet` ou `Mobile Small`. 
En d'autres termes, il se peut que les étapes que vous avez enregistrées depuis une fenêtre d'affichage `Laptop Large` ne s'appliquent pas à un appareil `Mobile Small` pour le même site Web. Cela entraînerait l'échec des résultats de votre test `Mobile Small` :

{{< img src="synthetics/device_failures.png" alt="Échec d'appareil mobile et tablette" style="width:100%;" >}}

Pour y remédier, nous vous recommandons de créer des **tests spécifiques au format `Small` ou `Tablet`**. Leurs étapes enregistrées correspondront alors à la fenêtre d'affichage du test lors de l'exécution.
Afin d'enregistrer ces étapes avec une fenêtre d'affichage `Mobile Small` ou `Tablet`, sélectionnez `Mobile Small` ou `Tablet` dans le menu déroulant de l'enregistreur avant de cliquer sur le bouton **Start Recording**.

{{< img src="synthetics/record_device.png" alt="Enregistrer des étapes sur un appareil mobile" style="width:100%;" >}}

En outre, les tests Browser sont exécutés en mode **headless**, ce qui signifie que certaines fonctionnalités ne sont pas prise en charge. Par exemple, les tests Browser ne prennent pas en charge l'action `touch` et ne peuvent l'utiliser pour détecter si le site Web doit s'afficher dans sa version mobile ou non.

#### Mon test Browser affiche un avertissement `None or multiple elements detected`

L'une des étapes de votre test Browser affiche un avertissement `None or multiple elements detected` :

{{< img src="synthetics/step_warning.png" alt="Avertissement pour l'étape du localisateur d'utilisateur" style="width:100%;" >}}

Cela signifie que le localisateur d'utilisateur défini pour cette étape cible soit plusieurs éléments, soit aucun d'entre eux. Le test Browser ne sait donc pas avec quel élément interagir.
Pour résoudre ce problème, accédez à l'éditeur de votre enregistrement et ouvrez les options avancées de l'étape problématique. Accédez à la page en cours de test, puis cliquez sur `Test`. Cela met en surbrillance l'élément localisé ou affiche un message d'erreur. Vous pouvez désormais modifier votre localisateur d'utilisateur de façon à ce qu'il ne renvoie plus qu'un seul élément de votre page :

{{< img src="synthetics/fix_user_locator.mp4" alt="Résoudre une erreur concernant le localisateur d'utilisateur" video="true"  width="100%" >}}

## Tests API et tests Browser

### Erreurs Unauthorized

Si l'un de vos tests Synthetic renvoie une erreur 401, c'est probablement qu'il ne parvient pas à s'authentifier auprès de l'endpoint. Lorsque vous configurez votre test Synthetic, assurez-vous d'utiliser la même méthode d'authentification que celle que vous utilisez en dehors de Datadog.

* Votre endpoint utilise-t-il une **authentification par en-têtes** ?
  * **Authentification basique** : spécifiez les identifiants requis dans les **options avancées** de votre [test HTTP][4] ou [Browser][5].
  * **Authentification basée sur un token** : commencez par extraire votre token avec un premier [test HTTP][4], créez une [variable globale][6] en parsant la réponse de ce premier test, et réinjectez cette variable dans un second [test HTTP][4] ou [test Browser][8] nécessitant le token d'authentification.
  * **Authentification basée sur une session** : ajoutez les en-têtes ou cookies requis dans les **options avancées** de votre [test HTTP][4] ou [Browser][5].

* L'endpoint utilise-t-il les **paramètres de requête pour l'authentification** ? (Avez-vous besoin d'ajouter une clé d'API spécifique dans vos paramètres d'URL ?)

* Cet endpoint utilise-t-il une **authentification basée sur l'adresse IP** ? Dans ce cas, vous devrez peut-être autoriser une partie ou l'ensemble des [IP à l'origine des tests Synthetic][9].

### Erreurs Forbidden

Si les tests Synthetic renvoient des erreurs `403 Forbidden`, il est possible que votre serveur Web bloque ou filtre les requêtes qui comprennent l'en-tête `Sec-Datadog`. Cet en-tête est ajouté à chaque requête Synthetic envoyée par Datadog pour identifier la source du trafic et aider l'assistance Datadog à identifier l'exécution de test spécifique. 

En outre, vous devrez peut-être également vérifier que vos pare-feu autorisent les [plages d'IP utilisées par la surveillance Synthetic Datadog][9] comme sources de trafic.

### Notifications manquantes

Par défaut, les tests Synthetic ne procèdent à aucun [renvoi de notifications][10]. Ainsi, si vous ajoutez votre handle de notification (adresse e-mail, handle Slack, etc.) après un changement d'état (par exemple, un test entrant en alerte ou se rétablissant à partir d'une ancienne alerte), aucune notification ne sera envoyée pour ce changement. Une notification sera toutefois envoyée pour le changement suivant.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[3]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /fr/synthetics/api_tests/?tab=httptest#make-a-request
[5]: /fr/synthetics/browser_tests/#test-details
[6]: /fr/synthetics/settings/?tab=createfromhttptest#global-variables
[7]: /fr/synthetics/api_tests/?tab=httptest#use-global-variables
[8]: /fr/synthetics/browser_tests/#use-global-variables
[9]: https://ip-ranges.datadoghq.com/synthetics.json
[10]: /fr/synthetics/api_tests/?tab=httptest#notify-your-team