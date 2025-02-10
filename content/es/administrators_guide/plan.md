---
description: Planifica con éxito tu instalación de Datadog.
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Empezando con el Etiquetado unificado de servicios
- link: /getting_started/tracing/
  tag: Documentación
  text: Empezando con el rastreo de APM
title: Planificación de tu instalación de Datadog
---

## Información general

Cuando se planifica una nueva instalación de software, es esencial comprender sus capacidades, objetivos, plazos, equipos y patrones de diseño. En la fase de planificación, aprende los conceptos básicos de Datadog, define tus objetivos más importantes, conoce las prácticas recomendadas e identifica cómo optimizar tu instalación de Datadog. 

## Diseño

### Ejercicio de delimitación del contexto

Fijar un objetivo claro es fundamental para instalar Datadog. Sin embargo, en la práctica, al inicio es imposible predecir todo lo que se podría necesitar. Los ingenieros de productos iteran sus implementaciones y los operadores de sistemas controlan sus cambios, todo ello para controlar el riesgo. El despliegue de una instalación de Datadog a gran escala se beneficiará de las prácticas habituales de gestión de proyectos. Como parte de este proceso, hay ciertos elementos de Datadog que debes incluir. Envía a tu organización de ingeniería un formulario de análisis para dimensionar y marcar tus necesidades.

**Recomendaciones:**   
Empieza pronto a recopilar y consolidar un análisis de tu organización. Crea una vista completa de tus ecosistemas, lenguajes de aplicación, almacenamiento de datos, redes e infraestructura.

Un ejemplo de formulario de análisis podría ser el siguiente: 

```
Nombre de la aplicación:  
  Lenguaje:  
     Marcos:  
  Capa de modelo:  
  Capa de vista: 
  Capa de controlador:  
  Tipo infra:  
  Sistemas operativos:
```

## Prácticas recomendadas generales 

Completa el ejercicio de delimitación del contexto para comprender los tipos de tecnologías con las que trabajas y empezar a asignarlas a los productos principales en Datadog.

### Etiquetado de recursos

Datadog es una herramienta para correlacionar datos de máquinas con las aplicaciones en ejecución y sus descriptores físicos. Puede cruzar referencias de un dato individual con otros, independientemente de su tipo. El nombre de host, las regiones de la nube, la versión del sistema operativo y la IP son algunos de los atributos de recursos que se aplican automáticamente. Además, Datadog permite generar etiquetas (tags) personalizadas como `cost-code`, `AppName`, `environment` y `version`.

La potencia de Datadog reside en su capacidad para mantener y gestionar un vocabulario unificado e incluye funciones de datos integradas. El [Etiquetado unificado de servicios][1] utiliza etiquetas (tags) reservadas que permiten correlacionar la telemetría en todas las funciones de la plataforma Datadog.

Las etiquetas (tags) son pares `key:value` o valores simples. Añaden dimensión a los datos de rendimiento de la aplicación y a las métricas de la infraestructura. Antes de empezar a monitorizar con Datadog, aprovecha las capacidades de etiquetado que ofrecen tus plataformas, ya que Datadog importa automáticamente estas etiquetas (tags) a través de sus integraciones. La siguiente tabla es una representación de cómo funcionan los pares `key:value` y si las etiquetas (tags) se añaden automática o manualmente.

| ETIQUETA (TAG)                  | CLAVE            | VALOR         |  MÉTODO     |
|----------------------|----------------|---------------| ---------------|
| ent:staging     | env            | staging  | automático
| tipo_componente:base_de_datos | tipo_componente | base de datos      | manual
| región:us-west-1 | región | us-west-1      | automático


La guía [Empezando con el etiquetado][2] es un buen lugar para empezar con este tema. He aquí algunos puntos destacados adicionales:

- Una servicio se define como una huella de aplicación única, algo que puede desplegarse de forma independiente.
- Los valores de etiquetas (tags) deben ser coherentes. Por ejemplo, "Producción" es diferente de "Prod".
- Define fuentes de verdad para la etiquetas (tags) dinámicas, como la versión del código.

**Recomendaciones**:  

- Tan pronto como sea posible, comprende el [Etiquetado unificado de servicios de Datadog][2] y desarrolla tu esquema de etiquetado.
- Alinea tu infraestructura con tus etiquetas (tags) recopiladas y automatiza el proceso de etiquetado siempre que sea posible (por ejemplo, utiliza valores hash git de pipelines CI como etiquetas (tags) de versión mediante etiquetas (labels) de Kubernetes). Esto unifica tus datos, permitiéndote crear alertas informativas asignando [propietarios a servicios][72] y cambiar entre métricas, logs, y trazas (traces) de servicios.

El siguiente diagrama muestra el aspecto de cada una de las tres etiquetas (tags) reservadas a medida que creas tu entorno:

{{< img src="/administrators_guide/unified_service_tagging_diagram.png" alt="Diagrama del Etiquetado unificado de servicios con 3 etiquetas (tags) reservadas: Servicio, Ent, Versión" style="width:90%;">}}

### Control de acceso

A nivel de diseño arquitectónico, existen dos áreas principales de control de acceso dentro de Datadog: estructura de la organización y [control de acceso basado en roles (RBAC)][4].

#### RBAC

El control de acceso basado en roles de Datadog puede conectarse a tu servicio de autenticación SAML existente. Las asignaciones agrupadas SAML se pueden crear a partir de los roles y objetos de equipo predeterminados de Datadog. Datadog proporciona tres roles predeterminados que puedes personalizar para adaptarlos a la complejidad de tus propios roles AD/LDAP. También puedes configurar [cuentas de servicios][6] para fines no interactivos como la propiedad de [API y clave de API][7], para separar las actividades del usuario de las tareas del sistema. Los permisos granulares determinan el acceso y las protecciones que necesitas.

Como capa adicional, [Equipos][8] te permite crear grupos flexibles, informales y ad hoc a los que los usuarios pueden unirse o ser añadidos. La función Equipos está disponible en todos los productos de Datadog.

#### Estructura multiorganización

Los grandes clientes de Datadog suelen tener más de una instalación de Datadog. Esto lo suelen utilizar los proveedores de servicios gestionados para garantizar que sus clientes no tengan acceso a los datos de los demás. En algunos casos, es necesario el aislamiento total dentro de una misma empresa. Para adaptarte a esta topología, puedes gestionar [varias cuentas de organización][5]. Por ejemplo, puedes ver el uso total en el nivel principal, mientras permaneces completamente separado tecnológicamente. Las organizaciones secundarias deben gestionarse desde una única cuenta de organización principal. 

**Recomendaciones:**

- Define un plan específico para crear roles de usuario en Datadog.
- Aprovecha las cuentas de servicios para la administración de claves de API.
- Explora Equipos para vincular recursos como dashboards, servicios, monitores e incidentes a un grupo de usuarios.

## Prácticas recomendadas de productos

### APM

APM depende de la aplicación del Etiquetado unificado de servicios. Estas etiquetas (tags) son fundamentales para la experiencia operativa y también son útiles para permitir la correlación a través de tus datos de telemetría. Así es como Datadog puede ayudarte a determinar el propietario de un proceso Java aleatorio que descubras.  
Por lo general, la configuración de APM predeterminada es suficiente para la mayoría de los casos de uso, pero, por ejemplo, si quieres cambiar las frecuencias de muestreo o personalizar otras configuraciones de APM, utiliza las siguientes directrices.

**Recomendaciones:** 
- Identifica los servicios a instrumentar y determina si están basados en hosts, en contenedores o en serverless.
- Determina el método disponible para instrumentar tus servicios en Datadog, dependiendo del lenguaje utilizado o de su entorno de tiempo de ejecución. Estos métodos van desde el paso único hasta la [instrumentación][75] manual.
- Revisa la documentación de los [controles de ingesta][9].
- Configura tu frecuencia de muestreo mediante [configuración remota][10] para escalar la ingesta de trazas de tu organización, según tus necesidades, sin necesidad de reiniciar tu Agent. Para obtener más información, consulta los [casos de uso de la frecuencia de muestreo][11].
- Asegúrate de que se aplica el [Etiquetado unificado de servicios][12] y revisa la [semántica de las etiquetas (tags) de tramos][13].
- Opta por [dependencias de servicios inferidos][51] para permitir la detección automática de tus nombres de servicios a partir de los atributos de tramos.

### Gestión de Logs

Las capacidades de gestión de logs te permiten a ti y a tus equipos diagnosticar y solucionar problemas de infraestructura. Con [Logging without LimitsTM][14], puedes crear patrones de recopilación de logs sintonizables y extraer información de tus datos de logs en métricas personalizadas. También puedes recibir alertas de errores críticos en tus logs, sin necesidad de indexarlos (es decir, almacenarlos).

{{< img src="/administrators_guide/logging_without_limits.png" alt="Diagrama de Logging without Limits" style="width:90%;">}}

La arquitectura de índices de logs de Datadog es un almacén columnar distribuido de series temporales que está optimizado para servir consultas de análisis y agregación de gran tamaño. Para obtener más información sobre la arquitectura de la generación de logs de Datadog, consulta [Presentación de Husky][47] y [Husky Deep Dive][48].

La plataforma de generación de logs puede configurarse con varias capas de almacenamiento de logs. Cada una de ellas tiene sus propios casos de uso, que se describen a continuación:
| | Datos capturados | Conservación | Recuperación en Datadog | Controlador de costes |
| :---- | :---- | :---- | :---- | :---- |
| Ignorado | No | Ninguno | Ninguno | N/D |
| Ingerido][15] Logs-a-métricas | 15m en LiveTail Ninguno | Volumen
| [Archivo][16] | Al rehidratarse | Infinito | Lento | Volumen |
| Reenviar logs][17] Logs-a-métricas | Determinado por el objetivo | Ninguno | Volumen |
| [Índice][18] | Sí | 3, 7, 15, 30 días | Inmediato | Volumen y recuento de mensajes |
| [Flex Logs][19] | Sí\* | [Capas de almacenamiento][74] | Rápido | Volumen de recuperación |

\* La capacidad Flex Logs no incluye monitores/alertas y Watchdog. Pero aún podrás realizar logs-a-métricas en el flujo (flow) de ingesta antes de que los logs se indexen (tanto en estándar como en flex) y utilizar esas métricas en monitores. Se admite la correlación con otras telemetrías, como trazas.

Con estas funciones básicas puedes ingerir y monitorizar logs para algunos de los siguientes casos de uso:

Normalización del formato de logs  
: Control centralizado de fecha/hora, sustitución de valores y búsqueda de referencias.

Gestión global de datos sensibles e información de identificación personal (PII)
: La información de identificación personal (PII) y el analizador de datos sensibles (SDS) se depuran en primer lugar.

Enrutamiento y reenvío 
: Interfaz de usuario centralizada para enviar logs al índice, archivo o destino de reenvío.  

Captura del valor rentable 
: Definición del campo de log adaptable y destilación de alto volumen/bajo valor.

Archivo de logs global 
: Archivador de logs globales.

SIEM global
: Se prueba la seguridad de todos los logs durante la ingesta como preprocesador.

**Recomendaciones:**  
- Determina el método para enviar tus logs a Datadog, ya sea directamente a los endpoints de admisión URL de logs de Datadog o desde herramientas como Fluentbit, Syslog o Logstash.
- Pon a punto tu plan de ingesta de logs y revisa las prácticas recomendadas para la gestión de logs.
- Comprende [Logging without LimitsTM][14]. Identifica el estado de tus servicios con mayor cantidad de logs, observa los patrones de generación de altos volúmenes de logs y crea filtros de exclusión para patrones de logs.
- Configura [archivos de logs][16].

### Real User Monitoring

Real User Monitoring y Session Replay ofrecen información detallada sobre las experiencias de los usuarios finales de servicios o aplicaciones. Instala RUM en aplicaciones con sesiones de gran valor para aprovechar los datos y realizar cambios significativos. Session Replay proporciona una representación visual muy valiosa para solucionar los problemas observados por los usuarios. Puedes realizar un seguimiento de la experiencia real del cliente, que es más valiosa en los entornos de producción.

**Recomendaciones:** 

- Identifica los sitios web, las pantallas de las aplicaciones móviles, las acciones de los usuarios y el código front-end que son fundamentales para tu negocio, para realizar un seguimiento.
- Despliega RUM y Session Replay en producción y entornos de casi producción.
- [Descarta errores de front-end][21].
- Configura tu [frecuencia de muestreo de RUM][22].

### Synthetic Monitoring

La monitorización Synthetic es un conjunto de tests sintéticos completo que incluye tests para aplicaciones de navegador, aplicaciones móviles y API. Los resultados de los tests Synthetic pueden vincularse al comportamiento de la aplicación que generó y, a partir de allí, a la base de datos, las colas de mensajes y los servicios posteriores.

**Recomendaciones:**

- Identifica los endpoints de la API y los recorridos del usuario que son fundamentales para tu empresa y pruébalos con frecuencia.
- Elabora una hoja de ruta de las transacciones comerciales que se van a probar.
- Utiliza Synthetics junto con [APM y RUM][49].
- Revisa las [consideraciones sobre el consumo de la monitorización Synthetic][23].
- Reduce el mantenimiento de los tests utilizando [subtests][24].
- Haz elecciones intencionadas en la selección de localizaciones de tests. Realiza los tests desde donde se encuentran realmente tus clientes.
- Utiliza el [check HTTP][25] o el [check TCP][50] para monitorizar la caducidad del certificado SSL o el tiempo de actividad básico.

## Integraciones

Puedes utilizar integraciones {{< translate key="integration_count" >}}+ de Datadog para reunir todas las métricas y logs de tu infraestructura, para obtener información sobre todo un sistema de observabilidad. Las integraciones, ya sean basadas en SaaS o en el Agent, recopilan métricas para monitorizar dentro de Datadog. Las integraciones basadas en hosts se configuran con archivos yaml que viven en el directorio `conf.d` y las integraciones basadas en contenedores se configuran con metadatos como anotaciones o etiquetas (labels).

Existen diferentes tipos de integraciones en Datadog y el orden en que se presentan aquí es el que Datadog recomienda para su instalación.

| Categoría                                      | Descripción                                                                                                                                                                                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tecnologías en la nube ([AWS][52], [Google Cloud][53], [Azure][54])  | Estas integraciones utilizan credenciales provisionadas para buscar métricas de monitorización en endpoints. Ajústalas para que sólo ingieran la telemetría deseada.                                                                                                  |
| Respuesta ante incidentes ([Slack][55], [Jira][56], [PagerDuty][57])     | Estas integraciones envían notificaciones cuando se producen eventos y son vitales para establecer un sistema de alerta eficiente.                                                                                                                          |
| infraestructura ([orquestación][58], [sistema operativo][59], [red][60]) | Estas integraciones sirven como componentes fundacionales para la monitorización de tu infraestructura, reuniendo tanto métricas como logs.                                                                                                               |
| Capas de datos ([almacenes de datos][61], [colas de mensajes][62])      | Estas integraciones suelen consultar tablas internas de métricas de bases de datos, por lo que suele ser necesario que un administrador de la base de datos proporcione acceso al Agent.                                                                                              |
| Desarrollo ([automatización][63], [lenguajes][64], [control de la fuente][65]) | Estas integraciones envían métricas a Datadog y requieren una configuración en su extremo. Algunas pueden requerir DogStatsD para enviar métricas.                                                                                                               |
| Seguridad y cumplimiento ([Okta][66], [Agent de política abierta][67])   | Estas integraciones te permiten verificar el cumplimiento de tus normas.                                                                                                     |

**Recomendaciones**:

- Empieza a recopilar métricas de tus proyectos en el proceso de desarrollo lo antes posible.
- Los Agents instalados tienen automáticamente integraciones del sistema y NTP en ejecución y pueden detectar automáticamente las tecnologías compatibles en el host. ([Procesos en directo](#live-processes) debe estar activado para esta funcionalidad).
- Puedes elegir en la lista anterior aquello que te gustaría monitorizar. Si hay servicios que quieres monitorizar y que no tienen una integración, puedes explorar [Procesos en directo](#live-processes), [Universal Services Monitoring]][68], la [integración de un proceso][69] o un [check personalizado][70].  

## Recursos adicionales

Has logrado algunas victorias importantes y has adoptado las prácticas recomendadas de APM, RUM, la Monitorización Synthetic y la Gestión de logs. A continuación se indican algunos recursos adicionales que son importantes a la hora de planificar la fase de instalación.

### Procesos en directo

Utiliza [Procesos en directo][26] para ver todos tus procesos en ejecución en un solo lugar. Por ejemplo, observa la información a nivel de PID de un proceso Apache en ejecución para ayudarte a entender y solucionar problemas transitorios. Además, puedes consultar los procesos que se ejecutan en un host específico, en una zona de disponibilidad específica, o que ejecutan una carga de trabajo específica. [Configura][27] procesos en directo en tus hosts, contenedores o instancias AWS ECS Fargate para aprovechar esta función.

### Disponibilidad, latencia y caducidad de SSL 

Las operaciones del servidor web dependen de la disponibilidad de puertos en la red, la validez de los certificados SSL y las bajas latencias. Instala el [check HTTP][25] para monitorizar endpoints HTTP locales o remotos, detectar códigos de respuesta erróneos (como 404) y utilizar tests de API Synthetic para identificar [certificados SSL][71] que vayan a caducar pronto.

### Monitorización de redes en la nube

Los servidores web casi siempre están interconectados con otros servicios a través de un tejido de redes que es vulnerable a las caídas y puede dar lugar a retransmisiones. Utiliza la [integración de red][28] de Datadog y activa la [monitorización de redes en la nube][29] para obtener visibilidad del tráfico de red entre servicios, los contenedores, las zonas de disponibilidad y otras etiquetas (tags) de tu infraestructura.

## Servicios de plataforma

La monitorización de la infraestructura de Datadog viene con productos adicionales que puedes utilizar para maximizar la observabilidad de tus entornos.

### Catálogo de servicios

El [catálogo de servicios][30] proporciona información general de los servicios, mostrando cuáles se han desplegado recientemente, cuáles llevan tiempo sin desplegarse, qué servicios informan de más errores y cuáles tienen incidentes en curso, y mucho más.

El catálogo de servicios también te ayuda a evaluar la cobertura de tu configuración de observabilidad. A medida que avanzas en tu implementación, puedes ingresar a la pestaña Guía para la configuración de cada uno de tus servicios, para asegurarte de que tienen las configuraciones esperadas:

{{< img src="/administrators_guide/service_catalog_2.png" alt="Pantalla de inicio del catálogo de servicios" style="width:90%;">}}

Puedes añadir componentes que no estés planificando monitorizar inmediatamente, como trabajos o bibliotecas cron, para crear una vista global de tu sistema y marcar a los miembros del equipo responsables de estos componentes antes de la siguiente fase de tu implementación de Datadog.

### Catálogo de recursos

Utiliza el [catálogo de recursos][46] para ver información clave sobre los recursos, como metadatos, propiedad, configuraciones, relaciones entre recursos y riesgos de seguridad activos. Es el núcleo central de todos los recursos de tu infraestructura. El catálogo de recursos ofrece visibilidad sobre el cumplimiento de la infraestructura, incentiva las prácticas de etiquetado recomendadas, reduce los riesgos de las aplicaciones mediante la identificación de vulnerabilidades de seguridad, proporciona a los responsables de ingeniería una visión muy clara de las prácticas de seguridad y permite la exportación de recursos para el mantenimiento de registros o auditorías.

Puedes utilizar el catálogo de recursos en diversos contextos, entre ellos:

- Comprender la propiedad de los recursos por parte del equipo y encontrar los huérfanos para limpiarlos.
- Planificar actualizaciones de recursos que ejecutan versiones obsoletas.
- Acceder a la información de configuración y otros metadatos para acelerar la respuesta ante incidentes.
- Mantener tu postura de seguridad encontrando y resolviendo errores de configuración y vulnerabilidades.

### Catálogo de API 

Utiliza el [catálogo de API][33] para la categorización específica de endpoints de recursos, el rendimiento, la fiabilidad y la propiedad de todos tus endpoints de API en un solo lugar.

### Gestión de eventos

Sin ninguna configuración adicional, la [gestión de eventos][31] puede mostrar estados de evento de terceros, eventos generados a partir del Agent e integraciones instaladas. La gestión de eventos de Datadog centraliza eventos de terceros, como eventos de alertas y cambios. Datadog también crea automáticamente eventos a partir de varios productos, incluidos los monitores y el seguimiento de errores. También puedes utilizar la gestión de eventos para enviar alertas y notificaciones de monitores basadas en consultas de eventos.

### Seguimiento de errores 

Ve los errores allí donde se producen con el [Seguimiento de errores][32] de Datadog. El Seguimiento de errores puede ingerir errores de APM, Gestión de logs y Real User Monitoring para depurar problemas más rápidamente.

### Automatización de flotas  

Administra y gestiona de forma centralizada todos sus Datadog Agents con la [Automatización de flotas][34]. La Automatización de flotas puede identificar qué Agents necesitan actualizarse, enviar un aviso al servicio de asistencia y ayudar en la tarea de desactivar o rotar las claves de API.

{{< img src="/administrators_guide/fleet_automation.png" alt="Pantalla de inicio de la Automatización de flotas" style="width:90%;">}}

### Configuración remota

Utiliza la [configuración remota][35] (activado por defecto) de Datadog para configurar y cambiar de forma remota el comportamiento de los componentes Datadog (por ejemplo, Agents, bibliotecas de rastreo y workers de Observability Pipelines) desplegados en tu infraestructura. Para obtener más información, consulta [productos y capacidades compatibles][36].

### Notebooks 

Utiliza [notebooks][37] de Datadog para compartir información con los miembros del equipo y para ayudar a solucionar problemas en investigaciones o incidentes.

## Optimizar la recopilación de datos 

Datadog recopila muchas cosas en tus entornos, por lo que es importante limitar la cantidad de puntos de recopilación y establecer delimitaciones. En esta sección, aprenderás los mecanismos que controlan la recopilación de telemetría y analizarás cómo puedes codificar las necesidades de tu organización.

### Infraestructura

Datadog interactúa con la API de monitorización de gestores de HyperVisor (Hyper-V, vSphere, PCF), planificadores de contenedores (Kubernetes, Rancher, Docker) y proveedores de nube pública (AWS, Azure, GCP). La plataforma para [detectar automáticamente][38] recursos (pods, máquinas virtuales, EC2, ALB, AzureSQL, blobs GCP) dentro de esos entornos. Es importante limitar el número de recursos monitorizados, ya que afectan a la facturación.

**Recomendaciones**:   

Habilita la recopilación de recursos para [AWS][39] y [GCP][44] para ver un inventario de recursos, así como información sobre costes y seguridad. Además, limita la recopilación de métricas de tus [recursos de Azure][40] y de tus entornos [en contenedores][45].

## Niveles de servicio

Durante la fase de planificación, puede que descubras que no todos los casos de observabilidad son igualmente importantes. Algunos de ellos son de misión crítica, mientras que otros no lo son. Por este motivo, resulta útil diseñar patrones para los niveles de cobertura y para los entornos que quieres monitorizar con Datadog. Por ejemplo, un entorno de producción puede ser monitorizado en todos los niveles, pero una instancia de desarrollo de la misma aplicación puede tener sólo las herramientas centradas en el desarrollador.

**Recomendaciones**:

- Establece estimaciones de los niveles de servicio desde el principio. No es necesario que sean precisas al principio, pero serán útiles a medida que aumente la adopción.

### Ciclo de vida del desarrollo de software

Para empezar a trazar los patrones de tu instalación, combina la información que obtengas del [ejercicio de delimitación del alcance](#scoping-exercise) con la formación de [Datadog 101][73] y elabora un plan de acción. Considera el siguiente ejemplo y modifícalo para adaptarlo a las necesidades de tu organización. El ejemplo esboza un patrón de instalación de la dimensión del entorno SDLC (dev, qa, stage, prod), que puedes personalizar según tus normas y condiciones. Comienza a definir expectativas dentro de tu propia base de usuarios de Datadog de lo que significa "instalación estándar de Datadog".

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Denegar/Autorizar | Permitir | Permitir | Permitir |
| **Synthetics** | Denegar | Denegar/Autorizar | Permitir | Permitir |
| **Gestión de logs** | Permitir | Permitir | Permitir | Permitir |
| **RUM** | Denegar | Denegar/Autorizar |  Permitir | Permitir |
| **DBM** | Denegar/Autorizar | Denegar/Autorizar | Permitir | Permitir |
| **Procesos en directo** | Denegar | Denegar/Autorizar | Permitir | Permitir |
|  |  |  |  |  |

**Recomendaciones** :
No todas las herramientas sirven para todos los trabajos. Evalúa los casos de uso de los productos de Datadog y compáralos con tus necesidades. Ten en cuenta los niveles de SDLC, la importancia de la aplicación y la finalidad de cada producto de Datadog.

## Resumen

Es importante desarrollar y planificar un curso realista para la instalación de Datadog. En esta sección, has aprendido sobre la fase de planificación y las prácticas recomendadas, preparando tu huella Datadog para tener éxito. Has identificado y reunido tu base de conocimientos y a los miembros de su equipo, has desarrollado tus modelos de instalación, has planificado optimizaciones y has compilado una lista de prácticas recomendadas para los productos principales. Estas bases te preparan para las siguientes fases de la instalación de Datadog: creación y ejecución.

## Próximos pasos

Crea una metodología de despliegue detallada en la fase de [compilación][41] centrándote en la construcción del propio Datadog, itera en tu entorno, define algunos mecanismos de apoyo interno y prepárate para la producción.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}




[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/getting_started/tagging/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/account_management/rbac/?tab=datadogapplication
[5]: /es/account_management/multi_organization/
[6]: /es/account_management/org_settings/service_accounts/
[7]: /es/account_management/api-app-keys/
[8]: /es/account_management/teams/
[9]: /es/tracing/trace_pipeline/ingestion_controls/
[10]: /es/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /es/tracing/guide/ingestion_sampling_use_cases/
[12]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[13]: /es/tracing/trace_collection/tracing_naming_convention/
[14]: /es/logs/guide/getting-started-lwl/
[15]: /es/logs/log_configuration/logs_to_metrics/
[16]: /es/logs/log_configuration/archives/?tab=awss3
[17]: /es/logs/log_configuration/forwarding_custom_destinations/?tab=http
[18]: /es/logs/log_configuration/indexes
[19]: /es/logs/log_configuration/flex_logs/
[20]: /es/logs/guide/best-practices-for-log-management/
[21]: /es/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event
[22]: /es/real_user_monitoring/guide/best-practices-for-rum-sampling/
[23]: https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring#synthetic-testing--monitoring-common-questions
[24]: /es/synthetics/browser_tests/advanced_options/#subtests
[25]: /es/integrations/http_check/
[26]: /es/infrastructure/process/?tab=linuxwindows
[27]: /es/infrastructure/process/?tab=linuxwindows\#installation
[28]: /es/integrations/network/
[29]: /es/network_monitoring/cloud_network_monitoring/
[30]: /es/service_catalog/
[31]: /es/service_management/events/
[32]: /es/error_tracking/
[33]: /es/api_catalog/
[34]: /es/agent/fleet_automation/
[35]: /es/agent/remote_config/
[36]: /es/agent/remote_config/?tab=configurationyamlfile\#supported-products-and-feature-capabilities
[37]: /es/notebooks/
[38]: /es/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[39]: /es/account_management/billing/aws/#aws-resource-exclusion
[40]: /es/integrations/guide/azure-portal/?tab=vmextension\#metric-collection
[41]: /es/administrators_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /es/integrations/ping/
[44]: /es/integrations/google_cloud_platform/?tab=project#resource-changes-collection
[45]: /es/containers/guide/container-discovery-management/?tab=datadogoperator
[46]: /es/infrastructure/resource_catalog/
[47]: https://www.datadoghq.com/blog/engineering/introducing-husky/
[48]: https://www.datadoghq.com/blog/engineering/husky-deep-dive/
[49]: /es/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[50]: /es/integrations/tcp_check/?tab=host#data-collected
[51]: /es/tracing/guide/inferred-service-opt-in/?tab=java
[52]: /es/integrations/amazon_web_services/
[53]: /es/integrations/google_cloud_platform/
[54]: /es/integrations/azure/
[55]: /es/integrations/slack/?tab=datadogforslack
[56]: /es/integrations/jira/
[57]: /es/integrations/pagerduty/
[58]: /es/integrations/#cat-orchestration
[59]: /es/integrations/#cat-os-system
[60]: /es/integrations/network/
[61]: /es/integrations/#cat-data-stores
[62]: /es/integrations/#cat-message-queues
[63]: /es/integrations/#cat-automation
[64]: /es/integrations/#cat-languages
[65]: /es/integrations/#cat-source-control
[66]: /es/integrations/okta/
[67]: /es/integrations/open_policy_agent/
[68]: /es/universal_service_monitoring/
[69]: /es/integrations/process/
[70]: /es/developers/custom_checks/#should-you-write-a-custom-agent-check-or-an-integration
[71]: /es/synthetics/api_tests/ssl_tests/
[72]: /es/service_catalog/service_definitions/
[73]: https://learn.datadoghq.com/courses/dd-101-sre
[74]: /es/logs/log_configuration/flex_logs/#configure-storage-tiers
[75]: /es/tracing/trace_collection/