---
aliases:
- /fr/service_management/app_builder/embedded_apps
description: Intégrez des applications publiées dans des dashboards et synchronisez-les
  avec des variables de modèle et des plages temporelles pour des actions dynamiques
  et contextuelles.
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/actions/action-catalog/
  tag: App
  text: Action Catalog
title: Intégrez des applications App Builder
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}


Lorsque vous avez des applications Datadog App Builder intégrées dans vos dashboards, vous pouvez effectuer des actions directes sur vos ressources, et toutes les données et le contexte pertinents sont immédiatement disponibles. Liez votre application à la plage temporelle et aux variables de modèle du dashboard pour définir dynamiquement le périmètre des actions de l'application, ce qui vous permet d'effectuer des actions dans votre environnement dans tout périmètre nécessaire.

<div class="alert alert-info">Cette page décrit l'intégration des applications App Builder, que vous créez dans Datadog avec un éditeur low-code par glisser-déposer. Pour intégrer une application créée avec <a href="/actions/datadog_apps/">Datadog Apps</a>, que vous écrivez localement sous forme de code en React et TypeScript, consultez <a href="/actions/datadog_apps/embed_apps/">Embed Apps</a>.</div>

## Ajoutez des applications à votre dashboard {#add-apps-to-your-dashboard}

Ajoutez une application précédemment publiée à votre dashboard en faisant glisser le type de widget {{< ui >}}App{{< /ui >}} depuis la barre d'outils des widgets du dashboard :

{{< img src="/actions/app_builder/embedded_apps/app-widget-select.png" alt="La barre d'outils des widgets du dashboard avec le type de widget App mis en surbrillance" style="width:30%;">}}

La fenêtre modale App Editor s'affiche, vous permettant de sélectionner une application et de lui donner un titre :

{{< img src="/actions/app_builder/embedded_apps/app-editor.png" alt="La fenêtre modale App Editor avec une application sélectionnée et un titre de widget" style="width:80%;">}}

## Synchronisez votre application avec les variables de modèle et de plage temporelle du dashboard {#sync-your-app-with-dashboard-template-and-time-frame-variables}

Vous pouvez lier votre application à des variables de modèle partout où les expressions de modèle sont prises en charge dans vos requêtes ou éléments d'application. Vous pouvez également lier votre application à la plage temporelle sélectionnée sur votre dashboard.

Lorsque vous modifiez la valeur d'une variable de modèle ou d'une plage temporelle sur le dashboard, les éléments d'application liés se mettent à jour automatiquement. Par exemple, lorsque vous sélectionnez une valeur `instance_id` à l'aide du menu déroulant des variables de modèle ou directement à partir d'un graphique, la valeur `instance_id` est ajoutée au filtre de l'application. Cela vous permet d'effectuer des actions sur cette instance spécifique :

{{< img src="actions/app_builder/embedded_apps/template_variables.mp4" alt="Sélection d'une valeur de variable de modèle à partir d'un graphique" video="true">}}


### Exemples de variables de modèle {#template-variable-examples}

Pour remplir un composant de sélection avec une liste de toutes les variables de modèle disponibles, ajoutez l'expression de modèle suivante au champ {{< ui >}}Options{{< /ui >}} de votre composant de sélection :

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

Pour lister toutes les valeurs disponibles d'une variable de modèle spécifique, utilisez l'expression de modèle suivante :

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

Pour lister toutes les valeurs disponibles lors de l'utilisation d'un composant de sélection, utilisez l'expression de modèle suivante :

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues.map(availableValue => {return {label: availableValue, value:availableValue}})}
{{< /code-block >}}

Pour obtenir la valeur sélectionnée d'une variable de modèle, utilisez les expressions de modèle suivantes :

- Pour une variable de modèle à sélection unique :
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- Pour une variable de modèle à sélection multiple :
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### Exemples de plage temporelle {#time-frame-examples}

Pour obtenir la valeur de début de la plage temporelle, utilisez les expressions de modèle suivantes :

- Pour l'horodatage numérique :
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- Pour une date et une heure formatées :
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

Pour obtenir la valeur de fin de la plage temporelle, utilisez les expressions de modèle suivantes :

- Pour l'horodatage numérique :
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- Pour une date et une heure formatées :
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

Pour ajouter un bouton qui définit la valeur d'un composant de sélection de plage de dates sur la plage temporelle du dashboard, effectuez les étapes suivantes :

1. Ajoutez un composant de sélection de plage de dates à votre application et nommez-le « dateRangePicker0 ».
1. Ajoutez un bouton à votre application.
1. Sous {{< ui >}}Events{{< /ui >}} : renseignez les valeurs suivantes :
    - {{< ui >}}Event{{< /ui >}} : {{< ui >}}click{{< /ui >}}
    - {{< ui >}}Reaction{{< /ui >}} : {{< ui >}}Set Component State{{< /ui >}}
    - {{< ui >}}Component{{< /ui >}} : {{< ui >}}dateRangePicker0{{< /ui >}}
    - {{< ui >}}State Function{{< /ui >}} : {{< ui >}}setValue{{< /ui >}}
    - {{< ui >}}Value{{< /ui >}} : `${global?.dashboard?.timeframe}`
1. Enregistrez et publiez votre application.

## Ajoutez des applications au Catalog {#add-apps-to-catalog}

Ajoutez une application publiée au dashboard [Self-Service Actions][2] dans [Catalog][3] pour offrir aux développeurs un emplacement central pour provisionner l'infrastructure, créer des services, résoudre des problèmes, et plus encore.

Pour ajouter à Self-Service Actions, assurez-vous d'abord que votre application est publiée et que les autorisations sont définies. Ensuite, vous pouvez cliquer sur {{< ui >}}Add to Self-Service Actions{{< /ui >}}.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service Actions" style="width:100%;" >}}

Une fois ajoutée, vous pouvez afficher et utiliser votre application dans le Catalog.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publier dans Self-Service Actions" style="width:100%;" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][1].

[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/software/self-service
[3]: https://app.datadoghq.com/software