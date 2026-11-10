---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configurar IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentación
  text: Configurar IaC Security
- link: /security/code_security/iac_security/custom_rules/
  tag: Documentación
  text: IaC Custom Rules
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Detectar errores de configuración de CI/CD antes que los bots: Asegurar GitHub
    Actions con Datadog IaC Security'
title: Reglas de IaC Security
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Este producto no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Infrastructure as Code (IaC) Security][1] identifica configuraciones incorrectas y riesgos de seguridad en archivos de infraestructura como código antes de la implementación, lo que ayuda a garantizar que los entornos en la nube permanezcan seguros y cumplan con las normas.

<div class="alert alert-info">Para que la resolución de Helm funcione correctamente, cada directorio de chart debe incluir los charts de los que depende. Para obtener más detalles, consulte <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">Chart File Structure</a> en la documentación de Helm.</div>

Para aplicar requisitos específicos de su organización, consulte [IaC Custom Rules][2].

[1]: /es/security/code_security/iac_security/
[2]: /es/security/code_security/iac_security/custom_rules/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}