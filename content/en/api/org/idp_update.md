---
title: Upload IdP metadata
type: apicontent
order: 28.4
external_redirect: /api/#upload-idp-metadata
---

## Upload IdP metadata

There are a couple of options for updating the Identity Provider (IdP) metadata from your SAML IdP.

* **Multipart Form-Data**: Post the IdP metadata file using a form post.
* **XML Body**: Post the IdP metadata file as the body of the request.

### Multipart Form-Data

##### HEADERS
* **`Content-Type: multipart/form-data`**

**ARGUMENTS**:

* **`idp_file`** [*required*]:
     The path to the XML metadata file you wish to upload.

### XML Body

##### HEADERS
* **`Content-Type: application/xml`**

**ARGUMENTS**:

The body must contain the contents of your IdP metadata XML file.
