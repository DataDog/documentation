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
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: Centro de aprendizaje
  text: Curso de introducción a Cloud SIEM
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
- link: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
  tag: Aplicación
  text: Automatizar respuestas con proyectos de seguridad de flujos de trabajo
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
  text: Más información sobre las variables de notificación para personalizar las
    notificaciones
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para mejorar tu seguridad y la detección
    de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Leer sobre temas relacionados con la seguridad en los laboratorios de seguridad
    de Datadog
- link: https://www.datadoghq.com/blog/content-packs/
  tag: Blog
  text: Incorporar y monitorizar con facilidad logs de seguridad con los paquetes
    de contenido de Cloud SIEM
title: Empezando con Cloud SIEM
---

## Información general

[Datadog Cloud SIEM][1] detecta en tiempo real amenazas dirigidas a tu aplicación e infraestructura. Estas amenazas pueden ser un ataque dirigido, una IP de la lista de amenazas que se comunica con tus sistemas o una configuración insegura. Una vez detectada, se genera una señal y se puede enviar una notificación a tu equipo.

Esta guía te mostrará las prácticas recomendadas para empezar a usar Cloud SIEM.

## Fase 1: Configuración

1. Configura la [ingesta de logs][2] para recopilar logs de tus fuentes. Revisa las [prácticas recomendadas de gestión de logs][3].

    Puedes utilizar [pipelines de integración ya preparadas][4] a fin de recopilar logs de más de {{< translate key="integration_count" >}} integraciones o [crear pipelines de logs personalizadas][5] para enviarlas:

    - [Logs de auditoría en la nube][6]
    - [Logs del proveedor de identidad][7]
    - Logs de SaaS y Workspace
    - Integraciones de seguridad de terceros (por ejemplo, Amazon GuardDuty)

2. Habilite [Cloud SIEM][8].
3. Selecciona y configura [paquetes de contenido][9], que proporcionan contenido listo para utilizar para fuentes de logs de seguridad críticas.
4. Selecciona y configura las [fuentes de logs adicionales][10] que quieras que analice Cloud SIEM.
5. Haz clic en **Activate** (Activar). Se crea un índice de log de Cloud SIEM (`cloud-siem-xxxx`) personalizado.
6. Si en la página de configuración de Cloud SIEM se muestra la advertencia «The Cloud SIEM index is not in the first position» (El índice de Cloud SIEM no está en la primera posición), sigue los pasos de la sección [Reordenar el índice de Cloud SIEM](#reorder-the-cloud-siem-index).

### Reordenar el índice de Cloud SIEM

{{< img src="getting_started/cloud_siem/cloud-siem-setup-warning.png" alt="Un cuadro de advertencia amarillo que indica que se debe prestar atención a la configuración del índice" style="width:80%;">}}

1. Haz clic en **Reorder index in Logs Configuration** (Reordenar el índice en la configuración de logs).

2. Confirma que el título de la ventana modal diga «Move cloud-siem-xxxx to...» (Mover cloud-siem-xxxx a...) y que el texto `cloud-siem-xxxx` en la columna de índice sea de color morado claro.

{{< img src="getting_started/cloud_siem/move-index-modal.png" alt="Ventana modal Mover cloud-siem-xxxx que muestra la lista de índices con el índice cloud-siem-xxxx como último índice" style="width:60%;">}}

3. Para seleccionar la nueva ubicación del índice, haz clic en la línea superior del índice donde quieres que vaya `cloud-siem-xxxx`. Por ejemplo, si quieres que el índice `cloud-siem-xxxx` sea el primero, haz clic en la línea de *arriba* del primer índice actual. La posición nueva se resalta con una línea azul gruesa.

{{< img src="getting_started/cloud_siem/move-index-highlight.png" alt="Ventana modal Mover cloud-siem-xxxx que muestra una línea azul en la parte superior del primer índice" style="width:65%;">}}

4. El texto confirma la posición seleccionada: «Select the new placement of your index: Position 1» (Selecciona la nueva posición del índice: Posición 1). Haz clic en **Move** (Mover).

5. Revisa el texto de advertencia. Si estás conforme con el cambio, haz clic en **Reorder** (Reordenar).

6. Revisa el orden de los índices y confirma que el índice `cloud-siem-xxxx` está donde quieres que esté. Si quieres moverlo, haz clic en el icono **Move to** (Mover a) y sigue los pasos 3 a 5.

7. Vuelve a la [página de configuración de Cloud SIEM][11].

Ahora el índice de Cloud SIEM debería estar en la primera posición. Si la página de configuración sigue mostrando una advertencia sobre la posición del índice, espera unos minutos y actualiza el navegador.

Después de mover el índice a la primera posición, revisa la configuración y los estados de los [paquetes de contenido][11] y las [otras fuentes de logs][11]. Haz clic en cada integración que muestre una advertencia o error y sigue las instrucciones para solucionarlo.

## Fase 2: Exploración de señales

1. Echa un vistazo a las [reglas de detección que ya vienen preparadas][12] para detectar amenazas en tu entorno de inmediato. Las reglas de detección se aplican a todos los logs procesados para maximizar la cobertura de detección. Consulta el material de referencia de las [reglas de detección][13] para obtener más información.

2. Revisa las [señales de seguridad][14]. Cuando se detecta una amenaza con una regla de detección, se genera una señal de seguridad. Consulta la documentación de las [señales de seguridad][15] para obtener más información.

    - [Configura las reglas de notificación][16] para recibir un aviso cuando se generen señales. Puedes recibir alertas mediante Slack, Jira, correo electrónico, webhooks y otras integraciones. Consulta el material de referencia de las [reglas de notificación][17] para obtener más información.
    - Suscríbete a los [informes semanales de amenazas][18] para iniciar la investigación y corrección de las amenazas de seguridad más importantes que se han detectado en los siete días anteriores.

## Fase 3: Investigación

1. Usa [Investigator][19] para agilizar la corrección. Consulta la documentación de [Investigator][20] para obtener más información.
2. Utiliza [dashboards ya preparados][21] o [crea el tuyo][22] para las investigaciones, la generación de informes y la monitorización.

## Fase 4: Personalización

1. Configura [reglas de supresión][23] para reducir el ruido.
2. Crea [reglas de detección personalizadas][24]. Lee las [prácticas recomendadas para crear reglas de detección][25].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration/siem/log-sources
[3]: /es/logs/guide/best-practices-for-log-management/
[4]: /es/integrations/
[5]: /es/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/landing
[9]: https://app.datadoghq.com/security/content-packs
[10]: https://app.datadoghq.com/security/configuration/siem/log-sources
[11]: https://app.datadoghq.com/security/configuration/siem/setup
[12]: /es/security/default_rules/#cat-cloud-siem-log-detection
[13]: /es/security/detection_rules/
[14]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[15]: /es/security/cloud_siem/investigate_security_signals
[16]: https://app.datadoghq.com/security/configuration/notification-rules
[17]: /es/security/notifications/rules/
[18]: https://app.datadoghq.com/security/configuration/reports
[19]: https://app.datadoghq.com/security/investigator/
[20]: /es/security/cloud_siem/investigator
[21]: https://app.datadoghq.com/dashboard/lists/preset/100
[22]: /es/dashboards/#overview
[23]: /es/security/cloud_siem/detection_rules/?tab=threshold#advanced-options
[24]: /es/security/cloud_siem/detection_rules/
[25]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
