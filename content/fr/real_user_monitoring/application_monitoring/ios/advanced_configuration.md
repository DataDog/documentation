---
aliases:
- /fr/real_user_monitoring/ios/advanced_configuration
- /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /fr/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configurez les paramètres avancés du SDK RUM iOS pour enrichir les sessions
  utilisateur, suivre des événements personnalisés et contrôler la collecte de données
  pour obtenir de meilleures informations.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: Code source pour dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Relecture de Session
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: Versions prises en charge pour la surveillance RUM iOS et tvOS
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Intégration Datadog pour Apollo iOS
title: Configuration Avancée iOS
---
Si vous n'avez pas encore configuré le SDK RUM iOS, suivez les [instructions de configuration dans l'application][1] ou consultez la [documentation de configuration RUM iOS][2].

## Enrichir les sessions utilisateur

Le RUM iOS suit automatiquement des attributs tels que l'activité utilisateur, les écrans, les erreurs et les requêtes réseau. Consultez la [documentation de collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir davantage les informations de session utilisateur et obtenir un meilleur contrôle sur les attributs collectés en suivant des événements personnalisés.

### Vues personnalisées

En plus de [suivre les vues automatiquement](#automatically-track-views), vous pouvez également suivre des vues distinctes spécifiques telles que `viewControllers` lorsqu'elles deviennent visibles et interactives. Arrêtez de suivre lorsque la vue n'est plus visible en utilisant les méthodes suivantes dans `RUMMonitor.shared()` :

- `.startView(viewController:)`
- `.stopView(viewController:)`

Par exemple :

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
{{% tab "Objective-C" %}}

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

Pour plus de détails et d'options disponibles, consultez [`RUMMonitorProtocol` sur GitHub][4].

### Actions personnalisées

En plus de [suivre les actions automatiquement](#automatically-track-user-actions), vous pouvez suivre des actions utilisateur personnalisées spécifiques (taps, clics et défilements) avec l'API `addAction(type:name:)`.

Pour enregistrer manuellement des actions RUM instantanées telles que `.tap` sur `RUMMonitor.shared()`, utilisez `.addAction(type:name:)`. Pour des actions RUM continues telles que `.scroll`, utilisez `.startAction(type:name:)` ou `.stopAction(type:)`.

Par exemple :

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
{{% tab "Objective-C" %}}

```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Lors de l'utilisation de `.startAction(type:name:)` et `.stopAction(type:)`, l'action `type` doit être la même. Ceci est nécessaire pour que le SDK RUM iOS associe le début d'une action à son achèvement.

Pour plus de détails et d'options disponibles, voir [`RUMMonitorProtocol` sur GitHub][4].

### Ressources personnalisées

En plus de [suivre les ressources automatiquement](#automatically-track-network-requests), vous pouvez également suivre des ressources personnalisées spécifiques telles que des requêtes réseau ou des API de fournisseurs tiers. Utilisez les méthodes suivantes sur `RUMMonitor.shared()` pour collecter manuellement les ressources RUM :

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

Par exemple :

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
{{% tab "Objective-C" %}}

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

**Remarque** : Le `String` utilisé pour `resourceKey` dans les deux appels doit être unique pour la ressource que vous appelez. Ceci est nécessaire pour que le SDK RUM iOS associe le début d'une ressource à son achèvement.

Pour plus de détails et d'options disponibles, voir [`RUMMonitorProtocol` sur GitHub][4].

### Erreurs personnalisées

Pour suivre des erreurs spécifiques, informez `RUMMonitor.shared()` lorsqu'une erreur se produit en utilisant l'une des méthodes suivantes :

- `.addError(message:)`
- `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Pour plus de détails et d'options disponibles, voir [`RUMMonitorProtocol` sur GitHub][4] et la [documentation des attributs d'erreur][5].

## Suivre des attributs globaux personnalisés

En plus des [attributs RUM par défaut][6] capturés automatiquement par le SDK RUM iOS, vous pouvez choisir d'ajouter des informations contextuelles supplémentaires (telles que des attributs personnalisés) à vos événements RUM pour enrichir votre observabilité au sein de Datadog.

Les attributs personnalisés vous permettent de filtrer et de regrouper des informations sur le comportement des utilisateurs observés (telles que la valeur du panier, le niveau du commerçant ou la campagne publicitaire) avec des informations au niveau du code (telles que les services backend, la chronologie des sessions, les journaux d'erreurs et la santé du réseau).

<div class="alert alert-info">Les attributs personnalisés sont destinés à de petites informations ciblées (par exemple, des identifiants, des indicateurs ou des étiquettes courtes). Évitez d'attacher de grands objets tels que des charges utiles complètes de réponse HTTP. Cela peut augmenter considérablement la taille des événements et impacter les performances.</div>

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Pour ajouter un attribut, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* Pour mettre à jour la valeur, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* Pour supprimer la clé, utilisez `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Pour de meilleures performances lors des opérations en masse (modification de plusieurs attributs à la fois), utilisez `.addAttributes(_:)` et `.removeAttributes(forKeys:)`.

**Remarque** : Vous ne pouvez pas créer de facettes sur des attributs personnalisés si vous utilisez des espaces ou des caractères spéciaux dans vos noms de clés. Par exemple, utilisez `forKey: "store_id"` au lieu de `forKey: "Store ID"`.

### Suivre les sessions utilisateur

Ajouter des informations utilisateur à vos sessions RUM facilite :

* Suivre le parcours d'un utilisateur donné
* Savoir quels utilisateurs sont les plus impactés par les erreurs
* Surveiller les performances de vos utilisateurs les plus importants

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API utilisateur dans l'interface RUM" >}}

| Attribut   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Chaîne | (Obligatoire) Identifiant unique de l'utilisateur.                                              |
| `usr.name`  | Chaîne | (Facultatif) Nom convivial, affiché par défaut dans l'interface RUM.              |
| `usr.email` | Chaîne | (Facultatif) Email de l'utilisateur, affiché dans l'interface RUM si le nom de l'utilisateur n'est pas présent. |

Pour identifier les sessions utilisateur, utilisez l'API `Datadog.setUserInfo(id:name:email:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Suivre les événements en arrière-plan

<div class="alert alert-info"><p>Le suivi des événements en arrière-plan peut entraîner des sessions supplémentaires, ce qui peut avoir un impact sur la facturation. Pour toute question, <a href="https://docs.datadoghq.com/help/">contactez le support de Datadog.</a></p>
</div>

Vous pouvez suivre des événements tels que des plantages et des requêtes réseau lorsque votre application est en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Pour suivre les événements en arrière-plan, ajoutez le code suivant lors de l'initialisation de votre configuration Datadog :

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Paramètres d'initialisation

Vous pouvez utiliser les propriétés suivantes dans `Datadog.Configuration` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`backgroundTasksEnabled`
: Ce drapeau détermine si les méthodes `UIApplication` `beginBackgroundTask(expirationHandler:)` et `endBackgroundTask:` sont utilisées pour effectuer des téléchargements en arrière-plan. Activer ce drapeau pourrait augmenter le temps pendant lequel l'application fonctionne en arrière-plan de 30 secondes. Les tâches sont normalement arrêtées lorsqu'il n'y a rien à télécharger ou lorsqu'un obstacle à l'envoi se présente, comme l'absence de connexion Internet ou une batterie faible. Par défaut, ce drapeau est réglé sur `false`.

`batchProcessingLevel`
: Le niveau de traitement par lot définit le nombre maximum de lots traités séquentiellement sans délai dans un cycle de lecture/téléchargement. La valeur par défaut est `.medium`.

`batchSize`
: Définit la taille préférée des données groupées téléchargées vers Datadog. Cette valeur impacte la taille et le nombre de requêtes effectuées par le SDK RUM iOS (de petits lots signifient plus de requêtes, mais chaque requête devient plus petite). Les valeurs disponibles incluent : `.small`, `.medium` et `.large`.

`bundle`
: L'objet bundle qui contient l'exécutable actuel.

`clientToken`
: Soit le jeton client RUM (qui prend en charge RUM, Logging et APM), soit le jeton client régulier (qui prend en charge Logging et APM).

`encryption`
: Chiffrement des données à utiliser pour la persistance des données sur disque en fournissant un objet conforme au protocole `DataEncryption`.

`env`
: Le nom de l'environnement qui est envoyé à Datadog. Cela peut être utilisé pour filtrer les événements par différents environnements (comme `staging` ou `production`).

`proxyConfiguration`
Un attribut de configuration de proxy qui peut être utilisé pour activer un proxy personnalisé pour le téléchargement des données suivies vers l'intake de Datadog.

`serverDateProvider`
Une interface de synchronisation NTP personnalisée. Par défaut, le SDK Datadog se synchronise avec des pools NTP dédiés fournis par le [NTP Pool Project][7]. Utiliser différents pools ou définir une implémentation de `ServerDateProvider` sans opération entraîne une désynchronisation de l'instance SDK et des serveurs Datadog. Cela peut entraîner des décalages horaires significatifs dans les sessions RUM ou les traces distribuées.

`service`
Le nom du service associé aux données envoyées à Datadog. La valeur par défaut est l'identifiant du bundle de l'application.

`site`
Le point de terminaison du serveur Datadog auquel les données sont envoyées. La valeur par défaut est `.us1`.

`uploadFrequency`
La fréquence préférée de téléchargement des données vers Datadog. Les valeurs disponibles incluent : `.frequent`, `.average` et `.rare`.

### Configuration RUM

Vous pouvez utiliser les propriétés suivantes dans `RUM.Configuration` lors de l'activation de RUM :

`actionEventMapper`
Définit le rappel de nettoyage des données pour les actions. Cela peut être utilisé pour modifier ou supprimer des événements d'action avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou supprimer des événements RUM](#modify-or-drop-rum-events).

`appHangThreshold`
Définit le seuil de signalement lorsque l'application se bloque. La valeur minimale autorisée pour cette option est de `0.1` secondes. Pour désactiver le signalement, définissez cette valeur sur `nil`. Pour plus d'informations, voir [Ajouter un rapport de blocage d'application][8].

`applicationID`
L'identifiant de l'application RUM.

`customEndpoint`
Une URL de serveur personnalisée pour l'envoi des données RUM.

`errorEventMapper`
Le rappel de nettoyage des données pour les erreurs. Cela peut être utilisé pour modifier ou supprimer les événements d'erreur avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events).

`longTaskEventMapper`
Le rappel de nettoyage des données pour les tâches longues. Cela peut être utilisé pour modifier ou supprimer les événements de tâches longues avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events).

`longTaskThreshold`
Le seuil pour le suivi des tâches longues RUM (en secondes). Par défaut, cela est envoyé à `0.1` secondes.

`networkSettledResourcePredicate`
Le prédicat utilisé pour classer les ressources "initiales" pour le calcul du temps de vue Time-to-Network-Settled (TNS).

`nextViewActionPredicate`
Le prédicat utilisé pour classer la "dernière" action pour le calcul du temps Interaction-to-Next-View (INV).

`onSessionStart`
(Optionnel) La méthode qui est appelée lorsque RUM commence la session.

`resourceEventMapper`
Le rappel de nettoyage des données pour les ressources. Cela peut être utilisé pour modifier ou supprimer les événements de ressources avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events).

`sessionSampleRate`
Le taux d'échantillonnage pour les sessions RUM. La valeur `sessionSampleRate` doit être comprise entre `0.0` et `100.0`. Une valeur de `0.0` signifie qu'aucune session n'est envoyée, tandis que `100.0` signifie que toutes les sessions sont envoyées à Datadog. La valeur par défaut est `100.0`.

`telemetrySampleRate`
Le taux d'échantillonnage pour la télémétrie interne du SDK utilisée par Datadog. Ce taux contrôle le nombre de requêtes signalées au système de traçage. Cela doit être une valeur comprise entre `0` et `100`. Par défaut, cela est réglé sur `20`.

`trackAnonymousUser`
Lorsque cela est activé, le SDK génère un identifiant utilisateur anonyme unique et non personnel qui est conservé entre les lancements de l'application. Cet identifiant sera attaché à chaque session RUM, vous permettant de lier les sessions provenant du même utilisateur/appareil sans collecter de données personnelles. Par défaut, cela est réglé sur `true`.

`trackBackgroundEvents`
Détermine si les événements RUM sont suivis lorsque aucune vue n'est active. Par défaut, cela est réglé sur `false`.

`trackFrustrations`
Détermine si le suivi automatique des frustrations des utilisateurs est activé. Par défaut, cela est réglé sur `true`.

`trackMemoryWarnings`
Détermine si le suivi automatique des avertissements de mémoire est activé. Par défaut, cela est réglé sur `true`.

`trackWatchdogTerminations`
Détermine si le SDK doit suivre les terminaisons d'application effectuées par Watchdog. Le paramètre par défaut est `false`.

`uiKitActionsPredicate`
Active le suivi des interactions des utilisateurs (taps) en tant qu'actions RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en réglant le `DefaultUIKitRUMActionsPredicate` ou implémenter [ votre propre `UIKitRUMActionsPredicate`](#automatically-track-user-actions) personnalisé pour votre application.

`uiKitViewsPredicate`
Active le suivi de `UIViewControllers` en tant que vues RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en réglant le `DefaultUIKitRUMViewsPredicate` ou implémenter [ votre propre `UIKitRUMViewsPredicate`](#automatically-track-views) personnalisé pour votre application.

`urlSessionTracking`
Active le suivi des tâches `URLSession` (requêtes réseau) en tant que ressources RUM. Le paramètre `firstPartyHostsTracing` définit les hôtes qui sont classés comme des ressources `first-party` (si RUM est activé) et qui ont des informations de traçage injectées (si la fonctionnalité de traçage est activée). Le paramètre `resourceAttributesProvider` définit une fermeture pour fournir des attributs personnalisés pour les ressources interceptées qui est appelée pour chaque ressource collectée par le SDK RUM iOS. Cette fermeture est appelée avec des informations de tâche et peut renvoyer des attributs de ressource personnalisés ou `nil` si aucun attribut ne doit être attaché.

`viewEventMapper`
: Le rappel de nettoyage des données pour les vues. Cela peut être utilisé pour modifier les événements de vue avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: La fréquence préférée pour la collecte des données mobiles essentielles. Les valeurs disponibles incluent : `.frequent` (toutes les 100 ms), `.average` (toutes les 500 ms), `.rare` (toutes les 1 s), et `.never` (qui désactive la surveillance des données essentielles).

### Suivre automatiquement les vues

Vous pouvez suivre automatiquement les vues avec UIKit et SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Pour suivre automatiquement les vues (`UIViewControllers`), utilisez l'option `uiKitViewsPredicate` lors de l'activation de RUM. Par défaut, les vues sont nommées avec le nom de classe du contrôleur de vue. Pour le personnaliser, fournissez votre propre implémentation de `predicate` qui respecte le protocole `UIKitRUMViewsPredicate` :

{{< tabs >}}
{{% tab "Swift" %}}

```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

Dans l'implémentation de `rumView(for:)`, votre application doit décider si une instance donnée de `UIViewController` doit démarrer une vue RUM (renvoyer une valeur) ou non (renvoyer `nil`). La valeur `RUMView` renvoyée doit spécifier le `name` et peut fournir des `attributes` supplémentaires pour la vue RUM créée.

Par exemple, vous pouvez configurer le prédicat pour utiliser une vérification de type explicite pour chaque contrôleur de vue dans votre application :

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
{{% tab "Objective-C" %}}

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

Vous pouvez même proposer une solution plus dynamique en fonction de l'architecture de votre application.

Par exemple, si vos contrôleurs de vue utilisent `accessibilityLabel` de manière cohérente, vous pouvez nommer les vues par la valeur de l'étiquette d'accessibilité :

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
{{% tab "Objective-C" %}}

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

**Remarque** : Le SDK RUM iOS appelle `rumView(for:)` plusieurs fois pendant que votre application est en cours d'exécution. Datadog recommande de garder son implémentation rapide et à thread unique.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Pour suivre automatiquement les vues avec SwiftUI, utilisez l'option `swiftUIViewsPredicate` lors de l'activation de RUM.

Le mécanisme pour extraire le nom d'une vue SwiftUI repose sur la réflexion. En conséquence, les noms de vue peuvent ne pas toujours être significatifs. Si un nom significatif ne peut pas être extrait, un nom générique tel que `AutoTracked_HostingController_Fallback` ou `AutoTracked_NavigationStackController_Fallback` est utilisé.

Vous pouvez utiliser le prédicat par défaut (`DefaultSwiftUIRUMViewsPredicate`) ou fournir votre propre implémentation du protocole `SwiftUIRUMViewsPredicate` pour personnaliser ou filtrer les noms de vue.

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
{{% tab "Objective-C" %}}

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

**Notes :**
- Datadog recommande également d'activer le suivi des vues UIKit, même si votre application est entièrement construite avec SwiftUI.
- Les barres d'onglets ne sont pas suivies automatiquement. Utilisez [le suivi manuel](#custom-views) pour chaque vue d'onglet afin de garantir qu'elles sont suivies.
- Si vous utilisez à la fois le suivi automatique et manuel, vous pouvez voir des événements en double. Pour éviter cela, reposez-vous sur une seule méthode d'instrumentation ou utilisez un prédicat personnalisé pour filtrer les doublons.
{{% /collapse-content %}}

### Suivre automatiquement les actions des utilisateurs

#### UIKit

Pour suivre automatiquement les actions de tapotement des utilisateurs avec UIKit, définissez l'option `uiKitActionsPredicate` lors de l'activation de RUM.

#### SwiftUI

Pour suivre automatiquement les actions de tapotement des utilisateurs dans SwiftUI, activez l'option `swiftUIActionsPredicate` lors de l'activation de RUM.

**Notes :**
- Datadog recommande également d'activer le suivi des actions UIKit même pour les applications SwiftUI pures, car de nombreux composants interactifs sont basés sur UIKit en arrière-plan.
- Sur tvOS, seules les interactions de pression sur la télécommande sont suivies. Seule une prédicat UIKit est nécessaire pour cela. Si vous avez une application pure SwiftUI mais que vous souhaitez suivre les pressions à distance sur tvOS, vous devez également activer l'instrumentation UIKit.
- L'implémentation diffère entre iOS 18+ et iOS 17 et en dessous :
  - **iOS 18 et supérieur :** La plupart des interactions sont suivies de manière fiable avec des noms de composants corrects (par exemple, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 et en dessous :** Le SDK ne peut pas distinguer entre les composants interactifs et non interactifs (par exemple, Button vs. Label). Pour cette raison, les actions sont rapportées comme `SwiftUI_Unidentified_Element`.
- Si vous utilisez à la fois le suivi automatique et manuel, vous pouvez voir des événements en double. C'est une limitation connue. Pour éviter cela, utilisez uniquement un type d'instrumentation - soit automatique, soit manuel.
- Vous pouvez utiliser le prédicat par défaut, `DefaultSwiftUIRUMActionsPredicate`, ou fournir le vôtre pour filtrer ou renommer les actions. Vous pouvez également désactiver la détection des anciennes versions (iOS 17 et en dessous) si vous souhaitez uniquement un suivi fiable pour iOS 18+ :

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
{{% tab "Objective-C" %}}

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
{{< /tabs >}}

#### Rapport d'actions par version iOS

Le tableau ci-dessous montre comment iOS 17 et iOS 18 rapportent différentes interactions utilisateur.

| **Composant**    | **Nom rapporté par iOS 18**                          | **Nom rapporté par iOS 17**             |
|------------------|---------------------------------------------------|--------------------------------------|
| Bouton           | SwiftUI_Button                                    | SwiftUI_Element_Inconnu         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Element_Inconnu         |
| Menu             | SwiftUI_Menu (et ses éléments comme _UIContextMenuCell)| SwiftUI_Menu (et ses éléments comme _UIContextMenuCell) |
| Lien             | SwiftUI_Button                                    | SwiftUI_Element_Inconnu         |

### Suivre automatiquement les requêtes réseau

Les requêtes réseau sont suivies automatiquement après avoir activé RUM avec la configuration `urlSessionTracking`. 

#### (Optionnel) Activer une répartition détaillée du temps

Pour obtenir une répartition détaillée des temps (résolution DNS, poignée de main SSL, temps jusqu'au premier octet, temps de connexion et durée de téléchargement), activez `URLSessionInstrumentation` pour votre type de délégué :

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
{{% tab "Objective-C" %}}

```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**Notes** :
- Sans `URLSessionInstrumentation`, les requêtes réseau sont toujours suivies. L'activation de cette option fournit une répartition détaillée des temps pour l'analyse des performances.
- Les données de réponse sont disponibles dans le rappel `resourceAttributesProvider` (défini dans `RUM.Configuration.URLSessionTracking`) pour les tâches avec des gestionnaires de complétion en mode automatique, et pour toutes les tâches après l'activation de `URLSessionInstrumentation`.
- Pour filtrer des requêtes spécifiques afin qu'elles ne soient pas suivies, utilisez le `resourceEventMapper` dans `RUM.Configuration` (voir [Modifier ou supprimer les événements RUM](#modify-or-drop-rum-events)).

<div class="alert alert-info">Soyez attentif à la rétention des délégués.
Bien que l'instrumentation de Datadog ne crée pas de fuites de mémoire directement, elle repose sur les délégués <code>URLSession</code>. Selon <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> la documentation d'Apple</a> :
"L'objet de session conserve une référence forte au délégué jusqu'à ce que votre application se termine ou invalide explicitement la session. Si vous ne invalidez pas la session en appelant la méthode <code>invalidateAndCancel()</code> ou <code>finishTasksAndInvalidate()</code>, votre application fuit de la mémoire jusqu'à ce qu'elle se termine."
Pour éviter les fuites de mémoire, assurez-vous d'invalider toutes les instances de <code>URLSession</code> dont vous n'avez plus besoin.
</div>


Si vous avez plus d'un type de délégué dans votre application que vous souhaitez instrumenter, vous pouvez appeler `URLSessionInstrumentation.enable(with:)` pour chaque type de délégué.

De plus, vous pouvez configurer les hôtes de première partie en utilisant `urlSessionTracking`. Cela classe les ressources qui correspondent au domaine donné comme "première partie" dans RUM et propage les informations de traçage à votre backend (si vous avez activé le traçage). Les traces réseau sont échantillonnées avec un taux d'échantillonnage ajustable. Un échantillonnage de 20 % est appliqué par défaut.

Par exemple, vous pouvez configurer `example.com` comme hôte de première partie et activer à la fois les fonctionnalités RUM et de traçage :

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

Cela suit toutes les requêtes envoyées avec le `session` instrumenté. Les requêtes correspondant au domaine `example.com` sont marquées comme "première partie" et les informations de traçage sont envoyées à votre backend pour [connecter la ressource RUM à son Trace][1].


[1]: https://docs.datadoghq.com/fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "Objective-C" %}}

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

Pour ajouter des attributs personnalisés aux ressources, utilisez l'option `URLSessionTracking.resourceAttributesProvider` lors de l'activation du RUM. En définissant la fermeture du fournisseur d'attributs, vous pouvez renvoyer des attributs supplémentaires à attacher à la ressource suivie.

Par exemple, vous souhaiterez peut-être ajouter les en-têtes de requête et de réponse HTTP à la ressource RUM :

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

Si vous ne souhaitez pas suivre les requêtes, vous pouvez désactiver l'instrumentation URLSession pour le type de délégué :

{{< tabs >}}
{{% tab "Swift" %}}

```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

#### Instrumentation Apollo
L'instrumentation d'Apollo dans votre application iOS permet au RUM de voir les erreurs et les performances de GraphQL. Parce que les requêtes GraphQL vont toutes vers un seul point de terminaison et renvoient souvent 200 OK même en cas d'erreurs, l'instrumentation HTTP par défaut manque de contexte. Elle permet au RUM de capturer le nom de l'opération, le type d'opération et les variables (et éventuellement la charge utile). Cela fournit un contexte plus détaillé pour chaque requête réseau.

Cette intégration prend en charge à la fois Apollo iOS 1.0+ et Apollo iOS 2.0+. Suivez les instructions pour la version d'Apollo iOS que vous avez ci-dessous.

1. [Configurer][2] la surveillance RUM avec Datadog iOS RUM.

2. Ajoutez ce qui suit à votre fichier `Package.swift` d'application :

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Alternativement, vous pouvez l'ajouter en utilisant Xcode :
   1. Allez à **Fichier** → **Ajouter des dépendances de package**.
   2. Entrez l'URL du dépôt : `https://github.com/DataDog/dd-sdk-ios-apollo-interceptor`.
   3. Sélectionnez la version du package qui correspond à votre version majeure d'Apollo (choisissez `1.x.x` pour Apollo iOS 1.0+ ou `2.x.x` pour Apollo iOS 2.0+).

3. Configurez l'instrumentation réseau en fonction de votre version d'Apollo iOS :

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Configurez l'instrumentation réseau pour le URLSessionClient intégré d'Apollo :

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Ajoutez l'intercepteur Datadog à votre configuration Apollo Client :

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

   Configurez l'instrumentation réseau en utilisant les `DatadogApolloDelegate` et `DatadogApolloURLSession` fournis :

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

   Créez un fournisseur d'intercepteur avec l'intercepteur Datadog :

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

   Cela permet à Datadog RUM d'extraire automatiquement le type d'opération, le nom, les variables et les charges utiles (facultatif) des requêtes pour enrichir les ressources RUM des requêtes GraphQL.

   <div class="alert alert-info">
     <ul>
       <li>L'intégration prend en charge les versions Apollo iOS <code>1.0+</code> et <code>2.0+</code>.</li>
       <li>Les opérations de type <code>requête</code> et <code>mutation</code> sont suivies, les opérations de <code>subscription</code> ne le sont pas.</li>
       <li>L'envoi de charges utiles GraphQL est désactivé par défaut. Pour l'activer, définissez le drapeau <code>sendGraphQLPayloads</code> dans le constructeur <code>DatadogApolloInterceptor</code> comme suit :</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>

### Suivez automatiquement les erreurs

Tous les journaux "erreur" et "critique" envoyés avec `Logger` sont automatiquement signalés comme des erreurs RUM et liés à la vue RUM actuelle :

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

De même, tous les spans terminés marqués comme erreur sont signalés comme des erreurs RUM :

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
{{% tab "Objective-C" %}}

```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modifiez ou supprimez les événements RUM

Pour modifier les attributs d'un événement RUM avant qu'il ne soit envoyé à Datadog ou pour supprimer un événement entièrement, utilisez l'API des mappers d'événements lors de la configuration du SDK RUM iOS :

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
{{% tab "Objective-C" %}}

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

Chaque mapper est une closure Swift avec une signature de `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant qu'il ne soit envoyé.

Par exemple, pour masquer des informations sensibles dans un `url` de ressource RUM, implémentez une fonction `redacted(_:) -> String` personnalisée et utilisez-la dans `resourceEventMapper` :

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
{{% tab "Objective-C" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Retourner `nil` depuis le mapper d'erreur, de ressource ou d'action supprime entièrement l'événement ; l'événement n'est pas envoyé à Datadog. La valeur retournée par le mapper d'événements de vue ne doit pas être `nil` (pour supprimer des vues, personnalisez votre implémentation de `UIKitRUMViewsPredicate` ; lisez-en plus dans [suivre les vues automatiquement](#automatically-track-views)).

Selon le type d'événement, seules certaines propriétés spécifiques peuvent être modifiées :

| Type d'événement       | Clé d'attribut                        | Description                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nom de l'action.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vue liée à cette action.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Message d'erreur.                                   |
|                  | `RUMErrorEvent.error.stack`          | Trace de la pile de l'erreur.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL de la ressource à laquelle l'erreur se réfère.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vue liée à cette erreur.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL de la ressource.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vue liée à cette ressource.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | Nom de la vue.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vue.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL qui a conduit à la vue initiale de la page. |

## Récupérer l'ID de session RUM

La récupération de l'ID de session RUM peut être utile pour le dépannage. Par exemple, vous pouvez joindre l'ID de session aux demandes de support, aux e-mails ou aux rapports de bogues afin que votre équipe de support puisse retrouver ultérieurement la session utilisateur dans Datadog.

Vous pouvez accéder à l'ID de session RUM à l'exécution sans attendre l'événement `sessionStarted` :

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Définir le consentement au suivi (conformité RGPD)

Pour être conforme à la réglementation RGPD, le SDK RUM iOS nécessite la valeur de consentement au suivi lors de l'initialisation.

Le paramètre `trackingConsent` peut être l'une des valeurs suivantes :

1. `.pending` : Le SDK RUM iOS commence à collecter et à regrouper les données, mais ne les envoie pas à Datadog. Le SDK RUM iOS attend la nouvelle valeur de consentement au suivi pour décider quoi faire des données regroupées.
2. `.granted` : Le SDK RUM iOS commence à collecter les données et les envoie à Datadog.
3. `.notGranted` : Le SDK RUM iOS ne collecte aucune donnée. Aucun journal, trace ou événement RUM n'est envoyé à Datadog.

Pour changer la valeur de consentement au suivi après l'initialisation du SDK RUM iOS, utilisez l'appel API `Datadog.set(trackingConsent:)`. Le SDK RUM iOS change son comportement en fonction de la nouvelle valeur.

Par exemple, si le consentement au suivi actuel est `.pending` :

- Si vous changez la valeur en `.granted`, le SDK RUM iOS envoie toutes les données actuelles et futures à Datadog ;
- Si vous changez la valeur en `.notGranted`, le SDK RUM iOS efface toutes les données actuelles et ne collecte pas de données futures.

## Ajouter des propriétés utilisateur

Vous pouvez utiliser l'API `Datadog.addUserExtraInfo(_:)` pour ajouter des propriétés utilisateur supplémentaires aux propriétés déjà définies.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## Gestion des données

Le SDK iOS stocke d'abord les événements localement et ne télécharge les événements que lorsque les conditions des [spécifications d'intégration][9] sont remplies.

### Effacer toutes les données

Vous avez la possibilité de supprimer toutes les données non envoyées stockées par le SDK avec l'API `Datadog.clearAllData()`.

```swift
import DatadogCore

Datadog.clearAllData()
```

### Arrêter la collecte de données

Vous pouvez utiliser l'API `Datadog.stopInstance()` pour arrêter une instance de SDK nommée (ou l'instance par défaut si le nom est `nil`) de collecter et de télécharger des données par la suite.

```swift
import DatadogCore

Datadog.stopInstance()
```

Appeler cette méthode désactive le SDK et toutes les fonctionnalités actives, telles que RUM. Pour reprendre la collecte de données, vous devez réinitialiser le SDK. Vous pouvez utiliser cette API si vous souhaitez modifier les configurations de manière dynamique

## Lecture complémentaire

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