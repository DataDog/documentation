---
title: Connecter votre compte Azure à Cloudcraft
---

Cet article décrit la marche à suivre pour connecter votre compte Azure à Cloudcraft.

## Prérequis

- Un utilisateur Cloudcraft avec le rôle [Propriétaire ou Administrateur][1].
- Un abonnement actif à [Cloudcraft Pro][2].
- Un compte Azure disposant de l'autorisation nécessaire pour créer des rôles IAM.

## Gérer des comptes Azure

### Ajouter un compte

1. Dans Cloudcraft, accédez à **User** > **Azure accounts**.
2. En bas de la fenêtre modale, cliquez sur **Add Azure Account**.
3. La page suivante fournit des instructions détaillées. Cliquez sur **Select "App registrations" in the left sidebar** pour inscrire une nouvelle application afin qu'elle communique avec Cloudcraft dans Azure.
4. Depuis la page **App registrations** dans **Azure Active Directory**, cliquez sur **New registration**.
5. Saisissez les informations suivantes :
    - **Name** : Cloudcraft
    - **Supported account types** : Accounts in this organizational directory only (Single tenant)
    - **Redirect URI** : laissez ce champ vide.
6. Cliquez sur **Register**.
7. Depuis la page des détails de votre application, copiez l'**ID d'application** et l'**ID de répertoire**.
8. Dans Cloudcraft, collez l'**ID d'application** et l'**ID de répertoire**, puis cliquez sur **Next**.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Les instructions détaillées permettant d'ajouter un compte Azure à Cloudcraft, avec les champs Application ID et Directory ID mis en évidence." responsive="true" style="width:100%;">}}

#### Créer un secret client

Créez ensuite un secret client pour permettre à l'application Cloudcraft de s'identifier en toute sécurité auprès des services d'authentification d'Azure.

**Remarque** : vous pouvez choisir votre propre période d'expiration pour le secret client. Sachez toutefois qu'à l'expiration du secret, vous ne pourrez plus analyser votre compte Azure jusqu'à ce que vous enregistriez un nouveau secret et que vous mettiez à jour le compte dans Cloudcraft.

1. Depuis la page de votre application dans Azure, à la section **Manage** dans la barre latérale gauche, cliquez sur **Certificates & secrets**.
2. À la section **Certificats & secrets**, sélectionnez **New client secret**.
3. Saisissez les informations suivantes :
    - **Description** : Cloudcraft
    - **Expires** : 730 jours (24 mois)
4. Cliquez sur **Add**.
5. Copiez la **valeur** de votre secret tout juste créé.
6. Dans Cloudcraft, collez le secret du client dans le champ **Client secret** et cliquez sur **Next**.

#### Créer un utilisateur IAM pour Cloudcraft

Enfin, créez un utilisateur IAM pour permettre à l'application Cloudcraft de lire votre environnement Azure.

1. Dans Cloudcraft, cliquez sur le lien **Open your Azure Subscriptions page** pour ouvrir la page **Subscriptions** dans Azure.
2. Sélectionnez l'abonnement que vous souhaitez utiliser avec Cloudcraft.
3. Depuis la page d'abonnement, sélectionnez **Access control (IAM)** dans la barre latérale gauche.
4. Cliquez sur **Add** et sélectionnez **Add role assignment**.  Une nouvelle page contenant la liste des rôles s'ouvre alors.
5. Sélectionnez **Reader** et cliquez sur **Next**.
6. Sur la page suivante, vérifiez que l'option **User, group or service principal** est sélectionnée, puis cliquez sur **Select members**. Recherchez l'option **Cloudcraft** et sélectionnez-la.
7. Cliquez sur **Review + assign**.
8. Dans Cloudcraft, cliquez sur **Next**.

#### Ajouter des abonnements

Avant d'enregistrer le compte, vous pouvez choisir de configurer l'accès des équipes.

1. Cliquez sur **Team access** et sélectionnez les équipes auxquelles vous souhaitez accorder un accès au compte Azure. Si vous ignorez cette étape, le compte demeurera privé et vous serez la seule personne à pouvoir y accéder.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="L'interface Cloudcraft montrant les options de partage avec les équipes, avec un menu déroulant permettant de sélectionner les équipes auxquelles accorder un accès au compte Azure." responsive="true" style="width:100%;">}}

2. Cliquez sur **Save Account**.

Votre compte Azure peut désormais être utilisé avec Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Capture d'écran de l'interface Cloudcraft permettant de gérer les comptes Azure, avec un compte ajouté." responsive="true" style="width:100%;">}}

## Modifier un compte

Pour modifier un compte, cliquez sur l'icône grise en forme de crayon à gauche du compte pertinent. Vous pouvez modifier les détails du compte, comme le nom, l'ARN et l'accès des équipes.

Une fois vos modifications terminées, cliquez sur **Save Account**.

## Supprimer un compte

Pour supprimer un compte, cliquez sur l'icône en forme de corbeille à droite du compte pertinent, puis cliquez sur **Remove**.

[1]: /fr/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing