---
aliases:
- /fr/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
- link: /network_monitoring/devices/glossary
  tag: Doc
  text: Termes et concepts NDM
title: Dépannage du NDM
---
## Présentation {#overview}

Utilisez les informations ci-dessous pour le dépannage de Datadog Network Device Monitoring. Si vous avez besoin d'aide supplémentaire, contactez [Datadog support][1].

## Appareil non visible dans Datadog {#device-not-visible-in-datadog}

Ce qui suit suppose que vous exécutez l'Agent Datadog v7.61.0+.

Si votre appareil n'est pas visible sur la page [Devices][2] :

1. Exécutez la commande [datadog-agent status][3] et recherchez la section snmp, qui contient l'adresse IP de surveillance de votre appareil. Après avoir démarré l'Agent, il peut falloir jusqu'à une minute pour que NDM découvre les appareils configurés individuellement. Si votre Agent est configuré pour analyser un grand nombre d'appareils, cela peut prendre plus de temps.
La sortie doit ressembler à ce qui suit :

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

2. Si votre appareil n'est pas répertorié et que vous utilisez l'Autodiscovery, cela signifie probablement que l'Agent n'a pas pu se connecter à votre appareil.

   - Exécutez la commande `datadog-agent status` et attendez que la section `autodiscovery` indique que toutes les adresses IP d'appareils possibles ont été analysées. Sur les grands réseaux, cela peut prendre plusieurs minutes. La sortie doit ressembler à ce qui suit :

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

   - Exécutez un `snmp walk` sur l'adresse IP d'administration de l'appareil pour déterminer pourquoi l'Agent ne parvient pas à se connecter à votre appareil.

      **Remarque** : fournissez vos identifiants directement dans l'interface de ligne de commande. Si les identifiants ne sont pas fournis, l'Agent tente de les localiser dans vos fichiers de configuration de l'Agent en cours d'exécution. 
      
      Consultez la documentation spécifique à votre fournisseur pour obtenir des informations supplémentaires sur l'exécution de ces commandes.

      {{< tabs >}}
      {{% tab "Linux" %}}

   SNMP v2 :

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
   ```

   SNMP v3 :

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
   ```

      {{% /tab %}}
      {{% tab "Windows" %}}

   Accédez au répertoire d'installation de l'Agent :

   ```shell
   cd "c:\Program Files\Datadog\Datadog Agent\bin"
   ```

   Pour SNMP v2, exécutez :

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <community-string> <IP-Address>:<port>
   ```

   Pour SNMP v3, exécutez :

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH-PROTOCOL> -A <AUTH-KEY> -x <PRIV-PROTOCOL> -X <PRIV-KEY> <IP-Address>:<port>
   ```

   **Remarque** : Exécutez la commande en tant qu'administrateur depuis le répertoire d'installation de l'Agent pour éviter l'erreur suivante :

   ```shell
   Error: unable to read artifact: open C:\ProgramData\Datadog\auth_token: Access is denied.
   ```

      {{% /tab %}}
      {{< /tabs >}}

## Dépannage des erreurs SNMP {#troubleshooting-snmp-errors}

Si le statut SNMP ou le walk de l'Agent affiche une erreur, cela pourrait indiquer l'un des problèmes suivants :

### Permission refusée {#permission-denied}

Si vous voyez une erreur de permission refusée lors de la liaison de port dans les logs de l'agent, le numéro de port que vous avez indiqué peut nécessiter des autorisations élevées. Pour vous lier à un numéro de port inférieur à 1024, consultez [Using the default SNMP Trap port 162][8].

### Appareil inaccessible ou mal configuré : {#unreachable-or-misconfigured-device}

   **Erreur** :
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **Solution** :

   1. Connectez-vous à votre appareil et assurez-vous que SNMP est activé et exposé sur le port 161.
   2. Vérifiez que le pare-feu de votre collecteur autorise le trafic sortant.

   3. Optionnellement, pour Linux uniquement :

      Exécutez `iptables -L OUTPUT` et assurez-vous qu'il n'y a aucune règle de refus :

      ```shell
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. Assurez-vous que votre chaîne de communauté correspond.

### Identifiants SNMPv2 incorrects {#incorrect-snmpv2-credentials}

   **Erreur** :
   ```
   Error: an authentication method needs to be provided
   ```

   **Solution** :

   Si vous utilisez SNMPv2, assurez-vous qu'une chaîne de communauté est définie.

### Protocole de confidentialité SNMPv3 incorrect {#incorrect-snmpv3-privacy-protocol}

   **Erreur** :
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   OU

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **Solution** :

   Vérifiez que les paramètres de configuration SNMPv3 suivants sont corrects :
   - user
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### Traps or Flows non reçus du tout {#traps-or-flows-not-being-received-at-all}

Si SNMP traps ou le trafic NetFlow sont manquants, une cause fréquente est que les règles de pare-feu bloquent les paquets UDP avant qu'ils n'atteignent l'Agent. Les SNMP traps et NetFlow reposent tous deux sur UDP et utilisent les ports définis dans votre [datadog.yaml][9] configuration.

<div class="alert alert-info">Les pare-feux locaux comme Uncomplicated Firewall (UFW) peuvent bloquer le trafic même lorsqu'ils sont configurés avec des paramètres permissifs. Vérifiez les logs système pour trouver des entrées de paquets bloqués, ce qui indique généralement que le trafic a atteint l'interface réseau mais a été bloqué avant d'atteindre le système d'exploitation.</div>

Utilisez les commandes spécifiques à la plateforme suivantes pour vérifier si des règles de pare-feu empêchent le trafic d'atteindre l'Agent.

{{< tabs >}}
{{% tab "Linux" %}}

Linux possède plusieurs types de pare-feux, tels que `iptables`, `nftables` ou `ufw`. Selon celui qui est utilisé, les commandes suivantes peuvent être employées :

- `sudo iptables -S`

- `sudo nft list ruleset`

- `sudo ufw status`

Recherchez les règles bloquant le trafic UDP sur les ports configurés.

{{% /tab %}}
{{% tab "Windows" %}}

À partir de la version `7.67`, la commande `agent.exe diagnose` de l'Agent vérifie automatiquement la présence de règles de pare-feu bloquantes et affiche des avertissements si elle en trouve.

Pour inspecter manuellement les règles de pare-feu :

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

Recherchez les règles où :
- **La direction** est entrante
- **Le protocole** est UDP
- **Le port local** correspond à l'un de vos ports configurés

{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande suivante pour examiner les règles du filtre de paquets (pf) :

```shell
sudo pfctl -sr
```

Vérifiez s'il existe des règles bloquant le trafic UDP sur vos ports configurés. Par exemple : `block drop in proto udp from any to any port = <CONFIG_PORT>`.
{{% /tab %}}
{{< /tabs >}}

### Traps non reçus pour les appareils {#traps-not-being-received-for-devices}

1. Vérifiez le fichier Datadog `agent.log` pour vous assurer que vous pouvez vous lier au port traps. L'erreur suivante indique que vous ne pouvez pas vous lier au port traps :

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **Solution** :
   Ajoutez une capacité net bind au binaire de l'Agent, ce qui permet à l'Agent de se lier aux ports réservés :

   ```shell
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

### Traps mal formatés {#traps-incorrectly-formatted}

1. Accédez au dashboard de dépannage dans NDM :

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="La page de Network Device Monitoring affichant le menu déroulant Dashboard avec le dashboard de dépannage NDM mis en surbrillance." style="width:80%;" >}}

2. Faites défiler jusqu'au widget Traps et observez le graphique {{< ui >}}Traps incorrectly formatted{{< /ui >}}. Si cette valeur est différente de zéro, cela signifie probablement que l'authentification sur le collecteur NDM et sur l'appareil ne correspondent pas.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="Le dashboard de dépannage NDM affichant la section du widget Traps." style="width:100%;" >}}

   **Solution** :

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


[1]: /fr/help
[2]: https://app.datadoghq.com/devices
[3]: /fr/agent/configuration/agent-commands/#agent-information
[4]: /fr/api/latest/network-device-monitoring/
[5]: /fr/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /fr/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /fr/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /fr/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
[9]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file