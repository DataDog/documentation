---
title: Incidents
description: Manage incident response, as well as associated attachments, metadata, and todos. See the Incident Management page for more information.
breadcrumbs: Docs > API > Incidents
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Incidents

Manage incident response, as well as associated attachments, metadata, and todos. See the [Incident Management page](https://docs.datadoghq.com/service_management/incident_management.md) for more information.

## [Create an incident](https://docs.datadoghq.com/api/latest/incidents/create-an-incident.md) (preview)

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents      |

## [Get the details of an incident](https://docs.datadoghq.com/api/latest/incidents/get-the-details-of-an-incident.md) (preview)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Update an existing incident](https://docs.datadoghq.com/api/latest/incidents/update-an-existing-incident.md) (preview)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Delete an existing incident](https://docs.datadoghq.com/api/latest/incidents/delete-an-existing-incident.md) (preview)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Create postmortem attachment](https://docs.datadoghq.com/api/latest/incidents/create-postmortem-attachment.md) (preview)

| Datadog site      | API endpoint                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/postmortems      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/postmortems      |

## [Search for incidents](https://docs.datadoghq.com/api/latest/incidents/search-for-incidents.md) (preview)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/search     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/search |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/search |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/search      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/search |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/search |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/search      |

## [List an incident's impacts](https://docs.datadoghq.com/api/latest/incidents/list-an-incident-s-impacts.md)

| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts      |

## [Create an incident impact](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-impact.md)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts      |

## [Delete an incident impact](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-impact.md)

| Datadog site      | API endpoint                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts/{impact_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts/{impact_id}      |

## [Create an incident integration metadata](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-integration-metadata.md) (preview)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations      |

## [Get incident integration metadata details](https://docs.datadoghq.com/api/latest/incidents/get-incident-integration-metadata-details.md) (preview)

| Datadog site      | API endpoint                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Update an existing incident integration metadata](https://docs.datadoghq.com/api/latest/incidents/update-an-existing-incident-integration-metadata.md) (preview)

| Datadog site      | API endpoint                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Delete an incident integration metadata](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-integration-metadata.md) (preview)

| Datadog site      | API endpoint                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Get a list of an incident's todos](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-an-incident-s-todos.md) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos      |

## [Create an incident todo](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-todo.md) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos      |

## [Get incident todo details](https://docs.datadoghq.com/api/latest/incidents/get-incident-todo-details.md) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Update an incident todo](https://docs.datadoghq.com/api/latest/incidents/update-an-incident-todo.md) (preview)

| Datadog site      | API endpoint                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Delete an incident todo](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-todo.md) (preview)

| Datadog site      | API endpoint                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Create an incident type](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-type.md) (preview)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/types     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/types |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/types |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/types      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/types |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/types |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/types      |

## [Get a list of incident types](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-incident-types.md) (preview)

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/types     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/types |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/types |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/types      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/types |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/types |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/types      |

## [Get incident type details](https://docs.datadoghq.com/api/latest/incidents/get-incident-type-details.md) (preview)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [Update an incident type](https://docs.datadoghq.com/api/latest/incidents/update-an-incident-type.md) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [Delete an incident type](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-type.md) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [List incident notification templates](https://docs.datadoghq.com/api/latest/incidents/list-incident-notification-templates.md) (preview)

| Datadog site      | API endpoint                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-templates     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates      |

## [Create incident notification template](https://docs.datadoghq.com/api/latest/incidents/create-incident-notification-template.md) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/notification-templates     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates      |

## [Get incident notification template](https://docs.datadoghq.com/api/latest/incidents/get-incident-notification-template.md) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [Update incident notification template](https://docs.datadoghq.com/api/latest/incidents/update-incident-notification-template.md) (preview)

| Datadog site      | API endpoint                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [Delete a notification template](https://docs.datadoghq.com/api/latest/incidents/delete-a-notification-template.md) (preview)

| Datadog site      | API endpoint                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [List incident notification rules](https://docs.datadoghq.com/api/latest/incidents/list-incident-notification-rules.md) (preview)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-rules     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules      |

## [Create an incident notification rule](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-notification-rule.md) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/notification-rules     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules      |

## [Get an incident notification rule](https://docs.datadoghq.com/api/latest/incidents/get-an-incident-notification-rule.md) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [Update an incident notification rule](https://docs.datadoghq.com/api/latest/incidents/update-an-incident-notification-rule.md) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [Delete an incident notification rule](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-notification-rule.md) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [List incident attachments](https://docs.datadoghq.com/api/latest/incidents/list-incident-attachments.md) (preview)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments      |

## [Create incident attachment](https://docs.datadoghq.com/api/latest/incidents/create-incident-attachment.md) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments      |

## [Delete incident attachment](https://docs.datadoghq.com/api/latest/incidents/delete-incident-attachment.md) (preview)

| Datadog site      | API endpoint                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |

## [Update incident attachment](https://docs.datadoghq.com/api/latest/incidents/update-incident-attachment.md) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |

## [Get global incident settings](https://docs.datadoghq.com/api/latest/incidents/get-global-incident-settings.md) (preview)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/global/settings     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/global/settings |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/global/settings |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/global/settings      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/settings |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/settings |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/global/settings      |

## [Update global incident settings](https://docs.datadoghq.com/api/latest/incidents/update-global-incident-settings.md) (preview)

| Datadog site      | API endpoint                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/global/settings     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/global/settings |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/global/settings |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/global/settings      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/settings |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/settings |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/global/settings      |

## [List global incident handles](https://docs.datadoghq.com/api/latest/incidents/list-global-incident-handles.md) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Create global incident handle](https://docs.datadoghq.com/api/latest/incidents/create-global-incident-handle.md) (preview)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Update global incident handle](https://docs.datadoghq.com/api/latest/incidents/update-global-incident-handle.md) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Delete global incident handle](https://docs.datadoghq.com/api/latest/incidents/delete-global-incident-handle.md) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [List postmortem templates](https://docs.datadoghq.com/api/latest/incidents/list-postmortem-templates.md) (preview)

| Datadog site      | API endpoint                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates      |

## [Create postmortem template](https://docs.datadoghq.com/api/latest/incidents/create-postmortem-template.md) (preview)

| Datadog site      | API endpoint                                                                        |
| ----------------- | ----------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates      |

## [Get postmortem template](https://docs.datadoghq.com/api/latest/incidents/get-postmortem-template.md) (preview)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Update postmortem template](https://docs.datadoghq.com/api/latest/incidents/update-postmortem-template.md) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Delete postmortem template](https://docs.datadoghq.com/api/latest/incidents/delete-postmortem-template.md) (preview)

| Datadog site      | API endpoint                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Import an incident](https://docs.datadoghq.com/api/latest/incidents/import-an-incident.md) (preview)

| Datadog site      | API endpoint                                                   |
| ----------------- | -------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/import     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/import |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/import |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/import      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/import |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/import |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/import      |

## [Get a list of incidents](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-incidents.md) (preview)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents      |

## [Get a list of an incident's integration metadata](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-an-incident-s-integration-metadata.md) (preview)

| Datadog site      | API endpoint                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations      |

## [Get a list of incident user-defined fields](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-incident-user-defined-fields.md) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields      |

## [Create an incident user-defined field](https://docs.datadoghq.com/api/latest/incidents/create-an-incident-user-defined-field.md) (preview)

| Datadog site      | API endpoint                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields      |

## [Get an incident user-defined field](https://docs.datadoghq.com/api/latest/incidents/get-an-incident-user-defined-field.md) (preview)

| Datadog site      | API endpoint                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |

## [Update an incident user-defined field](https://docs.datadoghq.com/api/latest/incidents/update-an-incident-user-defined-field.md) (preview)

| Datadog site      | API endpoint                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |

## [Delete an incident user-defined field](https://docs.datadoghq.com/api/latest/incidents/delete-an-incident-user-defined-field.md) (preview)

| Datadog site      | API endpoint                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |
