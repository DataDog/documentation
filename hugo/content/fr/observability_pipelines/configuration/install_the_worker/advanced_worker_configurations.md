---
aliases:
- /fr/observability_pipelines/setup_opw/
- /fr/observability_pipelines/advanced_configurations/
description: Découvrez les options d'amorçage du Worker et les autres options de configuration.
disable_toc: false
further_reading:
- link: /observability_pipelines/sensitive_data_redaction/
  tag: Documentation
  text: Masquez les données à l'aide d'Observability Pipelines
- link: /observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentation
  text: Mettre à jour les pipelines existants
title: Configurations avancées du Worker
---
## Présentation {#overview}

Ce document explique [ l'amorçage ](#bootstrap-options) de l'Observability Pipelines Worker, [ les autres options de configuration du Worker ](#other-worker-configuration-options), et comment [ activer l'endpoint de check de santé, ainsi que les sondes de vivacité et de préparation ](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes).

## Options d'amorçage {#bootstrap-options}

<div class="alert alert-danger">Tous les chemins de fichiers de configuration spécifiés dans le pipeline doivent se trouver sous <code>/DD_OP_DATA_DIR/config</code>.
La modification de fichiers sous cet emplacement pendant que l'OPW est en cours d'exécution peut avoir des effets indésirables.
</div>

Amorcez l'Observability Pipelines Worker au sein de votre infrastructure avant de configurer un pipeline. Ces variables d'environnement sont distinctes des variables d'environnement du pipeline. L'emplacement des répertoires et fichiers associés :

- Répertoire de données par défaut: `/var/lib/observability-pipelines-worker`
- Fichier d'amorçage: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Fichier de variables d'environnement: `/etc/default/observability-pipelines-worker`

**Note**: `DD_OP_DATA_DIR` ne peut être détenu que par un seul Observability Pipelines Worker. Si vous avez plusieurs Workers, vous devez utiliser des répertoires de données uniques.

Pour définir les options d'amorçage, effectuez l'une des opérations suivantes :
- Utilisez des variables d'environnement.
- Créez un `bootstrap.yaml` et démarrez l'instance du Worker avec `--bootstrap-config /path/to/bootstrap.yaml`.

Voici une liste d'options d'amorçage, avec leurs variables d'environnement de pipeline associées, ainsi que l'indication de laquelle – la valeur d'amorçage ou la variable d'environnement – a la priorité la plus élevée lorsqu'elles sont toutes deux définies.

`api`
: **Variable d'environnement de pipeline**: `DD_OP_API_ENABLED`
: **Priorité**: `DD_OP_API_ENABLED`
: Un exemple de configuration :
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: Remarque: Le paramètre `address` est facultatif. Il s'agit de l'adresse réseau sur laquelle l'API doit se lier. Si vous exécutez le Worker dans un conteneur Docker, liez-le à `0.0.0.0`. Sinon, l'API n'est pas exposée en dehors du conteneur.
: **Description**: Activez l'API Observability Pipelines Worker afin de pouvoir visualiser les processus du Worker avec la commande `tap` ou `top`. Consultez [Exécutez les commandes run, tap et top sur le Worker][8] pour en savoir plus. Si vous utilisez les charts Helm fournis lors de la [configuration d'un pipeline][7], alors l'API a déjà été activée. Sinon, assurez-vous que la variable d'environnement `DD_OP_API_ENABLED` est définie sur `true` dans `/etc/observability-pipelines-worker/bootstrap.yaml`. Cela configure l'API pour qu'elle écoute sur `localhost` et le port `8686`, ce qui est attendu par l'interface de ligne de commande pour `tap`.
<br><br>Consultez [Activer la sonde de vivacité et de disponibilité](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes) pour savoir comment exposer l'endpoint `/health`.

`api_key`
: **Variable d'environnement de pipeline**: `DD_API_KEY`
: **Priorité**: `DD_API_KEY`
: **Description**: Créez une [clé d'API Datadog][1] pour cette variable d'environnement. [Remote Configuration][6] doit être activé pour la clé d'API. Consultez [Considérations de sécurité][11] pour des informations sur les mesures de protection mises en œuvre pour la Remote Configuration.

`data_dir`
: **Variable d'environnement de pipeline**: `DD_OP_DATA_DIR`
: **Priorité**: `DD_OP_DATA_DIR`
: **Description**: Le répertoire de données (facultatif, par défaut: `/var/lib/observability-pipelines-worker`). Il s'agit du répertoire du système de fichiers que l'Observability Pipelines Worker utilise pour l'état local.

`pipeline_id`
: **Variable d'environnement de pipeline**: `DD_OP_PIPELINE_ID`
: **Priorité**: `DD_OP_PIPELINE_ID`
: **Description**: Créez un [ID de pipeline Observability Pipelines][2] pour cette variable d'environnement.

`proxy`
: **Variables d'environnement de pipeline**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Définissez des serveurs proxy pour l'Observability Pipelines Worker. La configuration du proxy pour le Worker fonctionne de la même manière que pour le [Datadog Agent][4].
: **Priorité** : Les paramètres sont appliqués à l'ensemble du processus Worker. Les valeurs du proxy HTTP et HTTPS sont résolues dans cet ordre :
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: Un exemple de configuration de proxy :
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **Description** : L'Observability Pipelines Worker peut acheminer les requêtes externes via des proxies de transfert, tels que Squid. Les proxies de transfert transmettent les requêtes client de l'Observability Pipelines Worker vers Internet. Vous pouvez les utiliser comme pare-feu web pour interdire ou autoriser certains domaines, ports ou protocoles. Les proxys de transfert ne terminent généralement pas le SSL et n'ont donc pas accès au contenu de la requête. Ils se contentent de transmettre les paquets entre le client et la destination. Les [HTTP tunnels][5] sont utilisés pour sécuriser la communication via un proxy de transfert.
: **Notes** :
: <li style="list-style-type: '- '">Cette option est disponible pour Observability Pipelines Worker 2.1 et versions ultérieures.</li>
: <li style="list-style-type: '- '">L'Observability Pipelines Worker ne peut pas acheminer les requêtes externes via des proxys inverses, tels que HAProxy et NGINX.</li>
: <li style="list-style-type: '- '">Les <code>DD_PROXY_HTTP(S)</code> et <code>HTTP(S)_PROXY</code> variables d'environnement doivent déjà être exportées dans votre environnement pour que le Worker puisse les résoudre. Ils ne peuvent pas être ajoutés au début du script d'installation du Worker.</li>

`secret`
: **Variable d'environnement de pipeline** : Aucune
: **Priorité** : N/A
: **Description** : Connecte le Worker à votre gestionnaire de secrets. Consultez [Secrets Management][12] pour obtenir des informations sur la configuration.

`site`
: **Variable d'environnement de pipeline** : `DD_SITE`
: **Priorité** : `DD_SITE`
: **Description** : Votre site Datadog (facultatif, par défaut : `datadoghq.com`).
: Consultez [Débuter avec les sites][3] pour plus d'informations.

`tags: []`
: **Variable d'environnement de pipeline** : `DD_OP_TAGS`
: **Priorité** : `DD_OP_TAGS`
: **Description** : Les tags sont signalés avec des métriques internes et peuvent être utilisés pour filtrer les instances d'Observability Pipelines pour les déploiements de Remote Configuration.

`threads`
: **Variable d'environnement de pipeline** : `DD_OP_THREADS`
: **Priorité** : `DD_OP_THREADS`
: **Description** : Le nombre de threads à utiliser pour le traitement (facultatif, par défaut : le nombre de cœurs disponibles).

## Autres options de configuration du Worker {#other-worker-configuration-options}

Utilisez la variable d'environnement `VECTOR_HOSTNAME` pour attribuer un nom de host unique et vous aider à identifier le Worker.

## Activer l'endpoint de check de santé ainsi que les sondes de vivacité et de préparation {#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes}

Configurez la vérification de l'état de santé de votre équilibreur de charge avec l'endpoint `/health` pour vérifier que le Worker est opérationnel.

Pour Kubernetes, les sondes de vivacité et de préparation sont déjà activées dans le [helm chart][9] et le fichier [values.yaml][10].

Pour d'autres installations telles que celles basées sur des VM, vous devez définir `DD_OP_API_ENABLED` sur `true` et définir `DD_OP_API_ADDRESS` sur `0.0.0.0:8686` pour exposer l'endpoint `/health`. Un exemple de configuration :

```
api:
  enabled: true
  address: "0.0.0.0:8686"
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/getting_started/site/
[4]: /fr/agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel
[6]: /fr/remote_configuration
[7]: /fr/observability_pipelines/set_up_pipelines/
[8]: /fr/observability_pipelines/install_the_worker/worker_commands/#run-tap-or-top-the-worker
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L33-L40
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L303-L329
[11]: /fr/remote_configuration/#security-considerations
[12]: /fr/observability_pipelines/configuration/secrets_management/