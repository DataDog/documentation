---
aliases:
- /es/security/application_security/api-inventory/
description: Catalogue los puntos de conexión y servicios de API, y evalúe el riesgo
  de seguridad de la API en todo su entorno.
further_reading:
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Mitigue los principales riesgos de seguridad de la API.
- link: https://www.datadoghq.com/blog/improve-api-authentication-detection-with-datadog/
  tag: Blog
  text: Mejore la detección de autenticación de API con Datadog.
title: Inventario de API
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

[API Inventory][1] es un catálogo actualizado continuamente de los puntos de conexión y servicios de API que API Posture descubre en todo su entorno. Muestra el contexto de seguridad para cada punto de conexión, como el estado de autenticación, la exposición pública, los flujos de datos confidenciales y los hallazgos asociados.

El inventario consta de dos exploradores:

- **[API Endpoints][2]**: El explorador de puntos de conexión de API cataloga sus puntos de conexión individuales, detectando APIs en la sombra (puntos de conexión no documentados sin definición de API y no detectados desde Amazon API Gateway) y APIs huérfanas (puntos de conexión documentados sin tráfico), y le ayuda a priorizar los puntos de conexión con mayor riesgo.
- **[Services][3]**: El explorador de servicios agrega hallazgos, vulnerabilidades y señales de tiempo de ejecución por servicio, para que pueda evaluar el riesgo y la cobertura de seguridad de cada servicio.

Para detectar y responder a debilidades, ataques o configuraciones incorrectas en estos puntos de conexión, utilice [API Findings][4]. En el explorador de puntos de conexión de API, cada fila muestra un chip de hallazgos que abre el hallazgo relacionado en API Findings.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /es/security/application_security/api_posture/api_inventory/api_endpoints/
[3]: /es/security/application_security/api_posture/api_inventory/services/
[4]: /es/security/application_security/api_posture/api_findings/