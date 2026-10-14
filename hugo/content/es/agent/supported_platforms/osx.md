---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /es/guides/basic_agent_usage/osx/
- /es/agent/basic_agent_usage/osx/
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopile sus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopile sus procesos
- link: /tracing/
  tag: Documentación
  text: Recopile sus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Obtenga más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
os: osx
platform: OS X
title: macOS
---
## Descripción general {#overview}

Esta página describe las características básicas del Datadog Agent para macOS. Consulte la documentación de [Plataformas compatibles][5] para obtener la lista completa de distribuciones y versiones de macOS compatibles.

## Instale el Agent {#install-the-agent}
Para instalar el Agent en macOS, siga las [instrucciones in-app en Fleet Automation][6] y ejecute el script generado en sus servidores.

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="Pasos de instalación in-app para el Datadog Agent en un servidor macOS." style="width:90%;">}}

<div class="alert alert-info">
El Agent se instala en un sandbox ubicado en <code>/opt/datadog-agent</code>. Para cualquier monitoreo adicional, asegúrese de darle al usuario del Agent <code>_dd-agent</code> acceso a los archivos o directorios.
</div>


## Comandos {#commands}

El administrador de servicios `launchctl` controla el ciclo de vida del Agent, mientras que otros comandos pueden ejecutarse a través del binario del Agent, la aplicación systray o la interfaz web.


| Descripción          | Comando          |
|----------------------|------------------|
| Iniciar el Agent como servicio           | `sudo launchctl kickstart system/com.datadoghq.agent` |
| Detener el Agent que se ejecuta como servicio    | `sudo launchctl kill SIGTERM system/com.datadoghq.agent`  |
| Reiniciar el Agent que se ejecuta como servicio | `sudo launchctl kickstart -k system/com.datadoghq.agent` |
| Estado del servicio del Agent            | `sudo launchctl print system/com.datadoghq.agent` |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status` o interfaz web                    |
| Enviar flare                         | `sudo datadog-agent flare` o interfaz web                     |
| Mostrar el uso del comando              | `datadog-agent --help`                               |
| Ejecutar una verificación                        | `sudo datadog-agent check <CHECK_NAME>`                   |


## Configuración {#configuration}

El [archivo de configuración del Datadog Agent][7] se encuentra en `/opt/datadog-agent`. Este archivo YAML contiene los detalles de conexión a nivel de servidor que se utilizan para enviar datos a Datadog, incluyendo:

- `api_key`: la [clave de Datadog API][8] de su organización
- `site`: región de Datadog de destino (por ejemplo, `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy`: puntos de conexión de proxy HTTP/HTTPS para tráfico saliente (consulte [Configuración de proxy del Datadog Agent][9])
- Etiquetas predeterminadas, niveles de registro y configuraciones de Datadog.

Un archivo de referencia totalmente comentado, ubicado en `/opt/datadog-agent/etc/datadog.yaml.example`, enumera todas las opciones disponibles para comparación o para copiar y pegar. Alternativamente, consulte el [archivo de configuración de ejemplo del Agent para macOS][10] en GitHub.

### Archivos de integración {#integration-files}
Los archivos de configuración para las integraciones se encuentran en `/opt/datadog-agent/etc/conf.d/`. Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: la configuración activa que controla cómo la integración recopila métricas y registros
-  `conf.yaml.example`: una muestra que ilustra las claves admitidas y los valores predeterminados



## Desinstale el Agent {#uninstall-the-agent}

Para desinstalar el Agent, ejecute el siguiente script:

```shell
curl -L https://install.datadoghq.com/scripts/uninstall_mac_os.sh | bash
```

## Solución de problemas {#troubleshooting}

Consulte la [documentación de solución de problemas del Agent][2] para conocer los pasos de solución de problemas.

## Trabajar con el Agent integrado {#working-with-the-embedded-agent}

El Agent contiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los binarios comunes como `python` y `pip` se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Consulte las instrucciones sobre cómo [agregar paquetes al Agent integrado][3] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /es/agent/troubleshooting/
[3]: /es/extend/guide/custom-python-package/
[4]: /es/integrations/
[5]: https://docs.datadoghq.com/es/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /es/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[11]: https://install.datadoghq.com/scripts/uninstall_mac_os.sh