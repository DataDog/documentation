---
app_id: cri
categories:
- incident-teams
- kubernetes
custom_kind: integration
description: Surveillez toutes vos métriques CRI avec Datadog.
integration_version: 1.0.0
media: []
supported_os:
- linux
title: CRI
---
## Section Overview

Ce check surveille une interface de runtime de conteneur (Container Runtime Interface ou CRI).

## Configuration

### Installation

CRI est un contrôle de base [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest) qui doit être configuré dans `datadog.yaml` avec `cri.d/conf.yaml`.

Dans `datadog.yaml`, configurez votre `cri_socket_path` pour l'Agent afin d'interroger votre CRI actuel (vous pouvez également configurer des délais d'expiration par défaut). Dans `cri.d/conf.yaml`, configurez les réglages d'instance de check tels que `collect_disk` si votre CRI (p. ex., `containerd`) transmet des métriques sur l'utilisation du disque.

**Remarque** : si vous utilisez l'Agent dans un conteneur, définissez la variable d'environnement `DD_CRI_SOCKET_PATH` pour activer automatiquement le check `CRI` avec la configuration par défaut.

#### Installation sur des conteneurs

Si vous utilisez l'Agent dans un conteneur et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le socket CRI, l'intégration `CRI` est automatiquement activée avec la configuration par défaut.

Par exemple, pour installer l'intégration sur Kubernetes, modifiez votre daemonset pour monter le socket CRI du nœud host vers le conteneur de l'Agent et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le mountPath du daemonset :

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
              value: /var/run/crio/crio.sock
          volumeMounts:
            - name: crisocket
              mountPath: /var/run/crio/crio.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/crio/crio.sock
              name: crisocket
            - hostPath:
                path: /var/run
              name: var-run
```

**Remarque :** le répertoire `/var/run` doit être monté à partir du host pour que l'intégration s'exécute correctement.

### Configuration

1. Editez le fichier `cri.d/conf.yaml`, dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à collecter vos données de performance crio. Voir le [sample cri.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default) pour toutes les options de configuration disponibles.

1. [Redémarrer le Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validation

Exécutez la [sous-commande d'état] de Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) et recherchez `cri` dans la section "Checks".

## Données collectées

### Métriques

CRI recueille des données sur l'utilisation des ressources de vos conteneurs fonctionnant via CRI.

Les métriques de CPU et de mémoire sont collectées d'emblée et vous pouvez également collecter certaines métriques de disque si elles sont supportées par votre CRI (CRI-O ne les supporte pas).

| | |
| --- | --- |
| **cri.cpu.usage** <br>(jauge) | Utilisation cumulée de l'unité centrale (somme de tous les cœurs) depuis la création de l'objet<br>_Affichée en nanocœur_. |
| **cri.disk.inodes** <br>(jauge) | Représente les inodes utilisés par les images<br>_Montré comme inode_. |
| **cri.disk.used** <br>(gauge) | Représente les octets utilisés pour les images sur le système de fichiers<br>_Constitué d'octets_. |
| **cri.mem.rss** <br>(jauge) | La quantité de mémoire de l'ensemble de travail en octets <br>_Affichage en octets_. |
| **cri.uptime** <br>(gauge) | Temps écoulé depuis le démarrage du conteneur<br>_Affiché en seconde_ |

### Checks de service

CRI n'inclut aucun check de service.

### Événements

CRI n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).