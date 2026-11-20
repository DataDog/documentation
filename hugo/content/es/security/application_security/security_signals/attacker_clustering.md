---
aliases:
- /es/security/application_security/threats/attacker_clustering
disable_toc: false
further_reading:
- link: /security/application_security/security_signals/attacker_fingerprint
  tag: Documentación
  text: Huella digital del atacante
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: Documentación
  text: Información sobre amenazas
- link: /security/application_security/policies/inapp_waf_rules/
  tag: Documentación
  text: Reglas de WAF dentro de la aplicación
- link: /security/application_security/security_signals/
  tag: Documentación
  text: Señales de seguridad
- link: https://www.datadoghq.com/blog/attacker-clustering/
  tag: blog
  text: Detectar y responder a los ataques en evolución con Attacker Clustering
title: Agrupación de atacantes
---


## Información general

Attacker Clustering mejora el bloqueo de ataques distribuidos. Datadog App and API Protection (AAP) identifica patrones de atacantes de tráfico de señales de seguridad y te ayuda a mitigar los ataques distribuidos de manera más eficiente.

La agrupación de atacantes destaca un conjunto de atributos comunes compartidos por una parte significativa del tráfico y sugiere el bloqueo en función de esos atributos.

El bloqueo en función de los atributos del atacante significa que mantendrás tu aplicación o API protegidas aunque el atacante rote entre diferentes IP.

## ¿Qué señales se utilizan para los clústeres de atacantes?

La agrupación de atacantes se calcula para cada [señal de seguridad de AAP][4] emitida desde una regla de detección etiquetada con `category:account_takeover` o `category:fraud`

De forma predeterminada, la agrupación de atacantes se calcula para las reglas de detección de AAP que detectan abuso de API, relleno de credenciales o ataques de fuerza bruta.

Si quieres que la agrupación de atacantes se ejecute en reglas de detección personalizadas, añade estas etiquetas (tags) en el editor de reglas de detección (consulta la captura de pantalla siguiente).

{{< img src="security/application_security/threats/tag-on-detection-rule.png" alt="Captura de pantalla del editor de reglas de detección, que muestra dónde añadir las etiquetas"  >}}

## Atributos de la agrupación de atacantes

La agrupación de atacantes se calcula utilizando los siguientes atributos de la solicitud:
* Nombre del navegador
* Versión del navegador
* Nombre del sistema operativo
* Versión del sistema operativo
* Cabecera del Agent del usuario
* Encabezados de solicitud HTTP (por ejemplo, `accept-encoding`, `content-type`)
* [Huellas digitales de atacantes en Datadog][2]

Cuando se identifican los atributos del atacante, se muestran en el panel lateral de señales y en la página **Señales**. Los atributos del atacante pueden ser una combinación de los atributos enumerados anteriormente.

{{< img src="security/application_security/threats/attacker-attributes.png" alt="Captura de pantalla de señales de AAP con atributos de atacante identificados"  >}}

### Encabezados de solicitud HTTP personalizados

Si deseas utilizar encabezados de solicitud HTTP personalizados para la agrupación de atacantes, deben añadirse bajo la ruta `@http.request.headers` en tus trazas. Puedes añadir encabezados personalizados a tus trazas configurando el rastreador con la variable de entorno `DD_TRACE_REQUEST_HEADER_TAGS`. Para obtener más información sobre esta configuración, consulta [Configurar la biblioteca de rastreo de Datadog][5].

## Mecanismo de agrupación de atacantes

El algoritmo de agrupación analiza la frecuencia de los atributos en el tráfico de ataque. Selecciona los atributos que aparecen con frecuencia mientras filtras el ruido típico del tráfico. Este proceso da como resultado atributos que pueden bloquearse para detener o ralentizar al atacante.

El algoritmo rastrea los cambios en el tráfico de ataque identificando tendencias emergentes a medida que el atacante cambia de táctica (por ejemplo, cambiando cabeceras, herramientas, etc.). El clúster de atacantes se actualiza con las últimas tendencias del tráfico.

El tráfico asociado a la información sobre amenazas también se tiene en cuenta en el mecanismo de agrupación. Cuanto más correlacionado esté un atributo con la [información sobre amenazas][1], mayor será la posibilidad de crear un clúster de atacantes en torno a este atributo.

Los atributos de la agrupación de atacantes seleccionados se muestran entonces como expresiones regulares que se pueden utilizar para bloquear con [In-App WAF][3] de AAP o para filtrar el tráfico en AAP Traces Explorer para su investigación.

## Agrupación de atacantes personalizada

Si la detección automática de la agrupación de atacantes no consigue identificar los atributos adecuados, puedes crear manualmente clústeres de atacantes seleccionando atributos en el panel lateral de análisis de trazas.

Para crear un clúster de atacantes personalizado:

1. Abre el panel de análisis de traza desde una señal de seguridad.
2. Selecciona los atributos específicos que corresponden a los patrones del atacante.
3. Crea un clúster basado en los atributos seleccionados.

{{< img src="security/application_security/threats/create-custom-cluster.png" alt="El panel de análisis de trazas con el botón Crear clúster desde la búsqueda resaltado" >}}

Este enfoque manual permite crear reglas de bloqueo más específicas cuando la detección automática no capta los patrones adecuados.

{{< img src="security/application_security/threats/custom-clusters.png" alt="Una señal de AAP con clústeres personalizados organizados por atributos del atacante"  >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/how-it-works/threat-intelligence/
[2]: /es/security/application_security/security_signals/attacker_fingerprint
[3]: /es/security/application_security/security_signals/
[4]: /es/security/workload_protection/security_signals/
[5]: /es/tracing/trace_collection/library_config/