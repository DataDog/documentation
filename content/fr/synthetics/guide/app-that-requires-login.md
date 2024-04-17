---
description: Découvrez la marche à suivre pour que vos tests Browser Synthetic se
  connectent à vos applications.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de tests de bout en bout
- link: /synthetics/guide/browser-tests-totp
  tag: Documentation
  text: Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification
    multifacteur dans des tests Browser
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentation
  text: En savoir plus sur les clés d'accès dans des tests Browser
- link: /synthetics/browser_tests/actions
  tag: Documentation
  text: En savoir plus sur les étapes des tests Browser
kind: guide
title: Surveiller une application qui nécessite une authentification avec des tests
  Browser
---

## Présentation

<div class="alert alert-info">Vous souhaitez tester des applications qui nécessitent une authentification multifacteur ? Consultez la <a href="/synthetics/guide/app-that-requires-login/#authentification-multifacteur" target="_blank">rubrique Authentification multifacteur</a> et <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">donnez-nous votre avis</a> pour nous aider à prendre en charge les systèmes qui comptent le plus pour vos équipes.</div>

Il se peut que vous cherchiez à surveiller les parcours utilisateur qui nécessitent une connexion. Vous pouvez adopter les deux approches suivantes pour vérifier que vos tests Browser Datadog accomplissent les différentes étapes de connexion sur votre application, afin d'effectuer la validation sur les pages réservées aux utilisateurs identifiés :

- [Ajouter les étapes de connexion à votre enregistrement de test Browser](#ajouter-les-etapes-de-connexion-a-votre-enregistrement)
- [Tirer profit des options avancées des tests Browser](#tirer-profit-des-options-de-configuration-des-tests-browser)

Pour vous assurer que vos identifiants sont stockés et obfusqués de façon sécurisée dans l'application, utilisez des [variables globales obfusquées](#securite-du-compte).

## Ajouter les étapes de connexion à votre enregistrement

Cette première méthode consiste à enregistrer les étapes requises pour se connecter au début de vos tests Browser : saisie de votre nom d'utilisateur, saisie de votre mot de passe et clic sur le bouton de connexion. Vous pouvez ensuite [lancer l'enregistrement des étapes ultérieures][1]. Lors de son exécution, le test Browser lance systématiquement les premières étapes de connexion avant le reste des instructions.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="Démonstration de l'enregistrement d'une connexion">}}

Par défaut, l'iframe ou la fenêtre de l'outil d'enregistrement utilise votre propre navigateur. Si vous commencez l'enregistrement alors que vous êtes déjà connecté à votre application, il est possible que l'iframe ou la fenêtre affiche directement la page qui suit l'écran de connexion, ce qui vous empêche alors d'enregistrer vos étapes de connexion sans vous déconnecter au préalable.

Pour enregistrer vos étapes de connexion sans vous déconnecter de votre application, utilisez le mode navigation privée de l'outil d'enregistrement.

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="Démonstration de l'enregistrement d'une connexion avec la navigation privée">}}

L'ouverture d'une fenêtre en mode navigation privée vous permet de démarrer l'enregistrement de votre test depuis l'URL de départ configurée, et d'utiliser une session entièrement distincte de la session principale de votre navigateur sans accès aux données utilisateur. La fenêtre de navigation privée qui s'ouvre ignore toutes vos anciennes données de navigation, y compris les cookies et données locales. Ainsi, vous êtes automatiquement déconnecté de votre compte et pouvez enregistrer vos étapes de connexion comme si vous consultiez votre site pour la première fois.

**Remarque** : utilisez [la fonctionnalité de sous-test][2] pour regrouper vos étapes de connexion au sein d'un unique sous-test pouvant être réutilisé dans n'importe quel test Browser nécessitant une connexion.

### Connexion avec authentification unique

Si votre site web utilise une connexion avec authentification unique, définissez l'URL de départ de votre test Browser sur l'URL de votre application. Le test effectue les redirections requises dans le cadre de la première étape **d'accès à l'URL**.

Certains fournisseurs d'authentification unique peuvent identifier les tests Browser Datadog comme des bots et empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, envisagez de contacter votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques) à des fins de testing.

Il est également possible d'ignorer les principes d'authentification unique et d'utiliser un nom d'utilisateur et un mot de passe normaux pour effectuer la connexion.

### Clés d'accès
La surveillance Synthetic Datadog prend en charge les [clés d'accès][4]. Il s'agit d'un outil de sécurité qui permet de contrer toutes les tentatives de phishing, de vol de mot de passe et d'attaque par rejeu.

Créez une variable globale d'authentificateur virtuel et importez-la dans votre test. Enregistrez ensuite des étapes comportant des clés d'accès dans le navigateur.

### Authentification multifacteur

La surveillance Synthetic Datadog prend en charge les [mots de passe à usage unique basés sur le temps (TOTP)][5]. Il s'agit d'une méthode d'authentification multifacteur qui combine la clé d'un secret et l'heure actuelle pour générer un mot de passe unique.

Les tests Browser peuvent reproduire toutes les actions qu'un utilisateur normal effectue dans son navigateur. Lors de la configuration de votre test, enregistrez des étapes d'authentification multifacteur (y compris la double authentification) au sein du navigateur.

Certains fournisseurs d'authentification multifacteur peuvent identifier les tests Browser Datadog comme des bots et empêcher la connexion, par exemple en ajoutant un reCAPTCHA. Dans ce cas, contactez votre fournisseur afin de déterminer s'il est possible de désactiver la détection des bots lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques).

Si votre processus d'authentification multifacteur implique de réaliser des étapes en dehors du navigateur (par exemple, de recevoir un message vocal ou un SMS ou encore d'ouvrir une application mobile qui n'utilise pas les TOTP), envisagez de contacter votre fournisseur d'authentification multifacteur. Demandez-lui s'il est possible de modifier vos réglages ou de désactiver l'authentification multifacteur lors de l'[identification des requêtes provenant des tests Browser Synthetic][3] (par exemple, pour un ensemble d'identifiants ou d'en-têtes de tests Synthetic spécifiques, ou autres) à des fins de testing.
Selon le type d'authentification multifacteur de votre application, des [étapes JavaScript][6] peuvent vous permettre de contourner ce problème.

<div class="alert alert-info">Datadog développe constamment de nouvelles fonctionnalités pour vous aider à enregistrer vos scénarios de test plus facilement. N'hésitez pas à <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">partager avec nous</a> les systèmes à authentification multifacteur qui comptent le plus pour vous.</div>

## Tirer parti des options de configuration des tests Browser

La seconde façon de garantir que vos tests Browser Datadog peuvent se connecter à vos applications consiste à utiliser les configurations de test Browser disponibles. Vous pouvez notamment appliquer :

- Des en-têtes spécifiques
- Cookies
- Des identifiants d'authentification Basic, d'authentification Digest ou NTLM

Ces options de configuration sont définies à chaque exécution de test. Elles s'appliquent à toutes les étapes de votre test Browser lors de son exécution, et non lors de son enregistrement.

Vous pouvez appliquer manuellement ces en-têtes, cookies et identifiants configurés sur la page à partir de laquelle vous enregistrez votre test, puis enregistrer les étapes de votre test après la connexion. Par défaut, le test Browser effectue automatiquement l'authentification avec les en-têtes, cookies et/ou identifiants spécifiés lors de l'exécution, puis réalise toutes les étapes enregistrées.

{{< img src="synthetics/guide/app_that_requires_login/bt_adv_options.jpg" alt="Connexion à votre application avec les options de configuration des tests Browser">}}

## Sécurité du compte

### Sécuriser vos données d'authentification

Stockez vos identifiants sous la forme de [variables globales][7] (par exemple, une variable globale pour le nom d'utilisateur et une pour le mot de passe) et sélectionnez **Hide and obfuscate variable value** pour ne pas afficher leurs valeurs dans les résultats de test. Il est possible de limiter dans un test Browser les personnes capables d'accéder à votre instance de Datadog.

Après avoir créé les variables obfusquées, vous pouvez [importer ces variables globales][8] dans vos tests Browser et les utiliser pour vos étapes de connexion.

**Remarque** : bien que les variables globales de Datadog soient stockées et chiffrées de façon sécurisée, nous vous recommandons fortement d'utiliser un compte dédié au testing, avec des identifiants fictifs, pour réaliser vos tests.

Pour en savoir plus sur la sécurité de votre compte, consultez la section [Sécurité des données liées à la surveillance Synthetic][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions/
[2]: /fr/synthetics/browser_tests/actions/#subtests
[3]: /fr/synthetics/guide/identify_synthetics_bots/
[4]: /fr/synthetics/guide/browser-tests-passkeys
[5]: /fr/synthetics/guide/browser-tests-totp
[6]: /fr/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[7]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /fr/synthetics/browser_tests/actions#a-global-variable
[9]: /fr/data_security/synthetics