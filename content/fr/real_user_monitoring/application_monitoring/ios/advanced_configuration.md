---
aliases:
- /fr/real_user_monitoring/ios/advanced_configuration
- /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /fr/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: Configurez les paramètres avancés du SDK RUM pour iOS afin d'enrichir
  les sessions utilisateur, de suivre des événements personnalisés et de contrôler
  la collecte de données pour obtenir des informations plus pertinentes.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: Code source de ddsdkios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM &amp; Replay de session
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: Versions prises en charge par la surveillance RUM sur iOS et tvOS
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Intégration de Datadog pour Apollo iOS
title: Configuration avancée d'iOS
---
Si vous n'avez pas encore configuré le SDK RUM pour iOS, suivez les [instructions de configuration dans l'application][1] ou consultez la [documentation de configuration de RUM pour iOS][2].

## Enrichir les sessions utilisateur

iOS RUM suit automatiquement des éléments tels que l'activité des utilisateurs, les écrans, les erreurs et les requêtes réseau. Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et leurs attributs par défaut. Vous pouvez enrichir davantage les informations relatives aux sessions utilisateur et bénéficier d'un contrôle plus précis sur les attributs collectés en effectuant le suivi d'événements personnalisés.

### Vues personnalisées

En plus de [suivre automatiquement les affichages](#automaticallytrackviews), vous pouvez également suivre des affichages spécifiques, tels que les `viewControllers`, lorsqu'ils deviennent visibles et interactifs. Arrêtez le suivi lorsque la vue n'est plus visible en utilisant les méthodes suivantes dans `RUMMonitor.shared()` :

 `.startView(viewController:)`
 `.stopView(viewController:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

Pour plus de détails et connaître les options disponibles, consultez [`RUMMonitorProtocol` sur GitHub][4].

### Actions personnalisées

En plus de [suivre automatiquement les actions](#automaticallytrackuseractions), vous pouvez suivre des actions utilisateur personnalisées spécifiques (touches, clics et défilements) à l'aide de l'API `addAction(type:name:)`.

Pour enregistrer manuellement des actions RUM instantanées telles que `.tap` sur `RUMMonitor.shared()`, utilisez `.addAction(type:name:)`. Pour les actions RUM continues telles que `.scroll`, utilisez `.startAction(type:name:)` ou `.stopAction(type:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : lorsque vous utilisez `.startAction(type:name:)` et `.stopAction(type:)`, le `type` de l'action doit être identique. Cela est nécessaire pour que le SDK RUM pour iOS puisse associer le début d'une action à son achèvement.

Pour plus de détails et connaître les options disponibles, consultez [`RUMMonitorProtocol` sur GitHub][4].

### Ressources personnalisées

En plus de [suivre automatiquement les ressources](#automaticallytracknetworkrequests), vous pouvez également suivre des ressources personnalisées spécifiques, telles que les requêtes réseau ou les API de fournisseurs tiers. Utilisez les méthodes suivantes de `RUMMonitor.shared()` pour collecter manuellement les ressources RUM :

 `.startResource(resourceKey:request:)`
 `.stopResource(resourceKey:response:)`
 `.stopResourceWithError(resourceKey:error:)`
 `.stopResourceWithError(resourceKey:message:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

**Remarque** : la chaîne de caractères utilisée pour `resourceKey` dans les deux appels doit être unique pour la ressource que vous appelez. Cela est nécessaire pour que le SDK RUM pour iOS puisse faire correspondre le début d'une ressource à sa fin.

Pour plus de détails et connaître les options disponibles, consultez [`RUMMonitorProtocol` sur GitHub][4].

### Erreurs personnalisées

Pour suivre des erreurs spécifiques, appelez `RUMMonitor.shared()` lorsqu'une erreur se produit, en utilisant l'une des méthodes suivantes :

 `.addError(message:)`
 `.addError(erreur:)`

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Pour plus de détails et connaître les options disponibles, consultez [`RUMMonitorProtocol` sur GitHub][4] et la [documentation sur les attributs d'erreur][5].

## Suivre les attributs globaux personnalisés

Outre les [attributs RUM par défaut][6] enregistrés automatiquement par le SDK RUM pour iOS, vous pouvez choisir d'ajouter des informations contextuelles supplémentaires (telles que des attributs personnalisés) à vos événements RUM afin d'enrichir votre observabilité dans Datadog.

Les attributs personnalisés vous permettent de filtrer et de regrouper les informations relatives au comportement observé des utilisateurs (telles que la valeur du panier, le niveau du commerçant ou la campagne publicitaire) avec des informations au niveau du code (telles que les services backend, la chronologie des sessions, les journaux d'erreurs et l'état du réseau).

<div class="alert alert-info">Custom attributes are intended for small, targeted pieces of information (e.g., IDs, flags, or short labels). Avoid attaching large objects such as full HTTP response payloads. This can significantly increase event size and impact performance.</div>

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Pour ajouter un attribut, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", valeur : "<VALUE>")`.
* Pour mettre à jour la valeur, utilisez `RUMMonitor.shared().addAttribute(forKey: "<KEY>", valeur : "<UPDATED_VALUE>")`.
* Pour supprimer la clé, utilisez `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

Pour améliorer les performances lors des opérations en masse (modification simultanée de plusieurs attributs), utilisez `.addAttributes(_:)` et `.removeAttributes(forKeys:)`.

**Remarque** : vous ne pouvez pas créer de facettes sur des attributs personnalisés si vos noms de clé contiennent des espaces ou des caractères spéciaux. Par exemple, utilisez `forKey: "store_id"` au lieu de `forKey: "Store ID"`.

### Suivre les sessions des utilisateurs

En ajoutant des informations utilisateur à vos sessions RUM, vous pouvez facilement :

* Suivez le parcours d'un utilisateur donné
* Identifier les utilisateurs les plus touchés par les erreurs
* Surveillez les performances pour vos utilisateurs les plus importants

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API utilisateur dans l'interface utilisateur RUM" >}}

| Attribut   | Type   | Description                                                                     |
|  |  |  |
| `usr.id`    | Chaîne de caractères | (Obligatoire) Identifiant unique de l'utilisateur.                                              |
| `usr.name`  | Chaîne de caractères | (Facultatif) Nom convivial de l'utilisateur, affiché par défaut dans l'interface utilisateur RUM.              |
| `usr.email` | Chaîne de caractères | (Facultatif) Adresse e-mail de l'utilisateur, affichée dans l'interface utilisateur RUM si le nom d'utilisateur n'est pas indiqué. |

Pour identifier les sessions utilisateur, utilisez l'API `Datadog.setUserInfo(id:name:email:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Suivre les événements en arrière-plan

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

Vous pouvez suivre des événements tels que les plantages et les requêtes réseau lorsque votre application est en arrière-plan (par exemple, lorsqu'aucune vue n'est active).

Pour suivre les événements en arrière-plan, ajoutez l'extrait de code suivant lors de l'initialisation dans votre configuration Datadog :

```swift```
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
: Cet indicateur détermine si les méthodes `beginBackgroundTask(expirationHandler:)` et `endBackgroundTask:` de `UIApplication` sont utilisées pour effectuer des téléchargements en arrière-plan. L'activation de ce paramètre peut prolonger de 30 secondes la durée pendant laquelle l'application fonctionne en arrière-plan. Les tâches sont généralement interrompues lorsqu'il n'y a plus rien à télécharger ou lorsqu'un obstacle empêche le téléchargement, par exemple en cas d'absence de connexion Internet ou de batterie faible. Par défaut, ce paramètre est défini sur `false`.

`batchProcessingLevel`
: Le niveau de traitement par lots définit le nombre maximal de lots traités de manière séquentielle sans délai au cours d'un cycle de lecture/téléchargement. La valeur par défaut est `.medium`.

`batchSize`
: Définit la taille souhaitée des lots de données téléchargés vers Datadog. Cette valeur influe sur la taille et le nombre de requêtes effectuées par le SDK RUM pour iOS (des lots plus petits impliquent davantage de requêtes, mais chaque requête est alors moins volumineuse). Les valeurs disponibles sont : `.small`, `.medium` et `.large`.

`bundle`
: L'objet « bundle » qui contient l'exécutable actuel.

`clientToken`
: Soit le jeton client RUM (qui prend en charge RUM, la journalisation et l'APM), soit le jeton client standard (qui prend en charge la journalisation et l'APM).

`chiffrement`
: Chiffrement des données à utiliser pour la persistance des données sur disque, en fournissant un objet conforme au protocole `DataEncryption`.

`env`
: Le nom de l'environnement transmis à Datadog. Cette fonctionnalité permet de filtrer les événements en fonction de différents environnements (tels que « staging » ou « production »).

`proxyConfiguration`
: Attribut de configuration de proxy permettant d'activer un proxy personnalisé pour le téléchargement des données de suivi vers le système d'acquisition de Datadog.

`serverDateProvider`
: Une interface de synchronisation NTP personnalisée. Par défaut, le SDK Datadog se synchronise avec les pools NTP dédiés fournis par le [NTP Pool Project][7]. L'utilisation de différents pools ou la configuration d'une implémentation `ServerDateProvider` sans opération entraîne une désynchronisation entre l'instance du SDK et les serveurs Datadog. Cela peut entraîner des décalages temporels importants dans les sessions RUM ou les traces distribuées.

`service`
: Le nom du service associé aux données envoyées à Datadog. La valeur par défaut est l'identifiant du bundle de l'application.

`site`
: Le point de terminaison du serveur Datadog vers lequel les données sont envoyées. La valeur par défaut est `.us1`.

`fréquenceDeTéléchargement`
: La fréquence souhaitée pour l'envoi des données vers Datadog. Les valeurs disponibles sont les suivantes : `.frequent`, `.average` et `.rare`.

### Configuration de RUM

Vous pouvez utiliser les propriétés suivantes dans `RUM.Configuration` lors de l'activation de RUM :

`actionEventMapper`
: Définit la fonction de rappel de nettoyage des données pour les actions. Cette fonctionnalité permet de modifier ou de supprimer des événements d'action avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, consultez la section [Modifier ou supprimer des événements RUM](#modifyordroprumevents).

`appHangThreshold`
: Définit le seuil à partir duquel un blocage de l'application est signalé. La valeur minimale autorisée pour cette option est de `0,1` seconde. Pour désactiver la génération de rapports, définissez cette valeur sur `nil`. Pour plus d'informations, consultez la section [Ajouter un rapport de blocage d'application][8].

`applicationID`
: L'identifiant de l'application RUM.

`customEndpoint`
: Une URL de serveur personnalisée pour l'envoi des données RUM.

`errorEventMapper`
: La fonction de rappel de nettoyage des données en cas d'erreurs. Cette fonctionnalité permet de modifier ou de supprimer les événements d'erreur avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, consultez la section [Modifier ou supprimer des événements RUM](#modifyordroprumevents).

`longTaskEventMapper`
: La fonction de rappel de nettoyage des données pour les tâches longues. Cette fonctionnalité permet de modifier ou de supprimer des événements de tâches volumineux avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, consultez la section [Modifier ou supprimer des événements RUM](#modifyordroprumevents).

`longTaskThreshold`
: Seuil pour le suivi des tâches longues par RUM (en secondes). Par défaut, cette valeur est fixée à `0,1` seconde.

`networkSettledResourcePredicate`
: Le prédicat utilisé pour classer les ressources « initiales » dans le cadre du calcul des délais pour la vue TimetoNetworkSettled (TNS).

`nextViewActionPredicate`
: Le prédicat utilisé pour déterminer la « dernière » action dans le calcul du délai de l'InteractiontoNextView (INV).

`onSessionStart`
: (Facultatif) La méthode appelée lorsque RUM lance la session.

`resourceEventMapper`
: La fonction de rappel de nettoyage des données pour les ressources. Cette fonctionnalité permet de modifier ou de supprimer des événements liés aux ressources avant qu'ils ne soient envoyés à Datadog. Pour plus d'informations, consultez la section [Modifier ou supprimer des événements RUM](#modifyordroprumevents).

`sessionSampleRate`
: La fréquence d'échantillonnage pour les sessions RUM. La valeur de `sessionSampleRate` doit être comprise entre `0,0` et `100,0`. Une valeur de `0.0` signifie qu'aucune session n'est envoyée, tandis que `100.0` signifie que toutes les sessions sont envoyées à Datadog. La valeur par défaut est `100,0`.

`telemetrySampleRate`
: La fréquence d'échantillonnage de la télémétrie interne du SDK utilisée par Datadog. Ce taux détermine le nombre de requêtes transmises au système de traçabilité. Cette valeur doit être comprise entre `0` et `100`. Par défaut, cette valeur est définie sur `20`.

`trackAnonymousUser`
: Lorsqu'elle est activée, la SDK génère un identifiant utilisateur unique, anonyme et non personnel, qui est conservé d'un lancement de l'application à l'autre. Cet identifiant sera associé à chaque session RUM, ce qui vous permettra de relier les sessions provenant du même utilisateur ou appareil sans collecter de données à caractère personnel. Par défaut, cette option est définie sur « true ».

`trackBackgroundEvents`
: Détermine si les événements RUM sont enregistrés lorsqu'aucune vue n'est active. Par défaut, cette option est définie sur « false ».

`trackFrustrations`
: Détermine si le suivi automatique des frustrations des utilisateurs est activé. Par défaut, cette option est définie sur « true ».

`trackMemoryWarnings`
: Détermine si le suivi automatique des avertissements relatifs à la mémoire est activé. Par défaut, cette option est définie sur « true ».

`trackWatchdogTerminations`
: Détermine si le SDK doit suivre les fermetures d'application effectuées par Watchdog. La valeur par défaut est « false ».

`uiKitActionsPredicate`
: Permet de suivre les interactions de l'utilisateur (touches) en tant qu'actions RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant `DefaultUIKitRUMActionsPredicate`, ou implémenter [votre propre `UIKitRUMActionsPredicate`](#automaticallytrackuseractions) adapté à votre application.

`uiKitViewsPredicate`
: Permet de suivre les `UIViewControllers` en tant que vues RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant `DefaultUIKitRUMViewsPredicate`, ou implémenter [votre propre `UIKitRUMViewsPredicate`](#automaticallytrackviews) adapté à votre application.

`urlSessionTracking`
: Permet de suivre les tâches `URLSession` (requêtes réseau) en tant que ressources RUM. Le paramètre `firstPartyHostsTracing` définit les hôtes classés comme ressources `firstparty` (si RUM est activé) et pour lesquels des informations de traçage sont injectées (si la fonctionnalité de traçage est activée). Le paramètre `resourceAttributesProvider` définit une fermeture permettant de fournir des attributs personnalisés pour les ressources interceptées ; celle-ci est appelée pour chaque ressource collectée par le SDK RUM pour iOS. Cette fonction est appelée avec les informations relatives à la tâche et peut renvoyer des attributs de ressource personnalisés ou `nil` si aucun attribut ne doit être associé.

`viewEventMapper`
: La fonction de rappel de nettoyage des données pour les vues. Cette fonctionnalité permet de modifier les événements de vue avant leur envoi vers Datadog. Pour plus d'informations, consultez la section [Modifier ou supprimer des événements RUM](#modifyordroprumevents).

`vitalsUpdateFrequency`
: La fréquence recommandée pour la collecte des paramètres vitaux via un appareil mobile. Les valeurs disponibles sont les suivantes : `.frequent` (toutes les 100 ms), `.average` (toutes les 500 ms), `.rare` (toutes les 1 s) et `.never` (qui désactive la surveillance des paramètres vitaux).

### Suivi automatique des vues

Vous pouvez suivre automatiquement les vues avec UIKit et SwiftUI.

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

Pour suivre automatiquement les vues (`UIViewControllers`), utilisez l'option `uiKitViewsPredicate` lors de l'activation de RUM. Par défaut, les vues portent le nom de la classe du contrôleur de vue. Pour le personnaliser, fournissez votre propre implémentation de la méthode `predicate` conforme au protocole `UIKitRUMViewsPredicate` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```swift```
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

Dans l'implémentation de `rumView(for:)`, votre application doit déterminer si une instance donnée de `UIViewController` doit lancer une vue RUM (renvoyer une valeur) ou non (renvoyer `nil`). La valeur renvoyée par `RUMView` doit préciser le `nom` et peut fournir des `attributs` supplémentaires pour la vue RUM créée.

Par exemple, vous pouvez configurer le prédicat pour qu'il effectue une vérification explicite des types pour chaque contrôleur de vue de votre application :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

Vous pouvez même imaginer une solution plus dynamique en fonction de l'architecture de votre application.

Par exemple, si vos contrôleurs de vue utilisent systématiquement `accessibilityLabel`, vous pouvez nommer les vues en fonction de la valeur de l'étiquette d'accessibilité :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

**Remarque** : Le SDK RUM pour iOS appelle la méthode `rumView(for:)` à plusieurs reprises pendant l'exécution de votre application. Datadog recommande de veiller à ce que son implémentation reste rapide et monothread.
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

Pour suivre automatiquement les vues avec SwiftUI, utilisez l'option `swiftUIViewsPredicate` lors de l'activation de RUM.

Le mécanisme permettant d'extraire le nom d'une vue SwiftUI repose sur la réflexion. Par conséquent, les noms des vues ne sont pas toujours explicites. Si aucun nom significatif ne peut être extrait, un nom générique tel que « AutoTracked_HostingController_Fallback » ou « AutoTracked_NavigationStackController_Fallback » est utilisé.

Vous pouvez utiliser le prédicat par défaut (`DefaultSwiftUIRUMViewsPredicate`) ou fournir votre propre implémentation du protocole `SwiftUIRUMViewsPredicate` pour personnaliser ou filtrer les noms des vues.

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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
 Datadog recommande également d'activer le suivi des vues UIKit, même si votre application est entièrement développée avec SwiftUI.
 Les barres d'onglets ne sont pas suivies automatiquement. Utilisez le [suivi manuel](#customviews) pour chaque vue d'onglet afin de vous assurer qu'elles sont bien suivies.
 Si vous utilisez à la fois le suivi automatique et le suivi manuel, il se peut que des événements apparaissent en double. Pour éviter cela, utilisez une seule méthode d'instrumentation ou un prédicat personnalisé pour filtrer les doublons.
{{% /collapse-content %}}

### Suivre automatiquement les actions des utilisateurs

#### UIKit

Pour suivre automatiquement les actions de tapotement des utilisateurs avec UIKit, définissez l'option `uiKitActionsPredicate` lors de l'activation de RUM.

#### SwiftUI

Pour suivre automatiquement les actions de tapotement des utilisateurs dans SwiftUI, activez l'option `swiftUIActionsPredicate` lors de l'activation de RUM.

**Remarques :**
 Datadog recommande d'activer également le suivi des actions UIKit, même pour les applications entièrement SwiftUI, car de nombreux composants interactifs reposent en réalité sur UIKit.
 Sur tvOS, seules les pressions sur les touches de la télécommande sont enregistrées. Pour cela, seul un prédicat UIKit est nécessaire. Si vous disposez d'une application entièrement développée en SwiftUI mais que vous souhaitez suivre les pressions sur la télécommande sous tvOS, vous devez également activer l'instrumentation UIKit.
 La mise en œuvre diffère entre iOS 18 et versions ultérieures, d'une part, et iOS 17 et versions antérieures, d'autre part :
   **iOS 18 et versions ultérieures :** La plupart des interactions sont suivies de manière fiable avec les noms de composants corrects (par exemple, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
   **iOS 17 et versions antérieures :** Le SDK ne peut pas faire la distinction entre les composants interactifs et non interactifs (par exemple, un bouton et une étiquette). C'est pourquoi les actions sont signalées sous le nom « SwiftUI_Unidentified_Element ».
 Si vous utilisez à la fois le suivi automatique et le suivi manuel, il se peut que des événements apparaissent en double. Il s'agit d'une limitation connue. Pour éviter cela, n'utilisez qu'un seul type d'instrumentation : soit automatique, soit manuel.
 Vous pouvez utiliser le prédicat par défaut, `DefaultSwiftUIRUMActionsPredicate`, ou définir votre propre prédicat pour filtrer ou renommer les actions. Vous pouvez également désactiver la détection des versions antérieures (iOS 17 et versions antérieures) si vous souhaitez uniquement un suivi fiable sur iOS 18 et versions ultérieures :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

#### Rapports d'activité par version iOS

Le tableau ci-dessous montre comment iOS 17 et iOS 18 rapportent différemment les interactions des utilisateurs.

| **Composant**    | **Nom indiqué dans iOS 18**                          | **Nom indiqué dans iOS 17**             |
||||
| Bouton           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| Lien de navigation   | Lien de navigation                                    | Élément non identifié SwiftUI         |
| Menu             | SwiftUI_Menu (et ses éléments sous forme de _UIContextMenuCell) | SwiftUI_Menu (et ses éléments sous forme de _UIContextMenuCell) |
| Lien             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

### Suivi automatique des requêtes réseau

Les requêtes réseau sont automatiquement suivies une fois que vous avez activé RUM à l'aide de la configuration `urlSessionTracking`. 

#### (Facultatif) Activer le détail des temps

Pour obtenir un détail des temps (résolution DNS, négociation SSL, temps jusqu'au premier octet, durée de connexion et durée du téléchargement), activez `URLSessionInstrumentation` pour votre type de délégué :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**Remarques** :
 Même sans `URLSessionInstrumentation`, les requêtes réseau continuent d'être suivies. Lorsque cette option est activée, elle fournit une ventilation détaillée des temps pour l'analyse des performances.
 Les données de réponse sont disponibles dans la fonction de rappel `resourceAttributesProvider` (définie dans `RUM.Configuration.URLSessionTracking`) pour les tâches dont les gestionnaires d'achèvement sont en mode automatique, ainsi que pour toutes les tâches après l'activation de `URLSessionInstrumentation`.
 Pour empêcher le suivi de certaines requêtes spécifiques, utilisez le paramètre `resourceEventMapper` dans `RUM.Configuration` (voir [Modifier ou supprimer des événements RUM](#modifyordroprumevents)).

<div class="alert alert-info">Be mindful of delegate retention.
While Datadog instrumentation does not create memory leaks directly, it relies on <code>URLSession</code> delegates. According to <a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> Apple documentation</a>:
"The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you do not invalidate the session by calling the <code>invalidateAndCancel()</code> or <code>finishTasksAndInvalidate()</code> method, your app leaks memory until it exits."
To avoid memory leaks, make sure to invalidate any <code>URLSession</code> instances you no longer need.
</div>


Si votre application comporte plusieurs types de délégués que vous souhaitez instrumenter, vous pouvez appeler `URLSessionInstrumentation.enable(with:)` pour chaque type de délégué.

Vous pouvez également configurer les hôtes propriétaires à l'aide de `urlSessionTracking`. Cela permet de classer les ressources correspondant au domaine indiqué comme « de première partie » dans RUM et de transmettre les informations de traçage à votre backend (si vous avez activé la fonctionnalité de traçage). Les traces réseau sont échantillonnées à une fréquence réglable. Un échantillonnage de 20 % est appliqué par défaut.

Par exemple, vous pouvez configurer `example.com` comme hôte principal et activer à la fois les fonctionnalités RUM et de traçage :

[10] : https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters
{{< tabs >}}
{{% tab "Swift" %}}
```swift```

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

Cela permet de suivre toutes les requêtes envoyées via la `session` instrumentée. Les requêtes correspondant au domaine `example.com` sont identifiées comme « de première partie » et les informations de traçage sont envoyées à votre backend afin de [relier la ressource RUM à sa trace][1].


[1] : https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

Pour ajouter des attributs personnalisés aux ressources, utilisez l'option `URLSessionTracking.resourceAttributesProvider` lors de l'activation du RUM. En définissant la fermeture du fournisseur d'attributs, vous pouvez renvoyer des attributs supplémentaires à associer à la ressource suivie.

Par exemple, vous pouvez souhaiter ajouter des en-têtes de requête et de réponse HTTP à la ressource RUM :

```swift```
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

Si vous ne souhaitez pas suivre les requêtes, vous pouvez désactiver URLSessionInstrumentation pour le type de délégué :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

#### Instrumentation Apollo
L'intégration d'Apollo dans votre application iOS permet à RUM de suivre les erreurs et les performances de GraphQL. Comme toutes les requêtes GraphQL sont dirigées vers un seul point de terminaison et renvoient souvent un code 200 OK même en cas d'erreur, l'instrumentation HTTP par défaut manque de contexte. Cela permet à RUM de capturer le nom de l'opération, son type et les variables (ainsi que, le cas échéant, la charge utile). Cela fournit des informations contextuelles plus détaillées pour chaque requête réseau.

Cette intégration prend en charge à la fois Apollo iOS 1.0+ et Apollo iOS 2.0+. Suivez les instructions ci-dessous correspondant à la version iOS d'Apollo dont vous disposez.

1. [Configuration][2] Surveillance RUM avec Datadog iOS RUM.

2. Ajoutez ce qui suit au fichier `Package.swift` de votre application :

   ```swift```
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   Vous pouvez également l'ajouter à l'aide de Xcode :
   1. Allez dans **Fichier** → **Ajouter les dépendances du paquet**.
   2. Saisissez l'URL du dépôt : `https://github.com/DataDog/ddsdkiosapollointerceptor`.
   3. Sélectionnez la version du paquet qui correspond à la version majeure d'Apollo (choisissez « 1.x.x » pour Apollo iOS 1.0 ou plus, ou « 2.x.x » pour Apollo iOS 2.0 ou plus).

3. Configurez l'instrumentation réseau en fonction de votre version d'Apollo pour iOS :

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0 et versions ultérieures" %}}

   Configurer l'instrumentation réseau pour le client URLSessionClient intégré à Apollo :

   ```swift```
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Ajoutez l'intercepteur Datadog à votre configuration Apollo Client :

   ```swift```
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
   {{% tab "Apollo iOS 2.0 et versions ultérieures" %}}

   Configurez l'instrumentation réseau à l'aide des objets `DatadogApolloDelegate` et `DatadogApolloURLSession` fournis :

   ```swift```
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

   Créez un fournisseur d'intercepteurs à l'aide de l'intercepteur Datadog :

   ```swift```
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

   Cela permet à Datadog RUM d'extraire automatiquement le type d'opération, le nom, les variables et les charges utiles (facultatif) des requêtes afin d'enrichir les ressources RUM des requêtes GraphQL.

   <div class="alert alert-info">
     <ul>
       <li>The integration supports Apollo iOS versions <code>1.0+</code> and <code>2.0+</code>.</li>
       <li>The <code>query</code> and <code>mutation</code> type operations are tracked, <code>subscription</code> operations are not.</li>
       <li>GraphQL payload sending is disabled by default. To enable it, set the <code>sendGraphQLPayloads</code> flag in the <code>DatadogApolloInterceptor</code> constructor as follows:</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>

### Suivi automatique des erreurs

Tous les journaux de type « erreur » et « critique » envoyés via `Logger` sont automatiquement signalés comme des erreurs RUM et associés à la vue RUM actuelle :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

De même, toutes les portées terminées signalées comme erronées sont signalées comme des erreurs RUM :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}
```objectivec```
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou supprimer des événements RUM

Pour modifier les attributs d'un événement RUM avant son envoi vers Datadog ou pour supprimer complètement un événement, utilisez l'API Event Mappers lors de la configuration du SDK RUM pour iOS :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
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

Chaque mappeur est une fermeture Swift dont la signature est `(T) > T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier certaines parties de l'événement avant son envoi.

Par exemple, pour masquer les informations sensibles contenues dans l'URL d'une ressource RUM, implémentez une fonction personnalisée `redacted(_:) > String` et utilisez-la dans `resourceEventMapper` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift```
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
```objectivec```
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Si l'on renvoie `nil` depuis le mappeur d'erreurs, de ressources ou d'actions, l'événement est complètement ignoré ; il n'est pas envoyé à Datadog. La valeur renvoyée par le mappeur d'événements de la vue ne doit pas être `nil` (pour supprimer des vues, personnalisez votre implémentation de `UIKitRUMViewsPredicate` ; pour en savoir plus, consultez la section [Suivi automatique des vues](#automaticallytrackviews)).

Selon le type d'événement, seules certaines propriétés spécifiques peuvent être modifiées :

| Type d'événement       | Clé d'attribut                        | Description                                      |
|  |  |  |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Nom de l'action.                              |
|                  | `RUMActionEvent.view.url`            | URL de la vue associée à cette action.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Message d'erreur.                                   |
|                  | `RUMErrorEvent.error.stack`          | Trace de la pile de l'erreur.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL de la ressource à laquelle l'erreur fait référence.         |
|                  | `RUMErrorEvent.view.url`             | URL de la vue associée à cette erreur.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL de la ressource.                             |
|                  | `RUMResourceEvent.view.url`          | URL de la vue associée à cette ressource.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | Nom de la vue.                                |
|                  | `RUMViewEvent.view.url`              | URL de la vue.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL à partir de laquelle la page a été consultée pour la première fois. |

## Récupérer l'identifiant de session RUM

La récupération de l'identifiant de session RUM peut s'avérer utile pour le dépannage. Par exemple, vous pouvez joindre l'identifiant de session aux demandes d'assistance, aux e-mails ou aux rapports de bogues afin que votre équipe d'assistance puisse retrouver ultérieurement la session de l'utilisateur dans Datadog.

Vous pouvez accéder à l'identifiant de session RUM pendant l'exécution sans attendre l'événement `sessionStarted` :

```swift```
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Définir le consentement au suivi (conformité au RGPD)

Pour être conforme au règlement RGPD, le SDK RUM pour iOS nécessite la valeur du consentement au suivi lors de l'initialisation.

Le paramètre `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.pending` : Le SDK RUM pour iOS commence à collecter et à regrouper les données, mais ne les envoie pas à Datadog. Le SDK RUM pour iOS attend la nouvelle valeur de consentement au suivi pour déterminer comment traiter les données regroupées.
2. `.granted` : Le SDK RUM pour iOS commence à collecter les données et les envoie à Datadog.
3. `.notGranted` : Le SDK RUM pour iOS ne collecte aucune donnée. Aucun journal, aucune trace ni aucun événement RUM n'est envoyé à Datadog.

Pour modifier la valeur du consentement au suivi après l'initialisation du SDK RUM pour iOS, utilisez l'appel API `Datadog.set(trackingConsent:)`. Le SDK RUM pour iOS adapte son comportement en fonction de la nouvelle valeur.

Par exemple, si le statut actuel du consentement au suivi est « .pending » :

 Si vous définissez cette valeur sur `.granted`, le SDK RUM pour iOS envoie toutes les données actuelles et futures à Datadog ;
 Si vous définissez la valeur sur `.notGranted`, le SDK RUM pour iOS efface toutes les données existantes et ne collecte plus les données futures.

## Ajouter des propriétés utilisateur

Vous pouvez utiliser l'API `Datadog.addUserExtraInfo(_:)` pour ajouter des propriétés utilisateur supplémentaires à celles déjà définies.

```swift```
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## Gestion des données

Le SDK iOS enregistre d'abord les événements localement et ne les transfère que lorsque les conditions des [spécifications de collecte][9] sont remplies.

### Effacer toutes les données

Vous avez la possibilité de supprimer toutes les données non envoyées stockées par le SDK à l'aide de l'API `Datadog.clearAllData()`.

```swift```
import DatadogCore

Datadog.clearAllData()
```

### Mettre fin à la collecte de données

Vous pouvez utiliser l'API `Datadog.stopInstance()` pour empêcher une instance nommée du SDK (ou l'instance par défaut si le nom est `nil`) de continuer à collecter et à envoyer des données.

```swift```
import DatadogCore

Datadog.stopInstance()
```

L'appel de cette méthode désactive le SDK et toutes les fonctionnalités actives, telles que RUM. Pour reprendre la collecte de données, vous devez réinitialiser le SDK. Vous pouvez utiliser cette API si vous souhaitez modifier les configurations de manière dynamique

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1] : https://app.datadoghq.com/rum/application/create
[2] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/ios
[3] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/ios/données_collectées/
[4] : https://github.com/DataDog/ddsdkios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5] : /real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#errorattributes
[6] : /real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#defaultattributes
[7] : https://www.ntppool.org/en/
[8] : /real_user_monitoring/error_tracking/mobile/ios/#addapphangreporting
[9] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/ios/configuration