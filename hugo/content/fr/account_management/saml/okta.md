---
description: Configurez Okta en tant que fournisseur d'identité SAML pour Datadog
  avec une authentification unique (SSO) initiée par le fournisseur d'identité (IdP)
  et le fournisseur de services (SP), le provisionnement JIT et la configuration du
  mappage des rôles.
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer vos équipes et organisations avec plusieurs comptes
title: Configuration du fournisseur d'identité SAML Okta
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    Dans le {{< region-param key="dd_site_name" >}} site, vous devez configurer manuellement l'application Datadog dans Okta en utilisant les <a href="/account_management/faq/okta/">anciennes instructions</a>. Ignorez les instructions de cette page concernant l'application Datadog préconfigurée dans le catalogue d'applications Okta.
</div>
{{% /site-region %}}

## Présentation {#overview}

Cette page vous explique comment configurer l'application Datadog dans Okta. 

Avant de continuer, assurez-vous d'utiliser la dernière version de l'application Datadog :
1. Dans Okta, cliquez sur {{< ui >}}Applications{{< /ui >}}.
1. Ouvrez l'application Datadog.
1. Sélectionnez l'onglet {{< ui >}}General{{< /ui >}}.
1. Recherchez un champ intitulé {{< ui >}}SSO Base URL{{< /ui >}}.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Configuration de l'application Datadog dans Okta, mettant en évidence l'URL de base de l'authentification unique" style="width:80%;" >}}

Si vous ne voyez pas le champ SSO Base URL, configurez Okta en utilisant les [anciennes instructions][1].

## Fonctionnalités prises en charge {#supported-features}

L'intégration SAML Datadog Okta prend en charge les éléments suivants :
- SSO initié par l'IdP
- SSO initié par le SP
- Provisionnement JIT

Pour obtenir les définitions des termes ci-dessus, consultez le [glossaire][2] Okta.

## Configuration {#setup}

Configurez Okta en tant que fournisseur d'identité (IdP) SAML pour Datadog en suivant les instructions ci-dessous. Le processus de configuration nécessite d'alterner entre vos comptes Okta et Datadog.

<div class="alert alert-info">L'adresse e-mail qu'Okta envoie à Datadog doit correspondre exactement à l'identifiant de l'utilisateur dans Datadog.</div>

### Ajoutez l'intégration Datadog dans Okta {#add-the-datadog-integration-in-okta}

1. Connectez-vous à votre tableau de bord d'administration Okta.
1. Dans le panneau de navigation de gauche, cliquez sur {{< ui >}}Applications{{< /ui >}}.
1. Cliquez sur {{< ui >}}Browse App Catalog{{< /ui >}}.
1. Utilisez la barre de recherche pour rechercher « Datadog ».
1. Sélectionnez l'application Datadog pour SAML et SCIM.
1. Cliquez sur {{< ui >}}Add Integration{{< /ui >}}. La boîte de dialogue General Settings s'affiche.
1. Remplissez le champ {{< ui >}}SSO Base URL{{< /ui >}} avec votre [URL du site Web Datadog][3].
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.

**Remarque :** Le champ SSO Base URL accepte les sous-domaines personnalisés si vous n'utilisez pas une URL de site Web Datadog standard.

Ensuite, téléchargez les détails des métadonnées à importer dans Datadog :
1. Dans la boîte de dialogue des paramètres de l'application Datadog dans Okta, cliquez sur l'onglet {{< ui >}}Sign on{{< /ui >}}.
1. Faites défiler vers le bas jusqu'à ce que vous voyiez {{< ui >}}Metadata URL{{< /ui >}}.
1. Cliquez sur {{< ui >}}Copy{{< /ui >}}.
1. Ouvrez un nouvel onglet de navigateur et collez l'URL des métadonnées dans la barre d'adresse.
1. Utilisez votre navigateur pour enregistrer le contenu de l'URL des métadonnées sous forme de fichier XML.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Configuration de la connexion dans Okta" style="width:80%;" >}}

### Configurez Datadog {#configure-datadog}

#### Importez les détails des métadonnées {#upload-metadata-details}

1. Accédez à [Login Methods][4] sous Organization Settings.
1. Dans le composant SAML, cliquez sur {{< ui >}}Configure{{< /ui >}} ou {{< ui >}}Update{{< /ui >}}, selon que vous avez déjà configuré SAML ou non. La page de configuration SAML s'affiche.
1. Cliquez sur {{< ui >}}Choose File{{< /ui >}} et sélectionnez le fichier de métadonnées que vous avez précédemment téléchargé depuis Okta.

{{< img src="account_management/saml/okta/choose_file.png" alt="Configuration SAML dans Datadog, mettant en surbrillance le bouton d'importation des métadonnées" style="width:100%;" >}}

#### Activez la connexion initiée par l'IdP {#activate-idp-initiated-login}

Pour que l'application Datadog fonctionne correctement, vous devez activer la connexion initiée par l'IdP.

<div class="alert alert-info">Une fois la connexion initiée par l'IdP activée, les utilisateurs peuvent se connecter à Datadog depuis Okta</div>

Pour activer la connexion initiée par l'IdP, effectuez les étapes suivantes :
1. Accédez à la [page de configuration SAML][5].
1. Sous {{< ui >}}Additional Features{{< /ui >}}, cochez la case {{< ui >}}Identity Provider (IdP) Initiated Login{{< /ui >}}. Le composant affiche le {{< ui >}}Assertion Consumer Service URL{{< /ui >}}.
1. La partie de l'Assertion Consumer Service URL située après `/saml/assertion` correspond à votre ID d'entreprise. Saisissez cette valeur avec le préfixe `/id/` dans Okta pour finaliser votre configuration.
1. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="account_management/saml/okta/company_id.png" alt="Configuration SAML dans Datadog, mettant en surbrillance la partie de l'URL du service consommateur d'assertion correspondant à l'identifiant de l'entreprise" style="width:100%;" >}}

Retournez dans Okta pour la série d'étapes de configuration suivante.

### Ajoutez l'ID d'entreprise dans Okta {#add-the-company-id-in-okta}

1. Retournez sur le tableau de bord d'administration Okta.
1. Sélectionnez l'onglet {{< ui >}}Sign on{{< /ui >}}.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
1. Faites défiler jusqu'à la section {{< ui >}}Advanced Sign-on Settings{{< /ui >}}.
1. Collez votre ID d'entreprise complet, y compris le préfixe `/id/`, dans le champ {{< ui >}}Company ID{{< /ui >}} (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`).
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Connexion initiée par le fournisseur de services (SP) {#service-provider-sp-initiated-login}

Pour vous connecter à Datadog via une connexion initiée par le fournisseur de services (SSO initié par le SP), vous avez besoin de l'URL d'authentification unique (SSO). Vous pouvez trouver votre URL SSO de deux manières : sur la page de configuration SAML ou par e-mail.

### Page de configuration SAML {#saml-configuration-page}
La [page de configuration SAML][5] de Datadog affiche l'URL SSO à côté de l'en-tête {{< ui >}}Single Sign-on URL{{< /ui >}}.

### Par e-mail {#email}
1. Accédez à l'URL du site Web Datadog de votre organisation.
1. Sélectionnez {{< ui >}}Using Single Sign-On?{{< /ui >}}.
1. Saisissez votre adresse e-mail et cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Consultez votre e-mail pour trouver le message contenant l'URL SSO, indiquée sous {{< ui >}}Login URL{{< /ui >}}.

Une fois que vous avez trouvé votre URL SSO par l'une ou l'autre méthode, ajoutez-la à vos favoris pour pouvoir la consulter ultérieurement.

## Mappage de rôles SAML {#saml-role-mapping}

Datadog utilise le mappage de groupes SAML pour mapper les attributs Okta aux rôles et aux Teams Datadog. Cette étape est facultative.

**Remarque** : le mappage de rôles est disponible uniquement via SAML. SCIM provisionne les utilisateurs et les équipes depuis Okta, mais ne mappe pas les rôles. Pour configurer SCIM, consultez [Configurer SCIM avec Okta][8].

1. Accédez au tableau de bord d'administration Okta.
1. Sélectionnez l'onglet {{< ui >}}Sign on{{< /ui >}}.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
1. Sous {{< ui >}}Attributes{{< /ui >}}, ajoutez une instruction d'attribut de groupe nommée `memberOf`, avec le format de nom {{< ui >}}Unspecified{{< /ui >}} et la valeur `.*` pour récupérer tous les groupes. Contactez votre administrateur IdP si vous devez restreindre davantage ce périmètre.
1. Configurez les [mappages][7] souhaités dans Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /fr/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[7]: /fr/account_management/saml/mapping/
[8]: /fr/account_management/scim/okta/