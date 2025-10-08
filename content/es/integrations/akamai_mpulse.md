---
categories:
- nube
dependencies: []
description: Integra Akamai mPulse con Datadog.
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: Blog
  text: Integrar Real User Monitoring de Akamai mPulse con Datadog
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Integra Akamai mPulse con Datadog.
team: web-integrations
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Conecta Datadog con Akamai mPulse para recopilar métricas de Real User Monitoring (RUM) y obtener visibilidad sobre cómo perciben los usuarios finales el rendimiento de un sitio web. Obtén una visibilidad completa de todo tu stack tecnológico web al analizar y correlacionar métricas de RUM con los datos de rendimiento de tu CDN e infraestructura de backend.

Utiliza el dashboard predefinido de Datadog y monitores para:
- Obtener una visión general de métricas clave como la tasa de rebote, las sesiones de usuario y los tiempos de carga de la página.
- Investigar el origen de la ralentización a la que se enfrenta el usuario, ya sea frontend o backend.
- Monitorizar los tiempos de carga y grupos de páginas

Correlaciona métricas con datos en tiempo real de [Akamai DataStream 2][1], [NGINX][2], [MYSQL][3] y más de otras 600 tecnologías para obtener una visión de frontend a backend de tu stack tecnológico web.

## Ajuste

### Instalación

Instala la integración con el [cuadro de integración de Akamai mPulse][4] en Datadog.

### Configuración

Se necesitan `apiKey` y `apiToken` para configurar la integración de Akamai mPulse.

#### Generar una clave de API

La `apiKey` es un valor autogenerado que identifica de forma única los datos de tu sitio (balizas) que se encuentran en tu portal de mPulse.

<div class="alert alert-danger">
La opción de menú "Apps" (Aplicaciones) y el atributo `apiKey` solo son visibles para los administradores de aplicaciones. 
</div>

1. Encuentra tu `apiKey` navegando hasta la página "Central".
2. Haz clic en **Apps** (Aplicaciones) en el panel izquierdo.
3. Selecciona el nombre de la aplicación que deseas monitorizar para abrir una página de configuración que contenga tu `apiKey`.

#### Generar un token de API

Consulta la [documentación de Akamai sobre el token de API][5] y a continuación:

1. Inicia sesión en `mpulse.soasta.com`.
2. Ve a My Settings (Mis ajustes) en el panel de la izquierda.
3. Haz clic en "Generate" (Generar) en el área de token de API.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "akamai_mpulse" >}}


### Eventos

La integración de Akamai mPulse no incluye ningún evento.

### Checks de servicios

La integración de Akamai mPulse no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/akamai_datastream_2/
[2]: https://docs.datadoghq.com/es/integrations/nginx/
[3]: https://docs.datadoghq.com/es/integrations/mysql/
[4]: https://app.datadoghq.com/integrations/akamai-mpulse
[5]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[7]: https://docs.datadoghq.com/es/help/