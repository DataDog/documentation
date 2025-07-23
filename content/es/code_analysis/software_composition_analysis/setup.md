---
algolia:
  tags:
  - software composition analysis
  - reglas de software composition analysis
  - vulnerabilidades de bibliotecas
  - SCA
description: Aprende a configurar Software Composition Analysis para analizar tus
  bibliotecas de código abierto importadas en busca de vulnerabilidades de seguridad
  conocidas antes de enviarlas a producción.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con Datadog Application
    Vulnerability Management
- link: /getting_started/application_security/software_composition_analysis
  tag: Documentación
  text: Empezando con Software Composition Analysis
- link: /security/application_security/software_composition_analysis/
  tag: Documentación
  text: Más información sobre Software Composition Analysis
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre Source Code Integration
- link: /code_analysis/static_analysis/
  tag: Documentación
  text: Más información sobre Static Analysis
is_beta: false
title: Configuración de Software Composition Analysis
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis está en vista previa.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general

Para configurar Datadog Software Composition Analysis, ve a [**Software Delivery** > **Code Analysis** (Entrega de software > COde Analysis)][6].

## Seleccionar dónde ejecutar los análisis de Software Composition Analysis
### Aplicar análisis alojados en Datadog
Los análisis de SCA pueden ejecutarse directamente en la infraestructura Datadog. Para empezar, ve a la página [**Code Analysis**][6].

### Análisis en pipelines CI
SCA se puede ejecutar en tus pipelines CI utilizando la [CLI `datadog-ci`][5]. Configura tus [API y claves de aplicación Datadog (requiere el contexto `code_analysis_read`)][3] y ejecuta trabajos de SCA en el proveedor CI respectivo.

{{< whatsnext desc="Consulta la documentación de tu proveedor de CI:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Proveedores genéricos de CI{{< /nextlink >}}
{{< /whatsnext >}}

## Seleccionar tu proveedor de gestión de código fuente
Datadog SCA admite todos los proveedores de gestión de código fuente, con compatibilidad nativa con GitHub.
### Configurar la integración GitHub
Si GitHub es tu proveedor de gestión de código fuente, debes configurar una aplicación GitHub utilizando el [cuadro de la integración GitHub][9] y debes configurar la [integración del código fuente][10] para ver fragmentos de código en línea y habilitar los [comentarios en las solicitudes pull][11].

Al instalar una aplicación GitHub, se requieren los siguientes permisos para activar determinadas funciones:

- `Content: Read`, que te permite ver fragmentos de código en Datadog.
- `Pull Request: Read & Write`, que permite a Datadog añadir comentarios sobre infracciones directamente en tus solicitudes pull mediante [comentarios en las solicitudes pull][11].

### Otros proveedores de gestión de código fuente
Si estás utilizando otro proveedor de gestión de código fuente, configura SCA para ejecutarse en tus pipelines CI utilizando la herramienta CLI `datadog-ci` y [carga los resultados][8] en Datadog.
**Debes** ejecutar un análisis de tu repositorio en la rama por defecto antes de que los resultados puedan empezar a aparecer en la página **Code Analysis**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/application_security/vulnerability_management
[2]: /es/code_analysis/
[3]: /es/account_management/api-app-keys/
[4]: /es/getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /es/code_analysis/software_composition_analysis/generic_ci_providers/
[9]: /es/integrations/github
[10]: /es/integrations/guide/source-code-integration
[11]: /es/code_analysis/github_pull_requests/