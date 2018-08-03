---
title: Custom Integrations
kind: documentation
---

## ConfigMap
It is possible to leverage the ConfigMaps to configure or enable integrations.
To do so, you only need to create a ConfigMap with the integration(s)'s configuration.
Then, reference this ConfigMap among the volumes of your Agent's manifest.

For example, in the following case we customize the name, url and tags fields of the http check.
To enable other integrations, just specify the correct yaml name and make sure it is properly formated.

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
And in the manifest of your Agent (Daemonset/Deployment) add the following:
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
(...)
data:
  http-config: |-
  (...)
    logs:
      - type: docker
        service: docker
        source: kubernetes
```

Learn more about this in [the Docker log collection documentation][11].

## Annotations

It is also possible to enable integrations via the annotations in the manifest of your application.
This can be done with the autodiscovery, for more details, see the [Autodiscovery][13] section.

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
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac
[13]: /agent/autodiscovery
[14]: https://app.datadoghq.com/account/settings#agent
[15]: /agent/faq/agent-commands/#agent-status-and-information
[16]: https://kubernetes.io/docs/admin/authorization/rbac/
[17]: https://github.com/DataDog/integrations-core/tree/master/kubelet#compatibility
[18]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens
[19]: /agent/basic_agent_usage/docker/#dogstatsd-custom-metrics
[20]: /tracing/setup/kubernetes
[21]: /graphing/infrastructure/process
