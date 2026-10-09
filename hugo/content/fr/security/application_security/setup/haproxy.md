---
code_lang: haproxy
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa
  tag: Code source
  text: Code source de l'intégration HAProxy
- link: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
  tag: Image de conteneur
  text: Image Docker du SPOA HAProxy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Activation de la protection des applications et des API pour HAProxy
---
{{< callout url="https://www.datadoghq.com/product-preview/haproxy-integration/">}}
La protection des applications et des API pour HAProxy est en version préliminaire. Pour vous inscrire, cliquez sur <strong>Demander l'accès</strong> et remplissez le formulaire.
{{< /callout >}}

Vous pouvez activer la protection des applications et des API pour vos instances HAProxy. L'intégration Datadog HAProxy tire parti du Stream Processing Offload Engine (SPOE) de HAProxy pour inspecter et protéger le trafic afin de détecter les menaces à la périphérie de votre infrastructure.

## Prérequis {#prerequisites}

- Le [Datadog Agent][1] est installé et configuré pour votre environnement (host, conteneur ou orchestrateur).
- [Configurez l'Agent avec Remote Configuration][2] dans l'interface utilisateur Datadog pour bloquer les attaquants.

## Activation de la détection des menaces {#enabling-threat-detection}

### Démarrer {#get-started}

L'intégration HAProxy pour la protection des applications et des API utilise le [Stream Processing Offload Engine][3] (SPOE) de HAProxy pour appeler un Datadog Stream Processing Offload Agent (SPOA). Le SPOA analyse les requêtes et les réponses.

Pour activer la protection des applications et des API pour HAProxy, procédez comme suit :
1. Déployez le conteneur SPOA Datadog pour HAProxy.
2. Mettez à jour vos fichiers de configuration HAProxy pour les intégrer au SPOA

### Conteneur SPOA {#spoa-container}

Déployez l'image SPOA Datadog pour HAProxy disponible dans le [Datadog GitHub Container Registry][4]. Le SPOA écoute les connexions SPOE provenant de HAProxy et envoie des événements de sécurité à votre Datadog Agent.

Consultez [Configuration](#configuration) pour connaître les options de configuration disponibles pour le conteneur SPOA.

### Fichiers de configuration HAProxy {#haproxy-configuration-files}

Tous les fichiers de configuration HAProxy requis sont disponibles dans le [dossier du dépôt][8]. Pour plus d'informations sur les mises à jour et les modifications de la configuration, consultez le [log des modifications de configuration][9].

Les fichiers suivants sont nécessaires pour votre installation :

- `spoe.cfg` : Fichier de configuration du moteur SPOE principal.
- `global-config.cfg` : Lignes de configuration à inclure dans votre section `global`.
- `frontend-config.cfg` : Lignes de configuration à ajouter en haut de chaque `frontend` que vous souhaitez protéger.
- `backend.cfg` : Définit le backend SPOA utilisé par le moteur SPOE.
- `datadog_aap_blocking_response.lua` : Script Lua pour bloquer les réponses.

Des conseils pour la configuration de chaque fichier sont fournis ci-dessous.

#### spoe.cfg {#spoecfg}

Le fichier `spoe.cfg` est responsable de la déclaration de l'agent SPOE et de sa configuration. Ce fichier doit être enregistré sur le disque, par exemple dans `/usr/local/etc/haproxy/spoe.cfg`. L'emplacement de ce fichier est référencé via la variable d'environnement `DD_SPOA_SPOA_CONF_FILE`, qui est configurée dans la section `global`.

Il est important qu'aucune modification personnalisée ne soit apportée à ce fichier.

#### global-config.cfg {#global-configcfg}

Le fichier `global-config.cfg` charge le script Lua requis et configure les variables nécessaires à l'intégration. Son contenu doit être incorporé dans la section `global` de votre fichier de configuration `haproxy.cfg`.

Vous pouvez ajuster les valeurs selon les besoins de votre environnement. Consultez les commentaires dans le fichier pour obtenir des conseils supplémentaires sur chaque paramètre.

#### frontend-config.cfg {#frontend-configcfg}

Le fichier `frontend-config.cfg` attache le filtre SPOE à votre frontend. Cette section doit être placée tout en haut de chaque section `frontend` que vous souhaitez protéger, avant les autres filtres et le routeur.

Cette section garantit que :
- Les événements de requête et de réponse sont envoyés au SPOA
- Les en-têtes de traçage Datadog sont injectés le cas échéant
- L'assistant Lua est invoqué de manière conditionnelle pour le blocage

Il est important qu'aucune modification personnalisée ne soit apportée à cette partie de la configuration.

#### backend.cfg {#backendcfg}

Le fichier `backend.cfg` définit le `spoa-backend` utilisé par le moteur SPOE et pour les checks de santé. Cette configuration doit être ajoutée vers la fin de votre fichier `haproxy.cfg`.

Assurez-vous de modifier la ligne `server spoa1 <host>:<port>` afin qu'elle référence votre instance de conteneur SPOA déployée.

<div class="alert alert-info">
  <strong>Remarque&nbsp;:</strong> Pour une haute disponibilité et une redondance, vous pouvez configurer plusieurs serveurs d'agent SPOA en ajoutant des lignes supplémentaires. <code>server</code> lignes (par exemple, <code>server spoa1 ...</code>, <code>server spoa2 ...</code>, etc.). HAProxy équilibrera automatiquement la charge et basculera entre ces agents SPOA, assurant une protection continue même si un agent devient indisponible.
</div>

#### datadog_aap_blocking_response.lua {#datadog-aap-blocking-responselua}

Le script `datadog_aap_blocking_response.lua` est chargé d'envoyer une réponse de blocage personnalisée lorsque le SPOA demande à HAProxy de bloquer une requête. Ce script pourrait être stocké dans un emplacement tel que `/etc/haproxy/lua/datadog_aap_blocking_response.lua`, et la directive `lua-load` dans la section `global` devrait référencer ce chemin.

Il est important qu'aucune modification personnalisée ne soit apportée à ce fichier.

<div class="alert alert-info">
  <strong>Remarque :</strong> Ce script Lua n'est pas invoqué à chaque requête traitée par HAProxy. Il est uniquement invoqué lorsqu'une requête est bloquée par App and API Protection. Cette conception assure des performances optimales en évitant la surcharge liée à l'exécution de code Lua pour toutes les requêtes.
</div>

### Validation {#validation}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant le Signals Explorer et ses détails, ainsi que le Vulnerabilities Explorer et ses détails." video="true" >}}

## Configuration {#configuration}

Le conteneur Datadog HAProxy SPOA prend en charge les paramètres de configuration suivants :

| Variable d'environnement                | Valeur par défaut | Description                                                                                                   |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | Host sur lequel le SPOA et le serveur de santé HTTP écoutent.                                                         |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | Port utilisé par le SPOA qui accepte la communication avec HAProxy.                                                |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | Port utilisé pour le serveur HTTP pour les checks de santé.                                                              |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | Taille maximale des corps à traiter en octets. Si `0`, les corps ne sont pas traités. Recommandé : `10000000` (10 Mo). |
| `DD_SERVICE`                        | `spoa`        | Nom du service affiché dans l'interface utilisateur Datadog.                                                                         |

Configurez le SPOA pour envoyer des traces à votre Datadog Agent en utilisant les variables d'environnement suivantes :

| Variable d'environnement  | Valeur par défaut | Description                      |
| --------------------- | ------------- | -------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | Host d'un Datadog Agent en cours d'exécution. |
| `DD_TRACE_AGENT_PORT` | `8126`        | Port d'un Datadog Agent en cours d'exécution. |

### Intégration Datadog Go Tracer et HAProxy {#datadog-go-tracer-and-haproxy-integration}

L'intégration HAProxy est construite sur le [Datadog Go Tracer][5] et hérite de toutes les variables d'environnement du traceur. Consultez [Configuration du SDK Go][6] et [Configuration de la bibliothèque de protection des applications et des API][7].

<div class="alert alert-info">
  <strong>Remarque :</strong> Comme le SPOA Datadog est construit sur le Datadog Go Tracer, il suit généralement le même processus de publication que le traceur, et ses images Docker sont marquées avec la version correspondante du traceur (par exemple, <code>v2.4.0</code>). Dans certains cas, des versions préliminaires peuvent être publiées entre les versions officielles du Datadog Go Tracer, et ces images sont marquées avec un suffixe tel que <code>-docker.1</code>.
</div> <br><br>

## Maintenir votre configuration à jour {#keeping-your-configuration-up-to-date}

Comme l'intégration SPOE de HAProxy implique à la fois un composant d'exécution (l'image de conteneur SPOA) et une configuration HAProxy, les mises à niveau peuvent nécessiter des modifications aux deux endroits.

La configuration HAProxy de référence et un log des modifications associé sont disponibles pour vous aider à surveiller et à suivre les mises à jour :
- [Répertoire de configuration HAProxy de référence][8] (moteur SPOE, global, extraits frontend/backend, Lua)
- [Log des modifications de configuration][9]

### Pratiques de mise à niveau recommandées {#recommended-upgrade-practices}

- Fixez votre image SPOA à une version spécifique et effectuez la mise à niveau intentionnellement après avoir examiné le log des modifications de configuration.
- Centralisez la configuration Datadog afin qu'elle soit facilement mise à jour.
- Suivez la configuration de référence et le log des modifications, et comparez votre configuration à celle-ci lors des mises à niveau.

## Limitations {#limitations}

L'intégration HAProxy présente les limitations suivantes :

- Le mode asynchrone (observabilité) n'est actuellement pas pris en charge.

Pour plus de détails sur les compatibilités de l'intégration HAProxy, reportez-vous à la [page de compatibilité de l'intégration HAProxy][10].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/remote_configuration/
[3]: https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine
[4]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
[5]: https://github.com/DataDog/dd-trace-go
[6]: /fr/tracing/trace_collection/library_config/go/
[7]: /fr/security/application_security/policies/library_configuration/
[8]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/
[9]: https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md
[10]: /fr/security/application_security/setup/compatibility/haproxy