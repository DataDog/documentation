---
description: Créez et gérez des comptes de service non interactifs pour des scripts
  automatisés et des clés d'application partagées entre les équipes avec des contrôles
  d'accès sécurisés.
further_reading:
- link: /account_management/service-access-tokens/
  tag: Documentation
  text: Les Jetons d'accès de service
- link: https://docs.datadoghq.com/api/latest/service-accounts/
  tag: Documentation
  text: Références sur les API de comptes de service
title: Comptes de service
---
## Présentation {#overview}

Les comptes de service sont des comptes non interactifs auxquels vous pouvez attribuer des clés d'application et d'autres ressources partagées entre vos équipes. Les clés d'application des comptes de service ne peuvent être consultées qu'une seule fois par la personne qui a créé la clé.

Imaginez qu'un employé de votre entreprise configure un script automatisé pour envoyer des requêtes à la Datadog API à l'aide de sa clé d'application personnelle. Lorsque cet employé quitte l'entreprise, vous désactivez son compte Datadog et sa clé d'application cesse de fonctionner. Le script automatisé cesse également de fonctionner jusqu'à ce que quelqu'un le mette à jour avec une clé d'application valide. L'utilisation d'une clé d'application de compte de service au lieu d'une clé d'application personnelle pour les requêtes automatisées vers la Datadog API permet d'éviter ce problème.

## Navigation {#navigation}

Les comptes de service existent dans les [paramètres de l'organisation][1]. 

Pour accéder aux comptes de service dans l'IU :

1. Accédez à {{< ui >}}Organization Settings{{< /ui >}} depuis le menu de votre compte.
2. Sous {{< ui >}}Accounts{{< /ui >}}, sélectionnez {{< ui >}}Service Accounts{{< /ui >}}.

La [page Service Accounts][2] contient la liste de tous les comptes de service de votre organisation. Les utilisateurs disposant de l'autorisation Service Account Write, notamment ceux ayant le rôle Datadog Admin Role, peuvent créer des comptes de service. Les utilisateurs ne disposant pas de l'autorisation Service Account Write voient une vue en lecture seule.

### Afficher les comptes de service {#view-service-accounts}

Par défaut, la page Service Accounts affiche uniquement les comptes de service actifs. Pour inclure les comptes de service désactivés dans la liste ci-dessous, sélectionnez {{< ui >}}Disabled{{< /ui >}}.

Utilisez la zone de recherche en haut de la page pour filtrer les comptes de service. Le filtre effectue une recherche dans les champs « nom », « e-mail » et « rôle ».

Cliquez sur un compte pour accéder à un volet latéral détaillant les informations suivantes : 

- Statut (actif ou désactivé)
- Dates de création et de dernière modification
- Rôles
- Clés d'application
- Autorisations

### Créer un compte de service {#create-service-account}

Pour créer un compte de service, suivez les étapes suivantes :

1. Cliquez sur {{< ui >}}New Service Account{{< /ui >}}. Une boîte de dialogue s'affiche.
2. Saisissez un nom et une adresse e-mail pour votre compte de service.
3. Utilisez le menu déroulant {{< ui >}}Assign Roles{{< /ui >}} pour choisir un ou plusieurs rôles pour votre compte de service.
4. Pour enregistrer, cliquez sur {{< ui >}}Create Service Account{{< /ui >}}.

Contrairement aux adresses e-mail des utilisateurs de Datadog, celles pour les comptes de service ne doivent pas nécessairement être uniques au sein de votre organisation.

### Modifier un compte de service {#edit-service-account}

Pour modifier un compte de service, cliquez sur lʼun d'entre eux dans la liste des comptes de service. 

1. Dans le panneau latéral, cliquez sur {{< ui >}}Edit{{< /ui >}} à côté du nom du compte de service. Une boîte de dialogue s'affiche.
2. Mettez à jour les champs que vous souhaitez modifier. Vous pouvez modifier le nom, l'adresse e-mail, le statut et les rôles.
3. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour désactiver un compte de service, l'utilisateur doit disposer de l'autorisation User Manage Access en plus de Service Account Write.

Pour désactiver un compte de service, suivez la procédure précédente pour modifier le compte de service et définissez le statut sur {{< ui >}}Disabled{{< /ui >}}.

### Service Access Tokens {#service-access-tokens}

[Les Service Access Tokens (SATs)][4] sont le moyen recommandé pour authentifier les appels à la Datadog API depuis
un compte de service. Les SATs ont un périmètre défini, peuvent avoir une longue durée de vie et sont autonomes — ils ne nécessitent pas de clé d'API.

Pour créer un SAT pour un compte de service :

1. Accédez à [**Organization Settings** > **Service Accounts**][2] et cliquez sur un compte de service. Le panneau des détails s'affiche.
2. Sous **Access Tokens**, cliquez sur {{< ui >}}\+ New Token{{< /ui >}}.
3. Suivez les étapes décrites dans [Créer un Service Access Token][5].

**Remarque :** Chaque compte de service peut avoir jusqu'à 500 SAT.

### Créer ou révoquer des clés d'application {#create-or-revoke-application-keys}

Pour créer ou révoquer des clés d'application de compte de service, sélectionnez un compte dans la liste des comptes de service. Le panneau latéral du compte de service s'affiche.

Pour créer une nouvelle clé d'application, suivez les étapes ci-dessous :

- Cliquez sur {{< ui >}}New Key{{< /ui >}}. Une boîte de dialogue s'affiche.
- Donnez un nom descriptif à la clé.
- Cliquez sur {{< ui >}}Create Key{{< /ui >}}. 

La boîte de dialogue s'actualise et affiche la clé. Copiez et collez la clé à l'emplacement souhaité. Une fois la boîte de dialogue fermée, vous ne pourrez plus récupérer la valeur de la clé.

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">Les clés d'application de compte de service ne peuvent être consultées qu'une seule fois. Assurez-vous de stocker votre clé d'application en toute sécurité immédiatement après sa création, car le secret de la clé ne pourra pas être récupéré ultérieurement.</div>
{{< /site-region >}}

Pour révoquer une clé d'application, recherchez la clé dans le panneau latéral de la vue détaillée du compte de service et survolez-la. Les icônes de crayon et de corbeille apparaissent sur la droite. Cliquez sur la corbeille pour révoquer la clé. Une fois la clé révoquée, cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### API {#api}

Référez-vous à la section [Références sur les API de comptes de service][3] pour utiliser les comptes de service via la Datadog API.

## Clés d'application de compte de service {#service-account-application-keys}

Vous pouvez afficher une clé d'application de compte de service exactement une fois, immédiatement après l'avoir créée. Limiter l'accès à la clé d'application permet d'éviter tout problème pouvant survenir lorsqu'un autre utilisateur accède à la clé. Si vous perdez ou oubliez une clé de compte de service, révoquez-la et créez-en une nouvelle.

## Autorisations {#permissions}

En créant un compte de service, vous créez un acteur qui interagit avec Datadog en votre nom. Vos possibilités sur la page Service Accounts varient selon vos rôles et autorisations Datadog.

La création d'un compte de service nécessite l'autorisation Service Account Write. Le rôle Datadog Admin inclut Service Account Write ; par conséquent, toute personne disposant du rôle Datadog Admin peut créer des comptes de service.

Lors de la création d'un compte de service, vous pouvez lui attribuer n'importe quel sous-ensemble des rôles et autorisations dont vous disposez. L'exception concerne le cas où vous disposez de l'autorisation User Access Manage, qui vous donne effectivement un accès administrateur pour effectuer n'importe quelle action dans Datadog. Les comptes Datadog disposant de l'autorisation User Access Manage n'ont aucune restriction sur les rôles et autorisations qu'ils peuvent attribuer aux comptes de service.


## Notifications {#notifications}

Datadog envoie une notification à l'adresse électronique associée au compte de service lorsque les actions suivantes se produisent :
- Créer une clé d'application
- Révoquer une clé d'application
- Désactiver le compte de service


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /fr/api/latest/service-accounts/
[4]: /fr/account_management/service-access-tokens/
[5]: /fr/account_management/service-access-tokens/#create-a-service-access-token