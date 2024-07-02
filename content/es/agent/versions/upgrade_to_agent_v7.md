---
further_reading:
- link: /agent/guide/python-3/
  tag: Documentación
  text: Migra tus checks personalizados de Python 2 a Python 3
title: Actualizar el Datadog Agent a la versión 7
---

<div class="alert alert-info">
La versión 7 del Agent solo es compatible con checks personalizados de Python 3. <a href="/agent/guide/python-3">Comprueba si tus checks personalizados son compatibles con Python 3</a> antes de actualizar a la versión 7 del Agent.
</div>

## Del Agent v6 al Agent v7

{{< tabs >}}
{{% tab "Linux" %}}

Ejecuta el siguiente comando de instalación del Agent para actualizar tu Agent de la versión 6 a la versión 7:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Descarga el instalador del Datadog Agent][1].
2. Abre `datadog-agent-7-latest.amd64.msi` para ejecutar el instalador (como **Administrador**).
3. Sigue las indicaciones, acepta el acuerdo de licencia e introduce tu [clave de API de Datadog][2].
4. Cuando termines la instalación, tendrás opción de iniciar el Datadog Agent Manager.

**Nota**: Los enlaces a todas las versiones disponibles de Windows Installer se ofrecen [en formato JSON][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "MacOS" %}}

Ejecuta el comando de instalación del Agent con la variable de entorno `DD_AGENT_MAJOR_VERSION=7` para actualizar tu Agent de la versión 6 a la versión 7:

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## Del Agent v5 al Agent v7

{{< tabs >}}
{{% tab "Linux" %}}

Ejecuta el comando de instalación del Agent con la variable de entorno `DD_UPGRADE="true"` para actualizar tu Agent de la versión 5 a la 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la versión 5 durante la actualización:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Actualiza tu Agent a la versión 6 siguiendo el [proceso de actualización manual][1].
2. Sigue las instrucciones de actualización indicadas en [Del Agent v6 al Agent v7](#from-agent-v6-to-agent-v7).

[1]: /es/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

Ejecuta el comando de instalación del Agent con la variable de entorno `DD_AGENT_MAJOR_VERSION=7` y `DD_UPGRADE="true"` para actualizar tu Agent de la versión 5 a la 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la versión 5 durante la actualización:

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Nota:** El proceso de actualización no moverá automáticamente los checks **personalizados** del Agent. Esto es así por diseño, ya que Datadog no puede garantizar una compatibilidad completa con versiones anteriores de forma predefinida. Consulta la guía [Migración de checks personalizados a Python 3][1] para descubrir cómo migrar tu check personalizado de Python 2 a Python 3.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/python-3/