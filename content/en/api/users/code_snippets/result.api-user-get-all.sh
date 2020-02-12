{
    "included": [
        {
            "type": "roles",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {"name": "Datadog Admin Role", "created_at": "2019-04-11T14:16:15.792123+00:00", "modified_at": "2019-04-11T14:16:15.792123+00:00"},
            "relationships": {"permissions": {"data": [{"type": "permissions", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]}}
        },
        {
            "type": "permissions",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {
                "name": "dashboards_public_share",
                "display_name": "Dashboards Share",
                "description": "The ability to share dashboards externally.",
                "created": "2019-09-10T14:39:51.967094+00:00",
                "group_name": "Dashboards",
                "display_type": "other",
                "restricted": false
            }
        }
    ],
    "meta": {"page": {"total_filtered_count": 2, "total_count": 2}},
    "data": [
        {
            "type": "users",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {
                "name": "Test",
                "handle": "test@datadoghq.com",
                "created_at": "2019-04-11T14:24:54.751008+00:00",
                "email": "test@datadoghq.com",
                "icon": "https://secure.gravatar.com/avatar/XXXXX",
                "title": null,
                "verified": true,
                "disabled": false,
                "allowed_login_methods": [],
                "status": "Active"
            },
            "relationships": {"roles": {"data": [{"type": "roles", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]}, "org": {"data": {"type": "orgs", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}}}
        }
    ]
}