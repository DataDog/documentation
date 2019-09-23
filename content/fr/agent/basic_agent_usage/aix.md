---
title: Utilisation de base de l'Agent pour AIX
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/announcing-ibm-aix-agent/"
  tag: Blog
  text: Surveiller AIX avec l'Agent Datadog Unix
---

<div class="alert alert-info">
L'Agent Datadog Unix est développé pour des architectures système spécifiques et diffère de l'Agent versions 5 et 6.
</div>

Cette page décrit les processus d'installation et de configuration de l'Agent Datadog UNIX pour AIX.

**Remarque :** l'Agent Datadog Unix prend actuellement en charge les versions suivantes d'AIX :

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## Installation

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

```shell
installp -aXYgd ./datadog-unix-agent-<version>.powerpc.bff -e dd-aix-install.log datadog-unix-agent
```

Cela permet d'installer l'Agent dans `/opt/datadog-agent`.

Remarque : les logs d'installation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver l'enregistrement de ces logs, supprimez le paramètre `-e` de la commande d'installation.


## Commandes

| Description                        | Commande (root nécessaire)                   |
| --------------------               | --------------------                |
| Démarrer l'Agent en tant que service           | `startsrc -s datadog-agent`         |
| Arrêter l'Agent s'exécutant en tant que service    | `stopsrc -s datadog-agent`          |
| Statut du service de l'Agent            | `lssrc -s datadog-agent`            |
| Page de statut de l'Agent en cours d'exécution       | `datadog-agent status`              |
| Envoyer un flare                         | `datadog-agent flare`               |
| Afficher l'utilisation des commandes              | `datadog-agent --help`              |

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent dans :
`/etc/datadog-agent/datadog.yaml`
Toutefois, les fichiers de configuration sont récupérés dans l'ordre suivant (le premier fichier trouvé étant celui utilisé) :

* `/etc/datadog-agent/datadog.yaml`
* `./etc/datadog-agent/datadog.yaml`
* `./datadog.yaml`

Vous trouverez un exemple de fichier de configuration dans `/opt/datadog-agent/etc/datadog-agent`.

Votre clé d'API Datadog doit généralement être spécifiée dans votre configuration. Pour envoyer vos métriques à l'instance européenne de Datadog, l'option de configuration `site` est disponible.

Vous pouvez également remplacer `dd_url` manuellement, mais ce n'est normalement pas nécessaire.

Selon la configuration de votre réseau, il se peut qu'un proxy doive être configuré.

**Fichiers de configuration pour les intégrations :**
`/etc/datadog-agent/conf.d/`

## Intégrations

Intégrations supplémentaires disponibles :

* process
* lparstats
* disk
* network

Pour activer les intégrations ci-dessus, copiez et modifiez les exemples de fichier de configuration fournis. Ils doivent se trouver dans `/etc/datadog-agent/conf.d`. Le nom du fichier de configuration YAML doit correspondre à celui de l'intégration : `/etc/datadog-agent/conf.d/<NOM_INTÉGRATION>.yaml` active l'intégration `<NOM_INTÉGRATION>` et définit sa configuration.

## Exécution de DogStatsD

DogStatsD permet la collecte et l'envoi de métriques custom à Datadog. Il effectue son écoute sur port UDP, vers lequel les métriques DogStatsD peuvent être envoyées. Celles-ci sont ensuite transmises à Datadog.

DogStatsD utilise le même fichier de configuration que l'Agent, où une section de configuration dédiée à DogStatsD est disponible. Le serveur DogStatsD s'exécute généralement dans le même processus que celui de l'Agent, mais il peut également être lancé en mode autonome si vous le souhaitez.

Pour activer DogStatsD, modifiez `/etc/datadog-agent/datadog.yaml` et définissez les options de configuration appropriées.

```
dogstatsd:                        # options de configuration de DogStatsDs
  enabled: true                   # désactivé par défaut
  bind_host: localhost            # adresse à utiliser 
  port: 8125                      # port d'écoute UDP de DogStatsD
  non_local_traffic: false        # permet d'écouter du trafic non local
```

**Remarque :** DogStatsD ne fonctionne pas en tant que daemon et s'exécute au premier plan.

Il est également possible d'exécuter l'Agent via le superviseur Python connu. L'utilisation de cette méthode pour gérer le daemon de l'Agent peut être préférable si vous connaissez bien l'outil. Il existe des entrées pour l'Agent et DogStatsD.

## Désinstaller

Pour supprimer un Agent installé, exécutez la commande `installp` suivante :

```
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Remarque : les logs de désinstallation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver l'enregistrement de ces logs, supprimez le paramètre `-e` de la commande de désinstallation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
