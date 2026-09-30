---
aliases:
- /es/real_user_monitoring/error_tracking/maui
- /es/error_tracking/frontend/mobile/maui/
code_lang: maui
code_lang_weight: 55
description: Configure Error Tracking para sus aplicaciones .NET MAUI.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Comience con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualice los datos de Error Tracking en el Explorador
title: Informes de fallos y Error Tracking de .NET MAUI
type: multi-code-lang
---
## Descripción general {#overview}

Error Tracking procesa los errores recopilados del SDK de .NET MAUI.

Habilite los informes de fallos y Error Tracking de .NET MAUI para obtener informes de fallos completos, trazas de pila nativas de iOS simbolizadas y tendencias de errores en iOS y Android. Sus informes de fallos aparecen en [{{< ui >}}Error Tracking{{< /ui >}}][1].

### Error Tracking de C# {#c-error-tracking}

El Error Tracking de C# se habilita automáticamente tan pronto como se habilita RUM — no se requiere configuración adicional. El SDK captura:

- Excepciones de C# no controladas (`AppDomain.UnhandledException`)
- Excepciones de tareas no observadas (`TaskScheduler.UnobservedTaskException`)

También puede informar manualmente un error con `DdRum.AddError`.

### Crash Reporting nativo (opcional) {#native-crash-reporting-optional}

`NativeCrashReportEnabled` **solo** es necesario si también desea capturar fallos que se originan en código nativo de iOS o Android; por ejemplo, un fallo de Objective-C/Swift en iOS, o un fallo de JNI/Kotlin en Android. El Error Tracking de C# funciona sin él.

Para habilitar Crash Reporting nativo, establezca `NativeCrashReportEnabled = true` en la configuración del SDK:

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

{% alert level="info" %}
Cuando `NativeCrashReportEnabled = true`, una excepción de C# no controlada que bloquea la aplicación se informa **dos veces**: una vez como un error de C# capturado por `AppDomain.UnhandledException`, y otra vez como un fallo nativo de iOS o Android capturado por el crash reporter de la plataforma. Ambos eventos comparten la misma sesión y vista de RUM, por lo que puede correlacionarlos en el Explorador.

Si desea conservar solo una de las dos, utilice [`ErrorEventMapper`][5] para descartar la copia que no se ajuste a su flujo de trabajo (por ejemplo, filtre por contenido de `Source` o `Stacktrace`).
{% /alert %}

## Configuración {#setup}

Si aún no ha configurado el SDK de .NET MAUI, siga las [instrucciones de configuración en la aplicación][2] o consulte la [documentación de configuración de .NET MAUI][3].

## Obtenga trazas de pila simbolizadas {#get-symbolicated-stack-traces}

Para resolver nombres de métodos y direcciones de bloqueo en informes de fallos nativos de iOS, cargue el paquete `.dSYM` de su aplicación en Datadog. La simbolización ocurre en el servidor en cada evento de fallo.

| Tipo de traza de pila | Archivo de símbolos | Cómo se resuelve |
|---|---|---|
| Bloqueos nativos de iOS (y nombres de métodos C# compilados por AOT) | `.dSYM` paquete | Cargado en Datadog, resuelto en el servidor en cada evento de fallo |

El paquete `.dSYM` de iOS es el único archivo de símbolos que carga el SDK. Los archivos de asignación de Android R8/ProGuard y los archivos PDB portátiles no se cargan; consulte [Limitaciones](#limitations).

### Cargue símbolos con `datadog-ci` {#upload-symbols-with-datadog-ci}

El paquete NuGet `Datadog.Maui` incluye un destino de MSBuild que carga símbolos en Datadog automáticamente como parte de `dotnet publish`. Para habilitarlo:

#### 1. Instale `datadog-ci` {#1-install-datadog-ci}

```bash
npm install -g @datadog/datadog-ci
```

Verifique la instalación con `datadog-ci version`.

#### 2. Configure su clave de API de Datadog {#2-set-your-datadog-api-key}

Exporte la clave en el shell que ejecuta `dotnet publish`:

```bash
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
```

Para entornos de CI, configure `DATADOG_API_KEY` como una variable de entorno protegida/secreta en su ejecutor. No confirme la clave en el control de código fuente.

Para pruebas locales, puede pasar la clave como una propiedad de MSBuild (`-p:DatadogApiKey=...`), pero **no configure `DatadogApiKey` en su `.csproj`**; ese archivo está registrado.

#### 3. Habilite la carga {#3-enable-the-upload}

Establezca `DatadogUploadSymbols=true` ya sea como una entrada `<PropertyGroup>` en su `.csproj` o en la línea de comandos `dotnet publish`. Los objetivos de MSBuild se ejecutan automáticamente después de la publicación y se omiten silenciosamente si falta `datadog-ci` o si la clave de API no está establecida.

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true
```

El paquete `.dSYM` generado junto al `.app` se carga. Los dSYM solo se producen para compilaciones de dispositivos (`-r ios-arm64`); las compilaciones de simulador (`iossimulator-arm64`) omiten la carga.

### Configuración {#configuration}

Toda la configuración se realiza a través de propiedades de MSBuild, ya sea en su `.csproj` `<PropertyGroup>` o en la línea de comandos `dotnet publish` con `-p:`.

| Propiedad | Requerido | Predeterminado | Descripción |
|---|---|---|---|
| `DatadogUploadSymbols` | Sí | `false` | Establecer en `true` para habilitar la carga de símbolos después de la publicación. |
| `DatadogServiceName` | No | `$(AssemblyName)` | Nombre del servicio utilizado para identificar su aplicación en Datadog. Debe coincidir con el `Service` que pasa a `DdSdkConfiguration` en tiempo de ejecución. |
| `DatadogSite` | No | `datadoghq.com` | El sitio de Datadog que recibe la carga (por ejemplo, `datadoghq.eu`, `us5.datadoghq.com`). Debe coincidir con el valor `Site` establecido en `DdSdkConfiguration`. |
| `DatadogApiKey` | No | — | Clave de API pasada directamente. Si no se establece, se utiliza la variable de entorno `DATADOG_API_KEY` en su lugar. |

```xml
<PropertyGroup>
  <DatadogServiceName>my-maui-app</DatadogServiceName>
  <DatadogSite>datadoghq.eu</DatadogSite>
</PropertyGroup>
```

El registrador de terminal que `dotnet publish` utiliza de forma predeterminada oculta la salida informativa. Para ver los mensajes de carga de Datadog, agregue `-v n -tl:off`:

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

Después de la carga, los símbolos tardan hasta 5 minutos en procesarse. Puede confirmar que fueron recibidos en [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Limitaciones {#limitations}

### Trazas de pila administradas de C# {#managed-c-stack-traces}

Las trazas de pila de excepciones de C# administradas se resuelven únicamente en nombres de métodos. Los nombres de archivo y los números de línea aún no están disponibles.

Las compilaciones de lanzamiento de .NET MAUI compilan C# mediante AOT antes de la distribución, por lo que el tiempo de ejecución en el dispositivo no puede asignar un marco a una ubicación de fuente.
- En iOS, el tiempo de ejecución mínimo no puede leer archivos PDB portátiles en absoluto. 
- En Android, los marcos compilados mediante AOT informan `Unknown Source`. 
La resolución de estos marcos requiere combinar el PDB portátil de su aplicación (`.pdb`) con la información de depuración nativa de la plataforma en el lado del servidor, lo cual no es compatible. Los archivos PDB portátiles no se cargan en Datadog, y agruparlos en la aplicación no agrega información de archivo ni de línea a las trazas de pila reportadas.

### Carga de símbolos de Android {#android-symbol-upload}

La carga de símbolos no es compatible con las compilaciones de Android. Los archivos R8/ProGuard `mapping.txt` no se cargan, por lo que los marcos ofuscados de Java/Kotlin en los informes de fallos de Android no se desofuscan. Los fallos de Android se siguen recopilando e informando; solo el paso de desofuscación no está disponible.

### Tamaño de archivo {#file-sizing}

Los paquetes dSYM (iOS) pueden llegar a pesar hasta **2 GB** cada uno.

### Recopilación {#collection}

El SDK maneja los informes de fallos con los siguientes comportamientos:

- Los fallos solo se pueden detectar después de que el SDK se haya inicializado. Inicialice el SDK lo antes posible en `MauiProgram.CreateMauiApp`.
- Los fallos de RUM deben estar adjuntos a una vista de RUM. Si ocurre un fallo antes de que una vista sea visible (o después de que el usuario haya movido la aplicación a segundo plano), el fallo se silencia y no se informa. Para mitigar esto, configure `TrackBackgroundEvents = true` en `DdRumConfiguration`.
- Solo se conservan los fallos que ocurren en sesiones muestreadas.

### Símbolos de fallos de Android NDK {#android-ndk-crash-symbols}

Cuando `NativeCrashReportEnabled = true`, los fallos nativos (C/C++) capturados por `dd-sdk-android-ndk` requieren archivos `.so` sin eliminar para la simbolización.

En una aplicación MAUI, los archivos nativos `.so` provienen normalmente del tiempo de ejecución de .NET (`libmonosgen-2.0.so`, `libmonodroid.so`) y de la propia biblioteca NDK de Datadog; Datadog los resuelve del lado del servidor; no se necesita carga manual para ninguno de los dos. Si distribuye bibliotecas nativas C/C++ personalizadas, cargue sus símbolos manualmente con `datadog-ci dsyms upload <path-to-so-directory>`.

## Pruebe su implementación {#test-your-implementation}

Para verificar su configuración de Crash Reporting y Error Tracking, provoque un fallo y confirme que el error aparece en Datadog:

1. Ejecute su aplicación en un dispositivo real o emulador (los dSYM solo se generan para compilaciones de dispositivo en iOS).
2. Ejecute código que genere una excepción no controlada. Por ejemplo:

   ```csharp
   void OnButtonClicked(object sender, EventArgs e)
   {
       throw new InvalidOperationException("Crash the app");
   }
   ```

3. Después del fallo, reinicie su aplicación y espere a que el SDK cargue el informe de fallo.
4. Confirme el evento en [{{< ui >}}Error Tracking{{< /ui >}}][1]. Para un bloqueo nativo de iOS desde una compilación de dispositivo, los marcos se simbolizan.

## Solución de problemas {#troubleshooting}

**`Skipping symbol upload — datadog-ci is not installed`**
Ejecute `npm install -g @datadog/datadog-ci` y verifique con `datadog-ci version`.

**`Skipping symbol upload — DATADOG_API_KEY is not set`**
Exporte la clave en su shell: `export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>`. Verifique con `echo $DATADOG_API_KEY`.

**`Skipping dSYM upload — file not found`**
Los dSYM solo se generan para compilaciones de dispositivo (`-r ios-arm64`). Las compilaciones del simulador no generan dSYMs.

**No se ve ninguna salida de Datadog durante la publicación**
El registrador de la terminal oculta los mensajes informativos. Agregue `-v n -tl:off` a su comando `dotnet publish`.

**La carga se completa pero los símbolos no aparecen en Datadog**
Los símbolos pueden tardar hasta 5 minutos en procesarse. Verifique [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/application_monitoring/maui/setup
[4]: https://app.datadoghq.com/source-code/setup/symbols
[5]: /es/real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events