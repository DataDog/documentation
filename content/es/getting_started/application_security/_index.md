---
title: Empezando con la gestión de la seguridad de las aplicaciones
kind: documentación
aliases:
- /security/security_monitoring/getting_started/
further_reading:
- link: /security/application_security/terms
  tag: Documentación
  text: Términos y conceptos de seguridad de las aplicaciones
- link: /security/application_security/how-appsec-works
 
  tag: Documentación
  text: Cómo funciona la gestión de la seguridad de las aplicaciones
- link: /security/application_security/enabling/
  tag: Documentación
  text: Activación de ASM
- link: "https://dtdg.co/fe"
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para mejorar tu seguridad y la detección de amenazas.
- link: /getting_started/application_security/software_composition_analysis
  tag: Guía
  text: Empezando con el análisis de composición de software
- link: "https://securitylabs.datadoghq.com/"
  tag: Laboratorios de seguridad
  text: Investigación sobre seguridad, informes, consejos y vídeos de Datadog
---

## Información general

Datadog Application Security Management (ASM) ayuda a proteger tus aplicaciones web y API en producción. ASM proporciona visibilidad de las vulnerabilidades a nivel de aplicación en tus servicios y te protege en tiempo real de ataques y atacantes que pretenden explotar estas vulnerabilidades.

Esta guía te mostrará las prácticas recomendadas para poner en marcha tu equipo con ASM.

## Identifica servicios con riesgos para la seguridad


**Identifica servicios vulnerables o expuestos a ataques** que se beneficiarían de ASM. En la página [**Service Catalog > Security** (Catálogo de servicios > Seguridad),][1] visualiza y selecciona los servicios que desees habilitar.

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="Vista de la página de servicios ASM que muestra las vulnerabilidades clasificadas por la columna de solicitudes sospechosas." style="width:100%;" >}}
 

Estas informaciones de seguridad se detectan a partir de los datos notificados por APM. Las informaciones ayudan a priorizar tus esfuerzos de seguridad. ASM identifica, prioriza y ayuda a remediar todos los riesgos de seguridad en tus servicios.

**Nota**: Si no se informa de vulnerabilidades o solicitudes sospechosas, asegúrate de que tus servicios están utilizando una versión reciente de la biblioteca del rastreador de Datadog. En el [Catálogo de servicios de seguridad][2], abre el panel lateral de cualquier servicio y consulta su **Configuración de rastreo**.


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="Pestaña de configuración del rastreador en el catálogo de servicios APM que destaca la versión de Datadog Agent y la biblioteca del rastreador de Datadog que utilizan tus servicios." style="width:100%;" >}}


## Activar ASM

### Activa ASM con las instrucciones de la aplicación

En la [página de inicio de ASM,][18] sigue las instrucciones para empezar. Esto incluye:
- Selección guiada de servicios que se beneficiarían de ASM.
- Configuración de bibliotecas del rastreador de Datadog mediante una variable del entorno.
- Reinicio de tus servicios. </br>

1. Haz clic en **Empezar con ASM**.
2. Selecciona **Iniciar** para detectar vulnerabilidades en bibliotecas de código abierto (Análisis de composición del software), encontrar y corregir vulnerabilidades a nivel de código (Seguridad de código), y encontrar y activar la detección de amenazas en tus servicios (Gestión de amenazas).
3. Sigue las instrucciones para empezar a utilizar ASM.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Página de configuración del Análisis de composición del software." style="width:100%;" >}}
 


### Activar ASM mediante configuración remota
#### Requisitos previos:
- Datadog Agent v7.42.0 o superior instalado en tus hosts o contenedores.
- Las versiones del rastreador de Datadog son [compatibles con la configuración remota][16].

#### Configura la configuración remota (si aún no está activada)
  Sigue los pasos para activar la [configuración remota][17] en tu interfaz de usuario de Datadog. Esto incluye:
  1. Activa la función de configuración remota para tu organización.
  2. Añade la función de configuración remota a una clave API existente o crea una nueva.
  3. Actualiza la configuración de tu Datadog Agent para utilizar la clave API con capacidad de configuración remota.

  Si deseas más información, consulta [Parámetros de configuración remota][21].

### Prueba ASM
Una vez activado, ASM identifica inmediatamente las vulnerabilidades de las aplicaciones y detecta ataques y atacantes dirigidos a tus servicios.

1. **Validar vulnerabilidades**: navega hasta [la pestaña Vulnerabilidades][14], clasifica y corrige las vulnerabilidades.
2. **Validar ataques**: envía patrones de ataque para activar una regla de prueba de detección. Desde tu terminal, ejecuta el siguiente script:

  {{< code-block lang="sh" >}}
  for ((i=1;i<=250;i++)); do
  # Dirígete a las rutas de servicios existentes
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-log';
 
  # Dirígete a las rutas de servicios no existentes
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-loguear';
  done{{< /code-block >}}

3. Ve a [Explorador de señales de seguridad][6] para ver la señal que se genera al cabo de unos segundos.

## Informes y notificaciones

1. Configura [reglas de notificación][23] para recibir alertas a través de Slack, Jira, correo electrónico, etc.
3. Suscríbete a los informes semanales [compendio de amenazas][22] para iniciar la investigación y corrección de las amenazas a la seguridad más importantes descubiertas en los últimos siete días. 


¿Te interesan las prácticas recomendadas para ir más allá? Consulta la [Guía de inicio rápido del producto][19].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /security/application_security/how-appsec-works/
[5]: /security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /security/notifications/rules/
[13]: /security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: https://docs.datadoghq.com/agent/guide/how_remote_config_works/?tab=configurationyamlfile#overview
[16]: https://docs.datadoghq.com/fr/security/application_security/enabling/compatibility/
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
[20]: /getting_started/application_security/#setup-asm
[21]: /agent/remote_config?tab=configurationyamlfile#setup
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules


