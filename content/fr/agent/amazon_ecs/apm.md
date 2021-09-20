---
title: Tracing d'applications ECS
kind: Documentation
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/amazon_ecs/tags/
    tag: Documentation
    text: Attribuer des tags à toutes les données envoyées par un conteneur
---
## Configuration

Après avoir suivi les [instructions d'installation de l'agent Amazon ECS][1], activez la collecte de traces en suivant les instructions ci-dessous.

1. Configurez les paramètres suivants dans la définition de tâche pour le conteneur `gcr.io/datadoghq/agent`. Définissez le port du host/conteneur `portMappings` sur `8126` avec le protocole `tcp` :

    {{< code-block lang="json" >}}
containerDefinitions": [
  {
    "name": "datadog-agent",
    "image": "gcr.io/datadoghq/agent:latest",
    "cpu": 100,
    "memory": 256,
    "essential": true,
    "portMappings": [
      {
        "hostPort": 8126,
        "protocol": "tcp",
        "containerPort": 8126
      }
    ],
    ...
  {{< /code-block >}}

    {{< site-region region="us3,eu,gov" >}} 
  Pour vous assurer que l'Agent envoie les données au bon site Datadog, définissez la variable d'environnement suivante, où `<SITE_DATADOG>` correspond à {{< region-param key="dd_site" code="true" >}} :

  ```json
  "environment": [
       ...
     {
       "name": "DD_SITE",
       "value": "<DATADOG_SITE>"
     },
     ...
     ]
   ...
  ```
  {{< /site-region >}}
  Si vous utilisez l'**Agent v7.17 ou une version inférieure**, ajoutez les variables d'environnement suivantes :
   ```json
   "environment": [
        ...
      {
        "name": "DD_APM_ENABLED",
        "value": "true"
      },
      {
        "name": "DD_APM_NON_LOCAL_TRAFFIC",
        "value": "true"
      },
      ...
      ]
   ...
   ```

    [Consulter l'ensemble des variables d'environnement disponibles pour la collecte de traces via l'Agent][1].

2. Attribuez l'adresse IP privée utilisée par chaque instance sous-jacente sur laquelle vos conteneurs sont exécutés dans votre conteneur d'application à la variable d'environnement `DD_AGENT_HOST`. Les traces de votre application seront ainsi transmises à l'Agent.

{{< tabs >}}
{{% tab "Endpoint de métadonnées EC2" %}}

L'[endpoint de métadonnées EC2 d'Amazon][1] permet de découvrir des adresses IP privées. Pour obtenir l'adresse IP privée de chaque host, effectuez un curl sur l'URL suivante :

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}


[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
{{% /tab %}}
{{% tab "Fichier de métadonnées des conteneurs ECS" %}}

Le [fichier de métadonnées des conteneurs ECS d'Amazon][1] permet de découvrir des adresses IP privées. Pour obtenir l'adresse IP de chaque host, exécutez la commande suivante :

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq .HostPrivateIPv4Address
{{< /code-block >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

Définissez le résultat comme la variable d'environnement de hostname de votre Agent de trace pour chaque conteneur d'application qui transmet des traces à l'APM :

{{< code-block lang="curl" >}}
os.environ['DD_AGENT_HOST'] = <IP_PRIVÉE_EC2>
{{< /code-block >}}



## Variables au moment du lancement

Si les variables de votre application ECS sont définies au moment du lancement, vous **devez** définir le hostname en tant que variable d'environnement avec `DD_AGENT_HOST`. Vous pouvez également définir le hostname dans le code source de votre application pour Python, Javascript ou Ruby. Pour Java et .NET, vous pouvez définir le hostname dans la tâche ECS. Par exemple :

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/python/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
        bodyBytes, err := ioutil.ReadAll(resp.Body)
        host := string(bodyBytes)
  if err == nil {
        //set the output of the curl command to the DD_Agent_host env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Copiez ce script dans le champ `entryPoint` de votre définition de tâche ECS en mettant à jour les valeurs avec le fichier JAR et les flags d'argument de votre application.

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <APPLICATION_ARG_FLAGS> -jar <APPLICATION_JAR_FILE/WAR_FILE>"
]
```

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/java/#change-agent-hostname
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); php-fpm -F"  
]
```

#### Apache

Pour Apache et `mod_php` dans VirtualHost ou dans un fichier de configuration de serveur, utilisez `PassEnv` pour définir `DD_AGENT_HOST` ainsi que d'autres variables d'environnement. Vous pouvez notamment définir les variables de [tagging de service unifié][1] indiquées dans l'exemple suivant :

```
PassEnv DD_AGENT_HOST
PassEnv DD_SERVICE
PassEnv DD_ENV
PassEnv DD_VERSION
```

#### FPM PHP

Lorsque le paramètre ini est défini sur `clear_env=on`, vous devez également configurer des variables d'environnement dans le fichier de workers du pool `www.conf`, afin qu'ils puissent être lus à partir du host. Profitez-en pour définir `DD_AGENT_HOST` ainsi que d'autres variables d'environnement. Vous pouvez notamment définir les variables de [tagging de service unifié][1] indiquées dans l'exemple suivant :

```
env[DD_AGENT_HOST] = $DD_AGENT_HOST
env[DD_SERVICE] = $DD_SERVICE
env[DD_ENV] = $DD_ENV
env[DD_VERSION] = $DD_VERSION
```



[1]: https://docs.datadoghq.com/fr/getting_started/tagging/unified_service_tagging/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/amazon_ecs/