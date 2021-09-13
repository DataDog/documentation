---
title: Tracer des applications Docker
kind: Documentation
aliases:
  - /fr/tracing/docker/
  - /fr/tracing/setup/docker/
  - /fr/agent/apm/docker
further_reading:
  - link: https://github.com/DataDog/datadog-agent/tree/master/pkg/trace
    tag: Github
    text: Code source
  - link: /integrations/amazon_ecs/#collecte-de-traces
    tag: Documentation
    text: Tracer vos applications ECS
  - link: /agent/docker/log/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/docker/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/docker/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
---
Activez l'Agent de trace dans le conteneur  `gcr.io/datadoghq/agent` en transmettant `DD_APM_ENABLED=true` en tant que variable d'environnement.

## Tracing depuis le host

Ajoutez l'option `-p 127.0.0.1:8126:8126/tcp` à la commande `docker run` pour bénéficier du tracing sur le port `8126/tcp` depuis _votre host uniquement_.

Pour profiter du tracing depuis _tous les hosts_, utilisez plutôt la commande `-p 8126:8126/tcp`.

Par exemple, la commande suivante permet à l'Agent de recevoir des traces depuis votre host uniquement :

{{< tabs >}}
{{% tab "Linux" %}}

{{< site-region region="us" >}} 
```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}
{{< site-region region="us3,eu,gov" >}} 
```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<SITE_DATADOG> \
              gcr.io/datadoghq/agent:latest
```
Où `<SITE_DATADOG>` correspond à {{< region-param key="dd_site" code="true" >}}, pour que l'Agent envoie les données au bon site Datadog.
{{< /site-region >}}

{{% /tab %}}
{{% tab "Windows" %}}

{{< site-region region="us" >}} 
```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}
{{< site-region region="us3,eu,gov" >}} 
```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<SITE_DATADOG> \
              gcr.io/datadoghq/agent:latest
```
Où `<SITE_DATADOG>` correspond à {{< region-param key="dd_site" code="true" >}}, pour que l'Agent envoie les données au bon site Datadog.
{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

## Variables d'environnement de l'Agent APM Docker

Voici la liste de l'ensemble des variables d'environnements pour le tracing au sein de l'Agent Docker :

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Clé d'API Datadog][1]                                                                                                                                                                                                                                                                                                                                 |
| `DD_PROXY_HTTPS`           | Configure l'URL utilisée par le proxy.                                                                                                                                                                                                                                                                                                                 |
| `DD_APM_REPLACE_TAGS`      | [Nettoyez les données sensibles des tags de vos spans][2].                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REQUIRE`      | Définit les tags qui doivent être appliqués aux traces pour qu'elles soient envoyées à Datadog.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REJECT`      | Définit les tags de rejet. L'Agent ignore les traces qui comportent ces tags.       |
| `DD_HOSTNAME`              | Définit manuellement le hostname à utiliser pour les métriques si la détection automatique échoue, ou lors de l'exécution de l'Agent de cluster Datadog.                                                                                                                                                                                                                                        |
| `DD_DOGSTATSD_PORT`        | Définit le port DogStatsD.                                                                                                                                                                                                                                                                                                                              |
| `DD_APM_RECEIVER_SOCKET`   | Recueillez vos traces via un socket de domaine Unix afin de ne pas tenir compte du port et du hostname configurés, le cas échéant. Cette variable est désactivée par défaut. Si vous l'activez, vous devez indiquer un fichier de socket valide.                                                                                                                                                                       |
| `DD_BIND_HOST`             | Définit le hostname StatsD et le hostname du récepteur.                                                                                                                                                                                                                                                                                                                  |
| `DD_LOG_LEVEL`             | Définit le niveau de journalisation (`trace`, `debug`, `info`, `warn`, `error`, `critical` ou `off`).                                                                                                                                                                                                                                                                      |
| `DD_APM_ENABLED`           | Lorsque ce paramètre est défini sur `true`, l'Agent Datadog accepte les traces et les métriques de trace.                                                                                                                                                                                                                                                                                         |
| `DD_APM_CONNECTION_LIMIT`  | Définit la limite maximale de connexions sur un intervalle de 30 secondes. La limite par défaut est de 2 000 connexions.                                                                                                                                                                                                                                                    |
| `DD_APM_DD_URL`            | Définissez le endpoint de l'API Datadog sur l'adresse vers laquelle vos traces sont envoyées : `https://trace.agent.{{< region-param key="dd_site" >}}`. Valeur par défaut : `https://trace.agent.datadoghq.com`.                                                                                                                                                                                                                            |
| `DD_APM_RECEIVER_PORT`     | Port sur lequel le récepteur de traces de l'Agent Datadog effectue son écoute. Valeur par défaut : `8126`.                                                                                                                                                                                                                                                                    |
| `DD_APM_NON_LOCAL_TRAFFIC` | Autorise le trafic non local pour le [tracing depuis d'autres conteneurs](#tracing-depuis-d-autres-conteneurs).                                                                                                                                                                                                                                                        |
| `DD_APM_IGNORE_RESOURCES`  | Configurer les ressources que l'Agent doit ignorer. Utilisez des expressions régulières séparées par des virgules, par exemple : <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                                                |                                                                                                                                                                                                                                                                                        

## Tracing depuis d'autres conteneurs

Comme pour DogStatsD, les traces peuvent être envoyées à l'Agent depuis d'autres conteneurs via les [réseaux Docker](#reseau-docker) ou l'[IP de host Docker](#ip-de-host).

### Réseau Docker

Commencez par créer un pont défini par l'utilisateur :

```bash
docker network create <NOM_RÉSEAU>
```

Démarrez ensuite l'Agent et le conteneur de l'application, connectés au réseau précédemment créé :

{{< tabs >}}
{{% tab "Standard" %}}
{{< site-region region="us" >}} 
```bash
# Agent Datadog
docker run -d --name datadog-agent \
              --network <NOM_RÉSEAU> \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NOM_RÉSEAU> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
{{< /site-region >}}
{{< site-region region="us3,eu,gov" >}}

```bash
# Agent Datadog
docker run -d --name datadog-agent \
              --network <NOM_RÉSEAU> \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<SITE_DATADOG> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NOM_RÉSEAU> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

Où `<SITE_DATADOG>` correspond à {{< region-param key="dd_site" code="true" >}}, pour que l'Agent envoie les données au bon site Datadog.
{{< /site-region >}}
{{% /tab %}}
{{% tab "Windows" %}}
{{< site-region region="us" >}} 

```bash
# Agent Datadog
docker run -d --name datadog-agent \
              --network "<NOM_RÉSEAU>" \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network "<NOM_RÉSEAU>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
{{< /site-region >}}
{{< site-region region="us3,eu,gov" >}} 
```bash
# Agent Datadog
docker run -d --name datadog-agent \
              --network "<NOM_RÉSEAU>" \
              -e DD_API_KEY=<CLÉ_API_DATADOG> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<SITE_DATADOG> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network "<NOM_RÉSEAU>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
Où `<SITE_DATADOG>` correspond à {{< region-param key="dd_site" code="true" >}}, pour  que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}
{{% /tab %}}
{{< /tabs >}}

Cela expose le hostname `datadog-agent` dans votre conteneur `app`.
Si vous utilisez `docker-compose`, les paramètres `<NOM_RÉSEAU>` correspondent aux paramètres définis dans la section `networks` de votre fichier `docker-compose.yml`.

Vos traceurs d'application doivent être configurés afin d'envoyer des traces à cette adresse. Définissez les variables d'environnement en configurant `DD_AGENT_HOST` sur le nom du conteneur de l'Agent et `DD_TRACE_AGENT_PORT` sur le port des traces de l'Agent dans vos conteneurs d'application. L'exemple ci-dessus utilise le host `datadog-agent` et le port `8126` (il s'agit de la valeur par défaut ; vous n'avez donc pas besoin de la définir).

Vous pouvez également consulter les exemples ci-dessous pour définir manuellement le host de l'Agent dans chaque langage pris en charge.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Mettez à jour la configuration de l'Agent Java avec des variables d'environnement :

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/chemin/vers/l/agent-java-dd.jar -jar /votre/app.jar
```

ou avec des propriétés système :

```bash
java -javaagent:/chemin/vers/l/agent-java-dd.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /votre/app.jar
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
Datadog.configure do |c|
  c.tracer hostname: 'datadog-agent',
           port: 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Définissez les variables d'environnement avant le lancement de votre application instrumentée :

```bash
# Variables d'environnement
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Pour les conteneurs
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Démarrer votre application
dotnet example.dll
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### IP de host Datadog

Le port de conteneur de l'Agent `8126` doit être associé directement au host.
Configurez votre traceur d'application afin d'indiquer l'itinéraire par défaut de ce conteneur (utilisez la commande `ip route`).

L'exemple suivant est basé sur le traceur Python et part du principe que `172.17.0.1` est votre itinéraire par défaut :

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /fr/tracing/guide/security/#replace-rules