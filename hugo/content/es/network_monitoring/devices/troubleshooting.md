---
aliases:
- /es/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Hacer un seguimiento de SNMP con Datadog
- link: /network_monitoring/devices/glossary
  tag: Doc
  text: Términos y conceptos de NDM
title: Solución de problemas de NDM
---
## Descripción general {#overview}

Utilice la información a continuación para solucionar problemas de Datadog Network Device Monitoring. Si necesita ayuda adicional, comuníquese con el [soporte de Datadog][1].

## Dispositivo no visible en Datadog {#device-not-visible-in-datadog}

Lo siguiente asume que está ejecutando Datadog Agent v7.61.0+.

Si su dispositivo no es visible en la página [Devices][2]:

1. Ejecute el comando [datadog-agent status][3] y busque la sección snmp, que contiene la IP de monitoreo de su dispositivo. Después de iniciar el Agent, puede tomar hasta un minuto para que NDM descubra los dispositivos configurados individualmente. Si su Agent está configurado para escanear una gran cantidad de dispositivos, puede tomar más tiempo.
El resultado debería verse similar a lo siguiente:

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

2. Si su dispositivo no aparece en la lista y está utilizando Autodiscovery, es probable que el Agent no haya podido conectarse a su dispositivo.

   - Ejecute el comando `datadog-agent status` y espere a que la sección `autodiscovery` informe que se han escaneado todas las IP de dispositivo posibles. En redes grandes, esto puede tomar varios minutos. El resultado debería verse similar a lo siguiente:

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

    If Autodiscovery completed and your device is still not appearing on the [Devices][2] page, it means the Agent could not connect to your device.

   - Ejecute un `snmp walk` en la IP de administración del dispositivo para determinar por qué el Agent no puede conectarse a su dispositivo.

      **Nota**: Proporcione sus credenciales directamente en la CLI. Si no se proporcionan las credenciales, el Agent intenta localizarlas en los archivos de configuración del Agent en ejecución. 
      
      Consulte la documentación específica de su proveedor para obtener información adicional sobre la ejecución de estos comandos.

      {{< tabs >}}
      {{% tab "Linux" %}}

   SNMP v2:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
   ```

   SNMP v3:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
   ```

      {{% /tab %}}
      {{% tab "Windows" %}}

   Navegue al directorio de instalación del Agent:

   ```shell
   cd "c:\Program Files\Datadog\Datadog Agent\bin"
   ```

   Para SNMP v2, ejecute:

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <community-string> <IP-Address>:<port>
   ```

   Para SNMP v3, ejecute:

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH-PROTOCOL> -A <AUTH-KEY> -x <PRIV-PROTOCOL> -X <PRIV-KEY> <IP-Address>:<port>
   ```

   **Nota**: Ejecute el comando como administrador desde el directorio de instalación del Agent para evitar el siguiente error:

   ```shell
   Error: unable to read artifact: open C:\ProgramData\Datadog\auth_token: Access is denied.
   ```

      {{% /tab %}}
      {{< /tabs >}}

## Solución de problemas de errores SNMP {#troubleshooting-snmp-errors}

Si el estado de SNMP o el walk del Agent muestran un error, podría indicar uno de los siguientes problemas:

### Permiso denegado {#permission-denied}

Si ve un error de permiso denegado durante la vinculación de puertos en los registros del Agent, es posible que el número de puerto que indicó requiera permisos elevados. Para vincular a un número de puerto inferior a 1024, consulte [Uso del puerto SNMP Trap predeterminado 162][8].

### Dispositivo inalcanzable o mal configurado: {#unreachable-or-misconfigured-device}

   **Error**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **Solución**:

   1. Inicie sesión en su dispositivo y asegúrese de que SNMP esté habilitado y expuesto en el puerto 161.
   2. Verifique que el firewall de su recopilador permita el tráfico de salida.

   3. Opcionalmente, solo para Linux:

      Ejecute `iptables -L OUTPUT` y asegúrese de que no haya ninguna regla de denegación:

      ```shell
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. Asegúrese de que su cadena de comunidad coincida.

### Credenciales SNMPv2 incorrectas {#incorrect-snmpv2-credentials}

   **Error**:
   ```
   Error: an authentication method needs to be provided
   ```

   **Solución**:

   Si utiliza SNMPv2, asegúrese de que haya una cadena de comunidad configurada.

### Protocolo de privacidad SNMPv3 incorrecto {#incorrect-snmpv3-privacy-protocol}

   **Error**:
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   O

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **Solución**:

   Verifique que los siguientes parámetros de configuración de SNMPv3 sean correctos:
   - usuario
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### Traps o Flows no se reciben en absoluto {#traps-or-flows-not-being-received-at-all}

Si faltan tramas SNMP o tráfico NetFlow, una causa común es que las reglas del firewall bloqueen los paquetes UDP antes de que lleguen al Agent. Tanto las tramas SNMP como NetFlow dependen de UDP y utilizan los puertos definidos en su configuración [datadog.yaml][9].

<div class="alert alert-info">Los firewalls locales como Uncomplicated Firewall (UFW) pueden bloquear el tráfico incluso cuando están configurados con ajustes permisivos. Revise los registros del sistema en busca de entradas de paquetes bloqueados, lo que normalmente indica que el tráfico llegó a la interfaz de red pero fue bloqueado antes de llegar al sistema operativo.</div>

Utilice los siguientes comandos específicos de la plataforma para verificar si hay reglas de firewall que puedan estar impidiendo que el tráfico llegue al Agent.

{{< tabs >}}
{{% tab "Linux" %}}

Linux tiene varios tipos de firewalls, como `iptables`, `nftables` o `ufw`. Dependiendo de cuál esté en uso, se pueden utilizar los siguientes comandos:

- `sudo iptables -S`

- `sudo nft list ruleset`

- `sudo ufw status`

Busque reglas que bloqueen el tráfico UDP en los puertos configurados.

{{% /tab %}}
{{% tab "Windows" %}}

A partir de la versión `7.67`, el comando `agent.exe diagnose` del Agent verifica automáticamente si hay reglas de firewall que bloqueen el tráfico y muestra advertencias si encuentra alguna.

Para inspeccionar manualmente las reglas de firewall:

```powershell
Get-NetFirewallRule -Action Block | ForEach-Object {
    $rule = $_
    Get-NetFirewallPortFilter -AssociatedNetFirewallRule $rule | Select-Object
        @{Name="Name"; Expression={$rule.Name}},
        @{Name="DisplayName"; Expression={'"' + $rule.DisplayName + '"'}},
        @{Name="Direction"; Expression={$rule.Direction}},
        @{Name="Protocol"; Expression={$_.Protocol}},
        @{Name="LocalPort"; Expression={$_.LocalPort}},
        @{Name="RemotePort"; Expression={$_.RemotePort}}
} | Format-Table -AutoSize
```

Busque reglas donde:
- **Dirección** es entrante
- **Protocolo** es UDP
- **PuertoLocal** coincide con uno de sus puertos configurados

{{% /tab %}}
{{% tab "macOS" %}}

Ejecute el siguiente comando para revisar las reglas de Packet Filter (pf):

```shell
sudo pfctl -sr
```

Busque cualquier regla que bloquee el tráfico UDP en sus puertos configurados. Por ejemplo:`block drop in proto udp from any to any port = <CONFIG_PORT>`.
{{% /tab %}}
{{< /tabs >}}

### Traps no se reciben para los dispositivos {#traps-not-being-received-for-devices}

1. Verifique el archivo `agent.log` de Datadog para asegurarse de que puede vincularse al puerto de traps. El siguiente error indica que no puede vincularse al puerto de tramas:

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **Solución**:
   Agregue una capacidad de vinculación de red (net bind) al binario del Agent, lo que permite que el Agent se vincule a puertos reservados:

   ```shell
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

### Traps con formato incorrecto {#traps-incorrectly-formatted}

1. Navegue al Dashboard de solución de problemas en NDM:

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="La página de Network Device Monitoring que muestra el menú desplegable del Dashboard con el NDM Troubleshooting Dashboard resaltado." style="width:80%;" >}}

2. Desplácese hacia abajo hasta el widget de Traps y observe el gráfico {{< ui >}}Traps incorrectly formatted{{< /ui >}}. Si esto no es cero, probablemente significa que la autenticación en el recopilador de NDM y el dispositivo no coinciden.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="El dashboard de resolución de problemas de NDM que muestra la sección del widget de tramas." style="width:100%;" >}}

   **Solución**:

     Verify that the following configurations in the `datadog.yaml` file align with the trap settings on the devices from which traps are missing:

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

## Further Reading 

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/help
[2]: https://app.datadoghq.com/devices
[3]: /es/agent/configuration/agent-commands/#agent-information
[4]: /es/api/latest/network-device-monitoring/
[5]: /es/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /es/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /es/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /es/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
[9]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file