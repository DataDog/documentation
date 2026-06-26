---
cascade:
  algolia:
    tags:
    - tests_móviles
description: Ejecutar tests de aplicaciones móviles desde redes restringidas
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la creación de tests de extremo a extremo
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Aprender a crear tests de aplicaciones móviles Synthetic
- link: /synthetics/mobile_app_testing/settings
  tag: Documentación
  text: Aprender a cargar tus aplicaciones móviles iOS o Android
title: Ejecutar tests de aplicaciones móviles desde redes restringidas
---

## Información general

Es posible que algunas de tus aplicaciones no estén disponibles para la Internet pública porque acceden a entornos de desarrollo o locales, o son aplicaciones internas destinadas a usuarios dentro de tu red corporativa (por ejemplo, tu intranet corporativa o VPN). 

{{< img src="/mobile_app_testing/mobile_app_restricted_networks.png" alt="Diagrama que muestra tests de aplicaciones móviles detrás de un cortafuegos o redes restringidas" style="width:100%;">}}

Para probar estas aplicaciones, añade los siguientes rangos de direcciones IP a la lista de autorizaciones de tu empresa. Esto garantiza el éxito de las solicitudes de tus aplicaciones en Datadog Mobile App Testing.

La siguiente es la lista de rangos de IP asociados con los dispositivos reales utilizados en Datadog Mobile App Testing:

### Granja de dispositivos AWS

`54.244.50.32/27`</br>
`99.78.197.0/29`</br>
`15.248.40.40/29`</br>
`54.239.50.200/29`</br>

### Oeste de EE.UU.

`34.125.90.96/27`</br>
`34.125.246.157/32`</br>
`44.225.33.89/32`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>

### Este de EE.UU.

`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`34.145.254.128/27`</br>

### UE Central 

`34.107.82.96/27`</br>
`34.141.28.96/32`</br>
`162.222.79.0/27`</br>
`185.94.24.0/22`</br>

### Pasos HTTP

A continuación se muestra la lista de rangos IP necesarios para ejecutar pasos HTTP en los tests de aplicaciones móviles de Synthetic. Puedes ignorar estos rangos si tus tests no utilizan pasos HTTP.

`52.13.151.244/32`<br>
`54.201.250.26/32`<br>
`44.236.137.143/32`<br>
`52.35.189.191/32`<br>
`34.208.32.189/32`<br>
`52.35.61.232/32`<br>
`52.89.221.151/32`<br>
`3.120.223.25/32`<br>
`3.121.24.234/32`<br>
`18.195.155.52/32`<br>

## Solucionar problemas

Si experimentas problemas con Mobile App Testing en redes restringidas, utiliza las siguientes guías para la resolución de problemas. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][1].

### No se puede iniciar la grabadora

Para iniciar la grabadora de Mobile Application Testing (MAT), Datadog necesita establecer conexiones UDP/TCP TURN para habilitar las conexiones WebRTC. Si el usuario está detrás de una red restringida (como un cortafuegos estricto o una VPN), estas conexiones pueden fallar y provocar un error "Device unexpectedly disconnected" (Dispositivo desconectado inesperadamente):

{{< img src="/mobile_app_testing/restricted_networks/device_disconnected_error.png" alt="Captura de pantalla del lanzamiento de un dispositivo móvil que muestra el error de desconexión." style="width:100%;" >}}

Para comprobar si las conexiones UDP/TCP de TURN son exitosas, ejecuta un test de red utilizando un [test de red Twilio][2]. El resultado del test confirma si la conectividad a los servidores TURN es correcta o no. Si la conexión es exitosa, verás un mensaje como "Se ha establecido una conexión UDP a Twilio exitosa":

{{< img src="/mobile_app_testing/restricted_networks/twilio_test.png" alt="Captura de pantalla de un test exitoso mediante un test de red Twilio." style="width:100%;" >}}

Si el test falla, Twilio genera un resultado de log indicando errores debidos a la incapacidad de establecer una conexión. Por ejemplo:

```
[3:09:13 PM] Test "TURN UDP Connectivity" started...
[3:09:20 PM] Error: Error: Could not establish a UDP connection to Twilio within 5 seconds
[3:09:20 PM] Test "TURN TCP Connectivity" started...
[3:09:25 PM] Error: Error: Could not establish a TCP connection to Twilio within 5 seconds
[3:09:25 PM] Test "TURN TLS Connectivity" started...
[3:09:30 PM] Error: Error: Could not establish a TLS connection to Twilio within 5 seconds
[3:09:30 PM] Test "Bandwidth" started...
[3:09:35 PM] Error: Error: Could not establish a connection to Twilio within 5 seconds
```

[1]: /es/help
[2]: https://networktest.twilio.com/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}