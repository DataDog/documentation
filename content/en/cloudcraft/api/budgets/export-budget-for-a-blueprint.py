from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

blueprint_id = 1234
bp_format = "csv"
export = cloudcraft.export_blueprint_budget(blueprint_id, bp_format)
with open(f'export.{bp_format}', "wb") as binary_file:
    binary_file.write(export)
