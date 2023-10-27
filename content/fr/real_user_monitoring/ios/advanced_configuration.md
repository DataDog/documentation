---
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: Code source de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Session Replay
kind: documentation
title: Configuration avancée du RUM sur iOS
---

Si vous n'avez pas encore configuré le SDK iOS RUM, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM sur iOS][2].

## Enrichissement des sessions utilisateur

Le service RUM pour iOS effectue automatiquement le suivi d'attributs relatifs à l'activité utilisateur, aux écrans, aux erreurs et aux requêtes réseau. Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et bénéficier d'un meilleur contrôle sur les attributs recueillis en effectuant le suivi des événements personnalisés.

### Vues personnalisées

En plus du [suivi automatique des vues](#suivi-automatique-des-vues), vous pouvez effectuer le suivi de vues distinctes spécifiques comme `viewControllers` lorsqu'elles deviennent visibles et interactives. Arrêtez le suivi lorsque la vue n'est plus visible à l'aide des méthodes suivantes dans `RUMMonitor.shared()` :

- `.startView(viewController:)`
- `.stopView(viewController:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// dans votre `UIViewController` :
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
@import DatadogObjc;
// dans votre `UIViewController` :

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

Pour découvrir les options disponibles et obtenir plus de détails, consultez la [classe `DDRUMMonitor`][9].

### Ajouter vos propres durées de performance

En plus des attributs RUM par défaut, vous pouvez tirer profit de l'API `addTiming(name:)` pour découvrir combien de temps votre application consacre à chaque tâche. Les mesures de temps sont exprimées en fonction du début de la vue RUM actuelle.

Par exemple, vous pouvez mesurer le temps nécessaire pour afficher votre bannière :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
} 
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Une fois la durée définie, elle est représentée par `@view.custom_timings.<nom_durée>`. Exemple : `@view.custom_timings.hero_image`.

Pour créer des visualisations dans vos dashboards, commencez par [créer une mesure][4].

### Actions personnalisées

En plus du [suivi automatique des actions](#suivi-automatique-des-actions-utilisateur), vous pouvez effectuer le suivi d'actions utilisateur personnalisées, comme des touchers, des clics et des défilements, via l'API `addAction(type:name:)`.

Pour enregistrer manuellement des actions RUM instantanées, comme `.tap` sur `RUMMonitor.shared()`, utilisez `.addAction(type:name:)`. Pour enregistrer des actions RUM continues, comme `.scroll`, utilisez `.startAction(type:name:)` ou `.stopAction(type:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// dans votre `UIViewController` :

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? "",
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

**Remarque** : lorsque vous utilisez `.startUserAction(type:name:)` et `.stopUserAction(type:)`, l'action `type` doit être identique pour que le SDK iOS RUM puisse faire correspondre le début d'une action à sa fin. 

Pour découvrir les options disponibles et obtenir plus de détails, consultez la [classe `DDRUMMonitor`][9].

### Ressources personnalisées

En plus du [suivi automatique des ressources](#suivi-automatique-des-requetes-reseau), vous pouvez effectuer le suivi de ressources personnalisées spécifiques, comme des requêtes réseau ou des API de fournisseurs tiers. Utilisez les méthodes suivantes sur `RUMMonitor.shared()` pour recueillir manuellement des ressources RUM :

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// dans votre client réseau :

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
// dans votre client réseau :

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : la chaîne utilisée pour `resourceKey` dans les deux appels doit être unique à la ressource que vous appelez. Dans le cas contraire, le SDK iOS RUM ne pourra pas faire correspondre le début d'une ressource à sa fin. 

Pour découvrir les options disponibles et obtenir plus de détails, consultez la [classe `DDRUMMonitor`][9].

### Erreurs personnalisées

Pour effectuer le suivi d'erreurs spécifiques, informez `Global.rum` lorsqu'une erreur survient et transmettez le message, la source, l'exception et les attributs supplémentaires. Consultez la [rubrique Attributs d'erreur][5] pour en savoir plus.

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

Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la [classe `DDRUMMonitor`][9].

## Suivi d'attributs globaux personnalisés

En plus des [attributs RUM par défaut][7] enregistrés automatiquement par le SDK iOS RUM, vous pouvez choisir d'ajouter à vos événements RUM des informations de contexte supplémentaires, comme des attributs personnalisés, afin d'améliorer votre observabilité dans Datadog. 

Les attributs personnalisés vous permettent de filtrer et de regrouper des informations à propos du comportement de l'utilisateur observé (comme la valeur de son panier, le niveau du commerçant ou la campagne publicitaire) avec des informations au niveau du code (notamment les services backend, la chronologie de la session, les logs d'erreur et la santé du réseau).

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `RUMMonitor.shared().addAttribute(forKey:value:)`.

* Pour ajouter un attribut, utilisez `RUMMonitor.shared().addAttribute(forKey: "une clé", value: "une valeur")`.
* Pour mettre à jour la valeur, utilisez `RUMMonitor.shared().addAttribute(forKey: "une clé", value: "une autre valeur")`.
* Pour supprimer une clé, utilisez `RUMMonitor.shared().removeAttribute(forKey: "une clé")`.

### Suivi des sessions utilisateur

L'ajout des informations utilisateur à vos sessions RUM facilite :

* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en spécifier **au moins un** :

| Attribut   | Type   | Description                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| `usr.name`  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| `usr.email` | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Pour identifier des sessions utilisateur, utilisez l'API `setUserInfo(id:name:email:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Paramètres d'initialisation

Les propriétés suivantes peuvent être utilisées dans `Datadog.Configuration` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`site`
: Définit l'endpoint du serveur Datadog vers lequel ces données sont envoyées.

`batchSize`
: Définit la taille souhaitée pour les groupes de données importés dans Datadog. Cette valeur modifie la taille et le nombre des requêtes transmises par le SDK iOS RUM. De petits groupes impliquent l'envoi d'un plus grand nombre de requêtes de petite taille. Valeurs disponibles : `.small`, `.medium` et `.large`.

`uploadFrequency`
: Définit la fréquence souhaitée pour l'importation des données dans Datadog. Valeurs disponibles : `.frequent`, `.average` et `.rare`.

### Configuration RUM

Vous pouvez utiliser les propriétés suivantes dans `RUM.Configuration` lors de l'activation de RUM :

`sessionSampleRate`
: Définit le taux d'échantillonnage des sessions RUM. La valeur `sessionSampleRate` doit être comprise entre `0.0` et `100.0`. La valeur `0.0` signifie qu'aucune session n'est envoyée, tandis que la valeur `100.0` entraîne l'envoi de toutes les sessions à Datadog. Si vous ne configurez pas ce paramètre, la valeur par défaut `100.0` est utilisée.

`uiKitViewsPredicate`
: Active le suivi des `UIViewControllers` en tant que vues RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant le paramètre `DefaultUIKitRUMViewsPredicate` ou implémenter [votre propre `UIKitRUMViewsPredicate`](#suivi-automatique-des-vues) personnalisé pour votre application.

`uiKitActionsPredicate`
: Active le suivi des interactions utilisateur (touchers) en tant qu'actions RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en définissant le paramètre `DefaultUIKitRUMActionsPredicate` ou implémenter [votre propre `UIKitRUMActionsPredicate`](#suivi-automatique-des-actions-utilisateur) personnalisé pour votre application.

`urlSessionTracking`
: Active le suivi des tâches `URLSession` (requêtes réseau) en tant que ressources RUM. Le paramètre `firstPartyHostsTracing` définit les hosts qui sont considérés comme des ressources `first-party` (si la fonctionnalité RUM est activée) et qui reçoivent des informations de tracing (si la fonctionnalité de tracing est activée). Le paramètre `resourceAttributesProvider` définit une fermeture pour appliquer des attributs personnalisés aux ressources interceptées, et celle-ci est appelée pour chaque ressource recueillie par le SDK RUM pour iOS. Cette fermeture est appelée avec des informations de tâche et peut renvoyer des attributs de ressource personnalisés, ou la valeur `nil` si aucun attribut ne doit être ajouté.

`viewEventMapper`
: Définit le rappel de nettoyage de données pour les vues. Cela vous permet de modifier des événements de vue avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`resourceEventMapper`
: Définit le rappel de nettoyage de données pour les ressources. Cela vous permet de modifier ou d'ignorer des événements de ressource avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`actionEventMapper`
: Définit le rappel de nettoyage de données pour les actions. Cela vous permet de modifier ou d'ignorer des événements d'action avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`errorEventMapper`
: Définit le rappel de nettoyage de données pour les erreurs. Cela vous permet de modifier ou d'ignorer des événements d'erreur avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`longTaskEventMapper`
: Définit le rappel de nettoyage de données pour les tâches longues. Cela vous permet de modifier ou d'ignorer des événements de tâche longue avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`vitalsUpdateFrequency`
: Définit la fréquence souhaitée pour la collecte des signaux mobiles essentiels. Valeurs disponibles : `.frequent` (toutes les 100 ms), `.average` (toutes les 500 ms), `.rare` (toutes les 1 s) et `.never` (désactive le suivi des signaux).

### Suivi automatique des vues

Pour effectuer le suivi automatique des vues (`UIViewControllers`), utilisez l'option `uiKitViewsPredicate` lors de l'activation de RUM. Par défaut, le nom des vues est basé sur le nom de la classe du contrôleur des vues. Pour le personnaliser, fournissez votre propre implémentation du `predicate` en prenant soin de respecter le protocole `UIKitRUMViewsPredicate` :

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

Au sein de l'implémentation `rumView(for:)`, votre application doit décider si une instance donnée de `UIViewController` doit démarrer la vue RUM (ce qui entraîne l'envoi de sa valeur) ou non (ce qui l'entraîne l'envoi de la valeur `nil`). La valeur de `RUMView` renvoyée doit spécifier le `name` et peut fournir des `attributes` supplémentaires pour la vue RUM créée.

Par exemple, vous pouvez configurer le predicate de façon à utiliser un check explicite pour chaque contrôleur de vue de votre application :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Accueil")
        case is DetailsViewController:  return .init(name: "Détails")
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

Il est même possible de mettre en place une solution plus dynamique selon l'architecture de votre application.

Par exemple, si vos contrôleurs de vue utilisent systématiquement `accessibilityLabel`, vous pouvez nommer les vues en tenant compte de la valeur de l'étiquette d'accessibilité :

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

**Remarque** : le SDK RUM pour iOS appelle de nombreuses fois `rumView(for:)` pendant l'exécution de votre application. Veillez donc à ce que cette implémentation demeure rapide, avec un seul thread.

### Suivi automatique des actions utilisateur

Pour effectuer le suivi automatique des actions de toucher, définissez l'option `uiKitActionsPredicate` lors de l'activation de RUM.

### Suivi automatique des requêtes réseau

Pour effectuer automatiquement le suivi des ressources (requêtes réseau) et obtenir leurs informations de durée, comme le temps de latence du premier octet ou la résolution DNS, utilisez l'option `urlSessionTracking` lors de l'activation de RUM et définissez `DatadogURLSessionDelegate` pour la `URLSession` que vous souhaitez surveiller :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DatadogURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[DDNSURLSessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

Vous pouvez également configurer des hosts first party à l'aide de `urlSessionTracking`. Ainsi, les ressources correspondant au domaine fourni sont considérées comme des « first party » dans RUM, et les informations de tracing sont transmises à votre backend (si la fonctionnalité de tracing est activée). Les traces réseau sont échantillonnées selon un taux paramétrable. Un taux d'échantillonnage de 20 % est appliqué par défaut.

Par exemple, vous pouvez configurer `example.com` en tant que host first party et activer les fonctionnalités RUM et de tracing :

{{< tabs >}}
{{% tab "Swift" %}}
```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<ID de l'application RUM>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

Cette configuration surveille toutes les requêtes envoyées avec la `session` instrumentée. Les requêtes correspondant au domaine `example.com` sont alors considérées comme des « first party » et des informations de tracing sont envoyées à votre backend pour [associer la ressource RUM à sa trace][1].

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<ID de l'application RUM>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

Pour ajouter des attributs personnalisés aux ressources, utilisez l'option `URLSessionTracking.resourceAttributesProvider` lors de l'activation de RUM. En définissant la fermeture du fournisseur d'attributs, vous pouvez renvoyer des attributs supplémentaires afin de les joindre à la ressource suivie.

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

### Suivi automatique des erreurs

Tous les logs de type « error » et « critical » envoyés avec `Logger` sont automatiquement transmis en tant qu'erreurs RUM et associés à la vue RUM actuelle :

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
@import DatadogObjc;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

De la même manière, toutes les spans finalisées et considérées comme des erreurs sont transmises en tant qu'erreurs RUM :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capturer l'`error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... capturer l'`error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou ignorer des événements RUM

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mappers lors de la configuration du SDK RUM pour iOS :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<ID de l'application RUM>",
    viewEventMapper: { viewEvent in 
        return viewEvent
    }
    resourceEventMapper: { resourceEvent in
        return resourceEvent
    }
    actionEventMapper: { actionEvent in
        return actionEvent
    }
    errorEventMapper: { errorEvent in
        return errorEvent
    }
    longTaskEventMapper: { longTaskEvent in
        return longTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull longTaskEvent) {
    return longTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Chaque mapper est une fermeture Swift avec une signature `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant son envoi.

Par exemple, pour effacer des informations sensibles de l'`url` d'une ressource RUM, implémentez une fonction `redacted(_:) -> String` personnalisée et utilisez-la dans `resourceEventMapper` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<ID de l'application RUM>",
    resourceEventMapper: { resourceEvent in
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<ID de l'application RUM>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Si le mapper d'erreurs, de ressources ou d'actions renvoie la valeur `nil`, l'événement est entièrement ignoré, et il n'est pas envoyé à Datadog. Le mapper d'événements de vue ne doit pas renvoyer la valeur `nil`. Pour ignorer des vues, personnalisez votre implémentation de `UIKitRUMViewsPredicate`. Pour en savoir plus, consultez la rubrique [Suivi automatique des vues](#suivi-automatique-des-vues).

Selon le type de l'événement, seules certaines propriétés peuvent être modifiées :

| Type d'événement       | Clé d'attribut                     | Rôle                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | Nom de la vue.                        |
|                  | `viewEvent.view.url`              | URL de la vue.                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | Nom de l'action.                      |
|                  | `actionEvent.view.url`            | URL de la vue associée à cette action.   |
| RUMErrorEvent    | `errorEvent.error.message`        | Message d'erreur.                           |
|                  | `errorEvent.error.stack`          | Stacktrace de l'erreur.                 |
|                  | `errorEvent.error.resource?.url`  | URL de la ressource associée à l'erreur. |
|                  | `errorEvent.view.url`             | URL de la vue associée à cette erreur.    |
| RUMResourceEvent | `resourceEvent.resource.url`      | URL de la ressource.                     |
|                  | `resourceEvent.view.url`          | URL de la vue associée à cette ressource. |

## Activer le consentement au suivi (conformité au RGPD)

Pour répondre aux exigences du RGPD, le SDK RUM pour iOS nécessite la valeur de consentement au suivi à son initialisation.

Le paramètre `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.pending` : le SDK RUM pour iOS commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à Datadog. Il attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
2. `.granted` : le SDK RUM pour iOS commence à recueillir les données et les envoie à Datadog.
3. `.notGranted` : le SDK RUM pour iOS ne recueille aucune donnée. Aucun log, aucun événement, ni aucune trace n'est envoyé à Datadog.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK RUM pour iOS, utilisez l'appel d'API `Datadog.set(trackingConsent:)`. Le SDK modifie son comportement en tenant compte de la nouvelle valeur.

Par exemple, en cas de modification de la valeur de consentement `.pending` :

- Si la nouvelle valeur est `.granted`, le SDK RUM pour iOS envoie toutes les données actuelles et futures à Datadog.
- Si la nouvelle valeur est `.notGranted`, le SDK RUM pour iOS efface toutes les données actuelles et ne recueille pas les futures données.

## Échantillonner des sessions RUM

Pour contrôler les données que votre application envoie au service RUM de Datadog, vous pouvez spécifier un taux d'échantillonnage pour les sessions RUM lors de l'[initialisation du SDK RUM pour iOS][1]. Ce taux est défini sous forme de pourcentage entre 0 et 100.

Par exemple, pour ne conserver que 50 % des sessions, utilisez la configuration suivante :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<ID de l'application RUM>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<ID de l'application RUM>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

## Envoi de données lorsque l'appareil est hors ligne

La fonction RUM s'assure que les données restent disponibles, même lorsque l'appareil de l'utilisateur est hors ligne. Lorsque la connexion réseau est mauvaise ou que la batterie de l'appareil est trop faible, tous les événements RUM sont d'abord stockés en local sur l'appareil sous forme groupée. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK RUM pour iOS n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK RUM pour iOS.

## Configuration d'un proxy personnalisé pour l'importation de données dans Datadog

Si votre application s'exécute sur des appareils qui se trouvent derrière un proxy personnalisé, vous pouvez l'indiquer à l'outil d'importation de données du SDK RUM pour iOS afin de veiller à ce que les données de suivi soient importées avec la bonne configuration.

Lors de l'initialisation du SDK iOS, spécifiez ce qui suit dans la configuration de votre proxy.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<token client>",
    env: "<environnement>",
    proxyConfiguration: [
        kCFNetworkProxiesHTTPEnable: true, 
        kCFNetworkProxiesHTTPPort: 123, 
        kCFNetworkProxiesHTTPProxy: "www.example.com", 
        kCFProxyUsernameKey: "proxyuser", 
        kCFProxyPasswordKey: "proxypass" 
    ]
  ), 
  trackingConsent: trackingConsent
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<token client>" env:@"<environnement>"];
configuration.proxyConfiguration = @{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la documentation relative à [URLSessionConfiguration.connectionProxyDictionary][8] (en anglais).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/ios
[3]: /fr/real_user_monitoring/ios/data_collected
[4]: /fr/real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /fr/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: /fr/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/DDRUMMonitor.swift