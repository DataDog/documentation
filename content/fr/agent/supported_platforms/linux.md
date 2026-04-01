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
  text: Découvrez-en plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurez les ports entrants
platform: Linux
title: Linux
---
## Aperçu

Cette page décrit les fonctionnalités de base de l'Agent Datadog pour les environnements Linux. Consultez la documentation [Plateformes prises en charge][5] pour la liste complète des distributions et versions Linux prises en charge.

## Installation de l'Agent
Pour installer l'Agent sur Linux, suivez les [instructions dans l'application dans Fleet Automation][6], et exécutez le script généré sur vos hôtes.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Étapes d'installation dans l'application pour l'Agent Datadog sur un hôte Linux." style="width:90%;">}}


## Configurez l'Agent
Le fichier de configuration de l'Agent Datadog se trouve dans `/etc/datadog-agent/datadog.yaml`. Ce fichier YAML contient les détails de connexion à l'échelle de l'hôte utilisés pour envoyer des données à Datadog, y compris :
- `api_key` : La [clé API Datadog][7] de votre organisation
- `site` : Région cible de Datadog (par exemple `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)
- `proxy` : Points de terminaison proxy HTTP/HTTPS pour le trafic sortant (voir [Configuration du proxy de l'Agent Datadog][8])
- Tags par défaut, niveau de journalisation et configurations Datadog

Un fichier de référence entièrement commenté, situé dans `/etc/datadog-agent/datadog.yaml.example`, répertorie chaque option disponible pour comparaison ou pour copier et coller. Alternativement, consultez le fichier d'exemple `config_template.yaml` pour toutes les options de configuration disponibles.

### Fichiers d'intégration
Les fichiers de configuration pour les intégrations se trouvent dans `/etc/datadog-agent/conf.d/`. Chaque intégration a son propre sous-répertoire, `<INTEGRATION>.d/`, qui contient :
- `conf.yaml` : La configuration active contrôlant la manière dont l'intégration collecte les métriques et les journaux
- `conf.yaml.example` : Un exemple illustrant les clés et valeurs par défaut prises en charge


## Commandes

| Description   | Commande               |
|---------------|-----------------------|
| Démarrer l'Agent en tant que service           | `sudo systemctl start datadog-agent`                   |
| Arrêter l'Agent fonctionnant en tant que service    | `sudo systemctl stop datadog-agent`                    |
| Redémarrer l'Agent fonctionnant en tant que service | `sudo systemctl restart datadog-agent`                 |
| État du service Agent            | `sudo systemctl status datadog-agent`                  |
| Page d'état de l'Agent en cours d'exécution       | `sudo datadog-agent status`                            |
| Envoyer un signal lumineux                         | `sudo datadog-agent flare`                             |
| Afficher l'utilisation de la commande              | `sudo datadog-agent --help`                            |
| Exécuter un contrôle                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Note** : Pour les systèmes basés sur upstart, tels que `CentOS/RHEL 6` ou `SUSE 11`, remplacez `systemctl <action>` par `<action>`. Par exemple, lors du démarrage d'un Agent en tant que service sur un système `SUSE 11`, utilisez `sudo start datadog-agent`.


## Désinstaller l'Agent

Pour désinstaller l'Agent, exécutez la commande pour l'environnement Linux approprié :


### Pour CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux et Red Hat

```shell
sudo yum remove datadog-agent
```

### Pour Debian, Ubuntu

```shell
sudo apt-get remove datadog-agent -y
```

### Pour SUSE

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**Les commandes ci-dessus suppriment l'Agent, mais ne suppriment pas** :
* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'`dd-agent` utilisateur
* Fichiers journaux Datadog

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


### Désinstaller l'instrumentation APM en une seule étape
Si vous avez installé l'Agent avec l'instrumentation APM en une seule étape et que vous souhaitez le désinstaller, vous devez [exécuter des commandes supplémentaires][9] pour supprimer l'instrumentation APM. Suivez les étapes pour votre [environnement spécifique][10].


## Dépannage

Pour des étapes détaillées, consultez [Dépannage de l'Agent][2].

## Utilisation de l'Agent intégré

L'Agent contient un environnement Python intégré à `/opt/datadog-agent/embedded/`. Des binaires courants tels que `python` et `pip` sont contenus dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][3].


## Pour aller plus loin

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