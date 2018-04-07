---
title: DogStatsD
kind: documentation
description: >-
  Cette page explique ce qu'est DogStatsD, comment cela fonctionne et quelles
  données il accepte.
aliases:
  - /fr/guides/dogstatsd/
  - /fr/guides/DogStatsD/
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: >-
      Bibliothèques logicielles et clients pour l'API et DogStatsD, officielles
      et contribué par la communauté
---
Le moyen le plus simple d'importer vos métriques d'application personnalisées dans Datadog consiste à les envoyer vers DogStatsD, qui s'agit d'un service d'agrégation de métriques associé à l'Agent Datadog. DogStatsD implémente le protocole [StatsD](https://github.com/etsy/statsd) et ajoute quelques extensions spécifiques à Datadog :

* Type de métrique « histogramme »
* Checks de service et événements
* Tagging

**Note**: DogStatsD n'implémente PAS les éléments suivants de StatsD:

* Gauge deltas (Voir [cette issue][1])
* Timers en tant que type de métrique natif (bien qu'il [les supporte via les histogrammes](#timers))

**Note**: Tout client StatsD fonctionne, mais l'utilisation du client DogStatsD de Datadog vous donne quelques fonctionnalités supplémentaires.

## Comment ça marche

DogStatsD accepte les [métriques personnalisées](/getting_started/custom_metrics/), les évènements et les checks de service par UDP, les agrègent et les transmets périodiquement vers Datadog.
Parce qu'il utilise UDP, votre application peut envoyer des métriques vers DogStatsD et reprendre son travail sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application ne sautera pas un temps.

{{< img src="developers/dogstatsd/dogstatsd.png" alt="dogstatsd"  responsive="true" popup="true">}}

Lors de la réception des données, DogStatsD agrège plusieurs points de données pour chaque métrique unique en un seul point de donnée sur une période de temps appelé "flush interval". Voici un exemple de comment cela fonctionne:

Supposons que vous vouliez savoir combien de fois votre application Python appelle une requête de base de données particulière. Votre application peut indiquer à DogStatsD d'incrémenter un compteur chaque fois que la requête est appelée:

```python

def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
```

Si cette fonction s'exécute cent fois pendant le flush interval (dix secondes, par défaut), il enverra à DogStatsD cent paquets UDP qui disent « incrémenter le compteur 'database.query.count' ». DogStatsD agrège ces points dans une valeur de métrique unique, 100 dans ce cas, et l'envoie vers Datadog où elle est stockée et rendue disponible pour la visualisation comme les autres métriques.

## Implémentation

Commencez par éditer votre fichier `datadog.yaml` en décommentant les lignes suivantes:
```
use_dogstatsd: yes

...

dogstatsd_port: 8125
```

Puis [redémarrez votre agent](/agent/faq/agent-commands).

Une fois cela fait, votre application peut communiquer de manière fiable avec la [bibliothèque client DogStatsD][2] pour votre langue d'application et vous serez prêt à commencer. Vous _pouvez_ utiliser n'importe quel client StatsD générique pour envoyer des métriques vers DogStatsD, par contre, dans ce cas vous ne pourrez pas utiliser les fonctionnalités spécifiques à Datadog mentionnées ci-dessus.

Par défaut, DogStatsD écoute sur port **8125** UDP. Si vous avez besoin de le modifier, configurez l'option `dogstatsd_port` dans le fichier de [configuration principal de l'Agent][3] :

# Assurez-vous que le client se communique avec le bon port.
dogstatsd_port: 8125

[Redémarrez DogStatsD](/agent/faq/agent-commands) afin de prendre en compte les changements.

## Types de données

Alors que StatsD n'accepte que des métriques, DogStatsD accepte les trois types principaux des données prises en charge par Datadog : les métriques, les évènements et les checks de service. Cette section montre les cas d'utilisation pour chaque type.

Chaque exemple est en Python en utilisant [datadogpy](http://datadogpy.readthedocs.io/en/latest/), mais chaque type de donnée est traité de manière similaire dans les [autres bibliothèques client de DogStatsD][2].

### Métriques

Les quatre premiers types de métrique - gauges (indicateurs), counters (compteurs), timers (chronomètres) et sets (collections) - sont familiers aux utilisateurs de StatsD. Le dernier - histograms (histogrammes) - est spécifique à DogStatsD.

#### Gauges

Les guages suivent le flux et reflux d'une valeur d'un métrique donné au fil du temps, ex. le nombre d'utilisateurs actifs sur une site web :

```python

from datadog import statsd

statsd.gauge('mywebsite.users.active', get_active_users())
```

#### Counters

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

#### Sets

Les sets comptent le nombre d'éléments uniques dans un groupe. Afin de suivre le nombre de visiteurs uniques à votre site, utilisez un set :

```python

def login(self, user_id):
    statsd.set('users.uniques', user_id)
    # Now log the user in ...
```

#### Timers

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

#### Histograms

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

Puisque les histogrammes sont une extension de StatsD, utilisez une [bibliothèque client DogStatsD][2].

#### Option de métrique : taux d'échantillonnage

Étant donné que la surcharge de l'envoi de paquets UDP peut être trop importante pour certains chemins de code à performance élevée, les clients DogStatsD prennent en charge l'échantillonnage, c'est-à-dire l'envoi de métriques qu'un pourcentage du temps. Le code suivant envoie une mesure d'histogramme  environ que la moitié du temps :

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

Avant d'envoyer la métrique vers Datadog, DogStatsD utilise `sample_rate` pour corriger la valeur de métrique, c'est-à-dire pour estimer ce qu'il aurait été sans échantillonnage.

**Les taux d'échantillonnage fonctionnent uniquement avec les métriques de type counter, histogram et timer.**

### Evénements

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

### Checks de Service

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

Puisque le tagging est une extension de StatsD, utilisez une [bibliothèque client DogStatsD][2].

## Format Datagramme

Cette section spécifie le format de datagramme brut pour chaque type de données accepté par DogStatsD. Vous n'avez pas besoin de le savoir si vous utilisez l'une des bibliothèques client DogStatsD, mais si vous voulez envoyer des données à DogStatsD sans les bibliothèques, ou si vous écrivez votre propre bibliothèque, voici comment formater les données.

### Métriques

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

- `metric.name` - une chaîne sans les caractères deux-points, barres, et arobase (@). Voir la [politique de nommage des métriques][4].
- `value` - un nombre de type entier ou virgule flottante.
- `type` - `c` pour counter, `g` pour gauge, `ms` pour timer, `h` pour histogram, `s` pour set.
- `sample rate` (facultatif) - un nombre de type virgule flottant entre 0 et 1, compris. Fonctionne uniquement avec les métriques de type counter, histrogram et timer. La valeur par défaut est 1 (c'est-à-dire prélever un échantillon 100% du temps).
- `tags` (facultatif) - une liste de tags séparées par des virgules. Utilisez des deux-points pour les tags de type clé / valeur, ex. `env: prod`. La clé `device` est réservée; Datadog supprimera les tags ajoutées par l'utilisateur comme `device: foobar`.

Voici quelques exemples de datagrams:

    # Increment the page.views counter
    page.views:1|c

    # Record the fuel tank is half-empty
    fuel.level:0.5|g

    # Sample the song length histogram half of the time
    song.length:240|h|@0.5

    # Track a unique visitor to the site
    users.uniques:1234|s

    # Increment the active users counter, tag by country of origin
    users.online:1|c|#country:china

    # Track active China users and use a sample rate
    users.online:1|c|@0.5|#country:china

### Évènements

`_e{title.length,text.length}:title|text|d:timestamp|h:hostname|p:priority|t:alert_type|#tag1,tag2`

- `_e` - Le datagramme doit commencer avec `_e`
- `title` — Titre de l'évènement.
- `text` - Texte de l'évènement. Insérer des sauts de ligne avec une barre oblique échappée (`\\n`)
- `|d: timestamp` (facultatif) - Ajouter un horodatage à l'évènement. La valeur par défaut est l'horodatage d'époque Unix actuel.
- `|h: hostname` (facultatif) - Ajouter un nom d'hôte à l'évènement. Aucun défaut.
- `|k: aggregation_key` (facultatif) - Ajouter une clé d'agrégation pour grouper l'événement avec d'autres évènements ayant la même clé. Aucun défaut.
- `|p: priority` (facultatif) - Régler à 'normal' ou 'low'. 'normal' par défaut.
- `|s: source_type_name` (facultatif) - Ajouter un type de source à l'événement. Aucun défaut.
- `|t: alert_type` (facultatif) - Définir à 'error', 'warning', 'info' ou 'success'. 'info' par défaut.
- `|#tag1:value1,tag2,tag3:value3...` (facultatif) - ***Le signe deux-points dans le tag fait partie de la chaîne de liste des tags et n'a aucun but d'analyse (comparé aux autres paramètres).*** Aucun défaut.

Voici quelques exemples de datagrammes:

    # Send an exception
    _e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

    # Send an event with a newline in the text
    _e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request

### Checks de Service

`_sc|name|status|d:timestamp|h:hostname|#tag1:value1,tag2,tag3:value3,...|m:service_check_message`

- `_sc` - le datagramme doit commencer obligatoirement par `_sc`
- `name` - Nom du check de service.
- `status` - Nombre entier correspondant à l'état du check (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3).
- `|d: timestamp` (facultatif) - Ajouter un horodatage à l'évènement. La valeur par défaut est l'horodatage d'époque Unix actuel.
- `|h: hostname` (facultatif) - Ajouter un nom d'hôte à l'évènement. Aucun défaut.
- `|#tag1:value1,tag2,tag3:value3...` (facultatif) - ***Le signe deux-points dans le tag fait partie de la chaîne de liste des tags et n'a aucun but d'analyse (comparé aux autres paramètres).*** Aucun défaut.
- `m:service_check_message` (facultatif) - Ajouter un message décrivent l'état actuel du contrôle de service. *Ce champ DOIT être positionné en dernier parmi les champs de métadonnées.* Aucun défaut.

Voici un exemple de datagrammes:

    # Send a CRITICAL status for a remote connection
    _sc|Redis connection|2|#redis_instance:10.0.0.16:6379|m:Redis connection timed out after 10s

## Envoyer des statistiques et des évènements en utilisant DogStatsD et l'interface système

Dans Linux et d'autres systèmes d'exploitation de type Unix, nous utilisons Bash. Dans Windows nous avons besoin de Powershell et [powershell-statsd](https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1), ce dernier étant une fonction Poswershell qui prend soin des détails réseautique à notre part.

L'idée derrière DogStatsD est simple : créez un message qui contient des informations sur votre métrique / évènement, et envoyez-le vers un collecteur via UDP sur le port 8125. [En savoir plus sur le format du message](#datagram-format).

### Envoyer des métriques

Le format d'envoi des métriques est `metric.name:value|type|@sample_rate|#tag1:value,tag2,`, alors allons-y et envoyons des points de données pour une métrique de type gauge nommé custom_metric avec le tag shell. Nous utilisons un agent installé localement en tant que collecteur, donc l'adresse IP de la destination et 127.0.0.1.

Sur Linux:

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

ou

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

Sur Windows :
```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

Dans n'importe quelle plate-forme ayant Python (dans Windows, l'interpréteur Python intégré dans l'agent peut être utilisé, situé dans `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`) :

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Envoyer des événements

Le format pour envoyer des événements est:
```
_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2.
```
Ici, nous devons calculer la taille du titre et du corps de l'événement.

Sur Linux:
```
vagrant@vagrant-ubuntu-14-04:~$ title="Event from the shell"
vagrant@vagrant-ubuntu-14-04:~$ text="This was sent from Bash!"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```
Sur Windows

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from Powershell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```

## En apprendre plus

{{< whatsnext  >}}
    {{< nextlink href="/developers/libraries/" tag="Documentation" >}}Trouver une bibliothèque client DogStatsD en fonction de vos besoins.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/dd-agent/blob/master/dogstatsd.py" tag="Github" >}}code source de DogStatsD {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/dd-agent/pull/2104
[2]: /libraries/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /developers/metrics/#metric-names