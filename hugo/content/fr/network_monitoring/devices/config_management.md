---
description: Affichez et comparez les modifications de configuration des périphériques
  dans NDM.
further_reading:
- link: /network_monitoring/devices/config_management_rollback
  tag: Documentation
  text: Retours en arrière de Network Configuration Management
- link: /network_monitoring/devices/troubleshooting
  tag: Documentation
  text: Dépannage du NDM
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: Blog
  text: Résolvez les problèmes réseau de la couche 7 à la couche 1 avec Datadog
site_support_id: network_config_management
title: Network Configuration Management
---
## Présentation {#overview}

Network Configuration Management (NCM) étend [Network Device Monitoring (NDM)][1] pour inclure la visibilité de la configuration et le suivi des modifications. NCM vous permet de :

- Surveiller l'évolution des configurations des périphériques au fil du temps
- Comparer deux versions de configuration côte à côte
- Utiliser des résumés générés par IA pour comprendre les modifications et leur impact potentiel lors d'incidents
- [Rétablir une configuration précédente sur un périphérique][8]

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_ndm_view.png" alt="Onglet de configuration de Network Device Management, affichant la configuration la plus récente et un résumé généré par IA des modifications." style="width:100%;" >}}

## Prérequis {#prerequisites}

- [Network Device Monitoring][3] (NDM) doit être configuré sur vos périphériques.

## Configuration {#setup}

1. Dans le répertoire de configuration racine de l'Agent situé à `conf.d/network_config_management.d/`, créez le fichier `conf.yaml` et configurez-le comme suit :

   ```yaml
   init_config:
     ## @param namespace - string - optional - default: default
     ## The namespace should match namespaces of devices being monitored
     namespace: default
     ## @param min_collection_interval - integer - optional - default: 900 (15 minutes)
     min_collection_interval: 900
     ## @param ssh - object - optional
     ## Global SSH configuration that applies to all device instances unless 
     ## overridden at the device level. 
     ssh:
       ## @param timeout - duration - optional - default: 30 (seconds)
       ## Maximum time for the SSH client to establish a TCP connection.
       timeout: 30
       ## @param known_hosts_path - string - required (unless insecure_skip_verify is true)
       ## Path to the known_hosts file containing public keys of servers to 
       ## verify the identity of remote hosts. Required for secure connections.
       known_hosts_path: /path/to/known_hosts
       ## @param insecure_skip_verify - boolean - optional - default: false
       ## Skip host key verification. This is INSECURE and should only be used
       ## for development/testing purposes.
       insecure_skip_verify: false 
   instances:
     ## ip_address - string - required
     ## The IP address of the network device to collect configurations from.
   - ip_address: <IP_ADDRESS>
     ## @param auth - object - required
     ## Authentication credentials to connect to the network device.
     auth:
       ## @param username - string - required
       ## Username to authenticate to the network device.
       username: <USERNAME>
       ## @param password - string - required (if private_key_file is not provided)
       ## Password to authenticate to the network device.
       ## Used as a fallback after private key authentication if both are provided.
       password: <PASSWORD>
       ## @param private_key_file - string - optional
       ## Path to the SSH private key file for authentication.
       ## At least one of password or private_key_file must be provided.
       private_key_file: /path/to/private_key
   ```

2. Facultatif : si vos périphériques nécessitent des algorithmes SSH spécifiques, utilisez la configuration suivante :

   ```yaml
   init_config:
     ## To confirm a possible value of algorithms, see the constants described in the golang document.
     ## https://pkg.go.dev/golang.org/x/crypto/ssh#pkg-constants
     ##
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```
   
3. Redémarrez l'Agent pour appliquer les modifications de configuration.

## Affichage des configurations {#viewing-configurations}

Network Configuration Management est accessible depuis la vue des périphériques NDM dans Network Device Monitoring :

1. Accédez à [Network Device Monitoring][3].
2. Sélectionnez un périphérique dans la liste des périphériques ou depuis n'importe quelle visualisation NDM telle que [Device Geomap][4] ou la carte [Device Topology][5].
3. Ouvrez l'onglet {{< ui >}}Configuration{{< /ui >}} dans la vue des périphériques NDM.

   {{< img src="/network_device_monitoring/config_mgmt/config_tab.png" alt="La vue des périphériques NDM, mettant en évidence l'onglet Configuration." style="width:100%;" >}}

   Dans l'onglet Configuration, vous pouvez filtrer ce que la liste de configuration affiche :
   - {{< ui >}}All{{< /ui >}} : Affiche à la fois les configurations en cours d'exécution et de démarrage
   - {{< ui >}}Running{{< /ui >}} : La configuration active et en direct exécutée sur l'appareil
   - {{< ui >}}Startup{{< /ui >}} : La configuration enregistrée qui se charge au démarrage de l'appareil

### Sélecteur de temps et rétention {#time-picker-and-retention}

Les commandes de temps en haut de la page vous permettent de sélectionner l'historique de configuration à afficher. Vous pouvez étendre cette plage pour afficher des versions plus anciennes, jusqu'à la limite de rétention (1 an).

La chronologie et la liste des versions de configuration se mettent automatiquement à jour en fonction de la plage horaire sélectionnée.

**Remarque** : L'historique de configuration commence lorsque NCM est activé pour votre compte. Les données historiques antérieures à l'activation ne sont pas disponibles.

### Afficher une configuration à un moment précis {#view-a-configuration-at-a-point-in-time}

La sélection d'un événement de configuration dans la chronologie ou la liste ouvre une vue de configuration unique montrant l'état du périphérique à ce moment-là.

La vue de configuration unique affiche :

- La configuration complète pour l'horodatage sélectionné
- Les métadonnées du périphérique, y compris l'heure et l'identité du périphérique

Vous pouvez faire défiler la configuration pour examiner l'état du périphérique pendant un incident, ou ajuster la plage horaire pour afficher les configurations de différentes périodes.

### Comparer les versions de configuration {#compare-configuration-versions}

Pour voir ce qui a changé entre les versions de configuration :

1. Sélectionnez deux configurations dans la liste d'historique ou la chronologie à l'aide des cases à cocher. 
2. Cliquez sur {{< ui >}}Compare Two Configs{{< /ui >}} pour ouvrir la vue de comparaison.

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_3.png" alt="Onglet de configuration de la gestion des périphériques réseau, mettant en évidence l'option Comparer deux configurations." style="width:100%;" >}}

La vue de comparaison affiche les deux configurations côte à côte avec des différences en ligne qui mettent en évidence les lignes modifiées. Vous pouvez basculer entre différentes paires de configuration sans fermer la vue de comparaison.

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_3.png" alt="Onglet de configuration de la gestion des périphériques réseau, comparaison de deux versions en vue fractionnée" style="width:90%;" >}}

### Revenir à une configuration précédente {#roll-back-to-a-previous-configuration}

Si une modification de configuration cause un problème, vous pouvez restaurer un périphérique à une configuration précédente directement depuis Datadog. Les restaurations utilisent un Private Action Runner pour rétablir la configuration sélectionnée sur le périphérique.

Consultez [Network Configuration Management Rollbacks][8] pour obtenir des instructions de configuration et d'utilisation.

## Résumés par IA {#ai-summaries}

Network Configuration Management inclut un panneau de résumé alimenté par l'IA qui traduit les modifications de configuration en explications en langage naturel.

Lorsque vous comparez deux versions de configuration, le résumé par IA :

- Décrit les modifications en termes lisibles par l'homme
- Met en évidence les modifications pouvant être pertinentes pour l'analyse d'incidents ou l'analyse des risques

## Profils de périphériques pris en charge {#supported-device-profiles}

NCM utilise des profils de périphériques pour collecter les configurations des périphériques réseau via SSH. Les profils sont fournis avec le Datadog Agent, mis en correspondance automatiquement en fonction du système d'exploitation de votre périphérique et mis à jour via les versions de l'Agent.

| Fournisseur | OS | Profil | Min. Version de l'Agent | En cours d'exécution | Démarrage |
|---|---|---|---|---|---|
| Arista | EOS | `eos` | 7.77.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-CX | `aoscx` | 7.76.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-W | `aosw` | 7.75.0 | {{< X >}} | |
| Cisco | IOS | `cisco-ios` | 7.73.0 | {{< X >}} | {{< X >}} |
| Cisco | NX-OS | `nxos` | 7.76.0 | {{< X >}} | {{< X >}} |
| Dell | DellOS10 | `dellos10` | 7.77.0 | {{< X >}} | {{< X >}} |
| F5 | TMOS | `tmos` | 7.76.0 | {{< X >}} | |
| FortiGate | FortiOS | `fortios` | 7.77.0 | {{< X >}} | |
| Juniper | JunOS | `junos` | 7.74.0 | {{< X >}} | |
| Palo Alto | PAN-OS | `pan-os` | 7.75.0 | {{< X >}} | |

### Commandes de récupération de configuration {#configuration-retrieval-commands}

Chaque profil utilise les commandes suivantes pour collecter les configurations des périphériques via SSH. Pour les définitions complètes des commandes, consultez [default_profiles.go][9].

| Fournisseur | OS | Commande de configuration en cours | Commande de configuration de démarrage |
|---|---|---|---|
| Arista | EOS | `show running-config \| no-more \| exclude ! Time:` | `show startup-config \| no-more \| exclude ! Time:` |
| Aruba | AOS-CX | `show running-config` | `show startup-config` |
| Aruba | AOS-W | `show running-config` | |
| Cisco | IOS | `show running-config` | `show startup-config` |
| Cisco | NX-OS | `show running-config` | `show startup-config` |
| Dell | DellOS10 | `show running-configuration` | `show startup-configuration` |
| F5 | TMOS | `cat /config/partitions/*/bigip*.conf` | |
| FortiGate | FortiOS | `show full-configuration` | |
| Juniper | JunOS | `show configuration \| display omit` | |
| Palo Alto | PAN-OS | `show config running` | |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/devices/
[2]: /fr/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /fr/network_monitoring/devices/geomap
[5]: /fr/network_monitoring/devices/topology
[6]: /fr/network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
[8]: /fr/network_monitoring/devices/config_management_rollback
[9]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkconfigmanagement/profile/default_profiles.go