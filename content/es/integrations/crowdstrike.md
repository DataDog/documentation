---
app_id: crowdstrike
categories:
- nube
- recopilación de logs
- recopilación de logs
- la red
- seguridad
custom_kind: integración
description: Recopila eventos de detección y alertas de CrowdStrike en tiempo real
  como logs de Datadog.
title: CrowdStrike
---
## Información general

[CrowdStrike](https://www.crowdstrike.com/) es una solución de agent único para detener brechas, ransomware y ciberataques con visibilidad y protección completas en endpoints, cargas de trabajo, datos e identidad.

La integración CrowdStrike te permite recopilar eventos de detección y alertas de CrowdStrike en tiempo real como logs de Datadog.

## Configuración

### Instalación

No requiere instalación.

### Configuración

#### Activación del streaming de eventos

Antes de poder conectarte al [Event Stream](https://docs.datadoghq.com/service_management/events/explorer/), [ponte en contacto con el equipo de asistencia de CrowdStrike](https://supportportal.crowdstrike.com/) para habilitar el flujo de APIs en tu cuenta de cliente.

#### Conexión de tu cuenta de CrowdStrike

Una vez habilitado el streaming, añade un nuevo cliente de API en CrowdStrike:

1. Inicia sesión en la consola Falcon.
1. Ve a [Support > API Clients and Keys] (Soporte > Clientes y claves de API)(https://falcon.crowdstrike.com/support/api-clients-and-keys).
1. Haz clic en **Add new API client** (Añadir nuevo cliente de API).
1. Introduce un nombre de cliente descriptivo que identifique a tu cliente de API en Falcon y en los logs de acciones de API (por ejemplo, `Datadog`).
1. También puedes introducir una descripción como el uso previsto de tu cliente de API.
1. Selecciona el acceso de **Lectura** para todos los contextos de API.
1. Haz clic en **Add** (Añadir).

#### Habilitación de la recopilación de logs

Añade los detalles del cliente de API en el [cuadro de integración de CrowdStrike](https://app.datadoghq.com/integrations/crowdstrike) en Datadog:

1. Haz clic en **Connect a CrowdStrike Account** (Conectar una cuenta de CrowdStrike).
1. Copia tu ID de cliente de API, secreto de cliente y dominio de API.
1. También puedes introducir una lista de etiquetas (tags) separadas por comas.
1. Haz clic en **Submit** (Enviar).

Al cabo de unos minutos, aparecen [logs](https://app.datadoghq.com/logs/) con la fuente `crowdstrike` en el [dashboard de información general de logs de Crowdstrike](https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview).

## Datos recopilados

### Métricas

La integración CrowdStrike no incluye métricas.

### Eventos

La integración CrowdStrike permite a Datadog ingerir los siguientes eventos:

- Resumen de detecciones
- Coincidencia de cortafuegos
- Protección de la identidad
- Resumen de detecciones de LDP
- Resumen de incidentes
- Eventos de autenticación
- Actualización de estados de detección
- IoC (Indicadores de riesgo) cargados
- Eventos de contención en red
- Eventos de listas de IP permitidas
- Eventos de gestión de políticas
- Actividad de la tienda CrowdStrike
- Inicio/fin de sesión de respuesta en tiempo real
- Inicio/fin de flujos de eventos

Estos eventos aparecen en el [dashboard de información general de logs de Crowdstrike](https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview).

### Checks de servicio

La integración CrowdStrike no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).