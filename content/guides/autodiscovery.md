---
title: Using Autodiscovery with Docker
kind: guide
listorder: 10
---

Docker is being [adopted rapidly](https://www.datadoghq.com/docker-adoption/). Orchestration platforms like Docker Swarm, Kubernetes, and Amazon ECS make running Docker-ized services easier and more resilient by managing orchestration and replication across hosts. But all of that makes monitoring more difficult. How can you reliably monitor a service which is unpredictably shifting from one host to another?

The Datadog Agent can automatically track which services are running where, thanks to its Autodiscovery feature. Autodiscovery lets you define configuration templates for Agent checks and specify which containers each check should apply to. The Agent enables, disables, and regenerates static check configurations from the templates as containers come and go. When your NGINX container moves from 10.0.0.6 to 10.0.0.17, Autodiscovery helps the Agent update its NGINX check configuration with the new IP address so it can keep collecting NGINX metrics without any action on your part.

<div class="alert alert-info">
Autodiscovery was previously called Service Discovery. It's still called Service Discovery in the Agent's code and in Autodiscovery configuration options.
</div>

# How it Works

In a traditional non-container environment, Datadog Agent configuration is—like the environment in which it runs—static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check. The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a redis instance at 10.0.0.61:6379). When an Agent check cannot connect to such a service, you'll be missing metrics until you troubleshoot the issue. The Agent check will retry its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

With Autodiscovery enabled, the Agent runs checks differently.

### Different Configuration

First, Autodiscovery uses **templates** for check configuration, not static files. Templates let the Agent arbitrary hosts, static configuration files are not suitable for checks that collect data from network endpoints. In the templates for such checks, the Agent expects two template variables—`%%host%%` and `%%port%%`—in place of any normally-hardcoded network options. For example: a template for the Agent's [Go Expvar check](https://github.com/DataDog/integrations-core/blob/master/go_expvar/conf.yaml.example) would contain the option `expvar_url: http://%%host%%:%%port%%`. For containers that have more than one IP or exposed port, Autodiscovery can pick the right one(s) using [template variable indexes](#template-variable-indexes).

Second, because templates don't identify specific instances of a monitored service—which `%%host%%`? which `%%port%%`?—Autodiscovery needs one or more **container identifiers** for each template so it can find real values for the template variables. For Docker, Autodiscovery can use container names or [labels](#container-labels) as identifiers. With identifiers in hand, Autodiscovery can figure out which IP(s) and port(s) to substitute into the template.

Finally, Autodiscovery can load check templates from places other than disk. Other possible **template sources** include key-value stores like Consul, and, when running on Kubernetes, Pod annotations.

### Different Execution

When the Agent starts with Autodiscovery enabled, it loads check templates from all available template sources—[not just one or another](#template-source-precedence)—along with the templates' container identifiers. Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all currently running containers.

As the Agent inspects each running container, it checks if the container matches any of the container identifiers from any loaded templates. For each template with a container identifier that matches the container, the Agent generates a static check configuration by substituting the matching container's IP address and port. Then it enables the check using the static configuration.

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

Note that **if you want to run any JMX-based checks, you must**: 

1. Use the `datadog/docker-dd-agent:latest-jmx` image. This image is based on `latest`, but it includes a JVM, which it needs in order to run [jmxfetch](https://github.com/DataDog/jmxfetch).
1. Pass the environment variable `SD_JMX_ENABLE=yes` when starting the container.

## Setting up Check Templates

Each **Template Source** section below shows a different way to configure check templates and their container identifiers.

### Template Source: Files (Auto-conf)

Storing templates as local files is easy to understand and doesn't require an external service or a specific orchestration platform. The downside is that you must restart your Agent containers each time you change, add, or remove templates.

The Agent looks for Autodiscovery templates in its `conf.d/auto_conf` directory. The docker-dd-agent container comes packaged with templates for:

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

If you want to use custom check configurations to monitor these services, obviously the default templates won't suit you. But they also may not suit you if:

1. The monitored containers run a different image than that specified in the default template (see the example below), or
1. The monitored containers expose more than one port (see [Tempalte Variable Indexing](#template-variable-indexes)).

There are two ways to provide template files of your own:

1. Add them to each host that runs docker-dd-agent and [mount the directory](https://github.com/DataDog/docker-dd-agent#configuration-files) that contains them into the docker-dd-agent container when you start it
1. Package them into your own release of docker-dd-agent

#### Example: Apache check

Here's the `apache.yaml` template packaged with docker-dd-agent:

~~~
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
~~~

It looks like a minimal [Apache check configuration](https://github.com/Datadog/integrations-core/blob/master/apache/conf.yaml.example), but notice the `docker_images` option. This required option lets you provide container identifiers: Autodiscovery will apply this template to any `httpd` containers running on the Agent's host.

For auto-conf files, **you must provide the short name of the container image**, e.g. `httpd`, NOT `yourusername/httpd:latest`. Autodiscovery will not distinguish between identically-named images from different sources or with different tags.

Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`. Autodiscovery will apply the above template to both containers. You may not want that—perhaps you want to monitor only one of the two containers, or you want to use a different check configuration for each one. If that's the case use [labels](#container-labels) instead of images as container identifiers. Label each container differently, then add each label to any template file's `docker_images` list (yes, `docker_images` is the place for any kind of container identifier, not just images).

### Template Source: Key-value Store

Autodiscovery can use Consul, etcd, and Zookeeper as template sources. To use a key-value store, you must configure it in `datadog.conf` or in environment variables passed to the docker-dd-agent container.

#### Configure in `datadog.conf`

In the `datadog.conf` file, set the `sd_config_backend`, `sd_backend_host`, and `sd_backend_port` options to, respectively, the backend type—`etcd`, `consul`, or `zookeeper`—and the IP address and port of your key-value store:

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

Each template is a 3-tuple: check name, `init_config`, and `instances`. The `docker_images` option from the previous section, which provided container identifiers to Autodiscovery, is not required here; for key-value store template sources, container identifiers appear as first-level keys under `check_config`. (Also note, the file-based template in the previous section didn't need a check name like this example does; there, the Agent inferred the check name from the file name.)

#### Example: Apache check

The following etcd commands create an Apache check template equivalent to that from the previous section's example:

~~~
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
~~~

Notice that each of the three values is a list. Autodiscovery assembles list items into check configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.

Unlike with auto-conf files, **container identifiers may be the short OR long name of the container image**, e.g. `httpd` OR `library/httpd:latest`. The next example uses a long name.

#### Example: Apache and HTTP checks

The following etcd commands create the same Apache template and add an [HTTP check](https://github.com/DataDog/integrations-core/blob/master/http_check/conf.yaml.example) template:

~~~
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
~~~

Again, the order of each list matters. The Agent can only generate the HTTP check configuration correctly if all parts of its configuration have the same index across the three lists (they do—the index is 1).

### Template Source: Kubernetes Pod Annotations

Since version 5.12 of the Datadog Agent, you can store check templates in Kubernetes Pod annotations. Autodiscovery detects if the Agent is running on Kubernetes and searches all Pod annotations for templates if so; you don't need to configure Kubernetes as a template source (i.e. via `SD_CONFIG_BACKEND`) as you do with key-value stores.

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

If you define your Kubernetes Pods directly (i.e. `kind: Pod`), add each Pod's annotations directly under its `metadata` section. If you define Pods _indirectly_ via Replication Controllers, Replica Sets, or Deployments, add Pod annotations under `.spec.templates.metadata`.

#### Example: Apache and HTTP checks

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
    - name: apache # provide this as the container identifier in your annotations
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

In case you need to match different templates with containers running the same image, it is also possible starting with `5.8.3` to define explicitly which path the agent should look for in the configuration store to find a template using the `com.datadoghq.sd.check.id` label.

For example, if a container has this label configured as `com.datadoghq.sd.check.id: foobar`, it will look for a configuration template in the store under the key `datadog/check_configs/foobar/...`.

### Template Source Precedence

If you provide a template for the same check type via multiple template sources, the Agent will prefer, in increasing order of preference:

* Files
* Kubernetes annotations
* Key-value stores

That is, if you configure a `redisdb` template both in Consul and as a file (`conf.d/auto_conf/redisdb.yaml`), the Agent will use the template from Consul.

# Troubleshooting



