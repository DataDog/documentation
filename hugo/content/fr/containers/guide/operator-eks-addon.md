---
aliases:
- /fr/agent/guide/operator-eks-addon
description: Installez et configurez l'Agent Datadog sur Amazon EKS à l'aide du Datadog
  Operator en tant qu'add-on EKS.
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Datadog et Kubernetes
title: Installer l'Agent Datadog sur Amazon EKS avec l'Operator Datadog
---
<div class="alert alert-info">À partir de la version v0.1.9, le Datadog Operator add-on prend en charge l'injection automatique du sidecar de l'Agent dans les pods planifiés sur des instances Fargate. Consultez <a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">ce guide</a> pour plus de détails.
</div>


Vous pouvez installer l'Agent Datadog sur un cluster Amazon EKS en installant le [Datadog Operator](/containers/datadog_operator)
en tant qu'[Amazon EKS add-on](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) et en appliquant le `DatadogAgent` manifeste.

Les Agents installés à l'aide de l'Operator add-on collectent uniquement les données des pods s'exécutant sur des instances EC2. Pour les pods s'exécutant sur AWS Fargate, suivez la [documentation Amazon EKS sur AWS Fargate][10].

L'installation en tant que module complémentaire ne se fait pas tout à fait de la même façon qu'une [installation classique via Helm][4] :
* Lors de l'installation de l'Opérateur, les images doivent être extraites uniquement du référentiel EKS. Cela ne peut pas être modifié par l'utilisateur.
* Les valeurs du chart Helm de l'Operator, qui peuvent être remplacées, doivent figurer dans un [fichier schéma][3].

Ces restrictions sont nécessaires pour rendre l'Operator conforme aux politiques d'EKS relatives aux modules complémentaires, pour permettre à EKS d'assurer la sécurité de l'installation, et pour désactiver les fonctions qui ne sont pas encore prises en charge dans l'environnement des modules complémentaires.

## Prérequis {#prerequisites}

* Souscription au produit [Datadog Operator][1].
* kubectl installé
* Si vous utilisez l'interface de ligne de commande pour configurer l'add-on, [AWS CLI](https://aws.amazon.com/cli/)

## Installation de l'Operator {#installing-operator}

{{< tabs >}}
{{% tab "Console" %}}

* Accédez au cluster EKS dans la console AWS.
* Accédez à l'onglet des add-ons et sélectionnez *Obtenir plus d'add-ons*.
* Recherchez et sélectionnez *Datadog Operator*. Suivez ensuite les instructions pour terminer l'installation.

{{% /tab %}}
{{% tab "Interface de ligne de commande" %}}

Pour installer l'Operator en tant que module, exécutez :
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

L'installation de l'add-on est asynchrone. Pour vérifier le statut de l'installation, exécutez :
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

Pour vérifier que l'installation a réussi, utilisez la console de gestion AWS, `eksctl`, ou l'interface de ligne de commande AWS pour confirmer qu'un pod `datadog-operator` est en cours d'exécution.

## Configuration de l'Agent {#configuring-the-agent}

Une fois l'Operator installé en tant que module complémentaire, vous pouvez passer à la configuration de l'Agent Datadog.

Suivez les instructions pour configurer l'Agent Datadog en utilisant `DatadogAgent` la ressource personnalisée.

1. Passez à l'espace de noms d'installation de l'Operator, qui est `datadog-agent` par défaut.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. Créez un secret Kubernetes avec vos [clés d'API et d'application Datadog][5] :
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` par vos [clés d'API et d'application Datadog][5].


3. Créez un fichier `datadog-agent.yaml` avec la spécification de votre configuration de déploiement `DatadogAgent`. Le Datadog Operator utilise les paramètres d'image par défaut de l'Agent et du Cluster Agent et les extrait d'un registre public.

   Si vous souhaitez extraire des images d'un registre EKS privé, vous pouvez ajouter `global.registry`. La configuration suivante active les métriques, les journaux et l'APM :
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: <PRIVATE_EKS_REGISTRY_PATH>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     features:
       apm:
         enabled: true
       logCollection:
         enabled: true
   ```
   Cette configuration d'instance d'Agent extrait l'image de l'agent Datadog à partir d'un référentiel ECR hébergé sur AWS Marketplace, qui contient également l'image pour le Datadog Operator Amazon EKS add-on. Si vous avez besoin d'alternatives, modifiez l'entrée 'global.registry' dans le manifeste ci-dessus.

   Pour découvrir toutes les options de configuration, consultez les [spécifications de configuration de l'Operator][6].

   **Remarque :** Si l'accès à IMDS v1 est bloqué sur le nœud, l'Agent ne peut pas résoudre le nom du cluster et certaines fonctionnalités (par exemple, [Orchestrator Explorer][6]) ne fonctionnent pas. Par conséquent, Datadog recommande d'ajouter `spec.global.ClusterName` dans le manifeste `DatadogAgent`. Pour savoir comment configurer l'Agent afin de demander des métadonnées en utilisant IMDS v2, consultez le paramètre `ec2_prefer_imdsv2` dans l'[exemple de fichier de configuration de l'Agent][8].

4. Déployez l'Agent Datadog :
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Désinstallez le Datadog Operator{#uninstall-the-operator}

Si vous souhaitez désinstaller l'Agent et le Datadog Operator, supprimez d'abord la ressource personnalisée `DatadogAgent` :

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

Vérifiez que toutes les ressources de l'Agent ont été supprimées et continuez la désinstallation du module complémentaire :

{{< tabs >}}
{{% tab "Console" %}}

* Accédez au cluster EKS dans la console AWS.
* Accédez à l'onglet des add-ons et sélectionnez l'*Datadog Operator add-on*.
* Cliquez sur **Remove** et confirmez lorsque vous y êtes invité.

{{% /tab %}}
{{% tab "Interface de ligne de commande" %}}

Pour supprimer le module, exécutez :
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **Remarque :** Si vous désinstallez le Datadog Operator add-on avant de supprimer la ressource personnalisée `DatadogAgent`, les agents continuent de s'exécuter sur le cluster. La suppression de l'espace de noms échoue car le `DatadogAgent` ne peut pas être finalisé sans un Datadog Operator en cours d'exécution. Consultez ce [issue][9] sur Github pour une solution de contournement :


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /fr/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/fr/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /fr/integrations/eks_fargate/#setup