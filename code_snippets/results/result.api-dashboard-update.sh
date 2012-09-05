{
    "dash": {
        "description": "A dashboard with memory info.", 
        "graphs": [
            {
                "definition": {
                    "events": [], 
                    "requests": [
                        {
                            "q": "sum:system.mem.free{*}"
                        }
                    ]
                }, 
                "title": "Sum of Memory Free"
            }
        ], 
        "id": 2532, 
        "title": "Sum Memory Free Shell"
    }, 
    "resource": "/api/v1/dash/2532", 
    "url": "/dash/dash/2532"
}
