---
app_id: opsgenie
categories:
- collaboration
- notifications
custom_kind: integración
description: Reenvía alertas desde Datadog y notifica a los usuarios por teléfono.
further_reading:
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#opsgenie-integration
  tag: blog
  text: Blog de Opsgenie
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_opsgenie_service_object
  tag: otros
  text: Opsgenie
media: []
title: Opsgenie
---
## Información general

Crea alertas en Opsgenie utilizando `@opsgenie-{service-name}`:

- Al tomar una snapshot
- Cuando se activa una alerta de métrica

## Configuración

### Configuración

#### Crear una integración de Datadog en Opsgenie

1. Inicia sesión en tu cuenta de Opsgenie y ve a la page (página) [Integraciones de Opsgenie](https://app.opsgenie.com/settings/integration/integration-list).
1. Busca Datadog y haz clic en cuadro.
1. Completa el Nombre de la integración y, si lo deseas, configura el Equipo asignado.
1. Después de hacer clic en **Enviar**, permanece en la page (página) y guarda la clave de API de la integración recién creada. La necesitarás para finalizar la configuración.
1. Añade más integraciones de Datadog en Opsgenie yendo a la page (página) [Integraciones de Opsgenie](https://app.opsgenie.com/settings/integration/integration-list) y repitiendo los pasos anteriores.

#### Registra las integraciones que has realizado en Opsgenie en Datadog

1. En Datadog, ve a la [page (página) Integraciones](https://app.datadoghq.com/integrations), luego busca y selecciona el ícono Opsgenie.
1. Check que estés en la pestaña Configuración del cuadro de diálogo que aparece.
1. Haz clic en **Nuevo servicio de integración**.
1. Pega la clave de API guardada anteriormente de la integración de Datadog (creada en Opsgenie) en el campo **Clave de API de Opsgenie** e introduce un **Nombre de servicio**.
   1. El nombre del servicio debe ser descriptivo y único. Sólo se permiten valores alfanuméricos, guiones, guiones bajos y puntos. No se admiten espacios.
      {{< img src="integrations/opsgenie/datadog-add-opsgenie-api-key.png" alt="Ícono de integración de Opsgenie que muestra la configuración para un nuevo servicio de integración" popup="true">}}
1. En el menú desplegable **Región**, selecciona Estados Unidos o Europa, según dónde opere tu cuenta de Opsgenie.
1. Haz clic en **Save** (Guardar).

## Ejemplo de uso

### El monitor de ruta alerta a Opsgenie

1. Crea cualquier monitor (noun) en la [Page (página) Monitores](https://app.datadoghq.com/monitors/manage).
1. En el cuerpo de monitor (noun), pega `@opsgenie-{service-name}` (sustituye `{service-name}` por el nombre del servicio definido en el ícono de integración de Opsgenie).
1. Guarda el monitor.
1. Ve a la Page (página) Editar del monitor (noun) y haz clic en "Test notificaciones" para emitir una alerta de ejemplo utilizando tu integración. Debería crearse una alerta correspondiente en Opsgenie.
1. Para notificar a varios servicios, pega `@opsgenie-{service-name} @opsgenie-{service-name-2}` en el cuerpo del monitor (noun) y test con los mismos pasos.

#### Permisos

En forma predeterminada, todos los usuarios tienen acceso completo a los servicios de Opsgenie.

Utiliza [Control de acceso granular](https://docs.datadoghq.com/account_management/rbac/granular_access/) para limitar los roles que pueden editar un servicio específico:

1. Mientras visualizas un servicio, haz clic en el icono de engranaje de la esquina superior derecha para abrir el menú de configuración.
1. Selecciona **Configurar permisos**.
1. Haz clic en **Restrict Access** (Acceso restringido). El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen acceso de **Visor** por defecto.
1. Utiliza el menú desplegable para seleccionar uno o más roles, equipos o usuarios que pueden editar el servicio Opsgenie.
1. Haz clic en **Add** (Añadir). El cuadro de diálogo se actualiza para mostrar que el rol seleccionado tiene el permiso de **Editor**.
1. Haz clic en **Save** (Guardar).

**Nota:** Para mantener tu acceso de edición al servicio,  incluye al menos un rol al que pertenezcas antes de guardar.

Si tienes acceso de edición, puedes restaurar el acceso general a un servicio restringido siguiendo los siguientes pasos:

1. Mientras visualizas el servicio, haz clic en el icono de engranaje de la esquina superior derecha para abrir el menú de configuración.
1. Selecciona **Configurar permisos**.
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

Para editar los permisos de servicio a través de la API:

1. Obtén los ID de servicio de Opsgenie utilizando la [API de integración de Opsgenie](https://docs.datadoghq.com/api/latest/opsgenie-integration/).
1. Utiliza la [API de políticas de restricción](https://docs.datadoghq.com/api/latest/restriction-policies/), donde el tipo es `integration-service` y el ID es `opsgenie:<service_id>`.

## Datos recopilados

### Métricas

La integración de Opsgenie no incluye ninguna métrica.

### Eventos

La integración Opsgenie no incluye ningún evento.

### Checks de servicio

La integración de Opsgenie no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}