---
aliases:
- /fr/developers/datadog_apps/
dependencies:
- https://github.com/DataDog/apps/blob/master/docs/en/getting-started.md
further_reading:
- link: https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md
  tag: Github
  text: Guide de conception
- link: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
  tag: Github
  text: Modèle de programmation
title: Extensions de l'interface Datadog
---
## Que sont les extensions de l'interface Datadog

Les extensions de l'interface permettent aux développeurs d'étendre les fonctionnalités natives de Datadog au moyen de widgets de dashboard personnalisés. Par exemple, si vous souhaitez utiliser une vue non prise en charge par Datadog ou un workflow de remédiation couramment exécuté dans une plateforme tierce, vous pouvez écrire une extension de l'interface pour ajouter cette fonctionnalité dans Datadog.

## Configuration

### Configurez votre environnement de développement local.

1. Créez une application Datadog pour votre extension d'interface :
   ```
   yarn create @datadog/app
   ```

1. Accédez au dossier que vous venez de créer :
   ```
   cd starter-kit
   ```

1. Configurez votre environnement de développement :
   ```
   yarn start
   ```

Cette commande lance votre serveur de développement local sur `http://localhost:3000/`.

Si vous voyez ce message, votre application est en cours d'exécution :

<img style="max-width:70%" alt="Le contrôleur de l'application est en cours d'exécution en arrière-plan" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

Notez qu'il y a deux pages :
- `http://localhost:3000` : Un contrôleur principal qui assure l'orchestration de vos différentes extensions (comme les widgets, les menus ou les fenêtres contextuelles). Cette page s'avèrera utile lorsque vous aurez enrichi les fonctionnalités de votre App.
- `http://localhost:3000/widget` : Les composants des widgets, fenêtres contextuelles ou autres éléments qui nécessitent un affichage dédié.

Consultez le [Guide d'utilisation de la plateforme de développement][3] (en anglais) pour en savoir plus sur cette architecture.

<div class="alert alert-info">
Il se peut que vous remarquiez une erreur <strong>HandshakeTimeoutError</strong> dans votre console JavaScript lorsque vous interagissez directement avec le widget local dans votre navigateur. C'est normal. Le SDK Datadog Apps est <a href="https://github.com/Datadog/apps/blob/master/docs/en/programming-model.md">conçu</a> pour s'exécuter dans une iframe qui se connecte à l'interface utilisateur Datadog et la tentative de prise de contact entre le widget et l'interface Datadog est interrompue lorsqu'il n'y a pas d'interface Datadog avec laquelle le SDK doit communiquer.
</div>

### Ajouter votre application à la plateforme des développeurs

1. Accédez à la [**Integrations** > **Developer Platform**][4] et cliquez sur **+ New App**.
   <img style="max-width:80%" alt="Ajouter une nouvelle application à la plateforme des développeurs" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

1. Saisissez un nom unique pour votre application.

1. Une fois que vous avez accès au dashboard de votre nouvelle application, vous pouvez choisir de modifier le nom choisi, de saisir une description plus détaillée, ou de modifier l'icône de l'application.
   <img style="max-width:80%" alt="Modifier les informations de l'application depuis son dashboard" src="https://user-images.githubusercontent.com/17037651/163401812-d21a9d3a-e73f-49b0-bda4-e7c447295784.png">


### Ajouter votre App à un dashboard

1. Pour pouvoir ajouter votre App à un dashboard, vous devez d'abord l'activer en cliquant sur **UI Extensions**.
   <img style="max-width:80%" alt="Bouton Enable UI Extensions de l'interface de modification d'App" src="https://user-images.githubusercontent.com/17037651/163401958-153f6c80-d7ba-4b47-a40d-1cf08913602d.png">

   Une fois cette vue chargée, cliquez sur le bouton **Enable UI Extensions**.

1. Une fois que vous avez accès à d'autres options pour votre application, modifiez les options **Root URL** et **Debug Mode Root URL** pour qu'elles correspondent à la version `localhost` du widget que vous utilisez. Le chemin du contrôleur principal est `/widget`. Ces valeurs d'URL changeront au fur et à mesure que vous construirez votre application et que vous commencerez à l'héberger sur votre propre infrastructure.

1. Activez l'option **Dashboard Custom Widget**. Cela génère un fichier JSON pour l'application.

   <img style="max-width:80%" alt="Écran UI Extensions de l'interface de modification d'App" src="https://user-images.githubusercontent.com/17037651/163402086-a3afbecd-c9c0-4608-bb91-6cb5391fec93.png">

   Dans cet exemple, la sortie JSON contient une valeur intitulée `Your first widget`. Il s'agit du nom de votre widget, qui apparaît dans le menu pour l'ajouter à vos dashboards.

1. Accédez à votre dashboard et ajoutez un widget.

   <img style="max-width:80%" alt="Ajouter un widget à votre dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


1. La section **Custom Widgets** est située en bas de la barre latérale. Recherchez votre widget dans la liste, et ajoutez-le à votre dashboard.

   <img style="max-width:80%" alt="Ajouter votre widget depuis la section des widgets personnalisés" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

1. Un aperçu de votre nouveau widget apparaît, ainsi que plusieurs options. Faites défiler la page et cliquez sur **Done** pour ajouter le widget à votre dashboard.

   <img style="max-width:80%" alt="Cliquez sur Done pour ajouter votre widget au dashboard" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

1. Pour créer le build de votre App, exécutez `yarn build` dans votre terminal. Ensuite, déplacez le site statique généré vers la plateforme d'hébergement de votre choix et mettez à jour les URL dans les paramètres de l'App.

### Accès via API OAuth

Lorsque OAuth API Access est activé, les utilisateurs doivent s'authentifier pour pouvoir utiliser l'App. Vous avez la possibilité d'intégrer votre mécanisme d'authentification existant (par exemple, une connexion par nom d'utilisateur/mot de passe basée sur des cookies) à la Plateforme de développement.

### Exemples d'App

- [Starter kit][1]
- [Sentiment analysis][2]

## Pour aller plus loin

- [En savoir plus sur la plateforme pour développeurs Datadog](https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/)
- [En savoir plus sur les extensions de l'interface](https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md#oauth-api-access)

[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
