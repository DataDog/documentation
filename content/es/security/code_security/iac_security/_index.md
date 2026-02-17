---
aliases:
- /es/security/cloud_security_management/iac_scanning/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evitar que los errores de configuración de la nube lleguen a la producción
    con Datadog IaC Security
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configurar IaC Security
- link: /security/code_security/iac_security/exclusions
  tag: Documentación
  text: Configurar exclusiones de IaC Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentación
  text: Reglas de IaC Security
title: Infrastructure as Code (IaC) Security
---

Datadog Infrastructure as Code (IaC) Security detecta errores de configuración en el código de Terraform antes de su despliegue. Señala problemas como la falta de cifrado o el acceso demasiado permisivo en los archivos almacenados en los repositorios de GitHub conectados. Los tipos de archivos compatibles incluyen archivos Terraform independientes y módulos locales.

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="Panel lateral de errores de configuración de IaC en el que se muestran detalles del problema de alta gravedad activado por IMDSv1, incluidos un resumen de seguridad, un fragmento de código, marcas de tiempo de detección y pasos de corrección." width="100%">}}

## Cómo funciona

IaC Security se integra con tus repositorios de GitHub para buscar continuamente errores de configuración. Analiza cada commit en todas las ramas y realiza un análisis diario completo de cada repositorio configurado. Los hallazgos aparecen cuando se detectan infracciones y se asocian con el repositorio, la rama y la ruta de archivo relevantes. Esto te permite identificar, priorizar y corregir errores de configuración directamente en el origen.

## Capacidades clave

### Revisar y corregir infracciones en solicitudes de extracción

Cuando una solicitud de extracción de GitHub incluye cambios en la infraestructura como código, Datadog añade comentarios en línea para señalar cualquier infracción. Cuando corresponde, también sugiere correcciones de código que pueden aplicarse directamente en la solicitud de extracción. También puedes abrir una nueva solicitud de extracción desde Datadog para corregir un hallazgo. Para obtener más información, consulta [Solicitudes de extracción de GitHub][5].

### Ver y filtrar los hallazgos

Después de configurar IaC Security, cada commit de un repositorio analizado activa un análisis. Los hallazgos se resumen en la página [Vulnerabilidades de Code Security][3] y se agrupan por repositorio en la página [Repositorios de Code Security][6].

Utiliza filtros para delimitar los resultados:

- Gravedad
- Estado (abierto, silenciado, fijo)
- Resource type
- Proveedor de la nube
- Ruta del archivo
- Equipo
- Repositorio

Haz clic en cualquier hallazgo para abrir un panel lateral que muestra:

- **Detalles**: Una descripción y el código relevante que ha activado el hallazgo. (Para ver fragmentos de código, [instala la aplicación GitHub][9]).
- **Solución**: Si están disponibles, se sugieren correcciones de código para los hallazgos que admiten la corrección.

### Crear tickets de Jira a partir de hallazgos

Puedes crear un ticket bidireccional de Jira directamente desde cualquier hallazgo para realizar un seguimiento de los problemas y solucionarlos en tus flujos de trabajo existentes. El estado del ticket permanece sincronizado entre Datadog y Jira. Para obtener más información, consulta [Sincronización bidireccional de tickets con Jira][4].

### Silenciar los hallazgos

Para eliminar un hallazgo, haz clic en **Mute** (Silenciar) en el panel de detalles del hallazgo. Se abre un flujo de trabajo, donde puedes [crear una regla de silenciado][10] para el filtrado contextual por valores de etiqueta (tag) (por ejemplo, por `service` o `environment`). Silenciar un hallazgo lo oculta y lo excluye de los informes.

Para restaurar un hallazgo silenciado, haz clic en **Unmute** (Anular el modo de silencio) en el panel de detalles. También puedes utilizar el filtro **Estado** en la página [Vulnerabilidades de Code Security][3] para revisar los hallazgos silenciados.

### Excluir reglas, archivos o recursos específicos

Puedes configurar exclusiones para evitar que ciertos hallazgos aparezcan en los resultados del análisis. Las exclusiones pueden basarse en el ID de la regla, la ruta del archivo, el tipo de recurso, la gravedad o la etiqueta.

Las exclusiones se gestionan a través de un archivo de configuración o comentarios en línea en tu código IaC. Para ver los formatos compatibles y ejemplos de uso, consulta [Configurar exclusiones de IaC Security][7].

## Siguientes pasos

1. [Configura IaC Security][1] en tu entorno.
2. Configura [exclusiones de análisis][2] para reducir los falsos positivos o ignorar los resultados esperados.
3. Revisa y clasifica los hallazgos en la página [Vulnerabilidades de Code Security][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/iac_security/setup
[2]: /es/security/code_security/iac_security/exclusions
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /es/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /es/security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /es/security/code_security/iac_security/exclusions/?tab=yaml
[8]: /es/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /es/security/automation_pipelines/