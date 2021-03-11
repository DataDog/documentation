---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/containerd/README.md'
display_name: Containerd
draft: false
git_integration_title: containerd
guid: 5cdc0363-a0df-469b-8346-2da4ab84128c
integration_id: containerd
integration_title: Containerd
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: containerd.
metric_to_check: containerd.cpu.user
name: containerd
public_title: Intégration Datadog/Containerd
short_description: Surveillez toutes vos métriques Containerd avec Datadog.
support: core
supported_os:
  - linux
---
## Présentation

Ce check surveille le délai de runtime de conteneur de Containerd.

## Configuration

### Installation

Containerd est un check de base de l'Agent 6 et doit donc être configuré dans les fichiers `datadog.yaml` et `containerd.d/conf.yaml`.

Dans `datadog.yaml`, configurez votre `cri_socket_path` pour que l'Agent puisse interroger Containerd. Dans `containerd.d/conf.yaml`, configurez les réglages d'instance du check (tel que `filters`) pour les événements.

#### Installation sur des conteneurs

Si vous utilisez l'Agent dans un conteneur et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le socket Containerd, l'intégration `Containerd` est automatiquement activée avec la configuration par défaut.

Par exemple, pour installer l'intégration sur Kubernetes, modifiez votre daemonset pour monter le socket Containerd du nœud host vers le conteneur de l'Agent et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le mountPath du daemonset :

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

### Configuration

1. Modifiez le fichier `containerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Containerd. Consultez le [fichier d'exemple containerd.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `containerd` dans la section Checks.

## Données collectées

### Métriques

Containerd recueille des métriques sur l'utilisation des ressources de vos conteneurs.

Les métriques sur le processeur, la mémoire, le bloc E/S ou la table des huge pages sont recueillies par défaut. Vous pouvez également choisir de recueillir des métriques relatives au disque.

Consultez [metadata.csv][4] pour découvrir la liste complète des métriques fournies par cette intégration.

### Checks de service

Containerd inclut un check de service `containerd.health` visant à communiquer la santé de la connexion au socket Containerd.

### Événements

Le check Containerd peut recueillir des événements. Utilisez `filters` pour sélectionner les événements pertinents. Consultez le [fichier d'exemple containerd.d/conf.yaml][1] pour obtenir plus de détails.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[2]: https://docs.datadoghq.com/fr/help/
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/containerd/metadata.csv