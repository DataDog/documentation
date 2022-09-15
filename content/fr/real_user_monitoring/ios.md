---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection.md'
description: Collectez des données RUM depuis vos applications iOS.
kind: documentation
title: Collecte de données RUM pour iOS
---
Envoyez des [données Real User Monitoring][1] à Datadog à partir de vos applications iOS avec la [SDK RUM côté client `dd-sdk-ios` de Datadog][2]. Vous pourrez notamment :

* obtenir une vue d'ensemble des performances et des données démographiques de votre application ;
* identifier les ressources les plus lentes ;
* analyser les erreurs en fonction du système d'exploitation et du type d'appareil.

## Configuration

1. Déclarez la bibliothèque en tant que dépendance en fonction de votre gestionnaire de paquets. Consultez la [page Releases][3] de Datadog pour obtenir la dernière version bêta.

    {{< tabs >}}
    {{% tab "CocoaPods" %}}

Vous pouvez utiliser [CocoaPods][4] pour installer `dd-sdk-ios` :
```
pod 'DatadogSDK'
```

[4]: https://cocoapods.org/

    {{% /tab %}}
    {{% tab "Swift Package Manager (SPM)" %}}

Pour réaliser l'intégration du SDK grâce au [Swift Package Manager d'Apple][5], ajoutez ce qui suit en tant que dépendance à votre `Package.swift` :
```swift
.package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

[5]: https://swift.org/package-manager/

    {{% /tab %}}
    {{% tab "Carthage" %}}

Vous pouvez utiliser [Carthage][6] pour installer `dd-sdk-ios` :
```
github "DataDog/dd-sdk-ios"
```

[6]: https://github.com/Carthage/Carthage

    {{% /tab %}}
    {{< /tabs >}}

2. Initialisez la bibliothèque avec le contexte de votre application et votre [token client Datadog][7]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][9] pour configurer la bibliothèque `dd-sdk-ios`, car elles risqueraient d'être exposées côté client dans le bytecode de l'IPA de l'application iOS. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4]. Vous devez également spécifier un ID d'application (créez une application RUM Javascript en suivant les instructions décrites sur la [page de prise en main de RUM][8].

    {{< tabs >}}
    {{% tab "Site américain" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<id_application_rum>",
            clientToken: "<token_client>",
            environment: "<nom_environnement>"
        )
        .set(serviceName: "app-name")
        .build()
)
```

    {{% /tab %}}
    {{% tab "Site européen" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<id_application_rum>",
            clientToken: "<token_client>",
            environment: "<nom_environnement>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .eu)
        .build()
)
```

    {{% /tab %}}
    {{< /tabs >}}

    Pour répondre aux exigences du RGPD, le SDK nécessite la valeur `trackingConsent` à son initialisation.
    `trackingConsent` peut prendre l'une des valeurs suivantes :

    - `.pending` : le SDK commence à recueillir et à regrouper les données, mais ne les envoie pas à Datadog. Le SDK attend d'obtenir la nouvelle valeur de consentement de suivi pour déterminer ce qu'il doit faire de ces données regroupées par lots.
    - `.granted` : le SDK commence à recueillir les données et les envoie à Datadog.
    - `.notGranted` : le SDK ne recueille aucune donnée. Les logs, traces et événements RUM ne sont pas envoyés à Datadog.

    Pour modifier la valeur du consentement de suivi une fois le SDK lancé, utilisez l'appel d'API `Datadog.set(trackingConsent:)`.
    Le SDK modifie son comportement en tenant compte de la nouvelle valeur. Par exemple, si le consentement de suivi actuel a pour valeur `.pending` :

    - si la nouvelle valeur est `.granted`, le SDK enverra toutes les données actuelles et futures à Datadog ;
    - si la nouvelle valeur est `.notGranted`, le SDK effacera toutes les données actuelles et ne recueillera pas les futures données.

3. Configurez et enregistrez le monitor RUM. Cette opération, qui doit être effectuée une seule fois, s'effectue généralement dans le code `AppDelegate` de votre application :

    ```swift
    import Datadog

    Global.rum = RUMMonitor.initialize()
    ```

Le SDK RUM offre deux méthodes d'instrumentation :

- Instrumentation automatique (recommandé) : le SDK surveille automatiquement les vues, les ressources, les actions, et les erreurs.
- Instrumentation manuelle : vous instrumentez votre code pour envoyer des événements RUM.

**Remarque** : il est possible de combiner les deux méthodes.

## Instrumentation automatique

### Vues RUM

Pour activer le suivi des vues RUM, utilisez l'option `.trackUIKitRUMViews()` lors de la configuration du SDK :
```swift
Datadog.Configuration
   .builderUsing(...)
   .trackUIKitRUMViews()
   .build()

Global.rum = RUMMonitor.initialize()
```

Pour personnaliser le suivi des vues RUM, utilisez `.trackUIKitRUMViews(using: predicate)` et implémentez vous-même le `predicate` qui respecte le protocole `UIKitRUMViewsPredicate` :
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```

Au sein de l'implémentation `rumView(for:)`, votre application doit décider si une instance donnée de `UIViewController` doit démarrer la vue RUM ou non (et renvoyer `nil` le cas échéant). La valeur de `RUMView` renvoyée doit au minimum spécifier le `path` pour créer la vue RUM. Référez-vous aux commentaires de la documentation relative au code pour en savoir plus.

**Remarque** : le SDK appelle `rumView(for:)` à plusieurs reprises pendant que votre application s'exécute. Votre implémentation du `predicate` ne doit pas dépendre de l'ordre des appels par le SDK.

### Ressources RUM

Pour activer le suivi des ressources RUM, utilisez l'option `.track(firstPartyHosts:)` lors de la configuration du SDK :
```swift
Datadog.Configuration
   .builderUsing(...)
   .track(firstPartyHosts: ["your.domain.com"])
   .build()

Global.rum = RUMMonitor.initialize()
```
Définissez également `DDURLSessionDelegate()` en tant que `delegate` de l'`URLSession` que vous souhaitez surveiller, par exemple :
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

De cette façon, le SDK surveillera les requêtes envoyées depuis cette instance de l'`URLSession`. Les requêtes dont les URL correspondent au `firstPartyHosts` seront également marquées comme "first party" dans le RUM Explorer.

### Actions RUM

Pour activer le suivi des actions RUM, utilisez l'option `.trackUIKitActions()` lors de la configuration du SDK :
```
Datadog.Configuration
   .builderUsing(...)
   .trackUIKitActions()
   .build()

Global.rum = RUMMonitor.initialize()
```

De cette façon, le SDK surveillera toutes les pressions significatives effectuées sur l'écran depuis l'application. Pour des raisons de confidentialité, les interactions avec le clavier ne sont jamais enregistrées.

### Erreurs liées au RUM

Tous les logs "error" et "critical" sont signalés comme erreurs RUM et associés à la vue RUM actuelle :
```swift
logger.error("message")
logger.critical("message")
```

De la même manière, toutes les spans APM finalisées et marquées comme erreur sont signalées comme des erreurs RUM :
```swift
span.setTag(key: OTTags.error, value: true)
```

## Instrumentation manuelle

### Vues RUM

Utilisez l'une des méthodes suivantes sur `Global.rum` pour collecter manuellement les ressources RUM :
- `.startView(viewController:)`
- `.stopView(viewController:)`

Exemple :
```swift
// dans votre `UIViewController` :

override func viewDidAppear(_ animated: Bool) {
  super.viewDidAppear(animated)
  Global.rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  Global.rum.stopView(viewController: self)
}
```
Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la classe `DDRUMMonitor`.

### Ressources RUM

Utilisez l'une des méthodes suivantes sur `Global.rum` pour collecter manuellement les ressources RUM :
* `.startResourceLoading(resourceKey:request:)`
* `.stopResourceLoading(resourceKey:response:)`
* `.stopResourceLoadingWithError(resourceKey:error:)`
* `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

Exemple :
```swift
// dans votre client réseau :

Global.rum.startResourceLoading(
    resourceKey: "resource-key", 
    request: request
)

Global.rum.stopResourceLoading(
    resourceKey: "resource-key",
    response: response
)
```

**Remarque** : la chaîne utilisée pour `resourceKey` dans les deux appels doit être unique à la ressource que vous appelez. Dans le cas contraire, le SDK ne pourra pas faire correspondre le début d'une ressource à sa fin.

Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la classe `DDRUMMonitor`.

### Actions RUM

Pour enregistrer manuellement les actions RUM instantanées (par exemple : `.tap`), utilisez :
* `.addUserAction(type:name:)`

Pour enregistrer des actions RUM continues (par exemple : `.scroll`), utilisez :
* `.startUserAction(type:name:)`
* et `.stopUserAction(type:)`

sur `Global.rum`.

Exemple :
```swift
// dans votre `UIViewController` :

@IBAction func didTapDownloadResourceButton(_ sender: Any) {
    Global.rum.addUserAction(
        type: .tap,
        name: (sender as? UIButton).currentTitle ?? "",
    )
}
```

**Remarque** : lorsque vous utilisez `.startUserAction(type:name:)` et `.stopUserAction(type:)`, l'action `type` doit être identique pour que le SDK puisse faire correspondre le début d'une ressource à sa fin.

Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la classe `DDRUMMonitor`.

### Erreurs liées au RUM

Utilisez l'une des méthodes suivantes sur `Global.rum` pour collecter manuellement les erreurs RUM :
- `.addError(message:)`
- `.addError(error:)`

Exemple :
```swift
// à n'importe quel endroit dans votre code :

Global.rum.addError(message: "error message.")
```

Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la classe `DDRUMMonitor`.

## Nettoyage des données

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mapper lors de la configuration du SDK :
```swift
Datadog.Configuration
    .builderUsing(...)
    .setRUMViewEventMapper { viewEvent in 
        return viewEvent
    }
    .setRUMErrorEventMapper { errorEvent in
        return errorEvent
    }
    .setRUMResourceEventMapper { resourceEvent in
        return resourceEvent
    }
    .setRUMActionEventMapper { actionEvent in
        return actionEvent
    }
    .build()
```
Chaque mapper est une clôture Swift avec une signature `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant son envoi. Par exemple, pour effacer des informations sensibles de l'`url` de la ressource RUM, vous pouvez implémenter une fonction `redacted(_:) -> String` personnalisée et l'utiliser dans `RUMResourceEventMapper` :
```swift
.setRUMResourceEventMapper { resourceEvent in
    var resourceEvent = resourceEvent
    resourceEvent.resource.url = redacted(resourceEvent.resource.url)
    return resourceEvent
}
```
Si le mapper d'action, de ressource ou d'erreur renvoie `nil`, l'événement est ignoré dans son intégralité et n'est donc pas envoyé à Datadog. La valeur renvoyée par le mapper d'événement de vue doit être différente de `nil`.

Selon le type d'événement donné, seules certaines propriétés peuvent être mutées :

| Type d'événement        | Clé d'attribut                     | Rôle                                     |
|-------------------|-----------------------------------|-------------------------------------------------|
| RUMViewEvent      | `viewEvent.view.name`             | Nom de la vue                                 |
|                   | `viewEvent.view.url`              | URL de la vue                                 |
| RUMActionEvent    | `actionEvent.action.target?.name` | Nom de l'action                              |
|                   | `actionEvent.view.url`            | URL de la vue associée à cette action           |
| RUMErrorEvent     | `errorEvent.error.message`        | Message d'erreur                                   |
|                   | `errorEvent.error.stack`          | Stacktrace de l'erreur                         |
|                   | `errorEvent.error.resource?.url`  | URL de la ressource concernée par l'erreur         |
|                   | `errorEvent.view.url`             | URL de la vue associée à cette erreur            |
| RUMResourceEvent  | `resourceEvent.resource.url`      | URL de la ressource                             |
|                   | `resourceEvent.view.url`          | URL de la vue associée à cette ressource         |

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://github.com/DataDog/dd-sdk-ios/releases
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[8]: https://docs.datadoghq.com/fr/real_user_monitoring/browser/#setup
[9]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys