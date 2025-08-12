---
aliases:
- /es/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorización de SNMP con Datadog
title: Solucionar problemas de NDM
---

## Información general

Utiliza la siguiente información para solucionar problemas de Network Device Monitoring Datadog. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][1].

### Dispositivo no visible en Datadog

La siguiente explicación supone que estás ejecutando Datadog Agent v7.61.0+.

Si tu dispositivo no está visible en la página [Dispositivos][2]:

1. Ejecuta el comando [datadog-agent status][3] y busca la sección snmp, que contiene la IP de monitorización de tu dispositivo. Después de iniciar el Agent, NDM puede tardar hasta un minuto en detectar los dispositivos configurados individualmente. Si tu Agent está configurado para escanear un gran número de dispositivos, puede tardar más tiempo.
El resultado debería ser similar al siguiente:

   ```
   snmp
   ----
     Instance ID: snmp:default:1.2.3.4.1:9a2df638d3ba38d6 [ERROR]
     Configuration Source: file:/etc/datadog-agent/conf.d/snmp.d/conf.yaml
     Total Runs: 1
     Metric Samples: Last Run: 6, Total: 6
     Events: Last Run: 0, Total: 0
     Network Devices Metadata: Last Run: 1, Total: 1
     Service Checks: Last Run: 1, Total: 1
     Average Execution Time : 0s
     Last Execution Date : 2024-11-13 13:12:09 PST / 2024-11-13 21:12:09 UTC (1731532329000)
     Last Successful Execution Date : Never
     Error: <ERROR MESSAGE>
     No traceback
   ```

2. Si tu dispositivo no aparece en la lista y estás utilizando Autodiscovery, probablemente significa que el Agent no pudo conectarse a tu dispositivo.

   - Ejecuta el comando `datadog-agent status` y espera a que la sección `autodiscovery` informe de que se han escaneado todas las IP de dispositivos posibles. En redes grandes, esto puede tardar varios minutos. La salida debe ser similar a la siguiente:

    ```
    Autodiscovery
    =============
    Subnet 127.0.0.1/24 is queued for scanning.
    No IPs found in the subnet.
    Scanning subnet 127.0.10.1/30... Currently scanning IP 127.0.10.2, 4 IPs out of 4 scanned.
    Found the following IP(s) in the subnet:
       - 127.0.10.1
       - 127.0.10.2
    Subnet 127.0.10.1/30 scanned.
    No IPs found in the subnet.
    ```

    Si Autodiscovery se ha completado y tu dispositivo sigue sin aparecer en la página [Dispositivos][2], significa que el Agent no ha podido conectarse a tu dispositivo.

   - Ejecuta un `snmp walk` en la IP de administrador del dispositivo para determinar por qué el Agent no puede conectarse a tu dispositivo.

   **Nota**: Proporciona tus credenciales directamente en la CLI. Si no se proporcionan las credenciales, el Agent intentará localizarlas en los archivos de configuración del Agent que se estén ejecutando.

   **Linux**: <br />
     SNMP v2:
     ```
     sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
     ```
     SNMP v3:
      ```
      sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
      ```
      **Windows**:
      ```
      agent snmp walk <IP Address>[:Port]

      Example:
      agent.exe snmp walk  10.143.50.30 1.3.6
      ```

    Consulta la documentación específica de tu proveedor para obtener información adicional sobre la ejecución de estos comandos.

### Solucionar problemas de errores con SNMP

Si el estado de SNMP o el recorrido del Agent muestran un error, podría indicar uno de los siguientes problemas:

#### Permiso denegado

Si ves un error de permiso denegado mientras enlazas puertos en logs del Agent, el número de puerto que has indicado puede requerir permisos superiores. Para vincularte a un número de puerto inferior a 1024, consulta [Uso del puerto de trampa predeterminado 162 de SNMP][8].

#### Dispositivo inalcanzable o mal configurado:

   **Error**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **Solución**:

   1. Inicia sesión en tu dispositivo y asegúrate de que SNMP está activado y expuesto en el puerto 161.
   2. Comprueba que tu cortafuegos del recopilador permite la salida.

   3. Opcionalmente, sólo para Linux:

      Ejecuta `iptables -L OUTPUT` y asegúrate de que no hay ninguna regla de denegación:

      ```
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. Asegúrate de que tu cadena comunitaria coincide.

#### Credenciales de SNMPv2 incorrectas

   **Error**:
   ```
   Error: an authentication method needs to be provided
   ```

   **Solución**:

   Si utilizas SNMPv2, asegúrate de que se establece una cadena de comunidad.

#### Protocolo de privacidad de SNMPv3 incorrecto

   **Error**:
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   O

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **Solución**:

   Comprueba que los siguientes parámetros de configuración de SNMPv3 son correctos:
   - usuario
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### No se reciben trampas para los dispositivos

1. Comprueba el archivo de Datadog `agent.log` para asegurarte de que puedes enlazarte al puerto de trampas. El siguiente error indica que no te puedes enlazar con el puerto de trampas:

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **Solución**:
   Añade una capacidad de enlace de red al binario del Agent, que permite al Agent enlazarse a puertos reservados:

   ```
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

#### Trampas con formato incorrecto

1. Ve al dashboard para solucionar problemas en NDM:

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="La página de Network Device Monitoring muestra el menú desplegable de Dashboard con el dashboard Solucionar problemas de NDM resaltado." style="width:80%;" >}}

2. Desplázate hasta el widget de Trampas y observa el gráfico **Traps incorrectly formated** (Trampas formateadas incorrectamente). Si es distinto de cero, probablemente significa que la autenticación en el recopilador de NDM y el dispositivo no coinciden.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="El dashboard de Solucionar problemas de NDM qemuestra la sección del widget Trampas." style="width:100%;" >}}

   **Solución**:

     Comprueba que las siguientes configuraciones del archivo `datadog.yaml` coinciden con las configuraciones de las trampas de los dispositivos de los que faltan trampas:

   ```
    ## @param community_strings - list of strings - required
    ## A list of known SNMP community strings that devices can use to send traps to the Agent.
    ## Traps with an unknown community string are ignored.
    ## Enclose the community string with single quote like below (to avoid special characters being interpreted).
    ## Must be non-empty.
    #
    # community_strings:
    #   - '<COMMUNITY_1>'
    #   - '<COMMUNITY_2>'

    ## @param users - list of custom objects - optional
    ## List of SNMPv3 users that can be used to listen for traps.
    ## Each user can contain:
    ##  * user         - string - The username used by devices when sending Traps to the Agent.
    ##  * authKey      - string - (Optional) The passphrase to use with the given user and authProtocol
    ##  * authProtocol - string - (Optional) The authentication protocol to use when listening for traps from this user.
    ##                            Available options are: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
    ##                            Defaults to MD5 when authKey is set.
    ##  * privKey      - string - (Optional) The passphrase to use with the given user privacy protocol.
    ##  * privProtocol - string - (Optional) The privacy protocol to use when listening for traps from this user.
    ##                            Available options are: DES, AES (128 bits), AES192, AES192C, AES256, AES256C.
    ##                            Defaults to DES when privKey is set.
    #
    # users:
    # - user: <USERNAME>
    #   authKey: <AUTHENTICATION_KEY>
    #   authProtocol: <AUTHENTICATION_PROTOCOL>
    #   privKey: <PRIVACY_KEY>
    #   privProtocol: <PRIVACY_PROTOCOL>
    ```

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/help
[2]: https://app.datadoghq.com/devices
[3]: /es/agent/configuration/agent-commands/#agent-information
[4]: /es/api/latest/network-device-monitoring/
[5]: /es/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /es/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /es/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /es/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162