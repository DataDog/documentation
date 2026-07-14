---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configurar la Seguridad de IaC
- link: /security/code_security/iac_security/configuration
  tag: Documentación
  text: Configurar la Seguridad de IaC
title: Reglas de Seguridad de IaC
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Este producto no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Seguridad de IaC][1] identifica configuraciones incorrectas y riesgos de seguridad en archivos de infraestructura como código antes de la implementación, ayudando a asegurar que los entornos en la nube permanezcan seguros y cumplan con las normativas.

<div class="alert alert-info">Para que la resolución de Helm funcione correctamente, cada directorio de chart debe incluir los charts de los que depende. Para más detalles, consulte <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">Chart File Structure</a> en la documentación de Helm.</div>

[1]: /es/security/code_security/iac_security/

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}