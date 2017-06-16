---
title: Guide to using Autodiscovery with Docker
kind: guide
listorder: 10
---

<div class="alert alert-info">
Originally, the Autodiscovery feature was called Service Discovery: just as tools like Consul and etcd help services discover each others network locations, Autodiscovery helps the Datadog Agent discover its monitored services' locations. But while Autodiscovery is analagous to service discovery, it solves a more specific problem. The feature name was changed to discourage undue comparisons to Consul, etcd, and other general service discovery tools.<br/><br/>Autodiscovery is still sometimes called Service Discovery throughout the Agent's code and in configuration options.
</div>

Docker is being [adopted rapidly](https://www.datadoghq.com/docker-adoption/). Platforms like Docker Swarm, Kubernetes, and Amazon's ECS make running Docker-ized services easier and more resilient by managing orchestration and replication across hosts. But all of that makes monitoring more difficult. How can you reliably monitor a service which is unpredictably shifting from one host to another?

The Datadog Agent automatically keeps track of what services are running where, thanks to its Autodiscovery feature. Autodiscovery lets you define configuration templates for Agent checks and specify which container types each check should apply to. The Agent enables, disables, and recompiles static check configurations from the templates as containers come and go. When your NGINX container moves from 10.0.0.6 to 10.0.0.17, Autodiscovery helps the Agent update its NGINX check configuration with the new IP address so it can keep collecting NGINX metrics without any action on your part.

# How it Works

In a traditional non-container environment, Datadog Agent configuration is, like the environment in which it runs, static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously applies every configured check. The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service. <more elaboration?>

With Autodiscovery enabled, the Agent runs checks differently.

### The Differences

First, Autodiscovery uses **templates** for check configuration wherein two template variables—`%%host%%` and `%%port%%`—appear in place of any normally-hardcoded network option values, e.g. `expvar_url: http://%%host%%:%%port%%`. Because orchestration platforms like Docker Swarm deploy (and redeploy) your containers on arbitrary hosts, static files are not suitable for checks that need to find network endpoints. For containers that have more than one IP or exposed port, Autodiscovery can pick the right one using [template variable indexes](#template-variable-indexes).

Second, because templates don't identify specific instances of a monitored service—which `%%host%%`? which `%%port%%`?—Autodiscovery needs a **service identifier** for each template so it can find values for the template variables. For Docker, this means identifying the container(s) whose IP(s) and port(s) should be substituted into the template. Autodiscovery can identify Docker containers by [image name or label](#service-identifiers).

Finally, Autodiscovery can load check templates from places other than disk. Other possible **template sources** include key-value (KV) stores like Consul, and, when running on Kubernetes, pod annotations.

### The Algorithm

When the Agent starts with Autodiscovery enabled, it loads check templates from all available template sources (not just one or the other). But unlike in a traditional Agent setup, it doesn't run all checks all the time; it must decide which checks to enable given the containers that are currently running.

As the Agent inspects each template and its service identifiers, it creates a mapping of service identifiers to template YAML (or JSON). Then, it inspects every running Docker container on the Agent's host, looking for containers that match any of the identifier keys in the identifier-to-template mapping. For each match, the Agent creates a static check configuration by substituting the matching container's IP address and port into the corresponding template, and enables the check. Any time it finds another instance of the same kind of container—whether it's an additional container or the previous one redeployed—it will build and enable another configuration.

The Agent watches for Docker events—container creation, destruction, starts, and stops—and recomputes check configurations from the templates on such events.

There are a few caveats:

* The Agent caches templates it gets from KV stores. Changes to KV store templates require a restart of the Agent.
* <something about precedence of templates when multiple sources provided>
* ???

---

The next section clarifies this abstract description of Autodiscovery with some examples.

# How to set it up

No matter what container orchestration platform you use, you'll first need to run a single [docker-dd-agent container](https://hub.docker.com/r/datadog/docker-dd-agent/) on every host in your cluster. Then you'll write check templates, storing them in one or more template sources.

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

Otherwise, see the docker-dd-agent documentation for detailed instructions and a comprehensive list of supported environment variables.

In any case, you only need to provide one environment variable to enable Autodiscovery: `SD_BACKEND=docker`. (docker is the only supported backend)

## Setting up Check Templates

### Template Source: Files (Auto-conf)

The Agent loads any template files in its `conf.d/auto_conf` directory. The docker-dd-agent container comes pre-packaged with several templates:

- Apache Web Server
- Consul
- CouchDB
- Couchbase
- Elasticsearch
- etcd
- Kube State Metrics
- Kyoto Tycoon
- Memcached
- Redis
- Riak

Storing templates as local files is easy to understand and doesn't require an external service. The downside is that you must redeploy the Agent container each time you change, add, or remove templates. You may also have to maintain your own docker-dd-agent container if you want to add your own templates.

Here's the `apache.yaml` template packaged with docker-dd-agent:

~~~
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
~~~

It looks like a minimal [Apache check configuration](https://github.com/Datadog/integrations-core/blob/master/apache/conf.yaml.example), but notice the `docker_images` option. This required option lets you provide one or more service identifiers to Autodiscovery. In this case, the identifier refers to the [official Docker Hub httpd](https://hub.docker.com/_/httpd/) container. Autodiscovery will apply this template to any `httpd` containers running on the Agent's host.

### Template Source: Key-value Store

Autodiscovery supports Consul, etcd, and Zookeeper as template sources. To use a KV store, configure its parameters in `datadog.conf` or in environment variables passed to docker-dd-agent when starting the container.

#### Configure in `datadog.conf`

In the `datadog.conf` file, set the `sd_config_backend`, `sd_backend_host`, and `sd_backend_port` options to, respectively, the KV type—`etcd`, `consul`, or `zookeeper`—and the location of your KV store:

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

If you are using Consul and it requires token authentication, set `consul_token`.

Restart the Agent to effect the configuration change.

#### Configure in environment variables

If you prefer to use environment variables, pass the options to the container when starting it::

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

---

With the KV store enabled as a template source, the Agent looks for templates under the key `/datadog/check_configs`.

Autodiscovery expects a key-value hierarchy like the following: 

~~~
/datadog/
  check_configs/
    docker_image_1/                 # service identifier, e.g. httpd
      - check_names: [<CHECK_NAME>] # e.g. apache
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
~~~

Each template is defined as a three-tuple: check name, `init_config`, and `instances`. The `docker_images` option from the previous section is not required here; service identifiers appear as first-level keys under `check_config`. (Also note, the file-based template in the previous section didn't need a check name; the Agent infers it from the filename.)

The following etcd commands create an Apache check template equivalent to that from the previous section:

~~~
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
~~~

Notice that each of the three values is a list. Autodiscovery assembles list items into check configurations based on shared list indexes. In this case, it composes the first (and only) check from `check_names[0]`, `init_configs[0]` and `instances[0]`.

The following alternative etcd commands create the same Apache template and add an [HTTP check](https://github.com/DataDog/integrations-core/blob/master/http_check/conf.yaml.example) template:

~~~
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
~~~

Again, the list order matters. The HTTP check will only work if all its elements have the same index (1) across the lists.

### Template Source: Kubernetes Pod Annotations

Since version 5.12 of the Datadog Agent, you can store check templates in Kubernetes pod annotations. Autodiscovery detects if the Agent is running on Kubernetes and searches all pod annotations for templates if so; you don't have to configure it as a template source as you do with key-value stores.

Follow the [Kubernetes integration instructions](/integrations/kubernetes/), then add annotations to your pod definitions. Autodiscovery expects annotations to look like the following:

~~~
annotations:
  service-discovery.datadoghq.com/<Kubernetes Container Name>.check_names: '[<CHECK_NAME>]'
  service-discovery.datadoghq.com/<Kubernetes Container Name>.init_configs: '[<INIT_CONFIG>]'
  service-discovery.datadoghq.com/<Kubernetes Container Name>.instances: '[<INSTANCE_CONFIG>]'
~~~

It's very similar to the template format for key-value stores. Autodiscovery looks for annotation keys beginning with `service-discovery.datadoghq.com/`. Kubernetes container names function as the service identifiers.

The following pod annotation defines two templates—equivalent to those from the end of the previous section—for `apache` containers:

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
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
~~~

# Detailed examples (i.e. Case studies)

(Only in blog post?)

# Reference

### Template Variable Indexes

For containers that have many IP addresses or listens on many ports, you can tell Autodiscovery which ones to choose by appending an underscore to the template variable, followed by an index, e.g. `%%host_0%%`, `%%port_4%%`. After inspecting the container, Autodiscovery sorts the IPs and ports **numerically and in ascending order**. For a container that listens on ports 80, 443, and 8443, `%%port_0%%` refers to port 80. Unindexed template variables refer to the last item in the sorted list, so in this case, `%%port%%` means port 8443.

You can also add a network name suffix to the `%%host%%` variable—`%%host_bridge%%`, `%%host_swarm%%`, etc—for containers attached to multiple networks. When `%%host%%` does not have a suffix, Autodiscovery picks the container's bridge network IP address.

### Service Identifiers

#### Image name format

Before version `5.8.3` of the Datadog Agent it was required to truncate the image name to its minimum. e.g. for the Docker image `quay.io/coreos/etcd:latest` the key in the configuration store needed to be `datadog/check_configs/etcd/...`

To make configuration more precise we now use the complete container image identifier in the key. So the agent will look in `datadog/check_configs/quay.io/coreos/etcd:latest/...`, and fallback to the old format if no template was found to ensure backward compatibility.

#### Labels

In case you need to match different templates with containers running the same image, it is also possible starting with `5.8.3` to define explicitly which path the agent should look for in the configuration store to find a template using the `com.datadoghq.sd.check.id` label.

For example, if a container has this label configured as `com.datadoghq.sd.check.id: foobar`, it will look for a configuration template in the store under the key `datadog/check_configs/foobar/...`.
