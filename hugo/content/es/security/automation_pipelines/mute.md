---
aliases:
- /es/security/vulnerability_pipeline/mute
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Pipelines de automatización
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evite que las configuraciones erróneas de la nube lleguen a producción con
    Datadog IaC Security
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
title: Silenciar reglas
---
{{< product-availability >}}

Configure reglas de silencio para optimizar las alertas de seguridad filtrando automáticamente los hallazgos que no son urgentes. Este enfoque ayuda a reducir el ruido de falsos positivos conocidos y riesgos aceptados, lo que le permite concentrarse en abordar las amenazas más críticas.

## Crear una regla de silencio {#create-a-mute-rule}

1. En Datadog, vaya a **Security** > **Settings** > [Findings Automation][2]. Haga clic en **Add a New Rule**, luego seleccione **Mute**. Se abre la página Create a New Rule.
1. En **Rule name**, ingrese un nombre descriptivo para la regla; por ejemplo, "Compensating control in place for account payment-prod".
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
1. Para agregar criterios de gravedad a la regla, haga clic en **Add Severity**.
1. Especifique el motivo y la duración del silencio:
    - **Motivo del silencio**: El motivo para silenciar el hallazgo. Los motivos disponibles incluyen:
      - Falso positivo
      - Riesgo aceptado
      - Pendiente de corrección
      - Sin corrección
      - Duplicado
      - Otro
    - **Rule expiration**: La fecha en la que expira la regla.
    - **Further description for muting reason**: Cuadro opcional para detalles adicionales.
1. Haga clic en **Guardar**. La regla se aplica a los nuevos hallazgos de inmediato y comienza a verificar los hallazgos existentes dentro de la próxima hora.

También puede crear reglas de silencio con la [API][3] o el recurso de Terraform [`datadog_security_findings_mute_rule`][4].

## Pedido de coincidencia de reglas {#rule-matching-order}

Cuando Datadog identifica un hallazgo, lo evalúa con respecto a su secuencia de reglas de silencio. Comenzando con la primera regla, si hay una coincidencia, Datadog silencia el hallazgo durante la duración especificada y deja de evaluar más. Si no ocurre ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentra una coincidencia o se revisan todas las reglas sin encontrar ninguna.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=mute
[3]: /es/api/latest/security-monitoring/create-a-mute-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_mute_rule