---
description: Mantén tu instalación de Datadog funcionando sin inconvenientes.
further_reading:
- link: getting_started/dashboards/
  tag: Documentación
  text: Empezando con los dashboards
title: Mantenimiento y funcionamiento de tu instalación de Datadog
---

En las secciones de [Planificación][24] y [Creación][25], aprendiste a establecer objetivos, diseñar estrategias de integración y construir e iterar en el entorno de Datadog para un uso de producción sin inconvenientes. A continuación, aprenderás sobre la fase de ejecución, en la que gestionarás una serie de tareas internas y externas para mantener la instalación de Datadog funcionando de manera eficiente. 

## Tareas de servicio

Reduce los riesgos y aumenta la adopción al lanzar instalaciones de Datadog nuevas de manera secuencial. En esta sección, se enumera una secuencia de lanzamientos de elementos para optimizar la experiencia del usuario con Datadog. Debido a la diversidad de la arquitectura de TI, esta guía es de alto nivel. Estos son algunos puntos destacados:

### Incorporación de una instancia de infraestructura nueva

La infraestructura es el elemento central de la TI y observabilidad. Es la tarea principal y más frecuente de un equipo de administradores de Datadog. La plataforma se puede adaptar y ofrece herramientas para optimizar la mayoría de las tareas. Comienza por adaptarla a tu entorno específico. Tu arquitectura de TI puede incluir componentes como hipervisores, hiperescaladores e infraestructura serverless.

**Recomendaciones**:   

Usa [Fleet Automation][1] para gestionar de manera remota tus Agents a gran escala. Monitoriza de manera continua a tus equipos para detectar solicitudes de infraestructura nuevas, marcándolas con antelación y aplicando recursos de ingeniería a fin de centrarse en expansiones apropiadas para tus ofertas de infraestructura.

### Incorporación de una huella de aplicación nueva

Añadir una aplicación a Datadog es una tarea común en los primeros días de la administración de Datadog. Desarrolla un mecanismo eficiente que se adapte a tus condiciones locales con los requisitos de Datadog. Como mínimo, incluye los elementos de la base de conocimientos en la fase de planificación, junto con consideraciones adicionales:  

- La etiqueta (tag) de servicio universal `version` es importante para muchas visualizaciones. Desarrolla un método automatizado, confiable y compatible para potenciar estas visualizaciones de mayor valor. 

- Establecer un [catálogo de servicios][2] integral proporciona numerosos beneficios en el futuro. El catálogo de servicios es fundamental para el patrón de diseño de Datadog y aloja los objetos de gobernanza, dependencia y definición de servicios.  

**Recomendaciones:**   
Desarrolla un etiquetado de versiones automático integrado en el proceso de creación de tu aplicación. Enfócate en el catálogo de servicios y realiza un seguimiento de la preparación con la guía de configuración.

## Problemas técnicos de despliegue

Debido a su estructura de plataforma como servicio, Datadog requiere poca resolución de problemas por parte del administrador. Para ayudar a identificar problemas en el Agent host, usa el [comando][3] ` datadog-agent status`. Este comando proporciona información detallada, específica y procesable que identifica áreas que se deben abordar. Además, usa el comando `datadog-agent flare` para detectar problemas que debe abordar el servicio de asistencia de Datadog con rapidez.

**Recomendaciones**:  
Usa los comandos `status` y `flare` desde el principio.

## Tareas de administración

Al igual que con cualquier otro software empresarial, las tareas de mantenimiento continuo se deben organizar de manera adecuada y cumplir con las políticas locales. Las tareas habituales incluyen:

### Monitorización del uso

Monitorizar el consumo es esencial, al igual que adoptar las herramientas proporcionadas para este propósito. Datadog proporciona un dashboard de [métricas de uso estimado][5] que puede servir como base para esta capacidad. También hay dashboards listos para usar a fin de visualizar el [uso estimado][6] en todos tus logs, métricas y trazas (traces). 

### Desplegar dashboards y monitores

Una vez que los usuarios se familiaricen con Datadog, pueden solicitar mejoras y ajustes en elementos de uso frecuente, como [dashboards][7] y [monitores][8]. Los componentes, incluidos los SLOs y otros objetos de contenido, se han diseñado para el desarrollo iterativo y están escritos en JSON. Se pueden clonar, exportar, modificar, importar y almacenar como archivos sin formato. Además, se encuentra disponible un [proveedor de Terraform][9], junto con una [API de dashboards][10] para interactuar con los dashboards y crearlos.  

Al crear dashboards, prioriza el contenido que quieres mostrar por sobre el proceso de construcción. Este proceso creativo se encuentra respaldado por herramientas de creación de dashboards y por los dashboards prediseñados que vienen con el producto. Cada dashboard dentro de las {{< translate key="integration_count" >}} integraciones es una plantilla de valor añadido para monitorizar su tecnología correspondiente. Los dashboards listos para usar ofrecen el beneficio de la experiencia y el modelo prescriptivo de Datadog para la observabilidad.  

**Recomendaciones:**  

- Determina el propósito del dashboard que estás creando.   
- Configura monitores para el uso de Datadog en función de las [métricas de uso estimado][6].  
- Crea [monitores de anomalías o cambios][11] en estas mismas métricas de uso estimado para enviar alertas cuando aumente el uso de Datadog.    
- [Vuelve a usar y clona][12] otros dashboards para ahorrar tiempo.  
- Usa [dashboards OOTB][13] para gestionar el consumo.

Un dashboard OOTB común es el dashboard de información general de AWS EC2:

{{< img src="/administrators_guide/ec2_overview.png" alt="Dashboard de información general de AWS EC2" style="width:90%;">}}

### Rotación de claves de API 

La plataforma de Datadog usa la autenticación de claves de API Restful estándar y recomienda seguir la [seguridad de claves de API][14] estándar, incluida la rotación de claves. También es beneficioso organizar la asignación de estas claves a grupos de trabajo lógicos para optimizar el perfil de seguridad y la operación de rotación.

**Recomendaciones:**   

Incorpora las claves de API y aplicación de Datadog a tus propios sistemas para la gestión de claves. Organiza las claves en grupos que se puedan mantener con facilidad. 

### Roles, equipos y conjuntos de permisos de los objetos de RBAC

El [RBAC][15] de Datadog depende de tu proveedor de SAML y del almacén de AD/LDAP previo a ese proveedor de SAML. Puede reflejar los grupos de usuarios de AD y asignar permisos específicos de Datadog en una asignación de grupos estándar. Se necesita la colaboración entre los administradores de Datadog y los de SAML/AD/LDAP a fin de intercambiar los nombres y atributos de grupos específicos para la estructura de clave-valor.    

## Actualizaciones del Datadog Agent

Los componentes del Agent se actualizan de manera periódica con mejoras de seguridad y funciones, por lo que es mejor mantenerse al día. Sigue los procedimientos locales para realizar tests y lanzar software nuevo.   

**Recomendaciones:**  

Incluye las actualizaciones de Datadog en los estándares de gestión de parches y las políticas de actualización existentes. Suscríbete a la [fuente de versiones de Datadog][17] y monitoriza de cerca tu [página de Fleet Automation][18] para conocer los Agents que requieren actualizaciones.

## Resumen

La administración de Datadog tiene varias actividades que deberían encajar bien en tus estándares de procesos existentes. Incorpora Datadog a tus sistemas estándar para la rotación de claves, actualizaciones de parches, incorporación e infraestructura como código (IaC). Publica estos estándares con antelación para ayudar a los usuarios a comenzar con tu instalación de Datadog nueva. 

## Siguientes pasos

Después de planificar, configurar y mantener con éxito tu instalación de Datadog, usa los siguientes recursos para respaldar tu recorrido continuo con Datadog:

- [Obtener una certificación de Datadog][20]
- [Comenzar a usar el servicio de asistencia de Datadog][21]
- [Registrarse para recibir los lanzamientos y boletines de seguridad nuevos de Datadog][22]
- [Consultar el blog de The Monitor][23]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/agent/fleet_automation/
[2]: /es/service_catalog/
[3]: /es/agent/configuration/agent-commands#agent-information
[4]: /es/agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /es/account_management/billing/usage_metrics/
[7]: /es/dashboards/#overview
[8]: /es/monitors/
[9]: /es/getting_started/integrations/terraform/#dashboards
[10]: /es/api/latest/dashboards/
[11]: /es/monitors/types/anomaly/
[12]: /es/getting_started/dashboards/#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /es/account_management/api-app-keys/#using-multiple-api-keys
[15]: /es/account_management/rbac/?tab=datadogapplication
[16]: /es/integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /es/api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /es/getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
[24]: /es/administrators_guide/plan/
[25]: /es/administrators_guide/build/