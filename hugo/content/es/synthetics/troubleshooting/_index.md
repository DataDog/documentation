---
description: Soluciona problemas comunes de Synthetic Monitoring.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Gestión de los tests de Synthetic
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configuración de un test de navegador
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configuración de un test de API
- link: /synthetics/private_locations/
  tag: Documentación
  text: Creación de una ubicación privada
title: Solución de problemas de Synthetic Monitoring
---

## Información general

Utiliza esta página para solucionar problemas frecuentes instalando y configurando Datadog Synthetic Monitoring. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia a Datadog][1].

## Mensajes de error frecuentes

Utiliza esta tabla para encontrar los pasos necesarios para solucionar los errores más frecuentes.

| Mensaje de error                                  | Ver sección |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [Ubicaciones privadas → Certificados](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [Tests de API y navegador → No autorizadas](#api-and-browser-tests) |
| `Element not found`                            | [Ejecución de tests → Problemas de selección de elementos](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [Ubicaciones privadas → Compatibilidad con navegadores](?tab=common#requirements-for-browser-tests-running-on-private-location) |


## Tests de API

### Los tiempos de red varían

Si observas un pico repentino o un aumento general en tus [métricas de tiempo][2] de tests de API, esto suele indicar un cuello de botella o un retraso en la solicitud. Para obtener más información, consulta [Tiempos y variaciones de tests de API][3].

## Tests de navegador

### Grabación

#### El sitio web no se carga en el iframe

Si tu sitio web no aparece en el iframe de la grabadora de tests de navegador después de instalar la [extensión Datadog][4], es posible que aparezca el mensaje `Your website does not support being loaded through an iframe`. Esto indica que la configuración de seguridad de su aplicación impide la carga del iframe.

Del mismo modo, si los intentos de inicio de sesión fallan durante la grabación del iframe, es posible que tu aplicación esté bloqueando ciertas solicitudes.

**Solución**: Haz clic en **Open in Popup** (Abrir en ventana emergente) para grabar el recorrido del usuario en una ventana independiente en lugar del iframe.

#### Solo algunas aplicaciones se cargan en el iframe

Las distintas aplicaciones y entornos tienen diferentes restricciones de seguridad. Algunos permiten la carga de iframes, mientras que otros la bloquean por motivos de seguridad.

#### El mensaje de advertencia de solicitudes HTTP aparece en el iframe

Esta advertencia aparece al intentar grabar en una página `http`. El iframe de la grabadora solo admite páginas `https`. **Solución**: Abre tu página en una ventana emergente o cambia tu URL para utilizar `https`.

#### El sitio web no se carga y la grabación no funciona en modo iframe o emergente

Si tu sitio web no aparece en el iframe de la grabadora de tests de navegador después de instalar la [extensión Datadog][4] y la grabación falla en los modos iframe y emergente:

   {{< img src="synthetics/recording_iframe.mp4" alt="Problemas de grabación de los pasos de tests de navegador" video="true" width="100%" >}}

   **Solución**: Comprueba que la [extensión Datadog][5] tiene los permisos adecuados especificando tu sitio web en la sección `On specific sites` o habilitando `On all sites`:

   {{< img src="synthetics/extension.mp4" alt="Permitir que la extensión lea datos en todos los sitios" video="true" width="100%" >}}

#### Fallan los pasos de grabación en la aplicación

Las políticas del navegador Chrome pueden impedir que la extensión grabe correctamente.

**Solución**: Comprueba en `chrome://policy` si hay ajustes relacionados con la extensión como [`ExtensionSettings`][6] que puedan estar bloqueando la grabadora.

#### La página de inicio de sesión no está visible en la grabadora

El iframe/emergente de la grabadora utiliza por defecto la sesión actual de tu navegador. Si ya has iniciado sesión en tu aplicación, es posible que omita la página de inicio de sesión y vaya directamente a la vista posterior al inicio de sesión, lo que te impedirá grabar los pasos de autenticación.

**Solución**: Utiliza el **modo incógnito** de la grabadora para grabar los pasos de inicio de sesión sin cerrar tu sesión actual:

{{< img src="synthetics/incognito_mode.mp4" alt="Utilizar el modo de incógnito en tests de navegador" video="true" width="100%" >}}

**El modo incógnito** crea una sesión aislada que ignora el historial, las cookies y los datos de inicio de sesión de tu navegador. Esto te permite grabar los pasos de inicio de sesión desde cero, como si visitaras tu sitio web por primera vez.

### Resultados de los tests

#### Los tests de navegador de dispositivos móviles y tabletas fallan sistemáticamente

Los sitios web **responsivos** pueden tener estructuras DOM significativamente diferentes entre dispositivos. El DOM de un sitio web en `Laptop Large` puede diferir enormemente de las ventanas gráficas de `Tablet` o `Mobile Small`.

Los pasos grabados en `Laptop Large` pueden no funcionar en ventanas gráficas más pequeñas, provocando fallos en tests de dispositivos móviles y tabletas:

{{< img src="synthetics/device_failures.png" alt="Dispositivo móvil-tableta experimenta fallos" style="width:100%;" >}}

**Solución**: Crea tests específicos para cada dispositivo en los que los pasos grabados coincidan con la ventana gráfica de destino.

Para grabar ventanas gráficas de dispositivos móviles o tabletas, selecciona `Mobile Small` o `Tablet` en el menú desplegable de la grabadora antes de hacer clic en **Start Recording** (Iniciar grabación).

{{< img src="synthetics/record_device.png" alt="Grabar pasos de dispositivo móvil-tableta" style="width:100%;" >}}

**Nota**: Los tests de navegador se ejecutan en modo **headless** y no son compatibles con ciertas características como los eventos `touch` para la detección del diseño móvil.

#### Aviso de detección de elementos en los pasos de tests de navegador

Los pasos de tests de navegador pueden mostrar una advertencia `None or multiple elements detected`:

{{< img src="synthetics/step_warning.png" alt="Advertencia de paso de localizador de usuario" style="width:100%;" >}}

Esto indica que el localizador del usuario apunta a varios elementos o a ninguno, lo que impide que el test sepa con qué elemento interactuar.

**Solución**: Edita tu grabación, abre las opciones avanzadas del paso problemático, ve a la página del test y haz clic en `Test`. Esta acción resalta el elemento localizado o muestra un error. Ajusta tu localizador de usuario para que apunte a un único elemento:

{{< img src="synthetics/fix_user_locator.mp4" alt="Corregir un error de localizador de usuario" video="true" width="100%" >}}

#### Limitaciones de la propiedad CSS pointer

Los navegadores automatizados no pueden emular la función multimedia CSS `pointer`. Todos los tests de navegador utilizan `pointer: none` independientemente del tipo de dispositivo (portátil, tableta o móvil).

### Duración de los recursos

#### La duración del recurso supera la duración del paso 

Los recursos con tiempos de carga prolongados pueden abarcar varios pasos de tests. Datadog devuelve todos los recursos iniciados durante un paso específico, pero concede aproximadamente 20 segundos para que se completen las llamadas de red críticas antes de proceder al siguiente paso.

El Worker Synthetic utiliza tiempos de espera jerárquicos para equilibrar la velocidad y la fiabilidad. Por lo tanto, la [duración de los pasos][14] no debe utilizarse para medir el rendimiento de la aplicación web, sino que refleja el tiempo necesario para una ejecución fiable de test.

## Tests de API y navegador

### Errores de falta de autorización

Un error 401 en tests de Synthetic Monitoring suele indicar un fallo de autenticación. Utiliza el mismo método de autenticación (fuera de Datadog) que utilizas normalmente para el endpoint y replícalo en la configuración de tu test de Synthetic.

* ¿Tu endpoint utiliza **autenticación con cabeceras**?
  * **Autenticación básica**: Especifica las credenciales asociadas en las **opciones avanzadas** de tu test [HTTP][7] o de [navegador][8].
  * **Autenticación basada en token**: Extrae tu token con un primer [test HTTP][7], crea una [variable global][9] analizando la respuesta de ese primer test y reinyecta esa variable en un segundo test [HTTP][7] o de [navegador][10] que requiera el token de autenticación.
  * **Autenticación basada en sesión**: Añade las cabeceras o cookies necesarias en las **opciones avanzadas** de tu test [HTTP][7] o de [navegador][8].

* ¿Tu endpoint utiliza la **autenticación de parámetros de consulta** (como añadir una clave de API a los parámetros URL)?

* ¿Tu endpoint utiliza la **autenticación basada en IP**? Si es así, autoriza [rangos IP de Synthetic Monitoring][11] en tus parámetros de cortafuegos o de seguridad.

### Errores de prohibición

Si observas errores `403 Forbidden` devueltos por tests de Synthetic Monitoring, es posible que tu servidor web esté bloqueando o filtrando solicitudes que incluyen la cabecera `Sec-Datadog`. Esta cabecera se añade a cada solicitud Synthetic que Datadog inicia para identificar el origen del tráfico y ayudar al servicio de asistencia de Datadog a identificar la ejecución de test específica.

Además, es posible que también debas asegurarte de que tus firewalls permitan [intervalos de IP de Datadog Synthetic Monitoring][11] como fuentes de tráfico.

### Falta de notificaciones

Los tests de Synthetic no [vuelven a notificar][12] por defecto. Si añades identificadores de notificación (direcciones de correo electrónico o identificadores de Slack) después de que se produzca una transición de estado (como una alerta de test entrante o una recuperación de alerta), no se enviará ninguna notificación de esa transición. Solo se envíarán notificaciones de las transiciones posteriores.

## Tests móviles

### No se puede iniciar la grabación de un dispositivo

Las aplicaciones con checks de seguridad de inicio (como la verificación de depuración USB) pueden impedir la grabación. Carga una versión de tu aplicación sin estos checks de seguridad para una grabación óptima de test.

### Problemas de funcionamiento de la aplicación durante la grabación y ejecución

Es posible que las funciones de la aplicación IOS no funcionen correctamente durante la grabación o ejecución debido al proceso de cierre de la aplicación. Este proceso, necesario para la confianza del dispositivo, puede eliminar derechos esenciales de iOS (Contactos, Cámara, Llavero, Fotos, Health Kit, Home Kit, etc.).

**Solución**: Utiliza perfiles de aprovisionamiento ad hoc o de desarrollo al distribuir tu aplicación iOS para minimizar los problemas relacionados con los derechos y mejorar la compatibilidad.

## Ubicaciones privadas

{{< tabs >}}
{{% tab "Común" %}}

### Los tests de navegador muestran errores `Page crashed`

Los fallos de páginas suelen indicar un agotamiento de recursos en Workers de ubicación privada. Asegúrate de que tus Workers de ubicación privada tienen [suficientes recursos de memoria][101].

### La ejecución de tests es más lenta de lo esperado

Una ejecución lenta de tests suele indicar un agotamiento de recursos en Workers de ubicación privada. Asegúrate de que tus Workers de ubicación privada tienen [suficientes recursos de CPU][103].

### A veces mis tests tardan demasiado en ejecutarse

Confirma que no estás viendo [problemas de memoria insuficiente][102] en tus despliegues de ubicaciones privadas. Si ya has intentado escalar tus instancias de Workers siguiendo las [instrucciones de dimensionamiento][101], ponte en contacto con el [servicio de asistencia de Datadog][104].

### Requisitos para los tests de navegador que se ejecutan en ubicaciones privadas

Los tests de navegador requieren privilegios elevados para generar (cuando se inicia la ejecución del test) y eliminar (cuando finaliza la ejecución del test) el proceso del navegador. Si tu ubicación privada está configurada con un contexto de seguridad que restringe los privilegios elevados, la ubicación privada emite logs de error cuando se ejecuta el test de navegador. Los logs notificados varían en función del navegador seleccionado para la ejecución del test. Los tests ejecutados en Chrome/Edge informan del siguiente error:

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

### Requisitos para los tests ICMP que se ejecutan en ubicaciones privadas

Los tests ICMP utilizan el comando `ping` para evaluar las rutas de red y la conectividad del host. El comando `ping` abre sockets sin procesar para enviar paquetes ICMP y requiere la funcionalidad `NET_RAW`. Si el contexto de seguridad de tu contenedor elimina esta funcionalidad, los tests ICMP no funcionan correctamente en la ubicación privada.

Adicionalmente, `ping` requiere privilegios elevados para crear el socket sin procesar. La ubicación privada no puede ejecutar tests ICMP si la ubicación privada está configurada con un contexto de seguridad que restringe los privilegios elevados.

### Errores de `TIMEOUT` en tests de API de ubicaciones privadas

Los errores de `TIMEOUT` suelen indicar que tu ubicación privada no puede contactar con el endpoint del test. Comprueba que la ubicación privada está instalada en la misma red que el endpoint de destino. Prueba diferentes endpoints para determinar si el problema es específico del endpoint o si afecta a toda la red.

{{< img src="synthetics/timeout.png" alt="Test de API con error de tiempo de espera de ubicación privada" style="width:70%;" >}}

[101]: /es/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /es/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /es/help/

{{% /tab %}}
{{% tab "Docker" %}}

### Resolución de problemas de reenvío IPv4 para contenedores con ubicación privada

Las ubicaciones privadas requieren acceso a [endpoints de ingesta de Datadog Synthetic Monitoring][103] para extraer configuraciones de test y enviar resultados de tests. Si el reenvío IPv4 está deshabilitado en un servidor Linux, la ubicación privada puede perder el acceso a la Internet pública y, en consecuencia, no podrá conectarse a la ingesta. Docker normalmente intenta habilitar el reenvío IP cuando se inicia un contenedor, pero si permanece deshabilitado, el contenedor no puede acceder a servicios externos como la ingesta. 

Si este es el caso, la ubicación privada informa de lo siguiente:

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
y
```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**Solución**: Asegúrate de que `net.ipv4.ip_forward` está habilitado en el host. 

### Requisitos del sistema de archivos raíz de solo lectura para contenedores de ubicación privada

Los contenedores de ubicación privada necesitan acceso de lectura-escritura a carpetas y archivos específicos para funcionar correctamente. Los sistemas de archivos raíz de solo lectura impiden el arranque debido a operaciones críticas que requieren acceso de escritura.

Durante el arranque, los contenedores configuran funcionalidades de Linux en los binarios cuyos metadatos fueron eliminados durante el proceso de compilación por motivos de seguridad. Esto restringe la ejecución al usuario `root` por defecto. Dado que las ubicaciones privadas se ejecutan como el usuario `dog`, los contenedores deben volver a aplicar los permisos para una correcta ejecución. Los sistemas de archivos de solo lectura impiden estas actualizaciones de permisos, provocando fallos en el arranque.

### Contenedores de ubicación privada eliminados por errores de `OOM` 

Los contenedores de ubicación privada eliminados por errores de `Out Of Memory` indican un agotamiento de recursos en los Workers. Asegúrate de que tus contenedores de ubicación privada tienen [suficientes recursos de memoria][101].

### Error de `Invalid mount config` al ejecutar ubicaciones privadas

Este error se produce al intentar montar un único archivo en contenedores basados en Windows, lo cual no es compatible. **Solución**: Asegúrate de que el origen de montaje bind es un directorio local. Para obtener más información, consulta la documentación sobre el [volumen de montaje Docker][102].

[101]: /es/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/es/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Reinicio del servicio del Worker de ubicación privada de Synthetic

Asegúrate de que la ubicación privada fue instalada con una configuración especificada en el momento de la instalación. Reinicia el servicio mediante los métodos GUI o PowerShell.

#### Método GUI

1. Busca **Services** (Servicios) en el menú **Start** (Inicio).
1. Abre **Services** (Servicios) (funciona en cualquier cuenta de usuario).
1. Busca `Datadog Synthetics Private Location` en **Services (Local)** (Servicios (Local)).
1. Haz clic con el botón derecho en el servicio y selecciona **Restart** (Reiniciar).

El Worker se ejecuta bajo la cuenta del **servicio local**. Compruébalo buscando el proceso `synthetics-pl-worker` en la pestaña **Details** (Detalles) del Administrador de tareas.

#### Método PowerShell

1. Abre **Windows PowerShell** con derechos de ejecución de scripts.
1. Ejecuta: `Restart-Service -Name "Datadog Synthetics Private Location"`

### Mantener el tiempo de actividad del Worker de ubicación privada de Synthetic

**Requisitos previos**: Inicia sesión en la máquina con permisos para crear tareas programadas.

**Recuperación tras un fallo**: Crea una tarea programada en Windows que ejecute un script de PowerShell para reiniciar el Worker si deja de funcionar. Esta acción garantiza la recuperación automática tras un fallo.

**Inicio automático**: Si has proporcionado un archivo de configuración durante la instalación, el servicio `Datadog Synthetics Private Location` de Windows se inicia automáticamente. Comprueba que el servicio se está ejecutando en la herramienta **Services** (Servicios). Este servicio gestiona los reinicios automáticos.

### Errores de certificado autofirmado 

Las ubicaciones privadas de Windows pueden mostrar este error inmediatamente después del arranque:

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
- Los mensajes de error se repiten continuamente en los logs.
- Las cadenas de certificados aparecen modificadas al navegar desde el host de Windows (por ejemplo, los sitios Datadog muestran intermediarios autofirmados en lugar de CA de confianza).

**Causa**: Este error se produce cuando se está realizando la **Inspección profunda de paquetes (DPI)** o la inspección TLS en el tráfico de tu red. DPI intercepta, descifra y vuelve a cifrar el tráfico SSL/TLS. Durante este proceso, la ubicación privada recibe una cadena de certificados que incluye un certificado autofirmado.

**Solución**:

- Carga tus [certificados raíz][101] personalizados autofirmados a tu ubicación privada.
- Comprueba que los logs de ubicación privada de Windows ya no informan del error.
```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

Sin omitir la inspección TLS, la ubicación privada de Windows no puede recuperar mensajes de test y permanece en estado de error.

[101]: /es/synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### Solicitudes de contraseña para usuario sudo o dog

El usuario de la ubicación privada (`dog`) requiere acceso `sudo` para su correcto funcionamiento. Este usuario normalmente recibe permisos durante el lanzamiento del contenedor. Comprueba que ninguna política restringe el acceso `sudo` del usuario `dog` o impide que el contenedor se ejecute como el usuario `dog` (UID 501).

Además, las versiones de ubicación privada `>v1.27` dependen de la llamada al sistema `clone3`. Es posible que los entornos de ejecución de contenedores más antiguos (Docker versiones <20.10.10) no admitan `clone3` en su política `seccomp`predeterminada.

**Solución**: Asegúrate de que la política `seccomp` de tu tiempo de ejecución incluye `clone3` actualizando la versión de tu tiempo de ejecución, añadiendo manualmente `clone3` a tu política o utilizando una política seccomp `unconfined`. Para obtener más información, consulta la [documentación `seccomp` de Docker][13].

## Referencias adicionales

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