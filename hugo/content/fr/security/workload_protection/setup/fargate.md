---
aliases:
- /fr/security/workload_protection/guide/ebpf-free-agent
description: Activez Workload Protection sur AWS Fargate ECS et EKS.
disable_toc: false
title: Configuration de Workload Protection sur AWS Fargate
---
Utilisez les instructions suivantes pour activer Workload Protection.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Prérequis {#prerequisites}

- L'intégration AWS Datadog est installée et configurée pour vos comptes AWS
- Accès à la console de gestion AWS
- Charges de travail AWS Fargate ECS ou EKS

## Images {#images}

Sur AWS Fargate, Workload Protection ne peut pas utiliser eBPF car Fargate ne fournit pas d'accès au noyau du host. Le Datadog Agent seul ne peut pas tracer vos conteneurs d'application dans cet environnement. En plus de l'Agent, nous utilisons l'image `cws-instrumentation` pour instrumenter votre charge de travail avec ptrace et collecter les événements de sécurité au moment de l'exécution.

- `cws-instrumentation-init` : `public.ecr.aws/datadog/cws-instrumentation:latest`
- `datadog-agent` : `public.ecr.aws/datadog/agent:latest`

## Installation {#installation}

{{< tabs >}}
{{% tab "Amazon ECS" %}}

### Console AWS {#aws-console}

1. Connectez-vous à la [console de gestion AWS][11].
2. Accédez à la section ECS.
3. Dans le menu de gauche, sélectionnez **Task Definitions**, puis sélectionnez **Create new Task Definition with JSON**. Sinon, choisissez une définition de tâche Fargate existante.
4. Pour créer une définition de tâche, utilisez le [Datadog ECS task patcher][12] afin de patcher automatiquement une définition de tâche existante. Sinon, créez manuellement la définition JSON ou utilisez la [méthode AWS CLI](#aws-cli).
5. Cliquez sur **Create** pour créer la définition de tâche.

### AWS CLI {#aws-cli}

1. Téléchargez [datadog-agent-cws-ecs-fargate.json][7].
{{< code-block lang="json" filename="datadog-agent-cws-ecs-fargate.json" collapsible="true" >}}
{
    "family": "<YOUR_TASK_NAME>",
    "cpu": "256",
    "memory": "512",
    "networkMode": "awsvpc",
    "pidMode": "task",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "cws-instrumentation-init",
            "image": "public.ecr.aws/datadog/cws-instrumentation:latest",
            "essential": false,
            "user": "0",
            "command": [
                "/cws-instrumentation",
                "setup",
                "--cws-volume-mount",
                "/cws-instrumentation-volume"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": false
                }
            ]
        },
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            "essential": true,
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "datadoghq.com"
                },
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED",
                    "value": "true"
                }
            ],
            "healthCheck": {
                "command": [
                    "CMD-SHELL",
                    "/probe.sh"
                ],
                "interval": 30,
                "timeout": 5,
                "retries": 2,
                "startPeriod": 60
            }
        },
        {
            "name": "<YOUR_APP_NAME>",
            "image": "<YOUR_APP_IMAGE>",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--",
                "<ENTRYPOINT>"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": true
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_PTRACE"
                    ]
                }
            },
            "dependsOn": [
                {
                    "containerName": "datadog-agent",
                    "condition": "HEALTHY"
                },
                {
                    "containerName": "cws-instrumentation-init",
                    "condition": "SUCCESS"
                }
            ]
        }
    ],
    "volumes": [
        {
            "name": "cws-instrumentation-volume"
        }
    ]
}
{{< /code-block >}}

2. Mettez à jour les éléments suivants dans le fichier JSON :
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

   Vous pouvez utiliser la commande suivante pour trouver le point d'entrée de votre charge de travail :

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

   ou

    

```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

   **Remarque** : La variable d'environnement `ECS_FARGATE` est déjà définie sur « true ».

3. Ajoutez vos autres conteneurs d'application à la définition de tâche. Pour en savoir plus sur la collecte de métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][8].
4. Exécutez la commande suivante pour enregistrer la définition de tâche ECS :

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

### Activez Vulnerability Management {#enable-vulnerability-management}

1. Dans Datadog, accédez à [Cloud Security > Setup > Cloud Integrations > AWS][9].
2. Activez Vulnerability Management en déployant le [Datadog Agentless scanner][10] sur vos comptes AWS hébergeant votre Amazon ECR.

[6]: /fr/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /fr/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /fr/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /fr/security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation
[11]: https://aws.amazon.com/console
[12]: https://github.com/DataDog/datadog-agent-ecs-task-patcher


{{% /tab %}}

{{% tab "Amazon EKS" %}}

Pour collecter des données à partir de vos pods AWS Fargate, vous devez exécuter l'Agent en tant que sidecar de votre pod d'application et configurer des règles de contrôle d'accès basé sur les rôles (RBAC).

<div class="alert alert-info">Si l'Agent est exécuté en tant que sidecar, il ne peut communiquer qu'avec les conteneurs situés sur le même pod. Exécutez un Agent pour chaque pod que vous souhaitez surveiller.</div>

### Configurez les règles RBAC {#set-up-rbac-rules}

Utilisez l'instruction de déploiement [Agent RBAC][6] suivante avant de déployer l'Agent en tant que sidecar.

### Déployez l'Agent en tant que sidecar {#deploy-the-agent-as-a-sidecar}

Le manifeste suivant représente la configuration minimale requise pour déployer votre application avec le Datadog Agent en tant que sidecar avec Workload Protection activé :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: public.ecr.aws/datadog/cws-instrumentation:latest
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "<YOUR_APP_NAME>"
       image: "<YOUR_APP_IMAGE>"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "<ENTRYPOINT>"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: public.ecr.aws/datadog/agent:latest
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
         - name: DD_EKS_FARGATE
           value: "true"
         - name: DD_CLUSTER_NAME
           value: "<CLUSTER_NAME>"
         - name: DD_KUBERNETES_KUBELET_NODENAME
           valueFrom:
             fieldRef:
               apiVersion: v1
               fieldPath: spec.nodeName
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```

[6]: /fr/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

## Vérifiez que l'Agent envoie des événements à Workload Protection {#verify-that-the-agent-is-sending-events-to-workload-protection}

### Vérifiez l'événement ruleset_loaded {#check-the-ruleset-loaded-event}

Lorsque vous activez Workload Protection sur AWS Fargate ECS ou EKS, l'Agent envoie un événement d'agent à Datadog pour confirmer que l'ensemble de règles par défaut a été déployé avec succès. Pour afficher l'événement d'agent, accédez à la page [Agent Events][11] dans Datadog et recherchez `@agent.rule_id:ruleset_loaded`. À droite de la requête, sélectionnez {{< ui >}}All events{{< /ui >}} au lieu de {{< ui >}}Security events{{< /ui >}} ; sinon, les événements `ruleset_loaded` sont filtrés.

### Déclenchez un signal de sécurité {#trigger-a-security-signal}
Vous pouvez également vérifier que l'Agent envoie des événements à Workload Protection en déclenchant manuellement un signal de sécurité AWS Fargate.

Dans la définition de tâche, remplacez le conteneur « workload » par ce qui suit :

{{< code-block lang="json" collapsible="true" >}}
            "name": "cws-signal-test",
            "image": "ubuntu:latest",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--verbose",
                "--",
                "/usr/bin/bash",
                "-c",
                "apt update;apt install -y curl; while true; do curl https://google.com; sleep 5; done"
            ],
{{< /code-block >}}

[11]: https://app.datadoghq.com/security/agent-events