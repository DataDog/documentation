---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Configuraciones erróneas de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: Blog
  text: Priorice los hallazgos de seguridad con Datadog Runtime Prioritization Engine
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: Blog
  text: Cómo cambia la directiva BOD 26-04 de CISA la priorización de vulnerabilidades
title: Crown Jewels
---
## Descripción general {#overview}

Crown Jewels es un inventario de sus recursos en la nube más críticos, detectados automáticamente a partir de la telemetría que ya envía a Datadog. La lista es el punto de partida para priorizar el trabajo de remediación en Cloud Security: puede ordenar, filtrar y enrutar vulnerabilidades, configuraciones erróneas y riesgos de identidad vinculados a un recurso crítico de manera diferente al resto de sus hallazgos.

La mayoría de los equipos de seguridad tienen más hallazgos de los que pueden gestionar, pero al saber qué recursos son los más importantes, puede comenzar a abordar el subconjunto de hallazgos que requieren atención primero.

Datadog genera la lista inicial para usted analizando la telemetría existente, incluidos APM, registros y almacenamiento en la nube. A partir de ahí, puede organizar la lista para que coincida con lo que es más importante en su entorno.

## Qué se detecta {#what-gets-detected}

Crown Jewels evalúa tres tipos de recursos:

| Tipo de recurso | Datos evaluados |
|---|---|
| Servicios | Servicios instrumentados con APM y servicios inferidos |
| Bases de datos | Instancias de bases de datos observadas a través de APM y Database Monitoring |
| Buckets | Buckets de S3 observados mediante Agentless Scanning y Sensitive Data Scanner |

Datadog añade un recurso a la lista cuando una o más señales de detección indican que el recurso maneja datos confidenciales, contiene credenciales o se encuentra en una posición estructuralmente importante en su entorno.

### Señales de detección {#detection-signals}

Crown Jewels solo puede realizar detecciones basadas en las fuentes de telemetría que están habilitadas para un recurso determinado. La cobertura aumenta con la profundidad de su instrumentación de Datadog; cuanto más completa sea su instrumentación, mayor será la superficie que Datadog puede evaluar y, por lo tanto, más precisa podrá ser su lista detectada automáticamente. 

Si falta una fuente de telemetría para un tipo de señal y Datadog no puede completar los recursos relacionados automáticamente, aún puede agregar recursos manualmente.

| Señal | Fuente | Ejemplo |
|---|---|---|
| Secretos en tramos de APM | Sensitive Data Scanner en APM | Un servicio con claves de acceso de AWS observado en atributos de tramo |
| Campos confidenciales en registros | Sensitive Data Scanner en registros | Un servicio con números de tarjeta de crédito, correos electrónicos o credenciales detectados en registros |
| Nombres de columnas confidenciales | Sensitive Data Scanner en APM | Una base de datos con columnas llamadas `password`, `ssn`, `email`, etc. |
| Datos confidenciales en reposo | Agentless Scanning + Sensitive Data Scanner | Un bucket de S3 que contiene PII, credenciales u otro contenido confidencial |
| Fan-in de dependencia de servicio | Mapa de servicios de APM | Un servicio con alto fan-in y una amplia dependencia tiene un gran radio de impacto si se ve comprometido |
| Datos confidenciales en el tráfico de API | App and API Protection | Un servicio que expone puntos de conexión con datos confidenciales como PII |

## Utilice la lista para filtrar los hallazgos {#use-the-list-to-filter-findings}

Cada hallazgo en la lista de Crown Jewels está etiquetado con `@risk.is_crown_jewel:true`. La etiqueta se propaga a los hallazgos asociados con ese recurso a través del modelo de datos de seguridad de Datadog. Todo lo siguiente se marcaría como hallazgos de Crown Jewels:

- Una configuración errónea en una máquina virtual conectada a un servicio Crown Jewels
- Una vulnerabilidad en una imagen de contenedor utilizada por un servicio Crown Jewels

Esta propagación le permite usar `@risk.is_crown_jewel:true` como filtro o faceta en:

- **Vulnerability Explorer** para enfocar la corrección en los hallazgos vinculados a recursos críticos.
- **Configuración errónea Explorer** para limitar el trabajo de fortalecimiento a los activos más importantes.
- **Notifications** para enrutar las notificaciones de manera diferente para los activos Crown Jewels.
- **Findings Automation** para definir patrones de corrección personalizados para hallazgos relacionados con Crown Jewels.

Puede combinar el filtro con otros criterios; por ejemplo, puede filtrar el Vulnerability Explorer por `severity:critical` Y `@risk.is_crown_jewel:true`.

## Revise y edite la lista {#review-and-edit-the-list}

Para ver sus Crown Jewels, vaya a **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]. Datadog completa automáticamente la lista con entradas que muestran:

- El tipo de recurso y el nombre.
- La señal de detección que activó la inclusión.
- Un resumen de la evidencia subyacente.

Trate la lista generada automáticamente como un borrador que puede editar para que refleje lo que es realmente crítico para su negocio. Usted puede:

- **Elimine** las entradas que no coincidan con su comprensión de lo que es crítico (por ejemplo, un servicio marcado debido a una cadena de URL de bajo valor).
- **Agregue** recursos que Datadog no detectó automáticamente pero que usted sabe que son críticos para su negocio.

## Privacidad y manejo de datos {#privacy-and-data-handling}

Crown Jewels se ejecuta con la telemetría que ya ha enviado a Datadog. No mueve datos fuera de su cuenta de Datadog ni envía datos a terceros. La detección se ejecuta en la misma infraestructura regional que sus otros datos de Cloud Security.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels