---
aliases:
- /es/cloud-siem/getting_started/
- /es/security_monitoring/getting_started/
- /es/security_platform/security_monitoring/
- /es/security_platform/security_monitoring/getting_started
- /es/security_platform/getting_started/
- /es/security_platform/cloud_siem/getting_started/
- /es/security/cloud_siem/getting_started/
- /es/getting_started/cloud_siem
description: Aprenda a configurar Datadog Cloud SIEM para la detección de amenazas
  en tiempo real. Configure la ingesta de registros, habilite reglas de detección
  y explore señales de seguridad para un monitoreo integral.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: Centro de aprendizaje
  text: Curso de Introducción a Cloud SIEM
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatice tareas de seguridad comunes y manténgase a la vanguardia de las
    amenazas con Datadog Workflows y Cloud SIEM
- link: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
  tag: Aplicación
  text: Automatice respuestas con las plantillas de seguridad de Workflows
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: Documentación
  text: Guía de configuración de AWS para Cloud SIEM
- link: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
  tag: Documentación
  text: Guía de configuración de Google Cloud para Cloud SIEM
- link: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem/
  tag: Documentación
  text: Guía de configuración de Azure para Cloud SIEM
- link: /security/notifications/variables/
  tag: Documentación
  text: Obtenga más información sobre las variables de notificación para personalizar
    las notificaciones
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para elevar su seguridad y detección de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Lea sobre temas relacionados con la seguridad en Security Labs de Datadog
- link: https://www.datadoghq.com/blog/content-packs/
  tag: Blog
  text: Ingiera y monitoree fácilmente registros de seguridad con los Content Packs
    de Cloud SIEM
title: Primeros pasos con Cloud SIEM
---
## Descripción general {#overview}

[Datadog Cloud SIEM][1] detecta amenazas en tiempo real para su aplicación e infraestructura. Estas amenazas pueden incluir un ataque dirigido, una dirección IP incluida en una lista de inteligencia de amenazas que se comunica con sus sistemas o una configuración insegura. Una vez detectada una amenaza, se genera una señal y se puede enviar una notificación a su equipo.

Esta guía lo orienta sobre las prácticas recomendadas para comenzar con Cloud SIEM.

## Fase 1: Configuración {#phase-1-setup}

1. Configure la [ingesta de registros][2] para recopilar registros de sus fuentes. Revise las [Prácticas recomendadas para Log Management][3].

    Puede utilizar [Pipelines de integración preconfigurados][4] para recopilar registros de más de {{< translate key="integration_count" >}} integraciones, o [crear Pipelines de registros personalizados][5] para enviar:

    - [Cloud Audit logs][6]
    - [Identity Provider logs][7]
    - SaaS and Workspace logs
    - Third-party security integrations (for example, Amazon GuardDuty)

2. Habilite [Cloud SIEM][8].
3. Seleccione y configure [Content Packs][9], que proporcionan contenido listo para usar para fuentes de registros de seguridad críticas.
4. Seleccione y configure [fuentes de registro adicionales][10] que desea que Cloud SIEM analice.
5. Haga clic en {{< ui >}}Activate{{< /ui >}}. Se crea un índice de registros de Cloud SIEM personalizado (`cloud-siem-xxxx`).
6. Confirme que el índice `cloud-siem-xxxx` esté por encima de cualquier otro índice de registros que tenga un filtro que coincida con sus registros de seguridad. Si no es así, o si la página de configuración de Cloud SIEM muestra la advertencia "The Cloud SIEM index is not in the first position", [reordene el índice de Cloud SIEM](#reorder-the-cloud-siem-index).

### Reordene el índice de Cloud SIEM {#reorder-the-cloud-siem-index}

Datadog envía cada registro ingerido al primer índice que tenga un [filtro][27] coincidente. Si un índice por encima de `cloud-siem-xxxx` tiene un filtro que coincide con sus registros de seguridad, ese índice recibe esos registros en su lugar y Cloud SIEM no los analiza. En este escenario, los Content Packs permanecen en estado `Waiting for logs`. Esto puede suceder incluso cuando la página de configuración no muestra una advertencia sobre la posición del índice.

Para asegurarse de que Cloud SIEM reciba sus registros de seguridad, mueva `cloud-siem-xxxx` a la primera posición o, al menos, por encima de cualquier índice cuyo filtro también abarque sus fuentes de registros de seguridad.

<div class="alert alert-info">Si la página de configuración no muestra la advertencia, vaya a {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > <a href="https://app.datadoghq.com/logs/pipelines/indexes">{{< ui >}}Indexes{{< /ui >}}</a> y haga clic en el ícono {{< ui >}}Move to{{< /ui >}} del <code>cloud-siem-xxxx</code> índice y continúe con el paso 3.</div>

1. Haga clic en {{< ui >}}Reorder index in Logs Configuration{{< /ui >}}.

{{< img src="getting_started/cloud_siem/cloud-siem-setup-warning.png" alt="Un cuadro de advertencia amarillo que indica que la configuración del índice requiere atención" style="width:80%;">}}

2. Confirme que el título del modal diga "Move cloud-siem-xxxx to..." y que el texto `cloud-siem-xxxx` en la columna de índice sea de color morado claro.

{{< img src="getting_started/cloud_siem/move-index-modal.png" alt="El modal Move cloud-siem-xxxx que muestra la lista de índices con el índice cloud-siem-xxxx en último lugar" style="width:60%;">}}

3. Para seleccionar la nueva ubicación de su índice, haga clic en la línea superior del índice donde desea que vaya `cloud-siem-xxxx`. Por ejemplo, si desea que el índice `cloud-siem-xxxx` sea el primero, haga clic en la línea *encima* del índice que ocupa actualmente el primer lugar. La nueva posición se resalta con una línea azul gruesa.

{{< img src="getting_started/cloud_siem/move-index-highlight.png" alt="El modal Move cloud-siem-xxxx que muestra una línea azul en la parte superior del primer índice" style="width:65%;">}}

4. El texto confirma la posición seleccionada: "Select the new placement of your index: Position 1". Haga clic en {{< ui >}}Move{{< /ui >}}.

5. Revise el texto de advertencia. Si está satisfecho con el cambio, haga clic en {{< ui >}}Reorder{{< /ui >}}.

6. Revise el orden de los índices y confirme que el índice `cloud-siem-xxxx` esté donde usted desea. Si desea mover el índice, haga clic en el icono {{< ui >}}Move to{{< /ui >}} y siga los pasos del 3 al 5.

7. Regrese a la [página de configuración de Cloud SIEM][11].

El índice de Cloud SIEM debería estar ahora en la primera posición. Si la página de configuración todavía muestra una advertencia sobre la posición del índice, espere unos minutos y actualice el navegador.

Después de mover el índice a la primera posición, revise la configuración y los estados de los [Content Packs][11] y [otras fuentes de registros][11]. Para cada integración que muestre una advertencia o un error, haga clic en la integración y siga las instrucciones para corregirla.

## Fase 2: Exploración de señales {#phase-2-signal-exploration}

1. Revise las [reglas de detección preconfiguradas][12] que comienzan a detectar amenazas en su entorno de inmediato. Las reglas de detección se aplican a todos los registros procesados para maximizar la cobertura de detección. Consulte la documentación de las [reglas de detección][13] para obtener más información.

2. Explore las [señales de seguridad][14]. Cuando se detecta una amenaza con una regla de detección, se genera una señal de seguridad. Consulte la documentación de las [señales de seguridad][15] para obtener más información.

    - [Configure reglas de notificación][16] para alertar cuando se generen señales. Puede alertar mediante Slack, Jira, correo electrónico, webhooks y otras integraciones. Consulte la documentación de [reglas de notificación][17] para obtener más información.
    - Suscríbase a los informes semanales de [resumen de amenazas][18] para comenzar la investigación y remediación de las amenazas de seguridad más importantes descubiertas en los últimos siete días.

## Fase 3: Investigación {#phase-3-investigation}

1. Explore el [Investigator][19] para una remediación más rápida. Consulte la documentación de [Investigator][20] para obtener más información.
2. Utilice [paneles preconfigurados][21] o [cree sus propios paneles][22] para realizar investigaciones, generar informes y monitorear.

## Fase 4: Personalización {#phase-4-customization}

1. Configure [reglas de supresión][23] para reducir el ruido.
2. Cree [reglas de detección personalizadas][24]. Revise las [mejores prácticas para crear reglas de detección][25].

## Deshabilitar Cloud SIEM {#disable-cloud-siem}

Comuníquese con [soporte][26] para deshabilitar Cloud SIEM.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration/siem/log-sources
[3]: /es/logs/guide/best-practices-for-log-management/
[4]: /es/integrations/
[5]: /es/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/siem/intro
[9]: https://app.datadoghq.com/security/siem/content-packs
[10]: https://app.datadoghq.com/security/configuration/siem/log-sources
[11]: https://app.datadoghq.com/security/configuration/siem/setup
[12]: /es/security/default_rules/#cat-cloud-siem-log-detection
[13]: /es/security/detection_rules/
[14]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[15]: /es/security/cloud_siem/triage_and_investigate/investigate_security_signals
[16]: https://app.datadoghq.com/security/configuration/notification-rules
[17]: /es/security/notifications/rules/
[18]: https://app.datadoghq.com/security/configuration/reports
[19]: https://app.datadoghq.com/security/siem/investigator/
[20]: /es/security/cloud_siem/triage_and_investigate/investigator
[21]: https://app.datadoghq.com/dashboard/lists/preset/100
[22]: /es/dashboards/#overview
[23]: /es/security/suppressions/
[24]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[25]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
[26]: /es/help/
[27]: /es/logs/log_configuration/indexes/#indexes-filters