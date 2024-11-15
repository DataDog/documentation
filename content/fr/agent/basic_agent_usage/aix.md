---
further_reading:
- link: /agent/basic_agent_usage/#architecture-de-l-agent
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configurer-les-ports
  tag: Documentation
  text: Configurer les ports entrants
- link: https://www.datadoghq.com/blog/announcing-ibm-aix-agent/
  tag: GitHub
  text: Surveiller AIX avec l'Agent Datadog Unix
title: Utilisation de base de l'Agent pour AIX
---

<div class="alert alert-info">
L'Agent Datadog Unix est développé pour des architectures système spécifiques. Il diffère de l'Agent Windows, Linux et macOS.
</div>

Cette page décrit les processus d'installation et de configuration de l'Agent Datadog UNIX pour AIX.

**Remarque :** l'Agent Datadog Unix prend en charge PowerPC 8 et ultérieur ainsi que les versions suivantes d'AIX :

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## Configurer l'Agent Datadog pour l'APM

Un script d'installation ksh en une seule étape est fourni sur la [page de téléchargement de l'Agent][1] dans Datadog. Le script accepte les variables d'environnement suivantes :

* **CHANNEL** : prend la valeur stable par défaut. Indique le canal du référentiel du paquet.
  * Valeurs : `stable`, `beta`, `unstable`
* **VERSION** : prend la version la plus récente par défaut. Indique la version du paquet.
* **PROXY** : ne prend aucune valeur par défaut. Indique l'URI du proxy.
  * Exemple : `http://proxy.foo.com`
* **PROXY_USER** : est vide par défaut. Indique le nom d'utilisateur du serveur proxy.
* **PROXY_PASSWORD** : est vide par défaut. Indique le mot de passe du serveur proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour la transmission d'un mot de passe d'authentification. Elle ne peut pas être renommée.
* **INSECURE** : prend la valeur `false` par défaut. Permet d'ignorer la validation TLS.

Les liens de téléchargement des versions les plus récentes sont également disponibles sur [cette page][2].

Le programme d'installation peut être exécuté comme suit (en mode root) :

{{< code-block lang="shell" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VERSION>.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

Cela permet d'installer l'Agent dans `/opt/datadog-agent`.

### Fichiers de log d'installation

Les logs d'installation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver l'enregistrement de ces logs, supprimez le paramètre `-e dd-aix-install.log` de la commande d'installation.

## Commandes

| Description                     | Commande (root nécessaire)           |
|---------------------------------|-----------------------------|
| Démarrer l'Agent en tant que service        | `startsrc -s datadog-agent` |
| Arrêter l'Agent s'exécutant en tant que service | `stopsrc -s datadog-agent`  |
| Statut du service de l'Agent         | `lssrc -s datadog-agent`    |
| Page de statut de l'Agent en cours d'exécution    | `datadog-agent status`      |
| Envoyer un flare                      | `datadog-agent flare`       |
| Afficher l'utilisation des commandes           | `datadog-agent --help`      |

## Configuration

Les fichiers et dossiers de configuration de l'Agent sont situés dans `/etc/datadog-agent/datadog.yaml`.

Vous trouverez un exemple de fichier de configuration dans `/etc/datadog-agent/datadog.yaml.example`.

Votre clé d'API Datadog doit généralement être spécifiée dans votre configuration. Pour envoyer vos métriques à un autre site (par exemple, l'instance européenne de Datadog), l'option de configuration `site` est disponible.

Selon la configuration de votre réseau, il se peut qu'un proxy doive être configuré.

**Fichiers de configuration pour les intégrations :**
`/etc/datadog-agent/conf.d/`

## Intégrations

L'Agent Unix recueille des métriques système pour :

* cpu
* système de fichiers
* iostat
* chargement
* mémoire
* uptime
* disque
* réseau

De plus, les intégrations suivantes peuvent être activées pour recueillir des métriques supplémentaires :

* processus
* lparstats
* [ibm_was (Websphere Application Server)][3]

Pour activer les intégrations ci-dessus, copiez et modifier les exemples de fichier de configuration fournis, qui se trouvent dans `/etc/datadog-agent/conf.d`. Le nom du fichier de configuration YAML doit correspondre à celui de l'intégration. Ainsi, `/etc/datadog-agent/conf.d/<NOM_INTÉGRATION>.d/conf.yaml` active l'intégration `<NOM_INTÉGRATION>` et définit sa configuration. Des exemples de fichier de configuration se trouve dans `/etc/datadog-agent/conf.d/<NOM_INTÉGRATION>.d/conf.yaml.example`.

**Remarque** : certaines des métriques disponibles avec les intégrations pour l'Agent Unix ne sont pas les mêmes que celles pour l'Agent Linux, Windows et macOS. Bien qu'il soit possible de surveiller les processus et les métriques réseau avec l'Agent Unix, les fonctionnalités de surveillance des live processes et des performances réseau ne sont pas disponibles. Log Management n'est pas non plus disponible avec l'Agent Unix.

<div class="alert alert-info">L'Agent Unix n'intègre pas le composant trace-agent. Par conséquent, le tracing avec APM et le profiling ne sont pas disponibles.</div>

## Exécution de DogStatsD

DogStatsD permet la collecte et l'envoi de métriques custom à Datadog. Il effectue son écoute sur port UDP, vers lequel les métriques DogStatsD peuvent être envoyées. Celles-ci sont ensuite transmises à Datadog.

DogStatsD utilise le même fichier de configuration que l'Agent, où une section de configuration dédiée à DogStatsD est disponible. Le serveur DogStatsD s'exécute généralement dans le même processus que celui de l'Agent, mais il peut également être lancé en mode autonome si vous le souhaitez.

Pour activer DogStatsD, modifiez `/etc/datadog-agent/datadog.yaml` et définissez les options de configuration appropriées.

{{< code-block lang="yaml" filename="/etc/datadog-agent/datadog.yaml" >}}
dogstatsd:                        # options de configuration de DogStatsD
  enabled: true                   # désactivé par défaut
  bind_host: localhost            # adresse à utiliser
  port: 8125                      # port d'écoute UDP de DogStatsD
  non_local_traffic: false        # permet d'écouter du trafic non local
{{< /code-block >}}

**Remarque :** DogStatsD ne fonctionne pas en tant que daemon et s'exécute au premier plan.

Il est également possible d'exécuter l'Agent avec le superviseur Python connu. L'utilisation de cette méthode pour gérer le daemon de l'Agent peut être préférable si vous connaissez bien l'outil. Il existe des entrées pour l'Agent et DogStatsD.

## Désinstallation

Pour supprimer un Agent installé, exécutez la commande `installp` suivante :

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

Remarque : les logs de désinstallation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver l'enregistrement de ces logs, supprimez le paramètre `-e` de la commande de désinstallation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/checks/bundled/ibm_was/README.md