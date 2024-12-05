---
aliases:
- /fr/real_user_monitoring/roku/
code_lang: roku
code_lang_weight: 60
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku
  tag: Documentation
  text: Configuration avancée du RUM pour Roku
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Github
  text: Code source dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer la solution RUM de Datadog
- link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  tag: Blog
  text: Surveiller vos canaux Roku avec la solution RUM de Datadog
title: Configuration de la surveillance des canaux Roku avec RUM
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Le RUM pour Roku n'est pas disponible sur le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Section Overview

Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre canal.

Le SDK Roku Datadog prend en charge les canaux BrightScript dans la version 10 et les versions ultérieures du système d'exploitation Roku.

## Audit Trail

1. Déclarez le SDK en tant que dépendance.
2. Ajoutez les détails de l'application dans Datadog.
3. Initialisez la bibliothèque.
4. Instrumentez le canal.

### Déclarer le SDK en tant que dépendance

#### Utiliser ROPM (recommandé)

`ROPM` est un gestionnaire de packages pour la plateforme Roku (basé sur NPM). Si vous n'utilisez pas encore `ROPM` dans votre projet Roku, consultez le [guide de prise en main][1] du gestionnaire de packages. Une fois votre projet configuré pour tirer parti de `ROPM`, vous pouvez utiliser la commande suivante afin d'installer la dépendance Datadog :

```shell
ropm install datadog-roku
```

### Configurer manuellement

Si votre projet n'utilise pas `ROPM`, installez la bibliothèque manuellement en téléchargeant l'archive du [SDK Roku][2] au format zip et en la décompressant dans le dossier racine de votre projet.

Vérifiez que vous disposez bien d'un sous-dossier `roku_modules/datadogroku` dans les dossiers `components` et `source` de votre projet.

### Ajouter les détails de l'application dans Datadog

1. Accédez à [**UX Monitoring** > **Setup & Configurations** > **New Application**][3].
2. Sélectionnez le type d'application **Roku* et attribuez un nom à l'application afin de générer un ID d'application Datadog unique ainsi qu'un token client.
3. Pour désactiver la collecte automatique des IP client ou des données de géolocalisation, décochez les cases correspondant à ces paramètres. Pour en savoir plus, consultez la section [Données RUM recueillies (Roku)][4].

   {{< img src="real_user_monitoring/roku/roku-new-application-2.png" alt="Créer une application RUM pour Roku dans Datadog" style="width:90%;">}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][5] pour configurer la bibliothèque `dd-sdk-roku`, ces clés seront exposées côté client dans le code BrightScript du canal Roku. 

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][6].

### Initialiser la bibliothèque

Dans l'extrait d'initialisation, définissez un nom d'environnement. Pour en savoir plus, consultez la section [Utiliser des tags][7].

{{< site-region region="us" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<TOKEN_CLIENT>",
        applicationId: "<ID_APPLICATION>"
        site: "us1",
        env: "<NOM_ENVIRONNEMENT>",
        sessionSampleRate: 100, ' le pourcentage (nombre entier) de sessions à suivre
        launchArgs: args
    })

    ' terminer la configuration de votre canal ici
end sub
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<TOKEN_CLIENT>",
        applicationId: "<ID_APPLICATION>"
        site: "eu1",
        env: "<NOM_ENVIRONNEMENT>",
        sessionSampleRate: 100, ' le pourcentage (nombre entier) de sessions à suivre
        launchArgs: args
    })

    ' terminer la configuration de votre canal ici
end sub
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<TOKEN_CLIENT>",
        applicationId: "<ID_APPLICATION>"
        site: "us3",
        env: "<NOM_ENVIRONNEMENT>",
        sessionSampleRate: 100, ' le pourcentage (nombre entier) de sessions à suivre
        launchArgs: args
    })

    ' terminer la configuration de votre canal ici
end sub
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<TOKEN_CLIENT>",
        applicationId: "<ID_APPLICATION>"
        site: "us5",
        env: "<NOM_ENVIRONNEMENT>",
        sessionSampleRate: 100, ' le pourcentage (nombre entier) de sessions à suivre
        launchArgs: args
    })

    ' terminer la configuration de votre canal ici
end sub
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<TOKEN_CLIENT>",
        applicationId: "<ID_APPLICATION>"
        site: "ap1",
        env: "<NOM_ENVIRONNEMENT>",
        sessionSampleRate: 100, ' le pourcentage (nombre entier) de sessions à suivre
        launchArgs: args
    })

    ' terminer la configuration de votre canal ici
end sub
```
{{< /site-region >}}

### Instrumenter le canal

Consultez la section [**Suivre les ressources RUM**][8] afin d'activer le suivi automatique de toutes vos ressources, ainsi que la section  [**Enrichissement des sessions utilisateur**][9] pour ajouter des informations utilisateur ou globales personnalisées à vos événements.

#### Suivre les vues RUM

Pour décomposer les [sessions utilisateur][4] en étapes logiques, créez une vue manuellement en utilisant le code ci-dessous. Chaque passage à un nouvel écran au sein de votre canal doit correspondre à une nouvelle vue RUM.

```brightscript
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

#### Suivre les actions RUM

Les actions RUM représentent les interactions de vos utilisateurs avec votre canal. Vous pouvez transmettre des actions à Datadog comme suit :

```brightscript
    targetName = "playButton" ' le nom du nœud SG avec lequel l'utilisateur a interagi
    actionType = "click" ' le type d'interaction, doit correspondre à « click », « back » ou « custom » 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

#### Suivre les erreurs RUM

Lorsque vous effectuez une opération susceptible de générer une exception, vous pouvez transmettre l'erreur à Datadog comme suit :

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```




## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/rokucommunity/ropm
[2]: https://github.com/DataDog/dd-sdk-roku
[3]: https://app.datadoghq.com/rum/application/create
[4]: /fr/real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku
[5]: /fr/account_management/api-app-keys/#api-keys
[6]: /fr/account_management/api-app-keys/#client-tokens
[7]: /fr/getting_started/tagging/using_tags/#rum--session-replay
[8]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#track-rum-resources
[9]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#enrich-user-sessions