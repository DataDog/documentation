---
aliases:
- /es/real_user_monitoring/unity/advanced_configuration
- /es/real_user_monitoring/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /es/real_user_monitoring/unity/otel_support/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/unity
description: Aprende a configurar la monitorización de Unity.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
title: Configuración avanzada de Unity
---
## Información general

Si aún no has configurado el SDK de Datadog Unity para RUM, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de RUM Unity][2]. Aprende a configurar [OpenTelemetry con RUM Unity](#opentelemetry-setup).

### Opciones avanzadas de inicialización

`Custom Endpoint`
: opcional<br/>
**Tipo**: cadena<br/>
**Predeterminado**: `true`<br/>
Enviar datos a un endpoint personalizado en lugar del endpoint por defecto de Datadog. Esto es útil para enviar datos a través de un servidor personalizado.

`SDK Verbosity`
: opcional<br/>
**Tipo**: Enum<br/>
**Predeterminado**: `Warn`<br/>
El nivel de información de depuración que el SDK de Datadog debe mostrar. Los niveles más altos mostrarán más información. Esta opción es útil para obtener información de depuración del SDK cuando algo no funciona como se esperaba, o para eliminar las entradas de depuración relacionadas con el SDK de los logs de consola.

`Telemetry Sample Rate`
: opcional<br/>
**Tipo**: doble<br/>
**Predeterminado**: `20`
La tase porcentual a la que Datadog envía datos de telemetría interna. Un valor de 100 significa que todos los datos de telemetría se muestrean y se envían a Datadog.

### Rastreo automático de vistas

Si seleccionas `Enable Automatic Scene Tracking`, Datadog se engancha a `SceneManager` de Unity para detectar carga y descarga de escenas, e inicia vistas de RUM apropiadamente. Si estás usando métodos para moverte entre escenas diferentes a `SceneManager`, o te gustaría rastrear cambios en vistas que ocurren sin `SceneManager`, necesitas rastrear vistas manualmente usando `DdRum.StartView` y `DdRum.StopView`.

### Rastreo de las acciones de los usuarios

Puedes realizar un rastreo de acciones específicas de los usuarios, como toques, clics y desplazamientos, utilizando `DdRum.AddAction`.

Para registrar manualmente acciones de RUM instantáneas como `RumActionType.Tap`, utiliza `DdRum.AddAction()`. Para acciones de RUM continuas como `RumActionType.Scroll`, utiliza `DdRum.StartAction()` o `DdRum.StopAction()`.

Por ejemplo:

```cs
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName,
    );
}
```

Al utilizar `DdRum.StartAction` y `DdRum.StopAction`, la acción `type` debe ser la misma para que el SDK de Unity Datadog haga coincidir el inicio de una acción con su finalización.

### Recursos de rastreo

Datadog proporciona `DatadogTrackedWebRequest` como sustituto de `UnityWebRequest` para permitir el rastreo de recursos y llamadas HTTP desde tus vistas de RUM.

Puedes utilizarlo del mismo modo que cualquier otra `UnityWebRequest`:

```cs
var request = DatadogTrackedWebRequest.Get("https://httpbin.org/headers");
yield return request.SendWebRequest();

Debug.Log("Got result: " + request.downloadHandler.text);
```

### Rastreo de recursos personalizados

Además de rastrear recursos automáticamente con `DatadogTrackedWebRequest, puedes rastrear recursos personalizados específicos como las solicitudes de red o las APIs de proveedores de terceros con los métodos siguientes:

- `DdRum.StartResource`
- `DdRum.StopResource`
- `DdRum.StopResourceWithError`
- `DdRum.StopResourceWithErrorInfo`

Por ejemplo:

```cs
// in your network client:

DatadogSdk.Instance.Rum.startResource(
    "resource-key",
    RumHttpMethod.Get,
    url,
);

// Later

DatadogSdk.Instance.Rum.stopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

La `string` utilizada para `resourceKey` en ambas llamadas debe ser única para el recurso que está llamando para que el SDK de Unity Datadog pueda hacer coincidir el inicio de un recurso con su finalización.

### Rastreo de errores personalizados

Para realizar un rastreo de errores específicos, notifica a `DdRum` cuando se produzca un error con el mensaje, la fuente, la excepción y los atributos adicionales.

```cs
DatadogSdk.Instance.Rum.AddError("This is an error message.");
```

## Rastrear atributos globales personalizados

Además de los [atributos RUM predeterminados][3] capturados por el SDK de Unity Datadog automáticamente, puedes optar por añadir información contextual adicional (como atributos personalizados) a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog.

Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la cronología de la sesión, los logs de error y el estado de la red).

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, utiliza `DdRum.AddAttribute`.

* Para añadir o actualizar un atributo, utiliza `DdRum.AddAttribute`.
* Para extraer la llave, utiliza `DdRum.RemoveAttribute`.

### Rastreo de las sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:

* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" style="width:90%" >}}

Los siguientes atributos son **opcionales**, proporciona **al menos** uno de ellos:

| Atributo | Tipo   | Descripción                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Identificador de usuario único.                                                                                  |
| `usr.name`  | Cadena | Nombre descriptivo, que se muestra por defecto en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

Para identificar las sesiones de usuario, utiliza `DatadogSdk.SetUserInfo`.

Por ejemplo:

```cs
DatadogSdk.Instance.SetUserInfo("1234", "John Doe", "john@doe.com");
```

### Añadir atributos de usuario personalizados

Puedes añadir atributos personalizados a tu sesión de usuario. Esta información adicional se aplica automáticamente a logs, trazas y eventos de RUM.

Para eliminar un atributo existente, configúralo en `null`.

Por ejemplo:

```cs
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

## Borrar todos los datos

Utiliza `ClearAllData` para borrar todos los datos que no se hayan enviado a Datadog.

```cs
DatadogSdk.instance.ClearAllData();
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/unity/setup/
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/unity/data_collected/