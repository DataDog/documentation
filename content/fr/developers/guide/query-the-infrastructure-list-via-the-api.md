---
title: Interroger la liste d'infrastructures via l'API
kind: guide
aliases:
  - /fr/developers/faq/query-the-infrastructure-list-via-the-api
---
Si vous êtes un utilisateur plus expérimenté de Datadog, vous avez la possibilité d'utiliser [l'API][1] pour interroger les données générales sur votre infrastructure, c'est-à-dire les données qui se trouvent dans votre [liste d'infrastructures][2] ou dans la [Hostmap][3]. Pour ce faire, effectuez une requête GET via l'endpoint [api/v1/hosts][4].

## Exemples

Si, par exemple, vous souhaitez interroger l'ensemble des données de vos hosts associés aux tags `env:prod` et `role:elasticsearch`, vous pouvez effectuer l'appel d'API suivant avec la bibliothèque `requests` de Python :

```python
import requests
s = requests.session()
s.params = {
  'api_key': '<CLÉ_API_DATADOG>',
  'application_key': '<VOTRE_CLÉ_APPLICATION>',
  'filter': 'env:prod,role:elasticsearch'
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
    'include_muted_hosts_data': False,
    'include_hosts_metadata': False,
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
[4]: https://docs.datadoghq.com/fr/api/v1/hosts/