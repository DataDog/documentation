---
disable_toc: false
further_reading:
- link: /security/application_security/security_signals/attacker_clustering
  tag: Documentación
  text: Agrupación de atacantes
title: Attacker Fingerprint
---

Este tema describe una característica llamada **Datadog Attacker Fingerprint** para identificar atacantes más allá de las direcciones IP.

## Información general

Datadog Attacker Fingerprint identifica a los atacantes más allá de las direcciones IP. Las huellas digitales de los atacantes a Datadog se computan automáticamente y se añaden a tus trazas (trace) durante los intentos de ataque o de inicio de sesión cuando App and API Protection (AAP) está activado en tu servicio.

Las huellas digitales de los atacantes en Datadog se componen de varios fragmentos:
* Identificador de endpoint
* Identificador de sesión
* Identificador de cabecera
* Identificador de red

Cada fragmento identifica las especificidades de la solicitud buscando determinadas cabeceras y campos del cuerpo de la consulta y haciendo un hash de los valores de las cookies y los parámetros de la consulta.

## Detalles del fragmento de Attacker Fingerprint

### Identificador de endpoint

El fragmento identificador de endpoint proporciona información sobre un endpoint específico, así como los parámetros utilizados para llamarlo. Este fragmento utiliza la siguiente información:
* Método HTTP
* Hash del URI de la solicitud
* Hash de los campos de parámetros de la consulta
* Hash de los campos del cuerpo

### Identificador de sesión

El fragmento identificador de sesión realiza un seguimiento de los usuarios basándose en su información de sesión y en si están autenticados. Este fragmento utiliza la siguiente información:
* Hash del ID de usuario
* Hash de los campos de cookies
* Hash de los valores de cookies
* Hash del ID de sesión

Si todos los campos no están disponibles, el fragmento se omite, ya que no proporciona información significativa.

### Identificador de cabecera

El fragmento identificador de cabecera proporciona información sobre las cabeceras utilizadas en la solicitud. Este fragmento en particular utiliza la siguiente información:
* Presencia de cabeceras conocidas: Referer, Connection, Accept-Encoding, etc.
* Hash del Agent del usuario
* Número de cabeceras desconocidas
* Hash de cabeceras desconocidas. La lista de cabeceras desconocidas excluye todas las cabeceras XFF, cookies y cabeceras x-datadog.


### Identificador de red

El fragmento identificador de red proporciona información sobre la parte de red de la solicitud. Este fragmento utiliza la siguiente información:
* Número de IP en la cabecera XFF utilizado por el llamante para determinar la IP del cliente.
* Presencia o ausencia de cabeceras XFF conocidas


## Uso de Attacker Fingerprint

Los fragmentos pueden utilizarse como filtros en el Explorador de trazas de AAP filtrando el campo de huella deseado. Por ejemplo: `@appsec.fingerprint.header.ua_hash:e462fa45` filtrará todas las solicitudes que tengan el mismo hash de Agent de usuario.

{{< img src="security/application_security/threats/attacker-fingerprint-trace.png" alt="Catura de pantalla de una traza AAP con la huella del atacante en el panel lateral de trazas"  >}}

Las huellas digitales de los atacantes se utilizan en la función [Agrupación de atacantes][1]. Si una parte significativa de tu tráfico presenta los mismos atributos de huella digital, la agrupación de atacantes mostrará que tiene un atributo de ataque común.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/security_signals/attacker_clustering