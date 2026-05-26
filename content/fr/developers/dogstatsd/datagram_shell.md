---
aliases:
- /fr/developers/dogstatsd/data_types/
description: Présentation du format des datagrammes utilisé par DogStatsD, ainsi que
  l''interface système avancée.
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Datagramme et interface système
---

Cette section spécifie le format des datagrammes bruts pour les métriques, événements et checks de service acceptés par DogStatsD. Les datagrammes bruts sont encodés en UTF-8. Vous pouvez ignorer cette section si vous utilisez l'une des [bibliothèques client pour DogStatsD][1]. Toutefois, si vous souhaitez écrire votre propre bibliothèque ou utiliser l'interface système pour envoyer des métriques, lisez attentivement ce qui suit.

## Protocole DogStatsD

{{< tabs >}}
{{% tab "Métriques" %}}

`<NOM_MÉTRIQUE>:<VALEUR>|<TYPE>|@<TAUX_ÉCHANTILLONNAGE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>`

| Paramètre                           | Obligatoire | Rôle                                                                                                                                                    |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_MÉTRIQUE>`                     | Oui      | Une chaîne contenant uniquement des caractères alphanumériques ASCII, des tirets bas et des points. Consultez la [politique de nommage des métriques][101].                                                  |
| `<VALEUR>`                           | Oui      | Nombre entier ou valeur flottante.                                                                                                                                           |
| `<TYPE>`                            | Oui      | `c` pour COUNT, `g` pour GAUGE, `ms` pour TIMER, `h` pour HISTOGRAM, `s` pour SET, `d` pour DISTRIBUTION. Consultez la section [Types de métriques][102] pour en savoir plus.                    |
| `<TAUX_ÉCHANTILLONNAGE>`                     | Non       | Valeur flottante entre `0` et `1` (inclusif). Elle ne fonctionne qu'avec des métriques COUNT, HISTOGRAM, DISTRIBUTION et TIMER. Valeur par défaut : `1` (entraîne un échantillonnage 100 % du temps). |
| `<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>` | Non       | Une liste de chaînes séparées par des virgules. Utilisez des deux-points pour les tags clé/valeur (`env:prod`). Pour obtenir des conseils sur la définition des tags, consultez la section [Premiers pas avec les tags][103].              |

Voici quelques exemples de datagrammes :

- `page.views:1|c` : incrémente la métrique COUNT `page.views`.
- `fuel.level:0.5|g` : indique que le réservoir est à moitié vide.
- `song.length:240|h|@0.5` : échantillonne l'histogramme `song.length` comme s'il était envoyé une fois sur deux.
- `users.uniques:1234|s` : surveille les visiteurs uniques du site.
- `users.online:1|c|#country:china` : incrémente la métrique COUNT correspondant au nombre d'utilisateurs actifs et ajoute un tag avec le pays d'origine.
- `users.online:1|c|@0.5|#country:china` : surveille les utilisateurs chinois actifs et utilisez un taux d'échantillonnage.

### Protocole DogStatsD v1.1

Avec l'Agent `>=v6.25.0` et `<v7.0.0` ou `>=v7.25.0`, il est possible de rassembler des valeurs. Cette fonctionnalité est proposée pour tous les types de métriques, sauf `SET`. Les valeurs sont séparées par le caractère `:`. Exemple :

`<NOM_MÉTRIQUE>:<VALEUR1>:<VALEUR2>:<VALEUR3>|<TYPE>|@<TAUX_ÉCHANTILLONNAGE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>`

Les paramètres `TYPE`, `TAUX_ÉCHANTILLONNAGE` et `TAGS` sont partagés entre toutes les valeurs. Les métriques obtenues sont identiques à celles générées par plusieurs messages comportant une seule valeur à la fois. Cette fonctionnalité est particulièrement utile pour les métriques HISTOGRAM, TIMING et DISTRIBUTION.

### Exemples de datagrammes

- `page.views:1:2:32|d` : échantillonne la métrique DISTRIBUTION `page.views` trois fois avec les valeurs `1`, `2` et `32`.
- `song.length:240:234|h|@0.5` : échantillonne l'histogramme `song.length` comme s'il était envoyé une fois sur deux, à deux reprises. Un taux d'échantillonnage de `0.5` est appliqué à chaque valeur.

### Protocole DogStatsD v1.2

Les versions `>=v6.35.0` && `<v7.0.0` ou `>=v7.35.0` de l'Agent prennent en charge un nouveau champ d'ID de conteneur. L'Agent Datadog se sert de la valeur de l'ID de conteneur pour ajouter aux métriques DogStatsD des tags de conteneur supplémentaires afin de les enrichir.

L'ID de conteneur commence par `c:`. Exemple :

`<NOM_MÉTRIQUE>:<VALEUR>|<TYPE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>|c:<ID_CONTENEUR>`

**Remarque** : définissez `dogstatsd_origin_detection_client` sur `true` dans votre fichier `datadog.yaml` ou la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT=true` pour indiquer à l'Agent Datadog d'extraire le champ d'ID de conteneur et d'appliquer les tags de conteneur correspondants.

### Exemples de datagrammes

- `page.views:1|g|#env:dev|c:83c0a99c0a54c0c187f461c7980e9b57f3f6a8b0c918c8d93df19a9de6f3fe1d` : l'Agent Datadog ajoute des tags de conteneur comme `image_name` et `image_tag` à la métrique `page.views`.

Pour en savoir plus sur les tags de conteneur, consultez la documentation sur le tagging [Kubernetes][104] et [Docker][105]. 

### Protocole DogStatsD v1.3

Les Agents `v6.40.0+` et `v7.40.0+` prennent en charge un champ timestamp Unix facultatif.

Lorsque ce champ est fourni, l'Agent Datadog n'effectue aucun traitement sur les métriques (pas d'agrégation), si ce n'est l'enrichissement des métriques avec des tags. Cela peut être utile si vous agrégez déjà vos métriques dans votre application et souhaitez les envoyer à Datadog sans traitement supplémentaire.

Le timestamp Unix doit être un nombre positif valide situé dans le passé. Seules les métriques GAUGE et COUNT sont prises en charge.

La valeur est un timestamp Unix (UTC) et doit être préfixée par `T`, par exemple :

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|T<METRIC_TIMESTAMP>`

### Exemple de datagramme

- `page.views:15|c|#env:dev|T1656581400` : un COUNT indiquant que 15 pages vues ont eu lieu le 30 juin 2022 à 9h30 UTC.

### Protocole DogStatsD v1.4

À partir de l'Agent `>=v7.51.0`, une nouvelle valeur inode est prise en charge pour le champ ID de conteneur.
Le champ ID de conteneur peut désormais contenir deux valeurs pour enrichir les métriques DogStatsD avec des tags de conteneur supplémentaires :
- L'ID du conteneur, si disponible.
- L'inode du nœud cgroup si l'ID de conteneur n'est pas disponible. 

Le champ ID de conteneur est toujours préfixé par `c:`, avec pour valeur :

- `c:ci-<CONTAINER_ID>`
- `c:in-<CGROUP_INODE>`

Pour des raisons de rétrocompatibilité, le format suivant est toujours pris en charge, bien qu'il soit considéré comme obsolète :
- `c:<CONTAINER_ID>`

### Protocole DogStatsD v1.5

À partir de l'Agent `>=v7.57.0`, un nouveau champ External Data est pris en charge.
L'Agent Datadog utilise la valeur External Data pour enrichir les métriques DogStatsD avec des tags de conteneur supplémentaires lorsque l'ID de conteneur n'est pas disponible.

L'ID du conteneur est préfixé par `e:`, par exemple :

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|e:<EXTERNAL_DATA>`

Ces données sont fournies par le [contrôleur d'admission de l'Agent Datadog][106] et contiennent :
- Un booléen indiquant si le conteneur est un conteneur init ou non.
- Le nom du conteneur.
- L'UID du pod.

Le format est le suivant :

`it-INIT_CONTAINER,cn-CONTAINER_NAME,pu-POD_UID`

Il se présenterait comme suit :

`it-false,cn-nginx-webserver,pu-75a2b6d5-3949-4afb-ad0d-92ff0674e759`

### Protocole DogStatsD v1.6

À partir de l'Agent `>=v7.64.0`, un nouveau champ Cardinality est pris en charge.
L'Agent Datadog utilise la valeur de cardinalité pour enrichir les métriques DogStatsD avec des tags de conteneur supplémentaires correspondant à leur cardinalité.

Le champ cardinality est préfixé par `card:`, par exemple :

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|card:<CARDINALITY>`

La cardinalité aura un impact sur l'enrichissement des tags pour les deux éléments suivants :
- [Tags Docker][105]
- [Tags Kubernetes][104]

Les valeurs disponibles pour la cardinalité sont les suivantes :
- `none`
- `low`
- `orchestrator`
- `high`

[101]: /fr/metrics/#metric-name
[102]: /fr/metrics/types/
[103]: /fr/getting_started/tagging/
[104]: /fr/containers/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[105]: /fr/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[106]: /fr/containers/cluster_agent/admission_controller
{{% /tab %}}
{{% tab "Événements" %}}

`_e{<LONGUEUR_TITRE_UTF8>,<LONGUEUR_TEXTE_UTF8>}:<TITRE>|<TEXTE>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITÉ>|t:<TYPE_ALERTE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>`

| Paramètre                            | Obligatoire | Rôle                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | Oui      | Le datagramme doit commencer par `_e`.                                                                                     |
| `<TITRE>`                            | Oui      | Titre de l'événement.                                                                                                       |
| `<TEXTE>`                             | Oui      | Texte de l'événement. Ajoutez des sauts de ligne avec `\\n`.                                                                        |
| `<LONGUEUR_TITRE_UTF8>`                | Oui      | La longueur (en octets) du `<TITRE>` encodé en UTF-8                                                                              |
| `<LONGUEUR_TEXTE_UTF8>`                 | Oui      | La longueur (en octets) du `<TEXTE>` encodé en UTF-8                                                                               |
| `d:<TIMESTAMP>`                      | Non       | Ajoute un timestamp à l'événement. Valeur par défaut ; timestamp epoch Unix actuel.                                         |
| `h:<HOSTNAME>`                       | Non       | Ajouter un hostname à l'événement. Par défaut, il s'agit de l'instance de l'Agent Datadog.                                                                               |
| `k:<CLÉ_AGGRÉGATION>`                | Non       | Ajoute une clé d'agrégation afin de regrouper les événements qui possèdent la même clé. Pas de valeur par défaut.                              |
| `p:<PRIORITÉ>`                       | Non       | Défini sur `normal` ou `low`. Valeur par défaut : `normal`.                                                                            |
| `s:<NOM_TYPE_SOURCE>`               | Non       | Ajoute un type de source à l'événement. Pas de valeur par défaut.                                                                            |
| `t:<TYPE_ALERTE>`                     | Non       | Définir `error`, `warning`, `info`, ou `success`. Valeur par défaut : `info`.                                                        |
| `#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>` | Non       | La virgule dans les tags fait partie de la chaîne de liste de tags et ne sert pas au parsing comme pour les autres paramètres. Pas de valeur par défaut. |

Voici quelques exemples de datagrammes :

```text
## Envoyer une exception
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## Envoyer un événement avec un saut de ligne dans le texte
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

{{% /tab %}}
{{% tab "Checks de service" %}}

`_sc|<NOM>|<STATUT>|d:<TIMESTAMP>|h:<HOSTNAME>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>|m:<MESSAGE_CHECK_SERVICE>`

| Paramètre                            | Obligatoire | Rôle                                                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                | Oui      | Le datagramme doit commencer par `_sc`.                                                                                                     |
| `<NOM>`                             | Oui      | Nom du check de service.                                                                                                                 |
| `<STATUT>`                           | Oui      | Nombre entier correspondant à l'état du check (OK = `0`, WARNING =  1`, CRITICAL = `2`, UNKNOWN = `3`).                                  |
| `d:<TIMESTAMP>`                      | Non       | Ajoute un timestamp au check. Valeur par défaut : timestamp epoch Unix actuel.                                                          |
| `h:<HOSTNAME>`                       | Non       | Ajoute un hostname à l'événement (pas de valeur par défaut).                                                                                               |
| `#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>` | Non       | Définit les tags de l'événement. Liste de chaînes séparées par des virgules (pas de valeur par défaut).                                                           |
| `m:<MESSAGE_CHECK_SERVICE>`          | Non       | Message décrivant l'état actuel du check de service. Ce champ doit être placé en dernier parmi les champs des métadonnées (pas de valeur par défaut). |

Voici un exemple de datagramme :

```text
# Envoyer un statut CRITICAL pour une connexion à distance
_sc|Redis connection|2|#env:dev|m:La connexion à Redis a expiré après 10 s
```

{{% /tab %}}
{{< /tabs >}}

## Envoyer des statistiques à l'aide de DogStatsD et de l'interface système

Pour Linux et d'autres systèmes d'exploitation comme Unix, utilisez Bash. Pour Windows, utilisez Powershell et [Powershell-statsd][3] (une fonction Powershell simple qui gère des bits réseau).

DogStatsD crée un message qui contient des informations à propos de votre métrique, événement ou check de service et l'envoie à un Agent installé en local sous la forme d'un collecteur. L'adresse IP de destination est `127.0.0.1` et le port du collecteur via UDP est `8125`. Consultez la section [DogStatsD][3] pour en savoir plus sur la configuration de l'Agent.

{{< tabs >}}
{{% tab "Métriques" %}}

Voici le format d'envoi de métriques :

```text
<NOM_MÉTRIQUE>:<VALEUR>|<TYPE>|@<TAUX_ÉCHANTILLONNAGE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>
```

Les exemples ci-dessous envoient des points de données pour une métrique gauge `custom_metric` avec le tag `shell`.

Sur Linux :

```shell
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Sur Windows :

```powershell
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

Sur toute plateforme disposant de Python (sur Windows, l'interpréteur Python intégré de l'Agent peut être utilisé ; il se trouve à l'emplacement `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe` pour les versions de l'Agent <= 6.11 et dans `%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` pour les versions de l'Agent >= 6.12) :

### Python 2

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Python 3

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

{{% /tab %}}
{{% tab "Événements" %}}

Voici le format d'envoi d'événements :

```text
_e{<TITRE>.length,<TEXTE>.length}:<TITRE>|<TEXTE>|d:<ÉVÉNEMENT_DATE>|h:<HOSTNAME>|p:<PRIORITÉ>|t:<TYPE_ALERTE>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>,<TAG_2>.
```

Les exemples ci-dessous calculent la taille du titre et du corps de l'événement.

Sur Linux :

```shell
$ title="Événement depuis le shell"

$ text="Cet événement a été envoyé depuis Bash !"

$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

Sur Windows :

```powershell
PS C:> $title = "Événement depuis le shell"
PS C:> $text = "Cet événement a été envoyé depuis PowerShell !"
PS C:> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

{{% /tab %}}
{{% tab "Checks de service" %}}

Voici le format d'envoi des checks de service :

```text
_sc|<NOM>|<STATUT>|d:<TIMESTAMP>|h:<HOSTNAME>|#<CLÉ_TAG_1>:<VALEUR_TAG_1>|m:<MESSAGE_CHECK_SERVICE>
```

Sur Linux :

```shell
echo -n "_sc|Connexion Redis|2|#env:dev|m:La connexion Redis a expiré après 10 s" >/dev/udp/localhost/8125
```

Sur Windows :

```powershell
PS C:\> .\send-statsd.ps1 "_sc|Redis connection|2|#env:dev|m:La connexion à Redis a expiré après 10 s"
```

{{% /tab %}}
{{< /tabs >}}

Pour envoyer des métriques, des événements ou des checks de service sur des environnements conteneurisés, consultez la section relative à [l'utilisation de DogStatsD sur Kubernetes][3], conjointement avec les instructions de [configuration de l'APM sur Kubernetes][4], en fonction de votre installation. La documentation sur l'[APM Docker][5] peut également vous venir en aide.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /fr/developers/dogstatsd/
[4]: /fr/agent/kubernetes/apm/
[5]: /fr/agent/docker/apm/