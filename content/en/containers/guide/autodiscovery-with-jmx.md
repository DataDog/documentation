---
title: Autodiscovery with JMX
kind: guide
aliases:
  - /agent/guide/autodiscovery-with-jmx
further_reading:
    - link: '/agent/kubernetes/integrations/'
      tag: 'Documentation'
      text: 'Create and load an Autodiscovery integration template'
    - link: '/agent/guide/ad_identifiers/'
      tag: 'Documentation'
      text: 'Match a container with the corresponding integration template'
    - link: '/agent/guide/autodiscovery-management/'
      tag: 'Documentation'
      text: 'Manage which container to include in the Agent Autodiscovery'
    - link: '/agent/kubernetes/tag/'
      tag: 'Documentation'
      text: 'Dynamically assign and collect tags from your application'
---

In containerized environments there are a few differences in how the Agent connects to the JMX server. Autodiscovery features make it possible to dynamically setup these integrations. Use Datadog's JMX based integrations to collect JMX applications metrics from your pods in Kubernetes. 

If you are using the Java tracer for your applications, you can alternatively take advantage of the [Java runtime metrics][2] feature to send these metrics to the Agent.

## Installation

### Use a JMX-enabled Agent
JMX utilities are not installed in the Agent by default. To set up a JMX integration, append `-jmx` to your Agent's image tag. For example, `gcr.io/datadoghq/agent:latest-jmx`.

If you are using Datadog Operator or Helm, the following configurations append `-jmx` to your Agent's image tag:

{{< tabs >}}
{{% tab "Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agents:
  image:
    tagSuffix: jmx
```
{{% /tab %}}
{{< /tabs >}}



## Configuration

Use one of the following methods:

- [Autodiscovery annotations](#autodiscovery-annotations) (recommended)
- [Autodiscovery configuration files](#autodiscovery-configuration-files): for heavy customization of configuration parameters

### Autodiscovery annotations

In this method, a JMX check configuration is applied using annotations on your Java-based Pods. This allows the Agent to automatically configure the JMX check when a new container starts. Ensure these annotations are on the created Pod, and not on the object (Deployment, DaemonSet, etc.) creating the Pod. 

Use the following template for Autodiscovery annotations:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <POD_NAME>
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "<JMX_PORT>"
          }]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
      # (...)
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=<JMX_PORT>
            -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
            -Djava.rmi.server.hostname=$(POD_IP)
```

In this example:
- `<POD_NAME>` is the name of your pod.
- `<CONTAINER_IDENTIFIER>` matches the desired container within your pod.
- `<INTEGRATION_NAME>` is the name of the desired JMX integration. See the list of [available JMX integrations](#available-jmx-integrations).
- Set `<JMX_PORT>` as desired, as long as it matches between the annotations and `JAVA_OPTS`.

With this configuration, the Datadog Agent discovers this pod and makes a request to the JMX server relative to the `%%host%%` [Autodiscovery template variable][3]—this request resolves to the IP address of the discovered pod. This is why `java.rmi.server.hostname` is set to the `POD_IP` address previously populated with the [Kubernetes downward API][5].

**Note**: The `JAVA_OPTS` environment variable is commonly used in Java-based container images as a startup parameter (for example, `java $JAVA_OPTS -jar app.jar`). If you are using a custom application, or if your application does not follow this pattern, set these system properties manually.


#### Example annotation: Tomcat
The following configuration runs the [Tomcat][81] JMX integration against port `9012`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: tomcat-test
  annotations:
    ad.datadoghq.com/tomcat.checks: |
      {
        "tomcat": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "9012"
          }]
        }
      }
spec:
  containers:
    - name: tomcat
      image: tomcat:8.0
      imagePullPolicy: Always
      ports:
        - name: jmx-metrics
          containerPort: 9012
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=9012
            -Dcom.sun.management.jmxremote.rmi.port=9012
            -Djava.rmi.server.hostname=$(POD_IP)
```

#### Custom metric annotation template
If you need to collect additional metrics from these integrations, add them to the `init_config` section:

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": {
        "is_jmx": true,
        "collect_default_metrics": true,
        "conf": [{
          "include": {
            "domain": "java.lang",
            "type": "OperatingSystem",
            "attribute": {
               "FreePhysicalMemorySize": {
                 "metric_type": "gauge",
                 "alias": "jvm.free_physical_memory"
               } 
            }
          }
        }]
      },
      "instances": [{
        "host": "%%host%%",
        "port": "<JMX_PORT>"
      }]
    }
  }
```          

See the [JMX integration][6] documentation for more information about the formatting for these metrics.

### Autodiscovery configuration files

If you need to pass a more complex custom configuration for your Datadog-JMX integration, you can use [Autodiscovery Container Identifiers][1] to pass custom integration configuration files as well as a custom `metrics.yaml` file.

#### 1. Compose configuration file

When using this method, the Agent needs a configuration file and an optional `metrics.yaml` file for the metrics to collect. These files can either be mounted into the Agent pod or built into the container image. 

The configuration file naming convention is to first identify your desired integration name from the [prerequisite steps of available integrations](#available-jmx-integrations). Once this is determined, the Agent needs a configuration file named relative to that integration—_or_ within that integration's config directory. 

For example, for the [Tomcat][81] integration, create _either_:
- `/etc/datadog-agent/conf.d/tomcat.yaml`, or
- `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

If you are using a custom `metrics.yaml` file, include it in the integration's config directory. (For example: `/etc/datadog-agent/conf.d/tomcat.d/metrics.yaml`.)

This configuration file should include `ad_identifiers`:

```yaml
ad_identifiers:
  - "<SHORT_IMAGE>"

init_config:
  is_jmx: true
  conf:
    <METRICS_TO_COLLECT>

instances:
  - host: "%%host%%"
    port: "<JMX_PORT>"
```

Replace `<SHORT_IMAGE>` with the short image name of your desired container. For example, the container image `gcr.io/CompanyName/my-app:latest` has a short image name of `my-app`. As the Datadog Agent discovers that container, it sets up the JMX configuration as described in this file.

You can alternatively reference and specify [custom identifiers to your containers][4] if you do not want to base this on the short image name.

Like Kubernetes annotations, configuration files can use [Autodiscovery template variables][3]. In this case, the `host` configuration uses `%%host%%` to resolve to the IP address of the discovered container.

See the [JMX integration][6] documentation (as well as the [example configurations for the pre-provided integrations](#available-jmx-integrations)) for more information about structuring your `init_config` and `instances` configuration for the `<METRICS_TO_COLLECT>`.

#### 2. Mount configuration file
{{< tabs >}}
{{% tab "Operator" %}}

If you are using Datadog Operator, add an override:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - "<SHORT_IMAGE>"

            init_config:
              is_jmx: true

            instances:
              - host: "%%host%%"
                port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Helm" %}}

In Helm, use the `datadog.confd` option:

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |
      ad_identifiers:
        - "<SHORT_IMAGE>"

      init_config:
        is_jmx: true

      instances:
        - host: "%%host%%"
          port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Custom image" %}}
If you cannot mount these files in the Agent container (for example, on Amazon ECS) you can build an Agent Docker image containing the desired configuration files.

For example:

```Dockerfile
FROM gcr.io/datadoghq/agent:latest-jmx
COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
```

Then use this new custom image as your regular containerized Agent.
{{% /tab %}}

{{< /tabs >}}

#### 3. Expose JMX server
Set up the JMX server in a way that allows the Agent to access it:

```yaml
spec:
  containers:
    - # (...)
      env:
      - name: POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: JAVA_OPTS
        value: >-
          -Dcom.sun.management.jmxremote
          -Dcom.sun.management.jmxremote.authenticate=false
          -Dcom.sun.management.jmxremote.ssl=false
          -Dcom.sun.management.jmxremote.local.only=false
          -Dcom.sun.management.jmxremote.port=<JMX_PORT>
          -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
          -Djava.rmi.server.hostname=$(POD_IP)   
```          

## Available JMX integrations
The Datadog Agent comes with several JMX integrations pre-configured.

| Integration Name         | Metrics file       | Configuration file      |
|--------------------------|--------------------|-------------------------|
| [activemq][41]           | [metrics.yaml][42] | [conf.yaml.example][43] |
| [cassandra][44]          | [metrics.yaml][45] | [conf.yaml.example][46] |
| [confluent_platform][47] | [metrics.yaml][48] | [conf.yaml.example][49] |
| [hazelcast][50]          | [metrics.yaml][51] | [conf.yaml.example][52] |
| [hive][53]               | [metrics.yaml][54] | [conf.yaml.example][55] |
| [hivemq][56]             | [metrics.yaml][57] | [conf.yaml.example][58] |
| [hudi][59]               | [metrics.yaml][60] | [conf.yaml.example][61] |
| [ignite][62]             | [metrics.yaml][63] | [conf.yaml.example][64] |
| [jboss_wildfly][66]      | [metrics.yaml][67] | [conf.yaml.example][68] |
| [kafka][69]              | [metrics.yaml][70] | [conf.yaml.example][71] |
| [presto][72]             | [metrics.yaml][73] | [conf.yaml.example][74] |
| [solr][75]               | [metrics.yaml][76] | [conf.yaml.example][77] |
| [sonarqube][78]          | [metrics.yaml][79] | [conf.yaml.example][80] |
| [tomcat][81]             | [metrics.yaml][82] | [conf.yaml.example][83] |
| [weblogic][84]           | [metrics.yaml][85] | [conf.yaml.example][86] |

Each integration in the above table has a `metrics.yaml` file predefined to match the expected pattern of the returned JMX metrics per application. Use the listed integration names as `<INTEGRATION_NAME>` in your Autodiscovery annotations or configuration files.

Alternatively use `jmx` as your `<INTEGRATION_NAME>` to set up a basic JMX integration and collect the default `jvm.*` metrics only.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/guide/ad_identifiers/?tab=kubernetes
[2]: /tracing/metrics/runtime_metrics/java/
[3]: /containers/guide/template_variables/
[4]: /containers/guide/ad_identifiers/?tab=kubernetes#custom-autodiscovery-container-identifiers
[5]: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/
[6]: /integrations/java/
[41]: /integrations/activemq/
[42]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[44]: /integrations/cassandra/
[45]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[47]: /integrations/confluent_platform/
[48]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[50]: /integrations/hazelcast/
[51]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/metrics.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[53]: /integrations/hive/
[54]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[56]: /integrations/hivemq/
[57]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/metrics.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[59]: /integrations/hudi/
[60]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/metrics.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[62]: /integrations/ignite/
[63]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/metrics.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[66]: /integrations/jboss_wildfly/
[67]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[69]: /integrations/kafka/
[70]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[72]: /integrations/presto/
[73]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[75]: /integrations/solr/
[76]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[78]: /integrations/sonarqube/
[79]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[81]: /integrations/tomcat/
[82]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[84]: /integrations/weblogic/
[85]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/metrics.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example