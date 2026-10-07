---
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Automation Pipelines
title: Configurar normas de fecha de caducidad
---

{{< callout url="https://www.datadoghq.com/product-preview/security-automation-pipelines/" >}}
  Automation Pipelines está en Vista Previa. Para inscribirte en la vista previa de las reglas de fecha de caducidad, haz clic en <strong>Solicitar acceso</strong>.
{{< /callout >}} 

Configura reglas de fecha de caducidad para garantizar que las vulnerabilidades se solucionen dentro de los plazos de SLO especificados. Al establecer estas fechas de caducidad, puedes automatizar la rendición de cuentas, cumplir los requisitos de conformidad y priorizar la pronta corrección de los problemas de seguridad, evitando así posibles vulnerabilidades.

## Crea una regla de fecha de caducidad

1. En la página [Automation Pipelines][2], haz clic en **Añadir una nueva regla** y selecciona **Fijar fecha de caducidad**.
1. Introduce un nombre descriptivo para la regla, por ejemplo, **Avisos de anomalías en la infraestructura de la nube**.
1. Utiliza las siguientes casillas para configurar los criterios de la regla:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos para los que la norma debe check. Los tipos disponibles incluyen los siguientes:
      - **Vulnerabilidad del código de aplicación**
      - **Vulnerabilidad de las bibliotecas de aplicaciones**
      - **Vulnerabilidad de las imágenes del contenedor**
      - **Configuración errónea**
      - **Ruta de Ataque**
      - **Riesgo de identidad**
      - **Averiguación de seguridad de la API**
    - **Cualquiera de estas etiquetas (tags) o atributos**: Las etiquetas (tags) o los atributos del recurso que deben coincidir para que se aplique la regla.
1. Establezca una fecha de caducidad para cada nivel de gravedad que requiera una, que entra en vigencia a partir del descubrimiento de una vulnerabilidad de gravedad correspondiente.
1. Haz clic en **Guardar**. La regla se aplica inmediatamente a los nuevos hallazgos y comienza a check hallazgos existentes dentro en la siguiente hora.

## Dónde aparecen las fechas de caducidad

Cuando un hallazgo tiene una fecha de caducidad, puedes verla en estas ubicaciones:

- Facetas de explorador
- Panel lateral de hallazgos
- Notificaciones
- Descripciones de tickets de Jira
- Informar métricas (como un booleano "atrasado") para identificar los equipos o repositorios con las vulnerabilidades más atrasadas.

## Orden de coincidencia de las reglas

Cuando Datadog identifica una vulnerabilidad, la evalúa comparándola con tu secuencia de reglas de fecha de caducidad. Empezando por la primera regla, si hay una coincidencia, Datadog establece una fecha de caducidad para la vulnerabilidad durante el tiempo especificado y detiene la evaluación. Si no se produce ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentre una coincidencia o todas las reglas se check sin una coincidencia.

## Eliminar fechas de caducidad

Cuando se gestionan vulnerabilidades, las fechas de caducidad pueden eliminarse en varias condiciones, como por ejemplo, las siguientes:

- La regla de detección que activó la vulnerabilidad pasa con éxito.
- La vulnerabilidad se silencia, ya sea manual o automáticamente a través de una regla de silenciamiento.
- La regla de fecha de caducidad asociada a la vulnerabilidad se desactiva o se elimina.
- La regla de fecha de caducidad asociada se modifica para que sus criterios ya no coincidan con la vulnerabilidad.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/pipeline-vulnerability