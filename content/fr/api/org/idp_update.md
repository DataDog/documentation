---
title: Importer les métadonnées IdP
type: apicontent
order: 28.4
external_redirect: /api/#importer-les-metadonnees-IdP
---

## Importer les métadonnées IdP

Il existe plusieurs options permettant de mettre à jour les métadonnées de fournisseur d'identité (IdP) à partir de votre fournisseur d'identité SAML.

* **Multipart Form-Data** : envoie le fichier de métadonnées IdP en publiant un formulaire.
* **XML Body** : envoie le fichier de métadonnées IdP en tant que corps de la requête.

### Multipart Form-Data

##### EN-TÊTES
* **`Content-Type: multipart/form-data`**

**ARGUMENTS**:

* **`idp_file`** [*obligatoire*] :
     le chemin vers le fichier de métadonnées XML que vous souhaitez importer.

### XML Body

##### EN-TÊTES
* **`Content-Type: application/xml`**

**ARGUMENTS**:

Le corps doit comprendre le contenu de votre fichier XML de métadonnées IdP.
