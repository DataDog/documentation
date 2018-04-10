---
title: Using Autodiscovery with Kubernetes and Docker
kind: documentation
aliases:
  - /guides/servicediscovery/
  - /guides/autodiscovery/
  - /agent/autodiscovery
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

This page covers Autodiscovery with agent 6 only, [refer to the dedicated documentation to setup Autodiscovery with agent 5][1]

## How it Works

In a traditional non-container environment, Datadog Agent configuration is—like the environment in which it runs—static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check.
The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a Redis instance at 10.0.0.61:6379).
When an Agent check cannot connect to such a service, metrics will be missing until you troubleshoot the issue. The Agent check retries its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

With Autodiscovery enabled, the Agent runs checks differently.

### Different Configuration

Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints, so Autodiscovery uses **templates** for check configuration. In each template, the Agent looks for two template variables—`%%host%%` and `%%port%%`—to appear in place of any normally-hardcoded network options. For example: a template for the Agent's [Go Expvar check][2] would contain the option `expvar_url: http://%%host%%:%%port%%`. For containers that have more than one IP address or exposed port, you can direct Autodiscovery to pick the right ones by using [template variable indexes](#supported-template-variables).

Because templates don't identify specific instances of a monitored service—which `%%host%%`? which `%%port%%`?—Autodiscovery needs one or more **container identifiers** for each template so it can determine which IP(s) and Port(s) to substitute into the templates. For Docker, container identifiers are image names or container labels.

Finally, Autodiscovery can load check templates from places other than disk. Other possible **template sources** include key-value stores like Consul, and, when running on Kubernetes, Pod annotations.

### Different Execution

When the Agent starts with Autodiscovery enabled, it loads check templates from all available template sources—[not just one or another](#template-source-precedence)—along with the templates' container identifiers. Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers currently running on the same host as the Agent.

As the Agent inspects each running container, it checks if the container matches any of the container identifiers from any loaded templates. For each match, the Agent generates a static check configuration by substituting the matching container's IP address and port. Then it enables the check using the static configuration.

The Agent watches for Docker events—container creation, destruction, starts, and stops—and enables, disables, and regenerates static check configurations on such events.

## How to set it up

The Datadog Docker agent automatically auto-discovers other containers.

## Setting up Check Templates

Each **Template Source** section below shows a different way to configure check templates and their container identifiers.

### Template Source: Files (Auto-conf)

Storing templates as local files is easy to understand and doesn't require an external service or a specific orchestration platform. The downside is that you have to restart your Agent containers each time you change, add, or remove templates.

The Agent looks for Autodiscovery templates in its `conf.d/auto_conf` directory, which contains default templates for the following checks:

- [Apache][3]
- [Consul][4]
- [CouchDB][5]
- [Couchbase][6]
- [Elasticsearch][7]
- [Etcd][8]
- [Kubernetes_state][9]
- [Kube_dns][10]
- [Kyototycoon][11]
- [Memcached][12]
- [Redis][13]
- [Riak][14]

These templates may suit you in basic cases, but if you need to use custom check configurations—say you want to enable extra check options, use different container identifiers, or use template variable indexing— you'll have to write your own auto-conf files. You can then provide those in a few ways:

1. Add them to each host that runs docker-datadog-agent and [mount the directory that contains them][15] into the datadog-agent container when starting it
2. On Kubernetes, add them [using ConfigMaps][16]

### Example: Apache check

Here's the `apache.yaml` template packaged with datadog-agent:

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

It looks like a minimal [Apache check configuration][17], but notice the `ad_identifiers` option. This required option lets you provide container identifiers. Autodiscovery applies this template to any containers on the same host that run an `httpd` image.

_Any_ `httpd` image. Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery applies the above template to both containers. When it's loading auto-conf files, Autodiscovery cannot distinguish between identically-named images from different sources or with different tags, and **you have to provide short names for container images**, e.g. `httpd`, NOT `library/httpd:latest`.

If this is too limiting—if you need to apply different check configurations to different containers running the same image— [use labels to identify the containers][18]. Label each container differently, then add each label to any template file's `ad_identifiers` list (yes, `ad_identifiers` is where to put _any_ kind of container identifier, not just images).

### Template Source: Key-value Store

Autodiscovery can use [Consul][19], etcd, and Zookeeper as template sources. To use a key-value store, you must configure it in `datadog.yaml` or in environment variables passed to the datadog-agent container.

#### Configure in datadog.yaml

In the `datadog.yaml` file, set the `sd_config_backend`, `sd_backend_host`, and `sd_backend_port` options to, respectively, the key-value store type—`etcd`, `consul`, or `zookeeper`—and the IP address and port of your key-value store:

```
# The providers the Agent should call to collect checks configurations.
# Please note the File Configuration Provider is enabled by default and cannot
# be configured.
# config_providers:
#   - name: etcd
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: http://127.0.0.1
#     username:
#     password:

#   - name: consul
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: http://127.0.0.1
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
#     template_url: 127.0.0.1
#     username:
#     password:
```

[Restart the Agent][20] to apply the configuration change.

#### Configure in environment variables

With the key-value store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`. Autodiscovery expects a key-value hierarchy like this:

```
/datadog/
  check_configs/
    docker_image_1/                 # container identifier, e.g. httpd
      - check_names: [<CHECK_NAME>] # e.g. apache
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

The following etcd commands create the same Apache template and add an [HTTP check][21] template to monitor whether the website created by the Apache container is available:

```
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

Again, the order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists (they do—the index is 1).

### Template Source: Kubernetes Pod Annotations

Store check templates in Kubernetes Pod annotations. With Autodiscovery enabled, the Agent detects if it's running on Kubernetes and automatically searches all Pod annotations for check templates.

Autodiscovery expects annotations to look like this:

```
annotations:
  ad.datadoghq.com/<container identifier>.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/<container identifier>.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/<container identifier>.instances: '[<INSTANCE_CONFIG>]'
```

The format is similar to that for key-value stores. The differences are:

- Annotations must begin with `ad.datadoghq.com/` (for key-value stores, the starting indicator is `/datadog/check_configs/`).
- For Annotations, Autodiscovery indentifies containers by _name_, NOT image (as it does for auto-conf files and key-value stores). That is, it looks to match `<container identifier>` to `.spec.containers[0].name`, not `.spec.containers[0].image`.

If you define your Kubernetes Pods directly (i.e. `kind: Pod`), add each Pod's annotations directly under its `metadata` section (see the first example below). If you define Pods _indirectly_ via Replication Controllers, Replica Sets, or Deployments, add Pod annotations under `.spec.templates.metadata` (see the second example below).

#### Pod Example: Apache check with website availability monitoring

The following Pod annotation defines two templates—equivalent to those from the end of the previous section—for `apache` containers:

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # use this as the container identifier in your annotations
      image: httpd # NOT this
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
        ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
        ad.datadoghq.com/apache.init_configs: '[{},{}]'
        ad.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # use this as the container identifier in your annotations
        image: httpd # NOT this
        ports:
        - containerPort: 80
```

### Template Source: Docker Label Annotations

The Agent detects if it's running on Docker and automatically searches all labels for check templates.

Autodiscovery expects labels to look like these examples, depending on the file type:

**Dockerfile**
```
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**
```
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**docker run command**
```
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

#### Docker Example: NGINX Dockerfile

The following Dockerfile launches an NGINX container with Autodiscovery enabled:

```
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%/nginx_status:%%port%%"}]'
```

## Reference

### Supported Template Variables

The following template variables are currently handled by the agent:

- Container IP: `host`
  - `%%host%%`: autodetect the network (use `bridge` or, if only one network is attached, this one)
  - `%%host_network%%`: specify the network name to use, when attached to several networks
- Container port: `port`
  - `%%port%%`: use the highest exposed port **sorted numerically and in ascending order** (eg. 8443 for a container that exposes ports 80, 443, and 8443)
  - `%%port_0%%`: use the first port **sorted numerically and in ascending order** (for the same container, `%%port_0%%` refers to port 80, `%%port_1%%` refers to 443
  - If your target port is constant, we recommend you directly specify it, without using the `port` variable
- Environment variable: `env` (added in Agent 6.1)
  - `%%env_MYENVVAR%%`: use the contents of the `$MYENVVAR` environment variable **as seen by the Agent process**

### Alternate Container Identifier: Labels

You can identify containers by label rather than container name or image. Just label any container `com.datadoghq.ad.check.id: <SOME_LABEL>`, and then put `<SOME_LABEL>` anywhere you'd normally put a container name or image. For example, if you label a container `com.datadoghq.ad.check.id: special-container`, Autodiscovery applies to that container any auto-conf template that contains `special-container` in its `ad_identifiers` list.

Autodiscovery can only identify each container by label OR image/name—not both—and labels take precedence. For a container that has a `com.datadoghq.ad.check.id: special-nginx` label and runs the `nginx` image, the Agent DOESN'T apply templates that include only `nginx` as a container identifier.

### Template Source Precedence

If you provide a template for the same check type via multiple template sources, the Agent looks for templates in the following order (using the first one it finds):

* Kubernetes annotations
* Files

## Troubleshooting

When you're not sure if Autodiscovery is loading certain checks you've configured, use the Agent's `configcheck` init script command. For example, to confirm that your Redis template is being loaded from a docker label annotation—not the default `redisdb.d/auto_conf.yaml` file:

```
# docker exec -it <agent_container_name> agent configcheck
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```


**Note**: Use the `-v` option to see all templates that are loaded but couldn't be resolved:

```
# docker exec -it <agent_container_name> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/faq/agent-5-autodiscovery
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/apache/auto_conf.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/couch/auto_conf.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/couchbase/auto_conf.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/elastic/auto_conf.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/etcd/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/auto_conf.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/mcache/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/redisdb/auto_conf.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/riak/auto_conf.yaml
[15]: https://github.com/DataDog/datadog-agent
[16]: /agent/basic_agent_usage/kubernetes/#configmap
[17]: https://github.com/Datadog/integrations-core/blob/master/apache/conf.yaml.example
[18]: /agent/autodiscovery/#template-source-kubernetes-pod-annotations
[19]: /integrations/consul
[20]: /agent/faq/agent-commands
[21]: https://github.com/DataDog/integrations-core/blob/master/http_check/conf.yaml.example
