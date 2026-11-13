---
description: Apprenez à utiliser les fonctions du Custom Processor, telles que le
  décodage et l'encodage Base64, et consultez des exemples de scripts pour les cas
  d'utilisation courants de transformation de logs.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/custom_processor/
  tag: Documentation
  text: En savoir plus sur le Custom Processor
- link: /observability_pipelines/set_up_pipelines/
  tag: Documentation
  text: Configurer des pipelines
- link: https://www.datadoghq.com/blog/migrate-historical-logs/
  tag: Blog
  text: Migrer les logs historiques depuis Splunk et Elasticsearch à l'aide d'Observability
    Pipelines
title: Premiers pas avec le Custom Processor
---
## Présentation {#overview}

Observability Pipelines vous permet de transformer vos logs avant de les envoyer vers vos destinations. Utilisez le Custom Processor pour créer des scripts avec des fonctions personnalisées qui modifient conditionnellement les champs, les valeurs et les événements des logs.

Ce guide vous explique comment utiliser les fonctions suivantes dans votre script Custom Processor :

- [Décoder le Base64](#decode-base64)
- [Décoder un événement Base64 entier](#decode-an-entire-base64-encoded-event)
- [Encoder en Base64](#encode-base64)

Il passe également en revue des exemples de scripts qui traitent des cas d'utilisation courants, tels que :

- [Remapper les horodatages pour les logs historiques](#remap-timestamps-for-historical-logs)
- [Extraire un champ du tableau de tags Datadog (`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [Référencer la valeur d'un autre champ](#reference-another-fields-value)
- [Supprimer les attributs contenant des valeurs nulles](#remove-attributes-containing-null-values)
- [Fusionner les attributs imbriqués au niveau racine](#merge-nested-attributes-to-root-level)
- [Sérialiser les logs sortants au format _raw](#serialize-outbound-logs-in-_raw-format)

## Décoder le Base64 {#decode-base64}

Pour les champs ou événements de logs entrants encodés en Base64, utilisez la fonction [`decode_base64`][1] pour décoder le champ ou l'événement. La syntaxe de cette fonction fonctionne également pour [`decode_base16`][1].

### Exemple {#example}

#### Entrée {#input}

Exemple d'événement de log contenant un champ Base64 à décoder :

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### Fonction personnalisée {#custom-function}

Utilisez la fonction `decode_base64` pour décoder `payload` et stocker le résultat dans un nouveau champ appelé `decoded_payload`.

```yaml
.decoded_payload = decode_base64!(.payload)
```


Alternativement, vous pouvez réécrire la valeur `payload` originale avec la valeur décodée en remplaçant `decoded_payload` dans la fonction précédente par `payload`.

```yaml
.payload = decode_base64!(.payload)
```

#### Sortie {#output}

La sortie lorsque vous utilisez `decoded_payload` pour stocker la valeur décodée.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ==",
    "decoded_payload": "User requested access to protected resource"
}
```

## Décoder un événement entier encodé en Base64 {#decode-an-entire-base64-encoded-event}

### Exemple {#example-1}

#### Entrée {#input-1}

Exemple d'entrée d'un événement encodé en Base64 :

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### Fonction personnalisée {#custom-function-1}

Le script pour décoder l'événement entier encodé en Base64 `raw`.

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**Remarque :** La syntaxe `. = .full_event` est un raccourci pour remplacer l'événement entier par le contenu d'un champ.

#### Sortie {#output-1}

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Encoder en Base64 {#encode-base64}

Pour les champs de log ou les événements sortants que vous souhaitez encoder en Base64, utilisez la fonction [`encode_base64`][2] pour encoder le champ ou l'événement. La syntaxe de cette fonction fonctionne également pour [`encode_base16`][3].

### Exemple {#example-2}

#### Entrée {#input-2}

Exemple d'événement de log contenant le champ `message` que vous souhaitez encoder en Base64 :

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### Fonction personnalisée {#custom-function-2}

Utilisez la fonction `encode_base64` pour décoder `message` et stocker le résultat dans un nouveau champ appelé `encoded_message`.

```yaml
.encoded_message = encode_base64!(.message)
```

Alternativement, vous pouvez écraser le champ de message d'origine (`message`) avec la valeur décodée en remplaçant `encoded_message` dans la fonction précédente par `message`.

```yaml
.message = encode_base64!(.message)
```

#### Sortie {#output-2}

La sortie lorsque vous utilisez `encoded_message` pour stocker la valeur encodée.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## Remapper les horodatages pour les logs historiques {#remap-timestamps-for-historical-logs}

Si vous souhaitez migrer des logs archivés depuis d'autres plateformes, il est essentiel de s'assurer que ces logs possèdent l'horodatage historique correct. Le remappage des logs avec des horodatages historiques vous permet de gérer les anciens logs stockés à des fins de conformité, d'audit et d'archivage.

### Exemple {#example-3}

#### Entrée {#input-3}

Si le Worker ne trouve pas le champ `timestamp` sur un log, l'horodatage du moment où le Worker a reçu le log est utilisé. Ceci est un exemple de log montrant l'horodatage du moment où le Worker a reçu le log, ainsi que l'horodatage historique du log (`historical_ts`), qui est la valeur que le Worker recherche.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### Fonction personnalisée {#custom-function-3}

Pour l'exemple ci-dessus, vous pouvez créer une fonction pour stocker l'horodatage ingéré dans un nouveau champ et remapper `timestamp` sur la valeur `historical_ts`.

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### Sortie {#output-3}

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Extraire un champ du tableau de tags Datadog {#extract-a-field-from-the-datadog-tags-array}

Les champs imbriqués dans le tableau de tags Datadog (`ddtags`) peuvent contenir des informations utiles. Vous pouvez souhaiter extraire ces champs en tant que paires clé-valeur de premier niveau, ou en tant que valeurs pour d'autres champs.

### Exemple {#example-4}

#### Entrée {#input-4}

Exemple de log contenant le tableau `ddtags` avec des tags Datadog.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "service:chaos-engineering",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Fonction personnalisée pour extraire le champ env {#custom-function-to-extract-the-env-field}

```yaml
#Extract a tag from ddtags array and elevate as log attribute
.my_tag, err = filter(array!(.ddtags)) -> |_index, value| {
    #Keep any elements that have the key name "env"
    starts_with(value, "env:")
}
#Assign env to be value of the key
.env = split!(.my_tag[0], ":")[1]
del(.my_tag)

```

#### Sortie {#output-4}

```json
{
   "ddsource": "python",
   "ddtags": [
       "env:prod",
       "team:sre",
       "service:chaos-engineering",
       "version:1.0.0",
       "pod_name:load-generator-main-abcde"
   ],
   "env": "prod",
   "hostname": "gke-prod-node-abc123.internal",
   "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
   "service": "chaos-engineering",
   "source_type": "datadog_agent",
   "status": "info",
   "timestamp": "2025-005-27T05:26:18.205Z"
}
```
## Ajouter un tag à l'événement de log {#add-a-tag-to-the-log-event}

Les tags sont utilisés pour corréler les logs avec d'autres télémétries et services. Ils sont stockés dans des tableaux sous forme de paires `key:value` entourées de guillemets (par exemple, `"service:payments-app"`). Pour les logs Datadog spécifiquement, les tags sont imbriqués dans le tableau de tags Datadog (`ddtags`). Utilisez les scripts ci-dessous pour convertir un tag à partir d'un attribut existant ou pour ajouter un nouveau tag.

### Exemple pour convertir un attribut en tag {#example-to-convert-an-attribute-to-a-tag}

#### Entrée {#input-5}

Dans cet exemple, le log échantillon contient un tableau `ddtags`, et vous souhaitez ajouter le champ `service` en tant que tag. 

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Fonction personnalisée pour convertir l'attribut `service` en tag {#custom-function-to-convert-the-service-attribute-to-a-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# This example checks if 'service' exists, then adds the templatized value of service as a tag. Also, it converts the service value to a string
if exists(.service) {
  .ddtags = push(array!(.ddtags), "service:" + to_string!({{.service}}) )
}

```

#### Sortie {#output-5}

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```
### Exemple pour créer et ajouter un tag {#example-to-create-and-add-a-tag}

#### Entrée {#input-6}

Dans cet exemple, le log échantillon contient le tableau `ddtags`, et vous souhaitez créer un tag appelé `"system:service-mesh"` et l'ajouter au tableau.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Fonction personnalisée pour créer et ajouter le tag `system` {#custom-function-to-create-and-add-the-system-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# Appends a new tag to the array by defining a separate key:value pair
.ddtags = push(array!(.ddtags), "system:service-mesh")

```

#### Sortie {#output-6}

```json
{
	"ddsource": "python",
	"ddtags": [
		"env:prod",
		"team:sre",
		"version:1.0.0",
		"pod_name:load-generator-main-abcde",
		"system:service-mesh"
	],
	"hostname": "gke-prod-node-abc123.internal",
	"message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
	"service": "chaos-engineering",
	"source_type": "datadog_agent",
	"status": "info",
	"timestamp": "2025-005-27T05:26:18.205Z"
}
```

## Référencer la valeur d'un autre champ {#reference-another-fields-value}

Si vous souhaitez que la valeur d'un champ soit basée sur un autre champ, vous pouvez référencer dynamiquement la valeur de cet autre champ.

### Exemple {#example-5}

#### Entrée {#input-7}

Pour cet exemple, vous disposez d'un champ de service qui contient un nom de service incorrect, et vous souhaitez utiliser la valeur de `app_id` pour le service à la place.

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### Fonction personnalisée {#custom-function-4}

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### Sortie {#output-7}

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## Supprimer les attributs contenant des valeurs nulles {#remove-attributes-containing-null-values}

Les attributs avec des valeurs nulles ou vides peuvent alourdir inutilement vos logs. Supprimez les valeurs nulles pour alléger le log et n'envoyer que les attributs qui fournissent des informations. Dans le script ci-dessous, la section `empty_patterns` contient la liste des modèles vides à rechercher dans vos logs. Vous pouvez ajouter et supprimer des modèles pour les adapter à votre cas d'utilisation.

```json
# Define your empty patterns
empty_patterns = ["null", "NULL", "N/A", "n/a", "none", "NONE", "-", "undefined"]

# Apply generic cleanup
. = compact(map_values(., recursive: true) -> |v| {
 if is_null(v) ||
    includes(empty_patterns, v) ||
    (is_string(v) && strip_whitespace!(v) == "") ||
    (is_array(v) && length!(v) == 0) ||
    (is_object(v) && length!(v) == 0) {
   null
 } else {
   v
 }
})
```

## Fusionner les attributs imbriqués au niveau racine {#merge-nested-attributes-to-root-level}

Cibler des objets ou des champs imbriqués dans une requête de filtre peut nécessiter la définition de plusieurs chemins. Ceci est courant lorsque vous travaillez avec le champ de message, où le contenu analysé résultant est imbriqué dans un objet. Lorsque vous utilisez la syntaxe de filtre d'Observability Pipelines, l'accès à un champ imbriqué nécessite la notation `<OUTER_PATH>.<INNER_PATH>`.

Par exemple, ce log contient un message JSON sous forme de chaîne :

```json
{
 "level": "info",
 "message": "{\"event_type\":\"user_login\",\"result\":\"success\",\"login_method\":\"oauth\",\"user_agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\",\"ip_address\":\"192.168.1.100\",\"session_id\":\"sess_abc123xyz\",\"duration_ms\":245}",
 "timestamp": "2019-03-12T11:30:00Z",
 "processed_ts": "2025-05-22T14:30:00Z",
 "user_id": "12345",
 "app_id": "streaming-services",
 "ddtags": [
   "kube_service:my-service",
   "k8_deployment:your-host",
   "kube_cronjob:myjob"
 ]
}
```

Voici la sortie après l'analyse du champ `message`. Le contenu analysé est imbriqué dans l'objet `message`.

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```
Dans ce cas, pour filtrer `event_type`, vous devez spécifier `@message.event_type`. Pour filtrer directement `event_type` ou un autre champ au sein d'un objet, Datadog recommande d'aplatir l'objet au niveau racine.

Pour fusionner les événements de l'objet `message` au niveau racine, utilisez ce script :

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**Remarque** : Ce script fonctionne avec n'importe quel objet JSON. Il vous suffit de remplacer l'attribut `message` par le nom du champ que vous essayez d'aplatir.

Cela donne un log avec des attributs aplatis que vous pouvez filtrer directement :

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "duration_ms": 245,
   "event_type": "user_login",
   "ip_address": "192.168.1.100",
   "level": "info",
   "login_method": "oauth",
   "processed_ts": "2025-05-22T14:30:00Z",
   "result": "success",
   "session_id": "sess_abc123xyz",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
   "user_id": "12345"
}
```

**Remarque** : Si vous aplatissez le champ message, le log résultant ne contient plus d'objet message. Cela signifie que si le log est envoyé à Datadog, lorsque vous le consultez dans le Log Explorer, vous ne verrez pas de section {{< ui >}}Log Message{{< /ui >}} dans le panneau latéral du log.

## Sérialiser les logs sortants au format _raw {#serialize-outbound-logs-in-raw-format}

Splunk et CrowdStrike préfèrent un format appelé `_raw` pour l'ingestion de logs. L'envoi de données au format `_raw` normalise vos logs et vous permet de bénéficier de leurs tableaux de bord, moniteurs et contenus de détection des menaces prêts à l'emploi. Pour vous assurer que le format de log `_raw` est appliqué, vous pouvez sérialiser l'événement sortant au format `_raw`.

**Remarques** :
- Vous devez ajouter d'autres étapes de traitement, de remappage et de parsing avant de sérialiser vos logs au format `_raw`.
- Pour vous assurer que vos logs sont correctement acheminés après la sérialisation, configurez votre destination préférée avec {{< ui >}}Raw{{< /ui >}} comme type d'encodage. 

Exemple de log d'entrée :

```json
{
   "app_id": "streaming-services",
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```

Cette fonction personnalisée sérialise l'événement au format `_raw` :

```json
# Serialize the entire event into _raw
._raw = encode_key_value!(.)
# Only keep _raw
. = { "_raw": ._raw }
```

Voici le résultat du log d'exemple après son traitement par le script personnalisé :

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/processors/custom_processor/#decode_base16
[2]: /fr/observability_pipelines/processors/custom_processor/#encode_base64
[3]: /fr/observability_pipelines/processors/custom_processor/#encode_base16