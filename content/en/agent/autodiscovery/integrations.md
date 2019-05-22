---
title: Setting up Check Templates
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

Each **Template Source** section below shows a different way to configure check templates and their container identifiers.

{{< tabs >}}
{{% tab "Files" %}}

### Template Source: Files (Auto-conf)

Storing templates as local files is easy to understand and doesn't require an external service or a specific orchestration platform. The downside is that you have to restart your Agent containers each time you change, add, or remove templates.

The Agent looks for Autodiscovery templates in the `/conf.d` directory, which contains default templates for the following checks:

- [Apache][1]
- [Consul][2]
- [CouchDB][3]
- [Couchbase][4]
- [Elasticsearch][5]
- [Etcd][6]
- [Kubernetes_state][7]
- [Kube_dns][8]
- [Kube_proxy][9]
- [Kyototycoon][10]
- [Memcached][11]
- [Redis][12]
- [Riak][13]

Since 6.2.0 (and 5.24.0), the default templates use the default port for the monitored software, instead of auto-detecting it. If you need to use a different port, provide a custom Autodiscovery template either in [Docker container labels](#template-source-docker-label-annotations) or [Kubernetes pod annotations](#template-source-kubernetes-pod-annotations).

These templates may suit you in basic cases, but if you need to use custom Agent check configurations&mdash;such as enabling extra check options, using different container identifiers, or using template variable indexing&mdash;write your own auto-conf files. These are provided in the following ways:

1. Add them to each host that runs `docker-datadog-agent` and [mount the directory that contains them][14] into the datadog-agent container when starting it
2. On Kubernetes, add them [using ConfigMaps][15]

The check name is extracted from the template file name. To run the `checkname` integration, the template file must either:

  - be named `checkname.yaml` and be directly placed inside the `conf.d` folder
  - be placed in the `conf.d/checkname.d/` folder, with any filename ending with `.yaml`


### Example: Apache check

Here's the `apache.yaml` template packaged with `datadog-agent`:

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

It looks like a minimal [Apache check configuration][16], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run an `httpd` image.

_Any_ `httpd` image. Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery applies the above template to both containers. When it's loading auto-conf files, Autodiscovery cannot distinguish between identically-named images from different sources or with different tags, and **you have to provide short names for container images**, e.g. `httpd`, NOT `library/httpd:latest`.

If this is too limiting&mdash;if you need to apply different check configurations to different containers running the same image&mdash;[use labels to identify the containers][17]. Label each container differently, then add each label to any template file's `ad_identifiers` list (yes, `ad_identifiers` is where to put _any_ kind of container identifier, not just images).


[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_proxy/datadog_checks/kube_proxy/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[14]: https://github.com/DataDog/datadog-agent
[15]: /agent/basic_agent_usage/kubernetes/#configmap
[16]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[17]: /agent/autodiscovery/#template-source-kubernetes-pod-annotations
{{% /tab %}}
{{% tab "Key-value Store" %}}

### Template Source: Key-value Store

Autodiscovery can use [Consul][1], etcd, and Zookeeper as template sources. To use a key-value store, you must configure it in `datadog.yaml` or in environment variables passed to the `datadog-agent` container.

#### Configure in datadog.yaml

In the `datadog.yaml` file, set the `<KV_STORE_IP>` address and `<KV_STORE_PORT>` of your key-value store:

```
# The providers the Agent should call to collect checks configurations.
# Note that the File Configuration Provider is enabled by default and cannot
# be configured.
# config_providers:
#   - name: etcd
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     username:
#     password:

#   - name: consul
#     polling: true
#     template_dir: datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     ca_file:
#     ca_path:
#     cert_file:
#     key_file:
#     username:
#     password:
#     token:

#   - name: zookeeper
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     username:
#     password:
```

[Restart the Agent][2] to apply the configuration change.

#### Configure in environment variables

With the key-value store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`. Autodiscovery expects a key-value hierarchy like this:

```
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: [<CHECK_NAME>]
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
```

Each template is a 3-tuple: check name, `init_configs`, and `instances`. The `ad_identifiers` option from the previous section, which provided container identifiers to Autodiscovery, is not required here; for key-value stores, container identifiers appear as first-level keys under `check_configs`. (Also note, the file-based template in the previous section didn't need a check name like this example does; there, the Agent inferred the check name from the file name.)

#### Example: Apache check

The following etcd commands create an Apache check template equivalent to that from the previous section's example:

```
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into check configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `httpd` OR `library/httpd:latest`. The next example uses a long name.

#### Example: Apache check with website availability monitoring

The following etcd commands create the same Apache template and add an [HTTP check][3] template to monitor whether the website created by the Apache container is available:

```
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

Again, the order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists (they do; the index is 1).


[1]: /integrations/consul
[2]: /agent/guide/agent-commands
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

### Template Source: Kubernetes Pod Annotations

Store check templates in Kubernetes Pod annotations. With Autodiscovery enabled, the Agent detects if it's running on Kubernetes and automatically searches all Pod annotations for check templates.

Since version 6.5 of the Datadog Agent, it is also possible to configure log collection in Kubernetes Pod annotations.

Autodiscovery expects annotations to look like this:

```yaml
# (...)
metadata:
#(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<CHECK_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOG_CONFIG>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

The format is similar to that for key-value stores. The differences are:

- Annotations must begin with `ad.datadoghq.com/` (for key-value stores, the starting indicator is `/datadog/check_configs/`).
- For Annotations, Autodiscovery identifies containers by _name_, **NOT image** (as it does for auto-conf files and key-value stores). That is, it looks to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`.

If you define your Kubernetes Pods directly (i.e. `kind: Pod`), add each Pod's annotations directly under its `metadata` section (see the first example below). If you define Pods _indirectly_ via Replication Controllers, Replica Sets, or Deployments, add Pod annotations under `.spec.templates.metadata` (see the second example below).

#### Pod Example: Apache check with website availability monitoring

The following Pod annotation defines two templates&mdash;equivalent to those from the end of the previous section&mdash;for `apache` containers:

* `<CONTAINER_IDENTIFIER>` is `apache`.
* Check name are `apache` and `http_check` and their `<INIT_CONFIG>`, `<INSTANCE_CONFIG>`, and `<LOG_CONFIG>` configuration can be found in their respective documentation page: [Datadog-Apache integration][1], [Datadog-HTTP check integration][2].

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: |
      [
        "apache",
        "http_check"
      ]
    ad.datadoghq.com/apache.init_configs: |
      [
        {},
        {}
      ]
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        },
        {
          "name": "My service",
          "url": "http://%%host%%",
          timeout: 1
        }
      ]
    ad.datadoghq.com/apache.logs: |
      [
        {
          "source":"apache",
          "service":"webapp"
        }
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

#### Deployment Example: Apache and HTTP checks

If define pods via Deployments, don't add template annotations to the Deployment metadata; the Agent won't look there. Add them like this:

```
apiVersion: apps/v1beta1
kind: Deployment
metadata: # Don't add templates here
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        ad.datadoghq.com/apache.check_names: |
          [
            "apache",
            "http_check"
          ]
        ad.datadoghq.com/apache.init_configs: |
          [
            {},
            {}
          ]
        ad.datadoghq.com/apache.instances: |
          [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            },
            {
              "name": "My service",
              "url": "http://%%host%%",
              timeout: 1
            }
          ]
        ad.datadoghq.com/apache.logs: |
          [
            {
              "source":"apache",
              "service":"webapp"
            }
          ]
    spec:
      containers:
      - name: apache
        image: httpd
        ports:
        - containerPort: 80
```

[1]: /integrations/apache/#setup
[2]: /integrations/http_check/#setup
{{% /tab %}}
{{% tab "Docker" %}}

### Template Source: Docker Label Annotations

The Agent detects if it's running on Docker and automatically searches all labels for check templates.

Since version 6.2 of the Datadog Agent, it is also possible to configure Docker log collection in container labels.
Check the [Docker Log collection guide][1] for more information about the setup.

Autodiscovery expects labels to look like these examples, depending on the file type:

**Dockerfile**
```
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

**docker-compose.yaml**
```yaml
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

**docker run command**
```
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

#### Docker Example: NGINX Dockerfile

The following Dockerfile launches an NGINX container with Autodiscovery enabled:

```
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

#### Docker Swarm

When using Swarm mode for Docker Cloud, labels must be applied to the image:

```yaml

version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```


[1]: /agent/docker/log
{{% /tab %}}
{{% tab "Cluster Checks" %}}

### Template Source: Cluster Checks with the Cluster Agent

The [Cluster Checks feature][1] monitors non-containerized and out-of-cluster resources.

[1]: /agent/autodiscovery/clusterchecks
{{% /tab %}}
{{< /tabs >}}

**Note**: Some supported integrations require additional steps for Autodiscovery to work: [Ceph][1], [Varnish][2], [Postfix][3], [Cassandra Nodetools][4], and [Gunicorn][5]. Contact [Datadog support][6] for assistance.
[1]: 
[2]: 
[3]: 
[4]: 
[5]: 
[6]: 
