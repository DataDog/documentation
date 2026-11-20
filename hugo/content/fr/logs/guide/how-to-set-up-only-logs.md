---
aliases:
- /fr/logs/faq/how-to-set-up-only-logs
title: Utiliser l'Agent Datadog pour la collecte de logs uniquement
---

Pour désactiver des charges utiles, vous devez exécuter la version 6.4 de l'Agent ou une version ultérieure. Les étapes suivantes vous permettent de désactiver l'envoi de données des métriques afin de ne plus afficher les hosts dans Datadog :

{{< tabs >}}
{{% tab "Host" %}}

1. Ouvrez le [fichier de configuration datadog.yaml][1].
2. Ajoutez l'attribut `enable_payloads` avec les paramètres suivants :

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configurer l'Agent pour la collecte de logs][2].
4. [Redémarrez l'Agent][3].

[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/logs/log_collection/
[3]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Si vous utilisez l'Agent Docker conteneurisé, définissez les variables d'environnement `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` et `DD_ENABLE_PAYLOADS_SKETCHES` sur `false` en plus de la configuration de votre Agent :

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<CLÉ_API_DATADOG> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false \
           -e DD_ENABLE_PAYLOADS_SERIES=false \
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
           -e DD_ENABLE_PAYLOADS_SKETCHES=false \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si vous déployez l'Agent dans Kubernetes, définissez les variables d'environnement `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` et `DD_ENABLE_PAYLOADS_SKETCHES` sur `false` en plus de la configuration de votre Agent :

```yaml
 ## Envoyer uniquement des logs
 datadog:
 [...]
   env:
      - name: DD_ENABLE_PAYLOADS_EVENTS
        value: "false"
      - name: DD_ENABLE_PAYLOADS_SERIES
        value: "false"
      - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
        value: "false"
      - name: DD_ENABLE_PAYLOADS_SKETCHES
        value: "false"
```

{{% /tab %}}
{{< /tabs >}}