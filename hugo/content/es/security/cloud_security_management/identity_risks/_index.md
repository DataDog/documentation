---
aliases:
- /es/security/identity_risks/
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Más información sobre Cloud Security
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security
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
- link: https://www.datadoghq.com/blog/detect-cross-account-risks-aws/
  tag: Blog
  text: Detecta los riesgos de acceso entre cuentas en AWS con Datadog
title: Cloud Security Identity Risks
---

Cloud Security Identity Risks es un producto de Cloud infraestructura Entitlement Management (CIEM) que te ayuda a mitigar los riesgos de asignación de derechos en todas tus nubes. Analiza continuamente tu infraestructura en la nube y detecta problemas como privilegios administrativos persistentes, escaladas de privilegios, vacíos de permisos, grandes radios de explosión y acceso entre cuentas. También te permite resolver proactivamente los riesgos de identidad de forma continua para proteger tu infraestructura en la nube de los ataques basados en IAM. Para una remediación rápida, sugiere [políticas reducidas][4], [Datadog Workflows][3] basados en remediaciones y enlaces profundos a consolas en la nube.

<div class="alert alert-info">Cloud Security Identity Risks está disponible para AWS, Azure y GCP.</div>

## Revisión de los riesgos para la identidad

Las detecciones de Cloud Security Identity Risk incluyen usuarios, roles, grupos, políticas, instancias de EC2 y funciones de Lambda. Revisa los riesgos de identidad activos de tu organización en la [página de Resultados de Identity Risks][1].
- Utiliza la barra de búsqueda de consultas o el panel de facetas para filtrar por tipos específicos de riesgos de identidad. 
- Además de **Group by** (Agrupar por), agrupa los riesgos de identidad por **Identity Risks** (Riesgos de identidad), **Resources** (Recursos) o **Teams** (Equipos) (o **None** (Ninguno) para ver los riesgos de identidad individualmente), de modo que puedas priorizar tus esfuerzos de corrección en consecuencia.
- Pasa el ratón por encima de **Views** (Vistas) y selecciona una vista existente para aplicarla, o haz clic en **Save as new view** (Guardar como nueva vista) para volver a utilizar la configuración del explorador en el futuro.
- Selecciona un riesgo de identidad para ver hasta cinco recursos afectados, o haz clic en **View All** (Ver todos) para verlos todos. Selecciona un recurso para ver detalles adicionales en un panel lateral.

{{< img src="security/identity_risks/identity_risks_explorer_6.png" alt="Página de Resultados de Cloud Security Identity Risks" width="100%">}}

## Corregir los riesgos para la identidad

Para obtener información detallada y ayuda para la corrección, haz clic en la pestaña **Corrección**. En el siguiente ejemplo, la pestaña **Corrección** muestra el uso de permisos provisionados.

{{< img src="security/identity_risks/side_panel_remediation_tab_1.png" alt="Pestaña Corrección en el panel lateral de Identity Risks que muestra el uso de permisos provisionados" width="100%">}}

- Para remediar el riesgo de identidad, haz clic en **Fix in \<cloud provider\>** (Corregir en proveedor de nube) para actualizar el recurso directamente en la consola de tu proveedor de nube.
- Para crear un incidente de Jira y asignarlo a un equipo, haz clic en **Add Jira issue** (Añadir incidente de Jira). Consulta [Crear problemas de Jira para problemas de Cloud Security][2] para obtener más información.
- Para ver una política reducida sugerida basada en el uso real, haz clic en **View Suggested Policy** (Ver política sugerida). A continuación, puedes hacer clic en  **Edit Policy in \<cloud provider\>** (Editar política en el proveedor de nube) para aplicar los cambios sugeridos:

  {{< img src="security/identity_risks/downsized_policy_3.png" alt="Revisar sugerencias para reducir una política en el cuadro de diálogo de la política reducida sugerida" width="100%">}}

  También puedes utilizar la corrección de Terraform para generar una solicitud pull en GitHub con cambios en el código que solucionen el riesgo para la identidad subyacente o aprovechar la [automatización de flujos de trabajo][3] para crear flujos de trabajo automatizados para los riesgos para la identidad (con o sin participación humana).

## Obtén visibilidad del acceso a los recursos en riesgo

En Misconfigurations, Identity Risks y Security Inbox, puedes hacer clic en la pestaña **Access Insights** (Información de acceso) para ver:
- A qué entidades puede acceder el recurso a través de tus cuentas
- Qué entidades principales pueden acceder directa o indirectamente al recurso

Este ejemplo muestra todas las identidades a las que puede acceder este usuario de AWS IAM:

{{< img src="security/csm/access_insights_3.png" alt="El panel Información de acceso, que muestra una lista de usuarios de AWS IAM con grandes brechas de permiso" width="100%">}}

En la sección **¿A qué puede acceder este recurso?**, puedes:
- Consultar la cuenta asociada a cada entidad y los detalles sobre el tipo de acceso
- Buscar entidades o filtrarlas por tipo de entidad o cuenta
- Ver la lista de políticas excluidas
- Utiliza las pestañas **All**, **Direct Access** y **Indirect Access** (Todas, Acceso directo y Acceso indirecto) para filtrar las entidades que aparecen en la tabla.
- Haz clic en el menú desplegable **Actions** (Acciones) situado junto a una entidad para verla en Resource Catalog, o actualizar tu configuración en la consola de AWS IAM

En la sección **¿Quién puede acceder a este recurso?**, puedes:
- Consulta los riesgos asociados a cada entidad principal en la columna **Risks** (Riesgos), así como el tipo de **Path** (Ruta) que puede seguir la entidad principal (directa o indirecta) para acceder al recurso.
- Filtrar las entidades principales por nombre, tipo, accesibilidad pública o acceso administrativo
- Utiliza las pestañas **All**, **Direct Access** y **Indirect Access** (Todas, Acceso directo y Acceso indirecto) para filtrar las entidades principales que aparecen en la tabla.
- Haz clic en el menú desplegable **Actions** (Acciones) situado junto a una entidad principal para verla en Resource Catalog, o actualizar tu configuración en la consola de AWS IAM


## Integración AWS IAM Access Analyzer

Datadog CIEM está integrado con [AWS IAM Access Analyzer][5] para mejorar aún más las detecciones de brechas de permisos. Si utilizas AWS IAM Access Analyzer, Datadog CIEM aprovecha automáticamente sus hallazgos sobre accesos no utilizados para enriquecer las detecciones de brechas de permisos y las recomendaciones de políticas reducidas.

<div class="alert alert-info">Si está habilitando AWS IAM Access Analyzer por primera vez, hay un coste adicional de AWS asociado a esta habilitación y podrían pasar hasta dos horas antes de que la información de AWS IAM Access Analyzer esté disponible.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/identities
[2]: /es/security/cloud_security_management/guide/jira
[3]: /es/security/cloud_security_management/workflows
[4]: /es/security/cloud_security_management/identity_risks/#:~:text=Click%20View%20Suggested%20Policy%20to%20view%20a%20suggested%20downsized%20policy%20based%20on%20the%20actual%20usage.
[5]: https://aws.amazon.com/iam/access-analyzer/