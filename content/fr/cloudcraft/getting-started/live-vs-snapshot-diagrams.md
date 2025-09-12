---
title: Diagrammes Live et Snapshot
---

## Présentation

Cloudcraft propose deux types de diagrammes pour visualiser votre infrastructure cloud : Live et Snapshot. Ce document explique les différences clés entre ces types de diagrammes et comment les utiliser efficacement.

## Diagrammes Live

Les diagrammes Live fournissent une représentation en temps réel de votre infrastructure AWS ou Azure. Fonctionnalités principales :

- **Mises à jour automatiques** : le diagramme reflète les changements de votre infrastructure à chaque accès.
- **Précision en temps réel** : garantit que le diagramme représente toujours l'état actuel de votre infrastructure cloud.
- **Filtrage en direct** : permet de se concentrer sur des composants ou services spécifiques en appliquant des filtres.

## Diagrammes Snapshot

Les diagrammes Snapshot offrent une vue statique de votre infrastructure que vous pouvez modifier selon vos préférences visuelles. Caractéristiques importantes :

- **Disposition modifiable** : permet de déplacer les composants et d'ajuster la conception du diagramme.
- **Ajouts personnalisés** : vous pouvez ajouter des composants depuis l'onglet Design.
- **Représentation statique** : le diagramme ne se met pas à jour automatiquement pour refléter les changements de l'infrastructure.

## Différences principales

### Mécanisme de mise à jour

- **Diagrammes Live** : se mettent à jour automatiquement à chaque accès, en reflétant tout changement dans votre infrastructure AWS ou Azure.
- **Diagrammes Snapshot** : restent statiques et ne se mettent pas à jour automatiquement.

### Fonctionnalités d'édition

- **Diagrammes Live** : options d'édition limitées, comme le filtrage et le regroupement des composants.
- **Diagrammes Snapshot** : permettent une édition complète de la disposition et du design.

### Basculer entre les types de diagramme

- **Live vers Snapshot** : toute modification d'un diagramme Live (par exemple, déplacer un composant ou en ajouter un) le fait automatiquement passer en mode Snapshot.
- **Snapshot vers Live** : repasser en mode Live annule toutes les modifications effectuées en mode Snapshot.

## Utiliser les diagrammes Live et Snapshot

1. Commencez par un diagramme Live pour obtenir une vue précise et en temps réel de votre infrastructure. Consultez la section [Créer de meilleurs diagrammes : diagrammes en direct et filtrage dans Cloudcraft][1] (en anglais) pour en savoir plus.
2. Apportez des modifications à la disposition, au design ou aux composants, ce qui bascule automatiquement le diagramme en mode Snapshot.
3. En mode Snapshot, ajustez librement la mise en page et le design selon vos besoins.
4. Pour mettre à jour le diagramme avec les derniers changements de l'infrastructure, repassez en mode Live en sélectionnant le mode dans le menu déroulant situé en haut à droite du diagramme. Attention : cette action supprime toutes les modifications apportées en mode Snapshot.
5. Chaque fois que vous passez du mode Snapshot au mode Live, Cloudcraft crée une nouvelle version dans le système de contrôle de versions, ce qui vous permet de revenir à une version précédente si nécessaire.

{{< img src="cloudcraft/getting-started/live-vs-snapshot-diagrams/mode-dropdown.png" alt="Capture d'écran du menu déroulant de sélection du mode de diagramme dans Cloudcraft, affichant les modes Live et Snapshot." responsive="true" style="width:100%;">}}

En comprenant les différences entre les diagrammes Live et Snapshot, vous pouvez visualiser et gérer efficacement votre infrastructure cloud dans Cloudcraft.

[1]: /fr/cloudcraft/getting-started/crafting-better-diagrams/