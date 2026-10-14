---
aliases:
- /fr/observability_pipelines/install_the_worker/worker_commands/
description: Trouvez les commandes et options run, tap et top pour l'interface de
  ligne de commande de l'Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/install_the_worker/
  tag: Documentation
  text: Installez le Worker
title: Commandes de l'interface de ligne de commande du Worker
---
## Exécutez les commandes run, tap et top sur le Worker{#run-tap-or-top-the-worker}

Exemple d'utilisation : `observability-pipelines-worker <COMMAND>`

Si vous utilisez un environnement conteneurisé, utilisez la commande `docker exec` ou `kubectl exec` pour obtenir un shell dans le conteneur afin d'exécuter la commande. Exemple :

- Pour Kubernetes : `kubectl exec -it <pod_name> -- observability-pipelines-worker <opw_command>`
- Pour Docker : `docker exec -it <container_name> observability-pipelines-worker <opw_command>`

| Commande   | Description                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `run`     | Exécutez l'Observability Pipelines Worker.                                                                                |
| `tap`     | Utilisez la commande tap sur un pipeline pour observer les événements provenant des composants source ou transform. Consultez les [options de tap](#tap-options).                |
| `top`     | Regroupe dans une liste les composants du pipeline et fournit des statistiques telles que les débits de données d'entrée et de sortie pour chaque composant. Saisissez `?` pour voir toutes les combinaisons de touches disponibles.  |

### Options de tap{#tap-options}

Exemple d'utilisation : `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

Vous pouvez utiliser la [`top`commande](#run-tap-or-top-the-worker) pour trouver l'ID du composant dans lequel vous souhaitez `tap`.

| Options                          | Descriptions                                                                                                   |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `-i`, `--interval <INTERVAL>`    | Intervalle d'échantillonnage des événements, en millisecondes (par défaut : `500`).                                                |
| `-u`, `--url <URL>`              | Endpoint du serveur d'API GraphQL.                                                                                   |
| `-l`, `--limit <LIMIT>`          | Nombre maximal d'événements à échantillonner par intervalle (par défaut : `100`). |
| `-f`, `--format <FORMAT>`        | Format d'encodage pour les événements affichés à l'écran.<br>par défaut : `json`<br>valeurs possibles : `json`, `yaml`, `logfmt`  |
| `--outputs-of <OUTPUTS_OF>`      | ID de source ou de processeur dont vous souhaitez observer les sorties (séparés par des virgules ; accepte les motifs glob).            |
| `--inputs-of <INPUTS_OF>`        | ID de processeur ou de destination dont vous souhaitez observer les entrées (séparés par des virgules ; accepte les motifs glob). |
| `-q`, `--quiet`                  | La sortie silencieuse inclut uniquement les événements. |
| `-m`, `--meta`                   | Inclure les métadonnées telles que l'ID du composant associé à l'événement.|
| `-n`, `--no-reconnect`           | Indique s'il faut se reconnecter si la connexion API sous-jacente est interrompue. Par défaut, `tap` tente de se reconnecter si la connexion est interrompue. |
| `-d`, `--duration-ms <DURATION_MS>` | Spécifie une durée (en millisecondes) pour échantillonner les logs (par exemple, en spécifiant `10000`, le programme échantillonne les logs pendant 10 secondes puis se termine). |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}