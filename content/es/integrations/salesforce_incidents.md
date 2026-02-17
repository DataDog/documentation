---
categories:
- nube
- rum
- notificaciones
custom_kind: integración
dependencies: []
description: Esta integración te permite crear incidencias de Salesforce a partir
  de alertas activadas en Datadog, y actualizar las incidencias existentes con nueva
  información a medida que surja.
doc_link: https://docs.datadoghq.com/integraciones/salesforce_incidents/
draft: false
git_integration_title: salesforce_incidents
has_logo: true
integration_id: ''
integration_title: Incidencias de Salesforce
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce_incidents
public_title: Integración de las incidencias de Datadog-Salesforce
short_description: Crea y gestiona incidencias de Salesforce Service Cloud a partir
  de alertas de Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración de incidencias de Salesforce te permite crear incidencias en Salesforce Service Cloud desde eventos de alerta 
del monitor. A través del widget de Salesforce Datadog, puedes ver la línea temporal de los eventos del monitor relacionados con la incidencia
directamente en Salesforce.

## Configuración

### Conectar Datadog a Salesforce Service Cloud

1. Ve al [cuadro de integración de Incidencias de Datadog Salesforce][1] y haz clic en **Add Organization** (Añadir organización).
2. Selecciona el tipo de organización.
3. Haz clic en **Connect** (Conectar) y sigue las instrucciones de la página de autorización de Salesforce Service Cloud.

### Rangos de IP de confianza

Si tu organización de Salesforce utiliza rangos de IP de confianza para filtrar el tráfico, deberás permitir las conexiones desde los prefijos de IP de 
**Webhooks** pertenecientes a Datadog para que funcione la integración. Para consultar una lista de prefijos de IP 
de **Webhooks** para tu región, consulta [Rngos de IP de Datadog][2].

### Configurar una plantilla de incidencias

Las plantillas definen cómo se crean las incidencias en Salesforce Service Cloud desde eventos de alerta de Datadog.

Para crear una plantilla de incidencias:

1. Haz clic en **New Incident Template** (Nueva plantilla de incidencias).
2. Introduce un nombre para tu plantilla de incidencias. Este nombre, precedido de `salesforce_incidents-`, se convierte en el identificador que puedes utilizar en tus notificaciones del monitor (como `@salesforce_incidents-my-incident-template-name`).
3. Selecciona una organización de Salesforce.
4. Proporciona un asunto, una descripción, un propietario y una prioridad para utilizarlos al crear una incidencia.
5. Haz clic en **Save** (Guardar).

### Añadir el widget de Datadog a Salesforce Service Cloud

Para instalar el widget de Datadog en Salesforce Service Cloud:

1. Pide a un administrador de tu organización de Salesforce que instale la aplicación de Datadog desde [Salesforce AppExchange][3].
2. En Salesforce servicio Cloud, vaya a la página de registro de incidencias.
3. Haz clic en el icono de engranaje y, a continuación, en **Edit page** (Editar página).
4. Haz clic y arrastra el widget de Datadog a la página desde los componentes personalizados de la barra de navegación izquierda.
5. Haz clic en **Save** (Guardar).

## Utilización

#### Creación de incidencias en Salesforce Service Cloud desde alertas de Datadog

Incluye un identificador de notificación de una o más plantillas de incidencias (por ejemplo, `@salesforce_incidents-my-incident-template-name`)
en las secciones **Notify your team** (Notifique a su equipo) o **Say what's happening** (Di lo que está pasando) de tu monitor de Datadog.

Las incidencias se crean cuando se activa el monitor. No se crean nuevas incidencias hasta que se resuelve el monitor.


## Datos recopilados

### Métricas

La integración de incidencias de Salesforce no proporciona ninguna métricas.

### Eventos

La integración de incidencias de Salesforce no incluye ningún evento.

### Checks de servicio

La integración de incidencias de Salesforce no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://app.datadoghq.com/integrations/salesforce-incidents
[2]: https://docs.datadoghq.com/es/api/latest/ip-ranges/
[3]: https://appexchange.salesforce.com/
[4]: https://docs.datadoghq.com/es/help/