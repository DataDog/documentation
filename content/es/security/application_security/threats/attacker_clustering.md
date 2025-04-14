---
disable_toc: false
further_reading:
- link: /security/application_security/threats/attacker_fingerprint
  tag: Documentación
  text: Huella digital del atacante
- link: /security/application_security/threats/threat-intelligence/
  tag: Documentación
  text: Información sobre amenazas
- link: /security/application_security/threats/event_rules
  tag: Documentación
  text: Reglas de WAF dentro de la aplicación
- link: /security/application_security/threats/security_signals/
  tag: Documentación
  text: Señales de seguridad
title: Agrupación de atacantes
---


## Información general

La agrupación de atacantes mejora el bloqueo de ataques distribuidos. Datadog Application Security Management (ASM) identifica patrones de atacantes de tráfico de señales de seguridad y te ayuda a mitigar los ataques distribuidos más eficientemente.

La agrupación de atacantes destaca un conjunto de atributos comunes compartidos por una parte significativa del tráfico y sugiere el bloqueo en función de esos atributos.

El bloqueo en función de los atributos del atacante significa que mantendrás tu aplicación o API protegidas aunque el atacante rote entre diferentes IP.

## ¿Qué señales se utilizan para los clústeres de atacantes?

La agrupación de atacantes se calcula para cada [señal de seguridad ASM][4] emitida desde una regla de detección etiquetada con `category:account_takeover` o `category:fraud`

De forma predeterminada, la agrupación de atacantes se calcula para las reglas de detección ASM que detectan abusos de API, relleno de credenciales o ataques de fuerza bruta.

Si quieres que la agrupación de atacantes se ejecute en reglas de detección personalizadas, añade estas etiquetas (tags) en el editor de reglas de detección (consulta la captura de pantalla siguiente).

{{< img src="security/application_security/threats/tag-on-detection-rule.png" alt="Captura de pantalla del editor de reglas de detección, que muestra dónde añadir las etiquetas"  >}}

## Atributos de la agrupación de atacantes

La agrupación de atacantes se calcula utilizando los siguientes atributos de la solicitud:
* Nombre del navegador
* Versión del navegador
* Nombre del sistema operativo
* Versión del sistema operativo
* Cabecera del Agent del usuario
* [Huellas digitales de atacantes en Datadog][2]

Cuando se identifican los atributos del atacante, se muestran en el panel lateral de señales y en la página **Señales**. Los atributos del atacante pueden ser una combinación de los atributos enumerados anteriormente.

{{< img src="security/application_security/threats/attacker-attributes.png" alt="Captura de pantalla de una señal ASM con los atributos del atacante identificados"  >}}

## Mecanismo de agrupación de atacantes

El algoritmo de agrupación analiza la frecuencia de los atributos en el tráfico de ataque. Selecciona los atributos que aparecen con frecuencia mientras filtras el ruido típico del tráfico. Este proceso da como resultado atributos que pueden bloquearse para detener o ralentizar al atacante.

El algoritmo rastrea los cambios en el tráfico de ataque identificando tendencias emergentes a medida que el atacante cambia de táctica (por ejemplo, cambiando cabeceras, herramientas, etc.). El clúster de atacantes se actualiza con las últimas tendencias del tráfico.

El tráfico asociado a la información sobre amenazas también se tiene en cuenta en el mecanismo de agrupación. Cuanto más correlacionado esté un atributo con la [información sobre amenazas][1], mayor será la posibilidad de crear un clúster de atacantes en torno a este atributo.

Los atributos de agrupación de atacantes seleccionados se muestran entonces como expresiones regulares que se pueden utilizar para bloquear con el [WAF en la aplicación][3] de ASM o para filtrar el tráfico en el Explorador trazas (traces) de ASM para su investigación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/threats/threat-intelligence/
[2]: /es/security/application_security/threats/attacker_fingerprint
[3]: /es/security/application_security/threats/event_rules
[4]: /es/security/application_security/threats/security_signals/