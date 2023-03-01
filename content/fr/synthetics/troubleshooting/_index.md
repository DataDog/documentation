---
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
kind: documentation
title: Dépannage de la surveillance Synthetic
---

## Présentation

Si vous rencontrez un problème durant la configuration de la surveillance Synthetic Datadog, utilisez cette page pour effectuer un premier dépannage. Si votre problème persiste, [contactez l'assistance Datadog][1].

## Tests API

### Écarts des durées d'opérations réseau

Si vous observez un changement soudain ou une augmentation globale des [métriques de durée][2] de votre test API, cela est vraisemblablement causé par un goulot d'étranglement ou un retard de la requête. Pour en savoir plus, consultez le guide [Fonctionnement des durées de test API et correction des écarts][3].

## Tests Browser

### Enregistrement

#### Le site Web ne se charge pas dans l'iframe

Après avoir téléchargé l'[extension Datadog][4], vous ne parvenez pas à afficher votre site Web dans l'iframe en haut à droite de l'enregistreur de votre test Browser. Le message `Your website does not support being loaded through an iframe.` est affiché dans l'iframe. Cette erreur peut survenir lorsque certains réglages de votre application empêchent son ouverture dans l'iframe. Si c'est le cas, essayez d'ouvrir votre site Web dans une fenêtre contextuelle. Cliquez sur **Open in Popup** pour enregistrer votre parcours.

#### Seulement certaines applications se chargent dans l'iframe

Cela signifie que les restrictions de vos applications et environnements diffèrent. Ainsi, certaines applications s'affichent correctement, tandis que d'autres ne sont pas visibles.

#### Le message « We've detected HTTP requests that are not supported inside the iframe, you may need to record in a popup » s'affiche en haut de l'iframe

Vous essayez très certainement d'enregistrer des étapes sur une page `http`. Or, seul les pages `https` sont prises en charge dans l'iframe de l'enregistreur. Pour commencer à enregistrer le contenu de votre page, ouvrez-la dans une fenêtre contextuelle ou modifiez son URL en prenant soin d'indiquer une adresse `https`.

{{< img src="synthetics/http_iframe.png" alt="HTTP dans un iframe" style="width:100%;" >}}

#### Le site Web ne s'affiche pas dans l'iframe et aucune étape ne peut être enregistrée, même en cas d'ouverture dans une fenêtre contextuelle

Après avoir téléchargé l'[extension Datadog][4], vous ne parvenez pas à afficher votre site Web dans l'iframe sur la droite de l'enregistreur de votre test Browser. En outre, vous ne pouvez enregistrer aucune étape, que vous ayez ouvert votre site Web dans l'iframe ou dans une fenêtre contextuelle :

{{< img src="synthetics/recording_iframe.mp4" alt="Problèmes d'enregistrement concernant les étapes du test Browser" video="true" width="100%" >}}

Si c'est le cas, assurez-vous que l'[extension Datadog][5] dispose des autorisations de lecture et d'écriture de données pour les sites Web souhaités, en spécifiant votre site Web dans la section `On specific sites` ou en activant l'option `On all sites` :

{{< img src="synthetics/extension.mp4" alt="Autoriser l'extension à lire les données sur tous les sites" video="true" width="100%" >}}

#### Impossible d'enregistrer des étapes sur une application

Il est possible que votre navigateur Chrome applique certaines règles qui empêchent l'extension d'effectuer l'enregistrement comme prévu.

Pour vérifier si c'est le cas, accédez à `chrome://policy` et consultez les paramètres relatifs aux extensions, par exemple [`ExtensionSettings`][6].

#### La page de connexion ne s'affiche pas dans l'enregistreur

Par défaut, l'iframe ou la fenêtre contextuelle de l'enregistreur utilise votre navigateur. Cela signifie que si vous êtes déjà connecté à votre application, il est possible que l'iframe ou la fenêtre affiche directement la page qui suit l'écran de connexion, vous empêchant alors d'enregistrer vos étapes de connexion sans vous déconnecter au préalable.

Pour enregistrer vos étapes de connexion sans vous déconnecter de votre application, utilisez simplement le **mode navigation privée** de l'enregistreur :

{{< img src="synthetics/incognito_mode.mp4" alt="Utiliser le mode navigation privée dans des tests Browser" video="true" width="100%" >}}

L'option **Open popup in incognito mode** vous permet de démarrer l'enregistrement de votre test depuis l'URL de départ configurée et dans une session entièrement distincte de la session principale de votre navigateur.

Cette fenêtre contextuelle de navigation privée ignore toutes vos anciennes données de navigation, y compris les cookies et les données locales. Vous êtes ainsi automatiquement déconnecté de votre compte et pouvez enregistrer vos étapes de connexion comme si vous consultiez votre site pour la première fois.

### Résultats des tests

#### Un test Browser Mobile Small ou Tablet échoue systématiquement

Si votre site Web a recours à des techniques **réactives**, son DOM peut afficher d'importantes différences en fonction de l'appareil sur lequel le test est exécuté. Il est possible que votre site utilise un DOM spécifique lorsqu'il est exécuté à partir d'un `Laptop Large`, et que son architecture diffère grandement lorsqu'il est exécuté depuis un appareil `Tablet` ou `Mobile Small`.

En d'autres termes, il se peut que les étapes que vous avez enregistrées depuis une fenêtre d'affichage `Laptop Large` ne s'appliquent pas à un appareil `Mobile Small` pour le même site Web. Cela entraînerait l'échec de votre test `Mobile Small` :

{{< img src="synthetics/device_failures.png" alt="Échec d'appareil mobile et tablette" style="width:100%;" >}}

Pour y remédier, Datadog vous conseille de créer des **tests spécifiques au format `Mobile Small` ou `Tablet`**. Leurs étapes enregistrées correspondent alors à la fenêtre d'affichage du test lors de l'exécution.

Afin d'enregistrer ces étapes avec une fenêtre d'affichage `Mobile Small` ou `Tablet`, sélectionnez `Mobile Small` ou `Tablet` dans le menu déroulant de l'enregistreur avant de cliquer sur le bouton **Start Recording**.

{{< img src="synthetics/record_device.png" alt="Enregistrer des étapes sur un appareil mobile" style="width:100%;" >}}

En outre, les tests Browser sont exécutés en mode **headless**, ce qui signifie que certaines fonctionnalités ne sont pas prises en charge. Par exemple, les tests Browser ne prennent pas en charge l'action `touch` et ne peuvent pas l'utiliser pour détecter si le site Web doit s'afficher dans sa version mobile ou non.

#### L'avertissement `None or multiple elements detected` s'affiche dans des tests Browser

L'une des étapes de votre test Browser affiche un avertissement `None or multiple elements detected` :

{{< img src="synthetics/step_warning.png" alt="Avertissement pour l'étape du localisateur d'utilisateur" style="width:100%;" >}}

Cela signifie que le localisateur d'utilisateur défini pour cette étape cible soit plusieurs éléments, soit aucun d'entre eux. Le test Browser ne sait donc pas avec quel élément interagir.

Pour résoudre ce problème, accédez à l'éditeur de votre enregistrement et ouvrez les options avancées de l'étape problématique. Accédez à la page en cours de test, puis cliquez sur `Test`. Cela met en surbrillance l'élément localisé ou affiche un message d'erreur. Vous pouvez désormais modifier votre localisateur d'utilisateur de façon à ce qu'il ne renvoie plus qu'un seul élément de votre page :

{{< img src="synthetics/fix_user_locator.mp4" alt="Résoudre une erreur concernant le localisateur d'utilisateur" video="true" width="100%" >}}

#### Je rencontre des problèmes avec une propriété pointer CSS

Les navigateurs automatisés ne peuvent pas émuler la fonctionnalité de média `pointer` CSS. Les tests Browser utilisent `pointer: none` pour chaque test et chaque appareil (ordinateur portable, tablette ou mobile).

## Tests API et tests Browser

### Erreurs Unauthorized

Si l'un de vos tests Synthetic renvoie une erreur 401, c'est probablement qu'il ne parvient pas à s'authentifier auprès de l'endpoint. Lorsque vous configurez votre test Synthetic, assurez-vous d'utiliser la même méthode d'authentification que celle que vous utilisez en dehors de Datadog.

* Votre endpoint utilise-t-il une **authentification par en-têtes** ?
  * **Authentification basique** : spécifiez les identifiants requis dans les **options avancées** de votre [test HTTP][7] ou [Browser][8].
  * **Authentification basée sur un token** : commencez par extraire votre token avec un premier [test HTTP][7], créez une [variable globale][9] en parsant la réponse de ce premier test, et réinjectez cette variable dans un second [test HTTP][7] ou [test Browser][10] nécessitant le token d'authentification.
  * **Authentification basée sur une session** : ajoutez les en-têtes ou cookies requis dans les **options avancées** de votre [test HTTP][7] ou [Browser][8].

* L'endpoint utilise-t-il des **paramètres de requête pour l'authentification** ? Par exemple, devez-vous ajouter une clé d'API spécifique dans vos paramètres d'URL ?

* Cet endpoint utilise-t-il une **authentification basée sur l'adresse IP** ? Dans ce cas, vous devrez peut-être autoriser une partie ou l'ensemble des [IP à l'origine des tests Synthetic][11].

### Erreurs Forbidden

Si les tests Synthetic renvoient des erreurs `403 Forbidden`, il est possible que votre serveur Web bloque ou filtre les requêtes qui comprennent l'en-tête `Sec-Datadog`. Cet en-tête est ajouté à chaque requête Synthetic envoyée par Datadog pour identifier la source du trafic et aider l'assistance Datadog à identifier l'exécution de test spécifique.

En outre, vous devrez peut-être également vérifier que vos pare-feu autorisent les [plages d'IP utilisées par la surveillance Synthetic Datadog][11] comme sources de trafic.

### Notifications manquantes

Par défaut, les tests Synthetic ne procèdent à aucun [renvoi de notifications][12]. Ainsi, si vous ajoutez votre handle de notification, comme une adresse e-mail ou un handle Slack, après un changement d'état (par exemple, un test entrant en alerte ou se rétablissant à partir d'une ancienne alerte), aucune notification n'est envoyée pour ce changement. Une notification est toutefois envoyée pour le changement suivant.

## Emplacements privés

### Les conteneurs d'emplacement privé font parfois l'objet d'une élimination `OOM`

Les éliminations `Out Of Memory` des conteneurs d'emplacement privé sont généralement causées par un problème de saturation des ressources sur vos workers d'emplacement privé. Vérifiez que vos conteneurs d'emplacement privé disposent de [suffisamment de ressources mémoire][13].

### Les résultats de test Browser indiquent parfois des erreurs `Page crashed`

Cela peut être causé par un problème de saturation des ressources sur vos workers d'emplacement privé. Vérifiez que vos conteneurs d'emplacement privé disposent de [suffisamment de ressources mémoire][13].

### Les tests s'exécutent parfois lentement

Cela peut être causé par un problème de saturation des ressources sur vos workers d'emplacement privé. Vérifiez que vos conteneurs d'emplacement privé disposent de [suffisamment de ressources CPU][13].

### Mes tests Browser prennent trop de temps à s'exécuter

Vérifiez que vous ne rencontrez pas de [problèmes de mémoire insuffisante][14] avec vos déploiements d'emplacement privé. Si vous avez déjà essayé de dimensionner vos instances de conteneur en suivant les [conseils de dimensionnement][15], contactez l'[assistance Datadog][1].

### Les tests API exécutés à partir d'un emplacement privé génèrent des erreurs `TIMEOUT`

Ces erreurs peuvent indiquer que votre emplacement privé ne parvient pas à atteindre l'endpoint sur lequel vos tests API s'exécutent. Assurez-vous que l'emplacement privé est installé sur le même réseau que l'endpoint à tester. Vous pouvez également essayer d'exécuter votre test sur plusieurs endpoints pour vérifier si vous obtenez les mêmes erreurs `TIMEOUT`.

{{< img src="synthetics/timeout.png" alt="Test API sur un emplacement privé avec une erreur d'expiration" style="width:70%;" >}}

### L'erreur `invalid mount config for type "bind": source path must be a directory` s'affiche lors d'une tentative d'exécution d'un emplacement privé

Cette erreur survient lorsque vous essayez de monter un fichier unique dans un conteneur Windows, ce qui n'est pas possible. Pour en savoir plus, consultez la [documentation Docker relative au volume de montage][16] (en anglais). Vérifiez que la source du montage lié correspond à un répertoire local.

## Synthetics et CI/CD

### Les métadonnées CI ne s'affichent pas dans l'explorateur de résultats CI

Vérifiez si vous utilisez les endpoints d'API pour déclencher vos exécutions de test CI/CD. Pour que les métadonnées CI s'affichent dans l'explorateur de résultats CI, vous devez utiliser le [package NPM][17].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/synthetics/metrics/#api-tests
[3]: /fr/synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /fr/synthetics/api_tests/?tab=httptest#make-a-request
[8]: /fr/synthetics/browser_tests/#test-details
[9]: /fr/synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /fr/synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /fr/synthetics/api_tests/?tab=httptest#notify-your-team
[13]: /fr/synthetics/private_locations#private-location-total-hardware-requirements
[14]: https://docs.docker.com/config/containers/resource_constraints/
[15]: /fr/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[16]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[17]: /fr/synthetics/cicd_integrations#use-the-cli