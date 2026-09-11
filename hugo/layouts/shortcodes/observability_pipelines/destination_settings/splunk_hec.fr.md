Les champs suivants sont facultatifs :
1. Entrez le nom de l'index Splunk vers lequel vous souhaitez envoyer vos données. Votre HEC doit être autorisé à accéder à cet index.
1.  Indiquez si le timestamp doit être extrait automatiquement. Lorsque la valeur est définie sur `true`, Splunk extrait le timestamp du message avec le format attendu `aaaa-mm-jj hh:mm:ss`.
1. Définissez le paramètre `sourcetype` pour remplacer la valeur par défaut de Splunk, c'est-à-dire `httpevent` pour les données HEC.
