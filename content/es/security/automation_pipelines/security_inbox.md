---
aliases:
- /es/security/vulnerability_pipeline/security_inbox
further_reading:
- link: /security/security_inbox
  tag: Documentación
  text: Bandeja de entrada de seguridad
- link: /security/automation_pipelines
  tag: Documentación
  text: Automation Pipelines
title: Añadir a las reglas de la bandeja de entrada de seguridad
---

{{< callout url="https://www.datadoghq.com/product-preview/customize-your-security-inbox/" >}}
  Automation Pipelines está en vista previa. Para inscribirte en la vista previa de Añadir a las reglas de la bandeja de entrada de seguridad, haz clic en <strong>Solicitar acceso</strong>.
{{< /callout >}} 

Configura reglas de bandeja de entrada para gestionar eficazmente tu bandeja de entrada de seguridad, garantizando que sólo se resalten los problemas de seguridad más relevantes. Al personalizar las condiciones, puedes centrarte en las preocupaciones críticas, priorizar los riesgos clave, respaldar el cumplimiento y llamar la atención sobre problemas que de otro modo podrían pasarse por alto.

## Crear una regla de bandeja de entrada

1. En la página de [Automation Pipelines][2], haz clic en **Add a New Rule** (Añadir una nueva regla) y selecciona **Añadir a la bandeja de entrada de seguridad**.
1. Introduce un nombre descriptivo para la regla, por ejemplo, **Advertencias de anomalías en la infraestructura de nube**.
1. Utiliza las siguientes casillas para configurar los criterios de la regla:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos que la regla debe comprobar. Los tipos disponibles incluyen:
      - **Configuración errónea**
      - **Ruta de ataque**
      - **Riesgo de identidad**
      - **Hallazgo de seguridad de la API**
    - **Cualquiera de estas etiquetas (tags) o atributos**: Las etiquetas o los atributos del recurso que deben coincidir para que se aplique la regla.
1. Para añadir criterios de gravedad a la regla, haz clic en **Add Severity** (Añadir gravedad).
1. Haz clic en **Save** (Guardar). La regla se aplica inmediatamente a los nuevos hallazgos y comienza a comprobar los hallazgos existentes dentro de la siguiente hora.

## Orden de coincidencia de las reglas

Cuando Datadog identifica una vulnerabilidad, la evalúa comparándola con tu secuencia de reglas de bandeja de entrada. Empezando por la primera regla, si hay una coincidencia, Datadog añade la vulnerabilidad a la bandeja de entrada de seguridad y detiene la evaluación. Si no se produce ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentra una coincidencia o hasta que todas las reglas se comprueban y no se encuentran coincidencias.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/pipeline-vulnerability