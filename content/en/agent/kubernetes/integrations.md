---
title: Integration ConfigMap
kind: documentation
further_reading:
- link: "agent/kubernetes/daemonset_setup"
  tag: "documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
---

## ConfigMap

It is possible to leverage a ConfigMap to configure or enable integrations.
To do so, you only need to create a ConfigMap with the integration(s)'s configuration.
Then, reference this ConfigMap among the volumes of your Agent's manifest.

For example, in the following case we customize the name, url, and tags fields of the [HTTP check][1].
To enable other integrations, just specify the correct YAML name and make sure it is properly formated.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: dd-agent-config
  namespace: default
data:
  http-config: |-
    ad_identifiers:
      - httpd
      - my-custom-httpd
    init_config:
    instances:
    - name: My service
      url: my.service:port/healthz
      tags:
        - service:critical
---
```

And in the manifest of your Agent (DaemonSet/deployment) add the following:

```yaml
[...]
        volumeMounts:
        [...]
          - name: dd-agent-config
            mountPath: /conf.d
      volumes:
      [...]
        - name: dd-agent-config
          configMap:
            name: dd-agent-config
            items:
            - key: http-config
              path: http_check.yaml
[...]
```

**Note**: See the [Autodiscovery Container Identifier][2] documentation for more information on using `ad_identifiers` to apply Autodiscovery configuration file templates to containers.

### Mounting a custom configuration file in a container with a ConfigMap

To mount a custom `datadog.yaml` in a container with a ConfigMap, employ the following in your DaemonSet manifest:

```yaml
[...]
        volumeMounts:
        [...]
          - name: confd-config
            mountPath: /conf.d
          - name: datadog-yaml
            mountPath: /etc/datadog-agent/datadog.yaml
            subPath: datadog.yaml
      volumes:
      [...]
        - name: confd-config
          configMap:
            name: dd-agent-config
            items:
              - key: http-config
                path: http_check.yaml
        - name: datadog-yaml
          configMap:
            name: dd-agent-config
            items:
              - key: datadog-yaml
                path: datadog.yaml
[...]
```

And in your ConfigMap:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: dd-agent-config
  namespace: default
data:
  http-config: |-
    init_config:
    instances:
  datadog-yaml: |-
    check_runners: 1
    listeners:
      - name: kubelet
    config_providers:
      - name: kubelet
        polling: true
```

## Annotations

It is also possible to enable integrations via the annotations in the manifest of your application.
This can be done with Autodiscovery. For more details, see the [Autodiscovery][3] section.


### Enabling integrations with Helm

The Datadog [entrypoint][4] copies files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in `/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively. The keys for `datadog.confd` and `datadog.checksd` should mirror the content found in their respective ConfigMaps, i.e.:

```yaml
datadog:
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
        - bitnami/redis
      init_config:
      instances:
        - host: "%%host%%"
          port: "%%port%%"
    jmx.yaml: |-
      ad_identifiers:
        - openjdk
      instance_config:
      instances:
        - host: "%%host%%"
          port: "%%port_0%%"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/http_check
[2]: /agent/autodiscovery/ad_identifiers
[3]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh
