---
title: Collecte de log avec Docker
kind: documentation
further_reading:
- link: "logs/explore"
  tag: "Documentation"
  text: Apprenez à explorer vos logs
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
---

## Aperçu

L'agent Datadog version 6 (et plus) peut collecter le journal d'événements depuis des conteneurs.
Deux installations sont possible :

- dans l'hôte dont l'Agent est à l'externe de l'environnement Docker
- ou en déployant sa version conteneurisée dans l'environnement Docker

Vous pouvez ensuite choisir de collecter tous les journaux d'événements de tous les conteneurs de votre environnement, ou de filtrer soit par nom d'image, soit par étiquette de conteneur pour choisir quels journaux doivent être collectés.

## Implémentation
### Option 1: Installation dans l'hôte

Installez la [version le plus récente de l'Agent 6][1] sur votre hôte.

L'Agent peut récupérer les journaux d'événements depuis des [fichiers dans l'hôte][2] ou depuis un [conteneur](#configuration-file-example). Pour l'utiliser, vous devrez mettre à jour ou créer un nouveau fichier de configuration dans le dossier `/conf.d/` de l'Agent (comme expliqué dans les liens fournis).

### Option 2: Installation dans un conteneur

Comme expliqué ci-dessus, l'Agent a aussi une installation [conteneurisée][3].

D'abord, créons deux dossiers dans l'hôte que nous monterons plus tard dans l'Agent conteneurisé.

- `/opt/datadog-agent/run` : pour nous assurer que nous ne perdrons aucun journal d'événement de nos conteneurs suite à un redémarrage (ou une faute réseautique), nous gardons directement dans l'hôte la dernière ligne récupérer depuis chaque conteneur dans ce dossier

- `/opt/datadog-agent/conf.d` : c'est ici que vous fournirez vos instructions d'intégration. Tout fichier de configuration présente ici sera récupérée par l'Agent conteneurisé lors d'un redémarrage.
Consultez plus d'informations sur ce check [ici][4]

Pour exécuter un conteneur Docker qui intègre l'Agent Datadog pour surveiller votre hôte, utilisez la commande suivante :

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<YOUR_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /opt/datadog-agent/conf.d:/conf.d:ro \
           datadog/agent:latest
```

Notes importantes:

- L'intégration Docker et [l'autodiscovery][5] sont activées par défaut dans le mode configuration automatique (désactiver les écouteurs : section -docker dans `datadog.yaml`).

- Nous vous recommandons de choisir systématiquement la version le plus récente de l'Agent 6 de Datadog. Consultez la [liste complète des images][6] pour l'Agent 6.

Les commandes liées à la récupération des journaux d'événements sont les suivantes :

* `-e DD_LOGS_ENABLED=true` : ce paramètre activera la collection des journaux d'événements lorsqu'elle est réglée en tant que « true ». L'Agent recherche désormais les instructions de journal d'événements dans les fichiers de configuration.
* `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` : ce paramètre ajoutera une configuration pour activer la récupération des journaux d'événements depuis tous les conteneurs (voir `Option 1` ci-dessous).
* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` : monter le dossier que nous avons créé pour garder les pointeurs de tous les logs des conteneurs afin d'assurer que nous ne les perdrons pas.
* `-v /opt/datadog-agent/conf.d:/conf.d:ro` : monter le dossier de configuration que nous avons déjà crée dans le conteneur

### Activer la Collection de Journal d'Événements

#### Option 1 : Récupérer les journaux d'événements des conteneurs sans employer des intégrations

L'utilisation de `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` lors de l'exécution de l'Agent Datadog conteneurisé récupérera les journaux de tous vos conteneurs sans filtrage par image ou étiquette de conteneur.
Vous pouvez également ajouter ce qui suit à la fin de `docker.d/conf.yaml` dans le répertoire `conf.d` de votre Agent pour atteindre le même objectif :

```yaml
logs:
    - type: docker
      service: docker
```

*n.b.* : Les pipe-lines d'intégration et des processeurs ne seront pas installés automatiquement car le tag de source n'est pas réglé.

#### Option 2: Utiliser l'intégration

Maintenant que l'Agent est prêt à collecter les journaux d'événements, vous devez définir les conteneurs que vous souhaitez surveiller.
Pour commencer à récupérer des journaux d'événements pour un conteneur donné filtré soit par image, soit pas étiquette de conteneur, vous devez mettre à jour la section de journal d'événements dans une intégration ou un fichier .yaml personnalisé. La découverte automatique n'est pas encore disponible pour la configuration de la collecte des journaux d'événements.

Lors du filtrage sur l'image du conteneur, le nom exact de l'image du conteneur ainsi que les noms abrégés sont pris en charge.
Supposons que vous ayez un conteneur qui exécute `library/httpd:latest` et un autre qui exécute `yourusername/httpd:v2`, le filtrage sur `image: httpd` récupérerait les journaux des deux.

Ajouter un nouveau fichier yaml dans le dossier `conf.d` (normalement `/opt/datadog-agent/conf.d` dans l'hôte si vous avez suivi les instructions ci-dessus) avec les paramètres suivants :

```yaml
init_config:
instances:

##Log section

logs:
   - type: docker
     image: my_container_image_short_name    #or label: mycontainerlabel
     service: my_application_name
     source: myintegration #tells Datadog what integration it is
```

Pour encore plus d'exemples des fichiers de configuration ou des capacités d'Agent (tel que le filtrage, la rédaction, des lignes multiples, ...) lisez davantage les [fonctionnalités avancées de la collection des journaux d'événements][7].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/#getting-started-with-the-agent
[2]: /logs/#custom-log-collection
[3]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[4]: https://github.com/DataDog/docker-dd-agent#enabling-integrations
[5]: /agent/autodiscovery/
[6]: https://hub.docker.com/r/datadog/agent/tags/
[7]: /logs/#filter-logs
