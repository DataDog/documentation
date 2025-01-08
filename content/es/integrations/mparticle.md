---
categories:
- mobile
custom_kind: integration
dependencies: []
description: Monitoriza fallos de aplicaciones y recopila métricas detalladas del
  rendimiento en tiempo de ejecución
doc_link: https://docs.datadoghq.com/integrations/mparticle/
draft: false
git_integration_title: mparticle
has_logo: true
integration_id: mparticle
integration_title: mParticle
integration_version: ''
is_public: true
manifest_version: '1.0'
name: mparticle
public_title: Integración de mParticle en Datadog
short_description: Monitoriza fallos de aplicaciones y recopila métricas detalladas
  del rendimiento en tiempo de ejecución
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

mParticle te permite realizar un seguimiento detallado de los datos de rendimiento en tiempo de ejecución de tus aplicaciones móviles. El SDK de mParticle recopila automáticamente datos detallados sobre el rendimiento en tiempo de ejecución, como la carga de CPU, el uso de la memoria y el nivel de batería. Conecta mParticle a Datadog y visualiza la siguiente información en tiempo real en tu dashboard de Datadog:

- Informes de fallos
- Datos del rendimiento de redes de terceros
- Detalles de la sesión activa
- Uso de la CPU, la memoria y la batería del dispositivo

Para obtener más información sobre mParticle, consulta [el blog][1] y [sus documentos][2].

## Configuración

### Instalación

1. Inicia sesión en tu [cuenta de mParticle][3].
2. Accede a la página de servicios haciendo clic en el icono del avión de papel de la barra de navegación de la izquierda.
3. Haz clic en el cuadro de Datadog para mostrar el panel de configuración de la integración con Datadog.
4. Introduce tu [clave de API Datadog][4] en el panel de configuración y haz clic en Guardar.
5. Activa el estado para reenviar los datos a Datadog.

## Datos recopilados

### Métricas

Consulta la [documentación de mParticle][2] para obtener información sobre las métricas disponibles con esta integración.

### Eventos

La integración mParticle no incluye eventos.

### Checks de servicio

La integración mParticle no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://www.datadoghq.com/blog/track-detailed-run-time-performance-data-with-mparticle-and-datadog/
[2]: https://docs.mparticle.com/integrations/datadog/event/
[3]: https://app.mparticle.com/login?return=
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/es/help/