---
cascade:
  algolia:
    rank: 70
    tags:
    - cd pipeline
    - cd pipelines
further_reading:
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrir les fonctionnalités de CD Visibility
title: CD Visibility dans Datadog
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Section Overview

CD Visibility fournit une vue axée sur les déploiements de l'état de santé de votre CD en affichant les métriques et résultats importants de vos déploiements.

## Configuration

{{< whatsnext desc="Sélectionnez votre fournisseur de déploiements pour configurer CD Visibility dans Datadog :" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}Fournisseurs CI (GitLab, Jenkins, CircleCI et plus){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">Si vous utilisez un fournisseur qui n'est pas pris en charge, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">remplissez ce formulaire pour demander la prise en charge</a>.</div>

## Utiliser les données de déploiement

Lors de la création d'un [dashboard][1] ou d'un [notebook][2], vous pouvez utiliser les données de déploiement dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour en savoir plus, consultez la documentation sur les [dashboards][3] et les [notebooks][4]. 

## Partager les données de déploiement

Vous pouvez exporter votre requête de recherche vers une [vue enregistrée][5] en cliquant sur le bouton **Export**.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Résultats d'exécution de déploiement apparaissant dans l'explorateur CD Visibility" width="100%" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/dashboards
[4]: /fr/notebooks
[5]: /fr/continuous_delivery/explorer/saved_views