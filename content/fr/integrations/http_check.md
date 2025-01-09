---
aliases:
  - /fr/integrations/httpcheck
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/http_check/README.md'
display_name: HTTP
draft: false
git_integration_title: http_check
guid: eb133a1f-697c-4143-bad3-10e72541fa9c
integration_id: network
integration_title: HTTP Check
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.http.response_time
name: http_check
public_title: Intégration Datadog/Check HTTP
short_description: 'Surveillez tous vos services HTTP afin d''identifier les erreurs, les certificats SSL sur le point d''expirer, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Surveillez le statut de disponibilité d'endpoints HTTP locaux ou à distance. Le check HTTP peut détecter des codes d'erreur (p. ex., 404), identifier les certificats SSL sur le point d'expirer, rechercher des réponses pour un texte spécifique, et plus encore. Le check peut également transmettre des délais de réponse HTTP sous la forme d'une métrique.

## Configuration

### Installation

Le check HTTP est inclus avec le package de [l'Agent Datadog][1] : vous n'avez donc rien à installer sur les serveurs à partir desquels vous souhaitez sonder vos sites HTTP. Bien qu'il soit généralement préférable d'exécuter les checks axés sur des métriques sur le même host que celui du service surveillé, ce check axé sur des statuts peut être lancé sur des hosts qui n'exécutent pas les sites surveillés.

### Configuration

Modifiez le fichier `http_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple http_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - name: Exemple de site
    url: https://example.com/

  - name: Exemple de site (staging)
    url: http://staging.example.com/
```

Le check HTTP dispose de davantage d'options de configuration que bon nombre de checks. Seules quelques-unes d'entre elles sont indiquées ci-dessus. La plupart des options fonctionnent selon un système d'activation : par exemple, l'Agent n'exécutera pas la validation SSL sauf si vous configurez les options requises. L'Agent _vérifiera_ notamment les certificats SSL sur le point d'expirer par défaut.

Ce check se lance à chaque exécution du collecteur de l'Agent, soit par défaut toutes les 15 secondes. Pour définir une fréquence d'exécution personnalisée pour ce check, consultez la section [Intervalle de collecte][4] de la documentation portant sur les checks custom.

Consultez le [fichier d'exemple http_check.d/conf.yaml][3] pour obtenir la liste complète des options disponibles ainsi que leur description. Voici la liste des différentes options :

| Paramètre                          | Description                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                           | Le nom de votre instance de check HTTP. Ce paramètre correspond à un tag pour les checks de service.                                                                                                                                                              |
| `url`                            | L'URL à tester.                                                                                                                                                                                                                                 |
| `timeout`                        | La durée en secondes autorisée pour recevoir une réponse.                                                                                                                                                                                                     |
| `method`                         | La méthode HTTP à utiliser pour le check.                                                                                                                                                                                                            |
| `data`                           | Utilisez ce paramètre pour spécifier le corps d'une requête avec une méthode POST, PUT, DELETE ou PATCH. Les requêtes SOAP sont prises en charge si vous utilisez la méthode POST et que vous spécifiez une chaîne XML en tant que paramètre data.                                             |
| `headers`                        | Ce paramètre vous permet d'envoyer des en-têtes supplémentaires avec la requête. Consultez [le fichier d'exemple YAML][3] pour obtenir des informations et des avertissements supplémentaires.                                                                                                    |
| `content_match`                  | Une chaîne de caractères ou une expression régulière Python. Le check HTTP recherche cette valeur dans la réponse et renvoie DOWN si la chaîne de caractères ou l'expression est introuvable.                                                                                      |
| `reverse_content_match`          | Si ce paramètre a pour valeur `true`, inverse le comportement de l'option `content_match`. Ainsi, le check HTTP renverra DOWN si la chaîne ou l'expression dans `content_match` a été trouvée. Valeur par défaut : `false`.                                                              |
| `username` et `password`          | Si votre service demande une authentification basique, vous pouvez fournir avec ces paramètres le nom d'utilisateur et le mot de passe.                                                                                                                                                       |
| `http_response_status_code`      | Une chaîne de caractères ou une expression régulière Python d'un code de statut HTTP. Ce check renvoie DOWN pour tout code de statut ne correspondant pas. Par défaut, ce check couvre les codes de statut HTTP 1xx, 2xx et 3xx. Par exemple, `401` ou `4\d\d`.                              |
| `include_content`                | Lorsque ce paramètre est défini sur `true`, le check inclut les 500 premiers caractères du corps de la réponse HTTP dans les notifications. Valeur par défaut : `false`.                                                                                                        |
| `collect_response_time`          | Par défaut, le check recueille le délai de réponse (en secondes) par l'intermédiaire de la métrique `network.http.response_time`. Pour désactiver cette option, définissez cette valeur sur `false`.                                                                                                 |
| `tls_verify`                     | Oblige le check à valider le certificat TLS des services lors de la connexion à `url`.                                                                                                                                                          |
| `tls_ignore_warning`             | Lorsque `tls_verify` est défini sur `true`, les avertissements de sécurité issus de la connexion SSL sont désactivés.                                                                                                                                                     |
| `tls_ca_cert`                    | Ce paramètre vous permet de remplacer le chemin de certificat par défaut indiqué dans `init_config`                                                                                                                                                   |
| `check_certificate_expiration`   | Lorsque `check_certificate_expiration` est activé, le check de service vérifie la date d'expiration du certificat SSL. Remarque : cela entraîne la validation du certificat SSL, peu importe la valeur du paramètre `tls_verify`. |
| `days_warning` et `days_critical` | Lorsque `check_certificate_expiration` est activé, ces paramètres génèrent une alerte « warning » ou « critical » quand la durée avant l'expiration du certificat SSL correspond à la plage spécifiée.                                                                |
| `ssl_server_name`                | Lorsque `check_certificate_expiration` est activé, ce paramètre spécifie le hostname du service auquel se connecter. Si check_hostname est activé, il remplace également le host à faire correspondre.                                                      |
| `check_hostname`                 | Lorsque ce paramètre est défini sur `true`, le check envoie un avertissement si le hostname de l'`url` vérifiée est différent du hostname du certificat SSL.                                                                                                                           |
| `skip_proxy`                     | Si ce paramètre est défini, le check ignore les paramètres de proxy et tente d'accéder directement à l'URL de check. Valeur par défaut : `false`. Si ce paramètre n'est pas défini, les paramètres de proxy de cette intégration correspondront, par défaut, aux paramètres de proxy définis dans le fichier de configuration `datadog.yaml`. |
| `allow_redirects`                | Ce paramètre permet au check de service de suivre les redirections HTTP. Valeur par défaut : `true`.                                                                                                                                                           |
| `tags`                           | La liste des tags arbitraires qui seront associés au check. Pour en savoir plus sur les tags, consultez notre [Guide d'utilisation des tags][5] et notre article de blog, [La puissance des métriques taguées][6] (en anglais).                                                                  |

Une fois la configuration de `http_check.d/conf.yaml` terminée, [redémarrez l'Agent][7] pour commencer à envoyer les temps de réponse et les checks de service HTTP à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `http_check` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "http_check" >}}


### Événements

Le check HTTP n'inclut aucun événement.

### Checks de service

Pour créer des conditions d'alerte sur ces checks de service dans Datadog, sélectionnez « Network » sur la page [Create Monitor][10], et non « Integration ».

**http.can_connect** :<br>
Renvoie `DOWN` lorsqu'une des affirmations suivantes se vérifie :

- La requête vers `uri` expire.
- Le code de réponse correspond à 4xx/5xx, ou ne correspond pas à l'expression fournie pour le paramètre `http_response_status_code`.
- Le corps de la réponse ne contient _pas_ l'expression de `content_match`.
- `reverse_content_match` est défini sur « true » et le corps de la réponse _contient_ l'expression de `content_match`.
- `uri` contient `https` et `tls_verify` est défini sur « true », et la connexion SSL ne peut pas être validée.

Si ce n'est pas le cas, renvoie `UP`.

**http.ssl_cert** :<br>
Le check renvoie :

- `DOWN` si le certificat de `uri` a déjà expiré ;
- `CRITICAL` si le certificat de `uri` expire dans moins de `days_critical` jours ;
- `WARNING` si le certificat de `uri` expire dans moins de `days_warning` jours.

Si ce n'est pas le cas, renvoie `UP`.

Pour désactiver ce check, définissez `check_certificate_expiration` sur false.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/developers/write_agent_check/#collection-interval
[5]: https://docs.datadoghq.com/fr/getting_started/tagging/
[6]: https://www.datadoghq.com/blog/the-power-of-tagged-metrics
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/http_check/metadata.csv
[10]: https://app.datadoghq.com/monitors#/create
[11]: https://docs.datadoghq.com/fr/help/