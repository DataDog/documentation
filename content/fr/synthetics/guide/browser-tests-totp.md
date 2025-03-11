---
title: Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur dans des tests Browser

further_reading:
  - link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
    tag: Blog
    text: Présentation de l'authentification multifacteur dans des tests Synthetic Datadog
  - link: synthetics/settings/?tab=specifyvalue#variables-globales
    tag: Documentation
    text: En savoir plus sur les variables globales
  - link: synthetics/browser_tests/actions/
    tag: Documentation
    text: En savoir plus sur les étapes des tests Browser
---
## Présentation

Les processus d'authentification multifacteur (2FA ou MFA, par exemple) protègent vos applications contre les accès non autorisés. Toutefois, ces processus peuvent complexifier les fonctionnalités de test.

Les variables globales MFA Synthetic Datadog vous permettent de tester les parcours utilisateurs essentiels et les modules MFA basés sur un TOTP de votre application, sans avoir à désactiver certaines mesures de sécurité primordiales ni à saisir manuellement des codes d'authentification dans divers outils. Il n'est pas nécessaire de créer ni de gérer des environnements dédiés pour tester des parcours utilisateur avec un processus MFA.

## Stocker votre clé de secret ou votre code QR dans une variable globale

Créez une variable globale et ajoutez-y votre clé de secret ou un code QR fourni par votre fournisseur d'authentification. Dans l'onglet **Global Variables** de votre page **Settings**, cliquez sur **Create Global Variable**.
1. Sous **Choose variable type**, sélectionnez **MFA Token**.
2. Sous **Define variable**, saisissez un **nom de variable**. Votre nom de variable peut uniquement contenir des lettres majuscules, des chiffres et des underscores.
3. Saisissez une **description** pour votre variable (facultatif).
4. Sélectionnez les **tags** à associer à votre variable (facultatif).
5. Saisissez la **clé du secret** de votre variable ou importez une image de code QR.
6. Cliquez sur **+ Generate** pour créer un TOTP. Vous pouvez copier le mot de passe généré à l'aide de l'icône **Copier**.
7. Sous **Permissions settings**, limitez l'accès à votre variable à certains rôles de votre organisation. Pour en savoir plus sur les rôles, consultez la [documentation relative au RBAC][1].
<div class="alert alert-warning">
La fonctionnalité de restriction d'accès RBAC aux variables globales est disponible en version bêta. Pour en bénéficier, contactez <a href="https://docs.datadoghq.com/help/">l'assistance Datadog</a>.</div>

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Créer un token MFA" style="width:100%;" >}}

## TOTP dans des tests Synthetic
Vous pouvez utiliser la clé du secret ou le code QR stocké dans une variable globale dans l'ensemble de vos tests Synthetic. Lors de la création d'un test Browser ou API, injectez le TOTP généré depuis la clé du secret ou le code QR stocké dans la variable globale afin de vérifier le workflow d'authentification de votre application.

Pour utiliser un TOTP dans vos tests Browser :
1. Importez votre variable globale.
2. Lors de l'enregistrement de votre test, cliquez sur l'icône en forme de **main** pour générer un TOTP.
3. Dans l'application de votre test Browser, cliquez sur un champ pour coller le TOTP. L'injection du code calculé dans votre test crée automatiquement une nouvelle étape.
4. Une fois vos étapes enregistrées, cliquez sur **Save & Launch Test**.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Enregistrer une validation de TOTP" video="true" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles