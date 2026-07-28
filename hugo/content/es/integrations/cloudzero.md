---
app_id: cloudzero
categories:
- gestión de costes
- nube
custom_kind: integración
description: Consultar y analizar tus costes de Datadog en la plataforma CloudZero
integration_version: 1.2.0
media:
- caption: Costes de la nube - Agrupados por proveedor
  image_url: images/CloudZero1.png
  media_type: imagen
- caption: Costes de Datadog - Agrupados por servicio
  image_url: images/CloudZero2.png
  media_type: imagen
supported_os:
- linux
- macOS
- Windows
title: CloudZero
---
## Información general

CloudZero ayuda a los equipos de ingeniería a crear softwares rentables. Utiliza su plataforma para asignar el 100% de tus costes de nube, PaaS y SaaS, independientemente de la calidad de etiquetado, y preséntalos en una vista unificada. Combina datos de costes por hora con telemetría a nivel de empresa y a nivel de sistema para colocar los datos de la nube en un contexto empresarial, mediante métricas de coste unitario precisas como el coste por cliente, por producto, por función, por equipo, etc. La detección de anomalías de CloudZero impulsada por IA alerta a los ingenieros sobre eventos de gastos anormales, indicándoles directamente cuál es la infraestructura afectada, y promueve el compromiso de los ingenieros con la gestión de costes de la nube.

### Beneficios

Una vez conectada, la plataforma CloudZero ingiere regularmente tu información de facturación de Datadog, tanto para costes comprometidos como para costes bajo demanda, en todos los productos de Datadog. CloudZero unifica estos datos con el resto de tus costes de nube, ofreciéndote una evaluación completa de tu inversión total en la nube. A continuación, la plataforma somete todo tu gasto de nube a numerosas funciones de análisis, revelando oportunidades de mejorar la eficiencia y permitiéndote elaborar y enviar informes personalizados.

## Configuración

### Instalación

Haz clic en **Install Integration** (Instalar integración) en el [cuadro de la integración Datadog](https://app.datadoghq.com/integrations/cloudzero). Una vez instalada la integración, haz clic en **Connect Accounts** (Conectar cuentas) en la pestaña **Configurar** para autorizar a CloudZero a acceder a tu cuenta de Datadog. Esto te llevará a la aplicación CloudZero, donde crearás una conexión añadiendo un nombre y seleccionando el sitio al que está asignada tu cuenta principal de Datadog.

Una vez creada la conexión, haz clic en **Continue** (Continuar) para autorizar a CloudZero a extraer datos de tu cuenta de Datadog hacia la plataforma CloudZero.

### Configuración

Puedes ajustar los parámetros de tu conexión a Datadog en CloudZero desde la página de detalles de la conexión.

### Validación

1. En la lista de [conexiones](https://app.cloudzero.com/organization/connections), puedes ver el estado de tu conexión a Datadog.
1. Haz clic en el nombre de tu conexión a Datadog para ver más detalles sobre la cantidad y la sincronización de los datos extraídos de Datadog.
1. Una vez que la ingesta de datos se haya ejecutado correctamente, consulta los costes de Datadog incluidos en el [Explorador de costes](https://app.cloudzero.com/explorer).

## Desinstalación

- Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.
- Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado, buscando el nombre de la integración en la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys).

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de CloudZero](mailto:support@cloudzero.com).