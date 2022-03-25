---
title: Utiliser l'intégration Docker avec le runtime de conteneur Podman
kind: documentation
---
Podman est un moteur de conteneur sans daemon conçu pour développer, gérer et exécuter des conteneurs OCI sur votre système Linux. Pour en savoir plus, consultez le site [https://podman.io/][1].

Podman peut être utilisé à la place de Docker. En effet, cette solution propose un socket et une interface CLI compatibles avec Docker. Grâce à cette particularité, vous pouvez utiliser l'intégration Docker pour l'Agent Datadog avec des conteneurs Podman.

## Prérequis

* Version de Podman >= 3.2.0
* Configuration de Podman exposant son [socket de communication][2]
* Version de l'Agent Datadog >= 7.30.0

## Déploiement de l'Agent en tant que conteneur Podman

La commande à exécuter pour déployer l'Agent en tant que conteneur Podman est similaire à celle de [Docker][3] :

```
$ podman run -d --name dd-agent \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<CLÉ_API> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    --privileged \
    gcr.io/datadoghq/agent:latest
```

Deux différences importantes sont toutefois à noter :
* `-v /run/podman/podman.sock:/run/podman/podman.sock:ro` permet de monter le socket Podman au lieu du socket Docker.
* `-e DOCKER_HOST=unix:///run/podman/podman.sock` permet de configurer les communications entre l'Agent et le socket Podman.



## Limites connues

* L'agrégation des logs de conteneur n'est pas prise en charge.
* L'activation du socket Podman peut être facultative ou requise, selon votre configuration.


[1]: https://podman.io/
[2]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_using-the-container-tools-api_using-the-container-tools-cli
[3]: /fr/agent/docker