---
title: Apps Datadog
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md"
    tag: Github
    text: Guide de conception
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md"
    tag: Github
    text: Modèle de programmation
---

## Rejoignez la bêta !
Les Apps Datadog sont actuellement en version bêta, mais vous pouvez facilement accéder à cette fonctionnalité ! [Utilisez ce formulaire][5] pour envoyer une demande dès aujourd'hui. Dès celle-ci approuvée, vous pourrez libérer votre créativité et développer votre App pour vous ou votre organisation, et même la publier sur le catalogue des Apps Datadog pour que toute la communauté puisse en profiter !

## Qu'est-ce qu'une App ?

Les Apps Datadog permettent aux développeurs d'étendre les fonctionnalités natives de Datadog au moyen de widgets de dashboard personnalisés. Par exemple, si vous souhaitez utiliser une vue non prise en charge par Datadog ou un workflow de remédiation couramment exécuté dans une plateforme tierce, vous pouvez écrire une App pour ajouter cette fonctionnalité dans Datadog.

## Configuration

### Créer une App

1. Créez une App Datadog.

$ `yarn create @datadog/app`

2. Accédez au dossier que vous venez de créer.

$ `cd starter-kit`


3. Configurez votre environnement de développement.

$ `yarn start`

Cette commande lance votre serveur de développement local sur http://localhost:3000/.

<img style="max-width:80%" alt="L'App a été chargée" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

Si vous voyez ce message, votre App est en cours d'exécution.

Notez qu'il existe deux pages différentes :
`http://localhost:3000` : Un contrôleur principal qui assure l'orchestration de vos différentes extensions (comme les widgets, les menus ou les fenêtres contextuelles). Cette page s'avèrera utile lorsque vous aurez enrichi les fonctionnalités de votre App.

`http://localhost:3000/widget` : Les composants des widgets, fenêtres contextuelles ou autres éléments qui nécessitent un affichage dédié.

Consultez le [Guide d'utilisation de la plateforme de développement][3] (en anglais) pour en savoir plus sur cette architecture.

4. Accédez à votre [Plateforme de développement][4] dans Datadog et cliquez sur **+ New App** en haut à droite.

<img style="max-width:80%" alt="Nouvelle App" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

5. Saisissez le nom de votre App. Choisissez un nom descriptif pour la différencier des autres Apps que vous pourriez créer.

6. Vous accédez alors au dashboard de votre nouvelle App. De là, vous avez la possibilité de modifier le nom choisi, de saisir une description plus détaillée, ou de modifier l'icône de l'App.

<img style="max-width:80%" alt="Dashboard des paramètres de l'App" src="https://user-images.githubusercontent.com/228230/137548724-0487c169-9b65-4b31-bfa6-f8da3bbd2785.png">


### Ajouter votre App à un dashboard

1. Pour pouvoir ajouter votre App à un dashboard, vous devez d'abord l'activer en cliquant sur **UI Extensions** à gauche.

<img style="max-width:80%" alt="Activer l'option UI Extensions" src="https://user-images.githubusercontent.com/228230/137548823-0ad7f1ae-512f-44a4-93ca-c2aa3c47b992.png">

Une fois cette vue chargée, cliquez sur le bouton **Enable UI Extensions**. 

2. D'autres options pour votre App s'affichent alors.

Assurez-vous de modifier l'URL racine et l'URL racine du mode debugging en fonction de la version localhost du widget que vous utilisez. Le chemin vers le contrôleur principal est `/widget`. Ces URL changeront au cours du développement de votre App et lorsque vous commencerez à l'héberger sur votre propre infrastructure.

3. Activez l'option
« Dashboard Custom Widget ». Le JSON du widget est alors généré sur la droite.

<img style="max-width:80%" alt="Dashboard Custom Widget" src="https://user-images.githubusercontent.com/228230/137549275-f901e4c1-16ad-4c82-95f3-9ba7f346c9ba.png">


Notez que ce JSON contient une valeur intitulée `Your first widget`. Il s'agit du nom de votre widget, qui apparaît dans le menu pour l'ajouter à vos dashboards.

4. Accédez à votre dashboard et ajoutez un widget.

<img style="max-width:80%" alt="Ajouter un widget à un dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


5. La section **Custom Widgets** est située en bas de la barre latérale. Recherchez votre widget dans la liste, et ajoutez-le à votre dashboard.

<img style="max-width:80%" alt="Custom Widget" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

6. Un aperçu de votre nouveau widget apparaît, ainsi que plusieurs options. Faites défiler la fenêtre contextuelle et cliquez sur *Done* pour ajouter le widget à votre dashboard.

<img style="max-width:80%" alt="Nouvelle App" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

<img style="max-width:80%" alt="Nouvelle App 2" src="https://user-images.githubusercontent.com/228230/137550757-96bce01d-2ec4-4c0f-b045-e18b756e52df.png">



Pour créer le build de votre App, exécutez `yarn build` dans votre terminal. Ensuite, déplacez le site statique généré vers la solution d'hébergement de votre choix et mettez à jour les URL dans les paramètres de l'App.

### Accès via API OAuth

Lorsque cette fonctionnalité est activée, les utilisateurs doivent s'authentifier pour pouvoir utiliser l'App. Vous avez la possibilité d'intégrer votre mécanisme d'authentification existant (par exemple, une connexion par nom d'utilisateur/mot de passe basée sur des cookies) à la Plateforme de développement.

### Exemples d'App

[Starter kit][1]

[Sentiment analysis][2]


[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
