from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

blueprint_id = 1234
data = {
    "data": {
        "grid": "standard",
        "name": "Updated blueprint",
        "text": [
            {
                "id": "label1",
                "text": "Hello\nWorld!",
                "type": "isotext",
                "color": "#f5b720",
                "mapPos": [0, 0],
                "textSize": 15,
            }
        ],
    }
}
result = cloudcraft.update_blueprint(blueprint_id, data)
