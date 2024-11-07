---
app_id: containerd
app_uuid: 206cf95f-1d2a-4ad5-b027-0de15431833b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: containerd.cpu.user
      metadata_path: metadata.csv
      prefix: containerd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10082
    source_type_name: Containerd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/containerd/README.md
display_on_public_website: true
draft: false
git_integration_title: containerd
integration_id: containerd
integration_title: Containerd
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: containerd
public_title: Containerd
short_description: Surveillez toutes vos métriques Containerd avec Datadog.
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Surveillez toutes vos métriques Containerd avec Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Containerd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check surveille le runtime du conteneur Containerd.

## Formule et utilisation

### Liste des infrastructures

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

### Dépannage de la solution Browser

1. Modifiez le fichier `containerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Containerd. Consultez le [fichier d'exemple containerd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `containerd` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "containerd" >}}


Cette intégration fonctionne sous Linux et Windows. Toutefois, certaines métriques sont uniquement disponibles pour un seul système d'exploitation. Consultez le fichier `metadata.csv` pour découvrir la liste des métriques qui varient selon le système d'exploitation.

### Aide

Le check Containerd peut recueillir des événements. Utilisez `filters` pour sélectionner les événements pertinents. Consultez le [fichier d'exemple containerd.d/conf.yaml][2] pour obtenir plus de détails.

### Aide
{{< get-service-checks-from-git "containerd" >}}


## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent