---
title: Utiliser les tests Synthetic pour surveiller une application nécessitant une connexion
kind: guide
further_reading:
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: Créer des étapes de test Browser
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: Blog
    text: Pratiques recommandées pour la création de tests de bout en bout
---
Il se peut que vous cherchiez à surveiller les parcours utilisateur qui nécessitent une connexion. Il existe deux façons de faire en sorte que vos tests Browser Datadog réussissent le processus de connexion sur votre application afin d'effectuer la validation sur les pages réservées aux utilisateurs identifiés :

- [Ajouter les étapes de connexion à votre enregistrement](#include-the-login-steps-in-your-recording)
- [Tirer parti des options de configuration des tests Browser](#leverage-browser-test-configuration-options)

Vous pouvez également vous assurer que vos identifiants sont stockés et obfusqués de façon sécurisée dans l'application [à l'aide de variables globales sécurisées](#sécurite-du-compte).

<div class="alert alert-info">Vous souhaitez tester les applications qui nécessitent une authentification multifacteur ? Consultez la <a href="/synthetics/guide/app-that-requires-login/#authentification-multifacteur" target="_blank">section ci-dessous</a> et <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">donnez-nous votre avis</a> pour nous aider à prendre en charge les systèmes qui comptent le plus pour vos équipes.</div>

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

Si votre site web utilise une connexion avec authentification unique, définissez l'URL de départ de votre test Browser sur l'URL de votre application. Le test effectue les redirections requises dans le cadre de la première étape **d'accès à l'URL**.

Certains fournisseurs d'authentification unique peuvent détecter Datadog comme un bot et empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, contactez votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques, ou autres) afin que vous puissiez réaliser vos tests.

Il est également possible d'ignorer les principes d'authentification unique et d'utiliser un nom d'utilisateur et un mot de passe normaux pour effectuer la connexion.

### Authentification multifacteur

Les tests Browser peuvent reproduire les actions qu'un utilisateur normal peut effectuer dans son navigateur Chrome. Si vous effectuez l'étape d'authentification multifacteur (double ou triple authentification) dans un navigateur Chrome, vous pouvez l'enregistrer lors de la configuration de votre test Browser. Certains fournisseurs d'authentification multifacteur peuvent détecter Datadog comme un bot et empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, contactez votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques, ou autres) afin que vous puissiez réaliser vos tests.

Si votre processus d'authentification multifacteur implique de réaliser des étapes en dehors du navigateur, par exemple de recevoir un message vocal ou un SMS ou encore d'ouvrir une application mobile, contactez votre fournisseur d'authentification multifacteur. Demandez-lui s'il est possible de modifier vos réglages ou de désactiver l'authentification multifacteur lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques, ou autres) afin que vous puissiez réaliser vos tests.
Selon le type d'authentification multifacteur utilisé par votre application, des [étapes JavaScript][4] peuvent vous permettre de contourner ce problème.

<div class="alert alert-info">Nous développons constamment de nouvelles fonctionnalités pour vous aider à enregistrer vos scénarios de test plus facilement. Aidez-nous à prendre en charge les systèmes à authentification multifacteur qui comptent le plus pour vous en nous <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">donnant votre avis</a>.</div>

## Tirer parti des options de configuration des tests Browser

La seconde façon de garantir que vos tests Browser Datadog peuvent se connecter à vos applications consiste à utiliser les configurations de test Browser disponibles. Vous pouvez notamment appliquer :

- Des en-têtes spécifiques
- Des cookies
- Des identifiants d'authentification basique ou NTLM

Ces configurations sont appliquées à chaque exécution de test et vous permettent ainsi de commencer à enregistrer vos étapes directement après la connexion.

{{< img src="synthetics/guide/app_that_requires_login/browser_test_conf.png" alt="Tirer parti des options de configuration des tests Browser">}}

## Sécurité du compte

### Sécuriser vos données d'authentification

Stockez vos identifiants sous la forme de [variables globales][5] (par exemple, une variable globale pour le nom d'utilisateur et une pour le mot de passe) et sécurisez ces variables. Leurs valeurs seront ainsi obfusquées et ne pourront pas être consultées par tout utilisateur ayant accès à votre instance Datadog.

Après avoir créé les variables sécurisées, vous pouvez [importer ces variables globales][6] dans vos tests Browser et les utiliser pour vos étapes de connexion.

**Remarque** : bien que les variables globales de Datadog soient stockées et chiffrées de façon sécurisée, nous vous recommandons fortement d'utiliser un compte dédié au testing, avec des identifiants fictifs, pour réaliser vos tests.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions/
[2]: /fr/synthetics/browser_tests/actions/#subtests
[3]: /fr/synthetics/guide/identify_synthetics_bots/
[4]: /fr/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[5]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[6]: /fr/synthetics/browser_tests/actions#a-global-variable
