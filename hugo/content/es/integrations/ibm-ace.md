---
aliases:
- /es/integrations/ibm_ace
app_id: ibm-ace
categories:
- recopilación de logs
custom_kind: integración
description: Monitoriza estadísticas de recursos y flujos de mensajes de IBM ACE.
integration_version: 4.1.0
media: []
supported_os:
- linux
- windows
- macos
title: IBM ACE
---
## Información general

Con este check se monitoriza [IBM ACE](https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction) a través del Datadog Agent.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### IBM MQ

Se necesita un servidor [IBM MQ](https://www.ibm.com/products/mq) para consumir mensajes de métricas de IBM ACE.

<div class="alert alert-warning">
Para Linux, asegúrate de establecer la variable de entorno LD_LIBRARY_PATH como se describe en la <a href="https://docs.datadoghq.com/integrations/ibm_mq/">configuración de IBM MQ</a> antes de continuar.
</div>

### IBM ACE

1. Asegúrate de que esté instalada al menos la versión 12.0.2.0.
1. Aplica una [política de MQEndpoint](https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy) con el siguiente nombre de archivo `<MQ_POLICY_NAME>.policyxml` que tendrá el siguiente aspecto:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <policies>
       <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
           <connection>CLIENT</connection>
           <destinationQueueManagerName>...</destinationQueueManagerName>
           <queueManagerHostname>...</queueManagerHostname>
           <listenerPortNumber>1414</listenerPortNumber>
           <channelName>...</channelName>
           <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
       </policy>
   </policies>
   ```
1. [Configura](https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager) las credenciales ejecutando: `mqsisetdbparms -n mq::<MQ_SECURITY_IDENTITY> -u <user> -p <password>`
1. Actualiza tu archivo `server.conf.yaml` con la siguiente configuración:
   ```yaml
   remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
   Events:
     OperationalEvents:
       MQ:
         enabled: true
     BusinessEvents:
       MQ:
         enabled: true
         outputFormat: json
   Statistics:
     Resource:
       reportingOn: true
     Snapshot:
       publicationOn: active
       outputFormat: json
       accountingOrigin: basic
       nodeDataLevel: advanced
       threadDataLevel: basic
   Monitoring:
     MessageFlow:
       publicationOn: active
       eventFormat: MonitoringEventV2
   AdminLog:
     enabled: true
     fileLog: true
     consoleLog: true
     consoleLogFormat: ibmjson
   ```
1. Reinicia IBM ACE.

### Instalación

El check de IBM ACE está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `ibm_ace.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de ibm_ace. Consulta el [ejemplo de ibm_ace.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ibm_ace` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ibm_ace.messages.current** <br>(gauge) | El número de mensajes que se han recuperado en el check actual por tipo de suscripción.|
| **ibm_ace.CICS.ConnectionAttemptFailures** <br>(count) | El número de intentos de connection (conexión) que fallan.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.CICS.RequestFailures** <br>(count) | El número total de solicitudes a CICS que fallan. El valor que devuelve esta medida no incluye los fallos de connection (conexión). Los valores de fallo de connection (conexión) los devuelve la medida ConnectionAttemptFailures.<br>_Mostrado como solicitud_ |
| **ibm_ace.CICS.RequestSecurityFailures** <br>(count) | El número de solicitudes fallidas a CICS causadas por problemas de seguridad, como fallos de autenticación.<br>_Mostrado como solicitud_ |
| **ibm_ace.CICS.RequestSuccess** <br>(count) | El número de solicitudes a CICS que han tenido éxito.<br>_Mostrado como solicitud_ |
| **ibm_ace.CORBA.OutboundCorbaExceptions** <br>(count) | El número de llamadas al servidor CORBA que dan como resultado excepciones de CORBA.|
| **ibm_ace.CORBA.OutboundInvocations** <br>(count) | El número total de llamadas realizadas a un servidor CORBA.|
| **ibm_ace.CORBA.OutboundSuccessfulInvocations** <br>(count) | Número de llamadas al servidor CORBA realizadas con éxito.|
| **ibm_ace.ConnectDirect.InboundBytes** <br>(count) | Número total de bytes recibidos en transferencias, seleccionadas desde el servidor Connect:Direct.<br>_Mostrado como byte_ |
| **ibm_ace.ConnectDirect.InboundTransfers** <br>(count) | Número de transferencias recibidas por el servidor Connect:Direct seleccionado para el procesamiento en un flujo de mensajes.|
| **ibm_ace.ConnectDirect.NoHitTransfers** <br>(count) | El número de transferencias recibidas por el servidor Connect:Direct no seleccionadas para el procesamiento en un flujo de mensajes. Este número da el total de todo el nodo de integración y no solo de este servidor de integración.|
| **ibm_ace.ConnectDirect.OutboundBytes** <br>(count) | Número total de bytes contenidos en las transferencias enviadas al servidor Connect:Direct.<br>_Mostrado como byte_ |
| **ibm_ace.ConnectDirect.OutboundTransfers** <br>(count) | El número de transferencias enviadas al servidor Connect:Direct.|
| **ibm_ace.FTEAgent.InboundBytes** <br>(count) | El número de bytes recibidos por el agente.<br>_Mostrado como byte_ |
| **ibm_ace.FTEAgent.InboundTransfers** <br>(count) | El número de transferencias recibidas por el agente.|
| **ibm_ace.FTEAgent.OutboundBytes** <br>(count) | El número de bytes enviados por el agente.<br>_Mostrado como byte_ |
| **ibm_ace.FTEAgent.OutboundTransfers** <br>(count) | El número de transferencias enviadas por el agente.|
| **ibm_ace.FTP.BytesReceived** <br>(count) | El número de bytes transferidos desde un servidor remoto al sistema de archivos del nodo de integración.<br>_Mostrado como byte_ |
| **ibm_ace.FTP.BytesSent** <br>(count) | El número de bytes transferidos desde el sistema de archivos del nodo de integración a un servidor remoto.<br>_Mostrado como byte_ |
| **ibm_ace.FTP.FTPGets** <br>(count) | El número de transferencias desde un servidor remoto al sistema de archivos del nodo de integración.|
| **ibm_ace.FTP.FTPPuts** <br>(count) | El número de transferencias desde el sistema de archivos del nodo de integración a un servidor remoto. El contador de FTPPuts puede aumentar en dos casos: cuando se transfiere un nuevo archivo o cuando se realiza un anexo a un archivo existente.|
| **ibm_ace.File.BytesRead** <br>(count) | El número total de bytes leídos por un nodo de entrada de archivo, un nodo de entrada FTE o un nodo de lectura de archivo.<br>_Mostrado como byte_ |
| **ibm_ace.File.BytesWritten** <br>(count) | El número total de bytes escritos por un nodo de salida de archivo o un nodo de salida FTE.<br>_Mostrado como byte_ |
| **ibm_ace.File.FilesCreated** <br>(count) | El número de archivos creados con éxito por un nodo de salida de archivos.<br>_Mostrado como archivo_ |
| **ibm_ace.File.FilesRead** <br>(count) | El número de archivos leídos con éxito por cualquier nodo de archivo.<br>_Mostrado como archivo_ |
| **ibm_ace.File.RecordsRead** <br>(count) | El número de registros leídos por un nodo de entrada de archivos, un nodo de entrada FTE o un nodo de lectura de archivos.|
| **ibm_ace.File.RecordsWritten** <br>(count) | El número de registros escritos en archivos por un nodo de salida de archivos o un nodo de salida FTE.|
| **ibm_ace.GlobalCache.ConnectionFailures** <br>(count) | Número de intentos fallidos de conexión desde este servidor de integración a la caché nombrada.|
| **ibm_ace.GlobalCache.Connects** <br>(count) | El número de intentos realizados con éxito desde este servidor de integración a la caché nombrada.|
| **ibm_ace.GlobalCache.FailedActions** <br>(count) | El número de operaciones de asignación fallidas por flujos de mensajes en este servidor de integración en la caché nombrada.|
| **ibm_ace.GlobalCache.MapReads** <br>(count) | El número total de operaciones de lectura completadas por flujos de mensajes en este servidor de integración en la caché nombrada.|
| **ibm_ace.GlobalCache.MapRemoves** <br>(count) | El número total de operaciones de eliminación completadas por flujos de mensajes en este servidor de integración en la caché nombrada. Este count se incrementa al eliminar o actualizar una entrada.|
| **ibm_ace.GlobalCache.MapWrites** <br>(count) | El número total de operaciones de escritura completadas por flujos de mensajes en este servidor de integración en la caché nombrada. Este count se incrementa al poner o actualizar una entrada.|
| **ibm_ace.GlobalCache.MapsUsed** <br>(count) | El número total de asignaciones utilizadas por los flujos de mensajes en este servidor de integración en la caché con nombre. Este count se incrementa cada vez que se utiliza un nombre de asignación diferente en este servidor de integración.|
| **ibm_ace.GlobalCache.TotalMapActions** <br>(count) | El número total de operaciones de asignación completadas por flujos de mensajes en este servidor de integración en la caché nombrada. Este número incluye lecturas, escrituras, eliminaciones y checks de claves.|
| **ibm_ace.JDBCConnectionPools.ActualSizeOfPool** <br>(gauge) | Una instantánea del número de connections (conexiones) que había en ese momento en el pool cuando se notificaron las estadísticas.<br>_Mostrado como as connection (conexión)_ |
| **ibm_ace.JDBCConnectionPools.CumulativeDelayedRequests** <br>(count) | El número de veces que no se ha podido satisfacer inmediatamente una solicitud de connection (conexión) porque el número de connections (conexiones) asignadas ha alcanzado el tamaño máximo del pool y no hay connections (conexiones) disponibles en ese momento.<br>_Mostrado como solicitud_ |
| **ibm_ace.JDBCConnectionPools.CumulativeRequests** <br>(count) | Count del número de solicitudes recibidas por el grupo de connections (conexiones) durante este periodo contable.<br>_Mostrado como solicitud_ |
| **ibm_ace.JDBCConnectionPools.CumulativeTimedOutRequests** <br>(count) | Count del número de solicitudes de connections (conexiones) que no han podido satisfacerse en 15 segundos.<br>_Mostrado como solicitud_ |
| **ibm_ace.JDBCConnectionPools.MaxDelayInMilliseconds** <br>(gauge) | El tiempo máximo que un llamante esperó a que se asignara una connection (conexión).<br>_Mostrado como milisegundo_ |
| **ibm_ace.JDBCConnectionPools.MaxSizeOfPool** <br>(gauge) | El tamaño máximo del pool de connections (conexiones).<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.JMS.NumberOfClosedJMSConnections** <br>(count) | El número total de connections (conexiones) JMS que se cerraron desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.JMS.NumberOfClosedJMSSessions** <br>(count) | El número total de sesiones JMS que se cerraron desde el último reinicio del servidor de integración.|
| **ibm_ace.JMS.NumberOfJMSConnectionFailures** <br>(count) | El número total de intentos de connctions (conexiones) JMS que han fallado desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.JMS.NumberOfMessagesBrowsed** <br>(count) | El número total de mensajes consultados por los nodos JMSReceive.|
| **ibm_ace.JMS.NumberOfMessagesReceived** <br>(count) | El número total de mensajes recibidos por los nodos JMSInput o JMSReceive.|
| **ibm_ace.JMS.NumberOfMessagesSent** <br>(count) | El número total de mensajes enviados por los nodos JMSOutput.|
| **ibm_ace.JMS.NumberOfOpenJMSConnections** <br>(gauge) | El número actual de connections (conexiones) JMS abiertas.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.JMS.NumberOfOpenJMSSessions** <br>(gauge) | El número actual de sesiones JMS abiertas.|
| **ibm_ace.JVM.CommittedMemoryInMB** <br>(gauge) | La cantidad de memoria que el sistema operativo asigna a la JVM.<br>_Mostrado como mebibyte_ |
| **ibm_ace.JVM.CumulativeNumberOfGCCollections** <br>(count) | El número total de recolecciones de basura que se han producido para esta instancia de la JVM. Su valor puede ser indefinido.|
| **ibm_ace.JVM.GCTime** <br>(gauge) | El porcentaje de tiempo empleado en la recolección de basura para esta instancia de la JVM. Su valor puede ser indefinido.<br>_Mostrado como porcentaje_. |
| **ibm_ace.JVM.InitialMemoryInMB** <br>(gauge) | La cantidad inicial de memoria que la JVM solicita al sistema operativo para la gestión de memoria durante el arranque. Su valor puede ser indefinido.<br>_Mostrado como mebibyte_. |
| **ibm_ace.JVM.MaxMemoryInMB** <br>(gauge) | La cantidad máxima de memoria que se puede utilizar para la gestión de memoria. Su valor puede ser indefinido.<br>_Mostrado como mebibyte_. |
| **ibm_ace.JVM.UsedMemoryInMB** <br>(gauge) | La cantidad de memoria que está actualmente en uso.<br>_Mostrado como mebibyte_ |
| **ibm_ace.MessageFlow.CPUTime** <br>(gauge) | El porcentaje de tiempo que el procesador dedica a procesar los mensajes de entrada<br>_Mostrado como porcentaje_. |
| **ibm_ace.MessageFlow.CPUTimeWaitingForInputMessage** <br>(gauge) | El porcentaje de tiempo que el procesador dedica a esperar mensajes de entrada<br>_Mostrado como porcentaje_. |
| **ibm_ace.MessageFlow.ElapsedTime** <br>(gauge) | El porcentaje de tiempo transcurrido dedicado a procesar los mensajes de entrada<br>_Mostrado como porcentaje_. |
| **ibm_ace.MessageFlow.ElapsedTimeWaitingForInputMessage** <br>(gauge) | El porcentaje de tiempo transcurrido que se pasa esperando mensajes de entrada<br>_Mostrado como porcentaje_. |
| **ibm_ace.MessageFlow.MaximumCPUTime** <br>(gauge) | Tiempo máximo que el procesador emplea en procesar un mensaje de entrada (microsegundos)<br>_Mostrado como microsegundo_ |
| **ibm_ace.MessageFlow.MaximumElapsedTime** <br>(gauge) | Tiempo máximo que se tarda en procesar un mensaje de entrada (microsegundos)<br>_Mostrado como microsegundo_. |
| **ibm_ace.MessageFlow.MaximumSizeOfInputMessages** <br>(gauge) | Tamaño máximo del mensaje de entrada<br>_Mostrado como byte_ |
| **ibm_ace.MessageFlow.MinimumCPUTime** <br>(gauge) | Tiempo mínimo que el procesador emplea en procesar un mensaje de entrada (microsegundos)<br>_Mostrado como microsegundo_ |
| **ibm_ace.MessageFlow.MinimumElapsedTime** <br>(gauge) | Tiempo mínimo transcurrido que se emplea en procesar un mensaje de entrada (microsegundos)<br>_Mostrado como microsegundo_ |
| **ibm_ace.MessageFlow.MinimumSizeOfInputMessages** <br>(gauge) | Tamaño mínimo de entrada del mensaje<br>_Mostrado como byte_ |
| **ibm_ace.MessageFlow.NumberOfThreadsInPool** <br>(gauge) | Número de subprocesos en el pool<br>_Mostrado como subproceso_ |
| **ibm_ace.MessageFlow.TimesMaximumNumberOfThreadsReached** <br>(count) | Número de veces que se alcanza el número máximo de subprocesos|
| **ibm_ace.MessageFlow.TotalInputMessages** <br>(count) | Número total de mensajes procesados. Registra solo los mensajes que se propagan desde los terminales de los nodos de entrada.|
| **ibm_ace.MessageFlow.TotalNumberOfBackouts** <br>(count) | Número de transacciones anuladas|
| **ibm_ace.MessageFlow.TotalNumberOfCommits** <br>(count) | Número de confirmaciones de transacciones|
| **ibm_ace.MessageFlow.TotalNumberOfErrorsProcessingMessages** <br>(count) | Número de errores al procesar un mensaje|
| **ibm_ace.MessageFlow.TotalNumberOfMQErrors** <br>(count) | Número de errores MQGET (nodo MQInput) o errores de servicios web (nodo HTTPInput). Por ejemplo, se produce un error de conversión cuando se obtiene el mensaje de la cola.|
| **ibm_ace.MessageFlow.TotalNumberOfMessagesWithErrors** <br>(count) | Número de mensajes que contienen errores, incluidas las excepciones que se lanzan aguas abajo del nodo de entrada y los errores que detecta el nodo de entrada después de recuperar correctamente el mensaje de la cola, pero antes de propagarlo al terminal de salida (por ejemplo, un error de formato). Esto puede incluir mensajes que no están incluidos en TotalInputMessages.|
| **ibm_ace.MessageFlow.TotalNumberOfTimeOutsWaitingForRepliesToAggregateMessages** <br>(count) | Número de tiempos de espera al procesar un mensaje (solo el nodo AggregateReply)|
| **ibm_ace.MessageFlow.TotalSizeOfInputMessages** <br>(count) | Tamaño total de los mensajes de entrada<br>_Mostrado como byte_ |
| **ibm_ace.MQTT.BytesReceived** <br>(count) | La cantidad total de datos recibidos por los nodos MQTTSubscribe.<br>_Mostrado como byte_ |
| **ibm_ace.MQTT.BytesSent** <br>(count) | La cantidad total de datos enviados por los nodos MQTTPublish.<br>_Mostrado como byte_ |
| **ibm_ace.MQTT.ClosedConnections** <br>(count) | El número total de connections (conexiones) a un servidor MQTT que se cerraron desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.MQTT.FailedConnections** <br>(count) | El número total de intentos de conexión a un servidor MQTT que han fallado desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.MQTT.MessagesReceived** <br>(count) | El número total de mensajes MQTT recibidos por los nodos MQTTSubscribe.|
| **ibm_ace.MQTT.MessagesSent** <br>(count) | El número total de mensajes MQTT enviados por los nodos MQTTPublish.|
| **ibm_ace.MQTT.OpenConnections** <br>(gauge) | T<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.NodeJS.ArrayBuffers** <br>(gauge) | |
| **ibm_ace.NodeJS.ExternalMemory** <br>(gauge) | |
| **ibm_ace.NodeJS.TotalHeapMemory** <br>(gauge) | |
| **ibm_ace.NodeJS.UsedHeapMemory** <br>(gauge) | |
| **ibm_ace.ODBC.ActiveConnections** <br>(gauge) | El número de connections (conexiones) actualmente abiertas a este DSN.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.ODBC.ClosedConnections** <br>(count) | El número de connections (conexiones) a este DSN que alguna vez estuvieron abiertas, pero que ahora están cerradas. Esta cifra incluye las conexiones cerradas debido a un error, cerradas forzosamente por el DBMS o cerradas por el nodo de integración porque ya no era necesario (por ejemplo, subproceso inactivo durante 60 segundos).<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.ODBC.ConnectionErrors** <br>(count) | El número de veces que se detectó que una connection (conexión) a este DSN tenía un error de connection (conexión) (lo que habría provocado que el error se cerrara y, por lo tanto, también habría contribuido a la medición de connections (conexiones) cerradas).<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.ODBC.ExecuteFailure** <br>(count) | El número total de veces que falló cualquier sentencia contra este DSN.|
| **ibm_ace.ODBC.ExecuteSuccess** <br>(count) | El número total de veces que se ejecutó cualquier sentencia contra este DSN.|
| **ibm_ace.ODM.FailedExecutions** <br>(count) | El número de ejecuciones fallidas de un conjunto de reglas.|
| **ibm_ace.ODM.RulesMatched** <br>(count) | El número total de reglas coincidentes durante todas las ejecuciones de un conjunto de reglas.|
| **ibm_ace.ODM.SuccessfulExecutions** <br>(count) | El número de ejecuciones correctas de un conjunto de reglas.|
| **ibm_ace.Parsers.ApproxMemKB** <br>(gauge) | La cantidad aproximada de memoria relacionada con los datos de usuario utilizados para el tipo de analizador de flujo de mensajes indicado. No es posible calcular la cantidad exacta de memoria utilizada por un analizador.<br>_Mostrado como kibibyte_. |
| **ibm_ace.Parsers.FailedReads** <br>(count) | El número de análisis fallidos que se han producido para el tipo de analizador de flujo de mensajes nombrado.<br>_Mostrado como lectura_ |
| **ibm_ace.Parsers.FailedWrites** <br>(count) | El número de escrituras fallidas que se produjeron para el tipo de analizador de flujo de mensajes nombrado.<br>_Mostrado como escritura_ |
| **ibm_ace.Parsers.Fields** <br>(gauge) | Muestra el número de campos de mensaje asociados con el tipo de analizador de flujo de mensajes nombrado. Estos campos se retienen mediante el analizador sintáctico y se utilizan para construir los árboles de mensajes.|
| **ibm_ace.Parsers.MaxReadKB** <br>(gauge) | Muestra el stream (flujo) de bits más grande analizado por el tipo de analizador para el flujo de mensajes nombrado.<br>_Mostrado como kibibyte_ |
| **ibm_ace.Parsers.MaxWrittenKB** <br>(gauge) | Muestra el mayor stream (flujo) de bits escrito por el tipo de analizador para el flujo de mensajes nombrado.<br>_Mostrado como kibibyte_ |
| **ibm_ace.Parsers.Reads** <br>(count) | El número de análisis correctos completados por el tipo de analizador de flujo de mensajes nombradeo.<br>_Mostrado como leído_ |
| **ibm_ace.Parsers.Threads** <br>(gauge) | El número de subprocesos de flujo de mensajes que han contribuido a las estadísticas de una acumulación de tipo de analizador de flujos de mensajes.<br>_Mostrado como subproceso_ |
| **ibm_ace.Parsers.Writes** <br>(count) | El número de escrituras completadas con éxito por el tipo de analizador de flujo de mensajes nombrado.<br>_Mostrado como escritura_ |
| **ibm_ace.SAP.InboundConnectionErrors** <br>(count) | |
| **ibm_ace.SAP.InboundOutstandingSyncronousRequests** <br>(count) | |
| **ibm_ace.SAP.InboundWorkBacklog** <br>(count) | |
| **ibm_ace.SAP.OutboundConnectionErrors** <br>(count) | |
| **ibm_ace.SAP.OutboundMessageProcessFailures** <br>(count) | |
| **ibm_ace.SAP.OutboundMessageProcessSuccesses** <br>(count) | |
| **ibm_ace.SOAPInput.FaultRepliesSent** <br>(count) | El número de respuestas de fallo SOAP enviadas al cliente. Estos fallos pueden ser fallos definidos por el usuario o excepciones del nodo de integración.|
| **ibm_ace.SOAPInput.InboundMessagesFaultedBeforeFlow** <br>(count) | El número de mensajes que han fallado antes de llegar al flujo. Esta medición incluye los mensajes de entrada que se envían por el terminal de fallos.|
| **ibm_ace.SOAPInput.InboundMessagesMadeFlow** <br>(count) | Número de mensajes que han realizado el flujo sin fallos.|
| **ibm_ace.SOAPInput.InboundMessagesTotal** <br>(count) | El número total de mensajes SOAP recibidos del cliente. Esta medición es igual a la suma de InboundMessagesMadeFlow e InboundMessagesFaultedBeforeFlow.|
| **ibm_ace.SOAPInput.RepliesSentTotal** <br>(count) | El número total de respuestas SOAP devueltas al cliente. Esta medición es igual a la suma de SuccessfulRepliesSent y FaultRepliesSent.|
| **ibm_ace.SOAPInput.SuccessfulRepliesSent** <br>(count) | El número de respuestas correctas, sin fallo SOAP, enviadas al cliente.|
| **ibm_ace.Security.TotalCacheEntries** <br>(count) | El número total de entradas de resultados de operaciones de seguridad en la caché de seguridad. Una operación de seguridad se define en el perfil de seguridad como autenticación, asignación o autorización. Una entrada de caché puede incluir un token de seguridad devuelto.|
| **ibm_ace.Security.TotalOperations** <br>(count) | El número de operaciones de seguridad (autenticación, asignación o autorización) desde que se inició la recopilación. Un perfil de seguridad con autenticación y autorización cuenta como dos operaciones.|
| **ibm_ace.Security.TotalOperationsServicedByCache** <br>(count) | El número de operaciones de seguridad (autenticación, asignación o autorización) que se atendieron desde la caché de seguridad (sin acceder directamente al STS).|
| **ibm_ace.Security.TotalSuccessfulOperations** <br>(count) | El número de operaciones de seguridad (autenticación, asignación o autorización) aprobadas.|
| **ibm_ace.Sockets.ReceivedMessageSize_0_1KB** <br>(count) | El número de mensajes recibidos en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.ReceivedMessageSize_1KB_10KB** <br>(count) | El número de mensajes recibidos en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.ReceivedMessageSize_10KB_100KB** <br>(count) | El número de mensajes recibidos en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.ReceivedMessageSize_100KB_1MB** <br>(count) | El número de mensajes recibidos en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.ReceivedMessageSize_1MB_10MB** <br>(count) | El número de mensajes recibidos en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.ReceivedMessageSize_Over10MB** <br>(count) | El número de mensajes recibidos en el rango de tamaño.|
| **ibm_ace.Sockets.SentMessageSize_0_1KB** <br>(count) | El número de mensajes enviados en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.SentMessageSize_1KB_10KB** <br>(count) | El número de mensajes enviados en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.SentMessageSize_10KB_100KB** <br>(count) | El número de mensajes enviados en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.SentMessageSize_100KB_1MB** <br>(count) | El número de mensajes enviados en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.SentMessageSize_1MB_10MB** <br>(count) | El número de mensajes enviados en el rango de tamaño (exclusivo).|
| **ibm_ace.Sockets.SentMessageSize_Over10MB** <br>(count) | El número de mensajes enviados en el rango de tamaño.|
| **ibm_ace.Sockets.TotalDataReceived_KB** <br>(count) | El número total de bytes recibidos, en kilobytes (KB).<br>_Mostrado como kilobyte_ |
| **ibm_ace.Sockets.TotalDataSent_KB** <br>(count) | El número de bytes enviados, en kilobytes (KB).<br>_Mostrado como kilobyte_ |
| **ibm_ace.Sockets.TotalMessages** <br>(count) | El número de solicitudes de un socket; por ejemplo, de un nodo SOAPRequest.|
| **ibm_ace.Sockets.TotalSockets** <br>(count) | El número de sockets de salida que se han abierto desde el último reinicio del servidor de integración.|
| **ibm_ace.TCPIPClientNodes.BytesReceived** <br>(count) | La cantidad total de datos recibidos (por los nodos TCPIPClientInput o TCPIPClientReceive), excluyendo los ajustes SSL.<br>_Mostrado como byte_ |
| **ibm_ace.TCPIPClientNodes.BytesSent** <br>(count) | La cantidad total de datos enviados (por los nodos TCPIPClientOutput), excluyendo los ajustes SSL.<br>_Mostrado como byte_ |
| **ibm_ace.TCPIPClientNodes.ClosedConnections** <br>(count) | El número total de connections (conexiones) cerradas desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.TCPIPClientNodes.FailedConnections** <br>(count) | El número total de intentos de connection (conexión) que han fallado desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.TCPIPClientNodes.MessagesReceived** <br>(count) | El número total de mensajes recibidos (por los nodos TCPIPClientInput o TCPIPClientReceive).|
| **ibm_ace.TCPIPClientNodes.MessagesSent** <br>(count) | El número total de mensajes enviados (por los nodos TCPIPClientOutput).|
| **ibm_ace.TCPIPClientNodes.OpenConnections** <br>(gauge) | El número actual de connections (conexiones) abiertas.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.TCPIPServerNodes.BytesReceived** <br>(count) | La cantidad total de datos recibidos (por los nodos TCPIPServerInput o TCPIPServerReceive), excluyendo los ajustes SSL.<br>_Mostrado como byte_ |
| **ibm_ace.TCPIPServerNodes.BytesSent** <br>(count) | La cantidad total de datos enviados (por los nodos TCPIPServerOutput), excluyendo los ajustes SSL.<br>_Mostrado como byte_ |
| **ibm_ace.TCPIPServerNodes.ClosedConnections** <br>(count) | El número total de connections (conexiones) cerradas desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.TCPIPServerNodes.FailedSSLConnections** <br>(count) | El número total de intentos de connections (conexiones) SSL entrantes de clientes externos fallidas o rechazadas desde el último reinicio del servidor de integración.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.TCPIPServerNodes.MessagesReceived** <br>(count) | El número total de mensajes recibidos (por los nodos TCPIPServerInput o TCPIPServerReceive).|
| **ibm_ace.TCPIPServerNodes.MessagesSent** <br>(count) | El número total de mensajes enviados (por los nodos TCPIPServerOutput).|
| **ibm_ace.TCPIPServerNodes.OpenConnections** <br>(gauge) | El número actual de connections (conexiones) abiertas.<br>_Mostrado como connection (conexión)_ |
| **ibm_ace.XA.NumberOfCommits** <br>(count) | |
| **ibm_ace.XA.NumberOfRollbacks** <br>(count) | |

### Eventos

La integración de IBM ACE no incluye ningún evento.

### Checks de servicio

**ibm_ace.mq.subscription**

Devuelve `CRITICAL` si la suscripción encuentra un error, `WARNING` si no hay mensajes disponibles o `OK` en caso contrario.

_Estados: ok, advertencia, crítico_

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Para empezar a recopilar tus logs de IBM ACE, añade este bloque de configuración a tu archivo `ibm_ace.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: /home/aceuser/ace-server/log/integration_server.txt
       source: ibm_ace
   ```

   Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [archivo de ejemplo `ibm_ace.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).