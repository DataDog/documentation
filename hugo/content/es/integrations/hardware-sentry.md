---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/sentry_software_hardware_sentry
app_id: hardware-sentry
categories:
- gestión de costes
- marketplace
- red
custom_kind: integración
description: Métricas de hardware y sostenibilidad para más de 100 sistemas (Cisco,
  Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA, Pure, etc.)
integration_version: 1.1.0
media:
- caption: El dashboard principal de Hardware Sentry ofrece información general del
    consumo energético y las emisiones de carbono de todos los centros de datos y
    salas de servidores. Aprovecha las métricas recopiladas por Hardware Sentry OpenTelemetry
    Collector.
  image_url: images/dashboard-main.png
  media_type: imagen
- caption: 'Diagrama de arquitectura: Hardware Sentry OpenTelemetry Collector se ejecuta
    on-premises, monitoriza tus servidores, conmutadores y sistemas de almacenamiento,
    y envía métricas a tu entorno Datadog.'
  image_url: images/architecture.png
  media_type: imagen
- caption: Para cada host monitorizado, Hardware Sentry monitoriza sus componentes
    electrónicos (CPU, memoria, discos, NIC, sensores, etc.), su consumo de energía
    y sus emisiones de carbono.
  image_url: images/dashboard-host.png
  media_type: imagen
- caption: Para cada sitio (centro de datos o sala de servidores), se estiman el consumo
    de energía y las emisiones de carbono de 1 día, 1 mes y 1 año. Se recomienda la
    temperatura óptima con su potencial de ahorro energético a lo largo de un año.
  image_url: images/dashboard-site.png
  media_type: imagen
- caption: Todos los problemas de hardware (discos, módulos de memoria, NIC, fuentes
    de alimentación, etc.) se monitorizan con monitores específicos, con mensajes
    detallados.
  image_url: images/events-explorer.png
  media_type: imagen
- caption: La integración Hardware Sentry viene con una colección de monitores recomendados
    para informar de los problemas de hardware de tu infraestructura.
  image_url: images/triggered-monitors.png
  media_type: imagen
supported_os:
- linux
- windows
title: Hardware Sentry
---
## Información general

**[Hardware Sentry](https://www.sentrysoftware.com/products/hardware-sentry.html)** es un agente especializado en la monitorización de los componentes de hardware de cualquier servidor, conmutador de red o sistema de almacenamiento de tu centro de datos, que trae en su paquete un conjunto de dashboards y monitores para Datadog.

### Monitorización del hardware

**Hardware Sentry** es un agente de monitorización capaz de informar del estado físico de servidores, conmutadores de red y sistemas de almacenamiento. Recopila métricas periódicamente para informar del estado de cada procesador, controlador, disco o fuente de alimentación, de las temperaturas, la velocidad de los ventiladores, el estado de los enlaces, la velocidad de las tarjetas de red y mucho más.

- **Remoto**: Un agente para la monitorización de cientos de sistemas, a través de SNMP, WBEM, WMI, SSH, IPMI, API REST y más.
- **Multiplataforma**: Más de 100 plataformas compatibles con más de 250 conectores (Cisco, Dell EMC, HP, Huawei, IBM, Lenovo, NetApp, Oracle, Pure, etc.). Para obtener la lista completa de plataformas compatibles, consulta la [documentación de Hardware Sentry](https://www.sentrysoftware.com/docs/hws-doc/latest/platform-requirements.html).
- **Simple**: La monitorización de un sistema requiere un esfuerzo mínimo de configuración para especificar el nombre de host o la dirección IP y las credenciales. **Hardware Sentry** detectará automáticamente el instrumentación disponible e iniciará la monitorización de forma inmediata.
- **Normalizado**: Toda la información necesaria se comunica a través de métricas normalizadas en Datadog. La misma métrica `hw.temperature`, por ejemplo, se utiliza para representar la temperatura en un archivador NetApp, un HP BladeSystem, un Dell PowerEdge ejecutando Windows, un Cisco UCS ejecutando Linux, o cualquier otra plataforma. Estas métricas siguen [convenciones semánticas de OpenTelemetry](https://opentelemetry.io/docs/reference/specification/metrics/semantic_conventions/hardware-metrics/).

**Hardware Sentry** viene con monitores predefinidos para detectar e incluso predecir fallos en procesadores, módulos de memoria, discos, tarjetas de red, controladores, fuentes de alimentación, ventiladores, sensores de temperatura y mucho más.

### Informes sobre consumo de energía y huella de carbono

Además de monitorizar el estado físico, **Hardware Sentry** también informa del consumo de energía de cada sistema monitorizado. Combinados con métricas que representan el coste de la electricidad y la densidad de carbono, los dashboards proporcionados informan del uso de electricidad de tu infraestructura en kWh y de su huella de carbono en toneladas de CO2.

**100% software**: No se requieren PDU inteligentes, ¡incluso para sistemas que no están equipados con un sensor de potencia interno!

### Dashboards

Esta integración incluye un conjunto de dashboards que aprovechan las métricas recopiladas por el **[Hardware Sentry OpenTelemetry Collector](https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html)**:

| Dashboard | Descripción |
|---|---|
| Hardware Sentry - Principal | Información general de todos los hosts monitorizados, con especial atención a la sostenibilidad. |
| Hardware Sentry - Sitio | Métricas asociadas a un *sitio* (un centro de datos o una sala de servidores) y sus *hosts* monitorizados |
| Hardware Sentry - Host | Métricas asociadas a un *host* y sus dispositivos internos |

## Soporte

La suscripción a **Hardware Sentry** a través de Datadog Marketplace concede acceso a todos los servicios prestados por [Sentry Desk](https://www.sentrysoftware.com/desk):

- Asistencia técnica a través de [Jira Service Management](https://sentrydesk.atlassian.net/servicedesk/customer/portals)
- Base de conocimientos
- Parches

Al suscribirse, tu organización recibirá una invitación para gestionar tu cuenta de *Sentry Desk*.

### Referencias adicionales:

Documentación útil adicional, enlaces y artículos:

- [Seguimiento de tu huella de carbono con la oferta de Hardware Sentry en Datadog Marketplace](https://www.datadoghq.com/blog/sustainability-monitoring-carbon-footprint-hardware-sentry-datadog/)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/hardware-sentry" target="_blank">Haz clic aquí</a> para adquirirla.