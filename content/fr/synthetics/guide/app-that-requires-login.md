---
title: Utilisation de Synthetics pour surveiller une application nécessitant une connexion
kind: guide
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
---
Il se peut que vous cherchiez à surveiller une application qui nécessite une connexion. Vous pouvez adopter les deux approches suivantes pour vérifier que vos tests Browser Datadog accomplissent les différentes étapes de connexion sur votre application, afin d'effectuer la validation sur les pages réservées aux utilisateurs identifiés :

- [Ajouter les étapes de connexion à votre enregistrement](#include-the-login-in-your-recording)
- [Tirer profit des options de configuration des tests Browser][#tirer-profit-des-options-de-configuration-des-tests-browser]
Vous pouvez également vous assurer que vos identifiants sont stockés et obfusqués de façon sécurisée dans l'application [à l'aide de variables globales sécurisées][#sécurité-du-compte].
## Ajouter les étapes de connexion à votre enregistrement

Cette première méthode consiste à enregistrer les étapes requises pour se connecter au début de vos tests Browser : saisie de votre nom d'utilisateur, saisie de votre mot de passe, clic sur le bouton de connexion. Vous pouvez ensuite [lancer l'enregistrement des étapes ultérieures][1].
Lors de son exécution, le test Browser lance systématiquement les premières étapes de connexion avant le reste des instructions.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="Démonstration de l'enregistrement d'une connexion">}}

Par défaut, l'iframe/la fenêtre de l'outil d'enregistrement utilise votre propre navigateur. Si vous commencez l'enregistrement alors que vous êtes déjà connecté à votre application, il est possible que l'iframe/la fenêtre affiche directement la page qui suit l'écran de connexion, ce qui vous empêche alors d'enregistrer vos étapes de connexion sans vous déconnecter au préalable.

Pour enregistrer vos étapes de connexion sans vous déconnecter de votre application, utilisez le mode navigation privée de l'outil d'enregistrement.

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="Démonstration de l'enregistrement d'une connexion avec la navigation privée">}}

L'ouverture d'une fenêtre en mode navigation privée vous permet de démarrer l'enregistrement de votre test depuis l'URL de départ configurée et dans une session entièrement distincte de la session principale de votre navigateur, qui n'utilise pas ses données utilisateur. La fenêtre de navigation privée qui s'ouvre ignore toutes vos anciennes données de navigation (cookies, données locales, etc.). Ainsi, vous êtes automatiquement déconnecté de votre compte et pouvez enregistrer vos étapes de connexion comme si vous consultiez votre site pour la première fois.

**Remarque** : utilisez [la fonctionnalité de sous-test][2] pour regrouper vos étapes de connexion au sein d'un unique sous-test pouvant être réutilisé dans n'importe quel test Browser nécessitant une connexion.

### Connexion avec authentification unique

Si votre site web utilise une connexion avec authentification unique, définissez l'URL de départ de votre test Browser sur l'URL de votre application. Le test effectue les redirections requises dans le cadre de la première étape d'accès à l'URL.

Certains fournisseurs d'authentification unique peuvent détecter un comportement lié à un bot pour les tests Browsers de Datadog. Par conséquent, ils peuvent empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, contactez votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots pour un ensemble d'identifiants spécifiques, afin que vous puissiez réaliser vos tests.

Il est également possible d'ignorer les principes d'authentification unique et d'utiliser un nom d'utilisateur et un mot de passe normaux pour effectuer la connexion.

### Authentification multifacteur

Les tests Browser peuvent reproduire les actions qu'un utilisateur normal peut effectuer dans son navigateur Chrome. Si vous suivez l'étape d'authentification multifacteur (double authentification) dans un navigateur Chrome, vous pouvez enregistrer les étapes requises pour configurer des tests Browser.

Certains fournisseurs d'authentification multifacteur peuvent détecter un comportement lié à un bot pour les tests Browsers de Datadog. Par conséquent, ils peuvent empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, contactez votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots pour un ensemble d'identifiants spécifiques, afin que vous puissiez réaliser vos tests.

Si votre processus d'authentification multifacteur comprend la réalisation d'étapes en dehors du navigateur, par exemple la réception d'un message vocal ou d'un SMS ou encore l'ouverture d'une application mobile, contactez votre fournisseur d'authentification multifacteur. Demandez-lui s'il est possible de modifier vos réglages ou de désactiver l'authentification multifacteur pour un ensemble d'identifiants spécifiques, afin que vous puissiez réaliser vos tests.
Selon le type d'authentification multifacteur utilisé par votre application, des [étapes JavaScript][3] peuvent vous permettre de contourner ce problème.

## Sécurité du compte

### Sécuriser vos données d'authentification

Stockez vos identifiants sous la forme de [variables globales][4] (par exemple, une variable globale pour le nom d'utilisateur et une pour le mot de passe) et sécurisez ces variables. Leurs valeurs seront ainsi obfusquées et ne pourront pas être consultées par tout utilisateur ayant accès à votre instance Datadog :

Après avoir créé les variables sécurisées, vous pouvez [importer ces variables globales][5] dans vos tests Browser et les utiliser pour vos étapes de connexion :

**Remarque** : bien que les variables globales de Datadog soient stockées et chiffrées de façon sécurisée, nous vous recommandons fortement d'utiliser un compte dédié au testing, avec des identifiants fictifs, pour réaliser vos tests.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions/
[2]: /fr/synthetics/browser_tests/actions/#subtests
[3]: /fr/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: /fr/synthetics/browser_tests/actions#a-global-variable