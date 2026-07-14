---
aliases:
- /fr/graphing/faq/embeddable-graphs-with-template-variables
- /fr/dashboards/faq/embeddable-graphs-with-template-variables/
further_reading:
- link: /dashboards/sharing/
  tag: Documentation
  text: Graphiques partagés
title: Graphiques intégrés avec variables de modèle
---

Les graphiques intégrables créés via lʼAPI acceptent les variables de modèles. Ci-dessous, un exemple illustre lʼutilisation de Python pour la requête `avg:system.cpu.user{$var}`. Dans cet exemple, `$var` est la variable de modèle. **Remarque** : cette méthode ne fonctionne que pour les graphiques dotés dʼune visualisation des séries temporelles.  

```python
from datadog import initialize, api
import json

# Initialiser les paramètres de requêtes avec lʼAPI/la clé dʼapplication de Datadog
options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Créer une définition de graphique intégré sous forme de dict et la formater en JSON
graph_json = {
    "requests": [{
        "q": "avg:system.cpu.user{$var}"
    }],
    "viz": "timeseries",
    "events": []
}
graph_json = json.dumps(graph_json)

api.Embed.create(
    graph_json=graph_json,
    timeframe="1_hour",
    size="medium",
    legend="no"
)
```

**Exemple de réponse** :

```python
{
  'embed_id': '<EMBED_ID>',
  'revoked': False,
  'template_variables': ['var'],
  'html': '<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>',
  'graph_title': 'Embed créé via lʼAPI',
  'dash_url': None,
  'shared_by': 734258,
  'dash_name': None
}
```

Affichez le graphique intégré sur un site web en utilisant le HTML dans lʼobjet de réponse. Notez que la variable de modèle `$var` est définie sur `*` par défaut dans lʼURL de lʼiframe. Il sʼagit de lʼéquivalent de la requête `avg:system.cpu.user{*}`.

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>
```

**Exemple dʼembed** :

{{< img src="dashboards/guide/embeddable_graph01.png" alt="Graphique intégré sans filtre" >}}

Utilisez la variable de modèle pour modifier le graphique en mettant à jour lʼURL de lʼiframe afin de définir un filtre. Dans le HTML ci-dessous, `*` est remplacé par `host:embed-graph-test`. 

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=host:embed-graph-test" width="600" height="300" frameBorder="0"></iframe>
```

**Exemple dʼembed** :

{{< img src="dashboards/guide/embeddable_graph02.png" alt="Graphique intégré avec filtre" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}