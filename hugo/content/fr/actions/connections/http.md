---
aliases:
- /fr/service_management/app_builder/http_request/
- /fr/service_management/workflows/connections/http/
- /fr/service_management/app_builder/connections/http_request/
description: Effectuez des requêtes HTTP personnalisées vers des endpoints HTTP avec
  une authentification, des méthodes, des en-têtes et une gestion des réponses configurables
  pour les workflows et les applications.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentation
  text: En savoir plus sur les identifiants de connexion
title: Requêtes HTTP
---
Utilisez l'action {{< ui >}}Make request{{< /ui >}} pour effectuer une requête personnalisée vers un endpoint HTTP. Vous pouvez contrôler la méthode de requête et son contenu, la manière dont elle est authentifiée et traitée, et comment elle doit répondre à des scénarios tels que des certificats expirés ou des redirections. Si vous devez ajouter des plages d'adresses IP Datadog à votre liste d'autorisation pour que l'action HTTP fonctionne comme prévu, utilisez les adresses IP indiquées dans l'objet `webhooks`. Consultez l'[API des plages IP][1] pour plus de détails.

Pour ajouter une requête HTTP :

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- Dans un nouveau workflow, cliquez sur {{< ui >}}Add step{{< /ui >}} et recherchez `Make request`. Sélectionnez l'action {{< ui >}}Make request{{< /ui >}} pour l'ajouter à votre workflow.
- Dans un workflow existant, cliquez sur {{< ui >}}\+{{< /ui >}} et recherchez `Make request`. Sélectionnez l'action {{< ui >}}Make request{{< /ui >}} pour l'ajouter à votre workflow.

Spécifiez la méthode de requête et toute [authentification][1] nécessaire. Lisez les sections ci-dessous pour plus d'informations sur les options de configuration disponibles. Facultativement, la requête peut attendre des conditions que vous spécifiez dans la section {{< ui >}}Conditional wait{{< /ui >}}, et réessayer à un intervalle donné si la condition n'est pas satisfaite.

[1]: /fr/actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. Dans votre application, sous {{< ui >}}Data{{< /ui >}}, cliquez sur {{< ui >}}\+ New{{< /ui >}} et sélectionnez {{< ui >}}Query{{< /ui >}}
1. Recherchez `HTTP`, puis sélectionnez l'action {{< ui >}}Make request{{< /ui >}} pour l'ajouter à votre application.

Spécifiez la méthode de requête et toute [authentification][1] nécessaire. Lisez les sections ci-dessous pour plus d'informations sur les options de configuration disponibles.

[1]: /fr/actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## Authentification {#authentication}

Si vous devez authentifier votre requête, utilisez l'élément {{< ui >}}Connection{{< /ui >}} de l'action pour configurer la méthode d'authentification. Vous pouvez soit sélectionner une connexion préconfigurée dans la liste déroulante, soit créer une connexion.

### Créer une connexion AWS {#create-an-aws-connection}

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}AWS{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Account ID{{< /ui >}} et {{< ui >}}AWS Role Name{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer une connexion Azure {#create-an-azure-connection}

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}Azure{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Tenant ID{{< /ui >}}, {{< ui >}}Client ID{{< /ui >}} et {{< ui >}}Client Secret{{< /ui >}}.
1. Facultativement, saisissez la {{< ui >}}Custom Scope{{< /ui >}} à demander à Microsoft lors de l'acquisition d'un jeton d'accès OAuth 2.0. Le périmètre d'une ressource est construite en utilisant l'URI d'identifiant pour la ressource et `.default`, séparés par une barre oblique (`/`). Par exemple, `{identifierURI}/.default`. Pour plus d'informations, consultez [la documentation Microsoft sur le périmètre .default][3].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer une connexion d'authentification par jeton HTTP {#create-an-http-token-authentication-connection}

La connexion d'authentification par jeton utilise un jeton d'accès (Bearer) pour authentifier la requête HTTP.

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}HTTP{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}.
1. Saisissez le {{< ui >}}Base URL{{< /ui >}} pour l'authentification.
1. Dans la liste déroulante {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez {{< ui >}}Token Auth{{< /ui >}}.
1. Saisissez un {{< ui >}}Token Name{{< /ui >}} et un {{< ui >}}Token Value{{< /ui >}}. Vous pouvez saisir plusieurs jetons.
1. Configurez la manière dont les requêtes HTTP utilisant la connexion incluent le jeton. La connexion n'ajoute pas automatiquement le jeton aux requêtes. Dans {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} ou {{< ui >}}Body{{< /ui >}}, référencez le jeton avec la syntaxe `{{ secretTokenName }}`, replacing `secretTokenName` with the {{< ui >}}Token Name{{< /ui >}} de l'étape précédente. Par exemple, si le nom du jeton est `apiToken`, add an `Authorization` header with the value `Bearer {{ apiToken }}`.
1. Ajoutez éventuellement d'autres {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} ou un {{< ui >}}Body{{< /ui >}} à votre requête.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer une connexion d'authentification HTTP de base {#create-an-http-basic-authentication-connection}

La connexion d'authentification de base utilise un en-tête d'autorisation avec un nom d'utilisateur et un mot de passe pour authentifier la requête HTTP.

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}HTTP{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}.
1. Saisissez le {{< ui >}}Base URL{{< /ui >}} pour l'authentification.
1. Dans la liste déroulante {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez {{< ui >}}Basic Auth{{< /ui >}}.
1. Saisissez un {{< ui >}}Username{{< /ui >}} et un {{< ui >}}Password{{< /ui >}}. L'en-tête de requête d'autorisation requis est automatiquement renseigné à l'aide de votre nom d'utilisateur et de votre mot de passe.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer une connexion d'authentification HTTP en 2 étapes {#create-a-2-step-http-authentication-connection}

La connexion HTTP en 2 étapes vous permet d'effectuer une requête préliminaire pour récupérer un jeton d'accès avec lequel authentifier la requête HTTP. Ceci est utile pour authentifier les applications JSON Web Token (JWT) et OAuth.

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}HTTP{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}.
1. Saisissez le {{< ui >}}Base URL{{< /ui >}} pour l'authentification.
1. Dans la liste déroulante {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez {{< ui >}}2 Step Auth{{< /ui >}}.

{{< tabs >}}
{{% tab "Authentification par jeton" %}}
Configurez la requête de jeton d'accès préliminaire :
1. Dans la liste déroulante {{< ui >}}Secret Type{{< /ui >}}, sélectionnez {{< ui >}}Token Auth{{< /ui >}}.
1. Saisissez un nom de jeton et une valeur de jeton
1. Saisissez le {{< ui >}}Request URL{{< /ui >}} et spécifiez le type de requête comme étant {{< ui >}}GET{{< /ui >}} ou {{< ui >}}POST{{< /ui >}}.
1. Facultativement, ajoutez des {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} et un {{< ui >}}Body{{< /ui >}} supplémentaires à la requête.

Obtenez le jeton d'accès à partir de la réponse :
1. Sous {{< ui >}}Variable Path to Access Token{{< /ui >}}, saisissez le chemin d'accès au jeton d'accès dans la réponse. Il s'agit du chemin par lequel votre jeton d'accès est renvoyé après avoir effectué l'appel d'authentification. Par exemple, si le jeton d'accès est renvoyé en tant que corps de la demande d'accès, utilisez `body`. Si le jeton d'accès est renvoyé dans une propriété appelée `token` de la réponse `body`, utilisez `body.token`. Les chemins sont sensibles à la casse.
1. Facultativement, saisissez une {{< ui >}}Refresh Interval{{< /ui >}}. Il s'agit de la durée avant l'expiration du jeton d'accès, spécifiée en secondes. Lorsque le jeton expire, la connexion demande automatiquement un nouveau jeton d'accès. Définir un intervalle de `0` désactive le rafraîchissement du jeton.

Utilisez votre jeton récupéré pour authentifier votre connexion :
1. Sous {{< ui >}}Request Detail{{< /ui >}}, saisissez {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} et un {{< ui >}}Body{{< /ui >}} pour compléter votre demande en utilisant le jeton d'accès récupéré.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}

{{% tab "Authentification de base" %}}
Configurez la requête d'authentification préliminaire :
1. Dans la liste déroulante {{< ui >}}Secret Type{{< /ui >}}, sélectionnez {{< ui >}}Basic Auth{{< /ui >}}.
1. Saisissez un {{< ui >}}Username{{< /ui >}} et un {{< ui >}}Password{{< /ui >}}. La section {{< ui >}}Request Headers{{< /ui >}} est automatiquement remplie à l'aide de votre nom d'utilisateur et de votre mot de passe.

Configurez la demande d'authentification :
1. Saisissez le {{< ui >}}Request URL{{< /ui >}} et spécifiez le type de requête comme étant {{< ui >}}GET{{< /ui >}} ou {{< ui >}}POST{{< /ui >}}.
1. Facultativement, ajoutez des {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} et un {{< ui >}}Body{{< /ui >}} supplémentaires à la requête.

Obtenez le jeton d'accès à partir de la réponse :
1. Sous {{< ui >}}Variable Path to Access Token{{< /ui >}}, saisissez le chemin d'accès au jeton d'accès dans la réponse. Il s'agit du chemin par lequel votre jeton d'accès est renvoyé après avoir effectué l'appel d'authentification. Par exemple, si le jeton d'accès est renvoyé en tant que corps de la demande d'accès, utilisez `body`. Si le jeton d'accès est renvoyé dans une propriété appelée `token` de la réponse `body`, utilisez `body.token`. Les chemins sont sensibles à la casse.
1. Facultativement, saisissez une {{< ui >}}Refresh Interval{{< /ui >}}. Il s'agit de la durée avant l'expiration du jeton d'accès, spécifiée en secondes. Lorsque le jeton expire, la connexion demande automatiquement un nouveau jeton d'accès. Définir un intervalle de `0` désactive le rafraîchissement du jeton.

Utilisez votre jeton récupéré pour authentifier votre connexion :
1. Sous {{< ui >}}Request Detail{{< /ui >}}, saisissez {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} et un {{< ui >}}Body{{< /ui >}} pour compléter votre demande en utilisant le jeton d'accès récupéré.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}
{{< /tabs >}}

### Créez une connexion HTTP mTLS {#create-an-http-mtls-connection}

La connexion d'authentification TLS mutuelle (mTLS) vous permet d'utiliser une clé privée et un certificat TLS pour authentifier la requête HTTP.

<div class="alert alert-info">Le certificat client (<code>.crt</code>, <code>.pem</code>) et la clé privée (<code>.key</code>, <code>.pem</code>) doivent utiliser le format PEM.</div>

1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}HTTP{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}.
1. Saisissez le {{< ui >}}Base URL{{< /ui >}} pour l'authentification.
1. Dans la liste déroulante {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez {{< ui >}}mTLS Auth{{< /ui >}}.
1. Cliquez sur {{< ui >}}Upload File{{< /ui >}} pour télécharger votre {{< ui >}}Private Key{{< /ui >}}.
1. Cliquez sur {{< ui >}}Upload File{{< /ui >}} pour télécharger votre {{< ui >}}Certificate{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Entrées {#inputs}

Une URL et une méthode de requête sont requises pour votre requête. Facultativement, vous pouvez saisir :
- Paramètres d'URL
- en-têtes
- le type de contenu
- un corps de requête
- cookies

Vous pouvez également choisir si vous souhaitez autoriser les certificats expirés ou suivre les redirections.

### Options de réponse {#response-options}

Sous {{< ui >}}Error on Status{{< /ui >}}, saisissez une liste séparée par des virgules de tous les codes d'état pour lesquels renvoyer une erreur. Utilisez la liste déroulante {{< ui >}}Response Parsing{{< /ui >}} pour remplacer la méthode de parsing de réponse par défaut déduite des en-têtes, et {{< ui >}}Response Encoding{{< /ui >}} si le serveur cible spécifie le mauvais encodage dans ses en-têtes de réponse.

## Private Actions {#private-actions}

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Rejoignez la Preview !">}}
Les Private Actions sont en préversion. Utilisez ce formulaire pour demander l'accès dès aujourd'hui.
{{< /callout >}}

Vous pouvez utiliser une action HTTP privée pour interagir avec des services hébergés sur votre réseau privé sans exposer vos services à l'Internet public. Les Private Actions utilisent un exécuteur d'actions privées que vous installez sur un host de votre réseau à l'aide de Docker et que vous associez à une connexion Datadog. Pour plus d'informations, consultez [Private Actions][5].

Pour configurer une requête HTTP privée :
1. Ajoutez une action HTTP à votre application.
1. Dans la section {{< ui >}}Connection{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}).
1. Sélectionnez {{< ui >}}HTTP{{< /ui >}}.
1. Saisissez un {{< ui >}}Connection Name{{< /ui >}}.
1. Saisissez le {{< ui >}}Base URL{{< /ui >}} du host dans votre réseau privé.
1. Pour {{< ui >}}Type{{< /ui >}}, assurez-vous que {{< ui >}}Private Action Runner{{< /ui >}} est sélectionné.
1. Dans la liste déroulante {{< ui >}}Private Action Runner{{< /ui >}}, sélectionnez votre [private action runner][5].
1. Dans la liste déroulante {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez un type d'authentification et remplissez les champs requis. Les requêtes HTTP privées prennent en charge les types d'authentification suivants :
   - Aucune authentification
   - [Authentification de base](#create-an-http-basic-authentication-connection)
   - [Authentification par jeton](#create-an-http-token-authentication-connection)

   Pour plus d'informations sur la configuration des identifiants pour l'authentification par jeton, consultez [Handling Private Action Credentials][6].
1. Cliquez sur {{< ui >}}Next, Confirm Access{{< /ui >}} et configurez l'accès à la requête.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** ou **#app-builder** sur le [Datadog Community Slack][4].

[1]: https://docs.datadoghq.com/fr/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /fr/actions/private_actions
[6]: /fr/actions/connections/private_action_credentials/?tab=httpsaction#credential-files