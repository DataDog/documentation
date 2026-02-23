---
title: Schématiser plusieurs comptes cloud
---

Cloudcraft est un outil vous aidant à visualiser et planifier aisément et efficacement votre architecture cloud. Ce guide explique comment utiliser l'expérience d'origine de Cloudcraft pour représenter plusieurs comptes cloud dans un diagramme. Procédez comme suit pour créer un diagramme cohérent basé sur plusieurs comptes cloud.



## 1. Activer l'expérience d'origine

Pour représenter plusieurs comptes cloud dans un diagramme, vous devez activer l'expérience originale :

1. Ouvrez Cloudcraft et accédez à l'onglet **Live**.
2. Repérez l'option **New Live Experience** et vérifiez qu'elle est **désactivée**.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/new-live-experience-toggle.png" alt="Interface de Cloudcraft affichant l'interrupteur de la nouvelle expérience Live pour plusieurs comptes cloud." responsive="true" style="width:100%;">}}

## 2. Configurer la disposition du premier compte

Une fois l'expérience originale activée, configurez la disposition du premier compte :

1. Choisissez le premier compte cloud que vous souhaitez visualiser.
2. Lancez une analyse de ce compte pour recueillir les détails de son architecture actuelle.
3. Sélectionnez le bouton **Auto Layout** pour disposer automatiquement les composants de ce compte dans le diagramme.

## 3. Configurer la disposition du deuxième compte

Après avoir représenté le premier compte dans le diagramme, vous pouvez y ajouter d'autres comptes :

1. Choisissez le deuxième compte cloud à ajouter.
2. Effectuez une analyse du deuxième compte pour identifier son architecture.
3. Sélectionnez **Auto Layout**. 
4. Accédez au menu déroulant **Options** et sélectionnez **Include existing components**. Cette option permet de s'assurer que les composants du premier compte restent visibles et que les deux comptes sont intégrés à un seul diagramme.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/auto-layout-options.png" alt="Interface de Cloudcraft affichant l'inventaire AWS et les options des composants Live." responsive="true" style="width:100%;">}}

<div class="alert alert-info">Vous pouvez répéter cette étape afin d'inclure des comptes supplémentaires dans le diagramme.</div>

Cette procédure permet d'obtenir une vue consolidée de plusieurs comptes cloud au sein d'un unique diagramme Cloudcraft. Examinez la disposition pour vous assurer que tous les composants nécessaires sont inclus et positionnés comme vous le souhaitez. Ajustez manuellement les placements si nécessaire, afin d'améliorer la clarté ou le rendu.