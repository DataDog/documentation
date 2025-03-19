---
aliases:
- /es/security/identity_risks/
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Obtener más información sobre Cloud Security Management
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security Management
- link: https://www.datadoghq.com/blog/datadog-ciem/
  tag: Blog
  text: Encontrar y corregir los riesgos para la identidad con Datadog CIEM
- link: /integrations/jira/
  tag: Documentación
  text: Obtener más información sobre la integración Jira
- link: /service_management/workflows/
  tag: Documentación
  text: Obtener más información sobre la automatización de flujos (flows) de trabajo
- link: https://www.datadoghq.com/blog/datadog-ciem-aws-iam-access-analyzer/
  tag: Blog
  text: Identificar y corregir brechas de permisos en AWS con Datadog CIEM y AWS IAM
    Access Analyzer
title: Cloud Security Management Identity Risks
---

Cloud Security Management Identity Risks (CSM Identity Risks) es un producto de Cloud Infrastructure Entitlement Management (CIEM) que te ayuda a mitigar los riesgos relacionados con derechos en todas tus nubes. Analiza continuamente tu infraestructura en la nube y detecta problemas como privilegios administrativos persistentes, escaladas de privilegios, vacíos de permisos, grandes blast-radius y acceso entre cuentas. También te permite resolver proactivamente los riesgos para la identidad de forma continua a fin de proteger tu infraestructura en la nube de los ataques basados en IAM. Para una corrección rápida, te sugiere [políticas reducidas][4], correcciones basadas en [flujos de trabajo Datadog][3] y enlaces profundos a consolas en la nube.

<div class="alert alert-info">CSM Identity Risks está disponible para AWS, Azure y GCP.</div>

## Revisión de los riesgos para la identidad

Revisa los riesgos para la identidad activos de tu organización en el [Explorador de riesgos de identidad][1]. Utiliza las opciones **Agrupar por** para filtrar por **Riesgos de identidad**, **Recursos** o **Ninguno** (riesgos de identidad individuales). Consulta detalles adicionales en el panel lateral.

Las detecciones de CSM Identity Risks incluyen usuarios, roles, grupos, políticas, instancias de EC2 y funciones Lambda.

{{< img src="security/identity_risks/identity_risks_explorer_3.png" alt="Página del Explorador de CSM Identity Risks" width="100%">}}

## Corregir los riesgos para la identidad

Para obtener información detallada y ayuda para la corrección, haz clic en la pestaña **Corrección**. En el siguiente ejemplo, la pestaña **Corrección** muestra el uso de permisos provisionados.

{{< img src="security/identity_risks/side_panel_remediation_tab.png" alt="Pestaña Corrección en el panel lateral de Identity Risks que muestra el uso de permisos provisionados" width="80%">}}

Haz clic en **View Suggested Policy** (Ver política sugerida) para ver una política reducida sugerida basada en el uso real.

{{< img src="security/identity_risks/downsized_policy.png" alt="Revisar sugerencias para reducir una política en el cuadro de diálogo de la política reducida sugerida" width="100%">}}

Para corregir el riesgo de identidad, haga clic en **Fix in AWS** (Reparar en AWS) para actualizar el recurso en la consola IAM de AWS. Para crear una incidencia de Jira y asignarla a un equipo, haz clic en **Add Jira issue** (Añadir incidencia de Jira). Para obtener más información, consulta [Crear incidencias de Jira para problemas de Cloud Security Management][2].

{{< img src="security/identity_risks/side_panel_action_buttons_2.png" alt="Corregir riesgos para la identidad utilizando el botón de acciones del panel lateral" width="100%">}}

También puedes utilizar la corrección de Terraform para generar una solicitud pull en GitHub con cambios en el código que solucionen el riesgo para la identidad subyacente o aprovechar la [automatización de flujos de trabajo][3] para crear flujos de trabajo automatizados para los riesgos para la identidad (con o sin participación humana).

## Integración AWS IAM Access Analyzer

Datadog CIEM está integrado con [AWS IAM Access Analyzer][5] para mejorar aún más las detecciones de brechas de permisos. Si utilizas AWS IAM Access Analyzer, Datadog CIEM aprovecha automáticamente sus hallazgos sobre accesos no utilizados para enriquecer las detecciones de brechas de permisos y las recomendaciones de políticas reducidas.

<div class="alert alert-info">Si está habilitando AWS IAM Access Analyzer por primera vez, hay un coste adicional de AWS asociado a esta habilitación y podrían pasar hasta dos horas antes de que la información de AWS IAM Access Analyzer esté disponible.</div>

{{< img src="security/identity_risks/aws_iam_access_analyzer.png" alt="Banner de enriqueceimiento de permisos, detección de brechas y recomendaciones de políticas de AWS IAM Access Analyzer" width="100%">}}

## Vídeo de la visita guiada

El siguiente vídeo ofrece información general de cómo habilitar y utilizar CSM Identity Risks:

{{< img src="security/csm/how-to-use-csm-identity-risks.mp4" alt="Vídeo que ofrece información general de cómo instalar y utilizar CSM Identity Risks" video=true >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /es/security/cloud_security_management/guide/jira
[3]: /es/security/cloud_security_management/workflows
[4]: /es/security/cloud_security_management/identity_risks/#:~:text=Click%20View%20Suggested%20Policy%20to%20view%20a%20suggested%20downsized%20policy%20based%20on%20the%20actual%20usage.
[5]: https://aws.amazon.com/iam/access-analyzer/