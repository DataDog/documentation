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

1. Configurez les paramètres suivants dans la définition de tâche pour le conteneur `datadog-agent`. Définissez le port du host/conteneur `portMappings` sur `8126` avec le protocole `tcp` :

    {{< code-block lang="json" >}}
    containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "cpu": 10,
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

    Si vous utilisez l'**Agent v7.17 ou une version inférieure**, ajoutez les variables d'environnement suivantes :

    {{< code-block lang="json" >}}
    ...
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
    {{< /code-block >}}

    [Consulter l'ensemble des variables d'environnement disponibles pour la collecte de traces via l'Agent][1].

2. Attribuez l'adresse IP privée utilisée par chaque instance sous-jacente sur laquelle vos conteneurs sont exécutés dans votre conteneur d'application à la variable d'environnement `DD_AGENT_HOST`. Les traces de votre application seront ainsi transmises à l'Agent. L'[endpoint de métadonnées d'Amazon EC2][2] peut être utilisé pour identifier l'adresse IP privée. Pour récupérer l'adresse IP privée de chaque host, effectuez un curl sur l'URL suivante :

    {{< code-block lang="curl" >}}
    curl http://169.254.169.254/latest/meta-data/local-ipv4
    {{< /code-block >}}

    Définissez le résultat comme la variable d'environnement de hostname de votre Agent de trace pour chaque conteneur d'application qui transmet des traces à l'APM :

    {{< code-block lang="curl" >}}
    os.environ['DD_AGENT_HOST'] = <IP_PRIVÉE_EC2>
    {{< /code-block >}}

## Variables au moment du lancement

Si les variables de votre application ECS sont définies au moment du lancement, vous **devez** définir le hostname en tant que variable d'environnement avec `DD_AGENT_HOST`. Vous pouvez également définir le hostname dans le code source de votre application pour Python, Javascript ou Ruby. Pour Java et .NET, vous pouvez définir le hostname dans la tâche ECS. Par exemple :

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
{{< /code-block >}}

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/python/#change-agent-hostname
{{% /tab %}}

{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace');
const request = require('request');

request('http://169.254.169.254/latest/meta-data/local-ipv4', function(
    error,
    resp,
    body
) {
    tracer.init({ hostname: body });
});
{{< /code-block >}}

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].

[1]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/#change-agent-hostname
{{% /tab %}}

{{% tab "Ruby" %}}

{{< code-block lang="ruby" >}}
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
{{< /code-block >}}

{{% /tab %}}

{{% tab "Go" %}}

{{< code-block lang="go" >}}
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
        // définir la sortie de la commande curl sur l'env DD_Agent_host
        os.Setenv("DD_AGENT_HOST", host)
        // indiquer à l'Agent de trace le host défini
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
{{< /code-block >}}

{{% /tab %}}

{{% tab "Java" %}}

Copiez ce script dans le champ `entryPoint` de votre définition de tâche ECS en mettant à jour les valeurs avec le fichier JAR et les flags d'argument de votre application.

{{< code-block lang="json" >}}
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <FLAGS_ARGUMENT_APPLICATION> -jar <FICHIER_JAR/FICHIER_WAR_APPLICATION>"
]
{{< /code-block >}}

Pour découvrir comment définir le hostname de l'Agent dans d'autres langages, consultez les exemples de la section [Modifier le hostname de l'Agent][1].

[1]: https://docs.datadoghq.com/fr/tracing/setup/java/#change-agent-hostname
{{% /tab %}}

{{% tab ".NET" %}}

{{< code-block lang="json" >}}
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/docker/apm/#docker-apm-agent-environment-variables
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html