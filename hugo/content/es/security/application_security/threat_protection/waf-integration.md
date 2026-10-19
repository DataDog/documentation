---
aliases:
- /es/security/application_security/waf-integration/
- /es/security/application_security/threats/waf-integration
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Hacer un seguimiento de la actividad de AWS WAF con Datadog
title: WAF Integrations
---
Proteger aplicaciones web y APIs requiere un enfoque de múltiples capas que combine el seguimiento dentro de la aplicación y las defensas perimetrales. Estas estrategias complementarias le permiten tener un enfoque de *defensa en profundidad* para la protección de aplicaciones y APIs que aprovecha AWS Web Application Firewall (WAF) como primera línea de defensa, seguido de la Prevención de Exploits para bloquear ataques que eluden el WAF.

Para obtener detalles sobre cómo difiere la Prevención de Exploits de WAF dentro de la aplicación, consulte [Prevención de Exploits vs. WAF dentro de la aplicación][5].

### Seguimiento dentro de la aplicación: visibilidad profunda con rastreo distribuido {#in-app-monitoring-deep-visibility-with-distributed-tracing}

A nivel de aplicación, Datadog AAP aprovecha el rastreo distribuido para hacer un seguimiento de los microservicios en tiempo real. El enfoque de AAP proporciona información detallada y rica en contexto sobre el comportamiento de las solicitudes a medida que atraviesan varios servicios. Esta información detecta amenazas sofisticadas, como:

- Intentos de inyección SQL (SQLi) e inclusión de archivos locales (LFI).
- Abuso de la lógica de la aplicación, como omitir reglas de negocio o explotar casos extremos.
- Uso indebido de puntos de conexión expuestos.

### Defensa perimetral: bloqueo de amenazas en el borde con AWS WAF {#perimeter-defense-blocking-threats-at-the-edge-with-aws-waf}

En el perímetro, AWS Web Application Firewall (WAF) actúa como la primera línea de defensa, filtrando el tráfico antes de que llegue a la aplicación. Estas soluciones son esenciales para bloquear:

- Ataques de botnets a gran escala o ataques de denegación de servicio distribuido (DDoS).
- Bots maliciosos que intentan realizar credential stuffing o scraping.

### La importancia de la protección contextual y adaptativa {#the-importance-of-contextual-adaptive-protection}

Dependiendo de la naturaleza de la amenaza, los controles de protección deben aplicarse en la capa adecuada: ya sea dentro de la aplicación o en el perímetro. Por ejemplo:

- Caso de uso de protección perimetral: bloqueo de IPs maliciosas o ataques volumétricos que pueden mitigarse de manera eficiente en el borde de la red.
- Caso de uso de protección dentro de la aplicación: detección y bloqueo de exploits de vulnerabilidades, abuso de la lógica de negocio o anomalías sutiles en el uso de la API.

Este enfoque por capas garantiza que las amenazas se neutralicen lo antes posible sin sacrificar la precisión necesaria para proteger el tráfico legítimo.


## AWS WAF Integrations con AAP {#aws-waf-integration-with-aap}

Para obtener instrucciones de configuración detalladas, consulte [Habilitación de la protección de aplicaciones y API para AWS WAF][6].

Existen dos casos de uso principales compatibles con esta [Integration][1]:

1. Obtenga visibilidad de las acciones de AWS WAF en Datadog AAP. Por ejemplo:
   1. Métricas como el total de solicitudes permitidas frente a las bloqueadas por AWS WAF.
   2. Analice y visualice los registros individuales de AWS WAF (requiere que [ingrese los registros de AWS WAF en Datadog][2]).
   3. Cómo inspeccionó AWS WAF la solicitud: reglas que se aplicaron y la decisión tomada (permitir, bloquear o contar).

   <div class="alert alert-info">AAP convierte los registros de AWS WAF en AAP Traces, lo que le permite visualizar la actividad de la aplicación (Traces) y la actividad de AWS WAF (registros convertidos en AAP Traces) en el Trace Explorer.</div>

   <!-- {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="Detalles de AWS WAF Integrations en la interfaz de usuario de Datadog" style="width:100%;" >}} -->

2. Aproveche AWS WAF para bloquear a los atacantes:
   1. Conecte sus conjuntos de IP de AWS WAF con Datadog AAP. Puede usar un conjunto existente o crear uno nuevo. Datadog agregará las direcciones IP bloqueadas a este conjunto de IP. Puede bloquear a los atacantes desde los exploradores de [Signals][3] o [Traces][4] de AAP.

   <!-- {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="AAP denylist blocked IPs" style="width:100%;" >}} -->

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /es/integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security/appsec/signals?query=@workflow.rule.type:%22Application%20Security%22
[4]: https://app.datadoghq.com/security/appsec/traces
[5]: /es/security/application_security/#exploit-prevention-vs-in-app-waf
[6]: /es/security/application_security/setup/aws/waf/