---
description: Solucionar errores o problemas de logs de Live Tail
title: Solucionar problemas de Live Tail
---

Si tu página de Live Tail muestra un error, o los logs no se cargan, intenta los siguientes pasos para solucionar problemas:

* Abre la vista de Live Tail con el navegador en modo incógnito y comprueba si puedes ver los logs.
* Prueba con otro navegador y comprueba si Live Tail carga logs.
* Comprueba si otros miembros del equipo pueden ver logs en la vista de Live Tail.
* Comprueba cualquier restricción de red, configuración de VPN o software antivirus que pueda bloquear la carga de logs de Live Tail:
    - Asegúrate de que tu red local o de empresa permite el tráfico entrante desde `live.logs.datadoghq.com`.
    - Busca los prefijos de IP de Datadog en el endpoint de [Rangos de IP][1].

## Solicitudes de trazas

Traceroute es una herramienta que te ayuda a comprobar la ruta que sigue un paquete desde la fuente hasta su destino. Puedes utilizar `traceroute` para identificar cualquier problema de red del lado del cliente que pueda impedir la carga de Live Tail.

Para examinar la ruta de los logs de Live Tail en Linux o MacOS, ejecuta el siguiente comando:
{{< code-block lang="shell">}}
traceroute live.logs.datadoghq.com
{{< /code-block >}}

Si en algún momento se agota el tiempo de espera, significa que la solicitud está bloqueada en algún punto entre el cliente y los servidores de Datadog. Comprueba con tu equipo de administración de red para solucionar este problema.    

Si un paso en la ruta muestra `* * *`, esto podría indicar que un host no respondió al traceroute, o que un router no responde a ese protocolo. El patrón `* * *` no siempre indica un timeout. Cambiar el protocolo de detección a ICMP/PING utilizando la opción `-I` puede proporcionar resultados más detallados.

## Borrar cachés de navegador y DNS

### Caché del navegador

Limpiar la caché de tu navegador puede ayudar con problemas de Live Tail. Por ejemplo, para borrar la memoria caché en Google Chrome, consulta [ayuda de cuenta de Google][2].

### Caché de DNS

Borrar tu caché de DNS puede ayudarte con problemas de Live Tail.

Para borrar la caché de DNS con Google Chrome:
1. Inicia el navegador de Google Chrome.
1. Escribe `chrome://net-internals/#dns` en la barra de direcciones y pulsa Enter (Intro).
1. Haz clic en **Clear host cache** (Borrar caché de host).

## Comprueba complementos y extensiones del navegador

Los complementos y extensiones del navegador, incluidos los bloqueadores de anuncios, a veces interfieren con Live Tail:
- Comprueba si tu navegador o sistema operativo tiene instalado una aplicación de bloqueo de anuncios. Desinstala o desactiva cualquier bloqueador de anuncios que encuentres y, a continuación, comprueba si puedes ver los logs en Live Tail.
- Pon en pausa, detén o desinstala los complementos y extensiones del navegador.

## Comprobar en acceso

Comprueba que tienes asignado un rol con el permiso [`logs_live_tail`][3]. Para obtener más información, consulta [roles y permisos de Datadog][4].

Determina si un administrador configuró una [consulta de restricción de logs (RBAC)][5] en tu organización de Datadog. Si careces de los permisos necesarios para acceder a los logs que estás consultando en Live Tail, no podrás ver ningún log. Si crees que deberías tener acceso a estos logs, ponte en contacto con el administrador de tu cuenta de Datadog para que te conceda los permisos requeridos.

{{< img src="logs/explorer/live_tail/logs_rbac_page.png" alt="Pagina de RBAC de logs" style="width:100%;" >}}

## Crear un tique de soporte

Si los pasos anteriores de solucionar problemas no resuelven el problema con Live Tail, crea un [tique de soporte][6]. Si es posible, incluye la siguiente información en tu tique de soporte:

### Detalles del sistema operativo y del navegador

- Nombre y versión del navegador 
- Complementos o extensiones
- Nombre y versión del sistema operativo

### Archivo HAR

Para generar un archivo HAR en Google Chrome, consulta [Capturar el tráfico de la sesión web][7].

Adjunta el archivo HAR a tu tique de soporte.

### Capturas de pantalla y grabación
- Haz una captura de pantalla de la consola del navegador.
    - En Google Chrome, consulta [DevTools][8] para abrir la consola del navegador.
- Graba un breve vídeo que demuestre el comportamiento del problema.

[1]: https://ip-ranges.datadoghq.com
[2]: https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop
[3]: /es/logs/guide/logs-rbac-permissions/?tab=ui#logs_live_tail
[4]: /es/account_management/rbac/permissions/
[5]: /es/logs/guide/logs-rbac/?tab=ui
[6]: https://help.datadoghq.com/hc/en-us/requests/new
[7]: https://support.google.com/admanager/answer/10358597?hl=en
[8]: https://developer.chrome.com/docs/devtools/open