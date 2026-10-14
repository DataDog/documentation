---
aliases:
- /es/sensitive_data_scanner/library_rules/
- /es/sensitive_data_scanner/scanning_rules/library_rules
description: Explore la biblioteca de reglas predefinidas de Sensitive Data Scanner
  para detectar direcciones de correo electrónico, números de tarjetas de crédito,
  claves de API, credenciales, direcciones IP y otros patrones confidenciales en logs,
  APM, RUM y almacenamiento en la nube.
further_reading:
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Configure Sensitive Data Scanner
title: Reglas de la biblioteca de Sensitive Data Scanner
---
## Descripción general {#overview}
La Biblioteca de reglas de escaneo es una colección de reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización y más. Las palabras clave recomendadas se utilizan de forma predeterminada cuando se crean reglas de biblioteca.

Estas reglas también se pueden ver en Datadog:

1. Navegue a [Sensitive Data Scanner][1].
1. Haga clic en {{< ui >}}Scanning Rules Library{{< /ui >}} en la parte superior derecha de la página.
1. Para agregar reglas de la biblioteca a un grupo de escaneo:<br />
   1. Seleccione las reglas que desea agregar.<br />
   1. Haga clic en {{< ui >}}Add Rules to Scanning Group{{< /ui >}}.<br />
   1. Siga los pasos en [Set Up Sensitive Data Scanner][2] para finalizar la configuración.

<div class="alert alert-info">La mayoría de las reglas de la biblioteca están disponibles para todas las fuentes de datos (Logs, APM, RUM, Agent Observability, Observability Pipelines, Secret Scanning y Cloud Storage). Verifique la columna <b>Available For</b> para ver qué fuentes de datos admite cada regla.</div>

{{< multifilter-search resource="sds_rules" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /es/security/sensitive_data_scanner/?#add-scanning-rules