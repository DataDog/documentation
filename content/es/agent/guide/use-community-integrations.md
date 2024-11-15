---
aliases:
- /es/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /developers/integrations/agent_integration
  tag: Documentación
  text: Crear una nueva integración
title: Utiliza integraciones de la comunidad y el mercado
---

## Información general

Las integraciones que desarrolla la comunidad para el Datadog Agent se almacenan en el repositorio de GitHub [integrations-extra][1] de Datadog. No se incluyen en el paquete del Agent, pero se pueden instalar como complementos.

## Configuración

Los nuevos usuarios deben descargar e instalar la última versión del [Datadog Agent][2].

### Instalación

{{< tabs >}}
{{% tab "Agent v7.21/v6.21 y posteriores" %}}

En las versiones 7.21/6.21 del Agent (y posteriores):

1. Ejecuta el siguiente comando para instalar la integración del Agent:

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```
   La versión de una integración puede consultarse en el log de cambios correspondiente en el repositorio de integraciones Github.
2. Configura tu integración como si fuese una [integración][1] de base.
3. [Reinicia el Agent][2].

**Nota**: Si fuera necesario, antepón `sudo -u dd-agent` al comando de instalación.

[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Contenerizado" %}}

Para utilizar una integración de la comunidad o el mercado en un entorno contenerizado debes crear una imagen personalizada que incluya la integración comunitaria que quieras.

Utiliza el siguiente Dockerfile para crear una versión personalizada del Agent que incluya el `<INTEGRATION_NAME>` de [integrations-extras][2]. Si estás instalando una integración del mercado, el `<INTEGRATION_NAME>` está disponible en las instrucciones de configuración.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

El comando `datadog-agent integration install` (ejecutado dentro de Docker) emite la siguiente advertencia inofensiva: `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. Puedes ignorar esta advertencia.

Si utilizas Kubernetes, actualiza tu chart de Helm o tu configuración de operador Datadog para extraer tu imagen personalizada.

Utiliza [Autodiscovery][1] para activar y configurar la integración.

[1]: /es/agent/autodiscovery/
[2]: https://github.com/DataDog/integrations-extras
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
[2]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /es/getting_started/integrations/
[4]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

Si tu sitio restringe el acceso a la red, asegúrate de haber añadido todos los [`ip-ranges`][3] a tu lista de inclusión o descarga la integración manualmente.



<br>

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: /es/agent/configuration/network