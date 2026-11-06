---
description: Les paramètres d'entrée vous permettent d'intégrer la même application
  dans plusieurs dashboards ou notebooks en utilisant des configurations différentes
  pour chaque instance.
disable_toc: false
title: Paramètres d'entrée
---
Les paramètres d'entrée vous permettent d'intégrer la même application dans plusieurs dashboards ou notebooks en utilisant des configurations différentes pour chaque instance. 

## Exemple d'application {#example-app}

Un cas d'utilisation courant des paramètres d'entrée consiste à réutiliser et personnaliser une application pour différents environnements, tels que développement, pré-production et production. Dans la capture d'écran ci-dessous, une application est intégrée deux fois dans un dashboard. L'application de gauche affiche les monitors dans l'environnement de démonstration, tandis que l'application de droite affiche les mêmes informations pour les monitors dans l'environnement de pré-production. Vous pouvez essayer cette application en clonant le modèle [Comment faire : Paramètres d'entrée][3].

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="Deux applications intégrées avec des paramètres d'entrée différents sélectionnés" style="width:100%;" >}}

## Créer un paramètre d'entrée {#create-an-input-parameter}

1. Dans [App Builder][1], sélectionnez une application et cliquez sur {{< ui >}}Edit{{< /ui >}}. 
1. Cliquez sur l'icône {{< ui >}}App Properties{{< /ui >}} ({{< img src="actions/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}}).
1. Cliquez sur l'icône plus (<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) pour ajouter un paramètre d'entrée. 
1. Cliquez sur le nouveau paramètre d'entrée pour configurer ses éléments : 
    - {{< ui >}}Parameter Name{{< /ui >}}
    - {{< ui >}}Display Name{{< /ui >}} (Facultatif) 
    - {{< ui >}}Data Type{{< /ui >}}
    - {{< ui >}}Allowed Values{{< /ui >}}
    - {{< ui >}}Default Value{{< /ui >}}
    - {{< ui >}}Description{{< /ui >}} (Facultatif) 
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Exemple de paramètre d'entrée {#example-input-parameter}

Cet exemple de paramètre d'entrée montre la même application dans divers environnements de pré-production :

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="Un exemple de paramètres d'entrée configurés dans une application" style="width:35%;" >}}

## Utiliser des paramètres d'entrée {#use-input-parameters}

<div class="alert alert-info">Les applications avec des paramètres d'entrée fonctionnent mieux dans les dashboards et les notebooks. Bien que vous puissiez ajouter une application aux Self-Service Actions, vous ne pouvez pas sélectionner les paramètres d'entrée que vous avez configurés. 
</div>

Pour intégrer une application avec des paramètres d'entrée :

1. Dans [App Builder][1], sélectionnez une application avec un paramètre d'entrée configuré.
1. Cliquez sur {{< ui >}}Add to a dashboard{{< /ui >}}. 
1. Sélectionnez un dashboard, puis cliquez sur {{< ui >}}Save and Open{{< /ui >}}.
1. Dans votre dashboard, survolez l'application et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
1. Dans la section {{< ui >}}Input Parameters{{< /ui >}}, sélectionnez un paramètre d'entrée :
{{< img src="/actions/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="Un exemple d'application en mode édition avec les paramètres d'entrée entourés" style="width:80%;" >}}
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Réutiliser une application {#reuse-an-app}

Après avoir intégré une application dans un dashboard ou un notebook, vous pouvez en créer une copie pour la réutiliser dans différents contextes :
1. Sélectionnez l'application intégrée. 
1. Cliquez sur l'icône {{< ui >}}Options{{< /ui >}} (<i class="icon-kebab-wui" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>), puis cliquez sur {{< ui >}}Clone{{< /ui >}}.
    - Alternativement, vous pouvez sélectionner l'application et utiliser les raccourcis clavier copier-coller.
1. Suivez les étapes [ci-dessus][2] pour sélectionner un paramètre d'entrée différent.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /fr/actions/app_builder/embedded_apps/input_parameters/#use-input-parameters
[3]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to_input_parameters&viewMode=templatePreview