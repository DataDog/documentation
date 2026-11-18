---
description: Solucione problemas comunes de Synthetic Monitoring.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Administre sus pruebas Synthetic
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configure una prueba de navegador
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configure una prueba de API
- link: /synthetics/private_locations/
  tag: Documentación
  text: Cree una ubicación privada
title: Solución de problemas de Synthetic Monitoring
---
## Descripción general {#overview}

Utilice esta página para solucionar problemas comunes con la configuración de Datadog Synthetic Monitoring. Para obtener más asistencia, comuníquese con [Datadog Support][1].

## Mensajes de error comunes {#common-error-messages}

Utilice esta tabla para encontrar pasos de solución de problemas para errores comunes.

| Mensaje de error                                  | Ver sección |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [Ubicaciones privadas → Certificados](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [Pruebas de API y de navegador → No autorizado](#api-and-browser-tests) |
| `Element not found`                            | [Ejecución de la prueba → Problemas de selección de elementos](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [Ubicaciones privadas → Compatibilidad del navegador](?tab=common#requirements-for-browser-tests-running-on-private-location) |
| `Failed to load resource: ERR_INVALID_ARGUMENT` | [Ubicaciones privadas → Problema con Chrome 149](?tab=common#chrome-149-issue-on-private-locations) |


## Pruebas de API {#api-tests}

### Los tiempos de red son variados {#network-timings-are-varied}

Si observa un aumento repentino o un incremento general en las [métricas de tiempo][2] de su prueba de API, esto generalmente indica un cuello de botella o un retraso en la solicitud. Para obtener más información, consulte [Tiempos y variaciones de las pruebas de API][3].

## Pruebas de navegador {#browser-tests}

### Grabación {#recording}

#### El sitio web no está cargando en el iframe {#the-website-is-not-loading-in-the-iframe}

Si su sitio web no aparece en el iframe de la grabadora de pruebas de navegador después de instalar la [extensión de Datadog][4], es posible que vea el mensaje `Your website does not support being loaded through an iframe`. Esto indica que la configuración de seguridad de su aplicación, como la Content Security Policy (CSP) o encabezados de seguridad relacionados como `X-Frame-Options`, impiden la carga del iframe.

De manera similar, si los intentos de inicio de sesión fallan durante la grabación en el iframe, es posible que su aplicación esté bloqueando ciertas solicitudes debido a reglas de CSP u otras configuraciones de seguridad. En algunos casos, los errores de inicio de sesión también pueden ser causados por un problema con el token CSRF cuando el flujo de inicio de sesión se origina desde una aplicación web cargada dentro de un iframe, lo que puede provocar que el token CSRF se elimine.

**Solución**: Haga clic en {{< ui >}}Open in Popup{{< /ui >}} para grabar su recorrido de usuario en una ventana separada en lugar del iframe.  

#### Solo ciertas aplicaciones cargan en el iframe {#only-certain-applications-load-in-the-iframe}

Diferentes aplicaciones y entornos tienen configuraciones de CSP y otras restricciones de seguridad variables. Algunas permiten la carga en iframe, mientras que otras la bloquean por motivos de seguridad.

**Solución**: Haga clic en {{< ui >}}Open in Popup{{< /ui >}} para grabar su recorrido de usuario en una ventana separada en lugar del iframe.

#### Aparece un banner de advertencia de solicitudes HTTP en el iframe {#http-requests-warning-banner-appears-in-iframe}

Esta advertencia aparece al intentar grabar en una página `http`. El iframe de la grabadora solo admite páginas `https`.

**Solución**: Abra su página en una ventana emergente o cambie su URL para usar `https`. 

#### El sitio web no carga y la grabación no funciona en el iframe ni en la ventana emergente {#website-fails-to-load-and-recording-doesnt-work-in-iframe-or-pop-up}

Si su sitio web no aparece en el iframe de la grabadora de pruebas de navegador después de instalar la [extensión de Datadog][4], y la grabación falla tanto en el modo iframe como en el de ventana emergente:

   {{< img src="synthetics/recording_iframe.mp4" alt="Problemas al grabar pasos de pruebas de navegador" video="true" width="100%" >}}

   **Solución**: Verifique que la [extensión de Datadog][5] tenga los permisos adecuados especificando su sitio web en la sección `On specific sites` o habilitando `On all sites`:

   {{< img src="synthetics/extension.mp4" alt="Permitir que la extensión lea datos en todos los sitios" video="true" width="100%" >}}

#### La grabación de pasos falla en la aplicación {#recording-steps-fails-on-application}

Las políticas del navegador Chrome pueden impedir que la extensión grabe correctamente.

**Solución**: Verifique `chrome://policy` para ver la configuración relacionada con la extensión, como [`ExtensionSettings`][6], que podría estar bloqueando la grabadora.

#### La página de inicio de sesión no es visible en la grabadora {#login-page-not-visible-in-recorder}

El iframe/ventana emergente de la grabadora utiliza su sesión de navegador actual de forma predeterminada. Si ya ha iniciado sesión en su aplicación, es posible que se salte la página de inicio de sesión y vaya directamente a la vista posterior al inicio de sesión, lo que le impide grabar los pasos de autenticación.

**Solución**: Utilice {{< ui >}}incognito mode{{< /ui >}} de la grabadora para grabar los pasos de inicio de sesión sin cerrar su sesión actual:

{{< img src="synthetics/incognito_mode.mp4" alt="Uso de pruebas de navegador en modo incógnito" video="true" width="100%" >}}

{{< ui >}}Incognito mode{{< /ui >}} crea una sesión aislada que ignora su historial de navegación, cookies y datos de inicio de sesión. Esto le permite grabar los pasos de inicio de sesión desde cero, como si visitara su sitio web por primera vez.

### Resultados de la prueba {#test-results}

#### Las pruebas de navegador en móviles y tabletas fallan constantemente {#mobile-and-tablet-browser-tests-consistently-fail}

Los sitios web **responsivos** pueden tener estructuras DOM significativamente diferentes entre dispositivos. El DOM de un sitio web en {{< ui >}}Laptop Large{{< /ui >}} puede diferir mucho del que se muestra en los viewports {{< ui >}}Tablet{{< /ui >}} o {{< ui >}}Mobile Small{{< /ui >}}.

Los pasos grabados en {{< ui >}}Laptop Large{{< /ui >}} pueden no funcionar en viewports más pequeños, lo que provoca que las pruebas en móviles y tabletas fallen:

{{< img src="synthetics/device_failures.png" alt="Falla en dispositivo móvil o tableta" style="width:100%;" >}}

**Solución**: Cree pruebas específicas para cada dispositivo donde los pasos grabados coincidan con el viewport de destino.

Para grabar en viewports de móvil o tableta, seleccione {{< ui >}}Mobile Small{{< /ui >}} o {{< ui >}}Tablet{{< /ui >}} en el menú desplegable de la grabadora antes de hacer clic en {{< ui >}}Start Recording{{< /ui >}}.

{{< img src="synthetics/record_device.png" alt="Grabación de pasos en móvil o tableta" style="width:100%;" >}}

**Nota**: Las pruebas de navegador se ejecutan en modo **headless** y no admiten ciertas funciones como los eventos `touch` para la detección de diseño móvil.

#### Advertencia de detección de elementos en los pasos de la prueba de navegador {#element-detection-warning-in-browser-test-steps}

Los pasos de la prueba de navegador pueden mostrar una advertencia `None or multiple elements detected`:

{{< img src="synthetics/step_warning.png" alt="Advertencia de paso de localizador de usuario" style="width:100%;" >}}

Esto indica que el localizador de usuario apunta a múltiples elementos o a ninguno, lo que impide que la prueba sepa con qué elemento interactuar.

**Solución**: Edite su grabación, abra las opciones avanzadas del paso problemático, navegue a la página de prueba y haga clic en {{< ui >}}Test{{< /ui >}}. Esto resalta el elemento localizado o muestra un error. Ajuste su localizador de usuario para apuntar a un único elemento exclusivo:

{{< img src="synthetics/fix_user_locator.mp4" alt="Corrección del error de localizador de usuario" video="true" width="100%" >}}

#### Limitaciones de la propiedad de puntero CSS {#css-pointer-property-limitations}

Los navegadores automatizados no pueden emular la característica de medios CSS `pointer`. Todas las pruebas de navegador utilizan `pointer: none` independientemente del tipo de dispositivo (computadora portátil, tableta o móvil).

### Duración del recurso {#resource-duration}

#### La duración del recurso excede la duración del paso {#resource-duration-exceeds-step-duration}

Los recursos con tiempos de carga prolongados pueden abarcar varios pasos de la prueba. Datadog devuelve todos los recursos iniciados durante un paso específico, pero permite aproximadamente 20 segundos para que las llamadas de red críticas se completen antes de proceder al siguiente paso.

El worker de synthetics utiliza tiempos de espera jerárquicos para equilibrar la velocidad y la confiabilidad. Por lo tanto, [duración del paso][14] no debe utilizarse para medir el rendimiento de la aplicación web, ya que refleja el tiempo necesario para una ejecución confiable de la prueba.

## Pruebas de API y pruebas de navegador {#api-and-browser-tests}

### Errores de acceso no autorizado {#unauthorized-errors}

Un error 401 en las pruebas de Synthetic Monitoring generalmente indica un fallo de autenticación. Utilice el mismo método de autenticación (fuera de Datadog) que usa normalmente para el punto de conexión y replíquelo en la configuración de su prueba Synthetic.

* ¿Su punto de conexión utiliza **autenticación basada en encabezados**?
  * **Autenticación básica**: Especifique las credenciales asociadas en el {{< ui >}}Advanced options{{< /ui >}} de su [HTTP][7] o [Prueba de navegador][8].
  * **Autenticación basada en tokens**: Extraiga su token con una primera [prueba HTTP][7], cree una [variable global][9] mediante el parseo de la respuesta de esa primera prueba y vuelva a inyectar esa variable en una segunda [prueba HTTP][7] o [prueba de navegador][10] que requiera el token de autenticación.
  * **Autenticación basada en sesiones**: Agregue los encabezados o cookies requeridos en el {{< ui >}}Advanced options{{< /ui >}} de su [HTTP][7] o [Browser Test][8].
  
* ¿Su punto de conexión utiliza **autenticación basada en parámetros de consulta** (como agregar una clave de API a los parámetros de la URL)?

* ¿Su punto de conexión utiliza **autenticación basada en IP**? Si es así, permita los [rangos de IP de Synthetic Monitoring][11] en su firewall o configuración de seguridad.

### Errores de acceso prohibido {#forbidden-errors}

Un error `403 Forbidden` de una prueba de Synthetic Monitoring generalmente significa que su servidor web o firewall está bloqueando el tráfico de Synthetic. Permita los [rangos de IP de Synthetic Monitoring][11] e identifique las solicitudes de Synthetic mediante su encabezado `user-agent`: `Datadog/Synthetics` para pruebas de API, o un valor que termine en `DatadogSynthetics` para pruebas de navegador. Las pruebas de Synthetic ya no envían el encabezado `Sec-Datadog`, así que actualice cualquier lista de permitidos que dependa de él. Para otros identificadores, consulte [Identificar bots de Synthetic][18].

### Notificaciones faltantes {#missing-notifications}

Las pruebas de Synthetic no [reenvían notificaciones][12] de forma predeterminada. Si agrega destinatarios de notificaciones (direcciones de correo electrónico o identificadores de Slack) después de que ocurra una transición de estado (como que una prueba entre en alerta o se recupere), no se enviará ninguna notificación para esa transición. Las notificaciones solo se envían para transiciones posteriores.

## Pruebas móviles {#mobile-tests}

### No se puede iniciar una grabación de dispositivo {#unable-to-launch-a-device-recording}

Las aplicaciones con verificaciones de seguridad de inicio (como la verificación de depuración USB) pueden impedir la grabación. Cargue una versión de su aplicación sin estas comprobaciones de seguridad para una grabación de prueba óptima. 

### Problemas de funcionalidad de la aplicación durante la grabación y ejecución {#app-functionality-issues-during-recording-and-execution}

Es posible que las funciones de la aplicación iOS no funcionen correctamente durante la grabación o ejecución debido al proceso de volver a firmar la aplicación. Este proceso, necesario para establecer la confianza del dispositivo, puede eliminar derechos esenciales de iOS (Contacts, Camera, Keychain, Photos, Health Kit, Home Kit, etc.).

**Solución**: Utilice perfiles de aprovisionamiento Ad Hoc o de desarrollo al distribuir su aplicación iOS para minimizar los problemas relacionados con los derechos y mejorar la compatibilidad.

## Pruebas de Network Path {#network-path-tests}

### Datadog Agent no aparece como opción en Locations & Agents {#datadog-agent-not-listed-as-an-option-in-locations-agents}

Si no ve el Datadog Agent listado como una opción seleccionable durante la creación de la prueba, verifique que cumple con todos los requisitos previos y completó los pasos de configuración. Consulte [Configuración del Agent][16] para obtener más información.

### Las pruebas programadas desde el Datadog Agent no se ejecutan en el horario previsto {#scheduled-tests-from-the-datadog-agent-is-not-running-at-the-expected-schedule}

En entornos grandes o de alto volumen, es posible que las pruebas programadas no se ejecuten en los intervalos previstos si el Datadog Agent no tiene suficientes trabajadores para gestionar las ejecuciones simultáneas. Para optimizar el rendimiento y mantener una programación coherente, [aumente el número de trabajadores][17] para cumplir o superar el número total de pruebas asignadas al Agent.

### Faltan resultados de pruebas ejecutadas desde el Datadog Agent {#missing-test-results-executed-from-the-datadog-agent}

Si no ve los resultados de las pruebas en la interfaz de usuario de Datadog, el Datadog Agent no está enviando los resultados de las pruebas a la ingesta de Synthetics (https://http-synthetics.datadoghq.com) que procesa los resultados de las pruebas. Verifique que el tráfico de red saliente desde el Datadog Agent hacia esta ingesta esté permitido.

Si el Datadog Agent se ejecuta detrás de un proxy, asegúrese de que el reenviador de Synthetics esté configurado para enviar tráfico a través del proxy, por ejemplo:

```
synthetics: 
  collector: 
    enabled: true
synthetics.forwarder.dd_url: http://my-proxy.com:<proxy-port>
```
Además, asegúrese de que el propio proxy esté configurado para permitir el tráfico de red saliente hacia la ingesta de Synthetics.

## Ubicaciones privadas {#private-locations}

{{< tabs >}}
{{% tab "Común" %}}

### Private Location no puede obtener pruebas debido a un error 403 {#private-location-unable-to-fetch-tests-due-to-403-error}

Una Private Location muestra este error cuando intenta obtener pruebas de Datadog:

```
Queue error - onFetchMessagesLongPolling - Got 403 in request - {"errors":["Expired/not yet valid signature"]}
Error: Got 403 in request - {"errors":["Expired/not yet valid signature"]}
    at Function.QueueError.fromHTTPError (dist/build/index.js:259354:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:258914:48)
```

**Causa**: El registro muestra que la Private Location pudo comunicarse exitosamente con la ingesta de Synthetics para obtener pruebas, pero la solicitud falló con una respuesta 403 de Datadog debido a un problema de autenticación. Específicamente, la firma de la solicitud se consideró caducada o aún no válida. La comunicación entre la Private Location y Datadog está asegurada mediante Datadog Signature v1 (basada en el mismo proceso de firma que [AWS Signature v4][105]), la cual incluye una marca de tiempo en cada solicitud, garantizando tanto la autenticación como la integridad. Si el reloj del sistema en el servidor que aloja la Private Location no está sincronizado, la marca de tiempo puede quedar fuera del intervalo permitido y la validación de la firma fallará.

**Solución**: Asegúrese de que el servidor que aloja la Private Location tenga una sincronización de tiempo precisa. Si se utilizan servicios NTP (Network Time Protocol), verifique que estos servicios estén configurados correctamente y funcionen adecuadamente, y solucione cualquier configuración incorrecta que pueda impedir que el reloj del sistema se sincronice con sus fuentes de tiempo.

### Las pruebas de navegador muestran `Page crashed` errores {#browser-tests-show-page-crashed-errors}

Los bloqueos de página generalmente indican agotamiento de recursos en los workers de la ubicación privada. Asegúrese de que sus workers de la ubicación privada tengan [suficientes recursos de memoria][101].

### La ejecución de la prueba es más lenta de lo esperado {#test-execution-is-slower-than-expected}

La ejecución lenta de las pruebas generalmente indica agotamiento de recursos en los workers de la ubicación privada. Asegúrese de que sus workers de la ubicación privada tengan [suficientes recursos de CPU][103].

### Mis pruebas de navegador tardan demasiado en ejecutarse {#my-browser-tests-are-taking-too-long-to-run}

Confirme que no está viendo [problemas de falta de memoria][102] con sus implementaciones de ubicaciones privadas. Si ya ha intentado escalar sus instancias de workers siguiendo las [pautas de dimensionamiento][101], comuníquese con [Datadog Support][104].

### Requisitos para pruebas de navegador que se ejecutan en una ubicación privada {#requirements-for-browser-tests-running-on-private-location}

Las pruebas de navegador requieren privilegios elevados para iniciar (cuando comienza la ejecución de la prueba) y finalizar (cuando termina la ejecución de la prueba) el proceso del navegador. Si su ubicación privada está configurada con un contexto de seguridad que restringe los privilegios elevados, la ubicación privada emite registros de error cuando se ejecuta el Browser Test. Los registros reportados varían según el navegador seleccionado para la ejecución de la prueba. Las pruebas ejecutadas en Chrome/Edge reportan el siguiente error:

```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

**Error de Firefox:**

```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### Requisitos para las pruebas ICMP que se ejecutan en la ubicación privada {#requirements-for-icmp-tests-running-on-private-location}

Las pruebas ICMP utilizan el comando `ping` para evaluar las rutas de red y la conectividad del servidor. El comando `ping` abre sockets sin procesar para enviar paquetes ICMP y requiere la capacidad `NET_RAW`. Si el contexto de seguridad de su contenedor elimina esta capacidad, las pruebas ICMP no funcionan correctamente en la ubicación privada.

Además, `ping` requiere privilegios elevados para crear el socket sin procesar. La ubicación privada no puede ejecutar pruebas ICMP si la ubicación privada está configurada con un contexto de seguridad que restringe los privilegios elevados.

### `TIMEOUT` errores en pruebas de API desde ubicaciones privadas {#timeout-errors-in-api-tests-from-private-locations}

Los errores `TIMEOUT` generalmente indican que su ubicación privada no puede acceder al punto de conexión de la prueba. Verifique que la ubicación privada esté instalada en la misma red que su punto de conexión de destino. Pruebe diferentes puntos de conexión para determinar si el problema es específico de un punto de conexión o afecta a toda la red.

{{< img src="synthetics/timeout.png" alt="La prueba de API en una ubicación privada agota el tiempo de espera" style="width:70%;" >}}

### Problema de Chrome 149 en ubicaciones privadas {#chrome-149-issue-on-private-locations}

La versión 149 de Chrome introdujo una validación más estricta para los encabezados de solicitud, lo que puede causar que las solicitudes de subrecursos fallen con `net::ERR_INVALID_ARGUMENT`. Las versiones anteriores de Chrome eran más permisivas.

**Solución**: Actualice su ubicación privada a [versión 1.69.1 o posterior][106] para resolver este problema.

[101]: /es/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /es/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /es/help/
[105]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[106]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "Docker" %}}

### Resolución de problemas de reenvío de IPv4 para containers de ubicación privada {#resolving-ipv4-forwarding-issues-for-private-location-containers}

Las ubicaciones privadas requieren acceso a los [puntos de conexión de ingesta de Synthetic Monitoring de Datadog][103] para extraer las configuraciones de prueba y enviar los resultados de las pruebas. Si el reenvío de IPv4 está deshabilitado en un servidor Linux, la ubicación privada puede perder el acceso a la internet pública y, por consiguiente, no puede conectarse a la ingesta. Docker normalmente intenta habilitar el reenvío de IP cuando se inicia un contenedor, pero si permanece deshabilitado, entonces el contenedor no puede comunicarse con servicios externos como la ingesta. 

Si este es el caso, la ubicación privada informa lo siguiente:

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
y

```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**Solución**: Asegúrese de que `net.ipv4.ip_forward` esté habilitado en el servidor. 

### Requisitos del sistema de archivos raíz de solo lectura para containers de ubicación privada {#read-only-root-file-system-requirements-for-private-location-containers}

Los containers de ubicación privada necesitan acceso de lectura y escritura a carpetas y archivos específicos para un funcionamiento correcto. Los sistemas de archivos raíz de solo lectura impiden el inicio debido a operaciones críticas que requieren acceso de escritura.

Durante el inicio, los containers establecen capacidades de Linux en binarios cuyos metadatos se eliminaron durante el proceso de compilación por seguridad. Esto restringe la ejecución al usuario `root` de forma predeterminada. Dado que las ubicaciones privadas se ejecutan como el usuario `dog`, los containers deben volver a aplicar los permisos para una ejecución correcta. Los sistemas de archivos de solo lectura impiden estas actualizaciones de permisos, lo que provoca fallos en el inicio.

### Containers de ubicación privada terminados por errores de `OOM` {#private-location-containers-killed-by-oom-errors}

Los containers de ubicación privada terminados por errores de `Out Of Memory` indican agotamiento de recursos en los workers. Asegúrese de que sus containers de ubicación privada tengan [suficientes recursos de memoria][101].

### `Invalid mount config` error al ejecutar ubicaciones privadas {#invalid-mount-config-error-when-running-private-locations}

Este error ocurre al intentar montar un solo archivo en containers basados en Windows, lo cual no es compatible. **Solución**: Asegúrese de que la fuente del montaje de enlace sea un directorio local. Para obtener más información, consulte la documentación de [montaje de volúmenes de Docker][102].

[101]: /es/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/es/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Reinicio del servicio Synthetics Private Location Worker {#restarting-synthetics-private-location-worker-service}

Asegúrese de que la ubicación privada se haya instalado con una configuración especificada en el momento de la instalación. Reinicie el servicio utilizando los métodos de la GUI o de PowerShell.

#### Método de GUI {#gui-method}

1. Busque {{< ui >}}Services{{< /ui >}} en el menú {{< ui >}}Start{{< /ui >}}.
1. Abra {{< ui >}}Services{{< /ui >}} (funciona en cualquier cuenta de usuario).
1. Encuentre `Datadog Synthetics Private Location` en {{< ui >}}Services (Local){{< /ui >}}.
1. Haga clic derecho en el servicio y seleccione {{< ui >}}Restart{{< /ui >}}.

El worker se ejecuta con la cuenta {{< ui >}}Local Service{{< /ui >}}. Verifique esto buscando el proceso `synthetics-pl-worker` en la pestaña {{< ui >}}Details{{< /ui >}} de Task Manager.

#### Método de PowerShell {#powershell-method}

1. Abra {{< ui >}}Windows PowerShell{{< /ui >}} con derechos de ejecución de scripts.
1. Ejecute: `Restart-Service -Name "Datadog Synthetics Private Location"`

### Mantenimiento del tiempo de actividad de Synthetics Private Location Worker {#maintaining-synthetics-private-location-worker-uptime}

**Requisitos previos**: Inicie sesión en la máquina con permisos para crear tareas programadas.

**Recuperación ante fallos**: Cree una tarea programada de Windows que ejecute un script de PowerShell para reiniciar el worker si deja de funcionar. Esto garantiza la recuperación automática después de fallos.

**Inicio automático**: Si proporcionó un archivo de configuración durante la instalación, el servicio de Windows `Datadog Synthetics Private Location` se inicia automáticamente. Verifique que el servicio se esté ejecutando en la herramienta {{< ui >}}Services{{< /ui >}}: este servicio maneja los reinicios automáticos.

### Errores de certificado autofirmado {#self-signed-certificate-errors}

Windows Private Locations pueden mostrar este error inmediatamente después del inicio:

```
Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain
    at Function.QueueError.fromHTTPError (dist/build/index.js:272629:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:272186:48)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at Worker.fetchMessagesLongPolling (dist/build/index.js:26244:24)
    at Worker.doOneLoop (dist/build/index.js:25810:45)
```

**Síntomas**:
- Los mensajes de error se repiten continuamente en los registros.
- Las cadenas de certificados parecen modificadas al navegar desde el servidor de Windows (por ejemplo, los sitios de Datadog muestran intermediarios autofirmados en lugar de CA de confianza).

**Causa**: Este error ocurre cuando se realiza una **Inspección profunda de paquetes (DPI)** o inspección TLS en el tráfico de su red. La DPI intercepta, descifra y vuelve a cifrar el tráfico SSL/TLS. Durante este proceso, la ubicación privada recibe una cadena de certificados que incluye un certificado autofirmado.  

**Solución**:

- Cargue sus [certificados raíz][101] autofirmados personalizados en su ubicación privada.
- Verifique que los registros de Windows Private Location ya no informen el error.

```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

Sin omitir la inspección TLS, Windows Private Location no puede recuperar los mensajes de prueba y permanece en estado de error.

[101]: /es/synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### Solicitudes de contraseña para el usuario sudo o dog {#password-prompts-for-sudo-or-dog-user}

El usuario de Private Location (`dog`) requiere acceso `sudo` para un funcionamiento correcto. Este usuario normalmente recibe permisos durante el inicio del contenedor. Verifique que ninguna política restrinja el acceso `sudo` del usuario `dog` o impida que el contenedor se ejecute como el usuario `dog` (UID 501).

Además, las versiones de Private Location `>v1.27` dependen de la llamada al sistema `clone3`. Los entornos de tiempo de ejecución de contenedores más antiguos (versiones de Docker <20.10.10) podrían no admitir `clone3` en su política `seccomp` predeterminada. 

**Solución**: Asegúrese de que la política `seccomp` de su tiempo de ejecución incluya `clone3` actualizando su versión de tiempo de ejecución, agregando manualmente `clone3` a su política o utilizando una política `unconfined` seccomp. Consulte la [documentación de Docker `seccomp`][13] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/synthetics/metrics/#api-tests
[3]: /es/synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /es/synthetics/api_tests/?tab=httptest#make-a-request
[8]: /es/synthetics/browser_tests/#test-details
[9]: /es/synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /es/synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /es/synthetics/api_tests/http_tests/?tab=requestoptions#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/
[14]: /es/synthetics/guide/step-duration
[16]: /es/synthetics/network_path_tests/#agent-configuration
[17]: /es/network_monitoring/network_path/setup/?tab=linux#increase-the-number-of-workers
[18]: /es/synthetics/guide/identify_synthetics_bots/