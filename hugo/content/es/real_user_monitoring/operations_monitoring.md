---
description: Haga un seguimiento de las operaciones técnicas críticas dentro de los
  recorridos orientados al usuario para identificar exactamente cuándo y por qué los
  usuarios no completan los flujos de trabajo clave.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Obtenga más información sobre RUM
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: Guía
  text: Mejores prácticas para configurar el seguimiento de operaciones
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: Guía
  text: Mejores prácticas para crear SLO para operaciones de RUM
title: Seguimiento de operaciones
---
## Descripción general {#overview}

{{< callout header="Vista previa" btn_hidden="true" >}}
El seguimiento de operaciones está en Vista previa.
{{< /callout >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="Pestaña de operaciones en RUM > Performance Monitoring" style="width:100%;" >}}

En Datadog Real User Monitoring (RUM), un [recorrido][9] representa un área importante de su aplicación orientada al usuario, como el pago, el inicio de sesión o la búsqueda. Cada recorrido incluye operaciones, que son los pasos técnicos críticos que hacen que la experiencia funcione.

- Los equipos de negocios utilizan **recorridos** para rastrear y mejorar la conversión de usuarios.
- Los equipos de ingeniería utilizan **operaciones** para hacer un seguimiento y minimizar las fallas técnicas que afectan los momentos clave del usuario.

Puede crear operaciones con las API del SDK de RUM, directamente en Datadog o mediante programación con Datadog API.

Por ejemplo, la experiencia de pago de una plataforma de comercio electrónico es un recorrido. Dentro de él, las operaciones pueden incluir ingresar los detalles de pago, guardar un método de pago y completar una compra. Después de crear las operaciones, Datadog RUM mide el rendimiento de cada operación, incluido el volumen de ejecución, la tasa de finalización y la tasa de fallas. Medir el estado de las operaciones le permite identificar exactamente cuándo y por qué los usuarios pueden no convertir en su recorrido.


La siguiente tabla muestra ejemplos adicionales de recorridos y sus operaciones de recorrido asociadas por industria.

| Industria       | Recorrido  | Operaciones de recorrido                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| Red social | Perfil  | Los usuarios pueden cargar su perfil <br> Los usuarios pueden subir una imagen <br> Los usuarios pueden actualizar su estado                                  |
| Comercio electrónico      | Pago | Los usuarios pueden ingresar los detalles de pago <br> Los usuarios pueden guardar su método de pago <br> Los usuarios pueden pagar                                      |
| Streaming      | Búsqueda   | Los usuarios pueden encontrar resultados para su búsqueda <br> Los usuarios pueden cargar la descripción de un título <br> Los usuarios pueden comenzar a ver el tráiler |
| CRM            | Cotización    | Los usuarios pueden iniciar una nueva cotización <br> Los usuarios pueden agregar partidas a la cotización <br> Los usuarios pueden enviar una cotización a los destinatarios                 |

## Requisitos previos {#prerequisites}

- [RUM without Limits][11] debe estar habilitado en su organización.
- Para crear operaciones con las API del SDK, descargue una versión compatible del Datadog RUM SDK con API del lado del cliente para definir operaciones:
  - [Browser (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Flutter (3.0.0)][7]
      - **Nota**: En Flutter Web, las operaciones se enrutan a través del Browser SDK, lo cual requiere que la `feature_operation_vital` función experimental esté habilitada.
  - [Kotlin Multiplatform (1.4.0)][4]
  - [React Native (3.0.0)][5]
  - [Roku (1.4.0)][6]

## Crear operaciones con las API del SDK {#create-operations-with-the-sdk-apis}

Utilice las API del SDK para definir sus operaciones.

### Iniciar una operación {#start-an-operation}

Toda operación debe iniciarse llamando a `startOperation` (algunos SDK pueden usar el nombre heredado de esta API - `startFeatureOperation`).

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
Para usar operaciones en Flutter Web, habilite la función experimental `feature_operation_vital` en el Browser SDK.
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

<div class="alert alert-warning">El nombre de la operación solo puede contener letras, dígitos o los caracteres <code>- _ . @ $</code>, y no puede contener espacios en blanco.</div>

### Detener una operación con éxito {#stop-an-operation-with-success}

Toda operación iniciada debe tener una detención. Use `succeedOperation` para detener una operación con un resultado exitoso (algunos SDK pueden usar el nombre heredado de esta API - `succeedFeatureOperation`).

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
Para usar operaciones en Flutter Web, habilite la función experimental `feature_operation_vital` en el Browser SDK.

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

<div class="alert alert-warning">El <code>operationKey</code> debe ser el mismo en el evento de inicio y fin de la operación.</div>

### Detener una operación con error {#stop-an-operation-with-failure}

Toda operación iniciada debe tener una detención. Use `failOperation` para detener una operación con un resultado de error (algunos SDK pueden usar el nombre heredado de esta API - `failFeatureOperation`).

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
Para usar operaciones en Flutter Web, habilite la función experimental `feature_operation_vital` en el Browser SDK.

{{% /tab %}}

{{< /tabs >}}

### Paralelización {#parallelization}
Es posible que tenga casos en los que los usuarios inicien varias operaciones de recorrido en paralelo. Para rastrearlos individualmente, utilice el `operationKey` definido al llamar a `startOperation`. Debe reutilizar el mismo `operationKey` más adelante en otras API, por ejemplo, al llamar a `succeedOperation`.

<div class="alert alert-warning">Las operaciones que se han iniciado pero no se han detenido explícitamente se terminan automáticamente cuando expira la sesión RUM. Esas se marcan como fallidas, con <code>@operation.failure_reason:timeout</code>. <br><br> Si se llamó a una API de detención de operación que no se inició en primer lugar, el evento de detención emitido por el SDK se descarta durante la ingesta.</div>

## Crear operaciones desde Datadog {#create-operations-from-datadog}

Puede crear una operación desde el catálogo de operaciones o desde el informe de detalles de un recorrido:

- **Catálogo de operaciones**: Navegue a {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}, luego haga clic en {{< ui >}}New Operation{{< /ui >}}
- **Journey Monitoring**: Navegue a {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Journey Monitoring{{< /ui >}}, seleccione un recorrido, navegue a su {{< ui >}}Details Report{{< /ui >}}, luego haga clic en {{< ui >}}New Operation{{< /ui >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Página para crear operaciones desde la interfaz de usuario de Datadog" style="width:100%;" >}}

<div class="alert alert-warning">Cada aplicación RUM admite hasta 1000 operaciones creadas desde Datadog a través de la interfaz de usuario o la API. No existe un límite a nivel de organización para las operaciones creadas directamente en Datadog.</div>

### Paso 1: Ingrese los detalles de la operación y seleccione la categoría de la operación {#step-1-enter-operation-details-and-select-the-operation-category}

Seleccione la aplicación RUM de la operación e ingrese un nombre para mostrar. Opcionalmente, puede agregar una descripción a la operación.

Seleccione la **categoría** de la operación para determinar los tipos de eventos RUM compatibles con las condiciones de inicio, éxito y falla. 

| Categoría de operación       | Resumen  | Tipos de eventos compatibles                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| Carga de componentes | Mida cuánto tiempo tarda en completarse una acción iniciada por el usuario  | Inicio: Acción <br> Éxito: Recurso o acción personalizada <br> Falla: Recurso, error o acción personalizada |
| Envío de formulario | Mida cuánto tiempo tarda en completarse un envío de formulario o una mutación | Inicio: Acción <br> Éxito: Recurso, visualización o acción personalizada <br> Falla: Recurso, error o acción personalizada |
| Carga de página o pantalla | Mida cuánto tiempo tarda una página o pantalla en cargar y mostrar datos | Inicio: Visualización <br> Éxito: Recurso, visualización o acción personalizada <br> Error: Recurso, error o acción personalizada |
| Navegación de página o pantalla | Mida cuánto tiempo tarda en completarse una navegación de una página o pantalla a otra | Inicio: Acción o visualización <br> Éxito: Recurso, visualización o acción personalizada <br> Error: Recurso, error o acción personalizada |
| Personalizada | Defina una operación personalizada con cualquier combinación de tipos de eventos | Inicio: Acción o visualización <br> Éxito: Recurso, visualización o acción personalizada <br> Error: Recurso, error o acción personalizada |

### Paso 2: Defina el evento de inicio {#step-2-define-the-start-event}

Cada operación debe tener un evento RUM de inicio. Las operaciones pueden comenzar con un evento de acción o de visualización, según la categoría de operación seleccionada.

### Paso 3: Defina las condiciones de éxito {#step-3-define-the-success-conditions}

Cada operación debe tener una condición para finalizar en un éxito. Las operaciones pueden finalizar en éxito con un evento de recurso, visualización o acción personalizada, según la categoría de operación seleccionada.

### Paso 4: Defina las condiciones de error {#step-4-define-the-failure-conditions}

Cada operación debe tener una condición para finalizar en un error:
- **Error** los errores pueden finalizar como un recurso, error o acción personalizada.
- **Abandono** los errores se pueden activar en caso de que el usuario navegue fuera de la visualización inicial antes de que finalice la operación.

<div class="alert alert-danger">Espere hasta 15 minutos para que las métricas aparezcan en el catálogo de operaciones después de crear una operación en Datadog a través de la interfaz de usuario o la Datadog API.</div>

## Cree operaciones con la Datadog API {#create-operations-with-the-datadog-api}

Las operaciones también se pueden crear a través de la [Datadog API][10].

## Edite operaciones {#edit-operations}

En el catálogo de operaciones, haga clic en el icono del lápiz para editar una operación. Puede editar la descripción de cualquier operación, independientemente de cómo se haya creado. Las operaciones creadas a través de la interfaz de usuario o la API se pueden editar por completo (no solo la descripción).

## Haga un seguimiento de su disponibilidad en Datadog {#monitor-your-availability-on-datadog}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="Pestaña de operaciones en RUM > Performance Monitoring" style="width:100%;" >}}

Después de crear operaciones con el SDK de RUM, directamente en Datadog, o con la Datadog API, haga un seguimiento de ellas navegando a {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}.

Datadog agrupa todas las operaciones con el mismo nombre en un catálogo.

Cada operación tiene dos métricas predeterminadas calculadas sobre su tráfico completo, ingerido y sin muestreo:

- `rum.measure.operation`, que cuenta el volumen de operaciones reportadas a Datadog
- `rum.measure.operation.duration`, que mide el tiempo transcurrido entre el inicio y el final de todas las operaciones reportadas a Datadog

Ambas métricas se conservan durante 15 meses e incluyen varias dimensiones:

- `operation.name`, que se define en el lado del cliente
- `operation.status`, que es éxito o fracaso
- `operation.failure_reason`, que puede ser un error, un abandono u otro

Esas métricas están incluidas en el precio de RUM Measure y están disponibles para todos los clientes de RUM without Limits que definan una o más operaciones.

## Investigue las causas raíz con IA {#investigate-root-causes-with-ai}

Puede ejecutar una investigación con el agente sobre una sola operación directamente desde la página de Operaciones. El agente analiza tanto la tasa de éxito como la latencia de la operación y presenta investigaciones enfocadas para cada modo de falla (errores, tiempos de espera, abandono) y para regresiones de latencia. Para obtener más información, consulte [Operation AI Investigation][8].

## Configure filtros de retención {#configure-retention-filters}

Las operaciones son un nuevo tipo de evento en RUM. Las operaciones están vinculadas a una sesión de RUM, pero pueden representar múltiples RUM Views. Las operaciones pueden ser seleccionadas en [filtros de retención][12]. Esto le permite alinear su estrategia de retención con los recorridos que son fundamentales para la experiencia de sus usuarios. Por ejemplo, puede mantener mediante programación las sesiones RUM en las que fallaron operaciones específicas o que tardan más de lo deseado.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="Pestaña de operaciones en RUM > Performance Monitoring" style="width:80%;" >}}

De manera similar a las métricas, esos eventos incluyen atributos específicos que puede utilizar en los filtros de retención:

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/3.0.0
[6]: https://github.com/DataDog/dd-sdk-roku/releases/tag/1.4.0
[7]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv3.0.0
[8]: /es/real_user_monitoring/ai_investigations/operation_ai_investigation/
[9]: /es/journey_monitoring/
[10]: /es/api/latest/rum-operations/
[11]: /es/real_user_monitoring/rum_without_limits/
[12]: /es/real_user_monitoring/rum_without_limits/retention_filters/