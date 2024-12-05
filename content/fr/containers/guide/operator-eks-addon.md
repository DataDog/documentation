---
aliases:
- /fr/agent/guide/operator-eks-addon
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Datadog et Kubernetes
title: Installer l'Agent Datadog sur Amazon EKS avec l'Operator Datadog
---

Vous pouvez installer l'Agent Datadog sur un cluster Amazon EKS. Pour ce faire, installez l'[Operator Datadog](/containers/datadog_operator) en tant que [module complémentaire Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) et appliquez le manifeste `DatadogAgent`.

Les Agents installés avec l'Operator en tant que module complémentaire recueillent uniquement les données des pods exécutés sur des instances EC2. Pour les pods exécutés sur AWS Fargate, reportez-vous à la [documentation d'Amazon EKS relative à AWS Fargate][10].

L'installation en tant que module complémentaire ne se fait pas tout à fait de la même façon qu'une [installation classique via Helm][4] :
* Lors de l'installation de l'Operator, les images doivent uniquement être récupérées à partir du référentiel EKS. Aucune modification n'est possible par l'utilisateur.
* Les valeurs du chart Helm de l'Operator, qui peuvent être remplacées, doivent figurer dans un [fichier schéma][3].

Ces restrictions sont nécessaires pour rendre l'Operator conforme aux politiques d'EKS relatives aux modules complémentaires, pour permettre à EKS d'assurer la sécurité de l'installation, et pour désactiver les fonctions qui ne sont pas encore prises en charge dans l'environnement des modules complémentaires.

## Prérequis

* Vous devez posséder un abonnement au produit [Datadog Operator][1].
* kubectl doit être installé.
* Si vous utilisez l'interface de ligne de commande pour configurer le module complémentaire, vous aurez besoin d'[AWS CLI](https://aws.amazon.com/cli/)

## Installer l'Operator

{{< tabs >}}
{{% tab "Console" %}}

* Accédez au cluster EKS dans la console AWS.
* Cliquez sur l'onglet add-on et sélectionnez *Get more add-ons*.
* Trouvez le module complémentaire *Datadog Operator*. Suivez ensuite les instructions pour procéder à son installation.

{{% /tab %}}
{{% tab "Interface de ligne de commande" %}}

Pour installer l'Operator en tant que module, exécutez :
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <RÉGION_AWS> --cluster-name <NOM_CLUSTER>
  ```

Le processus d'installation est asynchrone. Pour vérifier le statut de l'installation, exécutez :
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <RÉGION_AWS> --cluster-name <NOM_CLUSTER>
  ```
{{% /tab %}}
{{< /tabs >}}

Pour vérifier que l'installation s'est correctement déroulée, utilisez la console AWS Management, `eksctl` ou l'interface de ligne de commande AWS pour vérifier qu'un pod `datadog-operator` est en cours d'exécution.

## Configuration de l'Agent

Une fois l'Operator installé en tant que module complémentaire, vous pouvez passer à la configuration de l'Agent Datadog.

Suivez les instructions pour configurer l'Agent Datadog en utilisant la ressource personnalisée `DatadogAgent`.

1. Passez à l'espace de nommage de l'installation de l'Operator, c'est-à-dire `datadog-agent` par défaut.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. Créez un secret Kubernetes avec vos [clés d'API et d'application Datadog][5]: :
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` par vos [clés d'API et d'application Datadog][5].


3. Créez un fichier `datadog-agent.yaml` avec les spécifications de votre configuration de déploiement de `DatadogAgent`. L'Operator Datadog utilise les paramètres par défaut des images de l'Agent et de l'Agent de cluster en les récupérant à partir d'un registre public.

   Si vous souhaitez récupérer les images à partir d'un registre EKS privé, vous pouvez ajouter `global.registry`. La configuration suivante permet d'activer les métriques, les logs et APM :
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com/datadog
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
   Cette configuration de l'instance de l'Agent récupère l'image de l'Agent Datadog à partir d'un référentiel ECR hébergé sur AWS Marketplace, qui contient également l'image de l'Operator Datadog en tant que module complémentaire Amazon EKS. Si vous avez besoin d'options supplémentaires, modifiez l'entrée 'global.registry' dans le manifeste ci-dessus.

   Pour découvrir toutes les options de configuration, consultez les [spécifications de configuration de l'Operator][6].

   **Remarque :** si l'accès à IMDS v1 est bloqué sur le nœud, l'Agent ne pourra pas résoudre le nom du cluster et certaines fonctionnalités (comme l'[Orchestrator Explorer][6]) ne fonctionneront pas. Par conséquent, Datadog vous conseille d'ajouter `spec.global.ClusterName` dans le manifeste `DatadogAgent`. Reportez-vous à [ce commentaire][8] qui explique comment configurer l'Agent pour qu'il reçoive les métadonnées avec IMDS v2.

4. Déployez l'Agent Datadog :
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Désinstaller l'Operator

Si vous souhaitez désinstaller l'Agent et l'Operator, commencez par supprimer la ressource personnalisée `DatadogAgent` :

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

Vérifiez que toutes les ressources de l'Agent ont été supprimées et continuez la désinstallation du module complémentaire :

{{< tabs >}}
{{% tab "Console" %}}

* Accédez au cluster EKS dans la console AWS.
* Cliquez sur l'onglet add-on et sélectionnez le module complémentaire *Datadog Operator*.
* Cliquez sur **Remove** et confirmez.

{{% /tab %}}
{{% tab "Interface de ligne de commande" %}}

Pour supprimer le module, exécutez :
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <RÉGION_AWS> --cluster-name <NOM_CLUSTER>
  ```

{{% /tab %}}
{{< /tabs >}}

 **Remarque :** si vous désinstallez le module complémentaire de l'Operator avant de supprimer la ressource personnalisée `DatadogAgent`, les Agents continuent de s'exécuter sur le cluster. La suppression de l'espace de nommage échoue car `DatadogAgent` ne peut pas être finalisé si aucun Operator n'est exécuté. Consultez ce [ticket][9] Github pour contourner le problème.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /fr/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/fr/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/4896a45f586f74de1da2e985f98988f0181afc36/pkg/config/config_template.yaml#L407-L416
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /fr/integrations/eks_fargate/#setup