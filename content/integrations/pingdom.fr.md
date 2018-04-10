---
categories:
- monitoring
- notification
ddtype: crawler
description: Consultez les temps de disponibilité, les temps de réponse et les alertes collectés par Pingdom dans Datadog.
doc_link: https://docs.datadoghq.com/integrations/pingdom/
git_integration_title: pingdom
has_logo: true
integration_title: Pingdom
is_public: true
kind: integration
manifest_version: '1.0'
name: pingdom
public_title: Intégration Datadog-Pingdom 
short_description: Consultez les temps de disponibilité, les temps de réponse et les alertes collectés par Pingdom dans Datadog.
version: '1.0'
---

## Aperçu

Suivre les métriques de performance centrées sur l'utilisateur Pingdom dans Datadog, pour la corrélation avec d'autres événements et métriques pertinentes.

À ce stade, nous suivons la métrique response_time pour tous les sites que vous configurez sur le site Web de Pingdom.

Des événements Pingdom peuvent être ajoutés en configurant le [Monitor de Status][1] pertinent .

<div class="alert alert-info">
Les métriques peuvent uniquement être importées pour les clients Pingdom de niveau Starter ou supérieur.
</div>

## Implémentation
### Installation

1.  Ouvrez la vignette d'intégration Pingdom.
2.  Entrez le nom d'utilisateur et le mot de passe pour votre compte Pingdom.
    (Si vous avez un compte d'équipe, vous pouvez utiliser vos propres informations d'identification et spécifier le compte à partir duquel vous souhaitez effectuer des vérifications.)
3.  Vous pouvez ignorer certaines vérifications en les décochant ou en ajoutant des tags aux événements qui vont être générés.

## Données collectées
### Métriques
{{< get-metrics-from-git "pingdom" >}}

### Evénements
L'intégration Pingdom n'inclut aucun événement pour le moment.

### Checks de Service
{{< get-service-checks-from-git "pingdom" >}}

## Troubleshooting
### Pourquoi ai-je une erreur lors de la mise à jour de l'utilisateur / du mot de passe?
Vous avez peut-être vu ce qui suit lors de l'enregistrement de vos informations d'identification pingdom:

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Ajoutez l'adresse e-mail de votre propriétaire de compte pingdom dans le champ **(Optional) Account to query**, puis enregistrez-la.

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][2]

[1]: https://app.datadoghq.com/monitors#create/integration
[2]: https://www.datadoghq.com/blog/
