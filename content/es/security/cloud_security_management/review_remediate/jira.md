---
aliases:
- /es/security/cloud_security_management/guide/jira
further_reading:
- link: /security/cloud_security_management/guide
  tag: Documentación
  text: Guías de Cloud Security Management
- link: /integrations/jira/
  tag: Documentación
  text: Integración de Datadog Jira
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Riesgos de identidad de CSM
  url: /security/cloud_security_management/identity_risks/
title: Crear problemas de Jira para problemas en Cloud Security Management
---

{{< product-availability >}}

Utilice la [integración de Jira][1] para crear problemas de Jira para los recursos afectados por un problema de seguridad de Cloud Security Management (CSM). Jira para Cloud Security Management está disponible para [CSM Misconfigurations][3] y [CSM Identity Risks][4].

**Notas**:
- Para crear problemas de Jira, debes tener el permiso `security_monitoring_findings_write`. Consulta [Control de acceso basado en roles][2] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para CSM.
- En este momento, solo puedes crear un problema de Jira por hallazgo.

## Configurar la integración de Jira

Para crear problemas de Jira para problemas de seguridad de CSM, debes configurar la [integración de Jira][5]. Para obtener instrucciones detalladas, consulta la documentación de la integración de [Jira][1].

## Crear un problema en Jira para los recursos afectados

{{< tabs >}}

{{% tab "CSM Misconfigurations" %}}

Para crear un problema en Jira para uno o más recursos afectados por una configuración errónea:

1. En el [Misconfigurations Explorer][1], selecciona un error de configuración.
2. En **Resources Impacted** (Recursos afectados), selecciona uno o varios resultados.
3. En el menú desplegable **Actions** (Acciones) que aparece en la parte superior, selecciona **Create Jira Issue** (Crear problema de Jira).
4. Elige si deseas crear un problema único o varias (un problema por cada recurso).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

También puedes crear un problema de Jira desde el panel lateral de problemas independientes.

1. En el [Misconfigurations Explorer][1], establece el filtro Group By (Agrupar por) en **Resources** (Recursos).
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

{{% tab "CSM Identity Risks" %}}

Para crear un problema en Jira para uno o más recursos afectados por un riesgo de identidad:

1. En el [Identity Risks Explorer][1], selecciona un riesgo de identidad.
2. En **Resources Impacted** (Recursos afectados), selecciona uno o varios resultados.
3. En el menú desplegable **Actions** (Acciones) que aparece en la parte superior, selecciona **Create Jira Issue** (Crear problema de Jira).
4. Elige si deseas crear un problema único o varias (un problema por cada recurso).
5. Selecciona una cuenta de Jira.
6. Selecciona el proyecto de Jira al que deseas asignar el problema.
7. Selecciona el tipo de problema entre las opciones disponibles. En función del tipo de problema, es posible que debas introducir información adicional.
8. Haz clic en **Create Issue** (Crear problemas).

También puedes crear un problema de Jira desde el panel lateral de problemas independientes.

1. En el [Identity Risks Explorer][1], establece el filtro Group By (Agrupar por) en **Resources** (Recursos).
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