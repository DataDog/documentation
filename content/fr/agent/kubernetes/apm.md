---
title: Collecte de traces Kubernetes
kind: documentation
aliases:
  - /fr/agent/kubernetes/apm
further_reading:
  - link: /agent/kubernetes/log/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/kubernetes/prometheus/
    tag: Documentation
    text: Recueillir vos métriques Prometheus
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un sous-ensemble de conteneurs
  - link: /agent/kubernetes/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données envoyées par un conteneur
---
Pour commencer à recueillir les traces de votre application, vous devez [exécuter l'Agent Datadog dans votre cluster Kubernetes][1].

## Configuration

 Pour activer la collecte de traces avec l'Agent, suivez les instructions ci-dessous :

1. **Configurez l'Agent Datadog pour qu'il accepte les traces** :
    {{< tabs >}}
{{% tab "Helm" %}}

- Si vous ne l'avez pas déjà fait, [installez][1] le chart Helm.
- Mettez à jour votre fichier `values.yaml` avec la configuration d'APM suivante :
    ```yaml
    datadog:
      ## @param apm - object - required
      ## Enable apm agent and provide custom configs
      #
      apm:
        ## @param enabled - boolean - optional - default: false
        ## Enable this to enable APM and tracing, on port 8126
        #
        enabled: true
    ```

 - Définissez votre système d'exploitation. Indiquez `targetSystem: linux` ou `targetSystem: windows` en haut de votre fichier `values.yaml`.

 - Ensuite, mettez à jour votre chart Helm Datadog à l'aide de la commande suivante : `helm upgrade -f values.yaml <NOM DE VERSION> stable/datadog`. N'oubliez pas de définir la clé d'API dans le fichier YAML. Si vous n'avez pas défini votre système d'exploitation dans `values.yaml`, ajoutez `--set targetSystem=linux` ou `--set targetSystem=windows` à cette commande.

[1]: /fr/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour activer la collecte de traces APM, ouvre le fichier de configuration DaemonSet et modifiez les éléments suivants :

- Autorisez la réception de données sur le port `8126` (transmission du trafic du host à l'Agent) :

    ```yaml
     # (...)
          ports:
            # (...)
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
     # (...)
    ```

- **Si vous utilisez une ancienne version de l'Agent (7.17 ou antérieure)**, en plus des étapes ci-dessus, vous devez définir les variables `DD_APM_NON_LOCAL_TRAFFIC` et `DD_APM_ENABLED` sur `true` dans la section *env* du manifeste de l'Agent `datadog.yaml` :

    ```yaml
     # (...)
          env:
            # (...)
            - name: DD_APM_ENABLED
              value: 'true'
            - name: DD_APM_NON_LOCAL_TRAFFIC
              value: "true"
     # (...)
    ```

{{% /tab %}}
{{< /tabs >}}
   **Remarque** : si vous utilisez Minikube, vous recevrez peut-être l'erreur `Unable to detect the kubelet URL automatically`. Dans ce cas, définissez `DD_KUBELET_TLS_VERIFY=false`.

2. **Configurez les pods de votre application pour qu'ils récupèrent l'IP du host afin de communiquer avec l'Agent Datadog** : utilisez l'API Downward pour récupérer l'IP du host. Le conteneur de l'application requiert la variable d'environnement `DD_AGENT_HOST` qui pointe vers `status.hostIP`.

    ```yaml
        apiVersion: apps/v1
        kind: Deployment
         # ...
            spec:
              containers:
              - name: "<CONTAINER_NAME>"
                image: "<CONTAINER_IMAGE>"/"<TAG>"
                env:
                  - name: DD_AGENT_HOST
                    valueFrom:
                      fieldRef:
                        fieldPath: status.hostIP
    ```

3. **Configurez vos traceurs d'application pour qu'ils envoient des traces** : indiquez aux traceurs d'application l'emplacement où le host de l'Agent Datadog utilise la variable d'environnement `DD_AGENT_HOST`. Consultez la [documentation sur l'APM propre à votre langage][2] pour obtenir davantage d'exemples.

## Variables d'environnement de l'Agent

**Remarque **: Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][1].

Voici la liste de l'ensemble des variables d'environnements pour le tracing au sein de l'Agent lors de l'exécution dans Kubernetes :

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Clé d'API Datadog][2]                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Configure l'URL utilisée par le proxy.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Nettoyer les données sensibles des tags de vos spans][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Définit manuellement le hostname à utiliser pour les métriques si la détection automatique échoue, ou lors de l'exécution de l'Agent de cluster Datadog.                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | Définit le port DogStatsD.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Recueillez vos traces via un socket de domaine Unix afin de ne pas tenir compte du port et du hostname configurés, le cas échéant. Cette variable est désactivée par défaut. Si vous l'activez, vous devez indiquer un fichier de socket valide.                                                                                                                                            |
| `DD_BIND_HOST`             | Définit le hostname StatsD et le hostname du récepteur.                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | Définit le niveau de journalisation (`trace`, `debug`, `info`, `warn`, `error`, `critical` ou `off`).                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | Lorsque ce paramètre est défini sur `true`, l'Agent Datadog accepte les métriques de trace. La valeur par défaut est `true` (Agent 7.18+)                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | Définit la limite maximale de connexion pour un intervalle de 30 secondes.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | Endpoint de l'API Datadog vers lequel les traces sont envoyées. Pour le site européen de Datadog, définissez `DD_APM_DD_URL` sur `https://trace.agent.datadoghq.eu`.                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | Port sur lequel le récepteur de traces de l'Agent Datadog effectue son écoute. Valeur par défaut : `8126`.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | Autorise le trafic non local pour le tracing depuis d'autres conteneurs. La valeur par défaut est `true` (Agent 7.18+)                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Configurer les ressources que l'Agent doit ignorer. Utilisez des expressions régulières séparées par des virgules, par exemple : <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                                          |
| `DD_APM_ANALYZED_SPANS`    | Configurez les spans à analyser pour les transactions. Utilisez des instances de <code>\<NOM_SERVICE>\|;\<NOM_OPÉRATION>=1</code> séparées par des virgules, par exemple : <code>my-express-app\|;express.request=1,my-dotnet-app\|;aspnet_core_mvc.request=1</code>. Vous pouvez également [l'activer automatiquement][5] à l'aide du paramètre de configuration dans le client de tracing. |
| `DD_ENV`               | Définit le paramètre `env` global pour toutes les données émises par l'Agent. Si `env` n'est pas présent dans vos données de trace, cette variable sera utilisée. Consultez [Configuration de l'environnement APM][6] pour en savoir plus.                                                                                                                                                                                                                                                                         |
| `DD_APM_MAX_EPS`           | Définit le nombre maximum de spans analysées par seconde. La valeur par défaut est de 200 événements par seconde.                                                                                                                                                                                                                                               |
| `DD_APM_MAX_TPS`           | Définit le nombre maximum de traces par seconde. La valeur par défaut est de 10 traces par seconde.                                                                                                                                                                                                                                                        |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/
[2]: /fr/tracing/setup/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/tracing/guide/security/#replace-rules
[5]: /fr/tracing/app_analytics/#automatic-configuration
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment