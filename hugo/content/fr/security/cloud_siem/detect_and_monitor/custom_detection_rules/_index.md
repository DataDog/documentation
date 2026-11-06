---
aliases:
- /fr/security_platform/detection_rules/cloud_siem
- /fr/security_platform/detection_rules/security_monitoring
- /fr/security_platform/detection_rules/create_a_new_rule
- /fr/security_platform/cloud_siem/log_detection_rules/
- /fr/cloud_siem/detection_rules/security_monitoring/
- /fr/security/detection_rules/cloud_siem/
- /fr/security/detection_rules/security_monitoring
- /fr/security/detection_rules/create_a_new_rule
- /fr/security/cloud_siem/log_detection_rules/
- /fr/security/cloud_siem/detection_rules/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
  tag: Documentation
  text: Créer une règle de détection personnalisée
- link: /cloud_siem/default_rules/
  tag: Documentation
  text: Configurer les règles de détection Cloud SIEM par défaut
- link: /cloud_siem/explorer/
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: Blog
  text: Détecter des tiers non autorisés dans votre compte AWS
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: Blog
  text: Détecter les menaces de sécurité à l'aide de règles de détection d'anomalies
- link: /security/notifications/variables/
  tag: Documentation
  text: En savoir plus sur les variables de notification de Security
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Surveiller Cloudflare Zero Trust avec Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/
  tag: Blog
  text: Détectez les anomalies au-delà des pics et des nouvelles valeurs avec la détection
    d'anomalies de contenu dans Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: Centre d'apprentissage
  text: Écrivez des règles de détection Cloud SIEM personnalisées
title: Règles de détection personnalisées
type: documentation
---
## Présentation {#overview}

Les règles de détection prêtes à l'emploi vous aident à couvrir la majorité des scénarios de menace, mais vous pouvez également créer des règles de détection personnalisées pour vos cas d'utilisation spécifiques. Consultez [Créer une règle][1] pour obtenir des instructions sur la façon de créer une règle personnalisée.

{{< img src="security/security_monitoring/detection_rules/custom_detection_rules_ui.png" alt="La page de création de règle affichant les types et méthodes de détection que vous pouvez créer" style="width:100%;" >}}

## Types de règles {#rule-types}

Vous pouvez créer les types suivants de règles de détection personnalisées :

- Règle en temps réel : Surveille et analyse en continu les logs entrants.
- Règle planifiée : S'exécute à des intervalles prédéfinis pour analyser les logs.
- Job historique : Effectuez des tests rétrospectifs des détections en exécutant des détections sur des logs historiques.

## Méthodes de détection {#detection-methods}

Les méthodes de détection suivantes sont disponibles lorsque vous créez une règle de détection personnalisée ou un job historique :

- Seuil : Détecte lorsque le nombre de requêtes répond à une condition spécifiée, que ce soit en cas de dépassement (`a > N`) ou de non-atteinte du seuil (`a < N` ou `a <= 0`).
- Nouvelle valeur : Détecte quand un attribut passe à une toute nouvelle valeur.
- Anomalie : Détecte quand un comportement s'écarte de sa ligne de base historique.
- [Anomalie de contenu][6] : Détecte quand le contenu d'un événement est une anomalie par rapport à la ligne de base historique
- [Déplacement impossible][7] : Détecte si une vitesse impossible est détectée dans les logs d'activité des utilisateurs.
- Tiers : Associe les logs de sécurité tiers aux signaux, en définissant la gravité en fonction des attributs du log.
- Corrélation de signaux : Combine plusieurs signaux ensemble pour générer un nouveau signal afin que vous puissiez alerter sur des cas d'utilisation plus complexes et réduire la fatigue liée aux alertes.

## Filtrer les logs en fonction des Reference Tables {#filter-logs-based-on-reference-tables}

<div class="alert alert-warning">Les Reference Tables contenant plus de 1 000 000 de lignes ne peuvent pas être utilisées pour filtrer les événements. Consultez <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Ajouter des métadonnées personnalisées avec des Reference Tables</a> pour plus d'informations sur la création et la gestion des Reference Tables. </div>

Les Reference Tables vous permettent de combiner des métadonnées avec des logs, fournissant ainsi plus d'informations pour résoudre les problèmes d'application. Lorsque vous définissez une requête pour une règle, vous pouvez ajouter un filtre de requête basé sur une Reference Table pour effectuer des requêtes de recherche. Pour plus d'informations sur la création et la gestion de cette fonctionnalité, consultez le guide [Reference Tables][10].

Dans l'exemple suivant, une Reference Table contenant des informations sur les produits est utilisée pour filtrer et enrichir les logs :

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="L'éditeur de requête de règle de détection de logs avec les options de recherche de Reference Table mises en évidence" style="width:100%;" >}}

## Tests unitaires {#unit-testing}

Utilisez les tests unitaires pour tester vos règles à l'aide de logs d'exemple et assurez-vous que la règle de détection fonctionne comme prévu. Cela peut être utile lorsque vous créez une règle de détection pour un événement qui ne s'est pas encore produit, de sorte que vous ne disposez pas de logs réels pour cet événement. Par exemple : Vous avez des logs avec un champ `login_attempt` et souhaitez détecter les logs avec `login_attempt:failed`, mais vous n'avez que des logs avec `login_attempt:success`. Pour tester la règle, vous pouvez créer un log d'exemple en copiant un log contenant `login_attempt:success` et en modifiant le champ `login_attempt` pour y mettre `failed`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
[2]: https://app.datadoghq.com/security/siem/rules
[3]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[10]: /fr/integrations/guide/reference-tables/