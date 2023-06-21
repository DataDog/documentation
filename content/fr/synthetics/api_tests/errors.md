---
title: Erreurs de test API
kind: documentation
description: Description détaillée des erreurs de test API
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: /synthetics/
  tag: Documentation
  text: Gérer vos checks
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test Browser
---

## Erreurs SSL

Les erreurs SSL peuvent se produire durant l'exécution d'un test API. Elles diffèrent des échecs d'assertion associées aux tests SSL et peuvent survenir lors de n'importe quel type de test API.

{{< img src="synthetics/api_tests/ssl-self-signed-error.png" alt="Erreur SSL auto-signé" style="width:60%;" >}}

| Erreur                                | Description                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CERT_CHAIN_TOO_LONG`                | La longueur de chaîne du certificat est supérieure à la profondeur maximum spécifiée.                                                                                                 |
| `CERT_HAS_EXPIRED`                   | Le certificat a expiré.                                                                                                                                              |
| `CERT_NOT_YET_VALID`                 | Le certificat n'est pas valide jusqu'à une date future.                                                                                                                        |
| `CERT_REJECTED`                      | L'autorité de certification racine ne permet pas l'usage spécifié.                                                                                                                   |
| `CERT_REVOKED`                       | Le certificat a été révoqué par son émetteur.                                                                                                                               |
| `CERT_UNTRUSTED`                     | L'autorité de certification racine n'est pas marquée comme approuvée pour l'usage prévu.                                                                                                           |
| `CERT_SIGNATURE_FAILURE`             | La signature du certificat n'est pas valide.                                                                                                                           |
| `CRL_HAS_EXPIRED`                    | La liste des certificats révoqués (CRL) a expiré.                                                                                                                       |
| `CRL_NOT_YET_VALID`                  | La liste des certificats révoqués (CRL) n'est pas valide jusqu'à une date future.                                                                                                  |
| `CRL_SIGNATURE_FAILURE`              | La signature CRL du certificat n'est pas valide.                                                                                                                       |
| `DEPTH_ZERO_SELF_SIGNED_CERT`        | Le certificat transmis est auto-signé et aucun certificat identique ne figure dans la liste des certificats approuvés.                                                      |
| `ERROR_IN_CERT_NOT_AFTER_FIELD`      | Le champ notAfter du certificat est mal formaté.                                                                                                        |
| `ERROR_IN_CERT_NOT_BEFORE_FIELD`     | Le champ notBefore du certificat est mal formaté.                                                                                                       |
| `ERROR_IN_CRL_LAST_UPDATE_FIELD`     | Le champ lastUpdate de la CRL contient une heure non valide.                                                                                                                       |
| `ERROR_IN_CRL_NEXT_UPDATE_FIELD`     | Le champ nextUpdate de la CRL contient une heure non valide.                                                                                                                       |
| `INVALID_CA`                         | Un certificat d'autorité de certification n'est pas valide, car il ne s'agit pas d'une autorité de certification ou ses extensions ne sont pas en accord avec l'usage prévu.                                                     |
| `INVALID_PURPOSE`                    | Le certificat fourni n'est pas adapté à l'usage prévu.                                                                                               |
| `OUT_OF_MEM`                         | Une erreur s'est produite lors de l'allocation de mémoire.                                                                                                                               |
| `PATH_LENGTH_EXCEEDED`               | Le paramètre pathlength de l'extension basicConstraints a été dépassé.                                                                                                                  |
| `SELF_SIGNED_CERT_IN_CHAIN`          | Un certificat auto-signé existe dans la chaîne du certificat. La chaîne du certificat peut être créée avec les certificats non approuvés, mais l'autorité de certification racine est introuvable localement. |
| `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY` | La clé publique dans le certificat ne peut pas être lue.                                                                                                                        |
| `UNABLE_TO_DECRYPT_CERT_SIGNATURE`   | Impossible de déchiffrer la signature du certificat.                                                                                                                      |
| `UNABLE_TO_DECRYPT_CRL_SIGNATURE`    | Impossible de déchiffrer la signature de la CRL. (La valeur de signature réelle ne peut pas être déterminée.)                                                                                |
| `UNABLE_TO_GET_CRL`                  | La liste des certificats révoqués (CRL) est introuvable.                                                                                                                      |
| `UNABLE_TO_GET_ISSUER_CERT`          | Impossible de trouver le certificat pour une des autorités de certification (CA) dans la hiérarchie de signature, et cette CA n'est pas approuvée par l'application locale.               |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`  | Le certificat de l'émetteur d'un certificat trouvé localement est introuvable. Cela signifie généralement que la liste des certificats approuvés est incomplète.                            |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`    | Aucune signature n'est vérifiée car la chaîne de certificats contient un seul certificat qui n'est pas auto-signé, et l'émetteur n'est pas approuvé.                         |
