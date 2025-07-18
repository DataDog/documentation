---
aliases:
- /es/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /developers/integrations/new_check_howto
  tag: Documentación
  text: Crear una nueva integración
kind: guía
title: Utilizar las integraciones de la comunidad
---

## Información general

Las integraciones que desarrolla la comunidad para el Datadog Agent se almacenan en el repositorio de GitHub [integrations-extra][1] de Datadog. No se incluyen en el paquete del Agent, pero se pueden instalar como complementos.

## Configuración

Los nuevos usuarios deben descargar e instalar la última versión del [Datadog Agent][2].

### Instalación

Elige la versión del Agent que utilizas:

{{< tabs >}}
{{% tab "Agent v7.21/v6.21 y posteriores" %}}

En las versiones 7.21/6.21 del Agent (y posteriores):

1. Ejecuta el siguiente comando para instalar la integración del Agent:

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```
   La versión de la integración se encuentra en el registro de cambios correspondiente del repositorio de GitHub de la integración 
2. Configura tu integración como si fuese una [integración][1] de base.
3. [Reinicia el Agent][2].

**Nota**: Si fuera necesario, antepón `sudo -u dd-agent` al comando de instalación.

[1]: /es/getting_started/integrations/
[2]: /es/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

La forma recomendada de utilizar una integración de la comunidad con el Docker Agent consiste en crear el Agent con la integración instalada. Utiliza el siguiente archivo de Docker para crear una versión actualizada del Agent que incluya el parámetro `<INTEGRATION_NAME>` de integrations-extra.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

El comando `agent integration install` que se ejecuta dentro del Docker emite el siguiente aviso: `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. Puedes ignorarlo.

Utiliza esta nueva imagen del Agent en combinación con [Autodiscovery][1] para activar el parámetro `<INTEGRATION_NAME>`.

[1]: /es/agent/autodiscovery/
{{% /tab %}}

{{% tab "Versiones anteriores del Agent" %}}

En las versiones del Agent anteriores a la 7.21/6.21:

1. Descarga los archivos de la carpeta`<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` del [repositorio integrations-extra][1].
2. Coloca `<INTEGRATION_NAME>.py` y cualquier otro archivo Python en el directorio `checks.d` del Agent.
3. Crea una nueva carpeta `<INTEGRATION_NAME>.d/` en el [directorio de configuración del Agent][2].
4. Coloca el archivo `conf.yaml.example` de la carpeta `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` en el directorio que has creado.
4. Cambia el nombre del archivo a `conf.yaml`.
5. Configura tu integración como una [integración][3] de base.
6. [Reinicia el Agent][4].


[1]: https://github.com/DataDog/integrations-extras
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /es/getting_started/integrations/
[4]: /es/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

<br>

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings#agent