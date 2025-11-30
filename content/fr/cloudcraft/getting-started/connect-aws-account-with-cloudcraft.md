---
title: Connecter votre compte AWS à Cloudcraft
---

La connexion de vos comptes AWS à Cloudcraft vous permet de visualiser votre infrastructure, en représentant au sein d'un diagramme d'architecture système, par rétro-ingénierie, les relations entre les services de votre environnement en direct. En plus de générer automatiquement des diagrammes, Cloudcraft crée aussi un modèle de budget et affiche pour vos composants importés des données de statut en direct au sein de vos diagrammes. Vous pouvez connecter autant de comptes AWS que vous le souhaitez à Cloudcraft.

**Remarque** : pour les organisations AWS, vous devez ajouter manuellement le rôle Cloudcraft à chaque compte individuel de l'organisation.

Cet article décrit la marche à suivre pour connecter votre compte AWS à Cloudcraft.

<div class="alert alert-info">Les utilisateurs Datadog peuvent contourner ce processus en connectant leur compte Datadog à Cloudcraft. Pour en savoir plus, consultez l'<a href="https://docs.datadoghq.com/cloudcraft/getting-started/datadog-integration/" title="Intégration Datadog">intégration Datadog</a>.</div>

## Prérequis

- Un utilisateur Cloudcraft avec le rôle [Propriétaire ou Administrateur][1].
- Un abonnement actif à [Cloudcraft Pro][2].
- Un compte AWS disposant de l'autorisation nécessaire pour créer des rôles IAM.

## Fonctionnement de la synchronisation d'AWS en direct

Cloudcraft utilise un [rôle intercompte pour accéder en toute sécurité à votre environnement AWS][3]. Par conséquent, vous devez créer un rôle en lecture seule spécifique à Cloudcraft dans votre compte AWS. Ce rôle peut être révoqué à tout moment.

Si vous ne pouvez pas créer de rôle en lecture seule avec un accès à l'ensemble des composants, ou si cela enfreint la politique de votre entreprise, vous pouvez également [mettre en place une politique d'accès minimal plus stricte][4], en n'accordant un accès en lecture seule qu'aux ressources que vous souhaitez utiliser avec Cloudcraft. Cela restreint encore plus le volume de données auxquelles le rôle a accès.

Cloudcraft ne conserve aucune des données en direct de votre environnement AWS. En revanche, Cloudcraft stocke les ARN, qui sont des identifiants uniques pour les ressources AWS. Cela permet à l'application d'associer les données en direct aux composants au moment de l'exécution.

Les données de votre environnement AWS sont transmises en temps réel à votre navigateur par l'intermédiaire de l'environnement AWS de Cloudcraft, à l'aide d'un accès basé sur les rôles, et sont stockées côté client uniquement lors de l'utilisation de l'application. Lorsque vous fermez l'application, les données en temps réel sont supprimées.

Sans accès en lecture à votre compte, certaines fonctionnalités Cloudcraft ne sont pas disponibles, comme la suppression d'une instance EC2 à la fois dans le diagramme et dans votre compte. Cette approche est néanmoins moins risquée.

Cloudcraft met en œuvre des processus et des contrôles de sécurité rigoureux dans le cadre du programme de conformité SOC2. Pour en savoir plus sur le programme et les contrôles de sécurité de Cloudcraft, consultez [la page relative à la sécurité de Cloudcraft][5] (en anglais).

## Gérer des comptes AWS

### Ajouter un compte

1. Dans Cloudcraft, accédez à **User** > **AWS accounts**.
2. En bas de la fenêtre modale, cliquez sur **Add AWS Account**.
3. La page suivante fournit des instructions détaillées. Cliquez sur **Open the AWS IAM Console to the Create Role Page** pour configurer le rôle IAM en lecture seule dans AWS.

<div class="alert alert-info">Si vous ne parvenez pas à accéder à la page <strong>Create Role</strong>, il se peut que vous ne disposiez pas de l'autorisation <strong>AdministrativeAccess</strong> ou des autorisations IAM requises pour créer un rôle IAM. Dans ce cas, contactez l'administrateur de votre compte AWS et demandez-lui d'effectuer les étapes suivantes.</div>

4. Sur la page **Create role** d'AWS, vérifiez que l'option **Require MFA** est décochée, puis cliquez sur **Next**.

<div class="alert alert-info">L'option <strong>Require MFA</strong> doit être désactivée, car elle n'est pas applicable à un accès d'un système à un autre sans intervention humaine. L’accès est sécurisé en étant restreint au compte AWS Cloudcraft.</div>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="L'écran de la console AWS IAM montrant les options pour sélectionner des entités de confiance pour la configuration des rôles." responsive="true" style="width:100%;">}}

5. Ajoutez ensuite des stratégies d'autorisation à votre rôle. Saisissez **ReadOnlyAccess** dans le champ de recherche et appuyez sur **Entrée** pour filtrer les politiques par nom.
6. Sélectionnez la stratégie **ReadOnlyAccess** afin de fournir un accès en lecture seule aux services et ressources AWS, puis cliquez sur **Next**.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="La page de la console AWS IAM avec la stratégie ReadOnlyAccess sélectionnée et mise en évidence." responsive="true" style="width:100%;">}}

7. Saisissez un nom et une description pour le rôle IAM. Vous pouvez également ajouter des tags pour organiser, suivre ou contrôler l'accès pour le rôle. L'ajout de tags au rôle n'est pas requis. Pour en savoir plus sur les meilleures pratiques de tagging des ressources AWS, consultez le [livre blanc dédié][6] (en anglais).
8. Cliquez sur **Create role**.
9. Sélectionnez le rôle `cloudcraft` depuis la liste des rôles. Sur la page **Summary**, copiez l'**ARN du rôle**.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="L'écran de configuration du rôle AWS IAM montrant l'ARN du rôle pour l'intégration Cloudcraft." responsive="true" style="width:100%;">}}

10. Accédez à Cloudcraft, collez l'ARN dans le champ **Role ARN**, puis saisissez un nom pour votre compte.
11. Pour configurer l'accès des équipes, cliquez sur le bouton bleu sous **Team access**, puis sélectionnez les équipes auxquelles vous souhaitez accorder un accès au compte AWS. Cette étape est facultative.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="L'interface Cloudcraft montrant les options d'accès des équipes, avec les tags d'équipe Cloudcraft, Team Demo et Cloudcraft Sales + Support." responsive="true" style="width:100%;">}}

12. Cliquez sur **Save Account**.

### Modifier un compte

Pour modifier un compte, cliquez sur l'icône grise en forme de crayon à gauche du compte pertinent. Vous pouvez modifier les détails du compte, comme le nom, l'ARN et l'accès des équipes.

Une fois vos modifications terminées, cliquez sur **Save Account**.

### Supprimer un compte

Pour supprimer un compte, cliquez sur l'icône en forme de corbeille à droite du compte pertinent, puis cliquez sur **Remove**.

[1]: /fr/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /fr/cloudcraft/advanced/minimal-iam-policy/
[5]: https://www.cloudcraft.co/security
[6]: https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html