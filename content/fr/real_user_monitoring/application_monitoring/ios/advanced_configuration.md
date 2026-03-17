---
aliases:
- /fr/real_user_monitoring/ios/advanced_configuration
- /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /fr/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configurez les paramètres avancés du SDK iOS RUM pour enrichir les sessions
  utilisateur, suivre les événements personnalisés et contrôler la collecte de données
  pour de meilleures informations.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: Code source pour ddsdkios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Session Replay
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: Versions prises en charge du suivi iOS et tvOS du RUM
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Intégration Datadog pour Apollo iOS
title: Configuration avancée du RUM sur iOS
---
Si vous n'avez pas encore configuré le SDK iOS RUM, suivez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM sur iOS][2].

## Enrichir les sessions utilisateur

iOS RUM suit automatiquement les attributs tels que l'activité de l'utilisateur, les écrans, les erreurs et les requêtes réseau. Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et contrôler plus précisément les attributs recueillis en suivant des événements personnalisés.

### 

En plus du [suivi automatique](#automatically-track-views) des vues, vous pouvez également suivre des vues distinctes spécifiques telles que les `viewControllers` lorsqu'elles deviennent visibles et interactives. Arrêtez le suivi lorsque la vue n'est plus visible à l'aide des méthodes suivantes dans `RUMMonitor.shared()`:

- `.startView(viewController:)`
- `.stopView(viewController:)`

Par exemple:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:
let rum = RUMMonitor.shared()

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@import DatadogRUM;
// in your `UIViewController`:

DDRUMMonitor *rum = [DDRUMMonitor shared];

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

Pour plus de détails et les options disponibles, voir [`RUMMonitorProtocol` dans GitHub][4].

### Actions personnalisées

En plus du [suivi automatique](#automatically-track-user-actions) des actions, vous pouvez suivre des actions spécifiques personnalisées de l'utilisateur (touches, clics et défilements) avec l'API `addAction(type:name:)`.

Pour enregistrer manuellement les actions RUM instantanées (par exemple : `.tap` sur `RUMMonitor.shared()`), utilisez `.addAction(type:name:)`. Pour les actions RUM continues telles que `.scroll`, utilisez `.startAction(type:name:)` ou `.stopAction(type:)`.

Exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Remarque**: Lorsque vous utilisez `.startAction(type:name:)` et `.stopAction(type:)`, le `type` d'action doit être le même. Ceci est nécessaire pour que le SDK RUM iOS corresponde à un début d'action avec son achèvement.

Pour plus de détails et les options disponibles, voir [`RUMMonitorProtocol` dans GitHub][4].

### Ressources personnalisées

En plus de [suivre les ressources automatiquement](#automatically-track-network-requests), vous pouvez également suivre des ressources personnalisées spécifiques telles que les demandes réseau ou les API de fournisseurs tiers. Utilisez l'une des méthodes suivantes sur `RUMMonitor.shared()` pour collecter manuellement les ressources RUM :

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`



{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : La `String` utilisée pour les `resourceKey` dans les deux appels doit être unique pour la ressource que vous appelez. Ceci est nécessaire pour que le SDK RUM iOS corresponde au démarrage d'une ressource avec son achèvement.

Pour plus de détails et les options disponibles, voir [`RUMMonitorProtocol` dans GitHub][4].

### Erreurs personnalisées

Pour suivre les erreurs spécifiques, notifiez les `RUMMonitor.shared()` lorsqu'une erreur se produit à l'aide de l'une des méthodes suivantes :

- `.addError(message:)`
- `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Pour plus de détails et les options disponibles, consultez [`RUMMonitorProtocol` dans GitHub][4] et la [documentation des attributs d'erreur][5].

## Suivez les attributs globaux personnalisés

En plus des [attributs RUM par défaut][6] enregistrés automatiquement par le SDK iOS RUM, vous pouvez choisir d'ajouter à vos événements RUM des informations de contexte supplémentaires, comme des attributs personnalisés, afin d'améliorer votre observabilité dans Datadog.

Les attributs personnalisés vous permettent de filtrer et de regrouper des informations à propos du comportement de l'utilisateur observé (comme la valeur de son panier, le niveau du commerçant ou la campagne publicitaire) avec des informations au niveau du code (notamment les services backend, la chronologie de la session, les logs d'erreur et la santé du réseau).

<div class="alert alert-info">Les attributs personnalisés sont destinés à de petits éléments d'information ciblés (p. ex., ID, drapeaux ou étiquettes courtes). Évitez de joindre des objets volumineux tels que des charges utiles de réponse HTTP complètes. Cela peut augmenter considérablement la taille de l'événement et la performance d'impact.</div>

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Pour ajouter un attribut, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Pour mettre à jour la valeur, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Pour supprimer la clé, utilisez `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Pour de meilleures performances dans les opérations en masse (modification de plusieurs attributs à la fois), utilisez `.addAttributes(_:)` et `.removeAttributes(forKeys:)`.

**Remarque** : Vous ne pouvez pas créer de facettes sur les attributs personnalisés si vous utilisez des espaces ou des caractères spéciaux dans vos noms de clés. Par exemple, utilisez `forKey: "store_id"` au lieu de `forKey: "Store ID"`.

### Suivez les sessions utilisateur

L'ajout d'informations utilisateur à vos sessions RUM permet de :

* Suivre le parcours d'un utilisateur
*  donnéSavoir quels utilisateurs sont les plus impactés par les erreurs
* Surveiller les performances de vos utilisateurs les plus importants

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API utilisateur dans l'interface utilisateur RUM" >}}

| Attribut   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Chaîne | (Obligatoire) Identifiant utilisateur unique.                                              |
| `usr.name`  | Chaîne |  (Facultatif) Nom convivial, affiché par défaut dans l'interface utilisateur RUM.              |
| `usr.email` | Chaîne |  (Facultatif) Courriel utilisateur, affiché dans l'interface utilisateur RUM si le nom d'utilisateur n'est pas présent. |

Pour identifier les sessions utilisateur, utilisez l'API `Datadog.setUserInfo(id:name:email:)`.

Exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Effectuer le suivi d ' événements

<div class="alert alert-info"><p>Le suivi des événements de fond peut entraîner des sessions supplémentaires, ce qui peut avoir un impact sur la facturation. Si vous avez des questions, <a href="https://docs.datadoghq.com/help/">contactez l'assistance Datadog.</a></p>
</div>

Vous pouvez effectuer le suivi d'événements, tels que des crashs et des requêtes réseau, pendant que votre application s'exécute en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```
Paramètres d''
## initialisation

Les propriétés suivantes peuvent être utilisées dans `Datadog.Configuration` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`backgroundTasksEnabled`
: Cet indicateur détermine si les méthodes de `UIApplication` `beginBackgroundTask(expirationHandler:)` et `endBackgroundTask:` sont utilisées pour effectuer des téléchargements en arrière-plan. L'activation de cet indicateur peut augmenter de 30 secondes la durée d'exploitation de l'application en arrière-plan. Les tâches sont normalement arrêtées lorsqu'il n'y a rien à télécharger ou lorsqu'il y a un bloqueur au téléchargement, comme le fait de ne pas avoir de connexion Internet ou d'avoir une batterie faible. Par défaut, ce drapeau est défini sur `false`.

`batchProcessingLevel`
: Le niveau de traitement par lots définit le nombre maximal de lots traités séquentiellement sans retard dans un cycle de lecture/téléchargement. La valeur par défaut est `.medium`.

`batchSize`
: Définit la taille préférée des données par lots téléchargées sur Datadog. Cette valeur a un impact sur la taille et le nombre de requêtes effectuées par le SDK RUM iOS (les petits lots signifient plus de requêtes, mais chaque requête devient plus petite). Les valeurs disponibles incluent: `.small`, `.medium` et `.large`.

`bundle`
: L'objet bundle qui contient l'exécutable courant.

`clientToken`
: Soit le jeton client RUM (qui prend en charge RUM, Logging et APM), soit le jeton client régulier (qui prend en charge Logging et APM).

`encryption`
: Chiffrement des données à utiliser pour la persistance des données sur disque en fournissant un objet conforme au protocole `DataEncryption`.

`env`
: Le nom de l'environnement qui est envoyé à Datadog. Cela peut être utilisé pour filtrer les événements par différents environnements (tels que `staging` ou `production`).

`proxyConfiguration`
: Un attribut de configuration proxy qui peut être utilisé pour activer un proxy personnalisé pour télécharger des données suivies à l'entrée de Datadog.

`serverDateProvider`
: Une interface de synchronisation NTP personnalisée. Par défaut, le SDK Datadog se synchronise avec les pools NTP dédiés fournis par le [NTP Pool Project][7]. L'utilisation de différents pools ou la définition d'une implémentation sans `ServerDateProvider` d'opération entraîne une désynchronisation de l'instance du SDK et des serveurs Datadog. Cela peut entraîner des décalages temporels importants dans les sessions de RUM ou des traces distribuées.

`service`
: Le nom de service associé aux données envoyées à Datadog. La valeur par défaut est l'identifiant du bundle de l'application.

`site`
: Définit l'endpoint du serveur Datadog vers lequel ces données sont envoyées. La valeur par défaut est `.us1`.

`uploadFrequency`
: La fréquence préférée de téléchargement des données vers Datadog. Les valeurs disponibles incluent: `.frequent`, `.average` et `.rare`.

###  Configuration RUM

Vous pouvez utiliser les propriétés suivantes dans `RUM.Configuration` lors de l'activation de RUM :

`actionEventMapper`
: Définit le callback d'épuration des données pour les actions. Cela peut être utilisé pour modifier ou supprimer des événements d'action avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou déposer des événements RUM](#modify-or-drop-rum-events).

`appHangThreshold`
: Définit le seuil de signalement lorsqu'une application se bloque. La valeur minimale autorisée pour cette option est de `0.1` secondes. Pour désactiver la déclaration, définissez cette valeur sur `nil`. Pour plus d'informations, voir [Ajouter un rapport de blocage d'application][8].

`applicationID`
: L'identifiant de l'application RUM.

`customEndpoint`
: Une URL de serveur personnalisée pour envoyer des données RUM.

`errorEventMapper`
: Le rappel de données pour les erreurs. Cela peut être utilisé pour modifier ou supprimer des événements d'erreur avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou déposer des événements RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
: Le rappel de lavage de données pour les tâches longues. Cela peut être utilisé pour modifier ou supprimer des événements de tâches longues avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou déposer des événements RUM](#modify-or-drop-rum-events).

`longTaskThreshold`
: Le seuil de suivi des tâches longues RUM (en secondes). Par défaut, cela est envoyé à `0.1` secondes.

`networkSettledResourcePredicate`
: Le prédicat utilisé pour classer les ressources "initiales" pour le calcul du calendrier de vue TimetoNetworkSettled (TNS).

`nextViewActionPredicate`
: Le prédicat utilisé pour classer la "dernière" action pour le calcul du timing InteractiontoNextView (INV).

`onSessionStart`
: (Facultatif) La méthode qui est appelée lorsque RUM démarre la session.

`resourceEventMapper`
: Le rappel de données pour les ressources. Cela peut être utilisé pour modifier ou supprimer des événements de ressources avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou déposer des événements RUM](#modify-or-drop-rum-events).

`sessionSampleRate`
: Le taux d'échantillonnage des séances de RUM. La valeur de `sessionSampleRate` doit être comprise entre `0.0` et `100.0`. Une valeur de `0.0` signifie qu'aucune session n'est envoyée, tandis que `100.0` signifie que toutes les sessions sont envoyées à Datadog. La valeur par défaut est `100.0`.

`telemetrySampleRate`
: Taux d'échantillonnage pour la télémétrie interne SDK utilisée par Datadog. Ce taux contrôle le nombre de demandes signalées au système de traçage. Cela doit être une valeur entre `0` et `100`. Par défaut, cela vaut `20`.

`trackAnonymousUser`
: Lorsqu'il est activé, le SDK génère un identifiant d'utilisateur anonyme unique et non personnel qui persiste à chaque lancement d'application. Cet ID sera attaché à chaque Session RUM, vous permettant de relier les sessions provenant du même utilisateur/appareil sans collecter de données personnelles. Par défaut, cela vaut `true`.

`trackBackgroundEvents`
: Détermine si les événements RUM sont suivis lorsqu'aucune vue n'est active. Par défaut, cela vaut `false`.

`trackFrustrations`
: Détermine si le suivi automatique des frustrations des utilisateurs est activé. Par défaut, cela vaut `true`.

`trackMemoryWarnings`
: Détermine si le suivi automatique des avertissements mémoire est activé. Par défaut, cela vaut `true`.

`trackWatchdogTerminations`
: Détermine si le SDK doit suivre les terminaisons d'application effectuées par Watchdog. Le paramètre par défaut est `false`.

`uiKitActionsPredicate`
: Active le suivi des interactions utilisateur (taps) en tant qu'actions RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant le `DefaultUIKitRUMActionsPredicate` ou implémenter [votre propre `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personnalisé pour votre application.

`uiKitViewsPredicate`
: Active les `UIViewControllers` de suivi comme vues RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant le `DefaultUIKitRUMViewsPredicate` ou implémenter [votre propre `UIKitRUMViewsPredicate`](#automatically-track-views) personnalisé pour votre application.

`urlSessionTracking`
: Active le suivi des tâches `URLSession` (requêtes réseau) en tant que ressources RUM. Le paramètre `firstPartyHostsTracing` définit les hôtes qui sont catégorisés comme ressources `first-party` (si RUM est activé) et qui ont des informations de traçage injectées (si la fonctionnalité de traçage est activée). Le paramètre `resourceAttributesProvider` définit une fermeture pour fournir des attributs personnalisés pour les ressources interceptées qui est appelée pour chaque ressource collectée par le SDK RUM iOS. Cette fermeture est appelée avec des informations sur la tâche et peut retourner des attributs de ressource personnalisés ou des `nil` si aucun attribut ne doit être attaché.

`viewEventMapper`
: Le rappel de données pour les vues. Cela peut être utilisé pour modifier les événements de vue avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou déposer des événements RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: La fréquence privilégiée pour collecter les vitaux mobiles. Les valeurs disponibles incluent: `.frequent` (tous les 100ms), `.average` (tous les 500ms), `.rare` (toutes les 1s) et `.never` (qui désactive la surveillance vitale).

### Suivi automatique des vues

Vous pouvez suivre automatiquement les vues avec UIKit et SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Pour suivre automatiquement les vues (`UIViewControllers`), utilisez l'option `uiKitViewsPredicate` lorsque vous activez RUM. Par défaut, les vues sont nommées avec le nom de classe du contrôleur de vue. Pour le personnaliser, fournissez votre propre implémentation du `predicate` qui est conforme au protocole `UIKitRUMViewsPredicate` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

À l'intérieur de l'implémentation `rumView(for:)`, votre application doit décider si une instance `UIViewController` donnée doit démarrer une vue RUM (retourner une valeur) ou non (retourner un `nil`). La valeur `RUMView` retournée doit spécifier la `name` et peut fournir des `attributes` supplémentaires pour la vue RUM créée.

Par exemple, vous pouvez configurer le predicate de façon à utiliser un check explicite pour chaque contrôleur de vue de votre application :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Home")
        case is DetailsViewController:  return .init(name: "Details")
        default:                        return nil
        }
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if ([viewController isKindOfClass:[HomeViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Home" attributes:@{}];
    }

    if ([viewController isKindOfClass:[DetailsViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Details" attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

Il est même possible de mettre en place une solution plus dynamique selon l'architecture de votre application.

Par exemple, si vos contrôleurs de vue utilisent systématiquement `accessibilityLabel`, vous pouvez nommer les vues en tenant compte de la valeur de l'étiquette d'accessibilité :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        guard let accessibilityLabel = viewController.accessibilityLabel else {
            return nil
        }

        return RUMView(name: accessibilityLabel)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if (viewController.accessibilityLabel) {
        return [[DDRUMView alloc] initWithName:viewController.accessibilityLabel attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Le SDK RUM iOS appelle `rumView(for:)` de nombreuses fois lorsque votre application est en cours d'exécution. Datadog recommande de garder son implémentation rapide et monothread.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Pour suivre automatiquement les vues avec SwiftUI, utilisez l'option `swiftUIViewsPredicate` lorsque vous activez RUM.

Le mécanisme pour extraire un nom de vue SwiftUI repose sur la réflexion. Par conséquent, les noms des vues ne sont pas toujours significatifs. Si un nom significatif ne peut pas être extrait, un nom générique comme `AutoTracked_HostingController_Fallback` ou `AutoTracked_NavigationStackController_Fallback` est utilisé.

Vous pouvez utiliser le prédicat par défaut (`DefaultSwiftUIRUMViewsPredicate`) ou fournir votre propre implémentation du protocole `SwiftUIRUMViewsPredicate` pour personnaliser ou filtrer les noms des vues.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView?
}

// Example: Custom predicate to ignore fallback names and rename views
class CustomSwiftUIPredicate: SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView? {
        if extractedViewName == "AutoTracked_HostingController_Fallback" ||
           extractedViewName == "AutoTracked_NavigationStackController_Fallback" {
            return nil // Ignore fallback names
        }
        if extractedViewName == "MySpecialView" {
            return RUMView(name: "Special")
        }
        return RUMView(name: extractedViewName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@protocol DDSwiftUIRUMViewsPredicate <NSObject>
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName;
@end

@interface CustomSwiftUIPredicate : NSObject <DDSwiftUIRUMViewsPredicate>
@end

@implementation CustomSwiftUIPredicate
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName {
    if ([extractedViewName isEqualToString:@"AutoTracked_HostingController_Fallback"] ||
        [extractedViewName isEqualToString:@"AutoTracked_NavigationStackController_Fallback"]) {
        return nil; // Ignore fallback names
    }
    if ([extractedViewName isEqualToString:@"MySpecialView"]) {
        return [[DDRUMView alloc] initWithName:@"Special" attributes:@{}];
    }
    return [[DDRUMView alloc] initWithName:extractedViewName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

**Remarques :**
- Datadog recommande d'activer également le suivi de la vue UIKit, même si votre application est entièrement construite avec SwiftUI.
- Les barres d'onglets ne sont pas suivies automatiquement. Utilisez le [suivi manuel](#custom-views) pour chaque vue d'onglet pour vous assurer qu'ils sont suivis.
- Si vous utilisez le suivi automatique et manuel, vous pouvez voir des événements en double. Pour éviter cela, fiez-vous à une seule méthode d'instrumentation ou utilisez un prédicat personnalisé pour filtrer les doublons.
{{% /collapse-content %}}

### Suivi automatique des actions

####  utilisateurUIKit

Pour suivre automatiquement les actions du robinet utilisateur avec UIKit, définissez l'option `uiKitActionsPredicate` lorsque vous activez RUM.

#### SwiftUI

Pour suivre automatiquement les actions du tap utilisateur dans SwiftUI, activez l'option `swiftUIActionsPredicate` lorsque vous activez RUM.

**Remarques :**
- Datadog recommande d'activer le suivi des actions UIKit même pour les applications SwiftUI pures car de nombreux composants interactifs sont UIKit sous le capot.
- Sur tvOS, seules les interactions de presse sur la télécommande sont suivies. Seul un prédicat UIKit est nécessaire pour cela. Si vous possédez une application SwiftUI pure mais que vous souhaitez suivre les pressions à distance sur tvOS, vous devez également activer l'instrumentation UIKit.
- L'implémentation diffère entre iOS 18+ et iOS 17 et inférieurs :
  - **iOS 18 et supérieur :** la plupart des interactions sont suivies de manière fiable avec des noms de composants corrects (par exemple, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 et inférieur :** Le SDK ne peut pas distinguer les composants interactifs et non interactifs (par exemple, Bouton vs. Étiquette). Pour cette raison, les actions sont signalées comme `SwiftUI_Unidentified_Element`.
- Si vous utilisez le suivi automatique et manuel, vous pouvez voir des événements en double. C'est une limite connue. Pour éviter cela, n'utilisez qu'un seul type d'instrumentation automatique ou manuelle.
- Vous pouvez utiliser le prédicat par défaut, le `DefaultSwiftUIRUMActionsPredicate` ou fournir le vôtre pour filtrer ou renommer les actions. Vous pouvez également désactiver la détection de l'héritage (iOS 17 et inférieur) si vous souhaitez uniquement un suivi fiable iOS 18+:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Use the default predicate by disabling iOS 17 and below detection
let predicate = DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: false)

// Use your own predicate
class CustomSwiftUIActionsPredicate: SwiftUIRUMActionsPredicate {
    func rumAction(for componentName: String) -> RUMAction? {
        // Custom logic to filter or rename actions
        return RUMAction(name: componentName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
// Use the default predicate by disabling iOS 17 and below detection
DDDefaultSwiftUIRUMActionsPredicate *swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:NO];

// Use your own predicate
@protocol DDSwiftUIRUMActionsPredicate <NSObject>
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName;
@end

@interface CustomSwiftUIActionsPredicate : NSObject <DDSwiftUIRUMActionsPredicate>
@end

@implementation CustomSwiftUIActionsPredicate
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName {
    // Custom logic to filter or rename actions
    return [[DDRUMAction alloc] initWithName:componentName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}Rapport d''

#### action par version iOS

Le tableau ci-dessous montre comment iOS 17 et iOS 18 signalent des interactions utilisateur différentes.

| **Composant**    | **iOS 18 nom signalé**                          | **iOS 17 nom signalé**             |
|------------------|---------------------------------------------------|--------------------------------------|
| Button           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| Menu             | SwiftUI_Menu (et ses éléments en tant que _UIContextMenuCell)| SwiftUI_Menu (et ses éléments en tant que _UIContextMenuCell) |
| Link             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

### Suivez automatiquement les demandes réseau

Les requêtes réseau sont automatiquement suivies après avoir activé RUM avec la configuration `urlSessionTracking`. 

#### (Facultatif) Activer la ventilation détaillée du calendrier

Pour obtenir une ventilation détaillée du temps (résolution DNS, poignée de main SSL, temps jusqu'au premier octet, temps de connexion et durée du téléchargement), activez la `URLSessionInstrumentation` pour votre délégué.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enableDurationBreakdown(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**Remarques**:
- Sans `URLSessionInstrumentation`, les demandes réseau sont toujours suivies. Son activation fournit une ventilation détaillée du calendrier pour l'analyse des performances.
- Les données de réponse sont disponibles dans le rappel de `resourceAttributesProvider` (défini en `RUM.Configuration.URLSessionTracking`) pour les tâches avec des gestionnaires de fin en mode automatique, et pour toutes les tâches après avoir activé `URLSessionInstrumentation`.
- Pour filtrer les demandes spécifiques d'être suivies, utilisez le `resourceEventMapper` en `RUM.Configuration` (voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events)).

<div class="alert alert-info">Attention à la rétention des délégués.
Bien que l'instrumentation Datadog ne crée pas de fuites de mémoire directement, elle repose sur les délégués <code>URLSession</code>. Selon la documentation d’<a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> Apple</a> :
"L'objet session conserve une référence forte au délégué jusqu'à ce que votre application quitte ou invalide explicitement la session. Si vous n'invalidez pas la session en appelant la méthode <code>invalidateAndCancel()</code> ou <code>finishTasksAndInvalidate()</code>, votre application fuit la mémoire jusqu'à ce qu'elle quitte."
Pour éviter les fuites de mémoire, assurez-vous d'invalider toutes les instances <code>URLSession</code> dont vous n'avez plus besoin.
</div>


Si vous avez plus d'un type de délégué dans votre application que vous souhaitez instrumenter, vous pouvez appeler `URLSessionInstrumentation.enable(with:)` pour chaque type de délégué.

En outre, vous pouvez configurer les hôtes de première partie en utilisant `urlSessionTracking`. Cela classe les ressources qui correspondent au domaine donné comme "première partie" dans RUM et propage les informations de traçage vers votre backend (si vous avez activé le Traçage). Les traces du réseau sont échantillonnées avec une fréquence d'échantillonnage réglable. Un échantillonnage de 20% est appliqué par défaut.

Par exemple, vous pouvez configurer `example.com` en tant que host first party et activer les fonctionnalités RUM et de tracing :

[10]: https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters
{{< tabs >}}
{{% tab "Swift" %}}
```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```

Cela permet de suivre toutes les requêtes envoyées avec le `session` instrumenté. Les requêtes correspondant au domaine `example.com` sont marquées comme « première partie » et les informations de traçage sont envoyées à votre backend pour [connecter la ressource RUM avec son Trace][1].


[1]: https://docs.datadoghq.com/fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

Pour ajouter des attributs personnalisés aux ressources, utilisez l'option `URLSessionTracking.resourceAttributesProvider` lorsque vous activez le RUM. En définissant la fermeture du fournisseur d'attributs, vous pouvez retourner des attributs supplémentaires à joindre à la ressource suivie.

Par exemple, si vous souhaitez ajouter une requête HTTP et des en-têtes de réponse à la ressource RUM :

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

Si vous ne souhaitez pas suivre les demandes, vous pouvez désactiver URLSessionInstrumentation pour le type de délégué :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

#### Apollo instrumentation
Instrumenter Apollo dans votre application iOS donne à RUM une visibilité sur les erreurs et performances GraphQL. Comme les requêtes GraphQL vont toutes à un seul point de terminaison et renvoient souvent 200 OK même en cas d'erreur, l'instrumentation HTTP par défaut manque de contexte. Il permet à RUM de capturer le nom de l'opération, le type d'opération et les variables (et éventuellement la charge utile). Cela fournit un contexte plus détaillé pour chaque requête réseau.

Cette intégration prend en charge à la fois Apollo iOS 1.0+ et Apollo iOS 2.0+. Suivez les instructions pour la version iOS d'Apollo que vous avez ci-dessous.

1. [Configurer][2] Surveillance RUM avec Datadog iOS RUM.

2. Ajoutez les éléments suivants au fichier `Package.swift` de votre application :

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Sinon, vous pouvez l'ajouter en utilisant Xcode:
   1. Allez dans **Fichier** → **Ajouter des dépendances de paquet**.
   2. Saisissez l'URL du dépôt: `https://github.com/DataDog/dd-sdk-ios-apollo-interceptor`.
   3. Sélectionnez la version du paquet qui correspond à votre version majeure d'Apollo (choisissez `1.x.x` pour Apollo iOS 1.0+ ou `2.x.x` pour Apollo iOS 2.0+).

3. Configurez l'instrumentation réseau en fonction de votre version d'Apollo iOS:

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Configurer l'instrumentation réseau pour l'URL intégrée d'ApolloSessionClient:

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Ajoutez l'intercepteur Datadog à votre configuration Apollo Client:

   ```swift
   import Apollo
   import DatadogApollo

   class CustomInterceptorProvider: DefaultInterceptorProvider {
       override func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
           var interceptors = super.interceptors(for: operation)
           interceptors.insert(DatadogApolloInterceptor(), at: 0)
           return interceptors
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Apollo iOS 2.0+" %}}

   Configurez l'instrumentation réseau à l'aide des `DatadogApolloDelegate` et `DatadogApolloURLSession` fournis:

   ```swift
   import Apollo
   import DatadogApollo
   import DatadogCore

   // Create the Datadog delegate
   let delegate = DatadogApolloDelegate()

   // Create the custom URLSession wrapper
   let customSession = DatadogApolloURLSession(
       configuration: .default,
       delegate: delegate
   )

   // Enable Datadog instrumentation for the delegate
   URLSessionInstrumentation.enable(
       with: .init(delegateClass: DatadogApolloDelegate.self)
   )

   // Configure Apollo Client with the custom session
   let networkTransport = RequestChainNetworkTransport(
       urlSession: customSession,
       interceptorProvider: NetworkInterceptorProvider(),
       store: store,
       endpointURL: url
   )
   ```

   Créer un fournisseur d'intercepteur avec l'intercepteur Datadog:

   ```swift
   import Apollo
   import DatadogApollo

   struct NetworkInterceptorProvider: InterceptorProvider {
       func graphQLInterceptors<Operation>(for operation: Operation) -> [any GraphQLInterceptor] where Operation : GraphQLOperation {
           return [DatadogApolloInterceptor()] + DefaultInterceptorProvider.shared.graphQLInterceptors(for: operation)
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

   Cela permet à Datadog RUM d'extraire automatiquement le type d'opération, le nom, les variables et les charges utiles (facultatif) des requêtes d'enrichissement des ressources RUM des requêtes GraphQL.

   <div class="alert alert-info">
     <ul>
       <li>L'intégration prend en charge les versions <code>1.0+</code> et <code>2.0+</code> d'Apollo iOS.</li>
       <li>Les opérations de type <code>requête</code> et <code>mutation</code> sont suivies, pas les opérations <code>d'abonnement</code>.</li>
       L'envoi de charge utile <li>GraphQL est désactivé par défaut. Pour l'activer, définissez l'indicateur <code>sendGraphQLPayloads</code> dans le constructeur <code>DatadogApolloInterceptor</code> comme suit :</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>
Suivi 
### automatique des erreurs

Tous les logs de type « error » et « critical » envoyés avec `Logger` sont automatiquement transmis en tant qu'erreus RUM et associés à la vue RUM actuelle :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

De la même manière, toutes les spans finalisées et considérées comme des erreurs sont transmises en tant qu'ereurs RUM :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou supprimer des événements RUM

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mappers lors de la configuration du SDK RUM pour iOS :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Chaque mappeur est une fermeture Swift avec une signature de `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de changer certaines parties de l'événement avant son envoi.

Par exemple, pour expurger des informations sensibles dans le `url` d'une ressource RUM, implémentez une fonction `redacted(_:) -> String` personnalisée et utilisez-la en `resourceEventMapper` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Lorsque le mapper d'erreur, de ressource ou d'action renvoie la `nil` `null`, l'événement est complètement ignoré et n'est donc pas envoyé à Datadog. La valeur renvoyée par le mappeur d'événements de vue ne doit pas être `nil` (pour déposer des vues, personnalisez votre implémentation de `UIKitRUMViewsPredicate`; lisez la suite dans [suivi automatique](#automatically-track-views) des vues).

Selon le type d'événement, seules certaines propriétés spécifiques peuvent être modifiées :

| Type d''       | événementClé d'attribut                        | Description                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nom de l'action.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vue liée à cette action.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Message d'erreur.                                   |
|                  | `RUMErrorEvent.error.stack`          | Pile de l'erreur.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL de la ressource à laquelle l'erreur fait référence.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vue liée à cette erreur.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL de la ressource.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vue liée à cette ressource.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | Nom de la vue.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vue.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL liée à la vue initiale de la page. |

## Récupérer l'ID de session RUM

Récupérer l'ID de session RUM peut être utile pour le dépannage. Par exemple, vous pouvez attacher l'ID de session aux demandes de support, aux e-mails ou aux rapports de bogues afin que votre équipe de support puisse trouver plus tard la session utilisateur dans Datadog.

Vous pouvez accéder à l'ID de session RUM à l'exécution sans attendre l'événement `sessionStarted` :

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Activer le consentement au suivi (conformité au RGPD)

Pour répondre aux exigences du RGPD, le SDK RUM pour iOS nécessite la valeur de consentement au suivi à son initialisation.

Le paramètre de `trackingConsent` peut être l'une des valeurs suivantes:

1. `.pending`: Le SDK RUM iOS commence à collecter et à mettre en lots les données, mais ne les envoie pas à Datadog. Le SDK RUM iOS attend la nouvelle valeur de consentement de suivi pour décider quoi faire avec les données groupées.
2. `.granted`: Le SDK RUM iOS commence à collecter les données et les envoie à Datadog.
3. `.notGranted`: Le SDK RUM iOS ne collecte aucune donnée. Aucun journal, trace ou événement RUM n'est envoyé à Datadog.

Pour modifier la valeur de consentement de suivi après l'initialisation du SDK RUM iOS, utilisez l'appel de l'API `Datadog.set(trackingConsent:)`. Le SDK RUM iOS modifie son comportement en fonction de la nouvelle valeur.

Par exemple, si le consentement de suivi actuel est `.pending`:

- Si vous modifiez la valeur en `.granted`, le SDK RUM iOS envoie toutes les données actuelles et futures à Datadog;
- Si vous modifiez la valeur en `.notGranted`, le SDK RUM iOS efface toutes les données actuelles et ne collecte pas de données futures.

## Ajouter des propriétés utilisateur

Vous pouvez utiliser l'API `Datadog.addUserExtraInfo(_:)` pour ajouter des propriétés utilisateur supplémentaires aux propriétés précédemment définies.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```
Gestion des 
## données

Le SDK iOS stocke d'abord les événements localement et ne télécharge les événements que lorsque les conditions [spécifications d'entrée][9] sont remplies.

### Effacer toutes les données

Vous avez la possibilité de supprimer toutes les données non envoyées stockées par le SDK avec l'API `Datadog.clearAllData()`.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Stop à la collecte de données

Vous pouvez utiliser l'API `Datadog.stopInstance()` pour empêcher une instance SDK nommée (ou l'instance par défaut si le nom est `nil`) de collecter et de télécharger des données.

```swift
import DatadogCore

Datadog.stopInstance()
```

L'appel à cette méthode désactive le SDK et toutes les fonctionnalités actives, telles que RUM. Pour reprendre la collecte de données, vous devez réinitialiser le SDK. Vous pouvez utiliser cette API si vous souhaitez modifier les configurations dynamiquement

## 

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/application_monitoring/ios
[3]: /fr/real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /fr/real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /fr/real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#default-attributes
[7]: https://www.ntppool.org/en/
[8]: /fr/real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[9]: /fr/real_user_monitoring/application_monitoring/ios/setup