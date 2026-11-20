---
aliases:
- /fr/developers/faq/access-your-support-ticket
- /fr/account_management/faq/access-your-support-ticket
- /fr/account_management/guide/access-your-support-ticket
description: Apprenez à créer et à gérer des tickets de support Datadog, y compris
  sur le portail de support GovCloud.
further_reading:
- link: /getting_started/support/
  tag: Documentation
  text: Premiers pas avec le support Datadog
title: Gérez vos tickets de support
---
<div class="alert alert-info">Sélectionnez votre site Datadog pour voir les instructions relatives à votre portail de support.</div>

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

## Créez un ticket de support {#create-a-support-ticket}

Pour créer un nouveau ticket de support, accédez au [site de support Datadog][1]. En bas de la page, cliquez sur **Créer un nouveau ticket** pour remplir un formulaire de ticket.

Vous pouvez également accéder à ce formulaire via Datadog. Depuis la navigation de gauche, survolez **Aide** et cliquez sur **Support**. Alternativement, accédez à la [page d'aide Datadog][2] et cliquez sur **Nouveau ticket de support**.

## Accédez aux tickets existants {#access-existing-tickets}

Si vous avez ouvert au moins un ticket d'assistance Datadog, procédez comme suit pour accéder à tous vos tickets d'assistance Datadog :

1. Depuis la [page de support][1], cliquez sur **Se connecter** en haut à droite.
1. S'il s'agit de votre première connexion à votre compte Zendesk Datadog, cliquez sur **Nouveau sur votre compte Zendesk Datadog ? S'inscrire**.
1. Si vous avez déjà envoyé un e-mail au support Datadog, cliquez sur **Emailed us for support? Obtenez un mot de passe** et saisissez l'adresse e-mail que vous avez utilisée pour contacter le support Datadog.
1. Une fois que vous avez reçu le mot de passe par e-mail, connectez-vous et cliquez sur **Gérer vos tickets** pour voir vos demandes.
1. Si vous ne voyez pas la page **Mes activités** après vous être connecté, cliquez sur votre nom dans le coin supérieur droit, puis cliquez sur **Mes activités**.
1. Pour voir les tickets de toute votre organisation, soumettez une demande au support Datadog.

## Exigences relatives au mot de passe {#password-requirements}

Pour contribuer à assurer la sécurité de votre compte, tout mot de passe utilisé pour se connecter au portail de support Zendesk de Datadog doit répondre aux exigences suivantes :

- Complexité du mot de passe
   - Doit inclure au moins **12 caractères**.
   - Doit contenir **des lettres majuscules et minuscules (A-Z)**.
   - Doit inclure au moins **un chiffre (0-9)**.
   - Doit inclure au moins **un caractère spécial** (par exemple, `!`, `@`, `#` ou `%`).
   - Ne doit **pas ressembler à une adresse e-mail**.
   - Ne doit **pas inclure le mot « Zendesk »**.
- Séquences interdites
   - Les mots de passe ne peuvent pas contenir plus d'un certain nombre de lettres ou de chiffres consécutifs. Par exemple, si la limite est fixée à 4, le système rejette les mots de passe comme `admin12345`.
- Mots de passe précédents
   - Les utilisateurs ne peuvent pas réutiliser un certain nombre de leurs mots de passe précédemment utilisés.
- Politique d'expiration
   - Les mots de passe doivent être mis à jour au moins **tous les 90 jours**, ou chaque fois que le système le demande.
- Tentatives échouées et verrouillage
   - Les utilisateurs ont droit à un maximum de **5 tentatives** avant que le compte ne soit temporairement verrouillé.

## Dépannage {#troubleshooting}

### Erreur : Connexion refusée {#error-refused-to-connect}

**Les erreurs de connexion refusée** proviennent des paramètres de confidentialité qui bloquent les cookies tiers. Pour résoudre ce problème, assurez-vous que le navigateur autorise les cookies tiers provenant de Zendesk. Trouvez des instructions sur la façon de [Effacer, activer et gérer les cookies dans Chrome][3] dans l'aide de Google Chrome.

Si votre navigateur utilise des bloqueurs de publicités, désactivez-les pour voir si cela vous permet de vous connecter. Certains bloqueurs de publicités possèdent leur propre liste d'exceptions. Dans ce cas, ajoutez **datadog.zendesk.com** à la liste blanche.

### Le ticket n'est plus disponible {#ticket-is-no-longer-available}

Datadog supprime les tickets fermés, y compris leurs pièces jointes, 15 mois après leur dernière mise à jour.

Si vous avez besoin d'aide pour un problème connexe, vous pouvez ouvrir un nouveau ticket ou effectuer une recherche dans la documentation Datadog.

{{% /site-region %}}

{{% site-region region="gov,gov2" %}}

## Prérequis {#prerequisites}

Pour recevoir les codes de vérification d'inscription, les e-mails de réinitialisation de mot de passe et les e-mails de notification de cas, ajoutez le domaine `ddog-gov.com` à votre liste blanche d'e-mails. Cela inclut `help@ddog-gov.com` et `support@ddog-gov.com`.

## S'inscrire sur le portail {#register-on-the-portal}

Si vous êtes un nouvel utilisateur, suivez ces étapes pour créer un compte :

1. Accédez au [portail de support Datadog GovCloud][4].
1. Cliquez sur **Sign Up**.
1. Remplissez le formulaire d'inscription en utilisant l'adresse e-mail associée à votre compte Datadog GovCloud existant. Gardez cette page ouverte.
1. Dans un onglet de navigateur séparé, accédez à votre compte de messagerie. Ouvrez l'e-mail de vérification provenant de `help@ddog-gov.com` et copiez le code de vérification.
1. Dans le portail de support Datadog GovCloud, saisissez le code de vérification.
1. Cliquez sur **Vérifier**.

**Remarque** : Après l'inscription, votre nom d'utilisateur de connexion est votre adresse e-mail avec `.ddgov.support` ajouté (par exemple, `[name]@[domain].ddgov.support`). Utilisez ce nom d'utilisateur complet lors de la connexion.

## Créez un cas {#create-a-case}

Pour créer un cas :

1. Accédez au [portail de support Datadog GovCloud](https://govsupport.ddog-gov.com).
1. Connectez-vous avec le format de nom d'utilisateur `[name]@[domain].ddgov.support`.
1. Cliquez sur **Create a New Case**.
1. Remplissez le formulaire.
1. Cliquez sur **Submit & Upload Files**.
1. Facultatif : téléchargez des fichiers justificatifs. Les types de fichiers acceptés incluent `.txt`, `.csv`, `.xls`, `.xlsx`, `.doc`, `.otf`, `.yaml`, `.log`, `.conf`, `.tf`, `.zip`, `.pcap`, `.png` et `.jpeg`.
1. Cliquez sur **Submit**.

## Accédez aux cas existants {#access-existing-cases}

Si vous avez ouvert au moins un cas Datadog, suivez cette procédure pour accéder à vos cas :

1. Connectez-vous sur [le portail de support Datadog GovCloud][4].
1. Modifiez le filtre de **Recently Viewed** à **Cases** pour afficher tous les cas.
1. Cliquez sur **Case Number** ou **Subject** pour afficher les détails.

**Remarque** : Les anciens cas Zendesk ne sont pas migrés ; l'ancien Zendesk est en lecture seule.

## Dépannage {#troubleshooting-1}

### Impossible d'afficher les nouveaux cas {#cannot-see-new-cases}

Modifiez le filtre de **Recently Viewed** à **Cases**.

### Problèmes de connexion {#login-issues}

Assurez-vous que votre nom d'utilisateur complet inclut le suffixe `.ddgov.support`.

### Réinitialisation du mot de passe non reçue {#password-reset-not-received}

Cliquez sur **Forgot Your Password?** pour ouvrir la page **Reset Your Password**, puis saisissez votre nom d'utilisateur complet, y compris le suffixe `.ddgov.support`, dans le champ **Enter your username**. Si vous ne recevez toujours pas l'e-mail, ajoutez `ddog-gov.com` à votre liste d'expéditeurs autorisés.

### Nom d'utilisateur inconnu {#do-not-know-your-username}

Cliquez sur **Forgot Your Password?** > **Forgot your username?** > **Use Your Email Address**. Ce lien vous fait quitter le portail de support GovCloud et ouvre Salesforce Identity. Cette page est également intitulée **Reset Your Password**, mais son champ **Enter your email address** attend votre adresse e-mail professionnelle, et non votre nom d'utilisateur `.ddgov.support`.

### Erreur à l'enregistrement {#registration-error}

Votre compte existe peut-être déjà. Cliquez sur **Forgot Your Password?**, puis saisissez votre nom d'utilisateur complet, y compris le suffixe `.ddgov.support` (par exemple, `[name]@[domain].ddgov.support`), dans le champ **Enter your username**. Si vous ne parvenez toujours pas à accéder à votre compte, contactez `support@ddog-gov.com`.

{{% /site-region %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/
[2]: https://app.datadoghq.com/help
[3]: https://support.google.com/chrome/answer/95647
[4]: https://govsupport.ddog-gov.com