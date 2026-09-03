---
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/stunnel.md
description: Reúne los logs de tu proxy Stunnel y envíalos a Datadog.
has_logo: true
integration_id: stunnel
integration_title: Stunnel
is_public: true
name: Stunnel
public_title: Integración de Datadog y Stunnel
short_description: Reúne los logs de tu proxy Stunnel y envíalos a Datadog.
---

## Información general

Stunnel es un proxy diseñado para añadir la funcionalidad de cifrado TLS a los clientes y servidores existentes, sin necesidad de modificar el código de los programas.

Utiliza la integración del proxy Stunnel en Datadog para monitorizar posibles problemas de red o ataques DDoS.

## Configuración

### Instalación

Debes [instalar el Datadog Agent ][1] en el servidor que ejecuta Stunnel.

### Configuración

Crea un archivo `stunnel.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2] para empezar a recopilar logs de tu proxy Stunnel.

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `stunnel.d/conf.yaml` para empezar a recopilar tus logs de Stunnel:

    ```yaml
    logs:
        - type: file
          path: /var/log/stunnel.log
          source: stunnel
          service: '<MY_SERVICE>'
          sourcecategory: proxy
    ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando `status` del Agent][4] y busca `stunnel` en la sección **Checks**.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /es/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /es/agent/guide/agent-commands/#agent-status-and-information