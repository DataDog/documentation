---
further_reading:
- link: /security/application_security/threats/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/application_security/threats/library_configuration/
  tag: Documentación
  text: Configuración de ASM
- link: /security/application_security/software_composition_analysis/
  tag: Documentación
  text: Análisis de composición de software
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona ASM
title: Gestión de las amenazas a las aplicaciones
---

La gestión de amenazas de ASM utiliza la telemetría de trazas (traces) de las aplicaciones instrumentadas por APM para identificar amenazas y ataques en los servicios en ejecución comparando el comportamiento observado con patrones de ataque conocidos, o identificando el abuso de la lógica de negocio.

Las señales de seguridad planteadas por la monitorización de amenazas se resumen y aparecen en las vistas que ya visitas habitualmente para monitorizar el estado y el rendimiento de los servicios. El [catálogo de servicios][1] y las páginas individuales de servicios en APM proporcionan información sobre las señales de amenazas de las aplicaciones, lo que te permite investigar vulnerabilidades, bloquear atacantes y revisar exposiciones a ataques.

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Catálogo de servicios con servicios que muestran señales de amenaza" style="width:100%;" >}}

Para obtener más información sobre cómo funciona la gestión de amenazas, consulta [Cómo funciona ASM][4].


## Exploración de las señales de amenaza

Cuando los datos de amenazas de los servicios llegan a Datadog, la [información general de ASM][7] muestra un resumen de lo que está ocurriendo. Aquí, puedes habilitar la detección de vulnerabilidades, revisar los ataques, personalizar las alertas y los informes, y habilitar ASM en los servicios. Para investigar señales de actividad sospechosa, haz clic en el enlace **Review** (Revisar) del servicio.

En el [explorador de señales][2], filtra por atributos y facetas para encontrar amenazas críticas. Haz clic en una señal para ver sus detalles, incluida la información del usuario y su dirección IP, qué regla activó, el flujo del ataque, las trazas (traces) relacionadas y otras señales de seguridad. Desde esta página también puedes hacer clic para crear un caso y declarar un incidente. Para obtener más información, consulta [Investigación de las señales de seguridad][8].

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="Información general de la investigación de amenazas en el explorador de señales">}}


## Creación de reglas de WAF en la aplicación para identificar patrones de ataque

Puedes [crear reglas de WAF en la aplicación][5] que definan qué aspecto tiene el comportamiento sospechoso en la aplicación, aumentando las reglas predeterminadas que vienen con ASM. A continuación, [especifica reglas personalizadas][6] para generar señales de seguridad a partir de los intentos de ataque desencadenados desde estas reglas, planteándolas en las vistas de la monitorización de amenazas para su investigación.

## Frena los ataques y a los atacantes con ASM Protect

{{% asm-protect %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /es/security/application_security/how-appsec-works/
[5]: /es/security/application_security/threats/inapp_waf_rules/
[6]: /es/security/application_security/threats/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /es/security/application_security/threats/security_signals/