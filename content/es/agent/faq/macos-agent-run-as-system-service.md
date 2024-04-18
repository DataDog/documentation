---
further_reading:
- link: /agent/
  tag: Documentación
  text: Más información sobre el Datadog Agent
kind: faq
title: ¿Cómo configuro el Agent para que se ejecute como un servicio de sistema en
  macOS?
---

En macOS, el Datadog Agent se instala como un servicio para el usuario que ejecuta las instrucciones de instalación. Esto permite que la aplicación de la bandeja del sistema GUI del Datadog Agent funcione, si has iniciado sesión en la GUI de macOS como el usuario que realizó la instalación. El principal inconveniente es que el Agent solo se ejecuta cuando el usuario que realizó la instalación ha iniciado sesión en la GUI de macOS.

Debido a esto, por defecto el Datadog Agent no se ejecuta en los casos en los que no se dispone de acceso GUI al host de macOS. Por lo tanto, se requieren pasos adicionales al instalar y ejecutar Datadog Agent en macOS sin acceso GUI.

## Instalar

1. Conéctate al host y [sigue las instrucciones de instalación del Agent ][1] para instalar el Datadog Agent en macOS.

2. Ejecuta el siguiente script bash, como el usuario que ejecutó la instalación:

    ```sh
    #!/bin/bash

    echo "Moving the Datadog Agent service for the $USER user to a system service"
    # Move the per-user service definition installed by the Agent to a system service
    sudo mv /Users/$USER/Library/LaunchAgents/com.datadoghq.agent.plist /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Setting the Datadog Agent service to run as the $USER user"
    # By default, system services run as root.
    # This plist file modification is needed to make the Agent not run as root, but as the current user.
    sudo plutil -insert UserName -string "$USER" /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Setting permissions on the Datadog Agent service file"
    # Put the correct permissions on the plist file.
    # Otherwise launchctl will refuse running commands for this service.
    sudo chown root:staff /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Enabling the Datadog Agent service"
    # Enable the service: makes sure it runs on reboot
    sudo launchctl enable system/com.datadoghq.agent

    echo "Loading & launching the Datadog Agent service"
    # Load the service: this starts the Agent
    sudo launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist
    ```

Este script reconfigura el servicio del Datadog Agent para que se ejecute como daemon de lanzamiento, con las siguientes propiedades:
- El servicio se inicia automáticamente al iniciar el host.
- Los procesos del Agent se ejecutan como el usuario que ejecutó el script anterior (para evitar que se ejecuten como raíz).
- La aplicación de la bandeja del sistema GUI del Datadog Agent no está disponible.


## Operaciones

El servicio del Datadog Agent se gestiona con `launchctl`. Una vez ejecutadas las instrucciones de instalación anteriores, gestiona el servicio del Agent con los siguientes comandos:

| Descripción                   | Comando                                                                                                                   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Iniciar el servicio del Agent           | `sudo launchctl start com.datadoghq.agent`                                                                                |
| Detener la ejecución del servicio del Agent    | `sudo launchctl stop com.datadoghq.agent`                                                                                 |
| Estado del servicio del Agent       | `sudo launchctl list com.datadoghq.agent`                                                                                 |
| Desactivar el servicio del Agent         | `sudo launchctl disable system/com.datadoghq.agent`                                                                       |
| Activar el servicio del Agent          | `sudo launchctl enable system/com.datadoghq.agent && sudo launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist`|


Desactivar el Agent impide que funcionen los comandos `list`, `start` y `stop`, y que se inicie el servicio del Agent al reiniciar.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos