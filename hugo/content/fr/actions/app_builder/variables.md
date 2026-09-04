---
aliases:
- /fr/app_builder/variables
- /fr/service_management/app_builder/variables
description: Encapsulez la logique dans vos applications en utilisant des variables
  d'état pour stocker et manipuler des données entre différents composants d'application.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
- link: /actions/app_builder/expressions/
  tag: Documentation
  text: Expressions JavaScript
title: Variables d'état
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Si vous souhaitez encapsuler la logique dans votre application, vous pouvez utiliser des variables d'état.

## Créez une variable d'état {#create-a-state-variable}

Pour ajouter une variable d'état avec Bits AI :
   1. Cliquez sur l'icône {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Saisissez une invite personnalisée pour une variable, ou essayez l'invite `How can you help me with variables?`.

Pour ajouter une variable d'état manuellement :

1. Dans votre application, cliquez sur l'icône {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) pour ouvrir l'onglet Données.
1. Cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}), puis sélectionnez {{< ui >}}Variable{{< /ui >}}.
1. Optionnellement, cliquez sur le nom de la variable et renommez-la.
1. Définissez la valeur initiale de votre variable d'état.

## Exemple d'application {#example-app}

{{< img src="actions/app_builder/state-variables-example-app.mp4" alt="Un clic sur le bouton fait basculer la valeur du composant de légende entre un Pass vert et un Fail rouge." video="true" width="360px">}}

Pour créer une application qui utilise un bouton pour modifier le style et la valeur d'un composant de valeur de légende, suivez ces instructions.

### Créez les variables {#create-the-variables}

1. Dans votre application, cliquez sur l'icône {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) pour ouvrir l'onglet Données.
1. Cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}), puis sélectionnez {{< ui >}}Variable{{< /ui >}}.
1. Nommez la variable `callout_value` et définissez sa {{< ui >}}Initial Value{{< /ui >}} sur `Pass`.
1. Cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}) pour créer une autre variable.
1. Nommez cette variable `callout_color` et définissez sa {{< ui >}}Initial Value{{< /ui >}} sur `green`.

### Créez les composants {#create-the-components}

1. Ajoutez un composant de valeur de légende à votre application. Donnez-lui les valeurs suivantes :
    * {{< ui >}}Value{{< /ui >}} : `${callout_value.value}`
    * {{< ui >}}Style{{< /ui >}} : `${callout_color.value}`
1. Ajoutez un composant bouton à votre application et définissez son étiquette sur `Change status`.
1. Sous {{< ui >}}Events{{< /ui >}}, ajoutez un événement. Donnez-lui les valeurs suivantes :
    * {{< ui >}}Event{{< /ui >}} : `click`
    * {{< ui >}}Reaction{{< /ui >}} : `custom`
    * {{< ui >}}Callback{{< /ui >}} :
        ```
        ${ () => {
            if(callout_color.value !== "green"){
                callout_color.setValue("green")
                callout_value.setValue("Pass")
            } else {
            callout_color.setValue("red")
            callout_value.setValue("Fail")
            }
        } }
        ```
1. Cliquez sur {{< ui >}}Preview{{< /ui >}} pour prévisualiser votre application.<br>
    Lorsque vous cliquez sur le bouton {{< ui >}}Change status{{< /ui >}} dans votre application, la couleur et le texte du composant de valeur de légende alternent entre un Pass vert et un Fail rouge.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][1].

[1]: https://chat.datadoghq.com/