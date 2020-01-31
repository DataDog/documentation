{
    "included": [
        {
            "type": "orgs",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {
                "public_id": "XXXX",
                "name": "TEST ACCOUNT",
                "description": "Org desc",
                "sharing": "all_private",
                "url": "http://www.datadoghq.com",
                "disabled": false,
                "created_at": "2012-03-15T16:17:45.897370+00:00",
                "modified_at": "2019-06-03T14:29:12.430564+00:00"
            }
        }
    ],
    "data": {
        "type": "users",
        "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "attributes": {
            "name": "Test",
            "created": "2019-09-12T07:07:25.232679+00:00",
            "modified": "2019-09-12T09:19:48.368644+00:00",
            "email": "test@example.com",
            "icon": "https://secure.gravatar.com/avatar/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "title": null,
            "verified": true,
            "disabled": false
        },
        "relationships": {
            "org": {"data": {"type": "orgs", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}},
            "other_users": {"data": [{"type": "users", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]},
            "other_orgs": {"data": [{"type": "orgs", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]}
        }
    }
}