---
description: Restaurez une configuration précédente d'un périphérique réseau directement
  depuis NDM.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: Documentation
  text: Network Configuration Management
- link: /actions/private_actions/
  tag: Documentation
  text: Private Action Runner
title: Retours en arrière de Network Configuration Management
---
## Présentation {#overview}

Les retours en arrière de Network Configuration Management (NCM) vous permettent de restaurer une configuration précédente d'un périphérique réseau directement depuis Datadog. Les retours en arrière utilisent un [Private Action Runner (PAR)][1] pour appliquer la configuration sélectionnée au périphérique.

Les retours en arrière sont pris en charge pour les fournisseurs et plateformes suivants :

- Cisco IOS
- Arista (EOS)

## Prérequis {#prerequisites}

- [Network Configuration Management][2] doit être configuré pour vos périphériques.
- Le Datadog Agent doit être en version `7.83.0` ou ultérieure.
- Un [Private Action Runner][1] accessible par le port IPC de l'Agent (par défaut `5001`), soit sur le même host, soit via le réseau.

## Configuration {#setup}

### Agent {#agent}

1. Ajoutez ce qui suit à votre `datadog.yaml` pour activer les retours en arrière :

   ```yaml
   network_devices:
     config_management:
       rollback:
         enabled: true
   ```

   Alternativement, définissez l'option de configuration `network_devices.config_management.rollback.enabled` sur `true`.

2. Dans `conf.d/network_config_management.d/conf.yaml`, définissez éventuellement la fréquence à laquelle l'Agent rapporte son inventaire de configuration :

   ```yaml
   init_config:
     ## @param inventory_report_max_interval - integer - optional - default: 3600 (1 hour)
     ## Maximum interval, in seconds, between inventory reports.
     inventory_report_max_interval: 3600
   ```

3. Configurez éventuellement le stockage local qui contient les configurations éligibles à un retour en arrière :

   ```yaml
   init_config:
     store:
       ## @param min_configs_per_device - integer - optional - default: 2
       ## Minimum number of configurations to retain per device, regardless of age.
       min_configs_per_device: 2
       ## @param max_configs_per_device - integer - optional - default: 24
       ## Maximum number of configurations to retain per device before older ones are evicted.
       max_configs_per_device: 24
       ## @param max_raw_config_store_bytes - integer - optional - default: 2000000000 (2 GB)
       ## Maximum size, in bytes, of the local configuration store before older configurations are evicted.
       max_raw_config_store_bytes: 2000000000
   ```

4. Le processus de l'Agent nécessite un accès en écriture au répertoire `run_path` où les données de retours en arrière sont stockées localement.

5. Redémarrez l'Agent pour appliquer les modifications de configuration.

### Private Action Runner {#private-action-runner}

1. [Configurez un Private Action Runner][1] sur un host accessible par le port IPC de l'Agent.
2. Ajoutez `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` à la section `private_action_runner.actions_allowlist` de `/etc/datadog-agent/datadog.yaml`. Consultez [Modifier la liste d'autorisation d'un exécuteur][3] pour plus de détails.
3. Enregistrez l'exécuteur dans Datadog et affectez-le à un groupe d'exécution. Au sein de ce groupe, créez une politique qui autorise l'action `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig`.
   - La politique doit accorder l'accès `Editor` aux utilisateurs ayant le rôle `NCM Device Config Write`.

   {{< img src="/network_device_monitoring/config_mgmt/execution_group_policy.png" alt="Capture d'écran montrant comment ajouter le rôle NCM Write à une politique de groupe d'exécution" style="width:100%;" >}}

### Autorisations {#permissions}

Les retours en arrière utilisent les autorisations NCM suivantes :

| Autorisation | Autorise |
|---|---|
| NCM Read | Affichage des configurations d'un périphérique |
| NCM Write | Déclenchement d'un retour en arrière |


## Déclencher un retour en arrière {#trigger-a-rollback}

1. Accédez à l'[onglet Configuration][2] pour un appareil dans la vue des appareils NDM.
2. Sélectionnez la version de configuration vers laquelle vous souhaitez revenir. Le panneau latéral affiche un bouton {{< ui >}}Rollback{{< /ui >}} pour cette version.
3. Cliquez sur {{< ui >}}Rollback{{< /ui >}}, examinez la différence dans la fenêtre de confirmation.
4. Cliquez à nouveau sur {{< ui >}}Rollback{{< /ui >}} pour confirmer.

   {{< img src="/network_device_monitoring/config_mgmt/config_rollback.png" alt="Capture d'écran montrant quand un retour en arrière a été lancé et à quoi s'attendre :" style="width:100%;" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/
[2]: /fr/network_monitoring/devices/config_management/#viewing-configurations
[3]: /fr/actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist