---
aliases:
- /fr/logs/faq/how-to-set-up-only-logs
title: Utiliser l'Agent Datadog pour la collecte de logs uniquement
---

<div class="alert alert-danger">
Pour configurer la collecte de logs sans métriques d'infrastructure, vous devez désactiver certaines charges utiles. Cette opération peut entraîner la perte de métadonnées et de tags pour les logs que vous recueillez. Datadog vous déconseille d'appliquer cette configuration. Pour en savoir plus sur ses répercussions, contactez <a href="/help/">l'assistance Datadog</a>.
</div>

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

[1]: /fr/agent/guide/agent-configuration-files/
[2]: /fr/logs/log_collection/
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Si vous utilisez l'Agent de conteneur, définissez les variables d'environnement `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` et `DD_ENABLE_PAYLOADS_SKETCHES` sur `false` en plus de la configuration de votre Agent :

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           -e DD_API_KEY=<CLÉ_API_DATADOG> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false
           -e DD_ENABLE_PAYLOADS_SERIES=false
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false
           -e DD_ENABLE_PAYLOADS_SKETCHES=false
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si votre Agent est déployé dans Kubernetes, définissez les variables d'environnement `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` et `DD_ENABLE_PAYLOADS_SKETCHES` sur `false` en plus de la configuration de votre Agent.

Définissez `DD_SITE` sur votre site Datadog : {{< region-param key="dd_site" code="true">}}.

```yaml
# datadog-agent.yaml

# Retirer la mise en commentaire de cette section pour configurer votre clé d'API Datadog à l'aide des secrets Kubernetes

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<CLÉ_API_ENCODÉE_EN_BASE64>"
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: gcr.io/datadoghq/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            ## Métriques custom via DogStatsD - retirer la mise en commentaire de cette section pour activer
            ## la collecte de métriques custom.
            ## Définir DD_DOGSTATSD_NON_LOCAL_TRAFFIC sur « true » pour recueillir les métriques StatsD
            ## issues d'autres conteneurs.
            ## hostPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          ## Configurer la clé d'API Datadog associée à votre organisation
          ## En cas d'utilisation du secret Kubernetes, utiliser la variable d'environnement suivante :
          ## {name: DD_API_KEY, valueFrom:{ secretKeyRef:{ name: datadog-secret, key: api-key }}
          - {name: DD_API_KEY, value: "<CLÉ_API_DATADOG>"}

          ## Définir DD_SITE sur votre site Datadog
          - {name: DD_SITE, value: "<VOTRE_SITE_DD>"}

          ## Chemin vers le socket Docker
          - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
          - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}

          ## Définir DD_DOGSTATSD_NON_LOCAL_TRAFFIC sur true pour activer la collecte StatsD.
          - {name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC, value: "false" }
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_COLLECT_KUBERNETES_EVENTS, value: "true" }
          - {name: DD_LEADER_ELECTION, value: "true" }
          - {name: DD_APM_ENABLED, value: "true" }

          ## Activer la collecte de logs
          - {name: DD_LOGS_ENABLED, value: "true"}
          - {name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL, value: "true"}
          - {name: DD_CONTAINER_EXCLUDE, value: "name:datadog-agent"}

          ## Envoyer uniquement des logs
          - {name: DD_ENABLE_PAYLOADS_EVENTS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERIES, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SKETCHES, value: "false"}

          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP

        ## Les valeurs ci-dessous correspondent aux minimums suggérés pour les requêtes et les limites.
        ## La quantité de ressources sollicitées par l'Agent dépend des éléments suivants :
        ## * Le nombre de checks
        ## * Le nombre d'intégrations activées
        ## * Le nombre de fonctionnalités activées
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocketdir, mountPath: /host/var/run}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: s6-run, mountPath: /var/run/s6}
          - {name: logpodpath, mountPath: /var/log/pods}
          - {name: pointdir, mountPath: /opt/datadog-agent/run}
          ## Répertoire du runtime Docker : remplacer ce chemin par celui du répertoire de vos logs
          ## de runtime de conteneur, ou supprimer cette configuration si `/var/log/pods`
          ## n'est pas un lien symbolique vers un autre répertoire.
          - {name: logcontainerpath, mountPath: /var/lib/docker/containers}
        livenessProbe:
          httpGet:
            path: /health
            port: 5555
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
      volumes:
        - {name: dockersocketdir, hostPath: {path: /var/run}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: logpodpath, hostPath: {path: /var/log/pods}}
        - {name: pointdir, hostPath: {path: /opt/datadog-agent/run}}
        ## Répertoire du runtime Docker : remplacer ce chemin par celui du répertoire de vos logs
        ## de runtime de conteneur, ou supprimer cette configuration si `/var/log/pods`
        ## n'est pas un lien symbolique vers un autre répertoire.
        - {name: logcontainerpath, hostPath: {path: /var/lib/docker/containers}}
```

{{% /tab %}}
{{< /tabs >}}