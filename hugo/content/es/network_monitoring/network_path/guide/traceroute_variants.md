---
aliases:
- /es/network_monitoring/cloud_network_monitoring/guide/traceroute_variants/
description: Variantes de traceroute de Network Path
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtener visibilidad de extremo a extremo de la red con la Ruta de red de Datadog
is_beta: true
title: Variantes de traceroute de Network Path
---

La mayoría de los sistemas operativos modernos incluyen una herramienta integrada `traceroute`. Por ejemplo, Linux y macOS utilizan el comando `traceroute`, mientras que Windows utiliza `tracert`. Sin embargo, puedes observar diferentes resultados de estos comandos incluso cuando se ejecutan en la misma red. En este artículo se explican las razones de estas diferencias.

## Variantes de traceroute por plataforma

Todas las herramientas de traceroute realizan en general el mismo proceso: envían paquetes con un TTL que crece progresivamente (también conocido como *límite de salto*), para obtener información sobre cada salto a lo largo de la ruta. Sin embargo, difieren en el tipo de paquete que envían. Hay tres protocolos principales para traceroutes: ICMP, UDP y TCP. `traceroute` en Linux y macOS utilizan UDP por defecto, mientras que `tracert` en Windows utiliza ICMP. Para ver la lista completa de traceroutes compatibles, consulta la [matriz de compatibilidad][3].

{{< tabs >}}
{{% tab "Linux" %}}

<table>
  <thead>
    <th>Variante</th>
    <th>Soporte de Datadog</th>
    <th>Traceroute equivalente</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute -I</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute</code></td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tcptraceroute</code></td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>Herramientas de terceros</td>
  </tr>
</table>

Normalmente, los responsables oficiales de los paquetes ponen a disposición de los usuarios `traceroute` y `tcptraceroute`, pero solo `traceroute` se instala por defecto.

{{% /tab %}}

{{% tab "Windows" %}}

<table>
  <thead>
    <th>Variante</th>
    <th>Soporte de Datadog</th>
    <th>Traceroute equivalente</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tracert</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td>Herramientas de terceros</td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td>Herramientas de terceros</td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>N/A</td>
  </tr>
</table>

Windows no dispone de herramientas `traceroute` de TCP o UDP distribuidas oficialmente. Sin embargo, existen soluciones de terceros como `nmap` y `tracetcp`.

{{% /tab %}}

{{% tab "macOS" %}}

<table>
  <thead>
    <th>Variante</th>
    <th>Soporte de Datadog</th>
    <th>Traceroute equivalente</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute -I</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute</code></td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tcptraceroute (mediante homebrew)</td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>N/A</td>
  </tr>
</table>
{{% /tab %}}
{{< /tabs >}}


## Impacto del firewall en las variantes de traceroute

Los firewalls son un factor clave a la hora de elegir qué variante de traceroute utilizar. Por ejemplo, una red podría bloquear todos los paquetes UDP excepto las solicitudes DNS, o un servidor HTTP podría estar configurado para rechazar todo el tráfico entrante (incluidos ICMP y UDP), permitiendo solo conexiones TCP en el puerto 443.

El uso de traceroutes basados en TCP puede ser más efectivo porque coinciden con el protocolo del tráfico normal de la aplicación, aumentando la probabilidad de que los firewalls permitan el paso de los paquetes.

## Traceroutes TCP SACK

Aunque los traceroute TCP SYN (sincronización) son útiles, en algunos casos pueden ser bloqueados por los firewalls. Dado que inician conexiones semiabiertas, pueden ser malinterpretadas como avalanchas SYN o escaneos de puertos. Por el contrario, los traceroutes SACK (Reconocimiento selectivo) operan después de que se haya establecido una conexión TCP completa. Utilizan el reconocimiento selectivo para pedir al objetivo que acuse recibo de los paquetes sin requerir la transmisión real de datos.

Los traceroutes SACK sí envían paquetes con datos, pero introducen una brecha deliberada que activa el [bloqueo de encabezado de línea][1], impidiendo que los datos lleguen a la capa de aplicación.

Datadog actualmente solo admite traceroutes TCP SACK en Linux.

## Traceroutes ICMP

Todos los traceroutes se basan en paquetes "ICMP TTL Exceeded" (Internet Control Message Protocol Time to Live) para crear una ruta de red. Esto a menudo causa confusión con respecto a lo que define un traceroute ICMP, ya que todas las variantes de traceroute reciben respuestas ICMP. La diferencia clave radica en qué paquetes el traceroute está *enviando*, no recibiendo. 

Un traceroute ICMP envía específicamente paquetes [ICMP Echo Request][2], el mismo tipo utilizado por el comando `ping`. Si el TTL (Time to Live) de un paquete es demasiado bajo, un enrutador en la ruta responde con un mensaje ICMP Time Exceeded. En el último salto, la Echo Request llega al destino, que responde con una ICMP Echo Response.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://en.wikipedia.org/wiki/Head-of-line_blocking#In_reliable_byte_streams
[2]: https://en.wikipedia.org/wiki/Ping_(networking_utility)#Message_format
[3]: https://github.com/DataDog/datadog-traceroute?tab=readme-ov-file#support-matrix-for-ipv4