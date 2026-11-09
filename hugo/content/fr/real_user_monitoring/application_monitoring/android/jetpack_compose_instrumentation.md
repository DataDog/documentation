---
aliases:
- /fr/real_user_monitoring/android/jetpack_compose_instrumentation/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
- /fr/real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
description: Instrumentez Jetpack Compose manuellement ou automatiquement à l'aide
  du Datadog Gradle Plugin.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag: Code source
  text: Code source pour dd-sdk-android-compose
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag: Code source
  text: Code source du Datadog Gradle Plugin
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer le service Datadog RUM
title: Instrumentation Jetpack Compose
---
## Présentation {#overview}
Jetpack Compose est une boîte à outils permettant de créer une interface utilisateur native sous Android. Si votre application utilise Jetpack Compose, vous pouvez l'instrumenter manuellement ou automatiquement avec le Datadog Gradle Plugin. Cela permet d'activer le Real User Monitoring (RUM), comme pour les Views Android classiques.

<div class="alert alert-info"><p>La version minimale de Kotlin prise en charge est 1.9.23.</p></div>

Après la configuration initiale, vous pouvez choisir entre une instrumentation [automatique](#automatic-instrumentation) et [manuelle](#manual-instrumentation).

## Configuration {#setup}
### Étape 1 – Déclarez « dd-sdk-android-compose » comme dépendance {#step-1-declare-dd-sdk-android-compose-as-a-dependency}
Ajoutez `dd-sdk-android-compose` en tant que dépendance à chaque module que vous souhaitez instrumenter. Cela inclut le module d'application, tous les modules d'interface utilisateur Jetpack Compose ou les modules de fonctionnalités utilisant Jetpack Compose.
La version minimale de `dd-sdk-android-compose` pour l'instrumentation Jetpack Compose est 2.21.0.
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-compose:x.x.x"
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android-compose:x.x.x")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### Étape 2 – Activez l'option de suivi des actions dans `RumConfiguration` {#step-2-enable-actions-tracking-option-in-rumconfiguration}
Après avoir ajouté la dépendance, activez le suivi des actions Compose dans votre `RumConfiguration`. Cette étape est requise quel que soit le mode d'instrumentation.
{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

## Instrumentation automatique {#automatic-instrumentation}

Pour une couverture RUM complète avec une configuration minimale, vous pouvez instrumenter automatiquement votre application Jetpack Compose.

Comme décrit à l'étape 1 de la [section de configuration Android][2], déclarez le [Datadog Gradle Plugin][3] dans votre script de build et appliquez-le à chaque module que vous souhaitez instrumenter.

<div class="alert alert-info"><p>
Le Datadog Gradle Plugin analyse <code>@Composable</code> les fonctions et ajoute des tags Semantics à leurs modificateurs. Ces tags permettent à Datadog RUM de suivre les interactions des utilisateurs sur les composants Compose avec les informations de cible correctes. Le plugin détecte également <code>NavHost</code> l'utilisation et écoute les événements de navigation Jetpack Compose.
</p></div>

###  Étape 1 – Déclarez le Datadog Gradle Plugin dans votre script de build {#step-1-declare-datadog-gradle-plugin-in-your-buildscript}
La version minimale du Datadog Gradle Plugin pour l'instrumentation Jetpack Compose est 1.17.0.
{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
buildscript {
    dependencies {
        classpath "com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x"
    }
}

plugins {
    id 'com.datadoghq.dd-sdk-android-gradle-plugin'
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}

plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### Étape 2 – Sélectionnez le mode d'instrumentation {#setup-2-select-the-instrumentation-mode}
Dans la configuration Gradle de votre module, définissez le mode d'instrumentation Compose souhaité :

{{< tabs >}}
{{% tab "Groovy" %}}

```groovy
datadog {
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = "AUTO"
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}

```kotlin
datadog {
  // Other configurations that you may set before.
  //(...)

  // Jetpack Compose instrumentation mode option.
  composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{< /tabs >}}

Modes d'instrumentation disponibles :

{{< tabs >}}
{{% tab "Groovy" %}}
- `"AUTO"` : instrumente toutes les fonctions `@Composable`.
- `"ANNOTATION"` : instrumente uniquement les fonctions `@Composable` annotées avec `@ComposeInstrumentation`. Vous pouvez définir le périmètre de l'auto-instrumentation en utilisant cette annotation.
- `"DISABLE"` : désactive complètement l'instrumentation.
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO` : instrumente toutes les fonctions `@Composable`.
- `InstrumentationMode.ANNOTATION` : instrumente uniquement les fonctions `@Composable` annotées avec `@ComposeInstrumentation`. Vous pouvez définir le périmètre de l'auto-instrumentation en utilisant cette annotation.
- `InstrumentationMode.DISABLE` : désactive complètement l'instrumentation.

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous ne déclarez pas `composeInstrumentation` dans le bloc `datadog`, l'auto-instrumentation est désactivée par défaut.

### Comment les noms sont attribués avec l'auto-instrumentation {#how-names-are-assigned-with-auto-instrumentation}
Lorsque l'auto-instrumentation est activée :
-   La **route de navigation Compose** est utilisée comme **nom de vue**.
-   Le **nom de la fonction composable directe** qui enveloppe un élément interactif est utilisé comme **cible d'action**.

```kotlin
@Composable
fun AppScaffold(){
    NavHost(navController = rememberNavController(), startDestination = "Home Screen"){
      composable("Home Screen"){
        HomeScreen()
      }
    }
}

@Composable
fun CustomButton(onClick: () -> Unit) {
    Button(onClick = onClick){
       Text("Welcome Button")
    }
}
```
Dans l'exemple ci-dessus :
-   « Home Screen » est utilisé comme **nom de vue** lorsque `HomeScreen()` est chargé.
-   « CustomButton » est utilisé comme **cible d'action** lorsque l'on clique sur le bouton.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Nommage par défaut de l'auto-instrumentation" style="width:90%;">}}


## Instrumentation manuelle {#manual-instrumentation}

Si vous avez besoin de plus de personnalisation ou de contrôle sur le suivi des actions et des vues, vous pouvez instrumenter manuellement vos applications.

### Suivi des actions {#actions-tracking}
Pour suivre les interactions des utilisateurs avec des composants Jetpack Compose spécifiques, appliquez le modificateur `datadog`. L'argument `name` définit le nom de la vue affiché dans la liste des événements RUM.

```kotlin
@Composable
fun HomeScreen(){
 Column{
     Image(modifier = Modifier.datadog(name = "Welcome Image").clickable{
       // Action can be tracked if this image is clickable
     },
      // Other arguments
     )

     Text(modifier = Modifier.datadog(name = "Welcome Text").clickable{
       // Action can be tracked if this text is clickable
     },
      // Other arguments
     )
 }
}
```
Dans l'exemple ci-dessus, les noms personnalisés sont utilisés pour les éléments interactifs dans le suivi des actions RUM.

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="Nom du composant dans le suivi des actions" style="width:90%;">}}


### Suivi des vues {#views-tracking}
Pour activer le suivi des vues RUM basé sur la navigation Jetpack Compose, appelez l'API `NavigationViewTrackingEffect` et transmettez le `NavHostController` de votre application.

```kotlin
@Composable
fun AppScaffold(){
	val navController = rememberNavController()
	NavigationViewTrackingEffect(
	    navController = navController,
	    trackArguments = true,
	    destinationPredicate = AcceptAllNavDestinations()
	)
	NavHost(navController = navController,
	    // other arguments
	) {
	   // (...)
	}
}
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics