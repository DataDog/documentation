---
title: Using the Application Field in Schema 2.1 and Beyond 

kind: guide
---

For microservices, a service will typically coincide with a k8s deployment since this is a reasonable self-contained unit of functionality, and typically has a single well-defined owner and other metadata. Therefore other components in a microservice may be automatically named during the instrumentation process. You can add an application field to all the automatically discovered components to group them with the 'core' service.
For monolithic services, you may choose to define multiple services. As the minimum, you would want to choose a service to represent the monolith as a whole and associate relevant metadata (documentation, source code, etc.) and relevant telemetry (e.g., pod metrics). It's sometimes useful to define additional services to represent other functional units within the monolith because they would have separate ownership properties like operation runbooks, documentation, and purposes. In cases where there's a clearly defined hierarchy between the monolith and other units within it, we recommend using the application field in schema 2.1+. Set the application value to be the same as the service name used for the monolith itself, and add this application field to all 'sub-services' belonging to the monolith. 
