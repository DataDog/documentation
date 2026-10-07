---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /fr/guides/basic_agent_usage/amazonlinux/
- /fr/guides/basic_agent_usage/centos/
- /fr/guides/basic_agent_usage/deb/
- /fr/agent/basic_agent_usage/install_debian_5/
- /fr/guides/basic_agent_usage/fedora/
- /fr/guides/basic_agent_usage/redhat/
- /fr/guides/basic_agent_usage/suse/
- /fr/guides/basic_agent_usage/ubuntu/
- /fr/agent/basic_agent_usage/alma/
- /fr/agent/basic_agent_usage/amazonlinux/
- /fr/agent/basic_agent_usage/centos/
- /fr/agent/basic_agent_usage/deb/
- /fr/agent/basic_agent_usage/fedora/
- /fr/agent/basic_agent_usage/oracle/
- /fr/agent/basic_agent_usage/redhat/
- /fr/agent/basic_agent_usage/ubuntu/
- /fr/agent/basic_agent_usage/suse/
- /fr/agent/basic_agent_usage/rocky/
- /fr/agent/basic_agent_usage/linux/
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
platform: Linux
title: Linux
---
## Présentation {#overview}

Cette page présente les fonctionnalités de base du Datadog Agent pour les environnements Linux. Consultez la documentation sur les [plateformes prises en charge][5] pour obtenir la liste complète des distributions et versions Linux prises en charge.

## Installer l'Agent {#install-the-agent}
Pour installer l'Agent sur Linux, suivez les [instructions in-app dans Fleet Automation][6] et exécutez le script généré sur vos hosts.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Étapes d'installation intégrées pour le Datadog Agent sur un host Linux." style="width:90%;">}}


## Configurer l'Agent {#configure-the-agent}
Le fichier de configuration du Datadog Agent se trouve dans `/etc/datadog-agent/datadog.yaml`. e fichier YAML contient les détails de connexion à l'échelle du host utilisés pour envoyer des données à Datadog, notamment :
- `api_key` : La [clé d'API Datadog][7] de votre organisation
- `site` : Région Datadog cible (par exemple `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy` : Endpoints de proxy HTTP/HTTPS pour le trafic sortant (voir [Datadog Agent Proxy Configuration][8])
- Tags par défaut, niveau de log et configurations Datadog

Un fichier de référence entièrement commenté, situé dans `/etc/datadog-agent/datadog.yaml.example`, répertorie toutes les options disponibles pour comparaison ou pour copier-coller. Alternativement, consultez l'[exemple de fichier de configuration de l'Agent pour Linux][11] sur GitHub.

### Fichiers d'intégration {#integration-files}
Les fichiers de configuration pour les intégrations se trouvent dans `/etc/datadog-agent/conf.d/`. Chaque intégration possède son propre sous-répertoire, `<INTEGRATION>.d/`, qui contient :
- `conf.yaml` : La configuration active contrôlant la manière dont l'intégration collecte les métriques et les logs
- `conf.yaml.example` : Un exemple illustrant les clés prises en charge et les valeurs par défaut


## Commandes{#commands}

| Description   | Commande               |
|---------------|-----------------------|
| Démarrer l'Agent en tant que service           | `sudo systemctl start datadog-agent`                   |
| Arrêter l'Agent fonctionnant en tant que service    | `sudo systemctl stop datadog-agent`                    |
| Redémarrer l'Agent fonctionnant en tant que service | `sudo systemctl restart datadog-agent`                 |
| État du service de l'Agent | `sudo systemctl status datadog-agent`                  |
| Page d'état de l'Agent en cours d'exécution       | `sudo datadog-agent status`                            |
| Envoyer un flare                         | `sudo datadog-agent flare`                             |
| Afficher l'utilisation de la commande | `sudo datadog-agent --help`                            |
| Exécuter un check | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Remarque** : Pour les systèmes basés sur upstart, tels que `CentOS/RHEL 6` ou `SUSE 11`, remplacez `systemctl <action>` par `<action>`. Par exemple, lors du démarrage d'un Agent en tant que service sur un système `SUSE 11`, utilisez `sudo start datadog-agent`.


## Désinstalle l'Agent {#uninstall-the-agent}

Pour désinstaller l'Agent, exécutez la commande correspondant à l'environnement Linux approprié :


### Pour CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux et Red Hat {#for-centos-rocky-almalinux-amazon-linux-oracle-linux-and-red-hat}

```shell
sudo yum remove datadog-agent
```

### Pour Debian, Ubuntu {#for-debian-ubuntu}

```shell
sudo apt-get remove datadog-agent -y
```

### Pour SUSE {#for-suse}

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**Les commandes ci-dessus suppriment l'Agent, mais ne suppriment pas** :
* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

**Pour supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

Pour désinstaller les artefacts restants de l'Agent pour `Debian` et `Ubuntu`, exécutez :

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Désinstaller Single Step APM Instrumentation {#uninstall-single-step-apm-instrumentation}
Si vous avez installé l'Agent avec Single Step APM Instrumentation et que vous souhaitez le désinstaller, vous devez [exécuter des commandes supplémentaires][9] pour supprimer Single Step APM Instrumentation. Suivez les étapes pour votre [environnement spécifique][10].


## Dépannage {#troubleshooting}

Pour des étapes détaillées, consultez [Agent Troubleshooting][2].

## Travailler avec l'Agent intégré {#working-with-the-embedded-agent}

L'Agent contient un environnement Python intégré à `/opt/datadog-agent/embedded/`. Les binaires courants tels que `python` et `pip` sont contenus dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][3].


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /fr/agent/troubleshooting/
[3]: /fr/extend/guide/custom-python-package/
[4]: /fr/integrations/
[5]: /fr/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://docs.datadoghq.com/fr/agent/configuration/proxy/
[9]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[10]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example