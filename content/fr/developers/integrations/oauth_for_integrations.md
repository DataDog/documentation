---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/oauth_for_integrations.md
title: OAuth pour les intégrations
---
{{< callout btn_hidden="true" >}}
  La plateforme de développement Datadog est encore en version bêta. Si vous n'y avez pas accès, envoyez un e-mail à l'adresse apps@datadoghq.com.
{{< /callout >}} 

## Présentation

OAuth permet aux intégrations tierces d'accéder à certains contextes de données des utilisateurs dans Datadog, sous réserve que ces derniers l'aient autorisé. Ainsi, ces intégrations peuvent transférer des données vers Datadog ou y extraire des données. Par exemple, si un utilisateur permet à une intégration d'accéder en mode Read à ses monitors Datadog, celle-ci peut directement lire et extraire les données de ces monitors.

Pour en savoir plus sur l'implémentation du protocole OAuth de Datadog, consultez la [documentation relative à OAuth2 dans Datadog][1].

## Utiliser OAuth dans une intégration

OAuth permet aux clients de Datadog d'autoriser facilement des plateformes tierces à accéder à leurs données sans risque, et ce sans avoir à saisir leurs clés d'API ou d'application. Vous pouvez utiliser OAuth avec des intégrations existantes, ou le configurer dans le cadre du développement de nouvelles intégrations.  

Lors de la création d'une intégration avec OAuth, vous pouvez sélectionner les contextes précis des données auxquels votre application doit accéder et le client peut autoriser l'accès aux contextes granulaires que vous avez demandés. Même si les contextes facultatifs ne sont pas pris en charge, l'application peut accéder à tous les contextes demandés par une intégration dès lors qu'un client l'autorise.

## Créer une nouvelle intégration avec OAuth

Cette section décrit les étapes à suivre pour créer une nouvelle intégration et ajouter un carré sur la page [Marketplace][2] ou [Integrations][3]. Si vous partez d'une intégration existante ou que vous en créez une nouvelle et que vous souhaitez l'ajouter à un carré existant sur l'une de ces pages, consultez la section [Ajouter OAuth à une offre existante](#ajouter-oauth-a-une-offre-existante).

### Créer une application d'après un modèle

1. Accédez à la [Plateforme de développement Datadog][4] et cliquez sur **+New App**.

   Vous devez créer une application pour chaque client OAuth de l'intégration. Une fois votre intégration publiée, Datadog va associer cette application à cette intégration.

2. Sélectionnez **Blank App** et nommez votre application.
3. Cliquez sur **Create**.
4. Dans l'onglet **Basic Information**, renseignez les champs présents dans la vue détaillée.
5. Une fois prêt à publier votre client OAuth, cliquez sur **Mark Stable**.
6. Cliquez sur **Save**.

### Créer un client OAuth

Le client OAuth est le composant d'une application. Les utilisateurs l'utilisent pour autoriser l'application à accéder aux données client dans Datadog. Pour obtenir un accès aux données concernées, le client doit disposer du token d'accès approprié.

1. Accédez à l'onglet **OAuth & Permissions** sous **Features** et cliquez sur **Create OAuth Client**.

   Les clients OAuth créés pour les intégrations sont appelés des **clients confidentiels**. Leur rôle est de fournir un ID client et un secret client. Le client créé à cette étape correspond à une version privée du client, dont les identifiants peuvent être utilisés à des fins de tests. Lorsque ce client sera publié, vous recevrez de nouveaux identifiants. **Une fois le client créé, ces identifiants ne seront plus jamais affichés. Par conséquent, assurez-vous de les stocker en lieu sûr.**

2. Saisissez les informations relatives à votre client comme son nom, sa description, les URI de redirection et l'URL d'intégration.
3. Configurez les contextes du client OAuth en les recherchant et en cochant leurs cases dans la colonne **Requested**.

   Les contextes indiquent les types de données auxquelles votre application peut accéder dans le compte Datadog du client. Votre intégration peut ainsi accéder aux contextes requis. Ne demandez que le nombre minimum de contextes requis pour votre cas d'utilisation, car vous pouvez en ajouter d'autres ultérieurement si besoin est.

   Pour soumettre des données dans Datadog, vous devez sélectionner le contexte `api_keys_write`. Ce contexte est privé et n'est approuvé que pour les partenaires d'intégration. Il vous permet de créer, au nom de l'utilisateur, une clé d'API que vous pouvez utiliser pour transférer des données vers Datadog.

4. Cliquez sur **Save Changes**.
5. Après avoir créé un client OAuth et lui avoir attribué des contextes, vous pouvez implémenter le protocole OAuth de l'extension PKCE dans votre intégration, terminer le flux d'octroi des codes d'autorisation et commencer à écrire le code d'intégration en utilisant les endpoints disponibles via OAuth.

   Dans le flux d'octroi des codes d'autorisation, vous allez recevoir un code d'autorisation et un token d'actualisation. Vous pourrez utiliser le code pour accéder aux données que vous souhaitez extraire de Datadog, et ce, après l'avoir échangé contre un token d'accès.

   Pour en savoir plus sur l'implémentation du protocole OAuth avec Datadog, consultez la rubrique [OAuth2 dans Datadog][1]. Pour en savoir plus sur la création et la publication d'une intégration, consultez la [Documentation dédiée au développement d'intégrations][5].

6. Testez le protocole OAuth en cliquant sur **Test Authorization** sur la page Details de votre client. Vous allez alors être redirigé vers l'URL d'intégration, ce qui va lancer le flux d'autorisation suivi par un client.

   Avant que votre client ne soit publié, seuls les membres de votre organisation Datadog peuvent octroyer des autorisations à votre client pendant la phase de test.

7. Pour vous assurer que OAuth fonctionne correctement, envoyez une demande à l'endpoint `marketplace_create_api` en utilisant votre token comme en-tête de la demande.

   Si c'est le cas, vous recevrez une clé d'API. Vous devez alors enregistrer cette clé en toute sécurité afin de pouvoir l'utiliser pour transmettre des données à Datadog au nom de l'utilisateur. **Vous ne pouvez plus accéder à la clé d'API ayant cette valeur après avoir obtenu la réponse à votre demande initiale**.

8. Vérifiez que votre client OAuth fonctionne sur plusieurs [sites Datadog][8] en octroyant les autorisations requises à partir d'un compte Datadog qui n'est pas US1  :
   - Si vous n'avez pas accès à un compte sandbox sur un autre site, envoyez un e-mail à l'adresse `marketplace@datadog.com`.
   - Exportez le manifeste de votre application depuis le compte du site Datadog *original*. Pour cela, ouvrez l'application que vous avez créée dans la plateforme de développement, cliquez sur l'icône en forme d'engrenage en haut à droite, puis cliquez sur **Export App Manifest**.
   - Dans votre compte sur le *nouveau* site Datadog, accédez à la plateforme de développement et importez le manifeste de votre application à partir de l'étape 2.
   - Une fois votre manifeste importé, ouvrez l'onglet **OAuth & Permissions** et cherchez votre client OAuth, ainsi que son ID et sa clé secrète client. Utilisez ces identifiants pour tester l'autorisation à partir de ce site.

9. Testez tous les contextes supplémentaires dont vous avez demandé l'accès.

### Publier le client OAuth

Pour publier un client OAuth, vous devez d'abord ouvrir une pull request pour votre intégration dans le référentiel GitHub [`integrations-extras`][5] ou [Marketplace][6].

Dans le cadre de votre pull request, ajoutez la section **uninstallation**  qui inclut les instructions suivantes (ainsi que toute instruction personnalisée que vous souhaitez ajouter) dans votre fichier README,  sous `## Setup`  :

- Une fois cette intégration désinstallée, toutes les autorisations précédentes sont révoquées.
- Vérifiez également que toutes les clés d'API associées à cette intégration ont été désactivées en recherchant son nom dans la [page API Keys][10].


Pour démarrer le processus de publication dans la [Plateforme de développement][4] :

1. Accédez à l'onglet **Publishing** sous **General**. À l'étape 1 du flux de publication, vous allez recevoir la version publiée de votre ID et clé secrète client. Durant l'étape 2, vous pouvez saisir des informations supplémentaires sur votre intégration et obtenir la valeur `app_uuid` publiée à utiliser à l'étape ci-dessous.

   Enregistrez votre ID client, clé secrète client et `app_uuid` dans un endroit sécurisé.

2. Au moment d'ouvrir une pull request pour une **nouvelle intégration** dans `integrations-extras` ou `Marketplace`, utilisez la valeur `app_uuid` du client publié dans le champ `app_uuid` du fichier `manifest.json`. Si les valeurs `app_uuid` ne correspondent pas, cela signifie que votre application n'a pas été correctement publiée. Si vous avez une **intégration existante**, il n'est pas nécessaire de mettre à jour `app_uuid`.

Étant donné que vous ne pouvez pas modifier directement un client OAuth publié, n'utilisez le flux de publication que lorsque tout a été testé et qu'aucun problème n'est constaté. Pour mettre à jour le client OAuth, vous devez réutiliser le flux de publication. **Les identifiants du client publié ne seront plus accessibles**.

Pour en savoir plus sur le processus de publication des intégrations, consultez la [documentation dédiée à Marketplace et aux intégrations][7].

## Ajouter OAuth à une offre existante

Le processus pour ajouter un client OAuth à une intégration existante reprend celui décrit ci-dessus, mais avec quelques différences clés.

### Si vous avez une intégration existante qui n'est pas connectée à une UI Extension

Suivez les [étapes](#creer-une-nouvelle-intégration-avec-oauth) ci-dessus et assurez-vous d'ouvrir une pull request pour ajouter de nouvelles instructions de désinstallation à votre carré d'intégration.

Vous n'avez pas besoin de modifier votre `app_uuid` dans le fichier `manifest.json` si vous avez déjà une intégration.

### Si vous avez une intégration existante qui est connectée à une UI Extension (utilise le même carré)

Au lieu de créer une application, accédez à celle qui possède la version publiée de votre Extension Interface utilisateur dans la plateforme de développement et suivez les [étapes] (#créer-un-client-oauth) restantes.

Une fois que vous avez créé le client OAuth de votre intégration et que vous êtes prêt à le publier, cliquez sur **Edit** dans votre application et accédez à l'onglet **Publishing** sous **General**. N'oubliez pas également d'ouvrir une pull request pour ajouter de nouvelles instructions de désinstallation à votre carré.

**Remarque** : vous n'avez pas besoin de modifier votre `app_uuid` dans le fichier `manifest.json` si vous avez déjà une intégration ou une UI Extension.

### Si vous avez une UI Extension publiée et que vous souhaitez ajouter une intégration au même carré

Au lieu de créer une application, accédez à celle qui possède la version publiée de votre Extension Interface utilisateur dans la plateforme de développement et suivez les [étapes] (#créer-un-client-oauth) restantes.

Ouvrez une pull request pour ajouter à votre carré des informations sur votre intégration, y compris les dernières versions du fichier README, du dossier d'images, etc. Ajoutez un lien vers cette pull request pendant le processus de publication.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [OAuth 2.0 dans Datadog][1]
- [Autoriser vos intégrations Datadog avec OAuth][11]

[1]: https://docs.datadoghq.com/fr/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/fr/developers/marketplace/#develop-your-offering
[8]: https://docs.datadoghq.com/fr/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://www.datadoghq.com/blog/oauth/