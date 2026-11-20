---
aliases:
- /es/synthetics/api_test_timing_variations
description: Comprende los tiempos de los tests de API y soluciona sus variaciones.
further_reading:
- link: https://docs.datadoghq.com/synthetics/metrics/#api-tests
  tag: Documentación
  text: Métricas de tests de API de Synthetics
title: Comprender los tiempos de los tests de API y solucionar las variaciones
---


## Información general

Puedes identificar cuellos de botella en la comunicación entre tu servidor y el cliente con las [métricas de tiempo][1] que recopilan los tests de API de Synthetic.


## Métricas de tiempo


Los tests de Synthetic recopilan [métricas][1] que miden lo siguiente:


### Tiempo de redireccionamiento

La métrica `synthetics.http.redirect.time` mide el tiempo total empleado en redirecciones. Todos los demás tiempos de red (como la resolución DNS y la conexión TCP) corresponden a la última solicitud.

Por ejemplo, un test de HTTP con **Follow Redirects** (Seguir redirecciones) seleccionado carga la Página A durante un total de `35 ms`, que redirecciona a la Página B, que se carga durante un total de `40 ms`, y redirecciona a la Página C. El tiempo de redirección se calcula como `35 ms + 40 ms = 75 ms` y el tiempo de carga de la Página C se divide entre todos los demás tiempos, incluyendo la resolución DNS y la conexión TCP.

Para obtener más información sobre cómo seguir las redirecciones, consulta [Tests de HTTP][2].


La métrica `synthetics.http.redirect.time` sólo se mide si se producen redireccionamientos durante la ejecución de tests HTTP de Synthetic Monitoring.

### Tiempo de resolución DNS

Las métricas `synthetics.dns.response.time` y `*.dns.time` miden el tiempo empleado en resolver el nombre de dominio. Los tests de API de Synthetic utilizan servidores DNS comunes para la resolución de nombres de dominio, como Google, CloudFlare, AWS y Azure. Puedes anular estos servidores con [localizaciones privadas][3] o [tests DNS][4].

Estas métricas solo se miden cuando el campo de URL de test de API contiene un nombre de dominio. Si utilizas una dirección IP, se omite la resolución DNS y no aparecen series temporales para estas métricas.


En caso de cualquier redireccionamiento, el tiempo de resolución DNS solo corresponde a la última solicitud.

### Tiempo de conexión TCP

Las métricas `*.connect.time` miden el tiempo total empleado en establecer una conexión TCP con el servidor.

En caso de cualquier redireccionamiento, el tiempo de conexión TCP solo corresponde a la última solicitud.

### Tiempo del protocolo de enlace SSL

Las métricas `synthetics.http.ssl.time` y `synthetics.ssl.hanshake.time` miden el tiempo empleado en el protocolo de enlace SSL.

Estas métricas solo se recopilan si la solicitud se realiza a través de HTTPS, y no HTTP.

En caso de cualquier redireccionamiento, el tiempo del protocolo de enlace SSL solo corresponde a la última solicitud.


### Tiempo hasta el primer byte

La métrica `synthetics.http.firstbyte.time` mide el tiempo transcurrido entre el momento en que se estableció la conexión y el momento en que el cliente de Datadog recibió el primer byte de la respuesta. Este tiempo incluye todo el tiempo dedicado al envío de datos en la solicitud.



En caso de cualquier redireccionamiento, el tiempo hasta el primer byte solo corresponde a la última solicitud.

### Tiempo de descarga

La métrica `synthetics.http.download.time` mide el tiempo transcurrido entre el momento en que el cliente de Datadog recibe el primer byte de la respuesta y el momento en que termina de descargar la respuesta completa. Generalmente, cuanto más grande sea el cuerpo de la respuesta, mayor será este tiempo.

En el caso de que la respuesta no tenga cuerpo, este tiempo es nulo.

En caso de redireccionamiento, el tiempo de descarga solo corresponde a la última solicitud.

### Tiempo total de respuesta

Las métricas `*.response.time` miden el tiempo total transcurrido entre el momento en que se inicia Synthetics y el momento en que Synthetics finaliza la solicitud. El tiempo de respuesta es la suma de todos los tiempos de red.

Por ejemplo, el tiempo total de respuesta para un test de HTTP sin redireccionamientos en un endpoint HTTPS: `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time + synthetics.http.ssl.time + synthetics.http.firstbyte.time + synthetics.http.download.time`.

## Variaciones en los tiempos

Las variaciones en las métricas de tiempo de red de tests de API pueden producirse cuando hay un cuello de botella o un retraso en cualquier etapa de la solicitud, desde el redireccionamiento hasta la descarga del cuerpo de la respuesta.

Identifica los siguientes comportamientos:

- Si la variación se observa como una tendencia general o un pico repentino.
- Si la variación solo se produce en una etapa específica de la solicitud. Por ejemplo, en los tiempos de DNS.
- Si el test de Synthetic Monitoring afectado se ejecuta desde varias ubicaciones, tanto si la variación está localizada en una única ubicación como si está generalizada
- Si la variación solo se produce en una única URL, dominio o subdominio, o si afecta a todos los tests.



Para cada métrica de tiempo medida, puedes describir las variaciones con los siguientes factores:

### Tiempo de redireccionamiento
El tiempo de redireccionamiento es la suma de todas las redirecciones de una solicitud. Las variaciones en cualquier etapa de la solicitud HTTP, desde la resolución DNS hasta la descarga, pueden aumentar notablemente el tiempo de redireccionamiento.

Por ejemplo, cualquier retraso en la resolución DNS repercute en el tiempo de redireccionamiento, ya que los redireccionamientos requieren los tests de API para resolver múltiples dominios.


### Tiempo de resolución DNS
Puede producirse un aumento del tiempo de resolución DNS con latencia adicional de los servidores autoritativos.

### Tiempo de conexión TCP
Pueden producirse variaciones del handshake TCP debido a la carga de la red y del servidor, al tamaño de los mensajes de solicitud y respuesta, y a la distancia entre la [ubicación privada][5] o gestionada de Synthetic Monitoring y el servidor.

### Tiempo del protocolo de enlace SSL
Pueden producirse variaciones del tiempo del protocolo de enlace SSL debido a la carga del servidor (los protocolos de enlace SSL suelen requerir un uso intensivo de CPU), la carga de red y la distancia entre la [localización privada][5] o gestionada por Synthetics y el servidor. Los problemas con el CDN pueden aumentar el tiempo del protocolo de enlace SSL.

### Tiempo hasta el primer byte
Pueden producirse variaciones del tiempo hasta el primer byte debido a la carga de red y del servidor y a la distancia entre la [localización privada][5] o gestionada por Synthetics y el servidor. Por ejemplo, una mayor carga de red o el redireccionamiento del tráfico provocado por un CDN no disponible pueden afectar de forma negativa el tiempo hasta el primer byte.

### Tiempo de descarga
Pueden producirse variaciones en el tiempo de descarga debido a cambios en el tamaño de la respuesta. El tamaño del cuerpo descargado está disponible en los resultados de los tests y en la métrica `synthetics.http.response.size`.

Siempre que puedan producirse variaciones debido a la carga de la red, puedes utilizar tests de [Cloud Network Monitoring][6] y [Synthetic Monitoring ICMP][7] para identificar posibles cuellos de botella.

En los casos en los que puedan producirse variaciones debido a la carga del servidor, utiliza el [Datadog Agent][8] y sus [integraciones][9] para identificar posibles retrasos. 


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/metrics/#api-tests
[2]: /es/synthetics/api_tests/http_tests?tab=requestoptions#define-request
[3]: /es/synthetics/private_locations/configuration#dns-configuration
[4]: /es/synthetics/api_tests/dns_tests#define-request
[5]: /es/synthetics/private_locations/?tab=docker#overview
[6]: /es/network_monitoring/cloud_network_monitoring/#overview
[7]: /es/synthetics/api_tests/icmp_tests/#overview
[8]: /es/getting_started/agent/#overview
[9]: /es/integrations/