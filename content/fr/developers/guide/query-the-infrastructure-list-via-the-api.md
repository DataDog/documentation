---
title: Interroger la liste d'infrastructures via l'API
kind: guide
aliases:
  - /fr/developers/faq/query-the-infrastructure-list-via-the-api
---
Les utilisateurs plus avancés de Datadog ont la possibilité d'utiliser [l'API][1] pour interroger les données générales sur leur infrastructure, c'est-à-dire le type de données que vous pouvez trouver dans votre [liste d'infrastructures][2] ou dans la [Hostmap][3]. Pour ce faire, effectuez une requête GET via l'endpoint `reports/v2/overview`.

## Présentation

Cet endpoint prend en compte les paramètres obligatoires suivants :

* **api_key** (chaîne) : votre clé d'API Datadog
* **application_key** (chaîne) : votre clé d'application Datadog

Par défaut, cet endpoint interroge l'ensemble des données de votre liste d'infrastructures : la réponse peut donc être conséquente. Les paramètres facultatifs suivants vous permettent de filtrer le contenu que vous recevez :

* **tags** (chaîne) : liste des tags de host avec lesquels vous souhaitez filtrer la réponse, séparés par des virgules (utilise une logique AND : renvoie uniquement les données des hosts associés à _l'ensemble_ de ces tags).
* **hostnames[]** (liste de chaînes) : liste des hostnames spécifiques dont vous souhaitez interroger les données.
* **with_apps** (valeur booléenne) : si défini sur true, affiche les applications (intégrations) associées à un host donné.
* **with_mute_status** (valeur booléenne) : si défini sur true, affiche si le host est désactivé en raison d'un downtime ou non.
* **with_sources** (valeur booléenne) : si défini sur true, renvoie la liste des sources à partir desquelles les métriques sont envoyées pour ce host. La liste peut par exemple contenir 'aws', 'agent' ou 'azure'.
* **with_aliases** (valeur booléenne) : si défini sur true, affiche les alias de ce host.
* **with_meta** (valeur booléenne) : si défini sur true, ajoute des métadonnées sur le host (informations sur le disque, adresses IP, etc.).

La réponse à cet appel d'API est au format JSON.

## Exemples

Si, par exemple, vous souhaitez interroger l'ensemble des données de vos hosts associés aux tags `env:prod` et `role:elasticsearch`, vous pouvez effectuer l'appel d'API suivant avec la bibliothèque `requests` de Python :

```python
import requests
s = requests.session()
s.params = {
    'api_key': 'VOTRE_CLÉ_API',
    'application_key': 'VOTRE_CLÉ_APPLICATION',
    'tags': 'env:prod,role:elasticsearch'
}
infra_link = 'https://app.datadoghq.com/reports/v2/overview'
infra_content = s.request(
    method='GET', url=infra_link, params=s.params
).text
```

De la même manière, si vous souhaitez interroger les mêmes données mais uniquement pour les hosts dont le hostname est « A », « B » ou « C », vous pouvez exécuter l'appel d'API suivant :

```python
import requests
s = requests.session()
s.params = {
    'api_key': '<VOTRE_CLÉ_API>',
    'application_key': '<VOTRE_CLÉ_APPLICATION>',
    'hostnames[]': ['A', 'B', 'C']
}
infra_link = 'https://app.datadoghq.com/reports/v2/overview'
infra_content = s.request(
    method='GET', url=infra_link, params=s.params
).text
```

[1]: /fr/api
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map