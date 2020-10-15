---
title: Référence sur les API V1
type: api
further_reading:
  - link: /api/v1/using-the-api/
    tag: Documentation
    text: Utiliser l'API
  - link: /api/v1/rate-limits/
    tag: Documentation
    text: Limites de débit
---
{{< h2 >}}Référence sur les API V1{{< /h2 >}}

L'API Datadog est une API HTTP REST. L'API utilise des URL orientées ressources pour appeler l'API, applique des codes de statut afin d'indiquer la réussite ou l'échec des requêtes, renvoie un objet JSON à partir de toutes les requêtes et utilise des codes de réponse HTTP standard. Utilisez l'API Datadog pour accéder à la plateforme Datadog par programmation.

Authentifiez-vous auprès de l'API avec une [clé d'API][1] et, selon l'endpoint, une [clé d'application][2].

Par défaut, la documentation dédiée à l'API Datadog montre des exemples en cURL. Sélectionnez l'une de nos [bibliothèques client][3] officielles dans chaque endpoint pour voir des exemples de code pour cette bibliothèque.

**Remarque** : les exemples de code cURL supposent que vous utilisiez les coreutils GNU et BASH. Sous macOS, vous pouvez installer coreutils via le [gestionnaire de packages Homebrew][4] : `brew install coreutils`.

Pour prendre rapidement en main l'API Datadog, consultez [Utiliser l'API][7], ou consultez la [collection Postman de Datadog][5].

Vous cherchez à prendre en main l'application ? Consultez notre documentation générale [Débuter avec Datadog][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[3]: https://docs.datadoghq.com/fr/developers/libraries/
[4]: https://brew.sh
[5]: /fr/getting_started/api
[6]: /fr/getting_started/application/
[7]: /fr/api/v1/using-the-api/