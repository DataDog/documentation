---
further_reading:
- link: /security/application_security/how-it-works/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad de los usuarios
- link: /security/application_security/threats/library_configuration/
  tag: Documentación
  text: Configuración de tu AAP
- link: /security/code_security/software_composition_analysis/
  tag: Documentación
  text: Análisis de composición de software
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de la AAP
title: App and API Protection
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App and API Protection no es compatible con el <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog App and API Protection (AAP) protege las aplicaciones web y las API frente a una amplia gama de amenazas para la seguridad, entre las que se incluyen: 

- Intentos de uso de vulnerabilidades
- Uso indebido y fraude en la aplicación
- Abusos de API 

Integrada en la plataforma Datadog, App and API Protection aprovecha los exhaustivos datos de Datadog (logs y trazas) para proporcionar visibilidad y seguridad completas del stack tecnológico en una plataforma unificada.

App and API Protection permite a los equipos identificar y corregir rápidamente las amenazas. Su principal diferenciador es salvar la brecha entre seguridad y DevOps, promoviendo la colaboración entre los equipos de desarrollo, seguridad y operaciones.

## Casos de uso

Descubre las formas en que Datadog App and API Protection ayuda en casos de uso frecuentes:

| Quieres...    | Cómo puede ayudar Datadog AAP |
| ----------- | ----------- |
| **Protección de aplicaciones web:** Impide el uso de vulnerabilidades como la inyección SQL, la falsificación de solicitudes del lado del servidor y la inclusión de archivos locales. | Activa [Exploit Prevention][9] en tus servicios. App and API Protection bloquea los intentos en tiempo real y genera señales para su posterior investigación.|
| **Abuso de aplicaciones y API:** Protege las aplicaciones contra el abuso de aplicaciones y API, como el relleno de credenciales y los ataques de apropiación de cuentas.| Aprovecha las [reglas de detección predefinidas][10] para notificaciones, como creaciones de cuentas inusuales o restablecimiento de contraseñas desde una IP, o campañas distribuidas de relleno de credenciales. Revisa las ventajas de la [protección predefinida contra la apropiación de cuentas][11].|
| **Seguridad de API:** Conoce las API de tu organización, entiende la postura y las acciones necesarias para reducir el riesgo utilizando una lista priorizada de endpoints de API.| App and API Protection:</br> - Realiza un inventario de todos tus endpoints de API.</br> - Te proporciona una visibilidad de tu tráfico de API, incluyendo el abuso de API.</br> - Destaca los riesgos en tus endpoints de API. Por ejemplo, endpoints vulnerables o no autenticados que procesan datos confidenciales.|

## Señales de seguridad

Las señales de seguridad emitidas por Threat Monitoring se resumen y se muestran en las vistas que visitas habitualmente para monitorizar la salud y el rendimiento de los servicios. El [Catálogo de software][1] y las páginas servicio individuales en APM proporcionan información sobre las señales de amenaza a las aplicaciones, lo que te permite investigar vulnerabilidades, bloquear atacantes y revisar las exposiciones a ataques.

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Catálogo de software con servicios que muestran señales de amenaza" style="width:100%;" >}}

Para obtener más información sobre el funcionamiento de App and API Protection, consulta [Funcionamiento de AAP][4].


## Exploración de las señales de amenaza

Cuando los datos de amenazas a tus servicios entran en Datadog, la [información general de AAP][7] muestra un resumen de lo que está ocurriendo. Aquí, puedes activar la detección de vulnerabilidades, revisar los ataques, personalizar las alertas y los informes, y activar AAP en tus servicios. Para investigar señales de actividad sospechosa, haz clic en el enlace **Review** (Revisar) del servicio.

En el [explorador de señales][2], filtra por atributos y facetas para encontrar amenazas críticas. Haz clic en una señal para ver sus detalles, incluida la información del usuario y su dirección IP, qué regla activó, el flujo del ataque, las trazas (traces) relacionadas y otras señales de seguridad. Desde esta página también puedes hacer clic para crear un caso y declarar un incidente. Para obtener más información, consulta [Investigación de las señales de seguridad][8].

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="Información general de la investigación de amenazas en el explorador de señales">}}


## Creación de reglas de WAF en la aplicación para identificar patrones de ataque

Puedes [crear reglas WAF en la aplicación][5] que definan el comportamiento sospechoso en tu aplicación, aumentando las reglas por defecto que vienen con AAP. A continuación, [especifica reglas personalizadas][6] para generar señales de seguridad a partir de los intentos de ataque activador por estas reglas, mostrándolas en las vistas de Threat Monitor para su investigación.

## Frenar los ataques y a los atacantes con AAP Protect

{{% asm-protect %}}

## Desactivar la gestión y la protección de amenazas

Para obtener información sobre la desactivación de la gestión y la protección de amenazas, consulta [Desactivación de la gestión y la protección de amenazas][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /es/security/application_security/how-it-works/
[5]: /es/security/application_security/threats/inapp_waf_rules/
[6]: /es/security/application_security/policies/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /es/security/workload_protection/security_signals/
[9]: /es/security/application_security/exploit-prevention/
[10]: /es/security/default_rules/?category=cat-application-security
[11]: /es/security/account_takeover_protection/
[12]: /es/security/application_security/troubleshooting/#disabling-threat-management-and-protection