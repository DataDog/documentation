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
  text: Découvrez comment interroger et visualiser les déploiements
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrez les fonctionnalités de CD Visibility
title: CD Visibility dans Datadog
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

CD Visibility offre une vue de l'état de votre CD axée sur les déploiements, en affichant les métriques et résultats importants de vos déploiements.

## Configuration {#setup}

{{< whatsnext desc="Sélectionnez votre fournisseur de déploiements pour configurer CD Visibility dans Datadog :" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI Providers (GitLab, Jenkins, CircleCI et autres){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">Si vous utilisez un fournisseur qui n'est pas pris en charge, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">remplissez ce formulaire pour demander une prise en charge</a>.</div>

## Utilisez les données de déploiement {#use-deployment-data}

Lors de la création d'un [dashboard][1] ou d'un [notebook][2], vous pouvez utiliser les données de déploiement dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez les [Dashboards][3] et la [documentation sur les Notebooks][4].

## Partagez les données de déploiement {#share-deployment-data}

Vous pouvez exporter votre requête de recherche vers une [vue enregistrée][5] en cliquant sur le bouton {{< ui >}}Export{{< /ui >}}.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Résultats des exécutions de déploiement affichés dans CD Visibility Explorer" width="100%" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/dashboards
[4]: /fr/notebooks
[5]: /fr/continuous_delivery/explorer/saved_views