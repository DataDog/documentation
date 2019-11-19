---
categories:
  - log collection
  - Sécurité
ddtype: crawler
dependencies: []
description: "Recueillir vos logs Carbon\_Black\_Defense"
doc_link: 'https://docs.datadoghq.com/integrations/carbon_black/'
has_logo: true
integration_title: "Carbon\_Black"
is_public: true
kind: integration
name: carbon_black
public_title: "Intégration Datadog/Carbon\_Black"
short_description: "Recueillir vos logs Carbon\_Black\_Defense"
version: 1
---
## Présentation

Utilisez l'intégration Datadog/Carbon Black pour transmettre vos logs Carbon Black Defense à Datadog.

## Implémentation
### Installation

Commencez par installer et configurer le [log shipper Carbon Black Defense][1]. Il est disponible pour :

* [Les distributions Linux utilisant RPM][2]
* [Docker][3]

### Configuration

Le fichier de configuration ci-dessous active votre shipper Carbon Black Defense afin de transmettre vos logs à Datadog :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.com/v1/input/<CLÉ_API_DATADOG>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <URL_SERVEUR_CB_DEFENSE>
siem_connector_id=<ID_API_CB_DEFENSE>
siem_api_key=<CLÉ_SECRET_API_CB_DEFENSE>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.eu/v1/input/<CLÉ_API_DATADOG>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <URL_SERVEUR_CB_DEFENSE>
siem_connector_id=<ID_API_CB_DEFENSE>
siem_api_key=<CLÉ_SECRET_API_CB_DEFENSE>
```

{{% /tab %}}
{{< /tabs >}}

Remplacez les paramètres fictifs `<CLÉ_API_DATADOG>`, `<CLÉ_SECRET_API_CB_DEFENSE>`, `<ID_API_CB_DEFENSE>` et `<URL_SERVEUR_CB_DEFENSE>` pour terminer la configuration.

Commencez par remplacer `<CLÉ_API_DATADOG>` par votre clé API Datadog, qui figure sur la page [API key de Datadog][4].

Pour obtenir votre clé et votre ID d'API Carbon Black Defense, générez-les depuis Carbon Black :

1. Accédez à *Settings* -> *API KEYS* -> *Add API Key*.
2. Nommez votre clé.
3. Sélectionnez le niveau d'accès **SIEM** pour la clé.
4. Une fois votre clé créée, utilisez la clé et l'ID d'API pour remplacer les paramètres fictifs `<CLÉ_SECRET_API_CB_DEFENSE>` et `<ID_API_CB_DEFENSE>` dans le fichier de configuration de votre log shipper Carbon Black Defense.

L'URL de votre serveur Carbon Black Defense se trouve sur votre dashboard Carbon Black. Accédez à *Settings* -> *API KEYS* -> *Download* pour y accéder et consulter les descriptions de niveau d'accès. Remplacez le paramètre fictif `<URL_SERVEUR_CB_DEFENSE>` par cette valeur. 

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://github.com/carbonblack/cb-defense-syslog-tls
[2]: https://github.com/carbonblack/cb-defense-syslog-tls#installation
[3]: https://github.com/carbonblack/cb-defense-syslog-tls#installation-via-docker
[4]: https://app.datadoghq.com/account/settings#api
[5]: /fr/help