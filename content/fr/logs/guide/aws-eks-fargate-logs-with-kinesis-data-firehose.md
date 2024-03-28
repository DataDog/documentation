---
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: Documentation
  text: Processeurs
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: Documentation
  text: Logging Fargate
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: Documentation
  text: Profil AWS Fargate
kind: guide
title: Envoyer des logs AWS EKS Fargate avec Kinesis Data Firehose
---

## Présentation

AWS Fargate dans EKS permet de bénéficier dʼune expérience entièrement gérée pour lʼexécution des workloads Kubernetes. Kinesis Data Firehose peut être utilisé avec le routeur de logs Fluent Bit dʼEKS pour recueillir des logs dans Datadog. Ce guide permet de comparer le transfert de logs via Kinesis Data Firehose avec les logs CloudWatch, et fournit un exemple dʼapplication Fargate dʼEKS pour envoyer des logs à Datadog via Kinesis Data Firehose.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Diagramme du flux de logs décrivant un cluster EKS Fargate envoyant des logs de conteneurs via le routeur de logs Fluent Bit à Kinesis Data Firehose et un compartiment de sauvegarde S3 dans AWS, puis à Datadog" responsive="true">}}


### Kinesis Data Firehose et la transfert de logs CloudWatch

Voici les principales différences entre lʼutilisation du transfert de logs via Kinesis Data Firehose et CloudWatch.

- **Métadonnées et tags** : les métadonnées, comme lʼespace de nommage et lʼID de conteneur Kubernetes, sont accessibles sous forme dʼattributs structurés lors de lʼenvoi de logs avec Kinesis Data Firehose.

- **Coûts dʼAWS** : les coûts dʼAWS peuvent varier pour des cas dʼutilisation individuels, mais lʼingestion Kinesis Data Firehose est généralement moins onéreuse quʼune ingestion similaire avec Cloudwatch Log.

## Prérequis
1. Les outils de ligne de commande suivants : [`kubectl`][6], [`aws`][7].
2. Un cluster EKS avec un [profil Fargate][1] et le rôle dʼexécution de pod Fargate. Dans ce guide, le cluster est nommé `fargate-cluster`, avec un profil Fargate nommé `fargate-profile`, appliqué à lʼespace de nommage `fargate-namespace`. Si vous ne possédez pas ces ressources, référez-vous à [Démarrer avec Amazon EKS][8] pour créer le cluster et à [Commencer à utiliser AWS Fargate avec Amazon EKS][9] pour créer le profil Fargate et le rôle dʼexécution de pod.


## Implémentation

Les étapes suivantes décrivent le processus permettant dʼenvoyer des logs depuis un exemple dʼapplication déployé sur un cluster EKS via Fluent Bit et un flux de diffusion Kinesis Data Firehose à Datadog. Pour obtenir une cohésion optimale avec les tags standards Kubernetes dans Datadog, suivez les instructions incluses pour remapper les attributs sélectionnés en clés de tags

1. [Créez un flux de diffusion Kinesis Data Firehose](#creer-un-flux-de-diffusion-kinesis) qui transmet les logs à Datadog, ainsi qu'une sauvegarde S3 pour tout échec de diffusion des logs.
2. [Configurer Fluent Bit pour Firehose sur EKS Fargate](#configurer-fluent-bit-pour-firehose-sur-un-cluster-eks-fargate).
3. [Déployer un exemple dʼapplication](#déployer-un-exemple-d-application).
4. [Appliquer des processeurs de remappage](#remapper-des-attributs-pour-la-correlation-de-logs) pour la corrélation à lʼaide des tags Kubernetes et du tag `container_id`.

### Créer un flux de diffusion Kinesis

Référez-vous au guide [Envoyer des logs de services AWS avec la destination Datadog pour Kinesis Firehose][4] pour configurer un flux de diffusion Kinesis Firehose.
**Remarque** : attribuez la valeur `Direct PUT` à la **Source**.

### Configurer Fluent Bit pour Firehose sur un cluster EKS Fargate

1. Créer lʼespace de nommage `aws-observability`.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Créez la ConfigMap Kubernetes suivante pour Fluent Bit en tant que `aws-logging-configmap.yaml`. Remplacez le nom de votre flux de diffusion.

{{< code-block lang="yaml" filename="" disable_copy="false" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-logging
  namespace: aws-observability
data:
  filters.conf: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Merge_Log           On
        Buffer_Size         0
        Kube_Meta_Cache_TTL 300s

  flb_log_cw: 'true'

  output.conf: |
    [OUTPUT]
        Name kinesis_firehose
        Match kube.*
        region <REGION>
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
{{< /code-block >}}

3. Utilisez `kubectl` pour appliquer le manifeste ConfigMap.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl apply -f aws-logging-configmap.yaml
{{< /code-block >}}

4. Créez une stratégie IAM et joignez-la au rôle dʼexécution de pod pour permettre au routeur de logs exécuté dans AWS Fargate dʼécrire dans Kinesis Data Firehose. Vous pouvez utiliser lʼexemple ci-dessous, en remplaçant lʼARN dans le champ **Resource** par lʼARN de votre flux de diffusion, ainsi quʼen indiquant votre région et votre ID de compte.

{{< code-block lang="json" filename="allow_kinesis_put_permission.json" disable_copy="false" collapsible="false" >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource":
       "arn:aws:firehose:<REGION>:<ACCOUNTID>:deliverystream/<DELIVERY-STREAM-NAME>"
       }
]
}
{{< /code-block >}}

   a. Créez la stratégie.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_kinesis_put_permission.json
{{< /code-block >}}

   b. Récupérez le rôle dʼexécution de pod Fargate et joignez la stratégie IAM.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile \
   --query 'fargateProfile.podExecutionRoleArn' --output text |cut -d '/' -f 2)
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}

### Déployer un exemple dʼapplication

Pour générer des logs et tester le pipeline Kinesis, déployez un exemple de workload sur votre cluster Fargate EKS.

1. Créez un manifeste de déploiement `sample-deployment.yaml`.

{{< code-block lang="yaml" filename="sample-deployment.yaml" disable_copy="false" collapsible="false" >}}
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   name: sample-app
   namespace: fargate-namespace
 spec:
   selector:
     matchLabels:
       app: nginx
   replicas: 1
   template:
     metadata:
       labels:
         app: nginx
     spec:
       containers:
       - name: nginx
         image: nginx
         ports:
         - containerPort: 80
{{< /code-block >}}

 2. Créez lʼespace de nommage `fargate-namespace`.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl create namespace fargate-namespace
 {{< /code-block >}}

 3. Utilisez `kubectl` pour appliquer le manifeste de déploiement.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl apply -f sample-deployment.yaml
 {{< /code-block >}}

### Validation

1. Vérifiez que les pods `sample-app` sont exécutés dans lʼespace de nommage `fargate-namespace`.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl get pods -n fargate-namespace
 {{< /code-block >}}

Résultat attendu :

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 NAME                          READY   STATUS    RESTARTS   AGE
 sample-app-6c8b449b8f-kq2qz   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-nn2w7   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-wzsjj   1/1     Running   0          3m56s
 {{< /code-block >}}

2. Utilisez `kubectl describe pod` pour confirmer que la fonctionnalité de logging de Fargate est activée.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl describe pod <POD-NAME> -n fargate-namespace |grep Logging
 {{< /code-block >}}

Résultat attendu :

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
                    Logging: LoggingEnabled
 Normal  LoggingEnabled   5m   fargate-scheduler  Successfully enabled logging for pod
 {{< /code-block >}}

3. Inspectez les logs de déploiement.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl logs -l app=nginx -n fargate-namespace
 {{< /code-block >}}

Résultat attendu :

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
 /docker-entrypoint.sh: Configuration complete; ready for start up
 2023/01/27 16:53:42 [notice] 1#1: using the "epoll" event method
 2023/01/27 16:53:42 [notice] 1#1: nginx/1.23.3
 2023/01/27 16:53:42 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
 2023/01/27 16:53:42 [notice] 1#1: OS: Linux 4.14.294-220.533.amzn2.x86_64
 2023/01/27 16:53:42 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:65535
 2023/01/27 16:53:42 [notice] 1#1: start worker processes
 ...
 {{< /code-block >}}

4. Vérifiez les logs dans Datadog UI. Sélectionnez `source:aws` pour filtrer les logs de Kinesis Data Firehose.
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_verification.jpg" alt="Vérification des lignes de logs nginx dans le Log Explorer de Datadog" responsive="true">}}

### Remapper des attributs pour la corrélation de logs

Les logs de cette configuration requièrent que des attributs soient remappés pour être totalement cohérents avec les tags Kubernetes standards dans Datadog.
1. Accédez à la page [Pipelines de logs de Datadog][3].
2. Créez un nouveau pipeline avec **Name** `EKS Fargate Log Pipeline` et **Filter** `service:aws source:aws`.
3. Créez quatre [processeurs de remappage][5] pour remapper les attributs suivants en clés de tags :
 | Attribut à remapper | Clé de tag cible |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. Une fois que ce pipeline est créé, les logs émis par lʼexemple dʼapp portent un tag, comme décrit ici, avec les attributs de logs remappés en tags Kubernetes :
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="Vue détaillée dʼun log dans Datadog avec les tags container_id, kube_container_name, kube_namespace et pod_name" responsive="true">}}

## Pour aller plus loin
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream#setup
[5]: /fr/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html