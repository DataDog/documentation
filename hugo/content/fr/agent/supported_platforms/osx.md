---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /fr/guides/basic_agent_usage/osx/
- /fr/agent/basic_agent_usage/osx/
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
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurer les ports entrants
os: osx
platform: OS X
title: macOS
---
## Présentation {#overview}

Cette page présente les fonctionnalités de base du Datadog Agent pour macOS. Consultez la documentation sur les [plateformes prises en charge][5] pour obtenir la liste complète des distributions et versions de macOS prises en charge.

## Installer l'Agent {#install-the-agent}
Pour installer l'Agent sur macOS, suivez les [instructions intégrées à l'application dans Fleet Automation][6] et exécutez le script généré sur vos hosts.

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="Étapes d'installation intégrées à l'application pour le Datadog Agent sur un host macOS." style="width:90%;">}}

<div class="alert alert-info">
L'Agent est installé dans un bac à sable situé à <code>/opt/datadog-agent</code>. Pour toute surveillance supplémentaire, assurez-vous de donner à l'utilisateur de l'Agent <code>_dd-agent</code> l'accès aux fichiers ou aux répertoires.
</div>


## Commandes{#commands}

Le gestionnaire de services `launchctl` contrôle le cycle de vie de l'Agent, tandis que d'autres commandes peuvent être exécutées via le binaire de l'Agent, l'application systray ou l'interface graphique web.


| Description          | Commande          |
|----------------------|------------------|
| Démarrer l'Agent en tant que service           | `sudo launchctl kickstart system/com.datadoghq.agent` |
« | Arrêter l'Agent en cours d'exécution en tant que service    | `sudo launchctl kill SIGTERM system/com.datadoghq.agent`  |»
« | Redémarrer l'Agent en cours d'exécution en tant que service | `sudo launchctl kickstart -k system/com.datadoghq.agent` |»
« | Statut du service de l'Agent            | `sudo launchctl print system/com.datadoghq.agent` |»
| Page de statut de l'Agent en cours d'exécution       | `sudo datadog-agent status` ou interface graphique web                    |
| Envoyer un flare                         | `sudo datadog-agent flare` ou interface graphique web                     |
| Afficher l'utilisation de la commande              | `datadog-agent --help`                               |
| Exécuter un check                        | `sudo datadog-agent check <CHECK_NAME>`                   |


## Configuration {#configuration}

Le [fichier de configuration du Datadog Agent][7] se trouve dans `/opt/datadog-agent`. e fichier YAML contient les détails de connexion à l'échelle du host utilisés pour envoyer des données à Datadog, notamment :

- `api_key` : [clé d'API Datadog][8] de votre organisation
- `site` : région Datadog cible (par exemple `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy` : endpoints de proxy HTTP/HTTPS pour le trafic sortant (voir [Configuration du proxy du Datadog Agent][9])
- Tags par défaut, niveaux de log et configurations Datadog.

Un fichier de référence entièrement commenté, situé dans `/opt/datadog-agent/etc/datadog.yaml.example`, répertorie toutes les options disponibles pour comparaison ou copier-coller. Sinon, consultez l'[exemple de fichier de configuration de l'Agent pour macOS][10] sur GitHub.

### Fichiers d'intégration {#integration-files}
Les fichiers de configuration pour les intégrations se trouvent dans `/opt/datadog-agent/etc/conf.d/`. Chaque intégration possède son propre sous-répertoire, `<INTEGRATION>.d/`, qui contient :
- `conf.yaml` : la configuration active contrôlant la manière dont l'intégration collecte les métriques et les logs
-  `conf.yaml.example` : un exemple illustrant les clés prises en charge et les valeurs par défaut



## Désinstalle l'Agent {#uninstall-the-agent}

Pour désinstaller l'Agent, exécutez le script suivant :

```shell
curl -L https://install.datadoghq.com/scripts/uninstall_mac_os.sh | bash
```

## Dépannage {#troubleshooting}

Consultez la [documentation de dépannage de l'Agent][2] pour connaître les étapes de dépannage.

## Travailler avec l'Agent intégré {#working-with-the-embedded-agent}

L'Agent contient un environnement Python intégré à `/opt/datadog-agent/embedded/`. Les binaires courants tels que `python` et `pip` sont contenus dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /fr/agent/troubleshooting/
[3]: /fr/extend/guide/custom-python-package/
[4]: /fr/integrations/
[5]: https://docs.datadoghq.com/fr/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /fr/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[11]: https://install.datadoghq.com/scripts/uninstall_mac_os.sh