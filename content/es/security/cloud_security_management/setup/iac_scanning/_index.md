---
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security Management
- link: /security/cloud_security_management/misconfigurations
  tag: Documentación
  text: CSM Misconfigurations
- link: /security/cloud_security_management/identity_risks
  tag: Guía
  text: CSM Identity Risks
title: Configuración del análisis de IaC para Cloud Security Management
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  El análisis estático de infraestructura como código (IaC) está en Vista previa. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

Sigue estas instrucciones para activar el análisis de infraestructura como código (IaC) para Cloud Security Management (CSM). El análisis de IaC está disponible para [CSM Misconfigurations][1] y [CSM Identity Risks][2].

<div class="alert alert-info">El análisis estático de IaC admite GitHub para el control de versiones y Terraform para la infraestructura como código.</div>

## Configurar la integración de GitHub

Sigue [las instrucciones][3] para crear una aplicación de GitHub para tu organización.

<div class="alert alert-info">Para utilizar el análisis de IaC, debes conceder permisos de <code>lectura y escritura</code> a la aplicación de GitHub para <code>contenidos</code> y <code>solicitudes de extracción</code>. Estos permisos pueden aplicarse a todos los repositorios o a algunos de ellos.
</div>

## Activar el análisis de IaC para tus repositorios

Después de configurar la integración de GitHub, activa el análisis de IaC para los repositorios de tu cuenta de GitHub.

1. En la [página CSM Setup][4] (Configuración de CSM), amplía la sección **Source Code Integrations** (Integraciones de código fuente).
2. Haz clic en **Configure** (Configurar) para la cuenta de GitHub que quieres configurar.
3. Para activar la IaC:
    - Todos los repositorios: activa la opción **Enable Infrastructure as Code (IaC) Scanning** (Activar el análisis de infraestructura como código [IaC]).
    - Un solo repositorio: activa la opción **IAC Scanning** (Análisis de IAC) para el repositorio específico.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/misconfigurations
[2]: /es/security/cloud_security_management/identity_risks
[3]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup