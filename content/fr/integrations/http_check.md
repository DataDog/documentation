---
aliases:
  - /fr/integrations/httpcheck
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/http_check/README.md'
display_name: HTTP
git_integration_title: http_check
guid: eb133a1f-697c-4143-bad3-10e72541fa9c
integration_title: Check HTTP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.http.response_time
name: http_check
public_title: Intégration Datadog/Check HTTP
short_description: 'Surveillez tous vos services HTTP afin d''identifier les erreurs et les certificats SSL sur le point d''expirer. certs, and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Surveillez le statut de disponibilité d'endpoints HTTP locaux ou à distance. Le check HTTP peut détecter des codes d'erreur (p. ex., 404), identifier les certificats SSL sur le point d'expirer, rechercher des réponses pour un texte spécifique, et plus encore. Le check peut également transmettre des délais de réponse HTTP sous la forme d'une métrique.

## Implémentation

### Installation

Le check HTTP est fourni dans le paquet de [l'Agent Datadog][1]. Ainsi, vous n'avez pas besoin d'installer quoi que ce soit sur les serveurs à partir desquels vous sondez vos sites HTTP. Bien qu'il soit recommandé d'exécuter bon nombre des checks axés sur des métriques sur le(s) mêmes hôte(s) que le service surveillé, ce check axé sur des statuts peut être lancé sur des hôtes qui n'exécutent pas les sites surveillés.

### Configuration

Modifiez le fichier `http_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple http_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - name: Exemple de site Web
    url: https://example.com/
    # disable_ssl_validation: false      # valeur par défaut : true. Remplacez la valeur par false pour vérifier la validation SSL
    # ca_certs: /path/to/ca/file         # p.ex., /etc/ssl/certs/ca-certificates.crt
    # check_certificate_expiration: true # valeur par défaut : true
    # days_warning: 28                   # valeur par défaut : 14
    # days_critical: 14                  # valeur par défaut : 7
    # timeout: 3                         # en secondes. Valeur par défaut : 10.
  - name: Exemple de site Web (staging)
    url: http://staging.example.com/
```

Le check HTTP dispose de davantage d'options de configuration que bon nombre de checks. Seules quelques-unes d'entre elles sont indiquées ci-dessus. La plupart des options fonctionnent selon un système d'activation : par exemple, l'Agent n'exécutera pas la validation SSL sauf si vous configurez les options requises. L'Agent _vérifiera_ notamment les certificats SSL sur le point d'expirer par défaut.

Ce check se lance à chaque exécution du collecteur de l'Agent, soit par défaut toutes les 15 secondes. Pour définir une fréquence d'exécution personnalisée pour ce check, consultez la section [Intervalle de collecte][4] de la documentation portant sur les checks custom.

Consultez le [fichier d'exemple http_check.d/conf.yaml][3] pour obtenir la liste complète des options disponibles ainsi que leur description. Voici la liste des différentes options :

| Paramètre                          | Description                                                                                                                                                                                                                                                                                                                 |
| ---                              | ---                                                                                                                                                                                                                                                                                                                         |
| `name`                           | Le nom associé à cette instance/URL. Ce paramètre correspond à un tag pour les checks de service. Remarque : ce tag de nom convertit les espaces et tirets en underscores.                                                                                                                                                 |
| `url`                            | L'URL à tester.                                                                                                                                                                                                                                                                                                            |
| `timeout`                        | La durée en secondes autorisée pour recevoir une réponse.                                                                                                                                                                                                                                                                                |
| `method`                         | La méthode HTTP. Par défaut, ce paramètre a pour valeur GET. De nombreuses autres méthodes HTTP sont cependant prises en charge, notamment POST et PUT.                                                                                                                                                                                                        |
| `data`                           | L'option « data » est uniquement disponible pour la méthode POST. Les données doivent être incluses sous la forme de paires clé/valeur et seront envoyées dans le corps de la requête.                                                                                                                                                                       |
| `content_match`                  | Une chaîne de caractères ou une expression régulière Python. Le check HTTP recherche cette valeur dans la réponse et renvoie DOWN si la chaîne de caractères ou l'expression est introuvable.                                                                                                                                                          |
| `reverse_content_match`          | Si ce paramètre a pour valeur true, inverse le comportement de l'option `content_match`. Ainsi, le check HTTP renverra DOWN si la chaîne ou l'expression dans `content_match` a été trouvée. Valeur par défaut : false.                                                                                                                                         |
| `username` et `password`          | Si votre service utilise un système d'authentification de base, vous pouvez fournir avec ces paramètres le nom d'utilisateur et le mot de passe.                                                                                                                                                                                                                                  |
| `http_response_status_code`      | Une chaîne de caractères ou une expression régulière Python d'un code de statut HTTP. Ce check renvoie DOWN pour tout code de statut ne correspondant pas. Par défaut, ce check couvre les codes de statut HTTP 1xx, 2xx et 3xx. Par exemple, `401` ou `4\d\d`.                                                                                                     |
| `include_content`                | Lorsque ce paramètre est défini sur `true`, le check inclut les 200 premiers caractères du corps de la réponse HTTP dans les notifications. Valeur par défaut : `false`.                                                                                                                                                                               |
| `collect_response_time`          | Par défaut, le check recueille le délai de réponse (en secondes) par l'intermédiaire de la métrique `network.http.response_time`. Pour désactiver cette option, définissez cette valeur sur `false`.                                                                                                                                                                        |
| `disable_ssl_validation`         | Ce paramètre, activé par défaut, ignore la validation du certificat SSL. Si vous avez besoin de valider les certificats SSL, définissez-le sur `false`. Cette option est uniquement utilisée lors de la collecte du délai de réponse et de la disponibilité à partir du endpoint spécifié. Remarque : ce paramètre ne s'applique pas à l'option `check_certificate_expiration`. |
| `ignore_ssl_warning`             | Lorsque la validation de certificats SSL est activée (voir le paramètre ci-dessus), ce paramètre vous permet de désactiver les avertissements de sécurité.                                                                                                                                                                                                   |
| `ca_certs`                       | Ce paramètre vous permet de remplacer le chemin de certificat par défaut indiqué dans `init_config`.                                                                                                                                                                                                                          |
| `check_certificate_expiration`   | Lorsque `check_certificate_expiration` est activé, le check de service vérifie la date d'expiration du certificat SSL. Remarque : cela entraîne la validation du certificat SSL, peu importe la valeur du paramètre `disable_ssl_validation`.                                                                    |
| `days_warning` et `days_critical` | Lorsque `check_certificate_expiration` est activé, ces paramètres génèrent une alerte « warning » ou « critical » quand la durée avant l'expiration du certificat SSL correspond à la plage spécifiée.                                                                                                                                      |
| `check_hostname`                 | Lorsque `check_certificate_expiration` est activé, ce paramètre génère une alerte « warning » si le hostname ou le certificat SSL ne correspond pas au host de l'URL donnée.                                                                                                                                                          |
| `ssl_server_name`                | Lorsque `check_certificate_expiration` est activé, ce paramètre spécifie le hostname du service auquel se connecter. Si check_hostname est activé, il remplace également le host à faire correspondre.                                                                                                                                 |
| `headers`                        | Ce paramètre vous permet d'envoyer des en-têtes supplémentaires avec la requête. Consultez [le fichier d'exemple YAML][5] pour obtenir des informations et des avertissements supplémentaires.                                                     |
| `skip_proxy`                     | Si ce paramètre est défini, le check ignore les paramètres de proxy et tente d'accéder directement à l'URL de check. Valeur par défaut : `false`.                                                                                                                                                                                                         |
| `allow_redirects`                | Ce paramètre permet au check de service de suivre les redirections HTTP. Valeur par défaut : `true`.                                                                                                                                                                                                                                      |
| `tags`                           | La liste des tags arbitraires qui seront associés au check. Pour en savoir plus sur les tags, consultez notre [guide sur les tags][6] et notre article de blog, [The power of tagged metrics][7] (en anglais).                                                                                                                                      |


Une fois la configuration de `http_check.d/conf.yaml` terminée, [redémarrez l'Agent][8] pour commencer à envoyer des délais de réponse et des checks de service HTTP à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `http_check` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "http_check" >}}


### Événements

Le check HTTP ne comprend aucun événement.

### Checks de service

Pour créer des conditions d'alerte sur ces checks de service dans Datadog, sélectionnez « Network » sur la page [Create Monitor][11], et non « Integration ».

**`http.can_connect`** :

Renvoie `DOWN` lorsqu'une des affirmations suivantes se vérifie :

* La requête vers `uri` expire.
* Le code de réponse correspond à 4xx/5xx, ou ne correspond pas au modèle fourni pour le paramètre `http_response_status_code`.
* Le corps de la réponse ne contient *pas* le modèle de `content_match`.
* `reverse_content_match` est défini sur « true » et le corps de la réponse *contient* le modèle de `content_match`.
* `uri` contient `https` et `disable_ssl_validation` est défini sur « false », et la connexion SSL ne peut pas être validée.

Si ce n'est pas le cas, renvoie `UP`.

**`http.ssl_cert`** :

Le check renvoie :

* `DOWN` si le certificat de `uri` a déjà expiré ;
* `CRITICAL` si le certificat de `uri` expire dans moins de `days_critical` jours ;
* `WARNING` si le certificat de `uri` expire dans moins de `days_warning` jours.

Si ce n'est pas le cas, renvoie `UP`.

Pour désactiver ce check, définissez `check_certificate_expiration` sur false.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/developers/write_agent_check/?tab=agentv6#collection-interval
[5]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/getting_started/tagging
[7]: https://www.datadoghq.com/blog/the-power-of-tagged-metrics
[8]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/http_check/metadata.csv
[11]: https://app.datadoghq.com/monitors#/create
[12]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}