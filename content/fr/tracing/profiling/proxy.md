---
title: Configuration d'un proxy pour le profiling
kind: Documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: Blog
    text: Présentation du profiling permanent en production dans Datadog.
---
Les profils collectés par les profileurs de Datadog sont directement transmis de votre application à Datadog. Si vous souhaitez faire appel à un proxy pour le trafic sortant, utilisez les arguments de configuration suivants.

## Arguments de configuration des profileurs

{{< tabs >}}
{{< tab "Java" >}}

| Arguments                       | Variable d'environnement        | Description                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------ |
| `-Ddd.profiling.proxy.host`     | DD_PROFILING_PROXY_HOST     | Host de votre proxy (`my-proxy.example.com`).    |
| `-Ddd.profiling.proxy.port`     | DD_PROFILING_PROXY_PORT     | Port utilisé par votre proxy. `8080` est le port par défaut. |
| `-Ddd.profiling.proxy.username` | DD_PROFILING_PROXY_USERNAME | Nom d'utilisateur utilisé par votre proxy.                     |
| `-Ddd.profiling.proxy.password` | DD_PROFILING_PROXY_PASSWORD | Mot de passe utilisé par votre proxy.                     |

{{< /tab >}}
{{< /tabs >}}

## Endpoints de profils Datadog

Tous les profils collectés par les profileurs de Datadog sont envoyés aux endpoints de profils suivants :

{{< site-region region="us" >}}

| Site Datadog | Endpoint                               |
| ------------ | -------------------------------------- |
| Site américain      | `https://intake.profile.datadoghq.com` |

Ces domaines sont des entrées CNAME qui pointent vers un ensemble d'adresses IP statiques. Vous pouvez trouver ces adresses sur la page [https://ip-ranges.datadoghq.com][1] pour le site américain de Datadog.


{{< /site-region >}}

{{< site-region region="eu" >}}

| Site Datadog | Endpoint                               |
| ------------ | -------------------------------------- |
| Site européen      | `https://intake.profile.datadoghq.eu`  |

Ces domaines sont des entrées CNAME qui pointent vers un ensemble d'adresses IP statiques. Vous pouvez trouver ces adresses sur la page [https://ip-ranges.datadoghq.eu][2] pour le site européen de Datadog.


{{< /site-region >}}

Consultez le [guide sur la configuration réseau de l'Agent][3] pour découvrir comment les informations sont structurées dans le JSON fourni.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com
[2]: https://ip-ranges.datadoghq.eu
[3]: /fr/agent/guide/network/