---
aliases:
- /es/security/cloud_security_management/setup/source_code_integrations
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security Management
- link: /security/cloud_security_management/misconfigurations
  tag: Documentación
  text: Configuraciones erróneas de CSM
- link: /security/cloud_security_management/identity_risks
  tag: Guía
  text: Riesgos de identidad de CSM
title: Configuración de la corrección de IaC para Cloud Security Management
---

Sigue estas instrucciones para activar la corrección de infraestructura como código (IaC) para Cloud Security Management (CSM). La corrección de IaC está disponible para [CSM Misconfigurations][1] y [CSM Identity Risks][2].

<div class="alert alert-info">La corrección estática de IaC es compatible con GitHub para el control de versiones y Terraform para la infraestructura como código.</div>

## Configurar la integración GitHub

Sigue [las instrucciones][3] para crear una aplicación GitHub para tu organización.

<div class="alert alert-info">Para utilizar la corrección de IaC, debes conceder a la aplicación Github permisos de <code>lectura y escritura</code> de <code>Contenidos</code> y <code>solicitudes pull</code>. Estos permisos pueden aplicarse a todos los repositorios o a algunos de ellos.
</div>

## Activar la corrección de IaC para tus repositorios

Después de configurar la integración GitHub, activa la corrección de IaC para los repositorios de tu cuenta de GitHub.

1. En la página de [configuración de CSM][4], amplía la sección **Integraciones de código fuente**.
2. Haz clic en **Configure** (Configurar) para la cuenta de GitHub que quieres configurar.
3. Para activar IaC:
    - Todos los repositorios: Activa la opción **Activar la corrección de infraestructura como código (IaC)**.
    - Repositorio único: Activa la opción **Corrección de IAC** para el repositorio específico.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/misconfigurations
[2]: /es/security/cloud_security_management/identity_risks
[3]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup