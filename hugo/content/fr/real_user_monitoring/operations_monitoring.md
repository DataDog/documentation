---
description: Surveillez les opérations techniques critiques au sein des parcours utilisateur
  pour identifier précisément quand et pourquoi les utilisateurs ne parviennent pas
  à terminer des workflows clés.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur RUM
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: Guide
  text: Bonnes pratiques pour la configuration de la surveillance des opérations
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: Guide
  text: Bonnes pratiques pour la création de SLO pour les opérations RUM
title: Surveillance des opérations
---
## Vue d'ensemble {#overview}

{{< callout header="Aperçu" btn_hidden="true" >}}
Surveillance des opérations est en aperçu.
{{< /callout >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="Onglet Opérations sous RUM > Surveillance des performances" style="width:100%;" >}}

Dans Datadog Real User Monitoring (RUM), un [parcours][9] représente une zone majeure de votre application destinée aux utilisateurs, comme le paiement, la connexion ou la recherche. Chaque parcours inclut des opérations, qui sont les étapes techniques critiques permettant à l'expérience de fonctionner.

- Les équipes métier utilisent les **parcours** pour suivre et améliorer la conversion des utilisateurs.
- Les équipes d'ingénierie utilisent les **opérations** pour surveiller et minimiser les échecs techniques qui ont un impact sur les moments clés des utilisateurs.

Vous pouvez créer des opérations avec les API du SDK RUM, directement dans Datadog, ou par programmation avec la Datadog API.

Par exemple, l'expérience de paiement d'une plateforme de commerce électronique est un parcours. Au sein de celui-ci, les opérations peuvent inclure la saisie des détails de paiement, l'enregistrement d'un moyen de paiement et la finalisation d'un achat. Après avoir créé des opérations, Datadog RUM mesure la performance de chaque opération, notamment le volume d'exécution, le taux de réussite et le taux d'échec. La mesure de la santé des opérations vous permet d'identifier précisément quand et pourquoi les utilisateurs peuvent ne pas convertir dans votre parcours.


Le tableau suivant présente d'autres exemples de parcours et leurs opérations de parcours associées par secteur.

| Secteur       | Parcours  | Opérations de parcours                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| Réseau social | Profil  | Les utilisateurs peuvent charger leur profil <br> Les utilisateurs peuvent télécharger une image <br> Les utilisateurs peuvent mettre à jour leur statut                                  |
| Commerce électronique      | Passage en caisse | Les utilisateurs peuvent saisir leurs informations de paiement <br> Les utilisateurs peuvent enregistrer leur moyen de paiement <br> Les utilisateurs peuvent payer                                      |
| Streaming      | Recherche   | Les utilisateurs peuvent trouver des résultats pour leur recherche <br> Les utilisateurs peuvent charger la description d'un titre <br> Les utilisateurs peuvent commencer à regarder la bande-annonce |
| CRM            | Devis    | Les utilisateurs peuvent créer un nouveau devis <br> Les utilisateurs peuvent ajouter des articles au devis <br> Les utilisateurs peuvent envoyer un devis aux destinataires                 |

## Prérequis {#prerequisites}

- [RUM without Limits][11] doit être activé dans votre organisation.
- Pour créer des opérations avec les API du SDK, téléchargez une version prise en charge du SDK Datadog RUM avec des API côté client pour définir les opérations :
  - [Navigateur (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Flutter (3.0.0)][7]
      - **Remarque** : Sur Flutter Web, les opérations passent par le SDK Navigateur, ce qui nécessite l'activation de la fonctionnalité expérimentale `feature_operation_vital`.
  - [Kotlin Multiplatform (1.4.0)][4]
  - [React Native (3.0.0)][5]
  - [Roku (1.4.0)][6]

## Créer des opérations avec les API du SDK {#create-operations-with-the-sdk-apis}

Utilisez les API du SDK pour définir vos opérations.

### Démarrer une opération {#start-an-operation}

Chaque opération doit être démarrée en appelant `startOperation` (certains SDK peuvent utiliser l'ancien nom de cette API - `startFeatureOperation`).

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // you need to have this flag turned on for the API to work
})

startFeatureOperation: (
name: string,
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().startOperation(
	name: String,
	operationKey: String?,
	options: OperationOptions,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().startOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?,
	options: OperationOptions?
)
```
{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.startFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.startFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Pour utiliser des opérations sur Flutter Web, activez la fonctionnalité expérimentale `feature_operation_vital` dans le SDK Navigateur.
{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.startOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">Le nom de l'opération ne peut contenir que des lettres, des chiffres ou les caractères <code>- _ . @ $</code>, et ne peut contenir aucun espace.</div>

### Arrêter une opération avec succès {#stop-an-operation-with-success}

Chaque opération démarrée doit avoir un arrêt. Utilisez `succeedOperation` pour arrêter une opération avec un résultat positif (certains SDK peuvent utiliser l'ancien nom de cette API - `succeedFeatureOperation`).

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
succeedFeatureOperation: (
name: string,
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?
)
```

{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.succeedFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)
```

{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.succeedFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Pour utiliser des opérations sur Flutter Web, activez la fonctionnalité expérimentale `feature_operation_vital` dans le SDK Navigateur.

{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.succeedOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">Le <code>operationKey</code> doit être identique dans l'événement de début et de fin de l'opération.</div>

### Arrêter une opération avec échec {#stop-an-operation-with-failure}

Chaque opération démarrée doit avoir un arrêt. Utilisez `failOperation` pour arrêter une opération avec un résultat d'échec (certains SDK peuvent utiliser l'ancien nom de cette API - `failFeatureOperation`).

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // this flag needs to be enabled for the API to work
})

failFeatureOperation: (
name: string, 
failureReason: FailureReason, //'error' | 'abandoned' | 'other'
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().failOperation(
	name: String,
	operationKey: String?,
	failureReason: FailureReason,	// ERROR, ABANDONED, OTHER
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().failOperation(
	name: String,
	operationKey: String?,
    reason: RUMFeatureOperationFailureReason,  // .error, .abandoned, .other
	attributes: [AttributeKey: AttributeValue]
)
```
{{% /tab %}}

{{% tab "Roku" %}}

```brightscript
m.global.datadogRumAgent@.failOperation(
    name as string,
    failureReason as string,           ' "error", "abandoned", or "other"
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.failFeatureOperation(
	name: string,
	operationKey?: string,
	reason: FeatureOperationFailure, // 'ERROR' | 'ABANDONED' | 'OTHER'
	attributes: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.failFeatureOperation(
    String name,
    RumFeatureOperationFailureReason failureReason, // .error, .abandoned, .other
    {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
Pour utiliser des opérations sur Flutter Web, activez la fonctionnalité expérimentale `feature_operation_vital` dans le SDK Navigateur.

{{% /tab %}}

{{< /tabs >}}

### Parallélisation {#parallelization}
Il peut arriver que des utilisateurs démarrent plusieurs opérations de parcours en parallèle. Pour les suivre individuellement, utilisez le `operationKey` défini lors de l'appel de `startOperation`. Vous devez réutiliser le même `operationKey` ultérieurement dans d'autres API, par exemple lors de l'appel de `succeedOperation`.

<div class="alert alert-warning">Les opérations qui ont été démarrées mais qui n'ont pas été explicitement arrêtées sont automatiquement terminées à l'expiration de la session RUM. Elles sont marquées comme ayant échoué, avec <code>@operation.failure_reason:timeout</code>. <br><br> Si une API d'arrêt d'opération est appelée alors qu'elle n'a pas été démarrée au préalable, l'événement d'arrêt émis par le SDK est ignoré lors de l'ingestion.</div>

## Créer des opérations depuis Datadog {#create-operations-from-datadog}

Vous pouvez créer une opération depuis le catalogue des opérations ou le rapport de détails d'un parcours :

- **Catalogue des opérations** : Accédez à {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}, puis cliquez sur {{< ui >}}New Operation{{< /ui >}}
- **Journey Monitoring** : Accédez à {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Journey Monitoring{{< /ui >}}, sélectionnez un parcours, accédez à ses {{< ui >}}Details Report{{< /ui >}}, puis cliquez sur {{< ui >}}New Operation{{< /ui >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Page de création d'opérations depuis l'interface utilisateur Datadog" style="width:100%;" >}}

<div class="alert alert-warning">Chaque application RUM prend en charge jusqu'à 1000 opérations créées depuis Datadog via l'interface utilisateur ou l'API. Il n'existe aucune limite à l'échelle de l'organisation pour les opérations créées directement dans Datadog.</div>

### Étape 1 : Saisissez les détails de l'opération et sélectionnez la catégorie d'opération {#step-1-enter-operation-details-and-select-the-operation-category}

Sélectionnez l'application RUM de l'opération et saisissez un nom d'affichage. Vous pouvez éventuellement ajouter une description à l'opération.

Sélectionnez la **catégorie** de l'opération pour déterminer les types d'événements RUM compatibles avec les conditions de début, de succès et d'échec. 

| Catégorie d'opération       | Résumé  | Types d'événements pris en charge                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| Chargement de composant | Mesurez le temps nécessaire à l'exécution d'une action initiée par l'utilisateur  | Début : Action <br> Succès : Ressource ou action personnalisée <br> Échec : Ressource, erreur ou action personnalisée |
| Soumission de formulaire | Mesurez le temps nécessaire à la réussite d'une soumission de formulaire ou d'une mutation | Début : Action <br> Succès : Ressource, vue ou action personnalisée <br> Échec : Ressource, erreur ou action personnalisée |
| Chargement de page ou d'écran | Mesurez le temps nécessaire au chargement et à l'affichage des données d'une page ou d'un écran | Début : Vue <br> Succès : Ressource, vue ou action personnalisée <br> Échec : Ressource, erreur ou action personnalisée |
| Navigation de page ou d'écran | Mesurez le temps nécessaire à la réussite d'une navigation d'une page ou d'un écran à un autre | Début : Action ou vue <br> Succès : Ressource, vue ou action personnalisée <br> Échec : Ressource, erreur ou action personnalisée |
| Personnalisé | Définissez une opération personnalisée avec n'importe quelle combinaison de types d'événements | Début : Action ou vue <br> Succès : Ressource, vue ou action personnalisée <br> Échec : Ressource, erreur ou action personnalisée |

### Étape 2 : Définissez l'événement de début {#step-2-define-the-start-event}

Chaque opération doit avoir un événement RUM de début. Les opérations peuvent commencer par un événement d'action ou de vue, selon la catégorie d'opération sélectionnée.

### Étape 3 : Définissez les conditions de succès {#step-3-define-the-success-conditions}

Chaque opération doit avoir une condition pour se terminer par un succès. Les opérations peuvent se terminer par un succès avec un événement de ressource, de vue ou d'action personnalisée, selon la catégorie d'opération sélectionnée.

### Étape 4 : Définissez les conditions d'échec {#step-4-define-the-failure-conditions}

Chaque opération doit avoir une condition de fin en cas d'échec :
Les échecs - **Erreur** peuvent se terminer en tant que ressource, erreur ou action personnalisée.
Les échecs - **Abandon** peuvent être activés dans le cas où l'utilisateur quitte la vue initiale avant que l'opération ne se termine.

<div class="alert alert-danger">Prévoyez jusqu'à 15 minutes pour que les métriques apparaissent dans le catalogue des opérations après avoir créé une opération dans Datadog via l'interface utilisateur ou l'API.</div>

## Créer des opérations avec la Datadog API{#create-operations-with-the-datadog-api}

Les opérations peuvent également être créées via la [Datadog API][10].

## Modifier des opérations{#edit-operations}

Dans le catalogue des opérations, cliquez sur l'icône en forme de crayon pour modifier une opération. Vous pouvez modifier la description de n'importe quelle opération, quelle que soit la manière dont elle a été créée. Les opérations créées via l'interface utilisateur ou l'API peuvent être entièrement modifiées (pas seulement la description).

## Surveillez votre disponibilité sur Datadog{#monitor-your-availability-on-datadog}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="Onglet Opérations sous RUM > Surveillance des performances" style="width:100%;" >}}

Après avoir créé des opérations avec les API du SDK RUM, directement dans Datadog ou avec la Datadog API, surveillez-les en accédant à {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}.

Datadog regroupe toutes les opérations portant le même nom dans un catalogue.

Chaque opération dispose de deux métriques prêtes à l'emploi calculées sur l'ensemble de votre trafic ingéré et non échantillonné:

- `rum.measure.operation`, qui compte le volume d'opérations signalées à Datadog
- `rum.measure.operation.duration`, qui mesure le temps écoulé entre le début et la fin de toutes les opérations signalées à Datadog

Les deux métriques sont conservées pendant 15 mois et incluent plusieurs dimensions:

- `operation.name`, qui est définie côté client
- `operation.status`, qui est soit un succès, soit un échec
- `operation.failure_reason`, qui peut être une erreur, un abandon ou autre

Ces métriques sont incluses dans le prix de RUM Measure et sont disponibles pour tous les clients RUM without Limits qui définissent une ou plusieurs opérations.

## Recherchez les causes profondes avec l'IA {#investigate-root-causes-with-ai}

Vous pouvez lancer une investigation par l'agent sur une seule opération directement depuis la page Opérations. L'agent analyse à la fois le taux de réussite et la latence de l'opération et met en évidence des investigations ciblées pour chaque mode de défaillance (erreurs, délais d'attente, abandons) et pour les régressions de latence. Pour plus d'informations, consultez [Operation AI Investigation][8].

## Configurez les filtres de rétention {#configure-retention-filters}

Les opérations sont un nouveau type d'événement dans RUM. Les opérations sont liées à une session RUM, mais peuvent représenter plusieurs vues RUM. Les opérations peuvent être ciblées dans les [filtres de rétention][12]. Cela vous permet d'aligner votre stratégie de rétention sur les parcours qui sont des piliers de vos expériences utilisateur. Par exemple, vous pouvez conserver par programmation les sessions RUM pour lesquelles des opérations spécifiques ont échoué ou prennent plus de temps que souhaité.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="Onglet Opérations sous RUM > Surveillance des performances" style="width:80%;" >}}

De même que pour les métriques, ces événements sont accompagnés d'attributs spécifiques que vous pouvez utiliser dans les filtres de rétention:

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/3.0.0
[6]: https://github.com/DataDog/dd-sdk-roku/releases/tag/1.4.0
[7]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv3.0.0
[8]: /fr/real_user_monitoring/ai_investigations/operation_ai_investigation/
[9]: /fr/journey_monitoring/
[10]: /fr/api/latest/rum-operations/
[11]: /fr/real_user_monitoring/rum_without_limits/
[12]: /fr/real_user_monitoring/rum_without_limits/retention_filters/