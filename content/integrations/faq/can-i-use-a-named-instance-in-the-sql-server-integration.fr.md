---
title: Puis-je utiliser une instance nommée dans l'intégration SQL Server?
kind: faq
---

Lors de la connexion à une instance par défaut dans SQL Server, les utilisateurs spécifient le nom de l'host avec le port (1433 par défaut) comme valeur d'host dans le fichier sqlserver.yaml. Lorsque [vous investiguez des problèmes de connexion avec SQL Server](/integrations/faq/connection-issues-with-the-sql-server-integration), assurez-vous que nous nous connectons à une instance par défaut ou une instance nommée. Les instances nommées peuvent être connectées à l'aide de la syntaxe $SERVER\$INSTANCE_NAME, mais uniquement si le service SQL Server Browser est activé car ce service fournit le port sur lequel se trouve l'instance.

Voici les docs de Microsoft avec plus d'informations sur le service SQL Server Browser:
```
https://technet.microsoft.com/en-us/library/ms181087(v=sql.105).aspx#Anchor_2
```

Le service SQL Server Browser est requis pour utiliser des instances nommées et ce service est désactivé par défaut. Nous recommandons fortement l'approbation d'un administrateur système avant d'activer [ce service](https://technet.microsoft.com/en-us/library/ms165734(v=sql.90).aspx).

Une fois le service SQL Server Browser activé, vous pouvez configurer le fichier [sqlserver.yaml](https://github.com/DataDog/integrations-core/blob/5.17.x/sqlserver/conf.yaml.example#L61) pour se connecter à une instance nommée en désignant l'instance nommée dans la valeur de l'host. Par exemple:

```yaml
instances:
  - host: $SERVER\$INSTANCENAME
```