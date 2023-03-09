---
aliases:
- /es/agent/faq/agent-downgrade
kind: faq
title: Cambiar a una versión principal anterior de Agent
---

## Cambiar de la v7 a la v6 de Agent

{{< tabs >}}
{{% tab "Linux" %}}

En primer lugar, [desinstale la v7 de Agent del sistema][1].

A continuación, si siguió las instrucciones para [actualizar de la v6 a la v7][2], ejecute el siguiente comando de instalación de Agent para cambiar de la versión 7 a la versión 6 de Agent:

```shell
DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

El comando funciona en todas las versiones compatibles de Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, y SUSE.

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: /es/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{% tab "Windows" %}}

1. [Desinstale la v7 de Agent del sistema][1].
2. [Descargue el instalador de Datadog Agent][2].
3. Ejecute el instalador (como **Administrador**) abriendo `datadog-agent-6-latest.amd64.msi`.
4. Siga las indicaciones, acepte el acuerdo de licencia e introduzca su [clave API de Datadog][3].
5. Cuando termine la instalación, se le ofrecerá la opción de iniciar Datadog Agent Manager.

**Nota**: Se ofrecen enlaces a todas las versiones disponibles de Windows Installer [en formato JSON][4].

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-6-latest.amd64.msi
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

En primer lugar, [desinstale la v7 de Agent del sistema][1].

A continuación, si siguió las instrucciones para [actualizar de la v6 a la v7][2], ejecute el comando de instalación de Agent con la variable de entorno `DD_AGENT_MAJOR_VERSION=6` para cambiar de la versión 7 a la versión 6 de Agent:

```shell
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

[1]: /es/agent/guide/how-do-i-uninstall-the-agent/
[2]: /es/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{< /tabs >}}

## Cambiar de la v6 a la v5 de Agent

En esta guía se asume que actualizó a la v6 de Agent utilizando la [guía de actualización][1]. Si es así, seleccione su SO para ver las instrucciones detalladas sobre cómo cambiar de la versión 6 a la versión 5 de Agent:

{{< tabs >}}
{{% tab "Linux" %}}

**Sistemas basados en Debian**:

1. Configure APT para que pueda descargar a través de https e instale `curl` y `gnupg`

    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Quite el repositorio beta y asegúrese de que esté presente el repositorio estable:

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog-beta.list
    [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si ejecuta Ubuntu 14 o una versión anterior, o Debian 8 o una versión anterior, copie el conjunto de claves en `/etc/apt/trusted.gpg.d`:

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Actualice APT y cambie a la versión anterior de Agent:

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

5. Configuraciones de copia de seguridad-sincronización y plantillas de AutoDiscovery (opcional)

    Si realizó algún cambio en sus configuraciones o plantillas, es conveniente volver a sincronizarlas para la v5 de Agent.

    **Nota**: Si realizó algún cambio en sus configuraciones para la compatibilidad de opciones únicamente de la v6 de Agent, estas no funcionarán con la v5 de Agent.

6. Checks personalizados de copia de seguridad-sincronización (opcional):

    Si realizó algún cambio o añadió nuevos checks personalizados mientras probaba Agent 6, es conveniente volver a activarlos en Agent 5. **Nota**: Solo tiene que volver a copiar los checks que cambió.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

7. Reinicie Agent

    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

8. Limpie `/etc/datadog-agent` (opcional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

**Sistemas basados en Red Hat**:

1. Quite el repositorio beta de Yum del sistema:

    ```shell
    rm /etc/yum.repos.d/datadog-beta.repo
    [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/   \nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\npriority=1\ngpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

    **Nota**: debido a un [error en dnf][1], utilice `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en RHEL/CentOS 8.1.

2. Actualice su caché de Yum local y cambie a la versión anterior de Agent

    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Configuraciones de copia de seguridad-sincronización y plantillas de AutoDiscovery (opcional)

    Si realizó algún cambio en sus configuraciones o plantillas, es conveniente volver a sincronizarlas para la v5 de Agent.

    **Nota**: Si realizó algún cambio en sus configuraciones para la compatibilidad de opciones únicamente de la v6 de Agent, estas no funcionarán con la v5 de Agent.

4. Checks personalizados de copia de seguridad-sincronización (opcional):

    Si realizó algún cambio o añadió nuevos checks personalizados mientras probaba Agent 6, es conveniente volver a activarlos en Agent 5. **Nota**: Solo tiene que volver a copiar los checks que cambió.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

5. Reinicie Agent

    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

6. Limpie `/etc/datadog-agent` (opcional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

Ejecute el paquete de instalador de Agent para la última versión 5.x, encontrará instrucciones
[en la página de integración de Datadog Agent][1].

[1]: https://app.datadoghq.com/account/settings#agent/windows
{{% /tab %}}
{{% tab "MacOS" %}}

1. Detenga Agent con la aplicación systray, si se está ejecutando.
2. Salga de la aplicación systray.
3. Desinstale la aplicación Datadog Agent.
4. Instale el paquete DMG de Agent 5 con el método de instalación que prefiera.

{{% /tab %}}
{{< /tabs >}}

[1]: /es/agent/guide/upgrade-to-agent-v6/