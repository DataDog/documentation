---
aliases:
- /es/security/vulnerability_pipeline/mute
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Automation Pipelines
title: Reglas de silenciamiento
---

{{< callout url="https://www.datadoghq.com/product-preview/security-automation-pipelines/" >}}
  Automation Pipelines está en vista previa. Para inscribirte en la vista previa de las reglas de silenciamiento, haz clic en <strong>Solicitar acceso</strong>.
{{< /callout >}}

Configura las reglas de silenciamiento para agilizar las alertas de seguridad filtrando automáticamente los hallazgos no urgentes. Este enfoque ayuda a reducir el ruido de los falsos positivos conocidos y los riesgos aceptados, lo que te permite centrarte en abordar las amenazas más críticas.

## Crea una regla de silenciamiento

1. En la página [Automation Pipelines][2], haz clic en **Añadir una nueva regla** y selecciona **Silenciar**.
1. Introduce un nombre descriptivo para la regla, por ejemplo, **Avisos de anomalías de infraestructura de la nube**.
1. Utiliza las siguientes casillas para configurar los criterios de la regla:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos para los que la norma se debe check. Los tipos disponibles incluyen los siguientes:
      - **Configuración errónea**
      - **Ruta de ataque**
      - **Riesgo de identidad**
      - **Averiguación de seguridad de la API**
    - **Cualquiera de estas etiquetas (tags) o atributos**: Las etiquetas (tags) o los atributos de recursos que deben coincidir para que se aplique la regla.
1. Para añadir criterios de gravedad a la regla, haz clic en **Añadir gravedad**.
1. Especifica el motivo y la duración del silenciamiento:
    - **Motivo para silenciar**: El motivo para silenciar el hallazgo. Los motivos disponibles son los siguientes:
      - **Falso positivo**
      - **Riesgo aceptado**
      - **Pendiente de arreglo**
      - **Sin arreglo**
      - **Duplicado**
      - **Otros**
    - **Vencimiento de la regla**: La fecha de vencimiento de la regla. 
    - **Descripción adicional de motivo de silenciamiento**: Casilla opcional para detalles adicionales.
1. Haz clic en **Guardar**. La regla se aplica de inmediato a los nuevos hallazgos y comienza a check hallazgos existentes en la siguiente hora.

## Orden de coincidencia de las reglas

Cuando Datadog identifica una vulnerabilidad, la evalúa comparándola con tu secuencia de reglas de silenciamiento. Empezando por la primera regla, si hay una coincidencia, Datadog silencia la vulnerabilidad durante el tiempo especificado y deja de evaluar más. Si no se produce ninguna coincidencia, Datadog pasa a la siguiente regla. Esto proceso continúa hasta que se encuentre una coincidencia o todas las reglas se check sin una coincidencia.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/pipeline-vulnerability