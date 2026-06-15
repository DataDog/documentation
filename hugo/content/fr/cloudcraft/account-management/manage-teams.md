---
title: Gérer votre équipe
---

Faites des revues d'architecture un effort d'équipe, partagez vos vues d'infrastructure cloud en temps réel ou concevez en collaboration votre prochain projet avec l'aide des équipes Cloudcraft.

Ajouter des personnes à une équipe dans Cloudcraft est facile et permet à tous de collaborer en temps réel.

Le propriétaire du compte et les membres de l'équipe avec le rôle d'administrateur peuvent inviter et supprimer des utilisateurs, ainsi que modifier les rôles des membres.

<section class="alert alert-info">
  <p>Les fonctionnalités d'équipe sont disponibles avec les plans Cloudcraft Pro et Enterprise.</p>
</section>

## Gestion des utilisateurs

### Inviter de nouveaux utilisateurs

Pour ajouter des membres à votre équipe, accédez à **User → Team settings** dans Cloudcraft.

Ensuite, cliquez sur le bouton bleu **Add member** en bas de la fenêtre **Manage Team** qui est apparue.

{{< img src="cloudcraft/account-management/manage-teams/add-member.png" alt="Capture d'écran d'une interface 'Manage Team' dans Cloudcraft avec un bouton 'Add Member' mis en surbrillance." responsive="true" style="width:100%;">}}

Après avoir cliqué sur le bouton, vous devez saisir l'adresse e-mail de l'utilisateur et sélectionner un rôle pour lui dans votre équipe.

{{< img src="cloudcraft/account-management/manage-teams/add-teammate.png" alt="Interface utilisateur pour ajouter un membre d'équipe dans Cloudcraft avec une saisie d'e-mail et des options de sélection de rôle." responsive="true" style="width:100%;">}}

Sélectionner le bon rôle est une étape critique dans ce processus, car différents rôles ont différents niveaux d'accès. Sélectionnez le rôle qui convient le mieux à cet utilisateur, mais essayez de suivre le [principe du moindre privilège][1].

Enfin, cliquez sur le bouton **Send invite** pour inviter l'utilisateur à votre équipe. L'utilisateur que vous avez invité recevra un e-mail qui inclut un lien pour rejoindre votre équipe et configurer son compte s'il ne l'a pas déjà fait.

<section class="alert alert-info">
  <p>L'utilisateur héritera de son rôle inter-organisationnel s'il est membre d'une équipe inter-organisationnelle.</p>
</section>

### Supprimer des utilisateurs existants

Lorsque quelqu'un quitte l'équipe — ou si quelqu'un est ajouté par erreur — vous voudrez le supprimer de votre équipe. Pour cela, accédez à **User → Team settings** dans Cloudcraft.

Ensuite, sélectionnez l'utilisateur que vous souhaitez supprimer et cliquez sur l'icône de corbeille grise à droite de son nom.

{{< img src="cloudcraft/account-management/manage-teams/trash-can-icon.png" alt="Capture d'écran d'une interface Cloudcraft Manage Team mettant en évidence les fonctionnalités de collaboration utilisateur avec l'icône d'action de suppression." responsive="true" style="width:100%;">}}

Une boîte de dialogue de confirmation apparaîtra sur votre écran. Cliquez sur le bouton rouge **Remove** et l'utilisateur sera supprimé de votre équipe.

<section class="alert alert-info">
  <p>Les diagrammes qui ont été créés par l'utilisateur supprimé et qui ont été partagés avec l'équipe continueront d'être disponibles pour l'équipe. Si vous avez besoin d'aide pour migrer toutes les données de l'utilisateur avant de le supprimer, veuillez <a href="https://app.cloudcraft.co/app/support" title="Contacter notre équipe d'assistance">contacter notre équipe d'assistance depuis l'application</a>.</p>
  <p>L'accès de l'équipe aux données des utilisateurs supprimés peut également être restauré sur demande dans notre période de rétention des données de 30 jours.</p>
</section>

### Modifier le rôle d'un utilisateur existant

Si vous devez modifier ce à quoi un utilisateur a accès, accédez à **User → Team settings** dans Cloudcraft.

Ensuite, cliquez sur l'icône de crayon grise à gauche de l'utilisateur.

{{< img src="cloudcraft/account-management/manage-teams/edit-user.png" alt="Interface utilisateur pour gérer les membres de l'équipe dans Cloudcraft, mettant en évidence les options de modification." responsive="true" style="width:100%;">}}

À l'invite suivante, sélectionnez un nouveau rôle pour l'utilisateur et cliquez sur le bouton bleu **Save**. C'est tout ce qu'il y a à faire.

## Gestion d'équipe

<section class="alert alert-info">
  <p>La fonctionnalité de gestion multi-équipes n'est disponible que pour le plan Enterprise</p>
</section>

### Créer une équipe

Pour créer une nouvelle équipe pour votre compte, accédez à **User → Team settings** dans Cloudcraft.

Cliquez sur le bouton bleu **Create Team** en bas de la liste des équipes, sur la gauche.

{{< img src="cloudcraft/account-management/manage-teams/create-new-team.png" alt="Interface utilisateur pour la gestion d'équipe dans Cloudcraft mettant en évidence le bouton 'Create Team' avec une liste de membres de l'équipe." responsive="true" style="width:100%;">}}

Ensuite, vous devez donner un nom à votre équipe et définir sa visibilité. Une équipe **Visible** peut être vue par n'importe qui dans votre organisation, tandis qu'une équipe **Secret** ne peut être vue que par le propriétaire du compte et les membres de l'équipe.

{{< img src="cloudcraft/account-management/manage-teams/create-new-team-settings.png" alt="Capture d'écran d'une interface de création d'équipe dans Cloudcraft avec des options de visibilité d'équipe et de rôles." responsive="true" style="width:100%;">}}

Avant de créer l'équipe, vous pouvez également cocher la case **Cross-organizational** pour en faire une équipe inter-organisationnelle, c'est-à-dire des équipes dont les membres sont automatiquement ajoutés à toutes les autres équipes de votre organisation. Un exemple d'équipe inter-organisationnelle serait une équipe centrale de gestion de la sécurité, qui a besoin de visibilité sur toutes les équipes individuelles.

À moins qu'ils ne soient déjà membres d'une autre équipe, les membres inter-organisationnels héritent de leurs rôles inter-organisationnels.

Cliquez sur le bouton **Create** en bas et c'est tout, vous êtes prêt à commencer à inviter des membres de l'équipe.

### Supprimer ou mettre à jour des équipes existantes

Si vous devez mettre à jour ou supprimer une équipe que vous possédez, accédez à **User → Team settings** dans Cloudcraft.

Sélectionnez l'équipe que vous souhaitez mettre à jour et cliquez sur l'icône de crayon grise qui se trouve à côté de son nom.

{{< img src="cloudcraft/account-management/manage-teams/edit-team.png" alt="Capture d'écran de Cloudcraft avec un bouton de modification mis en évidence dans l'interface 'Manage Teams'." responsive="true" style="width:100%;">}}

Ici, vous pouvez mettre à jour le nom de l'équipe, rendre une équipe visible secrète, et vice-versa, changer une équipe en inter-organisationnelle ou supprimer complètement une équipe.

Pour mettre à jour d'autres paramètres d'équipe, effectuez la modification souhaitée et cliquez sur le bouton bleu **Save** en bas.

{{< img src="cloudcraft/account-management/manage-teams/update-team-settings.png" alt="Capture d'écran de l'interface de gestion d'équipe de Cloudcraft avec des options pour modifier la visibilité de l'équipe et les rôles." responsive="true" style="width:100%;">}}

Pour supprimer une équipe, cliquez simplement sur le bouton rouge **Delete** et confirmez que vous souhaitez supprimer votre équipe.

{{< img src="cloudcraft/account-management/manage-teams/delete-team.png" alt="Interface Cloudcraft affichant une boîte de dialogue de confirmation pour supprimer une équipe." responsive="true" style="width:100%;">}}

Si vous avez des questions ou des difficultés avec le processus, [contactez notre équipe d'assistance][2], et nous serons heureux de vous aider.

[1]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[2]: https://app.cloudcraft.co/app/support