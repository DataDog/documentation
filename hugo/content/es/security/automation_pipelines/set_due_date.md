---
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Pipelines de automatización
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Establecer reglas de fecha de vencimiento
---
{{< product-availability >}}

Configure reglas de fecha de vencimiento para garantizar que los hallazgos se aborden dentro de los plazos de SLO especificados. Al establecer estas fechas de vencimiento, puede automatizar la responsabilidad, cumplir con los requisitos de cumplimiento y priorizar la pronta corrección de los problemas de seguridad, evitando así una posible explotación.

## Cree una regla de fecha de vencimiento {#create-a-due-date-rule}

1. En Datadog, vaya a **Security** > **Settings** > [Findings Automation][2]. Haga clic en **Agregar una nueva regla**, luego seleccione **Establecer fecha de vencimiento**. Se abre la página Create a New Rule.
1. En **Nombre de la regla**, ingrese un nombre descriptivo para la regla; por ejemplo, "Advertencias de anomalía en Cloud infraestructura".
1. Agregue los criterios de su regla en los siguientes campos:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos que la regla debe verificar. Los tipos disponibles incluyen:
      - Vulnerabilidad de código en tiempo de ejecución
      - Vulnerabilidad de código estático
      - Vulnerabilidad de biblioteca
      - Secreto
      - Infraestructura como código
      - Vulnerabilidad de imagen de contenedor
      - Vulnerabilidad de servidor
      - Configuración incorrecta
      - Ruta de ataque
      - Riesgo de identidad
      - Seguridad de API
      - Actividad de carga de trabajo
    - **Cualquiera de estas etiquetas o atributos**: Las etiquetas o atributos del recurso que deben coincidir para que se aplique la regla.
1. Establezca una fecha de vencimiento para cada nivel de gravedad que la necesite.
1. Si la regla incluye un tipo de hallazgo basado en CVE (biblioteca, imagen de contenedor o vulnerabilidad de servidor), en **Calcular fechas de vencimiento desde**, seleccione la fecha base para el reloj del SLA:
   - **Fecha de primera detección**: Inicia el reloj del SLA cuando Datadog detecta el hallazgo por primera vez.
   - **Fecha de disponibilidad del parche**: Inicia el reloj del SLA cuando se publica un parche para la vulnerabilidad. Útil cuando no desea que los equipos incumplan el SLA en avisos que aún no pueden corregir.

   Para todos los demás tipos de hallazgos, siempre se utiliza la fecha de la primera detección.
1. Haga clic en **Guardar**. La regla se aplica a los nuevos hallazgos de inmediato y comienza a verificar los hallazgos existentes dentro de la próxima hora.

También puede crear reglas de fecha de vencimiento con la [API][3] o el recurso de Terraform [`datadog_security_findings_due_date_rule`][4].

## Dónde aparecen las fechas de vencimiento {#where-due-dates-appear}

Cuando un hallazgo tiene una fecha de vencimiento, puede verla en estas ubicaciones:

- Facetas del explorador
- Panel lateral de hallazgos
- Notifications
- Descripciones de tickets de Jira
- Métricas de informes (como un booleano de "vencido") para identificar equipos o repositorios con la mayor cantidad de vulnerabilidades vencidas

## Pedido de coincidencia de reglas {#rule-matching-order}

Cuando Datadog identifica un hallazgo, lo evalúa con respecto a su secuencia de reglas de fecha de vencimiento. Comenzando con la primera regla, si hay una coincidencia, Datadog establece una fecha de vencimiento en el hallazgo para la duración especificada y deja de evaluar más. Si no ocurre ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentra una coincidencia o se revisan todas las reglas sin encontrar ninguna.

## Eliminación de fechas de vencimiento {#removing-due-dates}

Al administrar hallazgos, las fechas de vencimiento pueden eliminarse bajo diversas condiciones, tales como:

- La regla de detección que activó el hallazgo se cumple satisfactoriamente.
- El hallazgo se silencia, ya sea de forma manual o automática mediante una regla de silencio.
- La regla de fecha de vencimiento asociada con el hallazgo se deshabilita o se elimina.
- La regla de fecha de vencimiento asociada se modifica, de modo que sus criterios ya no coincidan con el hallazgo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=set_due_date
[3]: /es/api/latest/security-monitoring/create-a-due-date-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_due_date_rule