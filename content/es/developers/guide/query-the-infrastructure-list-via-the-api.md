---
aliases:
- /es/developers/faq/query-the-infrastructure-list-via-the-api
kind: guía
title: Consulta la lista de infraestructura con la API
---

Si eres un usuario más avanzado de Datadog, es posible que desees utilizar [la API][1] para consultar datos generales sobre la infraestructura; el tipo de datos que puedes encontrar en tu [lista de infraestructura][2] o en el [mapa de host][3]. Puedes hacerlo con una solicitud GET de la API en el endpoint [api/v1/hosts][4].

## Ejemplos

Si, por ejemplo, deseas consultar datos generales de todos tus hosts que incluyan el `env:prod` y la etiqueta `role:elasticsearch`, puedes realizar la siguiente llamada a la API con la biblioteca de Python `requests`:

```python
import requests
s = requests.session()
s.params = {
  'api_key': '<DATADOG_API_KEY>',
  'application_key': '<YOUR_APPLICATION_KEY>',
  'filter': 'env:prod,role:elasticsearch'
}
infra_link = 'https://app.datadoghq.com/api/v1/hosts'
infra_content = s.request(
  method='GET', url=infra_link, params=s.params
).json()
```

Para iterar sobre todos los hosts en tu infraestructura, utiliza lo siguiente:

```python
import requests
def iterate_all_hosts():
  s = requests.session()
  s.params = {
    'api_key': '<DATADOG_API_KEY>',
    'application_key': '<YOUR_APPLICATION_KEY>',
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

[1]: /es/api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/es/api/v1/hosts/