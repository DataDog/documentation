---
title: Using Autodiscovery with Docker
kind: guide
listorder: 10
---

<div class="alert alert-info">
Autodiscovery was previously called Service Discovery. It's still called Service Discovery throughout the Agent's code and in some configuration options.
</div>

Docker is being [adopted rapidly](https://www.datadoghq.com/docker-adoption/). Orchestration platforms like Docker Swarm, Kubernetes, and Amazon ECS make running Docker-ized services easier and more resilient by managing orchestration and replication across hosts. But all of that makes monitoring more difficult. How can you reliably monitor a service which is unpredictably shifting from one host to another?

The Datadog Agent can automatically track which services are running where, thanks to its Autodiscovery feature. Autodiscovery lets you define configuration templates for Agent checks and specify which containers each check should apply to. The Agent enables, disables, and regenerates static check configurations from the templates as containers come and go. When your NGINX container moves from 10.0.0.6 to 10.0.0.17, Autodiscovery helps the Agent update its NGINX check configuration with the new IP address so it can keep collecting NGINX metrics without any action on your part.

# How it Works

In a traditional non-container environment, Datadog Agent configuration is—like the environment in which it runs—static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check. The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a redis instance at 10.0.0.61:6379). When an Agent check cannot connect to such a service, you'll be missing metrics until you troubleshoot the issue. The Agent check will retry its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

With Autodiscovery enabled, the Agent runs checks differently.

### Different Configuration

Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints, so Autodiscovery uses **templates** for check configuration. In each template, the Agent looks for two template variables—`%%host%%` and `%%port%%`—to appear in place of any normally-hardcoded network options. For example: a template for the Agent's [Go Expvar check](https://github.com/DataDog/integrations-core/blob/master/go_expvar/conf.yaml.example) would contain the option `expvar_url: http://%%host%%:%%port%%`. For containers that have more than one IP address or exposed port, you can direct Autodiscovery to pick the right ones by using [template variable indexes](#template-variable-indexes).

Because templates don't identify specific instances of a monitored service—which `%%host%%`? which `%%port%%`?—Autodiscovery needs one or more **container identifiers** for each template so it can determine which IP(s) and Port(s) to substitute into the templates. For Docker, container identifiers are image names or container labels.

Finally, Autodiscovery can load check templates from places other than disk. Other possible **template sources** include key-value stores like Consul, and, when running on Kubernetes, Pod annotations.

### Different Execution

When the Agent starts with Autodiscovery enabled, it loads check templates from all available template sources—[not just one or another](#template-source-precedence)—along with the templates' container identifiers. Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers currently running on the same host as the Agent.

As the Agent inspects each running container, it checks if the container matches any of the container identifiers from any loaded templates. For each match, the Agent generates a static check configuration by substituting the matching container's IP address and port. Then it enables the check using the static configuration.

The Agent watches for Docker events—container creation, destruction, starts, and stops—and enables, disables, and regenerates static check configurations on such events.

# How to set it up

No matter what container orchestration platform you use, you'll first need to run a single [docker-dd-agent container](https://hub.docker.com/r/datadog/docker-dd-agent/) on every host in your cluster.

## Running the Agent Container

If you use Kubernetes, see the [Kubernetes integration page](http://docs.datadoghq.com/integrations/kubernetes/#installation) for instructions on running docker-dd-agent. If you use Amazon ECS, see [its integration page](http://docs.datadoghq.com/integrations/ecs/#installation).

If you use Docker Swarm, run the following command on one of your manager nodes:

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR_DATADOG_API_KEY> \
      -e SD_BACKEND=docker \
      datadog/docker-dd-agent:latest

Otherwise, see the docker-dd-agent documentation for detailed instructions and a comprehensive list of supported [environment variables](https://github.com/DataDog/docker-dd-agent#environment-variables).

Note that **if you want the Agent to autodiscover JMX-based checks, you MUST**: 

1. Use the `datadog/docker-dd-agent:latest-jmx` image. This image is based on `latest`, but it includes a JVM, which the Agent needs in order to run [jmxfetch](https://github.com/DataDog/jmxfetch).
1. Pass the environment variable `SD_JMX_ENABLE=yes` when starting `datadog/docker-dd-agent:latest-jmx`.

## Setting up Check Templates

Each **Template Source** section below shows a different way to configure check templates and their container identifiers.

### Template Source: Files (Auto-conf)

Storing templates as local files is easy to understand and doesn't require an external service or a specific orchestration platform. The downside is that you must restart your Agent containers each time you change, add, or remove templates.

The Agent looks for Autodiscovery templates in its `conf.d/auto_conf` directory, which contains default templates for the following checks:

- [apache](https://github.com/DataDog/integrations-core/blob/master/apache/auto_conf.yaml)
- [consul](https://github.com/DataDog/integrations-core/blob/master/consul/auto_conf.yaml)
- [couchdb](https://github.com/DataDog/integrations-core/blob/master/couch/auto_conf.yaml)
- [couchbase](https://github.com/DataDog/integrations-core/blob/master/couchbase/auto_conf.yaml)
- [elasticsearch](https://github.com/DataDog/integrations-core/blob/master/elastic/auto_conf.yaml)
- [etcd](https://github.com/DataDog/integrations-core/blob/master/etcd/auto_conf.yaml)
- [kubernetes_state](https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/auto_conf.yaml)
- [kube_dns](https://github.com/DataDog/integrations-core/blob/master/kube_dns/auto_conf.yaml)
- [kyototycoon](https://github.com/DataDog/integrations-core/blob/master/kyototycoon/auto_conf.yaml)
- [memcached](https://github.com/DataDog/integrations-core/blob/master/mcache/auto_conf.yaml)
- [redis](https://github.com/DataDog/integrations-core/blob/master/redisdb/auto_conf.yaml)
- [riak](https://github.com/DataDog/integrations-core/blob/master/risk/auto_conf.yaml)

These templates may suit you in basic cases, but if you need to use custom check configurations—say you want to enable extra check options, use different container identifiers, or use [template variable indexing](#template-variable-indexes))—you'll have to write your own auto-conf files. You can then provide those in a few ways:

1. Add them to each host that runs docker-dd-agent and [mount the directory that contains them](https://github.com/DataDog/docker-dd-agent#configuration-files) into the docker-dd-agent container when starting it
1. Build your own docker image based on docker-dd-agent, adding your custom templates to `/etc/dd-agent/conf.d/auto_conf`
1. On Kubernetes, add them using ConfigMaps

#### Example: Apache check

Here's the `apache.yaml` template packaged with docker-dd-agent:

~~~
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
~~~

It looks like a minimal [Apache check configuration](https://github.com/Datadog/integrations-core/blob/master/apache/conf.yaml.example), but notice the `docker_images` option. This required option lets you provide container identifiers. Autodiscovery will apply this template to any containers on the same host that run an `httpd` image.

_Any_ `httpd` image. Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery will apply the above template to both containers. When it's loading auto-conf files, Autodiscovery cannot distinguish between identically-named images from different sources or with different tags, and **you must provide short names for container images**, e.g. `httpd`, NOT `library/httpd:latest`.

If this is too limiting—if you need to apply different check configurations to different containers running the same image—use [labels](#container-labels) to identify the containers. Label each container differently, then add each label to any template file's `docker_images` list (yes, `docker_images` is where to put _any_ kind of container identifier, not just images).

### Template Source: Key-value Store

Autodiscovery can use Consul, etcd, and Zookeeper as template sources. To use a key-value store, you must configure it in `datadog.conf` or in environment variables passed to the docker-dd-agent container.

#### Configure in datadog.conf

In the `datadog.conf` file, set the `sd_config_backend`, `sd_backend_host`, and `sd_backend_port` options to, respectively, the key-value store type—`etcd`, `consul`, or `zookeeper`—and the IP address and port of your key-value store:

~~~
# For now only Docker is supported so you just need to un-comment this line.
service_discovery_backend: docker

# Define which key/value store must be used to look for configuration templates.
# Default is etcd. Consul is also supported.
sd_config_backend: etcd

# Settings for connecting to the backend. These are the default, edit them if you run a different config.
sd_backend_host: 127.0.0.1
sd_backend_port: 4001

# By default, the agent will look for the configuration templates under the
# `/datadog/check_configs` key in the back-end.
# If you wish otherwise, uncomment this option and modify its value.
# sd_template_dir: /datadog/check_configs

# If you Consul store requires token authentication for service discovery, you can define that token here.
# consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1
~~~

If you're using Consul and the Consul cluster requires authentication, set `consul_token`.

Restart the Agent to effect the configuration change.

#### Configure in environment variables

If you prefer to use environment variables, pass the same options to the container when starting it:

~~~
docker service create \
  --name dd-agent \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
  --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
  -e API_KEY=<YOUR API KEY> \
  -e SD_BACKEND=docker \
  -e SD_CONFIG_BACKEND=etcd \
  -e SD_BACKEND_HOST=127.0.0.1 \
  -e SD_BACKEND_PORT=4001 \
  datadog/docker-dd-agent:latest
~~~

Note that the option to enable Autodiscovery is called `service_discovery_backend` in `datadog.conf`, but it's called just `SD_BACKEND` as an environment variable.

---

With the key-value store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`. Autodiscovery expects a key-value hierarchy like this: 

~~~
/datadog/
  check_configs/
    docker_image_1/                 # container identifier, e.g. httpd
      - check_names: [<CHECK_NAME>] # e.g. apache
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
~~~

Each template is a 3-tuple: check name, `init_config`, and `instances`. The `docker_images` option from the previous section, which provided container identifiers to Autodiscovery, is not required here; for key-value stores, container identifiers appear as first-level keys under `check_config`. (Also note, the file-based template in the previous section didn't need a check name like this example does; there, the Agent inferred the check name from the file name.)

#### Example: Apache check

The following etcd commands create an Apache check template equivalent to that from the previous section's example:

~~~
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
~~~

Notice that each of the three values is a list. Autodiscovery assembles list items into check configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike auto-conf files, **key-value stores may use the short OR long image name as container identifiers**, e.g. `httpd` OR `library/httpd:latest`. The next example uses a long name.

#### Example: Apache and HTTP checks

The following etcd commands create the same Apache template and add an [HTTP check](https://github.com/DataDog/integrations-core/blob/master/http_check/conf.yaml.example) template:

~~~
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
~~~

Again, the order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists (they do—the index is 1).

### Template Source: Kubernetes Pod Annotations

Since version 5.12 of the Datadog Agent, you can store check templates in Kubernetes Pod annotations. With Autodiscovery enabled, the Agent detects if it's running on Kubernetes and automatically searches all Pod annotations for check templates if so; you don't need to configure Kubernetes as a template source (i.e. via `SD_CONFIG_BACKEND`) as you do with key-value stores.

Autodiscovery expects annotations to look like this:

~~~
annotations:
  service-discovery.datadoghq.com/<container identifier>.check_names: '[<CHECK_NAME>]'
  service-discovery.datadoghq.com/<container identifier>.init_configs: '[<INIT_CONFIG>]'
  service-discovery.datadoghq.com/<container identifier>.instances: '[<INSTANCE_CONFIG>]'
~~~

The format is similar to that for key-value stores. The differences are:

- Annotations must begin with `service-discovery.datadoghq.com/` (for key-value stores, the starting indicator is `/datadog/check_configs/`).
- For Annotations, Autodiscovery indentifies containers by _name_, NOT image (as it does for auto-conf files and key-value stores). That is, it looks to match `<container identifier>` to `.spec.containers[0].name`, not `.spec.containers[0].image`.

If you define your Kubernetes Pods directly (i.e. `kind: Pod`), add each Pod's annotations directly under its `metadata` section (see the first example below). If you define Pods _indirectly_ via Replication Controllers, Replica Sets, or Deployments, add Pod annotations under `.spec.templates.metadata` (see the second example below).

#### Pod Example: Apache and HTTP checks

The following Pod annotation defines two templates—equivalent to those from the end of the previous section—for `apache` containers:

~~~
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
    service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
    service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # use this as the container identifier in your annotations
      image: httpd # NOT this
      ports:
        - containerPort: 80
~~~

#### Deployment Example: Apache and HTTP checks

If define pods via Deployments, don't add template annotations to the Deployment metadata; the Agent won't look there. Add them like this:

~~~
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
        service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # use this as the container identifier in your annotations
        image: httpd # NOT this
        ports:
        - containerPort: 80
~~~

# Reference

### Template Variable Indexes

For containers that have many IP addresses or expose many ports, you can tell Autodiscovery which ones to choose by appending an underscore to the template variable, followed by an integer, e.g. `%%host_0%%`, `%%port_4%%`. After inspecting the container, Autodiscovery sorts the IPs and ports **numerically and in ascending order**, so for a container that exposes ports 80, 443, and 8443, `%%port_0%%` refers to port 80. Non-indexed template variables refer to the last item in the sorted list, so in this case, `%%port%%` means port 8443.

You can also add a network name suffix to the `%%host%%` variable—`%%host_bridge%%`, `%%host_swarm%%`, etc—for containers attached to multiple networks. When `%%host%%` does not have a suffix, Autodiscovery picks the container's `bridge` network IP address.

### Alternate Container Identifier: Labels

{: #container-labels}

You can identify containers by label rather than container name or image. Just label any container `com.datadoghq.sd.check.id: <SOME_LABEL>`, and then put `<SOME_LABEL>` anywhere you'd normally put a container name or image. For example, if you label a container `com.datadoghq.sd.check.id: special-container`, Autodiscovery will apply to that container any auto-conf template that contains `special-container` in its `docker_images` list.

Autodiscovery can only identify each container by label OR image/name—not both—and labels take precedence. For a container that has a `com.datadoghq.sd.check.id: special-nginx` label and runs the `nginx` image, the Agent will NOT apply templates that include only `nginx` as a container identifier.

### Template Source Precedence

If you provide a template for the same check type via multiple template sources, the Agent looks for templates in the following order (using the first one it finds):

* Kubernetes annotations
* Key-value stores
* Files

So if you configure a `redisdb` template both in Consul and as a file (`conf.d/auto_conf/redisdb.yaml`), the Agent will use the template from Consul.

# Troubleshooting

When you're not sure if Autodiscovery is loading certain checks you've configured, use the Agent's `configcheck` init script command. For example, to confirm that your redis template is being loaded from a Kubernetes annotation—not the default `auto_conf/redisdb.yaml` file:

~~~
# docker exec -it <agent_container_name> /etc/init.d/datadog-agent configcheck
.
..
...
Check "redisdb":
  source --> Kubernetes Pod Annotation
  config --> {'instances': [{u'host': u'10.244.1.32', u'port': u'6379', 'tags': [u'image_name:kubernetes/redis-slave', u'kube_namespace:guestbook', u'app:redis', u'role:slave', u'docker_image:kubernetes/redis-slave:v2', u'image_tag:v2', u'kube_replication_controller:redis-slave']}], 'init_config': {}}
~~~

To check whether Autodiscovery is loading JMX-based checks:

~~~
# docker exec -it <agent_container_name> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
~~~