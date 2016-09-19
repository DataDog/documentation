---
title: Guide to Service Discovery with Docker
kind: guide
listorder: 10
---
Docker is being adopted rapidly, and for good reason: it simplifies many aspects of running a service in production. But Docker-powered services typically run many more containers than traditional services run hosts, so monitoring is much more complex. Now with platforms like Kubernetes and ECS orchestrating your containers, you may not even know on what host your containers are running—which makes monitoring containers and the images they run even more complex.

How can you monitor a service which is always hopping from one host to another?

Datadog automatically keeps track of what is running where, thanks to its Service Discovery feature.

It allows you to define configuration templates for specific images in a distributed configuration store on top of the Datadog Agent which will use them to dynamically reconfigure its checks when your containers ecosystem changes. Whether you use Kubernetes, Amazon ECS, or Docker Swarm to manage your Docker containers, you can now monitor images, such as NGINX or Redis, even if containers running them stopped or new ones started, without interruption or having to restart the Agent.

## How it works

The Service Discovery feature watches for Docker events like when a container is created, destroyed, started or stopped. When one of these happens, the Agent identifies which service is impacted, loads the configuration template for this image, and automatically sets up its checks.

Configuration templates are defined in a single key-value store per cluster. We currently support etcd and Consul.

If no configuration template is defined in the store for an image, the Agent will try to auto-configure the check by itself. Currently, auto-configuration works for Apache, Consul, Couch, Couchbase, Elasticsearch, etcd, Kyoto Tycoon, Memcached, Redis and Riak.

## How to set it up

To use Service Discovery, you simply need to define the configuration templates for the images you want to monitor, in a key-value store on top of the Agent.

Here is the structure of a configuration template:

    /datadog/
      check_configs/
        docker_image_0/
          - check_names: ["check_name_0"]
          - init_configs: [{init_config}]
          - instances: [{instance_config}]
        docker_image_1/
          - check_names: ["check_name_1"]
          - init_configs: [{init_config}]
          - instances: [{instance_config}]
        docker_image_2/
          - check_names: ["check_name_2"]
          - init_configs: [{init_config}]
          - instances: [{instance_config}]
        ...


You also need to configure the Datadog Agents of the environment to enable service discovery using this store as a backend. To do so, edit the datadog.conf file to modify these options as needed:

    # For now only docker is supported so you just need to un-comment this line.
    # service_discovery_backend: docker
    #
    # Define which key/value store must be used to look for configuration templates.
    # Default is etcd. Consul is also supported.
    # sd_config_backend: etcd

    # Settings for connecting to the backend. These are the default, edit them if you run a different config.
    # sd_backend_host: 127.0.0.1
    # sd_backend_port: 4001

    # By default, the agent will look for the configuration templates under the
    # `/datadog/check_configs` key in the back-end.
    # If you wish otherwise, uncomment this option and modify its value.
    # sd_template_dir: /datadog/check_configs

    # If you Consul store requires token authentication for service discovery, you can define that token here.
    # consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1


### Running and configuring the Agent in a container

The above settings can be passed to the dd-agent container through the following environment variables:

    SD_BACKEND <-> service_discovery_backend
    SD_CONFIG_BACKEND <-> sd_config_backend
    SD_BACKEND_HOST <-> sd_backend_host
    SD_BACKEND_PORT <-> sd_backend_port
    SD_TEMPLATE_DIR <-> sd_template_dir

Available tags:

    datadog/docker-dd-agent:latest (has the Docker check preconfigured)
    datadog/docker-dd-agent:kubernetes (has the Docker and Kubernetes checks preconfigured)

example:

    docker run -d --name dd-agent \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -e API_KEY=[YOUR_API_KEY] -e SD_CONFIG_BACKEND=etcd \
     -e SD_BACKEND=docker -e SD_BACKEND_HOST=[YOUR_ETCD_IP] \
     -e SD_BACKEND_PORT=[YOUR_ETCD_PORT] \
     datadog/docker-dd-agent:kubernetes


### Example: setting up NGINX monitoring

The default NGINX image doesn't have the stub_status_module enabled, so we first need to build an image (named `custom-nginx` here) that configures the /nginx_status endpoint.

Setup a configuration template in the form of a few keys in a key/value store the Agent can reach. Here is an example using etcd:

    ./etcdctl mkdir /datadog/check_configs/custom-nginx
    ./etcdctl set /datadog/check_configs/custom-nginx/check_names '["nginx"]'
    ./etcdctl set /datadog/check_configs/custom-nginx/init_configs '[{}]'
    ./etcdctl set /datadog/check_configs/custom-nginx/instances '[{"nginx_status_url": "http://%%host%%/nginx_status/", "tags": ["env:production"]}]'

or with curl:

    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/check_names -d value='["nginx"]'
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/init_configs -d value="[{}]"
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/instances -d value='[{"nginx_status_url": "http://%25%25host%25%25/nginx_status/", "tags": ["env:production"]}]'


If the Agent is configured to use consul instead:

    curl -L http://consul_ip:consul_port/v1/kv/datadog/check_configs/custom-nginx/check_names -XPUT -d '["nginx"]'
    curl -L http://consul_ip:consul_port/v1/kv/datadog/check_configs/custom-nginx/init_configs -XPUT -d '[{}]'
    curl -L http://consul_ip:consul_port/v1/kv/datadog/check_configs/custom-nginx/instances -XPUT -d '[{"nginx_status_url": "http://%%host%%/nginx_status/", "tags": ["env:production"]}]'

*Notice the format of template variables: `%%host%%`. For now host and port are supported on every platform. Kubernetes users can also use the `tags` variable that collects relevant tags like the pod name and node name from the Kubernetes API. Support for more variables and platforms is planned, and feature requests are welcome.*

Now every Agent will be able to detect an nginx instance running on its host and setup a check for it automatically. No need to restart the Agent every time the container starts or stops, and no other configuration file to modify.


### Template variables

To automate the resolution of parameters like the host IP address or its port, the agent uses template variables in this format: `%%variable%%`.

This format can be suffixed with an index when a list of values is expected for the variable, and selecting a specific one is mandatory. It has to look like this: `%%variable_index%%`. If no index is provided, the last value in the value list ordered increasingly will be used.

Let's take the example of the port variable: a rabbitmq container with the management module enabled has 6 exposed ports by default (the docker image with the management module enabled by default is rabbitmq:3-management). The list of ports as seen by the agent is: `[4369, 5671, 5672, 15671, 15672, 25672]`. **Notice the order. The Agent always sorts values in ascending order.**

The default management port for the rabbitmq image is `15672` with index 4 in the list (starting from 0), so the template variable needs to look like `%%port_4%%`.

It is also possible starting from version `5.8.3` of the agent to use keys as a suffix in case a dictionary is expected. This is particularly useful to select an IP address for a container that has several networks attached.
The format is the same: `%%variable_key%%`.

As an example if the rabbitmq container mentioned above is available over two networks `bridge` and `swarm`, using `%%host_swarm%%` will pick the IP address from the swarm network.
Note that for the `host` variable if several networks are found and no key is passed the agent attempts to use the default `bridge` network.


### Configuring multiple checks for the same image

Sometimes enabling several checks on a single container is needed. For instance if you run a Java service that provides an HTTP API, using the HTTP check and the JMX integration at the same time makes perfect sense. To declare that in templates, simply add elements to the `check_names`, `init_configs`, and `instances lists`. These elements will be matched together based on their index in their respective lists.

#### Example

In the previous example of the custom nginx image, adding http_check would look like this:

    curl -L -X PUT \
      http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/check_names \
      -d value='["nginx", "http_check"]'
    curl -L -X PUT \
      http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/init_configs \
      -d value="[{}, {}]"
    curl -L -X PUT \
        http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/instances \
        -d value='[ \
        {"nginx_status_url": "http://%25%25host%25%25/nginx_status/", "tags": ["env:production"]}, \
        {"name": "Test service", "url": "http://%25%25host%25%25/test_endpoint", "timeout": 1}]'


### Monitoring your custom container

Service discovery works with any image—one important note though is that for the `%%port%%` variable to be interpolated, the current version needs the container to expose the targeted port. See the NGINX Dockerfile for reference.


### Image name format in the configuration store

Before version `5.8.3` of the agent it was required to truncate the image name to its minimum. i.e. for the image `quay.io/coreos/etcd:latest` the key in the configuration store needed to be `datadog/check_configs/etcd/...`

To make configuration more precise we now use the complete image identifier in the key. So the agent will look in `datadog/check_configs/quay.io/coreos/etcd:latest/...`, and fallback to the old format if no template was found to ensure backward compatibility.


#### Using Docker label to specify the template path

In case you need to match different templates with containers running the same image, it is also possible starting with `5.8.3` to define explicitly which path the agent should look for in the configuration store to find a template using the `com.datadoghq.sd.check.id` label.

For example, if a container has this label configured as `com.datadoghq.sd.check.id: foobar`, it will look for a configuration template in the store under the key `datadog/check_configs/foobar/...`.


### Using configuration files instead of a configuration store

If running a configuration store is not possible in your environment but shipping configuration files with the agent is, you can use the [conf.d/auto_conf folder](https://github.com/DataDog/dd-agent/tree/master/conf.d/auto_conf) to store configuration templates. The format is simple and looks like the typical YAML configuration file for checks. One additional field, `docker_images`, is required and identifies the container image(s) to which this configuration should be applied.
Use existing files in this folder as an example.
If you use this instead of a K/V store you still need to uncomment `service_discovery_backend: docker` in `datadog.conf`, but `sd_config_backend`, `sd_backend_host` and `sd_backend_port` must be omitted.


### Kubernetes users

Service discovery is particularly useful for container platforms like Kubernetes where by default the user doesn't choose the node on which a container will be scheduled. With service discovery you can simply deploy the Agent container with a DaemonSet and declare your configuration templates for all the containers you plan to launch in the same cluster. To deploy the Agent, simply follow the instruction from the install page for Kubernetes.

Additionally, installing an etcd cluster on Kubernetes can be done fairly easily. The most important part is to setup a service that is accessible from the Datadog Agent. Instructions to install a simple, 3-node cluster can be found in the etcd repository.

Once the cluster is running, simply use the K/V store service IP address and port as `sd_backend_host` and `sd_backend_port` in datadog.conf (passing the corresponding environment variables to the container makes this easier, see the mapping above).

Then write your configuration templates, and let the Agent detect your running pods and take care of re-configuring checks.


#### Examples

Following is an example of how to setup templates for an NGINX, PostgreSQL stack. The example will use etcd as the configuration store.

#### NGINX

The default NGINX image doesn't have a /nginx_status/ endpoint enabled, so the first step is to enable that as described in the Datadog NGINX tile (click on "Configuration") in a new image which we will name custom-nginx in this example. Once the image is named, the configuration template can be defined this way:

    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/check_names -d value="nginx"
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/init_configs -d value="{}"
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-nginx/instances -d value='{"nginx_status_url": "http://%25%25host%25%25/nginx_status/", "tags": "%25%25tags%25%25"}'

The %%tags%% variable will add metadata about the replication controller, the pod name, etc.

#### PostgreSQL

Next comes the PostgreSQL configuration. Steps to connect Postgres to Datadog are as usual described in the integration tile. To ease the deployment process we'll assume these steps are automated in a script that is executed in a Dockerfile based on the official postgres Docker image, resulting in a new custom-postgres image.

The configuration template is thus defined like this:

    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-postgres/check_names -d value="postgres"
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-postgres/init_configs -d value="{}"
    curl -L -X PUT http://etcd_ip:etcd_port/v2/keys/datadog/check_configs/custom-postgres/instances -d value='{"host": "%25%25host%25%25", "port": "%25%25port%25%25", "tags": ["%25%25tags%25%25", env:production]}'

The postgres image only exposes the default port, so appending an index to the port variable is unnecessary.

Looking at the `tags` parameter, you may also notice that it is possible to mix template variables and constant value to achieve mixed tagging.

Now the Agent can be deployed following the Kubernetes instructions and passing the right environment variables to enable service discovery as covered earlier. And whenever a Postgres or NGINX container is deployed, agents will detect them and update the check configurations accordingly.
