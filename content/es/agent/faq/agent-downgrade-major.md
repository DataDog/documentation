---
aliases:
- /es/agent/faq/agent-downgrade

title: Cambiar a una versión principal anterior del Agent
---

## Cambiar de la v7 a la v6 del Agent

{{< tabs >}}
{{% tab "Linux" %}}

En primer lugar, [desinstala la v7 del Agent del sistema][1].

A continuación, si seguiste las instrucciones para [pasar de la v6 a la v7][2], ejecuta el siguiente comando de instalación del Agent para cambiar de la versión 7 a la versión 6 del Agent:

```shell
DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

El comando funciona en todas las versiones compatibles de Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE.

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: /es/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{% tab "Windows" %}}

1. [Desinstala la v7 del Agent del sistema][1].
2. [Descarga el instalador del Datadog Agent][2].
3. Abre `datadog-agent-6-latest.amd64.msi` para ejecutar el instalador (como **Administrador**).
4. Sigue las indicaciones, acepta el acuerdo de licencia e introduce tu [clave de API de Datadog][3].
5. Cuando termines la instalación, tendrás opción de iniciar el Datadog Agent Manager.

**Nota**: Los enlaces a todas las versiones disponibles de Windows Installer se ofrecen [en formato JSON][4].

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-6-latest.amd64.msi
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

En primer lugar, [desinstala la v7 del Agent del sistema][1].

A continuación, si seguiste las instrucciones para [pasar de la v6 a la v7][2], ejecuta el comando de instalación del Agent con la variable de entorno `DD_AGENT_MAJOR_VERSION=6` para cambiar de la versión 7 a la versión 6 del Agent:

```shell
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: /es/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{< /tabs >}}

## Cambiar de la v6 a la v5 del Agent

En esta guía, se asume que actualizaste a la v6 del Agent utilizando la [guía de actualización][1]. Si es así, selecciona tu SO para ver las instrucciones detalladas sobre cómo cambiar de la versión 6 a la versión 5 del Agent:

{{< tabs >}}
{{% tab "Linux" %}}

**Sistemas basados en Debian**:

1. Configura APT para que pueda descargarse a través de https e instala `curl` y `gnupg`

    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Quita el repositorio beta y asegúrate de que esté presente el repositorio estable:

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog-beta.list
    [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si ejecutas Ubuntu 14 o una versión anterior, o Debian 8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Actualiza APT y cambia a la versión anterior del Agent:

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

5. Sincroniza las configuraciones y las plantillas de AutoDiscovery con la versión de antes (opcional)

    Si realizaste algún cambio en tus configuraciones o plantillas, es conveniente volver a sincronizarlas para la v5 del Agent.

    **Nota**: Si realizaste algún cambio en tus configuraciones para admitir únicamente las opciones de la v6 del Agent, estas no funcionarán con la v5 del Agent.

6. Sincroniza los checks personalizados con la versión de antes (opcional):

    Si realizaste algún cambio o añadiste nuevos checks personalizados mientras probabas el Agent 6, es conveniente volver a activarlos en el Agent 5. **Nota**: Solo tienes que volver a copiar los checks que cambiaste.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

7. Reinicia el Agent:

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

8. Elimina `/etc/datadog-agent` (opcional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

**Sistemas basados en Red Hat**:

1. Quita el repositorio beta de Yum del sistema:

    ```shell
    rm /etc/yum.repos.d/datadog-beta.repo
    [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/   \nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\npriority=1\ngpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

    **Nota**: Debido a un [error en dnf][1], utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` con RHEL/CentOS 8.1.

2. Actualiza la caché de Yum local y cambia a la versión anterior del Agent

    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Sincroniza las configuraciones y las plantillas de AutoDiscovery con la versión de antes (opcional)

    Si realizaste algún cambio en tus configuraciones o plantillas, es conveniente volver a sincronizarlas para la v5 del Agent.

    **Nota**: Si realizaste algún cambio en tus configuraciones para admitir únicamente las opciones de la v6 del Agent, estas no funcionarán con la v5 del Agent.

4. Sincroniza los checks personalizados con la versión de antes (opcional):

    Si realizaste algún cambio o añadiste nuevos checks personalizados mientras probabas el Agent 6, es conveniente volver a activarlos en el Agent 5. **Nota**: Solo tienes que volver a copiar los checks que cambiaste.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

5. Reinicia el Agent:

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

6. Elimina `/etc/datadog-agent` (opcional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

Ejecuta el paquete del instalador del Agent para instalar la última versión 5.x; encontrarás las instrucciones
[en la página de integración del Datadog Agent][1].

[1]: https://app.datadoghq.com/account/settings#agent/windows
{{% /tab %}}
{{% tab "MacOS" %}}

1. Detén el Agent con la aplicación systray, si se está ejecutando.
2. Sal de la aplicación systray.
3. Desinstala la aplicación del Datadog Agent.
4. Instala el paquete DMG del Agent 5 con el método de instalación que prefieras.

{{% /tab %}}
{{< /tabs >}}

[1]: /es/agent/guide/upgrade-to-agent-v6/
