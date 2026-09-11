from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

blueprints = cloudcraft.list_blueprints()

blueprint_id = 1234
bp_format = "png"
export = cloudcraft.export_blueprint(blueprint_id, bp_format)
with open(f'export.{bp_format}', "wb") as binary_file:
    binary_file.write(export)
