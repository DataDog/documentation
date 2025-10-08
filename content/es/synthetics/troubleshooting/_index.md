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
  text: Creación de una localización privada
title: Solución de problemas de Synthetic Monitoring
---

## Información general

Si tienes problemas para instalar o configurar Datadog Synthetic Monitoring, esta página te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con el equipo de asistencia de Datadog][1].

## Tests de API

### Los tiempos de red varían

Si ves un pico repentino o un aumento general en las [métricas de tiempos][2] de tu test de API, por lo general esto indica que existe un cuello de botella o un retraso en la solicitud. Para obtener más información, consulta esta guía sobre [Tiempos y variaciones de los tests de API][3].

## Tests de navegador

### Grabación

#### El sitio web no se carga en el iframe

Luego de descargar la [extensión Datadog][4], no ves tu sitio web en el iframe situado a la derecha de la grabadora de tu test de navegador, sino que el iframe indica el mensaje`Your website does not support being loaded through an iframe.` Esto podría deberse a que algunas configuraciones de tu aplicación impiden que se abra en un iframe.

Si no puedes iniciar sesión en tu sitio web cuando grabas en la grabadora de iframe, es posible que tu aplicación tenga una solicitud bloqueada.

Prueba abrir tu sitio web en una ventana emergente haciendo clic en **Open in Popup** (Abrir en ventana emergente) para registrar el recorrido del usuario.

#### Algunas aplicaciones se cargan en el iframe y otras no

El motivo es que tus aplicaciones y entornos tienen diferentes restricciones, lo que hace que algunas se vean en un iframe, mientras que otras no.

#### Aparece el banner "We've detected HTTP requests that are not supported inside the iframe, you may need to record in a popup" (Hemos detectado solicitudes HTTP que no son compatibles dentro del iframe, es posible que tengas que grabar en una ventana emergente) en la parte superior del iframe

Lo más probable es que estés intentando grabar los pasos en una página `http`, pero en el iframe de la grabadora solo se admite `https`. Debes abrir la página como una ventana emergente o cambiar la URL a `https` para empezar a grabar en la página.

{{< img src="synthetics/http_iframe.png" alt="HTTP en iframe" style="width:100%;" >}}

#### Mi sitio web no se carga en el iframe y no puedo grabar ningún paso, aunque lo abra en una ventana emergente

Luego de descargar la [extensión Datadog][4], no ves tu sitio web en el iframe situado a la derecha de la grabadora de tu test de navegador. Tampoco puedes grabar ningún paso, independientemente de si abres el sitio web en el iframe o en una ventana emergente:

{{< img src="synthetics/recording_iframe.mp4" alt="Problemas al grabar pasos de tests de navegador" video="true" width="100%" >}}

Si esto sucede, asegúrate de que la [extensión Datadog][5] disponga de los permisos necesarios para leer y modificar datos en los sitios web correspondientes, indicando tu sitio web en la sección `On specific sites` (En sitios específicos) o activando la opción `On all sites` (En todos los sitios):

{{< img src="synthetics/extension.mp4" alt="Permitir que la extensión lea datos en todos los sitios" video="true" width="100%" >}}

#### No consigo grabar pasos en mi aplicación

Es posible que tu navegador Chrome tenga algunas políticas que impidan que la extensión realice la grabación según lo esperado.

Para averiguarlo, ve a `chrome://policy` y comprueba si hay alguna configuración relacionada con extensiones, como [`ExtensionSettings`][6].

#### No veo la página de inicio de sesión en la grabadora

De forma predeterminada, el iframe/la ventana emergente de la grabadora utiliza tu propio navegador. Por eso, si ya has iniciado sesión en tu aplicación, es posible que el iframe/la ventana emergente muestre directamente una página posterior al inicio de sesión y que, por tanto, no puedas grabar tus pasos de inicio de sesión si no cierras sesión primero.

Para poder grabar los pasos sin cerrar sesión en tu aplicación, basta con utilizar el **modo de incógnito** de la grabadora:

{{< img src="synthetics/incognito_mode.mp4" alt="Utilizar el modo de incógnito en tests de navegador" video="true" width="100%" >}}

**Al abrir una ventana emergente en modo de incógnito**, podrás iniciar la grabación del test desde la URL de inicio establecida en la configuración del test con una sesión totalmente aislada de la sesión principal y los datos de usuario de tu propio navegador.

Esta ventana emergente de incógnito ignora tu historial de navegación anterior, lo que incluye las cookies y los datos locales. Se cerrará sesión en tu cuenta automáticamente y podrás comenzar a grabar los pasos de inicio de sesión como si estuvieras visitando tu sitio web por primera vez.

### Resultados de los tests

#### Los resultados de mis tests de navegador de móvil pequeño o tableta fallan constantemente

Si tu sitio web utiliza técnicas **receptivas**, su DOM podría diferir mucho en función del dispositivo en el que se ejecute el test. Podría usar un DOM específico cuando se ejecute desde un `Laptop Large` (portátil grande) y tener una arquitectura diferente cuando lo haga desde una `Tablet` (tableta) o un `Mobile Small` (móvil pequeño).

En consecuencia, los pasos que hayas grabado desde la ventanilla de un `Laptop Large` (portátil grande) podrían no resultar aplicables al mismo sitio web si se accede desde un `Mobile Small` (móvil pequeño), de ahí que los resultados de tu test de `Mobile Small` fallen:

{{< img src="synthetics/device_failures.png" alt="Dispositivo móvil de tableta que experimenta fallos" style="width:100%;" >}}

Para este tipo de casos, Datadog recomienda crear **tests específicos de `Mobile Small` (móvil pequeño) o `Tablet` (tableta) independientes**, de manera que los pasos grabados coincidan con la ventanilla en la que tu test se configuró durante el tiempo de ejecución.

Para grabar pasos con una ventanilla de `Mobile Small` (móvil pequeño) o `Tablet` (tableta), selecciona `Mobile Small`o `Tablet` en el menú desplegable de la grabadora antes de pulsar el botón **Start Recording** (Iniciar grabación).

{{< img src="synthetics/record_device.png" alt="Grabar pasos para móvil o tableta" style="width:100%;" >}}

Además, los navegadores de tests de Datadog se ejecutan en modo **headless** (desatendido), por lo que los tests de navegador no admiten algunas funciones. Por ejemplo, los tests de navegador no admiten `touch` y no pueden utilizar `touch` para detectar si el sitio web debe aparecer con su diseño móvil.

#### Aparece la advertencia de paso`None or multiple elements detected` (Ningún elemento detectado o varios detectados) en tests de navegador

Uno de tus pasos de test de navegador indica la advertencia de paso `None or multiple elements detected` (Ningún elemento detectado o varios detectados):

{{< img src="synthetics/step_warning.png" alt="Advertencia de paso de localizador de usuario" style="width:100%;" >}}

Esto significa que el localizador de usuario definido para ese paso se dirige a varios elementos o a ninguno de ellos, por lo que el test de navegador no puede determinar con qué elemento interactuar.

Para solucionarlo, debes editar tu grabación. Abre las opciones avanzadas del paso que presenta el problema, ve a la página que el paso está sometiendo a test y haz clic en `Test`. Al hacerlo, se resaltará el elemento localizado o se imprimirá un mensaje de error. Ya puedes corregir tu localizador de usuario para que coincida con un único elemento de la página:

{{< img src="synthetics/fix_user_locator.mp4" alt="Corregir un error de localizador de usuario" video="true" width="100%" >}}

#### Tengo problemas con una propiedad de puntero de CSS

Los navegadores automatizados no permiten emular la función de medios `pointer` (puntero) de CSS. Los tests de navegador tienen configurado `pointer: none` (puntero: ninguno) para todos los tests y dispositivos (portátil, tableta o móvil).

### Duración de los recursos

#### Un recurso tiene una duración superior a la duración real del paso

Los recursos de carga prolongada pueden abarcar varios pasos. En el paso del resultado del test, Datadog devuelve todos los recursos iniciados durante ese paso específico. Sin embargo, Datadog espera aproximadamente 20 segundos para que finalicen las llamadas de red importantes. Transcurrido este tiempo, el worker de Synthetics avanza al paso siguiente. El worker utiliza una jerarquía de tiempos de espera, lo que le permite equilibrar velocidad y fiabilidad. Por ello, Datadog no aconseja utilizar la duración de los pasos para medir la velocidad o lentitud de una aplicación web. La duración del paso refleja el tiempo equilibrado que el worker necesita para entregar un resultado fiable.

## Tests de API y de navegador

### Errores de falta de autorización

Si uno de los tests de Synthetic muestra un error 401, lo más probable es que no pueda autenticarse en el endpoint. Aplica el mismo método que utilizas para realizar la autenticación en ese endpoint (fuera de Datadog) y replícalo cuando configures tu test de Synthetic.

* ¿Tu endpoint utiliza **autenticación con cabeceras**?
  * **Autenticación básica**: especifica las credenciales asociadas en las **opciones avanzadas** de tu [test de HTTP][7] o de [navegador][8].
  * **Autenticación con token**: extrae tu token con un primer [test de HTTP][7], crea una [variable global][9] parseando la respuesta de ese primer test y vuelve a inyectar esa variable en un segundo [test de HTTP][7] o de [navegador][10] que requiera el token de autenticación.
  * **Autenticación con sesión**: añade las cabeceras o las cookies necesarias en las **opciones avanzadas** de tu [test de HTTP][7] o de [navegador][8].

* ¿Este endpoint utiliza **parámetros de consulta para la autenticación** (por ejemplo, necesitas añadir una clave de API específica en tus parámetros de URL)?

* ¿Este endpoint utiliza **autenticación con IP**? Si es así, es posible que debas permitir algunas o todas las [IP desde las que se originan los tests Synthetic][11].

### Errores de prohibición

Si ves errores `403 Forbidden` (403: Prohibido) en tests de Synthetic, puede deberse a que tu servidor web bloquee o filtre solicitudes que incluyan la cabecera `Sec-Datadog`. Esta cabecera se añade a cada solicitud de Synthetic que inicia Datadog para identificar la fuente del tráfico y ayudar al equipo de asistencia de Datadog a identificar la ejecución de test específica.

Además, es posible que también debas asegurarte de que tus firewalls permitan [intervalos de IP de Datadog Synthetic Monitoring][11] como fuentes de tráfico.

### Falta de notificaciones

De forma predeterminada, los tests de Synthetic no [vuelven a notificar][12]. Por tanto, si añades tu identificador de notificación, como tu dirección de correo electrónico o tu identificador de Slack, después de que se genere una transición (por ejemplo, un test que muestra una alerta o se recupera de una alerta anterior), no se enviará ninguna notificación sobre dicha transición, sino que únicamente se enviará para la próxima transición.

## Tests móviles

### No se puede iniciar la grabación de un dispositivo

Si se realizan comprobaciones de seguridad durante el inicio de la aplicación, como verificar si la depuración USB está activada, Datadog recomienda cargar una versión de la aplicación que no contenga estas comprobaciones.

### Garantizar el correcto funcionamiento de la aplicación durante la grabación y la ejecución de los tests

Si algunas características de tu aplicación iOS no funcionan como se espera durante la grabación o la ejecución de tests, podría ser el resultado del proceso de nueva firma de la aplicación. Este proceso de nueva firma es necesario para que los dispositivos móviles puedan confiar en la aplicación proporcionada. Los problemas con el proceso de nueva firma pueden provocar que se eliminen derechos esenciales de iOS (como el acceso a Contactos, Cámara, Keychain, Fotos, Health Kit, Home Kit, etc.).

Para minimizar el riesgo de problemas relacionados con los derechos y para mejorar la compatibilidad, Datadog recomienda distribuir tu aplicación iOS utilizando perfiles de suministro Ad Hoc o de Desarrollo.

## Localizaciones privadas

{{< tabs >}}
{{% tab "Común" %}}

### Los resultados de mis tests de navegador a veces muestran errores `Page crashed` (Página con fallos)

Esto podría indicar un problema de agotamiento de recursos en los workers de tus localizaciones privadas. Asegúrate de que los workers de localizaciones privadas cuenten con [recursos de memoria suficientes][101].

### A veces mis tests se ejecutan más lentamente

Esto podría indicar un problema de agotamiento de recursos en los workers de tus localizaciones privadas. Asegúrate de que los workers de localizaciones privadas cuenten con [recursos de CPU suficientes][101].

### A veces mis tests tardan demasiado en ejecutarse

Comprueba que no haya [problemas de memoria insuficiente][102] con tus implementaciones de localizaciones privadas. Si ya has intentado escalar tus instancias de workers siguiendo las [directrices de dimensionamiento][103], contacta con el [equipo de asistencia de Datadog][104].

### Requisitos para los tests de navegador que se ejecutan en localizaciones privadas

Los tests de navegador requieren privilegios elevados para generar (cuando se inicia la ejecución del test) y finalizar (cuando finaliza la ejecución del test) el proceso del navegador. Si tu localización privada está configurada con un contexto de seguridad que restringe los privilegios elevados, entonces la localización privada emite logs de error cuando se ejecuta el test de navegador. Los logs informados varían en función del navegador seleccionado para la ejecución del test. Los tests ejecutados en Chrome/Edge informan del siguiente error:
```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

Firefox informa del siguiente error:
```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### Requisitos para los tests ICMP que se ejecutan en localizaciones privadas

Los tests ICMP utilizan el comando `ping` para evaluar las rutas de red y la conectividad a un host. `ping` abre un socket sin procesar para enviar paquetes ICMP a través de él, por lo que requiere la capacidad `NET_RAW` para permitir la creación de sockets sin procesar. Si tu contenedor está configurado con un contexto de seguridad que elimina esta capacidad, los tests ICMP no podrán funcionar correctamente en la localización privada.

Adicionalmente, `ping` requiere privilegios elevados para crear el socket sin procesar. La localización privada no puede ejecutar tests ICMP si la localización privada está configurada con un contexto de seguridad que restringe los privilegios elevados.

### Aparecen errores de tipo `TIMEOUT`(tiempo de espera) en tests de API ejecutados desde mi localización privada

Esto podría significar que tu localización privada no puede alcanzar el endpoint en el que se ha configurado que se ejecute tu test de API. Comprueba que la localización privada esté instalada en la misma red que el endpoint que quieres someter a test. También puedes intentar ejecutar el test en diferentes endpoints para ver si se produce o no el mismo error `TIMEOUT`.

{{< img src="synthetics/timeout.png" alt="Test de API con error de tiempo de espera de localización privada" style="width:70%;" >}}

[101]: /es/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /es/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /es/help/

{{% /tab %}}
{{% tab "Docker" %}}

### Resolución de problemas de reenvío IPv4 para contenedores con localización privada

Las localizaciones privadas requieren acceso a [endpoints de ingesta de la monitorización Synthetic de Datadog][103] para extraer configuraciones de test y enviar resultados de tests. Si el reenvío IPv4 está deshabilitado en un servidor Linux, la localización privada puede perder el acceso a la Internet pública y, en consecuencia, no podrá conectarse a la ingesta. Docker normalmente intenta habilitar el reenvío IP cuando se inicia un contenedor, pero si permanece deshabilitado, el contenedor no puede acceder a servicios externos como la ingesta. 

En ese caso, la localización privada informará de logs como:

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
y
```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

Para resolver este problema, asegúrate de que `net.ipv4.ip_forward` está habilitado en el host. 

### Mi política de seguridad requiere que los contenedores de localización privada se ejecuten con un sistema de archivos raíz de sólo lectura

Los contenedores de localización privada requieren acceso de lectura-escritura a carpetas y archivos específicos para funcionar correctamente. Si el contenedor se ejecuta con un sistema de archivos raíz de sólo lectura, no se iniciará correctamente debido a varias operaciones críticas que dependen del acceso de escritura.

Durante el inicio, el contenedor intenta configurar capacidades de Linux en ciertos binarios. Esto es necesario porque, durante el proceso de creación de localizaciones privadas, los bits de metadatos se eliminan de los binarios por razones de seguridad. Por defecto, esto restringe la ejecución al usuario `root`. Dado que las localizaciones privadas se ejecutan con el usuario `dog`, el contenedor vuelve a aplicar los permisos necesarios para permitir la ejecución. En un sistema de archivos raíz de sólo lectura, estas actualizaciones fallan, dando lugar a errores cuando se inicia el contenedor.

### A veces, mis contendores de localizaciones privadas se eliminan debido a un problema `OOM`

Los contenedores de localizaciones privadas que se eliminan por un problema `Out Of Memory` (memoria insuficiente) generalmente indican un problema de agotamiento de recursos en los workers de tus localizaciones privadas. Asegúrate de que los contenedores de localizaciones privadas cuenten con [recursos de memoria suficientes][101].

### Aparece el error `invalid mount config for type "bind": source path must be a directory` (Configuración de montaje no válida para el tipo "enlace": la ruta de origen debe ser un directorio) al intentar ejecutar una localización privada

Esto sucede si se intenta montar un solo archivo en un contenedor basado en Windows, pues no es compatible. Para obtener más información, consulta la [documentación de volumen de montaje de Docker][102]. Asegúrate de que el origen del montaje de enlace sea un directorio local.

[101]: /es/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/es/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Volver a lanzar el servicio del worker de localizaciones privadas de Synthetics sin un reinicio

En primer lugar, asegúrate de haber instalado la localización privada con una configuración especificada en el momento de la instalación. Puedes utilizar una GUI o Windows PowerShell para volver a lanzar el servicio.

#### GUI

1. Abre el instalador MSI y busca **Services** (Servicios) en el menú **Start** (Inicio).
1. Inicia **Services** (Servicios) en cualquier cuenta de usuario.
1. Haz clic en **Services (Local)** (Servicios [Local]) y busca el servicio llamado `Datadog Synthetics Private Location`.
1. Haz clic con el botón derecho en el servicio del paso 2 y elige **Restart** (Reiniciar).

El worker de localizaciones privadas de Synthetics se ejecuta ahora bajo la cuenta **Servicio local**. Para confirmarlo, inicia el administrador de tareas y busca el proceso `synthetics-pl-worker` en la pestaña **Detalles**.

#### PowerShell

1. Inicia **Windows PowerShell** en cualquier cuenta de Windows que tenga derechos para ejecutar scripts de PowerShell.
1. Ejecuta el siguiente comando: `Restart-Service -Name “Datadog Synthetics Private Location”`.

### Mantener en funcionamiento el worker de localizaciones privadas de Synthetics

En primer lugar, asegúrate de que has iniciado sesión en la máquina en la que está instalado el servicio de Windows de localizaciones privadas de Synthetics y de que dispones de los permisos para crear tareas programadas en la máquina.

Si el worker de localizaciones privadas de Synthetics se bloquea, añade una tarea programada en Windows que ejecute un script de PowerShell para reiniciar la aplicación si deja de funcionar. Esto garantiza que una localización privada se reinicie después de un fallo.

Si proporcionaste un archivo de configuración al instalar la aplicación, se iniciará automáticamente un servicio de Windows llamado `Datadog Synthetics Private Location` después de la instalación. Para verificar esto, asegúrate de que puedes ver el servicio ejecutándose en la herramienta **Services** (Servicios). Este servicio de Windows reinicia la localización privada automáticamente.

{{% /tab %}}
{{< /tabs >}}

### Se me pide una contraseña para sudo/Se me pide una contraseña para el usuario dog

El usuario de la localización privada (`dog`) requiere `sudo` por varias razones. Normalmente, a este usuario se le conceden ciertos permisos para dar acceso a `sudo` en el proceso de lanzar la localización privada en tu contenedor. Confirma si dispones de una política que restrinja la capacidad del usuario `dog` para `sudo`, o que impida que el contenedor se inicie como el usuario `dog` (UID 501).

Además, en las versiones de localización privada `>v1.27` , Datadog depende del uso de la llamada al sistema `clone3`. En algunas antiguas versiones de entornos de ejecución de contenedores (como las versiones de Docker <20.10.10), `clone3` no es compatible con la política por defecto `seccomp`. Confirma que la política `seccomp` del entorno de ejecución de tu contenedor incluye `clone3`. Puedes hacerlo actualizando la versión de tu tiempo de ejecución en uso, añadiendo manualmente `clone3` a tu política `seccomp` o utilizando una política seccomp `unconfined`. Para obtener más información, consulta la [documentación de `seccomp` de Docker][13].

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
[12]: /es/synthetics/api_tests/?tab=httptest#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/