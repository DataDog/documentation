---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OPA base dashboard: assets/dashboards/open_policy_agent_overview.json
  logs:
    source: opa
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- security
- containers
- configuration & deployment
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/README.md
display_name: open_policy_agent
draft: false
git_integration_title: open_policy_agent
guid: 73fdfc40-51ea-11eb-ae93-0242ac130002
integration_id: open-policy-agent
integration_title: Open Policy Agent
integration_version: 0.0.1
is_public: true
custom_kind: integration
maintainer: ara.pulido@datadoghq.com
manifest_version: 1.0.0
metric_prefix: open_policy_agent.
metric_to_check: open_policy_agent.policies
name: open_policy_agent
public_title: Open Policy Agent
short_description: Intégration d'OPA
support: contrib
supported_os:
- linux
---



## Présentation

Ce check recueille des métriques à partir d'[Open Policy Agent][1].

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check pour un Agent exécuté sur un cluster Kubernetes. Consultez également la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions.

### Installation

Pour installer le check open_policy_agent sur votre cluster Kubernetes :

1. Installez le [kit de développement][3].
2. Clonez le dépôt `integrations-extras` :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le package `open_policy_agent`, exécutez :

   ```shell
   ddev -e release build open_policy_agent
   ```

5. [Téléchargez le manifeste de l'Agent pour installer l'Agent Datadog en tant que DaemonSet][4].
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
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_OPEN_POLICY_AGENT_ARTIFACT_>/<OPEN_POLICY_AGENT_ARTIFACT_NAME>.whl
    ```

11. Exécutez les commandes suivantes pour copier les checks et la configuration sur les PVC correspondants :

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Redémarrez les pods de l'Agent Datadog.

### Métriques générées par des logs

Le dashboard par défaut inclut des graphiques représentant une métrique portant sur les décisions d'OPA, à savoir `open_policy_agent.decisions`. Cette métrique est créée à partir des « logs de décision » d'OPA. Pour générer cette métrique et l'ajouter à cette section du dashboard, vous devez créer une nouvelle métrique générée par des logs dans Datadog.

Commencez par créer une facette pour le champ `msg` des logs OPA. En effet, OPA génère uniquement des métriques pour les entrées de log de type « log de décision ». Pour ce faire, sélectionnez une entrée de log provenant d'OPA, cliquez sur l'icône de réglages en regard du champ `msg` et sélectionnez « Create facet for @msg » :

![Facette de msg][5]

Créez deux facettes, pour les champs `input.request.kind.kind` et `result.response.allowed`. Ces deux facettes doivent être disponibles dans les entrées de log de type « log de décision ».

![Facette kind][6]
![Facette allowed][7]

Une fois les facettes créées, générez la métrique souhaitée afin de compléter le dashboard. Cliquez sur le menu Logs, puis sur Generate Metrics. Cliquez sur « Add a new metric » et remplissez le formulaire avec les données suivantes :

![Métrique de décision OPA][8]

### Configuration

1. Modifiez le fichier `open_policy_agent/conf.yaml` dans le dossier `/confd` que vous avez ajouté au pod de l'Agent pour commencer à recueillir vos données de performance OPA. Consultez le [fichier d'exemple open_policy_agent/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `open_policy_agent` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "open_policy_agent" >}}


### Événements

open_policy_agent n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "open_policy_agent" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].


[1]: https://www.openpolicyagent.org/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/msg_facet.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/kind_facet.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/allowed_facet.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/metric.png
[9]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/datadog_checks/open_policy_agent/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/open_policy_agent/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/assets/service_checks.json
[14]: https://docs.datadoghq.com/fr/help/