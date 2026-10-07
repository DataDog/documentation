---
title: 'Créer de meilleurs diagrammes : diagrammes Live et filtrage dans Cloudcraft'
---

## Présentation

Cloudcraft est un outil puissant vous permettant de créer des diagrammes représentant votre infrastructure cloud. Grâce à la nouvelle expérience Live, vous pouvez créer des diagrammes à la fois précis et à jour pour votre infrastructure cloud.

Filtrez les ressources par type et par tag pour créer des diagrammes précis qui affichent exclusivement les composants spécifiques qui vous intéressent. Cela permet non seulement d'améliorer les performances et la lisibilité de vos diagrammes, mais également de créer des visualisations de votre infrastructure plus pertinentes.

Ce guide décrit les étapes à suivre pour activer la nouvelle expérience Live et pour l'utiliser afin de créer des diagrammes informatifs adaptés à vos besoins.

## Prérequis

Avant de commencer, vous devez connecter votre compte AWS ou Azure à Cloudcraft. Pour en savoir plus, consultez les sections suivantes :

- [Connecter votre compte AWS à Cloudcraft][1]
- [Connecter votre compte Azure à Cloudcraft][2]

## Activer la nouvelle expérience Live

Pour bénéficier de cette fonctionnalité, activez le bouton **New Live Experience** en haut de l'onglet **Live** sur Cloudcraft.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/enable-new-experience.png" alt="Capture d'écran avec le bouton d'activation de la nouvelle fonctionnalité bêta d'expérience Live dans l'interface Cloudcraft, qui est indiqué par une flèche rouge." responsive="true" style="width:80%;">}}

Si vous êtes un nouvel utilisateur, il se peut que l'option New Live Experience soit déjà activée par défaut.

## Sélectionner un compte et une région

Cliquez sur le menu déroulant sous la section **Account** et sélectionnez le compte que vous souhaitez analyser. Si vous n'avez ajouté qu'un seul compte AWS ou Azure à Cloudcraft, il est automatiquement sélectionné pour vous.

Sous **Region**, sélectionnez les régions que vous souhaitez analyser. Par défaut, l'option `Global` et votre région par défaut sont sélectionnées, mais vous pouvez cliquer sur le bouton **More** pour sélectionner ou rechercher d'autres régions.

Après avoir effectué vos sélections, les régions sont analysées automatiquement et le nombre de ressources détectées est indiqué à côté du nom de la région. Vous pouvez cliquer sur le bouton **Sync** au-dessus de la section **Région** pour effectuer une analyse manuelle de toutes les régions sélectionnées.

<div class="alert alert-danger">La sélection d'un grand nombre de régions peut avoir une incidence sur les performances du processus d'analyse en direct.</div>

## Filtrer les ressources

Vous pouvez filtrer les ressources par type et par tag.

Les tags sont automatiquement détectés à partir de votre compte AWS et affichés dans les sections **Custom tags**, **AWS tags**, **Terraform tags** et **Kubernetes tags**.

- La section **Custom tag** affiche les tags que vous avez ajoutés aux ressources dans AWS ou Azure.
- La section **AWS tags** affichent les tags ajoutés automatiquement aux ressources par AWS.
- La section **Terraform tags** affiche les tags ajoutés automatiquement aux ressources par Terraform.
- La section **Kubernetes tags** affiche les tags ajoutés automatiquement aux ressources par Kubernetes.

Pour filtrer les ressources par type, cliquez sur la section **Resource** et sélectionnez le type de ressource que vous souhaitez filtrer. Par défaut, tous les types de ressources sont sélectionnés. Leur ordre d'affichage est basé sur le nombre de ressources détectées.

Pour filtrer les ressources par tag, cliquez sur la section **Custom tags**, **AWS tags**, **Terraform tags** ou **Kubernetes tags** et sélectionnez les tags que vous souhaitez filtrer. Par défaut, tous les tags sont sélectionnés. Leur ordre d'affichage est basé sur le nombre de ressources détectées. L'option `Untagged` est systématiquement affichée en bas de la liste.

<div class="alert alert-info">Pour optimiser les performances et améliorer la lisibilité de votre diagramme, affichez seulement les types de ressources et les tags les plus pertinents selon vos besoins.</div>

## Cas d'utilisation

### Créer un diagramme représentant uniquement les instances EC2 et les bases de données RDS

1. Cliquez sur la section **Resource**.
2. Désélectionnez tous les types de ressources, puis sélectionnez **EC2** et **RDS**.
3. Cliquez sur **Apply layout** pour créer un diagramme représentant uniquement les ressources sélectionnées.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources.mp4" alt="Une vidéo de 9 secondes représentant un utilisateur Cloudcraft sélectionnant les instances EC2 et RDS depuis la section Resource." video="true">}}

### Créer un diagramme représentant les instances EC2 et les bases de données RDS sans le tag `Environment` 

1. Cliquez sur la section **Ressources**.
2. Désélectionnez tous les types de ressources, puis sélectionnez **EC2** et **RDS**.
3. Cliquez sur la section **Custom tags**.
4. Cliquez sur la balise **Environment**, et désélectionnez toutes les options sauf `Untagged`.
5. Cliquez sur **Apply layout** pour créer un diagramme représentant uniquement les ressources sélectionnées sans le tag `Environment`.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources-and-tags.mp4" alt="Une vidéo de 15 secondes représentant un utilisateur Cloudcraft sélectionnant les instances EC2 et RDS et les ressources sans tag depuis les sections Resource et Custom tags." video="true">}}

## Commentaires

La nouvelle expérience Live de Cloudcraft fait partie d’une démarche continue d’amélioration de l’expérience utilisateur et d’optimisation de la création de diagrammes d’infrastructure cloud. Dites-nous comment vous utilisez ces nouvelles fonctionnalités et [partagez avec nous vos retours via ce formulaire][3].

[1]: https://docs.datadoghq.com/fr/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: https://docs.datadoghq.com/fr/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: https://docs.google.com/forms/d/e/1FAIpQLSemnd5CJgrS9o-5ZCoZSxi99ATqIg9jpgqtcUZpMBzPJO75Wg/viewform