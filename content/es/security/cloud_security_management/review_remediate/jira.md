---
aliases:
- /es/security/cloud_security_management/guide/jira
further_reading:
- link: /security/cloud_security_management/guide
  tag: Documentación
  text: Guías de Cloud Security
- link: /integrations/jira/
  tag: Documentación
  text: Integración de Datadog y Jira
products:
- icon: cloud-security-management
  name: Cloud Security Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Riesgos de identidad de seguridad en la nube
  url: /security/cloud_security_management/identity_risks/
title: Crear problemas de Jira para problemas de Cloud Security
---

{{< product-availability >}}

Utiliza la [integración de Jira][1] para crear problemas de Jira para los recursos afectados por un problema de seguridad de Cloud Security. Jira para Cloud Security está disponible para [Cloud Security Misconfigurations][3] y [Cloud Security Identity Risks][4].

**Notas**:
- Para crear problemas de Jira, debes tener el permiso `security_monitoring_findings_write`. Consulta [Control de acceso basado en roles][2] para obtener más información sobre los roles predeterminados de Datadog y los permisos de control de acceso granular basados en roles disponibles para Cloud Security.
- En este momento, solo puedes crear un problema de Jira por hallazgo.

## Configurar la integración de Jira

Para crear problemas de Jira para problemas de seguridad de Cloud Security, debes configurar la [integración de Jira][5]. Para obtener instrucciones detalladas, consulta la documentación de la integración de [Jira][1].

## Crear un problema en Jira para los recursos afectados

{{< tabs >}}

{{% tab "Cloud Security Misconfigurations" %}}

Para crear un problema en Jira para uno o más recursos afectados por una configuración errónea:

1. En el [Explorer de errores de configuración][1], selecciona un error de configuración.
2. En **Resources Impacted** (Recursos afectados), selecciona uno o varios resultados.
3. En el menú desplegable **Actions** (Acciones) que aparece en la parte superior, selecciona **Create Jira Issue** (Crear problema de Jira).
4. Elige si deseas crear un problema único o varias (un problema por cada recurso).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

También puedes crear un problema de Jira desde el panel lateral de problemas independientes.

1. En el [Explorer de errores de configuración][1], configura el filtro Agrupar por en **Resources** (Recursos).
2. Selecciona un recurso.
3. En la pestaña **Misconfigurations** (Errores de configuración), selecciona una configuración errónea.
4. Haz clic en **Create Jira Issue** (Crear problema de Jira).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

Después de crear el problema, aparecerá un enlace al problema de Jira en el panel lateral.

[1]: https://app.datadoghq.com/security/compliance

{{% /tab %}}

{{% tab "Cloud Security Identity Risks" %}}

Para crear un problema en Jira para uno o más recursos afectados por un riesgo de identidad:

1. En el [Explorer de riesgos de identidad][1], selecciona un riesgo de identidad.
2. En **Resources Impacted** (Recursos afectados), selecciona uno o varios resultados.
3. En el menú desplegable **Actions** (Acciones) que aparece en la parte superior, selecciona **Create Jira Issue** (Crear problema de Jira).
4. Elige si deseas crear un problema único o varias (un problema por cada recurso).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

También puedes crear un problema de Jira desde el panel lateral de problemas independientes.

1. En el [Explorer de riesgos de identidad][1], configura el filtro Agrupar por en **Resources** (Recursos).
2. Selecciona un recurso.
3. En la pestaña **Misconfigurations** (Errores de configuración), selecciona un riesgo de identidad.
4. Haz clic en **Create Jira Issue** (Crear problema de Jira).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

Después de crear el problema, aparecerá un enlace al problema de Jira en el panel lateral.

[1]: https://app.datadoghq.com/security/identities

{{% /tab %}}

{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/jira/
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: /es/security/cloud_security_management/misconfigurations/
[4]: /es/security/cloud_security_management/identity_risks/
[5]: https://app.datadoghq.com/integrations/jira?search=jira