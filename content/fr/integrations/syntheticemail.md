---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "Synthetic Email": assets/dashboards/synthetic_email.json
  "metrics_metadata": metadata.csv
  "monitors":
    "Hop-count change": assets/monitors/hop_count_change.json
    "Performance degraded": assets/monitors/performance_degraded.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- marketplace
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "Synthetic Email"
"draft": false
"git_integration_title": "syntheticemail"
"guid": "53c7733b-f9b1-43e0-8b34-305e3a4c2c03"
"integration_id": "rapdev-syntheticemail"
"integration_title": "Synthetic Email"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.syntheticemail."
"metric_to_check": "rapdev.syntheticemail.rtt"
"name": "syntheticemail"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.syntheticemail
  "tag": mailbox
  "unit_label": Boîte de messagerie
  "unit_price": !!float "250.0"
"public_title": "Intégration Synthetic Email"
"short_description": "Surveillez les performances aller/retour de vos boîtes de messagerie dans le monde entier"
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---

## Présentation

[{{< img src="marketplace/syntheticemail/images/video.png" alt="Présentation de Synthetic Email" >}}](https://www.youtube.com/watch?v=IUCkv93oLNA)

Cette intégration permet de surveiller vos boîtes de messagerie et de mesurer les livraisons de messages Synthetic complètes (envoi/réception). L'intégration utilise trois sites géographiques sources pour les livraisons d'e-mails Synthetic : Virginie (États-Unis), Francfort (Europe) et Sydney (Asie-Pacifique). Le check fonctionne en envoyant un e-mail test à partir de l'adresse `probe@synth-rapdev.io` et en attendant une réponse automatique de votre boîte de messagerie, qui est envoyée à notre adresse. L'intégration mesure le nombre de hops, la durée de l'aller-retour et les résultats du test (réussite/échec).

Vous trouverez ci-dessous quelques captures d'écran du dashboard fourni avec l'intégration.

### Synthetic Email et temps de réponse

{{< img src="marketplace/syntheticemail/images/1.png" alt="Screenshot1" >}}

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : integrations@rapdev.io 
 - Chat : [RapDev.io/products](https://rapdev.io/products)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-syntheticemail/pricing) pour l'acheter.

