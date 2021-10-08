---
assets:
  dashboards:
    cri: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cri/README.md'
display_name: CRI
draft: false
git_integration_title: cri
guid: 6eb96c6a-3e2d-4236-9387-fa3b0c455336
integration_id: cri
integration_title: CRI
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cri.
metric_to_check: cri.cpu.usage
name: CRI
public_title: Intégration Datadog/CRI
short_description: Surveillez toutes vos métriques CRI avec Datadog.
support: core
supported_os:
  - linux
---
## Présentation

Ce check surveille une interface de runtime de conteneur (Container Runtime Interface ou CRI).

## Configuration

### Installation

CRI est un check de base de l'Agent 6 et doit donc être configuré dans les fichiers `datadog.yaml` et `cri.d/conf.yaml`.

Dans `datadog.yaml`, vous devez configurer votre `cri_socket_path` pour l'Agent afin d'interroger votre CRI actuel (vous pouvez également configurer des délais d'expiration par défaut). Dans `cri.d/conf.yaml`, vous pouvez configurer les réglages d'instance de check tels que `collect_disk` si votre CRI (p. ex., `containerd`) transmet des métriques sur l'utilisation du disque.

Remarque : si vous utilisez l'Agent dans un conteneur et définissez la variable d'environnement `DD_CRI_SOCKET_PATH`, cela active automatiquement le check `CRI` avec la configuration par défaut.

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

1. Modifiez le fichier `cri.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance CRI. Consultez le [fichier d'exemple cri.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

### Validation

[Lancez la sous-commande `status` de l'Agent][2] et cherchez `cri` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cri" >}}


### Checks de service

CRI n'inclut aucun check de service.

### Événements

CRI n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[4]: https://docs.datadoghq.com/fr/help/