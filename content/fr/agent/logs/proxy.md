---
title: Utilisation d'un proxy pour les logs avec l'Agent
kind: documentation
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
La collecte de logs nécessite la version >= 6.0 de l'Agent Datadog. Les versions antérieures de l'Agent n'incluent pas l'interface `Log collection`.

Par défaut, Datadog transmet les logs par TCP/SSL. Les logs n'utilisent donc pas les mêmes [paramètres de proxy][1] que les autres types de données, qui sont transmis par l'Agent Datadog en HTTPS.
Configurez l'Agent de façon à ce que les logs soient envoyés en HTTPS en utilisant les mêmes paramètres de proxy que ceux des autres types de données. 

{{< tabs >}}
{{% tab "TCP" %}}

Si vous utilisez un proxy pour les transmissions TCP, configurez l'Agent Datadog de façon à envoyer les logs à votre proxy via TCP en utilisant les paramètres suivants dans le fichier de configuration `datadog.yaml` :

```
logs_config:
  logs_dd_url: <ENDPOINT_PROXY>:<PORT_PROXY>
  logs_no_ssl: true
```

Les paramètres ci-dessus peuvent également être configurés avec les variables d'environnement suivantes :

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Remarque** : le paramètre `logs_no_ssl` est requis pour que l'Agent ignore la différence entre le hostname du certificat SSL (`agent-intake.logs.datadoghq.com` ou `agent-intake.logs.datadoghq.eu`) et le hostname de votre proxy. Nous vous conseillons d'utiliser une connexion chiffrée SSL entre votre proxy et l'endpoint d'admission de Datadog.

* Configurez ensuite votre proxy de façon à le faire écouter sur `<PORT_PROXY>` et à transférer les logs reçus vers :
    * Pour `app.datadoghq.com` : `agent-intake.logs.datadoghq.com` sur le port `10516` avec le chiffrement SSL activé.
    * Pour `app.datadoghq.eu` : `agent-intake.logs.datadoghq.eu` sur le port `443` avec le chiffrement SSL activé.

* Téléchargez les `CA certificates` de chiffrement TLS pour le chiffrement SSL via la commande suivante :
    * `sudo apt-get install ca-certificates` (Debian, Ubuntu)
    * `yum install ca-certificates` (CentOS, Redhat)
  Ensuite, utilisez le fichier certificat situé dans `/etc/ssl/certs/ca-certificates.crt` (Debian, Ubuntu) ou `/etc/ssl/certs/ca-bundle.crt` (CentOS, Redhat)

{{% /tab %}}
{{% tab "SOCKS5" %}}

Pour envoyer vos logs à votre compte Datadog avec un serveur proxy SOCKS5, utilisez les paramètres suivants dans votre fichier de configuration `datadog.yaml` :

```
logs_config:
  socks5_proxy_address: <URL_DU_PROXY_SOCKS5>:<PORT_DU_PROXY_SOCKS5>
```

Le paramètre ci-dessus peut également être configuré avec la variable d'environnement suivante :

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{% tab "HTTPS" %}}

Lorsque l'Agent est [configuré pour envoyer les logs via HTTPS][1], utilisez les mêmes [paramètres de proxy][2] que ceux des autres types de données pour envoyer les logs via un proxy Web.

[1]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[2]: /fr/agent/proxy
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: /fr/agent/proxy