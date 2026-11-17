---
aliases:
- /fr/observability_pipelines/guide/upgrade_worker_2_7/
description: Découvrez les nouvelles fonctionnalités, améliorations et correctifs
  des versions 2.7 à 2.25 du Worker.
disable_toc: false
title: Guide de mise à niveau du Worker
---
## Présentation {#overview}

<div class="alert alert-info">
Datadog recommande de mettre à jour l'Observability Pipelines Worker (OPW) à chaque nouvelle version mineure ou corrective, ou au minimum tous les mois. <br><br> La mise à niveau vers la dernière version majeure d'OPW et son maintien à jour constituent le seul moyen pris en charge pour bénéficier des nouvelles fonctionnalités, correctifs et mises à jour de sécurité d'OPW.
</div>

Ce guide explique comment effectuer une mise à niveau vers une version spécifique du Worker et détaille les mises à jour de cette version.

## Version 2.25.0 du Worker {#worker-version-2250}

Pour mettre à niveau vers la version 2.25.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.25.0][62].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.25.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.25.0`.

La version 2.25.0 du Worker vous donne accès aux éléments suivants :

#### Security {#security}

- Mise à jour du magasin de certificats racine Mozilla fourni avec le Worker. Le magasin n'inclut plus `emSign ECC Root CA - G3`, qui a été supprimé après la [compromission du certificat intermédiaire eMudhra][61], ni d'autres certificats racine auxquels Mozilla ne fait plus confiance. En conséquence :
    - Les composants qui utilisent le magasin racine intégré ne font plus confiance aux chaînes de certificats passant par les intermédiaires emSign non approuvés.
    - Les connexions TLS aux serveurs dont les chaînes de certificats se terminent par une racine supprimée échouent à la validation.
- Les messages d'erreur que le Worker signale à Datadog lorsqu'un composant plante sont désormais soumis aux mêmes règles de masquage des données sensibles que les journaux du Worker.

#### Améliorations {#enhancements}

- Les journaux du processeur Grok Parser incluent désormais :
    - Un champ `rule` qui identifie la source de la règle.
    - Un champ `rule_kind` qui indique le type de règle comme `custom` ou `library`.

  Les journaux d'erreur de compilation de règles n'incluent plus de champ `source` distinct. Si vous filtrez sur `source`, filtrez plutôt sur `rule`.
- La destination Datadog BYOC Logs présente désormais le certificat client mTLS ayant fait l'objet d'une rotation dès la requête suivant la détection de cette rotation. Auparavant, la destination continuait d'utiliser l'ancien certificat jusqu'à ce que les connexions existantes atteignent leur durée de vie maximale, ce qui pouvait prendre jusqu'à une heure. Les connexions sont toujours rétablies au moins une fois par heure.
- La variable d'environnement `DD_OP_REDUCE_WINDOW_SECS` est désormais disponible pour définir la durée pendant laquelle les processeurs Reduce agrègent les événements avant d'émettre un groupe.
- Le processeur Sample limite désormais la mémoire pour le suivi des groupes d'échantillonnage à 128 MiB. Lorsqu'il atteint la limite, il évince les groupes les moins récemment utilisés.
- Les performances d'ingestion des journaux du Worker ont été améliorées.

#### Correctifs {#fixes}

- Lorsqu'une source ou une destination échoue, le Worker journalise désormais l'erreur sous-jacente, telle que `Address already in use`, au lieu de se limiter à `the task completed with an error`. Si un composant déclenche une panique, les journaux incluent également le message de panique.
- La source Google Pub/Sub se reconnecte désormais immédiatement, sans journaliser d'erreur, lorsque le serveur réinitialise un streaming pull.
- La source Google Pub/Sub fait désormais confiance à chaque certificat du fichier CA configuré, et non plus seulement au dernier.
- La source OpenTelemetry répond désormais aux requêtes gRPC pour les services non pris en charge avec le statut gRPC `UNIMPLEMENTED` au lieu de HTTP 404. Ces requêtes ne journalisent plus d'erreur et n'incrémentent plus la métrique `component_errors_total`.
- Le Worker suit désormais les journaux internes abandonnés en cas de charge élevée dans `component_discarded_events_total` avec `intentional:false`. Cela affecte uniquement les composants internes (`component_id:_*`), pas les données de pipeline.

## Version 2.24.1 du Worker {#worker-version-2241}

Pour mettre à niveau vers la version 2.24.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.24.1][60].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.24.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.24.1`.

La version 2.24.1 du Worker vous donne accès aux éléments suivants :

#### Security {#security-1}

- Mise à jour de `rustls-webpki` à la version 0.103.16. Le Worker rejette désormais les chaînes de certificats qui incluent l'une des [autorités de certification (AC) intermédiaires eMudhra dont les clés privées ont été signalées comme compromises][61]. Le Worker rejette ces chaînes même lorsque l'AC racine émettrice est approuvée.

  Cette protection s'applique uniquement aux composants qui utilisent rustls. Les composants suivants utilisent plutôt le magasin de confiance des AC du système :
    - Composants utilisant OpenSSL
    - La recherche de compte AWS de la destination Amazon Security Lake
    - La source Google Cloud Pub/Sub

  Pour protéger les composants qui utilisent le magasin de confiance des AC du système :
    - **Image de conteneur** : Aucune action n'est nécessaire, sauf si vous montez votre propre ensemble de certificats d'AC ou si vous définissez `SSL_CERT_FILE`. L'image de conteneur du Worker ne fait pas confiance à `emSign ECC Root CA - G3`.
    - **Paquets APT et RPM** : ne faites pas confiance à `emSign ECC Root CA - G3` tant que votre distribution ne fournit pas de paquet `ca-certificates` mis à jour. Sur les anciennes distributions, ne faites pas non plus confiance à `AAA Certificate Services`, que Debian et Ubuntu fournissent sous le nom de `Comodo_AAA_Services_root`.

#### Correctifs {#fixes-1}

- Correction d'un problème où les requêtes de recherche omettaient silencieusement des opérandes dans des groupes `OR` qui combinaient des valeurs exactes avec d'autres opérandes, tels que des caractères génériques, des plages ou d'autres attributs. Auparavant, des requêtes telles que `@url:(nope OR aa* OR dummy/api/v1/check_run)` pouvaient manquer des événements correspondants en raison du caractère générique.
- Le Worker traite désormais les métacaractères regex (`.`, `+`, `^`, `$`, `(`, `[`, `|`) dans les modèles de caractères génériques des requêtes de recherche comme des caractères littéraux. Par exemple, `@url:dummy\/api.v1*` ne correspond plus à `dummy/api/v1/check_run`.

## Version 2.24.0 du Worker {#worker-version-2240}

Pour mettre à niveau vers la version 2.24.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.24.0][59].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.24.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.24.0`.

La version 2.24.0 du Worker vous donne accès aux éléments suivants :

#### Security {#security-2}

- La destination Datadog BYOC Logs ne transmet plus à BYOC Logs la clé d'API du Worker pour la Datadog API.

#### Améliorations {#enhancements-1}

- Le processeur Enrichment Table :
    - Rapporte la métrique `enrichment_distinct_lookup_keys_total`, qui est une estimation des clés de recherche distinctes totalisées sur des fenêtres d'une seconde.
    - A des performances améliorées lors des remplissages de cache importants.
    - Recharge les valeurs du tableau toutes les 30 secondes. Si un rechargement échoue, le processeur continue d'utiliser le dernier tableau valide jusqu'à ce qu'un rechargement réussisse.
    - Met en cache localement jusqu'à 1 million de lignes de Reference Table pendant 1 heure, ce qui améliore la gestion des grands tableaux.
    - Ajoute un tag `outcome` à sa métrique de clés récupérées pour identifier les tentatives de recherche ayant échoué.
    - Dispose d'un tampon d'une capacité par défaut de 20,000 événements ou 100 MiB, et d'une capacité maximale de 100,000 événements.
- L'option d'agrégation de métriques du processeur Generate Metrics est désormais activée par défaut, de sorte que les métriques générées sont agrégées sauf si vous désactivez l'option.
- Le Worker utilise désormais `aws-lc-rs` comme fournisseur de cryptographie pour les connexions TLS basées sur rustls. Les suites de chiffrement TLS négociées pour certaines connexions, telles que Databricks Zerobus, peuvent différer de celles des versions précédentes. Les connexions TLS basées sur OpenSSL ne sont pas affectées.
- Le Custom Processor offre désormais de meilleures performances, notamment grâce à des recherches de champs et à des fonctions de chaîne plus efficaces.
- Le démarrage de la configuration du Worker est désormais plus rapide.
- La métrique `pipelines.quota_fill` possède désormais un tag `quota_name`. Le Worker conserve l'ancien tag `name` pour assurer la rétrocompatibilité.

#### Correctifs {#fixes-2}

- Les règles de bibliothèque du processeur Sensitive Data Scanner utilisent désormais des groupes de capture de motifs pour préserver le contexte non sensible autour de la valeur capturée. Auparavant, le Worker ignorait les groupes de capture. Par exemple, la règle d'adresse IPv4 masque désormais `172.16.0.1:80` sous la forme de `<REDACTION TEXT>:80` au lieu de `<REDACTION TEXT>80`.
- Les processeurs Grok Parser, Parse JSON et Parse XML enregistrent désormais un avertissement au lieu d'une erreur lorsqu'un champ ne parvient pas à être analysé. Le message d'erreur du processeur Parse JSON nomme également le champ qui n'a pas pu être analysé, plutôt que d'utiliser le mot générique `source`.
- Correction d'un problème où le rechargement de composants spécifiques après des mises à jour de configuration pouvait entraîner leur redémarrage inutile lors de mises à jour de configuration ultérieures, réinitialisant ainsi leur état.
- La source OpenTelemetry préserve désormais les noms d'événements de journal OTLP natifs.
- La source Prometheus identifie désormais les métriques se terminant par `_total` comme des compteurs.
- Correction d'un problème avec le filtre `keyvalue` dans les fonctions `parse_grok` et `parse_groks` du Custom Processor. Le filtre ne provoque plus de panique lors du traitement de valeurs `NaN` sans guillemets, telles que `ratio=NaN`.
## Version 2.23.2 du Worker {#worker-version-2232}

Pour mettre à niveau vers la version 2.23.2 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.23.2][58].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.23.2`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.23.2`.

La version 2.23.2 du Worker vous donne accès aux éléments suivants :

#### Améliorations {#enhancements-2}

- La destination Datadog Logs tronque désormais les événements de journal supérieurs à 900 Ko. Auparavant, les événements de journal supérieurs à la limite de taille de lot étaient supprimés au lieu d'être tronqués.

#### Correctifs {#fixes-3}

- Correction des images Docker afin que le binaire du connecteur générique de secrets (`sgc`) soit exécutable par l'utilisateur de service `observability-pipelines-worker`.

## Version 2.23.1 du Worker {#worker-version-2231}

Pour mettre à niveau vers la version 2.23.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.23.1][57].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.23.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.23.1`.

La version 2.23.1 du Worker vous donne accès aux éléments suivants :

#### Security {#security-3}

- Mise à jour du binaire intégré du connecteur générique de secrets (`sgc`) vers la version livrée avec Datadog Agent 7.84.1, qui corrige la CVE-2026-56854.

## Version 2.23.0 du Worker {#worker-version-2230}

Pour mettre à niveau vers la version 2.23.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.23.0][56].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.23.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.23.0`.

<div class="alert alert-warning"><strong>Modification incompatible :</strong> Cette modification affecte uniquement les scripts du Custom Processor qui utilisent les <code>contains_all</code>, <code>encode_key_value</code>, <code>encode_logfmt</code>, <code>ip_cidr_contains</code>, <code>join</code>, <code>parse_groks</code>, ou <code>tally</code> fonctions.<br><br>Ces fonctions vérifient désormais les types d'éléments de leurs arguments de tableau lors de la compilation du script. Le passage d'un tableau avec un type d'élément incorrect, tel que <code>join([1, 2, 3])</code>, constitue désormais une erreur de compilation au lieu d'une défaillance à l'exécution. Lorsque le Worker peut confirmer que les éléments sont du type correct, le <code>!</code> suffixe n'est plus nécessaire et déclenche un avertissement. Par exemple, utilisez <code>join(["sources", "transforms", "sinks"], separator: ", ")</code> au lieu de <code>join!(["sources", "transforms", "sinks"], separator: ", ")</code>.</div>

La version 2.23.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features}

- Le processeur Enrichment Table prend désormais en charge les fichiers CSV et les Reference Tables dans les pipelines de métriques.
- Le Custom Processor prend désormais en charge l'instruction `break` pour quitter prématurément une boucle `for_each`.

#### Améliorations {#enhancements-3}

- La source OpenTelemetry limite désormais par défaut les requêtes simultanées à 100 et le temps de traitement des requêtes à 30 secondes. Ces limites s'appliquent aux points de terminaison HTTP et gRPC. Les requêtes qui ne peuvent pas être traitées à temps reçoivent une réponse indiquant qu'elles peuvent être réessayées. Utilisez les variables d'environnement `DD_OP_SOURCE_OTEL_MAX_CONCURRENT_REQUESTS` et `DD_OP_SOURCE_OTEL_REQUEST_TIMEOUT_SECS` pour remplacer ces limites.
- La destination Databricks Zerobus identifie désormais le Worker dans son en-tête `User-Agent`.
- Pour le Custom Processor :
    - Les performances globales du processeur ont été améliorées.
    - La fonction `for_each` itère désormais directement sur les collections, ce qui améliore les performances et réduit l'utilisation de la mémoire.
    - Les fonctions `md5`, `sha1`, `sha2` et `sha3` s'exécutent désormais plus rapidement.

#### Correctifs {#fixes-4}

- Les chemins des fichiers de configuration, tels que les certificats TLS, les tableaux d'enrichissement et les fichiers d'identifiants GCP, sont désormais résolus par rapport au `data_dir` défini dans `bootstrap.yaml`. Auparavant, si `data_dir` était défini uniquement dans `bootstrap.yaml` et non avec la variable d'environnement `DD_OP_DATA_DIR`, le Worker recherchait ces fichiers dans le répertoire de données par défaut et rejetait des fichiers valides en les considérant comme manquants.
- Les sources incluent désormais l'`peer_addr` distant dans les journaux d'erreurs d'accusé de réception TCP et les journaux d'erreurs de connexion TLS.
- La fonction `uuid_v7` du Custom Processor préserve désormais l'horodatage fourni avec une précision à la milliseconde.

## Version 2.22.0 du Worker {#worker-version-2220}

Pour mettre à niveau vers la version 2.22.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.22.0][55].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.22.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.22.0`.

<div class="alert alert-warning"><strong>Modification incompatible :</strong> Cette modification affecte uniquement les journaux qui contiennent un <code>attributes</code> objet de premier niveau et sont envoyés vers les destinations Datadog Archives (Amazon S3, Google Cloud Storage et Azure Blob Storage). Cette modification concerne particulièrement les journaux provenant de la source OpenTelemetry, qui contiennent généralement un <code>attributes</code> objet.<br><br>Les destinations Datadog Archives stockent les attributs de journal non-<a href="/logs/log_configuration/attributes_naming_convention/#reserved-attributes">réservés</a> dans un <code>attributes</code> objet. À partir de la version 2.22.0 du Worker, si un journal possède déjà un <code>attributes</code> objet, les destinations Datadog Archives réutilisent cet objet au lieu de l'imbriquer un niveau plus profondément. Si vous utilisez des requêtes avec la syntaxe <code>@attributes.&lt;field_name&gt;</code> sur des journaux réhydratés à partir d'une archive Observability Pipelines, utilisez <code>@&lt;field_name&gt;</code> à la place.</div>

La version 2.22.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-1}

- Le processeur Aggregate prend désormais en charge l'agrégation temporelle basée sur l'horodatage des événements, qui utilise les horodatages des métriques au lieu du temps de traitement. Une période de grâce configurable permet d'inclure les métriques arrivant en retard dans leur fenêtre temporelle basée sur l'horodatage des événements.

#### Améliorations {#enhancements-4}

- Le processeur Generate Metrics pour les pipelines de logs dispose désormais d'une option pour activer l'agrégation des métriques. Lorsque l'option est activée, les métriques générées sont regroupées par horodatage d'événement dans des compartiments d'une seconde. Cela empêche l'ingestion de métriques Datadog de supprimer les métriques générées au cours de la même seconde en raison du comportement « last-point-wins ».
- Les erreurs d'analyse de configuration pour une source, un processeur ou une destination incluent désormais l'ID et le type du composant, ainsi que le champ à l'origine de l'erreur lorsqu'il peut être déterminé.
- Les erreurs de recherche dans une Reference Table causées par l'échec d'une requête HTTP, par exemple en raison d'un dépassement du délai d'attente, d'une défaillance DNS ou d'une réinitialisation de connexion, indiquent désormais la cause sous-jacente au lieu d'un message `error sending request` générique.
- La destination Datadog BYOC Logs prend désormais en charge une limite de taille de charge utile HTTP configurable avec la variable d'environnement `DD_OP_DESTINATION_CLOUDPREM_MAX_PAYLOAD_BYTES`.
- Les sources suivantes ont désormais le keepalive TCP activé par défaut, avec un délai d'inactivité de 60 secondes. Cela permet de détecter les connexions rompues lorsque les clients se déconnectent sans envoyer de paquets FIN ou RST :
    - Datadog Agent
    - Fluentd et Fluent Bit
    - Logstash
    - OpenTelemetry (HTTP)
    - Socket (mode TCP)
    - Splunk HEC
    - Syslog (mode TCP)
- Le processeur Enrichment Table (CSV ou fichier) ne copie plus le tableau entier pour chaque lot d'événements, ce qui réduit l'utilisation de la mémoire et du processeur pour les grands tableaux d'enrichissement.

#### Correctifs {#fixes-5}

- La destination Syslog n'arrête plus le Worker lorsque le champ `timestamp` d'un journal n'est pas une valeur d'horodatage, par exemple lorsqu'il contient une chaîne JSON. Ces journaux utilisent désormais l'heure UTC actuelle dans l'en-tête syslog.
- Le décodeur de tramage `chunked_gelf` limite désormais à 128 MiB la charge utile totale mise en mémoire tampon pour les messages incomplets. Auparavant, un expéditeur non authentifié pouvait épuiser la mémoire en envoyant des blocs pour des messages qu'il ne terminait jamais, en particulier avec la source Socket en mode UDP.
- La source Logstash rejette désormais les trames supérieures à la limite configurée au lieu de les mettre en mémoire tampon indéfiniment. Auparavant, un expéditeur pouvait déclarer une trame extrêmement grande et forcer la source à conserver ses octets en mémoire jusqu'à épuisement de celle-ci.
- La source Splunk TCP tronque désormais les trames qui dépassent la limite `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` au lieu de supprimer les événements. Cela correspond au comportement `TRUNCATE` de Splunk.
- Correction d'un problème dans le décodeur de tramage `chunked_gelf` qui provoquait l'arrêt de la source lorsqu'un message d'un octet arrivait et que la journalisation au niveau trace était activée pour le décodeur. Le décodeur rejette désormais ces messages, comme il le fait pour d'autres charges utiles mal formées.
- Correction d'un problème dans lequel l'outil de suivi de l'utilisation d'une mémoire tampon interne restait actif après la suppression de cette mémoire tampon. Il continuait ainsi à publier des métriques obsolètes sous le même `buffer_id` que l'outil de suivi de la mémoire tampon de remplacement. Les métriques pour une mémoire tampon qui a été supprimée, plutôt que remplacée, expirent désormais également sous `expire_metrics_secs`, ce que les valeurs republiées en continu empêchaient auparavant.
- Correction des problèmes suivants avec les limites du décodeur de tramage `chunked_gelf` :
    - `pending_messages_limit` était appliqué à chaque bloc au lieu de seulement aux nouveaux messages. Une fois la limite atteinte, les blocs des messages déjà en attente étaient rejetés, si bien que ces messages ne pouvaient jamais être terminés.
    - L'abandon d'un message pour dépassement de `max_length` laissait sa tâche de délai d'attente en cours d'exécution, donc `pending_messages_limit` limitait le nombre de messages en attente mais pas le nombre de tâches de délai d'attente actives.
- Le paramètre d'endpoint FIPS s'applique désormais aux clients STS AssumeRole. Lorsque `AWS_USE_FIPS_ENDPOINT=true` est défini, le Worker utilise des endpoints FIPS, tels que `sts-fips.<region>.amazonaws.com`, pour les opérations STS ainsi que pour le client principal du service.
- Lorsqu'une charge utile de requête compressée ne parvient pas à être décompressée, le mode gRPC de la source OpenTelemetry inclut désormais l'erreur sous-jacente au lieu du message générique `reached impossible error during decompressor finalization`.

#### Métriques supprimées {#removed-metrics}

- Les métriques de jauge obsolètes `pipelines.buffer_byte_size` et `pipelines.buffer_events` ont été supprimées. Utilisez `pipelines.buffer_size_bytes` et `pipelines.buffer_size_events` à la place.

## Version 2.21.0 du Worker {#worker-version-2210}

Pour effectuer une mise à niveau vers la version 2.21.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.21.0][54].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.21.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.21.0`.

La version 2.21.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-2}

- Pour les pipelines de métriques :
    - La [source Prometheus][63] est désormais disponible.
    - La [destination Prometheus][64] est désormais disponible.
    - La [destination OpenTelemetry][65] est désormais disponible.
- Les destinations Datadog Archives (Amazon S3, Google Cloud Storage et Azure Blob Storage) prennent désormais en charge une option `compression` configurable (`gzip` ou `zstd`).
- Le processeur Remap to OCSF inclut désormais :
    - Le mappage OCSF pour AWS Config Rules.
    - La fonction de mappage OCSF `concat_strings`, qui concatène les représentations sous forme de chaînes de plusieurs champs source ou valeurs constantes.
- La destination Splunk HEC prend désormais en charge une option `endpoint_target` (`event` ou `raw`) pour déterminer vers quel endpoint Splunk HEC les événements sont envoyés.

#### Améliorations {#enhancements-5}

- La source Splunk TCP permet désormais de configurer le TCP keepalive et la limite du nombre de connexions.
- Les logs et traces internes du Worker sont désormais enrichis avec le nom du pipeline (`op_worker.pipeline_name:<pipeline_name>`), correspondant au tag déjà présent sur les métriques.
- La journalisation du Worker lors d'un arrêt contrôlé a été améliorée.
- La validation des endpoints de destination a été améliorée pour vérifier les URL incomplètes ou vides.
- La fonction `parse_aws_vpc_flow_log` du processeur Custom Processor reconnaît désormais tous les champs introduits dans les versions 7 à 11 d'Amazon VPC Flow Logs, notamment :
    - Version 7 : champs de métadonnées ECS
    - Version 8 : `reject_reason`
    - Version 9 : `resource_id`
    - Version 10 : `encryption_status`
    - Version 11 : champs de tag, d'interface et de saut suivant
- Le processeur Enrichment Table effectue désormais les opérations suivantes :
    - Conserve les lignes dans son cache pendant environ 30 minutes, que la recherche ait été positive ou négative
    - Répartit les événements qu'il produit en lots selon la taille des lots de l'expéditeur source

#### Correctifs {#fixes-6}

- Correction de la correspondance des motifs glob insensible à la casse dans les requêtes de recherche contenant du texte UTF-8, qui entraînait des plantages et des résultats incorrects pour les entrées non ASCII.
- Correction des téléversements vers Azure Blob Storage de plus de 4 MiB lors de l'utilisation d'une chaîne de connexion par clé de compte.
- Correction d'une erreur irrécupérable du Worker qui se produisait lorsqu'un enregistrement dépassait la taille maximale d'enregistrement du tampon. L'erreur est désormais journalisée et reflétée dans les métriques de santé `buffer_discarded_events_total` et `buffer_discarded_bytes_total` (avec `intentional="false"`).

## Version 2.20.4 du Worker {#worker-version-2204}

Pour mettre à niveau vers la version 2.20.4 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.20.4][53].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.20.4`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.20.4`.

La version 2.20.4 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-7}

- La source Splunk TCP imposait auparavant une longueur de trame maximale codée en dur de 10 000 octets. Le Worker rejetait les événements plus volumineux et enregistrait des avertissements. La source ne limite plus la longueur de la trame par défaut. Pour éviter une consommation de mémoire illimitée, utilisez la variable d'environnement `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` pour définir une longueur de trame maximale.




## Version 2.20.3 du Worker {#worker-version-2203}

Pour mettre à niveau vers la version 2.20.3 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.20.3][52].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : exécutez la commande `apt-get install observability-pipelines-worker=2.20.3`.
- RPM : exécutez la commande `sudo yum install observability-pipelines-worker-2.20.3`.

La version 2.20.3 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-8}

- Correction de l'écouteur gRPC de la source OpenTelemetry pour annoncer `h2` via ALPN lorsque TLS est activé. Auparavant, les clients gRPC se connectant via TLS pouvaient ne pas parvenir à établir une connexion.

## Version 2.20.2 du Worker {#worker-version-2202}

Pour mettre à niveau vers la version 2.20.2 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.20.2][51].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : exécutez la commande `apt-get install observability-pipelines-worker=2.20.2`.
- RPM : exécutez la commande `sudo yum install observability-pipelines-worker-2.20.2`.

La version 2.20.2 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-9}

- Correction d'un problème où les valeurs non finies (NaN ou Infinity) des jauges, des deltas de compteurs et des sommes de deltas d'histogrammes, ainsi que les histogrammes à comptage nul, pouvaient être sérialisés dans des charges utiles de métriques OTLP mal formées. Ces données sont désormais supprimées avant l'encodage OTLP.

## Version 2.20.0 du Worker {#worker-version-2200}

Pour mettre à niveau vers la version 2.20.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.20.0][50].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : exécutez la commande `apt-get install observability-pipelines-worker=2.20.0`.
- RPM : exécutez la commande `sudo yum install observability-pipelines-worker-2.20.0`.

La version 2.20.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-3}

- Les sources OpenTelemetry et Splunk HEC prennent désormais en charge le rechargement à chaud des certificats TLS, de sorte que les rotations de certificats sont appliquées sans redémarrer le Worker.

#### Améliorations {#enhancements-6}

- Les performances du processeur Split Array ont été améliorées.
- La source HTTP/S Server utilise désormais une correspondance insensible à la casse pour le champ du nom d'en-tête lorsque vous configurez des jetons d'authentification.
- La source Splunk HEC accepte désormais une liste optionnelle de jetons pour l'authentification des événements.

#### Correctifs {#fixes-10}

- Le processeur Add Fields incrémente désormais la métrique `component_errors_total` lorsqu'il échoue à mettre à jour un événement.
- Correction du problème de vérification du nom de host du certificat TLS pour les destinations avec un nom de serveur configuré, afin que le nom du serveur soit utilisé pour le check.

## Version 2.19.0 du Worker {#worker-version-2190}

Pour mettre à niveau vers la version 2.19.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image de la version 2.19.0][49].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.19.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.19.0`.

La version 2.19.0 du Worker vous donne accès aux éléments suivants :

#### Améliorations {#enhancements-7}

- Une option TLS `server_name` a été ajoutée aux destinations BYOC Logs, HTTP Client, Socket et Syslog, ainsi qu'à la source HTTP Client. Elle remplace le SNI et le nom de host du certificat utilisés lors de la négociation TLS, ce qui est utile lorsque l'adresse de connexion ne correspond pas au Common Name ou au Subject Alternative Name du certificat.
- La source Splunk TCP prend désormais en charge le rechargement à chaud des certificats TLS, de sorte que les rotations de certificats sont appliquées sans redémarrer le Worker.
- La destination BYOC Logs prend désormais en charge le rechargement à chaud des fichiers mTLS.
- Le Worker prend désormais en charge une limite configurable pour l'arrêt contrôlé.
- La destination Amazon S3 prend désormais en charge le chiffrement SSE-KMS en utilisant les options `server_side_encryption` et `ssekms_key_id`.

#### Correctifs {#fixes-11}

- Correction d'un problème dans le processeur Reduce : lorsqu'un champ d'horodatage avait un nom nécessitant des guillemets dans un chemin (par exemple, `"created.at"` ou `"event-time"`), son champ compagnon `_end` était supprimé silencieusement de l'événement réduit. Le champ compagnon est désormais placé correctement à côté du champ de base.
- Correction d'un problème de rechargement de configuration. Si un rechargement a modifié le type d'un composant tout en conservant le même nom, par exemple en remplaçant une source nommée `X` par un processeur nommé `X`, tout processeur ou toute destination en aval qui lit encore les données de `X` se reconnecte désormais au nouveau composant.
- La source Syslog (mode TCP) a été corrigée pour gérer un message trop long, préfixé par sa longueur et réparti sur plusieurs lectures.
- La source Logstash a été corrigée pour n'envoyer un accusé de réception que lorsque tous les événements d'un lot sont reçus, au lieu d'envoyer un accusé de réception partiel.
- La source Logstash rejette désormais un lot d'événements qui arrive avant que tous les événements du lot actuel n'aient été reçus, fermant la connexion avec une erreur de décodage fatale au lieu de continuer.
- Correction du codec Syslog qui ignorait silencieusement les mots-clés de gravité sous forme courte (`crit`, `emerg`, `err`, `info`, `warn`) et utilisait `informational` par défaut. Les noms de gravité sous forme courte et sous forme complète sont désormais acceptés.
- Correction d'un problème dans les fonctions du processeur Custom Processor `parse_key_value`, `parse_cef`, `decode_mime_q` et `parse_ruby_hash` lorsque les données d'entrée comportaient des lignes de 65,535 octets ou plus.

## Version 2.18.0 du Worker {#worker-version-2180}

Pour mettre à niveau vers la version 2.18.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.18.0][48].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.18.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.18.0`.

La version 2.18.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-4}

- La commande `run` prend désormais en charge un indicateur `--log-format`, également configurable à l'aide de la variable d'environnement `DD_OP_LOG_FORMAT`, pour sélectionner le format des logs `stdout` et `stderr` du Worker. La valeur par défaut `text` conserve le format de sortie actuel, lisible par un humain, tandis que `json` produit des logs JSON structurés qui peuvent être suivis en temps réel et analysés directement sans règles de parsing supplémentaires.
- Le processeur Tag Cardinality Limit prend désormais en charge une option `tracking_mode`. `exact_fingerprint` suit les valeurs des tags avec précision en utilisant des empreintes numériques 64 bits, ce qui consomme moins de mémoire que la méthode précédente de stockage des valeurs brutes, et `probabilistic` utilise un filtre de Bloom pour une utilisation mémoire encore plus faible en échange d'un faux positif occasionnel. Le mode probabiliste accepte un champ `false_positive_rate`, dont la valeur par défaut est `0.001` (0.1%).
- La source WebSocket est disponible pour ingérer des logs à partir d'un endpoint WebSocket, avec la prise en charge des stratégies d'authentification `none`, `basic`, `bearer` et `custom`, ainsi que de TLS.
- Un nouveau processeur `generate_metrics` achemine les métriques vers toute destination de métriques prise en charge. Datadog recommande de l'utiliser à la place du processeur `generate_datadog_metrics` existant, bien que l'utilisation de ce dernier ne soit pas affectée.

#### Améliorations {#enhancements-8}

- La prise en charge du mTLS a été ajoutée à la destination BYOC Logs.
- L'option `measure_cpu_usage` est désormais activée, de sorte que `pipelines.component_cpu_usage_ns_total` est toujours émis pour les processeurs de logs suivants : Custom Processor, Sensitive Data Scanner, Grok Parser, Parse JSON, Parse XML, OCSF Mapper, Enrichment Table, Reduce, Dedupe, Split Array et Throttle ; ainsi que pour les processeurs de métriques suivants : Aggregate et Tag Cardinality Limit.
- Les erreurs de configuration de pipeline incluent désormais l'ID du composant qui a causé l'échec. Cela facilite l'identification de la source, du processeur ou de la destination qui nécessite une correction. Pour les processeurs composés de plusieurs blocs, tels que Custom Processor, Generate Metrics et OCSF Mapper, l'erreur identifie également le bloc individuel qui a échoué, notamment sa position et, s'il en possède un, son nom.
- Les métriques de pipeline portent désormais le nom du pipeline comme tag grâce à `pipeline_name:<NORMALIZED_PIPELINE_NAME>`.

#### Correctifs {#fixes-12}

- Correction d'un problème survenu lorsqu'un pipeline traitant uniquement des logs (utilisant l'ancienne syntaxe de recherche) exécutait une requête de recherche que le nouveau parseur ne pouvait pas gérer. Le parseur émet désormais un avertissement et n'exécute pas la requête invalide.
- Correction d'un problème affectant les requêtes commençant par un caractère échappé (pour les pipelines utilisant uniquement la nouvelle syntaxe de recherche).
- La télémétrie interne (métriques et logs) émise par les tâches d'arrière-plan hérite désormais correctement des tags du composant propriétaire (`component_id`, `component_kind`, `component_type`). Auparavant, plusieurs composants généraient des tâches d'arrière-plan sans propager leurs tags, de sorte que certains événements internes provenant de ces tâches ne portaient pas les tags de leur composant. Les émissions concernées incluent :
  - Source d'archive Datadog : listing-error, download-error, send-error, event-acknowledged, event-errored et event-rejected, ainsi que les métriques d'état des tâches de coordination des listes, de téléchargement de chaque fichier et de gestion des accusés de réception
  - Destination Microsoft Sentinel : tâche de régénération de jeton OAuth Azure
  - Source Splunk TCP : tâche serveur.

---

## Version 2.17.0 du Worker {#worker-version-2170}

Pour effectuer la mise à niveau vers la version 2.17.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.17.0][46].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.17.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.17.0`.

<div class="alert alert-warning"><strong>Changement incompatible :</strong> Le processeur Generate Metrics émet désormais le nom brut du champ comme clé de tag pour <code>group_by</code> les entrées contenant des caractères en dehors de <code>[a-zA-Z0-9_@]</code>, tels que <code>http.status_code</code> et <code>kube-cronjob</code>. Auparavant, le processeur ajoutait un trait de soulignement final (<code>_</code>) aux clés de tag contenant ces caractères. Par exemple, la clé de tag <code>http.status_code</code> est devenue <code>http.status_code_</code> car la clé contenait un point (<code>.</code>).<br><br>Après la mise à niveau vers Worker 2.17, mettez à jour tous les dashboards, monitors, alertes ou notebooks qui utilisent des clés de tag avec un trait de soulignement final afin qu'ils utilisent ces clés sans le trait de soulignement. Les points de données historiques restent interrogeables sous l'ancienne clé de tag. Les pipelines dont <code>group_by</code> les entrées utilisent uniquement des noms correspondant à <code>[a-zA-Z0-9_@]+</code> ne sont pas affectés.</div>

La version 2.17.0 de Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-5}

- Pour le Custom Processor :
    - Les littéraux de chaîne VRL prennent désormais en charge `\u{HEX}` les séquences d'échappement Unicode. Toute valeur scalaire Unicode valide peut être exprimée, telle que `"hello\u{1F30E}world"`. Les séquences non valides, telles que les accolades vides, les chiffres non hexadécimaux, les points de code de substitution ou les valeurs supérieures à U+10FFFF, sont signalées comme des erreurs à la compilation.
    - La fonction `parse_regex` accepte désormais des motifs regex dynamiques (variables et expressions d'exécution), conformément à `parse_regex_all`. Lorsque le motif est un littéral, les informations sur le type de retour restent précises en fonction des groupes de capture nommés.

#### Améliorations {#enhancements-9}

- Les performances du processeur Generate Metrics ont été améliorées afin de réduire la surcharge CPU lors de l'utilisation d'étiquettes de tag `group_by`.
- Pour le Custom Processor, les performances de `parse_regex_all` ont été améliorées en réutilisant l'expression régulière compilée entre les appels.

#### Correctifs {#fixes-13}

- Les métriques HTTP émises par la synchronisation en arrière-plan du processeur Quota possèdent désormais des tags de composant corrects (`component_kind:transform`, `component_type:quota`, `component_id:quota_global_state`).
- Le processeur Enrichment Table utilisant des tables de référence ignore désormais l'envoi de lots d'événements vides, ce qui évite les erreurs fatales avec les tampons disque.
- Le processeur Generate Metrics utilise désormais un ID de composant statique afin que les métriques associées partagent le même `component_id` entre les Workers et les redémarrages.
- Un problème lié au parsing des requêtes de filtrage contenant des espaces à l'intérieur de parenthèses, telles que `service:( web OR api )`, a été corrigé.
- Live Capture fonctionne désormais correctement pour les sources dotées de plusieurs ports de sortie nommés, comme la source OpenTelemetry.
- Un problème pouvant entraîner le plantage d'un Worker si une source ou un processeur envoie un lot d'événements vide au composant suivant a été corrigé.
- Pour le Custom Processor :
    - Les messages d'erreur et les diagnostics de variables inutilisées ont été corrigés. Le processeur signale désormais chaque erreur non gérée lors d'une seule compilation.
    - Vous pouvez désormais utiliser le cas `SCREAMING_SNAKE` dans des fonctions telles que `pascalcase` et `camelcase`.
    - Les fonctions `encode_proto` et `parse_proto` prennent désormais en charge les proto maps dont les clés sont des entiers ou des booléens, et pas seulement des chaînes de caractères.

---

## Version 2.16.1 du Worker {#worker-version-2161}

Pour mettre à niveau vers la version 2.16.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.16.1][45].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.16.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.16.1`.

La version 2.16.1 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-14}

- Le Worker n'échoue plus lors de la récupération des configurations dans les centres de données autres que US1.

---

## Version 2.16.0 du Worker {#worker-version-2160}

Pour mettre à niveau vers la version 2.16.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.16.0][44].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.16.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.16.0`.

La version 2.16.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-6}

- Destination [Databricks Zerobus][47] : Envoyez les données de log vers les tables Databricks Unity Catalog en utilisant le service d'ingestion Zerobus. La destination Databricks prend en charge l'authentification OAuth 2.0, la récupération automatique du schéma depuis Unity Catalog et l'encodage par lots protobuf.
- La source Splunk HEC prend désormais en charge l'enrichissement des événements de log entrants à l'aide du décodeur VRL.
- La destination Amazon S3 prend désormais en charge l'encodage par lots Apache Parquet avec des définitions de schéma flexibles et une compression configurable (Snappy, ZSTD, GZIP, LZ4 ou aucune).
- Pour le Custom Processor :
    - La fonction `encode_proto` accepte désormais un argument `allow_lossy_string_coercion`.
    - L'encodage Protobuf convertit désormais les types scalaires compatibles dans le type de champ cible : les entiers et les chaînes sont acceptés pour les champs `bool`, et les entiers sont acceptés pour les champs `float` ou `double`.

#### Améliorations {#enhancements-10}

- La prise en charge du mTLS a été ajoutée aux sources suivantes : Fluent, Logstash, OpenTelemetry (logs et métriques), Splunk HEC, Splunk TCP, HTTP/S Server, Socket et Syslog.
- Les événements Live Capture incluent désormais l'UUID du Worker qui a envoyé l'événement.
- Le tampon du processeur Reference Tables émet désormais des métriques de jauge `buffer_size_events` et `buffer_size_bytes` pour remplacer les métriques obsolètes `buffer_events` et `buffer_byte_size`. Les métriques obsolètes sont toujours envoyées pour assurer la compatibilité ascendante.
- La destination Datadog Logs permet désormais de remplacer l'endpoint des logs propre à chaque site au moyen du champ `logs-sites` du fichier bootstrap ou de la variable d'environnement `DD_OP_LOGS_<SITE>`, par exemple `DD_OP_LOGS_US1`. Les variables d'environnement ont priorité sur le fichier bootstrap.
- Les sources enregistrent désormais ces métriques de distribution :
    - `source_send_latency_seconds` : le temps nécessaire à la source pour envoyer un bloc d'événements au composant suivant.
    - `source_send_batch_latency_seconds` : le temps nécessaire à la source pour envoyer un lot, qui peut contenir plusieurs blocs d'événements, au composant suivant.

#### Correctifs {#fixes-15}

- Une condition de concurrence dans le processeur Reference Tables a été corrigée pour éviter la perte d'événements mis en tampon lors de l'arrêt d'un Worker.
- Live Capture a été mis à jour pour améliorer la gestion du trafic en rafale et des métriques provenant du processeur Generate Metrics.
- Le Worker ne journalise plus `Root metadata expired` ou `potential freeze attack` au démarrage après l'actualisation des métadonnées de racine de confiance de Remote Config intégrées.
- La source Splunk HEC émet désormais `authentication_failed` en tant que `error_type` dans les logs d'erreurs et les métriques lorsque l'authentification échoue en raison d'un en-tête d'autorisation manquant ou invalide.
- Correction du calcul de l'endpoint de check de l'état de la destination Datadog Logs pour préserver les préfixes de site, tels que `us3.`, `us5.`, `ap1.`, lors de la dérivation de l'URL de l'API à partir des endpoints d'admission.
- Un problème où une destination avec un tampon disque configuré se bloquait pendant `batch.timeout_sec` avant de se recharger proprement a été corrigé. Ce correctif résout également les cas où le Worker ignorait SIGINT lors d'un blocage de pipeline.
- Correction du Custom Processor afin qu'un mot-clé `else` ou `else if` puisse se trouver sur une nouvelle ligne après l'accolade fermante (`}`) d'un bloc `if`.

---

## Version 2.15.1 du Worker {#worker-version-2151}

Pour effectuer la mise à niveau vers la version 2.15.1 du Worker :

- Docker : exécutez la commande `docker pull` pour l'[image 2.15.1][43].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.15.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.15.1`.

La version 2.15.1 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-7}

- Le Custom Processor prend désormais en charge les fonctions `to_entries` et `from_entries` pour la conversion entre des objets et des tableaux de paires clé-valeur (style jq).

#### Améliorations {#enhancements-11}

- La destination Datadog Metrics utilise désormais la compression zstd pour les endpoints Datadog API v2 et sketches, réduisant ainsi l'utilisation du processeur, de la mémoire et de la bande passante.
- La fonction `flatten` du Custom Processor accepte désormais un argument `except` optionnel pour exclure des clés spécifiques de l'aplatissement.

#### Correctifs {#fixes-16}

- Une régression de performance dans le suivi des métriques de tampon a été corrigée.
- La source Datadog Agent a été corrigée pour préserver le tag `device` des ressources Datadog API v2.

---

## Version 2.15.0 du Worker {#worker-version-2150}

Pour effectuer la mise à niveau vers la version 2.15.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.15.0][40].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.15.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.15.0`.

La version 2.15.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-8}

- De nouveaux mappages OCSF ont été ajoutés pour les types de logs suivants :
    - AWS GuardDuty pour tous les types de détections (par exemple, EKS Audit, EC2, Lambda, IAM, DNS) dans un mappage unique nommé `AWS GuardDuty`.
    - Infoblox NIOS : DNS Activity, DHCP Activity, audit (Authentication and API Activity), ainsi que les événements de base port et syslog (Infoblox DNS Query, Infoblox DHCP, Infoblox Audit Authentication, Infoblox Audit API, Infoblox Port).
    - Logs de statut du connecteur d'application Zscaler ZPA vers le schéma OCSF version 1.3.0 (Authentication, classe 3002) avec les profils `datetime` et `host`.
    - Logs d'activité utilisateur Zscaler ZPA vers le schéma OCSF version 1.3.0 (Network Activity, classe 4001) avec les profils `datetime`, `host`, `network_proxy` et `security_control`.
    - Logs AWS WAF Web ACL. Transforme les événements de log WAF en OCSF HTTP Activity (classe 4002) avec les profils `cloud` et `security_control`.
    - Logs de statut utilisateur Zscaler ZPA vers le schéma OCSF version 1.3.0 (Authentication, classe 3002) avec les profils `datetime` et `host`.
- La source OpenTelemetry prend désormais en charge les pipelines de métriques.
- La destination Elasticsearch est désormais disponible pour les pipelines de métriques.
- La fonction `parse_yaml` est désormais disponible pour le Custom Processor. Cette fonction analyse le YAML conformément à la [spécification YAML 1.1][41].
- L'option de fichier de l'Enrichment Table prend désormais en charge une option `field` qui accepte un chemin de champ d'événement ou un secret de métadonnées comme source de clé de recherche. Le texte brut est pris en charge pour des raisons de compatibilité ascendante.
    - Exemple de chemin d'événement explicite :
        - Syntaxe simplifiée d'Observability Pipelines : `field: {event: "message"}`
        - Syntaxe VRL pour le Custom Processor : `field: {vrl: ".message"}`
    - Exemple de référence de secret de métadonnées : `field: {secret: "splunk_hec_token"}`
    - Chaîne brute (pour la compatibilité ascendante) :
        - Syntaxe simplifiée d'Observability Pipelines : `field: "message"`
        - Syntaxe VRL pour le Custom Processor : `field: ".message"`

#### Améliorations {#enhancements-12}

- La source Amazon S3 accepte désormais les données compressées.
- La destination Elasticsearch a été mise à jour avec de nouvelles options : `auto_routing`, `compression`, `id_key`, `pipeline`, `request_retry_partial`, `sync_fields` et `tls`.
- Le mappage des champs sources de type tableau d'objets vers des destinations OCSF de type tableau d'objets est désormais pris en charge.
- La destination Datadog Metrics utilise désormais par défaut l'endpoint v2 des séries Datadog (`/api/v2/series`).
- L'option GeoIP du processeur Enrichment Table inclut désormais un champ réseau contenant le réseau CIDR associé au résultat de la recherche. Le champ réseau est disponible pour tous les types de bases de données (City, ISP/ASN, Connection-Type, Anonymous-IP).
- Le Custom Processor dispose désormais d'une fonction `encode_csv` qui encode un tableau de valeurs en une chaîne au format CSV. Cette fonction est l'inverse de la fonction `parse_csv` et prend en charge un délimiteur optionnel d'un seul octet (par défaut `,`).
- Les noms de champs prennent désormais en charge `.`, comme `foo."bar.baz"`.

#### Correctifs {#fixes-17}

- Amélioration de la précision du suivi de la métrique d'utilisation du tampon.
- Pour le Custom Processor, les types de paramètres incorrects pour `floor`, `md5`, `parse_key_value`, `precision` et `seahash` ont été corrigés.

---

## Version 2.14.1 du Worker {#worker-version-2141}

Pour effectuer la mise à niveau vers la version 2.14.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.14.1][42].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.14.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.14.1`.

La version 2.14.1 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-18}

- Correction de la gestion d'un chemin vide dans un champ de processeur. Par exemple, la façon dont le processeur Parse JSON gère le `Field to parse JSON on` avec la valeur `.`.

---

## Version 2.14.0 du Worker {#worker-version-2140}

Pour effectuer la mise à niveau vers la version 2.14.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.14.0][38].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.14.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.14.0`.

La version 2.14.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-9}

- Des mappages OCSF pour les événements de menace Palo Alto Networks ont été ajoutés.
- La source Database a été mise à jour avec des modifications liées au délai d'attente.
- Les métriques internes `component_latency_seconds` d'histogramme et `component_latency_mean_seconds` de jauge ont été ajoutées. Les métriques sont basées sur le temps qu'un événement passe dans un seul processeur, y compris dans le tampon du processeur.

#### Améliorations {#enhancements-13}

- Le signalement des erreurs d'Enrichment Table utilise désormais les métriques de Reference Tables pour réduire le nombre de logs similaires.
- La destination Splunk HEC prend désormais en charge l'extraction des champs d'index à partir des événements.
- Le mappeur OCSF dispose désormais d'une option pour conserver les champs non appariés.
- Pour le processeur Enrichment Table, la durée de rétention dans le cache local des entrées introuvables dans une Reference Table a été augmentée. La durée de rétention est désormais de 30 minutes, contre 10 minutes auparavant.
- Les checks de validation SQL de Database Source ont été améliorés.
- La bibliothèque Sensitive Data Scanner dispose désormais de règles d'analyse prêtes à l'emploi nouvelles et mises à jour pour les PII, les identifiants et les données financières. Des bugs mineurs ont également été corrigés.
- La commande `observability-pipelines-worker top` dispose de nouveaux raccourcis clavier pour le défilement, le tri et le filtrage.
- La destination Datadog Logs a été mise à jour pour utiliser par défaut la compression `zstd` au lieu d'aucune compression.
- La variable d'environnement définissant l'adresse de la source Datadog Agent est désormais configurable.

#### Correctifs {#fixes-19}

- Correction d'un bug lié à un état d'erreur persistant lorsque l'interrogation de Remote Configuration réussit.
- Correction des métriques d'utilisation de la mémoire tampon pour enregistrer correctement le niveau d'utilisation réel.
- Correction d'une condition de concurrence lors de l'arrêt du Worker entre la fermeture de la mémoire tampon et les opérations d'envoi en cours, ce qui pouvait potentiellement entraîner une perte d'événements.
- Le processeur Generate Metrics gère désormais correctement les métriques d'histogramme agrégé et de résumé agrégé.
- Live Capture prend désormais en charge les événements enfants dans le processeur Split Array.
- La taille du tampon et la fréquence des requêtes de Reference Tables ont été réduites pour éviter les erreurs de mémoire insuffisante (OOM) et de limitation de débit.
- Le processeur Reference Tables rejette désormais les clés de recherche vides ou composées uniquement d'espaces et prend en charge les clés entières.

---

## Version 2.13.2 du Worker {#worker-version-2132}

Pour mettre à niveau vers la version 2.13.2 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.13.2][39].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.13.2`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.13.2`.

La version 2.13.2 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-20}

- Correction des requêtes `exists` et `missing` pour qu'elles correspondent aux objets.

---

## Version 2.13.1 du Worker {#worker-version-2131}

Pour mettre à niveau vers la version 2.13.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.13.1][22].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.13.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.13.1`.

La version 2.13.1 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-21}

- Tous les processeurs ont été mis à jour pour gérer sans incident les erreurs de syntaxe dans les requêtes de filtre.

---

## Version 2.13.0 du Worker {#worker-version-2130}

Pour mettre à niveau vers la version 2.13.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.13.0][23].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.13.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.13.0`.

La version 2.13.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-10}

- [Custom Processor][24] pour les métriques : utilisez VRL pour transformer les événements de métriques.
- [Secrets Management][31] : Observability Pipelines peut récupérer des secrets à l'aide de Datadog Secrets Management.
- [Live Capture][25] est disponible pour les pipelines de métriques.
- Le processeur [Enrichment Tables][28] peut utiliser des jeux de données dans Reference Tables.

#### Améliorations {#enhancements-14}

- [Les tampons disque][18] ont été mis à jour pour abandonner les logs lorsque le tampon est plein.
- Le processeur Dedupe a été mis à jour avec une taille de cache configurable.
- La source Datadog Agent a été mise à jour avec des délais d'expiration de requête configurables.
- Les tampons source ont été mis à jour pour enregistrer le niveau d'utilisation du tampon avec ces métriques :
    - `source_buffer_max_byte_size`
    - `source_buffer_max_event_size`
    - `source_buffer_utilization`
    - `source_buffer_utilization_level`
- Les tampons de processeur ont été mis à jour pour enregistrer le niveau d'utilisation des tampons avec ces métriques :
    - `transform_buffer_max_byte_size`
    - `transform_buffer_max_event_size`
    - `transform_buffer_utilization`
    - `transform_buffer_utilization_level`
- L'implémentation TLS a été mise à jour pour stocker les identifiants au format PEM conforme à la norme FIPS.

#### Correctifs {#fixes-22}

- Live Capture a été mis à jour et des bugs ont été corrigés.
- Le bug de Search Syntax concernant la gestion des segments avec trait d'union a été corrigé.
- La source syslog en mode UDP émet les métriques `component_received` standard, comme elle le fait en mode TCP :
    - `component_received_events_total`
    - `component_received_event_bytes_total`
    - `component_received_bytes_total`

---

## Version 2.12.0 du Worker {#worker-version-2120}

Pour mettre à niveau vers la version 2.12.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.12.0][27].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.12.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.12.0`.

La version 2.12.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-11}

- [Destination HTTP][29] pour les pipelines de métriques : achemine les métriques vers un endpoint client HTTP.
- [MySQL Source][30] : envoie les logs d'une base de données MySQL vers Observability Pipelines.

#### Améliorations {#enhancements-15}

- La source et la destination HTTP Client ont été mises à jour pour vous permettre de définir une stratégie d'autorisation personnalisée.
- Le processeur de filtrage des métriques a été mis à jour pour filtrer les métriques sur `kind` et `value`.
- Les groupes de processeurs qui acheminent et traitent uniquement les événements ciblés ont été mis à jour pour réduire la surcharge de traitement.
- La source Datadog Agent a été mise à jour pour prendre en charge les délais d'attente, en incrémentant les métriques `component_timed_out_events_total` et `component_timed_out_requests_total`.

#### Correctifs {#fixes-23}

- La destination Amazon S3 a été mise à jour pour garantir que le champ `message` est toujours une chaîne de caractères, en l'encodant en JSON si nécessaire.
- Un bug du Worker a été corrigé pour garantir que les logs du Worker sont transmis correctement.
- Le `hostname` est renommé en `host` lors de l'envoi de logs vers Datadog Archives.
- Pour les sources de métriques, les Workers ont été mis à jour pour utiliser leur propre copie de la clé Datadog pour l'authentification, en ignorant toute clé envoyée par Datadog Agent afin d'éviter l'utilisation de clés obsolètes.
- Le Worker utilise les paramètres de proxy configurés avec des variables d'environnement (par exemple, la variable d'environnement `DD_PROXY_HTTPS`) ou dans le fichier bootstrap lorsqu'il publie des événements vers Live Capture.

---

## Version du Worker 2.11.0 {#worker-version-2110}

Pour mettre à niveau vers la version 2.11.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour l'[image 2.11.0][1].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.11.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.11.0`.

<div class="alert alert-info">Pour les pipelines utilisant Worker 2.10 ou une version antérieure :<br>- Après la mise à niveau vers Worker 2.11, vos requêtes de filtre de processeur continuent d'utiliser l'ancienne syntaxe de recherche.<br>- Vous devez mettre à jour manuellement vos requêtes de filtre pour utiliser la nouvelle Search Syntax.<br>- Ensuite, activez le commutateur <b>New Search Syntax</b> dans l'interface utilisateur, ou définissez <code>use_legacy_search_syntax</code> par <code>false</code> en utilisant l'API ou Terraform.<br><br>Consultez <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">Mettre à niveau vos requêtes de filtre vers la nouvelle Search Syntax</a> pour plus d'informations.</a></div>

La version 2.11.0 vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-12}

- Plus de 100 règles prêtes à l'emploi pour le processeur Sensitive Data Scanner ont été ajoutées. Ces règles masquent les informations permettant d'identifier une personne (PII) et les informations relatives aux clés d'accès.
- La [Search Syntax][3] mise à jour qui vous permet de :
    - Déréférencer des tableaux
    - Effectuer une recherche insensible à la casse dans les messages de log
    - Cibler de manière déterministe les attributs des logs sans utiliser le symbole `@`

---

## Version du Worker 2.10.0 {#worker-version-2100}

Pour mettre à niveau vers la version 2.10.0 du Worker :

- Docker : exécutez la commande `docker pull` pour l'[image 2.10.0][4].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : exécutez la commande `apt-get install observability-pipelines-worker=2.10.0`.
- RPM : exécutez la commande `sudo yum install observability-pipelines-worker-2.10.0`.

La version 2.10.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-13}

- [Destination Kafka][5] : envoyez des logs depuis Observability Pipelines vers vos topics Kafka.
- [Fonctions Custom Processor][6] nouvelles et mises à jour :
    - La fonction `pop` supprime le dernier élément d'un tableau.
    - Les fonctions cryptographiques `encrypt_ip` et `decrypt_ip` pour le chiffrement des adresses IP.
        - Ces fonctions utilisent la spécification IPCrypt et prennent en charge les adresses IPv4 et IPv6 avec deux modes de chiffrement :
            - aes128 (IPCrypt déterministe, clé de 16 octets)
            - pfx (IPCryptPfx, clé de 32 octets).
            - Les deux algorithmes préservent le format (la sortie est une adresse IP valide) et sont déterministes.
    - La fonction `xxhash` implémente les algorithmes de hachage `xxh32`, `xxh64`, `xxh3_64` et `xxh3_128`.
    - La fonction `parse_aws_alb_log` a été mise à jour avec un paramètre optionnel `strict_mode`.
        - Lorsque `strict_mode` est défini sur `false`, l'analyseur ignore les champs nouvellement ajoutés ou les champs supplémentaires à la fin des logs AWS ALB, au lieu d'échouer.
        - La valeur par défaut est `true` pour préserver le comportement actuel.
    - [Pipelines de métriques][32] :
        - [Source Datadog Agent][33] : Envoyez des métriques depuis Datadog Agent vers Observability Pipelines pour traitement.
        - [Filter processor][35] : Filtrez les métriques que vous souhaitez traiter.
        - [Tag processor][36] : Incluez ou excluez des tags spécifiques dans vos métriques.
        - [Destination Datadog Metrics][34] : Envoyez vos métriques traitées à Datadog.

#### Améliorations {#enhancements-16}

- Les performances du Custom Processor ont été améliorées.
- Les Workers ont été mis à jour pour utiliser leur propre copie de la clé Datadog pour l'authentification, en ignorant toute clé envoyée par Datadog Agent afin d'éviter l'utilisation de clés obsolètes.
- Le rapport d'erreurs a été amélioré lors de la validation du schéma JSON dans les fonctions personnalisées qui utilisent la fonction `validate_json_schema`.

#### Correctifs {#fixes-24}

- La logique de filtrage au niveau du groupe a été corrigée pour exclure les logs appropriés.

---

## Version du Worker 2.9.1 {#worker-version-291}

Pour mettre à niveau vers la version 2.9.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour extraire l'[image 2.9.1][7].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.9.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.9.1`.

La version 2.9.1 du Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-25}

- La destination Microsoft Sentinel a été limitée à des tailles de lot de 1 MB lors de la lecture des logs à l'aide de l'API Azure Logs Ingestion. La taille limite a été déterminée sur la base de la [documentation Azure][8].

---

## Version du Worker 2.9.0 {#worker-version-290}

Pour mettre à niveau vers la version 2.9.0 du Worker :

- Docker : Exécutez la commande `docker pull` pour extraire l'[image 2.9.0][9].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.9.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.9.0`.

La version 2.9.0 du Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-14}

- [Source OpenTelemetry Collector][10] : Ingérez les logs de votre OpenTelemetry Collector dans Observability Pipelines.
- [Destination Datadog BYOC Logs][11] : Acheminez les logs vers la destination Datadog BYOC Logs.
- [Destination Google Pub/Sub][12] : Envoyez les logs depuis Observability Pipelines vers le système de messagerie Google Pub/Sub.
- La fonction personnalisée `haversine` pour calculer la distance haversine et le relèvement.

#### Améliorations {#enhancements-17}

- Les logs internes de l'Observability Pipelines Worker ont été mis à jour pour masquer partiellement la clé d'API Datadog (les 28 premiers caractères uniquement), afin d'aider à enquêter sur les problèmes liés à la clé d'API.
- Le délai de transmission de Remote Configuration a été réduit.
- Les fonctions personnalisées `parse_cef` et `parse_syslog` bénéficient d'un parsing amélioré.

---

## Version du Worker 2.8.1 {#worker-version-281}

Pour mettre à niveau vers la version 2.8.1 du Worker :

- Docker : Exécutez la commande `docker pull` pour extraire [l'image 2.8.1][13].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.8.1`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.8.1`.

La version 2.8.1 de Worker vous donne accès aux éléments suivants :

#### Correctifs {#fixes-26}

- La stratégie d'autorisation de la source HTTP Client a été corrigée.

---

## Worker version 2.8.0 {#worker-version-280}

Pour mettre à niveau vers la version 2.8.0 de Worker :

- Docker : Exécutez la commande `docker pull` pour télécharger l'[image 2.8.0][14].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.8.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.8.0`.

La version 2.8.0 de Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-15}

- Toutes les sources et destinations ont été mises à jour pour prendre en charge les variables d'environnement personnalisées.

#### Améliorations {#enhancements-18}

- La [stratégie d'indexation][21] de la destination Elasticsearch a été mise à jour pour inclure les data streams.
- La destination HTTP Client prend en charge la syntaxe de modèle.

#### Correctifs {#fixes-27}

- L'activation de TLS de la source HTTP Server a été corrigée.
- Les métriques de santé de Worker ont été corrigées.
- L'authentification de base d'OpenSearch a été corrigée.

---

## Worker version 2.7.0 {#worker-version-270}

Pour passer à la version 2.7.0 de Worker :

- Docker : Exécutez la commande `docker pull` pour télécharger l'[image 2.7.0][15].
- Kubernetes : Consultez le [chart Helm][2] et la page [Mettre à niveau le Worker][37].
- APT : Exécutez la commande `apt-get install observability-pipelines-worker=2.7.0`.
- RPM : Exécutez la commande `sudo yum install observability-pipelines-worker-2.7.0`.

La version 2.7.0 de Worker vous donne accès aux éléments suivants :

#### Nouvelles fonctionnalités {#new-features-16}

- [La destination HTTP Client][16] : Envoyez des logs à un client HTTP, tel qu'une plateforme de journalisation ou un SIEM.
- [Processor Groups][17] : Organisez vos processeurs en groupes logiques pour vous aider à les gérer.
- Des options de mise en tampon [sur disque et en mémoire][18] sont disponibles pour les destinations.

#### Améliorations {#enhancements-19}

- La fonction personnalisée `decode_lz4` a été mise à jour pour prendre en charge la décompression des données de trame `lz4`.
- Les champs de préfixe des destinations d'archivage Azure Blob Storage et Google Cloud Storage prennent en charge la syntaxe de modèle.
- La destination Splunk HEC dispose d'une variable d'environnement personnalisée.
- Le processeur d'échantillonnage dispose d'un [paramètre `group_by`][20] facultatif.

#### Correctifs {#fixes-28}

- La compression par défaut de la destination Datadog Logs a été définie sur `zstd`, ce qui correspond à la compression par défaut de Datadog Agent.
- Les destinations Amazon S3, Google Cloud Storage et Azure Blob Storage ont été corrigées pour déterminer correctement les horodatages des logs.
- Les performances du mappeur OCSF personnalisé ont été améliorées.
- La logique des flags du processeur de filtrage a été activée pour transmettre les événements au processeur suivant.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#observability-pipelines-worker
[3]: /fr/observability_pipelines/search_syntax/logs/
[4]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.10
[5]: /fr/observability_pipelines/destinations/kafka/
[6]: /fr/observability_pipelines/processors/custom_processor/#custom-functions
[7]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.1
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[9]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.0
[10]: /fr/observability_pipelines/sources/opentelemetry/
[11]: /fr/observability_pipelines/destinations/datadog_byoc_logs/
[12]: /fr/observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /fr/observability_pipelines/destinations/http_client/
[17]: /fr/observability_pipelines/processors/#processor-groups
[18]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[20]: /fr/observability_pipelines/processors/sample/#group-by-example
[21]: /fr/observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /fr/observability_pipelines/processors/custom_processor
[25]: /fr/observability_pipelines/configuration/live_capture/
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /fr/observability_pipelines/processors/enrichment_table/
[29]: /fr/observability_pipelines/destinations/http_client/
[30]: /fr/observability_pipelines/sources/mysql/
[31]: /fr/observability_pipelines/configuration/secrets_management
[32]: /fr/observability_pipelines/configuration/set_up_pipelines/?tab=metrics#set-up-a-pipeline-in-the-ui
[33]: /fr/observability_pipelines/sources/datadog_agent/?tab=metrics
[34]: /fr/observability_pipelines/destinations/datadog_metrics/?tab=secretsmanagement
[35]: /fr/observability_pipelines/processors/filter/?tab=metrics
[36]: /fr/observability_pipelines/processors/tag_allow_block_list/
[37]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management#upgrade-the-worker-4
[38]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.0
[39]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.2
[40]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.0
[41]: https://yaml.org/spec/1.1/
[42]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.1
[43]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.1
[44]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.0
[45]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.1
[46]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.17.0
[47]: /fr/observability_pipelines/destinations/databricks/
[48]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.18.0
[49]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.19.0
[50]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.0
[51]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.2
[52]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.3
[53]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.4
[54]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.21.0
[55]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.22.0
[56]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.0
[57]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.1
[58]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.23.2
[59]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.24.0
[60]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.24.1
[61]: https://trust.datadoghq.com/?tcuUid=301abdf4-0ad2-4db0-9843-c447a0714bfe
[62]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.25.0
[63]: /fr/observability_pipelines/sources/prometheus/
[64]: /fr/observability_pipelines/destinations/prometheus/
[65]: /fr/observability_pipelines/destinations/opentelemetry/metrics/