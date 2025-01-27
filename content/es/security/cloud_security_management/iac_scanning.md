---
title: Análisis de IaC
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
El análisis estático de infraestructura como código (IaC) está en Vista previa. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

El análisis estático de infraestructura como código (IaC) se integra con sistemas de control de versiones, como GitHub, para detectar configuraciones erróneas en los recursos en la nube definidos por Terraform. Los resultados del análisis se muestran en dos localizaciones principales: dentro de las solicitudes de extracción durante las modificaciones de código y en la página **Explorers** dentro de Cloud Security Management.

{{< img src="security/csm/iac_scanning_explorer2.png" alt="Página Explorers en CSM, que muestra configuraciones erróneas en recursos en la nube" width="100%">}}

Al hacer clic en una detección, el panel lateral revela detalles adicionales, incluida una breve descripción de la norma IaC relacionada con la detección y una vista previa del código infractor.

{{< img src="security/csm/iac_scanning_finding.png" alt="Panel lateral de detecciones donde se resalta el cifrado indefinido de volúmenes EBS en el código de Terraform." width="100%">}}

## Proveedores compatibles

- **Sistema de control de versiones**: GitHub
- **Infraestructura como herramienta de código**: Terraform

## Configuración

### Configurar la integración GitHub

Sigue [las instrucciones][3] para crear una aplicación GitHub para tu organización.

<div class="alert alert-info">Para utilizar el análisis de IaC, debes proporcionar permisos de <code>lectura y escritura</code> a la aplicación de GitHub para <code>contenidos</code> y <code>solicitudes de extracción</code>. Estos permisos pueden aplicarse a todos los repositorios o a algunos de ellos.
</div>

### Activar el análisis IaC para tus repositorios

Después de configurar la integración GitHub, activa el análisis de IaC para los repositorios de tu cuenta de GitHub.

1. En la página de [configuración de CSM][4], amplía la sección **Integraciones de código fuente**.
2. Haz clic en **Configure** (Configurar) para la cuenta de GitHub que quieres configurar.
3. Para activar el análisis de IaC:
    - Todos los repositorios: Activa la opción **Activar el análisis de infraestructura como código (IaC)**.
    - Repositorio único: Activa la opción **Análisis de IAC** para el repositorio específico.

[1]: /es/security/cloud_security_management/misconfigurations
[2]: /es/security/cloud_security_management/identity_risks
[3]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup