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
{{< h2 >}}Références sur les API{{< /h2 >}}

L'API Datadog est une API HTTP REST. L'API utilise des URL orientées ressources pour appeler l'API, applique des codes de statut afin d'indiquer la réussite ou l'échec des requêtes, renvoie un objet JSON à partir de toutes les requêtes et utilise des codes de réponse HTTP standard. Utilisez l'API Datadog pour accéder à la plateforme Datadog par programmation.

### Prise en main

Authentifiez-vous auprès de l'API avec une [clé d'API][1] et, selon l'endpoint, une [clé d'application][2].

Pour essayer l'API : [![Exécuter dans Postman][3]](https://app.getpostman.com/run-collection/bf4ac0b68b8ff47419c1#?env%5BDatadog%20Authentication%5D=W3sia2V5IjoiYXBwbGljYXRpb25fa2V5IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFwaV9rZXkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

Les endpoints sont décrits dans le guide [Utiliser l'API][4].

**Remarque** : les exemples de code cURL supposent que vous utilisiez les coreutils GNU et BASH. Sous macOS, vous pouvez installer coreutils via le [gestionnaire de paquets Homebrew][5] : `brew install coreutils`.

### Bibliothèques client

Par défaut, la documentation dédiée à l'API Datadog montre des exemples en cURL. Sélectionnez l'une de nos [bibliothèques client][6] officielles dans chaque endpoint pour voir des exemples de code pour cette bibliothèque. Pour installer chaque bibliothèque :

{{< programming-lang-wrapper langs="java,python,ruby,go" >}}

{{< programming-lang lang="java" >}}
Maven - Ajoutez cette dépendance au fichier POM de votre projet :
 ```java
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
 ```

 Gradle - Ajoutez cette dépendance au fichier de build de votre projet :
 ```java
compile "com.datadoghq:datadog-api-client:1.0.0"
 ```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
 ```python
pip install datadog
 ```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
 ```ruby
gem install dogapi
 ```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
 ```go
import "github.com/DataDog/datadog-api-client-go/api/<VERSION>/datadog"
 ```
 **Remarque** : remplacez `<VERSION>` par v1 ou v2 en fonction des endpoints que vous souhaitez utiliser.
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Vous pouvez également consulter directement les bibliothèques :

{{< partial name="api/sdk-languages.html" >}}
</br>
Vous cherchez à prendre en main l'application ? Consultez notre documentation générale [Débuter avec Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /fr/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/fr/developers/libraries/
[7]: /fr/getting_started/application/
