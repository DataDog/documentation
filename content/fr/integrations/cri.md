---
app_id: cri
app_uuid: 81805522-0f55-45a4-95f6-23dd9ea46361
assets:
  dashboards:
    cri: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cri.cpu.usage
      metadata_path: metadata.csv
      prefix: cri.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10043
    source_type_name: CRI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cri/README.md
display_on_public_website: true
draft: false
git_integration_title: cri
integration_id: cri
integration_title: CRI
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cri
public_title: CRI
short_description: Surveillez toutes vos métriques CRI avec Datadog.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Surveillez toutes vos métriques CRI avec Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check surveille une interface de runtime de conteneur (Container Runtime Interface ou CRI).

## Formule et utilisation

### Liste des infrastructures

CRI est un [check de base de l'Agent Datadog][1] qui doit être configuré dans `datadog.yaml` avec `cri.d/conf.yaml`.

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

### Dépannage de la solution Browser

1. Modifiez le fichier `cri.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance CRI. Consultez le [fichier d'exemple cri.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

Lancez la [sous-commande status][3] de l'Agent et cherchez `cri` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "cri" >}}


### Aide

CRI n'inclut aucun check de service.

### Aide

CRI n'inclut aucun événement.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[5]: https://docs.datadoghq.com/fr/help/