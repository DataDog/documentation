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
  'api_key': 'CLÉ_API_DATADOG',
  'application_key': 'VOTRE_CLÉ_APPLICATION',
  'tags': 'env:prod,role:elasticsearch'
}
infra_link = 'https://app.datadoghq.com/api/v1/hosts'
infra_content = s.request(
  method='GET', url=infra_link, params=s.params
).json()
```

Pour exécuter l'itération de tous les hosts de votre infrastructure, utilisez la séquence suivante :

```python
import requests
def iterate_all_hosts():
  s = requests.session()
  s.params = {
    'api_key': '<CLÉ_API_DATADOG>',
    'application_key': '<VOTRE_CLÉ_APPLICATION>',
    'start': 0
  }
  infra_link = 'https://app.datadoghq.com/api/v1/hosts?count=1000'
  while True:
    response = s.request(method='GET', url=infra_link, params=s.params).json()
    for host in response['host_list']:
        yield host
    if response['total_returned'] == 0:
        return
    s.params['start'] += response['total_returned']

for host in iterate_all_hosts():
    print(host['host_name'])
```

[1]: /fr/api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map