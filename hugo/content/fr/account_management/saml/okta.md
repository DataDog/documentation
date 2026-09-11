---
description: Configurez Okta comme fournisseur d'identité SAML pour Datadog avec SSO
  initié par l'IdP ou le SP, approvisionnement JIT et configuration du mappage des
  rôles.
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer vos équipes et organisations avec plusieurs comptes
title: Configuration du fournisseur d'identité SAML Okta
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Sur le site {{< region-param key='dd_site_name' >}}, vous devez configurer manuellement l'application Datadog dans Okta en suivant les <a href='/account_management/faq/okta/'>instructions héritées</a>. Ignorez les instructions de cette page concernant l'application Datadog préconfigurée dans le catalogue d'applications Okta.
</div>
{{% /site-region %}}

## Présentation

Cette page explique comment configurer l'application Datadog dans Okta.

Avant de commencer, assurez-vous d'utiliser la dernière version de l'application Datadog :
1. Dans Okta, cliquez sur **Applications**.
1. Ouvrez l'application Datadog.
1. Sélectionnez l'onglet **General**.
1. Recherchez un champ intitulé **SSO Base URL**.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Configuration de l’application Datadog dans Okta, avec la base SSO URL en surbrillance" style="width:80%;" >}}

Si vous ne voyez pas le champ SSO Base URL, configurez Okta en suivant les [instructions héritées][1].

## Fonctionnalités prises en charge

L'intégration SAML Okta pour Datadog prend en charge les éléments suivants :
- SSO initié par l'IdP
- SSO initié par le SP
- Approvisionnement JIT

Pour la définition de ces termes, consultez le [glossaire Okta][2].

## Configuration

Configurez Okta comme fournisseur d'identité SAML (IdP) pour Datadog en suivant les instructions ci-dessous. La configuration nécessite d'alterner entre vos comptes Okta et Datadog.

### Ajouter l'intégration Datadog dans Okta

1. Connectez-vous à votre tableau de bord d'administration Okta.
1. Dans le menu de gauche, cliquez sur **Applications**.
1. Cliquez sur **Browse App Catalog**.
1. Utilisez la barre de recherche pour trouver « Datadog ».
1. Sélectionnez l'application Datadog pour SAML et SCIM.
1. Cliquez sur **Add Integration**. La boîte de dialogue General Settings s'affiche.
1. Renseignez le champ **SSO Base URL** avec votre [URL de site Datadog][3].
1. Cliquez sur **Done**.

**Remarque :** le champ SSO Base URL accepte les sous-domaines personnalisés si vous n'utilisez pas une URL Datadog standard.

Ensuite, téléchargez les métadonnées à importer dans Datadog :
1. Depuis la boîte de dialogue des paramètres de l'application Datadog dans Okta, cliquez sur l'onglet **Sign on**.
1. Faites défiler jusqu'à **Metadata URL**.
1. Cliquez sur **Copy**.
1. Ouvrez un nouvel onglet de navigateur et collez l'URL dans la barre d'adresse.
1. Utilisez votre navigateur pour enregistrer le contenu de cette URL au format XML.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Configuration Sign on dans Okta" style="width:80%;" >}}

### Configurer Datadog

#### Importer les métadonnées

1. Accédez à [Login Methods][4] dans les paramètres de l'organisation.
1. Dans la section SAML, cliquez sur **Configure** ou **Update**, selon si vous avez déjà configuré SAML. La page de configuration SAML s'affiche.
1. Cliquez sur **Choose File**, puis sélectionnez le fichier de métadonnées précédemment téléchargé depuis Okta.

{{< img src="account_management/saml/okta/choose_file.png" alt="Configuration SAML dans Datadog, bouton de téléversement des métadonnées en surbrillance" style="width:100%;" >}}

#### Activer la connexion initiée par l'IdP

Pour que l'application Datadog fonctionne correctement, vous devez activer la connexion initiée par l'IdP.

<div class="alert alert-info">Une fois la connexion initiée par l'IdP activée, les utilisateurs peuvent se connecter à Datadog depuis Okta</div>

Pour activer la connexion initiée par l'IdP, effectuez les étapes suivantes :
1. Accédez à la [page de configuration SAML][5].
1. Sous **Additional Features**, cochez la case **Identity Provider (IdP) Initiated Login**. Le composant affiche l'**Assertion Consumer Service URL**.
1. Le contenu de l'Assertion Consumer Service URL après `/saml/assertion` correspond à l'identifiant de votre entreprise. Saisissez cette valeur avec le préfixe `/id/` dans Okta pour finaliser votre configuration.
1. Cliquez sur **Save Changes**.

{{< img src="account_management/saml/okta/company_id.png" alt="Configuration SAML dans Datadog, mettant en évidence l'identifiant de l'entreprise dans l'URL du service consommateur d'assertion" style="width:100%;" >}}

Revenez dans Okta pour effectuer l'étape suivante de la configuration.

### Ajouter l'identifiant de l'entreprise dans Okta

1. Retournez au dashboard d'admin d'Okta.
1. Sélectionnez l'onglet **Sign on**.
1. Cliquez sur **Edit**.
1. Descendez jusqu'à la section **Advanced Sign-on Settings**.
1. Collez l'identifiant complet de votre entreprise, y compris le préfixe `/id/`, dans le champ **Company ID** (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`).
1. Cliquez sur **Save**.

## Connexion initiée par le fournisseur de services (SP)

Pour vous connecter à Datadog en utilisant la connexion initiée par le fournisseur de services (SSO SP), vous avez besoin de lʼURL de connexion unique (SSO). Vous pouvez la trouver de deux façons : sur la page de configuration SAML ou par e-mail.

### Page de configuration SAML
La [page de configuration SAML](#5) de Datadog affiche l'URL SSO à côté de l'intitulé **Single Sign-on URL**.

### E-mail
1. Accédez à l'URL du site Datadog propre à votre organisation.
1. Sélectionnez **Using Single Sign-On?**.
1. Saisissez votre adresse électronique et cliquez sur **Next**.
1. Consultez vos e-mails pour un message contenant l'URL SSO, indiquée sous **Login URL**.

Une fois que vous avez trouvé votre URL SSO par l'une ou l'autre méthode, ajoutez-la à vos favoris pour référence ultérieure.

## Mappage des rôles SAML

Suivez les étapes ci-dessous pour faire correspondre les attributs Okta aux entités Datadog. Cette étape est facultative.

1. Accédez au dashboard de l'admin Okta.
1. Sélectionnez l'onglet **Sign on**.
1. Cliquez sur **Edit**.
1. Remplissez les **Attributs** avec vos [déclarations d'attributs de groupe][6].
1. Configurez les [mappings][7] souhaités sur Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /fr/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[6]: /fr/account_management/faq/okta/#group-attribute-statements-optional
[7]: /fr/account_management/saml/mapping/