---
categories:
- nube
- recopilación de logs
- recopilación de logs
- la red
- seguridad
custom_kind: integration
dependencies: []
description: CrowdStrike
doc_link: https://docs.datadoghq.com/integrations/crowdstrike/
draft: false
git_integration_title: crowdstrike
has_logo: true
integration_id: ''
integration_title: CrowdStrike
integration_version: ''
is_public: true
manifest_version: '1.0'
name: crowdstrike
public_title: CrowdStrike
short_description: Recopila eventos de detección y alertas de CrowdStrike en tiempo
  real como logs de Datadog.
team: integraciones-web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

[CrowdStrike][1] es una solución de agente única cuyo objetivo es poner fin a las infracciones, el ransomware y los ciberataques mediante una visibilidad y una protección integrales en endpoints, cargas de trabajo, datos e identidades. 

La integración CrowdStrike te permite recopilar eventos de detección y alertas de CrowdStrike en tiempo real como logs de Datadog.

## Configuración

### Instalación

No se requiere ninguna instalación.

### Configuración

#### Activación del streaming de eventos

Antes de conectarte al [flujo (stream) de eventos][2], [ponte en contacto con el equipo de asistencia de CrowdStrike][3] para habilitar el streaming de API en tu cuenta de cliente.

#### Conexión de tu cuenta de CrowdStrike

Una vez habilitado el streaming, añade un nuevo cliente de API en CrowdStrike:

1. Inicia sesión en la consola Falcon.
1. Ve a [Support > API Clients and Keys (Soporte > Clientes y claves de API][4].
1. Haz clic en **Add new API client** (Añadir nuevo cliente de API).
1. Introduce un nombre de cliente descriptivo que identifique a tu cliente de API en Falcon y en los logs de acciones de API (por ejemplo, `Datadog`).
1. También puedes introducir una descripción como el uso previsto de tu cliente de API.
1. Selecciona el acceso de **Lectura** para todos los contextos de API.
1. Haz clic en **Add** (Añadir).

#### Habilitación de la recopilación de logs

Añade los detalles del cliente de API en el [cuadro de la integración CrowdStrike][5] en Datadog:

1. Haz clic en **Connect a CrowdStrike Account** (Conectar una cuenta de CrowdStrike).
1. Copia tu ID de cliente de API, secreto de cliente y dominio de API.
1. También puedes introducir una lista de etiquetas (tags) separadas por comas.
1. Haz clic en **Submit** (Enviar).

Al cabo de unos minutos, aparecen [logs][6] con el origen `crowdstrike` en el [dashboard de información general de logs de Crowdstrike][7].

## Datos recopilados

### Métricas

La integración CrowdStrike no incluye métricas.

### Eventos

La integración CrowdStrike permite a Datadog ingerir los siguientes eventos:

* Resumen de detecciones
* Coincidencia de cortafuegos
* Protección de la identidad
* Resumen de detecciones de LDP
* Resumen de incidentes
* Eventos de autenticación
* Actualización de estados de detección
* IoC (Indicadores de riesgo) cargados
* Eventos de contención en red
* Eventos de listas de IP permitidas
* Eventos de gestión de políticas
* Actividad de la tienda CrowdStrike
* Inicio/fin de sesión de respuesta en tiempo real
* Inicio/fin de flujos de eventos

Estos eventos aparecen en el [dashboard de información general de logs de Crowdstrike][7].

### Checks de servicio

La integración CrowdStrike no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://www.crowdstrike.com/
[2]: https://docs.datadoghq.com/es/service_management/events/explorer/
[3]: https://supportportal.crowdstrike.com/
[4]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[5]: https://app.datadoghq.com/integrations/crowdstrike
[6]: /es/logs/
[7]: https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview
[8]: https://docs.datadoghq.com/es/help/