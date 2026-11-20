---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: Blog
  text: Présentation de l'authentification multifacteur dans les tests Synthetic de
    Datadog
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentation
  text: Découvrez les Passkeys dans les tests de navigateur
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentation
  text: Découvrez-en davantage sur les variables globales
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Comment j'ai aidé mon client à mettre à l'échelle ses tests de navigateur
    avec Datadog
title: Utilisez des mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification
  multifacteur (MFA) dans les tests de navigateur
---
## Présentation {#overview}

Les méthodes d'authentification multifacteur, telles que la TFA et la MFA, aident à protéger vos applications contre les accès non autorisés, mais elles peuvent rendre les fonctionnalités plus difficiles à tester.

Les variables globales MFA de Datadog Synthetic vous permettent de tester les modules MFA basés sur TOTP de votre application et les parcours utilisateur critiques sans désactiver les mesures de sécurité essentielles ni saisir manuellement des codes d'authentification avec des outils disparates. Vous n'avez pas besoin de créer ou de maintenir des environnements dédiés pour tester les parcours utilisateur utilisant la MFA.

**Remarque** : Datadog génère des TOTP avec l'algorithme SHA-1 et ne prend pas en charge les jetons utilisant d'autres algorithmes. Si votre jeton TOTP fonctionne dans Google Authenticator, il est probablement compatible avec Datadog.


## Stockez votre clé secrète ou votre code QR dans une variable globale {#store-your-secret-key-or-qr-code-in-a-global-variable}

Créez une variable globale dans laquelle vous saisissez une clé secrète ou importez un code QR fourni par votre fournisseur d'authentification. Dans l'onglet {{< ui >}}Global Variables{{< /ui >}} de votre page {{< ui >}}Settings{{< /ui >}}, cliquez sur {{< ui >}}Create Global Variable{{< /ui >}}.
1. Dans {{< ui >}}Choose variable type{{< /ui >}}, sélectionnez {{< ui >}}MFA Token{{< /ui >}}.
2. Dans {{< ui >}}Define variable{{< /ui >}}, saisissez un {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut contenir que des lettres majuscules, des chiffres et des traits de soulignement.
3. Saisissez un {{< ui >}}Description{{< /ui >}} pour votre variable (facultatif).
4. Sélectionnez {{< ui >}}Tags{{< /ui >}} à associer à votre variable (facultatif).
5. Suivez la documentation de votre application d'authentification pour obtenir des instructions sur la création d'une clé secrète ou l'ajout d'un nouveau code QR.
6. Saisissez la {{< ui >}}Secret Key{{< /ui >}} dans votre variable ou téléversez une image de code QR.

    **Remarque** : Lorsque vous importez un code QR, Datadog ne lit que la clé secrète. Si votre fournisseur utilise une longueur de code ou une période d'actualisation différente, définissez-les à l'étape 7.

7. (Facultatif) Pour utiliser une longueur de code ou une période d'actualisation différente, développez {{< ui >}}Advanced Options{{< /ui >}} sous {{< ui >}}Generate the OTP{{< /ui >}} et ajustez les valeurs.
8. Cliquez sur {{< ui >}}\+ Generate{{< /ui >}} pour créer un TOTP. Vous pouvez copier le TOTP généré avec l'icône {{< ui >}}Copy{{< /ui >}}.
9. Dans {{< ui >}}Permissions settings{{< /ui >}}, restreignez l'accès à votre variable en fonction des rôles dans votre organisation. Pour plus d'informations sur les rôles, consultez la [documentation RBAC][1].

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Créer un jeton MFA" style="width:100%;" >}}

## Utilisez le TOTP dans vos tests Synthetic {#use-totp-in-your-synthetic-tests}
Vous pouvez utiliser la clé secrète ou le code QR stocké dans une variable globale dans tous vos tests Synthetic. Lors de la création d'un [test de navigateur][2], injectez le TOTP généré à partir de la clé secrète ou du code QR stocké dans la variable globale pour vérifier le workflow d'authentification de votre application.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Enregistrement d'une validation TOTP" video="true" >}}

Pour utiliser le TOTP dans vos [tests de navigateur][2] :

1. Importez votre variable globale.
2. Lors de l'enregistrement de votre test, cliquez sur l'icône {{< ui >}}Hand{{< /ui >}} pour générer un TOTP. 
3. Dans l'application ouverte dans votre navigateur de test, cliquez dans un champ pour y coller le TOTP. L'injection du code calculé dans votre test crée une étape de test supplémentaire. 
4. Après avoir enregistré vos étapes de test, cliquez sur {{< ui >}}Save & Launch Test{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /fr/synthetics/browser_tests/