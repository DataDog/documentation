---
aliases:
- /es/real_user_monitoring/unity/
- /es/real_user_monitoring/unity/setup
code_lang: unity
code_lang_weight: 30
description: Recopila datos de RUM de tus proyectos de Unity Mobile.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: https://github.com/DataDog/unity-package
  tag: Código fuente
  text: URL del paquete del SDK de Unity
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprende a explorar sus datos de RUM
is_beta: true
private: true
title: Configuración de monitorización de RUM Unity
type: multi-code-lang
---
## Información general

{{< beta-callout url="#" btn_hidden="true" >}}
La monitorización de Unity está en beta pública.
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) te permite visualizar y analizar los recorridos de cada usuario de tu aplicación.

## Configuración

<div class="alert alert-info">
Datadog es compatible con la monitorización de Unity para iOS y Android para Unity LTS 2022+.
</div>

Datadog no admite implementaciones de escritorio (Windows, Mac o Linux), consola o web desde Unity. Si tienes un juego o una aplicación y quieres utilizar Datadog RUM para monitorizar su rendimiento, crea un ticket compatible con [Datadog][7].

### Instalación

1. Instala [External Dependency Manager for Unity (EDM4U)][4]. Esto puede hacerse utilizando [Open UPM][5].

2. Añade el paquete de Unity del SDK de Datadog desde su URL de Git en [https://github.com/DataDog/unity-package][6].  La URL del paquete es `https://github.com/DataDog/unity-package.git`.

3. Configura tu proyecto para utilizar [plantillas de Gradle][8] y activa `Custom Main Template` y `Custom Gradle Properties Template`.

4. Si compilas y recibes errores `Duplicate class` (frecuente en Unity 2022.x), añade el siguiente bloque en el bloque `dependencies` en tu `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

### Especifica los detalles de la aplicación en la interfaz de usuario

1. En Datadog, ve a [**Experiencia digital** > **Añadir una aplicación**][1].
2. Elige **Unity** como tipo de aplicación.
3. Proporciona un nombre de la aplicación para generar un ID de aplicación Datadog y un token de cliente únicos.
4. Para desactivar la recopilación automática de datos de usuario para la IP del cliente o los datos de geolocalización, desactiva las casillas de esa configuración.

Para garantizar la seguridad de tus datos, utiliza un token de cliente. Para obtener más información sobre cómo configurar un token de cliente, consulta la [Documentación sobre tokens de cliente][2].

### Especifica la configuración de Datadog en la interfaz de usuario de Unity

Después de instalar el SDK de Datadog Unity, tienes que configurar la configuración de Datadog en la interfaz de usuario de Unity. Ve a tu `Project Settings` y haz clic en la sección `Datadog` del lado izquierdo. Verás la siguiente pantalla:

{{<img src="real_user_monitoring/unity/Datadog-setup-ui.png">}}

Están disponibles los siguientes parámetros:

| Parámetro | ¿Es obligatorio? | Descripción |
| --------- | --------- | ----------- |
| Activar Datadog | No | Si se debe activar Datadog. Desactivar Datadog no provoca que ninguna de las API de Datadog falle, lance excepciones o devuelva `null` de ninguna llamada. Solo impide que el SDK envíe información. |
| Salida de archivos de símbolos | No | Esta opción activa la salida de archivos de símbolos para las características de simbolización y asignación de archivos/líneas de Datadog en el rastreo de errores de Datadog. |
| Token de cliente | Sí | Tu token de cliente creada para tu aplicación en el sitio web de Datadog. |
| Entorno | No | El nombre del entorno para tu aplicación. Los valores predeterminados son `"prod"`. |
| Sitio web de Datadog | Sí | El sitio al que envías tus datos. |
| Punto de conexión personalizado | No | Un punto de conexión o proxy personalizado para enviar datos a través de Datadog. Se utiliza principalmente para depuración. |
| Tamaño de los lotes | Sí | Configura el tamaño preferido de los datos cargados por lotes en Datadog. Este valor influye en el tamaño y el número de solicitudes realizadas por el SDK (los lotes pequeños significan más solicitudes, pero cada solicitud se hace de menor tamaño). |
| Frecuencia de carga | Sí | Configura la frecuencia preferida de carga de datos en Datadog. |
| Nivel de procesamiento por lotes | Sí | Define la cantidad máxima de lotes procesados secuencialmente sin retraso en un un ciclo de lectura/carga. |
| Activar la notificación de accidentes | No | Activa el informe de bloqueos en el SDK de RUM. |
| Reenvío de logs de Unity | No | Si se reenvían logs hechos desde llamadas `Debug.Log` de Unity al registrador predeterminado de Datadog. |
| Umbral remoto de logs | Sí | El nivel al que el registrador predeterminado reenvía logs a Datadog. Los logs por debajo de este nivel no se envían. |
| Activar RUM | No | Si se activa el envío de datos desde las API de Real User Monitoring de Datadog |
| Activar el rastreo automático de escenas | No | Si Datadog debe rastrear automáticamente nuevas vistas interceptando la carga de `SceneManager` de Unity. |
| ID de la aplicación RUM | Sí (si RUM está activado) | El identificador de aplicación RUM creado para tu aplicación en el sitio web de Datadog. |
| Frecuencia de muestreo de la sesiones | Sí | El porcentaje de sesiones que se van a enviar a Datadog. Entre 0 y 100. |
| Frecuencia de muestreo de trazas | Sí | El porcentaje de trazas (traces) distribuidas que se van a enviar a Datadog. Entre 0 y 100. |
| Hosts de primera parte | No | Para activar el rastreo distribuido, especifica qué hosts se consideran "primera parte" y tienen información de trazas insertada. |

### Muestreo de sesiones de RUM

Puedes controlar los datos que tu aplicación envía a Datadog RUM durante instrumentación del SDK de RUM Unity. Especifica la **Frecuencia de muestreo de sesiones** como un porcentaje entre 0 y 100 en la ventana de Configuración de proyectos en Unity.

## Utilizar Datadog

### Configurar el consentimiento de rastreo

Para cumplir con las políticas de protección de datos y privacidad, el SDK de Datadog Unity requiere la configuración de un valor de consentimiento de rastreo.

La configuración de `trackingConsent` puede ser uno de los siguientes valores:

  * `TrackingConsent.Pending`: El SDK de Unity comienza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. El SDK de Unity espera el nuevo valor del consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
  * `TrackingConsent.Granted`: El SDK de Unity comienza a recopilar los datos y los envía a Datadog.
  * `TrackingConsent.NotGranted`: El SDK de Unity no recopila ningún dato. No se envía ningún log a Datadog.

Antes de que Datadog envíe cualquier dato, se debe confirmar el `Tracking Consent` del usuario. Esto se configura en `TrackingConsent.Pending` durante la inicialización
y se debe configurar en `TrackingConsent.Granted` antes de que Datadog envíe cualquier información.

```cs
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```

### Registro

Puedes interceptar y enviar logs desde el registrador de depuración predeterminado de Unity activando la opción y el umbral en la configuración de tus proyectos.

Datadog asigna los niveles de Unity a lo siguiente en los niveles de registro de Datadog:

| Tipo de log de Unity  | Nivel de logs de Datadog |
| -------------- | ----------------- |
| Log            |  Información             |
| Error          |  Error            |
| Afirmar         |  Imprescindible         |
| Advertencia        |  Advertir             |
| Excepción      |  Imprescindible         |

Puedes acceder a este registrador predeterminado para añadir atributos o etiquetas (tags) a través de la propiedad `DatadogSdk.DefaultLogger`.

También puedes crear registradores adicionales para un control más específico de los umbrales, los nombres de los servicios, los nombres de los registradores o para proporcionar atributos adicionales.

```cs
var registrador = DatadogSdk.Instance.CreateLogger(new DatadogLoggingOptions()
{
    NetworkInfoEnabled = true,
    DatadogReportingThreshold = DdLogLevel.Debug,
});
logger.Info("Hello from Unity!");

logger.Debug("Hello with attributes", new()
{
    { "my_attribute", 122 },
    { "second_attribute", "with_value" },
    { "bool_attribute", true },
    {
        "nested_attribute", new Dictionary<string, object>()
        {
            { "internal_attribute", 1.234 },
        }
    },
});
```

Los siguientes parámetros están disponibles cuando se crea un nuevo registrador:

| Parámetro | Descripción | Predeterminado |
| --------- | ----------- | ------- |
| `Service` | El nombre del servicio que se asociará a este registrador. | El nombre del servicio de la aplicación.
| `Name` | El nombre del registrador. | Ninguno |
| `NetworkInfoEnabled` | Si se recopila información sobre el estado de la red del usuario con cada log. | `false` |
| `BundleWithRumEnabled` | Si se recopila la información de la sesión RUM con cada log. | `true` |
| `RemoteSampleRate` | El porcentaje de logs de este registrador que se va a enviar a Datadog, como un porcentaje entero. | `100` |
| `RemoteLogThreshold` | El umbral por encima del cual se deben enviar logs a Datadog. | `DdLogLevel.Debug` |

### Real User Monitoring (RUM)

#### Rastreo manual de escenas (vistas)

Para rastrear manualmente nuevas escenas (`Views` en Datadog), utiliza los métodos `StartView` y `StopView`:

```cs
anulación pública Inicio()
{
    DatadogSdk.Instance.Rum.StartView("My View", new()
    {
        { "view_attribute": "active" }
    });
}
```

Al iniciar una nueva vista, se cierra automáticamente la vista previa.

#### Rastreo automático de escenas

También puedes configurar `Enable Automatic Scene Tracking` en tu configuración de proyectos para activar el rastreo automático de escenas activas. Se utiliza el evento `SceneManager.activeSceneChanged` de Unity para iniciar automáticamente nuevas escenas.

#### Solicitudes web/Rastreo de recursos

Datadog ofrece `DatadogTrackedWebRequest`, que es una envoltura de `UnityWebRequest` pensada para sustituir directamente a `UnityWebRequest`. `DatadogTrackedWebRequest`, activa el [Rastreo distribuido de Datadog][3].

Para activar el rastreo distribuido de Datadog, configura `First Party Hosts` en la configuración de tu proyecto en un dominio que admita el rastreo distribuido. También puedes modificar la frecuencia de muestreo para el rastreo distribuido configurando `Tracing Sampling Rate`.

`First Party Hosts` no permite comodines, pero coincide con cualquier subdominio de un dominio determinado. Por ejemplo, api.example.com coincide con staging.api.example.com y prod.api.example.com, pero no con news.example.com.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[4]: https://github.com/googlesamples/unity-jar-resolver
[5]: https://openupm.com/packages/com.google.external-dependency-manager/
[6]: https://github.com/DataDog/unity-package
[7]: /es/help/
[8]: https://docs.unity3d.com/Manual/gradle-templates.html