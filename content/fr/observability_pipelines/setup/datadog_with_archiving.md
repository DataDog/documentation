---
further_reading:
- link: /observability_pipelines/production_deployment_overview/
  tag: Documentation
  text: Conception et principes de déploiement en production du worker de pipelines
    d'observabilité
- link: https://dtdg.co/d22op
  tag: Centre d'apprentissage
  text: Traitement en local sécurisé à l'aide de pipelines d'observabilité
kind: Documentation
title: Configurer des pipelines d'observabilité pour envoyer des logs dans un format
  réintégrable à Datadog vers Amazon S3 et Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les pipelines d'observabilité ne sont pas disponibles sur le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Présentation

Le [worker de pipelines d'observabilité][1] peut collecter et traiter les logs et les métriques de n'importe quelle source et les acheminer vers n'importe quelle destination. Datadog vous permet de concevoir et de gérer tous vos déploiements de worker de pipelines d'observabilité de façon évolutive.

Ce guide explique comment déployer le worker dans votre cluster d'outils communs et le configurer pour qu'il envoie les logs dans un format réintégrable à Datadog vers un service de stockage dans le cloud à des fins d'archivage.

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
[6]: /fr/observability_pipelines/architecture/

{{% /tab %}}
{{% tab "Linux avec APT" %}}

Il n'y a aucune exigence propre au fournisseur pour les distributions Linux utilisant APT.

{{% /tab %}}
{{% tab "Linux avec RPM" %}}

Il n'y a aucune exigence propre au fournisseur pour les distributions Linux utilisant APT.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

Pour exécuter le worker dans votre compte AWS, vous devez bénéficier d'un accès administrateur à ce dernier et disposer des informations suivantes :

* L'ID du VPC dans lequel s'exécuteront vos instances.
* Les ID des sous-réseaux dans lesquels s'exécuteront vos instances.
* La région AWS dans laquelle se trouve votre VPC.

{{% /tab %}}
{{< /tabs >}}

## Configurer les archives de logs

Lors de l'[installation du worker de pipelines d'observabilité](#installer-le-worker-de-pipelines-d-observabilite), l'exemple de configuration fourni inclut un récepteur pour l'envoi des logs vers Amazon S3 dans un format réintégrable à Datadog. Pour utiliser cette configuration, vous devez créer un compartiment S3 pour vos archives et configurer une stratégie IAM permettant aux workers d'écrire dans ce dernier. Il vous faudra ensuite connecter le compartiment S3 aux archives de logs Datadog.

{{% site-region region="us,us3,us5" %}}
Consultez la [tarification AWS][1] pour connaître les frais de transfert de données entre régions et déterminer l'impact éventuel sur vos frais de stockage dans le cloud.

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

### Créer un compartiment S3 et configurer une stratégie IAM

{{< tabs >}}
{{% tab "Docker" %}}

{{% op-datadog-archives-s3-setup %}}

3. Créez un utilisateur IAM et associez-lui la stratégie ci-dessus. Créez des identifiants d'accès pour cet utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY` et `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "AWS EKS" %}}

{{% op-datadog-archives-s3-setup %}}

3. [Créez un compte de service][1] pour utiliser la stratégie créée ci-dessus.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html

{{% /tab %}}
{{% tab "Linux avec APT" %}}

{{% op-datadog-archives-s3-setup %}}

3. Créez un utilisateur IAM et associez-lui la stratégie ci-dessus. Créez des identifiants d'accès pour cet utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY` et `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "Linux avec RPM" %}}

{{% op-datadog-archives-s3-setup %}}

3. Créez un utilisateur IAM et associez-lui la stratégie ci-dessus. Créez des identifiants d'accès pour cet utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-datadog-archives-s3-setup %}}

3. Associez la stratégie au profil d'instance IAM créé avec Terraform, qui est indiqué dans la sortie `iam-role-name`.

{{% /tab %}}
{{< /tabs >}}

### Connecter le compartiment S3 aux archives de logs Datadog

Vous devez connecter le compartiment S3 créé précédemment aux archives de logs Datadog afin de pouvoir réintégrer ultérieurement les archives.

1. Accédez à la page [Log Forwarding][5] de Datadog.
1. Cliquez sur **+ New Archive**.
1. Saisissez un nom décrivant l'archive.
1. Ajoutez une requête excluant tous les logs traités par les pipelines de logs afin qu'ils ne soient pas intégrés à cette archive. Par exemple, ajoutez la requête `observability_pipelines_read_only_archive`, en supposant que ce tag n'ait pas été ajouté aux logs traités par le pipeline.
1. Sélectionnez **AWS S3**.
1. Sélectionnez le compte AWS dans lequel se trouve votre compartiment.
1. Saisissez le nom du compartiment S3.
1. Si besoin, saisissez un chemin.
1. Vérifiez la déclaration de confirmation.
1. Si besoin, ajoutez des tags et définissez la taille d'analyse maximale pour la réintégration. Consultez la rubrique [Paramètres avancés][6] pour en savoir plus.
1. Cliquez sur **Save**.

Consultez la [documentation relative aux archives de logs][7] pour en savoir plus.

## Installer le worker de pipelines d'observabilité

{{< tabs >}}
{{% tab "Docker" %}}

L'image Docker du worker de pipelines d'observabilité est disponible sur Docker Hub [ici][1].

1. Téléchargez le [fichier d'exemple de configuration de pipeline][2].

2. Exécutez la commande suivante pour démarrer le worker de pipelines d'observabilité avec Docker :

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
      -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
      -e DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME> \
      -e DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    Remplacez les paramètres fictifs suivants par les valeurs appropriées :
    - `<API_KEY>` par votre clé d'API Datadog.
    - `<PIPELINE_ID>` par votre ID de configuration de pipeline d'observabilité.
    - `<SITE>` par {{< region-param key="dd_site" code="true" >}}.
    - `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` par les identifiants AWS créés précédemment.
    - `<AWS_BUCKET_NAME>` par le nom du compartiment S3 utilisé pour le stockage des logs.
    - `<BUCKET_AWS_REGION>` par la [région AWS][3] du service cible.
    - `./pipeline.yaml` doit correspondre au chemin relatif ou absolu du fichier de configuration que vous avez téléchargé à l'étape 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[3]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Téléchargez le [chart Helm][1] pour AWS EKS.

2. Dans le chart Helm, remplacez les paramètres fictifs suivants par les valeurs appropriées :
    - `datadog.apiKey` par votre clé d'API Datadog.
    - `datadog.pipelineId` par votre ID de configuration de pipeline d'observabilité.
    - `site` par {{< region-param key="dd_site" code="true" >}}.
    - `${DD_ARCHIVES_SERVICE_ACCOUNT}` dans `serviceAccount.name` par le nom du compte de service. 
    - `${DD_ARCHIVES_BUCKET}` dans `pipelineConfig.sinks.datadog_archives` par le nom du compartiment S3 utilisé pour le stockage des logs.
    - `${DD_ARCHIVES_SERVICE_ACCOUNT}` dans `pipelineConfig.sinks.datadog_archives` par la [région AWS][2] du service cible.

3. Installez le chart dans votre cluster en exécutant les commandes suivantes :

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

[1]: /resources/yaml/observability_pipelines/archives/aws_eks.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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

4. Ajoutez vos clés et le site ({{< region-param key="dd_site" code="true" >}}) aux variables d'environnement du worker. Remplacez `<AWS_BUCKET_NAME>` par le nom du compartiment S3 utilisé pour le stockage des logs et `<BUCKET_AWS_REGION>` par la [région AWS][2] du service cible.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

5. Téléchargez le [fichier d'exemple de configuration][1] vers `/etc/observability-pipelines-worker/pipeline.yaml` sur le host.

6. Démarrez le worker :
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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

3. Ajoutez vos clés et le site ({{< region-param key="dd_site" code="true" >}}) aux variables d'environnement du worker. Remplacez `<AWS_BUCKET_NAME>` par le nom du compartiment S3 utilisé pour le stockage des logs et `<BUCKET_AWS_REGION>` par la [région AWS][2] du service cible.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

4. Téléchargez le [fichier d'exemple de configuration][1] vers `/etc/observability-pipelines-worker/pipeline.yaml` sur le host.

5. Démarrez le worker :
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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
## Ce récepteur écrit les logs dans un format réintégrable à Datadog dans un
## compartiment S3.
## Remplacez ${COMPARTIMENT_ARCHIVES_DD} par le nom du compartiment S3 utilisé
## pour le stockage de vos logs et ${RÉGION_ARCHIVES_DD} par la région AWS
## du service cible.
datadog_archives:
type: datadog_archives
inputs:
- logs_finish_ddtags
service: aws_s3
bucket: ${COMPARTIMENT_ARCHIVES_DD}
aws_s3:
storage_class: "STANDARD"
region: "${RÉGION_ARCHIVES_DD}"
EOT
}
```
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

{{% tab "Linux avec APT" %}}
En raison de la nature de l'installation (une seule machine), l'équilibrage de charge n'est pas pris en charge par défaut. Vous devez provisionner vos propres équilibreurs de charge en suivant les normes de votre entreprise.
{{% /tab %}}
{{% tab "Linux avec RPM" %}}
En raison de la nature de l'installation (une seule machine), l'équilibrage de charge n'est pas pris en charge par défaut. Vous devez provisionner vos propres équilibreurs de charge en suivant les normes de votre entreprise.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Le module Terraform provisionne un équilibreur de charge réseau configuré pour pointer vers les instances. Son adresse DNS est renvoyée dans la sortie `lb-dns` dans Terraform.
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

Pour les installations Terraform, la sortie `lb-dns` fournit la valeur requise.

À ce stade, vos données d'observabilité devraient être transmises au worker puis envoyées à votre archive S3.

## Réintégrer vos archives

Consultez la rubrique [Réintégration à partir des archives][4] pour savoir comment réintégrer votre archive dans Datadog afin de pouvoir commencer à analyser et étudier ces logs.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /fr/logs/log_configuration/rehydrating/
[5]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[6]: /fr/logs/log_configuration/archives/#advanced-settings
[7]: /fr/logs/log_configuration/archives