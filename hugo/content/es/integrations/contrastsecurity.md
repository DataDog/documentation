---
app_id: contrastsecurity
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Visualizar ataques y vulnerabilidades en Datadog con Contrast Security
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Contrast Security
---
## Información general

La integración de Contrast con Datadog te permite visualizar tus logs de Contrast en Datadog.

## Configuración

### Recopilación de logs

Activa la recopilación de logs para el Datadog Agent en `/etc/datadog-agent/datadog.yaml` en plataformas Linux. En otras plataformas, consulta la [Guía de archivos de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) para conocer la ubicación de tu archivo de configuración:

```yaml
logs_enabled: true
```

- Añade este bloque de configuración a tu archivo `contrastsecurity.d/conf.yaml` para empezar a recopilar tus logs de Contrast:

- Crea un nuevo archivo `conf.yaml`.

- Añade un grupo de configuración para la recopilación de logs personalizados.

  ```yaml
  logs:
    - type: file
      path: /path/to/contrast/security.log
      service: contrast
      source: contrastsecurity
  ```

Para obtener más información sobre los logs, consulta la [documentación de Contrast Security](https://docs.contrastsecurity.com/).

- [Reinicia el Datadog Agent ](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

Para obtener más información, consulta la:

- [Documentación de logs de Datadog](https://docs.datadoghq.com/logs/log_collection/)
- [API de dashboard de Datadog](https://docs.datadoghq.com/api/#create-a-dashboard)

## Datos recopilados

### Métricas

La integración Contrast no incluye métricas.

### Eventos

La integración Contrast no incluye eventos.

### Checks de servicio

La integración Contrast no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [responsable](https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/manifest.json) de esta integración.