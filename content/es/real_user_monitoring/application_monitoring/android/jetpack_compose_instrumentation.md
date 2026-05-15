---
alias:
- /real_user_monitoring/android/jetpack_compose_instrumentation/
- /real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
- /real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
descripción: Instrumenta Jetpack Compose manual o automáticamente utilizando el complemento
  Gradle de Datadog.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag (etiqueta): Código fuente
  texto: Código fuente para dd-sdk-android-compose
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag (etiqueta): Código fuente
  texto: Código fuente para el complemento de Gradle de Datadog
- link: /real_user_monitoring
  tag (etiqueta): Documentación
  texto: Explora RUM de Datadog
título: Instrumentación de Jetpack Compose
---
## Información general
Jetpack Compose es un kit de herramientas para crear interfaces de usuario nativas en Android. Si tu aplicación utiliza Jetpack Compose, puedes instrumentarla manual o automáticamente con el complemento de Gradle de Datadog. Esto permite una Real User Monitoring (RUM) similar a la que está disponible para las vistas clásicas de Android.

<div class="alert alert-info"><p>La versión mínima admitida de Kotlin es 1.9.23.</p></div>

Tras la configuración inicial, puedes seleccionar entre la instrumentación [automática](#automatic-instrumentation) y [manual](#manual-instrumentation).

## Configuración
### Step (UI) / paso (generic) 1 - Declarar "dd-sdk-android-compose" como dependencia
Añade `dd-sdk-android-compose` como dependencia a cada módulo que desees instrumentar. Esto incluye el módulo de aplicación, cualquier módulo de interfaz de usuario de Jetpack Compose o módulos de funciones que utilicen Jetpack Compose.
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

### Step (UI) / paso (generic) 2 - Activa la opción de seguimiento de acciones en `RumConfiguration`
Después de añadir la dependencia, activa el seguimiento de acciones de Compose en tu `RumConfiguration`. Este step (UI) / paso (generic) es necesario independientemente del modo de instrumentación.
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

## Instrumentación automática

Para una cobertura completa de RUM con una configuración mínima, puedes instrumentar automáticamente tu aplicación de Jetpack Compose.

Como se describe en el step (UI) / paso (generic) 1 de la [sección de configuración de Android][2], declara el [complemento de Gradle de Datadog][3] en tu script de compilación y aplícalo a cada módulo que desees instrumentar.

<div class="alert alert-info"><p>
El complemento de Gradle de Datadog escanea las funciones <code>@Composable</code> y añade tags (etiquetas) de Semantics a tus modificadores. Estas tags (etiquetas) permiten que RUM de Datadog rastree las interacciones del usuario en los componentes de Compose con la información de destino correcta. El complemento también detecta el uso de <code>NavHost</code> y escucha los eventos de navegación de Jetpack Compose.
</p></div>

###  Step (UI) / paso (generic) 1 - Declara el complemento de Gradle de Datadog en tu buildscript
La versión mínima del complemento de Gradle de Datadogpara la instrumentación de Jetpack Compose es 1.17.0.
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

### Configuración 2 - Seleccionar el modo de instrumentación
En la configuración de Gradle de tu módulo, define el modo deseado de instrumentación de Compose:

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
- `"AUTO"`: Instrumenta todas las funciones de `@Composable`.
- `"ANNOTATION"`: Solo instrumenta funciones `@Composable` anotadas con `@ComposeInstrumentation`. Puedes definir el alcance de la instrumentación automática utilizando esta anotación.
- `"DISABLE"`: Desactiva completamente la instrumentación.
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO`: Instrumenta todas las funciones de `@Composable`.
- `InstrumentationMode.ANNOTATION`: Solo instrumenta las funciones `@Composable` anotadas con `@ComposeInstrumentation`. Puedes definir el alcance de la instrumentación automática utilizando esta anotación.
- `InstrumentationMode.DISABLE`: Desactiva completamente la instrumentación.

{{% /tab %}}
{{< /tabs >}}

**Nota**: Si no declaras `composeInstrumentation` en el bloque `datadog`, la instrumentación automática se desactiva en forma predeterminada.

### Cómo se asignan los nombres con la instrumentación automática
Cuando la instrumentación automática está activada:
-   La **Compose navigation route** (ruta de navegación de Compose) se utiliza como el **view name** (nombre de la vista).
-   El **name of the direct composable function** (nombre de la función que admite composición directa) que ajusta un elemento interactivo se utiliza como el **action target** (destino de acción).

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
-   "Pantalla de inicio" se utiliza como **nombre de la vista** cuando se carga `HomeScreen()`.
-   "CustomButton" se utiliza como **destino de acción** cuando se hace clic en el botón.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Nomenclatura predeterminada de la instrumentación automática " style="width:90%;">}}


## Instrumentación manual

Si necesitas más personalización o control sobre el seguimiento de acciones y vistas, puedes instrumentar manualmente tus aplicaciones.

### Seguimiento de las acciones
Para realizar un seguimiento de las interacciones del usuario con componentes específicos de Jetpack Compose, aplica el modificador `datadog`. El argumento `name` define el nombre de la vista que se muestra en la lista de eventos de RUM.
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
En el ejemplo anterior, los nombres personalizados se utilizan para los elementos interactivos en el seguimiento de las acciones de Rum.

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="Nombre del componente en el seguimiento de las acciones" style="width:90%;">}}


### Seguimiento de visitas
Para activar el seguimiento de vistas de RUM basado en la navegación de Jetpack Compose, llama a la API `NavigationViewTrackingEffect` y pasa la dirección `NavHostController` de tu aplicación.
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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics