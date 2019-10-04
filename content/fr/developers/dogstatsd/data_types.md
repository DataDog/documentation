---
title: Types de données et tags
kind: documentation
description: 'Aperçu des fonctionnalités de DogStatsD, y compris les types de données et le tagging.'
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
Si StatsD n'accepte que des métriques, DogStatsD prend en charge les trois principaux types de données Datadog : métriques, événements et checks de service. Cette section propose des cas d'utilisation typiques pour chaque type et présente les bases des tags, qui sont spécifiques à DogStatsD.

Les exemples sont tous en Python, grâce au [client Python officiel de Datadog][1], mais chaque type de données présenté est pris en charge de façon similaire dans les [autres bibliothèques client de DogStatsD][2].

## Métriques

Les utilisateurs de StatsD sont habitués à utiliser des counters, gauges et sets. Les histogrammes sont spécifiques à DogStatsD. Les minuteurs, qui existent dans StatsD, sont un sous-ensemble d'histogrammes dans DogStatsD.

### Counters

Les counters mesurent le nombre d'événements réalisés _par seconde_, comme les vues de page. Dans l'exemple qui suit, une métrique appelée `web.page_views` est incrémentée chaque fois que la fonction `render_page` est appelée.

Pour Python :
```python

def render_page():
    """ Afficher une page Web. """
    statsd.increment('web.page_views')
    return 'Hello World!'
```

Pour Ruby :
```ruby
def render_page()
  # Afficher une page Web.
  statsd.increment('web.page_views')
  return 'Hello World!'
end
```

Grâce à cette unique ligne de code, les données peuvent être représentées graphiquement dans Datadog. Voici un exemple :

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graphique guides métriques vues de page" responsive="true" >}}

Vous remarquerez que les counters StatsD sont normalisés selon l'intervalle de transmission pour signaler des unités par seconde. Dans le graphique ci-dessus, le marqueur signale 35,33 vues de page Web par seconde à ~15:24. En revanche, si une personne avait consulté la page Web chaque seconde, le graphique serait une ligne droite à y = 1. Pour incrémenter ou mesurer les valeurs au fil du temps, consultez les [gauges](#gauges).

Vous pouvez également compter des nombres arbitraires. Imaginez que vous souhaitez compter le nombre d'octets traités par un service d'importation de fichiers. Incrémentez une métrique appelée `file_service.bytes_uploaded` en ajoutant la taille du fichier chaque fois que la fonction `upload_file` est appelée :

Pour Python :
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'Fichier importé !'
```

Notez que pour les counters qui viennent d'une autre source, qui sont toujours croissants et qui ne sont jamais réinitialisés (par exemple, le nombre de requêtes de MySQL au fil du temps), Datadog surveille le taux entre les valeurs transmises. Pour obtenir les nombres bruts dans Datadog, appliquez une fonction à vos séries, comme une _somme cumulée_ ou une_intégrale_. [En savoir plus sur les fonctions Datadog][3].

Apprenez-en plus sur le [type Total dans la documentation relative aux métriques][4].

### Distributions

**Cette fonctionnalité est en bêta. [Contactez l'assistance Datadog][5] pour découvrir comment l'activer pour votre compte.**

Les distributions peuvent être comparées à une version globale des histogrammes (voir ci-dessous) Les distributions statistiques sont mesurées sur plusieurs hosts, ce qui vous permet de calculer les centiles globaux de l'intégralité de votre ensemble de données. Les distributions globales sont conçues pour instrumenter des objets logiques, comme des services, indépendamment des hosts sous-jacents.

Pour évaluer la durée d'une requête HTTP, vous pouvez mesurer la durée de chaque requête avec la métrique `dist.dd.dogweb.latency` :

Pour Python :
```python
# Surveiller le runtime d'une requête.
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

Pour Ruby :
```ruby
start_time = Time.now
results = Net::HTTP.get('https://google.com')
duration = Time.now - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

L'instrumentation ci-dessus calcule les données suivantes : `somme`, `total`, `moyenne`, `minimum`, `maximum`, `50e centile` (médiane), `75e centile`, `90e centile`, `95e centile` et `99e centile`. Ces métriques apportent des statistiques concernant la différence entre chaque durée de requête. Représentez graphiquement la médiane pour voir la durée médiane d'une requête. Ajoutez le 95e centile afin de voir le temps que prennent la plupart des requêtes.

{{< img src="graphing/metrics/distributions/dogweb_latency.png" alt="latence Dogweb" responsive="true" >}}

Pour cet exemple, nous partons du principe qu'une durée de requête de *500 ms* est acceptable. La durée de requête médiane (ligne bleue) est généralement inférieure à *100 millisecondes*, ce qui nous va. Le 95e centile (ligne rouge) a parfois dépassé une seconde, ce qui est loin de notre objectif.
Cela signifie que la plupart des requêtes fonctionnent bien, mais que les pires requêtes sont trop longues. Si le 95e centile se rapproche de la médiane, alors la plupart des requêtes fonctionnent correctement.

Les distributions ne servent pas qu'à mesurer des durées. Elles peuvent aussi mesurer la distribution de *tout* type de valeur, comme le poids de fichiers importés ou les notes d'une classe.

### Gauges

Les gauges mesurent la valeur d'un élément précis au fil du temps. Par exemple, pour surveiller la quantité de mémoire libre d'une machine, vous devez échantillonner régulièrement cette valeur avec la métrique `system.mem.free` :

Pour Python :
```python

# Enregistrer la quantité de mémoire libre toutes les dix secondes.
while True:
    statsd.gauge('system.mem.free', get_free_memory())
    time.sleep(10)
```

Pour Ruby :
```ruby
# Enregistrer la quantité de mémoire libre toutes les dix secondes while true do
    statsd.gauge('system.mem.free', get_free_memory())
    sleep(10)
end
```

Apprenez-en plus sur le [type Gauge dans la documentation relative aux métriques][6].

### Histogrammes

Les histogrammes sont spécifiques à DogStatsD. Ils calculent la distribution statistique de n'importe quel type de valeur, comme la taille des fichiers importés sur votre site :

```python

from datadog import statsd

def handle_file(file, file_size):
  # Gérer le fichier…

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
```

Les histogrammes peuvent également être utilisés avec des données temporelles, par exemple, la durée d'une requête de métriques :

Pour Python :
```python

# Surveiller le runtime de la requête de base de données.
start_time = time.time()
results = db.query()
duration = time.time() - start_time
statsd.histogram('database.query.time', duration)

# Le décorateur `timed` est un élément abrégé pour les fonctions temporelles.
@statsd.timed('database.query.time')
def get_data():
    return db.query()
```

Pour Ruby :
```ruby
start_time = Time.now
results = db.query()
duration = Time.now - start_time
statsd.histogram('database.query.time', duration)

# L'assistant `time` est un élément abrégé pour les blocs de code temporels.
statsd.time('database.query.time') do
  return db.query()
end
```

L'instrumentation ci-dessus génère les métriques suivantes :

| Métriques                             | Description                             |
|------------------------------------|-----------------------------------------|
| `database.query.time.count`        | Le nombre d'échantillonnages de cette métrique |
| `database.query.time.avg`          | La durée moyenne des valeurs échantillonnées      |
| `database.query.time.median`       | La valeur échantillonnée médiane                    |
| `database.query.time.max`          | La valeur échantillonnée maximale                   |
| `database.query.time.95percentile` | Le 95e centile de la valeur échantillonnée           |

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graphique guides métriques durées requêtes de métriques" responsive="true" >}}

Pour cet exemple, imaginons qu'une durée de requête d'une seconde est acceptable. La durée de requête médiane (ligne violette) est généralement inférieure à 100 millisecondes, ce qui nous va. Malheureusement, le 95e centile (ligne bleue) présente des pics importants qui s'approchent parfois des trois secondes, ce qui est loin de notre objectif. Cela signifie que la plupart des requêtes fonctionnent bien, mais que les pires requêtes sont bien trop longues. Si le 95e centile se rapproche de la médiane, alors la plupart des requêtes fonctionnent correctement.

Apprenez-en plus sur le [type Histogramme dans la documentation relative aux métriques][7].

### Minuteurs

Dans DogStatsD, les minuteurs sont une implémentation des histogrammes (à ne pas confondre avec les minuteurs de StatsD standard). Ils mesurent _uniquement_ les données temporelles : par exemple, la durée d'exécution d'une section de code ou la durée de rendu de l'intégralité d'une page. En Python, les minuteurs sont créés avec un décorateur :

```python

from datadog import statsd

@statsd.timed('mywebsite.page_render.time')
def render_page():
  # Afficher la page…
```

ou avec un gestionnaire de contexte :

```python

from datadog import statsd

def render_page():
  # Ce que vous ne souhaitez pas mesurer
  boilerplate_setup()

  # Lancer le minuteur
  with statsd.timed('mywebsite.page_render.time'):
    # Afficher la page…
```

Dans les deux cas, lorsque DogStatsD reçoit les données du minuteur, il calcule la distribution statistique des durées de rendu, puis envoie les métriques suivantes à Datadog :

- `mywebsite.page_render.time.count` : le nombre d'échantillonnages des durées de rendu.
- `mywebsite.page_render.time.avg` : la durée moyenne de rendu.
- `mywebsite.page_render.time.median` : la durée médiane de rendu.
- `mywebsite.page_render.time.max` : la durée maximale de rendu.
- `mywebsite.page_render.time.95percentile` : le 95e centile de la durée de rendu.

N'oubliez pas qu'en réalité, DogStatsD traite les minuteurs comme des histogrammes. Que vous utilisiez l'un ou l'autre, vous enverrez les mêmes données à Datadog.

### Sets

Les sets servent à compter le nombre d'éléments uniques dans un groupe, par exemple, le nombre de visiteurs uniques sur votre site :

Pour Python :
```python

def login(self, user_id):
    # Logger l'utilisateur dans…
    statsd.set('users.uniques', user_id)
```

Pour Ruby :
```ruby
def login(self, user_id)
    # Logger l'utilisateur dans…
    statsd.set('users.uniques', user_id)
end
```

Apprenez-en plus sur le [type Sets dans la documentation relative aux métriques][8].

## Option de métrique : taux d'échantillonnage

Étant donné l'envoi de paquets UDP peut s'avérer trop intensif pour certains chemins de codes nécessitant des performances optimales, les clients DogStatsD prennent en charge l'échantillonnage. Cela signifie qu'ils n'envoient pas systématiquement les métriques, mais seulement un certain pourcentage du temps. Le code suivant envoie une métrique histogram seulement une fois sur deux environ :

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Avant d'envoyer la métrique à Datadog, DogStatsD utilise le `sample_rate` pour
corriger la valeur de la métrique, c'est-à-dire pour estimer ce qui se produirait sans échantillonnage.

**Les taux d'échantillonnage fonctionnent uniquement avec les métriques de type counter, histogram et timer.**

Apprenez-en plus sur les [taux dans la documentation relative aux métriques][8].

## Événements

DogStatsD peut transmettre des événements à votre [flux d'événements Datadog][9]. Par exemple, vous pouvez choisir d'afficher les erreurs et les exceptions dans Datadog :

```python

from datadog import statsd

def render_page():
  try:
    # Afficher la page…
    # ..
  except RenderError as err:
    statsd.event('Erreur d'affichage de la page !', err.message, alert_type='error')
```

## Checks de service

DogStatsD peut envoyer des checks de service à Datadog. Utilisez-les pour suivre le statut des services dont votre application dépend :

Pour Python :
```python

from datadog.api.constants import CheckStatus

# Signaler le statut d'une application.
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

Pour Ruby :
```ruby
# Signaler le statut d'une application.
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

Après la transmission d'un check de service, utilisez-le pour déclencher un [monitor de check custom][10].

## Tagging

Ajoutez des tags à une métrique, un événement ou un check de service que vous envoyez à DogStatsD. Par exemple, comparez les performances de deux algorithmes en indiquant la version d'un algorithme dans une métrique de minuteur :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # À vous de jouer...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # À vous de jouer... (avec une version plus rapide ?)
```

Veuillez noter que l'ajout de tags dans StatsD requiert une [extension Datadog][2].

### Clé du tag host

Le tag host est attribué automatiquement par l'Agent Datadog chargé de l'agrégation des métriques. Les métriques envoyées avec un tag host qui ne correspond pas au hostname de l'Agent perdent la référence au host d'origine. Le tag host envoyé remplace n'importe quel hostname recueilli par l'Agent ou configuré par celui-ci.

### Distributions

En raison de la nature globale des distributions, des outils supplémentaires d'ajout de tags sont proposés. Consultez la page [Métriques de distribution][11] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://datadogpy.readthedocs.io/en/latest
[2]: /fr/libraries
[3]: /fr/graphing/miscellaneous/functions
[4]: /fr/developers/metrics/counts
[5]: /fr/help
[6]: /fr/developers/metrics/gauges
[7]: /fr/developers/metrics/histograms
[8]: /fr/developers/metrics/sets
[9]: /fr/graphing/event_stream
[10]: /fr/monitors/monitor_types/custom_check
[11]: /fr/graphing/metrics/distributions