---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Errores de configuración en Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Vulnerabilidades de Cloud Security
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Crown Jewels
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="¡Únase a la Preview!">}}
Crown Jewels está en Preview. Utilice este formulario para enviar su solicitud hoy.
{{< /callout >}}

## Descripción general {#overview}

Crown Jewels es un inventario de sus recursos críticos en la nube, detectado automáticamente a partir de la telemetría que ya envía a Datadog. La lista es el punto de partida para priorizar el trabajo de remediación en Cloud Security: puede clasificar, filtrar y dirigir vulnerabilidades, errores de configuración y riesgos de identidad que están vinculados a un Crown Jewel de manera diferente al resto de sus hallazgos.

La mayoría de los equipos de seguridad tienen más hallazgos de los que pueden abordar, pero al saber cuáles recursos son más importantes, puede comenzar a atender el subconjunto de hallazgos que necesitan atención primero.

Datadog genera la lista inicial para usted analizando la telemetría existente, incluyendo APM, logs y almacenamiento en la nube. A partir de ahí, puede curar la lista para que coincida con lo que más importa en su entorno.

## Qué se detecta {#what-gets-detected}

Crown Jewels evalúa tres tipos de recursos:

| Tipo de recurso | Datos evaluados |
|---|---|
| Servicios | Servicios instrumentados por APM y servicios inferidos |
| Bases de datos | Instancias de bases de datos observadas a través de APM y Monitoreo de Bases de Datos |
| Buckets | S3 buckets observed by Agentless Scanning and Sensitive Data Scanner |

Datadog agrega un recurso a la lista cuando una o más señales de detección indican que el recurso maneja datos sensibles, contiene credenciales o ocupa una posición estructuralmente importante en su entorno.

### Señales de detección {#detection-signals}

Crown Jewels solo puede hacer detecciones basadas en las fuentes de telemetría que están habilitadas para un recurso dado. La cobertura escala con la profundidad de su instrumentación en Datadog; cuanto más rica sea su instrumentación, mayor será la superficie que Datadog puede evaluar, y por lo tanto, más precisa será su lista detectada automáticamente. 

Si falta una fuente de telemetría para un tipo de señal y Datadog no puede poblar automáticamente los recursos relacionados, aún puede agregar recursos manualmente.

| Señal | Fuente | Ejemplo |
|---|---|---|
| Secrets in APM spans | Sensitive Data Scanner on APM | Un servicio con claves de acceso de AWS observadas en atributos de span |
| Sensitive fields in logs | Sensitive Data Scanner on logs | Un servicio con números de tarjetas de crédito, correos electrónicos o credenciales detectados en eventos de logs |
| Sensitive column names | Sensitive Data Scanner on APM | Una base de datos con columnas nombradas `password`, `ssn`, `email`, etc. |
| Datos sensibles en reposo | Agentless Scanning + Sensitive Data Scanner | Un S3 bucket que contiene PII, credenciales u otro contenido sensible |
| Service dependency fan-in | APM service map | Un servicio con un alto fan-in y una amplia dependencia tiene un gran radio de impacto si se ve comprometido |
| Sensitive Data in API traffic | App and API Protection | Un servicio que expone puntos de conexión con datos sensibles como PII |

## Utilice la lista para filtrar hallazgos {#use-the-list-to-filter-findings}

Cada hallazgo en la lista de Crown Jewels está etiquetado con `@risk.is_crown_jewel:true`. La etiqueta se propaga a los hallazgos asociados con ese recurso a través del modelo de datos de seguridad de Datadog. Todos los siguientes serían marcados como hallazgos de Crown Jewel:

- Un error de configuración en una máquina virtual adjunta a un servicio Crown Jewel
- Una vulnerabilidad en una imagen de contenedor utilizada por un servicio Crown Jewel

Esta propagación le permite usar `@risk.is_crown_jewel:true` como un filtro o faceta en:

- **Vulnerability Explorer** para enfocar la remediación en hallazgos relacionados con recursos críticos.
- **Misconfiguration Explorer** para delimitar el trabajo de endurecimiento a los activos que más importan.
- **Notifications** para dirigir las notifications de manera diferente para Crown Jewel assets.
- **Findings Automation** para definir patrones de remediación personalizados para hallazgos relacionados con Crown Jewels.

Puede combinar el filtro con otros criterios; por ejemplo, puede filtrar el Vulnerability Explorer a `severity:critical` Y `@risk.is_crown_jewel:true`.

## Revise y edite la lista {#review-and-edit-the-list}

Para ver sus Crown Jewels, vaya a **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]. Datadog completa automáticamente la lista con entradas que muestran:

- El tipo y nombre del recurso.
- La señal de detección que activó la inclusión.
- Un resumen de la evidencia subyacente.

Trate la lista generada automáticamente como un borrador que puede curar para que refleje lo que realmente es crítico para su negocio. Puede:

- **Elimine** entradas que no coincidan con su entendimiento de lo que es crítico (por ejemplo, un servicio marcado debido a una cadena de URL de bajo valor).
- **Agregue** recursos que Datadog no detectó automáticamente pero que sabe que son críticos para su negocio.

## Privacidad y manejo de datos {#privacy-and-data-handling}

Crown Jewels funciona con la telemetría que ya ha enviado a Datadog. No mueve datos fuera de su cuenta de Datadog ni envía datos a terceros. La detección se ejecuta en la misma infraestructura regional que sus otros datos de Cloud Security.


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels