---
aliases:
- /fr/cloudprem/introduction/network/
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentation
  text: Configuration de l'entrée de BYOC Logs
title: Network
---
Ce document fournit une vue d'ensemble de la manière dont BYOC (Bring Your Own Cloud) Logs et Datadog communiquent entre eux.

## Connexion inversée (par défaut) {#reverse-connection-default}

Par défaut, les pods **searcher** de BYOC Logs initient une connexion WebSocket sortante vers Datadog en utilisant votre clé d'API. Chaque pod searcher de BYOC Logs maintient sa propre connexion vers `wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect`.

Datadog recommande cette configuration car :
- **Aucun port entrant ne doit être ouvert** dans votre réseau.
- **Aucun enregistrement DNS ou entrée publique n'est requis.**
- La connexion est initiée depuis votre infrastructure, ce qui simplifie les politiques de pare-feu et de sécurité.

### Ce qui transite par la connexion inversée {#what-flows-through-the-reverse-connection}

| Données | Direction | Description |
|------|-----------|-------------|
| Requêtes de recherche | Datadog → BYOC Logs | Requêtes provenant du Log Explorer, des dashboards, des monitors |
| Résultats de requête | BYOC Logs → Datadog | Entrées de log correspondantes renvoyées pour affichage |
| Gestion des index | Datadog → BYOC Logs | Création, mise à jour, suppression d'index |

### Exigences réseau {#network-requirements}

Les pods searcher de BYOC Logs nécessitent **un accès HTTPS sortant (port 443)** à votre site Datadog (par exemple, `app.datadoghq.com`). Aucune connectivité entrante n'est requise.

Si votre environnement utilise un proxy HTTP, BYOC Logs prend en charge la configuration standard du proxy avec les variables d'environnement `HTTPS_PROXY`, `ALL_PROXY` et `NO_PROXY`.

### Quels pods se connectent à Datadog {#which-pods-connect-to-datadog}

Seuls les pods **searcher** de BYOC Logs établissent la connexion inversée. Les indexeurs, le plan de contrôle, le metastore et le janitor n'initient aucune connexion vers Datadog.

<div class="alert alert-warning">Maintenez au moins un pod searcher de BYOC Logs en cours d'exécution lors de l'utilisation de la connexion inversée. Si tous les pods searcher de BYOC Logs sont indisponibles ou mis à l'échelle vers <code>0</code>, Datadog ne peut pas acheminer les requêtes ou les demandes de gestion d'index via la connexion inversée tant qu'un pod searcher de BYOC Logs ne démarre pas et ne se reconnecte pas.</div>

## Entrée publique (facultatif) {#public-ingress-optional}

Il est également possible de configurer BYOC Logs pour déployer une entrée public afin que Datadog puisse établir la connexion dans l'autre sens.

L'entrée publique permet au plan de contrôle et au service de requête de Datadog de gérer et d'interroger les clusters BYOC Logs sur Internet public. Il fournit un accès sécurisé à l'API gRPC de BYOC Logs en utilisant l'authentification mTLS. Vous trouverez plus d'informations sur l'entrée de BYOC Logs sur sa [page de configuration](/byoc-logs/configure/ingress/).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}