---
description: Enregistrez et réutilisez des groupes de composants et de requêtes dans
  plusieurs applications App Builder sous forme de modèles modulaires.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
- link: /actions/app_builder/queries/
  tag: Documentation
  text: Requêtes
title: Modules réutilisables
---
Utilisez la fonctionnalité _Modules réutilisables_ pour enregistrer des groupes de composants et de requêtes en tant que modèles afin de les réutiliser dans vos applications App Builder. Les modules incluent automatiquement toutes les dépendances pour garantir le bon fonctionnement de vos composants.

<div class="alert alert-info">Les modules par défaut sont en lecture seule. Pour modifier un module par défaut, dupliquez-le d'abord.</div>

## Créer un module réutilisable {#create-a-reusable-module}

Il existe trois façons de créer un module réutilisable :

### Depuis le panneau des composants {#from-the-components-panel}
1. Pendant la modification d'une application, cliquez sur l'icône d'extension (<i class="icon-expand-to-left-wui" style="position:relative; top:4px;"></i>) pour ouvrir le panneau des composants.
2. Cliquez sur un composant pour le sélectionner.
3. Dans le panneau des composants, cliquez sur l'icône de menu (<i class="icon-config-1" style="position:relative; top:4px;"></i>).
4. Cliquez sur {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}).
5. [Configurez votre module][3].

### Depuis l'onglet du nom d'instance d'un composant {#from-a-components-instance-name-tab}
1. Pendant la modification d'une application, sélectionnez un composant sur le canevas de l'application.
2. Cliquez sur l'icône {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}) dans l'onglet du nom d'instance du composant.
3. [Configurez votre module][3].

### À partir des composants sélectionnés {#from-selected-components}
1. Lors de la modification d'une application, maintenez la touche Maj enfoncée et cliquez sur plusieurs composants pour les sélectionner.
2. Dans le panneau latéral qui s'affiche à droite, cliquez sur {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}).

## Configurer un module {#configure-a-module}

Lors de la création de votre module, l'éditeur de module vous permet de prévisualiser les composants et les requêtes, d'ajouter un nom et une description, et d'examiner les dépendances avant d'enregistrer.

{{< img src="actions/app_builder/app-builder-reusable-module-preview.png" alt="Éditeur de module affichant un aperçu des composants et des requêtes avec les champs de nom et de description" style="width:100%;">}}

1. Saisissez un nom et une description.
2. Examinez les composants et les requêtes qui sont automatiquement inclus. Le système inclut toutes les dépendances de requête imbriquées.
3. Cliquez sur {{< ui >}}Save Module{{< /ui >}}.

## Ajouter un module réutilisable à une application {#add-a-reusable-module-to-an-app}
1. Lors de la modification d'une application, cliquez sur l'icône Add Component (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. Dans la section {{< ui >}}Modules{{< /ui >}}, cliquez sur un module ou faites-le glisser sur le canevas de l'application.


## Supprimer un module {#delete-a-module}
1. Lors de la modification d'une application, cliquez sur l'icône Add Component (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. Dans la section {{< ui >}}Modules{{< /ui >}}, cliquez sur l'icône edit ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}) pour le module que vous souhaitez supprimer.
3. Dans l'éditeur de module, cliquez sur {{< ui >}}Delete Module{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Slack de la communauté Datadog][2].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://chat.datadoghq.com/
[3]: /fr/actions/app_builder/components/reusable_modules/#configure-a-module