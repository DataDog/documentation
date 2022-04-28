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
- https://github.com/DataDog/integrations-core/blob/master/containerd/README.md
display_name: Containerd
draft: false
git_integration_title: containerd
guid: 5cdc0363-a0df-469b-8346-2da4ab84128c
integration_id: containerd
integration_title: Containerd
integration_version: ''
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
- windows
---



## Présentation

Ce check surveille le runtime du conteneur Containerd.

## Configuration

### Installation

Containerd est un check de base de l'[Agent Datadog][1]. Vous devez configurer Containerd dans les fichiers `datadog.yaml` et `containerd.d/conf.yaml`.

Dans `datadog.yaml`, configurez votre `cri_socket_path` pour que l'Agent puisse interroger Containerd. Dans `containerd.d/conf.yaml`, configurez les paramètres d'instance du check (tel que `filters`) pour les événements.

#### Installation sur des conteneurs

Si vous utilisez l'Agent dans un conteneur et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le socket Containerd, l'intégration Containerd est automatiquement activée avec la configuration par défaut.

Par exemple, pour installer l'intégration sur Kubernetes, modifiez votre DaemonSet de façon à monter le socket Containerd du nœud host sur le conteneur de l'Agent et définissez la variable d'environnement `DD_CRI_SOCKET_PATH` sur le chemin de montage du DaemonSet :

{{< tabs >}}
{{% tab "Conteneur Linux" %}}

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
{{% tab "Conteneur Windows" %}}

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

1. Modifiez le fichier `containerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Containerd. Consultez le [fichier d'exemple containerd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `containerd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "containerd" >}}


Cette intégration fonctionne sous Linux et Windows. Toutefois, certaines métriques sont uniquement disponibles pour un seul système d'exploitation. Consultez le fichier `metadata.csv` pour découvrir la liste des métriques qui varient selon le système d'exploitation.

### Événements

Le check Containerd peut recueillir des événements. Utilisez `filters` pour sélectionner les événements pertinents. Consultez le [fichier d'exemple containerd.d/conf.yaml][2] pour obtenir plus de détails.

### Checks de service
{{< get-service-checks-from-git "containerd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent