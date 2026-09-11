---
aliases:
- /es/security/vulnerability_pipeline/security_inbox
further_reading:
- link: /security/security_inbox
  tag: Documentación
  text: Security Inbox
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
title: Agregar a las reglas de Security Inbox
---
{{< product-availability >}}

Configure las reglas de la bandeja de entrada para administrar su Security Inbox de manera efectiva, asegurándose de que solo se resalten los problemas de seguridad más relevantes. Al personalizar las condiciones, puede centrarse en las preocupaciones críticas, priorizar los riesgos clave, respaldar el cumplimiento y llamar la atención sobre problemas que, de otro modo, podrían pasarse por alto.

## Reglas de bandeja de entrada predeterminadas {#default-inbox-rules}

Datadog proporciona un conjunto de reglas de bandeja de entrada predeterminadas, compiladas por el equipo de investigación de Datadog Security, que completan su [Security Inbox][3] automáticamente. Estas reglas cubren los hallazgos con mayor probabilidad de representar un riesgo real en un entorno típico.

Las reglas predeterminadas aparecen junto a sus propias reglas en la página [Automatización de hallazgos][2]. Puede deshabilitar una regla predeterminada si no coincide con la forma en que su organización realiza la clasificación, y puede agregar sus propias reglas para cubrir los casos que las predeterminadas omiten.

## Crear una regla de bandeja de entrada {#create-an-inbox-rule}

1. En Datadog, vaya a **Security** > **Settings** > [Findings Automation][2]. Haga clic en **Agregar una regla nueva**, luego seleccione **Agregar a Security Inbox**. Se abre la página Create a New Rule.
1. En **Nombre de la regla**, ingrese un nombre descriptivo para la regla; por ejemplo, "Advertencias de anomalía en Cloud infraestructura".
1. Agregue los criterios de su regla en los siguientes campos:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos que la regla debe verificar. Los tipos disponibles incluyen:
      - Vulnerabilidad de código en tiempo de ejecución
      - Vulnerabilidad de código estático
      - Vulnerabilidad de biblioteca
      - Secretos (código)
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
1. Haga clic en **Guardar**. La regla se aplica a los nuevos hallazgos de inmediato y comienza a verificar los hallazgos existentes dentro de la próxima hora.

## Pedido de coincidencia de reglas {#rule-matching-order}

Cuando Datadog identifica un hallazgo, lo evalúa con respecto a su secuencia de reglas de bandeja de entrada. Comenzando con la primera regla, si hay una coincidencia, Datadog agrega el hallazgo a Security Inbox y deja de evaluar más. Si no ocurre ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentra una coincidencia o se revisan todas las reglas sin encontrar ninguna.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox
[3]: /es/security/security_inbox/