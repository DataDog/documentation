---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: On-Call
- link: /service_management/incident_management/
  tag: Documentación
  text: Gestión de incidentes
title: Migrar desde tu actual proveedor de servicios de guardia
---

La migración desde tu actual proveedor de servicios de guardia a [Datadog On-Call][1] permite a los equipos centralizar la monitorización y la respuesta ante incidentes, reducir la complejidad de las alertas y unificar la monitorización y la respuesta ante incidentes. Esta guía te proporciona una estrategia por fases para ayudarte a planificar, probar y finalizar con éxito una migración.

Muchas organizaciones empiezan probando Datadog On-Call con un pequeño número de equipos para comprobar la funcionalidad y evaluar su aptitud operativa. Partiendo de esa base, esta guía te mostrará los pasos clave para pasar de la evaluación a la adopción plena en producción.

Aprenderás a:

- Crear un inventario y evaluar la configuración actual de tus servicios de guardia
- Configurar Datadog On-Call en función de la estructura de tu equipo y de las vías de escalado
- Validar los flujos de trabajo de enrutamiento y escalado de alertas
- Desconectarte de tu proveedor legacy de forma segura
- Monitorizar, mantener y escalar tus nuevos procesos de guardia

La guía también incluye listas de validación, estrategias de reversión y salvaguardas para garantizar una transición fiable y de bajo riesgo.

**¿Quién debe utilizar esta guía?**

Esta guía está dirigida a los ingenieros y las partes interesadas que participan en la migración de servicios de guardia, incluyendo ingenieros de fiabilidad del sitio (SRE), ingenieros de DevOps, jefes de equipo y otras personas responsables de configurar o gestionar los flujos de trabajo de respuesta ante incidentes.

## Crear un inventario y asignar tu configuración actual

Empieza por crear un inventario de todas las herramientas que actualmente llaman a tu equipo de guardia. Esto incluye:

- Monitorización de plataformas (como Datadog, CloudWatch y Prometheus)
- Sistemas de tickets (como Jira y Zendesk)
- Herramientas personalizadas de alertas o flujos de trabajo

Para cada herramienta, documenta el método de integración actual, ya sea a través de integraciones nativas, webhooks, ingestión de correo electrónico o scripts personalizados.

Al evaluar la configuración actual de tus servicios de guardia, empieza a identificar cómo se traducirán sus componentes (horarios, rutas de escalado, anulaciones y grupos de respuesta) en el modelo de configuración de Datadog On-Call. Esta es también una buena oportunidad para simplificar una lógica de escalado compleja u obsoleta y estandarizar las políticas entre los equipos. Evita migrar configuraciones que no se utilizan o legacy, a menos que exista una clara necesidad operativa de conservarlas.

Para favorecer una fase de configuración continua, asegúrate de obtener:

- Controles de acceso y permisos del equipo
- Asignación de intervinientes de emergencia y preferencias de notificación 
- Anular Windows y expectativas de transición

Un modelo de alerta unificado en Datadog puede ayudar a reducir la carga operativa y mejorar la visibilidad, pero solo si tus entradas están claramente definidas y cuidadosamente asignadas desde el principio.

## Diseñar tu estrategia de migración 

El éxito de una migración depende de un plan claro y por fases que alinee a las partes interesadas, reduzca los riesgos y mantenga abierta la comunicación. Divide tu migración en etapas controlables:

1. **Detección**: Documenta flujos de trabajo actuales, integraciones, reglas de alerta y requisitos del equipo.
2. **Configuración**: Configura Datadog On-Call en función de tu configuración actual y de las mejoras deseadas.
3. **Validación y tests**: Confirma que las alertas se enrutan correctamente y que la lógica de escalado se comporta como se espera.
4. **Traspaso**: Transición de la responsabilidad de alerta a Datadog On-Call, normalmente utilizando una ventana de enrutamiento doble.
5. **Limpieza**: Pon fuera de servicio los sistemas legacy, verifica la estabilidad y actualiza la documentación y los libros de ejecución.

Asigna responsables claros a cada fase y comunica los plazos con antelación. Utiliza un canal compartido (como Slack o Microsoft Teams) para coordinar tareas, compartir actualizaciones y señalar bloqueos en tiempo real.

## Configurar Datadog On-Call

Antes de empezar a configurar Datadog On-Call, revisa el concepto de [Equipos][4]. Los equipos son la base de los servicios de guardia y se utilizan para definir:

- Horarios
- Políticas de escalado
- Reglas de notificación
- Propiedad de los incidentes

Después de revisar el modelo de equipo y asignar tus recursos existentes, ya puedes configurar Datadog On-Call para reflejar tu estructura deseada.

<div class="alert alert-info">Si estás migrando desde PagerDuty, Datadog proporciona una <a href="/service_management/on-call/guides/migrate-your-pagerduty-resources-to-on-call">herramienta de migración exclusiva</a> que puede ayudarte a importar selectivamente horarios y políticas de escalado. Utilízala durante la configuración para reducir el esfuerzo manual y evitar migrar configuraciones que no se utilizan.</div>

Durante la configuración, asegúrate de:

- Revisar los permisos del equipo y el control de acceso
- Definir los intervinientes de emergencia y las preferencias de notificación 
- Configurar la anulación de Windows y las expectativas de transición de los servicios de guardia

Una configuración minuciosa garantiza un traspaso continuo y ayuda a los equipos a responder eficientemente desde el primer día.

## Validar y monitorizar la migración

Antes de poner fuera de servicio tu sistema legacy, realiza tests exhaustivos para confirmar que Datadog On-Call enruta, escala y notifica correctamente a todos los equipos de todos los escenarios de alerta.

### Lista de validación

- **Enrutar alertas de monitores críticos**: Identifica tus monitores con mayor gravedad y activa alertas de test para confirmar que se enrutan al equipo de Datadog On-Call adecuado. Asegúrate de que las entregas sean puntuales y que los metadatos estén correctos.
- **Verificar cadenas de escalado**: Simula alertas no reconocidas para garantizar que los escalados siguen la secuencia prevista. Incluye escalados temporales y de respaldo. Confirma la recepción por parte de todos los intervinientes previstos.
- **Verificar canales de notificación**: Asegúrate de que los miembros del equipo reciben alertas a través de todos los métodos configurados, incluyendo correo electrónico, SMS, notificaciones push y voz. Pide a los destinatarios que confirmen la entrega y la claridad del contenido.
- **Probar anulaciones y transiciones**: Configura una anulación temporal para un miembro del equipo y confirma que las alertas se enrutan correctamente durante ese periodo. Repítelo con una transición entre turnos para detectar casos extremos.
- **Confirmar la visibilidad en Slack o Teams**: Activa una alerta de prueba y confirma que aparece en los canales de incidentes de Slack o Teams con las etiquetas (tags), la propiedad y los enlaces correctos para confirmarla o resolverla.
- **Simular incidentes en Synthetic**: Activa manualmente alertas de Synthetic o utiliza monitores ficticios para probar flujos de trabajo completos de incidencias, incluyendo el reconocimiento, el escalado y la resolución.
- **Cobertura de horarios de auditoría**: Revisa minucioisamente los horarios del equipo para asegurarte de que no queden horas sin cubrir, incluyendo fechas festivas y fines de semana.
- **Comparar con el proveedor legacy**: Si utilizas el enrutamiento dual, comprueba que ambos sistemas reciben alertas y siguen un comportamiento de escalado similar. Registra y resuelve cualquier discrepancia antes del traspaso.

### Enrutamiento dual en la práctica

Muchas organizaciones optan por ejecutar un enrutamiento dual durante la validación, enviando alertas en paralelo a su proveedor legacy y a Datadog On-Call. Esto permite a los equipos:

- Comparar el enrutamiento de las alertas y el comportamiento del escalado en tiempo real
- Confirmar que no existen lagunas entre los sistemas
- Reducir el riesgo durante el periodo de transición

Utiliza el [editor de monitores en bloque][3] de Datadog para añadir identificadores de Datadog On-Call junto con los destinos existentes. Una vez que hayas confirmado el rendimiento y la cobertura, podrás eliminar las rutas de alerta legacy y finalizar el traspaso.

### Monitorizar la migración

Utiliza dashboards de Datadog para observar el rendimiento de la migración en tiempo real. Controla:

- Volumen de alertas por proveedor
- Latencia de confirmación y escalado
- Incidencias que no cuentan con la propiedad de un equipo

Estas señales ayuda a confirmar la preparación, a detectar errores de configuración y a señalar problemas antes del traspaso completo.

## Desconectar y retirar sistemas legacy 

Una vez completada la confirmación y cuando todos los equipos utilicen activamente Datadog On-Call, comienza a retirar tu proveedor legacy. Para minimizar las interrupciones, la mayoría de los equipos lo hacen de forma gradual:

- Retirando primero las vías de alerta de baja gravedad o poco frecuentes
- Eliminando horarios, políticas de escalado y claves de enrutamiento obsoletos
- Archivando las configuraciones legacy o expórtandolas como documentación de referencia

Comprueba minuciosamente que todos los monitores apuntan exclusivamente a Datadog On-Call y que las integraciones legacy ya no están en uso. Si durante el periodo de enrutamiento dual se detectan incoherencias o lagunas, resuélvelas antes de finalizar el traspaso.

Finalizar este paso garantiza una transición limpia y elimina el riesgo de confundir o pasar por alto las alertas durante la respuesta a incidentes.

## Sostener y escalar la práctica de tus servicios de guardia

Una vez finalizada la migración principal a Datadog On-Call, céntrate en las operaciones a largo plazo y en la mejora continua. Utiliza las siguientes prácticas para mantener la buena salud de tus procesos de guardia, mantener la preparación del equipo y desarrollar tu configuración a medida que crecen tus necesidades.

- **Establecer una responsabilidad permanente**: Asigna a tu equipo una clara responsabilidad de Datadog On-Call. Esto incluye el mantenimiento de los horarios, la incorporación de nuevos intervinientes y la adaptación a los cambios de las funciones a lo largo del tiempo.
- **Incorporar análisis retrospectivos**: Revisa los incidentes ocurridas durante o después de la migración para identificar cualquier problema de escalado o alerta que se haya pasado por alto. Incorpora estas lecciones a tu documentación de tests y libros de ejecución.
- **Realizar un seguimiento del estado de los servicios de guardia**: Utiliza [On-Call Analytics][8] para monitorizar el volumen de alertas por interviniente, las tendencias MTTA/MTTR, la fatiga de las notificaciones y los escalados recurrentes.
- **Mantenerse al día**: Suscríbete a las [actualizaciones del producto Incident Response][9] para mantenerte al día con las nuevas funciones, mejoras y funciones obsoletas.
- **Profundizar en tu conocimiento del producto**: Explora la documentación de Datadog sobre [Gestión de incidentes][6], [Horarios][7] e [Integraciones][2] para ampliar tu uso de la plataforma.
- **Únete a la comunidad**: Conéctate con colegas e ingenieros de Datadog en la [Datadog Slack Community][10] para compartir las prácticas recomendadas, obtener consejos y dar tu opinión.
- **Programar una evaluación retrospectiva**: Entre 30 y 60 días después de la migración, organiza una evaluación retrospectiva para reunir las lecciones aprendidas y actualizar la documentación, las guías internas y los planes de tests.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/
[2]: /es/integrations/
[3]: /es/monitors/notify/#bulk-editing-monitor--handles
[4]: /es/service_management/on-call/teams/
[6]: /es/service_management/incident_management
[7]: /es/service_management/on-call/schedules/
[8]: https://app.datadoghq.com/on-call/analytics
[9]: https://app.datadoghq.com/release-notes?category=Incident%20Response
[10]: https://chat.datadoghq.com/