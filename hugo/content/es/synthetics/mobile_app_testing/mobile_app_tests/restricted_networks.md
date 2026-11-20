---
cascade:
  algolia:
    tags:
    - mobile_testing
description: Ejecute pruebas de aplicaciones móviles desde redes restringidas
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Aprenda a crear pruebas de aplicaciones móviles sintéticas
- link: /synthetics/mobile_app_testing/settings
  tag: Documentación
  text: Aprenda a cargar sus aplicaciones móviles iOS o Android
title: Ejecute pruebas de aplicaciones móviles desde redes restringidas
---
## Descripción general {#overview}

Es posible que algunas de sus aplicaciones no estén disponibles en la internet pública porque acceden a entornos de desarrollo o locales, o porque son aplicaciones internas destinadas a usuarios dentro de su red corporativa (por ejemplo, su intranet corporativa o VPN).

{{< img src="/mobile_app_testing/mobile_app_restricted_networks.png" alt="Diagrama que muestra las pruebas de aplicaciones móviles detrás de un firewall o en redes restringidas" style="width:100%;">}}

Para probar estas aplicaciones, agregue los siguientes rangos de direcciones IP a la lista de permitidos de su empresa. Esto garantiza que las solicitudes de sus aplicaciones en Datadog Mobile App Testing tengan éxito.

La siguiente es la lista de rangos de IP asociados con los dispositivos reales utilizados para Datadog Mobile App Testing:


`54.244.50.32/27`</br>
`99.78.197.0/29`</br>
`15.248.40.40/29`</br>
`54.239.50.200/29`</br>
`34.125.90.96/27`</br>
`34.125.246.157/32`</br>
`44.225.33.89/32`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`66.85.48.0/21`</br>
`162.222.72.0/21`</br>
`34.145.254.128/27`</br>
`34.107.82.96/27`</br>
`34.141.28.96/32`</br>
`162.222.79.0/27`</br>
`185.94.24.0/22`</br>
`103.231.42.40/29`<br>
`103.231.79.40/29`<br>
`209.58.137.40/29`<br>
`217.112.145.88/29`<br>
`149.6.5.8/29`<br>
`3.221.56.233`<br>
`3.72.174.80`<br>
`3.73.105.110/32`<br>
`3.72.144.221/32`<br>
`18.235.85.58/32`<br>
`44.207.198.148/32`<br>
`3.109.252.59`<br>
`43.205.182.101`<br>
`18.138.79.89`<br>
`54.254.173.86`<br>
`52.72.255.172`<br>
`13.126.232.213`<br>
`34.246.27.205`<br>
`3.222.169.4`<br>
`43.204.134.9`<br>
`54.228.155.35`<br>
`54.225.186.4`<br>
`52.71.149.142`<br>
`44.238.12.62`<br>
`3.111.139.20`<br>
`54.255.17.88`<br>
`3.64.247.89`<br>
`137.174.189.0/26`<br>
`23.83.156.64/26`<br>


### Pasos HTTP {#http-steps}

A continuación se muestra la lista de rangos de IP necesarios para ejecutar pasos HTTP en Synthetic Mobile Application Tests. Puede ignorar estos rangos si sus pruebas no utilizan pasos HTTP.

`52.13.151.244/32`<br>
`54.201.250.26/32`<br>
`44.236.137.143/32`<br>
`52.35.189.191/32`<br>
`52.88.130.174/32`<br>
`44.236.20.182/32`<br>
`35.85.123.4/32`<br>
`34.210.15.72/32`<br>
`54.244.50.32/27`<br>
`99.78.197.0/29`<br>
`15.248.40.40/29`<br>
`54.239.50.200/29`<br>
`34.208.32.189/32`<br>
`52.35.61.232/32`<br>
`52.89.221.151/32`<br>
`3.120.223.25/32`<br>
`3.121.24.234/32`<br>
`18.195.155.52/32`<br>

## Solución de problemas {#troubleshooting}

Si experimenta problemas con Mobile App Testing en redes restringidas, utilice las siguientes pautas de solución de problemas. Si necesita más asistencia, comuníquese con [soporte de Datadog][1].

### No se puede iniciar el grabador {#unable-to-launch-recorder}

Para iniciar Mobile Application Testing (MAT) Recorder, Datadog necesita establecer conexiones TURN UDP/TCP para habilitar las conexiones WebRTC. Si el usuario se encuentra detrás de una red restrictiva (como un firewall estricto o una VPN), estas conexiones pueden fallar y generar el error "Device unexpectedly disconnected":

{{< img src="/mobile_app_testing/restricted_networks/device_disconnected_error.png" alt="Captura de pantalla del inicio de un dispositivo móvil, que muestra el error de desconexión." style="width:100%;" >}}

Para verificar si las conexiones TURN UDP/TCP son exitosas, ejecute una prueba de red con [Twilio Network Test][2]. El resultado de la prueba confirma si la conectividad con los servidores TURN es exitosa o no. Si la conexión es exitosa, verá un mensaje como "Successfully established a UDP connection to Twilio":

{{< img src="/mobile_app_testing/restricted_networks/twilio_test.png" alt="Captura de pantalla de una prueba exitosa con Twilio Network Test." style="width:100%;" >}}

Si la prueba falla, Twilio genera un registro que indica errores debido a que no se pudo establecer una conexión. Por ejemplo:

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}