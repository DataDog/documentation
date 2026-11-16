---
aliases:
- /es/real_user_monitoring/android/jetpack_compose_instrumentation/
- /es/real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
- /es/real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
description: Instrumente Jetpack Compose de forma manual o automática con Datadog
  Gradle Plugin.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag: Código fuente
  text: Código fuente de dd-sdk-android-compose
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag: Código fuente
  text: Código fuente de Datadog Gradle Plugin
- link: /real_user_monitoring
  tag: Documentación
  text: Explore Datadog RUM
title: Instrumentación de Jetpack Compose
---
## Descripción general {#overview}
Jetpack Compose es un kit de herramientas para crear interfaces de usuario nativas en Android. Si su aplicación utiliza Jetpack Compose, puede instrumentarla de forma manual o automática con Datadog Gradle Plugin. Esto habilita Real User Monitoring (RUM), de forma similar a lo que está disponible para las Views clásicas de Android.

<div class="alert alert-info"><p>La versión mínima de Kotlin admitida es 1.9.23.</p></div>

Después de la configuración inicial, puede elegir entre la instrumentación [automática](#automatic-instrumentation) y [manual](#manual-instrumentation).

## Configuración {#setup}
### Paso 1 - Declare "dd-sdk-android-compose" como dependencia {#step-1-declare-dd-sdk-android-compose-as-a-dependency}
Agregue `dd-sdk-android-compose` como dependencia a cada módulo que desee instrumentar. Esto incluye el módulo de la aplicación, cualquier módulo de interfaz de usuario de Jetpack Compose o módulos de funciones que utilicen Jetpack Compose.
La versión mínima de `dd-sdk-android-compose` para la instrumentación de Jetpack Compose es 2.21.0.
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

### Paso 2 - Habilite la opción de seguimiento de acciones en `RumConfiguration` {#step-2-enable-actions-tracking-option-in-rumconfiguration}
Después de agregar la dependencia, habilite el seguimiento de acciones de Compose en su `RumConfiguration`. Este paso es obligatorio independientemente del modo de instrumentación.
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

## Instrumentación automática {#automatic-instrumentation}

Para una cobertura completa de RUM con una configuración mínima, puede instrumentar automáticamente su aplicación de Jetpack Compose.

Como se describe en el Paso 1 de la [sección de configuración de Android][2], declare [Datadog Gradle Plugin][3] en su script de compilación y aplíquelo a cada módulo que desee instrumentar.

<div class="alert alert-info"><p>
Datadog Gradle Plugin escanea <code>@Composable</code> funciones y agrega etiquetas de Semantics a sus modificadores. Estas etiquetas permiten que Datadog RUM rastree las interacciones del usuario en los componentes de Compose con la información de destino correcta. El complemento también detecta <code>NavHost</code> el uso y escucha los eventos de navegación de Jetpack Compose.
</p></div>

###  Paso 1 - Declare Datadog Gradle Plugin en su script de compilación {#step-1-declare-datadog-gradle-plugin-in-your-buildscript}
La versión mínima de Datadog Gradle Plugin para la instrumentación de Jetpack Compose es 1.17.0.
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

### Configuración 2: seleccione el modo de instrumentación {#setup-2-select-the-instrumentation-mode}
En la configuración de Gradle de su módulo, defina el modo de instrumentación de Compose deseado:

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

Modos de instrumentación disponibles:

{{< tabs >}}
{{% tab "Groovy" %}}
- `"AUTO"`: Instrumenta todas las funciones `@Composable`.
- `"ANNOTATION"`: Solo instrumenta las funciones `@Composable` anotadas con `@ComposeInstrumentation`. Puede definir el contexto de la instrumentación automática mediante esta anotación.
- `"DISABLE"`: Deshabilita la instrumentación por completo.
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO`: Instrumenta todas las funciones `@Composable`.
- `InstrumentationMode.ANNOTATION`: Solo instrumenta las funciones `@Composable` anotadas con `@ComposeInstrumentation`. Puede definir el contexto de la instrumentación automática mediante esta anotación.
- `InstrumentationMode.DISABLE`: Deshabilita la instrumentación por completo.

{{% /tab %}}
{{< /tabs >}}

**Nota**: Si no declara `composeInstrumentation` en el bloque `datadog`, la instrumentación automática se deshabilita de forma predeterminada.

### Cómo se asignan los nombres con la instrumentación automática {#how-names-are-assigned-with-auto-instrumentation}
Cuando la instrumentación automática está habilitada:
-   La **ruta de navegación de Compose** se usa como el **nombre de la vista**.
-   El **nombre de la función composable directa** que envuelve un elemento interactivo se usa como el **objetivo de la acción**.

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
En el ejemplo anterior:
-   "Home Screen" se utiliza como el **nombre de la vista** cuando se carga `HomeScreen()`.
-   "CustomButton" se utiliza como el **objetivo de la acción** cuando se hace clic en el botón.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Nomenclatura predeterminada de la instrumentación automática" style="width:90%;">}}


## Instrumentación manual {#manual-instrumentation}

Si necesita más personalización o control sobre el seguimiento de acciones y vistas, puede instrumentar manualmente sus aplicaciones.

### Seguimiento de acciones {#actions-tracking}
Para realizar el seguimiento de las interacciones del usuario con componentes específicos de Jetpack Compose, aplique el modificador `datadog`. El argumento `name` define el nombre de la vista que se muestra en la lista de eventos RUM.

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
En el ejemplo anterior, se utilizan los nombres personalizados para los elementos interactivos en el seguimiento de acciones RUM.

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="Nombre del componente en el seguimiento de acciones" style="width:90%;">}}


### Seguimiento de vistas {#views-tracking}
Para habilitar el seguimiento de vistas RUM basado en la navegación de Jetpack Compose, llame a la API `NavigationViewTrackingEffect` y pase el `NavHostController` de su aplicación.

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics