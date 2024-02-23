---
aliases:
- /fr/agent/vector_aggregation/
- /fr/integrations/observability_pipelines/integrate_vector_with_datadog/
- /fr/observability_pipelines/integrate_vector_with_datadog/
- /fr/observability_pipelines/integrations/integrate_vector_with_datadog/
- /fr/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/production_deployment_overview/
  tag: Documentation
  text: Conception et principes de déploiement en production du worker de pipelines
    d'observabilité
- link: https://dtdg.co/d22op
  tag: Centre d'apprentissage
  text: Traitement en local sécurisé à l'aide de pipelines d'observabilité
kind: Documentation
title: Configurer des pipelines d'observabilité dans Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les pipelines d'observabilité ne sont pas disponibles sur le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Présentation

Le [worker de pipelines d'observabilité][1] peut collecter et traiter les logs et les métriques de n'importe quelle source et les acheminer vers n'importe quelle destination. Datadog vous permet de concevoir et de gérer tous vos déploiements de worker de pipelines d'observabilité de façon évolutive.

Ce guide explique comment déployer le worker dans votre cluster d'outils communs et configurer l'Agent Datadog pour qu'il envoie les logs et les métriques au worker.

{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="Diagramme de deux clusters de charge de travail envoyant leurs données via l'agrégateur de pipelines d'observabilité." >}}

## Hypothèses
* Vous utilisez déjà Datadog et voulez utiliser des pipelines d'observabilité.
* Vous bénéficiez d'un accès administrateur aux clusters dans lesquels le worker de pipelines d'observabilité va être déployé, ainsi qu'aux charges de travail qui vont être agrégées.
* Vous disposez dans votre environnement d'un cluster d'outils communs ou de sécurité auquel tous les autres clusters sont connectés.

## Prérequis
Avant de procéder à l'installation, assurez-vous que vous disposez des éléments suivants :

* Une [clé d'API Datadog][2] valide.
* Un ID de pipeline.

Vous pouvez générer ces deux éléments dans [Observability Pipelines][3].

### Exigences propres au fournisseur
{{< tabs >}}
{{% tab "Docker" %}}
Assurez-vous que votre machine est configurée pour exécuter Docker.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Pour exécuter le worker sur vos nœuds Kubernetes, vous devez disposer au minimum de deux nœuds avec un processeur et 512 Mo de mémoire RAM disponibles. Datadog vous conseille de créer un pool de nœuds distinct pour les workers, ce qui correspond également à la configuration conseillée pour les déploiements en production.

* Le [pilote EBS CSI][1] est requis. Pour savoir s'il est installé, exécutez la commande suivante et recherchez `ebs-csi-controller` dans la liste :

  ```shell
  kubectl get pods -n kube-system
  ```

* Une `StorageClass` est requise pour que les workers provisionnent les disques EBS adéquats. Pour savoir si elle est déjà installée, exécutez la commande suivante et recherchez `io2` dans la liste :

  ```shell
  kubectl get storageclass
  ```

  Si `io2` ne figure pas dans la liste, téléchargez [le fichier YAML StorageClass][2] et exécutez la commande `kubectl apply` pour l'appliquer.

* Le contrôleur [AWS Load Balancer Controller][3] est requis. Pour savoir s'il est installé, exécutez la commande suivante et recherchez `aws-load-balancer-controller` dans la liste :

  ```shell
  helm list -A
  ```
* Datadog vous conseille d'utiliser la version 1.16 ou supérieure d'Amazon EKS.

Consultez la section [Meilleures pratiques pour l'architecture de l'agrégateur OPW][4] pour connaître les exigences au niveau production.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /fr/observability_pipelines/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Pour exécuter le worker sur vos nœuds Kubernetes, vous devez disposer au minimum de deux nœuds avec un processeur et 512 Mo de mémoire RAM disponibles. Datadog vous conseille de créer un pool de nœuds distinct pour les workers, ce qui correspond également à la configuration conseillée pour les déploiements en production. 

Consultez la section [Meilleures pratiques pour l'architecture de l'agrégateur OPW][1] pour connaître les exigences au niveau production.

[1]: /fr/observability_pipelines/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Pour exécuter le worker sur vos nœuds Kubernetes, vous devez disposer au minimum de deux nœuds avec un processeur et 512 Mo de mémoire RAM disponibles. Datadog vous conseille de créer un pool de nœuds distinct pour les workers, ce qui correspond également à la configuration conseillée pour les déploiements en production.

Consultez la section [Meilleures pratiques pour l'architecture de l'agrégateur OPW][1] pour connaître les exigences au niveau production.

[1]: /fr/observability_pipelines/architecture/
{{% /tab %}}
{{% tab "Linux avec APT" %}}
Il n'y a aucune exigence propre au fournisseur pour les distributions Linux utilisant APT.
{{% /tab %}}
{{% tab "Linux avec RPM" %}}
Il n'y a aucune exigence propre au fournisseur pour les distributions Linux utilisant RPM.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Pour exécuter le worker dans votre compte AWS, vous devez bénéficier d'un accès administrateur à ce dernier. Recueillez les informations suivantes pour exécuter les instances du worker :
* L'ID du VPC dans lequel s'exécuteront vos instances.
* Les ID des sous-réseaux dans lesquels s'exécuteront vos instances.
* La région AWS dans laquelle se trouve votre VPC.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Les installations CloudFormation ne prennent en charge que la configuration à distance.</div>
<div class="alert alert-danger">Les installations CloudFormation ne doivent pas être utilisées pour les charges de travail de production.</div>

Pour exécuter le worker dans votre compte AWS, vous devez bénéficier d'un accès administrateur à ce dernier. Recueillez les informations suivantes pour exécuter les instances du worker :
* L'ID du VPC dans lequel s'exécuteront vos instances.
* Les ID des sous-réseaux dans lesquels s'exécuteront vos instances.
* La région AWS dans laquelle se trouve votre VPC.
{{% /tab %}}
{{< /tabs >}}

## Installer le worker de pipelines d'observabilité

{{< tabs >}}
{{% tab "Docker" %}}

L'image Docker du worker de pipelines d'observabilité est disponible sur Docker Hub [ici][1].

1. Téléchargez le [fichier d'exemple de configuration de pipeline][2].

2. Exécutez la commande suivante pour démarrer le worker de pipelines d'observabilité avec Docker :
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
    Remplacez `<API_KEY>` par votre clé d'API Datadog, `<PIPELINE_ID>` par votre ID de configuration de pipeline d'observabilité, et `<SITE>` par {{< region-param key="dd_site" code="true" >}}. `./pipeline.yaml` doit correspondre au chemin relatif ou absolu du fichier de configuration que vous avez téléchargé à l'étape 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Téléchargez le [chart Helm][1] pour AWS EKS.

2. Dans le chart Helm, remplacez les valeurs `datadog.apiKey` et `datadog.pipelineId` par celles correspondant à votre pipeline, et utilisez {{< region-param key="dd_site" code="true" >}} pour la valeur `site`. Installez-le ensuite dans votre cluster avec les commandes suivantes :

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Téléchargez le [chart Helm][1] pour Azure AKS.

2. Dans le chart Helm, remplacez les valeurs `datadog.apiKey` et `datadog.pipelineId` par celles correspondant à votre pipeline, et utilisez {{< region-param key="dd_site" code="true" >}} pour la valeur `site`. Installez-le ensuite dans votre cluster avec les commandes suivantes :

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f azure_aks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Téléchargez le [chart Helm][1] pour Google GKE.

2. Dans le chart Helm, remplacez les valeurs `datadog.apiKey` et `datadog.pipelineId` par celles correspondant à votre pipeline, et utilisez {{< region-param key="dd_site" code="true" >}} pour la valeur `site`. Installez-le ensuite dans votre cluster avec les commandes suivantes :

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f google_gke.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/google_gke.yaml
{{% /tab %}}
{{% tab "Linux avec APT" %}}
1. Exécutez les commandes suivantes pour configurer APT de sorte que les téléchargements se fassent via le protocole HTTPS :

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Exécutez les commandes suivantes pour configurer le référentiel `deb` de Datadog sur votre système et créer un keyring d'archive Datadog :

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Exécutez les commandes suivantes pour mettre à jour votre référentiel `apt` local et installer le worker :

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Ajoutez vos clés et le site ({{< region-param key="dd_site" code="true" >}}) aux variables d'environnement du worker :

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. Téléchargez le [fichier d'exemple de configuration][1] vers `/etc/observability-pipelines-worker/pipeline.yaml` sur le host.

6. Démarrez le worker :
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Linux avec RPM" %}}
1. Exécutez les commandes suivantes pour configurer le référentiel `rpm` de Datadog sur votre système :

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **Remarque :** si vous exécutez RHEL 8.1 ou CentOS 8.1, utilisez `repo_gpgcheck=0` au lieu de `repo_gpgcheck=1` dans la configuration ci-dessus.

2. Mettez à jour vos packages et installez le worker :

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Ajoutez vos clés et le site ({{< region-param key="dd_site" code="true" >}}) aux variables d'environnement du worker :

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. Téléchargez le [fichier d'exemple de configuration][1] vers `/etc/observability-pipelines-worker/pipeline.yaml` sur le host.

5. Démarrez le worker :
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Configurez le module du worker dans votre environnement Terraform existant en utilisant cet exemple de configuration. Remplacez les valeurs de `vpc-id`, `subnet-ids` et `region` par celles correspondant à votre déploiement AWS. Remplacez les valeurs de `datadog-api-key` et `pipeline-id` par celles correspondant à votre pipeline.

```
module "opw" {
    source     = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{ID VPC}"
    subnet-ids = ["{ID SOUS-RÉSEAU 1}", "{ID SOUS-RÉSEAU 2}"]
    region     = "{RÉGION}"

    datadog-api-key = "{CLÉ API DATADOG}"
    pipeline-id = "{ID PIPELINE OBSERVABILITÉ}"
    pipeline-config = <<EOT
## SOURCES : les sources de données à partir desquelles le worker de pipelines
## d'observabilité collecte les données.
## Dans le cas d'une utilisation avec Datadog, les données seront reçues de l'Agent
## Datadog.
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## L'Agent Datadog encode de manière native ses tags sous la forme d'une liste
  ## de valeurs séparées par des virgules stockées dans la chaîne `.ddtags`. Pour
  ## utiliser et filtrer ces tags, vous devez parser cette chaîne pour générer un
  ## ensemble de données plus structuré.
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## L'attribut `.status` ajouté par l'Agent Datadog doit être supprimé, sinon
  ## vos logs risquent d'être mal classés à l'admission.
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## Cet espace est réservé à vos propres étapes de remappage (ou autres
  ## transformations).
  ## Les tags y sont déjà configurés. Datadog conseille d'appliquer ces tags.
  ## Ils indiquent quelles données ont été transférées au pipeline d'observabilité
  ## et lesquelles doivent encore l'être.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## Avant d'envoyer les données à l'admission des logs, vous devez réencoder
  ## les tags dans le format attendu, comme si c'était l'Agent qui les envoyait
  ## directement.
  logs_finish_ddtags:
    type: remap
    inputs:
      - LOGS_YOUR_STEPS
    source: |
      .ddtags = encode_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  metrics_add_dd_tags:
    type: remap
    inputs:
      - datadog_agent.metrics
    source: |
      .tags.sender = "observability_pipelines_worker"
      .tags.opw_aggregator = get_hostname!()

## Cette configuration de buffer est scindée comme suit, pour un total de 288 Go,
## comme provisionné automatiquement par le module Terraform :
## - 240 Go pour les logs
## - 48 Go pour les métriques
##
## Cela devrait convenir à la grande majorité des déploiements de worker de
## pipelines d'observabilité et aucun ajustement ne devrait être nécessaire.
## Si vous apportez des modifications, veillez à mettre à jour le paramètre
## `ebs-drive-size-gb`.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - logs_finish_ddtags
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
       type: disk
       max_size: 257698037760
  datadog_metrics:
    type: datadog_metrics
    inputs:
      - metrics_add_dd_tags
    default_api_key: "$${DD_API_KEY}"
    buffer:
      type: disk
      max_size: 51539607552
EOT
}
```
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Les installations CloudFormation ne doivent pas être utilisées pour les charges de travail de production.</div>

Pour installer le worker dans votre compte AWS, utilisez le modèle CloudFormation pour créer une stack :

  1. Téléchargez [le modèle CloudFormation][1] pour le worker.

  2. Dans la **console CloudFormation**, cliquez sur **Create stack** et sélectionnez l'option **With new resources (standard)**.

  3. Assurez-vous que l'option **Template is ready** est sélectionnée, puis sélectionnez **Upload a template file**. Cliquez sur **Choose file** et ajoutez le fichier du modèle CloudFormation téléchargé précédemment. Cliquez sur **Next**.

  4. Saisissez un nom pour la stack dans **Specify stack details**.

  5. Renseignez les paramètres du modèle CloudFormation. Certains d'entre eux nécessitent une attention particulière :

      * Pour `APIKey` et `PipelineID`, indiquez la clé et l'ID recueillis précédemment dans la rubrique Prérequis.

      * Pour `VPCID` et `SubnetIDs`, indiquez les sous-réseaux et le VPC choisis précédemment.

      * Tous les autres paramètres sont définis sur des valeurs par défaut adaptées à un déploiement de worker, mais vous pouvez les modifier selon vos besoins.

  6. Cliquez sur **Next**.

  7. Vérifiez les paramètres et assurez-vous qu'ils sont corrects. Cochez les cases des autorisations nécessaires pour IAM, puis cliquez sur **Submit** pour créer la stack.

À ce stade, CloudFormation gère l'installation ; les instances du worker se lancent, téléchargent les logiciels nécessaires et s'exécutent automatiquement.

[1]: /resources/yaml/observability_pipelines/cloudformation/datadog.yaml
{{% /tab %}}
{{< /tabs >}}

### Équilibrage de charge

{{< tabs >}}
{{% tab "Docker" %}}
La configuration en vue de la mise en production n'est pas abordée dans les instructions Docker. Reportez-vous plutôt aux normes de votre entreprise en matière d'équilibrage de charge dans les environnements conteneurisés. Si vous effectuez des tests sur votre machine locale, il n'est pas nécessaire de configurer un équilibreur de charge.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Utilisez les équilibreurs de charge mis à votre disposition par votre fournisseur de cloud. Ils s'ajustent en fonction des événements de mise à l'échelle automatique pour lesquels l'installation Helm par défaut est configurée. Les équilibreurs de charge sont internes et ne sont donc accessibles qu'à l'intérieur de votre réseau.

Utilisez l'URL d'équilibreur de charge fournie par Helm lors de la configuration de l'Agent Datadog.

Des équilibreurs de charge réseau provisionnés par le contrôleur [AWS Load Balancer Controller][1] sont utilisés.

Consultez la rubrique [Planification et dimensionnement des capacités][2] pour obtenir des recommandations quant à l'équilibreur de charge lors du dimensionnement du worker.
#### Équilibrage de charge entre zones de disponibilité
La configuration Helm fournie tente de simplifier l'équilibrage de charge, mais vous devez prendre en compte les éventuelles implications financières du trafic entre zones de disponibilité. Dans la mesure du possible, les exemples tentent d'éviter d'engendrer des situations dans lesquelles plusieurs sauts entre zones de disponibilité peuvent se produire.

Les exemples de configuration n'activent pas la fonctionnalité d'équilibrage de charge entre zones de disponibilité offerte par ce contrôleur. Pour l'activer, ajoutez l'annotation suivante au bloc `service` :

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

Consultez la documentation du contrôleur [AWS Load Balancer Controller][3] pour en savoir plus.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /fr/observability_pipelines/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
Utilisez les équilibreurs de charge mis à votre disposition par votre fournisseur de cloud. Ils s'ajustent en fonction des événements de mise à l'échelle automatique pour lesquels l'installation Helm par défaut est configurée. Les équilibreurs de charge sont internes et ne sont donc accessibles qu'à l'intérieur de votre réseau.

Utilisez l'URL d'équilibreur de charge fournie par Helm lors de la configuration de l'Agent Datadog.

Consultez la rubrique [Planification et dimensionnement des capacités][1] pour obtenir des recommandations quant à l'équilibreur de charge lors du dimensionnement du worker.

#### Équilibrage de charge entre zones de disponibilité
La configuration Helm fournie tente de simplifier l'équilibrage de charge, mais vous devez prendre en compte les éventuelles implications financières du trafic entre zones de disponibilité. Dans la mesure du possible, les exemples tentent d'éviter d'engendrer des situations dans lesquelles plusieurs sauts entre zones de disponibilité peuvent se produire.

[1]: /fr/observability_pipelines/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
Utilisez les équilibreurs de charge mis à votre disposition par votre fournisseur de cloud. Ils s'ajustent en fonction des événements de mise à l'échelle automatique pour lesquels l'installation Helm par défaut est configurée. Les équilibreurs de charge sont internes et ne sont donc accessibles qu'à l'intérieur de votre réseau.

Utilisez l'URL d'équilibreur de charge fournie par Helm lors de la configuration de l'Agent Datadog.

Consultez la rubrique [Planification et dimensionnement des capacités][1] pour obtenir des recommandations quant à l'équilibreur de charge lors du dimensionnement du worker.

#### Équilibrage de charge entre zones de disponibilité
La configuration Helm fournie tente de simplifier l'équilibrage de charge, mais vous devez prendre en compte les éventuelles implications financières du trafic entre zones de disponibilité. Dans la mesure du possible, les exemples tentent d'éviter d'engendrer des situations dans lesquelles plusieurs sauts entre zones de disponibilité peuvent se produire.

L'accès global est activé par défaut dans la mesure où cela est probablement nécessaire pour une utilisation dans un cluster d'outils partagés.

[1]: /fr/observability_pipelines/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Linux avec APT" %}}
L'équilibrage de charge n'est pas pris en charge par défaut en raison de la nature de l'installation (une seule machine). Il vous faudra provisionner vos propres équilibreurs de charge en suivant les normes de votre entreprise.
{{% /tab %}}
{{% tab "Linux avec RPM" %}}
L'équilibrage de charge n'est pas pris en charge par défaut en raison de la nature de l'installation (une seule machine). Il vous faudra provisionner vos propres équilibreurs de charge en suivant les normes de votre entreprise.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Un équilibreur de charge réseau est provisionné par le module Terraform ; il est configuré pour pointer vers les instances. Son adresse DNS est renvoyée dans la sortie `lb-dns` dans Terraform.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Les installations CloudFormation ne doivent pas être utilisées pour les charges de travail de production.</div>

Un équilibreur de charge réseau est provisionné par le modèle CloudFormation ; il est configuré pour pointer vers le groupe de mise à l'échelle automatique. Son adresse DNS est renvoyée dans la sortie `LoadBalancerDNS` de CloudFormation.
{{% /tab %}}
{{< /tabs >}}

### Mise en mémoire tampon
Les pipelines d'observabilité proposent plusieurs stratégies de mise en mémoire tampon qui vous permettent d'augmenter la résilience de votre cluster aux erreurs en aval. Les exemples de configuration fournis utilisent des buffers disque, dont les capacités sont prévues pour environ 10 minutes de données à 10 Mbit/s/cœur pour les déploiements de pipelines d'observabilité. Cela laisse généralement suffisamment de temps pour que les problèmes transitoires se résolvent d'eux-mêmes, ou pour que les intervenants décident de ce qu'ils souhaitent faire des données d'observabilité.

{{< tabs >}}
{{% tab "Docker" %}}
Par défaut, le répertoire de données du worker de pipelines d'observabilité est défini sur `/var/lib/observability-pipelines-worker`. Assurez-vous qu'une capacité de stockage suffisante est allouée au point de montage du conteneur sur la machine du host.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Pour AWS, Datadog conseille d'utiliser des disques EBS `io2`. Il est également possible d'utiliser des disques `gp3`.
{{% /tab %}}
{{% tab "Azure AKS" %}}
Pour Azure AKS, Datadog conseille d'utiliser les disques `default` (également appelés `managed-csi`).
{{% /tab %}}
{{% tab "Google GKE" %}}
Pour Google GKE, Datadog conseille d'utiliser la classe de disque `premium-rwo`, car elle repose sur des SSD. La classe `standard-rwo`, qui repose sur des disques durs mécaniques, risque de ne pas offrir une vitesse d'écriture suffisamment élevée pour garantir l'efficacité des buffers.
{{% /tab %}}
{{% tab "Linux avec APT" %}}
Par défaut, le répertoire de données du worker de pipelines d'observabilité est défini sur `/var/lib/observability-pipelines-worker`. Si vous utilisez l'exemple de configuration, assurez-vous qu'un espace d'au moins 288 Go est disponible pour la mise en mémoire tampon.

Lorsque cela est possible, il est conseillé de monter un SSD dédié à cet emplacement.
{{% /tab %}}
{{% tab "Linux avec RPM" %}}
Par défaut, le répertoire de données du worker de pipelines d'observabilité est défini sur `/var/lib/observability-pipelines-worker`. Si vous utilisez l'exemple de configuration, assurez-vous qu'un espace d'au moins 288 Go est disponible pour la mise en mémoire tampon.

Lorsque cela est possible, il est conseillé de monter un SSD dédié à cet emplacement.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Par défaut, un disque EBS de 288 Go est alloué à chaque instance, et l'exemple de configuration ci-dessus utilise cet espace pour la mise en mémoire tampon.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Le cycle de vie des disques EBS créés par ce modèle CloudFormation est lié à l'instance avec laquelle ils sont créés. <strong>Par conséquent, si une instance est fermée, par exemple par le groupe de mise à l'échelle automatique, cela entraîne une perte de données.</strong> C'est pourquoi les installations CloudFormation ne doivent pas être utilisées pour les charges de travail de production.</div>

Par défaut, un disque EBS de 288 Go est alloué à chaque instance ; il est monté automatiquement et formaté à l'initialisation de celle-ci.
{{% /tab %}}
{{< /tabs >}}

## Connecter l'Agent Datadog au worker de pipelines d'observabilité
Pour envoyer les logs et les métriques de l'Agent Datadog au worker de pipelines d'observabilité, mettez à jour la configuration de l'Agent comme suit :

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8282"

```

`OPW_HOST` correspond à l'adresse IP de l'équilibreur de charge ou de la machine configurée précédemment. Pour les installations Docker à un seul host, il s'agit de l'adresse IP du host sous-jacent. Pour les installations Kubernetes, vous pouvez la récupérer en exécutant la commande suivante et en copiant la valeur de `EXTERNAL-IP` :

```shell
kubectl get svc opw-observability-pipelines-worker
```

Pour les installations Terraform, la sortie `lb-dns` fournit la valeur requise. Pour les installations CloudFormation, l'URL à utiliser est fournie dans la sortie `LoadBalancerDNS`.

À ce stade, vos données d'observabilité devraient être transmises au worker et prêtes à être traitées. La rubrique suivante présente les étapes de traitement incluses par défaut ainsi que les options supplémentaires qui s'offrent à vous.

## Utilisation des données
L'exemple de configuration fourni intègre des exemples d'étape de configuration qui exploitent les outils des pipelines d'observabilité et garantit que les données sont envoyées à Datadog dans le format approprié.

### Traitement des logs
L'exemple de configuration des pipelines d'observabilité prévoit les opérations suivantes :
- Collecte des logs envoyés au worker de pipelines d'observabilité par l'Agent Datadog.
- Application de tags aux logs traités par le worker de pipelines d'observabilité. Cela permet de déterminer quel trafic doit encore être transmis au worker à mesure que vous mettez à jour vos clusters. Ces tags vous montrent également comment les logs sont acheminés via l'équilibreur de charge, en cas de déséquilibres.
- Correction du statut des logs traités par le worker. En raison de la façon dont l'Agent Datadog collecte les logs à partir des conteneurs, l'attribut `.status` fourni ne reflète pas correctement le véritable niveau du message. Il convient donc de le supprimer pour éviter tout problème au niveau des règles de parsing dans le backend, où sont reçus les logs envoyés par le worker.
- Acheminement des logs par transmission multiple des données aux endpoints d'ingestion des métriques et des logs de Datadog.

Les étapes suivantes constituent deux composants importants de l'exemple de configuration :
- `logs_parse_ddtags` : parse les tags stockés dans une chaîne pour générer un ensemble de données structuré.
- `logs_finish_ddtags` : réencode les tags de sorte qu'ils soient dans le format qu'utiliserait l'Agent Datadog pour leur envoi.

En interne, l'Agent Datadog représente les tags des logs au format CSV dans une seule et même chaîne. Pour pouvoir manipuler efficacement ces tags, il convient de les parser, de les modifier puis de les réencoder avant leur envoi à l'endpoint d'ingestion. Ces étapes sont conçues pour effectuer automatiquement ces actions pour vous. Toute modification du pipeline, en particulier au niveau de la manipulation des tags, doit être apportée entre ces deux étapes.

### Traitement des métriques
Le pipeline des métriques fourni ne nécessite pas d'étapes de parsing et de réencodage supplémentaires. À l'instar du pipeline des logs, il applique des tags aux métriques entrantes pour la prise en compte du trafic. Cette cardinalité supplémentaire peut avoir un impact financier pour les métriques personnalisées.

À ce stade, votre environnement est configuré pour les pipelines d'observabilité et les données leur sont transmises. Il est probable que vous deviez adapter la configuration à vos besoins spécifiques, mais les outils fournis ici vous offrent un bon point de départ.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create