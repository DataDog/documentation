---
title: Types de Données et Tagging
kind: documentation
description: Un tour d'horizon des fonctionnalités présentes dans DogStatsD, y compris les types de données et les tags.
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Introduction à DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques pour l'API et DogStatsD officielles et maintenue par la communauté
  - link: "https://github.com/DataDog/dd-agent/blob/master/dogstatsd.py"
    tag: "Github"
    text: Code source de DogStatsD
---

Alors que StatsD n'accepte que des métriques, DogStatsD accepte les trois types principaux des données prises en charge par Datadog : les métriques, les évènements et les checks de service. Cette section montre les cas d'utilisation pour chaque type.

Chaque exemple est en Python en utilisant [le client Python officiel de Datadog][2], mais chaque type de donnée est traité de manière similaire dans les [autres bibliothèques client de DogStatsD][1].

## Métriques

Les quatre premiers types de métrique - gauges (indicateurs), counters (compteurs), timers (chronomètres) et sets (collections) - sont familiers aux utilisateurs de StatsD. Le dernier - histograms (histogrammes) - est spécifique à DogStatsD.

### Gauges

Les guages suivent le flux et reflux d'une valeur d'un métrique donné au fil du temps, ex. le nombre d'utilisateurs actifs sur une site web :

```python

from datadog import statsd

statsd.gauge('mywebsite.users.active', get_active_users())
```

### Counters

Les counters suivent le nombre des fois que quelque chose se produit _par seconde_, ex. visualisations d'une page web :

```python

from datadog import statsd

def render_page():
  statsd.increment('mywebsite.page_views') # add 1
  # Render the page...
```

Avec une seule ligne de code nous pouvons commencer à représenter graphiquement les données :

{{< img src="developers/dogstatsd/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" popup="true">}}

DogStatsD normalise les counters selon l'intervalle de vidage afin de générer des unités par seconde. Dans le graphique ci-dessus, le marquer indique 35,33 visualisations de page web par seconde à environ 15 h 24. En revanche, si une personne visitait la page web chaque seconde, le graphique serait une ligne plate (y = 1).

Afin d'incrémenter ou mesurer des valeurs au fil du temps plutôt que par seconde, utilisez un gauge.

### Sets

Les sets comptent le nombre d'éléments uniques dans un groupe. Afin de suivre le nombre de visiteurs uniques à votre site, utilisez un set :

```python

def login(self, user_id):
    statsd.set('users.uniques', user_id)
    # Now log the user in ...
```

### Timers

Les timers mesurent la durée d'exécution d'une section de code, ex. le temps nécessaire pour afficher une page web. En Python, vous pouvez créer des timers avec un décorateur :

```python

from datadog import statsd

@statsd.timed('mywebsite.page_render.time')
def render_page():
  # Render the page...
```

ou avec un gestionnaire de contexte :

```python

from datadog import statsd

def render_page():
  # First some stuff we don't want to time
  boilerplate_setup()

  # Now start the timer
  with statsd.timed('mywebsite.page_render.time'):
    # Render the page...
```

Dans les deux cas, lorsque DogStatsD reçoit les données de temporisation, il calculera la distribution statistique des temps de rendu et ensuite il enverra les métriques suivantes vers Datadog :

- `mywebsite.page_render.time.count` - le nombre des fois que le temps de rendu a était prélevé.
- `mywebsite.page_render.time.avg` - le temps de rendu en moyen
- `mywebsite.page_render.time.median` - le temps de rendu en médiane
- `mywebsite.page_render.time.max` - le temps de rendu maximal
- `mywebsite.page_render.time.95percentile` - le temps du rendu au 95ème centile

Sous le capot, DogStatsD traite les minuteurs comme des histogrammes ; que vous envoyiez des données de minuterie en utilisant les méthodes ci-dessus, ou que vous les envoyiez sous forme d'histogramme (voir ci-dessous), vous enverrez les mêmes données à Datadog.

### Histograms

Les histogrammes calculent la distribution statistique de n'importe quel type de valeur. Bien que cela soit moins pratique, vous pouvez aussi mesurer les temps de rendu dans l'exemple précédent en utilisant une métrique d'histogramme :

```python

from datadog import statsd

...
start_time = time.time()
page = render_page()
duration = time.time() - start_time
statsd.histogram('mywebsite.page_render.time', duration)

def render_page():
  # Render the page...
```

Cela produira les même cinq métriques que celles indiquées dans la section Timers ci-dessus: count, avg, median, max, et 95percentile.

Mais les histogrammes ne sont pas que pour mesurer le temps. Vous pouvez suivre les distributions pour tout, ex. la taille des fichiers que les utilisateurs téléchargent vers votre site :

```python

from datadog import statsd

def handle_file(file, file_size):
  # Handle the file...

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
```

Puisque les histogrammes sont une extension de StatsD, utilisez une [bibliothèque client DogStatsD][1].

### Option de métrique : taux d'échantillonnage

Étant donné que la surcharge de l'envoi de paquets UDP peut être trop importante pour certains chemins de code à performance élevée, les clients DogStatsD prennent en charge l'échantillonnage, c'est-à-dire l'envoi de métriques qu'un pourcentage du temps. Le code suivant envoie une mesure d'histogramme  environ que la moitié du temps :

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Avant d'envoyer la métrique vers Datadog, DogStatsD utilise `sample_rate` pour corriger la valeur de métrique, c'est-à-dire pour estimer ce qu'il aurait été sans échantillonnage.

**Les taux d'échantillonnage fonctionnent uniquement avec les métriques de type counter, histogram et timer.**

## Évènements

DogStatsD peut émettre des évènements dans votre flux d'évènements Datadog. Par exemple, vous souhaiterez peut-être voir les erreurs et les exceptions dans Datadog :

```python

from datadog import statsd

def render_page():
  try:
    # Render the page...
    # ..
  except RenderError as err:
    statsd.event('Page render error!', err.message, alert_type='error')
```

## Checks de Service

Enfin, DogStatsD peut envoyer des checks de service vers Datadog. Utilisez les checks pour suivre l'état des services dont dépend votre application :

```python

from datadog import statsd

conn = get_redis_conn()
if not conn:
  statsd.service_check('mywebsite.can_connect_redis', statsd.CRITICAL)
else:
  statsd.service_check('mywebsite.can_connect_redis', statsd.OK)
  # Do your redis thing...
```

## Tagging

Vous pouvez ajouter des tags à n'importe quelle métrique, évènement ou check de service que vous envoyez à DogStatsD. Par exemple, vous pouvez comparer les performances de deux algorithmes en marquant une métrique de timer avec la version de l'algorithme :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

Puisque le tagging est une extension de StatsD, utilisez une [bibliothèque client DogStatsD][1].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /libraries/
[2]: http://datadogpy.readthedocs.io/en/latest/
