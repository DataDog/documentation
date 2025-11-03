---
further_reading:
- link: https://docs.datadoghq.com/api/latest/service-accounts/
  tag: Documentation
  text: Références sur les API de comptes de service
title: Comptes de service
---

## Présentation

Les comptes de services sont des comptes non interactifs qui peuvent vous servir à obtenir des clés d'applications et d'autres ressources partagées au sein de vos équipes. Une clé d'application de compte de service ne peut être visualisée qu'une seule fois par la personne l'ayant créée.

Imaginons qu'un employé de votre entreprise configure un script automatisé pour envoyer des requêtes à l'API Datadog, à l'aide de sa clé d'application personnelle. Lorsque cet employé quittera votre entreprise, vous désactiverez son compte Datadog et sa clé d'application cessera de fonctionner. Le script automatisé cessera également de fonctionner, jusqu'à ce que quelqu'un la mette à jour avec une clé d'application valide. L'utilisation d'une clé d'application de compte de service au lieu d'une clé d'application personnelle pour les requêtes automatisées dans l'API Datadog permet de contourner ce problème.

## Navigation

Les comptes de service existent dans les [paramètres de l'organisation][1]. 

Pour accéder aux comptes de service dans l'IU :

1. Accédez à **Organization Settings** dans le menu de votre compte.
2. Sous **Accounts**, sélectionnez **Service Accounts**.

La [page Service Accounts][2] contient la liste de tous les comptes de service de votre organisation. Les utilisateurs dotés de l'autorisation d'écriture pour les comptes de service, y compris les utilisateurs possédant le rôle d'administrateur Datadog, peuvent créer des comptes de service. Les utilisateurs qui ne sont pas dotés de l'autorisation d'écriture pour les comptes de service ne peuvent rien modifier.

### Consulter les comptes de service

Par défaut, la page Service Accounts n'affiche que les comptes actifs. Si vous souhaitez inclure les comptes de service désactivés dans la liste ci-dessous, sélectionnez **Disabled**.

Utilisez le champ de recherche situé en haut de la page pour filtrer les comptes de service. Le filtre permet de rechercher dans le champ des noms, des e-mails et des rôles.

Cliquez sur un compte pour accéder à un volet latéral détaillant les informations suivantes :

- Statut (actif ou désactivé)
- Création et date de la dernière modification
- Roles
- Clés d'application
- Autorisations

### Créer un compte de service

Pour créer un compte de service, suivez les étapes suivantes :

1. Cliquez sur **New Service Account**. Une boîte de dialogue apparaît alors.
2. Saisissez un nom et une adresse e-mail pour votre compte de service.
3. Utilisez le menu déroulant **Assign Roles** pour choisir un ou plusieurs rôles pour votre compte de service.
4. Pour enregistrer, cliquez sur **Create Service Account**.

Contrairement aux adresses e-mail des utilisateurs de Datadog, celles pour les comptes de service ne doivent pas nécessairement être uniques au sein de votre organisation.

### Modifier un compte de service

Pour modifier un compte de service, cliquez sur lʼun d'entre eux dans la liste des comptes de service. 

1. Dans le volet latéral, cliquez sur **Edit** à côté du nom du compte de service. Une boîte de dialogue s'affiche alors.
2. Modifiez tous les champs de votre choix. Vous pouvez modifier le nom, l'adresse e-mail, le statut et les rôles.
3. Cliquez sur **Save**.

Pour désactiver un compte de service, suivez le processus ci-dessus pour le modifier, puis définissez le statut sur **Disabled**.

### Créer ou révoquer des clés d'application

Pour créer ou révoquer des clés d'application de comptes de service, sélectionnez un compte dans la liste. Le volet latéral relatif aux comptes de service s'affiche alors.

Pour créer une nouvelle clé d'application, suivez les étapes ci-dessous :

- Cliquez sur **New Key**. Une boîte de dialogue s'affiche alors.
- Attribuez un nom descriptif à la clé.
- Cliquez sur **Create Key**. 

La boîte de dialogue est actualisée, ce qui permet d'afficher la clé. Copiez et collez la clé à l'emplacement de votre choix. Une fois que vous avez fermé la boîte de dialogue, vous ne pouvez plus récupérer la valeur de la clé.

Pour révoquer une clé d'application, recherchez une clé dans le volet latéral permettant de visualiser le compte de service en détail, et passez la souris dessus. Des icônes de corbeille et de crayon s'affichent à droite. Cliquez sur la corbeille pour révoquer la clé. Une fois que la clé est révoquée, cliquez sur **Confirm**.

### API

Référez-vous à la section [Références sur les API de comptes de service][3]

## Clés d'application pour les comptes de service

Vous ne pouvez consulter qu'une seule fois une clé d'application d'un compte de service, immédiatement après l'avoir créée. Le fait de limiter l'accès à une clé d'application permet d'éviter les problèmes pouvant survenir lorsque quelqu'un d'autre y accède. Si vous perdez ou oubliez la clé d'un compte de service, révoquez-la et créez-en une nouvelle.

## Autorisations

En créant un compte de service, vous créez un acteur qui interagit avec Datadog en votre nom. Ce que vous pouvez faire sur la page Service Accounts est régi par vos rôles et autorisations au sein de Datadog.

Vous devez possédez l'autorisation d'écriture pour les comptes de service afin de pouvoir en créer un. Le rôle d'administrateur de Datadog est doté de cette autorisation, ce qui permet à toute personne possédant ce rôle de créer des comptes de service.

Lorsque vous créez un compte de service, vous pouvez lui attribuer n'importe quel sous-ensemble de rôles et d'autorisations dont vous disposez. Il existe une exception si vous disposez de lʼautorisation de gérer l'accès des utilisateurs, ce qui vous donne un accès d'administrateur pour tout ce qui concerne Datadog. Les comptes Datadog ayant le droit de gérer l'accès des utilisateurs n'ont aucune restriction sur les rôles et les autorisations qu'ils peuvent assigner aux comptes de service.


## Notifications

Datadog envoie une notification à l'adresse électronique associée au compte de service lorsque les actions suivantes se produisent :
- Créer une clé d'application
- Révoquer une clé d'application
- Désactiver le compte de service


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /fr/api/latest/service-accounts/