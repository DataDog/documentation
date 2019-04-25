---
title: Datagramme et interface système
kind: documentation
description: 'Présentation du format des datagrammes utilisé par DogStatsD, ainsi que l''interface système avancée.'
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques pour l'API et DogStatsD officielles et entretenues par la communauté
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
Cette section spécifie le format brut des datagrammes pour chaque type de données accepté par DogStatsD. Vous pouvez l'ignorer si vous utilisez l'une des bibliothèques client de DogStatsD. Toutefois, si vous souhaitez rédiger votre propre bibliothèque ou utiliser l'interface système pour envoyer des métriques ou des événements, lisez attentivement cette section.

## Format des datagrammes

### Métriques

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

| Paramètre     | Obligatoire | Description                                                                                                                                                        |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `metric.name` | Oui      | Une chaîne sans deux-points, barres ni « @ ». Consultez la [stratégie de nommage des métriques][1].                                                                                 |
| `value`       | Oui      | Un nombre entier ou une valeur flottante.                                                                                                                                               |
| `type`        | Oui      | `c` pour counter, `g` pour gauge, `ms` pour timer, `h` pour histogram, `s` pour ensemble.                                                                                    |
| `sample rate` | Non       | Une valeur flottante entre 0 et 1 (inclusif). Elle ne fonctionne qu'avec des métriques counter, histogram et timer. Valeur par défaut : 1 (entraîne un échantillonnage 100 % du temps).                            |
| `tags`        | Non       | Une liste de tags séparés par des virgules. Utilisez deux-points pour les tags clé/valeur, p. ex. `env:prod`. La clé `device` est réservée : Datadog ne prend pas en charge un tag ajouté par un utilisateur comme `device:foobar`. |

Voici quelques exemples de datagrammes :

    # Incrémenter le counter page.views
    page.views:1|c

    # Enregistrer le fait que le réservoir de carburant est à moitié vide
    fuel.level:0.5|g

    # Échantillonner l'histogramme de longueur de morceau une fois sur deux
    song.length:240|h|@0.5

    # Suivre un visiteur unique du site
    users.uniques:1234|s

    # Incrémenter le counter d'utilisateurs actifs tagués par pays d'origine
    users.online:1|c|#country:china

    # Suivre les utilisateurs chinois actifs et utiliser un taux d'échantillonnage
    users.online:1|c|@0.5|#country:china

### Événements

`_e{title.length,text.length}:title|text|d:timestamp|h:hostname|p:priority|t:alert_type|#tag1,tag2`

| Paramètre                          | Obligatoire | Description                                                                                                            |
|------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------|
| `_e`                               | Oui      | Le datagramme doit commencer par `_e`.                                                                                      |
| `title`                            | Oui      | Titre de l'événement.                                                                                                           |
| `text`                             | Oui      | Texte de l'événement. Ajoutez des sauts de ligne en échappant une barre oblique (`\\n`).                                                           |
| `d:timestamp`                      | Non       | Ajoute un timestamp à l'événement. Valeur par défaut ; timestamp epoch Unix actuel.                                             |
| `h:hostname`                       | Non       | Ajoute un hostname à l'événement. Pas de valeur par défaut.                                                                               |
| `k:aggregation_key`                | Non       | Ajoute une clé d'agrégation afin de regrouper les événements qui possèdent la même clé. Pas de valeur par défaut.                              |
| `p:priority`                       | Non       | Défini sur « normal » ou « low ». Valeur par défaut : « normal ».                                                                            |
| `s:source_type_name`               | Non       | Ajoute un type de source à l'événement. Pas de valeur par défaut.                                                                            |
| `t:alert_type`                     | Non       | Défini sur « error », « warning », « info » ou « success ». Valeur par défaut : « info ».                                                        |
| `#tag1:value1,tag2,tag3:value3...` | Non       | La virgule dans les tags fait partie de la chaîne de liste de tags et ne fait pas l'objet d'un parsing comme pour les autres paramètres. Pas de valeur par défaut. |

Voici quelques exemples de datagrammes :

    # Envoyer une exception
    _e{21,36}:Une exception s'est produite|Impossible d'analyser le fichier CSV depuis 10.0.0.17|t:warning|#err_type:bad_file

    # Envoyer un événement avec une nouvelle ligne dans le texte
    _e{21,42}:Une exception s'est produite|Impossible d'analyser la requête JSON:\\n{"foo: "bar"}|p:low|#err_type:bad_request

### Checks de service

`_sc|name|status|d:timestamp|h:hostname|#tag1:value1,tag2,tag3:value3,...|m:service_check_message`

| Paramètre                           | Obligatoire | Description                                                                                                                                  |
|-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `_sc`                               | Oui      | Le datagramme doit commencer par `_sc`.                                                                                                           |
| `name`                              | Oui      | Nom du check de service.                                                                                                                          |
| `status`                            | Oui      | Nombre entier correspondant à l'état du check (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3).                                                  |
| `d:timestamp`                       | Non       | Ajoute un timestamp au check. Valeur par défaut ; timestamp epoch Unix actuel.                                                                   |
| `h:hostname`                        | Non       | Ajoute un hostname à l'événement. Pas de valeur par défaut.                                                                                                     |
| `#tag1:value1,tag2,tag3:value3,...` | Non       | La virgule dans les tags fait partie de la chaîne de liste de tags et ne fait pas l'objet d'un parsing comme pour les autres paramètres. Pas de valeur par défaut.                       |
| `m:service_check_message`           | Non       | Ajoute un message décrivant l'état actuel du check de service. *Ce champ DOIT être placé en dernier parmi les champs des métadonnées.* Pas de valeur par défaut. |

Voici un exemple de datagramme :

    # Envoyer un statut CRITICAL pour une connexion à distance
    _sc|Connexion Redis|2|#redis_instance:10.0.0.16:6379|m:La connexion Redis a expiré après 10 s

## Envoyer des statistiques et des événements à l'aide de DogStatsD et de l'interface système

Pour Linux et d'autres systèmes d'exploitation comme Unix, utilisez Bash.
Pour Windows, Powershell et [powershell-statsd][2] (une fonction Powershell simple qui gère des bits réseau) sont requis.

DogStatsD repose sur un concept simple : créer un message qui contient des informations sur votre métrique ou événement, et l'envoyer à un collecteur via UDP sur le port 8125. [En savoir plus sur le format du message](#format-des-datagrammes).

### Envoyer des métriques

Le format d'envoi des métriques est le suivant : `metric.name:value|type|@sample_rate|#tag1:value,tag2,`. Imaginons que nous envoyons des points de données pour une métrique de type gauge du nom de custom_metric avec le tag shell. Si vous utilisez un Agent installé localement en tant que collecteur, l'adresse IP de la destination est 127.0.0.1.

Options sur Linux :

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Options sur Windows :

```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

Depuis n'importe quelle plateforme avec Python (sur Windows, l'interpréteur Python intégré à l'Agent peut être utilisé ; il est situé à l'emplacement `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`) :

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Envoyer des événements

Voici le format d'envoi d'événements :

```
_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2.
```

Calculez ici la taille du titre et du corps de l'événement :

Sur Linux :

```
vagrant@vagrant-ubuntu-14-04:~$ title="Événement de l'interface système"
vagrant@vagrant-ubuntu-14-04:~$ text="Ceci a été envoyé par Bash !"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

Sur Windows :

```
PS C:\vagrant> $title = "Événement de l'interface système"
PS C:\vagrant> $text = "Ceci a été envoyé par Powershell !"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/metrics/#naming-metrics
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1