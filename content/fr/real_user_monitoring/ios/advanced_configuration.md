---
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/advanced_configuration.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: Code source dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: RUM et Session Replay
kind: documentation
title: Configuration avancée du RUM sur iOS
---
Si vous n'avez pas encore configuré le SDK, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM sur iOS][2].

## Enrichissement des sessions utilisateur

Le service RUM pour iOS effectue automatiquement le suivi d'attributs relatifs à l'activité utilisateur, aux écrans, aux erreurs et aux requêtes réseau. Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et bénéficier d'un meilleur contrôle sur les attributs recueillis en effectuant le suivi des événements personnalisés.

### Vues personnalisées

En plus du [suivi automatique des vues](#suivi-automatique-des-vues), vous pouvez effectuer le suivi de vues distinctes spécifiques comme `viewControllers` lorsqu'elles deviennent visibles et interactives. Arrêtez le suivi lorsque la vue n'est plus visible à l'aide des méthodes suivantes dans `Global.rum` :

- `.startView(viewController:)`
- `.stopView(viewController:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Dans votre `UIViewController` :

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    Global.rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  Global.rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// Dans votre `UIViewController` :

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [DDGlobal.rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [DDGlobal.rum stopViewWithViewController:self attributes:nil];
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
    Global.rum.addTiming(name: "hero_image")
} 
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [DDGlobal.rum addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Une fois la durée définie, elle est représentée par `@view.custom_timings.<nom_durée>`. Exemple : `@view.custom_timings.hero_image`.

Pour créer des visualisations dans vos dashboards, commencez par [créer une mesure][4].

### Actions personnalisées

En plus du [suivi automatique des actions](#suivi-automatique-des-actions-utilisateur), vous pouvez effectuer le suivi d'actions utilisateur personnalisées, comme des touchers, des clics et des défilements, grâce à l'API `addUserAction(type:name:)`.

Pour enregistrer manuellement des actions RUM instantanées, comme `.tap` sur `Global.rum`, utilisez `.addUserAction(type:name:)`. Pour enregistrer des actions RUM continues, comme `.scroll`, utilisez `.startUserAction(type:name:)` ou `.stopUserAction(type:)`.

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Dans votre `UIViewController`:

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    Global.rum.addUserAction(
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
    [DDGlobal.rum addUserActionWithType:DDRUMUserActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : lorsque vous utilisez `.startUserAction(type:name:)` et `.stopUserAction(type:)`, l'action `type` doit être identique pour que le SDK puisse faire correspondre le début d'une action à sa fin.

Pour découvrir les options disponibles et obtenir plus de détails, consultez la [classe `DDRUMMonitor`][9].

### Ressources personnalisées

En plus du [suivi automatique des ressources](#suivi-automatique-des-requetes-reseau), vous pouvez effectuer le suivi de ressources personnalisées spécifiques, comme des requêtes réseau ou des API de fournisseurs tiers. Utilisez les méthodes suivantes sur `Global.rum` pour recueillir manuellement des ressources RUM :
- `.startResourceLoading(resourceKey:request:)`
- `.stopResourceLoading(resourceKey:response:)`
- `.stopResourceLoadingWithError(resourceKey:error:)`
- `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

Par exemple :

{{< tabs >}}
{{% tab "Swift" %}}
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
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// Dans votre client réseau :

[DDGlobal.rum startResourceLoadingWithResourceKey:@"resource-key"
                                          request:request
                                       attributes:@{}];

[DDGlobal.rum stopResourceLoadingWithResourceKey:@"resource-key"
                                        response:response
                                      attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : la chaîne utilisée pour `resourceKey` dans les deux appels doit être unique à la ressource que vous appelez. Dans le cas contraire, le SDK ne pourra pas faire correspondre le début d'une ressource à sa fin.

Pour découvrir les options disponibles et obtenir plus de détails, consultez la [classe `DDRUMMonitor`][9].

### Erreurs personnalisées

Pour effectuer le suivi d'erreurs spécifiques, informez `Global.rum` lorsqu'une erreur survient et transmettez le message, la source, l'exception et les attributs supplémentaires. Consultez la [rubrique Attributs d'erreur][5] pour en savoir plus.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Global.rum.addError(message: "message d'erreur.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDGlobal.rum addErrorWithMessage:@"message d'erreur." source:DDRUMErrorSourceCustom stack:nil attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus et découvrir toutes les options disponibles, référez-vous aux commentaires de la documentation relative au code dans la [classe `DDRUMMonitor`][9].

## Suivi d'attributs globaux personnalisés

En plus des [attributs RUM par défaut][7] enregistrés automatiquement par le SDK mobile, vous pouvez choisir d'ajouter à vos événements RUM des informations de contexte supplémentaires, comme des attributs personnalisés, afin d'améliorer votre observabilité dans Datadog.

Les attributs personnalisés vous permettent de filtrer et de regrouper des informations à propos du comportement de l'utilisateur observé (comme la valeur de son panier, le niveau du commerçant ou la campagne publicitaire) avec des informations au niveau du code (notamment les services backend, la chronologie de la session, les logs d'erreur et la santé du réseau).

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `Global.rum.addAttribute(forKey:value:)`.

* Pour ajouter un attribut, utilisez `Global.rum.setAttribute(forKey: "une clé", value: "une valeur")`.
* Pour mettre à jour la valeur, utilisez `Global.rum.setAttribute(forKey: "une clé", value: "une autre valeur")`.
* Pour supprimer une clé, utilisez `Global.rum.removeAttribute(forKey: "une clé")`.

### Suivi des sessions utilisateur

L'ajout des informations utilisateur à vos sessions RUM facilite :

* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en spécifier **au moins un** :

| Attribut | Type   | Description                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
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

Les méthodes suivantes peuvent être utilisées dans `Datadog.Configuration.Builder` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`set(endpoint: DatadogEndpoint)`
: Définit l'endpoint du serveur Datadog vers lequel ces données sont envoyées.

`set(batchSize: BatchSize)`
: Définit la taille souhaitée pour les groupes de données importés dans Datadog. Cette valeur modifie la taille et le nombre des requêtes transmises par le SDK. De petits groupes impliquent l'envoi d'un plus grand nombre de requêtes de petite taille. Valeurs disponibles : `.small`, `.medium` et `.large`.

`set(uploadFrequency: UploadFrequency)`
: Définit la fréquence souhaitée pour l'importation des données dans Datadog. Valeurs disponibles : `.frequent`, `.average` et `.rare`.

### Configuration RUM

`enableRUM(_ enabled: Bool)`
: Active ou désactive la fonctionnalité RUM.

`set(rumSessionsSamplingRate: Float)`
: Définit le taux d'échantillonnage des sessions RUM. La valeur `rumSessionsSamplingRate` doit être comprise entre `0.0` et `100.0`. La valeur `0.0` signifie qu'aucune session n'est envoyée, tandis que la valeur `100.0` entraîne l'envoi de toutes les sessions à Datadog. Si vous ne configurez pas ce paramètre, la valeur par défaut `100.0` est utilisée.

`trackUIKitRUMViews(using predicate: UIKitRUMViewsPredicate)`
: Active le suivi des `UIViewControllers` en tant que vues RUM. Vous pouvez utiliser l'implémentation par défaut de `predicate` en appelant cette API sans le paramètre (`trackUIKitRUMViews()`) ou implémenter [votre propre `UIKitRUMViewsPredicate`](#suivi-automatique-des-vues) personnalisé pour votre application.

`trackUIKitActions(_ enabled: Bool)`
: Active le suivi des interactions utilisateur (touchers) en tant qu'actions RUM.

`trackURLSession(firstPartyHosts: Set<string>)`
: Active le suivi des tâches `URLSession` (requêtes réseau) en tant que ressources RUM. Le paramètre `firstPartyHosts` définit les hosts qui sont considérés comme des ressources `first-party` (si la fonctionnalité RUM est activée) et qui reçoivent des informations de tracing (si la fonctionnalité de tracing est activée).

`setRUMViewEventMapper(_ mapper: @escaping (RUMViewEvent) -> RUMViewEvent)`
: Définit le rappel de nettoyage de données pour les vues. Cela vous permet de modifier des événements de vue avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`setRUMResourceEventMapper(_ mapper: @escaping (RUMResourceEvent) -> RUMResourceEvent?)`
: Définit le rappel de nettoyage de données pour les ressources. Cela vous permet de modifier ou d'ignorer des événements de ressource avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`setRUMActionEventMapper(_ mapper: @escaping (RUMActionEvent) -> RUMActionEvent?)`
: Définit le rappel de nettoyage de données pour les actions. Cela vous permet de modifier ou d'ignorer des événements d'action avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`setRUMErrorEventMapper(_ mapper: @escaping (RUMErrorEvent) -> RUMErrorEvent?)`
: Définit le rappel de nettoyage de données pour les erreurs. Cela vous permet de modifier ou d'ignorer des événements d'erreur avant leur envoi à Datadog. Consultez la rubrique [Modifier ou ignorer des événements RUM](#modifier-ou-ignorer-des-evenements-rum) pour en savoir plus.

`setRUMResourceAttributesProvider(_ provider: @escaping (URLRequest, URLResponse?, Data?, Error?) -> [AttributeKey: AttributeValue]?)`
: Définit une fermeture afin de fournir des attributs personnalisés pour les ressources interceptées. La fermeture `provider` est appelée pour chaque ressource recueillie par le SDK. Cette fermeture est appelée avec des informations de tâche et peut renvoyer des attributs de ressource personnalisés, ou la valeur `nil` si aucun attribut ne doit être ajouté.

### Configuration de journalisation

`enableLogging(_ enabled: Bool)`
: Active ou désactive la fonctionnalité de journalisation.

### Configuration de tracing

`enableTracing(_ enabled: Bool)`
: Active ou désactive la fonctionnalité de tracing.

`setSpanEventMapper(_ mapper: @escaping (SpanEvent) -> SpanEvent)`
: Définit le rappel de nettoyage de données pour les spans. Cela vous permet de modifier ou d'ignorer des événements de span avant leur envoi à Datadog.

### Suivi automatique des vues

Pour effectuer le suivi automatique des vues (`UIViewControllers`), utilisez l'option `.trackUIKitRUMViews()` lors de la configuration du SDK. Par défaut, le nom des vues est basé sur le nom de la classe du contrôleur des vues. Pour le personnaliser, utilisez `.trackUIKitRUMViews(using: predicate)` et fournissez votre propre implémentation du `predicate` en prenant soin de respecter le protocole `UIKitRUMViewsPredicate` :

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

**Remarque** : le SDK appelle de nombreuses fois `rumView(for:)` pendant l'exécution de votre application. Veillez donc à ce que cette implémentation demeure rapide, avec un seul thread.

### Suivi automatique des actions utilisateur

Pour effectuer le suivi automatique des actions de toucher, utilisez l'option `.trackUIKitActions()` lors de la configuration du SDK.

### Suivi automatique des requêtes réseau

Pour effectuer automatiquement le suivi des ressources (requêtes réseau) et obtenir leurs informations de durée, comme le temps de latence du premier octet ou la résolution DNS, utilisez l'option `.trackURLSession()` lors de la configuration du SDK et définissez `DDURLSessionDelegate` pour la `URLSession` que vous souhaitez surveiller :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
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

Vous pouvez également configurer des hosts first party à l'aide de `.trackURLSession(firstPartyHosts:)`. Ainsi, les ressources correspondant au domaine fourni sont considérées comme des « first party » dans RUM, et les informations de tracing sont transmises à votre backend (si la fonctionnalité de tracing est activée).

Par exemple, vous pouvez configurer `example.com` en tant que host first party et activer les fonctionnalités RUM et de tracing :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .trackUIKitRUMViews()
        .trackURLSession(firstPartyHosts: ["example.com"])
        .build()
)

Global.rum = RUMMonitor.initialize()
Global.sharedTracer = Tracer.initialize()

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

Cette configuration surveille toutes les requêtes envoyées avec la `session` instrumentée. Les requêtes correspondant au domaine `example.com` sont alors considérées comme des « first party » et des informations de tracing sont envoyées à votre backend pour [associer la ressource RUM à sa trace][6].

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];

// ...
[builder trackUIKitRUMViews];
[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com"]]];

DDGlobal.rum = [[DDRUMMonitor alloc] init];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:[DDTracerConfiguration new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

Pour ajouter des attributs personnalisés aux ressources, utilisez l'option `.setRUMResourceAttributesProvider(_ :)` lors de la configuration du SDK. En définissant la fermeture du fournisseur d'attributs, vous pouvez renvoyer des attributs supplémentaires afin de les joindre à la ressource suivie.

Par exemple, si vous souhaitez ajouter une requête HTTP et des en-têtes de réponse à la ressource RUM :

```swift
.setRUMResourceAttributesProvider { request, response, data, error in
    return [
        "request.headers" : redactedHeaders(from: request),
        "response.headers" : redactedHeaders(from: response)
    ]
}
```

### Suivi automatique des erreurs

Tous les logs de type « error » et « critical » envoyés avec `Logger` sont automatiquement transmis en tant qu'erreurs RUM et associés à la vue RUM actuelle :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.builder.build()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLogger *logger = [[DDLogger builder] build];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

De la même manière, toutes les spans finalisées et considérées comme des erreurs sont transmises en tant qu'erreurs RUM :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "operation")
// ... enregistrer l'`error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... enregistre l'`error`
id<SpanOT> span = [DDGlobal.sharedTracer startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou ignorer des événements RUM

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mapper lors de la configuration du SDK :

{{< tabs >}}
{{% tab "Swift" %}}
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
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];

[builder setRUMViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[builder setRUMErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[builder setRUMActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[builder build];
```
{{% /tab %}}
{{< /tabs >}}

Chaque mapper est une fermeture Swift avec une signature `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant son envoi.

Par exemple, pour effacer des informations sensibles de l'`url` de la ressource RUM, implémentez une fonction `redacted(_:) -> String` personnalisée et utilisez-la dans `RUMResourceEventMapper` :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
.setRUMResourceEventMapper { resourceEvent in
    var resourceEvent = resourceEvent
    resourceEvent.resource.url = redacted(resourceEvent.resource.url)
    return resourceEvent
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    resourceEvent.resource.url = redacted(resourceEvent.resource.url);
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Si le mapper d'erreurs, de ressources ou d'actions renvoie la valeur `nil`, l'événement est entièrement ignoré, et il n'est pas envoyé à Datadog. Le mapper d'événements de vue ne doit pas renvoyer la valeur `nil`. Pour ignorer des vues, personnalisez votre implémentation de `UIKitRUMViewsPredicate`. Pour en savoir plus, consultez la rubrique [Suivi automatique des vues](#suivi-automatique-des-vues).

Selon le type de l'événement, seules certaines propriétés peuvent être modifiées :

| Type d'événement       | Clé d'attribut                     | Description                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | Nom de la vue                        |
|                  | `viewEvent.view.url`              | URL de la vue                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | Nom de l'action                      |
|                  | `actionEvent.view.url`            | URL de la vue associée à cette action   |
| RUMErrorEvent    | `errorEvent.error.message`        | Message d'erreur                           |
|                  | `errorEvent.error.stack`          | Stacktrace de l'erreur                 |
|                  | `errorEvent.error.resource?.url`  | URL de la ressource concernée par l'erreur |
|                  | `errorEvent.view.url`             | URL de la vue associée à cette erreur    |
| RUMResourceEvent | `resourceEvent.resource.url`      | URL de la ressource                     |
|                  | `resourceEvent.view.url`          | URL de la vue associée à cette ressource |

## Activer le consentement au suivi (conformité au RGPD)

Pour répondre aux exigences du RGPD, le SDK nécessite la valeur de consentement au suivi à son initialisation.

Le paramètre `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.pending` :   le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à Datadog. Il attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
2. `.granted` : le SDK commence à recueillir les données et les envoie à Datadog.
3. `.notGranted` : le SDK ne recueille aucune donnée. Aucun log, aucun événement, ni aucune trace n'est envoyé à Datadog.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK, utilisez l'appel d'API `Datadog.set(trackingConsent:)`. Le SDK modifie son comportement en tenant compte de la nouvelle valeur.

Par exemple, en cas de modification de la valeur de consentement `.pending` :

- Si la nouvelle valeur est `.granted`, le SDK envoie toutes les données actuelles et futures à Datadog.
- Si la nouvelle valeur est `.notGranted`, le SDK efface toutes les données actuelles et ne recueille pas les futures données.

## Échantillonner des sessions RUM

Pour contrôler les données que votre application envoie au service RUM de Datadog, vous pouvez spécifier un taux d'échantillonnage pour les sessions RUM lors de l'[initialisation du SDK][1]. Ce taux est défini sous forme de pourcentage entre 0 et 100.

Par exemple, pour ne conserver que 50 % des sessions, utilisez la configuration suivante :

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(rumSessionsSamplingRate: 50.0)
        // ...
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];

// ...
[builder setWithRumSessionsSamplingRate:50];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

## Envoi de données lorsque l'appareil est hors ligne

La fonction RUM s'assure que les données restent disponibles, même lorsque l'appareil de l'utilisateur est hors ligne. Lorsque la connexion réseau est mauvaise ou que la batterie de l'appareil est trop faible, tous les événements RUM sont d'abord stockés en local sur l'appareil sous forme groupée. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Configuration d'un proxy personnalisé pour l'importation de données dans Datadog

Si votre application s'exécute sur des appareils qui se trouvent derrière un proxy personnalisé, vous pouvez l'indiquer à l'outil d'importation de données SDK afin de veiller à ce que les données de suivi soient importées avec la bonne configuration.

Lors de l'initialisation du SDK, spécifiez ce qui suit dans la configuration de votre proxy.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(proxyConfiguration: [
            kCFNetworkProxiesHTTPEnable: true, 
            kCFNetworkProxiesHTTPPort: 123, 
            kCFNetworkProxiesHTTPProxy: "www.example.com", 
            kCFProxyUsernameKey: "proxyuser", 
            kCFProxyPasswordKey: "proxypass" 
        ])
        // ...
        .build()
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<id_application_rum>"
                                                                   clientToken:@"<token_client>"
                                                                   environment:@"<nom_environnement>"];

// ...
[builder setWithProxyConfiguration:@{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la documentation relative à [URLSessionConfiguration.connectionProxyDictionary][8] (en anglais).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/ios
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/data_collected
[4]: https://docs.datadoghq.com/fr/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/DDRUMMonitor.swift