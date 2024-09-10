---
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: Documentación
  text: Procesadores
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: Documentación
  text: Gestión de logs en Fargate
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: Documentación
  text: Perfil de AWS Fargate
kind: guía
title: Enviar logs de Amazon EKS Fargate logs con Amazon Data Firehose
---

## Información general

AWS Fargate en EKS proporciona una experiencia totalmente gestionada para la ejecución de cargas de trabajo Kubernetes. Amazon Data Firehose puede utilizarse junto con el enrutador de logs Fluent Bit de EKS para recopilar logs en Datadog. Esta guía proporciona una comparación del reenvío de logs a través de Amazon Data Firehose y de CloudWatch Logs, así como un ejemplo de aplicación de EKS Fargate para el reenvío de logs a Datadog a través de Amazon Data Firehose.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Diagrama del flujo de logs que muestra un clúster Fargate EKS enviando logs de contenedor, a través del enrutador de logs Fluent BIt, a Amazon Data Firehose y a un bucket de copia de seguridad S3 dentro de AWS, y luego a Datadog" responsive="true">}}

### Reenvío de logs de Amazon Data Firehose y CloudWatch

A continuación se indican las principales diferencias entre el uso de Amazon Data Firehose y CloudWatch para el reenvío de logs.

- **Metadatos y etiquetado**: los metadatos, como el espacio de nombres y el ID de contenedor de Kubernetes, son accesibles como atributos estructurados al enviar logs mediante Amazon Data Firehose.

- **Costes de AWS**: los costes de AWS pueden variar según los casos de uso individuales, pero el consumo de Amazon Data Firehose suele ser menos costoso que el consumo comparable de CloudWatch Logs.

## Requisitos
1. Las siguientes herramientas de línea de comandos: [`kubectl`][6], [`aws`][7].
2. Un clúster EKS con un [perfil Fargate][1] y un rol de ejecución de pod Fargate. En esta guía, el clúster se denomina `fargate-cluster` con un perfil Fargate denominado `fargate-profile` aplicado al espacio de nombres `fargate-namespace` . Si aún no dispones de estos recursos, consulta [Empezando con Amazon EKS][8], para crear el clúster ,y [Empezando con AWS Fargate utilizando Amazon EKS][9], para crear el perfil Fargate y el rol de ejecución del pod.

## Configuración

Los siguientes pasos describen el proceso para el envío de logs desde una aplicación de muestra desplegada en un clúster EKS a través de Fluent Bit y un flujo (stream) de entrega de Amazon Data Firehose a Datadog. Para maximizar la coherencia con las etiquetas (tags) estándar de Kubernetes en Datadog, se incluyen instrucciones para reasignar atributos seleccionados a etiquetas claves.

1. [Crea un flujo de entrega de Amazon Data Firehose](#create-an-amazon-data-firehose-delivery-stream) que entregue logs a Datadog, junto con una copia de seguridad de S3 para cualquier entrega fallida de logs.
2. [Configura Fluent Bit para Firehose en EKS Fargate](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster).
3. [Despliega una aplicación de ejemplo](#deploy-a-sample-application).
4. [Aplica procesadores de reasignadores](#remap-attributes-for-log-correlation) para la correlación utilizando etiquetas de Kubernetes y la etiqueta `container_id`.

### Crea un flujo de entrega de Amazon Data Firehose

Consulta la guía [Enviar logs de servicios AWS con Amazon Data Firehose de Datadog como destino][4] para configurar un flujo de entrega de Amazon Data Firehose.
**Nota**: Configura la **Fuente** como `Direct PUT`.

### Configurar Fluent Bit para Firehose en un clúster EKS Fargate

1. Crea el espacio de nombres `aws-observability`.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Crea el siguiente ConfigMap Kubernetes para Fluent Bit como `aws-logging-configmap.yaml`. Sustituye el nombre de tu flujo de entrega.

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
        Name amazon_data_firehose
        Match kube.*
        region <REGION>
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
{{< /code-block >}}

3. Utiliza `kubectl` para aplicar el manifiesto ConfigMap.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl apply -f aws-logging-configmap.yaml
{{< /code-block >}}

4. Crea una política IAM y adjúntala al rol de ejecución del pod para permitir que el enrutador de logs que se ejecuta en AWS Fargate escriba en Amazon Data Firehose. Puedes utilizar el siguiente ejemplo, sustituyendo el ARN en el campo **Resource** (Recurso) por el ARN de tu flujo de entrega y también especificando tu región o tu ID de cuenta.

{{< code-block lang="json" filename="allow_firehose_put_permission.json" disable_copy="false" collapsible="false" >}}
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

   a. Crea la política.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_firehose_put_permission.json
{{< /code-block >}}

   b. Recupera el rol de ejecución del pod Fargate y adjunta la política IAM.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile \
   --query 'fargateProfile.podExecutionRoleArn' --output text |cut -d '/' -f 2)
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}

### Desplegar una aplicación de ejemplo

Para generar logs y probar el flujo de entrega de Amazon Data Firehose, despliega una carga de trabajo de muestra en tu clúster EKS Fargate.

1. Crea un manifiesto de despliegue `sample-deployment.yaml`.

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

 2. Crea el espacio de nombres `fargate-namespace`.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl create namespace fargate-namespace
 {{< /code-block >}}

 3. Utiliza `kubectl` para aplicar el manifiesto del despliegue.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl apply -f sample-deployment.yaml
 {{< /code-block >}}

### Validación

1. Comprueba que los pods `sample-app` se están ejecutando en el espacio de nombres `fargate-namespace`.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl get pods -n fargate-namespace
 {{< /code-block >}}

Resultado esperado:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 NAME                          READY   STATUS    RESTARTS   AGE
 sample-app-6c8b449b8f-kq2qz   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-nn2w7   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-wzsjj   1/1     Running   0          3m56s
 {{< /code-block >}}

2. Utiliza `kubectl describe pod` para confirmar que la función de gestión de logs de Fargate está habilitada.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl describe pod <POD-NAME> -n fargate-namespace |grep Logging
 {{< /code-block >}}

Resultado esperado:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
                    Logging: LoggingEnabled
 Normal  LoggingEnabled   5m   fargate-scheduler  Successfully enabled logging for pod
 {{< /code-block >}}

3. Inspecciona los logs del despliegue.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl logs -l app=nginx -n fargate-namespace
 {{< /code-block >}}

Resultado esperado:

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

4. Comprueba que los logs está en Datadog. En el [Explorador de logs de Datadog][10], busca `@aws.firehose.arn:"<ARN>"`, sustituyendo `<ARN>` por tu ARN de Amazon Data Firehose, para filtrar logs desde Amazon Data Firehose.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_verification.jpg" alt="Verificación de líneas de logs NGINX en el Explorador de logs de Datadog" responsive="true">}}

### Reasignar atributos para la correlación de logs

Los logs de esta configuración requieren la reasignación de algunos atributos para maximizar la coherencia con las etiquetas estándar de Kubernetes en Datadog.
1. Ve a la página [Pipelines de logs de Datadog][3].
2. Crea un nuevo pipeline con el **Nombre** `EKS Fargate Log Pipeline` y el **Filtro** `service:aws source:aws`.
3. Crea cuatro [procesadores de reasignadores][5] para reasignar los siguientes atributos a claves de etiqueta:
 | Atributo a reasignar | Claves de etiqueta de destino |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. Después de crear este pipeline, los logs emitidos por la aplicación de ejemplo se etiquetan como en este ejemplo con los atributos de logs reasignados a etiquetas de Kubernetes:
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="Vista detallada de un log en Datadog con las etiquetas container_id, kube_container_name, kube_namespace, pod_name " responsive="true">}}

## Leer más
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream#setup
[5]: /es/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html
[10]: https://app.datadoghq.com/logs