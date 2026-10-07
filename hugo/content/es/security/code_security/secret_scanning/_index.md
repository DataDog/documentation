---
algolia:
  tags:
  - secrets scanning
  - secret scanning
  - análisis estático de datadog
  - SAST
description: Utiliza Datadog Secret Scanning para encontrar secretos expuestos en
  el código fuente.
is_beta: true
title: Secret Scanning
---

{{< callout url="https://www.datadoghq.com/product-preview/secret-scanning/" btn_hidden="false" header="Join the Preview!" >}}
Secret Scanning está en Vista previa. Para obtener acceso, ponte en contacto con tu asesor de clientes.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Secret Scanning no está disponible en el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Datadog Secret Scanning analiza el código para encontrar secretos expuestos. Datadog también intenta validar los secretos y mostrar su estado (válido, no válido) para ayudarte a priorizar la corrección de secretos.

## Configurar Secret Scanning

Los análisis pueden ejecutarse en tus pipelines CI/CD o directamente en Datadog con el análisis alojado (sólo GitHub). Para empezar, ve a [**la configuración de Code Security**][1] y haz clic en **Activate scanning for your repositories** (Activar el análisis de tus repositorios) o aprende a configurar Secret Scanning utilizando [GitHub Actions][5] o con [otros proveedores de CI][6].

## Reglas de Secret Scanning

Datadog Secret Scanning utiliza la tecnología de [Sensitive Data Scanner (SDS)][3] e incluye todas las reglas de la
[categoría Secretos y credenciales de SDS][4].


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /es/security/code_security/static_analysis/setup
[3]: /es/security/sensitive_data_scanner/
[4]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/#secrets-and-credentials
[5]: /es/security/code_security/secret_scanning/github_actions
[6]: /es/security/code_security/secret_scanning/generic_ci_providers