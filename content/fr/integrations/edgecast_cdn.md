---
categories:
- caching
dependencies: []
description: Surveillez le trafic Web Edgecast à l'aide de métriques Datadog.
doc_link: https://docs.datadoghq.com/integrations/edgecast_cdn/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-edgecast-cdn-with-datadog/
  tag: Blog
  text: Surveiller votre CDN Edgecast avec Datadog
git_integration_title: edgecast_cdn
has_logo: false
integration_id: ''
integration_title: Edgecast
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: edgecast_cdn
public_title: Intégration Datadog/Edgecast
short_description: Recueillez des métriques sur Edgecast.
team: web-integrations
version: '1.0'
---

## Présentation

Recueillez des métriques Edgecast pour surveiller votre trafic Web en fonction de son origine.

## Configuration

### Créer le client Edgecast

1. Connectez-vous à votre [compte Edgecast VDMS][1] et accédez à l'onglet **Clients**.
2. Cliquez sur **Create New Client** pour afficher la fenêtre New Client.
3. Saisissez un nom unique permettant d'identifier le client et cliquez sur **Toggle all ec.analytics** pour autoriser la collecte de métriques par ce client.
4. Accédez à **Settings** et définissez la valeur **JWT Expiration in Seconds** sur 600.
5. Cliquez sur **Save** pour enregistrer ce client ainsi que les nouveaux réglages.

### Configuration

1. Accédez à l'onglet Configuration dans le [carré d'intégration Edgecast][2] de Datadog.
2. Saisissez un nom unique permettant d'identifier ce client dans Datadog.
3. Collez l'ID et le secret du client à partir du client Edgecast créé précédemment.
   * L'ID client est indiqué après `client_id=` dans la requête **Getting an access token**, sous l'onglet **Quick Start** de votre client Edgecast configuré.
   * Le secret du client est indiqué à l'onglet **Client Secrets** de votre client Edgecast configuré.
4. Vous avez la possibilité d'ajouter des tags personnalisés afin de les associer à toutes les métriques recueillies par cette intégration.
   * Le nom Edgecast associé à l'origine est automatiquement ajouté aux métriques sous la forme d'un tag.

## Données collectées

### Métriques
{{< get-metrics-from-git "edgecast_cdn" >}}


### Événements

L'intégration Edgecast n'inclut aucun événement.

### Checks de service

L'intégration Edgecast n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://id.vdms.io
[2]: https://app.datadoghq.com/account/settings#integrations/edgecast-cdn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/edgecast_cdn/edgecast_cdn_metadata.csv
[4]: https://docs.datadoghq.com/fr/help