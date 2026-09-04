---
aliases:
- /fr/security/application_security/api-inventory/
description: Répertoriez les endpoints et les services d'API, et évaluez le risque
  de sécurité des API dans l'ensemble de votre environnement.
further_reading:
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Atténuez les principaux risques de sécurité des API
- link: https://www.datadoghq.com/blog/improve-api-authentication-detection-with-datadog/
  tag: Blog
  text: Améliorez la détection de l'authentification des API avec Datadog
title: Inventaire des API
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

[API Inventory][1] est un catalogue mis à jour en continu des endpoints et des services d'API qu'API Posture découvre dans l'ensemble de votre environnement. Il affiche le contexte de sécurité de chaque endpoint, tel que le statut d'authentification, l'exposition publique, les flux de données sensibles et les résultats associés.

L'inventaire se compose de deux Explorers :

- **[API Endpoints][2]** : L'Explorer API Endpoints répertorie vos endpoints individuels, fait apparaître les API fantômes (endpoints non documentés sans définition d'API et non détectés depuis Amazon API Gateway) et les API orphelines (endpoints documentés sans trafic), et vous aide à hiérarchiser les endpoints les plus à risque.
- **[Services][3]** : L'Explorer Services agrège les résultats, les vulnérabilités et les signaux d'exécution par service, afin que vous puissiez évaluer le risque et la couverture de sécurité de chaque service.

Pour détecter et répondre aux faiblesses, aux attaques ou aux erreurs de configuration sur ces endpoints, utilisez [API Findings][4]. Dans l'Explorer API Endpoints, chaque ligne affiche une puce de résultats qui ouvre le résultat correspondant dans API Findings.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /fr/security/application_security/api_posture/api_inventory/api_endpoints/
[3]: /fr/security/application_security/api_posture/api_inventory/services/
[4]: /fr/security/application_security/api_posture/api_findings/