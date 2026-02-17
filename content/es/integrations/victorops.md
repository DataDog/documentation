---
categories:
- alerting
- notifications
custom_kind: integración
dependencies: []
description: Utiliza VictorOps como canal de notificación para las alertas y eventos
  de Datadog.
doc_link: https://docs.datadoghq.com/integrations/victorops/
draft: false
git_integration_title: victorops
has_logo: true
integration_id: victorops
integration_title: VictorOps
integration_version: ''
is_public: true
manifest_version: '1.0'
name: victorops
public_title: Integración de Datadogy VictorOps
short_description: Utiliza VictorOps como canal de notificación para alertas y eventos
  de Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Utiliza la integración de Datadog y VictorOps para enviar alertas de Datadog a VictorOps y obtener un control preciso sobre el enrutamiento y la escalada. Ve los problemas más rápido y reduce el tiempo de resolución creando alertas mediante **@victorops**:

- Desde tu flujo de eventos
- Al tomar una snapshot
- Cuando se activa una alerta de métrica

## Configuración

### Instalación

1. En la página de configuración de VictorOps, haz clic en "Integrations** (Integraciones).
2. Haz clic en "Datadog", luego en  "Enable Integration" (Activar integración).
3. Copiar tu clave
4. Vuelve a Datadog, pega la clave de la API en la siguiente sección aquí

## Datos recopilados

### Métricas

La integración de VictorOps no incluye métricas.

### Eventos

La integración de VictorOps no incluye ningún evento.

### Checks de servicio

La integración de VictorOps no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][1].

## Leer más

### Base de conocimientos

#### Claves de enrutamiento

Para dirigir las alertas a usuarios específicos de VictorOps, haz una lista de todas tus claves de enrutamiento en Datadog. Si no hay claves configuradas, VictorOps envía la alerta al grupo por defecto. A continuación, elige el endpoint de VictorOps que debe recibir la alerta mediante `@victorops`.

No se permiten caracteres especiales en los nombres. Se permiten letras mayúsculas/minúsculas, números, '\_' y '-'.

### Elige un endpoint personalizado

Si este campo está vacío, el endpoint por defecto es 'https://alert.victorops.com/integraciones/datadog/20140523/alert'

[1]: https://docs.datadoghq.com/es/help/