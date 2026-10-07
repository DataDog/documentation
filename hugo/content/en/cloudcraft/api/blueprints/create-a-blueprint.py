from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

data = {"data": {"grid": "standard", "name": "New blueprint"}}
result = cloudcraft.create_blueprint(data)
