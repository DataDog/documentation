---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /fr/guides/basic_agent_usage/osx/
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurer les ports entrants
os: osx
platform: OS X
title: Utilisation de base de l'Agent pour macOS
---

## Présentation

Cette page présente les fonctionnalités de base de l'Agent Datadog pour macOS. Consultez la documentation sur les [plateformes prises en charge][5] pour voir la liste complète des distributions et versions de macOS prises en charge.

## Installer l'Agent 
Pour installer l'Agent sur macOS, suivez les [instructions intégrées dans Fleet Automation][6], puis exécutez le script généré sur vos hosts.

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="Étapes d'installation intégrée de l'Agent Datadog sur un host macOS." style="width:90%;">}}

<div class="alert alert-info">
Par défaut, l'Agent est installé dans un sandbox situé à l'adresse <code>/opt/datadog-agent</code>. Vous pouvez déplacer ce dossier ailleurs, mais cette documentation suppose une installation dans l'emplacement par défaut.
</div>


## Commandes

Le gestionnaire de services `launchctl` contrôle le cycle de vie de l'Agent. Vous pouvez aussi exécuter certaines commandes via le binaire de l'Agent, l'application dans la barre de menus ou l'interface web.


| Rôle          | Commande          |
|----------------------|------------------|
| Démarrer l'Agent en tant que service           | `launchctl start com.datadoghq.agent` ou barre des menus |
| Arrêter l'Agent s'exécutant en tant que service    | `launchctl stop com.datadoghq.agent` ou barre des menus  |
| Redémarrer l'Agent s'exécutant en tant que service | Arrêtez puis relancez l'Agent avec :<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>. Vous pouvez aussi utiliser l'application systray. |
| Statut du service de l'Agent            | `launchctl list com.datadoghq.agent` ou barre des menus  |
| Page de statut de l'Agent en cours d'exécution       | `datadog-agent status` ou interface graphique Web                    |
| Envoyer un flare                         | `datadog-agent flare` ou interface graphique Web                     |
| Afficher l'utilisation des commandes              | `datadog-agent --help`                               |
| Exécuter un check                        | `datadog-agent check <NOM_CHECK>`                   |


## Configuration

Le [fichier de configuration de l'Agent Datadog][7], situé dans `/etc/datadog-agent/datadog.yaml`, contient les paramètres de connexion généraux utilisés pour transmettre les données à Datadog, notamment :

- `api_key` : la [clé API Datadog][8] de votre organisation 
- `site` : région Datadog ciblée (par exemple `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)  
- `proxy` : endpoints proxy HTTP/HTTPS pour le trafic sortant (consultez la section [Configuration du proxy pour l'Agent Datadog][9])  
- Tags par défaut, niveaux de journalisation et configurations propres à Datadog.

Un fichier de référence entièrement commenté, disponible à l'emplacement `/etc/datadog-agent/datadog.yaml.example`, présente l'ensemble des options configurables pour consultation ou copie. Vous pouvez également consulter le fichier [config_template.yaml d'exemple][10] pour retrouver toutes les options de configuration disponibles.

### Fichiers d'intégration
Les fichiers de configuration des intégrations se trouvent dans `/etc/datadog-agent/conf.d/`. Chaque intégration possède son propre sous-répertoire, `<INTEGRATION>.d/`, qui contient :
- `conf.yaml` : configuration active définissant comment l'intégration collecte les métriques et les logs  
-  `conf.yaml.example` : un exemple illustrant les clés prises en charge et les valeurs par défaut



## Désinstaller l'Agent

Pour désinstaller l'Agent, exécutez la commande suivante :

### Installation pour un seul utilisateur

Pour supprimer l'Agent et tous ses fichiers de configuration :
1. Arrêtez et fermez l'Agent Datadog en cliquant sur l'icône en forme d'os dans la barre des menus.
2. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
3. Exécutez les commandes suivantes :
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Redémarrez votre machine pour que les modifications soient appliquées.

## Désinstaller l'Agent

Pour supprimer l'Agent et tous ses fichiers de configuration :
1. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
2. Pour supprimer les fichiers restants, exécutez les commandes suivantes :
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo launchctl unload /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Redémarrez votre machine pour que les modifications soient appliquées.

## Dépannage

Consultez la [documentation relative au dépannage de l'Agent][2] pour accéder aux instructions de dépannage.

## Utilisation de l'Agent intégré

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /fr/agent/troubleshooting/
[3]: /fr/developers/guide/custom-python-package/
[4]: /fr/integrations/
[5]: https://docs.datadoghq.com/fr/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /fr/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml