---
aliases:
- /fr/agent/guide/podman-support-with-docker-integration
kind: documentation
title: Utiliser l'intégration Docker avec le runtime de conteneur Podman
---

Podman est un moteur de conteneur sans daemon conçu pour développer, gérer et exécuter des conteneurs OCI sur votre système Linux. Pour en savoir plus, consultez le site [https://podman.io/][1].

Podman vous permet de déployer des conteneurs avec ou sans racine. Les conteneurs sans racine peuvent être exécutés par des utilisateurs ne possédant pas d'autorisations admin, tandis que les conteneurs avec racine sont exécutés en mode root. Lorsqu'un conteneur sans racine est compromis, les entités malveillantes ne peuvent pas obtenir d'autorisation root sur le host. C'est là le principal avantage de ce type de conteneurs. L'Agent Datadog fonctionne à la fois avec les conteneurs avec et sans racine.

## Prérequis

* Version de Podman >= 3.2.0
* Version de l'Agent Datadog >= 7.30.0

## Déploiement de l'Agent en tant que conteneur Podman sans racine

La commande à exécuter pour déployer l'Agent en tant que conteneur Podman sans racine est similaire à celle de [Docker][2] :

La principale différence réside dans le fait que l'Agent n'a pas accès au socket du runtime : il se sert de la base de données Podman pour extraire les informations nécessaires sur les conteneurs. Ainsi, au lieu de monter le socket Docker et de définir `DOCKER_HOST`, vous devez monter la base de données Podman (`<CHEMIN_BASE_DONNÉES_PODMAN>` dans la commande ci-dessous). Sur certains systèmes, la base de données Podman se trouve à l'emplacement `$HOME/.local/share/containers/storage/libpod/bolt_state.db`. Ce chemin n'est cependant pas valide sur tous les systèmes. Définissez `<CHEMIN_BASE_DONNÉES_PODMAN>` en fonction de votre système dans la commande ci-dessous.

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <`CHEMIN_BASE_DONNÉES_PODMAN`>:/var/lib/containers/storage/libpod/bolt_state.db:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<CLÉ_API> \
    -e DD_HOSTNAME=<HOSTNAME_DD> \
    gcr.io/datadoghq/agent:latest
```

L'Agent devrait détecter tous les conteneurs gérés par l'administrateur non admin qui a exécuté la commande Podman et générer des métriques `container.*` pour chacun d'entre eux.

## Déploiement de l'Agent en tant que conteneur Podman avec racine

Il existe deux manières d'exécuter des conteneurs avec racine. Vous pouvez choisir de vous servir de la base de données Podman, comme dans l'exemple ci-dessus, ou d'utiliser le socket Podman.

### Utiliser la base de données Podman

La commande d'exécution de la base de données est identique à celle de l'exemple précédent. Veuillez toutefois noter que le chemin de la base de données, y compris la racine, varie selon l'utilisateur. La racine correspond généralement à `/var/lib/containers/storage/libpod/bolt_state.db`, mais ce n'est pas toujours le cas selon le système. Prenez donc soin de définir `<CHEMIN_BASE_DONNÉES_PODMAN>` comme il se doit.

### Utiliser le socket Podman

Le socket Podman est compatible avec le socket Docker. Pour cette raison, l'Agent Datadog effectue toutes les étapes d'exécution comme s'il s'agissait d'un environnement Docker. Ainsi, des métriques `docker.*` sont générées. Exemple :

Pour déployer l'Agent reposant sur le socket Podman exécuté en tant que root, utilisez ce qui suit :
```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<CLÉ_API> \
    -e DD_HOSTNAME=<HOSTNAME_DD> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    gcr.io/datadoghq/agent:latest
```

Peu importe l'approche que vous choisissez, l'Agent devrait détecter tous les conteneurs gérés avec root et générer des métriques `container.*` pour chacun d'entre eux.

[1]: https://podman.io/
[2]: /fr/agent/docker