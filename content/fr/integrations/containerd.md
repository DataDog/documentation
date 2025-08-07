---
app_id: containerd
categories:
- incident-teams
- kubernetes
custom_kind: integration
description: Surveillez toutes vos métriques Containerd avec Datadog.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
title: Containerd
---
## Section Overview

Ce check surveille le runtime du conteneur Containerd.

## Configuration

### Installation

Containerd est un contrôle de base [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest). Vous devez configurer Containerd à la fois dans `datadog.yaml` et `containerd.d/conf.yaml`.

Dans `datadog.yaml`, configurez votre `cri_socket_path` pour que l'Agent puisse interroger Containerd. Dans `containerd.d/conf.yaml`, configurez les paramètres d'instance du check (tel que `filters`) pour les événements.

#### Installation sur des conteneurs

Si vous utilisez l'Agent dans un conteneur et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le socket Containerd, l'intégration Containerd est automatiquement activée avec la configuration par défaut.

Par exemple, pour installer l'intégration sur Kubernetes, modifiez votre DaemonSet de façon à monter le socket Containerd du nœud host sur le conteneur de l'Agent et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le chemin de montage du DaemonSet :

{{< tabs >}}

{{% tab "Linux container" %}}

##### Conteneur Linux

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: /var/run/containerd/containerd.sock
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
            - hostPath:
                path: /var/run
              name: var-run
```

**Remarque :** le répertoire `/var/run` doit être monté à partir du host pour que l'intégration s'exécute correctement.

{{% /tab %}}

{{% tab "Windows Container" %}}

##### Conteneur Windows

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: \\\\.\\pipe\\containerd-containerd
          volumes:
            - hostPath:
                path: \\\\.\\pipe\\containerd-containerd
              name: containerdsocket
          volumeMounts:
            - name: containerdsocket
              mountPath: \\\\.\\pipe\\containerd-containerd
```

{{% /tab %}}

{{< /tabs >}}

### Configuration

1. Modifiez le fichier `containerd.d/conf.yaml`, dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à collecter les données de performance de votre Containerd. Voir [sample containerd.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default) pour toutes les options de configuration disponibles.

1. [Redémarrer le Agent](https://docs.datadoghq.com/help/)

### Validation

[Exécutez la sous-commande `status` de Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) et recherchez `containerd` dans la section Checks.

## Données collectées

### Métriques

Containerd recueille des métriques sur l'utilisation des ressources de vos conteneurs.

Les métriques sur le processeur, la mémoire, le bloc E/S ou la table des huge pages sont recueillies par défaut. Vous pouvez également choisir de recueillir des métriques relatives au disque.

| | |
| --- | --- |
| **containerd.cpu.system** <br>(gauge) | Le temps total de l'unité centrale<br>_Affiché en nanosecondes_. |
| **containerd.cpu.throttled.periods** <br>(gauge) | Le temps total d'étranglement du CPU (Linux seulement)<br>_Affiché en nanosecondes_. |
| **containerd.cpu.total** <br>(gauge) | Le temps total de l'unité centrale<br>_Affiché en nanosecondes_. |
| **containerd.cpu.user** <br>(gauge) | Le temps total de l'unité centrale de l'utilisateur<br>_Affiché en nanosecondes_. |
| **containerd.image.pull** <br>(count) | Le nombre de demandes d'extraction d'images<br>_Constitué d'octets_. |
| **containerd.image.size** <br>(gauge) | La taille de l'image du conteneur<br>_Affichée en octets_. |
| **cache.mem.conteneur** <br>(gauge) | La quantité de cache utilisée (Linux uniquement)<br>_Affichée en octets_ |
| **containerd.mem.commit** <br>(gauge) | La mémoire engagée (Windows uniquement)<br>_Constitué d'un octet_. |
| **containerd.mem.commit_peak** <br>(gauge) | Le pic de mémoire engagée (Windows uniquement)<br>_Affiché en octet_. |
| **containerd.mem.current.failcnt** <br>(gauge) | L'échec de l'utilisation (Linux seulement)|
| **containerd.mem.current.limit** <br>(gauge) | La limite de mémoire (Linux uniquement)<br>_Affiché en octet_. |
| **containerd.mem.current.usage** <br>(gauge) | L'utilisation de la mémoire (Linux uniquement)<br>_Affichée en octets_. |
| **containerd.mem.kernel.usage** <br>(gauge) | L'utilisation du noyau (Linux uniquement)<br>_Affiché sous forme d'octet_. |
| **containerd.mem.kernel_tcp.failcnt** <br>(gauge) | Le taux d'échec de kerneltcp (Linux uniquement)|
| **containerd.mem.kernel_tcp.limit** <br>(gauge) | La limite kerneltcp (Linux uniquement)<br>_Affiché en octet_. |
| **containerd.mem.kernel_tcp.max** <br>(gauge) | L'utilisation maximale de kerneltcp (Linux seulement)<br>_Constitué d'octets_. |
| **containerd.mem.kernel_tcp.usage** <br>(gauge) | L'utilisation de kerneltcp (Linux seulement)<br>_Constitué d'un octet_. |
| **containerd.mem.rss** <br>(gauge) | La quantité de rss utilisée (Linux seulement)<br>_Affiché en octet_. |
| **containerd.mem.swap.usage** <br>(gauge) | L'utilisation du swap (Linux seulement)<br>_Constitué d'un octet_. |
| **containerd.mem.working_set** <br>(gauge) | L'utilisation de l'ensemble de travail du conteneur<br>_Constitué d'un octet_. |
| **containerd.proc.open_fds** <br>(gauge) | Le nombre de descripteurs de fichiers ouverts<br>_Shown as file_ (en anglais) |
| **containerd.storage.read** <br>(rate) | Lecture d'octets (Windows uniquement)<br>_Affiché sous forme d'octets_ |
| **containerd.storage.write** <br>(rate) | Écriture d'octets (Windows uniquement)<br>_Affiché sous forme d'octet_. |
| **containerd.uptime** <br>(gauge) | Temps écoulé depuis le démarrage du conteneur<br>_Affiché en seconde_ |

Cette intégration fonctionne sur Linux et Windows, mais certaines mesures dépendent du système d'exploitation. Consultez `metadata.csv` pour obtenir la liste des mesures dépendantes du système d'exploitation.

### Événements

Le contrôle Containerd peut collecter des événements. Utilisez `filters` pour sélectionner les événements pertinents. Voir le [sample containerd.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default) pour plus de détails.

### Checks de service

**containerd.health**

Renvoie `CRITICAL` si le check de l'Agent n'est pas capable de se connecter au socket containerd qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

Etat : ok, critique

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).