---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitorización de actividades WAF de AWS con Datadog
title: Integraciones WAF
---

La protección de las aplicaciones web y las API requiere un enfoque multicapa que combine las defensas de monitorización y de perímetro en la aplicación. Estas estrategias complementarias te permiten contar con un enfoque de seguridad de las aplicaciones de defensa en profundidad que aprovecha AWS Web Application Firewall (WAF), como primera línea de defensa, seguido de ASM Threat Management, para bloquear los ataques que se cuelan por el WAF.

### Monitorización en la aplicación: visibilidad profunda con rastreo distribuido

A nivel de la aplicación, Datadog ASM Threat Management aprovecha el rastreo distribuido para monitorizar microservicios en tiempo real. El enfoque ASM proporciona información detallada y contextual del comportamiento de las solicitudes a medida que atraviesan varios servicios. Esta información detecta amenazas sofisticadas como:

- Intentos de inyección SQL (SQLi) e inclusión de archivos locales (LFI).
- Abuso de la lógica de la aplicación, como eludir reglas empresariales o explotar casos límite.
- Uso indebido de los endpoints expuestos.

### Defensa perimetral: bloqueo de amenazas en el borde con AWS WAF

En el perímetro, AWS Web Application Firewall (WAF) actúa como primera línea de defensa, filtrando el tráfico antes de que llegue a la aplicación. Estas soluciones son esenciales para el bloqueo de:

- Ataques de botnet a gran escala o ataques de denegación de servicio distribuido (DDoS).
- Bots maliciosos que intentan rellenar credenciales o hacer scraping.

### La importancia de una protección contextual y adaptable

Dependiendo de la naturaleza de la amenaza, los controles de protección deben aplicarse en la capa apropiada: dentro de la aplicación o en el perímetro. Por ejemplo:

- Caso práctico de protección perimetral: Bloqueo de IP maliciosas o ataques volumétricos que pueden mitigarse eficazmente en el borde de red.
- Protección dentro de la aplicación: Detección y bloqueo de exploits de vulnerabilidades, abusos de la lógica empresarial o sutiles anomalías en el uso de la API.

Este enfoque en capas garantiza que las amenazas se neutralicen lo antes posible, sin sacrificar la precisión necesaria para proteger el tráfico legítimo.


## Integración de AWS WAF con ASM

Existen dos casos de uso principales compatibles con esta [integración][1]:

1. Obtener una visibilidad de las acciones de AWS WAF en Datadog ASM. Por ejemplo:
   1. Métricas como el total de solicitudes permitidas frente a las bloqueadas por AWS WAF.
   2. Desglosar y visualizar logs de AWS WAF individuales (requiere que [ingieras logs de AWS WAF en Datadog][2]).
   3. Cómo AWS WAF inspeccionó la solicitud: reglas que se aplicaron y la decisión tomada (permitir, bloquear o contar). 

   <div class="alert alert-info">Ten en cuenta que ASM convierte los logs de AWS WAF en trazas (traces) de ASM, lo que te permite ver trazas de la actividad de la aplicación y (logs de actividad convertidos en trazas de ASM en el Explorador de trazas ASM) de AWS WAF.</div>

   {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="Detalles de la integración AWS WAF en la interfaz de usuario de Datadog" style="width:100%;" >}}

2. Aprovecha AWS WAF para bloquear a los atacantes:
   1. Conecta tu(s) conjunto(s) de IP AWS WAF con Datadog ASM. Puedes utilizar un conjunto existente o crear uno nuevo. Datadog añadirá las direcciones IP bloqueadas a este conjunto de IP. Puedes bloquear atacantes desde los exploradores de [señales][3] o de [trazas][4] de ASM.

   {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="IP bloqueadas de la lista de denegación de ASM" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /es/integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security?query=@workflow.rule.type:%22Application%20Security%22&product=appsec
[4]: https://app.datadoghq.com/security/appsec/traces