---
aliases:
- /fr/tracing/docker/
- /fr/tracing/setup/docker/
- /fr/agent/apm/docker
- /fr/agent/docker/apm
description: Configurez la collecte de traces APM pour les applications s'exécutant
  dans des conteneurs Docker en utilisant l'Agent Datadog
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: Code source
  text: Code source
- link: /integrations/amazon_ecs/#trace-collection
  tag: Documentation
  text: Tracer vos applications ECS
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/docker/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Tracer des applications Docker
---
À partir de l'Agent 6.0.0, le Trace Agent est activé par défaut. S'il a été désactivé, vous pouvez le réactiver dans le `registry.datadoghq.com/agent` conteneur en passant `DD_APM_ENABLED=true` comme variable d'environnement.

Les commandes CLI sur cette page concernent le runtime Docker. Remplacez `docker` par `nerdctl` pour le runtime containerd, ou `podman` pour le runtime Podman.

<div class="alert alert-info">Si vous collectez des traces d'une application conteneurisée (votre Agent et votre application s'exécutant dans des conteneurs séparés), en alternative aux instructions suivantes, vous pouvez injecter automatiquement le SDK dans votre application. Lisez <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">Injecting Libraries</a> pour les instructions.</div>

## Traçage depuis l'hôte {#tracing-from-the-host}

Le traçage est disponible sur le port `8126/tcp` depuis _votre hôte uniquement_ en ajoutant l'option `-p 127.0.0.1:8126:8126/tcp` à la commande `docker run`.

Pour le rendre disponible depuis _n'importe quel hôte_, utilisez `-p 8126:8126/tcp` à la place.

Par exemple, la commande suivante permet à l'Agent de recevoir des traces depuis votre host uniquement :

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
Où se trouve votre `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (par défaut `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
Où se trouve votre `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (par défaut `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

## Variables d'environnement de l'Agent APM Docker {#docker-apm-agent-environment-variables}

Utilisez les variables d'environnement suivantes pour configurer le traçage pour l'Agent Docker. Voir le [fichier d'exemple `config_template.yaml`][8] pour plus de détails.

`DD_API_KEY`                      
:  requis - _chaîne_
<br/>Votre [clé API Datadog][1].

`DD_SITE`
:  optionnel - _chaîne_
<br/>Votre [site Datadog][7]. Définissez ceci sur `{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                   
: optionnel - _Booléen_ - **par défaut**: `true`
<br/>Lorsqu'il est défini sur `true` (par défaut), l'Agent Datadog accepte les traces et les métriques de trace.

`DD_APM_RECEIVER_PORT`             
: optionnel - _entier_ - **par défaut**: `8126` 
<br/>Définit le port sur lequel le récepteur de traces de l'Agent Datadog écoute. Définissez `0` pour désactiver le récepteur HTTP.

`DD_APM_RECEIVER_SOCKET`           
: optionnel - _chaîne_
<br/>Pour collecter vos traces via des sockets de domaine UNIX, fournissez le chemin vers le socket UNIX. S'il est défini, cela prend la priorité sur la configuration du nom d'hôte et du port, et doit pointer vers un fichier de socket valide. 

`DD_APM_NON_LOCAL_TRAFFIC`         
: optionnel - _Booléen_ - **par défaut**: `false`
<br/>Lorsqu'il est défini sur `true`, l'Agent Datadog écoute le trafic non local. Si vous [tracez depuis d'autres conteneurs](#tracing-from-other-containers), définissez cette variable d'environnement sur `true`. 

`DD_APM_DD_URL`                    
: optionnel - _chaîne_
<br/>Pour utiliser un proxy pour APM, fournissez le point de terminaison et le port comme `<ENDPOINT>:<PORT>`. Le proxy doit être capable de gérer les connexions TCP.

`DD_APM_CONNECTION_LIMIT`          
: requis - _entier_ - **par défaut**: `2000`
<br/>Définit le nombre maximum de connexions APM pour une fenêtre de temps de 30 secondes. Voir [Limites de taux de l'Agent][6] pour plus de détails.

`DD_APM_IGNORE_RESOURCES`          
: optionnel - _[chaîne]_ 
<br/>Fournit une liste d'exclusion de ressources que l'Agent Datadog doit ignorer. Si le nom de la ressource d'une trace correspond à une ou plusieurs des expressions régulières de cette liste, la trace n'est pas envoyée à Datadog. 
<br/>Exemple: `"GET /ignore-me","(GET\|POST) and-also-me"`.                                                                                                                                                                                                                                                                                   

`DD_APM_FILTER_TAGS_REQUIRE`       
: optionnel - _objet_
<br/>Définit des règles pour le filtrage des traces basé sur des tags. Pour être envoyées à Datadog, les traces doivent avoir ces tags. Voir [Ignorer les ressources indésirables dans APM][5]. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: optionnel - _objet_
<br/>Pris en charge dans l'Agent 7.49+. Définit des règles pour le filtrage des traces basé sur des tags avec des expressions régulières. Pour être envoyées à Datadog, les traces doivent avoir des tags qui correspondent à ces motifs regex. 

`DD_APM_FILTER_TAGS_REJECT`        
: optionnel - _objet_ 
<br/>Définit des règles pour le filtrage des traces basé sur des tags. Si une trace a ces tags, elle n'est pas envoyée à Datadog. Voir [Ignorer les ressources indésirables dans APM][5] pour plus de détails. 

`DD_APM_FILTER_TAGS_REGEX_REJECT`  
: optionnel - _objet_ 
<br/>Pris en charge dans l'Agent 7.49+. Définit des règles pour le filtrage des traces basé sur des tags avec des expressions régulières. Si une trace a des tags qui correspondent à ces motifs regex, elle n'est pas envoyée à Datadog. 

`DD_APM_REPLACE_TAGS`              
: optionnel - _[objet]_ 
<br/>Définit un ensemble de règles pour [remplacer ou supprimer des tags contenant potentiellement des informations sensibles][2].

`DD_HOSTNAME`                      
: optionnel - _chaîne_ - **par défaut** : détecté automatiquement 
<br/>Définit le nom d'hôte à utiliser pour les métriques si la détection automatique du nom d'hôte échoue, ou lors de l'exécution du Datadog Cluster Agent.

`DD_DOGSTATSD_PORT`                
: optionnel - _entier_ - **par défaut** : `8125` 
<br/>Définit le port DogStatsD.

`DD_PROXY_HTTPS`                   
: optionnel - _chaîne_
<br/>Pour utiliser un [proxy][4] pour se connecter à Internet, fournissez l'URL. 

`DD_BIND_HOST`                     
: optionnel - _chaîne_ - **par défaut** : `localhost` 
<br/>Définit l'hôte sur lequel écouter pour DogStatsD et les traces.

`DD_LOG_LEVEL`                     
: optionnel - _chaîne_ - **par défaut** : `info` 
<br/>Définit le niveau de journalisation minimal. Options valides : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`.

##  Traçage depuis d'autres conteneurs {#tracing-from-other-containers}

Comme avec DogStatsD, les traces peuvent être envoyées à l'Agent depuis d'autres conteneurs soit en utilisant [ les réseaux Docker ](#docker-network) soit avec [ l'IP hôte Docker ](#docker-host-ip).

### Réseau Docker {#docker-network}

Commencez par créer un pont définir par l'utilisateur :

```bash
docker network create <NETWORK_NAME>
```

Les commandes CLI sur cette page concernent le runtime Docker. Remplacez `docker` par `nerdctl` pour le runtime containerd, ou `podman` pour le runtime Podman.

Démarrez ensuite l'Agent et le conteneur de l'application, connectés au réseau précédemment créé :

{{< tabs >}}
{{% tab "Standard" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

Où se trouve votre `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (par défaut `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
Où se trouve votre `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (par défaut `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

Cela expose le nom d'hôte `datadog-agent` dans votre conteneur `app`.
Si vous utilisez `docker-compose`, les paramètres `<NETWORK_NAME>` sont ceux définis dans la section `networks` de votre `docker-compose.yml`.

Vos SDK d'application doivent être configurés pour soumettre des traces à cette adresse. Définissez les variables d'environnement avec `DD_AGENT_HOST` comme nom du conteneur Agent, et `DD_TRACE_AGENT_PORT` comme port de trace de l'Agent dans vos conteneurs d'application. L'exemple ci-dessus utilise l'hôte `datadog-agent` et le port `8126` (la valeur par défaut, donc vous n'avez pas à le définir).

Vous pouvez également consulter les exemples ci-dessous pour définir manuellement le host de l'Agent dans chaque langage pris en charge.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Mettez à jour la configuration de l'Agent Java avec des variables d'environnement :

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

ou avec des propriétés système :

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
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
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

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

Définissez les variables d'environnement avant d'exécuter l'application instrumentée :

```bash
# Environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# For containers
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Start your application
dotnet example.dll
```

La valeur de la variable d'environnement `CORECLR_PROFILER_PATH` varie en fonction du système sur lequel l'application s'exécute :

   Valeur de | CORECLR_PROFILER_PATH
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64 | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64 | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64 | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86 | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

Dans le tableau ci-dessus, `<APP_DIRECTORY>` fait référence au répertoire contenant les fichiers `.dll` de l'application.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### IP de l'hôte Docker {#docker-host-ip}

Le port du conteneur Agent `8126` doit être lié directement à l'hôte.
Configurez votre traceur d'application pour signaler à la route par défaut de ce conteneur (déterminez cela en utilisant la commande `ip route`).

Ce qui suit est un exemple pour le Traceur Python, en supposant que `172.17.0.1` est la route par défaut :

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Socket de domaine Unix (UDS) {#unix-domain-socket-uds}
Pour soumettre des traces via socket, le socket doit être monté sur le conteneur Agent et votre conteneur d'application.

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

Référez-vous à la [documentation d'instrumentation APM spécifique au langage][3] pour les paramètres du traceur.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/tracing/configure_data_security/#replace-tags
[3]: /fr/tracing/setup/
[4]: /fr/agent/proxy
[5]: /fr/tracing/guide/ignoring_apm_resources/
[6]: /fr/tracing/troubleshooting/agent_rate_limits
[7]: /fr/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml