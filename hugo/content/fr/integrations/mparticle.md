---
categories:
- mobile
dependencies: []
description: Surveillez les crashs d'applications et recueillez des métriques détaillées
  sur les performances d'exécution.
doc_link: https://docs.datadoghq.com/integrations/mparticle/
draft: false
git_integration_title: mparticle
has_logo: true
integration_id: mparticle
integration_title: mParticle
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: mparticle
public_title: Intégration Datadog/mParticle
short_description: Surveillez les crashs d'applications et recueillez des métriques
  détaillées sur les performances d'exécution.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

mParticle vous permet d'obtenir des données détaillées sur les performances d'exécution de vos applications mobiles. Le SDK mParticle recueille automatiquement des données de performances d'exécution détaillées telles que la charge CPU, l'empreinte mémoire et le niveau de batterie. Connectez mParticle à Datadog pour visualiser les informations suivantes en temps réel sur votre dashboard Datadog :

- Rapports de crash
- Données de performances réseau tierces
- Informations sur la session active
- Utilisation de la batterie, de la mémoire et du processeur de l'appareil

Pour en savoir plus sur mParticle, consultez [cet article de blog][1] et [la documentation][2] associée (en anglais).

## Formule et utilisation

### Liste des infrastructures

1. Connectez-vous à votre [compte mParticle][3].
2. Accédez à la page des services en cliquant sur l'icône en forme d'avion en papier dans la barre de navigation à gauche.
3. Cliquez sur le carré Datadog pour afficher le volet des paramètres de l'intégration Datadog.
4. Saisissez votre [clé d'API Datadog][4] dans le volet des paramètres et cliquez sur Save.
5. Activez le paramètre Status de façon à transmettre les données à Datadog.

## Real User Monitoring

### Analyse d'entonnoirs

Consultez la [documentation mParticle][2] pour découvrir les métriques disponibles avec cette intégration.

### Aide

L'intégration mParticle n'inclut aucun événement.

### Aide

L'intégration mParticle n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://www.datadoghq.com/blog/track-detailed-run-time-performance-data-with-mparticle-and-datadog/
[2]: https://docs.mparticle.com/integrations/datadog/event/
[3]: https://app.mparticle.com/login?return=
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/fr/help/