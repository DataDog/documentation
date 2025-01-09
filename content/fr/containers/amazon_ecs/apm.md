---
aliases:
- /fr/agent/amazon_ecs/apm
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/tags/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Tracing d'applications ECS
---

## Présentation

Pour recueillir des traces à partir de vos conteneurs ECS, mettez à jour les définitions de tâche à la fois pour votre Agent et pour le conteneur de votre application, comme décrit ci-dessous.

Une manière de procéder consiste à modifier le [fichier de définition de tâche][4] utilisé précédemment et à [enregistrer votre définition de tâche modifiée][5]. Vous pouvez également modifier la définition de tâche directement depuis l'interface Web Amazon.

Une fois la collecte activée, le conteneur de l'Agent Datadog recueille les traces générées par les autres conteneurs d'application sur le même host.

## Configurer l'Agent Datadog pour qu'il accepte les traces
1. Pour recueillir toutes les traces à partir de vos conteneurs ECS exécutés, mettez à jour la définition de tâche de votre Agent issue de la [configuration ECS d'origine][6] en spécifiant la configuration ci-dessous.

   Utilisez [datadog-agent-ecs-apm.json][3] comme modèle de référence pour connaître la configuration de base requise. Dans la définition de tâche du conteneur de l'Agent Datadog, sous la section `portMappings`, définissez le port du host et le port du conteneur sur `8126` avec le protocole `tcp`.

    ```json
    {
      "containerDefinitions": [
        {
          "name": "datadog-agent",
          "image": "public.ecr.aws/datadog/agent:latest",
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
          (...)
        }
      ]
    }
    ```

2. Si vous utilisez l'**Agent v7.17 ou une version inférieure**, ajoutez les variables d'environnement suivantes :
    ```json
    "environment": [
      (...)
      {
        "name": "DD_APM_ENABLED",
        "value": "true"
      },
      {
        "name": "DD_APM_NON_LOCAL_TRAFFIC",
        "value": "true"
      }
    ]
    ```

3. Si vous mettez à jour un fichier local pour la définition de tâche de votre Agent, [enregistrez votre définition de tâche modifiée][5]. Cette opération entraînera la création d'une révision. Vous pourrez ensuite ajouter une référence à cette nouvelle révision dans le service daemon de l'Agent Datadog.

## Configurer le conteneur de votre application pour qu'il transmette les traces à l'Agent Datadog

### Installer la bibliothèque de tracing
Suivez les [instructions d'installation de la bibliothèque de tracing Datadog][2] correspondant au langage de votre application. Pour ECS, installez le traceur au niveau de l'image du conteneur de votre application.

### Spécifier l'adresse IP privée pour l'instance EC2
Communiquez au traceur l'adresse IP privée de l'instance EC2 sous-jacente sur laquelle le conteneur de l'application s'exécute. Cette adresse correspond au hostname de l'endpoint du traceur. Le conteneur de l'Agent Datadog présent sur le même host (avec le port du host activé) reçoit ces traces.

Utilisez l'une des méthodes suivantes pour obtenir l'adresse IP privée de façon dynamique :

{{< tabs >}}
{{% tab "Endpoint de métadonnées EC2" %}}

L'[endpoint de métadonnées EC2 d'Amazon (IMDSv1)][1] permet de découvrir des adresses IP privées. Pour obtenir l'adresse IP privée de chaque host, effectuez un curl sur l'URL suivante :

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}

Si vous utilisez le [Service des métadonnées d'instance Version 2 (IMDSv2)][2] :

{{< code-block lang="curl" >}}
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
{{% /tab %}}
{{% tab "Fichier de métadonnées des conteneurs ECS" %}}

Le [fichier de métadonnées des conteneurs ECS d'Amazon][1] permet de découvrir des adresses IP privées. Pour obtenir l'adresse IP de chaque host, exécutez la commande suivante :

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq -r .HostPrivateIPv4Address
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

Communiquez le résultat de cette requête au traceur en définissant la variable d'environnement `DD_AGENT_HOST` pour chaque conteneur d'application qui transmet des traces.

### Configurer l'endpoint de l'Agent de trace

Si les variables de votre application ECS sont définies au moment du lancement (Java, .NET et PHP), vous **devez** définir le hostname de l'endpoint du traceur en tant que variable d'environnement avec `DD_AGENT_HOST` à l'aide d'une des méthodes décrites ci-dessus. L'exemple ci-dessous utilise l'endpoint de métadonnées IMDSv1, mais une autre méthode peut être utilisée au besoin. Si vous utilisez un script de lancement comme point d'entrée, incluez cet appel dans le script. Sinon, ajoutez-le à la section `entryPoint` de la définition de tâche ECS.

Avec certains langages (Python, JavaScript, Ruby et Go), vous pouvez également définir le hostname dans le code source de votre application.

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `<commande de lancement Python>` :

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement Python>"
]
```
Pour Python, la commande de lancement correspond généralement à `ddtrace-run python my_app.py`. Elle peut toutefois varier en fonction du framework utilisé, notamment lorsque vous utilisez [uWSGI][1] ou que vous instrumentez votre [code manuellement avec `patch_all`][2].

#### Code
Vous pouvez également mettre à jour votre code afin que le traceur définisse le hostname de façon explicite :

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#uwsgi
[2]: https://ddtrace.readthedocs.io/en/stable/basic_usage.html#patch-all
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `<commande de lancement Node.js>` :
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement Node.js>"
]
```

#### Code
Vous pouvez également mettre à jour votre code afin que le traceur définisse le hostname de façon explicite :

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `<Commande de lancement Ruby>` :
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement Ruby>"
]
```

#### Code
Vous pouvez également mettre à jour votre code afin que le traceur définisse le hostname de façon explicite :

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `<Commande de lancement Go>` :

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement Go>"
]
```

#### Code
Vous pouvez également mettre à jour votre code afin que le traceur définisse le hostname de façon explicite :

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
    bodyBytes, err := ioutil.ReadAll(resp.Body)
    host := string(bodyBytes)
    if err == nil {
        // définir la sortie de la commande curl avec la variable d'environnement DD_AGENT_HOST
        os.Setenv("DD_AGENT_HOST", host)
        // indiquer à l'Agent de trace le host défini
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
    }
    //...
}
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `<Commande de lancement Java>` :

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement Java>"
]
```
La commande de lancement Java doit inclure votre `-javaagent:/chemin/vers/dd-java-agent.jar`. Pour obtenir d'autres exemples, reportez-vous à la [documentation relative au tracing Java][1].

[1]: /fr/tracing/trace_collection/dd_libraries/java/?tab=containers#add-the-java-tracer-to-the-jvm
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit, en spécifiant votre `APP_PATH` s'il n'a pas été défini :

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

#### Variable au moment du lancement
Mettez à jour la section `entryPoint` de la définition de tâche comme suit :

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

#### IMDSv2
Si vous utilisez IMDSv2, la configuration `entryPoint` équivalente ressemble à ce qui suit. Remplacez `<Commande de lancement>` par la commande adéquate en fonction du langage utilisé, comme décrit dans les exemples ci-dessus.

```json
"entryPoint": [
  "sh",
  "-c",
  "export TOKEN=$(curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"); export DD_AGENT_HOST=$(curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/local-ipv4); <Commande de lancement>"
]
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/container/amazon_ecs/
[2]: /fr/tracing/trace_collection/
[3]: /resources/json/datadog-agent-ecs-apm.json
[4]: /fr/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[5]: /fr/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[6]: /fr/containers/amazon_ecs/?tab=awscli#setup