---
title: Format Datagramme et Utilisation via l'Interface Système
kind: documentation
description: Cette page explique le format datagramme employé par DogStatsD ainsi que l'utilisation avancée via l'interface système.
further_reading:
  - link: developers/dogstatsd
    tag: "Documentation"
    text: "Introduction à DogStatsD"
  - link: developers/libraries
    tag: "Documentation"
    text: "Bibliothèques pour l'API et DogStatsD officielles et maintenue par la communauté"
  - link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
    tag: "Github"
    text: "Code source de DogStatsD"
---


Cette section spécifie le format de datagramme brut pour chaque type de données accepté par DogStatsD. Cette section et facultatif si vous utilisez l'une des bibliothèques client DogStatsD, par contre, si vous écrivez votre propre bibliothèque, ou si vous désirez utiliser l'interface système afin d'envoyer des métriques ou des évènements, lisez davantage.

## Format Datagramme

### Métriques

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

- `metric.name` - une chaîne sans les caractères deux-points, barres, et arobase (@). Voir la [politique de nommage des métriques][1].
- `value` - un nombre de type entier ou virgule flottante.
- `type` - `c` pour counter, `g` pour gauge, `ms` pour timer, `h` pour histogram, `s` pour set.
- `sample rate` (facultatif) - un nombre de type virgule flottant entre 0 et 1, compris. Fonctionne uniquement avec les métriques de type counter, histrogram et timer. La valeur par défaut est 1 (c'est-à-dire prélever un échantillon 100% du temps).
- `tags` (facultatif) - une liste de tags séparées par des virgules. Utilisez des deux-points pour les tags de type clé / valeur, ex. `env: prod`. La clé `device` est réservée; Datadog supprimera les tags ajoutées par l'utilisateur comme `device: foobar`.

Voici quelques exemples de datagrammes:

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

Dans Linux et d'autres systèmes d'exploitation de type Unix, nous utilisons Bash. Dans Windows nous avons besoin de Powershell et [powershell-statsd][2], ce dernier étant une fonction Poswershell qui prend soin des détails réseautique à notre part.

L'idée derrière DogStatsD est simple : créez un message qui contient des informations sur votre métrique / évènement, et envoyez-le vers un collecteur via UDP sur le port 8125. [En savoir plus sur le format du message](#datagram-format).

### Envoyer des métriques

Le format d'envoi des métriques est `metric.name:value|type|@sample_rate|#tag1:value,tag2,`, alors allons-y et envoyons des points de données pour une métrique de type gauge nommé custom_metric avec le tag shell. Nous utilisons un Agent installé localement en tant que collecteur, donc l'adresse IP de la destination et 127.0.0.1.

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

Dans n'importe quelle plate-forme ayant Python (dans Windows, l'interpréteur Python intégré dans l'Agent peut être utilisé, situé dans `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`) :

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
Sur Windows :

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from Powershell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/#metric-names 
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
