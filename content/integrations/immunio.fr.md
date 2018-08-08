---
categories:
- security
ddtype: crawler
description: Recueillir des données d'Immunio pour visualiser et monitorer les modèles d'attaque.
doc_link: https://docs.datadoghq.com/integrations/immunio/
git_integration_title: immunio
has_logo: true
integration_title: Immunio
is_public: true
kind: integration
manifest_version: '1.0'
name: immunio
public_title: Intégration Datadog-Immunio
short_description: Recueillir des données d'Immunio pour visualiser et monitorer les modèles d'attaque.
version: '1.0'
---

{{< img src="integrations/immunio/immunio_dash.png" alt="Immunio Dashboard" responsive="true" >}}

## Aperçu

Connectez la surveillance avancée de la sécurité des applications d'IMMUNIO à Datadog pour visualiser l'impact que les attaques ont sur votre application Web et monitorer la protection automatique d'IMMUNIO.

IMMUNIO monitor vos applications pour détecter et vous défendre contre tout ce qui suit:

* Attaques de prise de contrôle de compte telles que Brute Force, Credential Stuffing, etc.
* Les attaques au niveau du code telles que XSS, SQLi et l'exécution de commandes à distance,
* Les attaques au niveau de l'entreprise, comme la fraude par carte de crédit et d'autres abus,
* Mauvais comportement général comme le balayage et le grattage.

## Implémentation
### Installation

1.  Connectez vous à votre [compte  IMMUNIO](http://www.immun.io/).
1.  Accédez à la [page d'implémentation des intégrations](https://dashboard.immun.io/#/settings/integrations).
    {{< img src="integrations/immunio/immuniosetup1.png" alt="Integration Setup Page" responsive="true" >}}
1.  Cliquez sur "Add an API Key".
    {{< img src="integrations/immunio/immuniosetup2.png" alt="Add API Key" responsive="true" >}}
1.  Ajoutez votre clé API.

### Configuration

Aucune étape de configuration n'est requise pour cette intégration.

### Validation

Pour valider votre installation et votre configuration, redémarrez l'agent et exécutez la commande info. La sortie doit contenir une section similaire à celle-ci:

```shell
Checks
======
  [...]
  immunio
  -----
      - instance #0 [OK]
      - Collected 4 metrics & 0 events
```

## Données collectées
### Métriques
{{< get-metrics-from-git "immunio" >}}


### Evénements
L'intégration IMMUNIO n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration IMMUNIO n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


