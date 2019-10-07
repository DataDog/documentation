---
title: DogStatsD sur un socket de domaine Unix
kind: documentation
description: Documentation relative à l'utilisation de DogStatsD sur un socket de domaine Unix
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
Depuis la version 6.0, lorsqu'il fonctionne sur un système Linux, l'Agent Datadog est capable d'ingérer des métriques via un socket de domaine Unix (UDS) en alternative à UDP.

Si UDP fonctionne très bien sur `localhost`, sa configuration peut toutefois poser problème dans les environnements conteneurisés. Les sockets de domaine Unix vous permettent d'établir facilement une connexion via un fichier de socket, quel que soit l'IP du conteneur de l'Agent Datadog. Ils offrent également les avantages suivants :

* Le contournement de la pile réseau améliore drastiquement les performances en cas de trafic élevé
* Contrairement à UDP qui n'intègre aucune solution de traitement des erreurs, UDS permet à l'Agent de détecter les paquets perdus et les erreurs de connexion. Il peut également fonctionner en mode non bloquant.
* DogStatsD est en mesure de détecter le conteneur à l'origine des métriques et d'appliquer le tag correspondant

## Fonctionnement

Au lieu d'utiliser un couple `IP:port` pour établir les connexions, les sockets de domaine Unix utilisent un fichier de socket générique. Une fois la connexion ouverte, les données sont transmises dans le même [format de datagramme][1] qu'UDP.

Lorsque l'Agent redémarre, le socket existant est supprimé et remplacé par un nouveau socket. Les bibliothèques client détectent cette modification et se connectent automatiquement au nouveau socket.

**Remarque :** de par sa nature, le trafic UDS est local au host, ce qui signifie que l'Agent Datadog doit fonctionner sur chaque host depuis lequel vous envoyez des métriques.

## Implémentation

### Agent

Modifiez votre fichier `datadog.yaml` afin de définir l'option `dogstatsd_socket` sur le chemin où DogStatsD doit créer son socket d'écoute :

```yaml
dogstatsd_socket: /var/run/datadog/dsd.socket
```

Ensuite, [redémarrez votre Agent][2]. Vous pouvez également définir le chemin du socket via la variable d'environnement `DD_DOGSTATSD_SOCKET`.

### Client

#### Prise en charge native dans les bibliothèques client

Les bibliothèques client DogStatsD suivantes prennent en charge le trafic UDS de manière native :

| Langage | Bibliothèque                            |
|----------|------------------------------------|
| Golang   | [DataDog/datadog-go][3]            |
| Java     | [DataDog/java-dogstatsd-client][4] |
| Python   | [DataDog/datadogpy][5]             |
| Ruby     | [DataDog/dogstatsd-ruby][6]        |

Reportez-vous à la documentation de la bibliothèque pour savoir comment activer le trafic UDS.

**Remarque :** tout comme avec UDP, il est fortement conseillé d'activer la mise en mémoire tampon du côté client pour améliorer les performances en cas de trafic élevé. Reportez-vous à la documentation de votre bibliothèque client pour connaître la marche à suivre.

#### Utiliser netcat

Pour envoyer des métriques à partir de scripts shell, ou pour vérifier que DogStatsD effectue son écoute sur le socket, vous pouvez utiliser `netcat`. La plupart des implémentations de `netcat` (par ex. `netcat-openbsd` sur Debian ou `nmap-ncat` sur RHEL) prennent en charge le trafic de socket Unix via le flag `-U` :

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

#### Utiliser socat en tant que proxy

Si une application ou une bibliothèque client que vous utilisez ne prend pas en charge le trafic UDS, vous pouvez lancer `socat` pour effectuer l'écoute sur le port UDP `8125` et faire passer par un proxy les requêtes envoyées vers le socket :

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

### Accéder au socket sur un ensemble de conteneurs

Dans un environnement conteneurisé, les conteneurs du client doivent pouvoir accéder au fichier du socket. Pour cela, Datadog conseille de monter un répertoire host des deux côtés (en lecture seule dans les conteneurs de votre client, et en lecture/écriture dans le conteneur de l'Agent).

Monter le dossier parent à la place du socket directement permet de maintenir la communication avec le socket après le redémarrage de DogStatsD.

#### Docker: bind mount

* Démarrez le conteneur de l'Agent avec `-v /var/run/datadog:/var/run/datadog`
* Démarrez vos conteneurs avec `-v /var/run/datadog:/var/run/datadog:ro`

#### Kubernetes : `hostPath` volume

Montez le dossier dans votre conteneur `datadog-agent` :

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

Exposez le même dossier dans les conteneurs de votre client :

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true                  # voir remarque ci-dessous
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

**Remarque** : supprimez `readOnly: true` si les conteneurs de votre client doivent disposer d'un accès en écriture sur le socket.

## Utiliser la détection de l'origine pour le tagging de conteneur

La détection de l'origine permet à DogStatsD de détecter la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises via UDP reçoivent les mêmes tags de conteneur que les métriques Autodiscovery. **Remarque :** les tags `container_id`, `container_name` et `pod_name` ne sont pas ajoutés pour éviter de créer trop de contextes de métrique custom.

Pour utiliser la détection de l'origine, activez l'option `dogstatsd_origin_detection` dans votre fichier `datadog.yaml` ou définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION=true`, puis [redémarrez votre Agent][2].

Lorsqu'il fonctionne dans un conteneur, DogStatsD doit être exécuté dans l'espace de nommage PID du host pour assurer la bonne détection de l'origine. Vous pouvez activer cette option via le flag `--pid=host` de Docker. **Remarque** : cette option est prise en charge par ECS avec le paramètre `"pidMode": "host"` dans la définition de tâche du conteneur. Elle n'est pas prise en charge dans Fargate. Pour en savoir plus, consultez la [documentation AWS][7].

## Méthode d'implémentation dans une bibliothèque client

Le protocole UDS étant très semblable à UDP, son implémentation dans vos bibliothèques existantes est particulièrement simple. La marche à suivre et une checklist de vérification sont disponibles sur [la page wiki de datadog-agent][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/data_types
[2]: /fr/agent/guide/agent-commands
[3]: https://github.com/DataDog/datadog-go
[4]: https://github.com/DataDog/java-dogstatsd-client
[5]: https://github.com/DataDog/datadogpy
[6]: https://github.com/DataDog/dogstatsd-ruby
[7]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[8]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support