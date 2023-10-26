---
title: Set Up Datadog Archiving with Observability Pipelines
kind: Documentation
further_reading:
  - link: "/observability_pipelines/production_deployment_overview/"
    tag: "Documentation"
    text: "Production deployment design and principles for the Observability Pipelines Worker"
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs and metrics from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring it to send logs to a cloud storage for archiving.

## Assumptions
* You are already using Datadog and want to use Observability Pipelines.
* You have administrative access to the clusters where the Observability Pipelines Worker is going to be deployed, as well as to the workloads that are going to be aggregated.
* You have a common tools or security cluster for your environment to which all other clusters are connected.

## Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key][2].
* A Pipeline ID.

You can generate both of these in [Observability Pipelines][3].

### Provider-specific requirements
{{< tabs >}}
{{% tab "Docker" %}}
Ensure that your machine is configured to run Docker.

The sample configuration you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration,  set up an IAM policy that allows the Workers to write to S3.

* Go into your AWS console and create an S3 bucket to send your archives to.

  * Do not make your bucket publicly readable.
  * For US1, US3, and US5 sites, see [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

* Create a policy with the following permissions:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DatadogUploadLogArchives",
        "Effect": "Allow",
        "Action": ["s3:PutObject"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        ]
      },
      {
        "Sid": "DatadogListLogArchives",
        "Effect": "Allow",
        "Action": ["s3:ListBucket"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME>"
        ]
      }
    ]
  }
  ```

* Edit the bucket name in the policy above to match your configuration.

* Create an IAM user and attach the above policy to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

[1]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "AWS EKS" %}}
The sample EKS configuration that you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, set up an IAM policy that allows the Workers to write to S3.

* Go into your AWS console and create an S3 bucket to send your archives to.

  * Do not make your bucket publicly readable.
  * For US1, US3, and US5 sites, see [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

* Create a policy with the following permissions:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DatadogUploadLogArchives",
        "Effect": "Allow",
        "Action": ["s3:PutObject"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        ]
      },
      {
        "Sid": "DatadogListLogArchives",
        "Effect": "Allow",
        "Action": ["s3:ListBucket"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME>"
        ]
      }
    ]
  }
  ```

* Edit the bucket name in the policy above to match your configuration.

* [Create a service account][2] to use the policy you created above. Replace `${DD_ARCHIVES_SERVICE_ACCOUNT}` in the Helm config with the service account name.

To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

* The [EBS CSI driver][3] is required. To see if it is installed, run the following command and look for `ebs-csi-controller` in the list:

  ```shell
  kubectl get pods -n kube-system
  ```

* A `StorageClass` is required for the Workers to provision the correct EBS drives. To see if it is installed already, run the following command and look for `io2` in the list:

  ```shell
  kubectl get storageclass
  ```

  If `io2` is not present, download [the StorageClass YAML][4] and `kubectl apply` it.

* The [AWS Load Balancer controller][5] is required. To see if it is installed, run the following command and look for `aws-load-balancer-controller` in the list:

  ```shell
  helm list -A
  ```
* Datadog recommends using Amazon EKS >= 1.16.

See [Best Practices for OPW Aggregator Architecture][6] for production-level requirements.

[1]: https://aws.amazon.com/s3/pricing/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[4]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[5]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[6]: /observability_pipelines/architecture/

{{% /tab %}}
{{% tab "APT-based Linux" %}}
The sample configuration that you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, set up an IAM policy that allows the Workers to write to S3.

* Go into your AWS console and create an S3 bucket to send your archives to.

  * Do not make your bucket publicly readable.
  * For US1, US3, and US5 sites, see [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

* Create a policy with the following permissions:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DatadogUploadLogArchives",
        "Effect": "Allow",
        "Action": ["s3:PutObject"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        ]
      },
      {
        "Sid": "DatadogListLogArchives",
        "Effect": "Allow",
        "Action": ["s3:ListBucket"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME>"
        ]
      }
    ]
  }
  ```

* Edit the bucket name in the policy above to match your configuration.

* Create an IAM user and attach the above policy to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

[1]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
The sample configuration that you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, set up an IAM policy that allows the Workers to write to S3.

* Go into your AWS console and create an S3 bucket to send your archives to.

  * Do not make your bucket publicly readable.
  * For US1, US3, and US5 sites, see [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

* Create a policy with the following permissions:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DatadogUploadLogArchives",
        "Effect": "Allow",
        "Action": ["s3:PutObject"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        ]
      },
      {
        "Sid": "DatadogListLogArchives",
        "Effect": "Allow",
        "Action": ["s3:ListBucket"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME>"
        ]
      }
    ]
  }
  ```

* Edit the bucket name in the policy above to match your configuration.

* Create an IAM user and attach the policy above to it. Create access credentials for the IAM user. Save these credentials as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

[1]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
The sample Terraform configuration that you download later includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format. To use this configuration, set up an IAM policy that allows the Workers to write to S3.

* Go into your AWS console and create an S3 bucket to send your archives to.

  * Do not make your bucket publicly readable.
  * For US1, US3, and US5 sites, see [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

* Create a policy with the following permissions:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DatadogUploadLogArchives",
        "Effect": "Allow",
        "Action": ["s3:PutObject"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        ]
      },
      {
        "Sid": "DatadogListLogArchives",
        "Effect": "Allow",
        "Action": ["s3:ListBucket"],
        "Resource": [
          "arn:aws:s3:::<MY_BUCKET_NAME>"
        ]
      }
    ]
  }
  ```

* Edit the bucket name in the policy above to match your configuration.

* Attach the policy to the IAM Instance Profile that is created with Terraform, which you can find under the `iam-role-name` output.

In order to run the Worker in your AWS account, you need administrative access to that account. Collect the following pieces of information to run the Worker instances:
* The VPC ID your instances will run in.
* The subnet IDs your instances will run in.
* The AWS region your VPC is located in.

[1]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{< /tabs >}}

## Installing the Observability Pipelines Worker

{{< tabs >}}
{{% tab "Docker" %}}

The Observability Pipelines Worker Docker image is published to Docker Hub [here][1].

1. Download the [sample pipeline configuration file][2].

2. Run the following command to start the Observability Pipelines Worker with Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
      -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
    Replace `<API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines configuration ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}. Replace `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier. `./pipeline.yaml` must be the relative or absolute path to the configuration you downloaded in Step 1.
  
[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart][1] for AWS EKS.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline and use {{< region-param key="dd_site" code="true" >}} for the `site` value. Then, install it in your cluster with the following commands:

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

{{% tab "APT-based Linux" %}}
1. Run the following commands to set up APT to download through HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Run the following commands to update your local `apt` repo and install the Worker:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    EOF
    ```

5. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

6. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
1. Run the following commands to set up the Datadog `rpm` repo on your system:

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

   **Note:** If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration above.

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    EOF
    ```

4. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Set up the Worker module in your existing Terraform using this sample configuration. Update the values in `vpc-id`, `subnet-ids`, and `region` to match your AWS deployment. Update the values in `datadog-api-key` and `pipeline-id` to match your pipeline.

```
module "opw" {
    source     = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## SOURCES: Data sources that Observability Pipelines Worker collects data from.
## For a Datadog use case, we will receive data from the Datadog agent.
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## The Datadog Agent natively encodes its tags as a comma-separated list
  ## of values that are stored in the string `.ddtags`. To work with
  ## and filter off of these tags, you need to parse that string into
  ## more structured data.
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## The `.status` attribute added by the Datadog Agent needs to be deleted, otherwise
  ## your logs can be miscategorized at intake.
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## Before sending data to the logs intake, you must re-encode the
  ## tags into the expected format, so that it appears as if the Agent is
  ## sending it directly.
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

## This buffer configuration is split into the following, totaling the 288GB
## provisioned automatically by the Terraform module:
## - 240GB buffer for logs
## - 48GB buffer for metrics
##
## This should work for the vast majority of OP Worker deployments and should rarely
## need to be adjusted. If you do change it, be sure to update the `ebs-drive-size-gb`
## parameter.
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
  ## This sink writes logs to an S3 bucket of your choice, in a format that Datadog
  ## can rehydrate from. You need to fill in the ${DD_ARCHIVES_BUCKET}
  ## and ${DD_ARCHIVES_REGION} parameters to fit your S3 configuration.
  datadog_archives:
    type: datadog_archives
    inputs:
      - logs_finish_ddtags
    service: aws_s3
    bucket: ${DD_ARCHIVES_BUCKET}
    aws_s3:
      storage_class: "STANDARD"
      region: "${DD_ARCHIVES_REGION}"
EOT
}
```
{{% /tab %}}
{{< /tabs >}}

### Load balancing

{{< tabs >}}
{{% tab "Docker" %}}
Production-oriented setup is not included in the Docker instructions. Instead, refer to your company's standards for load balancing in containerized environments. If you are testing on your local machine, configuring a load balancer is unnecessary.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Use the load balancer URL given to you by Helm when you configure the Datadog Agent.

NLBs provisioned by the [AWS Load Balancer Controller][1] are used.

See [Capacity Planning and Scaling][2] for load balancer recommendations when scaling the Worker.
#### Cross-availability-zone load balancing
The provided Helm configuration tries to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen.

The sample configurations do not enable the cross-zone load balancing feature available in this controller. To enable it, add the following annotation to the `service` block:

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

See [AWS Load Balancer Controller][3] for more details.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /observability_pipelines/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}

{{% tab "APT-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
An NLB is provisioned by the Terraform module, and provisioned to point at the instances. Its DNS address is returned in the `lb-dns` output in Terraform.
{{% /tab %}}
{{< /tabs >}}

### Buffering
Observability Pipelines includes multiple buffering strategies that allow you to increase the resilience of your cluster to downstream faults. The provided sample configurations use disk buffers, the capacities of which are rated for approximately 10 minutes of data at 10Mbps/core for Observability Pipelines deployments. That is often enough time for transient issues to resolve themselves, or for incident responders to decide what needs to be done with the observability data.

{{< tabs >}}
{{% tab "Docker" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker`. Make sure that your host machine has a sufficient amount of storage capacity allocated to the container's mountpoint.
{{% /tab %}}
{{% tab "AWS EKS" %}}
For AWS, Datadog recommends using the `io2` EBS drive family. Alternatively, the `gp3` drives could also be used.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
By default, a 288GB EBS drive is allocated to each instance, and the sample configuration above is set to use that for buffering.
{{% /tab %}}
{{< /tabs >}}

## Connect the Datadog Agent to the Observability Pipelines Worker
To send Datadog Agent logs and metrics to the Observability Pipelines Worker, update your agent configuration with the following:

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8282"

```

`OPW_HOST` is the IP of the load balancer or machine you set up earlier. For single-host Docker-based installs, this is the IP address of the underlying host. For Kubernetes-based installs, you can retrieve it by running the following command and copying the `EXTERNAL-IP`:

```shell
kubectl get svc opw-observability-pipelines-worker
```

For Terraform installs, the `lb-dns` output provides the necessary value.

At this point, your observability data should be going to the Worker and then sent along to your S3 archive.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: /observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
