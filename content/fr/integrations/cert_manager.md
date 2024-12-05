---
assets:
  dashboards:
    Cert-Manager Overview Dashboard: assets/dashboards/certmanager_overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - configuration & deployment
  - containers
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/cert_manager/README.md
display_name: cert-manager
draft: false
git_integration_title: cert_manager
guid: c9bdaf11-fe15-4892-ae30-47c5124144e5
integration_id: cert-manager
integration_title: cert-manager
integration_version: 2.2.0
is_public: true
custom_kind: integration
maintainer: ara.pulido@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cert_manager.
metric_to_check: cert_manager.prometheus.health
name: cert_manager
public_title: Intégration Datadog/cert-manager
short_description: Surveillez toutes vos métriques cert-manager avec Datadog.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check recueille des métriques à partir de [cert-manager][1].

![Dashboard de présentation de cert-manager][2]

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

#### Agent v7.26.0/v6.26.0 ou ultérieur

Pour utiliser une intégration provenant du référentiel `integrations-extra` avec l'Agent Docker, nous vous recommandons de générer l'Agent avec l'intégration installée. Utilisez le Dockerfile suivant pour créer une version mise à jour de l'Agent comprenant l'intégration `cert_manager` issue de `integrations-extras` :

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-cert_manager==<VERSION_INTÉGRATION>
```

#### Versions antérieures de l'Agent

Pour installer le check cert_manager sur votre host :

1. Installez le [kit de développement][4].
2. Clonez le dépôt `integrations-extras` :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le package `cert_manager`, exécutez :

   ```shell
   ddev -e release build cert_manager
   ```

5. [Téléchargez le manifeste de l'Agent pour installer l'Agent Datadog en tant que DaemonSet][5].
6. Créez deux `PersistentVolumeClaim`, un pour le code des checks et l'autre pour la configuration.
7. Ajoutez-les en tant que volumes au modèle de pod de l'Agent, puis utilisez-les pour vos checks et votre configuration :

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

8. Déployez l'Agent Datadog sur votre cluster Kubernetes :

   ```shell
   kubectl apply -f agent.yaml
   ```

9. Copiez le fichier d'artefact de l'intégration (.whl) sur vos nœuds Kubernetes ou importez-le sur une URL publique.

10. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```shell
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- agent integration install -w <PATH_OF_CERT_MANAGER_ARTIFACT_>/<CERT_MANAGER_ARTIFACT_NAME>.whl
    ```

11. Exécutez les commandes suivantes pour copier les checks et la configuration sur les PVC correspondants :

    ```shell
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Redémarrez les pods de l'Agent Datadog.

### Configuration

1. Modifiez le fichier `cert_manager.d/conf.yaml` dans le dossier `/confd` que vous avez ajouté au pod de l'Agent pour commencer à recueillir vos données de performance cert_manager. Consultez le [fichier d'exemple cert_manager.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `cert_manager` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cert_manager" >}}


### Événements

cert_manager n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "cert_manager" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://github.com/jetstack/cert-manager
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cert_manager/images/overview_dashboard.png
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile
[6]: https://github.com/DataDog/integrations-extras/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/cert_manager/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/