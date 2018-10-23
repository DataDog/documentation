---
title: Custom Integrations
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

For example, in the following case we customize the name, url, and tags fields of the [HTTP check][22].
To enable other integrations, just specify the correct YAML name and make sure it is properly formated.

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: dd-agent-config
  namespace: default
data:
  http-config: |-
    init_config:
    instances:
    - name: My service
      url: my.service:port/healthz
      tags:
        - service:critical
---
```
And in the manifest of your Agent (DaemonSet/deployment) add the following:
```
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

To enable [Log collection][10] add the following lines in your `http-config`:

```
[...]
data:
  http-config: |-
  [...]
    logs:
      - type: docker
        service: docker
        source: kubernetes
```

Learn more about this in [the Docker log collection documentation][11].

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
This can be done with Autodiscovery. For more details, see the [Autodiscovery][13] section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kubernetes
[2]: /agent/faq/agent-5-kubernetes-basic-agent-usage
[3]: https://hub.docker.com/r/datadog/agent/
[4]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://kubernetes.io/docs/concepts/configuration/secret/
[7]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[8]: /agent/basic_agent_usage/docker/#environment-variables
[9]: https://docs.datadoghq.com/agent/autodiscovery
[10]: /logs
[11]: /logs/docker/#configuration-file-example
[12]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[13]: /agent/autodiscovery
[14]: https://app.datadoghq.com/account/settings#agent
[15]: /agent/faq/agent-commands/#agent-status-and-information
[16]: https://kubernetes.io/docs/admin/authorization/rbac/
[17]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[18]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens
[19]: /agent/basic_agent_usage/docker/#dogstatsd-custom-metrics
[20]: /tracing/setup/kubernetes
[21]: /graphing/infrastructure/process
[22]: /integrations/http_check/
