---
aliases:
- /fr/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: /agent/cluster_agent
  tag: Documentation
  text: Agent de cluster pour Kubernetes
- link: /agent/cluster_agent/clusterchecks
  tag: Documentation
  text: Checks de cluster
title: Network Device Monitoring avec l'Agent de cluster
---

Pour les environnements Kubernetes, l'[Agent de cluster Datadog][1] peut être configuré de façon à utiliser la logique Autodiscovery de la solution Network Device Monitoring (NDM) afin de générer des [checks de cluster][2].

Lorsqu'elle est combinée avec l'Agent de cluster Datadog, la fonction Autodiscovery de l'Agent se révèle particulièrement évolutive. Elle permet de surveiller un grand nombre d'appareils.

## Configuration

### Installation

1. Vérifiez que vous avez installé l'[Agent de cluster Datadog][1].

2. Configurez la fonction Autodiscovery NDM pour l'Agent de cluster Datadog, à l'aide du `helm-chart` Datadog. Pour ce faire, ajoutez le référentiel Helm Datadog :

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. Installez ensuite `datadog-monitoring` et indiquez votre [clé d'API Datadog][3].

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### Configuration

Voici un exemple de fichier `cluster-agent-values.yaml` :

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - chaîne - obligatoire
  ## Définir ce paramètre sur votre clé d'API Datadog avant l'exécution de l'Agent.
  ## Pour en savor plus : https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
  #
  apiKey: <CLÉ_API_DATADOG>

  ## @param clusterName - chaîne - facultatif
  ## Définir un nom de cluster unique pour pouvoir facilement filtrer les hosts et checks de cluster.
  ## Il doit s'agir d'un nom unique, composé de tokens séparés par des points. Un token peut inclure jusqu'à 40 caractères, en respectant les limitations suivantes :
  ## * Le token doit uniquement comporter des lettres minuscules, chiffres et tirets.
  ## * Il doit commencer par une lettre.
  ## * Il doit se terminer par un chiffre ou une lettre.
  ## Contrairement aux règles de GKE, les points sont autorisés :
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - objet - obligatoire
  ## Activer la fonctionnalité de check de cluster sur les cluster-agents ainsi que sur le daemonset.
  ## Pour en savoir plus : https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## La fonction Autodiscovery via les annotations du service Kube est automatiquement activée.
  #
  clusterChecks:
    enabled: true

  ## @param tags  - liste de paires key:value - facultatif
  ## Liste de tags à appliquer à chaque métrique, événement et check de service recueilli par cet Agent.
  ##
  ## Pour en savoir plus sur le tagging : https://docs.datadoghq.com/tagging/
  #
  tags:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - objet - obligatoire
## Il s'agit de l'implémentation de l'Agent de cluster Datadog qui gère les métriques plus efficacement
## pour l'ensemble du cluster, sépare les préoccupations pour améliorer le RBAC
## et met en œuvre l'API de métriques externe pour l'autoscaling des HPA basés sur des métriques Datadog.
## Pour en savoir plus : https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - booléen - obligatoire
  ## Définir ce paramètre sur true pour activer l'Agent de cluster Datadog.
  #
  enabled: true

  ## @param confd - liste d'objets - facultatif
  ## Fournir des configurations de check de cluster supplémentaires.
  ## Chaque clé est convertie en un fichier dans /conf.d.
  ## Pour en savoir plus : https://docs.datadoghq.com/agent/autodiscovery/
  #
  confd:
     # Checks statiques
     http_check.yaml: |-
       cluster_check: true
       instances:
         - name: 'Exemple de check Site1'
           url: http://example.net
         - name: 'Exemple de check Site2'
           url: http://example.net
         - name: 'Exemple de check Site3'
           url: http://example.net
     # Modèle Autodiscovery requis pour que `snmp_listener` crée des configurations d'instance.
     snmp.yaml: |-
      cluster_check: true
      ad_identifiers:
        - snmp
      init_config:
      instances:
        -
          ## @param ip_address - chaîne - facultatif
          ## L'adresse IP de l'appareil à surveiller.
          #
          ip_address: "%%host%%"

          ## @param port - nombre entier - facultatif - valeur par défaut : 161
          ## Le port SNMP par défaut.
          #
          port: "%%port%%"

          ## @param snmp_version - nombre entier - facultatif - valeur par défaut : 2
          ## Si vous utilisez la v1 de SNMP, définissez snmp_version sur 1 (obligatoire).
          ## Si vous utilisez la v3 de SNMP, définissez snmp_version sur 3 (obligatoire).
          #
          snmp_version: "%%extra_version%%"

          ## @param timeout - nombre entier - facultatif - valeur par défaut : 5
          ## Le délai d'expiration en secondes.
          #
          timeout: "%%extra_timeout%%"

          ## @param retries - nombre entier - facultatif - valeur par défaut : 5
          ## Nombre de nouvelles tentatives avant l'échec.
          #
          retries: "%%extra_retries%%"

          ## @param community_string - chaîne - facultatif
          ## Uniquement utile pour les versions 1 et 2 de SNMP.
          #
          community_string: "%%extra_community%%"

          ## @param user - chaîne - facultatif
          ## Nom d'utilisateur à utiliser pour se connecter à vos appareils SNMP.
          #
          user: "%%extra_user%%"

          ## @param authKey - chaîne - facultatif
          ## Clé d'authentification à utiliser avec votre type d'authentification.
          #
          authKey: "%%extra_auth_key%%"

          ## @param authProtocol - chaîne - facultatif
          ## Type d'authentification à utiliser lors de la connexion aux appareils SNMP.
          ## Valeurs autorisées : MD5, SHA, SHA224, SHA256, SHA384 et SHA512.
          ## Lorsque `authKey` est défini, la valeur par défaut de ce paramètre est MD5.
          #
          authProtocol: "%%extra_auth_protocol%%"

          ## @param privKey - chaîne - facultatif
          ## Clé à utiliser avec votre type de confidentialité.
          #
          privKey: "%%extra_priv_key%%"

          ## @param privProtocol - chaîne - facultatif
          ## Type de confidentialité à utiliser lors de la connexion aux appareils SNMP.
          ## Valeurs autorisées : DES, 3DES, AES, AES192, AES256, AES192C et AES256C.
          ## Lorsque `privKey` est défini, la valeur par défaut de ce paramètre est DES.
          #
          privProtocol: "%%extra_priv_protocol%%"

          ## @param context_engine_id - chaîne - facultatif
          ## ID de votre moteur de contexte ; généralement non requis.
          ## (paramètre facultatif pour SNMP v3 uniquement)
          #
          context_engine_id: "%%extra_context_engine_id%%"

          ## @param context_name - chaîne - facultatif
          ## Nom de votre contexte (paramètre facultatif pour SNMP v3 uniquement).
          #
          context_name: "%%extra_context_name%%"

          ## @param tags - liste de paires key:value - facultatif
          ## Liste de tags à appliquer à chaque métrique, événement et check de service généré par cette intégration.
          ##
          ## Pour en savoir plus sur le tagging : https://docs.datadoghq.com/tagging/
          #
          tags:
            # Le sous-réseau Autodiscovery auquel l'appareil appartient.
            # Utilisé par la fonction Autodiscovery de l'Agent pour transmettre le nom du sous-réseau.
            - "autodiscovery_subnet:%%extra_autodiscovery_subnet%%"

            ## @param extra_tags - chaîne - facultatif
            ## Liste de tags (séparés par des virgules) à appliquer à chaque métrique, événement ou check de service généré par cette intégration.
            ## Exemple :
            ## extra_tags: "tag1:val1,tag2:val2"
            #
            extra_tags: "%%extra_tags%%"

            ## @param oid_batch_size - entier - facultatif - valeur par défaut : 60
            ## Le nombre d'OID traités par chaque lot. Si vous augmentez ce nombre, les performances seront améliorées
            ## mais les ressources utilisées augmenteront.
            #
            oid_batch_size: "%%extra_oid_batch_size%%"


  ## @param datadog-cluster.yaml - objet - facultatif
  ## Spécifier le contenu personnalisé pour la configuration de l'Agent de cluster Datadog (datadog-cluster.yaml).
  #
  datadog_cluster_yaml:
    listeners:
      - name: snmp

    # Pour consulter toutes les configurations `snmp_listener` : https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
    snmp_listener:
      workers: 2
      discovery_interval: 10
      configs:
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: cisco_icm
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: public
{{< /code-block >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/organization-settings/api-keys